/**
 * Server Actions — /me/data (Plan 01-10 Task 2).
 *
 * `updateProfileAction(prev, formData)` applies the same whitelist contract
 * as PATCH /api/me/data: {name?, country_code?} only. Anti-fraud DOB +
 * psychometric integrity + auth-flow email are enforced server-side
 * before any DB write.
 *
 * Auth flow: Server Actions cannot pass a Bearer header, so this action
 * uses the SSR Supabase client (`getSupabaseServerClient`) which is
 * cookie-bound and resolves `auth.uid()`. If unauthenticated -> redirect
 * to `/signup`.
 *
 * Audit: same writeAudit call as the Route Handler path; this action and
 * the Route Handler are two surfaces of the same conceptual operation
 * (one cookie-bound for in-app form submit, one Bearer for programmatic
 * /api consumers).
 *
 * Anchors:
 *  - 01-PATTERNS.md row 2 (Server Action vs Route Handler).
 *  - 01-UI-SPEC.md §7.7.
 *  - lib/i18n/microcopy/es-CO/account.ts.
 */
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { writeAudit } from "@/lib/audit/writer";
import { encryptPII } from "@/lib/crypto/pii";
import { account } from "@/lib/i18n/microcopy/es-CO/account";
import { onboardingNivel } from "@/lib/i18n/microcopy/es-CO/onboarding-nivel";
import { logger } from "@/lib/logger";
import { isCareerStage, isEducationLevel } from "@/lib/onet/job-zone";
import { ANONYMOUS_COOKIE_NAME } from "@/lib/session/anonymous";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAdminClient } from "@/lib/supabase/service-role";

// biome-ignore lint/suspicious/noExplicitAny: PostgREST builder type leaks.
type AnyBuilder = any;

export interface UpdateProfileResult {
  ok: boolean;
  message: string;
}

export async function updateProfileAction(
  _prev: UpdateProfileResult | null,
  formData: FormData,
): Promise<UpdateProfileResult> {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/signup");
  }

  const name = (formData.get("name") as string | null)?.trim() ?? "";
  const country = (formData.get("country_code") as string | null)?.trim() ?? "";
  const educationRaw =
    (formData.get("education_level") as string | null)?.trim() ?? "";
  const careerRaw =
    (formData.get("career_stage") as string | null)?.trim() ?? "";

  // Re-validate against the whitelist (defense in depth over PATCH schema).
  // The form CANNOT submit dob / email / item_responses; HTML form fields
  // are bound to the allowed inputs only.
  const update: Record<string, unknown> = {};
  const admin = getSupabaseAdminClient();

  try {
    if (name.length > 0 && name.length <= 120) {
      const enc = await encryptPII(name, `user_id:${user.id}`);
      // mig 011 (Plan 01-12): persist the full EncryptedField envelope
      // verbatim. ADR-009 §9.4 closes [BUG-PII-STORAGE-PLAN-07].
      update.name_encrypted = enc;
    }
    if (/^[A-Z]{2,3}$/.test(country)) {
      update.country_code = country;
    }
    // Phase 02.1 — level fields. An empty value CLEARS the field (revocation,
    // pack §4); a valid enum sets it; anything else is ignored. Standard
    // personal data → plaintext, no encryption (unlike name).
    if (educationRaw === "" || isEducationLevel(educationRaw)) {
      update.education_level = educationRaw === "" ? null : educationRaw;
    }
    if (careerRaw === "" || isCareerStage(careerRaw)) {
      update.career_stage = careerRaw === "" ? null : careerRaw;
    }

    if (Object.keys(update).length === 0) {
      return { ok: true, message: account.MC_ACCOUNT_SAVED };
    }

    // §4 revocation: detect a set→clear transition of BOTH level fields so the
    // pack confirmation ("tus datos de nivel se eliminaron…") only shows on a
    // genuine removal, not on a name/country edit that leaves level untouched.
    const clearingLevel =
      update.education_level === null && update.career_stage === null;
    let wasLevelSet = false;
    if (clearingLevel) {
      const { data: cur } = await (admin.from("user") as AnyBuilder)
        .select("education_level, career_stage")
        .eq("id", user.id)
        .maybeSingle();
      const c = cur as {
        education_level: string | null;
        career_stage: string | null;
      } | null;
      wasLevelSet = Boolean(c?.education_level || c?.career_stage);
    }

    const { error } = await (admin.from("user") as AnyBuilder)
      .update(update)
      .eq("id", user.id);
    if (error) {
      logger.error(
        { code: error.code, message: error.message },
        "updateProfileAction_failed",
      );
      return { ok: false, message: account.MC_ACCOUNT_SAVE_ERROR };
    }

    await writeAudit(admin, {
      actor_id: user.id,
      actor_role: "authenticated",
      action: "user_data_patch",
      entity_type: "user",
      entity_id: user.id,
      meta: { fields: Object.keys(update) },
    });

    return {
      ok: true,
      message:
        clearingLevel && wasLevelSet
          ? onboardingNivel.MC_NIVEL_REVOKE_CONFIRM
          : account.MC_ACCOUNT_SAVED,
    };
  } catch (e) {
    logger.error(
      { err: e instanceof Error ? e.message : String(e) },
      "updateProfileAction_exception",
    );
    return { ok: false, message: account.MC_ACCOUNT_SAVE_ERROR };
  }
}

/**
 * `logoutAction` — cierra la sesion del usuario ([GAP-SIN-LOGOUT-SESION-PERSISTENTE]).
 *
 * Antes de esto la app no tenia forma de cerrar sesion: `signOut` solo existia
 * en ramas de error del callback y despues de borrar la cuenta, o sea nunca como
 * accion del usuario. La sesion del magic link persistia.
 *
 * Borra DOS cosas, no una (decision de German, 2026-07-30):
 *
 *  1. La sesion de Supabase (`auth.signOut()`).
 *  2. La cookie `anonymous_session_id`, que es el UNICO identificador provisto
 *     por el cliente para las respuestas de test en curso (`anonymous.ts:25`).
 *     Sin borrarla, en un dispositivo compartido el siguiente usuario heredaria
 *     la sesion anonima por hasta 7 dias y el logout protegeria menos de lo que
 *     aparenta. El costo aceptado: un usuario legitimo que vuelve pierde el
 *     progreso anonimo que aun no esta asociado a su cuenta.
 *
 * Un Server Action SI puede mutar cookies (a diferencia de un Server Component,
 * que es la razon por la que solo el middleware las acuña — ver middleware.ts).
 * El middleware las re-acuña con un nanoid NUEVO y solo en rutas `/test/`, asi
 * que redirigir a `/` no resucita la sesion previa.
 *
 * Sin `revalidatePath`: el redirect ya remonta el arbol, y montar un
 * revalidate junto a un cambio de UI fue la causa del defecto de #64.
 */
export async function logoutAction(): Promise<void> {
  const supabase = await getSupabaseServerClient();

  // La cookie se setea con path "/" en middleware.ts:55; el delete por defecto
  // usa ese mismo path, asi que borra de verdad. Si el middleware cambiara el
  // path, este delete se volveria un no-op silencioso.
  const cookieStore = await cookies();
  cookieStore.delete(ANONYMOUS_COOKIE_NAME);

  const { error } = await supabase.auth.signOut();
  if (error) {
    logger.error({ code: error.code }, "logout_signout_failed");
  }

  // redirect() lanza: cualquier cosa despues de esta linea no corre.
  redirect("/");
}
