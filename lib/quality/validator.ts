/**
 * Quality validator — Phase 1 baseline detectors (QUAL-07, Pitfall 11).
 *
 * Detectores activos:
 *   1. Patron unico: stdev(rawValues) < 0.5 con N >= 5 items → severity 'flag'.
 *   2. Tiempo atipico:
 *        - mediana < 0.8 s/item → 'warn' (respondio sin leer).
 *        - mediana > 5 min/item → 'warn' (abandono / interrumpido).
 *   3. IMC items (instructed manipulation check): no aplican a O*NET IP-SF
 *      (Pack no incluye). Slot reservado Phase 2+.
 *
 * Severity ordering (canonical): ok < warn < flag < block.
 * Phase 1 emite 'flag' (informativo + visible al usuario) o 'warn' (solo log).
 * 'block' queda reservado para futuros instrumentos donde la quality flag
 * implica no mostrar resultado (Phase 2+ con detector aquiescencia
 * agresivo + IMC).
 *
 * Output: el route handler `/api/score` decide si bloquea, marca el reporte
 * con un disclaimer interno (`quality_flag` jsonb), o sigue normal.
 *
 * Anchors:
 *   - 01-RESEARCH.md lineas 1782-1796 (Pitfall 11).
 *   - 01-PATTERNS.md §2.3 (lib/quality/validator).
 *   - PLAN.md §<behavior> 10.
 */

export type QualitySeverity = "ok" | "warn" | "flag" | "block";

export type QualitySignal =
  | "single_pattern"
  | "atypical_timing"
  | "imc_failed";

export interface QualityResponse {
  rawValue: number;
}

export interface QualitySessionMeta {
  startedAt: Date;
  completedAt: Date;
}

export interface QualityResult {
  severity: QualitySeverity;
  signals: QualitySignal[];
}

const SINGLE_PATTERN_MIN_N = 5;
const SINGLE_PATTERN_STDEV_THRESHOLD = 0.5;
const ATYPICAL_TIMING_MIN_SECONDS_PER_ITEM = 0.8;
const ATYPICAL_TIMING_MAX_SECONDS_PER_ITEM = 5 * 60; // 300s

function stdev(values: number[]): number {
  if (values.length === 0) return 0;
  const mean = values.reduce((acc, v) => acc + v, 0) / values.length;
  const variance =
    values.reduce((acc, v) => acc + (v - mean) ** 2, 0) / values.length;
  return Math.sqrt(variance);
}

function escalate(current: QualitySeverity, next: QualitySeverity): QualitySeverity {
  const order: QualitySeverity[] = ["ok", "warn", "flag", "block"];
  return order.indexOf(next) > order.indexOf(current) ? next : current;
}

/**
 * Validates a completed assessment session for quality signals.
 *
 * IMC slot (third detector) is intentionally absent in Phase 1: O*NET IP-SF
 * does not include instructed manipulation check items. Phase 2 (BFI-2-S,
 * PANAS) will inject IMC items and the third detector will activate.
 */
export function validateQuality(
  responses: QualityResponse[],
  sessionMeta: QualitySessionMeta,
): QualityResult {
  const signals: QualitySignal[] = [];
  let severity: QualitySeverity = "ok";

  // Detector 1: single-pattern (low variance with sufficient N).
  if (responses.length >= SINGLE_PATTERN_MIN_N) {
    const values = responses.map((r) => r.rawValue);
    if (stdev(values) < SINGLE_PATTERN_STDEV_THRESHOLD) {
      signals.push("single_pattern");
      severity = escalate(severity, "flag");
    }
  }

  // Detector 2: atypical timing (median per item).
  // Mediana sobre tiempo total / N items — Phase 1 sin per-item timestamps
  // (FOUND-03 solo guarda responded_at; el delta intra-items lo agrega
  // Phase 2). El proxy "total/N" es suficiente para detectar speeding
  // y abandono, los dos modos mas comunes (Curran 2016).
  const elapsedSeconds =
    (sessionMeta.completedAt.getTime() - sessionMeta.startedAt.getTime()) /
    1000;
  if (responses.length > 0) {
    const secondsPerItem = elapsedSeconds / responses.length;
    if (
      secondsPerItem < ATYPICAL_TIMING_MIN_SECONDS_PER_ITEM ||
      secondsPerItem > ATYPICAL_TIMING_MAX_SECONDS_PER_ITEM
    ) {
      signals.push("atypical_timing");
      severity = escalate(severity, "warn");
    }
  }

  return { severity, signals };
}
