/**
 * Job Zone inference + normalization — unit tests (Phase 02.1 Wave 2).
 *
 * Spec (verbatim): implementation_packs/JobZones_es-CO_Pack_v1.0.md §3-§4 + the
 * acceptance scenarios §5.2. Zones are TEXT under the O*NET feb-2026 scheme:
 * '1-2' | '3' | '4' | '5' (Zones 1 and 2 consolidated).
 *
 * Guardrail (pack §6 / CLAUDE.md §8): the API takes ONLY education + experience
 * + study intent. There is no sex/age parameter — bias is structurally
 * impossible, not merely avoided.
 */
import { describe, it, expect } from "vitest";

import {
  inferBaseZone,
  normalizeZone,
  oneAbove,
  targetZones,
} from "@/lib/onet/job-zone";

describe("inferBaseZone (pack §3.2)", () => {
  it("maps secundaria -> '1-2'", () => {
    expect(inferBaseZone("secundaria")).toBe("1-2");
  });
  it("maps tecnico_tecnologo -> '3'", () => {
    expect(inferBaseZone("tecnico_tecnologo")).toBe("3");
  });
  it("maps pregrado -> '4'", () => {
    expect(inferBaseZone("pregrado")).toBe("4");
  });
  it("maps posgrado -> '5'", () => {
    expect(inferBaseZone("posgrado")).toBe("5");
  });
});

describe("oneAbove (pack §3.3)", () => {
  it("steps up the consolidated ladder", () => {
    expect(oneAbove("1-2")).toBe("3");
    expect(oneAbove("3")).toBe("4");
    expect(oneAbove("4")).toBe("5");
  });
  it("caps at '5' (the top never rises)", () => {
    expect(oneAbove("5")).toBe("5");
  });
});

describe("normalizeZone (pack §4 — occupation.education_level seed text)", () => {
  it("collapses '1' and '2' into '1-2' (feb-2026 consolidation)", () => {
    expect(normalizeZone("1")).toBe("1-2");
    expect(normalizeZone("2")).toBe("1-2");
  });
  it("passes '3'/'4'/'5' through unchanged", () => {
    expect(normalizeZone("3")).toBe("3");
    expect(normalizeZone("4")).toBe("4");
    expect(normalizeZone("5")).toBe("5");
  });
  it("is idempotent on an already-consolidated '1-2' (pack §4 P2 migration)", () => {
    expect(normalizeZone("1-2")).toBe("1-2");
  });
  it("returns null for null/empty/unknown (no zone -> fallback path)", () => {
    expect(normalizeZone(null)).toBeNull();
    expect(normalizeZone("")).toBeNull();
    expect(normalizeZone("foo")).toBeNull();
  });
});

describe("targetZones (pack §3.3 — experience/intent widen the ceiling, never the floor)", () => {
  it("returns only the base zone when not senior and not open to study more", () => {
    expect(targetZones("4", "junior", false)).toEqual(["4"]);
    expect(targetZones("1-2", "sin_experiencia", false)).toEqual(["1-2"]);
  });

  it("adds one zone above when career_stage === 'senior'", () => {
    expect(targetZones("3", "senior", false)).toEqual(["3", "4"]);
  });

  it("adds one zone above when openToStudyMore === true", () => {
    expect(targetZones("4", "semi_senior", true)).toEqual(["4", "5"]);
  });

  it("keeps base first, then the +1 zone (order is load-bearing for ranking)", () => {
    expect(targetZones("3", "senior", false)).toEqual(["3", "4"]);
  });

  it("dedupes when senior AND open to study more", () => {
    expect(targetZones("4", "senior", true)).toEqual(["4", "5"]);
  });

  // Acceptance §5.2 — posgrado+senior (base '5', ceiling '5'): never '1-2' or '3'.
  it("posgrado + senior stays ['5'] (ceiling capped, no low zones)", () => {
    const zones = targetZones(inferBaseZone("posgrado"), "senior", false);
    expect(zones).toEqual(["5"]);
    expect(zones).not.toContain("1-2");
    expect(zones).not.toContain("3");
  });

  it("posgrado + open to study more stays ['5'] (cannot exceed top)", () => {
    expect(targetZones(inferBaseZone("posgrado"), "semi_senior", true)).toEqual([
      "5",
    ]);
  });

  // Acceptance §5.2 — pregrado+semi_senior + "abierto a formarme más" -> sees 4 AND 5.
  it("pregrado + semi_senior + study_more -> ['4','5']", () => {
    expect(targetZones(inferBaseZone("pregrado"), "semi_senior", true)).toEqual([
      "4",
      "5",
    ]);
  });

  // Acceptance §5.2 — secundaria+sin_experiencia -> '1-2' (and '3' only if study_more).
  it("secundaria + sin_experiencia -> ['1-2']; study_more adds '3'", () => {
    expect(
      targetZones(inferBaseZone("secundaria"), "sin_experiencia", false),
    ).toEqual(["1-2"]);
    expect(
      targetZones(inferBaseZone("secundaria"), "sin_experiencia", true),
    ).toEqual(["1-2", "3"]);
  });
});
