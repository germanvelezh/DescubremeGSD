/**
 * D-10 de punta a punta — el arrastre, la frontera y el progreso COMO UNA SOLA
 * CADENA (Plan 03-04 Task 3).
 *
 * POR QUE ESTE ARCHIVO EXISTE APARTE del unitario y del de frontera. Los otros
 * dos prueban piezas: `bfi-projection.test.ts` la aritmetica de conjuntos y
 * `runner-frontier-gaps.test.ts` que el runner tolera huecos — pero ese ultimo
 * CONSTRUYE la sesion a mano. Un error de cableado entre `carryForwardResponses`,
 * `advanceProgress` y `getNextItemForSession` no aparece en ninguno de los dos:
 * cada pieza sigue siendo correcta y el usuario igual se queda atascado. Aca la
 * sesion la crea `getOrCreateAuthenticatedSession`, que es el camino real.
 *
 * EL CRITERIO DE ACEPTACION DE D-10, LITERAL: un usuario con el BFI-2-S
 * completo abre el BFI-2-60 y responde 30 items — no 60 y no 31 — y termina con
 * los 60 valores.
 *
 * Anchors:
 *   - lib/paid/projection.ts, lib/session/authenticated.ts.
 *   - 03-04-PLAN.md Task 3 acceptance_criteria.
 */
// @vitest-environment node
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const HAS_STACK = Boolean(
  process.env.DATABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY,
);
const itIfStack = it.skipIf(!HAS_STACK);

const FREE_FORM = "BFI-2-S";
const PAID_FORM = "BFI-2-60";

type Sql = ReturnType<typeof import("postgres").default>;
let sql: Sql | null = null;
let freeVersionId = "";
let paidVersionId = "";
const createdUserIds: string[] = [];

async function getSql(): Promise<Sql> {
  if (sql) return sql;
  const { default: postgres } = await import("postgres");
  sql = postgres(process.env.DATABASE_URL as string, { max: 2 });
  return sql;
}

async function versionIdOf(code: string): Promise<string> {
  const db = await getSql();
  const [row] = await db<{ id: string }[]>`
    select iv.id from instrument_version iv
    join instrument i on i.id = iv.instrument_id
    where i.code = ${code} and iv.version = '1.0' and iv.lang = 'es-CO'
    limit 1
  `;
  return (row?.id as string) ?? "";
}

beforeAll(async () => {
  if (!HAS_STACK) return;
  freeVersionId = await versionIdOf(FREE_FORM);
  paidVersionId = await versionIdOf(PAID_FORM);
});

afterAll(async () => {
  if (!sql) return;
  if (createdUserIds.length > 0) {
    // Limpieza acotada a los usuarios que ESTE archivo creo. El cascade de
    // `assessment_session`/`item_response` cuelga de `public.user`.
    await sql`delete from item_response where user_id = any(${createdUserIds})`;
    await sql`delete from assessment_session where user_id = any(${createdUserIds})`;
    await sql`delete from public.user where id = any(${createdUserIds})`;
  }
  await sql.end();
});

/** Crea una fila de `public.user` sin pasar por GoTrue (no hace falta sesion). */
async function makeUser(): Promise<string> {
  const db = await getSql();
  const [row] = await db<{ id: string }[]>`
    insert into public.user (id, email, country_code)
    values (gen_random_uuid(), ${`proj-${Date.now()}-${Math.floor(Math.random() * 1e9)}@example.test`}, 'CO')
    returning id
  `;
  const id = row.id as string;
  createdUserIds.push(id);
  return id;
}

/**
 * Da por COMPLETADO el BFI-2-S de un usuario, con un `raw_value` distinto por
 * item para que el emparejamiento por `item_code` sea falsable: si el arrastre
 * emparejara por posicion en vez de por codigo, los valores llegarian al item
 * equivocado y la comparacion uno-a-uno de mas abajo lo veria.
 */
async function completeFreeForm(userId: string): Promise<Map<string, number>> {
  const db = await getSql();
  const [session] = await db<{ id: string }[]>`
    insert into assessment_session (user_id, instrument_version_id, status, progress, completed_at)
    values (${userId}, ${freeVersionId}, 'completed', 30, now())
    returning id
  `;
  const items = await db<
    { id: string; sequence_number: number; item_code: string }[]
  >`
    select id, sequence_number, item_code from item
    where instrument_version_id = ${freeVersionId}
    order by sequence_number
  `;
  const byCode = new Map<string, number>();
  for (const it of items) {
    const value = ((it.sequence_number - 1) % 5) + 1;
    await db`
      insert into item_response (session_id, item_id, raw_value, user_id)
      values (${session.id as string}, ${it.id}, ${value}, ${userId})
    `;
    byCode.set(it.item_code, value);
  }
  return byCode;
}

