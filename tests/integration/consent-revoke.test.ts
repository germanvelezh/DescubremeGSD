/**
 * Integration tests — POST /api/me/consent/revoke (Plan 01-10 Task 1).
 *
 * Cierra COMPL-08, paso 4 de ADR-039. **Era el unico de los nueve criterios de
 * la auditoria con hueco Y cobertura CERO**: el guard filtra
 * `.is("revoked_at", null)` (`lib/consent/guard.ts:64`) pero los 5 tests de
 * `tests/unit/consent/guard.test.ts` fijan `revoked_at: null` (L35/56/77/111),
 * y el unico `revoked_at` no-nulo en contexto de asercion en todo `tests/` era
 * el `it.todo` que este archivo reemplaza.
 *
 * POR QUE NINGUN TEST UNITARIO PODIA CUBRIRLO — y es la razon de que esto viva
 * en integracion y no al lado de los otros cinco.
 *
 * El control de COMPL-08 **no es una rama de codigo**: `assertConsentActive` no
 * tiene ningun `if (revoked_at)`. Es el **filtro de la query** — una fila
 * revocada simplemente no aparece, `data` queda null y cae en el 403 de
 * "Consent required". Y los 5 tests unitarios usan `createMockSupabaseClient`,
 * cuyo `chain()` devuelve el cliente **sin mirar la cadena** (`tests/setup.ts`),
 * asi que el `.is()` es un no-op ahi. Ponerle `revoked_at: "2026-..."` al mock
 * probaria el mock, no el filtro. **Un filtro de query solo se ejercita contra
 * PostgREST de verdad.**
 *
 * LA ASERCION CENTRAL ES UN DELTA DE LA MISMA ENTRADA.
 *
 * Test 4c llama `assertConsentActive(admin, userId, 'free', 'high')` **dos
 * veces con los mismos argumentos**: antes de revocar (no debe lanzar) y
 * despues (debe lanzar 403). La mitad "antes" no es adorno — sin ella, un seed
 * roto (consentimiento que nunca existio, o version stale que da 412) produce
 * igualmente un 403 al final y el test pasaria **habiendo probado nada**. El
 * delta ES la prueba; una sola direccion no lo es.
 *
 * Por eso tambien se afirma el **cuerpo** de la Response y no solo el status:
 * el guard devuelve 403 por tres causas distintas —lookup fallido, fila
 * ausente, consentimiento sensible faltante— y solo una es la que este test
 * dice vigilar.
 *
 * QUE SE MOCKEA Y QUE NO.
 *
 * Solo la **identidad** (`@/lib/tenant/jwt`), que es lo unico que no existe sin
 * servidor HTTP: `getUserFromJWT` valida el Bearer contra GoTrue y aqui no hay
 * JWT real que emitir. El **admin client va REAL**, igual que en
 * `feedback-ownership.test.ts`: la mitigacion es que la query no vea la fila
 * revocada, asi que mockear el cliente probaria el `if` y no el control.
 *
 * `consent_version` se siembra desde `CURRENT_CONSENT_VERSIONS`, no desde un
 * literal: hardcodear "1.0.0" haria que un bump futuro rompa la precondicion
 * con un **412** y el test siga verde por el 403 de la segunda mitad — leyendo
 * como "el guard funciona" sin haber llegado nunca a la revocacion.
 *
 * Anchors:
 *  - 01-RESEARCH.md §"Consent revocation" lines 1224-1248.
 *  - 01-PATTERNS.md §2.4.
 *  - COMPL-08 — registro en `tests/lint/compliance-guard-map.test.ts`.
 *  - estado/DECISIONS_LOG.md ADR-039 (orden de remediacion, COMPL-08 = #1).
 *  - app/api/me/consent/revoke/route.ts:75-99 (UPDATE scopeado + writeAudit).
 *  - lib/consent/guard.ts:64 (el filtro que ES el control).
 */
// @vitest-environment node
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

// -- Identidad scripteada -----------------------------------------------------
// Patron `vi.hoisted` de tests/integration/feedback-ownership.test.ts: el mock
// es de modulo, asi que el test cambia quien llama mutando este objeto.

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

