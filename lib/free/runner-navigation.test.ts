/**
 * runner-navigation — pure resolution for the redesigned item loop (Ola 2.1).
 *
 * Two safety-critical pure functions, unit-tested BEFORE wiring into the
 * server component:
 *
 *  1. resolveDisplayItem — the "Atras" bounds check. The runner is server-driven
 *     (getNextItemForSession serves sequence = progress+1, progress = distinct
 *     answer COUNT). An out-of-bounds `?item=N` that lets the user answer an item
 *     BEYOND the frontier drifts the count past coverage and FREEZES the runner
 *     permanently (never reaches N=total, never fires /done). So a back-view is
 *     valid ONLY for an already-answered item: integer N in [1, progress].
 *     Anything else → serve the frontier (progress+1), never a stray N.
 *
 *  2. resolveBlockPosition — O*NET 5x12 block math (data-driven by code +
 *     itemCount=60). No reordering; blocks are sequential chunks of 12.
 */
import { describe, expect, test } from "vitest";

import {
  resolveBlockPosition,
  resolveDisplayItem,
} from "./runner-navigation";

describe("resolveDisplayItem — Atras bounds check (freeze prevention)", () => {
  test("no param → frontier (progress+1), not a back-view", () => {
    expect(resolveDisplayItem(undefined, 10)).toEqual({
      seq: 11,
      isBackView: false,
    });
  });

  test("empty string → frontier", () => {
    expect(resolveDisplayItem("", 10)).toEqual({ seq: 11, isBackView: false });
  });

  test("non-numeric → frontier", () => {
    expect(resolveDisplayItem("abc", 10)).toEqual({
      seq: 11,
      isBackView: false,
    });
  });

  test("non-integer → frontier", () => {
    expect(resolveDisplayItem("2.5", 10)).toEqual({
      seq: 11,
      isBackView: false,
    });
  });

  test("zero → frontier (below 1)", () => {
    expect(resolveDisplayItem("0", 10)).toEqual({ seq: 11, isBackView: false });
  });

  test("negative → frontier", () => {
    expect(resolveDisplayItem("-3", 10)).toEqual({
      seq: 11,
      isBackView: false,
    });
  });

  test("valid first answered item → back-view seq 1", () => {
    expect(resolveDisplayItem("1", 10)).toEqual({ seq: 1, isBackView: true });
  });

  test("N == progress (last answered) → back-view", () => {
    expect(resolveDisplayItem("10", 10)).toEqual({
      seq: 10,
      isBackView: true,
    });
  });

  test("N == progress+1 (the frontier itself) → frontier, NOT back-view", () => {
    expect(resolveDisplayItem("11", 10)).toEqual({
      seq: 11,
      isBackView: false,
    });
  });

  test("N far beyond frontier (the freeze case) → frontier, never N", () => {
    // progress=10, someone hand-edits ?item=15. Serving 15 would let them
    // answer an item past the frontier and freeze the runner. Must clamp.
    expect(resolveDisplayItem("15", 10)).toEqual({
      seq: 11,
      isBackView: false,
    });
  });

  test("progress=0 (nothing answered) → frontier seq 1, any back-view rejected", () => {
    expect(resolveDisplayItem("1", 0)).toEqual({ seq: 1, isBackView: false });
    expect(resolveDisplayItem(undefined, 0)).toEqual({
      seq: 1,
      isBackView: false,
    });
  });

  test("array param (searchParams repeat) → frontier", () => {
    expect(resolveDisplayItem(["3"], 10)).toEqual({
      seq: 11,
      isBackView: false,
    });
  });
});

describe("resolveBlockPosition — 5x12 block math (blockSize decided by caller)", () => {
  test("first item → block 1, item 1 of 12", () => {
    expect(resolveBlockPosition(1, 60, 12)).toEqual({
      block: 1,
      totalBlocks: 5,
      itemInBlock: 1,
      blockSize: 12,
    });
  });

  test("last item of block 1", () => {
    expect(resolveBlockPosition(12, 60, 12)).toMatchObject({
      block: 1,
      itemInBlock: 12,
    });
  });

  test("first item of block 2 (boundary)", () => {
    expect(resolveBlockPosition(13, 60, 12)).toMatchObject({
      block: 2,
      itemInBlock: 1,
    });
  });

  test("last item overall → block 5, item 12", () => {
    expect(resolveBlockPosition(60, 60, 12)).toMatchObject({
      block: 5,
      totalBlocks: 5,
      itemInBlock: 12,
    });
  });

  test("no block presentation (blockSize null) → null (continuous bar)", () => {
    expect(resolveBlockPosition(5, 30, null)).toBeNull();
    expect(resolveBlockPosition(5, 60, null)).toBeNull();
  });

  test("non-positive blockSize or empty test → null (guarded)", () => {
    expect(resolveBlockPosition(5, 60, 0)).toBeNull();
    expect(resolveBlockPosition(1, 0, 12)).toBeNull();
    expect(resolveBlockPosition(0, 60, 12)).toBeNull();
  });
});
