/**
 * Unit tests for POST /api/respond — gap-closure Plan 02-15.
 *
 * Pieza 3 del P0 [GAP-AUTH-4TEST-RUNTIME]. Cubre los tres defectos que hoy
 * dejan a /api/respond Phase-1-shaped:
 *
 *   - Test 1/2/3 (rango data-driven): el rango de raw_value se lee de
 *     likert_min/likert_max del instrumento (PERMA 0-10, TwIVI 1-6,
 *     O*NET 1-5 = regresion), no del `.min(1).max(5)` hardcodeado del Zod.
 *   - Test 4 (auth cookie SSR): un usuario logueado se autoriza por
 *     `getSupabaseServerClient().auth.getUser()` (cookie @supabase/ssr),
 *     sin authorization header. userId distinto -> 403.
 *   - Test 5 (consent gate, gate critico (a) D-E3.2): un instrumento
 *     sensitivity='high' sin consent_sensitive_data devuelve 403 ANTES del
 *     upsert (assertConsentActive en el boundary de escritura). Para
 *     sensitivity='normal' no se exige.
 *   - Test 6 (COMPL-17): body con `user_id` extra -> 400 (`.strict()`).
 *
 * El mock del admin client usa el scripted-builder de
 * `tests/unit/session/anonymous.test.ts` (resultado por `${table}.${op}`)
 * porque la ruta consulta dos tablas (assessment_session + item) y hace el
 * upsert sobre item_response — el `createMockSupabaseClient` de setup.ts
 * no modela el shape por-tabla. `getInstrumentVersionMeta`, `advanceProgress`,
 * `readAnonymousCookie` y `assertConsentActive` se mockean directo.
 *
 * Anchors:
 *  - 02-15-PLAN.md tasks 1/2.
 *  - lib/session/anonymous.ts getInstrumentVersionMeta (likertMin/Max + sensitivity).
 *  - lib/consent/guard.ts assertConsentActive (lanza Response 403).
 *  - lib/supabase/server.ts getSupabaseServerClient (cookie SSR auth).
 */
// @vitest-environment node
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

// -- Hoisted mutable state shared across mocks --------------------------------

const state = vi.hoisted(() => ({
  // assessment_session row returned by the admin select.
  session: {
    id: "55555555-5555-5555-5555-555555555555",
    user_id: null as string | null,
    anonymous_session_id: "anon-cookie-abc" as string | null,
    instrument_version_id: "iv-1",
    progress: 0,
  },
  // item row returned by the admin select (belongs to the session version).
  item: {
    id: "11111111-1111-1111-1111-111111111111",
    instrument_version_id: "iv-1",
    sequence_number: 1,
  },
  // getInstrumentVersionMeta scripted return.
  meta: {
    instrumentCode: "PERMA",
    itemCount: 23,
    likertMin: 0 as number | null,
    likertMax: 10 as number | null,
    visualType: null as string | null,
    sensitivity: "high",
    ethicalFlags: null as unknown,
  } as Record<string, unknown> | null,
  // Cookie value readAnonymousCookie returns.
  anonCookie: "anon-cookie-abc" as string | null,
  // getUser() (cookie SSR) returns this user.
  authUserId: null as string | null,
  // assertConsentActive: when set, throws this Response.
  consentThrows: null as Response | null,
  // spies
  upsertCalls: 0,
  consentCalls: 0,
}));

