/**
 * PermaCareScreen — NFR-28 care interstitial for the guided Free flow
 * ([GAP-PERMA-CONTENTION-GUIDED-FLOW]).
 *
 * PERMA is the LAST Free test, so its completion routes through
 * done/page.tsx `allComplete` (not the between-tests TransitionScreen). A
 * low-wellbeing user (server persisted `distress.showContention` on the PERMA
 * snapshot) would otherwise finish the Free without ever seeing the contention
 * route. This screen re-surfaces it — SAFETY ONLY — before the normal close.
 *
 * It is NOT the PERMA mini-result (that surface is [GAP-PERMA-MINIRESULT-SURFACE]
 * / A2, ADR-031, deferred to OLA 3): no reveal phrase, no visual, no delight. The
 * title ORIENTS; the reused ContentionBanner SUSTAINS the offer (its heading +
 * body + the CO lines). Calm, static paper — no night/climax motion (the delight
 * never leans on a low-wellbeing signal, mirroring TransitionScreen's sensitive
 * tone). The CTA continues to the normal Free close.
 *
 * Only rendered when the server decided showContention (resolveGuidedContention),
 * so ContentionBanner always mounts with `showContention`. Copy:
 * nfr28.MC_PERMA_CARE_SCREEN_* (Cowork sign-off 2026-07-23); the banner's own
 * landmark reuses MC_REPORT_CONTENTION_LANDMARK_ARIA.
 *
 * Anchors:
 *  - 02-UI-SPEC.md §6.4 (calm contention treatment, never alarm).
 *  - estado/DECISIONS_LOG.md ADR-033.
 *  - app/(b2c)/reporte/[sessionId]/_components/ContentionBanner.tsx (reused).
 */
import Link from "next/link";

import {
  ContentionBanner,
  type ContentionLine,
} from "@/app/(b2c)/reporte/[sessionId]/_components/ContentionBanner";
import { nfr28 } from "@/lib/i18n/microcopy/es-CO/nfr28";

interface PermaCareScreenProps {
  /** CO lines from the `contention_resources` seed — never hardcoded. */
  lines: ContentionLine[];
  /** Where "Continuar" routes — the normal Free close (or the teaser fallback). */
  continueHref: string;
}

export function PermaCareScreen({ lines, continueHref }: PermaCareScreenProps) {
  return (
    <main className="dm-paper mx-auto flex min-h-[100dvh] max-w-3xl flex-col justify-center gap-8 p-6">
      <section className="flex flex-col gap-4">
        <h1 className="text-center text-2xl font-semibold text-text-primary">
          {nfr28.MC_PERMA_CARE_SCREEN_HEADING}
        </h1>
        <p className="mx-auto max-w-[52ch] text-center text-base text-text-secondary">
          {nfr28.MC_PERMA_CARE_SCREEN_BODY}
        </p>
        <ContentionBanner showContention lines={lines} />
      </section>

      <div className="flex flex-col items-center">
        <Link
          href={continueHref}
          className="inline-flex w-full max-w-xs items-center justify-center rounded-full bg-accent px-6 py-3 font-semibold text-secondary transition-transform duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:-translate-y-0.5"
        >
          {nfr28.MC_PERMA_CARE_SCREEN_CTA}
        </Link>
      </div>
    </main>
  );
}
