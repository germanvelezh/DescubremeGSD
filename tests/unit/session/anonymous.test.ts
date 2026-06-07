/**
 * Unit tests for lib/session/anonymous.ts — Phase 1 Wave 3 (Plan 01-06).
 *
 * Covers Tasks 2 behavior block items 1, 2, 3:
 *   - getOrCreateAnonymousSession sin cookie crea row + setea cookie.
 *   - getOrCreateAnonymousSession con cookie existente retorna row sin INSERT.
 *   - getNextItemForSession retorna item con sequence_number = progress+1.
 *
 * Uses a hand-rolled Supabase mock because tests/setup.ts `createMockSupabaseClient`
 * does not model the per-table chain shape (`.from(...).select(...).eq(...).maybeSingle()`
 * returning distinct data per call). The local mock here is a thin
 * builder that records calls and replays scripted results.
 */
// @vitest-environment node
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

// -- Mocks (hoisted) ----------------------------------------------------------

const cookieStore = vi.hoisted(() => {
  const map = new Map<string, { value: string; options?: unknown }>();
  return {
    get: vi.fn((name: string) => {
      const v = map.get(name);
      return v ? { name, value: v.value } : undefined;
    }),
    set: vi.fn((name: string, value: string, options?: unknown) => {
      map.set(name, { value, options });
    }),
    delete: vi.fn((name: string) => {
      map.delete(name);
    }),
    __reset: () => map.clear(),
    __raw: map,
  };
});

vi.mock("next/headers", () => ({
  cookies: vi.fn(async () => cookieStore),
}));

const supabaseScripts = vi.hoisted(() => ({
  calls: [] as Array<{
    table: string;
    op: string;
    payload?: unknown;
  }>,
  scripts: new Map<string, unknown>(),
}));

vi.mock("@/lib/supabase/service-role", () => ({
  getSupabaseAdminClient: vi.fn(() => {
    function makeBuilder(table: string) {
      const filters: Record<string, unknown> = {};
      let op = "select";
      let payload: unknown = undefined;

      const builder: Record<string, unknown> = {};
      builder.select = vi.fn((_cols?: string) => builder);
      builder.insert = vi.fn((p: unknown) => {
        op = "insert";
        payload = p;
        return builder;
      });
      builder.update = vi.fn((p: unknown) => {
        op = "update";
        payload = p;
        return builder;
      });
      builder.eq = vi.fn((col: string, val: unknown) => {
        filters[col] = val;
        return builder;
      });
      builder.order = vi.fn((_col: string, _opts?: unknown) => builder);
      builder.limit = vi.fn((_n: number) => builder);
      const resolve = async () => {
        supabaseScripts.calls.push({ table, op, payload });
        const key = `${table}.${op}`;
        const script = supabaseScripts.scripts.get(key);
        return script ?? { data: null, error: null };
      };
      builder.maybeSingle = vi.fn(resolve);
      builder.single = vi.fn(resolve);
      builder.then = vi.fn((onF: (v: unknown) => unknown) => resolve().then(onF));
      return builder;
    }
    return {
      from: vi.fn((table: string) => makeBuilder(table)),
    };
  }),
}));

// -- Tests --------------------------------------------------------------------

const INSTRUMENT_CODE = "ONET-IP-SF";
const VERSION_ID = "11111111-1111-1111-1111-111111111111";
const NEW_SESSION_ID = "22222222-2222-2222-2222-222222222222";