async function openPaidForm(userId: string) {
  const { getOrCreateAuthenticatedSession } = await import(
    "@/lib/session/authenticated"
  );
  return getOrCreateAuthenticatedSession(PAID_FORM, userId);
}

async function responsesOf(sessionId: string) {
  const db = await getSql();
  return db<{ item_code: string; raw_value: number; sequence_number: number }[]>`
    select it.item_code, ir.raw_value, it.sequence_number
    from item_response ir
    join item it on it.id = ir.item_id
    where ir.session_id = ${sessionId}
    order by it.sequence_number
  `;
}

describe("D-10: el usuario que viene del Free responde 30, no 60", () => {
  itIfStack(
    "la sesion nueva nace con 30 filas y progress 30, emparejadas por item_code",
    async () => {
      expect(freeVersionId && paidVersionId).toBeTruthy();
      const userId = await makeUser();
      const freeByCode = await completeFreeForm(userId);
      expect(freeByCode.size).toBe(30);

      const session = await openPaidForm(userId);
      expect(session.created).toBe(true);
      expect(session.progress).toBe(30);

      const rows = await responsesOf(session.id);
      expect(rows).toHaveLength(30);
      // UNO A UNO POR CODIGO. Con valores distintos por item, un emparejamiento
      // por posicion daria valores cruzados y esto enrojeceria.
      for (const row of rows) {
        expect(freeByCode.get(row.item_code)).toBe(row.raw_value);
      }
    },
  );

  itIfStack(
    "responde exactamente 30 items y llega al cierre — sin congelarse",
    async () => {
      const userId = await makeUser();
      await completeFreeForm(userId);
      const session = await openPaidForm(userId);

      const {
        advanceProgress,
        getAnsweredSequences,
        getNextItemForSession,
      } = await import("@/lib/session/anonymous");
      const db = await getSql();

      let served = 0;
      // Tope de 70 > 60: si el runner se congelara, este bucle no terminaria
      // nunca sin el, y "se congelo" se leeria como un timeout sin causa.
      for (let guard = 0; guard < 70; guard++) {
        const item = await getNextItemForSession(session.id);
        if (!item) break;
        await db`
          insert into item_response (session_id, item_id, raw_value, user_id)
          values (${session.id}, ${item.id}, 3, ${userId})
        `;
        await advanceProgress(session.id);
        served += 1;
      }

      expect(served, "el usuario del Free debe responder 30, no 60 y no 31").toBe(30);
      const answered = await getAnsweredSequences(session.id);
      expect(answered).toHaveLength(60);
    },
  );

  itIfStack(
    "al terminar hay 12 valores por dominio: el scorer NO necesita cambios",
    async () => {
      // Verifica la prohibicion del plan ("no se toca score-session.ts") en vez
      // de asumirla: el esquema posicional <dimension><ordinal> exige 12
      // respuestas por dominio y esto lo mide sobre la sesion real.
      const userId = await makeUser();
      await completeFreeForm(userId);
      const session = await openPaidForm(userId);

      const { advanceProgress, getNextItemForSession } = await import(
        "@/lib/session/anonymous"
      );
      const db = await getSql();
      for (let guard = 0; guard < 70; guard++) {
        const item = await getNextItemForSession(session.id);
        if (!item) break;
        await db`
          insert into item_response (session_id, item_id, raw_value, user_id)
          values (${session.id}, ${item.id}, 3, ${userId})
        `;
        await advanceProgress(session.id);
      }

      const counts = await db<{ dimension: string; n: string }[]>`
        select it.dimension, count(*)::text as n
        from item_response ir
        join item it on it.id = ir.item_id
        where ir.session_id = ${session.id}
        group by it.dimension
        order by it.dimension
      `;
      expect(counts).toHaveLength(5);
      for (const row of counts) {
        expect(Number(row.n), `dominio ${row.dimension}`).toBe(12);
      }
    },
  );
});

