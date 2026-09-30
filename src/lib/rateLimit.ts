import type { NextRequest } from "next/server";

// Per-instance, in-memory fixed-window limiter: fine for a single server; on serverless each
// warm instance keeps its own counts, so treat this as abuse damping, not a hard guarantee.

/** Client IP from x-forwarded-for (first entry = the client), falling back to loopback. */
export function clientIp(req: NextRequest) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "127.0.0.1"
  );
}

/** Creates a limiter allowing `limit` hits per key per `windowMs`; call it once per request. */
export function createRateLimiter(limit: number, windowMs: number) {
  const hits = new Map<string, { count: number; resetAt: number }>();

  /** Records a hit for `key`; returns true when it exceeds the limit within the window. */
  return function isRateLimited(key: string, now = Date.now()) {
    if (hits.size > 5000) {
      for (const [k, entry] of hits) if (entry.resetAt <= now) hits.delete(k);
    }
    const entry = hits.get(key);
    if (!entry || entry.resetAt <= now) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      return false;
    }
    entry.count += 1;
    return entry.count > limit;
  };
}
