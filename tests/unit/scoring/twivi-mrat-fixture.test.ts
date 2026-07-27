/**
 * Unit tests QUAL-05 — TwIVI MRAT centering fixture (the values form).
 *
 * Pins the values-form MRAT contract end-to-end at the unit level: the EXACT
 * value_map + hov_map seeded in db/seeds/instruments/TwIVI/instrument-version.sql
 * (10 Schwartz basic values × 2 items → SD1/SD2..UN1/UN2; 10 basic → 4 HOV) fed
 * to lib/scoring/mrat.ts::computeMratScores. This is the QUAL-05 acceptance for
 * the values instrument (all-equal → every HOV centered ≈ 0 → no winner).
 *
 * Why this is the acceptance even though the LIVE score-session.ts mrat dispatch
 * is dormant ([GAP-MRAT-METADATA-READ]: score-session.ts:403-404 still reads
 * empty `{}` maps until a downstream plan wires psychometric_status.value_map/
 * hov_map): the math + the seed's map SHAPE are proven here directly, exactly as
 * 02-03's acceptance intended (computeMratScores is the unit of truth; the
 * pipeline read is a separate, owned wiring step). The maps below are a VERBATIM
 * mirror of the seed — any seed/transform drift that breaks QUAL-05 fails here.
 *
 * Within-person framing (D-E1.3): centered_HOV = mean (not sum) of its centered
 * basic values; MRAT = mean of the FULL 20-item flat vector (Pitfall 3, NOT
 * per-value means); NO SD division. Bands stay within-person — no HOV baremo
 * (Pitfall 4) — but the BAND RULE is now the intra-profile z of
 * `computeIpsativeBands` over those 4 centered HOVs, not `bandFromMrat`
 * (ADR-036). See `pipelineBands` below.
 *
 * Anchors:
 *   - db/seeds/instruments/TwIVI/instrument-version.sql (value_map + hov_map).
 *   - lib/scoring/mrat.ts (computeMratScores; bandFromMrat is no longer wired).
 *   - lib/scoring/score-session.ts paso 11 rama 'mrat' (el pipeline real).
 *   - estado/DECISIONS_LOG.md ADR-036 (una sola definicion de banda).
 *   - 02-RESEARCH.md § "MRAT Transform" (QUAL-05 all-equal → ≈0).
 *   - 02-CONTEXT.md D-E1.3 (relative priorities), D-GATE.1 (TwIVI).
 *   - tests/unit/scoring/bfi2s-fixture.test.ts (fixture pattern).
 */
import { describe, expect, test } from "vitest";

import {
  computeIpsativeBands,
  type IpsativeBand,
} from "@/lib/scoring/ipsative";
import {
  bandFromMrat,
  computeMratScores,
  type MratScore,
} from "@/lib/scoring/mrat";

/** value code → synthesized item keys — VERBATIM mirror of the TwIVI seed. */
const VALUE_MAP: Record<string, string[]> = {
  SD: ["SD1", "SD2"],
  ST: ["ST1", "ST2"],
  HE: ["HE1", "HE2"],
  AC: ["AC1", "AC2"],
  PO: ["PO1", "PO2"],
  SE: ["SE1", "SE2"],
  CO: ["CO1", "CO2"],
  TR: ["TR1", "TR2"],
  BE: ["BE1", "BE2"],
  UN: ["UN1", "UN2"],
};

/** HOV code → basic-value codes (10 basic → 4 HOV) — VERBATIM mirror of the seed. */
const HOV_MAP: Record<string, string[]> = {
  OCH: ["SD", "ST", "HE"], // Apertura al cambio
  SEN: ["AC", "PO"], //       Autopromoción
  CSV: ["SE", "CO", "TR"], // Conservación (CSV, not CON — avoids BFI collision)
  STR: ["BE", "UN"], //       Autotrascendencia
};

const ALL_ITEM_KEYS = Object.values(VALUE_MAP).flat();

/** Build the flat 20-item response vector from a key→raw map (default k). */
function flatVector(
  overrides: Record<string, number> = {},
  fill = 0,
): { itemKey: string; rawValue: number }[] {
  return ALL_ITEM_KEYS.map((itemKey) => ({
    itemKey,
    rawValue: overrides[itemKey] ?? fill,
  }));
}

const EPSILON = 1e-9;

/**
 * Bandas tal como las produce el pipeline real (score-session.ts paso 11, rama
 * 'mrat'): `computeIpsativeBands` sobre los 4 HOV CENTRADOS. Espejo verbatim de
 * esas dos lineas — si el scoring cambiara de regla, este helper mentiria y los
 * tests de abajo dejarian de ser la aceptacion del instrumento.
 *
 * Bandear los centrados o las medias HOV crudas da lo mismo: la z es invariante
 * a un corrimiento constante y el MRAT es el mismo para los 4.
 */
