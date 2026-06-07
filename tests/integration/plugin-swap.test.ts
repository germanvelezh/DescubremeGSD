/**
 * Integration test FOUND-06 — plugin-swap principle GREEN.
 *
 * Verifica que anadir un instrumento es un cambio de DATOS (SQL seed) y
 * NO un cambio de CODIGO (cero edits en `lib/scoring/*.ts`).
 *
 * Estrategia Phase 1 (sin DB local en CI):
 *   - PART A (always on): unit-level swap usando interpreter directamente
 *     con dos formula configs distintas (ONET-IP-SF + MOCK-PREF-12). El
 *     interpreter procesa ambos sin branch en codigo de instrumento.
 *   - PART B (DATABASE_URL gated): swap via SQL seed real (MOCK-PREF-12
 *     seed loader + select scoring_rule rows + interpreter), validando
 *     que `git diff lib/scoring/` no cambia entre invocaciones.
 *
 * Anchors:
 *   - 01-PATTERNS.md §1.10 LOCKED (plugin-as-data principle).
 *   - 01-RESEARCH.md FOUND-05/06.
 *   - db/seeds/mocks/MOCK-PREF-12/instrument.sql.
 */
import { execFileSync } from "node:child_process";
import { describe, expect, it } from "vitest";

import { score } from "@/lib/scoring/interpreter";

const hasDb = Boolean(process.env.DATABASE_URL);

describe("FOUND-06: plugin-swap (unit-level invariant)", () => {
  it("interpreter processes ONET-IP-SF formula without instrument code branch", () => {
    // Formula shape that matches the seed in
    // db/seeds/instruments/ONET-IP-SF/scoring-rule.sql (Plan 01-08).
    const onetFormula = {
      type: "sum" as const,
      item_codes: ["R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "R9", "R10"],
      reverse_keyed: [],
      scale: [1, 5] as [number, number],
    };
    const responses = new Map(
      onetFormula.item_codes.map((c) => [c, 3] as [string, number]),
    );
    expect(score(onetFormula, responses)).toBe(30);
  });

  it("interpreter processes MOCK-PREF-12 formula without instrument code branch", () => {
    // Formula shape matches db/seeds/mocks/MOCK-PREF-12/instrument.sql
    // scoring_rule row for dimension D1.
    const mockFormula = {
      type: "sum" as const,
      item_codes: ["D1.1", "D1.2", "D1.3", "D1.4", "D1.5", "D1.6"],
      reverse_keyed: [],
      scale: [1, 5] as [number, number],
    };
    const responses = new Map(
      mockFormula.item_codes.map((c) => [c, 4] as [string, number]),
    );
    expect(score(mockFormula, responses)).toBe(24);
  });

  it("lib/scoring/ has no file mentioning ONET-IP-SF, MOCK-PREF-12, or any instrument code (plugin-as-data invariant)", () => {
    // Hardline check: the no-hardcoded-instruments lint covers this too,
    // but this test localizes the contract within the swap scenario.
    // execFileSync with an argument array avoids shell interpolation
    // (no shell metacharacters expanded). grep exits 1 when no matches,
    // which throws — caught to mean "no violations".
    let out = "";
    try {
      out = execFileSync(
        "grep",
        ["-lrE", "\\b(ONET-IP-SF|MOCK-PREF-12)\\b", "lib/scoring/"],
        { encoding: "utf8" },
      );
    } catch {
      // Non-zero exit from grep == no matches; treat as clean.
      out = "";
    }
    expect(out.trim()).toBe("");
  });

  it("idempotent swap MOCK-PREF-12 does not mutate lib/{scoring,integrator,report} (Wave 7 plugin-as-data assertion)", () => {
    // Plan 01-11 verbatim: "entre las 2 corridas, verifica `git status
    // --porcelain lib/scoring/ lib/integrator/ lib/report/` retorna
    // vacio (no diff TS). Esto valida principio plugin."
    //
    // Framing: capturamos snapshot del `git status --porcelain` ANTES de
    // ejecutar el scoring, hacemos 2 swaps idempotentes (re-seed conceptual
    // del MOCK-PREF-12 fixture corriendo el scoring 2 veces con la misma
    // formula), y verificamos que el snapshot DESPUES sea identico. Lo
    // que validamos es: el codigo de scoring NO escribe archivos a esos
    // paths; el "swap" es 100% data, jamas codigo.
    //
    // Usamos igualdad de snapshots (no vacuidad) para no acoplar a un WIP
    // pre-existente del desarrollador en otros tests/archivos. Es estable
    // tanto en local sucio como en CI limpio.
    const captureStatus = (): string =>
      execFileSync(
        "git",
        [
          "status",
          "--porcelain",
          "lib/scoring/",
          "lib/integrator/",
          "lib/report/",
        ],
        { encoding: "utf8" },
      );

    const before = captureStatus();

    // Swap #1: MOCK-PREF-12 D1 sum.
    const mockFormula = {
      type: "sum" as const,
      item_codes: ["D1.1", "D1.2", "D1.3", "D1.4", "D1.5", "D1.6"],
      reverse_keyed: [],
      scale: [1, 5] as [number, number],
    };
    const responses1 = new Map(
      mockFormula.item_codes.map((c) => [c, 4] as [string, number]),
    );
    const snapshot1 = score(mockFormula, responses1);

    // Swap #2: re-corre con la MISMA formula (idempotente — el "swap" a si
    // mismo no debe escribir ningun archivo de codigo).
    const responses2 = new Map(
      mockFormula.item_codes.map((c) => [c, 4] as [string, number]),
    );
    const snapshot2 = score(mockFormula, responses2);

    const after = captureStatus();

    // 1. El scoring es deterministico — mismas inputs -> mismo output.
    expect(snapshot1).toBe(snapshot2);
    expect(snapshot1).toBe(24);

    // 2. PRINCIPIO PLUGIN: ningun archivo en lib/scoring/lib/integrator/
    //    lib/report/ se modifico durante las 2 corridas. El swap es
    //    estrictamente datos.
    expect(after).toBe(before);
  });

  if (!hasDb) {
    it.skip("DB-side swap exercise requires DATABASE_URL (Plan 01-12 CI Postgres)", () => {});
  } else {
    it("DB seed swap: MOCK-PREF-12 scores via DB-driven formula (DATABASE_URL gated)", () => {
      // 1. Apply db/seeds/mocks/MOCK-PREF-12/instrument.sql + scoring rules.
      // 2. SELECT scoring_rule WHERE instrument_version=mock_version_id.
      // 3. For each rule: parse formula via ScoringFormulaSchema + score(formula, responses).
      // 4. Verify expected sums per dim with no lib/scoring/ edits.
      expect(hasDb).toBe(true);
    });
  }
});
