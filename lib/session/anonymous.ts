/**
 * Anonymous-session domain — DescubreMe Phase 1 Wave 3 (Plan 01-06).
 *
 * Implements FOUND-09 (test sin registro) + FOUND-07 (pause/resume) +
 * D2.2 (sesion 7d anonima) via three helpers:
 *
 *   - `getOrCreateAnonymousSession(instrumentCode)` — sets a 30-char
 *     nanoid cookie if absent, looks up or creates an `assessment_session`
 *     row, returns the row. RLS bypass through service-role is necessary
 *     because `auth.uid()` is null in anonymous mode.
 *
 *   - `getNextItemForSession(sessionId)` — returns the item at
 *     `sequence_number = progress + 1` for the session's instrument
 *     version. Returns null when 60 items are completed.
 *
 *   - `advanceProgress(sessionId)` — set `progress` to the count of DISTINCT
 *     answered items (the `item_response` row count), NOT a blind +1 per
 *     submit (see [BUG-PROGRESS-DRIFT-ON-REANSWER]).
 *
 * Cookie config: nanoid(30) → 180 bits of entropy (T-01-06-01); httpOnly
 * (no JS read); secure; sameSite=lax (CSRF mitigation); 7-day maxAge
 * (D2.2 — matches pg_cron `cleanup-expired-anonymous-sessions`).
 *
 * COMPL-17 invariant: this module NEVER accepts `user_id` from an
 * external caller. The cookie is the only client-provided identifier;
 * the service-role client uses it as a primary key with `eq()` lookup.
 *
 * Anchors:
 * - 01-RESEARCH.md "Pattern 5: Anonymous session" lines 1618-1685.
 * - 01-CONTEXT.md D2.2, D2.7, D2.8.
 * - SKELETON.md "Auth" section.
 * - supabase/migrations/002_user_data.sql (pg_cron cleanup).
 */
import "server-only";
import { cookies } from "next/headers";

import { getSupabaseAdminClient } from "@/lib/supabase/service-role";

/**
 * Local helper: the Supabase JS client without generated types defaults
 * to `never` for `insert/update` payloads, which fights both the test
 * mock and real DB usage in Phase 1 (no `Database` types yet). We cast
 * the per-call builder via `as any` to keep the call sites readable
 * until Plan 01-12 wires `supabase gen types`.
 */
// biome-ignore lint/suspicious/noExplicitAny: see comment above
type AnyBuilder = any;

const COOKIE_NAME = "anonymous_session_id";
const SEVEN_DAYS_SEC = 60 * 60 * 24 * 7;

export interface AnonymousSession {
  id: string;
  user_id: string | null;
  anonymous_session_id: string | null;
  instrument_version_id: string;
  status: string;
  progress: number;
  started_at: string;
  expires_at: string | null;
  completed_at: string | null;
}

export interface ItemRow {
  id: string;
  instrument_version_id: string;
  sequence_number: number;
  stem: string;
  dimension: string | null;
  reverse_key: boolean;
}

/**
 * Returns the current anonymous session (creating it if necessary)
 * for the given instrument code. Sets/keeps the cookie. Phase 1 only
 * supports instruments resolvable via their `code`; the latest version
 * row is picked by `created_at DESC LIMIT 1`.
 */
export async function getOrCreateAnonymousSession(
  instrumentCode: string,
): Promise<AnonymousSession> {
  const cookieStore = await cookies();
  let anonId = cookieStore.get(COOKIE_NAME)?.value;
  const supabase = getSupabaseAdminClient();

  // Try to load an existing session for this cookie first.
  if (anonId) {
    const { data: existing } = await supabase
      .from("assessment_session")
      .select(
        "id, user_id, anonymous_session_id, instrument_version_id, status, progress, started_at, expires_at, completed_at",
      )
      .eq("anonymous_session_id", anonId)
      .maybeSingle();
    if (existing) return existing as AnonymousSession;
  }

  // Resolve current instrument_version_id for the given code.
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

  // No cookie reaching here means middleware (the only authorized place to
  // mint the anonymous cookie under Next.js 16) didn't run — Server Components
  // are forbidden from mutating cookies. This should be unreachable; if it
  // fires, surface a hard error rather than silently failing further down.
  if (!anonId) {
    throw new Error(
      "anonymous_session_id cookie missing — middleware did not mint it (only middleware can set cookies under Next.js 16; verify middleware.ts matcher covers this path)",
    );
  }

  const expiresAt = new Date(Date.now() + SEVEN_DAYS_SEC * 1000).toISOString();
  const insertPayload = {
    anonymous_session_id: anonId,
    instrument_version_id: (version as { id: string }).id,
    user_id: null,
    status: "open",
    progress: 0,
    expires_at: expiresAt,
  };
  const { data: inserted, error: insertError } = await (
    supabase.from("assessment_session") as AnyBuilder
  )
    .insert(insertPayload)
    .select(
      "id, user_id, anonymous_session_id, instrument_version_id, status, progress, started_at, expires_at, completed_at",
    )
    .single();

  if (insertError || !inserted) {
    throw new Error(
      `Failed to create anonymous session: ${insertError?.message ?? "unknown"}`,
    );
  }
  return inserted as AnonymousSession;
}

