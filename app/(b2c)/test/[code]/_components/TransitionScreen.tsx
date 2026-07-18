/**
 * TransitionScreen — cierra-y-abre entre tests Free (UI-SPEC §6.6,
 * CONTEXT D-A.4 / D-F4.2).
 *
 * Composicion (Ola 2 PR-C):
 *   1. Mini-resultado 3 partes (§9.5 + §9): "Qué medimos" (measure) / "Qué dice"
 *      (frase compuesta por reveal-composer) / "Por qué te importa" (why) + visual
 *      compacto por visual_type (VISUAL_REGISTRY) + leyenda de bandas (§4.4). Para
 *      un test sensible que cruzo el umbral del servidor, el footer de contencion
 *      NFR-28 (ContentionBanner, mismo componente que el reporte) — la decision de
 *      MOSTRARLO es del servidor (showContention), nunca se recomputa (T-02-08-02).
 *      Decision B (2026-07-01): NO link al reporte completo desde aqui.
 *   2. Recap fijo §4.3 del test recien terminado + dots de progreso 1..N.
 *   3. Recall de intención (§4.3) cuando el usuario la declaro en /intencion.
 *   4. Hook §4.1 del SIGUIENTE test (desde test-intro.ts, reusado — no duplicado)
 *      + CTA "Empezar".
 *
 * NFR-27 NOTE (ADR-029): esta pantalla NO monta el DisclaimerModal. El disclaimer
 * pre-test de un instrumento sensible se gatea en la ENTRADA del siguiente test
 * (TestEntryGate/PretestDisclaimerGate) — fuente unica de verdad.
 *
 * Transito dia→noche (overhaul motion-2, plan 2026-07-18): en modo climax el
 * main deja `.dm-paper` (los tokens semanticos revierten al tema nocturno) y un
 * velo papel `.dm-dusk` se desvanece mientras el visual se dibuja (animateIn) y
 * el resto del contenido escalona por delays (SEQ). TODO el contenido esta en
 * el DOM desde el primer frame (la animacion es solo presentacional — E2E y AT
 * ven la pantalla completa); el ContentionBanner NFR-28 jamas lleva delay;
 * tone === 'sensitive' comprime la secuencia (~1.0s) y omite el flourish del
 * visual; isResume conserva papel estatico sin animacion (UI-SPEC §5).
 *
 * Anchors:
 *  - 02-UI-SPEC.md §6.6 (TransitionScreen), §6.0 (VISUAL_REGISTRY), §6.4 (contencion).
 *  - MICROCOPY §9.5 (measure/why), §4.3 (recap/dots/recall), §4.4 (leyenda).
 *  - estado/HANDOFF_PR-C_GATE_y_diseno_composer_v1.0.md §5.
 */
"use client";

import { useRouter } from "next/navigation";

import {
  ContentionBanner,
  type ContentionLine,
} from "@/app/(b2c)/reporte/[sessionId]/_components/ContentionBanner";
import {
  VISUAL_REGISTRY,
  type VisualProps,
  type VisualType,
} from "@/app/(b2c)/reporte/[sessionId]/_components/visual-registry";
import { Starfield } from "@/components/Starfield";
import { REVEAL_BAND_LEGEND } from "@/lib/i18n/microcopy/es-CO/reveal-phrases";
import { transitions } from "@/lib/i18n/microcopy/es-CO/transitions";

