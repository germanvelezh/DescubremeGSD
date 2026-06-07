/**
 * Narrative loader — D3.2 + Plan 01-09 Wave 6.
 *
 * Composes the user-facing narrative text by reading rows from
 * `narrative_template` (seeded by Cowork — [GAP-RIASEC-NARRATIVES-ES-CO]).
 *
 * Plugin-as-data: this module reads `riasec_code`, `lang`, `version`, `slot`
 * as rows. There are NO instrument code literals here (the file is in the
 * FOUND-05 lint scan).
 *
 * Slots:
 *  - `top_3_phrase` — 1-2 lines for Layer 1 (e.g. "RIA" combo phrase).
 *  - `dimensional_high` — sentences describing the user's top dimension.
 *  - `dimensional_low` — sentences describing the user's bottom dimension.
 *
 * When the table is empty (typical Phase 1 pre-Cowork-delivery), the loader
 * returns a deterministic GAP placeholder so the UI renders without throwing.
 *
 * Anchors:
 *   - 01-CONTEXT.md D3.2.
 *   - 01-PATTERNS.md §2.3 row "lib/report/narrative-loader.ts".
 */
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

import { logger } from "@/lib/logger";

export interface LoadNarrativeInput {
  /** Top-3 RIASEC code joined as 3-letter string (e.g. "RIA"). */
  riasecCode: string;
  lang?: string;
  version?: string;
  /** The user's #1 dimension (single letter), for the `dimensional_high` slot. */
  topDimension: string;
  /** The user's #6 dimension (single letter), for the `dimensional_low` slot. */
  bottomDimension: string;
}

export interface LoadNarrativeResult {
  /** The Layer-1 frase reveladora. May be a GAP placeholder. */
  topPhrase: string;
  /** Sentences for the user's highest dimension. */
  dimensionalHigh: string[];
  /** Sentences for the user's lowest dimension. */
  dimensionalLow: string[];
}

interface NarrativeTemplateRow {
  slot: string;
  riasec_code: string;
  template_text: string;
}

export async function loadNarrative(
  supabase: SupabaseClient,
  input: LoadNarrativeInput,
): Promise<LoadNarrativeResult> {
  const lang = input.lang ?? "es-CO";
  const version = input.version ?? "1.0";
  const slots = ["top_3_phrase", "dimensional_high", "dimensional_low"];

  const { data, error } = await supabase
    .from("narrative_template")
    .select("slot, riasec_code, template_text")
    .eq("lang", lang)
    .eq("version", version)
    .in("slot", slots)
    .in("riasec_code", [input.riasecCode, input.topDimension, input.bottomDimension]);

  if (error) {
    logger.error(
      { code: error.code, riasec_code: input.riasecCode },
      "narrative_loader_select_failed",
    );
    return gapResult(input.riasecCode);
  }

  const rows = (data ?? []) as NarrativeTemplateRow[];
  if (rows.length === 0) {
    return gapResult(input.riasecCode);
  }

  const topPhrase =
    rows.find(
      (r) => r.slot === "top_3_phrase" && r.riasec_code === input.riasecCode,
    )?.template_text ?? gapPlaceholder(input.riasecCode);

  const dimensionalHigh = rows
    .filter(
      (r) =>
        r.slot === "dimensional_high" && r.riasec_code === input.topDimension,
    )
    .map((r) => r.template_text);

  const dimensionalLow = rows
    .filter(
      (r) =>
        r.slot === "dimensional_low" && r.riasec_code === input.bottomDimension,
    )
    .map((r) => r.template_text);

  return { topPhrase, dimensionalHigh, dimensionalLow };
}

function gapResult(riasecCode: string): LoadNarrativeResult {
  return {
    topPhrase: gapPlaceholder(riasecCode),
    dimensionalHigh: [],
    dimensionalLow: [],
  };
}

function gapPlaceholder(riasecCode: string): string {
  // The literal "[GAP - Cowork delivery: ...]" is intentional — the verifier
  // and SUMMARY both look for it. The deferred-items file documents the swap.
  return `[GAP - Cowork delivery: narrative template para top-3 ${riasecCode} pending]`;
}
