/**
 * HexagonoRiasecPreview — RIASEC hexagon teaser (preview variant).
 *
 * Per UI-SPEC §6.8 variant `preview`: 6 vertices stroke-only (no fill),
 * top-3 letters displayed prominently above the hexagon. Used in the
 * "Tu reporte esta listo" pre-signup screen — the full hexagon (with
 * shaded area) lands in `/reporte/[sessionId]` (Plan 01-09).
 *
 * Anchors:
 *  - 01-UI-SPEC.md §6.8 (Hexagon RIASEC spec).
 *  - 01-CONTEXT.md D2.3 (teaser visual sin scores numericos).
 *  - D3.1 (visual primario).
 */
import type { Top3Letter } from "@/lib/riasec/top3";

const VERTICES = [
  // R (top), I (top-right), A (bottom-right), S (bottom), E (bottom-left), C (top-left)
  { letter: "R", x: 100, y: 20 },
  { letter: "I", x: 169.3, y: 60 },
  { letter: "A", x: 169.3, y: 140 },
  { letter: "S", x: 100, y: 180 },
  { letter: "E", x: 30.7, y: 140 },
  { letter: "C", x: 30.7, y: 60 },
];

interface HexagonoRiasecPreviewProps {
  top3: [Top3Letter, Top3Letter, Top3Letter];
}

export function HexagonoRiasecPreview({ top3 }: HexagonoRiasecPreviewProps) {
  const points = VERTICES.map((v) => `${v.x},${v.y}`).join(" ");
  const titleId = "hexagono-preview-title";
  const descId = "hexagono-preview-desc";
  return (
    <div className="flex flex-col items-center gap-md">
      <p
        className="flex items-center gap-md text-2xl font-semibold text-accent"
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
        aria-describedby={descId}
        viewBox="0 0 200 200"
        width="200"
        height="200"
      >
        <title id={titleId}>Hexagono RIASEC teaser de tus intereses</title>
        <desc id={descId}>
          Vista previa del hexagono RIASEC. Tus tres dimensiones principales son {top3[0]}, {top3[1]}
          y {top3[2]}. El reporte completo con los seis puntajes se desbloquea al firmar.
        </desc>
        <polygon
          points={points}
          fill="none"
          stroke="currentColor"
          className="text-accent"
          strokeWidth="2"
        />
        {VERTICES.map((v) => (
          <text
            key={v.letter}
            x={v.x}
            y={v.y - 8}
            textAnchor="middle"
            className="text-xs fill-text-secondary"
            style={{ fontSize: 12 }}
          >
            {v.letter}
          </text>
        ))}
      </svg>
    </div>
  );
}
