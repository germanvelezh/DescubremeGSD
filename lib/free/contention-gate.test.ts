/**
 * contention-gate — the guided-flow NFR-28 surface decision, unit-tested BEFORE
 * wiring into the server component. Safety-critical: a false negative means a
 * low-wellbeing user finishes the Free with no care route
 * ([GAP-PERMA-CONTENTION-GUIDED-FLOW]); a false positive shows contention lines
 * to someone the server never flagged. Both directions are covered here.
 */
import { describe, expect, test } from "vitest";

import { shouldSurfaceContention } from "./contention-gate";

describe("shouldSurfaceContention — guided-flow NFR-28 gate", () => {
  test("sensitive instrument + server showContention → surface (the fix's core case: last test, low wellbeing)", () => {
    expect(
      shouldSurfaceContention({
        requiresContentionRoute: true,
        showContention: true,
      }),
    ).toBe(true);
  });

  test("sensitive instrument + no distress → do NOT surface (same close destination, no new screen)", () => {
    expect(
      shouldSurfaceContention({
        requiresContentionRoute: true,
        showContention: false,
      }),
    ).toBe(false);
  });

  test("non-sensitive instrument + showContention → do NOT surface (defensive: shape can't occur, guard anyway)", () => {
    expect(
      shouldSurfaceContention({
        requiresContentionRoute: false,
        showContention: true,
      }),
    ).toBe(false);
  });

  test("non-sensitive instrument + no distress → do NOT surface", () => {
    expect(
      shouldSurfaceContention({
        requiresContentionRoute: false,
        showContention: false,
      }),
    ).toBe(false);
  });

  test("missing distress (null) → do NOT surface (fail-safe: unknown state is not distress)", () => {
    expect(
      shouldSurfaceContention({
        requiresContentionRoute: true,
        showContention: null,
      }),
    ).toBe(false);
  });

  test("missing footer flag (undefined) → do NOT surface (fail-safe)", () => {
    expect(
      shouldSurfaceContention({
        requiresContentionRoute: undefined,
        showContention: true,
      }),
    ).toBe(false);
  });

  test("both missing → do NOT surface", () => {
    expect(
      shouldSurfaceContention({
        requiresContentionRoute: null,
        showContention: undefined,
      }),
    ).toBe(false);
  });
});
