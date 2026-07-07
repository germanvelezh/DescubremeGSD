/**
 * Microcopy es-CO — Signup form (UI-SPEC §7.4 + COMPL-01).
 *
 * Override final Cowork (UX Writer) — GAP-MICROCOPY-FASE1.
 * MC_SIGNUP_AGE_BLOCK = verbatim D2.4 (mensaje educativo no clinico).
 *
 * Pin E2E (no acentuar / no cambiar):
 *   "Tu email" -> /tu email/i ; "Fecha de nacimiento" -> /fecha de nacimiento/i ;
 *   "solo para personas mayores de 18" -> /solo para personas mayores de 18/i.
 */

export const signup = {
  MC_SIGNUP_LABEL_EMAIL: "Tu email",
  MC_SIGNUP_LABEL_DOB: "Fecha de nacimiento",
  MC_SIGNUP_LABEL_GEO: "País",
  MC_SIGNUP_HELPER_EMAIL:
    "Te enviamos un link para entrar. No usamos contraseña.",
  MC_SIGNUP_HELPER_DOB: "Lo usamos para confirmar que tienes 18 años o más.",
  MC_SIGNUP_HELPER_GEO:
    "Lo usamos para mostrarte recursos locales si alguna vez los necesitas.",
  // D2.4 verbatim age-block copy (educativo, no clinico).
  MC_SIGNUP_AGE_BLOCK:
    "Este servicio es solo para personas mayores de 18 años. Si te interesa explorar quién eres, hay recursos diferentes pensados para tu edad.",
  MC_SIGNUP_BOTH_CONSENTS_REQUIRED:
    "Para continuar necesitamos que aceptes las dos autorizaciones.",
  MC_SIGNUP_GENERIC_ERROR:
    "No pudimos procesar tu solicitud. Intenta de nuevo en un momento.",
} as const;
