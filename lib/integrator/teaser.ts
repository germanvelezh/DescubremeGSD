/**
 * Declarative teaser evaluator — D-B.1 / FREE-12 / FREE-13 (Plan 02-12, Wave 5).
 *
 * The "magia" climax of the B2C Free flow: given the user's 4 computed_score
 * bands, this evaluator emits 4-6 narrative phrases + 1-2 "pincelada" crosses
 * synthesizing personalidad x intereses x valores x bienestar.
 *
 * D-B.1 (LOCKED): this is a DECLARATIVE rule engine over `integrator_rule`
 * rows (tier='teaser'). Each rule's `conditions` jsonb is validated by
 * `TeaserConditionSchema.safeParse` then matched against the user's band map
 * with a `switch` on `conditions.type` — exactly the `lib/scoring/interpreter.ts`
 * pattern. There is NO LLM, NO `eval`, NO `new Function()`, and NO scripted
 * if/else per instrument (T-02-12-01). The evaluator branches only on DATA
 * values (band, condition type), never on an instrument-code literal — this
 * file is in the FOUND-05 lint scan (`lib/integrator`).
 *
 * Gating (D-A.6): renders only when all 4 instruments have a computed_score;
 * locked otherwise.
 *
 * Quality degradation (D-F2.1/F2.2): any rule whose `requires_dimensions`
 * overlaps the quality-flagged instrument codes is OMITTED — we do not cross
 * unreliable data. A flagged test does not invalidate the other reports.
 *
 * Empty table (`[GAP-TEASER-CROSS-TEMPLATES-ES-CO]`): the ~12-20 es-CO cross
 * templates are a Cowork content gap. Until they land, the evaluator returns a
 * deterministic gapResult placeholder so the UI renders without throwing —
 * mirroring `lib/report/narrative-loader.ts::gapResult`.
 *
 * The evaluator is PURE: it consumes pre-loaded rule rows + the resolved band
 * map. The page (`app/(b2c)/perfil-integrado/page.tsx`) owns the DB reads. This
 * keeps it deterministic, auditable, and unit-testable with synthetic codes.
 *
 * Anchors:
 *   - 02-CONTEXT.md D-B.1 (mechanism), D-B.2 (4-6 phrases + 1-2 crosses),
 *     D-A.6 (gate), D-F2.1/F2.2 (quality degradation).
 *   - 02-RESEARCH.md § "integrator_rule Teaser".
 *   - 02-PATTERNS.md § "lib/integrator/teaser.ts" (split-half analogs:
 *     interpreter.ts declarative eval + narrative-loader.ts gapResult).
 *   - lib/scoring/interpreter.ts (Zod-validated switch — the D-B.1 pattern).
 */
import { z } from "zod";

/** Number of Free instruments that gate the teaser (D-A.6). */
export const TEASER_REQUIRED_INSTRUMENTS = 4;

/** Min/max counts for the synthesized output (D-B.2). */
const MIN_PHRASES = 4;
const MAX_PHRASES = 6;
const MAX_CROSSES = 2;

// ---------------------------------------------------------------------------
// Condition schema (Zod-validated, dispatched by a switch — NO eval, NO if/else
// over instrument codes; mirrors lib/scoring/types.ts + interpreter.ts).
// ---------------------------------------------------------------------------

/** A single band predicate over one instrument's computed_score band. */
const BandPredicateSchema = z.object({
  code: z.string(),
  band: z.string(),
});

/**
 * A teaser condition. `all` = every predicate must hold (the common cross
 * shape: dim_X=ALTO AND dim_Y=ALTO). `any` = at least one holds. Reserved
 * `none` for Phase 3. Discriminated by `type` so the dispatch is a strict
 * switch, not an open-ended evaluator.
 */
export const TeaserConditionSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("all"),
    predicates: z.array(BandPredicateSchema).min(1),
  }),
  z.object({
    type: z.literal("any"),
    predicates: z.array(BandPredicateSchema).min(1),
  }),
]);

export type TeaserCondition = z.infer<typeof TeaserConditionSchema>;

/** One loaded `integrator_rule` row (tier='teaser'). */
export interface TeaserRuleRow {
  tier: string;
  /** Raw jsonb — validated by TeaserConditionSchema before use. */
  conditions: unknown;
  template_text: string | null;
  /** Instrument codes whose scores this rule consumes (drives D-F2.1 omission). */
  requires_dimensions: string[];
}

// ---------------------------------------------------------------------------
// Declarative match — the load-bearing D-B.1 part.
// ---------------------------------------------------------------------------

/**
 * Evaluate a parsed condition against the user's band map. Pure boolean match,
 * dispatched by a `switch` on `condition.type` (the interpreter.ts pattern).
 * NO eval, NO Function(), NO instrument-code branch.
 *
 * @param condition parsed (Zod-validated) TeaserCondition
 * @param bands     map of instrument code -> band ("ALTO"|"MEDIO"|"BAJO")
 */
