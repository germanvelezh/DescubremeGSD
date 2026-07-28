/**
 * Integration tests — Ley 1581 data rights endpoints (Plan 01-10 Task 1).
 *
 * Covers:
 *  - Test 1: GET /api/me/data (COMPL-05 derecho de consulta).
 *  - Test 2: PATCH /api/me/data (COMPL-06 rectificacion + anti-fraud DOB
 *    + psychometric integrity gate).
 *  - Test 3: DELETE /api/me/data (COMPL-07 borrado <=2 clicks +
 *    D1.5 cascade vs anonimizar policy).
 *
 * DB-gated per the project pattern (tests/integration/respond.test.ts):
 *  - When DATABASE_URL is absent, integration assertions `it.todo` so
 *    suite stays green. Plan 01-12 wires the CI Postgres stack.
 *  - One always-on assertion guarantees `passWithNoTests=false` happiness.
 *
 * In-process (no DB) checks that DO run:
 *  - Module-level imports succeed (route handler file exists + exports).
 *  - PATCH whitelist Zod schema rejects disallowed fields synchronously.
 *
 * Anchors:
 *  - 01-RESEARCH.md §"Derechos del titular" lines 1250-1274.
 *  - 01-CONTEXT.md D1.5 (BORRAR via cascade FK + ANONIMIZAR audit/usage/distress).
 *  - 01-PATTERNS.md §2.4 (app/api/me/*).
 *  - COMPL-05/06/07/09/10.
 */
// ---------------------------------------------------------------------------
// COMPL-07 / D1.5 — paso 4 de ADR-039, criterio #2.
//
// LA COBERTURA QUE HABIA NO AFIRMABA EL CRITERIO. `account-delete-2-clicks.spec.ts:42`
// afirma el flujo de 2 clics y el redirect a `/signup` deslogueado — o sea que
// **el boton funciona**. El criterio es otra cosa: que los datos efectivamente
// desaparezcan, que el rastro de auditoria se conserve anonimizado en vez de
// borrarse, y que la identidad de `auth.users` se vaya en la MISMA transaccion.
// Nada de eso lo miraba nadie.
//
// EL CONTRATO ESCRITO DECIA "7 TABLAS POR CASCADE" Y SON 6.
//
// Consultado contra la DB viva (`pg_constraint`, `confdeltype='c'`), las tablas
// con FK ON DELETE CASCADE a `public.user` son **seis**: assessment_session,
// computed_score, consent, feedback_event, item_response, report_snapshot. La
// septima del contrato es `waitlist`, que **no tiene FK** y la borra el handler
// por email en su Step 2 (`route.ts:365-376`). Un test escrito desde el
// comentario habria afirmado un mecanismo que no existe. Aca se afirman las dos
// vias por separado, porque fallan por causas distintas.
//
// EL CENTINELA DE LA ANONIMIZACION.
//
// `anonymize_user_audit` (mig 009) pone `actor_id = null` pero **NO toca
// `entity_id`**, y la fila que agrega al final lleva `entity_id =
// target_user_id::text`. Sin ese detalle las filas anonimizadas serian
// indistinguibles de cualquier otra fila con actor nulo y no se podria afirmar
// ni que se conservaron ni que se anonimizaron — el mismo problema de centinela
// que en `feedback-ownership.test.ts`. **`entity_id` es lo que las hace
// contables.**
//
// POR QUE EL USUARIO DE AUTH SE CREA POR LA ADMIN API Y NO POR SQL.
//
// El RPC borra `auth.users` en la misma transaccion, asi que para afirmar esa
// mitad tiene que haber fila. Insertarla por SQL exigiria reproducir a mano las
// columnas obligatorias de un esquema que no es nuestro; `auth.admin.createUser`
// es el mismo camino que usa la fixture de E2E y es el que se parece a
// produccion.
// ---------------------------------------------------------------------------

// @vitest-environment node
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

// -- Identidad scripteada (misma frontera que consent-revoke.test.ts) ---------

const state = vi.hoisted(() => ({ userId: null as string | null }));

