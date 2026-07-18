/**
 * Landing page `/` — DescubreMe.
 *
 * Ola 1 redesign (HANDOFF_UI §3): "direction A" paper surface (scoped via
 * `.dm-paper`), asymmetric hero (text left, RIASEC hexagon right), terracotta
 * accent, honesty chip. The CTA opens the intent taste (`/intencion`) — no data
 * collected pre-consent (ADR-029/Ley 1581). Copy is MICROCOPY §2 (firmado).
 *
 * The headline's trailing clause is split on its comma for emphasis
 * (presentation), with a graceful fallback when no comma is present, so the
 * source of truth stays the microcopy key.
 *
 * Anchors:
 * - auditoria-ux-ui/HANDOFF_UI_v1.0.md §3 (Ola 1.2) + §1 (tokens) + §2 (motion).
 * - auditoria-ux-ui/prototipo-rediseno-free-v2.html (pantalla "1 · Landing").
 * - MICROCOPY_ES-CO_SIGNOFF_v1.1 §2.
 */
import Link from "next/link";
import type { CSSProperties } from "react";

import { landing } from "@/lib/i18n/microcopy/es-CO/landing";

type Anchor = "middle" | "start" | "end";
type Vertex = { letter: string; x: number; y: number; lx: number; ly: number; la: Anchor };

// RIASEC hexagon vertices (R top, clockwise) — decorative, illustrative profile.
// Matches the prototype paper hex (viewBox 0 0 280 290).
const VERTICES: Vertex[] = [
  { letter: "R", x: 140, y: 30, lx: 140, ly: 16, la: "middle" },
  { letter: "I", x: 235, y: 85, lx: 249, ly: 88, la: "start" },
  { letter: "A", x: 235, y: 195, lx: 249, ly: 198, la: "start" },
  { letter: "S", x: 140, y: 250, lx: 140, ly: 270, la: "middle" },
  { letter: "E", x: 45, y: 195, lx: 31, ly: 198, la: "end" },
  { letter: "C", x: 45, y: 85, lx: 31, ly: 88, la: "end" },
];

// Illustrative interest profile (decorative — the landing has no user data).
const PROFILE = "140,96 220.75,93.25 206.5,178.5 140,173 106.75,159.25 92.5,112.5";