function pipelineBands(higherOrder: MratScore[]): Record<string, IpsativeBand> {
  return computeIpsativeBands(
    Object.fromEntries(higherOrder.map((h) => [h.code, h.centered])),
  );
}

/** Vector plano de 20 items a partir de las 10 medias por valor (2 items c/u). */
function flatFromValueMeans(
  valueMeans: Record<string, number>,
): { itemKey: string; rawValue: number }[] {
  return Object.entries(VALUE_MAP).flatMap(([code, itemKeys]) =>
    itemKeys.map((itemKey) => ({ itemKey, rawValue: valueMeans[code] ?? 0 })),
  );
}

describe("QUAL-05: TwIVI MRAT fixture (all-equal → every HOV ≈ 0)", () => {
  test("the seeded maps cover all 10 basic values × 2 items (20) and 4 HOV", () => {
    expect(Object.keys(VALUE_MAP)).toHaveLength(10);
    expect(ALL_ITEM_KEYS).toHaveLength(20);
    expect(Object.keys(HOV_MAP)).toHaveLength(4);
    // hov_map is a non-overlapping partition of all 10 basic values.
    const partition = Object.values(HOV_MAP).flat();
    expect(partition).toHaveLength(10);
    expect(new Set(partition)).toEqual(new Set(Object.keys(VALUE_MAP)));
  });

  test.each([1, 3.5, 4, 6])(
    "all responses = %s → MRAT = k and every HOV centered ≈ 0 (no winner)",
    (k) => {
      const { mrat, values, higherOrder } = computeMratScores(
        flatVector({}, k),
        VALUE_MAP,
        HOV_MAP,
      );
      expect(mrat).toBeCloseTo(k, 12);
      // every value-level centered ≈ 0
      for (const v of values) expect(Math.abs(v.centered)).toBeLessThan(EPSILON);
      // every HOV centered ≈ 0 → all 4 bands MEDIO (QUAL-05: no winner).
      // El caso degenerado sobrevive intacto a ADR-036: perfil plano ⇒ SD
      // intra-perfil 0 ⇒ computeIpsativeBands devuelve MEDIO por su guarda,
      // exactamente donde bandFromMrat devolvia MEDIO por su epsilon.
      expect(higherOrder).toHaveLength(4);
      const bands = pipelineBands(higherOrder);
      for (const h of higherOrder) {
        expect(Math.abs(h.centered)).toBeLessThan(EPSILON);
        expect(bands[h.code]).toBe("MEDIO");
      }
    },
  );

  test("spike: Self-Direction high (SD=6, rest=1) → OCH positive, others negative; HOV rollup is mean", () => {
    const { mrat, values, higherOrder } = computeMratScores(
      flatVector({ SD1: 6, SD2: 6 }, 1),
      VALUE_MAP,
      HOV_MAP,
    );
    // MRAT = (6+6 + 18×1) / 20 = 30/20 = 1.5
    expect(mrat).toBeCloseTo(1.5, 12);

    const byCode = Object.fromEntries(values.map((v) => [v.code, v.centered]));
    // SD raw = 6 → centered = 6 − 1.5 = 4.5 (the only positive value)
    expect(byCode.SD).toBeCloseTo(4.5, 12);
    // every other value raw = 1 → centered = 1 − 1.5 = −0.5
    for (const code of Object.keys(VALUE_MAP)) {
      if (code === "SD") continue;
      expect(byCode[code]).toBeCloseTo(-0.5, 12);
    }

    const hov = Object.fromEntries(higherOrder.map((h) => [h.code, h.centered]));
    const bands = pipelineBands(higherOrder);
    // OCH = mean(centered SD, ST, HE) = mean(4.5, −0.5, −0.5) = 1.1666...
    expect(hov.OCH).toBeCloseTo((4.5 - 0.5 - 0.5) / 3, 12);
    expect(hov.OCH).toBeGreaterThan(0);
    expect(bands.OCH).toBe("ALTO");
    // The 3 HOV with no spike are all negative (mean of −0.5s) — but under
    // ADR-036 they band MEDIO, not BAJO. Centrados {1.1667, −0.5, −0.5, −0.5}:
    // mean −0.0833, SD 0.7217 ⇒ z = +1.73 for the spike and −0.58 for each of
    // the other three, which does NOT clear the −1.0 cut. Con 4 dimensiones un
    // pico solitario infla la SD y comprime el resto hacia el centro: es la
    // contracara de que MEDIO vuelva a ser alcanzable. Bajo la regla de signo
    // los tres eran BAJO por estar apenas −0.5 debajo del propio promedio.
    for (const code of ["SEN", "CSV", "STR"]) {
      expect(hov[code]).toBeCloseTo(-0.5, 12);
      expect(bands[code]).toBe("MEDIO");
      expect(bandFromMrat(hov[code])).toBe("BAJO"); // la regla retirada
    }
    // HOV rollup is MEAN, not sum: SEN (2 values) and CSV (3 values) both = −0.5
    // despite different member counts — sum would have made them incomparable.
    expect(hov.SEN).toBeCloseTo(hov.CSV, 12);
  });
});

