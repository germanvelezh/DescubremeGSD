/**
 * Unit tests QUAL-02 — percentile display gate.
 *
 * `shouldShowPercentile({ alpha, baremoPopulation, latamStatus })` decide
 * si el reporte UI muestra percentil numerico (`Alto: percentil 75`) o
 * solo banda categorica (`Alto / Medio / Bajo` con nota "baremo en
 * validacion"). Phase 1 O*NET es ipsative-first (Opcion C), pero el
 * gate aplica si en algun momento se quiere mostrar percentil contra
 * baremo INTL.
 *
 * Reglas:
 *   - alpha < 0.70 → false (no mostrar percentil).
 *   - latamStatus = 'pending' → false (baremo en validacion).
 *   - baremoPopulation = 'INTL' (US 1999) → false en v1.5 Free (display fallback).
 *   - alpha >= 0.70 && latamStatus = 'validated' && baremo = 'CO'|'MX' → true.
 *
 * Anchors:
 *   - 01-CONTEXT.md D3.8 (display rules).
 *   - 01-RESEARCH.md QUAL-02.
 *   - PLAN.md §<acceptance_criteria>.
 */
import { describe, expect, test } from "vitest";

import { shouldShowPercentile } from "@/lib/baremo/selector";

describe("QUAL-02: percentile display gate", () => {
  test("alpha < 0.70 → false even if baremo CO available", () => {
    expect(
      shouldShowPercentile({
        alpha: 0.65,
        baremoPopulation: "CO",
        latamStatus: "validated",
      }),
    ).toBe(false);
  });

  test("latamStatus pending → false (baremo en validacion)", () => {
    expect(
      shouldShowPercentile({
        alpha: 0.85,
        baremoPopulation: "INTL",
        latamStatus: "pending",
      }),
    ).toBe(false);
  });

  test("INTL fallback (CO + MX missing) → false in Free Phase 1 display", () => {
    expect(
      shouldShowPercentile({
        alpha: 0.85,
        baremoPopulation: "INTL",
        latamStatus: "validated",
      }),
    ).toBe(false);
  });

  test("alpha=0.85 + CO baremo + validated → true", () => {
    expect(
      shouldShowPercentile({
        alpha: 0.85,
        baremoPopulation: "CO",
        latamStatus: "validated",
      }),
    ).toBe(true);
  });

  test("alpha=0.85 + MX baremo + validated → true", () => {
    expect(
      shouldShowPercentile({
        alpha: 0.85,
        baremoPopulation: "MX",
        latamStatus: "validated",
      }),
    ).toBe(true);
  });

  test("exact alpha threshold 0.70 → true", () => {
    expect(
      shouldShowPercentile({
        alpha: 0.7,
        baremoPopulation: "CO",
        latamStatus: "validated",
      }),
    ).toBe(true);
  });
});
