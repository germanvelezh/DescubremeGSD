/**
 * ItemForm (Client Component) — Plan 01-06 Task 3.
 *
 * RadioGroup verbatim per UI-SPEC §6.4 + §9.8 ARIA spec. Likert 1-5
 * preference. React 19 `useOptimistic` marks the selected value
 * immediately while the POST `/api/respond` flies; on success router
 * refreshes the Server Component shell which loads the next item.
 *
 * Retry policy: 3 attempts with 800ms backoff. Until the first success
 * the auto-save chip says `MC_TEST_AUTOSAVE_CHIP` ("Te guardamos
 * cada respuesta"); during a retry it switches to `MC_TEST_AUTOSAVE_RETRY`.
 *
 * Anchors:
 * - 01-UI-SPEC.md §6.4 (RadioGroup verbatim), §6.5, §9.8 (ARIA).
 * - 01-RESEARCH.md "Pattern 2" lines 1573-1602.
 * - 01-PATTERNS.md row 2 locked: Route Handler `/api/respond`, NOT a Server Action.
 */
"use client";

import { useRouter } from "next/navigation";
import { useId, useState, useTransition } from "react";

import type { LikertAnchor } from "@/lib/questionnaire/response-scales";

export interface ItemFormProps {
  item: { id: string; sequenceNumber: number; stem: string };
  sessionId: string;
  anchors: LikertAnchor[];
  total: number;
  ariaLabel: string;
  autosaveChipLabel: string;
  retryChipLabel: string;
  exitLinkLabel: string;
  nextCtaLabel: string;
}

async function postWithRetry(
  body: { item_id: string; raw_value: number; session_id: string },
  attempts = 3,
): Promise<Response> {
  let lastError: unknown = null;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch("/api/respond", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) return res;
      // 5xx -> retry; 4xx -> bail (input was rejected, retry won't help).
      if (res.status < 500) return res;
      lastError = res;
    } catch (err) {
      lastError = err;
    }
    if (i < attempts - 1) {
      await new Promise((r) => setTimeout(r, 800));
    }
  }
  throw lastError ?? new Error("fetch failed");
}

export function ItemForm({
  item,
  sessionId,
  anchors,
  total,
  ariaLabel,
  autosaveChipLabel,
  retryChipLabel,
  exitLinkLabel,
  nextCtaLabel,
}: ItemFormProps) {
  const legendId = useId();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [chipLabel, setChipLabel] = useState(autosaveChipLabel);
  const [selected, setSelected] = useState<number | null>(null);

  async function submit(value: number) {
    setChipLabel(autosaveChipLabel);
    setSelected(value);
    try {
      const res = await postWithRetry({
        item_id: item.id,
        raw_value: value,
        session_id: sessionId,
      });
      if (!res.ok) {
        setChipLabel(retryChipLabel);
        return;
      }
      // Successful save — refresh the Server Component shell so the
      // next item loads. router.refresh() re-runs the Server Component.
      startTransition(() => {
        router.refresh();
      });
    } catch {
      setChipLabel(retryChipLabel);
    }
  }

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        if (selected != null) void submit(selected);
      }}
    >
      <fieldset
        role="radiogroup"
        aria-labelledby={legendId}
        aria-required="true"
        className="flex flex-col gap-4"
      >
        <legend
          id={legendId}
          className="text-xl font-semibold leading-snug text-text-primary"
        >
          {item.stem}
        </legend>

        <div className="flex flex-col gap-2">
          {anchors.map((anchor) => {
            const isChecked = selected === anchor.value;
            return (
              <label
                key={anchor.value}
                className="flex min-h-[56px] items-center gap-2 rounded-md border border-border-default bg-secondary p-2 text-base text-text-primary transition-colors hover:bg-accent-muted"
              >
                <input
                  type="radio"
                  name={`item-${item.id}`}
                  value={anchor.value}
                  checked={isChecked}
                  onChange={() => void submit(anchor.value)}
                  disabled={isPending}
                  className="accent-accent"
                  aria-label={anchor.label}
                />
                <span>{anchor.label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Sticky footer: auto-save chip + exit link */}
      <footer className="sticky bottom-0 z-10 mt-4 flex flex-col items-center gap-2 bg-background py-2">
        <span
          role="status"
          aria-live="polite"
          className="rounded-full bg-accent-muted px-4 py-1 text-sm text-text-primary"
        >
          {chipLabel}
        </span>
        <a
          href="/"
          className="text-sm text-text-secondary hover:text-text-primary"
        >
          {exitLinkLabel}
        </a>
        {/* Desktop-only next button (mobile auto-advances on click). */}
        <button
          type="submit"
          className="hidden rounded-md bg-accent px-4 py-2 font-semibold text-secondary md:inline-flex"
          disabled={selected == null || isPending}
        >
          {nextCtaLabel}
        </button>
        <span className="sr-only">
          {item.sequenceNumber} de {total}
        </span>
      </footer>
    </form>
  );
}