export interface TransitionScreenProps {
  /** URL path the CTA routes to for the next test (`/test/<code>`). */
  nextHref: string;
  /** 1-line hook for the next test (§4.1, reusado de test-intro.ts). */
  hook: string;
  /**
   * Mini-resultado del test recién terminado (opcional — ausente en resume).
   *
   * El visual se construye POR `visualType`, espejo de reporte/page.tsx:
   *  - `hexagon` (O*NET) consume `{ scores, top3 }` (contrato propio, no toma
   *    `dimensions`). `scores`/`top3` OPCIONALES: un compose fallido degrada a
   *    frase sin visual.
   *  - `bars` / `circumplex` consumen `{ dimensions }` (VisualProps genérico).
   * measure/why/recap/tone/showContention los produce reveal-composer.
   */
  result?: {
    visualType: VisualType;
    dimensions?: VisualProps["dimensions"];
    /** hexagon-only: RIASEC raw scores. */
    scores?: Record<string, number>;
    /** hexagon-only: 3 letras en orden de prioridad. */
    top3?: readonly string[];
    /** "Qué dice" — frase compuesta (reveal-composer). */
    revealPhrase: string;
    /** §9.5 "Qué medimos". */
    measure?: string;
    /** §9.5 "Por qué te importa". */
    why?: string;
    /** 'sensitive' para la variante PERMA LOW_OVERALL. */
    tone?: "normal" | "sensitive";
    /** Decisión del servidor (footer NFR-28). Nunca se recomputa aquí. */
    showContention?: boolean;
    /** Líneas CO de contención (del seed, nunca hardcodeadas). */
    contentionLines?: ContentionLine[];
  };
  /** §4.3 recap fijo del test recién terminado (registro breve, no duplica la frase). */
  recap?: string;
  /** Dots de progreso: tests completados y total del journey. */
  progressDone?: number;
  progressTotal?: number;
  /** §4.3 recall de intención ya formateado (null si el usuario no la declaró). */
  intentRecall?: string;
  reducedMotion?: boolean;
  /** Partial-abandon counters (D-A.6). When set with no result → resume mode. */
  completed?: number;
  total?: number;
}

