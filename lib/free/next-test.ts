/**
 * resolveNextFreeTest — data-driven guided-order resolver for the B2C Free
 * 4-test journey (Plan 02-07 Task 1).
 *
 * The Free flow walks 4 instruments in a FIXED guided order (D-A.5): intereses
 * -> personalidad -> valores -> bienestar. The order is NOT a hardcoded list of
 * instrument codes here — it is data, read from `product_stack.order` (the
 * Free product's seeded membership + ordering). This file branches only on the
 * ordered list it is GIVEN, never on a literal code, so it stays plugin-as-data
 * (FOUND-05, `no-hardcoded-instruments.test.ts` covers `lib/free` from Plan
 * 02-07 onward).
 *
 * The resolver returns the next pending test, the global 1..N position, and the
 * all-4 teaser gate. The single product=free consent (D-A.3) is assumed
 * satisfied by the Phase-1 signup flow before any sensitive instrument; this
 * module does not re-check it.
 *
 * The DB-querying wrapper (`loadFreeOrderedCodes`) supplies the ordered list at
 * runtime. It is thin and stays dormant until `product_stack` is seeded with the
 * 4 Free instruments + `order` values (02-13); the pure resolver is fully tested
 * in isolation today.
 *
 * Anchors:
 *  - 02-CONTEXT.md D-A.3 (single consent), D-A.5 (orden fijo), D-A.6 (gating),
 *    D-F3.1/D-F3.2 (returning user routes to pending, no caducidad).
 *  - 02-UI-SPEC.md §7.1 (flow + returning-user continuity), §6.5 (global progress).
 *  - db/schema/product-stack.ts (productCode + order — the order source).
 */
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

/** Product code for the B2C Free stack (seed `product.code`). */
export const FREE_PRODUCT_CODE = "free";

export interface FreeJourneyPosition {
  /** Next pending instrument code in the fixed order, or null when all done. */
  nextCode: string | null;
  /** Global 1-based position of the next pending test (clamped to total). */
  globalCurrent: number;
  /** Total number of Free instruments (from the ordered list). */
  globalTotal: number;
  /** True only when every ordered instrument has been completed (teaser gate). */
  allComplete: boolean;
}

/**
 * Pure guided-order resolver. Given the seeded ordered instrument codes and the
 * set of completed codes, returns the next pending test + global position +
 * the all-4 gate. Completion ORDER is irrelevant — membership is what gates the
 * teaser (D-A.6). The "next" is the first code in the ordered list that is not
 * yet completed (D-A.5/D-F3.1).
 *
 * `orderedCodes` MUST come from data (`product_stack.order`), never a literal.
 */
export function resolveNextFreeTest(
  orderedCodes: readonly string[],
  completedCodes: readonly string[],
): FreeJourneyPosition {
  const globalTotal = orderedCodes.length;
  const done = new Set(completedCodes);

  const pendingIndex = orderedCodes.findIndex((code) => !done.has(code));
  const allComplete = pendingIndex === -1;

  if (allComplete) {
    return {
      nextCode: null,
      globalCurrent: globalTotal,
      globalTotal,
      allComplete: true,
    };
  }

  return {
    nextCode: orderedCodes[pendingIndex] ?? null,
    // 1-based position of the next pending test in the fixed order.
    globalCurrent: pendingIndex + 1,
    globalTotal,
    allComplete: false,
  };
}

/**
 * Loads the ordered Free-product instrument codes from `product_stack`
 * (`product_code = 'free'`), ordered by the seeded `order` column. The codes
 * are resolved via the `instrument_version -> instrument` join (the same join
 * shape `getOrCreateAnonymousSession` uses).
 *
 * Returns `[]` when nothing is seeded — the journey then has no ordered list and
 * the resolver reports an empty/complete journey gracefully (dormant until 02-13
 * seeds `product_stack`). This intentionally avoids throwing so the runner page
 * keeps rendering the single-instrument path during the seed gap.
 */
export async function loadFreeOrderedCodes(
  // biome-ignore lint/suspicious/noExplicitAny: untyped Supabase client (no generated Database types yet)
  supabase: SupabaseClient<any, "public", any>,
): Promise<string[]> {
  const { data, error } = await supabase
    .from("product_stack")
    .select("order, instrument_version!inner(instrument!inner(code))")
    .eq("product_code", FREE_PRODUCT_CODE)
    .order("order", { ascending: true });

  if (error || !data) return [];

  const rows = data as unknown as Array<{
    order: number;
    instrument_version: { instrument: { code: string } } | null;
  }>;

  return rows
    .map((r) => r.instrument_version?.instrument?.code)
    .filter((c): c is string => typeof c === "string" && c.length > 0);
}
