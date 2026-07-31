/**
 * D-15 — el backfill de `block_size` y su CONSUMIDOR, contra la base real
 * (Plan 03-02 Task 2).
 *
 * POR QUE ES UN TEST DE INTEGRACION Y NO UNO UNITARIO.
 *
 * El defecto que este archivo previene no vive en ninguna funcion: vive en el
 * DATO. Al retirar el branch `runnerCode === "ONET-IP-SF" && totalItems === 60`
 * del Server Component, si `instrument_version.block_size` queda en NULL para
 * O*NET el bloqueo anti-abandono de 5x12 **desaparece en silencio** — el usuario
 * ve una barra continua, y ningun test de funcion pura enrojece porque la
 * funcion pura sigue siendo correcta. Solo la base puede desmentirlo.
 *
 * LA TRAMPA QUE ESTO DESTAPA, MEDIDA ANTES DE ESCRIBIRLO.
 *
 * `supabase db reset` corre las migraciones ANTES que los seeds, y la fila de
 * `instrument_version` de O*NET la crea el SEED. Asi que el `UPDATE` de backfill
 * de la migracion 019 es un NO-OP en local y en CI. No es una hipotesis: se
 * consulto la base local y `ONET-IP-SF` tiene `visual_type = null`, es decir el
 * backfill analogo de la migracion `014:41-47` **nunca hizo trabajo en un reset
 * limpio** y llevaba asi desde la Fase 2 sin que nadie lo notara.
 *
 * Por eso el valor vive en dos lugares (migracion para PROD, seed para
 * local/CI/reseed) y por eso este test afirma sobre el EFECTO —el valor que la
 * base termina teniendo— y no sobre la presencia de la linea de UPDATE.
 *
 * LA SEGUNDA ASERCION ES LA QUE SEPARA "LA COLUMNA EXISTE" DE "ALGO LA CONSUME".
 *
 * `getInstrumentVersionMeta` es el UNICO camino por el que `block_size` llega al
 * Server Component. Sin la asercion sobre su salida, se podria mergear una
 * columna correctamente sembrada que nadie lee — la misma clase de hueco que ya
 * mordio dos veces en este proyecto.
 *
 * Anchors:
 *   - supabase/migrations/019_instrument_version_block_size.sql.
 *   - db/seeds/instruments/ONET-IP-SF/instrument-version.sql.
 *   - lib/session/anonymous.ts (getInstrumentVersionMeta).
 *   - tests/integration/teaser-band-coverage.test.ts (plantilla de gating + sql).
 */
// @vitest-environment node
import { afterAll, describe, expect, it } from "vitest";

const HAS_STACK = Boolean(
  process.env.DATABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY,
);
const itIfStack = it.skipIf(!HAS_STACK);

/** El unico instrumento con bloques hoy: 60 items en 5 bloques de 12. */
const BLOCKED_INSTRUMENT_CODE = "ONET-IP-SF";
const EXPECTED_BLOCK_SIZE = 12;

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

