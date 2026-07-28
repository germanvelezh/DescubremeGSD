/**
 * Integration tests — POST /api/feedback ownership check (Plan 01-09 Task 2,
 * IDOR mitigation follow-up from background security review on commit 4f09666).
 *
 * Threat (now mitigated AND guarded): the original handler trusted the
 * `sessionId` from the request body and inserted feedback_event with
 * `user_id = JWT.sub` without verifying that the JWT user actually owned the
 * session. An authenticated user A could submit feedback against user B's
 * session, polluting B's report metrics and creating an attribution mismatch
 * (row tagged A, linked to B's session). The follow-up commit adds an
 * ownership check that returns 404 for any non-owner caller.
 *
 * ESTADO DE LA COBERTURA — cierre de `[GAP-COMPL17-FEEDBACK-IDOR-SIN-GUARD]`.
 *
 * Los 3 primeros tests (import + Zod strict + rangos) son de contrato de
 * entrada y NO son la mitigacion IDOR. Los 5 siguientes SI la ejercitan:
 * hasta este PR estaban declarados con `it.todo` (paso 3 de ADR-039), y antes
 * de eso eran huecos que reportaban `passed` con `expect(true).toBe(true)` —
 * por eso la auditoria original los clasifico como cobertura REAL. Este
 * archivo sigue siendo **el unico de toda la suite que toca `/api/feedback`**.
 *
 * POR QUE EL ADMIN CLIENT VA REAL Y LA IDENTIDAD MOCKEADA.
 *
 * La mitigacion no es una rama sobre un fixture: es *leer la fila real de
 * `assessment_session` y comparar el dueño contra quien llama*. Mockear
 * `@/lib/supabase/service-role` (como hace `respond-multiscale.test.ts`)
 * probaria el `if`, no el control — el lookup quedaria scripteado por el
 * propio test. Asi que el service-role se deja real contra el stack local y
 * las filas se siembran de verdad por `pg`.
 *
 * Lo que si se mockea es la **identidad**, porque aqui no hay servidor HTTP:
 * `next/headers` y `getSupabaseServerClient()` no tienen request de donde
 * leer cookie ni JWT. Es la frontera correcta — se simula quien llama, no lo
 * que el control consulta.
 *
 * EL CENTINELA, Y POR QUE HACE FALTA.
 *
 * `feedback_event` no tiene columna de sesion: sus campos son `user_id`,
 * `report_snapshot_id`, `stars`, `text_free`. En el camino anonimo el handler
 * escribe `user_id = null` y `report_snapshot_id = null` (no hay snapshot
 * sembrado), asi que la fila resultante es **indistinguible de cualquier otra
 * fila anonima de la tabla**. Un `count(*)` global no podria afirmar ni "se
 * inserto la mia" ni "no se inserto ninguna". Cada test manda un centinela
 * unico en `text` y consulta por el.
 *
 * LA COMPUERTA VA SOBRE LAS TRES ENV VARS.
 *
 * Sembrar necesita `DATABASE_URL`; el lookup del handler va por PostgREST y
 * necesita `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`. Gatear
 * solo por `DATABASE_URL` le daria un rojo confuso a una maquina con Postgres
 * pero sin stack, en vez de un skip honesto. Los 3 tests de 400 quedan **sin
 * gatear**: mueren en Zod antes de tocar el admin client.
 *
 * `Nota para quien lea el early-return de beforeAll:` no es el genero del pase
 * vacuo (`if (!c) return;` con aserciones despues, ver `audit-immutable`).
 * Aqui los tests estan gateados por la MISMA condicion, asi que sin stack se
 * declaran `skipped`, nunca `passed`.
 *
 * Anchors:
 *  - 01-UI-SPEC.md §7.6 (survey).
 *  - 01-CONTEXT.md D3.4 (anonymous self-report allowed).
 *  - COMPL-17 (Zod strict input validation) — registro en
 *    `tests/lint/compliance-guard-map.test.ts`.
 *  - Threat: IDOR (Insecure Direct Object Reference).
 *  - app/api/feedback/route.ts:100-120 (las dos ramas que devuelven 404).
 */
// @vitest-environment node
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

// -- Identidad scripteada, compartida con los mocks ---------------------------
// Patron `vi.hoisted` tomado de tests/unit/api/respond-multiscale.test.ts: los
// mocks son de modulo, asi que cada test cambia quien llama mutando este objeto.

const state = vi.hoisted(() => ({
  /** getUser() (cookie SSR) devuelve este usuario. null = anonimo. */
  authUserId: null as string | null,
  /** Valor de la cookie `anonymous_session_id`. null = sin cookie. */
  anonCookie: null as string | null,
}));

