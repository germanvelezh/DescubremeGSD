/**
 * Scoring DSL types — FOUND-04 plugin-as-data (Plan 01-08, Wave 5).
 *
 * `ScoringFormula` es una discriminated union estricta por `type`. Phase 1
 * implementa `sum` y `mean`. `centered_mean` (Phase 2 PVQ-RR) y
 * `weighted_sum` (Phase 3 VIA-IS-P) quedan reservados como comentarios
 * — anadirlos requiere bumpear `scoring_version` y dar fixture canonical.
 *
 * El interpreter dispatchea via switch sobre `formula.type`. NO eval, NO
 * Function() (T-01-08-01 Tampering): el shape se valida con
 * `ScoringFormulaSchema.safeParse` ANTES del dispatch.
 *
 * Anchors:
 *   - 01-RESEARCH.md lineas 933-973 (verbatim).
 *   - 01-PATTERNS.md §1.10 LOCKED.
 */
import { z } from "zod";

const baseFields = {
  item_codes: z.array(z.string()),
  reverse_keyed: z.array(z.string()).default([]),
  scale: z.tuple([z.number(), z.number()]),
};

export const SumFormulaSchema = z.object({
  type: z.literal("sum"),
  ...baseFields,
});

export const MeanFormulaSchema = z.object({
  type: z.literal("mean"),
  ...baseFields,
});

// reserved: centered_mean for Phase 2 (PVQ-RR Schwartz portrait values)
// reserved: weighted_sum for Phase 3 (VIA-IS-P character strengths)

export const ScoringFormulaSchema = z.discriminatedUnion("type", [
  SumFormulaSchema,
  MeanFormulaSchema,
]);

export type ScoringFormula = z.infer<typeof ScoringFormulaSchema>;
export type SumFormula = z.infer<typeof SumFormulaSchema>;
export type MeanFormula = z.infer<typeof MeanFormulaSchema>;
