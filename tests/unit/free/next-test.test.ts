/**
 * resolveNextFreeTest — data-driven guided-order resolver + all-4 gating
 * (Plan 02-07 Task 1, CONTEXT D-A.3/D-A.5/D-A.6/D-F3.1).
 *
 * The pure resolver takes the ordered Free-product instrument list (from the
 * `product_stack.order` seed, mocked here) + the set of completed codes and
 * returns the next pending test, the global 1..N position, and the all-4
 * teaser gate. There is NO hardcoded instrument-code list in the resolver:
 * the order is data (FOUND-05). The DB wrapper that supplies the ordered list
 * is exercised separately/dormant; this suite pins the pure logic.
 *
 * Anchors:
 *  - 02-07-PLAN.md Task 1 (behavior + acceptance).
 *  - 02-CONTEXT.md D-A.5 (orden fijo), D-A.6 (gating teaser), D-F3.1 (returning).
 *  - 02-UI-SPEC.md §7.1 (flow + returning-user continuity).
 */
import { describe, expect, test } from "vitest";

import { resolveNextFreeTest } from "@/lib/free/next-test";

// Mock the seeded ordered list — order comes from product_stack.order, not a
// hardcoded code array in the resolver. The 4 Free instruments in fixed order
// (D-A.5): intereses -> personalidad -> valores -> bienestar.
const ORDERED = ["ONET-IP-SF", "BFI-2-S", "TwIVI", "PERMA-PROFILER"];

describe("resolveNextFreeTest — guided order + gating (Plan 02-07 Task 1)", () => {
  test("empty completed -> first test, position 1 of 4, not complete", () => {
    const r = resolveNextFreeTest(ORDERED, []);
    expect(r.nextCode).toBe("ONET-IP-SF");
    expect(r.globalCurrent).toBe(1);
    expect(r.globalTotal).toBe(4);
    expect(r.allComplete).toBe(false);
  });

  test("completed=[O*NET] -> next BFI-2-S, position 2 of 4", () => {
    const r = resolveNextFreeTest(ORDERED, ["ONET-IP-SF"]);
    expect(r.nextCode).toBe("BFI-2-S");
    expect(r.globalCurrent).toBe(2);
    expect(r.globalTotal).toBe(4);
    expect(r.allComplete).toBe(false);
  });

  test("completed=[O*NET, BFI] -> next TwIVI (values), position 3 of 4", () => {
    const r = resolveNextFreeTest(ORDERED, ["ONET-IP-SF", "BFI-2-S"]);
    expect(r.nextCode).toBe("TwIVI");
    expect(r.globalCurrent).toBe(3);
    expect(r.allComplete).toBe(false);
  });

  test("all 4 completed -> next=null, allComplete=true (teaser unlocks)", () => {
    const r = resolveNextFreeTest(ORDERED, [
      "ONET-IP-SF",
      "BFI-2-S",
      "TwIVI",
      "PERMA-PROFILER",
    ]);
    expect(r.nextCode).toBeNull();
    expect(r.globalCurrent).toBe(4);
    expect(r.globalTotal).toBe(4);
    expect(r.allComplete).toBe(true);
  });

  test("allComplete is true ONLY when every ordered code is present", () => {
    // 3 of 4 done (skipping the 3rd) — still not complete; next is the first pending in order.
    const r = resolveNextFreeTest(ORDERED, [
      "ONET-IP-SF",
      "BFI-2-S",
      "PERMA-PROFILER",
    ]);
    expect(r.allComplete).toBe(false);
    expect(r.nextCode).toBe("TwIVI");
    // globalCurrent points at the first pending position in the fixed order.
    expect(r.globalCurrent).toBe(3);
  });

  test("completion order does not matter — gate keys off membership", () => {
    const r = resolveNextFreeTest(ORDERED, [
      "PERMA-PROFILER",
      "TwIVI",
      "BFI-2-S",
      "ONET-IP-SF",
    ]);
    expect(r.allComplete).toBe(true);
    expect(r.nextCode).toBeNull();
  });

  test("returns next pending derived from the injected list, not a literal", () => {
    // A different seeded order must produce a different next — proving the
    // resolver reads the list, never a hardcoded sequence.
    const reordered = ["BFI-2-S", "ONET-IP-SF", "TwIVI", "PERMA-PROFILER"];
    const r = resolveNextFreeTest(reordered, []);
    expect(r.nextCode).toBe("BFI-2-S");
  });
});
