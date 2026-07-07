/**
 * Microcopy es-CO — Magic-link sent / resend / error states (UI-SPEC §7.5).
 *
 * Override final Cowork (UX Writer) — GAP-MICROCOPY-FASE1.
 * Tono calmo, sin disclaimers tecnicos al usuario (D2.6).
 *
 * Pin E2E (no acentuar / no cambiar — los regex de los tests son ASCII):
 *   "Revisa tu inbox"      -> /revisa tu inbox/i
 *   "Reenviar link"        -> /reenviar link/i
 *   "Podes reenviar en Xs" -> /podes reenviar en \d+s/i   (NO "Podés")
 *   "Tu link expiro"       -> /tu link expiro/i           (NO "expiró")
 *   "El link no es valido" -> /el link no es valido/i      (NO "válido")
 */

export const magicLink = {
  MC_MAGIC_SENT_HEADING: "Revisa tu inbox",
  MC_MAGIC_SENT_BODY: (email: string) =>
    `Te enviamos un link a ${email}. Si no llega en un minuto, revisa la carpeta de spam.`,
  MC_MAGIC_SENT_CTA_RESEND: "Reenviar link",
  MC_MAGIC_SENT_CTA_CHANGE: "Usar otro email",
  // Pin E2E: dejar "Podes" en ASCII (regex /podes reenviar en \d+s/i).
  MC_MAGIC_COOLDOWN: (seconds: number) => `Podes reenviar en ${seconds}s.`,
  MC_MAGIC_RATELIMIT_HEADING: "Espera un momento",
  MC_MAGIC_RATELIMIT_BODY:
    "Reenviamos el link como máximo una vez por minuto. Intenta de nuevo en un rato.",
  // Pin E2E: dejar "expiro" en ASCII (regex /tu link expiro/i).
  MC_MAGIC_EXPIRED_HEADING: "Tu link expiro",
  MC_MAGIC_EXPIRED_BODY: "Pide uno nuevo y te lo enviamos al instante.",
  // Pin E2E: dejar "valido" en ASCII (regex /el link no es valido/i).
  MC_MAGIC_INVALID_HEADING: "El link no es valido",
  MC_MAGIC_INVALID_BODY:
    "Puede que ya se haya usado o que se haya cortado al copiarlo.",
  MC_MAGIC_CTA_NEW_LINK: "Pedir un nuevo link",
} as const;
