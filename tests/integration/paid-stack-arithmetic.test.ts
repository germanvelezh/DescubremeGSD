/**
 * La aritmetica del paywall contra la BASE REAL (Plan 03-05 Task 1).
 *
 * POR QUE ESTO NO PUEDE SER UN TEST UNITARIO.
 *
 * `composePaidStack` ya esta probada con filas sinteticas, y esa prueba seguiria
 * verde con un seed roto: la funcion no se equivoca, el DATO si. El paywall
 * apoya su total —y por tanto la promesa de volumen que acompana a un precio—
 * en `instrument_version.item_count`, que es NULLABLE en el catalogo. Un
 * instrumento sembrado con `item_count` en null, o con una cifra que no coincide
 * con sus items reales, produce exactamente el fallo que la fase entera intenta
 * evitar: **una aritmetica que omite items al lado de un precio**.
 *
 * Las tres aserciones que importan, en orden de gravedad:
 *
 *   1. Ninguna fila core llega sin conteo. Si esto se rompe, el paywall pasa al
 *      estado no-disponible y **nadie puede comprar** — ruidoso, que es lo
 *      correcto, pero hay que enterarse antes de desplegarlo.
 *   2. `item_count` coincide con el conteo REAL de filas de `item`. Este es el
 *      fallo callado: la pantalla renderiza perfecta y el total esta mal.
 *   3. El total que el usuario lee es la suma de las filas que el usuario ve.
 *
 * `Nota deliberada:` este archivo NO fija una constante de "cuantas filas
 * deberia tener el stack". Esa cifra la mantiene el test de integracion del plan
 * de seed que introduce cada instrumento, y mantenida aqui a mano se
 * desincronizaria del seed — que es la clase de fallo que ya mordio dos veces en
 * este proyecto. Lo que se afirma aqui son INVARIANTES, no un inventario.
 *
 * Anchors:
 *   - 03-05-PLAN.md Task 1 paso 3, must_haves Paywall/empty y Paywall/error.
 *   - lib/paid/stack.ts (la funcion pura que consume estas filas).
 *   - tests/integration/seeds/bfi-2-60.test.ts (plantilla de gating + sql).
 */
// @vitest-environment node
import { afterAll, describe, expect, it } from "vitest";

import { estimateMinutes } from "@/lib/paid/estimate";
import {
  PAID_CORE_LAYER,
  type PaidStackSourceRow,
  composePaidStack,
} from "@/lib/paid/stack";

const HAS_STACK = Boolean(
  process.env.DATABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY,
);
const itIfStack = it.skipIf(!HAS_STACK);

type Sql = ReturnType<typeof import("postgres").default>;
let sql: Sql | null = null;

async function getSql(): Promise<Sql> {
  if (sql) return sql;
  const { default: postgres } = await import("postgres");
  sql = postgres(process.env.DATABASE_URL as string, { max: 2 });
  return sql;
}

afterAll(async () => {
  if (sql) await sql.end();
});

interface StackRow {
  order: number;
  layer: string;
  version_id: string;
  code: string;
  item_count: number | null;
  real_items: number;
  coded_items: number;
}

/**
 * La MISMA forma de consulta que `loadPaidStack`, mas el conteo real de items.
 * El conteo real es la mitad del test: es lo unico que puede desmentir a
 * `item_count`.
 */
async function loadPaidStackRows(): Promise<StackRow[]> {
  const db = await getSql();
  return db<StackRow[]>`
    select
      ps."order",
      ps.layer,
      iv.id as version_id,
      i.code,
      iv.item_count,
      (select count(*) from item it where it.instrument_version_id = iv.id)::int as real_items,
      (select count(*) from item it
        where it.instrument_version_id = iv.id and it.item_code is not null)::int as coded_items
    from product_stack ps
    join instrument_version iv on iv.id = ps.instrument_version_id
    join instrument i on i.id = iv.instrument_id
    where ps.product_code = 'paid'
    order by ps."order"
  `;
}

/** Adapta las filas reales a la entrada de la funcion pura. */
function toSourceRows(rows: readonly StackRow[]): PaidStackSourceRow[] {
  return rows.map((r) => ({
    versionId: r.version_id,
    instrumentCode: r.code,
    itemCount: r.item_count,
    layer: r.layer,
    // Se reconstruyen tantos codigos como items codificados tenga la version:
    // para la aritmetica solo importa CUANTOS hay, no cuales.
    itemCodes: Array.from({ length: r.coded_items }, (_, i) => `${r.version_id}#${i}`),
  }));
}

