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
 * Visual contract (UI-SPEC §4/§6.1):
 *  - Track = surface-tertiary; fill = accent at fill-opacity 0.6 (parity with
 *    the hexagon), proportional to value/(max ?? 5).
 *  - Band label (Alto/Medio/Bajo) to the right is the PRIMARY non-color signal.
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

const DEFAULT_MAX = 5;

function ratioOf(value: number, max?: number): number {
  const denom = max && max > 0 ? max : DEFAULT_MAX;
  return Math.max(0, Math.min(1, value / denom));
}

export function BarsWithBands({ dimensions, reducedMotion, animateIn = false }: VisualProps) {
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

      <ul className="flex flex-col gap-2">
        {dimensions.map((d, i) => {
          const pct = ratioOf(d.value, d.max) * 100;
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

      <p className="text-sm text-text-secondary">{report.MC_REPORT_BAREMO_NOTE}</p>

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
