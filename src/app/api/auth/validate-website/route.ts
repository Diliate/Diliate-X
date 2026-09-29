import { NextRequest, NextResponse } from "next/server";
import { readJsonBody } from "@/lib/railway";
import { checkWebsite } from "@/lib/website";

const LIMIT = 10;
const WINDOW_MS = 60_000;

// Per-instance, in-memory limiter: fine for a single server; on serverless each warm
// instance keeps its own counts, so treat this as abuse damping, not a hard guarantee.
const hits = new Map<string, { count: number; resetAt: number }>();

/** Records a request for `ip`; returns true when it exceeds LIMIT within the window. */
function isRateLimited(ip: string, now = Date.now()) {
  if (hits.size > 5000) {
    for (const [key, entry] of hits) if (entry.resetAt <= now) hits.delete(key);
  }
  const entry = hits.get(ip);
  if (!entry || entry.resetAt <= now) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > LIMIT;
}

/** POST /api/auth/validate-website — `{ url }` → `{ valid: true }` or `{ valid: false, error }` */
export async function POST(req: NextRequest) {
  // x-forwarded-for may be a list ("client, proxy1, proxy2"); the first entry is the client.
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "127.0.0.1";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  }

  try {
    const body = await readJsonBody(req);
    const url =
      typeof body === "object" && body !== null && "url" in body
        ? String((body as { url: unknown }).url ?? "")
        : "";
    const result = await checkWebsite(url);
    return NextResponse.json(
      result.valid ? { valid: true } : { valid: false, error: result.error },
    );
  } catch {
    return NextResponse.json({
      valid: false,
      error: "Website could not be reached",
    });
  }
}
