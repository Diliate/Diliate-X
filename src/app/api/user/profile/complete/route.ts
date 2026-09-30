import { NextRequest, NextResponse } from "next/server";
import { proxyToRailway, readJsonBody } from "@/lib/railway";
import { checkWebsite } from "@/lib/website";

const FIELDS = [
  "firstName",
  "lastName",
  "phone",
  "companyName",
  "websiteUrl",
  "country",
  "contactCount",
] as const;

/**
 * POST /api/user/profile/complete — validates the 7 profile fields, verifies the company
 * website (same check as signup), and forwards to Railway. Returns Railway's response as-is.
 */
export async function POST(req: NextRequest) {
  const input = await readJsonBody(req);
  const f = (
    typeof input === "object" && input !== null ? input : {}
  ) as Record<string, unknown>;

  const values = Object.fromEntries(
    FIELDS.map((key) => [key, typeof f[key] === "string" ? f[key].trim() : ""]),
  ) as Record<(typeof FIELDS)[number], string>;
  const missing = FIELDS.filter((key) => !values[key]);
  if (missing.length) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(", ")}` },
      { status: 400 },
    );
  }

  const website = await checkWebsite(values.websiteUrl);
  if (!website.valid) {
    return NextResponse.json(
      {
        error:
          "We couldn't verify your website. Please enter a valid company website.",
      },
      { status: 400 },
    );
  }

  return proxyToRailway(req, "/api/user/profile/complete", {
    method: "POST",
    body: { ...values, websiteUrl: website.url },
  });
}
