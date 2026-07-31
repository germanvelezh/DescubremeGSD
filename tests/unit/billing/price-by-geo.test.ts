/**
 * D-19 — el precio y la moneda se derivan EN SERVIDOR (Plan 03-01, Fase 3).
 *
 * `resolvePrice` es PURA a proposito: no lee `process.env` ni cabeceras. El
 * pais entra como parametro y los identificadores de precio de Stripe entran
 * como parametro, con la misma forma de inyeccion que ya usa el repo
 * (`resolveEntitlement(supabase, ...)`, `resolveNextFreeTest(orderedCodes, ...)`).
 * Asi el test no necesita mocks ni variables de entorno, y la funcion no puede
 * leer nada del cliente por accidente.
 *
 * El anti-goal del ROADMAP es explicito: el cliente NUNCA envia moneda ni
 * monto. Este archivo fija la regla de seleccion; `/api/checkout` la consume.
 *
 * Anchors:
 *   - 03-01-PLAN.md must_haves D-19 + Task 3 step 4.
 *   - tests/integration/geo-header-channel.test.ts (como llega el pais).
 */
import { describe, expect, test } from "vitest";

import { PAID_PRICE_TABLE, resolvePrice } from "@/lib/billing/prices";

const PRICE_IDS = { usd: "price_test_usd", cop: "price_test_cop" } as const;

describe("resolvePrice — moneda cobrada por geolocalizacion (D-19)", () => {
  test('un pais "US" cobra en USD y muestra COP como referencia', () => {
    const price = resolvePrice("US", PRICE_IDS);

    expect(price.charged.currency).toBe("usd");
    expect(price.charged.stripePriceId).toBe(PRICE_IDS.usd);
    expect(price.reference.currency).toBe("cop");
  });

  test('un pais "CO" cobra en COP y muestra USD como referencia', () => {
    const price = resolvePrice("CO", PRICE_IDS);

    expect(price.charged.currency).toBe("cop");
    expect(price.charged.stripePriceId).toBe(PRICE_IDS.cop);
    expect(price.reference.currency).toBe("usd");
  });

  test("null y cadena vacia caen a COP (el default es el mercado principal)", () => {
    expect(resolvePrice(null, PRICE_IDS).charged.currency).toBe("cop");
    expect(resolvePrice("", PRICE_IDS).charged.currency).toBe("cop");
    expect(resolvePrice(undefined, PRICE_IDS).charged.currency).toBe("cop");
  });

  test("cualquier otro pais cae a COP (LATAM es el mercado, no US)", () => {
    for (const country of ["MX", "AR", "CL", "PE", "ES"]) {
      expect(resolvePrice(country, PRICE_IDS).charged.currency).toBe("cop");
    }
  });

  test("el pais se normaliza a mayusculas: 'us' no puede cobrar en la moneda equivocada", () => {
    // Vercel manda ISO alpha-2 en mayusculas, pero depender de eso convierte
    // un cambio de plataforma en un error de cobro silencioso.
    expect(resolvePrice("us", PRICE_IDS).charged.currency).toBe("usd");
    expect(resolvePrice(" US ", PRICE_IDS).charged.currency).toBe("usd");
  });

  test("la funcion es PURA: no lee process.env", () => {
    // Las dos claves que la tentacion pondria adentro. Si `resolvePrice` las
    // leyera, borrarlas cambiaria el resultado.
    const saved = [process.env.STRIPE_PRICE_ID_USD, process.env.STRIPE_PRICE_ID_COP];
    process.env.STRIPE_PRICE_ID_USD = "price_env_contaminado";
    process.env.STRIPE_PRICE_ID_COP = "price_env_contaminado";
    try {
      expect(resolvePrice("US", PRICE_IDS).charged.stripePriceId).toBe(PRICE_IDS.usd);
      expect(resolvePrice("CO", PRICE_IDS).charged.stripePriceId).toBe(PRICE_IDS.cop);
    } finally {
      process.env.STRIPE_PRICE_ID_USD = saved[0];
      process.env.STRIPE_PRICE_ID_COP = saved[1];
      if (saved[0] === undefined) delete process.env.STRIPE_PRICE_ID_USD;
      if (saved[1] === undefined) delete process.env.STRIPE_PRICE_ID_COP;
    }
  });

  test("cobrada y referencia son siempre monedas DISTINTAS", () => {
    for (const country of ["US", "CO", null]) {
      const price = resolvePrice(country, PRICE_IDS);
      expect(price.charged.currency).not.toBe(price.reference.currency);
    }
  });

  test("la tabla declara monto y nombre de moneda para las dos monedas", () => {
    // El nombre de moneda es requisito de accesibilidad (03-UI-SPEC §A11y:
    // "nombre de moneda en el texto accesible, no solo simbolo").
    for (const currency of ["usd", "cop"] as const) {
      const row = PAID_PRICE_TABLE[currency];
      expect(row.amount).toBeGreaterThan(0);
      expect(row.currencyName.length).toBeGreaterThan(0);
    }
  });

  test("es una TABLA de datos, no una cadena de ifs", () => {
    // Agregar una moneda tiene que ser una fila, no una rama. Si la tabla
    // dejara de ser la fuente, este conteo se despega de la realidad.
    expect(Object.keys(PAID_PRICE_TABLE).sort()).toEqual(["cop", "usd"]);
  });
});
