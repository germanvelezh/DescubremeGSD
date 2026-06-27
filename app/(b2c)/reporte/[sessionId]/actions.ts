/**
 * Server Action — captura de nivel de preparación (Phase 02.1 Wave 5, ADR-027).
 *
 * `captureLevelAction(prev, formData)` persiste los inputs de nivel que alimentan
 * el filtro O*NET Job Zone, registra el consentimiento Ley 1581 (Gate 2) y
 * revalida `/reporte/[sessionId]` para que el assembler muestre las ocupaciones
 * filtradas por zona.
 *
 * Autorización (ADR-027, decisión del owner 2026-06-26 "autorizar en captura, sin
 * bump"): `education_level`/`career_stage` son datos personales ESTÁNDAR (no
 * sensibles, plaintext como `country_code`). El aviso §4 del pack se muestra en
 * la captura; el envío es la autorización informada y acotada (propósito único:
 * ajustar los ejemplos de ocupación). Se audita aquí. NO se bumpea
 * `CURRENT_CONSENT_VERSIONS` (eso dispararía 412 en usuarios vivos — el guard
 * re-promptea en minor; la enmienda formal del inventario §3 a 1.1.0 va a BACKLOG
 * como tarea coordinada con su ruta de re-consentimiento).
 *
 * Patrón (cf. me/data/actions.ts): auth cookie-bound → ownership check → escritura
 * con admin → writeAudit → revalidatePath.
 *
 * Anchors:
 *  - estado/DECISIONS_LOG.md ADR-027.
 *  - implementation_packs/Onboarding_Nivel_Microcopy_es-CO_Pack_v1.0.md §2-§4.
 *  - implementation_packs/JobZones_es-CO_Pack_v1.0.md §3.
 *  - lib/onet/job-zone.ts (inferBaseZone); lib/report/assembler.ts (read path).
 */
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { writeAudit } from "@/lib/audit/writer";
import { CURRENT_CONSENT_VERSIONS } from "@/lib/consent/versions";
import { onboardingNivel as MC } from "@/lib/i18n/microcopy/es-CO/onboarding-nivel";
import { logger } from "@/lib/logger";
import {
  CAREER_STAGES,
  EDUCATION_LEVELS,
  inferBaseZone,
} from "@/lib/onet/job-zone";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAdminClient } from "@/lib/supabase/service-role";

// biome-ignore lint/suspicious/noExplicitAny: PostgREST builder type leaks (cf. me/data/actions.ts).
type AnyBuilder = any;

const CaptureSchema = z.object({
  sessionId: z.string().uuid(),
  educationLevel: z.enum(EDUCATION_LEVELS),
  careerStage: z.enum(CAREER_STAGES),
  exploreIntent: z.enum(["current", "study_more"]),
});

export interface CaptureLevelResult {
  ok: boolean;
  message?: string;
}

export async function captureLevelAction(
  _prev: CaptureLevelResult | null,
  formData: FormData,
): Promise<CaptureLevelResult> {
  const parsed = CaptureSchema.safeParse({
    sessionId: formData.get("sessionId"),
    educationLevel: formData.get("educationLevel"),
    careerStage: formData.get("careerStage"),
    exploreIntent: formData.get("exploreIntent"),
  });
  if (!parsed.success) {
    return { ok: false, message: MC.MC_NIVEL_ERROR };
  }
  const { sessionId, educationLevel, careerStage, exploreIntent } = parsed.data;

  // Auth (cookie-bound SSR client). Server Actions cannot pass a Bearer header.
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect(`/signup?sessionId=${encodeURIComponent(sessionId)}`);
  }

  const admin = getSupabaseAdminClient();

  // Ownership: the session must belong to the user (defense in depth over RLS,
  // T-01-09-01). Without this an attacker could write level data scoped to
  // another user's snapshot.
  const { data: sessionData } = await admin
    .from("assessment_session")
    .select("id, user_id")
    .eq("id", sessionId)
    .maybeSingle();
  const session = sessionData as { id: string; user_id: string | null } | null;
  if (!session || session.user_id !== user.id) {
    return { ok: false, message: MC.MC_NIVEL_ERROR };
  }

  try {
    // 1. Persist the level inputs on `user` (Ley 1581 standard data, plaintext).
    const { error: userErr } = await (admin.from("user") as AnyBuilder)
      .update({ education_level: educationLevel, career_stage: careerStage })
      .eq("id", user.id);
    if (userErr) {
      throw new Error(`user update: ${userErr.message}`);
    }

    // 2. Per-report Job Zone record on report_snapshot. target_job_zone stores
    //    the FLOOR (base zone from education); the applied filter widens the
    //    ceiling for senior/study_more (derivable from career_stage +
    //    explore_intent — the assembler recomputes the full array on render).
    //    Scoped by user_id too (defense in depth). NON-fatal: the snapshot may
    //    not exist yet if best-effort scoring failed at callback time — the
    //    user-level data is what drives the filter, so a missing snapshot only
    //    means explore_intent defaults to 'current' until the report is scored.
    const baseZone = inferBaseZone(educationLevel);
    const { error: snapErr } = await (
      admin.from("report_snapshot") as AnyBuilder
    )
      .update({ target_job_zone: baseZone, explore_intent: exploreIntent })
      .eq("session_id", sessionId)
      .eq("user_id", user.id);
    if (snapErr) {
      logger.warn(
        { session_id: sessionId, code: (snapErr as { code?: string }).code },
        "level_capture_snapshot_update_failed",
      );
    }

    // 3. Audit the capture (Gate 2). meta carries NO values (anti-PII contract,
    //    COMPL-14) — only field names, the bounded purpose, and the governing
    //    policy version under which the §4 disclosure was shown.
    await writeAudit(admin, {
      actor_id: user.id,
      actor_role: "authenticated",
      action: "level_data_captured",
      entity_type: "user",
      entity_id: user.id,
      meta: {
        fields: ["education_level", "career_stage", "explore_intent"],
        purpose: "occupation_examples",
        policy_version: CURRENT_CONSENT_VERSIONS.free,
      },
    });
  } catch (e) {
    logger.error(
      { err: e instanceof Error ? e.message : String(e) },
      "captureLevelAction_failed",
    );
    return { ok: false, message: MC.MC_NIVEL_ERROR };
  }

  // Re-render /reporte: education_level is now set → the layer-3 gate shows the
  // zone-filtered occupations instead of the capture form.
  revalidatePath(`/reporte/${sessionId}`);
  return { ok: true };
}
