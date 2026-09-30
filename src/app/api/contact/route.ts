import { NextRequest, NextResponse } from "next/server";
import { readJsonBody } from "@/lib/railway";
import { clientIp, createRateLimiter } from "@/lib/rateLimit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** 5 messages per IP per hour. */
const isRateLimited = createRateLimiter(5, 60 * 60 * 1000);

/**
 * POST /api/contact — `{ name, email, subject, message, topic }` → `{ success: true }`.
 * Forwards the message to the admin panel's POST {ADMIN_API_URL}/api/contact; returns
 * 503 until ADMIN_API_URL is configured.
 */
export async function POST(req: NextRequest) {
  if (isRateLimited(clientIp(req))) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429, headers: { "Retry-After": "3600" } },
    );
  }

  const body = await readJsonBody(req);
  const f = (typeof body === "object" && body !== null ? body : {}) as Record<
    string,
    unknown
  >;
  const name = typeof f.name === "string" ? f.name.trim() : "";
  const email = typeof f.email === "string" ? f.email.trim().toLowerCase() : "";
  const message = typeof f.message === "string" ? f.message.trim() : "";
  const topic = typeof f.topic === "string" ? f.topic.trim() : "general";
  const subject = typeof f.subject === "string" ? f.subject.trim() : "";

  if (!name || !EMAIL_RE.test(email) || message.length < 10) {
    return NextResponse.json(
      { error: "Please fill in all required fields" },
      { status: 400 },
    );
  }
  // Keep payloads to a sane size before forwarding.
  if (
    name.length > 200 ||
    email.length > 254 ||
    subject.length > 300 ||
    topic.length > 50 ||
    message.length > 5000
  ) {
    return NextResponse.json(
      { error: "Your message is too long. Please shorten it and try again." },
      { status: 400 },
    );
  }

  const adminUrl = process.env.ADMIN_API_URL;
  if (!adminUrl) {
    return NextResponse.json(
      { error: "Contact form is not configured yet." },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(`${adminUrl.replace(/\/+$/, "")}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.ADMIN_API_TOKEN
          ? { Authorization: `Bearer ${process.env.ADMIN_API_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({ name, email, subject, message, topic }),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`Backend responded ${res.status}`);
  } catch {
    return NextResponse.json(
      {
        error: "Could not send your message right now. Please try again later.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true });
}
