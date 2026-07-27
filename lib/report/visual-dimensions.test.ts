/**
 * visual-dimensions tests — proyeccion del payload al contrato VisualProps.
 *
 * Pinean los TRES defectos que la corrida A1 (prod, 2026-07-23) encontro en el
 * ValueCircle, mas la inversion de banda que el fix de etiquetas destapo:
 *   1. CANTIDAD  — los 10 valores llegaban a un visual de 4 sectores (i % 4).
 *   2. CENTRADO  — medias crudas (siempre positivas) a un radio que se mide
 *                  desde el MRAT y puede ser NEGATIVO (de ahi la estrella).
 *   3. ETIQUETAS — codigos psicometricos crudos en pantalla.
 *   4. BANDA     — etiqueta reencuadrada (invertBand) junto a la banda cruda.
 *
 * Y el quinto, de ADR-036: el circumplejo RECALCULABA su banda en vez de leer la
 * del payload, asi que el circulo y la narrativa de la misma dimension podian
 * decir cosas distintas. Ahora las dos proyecciones leen `bands_by_dim`.
 *
 * NOTA (FOUND-05): este archivo vive bajo lib/report (ESCANEADO). Los codigos
 * que aparecen abajo son codigos de DIMENSION (datos de entrada del test), no
 * codigos de INSTRUMENTO — que es lo unico que matchea el gate. Ningun
 * instrumento se nombra fuera de comentarios.
 *
 * El orden de los HOV NO se pinea como lista literal: se valida contra la
 * invariante del circumplejo declarada en `family.adjacency` (los opuestos van
 * enfrentados). Un test que repitiera la lista pasaria con cualquier orden que
 * alguien escribiera en el dato.
 */
import { describe, expect, test } from "vitest";

import type { IpsativeBand } from "@/lib/scoring/ipsative";
import type { RevealFamily } from "@/lib/i18n/microcopy/es-CO/reveal-phrases";
import { selectFamily } from "@/lib/report/reveal-composer";
import {
  projectBarsDimensions,
  projectCircumplexDimensions,
} from "@/lib/report/visual-dimensions";

/**
 * Perfil con las 4 direcciones bien separadas. Medias por direccion: 6 / 3 / 2 / 1
 * MRAT = 32/10 = 3.2  =>  centrados: +2.8 / -0.2 / -1.2 / -2.2
 */
const SPREAD_SCORES: Record<string, number> = {
  SD: 6,
  ST: 6,
  HE: 6,
  BE: 3,
  UN: 3,
  SE: 2,
  CO: 2,
  TR: 2,
  AC: 1,
  PO: 1,
};

/**
 * Bandas del payload para SPREAD_SCORES: las que el scoring persiste bajo
 * ADR-036 (z intra-perfil sobre los 4 HOV centrados {+2.8, −0.2, −1.2, −2.2}:
 * media −0.2, SD 1.8708 ⇒ z +1.60 / 0.00 / −0.53 / −1.07).
 */
const SPREAD_BANDS: Record<string, IpsativeBand> = {
  OCH: "ALTO",
  STR: "MEDIO",
  CSV: "MEDIO",
  SEN: "BAJO",
};

/** Perfil totalmente plano (QUAL-05): todo centrado = 0, SD intra-perfil = 0. */
const FLAT_SCORES: Record<string, number> = Object.fromEntries(
  Object.keys(SPREAD_SCORES).map((code) => [code, 4]),
);

/** Bandas de un perfil plano: el scoring devuelve MEDIO en las 4 (SD = 0). */
const FLAT_BANDS: Record<string, IpsativeBand> = {
  OCH: "MEDIO",
  STR: "MEDIO",
  CSV: "MEDIO",
  SEN: "MEDIO",
};

/**
 * Perfil CASI-PAREJO (firma Cowork 2026-07-24): medias HOV 4.0/4.1/3.9/4.05
 * (spread crudo 0.2). Fixture durable que blinda la decision del radio (ADR-034):
 * la escala FIJA lo dibuja casi-circulo (proporciones ~0.58-0.62, spread ~0.04);
 * un min-max POR PERFIL lo estiraria a [0,1] (spread 1.0) — una estrella dramatica
 * de un perfil casi identico. Este test falla si alguien vuelve a min-max.
 */
