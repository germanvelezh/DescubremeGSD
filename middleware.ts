/**
 * Edge middleware — DescubreMe Phase 1 Wave 3 (Plan 01-06).
 *
 * Minimal pass-through: reads Vercel geo header `x-vercel-ip-country`
 * and forwards it as `x-geo-country` so Server Components can pre-fill
 * the country dropdown on signup (D2.7). NO auth check here — auth
 * happens in route handlers via `lib/tenant/jwt.ts`.
 *
 * Anchors:
 * - 01-PATTERNS.md §2.4.
 * - 01-CONTEXT.md D2.7 (geo pre-fill).
 *
 * Matcher excludes static asset paths to keep edge invocation count low.
 */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  // Vercel populates `x-vercel-ip-country` (ISO 3166 alpha-2). Forward
  // as a stable header name so app code doesn't depend on platform.
  const country = request.headers.get("x-vercel-ip-country");
  if (country) {
    response.headers.set("x-geo-country", country);
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
