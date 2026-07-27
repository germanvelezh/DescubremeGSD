/**
 * BarsWithBands — instrument-agnostic horizontal-bar visual
 * (visual_type='bars', UI-SPEC §6.1).
 *
 * Used for any domain instrument whose dimensions are independent bands
 * (multi-domain personality, well-being pillars — resolved by enum, NOT by
 * code here).
 * Pure presentational: renders ONLY from `dimensions[]`. No instrument-code
 * literals, no percentile, no comparison, no per-band color (FOUND-05 +
 * anti-juicio/anti-clínico).
 *
 * Visual contract (UI-SPEC §4/§6.1, ADR-034):
 *  - Track = surface-tertiary; fill = accent at fill-opacity 0.6 (parity with
 *    the hexagon). Bar LENGTH follows the BAND (three discrete widths,
 *    Bajo < Medio < Alto) — NOT the raw score. The band is ipsative, so a
 *    band-driven length keeps bar and band telling the same story (an absolute
 *    magnitude would contradict the band in homogeneous profiles).
 *  - Band label (Alto/Medio/Bajo) to the right is the PRIMARY non-color signal.
 *  - Optional `intro` (per-instrument, resolved upstream) above the bars +
 *    a shared length note below them.
 *  - role="img" + <title>/<desc> + sr-only <table> (HexagonoRiasecFull scaffold).
 *  - reducedMotion → no fill animation.
 *
 * Anchors:
 *  - 02-UI-SPEC.md §6.0 (VisualProps), §6.1 (layout), §4 (fill parity).
 *  - 02-CONTEXT.md D-C.1, D-E1.1 (bandas, no percentil).
 *  - HexagonoRiasecFull.tsx (a11y SVG scaffold).
 */
"use client";

import { useId } from "react";

import { report } from "@/lib/i18n/microcopy/es-CO/report";

import type { VisualBand, VisualProps } from "./visual-registry";

const BAND_LABEL: Record<VisualBand, string> = {
  BAJO: "Bajo",
  MEDIO: "Medio",
  ALTO: "Alto",
};

// Bar length by band (ADR-034): three fixed, distinct, monotone widths. The
// band is the signal; the length just makes it legible. ALTO leaves headroom so
// it does not read as a maxed-out gauge.
const BAND_RATIO: Record<VisualBand, number> = {
  BAJO: 0.35,
  MEDIO: 0.62,
  ALTO: 0.9,
};

export function BarsWithBands({ dimensions, reducedMotion, animateIn = false, intro }: VisualProps) {
  const titleId = useId();
  const descId = useId();
  const tableId = useId();

  const verbalDescription = dimensions
    .map((d) => `${d.label}: banda ${BAND_LABEL[d.band]}.`)
    .join(" ");

  return (
    <div className="flex w-full flex-col gap-4">
      <svg
        role="img"
        aria-labelledby={titleId}
        aria-describedby={`${descId} ${tableId}`}
        viewBox="0 0 100 1"
        width="100%"
        height="0"
        style={{ position: "absolute", width: 0, height: 0 }}
      >
        <title id={titleId}>{report.MC_BARS_TABLE_CAPTION}</title>
        <desc id={descId}>{verbalDescription}</desc>
      </svg>

      {/* Per-instrument intro (ADR-034) — resolved upstream, so the component
          stays instrument-agnostic. Absent for callers that pass no intro. */}
      {intro ? (
        <p className="max-w-prose text-sm text-text-secondary">{intro}</p>
      ) : null}

      <ul className="flex flex-col gap-2">
        {dimensions.map((d, i) => {
          const pct = BAND_RATIO[d.band] * 100;
          return (
            <li key={d.code} className="flex flex-col gap-1">
              <span className="text-xl font-semibold text-text-primary">
                {d.label}
              </span>
              <div className="flex items-center gap-2">
                <div className="h-2 flex-1 overflow-hidden rounded-sm bg-surface-tertiary">
                  {/* animateIn: each bar grows 0 -> its width, staggered 80ms per
                      row (HANDOFF §2). The final width is in the DOM from the
                      first paint; scaleX only animates the paint. */}
                  <div
                    className={
                      animateIn && !reducedMotion
                        ? "h-full origin-left rounded-sm bg-accent motion-safe:animate-bar-fill"
                        : reducedMotion
                          ? "h-full rounded-sm bg-accent"
                          : "h-full rounded-sm bg-accent transition-[width] duration-[var(--duration-medium)] ease-[var(--ease-standard)]"
                    }
                    style={
                      animateIn && !reducedMotion
                        ? { width: `${pct}%`, animationDelay: `${i * 80}ms` }
                        : { width: `${pct}%` }
                    }
                    aria-hidden="true"
                  />
                </div>
                {/* Band label = primary non-color signal (caption/600). */}
                <span className="text-sm font-semibold text-text-primary tabular-nums">
                  {BAND_LABEL[d.band]}
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Shared length rule (ADR-034): the bar follows the band, not a score. */}
      <p className="text-sm text-text-secondary">{report.MC_BARS_LENGTH_NOTE}</p>
      {/* Nota de baremo agnostica: el significado de la banda lo aporta
          `intro`, que el assembler resuelve por instrumento, asi que aqui solo
          va la parte universal (no hay baremo validado para Colombia). La nota
          larga del reporte de intereses abre hablando de "interes" y no aplica
          a este visual; la renderiza esa pantalla, no este componente. */}
      <p className="text-sm text-text-secondary">{report.MC_BARS_BAREMO_NOTE}</p>

      {/* sr-only fallback table — full non-color data for assistive tech. */}
      <table id={tableId} className="sr-only">
        <caption>{report.MC_BARS_TABLE_CAPTION}</caption>
        <thead>
          <tr>
            <th scope="col">Dimensión</th>
            <th scope="col">Banda</th>
          </tr>
        </thead>
        <tbody>
          {dimensions.map((d) => (
            <tr key={d.code}>
              <th scope="row">{d.label}</th>
              <td>{BAND_LABEL[d.band]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
