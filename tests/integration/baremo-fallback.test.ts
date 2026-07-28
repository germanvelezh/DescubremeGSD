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
import {describe, it} from "vitest";

describe("QUAL-06: baremo fallback CO → MX → INTL", () => {
  // 1. Seed instrument_version + baremo CO + MX + INTL.
  // 2. selectBaremo(supabase, instrumentVersionId, 'CO') →
  //    { populationUsed: 'CO', fallback: false }.
  // 3. SELECT COUNT(*) from baremo_fallback_event → unchanged.
  it.todo("selects CO when available (no fallback)");

  // Same fixture but DELETE baremo CO.
  // selectBaremo → populationUsed: 'MX', fallback: true.
  it.todo("falls back CO → MX when CO row missing");

  // Same fixture but DELETE baremo CO + MX.
  // selectBaremo → populationUsed: 'INTL', fallback: true.
  it.todo("falls back CO → INTL when CO + MX missing");

  // Same fixture but DELETE all baremo rows.
  // selectBaremo → null.
  it.todo("returns null when no baremo exists for instrument_version");

  it.todo("contract documented; runtime gated on DATABASE_URL");
});
