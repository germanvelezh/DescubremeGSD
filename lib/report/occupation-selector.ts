/**
 * Occupation selector — D3.3 + Plan 01-09 Wave 6.
 *
 * Selects 5-7 LATAM-adapted occupations whose `riasec_code` matches the
 * user's top-3 RIASEC code. Cowork populates the `occupation` table
 * pre-deploy via [GAP-ONET-OCCUPATIONS-LATAM].
 *
 * Match strategy (Phase 1, simple): SELECT WHERE `riasec_code` contains at
 * least one of the top-3 letters. The substring filter is a 2-step query
 * fan-out instead of a single LIKE because Supabase's PostgREST builder
 * makes per-column ilike chains brittle; we issue one query per top
 * letter (3 queries total) and dedupe in TS. The fan-out is fine for
 * Phase 1 catalog sizes (50-100 rows).
 *
 * The selector falls back to the empty array (NOT a throw) when:
 *  - the `occupation` table is empty (Cowork has not delivered yet);
 *  - the query errors (logger.warn + return []).
 *
 * Plugin-as-data: no instrument codes in this file (FOUND-05 scan path).
 *
 * Anchors:
 *  - 01-CONTEXT.md D3.3.
 *  - 01-PATTERNS.md §2.3 row "lib/report/occupation-selector.ts".
 */
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

import { logger } from "@/lib/logger";

export interface Occupation {
  id: string;
  codeOnet: string;
  nameEsCo: string;
  riasecCode: string;
  educationLevel: string | null;
}

export interface SelectOccupationsInput {
  /** Top 3 RIASEC letters in priority order. */
  top3: [string, string, string];
  /** Max occupations to return (default 7, D3.3 spec). */
  limit?: number;
  /** Country code, reserved for Phase 2 country-specific filtering. */
  countryCode?: string;
}

interface OccupationRow {
  id: string;
  code_onet: string;
  name_es_co: string;
  riasec_code: string;
  education_level: string | null;
}

export async function selectOccupations(
  supabase: SupabaseClient,
  input: SelectOccupationsInput,
): Promise<Occupation[]> {
  const limit = input.limit ?? 7;
  const [a, b, c] = input.top3;

  // Single PostgREST query using `or(ilike.*A*, ilike.*B*, ilike.*C*)`.
  // `*` is the wildcard in PostgREST ilike, so we cover "RIA", "RAI", "IRC"
  // when the top letter is R/I/A regardless of order.
  const filter = `riasec_code.ilike.*${a}*,riasec_code.ilike.*${b}*,riasec_code.ilike.*${c}*`;

  const { data, error } = await supabase
    .from("occupation")
    .select("id, code_onet, name_es_co, riasec_code, education_level")
    .or(filter)
    .limit(limit);

  if (error) {
    logger.warn(
      {
        code: (error as { code?: string }).code,
        top3: input.top3.join(""),
      },
      "occupation_selector_query_failed",
    );
    return [];
  }

  const rows = (data ?? []) as OccupationRow[];
  if (rows.length === 0) {
    logger.warn(
      { top3: input.top3.join("") },
      "occupation_table_empty_or_no_match",
    );
    return [];
  }

  // Map snake_case -> camelCase + dedupe by id (PostgREST or() can return
  // duplicates if a row matches multiple branches).
  const seen = new Set<string>();
  const out: Occupation[] = [];
  for (const r of rows) {
    if (seen.has(r.id)) continue;
    seen.add(r.id);
    out.push({
      id: r.id,
      codeOnet: r.code_onet,
      nameEsCo: r.name_es_co,
      riasecCode: r.riasec_code,
      educationLevel: r.education_level,
    });
    if (out.length >= limit) break;
  }
  return out;
}
