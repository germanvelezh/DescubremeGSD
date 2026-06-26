/**
 * Occupation selector — D3.3 + Phase 02.1 Wave 3 (Job Zone filter).
 *
 * Selects up to 7 LATAM-adapted occupations whose `riasec_code` matches the
 * user's top-3 RIASEC code AND whose Job Zone fits the user's level of
 * preparation. Cowork populates the `occupation` table pre-deploy.
 *
 * Two-step O*NET model (pack JobZones §5):
 *  1. Interest (RIASEC): occupation matches if its `riasec_code` shares >=1 of
 *     the user's top-3 letters (Phase-1 heuristic, kept for v1).
 *  2. Zone: `normalizeZone(occupation.education_level)` is in the user's
 *     `targetZones` (inferred from education/experience, see lib/onet/job-zone).
 *
 * Ranking (pack §5.3): interest congruence (# top-3 letters present) desc, then
 * earliest first-match position (an occupation whose first letter is the user's
 * 1st letter ranks before), then base zone before zone+1, then stable by code.
 *
 * Fallbacks (pack §5.1): if fewer than 3 in-zone matches, widen to +-1 zone;
 * null-zone occupations only ever appear in the very last fallback; an empty
 * result is surfaced as the microcopy empty state (never a throw).
 *
 * When `targetZones` is omitted/empty the selector degrades to Phase-1 behavior
 * (RIASEC-only) so callers without level data keep working.
 *
 * `occupation.education_level` STORES THE JOB ZONE (not the user's schooling) —
 * `normalizeZone` runs on it; the user's `education_level` is a different field.
 *
 * Plugin-as-data: no instrument codes in this file (FOUND-05 scan path). The
 * letters R/I/A/S/E/C are RIASEC domain notation, not instrument codes.
 *
 * Anchors:
 *  - implementation_packs/JobZones_es-CO_Pack_v1.0.md §5.
 *  - 01-CONTEXT.md D3.3; estado/DECISIONS_LOG.md ADR-027.
 */
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

import { logger } from "@/lib/logger";
import { normalizeZone } from "@/lib/onet/job-zone";

export interface Occupation {
  id: string;
  codeOnet: string;
  nameEsCo: string;
  riasecCode: string;
  /** Seed text holding the Job Zone ('1'..'5'), NOT the user's schooling. */
  educationLevel: string | null;
}

export interface SelectOccupationsInput {
  /** Top 3 RIASEC letters in priority order. */
  top3: [string, string, string];
  /**
   * Target Job Zones (base zone first), from `job-zone.targetZones()`. When
   * omitted or empty the zone filter is skipped (Phase-1 RIASEC-only behavior).
   */
  targetZones?: string[];
  /** Max occupations to return (default 7, D3.3 spec). */
  limit?: number;
  /**
   * Country code. Reserved: the catalog has no country column yet, so this is a
   * no-op for now (kept so the param is no longer silently ignored — pack §5.4).
   */
  countryCode?: string;
}

interface OccupationRow {
  id: string;
  code_onet: string;
  name_es_co: string;
  riasec_code: string;
  education_level: string | null;
}

// ---------------------------------------------------------------------------
// Pure ranking + filtering core (pack §5) — exported for unit tests.
// ---------------------------------------------------------------------------

const ZONE_ORDER = ["1-2", "3", "4", "5"] as const;

/** A zone plus its immediate neighbors on the ladder (for the +-1 fallback). */
function zoneNeighbors(zone: string): string[] {
  const i = ZONE_ORDER.indexOf(zone as (typeof ZONE_ORDER)[number]);
  if (i === -1) return [zone];
  const out: string[] = [zone];
  if (i > 0) out.push(ZONE_ORDER[i - 1]!);
  if (i < ZONE_ORDER.length - 1) out.push(ZONE_ORDER[i + 1]!);
  return out;
}

function expandByOne(zones: string[]): Set<string> {
  const s = new Set<string>();
  for (const z of zones) for (const n of zoneNeighbors(z)) s.add(n);
  return s;
}

interface Scored {
  occ: Occupation;
  congruence: number;
  firstPos: number;
  userRank: number;
  zoneRank: number;
}

