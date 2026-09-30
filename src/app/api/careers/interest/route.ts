import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";
import { readJsonBody } from "@/lib/railway";
import { clientIp, createRateLimiter } from "@/lib/rateLimit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATA_FILE = path.join(process.cwd(), "data", "careers-interest.json");

/** 3 submissions per IP per hour. */
const isRateLimited = createRateLimiter(3, 60 * 60 * 1000);

interface InterestEntry {
  email: string;
  submittedAt: string;
}

// Serialises local-file writes so concurrent requests can't clobber each other.
let writeQueue: Promise<unknown> = Promise.resolve();

/** Appends to data/careers-interest.json (dev fallback), skipping duplicate emails. */
function appendToLocalFile(entry: InterestEntry) {
  const task = writeQueue.then(async () => {
    await mkdir(path.dirname(DATA_FILE), { recursive: true });
    let entries: InterestEntry[] = [];
    try {
      const parsed: unknown = JSON.parse(await readFile(DATA_FILE, "utf8"));
      if (Array.isArray(parsed)) entries = parsed as InterestEntry[];
    } catch {
      // Missing or unreadable file: start a fresh list.
    }
    if (!entries.some((e) => e.email === entry.email)) entries.push(entry);
    await writeFile(DATA_FILE, JSON.stringify(entries, null, 2) + "\n", "utf8");
  });
  writeQueue = task.catch(() => {});
  return task;
}

/** Forwards the entry to the admin panel's POST {ADMIN_API_URL}/api/careers/interest. */
async function sendToAdminPanel(baseUrl: string, entry: InterestEntry) {
  const res = await fetch(
    `${baseUrl.replace(/\/+$/, "")}/api/careers/interest`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.ADMIN_API_TOKEN
          ? { Authorization: `Bearer ${process.env.ADMIN_API_TOKEN}` }
          : {}),
      },
      body: JSON.stringify(entry),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    },
  );
  if (!res.ok) throw new Error(`Admin panel responded ${res.status}`);
}

/**
 * POST /api/careers/interest — `{ email }` → `{ success: true }`.
 * Storage: the admin panel when ADMIN_API_URL is set; otherwise a local JSON file in
 * development. Production without ADMIN_API_URL returns 503 rather than dropping emails
 * (Vercel's filesystem is read-only/ephemeral, so the local file can't work there).
 */
export async function POST(req: NextRequest) {
  if (isRateLimited(clientIp(req))) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429, headers: { "Retry-After": "3600" } },
    );
  }

  const body = await readJsonBody(req);
  const raw =
    typeof body === "object" && body !== null && "email" in body
      ? (body as { email: unknown }).email
      : undefined;
  const email = typeof raw === "string" ? raw.trim().toLowerCase() : "";
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json(
      { error: "Enter a valid email address" },
      { status: 400 },
    );
  }

  const entry: InterestEntry = { email, submittedAt: new Date().toISOString() };
  const adminUrl = process.env.ADMIN_API_URL;

  try {
    if (adminUrl) {
      await sendToAdminPanel(adminUrl, entry);
    } else if (process.env.NODE_ENV !== "production") {
      await appendToLocalFile(entry);
    } else {
      return NextResponse.json(
        { error: "Sign-ups aren't open yet. Please check back soon." },
        { status: 503 },
      );
    }
  } catch {
    return NextResponse.json(
      {
        error: "We couldn't save your email right now. Please try again later.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true });
}
