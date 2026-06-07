/**
 * Baremo selector + percentile gate (Plan 01-08, Wave 5).
 *
 * Implementa:
 *   - selectBaremo(supabase, instrumentVersionId, countryCode) — QUAL-06
 *     fallback CO -> MX -> INTL + telemetria a baremo_fallback_event.
 *   - shouldShowPercentile({alpha, baremoPopulation, latamStatus}) — QUAL-02
 *     gate de display de percentil numerico vs banda categorica.
 *
 * Plugin-as-data: este modulo NO contiene strings literales con codigos de
 * instrumento. Lee `baremo` rows por `instrument_version_id`.
 *
 * Anchors:
 *   - 01-RESEARCH.md lineas 1780-1782 (Pitfall 10).
 *   - 01-CONTEXT.md D3.8 (display rules).
 *   - PLAN.md §<behavior> 7-9 + threat T-01-08-02.
 */
import type { SupabaseClient } from "@supabase/supabase-js";

import { logger } from "@/lib/logger";

export type BaremoPopulation = "CO" | "MX" | "INTL";

export interface BaremoRow {
  id: string;
  instrument_version_id: string;
  population: BaremoPopulation;
  type: string;
  reference_data: unknown;
}

export interface SelectBaremoResult {
  baremo: BaremoRow | null;
  fallback: boolean;
  populationUsed: BaremoPopulation | null;
}

/**
 * Fallback order from a requested country to the best available baremo:
 *   CO -> MX -> INTL
 *   MX -> INTL
 *   <other> -> INTL
 *
 * The "fallback" boolean is true iff `populationUsed !== countryCode`.
 */
function fallbackChain(countryCode: string): BaremoPopulation[] {
  if (countryCode === "CO") return ["CO", "MX", "INTL"];
  if (countryCode === "MX") return ["MX", "INTL"];
  return ["INTL"];
}

/**
 * Reads the baremo for an instrument version in the requested country,
 * falling back to MX then INTL. Writes a telemetry row to
 * `baremo_fallback_event` when fallback occurs (QUAL-08).
 *
 * `serviceRole` is REQUIRED for the telemetry write because RLS denies
 * baremo_fallback_event INSERT for `authenticated` and `anon`. Callers
 * pass it explicitly so the dependency is visible (no hidden privilege
 * escalation — PATTERNS §1.5 rule 6).
 */
export async function selectBaremo(
  supabase: SupabaseClient,
  serviceRole: SupabaseClient,
  instrumentVersionId: string,
  countryCode: string,
): Promise<SelectBaremoResult> {
  const chain = fallbackChain(countryCode);
  for (const population of chain) {
    const { data, error } = await supabase
      .from("baremo")
      .select("id, instrument_version_id, population, type, reference_data")
      .eq("instrument_version_id", instrumentVersionId)
      .eq("population", population)
      .maybeSingle();
    if (error) {
      logger.error(
        {
          population,
          instrument_version_id: instrumentVersionId,
          code: error.code,
        },
        "baremo_select_failed",
      );
      continue;
    }
    if (data) {
      const fallback = population !== countryCode;
      if (fallback) {
        await recordBaremoFallback(
          serviceRole,
          instrumentVersionId,
          countryCode,
          population,
        );
      }
      return {
        baremo: data as BaremoRow,
        fallback,
        populationUsed: population,
      };
    }
  }
  return { baremo: null, fallback: false, populationUsed: null };
}

async function recordBaremoFallback(
  serviceRole: SupabaseClient,
  instrumentVersionId: string,
  countryRequested: string,
  baremoUsed: BaremoPopulation,
): Promise<void> {
  const { error } = await serviceRole.from("baremo_fallback_event").insert({
    instrument_version_id: instrumentVersionId,
    country_requested: countryRequested,
    baremo_used: baremoUsed,
  });
  if (error) {
    logger.error(
      {
        instrument_version_id: instrumentVersionId,
        country_requested: countryRequested,
        baremo_used: baremoUsed,
        code: error.code,
      },
      "baremo_fallback_telemetry_write_failed",
    );
    // Do not throw — telemetry is best-effort. The score endpoint still
    // succeeds even if the telemetry insert fails.
  }
}

// ---------------------------------------------------------------------------
// QUAL-02 percentile display gate
// ---------------------------------------------------------------------------

export type LatamStatus = "pending" | "validated";

export interface PercentileGateInput {
  /** Cronbach alpha for the dimension/population. */
  alpha: number;
  baremoPopulation: BaremoPopulation;
  /** Status of the LATAM adaptation (CONTEXT D3.8). */
  latamStatus: LatamStatus;
}

/**
 * Decides whether the UI may display a numeric percentile.
 *
 * Returns false (use Alto/Medio/Bajo band + "baremo en validacion" note)
 * when ANY of:
 *   - alpha < 0.70 (psychometric Gate 1 unmet).
 *   - latamStatus = 'pending' (CONTEXT D3.8).
 *   - populationUsed = 'INTL' (CONTEXT D3.8 — Free phase 1 display rule).
 *
 * Returns true when CO/MX baremo with alpha >= 0.70 and latamStatus = 'validated'.
 */
export function shouldShowPercentile(input: PercentileGateInput): boolean {
  if (input.alpha < 0.7) return false;
  if (input.latamStatus === "pending") return false;
  if (input.baremoPopulation === "INTL") return false;
  return true;
}
