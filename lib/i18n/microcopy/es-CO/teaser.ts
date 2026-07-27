/**
 * Microcopy es-CO — Perfil integrado teaser (UI-SPEC §6.7, D-B.1/B.2/B.3).
 *
 * El teaser es el climax "magia" del flujo Free: al completar los 4 tests, el
 * usuario ve un perfil integrado que cruza personalidad x intereses x valores x
 * bienestar (4-6 frases + 1-2 cruces "pincelada") en lenguaje de hipotesis
 * ("esto puede sugerir", "suele", "tiende a" — NUNCA "eres"), cierra insinuando
 * el integrador Paid (honesto, sin urgencia) + opt-in waitlist.
 *
 * Copy v0.1 (Claude) — placeholder estructural. Las ~12-20 plantillas de cruce
 * son [GAP-TEASER-CROSS-TEMPLATES-ES-CO] (P1, Owner Cowork); estas viven en el
 * seed db/seeds/integrator-rule/teaser/seed.sql. Este archivo cubre solo el
 * chrome del teaser (heading, upsell, gating). Sin urgencia artificial (AF-06),
 * sin determinismo (D3.11 / Principio 6), sobrio sin gamificacion (UX-07).
 *
 * Convencion §8.4: IDs `MC_*` plano underscore; los componentes importan por ID,
 * Cowork edita strings sin tocar componentes.
 *
 * Anchors:
 *   - 02-UI-SPEC.md §6.7 (IntegratedTeaser content contract), §8.2 (lint glossary).
 *   - 02-CONTEXT.md D-B.2 (tono hipotesis), D-B.3 (upsell honesto), D-A.6 (gating),
 *     UX-07 (sobrio, sin gamificacion).
 */
export const teaser = {
  /** Heading del perfil integrado (capa final, D-B.2). */
  MC_TEASER_HEADING: "Un primer espejo de quién eres",

  /** Subtitulo: encuadre de hipotesis, no de sentencia (Principio 6). */
  MC_TEASER_INTRO:
    "Esto cruza tus cuatro resultados. Son hipótesis para explorarte, no etiquetas: léelo como un punto de partida.",

  /** Encabezado de la seccion de cruces "pincelada" (D-B.2). */
  MC_TEASER_CROSSES_HEADING: "Donde tus resultados se cruzan",

  /**
   * Upsell honesto al integrador Paid (D-B.3). Informa el valor adicional sin
   * urgencia ni manipulacion.
   */
  MC_TEASER_UPSELL:
    "El cruce completo de 7+ dimensiones está en el perfil profundo. Acá viste una pincelada; allá se despliega entero.",

  /** Nota cuando un cruce se omite por una marca de calidad (D-F2.1). */
  MC_TEASER_OMITTED_NOTE:
    "Dejamos por fuera algún cruce que dependía de un resultado que conviene revisar con calma. El resto sigue en pie.",

  /** Copy de bloqueo cuando faltan tests (D-A.6). `{n}` = cuantos faltan. */
  MC_TEASER_LOCKED_TITLE: "Tu perfil integrado se desbloquea al completar los 4 tests",
  MC_TEASER_LOCKED_BODY:
    "Cada test suma una pieza. Te faltan {n} para ver cómo se cruzan tus resultados.",
  MC_TEASER_LOCKED_CTA: "Continuar",

  /** Placeholder visible mientras llegan las plantillas de Cowork (gapResult). */
  MC_TEASER_GAP_NOTE:
    "Estamos afinando la redacción de estos cruces. Pronto vas a ver acá la síntesis completa de tus cuatro resultados.",

  /**
   * Salida del estado `gap`. El estado se alcanza DESPUES de completar los
   * cuatro tests y era un callejon sin salida: heading + parrafo y ningun
   * enlace, en el ultimo frame del producto. Los cuatro reportes por test si
   * existen y estan enlazados desde "Mis datos".
   *
   * `[PENDIENTE-FIRMA-COWORK]` v0.1 — redaccion provisional, misma voz que
   * MC_TEASER_LOCKED_CTA.
   */
  MC_TEASER_GAP_CTA: "Ver tus resultados por test",
} as const;
