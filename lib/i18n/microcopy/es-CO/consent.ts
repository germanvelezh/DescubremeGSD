/**
 * Microcopy es-CO — Consent dual checkbox + subprocesadores acordeon
 * (UI-SPEC §6.3 + §7.4 + D1.2).
 *
 * Placeholder text shipped by Claude Code. Cowork delivers the final
 * es-CO neutral copy pre-deploy via `[GAP-MICROCOPY-FASE1]` +
 * `[GAP-CONSENT-TEXT-V0.1]` (the markdown body in `lib/consent/text/`
 * is also reviewed by Cowork in the same pass).
 *
 * TODO(cowork): override every value with the final es-CO neutral copy.
 */

export const consentCopy = {
  MC_CONSENT_GENERAL_LABEL:
    "Acepto el tratamiento de mis datos personales segun la Politica de Privacidad de DescubreMe (Ley 1581 Colombia).",
  MC_CONSENT_GENERAL_HELPER:
    "Necesitamos esto para crear tu cuenta y guardar tu reporte.",
  MC_CONSENT_SENSITIVE_LABEL:
    "Acepto el tratamiento de mis datos sensibles psicometricos (Ley 1581 Art. 5 y 6), incluyendo el almacenamiento de mis respuestas y la generacion de reportes a partir de ellas.",
  MC_CONSENT_SENSITIVE_HELPER:
    "Tus respuestas se cifran y nunca se comparten con terceros sin tu consentimiento expreso.",
  MC_CONSENT_SUBPROCESSORS_TRIGGER:
    "Ver detalles de transferencia internacional y subprocesadores",
  MC_CONSENT_SUBPROCESSORS_LIST: [
    "Supabase (us-east-1, Estados Unidos) — base de datos y autenticacion.",
    "Vercel (us-east-1, Estados Unidos) — hosting de la aplicacion web.",
    "AWS KMS (us-east-1, Estados Unidos) — gestion de claves de cifrado para tus datos sensibles.",
    "Resend (Estados Unidos) — envio del link de acceso por email.",
    "Upstash (us-east-1, Estados Unidos) — limites de envio del link de acceso para evitar abuso.",
  ],
  MC_CONSENT_LEGAL_LINK: "Leer el texto completo",
} as const;
