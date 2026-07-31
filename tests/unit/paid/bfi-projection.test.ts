/**
 * D-10 — las dos funciones PURAS de la proyeccion (Plan 03-04 Task 3).
 *
 * Valores sinteticos, sin base de datos y sin mocks del builder de Supabase:
 * lo que se ejerce aca es la ARITMETICA de conjuntos que decide cuantos items
 * responde el usuario. El cableado contra la base vive en
 * tests/integration/paid-projection.test.ts, que es donde puede fallar de
 * verdad.
 *
 * El caso que mas importa de este archivo no es el feliz: es el de la LLAVE
 * AUSENTE. Si el instrumento destino tuviera `item_code` nulo, la proyeccion
 * devolveria los 60 y el reuso desapareceria SIN error — un usuario que pago
 * respondiendo otra vez 30 preguntas que ya respondio. Aca queda afirmado con
 * diagnostico explicito.
 *
 * Anchors:
 *   - lib/paid/projection.ts.
 *   - 03-04-PLAN.md Task 3 behavior.
 */
import { describe, expect, test } from "vitest";

import {
  projectAnsweredResponses,
  resolveMissingItemCodes,
} from "@/lib/paid/projection";

/** Los 60 codigos del destino, en el espacio canonico del 60. */
const TARGET_CODES = Array.from(
  { length: 60 },
  (_, i) => `BFI-2-60-${i + 1}`,
);

/**
 * Los 30 que el BFI-2-S aporta: INTERCALADOS, no un prefijo. Es la forma real
 * del subconjunto (ver db/seeds/instruments/BFI-2-S/items.sql) y es la que hace
 * que el caso sea representativo en vez de comodo.
 */
const ANSWERED_30 = [
  1, 2, 3, 4, 5, 7, 12, 16, 20, 21, 23, 24, 26, 28, 29, 30, 33, 34, 37, 40, 41,
  43, 47, 51, 53, 54, 55, 57, 59, 60,
].map((n) => `BFI-2-60-${n}`);

describe("resolveMissingItemCodes — cuantos items responde el usuario", () => {
  test("con 60 codigos y 30 ya respondidos devuelve los 30 faltantes", () => {
    const missing = resolveMissingItemCodes(TARGET_CODES, ANSWERED_30);
    expect(missing).toHaveLength(30);
    // Ni uno solo de los faltantes puede estar entre los respondidos.
    const answered = new Set(ANSWERED_30);
    for (const code of missing) expect(answered.has(code as string)).toBe(false);
  });

  test("los devuelve EN EL ORDEN del instrumento nuevo", () => {
    const missing = resolveMissingItemCodes(TARGET_CODES, ANSWERED_30);
    const positions = missing.map((c) => TARGET_CODES.indexOf(c as string));
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
    // El primer faltante es el 6: el 1..5 los cubre el BFI-2-S.
    expect(missing[0]).toBe("BFI-2-60-6");
  });

  test("con 0 respondidos devuelve los 60 — el estado frio", () => {
    expect(resolveMissingItemCodes(TARGET_CODES, [])).toHaveLength(60);
  });

  test("los codigos respondidos que NO existen en el destino se ignoran sin lanzar", () => {
    // El caso D-11: TwIVI -> PVQ-RR no comparte espacio de codigos. La respuesta
    // correcta es "responde el instrumento completo", no un error.
    const missing = resolveMissingItemCodes(TARGET_CODES, [
      "PVQ-RR-1",
      "OTRO-99",
    ]);
    expect(missing).toHaveLength(60);
  });

  test("con la lista del destino VACIA devuelve vacio y no lanza", () => {
    expect(resolveMissingItemCodes([], ANSWERED_30)).toEqual([]);
  });

  test("[FALLO SILENCIOSO] si el destino tiene item_code nulo, NADA se reusa", () => {
    // Esta es la asercion que convierte el modo de fallo de D-10 en algo
    // visible. Un seed que olvide poblar `item_code` no rompe nada: el usuario
    // simplemente responde 60 items en vez de 30, en verde, sin un solo log.
    const targetWithoutKey = Array.from({ length: 60 }, () => null);
    const missing = resolveMissingItemCodes(targetWithoutKey, ANSWERED_30);
    expect(
      missing,
      "Sin `item_code` en el destino la proyeccion devuelve el instrumento COMPLETO: el reuso de D-10 desaparece en silencio. Si esta asercion se cae, revisa el seed antes que la funcion.",
    ).toHaveLength(60);
  });

  test("un codigo respondido vacio o nulo nunca cuenta como respuesta", () => {
    // Los instrumentos del Free (O*NET, TwIVI, PERMA) traen `item_code` nulo.
    // Si `null` pudiera ser llave, todas sus respuestas colapsarian en una.
    const missing = resolveMissingItemCodes(TARGET_CODES, [
      "",
      null as unknown as string,
      undefined as unknown as string,
    ]);
    expect(missing).toHaveLength(60);
  });
});

describe("projectAnsweredResponses — que filas se escriben", () => {
  const targetItems = TARGET_CODES.map((code, i) => ({
    id: `item-${i + 1}`,
    itemCode: code,
  }));

  test("arrastra el raw_value, no solo marca la pregunta como vista", () => {
    // Es LA decision del modulo: el scorer del BFI-2-60 suma 12 items por
    // dominio, asi que sin los valores el puntaje seria sobre medio
    // instrumento presentado como completo.
    const answered = new Map(ANSWERED_30.map((c, i) => [c, (i % 5) + 1]));
    const rows = projectAnsweredResponses(targetItems, answered);

    expect(rows).toHaveLength(30);
    for (const row of rows) {
      expect(typeof row.rawValue).toBe("number");
      expect(row.rawValue).toBeGreaterThanOrEqual(1);
    }
    // Emparejamiento uno a uno POR CODIGO, no por posicion.
    const idByCode = new Map(targetItems.map((it) => [it.itemCode, it.id]));
    for (const [code, value] of answered) {
      const row = rows.find((r) => r.itemId === idByCode.get(code));
      expect(row, `falta la fila del codigo ${code}`).toBeDefined();
      expect(row?.rawValue).toBe(value);
    }
  });

  test("un item del destino SIN item_code nunca recibe una fila", () => {
    const mixed = [
      { id: "sin-llave", itemCode: null },
      { id: "con-llave", itemCode: "BFI-2-60-1" },
    ];
    const rows = projectAnsweredResponses(
      mixed,
      new Map([["BFI-2-60-1", 4]]),
    );
    expect(rows).toEqual([{ itemId: "con-llave", rawValue: 4 }]);
  });

  test("sin respuestas previas no escribe nada — el estado frio no falla", () => {
    expect(projectAnsweredResponses(targetItems, new Map())).toEqual([]);
  });

  test("un destino vacio no escribe nada y no lanza", () => {
    expect(
      projectAnsweredResponses([], new Map([["BFI-2-60-1", 4]])),
    ).toEqual([]);
  });

  test("[complemento] proyectadas + faltantes = el instrumento entero", () => {
    // La invariante que sostiene "responde 30, no 60 y no 31": ninguna de las
    // dos funciones puede perder ni duplicar un item.
    const answered = new Map(ANSWERED_30.map((c) => [c, 3]));
    const rows = projectAnsweredResponses(targetItems, answered);
    const missing = resolveMissingItemCodes(TARGET_CODES, ANSWERED_30);
    expect(rows.length + missing.length).toBe(60);
    expect(rows.length).toBe(30);
    expect(missing.length).toBe(30);
  });
});
