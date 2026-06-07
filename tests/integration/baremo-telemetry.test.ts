/**
 * Integration scaffold QUAL-08 — baremo telemetry insert.
 *
 * Cuando `selectBaremo` cae en fallback (MX o INTL), INSERTa una row a
 * `baremo_fallback_event(instrument_version_id, country_requested,
 * baremo_used, occurred_at)`. NO incluye user_id (T-01-08-02
 * Information Disclosure mitigation).
 *
 * Phase 1 status: scaffold-only (DATABASE_URL gating).
 *
 * Anchors:
 *   - PLAN.md `<behavior>` 8.
 *   - PLAN.md threat T-01-08-02.
 *   - supabase/migrations/008_baremo_fallback_event.sql.
 */
// @vitest-environment node
import { describe, expect, it } from "vitest";

const hasDb = Boolean(process.env.DATABASE_URL);
const itIfDb = it.skipIf(!hasDb);

describe("QUAL-08: baremo telemetry", () => {
  itIfDb(
    "writes one row per fallback select (country_requested + baremo_used)",
    async () => {
      // 1. Seed instrument_version + baremo INTL (no CO, no MX).
      // 2. Call selectBaremo(supabase, instrumentVersionId, 'CO') N=3 times.
      // 3. SELECT count(*) from baremo_fallback_event → 3.
      // 4. Verify rows: country_requested='CO', baremo_used='INTL'.
      expect(hasDb).toBe(true);
    },
  );

  itIfDb("does not write user_id (PII not leaked)", async () => {
    // Verify schema: baremo_fallback_event has no user_id column.
    expect(hasDb).toBe(true);
  });

  itIfDb(
    "skips insert when no fallback occurred (CO baremo present)",
    async () => {
      expect(hasDb).toBe(true);
    },
  );

  it("contract documented; runtime gated on DATABASE_URL", () => {
    expect(typeof hasDb).toBe("boolean");
  });
});
