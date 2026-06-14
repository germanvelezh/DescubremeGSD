/**
 * DisclaimerModal — NFR-27 pre-test disclaimer (UI-SPEC §6.3).
 *
 * Shown on the transition screen BEFORE the first item of a sensitive
 * instrument whose seed sets `pretest_modal=true` (D-D.1/D-D.5). The values
 * instrument (TwIVI) does NOT mount this modal (D-A.2 [RESUELTO]).
 *
 * DECLARED DEVIATION (do NOT flag in the Phase-6 a11y audit):
 *  This modal is non-dismissable-WITHOUT-action. Escape does NOT close it and
 *  a scrim click does NOT close it — the only forward path is the informed
 *  primary action "Entiendo y continúo" (criterion 4). This extends the
 *  Phase-1 Modal `destructive`-variant Escape-off pattern. It is NOT a focus
 *  trap with no exit: the secondary "Ahora no" button gives an accessible way
 *  out (returns focus to the caller). Treatment is CALM (accent, never red) —
 *  this is a care disclaimer, not a destructive confirmation.
 *
 * Reuses the Phase-1 dialog scaffold (role/aria/focus-trap/initial-focus) but
 * keeps its own Escape/scrim handling because the shared Modal couples
 * Escape-off to the red `destructive` styling, which is wrong here.
 *
 * Anchors:
 *  - 02-UI-SPEC.md §6.3 (copy + non-dismissable deviation), §9 (Escape off).
 *  - 02-CONTEXT.md D-D.1, D-D.3, D-D.5.
 *  - components/ui/Modal.tsx (Phase-1 dialog pattern; NO Radix).
 */
"use client";

import {
  type KeyboardEvent as ReactKeyboardEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
} from "react";

import { nfr27 } from "@/lib/i18n/microcopy/es-CO/nfr27";

export type DisclaimerVariant = "bfi" | "perma";

interface DisclaimerModalProps {
  /** Open/closed state. Controlled by the transition screen. */
  open: boolean;
  /** Picks the body copy (affect vs well-being — disclaimers may differ, D-D.3). */
  variant: DisclaimerVariant;
  /** Informed primary action — the ONLY forward path into the sensitive test. */
  onContinue: () => void;
  /** Accessible back-out ("Ahora no") — returns focus to the caller. */
  onBack: () => void;
}

const FOCUSABLE_SELECTOR = [
  "button:not([disabled])",
  "[href]",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

const COPY: Record<
  DisclaimerVariant,
  { heading: string; body: string }
> = {
  bfi: { heading: nfr27.MC_NFR27_BFI_HEADING, body: nfr27.MC_NFR27_BFI_BODY },
  perma: {
    heading: nfr27.MC_NFR27_PERMA_HEADING,
    body: nfr27.MC_NFR27_PERMA_BODY,
  },
};

export function DisclaimerModal({
  open,
  variant,
  onContinue,
  onBack,
}: DisclaimerModalProps) {
  const headingId = useId();
  const bodyId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const primaryBtnRef = useRef<HTMLButtonElement>(null);

  // Capture previously-focused element; initial focus on the primary action.
  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement as HTMLElement | null;
      requestAnimationFrame(() => {
        primaryBtnRef.current?.focus();
      });
    } else if (
      triggerRef.current &&
      typeof triggerRef.current.focus === "function"
    ) {
      triggerRef.current.focus();
    }
  }, [open]);

  // DEVIATION: Escape is intentionally swallowed (non-dismissable). We still
  // capture it to prevent it bubbling to any ancestor close handler.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") e.preventDefault();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Focus trap: Tab cycles within the dialog.
  const handleKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLDivElement>) => {
      if (e.key !== "Tab") return;
      const root = dialogRef.current;
      if (!root) return;
      const focusables = Array.from(
        root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    },
    [],
  );

  if (!open) return null;

  const copy = COPY[variant];

  return (
    // DEVIATION: scrim onClick is intentionally a no-op (non-dismissable).
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(15, 20, 25, 0.5)" }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        aria-describedby={bodyId}
        onKeyDown={handleKeyDown}
        className="mx-4 w-full max-w-[480px] rounded-lg border border-border-default bg-secondary p-6 shadow-lg"
        style={{ padding: "24px" }}
      >
        <h2
          id={headingId}
          className="text-lg font-semibold text-text-primary"
          style={{ fontSize: "20px", lineHeight: "1.3" }}
        >
          {copy.heading}
        </h2>
        <p
          id={bodyId}
          className="mt-4 text-sm text-text-primary"
          style={{ marginTop: "16px" }}
        >
          {copy.body}
        </p>
        <div
          className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-4"
          style={{ marginTop: "24px" }}
        >
          <button
            type="button"
            onClick={onBack}
            className="rounded-md border border-border-default bg-surface-secondary px-4 py-2 text-sm font-medium text-text-primary hover:bg-accent-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            {nfr27.MC_NFR27_CTA_BACK}
          </button>
          <button
            ref={primaryBtnRef}
            type="button"
            onClick={onContinue}
            className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-secondary shadow-sm hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            {nfr27.MC_NFR27_CTA_PRIMARY}
          </button>
        </div>
      </div>
    </div>
  );
}
