/**
 * ProgressIndicator (Client Component) — Plan 01-06 Task 3.
 *
 * Renders a thin horizontal progress bar per UI-SPEC §6.5.
 * Rules locked: no numeric percent, no time-remaining, no color change
 * with progress, no shimmer/pulse, no animated gradient. Fill transitions
 * 200ms ease-standard.
 *
 * Anchors:
 * - 01-UI-SPEC.md §6.5, §9.7.
 */
"use client";

import { useMemo } from "react";

export interface ProgressIndicatorProps {
  current: number;
  total: number;
  ariaLabel: string;
}

export function ProgressIndicator({
  current,
  total,
  ariaLabel,
}: ProgressIndicatorProps) {
  const percent = useMemo(() => {
    if (total <= 0) return 0;
    const clamped = Math.max(0, Math.min(current, total));
    return (clamped / total) * 100;
  }, [current, total]);

  return (
    <div
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuenow={current}
      aria-valuemin={1}
      aria-valuemax={total}
      className="h-1.5 w-full overflow-hidden rounded-full bg-border-default"
    >
      <div
        className="h-full bg-accent transition-[width] duration-200 ease-out"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
