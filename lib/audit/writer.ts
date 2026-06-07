/**
 * Server-side audit writer — the SINGLE authorized path that produces
 * rows in `public.audit_log`.
 *
 * Anchors:
 *  - 01-RESEARCH.md §"Audit log domain" (schema + write contract).
 *  - 01-PATTERNS.md §1.7 (writer = only entry point + logger surface).
 *  - 01-CONTEXT.md D4.2 (no PII in meta).
 *  - COMPL-09 (append-only audit).
 *  - COMPL-14 (no PII in logs — meta is NEVER logged).
 *
 * The chain hash + prev_hash are filled by the BEFORE INSERT trigger
 * (migration 004). Callers MUST NOT supply them; doing so silently lets
 * the trigger overwrite. Likewise `id` and `occurred_at` are server-set.
 *
 * Threat register (PLAN.md):
 *  - T-01-05-04 Information Disclosure — `meta` jsonb can carry contextual
 *    fields. The logger.info call below intentionally omits `meta` so
 *    even non-PII context like request_id does not bloat log volume.
 *    Pino redact still covers `email`/`name`/`raw_value` keys top-level
 *    or nested per `lib/logger.ts` REDACT_PATHS as belt-and-suspenders.
 *
 *  - T-01-05-03 Repudiation — actor_role is required and constrained to
 *    'authenticated' | 'service_role' | 'system' so a null actor_id never
 *    creates ambiguity about who acted.
 *
 * Usage (Plan 01-09 derechos titular endpoints will be the first caller):
 *
 *     await writeAudit(supabase, {
 *       actor_id: user.id,
 *       actor_role: 'authenticated',
 *       action: 'user_data_export',
 *       entity_type: 'user',
 *       entity_id: user.id,
 *       meta: { request_id: ctx.requestId },
 *     });
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { logger } from "@/lib/logger";

export type AuditActorRole = "authenticated" | "service_role" | "system";

export interface WriteAuditOptions {
  /** null for system / cron events; required for authenticated + service_role. */
  actor_id: string | null;
  actor_role: AuditActorRole;
  /** Stable event name, snake_case. Examples: 'consent_granted', 'pdf_export'. */
  action: string;
  /** Entity domain. Examples: 'user', 'consent', 'report_snapshot'. */
  entity_type: string;
  /** Entity id. UUID or text; both are accepted in the SQL column. */
  entity_id: string;
  /** Optional context (request_id, ip_truncated, user_agent). MUST NOT contain PII. */
  meta?: Record<string, unknown>;
}

/**
 * Insert one row in `public.audit_log` and emit a redacted log line.
 *
 * Throws on insert error so callers can wrap in a transaction or surface
 * to Sentry. The audit row is small; the throw cost is acceptable in
 * exchange for guaranteed audit emission.
 */
export async function writeAudit(
  supabase: SupabaseClient,
  opts: WriteAuditOptions,
): Promise<void> {
  // Build the insert payload. NEVER include id/occurred_at/prev_hash/this_hash;
  // the trigger fills prev_hash + this_hash, id is identity, occurred_at
  // defaults to now().
  const payload = {
    actor_id: opts.actor_id,
    actor_role: opts.actor_role,
    action: opts.action,
    entity_type: opts.entity_type,
    entity_id: opts.entity_id,
    meta: opts.meta ?? null,
  };

  const { error } = await supabase.from("audit_log").insert(payload);
  if (error) {
    // Logged with no meta to avoid leaking the failed-write payload to
    // ops dashboards if it carried PII despite the contract.
    logger.error(
      {
        action: opts.action,
        entity_type: opts.entity_type,
        code: error.code,
        message: error.message,
      },
      "audit_write_failed",
    );
    throw new Error(`audit write failed: ${error.message}`);
  }

  // Log only stable identifiers + the action. `meta` is intentionally
  // omitted — see threat register T-01-05-04 above.
  logger.info(
    {
      actor_id: opts.actor_id,
      actor_role: opts.actor_role,
      action: opts.action,
      entity_type: opts.entity_type,
      entity_id: opts.entity_id,
    },
    "audit",
  );
}
