/**
 * Microcopy es-CO — Reporte O*NET completo (UI-SPEC §7.6).
 *
 * Override final Cowork (UX Writer) — GAP-MICROCOPY-FASE1.
 * Anti-determinismo en todo el copy (D3.11): "tiende a", "suele",
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
  // Conector del titulo del reporte. La palabra de categoria (personalidad /
  // intereses / valores / bienestar) la aporta el instrumento via
  // instrument-labels ([GAP-REPORT-INTERESES-MISLABEL]) — antes era fijo
  // "Tu perfil de intereses" para los 4.
  MC_REPORT_TITLE_PREFIX: "Tu perfil de",
  MC_REPORT_SECTION2_HEADING: "Qué sugiere esto sobre ti",
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
    "Este reporte es una mirada a tus preferencias de hoy, no una sentencia sobre tu futuro. No predice tu futuro ni define tu carrera: tu vida es más rica que cualquier perfil. Instrumentos como este sirven para explorarte, no para encasillarte. Y si en algún momento sientes un malestar que te cueste manejar, hablar con un profesional de salud mental es siempre una buena opción.",
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
  MC_VALUECIRCLE_TITLE: "Qué pesa más para ti",
  MC_VALUECIRCLE_DESC_INTRO:
    "Tus prioridades de valores, relativas a tu propio perfil.",
  MC_VALUECIRCLE_RELATIVE_NOTE:
    "Estas prioridades son relativas dentro de tu propio perfil: muestran qué pesa más para ti, no se comparan con otras personas.",
  // Anti-determinismo del circumplejo (ADR-034): las 4 direcciones siempre se
  // dibujan con radio real; la mas corta pesa menos, no falta.
  MC_VALUECIRCLE_NO_ABSENCE_NOTE:
    "Tienes las cuatro direcciones; ninguna está en cero. Si una se ve más corta, pesa un poco menos para ti, no que te falte.",
  MC_VALUECIRCLE_TABLE_CAPTION: "Prioridades relativas de valores",
  // Phase 2 — BarsWithBands (visual_type='bars', UI-SPEC §6.1).
  MC_BARS_TABLE_CAPTION: "Puntajes por dimensión",
  // Pase visual de barras (ADR-034): el largo sigue a la banda (3 largos
  // discretos), no a un puntaje absoluto. Regla compartida bajo las barras.
  MC_BARS_LENGTH_NOTE:
    "El largo de la barra sigue a la banda; no es un puntaje absoluto ni un ranking.",
  // Nota de baremo para visuales genericos. MC_REPORT_BAREMO_NOTE abre con
  // "ALTO significa que ese interes...", que es cierto en el reporte O*NET y
  // falso bajo BFI-2-S (rasgos) y PERMA (bienestar): le decia al usuario que
  // su nivel de Soledad era un "interes". Aqui queda SOLO la parte universal
  // —verbatim de la segunda frase de esa nota—; el significado de la banda ya
  // lo explica MC_BARS_INTRO_* por instrumento.
  MC_BARS_BAREMO_NOTE:
    "No mostramos percentiles porque todavía no existe una tabla de referencia (baremo) validada para Colombia con este instrumento, y preferimos no mostrar comparaciones que no podemos respaldar.",
  // Intro por instrumento, ruteado por RevealFamily.barsIntroKey (FOUND-05-safe:
  // el componente es agnostico; el assembler resuelve la clave).
  MC_BARS_INTRO_BFI:
    "La banda —Bajo, Medio o Alto— te muestra qué tanto pesa cada rasgo dentro de tu propio perfil, no frente a otras personas. Ningún rasgo es mejor que otro.",
  MC_BARS_INTRO_PERMA:
    "La banda —Bajo, Medio o Alto— refleja cómo te sientes en este momento dentro de tu propio perfil, no una etiqueta sobre ti ni una comparación con otras personas, y cambia con el tiempo. En Emociones difíciles y Soledad, \"Alto\" quiere decir que ahora hay más de eso, no un defecto tuyo.",
  // Phase 2 — Quality flag note (UI-SPEC §6.8, D-F2.1).
  MC_QUALITY_FLAG_NOTE:
    "Notamos un patrón muy parejo en tus respuestas. Tu reporte sigue disponible; si quieres, puedes rehacer este test con calma para afinarlo.",
} as const;

export type ReportMicrocopyKey = keyof typeof report;
