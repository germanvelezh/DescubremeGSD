/**
 * Contention resources loader — COMPL-11 (Plan 01-08, Wave 5).
 *
 * `getContentionResources(supabase, countryCode)` retorna los recursos D1.7
 * desde `contention_resources` y emite warning si cualquiera tiene
 * `last_verified_at` mas viejo que 90 dias (Pitfall 13 mitigation).
 *
 * Phase 1 NO bloquea — el warning logger.warn es suficiente. Phase 6
 * POLISH-06 formaliza la verificacion mensual con alerta UI a German.
 *
 * Anchors:
 *   - 01-RESEARCH.md lineas 1295-1323 + 1795-1797.
 *   - 01-CONTEXT.md D1.7.
 *   - PLAN.md §<behavior> 11.
 */
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

import { logger } from "@/lib/logger";

const STALE_THRESHOLD_DAYS = 90;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

export interface ContentionResource {
  id: string;
  country_code: string;
  type: string;
  name: string;
  phone: string | null;
  url: string | null;
  description_es_co: string;
  hours: string | null;
  last_verified_at: string;
}

/**
 * Returns true when `verified_at` is more than 90 days older than `now`.
 * Pure helper — exposed for unit tests that exercise the threshold logic
 * without a DB round-trip.
 */
export function isContentionStale(verifiedAt: Date, now: Date): boolean {
  const deltaDays = (now.getTime() - verifiedAt.getTime()) / MS_PER_DAY;
  return deltaDays > STALE_THRESHOLD_DAYS;
}

export async function getContentionResources(
  supabase: SupabaseClient,
  countryCode: string,
): Promise<ContentionResource[]> {
  const { data, error } = await supabase
    .from("contention_resources")
    .select(
      "id, country_code, type, name, phone, url, description_es_co, hours, last_verified_at",
    )
    .eq("country_code", countryCode);

  if (error) {
    logger.error(
      { country_code: countryCode, code: error.code },
      "contention_resources_lookup_failed",
    );
    throw new Error(
      `contention resources lookup failed: ${error.message}`,
    );
  }

  const rows = (data ?? []) as ContentionResource[];
  const now = new Date();
  for (const row of rows) {
    const verified = new Date(row.last_verified_at);
    if (isContentionStale(verified, now)) {
      logger.warn(
        {
          country_code: row.country_code,
          contention_id: row.id,
          last_verified_at: row.last_verified_at,
        },
        "contention_resource_stale",
      );
    }
  }
  return rows;
}
