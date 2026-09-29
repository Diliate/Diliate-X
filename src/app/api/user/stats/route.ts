import { NextRequest } from "next/server";
import { proxyToRailway } from "@/lib/railway";

/** GET /api/user/stats — sending stats and plan usage for the signed-in user */
export async function GET(req: NextRequest) {
  return proxyToRailway(req, "/api/user/stats");
}
