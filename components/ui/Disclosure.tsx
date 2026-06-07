/**
 * Disclosure — Accordion primitive (Plan 01-07 Task 3).
 *
 * Per UI-SPEC §6.6:
 *  - <button aria-expanded aria-controls> trigger + <div id role="region" hidden> panel.
 *  - Chevron rotates 180deg on expand (200ms ease-standard).
 *  - Padding 16px internal.
 *
 * Phase 1 uses: subprocesadores acordeon (D1.2), ficha tecnica del reporte.
 * No external icon library installed — using inline SVG chevron (deviation
 * Rule 1: plan referenced `lucide:chevron-down` but lucide-react is not in
 * package.json; substituted inline SVG).
 *
 * Anchors:
 *  - 01-UI-SPEC.md §6.6 (Disclosure spec).
 *  - 01-CONTEXT.md D1.2 (acordeon inline para subprocesadores).
 */
"use client";

import { useId, useState } from "react";

interface DisclosureProps {
  triggerLabel: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function Disclosure({
  triggerLabel,
  defaultOpen = false,
  children,
}: DisclosureProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  return (
    <div className="rounded-md border border-border-default">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-sm px-md py-sm text-left text-sm font-medium text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <span>{triggerLabel}</span>
        <svg
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 200ms cubic-bezier(0.2, 0, 0, 1)",
          }}
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div
        id={panelId}
        role="region"
        hidden={!open}
        className="px-md pb-md text-sm text-text-secondary"
      >
        {children}
      </div>
    </div>
  );
}
