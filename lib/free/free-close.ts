/**
 * resolveFreeCloseTarget — resolves the O*NET close session for the Free funnel
 * ([GAP-W5W6-ORPHANED-FREE-FLOW], P1; FREE-10/FREE-11; UX-04/UX-05).
 *
 * The problem (estado/DECISION_W5W6_Funnel_Surface_v0.1.md): the inverted funnel
 * (ADR-029) closes the authenticated Free flow at `/perfil-integrado`, which
 * never visits `/reporte/[sessionId]` — so the W5 level capture and the W6 Job
 * Zone reveal (both built ON the O*NET per-session report) became orphaned. Nivel
 * is never asked → `target_job_zone` never computed → the occupational reveal
 * never shown.
 *
 * The fix (Opción B, German 2026-06-29): on `allComplete`, route to the O*NET
 * report surface recut by-context (`/reporte/{onet}?cierre=free`). This helper
 * resolves WHICH session that is — the testable seam for the `/done` server
 * component (built on redirect(), hard to unit-test inline). It mirrors the shape
 * and discipline of `lib/free/score-on-done.ts`.
 *
 * Resolution (plugin-as-data, FOUND-05-clean): the O*NET session is the user's
 * most-recent `status='completed'` session whose `instrument_version.visual_type`
 * is 'hexagon' (the metadata that distinguishes O*NET from bars/circumplex;
 * assembler.ts:340,370). The instrument code is NEVER referenced — lib/free is in
 * FOUND-05 SCAN_DIRS, so this file carries zero instrument-code literal. The
 * "hexagon" literal is `visual_type` metadata, not an instrument code.
 *
 * Snapshot prerequisite (estado/DECISION §4, VERIFIED 2026-06-29 — 3/3 prod O*NET
 * sessions have a snapshot): a candidate is returned ONLY if its `report_snapshot`
 * exists (related by `session_id`, not nested under instrument_version;
 * assembler.ts:357). Without a snapshot `/reporte` would 404
 * ([GAP-CALLBACK-INCOMPLETE-SESSION-REPORTE-404], out of scope here) — so an
 * incomplete session is skipped and the caller degrades to `/perfil-integrado`.
 *
 * Best-effort: a query failure returns `null` (never throws) so the caller's
 * routing always proceeds — the same log-and-continue discipline as
 * score-on-done.ts. Trust: filtered by `user_id` (from getUser()'s validated JWT,
 * passed by /done), so it only ever resolves the caller's own session.
 *
 * Anchors:
 *  - lib/free/score-on-done.ts (query + best-effort pattern).
 *  - lib/report/assembler.ts (visual_type branch; report_snapshot by session_id).
 *  - estado/DECISION_W5W6_Funnel_Surface_v0.1.md (Opción B + snapshot prerequisite).
 */
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Resolves the user's most-recent completed O*NET session (visual_type='hexagon')
 * that already has a report_snapshot. Returns its `session_id`, or `null` when no
 * such session exists or the lookup fails (best-effort — the caller degrades to
 * `/perfil-integrado`). Never throws.
 *
 * @param admin service-role client (server-side; bypasses RLS — the user_id
 *   filter is the scoping defense).
 * @param userId the authenticated user's id (from getUser()'s validated JWT).
 */
export async function resolveFreeCloseTarget(
  // biome-ignore lint/suspicious/noExplicitAny: untyped Supabase client (no generated Database types yet)
  admin: SupabaseClient<any, "public", any>,
  userId: string,
): Promise<string | null> {
  // Completed sessions of THIS user, joined to their visual_type metadata. The
  // hexagon filter runs in JS (not an embedded PostgREST filter) to keep the
  // query shape identical to the proven joins in /done and score-on-done, and to
  // resolve by metadata only — the helper stays code-literal-free (FOUND-05).
  const { data, error } = await admin
    .from("assessment_session")
    .select("id, instrument_version!inner(visual_type)")
    .eq("user_id", userId)
    .eq("status", "completed")
    .order("started_at", { ascending: false });

  if (error || !data) return null;

  const rows = data as unknown as Array<{
    id: string;
    instrument_version: { visual_type: string | null } | null;
  }>;

  // Resolve by metadata: the O*NET report is the only one with a hexagon visual
  // (assembler.ts:370). Most-recent first (the query orders by started_at desc).
  const hexagonCandidates = rows.filter(
    (r) => r.instrument_version?.visual_type === "hexagon",
  );

  // Return the most-recent hexagon candidate that already has a snapshot. The
  // snapshot relates to the session by `session_id` (assembler.ts:357), NOT
  // nested under instrument_version. Without a snapshot `/reporte` 404s, so skip
  // to the next candidate (or null) — keeps the incomplete-session 404 out of
  // scope ([GAP-CALLBACK-INCOMPLETE-SESSION-REPORTE-404]).
  for (const candidate of hexagonCandidates) {
    const { data: snapshot } = await admin
      .from("report_snapshot")
      .select("id")
      .eq("session_id", candidate.id)
      .maybeSingle();
    if (snapshot) return candidate.id;
  }

  return null;
}
