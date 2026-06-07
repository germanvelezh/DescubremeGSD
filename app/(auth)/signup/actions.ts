/**
 * `signupAction` — Server Action for "Tu reporte esta listo" (Plan 01-07 Task 3).
 *
 * Validates the form payload server-side (Zod), enforces 18+ age (D2.4
 * server-only authoritative), and requests a magic link via Supabase Auth
 * with `signInWithOtp({ email, options: { data, emailRedirectTo: '/auth/callback' } })`.
 *
 * The DOB and consent booleans + country are passed in `options.data` so
 * the callback Route Handler can:
 *  1. Encrypt DOB with AAD=`user_id:<user.id>` (the user.id is only known
 *     after the magic link click — DOB is therefore plaintext in
 *     `auth.users.user_metadata` during the 1h magic-link window).
 *     T-01-07-03 in the threat register accepts this risk for Phase 1.
 *  2. INSERT the public.user row with the encrypted DOB + country.
 *  3. INSERT the two consent rows (general + sensitive) with D1.6 metadata.
 *  4. Call `claimAnonymousSession(user.id)` (FOUND-08).
 *
 * Per PATTERNS row 2 LOCKED: signup form is a Server Action (not a Route
 * Handler), and the consent grant happens inline in the callback (not via
 * a separate POST /api/consent/grant — that route exists as a documented
 * stub for Plan 01-09 revocation flow only).
 *
 * Anchors:
 *  - 01-PATTERNS.md row 2 + row 7 (DOB server-only).
 *  - 01-UI-SPEC.md §7.4 (form fields).
 *  - 01-CONTEXT.md D2.4 (server-only age check), D1.6 (consent metadata).
 *  - 01-RESEARCH.md §1 (magic-link UX).
 */
"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { signup as signupCopy } from "@/lib/i18n/microcopy/es-CO/signup";
import { logger } from "@/lib/logger";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const SignupSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "DOB must be ISO YYYY-MM-DD"),
  country: z.string().trim().min(2).max(3).default("CO"),
  consentGeneral: z.boolean(),
  consentSensitive: z.boolean(),
  // sessionId is optional — present only if user took the test as anonymous.
  sessionId: z.string().uuid().optional(),
});

export interface SignupActionResult {
  error?: string;
  field?: "email" | "dob" | "country" | "consent";
}

/** Returns true if the date-of-birth ISO string places the person at 18+ as of today. */
export function isAtLeast18(dobIso: string, today: Date = new Date()): boolean {
  const dob = new Date(`${dobIso}T00:00:00Z`);
  if (Number.isNaN(dob.getTime())) return false;
  const eighteenthBirthday = new Date(
    Date.UTC(
      dob.getUTCFullYear() + 18,
      dob.getUTCMonth(),
      dob.getUTCDate(),
    ),
  );
  return today.getTime() >= eighteenthBirthday.getTime();
}

export async function signupAction(
  _prev: SignupActionResult | null,
  formData: FormData,
): Promise<SignupActionResult> {
  // Parse + validate.
  const parsed = SignupSchema.safeParse({
    email: formData.get("email"),
    dob: formData.get("dob"),
    country: formData.get("country") ?? "CO",
    consentGeneral: formData.get("consentGeneral") === "on",
    consentSensitive: formData.get("consentSensitive") === "on",
    sessionId: formData.get("sessionId") || undefined,
  });

  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return {
      error: first?.message ?? signupCopy.MC_SIGNUP_GENERIC_ERROR,
      field:
        first?.path[0] === "email"
          ? "email"
          : first?.path[0] === "dob"
            ? "dob"
            : undefined,
    };
  }

  const { email, dob, country, consentGeneral, consentSensitive, sessionId } =
    parsed.data;

  // Server-only age check (D2.4).
  if (!isAtLeast18(dob)) {
    return { error: signupCopy.MC_SIGNUP_AGE_BLOCK, field: "dob" };
  }

  // Both consents required (defensa profundidad over client disable).
  if (!consentGeneral || !consentSensitive) {
    return {
      error: signupCopy.MC_SIGNUP_BOTH_CONSENTS_REQUIRED,
      field: "consent",
    };
  }

  // Trigger magic link. Pass consent + DOB + country + session id in
  // user_metadata so the callback can complete the signup atomically.
  // T-01-07-03 accepted: DOB lives plaintext in user_metadata for up
  // to 1h until the callback encrypts it.
  const supabase = await getSupabaseServerClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL ?? ""}/auth/callback`,
      data: {
        dob_pending: dob,
        country_pending: country,
        consent_general_pending: consentGeneral,
        consent_sensitive_pending: consentSensitive,
        session_id_pending: sessionId ?? null,
      },
    },
  });

  if (error) {
    logger.error(
      { code: error.code, message: error.message },
      "signupAction_magic_link_failed",
    );
    return { error: signupCopy.MC_SIGNUP_GENERIC_ERROR };
  }

  redirect(`/magic-link/sent?email=${encodeURIComponent(email)}`);
}
