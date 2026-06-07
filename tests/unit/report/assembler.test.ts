/**
 * Unit tests for `lib/report/assembler.ts::composeReport`.
 *
 * Coverage:
 *   - 3-layer payload shape (`layer1`, `layer2`, `layer3`, `fichaTecnica`, `footer`).
 *   - top3 derived deterministically from ipsative bands (ALTO first).
 *   - Percentile gating: snapshot showPercentile=false → bands only.
 *   - Footer always carries NFR-27 chip data (D3.12 Phase 1 verbatim).
 *
 * Mock strategy: a per-table dispatcher that returns a fresh chain whose
 * terminal methods (.maybeSingle / .then) resolve to the result configured
 * for THAT specific table. Each .from() call creates a brand-new chain so
 * cross-table state can't leak (the problem with a single-chain mock is
 * the ethics middleware's two-step lookup against instrument_version).
 *
 * Anchors:
 *   - 01-CONTEXT.md D3.5 (estructura por capas).
 *   - 01-UI-SPEC.md §7.6.
 *   - PLAN.md §<behavior> Test 1.
 */
import { describe, expect, test } from "vitest";

import { composeReport } from "@/lib/report/assembler";

// PostgREST result envelope.
interface Result {
  data: unknown;
  error: unknown;
}

/**
 * Per-table results. `instrument_version` is an ARRAY because the
 * assembler reads it once and the ethics middleware reads it again
 * (for the instrument_id lookup) — we pop one entry per call.
 */
interface TableResults {
  assessment_session: Result;
  instrument_version: Result[];
  report_snapshot: Result;
  instrument: Result;
  narrative_template: Result; // multi-row, resolved via .then()
  occupation: Result; // multi-row, resolved via .then()
}

function createMultiTableMock(results: TableResults) {
  const ivQueue = [...results.instrument_version];

  return {
    from(tbl: string) {
      let terminal: () => Promise<Result> = async () => ({
        data: null,
        error: null,
      });
      let multiRow: Result = { data: [], error: null };

      switch (tbl) {
        case "assessment_session":
          terminal = async () => results.assessment_session;
          break;
        case "instrument_version": {
          const next =
            ivQueue.shift() ?? results.instrument_version[results.instrument_version.length - 1];
          terminal = async () => next as Result;
          break;
        }
        case "report_snapshot":
          terminal = async () => results.report_snapshot;
          break;
        case "instrument":
          terminal = async () => results.instrument;
          break;
        case "narrative_template":
          multiRow = results.narrative_template;
          break;
        case "occupation":
          multiRow = results.occupation;
          break;
      }

      const chain: Record<string, unknown> = {
        select: () => chain,
        eq: () => chain,
        in: () => chain,
        or: () => chain,
        order: () => chain,
        limit: () => chain,
        maybeSingle: terminal,
        // PostgREST builder is thenable — used for multi-row selects.
        then: (resolve: (v: Result) => void) => resolve(multiRow),
      };
      return chain;
    },
  };
}

describe("composeReport: 3-layer payload (D3.5)", () => {
  test("returns layer1 + layer2 + layer3 + fichaTecnica + footer", async () => {
    // Spike profile: R=ALTO, I=MEDIO, A=MEDIO — top3 = ['R','I','A'].
    const supabase = createMultiTableMock({
      assessment_session: {
        data: {
          id: "00000000-0000-0000-0000-000000000001",
          user_id: "00000000-0000-0000-0000-000000000010",
          instrument_version_id: "00000000-0000-0000-0000-000000000100",
          progress: 60,
        },
        error: null,
      },
      // Two calls: assembler reads the version row first, ethics middleware
      // reads the same table to derive instrument_id second.
      instrument_version: [
        {
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
            version: "1.0",
            lang: "es-CO",
          },
          error: null,
        },
        {
          data: { instrument_id: "00000000-0000-0000-0000-000000000110" },
          error: null,
        },
      ],
      report_snapshot: {
        data: {
          id: "00000000-0000-0000-0000-000000000200",
          user_id: "00000000-0000-0000-0000-000000000010",
          session_id: "00000000-0000-0000-0000-000000000001",
          instrument_version_id: "00000000-0000-0000-0000-000000000100",
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
              R: {
                rawScore: 38,
                baremoPopulation: "INTL",
                fallback: true,
                showPercentile: false,
              },
              I: {
                rawScore: 30,
                baremoPopulation: "INTL",
                fallback: true,
                showPercentile: false,
              },
              A: {
                rawScore: 28,
                baremoPopulation: "INTL",
                fallback: true,
                showPercentile: false,
              },
              S: {
                rawScore: 18,
                baremoPopulation: "INTL",
                fallback: true,
                showPercentile: false,
              },
              E: {
                rawScore: 14,
                baremoPopulation: "INTL",
                fallback: true,
                showPercentile: false,
              },
              C: {
                rawScore: 10,
                baremoPopulation: "INTL",
                fallback: true,
                showPercentile: false,
              },
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
      },
      instrument: {
        data: { ethical_flags: [], sensitivity: "low", name: "Inventario de intereses" },
        error: null,
      },
      narrative_template: { data: [], error: null },
      occupation: { data: [], error: null },
    });

    const out = await composeReport(
      supabase as unknown as Parameters<typeof composeReport>[0],
      {
        sessionId: "00000000-0000-0000-0000-000000000001",
        userCountryCode: "CO",
      },
    );

    // Layer 1: hexagono data + top3 + narrative top phrase.
    expect(out.layer1.scoresByDim).toEqual({
      R: 38,
      I: 30,
      A: 28,
      S: 18,
      E: 14,
      C: 10,
    });
    expect(out.layer1.top3).toEqual(["R", "I", "A"]);
    expect(typeof out.layer1.narrativeTopPhrase).toBe("string");
    // Narrative is a GAP placeholder since narrative_template is empty.
    expect(out.layer1.narrativeTopPhrase).toMatch(/Cowork|GAP/);

    // Layer 2: bands + show flag.
    expect(out.layer2.scoresWithBands.R?.band).toBe("ALTO");
    expect(out.layer2.scoresWithBands.R?.rawScore).toBe(38);
    expect(out.layer2.scoresWithBands.R?.showPercentile).toBe(false);
    expect(typeof out.layer2.narrativeExtended).toBe("string");

    // Layer 3: occupations + ficha tecnica.
    expect(Array.isArray(out.layer3.occupations)).toBe(true);
    expect(out.layer3.occupations).toEqual([]);
    expect(out.fichaTecnica.itemCount).toBe(60);
    expect(out.fichaTecnica.version).toBe("1.0");
    expect(out.fichaTecnica.latamStatus).toBe("pending");

    // Footer: NFR-27 chip ALWAYS true for psychometric instrument.
    expect(out.footer.nfr27Chip).toBe(true);
  });
});
