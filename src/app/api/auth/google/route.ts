import { NextResponse } from "next/server";
import { RAILWAY_URL } from "@/lib/railway";

/** GET /api/auth/google — redirects to Railway OAuth endpoint */
export async function GET() {
  const googleAuthUrl = `${RAILWAY_URL}/api/user/auth/google?redirect=${encodeURIComponent(process.env.NEXT_PUBLIC_APP_URL + "/api/auth/google/callback")}`;
  return NextResponse.redirect(googleAuthUrl);
}
