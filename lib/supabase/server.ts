/**
 * Supabase server client — DescubreMe Phase 1 Wave 3 (Plan 01-06).
 *
 * Wraps `@supabase/ssr` 0.10.3 `createServerClient` with the canonical
 * Next.js 16 cookie bridge from `next/headers`. Returned client is
 * RLS-aware: it sends the anon key + signed cookies, so all PostgREST
 * queries respect `auth.uid()`-scoped policies.
 *
 * Anchors:
 * - 01-RESEARCH.md §"1. Auth domain — Magic link + Supabase SSR" lines 805-828.
 * - 01-PATTERNS.md §2.3 (lib/ TS modules).
 * - SKELETON.md "Auth" section.
 *
 * v0.10.3 cache-headers fix: the `setAll` branch propagates each cookie's
 * options (httpOnly/secure/sameSite/maxAge) when middleware/Route Handlers
 * mutate the auth session, preventing CDN session leak. Earlier versions
 * dropped these options. See @supabase/ssr CHANGELOG v0.10.3.
 *
 * NEVER call this from a Client Component. SSR-only.
 */
import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function getSupabaseServerClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          // v0.10.3 cache-headers fix: pass options through verbatim.
          for (const { name, value, options } of cookiesToSet) {
            try {
              cookieStore.set(name, value, options);
            } catch {
              // Server Component callees can't mutate cookies; ignore.
              // Middleware/Route Handlers will succeed.
            }
          }
        },
      },
    },
  );
}