describe("D-15 backfill: el dato que preserva el 5x12 de O*NET", () => {
  itIfStack(
    "tras el reset, la fila de instrument_version de O*NET tiene block_size = 12",
    async () => {
      const db = await getSql();
      const rows = await db<{ block_size: number | null }[]>`
        select iv.block_size
        from instrument_version iv
        join instrument i on i.id = iv.instrument_id
        where i.code = ${BLOCKED_INSTRUMENT_CODE}
      `;
      expect(rows.length).toBeGreaterThan(0);
      for (const row of rows) {
        expect(row.block_size).toBe(EXPECTED_BLOCK_SIZE);
      }
    },
  );

  itIfStack(
    "las demas filas sembradas quedan en NULL — la barra continua es el default",
    async () => {
      const db = await getSql();
      const rows = await db<{ code: string; block_size: number | null }[]>`
        select i.code, iv.block_size
        from instrument_version iv
        join instrument i on i.id = iv.instrument_id
        where i.code <> ${BLOCKED_INSTRUMENT_CODE}
      `;
      // Control de no-vacuidad: si el seed no corrio, esta consulta devolveria
      // cero filas y el bucle de abajo pasaria sin afirmar nada.
      expect(rows.length).toBeGreaterThan(0);
      for (const row of rows) {
        expect(row.block_size).toBeNull();
      }
    },
  );

  itIfStack(
    "el backfill es idempotente: su guarda `is null` es lo que lo hace inocuo",
    async () => {
      const db = await getSql();

      // Re-correr el UPDATE VERBATIM de la migracion no cambia nada.
      await db.unsafe(`
        update public.instrument_version
        set block_size = 12
        from public.instrument i
        where instrument_version.instrument_id = i.id
          and i.code = 'ONET-IP-SF'
          and instrument_version.block_size is null;
      `);

      // Discriminador: el mismo UPDATE guardado, pero con OTRO valor. Si la
      // guarda `is null` no estuviera, esto dejaria 99 y el test enrojeceria.
      // Sin este probe, la asercion de arriba pasaria igual con la guarda
      // borrada — probaria que 12 es 12, no que el backfill es idempotente.
      await db.unsafe(`
        update public.instrument_version
        set block_size = 99
        from public.instrument i
        where instrument_version.instrument_id = i.id
          and i.code = 'ONET-IP-SF'
          and instrument_version.block_size is null;
      `);

      const rows = await db<{ block_size: number | null }[]>`
        select iv.block_size
        from instrument_version iv
        join instrument i on i.id = iv.instrument_id
        where i.code = ${BLOCKED_INSTRUMENT_CODE}
      `;
      expect(rows.length).toBeGreaterThan(0);
      for (const row of rows) {
        expect(row.block_size).toBe(EXPECTED_BLOCK_SIZE);
      }
    },
  );

  itIfStack(
    "el CHECK rechaza un block_size no positivo (T-03-02-01)",
    async () => {
      const db = await getSql();
      await expect(
        db.unsafe(`
          update public.instrument_version
          set block_size = 0
          from public.instrument i
          where instrument_version.instrument_id = i.id
            and i.code = 'ONET-IP-SF';
        `),
      ).rejects.toThrow();
    },
  );
});

describe("D-15 transporte: getInstrumentVersionMeta lleva el dato al runner", () => {
  itIfStack(
    "el meta de O*NET trae blockSize = 12 — la columna tiene consumidor",
    async () => {
      const db = await getSql();
      const [row] = await db<{ id: string }[]>`
        select iv.id
        from instrument_version iv
        join instrument i on i.id = iv.instrument_id
        where i.code = ${BLOCKED_INSTRUMENT_CODE}
        limit 1
      `;
      expect(row?.id).toBeTruthy();

      const { getInstrumentVersionMeta } = await import(
        "@/lib/session/anonymous"
      );
      const meta = await getInstrumentVersionMeta(row.id as string);

      expect(meta).not.toBeNull();
      expect(meta?.instrumentCode).toBe(BLOCKED_INSTRUMENT_CODE);
      expect(meta?.blockSize).toBe(EXPECTED_BLOCK_SIZE);
    },
  );

  itIfStack(
    "el meta de un instrumento sin bloques trae blockSize null",
    async () => {
      const db = await getSql();
      const [row] = await db<{ id: string }[]>`
        select iv.id
        from instrument_version iv
        join instrument i on i.id = iv.instrument_id
        where i.code <> ${BLOCKED_INSTRUMENT_CODE}
        limit 1
      `;
      expect(row?.id).toBeTruthy();

      const { getInstrumentVersionMeta } = await import(
        "@/lib/session/anonymous"
      );
      const meta = await getInstrumentVersionMeta(row.id as string);

      expect(meta).not.toBeNull();
      expect(meta?.blockSize).toBeNull();
    },
  );
});
