/**
 * Microcopy es-CO — Account pages (/me/data + /me/consent).
 *
 * Override final Cowork (UX Writer) — GAP-MICROCOPY-FASE1.
 * Tono operacional, directo, sin urgencia. Derechos Ley 1581 claros.
 *
 * Pin E2E (no acentuar / no cambiar — regex ASCII en account-delete spec):
 *   "Tu cuenta" -> /tu cuenta/i ; "Tu consentimiento" -> /tu consentimiento/i ;
 *   "Si necesitas corregir tu fecha de nacimiento" -> /si necesitas corregir.../i ;
 *   "Descargar todos mis datos" -> /descargar todos mis datos/i ;
 *   "Revocar" -> /^revocar$/i ; "Revocar este consentimiento" -> /revocar este consentimiento/i ;
 *   "Consentimiento revocado" -> /consentimiento revocado/i ;
 *   "Borrar mi cuenta" -> /borrar mi cuenta/i.
 *
 * Anchors: 01-UI-SPEC.md §7.7 + §7.9.
 */

export const account = {
  // UI-SPEC §7.7 — /me/data
  MC_ACCOUNT_HEADING: "Tu cuenta",
  MC_ACCOUNT_PERSONAL_HEADING: "Datos personales",
  MC_ACCOUNT_LABEL_EMAIL: "Email",
  MC_ACCOUNT_LABEL_NAME: "Nombre",
  MC_ACCOUNT_LABEL_COUNTRY: "País",
  // Phase 02.1 — nivel de preparación editable (revocabilidad §4 del pack).
  MC_ACCOUNT_LABEL_EDUCATION: "Nivel de estudios",
  MC_ACCOUNT_LABEL_CAREER: "Experiencia laboral",
  MC_ACCOUNT_LEVEL_NONE: "Sin especificar",
  MC_ACCOUNT_LEVEL_HELPER:
    "Ajustan los ejemplos de ocupación de tu reporte. Si los dejas en blanco, las recomendaciones se basan solo en tus intereses.",
  MC_ACCOUNT_LABEL_DOB: "Fecha de nacimiento",
  MC_ACCOUNT_DOB_HELPER:
    "Si necesitas corregir tu fecha de nacimiento, escribinos y lo resolvemos.",
  MC_ACCOUNT_REPORTS_HEADING: "Tus reportes",
  MC_ACCOUNT_CONSENT_HEADING: "Tu consentimiento",
  MC_ACCOUNT_DOWNLOAD_DATA: "Descargar todos mis datos (JSON)",
  MC_ACCOUNT_DOWNLOAD_HELPER:
    "Te devolvemos un archivo con todo lo que tenemos asociado a tu cuenta.",
  MC_ACCOUNT_DELETE_LINK: "Borrar mi cuenta",
  MC_ACCOUNT_SAVE: "Guardar cambios",
  MC_ACCOUNT_SAVED: "Cambios guardados.",
  MC_ACCOUNT_SAVE_ERROR: "No pudimos guardar los cambios. Intentá de nuevo.",

  // UI-SPEC §7.9 — /me/consent
  MC_CONSENT_HEADING: "Tu consentimiento",
  MC_CONSENT_GENERAL_TITLE: "Consentimiento general",
  MC_CONSENT_SENSITIVE_TITLE: "Consentimiento para datos sensibles",
  MC_CONSENT_REVOKE_LINK: "Revocar",
  MC_CONSENT_REVOKE_BUTTON: "Revocar este consentimiento",
  MC_CONSENT_REVOKED_CHIP: "Revocado",
  MC_CONSENT_SIGNED_AT: "Firmado el",
  MC_CONSENT_WHAT_HAPPENS_TRIGGER: "¿Qué pasa si revoco?",
  MC_CONSENT_WHAT_HAPPENS_BODY:
    "Cuando revocás, dejamos de tratar tus datos para ese alcance. Tu reporte queda archivado, pero no se puede consultar hasta que vuelvas a firmar. Para borrar todo, usá 'Borrar mi cuenta'.",
  MC_CONSENT_REVOKE_CONFIRM_HEADING: "Vas a revocar este consentimiento.",
  MC_CONSENT_REVOKE_CONFIRM_BODY:
    "Después de esto, dejamos de tratar tus datos para este alcance.",
  MC_CONSENT_REVOKE_CONFIRM_CTA: "Revocar",
  MC_CONSENT_REVOKE_CONFIRM_CANCEL: "Cancelar",
  MC_CONSENT_REVOKE_SUCCESS: "Consentimiento revocado.",
  MC_CONSENT_REVOKE_ERROR:
    "No pudimos revocar. Intentá de nuevo en un momento.",

  MC_ACCOUNT_BACK: "Volver",
} as const;
