import { NextRequest, NextResponse } from "next/server";

const RAILWAY_URL = process.env.RAILWAY_URL || "https://mailflow-license-server-production.up.railway.app";

/** POST /api/gmail-pool/auth — start OAuth2 flow for a Gmail account */
export async function POST(req: NextRequest) {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

  const res = await fetch(`${RAILWAY_URL}/api/user/gmail-pool/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