const NEAR_EQUAL_SCORES: Record<string, number> = {
  SD: 4.0, ST: 4.0, HE: 4.0, // OCH = 4.0
  BE: 4.1, UN: 4.1, // STR = 4.1
  SE: 3.9, CO: 3.9, TR: 3.9, // CSV = 3.9
  AC: 4.05, PO: 4.05, // SEN = 4.05
};

function circumplexFamily(scores: Record<string, number>): RevealFamily {
  const family = selectFamily("circumplex", scores);
  if (!family) throw new Error("no hay familia circumplex registrada");
  return family;
}

/** Los dos HOV de un par declarado como adyacente en el circumplejo. */
function isAdjacent(family: RevealFamily, a: string, b: string): boolean {
  return (family.adjacency ?? []).some(
    (pair) => pair.hovs.includes(a) && pair.hovs.includes(b),
  );
}

describe("projectCircumplexDimensions — cantidad y orden de eje", () => {
  test("devuelve exactamente 4 sectores, uno por direccion declarada", () => {
    const family = circumplexFamily(SPREAD_SCORES);
    const result = projectCircumplexDimensions(family, SPREAD_SCORES, SPREAD_BANDS);

    expect(result).toHaveLength(family.hovAxisOrder?.length ?? 0);
    expect(result).toHaveLength(4);
    expect(result.map((d) => d.code)).toEqual(family.hovAxisOrder);
  });

  test("[invariante] los opuestos caen enfrentados (0 vs 2, 1 vs 3) y los vecinos cardinales son adyacentes", () => {
    const family = circumplexFamily(SPREAD_SCORES);
    const codes = projectCircumplexDimensions(family, SPREAD_SCORES, SPREAD_BANDS).map(
      (d) => d.code,
    );
    const [top, right, bottom, left] = codes as [string, string, string, string];

    // Enfrentados = NO adyacentes. Si un opuesto quedara en un indice vecino,
    // el dibujo pondria lado a lado los polos que se oponen.
    expect(isAdjacent(family, top, bottom)).toBe(false);
    expect(isAdjacent(family, right, left)).toBe(false);

    // Y los cuatro vecinos del circulo si deben ser pares adyacentes.
    expect(isAdjacent(family, top, right)).toBe(true);
    expect(isAdjacent(family, right, bottom)).toBe(true);
    expect(isAdjacent(family, bottom, left)).toBe(true);
    expect(isAdjacent(family, left, top)).toBe(true);
  });

  test("rotula con las etiquetas es-CO de la familia, nunca con el codigo", () => {
    const family = circumplexFamily(SPREAD_SCORES);
    const result = projectCircumplexDimensions(family, SPREAD_SCORES, SPREAD_BANDS);

    for (const dim of result) {
      expect(dim.label).toBe(family.hovLabels?.[dim.code]);
      expect(dim.label).not.toBe(dim.code);
    }
  });

  test("[firmado] las 4 etiquetas de Cowork, en su posicion de eje (arriba/derecha/abajo/izquierda)", () => {
    const family = circumplexFamily(SPREAD_SCORES);
    const byCode = Object.fromEntries(
      projectCircumplexDimensions(family, SPREAD_SCORES, SPREAD_BANDS).map((d) => [
        d.code,
        d.label,
      ]),
    );

    // Copy firmado por Cowork 2026-07-23. Los dos del eje HORIZONTAL
    // (derecha/izquierda) son los mas cortos a proposito: ahi hay menos espacio.
    expect(byCode.OCH).toBe("Explorar"); // arriba
    expect(byCode.STR).toBe("Aportar"); // derecha (eje horizontal)
    expect(byCode.CSV).toBe("Conservar"); // abajo
    expect(byCode.SEN).toBe("Destacar"); // izquierda (eje horizontal)
  });
});

