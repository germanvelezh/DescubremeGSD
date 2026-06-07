/**
 * SHA-256 chain hash — TypeScript mirror of the Postgres
 * `public.audit_log_chain_hash()` trigger (migration 004).
 *
 * Anchors:
 *  - 01-RESEARCH.md §"Audit log domain" (canonical algorithm).
 *  - 01-PATTERNS.md §1.7 (mirror requirement).
 *  - COMPL-09 (chain integrity).
 *
 * Uses:
 *  - Unit tests asserting trigger ↔ TS parity.
 *  - Phase 7 LEGAL-09 verifier job that re-walks `audit_log` and recomputes
 *    `this_hash` for tamper detection.
 *
 * Algorithm (must match `audit_log_chain_hash` verbatim):
 *
 *   payload = encode(prev_hash, 'hex')          // 64 hex chars
 *           || coalesce(actor_id::text, '')      // uuid as text or ''
 *           || action
 *           || entity_type
 *           || entity_id
 *           || occurred_at::text                 // Postgres timestamptz cast
 *   this_hash = sha256(payload)                  // 32 raw bytes
 *
 * `prev_hash` for the first row is 32 zero bytes (`\x00...00`).
 *
 * occurred_at format: callers MUST pass the same string representation the
 * database produces from `timestamptz::text`. Tests use `formatPgTimestamp`
 * to keep parity (Postgres `2026-06-06 14:23:45.123456+00`, not ISO 8601).
 * The mirror is exact only when the caller mirrors `occurred_at::text`
 * exactly — see `formatPgTimestamp` below.
 */
import { createHash } from "node:crypto";

/** 32 zero bytes — initial prev_hash for the first audit_log row. */
export const ZERO_HASH: Uint8Array = new Uint8Array(32);

export interface ChainHashPayload {
  actor_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string;
  /**
   * MUST already be in Postgres `timestamptz::text` form (see
   * `formatPgTimestamp`). Passing a Date or ISO string will silently produce
   * a hash that diverges from the SQL trigger.
   */
  occurred_at: string;
}

/**
 * Compute the chain hash for one audit_log row.
 *
 * Returns 32 raw SHA-256 bytes. Pass `null` for the first row's `prevHash`
 * and `ZERO_HASH` will be used internally.
 */
export function chainHash(
  prevHash: Uint8Array | null,
  payload: ChainHashPayload,
): Uint8Array {
  const prev = prevHash ?? ZERO_HASH;
  // Postgres `encode(bytea, 'hex')` is lowercase, unpadded across the 32 bytes.
  const prevHex = Buffer.from(prev).toString("hex");
  const actor = payload.actor_id ?? "";
  const concat =
    prevHex +
    actor +
    payload.action +
    payload.entity_type +
    payload.entity_id +
    payload.occurred_at;
  return new Uint8Array(createHash("sha256").update(concat, "utf8").digest());
}

/**
 * Format a Date as Postgres `timestamptz::text` output.
 *
 * Postgres default format: `YYYY-MM-DD HH:MM:SS[.ffffff]+HH` (space separator,
 * microseconds when present, signed offset). For deterministic chain
 * verification callers should round to whole seconds and use UTC (`+00`).
 *
 * This helper exists so tests can construct payloads whose `occurred_at`
 * exactly mirrors what the trigger sees. Production code does NOT need to
 * call this — `writeAudit` lets Postgres compute the hash server-side.
 */
export function formatPgTimestamp(date: Date): string {
  const pad = (n: number, w = 2) => String(n).padStart(w, "0");
  const yyyy = date.getUTCFullYear();
  const mm = pad(date.getUTCMonth() + 1);
  const dd = pad(date.getUTCDate());
  const HH = pad(date.getUTCHours());
  const MM = pad(date.getUTCMinutes());
  const SS = pad(date.getUTCSeconds());
  return `${yyyy}-${mm}-${dd} ${HH}:${MM}:${SS}+00`;
}
