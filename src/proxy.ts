import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE } from "@/lib/auth";

// Next 16 renamed the `middleware` file convention to `proxy` (middleware.ts is deprecated).

/** Redirects unauthenticated visitors of /dashboard/* and /profile/* to /login, preserving where they were going. */
export function proxy(request: NextRequest) {
  if (request.cookies.get(AUTH_COOKIE)?.value) return NextResponse.next();

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set(
    "next",
    request.nextUrl.pathname + request.nextUrl.search,
  );
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
