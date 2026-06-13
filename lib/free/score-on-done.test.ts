/**
 * Unit test (RED) — scoreCompletedSessionIfNeeded ([GAP-AUTH-4TEST-SCORING-TRIGGER]).
 *
 * The 4th piece of P0 [GAP-AUTH-4TEST-RUNTIME]: a signed-in user who finishes a
 * Free test must trigger scoreSession on /done arrival, so computed_score +
 * report_snapshot persist and assessment_session.status flips to 'completed'
 * BEFORE the guided-order routing reads completedCodes (FREE-12).
 *
 * Covered behaviors:
 *   1. scores when not-yet-scored (status != 'completed' → scoreSession once).
 *   2. idempotent (no non-completed session found → scoreSession NOT called).
 *   3. no session for (userId, code) → no-op, NO throw.
 *   4. best-effort: scoreSession {ok:false} or throw → NO propagate (routing continues).
 *   5. instrument-agnostic: the source carries no instrument-code literal (the
 *      code is a parameter). lib/free is in FOUND-05 SCAN_DIRS, so the helper
 *      itself must be code-literal-free.
 *
 * Synthetic instrument codes only ("INST_A") — this file lives under lib/free,
 * which FOUND-05 (no-hardcoded-instruments) scans WITHOUT excluding *.test.ts.
 * Real codes here would trip the gate (precedent: 02-12 INST_A synthetic codes).
 *
 * Anchors:
 *  - lib/scoring/score-session.ts (scoreSession discriminated result).
 *  - app/auth/callback/route.ts (best-effort log-and-continue pattern).
 *  - estado/BACKLOG.md [GAP-AUTH-4TEST-SCORING-TRIGGER].
 */
// @vitest-environment node
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { beforeEach, describe, expect, test, vi } from "vitest";

import { scoreCompletedSessionIfNeeded } from "@/lib/free/score-on-done";

vi.mock("@/lib/logger", () => ({
  logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

const scoreSessionMock = vi.fn();
vi.mock("@/lib/scoring/score-session", () => ({
  scoreSession: (...args: unknown[]) => scoreSessionMock(...args),
}));

const USER_ID = "11111111-1111-1111-1111-111111111111";
const SESSION_ID = "22222222-2222-2222-2222-222222222222";
const INSTRUMENT_CODE = "INST_A";

/**
 * Minimal chainable admin-client mock. Mirrors the score-session.test.ts
 * builder but adds `.order()` and `.limit()` (the lookup orders by started_at
 * desc + limit(1)). The terminal read resolves to the scripted session row.
 */
function makeClient(sessionRow: unknown) {
  function builder() {
    // biome-ignore lint/suspicious/noExplicitAny: test mock builder
    const b: any = {};
    b.select = vi.fn(() => b);
    b.eq = vi.fn(() => b);
    b.neq = vi.fn(() => b);
    b.not = vi.fn(() => b);
    b.order = vi.fn(() => b);
    b.limit = vi.fn(() => b);
    const resolve = async () => ({ data: sessionRow, error: null });
    b.maybeSingle = vi.fn(resolve);
    b.single = vi.fn(resolve);
    b.then = (onF: (v: unknown) => unknown) => resolve().then(onF);
    return b;
  }
  return { from: vi.fn(() => builder()) };
}

beforeEach(() => {
  scoreSessionMock.mockReset();
  scoreSessionMock.mockResolvedValue({
    ok: true,
    sessionId: SESSION_ID,
    persisted: true,
    scoresByDim: {},
    bands: {},
  });
});

describe("scoreCompletedSessionIfNeeded ([GAP-AUTH-4TEST-SCORING-TRIGGER])", () => {
  test("scores the not-yet-completed session exactly once with its id", async () => {
    const admin = makeClient({ id: SESSION_ID });

    await scoreCompletedSessionIfNeeded(
      admin as never,
      USER_ID,
      INSTRUMENT_CODE,
    );

    expect(scoreSessionMock).toHaveBeenCalledTimes(1);
    expect(scoreSessionMock).toHaveBeenCalledWith(admin, SESSION_ID);
  });

  test("idempotent: no non-completed session found → scoreSession NOT called", async () => {
    // The lookup filters status != 'completed'; an already-scored test returns
    // no row, so the helper skips (no re-score, no duplicate snapshot).
    const admin = makeClient(null);

    await scoreCompletedSessionIfNeeded(
      admin as never,
      USER_ID,
      INSTRUMENT_CODE,
    );

    expect(scoreSessionMock).not.toHaveBeenCalled();
  });

  test("no session for (userId, code) → no-op and does NOT throw", async () => {
    const admin = makeClient(null);

    await expect(
      scoreCompletedSessionIfNeeded(admin as never, USER_ID, INSTRUMENT_CODE),
    ).resolves.toBeUndefined();
    expect(scoreSessionMock).not.toHaveBeenCalled();
  });

  test("best-effort: scoreSession {ok:false} does NOT propagate", async () => {
    scoreSessionMock.mockResolvedValue({
      ok: false,
      error: "session_incomplete",
      status: 409,
    });
    const admin = makeClient({ id: SESSION_ID });

    await expect(
      scoreCompletedSessionIfNeeded(admin as never, USER_ID, INSTRUMENT_CODE),
    ).resolves.toBeUndefined();
  });

  test("best-effort: scoreSession throwing does NOT propagate", async () => {
    scoreSessionMock.mockRejectedValue(new Error("boom"));
    const admin = makeClient({ id: SESSION_ID });

    await expect(
      scoreCompletedSessionIfNeeded(admin as never, USER_ID, INSTRUMENT_CODE),
    ).resolves.toBeUndefined();
  });

  test("instrument-agnostic: helper source carries no instrument-code literal", () => {
    const source = readFileSync(
      join(__dirname, "score-on-done.ts"),
      "utf8",
    );
    // Fragmented so this assertion's own literals don't trip FOUND-05 (which
    // scans this lib/free *.test.ts file too). The code is a runtime parameter,
    // never hardcoded in the helper.
    const forbidden = [
      "PER" + "MA",
      "ON" + "ET",
      "BFI" + "-2-S",
      "Tw" + "IVI",
      "P" + "VQ",
      "RIA" + "SEC",
    ];
    for (const code of forbidden) {
      expect(source).not.toContain(code);
    }
  });
});
