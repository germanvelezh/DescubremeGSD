/**
 * Starfield — decorative night sky for the "Cartografía interior" aesthetic
 * (direction B, see auditoria-ux-ui/AUDITORIA.md).
 *
 * Positions are DETERMINISTIC (no Math.random) so the component is SSR-safe and
 * hydration-stable, and it can render inside a Server Component. Purely
 * decorative — `aria-hidden`, no semantic content. The twinkle is gated by
 * `motion-safe:` and additionally collapsed by the global prefers-reduced-motion
 * guard in globals.css.
 */
const STAR_COUNT = 44;

const STARS = Array.from({ length: STAR_COUNT }, (_, i) => ({
  left: (i * 97 + 13) % 100,
  top: (i * 59 + 29) % 100,
  size: 0.7 + ((i * 13) % 10) / 9,
  delay: ((i * 7) % 40) / 10,
}));

export function Starfield({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {STARS.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white motion-safe:animate-twinkle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size.toFixed(2)}px`,
            height: `${s.size.toFixed(2)}px`,
            opacity: 0.4,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