vi.mock("@/lib/logger", () => ({
  logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

vi.mock("@/lib/tenant/jwt", () => ({
  getUserFromJWT: vi.fn(async () => {
    if (!state.userId) throw new Response("Unauthorized", { status: 401 });
    return { userId: state.userId, orgIds: [] };
  }),
}));

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

/** Cliente admin de Supabase, para crear y consultar el usuario de `auth.users`. */
async function getAuthAdmin() {
  const { createClient } = await import("@supabase/supabase-js");
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_ROLE_KEY as string,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}

const RUN = crypto.randomUUID().slice(0, 8);
const EMAIL = `compl07-${RUN}@test.local`;
let userId = "";

/** Las 6 tablas con FK ON DELETE CASCADE a public.user, leidas de pg_constraint. */
const CASCADE_TABLES = [
  "assessment_session",
  "computed_score",
  "consent",
  "feedback_event",
  "item_response",
  "report_snapshot",
] as const;

beforeAll(async () => {
  if (!HAS_STACK) return;
  const s = await getSql();
  const admin = await getAuthAdmin();

  // 1. Identidad real en auth.users.
  const { data: created, error: authErr } = await admin.auth.admin.createUser({
    email: EMAIL,
    email_confirm: true,
  });
  if (authErr || !created?.user) {
    throw new Error(`auth.admin.createUser fallo: ${authErr?.message ?? "sin user"}`);
  }
  userId = created.user.id;
  state.userId = userId;

  // 2. FKs de catalogo. Se toman de lo sembrado en vez de inventar literales:
  //    si los seeds no corrieron, esto falla ruidosamente (entorno roto).
  const [iv] = await s`select id from instrument_version order by id limit 1`;
  const [item] = await s`select id from item order by id limit 1`;
  const [rule] = await s`select id from scoring_rule order by id limit 1`;
  if (!iv?.id || !item?.id || !rule?.id) {
    throw new Error(
      "Faltan filas de catalogo (instrument_version / item / scoring_rule). Corre `supabase db reset`.",
    );
  }

  const sessionId = crypto.randomUUID();

  await s`insert into public.user ${s([{ id: userId, email: EMAIL }])}`;

  // 3. Una fila en cada una de las 6 tablas de cascade.
  await s`insert into public.assessment_session ${s([
    { id: sessionId, user_id: userId, instrument_version_id: iv.id },
  ])}`;
  await s`insert into public.item_response ${s([
    { session_id: sessionId, item_id: item.id, raw_value: 3 },
  ])}`;
  await s`insert into public.computed_score ${s([
    { user_id: userId, scoring_rule_id: rule.id, raw: 42, scoring_version: `v-${RUN}` },
  ])}`;
  await s`insert into public.consent ${s([
    {
      user_id: userId,
      product_code: "free",
      consent_version: "1.0.0",
      text_sha256_hash: `sha-${RUN}`,
      consent_general: true,
      consent_sensitive_data: true,
    },
  ])}`;
  await s`insert into public.report_snapshot ${s([
    {
      user_id: userId,
      session_id: sessionId,
      instrument_version_id: iv.id,
      narrative_version: `n-${RUN}`,
      occupation_set_version: `o-${RUN}`,
      html_payload: JSON.stringify({ run: RUN }),
    },
  ])}`;
  await s`insert into public.feedback_event ${s([
    { user_id: userId, stars: 5 },
  ])}`;

  // 4. La septima, SIN FK: se borra por email en el Step 2 del handler.
  await s`insert into public.waitlist ${s([{ email: EMAIL }])}`;

  // 5. Las 3 tablas que se ANONIMIZAN, no se borran.
  await s`insert into public.usage_log ${s([
    { user_id: userId, event_type: `evt-${RUN}` },
  ])}`;
  await s`insert into public.distress_event ${s([
    {
      user_id: userId,
      instrument_version_id: iv.id,
      // `action_taken` tiene CHECK con tres valores permitidos, asi que el
      // centinela unico va en `threshold_triggered`, que no lo tiene.
      threshold_triggered: `thr-${RUN}`,
      action_taken: "disclaimer_shown",
    },
  ])}`;
});

afterAll(async () => {
  if (!sql) return;
  // El usuario ya no existe si el test corrio: esto solo limpia si algo aborto
  // antes del DELETE. Las filas de audit_log NO se tocan — el trigger de la
  // migracion 004 lo prohibe (COMPL-09) y quedan anonimizadas por diseño.
  await sql`delete from public.waitlist where email = ${EMAIL}`;
  if (userId) await sql`delete from public.user where id = ${userId}`;
  await sql.end({ timeout: 5 });
  sql = null;
});

async function deleteMyData(): Promise<Response> {
  const { DELETE } = await import("@/app/api/me/data/route");
  return DELETE(
    new Request("http://localhost/api/me/data", {
      method: "DELETE",
      headers: { authorization: "Bearer test-token" },
    }),
  );
}

describe("Plan 01-10 Task 1 — GET /api/me/data (COMPL-05)", () => {
  it("module imports without throwing (file exists + exports GET/PATCH/DELETE)", async () => {
    const mod = await import("@/app/api/me/data/route");
    expect(typeof mod.GET).toBe("function");
    expect(typeof mod.PATCH).toBe("function");
    expect(typeof mod.DELETE).toBe("function");
  });

  // Behaviour contract (executable when DATABASE_URL is set in CI):
  //  1. Seed user + complete flow Wave 2+3 (signup, dual consent, 60 items, computed_score).
  //  2. Build Request with Authorization: Bearer <user JWT>.
  //  3. Invoke GET handler; expect status 200.
  //  4. Body parsed as JSON contains keys: user, item_responses,
  //     computed_scores, consents, audit_logs, report_snapshots.
  //  5. user.date_of_birth is plaintext (decrypted) or null (graceful
  //     fallback if PII shape mismatch — see [BUG-PII-STORAGE-PLAN-07]).
  //  6. headers['Content-Disposition'] starts with 'attachment'.
  //  7. audit_log row 'user_data_export' inserted with actor_id = user.id.
  it.todo("Test 1: GET with valid JWT returns user + responses + scores + consents + audit + reports");

  it.todo("Test 1b: GET without Authorization header returns 401");
});

describe("Plan 01-10 Task 1 — PATCH /api/me/data (COMPL-06)", () => {
  it("Test 2a: PATCH rejects unknown fields synchronously (DB-independent)", async () => {
    // The route handler must validate body via Zod strict schema BEFORE
    // touching the DB. We invoke the handler with a synthetic Request and
    // expect a 400 even without a DB connection because Zod rejection
    // happens before any DB call.
    //
    // Mock the JWT helper to short-circuit auth — Bearer header check is
    // synchronous string parsing. We rely on the actual handler being
    // exported and the rejection path being purely schema-side.
    //
    // This test does NOT exercise the DB path; it asserts the whitelist
    // contract is enforced at the schema layer.
    const { PATCH_BODY_SCHEMA } = await import("@/app/api/me/data/route");
    expect(PATCH_BODY_SCHEMA).toBeDefined();

    // Allowed fields: name + country_code only.
    const ok = PATCH_BODY_SCHEMA.safeParse({ name: "Maria", country_code: "MX" });
    expect(ok.success).toBe(true);

    // Anti-fraud: date_of_birth not editable.
    const dob = PATCH_BODY_SCHEMA.safeParse({ date_of_birth: "2000-01-01" });
    expect(dob.success).toBe(false);

    // Psychometric integrity: item_responses not editable.
    const items = PATCH_BODY_SCHEMA.safeParse({ item_responses: [] });
    expect(items.success).toBe(false);

    // Email is not editable via PATCH (must use auth flow).
    const email = PATCH_BODY_SCHEMA.safeParse({ email: "x@y.com" });
    expect(email.success).toBe(false);

    // Password is never an editable field on this endpoint.
    const pw = PATCH_BODY_SCHEMA.safeParse({ password: "hunter2" });
    expect(pw.success).toBe(false);

    // Consent toggles must go via /me/consent/revoke, not PATCH.
    const cg = PATCH_BODY_SCHEMA.safeParse({ consent_general: false });
    expect(cg.success).toBe(false);

    // COMPL-17 sentinel: user_id must NEVER be accepted from body anywhere
    // on these endpoints. The strict whitelist rejects it implicitly.
    const uid = PATCH_BODY_SCHEMA.safeParse({
      user_id: "00000000-0000-0000-0000-000000000000",
    });
    expect(uid.success).toBe(false);
  });

  // Behaviour contract:
  //  1. Seed user.
  //  2. PATCH body {name, country_code} -> 200.
  //  3. SELECT user; name_encrypted is non-null jsonb envelope
  //     (encryptPII ran; mig 011 ADR-009 §9.4 shape);
  //     country_code matches new value.
  //  4. audit_log row 'user_data_patch' inserted.
  it.todo("Test 2b: PATCH name + country_code -> 200 + UPDATE applied (DB-gated)");
});

describe("Plan 01-10 Task 1 — DELETE /api/me/data (COMPL-07 + D1.5)", () => {
  // Behaviour contract (D1.5 BORRAR vs ANONIMIZAR):
  //  BORRAR (cascade FK at schema level — Plan 01-04):
  //    item_response, computed_score, assessment_session, consent,
  //    report_snapshot, feedback_event, waitlist (by email match,
  //    not FK — see deviation in SUMMARY).
  //  ANONIMIZAR (set actor_id/user_id = null via anonymize_user_audit
  //  SECURITY DEFINER RPC):
  //    audit_log, usage_log, distress_event.
  //  AUTH:
  //    supabase.auth.admin.deleteUser(user.id) called outside DB tx.
  //
  // Steps:
  //  1. Seed user + complete flow.
  //  2. DELETE /api/me/data with Bearer.
  //  3. Expect 200 + body.redirect === '/me/delete/done'.
  //  4. Count rows in each table per the policy above.
  //  5. audit_log NEW row 'user_data_delete_completed' present (chain hash continues).
  //
  // Los cuatro de abajo corren EN ORDEN y comparten estado: 3a ejecuta el
  // borrado y 3b/3c/3d leen el mundo posterior. Es a proposito — el borrado es
  // irreversible y re-sembrarlo por test daria un fixture que no se parece a
  // produccion. Cada uno afirma una MITAD distinta del criterio, para que una
  // regresion nombre cual se rompio en vez de tumbar el bloque entero.

  itIfStack("Test 3a: DELETE responde 200 con redirect a /me/delete/done", async () => {
    const res = await deleteMyData();
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({
      ok: true,
      redirect: "/me/delete/done",
    });
  });

  itIfStack("Test 3b: D1.5 BORRAR — las 6 tablas de cascade quedan en cero, y waitlist tambien (por email, sin FK)", async () => {
    const s = await getSql();

    // `item_response` cuelga de assessment_session, no de user: se cuenta por
    // la sesion, que a su vez ya no existe. Se afirma sobre la tabla entera
    // filtrando por la fila sembrada de esta corrida.
    const conteos: Record<string, number> = {};
    for (const tabla of CASCADE_TABLES) {
      const [row] = await s`
        select count(*)::int as n from public.${s(tabla)}
        where ${
          tabla === "item_response"
            ? s`session_id in (select id from public.assessment_session where user_id = ${userId})`
            : s`user_id = ${userId}`
        }`;
      conteos[tabla] = row.n;
    }

    expect(conteos).toEqual({
      assessment_session: 0,
      computed_score: 0,
      consent: 0,
      feedback_event: 0,
      item_response: 0,
      report_snapshot: 0,
    });

    const [wl] = await s`
      select count(*)::int as n from public.waitlist where email = ${EMAIL}`;
    expect(wl.n).toBe(0);

    const [u] = await s`
      select count(*)::int as n from public.user where id = ${userId}`;
    expect(u.n).toBe(0);
  });

  itIfStack("Test 3c: D1.5 ANONIMIZAR — audit/usage/distress CONSERVAN la fila con el actor en null, y se agrega user_data_delete_completed", async () => {
    const s = await getSql();

    // El centinela es `entity_id`, que anonymize_user_audit NO toca. Sin el,
    // una fila con actor_id null es indistinguible de cualquier otra y no se
    // podria afirmar ni que se conservo ni que se anonimizo.
    const auditadas = await s`
      select actor_id, action from public.audit_log
      where entity_id = ${userId} order by action`;

    expect(auditadas.length).toBeGreaterThan(0);
    // Ninguna conserva el actor: eso es lo anonimizado.
    expect(auditadas.every((r) => r.actor_id === null)).toBe(true);
    // Y la accion del borrado sigue registrada: anonimizar no es borrar.
    expect(auditadas.map((r) => r.action)).toContain("user_data_delete_completed");
    expect(auditadas.map((r) => r.action)).toContain("user_account_delete");

    // usage_log y distress_event: la fila SIGUE, con user_id en null.
    const [usage] = await s`
      select count(*)::int as n from public.usage_log
      where event_type = ${`evt-${RUN}`} and user_id is null`;
    expect(usage.n).toBe(1);

    const [distress] = await s`
      select count(*)::int as n from public.distress_event
      where threshold_triggered = ${`thr-${RUN}`} and user_id is null`;
    expect(distress.n).toBe(1);
  });

  itIfStack("Test 3d: la identidad de auth.users desaparece en la misma transaccion", async () => {
    const admin = await getAuthAdmin();
    const { data, error } = await admin.auth.admin.getUserById(userId);
    // GoTrue devuelve error (404) o un user nulo, segun version: las dos
    // formas significan lo mismo y se aceptan las dos a proposito.
    expect(Boolean(error) || !data?.user).toBe(true);
  });
});

describe("Plan 01-10 Task 1 — contract documented", () => {
  it.todo("integration contract documented; runtime gated on DATABASE_URL");
});
