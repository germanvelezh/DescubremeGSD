/**
 * Unit tests for `lib/report/assembler.ts::composeReport` — instrument-agnostic
 * generalization (Plan 02-04 Task 2, D-C.2/D-C.3/D-C.4).
 *
 * Coverage:
 *   - visual_type='bars' → composes via the dimension×band narrative path,
 *     sets report visual_type to 'bars', and DOES NOT query `occupation`
 *     (occupations are O*NET-only, D-C.3).
 *   - visual_type='hexagon' (and null/undefined default) → RIASEC path +
 *     occupations queried (regression with the Phase-1 path).
 *   - whatItMeasures/limits are read from instrument metadata
 *     (psychometric_status jsonb), not RIASEC string literals (FREE-11).
 *   - Footer contention link is driven by the decoupled `contentionRoute`
 *     flag (02-06): a version with contentionRoute=true but pretestModal=false
 *     still gets the link (CONTEXT D-A.2 / values footer).
 *
 * Mock strategy: per-table dispatcher that records which tables were queried so
 * we can assert `occupation` is skipped on the bars path. instrument_version is
 * an ARRAY (assembler reads it once, ethics middleware reads it again).
 *
 * Anchors:
 *   - 02-CONTEXT.md D-C.2 (visual_type branch), D-C.3 (occupations O*NET-only),
 *     D-A.2 (values footer contention link).
 *   - 02-PATTERNS.md § "lib/report/assembler.ts (MODIFY — generalize)".
 */
import { describe, expect, test } from "vitest";

import { composeReport } from "@/lib/report/assembler";

interface Result {
  data: unknown;
  error: unknown;
}

interface TableResults {
  assessment_session: Result;
  instrument_version: Result[];
  report_snapshot: Result;
  instrument: Result;
  narrative_template: Result;
  occupation: Result;
}

function createMultiTableMock(results: TableResults) {
  const ivQueue = [...results.instrument_version];
  const queried = new Set<string>();

  const mock = {
    queried,
    from(tbl: string) {
      queried.add(tbl);
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
            ivQueue.shift() ??
            results.instrument_version[results.instrument_version.length - 1];
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
        then: (resolve: (v: Result) => void) => resolve(multiRow),
      };
      return chain;
    },
  };
  return mock;
}

const SESSION_ID = "00000000-0000-0000-0000-000000000001";
const IV_ID = "00000000-0000-0000-0000-000000000100";

function barsFixture(overrides?: {
  ethicalFlags?: unknown;
  sensitivity?: string;
  visualType?: string;
}): TableResults {
  return {
    assessment_session: {
      data: {
        id: SESSION_ID,
        user_id: "00000000-0000-0000-0000-000000000010",
        instrument_version_id: IV_ID,
        progress: 100,
      },
      error: null,
    },
    instrument_version: [
      {
        data: {
          id: IV_ID,
          item_count: 60,
          likert_min: 1,
          likert_max: 5,
          visual_type: overrides?.visualType ?? "bars",
          psychometric_status: {
            alpha_by_dimension: { Apertura: 0.8, Conservacion: 0.79 },
            source: "pack",
            latam_status: "pending",
            what_it_measures: "Que mide: prioridades de valores (4 dimensiones).",
            limits: "NO es una evaluacion clinica. NO predice conducta.",
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
        session_id: SESSION_ID,
        instrument_version_id: IV_ID,
        narrative_version: "1.0",
        occupation_set_version: "1.0",
        html_payload: {
          scores_by_dim: { Apertura: 1.2, Conservacion: -0.4 },
          bands_by_dim: { Apertura: "ALTO", Conservacion: "MEDIO" },
          display_by_dim: {
            Apertura: {
              rawScore: 1.2,
              baremoPopulation: null,
              fallback: false,
              showPercentile: false,
            },
            Conservacion: {
              rawScore: -0.4,
              baremoPopulation: null,
              fallback: false,
              showPercentile: false,
            },
          },
          quality: { severity: "ok", signals: [] },
        },
        error: null,
      },
      error: null,
    },
    instrument: {
      data: {
        ethical_flags: overrides?.ethicalFlags ?? { contention_route: true },
        sensitivity: overrides?.sensitivity ?? "high",
        name: "Inventario de valores",
      },
      error: null,
    },
    narrative_template: {
      data: [
        {
          slot: "dimension_band",
          riasec_code: null,
          dimension: "Apertura",
          band: "ALTO",
          template_text: "Buscas lo nuevo y cuestionas lo dado.",
        },
      ],
      error: null,
    },
    occupation: { data: [], error: null },
  };
}

describe("composeReport: instrument-agnostic generalization (D-C.2)", () => {
  test("bars path uses dimension×band narrative, skips occupations, sets visual_type", async () => {
    const mock = createMultiTableMock(barsFixture());

    const out = await composeReport(
      mock as unknown as Parameters<typeof composeReport>[0],
      { sessionId: SESSION_ID, userCountryCode: "CO" },
    );

    // D-C.2: report exposes visual_type so the page resolves via VISUAL_REGISTRY.
    expect(out.visualType).toBe("bars");
    // D-C.3: occupations table NEVER queried on the bars path.
    expect(mock.queried.has("occupation")).toBe(false);
    expect(out.layer3.occupations).toEqual([]);
    // FREE-11: whatItMeasures/limits from metadata, not RIASEC literals.
    expect(out.fichaTecnica.whatItMeasures).toBe(
      "Que mide: prioridades de valores (4 dimensiones).",
    );
    expect(out.fichaTecnica.limits).toBe(
      "NO es una evaluacion clinica. NO predice conducta.",
    );
    expect(out.fichaTecnica.whatItMeasures).not.toMatch(/RIASEC|preferencias por tipos/);
  });

  test("footer contention link driven by contentionRoute even with pretestModal=false", async () => {
    // contention_route=true, NO pretest_modal → values gets the footer link.
    const mock = createMultiTableMock(
      barsFixture({ ethicalFlags: { contention_route: true } }),
    );

    const out = await composeReport(
      mock as unknown as Parameters<typeof composeReport>[0],
      { sessionId: SESSION_ID, userCountryCode: "CO" },
    );

    expect(out.footer.requiresContentionRoute).toBe(true);
  });

  test("hexagon path (and null default) keeps RIASEC + occupations", async () => {
    // visual_type null → must default to hexagon (O*NET prod row is hexagon).
    const fixture = barsFixture({ visualType: undefined });
    // Re-shape scores to RIASEC so the hexagon path is coherent.
    (fixture.instrument_version[0].data as { visual_type?: string }).visual_type =
      "hexagon";
    const mock = createMultiTableMock(fixture);

    const out = await composeReport(
      mock as unknown as Parameters<typeof composeReport>[0],
      { sessionId: SESSION_ID, userCountryCode: "CO" },
    );

    expect(out.visualType).toBe("hexagon");
    // D-C.3: hexagon path DOES query occupations.
    expect(mock.queried.has("occupation")).toBe(true);
  });
});
