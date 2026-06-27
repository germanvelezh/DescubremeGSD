/**
 * Occupation selector — unit tests (Phase 02.1 Wave 3).
 *
 * Spec (verbatim): implementation_packs/JobZones_es-CO_Pack_v1.0.md §5 (filter,
 * ranking, fallbacks) + the acceptance scenarios §5.2.
 *
 * The pure ranking/filtering logic (`rankOccupations`) is tested directly with
 * fixture rows — no DB mock — so these assert REAL behavior, not a stubbed
 * query. `selectOccupations` (the thin Supabase adapter) gets a minimal smoke
 * test for snake->camel mapping + the empty/error fallback contract.
 */
import { describe, it, expect } from "vitest";

import {
  rankOccupations,
  selectOccupations,
  type Occupation,
} from "@/lib/report/occupation-selector";

let idSeq = 0;
function occ(
  riasecCode: string,
  educationLevel: string | null,
  nameEsCo = `occ-${riasecCode}-${educationLevel}`,
): Occupation {
  idSeq += 1;
  return {
    id: `id-${idSeq}`,
    codeOnet: `${idSeq}-0000.00`,
    nameEsCo,
    riasecCode,
    educationLevel,
  };
}

const zonesOf = (rows: Occupation[]) => rows.map((r) => r.educationLevel);

describe("rankOccupations — RIASEC match (pack §5.1)", () => {
  it("keeps only occupations sharing >=1 top-3 letter", () => {
    const rows = [
      occ("IC", "4"), // matches I
      occ("RS", "4"), // matches S
      occ("EA", "4"), // no overlap with [I,S,C]
    ];
    const out = rankOccupations(rows, { top3: ["I", "S", "C"] });
    expect(out.map((o) => o.riasecCode).sort()).toEqual(["IC", "RS"]);
  });

  it("ranks higher interest congruence first (more matched letters wins)", () => {
    const rows = [
      occ("IR", "4"), // 1 match (I)
      occ("ISC", "4"), // 3 matches (I,S,C)
      occ("SC", "4"), // 2 matches (S,C)
    ];
    const out = rankOccupations(rows, { top3: ["I", "S", "C"] });
    expect(out.map((o) => o.riasecCode)).toEqual(["ISC", "SC", "IR"]);
  });

  it("tiebreaks so an occupation whose first char is the user's 1st letter ranks before", () => {
    const rows = [
      occ("CI", "4"), // first char C = user's 3rd letter
      occ("IC", "4"), // first char I = user's 1st letter
    ];
    const out = rankOccupations(rows, { top3: ["I", "S", "C"] });
    expect(out.map((o) => o.riasecCode)).toEqual(["IC", "CI"]);
  });
});

describe("rankOccupations — zone filter + acceptance (pack §5.2)", () => {
  it("posgrado+senior (targetZones ['5']) returns NO zone 1-2 or 3 in the main result", () => {
    const rows = [
      occ("SI", "5"),
      occ("IEC", "5"),
      occ("IR", "5"),
      occ("SI", "3"), // zone 3 — must NOT surface (>=3 in zone 5)
      occ("SR", "1"), // zone 1-2 — must NOT surface
      occ("IS", "2"), // zone 1-2 — must NOT surface
    ];
    const out = rankOccupations(rows, { top3: ["I", "S", "C"], targetZones: ["5"] });
    expect(zonesOf(out)).toEqual(["5", "5", "5"]);
    expect(zonesOf(out)).not.toContain("1");
    expect(zonesOf(out)).not.toContain("2");
    expect(zonesOf(out)).not.toContain("3");
  });

  it("pregrado+semi_senior+study_more (targetZones ['4','5']) shows BOTH zone 4 and zone 5", () => {
    const rows = [
      occ("IC", "4"),
      occ("CIE", "4"),
      occ("SI", "5"),
      occ("IEC", "5"),
      occ("RS", "1"), // zone 1-2 excluded
    ];
    const out = rankOccupations(rows, {
      top3: ["I", "C", "S"],
      targetZones: ["4", "5"],
    });
    const zones = zonesOf(out);
    expect(zones).toContain("4");
    expect(zones).toContain("5");
    expect(zones).not.toContain("1");
  });

  it("ranks the base zone before the +1 zone within equal interest congruence", () => {
    // both match exactly 1 letter (I) at position 0; base zone '4' must precede +1 '5'
    const rows = [occ("IR", "5"), occ("IR", "4")];
    const out = rankOccupations(rows, { top3: ["I", "S", "C"], targetZones: ["4", "5"] });
    expect(zonesOf(out)).toEqual(["4", "5"]);
  });

  it("secundaria+sin_experiencia (['1-2']) returns zone 1-2; study_more (['1-2','3']) adds zone 3", () => {
    const rows = [
      occ("RS", "1"),
      occ("RC", "2"),
      occ("SR", "1"),
      occ("RC", "3"), // zone 3
    ];
    const base = rankOccupations(rows, { top3: ["R", "S", "C"], targetZones: ["1-2"] });
    expect(zonesOf(base).every((z) => z === "1" || z === "2")).toBe(true);
    expect(zonesOf(base)).not.toContain("3");

    const widened = rankOccupations(rows, {
      top3: ["R", "S", "C"],
      targetZones: ["1-2", "3"],
    });
    expect(zonesOf(widened)).toContain("3");
  });
});

