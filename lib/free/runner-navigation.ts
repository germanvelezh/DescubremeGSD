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
 * Block math for the runner's block presentation. `blockSize` comes from
 * `instrument_version.block_size` (migration 019, D-15) — since Plan 03-02 the
 * caller reads it from data instead of branching on an instrument code. The math
 * here always was instrument-agnostic and did not change. Returns null when there
 * is no block presentation (blockSize null/<=0) so the runner falls back to the
 * continuous bar. Blocks are SEQUENTIAL chunks — no reordering.
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

/**
 * Tipo de sugerencia de pausa que corresponde en el punto actual del runner
 * (D-16 / D-17). `none` = no se sugiere nada.
 */
export type PauseSuggestionKind = "none" | "block-edge" | "midpoint";

/**
 * ¿Que bloque acaba de CERRAR el usuario, si es que cerro alguno?
 *
 * El runner es server-driven: al responder el ultimo item de un bloque, la
 * pantalla siguiente sirve el PRIMER item del bloque siguiente. Asi que "acabo
 * de cerrar el bloque B" es exactamente "estoy en el item 1 del bloque B+1".
 *
 * Esto es lo que resuelve la tension aparente entre el criterio ("al responder
 * el item 12 aparece la sugerencia") y el microcopy ("Terminaste el bloque
 * {bloque}"): la frase no puede renderizarse mientras el usuario sigue EN el
 * item 12 — todavia no lo termino. Se renderiza sobre el item 13, y el numero
 * que nombra es el 1. Para VIA, el borde es el item 48 y la sugerencia sale
 * sobre el 49: no es un off-by-one.
 *
 * Devuelve null cuando no hay borde recien cruzado (o no hay bloques).
 */
export function resolveClosedBlock(
  position: BlockPosition | null,
): number | null {
  if (!position) return null;
  if (position.itemInBlock !== 1) return null;
  if (position.block <= 1) return null;
  return position.block - 1;
}

/**
 * Que sugerencia de pausa corresponde tras cerrar `closedBlock` de
 * `totalBlocks` (D-16 / D-17).
 *
 * ARITMETICA SOBRE DATOS, sin conocer ningun instrumento. El "punto medio" NO
 * es la constante 48 de D-16: 48 es la consecuencia de 96 items en bloques de
 * 12 para VIA-IS-P-96. Aqui el punto medio es el bloque cuyo indice es la mitad
 * del total, y solo existe cuando el total de bloques es PAR y mayor que 2 —
 * con 5 bloques (O*NET) no hay mitad exacta y no se emite ninguno, que es el
 * comportamiento correcto: inventar un "punto medio" en el bloque 2 o 3 seria
 * una afirmacion falsa sobre el recorrido.
 *
 * El ULTIMO bloque nunca sugiere pausa: ese borde ya lo cubre `TransitionScreen`
 * y duplicarlo seria ruido.
 *
 * `lib/free` esta bajo FOUND-05: ni un codigo de instrumento ni un numero magico
 * entran aca.
 */
export function resolvePauseSuggestion(
  closedBlock: number | null,
  totalBlocks: number,
): PauseSuggestionKind {
  if (closedBlock == null || closedBlock < 1) return "none";
  if (totalBlocks <= 1) return "none";
  // Cerrar el ultimo bloque es el final del instrumento, no una pausa.
  if (closedBlock >= totalBlocks) return "none";
  if (totalBlocks % 2 === 0 && totalBlocks > 2 && closedBlock === totalBlocks / 2) {
    return "midpoint";
  }
  return "block-edge";
}
