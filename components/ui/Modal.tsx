/**
 * Modal — Dialog primitive (Plan 01-10 Task 2).
 *
 * Per UI-SPEC §6.10:
 *  - role="dialog", aria-modal="true", aria-labelledby + aria-describedby.
 *  - Focus trap while open. Initial focus on the FIRST non-destructive
 *    action (typically "Cancel"). Destructive variants do NOT auto-focus
 *    the destructive button.
 *  - Escape closes (except destructive variant — requires explicit click).
 *  - Focus returns to the trigger on close.
 *  - Centered overlay with scrim rgba(15, 20, 25, 0.5).
 *  - Surface secondary white, border-radius lg (12px), padding 24px,
 *    max-width 480px.
 *
 * Implementation note (deviation from PLAN):
 *  The PLAN.md says "Implementacion con @radix-ui/react-dialog (ya
 *  instalado Plan 01-02)". This is incorrect: @radix-ui/react-dialog
 *  is NOT in package.json, AND UI-SPEC §1 explicitly states
 *  "Componentes propios renderizados por skill (HTML + Tailwind) ...
 *  custom — NO shadcn, NO Radix". This implementation uses HTML +
 *  React + native focus trap, consistent with the existing UI primitives
 *  (Checkbox, Disclosure, DateField, HexagonoRiasecPreview).
 *
 * Anchors:
 *  - 01-UI-SPEC.md §6.10 (Modal/Dialog VERBATIM).
 *  - WAI-ARIA Authoring Practices — Dialog (Modal) pattern.
 */
"use client";

import {
  type KeyboardEvent as ReactKeyboardEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
} from "react";

export type ModalVariant = "default" | "destructive";

interface ModalProps {
  /** Open/closed state. Controlled by parent. */
  open: boolean;
  /** Called when the user requests close (Escape, scrim click, ghost CTA). */
  onClose: () => void;
  /** Heading text shown at the top of the modal (also used as aria-labelledby). */
  heading: string;
  /** Variant controls Escape-to-close behaviour + button colour scheme. */
  variant?: ModalVariant;
  /** Body content (paragraphs, lists, etc.). */
  children: React.ReactNode;
  /** Primary action button caption (e.g. "Borrar mi cuenta"). */
  primaryActionLabel: string;
  /** Primary action handler. */
  onPrimaryAction: () => void;
  /** Secondary action button caption (e.g. "Cancelar"). Optional. */
  secondaryActionLabel?: string;
  /** Secondary action handler. Optional. Defaults to onClose. */
  onSecondaryAction?: () => void;
}

const FOCUSABLE_SELECTOR = [
  "button:not([disabled])",
  "[href]",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

export function Modal({
  open,
  onClose,
  heading,
  variant = "default",
  children,
  primaryActionLabel,
  onPrimaryAction,
  secondaryActionLabel,
  onSecondaryAction,
}: ModalProps) {
  const headingId = useId();
  const bodyId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const secondaryBtnRef = useRef<HTMLButtonElement>(null);
  const primaryBtnRef = useRef<HTMLButtonElement>(null);

  // Capture the previously focused element to restore on close.
  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement as HTMLElement | null;
      // Initial focus: secondary (safe / cancel) when present, else primary.
      // For destructive variant we prefer the safe action explicitly.
      requestAnimationFrame(() => {
        if (secondaryBtnRef.current) {
          secondaryBtnRef.current.focus();
        } else if (primaryBtnRef.current) {
          primaryBtnRef.current.focus();
        }
      });
    } else if (triggerRef.current && typeof triggerRef.current.focus === "function") {
      triggerRef.current.focus();
    }
  }, [open]);

  // Escape closes (except destructive — explicit click required).
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && variant !== "destructive") {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, variant, onClose]);

  // Focus trap: Tab cycles within the modal.
  const handleKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLDivElement>) => {
      if (e.key !== "Tab") return;
      const root = dialogRef.current;
      if (!root) return;
      const focusables = Array.from(
        root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((el) => !el.hasAttribute("data-trap-skip"));
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

  const handleSecondary = onSecondaryAction ?? onClose;
  const primaryClass =
    variant === "destructive"
      ? "rounded-md bg-red-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-offset-2"
      : "rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: scrim onClick is for non-destructive close UX; keyboard close is handled by Escape and ghost CTA buttons inside the dialog.
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(15, 20, 25, 0.5)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget && variant !== "destructive") {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        aria-describedby={bodyId}
        onKeyDown={handleKeyDown}
        className="mx-4 w-full max-w-[480px] rounded-lg bg-white p-6 shadow-lg"
        style={{ padding: "24px" }}
      >
        <h2
          id={headingId}
          className="text-lg font-semibold text-text-primary"
          style={{ fontSize: "20px", lineHeight: "1.3" }}
        >
          {heading}
        </h2>
        <div
          id={bodyId}
          className="mt-4 text-sm text-text-primary"
          style={{ marginTop: "16px" }}
        >
          {children}
        </div>
        <div
          className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-4"
          style={{ marginTop: "24px" }}
        >
          {secondaryActionLabel ? (
            <button
              ref={secondaryBtnRef}
              type="button"
              onClick={handleSecondary}
              className="rounded-md border border-border-default bg-white px-4 py-2 text-sm font-medium text-text-primary hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              {secondaryActionLabel}
            </button>
          ) : null}
          <button
            ref={primaryBtnRef}
            type="button"
            onClick={onPrimaryAction}
            className={primaryClass}
          >
            {primaryActionLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
