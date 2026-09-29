import { NextRequest } from "next/server";
import { proxyToRailway, readJsonBody } from "@/lib/railway";

/** POST /api/auth/signup — forwards the new account to Railway and returns its response as-is */
export async function POST(req: NextRequest) {
  return proxyToRailway(req, "/api/user/signup", {
    auth: false,
    body: (await readJsonBody(req)) ?? {},
  });
}