beforeEach(() => {
  cookieStore.__reset();
  supabaseScripts.calls.length = 0;
  supabaseScripts.scripts.clear();
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("lib/session/anonymous.ts", () => {
  test("Test 1 — sin cookie crea session con nanoid 30 + setea cookie 7d + INSERT con user_id=null", async () => {
    // Script: assessment_session.select returns null (no existing); instrument_version.select returns version; insert returns new row.
    supabaseScripts.scripts.set("assessment_session.select", {
      data: null,
      error: null,
    });
    supabaseScripts.scripts.set("instrument_version.select", {
      data: { id: VERSION_ID, instrument: { code: INSTRUMENT_CODE } },
      error: null,
    });
    supabaseScripts.scripts.set("assessment_session.insert", {
      data: {
        id: NEW_SESSION_ID,
        anonymous_session_id: "NEW_COOKIE_VALUE",
        user_id: null,
        instrument_version_id: VERSION_ID,
        status: "open",
        progress: 0,
        started_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 7 * 86400 * 1000).toISOString(),
        completed_at: null,
      },
      error: null,
    });

    const { getOrCreateAnonymousSession } = await import("@/lib/session/anonymous");
    const session = await getOrCreateAnonymousSession(INSTRUMENT_CODE);

    expect(session.id).toBe(NEW_SESSION_ID);
    expect(session.user_id).toBeNull();
    expect(session.progress).toBe(0);
    expect(session.status).toBe("open");

    // Cookie was set with nanoid-30-length value + 7d maxAge + httpOnly.
    const cookieSetCall = cookieStore.set.mock.calls[0];
    expect(cookieSetCall).toBeDefined();
    expect(cookieSetCall?.[0]).toBe("anonymous_session_id");
    expect((cookieSetCall?.[1] as string).length).toBe(30);
    const opts = cookieSetCall?.[2] as Record<string, unknown>;
    expect(opts.httpOnly).toBe(true);
    expect(opts.sameSite).toBe("lax");
    expect(opts.maxAge).toBe(60 * 60 * 24 * 7);

    // INSERT payload had user_id: null and the freshly minted cookie value.
    const insertCall = supabaseScripts.calls.find(
      (c) => c.table === "assessment_session" && c.op === "insert",
    );
    expect(insertCall).toBeDefined();
    const payload = insertCall?.payload as Record<string, unknown>;
    expect(payload.user_id).toBeNull();
    expect(payload.instrument_version_id).toBe(VERSION_ID);
    expect(payload.status).toBe("open");
    expect(payload.progress).toBe(0);
  });

  test("Test 2 — con cookie existente retorna session sin INSERT nuevo", async () => {
    cookieStore.set("anonymous_session_id", "EXISTING_COOKIE_VALUE_30CHARS_X");
    // Reset set spy after seeding (so we can assert no new set).
    cookieStore.set.mockClear();

    supabaseScripts.scripts.set("assessment_session.select", {
      data: {
        id: NEW_SESSION_ID,
        anonymous_session_id: "EXISTING_COOKIE_VALUE_30CHARS_X",
        user_id: null,
        instrument_version_id: VERSION_ID,
        status: "open",
        progress: 7,
        started_at: new Date().toISOString(),
        expires_at: new Date().toISOString(),
        completed_at: null,
      },
      error: null,
    });

    const { getOrCreateAnonymousSession } = await import("@/lib/session/anonymous");
    const session = await getOrCreateAnonymousSession(INSTRUMENT_CODE);

    expect(session.id).toBe(NEW_SESSION_ID);
    expect(session.progress).toBe(7);

    // No new INSERT call.
    const inserts = supabaseScripts.calls.filter(
      (c) => c.table === "assessment_session" && c.op === "insert",
    );
    expect(inserts.length).toBe(0);

    // Cookie was NOT re-set (already present).
    expect(cookieStore.set).not.toHaveBeenCalled();
  });

  test("Test 3 — getNextItemForSession retorna item con sequence_number = progress+1", async () => {
    supabaseScripts.scripts.set("assessment_session.select", {
      data: {
        id: NEW_SESSION_ID,
        instrument_version_id: VERSION_ID,
        progress: 3,
      },
      error: null,
    });
    supabaseScripts.scripts.set("item.select", {
      data: {
        id: "33333333-3333-3333-3333-333333333333",
        instrument_version_id: VERSION_ID,
        sequence_number: 4,
        stem: "Criar peces en un criadero",
        dimension: "R",
        reverse_key: false,
      },
      error: null,
    });

    const { getNextItemForSession } = await import("@/lib/session/anonymous");
    const item = await getNextItemForSession(NEW_SESSION_ID);

    expect(item).not.toBeNull();
    expect(item?.sequence_number).toBe(4);
    expect(item?.stem).toBe("Criar peces en un criadero");
  });

  test("Test 3b — getNextItemForSession retorna null cuando progress >= 60", async () => {
    supabaseScripts.scripts.set("assessment_session.select", {
      data: {
        id: NEW_SESSION_ID,
        instrument_version_id: VERSION_ID,
        progress: 60,
      },
      error: null,
    });
    supabaseScripts.scripts.set("item.select", { data: null, error: null });

    const { getNextItemForSession } = await import("@/lib/session/anonymous");
    const item = await getNextItemForSession(NEW_SESSION_ID);
    expect(item).toBeNull();
  });
});
