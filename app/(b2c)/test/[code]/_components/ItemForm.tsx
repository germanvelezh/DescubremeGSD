/**
 * ItemForm (Client Component) — Plan 01-06 Task 3, generalized in Plan 02-07.
 *
 * Three data-driven scale shapes from one component (UI-SPEC §6.9):
 *   - `labeled-rows`: N anchor rows (count = anchors.length, 5 or 6) with their
 *     verbatim full-text labels. Used by O*NET (5), BFI-2-S (5), values (6).
 *   - `numeric-endpoints`: `points` numeric buttons (PERMA 0-10 = 11) in a row,
 *     with per-item endpoint anchors (`anchorMin`/`anchorMax` from the seed,
 *     verbatim — they vary by block) and `aria-valuetext`. 11 full-text rows
 *     would break 360px, so this layout is a horizontal numeric strip.
 *
 * All anchors are DATA (props), never baked into the component — the component
 * carries no anchor prose and no instrument-code literals (FOUND-05, asserted by
 * tests/unit/components/item-form-scales.test.tsx since the lint gate does not
 * scan this dir).
 *
 * Answering auto-advances on tap (no Next button on mobile, D-F1.2). React 19
 * `useTransition` + `router.refresh()` reloads the Server Component shell which
 * serves the next item.
 *
 * Retry policy: 3 attempts with 800ms backoff. Until the first success the
 * auto-save chip says `MC_TEST_AUTOSAVE_CHIP`; during a retry it switches to
 * `MC_TEST_AUTOSAVE_RETRY`.
 *
 * Anchors:
 * - 02-UI-SPEC.md §6.9 (scaleVariant + numeric-endpoints layout), §9 (ARIA).
 * - 02-CONTEXT.md D-F1.1, D-F1.2; UX-05 (360px target ≥44px).
 * - 01-UI-SPEC.md §6.4 (RadioGroup verbatim — inherited labeled-rows).
 * - 01-PATTERNS.md row 2 locked: Route Handler `/api/respond`, NOT a Server Action.
 */
"use client";

import { useRouter } from "next/navigation";
import { useId, useState, useTransition } from "react";

import type { LikertAnchor } from "@/lib/questionnaire/response-scales";

export type ScaleVariant = "labeled-rows" | "numeric-endpoints";