// -- Compuerta ----------------------------------------------------------------
//
// Sobre las TRES env vars, no solo `DATABASE_URL`: sembrar necesita Postgres,
// pero el UPDATE del handler y el SELECT del guard van por PostgREST. Gatear
// solo por la primera le daria un rojo confuso a una maquina con Postgres pero
// sin stack, en vez de un skip honesto.

const HAS_STACK = Boolean(
  process.env.DATABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY,
);
const itIfStack = it.skipIf(!HAS_STACK);

// -- Cliente Postgres ---------------------------------------------------------
//
// Driver `postgres` (postgres.js, dependencia declarada), NO `pg` — que no esta
// instalado y era la causa de que `audit-immutable.test.ts` pasara sin tocar
// ninguna DB (#56). El import va SIN `.catch()`: si no resuelve, esto se pone
// rojo, no verde.

type Sql = ReturnType<typeof import("postgres").default>;

let sql: Sql | null = null;

async function getSql(): Promise<Sql> {
  if (sql) return sql;
  const { default: postgres } = await import("postgres");
  sql = postgres(process.env.DATABASE_URL as string, { max: 2 });
  return sql;
}

// -- Fixtures -----------------------------------------------------------------

/** Sufijo unico por corrida: aisla filas de corridas paralelas. */
const RUN = crypto.randomUUID().slice(0, 8);
const userId = crypto.randomUUID();

