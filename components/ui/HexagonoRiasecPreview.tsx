/**
 * HexagonoRiasecPreview — RIASEC hexagon teaser (preview variant).
 *
 * Per UI-SPEC §6.8 variant `preview`: 6 vertices stroke-only (no fill).
 * Vertex initials sit 8px OUTSIDE each vertex (computed radially from the
 * center so none overlap the polygon stroke — see ADR-021 follow-up). The
 * top-3 dimensions are shown ABOVE the hexagon by their full es-CO names
 * (decision 2026-06-10) so a user who does not know RIASEC understands their
 * result, while scores/narrative/occupations stay locked until signup
 * (COMPL-06 / D2.3 teaser). Full hexagon (shaded area) lands in
 * `/reporte/[sessionId]` (Plan 01-09).
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

// es-CO dimension names — mirror of FULL_NAMES in HexagonoRiasecFull.tsx.
const RIASEC_NAMES: Record<Top3Letter, string> = {
  R: "Realista",
  I: "Investigativo",
  A: "Artistico",
  S: "Social",
  E: "Emprendedor",
  C: "Convencional",
};

// Center of the 200x200 coordinate space; vertices sit on a radius-80 circle.
const CENTER = 100;
// Push each label this far radially beyond its vertex so the glyph clears the
// stroke (UI-SPEC §6.8: "8px afuera del vertice"). Labels are centered on this
// point, so the glyph's inner edge lands ~8px outside the vertex.
const LABEL_OFFSET = 14;

interface HexagonoRiasecPreviewProps {
  top3: [Top3Letter, Top3Letter, Top3Letter];
}

export function HexagonoRiasecPreview({ top3 }: HexagonoRiasecPreviewProps) {
  const points = VERTICES.map((v) => `${v.x},${v.y}`).join(" ");
  const top3Names = top3.map((l) => RIASEC_NAMES[l]);
  const titleId = "hexagono-preview-title";
  const descId = "hexagono-preview-desc";
  return (
    <div className="flex flex-col items-center gap-4">
      <p
        className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-xl font-semibold text-accent"
        aria-label={`Tus tres dimensiones principales: ${top3Names.join(", ")}`}
      >
        {top3Names[0]}
        <span aria-hidden="true">·</span>
        {top3Names[1]}
        <span aria-hidden="true">·</span>
        {top3Names[2]}
      </p>
      <svg
        role="img"
        aria-labelledby={titleId}
        aria-describedby={descId}
        viewBox="-12 -12 224 224"
        width="200"
        height="200"
      >
        <title id={titleId}>Hexagono RIASEC teaser de tus intereses</title>
        <desc id={descId}>
          Vista previa del hexagono RIASEC. Tus tres dimensiones principales son {top3Names[0]},{" "}
          {top3Names[1]} y {top3Names[2]}. El reporte completo con los seis puntajes se desbloquea al
          firmar.
        </desc>
        <polygon
          points={points}
          fill="none"
          stroke="currentColor"
          className="text-accent"
          strokeWidth="2"
        />
        {VERTICES.map((v) => {
          const dx = v.x - CENTER;
          const dy = v.y - CENTER;
          const dist = Math.hypot(dx, dy) || 1;
          const lx = v.x + (dx / dist) * LABEL_OFFSET;
          const ly = v.y + (dy / dist) * LABEL_OFFSET;
          return (
            <text
              key={v.letter}
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-text-primary font-semibold"
              style={{ fontSize: 14 }}
            >
              {v.letter}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
