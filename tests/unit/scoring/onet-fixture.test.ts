/**
 * Unit scaffold QUAL-03 — canonical O*NET IP-SF scoring fixture.
 *
 * Pack §3 ("alpha tables") defines a canonical input/output pair per RIASEC
 * dimension: a known set of 60 item responses with a known expected score
 * per dimension (R, I, A, S, E, C). This test pins the contract so that
 * the scoring interpreter (Plan 01-07) cannot regress without flipping
 * one of these `todo`s into a real assertion.
 *
 * Phase 1 status: scaffold-only — Plan 01-07 lands `lib/scoring/interpreter.ts`
 * and at that point each `test.todo` becomes a real `test()` that calls the
 * interpreter with the Pack §3 fixture and asserts the expected scalar.
 *
 * RIASEC dimensions (Pack §3):
 *   R — Realistic
 *   I — Investigative
 *   A — Artistic
 *   S — Social
 *   E — Enterprising
 *   C — Conventional
 *
 * Each dimension has 10 items (60 total) and a score = sum of Likert
 * responses (1-5) mapped to the dimension. Hexagon distance metrics
 * (Holland's RIASEC circumplex) are validated in a separate test once
 * `lib/scoring/riasec-circumplex.ts` exists.
 */
import { describe, test } from "vitest";

describe("QUAL-03: O*NET IP-SF canonical fixture (Pack §3)", () => {
  test.todo("R (Realistic): 10 items, expected sum = pack §3 alpha-row-R");
  test.todo("I (Investigative): 10 items, expected sum = pack §3 alpha-row-I");
  test.todo("A (Artistic): 10 items, expected sum = pack §3 alpha-row-A");
  test.todo("S (Social): 10 items, expected sum = pack §3 alpha-row-S");
  test.todo("E (Enterprising): 10 items, expected sum = pack §3 alpha-row-E");
  test.todo("C (Conventional): 10 items, expected sum = pack §3 alpha-row-C");
  test.todo(
    "top-3 RIASEC code derivation from canonical scores (e.g. expected RIA / IRA / SAE per fixture)",
  );
  test.todo(
    "negative path: missing item response surfaces a deterministic error (no silent zero-fill)",
  );
});