/**
 * ADR-036 — una sola definicion de banda.
 *
 * Fixture REAL: el `scores_by_dim` de la snapshot de prod `96fe99d5`, la corrida
 * del deploy-smoke de PR #24 donde el reporte de Valores se contradijo consigo
 * mismo en la misma pagina (la tabla sr-only del circulo decia "Destacar →
 * Medio" y la narrativa de esa misma dimension decia que pesa MENOS).
 *
 * SEN es el pivote: es la dimension donde las dos reglas discrepan. Ese
 * desacuerdo es lo que este bloque fija — no basta con que las bandas nuevas
 * sean las esperadas, hay que dejar escrito CUAL era la vieja, para que un
 * "cleanup" futuro que reponga bandFromMrat en el pipeline falle ruidosamente.
 */
describe("ADR-036: banda del pipeline = z intra-perfil sobre los 4 HOV", () => {
  /** scores_by_dim verbatim de la snapshot 96fe99d5 (medias por valor). */
  const PROD_VALUE_MEANS: Record<string, number> = {
    AC: 4, BE: 4, CO: 2, HE: 6, PO: 3,
    SD: 6, SE: 3, ST: 6, TR: 2, UN: 4,
  };

  function prodScores() {
    return computeMratScores(
      flatFromValueMeans(PROD_VALUE_MEANS),
      VALUE_MAP,
      HOV_MAP,
    );
  }

  test("la aritmetica de la snapshot: MRAT 4.0 y los 4 centrados", () => {
    const { mrat, higherOrder } = prodScores();
    const hov = Object.fromEntries(higherOrder.map((h) => [h.code, h.centered]));

    // MRAT = media del vector plano de 20 items = media de las 10 medias de
    // valor (2 items por valor) = 40/10.
    expect(mrat).toBeCloseTo(4.0, 12);
    expect(hov.OCH).toBeCloseTo(2.0, 12); // (6+6+6)/3 − 4
    expect(hov.SEN).toBeCloseTo(-0.5, 12); // (4+3)/2 − 4
    expect(hov.CSV).toBeCloseTo(-5 / 3, 12); // (3+2+2)/3 − 4
    expect(hov.STR).toBeCloseTo(0.0, 12); // (4+4)/2 − 4
  });

  test("las 4 bandas: ALTO / MEDIO / BAJO / MEDIO", () => {
    const bands = pipelineBands(prodScores().higherOrder);

    // z = +1.54 / −0.35 / −1.23 / +0.03 (media −0.0417, SD 1.3248).
    expect(bands.OCH).toBe("ALTO");
    expect(bands.SEN).toBe("MEDIO");
    expect(bands.CSV).toBe("BAJO");
    expect(bands.STR).toBe("MEDIO");
  });

  test("[EL DELTA] SEN pasa de BAJO a MEDIO: la snapshot de prod guardo BAJO", () => {
    const { higherOrder } = prodScores();
    const hov = Object.fromEntries(higherOrder.map((h) => [h.code, h.centered]));

    // Lo que el pipeline escribio en prod: signo negativo ⇒ BAJO, aunque la
    // desviacion sea de media unidad respecto del propio promedio.
    expect(bandFromMrat(hov.SEN)).toBe("BAJO");
    // Lo que escribe desde ADR-036: |z| = 0.35 no alcanza el corte de 1.0.
    expect(pipelineBands(higherOrder).SEN).toBe("MEDIO");
  });

  test("MEDIO es alcanzable sin empatar el MRAT (las 12 narrativas viven)", () => {
    const bands = pipelineBands(prodScores().higherOrder);
    const hov = Object.fromEntries(
      prodScores().higherOrder.map((h) => [h.code, h.centered]),
    );

    // El corolario duro del ADR: con el test de signo, MEDIO exigia centrado
    // exactamente 0 (±1e-9), asi que las 4 narrativas MEDIO del seed (4 HOV × 3
    // bandas = 12) eran contenido muerto. Aqui SEN sale MEDIO con centrado −0.5,
    // bien lejos de cero: la banda ya no depende de una coincidencia aritmetica.
    expect(bands.SEN).toBe("MEDIO");
    expect(Math.abs(hov.SEN)).toBeGreaterThan(0.1);
  });
});
