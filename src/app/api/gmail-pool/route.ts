import { NextRequest, NextResponse } from "next/server";
import { proxyToRailway } from "@/lib/railway";

/** GET /api/gmail-pool — connected Gmail accounts */
export async function GET(req: NextRequest) {
  return proxyToRailway(req, "/api/gmail-pool");
}

/** DELETE /api/gmail-pool?id=<id> — disconnect a Gmail account */
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id)
    return NextResponse.json(
      { error: "Account id is required" },
      { status: 400 },
    );
  return proxyToRailway(req, `/api/gmail-pool/${encodeURIComponent(id)}`);
}
