/**
 * Dual pricing del B2C Paid — derivacion EN SERVIDOR (D-19, Plan 03-01).
 *
 * Hard Gate del ROADMAP §Phase 3: el precio y la moneda se derivan en el
 * servidor a partir de la geolocalizacion. El anti-goal es explicito: **el
 * cliente nunca envia moneda ni monto**. Por eso esta funcion es PURA y recibe
 * el pais como parametro — no lee cabeceras ni `process.env`, asi que no puede
 * leer nada del cliente ni siquiera por accidente.
 *
 * Los identificadores de precio de Stripe entran tambien por parametro, con la
 * forma de inyeccion que ya usa el repo (`resolveEntitlement(supabase, ...)`,
 * `resolveNextFreeTest(orderedCodes, ...)`). Quien lee el entorno es el Route
 * Handler, no este modulo.
 *
 * CUAL ES LA FUENTE DEL MONTO QUE SE COBRA — importa no confundirse:
 * el Checkout Session se crea con `price: <stripePriceId>`, asi que **Stripe
 * es el duenno del monto real**. Los montos de `PAID_PRICE_TABLE` son de
 * PRESENTACION: existen para renderizar la pantalla sin una llamada de red.
 * Si el Price del Dashboard y esta tabla se separan, el usuario ve una cifra y
 * paga otra. Mantenerlos iguales es parte de la configuracion del Dashboard.
 *
 * Anchors:
 *   - 03-01-PLAN.md must_haves D-19 + Task 3 step 4.
 *   - lib/geo/header.ts (de donde sale el pais).
 *   - 03-UI-SPEC.md §Accessibility ("nombre de moneda en el texto accesible,
 *     no solo simbolo") -> por eso la tabla lleva `currencyName`.
 */

/** Las dos monedas en las que el Paid puede cobrarse. */
export type PaidCurrency = "usd" | "cop";

export interface PaidPriceRow {
  currency: PaidCurrency;
  /** Monto en unidades ENTERAS de la moneda (19 USD, no 1900 centavos). */
  amount: number;
  /** Nombre en es-CO para el texto accesible (nunca solo el simbolo). */
  currencyName: string;
}

/** Identificadores de Price de Stripe, inyectados por el llamador. */
export interface PaidPriceIds {
  readonly usd: string;
  readonly cop: string;
}

export interface ResolvedPrice {
  /** Lo que se cobra de verdad. `stripePriceId` es lo que va al Checkout. */
  charged: PaidPriceRow & { stripePriceId: string };
  /** La otra moneda, mostrada como equivalencia. NUNCA se cobra. */
  reference: PaidPriceRow;
}

/**
 * Tabla de datos, no una cadena de `if`. Agregar una moneda es agregar una
 * fila (mas su Price en el Dashboard), no abrir una rama nueva.
 *
 * `[GAP-FASE3-MONTO-COP-SIN-FIRMAR]`: el PRD fija USD 19 y dice "o su
 * equivalente en COP" sin fijar la cifra. 80.000 COP es un valor DECLARADO por
 * este plan para que la pantalla tenga algo coherente que mostrar; **la cifra
 * final y su Price en el Dashboard los firma German**. Se deja aca, visible y
 * en un solo lugar, en vez de esparcida por la UI.
 */
export const PAID_PRICE_TABLE: Record<PaidCurrency, PaidPriceRow> = {
  usd: { currency: "usd", amount: 19, currencyName: "dolares" },
  cop: { currency: "cop", amount: 80000, currencyName: "pesos colombianos" },
};

/** Unico pais que se cobra en USD. Todo lo demas es el mercado LATAM. */
const USD_COUNTRY = "US";

/**
 * Devuelve la moneda cobrada y la de referencia a partir del pais.
 *
 * Regla: `US` cobra en USD; **cualquier otro valor** —incluidos `null`,
 * `undefined` y cadena vacia— cobra en COP. El default no es un fallback de
 * error: LATAM es el mercado principal, asi que la ausencia de senal de geo
 * lleva al caso mayoritario.
 *
 * El pais se normaliza (trim + mayusculas) antes de comparar: depender de que
 * la plataforma mande siempre alpha-2 en mayusculas convierte un cambio de
 * proveedor en un error de cobro silencioso.
 */
export function resolvePrice(
  country: string | null | undefined,
  priceIds: PaidPriceIds,
): ResolvedPrice {
  const normalized = (country ?? "").trim().toUpperCase();
  const chargedCurrency: PaidCurrency = normalized === USD_COUNTRY ? "usd" : "cop";
  const referenceCurrency: PaidCurrency = chargedCurrency === "usd" ? "cop" : "usd";

  return {
    charged: {
      ...PAID_PRICE_TABLE[chargedCurrency],
      stripePriceId: priceIds[chargedCurrency],
    },
    reference: { ...PAID_PRICE_TABLE[referenceCurrency] },
  };
}

/**
 * Formatea un monto con el NOMBRE de la moneda, no solo el simbolo
 * (03-UI-SPEC §Accessibility). Se usa tanto en el texto visible como en el
 * accesible, para que no puedan divergir.
 */
export function formatPaidAmount(row: PaidPriceRow): string {
  const amount = new Intl.NumberFormat("es-CO").format(row.amount);
  return `${amount} ${row.currencyName}`;
}
