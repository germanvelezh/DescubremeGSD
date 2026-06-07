/**
 * lib/auth — unit tests for `isAtLeast18` (Plan 01-07 Task 3).
 *
 * The age check is the server-side authoritative gate per D2.4 +
 * PATTERNS row 7. Client-side UI may disable submit for <18 DOBs but
 * the Server Action MUST re-validate; this test pins the contract.
 *
 * Function lives in `app/(auth)/signup/actions.ts` (where it is used).
 * Re-exported here under test to avoid coupling test paths to the
 * actions module's `"use server"` boundary (vitest can import the
 * file directly since the function is pure).
 *
 * Anchors:
 *  - 01-CONTEXT.md D2.4.
 *  - 01-PATTERNS.md row 7.
 */
import { describe, expect, test } from "vitest";

import { isAtLeast18 } from "@/app/(auth)/signup/actions";

const REFERENCE = new Date("2026-06-06T00:00:00Z");

describe("isAtLeast18 (D2.4 server-only age check)", () => {
  test("exactly 18 years ago today → true", () => {
    expect(isAtLeast18("2008-06-06", REFERENCE)).toBe(true);
  });

  test("one day before 18th birthday → false", () => {
    expect(isAtLeast18("2008-06-07", REFERENCE)).toBe(false);
  });

  test("18 years and 1 day ago → true", () => {
    expect(isAtLeast18("2008-06-05", REFERENCE)).toBe(true);
  });

  test("17 years and 364 days ago → false", () => {
    expect(isAtLeast18("2008-06-07", REFERENCE)).toBe(false);
  });

  test("invalid date → false", () => {
    expect(isAtLeast18("not-a-date", REFERENCE)).toBe(false);
  });
});
