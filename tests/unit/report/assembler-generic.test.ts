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
          // Embed `instrument!inner(code, name)` — many-to-one → objeto JSON.
          instrument: { code: "TwIVI", name: "Inventario de valores" },
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
    // La fila de `instrument` solo la lee el middleware de etica. NO trae
    // `name` a proposito: en prod el query del nombre filtraba por un id que
    // nunca empata, asi que la ficha nunca recibio un nombre por esta via.
    instrument: {
      data: {
        ethical_flags: overrides?.ethicalFlags ?? { contention_route: true },
        sensitivity: overrides?.sensitivity ?? "high",
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

/**
 * Circumplex fixture con la forma REAL de prod (snapshot `96fe99d5`, smoke
 * PR #20): `scores_by_dim` trae los 10 valores Schwartz y `bands_by_dim` los 4
 * HOV. Los dos espacios de claves son DISTINTOS — esa es la trampa que dejaba
 * la narrativa vacia ([GAP-TWIVI-REPORT-NARRATIVE-EMPTY]).
 */
function circumplexFixture(): TableResults {
  const fixture = barsFixture({ visualType: "circumplex" });

  (
    fixture.report_snapshot.data as { html_payload: Record<string, unknown> }
  ).html_payload = {
    // 10 Schwartz — lo que el scoring persiste como puntajes.
    scores_by_dim: {
      SD: 5, ST: 4, HE: 4,
      BE: 3, UN: 3,
      SE: 2, CO: 2, TR: 2,
      AC: 1, PO: 1,
    },
    // 4 HOV — lo que el scoring persiste como bandas (MRAT centrado).
    bands_by_dim: { OCH: "ALTO", STR: "MEDIO", CSV: "BAJO", SEN: "BAJO" },
    display_by_dim: {},
    quality: { severity: "ok", signals: [] },
  };

  // Las narrativas dimension×banda de TwIVI existen y estan keyed por HOV.
  fixture.narrative_template = {
    data: [
      {
        slot: "dimension_band",
        riasec_code: null,
        dimension: "OCH",
        band: "ALTO",
        template_text: "Te mueve explorar y probar caminos nuevos.",
      },
      {
        slot: "dimension_band",
        riasec_code: null,
        dimension: "CSV",
        band: "BAJO",
        template_text: "Te pesa menos conservar lo conocido.",
      },
    ],
    error: null,
  };

  return fixture;
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

describe("composeReport: la narrativa dimension×banda se keyea por BANDAS", () => {
  test("[GAP-TWIVI-REPORT-NARRATIVE-EMPTY] circumplex compone narrativa aunque scores_by_dim tenga otro espacio de claves", async () => {
    const mock = createMultiTableMock(circumplexFixture());

    const out = await composeReport(
      mock as unknown as Parameters<typeof composeReport>[0],
      { sessionId: SESSION_ID, userCountryCode: "CO" },
    );

    // El reporte de Valores mostraba el encabezado "Que sugiere esto sobre ti"
    // con NADA debajo: las dims salian de scores_by_dim (10 Schwartz) y las
    // narrativas viven keyed por los 4 HOV de bands_by_dim.
    expect(out.layer2.narrativeExtended).not.toBe("");
    expect(out.layer2.narrativeExtended).toContain(
      "Te mueve explorar y probar caminos nuevos.",
    );
    expect(out.layer2.narrativeExtended).toContain(
      "Te pesa menos conservar lo conocido.",
    );
  });

  test("[GAP-TWIVI-REPORT-NARRATIVE-EMPTY] la tabla de puntajes SIGUE sobre scores_by_dim (no se repunta a bandas)", async () => {
    const mock = createMultiTableMock(circumplexFixture());

    const out = await composeReport(
      mock as unknown as Parameters<typeof composeReport>[0],
      { sessionId: SESSION_ID, userCountryCode: "CO" },
    );

    // Gate anti-aflojamiento: repuntar `dims` GLOBALMENTE a bands_by_dim
    // cambiaria lo que `done/page.tsx` arma para el composer del mini-resultado
    // (lee bandsByDim de layer2.scoresWithBands) y dejaria rawScore=0 en los
    // 4 HOV, que no tienen puntaje propio. Solo la narrativa cambia de espacio.
    expect(Object.keys(out.layer2.scoresWithBands).sort()).toEqual([
      "AC", "BE", "CO", "HE", "PO", "SD", "SE", "ST", "TR", "UN",
    ]);
    expect(out.layer2.scoresWithBands.SD.rawScore).toBe(5);
  });

  test("bars: la narrativa no cambia (scores_by_dim y bands_by_dim comparten claves)", async () => {
    const mock = createMultiTableMock(barsFixture());

    const out = await composeReport(
      mock as unknown as Parameters<typeof composeReport>[0],
      { sessionId: SESSION_ID, userCountryCode: "CO" },
    );

    expect(out.layer2.narrativeExtended).toContain(
      "Buscas lo nuevo y cuestionas lo dado.",
    );
  });
});

describe("composeReport: ficha tecnica", () => {
  test("[GAP-REPORT-FICHA-NAME-JOIN] el nombre sale del embed de instrument_version, no de un join imposible", async () => {
    // Prod: el segundo query filtraba `instrument.id` por
    // `session.instrument_version_id` — un id de version contra un id de
    // instrumento, que NUNCA empata → la ficha caia siempre al nombre generico.
    const mock = createMultiTableMock(barsFixture());

    const out = await composeReport(
      mock as unknown as Parameters<typeof composeReport>[0],
      { sessionId: SESSION_ID, userCountryCode: "CO" },
    );

    expect(out.fichaTecnica.name).toBe("Inventario de valores");
  });
});
