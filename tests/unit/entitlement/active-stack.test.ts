/**
 * `resolveActiveProductCode` — sobre que stack se cuenta "Test X de N"
 * (Plan 03-02 Task 2 step 5).
 *
 * EL DEFECTO QUE CIERRA, LEIDO EN EL CODIGO ANTES DE TOCARLO.
 *
 * `resolveGlobalPosition` consultaba `product_stack` con el codigo del Free
 * FIJO y devolvia nulo si el instrumento no estaba en ese stack. Dos
 * consecuencias, las dos visibles para un usuario que pago:
 *
 *   1. En un instrumento EXCLUSIVO del Paid, la linea "Test X de N" desaparecia.
 *   2. En uno COMPARTIDO (O*NET y PERMA son el mismo `instrument_version` en los
 *      dos stacks por D-11), veia la posicion del recorrido del FREE —"Test 2 de
 *      4"— en medio de un recorrido de 11 instrumentos.
 *
 * Por eso el desempate del caso compartido es la asercion central de este
 * archivo, y se prueba en LAS DOS DIRECCIONES: con entitlement da 'paid', sin
 * el da 'free'. Una sola direccion pasaria igual con un predicado que ignorara
 * el entitlement.
 *
 * Anchors:
 *   - lib/entitlement/resolve.ts (resolveActiveProductCode).
 *   - db/seeds/product-stack/paid/seed.sql (D-11: dos filas por instrumento).
 *   - 03-UI-SPEC.md §5 ("Test X de 11 · {etiqueta}" en el Paid).
 */
import { describe, expect, test } from "vitest";

import {
  PAID_PRODUCT_CODE,
  resolveActiveProductCode,
} from "@/lib/entitlement/resolve";
import { FREE_PRODUCT_CODE } from "@/lib/free/next-test";

const free = { product_code: FREE_PRODUCT_CODE };
const paid = { product_code: PAID_PRODUCT_CODE };

describe("instrumento compartido entre Free y Paid (D-11) — el entitlement desempata", () => {
  test("con acceso pagado activo, el recorrido activo es el del Paid", () => {
    expect(resolveActiveProductCode([free, paid], true)).toBe(
      PAID_PRODUCT_CODE,
    );
  });

  test("SIN acceso pagado, el recorrido activo sigue siendo el del Free", () => {
    // Esta es la mitad que protege el embudo vivo: si esto devolviera 'paid',
    // todo usuario del Free en O*NET veria la posicion del stack equivocado.
    expect(resolveActiveProductCode([free, paid], false)).toBe(
      FREE_PRODUCT_CODE,
    );
  });

  test("el orden de las filas no cambia la respuesta", () => {
    expect(resolveActiveProductCode([paid, free], true)).toBe(
      PAID_PRODUCT_CODE,
    );
    expect(resolveActiveProductCode([paid, free], false)).toBe(
      FREE_PRODUCT_CODE,
    );
  });
});

describe("instrumento en un solo stack — no hay nada que desempatar", () => {
  test("solo Free -> free, tenga o no tenga acceso pagado", () => {
    expect(resolveActiveProductCode([free], false)).toBe(FREE_PRODUCT_CODE);
    expect(resolveActiveProductCode([free], true)).toBe(FREE_PRODUCT_CODE);
  });

  test("solo Paid -> paid (el guard ya rebota a quien no tiene acceso)", () => {
    expect(resolveActiveProductCode([paid], true)).toBe(PAID_PRODUCT_CODE);
  });

  test("filas duplicadas del mismo stack cuentan como uno", () => {
    expect(resolveActiveProductCode([free, free], false)).toBe(
      FREE_PRODUCT_CODE,
    );
  });
});

describe("sin respuesta posible -> nulo, NUNCA una posicion inventada", () => {
  test("sin membresias (instrumento no sembrado, o lectura fallida) -> null", () => {
    // `loadProductStackMemberships` devuelve [] ante error. La linea de
    // posicion global se omite; no se muestra una cifra que no significa nada.
    expect(resolveActiveProductCode([], false)).toBeNull();
    expect(resolveActiveProductCode([], true)).toBeNull();
  });

  test("ambiguo entre stacks que no son ni Free ni Paid -> null", () => {
    expect(
      resolveActiveProductCode(
        [{ product_code: "b2b-a" }, { product_code: "b2b-b" }],
        false,
      ),
    ).toBeNull();
  });
});
