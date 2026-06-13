/**
 * Tests — declarative teaser evaluator (Plan 02-12 Task 1, TDD).
 *
 * FOUND-05: this file lives under `lib/integrator` (a SCAN_DIR) and is NOT in
 * the lint exclude list, so it uses SYNTHETIC instrument/dimension codes
 * ("INST_A", "dimX", ...) — never real instrument literals. A data-driven
 * evaluator that works on arbitrary codes IS the proof of D-B.1/FOUND-05.
 *
 * Covers the four behaviors from the plan:
 *   1. <4 computed_score present -> locked result, no phrases.
 *   2. 4 bands + matching rules -> 4-6 phrases + 1-2 crosses, conditions matched
 *      declaratively via the Zod-validated schema (no if/else over codes).
 *   3. quality flag on a score -> rules whose requires_dimensions include it are
 *      omitted; others still emit (D-F2.1/F2.2).
 *   4. empty integrator_rule table -> gapResult placeholder (renders, no throw).
 *
 * Anchors:
 *   - 02-CONTEXT.md D-B.1, D-B.2, D-A.6, D-F2.1, D-F2.2.
 *   - 02-PATTERNS.md § "lib/integrator/teaser.ts".
 */
import { describe, expect, it } from "vitest";

import {
  TeaserConditionSchema,
  evaluateTeaser,
  evaluateTeaserRule,
  type TeaserRuleRow,
} from "./teaser";

// Synthetic instrument codes (FOUND-05 — never real instrument literals).
const INST_A = "INST_A";
const INST_B = "INST_B";
const INST_C = "INST_C";
const INST_D = "INST_D";

const ALL_FOUR: Record<string, { code: string; band: string }> = {
  [INST_A]: { code: INST_A, band: "ALTO" },
  [INST_B]: { code: INST_B, band: "ALTO" },
  [INST_C]: { code: INST_C, band: "MEDIO" },
  [INST_D]: { code: INST_D, band: "BAJO" },
};

/** A cross rule: requires INST_A=ALTO and INST_B=ALTO. */
function crossRule(text: string, requires: string[]): TeaserRuleRow {
  return {
    tier: "teaser",
    conditions: {
      type: "all",
      predicates: requires.map((code) => ({
        code,
        band: ALL_FOUR[code]?.band ?? "ALTO",
      })),
    },
    template_text: text,
    requires_dimensions: requires,
  };
}

/** A single-dimension phrase rule (synthesis line). */
function phraseRule(text: string, code: string): TeaserRuleRow {
  return {
    tier: "teaser",
    conditions: {
      type: "all",
      predicates: [{ code, band: ALL_FOUR[code]?.band ?? "ALTO" }],
    },
    template_text: text,
    requires_dimensions: [code],
  };
}

describe("TeaserConditionSchema", () => {
  it("accepts a well-formed 'all' condition", () => {
    const parsed = TeaserConditionSchema.safeParse({
      type: "all",
      predicates: [{ code: INST_A, band: "ALTO" }],
    });
    expect(parsed.success).toBe(true);
  });

  it("rejects an unknown condition type (no eval, no Function)", () => {
    const parsed = TeaserConditionSchema.safeParse({
      type: "javascript",
      predicates: [],
    });
    expect(parsed.success).toBe(false);
  });

  it("rejects a malformed predicate", () => {
    const parsed = TeaserConditionSchema.safeParse({
      type: "all",
      predicates: [{ code: INST_A }],
    });
    expect(parsed.success).toBe(false);
  });
});

describe("evaluateTeaserRule (declarative match)", () => {
  const bands: Record<string, string> = {
    [INST_A]: "ALTO",
    [INST_B]: "ALTO",
    [INST_C]: "MEDIO",
    [INST_D]: "BAJO",
  };

  it("matches when every predicate band equals the user's band", () => {
    const cond = TeaserConditionSchema.parse({
      type: "all",
      predicates: [
        { code: INST_A, band: "ALTO" },
        { code: INST_B, band: "ALTO" },
      ],
    });
    expect(evaluateTeaserRule(cond, bands)).toBe(true);
  });

  it("does not match when a predicate band differs", () => {
    const cond = TeaserConditionSchema.parse({
      type: "all",
      predicates: [{ code: INST_C, band: "ALTO" }],
    });
    expect(evaluateTeaserRule(cond, bands)).toBe(false);
  });

  it("does not match when a required code has no band", () => {
    const cond = TeaserConditionSchema.parse({
      type: "all",
      predicates: [{ code: "INST_MISSING", band: "ALTO" }],
    });
    expect(evaluateTeaserRule(cond, bands)).toBe(false);
  });

  it("matches an 'any' condition when at least one predicate holds", () => {
    const cond = TeaserConditionSchema.parse({
      type: "any",
      predicates: [
        { code: INST_C, band: "ALTO" }, // user is MEDIO -> false
        { code: INST_A, band: "ALTO" }, // user is ALTO -> true
      ],
    });
    expect(evaluateTeaserRule(cond, bands)).toBe(true);
  });
});

