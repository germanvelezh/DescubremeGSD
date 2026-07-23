/**
 * contention-gate — pure decision for surfacing the NFR-28 contention route in
 * the guided Free flow ([GAP-PERMA-CONTENTION-GUIDED-FLOW]).
 *
 * The guided flow surfaces contention in the between-tests transition
 * (done/page.tsx `nextCode` branch → TransitionScreen → ContentionBanner). That
 * branch never runs for PERMA, the LAST Free test (position 4, seed
 * `product-stack/free`), which falls to `allComplete` → redirect. So a
 * low-wellbeing user (the server persisted `distress.showContention=true` on the
 * PERMA snapshot) finishes the Free without ever seeing the care route, even
 * though BFI/TwIVI would have shown it. This gate re-surfaces the SAFETY signal
 * at the `allComplete` choke point — safety-only, NOT the mini-result (that
 * surface is [GAP-PERMA-MINIRESULT-SURFACE] / A2, ADR-031, deferred to OLA 3).
 *
 * The decision is 100% the server's (persisted in `report_snapshot.distress`);
 * this gate NEVER recomputes a threshold (T-02-08-02). It only reads two booleans
 * off the composed report:
 *   - requiresContentionRoute: the instrument is sensitive (`contention_route`
 *     seed; PERMA/BFI/VALUES). A non-sensitive instrument never surfaces it.
 *   - showContention: the server crossed the per-instrument distress threshold
 *     (PERMA: `PERMA_total < 5.0`, Kern).
 *
 * Fail-safe: any missing/degraded input → false. A user whose distress state is
 * unknown must NOT get a fabricated care screen; the server decision is the sole
 * source of truth, and its absence is not distress.
 *
 * Anchors:
 *  - estado/DECISIONS_LOG.md ADR-033.
 *  - estado/SMOKE_A1_RESULTADOS_v1.0.md (hallazgo P1 seguridad + evidencia prod).
 *  - lib/free/runner-navigation.ts (sibling pure gate + test pattern).
 */
export interface ContentionGateInput {
  /** `report.footer.requiresContentionRoute` — instrument is sensitive. */
  requiresContentionRoute: boolean | null | undefined;
  /** `report.distress.showContention` — server crossed the distress threshold. */
  showContention: boolean | null | undefined;
}

/**
 * Should the guided flow surface the NFR-28 care route for this completed test?
 * True only when the instrument is sensitive AND the server decided to show
 * contention. Any missing input → false (fail-safe: no fabricated care screen).
 */
export function shouldSurfaceContention(input: ContentionGateInput): boolean {
  return (
    input.requiresContentionRoute === true && input.showContention === true
  );
}
