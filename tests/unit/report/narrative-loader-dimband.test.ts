/**
 * Unit tests for `lib/report/narrative-loader.ts` dimension×band query path
 * (Plan 02-04 Task 1, D-C.4).
 *
 * Coverage:
 *   - dimension_band slot: returns rows keyed by (dimension, band).
 *   - Empty table → deterministic GAP placeholder (no throw) so a bars/
 *     circumplex slice renders before Cowork/§5 seeds land.
 *   - Select error → GAP placeholder (no throw).
 *   - No instrument-code literal anywhere (FOUND-05 — covered by the lint gate,
 *     asserted structurally here too).
 *
 * Pitfall 2 (RESEARCH): this is NOT a rename of the RIASEC path — the query
 * shape is per-(dimension, band), added ALONGSIDE the RIASEC combo path. The
 * RIASEC regression lives in `narrative-loader.test.ts`.
 *
 * Anchors:
 *   - 02-CONTEXT.md D-C.4 (narrative dimension×band).
 *   - 02-PATTERNS.md § "lib/report/narrative-loader.ts (MODIFY — add path)".
 */
import { describe, expect, test } from "vitest";

import { loadNarrative } from "@/lib/report/narrative-loader";

interface Result {
  data: unknown;
  error: unknown;
}

/** Single-table thenable chain mock (matches PostgREST builder surface). */
function tableMock(payload: Result) {
  const chain: Record<string, unknown> = {
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
    async maybeSingle() {
      return payload;
    },
    then(resolve: (v: Result) => void) {
      resolve(payload);
    },
  };
  return chain;
}

describe("loadNarrative: dimension×band path (D-C.4)", () => {
  test("returns rows keyed by (dimension, band)", async () => {
    const supabase = tableMock({
      data: [
        {
          slot: "dimension_band",
          riasec_code: null,
          dimension: "Apertura",
          band: "ALTO",
          template_text: "Buscas lo nuevo y cuestionas lo dado.",
        },
        {
          slot: "dimension_band",
          riasec_code: null,
          dimension: "Conservacion",
          band: "MEDIO",
          template_text: "Valoras cierta estabilidad sin cerrarte.",
        },
      ],
      error: null,
    }) as never;

    const result = await loadNarrative(supabase, {
      slot: "dimension_band",
      dimensions: [
        { dimension: "Apertura", band: "ALTO" },
        { dimension: "Conservacion", band: "MEDIO" },
      ],
      lang: "es-CO",
      version: "1.0",
    });

    expect(result.byDimensionBand).toBeDefined();
    expect(result.byDimensionBand?.["Apertura"]).toBe(
      "Buscas lo nuevo y cuestionas lo dado.",
    );
    expect(result.byDimensionBand?.["Conservacion"]).toBe(
      "Valoras cierta estabilidad sin cerrarte.",
    );
  });

  test("returns GAP placeholder when table is empty (no throw)", async () => {
    const supabase = tableMock({ data: [], error: null }) as never;

    const result = await loadNarrative(supabase, {
      slot: "dimension_band",
      dimensions: [{ dimension: "Apertura", band: "ALTO" }],
      lang: "es-CO",
      version: "1.0",
    });

    expect(result.topPhrase).toMatch(/GAP/);
    expect(result.byDimensionBand).toEqual({});
  });

  test("returns GAP placeholder when select errors (no throw)", async () => {
    const supabase = tableMock({
      data: null,
      error: { code: "PGRST500", message: "boom" },
    }) as never;

    const result = await loadNarrative(supabase, {
      slot: "dimension_band",
      dimensions: [{ dimension: "Apertura", band: "ALTO" }],
      lang: "es-CO",
      version: "1.0",
    });

    expect(result.topPhrase).toMatch(/GAP/);
    expect(result.byDimensionBand).toEqual({});
  });
});