describe("projectCircumplexDimensions — radio por escala fija (ADR-034)", () => {
  test("el radio es una proporcion [0,1] de la media HOV CRUDA, nunca el centrado ni un negativo", () => {
    const family = circumplexFamily(SPREAD_SCORES);
    const byCode = Object.fromEntries(
      projectCircumplexDimensions(family, SPREAD_SCORES, SPREAD_BANDS).map((d) => [
        d.code,
        d.value,
      ]),
    );

    // Escala fija TwIVI [1,6]. Medias HOV crudas: OCH 6 / STR 3 / CSV 2 / SEN 1.
    // Proporcion = (media - 1) / (6 - 1).
    expect(byCode.OCH).toBeCloseTo(1.0, 10); // (6-1)/5
    expect(byCode.STR).toBeCloseTo(0.4, 10); // (3-1)/5
    expect(byCode.CSV).toBeCloseTo(0.2, 10); // (2-1)/5
    expect(byCode.SEN).toBeCloseTo(0.0, 10); // (1-1)/5 — piso de escala

    // Regresion del defecto que colapsaba a aguja: el radio ya NO es el centrado
    // por MRAT (que valia +2.8 y metia negativos). Nunca negativo, siempre [0,1].
    const values = Object.values(byCode);
    expect(values.every((v) => v >= 0 && v <= 1)).toBe(true);
    expect(byCode.OCH).not.toBeCloseTo(2.8, 5); // el viejo valor centrado

    // Orden preservado (media cruda es monotona con el centrado): OCH > STR >
    // CSV > SEN. El "nunca cero" del RADIO lo garantiza el piso del componente
    // (radiusOf), no la proyeccion: aqui SEN puede valer 0 (piso de escala).
    expect(byCode.OCH).toBeGreaterThan(byCode.STR);
    expect(byCode.STR).toBeGreaterThan(byCode.CSV);
    expect(byCode.CSV).toBeGreaterThan(byCode.SEN);
  });

  test("la banda sale del payload, y la mas alta cae en el radio mas largo", () => {
    const family = circumplexFamily(SPREAD_SCORES);
    const byCode = Object.fromEntries(
      projectCircumplexDimensions(family, SPREAD_SCORES, SPREAD_BANDS).map((d) => [
        d.code,
        d.band,
      ]),
    );

    // Banda y radio siguen coherentes: el scoring bandea por z sobre los mismos
    // 4 HOV centrados y el centrado es un shift constante, asi que el orden de
    // banda y el de radio no se pueden cruzar. OCH lleva el radio mas largo (1.0)
    // y la banda mas alta; SEN el mas corto (0.0) y la mas baja.
    expect(byCode).toEqual(SPREAD_BANDS);
    expect(byCode.OCH).toBe("ALTO");
    expect(byCode.SEN).toBe("BAJO");
  });

  test("[casi-parejo / anti-min-max] spread crudo 0.2 → proporciones casi iguales, NO estiradas a [0,1]", () => {
    const family = circumplexFamily(NEAR_EQUAL_SCORES);
    const values = projectCircumplexDimensions(family, NEAR_EQUAL_SCORES, SPREAD_BANDS).map(
      (d) => d.value,
    );

    // Escala fija: (media-1)/5 → ~0.58-0.62. Spread proporcional al crudo (0.04),
    // no al rango completo. Un min-max por perfil daria min=0, max=1, spread=1.
    const spread = Math.max(...values) - Math.min(...values);
    expect(spread).toBeCloseTo(0.04, 6);
    expect(spread).toBeLessThan(0.1);
    // La firma anti-min-max: NINGUNA proporcion toca los extremos 0 o 1 (min-max
    // SIEMPRE fuerza un 0 y un 1). Aqui todas viven en el centro de la escala.
    expect(Math.min(...values)).toBeGreaterThan(0.5);
    expect(Math.max(...values)).toBeLessThan(0.7);
  });

  test("[QUAL-05] perfil plano: radios iguales (no aguja) y todas las bandas MEDIO", () => {
    const family = circumplexFamily(FLAT_SCORES);
    const result = projectCircumplexDimensions(family, FLAT_SCORES, FLAT_BANDS);

    expect(result).toHaveLength(4);
    // Todas las medias crudas valen 4 => misma proporcion (4-1)/5 = 0.6: 4 radios
    // iguales, sin aguja. Y el scoring persiste MEDIO en las 4 (SD intra-perfil
    // 0 => guarda degenerada de computeIpsativeBands), que es lo que se lee.
    for (const dim of result) {
      expect(dim.value).toBeCloseTo(0.6, 10);
      expect(dim.band).toBe("MEDIO");
    }
  });
});