export interface ItemFormProps {
  item: { id: string; sequenceNumber: number; stem: string };
  sessionId: string;
  /**
   * Route slug for the current test (the URL param, e.g. the value in
   * `/test/{code}`). NOT an instrument-code literal — it is whatever casing the
   * visitor's URL carried (FOUND-05 safe). Used to navigate to
   * `/test/{code}?resumed=true` after a successful save so the resume gate is
   * skipped on the in-place advance.
   */
  code: string;
  /** Scale layout. Defaults to labeled-rows (the inherited O*NET/BFI/values shape). */
  scaleVariant?: ScaleVariant;
  /** Full-text anchors for `labeled-rows`. Row count = anchors.length. */
  anchors?: LikertAnchor[];
  /** Button count for `numeric-endpoints` (PERMA = 11 for 0-10). */
  points?: number;
  /** Per-item endpoint anchor (verbatim from seed) for `numeric-endpoints`. */
  anchorMin?: string;
  anchorMax?: string;
  ariaLabel: string;
  autosaveChipLabel: string;
  retryChipLabel: string;
  exitLinkLabel: string;
  nextCtaLabel: string;
  /** "Anterior" — back-nav CTA (Ola 2.1). Shown when a previous item exists. */
  prevCtaLabel: string;
  /** "Continuar" — return-to-frontier CTA shown while reviewing a past item. */
  continueCtaLabel: string;
  /**
   * Preselected saved value when reviewing an already-answered item via "Atras"
   * (back-view). Null on the frontier (fresh, unanswered item).
   */
  initialValue?: number | null;
  /** True when this is a back-view of an answered item (forward = frontier). */
  isBackView?: boolean;
  /** True when `sequenceNumber > 1` → render the "Anterior" control. */
  canGoBack?: boolean;
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
  code,
  scaleVariant = "labeled-rows",
  anchors = [],
  points = 0,
  anchorMin = "",
  anchorMax = "",
  ariaLabel,
  autosaveChipLabel,
  retryChipLabel,
  exitLinkLabel,
  nextCtaLabel,
  prevCtaLabel,
  continueCtaLabel,
  initialValue = null,
  isBackView = false,
  canGoBack = false,
}: ItemFormProps) {
  const legendId = useId();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [chipLabel, setChipLabel] = useState(autosaveChipLabel);
  const [selected, setSelected] = useState<number | null>(initialValue);

  // Advance to the frontier (next unanswered item) via the two-step that
  // survives [GAP-RESUME-BOUNCE]: replace to the `?resumed=true` base URL so the
  // resume gate is skipped, then refresh to force the server to serve the next
  // item. Dropping the `?item=` param is what makes "Atras" a "review + return"
  // (Model A): after (re)answering a past item, the user lands back at the
  // frontier — never ahead of it (which would freeze the count-driven runner).
  function goToFrontier() {
    startTransition(() => {
      router.replace(`/test/${code}?resumed=true`);
      router.refresh();
    });
  }

  // Navigate to the previous item, preloaded. Carries `?resumed=true` so the
  // resume gate stays skipped; `?item=` is clamped server-side (resolveDisplayItem).
  function goBack() {
    startTransition(() => {
      router.push(
        `/test/${code}?resumed=true&item=${item.sequenceNumber - 1}`,
      );
    });
  }

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
      // Successful save — advance in place WITHOUT re-tripping the resume gate
      // ([GAP-RESUME-BOUNCE], 02-20 Gap A). The fresh entry URL `/test/{code}`
      // carries no `?resumed=true`, so once progress>0 the Server Component
      // would render the resume interstitial ("ya completaste …") instead of the
      // next item. goToFrontier() runs the two-step (replace `?resumed=true` +
      // refresh) that both skips the gate and forces a refetch on every advance.
      goToFrontier();
    } catch {
      setChipLabel(retryChipLabel);
    }
  }

  const isNumeric = scaleVariant === "numeric-endpoints";
  // 0-based numeric scale (PERMA 0..points-1, i.e. 0..10 for points=11).
  const numericValues = isNumeric
    ? Array.from({ length: points }, (_, i) => i)
    : [];
  const numericMax = points > 0 ? points - 1 : 0;

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
        aria-label={ariaLabel}
        aria-required="true"
        className="flex flex-col gap-4"
      >
        {/* Stem: large editorial serif. `font-display` resolves to Fraunces
            under the `.dm-paper` scope (Ola 2.1). */}
        <legend
          id={legendId}
          className="max-w-prose font-display text-3xl leading-snug text-text-primary sm:text-4xl"
        >
          {item.stem}
        </legend>

        {isNumeric ? (
          <div className="flex flex-col gap-2">
            {/* Per-item endpoint anchors (verbatim from seed, vary by block). */}
            <div className="flex items-center justify-between text-sm text-text-secondary">
              <span>{anchorMin}</span>
              <span>{anchorMax}</span>
            </div>
            {/* Mobile <480px: 11 endpoints wrap to keep every target >=44px
                (11*44 > 360px in one row). `flex-1` fills each wrapped row;
                `min-w-[44px]` is the touch-target floor (Ola 2.1, UX-05). */}
            <div className="flex flex-wrap items-stretch justify-center gap-1">
              {numericValues.map((n) => {
                const isChecked = selected === n;
                return (
                  <button
                    key={n}
                    type="button"
                    role="radio"
                    aria-checked={isChecked}
                    aria-valuetext={`${n} de ${numericMax}, donde ${anchorMin} es ${0} y ${anchorMax} es ${numericMax}`}
                    onClick={() => void submit(n)}
                    disabled={isPending}
                    className={`relative flex min-h-[44px] min-w-[44px] flex-1 items-center justify-center rounded-md border border-border-default bg-secondary text-base text-text-primary transition-colors before:absolute before:inset-x-0 before:-top-2 before:-bottom-2 before:content-[''] hover:bg-accent-muted ${
                      isChecked ? "bg-accent-muted ring-2 ring-accent" : ""
                    }`}
                  >
                    {n}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {anchors.map((anchor) => {
              const isChecked = selected === anchor.value;
              return (
                <label
                  key={anchor.value}
                  className={`flex min-h-[56px] cursor-pointer items-center gap-3 rounded-lg border px-4 text-base text-text-primary transition-colors ${
                    isChecked
                      ? "border-accent bg-accent-muted"
                      : "border-border-default bg-secondary hover:bg-accent-muted"
                  }`}
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
        )}
      </fieldset>

      {/* Sticky footer: auto-save chip + nav (Anterior / Continuar|Siguiente) +
          exit link. The item-level progress is now VISIBLE in the header
          ("Vas en X de Y" / "Bloque X de 5"), so the old sr-only "X de Y"
          duplicate is removed (Ola 2.1). */}
      <footer className="sticky bottom-0 z-10 mt-4 flex flex-col items-center gap-3 bg-background py-2">
        <span
          role="status"
          aria-live="polite"
          className="rounded-full bg-accent-muted px-4 py-1 text-sm text-text-primary"
        >
          {chipLabel}
        </span>
        <div className="flex w-full items-center justify-between gap-2">
          {/* "Anterior" — back-nav; disabled/absent on item 1 (canGoBack). */}
          {canGoBack ? (
            <button
              type="button"
              onClick={goBack}
              disabled={isPending}
              className="inline-flex min-h-[44px] items-center rounded-md px-3 text-sm font-medium text-text-secondary hover:text-text-primary disabled:opacity-50"
            >
              <span aria-hidden="true">←</span>&nbsp;{prevCtaLabel}
            </button>
          ) : (
            <span />
          )}
          {isBackView ? (
            // Back-view: re-tapping the SAME preselected radio fires no onChange
            // (no advance), so an explicit forward control is required. Both this
            // and changing the answer return to the frontier (Model A).
            <button
              type="button"
              onClick={goToFrontier}
              disabled={isPending}
              className="inline-flex min-h-[44px] items-center rounded-md bg-accent px-4 font-semibold text-secondary disabled:opacity-50"
            >
              {continueCtaLabel}&nbsp;<span aria-hidden="true">→</span>
            </button>
          ) : (
            // Frontier desktop-only next (mobile auto-advances on tap).
            <button
              type="submit"
              className="hidden min-h-[44px] items-center rounded-md bg-accent px-4 font-semibold text-secondary md:inline-flex"
              disabled={selected == null || isPending}
            >
              {nextCtaLabel}
            </button>
          )}
        </div>
        <a
          href="/"
          className="text-sm text-text-secondary hover:text-text-primary"
        >
          {exitLinkLabel}
        </a>
      </footer>
    </form>
  );
}
