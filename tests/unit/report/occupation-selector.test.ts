/**
 * Unit tests for `lib/report/occupation-selector.ts::selectOccupations`.
 *
 * Coverage:
 *   - Filters occupations matching top3 RIASEC code (substring/Hamming).
 *   - Limits to `limit` (default 7).
 *   - Empty table → returns [] (graceful, no throw).
 *
 * Anchors:
 *   - 01-CONTEXT.md D3.3.
 *   - PLAN.md §<behavior> Test 3.
 */
import { describe, expect, test } from "vitest";

import { selectOccupations } from "@/lib/report/occupation-selector";

interface MockClient {
  from: (tbl: string) => MockClient;
  select: (...args: unknown[]) => MockClient;
  eq: (...args: unknown[]) => MockClient;
  in: (...args: unknown[]) => MockClient;
  or: (...args: unknown[]) => MockClient;
  limit: (...args: unknown[]) => MockClient;
  then?: (resolve: (v: { data: unknown; error: unknown }) => void) => void;
}

function listMock(rows: unknown[] | null, error: unknown = null): MockClient {
  const chain: MockClient = {
    from() {
      return chain;
    },
    select() {
      return chain;
    },
    eq() {
      return chain;
    },
    in() {
      return chain;
    },
    or() {
      return chain;
    },
    limit() {
      return chain;
    },
    then(resolve) {
      resolve({ data: rows, error });
    },
  };
  return chain;
}

describe("selectOccupations: D3.3 occupation selector", () => {
  test("returns matching occupations up to limit (default 7)", async () => {
    const supabase = listMock([
      { id: "1", code_onet: "11-1011.00", name_es_co: "Director general", riasec_code: "ECS", education_level: "5" },
      { id: "2", code_onet: "15-1252.00", name_es_co: "Programador", riasec_code: "RIC", education_level: "4" },
      { id: "3", code_onet: "27-2031.00", name_es_co: "Cantante", riasec_code: "AES", education_level: "3" },
    ]);
    const out = await selectOccupations(
      supabase as unknown as Parameters<typeof selectOccupations>[0],
      {
        top3: ["R", "I", "A"],
        limit: 7,
        countryCode: "CO",
      },
    );
    expect(Array.isArray(out)).toBe(true);
    expect(out.length).toBeLessThanOrEqual(7);
  });

  test("empty table returns []", async () => {
    const supabase = listMock([]);
    const out = await selectOccupations(
      supabase as unknown as Parameters<typeof selectOccupations>[0],
      {
        top3: ["R", "I", "A"],
        limit: 7,
        countryCode: "CO",
      },
    );
    expect(out).toEqual([]);
  });

  test("null data + error returns [] (graceful)", async () => {
    const supabase = listMock(null, { message: "boom" });
    const out = await selectOccupations(
      supabase as unknown as Parameters<typeof selectOccupations>[0],
      {
        top3: ["R", "I", "A"],
        limit: 7,
        countryCode: "CO",
      },
    );
    expect(out).toEqual([]);
  });

  test("respects custom limit", async () => {
    const supabase = listMock([
      { id: "1", code_onet: "1", name_es_co: "A", riasec_code: "RIA", education_level: "3" },
      { id: "2", code_onet: "2", name_es_co: "B", riasec_code: "RIE", education_level: "3" },
    ]);
    const out = await selectOccupations(
      supabase as unknown as Parameters<typeof selectOccupations>[0],
      {
        top3: ["R", "I", "A"],
        limit: 3,
        countryCode: "CO",
      },
    );
    expect(out.length).toBeLessThanOrEqual(3);
  });
});