export function TransitionScreen({
  nextHref,
  hook,
  result,
  recap,
  progressDone,
  progressTotal,
  intentRecall,
  reducedMotion = false,
  completed,
  total,
}: TransitionScreenProps) {
  const router = useRouter();

  // Resume / partial-abandon mode: counters present and no fresh result.
  const isResume =
    !result && typeof completed === "number" && typeof total === "number";

  function onStart() {
    // El disclaimer NFR-27 ya no se monta aquí — se gatea en la entrada del
    // siguiente test (TestEntryGate/PretestDisclaimerGate, ADR-029).
    router.push(nextHref);
  }

  const Visual = result ? VISUAL_REGISTRY[result.visualType] : null;
  const isHexagon = result?.visualType === "hexagon";

  // Reveal choreography (ms) — presentational delays over content that is in
  // the DOM from the first frame. Sensitive tone (PERMA low) compresses the
  // sequence and skips the visual flourish: the delight never leans on a
  // low-wellbeing signal. ContentionBanner NEVER carries a delay.
  const isSensitive = result?.tone === "sensitive";
  const SEQ = isSensitive
    ? { measure: 250, phrase: 550, why: 700, recap: 800, dot: 850, hook: 950 }
    : { measure: 350, phrase: 1000, why: 1250, recap: 1400, dot: 1450, hook: 1550 };
  const animateVisual = !isSensitive && !reducedMotion;

  const visualProps: VisualProps | null = !result
    ? null
    : isHexagon
      ? result.scores && result.top3
        ? ({
            scores: result.scores,
            top3: result.top3,
            animateIn: animateVisual,
          } as unknown as VisualProps)
        : null
      : result.dimensions
        ? { dimensions: result.dimensions, reducedMotion, animateIn: animateVisual }
        : null;

  const showDots =
    typeof progressDone === "number" && typeof progressTotal === "number";

  return (
    <main
      className={
        isResume
          ? "dm-paper mx-auto flex min-h-[100dvh] max-w-3xl flex-col justify-center gap-10 p-6"
          : "relative mx-auto flex min-h-[100dvh] max-w-3xl flex-col justify-center gap-10 p-6"
      }
    >
      {!isResume ? (
        <>
          {/* Day→night transit (the product signature): a paper veil lifts off
              the nocturnal ground while the sky appears and the result draws
              itself. Both layers decorative; reduced motion shows night directly. */}
          <div
            aria-hidden="true"
            className="dm-dusk pointer-events-none fixed inset-0 z-20"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 motion-safe:animate-appear"
            style={{ animationDelay: "250ms" }}
          >
            <Starfield />
          </div>
        </>
      ) : null}

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
        result && (
          <section className="flex flex-col gap-4">
            <h2
              className="text-center text-sm font-semibold text-text-secondary motion-safe:animate-fade-in"
              style={{ animationDelay: `${SEQ.measure}ms` }}
            >
              {transitions.MC_TRANSITION_RESULT_HEADING}
            </h2>

            {result.measure ? (
              <p
                className="text-center text-[13px] text-text-secondary motion-safe:animate-fade-in"
                style={{ animationDelay: `${SEQ.measure}ms` }}
              >
                <span className="font-semibold">
                  {transitions.MC_MINIRESULT_MEASURE_LABEL}:
                </span>{" "}
                {result.measure}
              </p>
            ) : null}

            {Visual && visualProps && (
              <div className="mx-auto w-full max-w-sm">
                <Visual {...visualProps} />
              </div>
            )}

            <p
              className="text-center text-lg font-medium text-text-primary motion-safe:animate-line-reveal"
              style={{ animationDelay: `${SEQ.phrase}ms` }}
            >
              {result.revealPhrase}
            </p>

            {result.why ? (
              <p
                className="mx-auto max-w-[52ch] text-center text-[13px] text-text-secondary motion-safe:animate-fade-in"
                style={{ animationDelay: `${SEQ.why}ms` }}
              >
                <span className="font-semibold">
                  {transitions.MC_MINIRESULT_WHY_LABEL}:
                </span>{" "}
                {result.why}
              </p>
            ) : null}

            <p
              className="text-center text-[12px] italic text-text-secondary motion-safe:animate-fade-in"
              style={{ animationDelay: `${SEQ.why}ms` }}
            >
              {REVEAL_BAND_LEGEND}
            </p>

            {/* NFR-28: never animated, never delayed — visible from frame one. */}
            {result.contentionLines && result.contentionLines.length > 0 ? (
              <ContentionBanner
                showContention={result.showContention ?? false}
                lines={result.contentionLines}
              />
            ) : null}
          </section>
        )
      )}

      {!isResume && (recap || showDots || intentRecall) ? (
        <section className="flex flex-col items-center gap-3 text-center">
          {recap ? (
            <p
              className="text-base font-medium text-text-primary motion-safe:animate-fade-in"
              style={{ animationDelay: `${SEQ.recap}ms` }}
            >
              {recap}
            </p>
          ) : null}
          {showDots ? (
            <div
              className="flex items-center gap-2 motion-safe:animate-fade-in"
              style={{ animationDelay: `${SEQ.recap}ms` }}
            >
              <span aria-hidden="true" className="flex items-center gap-2">
                {Array.from({ length: progressTotal as number }, (_, i) => {
                  const done = i < (progressDone as number);
                  const isNewest = i === (progressDone as number) - 1;
                  return (
                    <span
                      // biome-ignore lint/suspicious/noArrayIndexKey: position IS the dot's identity
                      key={i}
                      className={`inline-block h-2 w-2 rounded-full ${
                        done ? "bg-star" : "border border-border-default"
                      }${isNewest ? " motion-safe:animate-appear" : ""}`}
                      style={
                        isNewest ? { animationDelay: `${SEQ.dot}ms` } : undefined
                      }
                    />
                  );
                })}
              </span>
              <span className="sr-only">
                {transitions.MC_TRANSITION_PROGRESS_ARIA(
                  progressDone as number,
                  progressTotal as number,
                )}
              </span>
            </div>
          ) : null}
          {intentRecall ? (
            <p
              className="max-w-[48ch] text-[13.5px] font-semibold text-success motion-safe:animate-fade-in"
              style={{ animationDelay: `${SEQ.recap}ms` }}
            >
              {intentRecall}
            </p>
          ) : null}
        </section>
      ) : null}

      <section
        className={
          isResume
            ? "flex flex-col items-center gap-6"
            : "flex flex-col items-center gap-6 motion-safe:animate-fade-in"
        }
        style={isResume ? undefined : { animationDelay: `${SEQ.hook}ms` }}
      >
        <p className="text-center text-xl font-semibold text-text-primary">
          {hook}
        </p>
        <button
          type="button"
          onClick={onStart}
          className="inline-flex w-full max-w-xs items-center justify-center rounded-full bg-accent px-6 py-3 font-semibold text-secondary transition-transform duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:-translate-y-0.5"
        >
          {isResume
            ? transitions.MC_TRANSITION_RESUME_CTA
            : transitions.MC_TRANSITION_CTA}
        </button>
      </section>
    </main>
  );
}
