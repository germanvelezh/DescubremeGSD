/**
 * Unit test — scoreSession completeness gate ([BUG-PROGRESS-DRIFT-ON-REANSWER]).
 *
 * The critical Bug-4 lock: scoring must judge "complete" by the count of
 * DISTINCT item_response rows, NOT the assessment_session.progress counter
 * (which can drift ahead of coverage). A session with 59 distinct responses
 * against a 60-item instrument must return ok:false / session_incomplete —
 * never score incomplete psychometric data (one dimension would be short a
 * key, e.g. C1..C10 with C10 absent).
 *
 * Only the early reads (session, instrument_version, item_response) are
 * exercised here; the gate returns before the scoring pipeline, so the
 * heavier scoring deps are imported but never called.
 *
 * Anchors:
 *  - lib/scoring/score-session.ts step 4 (completeness gate).
 *  - estado/BACKLOG.md [BUG-PROGRESS-DRIFT-ON-REANSWER].
 */
// @vitest-environment node
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

vi.mock("@/lib/logger", () => ({
  logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

const scripts = vi.hoisted(() => ({
  map: new Map<string, unknown>(),
}));

function makeClient() {
  function builder(table: string) {
    let op = "select";
    // biome-ignore lint/suspicious/noExplicitAny: test mock builder
    const b: any = {};
    b.select = vi.fn(() => b);
    b.insert = vi.fn(() => {
      op = "insert";
      return b;
    });
    b.update = vi.fn(() => {
      op = "update";
      return b;
    });
    b.eq = vi.fn(() => b);
    const resolve = async () =>
      scripts.map.get(`${table}.${op}`) ?? { data: null, error: null, count: null };
    b.maybeSingle = vi.fn(resolve);
    b.single = vi.fn(resolve);
    b.then = (onF: (v: unknown) => unknown) => resolve().then(onF);
    return b;
  }
  return { from: vi.fn((t: string) => builder(t)) };
}

const SESSION_ID = "33333333-3333-3333-3333-333333333333";
const IV_ID = "44444444-4444-4444-4444-444444444444";

function seedCompleteSessionAndIv() {
  scripts.map.set("assessment_session.select", {
    data: {
      id: SESSION_ID,
      user_id: "55555555-5555-5555-5555-555555555555",
      anonymous_session_id: null,
      instrument_version_id: IV_ID,
      progress: 60,
      started_at: new Date().toISOString(),
      completed_at: null,
    },
    error: null,
  });
  scripts.map.set("instrument_version.select", {
    data: {
      id: IV_ID,
      item_count: 60,
      psychometric_status: { latam_status: "pending", alpha_by_dimension: {} },
    },
    error: null,
  });
}

function responsesOfLength(n: number) {
  return Array.from({ length: n }, (_, i) => ({
    raw_value: 3,
    item: { dimension: "R", sequence_number: i + 1 },
  }));
}

beforeEach(() => {
  scripts.map.clear();
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("scoreSession — completeness gate ([BUG-PROGRESS-DRIFT-ON-REANSWER])", () => {
  test("59 distinct responses against a 60-item instrument -> session_incomplete (409)", async () => {
    seedCompleteSessionAndIv();
    scripts.map.set("item_response.select", {
      data: responsesOfLength(59),
      error: null,
    });

    const { scoreSession } = await import("@/lib/scoring/score-session");
    // biome-ignore lint/suspicious/noExplicitAny: test mock client
    const result = await scoreSession(makeClient() as any, SESSION_ID);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe("session_incomplete");
      expect(result.status).toBe(409);
      expect(result.meta).toEqual({ responses: 59, item_count: 60 });
    }
  });

  test("zero responses -> no_responses (409), before the completeness gate", async () => {
    seedCompleteSessionAndIv();
    scripts.map.set("item_response.select", { data: [], error: null });

    const { scoreSession } = await import("@/lib/scoring/score-session");
    // biome-ignore lint/suspicious/noExplicitAny: test mock client
    const result = await scoreSession(makeClient() as any, SESSION_ID);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe("no_responses");
      expect(result.status).toBe(409);
    }
  });

  test("missing session -> session_not_found (404)", async () => {
    scripts.map.set("assessment_session.select", { data: null, error: null });

    const { scoreSession } = await import("@/lib/scoring/score-session");
    // biome-ignore lint/suspicious/noExplicitAny: test mock client
    const result = await scoreSession(makeClient() as any, SESSION_ID);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe("session_not_found");
      expect(result.status).toBe(404);
    }
  });
});
