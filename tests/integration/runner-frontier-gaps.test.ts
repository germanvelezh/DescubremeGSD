/**
 * La frontera del runner tolerante a HUECOS — precondicion de D-10
 * (Plan 03-04 Task 2).
 *
 * QUE PREVIENE ESTE ARCHIVO, EN UNA FRASE: que el runner se congele.
 *
 * Hasta este plan `getNextItemForSession` calculaba `nextSeq = progress + 1` y
 * pedia el item con ESA `sequence_number` exacta. Era correcto mientras toda
 * sesion empezara vacia: con respuestas contiguas, "el siguiente sin responder"
 * y "progress + 1" son el mismo item. La proyeccion de D-10 rompe esa premisa —
 * arrastra las 30 respuestas del BFI-2-S, que estan INTERCALADAS dentro de 1..60
 * (`BFI-2-60-{1,2,3,4,5,7,12,16,...}`), no son un prefijo. Con `progress = 30`
 * el runner serviria el item 31, saltandose los huecos, y al topar uno YA
 * RESPONDIDO el upsert no incrementa `progress` (advanceProgress cuenta filas
 * distintas, [BUG-PROGRESS-DRIFT-ON-REANSWER]) y el runner se queda ahi PARA
 * SIEMPRE.
 *
 * POR QUE ES DE INTEGRACION: la frontera es una consulta. Un test con mocks
 * afirmaria sobre la forma del builder de Supabase, no sobre el item que la base
 * devuelve — que es lo unico que decide si el usuario avanza.
 *
 * EL PRIMER `describe` ES LA PRUEBA DE NO-REGRESION DEL FREE, y va primero a
 * proposito: es el criterio que dice que esta generalizacion no cambio el
 * comportamiento del embudo vivo. Con respuestas contiguas, la frontera nueva
 * devuelve EXACTAMENTE el mismo item que devolvia la contigua, para progress en
 * 0, 1, la mitad y total - 1.
 *
 * Anchors:
 *   - lib/session/anonymous.ts (getNextItemForSession, getAnsweredSequences).
 *   - lib/free/runner-navigation.ts (resolveDisplayItem, el acotamiento de "Atras").
 *   - 03-04-PLAN.md Task 2.
 *   - estado/BACKLOG.md [GAP-RUNNER-CONTIGUIDAD-BLOQUEA-D10].
 */
// @vitest-environment node
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const HAS_STACK = Boolean(
  process.env.DATABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY,
);
const itIfStack = it.skipIf(!HAS_STACK);

/** 60 items sembrados — el instrumento con el que D-10 se ejerce de verdad. */
const INSTRUMENT_CODE = "BFI-2-60";
const TOTAL_ITEMS = 60;

type Sql = ReturnType<typeof import("postgres").default>;
let sql: Sql | null = null;
let versionId: string | null = null;
/** sequence_number -> item.id, para insertar respuestas por numero de item. */
const itemIdBySeq = new Map<number, string>();
const createdSessionIds: string[] = [];

async function getSql(): Promise<Sql> {
  if (sql) return sql;
  const { default: postgres } = await import("postgres");
  sql = postgres(process.env.DATABASE_URL as string, { max: 2 });
  return sql;
}

beforeAll(async () => {
  if (!HAS_STACK) return;
  const db = await getSql();
  const [v] = await db<{ id: string }[]>`
    select iv.id
    from instrument_version iv
    join instrument i on i.id = iv.instrument_id
    where i.code = ${INSTRUMENT_CODE}
      and iv.version = '1.0'
      and iv.lang = 'es-CO'
    limit 1
  `;
  versionId = v?.id ?? null;
  if (!versionId) return;
  const items = await db<{ id: string; sequence_number: number }[]>`
    select id, sequence_number from item
    where instrument_version_id = ${versionId}
    order by sequence_number
  `;
  for (const it of items) itemIdBySeq.set(it.sequence_number, it.id);
});

afterAll(async () => {
  if (sql) {
    if (createdSessionIds.length > 0) {
      // Limpieza acotada a las sesiones que ESTE archivo creo. Nunca un DELETE
      // sin WHERE sobre una tabla compartida con los demas tests.
      await sql`delete from item_response where session_id = any(${createdSessionIds})`;
      await sql`delete from assessment_session where id = any(${createdSessionIds})`;
    }
    await sql.end();
  }
});

/**
 * Crea una sesion anonima con un conjunto ARBITRARIO de items respondidos y
 * `progress` fijado igual que lo deja `advanceProgress`: el conteo de items
 * DISTINTOS respondidos. Ese detalle es el que hace realista el escenario —
 * con huecos, ese conteo deja de ser un indice de posicion.
 */
