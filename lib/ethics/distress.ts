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
