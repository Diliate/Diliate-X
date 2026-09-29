import { NextRequest, NextResponse } from "next/server";
import { proxyToRailway, readJsonBody } from "@/lib/railway";
import { findPlan } from "@/lib/plans";
import { checkWebsite } from "@/lib/website";

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

/**
 * POST /api/auth/signup — validates the multi-step signup form, re-checks the company
 * website server-side, and forwards the account to Railway POST /api/user/signup.
 */
export async function POST(req: NextRequest) {
  const input = await readJsonBody(req);
  const f = (
    typeof input === "object" && input !== null ? input : {}
  ) as Record<string, unknown>;

  const firstName = str(f.firstName);
  const lastName = str(f.lastName);
  const email = str(f.businessEmail) || str(f.email);
  const password = typeof f.password === "string" ? f.password : "";
  const confirmPassword =
    typeof f.confirmPassword === "string" ? f.confirmPassword : "";
  const companyName = str(f.companyName);
  const websiteUrl = str(f.websiteUrl);

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !companyName ||
    !websiteUrl
  ) {
    return NextResponse.json(
      { error: "Please fill in all required fields" },
      { status: 400 },
    );
  }
  if (password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters" },
      { status: 400 },
    );
  }
  if (password !== confirmPassword) {
    return NextResponse.json(
      { error: "Passwords do not match" },
      { status: 400 },
    );
  }

  // The client checks this too, but only the server-side check can't be bypassed.
  const website = await checkWebsite(websiteUrl);
  if (!website.valid) {
    return NextResponse.json(
      {
        error:
          "We couldn't verify your website. Please enter a valid company website.",
      },
      { status: 400 },
    );
  }

  return proxyToRailway(req, "/api/user/signup", {
    auth: false,
    body: {
      name: `${firstName} ${lastName}`,
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      phone: str(f.phone),
      companyName,
      websiteUrl: website.url,
      country: str(f.country),
      contactCount: str(f.contactCount),
      plan: findPlan(str(f.plan))?.id ?? "free",
    },
  });
}
