/**
 * Landing page `/` — DescubreMe.
 *
 * Direction B "Cartografía interior" (see auditoria-ux-ui/AUDITORIA.md): a
 * nocturnal hero where the brand is a star and the RIASEC interests are
 * prefigured as a constellation. Anonymous entry, one CTA, honest time line.
 *
 * Copy is the existing Cowork microcopy (es-CO) — NOT rewritten. The headline's
 * trailing clause is split on its comma purely for emphasis (presentation), with
 * a graceful fallback when no comma is present, so the source of truth stays the
 * microcopy key.
 *
 * Anchors:
 * - 01-UI-SPEC.md §7.1 / UX-01 / UX-02 (no urgency).
 * - auditoria-ux-ui/AUDITORIA.md §5 (direction B).
 */
import Link from "next/link";

import { Starfield } from "@/components/Starfield";
import { landing } from "@/lib/i18n/microcopy/es-CO/landing";

type Anchor = "middle" | "start" | "end";
type Vertex = {
  letter: string;
  x: number;
  y: number;
  halo: number;
  delay: number;
  lx: number;
  ly: number;
  la: Anchor;
};

// RIASEC hexagon vertices (R top, clockwise) — decorative constellation.
// `lx/ly/la` = label position + text-anchor, just outside each vertex.
const VERTICES: Vertex[] = [
  { letter: "R", x: 150, y: 28, halo: 16, delay: 0, lx: 150, ly: 14, la: "middle" },
  { letter: "I", x: 256, y: 90, halo: 13, delay: 0.5, lx: 272, ly: 92, la: "start" },
  { letter: "A", x: 256, y: 210, halo: 18, delay: 1.1, lx: 272, ly: 214, la: "start" },
  { letter: "S", x: 150, y: 272, halo: 14, delay: 0.8, lx: 150, ly: 292, la: "middle" },
  { letter: "E", x: 44, y: 210, halo: 12, delay: 1.6, lx: 28, ly: 214, la: "end" },
  { letter: "C", x: 44, y: 90, halo: 15, delay: 0.3, lx: 28, ly: 92, la: "end" },
];

export default function LandingPage() {
  const headline = landing.MC_LANDING_HEADLINE;
  const ci = headline.indexOf(", ");
  const headMain = ci >= 0 ? headline.slice(0, ci) : headline;
  const headAccent = ci >= 0 ? headline.slice(ci + 2) : null;

  const polygonPoints = VERTICES.map((v) => `${v.x},${v.y}`).join(" ");

  return (
    <main className="relative mx-auto flex min-h-[100dvh] max-w-6xl flex-col px-5 py-6 sm:px-8">
      <Starfield />

      {/* Brand row */}
      <header className="relative z-10 flex items-center justify-between pb-6">
        <div className="flex items-center gap-2.5">
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M8 0 L9.6 6.4 L16 8 L9.6 9.6 L8 16 L6.4 9.6 L0 8 L6.4 6.4 Z"
              fill="var(--color-star)"
            />
          </svg>
          <span className="font-display text-xl text-text-primary">DescubreMe</span>
        </div>
        <span className="hidden text-xs uppercase tracking-[0.18em] text-text-secondary sm:block">
          Cartografía del yo
        </span>
      </header>

      {/* Hero */}
      <div className="relative z-10 grid flex-1 items-center gap-8 py-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="mb-7 text-xs font-semibold uppercase tracking-[0.24em] text-accent motion-safe:animate-[fadeIn_0.8s_ease-out_both]">
            Trazá el mapa de quién sos
          </p>
          <h1 className="font-display text-[clamp(2.9rem,7vw,5.4rem)] leading-[1.04] text-text-primary motion-safe:animate-[riseIn_0.9s_var(--ease-out-expo)_both]">
            {headMain}
            {headAccent ? (
              <>
                ,{" "}
                <em className="italic text-accent">{headAccent}</em>
              </>
            ) : null}
          </h1>
          <p className="mt-7 max-w-[42ch] text-lg leading-relaxed text-text-secondary motion-safe:animate-[fadeIn_0.8s_ease-out_0.2s_both]">
            {landing.MC_LANDING_SUBHEAD}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4 motion-safe:animate-[fadeIn_0.8s_ease-out_0.35s_both]">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 font-semibold text-secondary transition-transform duration-200 ease-out hover:-translate-y-0.5"
            >
              {landing.MC_LANDING_CTA_PRIMARY}
              <span aria-hidden="true">&rarr;</span>
            </Link>
            <p className="max-w-[24ch] text-sm leading-relaxed text-text-secondary">
              {landing.MC_LANDING_HONEST_LINE}
            </p>
          </div>
        </div>

        {/* Constellation — decorative RIASEC hexagon */}
        <div
          aria-hidden="true"
          className="mx-auto w-full max-w-[380px] motion-safe:animate-[fadeIn_1.4s_ease-out_0.5s_both]"
        >
          <svg viewBox="0 0 300 300" className="h-auto w-full overflow-visible">
            <polygon
              points={polygonPoints}
              fill="none"
              stroke="var(--color-star-cool)"
              strokeWidth="1"
              opacity="0.4"
            />
            {VERTICES.map((v) => (
              <circle
                key={`halo-${v.letter}`}
                cx={v.x}
                cy={v.y}
                r={v.halo}
                fill="var(--color-star)"
                opacity="0.16"
                className="motion-safe:animate-[haloPulse_3.6s_ease-in-out_infinite]"
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "center",
                  animationDelay: `${v.delay}s`,
                }}
              />
            ))}
            {VERTICES.map((v) => (
              <circle
                key={`node-${v.letter}`}
                cx={v.x}
                cy={v.y}
                r={v.halo > 15 ? 5 : 4}
                fill="var(--color-star)"
              />
            ))}
            {VERTICES.map((v) => (
              <text
                key={`lbl-${v.letter}`}
                x={v.lx}
                y={v.ly}
                textAnchor={v.la}
                dominantBaseline="middle"
                fill="var(--color-text-secondary)"
                style={{ fontSize: 13, fontWeight: 500, letterSpacing: "0.04em" }}
              >
                {v.letter}
              </text>
            ))}
          </svg>
        </div>
      </div>

      {/* Footer line */}
      <footer className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-t border-border-default pt-5 text-xs text-text-secondary">
        <span>
          <span className="font-display text-sm italic text-text-primary">
            Seis intereses, un patrón.
          </span>{" "}
          El tuyo, dibujado.
        </span>
        <span>Instrumentos validados &middot; sin veredictos</span>
      </footer>
    </main>
  );
}
