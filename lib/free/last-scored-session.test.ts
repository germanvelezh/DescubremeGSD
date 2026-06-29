/**
 * Unit test (RED) — resolveLastScoredSessionId ([GAP-W6-HOOKS-1] machinery).
 *
 * The transition test→test mini-result (TransitionScreen `result` prop) needs the
 * id of the test the user JUST closed so done/page.tsx can compose its report and
 * show a glanceable takeaway instead of a bare button. By the time /done runs its
 * nextCode branch, `scoreCompletedSessionIfNeeded` has already flipped that
 * session to `status='completed'` and written its report_snapshot — so this helper
 * resolves the user's most-recent `completed` session for the given instrument.
 *
 * Covered behaviors:
 *   1. resolves the completed session's id for a matching instrument code.
 *   2. case-insensitive match (mixed-case seed vs uppercased runner code).
 *   3. no completed session for that instrument → null.
 *   4. client error / data null → null (never throws — best-effort).
 *   5. instrument-agnostic: the source carries no instrument-code literal (the
 *      code is a parameter). lib/free is in FOUND-05 SCAN_DIRS, so the helper
 *      itself must be code-literal-free.
 *
 * Synthetic instrument codes only ("INST_A") — this file lives under lib/free,
 * which FOUND-05 (no-hardcoded-instruments) scans WITHOUT excluding *.test.ts.
 * Real codes here would trip the gate (precedent: score-on-done.test.ts).
 *
 * Anchors:
 *  - lib/free/score-on-done.ts (query + best-effort + JS code-match pattern).
 *  - app/(b2c)/test/[code]/_components/TransitionScreen.tsx (result prop consumer).
 *  - estado/BACKLOG.md [GAP-W6-HOOKS-1]; [GAP-FREE-NO-RESULTS-VISIBILITY].
 */
// @vitest-environment node
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, test } from "vitest";

import { resolveLastScoredSessionId } from "@/lib/free/last-scored-session";

const USER_ID = "11111111-1111-1111-1111-111111111111";
const SESSION_ID = "22222222-2222-2222-2222-222222222222";
const INSTRUMENT_CODE = "INST_A";

/**
 * Minimal chainable admin-client mock. Mirrors the score-on-done.test.ts builder:
 * `.select().eq().eq().order()` resolves the scripted rows array (the helper
 * filters status='completed' via .eq and matches the instrument code in JS).
 * `errored` lets a test script the `{ data: null, error }` best-effort path.
 */
type SessionRow = {
  id: string;
  instrument_version: { instrument: { code: string } } | null;
};

function makeClient(rows: SessionRow[], errored = false) {
  function builder() {
    // biome-ignore lint/suspicious/noExplicitAny: test mock builder
    const b: any = {};
    b.select = () => b;
    b.eq = () => b;
    b.neq = () => b;
    b.order = () => b;
    b.limit = () => b;
    const resolve = async () =>
      errored
        ? { data: null, error: { message: "boom" } }
        : { data: rows, error: null };
    b.maybeSingle = resolve;
    b.single = resolve;
    b.then = (onF: (v: unknown) => unknown) => resolve().then(onF);
    return b;
  }
  return { from: () => builder() };
}

/** Builds a joined completed-session row for the given code. */
function rowFor(id: string, code: string): SessionRow {
  return { id, instrument_version: { instrument: { code } } };
}

describe("resolveLastScoredSessionId ([GAP-W6-HOOKS-1])", () => {
  test("resolves the completed session id for a matching code", async () => {
    const admin = makeClient([rowFor(SESSION_ID, INSTRUMENT_CODE)]);

    const id = await resolveLastScoredSessionId(
      admin as never,
      USER_ID,
      INSTRUMENT_CODE,
    );

    expect(id).toBe(SESSION_ID);
  });

  test("case-insensitive: an uppercased code matches a mixed-case seed row", async () => {
    // The runner uppercases the URL code (done/page.tsx `code.toUpperCase()`),
    // but the seed stores some codes mixed-case, so the joined row carries the
    // seed casing. They must still match ([GAP-INSTRUMENT-CODE-CASING]).
    const SEED_CODE = "Mixed_A";
    const RUNNER_CODE = "MIXED_A";
    const admin = makeClient([rowFor(SESSION_ID, SEED_CODE)]);

    const id = await resolveLastScoredSessionId(
      admin as never,
      USER_ID,
      RUNNER_CODE,
    );

    expect(id).toBe(SESSION_ID);
  });

  test("no completed session for that instrument → null", async () => {
    const admin = makeClient([rowFor(SESSION_ID, "OTHER_B")]);

    const id = await resolveLastScoredSessionId(
      admin as never,
      USER_ID,
      INSTRUMENT_CODE,
    );

    expect(id).toBeNull();
  });

  test("client error / data null → null (does NOT throw)", async () => {
    const admin = makeClient([], true);

    await expect(
      resolveLastScoredSessionId(admin as never, USER_ID, INSTRUMENT_CODE),
    ).resolves.toBeNull();
  });

  test("instrument-agnostic: helper source carries no instrument-code literal", () => {
    const source = readFileSync(
      join(__dirname, "last-scored-session.ts"),
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
