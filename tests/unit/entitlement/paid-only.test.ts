/**
 * El predicado del guard de `/test/*` — criterio 5 del ROADMAP (Plan 03-01).
 *
 * **EL PREDICADO ES `solo-Paid`, NO `esta-en-el-stack-Paid`.** Esa distincion
 * es la razon de ser de este archivo, y confundirla rompe produccion:
 *
 * Por D-11, O*NET IP-SF y PERMA-Profiler son EL MISMO `instrument_version` en
 * el Free y en el Paid. Tras el seed del plan 03-01 cada uno tiene DOS filas de
 * `product_stack` que difieren solo en `product_code` (verificado contra la
 * base: ONET-IP-SF free/4 + paid/4). Un guard que preguntara "¿pertenece al
 * stack Paid?" devolveria verdadero para O*NET y mandaria al paywall a TODO
 * usuario del Free sin entitlement — y la rama principal despliega a produccion
 * automaticamente, asi que eso apaga el embudo de adquisicion vivo.
 *
 * El campo `layer` TAMPOCO discrimina: O*NET tiene una fila con capa 'free' y
 * otra con capa 'core'.
 *
 * Se prueba con filas SINTETICAS a proposito: en la Wave 1 todavia no existe
 * ningun instrumento exclusivo del Paid (el primero es el BFI-2-60 del plan
 * 03-04), asi que un test que dependiera de lo sembrado hoy no podria cubrir el
 * caso positivo. La mitad positiva end-to-end se verifica por E2E en 03-04.
 *
 * Anchors:
 *   - 03-01-PLAN.md must_haves (predicado solo-Paid), Task 3 step 14.
 *   - db/seeds/product-stack/paid/seed.sql (la fuente de las dos filas).
 */
import { describe, expect, test } from "vitest";

import { requiresPaidAccess } from "@/lib/entitlement/resolve";

describe("requiresPaidAccess — exclusividad, no pertenencia", () => {
  test("compartido con el Free (O*NET, PERMA): NO exige acceso pagado", () => {
    // El caso que rompe produccion si el predicado es ingenuo. Es exactamente
    // la forma que el seed de 03-01 dejo en la base para esos dos.
    expect(
      requiresPaidAccess([{ product_code: "free" }, { product_code: "paid" }]),
    ).toBe(false);

    // El orden de las filas no puede cambiar la respuesta.
    expect(
      requiresPaidAccess([{ product_code: "paid" }, { product_code: "free" }]),
    ).toBe(false);
  });

  test("exclusivo del Paid (BFI-2-60 y los demas, plan 03-04+): SI exige acceso", () => {
    expect(requiresPaidAccess([{ product_code: "paid" }])).toBe(true);
  });

  test("ajeno al Paid (solo Free): NO exige acceso", () => {
    expect(requiresPaidAccess([{ product_code: "free" }])).toBe(false);
  });

  test("sin filas: NO exige acceso (falla ABIERTO, a proposito)", () => {
    // Un instrumento sin membresia sembrada no puede quedar detras del
    // paywall. Fallar cerrado aca convertiria cualquier hueco de seed —o un
    // error de lectura— en un paywall sobre la ruta de adquisicion. El guard
    // protege lo que esta declarado como exclusivo, no todo lo desconocido.
    expect(requiresPaidAccess([])).toBe(false);
  });

  test("un producto futuro (B2B) no concede ni exige nada por si solo", () => {
    expect(requiresPaidAccess([{ product_code: "b2b-a" }])).toBe(false);
    // Paid + B2B sin Free sigue siendo exclusivo del Paid.
    expect(
      requiresPaidAccess([{ product_code: "b2b-a" }, { product_code: "paid" }]),
    ).toBe(true);
    // Y con Free presente, sigue abierto.
    expect(
      requiresPaidAccess([
        { product_code: "b2b-a" },
        { product_code: "paid" },
        { product_code: "free" },
      ]),
    ).toBe(false);
  });

  test("filas duplicadas del mismo producto no cambian la decision", () => {
    expect(
      requiresPaidAccess([{ product_code: "paid" }, { product_code: "paid" }]),
    ).toBe(true);
    expect(
      requiresPaidAccess([
        { product_code: "free" },
        { product_code: "free" },
        { product_code: "paid" },
      ]),
    ).toBe(false);
  });
});