describe("D-10: el estado frio y los limites del arrastre", () => {
  itIfStack(
    "un usuario SIN BFI-2-S previo obtiene 0 filas y progress 0",
    async () => {
      const userId = await makeUser();
      const session = await openPaidForm(userId);
      expect(session.created).toBe(true);
      expect(session.progress).toBe(0);
      expect(await responsesOf(session.id)).toHaveLength(0);
    },
  );

  itIfStack(
    "una sesion del Free SIN completar no se arrastra",
    async () => {
      const db = await getSql();
      const userId = await makeUser();
      const [open] = await db<{ id: string }[]>`
        insert into assessment_session (user_id, instrument_version_id, status, progress)
        values (${userId}, ${freeVersionId}, 'open', 10)
        returning id
      `;
      const items = await db<{ id: string }[]>`
        select id from item where instrument_version_id = ${freeVersionId}
        order by sequence_number limit 10
      `;
      for (const it of items) {
        await db`
          insert into item_response (session_id, item_id, raw_value, user_id)
          values (${open.id as string}, ${it.id}, 3, ${userId})
        `;
      }

      const session = await openPaidForm(userId);
      // Media sesion abandonada no es evidencia de nada: se responde completo.
      expect(session.progress).toBe(0);
      expect(await responsesOf(session.id)).toHaveLength(0);
    },
  );

  itIfStack(
    "[T-03-04-01] un usuario NUNCA arrastra las respuestas de otro",
    async () => {
      const victim = await makeUser();
      await completeFreeForm(victim);

      const attacker = await makeUser();
      const session = await openPaidForm(attacker);

      // La consulta filtra por el user_id que el servidor resolvio. Si filtrara
      // mal —o no filtrara— aca aparecerian las 30 respuestas de la victima.
      expect(session.progress).toBe(0);
      expect(await responsesOf(session.id)).toHaveLength(0);
    },
  );

  itIfStack(
    "un instrumento con item_code NULO no contamina un arrastre que SI ocurre",
    async () => {
      const db = await getSql();
      const userId = await makeUser();

      // Este caso lleva LAS DOS cosas a proposito. Con solo el O*NET, el
      // resultado seria 0 filas tanto si el filtro de nulos funciona como si no
      // —el BFI-2-60 no tiene ningun item con codigo nulo al que apuntar— y el
      // test no distinguiria nada. Con el BFI-2-S TAMBIEN completado, el
      // arrastre ocurre de verdad y se puede exigir que sean EXACTAMENTE los 30
      // del BFI y ninguna respuesta de O*NET.
      const onetVersionId = await versionIdOf("ONET-IP-SF");
      expect(onetVersionId).toBeTruthy();
      const [s] = await db<{ id: string }[]>`
        insert into assessment_session (user_id, instrument_version_id, status, progress, completed_at)
        values (${userId}, ${onetVersionId}, 'completed', 60, now())
        returning id
      `;
      const onetItems = await db<{ id: string }[]>`
        select id from item where instrument_version_id = ${onetVersionId}
        order by sequence_number
      `;
      expect(onetItems.length).toBeGreaterThan(0);
      for (const it of onetItems) {
        // raw_value 1, distinto del patron 1..5 del BFI, para que un valor
        // filtrado de O*NET fuera identificable si se colara.
        await db`
          insert into item_response (session_id, item_id, raw_value, user_id)
          values (${s.id as string}, ${it.id}, 1, ${userId})
        `;
      }
      const freeByCode = await completeFreeForm(userId);

      const session = await openPaidForm(userId);
      expect(session.progress).toBe(30);
      const rows = await responsesOf(session.id);
      expect(rows).toHaveLength(30);
      for (const row of rows) {
        expect(freeByCode.get(row.item_code)).toBe(row.raw_value);
      }
    },
  );
});

describe("D-10: reanudar NO vuelve a arrastrar", () => {
  itIfStack(
    "la segunda apertura no inserta ni PISA un valor ya cambiado",
    async () => {
      const db = await getSql();
      const userId = await makeUser();
      const freeByCode = await completeFreeForm(userId);
      const first = await openPaidForm(userId);
      expect(first.created).toBe(true);
      const before = await responsesOf(first.id);
      expect(before).toHaveLength(30);

      // DISCRIMINADOR. Contar filas antes y despues pasaria igual con un
      // arrastre re-ejecutado bajo `ON CONFLICT DO NOTHING`: el conteo no
      // cambia aunque el codigo SI haya corrido. Se cambia un valor a mano; si
      // el arrastre volviera a correr, lo pisaria con el valor viejo.
      const target = before[0];
      const mutated = target.raw_value === 5 ? 1 : 5;
      expect(mutated).not.toBe(target.raw_value);
      await db`
        update item_response ir
        set raw_value = ${mutated}
        from item it
        where it.id = ir.item_id
          and ir.session_id = ${first.id}
          and it.item_code = ${target.item_code}
      `;

      const second = await openPaidForm(userId);
      expect(second.id).toBe(first.id);
      expect(second.created).toBe(false);

      const after = await responsesOf(second.id);
      expect(after).toHaveLength(30);
      const changed = after.find((r) => r.item_code === target.item_code);
      expect(
        changed?.raw_value,
        "el arrastre volvio a correr al reanudar y piso la respuesta del usuario",
      ).toBe(mutated);
      // Y el valor original del Free sigue siendo el que NO esta.
      expect(changed?.raw_value).not.toBe(freeByCode.get(target.item_code));
    },
  );
});
