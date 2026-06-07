/**
 * Unit tests for `lib/report/assembler.ts::composeReport`.
 *
 * Coverage:
 *   - 3-layer payload shape (`layer1`, `layer2`, `layer3`, `fichaTecnica`, `footer`).
 *   - top3 derived deterministically from ipsative bands (ALTO first).
 *   - Percentile gating: if shouldShowPercentile() = false → bands only.
 *   - Footer always carries NFR-27 chip data (D3.12 Phase 1 verbatim).
 *
 * Anchors:
 *   - 01-CONTEXT.md D3.5 (estructura por capas).
 *   - 01-UI-SPEC.md §7.6.
 *   - PLAN.md §<behavior> Test 1.
 */
import { describe, expect, test } from "vitest";

import { composeReport } from "@/lib/report/assembler";

import { createMockSupabaseClient } from "@/tests/setup";

// Minimal Drizzle-shape rows for the mock paths used by composeReport.
// The mock client supports a queue of results keyed by table name; assembler
// reads tables in a known order: assessment_session → instrument_version →
// item_response (join item) → scoring_rule → narrative_template → occupation.
// We use the simpler `createMockSupabaseClient.__setResult` which returns the
// same payload for ALL chained selects — assembler must tolerate `data:null`
// from the optional Cowork seeds (narrative_template, occupation) and return
// placeholder content.

interface MockClient {
  from: (tbl: string) => MockClient;
  select: (...args: unknown[]) => MockClient;
  eq: (...args: unknown[]) => MockClient;
  in: (...args: unknown[]) => MockClient;
  order: (...args: unknown[]) => MockClient;
  limit: (...args: unknown[]) => MockClient;
  maybeSingle: () => Promise<{ data: unknown; error: unknown }>;
  // terminal that resolves to { data, error } when select() is the leaf
  then?: (resolve: (v: { data: unknown; error: unknown }) => void) => void;
}

// Custom multi-table mock — keyed by from(tableName).
function createTableMock(
  results: Record<string, { data: unknown; error: unknown }>,
): MockClient {
  let currentTable = "";
  const chain: MockClient = {
    from(tbl) {
      currentTable = tbl;
      return chain;
    },
    select() {
      return chain;
    },
    eq() {
      return chain;
    },
    in() {
      return chain;
    },
    order() {
      return chain;
    },
    limit() {
      return chain;
    },
    async maybeSingle() {
      return results[currentTable] ?? { data: null, error: null };
    },
    then(resolve) {
      resolve(results[currentTable] ?? { data: [], error: null });
    },
  };
  return chain;
}

