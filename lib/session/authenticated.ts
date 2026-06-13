/**
 * Authenticated-session domain — DescubreMe Phase 2 (Plan 02-14).
 *
 * Closes the first half of [GAP-AUTH-4TEST-RUNTIME] P0: a signed-in user
 * walking the Free 4-test journey (BFI-2-S / TwIVI / PERMA after O*NET, per
 * D-A.1) needs an `assessment_session` row carrying `user_id` — there was no
 * code path creating one. The Phase-1 anonymous flow (`anonymous.ts`) is
 * anon-only by COMPL-17 invariant and must NOT learn to accept a user_id; this
 * module is the SEPARATE, authenticated counterpart.
 *
 * COMPL-17 boundary (T-02-14-01): `getOrCreateAuthenticatedSession` takes a
 * `userId` PARAMETER, but its sole legitimate source is the SERVER-side
 * `getSupabaseServerClient().auth.getUser()` (a JWT validated against the auth
 * server, NOT a client-supplied value, NOT `getSession()` which only reads the
 * raw cookie). The runner resolves the user that way before calling this. The
 * service-role client performs the writes — the same pattern the Phase-1 claim
 * (`claim.ts`) uses to write `user_id` rows.
 *
 * Difference vs the anonymous session: authenticated sessions do NOT carry an
 * `expires_at` — they do not expire at 7 days (D-F3.2 sin caducidad). The
 * returned row uses the SAME `AnonymousSession` shape the runner already
 * consumes, so `page.tsx` branches only on auth-vs-anon, not on the row shape.
 *
 * No migration: `assessment_session` already admits `user_id` (the Phase-1
 * claim writes it).
 *
 * Anchors:
 *  - 02-CONTEXT.md D-A.1 (tests sensibles ya autenticado), D-F3.2 (sin caducidad).
 *  - lib/session/anonymous.ts (getOrCreateAnonymousSession — the reused pattern).
 *  - lib/session/claim.ts (service-role + user_id writes, Phase 1).
 */
import "server-only";

import { getSupabaseAdminClient } from "@/lib/supabase/service-role";
import type { AnonymousSession } from "@/lib/session/anonymous";

/**
 * Local helper: the untyped Supabase JS client defaults to `never` for
 * insert/update payloads (no generated `Database` types yet). Cast the
 * per-call builder via `as any` to keep call sites readable — same convention
 * as `lib/session/anonymous.ts`.
 */
// biome-ignore lint/suspicious/noExplicitAny: see lib/session/anonymous.ts
type AnyBuilder = any;

const SESSION_COLUMNS =
  "id, user_id, anonymous_session_id, instrument_version_id, status, progress, started_at, expires_at, completed_at";

/**
 * Returns the current authenticated session (creating it if necessary) for the
 * given instrument code + user. Continue-or-create:
 *
 *   1. Resolve the latest `instrument_version_id` for `instrumentCode`
 *      (`created_at DESC LIMIT 1`) — same join shape as the anonymous helper.
 *   2. Look up an existing session for `(user_id = userId, instrument_version_id)`
 *      and return it if present (continue/resume an in-progress test).
 *   3. Otherwise INSERT a fresh session `{ user_id, anonymous_session_id: null,
 *      instrument_version_id, status: 'open', progress: 0 }` — NO `expires_at`
 *      (D-F3.2 sin caducidad).
 *
 * `userId` MUST originate from `getSupabaseServerClient().auth.getUser()` on the
 * server (COMPL-17, T-02-14-01); this helper never receives a client value.
 */
export async function getOrCreateAuthenticatedSession(
  instrumentCode: string,
  userId: string,
): Promise<AnonymousSession> {
  const supabase = getSupabaseAdminClient();

  // 1. Resolve current instrument_version_id for the given code.
  const { data: version, error: versionError } = await supabase
    .from("instrument_version")
    .select("id, instrument!inner(code)")
    .eq("instrument.code", instrumentCode)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (versionError || !version) {
    throw new Error(
      `Instrument version not found for code=${instrumentCode}: ${versionError?.message ?? "no rows"}`,
    );
  }
  const instrumentVersionId = (version as { id: string }).id;

  // 2. Continue path: return an existing session for this user + version.
  const { data: existing, error: existingError } = await supabase
    .from("assessment_session")
    .select(SESSION_COLUMNS)
    .eq("user_id", userId)
    .eq("instrument_version_id", instrumentVersionId)
    .order("started_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (existingError) {
    throw new Error(
      `Failed to look up authenticated session: ${existingError.message}`,
    );
  }
  if (existing) return existing as AnonymousSession;

  // 3. Create path: new session owned by the user, no caducidad (D-F3.2).
  const insertPayload = {
    user_id: userId,
    anonymous_session_id: null,
    instrument_version_id: instrumentVersionId,
    status: "open",
    progress: 0,
  };
  const { data: inserted, error: insertError } = await (
    supabase.from("assessment_session") as AnyBuilder
  )
    .insert(insertPayload)
    .select(SESSION_COLUMNS)
    .single();

  if (insertError || !inserted) {
    throw new Error(
      `Failed to create authenticated session: ${insertError?.message ?? "unknown"}`,
    );
  }
  return inserted as AnonymousSession;
}
