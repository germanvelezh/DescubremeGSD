/**
 * PaperShell — the "direction A" (paper) frame shared by the Ola 1 front-door
 * screens (intención, signup, consent, mapa). Provides the full-bleed `.dm-paper`
 * ground (covers the nocturnal body gradient), a centered content column, and the
 * brand header. Landing keeps its own bespoke hero layout but the same tokens.
 *
 * Anchors: HANDOFF_UI §1 (tokens) + prototipo-rediseno-free-v2.html (topbar/brand).
 */
import type { ReactNode } from "react";

const WIDTHS = {
  narrow: "max-w-xl",
  medium: "max-w-2xl",
  wide: "max-w-3xl",
} as const;

export function PaperShell({
  children,
  width = "medium",
  tag,
}: {
  children: ReactNode;
  width?: keyof typeof WIDTHS;
  /** Optional uppercase context label shown at the top-right (desktop only). */
  tag?: string;
}) {
  return (
    <main className="dm-paper flex min-h-[100dvh] w-full flex-col">
      <div
        className={`relative mx-auto flex w-full flex-1 flex-col px-5 py-6 sm:px-8 ${WIDTHS[width]}`}
      >
        <header className="flex items-center justify-between pb-6">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="inline-block h-3 w-3 rounded-full border-2"
              style={{ borderColor: "var(--dm-terracotta)" }}
            />
            <span className="font-display text-xl text-text-primary">DescubreMe</span>
          </div>
          {tag ? (
            <span className="hidden text-[11px] font-semibold uppercase tracking-[0.16em] text-text-secondary sm:block">
              {tag}
            </span>
          ) : null}
        </header>
        {children}
      </div>
    </main>
  );
}
