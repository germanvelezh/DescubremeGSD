/**
 * Unit test — `computed_score.band` tiene que llevar la banda que el motor ya
 * calculo ([GAP-COMPUTED-SCORE-BAND-NORMALIZED-NUNCA-ESCRITAS]).
 *
 * POR QUE EXISTE ESTE TEST.
 *
 * La banda NO faltaba por olvido: faltaba por un ORDEN DE DEPENDENCIA. El INSERT
 * de `computed_score` vivia dentro del loop del paso 10 (una fila por
 * `scoring_rule`), mientras que `band` sale de `computeIpsativeBands`, que es una
 * z intra-perfil sobre el vector COMPLETO — no existe hasta que todas las reglas
 * ya se puntuaron (paso 11). Un valor que depende del conjunto entero no se puede
 * escribir dentro del loop que todavia esta construyendo ese conjunto. El fix
 * difiere la ESCRITURA (paso 11a), no el calculo.
 *
 * Medido en prod 2026-07-29: 197 filas, `band` no nulo en 0.
 *
 * POR QUE AFIRMA IGUALDAD CONTRA EL SNAPSHOT Y NO CONTRA UN LITERAL.
 *
 * Afirmar `band === "ALTO"` fija la aritmetica de banding en un segundo lugar y
 * se rompe con cualquier reajuste legitimo del umbral. Peor: afirmar solo
 * `band !== null` lo dejaria verde a un `?? "MEDIO"`, que es EXACTAMENTE el
 * antipatron que ya enmascaro un fallo en el assembler de narrativas (PR #24).
 * Lo que este test fija es la CONSISTENCIA entre las dos escrituras de la misma
 * corrida: la banda que se persiste por dimension es la misma que el titular ve
 * en `report_snapshot.bands_by_dim`. Esa es la propiedad que importa, y es la que
 * el bug rompia.
 *
 * EL CASO MRAT NO ES UN DETALLE: SON 75 DE LAS 197 FILAS.
 *
 * TwIVI (`centering_strategy = 'mrat'`) bandea los 4 valores de orden superior
 * MRAT (OCH/SEN/CSV/STR), no sus 10 dimensiones Schwartz puntuadas — los dos
 * espacios de claves NO coinciden (verificado contra prod: TwIVI 8/8 snapshots
 * difieren; BFI/O*NET/PERMA 0/N). No hay banda POR DIMENSION que escribir, asi
 * que la fila queda en `null` y eso es lo correcto hasta que haya una decision
 * psicometrica ([GAP-COMPUTED-SCORE-TWIVI-BAND]). El test lo PINEA para que
 * nadie lo "arregle" estampando la banda del HOV padre en sus dimensiones hijas,
 * que seria una afirmacion psicometrica disfrazada de copia de datos.
 *
 * Anchors:
 *   - lib/scoring/score-session.ts pasos 10 y 11a.
 *   - lib/scoring/ipsative.ts (computeIpsativeBands, z >= 1 ALTO / z <= -1 BAJO).
 *   - estado/BACKLOG.md [GAP-COMPUTED-SCORE-BAND-NORMALIZED-NUNCA-ESCRITAS].
 */
// @vitest-environment node
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

