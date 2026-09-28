import { NextRequest, NextResponse } from "next/server";

const RAILWAY_URL = process.env.RAILWAY_URL || "https://mailflow-license-server-production.up.railway.app";

/** GET /api/auth/google — redirects to Railway OAuth endpoint */
export async function GET() {
  const googleAuthUrl = `${RAILWAY_URL}/api/user/auth/google?redirect=${encodeURIComponent(process.env.NEXT_PUBLIC_APP_URL + "/api/auth/google/callback")}`;
  return NextResponse.redirect(googleAuthUrl);
}
