/**
 * RIASEC reveal helpers — unit tests (Phase 02.1 Wave 6).
 *
 * Covers the pure logic behind the occupational reveal micro-tag (pack §5):
 * which top-3 letters an occupation matches + the es-CO enumeration join.
 */
import { describe, expect, it } from "vitest";

import { joinWithY, matchedRiasecLetters } from "@/lib/onet/riasec";

describe("matchedRiasecLetters (pack §5 micro-tag source)", () => {
  it("returns top-3 letters present in the occupation code, in top-3 order", () => {
    // user top-3 = R,I,A; occupation IRC → matches I and R, ordered by top-3.
    expect(matchedRiasecLetters(["R", "I", "A"], "IRC")).toEqual(["R", "I"]);
  });

  it("ranks by the USER's priority, not the occupation code order", () => {
    expect(matchedRiasecLetters(["S", "E", "C"], "CES")).toEqual(["S", "E", "C"]);
  });

  it("is case-insensitive on both sides", () => {
    expect(matchedRiasecLetters(["r", "i"], "ri")).toEqual(["R", "I"]);
  });

  it("dedupes repeated letters in the occupation code", () => {
    expect(matchedRiasecLetters(["A", "S"], "AAS")).toEqual(["A", "S"]);
  });

  it("returns [] when nothing matches (caller omits the tag)", () => {
    expect(matchedRiasecLetters(["R", "I", "A"], "SEC")).toEqual([]);
  });

  it("ignores non-RIASEC characters defensively", () => {
    expect(matchedRiasecLetters(["R", "X", "I"], "RXI")).toEqual(["R", "I"]);
  });
});

describe("joinWithY (es-CO enumeration)", () => {
  it("returns the single item unchanged", () => {
    expect(joinWithY(["Investigativo"])).toBe("Investigativo");
  });
  it("joins two with ' y '", () => {
    expect(joinWithY(["Investigativo", "Convencional"])).toBe(
      "Investigativo y Convencional",
    );
  });
  it("joins three with commas + final ' y '", () => {
    expect(joinWithY(["Realista", "Investigativo", "Convencional"])).toBe(
      "Realista, Investigativo y Convencional",
    );
  });
  it("returns '' for an empty list", () => {
    expect(joinWithY([])).toBe("");
  });
});
