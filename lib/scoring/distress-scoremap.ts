/**
 * Derivable distress scoreMap synthesis + seeded-spec normalization (Plan 02-19).
 *
 * Two PURE helpers score-session uses to wire the NFR-28 prominent banner:
 *
 *  1. `synthesizeDistressScoreMap` — builds the key→value map the generic
 *     `evaluateDistressThreshold` (lib/ethics/distress.ts) reads, from the
 *     per-dimension means score-session already computes (`scoresByDim`).
 *     DERIVABLE-MINIMUM scope (owner decision, [GAP-NFR28-DISTRESS-BANNER-UNWIRED]):
 *       - `<dim>_mean` for every dimension (covers `N_mean`);
 *       - single-item dims aliased from their `item_codes[0]` (covers `Lon1`,
 *         `hap1` — the mean of a single item IS the item value);
 *       - seeded aggregate means (covers `PERMA_total`): mean of the listed
 *         dimension means. NOTE: this is the mean-of-dimension-means, an
 *         APPROXIMATION of the item-level total; exact item-level totals are
 *         deferred with the item-level triggers (see below).
 *     Item-level keys (`N1`/`N3`) are NOT synthesized — DEFERRED
 *     ([GAP-NFR28-ITEM-LEVEL-TRIGGERS], requires item-level decomposition of the
 *     scoring engine). The evaluator ignores absent keys (evalLeaf: actual==null
 *     -> false), so the SUBSET is correct: the banner fires on the derivable keys
 *     and silently ignores the deferred ones.
 *
 *  2. `normalizeDistressSpec` — adapts the SEEDED jsonb shape (`{any:[...]}`
 *     groups, ops `lt`/`gt`/`gte`/`lte`) into the `DistressThresholdSpec` the
 *     evaluator consumes (flat `DistressClause[]`, ops `gte`/`lte` + `exclusive`).
 *     The seed and the evaluator were authored independently (the seed predates
 *     the wiring); this reconciles them. Mapping:
 *       - `{any:[...]}`  -> the clause array (groupFires is already disjunctive);
 *       - `{all:[...]}`  -> passed through (already a conjunctive group);
 *       - op `lt` -> `{op:'lte', exclusive:true}`  (strict <);
 *       - op `gt` -> `{op:'gte', exclusive:true}`  (strict >);
 *       - op `lte`/`gte` -> same op, `exclusive:false`.
 *
 * Plugin-as-data invariant (FOUND-05): branches ONLY on structure + op strings,
 * NEVER on instrument code. No instrument-code literal appears here.
 *
 * Anchors:
 *  - lib/ethics/distress.ts (evaluateDistressThreshold, DistressThresholdSpec).
 *  - db/seeds/instruments/PERMA-Profiler/instrument-version.sql (seeded shape +
 *    distress_aggregates).
 *  - tests/unit/ethics/decoupled-flags.test.ts (the normalized PERMA oracle).
 */
import type {
  DistressClause,
  DistressLeafClause,
  DistressThresholdSpec,
  ThresholdOp,
} from "@/lib/ethics/distress";

/** Per-dimension scoring metadata score-session derives from scoring_rule. */
export interface DistressRuleMeta {
  /** The dimension's item codes (from scoring_rule.formula.item_codes). */
  itemCodes: string[];
}

/**
 * Builds the derivable distress scoreMap from per-dimension means.
 *
 * @param scoresByDim   dimension -> mean score (score-session step 10).
 * @param rulesByDim    dimension -> { itemCodes } (from the scoring rules).
 * @param aggregates    aggregateKey -> contributing dimension codes (seeded in
 *                      psychometric_status.distress_aggregates). Empty when the
 *                      instrument seeds none.
 */
export function synthesizeDistressScoreMap(
  scoresByDim: Record<string, number>,
  rulesByDim: Record<string, DistressRuleMeta>,
  aggregates: Record<string, string[]>,
): Record<string, number> {
  const map: Record<string, number> = {};

  for (const [dim, mean] of Object.entries(scoresByDim)) {
    // `<dim>_mean` alias — covers score-level keys like `N_mean`.
    map[`${dim}_mean`] = mean;

    // Single-item dims: the dim mean IS the item value. Alias under the item
    // code itself (read from data, NOT a built `<dim>1` string) — covers
    // `Lon1`, `hap1`.
    const itemCodes = rulesByDim[dim]?.itemCodes ?? [];
    if (itemCodes.length === 1 && itemCodes[0]) {
      map[itemCodes[0]] = mean;
    }
  }

  // Seeded aggregate means: mean of the listed dimension means (derivable
  // approximation; item-level exact total deferred).
  for (const [aggKey, dims] of Object.entries(aggregates)) {
    const present = dims
      .map((d) => scoresByDim[d])
      .filter((v): v is number => typeof v === "number" && !Number.isNaN(v));
    if (present.length > 0) {
      map[aggKey] = present.reduce((a, b) => a + b, 0) / present.length;
    }
  }

  return map;
}

// ---------------------------------------------------------------------------
// Seeded shape (loosely typed — it is raw jsonb until normalized)
// ---------------------------------------------------------------------------

interface SeededLeaf {
  key?: unknown;
  op?: unknown;
  value?: unknown;
}

interface SeededAll {
  all?: unknown;
}

interface SeededGroup {
  any?: unknown;
}

function mapOp(op: string): { op: ThresholdOp; exclusive: boolean } {
  switch (op) {
    case "lt":
      return { op: "lte", exclusive: true };
    case "gt":
      return { op: "gte", exclusive: true };
    case "lte":
      return { op: "lte", exclusive: false };
    case "gte":
      return { op: "gte", exclusive: false };
    default:
      throw new Error(`unknown distress threshold op: ${op}`);
  }
}

function normalizeLeaf(raw: SeededLeaf): DistressLeafClause {
  const { op, exclusive } = mapOp(String(raw.op));
  return {
    key: String(raw.key),
    op,
    value: Number(raw.value),
    exclusive,
  };
}

function normalizeClause(raw: unknown): DistressClause {
  const obj = (raw ?? {}) as SeededAll & SeededLeaf;
  if (Array.isArray(obj.all)) {
    return { all: obj.all.map((c) => normalizeLeaf(c as SeededLeaf)) };
  }
  return normalizeLeaf(obj);
}

function normalizeGroup(raw: unknown): DistressClause[] | undefined {
  if (raw == null) return undefined;
  const group = raw as SeededGroup;
  // Seeded shape wraps clauses in `{any:[...]}`; tolerate a bare array too.
  const clauses = Array.isArray(group.any)
    ? group.any
    : Array.isArray(raw)
      ? (raw as unknown[])
      : null;
  if (!clauses) return undefined;
  return clauses.map(normalizeClause);
}

/**
 * Normalizes a seeded `distress_thresholds` jsonb into the evaluator's
 * `DistressThresholdSpec`. Returns `null` when no thresholds are present
 * (non-sensitive instrument). An empty object normalizes to `{}` (no clauses).
 */
export function normalizeDistressSpec(
  raw: unknown,
): DistressThresholdSpec | null {
  if (raw == null) return null;
  if (typeof raw !== "object") return null;
  const seeded = raw as { strong?: unknown; moderate?: unknown };
  const spec: DistressThresholdSpec = {};
  const strong = normalizeGroup(seeded.strong);
  const moderate = normalizeGroup(seeded.moderate);
  if (strong) spec.strong = strong;
  if (moderate) spec.moderate = moderate;
  return spec;
}
