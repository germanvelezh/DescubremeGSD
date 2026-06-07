/**
 * Microcopy es-CO — Signup form (UI-SPEC §7.4).
 *
 * Placeholder text shipped by Claude Code. Cowork delivers the final
 * es-CO neutral copy pre-deploy via `[GAP-MICROCOPY-FASE1]`.
 *
 * TODO(cowork): override every value with the final es-CO neutral copy.
 */

export const signup = {
  MC_SIGNUP_LABEL_EMAIL: "Tu email",
  MC_SIGNUP_LABEL_DOB: "Fecha de nacimiento",
  MC_SIGNUP_LABEL_GEO: "Pais",
  MC_SIGNUP_HELPER_EMAIL: "Te mandamos un link para entrar. No usamos contrasena.",
  MC_SIGNUP_HELPER_DOB: "Necesitamos verificar que tienes 18 anos o mas.",
  MC_SIGNUP_HELPER_GEO: "Lo usamos para mostrarte recursos locales.",
  // D2.4 verbatim age-block copy
  MC_SIGNUP_AGE_BLOCK:
    "Este servicio es solo para personas mayores de 18 anos. Si te interesa explorar quien sos a tu edad, hay recursos diferentes pensados para vos.",
  MC_SIGNUP_BOTH_CONSENTS_REQUIRED:
    "Para continuar necesitamos que aceptes ambas autorizaciones.",
  MC_SIGNUP_GENERIC_ERROR:
    "No pudimos procesar tu solicitud. Intenta de nuevo en un momento.",
} as const;
