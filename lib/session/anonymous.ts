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
 *   - `advanceProgress(sessionId)` — UPDATE assessment_session SET
 *     progress = progress + 1.
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
import { nanoid } from "nanoid";

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
const NANOID_LENGTH = 30;
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

  // No cookie -> mint one before INSERT.
  if (!anonId) {
    anonId = nanoid(NANOID_LENGTH);
    cookieStore.set(COOKIE_NAME, anonId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SEVEN_DAYS_SEC,
      path: "/",
    });
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
 * Atomically increments `progress` on the session. Returns the new
 * progress value. Used by /api/respond after a successful INSERT
 * into item_response.
 */
export async function advanceProgress(sessionId: string): Promise<number> {
  const supabase = getSupabaseAdminClient();
  // Read-modify-write is acceptable here because per-session writes
  // are strictly serialized by the user's tab (one item at a time).
  const { data: current, error: readErr } = await supabase
    .from("assessment_session")
    .select("progress")
    .eq("id", sessionId)
    .maybeSingle();
  if (readErr || !current) {
    throw new Error(
      `Session not found for advance: ${sessionId} (${readErr?.message ?? "no rows"})`,
    );
  }
  const next = ((current as { progress: number }).progress ?? 0) + 1;
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
 * Reads the current cookie value without mutating anything. Used by
 * /api/respond to enforce the cookie-vs-session match guard.
 */
export async function readAnonymousCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value ?? null;
}

export const ANONYMOUS_COOKIE_NAME = COOKIE_NAME;
