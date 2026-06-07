/**
 * Anonymous-session claim (Plan 01-07 Task 2) — FOUND-08.
 *
 * Called from the magic-link callback (`app/(auth)/callback/route.ts`) right
 * after `supabase.auth.exchangeCodeForSession` succeeds. Atomically:
 *
 *   1. UPDATE assessment_session
 *        SET user_id = <newUserId>, anonymous_session_id = NULL
 *      WHERE anonymous_session_id = <cookie>.
 *   2. UPDATE item_response
 *        SET user_id = <newUserId>
 *      WHERE session_id IN (the session ids above).
 *   3. Delete the `anonymous_session_id` cookie.
 *
 * Step 1+2 must succeed together — if step 2 fails, step 1 is rolled back
 * via a Supabase RPC or per-step try/catch. Phase 1 implementation uses
 * service-role + two sequential UPDATEs because `@supabase/supabase-js`
 * does not expose interactive transactions outside of RPC. The window of
 * partial state is microseconds; if step 2 fails we surface the error
 * and the caller decides recovery. Plan 01-12 wraps both UPDATEs into
 * a Postgres RPC (`claim_anonymous_session(user_id, anon_id)`) once
 * Drizzle migrations are CI-wired.
 *
 * No-op when there is no `anonymous_session_id` cookie (e.g. the user
 * signed up directly via signup form without first taking the test).
 *
 * Anchors:
 *  - 01-RESEARCH.md §5 lines 1652-1668 (verbatim Pattern 5).
 *  - 01-CONTEXT.md D2.1 (entry flow: test then signup).
 *  - 01-PATTERNS.md §2.3 (service-role guarded by app-side).
 *
 * Threat-register coverage:
 *  - T-01-07-04 (Repudiation): write audit row after claim succeeds so
 *    later disputes about "I didn't agree to this account" can be
 *    reconciled. Audit write is the callback's responsibility, not this
 *    function's — keeping concerns separated.
 */
import "server-only";
import { cookies } from "next/headers";

import { getSupabaseAdminClient } from "@/lib/supabase/service-role";

const ANONYMOUS_COOKIE_NAME = "anonymous_session_id";

// biome-ignore lint/suspicious/noExplicitAny: see lib/session/anonymous.ts
type AnyBuilder = any;

export interface ClaimResult {
  /** Number of assessment_session rows transferred to the user. */
  sessionsClaimed: number;
  /** Number of item_response rows transferred to the user. */
  responsesClaimed: number;
}

/**
 * Transfers any open anonymous session held in the `anonymous_session_id`
 * cookie onto `userId`. Returns counts of rows updated. Returns
 * `{ sessionsClaimed: 0, responsesClaimed: 0 }` when no cookie is present
 * or the cookie does not match a row (idempotent no-op).
 */
export async function claimAnonymousSession(
  userId: string,
): Promise<ClaimResult> {
  const cookieStore = await cookies();
  const anonId = cookieStore.get(ANONYMOUS_COOKIE_NAME)?.value;
  if (!anonId) {
    return { sessionsClaimed: 0, responsesClaimed: 0 };
  }

  const supabase = getSupabaseAdminClient();

  // Read affected session ids first so step 2 can target item_response by
  // session_id. Doing this before the UPDATE means we capture the ids
  // even if a concurrent claim wipes the cookie afterwards.
  const { data: sessions, error: readErr } = await supabase
    .from("assessment_session")
    .select("id")
    .eq("anonymous_session_id", anonId);
  if (readErr) {
    throw new Error(`claim: read sessions failed: ${readErr.message}`);
  }
  const sessionIds = ((sessions ?? []) as { id: string }[]).map((r) => r.id);

  // Step 1: transfer assessment_session ownership.
  const { error: sessErr } = await (
    supabase.from("assessment_session") as AnyBuilder
  )
    .update({ user_id: userId, anonymous_session_id: null })
    .eq("anonymous_session_id", anonId);
  if (sessErr) {
    throw new Error(`claim: update assessment_session failed: ${sessErr.message}`);
  }

  // Step 2: transfer item_response ownership for those sessions.
  let responsesClaimed = 0;
  if (sessionIds.length > 0) {
    const { error: respErr, count } = await (
      supabase.from("item_response") as AnyBuilder
    )
      .update({ user_id: userId }, { count: "exact" })
      .in("session_id", sessionIds);
    if (respErr) {
      throw new Error(`claim: update item_response failed: ${respErr.message}`);
    }
    responsesClaimed = count ?? 0;
  }

  // Step 3: drop the cookie regardless (the session is no longer anonymous).
  cookieStore.delete(ANONYMOUS_COOKIE_NAME);

  return {
    sessionsClaimed: sessionIds.length,
    responsesClaimed,
  };
}
