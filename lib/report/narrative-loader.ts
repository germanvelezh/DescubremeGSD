/**
 * Narrative loader — D3.2 (Plan 01-09) + D-C.4 (Plan 02-04).
 *
 * Composes the user-facing narrative text by reading rows from
 * `narrative_template` (seeded by Cowork — [GAP-RIASEC-NARRATIVES-ES-CO] /
 * pack §5 for the new instruments).
 *
 * Plugin-as-data: this module reads `slot`, `riasec_code`, `dimension`, `band`,
 * `lang`, `version` as rows and branches on the `slot` DATA value. There are NO
 * instrument-code literals here (the file is in the FOUND-05 lint scan).
 *
 * RIASEC combo path (hexagon instruments) — slots:
 *  - `top_3_phrase` — 1-2 lines for Layer 1 (e.g. "RIA" combo phrase).
 *  - `dimensional_high` — sentences describing the user's top dimension.
 *  - `dimensional_low` — sentences describing the user's bottom dimension.
 *
 * Dimension×band path (bars/circumplex instruments — Plan 02-04, D-C.4):
 *  - `dimension_band` — one phrase per (dimension, band) keyed by DATA, not by
 *    a RIASEC combo. This is a distinct query shape ADDED ALONGSIDE the RIASEC
 *    path (RESEARCH Pitfall 2), NOT a rename.
 *
 * When the table is empty (typical pre-Cowork-delivery), the loader returns a
 * deterministic GAP placeholder so the UI renders without throwing.
 *
 * Anchors:
 *   - 01-CONTEXT.md D3.2.
 *   - 02-CONTEXT.md D-C.4 (narrative dimension×band).
 *   - 02-PATTERNS.md § "lib/report/narrative-loader.ts (MODIFY — add path)".
 */
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

import { logger } from "@/lib/logger";

/** RIASEC combo input (hexagon path — unchanged from Phase 1). */
export interface LoadNarrativeRiasecInput {
  slot?: "riasec";
  /** Top-3 RIASEC code joined as 3-letter string (e.g. "RIA"). */
  riasecCode: string;
  lang?: string;
  version?: string;
  /** The user's #1 dimension (single letter), for the `dimensional_high` slot. */
  topDimension: string;
  /** The user's #6 dimension (single letter), for the `dimensional_low` slot. */
  bottomDimension: string;
}

/** One (dimension, band) lookup for the dimension×band path. */
export interface DimensionBand {
  dimension: string;
  band: string;
}

/** Dimension×band input (bars/circumplex path — Plan 02-04, D-C.4). */
export interface LoadNarrativeDimensionBandInput {
  slot: "dimension_band";
  /** Per-dimension band lookups (e.g. all 4 HOV with their within-person band). */
  dimensions: DimensionBand[];
  lang?: string;
  version?: string;
}

export type LoadNarrativeInput =
  | LoadNarrativeRiasecInput
  | LoadNarrativeDimensionBandInput;

export interface LoadNarrativeResult {
  /** The Layer-1 frase reveladora. May be a GAP placeholder. */
  topPhrase: string;
  /** Sentences for the user's highest dimension (RIASEC path). */
  dimensionalHigh: string[];
  /** Sentences for the user's lowest dimension (RIASEC path). */
  dimensionalLow: string[];
  /**
   * dimension×band path result: one phrase per dimension keyed by dimension
   * name. Empty `{}` when the table has no matching rows. Undefined on the
   * RIASEC path.
   */
  byDimensionBand?: Record<string, string>;
}

interface NarrativeTemplateRow {
  slot: string;
  /** RIASEC path key — nullable on dimension×band rows. */
  riasec_code: string | null;
  /** dimension×band path keys — nullable on RIASEC rows. */
  dimension?: string | null;
  band?: string | null;
  template_text: string;
}

export async function loadNarrative(
  supabase: SupabaseClient,
  input: LoadNarrativeInput,
): Promise<LoadNarrativeResult> {
  if (input.slot === "dimension_band") {
    return loadDimensionBand(supabase, input);
  }
  return loadRiasec(supabase, input);
}

// ---------------------------------------------------------------------------
// RIASEC combo path (hexagon) — unchanged from Phase 1.
// ---------------------------------------------------------------------------

async function loadRiasec(
  supabase: SupabaseClient,
  input: LoadNarrativeRiasecInput,
): Promise<LoadNarrativeResult> {
  const lang = input.lang ?? "es-CO";
  const version = input.version ?? "1.0";
  const slots = ["top_3_phrase", "dimensional_high", "dimensional_low"];

  const { data, error } = await supabase
    .from("narrative_template")
    .select("slot, riasec_code, dimension, band, template_text")
    .eq("lang", lang)
    .eq("version", version)
    .in("slot", slots)
    .in("riasec_code", [
      input.riasecCode,
      input.topDimension,
      input.bottomDimension,
    ]);

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

// ---------------------------------------------------------------------------
// Dimension×band path (bars/circumplex) — Plan 02-04, D-C.4.
// ---------------------------------------------------------------------------

async function loadDimensionBand(
  supabase: SupabaseClient,
  input: LoadNarrativeDimensionBandInput,
): Promise<LoadNarrativeResult> {
  const lang = input.lang ?? "es-CO";
  const version = input.version ?? "1.0";
  const dimensions = input.dimensions.map((d) => d.dimension);
  const bands = input.dimensions.map((d) => d.band);

  const { data, error } = await supabase
    .from("narrative_template")
    .select("slot, riasec_code, dimension, band, template_text")
    .eq("lang", lang)
    .eq("version", version)
    .eq("slot", "dimension_band")
    .in("dimension", dimensions)
    .in("band", bands);

  if (error) {
    logger.error({ code: error.code }, "narrative_loader_dimband_select_failed");
    return dimensionBandGapResult();
  }

  const rows = (data ?? []) as NarrativeTemplateRow[];
  if (rows.length === 0) {
    return dimensionBandGapResult();
  }

  // Match each requested (dimension, band) to its row. Only exact (dim, band)
  // pairs the caller asked for are kept — the `.in()` filters can over-fetch
  // cross products, so re-check the pairing here.
  const byDimensionBand: Record<string, string> = {};
  for (const { dimension, band } of input.dimensions) {
    const row = rows.find(
      (r) =>
        r.slot === "dimension_band" &&
        r.dimension === dimension &&
        r.band === band,
    );
    if (row) byDimensionBand[dimension] = row.template_text;
  }

  return {
    topPhrase: "",
    dimensionalHigh: [],
    dimensionalLow: [],
    byDimensionBand,
  };
}

// ---------------------------------------------------------------------------
// GAP placeholders.
// ---------------------------------------------------------------------------

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

function dimensionBandGapResult(): LoadNarrativeResult {
  // Deterministic placeholder so a bars/circumplex slice renders before the
  // pack §5 dimension×band seeds land. `byDimensionBand` is empty so the
  // assembler/UI can detect "no narrative yet" without throwing.
  return {
    topPhrase: "[GAP - Cowork delivery: narrativa dimension×banda pendiente]",
    dimensionalHigh: [],
    dimensionalLow: [],
    byDimensionBand: {},
  };
}