vi.mock("@/lib/logger", () => ({
  logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

vi.mock("next/headers", () => ({
  cookies: vi.fn(async () => ({
    get: (name: string) =>
      name === "anonymous_session_id" && state.anonCookie
        ? { name, value: state.anonCookie }
        : undefined,
  })),
}));

vi.mock("@/lib/supabase/server", () => ({
  getSupabaseServerClient: vi.fn(async () => ({
    auth: {
      getUser: vi.fn(async () => ({
        data: { user: state.authUserId ? { id: state.authUserId } : null },
        error: null,
      })),
    },
  })),
}));

// -- Compuerta ----------------------------------------------------------------

const HAS_STACK = Boolean(
  process.env.DATABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY,
);
const itIfStack = it.skipIf(!HAS_STACK);

// -- Cliente Postgres ---------------------------------------------------------
//
// El driver es `postgres` (postgres.js, dependencia declarada), NO `pg`.
// `audit-immutable.test.ts` importa `pg`, que **no esta instalado**, y se traga
// el fallo con `.catch(() => ({ Client: null }))` + `if (!c) return;`: sus 3
// tests pasan en verde contra un DATABASE_URL apuntando a un host inexistente.
// Por eso aqui el import va SIN `.catch()` — si el driver no resuelve, este
// archivo tiene que ponerse rojo, no verde.

type Sql = ReturnType<typeof import("postgres").default>;

let sql: Sql | null = null;

async function getSql(): Promise<Sql> {
  if (sql) return sql;
  const { default: postgres } = await import("postgres");
  sql = postgres(process.env.DATABASE_URL as string, { max: 2 });
  return sql;
}

// -- Fixtures -----------------------------------------------------------------

/** Sufijo unico por corrida: aisla filas y centinelas de corridas paralelas. */
const RUN = crypto.randomUUID().slice(0, 8);
const sentinel = (key: string) => `idor-guard-${RUN}-${key}`;

const userA = crypto.randomUUID();
const userB = crypto.randomUUID();
const sessionOfA = crypto.randomUUID();
const sessionOfB = crypto.randomUUID();
const anonSessionX = crypto.randomUUID();
const anonSessionY = crypto.randomUUID();
const anonCookieX = `anon-cookie-x-${RUN}`;
const anonCookieY = `anon-cookie-y-${RUN}`;

beforeAll(async () => {
  if (!HAS_STACK) return;
  const s = await getSql();

  // instrument_version_id es NOT NULL con FK: se toma uno sembrado en vez de
  // inventar un literal. Si los seeds no corrieron, esto falla ruidosamente
  // (entorno roto), que es lo correcto — CI verifica que los seeds se aplican.
  const versions = await s`select id from instrument_version order by id limit 1`;
  const instrumentVersionId = versions[0]?.id;
  if (!instrumentVersionId) {
    throw new Error(
      "No hay filas en instrument_version — el stack esta arriba pero sin seeds. Corre `supabase db reset`.",
    );
  }

  await s`insert into public.user ${s([
    { id: userA, email: `idor-a-${RUN}@test.local` },
    { id: userB, email: `idor-b-${RUN}@test.local` },
  ])}`;

  await s`insert into public.assessment_session ${s([
    {
      id: sessionOfA,
      user_id: userA,
      anonymous_session_id: null,
      instrument_version_id: instrumentVersionId,
    },
    {
      id: sessionOfB,
      user_id: userB,
      anonymous_session_id: null,
      instrument_version_id: instrumentVersionId,
    },
    {
      id: anonSessionX,
      user_id: null,
      anonymous_session_id: anonCookieX,
      instrument_version_id: instrumentVersionId,
    },
    {
      id: anonSessionY,
      user_id: null,
      anonymous_session_id: anonCookieY,
      instrument_version_id: instrumentVersionId,
    },
  ])}`;
});

afterAll(async () => {
  if (!sql) return;
  // Orden por FK: feedback_event -> assessment_session -> user.
  await sql`delete from public.feedback_event where text_free like ${`idor-guard-${RUN}-%`}`;
  await sql`delete from public.assessment_session where id in ${sql([
    sessionOfA,
    sessionOfB,
    anonSessionX,
    anonSessionY,
  ])}`;
  await sql`delete from public.user where id in ${sql([userA, userB])}`;
  await sql.end();
  sql = null;
});

// -- Helpers ------------------------------------------------------------------

async function invoke(body: Record<string, unknown>): Promise<Response> {
  const { POST } = await import("@/app/api/feedback/route");
  return POST(
    new Request("http://test.local/api/feedback", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    }),
  );
}

/** Filas de feedback_event escritas por este test, halladas por su centinela. */
async function rowsFor(text: string) {
  const s = await getSql();
  return s`select user_id, report_snapshot_id from public.feedback_event where text_free = ${text}`;
}

describe("Plan 01-09 Task 2 — POST /api/feedback (IDOR mitigation)", () => {
  it("module imports without throwing (file exists + exports POST)", async () => {
    const mod = await import("@/app/api/feedback/route");
    expect(typeof mod.POST).toBe("function");
    expect(mod.runtime).toBe("nodejs");
  });

  it("rejects body with unknown fields (Zod strict — COMPL-17)", async () => {
    const mod = await import("@/app/api/feedback/route");
    const req = new Request("http://test.local/api/feedback", {
      method: "POST",
      headers: { "content-type": "application/json" },
      // user_id is the IDOR vector the original Zod schema already
      // rejected — verify the strict-mode wall is still up.
      body: JSON.stringify({
        sessionId: "00000000-0000-0000-0000-000000000000",
        stars: 5,
        user_id: "attacker-supplied",
      }),
    });
    const res = await mod.POST(req);
    expect(res.status).toBe(400);
    const body = (await res.json()) as { error: string };
    expect(body.error).toBe("invalid_body");
  });

  it("rejects body with stars out of range", async () => {
    const mod = await import("@/app/api/feedback/route");
    const req = new Request("http://test.local/api/feedback", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        sessionId: "00000000-0000-0000-0000-000000000000",
        stars: 0,
      }),
    });
    const res = await mod.POST(req);
    expect(res.status).toBe(400);
  });

  it("rejects body with non-uuid sessionId", async () => {
    const mod = await import("@/app/api/feedback/route");
    const req = new Request("http://test.local/api/feedback", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ sessionId: "not-a-uuid", stars: 3 }),
    });
    const res = await mod.POST(req);
    expect(res.status).toBe(400);
  });

  // --- DB-gated ownership invariants (Plan 01-12 CI Postgres) ---

  itIfStack(
    "authenticated user A submitting against user B's session returns 404 (IDOR blocked)",
    async () => {
      const text = sentinel("a-vs-b");
      state.authUserId = userA;
      state.anonCookie = null;

      const res = await invoke({ sessionId: sessionOfB, stars: 5, text });

      expect(res.status).toBe(404);
      expect(await res.json()).toEqual({ error: "not_found" });
      // La mitigacion no es solo el status: nada debe haberse escrito contra
      // la sesion de B. Sin esta asercion un handler que devuelva 404 DESPUES
      // de insertar pasaria igual.
      expect(await rowsFor(text)).toHaveLength(0);
    },
  );

  itIfStack(
    "anonymous caller submitting against another anon's session returns 404",
    async () => {
      const text = sentinel("anon-vs-anon");
      state.authUserId = null;
      state.anonCookie = anonCookieX;

      const res = await invoke({ sessionId: anonSessionY, stars: 4, text });

      expect(res.status).toBe(404);
      expect(await res.json()).toEqual({ error: "not_found" });
      expect(await rowsFor(text)).toHaveLength(0);
    },
  );

  itIfStack(
    "anonymous caller with matching cookie can submit feedback for own session (D3.4)",
    async () => {
      const text = sentinel("anon-own");
      state.authUserId = null;
      state.anonCookie = anonCookieX;

      const res = await invoke({ sessionId: anonSessionX, stars: 3, text });

      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({ ok: true });
      // D3.4: el self-report anonimo se acepta y se guarda SIN user_id.
      const rows = await rowsFor(text);
      expect(rows).toHaveLength(1);
      expect(rows[0]?.user_id).toBeNull();
    },
  );

  itIfStack("authenticated user can submit feedback for own session", async () => {
    const text = sentinel("auth-own");
    state.authUserId = userA;
    state.anonCookie = null;

    const res = await invoke({ sessionId: sessionOfA, stars: 5, text });

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    // El user_id sale del JWT, nunca del body (COMPL-17).
    const rows = await rowsFor(text);
    expect(rows).toHaveLength(1);
    expect(rows[0]?.user_id).toBe(userA);
  });

  itIfStack("non-existent sessionId returns 404 (does not leak existence)", async () => {
    const text = sentinel("ghost");
    state.authUserId = userA;
    state.anonCookie = null;

    const res = await invoke({ sessionId: crypto.randomUUID(), stars: 2, text });

    // Mismo cuerpo y mismo status que el mismatch de ownership: quien camina
    // el espacio de UUIDs no puede distinguir "no existe" de "no es tuya".
    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({ error: "not_found" });
    expect(await rowsFor(text)).toHaveLength(0);
  });
});
