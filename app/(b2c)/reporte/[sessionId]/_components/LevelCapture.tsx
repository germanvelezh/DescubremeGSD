/**
 * LevelCapture — inline level-of-preparation capture (Phase 02.1 Wave 5).
 *
 * Client Component rendered in the report's LAYER 3 slot (occupation reveal)
 * when the O*NET/hexagon report has no captured level yet (page gate:
 * `isHexagon && !educationLevel`). Captures `education_level` + `career_stage`
 * (pack §2) and — once both are answered — reveals the inferred-level confirm +
 * `explore_intent` control (pack §3) and the Ley 1581 §4 disclosure, then submits
 * to `captureLevelAction`. On success the action revalidates `/reporte` and this
 * slot re-renders as the zone-filtered occupation list.
 *
 * Placement rationale (owner decision 2026-06-26): inline in layer 3, NOT a
 * whole-page interstitial — the hexagon + narrative (the delight, CLAUDE.md §2.4)
 * render immediately; the level questions appear exactly "antes de la revelación
 * ocupacional" (pack §2). No "Job Zone" term is exposed to the user (pack §3).
 *
 * Anchors:
 *  - implementation_packs/Onboarding_Nivel_Microcopy_es-CO_Pack_v1.0.md §2-§4.
 *  - app/(b2c)/reporte/[sessionId]/actions.ts (captureLevelAction).
 *  - app/(account)/me/data/ProfileForm.tsx (useActionState form pattern).
 */
"use client";

import { useActionState, useId, useState } from "react";

import { onboardingNivel as MC } from "@/lib/i18n/microcopy/es-CO/onboarding-nivel";

import { type CaptureLevelResult, captureLevelAction } from "../actions";

const OPTION_CLASS =
  "flex cursor-pointer items-center gap-3 rounded-md border border-border-default bg-surface-secondary px-4 py-3 text-base text-text-primary transition-colors has-[:checked]:border-accent has-[:checked]:bg-secondary";

export function LevelCapture({ sessionId }: { sessionId: string }) {
  const [state, action, pending] = useActionState<
    CaptureLevelResult | null,
    FormData
  >(captureLevelAction, null);

  // Controlled so the §3 confirm + submit only appear once BOTH are answered
  // (server also validates via Zod — defense in depth).
  const [education, setEducation] = useState("");
  const [career, setCareer] = useState("");
  const bothAnswered = education !== "" && career !== "";

  const eduLegendId = useId();
  const expLegendId = useId();
  const intentLegendId = useId();

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="font-display text-2xl text-text-primary">
          {MC.MC_NIVEL_TITLE}
        </h2>
        <p className="text-base text-text-secondary">{MC.MC_NIVEL_SUBTITLE}</p>
      </div>

      <form action={action} className="flex flex-col gap-6">
        <input type="hidden" name="sessionId" value={sessionId} />

        {/* §2.1 — nivel educativo */}
        <fieldset className="flex flex-col gap-2" aria-labelledby={eduLegendId}>
          <legend
            id={eduLegendId}
            className="mb-1 text-base font-medium text-text-primary"
          >
            {MC.MC_NIVEL_Q_EDUCATION}
          </legend>
          {MC.MC_NIVEL_EDUCATION_OPTIONS.map((opt) => (
            <label key={opt.value} className={OPTION_CLASS}>
              <input
                type="radio"
                name="educationLevel"
                value={opt.value}
                checked={education === opt.value}
                onChange={() => setEducation(opt.value)}
                className="accent-accent"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </fieldset>

        {/* §2.2 — experiencia */}
        <fieldset className="flex flex-col gap-2" aria-labelledby={expLegendId}>
          <legend
            id={expLegendId}
            className="mb-1 text-base font-medium text-text-primary"
          >
            {MC.MC_NIVEL_Q_EXPERIENCE}
          </legend>
          {MC.MC_NIVEL_EXPERIENCE_OPTIONS.map((opt) => (
            <label key={opt.value} className={OPTION_CLASS}>
              <input
                type="radio"
                name="careerStage"
                value={opt.value}
                checked={career === opt.value}
                onChange={() => setCareer(opt.value)}
                className="accent-accent"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </fieldset>

        <p className="text-sm text-text-secondary">{MC.MC_NIVEL_HELP}</p>

        {/* §3 — confirm + ajuste (explore_intent). Revealed once both answered.
            "Job Zone" is never exposed; the copy speaks of "preparación". */}
        {bothAnswered ? (
          <div className="flex flex-col gap-4 border-t border-border-default pt-4">
            <p className="text-base text-text-primary">
              {MC.MC_NIVEL_ADJUST_TITLE}
            </p>
            <fieldset
              className="flex flex-col gap-2"
              aria-labelledby={intentLegendId}
            >
              <legend
                id={intentLegendId}
                className="mb-1 text-base font-medium text-text-primary"
              >
                {MC.MC_NIVEL_ADJUST_PROMPT}
              </legend>
              {MC.MC_NIVEL_INTENT_OPTIONS.map((opt, i) => (
                <label key={opt.value} className={OPTION_CLASS}>
                  <input
                    type="radio"
                    name="exploreIntent"
                    value={opt.value}
                    defaultChecked={i === 0}
                    className="accent-accent"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </fieldset>
            <p className="text-sm text-text-secondary">
              {MC.MC_NIVEL_INTENT_HELP}
            </p>

            {/* §4 — aviso Ley 1581 (informado, propósito acotado, revocable). */}
            <p className="rounded-md border border-border-default bg-surface-secondary p-3 text-sm text-text-secondary">
              {MC.MC_NIVEL_CONSENT_NOTICE}{" "}
              <a href="/consent" className="text-accent underline">
                {MC.MC_NIVEL_CONSENT_LINK}
              </a>
            </p>

            <button
              type="submit"
              disabled={pending}
              className="inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 font-semibold text-secondary transition-transform duration-200 ease-out hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {MC.MC_NIVEL_CTA}
            </button>

            {state && !state.ok ? (
              <p role="alert" className="text-sm text-destructive">
                {state.message}
              </p>
            ) : null}
          </div>
        ) : null}
      </form>
    </section>
  );
}