describe("rankOccupations — fallbacks (pack §5.1)", () => {
  it("widens to +-1 zone when fewer than 3 results in target zones", () => {
    // targetZones ['5'] has only 1 match -> widen to {4,5}; '4' surfaces, never '3'
    const rows = [
      occ("SI", "5"),
      occ("IC", "4"),
      occ("IEC", "4"),
      occ("SR", "3"), // zone 3 stays out (not within +-1 of {5})
    ];
    const out = rankOccupations(rows, { top3: ["I", "S", "C"], targetZones: ["5"] });
    const zones = zonesOf(out);
    expect(zones).toContain("5");
    expect(zones).toContain("4");
    expect(zones).not.toContain("3");
    expect(out.length).toBeGreaterThanOrEqual(3);
  });

  it("includes null-zone occupations only as the last fallback, never in the main result", () => {
    const rows = [
      occ("IC", "4"),
      occ("IS", "4"),
      occ("SC", "4"),
      occ("ISC", null), // null zone — must not appear when there are >=3 in-zone
    ];
    const out = rankOccupations(rows, { top3: ["I", "S", "C"], targetZones: ["4"] });
    expect(out.map((o) => o.educationLevel)).not.toContain(null);
  });

  it("falls back to null-zone occupations to avoid an empty list", () => {
    const rows = [occ("ISC", null)];
    const out = rankOccupations(rows, { top3: ["I", "S", "C"], targetZones: ["4"] });
    expect(out).toHaveLength(1);
    expect(out[0]!.educationLevel).toBeNull();
  });
});

describe("rankOccupations — limit + back-compat", () => {
  it("honors the default limit of 7", () => {
    const rows = Array.from({ length: 12 }, () => occ("ISC", "4"));
    const out = rankOccupations(rows, { top3: ["I", "S", "C"], targetZones: ["4"] });
    expect(out).toHaveLength(7);
  });

  it("respects an explicit limit", () => {
    const rows = Array.from({ length: 5 }, () => occ("ISC", "4"));
    const out = rankOccupations(rows, { top3: ["I", "S", "C"], targetZones: ["4"], limit: 3 });
    expect(out).toHaveLength(3);
  });

  it("with no targetZones, ranks by interest only (Phase-1 back-compat, no zone filter)", () => {
    const rows = [occ("ISC", "1"), occ("IR", "5")];
    const out = rankOccupations(rows, { top3: ["I", "S", "C"] });
    // both kept regardless of zone; higher congruence first
    expect(out.map((o) => o.riasecCode)).toEqual(["ISC", "IR"]);
  });
});

describe("selectOccupations — thin adapter contract", () => {
  function fakeSupabase(rows: unknown[] | null, error: unknown = null) {
    const builder = {
      select: () => builder,
      or: () => builder,
      limit: () => Promise.resolve({ data: rows, error }),
      then: undefined,
    };
    return {
      from: () => builder,
    } as never;
  }

  it("maps snake_case rows to camelCase Occupation and applies the zone filter", async () => {
    const rows = [
      { id: "a", code_onet: "1", name_es_co: "A", riasec_code: "SI", education_level: "5" },
      { id: "b", code_onet: "2", name_es_co: "B", riasec_code: "SR", education_level: "1" },
    ];
    const out = await selectOccupations(fakeSupabase(rows), {
      top3: ["S", "I", "C"],
      targetZones: ["5"],
    });
    expect(out.map((o) => o.educationLevel)).toEqual(["5"]);
    expect(out[0]!.nameEsCo).toBe("A");
  });

  it("returns [] (never throws) when the query errors", async () => {
    const out = await selectOccupations(fakeSupabase(null, { code: "500" }), {
      top3: ["I", "S", "C"],
    });
    expect(out).toEqual([]);
  });
});
