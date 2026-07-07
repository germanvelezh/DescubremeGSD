/**
 * ValueCircle — instrument-agnostic within-person circumplex visual
 * (visual_type='circumplex', UI-SPEC §6.2).
 *
 * Renders MRAT-centered priorities (CONTEXT D-E1.3) as radial sectors. The
 * center of the circle is the person's own mean (MRAT = "0"); a sector's
 * radial length is its centered `value`, so it can be NEGATIVE. Positive
 * sectors extend outward with accent fill (opacity 0.6) + accent stroke
 * (parity with the hexagon). Negative sectors are drawn short/inward with a
 * neutral border — NEVER a red/negative-as-bad treatment.
 *
 * Framing is mandatory (anti-determinismo + non-invarianza escalar):
 *  - Title "Qué pesa más para ti" (relative, never "tus valores son X").
 *  - A fixed note that priorities are relative within the person's own profile.
 *  - All-equal input (all centered == 0) → equal sectors, NO winner (QUAL-05).
 *
 * Pure presentational, zero instrument-code literals (FOUND-05). The `code`
 * field is opaque; sectors are laid out by input order (the assembler seeds
 * them on Schwartz's two bipolar axes).
 *
 * Anchors:
 *  - 02-UI-SPEC.md §6.0 (VisualProps), §6.2 (contrato circumplex), §4 (parity).
 *  - 02-CONTEXT.md D-C.1, D-E1.3 (MRAT prioridades relativas), QUAL-05.
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

const CENTER = 100;
const MAX_RADIUS = 70;
const MIN_INWARD_RADIUS = 10; // negative/zero sectors: short stub toward center.

// 4 sectors at the cardinal directions (two bipolar axes). Layout by input
// order — the visual does not interpret the dimension codes.
const SECTOR_ANGLES = [-Math.PI / 2, 0, Math.PI / 2, Math.PI];

function point(angle: number, radius: number): string {
  const x = CENTER + radius * Math.cos(angle);
  const y = CENTER + radius * Math.sin(angle);
  return `${x.toFixed(1)},${y.toFixed(1)}`;
}

/**
 * A sector wedge: a thin triangle from center out to the (signed) radius along
 * its axis, flanked by two points near the center so it reads as a wedge.
 */
function sectorPoints(angle: number, radius: number): string {
  const tip = point(angle, radius);
  const baseHalfWidth = Math.PI / 10;
  const baseLeft = point(angle - baseHalfWidth, MIN_INWARD_RADIUS);
  const baseRight = point(angle + baseHalfWidth, MIN_INWARD_RADIUS);
  return `${point(angle, 0)} ${baseLeft} ${tip} ${baseRight}`;
}

export function ValueCircle({ dimensions, reducedMotion }: VisualProps) {
  const titleId = useId();
  const descId = useId();
  const tableId = useId();

  const maxAbs = Math.max(1, ...dimensions.map((d) => Math.abs(d.value)));

  // A winner exists only if some sector is strictly positive AND not all equal.
  const allEqual = dimensions.every((d) => d.value === dimensions[0]?.value);
  const maxValue = Math.max(...dimensions.map((d) => d.value));

  const ordered = [...dimensions].sort((a, b) => b.value - a.value);
  const verbalDescription =
    `${report.MC_VALUECIRCLE_DESC_INTRO} ` +
    ordered.map((d) => `${d.label}: banda ${BAND_LABEL[d.band]}.`).join(" ");

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <h3 className="text-2xl font-semibold text-text-primary">
        {report.MC_VALUECIRCLE_TITLE}
      </h3>

      <svg
        role="img"
        aria-labelledby={titleId}
        aria-describedby={`${descId} ${tableId}`}
        viewBox="0 0 200 200"
        width="260"
        height="260"
        style={{ maxWidth: "100%", height: "auto" }}
      >
        <title id={titleId}>{report.MC_VALUECIRCLE_TITLE}</title>
        <desc id={descId}>{verbalDescription}</desc>

        {/* MRAT baseline ring (the person's own mean = "0"). */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={MIN_INWARD_RADIUS}
          fill="none"
          stroke="currentColor"
          className="text-border-default"
          strokeWidth="1"
        />

        {dimensions.map((d, i) => {
          const angle = SECTOR_ANGLES[i % SECTOR_ANGLES.length] ?? 0;
          const isPositive = d.value > 0;
          const radius = isPositive
            ? MIN_INWARD_RADIUS + (d.value / maxAbs) * (MAX_RADIUS - MIN_INWARD_RADIUS)
            : MIN_INWARD_RADIUS;
          const isWinner = !allEqual && isPositive && d.value === maxValue;
          return (
            <polygon
              key={d.code}
              data-sector={d.code}
              data-winner={isWinner ? "true" : "false"}
              points={sectorPoints(angle, radius)}
              className={
                isPositive
                  ? "fill-accent stroke-accent"
                  : "fill-surface-tertiary stroke-border-default"
              }
              fillOpacity={isPositive ? "0.6" : "1"}
              strokeWidth={isPositive ? "2" : "1"}
              style={{
                transformOrigin: "50% 50%",
                transition: reducedMotion ? undefined : "all 480ms ease-out",
              }}
            />
          );
        })}

        {/* Sector labels just outside each axis. */}
        {dimensions.map((d, i) => {
          const angle = SECTOR_ANGLES[i % SECTOR_ANGLES.length] ?? 0;
          const x = CENTER + (MAX_RADIUS + 18) * Math.cos(angle);
          const y = CENTER + (MAX_RADIUS + 18) * Math.sin(angle);
          return (
            <text
              key={`label-${d.code}`}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-text-primary"
              style={{ fontSize: 9, fontWeight: 600 }}
            >
              {d.label}
            </text>
          );
        })}
      </svg>

      <p className="max-w-prose text-sm text-text-secondary">
        {report.MC_VALUECIRCLE_RELATIVE_NOTE}
      </p>

      {/* sr-only table — relative band only, no raw MRAT number (UI-SPEC §6.2). */}
      <table id={tableId} className="sr-only">
        <caption>{report.MC_VALUECIRCLE_TABLE_CAPTION}</caption>
        <thead>
          <tr>
            <th scope="col">Valor</th>
            <th scope="col">Prioridad relativa</th>
          </tr>
        </thead>
        <tbody>
          {ordered.map((d) => (
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