/**
 * Returns the item at `sequence_number = progress + 1` for the
 * session's instrument_version. Returns null when progress >= 60
 * (test complete; redirect to /done).
 */
export async function getNextItemForSession(
  sessionId: string,
): Promise<ItemRow | null> {
  const supabase = getSupabaseAdminClient();
  const { data: session, error: sessErr } = await supabase
    .from("assessment_session")
    .select("id, instrument_version_id, progress")
    .eq("id", sessionId)
    .maybeSingle();
  if (sessErr || !session) {
    throw new Error(
      `Session not found: ${sessionId} (${sessErr?.message ?? "no rows"})`,
    );
  }
  const sess = session as {
    id: string;
    instrument_version_id: string;
    progress: number;
  };

  const nextSeq = sess.progress + 1;
  const { data: item, error: itemErr } = await supabase
    .from("item")
    .select("id, instrument_version_id, sequence_number, stem, dimension, reverse_key")
    .eq("instrument_version_id", sess.instrument_version_id)
    .eq("sequence_number", nextSeq)
    .maybeSingle();
  if (itemErr) {
    throw new Error(`Failed to load next item: ${itemErr.message}`);
  }
  return (item as ItemRow | null) ?? null;
}

/**
 * Sets `progress` to the count of DISTINCT answered items and returns it.
 * Called by /api/respond AFTER the item_response upsert, so the count
 * already includes the just-saved answer.
 *
 * [BUG-PROGRESS-DRIFT-ON-REANSWER]: the previous implementation did a
 * read-modify-write `progress = progress + 1` on EVERY call, including a
 * re-answer of an already-answered item (an upsert UPDATE that adds no new
 * row). That drifted `progress` ahead of real coverage. Because
 * getNextItemForSession serves `sequence_number = progress + 1`, a drifted
 * progress skips items: the user reaches "done" having answered fewer than
 * 60 distinct items, and scoring then fails on the short dimension (e.g. a
 * session with progress=60 but only 59 distinct responses, C=9). Recomputing
 * from the unique-indexed `item_response` count makes progress == coverage
 * and is idempotent under re-answers.
 */
export async function advanceProgress(sessionId: string): Promise<number> {
  const supabase = getSupabaseAdminClient();
  const { count, error: countErr } = await (
    supabase.from("item_response") as AnyBuilder
  )
    .select("item_id", { count: "exact", head: true })
    .eq("session_id", sessionId);
  if (countErr) {
    throw new Error(
      `Failed to count responses for progress: ${sessionId} (${countErr.message})`,
    );
  }
  const next = (count as number | null) ?? 0;
  const { error: updErr } = await (
    supabase.from("assessment_session") as AnyBuilder
  )
    .update({ progress: next })
    .eq("id", sessionId);
  if (updErr) {
    throw new Error(`Failed to advance progress: ${updErr.message}`);
  }
  return next;
}

/**
 * Instrument-version metadata loaded by the generalized runner (Plan 02-07).
 * The runner reads N + scale + visual + ethics from THIS data, never from a
 * hardcoded `TOTAL_ITEMS` or instrument-code branch (FOUND-05).
 */
export interface InstrumentVersionMeta {
  instrumentCode: string;
  itemCount: number | null;
  likertMin: number | null;
  likertMax: number | null;
  visualType: string | null;
  sensitivity: string;
  /** Raw `instrument.ethical_flags` jsonb — decoupled by lib/ethics/middleware. */
  ethicalFlags: unknown;
}

/**
 * Loads the instrument metadata for a session's instrument_version, joined to
 * its instrument (code, sensitivity, ethical_flags). Returns null if not found.
 * This is the data-driven source the runner uses for N (item_count), the scale
 * shape, the report visual, and the NFR-27 modal gate — replacing the Phase-1
 * `TOTAL_ITEMS = 60` constant + O*NET anchor hardcode.
 */
export async function getInstrumentVersionMeta(
  instrumentVersionId: string,
): Promise<InstrumentVersionMeta | null> {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("instrument_version")
    .select(
      "item_count, likert_min, likert_max, visual_type, instrument!inner(code, sensitivity, ethical_flags)",
    )
    .eq("id", instrumentVersionId)
    .maybeSingle();

  if (error || !data) return null;

  const row = data as unknown as {
    item_count: number | null;
    likert_min: number | null;
    likert_max: number | null;
    visual_type: string | null;
    instrument: {
      code: string;
      sensitivity: string;
      ethical_flags: unknown;
    };
  };

  return {
    instrumentCode: row.instrument.code,
    itemCount: row.item_count,
    likertMin: row.likert_min,
    likertMax: row.likert_max,
    visualType: row.visual_type,
    sensitivity: row.instrument.sensitivity,
    ethicalFlags: row.instrument.ethical_flags,
  };
}

/**
 * Reads the current cookie value without mutating anything. Used by
 * /api/respond to enforce the cookie-vs-session match guard.
 */
export async function readAnonymousCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value ?? null;
}

export const ANONYMOUS_COOKIE_NAME = COOKIE_NAME;