describe("evaluateTeaser (gating + degradation)", () => {
  it("returns a locked result when fewer than 4 scores are present (D-A.6)", () => {
    const result = evaluateTeaser({
      bandsByInstrument: {
        [INST_A]: "ALTO",
        [INST_B]: "ALTO",
        [INST_C]: "MEDIO",
      },
      qualityFlaggedCodes: [],
      rules: [crossRule("x", [INST_A, INST_B])],
    });
    expect(result.kind).toBe("locked");
    if (result.kind === "locked") {
      expect(result.missingCount).toBe(1);
    }
  });

  it("emits phrases + crosses when all 4 present and rules match (D-B.2)", () => {
    const rules: TeaserRuleRow[] = [
      phraseRule("frase A", INST_A),
      phraseRule("frase B", INST_B),
      phraseRule("frase C", INST_C),
      phraseRule("frase D", INST_D),
      crossRule("cruce AB", [INST_A, INST_B]),
    ];
    const result = evaluateTeaser({
      bandsByInstrument: {
        [INST_A]: "ALTO",
        [INST_B]: "ALTO",
        [INST_C]: "MEDIO",
        [INST_D]: "BAJO",
      },
      qualityFlaggedCodes: [],
      rules,
    });
    expect(result.kind).toBe("teaser");
    if (result.kind === "teaser") {
      expect(result.phrases.length).toBeGreaterThanOrEqual(4);
      expect(result.phrases.length).toBeLessThanOrEqual(6);
      expect(result.crosses.length).toBeGreaterThanOrEqual(1);
      expect(result.crosses.length).toBeLessThanOrEqual(2);
      expect(result.crosses[0]).toContain("cruce AB");
    }
  });

  it("omits any cross that depends on a quality-flagged score (D-F2.1/F2.2)", () => {
    const rules: TeaserRuleRow[] = [
      phraseRule("frase A", INST_A),
      phraseRule("frase B", INST_B),
      phraseRule("frase C", INST_C),
      phraseRule("frase D", INST_D),
      crossRule("cruce AB", [INST_A, INST_B]),
      crossRule("cruce CD", [INST_C, INST_D]),
    ];
    const result = evaluateTeaser({
      bandsByInstrument: {
        [INST_A]: "ALTO",
        [INST_B]: "ALTO",
        [INST_C]: "MEDIO",
        [INST_D]: "BAJO",
      },
      // INST_B flagged -> cross AB omitted; cross CD still emitted; the other 3
      // phrase reports are unaffected (a flagged test does not invalidate the rest).
      qualityFlaggedCodes: [INST_B],
      rules,
    });
    expect(result.kind).toBe("teaser");
    if (result.kind === "teaser") {
      const allText = [...result.phrases, ...result.crosses].join(" | ");
      expect(allText).not.toContain("cruce AB");
      expect(allText).toContain("cruce CD");
    }
  });

  it("returns a gapResult placeholder when the rule table is empty", () => {
    const result = evaluateTeaser({
      bandsByInstrument: {
        [INST_A]: "ALTO",
        [INST_B]: "ALTO",
        [INST_C]: "MEDIO",
        [INST_D]: "BAJO",
      },
      qualityFlaggedCodes: [],
      rules: [],
    });
    expect(result.kind).toBe("gap");
    if (result.kind === "gap") {
      expect(result.placeholder).toContain("GAP");
    }
  });

  it("never throws on malformed rule rows (skips them, stays auditable)", () => {
    const rules = [
      // malformed conditions jsonb — must be skipped, not thrown
      {
        tier: "teaser",
        conditions: { type: "bogus" },
        template_text: "no debe aparecer",
        requires_dimensions: [INST_A],
      } as unknown as TeaserRuleRow,
      phraseRule("frase A", INST_A),
      phraseRule("frase B", INST_B),
      phraseRule("frase C", INST_C),
      phraseRule("frase D", INST_D),
    ];
    const result = evaluateTeaser({
      bandsByInstrument: {
        [INST_A]: "ALTO",
        [INST_B]: "ALTO",
        [INST_C]: "MEDIO",
        [INST_D]: "BAJO",
      },
      qualityFlaggedCodes: [],
      rules,
    });
    expect(result.kind).toBe("teaser");
    if (result.kind === "teaser") {
      const allText = [...result.phrases, ...result.crosses].join(" | ");
      expect(allText).not.toContain("no debe aparecer");
    }
  });
});
