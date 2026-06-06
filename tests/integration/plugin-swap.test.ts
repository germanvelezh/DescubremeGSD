/**
 * Integration scaffold FOUND-02 / FOUND-04 / FOUND-06 — plugin-swap principle.
 *
 * Verifies that adding a new instrument is a DATA change (SQL seed) and NOT
 * a CODE change (no `lib/scoring/*.ts` edits). The test:
 *
 *   1. Seeds `MOCK-PREF-12` via `db/seeds/mocks/MOCK-PREF-12/instrument.sql`
 *      (12 items, 2 dimensions, sum formula).
 *   2. Inserts 12 `item_response` rows for a synthetic user.
 *   3. Calls `lib/scoring/interpreter.ts::score(instrumentCode, responses)`
 *      — which doesn't exist yet (lands in Plan 01-07).
 *   4. Asserts the score matches the expected per-dimension sum, with
 *      ZERO TypeScript edits between O*NET-only state and post-swap state.
 *
 * Phase 1 status: scaffold-only. All concrete steps are `test.todo()` until
 * `lib/scoring/interpreter.ts` lands. The test file exists NOW so Wave 1+
 * `<verify><automated>` can reference `vitest run tests/integration/plugin-swap.test.ts`
 * without "command not found".
 *
 * Skip gate: when `DATABASE_URL` is absent, even the seed step is skipped.
 * Wave 5 CI brings a Supabase container up and reactivates the todos.
 */
import { describe, test } from "vitest";

const HAS_DB = !!process.env.DATABASE_URL;
const HAS_INTERPRETER = false; // flips true when Plan 01-07 lands lib/scoring/interpreter.ts

describe("FOUND-02 / FOUND-04 / FOUND-06: plugin-swap (MOCK-PREF-12 fixture)", () => {
  if (!HAS_DB) {
    test.skip("requires DATABASE_URL pointing at a local Supabase Postgres", () => {});
    return;
  }

  if (!HAS_INTERPRETER) {
    test.todo("seed MOCK-PREF-12 via db/seeds/mocks/MOCK-PREF-12/instrument.sql");
    test.todo(
      "insert 12 item_response rows simulating a user completing MOCK-PREF-12",
    );
    test.todo(
      "call lib/scoring/interpreter.ts::score('MOCK-PREF-12', responses) and assert dim1/dim2 sums match expected",
    );
    test.todo(
      "verify no .ts file under lib/scoring/ was touched between O*NET-only and MOCK-PREF-12 swap",
    );
    test.todo(
      "swap MOCK-PREF-12 -> remove seed -> assert score() throws 'instrument not found' (negative path)",
    );
    return;
  }

  test("plugin swap: MOCK-PREF-12 scores via DB-driven formula with zero lib edits", async () => {
    throw new Error(
      "lib/scoring/interpreter.ts exists — flip HAS_INTERPRETER to true and implement this test",
    );
  });
});
