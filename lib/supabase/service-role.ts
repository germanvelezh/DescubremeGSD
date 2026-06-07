/**
 * Supabase service-role client — DescubreMe Phase 1 Wave 3 (Plan 01-06).
 *
 * SUPABASE_SERVICE_ROLE_KEY bypasses RLS. This client is ONLY used for:
 *   1. Pre-claim anonymous flow: when `user_id IS NULL` and we have a
 *      validated cookie-vs-session match, we INSERT `item_response` /
 *      UPDATE `assessment_session.progress` on behalf of the anonymous
 *      session. RLS cannot scope to `anonymous_session_id` (auth.uid()
 *      is null), so the app-side cookie guard is the only defense.
 *   2. Server-side jobs: `cleanup_expired_anonymous_sessions` (already
 *      handled by pg_cron — Plan 01-04), audit chain verifier (Phase 7).
 *
 * COMPL-17 invariant: NEVER accept `user_id` from request body and use
 * it with service-role. The cookie-vs-session match is the ONLY input
 * trusted from the client side in anonymous mode.
 *
 * `server-only` marker: importing this from a Client Component fails
 * the Next.js build. Defense in depth alongside the env var check.
 *
 * Anchors:
 * - 01-RESEARCH.md §1 (Auth domain) lines 831-852.
 * - 01-PATTERNS.md §2.3.
 * - SKELETON.md "Compliance-by-design" (COMPL-17).
 */
import "server-only";
import { createClient } from "@supabase/supabase-js";

type ServiceClient = ReturnType<typeof createClient>;

let cachedClient: ServiceClient | null = null;

export function getSupabaseAdminClient(): ServiceClient {
  if (cachedClient) return cachedClient;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL missing — service-role client unavailable",
    );
  }
  cachedClient = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cachedClient;
}

/**
 * Alias matching the artifact name in the plan frontmatter (`supabaseAdmin`).
 * Lazy: invokes the factory only on first access so import-time env checks
 * don't fail in test runners that don't set service-role env.
 */
export const supabaseAdmin = {
  get client(): ServiceClient {
    return getSupabaseAdminClient();
  },
};