async function makeSession(answeredSeqs: number[]): Promise<string> {
  const db = await getSql();
  const anonId = `frontier-${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
  const [row] = await db<{ id: string }[]>`
    insert into assessment_session
      (anonymous_session_id, instrument_version_id, status, progress)
    values (${anonId}, ${versionId as string}, 'open', ${answeredSeqs.length})
    returning id
  `;
  const sessionId = row.id as string;
  createdSessionIds.push(sessionId);
  for (const seq of answeredSeqs) {
    const itemId = itemIdBySeq.get(seq);
    if (!itemId) throw new Error(`no hay item sembrado en la secuencia ${seq}`);
    await db`
      insert into item_response (session_id, item_id, raw_value)
      values (${sessionId}, ${itemId}, 3)
    `;
  }
  return sessionId;
}

/** Responde un item mas y recalcula progress como lo hace advanceProgress. */
async function answer(sessionId: string, seq: number): Promise<void> {
  const db = await getSql();
  const itemId = itemIdBySeq.get(seq);
  if (!itemId) throw new Error(`no hay item sembrado en la secuencia ${seq}`);
  await db`
    insert into item_response (session_id, item_id, raw_value)
    values (${sessionId}, ${itemId}, 3)
  `;
  await db`
    update assessment_session
    set progress = (select count(*) from item_response where session_id = ${sessionId})
    where id = ${sessionId}
  `;
}

async function frontierSeq(sessionId: string): Promise<number | null> {
  const { getNextItemForSession } = await import("@/lib/session/anonymous");
  const item = await getNextItemForSession(sessionId);
  return item?.sequence_number ?? null;
}

const range = (n: number) => Array.from({ length: n }, (_, i) => i + 1);

describe("REGRESION DEL FREE: sin huecos, la frontera no cambio", () => {
  // Este bloque es el criterio de aceptacion que protege el embudo vivo. Si
  // alguno de estos casos enrojece, la generalizacion ROMPIO el Free.
  for (const progress of [0, 1, TOTAL_ITEMS / 2, TOTAL_ITEMS - 1]) {
    itIfStack(
      `con ${progress} respuestas contiguas la frontera es el item ${progress + 1}`,
      async () => {
        expect(versionId).toBeTruthy();
        const sessionId = await makeSession(range(progress));
        expect(await frontierSeq(sessionId)).toBe(progress + 1);
      },
    );
  }

  itIfStack(
    "con los 60 respondidos la frontera es nula — el runner cierra el instrumento",
    async () => {
      const sessionId = await makeSession(range(TOTAL_ITEMS));
      expect(await frontierSeq(sessionId)).toBeNull();
    },
  );
});

describe("HUECOS: la frontera es el primer item SIN responder, no progress + 1", () => {
  itIfStack(
    "con {1, 2, 4, 7} respondidos la frontera es el 3, no el 5",
    async () => {
      // `progress` vale 4 aca, asi que la definicion contigua serviria el item
      // 5 — un item que el usuario nunca respondio, saltandose el 3. Esta es
      // LA asercion que falla contra la implementacion anterior.
      const sessionId = await makeSession([1, 2, 4, 7]);
      expect(await frontierSeq(sessionId)).toBe(3);
    },
  );

  itIfStack("al responder el 3, la frontera pasa al 5, no al 6", async () => {
    const sessionId = await makeSession([1, 2, 4, 7]);
    expect(await frontierSeq(sessionId)).toBe(3);
    await answer(sessionId, 3);
    // progress = 5 -> la definicion contigua serviria el 6. El 5 sigue sin
    // responder, asi que la frontera correcta es el 5.
    expect(await frontierSeq(sessionId)).toBe(5);
  });

  itIfStack(
    "el escenario REAL de D-10: 30 respuestas intercaladas del BFI-2-S",
    async () => {
      const db = await getSql();
      // Los huecos no se inventan: son exactamente los `item_code` del BFI-2-S
      // proyectados al espacio del 60. Si esta consulta devolviera otro
      // conjunto, el test dejaria de medir lo que dice medir.
      const carried = await db<{ sequence_number: number }[]>`
        select paid_item.sequence_number
        from item free_item
        join instrument_version free_iv on free_iv.id = free_item.instrument_version_id
        join instrument free_i on free_i.id = free_iv.instrument_id
        join item paid_item on paid_item.item_code = free_item.item_code
        where free_i.code = 'BFI-2-S'
          and paid_item.instrument_version_id = ${versionId as string}
        order by paid_item.sequence_number
      `;
      const seqs = carried.map((r) => r.sequence_number);
      expect(seqs).toHaveLength(30);
      // NO es un prefijo: ese es el hecho entero que rompe la contiguidad. El
      // conjunto arranca 1,2,3,4,5 y despues salta — el primer hueco esta en el
      // 6. Afirmar sobre los primeros cinco no discriminaria nada; lo que
      // discrimina es que el conjunto completo NO sea 1..30.
      expect(seqs).not.toEqual(range(30));

      const sessionId = await makeSession(seqs);
      const answered = new Set(seqs);
      const expected = range(TOTAL_ITEMS).find((s) => !answered.has(s));
      // Con la definicion contigua el runner serviria el item 31 (progress+1);
      // el primer item sin responder es el 6.
      expect(expected).toBe(6);
      expect(await frontierSeq(sessionId)).toBe(expected);

      // Y el recorrido COMPLETO: el runner tiene que servir exactamente los 30
      // que faltan, uno tras otro, sin repetir y sin congelarse.
      const served: number[] = [];
      for (let i = 0; i < TOTAL_ITEMS + 1; i++) {
        const next = await frontierSeq(sessionId);
        if (next == null) break;
        served.push(next);
        await answer(sessionId, next);
      }
      expect(served).toHaveLength(30);
      expect(new Set(served).size).toBe(30);
      expect(served).toEqual([...served].sort((a, b) => a - b));
      for (const s of served) expect(answered.has(s)).toBe(false);
    },
  );
});

describe("getAnsweredSequences: el conjunto que acota la vista de Atras", () => {
  itIfStack("devuelve exactamente las secuencias respondidas", async () => {
    const sessionId = await makeSession([1, 2, 4, 7]);
    const { getAnsweredSequences } = await import("@/lib/session/anonymous");
    const answered = await getAnsweredSequences(sessionId);
    expect([...answered].sort((a, b) => a - b)).toEqual([1, 2, 4, 7]);
  });

  itIfStack("una sesion sin respuestas devuelve el conjunto vacio", async () => {
    const sessionId = await makeSession([]);
    const { getAnsweredSequences } = await import("@/lib/session/anonymous");
    expect(await getAnsweredSequences(sessionId)).toEqual([]);
  });
});
