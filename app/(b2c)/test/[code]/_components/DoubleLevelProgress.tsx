/**
 * DoubleLevelProgress — two-level journey + intra-test progress
 * (UX-04, CONTEXT D-F4.1, UI-SPEC §6.5).
 *
 * Extends the Phase-1 intra-test bar (`ProgressIndicator`) with a global line
 * "Test {g} de {globalTotal} · {instrumentLabel}". The intra level keeps the
 * 4px bar + "Paso {i} de {intraTotal}".
 *
 * `intraTotal` is ALWAYS from props — never hardcoded — so it supports the
 * seed-driven item count N (D-F4.1 / D-GATE.1 open form). `role="progressbar"`
 * with aria-valuenow/min/max lives on the intra level; the global level is
 * text + aria-label. No percentage, no time, no aria-live on increments
 * (anti-fatiga, heredado §6.5).
 *
 * Anchors:
 *  - 02-UI-SPEC.md §6.5 (props + reglas heredadas).
 *  - 02-CONTEXT.md D-F4.1 (progreso doble), D-GATE.1 (N del seed).
 *  - ProgressIndicator.tsx (intra-level bar to extend).
 */
"use client";

import { useMemo } from "react";

import { test as testMc } from "@/lib/i18n/microcopy/es-CO/test";

export interface DoubleLevelProgressProps {
  globalCurrent: number;
  globalTotal: number;
  intraCurrent: number;
  intraTotal: number;
  instrumentLabel: string;
}

export function DoubleLevelProgress({
  globalCurrent,
  globalTotal,
  intraCurrent,
  intraTotal,
  instrumentLabel,
}: DoubleLevelProgressProps) {
  const percent = useMemo(() => {
    if (intraTotal <= 0) return 0;
    const clamped = Math.max(0, Math.min(intraCurrent, intraTotal));
    return (clamped / intraTotal) * 100;
  }, [intraCurrent, intraTotal]);

  return (
    <div className="flex flex-col gap-1">
      {/* Global level — text only, never a progressbar. */}
      <p className="flex items-center gap-2 text-sm font-medium text-text-secondary">
        <span
          className="inline-block h-1 w-1 shrink-0 rounded-full bg-accent"
          aria-hidden="true"
        />
        {testMc.MC_TEST_GLOBAL_PROGRESS_LABEL(
          globalCurrent,
          globalTotal,
          instrumentLabel,
        )}
      </p>

      {/* Intra level — the seed-driven bar. */}
      <div className="flex items-center gap-2">
        <div
          role="progressbar"
          aria-label={testMc.MC_TEST_PROGRESSBAR_ARIA(intraCurrent, intraTotal)}
          aria-valuenow={intraCurrent}
          aria-valuemin={1}
          aria-valuemax={intraTotal}
          className="h-1.5 flex-1 overflow-hidden rounded-full bg-border-default"
        >
          <div
            className="h-full bg-accent transition-[width] duration-200 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="text-sm text-text-secondary tabular-nums">
          {testMc.MC_TEST_PROGRESS_LABEL(intraCurrent, intraTotal)}
        </span>
      </div>
    </div>
  );
}
