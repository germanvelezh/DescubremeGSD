/**
 * TestEntryGate (Client Component) — test intro + NFR-27, one container (Ola 2.2).
 *
 * Shown ONCE at the entry of every test (session.progress === 0). Presents the
 * hook (§4.1) + "antes de comenzar" (§4.2) together, and — for a sensitive
 * instrument (pretest_modal: BFI/PERMA) — embeds the NFR-27 disclaimer in the
 * SAME container. It is the SINGLE gate that blocks item 1: the item (children)
 * only renders after acknowledgement.
 *
 * This REPLACES the separate overlay `DisclaimerModal`/`PretestDisclaimerGate`
 * for the sensitive path: "contenido NFR-27/28 intacto, solo el contenedor
 * cambia" (CLAUDE.md §8). The NFR-27 copy (`nfr27`), the contention resources
 * (`ContentionBanner` + `getContentionResources`), and the "Entiendo y continúo"
 * / "Ahora no" actions are byte-for-byte the modal's; only the presentation moves
 * from a fixed overlay to an inline card so hook + intro + NFR-27 read as one.
 * "Ahora no" exits to "/" (same as the modal's back-out); the session stays at
 * progress 0, so the test remains the user's next pending step.
 *
 * Not re-shown on resume: page.tsx returns the resume interstitial for
 * progress > 0 before this mounts, and after the first answer progress is 1, so
 * a refresh never lands here again.
 *
 * Anchors:
 *  - lib/i18n/microcopy/es-CO/test-intro.ts (§4.1 hooks + §4.2 intros).
 *  - lib/i18n/microcopy/es-CO/nfr27.ts + DisclaimerModal.tsx (NFR-27 content, intact).
 *  - HANDOFF_UI_v1.0 §3 (Ola 2.2); estado/DECISIONS_LOG.md ADR-029.
 */
"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useState } from "react";

import { nfr27 } from "@/lib/i18n/microcopy/es-CO/nfr27";
import { testIntro } from "@/lib/i18n/microcopy/es-CO/test-intro";
import {
  ContentionBanner,
  type ContentionLine,
} from "@/app/(b2c)/reporte/[sessionId]/_components/ContentionBanner";
import { type DisclaimerVariant } from "@/app/(b2c)/reporte/[sessionId]/_components/DisclaimerModal";

const NFR27_COPY: Record<
  DisclaimerVariant,
  { heading: string; body: string }
> = {
  bfi: { heading: nfr27.MC_NFR27_BFI_HEADING, body: nfr27.MC_NFR27_BFI_BODY },
  perma: {
    heading: nfr27.MC_NFR27_PERMA_HEADING,
    body: nfr27.MC_NFR27_PERMA_BODY,
  },
};

export function TestEntryGate({
  hook,
  intro,
  sensitive,
  variant,
  contentionLines,
  children,
}: {
  hook: string;
  intro: string;
  /** True for pretest_modal instruments (BFI/PERMA) — embeds the NFR-27 block. */
  sensitive: boolean;
  variant: DisclaimerVariant;
  contentionLines?: ContentionLine[];
  children: ReactNode;
}) {
  const router = useRouter();
  const [acknowledged, setAcknowledged] = useState(false);

  if (acknowledged) return <>{children}</>;

  const nfr27Copy = NFR27_COPY[variant];

  return (
    <section
      aria-label={testIntro.MC_INTRO_SECTION_ARIA}
      className="flex flex-1 flex-col justify-center gap-6 py-4"
    >
      <div className="flex flex-col gap-4">
        <h1 className="max-w-prose font-display text-3xl leading-snug text-text-primary sm:text-4xl">
          {hook}
        </h1>
        <p className="max-w-prose text-base text-text-secondary">{intro}</p>
      </div>

      {sensitive ? (
        <div className="flex flex-col gap-4 rounded-lg border border-border-default bg-surface-secondary p-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-base font-semibold text-text-primary">
              {nfr27Copy.heading}
            </h2>
            <p className="text-sm text-text-primary">{nfr27Copy.body}</p>
          </div>
          {contentionLines && contentionLines.length > 0 ? (
            <ContentionBanner showContention={false} lines={contentionLines} />
          ) : null}
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-border-default bg-secondary px-4 text-sm font-medium text-text-primary hover:bg-accent-muted"
            >
              {nfr27.MC_NFR27_CTA_BACK}
            </button>
            <button
              type="button"
              onClick={() => setAcknowledged(true)}
              className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-accent px-4 text-sm font-semibold text-secondary hover:opacity-90"
            >
              {nfr27.MC_NFR27_CTA_PRIMARY}
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setAcknowledged(true)}
          className="inline-flex min-h-[44px] w-full max-w-xs items-center justify-center rounded-md bg-accent px-4 font-semibold text-secondary hover:opacity-90"
        >
          {testIntro.MC_INTRO_START_CTA}
        </button>
      )}
    </section>
  );
}
