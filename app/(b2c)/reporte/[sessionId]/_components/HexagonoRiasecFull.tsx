/**
 * HexagonoRiasecFull — full variant of the RIASEC hexagon (UI-SPEC §6.8),
 * rendered as a CONSTELLATION in direction B (auditoria-ux-ui/AUDITORIA.md):
 * faint reference hexagon + axes, a gold score polygon, and star nodes with
 * pulsing halos at each scored vertex. The a11y scaffold is UNCHANGED:
 *  - Filled polygon still carries `fill-accent` (now low-opacity, with a stroke).
 *  - All 6 dimensions visible with numeric labels in a grid below the SVG.
 *  - sr-only <table> with full data — non-color signal + WCAG 2.2 AA.
 *  - Halo pulse respects `prefers-reduced-motion` (global guard + motion-safe).
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
const LABEL_OFFSET = 16;

// Decorative background stars (deterministic, aria-hidden by being non-semantic).
const BG_STARS = [
  { x: 32, y: 40, r: 1.1 }, { x: 168, y: 36, r: 0.9 }, { x: 60, y: 150, r: 1 },
  { x: 150, y: 158, r: 1.2 }, { x: 22, y: 96, r: 0.8 }, { x: 182, y: 110, r: 1 },
  { x: 100, y: 18, r: 0.9 }, { x: 120, y: 184, r: 0.8 },
];

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

  // Outer reference polygon (faint — the "full sky").
  const outerPoints = VERTICES.map((v) => {
    const p = vertexPoint(v.angleRad, OUTER_RADIUS);
    return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
  }).join(" ");

  // Scored vertices (the constellation).
  const scoredVertices = VERTICES.map((v) => {
    const score = scores[v.letter] ?? 0;
    const ratio = Math.max(0, Math.min(1, score / maxScore));
    const p = vertexPoint(v.angleRad, OUTER_RADIUS * ratio);
    return { letter: v.letter, angleRad: v.angleRad, ...p };
  });
  const filledPoints = scoredVertices
    .map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ");

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
        className="flex items-center gap-4 font-display text-3xl text-accent"
        aria-label={`Tus tres dimensiones principales: ${top3.join(", ")}`}
      >
        {top3[0]}
        <span aria-hidden="true" className="text-text-tertiary">
          ·
        </span>
        {top3[1]}
        <span aria-hidden="true" className="text-text-tertiary">
          ·
        </span>
        {top3[2]}
      </p>

      <svg
        role="img"
        aria-labelledby={titleId}
        aria-describedby={`${descId} ${tableId}`}
        viewBox="0 0 200 200"
        width="280"
        height="280"
        style={{ maxWidth: "100%", height: "auto" }}
      >
        <title id={titleId}>Hexagono de tus intereses RIASEC</title>
        <desc id={descId}>{orderedDescription}</desc>

        {/* Decorative background stars */}
        {BG_STARS.map((s, i) => (
          <circle
            key={`bg-${i}`}
            cx={s.x}
            cy={s.y}
            r={s.r}
            fill="var(--color-text-tertiary)"
            opacity="0.5"
          />
        ))}

        {/* Faint axes from center to each outer vertex */}
        {VERTICES.map((v) => {
          const p = vertexPoint(v.angleRad, OUTER_RADIUS);
          return (
            <line
              key={`axis-${v.letter}`}
              x1={CENTER}
              y1={CENTER}
              x2={p.x}
              y2={p.y}
              stroke="currentColor"
              className="text-border-default"
              strokeWidth="0.5"
              opacity="0.6"
            />
          );
        })}

        {/* Outer reference hexagon (faint) */}
        <polygon
          points={outerPoints}
          fill="none"
          stroke="currentColor"
          className="text-border-default"
          strokeWidth="0.75"
        />

        {/* Score constellation: area + connecting lines */}
        <polygon
          points={filledPoints}
          className="fill-accent"
          fillOpacity="0.14"
          stroke="var(--color-star)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Star nodes with pulsing halos at each scored vertex */}
        {scoredVertices.map((p) => (
          <g key={`node-${p.letter}`}>
            <circle
              cx={p.x}
              cy={p.y}
              r="7"
              fill="var(--color-star)"
              opacity="0.16"
              className="motion-safe:animate-[haloPulse_3.6s_ease-in-out_infinite]"
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
            <circle cx={p.x} cy={p.y} r="2.6" fill="var(--color-star)" />
          </g>
        ))}

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
              className="fill-text-secondary"
              style={{ fontSize: 13, fontWeight: 600 }}
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
            className="flex flex-col items-center rounded-md border border-border-default bg-surface-secondary px-2 py-1.5"
          >
            <span
              className="text-xs font-semibold text-text-secondary"
              aria-hidden="true"
            >
              {v.letter}
            </span>
            <span className="font-display text-base text-text-primary">
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
