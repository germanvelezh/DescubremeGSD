/**
 * Microcopy es-CO — Signup form (UI-SPEC §7.4 + COMPL-01).
 *
 * Ola 1.4 (HANDOFF_UI §3): registro reskin. The screen framing comes from
 * MICROCOPY §2 (Registro): eyebrow / heading / body / CTA / privacy line. The
 * field LABELS keep their Fase-1 values because they are E2E-pinned AND the DOB
 * field is the real age-verification mechanism (Ley 1581 menores) — §2's simpler
 * "18+ checkbox" is NOT adopted (it would weaken age-gating). §2's label "Tu
 * correo" is likewise NOT adopted (pin "Tu email").
 *
 * MC_SIGNUP_AGE_BLOCK = verbatim D2.4 (mensaje educativo no clinico).
 *
 * Pin E2E (no acentuar / no cambiar):
 *   "Tu email" -> /tu email/i ; "Fecha de nacimiento" -> /fecha de nacimiento/i ;
 *   "solo para personas mayores de 18" -> /solo para personas mayores de 18/i.
 */

export const signup = {
  MC_SIGNUP_EYEBROW: "Un solo paso",
  MC_SIGNUP_HEADING: "Crea tu cuenta sin contraseñas",
  MC_SIGNUP_BODY:
    "Te enviamos un enlace para entrar. Así guardamos tu avance y puedes volver cuando quieras, desde cualquier dispositivo.",
  MC_SIGNUP_CTA: "Enviarme el enlace",
  MC_SIGNUP_PRIVACY_INLINE:
    "Sin contraseñas, sin spam. Usamos tu correo solo para entrar y avisarte de tu perfil.",
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
