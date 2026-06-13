/**
 * QualityFlagNote — soft, never-blocking, never-accusatory note shown on a
 * report whose `computed_score` carries a quality flag (single_pattern /
 * atypical_timing, `lib/quality/validator.ts`). CONTEXT D-F2.1, UI-SPEC §6.8.
 *
 * Inline chip in surface-tertiary with an info icon. No destructive styling,
 * no aggressive warning. It offers (does not force) a re-take; the teaser
 * silently omits any cross that depends on this flagged score.
 *
 * Icon: inline SVG (UI-SPEC §6.8 names `lucide:info`, but `lucide-react` is
 * not in package.json — same substitution as Disclosure.tsx, deviation Rule 1).
 *
 * Anchors:
 *  - 02-UI-SPEC.md §6.8 (visual + copy MC_QUALITY_FLAG_NOTE).
 *  - 02-CONTEXT.md D-F2.1 (no bloquea, degrada teaser).
 */
"use client";

import { report } from "@/lib/i18n/microcopy/es-CO/report";

export function QualityFlagNote() {
  return (
    <div className="flex items-start gap-2 rounded-md bg-surface-tertiary px-3 py-2">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mt-0.5 shrink-0 text-text-secondary"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
      <p className="text-sm text-text-secondary">{report.MC_QUALITY_FLAG_NOTE}</p>
    </div>
  );
}
