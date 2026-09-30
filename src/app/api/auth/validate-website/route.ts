import { NextRequest, NextResponse } from "next/server";
import { readJsonBody } from "@/lib/railway";
import { clientIp, createRateLimiter } from "@/lib/rateLimit";
import { checkWebsite } from "@/lib/website";

/** 10 checks per IP per minute. */
const isRateLimited = createRateLimiter(10, 60_000);

/** POST /api/auth/validate-website — `{ url }` → `{ valid: true }` or `{ valid: false, error }` */
export async function POST(req: NextRequest) {
  if (isRateLimited(clientIp(req))) {
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
