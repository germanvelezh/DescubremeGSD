/**
 * Microcopy es-CO — Reporte O*NET completo (UI-SPEC §7.6).
 *
 * Override final Cowork (UX Writer) — GAP-MICROCOPY-FASE1.
 * Anti-determinismo en todo el copy (D3.11): "tendés a", "soles", "suele",
 * "puede sugerir". Evitar lenguaje determinista de carrera o etiqueta fija.
 *
 * VERBATIM (no tocar — acceptance gate D3.3/D3.10/D3.12 + ASCII pin):
 *   MC_REPORT_OCCUPATIONS_HEADING -> D3.3
 *   MC_REPORT_FICHA_LIMITS        -> D3.10 (lookbehind permite "NO predice")
 *   MC_REPORT_NFR27_CHIP          -> D3.12  (/Este reporte no es clinico/i)
 *   "ficha tecnica" en TRIGGER    -> /ficha tecnica/i (NO "técnica")
 *
 * Anchors:
 *   - 01-UI-SPEC.md §7.6 microcopy registry table.
 *   - 01-CONTEXT.md D3.3, D3.9-D3.12.
 */

export const report = {
  MC_REPORT_TITLE: "Tu perfil de intereses",
  MC_REPORT_SECTION2_HEADING: "Qué sugiere esto sobre vos",
  MC_REPORT_OCCUPATIONS_HEADING:
    "Areas donde gente con tu perfil suele encontrar engagement",
  MC_REPORT_OCCUPATIONS_EXPAND: "Ver más ocupaciones",
  MC_REPORT_FICHA_TRIGGER: "Ver ficha tecnica del instrumento",
  MC_REPORT_FICHA_TIME: "60 ítems, alrededor de 10-12 minutos",
  MC_REPORT_FICHA_WHAT:
    "Qué mide: tus preferencias por distintos tipos de actividades laborales (intereses RIASEC: Realistic, Investigative, Artistic, Social, Enterprising, Conventional).",
  MC_REPORT_FICHA_LIMITS:
    "NO mide habilidades. NO predice exito laboral. NO define una carrera unica.",
  MC_REPORT_NFR27_LONG:
    "Este reporte es una mirada a tus preferencias de hoy, no una sentencia sobre tu futuro. No predice tu futuro ni define tu carrera: tu vida es más rica que cualquier perfil. Instrumentos como este sirven para explorarte, no para encasillarte. Y si en algún momento sentís un malestar que te cueste manejar, hablar con un profesional de salud mental es siempre una buena opción.",
  MC_REPORT_NFR27_CHIP: "Este reporte no es clinico",
  MC_REPORT_NFR27_CHIP_LINK: "Más información",
  MC_REPORT_SCORES_LABEL: "Puntajes por dimensión",
  MC_REPORT_SCORES_INTRO:
    "Estas bandas comparan tus seis intereses entre sí, no con otras personas.",
  MC_REPORT_BAREMO_NOTE:
    "ALTO significa que ese interés es de los más fuertes dentro de tu propio perfil, no que sea más alto que el de otras personas. No mostramos percentiles porque todavía no existe una tabla de referencia (baremo) validada para Colombia con este instrumento, y preferimos no mostrar comparaciones que no podemos respaldar.",
  // ARIA labels (user-facing — leidos por lectores de pantalla).
  MC_REPORT_HEXAGON_SCORES_ARIA: "Puntajes numéricos por dimensión",
  MC_REPORT_CONTENTION_LANDMARK_ARIA: "Recursos de ayuda",
  // Phase 2 — ValueCircle (visual_type='circumplex', UI-SPEC §6.2 / §8.4).
  MC_VALUECIRCLE_TITLE: "Qué pesa más para vos",
  MC_VALUECIRCLE_DESC_INTRO:
    "Tus prioridades de valores, relativas a tu propio perfil.",
  MC_VALUECIRCLE_RELATIVE_NOTE:
    "Estas prioridades son relativas dentro de tu propio perfil: muestran qué pesa más para vos, no se comparan con otras personas.",
  MC_VALUECIRCLE_TABLE_CAPTION: "Prioridades relativas de valores",
  // Phase 2 — BarsWithBands (visual_type='bars', UI-SPEC §6.1).
  MC_BARS_TABLE_CAPTION: "Puntajes por dimensión",
  // Phase 2 — Quality flag note (UI-SPEC §6.8, D-F2.1).
  MC_QUALITY_FLAG_NOTE:
    "Notamos un patrón muy parejo en tus respuestas. Tu reporte sigue disponible; si querés, podés rehacer este test con calma para afinarlo.",
} as const;

export type ReportMicrocopyKey = keyof typeof report;