function scoreOccupation(
  occ: Occupation,
  top3: string[],
  targetZones: string[],
): Scored | null {
  const code = occ.riasecCode.toUpperCase();
  const letters = top3.map((l) => l.toUpperCase());
  const present = new Set(letters.filter((l) => code.includes(l)));
  const congruence = present.size;
  if (congruence === 0) return null; // not a RIASEC match — dropped

  // Earliest position in the occupation code whose char is a top-3 letter, plus
  // which user-rank it matched (so "first char = user's 1st letter" wins).
  let firstPos = Number.POSITIVE_INFINITY;
  let userRank = Number.POSITIVE_INFINITY;
  for (let pos = 0; pos < code.length; pos++) {
    const r = letters.indexOf(code[pos]!);
    if (r !== -1) {
      firstPos = pos;
      userRank = r;
      break;
    }
  }

  const z = normalizeZone(occ.educationLevel);
  const idx = z ? targetZones.indexOf(z) : -1;
  const zoneRank = idx === -1 ? 99 : idx; // base zone (index 0) before +1 (index 1)

  return { occ, congruence, firstPos, userRank, zoneRank };
}

function byRank(a: Scored, b: Scored): number {
  if (a.congruence !== b.congruence) return b.congruence - a.congruence;
  if (a.firstPos !== b.firstPos) return a.firstPos - b.firstPos;
  if (a.userRank !== b.userRank) return a.userRank - b.userRank;
  if (a.zoneRank !== b.zoneRank) return a.zoneRank - b.zoneRank;
  return a.occ.codeOnet.localeCompare(b.occ.codeOnet);
}

function inZones(occ: Occupation, zones: Set<string> | string[]): boolean {
  const z = normalizeZone(occ.educationLevel);
  if (!z) return false;
  return Array.isArray(zones) ? zones.includes(z) : zones.has(z);
}

/**
 * Pure selector logic (pack §5): RIASEC filter + congruence ranking + Job Zone
 * tiers with +-1 / null fallbacks. `candidates` are the RIASEC-matched rows.
 */
export function rankOccupations(
  candidates: Occupation[],
  input: SelectOccupationsInput,
): Occupation[] {
  const limit = input.limit ?? 7;
  const targetZones = input.targetZones ?? [];

  const scored = candidates
    .map((o) => scoreOccupation(o, input.top3, targetZones))
    .filter((s): s is Scored => s !== null);

  // No level data → RIASEC-only ranking (Phase-1 back-compat).
  if (targetZones.length === 0) {
    return scored.sort(byRank).slice(0, limit).map((s) => s.occ);
  }

  // Tier 1: occupations whose zone is in the user's target zones.
  const result: Scored[] = scored
    .filter((s) => inZones(s.occ, targetZones))
    .sort(byRank);

  // Tier 2 (pack §5.1): widen to +-1 zone only if fewer than 3 in-zone results.
  if (result.length < 3) {
    const expanded = expandByOne(targetZones);
    result.push(
      ...scored
        .filter((s) => inZones(s.occ, expanded) && !inZones(s.occ, targetZones))
        .sort(byRank),
    );
  }

  // Tier 3 (pack §5.1): null-zone occupations, last fallback only.
  if (result.length < 3) {
    result.push(
      ...scored
        .filter((s) => normalizeZone(s.occ.educationLevel) === null)
        .sort(byRank),
    );
  }

  return result.slice(0, limit).map((s) => s.occ);
}

// ---------------------------------------------------------------------------
// Thin Supabase adapter: fetch the RIASEC pool, then rank in memory.
// ---------------------------------------------------------------------------

export async function selectOccupations(
  supabase: SupabaseClient,
  input: SelectOccupationsInput,
): Promise<Occupation[]> {
  const [a, b, c] = input.top3;

  // Single PostgREST `or(ilike)` over the top-3 letters. `*` is the PostgREST
  // wildcard, so "RIA"/"IRC" match when the top letter appears in any position.
  // Fetch the WHOLE matching pool (not pre-limited) so the in-memory zone
  // tiering + fallback can see every candidate; the catalog is ~125 rows.
  const filter = `riasec_code.ilike.*${a}*,riasec_code.ilike.*${b}*,riasec_code.ilike.*${c}*`;

  const { data, error } = await supabase
    .from("occupation")
    .select("id, code_onet, name_es_co, riasec_code, education_level")
    .or(filter)
    .limit(200);

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

  // Dedupe by id (PostgREST or() can repeat a row that matches multiple
  // branches) + map snake_case → camelCase.
  const seen = new Set<string>();
  const candidates: Occupation[] = [];
  for (const r of rows) {
    if (seen.has(r.id)) continue;
    seen.add(r.id);
    candidates.push({
      id: r.id,
      codeOnet: r.code_onet,
      nameEsCo: r.name_es_co,
      riasecCode: r.riasec_code,
      educationLevel: r.education_level,
    });
  }

  return rankOccupations(candidates, input);
}
