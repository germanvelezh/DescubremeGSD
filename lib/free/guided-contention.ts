/**
 * guided-contention — resolves, for the `allComplete` branch of /test/[code]/done,
 * whether the just-closed test warrants the NFR-28 care screen and, if so, its CO
 * lines ([GAP-PERMA-CONTENTION-GUIDED-FLOW]).
 *
 * Why a helper: the `nextCode` branch already composes the report + loads the
 * contention lines to feed the TransitionScreen banner, but `allComplete` (where
 * PERMA, the last test, lands) only sent the FREE-14 email and redirected. This
 * orchestrator mirrors that read for the last test WITHOUT duplicating it into the
 * page, keeping the branch to a single call. The threshold decision is the
 * server's (persisted in `report_snapshot.distress`); nothing is recomputed here.
 *
 * Scope note (honest): it gates on the LAST-completed test (`instrumentCode`). The
 * guided flow completes PERMA last by the seeded order (BFI→ONET→TwIVI→PERMA), and
 * PERMA is the only instrument with an active distress threshold today, so the
 * last-completed session IS the one that can carry `showContention`. If a future
 * non-guided flow could complete PERMA not-last, this would need to scan all
 * completed sensitive sessions instead. Data-driven: no instrument literal.
 *
 * Best-effort: any missing session / compose error / empty lines → `{ surface:
 * false, lines: [] }` (the caller then redirects as before). A care screen with no
 * lines is useless, so lines-load failure also falls through to the normal close.
 *
 * Anchors:
 *  - lib/free/contention-gate.ts (the pure decision).
 *  - app/(b2c)/test/[code]/done/page.tsx (nextCode branch — the mirrored read).
 *  - lib/ethics/contention.ts (getContentionResources — CO lines from the seed).
 */
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

import type { ContentionLine } from "@/app/(b2c)/reporte/[sessionId]/_components/ContentionBanner";
import { getContentionResources } from "@/lib/ethics/contention";
import { logger } from "@/lib/logger";
import { composeReport } from "@/lib/report/assembler";

import { shouldSurfaceContention } from "./contention-gate";
import { resolveLastScoredSessionId } from "./last-scored-session";

export interface GuidedContention {
  /** Show the care screen? (server decided showContention on a sensitive test). */
  surface: boolean;
  /** CO lines from the `contention_resources` seed — never hardcoded. */
  lines: ContentionLine[];
}

const NONE: GuidedContention = { surface: false, lines: [] };

/**
 * Resolves the care-screen decision for the last-closed Free test.
 *
 * @param admin service-role client (user_id filter is the scoping defense).
 * @param userId authenticated user id (from getUser()'s validated JWT).
 * @param instrumentCode the just-closed instrument's code (a parameter, never a
 *   literal — keeps lib/free FOUND-05 clean).
 */
export async function resolveGuidedContention(
  // biome-ignore lint/suspicious/noExplicitAny: untyped Supabase client (no generated Database types yet)
  admin: SupabaseClient<any, "public", any>,
  userId: string,
  instrumentCode: string,
): Promise<GuidedContention> {
  const sessionId = await resolveLastScoredSessionId(
    admin,
    userId,
    instrumentCode,
  );
  if (!sessionId) return NONE;

  try {
    const { data: userRow } = await admin
      .from("user")
      .select("country_code")
      .eq("id", userId)
      .maybeSingle();
    const userCountryCode =
      (userRow as { country_code: string | null } | null)?.country_code ?? "CO";

    // Only the distress + footer flags are needed; the level inputs (Job Zone
    // filter) are irrelevant here, mirroring the nextCode mini-result compose.
    const report = await composeReport(admin, {
      sessionId,
      userCountryCode,
      educationLevel: null,
      careerStage: null,
    });

    const surface = shouldSurfaceContention({
      requiresContentionRoute: report.footer.requiresContentionRoute,
      showContention: report.distress?.showContention,
    });
    if (!surface) return NONE;

    // Load the CO lines (same shape/filter as reporte + the nextCode branch).
    let lines: ContentionLine[] = [];
    try {
      const resources = await getContentionResources(admin, userCountryCode);
      lines = resources
        .filter((r): r is typeof r & { phone: string } => Boolean(r.phone))
        .map((r) => ({
          name: r.name,
          phone: r.phone,
          description: r.description_es_co || undefined,
        }));
    } catch (err) {
      logger.warn(
        { session_id: sessionId, message: (err as Error).message },
        "guided_contention_lines_load_failed",
      );
    }

    // A care screen without lines has no route to offer → fall back to the
    // normal close (the failure is logged; the PERMA report still carries the
    // banner outside the flow).
    if (lines.length === 0) return NONE;

    return { surface: true, lines };
  } catch (err) {
    logger.warn(
      { session_id: sessionId, message: (err as Error).message },
      "guided_contention_resolve_failed",
    );
    return NONE;
  }
}
