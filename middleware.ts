/**
 * Edge middleware — DescubreMe Phase 1 Wave 3 (Plan 01-06) + Wave 9 CSS/cookie fix.
 *
 * Responsibilities:
 *   1. Forward Vercel geo header `x-vercel-ip-country` as `x-geo-country`
 *      so Server Components can pre-fill the country dropdown (D2.7).
 *   2. Mint the anonymous-session cookie on first hit to `/test/*`. Next.js 16
 *      forbids `cookies().set()` from Server Components rendering pages, so
 *      the mint MUST happen here. The Server Component then reads the cookie
 *      via `cookies()` and treats it as the single source of truth (PATTERNS §3.8).
 *
 * Anchors:
 * - 01-PATTERNS.md §2.4 (geo middleware), §3.8 (anonymous session).
 * - 01-CONTEXT.md D2.7 (geo pre-fill), D2.2 (anonymous session lifetime).
 * - https://nextjs.org/docs/app/api-reference/functions/cookies#options
 *
 * Matcher excludes static asset paths to keep edge invocation count low.
 */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { nanoid } from "nanoid";

const ANONYMOUS_COOKIE_NAME = "anonymous_session_id";
const NANOID_LENGTH = 30;
const SEVEN_DAYS_SEC = 60 * 60 * 24 * 7;

export function middleware(request: NextRequest) {
  // Mint anonymous cookie BEFORE building the response. We use the
  // request.cookies.set + response.cookies.set pattern so the Server
  // Component that renders this same request sees the cookie via
  // `cookies()` AND the browser receives it for subsequent requests.
  let mintedAnonId: string | null = null;
  if (request.nextUrl.pathname.startsWith("/test/")) {
    const existing = request.cookies.get(ANONYMOUS_COOKIE_NAME)?.value;
    if (!existing) {
      mintedAnonId = nanoid(NANOID_LENGTH);
      request.cookies.set(ANONYMOUS_COOKIE_NAME, mintedAnonId);
    }
  }

  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Persist the minted cookie to the browser (httpOnly, secure, sameSite=lax,
  // 7-day expiry to match pg_cron cleanup-expired-anonymous-sessions).
  if (mintedAnonId) {
    response.cookies.set(ANONYMOUS_COOKIE_NAME, mintedAnonId, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: SEVEN_DAYS_SEC,
      path: "/",
    });
  }

  // Forward Vercel geo header (ISO 3166 alpha-2) as a stable name so app code
  // doesn't depend on platform-specific header.
  const country = request.headers.get("x-vercel-ip-country");
  if (country) {
    response.headers.set("x-geo-country", country);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