describe("projectCircumplexDimensions — la banda se LEE, no se recalcula (ADR-036)", () => {
  /**
   * Sonda deliberadamente IMPOSIBLE: ninguna regla de banda sobre SPREAD_SCORES
   * produciria este mapa (pone ALTO en la direccion del radio mas corto). Si la
   * proyeccion volviera a calcular su propia banda, lo ignoraria y devolveria
   * SPREAD_BANDS. Es la unica forma de distinguir "leyo el payload" de "calculo
   * lo mismo por casualidad".
   */
  const PROBE_BANDS: Record<string, IpsativeBand> = {
    OCH: "BAJO",
    STR: "ALTO",
    CSV: "ALTO",
    SEN: "ALTO",
  };

  test("[REGRESION] devuelve la banda del payload aunque contradiga cualquier recalculo", () => {
    const family = circumplexFamily(SPREAD_SCORES);
    const byCode = Object.fromEntries(
      projectCircumplexDimensions(family, SPREAD_SCORES, PROBE_BANDS).map((d) => [
        d.code,
        d.band,
      ]),
    );

    // El defecto que ADR-036 cierra: el circulo bandeaba por su cuenta y su
    // tabla sr-only contradecia a la narrativa, que sale de bands_by_dim.
    expect(byCode).toEqual(PROBE_BANDS);
    expect(byCode.OCH).not.toBe(SPREAD_BANDS.OCH);
  });

  test("una dimension ausente del payload degrada a MEDIO, no revienta", () => {
    const family = circumplexFamily(SPREAD_SCORES);
    const result = projectCircumplexDimensions(family, SPREAD_SCORES, {
      OCH: "ALTO",
    });

    // Mismo contrato que projectBarsDimensions: el visual recibe SIEMPRE los 4
    // sectores del eje. Una banda faltante es un payload mal formado, no un
    // sector que desaparece del dibujo.
    expect(result).toHaveLength(4);
    expect(result.find((d) => d.code === "OCH")?.band).toBe("ALTO");
    for (const dim of result.filter((d) => d.code !== "OCH")) {
      expect(dim.band).toBe("MEDIO");
    }
  });
});

describe("projectCircumplexDimensions — regresion del bug de prod", () => {
  test("[REGRESION] con 10 dimensiones de entrada el visual sigue recibiendo 4, y ninguna es un codigo de valor", () => {
    const family = circumplexFamily(SPREAD_SCORES);

    // Precondicion: la entrada trae las 10 dimensiones que rompian el visual.
    expect(Object.keys(SPREAD_SCORES)).toHaveLength(10);
    expect(family.dimCodes).toHaveLength(10);
    for (const valueCode of family.dimCodes) {
      expect(SPREAD_SCORES).toHaveProperty(valueCode);
    }

    const codes = projectCircumplexDimensions(family, SPREAD_SCORES, SPREAD_BANDS).map(
      (d) => d.code,
    );

    // El visual define 4 angulos cardinales y reparte con `i % 4`: cualquier
    // largo > 4 apila etiquetas (era 10 en 4 posiciones, corrida A1).
    expect(codes).toHaveLength(4);
    for (const valueCode of family.dimCodes) {
      expect(codes).not.toContain(valueCode);
    }
  });
});