/** POST contra el handler real. El Bearer es decorativo: la identidad la fija `state`. */
async function postRevoke(body: unknown): Promise<Response> {
  const { POST } = await import("@/app/api/me/consent/revoke/route");
  return POST(
    new Request("http://localhost/api/me/consent/revoke", {
      method: "POST",
      headers: {
        authorization: "Bearer test-token",
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    }),
  );
}

beforeAll(async () => {
  if (!HAS_STACK) return;
  const s = await getSql();
  const { CURRENT_CONSENT_VERSIONS } = await import("@/lib/consent/versions");

  await s`insert into public.user ${s([
    { id: userId, email: `compl08-${RUN}@test.local` },
  ])}`;

  // UNA sola fila activa. El indice unico parcial
  // `consent_user_product_active_idx` lo garantiza, y hace falta: el guard usa
  // `.maybeSingle()`, y dos filas darian un error de PostgREST que el guard
  // traduce a 403 "Consent lookup failed" — el status correcto por la razon
  // equivocada, indistinguible del control que este archivo dice vigilar.
  await s`insert into public.consent ${s([
    {
      user_id: userId,
      product_code: "free",
      consent_version: CURRENT_CONSENT_VERSIONS.free,
      text_sha256_hash: `sha-fixture-${RUN}`,
      consent_general: true,
      consent_sensitive_data: true,
    },
  ])}`;

  state.userId = userId;
});

afterAll(async () => {
  if (!sql) return;
  // La fila de `audit_log` NO se borra, y no es un descuido: el trigger de la
  // migracion 004 lanza `audit_log is append-only` ante cualquier DELETE
  // —incluso con service_role— porque eso ES COMPL-09. Intentarlo hacia fallar
  // el teardown entero con los 5 tests en verde, que es el peor modo de fallo
  // posible: ruido que parece defecto del test. `actor_id` no tiene FK, asi
  // que la fila queda huerfana sin romper nada, con un UUID de esta corrida.
  await sql`delete from public.consent where user_id = ${userId}`;
  await sql`delete from public.user where id = ${userId}`;
  await sql.end({ timeout: 5 });
  sql = null;
});

describe("Plan 01-10 Task 1 — POST /api/me/consent/revoke (COMPL-08)", () => {
  it("module imports without throwing (file exists + exports POST)", async () => {
    const mod = await import("@/app/api/me/consent/revoke/route");
    expect(typeof mod.POST).toBe("function");
  });

  it("Test 4a: POST body schema accepts product_code and rejects unknown fields", async () => {
    const { POST_BODY_SCHEMA } = await import("@/app/api/me/consent/revoke/route");
    expect(POST_BODY_SCHEMA).toBeDefined();

    const ok = POST_BODY_SCHEMA.safeParse({ product_code: "free" });
    expect(ok.success).toBe(true);

    const invalid = POST_BODY_SCHEMA.safeParse({ product_code: "spaceship" });
    expect(invalid.success).toBe(false);

    const extra = POST_BODY_SCHEMA.safeParse({
      product_code: "free",
      user_id: "00000000-0000-0000-0000-000000000000",
    });
    expect(extra.success).toBe(false);
  });

  // ---------------------------------------------------------------------------
  // Los tres de abajo corren EN ORDEN y comparten estado: 4b revoca, y 4c/4d
  // leen el mundo posterior. Vitest ejecuta los `it` de un archivo en serie por
  // defecto, y el `beforeAll` siembra una sola vez a proposito — la revocacion
  // es irreversible por diseño (no hay ruta de re-consentimiento, ver ADR-035),
  // asi que re-sembrar por test daria un fixture que no se parece a produccion.
  // ---------------------------------------------------------------------------

  itIfStack("Test 4b: POST {product_code:'free'} responde 200 y deja revoked_at NO nulo", async () => {
    const s = await getSql();

    const antes = await s`
      select revoked_at from public.consent
      where user_id = ${userId} and product_code = 'free'`;
    expect(antes).toHaveLength(1);
    expect(antes[0].revoked_at).toBeNull();

    const res = await postRevoke({ product_code: "free" });
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({
      ok: true,
      product_code: "free",
    });

    const despues = await s`
      select revoked_at from public.consent
      where user_id = ${userId} and product_code = 'free'`;
    expect(despues).toHaveLength(1);
    expect(despues[0].revoked_at).not.toBeNull();
  });

  itIfStack("Test 4c: COMPL-08 — el guard PASA antes de revocar y LANZA 403 despues, con los mismos argumentos", async () => {
    const { assertConsentActive } = await import("@/lib/consent/guard");
    const { getSupabaseAdminClient } = await import("@/lib/supabase/service-role");
    const admin = getSupabaseAdminClient();
    const s = await getSql();

    // La fila ya quedo revocada en 4b. Se restaura para medir el delta con la
    // MISMA llamada — sin la mitad "antes", un seed roto daria 403 igual y este
    // test pasaria habiendo verificado nada.
    await s`
      update public.consent set revoked_at = null
      where user_id = ${userId} and product_code = 'free'`;

    // ANTES: el guard no lanza. Esto es lo que hace falsable a la segunda mitad.
    await expect(
      assertConsentActive(admin, userId, "free", "high"),
    ).resolves.toBeUndefined();

    await s`
      update public.consent set revoked_at = now()
      where user_id = ${userId} and product_code = 'free'`;

    // DESPUES: misma llamada, ahora lanza. Se afirma el CUERPO y no solo el
    // status porque el guard devuelve 403 por tres causas distintas y solo una
    // es la revocacion: una fila revocada desaparece del `.is("revoked_at",
    // null)`, deja `data` en null y cae en "Consent required".
    const lanzado = await assertConsentActive(
      admin,
      userId,
      "free",
      "high",
    ).then(
      () => null,
      (e: unknown) => e,
    );

    expect(lanzado).toBeInstanceOf(Response);
    const r = lanzado as Response;
    expect(r.status).toBe(403);
    await expect(r.text()).resolves.toBe("Consent required");
  });

  itIfStack("Test 4d: la revocacion deja rastro auditable — audit_log 'consent_revoked' con actor_id del usuario", async () => {
    const s = await getSql();

    const filas = await s`
      select action, entity_type, entity_id, actor_role
      from public.audit_log
      where actor_id = ${userId} and action = 'consent_revoked'`;

    expect(filas).toHaveLength(1);
    expect(filas[0].entity_type).toBe("consent");
    expect(filas[0].entity_id).toBe("free");
    expect(filas[0].actor_role).toBe("authenticated");
  });
});
