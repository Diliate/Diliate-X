import { NextRequest } from "next/server";
import { proxyToRailway, readJsonBody } from "@/lib/railway";

// Railway only exposes POST /api/gmail-pool/auth, so both methods here forward as POST.

/** GET /api/gmail-pool/auth — start the Gmail OAuth flow; responds with `{ authUrl }` */
export async function GET(req: NextRequest) {
  return proxyToRailway(req, "/api/gmail-pool/auth", {
    method: "POST",
    body: {},
  });
}

/** POST /api/gmail-pool/auth — same as GET, optionally with `{ email }` as a login hint */
export async function POST(req: NextRequest) {
  return proxyToRailway(req, "/api/gmail-pool/auth", {
    method: "POST",
    body: (await readJsonBody(req)) ?? {},
  });
}
