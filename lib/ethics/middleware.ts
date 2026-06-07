/**
 * Ethics middleware — COMPL-12 + COMPL-13 plumbing (Plan 01-08, Wave 5).
 *
 * `evaluateInstrumentEthics(supabase, instrumentVersionId)` lee la row
 * `instrument.ethical_flags` (jsonb) y decide si el flujo de respuesta
 * requiere:
 *   - requires_disclaimer (NFR-27 banner pre-test) — Phase 2 monta la UI.
 *   - requires_contention_route (NFR-28 ruta de contencion al cierre) — Phase 2.
 *
 * Phase 1 NO renderiza UI (D3.12 difiere a Phase 2). Solo se construye
 * el seam: el route handler `/api/score` puede leer este resultado y
 * marcar el `report_snapshot.html_payload.ethics = {...}` para que el
 * cliente Phase 2 decida que mostrar.
 *
 * O*NET IP-SF (`ethical_flags = []`) → ningun disparo. MOCK-DISTRESS-1
 * (`ethical_flags.emotional_distress = true`) → ambos disparos.
 *
 * Anchors:
 *   - 01-RESEARCH.md lineas 1325-1349 (verbatim).
 *   - 01-CONTEXT.md D3.12 (Phase 1 plumbing only).
 *   - PLAN.md §<behavior> 12.
 */
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

export type EthicalFlag = "emotional_distress" | "high_sensitivity_personality";

export interface EthicsDecision {
  requires_disclaimer: boolean;
  requires_contention_route: boolean;
  flags: EthicalFlag[];
}

/**
 * Reads `instrument_version` → `instrument.ethical_flags` and returns the
 * Phase 1 plumbing decision. Throws when the instrument_version row does
 * not exist (caller deals with 404).
 *
 * The `ethical_flags` jsonb shape is `{"emotional_distress": true, ...}`
 * (boolean values). Keys with `true` values are returned as `flags`.
 */
export async function evaluateInstrumentEthics(
  supabase: SupabaseClient,
  instrumentVersionId: string,
): Promise<EthicsDecision> {
  // Two-step lookup: instrument_version_id -> instrument_id -> ethical_flags.
  // We do it as two queries to avoid relying on PostgREST's `select(...).select(...)`
  // foreign-key embed syntax (works but ties the contract to schema cache).
  const { data: version, error: versionError } = await supabase
    .from("instrument_version")
    .select("instrument_id")
    .eq("id", instrumentVersionId)
    .maybeSingle();
  if (versionError || !version) {
    throw new Error(
      `Instrument version not found: ${instrumentVersionId}`,
    );
  }
  const versionRow = version as { instrument_id: string };

  const { data: instr, error: instrError } = await supabase
    .from("instrument")
    .select("ethical_flags, sensitivity")
    .eq("id", versionRow.instrument_id)
    .maybeSingle();
  if (instrError || !instr) {
    throw new Error(
      `Instrument not found for version ${instrumentVersionId}`,
    );
  }

  const row = instr as {
    ethical_flags: unknown;
    sensitivity: string;
  };
  const flags = parseEthicalFlags(row.ethical_flags);
  const requires =
    flags.includes("emotional_distress") || row.sensitivity === "high";

  return {
    requires_disclaimer: requires,
    requires_contention_route: flags.includes("emotional_distress"),
    flags,
  };
}

function parseEthicalFlags(raw: unknown): EthicalFlag[] {
  if (raw == null) return [];
  // Shape 1: array of strings -> ['emotional_distress'].
  if (Array.isArray(raw)) {
    return raw.filter(
      (v): v is EthicalFlag =>
        v === "emotional_distress" || v === "high_sensitivity_personality",
    );
  }
  // Shape 2: object map -> {'emotional_distress': true}.
  if (typeof raw === "object") {
    const obj = raw as Record<string, unknown>;
    const out: EthicalFlag[] = [];
    if (obj.emotional_distress === true) out.push("emotional_distress");
    if (obj.high_sensitivity_personality === true)
      out.push("high_sensitivity_personality");
    return out;
  }
  return [];
}
