/**
 * Landing page `/` — DescubreMe Phase 1 Wave 3 (Plan 01-06 Task 3).
 *
 * Anonymous entry. One headline, one CTA, one honest line about time +
 * no signup. Replaces the Plan 01-02 Tailwind smoke test that lived
 * here as part of ADR-008 evidence.
 *
 * Anchors:
 * - 01-UI-SPEC.md §7.1.
 * - 01-CONTEXT.md D2.1.
 * - UX-01 (es-CO), UX-02 (sin urgencia).
 */
import Link from "next/link";

import { landing } from "@/lib/i18n/microcopy/es-CO/landing";

export default function LandingPage() {
  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-3xl flex-col items-center justify-center gap-6 p-6 text-center">
      <p className="self-start text-base font-semibold text-text-primary">
        DescubreMe
      </p>
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-semibold leading-tight text-text-primary">
          {landing.MC_LANDING_HEADLINE}
        </h1>
        <p className="text-base text-text-secondary">
          {landing.MC_LANDING_SUBHEAD}
        </p>
        <Link
          href="/onboarding/before-you-start"
          className="mt-6 inline-flex w-full max-w-xs items-center justify-center rounded-md bg-accent px-4 py-2 font-semibold text-secondary transition-colors hover:bg-accent-muted hover:text-accent"
        >
          {landing.MC_LANDING_CTA_PRIMARY}
        </Link>
        <p className="mt-2 text-sm text-text-secondary">
          {landing.MC_LANDING_HONEST_LINE}
        </p>
      </div>
    </main>
  );
}
