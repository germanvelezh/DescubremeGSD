/**
 * Unit tests for `lib/report/narrative-loader.ts::loadNarrative`.
 *
 * Coverage:
 *   - Happy path: row exists → returns templateText.
 *   - Missing row → returns GAP placeholder string (no throw).
 *
 * Anchors:
 *   - 01-CONTEXT.md D3.2.
 *   - PLAN.md §<behavior> Test 2.
 */
import { describe, expect, test } from "vitest";

import { loadNarrative } from "@/lib/report/narrative-loader";

interface MockClient {
  from: (tbl: string) => MockClient;
  select: (...args: unknown[]) => MockClient;
  eq: (...args: unknown[]) => MockClient;
  in: (...args: unknown[]) => MockClient;
  maybeSingle: () => Promise<{ data: unknown; error: unknown }>;
  then?: (resolve: (v: { data: unknown; error: unknown }) => void) => void;
}

function tableMock(payload: { data: unknown; error: unknown }): MockClient {
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
    async maybeSingle() {
      return payload;
    },
    then(resolve) {
      // For terminal multi-row selects.
      resolve(payload);
    },
  };
  return chain;
}

describe("loadNarrative: D3.2 narrative loader", () => {
  test("returns composed text when narrative_template rows exist", async () => {
    const supabase = tableMock({
      data: [
        {
          slot: "top_3_phrase",
          riasec_code: "RIA",
          template_text: "Tu perfil combina lo concreto con la indagacion y la expresion.",
        },
        {
          slot: "dimensional_high",
          riasec_code: "R",
          template_text: "Te atrae lo concreto.",
        },
        {
          slot: "dimensional_low",
          riasec_code: "C",
          template_text: "Lo rutinario te interesa menos.",
        },
      ],
      error: null,
    });
    const result = await loadNarrative(supabase as unknown as Parameters<typeof loadNarrative>[0], {
      riasecCode: "RIA",
      lang: "es-CO",
      version: "1.0",
      topDimension: "R",
      bottomDimension: "C",
    });
    expect(result.topPhrase).toMatch(/concreto/);
    expect(result.dimensionalHigh).toContain("Te atrae lo concreto.");
    expect(result.dimensionalLow).toContain("Lo rutinario te interesa menos.");
  });

  test("returns GAP placeholder when table is empty", async () => {
    const supabase = tableMock({ data: [], error: null });
    const result = await loadNarrative(supabase as unknown as Parameters<typeof loadNarrative>[0], {
      riasecCode: "RIA",
      lang: "es-CO",
      version: "1.0",
      topDimension: "R",
      bottomDimension: "C",
    });
    expect(result.topPhrase).toMatch(/Cowork/);
    expect(result.topPhrase).toMatch(/RIA/);
    expect(result.dimensionalHigh).toEqual([]);
    expect(result.dimensionalLow).toEqual([]);
  });

  test("returns GAP placeholder when select errors", async () => {
    const supabase = tableMock({
      data: null,
      error: { message: "boom", code: "PGRST" },
    });
    const result = await loadNarrative(supabase as unknown as Parameters<typeof loadNarrative>[0], {
      riasecCode: "ABC",
      lang: "es-CO",
      version: "1.0",
      topDimension: "A",
      bottomDimension: "C",
    });
    expect(result.topPhrase).toMatch(/Cowork/);
    expect(result.topPhrase).toMatch(/ABC/);
  });
});
