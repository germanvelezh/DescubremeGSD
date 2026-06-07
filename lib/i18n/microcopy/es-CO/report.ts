/**
 * Microcopy es-CO — Reporte O*NET completo (UI-SPEC §7.6).
 *
 * Placeholder text shipped by Claude Code. Cowork delivers the final
 * es-CO neutral version pre-deploy via [GAP-MICROCOPY-FASE1].
 *
 * Reglas (ver UI-SPEC §7.6 microcopy registry table y CONTEXT D3.3-D3.12
 * para texto verbatim):
 *  - D3.3: encabezado de ocupaciones en tono no-determinista.
 *  - D3.9: titulo del reporte.
 *  - D3.10: ficha tecnica con "NO mide / NO predice / NO define" explicit.
 *  - D3.11: NFR-27 long disclaimer.
 *  - D3.12: NFR-27 chip footer.
 *
 * Anchors:
 *   - 01-UI-SPEC.md §7.6 microcopy registry table.
 *   - 01-CONTEXT.md D3.3, D3.9-D3.12.
 */

export const report = {
  MC_REPORT_TITLE: "Tu perfil de intereses",
  MC_REPORT_SECTION2_HEADING: "Que dice esto de ti",
  MC_REPORT_OCCUPATIONS_HEADING:
    "Areas donde gente con tu perfil suele encontrar engagement",
  MC_REPORT_OCCUPATIONS_EXPAND: "Ver mas ocupaciones",
  MC_REPORT_FICHA_TRIGGER: "Ver ficha tecnica del instrumento",
  MC_REPORT_FICHA_TIME: "60 items, alrededor de 10-12 minutos",
  MC_REPORT_FICHA_WHAT:
    "Que mide: preferencias por tipos de actividades laborales (RIASEC: Realistic, Investigative, Artistic, Social, Enterprising, Conventional).",
  MC_REPORT_FICHA_LIMITS:
    "NO mide habilidades. NO predice exito laboral. NO define una carrera unica.",
  MC_REPORT_NFR27_LONG:
    "Este reporte es una mirada a tus preferencias hoy. No predice tu futuro ni define tu carrera. Tu vida es mas rica que cualquier perfil. Los instrumentos como este son herramientas de exploracion. Si en algun momento sentis malestar emocional, hablar con un profesional de salud mental siempre es una buena opcion.",
  MC_REPORT_NFR27_CHIP: "Este reporte no es clinico",
  MC_REPORT_NFR27_CHIP_LINK: "Mas informacion",
  MC_REPORT_SCORES_LABEL: "Puntajes por dimension",
  MC_REPORT_BAREMO_NOTE:
    "Tu perfil se interpreta de forma intra-perfil (relativa a tus propias respuestas). El baremo Colombia esta en validacion.",
} as const;

export type ReportMicrocopyKey = keyof typeof report;
