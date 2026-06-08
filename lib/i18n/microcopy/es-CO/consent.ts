/**
 * Microcopy es-CO — Consent dual checkbox + subprocesadores acordeon
 * (UI-SPEC §6.3 + §7.4 + D1.2).
 *
 * Override final Cowork (UX Writer) — GAP-MICROCOPY-FASE1.
 * Dos checkboxes SEPARADOS (general + datos sensibles), sin maestro,
 * sin pre-marcar. Lenguaje claro, alineado a Ley 1581 de 2012.
 * El cuerpo legal completo vive en lib/consent/text/ (GAP-CONSENT-TEXT-V0.1).
 */

export const consentCopy = {
  MC_CONSENT_GENERAL_LABEL:
    "Autorizo el tratamiento de mis datos personales según la Política de Privacidad de DescubreMe (Ley 1581 de 2012, Colombia).",
  MC_CONSENT_GENERAL_HELPER:
    "Lo necesitamos para crear tu cuenta y guardar tu reporte.",
  MC_CONSENT_SENSITIVE_LABEL:
    "Autorizo el tratamiento de mis datos sensibles de carácter psicométrico (Ley 1581, arts. 5 y 6): el almacenamiento de mis respuestas y la generación de mi reporte a partir de ellas.",
  MC_CONSENT_SENSITIVE_HELPER:
    "Tus respuestas se cifran y no se comparten con terceros sin tu autorización expresa.",
  MC_CONSENT_SUBPROCESSORS_TRIGGER:
    "Ver detalle de la transferencia internacional y los subprocesadores",
  MC_CONSENT_SUBPROCESSORS_LIST: [
    "Supabase (us-east-1, Estados Unidos): base de datos y autenticación.",
    "Vercel (us-east-1, Estados Unidos): hosting de la aplicación web.",
    "AWS KMS (us-east-1, Estados Unidos): gestión de las claves de cifrado de tus datos sensibles.",
    "Resend (Estados Unidos): envío del link de acceso por email.",
    "Upstash (us-east-1, Estados Unidos): control de envíos del link de acceso para evitar abuso.",
    "Sentry (Estados Unidos): monitoreo de errores técnicos; elimina tus datos personales antes de registrar cualquier error.",
  ],
  MC_CONSENT_LEGAL_LINK: "Leer el texto completo",
} as const;
