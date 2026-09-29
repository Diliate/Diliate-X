import { NextRequest } from "next/server";
import { proxyToRailway, readJsonBody } from "@/lib/railway";

/** GET /api/campaigns — list campaigns for the signed-in user */
export async function GET(req: NextRequest) {
  return proxyToRailway(req, "/api/campaigns");
}

/** POST /api/campaigns — create + launch a campaign */
export async function POST(req: NextRequest) {
  return proxyToRailway(req, "/api/campaigns", {
    body: (await readJsonBody(req)) ?? {},
  });
}
