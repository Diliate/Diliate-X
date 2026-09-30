import { NextRequest } from "next/server";
import { proxyToRailway } from "@/lib/railway";

/** GET /api/user/profile — full profile of the signed-in user (Railway, as-is). */
export async function GET(req: NextRequest) {
  return proxyToRailway(req, "/api/user/profile");
}
