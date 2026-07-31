/**
 * La aritmetica de minutos del paywall (Plan 03-05 Task 1).
 *
 * Todo lo que se prueba aca es PURO: ni base, ni mocks, ni entorno. La razon de
 * que este modulo exista separado es que el minuto de una fila y el minuto del
 * total salgan de la MISMA funcion. Calculados en dos sitios se desincronizan
 * en cuanto alguien mueve un toggle de add-on, y la pantalla mostraria una suma
 * que no cuadra con sus propias filas — justo el fallo que D-13 prohibe.
 *
 * Anchors:
 *   - 03-05-PLAN.md Task 1 <behavior>, must_have D-13.
 *   - 03-UI-SPEC.md §Component Inventory (HonestTimeEstimate), A5.
 */
import { describe, expect, test } from "vitest";

import {
  MINUTES_PER_ITEM,
  MINUTES_ROUNDING_STEP,
  estimateMinutes,
  sumEstimatedMinutes,
} from "@/lib/paid/estimate";

describe("estimateMinutes", () => {
  test("cero items son cero minutos, no un piso inventado", () => {
    expect(estimateMinutes(0)).toBe(0);
  });

  test("multiplica por la constante declarada y redondea HACIA ARRIBA", () => {
    // La propiedad, no una tabla de casos: el resultado nunca es menor que el
    // producto crudo. Redondear hacia abajo seria redondear A FAVOR, que es
    // exactamente lo que D-13 prohibe.
    for (const count of [1, 5, 9, 23, 30, 57, 60, 96, 143, 255, 368]) {
      expect(estimateMinutes(count)).toBeGreaterThanOrEqual(
        count * MINUTES_PER_ITEM,
      );
    }
  });

  test("el resultado siempre cae en un paso de la escala declarada", () => {
    for (const count of [1, 7, 23, 60, 143, 368]) {
      expect(estimateMinutes(count) % MINUTES_ROUNDING_STEP).toBe(0);
    }
  });

  test("nunca se aleja mas de un paso por encima del producto crudo", () => {
    // Sin esta cota, "redondear hacia arriba" admitiria una sobreestimacion
    // arbitraria — que tampoco es una estimacion honesta.
    for (let count = 1; count <= 400; count += 1) {
      const raw = count * MINUTES_PER_ITEM;
      expect(estimateMinutes(count) - raw).toBeLessThan(MINUTES_ROUNDING_STEP);
    }
  });

  test("es monotona: mas items nunca dan menos minutos", () => {
    let previous = 0;
    for (let count = 0; count <= 400; count += 1) {
      const current = estimateMinutes(count);
      expect(current).toBeGreaterThanOrEqual(previous);
      previous = current;
    }
  });

  test("un conteo negativo o no finito devuelve 0 en vez de un minuto negativo", () => {
    expect(estimateMinutes(-5)).toBe(0);
    expect(estimateMinutes(Number.NaN)).toBe(0);
  });

  test("la constante declarada mantiene el stack completo dentro del rango del PRD", () => {
    // El PRD declara ~95-130 minutos para el stack Paid COMPLETO PREVISTO
    // (368 items). **368 NO es el conteo de hoy** —hoy son 143, con 3 de las
    // filas sembradas— ni sera necesariamente el final: Ryff quedo fuera, asi
    // que el stack cerrara en 10 instrumentos, no 11. Es un guard sobre LA
    // CONSTANTE, no sobre el stack: si alguien la afina, este test dice si la
    // afinacion saca la estimacion del rango que el producto promete por
    // escrito. La cifra del stack real la afirma el test de integracion.
    const full = estimateMinutes(368);
    expect(full).toBeGreaterThanOrEqual(95);
    expect(full).toBeLessThanOrEqual(130);
  });
});

describe("sumEstimatedMinutes", () => {
  test("suma los minutos YA redondeados de cada fila", () => {
    // Es deliberado: el total de la pantalla es la suma de lo que el usuario ve
    // fila por fila. Estimar sobre el gran total daria un numero MENOR que la
    // suma de las filas mostradas, y la pantalla se contradiria a si misma.
    const counts = [60, 60, 23];
    expect(sumEstimatedMinutes(counts)).toBe(
      counts.reduce((acc, c) => acc + estimateMinutes(c), 0),
    );
  });

  test("sin filas, cero minutos", () => {
    expect(sumEstimatedMinutes([])).toBe(0);
  });

  test("el total mostrado nunca es menor que la suma cruda de sus filas", () => {
    const counts = [60, 60, 23, 57, 96];
    const raw = counts.reduce((acc, c) => acc + c, 0) * MINUTES_PER_ITEM;
    expect(sumEstimatedMinutes(counts)).toBeGreaterThanOrEqual(raw);
  });
});
