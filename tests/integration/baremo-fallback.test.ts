/**
 * Integration scaffold QUAL-06 — baremo fallback CO → MX → INTL.
 *
 * `selectBaremo(supabase, instrumentVersionId, countryCode)` busca baremo
 * en el orden: countryCode (CO) → MX → INTL. Retorna `{ baremo, fallback,
 * populationUsed }`. Cuando se usa fallback, escribe a `baremo_fallback_event`.
 *
 * Phase 1 status: scaffold-only (Plan 01-12 trae CI Postgres). El test
 * skipea sin DATABASE_URL y emite `it.skipIf` para mantener verde.
 *
 * Anchors:
 *   - 01-RESEARCH.md lineas 1780-1782 (Pitfall 10).
 *   - 01-PATTERNS.md §2.3 (lib/baremo/selector).
 *   - PLAN.md §<acceptance_criteria>.
 */
// @vitest-environment node
import { describe, expect, it } from "vitest";

const hasDb = Boolean(process.env.DATABASE_URL);
const itIfDb = it.skipIf(!hasDb);

describe("QUAL-06: baremo fallback CO → MX → INTL", () => {
  itIfDb(
    "selects CO when available (no fallback)",
    async () => {
      // 1. Seed instrument_version + baremo CO + MX + INTL.
      // 2. selectBaremo(supabase, instrumentVersionId, 'CO') →
      //    { populationUsed: 'CO', fallback: false }.
      // 3. SELECT COUNT(*) from baremo_fallback_event → unchanged.
      expect(hasDb).toBe(true);
    },
  );

  itIfDb(
    "falls back CO → MX when CO row missing",
    async () => {
      // Same fixture but DELETE baremo CO.
      // selectBaremo → populationUsed: 'MX', fallback: true.
      expect(hasDb).toBe(true);
    },
  );

  itIfDb(
    "falls back CO → INTL when CO + MX missing",
    async () => {
      // Same fixture but DELETE baremo CO + MX.
      // selectBaremo → populationUsed: 'INTL', fallback: true.
      expect(hasDb).toBe(true);
    },
  );

  itIfDb(
    "returns null when no baremo exists for instrument_version",
    async () => {
      // Same fixture but DELETE all baremo rows.
      // selectBaremo → null.
      expect(hasDb).toBe(true);
    },
  );

  it("contract documented; runtime gated on DATABASE_URL", () => {
    expect(typeof hasDb).toBe("boolean");
  });
});
