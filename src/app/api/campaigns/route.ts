import { NextRequest } from "next/server";
import { proxyToRailway, readJsonBody } from "@/lib/railway";

/** GET /api/campaigns — list campaigns for the signed-in user */
export async function GET(req: NextRequest) {
  return proxyToRailway(req, "/api/campaigns");
}

const CAMPAIGN_FIELDS = [
  "name",
  "subject",
  "fromName",
  "fromEmail",
  "replyTo",
  "htmlBody",
  "recipients",
] as const;

/**
 * POST /api/campaigns — create + launch a campaign.
 * Forwards only the campaign fields. `gmailAccountId` is passed through only when the
 * caller supplies one; otherwise it is omitted so Railway picks its default sender.
 */
export async function POST(req: NextRequest) {
  const input = await readJsonBody(req);
  const source =
    typeof input === "object" && input !== null
      ? (input as Record<string, unknown>)
      : {};

  const body: Record<string, unknown> = {};
  for (const field of CAMPAIGN_FIELDS) {
    if (source[field] !== undefined) body[field] = source[field];
  }
  if (source.gmailAccountId) body.gmailAccountId = source.gmailAccountId;

  return proxyToRailway(req, "/api/campaigns", { body });
}
