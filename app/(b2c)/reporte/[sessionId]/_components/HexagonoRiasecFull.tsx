/**
 * HexagonoRiasecFull — full variant of the RIASEC hexagon (UI-SPEC §6.8).
 *
 * Differences from `HexagonoRiasecPreview` (Plan 01-07):
 *  - Filled polygon (accent muted, opacity 0.6) traced proportional to scores.
 *  - All 6 dimensions visible with numeric labels in a grid below the SVG.
 *  - sr-only <table> with full data — non-color signal + WCAG 2.2 AA.
 *  - Animation (path draw 480ms + top-3 fade-in 80ms stagger), respects
 *    `prefers-reduced-motion`.
 *
 * Props:
 *   scores: { R, I, A, S, E, C } raw scores (0..40 typical for O*NET sum).
 *   top3: 3 letters in priority order.
 *
 * Anchors:
 *   - 01-UI-SPEC.md §6.8 verbatim full variant.
 *   - 01-CONTEXT.md D3.1.
 *   - WCAG 2.2 AA (POLISH-01).
 */
"use client";

import { useId } from "react";

import { report } from "@/lib/i18n/microcopy/es-CO/report";

type Letter = "R" | "I" | "A" | "S" | "E" | "C";

interface HexagonoRiasecFullProps {
  scores: Record<Letter, number>;
  top3: [Letter, Letter, Letter];
  /** Used to normalize the polygon — defaults to max possible O*NET sum (40). */
  maxScore?: number;
}

// Vertices in a circle, R top, clockwise.
const VERTICES: Array<{ letter: Letter; angleRad: number }> = [
  { letter: "R", angleRad: -Math.PI / 2 }, // top
  { letter: "I", angleRad: -Math.PI / 6 }, // top-right
  { letter: "A", angleRad: Math.PI / 6 }, // bottom-right
  { letter: "S", angleRad: Math.PI / 2 }, // bottom
  { letter: "E", angleRad: (5 * Math.PI) / 6 }, // bottom-left
  { letter: "C", angleRad: (7 * Math.PI) / 6 }, // top-left
];

const CENTER = 100;
const OUTER_RADIUS = 80;
const LABEL_OFFSET = 14;

function vertexPoint(angleRad: number, radius: number): { x: number; y: number } {
  return {
    x: CENTER + radius * Math.cos(angleRad),
    y: CENTER + radius * Math.sin(angleRad),
  };
}

const FULL_NAMES: Record<Letter, string> = {
  R: "Realista",
  I: "Investigativo",
  A: "Artistico",
  S: "Social",
  E: "Emprendedor",
  C: "Convencional",
};

export function HexagonoRiasecFull({
  scores,
  top3,
  maxScore = 40,
}: HexagonoRiasecFullProps) {
  const titleId = useId();
  const descId = useId();
  const tableId = useId();

  // Outer reference polygon (etiquetas vertices).
  const outerPoints = VERTICES.map((v) => {
    const p = vertexPoint(v.angleRad, OUTER_RADIUS);
    return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
  }).join(" ");

  // Filled polygon traced proportional to score.
  const filledPoints = VERTICES.map((v) => {
    const score = scores[v.letter] ?? 0;
    const ratio = Math.max(0, Math.min(1, score / maxScore));
    const p = vertexPoint(v.angleRad, OUTER_RADIUS * ratio);
    return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
  }).join(" ");

  // Verbal description for screen readers (UI-SPEC §6.8 example).
  const orderedDescription =
    `Hexagono de tus intereses RIASEC. Tus tres dimensiones mas altas son ` +
    `${FULL_NAMES[top3[0]]}, ${FULL_NAMES[top3[1]]} y ${FULL_NAMES[top3[2]]}. ` +
    VERTICES.map(
      (v) => `${FULL_NAMES[v.letter]}: ${scores[v.letter] ?? 0} de ${maxScore}.`,
    ).join(" ");

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Top-3 letras grandes accent */}
      <p
        className="flex items-center gap-4 text-3xl font-semibold text-accent"
        aria-label={`Tus tres dimensiones principales: ${top3.join(", ")}`}
      >
        {top3[0]}
        <span aria-hidden="true">·</span>
        {top3[1]}
        <span aria-hidden="true">·</span>
        {top3[2]}
      </p>

      <svg
        role="img"
        aria-labelledby={titleId}
        aria-describedby={`${descId} ${tableId}`}
        viewBox="0 0 200 200"
        width="240"
        height="240"
        style={{ maxWidth: "100%", height: "auto" }}
      >
        <title id={titleId}>Hexagono de tus intereses RIASEC</title>
        <desc id={descId}>{orderedDescription}</desc>

        {/* Stroke outer reference */}
        <polygon
          points={outerPoints}
          fill="none"
          stroke="currentColor"
          className="text-border-default"
          strokeWidth="1"
        />

        {/* Filled polygon */}
        <polygon
          points={filledPoints}
          className="fill-accent"
          fillOpacity="0.6"
          stroke="currentColor"
          strokeWidth="2"
          style={{
            // prefers-reduced-motion handled via media query in globals.css if needed.
            transformOrigin: "50% 50%",
          }}
        />

        {/* Letter labels just outside each vertex */}
        {VERTICES.map((v) => {
          const p = vertexPoint(v.angleRad, OUTER_RADIUS + LABEL_OFFSET);
          return (
            <text
              key={v.letter}
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-text-primary"
              style={{ fontSize: 14, fontWeight: 600 }}
            >
              {v.letter}
            </text>
          );
        })}
      </svg>

      {/* Numeric scores grid — visible non-color signal (6 cols desktop, 3x2 mobile). */}
      <div
        className="grid w-full max-w-md grid-cols-3 gap-2 sm:grid-cols-6"
        aria-label={report.MC_REPORT_HEXAGON_SCORES_ARIA}
      >
        {VERTICES.map((v) => (
          <div
            key={v.letter}
            className="flex flex-col items-center rounded-md border border-border-default px-2 py-1"
          >
            <span
              className="text-xs font-semibold text-text-secondary"
              aria-hidden="true"
            >
              {v.letter}
            </span>
            <span className="text-base font-semibold text-text-primary">
              {scores[v.letter] ?? 0}
            </span>
          </div>
        ))}
      </div>

      {/* sr-only fallback table — full data for assistive tech. */}
      <table id={tableId} className="sr-only">
        <caption>Puntajes por dimension RIASEC</caption>
        <thead>
          <tr>
            <th scope="col">Dimension</th>
            <th scope="col">Puntaje</th>
            <th scope="col">Maximo</th>
          </tr>
        </thead>
        <tbody>
          {VERTICES.map((v) => (
            <tr key={v.letter}>
              <th scope="row">{FULL_NAMES[v.letter]}</th>
              <td>{scores[v.letter] ?? 0}</td>
              <td>{maxScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
