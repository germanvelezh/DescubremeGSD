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

/** Perfil totalmente plano (QUAL-05): todo centrado = 0, SD intra-perfil = 0. */
const FLAT_SCORES: Record<string, number> = Object.fromEntries(
  Object.keys(SPREAD_SCORES).map((code) => [code, 4]),
);

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
    const result = projectCircumplexDimensions(family, SPREAD_SCORES);

    expect(result).toHaveLength(family.hovAxisOrder?.length ?? 0);
    expect(result).toHaveLength(4);
    expect(result.map((d) => d.code)).toEqual(family.hovAxisOrder);
  });

  test("[invariante] los opuestos caen enfrentados (0 vs 2, 1 vs 3) y los vecinos cardinales son adyacentes", () => {
    const family = circumplexFamily(SPREAD_SCORES);
    const codes = projectCircumplexDimensions(family, SPREAD_SCORES).map(
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
    const result = projectCircumplexDimensions(family, SPREAD_SCORES);

    for (const dim of result) {
      expect(dim.label).toBe(family.hovLabels?.[dim.code]);
      expect(dim.label).not.toBe(dim.code);
    }
  });

  test("[firmado] las 4 etiquetas de Cowork, en su posicion de eje (arriba/derecha/abajo/izquierda)", () => {
    const family = circumplexFamily(SPREAD_SCORES);
    const byCode = Object.fromEntries(
      projectCircumplexDimensions(family, SPREAD_SCORES).map((d) => [
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

describe("projectCircumplexDimensions — centrado por MRAT", () => {
  test("los radios son valores centrados, con negativos, no las medias crudas", () => {
    const family = circumplexFamily(SPREAD_SCORES);
    const byCode = Object.fromEntries(
      projectCircumplexDimensions(family, SPREAD_SCORES).map((d) => [
        d.code,
        d.value,
      ]),
    );

    // MRAT = 3.2 sobre las 10 medias de valor.
    expect(byCode.OCH).toBeCloseTo(2.8, 10);
    expect(byCode.STR).toBeCloseTo(-0.2, 10);
    expect(byCode.CSV).toBeCloseTo(-1.2, 10);
    expect(byCode.SEN).toBeCloseTo(-2.2, 10);

    // Regresion del defecto 2: una media cruda vive en 1..6 y JAMAS es negativa.
    // Que haya al menos un radio negativo prueba que el centrado ocurrio.
    const values = Object.values(byCode);
    expect(values.some((v) => v < 0)).toBe(true);
    expect(byCode.OCH).not.toBe(6);
  });

  test("las bandas se recalculan sobre los 4 centrados, no se heredan de los 10 valores", () => {
    const family = circumplexFamily(SPREAD_SCORES);
    const byCode = Object.fromEntries(
      projectCircumplexDimensions(family, SPREAD_SCORES).map((d) => [
        d.code,
        d.band,
      ]),
    );

    // z sobre {2.8, -0.2, -1.2, -2.2}: media -0.2, SD 1.8708 (poblacional).
    expect(byCode.OCH).toBe("ALTO"); // z = +1.60
    expect(byCode.STR).toBe("MEDIO"); // z =  0.00
    expect(byCode.CSV).toBe("MEDIO"); // z = -0.53
    expect(byCode.SEN).toBe("BAJO"); // z = -1.07
  });

  test("[QUAL-05] perfil plano: todos los radios en 0 y todas las bandas MEDIO", () => {
    const family = circumplexFamily(FLAT_SCORES);
    const result = projectCircumplexDimensions(family, FLAT_SCORES);

    expect(result).toHaveLength(4);
    for (const dim of result) {
      expect(dim.value).toBe(0);
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

    const codes = projectCircumplexDimensions(family, SPREAD_SCORES).map(
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
