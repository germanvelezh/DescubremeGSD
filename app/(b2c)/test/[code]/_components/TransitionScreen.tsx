/**
 * TransitionScreen — closes-and-opens between Free tests (UI-SPEC §6.6,
 * CONTEXT D-A.4 / D-F4.2).
 *
 * Composition:
 *   1. Glanceable result of the test just finished: the visual resolved by
 *      `visual_type` via VISUAL_REGISTRY (compact) + a 1-line reveal phrase +
 *      a "Ver reporte completo" link to the PERSISTENT layered report (D-A.4 —
 *      the full report exists and is reachable, not forced inline).
 *   2. A 1-line hook for the next test.
 *   3. CTA "Empezar".
 *   4. If the NEXT instrument is sensitive (`nextPretestModal=true`, i.e. its
 *      seed `ethical_flags.pretest_modal` decoupled true — BFI-2-S / PERMA),
 *      pressing "Empezar" mounts the NFR-27 `DisclaimerModal` (variant bfi|perma)
 *      BEFORE the first item. The values instrument (TwIVI) is `sensitivity=high`
 *      but NOT `emotional_distress` → no modal (D-A.2).
 *
 * Partial-abandon (D-A.6): when `completed`/`total` are passed and there is no
 * fresh result to show, the screen shows "Completaste X de N. [Continuar]".
 *
 * `pretest_modal` is server-loaded (decoupleEthicalFlags) and passed in — the
 * modal mount is keyed off server data, never a client-side instrument check
 * (T-02-07-03).
 *
 * Anchors:
 *  - 02-UI-SPEC.md §6.6 (TransitionScreen), §6.0 (VISUAL_REGISTRY), §7.1.
 *  - 02-CONTEXT.md D-A.4, D-D.5, D-F4.2.
 *  - DisclaimerModal.tsx (02-06), visual-registry.ts (02-05).
 */
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { DisclaimerModal } from "@/app/(b2c)/reporte/[sessionId]/_components/DisclaimerModal";
import {
  VISUAL_REGISTRY,
  type VisualProps,
  type VisualType,
} from "@/app/(b2c)/reporte/[sessionId]/_components/visual-registry";
import { transitions } from "@/lib/i18n/microcopy/es-CO/transitions";

export interface TransitionScreenProps {
  /** URL path the CTA routes to for the next test (`/test/<code>`). */
  nextHref: string;
  /** 1-line hook for the next test. */
  hook: string;
  /** Whether the NEXT instrument requires the NFR-27 modal (server-decoupled). */
  nextPretestModal: boolean;
  /** Disclaimer copy variant (affect vs well-being) for the modal. */
  modalVariant: "bfi" | "perma";
  /** Glanceable result of the test just finished (optional — absent on resume). */
  result?: {
    visualType: VisualType;
    dimensions: VisualProps["dimensions"];
    revealPhrase: string;
    reportHref: string;
  };
  reducedMotion?: boolean;
  /** Partial-abandon counters (D-A.6). When set with no result → resume mode. */
  completed?: number;
  total?: number;
}

export function TransitionScreen({
  nextHref,
  hook,
  nextPretestModal,
  modalVariant,
  result,
  reducedMotion = false,
  completed,
  total,
}: TransitionScreenProps) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

  // Resume / partial-abandon mode: counters present and no fresh result.
  const isResume =
    !result && typeof completed === "number" && typeof total === "number";

  function onStart() {
    if (nextPretestModal) {
      setModalOpen(true);
      return;
    }
    router.push(nextHref);
  }

  const Visual = result ? VISUAL_REGISTRY[result.visualType] : null;

  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-3xl flex-col justify-center gap-12 p-6">
      {isResume ? (
        <div className="flex flex-col gap-4 text-center">
          <p className="text-base text-text-primary">
            {transitions.MC_TRANSITION_RESUME_LABEL(
              completed as number,
              total as number,
            )}
          </p>
        </div>
      ) : (
        result &&
        Visual && (
          <section className="flex flex-col gap-4">
            <h2 className="text-center text-sm font-semibold text-text-secondary">
              {transitions.MC_TRANSITION_RESULT_HEADING}
            </h2>
            <div className="mx-auto w-full max-w-sm">
              <Visual
                dimensions={result.dimensions}
                reducedMotion={reducedMotion}
              />
            </div>
            <p className="text-center text-base text-text-primary">
              {result.revealPhrase}
            </p>
            <Link
              href={result.reportHref}
              className="text-center text-sm text-accent hover:underline"
            >
              {transitions.MC_TRANSITION_REPORT_LINK}
            </Link>
          </section>
        )
      )}

      <section className="flex flex-col items-center gap-6">
        <p className="text-center text-xl font-semibold text-text-primary">
          {hook}
        </p>
        <button
          type="button"
          onClick={onStart}
          className="inline-flex w-full max-w-xs items-center justify-center rounded-full bg-accent px-6 py-3 font-semibold text-secondary transition-transform duration-200 ease-out hover:-translate-y-0.5"
        >
          {isResume
            ? transitions.MC_TRANSITION_RESUME_CTA
            : transitions.MC_TRANSITION_CTA}
        </button>
      </section>

      {/* NFR-27 modal — mounted only when the NEXT instrument is sensitive. */}
      <DisclaimerModal
        open={modalOpen}
        variant={modalVariant}
        onContinue={() => router.push(nextHref)}
        onBack={() => setModalOpen(false)}
      />
    </main>
  );
}