describe("projectBarsDimensions — etiquetas y banda reencuadrada", () => {
  // Perfil verbatim de la corrida A1 en prod.
  const BARS_SCORES: Record<string, number> = {
    EXT: 12,
    AGR: 18,
    CON: 19,
    NEG: 30,
    OPN: 22,
  };
  const BARS_BANDS: Record<string, IpsativeBand> = {
    EXT: "BAJO",
    AGR: "MEDIO",
    CON: "MEDIO",
    NEG: "ALTO",
    OPN: "MEDIO",
  };
  const BARS_DIMS = Object.keys(BARS_SCORES);

  function project(): Record<string, { label: string; band: IpsativeBand }> {
    const family = selectFamily("bars", BARS_SCORES);
    return Object.fromEntries(
      projectBarsDimensions(family, BARS_DIMS, BARS_SCORES, BARS_BANDS).map(
        (d) => [d.code, { label: d.label, band: d.band }],
      ),
    );
  }

  test("reemplaza el codigo psicometrico por la etiqueta es-CO firmada", () => {
    const byCode = project();

    expect(byCode.EXT?.label).toBe("Energía social");
    expect(byCode.OPN?.label).toBe("Curiosidad");
    for (const dim of BARS_DIMS) {
      expect(byCode[dim]?.label).not.toBe(dim);
    }
  });

  test("banda sin reencuadre: pasa tal cual", () => {
    const byCode = project();

    expect(byCode.EXT?.band).toBe("BAJO");
    expect(byCode.AGR?.band).toBe("MEDIO");
  });

  test("[reencuadre] la dimension cuya etiqueta es el inverso del constructo voltea la banda", () => {
    const byCode = project();

    // La dimension puntua reactividad emocional; su etiqueta firmada es el
    // inverso ("Calma", invertBand). Banda cruda ALTO => la persona reporta
    // ALTA reactividad => poca calma => la barra debe leer BAJO. Mostrar
    // "Calma · Alto" seria afirmar lo contrario de lo respondido, y la banda es
    // la senal primaria no-cromatica del visual (texto + <desc> + tabla sr-only).
    expect(byCode.NEG?.label).toBe("Calma");
    expect(BARS_BANDS.NEG).toBe("ALTO");
    expect(byCode.NEG?.band).toBe("BAJO");
  });

  // Perfil de bienestar verbatim de la corrida A1 (9 dimensiones).
  const PERMA_SCORES: Record<string, number> = {
    P: 3,
    E: 4,
    R: 6,
    M: 4,
    A: 3,
    N: 7,
    H: 5,
    Lon: 6,
    hap: 4,
  };
  // Bandas del baremo (server-side). N/Lon en convencion INVERTIDA: ALTO = mucho
  // de eso = extremo de cuidado. Aqui N=ALTO deliberadamente.
  const PERMA_BANDS: Record<string, IpsativeBand> = {
    P: "BAJO",
    E: "BAJO",
    R: "MEDIO",
    M: "BAJO",
    A: "BAJO",
    N: "ALTO",
    H: "MEDIO",
    Lon: "MEDIO",
    hap: "BAJO",
  };

  function projectPerma(): Record<
    string,
    { label: string; band: IpsativeBand }
  > {
    const family = selectFamily("bars", PERMA_SCORES);
    return Object.fromEntries(
      projectBarsDimensions(
        family,
        Object.keys(PERMA_SCORES),
        PERMA_SCORES,
        PERMA_BANDS,
      ).map((d) => [d.code, { label: d.label, band: d.band }]),
    );
  }

  test("[firmado] rotula las 9 dimensiones de bienestar con el copy de Cowork", () => {
    const byCode = projectPerma();

    expect(byCode.P?.label).toBe("Emociones positivas");
    expect(byCode.E?.label).toBe("Involucramiento");
    expect(byCode.R?.label).toBe("Relaciones");
    expect(byCode.M?.label).toBe("Propósito");
    expect(byCode.A?.label).toBe("Logro");
    expect(byCode.H?.label).toBe("Salud");
    expect(byCode.hap?.label).toBe("Felicidad");
    expect(byCode.N?.label).toBe("Emociones difíciles");
    expect(byCode.Lon?.label).toBe("Soledad");

    for (const dim of Object.keys(PERMA_SCORES)) {
      expect(byCode[dim]?.label).not.toBe(dim);
    }
  });

  test("[no-doble-flip] N y Lon conservan su banda cruda — nunca se voltean como NEG de BFI", () => {
    const byCode = projectPerma();

    // La banda de N/Lon ya viene invertida del baremo (ALTO = extremo de cuidado
    // que enciende la contencion). Un flip en el display seria un DOBLE flip:
    // "Emociones dificiles · Alto" DEBE quedar Alto, no voltearse a Bajo.
    expect(PERMA_BANDS.N).toBe("ALTO");
    expect(byCode.N?.band).toBe("ALTO");
    expect(byCode.Lon?.band).toBe(PERMA_BANDS.Lon);

    // Y las positivas tambien pasan crudas.
    expect(byCode.P?.band).toBe("BAJO");
    expect(byCode.R?.band).toBe("MEDIO");
  });

  test("sin familia resuelta degrada al codigo y respeta la banda cruda", () => {
    const result = projectBarsDimensions(
      null,
      BARS_DIMS,
      BARS_SCORES,
      BARS_BANDS,
    );

    for (const dim of result) {
      expect(dim.label).toBe(dim.code);
      expect(dim.band).toBe(BARS_BANDS[dim.code]);
    }
  });
});