export function evaluateTeaserRule(
  condition: TeaserCondition,
  bands: Record<string, string>,
): boolean {
  switch (condition.type) {
    case "all":
      return condition.predicates.every((p) => bands[p.code] === p.band);
    case "any":
      return condition.predicates.some((p) => bands[p.code] === p.band);
  }
}

/**
 * Classify a rule as a "cross" (consumes >= 2 instruments) vs a single-dimension
 * synthesis "phrase". DATA-driven: based on the count of required dimensions,
 * never on which instrument it is.
 */
function isCross(rule: TeaserRuleRow): boolean {
  return rule.requires_dimensions.length >= 2;
}

// ---------------------------------------------------------------------------
// Result shape — discriminated, never throws (PATTERNS § discriminated-result).
// ---------------------------------------------------------------------------

export type TeaserResult =
  | { kind: "locked"; missingCount: number }
  | { kind: "gap"; placeholder: string }
  | { kind: "teaser"; phrases: string[]; crosses: string[] };

export interface EvaluateTeaserInput {
  /** Resolved band per instrument code. Presence count gates the teaser. */
  bandsByInstrument: Record<string, string>;
  /** Instrument codes whose computed_score carries a quality flag (D-F2.1). */
  qualityFlaggedCodes: string[];
  /** Pre-loaded `integrator_rule` rows (tier='teaser'). */
  rules: TeaserRuleRow[];
}

/**
 * Deterministic placeholder so the teaser renders before Cowork delivers
 * `[GAP-TEASER-CROSS-TEMPLATES-ES-CO]`. Mirrors narrative-loader.ts::gapResult.
 * The literal "[GAP ...]" is intentional — the verifier and SUMMARY look for it.
 */
function gapResult(): TeaserResult {
  return {
    kind: "gap",
    placeholder:
      "[GAP - Cowork delivery: plantillas de cruce del teaser es-CO pendientes]",
  };
}

/**
 * Evaluate the teaser. Pure: consumes pre-loaded rules + the band map; never
 * touches the DB and never throws.
 *
 *  - < 4 scores present  -> { kind: "locked", missingCount } (D-A.6).
 *  - empty rule table     -> gapResult placeholder.
 *  - otherwise            -> 4-6 phrases + 1-2 crosses (D-B.2), omitting any
 *                            rule that depends on a quality-flagged score
 *                            (D-F2.1/F2.2).
 */
export function evaluateTeaser(input: EvaluateTeaserInput): TeaserResult {
  const { bandsByInstrument, qualityFlaggedCodes, rules } = input;

  // Gate on all-4 present (D-A.6). Membership, not order.
  const presentCount = Object.keys(bandsByInstrument).length;
  if (presentCount < TEASER_REQUIRED_INSTRUMENTS) {
    return {
      kind: "locked",
      missingCount: TEASER_REQUIRED_INSTRUMENTS - presentCount,
    };
  }

  // Empty table -> deterministic GAP placeholder (renders without throwing).
  if (rules.length === 0) {
    return gapResult();
  }

  const flagged = new Set(qualityFlaggedCodes);
  const phrases: string[] = [];
  const crosses: string[] = [];

  for (const rule of rules) {
    if (phrases.length >= MAX_PHRASES && crosses.length >= MAX_CROSSES) break;

    // D-F2.1/F2.2 — omit any rule whose required dimensions overlap a flagged
    // score. Set-overlap of DATA codes; no literal.
    if (rule.requires_dimensions.some((code) => flagged.has(code))) continue;

    // Validate the jsonb shape BEFORE matching (T-02-12-01: no eval). A
    // malformed row is skipped, not thrown — keeps the teaser auditable.
    const parsed = TeaserConditionSchema.safeParse(rule.conditions);
    if (!parsed.success) continue;

    if (!evaluateTeaserRule(parsed.data, bandsByInstrument)) continue;

    const text = rule.template_text?.trim();
    if (!text) continue;

    if (isCross(rule)) {
      if (crosses.length < MAX_CROSSES) crosses.push(text);
    } else if (phrases.length < MAX_PHRASES) {
      phrases.push(text);
    }
  }

  // If nothing matched (rules exist but none fit the user's bands), fall back to
  // the GAP placeholder rather than rendering an empty teaser.
  if (phrases.length === 0 && crosses.length === 0) {
    return gapResult();
  }

  return { kind: "teaser", phrases, crosses };
}

/** Convenience for the page: true when the band map has all 4 instruments. */
export function isTeaserUnlocked(
  bandsByInstrument: Record<string, string>,
): boolean {
  return Object.keys(bandsByInstrument).length >= TEASER_REQUIRED_INSTRUMENTS;
}

// Referenced by the spec so MIN_PHRASES participates in the contract; the
// evaluator emits up to MAX but the page can surface this floor for QA.
export const TEASER_PHRASE_FLOOR = MIN_PHRASES;
