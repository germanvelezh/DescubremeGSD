/**
 * visual-registry — the central plugin-as-data contract for report visuals
 * (Plan 02-05, UI-SPEC §6.0, CONTEXT D-C.1/D-C.2).
 *
 * A report's primary visual is resolved from the `visual_type` ENUM seeded on
 * `instrument_version` (metadata), NEVER from an instrument-code conditional.
 * Adding an instrument = a seed + a `visual_type` value; no `.ts` change here
 * or in the assembler (FOUND-05, `no-hardcoded-instruments.test.ts`).
 *
 * The registry maps the enum to a React component. All instrument-agnostic
 * visuals (`bars`, `circumplex`) consume the same `VisualProps` shape and
 * render purely from `dimensions[]`. The O*NET hexagon stays
 * instrument-specific (it predates this contract) but is registered under the
 * `'hexagon'` key — invoked by enum, not by code.
 *
 * Anchors:
 *  - 02-UI-SPEC.md §6.0 (VisualProps contract verbatim).
 *  - 02-CONTEXT.md D-C.1 (visual a medida por constructo),
 *    D-C.2 (assembler agnóstico + visual_type enum).
 *  - tests/lint/no-hardcoded-instruments.test.ts (FOUND-05).
 */
import type { ComponentType } from "react";

import { BarsWithBands } from "./BarsWithBands";
import { HexagonoRiasecFull } from "./HexagonoRiasecFull";
import { ValueCircle } from "./ValueCircle";

/** Seeded on `instrument_version.visual_type` (text enum, migration 014). */
export type VisualType = "hexagon" | "bars" | "circumplex";

export type VisualBand = "BAJO" | "MEDIO" | "ALTO";

/**
 * One renderable dimension. `code` is an opaque dimension identifier — it is
 * NOT interpreted in the UI (no `'E'`/`'A'`/HOV branching). `label` is the
 * es-CO name (verbatim from pack §5 via narrative_template / MC_*). `value`
 * is raw or MRAT-centered depending on the instrument's centering strategy
 * (can be negative for circumplex). `band` is the primary non-color signal.
 */
export interface VisualDimension {
  code: string;
  label: string;
  value: number;
  band: VisualBand;
  /** Used to normalize visual length. Defaults to 5 in the visuals. */
  max?: number;
}

/** Props every visual receives — data-driven, zero instrument names. */
export interface VisualProps {
  dimensions: VisualDimension[];
  reducedMotion: boolean;
}

/**
 * Generic UI registry, keyed by the ENUM — zero instrument-code conditionals.
 *
 * `HexagonoRiasecFull` predates `VisualProps` (it takes `{ scores, top3 }`),
 * so it is registered with a documented structural cast. This mirrors the
 * codebase precedent for an unavoidable structural mismatch at a contract
 * boundary (Plan 01-11 Sentry `beforeSend` cast). The assembler does the
 * per-`visual_type` data adaptation before rendering; the registry only owns
 * the enum→component mapping. The two NEW visuals stay fully type-checked.
 */
export const VISUAL_REGISTRY: Record<VisualType, ComponentType<VisualProps>> = {
  hexagon: HexagonoRiasecFull as unknown as ComponentType<VisualProps>,
  bars: BarsWithBands,
  circumplex: ValueCircle,
};
