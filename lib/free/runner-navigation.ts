/**
 * runner-navigation — pure resolution for the redesigned item loop (Ola 2.1).
 *
 * The runner is 100% server-driven: `getNextItemForSession` serves
 * `sequence_number = progress + 1`, and `progress` is the COUNT of distinct
 * answered items (recomputed idempotently in advanceProgress —
 * [BUG-PROGRESS-DRIFT-ON-REANSWER]). Answers therefore stay contiguous 1..progress
 * and re-answering a past item never drifts the count.
 *
 * "Atras" adds a `?item=N` URL signal so the runner can render a PAST item
 * preloaded. That signal is the only way a stray sequence could reach the item
 * loop, so it MUST be clamped here — see resolveDisplayItem.
 *
 * These are pure (no I/O) so the freeze-prevention bounds check and the block
 * math are unit-tested in isolation (runner-navigation.test.ts).
 */

export interface DisplayItem {
  /** The 1-based sequence number of the item to render. */
  seq: number;
  /**
   * True when the user navigated "Atras" to review an already-answered item
   * (its saved value is preloaded). False = the frontier (next unanswered item).
   */
  isBackView: boolean;
}

/**
 * Resolves which item the runner should render from the `?item=` param and the
 * session's `progress` (distinct-answer count).
 *
 * A back-view is valid ONLY for an already-answered item: an integer N with
 * `1 <= N <= progress`. Every other input — absent, empty, non-numeric,
 * non-integer, < 1, > progress (including the frontier itself or beyond), or a
 * repeated array param — resolves to the frontier (`progress + 1`). Serving a
 * stray N > progress would let the user answer an item ahead of the frontier,
 * drifting the count past coverage and freezing the runner permanently.
 */
export function resolveDisplayItem(
  rawItemParam: string | string[] | undefined,
  progress: number,
): DisplayItem {
  const frontier: DisplayItem = { seq: progress + 1, isBackView: false };

  if (typeof rawItemParam !== "string" || rawItemParam.trim() === "") {
    return frontier;
  }
  // Reject anything that is not a plain non-negative integer literal (blocks
  // "2.5", "1e2", "0x3", " 3 " ambiguity, etc. — only clean ints are back-nav).
  if (!/^\d+$/.test(rawItemParam)) return frontier;

  const n = Number.parseInt(rawItemParam, 10);
  if (n >= 1 && n <= progress) return { seq: n, isBackView: true };
  return frontier;
}

export interface BlockPosition {
  /** 1-based current block. */
  block: number;
  /** Total blocks (5 for the O*NET 60-item form at blockSize 12). */
  totalBlocks: number;
  /** 1-based position of the item WITHIN the current block. */
  itemInBlock: number;
  /** Items per block (the caller passes 12 for O*NET). */
  blockSize: number;
}

/**
 * Block math for the runner's block presentation. `blockSize` is the DECISION,
 * made by the caller from the instrument (O*NET IP-SF → 12; every other test →
 * null). Keeping the instrument→blockSize choice out of this module keeps
 * lib/free free of instrument-code literals (FOUND-05 lint scope); the math here
 * is instrument-agnostic. Returns null when there is no block presentation
 * (blockSize null/<=0) so the runner falls back to the continuous bar. Blocks are
 * SEQUENTIAL chunks — no reordering.
 */
export function resolveBlockPosition(
  seq: number,
  totalItems: number,
  blockSize: number | null,
): BlockPosition | null {
  if (blockSize == null || blockSize <= 0 || totalItems <= 0 || seq < 1) {
    return null;
  }
  const block = Math.ceil(seq / blockSize);
  const totalBlocks = Math.ceil(totalItems / blockSize);
  const itemInBlock = ((seq - 1) % blockSize) + 1;
  return { block, totalBlocks, itemInBlock, blockSize };
}