vi.mock("@/lib/logger", () => ({
  logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

// Mock the anonymous-session module: keep the runtime helpers scripted and
// re-export the cookie name so the route's named import resolves.
vi.mock("@/lib/session/anonymous", () => ({
  ANONYMOUS_COOKIE_NAME: "anonymous_session_id",
  readAnonymousCookie: vi.fn(async () => state.anonCookie),
  advanceProgress: vi.fn(async () => state.session.progress),
  getInstrumentVersionMeta: vi.fn(async () => state.meta),
}));

vi.mock("@/lib/consent/guard", () => ({
  assertConsentActive: vi.fn(async () => {
    state.consentCalls += 1;
    if (state.consentThrows) throw state.consentThrows;
  }),
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

// Admin client: scripted per-table builder. select->maybeSingle returns the
// scripted row for the table; item_response.upsert records the call.
vi.mock("@/lib/supabase/service-role", () => ({
  getSupabaseAdminClient: vi.fn(() => {
    function makeBuilder(table: string) {
      const builder: Record<string, unknown> = {};
      builder.select = vi.fn(() => builder);
      builder.eq = vi.fn(() => builder);
      builder.is = vi.fn(() => builder);
      builder.maybeSingle = vi.fn(async () => {
        if (table === "assessment_session") {
          return { data: state.session, error: null };
        }
        if (table === "item") {
          return { data: state.item, error: null };
        }
        return { data: null, error: null };
      });
      builder.upsert = vi.fn(async () => {
        if (table === "item_response") state.upsertCalls += 1;
        return { error: null };
      });
      return builder;
    }
    return { from: vi.fn((table: string) => makeBuilder(table)) };
  }),
}));

// -- Helpers ------------------------------------------------------------------

const SESSION_ID = "55555555-5555-5555-5555-555555555555";
const ITEM_ID = "11111111-1111-1111-1111-111111111111";

async function invoke(body: Record<string, unknown>): Promise<Response> {
  const { POST } = await import("@/app/api/respond/route");
  const req = new Request("http://localhost/api/respond", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  return POST(req);
}

beforeEach(() => {
  // Default fixture: anonymous session, cookie matches, normal-sensitivity
  // O*NET-like meta, no consent throw. Each test overrides the one variable
  // it isolates.
  state.session = {
    id: SESSION_ID,
    user_id: null,
    anonymous_session_id: "anon-cookie-abc",
    instrument_version_id: "iv-1",
    progress: 0,
  };
  state.item = {
    id: ITEM_ID,
    instrument_version_id: "iv-1",
    sequence_number: 1,
  };
  state.meta = {
    instrumentCode: "ONET-IP",
    itemCount: 60,
    likertMin: 1,
    likertMax: 5,
    visualType: null,
    sensitivity: "normal",
    ethicalFlags: null,
  };
  state.anonCookie = "anon-cookie-abc";
  state.authUserId = null;
  state.consentThrows = null;
  state.upsertCalls = 0;
  state.consentCalls = 0;
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("POST /api/respond — multi-escala + auth cookie + consent gate (02-15)", () => {
  // -- Test 1: rango data-driven, PERMA 0-10 ---------------------------------
  test("Test 1: PERMA (likert 0..10) acepta 0 y 10, rechaza 11 con 400", async () => {
    state.meta = {
      instrumentCode: "PERMA",
      itemCount: 23,
      likertMin: 0,
      likertMax: 10,
      visualType: null,
      sensitivity: "normal",
      ethicalFlags: null,
    };

    const lo = await invoke({ item_id: ITEM_ID, raw_value: 0, session_id: SESSION_ID });
    expect(lo.status).toBe(200);

    const hi = await invoke({ item_id: ITEM_ID, raw_value: 10, session_id: SESSION_ID });
    expect(hi.status).toBe(200);

    const over = await invoke({ item_id: ITEM_ID, raw_value: 11, session_id: SESSION_ID });
    expect(over.status).toBe(400);
  });

  // -- Test 2: rango data-driven, TwIVI 1-6 ----------------------------------
  test("Test 2: TwIVI (likert 1..6) acepta 6, rechaza 0 con 400", async () => {
    state.meta = {
      instrumentCode: "TwIVI",
      itemCount: 20,
      likertMin: 1,
      likertMax: 6,
      visualType: null,
      sensitivity: "normal",
      ethicalFlags: null,
    };

    const ok = await invoke({ item_id: ITEM_ID, raw_value: 6, session_id: SESSION_ID });
    expect(ok.status).toBe(200);

    const under = await invoke({ item_id: ITEM_ID, raw_value: 0, session_id: SESSION_ID });
    expect(under.status).toBe(400);
  });

  // -- Test 3: regresion O*NET 1-5 (default cuando null) ---------------------
  test("Test 3: O*NET (likert 1..5, o null/null -> default 1..5) acepta 5, rechaza 6", async () => {
    state.meta = {
      instrumentCode: "ONET-IP",
      itemCount: 60,
      likertMin: null,
      likertMax: null,
      visualType: null,
      sensitivity: "normal",
      ethicalFlags: null,
    };

    const ok = await invoke({ item_id: ITEM_ID, raw_value: 5, session_id: SESSION_ID });
    expect(ok.status).toBe(200);

    const over = await invoke({ item_id: ITEM_ID, raw_value: 6, session_id: SESSION_ID });
    expect(over.status).toBe(400);
  });

  // -- Test 4: auth cookie SSR -----------------------------------------------
  test("Test 4: usuario logueado autorizado por cookie SSR getUser(); userId distinto -> 403", async () => {
    state.session = {
      id: SESSION_ID,
      user_id: "user-logged-1",
      anonymous_session_id: null,
      instrument_version_id: "iv-1",
      progress: 0,
    };
    // normal sensitivity so the consent gate does not fire; isolate auth.
    state.meta = {
      instrumentCode: "ONET-IP",
      itemCount: 60,
      likertMin: 1,
      likertMax: 5,
      visualType: null,
      sensitivity: "normal",
      ethicalFlags: null,
    };

    // getUser returns the matching user (no authorization header).
    state.authUserId = "user-logged-1";
    const ok = await invoke({ item_id: ITEM_ID, raw_value: 3, session_id: SESSION_ID });
    expect(ok.status).toBe(200);

    // getUser returns a different user -> forbidden.
    state.authUserId = "someone-else";
    const forbidden = await invoke({
      item_id: ITEM_ID,
      raw_value: 3,
      session_id: SESSION_ID,
    });
    expect(forbidden.status).toBe(403);
  });

  // -- Test 5: consent gate (gate critico (a)) -------------------------------
  test("Test 5: sensitivity=high sin consent -> 403 ANTES del upsert; normal no exige consent", async () => {
    state.session = {
      id: SESSION_ID,
      user_id: "user-logged-1",
      anonymous_session_id: null,
      instrument_version_id: "iv-1",
      progress: 0,
    };
    state.authUserId = "user-logged-1";
    state.meta = {
      instrumentCode: "BFI-2",
      itemCount: 60,
      likertMin: 1,
      likertMax: 5,
      visualType: null,
      sensitivity: "high",
      ethicalFlags: null,
    };
    state.consentThrows = new Response("Sensitive data consent required", {
      status: 403,
    });

    const blocked = await invoke({
      item_id: ITEM_ID,
      raw_value: 3,
      session_id: SESSION_ID,
    });
    expect(blocked.status).toBe(403);
    // Gate critico (a): el upsert NO se invoco.
    expect(state.upsertCalls).toBe(0);
    expect(state.consentCalls).toBe(1);

    // sensitivity normal: no se exige assertConsentActive, el write procede.
    state.meta = {
      instrumentCode: "ONET-IP",
      itemCount: 60,
      likertMin: 1,
      likertMax: 5,
      visualType: null,
      sensitivity: "normal",
      ethicalFlags: null,
    };
    state.consentThrows = null;
    state.consentCalls = 0;
    state.upsertCalls = 0;
    const ok = await invoke({ item_id: ITEM_ID, raw_value: 3, session_id: SESSION_ID });
    expect(ok.status).toBe(200);
    expect(state.consentCalls).toBe(0);
    expect(state.upsertCalls).toBe(1);
  });

  // -- Test 6: COMPL-17 .strict() --------------------------------------------
  test("Test 6: body con user_id extra -> 400 (.strict() intacto)", async () => {
    const res = await invoke({
      item_id: ITEM_ID,
      raw_value: 3,
      session_id: SESSION_ID,
      user_id: "attacker-supplied",
    });
    expect(res.status).toBe(400);
    expect(state.upsertCalls).toBe(0);
  });
});
