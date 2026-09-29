import { NextRequest } from "next/server";
import { proxyToRailway } from "@/lib/railway";

/** GET /api/user/me — profile of the signed-in user */
export async function GET(req: NextRequest) {
  return proxyToRailway(req, "/api/user/me");
}
