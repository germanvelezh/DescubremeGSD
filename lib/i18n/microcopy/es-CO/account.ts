/**
 * Microcopy es-CO — Account pages (Plan 01-10 Task 2).
 *
 * Maps to UI-SPEC §7.7 (`/me/data`) + §7.9 (`/me/consent`).
 *
 * Placeholder text shipped by Claude Code. Cowork delivers the final
 * es-CO neutral copy pre-deploy via `[GAP-MICROCOPY-FASE1]`.
 *
 * TODO(cowork): override every value with the final es-CO neutral copy.
 */

export const account = {
  // UI-SPEC §7.7 — /me/data
  MC_ACCOUNT_HEADING: "Tu cuenta",
  MC_ACCOUNT_PERSONAL_HEADING: "Datos personales",
  MC_ACCOUNT_LABEL_EMAIL: "Email",
  MC_ACCOUNT_LABEL_NAME: "Nombre",
  MC_ACCOUNT_LABEL_COUNTRY: "Pais",
  MC_ACCOUNT_LABEL_DOB: "Fecha de nacimiento",
  MC_ACCOUNT_DOB_HELPER:
    "Si necesitas corregir tu fecha de nacimiento, escribinos.",
  MC_ACCOUNT_REPORTS_HEADING: "Tus reportes",
  MC_ACCOUNT_CONSENT_HEADING: "Tu consentimiento",
  MC_ACCOUNT_DOWNLOAD_DATA: "Descargar todos mis datos (JSON)",
  MC_ACCOUNT_DOWNLOAD_HELPER:
    "Te devolvemos un archivo con todo lo que tenemos asociado a tu cuenta.",
  MC_ACCOUNT_DELETE_LINK: "Borrar mi cuenta",
  MC_ACCOUNT_SAVE: "Guardar cambios",
  MC_ACCOUNT_SAVED: "Cambios guardados.",
  MC_ACCOUNT_SAVE_ERROR: "No pudimos guardar los cambios. Intenta de nuevo.",

  // UI-SPEC §7.9 — /me/consent
  MC_CONSENT_HEADING: "Tu consentimiento",
  MC_CONSENT_GENERAL_TITLE: "Consentimiento general",
  MC_CONSENT_SENSITIVE_TITLE: "Consentimiento para datos sensibles",
  MC_CONSENT_REVOKE_LINK: "Revocar",
  MC_CONSENT_REVOKE_BUTTON: "Revocar este consentimiento",
  MC_CONSENT_REVOKED_CHIP: "Revocado",
  MC_CONSENT_SIGNED_AT: "Firmado el",
  MC_CONSENT_WHAT_HAPPENS_TRIGGER: "Que pasa si revoco?",
  MC_CONSENT_WHAT_HAPPENS_BODY:
    "Cuando revocas, dejamos de procesar tus datos para ese alcance. Tu reporte queda archivado pero no consultable hasta que vuelvas a firmar. Para borrar todo, usa 'Borrar mi cuenta'.",
  MC_CONSENT_REVOKE_CONFIRM_HEADING: "Vas a revocar este consentimiento.",
  MC_CONSENT_REVOKE_CONFIRM_BODY:
    "Despues de esto, dejamos de procesar tus datos para este alcance.",
  MC_CONSENT_REVOKE_CONFIRM_CTA: "Revocar",
  MC_CONSENT_REVOKE_CONFIRM_CANCEL: "Cancelar",
  MC_CONSENT_REVOKE_SUCCESS: "Consentimiento revocado.",
  MC_CONSENT_REVOKE_ERROR: "No pudimos revocar. Intenta de nuevo en un momento.",

  MC_ACCOUNT_BACK: "Volver",
} as const;
