/**
 * ContentionBanner — NFR-28 contention surface (UI-SPEC §6.4).
 *
 * Two surfaces on a sensitive report (any instrument whose seed sets
 * `contention_route=true` — D-D.2):
 *  1. Prominent banner — ONLY when the server-side distress threshold is
 *     crossed (`showContention`). Calm treatment: surface-tertiary background,
 *     4px accent-muted left border, life-buoy icon. NEVER red, NEVER alarm,
 *     NEVER pulse. `aria-live="polite"` (care, not emergency).
 *  2. Discreet footer link — ALWAYS present on a sensitive report, threshold
 *     crossed or not ("Si quieres hablar con alguien"). Expands the CO lines.
 *
 * The CO lines are PASSED IN from the `contention_resources` seed (D1.7) — this
 * component NEVER hardcodes a phone number; it renders whatever data it gets as
 * `tel:` anchors.
 *
 * Icon: inline SVG (UI-SPEC §6.4 names `lucide:life-buoy`, but `lucide-react`
 * is not in package.json — same substitution as QualityFlagNote, deviation
 * Rule 1).
 *
 * Anchors:
 *  - 02-UI-SPEC.md §6.4 (calm treatment + permanent footer link), §9 (aria-live).
 *  - 02-CONTEXT.md D-D.2.
 *  - lib/ethics/contention.ts (ContentionResource shape — server loader).
 */
"use client";

import { useId, useState } from "react";

import { report } from "@/lib/i18n/microcopy/es-CO/report";
import { nfr28 } from "@/lib/i18n/microcopy/es-CO/nfr28";

/** Minimal CO line shape rendered by the banner (subset of ContentionResource). */
export interface ContentionLine {
  name: string;
  phone: string;
  description?: string;
}

interface ContentionBannerProps {
  /** Server decision: was the per-instrument distress threshold crossed? */
  showContention: boolean;
  /** CO lines from the `contention_resources` seed (D1.7) — never hardcoded. */
  lines: ContentionLine[];
}

function LifeBuoyIcon() {
  return (
    <svg
      width="20"
      height="20"
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
      <circle cx="12" cy="12" r="4" />
      <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
      <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
      <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
      <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
    </svg>
  );
}

function ContentionLines({ lines }: { lines: ContentionLine[] }) {
  return (
    <ul className="mt-2 space-y-1">
      {lines.map((line) => (
        <li key={`${line.name}-${line.phone}`} className="text-sm text-text-primary">
          <a
            href={`tel:${line.phone}`}
            className="font-medium text-accent underline-offset-2 hover:underline"
          >
            {line.name} · {line.phone}
          </a>
          {line.description ? (
            <span className="text-text-secondary"> — {line.description}</span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

export function ContentionBanner({ showContention, lines }: ContentionBannerProps) {
  const [footerExpanded, setFooterExpanded] = useState(false);
  const footerPanelId = useId();

  return (
    <>
      {/* aria-live region: announces the calm banner when the server populates
          it. polite (NOT assertive) — this is care, not an emergency. */}
      <div aria-live="polite">
        {showContention ? (
          <aside
            role="complementary"
            aria-label={report.MC_REPORT_CONTENTION_LANDMARK_ARIA}
            className="rounded-md bg-surface-tertiary p-4"
            style={{ borderLeft: "4px solid var(--color-accent-muted)" }}
          >
            <div className="flex items-start gap-3">
              <LifeBuoyIcon />
              <div>
                <p className="text-sm font-semibold text-text-primary">
                  {nfr28.MC_NFR28_BANNER_HEADING}
                </p>
                <p className="mt-1 text-sm text-text-primary">
                  {nfr28.MC_NFR28_BANNER_BODY}
                </p>
                <ContentionLines lines={lines} />
              </div>
            </div>
          </aside>
        ) : null}
      </div>

      {/* Discreet footer link — ALWAYS present on a sensitive report. */}
      <div className="mt-4">
        <button
          type="button"
          onClick={() => setFooterExpanded((v) => !v)}
          aria-expanded={footerExpanded}
          aria-controls={footerPanelId}
          className="text-sm text-text-secondary underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          {nfr28.MC_NFR28_FOOTER_LINK}
        </button>
        {footerExpanded ? (
          <div id={footerPanelId}>
            <ContentionLines lines={lines} />
          </div>
        ) : null}
      </div>
    </>
  );
}
