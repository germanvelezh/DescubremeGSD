/**
 * Microcopy es-CO — Magic-link sent / resend / error states (UI-SPEC §7.5).
 *
 * Placeholder text shipped by Claude Code. Cowork delivers the final
 * es-CO neutral copy pre-deploy via `[GAP-MICROCOPY-FASE1]`.
 *
 * TODO(cowork): override every value with the final es-CO neutral copy.
 */

export const magicLink = {
  MC_MAGIC_SENT_HEADING: "Revisa tu inbox",
  MC_MAGIC_SENT_BODY: (email: string) =>
    `Mandamos un link a ${email}. Si no llega en un minuto, revisa spam.`,
  MC_MAGIC_SENT_CTA_RESEND: "Reenviar link",
  MC_MAGIC_SENT_CTA_CHANGE: "Use otro email",
  MC_MAGIC_COOLDOWN: (seconds: number) =>
    `Podes reenviar en ${seconds}s.`,
  MC_MAGIC_RATELIMIT_HEADING: "Espera un momento",
  MC_MAGIC_RATELIMIT_BODY:
    "Reenviamos un link cada minuto. Intenta de nuevo mas tarde.",
  MC_MAGIC_EXPIRED_HEADING: "Tu link expiro",
  MC_MAGIC_EXPIRED_BODY: "Pedi un nuevo link.",
  MC_MAGIC_INVALID_HEADING: "El link no es valido",
  MC_MAGIC_INVALID_BODY:
    "Quizas se uso ya, o se corto al copiar.",
  MC_MAGIC_CTA_NEW_LINK: "Pedir nuevo link",
} as const;
