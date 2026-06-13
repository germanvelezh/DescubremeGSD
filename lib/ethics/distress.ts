/**
 * Distress event writer — NFR-28 audit trail (Plan 01-08, Wave 5).
 *
 * `recordDistressEvent(serviceRole, ...)` INSERTa una row a `distress_event`
 * cuando el middleware decide que se mostro / disparo una accion de
 * contencion. Phase 1: solo se invoca con action='disclaimer_shown' desde
 * el seam de scoring (D3.12 difiere UI). Phase 2 anade
 * 'contention_route_shown' y 'follow_up_dispatched'.
 *
 * Service-role required: distress_event tiene RLS own-data por user (D1.5
 * anonymize on user delete). Server-side route handler escribe via service
 * role para evitar acoplamiento al JWT del cliente.
 *
 * Anchors:
 *   - 01-RESEARCH.md §"Distress event domain".
 *   - 01-CONTEXT.md D1.5 + D3.12.
 *   - db/schema/distress-event.ts.
 */
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

import { logger } from "@/lib/logger";

/**
 * Generic distress threshold evaluation (Plan 02-06, FOUND-05).
 *
 * The threshold logic is DATA-DRIVEN: per-instrument clauses are seeded and
 * passed in, never branched on by instrument code. Each clause compares a key
 * from a computed score/facet/item map against a value with an operator.
 *
 * A clause is either:
 *   - a leaf `{ key, op, value, exclusive? }` — `op` is 'gte' (>= or >) or
 *     'lte' (<= or <); `exclusive` flips the comparison to strict (> / <).
 *   - a conjunctive group `{ all: Clause[] }` — true iff ALL sub-clauses hold.
 *
 * A severity group (`strong` / `moderate`) is DISJUNCTIVE: the group fires if
 * ANY of its clauses holds. `strong` takes precedence over `moderate`.
 *
 * The verbatim BFI/PERMA threshold numbers live in seeds + test fixtures
 * (both excluded from `no-hardcoded-instruments` scan), NOT here.
 */
export type ThresholdOp = "gte" | "lte";

export interface DistressLeafClause {
  key: string;
  op: ThresholdOp;
  value: number;
  /** When true, the comparison is strict (> / <) instead of inclusive. */
  exclusive?: boolean;
}

export interface DistressAllClause {
  all: DistressLeafClause[];
}

export type DistressClause = DistressLeafClause | DistressAllClause;

export interface DistressThresholdSpec {
  strong?: DistressClause[];
  moderate?: DistressClause[];
}

export type DistressSeverity = "strong" | "moderate";

export interface DistressThresholdResult {
  showContention: boolean;
  severity: DistressSeverity | null;
}

function evalLeaf(clause: DistressLeafClause, scoreMap: Record<string, number>): boolean {
  const actual = scoreMap[clause.key];
  if (actual == null || Number.isNaN(actual)) return false;
  if (clause.op === "gte") {
    return clause.exclusive ? actual > clause.value : actual >= clause.value;
  }
  // op === "lte"
  return clause.exclusive ? actual < clause.value : actual <= clause.value;
}

function evalClause(clause: DistressClause, scoreMap: Record<string, number>): boolean {
  if ("all" in clause) {
    return clause.all.every((sub) => evalLeaf(sub, scoreMap));
  }
  return evalLeaf(clause, scoreMap);
}

function groupFires(
  clauses: DistressClause[] | undefined,
  scoreMap: Record<string, number>,
): boolean {
  if (!clauses || clauses.length === 0) return false;
  return clauses.some((c) => evalClause(c, scoreMap));
}

/**
 * Evaluates seeded distress thresholds against a computed score/facet map.
 * Branches ONLY on the data (op/value/group), never on instrument code.
 * `strong` outranks `moderate`. Returns `{showContention, severity}`.
 *
 * Pure — safe to call from server context; no DB round-trip.
 */
export function evaluateDistressThreshold(
  scoreMap: Record<string, number>,
  thresholds: DistressThresholdSpec,
): DistressThresholdResult {
  if (groupFires(thresholds.strong, scoreMap)) {
    return { showContention: true, severity: "strong" };
  }
  if (groupFires(thresholds.moderate, scoreMap)) {
    return { showContention: true, severity: "moderate" };
  }
  return { showContention: false, severity: null };
}

export type DistressAction =
  | "disclaimer_shown"
  | "contention_route_shown"
  | "follow_up_dispatched";

export interface RecordDistressOptions {
  userId: string | null;
  instrumentVersionId: string;
  thresholdTriggered: string;
  actionTaken: DistressAction;
}

export async function recordDistressEvent(
  serviceRole: SupabaseClient,
  opts: RecordDistressOptions,
): Promise<void> {
  const { error } = await serviceRole.from("distress_event").insert({
    user_id: opts.userId,
    instrument_version_id: opts.instrumentVersionId,
    threshold_triggered: opts.thresholdTriggered,
    action_taken: opts.actionTaken,
  });
  if (error) {
    logger.error(
      {
        action_taken: opts.actionTaken,
        threshold_triggered: opts.thresholdTriggered,
        code: error.code,
      },
      "distress_event_write_failed",
    );
    throw new Error(`distress_event write failed: ${error.message}`);
  }
  logger.info(
    {
      action_taken: opts.actionTaken,
      threshold_triggered: opts.thresholdTriggered,
    },
    "distress_event_recorded",
  );
}