export default function LandingPage() {
  const headline = landing.MC_LANDING_HEADLINE;
  const ci = headline.indexOf(", ");
  const headMain = ci >= 0 ? headline.slice(0, ci) : headline;
  const headAccent = ci >= 0 ? headline.slice(ci + 2) : null;

  const hexPoints = VERTICES.map((v) => `${v.x},${v.y}`).join(" ");

  return (
    <main className="dm-paper flex min-h-[100dvh] w-full flex-col">
      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 py-6 sm:px-8">
        {/* Brand row */}
        <header className="flex items-center justify-between pb-6">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="inline-block h-3 w-3 rounded-full border-2"
              style={{ borderColor: "var(--dm-terracotta)" }}
            />
            <span className="font-display text-xl text-text-primary">DescubreMe</span>
          </div>
        </header>

        {/* Hero */}
        <div className="grid flex-1 items-center gap-8 py-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-accent motion-safe:animate-fade-in">
              {landing.MC_LANDING_EYEBROW}
            </p>
            <h1 className="font-display text-[clamp(2.25rem,6vw,3.25rem)] font-normal leading-[1.05] tracking-[-0.01em] text-text-primary motion-safe:animate-line-reveal">
              {headMain}
              {headAccent ? (
                <>
                  ,{" "}
                  <em className="italic text-accent">{headAccent}</em>
                </>
              ) : null}
            </h1>
            <p className="mt-5 max-w-[36ch] text-lg leading-relaxed text-text-secondary motion-safe:animate-fade-in [animation-delay:200ms]">
              {landing.MC_LANDING_SUBHEAD}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 motion-safe:animate-fade-in [animation-delay:350ms]">
              <Link
                href="/intencion"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-semibold text-secondary transition-[transform,background-color] duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:-translate-y-0.5 hover:bg-[var(--dm-terracotta-deep)]"
              >
                {landing.MC_LANDING_CTA_PRIMARY}
                <span aria-hidden="true">&rarr;</span>
              </Link>
              <p className="text-sm leading-tight text-text-secondary">
                {landing.MC_LANDING_MICRO}
              </p>
            </div>
            <div className="mt-5">
              {/* Honesty chip. §7 a11y: sage text on paper is ~3.7:1 (< AA 4.5:1), so
                  the label uses --dm-sage-deep (~6.6:1) with a sage-tinted surface. */}
              <span
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12.5px] font-semibold"
                style={{
                  color: "var(--dm-sage-deep)",
                  backgroundColor: "color-mix(in srgb, var(--dm-sage) 10%, transparent)",
                  borderColor: "color-mix(in srgb, var(--dm-sage) 25%, transparent)",
                }}
              >
                {landing.MC_LANDING_HONESTY_CHIP}
              </span>
            </div>
          </div>

          {/* RIASEC hexagon — decorative, illustrative interest profile. It draws
              itself on load (HANDOFF §2 "el trazo se traza"): spokes → contour →
              profile stroke, then fill/nodes/labels appear. Under reduced motion
              `dm-draw` is inert and everything renders complete. */}
          <div aria-hidden="true" className="mx-auto hidden w-full max-w-[360px] lg:block">
            <svg viewBox="0 0 280 290" className="h-auto w-full overflow-visible">
              {/* spokes */}
              {VERTICES.map((v) => (
                <line
                  key={`spoke-${v.letter}`}
                  x1={140}
                  y1={140}
                  x2={v.x}
                  y2={v.y}
                  pathLength={1}
                  className="dm-draw"
                  style={{ "--dm-draw-delay": "450ms", "--dm-draw-duration": "500ms" } as CSSProperties}
                  stroke="var(--dm-paper-3)"
                  strokeWidth="1"
                />
              ))}
              <polygon
                points={hexPoints}
                pathLength={1}
                className="dm-draw"
                style={{ "--dm-draw-delay": "600ms", "--dm-draw-duration": "600ms" } as CSSProperties}
                fill="none"
                stroke="var(--dm-line)"
                strokeWidth="1.3"
              />
              {/* profile fill on its own element: the stroke draws, then the fill breathes in */}
              <polygon
                points={PROFILE}
                fill="rgba(107, 124, 92, 0.22)"
                className="motion-safe:animate-appear [animation-delay:1500ms]"
              />
              <polygon
                points={PROFILE}
                pathLength={1}
                className="dm-draw"
                style={{ "--dm-draw-delay": "750ms", "--dm-draw-duration": "900ms" } as CSSProperties}
                fill="none"
                stroke="var(--dm-sage)"
                strokeWidth="2"
              />
              {VERTICES.map((v) => (
                <circle
                  key={`node-${v.letter}`}
                  cx={v.x}
                  cy={v.y}
                  r={4}
                  fill="var(--dm-sage)"
                  className="motion-safe:animate-appear [animation-delay:1200ms]"
                />
              ))}
              {VERTICES.map((v) => (
                <text
                  key={`lbl-${v.letter}`}
                  x={v.lx}
                  y={v.ly}
                  textAnchor={v.la}
                  dominantBaseline="middle"
                  fill="var(--dm-ink-soft)"
                  className="motion-safe:animate-appear [animation-delay:1200ms]"
                  style={{ fontFamily: "var(--font-display-paper)", fontSize: 16 }}
                >
                  {v.letter}
                </text>
              ))}
            </svg>
          </div>
        </div>

        {/* Footer line */}
        <footer className="flex flex-wrap items-center gap-2 border-t border-border-default pt-5 text-xs text-text-secondary">
          {landing.MC_LANDING_FOOTER}
        </footer>
      </div>
    </main>
  );
}
