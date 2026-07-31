/**
 * Geo header names — single source of truth (Plan 03-01, Fase 3).
 *
 * These two names were duplicated as string literals in `middleware.ts` and in
 * every consumer (`app/(auth)/signup/page.tsx`). That duplication is how the
 * D-19 bug survived unnoticed: the producer and the consumer agreed on the
 * NAME and disagreed on the CHANNEL, and nothing in the type system could
 * notice. Centralizing the name does not prevent a channel bug by itself — the
 * test does that — but it removes the drift surface.
 *
 * CHANNEL NOTE (the actual bug, verified 2026-07-30):
 *   `NextResponse.next({ request: { headers } })` forwards the headers given to
 *   it to the SERVER (they surface to Next as `x-middleware-request-*`), and
 *   that is what `headers()` reads inside a Server Component.
 *   `response.headers.set(...)` writes to the BROWSER-bound response instead.
 *   They are two different channels. Writing only to the response means
 *   `headers().get(GEO_COUNTRY_HEADER)` is always null on the server and every
 *   consumer silently falls back to its default.
 *
 * Anchors:
 *   - 03-01-PLAN.md must_haves D-19 + Task 3 step 3.
 *   - tests/integration/geo-header-channel.test.ts (the discriminating test).
 */

/** Platform header Vercel sets on the incoming request (ISO 3166 alpha-2). */
export const VERCEL_GEO_HEADER = "x-vercel-ip-country";

/**
 * Stable app-side name the middleware forwards, so app code never depends on a
 * platform-specific header. Read with `(await headers()).get(...)`.
 */
export const GEO_COUNTRY_HEADER = "x-geo-country";
