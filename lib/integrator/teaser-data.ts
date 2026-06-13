/**
 * Teaser data loaders — server-side DB reads for the integrated teaser page
 * (Plan 02-12 Task 3). Keeps lib/integrator/teaser.ts PURE: this module owns
 * the Supabase reads; the evaluator consumes the resolved band map + rules.
 *
 * Plugin-as-data (FOUND-05): every instrument code, band, and dimension is read
 * from DATA (report_snapshot.html_payload, instrument.code via join, the
 * integrator_rule rows). There are NO instrument-code literals here — this file
 * is in the lib/integrator SCAN_DIR.
 *
 * Per-instrument band: the teaser crosses operate at the INSTRUMENT level (one
 * band per instrument), but report_snapshot carries per-DIMENSION bands. We
 * derive one representative band per instrument = the dominant band across its
 * dimensions (mode; ties resolve toward the stronger band ALTO>MEDIO>BAJO). The
 * Cowork-authored rules are written against this instrument-level band; Phase 3
 * extends with dimension-grained rules.
 *
 * Quality flags (D-F2.1/F2.2): an instrument is flagged when its persisted
 * snapshot quality payload carries `severity='flag'` or a `single_pattern`
 * signal — the same predicate the report assembler uses (assembler.ts:496).
 *
 * Dormancy: returns empty maps gracefully when nothing is seeded/persisted yet
 * (product_stack + the 4 snapshots land in 02-13). The page then renders the
 * locked or gap state without throwing.
 *
 * Anchors:
 *   - 02-CONTEXT.md D-A.6 (gate), D-F2.1/F2.2 (quality omission).
 *   - lib/report/assembler.ts (snapshot payload shape + qualityFlag predicate).
 *   - supabase/migrations/014 (integrator_rule columns).
 */
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

import { logger } from "@/lib/logger";

import type { TeaserRuleRow } from "./teaser";

type Band = "ALTO" | "MEDIO" | "BAJO";

const BAND_STRENGTH: Record<Band, number> = { ALTO: 3, MEDIO: 2, BAJO: 1 };

interface SnapshotPayload {
  bands_by_dim?: Record<string, Band>;
  quality?: { severity?: string; signals?: string[] };
}

interface SnapshotRow {
  instrument_version: {
    instrument: { code: string } | null;
  } | null;
  html_payload: SnapshotPayload | null;
}

export interface ResolvedTeaserInputs {
  /** One representative band per instrument code (dominant band). */
  bandsByInstrument: Record<string, Band>;
  /** Instrument codes whose latest snapshot carries a quality flag (D-F2.1). */
  qualityFlaggedCodes: string[];
}

/**
 * The quality-flag predicate, identical to the report assembler's (D-F2.1).
 */
function snapshotIsFlagged(payload: SnapshotPayload | null): boolean {
  if (!payload?.quality) return false;
  return (
    payload.quality.severity === "flag" ||
    (payload.quality.signals ?? []).includes("single_pattern")
  );
}

/**
 * Reduce a per-dimension band map to one representative instrument band: the
 * most frequent band, breaking ties toward the stronger band.
 */
function dominantBand(bandsByDim: Record<string, Band>): Band | null {
  const counts: Record<Band, number> = { ALTO: 0, MEDIO: 0, BAJO: 0 };
  let any = false;
  for (const band of Object.values(bandsByDim)) {
    if (band in counts) {
      counts[band] += 1;
      any = true;
    }
  }
  if (!any) return null;
  const ranked = (Object.keys(counts) as Band[]).sort((a, b) => {
    const c = counts[b] - counts[a];
    if (c !== 0) return c;
    return BAND_STRENGTH[b] - BAND_STRENGTH[a];
  });
  return ranked[0] ?? null;
}

/**
 * Resolve the per-instrument band map + quality-flagged set for a user from
 * their persisted report snapshots. One snapshot per instrument is expected
 * (the latest wins if duplicates exist). Returns empty maps on error/dormancy.
 */
export async function resolveTeaserInputs(
  // biome-ignore lint/suspicious/noExplicitAny: untyped Supabase client (no generated Database types)
  supabase: SupabaseClient<any, "public", any>,
  userId: string,
): Promise<ResolvedTeaserInputs> {
  const { data, error } = await supabase
    .from("report_snapshot")
    .select(
      "html_payload, rendered_at, instrument_version!inner(instrument!inner(code))",
    )
    .eq("user_id", userId)
    .order("rendered_at", { ascending: true });

  if (error || !data) {
    if (error) {
      logger.error({ code: error.code }, "teaser_inputs_select_failed");
    }
    return { bandsByInstrument: {}, qualityFlaggedCodes: [] };
  }

  const rows = data as unknown as SnapshotRow[];
  const bandsByInstrument: Record<string, Band> = {};
  const flagged = new Set<string>();

  for (const row of rows) {
    const code = row.instrument_version?.instrument?.code;
    if (!code) continue;
    const band = dominantBand(row.html_payload?.bands_by_dim ?? {});
    // Later snapshots overwrite earlier ones (ordered ascending => latest wins).
    if (band) bandsByInstrument[code] = band;
    if (snapshotIsFlagged(row.html_payload ?? null)) flagged.add(code);
  }

  return { bandsByInstrument, qualityFlaggedCodes: [...flagged] };
}

/**
 * Load the seeded `integrator_rule` rows for the teaser (tier='teaser').
 * Returns `[]` on error/empty so the evaluator falls back to gapResult.
 */
export async function loadTeaserRules(
  // biome-ignore lint/suspicious/noExplicitAny: untyped Supabase client
  supabase: SupabaseClient<any, "public", any>,
  lang = "es-CO",
  version = "1.0",
): Promise<TeaserRuleRow[]> {
  const { data, error } = await supabase
    .from("integrator_rule")
    .select("tier, conditions, template_text, requires_dimensions")
    .eq("tier", "teaser")
    .eq("lang", lang)
    .eq("version", version);

  if (error || !data) {
    if (error) {
      logger.error({ code: error.code }, "teaser_rules_select_failed");
    }
    return [];
  }

  return (data as unknown as RawRuleRow[]).map((r) => ({
    tier: r.tier,
    conditions: r.conditions,
    template_text: r.template_text,
    requires_dimensions: Array.isArray(r.requires_dimensions)
      ? r.requires_dimensions
      : [],
  }));
}

interface RawRuleRow {
  tier: string;
  conditions: unknown;
  template_text: string | null;
  requires_dimensions: unknown;
}
