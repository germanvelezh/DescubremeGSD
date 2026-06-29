/**
 * resolveLastScoredSessionId — resolves the id of the Free test the user JUST
 * closed, so the test→test transition can show a mini-result instead of a bare
 * button ([GAP-W6-HOOKS-1], [GAP-FREE-NO-RESULTS-VISIBILITY]; the machinery piece
 * of the per-test takeaway).
 *
 * Where it runs: `/test/[code]/done` nextCode branch, AFTER
 * `scoreCompletedSessionIfNeeded` has already flipped the just-finished session to
 * `status='completed'` and written its `report_snapshot`. done/page.tsx feeds the
 * returned id to `composeReport` and maps the payload onto TransitionScreen's
 * optional `result` prop (visual + reveal phrase + link to the full report).
 *
 * Mirror of `lib/free/score-on-done.ts`, with one difference: it filters
 * `status = 'completed'` (the closed test is already scored at /done arrival),
 * whereas score-on-done targets the NOT-yet-completed session it is about to score.
 *
 * Instrument-agnostic: the instrument code is a PARAMETER, never a literal. The
 * session is matched by joining `instrument_version -> instrument.code` and
 * filtering the code in JS, case-insensitive ([GAP-INSTRUMENT-CODE-CASING]: the
 * runner uppercases the URL code, the seed stores some codes mixed-case). lib/free
 * is in FOUND-05 SCAN_DIRS — this file carries zero instrument-code literal.
 *
 * Best-effort: a query error or null data returns `null` (never throws), so the
 * transition degrades to the current button+hook (TransitionScreen without a
 * `result`) instead of breaking the routing.
 *
 * Trust: the lookup filters by `user_id` (from getUser()'s validated JWT, passed
 * by /done), so it only ever resolves the caller's own session.
 *
 * Anchors:
 *  - lib/free/score-on-done.ts (query shape + best-effort + JS code-match).
 *  - app/(b2c)/test/[code]/_components/TransitionScreen.tsx (result prop).
 *  - estado/BACKLOG.md [GAP-W6-HOOKS-1]; [GAP-FREE-NO-RESULTS-VISIBILITY].
 */
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Returns the `session_id` of the caller's most-recent `completed` session for
 * the given instrument, or `null` when none exists or the lookup fails.
 *
 * @param admin service-role client (server-side; bypasses RLS — the user_id
 *   filter is the scoping defense).
 * @param userId the authenticated user's id (from getUser()'s validated JWT).
 * @param instrumentCode the just-closed instrument's code (a parameter, never a
 *   hardcoded literal).
 */
export async function resolveLastScoredSessionId(
  // biome-ignore lint/suspicious/noExplicitAny: untyped Supabase client (no generated Database types yet)
  admin: SupabaseClient<any, "public", any>,
  userId: string,
  instrumentCode: string,
): Promise<string | null> {
  // Most-recent COMPLETED session of THIS user, joined to its instrument code.
  // The code is filtered in JS (not an embedded PostgREST filter) to keep the
  // query shape identical to score-on-done.ts and stay code-literal-free.
  const { data, error } = await admin
    .from("assessment_session")
    .select("id, instrument_version!inner(instrument!inner(code))")
    .eq("user_id", userId)
    .eq("status", "completed")
    .order("started_at", { ascending: false });

  if (error || !data) return null;

  const rows = data as unknown as Array<{
    id: string;
    instrument_version: { instrument: { code: string } } | null;
  }>;

  // Case-insensitive code match ([GAP-INSTRUMENT-CODE-CASING]): compare both
  // sides upper so an uppercased param still matches a mixed-case seed row.
  const targetCode = instrumentCode.toUpperCase();
  const session = rows.find(
    (r) => r.instrument_version?.instrument?.code?.toUpperCase() === targetCode,
  );

  return session?.id ?? null;
}
