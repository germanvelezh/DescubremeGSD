/**
 * BlockProgress — O*NET IP-SF block presentation (Ola 2.1, HANDOFF §3 row 2.1,
 * prototipo-rediseno-free-v2.html "Respondiendo (progreso por bloque)").
 *
 * O*NET's 60 items are administered in 5 SEQUENTIAL blocks of 12 (no reordering,
 * data-driven by code + itemCount — see resolveBlockPosition). Chunking the long
 * scale into short blocks makes progress feel fast (anti-abandono). The other
 * three tests (BFI/TwIVI/PERMA) use the continuous bar (DoubleLevelProgress).
 *
 * Accessibility: the "Bloque X de 5" label is the SINGLE aria-live region of the
 * runner — its text changes only at a block boundary, so a screen reader hears a
 * milestone once per block, never per item. This is the deliberate resolution of
 * the "visible progress + announce" ask against the §6.5 anti-fatiga rule (no
 * per-increment announcements). The intra-block bar carries progressbar semantics
 * (aria-valuenow/min/max) but NO aria-live. The 5 dots are decorative (aria-hidden).
 *
 * Anchors:
 *  - lib/free/runner-navigation.ts (resolveBlockPosition — 5x12 math).
 *  - DoubleLevelProgress.tsx (global line + intra bar pattern, reused).
 *  - HANDOFF_UI_v1.0 §3 (Ola 2.1), MICROCOPY §4.2 (O*NET intro).
 */
"use client";

import { useMemo } from "react";

import { test as testMc } from "@/lib/i18n/microcopy/es-CO/test";

export interface BlockProgressProps {
  /** Global journey position — "Test {g} de {N} · {label}". */
  globalCurrent: number;
  globalTotal: number;
  instrumentLabel: string;
  /** 1-based current block + total blocks (5 for O*NET). */
  block: number;
  totalBlocks: number;
  /** 1-based position WITHIN the current block + block size (12 for O*NET). */
  itemInBlock: number;
  blockSize: number;
}

export function BlockProgress({
  globalCurrent,
  globalTotal,
  instrumentLabel,
  block,
  totalBlocks,
  itemInBlock,
  blockSize,
}: BlockProgressProps) {
  const percent = useMemo(() => {
    if (blockSize <= 0) return 0;
    const clamped = Math.max(0, Math.min(itemInBlock, blockSize));
    return (clamped / blockSize) * 100;
  }, [itemInBlock, blockSize]);

  return (
    <div className="flex flex-col gap-1">
      {/* Global level — text only, mirrors DoubleLevelProgress. */}
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

      {/* Block label + dots. The label is the runner's only aria-live region
          (announces at block boundaries only). */}
      <div className="flex items-center justify-between gap-2">
        <p
          aria-live="polite"
          className="text-sm font-medium text-text-primary tabular-nums"
        >
          {testMc.MC_TEST_BLOCK_LABEL(block, totalBlocks)}
        </p>
        <span className="flex items-center gap-1.5" aria-hidden="true">
          {Array.from({ length: totalBlocks }, (_, i) => {
            const n = i + 1;
            const state =
              n < block ? "done" : n === block ? "current" : "upcoming";
            return (
              <span
                key={n}
                className={`h-1.5 rounded-full transition-[width,background-color] duration-[var(--duration-fast)] ease-[var(--ease-standard)] ${
                  state === "current"
                    ? "w-4 bg-accent"
                    : state === "done"
                      ? // Block milestone: the freshly-earned dot pulses in once
                        // (200ms appear) at the boundary. aria-hidden wrapper —
                        // the aria-live label above is the only announcer.
                        "w-1.5 bg-accent motion-safe:animate-appear"
                      : "w-1.5 bg-border-default"
                }`}
              />
            );
          })}
        </span>
      </div>

      {/* Intra-block bar — progressbar semantics, NO aria-live. */}
      <div
        role="progressbar"
        aria-label={testMc.MC_TEST_BLOCK_PROGRESS_ARIA(
          block,
          totalBlocks,
          itemInBlock,
          blockSize,
        )}
        aria-valuenow={itemInBlock}
        aria-valuemin={1}
        aria-valuemax={blockSize}
        className="h-1.5 w-full overflow-hidden rounded-full bg-border-default"
      >
        <div
          className="h-full bg-accent transition-[width] duration-[var(--duration-fast)] ease-[var(--ease-standard)]"
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="text-xs text-text-secondary">
        {testMc.MC_TEST_BLOCK_SUBTITLE}
      </p>
    </div>
  );
}
