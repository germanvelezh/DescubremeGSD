/**
 * IntegratedTeaser — the "magia" climax (UI-SPEC §6.7, D-B.1/B.2/B.3).
 *
 * Renders the declarative evaluator's output: 4-6 synthesis phrases (fade-in
 * stagger) + 1-2 "pincelada" crosses, the honest Paid upsell (MC_TEASER_UPSELL)
 * + WaitlistOptIn reuse (D-B.3). Degrades on quality flag: the evaluator already
 * omitted any cross over a flagged score (D-F2.1), so this component only adds a
 * soft, non-accusatory note when something was omitted.
 *
 * Hypothesis language only — all copy flows from the seed/microcopy that pass
 * the anti-determinism + clinical lint (02-02). This component renders DATA;
 * it never authors deterministic claims.
 *
 * Sober, no gamification (UX-07). The phrases use a CSS-only fade-in honoring
 * prefers-reduced-motion.
 *
 * Anchors:
 *   - 02-UI-SPEC.md §6.7 (content contract), §7.4.
 *   - 02-CONTEXT.md D-B.2 (phrases + crosses), D-B.3 (upsell + waitlist), D-F2.1.
 */
"use client";

import { teaser as MC } from "@/lib/i18n/microcopy/es-CO/teaser";

import { WaitlistOptIn } from "@/app/(b2c)/reporte/[sessionId]/_components/WaitlistOptIn";

export interface IntegratedTeaserProps {
  /** 4-6 synthesis phrases (already gated + degraded by the evaluator). */
  phrases: string[];
  /** 1-2 cross "pincelada" lines (crosses over flagged scores already omitted). */
  crosses: string[];
  /** True when at least one cross was omitted due to a quality flag (D-F2.1). */
  omittedForQuality: boolean;
  /** Authenticated email for the waitlist opt-in (D-B.3). */
  email: string;
}

export function IntegratedTeaser({
  phrases,
  crosses,
  omittedForQuality,
  email,
}: IntegratedTeaserProps) {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-text-primary">
          {MC.MC_TEASER_HEADING}
        </h1>
        <p className="text-base text-text-secondary">{MC.MC_TEASER_INTRO}</p>
      </header>

      {/* Synthesis phrases — staggered fade-in (reduced-motion safe). */}
      <section className="flex flex-col gap-4" aria-label={MC.MC_TEASER_HEADING}>
        {phrases.map((phrase, i) => (
          <p
            key={phrase}
            className="text-lg leading-relaxed text-text-primary motion-safe:animate-[fadeIn_0.5s_ease-out_both]"
            style={{ animationDelay: `${i * 120}ms` }}
          >
            {phrase}
          </p>
        ))}
      </section>

      {/* Cross "pincelada" lines. */}
      {crosses.length > 0 ? (
        <section className="flex flex-col gap-3 rounded-lg bg-surface-tertiary p-5">
          <h2 className="text-xl font-semibold text-text-primary">
            {MC.MC_TEASER_CROSSES_HEADING}
          </h2>
          {crosses.map((cross) => (
            <p key={cross} className="text-base text-text-primary">
              {cross}
            </p>
          ))}
        </section>
      ) : null}

      {/* Soft note when a cross was omitted for a quality flag (D-F2.1). */}
      {omittedForQuality ? (
        <p className="text-sm text-text-secondary">{MC.MC_TEASER_OMITTED_NOTE}</p>
      ) : null}

      {/* Honest Paid upsell + waitlist opt-in (D-B.3). No urgency. */}
      <section className="flex flex-col gap-3 border-t border-border-default pt-6">
        <p className="text-base text-text-secondary">{MC.MC_TEASER_UPSELL}</p>
        <WaitlistOptIn email={email} />
      </section>
    </div>
  );
}
