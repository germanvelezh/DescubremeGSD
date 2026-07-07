/**
 * Microcopy es-CO — Magic-link sent / resend / error states.
 *
 * Copy firmado MICROCOPY_ES-CO_SIGNOFF_v1.1 §6 (Ola 2.5, blueprint §7.3.1).
 * Tono calmo, sin disclaimers tecnicos al usuario (D2.6). es-CO tuteo: "correo"
 * y "enlace" (no "inbox"/"link"); acentos correctos (ADR-029 / CLAUDE.md §13).
 *
 * E2E lockstep (Ola 2.5): los regex de tests/e2e/magic-link.spec.ts se
 * actualizaron a este copy nuevo (acentuado). Si cambias una de estas cadenas,
 * actualiza el spec en el mismo commit:
 *   "Te enviamos el enlace"    -> /te enviamos el enlace/i   (heading enviado)
 *   "Reenviar enlace"          -> /reenviar enlace/i          (boton resend)
 *   "Listo, enviamos uno nuevo." -> /listo, enviamos uno nuevo/i (confirmacion)
 *   "Ese enlace ya expiró"     -> /ese enlace ya expiró/i     (heading expirado)
 *   "Ese enlace no es válido"  -> /ese enlace no es válido/i  (heading invalido)
 */

export const magicLink = {
	MC_MAGIC_SENT_HEADING: "Te enviamos el enlace",
	MC_MAGIC_SENT_BODY: (email: string) =>
		`Revisa tu correo ${email} y toca el enlace para entrar. Vale por un rato corto; si expira, aquí mismo te enviamos otro.`,
	MC_MAGIC_SENT_SECONDARY: "¿No llega? Mira en spam o promociones.",
	MC_MAGIC_SENT_MICRO:
		"Puedes cerrar esta pestaña: el enlace te trae de vuelta exactamente aquí.",
	MC_MAGIC_SENT_CTA_RESEND: "Reenviar enlace",
	MC_MAGIC_RESEND_CONFIRM: "Listo, enviamos uno nuevo.",
	MC_MAGIC_RESEND_ERROR:
		"No pudimos reenviar ahora. Intenta de nuevo en un momento.",
	MC_MAGIC_SENT_CTA_CHANGE: "Usar otro correo",
	MC_MAGIC_RATELIMIT_HEADING: "Espera un momento",
	MC_MAGIC_RATELIMIT_BODY:
		"Reenviamos el enlace como máximo una vez por minuto. Intenta de nuevo en un rato.",
	MC_MAGIC_EXPIRED_HEADING: "Ese enlace ya expiró",
	MC_MAGIC_EXPIRED_BODY: "Te enviamos uno nuevo si quieres.",
	MC_MAGIC_INVALID_HEADING: "Ese enlace no es válido",
	MC_MAGIC_INVALID_BODY:
		"Puede que ya se haya usado o que se haya cortado al copiarlo.",
	MC_MAGIC_CTA_NEW_LINK: "Pedir un nuevo enlace",
} as const;