describe("composeReport: 3-layer payload (D3.5)", () => {
  test("returns layer1 + layer2 + layer3 + fichaTecnica + footer", async () => {
    // Spike profile: R=ALTO, I=MEDIO, A=MEDIO (ordered desc) — top3 = ['R','I','A'].
    const sessionRow = {
      data: {
        id: "00000000-0000-0000-0000-000000000001",
        user_id: "00000000-0000-0000-0000-000000000010",
        anonymous_session_id: null,
        instrument_version_id: "00000000-0000-0000-0000-000000000100",
        progress: 60,
        started_at: "2026-06-07T10:00:00Z",
        completed_at: "2026-06-07T10:15:00Z",
      },
      error: null,
    };
    const ivRow = {
      data: {
        id: "00000000-0000-0000-0000-000000000100",
        item_count: 60,
        likert_min: 1,
        likert_max: 5,
        psychometric_status: {
          alpha_by_dimension: {
            R: 0.81,
            I: 0.82,
            A: 0.84,
            S: 0.83,
            E: 0.78,
            C: 0.79,
          },
          source: "INTL_Rounds_2010",
          latam_status: "pending",
        },
      },
      error: null,
    };
    const snapshotRow = {
      data: {
        id: "00000000-0000-0000-0000-000000000200",
        user_id: "00000000-0000-0000-0000-000000000010",
        session_id: "00000000-0000-0000-0000-000000000001",
        narrative_version: "1.0",
        occupation_set_version: "1.0",
        html_payload: {
          scores_by_dim: { R: 38, I: 30, A: 28, S: 18, E: 14, C: 10 },
          bands_by_dim: {
            R: "ALTO",
            I: "MEDIO",
            A: "MEDIO",
            S: "MEDIO",
            E: "BAJO",
            C: "BAJO",
          },
          display_by_dim: {
            R: { rawScore: 38, baremoPopulation: "INTL", fallback: true, showPercentile: false },
            I: { rawScore: 30, baremoPopulation: "INTL", fallback: true, showPercentile: false },
            A: { rawScore: 28, baremoPopulation: "INTL", fallback: true, showPercentile: false },
            S: { rawScore: 18, baremoPopulation: "INTL", fallback: true, showPercentile: false },
            E: { rawScore: 14, baremoPopulation: "INTL", fallback: true, showPercentile: false },
            C: { rawScore: 10, baremoPopulation: "INTL", fallback: true, showPercentile: false },
          },
          ethics: {
            requires_disclaimer: false,
            requires_contention_route: false,
            flags: [],
          },
          quality: { severity: "ok", signals: [] },
        },
        rendered_at: "2026-06-07T10:15:30Z",
      },
      error: null,
    };
    const instrumentRow = {
      data: { ethical_flags: [], sensitivity: "low" },
      error: null,
    };

    // For ethics middleware lookup (instrument_version → instrument).
    const ivLookupRow = {
      data: { instrument_id: "00000000-0000-0000-0000-000000000110" },
      error: null,
    };

    // Tables that return arrays via terminal .then() (PostgREST default).
    const supabase = createTableMock({
      assessment_session: sessionRow,
      instrument_version: ivRow,
      report_snapshot: snapshotRow,
      instrument: instrumentRow,
      narrative_template: { data: null, error: null },
      occupation: { data: [], error: null },
    });

    // Patch the chain so the ethics middleware's two-step lookup
    // (instrument_version, then instrument) works deterministically.
    const ivCalls = [ivRow, ivLookupRow];
    let ivCallIdx = 0;
    const originalFrom = supabase.from;
    supabase.from = (tbl: string) => {
      if (tbl === "instrument_version") {
        const idx = ivCallIdx++;
        const result = ivCalls[idx] ?? ivLookupRow;
        // Override maybeSingle just for this chain.
        const inner = originalFrom.call(supabase, tbl);
        inner.maybeSingle = async () => result;
        return inner;
      }
      return originalFrom.call(supabase, tbl);
    };

    const out = await composeReport(supabase as unknown as Parameters<typeof composeReport>[0], {
      sessionId: "00000000-0000-0000-0000-000000000001",
      userCountryCode: "CO",
    });

    // Layer 1: hexagono data + top3 + narrative top phrase.
    expect(out.layer1.scoresByDim).toEqual({ R: 38, I: 30, A: 28, S: 18, E: 14, C: 10 });
    expect(out.layer1.top3).toEqual(["R", "I", "A"]);
    expect(typeof out.layer1.narrativeTopPhrase).toBe("string");

    // Layer 2: numeric scores + bands + extended narrative.
    expect(out.layer2.scoresWithBands.R.band).toBe("ALTO");
    expect(out.layer2.scoresWithBands.R.rawScore).toBe(38);
    expect(out.layer2.scoresWithBands.R.showPercentile).toBe(false);
    expect(typeof out.layer2.narrativeExtended).toBe("string");

    // Layer 3: occupations + ficha tecnica.
    expect(Array.isArray(out.layer3.occupations)).toBe(true);
    expect(out.fichaTecnica.name).toMatch(/Interest Profiler/i);
    expect(out.fichaTecnica.itemCount).toBe(60);

    // Footer: NFR-27 chip ALWAYS true for psychometric instrument.
    expect(out.footer.nfr27Chip).toBe(true);
  });
});