vi.mock("@/lib/logger", () => ({
  logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

vi.mock("@/lib/baremo/selector", () => ({
  selectBaremo: vi.fn(async () => ({
    baremo: null,
    fallback: false,
    populationUsed: null,
  })),
  shouldShowPercentile: vi.fn(() => false),
}));

vi.mock("@/lib/ethics/middleware", () => ({
  evaluateInstrumentEthics: vi.fn(async () => ({
    requires_disclaimer: false,
    requires_contention_route: false,
    flags: [],
  })),
}));

vi.mock("@/lib/quality/validator", () => ({
  validateQuality: vi.fn(() => ({ severity: "ok", signals: [] })),
}));

vi.mock("@/lib/audit/writer", () => ({ writeAudit: vi.fn(async () => undefined) }));

// `score` es lo unico mockeado del pipeline aritmetico: fija el vector de
// entrada. `computeIpsativeBands` corre DE VERDAD — si se mockeara, la igualdad
// que afirma el test seria entre dos copias del mismo stub y no probaria nada.
const SCORE_BY_ITEM: Record<string, number> = { d1: 10, d2: 20, d3: 30 };
vi.mock("@/lib/scoring/interpreter", () => ({
  score: vi.fn((formula: { item_codes: string[] }) => {
    const key = formula.item_codes[0];
    const value = SCORE_BY_ITEM[key];
    if (value === undefined) throw new Error(`unscripted item_code: ${key}`);
    return value;
  }),
}));

const scripts = vi.hoisted(() => ({ map: new Map<string, unknown>() }));
const inserts = vi.hoisted(() => ({ rows: [] as { table: string; payload: any }[] }));

function makeClient() {
  function builder(table: string) {
    let op = "select";
    // biome-ignore lint/suspicious/noExplicitAny: test mock builder
    const b: any = {};
    b.select = vi.fn(() => b);
    b.insert = vi.fn((payload: unknown) => {
      op = "insert";
      inserts.rows.push({ table, payload });
      return b;
    });
    b.update = vi.fn(() => {
      op = "update";
      return b;
    });
    b.eq = vi.fn(() => b);
    const resolve = async () =>
      scripts.map.get(`${table}.${op}`) ?? { data: null, error: null, count: null };
    b.maybeSingle = vi.fn(resolve);
    b.single = vi.fn(resolve);
    b.then = (onF: (v: unknown) => unknown) => resolve().then(onF);
    return b;
  }
  return { from: vi.fn((t: string) => builder(t)) };
}

const SESSION_ID = "33333333-3333-3333-3333-333333333333";
const IV_ID = "44444444-4444-4444-4444-444444444444";
const USER_ID = "55555555-5555-5555-5555-555555555555";

const DIMS = ["D1", "D2", "D3"] as const;
const ITEM_COUNT = 3;

/**
 * @param centeringStrategy  'ipsative_z' (banda por dimension) o 'mrat' (banda
 *                           por HOV — sin `value_map`/`hov_map` los HOV salen
 *                           vacios, que es justo el caso "ninguna clave del
 *                           snapshot empata con una dimension").
 */
function seedPipeline(centeringStrategy: "ipsative_z" | "mrat") {
  inserts.rows.length = 0;
  scripts.map.set("assessment_session.select", {
    data: {
      id: SESSION_ID,
      user_id: USER_ID,
      anonymous_session_id: null,
      instrument_version_id: IV_ID,
      progress: ITEM_COUNT,
      started_at: new Date().toISOString(),
      completed_at: null,
    },
    error: null,
  });
  scripts.map.set("instrument_version.select", {
    data: {
      id: IV_ID,
      item_count: ITEM_COUNT,
      centering_strategy: centeringStrategy,
      psychometric_status: { latam_status: "pending", alpha_by_dimension: {} },
    },
    error: null,
  });
  scripts.map.set("item_response.select", {
    data: DIMS.map((dim, i) => ({
      raw_value: 3,
      item: { dimension: dim, sequence_number: i + 1 },
    })),
    error: null,
  });
  scripts.map.set("scoring_rule.select", {
    data: DIMS.map((dim, i) => ({
      id: `rule-${i + 1}`,
      dimension: dim,
      // `scale` es obligatorio en ScoringFormulaSchema (lib/scoring/types.ts:22);
      // sin el, safeParse falla y el pipeline corta en `scoring_formula_invalid`
      // antes de llegar a cualquier insert.
      formula: { type: "sum", item_codes: [`d${i + 1}`], scale: [1, 5] },
      scoring_version: "1.0",
    })),
    error: null,
  });
  scripts.map.set("user.select", { data: { country_code: "CO" }, error: null });
}

const okOrReason = (result: { ok: boolean } & Record<string, unknown>) =>
  result.ok ? "ok" : `scoreSession fallo: ${String(result.error)}`;

const computedScoreRows = () =>
  inserts.rows.filter((r) => r.table === "computed_score").map((r) => r.payload);

const snapshotBands = (): Record<string, string> =>
  inserts.rows.find((r) => r.table === "report_snapshot")?.payload.html_payload
    .bands_by_dim ?? {};

beforeEach(() => {
  scripts.map.clear();
  inserts.rows.length = 0;
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("computed_score.band — la banda calculada se persiste", () => {
  test("cada fila lleva la MISMA banda que report_snapshot.bands_by_dim", async () => {
    seedPipeline("ipsative_z");

    const { scoreSession } = await import("@/lib/scoring/score-session");
    // biome-ignore lint/suspicious/noExplicitAny: test mock client
    const result = await scoreSession(makeClient() as any, SESSION_ID);

    // Falla informativa: si el pipeline corta antes de los inserts, el mensaje
    // trae el motivo en vez de un `false !== true` mudo.
    expect(okOrReason(result)).toBe("ok");

    const bands = snapshotBands();
    const rows = computedScoreRows();
    expect(rows).toHaveLength(DIMS.length);

    // Centinela de no-vacuidad #1: un vector cuyo banding colapsa a una sola
    // banda haria pasar la igualdad de abajo sin discriminar nada. 10/20/30 da
    // z = -1.22 / 0 / +1.22 -> las tres bandas. Si alguien toca el fixture o el
    // umbral y esto colapsa, el test avisa en vez de volverse tautologico.
    expect(new Set(Object.values(bands)).size).toBeGreaterThan(1);

    // Centinela de no-vacuidad #2: `band` ausente en el payload y `band: null`
    // son indistinguibles para un `toBe(undefined)` descuidado. El bug original
    // era la AUSENCIA de la clave.
    for (const row of rows) {
      expect(row).toHaveProperty("band");
    }

    // La afirmacion: consistencia entre las dos escrituras de la misma corrida.
    const bandByDim = Object.fromEntries(
      rows.map((r, i) => [DIMS[i], r.band] as const),
    );
    expect(bandByDim).toEqual(bands);
  });

  test("mrat: sin banda por dimension la fila queda null, nunca un default", async () => {
    seedPipeline("mrat");

    const { scoreSession } = await import("@/lib/scoring/score-session");
    // biome-ignore lint/suspicious/noExplicitAny: test mock client
    const result = await scoreSession(makeClient() as any, SESSION_ID);

    // Falla informativa: si el pipeline corta antes de los inserts, el mensaje
    // trae el motivo en vez de un `false !== true` mudo.
    expect(okOrReason(result)).toBe("ok");

    const rows = computedScoreRows();
    expect(rows).toHaveLength(DIMS.length);

    // Precondicion del caso: las claves del snapshot NO son las dimensiones.
    // Sin esto el test pasaria por la razon equivocada (p. ej. si `mrat` cayera
    // por accidente en la rama ipsative y las bandas SI empataran).
    const bands = snapshotBands();
    for (const dim of DIMS) {
      expect(bands).not.toHaveProperty(dim);
    }

    // `null`, no `"MEDIO"`: estampar la banda del HOV padre en sus dimensiones
    // hijas es una decision psicometrica, no una copia de datos.
    for (const row of rows) {
      expect(row.band).toBeNull();
    }
  });

  test("normalized sigue sin calcularse — la fila no lo inventa", async () => {
    seedPipeline("ipsative_z");

    const { scoreSession } = await import("@/lib/scoring/score-session");
    // biome-ignore lint/suspicious/noExplicitAny: test mock client
    const result = await scoreSession(makeClient() as any, SESSION_ID);

    // Sin esto el test es TAUTOLOGICO: un pipeline que corta antes de escribir
    // deja `computedScoreRows()` vacio y el `for` de abajo no itera nunca. Se
    // detecto asi — el caso paso en verde mientras los otros dos fallaban.
    expect(okOrReason(result)).toBe("ok");
    expect(computedScoreRows()).toHaveLength(DIMS.length);

    // Pinea el alcance de este fix: `band` se cierra, `normalized` NO. Si alguien
    // agrega un `normalized` sin la decision psicometrica de que debe contener,
    // este test lo obliga a pasar por aca.
    for (const row of computedScoreRows()) {
      expect(row.normalized).toBeUndefined();
    }
  });
});
