import { NextRequest, NextResponse } from "next/server";
import { readJsonBody } from "@/lib/railway";
import { checkWebsite } from "@/lib/website";

/** POST /api/auth/validate-website — `{ url }` → `{ valid: true }` or `{ valid: false, error }` */
export async function POST(req: NextRequest) {
  try {
    const body = await readJsonBody(req);
    const url =
      typeof body === "object" && body !== null && "url" in body
        ? String((body as { url: unknown }).url ?? "")
        : "";
    const result = await checkWebsite(url);
    return NextResponse.json(
      result.valid ? { valid: true } : { valid: false, error: result.error },
    );
  } catch {
    return NextResponse.json({
      valid: false,
      error: "Website could not be reached",
    });
  }
}
