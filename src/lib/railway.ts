import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE } from "@/lib/auth";

/** Base URL of the Railway backend (no trailing slash). */
export const RAILWAY_URL = (
  process.env.RAILWAY_URL ?? "https://diliate-server-production.up.railway.app"
).replace(/\/+$/, "");

interface ProxyOptions {
  /** HTTP method sent upstream. Defaults to the incoming request's method. */
  method?: string;
  /** Forward the `diliate_token` cookie as a Bearer token. Defaults to true. */
  auth?: boolean;
  /** JSON body to send upstream. Omit for bodiless requests. */
  body?: unknown;
}

/**
 * Forwards a request to the Railway backend and relays its JSON response and status.
 * Non-JSON upstream responses (e.g. Express HTML 404 pages) are converted to `{ error }`.
 */
export async function proxyToRailway(
  req: NextRequest,
  path: string,
  { method = req.method, auth = true, body }: ProxyOptions = {},
): Promise<NextResponse> {
  const headers: Record<string, string> = {};

  if (auth) {
    const token = req.cookies.get(AUTH_COOKIE)?.value;
    if (!token)
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    headers.Authorization = `Bearer ${token}`;
  }
  if (body !== undefined) headers["Content-Type"] = "application/json";

  try {
    const res = await fetch(`${RAILWAY_URL}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: "no-store",
    });

    const text = await res.text();
    let data: unknown;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = {
        error: `Backend returned an unexpected response (${res.status})`,
      };
    }
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json(
      { error: "Could not reach the backend" },
      { status: 502 },
    );
  }
}

/** Reads a JSON request body, returning `undefined` when it is empty or malformed. */
export async function readJsonBody(req: NextRequest): Promise<unknown> {
  try {
    return await req.json();
  } catch {
    return undefined;
  }
}
