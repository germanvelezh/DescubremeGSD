/**
 * ValueCircle — instrument-agnostic within-person circumplex visual
 * (visual_type='circumplex', UI-SPEC §6.2).
 *
 * Renders the four within-person value directions as radial sectors (ADR-034).
 * Each sector's radial length is its `value` — a within-scale [0,1] proportion
 * of the raw HOV mean, resolved upstream (visual-dimensions). The mapping
 * abandons "center = your mean": ALL four directions always draw with a real
 * radius (a floor guarantees never-zero, so no direction collapses to a stub),
 * the lowest getting the shortest and the highest the longest. Fill is accent
 * (opacity 0.6) + accent stroke (parity with the hexagon) for every sector —
 * NEVER a red/negative-as-bad treatment. The dominant sector is emphasized
 * (fuller fill + thicker stroke), the rest stay calm.
 *
 * Framing is mandatory (anti-determinismo + non-invarianza escalar):
 *  - Title "Qué pesa más para ti" (relative, never "tus valores son X").
 *  - A fixed note that priorities are relative within the person's own profile.
 *  - An anti-absence note: a shorter sector weighs a bit less, it is not missing.
 *  - All-equal input → equal sectors, NO winner (QUAL-05).
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
// Floor for the tip (ADR-034): value=0 (scale floor) still draws a real punta,
// so no direction ever collapses to the center. > WEDGE_BASE_RADIUS so even the
// smallest sector reads as a wedge, not a nub.
const MIN_TIP_RADIUS = 24;
const WEDGE_BASE_RADIUS = 10; // where the wedge flanks sit, near the center.

// 4 sectors at the cardinal directions (two bipolar axes). Layout by input
// order — the visual does not interpret the dimension codes.
const SECTOR_ANGLES = [-Math.PI / 2, 0, Math.PI / 2, Math.PI];

/** Maps a [0,1] proportion to a tip radius with a real floor (never zero). */
function radiusOf(value: number): number {
  const p = Math.max(0, Math.min(1, value));
  return MIN_TIP_RADIUS + p * (MAX_RADIUS - MIN_TIP_RADIUS);
}

function point(angle: number, radius: number): string {
  const x = CENTER + radius * Math.cos(angle);
  const y = CENTER + radius * Math.sin(angle);
  return `${x.toFixed(1)},${y.toFixed(1)}`;
}

/**
 * A sector wedge: a thin triangle from center out to `radius` along its axis,
 * flanked by two points near the center so it reads as a wedge.
 */
function sectorPoints(angle: number, radius: number): string {
  const tip = point(angle, radius);
  const baseHalfWidth = Math.PI / 10;
  const baseLeft = point(angle - baseHalfWidth, WEDGE_BASE_RADIUS);
  const baseRight = point(angle + baseHalfWidth, WEDGE_BASE_RADIUS);
  return `${point(angle, 0)} ${baseLeft} ${tip} ${baseRight}`;
}

export function ValueCircle({ dimensions, reducedMotion, animateIn = false }: VisualProps) {
  const titleId = useId();
  const descId = useId();
  const tableId = useId();

  // A winner (the dominant direction) exists only if the sectors are not all
  // equal. No sign branch: every sector draws with a real radius (ADR-034).
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

        {dimensions.map((d, i) => {
          const angle = SECTOR_ANGLES[i % SECTOR_ANGLES.length] ?? 0;
          const radius = radiusOf(d.value);
          const isWinner = !allEqual && d.value === maxValue;
          return (
            <polygon
              key={d.code}
              data-sector={d.code}
              data-winner={isWinner ? "true" : "false"}
              points={sectorPoints(angle, radius)}
              className={`fill-accent stroke-accent${
                animateIn && !reducedMotion ? " motion-safe:animate-sector-in" : ""
              }`}
              fillOpacity={isWinner ? "0.6" : "0.4"}
              strokeWidth={isWinner ? "2" : "1"}
              style={{
                transformOrigin: "50% 50%",
                transition: reducedMotion ? undefined : "all 480ms ease-out",
                animationDelay:
                  animateIn && !reducedMotion ? `${i * 80}ms` : undefined,
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
              className={
                animateIn
                  ? "fill-text-primary motion-safe:animate-appear"
                  : "fill-text-primary"
              }
              style={
                animateIn
                  ? { fontSize: 9, fontWeight: 600, animationDelay: "400ms" }
                  : { fontSize: 9, fontWeight: 600 }
              }
            >
              {d.label}
            </text>
          );
        })}
      </svg>

      <p className="max-w-prose text-sm text-text-secondary">
        {report.MC_VALUECIRCLE_RELATIVE_NOTE}
      </p>
      <p className="max-w-prose text-sm text-text-secondary">
        {report.MC_VALUECIRCLE_NO_ABSENCE_NOTE}
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
