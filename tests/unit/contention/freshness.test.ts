/**
 * Unit tests COMPL-11 — contention freshness check.
 *
 * `getContentionResources(supabase, countryCode)` retorna recursos D1.7 +
 * dispara warning si cualquier row tiene `last_verified_at` mas viejo
 * que 90 dias (umbral RESEARCH §Pitfall 13). El warning NO bloquea — solo
 * loguea con logger.warn. Phase 6 POLISH-06 formaliza la verificacion
 * mensual con alerta UI.
 *
 * Anchors:
 *   - 01-RESEARCH.md lineas 1295-1323 (contention_resources + Seed D1.7).
 *   - 01-RESEARCH.md lineas 1795-1797 (Pitfall 13).
 *   - 01-CONTEXT.md D1.7.
 */
import { describe, expect, test, vi } from "vitest";

import { isContentionStale } from "@/lib/ethics/contention";

describe("COMPL-11: contention freshness", () => {
  test("fresh row (verified today) is not stale", () => {
    const now = new Date("2026-06-07T00:00:00Z");
    const verified = new Date("2026-06-05T00:00:00Z");
    expect(isContentionStale(verified, now)).toBe(false);
  });

  test("row verified 89 days ago is not stale (just under 90d threshold)", () => {
    const now = new Date("2026-06-07T00:00:00Z");
    const verified = new Date(now.getTime() - 89 * 24 * 60 * 60 * 1000);
    expect(isContentionStale(verified, now)).toBe(false);
  });

  test("row verified 91 days ago is stale (warning required)", () => {
    const now = new Date("2026-06-07T00:00:00Z");
    const verified = new Date(now.getTime() - 91 * 24 * 60 * 60 * 1000);
    expect(isContentionStale(verified, now)).toBe(true);
  });

  test("getContentionResources logs warning when any row is stale", async () => {
    const { getContentionResources } = await import("@/lib/ethics/contention");
    const { logger } = await import("@/lib/logger");
    const warnSpy = vi.spyOn(logger, "warn").mockImplementation(() => {});

    // Mock Supabase: return one stale row.
    const stale = new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString();
    const supabase = {
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockResolvedValue({
        data: [
          {
            id: "1",
            country_code: "CO",
            type: "crisis_line",
            name: "Linea 106",
            phone: "106",
            url: null,
            description_es_co: "Linea de salud mental Bogota, 24/7",
            hours: "24/7",
            last_verified_at: stale,
          },
        ],
        error: null,
      }),
              // biome-ignore lint/suspicious/noExplicitAny: test mock
    } as any;

    const rows = await getContentionResources(supabase, "CO");
    expect(rows).toHaveLength(1);
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  test("getContentionResources returns empty array + no warning when DB empty", async () => {
    const { getContentionResources } = await import("@/lib/ethics/contention");
    const { logger } = await import("@/lib/logger");
    const warnSpy = vi.spyOn(logger, "warn").mockImplementation(() => {});

    const supabase = {
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockResolvedValue({ data: [], error: null }),
              // biome-ignore lint/suspicious/noExplicitAny: test mock
    } as any;

    const rows = await getContentionResources(supabase, "CO");
    expect(rows).toEqual([]);
    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});