describe("El stack del Paid sembrado sostiene la aritmetica del paywall", () => {
  itIfStack("hay al menos una fila core: sin eso no hay nada que vender", async () => {
    const rows = await loadPaidStackRows();
    const core = rows.filter((r) => r.layer === PAID_CORE_LAYER);
    expect(
      core.length,
      "product_stack('paid') no tiene ninguna fila core. El paywall pasa al estado no-disponible y nadie puede comprar.",
    ).toBeGreaterThan(0);
  });

  itIfStack("ninguna fila core llega sin conteo de items", async () => {
    const rows = await loadPaidStackRows();
    const missing = rows
      .filter((r) => r.layer === PAID_CORE_LAYER)
      .filter((r) => r.item_count == null || r.item_count <= 0)
      .map((r) => r.code);
    expect(
      missing,
      `Estos instrumentos del stack Paid no tienen item_count sembrado: ${missing.join(", ")}. Con uno solo asi, el paywall entero pasa a no-disponible.`,
    ).toEqual([]);
  });

  itIfStack(
    "item_count coincide con el conteo REAL de items — el fallo callado",
    async () => {
      // Este es el modo de fallo que ninguna pantalla delata: el paywall
      // renderiza perfecto y el total esta mal. Un item_count inflado promete
      // mas trabajo del que hay; uno corto lo promete menos y sorprende despues
      // de pagar, que es peor.
      const rows = await loadPaidStackRows();
      const mismatched = rows
        .filter((r) => r.layer === PAID_CORE_LAYER)
        .filter((r) => r.item_count !== r.real_items)
        .map((r) => `${r.code}: item_count=${r.item_count} vs items=${r.real_items}`);
      expect(mismatched).toEqual([]);
    },
  );

  itIfStack(
    "el total del paywall es EXACTAMENTE la suma de las filas que muestra",
    async () => {
      const rows = await loadPaidStackRows();
      const result = composePaidStack(toSourceRows(rows), {
        completedVersionIds: new Set<string>(),
        answeredItemCodes: new Set<string>(),
      });
      expect(result.available).toBe(true);
      if (!result.available) return;

      const sumOfRows = result.rows.reduce((acc, r) => acc + r.itemCount, 0);
      expect(result.totalItems).toBe(sumOfRows);
      // Y contra el dato crudo, no solo contra si mismo.
      const sumOfRealItems = rows
        .filter((r) => r.layer === PAID_CORE_LAYER)
        .reduce((acc, r) => acc + r.real_items, 0);
      expect(result.totalItems).toBe(sumOfRealItems);

      // Los minutos del total son la suma de los minutos de las filas visibles.
      const sumOfRowMinutes = result.rows.reduce((acc, r) => acc + r.minutes, 0);
      expect(result.remainingMinutes).toBe(sumOfRowMinutes);
      expect(result.remainingMinutes).toBe(
        result.rows.reduce((acc, r) => acc + estimateMinutes(r.itemCount), 0),
      );
    },
  );

  itIfStack(
    "vaciar el stack produce el estado no-disponible, no una lista corta",
    async () => {
      // Se ejerce sobre las filas REALES, quitandolas: es el criterio central de
      // la tarea. No se borra nada de la base — un DELETE aqui contaminaria las
      // demas suites que corren contra el mismo Postgres.
      const rows = await loadPaidStackRows();
      const emptied = composePaidStack([], {
        completedVersionIds: new Set<string>(),
        answeredItemCodes: new Set<string>(),
      });
      expect(emptied.available).toBe(false);

      // Y con UNA sola fila real sin conteo, tampoco se renderiza la compra.
      const source = toSourceRows(rows);
      const firstCore = source.findIndex((r) => r.layer === PAID_CORE_LAYER);
      expect(firstCore).toBeGreaterThanOrEqual(0);
      const broken = source.map((r, i) =>
        i === firstCore ? { ...r, itemCount: null } : r,
      );
      const result = composePaidStack(broken, {
        completedVersionIds: new Set<string>(),
        answeredItemCodes: new Set<string>(),
      });
      expect(result.available).toBe(false);
      if (result.available) return;
      expect(result.reason).toBe("incomplete");
    },
  );

  itIfStack(
    "la etiqueta de cada fila core existe y NO es el codigo crudo",
    async () => {
      // Un instrumento sin entrada en el catalogo de etiquetas cae al fallback
      // neutro y el usuario del Paid lee "Autoconocimiento" donde el del Free
      // lee su constructo. No rompe nada, y por eso hay que verlo.
      const rows = await loadPaidStackRows();
      const result = composePaidStack(toSourceRows(rows), {
        completedVersionIds: new Set<string>(),
        answeredItemCodes: new Set<string>(),
      });
      if (!result.available) return;
      for (const row of result.rows) {
        expect(row.label).not.toBe(row.instrumentCode);
        expect(row.label.trim().length).toBeGreaterThan(0);
      }
    },
  );
});
