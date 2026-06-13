/**
 * scoreCompletedSessionIfNeeded — per-test scoring trigger for the authenticated
 * Free runner ([GAP-AUTH-4TEST-SCORING-TRIGGER], the 4th piece of P0
 * [GAP-AUTH-4TEST-RUNTIME]; FREE-12).
 *
 * The problem (verified firsthand): a signed-in user's submit path is
 * `ItemForm -> /api/respond -> router.refresh() -> page.tsx ->
 * getNextItemForSession=null -> redirect('/done')` — nothing in it ever calls
 * `scoreSession`. So `assessment_session.status` never flips to 'completed',
 * `computed_score` + `report_snapshot` are never written, and the teaser gate
 * (4 computed scores) can never unlock. `scoreSession` was only reachable via
 * `auth/callback` (the anon→signup→claim path) or `POST /api/score` (no in-app
 * caller for the per-test authenticated flow).
 *
 * The fix: score-on-/done-arrival. `/done` is reached EXACTLY when the test is
 * complete (getNextItemForSession returned null), so scoreSession's completeness
 * gate (distinct responses >= item_count) passes. This helper is the testable
 * seam — `/done` is a server component built on redirect(), hard to unit-test
 * inline. It mirrors `lib/free/next-test.ts`.
 *
 * Idempotent: the lookup only considers sessions NOT already 'completed', so a
 * refresh / back-button revisit finds nothing and skips (no re-score, no
 * duplicate snapshot — T-02-17-02).
 *
 * Best-effort: a scoring failure is logged and swallowed (never re-thrown), so
 * the routing always proceeds — the same log-and-continue pattern as
 * `app/auth/callback/route.ts` step 9.5 (T-02-17-03).
 *
 * Instrument-agnostic: the instrument code is a PARAMETER, never a literal. The
 * session is matched by joining `instrument_version -> instrument.code` and
 * filtering the code in JS (no embedded-filter dependency). lib/free is in
 * FOUND-05 SCAN_DIRS — this file carries zero instrument-code literal.
 *
 * Trust: the lookup filters by `user_id` (from getUser()'s validated JWT, passed
 * by /done), so it only ever scores the caller's own session (T-02-17-01).
 *
 * Anchors:
 *  - lib/scoring/score-session.ts (scoreSession discriminated result).
 *  - app/auth/callback/route.ts (best-effort log-and-continue).
 *  - estado/BACKLOG.md [GAP-AUTH-4TEST-SCORING-TRIGGER]; FREE-12.
 */
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

import { logger } from "@/lib/logger";
import { scoreSession } from "@/lib/scoring/score-session";

/**
 * Scores the caller's most-recent NOT-yet-'completed' session for the given
 * instrument, if one exists. No-op when the test is already scored (idempotent)
 * or when no session exists. Never throws — a scoring failure is logged so the
 * caller's routing continues unaffected (best-effort).
 *
 * @param admin service-role client (server-side; bypasses RLS — the user_id
 *   filter is the scoping defense).
 * @param userId the authenticated user's id (from getUser()'s validated JWT).
 * @param instrumentCode the just-finished instrument's code (a parameter, never
 *   a hardcoded literal).
 */
export async function scoreCompletedSessionIfNeeded(
  // biome-ignore lint/suspicious/noExplicitAny: untyped Supabase client (no generated Database types yet)
  admin: SupabaseClient<any, "public", any>,
  userId: string,
  instrumentCode: string,
): Promise<void> {
  // Most-recent non-'completed' session of THIS user, joined to its instrument
  // code. The code is filtered in JS (not an embedded PostgREST filter) to keep
  // the query shape identical to the proven completedCodes join in /done and to
  // avoid any embedded-filter brittleness — the helper stays code-literal-free.
  const { data, error } = await admin
    .from("assessment_session")
    .select("id, instrument_version!inner(instrument!inner(code))")
    .eq("user_id", userId)
    .neq("status", "completed")
    .order("started_at", { ascending: false });

  if (error || !data) return;

  const rows = data as unknown as Array<{
    id: string;
    instrument_version: { instrument: { code: string } } | null;
  }>;

  const session = rows.find(
    (r) => r.instrument_version?.instrument?.code === instrumentCode,
  );

  // No open/incomplete session for this instrument → already scored or never
  // started. Idempotent no-op.
  if (!session) return;

  // Best-effort: score the freshly-closed session. A failure (incomplete data,
  // missing rules, snapshot write error) is logged and the routing continues —
  // it must never break the /done flow. Same pattern as auth/callback step 9.5.
  try {
    const result = await scoreSession(admin, session.id);
    if (!result.ok) {
      logger.warn(
        { session_id: session.id, reason: result.error },
        "done_score_session_not_ok",
      );
    }
  } catch (err) {
    logger.error(
      {
        session_id: session.id,
        err: err instanceof Error ? err.message : String(err),
      },
      "done_score_session_threw",
    );
  }
}
