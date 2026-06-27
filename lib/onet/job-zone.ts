/**
 * Job Zone inference + normalization (Phase 02.1 Wave 2).
 *
 * O*NET resolves occupational "level of preparation" (Job Zone) as a SECOND
 * step after RIASEC interests: the user's education + experience set a target
 * zone, and only occupations in that zone are shown (Rounds et al., s.f.).
 * DescubreMe Phase 1/2 implemented step 1 and skipped step 2 — this module is
 * step 2. Spec verbatim: implementation_packs/JobZones_es-CO_Pack_v1.0.md §3-§4.
 *
 * Scheme (O*NET feb-2026): Zones 1 and 2 are consolidated into "1-2"; 3/4/5
 * unchanged. Zones are TEXT, not numbers.
 *
 * Guardrail (pack §6 / CLAUDE.md §8 principio 6): the inputs are ONLY education,
 * experience and study intent. There is deliberately no sex/age parameter — the
 * type signature makes demographic bias impossible, not merely discouraged.
 *
 * Isomorphic on purpose (no "server-only"): the onboarding capture screen
 * computes the inferred level client-side to show it in plain language (§3).
 */

/** Highest education level the user has completed or is pursuing (pack §3.1). */
export const EDUCATION_LEVELS = [
  "secundaria",
  "tecnico_tecnologo",
  "pregrado",
  "posgrado",
] as const;
export type EducationLevel = (typeof EDUCATION_LEVELS)[number];

/** Related work experience band (pack §3.1). */
export const CAREER_STAGES = [
  "sin_experiencia",
  "junior",
  "semi_senior",
  "senior",
] as const;
export type CareerStage = (typeof CAREER_STAGES)[number];

/**
 * Narrows raw DB text (`user.education_level` is plaintext `string | null`) to a
 * valid `EducationLevel`. The selector + assembler call this defensively before
 * `inferBaseZone`: a NULL or unexpected value (legacy row, future enum drift)
 * routes the report to RIASEC-only ranking instead of throwing.
 */
export function isEducationLevel(v: unknown): v is EducationLevel {
  return (
    typeof v === "string" && (EDUCATION_LEVELS as readonly string[]).includes(v)
  );
}

/** Narrows raw DB text to a valid `CareerStage` (see `isEducationLevel`). */
export function isCareerStage(v: unknown): v is CareerStage {
  return (
    typeof v === "string" && (CAREER_STAGES as readonly string[]).includes(v)
  );
}

/** Job Zone under the feb-2026 consolidated scheme. */
export type JobZone = "1-2" | "3" | "4" | "5";

/** Base zone is driven by education (pack §3.2) — experience/intent only refine. */
const BASE_ZONE_BY_EDUCATION: Record<EducationLevel, JobZone> = {
  secundaria: "1-2",
  tecnico_tecnologo: "3",
  pregrado: "4",
  posgrado: "5",
};

/** Ordered ladder of zones; index drives the "+1" ceiling and the cap. */
const ZONE_LADDER: readonly JobZone[] = ["1-2", "3", "4", "5"];

/**
 * Maps the user's education level to a base Job Zone (pack §3.2). Education
 * dominates because the zone is defined primarily by required formation.
 */
export function inferBaseZone(educationLevel: EducationLevel): JobZone {
  return BASE_ZONE_BY_EDUCATION[educationLevel];
}

/**
 * Next zone up the ladder, capped at "5" (pack §3.3: "5" no sube más).
 */
export function oneAbove(zone: JobZone): JobZone {
  const i = ZONE_LADDER.indexOf(zone);
  return ZONE_LADDER[Math.min(i + 1, ZONE_LADDER.length - 1)] ?? zone;
}

/**
 * Target zones for the occupation filter (pack §3.3). Always includes the base
 * zone. Senior experience OR a declared openness to study more widen the
 * CEILING by one zone (never the floor below the base, never above "5"). Sex
 * and age never enter — see module guardrail.
 *
 * Order is load-bearing: base zone first, then the +1 zone. The selector uses
 * this order to rank base-zone occupations before zone+1 ones (pack §5.3).
 */
export function targetZones(
  baseZone: JobZone,
  careerStage: CareerStage,
  openToStudyMore: boolean,
): JobZone[] {
  const zones: JobZone[] = [baseZone];
  if (careerStage === "senior" || openToStudyMore) {
    zones.push(oneAbove(baseZone));
  }
  return [...new Set(zones)];
}

/**
 * Normalizes the raw `occupation.education_level` seed text (which stores the
 * Job Zone, NOT the user's schooling) to the consolidated scheme (pack §4):
 * '1'/'2' -> '1-2'; '3'/'4'/'5' unchanged; already-consolidated '1-2' is
 * idempotent (tolerates the documented P2 seed migration); anything else -> null
 * (no zone — the selector routes it to the last fallback only, pack §5.1).
 */
export function normalizeZone(raw: string | null): JobZone | null {
  switch (raw) {
    case "1":
    case "2":
    case "1-2":
      return "1-2";
    case "3":
      return "3";
    case "4":
      return "4";
    case "5":
      return "5";
    default:
      return null;
  }
}
