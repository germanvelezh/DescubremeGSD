/**
 * Microcopy es-CO — Captura de nivel de preparación (Phase 02.1 Wave 5).
 *
 * Textos VERBATIM del pack Cowork (CLAUDE.md §9: Claude Code los usa tal cual,
 * NO redacta copy nuevo). Cada cadena traza a una sección del pack:
 *   - §2   captura (título, subtítulo, ayuda).
 *   - §2.1 pregunta nivel educativo + 4 opciones.
 *   - §2.2 pregunta experiencia + 4 opciones.
 *   - §3   nivel inferido + control de ajuste (explore_intent).
 *   - §4   consentimiento Ley 1581 (aviso + enlace + confirmación de revocación).
 *
 * Los `value` de las opciones son los enums de captura — DEBEN coincidir con las
 * columnas `user.education_level` / `user.career_stage` (migración 016) y con los
 * tipos `EducationLevel` / `CareerStage` de `lib/onet/job-zone.ts`. Validados por
 * Zod en `captureLevelAction`.
 *
 * `[GAP-MICROCOPY-NIVEL-CTA]`: el pack no define un label para el botón de envío
 * de la captura. `MC_NIVEL_CTA` es la única cadena nueva — pendiente de sign-off
 * de Cowork (UX Writer). El resto es verbatim.
 *
 * Anchors:
 *  - implementation_packs/Onboarding_Nivel_Microcopy_es-CO_Pack_v1.0.md §2-§4.
 *  - implementation_packs/JobZones_es-CO_Pack_v1.0.md §3.1 (enums).
 *  - estado/DECISIONS_LOG.md ADR-027.
 */

export const onboardingNivel = {
  // §2 — captura
  MC_NIVEL_TITLE: "Antes de mostrarte campos para explorar",
  MC_NIVEL_SUBTITLE:
    "Dos datos rápidos para que los ejemplos te queden a la medida, y no genéricos.",

  // §2.1 — nivel educativo
  MC_NIVEL_Q_EDUCATION:
    "¿Cuál es el nivel de estudios más alto que has terminado o estás cursando?",
  MC_NIVEL_EDUCATION_OPTIONS: [
    { value: "secundaria", label: "Bachillerato o menos" },
    { value: "tecnico_tecnologo", label: "Técnico o tecnólogo" },
    { value: "pregrado", label: "Pregrado universitario" },
    {
      value: "posgrado",
      label: "Posgrado (especialización, maestría o doctorado)",
    },
  ],

  // §2.2 — experiencia
  MC_NIVEL_Q_EXPERIENCE: "¿Cuánta experiencia laboral relacionada tienes?",
  MC_NIVEL_EXPERIENCE_OPTIONS: [
    { value: "sin_experiencia", label: "Sin experiencia aún, o estoy estudiando" },
    { value: "junior", label: "Menos de 3 años" },
    { value: "semi_senior", label: "Entre 3 y 8 años" },
    { value: "senior", label: "Más de 8 años" },
  ],
  MC_NIVEL_HELP:
    "Usamos esto solo para ajustar los ejemplos de ocupación. Lo puedes cambiar después.",

  // §3 — nivel inferido + control de ajuste (NO se expone el término "Job Zone")
  MC_NIVEL_ADJUST_TITLE:
    "Listo. Vamos a mostrarte ejemplos acordes a tu preparación.",
  MC_NIVEL_ADJUST_PROMPT: "¿Cómo quieres explorar?",
  MC_NIVEL_INTENT_OPTIONS: [
    { value: "current", label: "Con mi preparación actual" },
    { value: "study_more", label: "Estoy abierto/a a formarme más" },
  ],
  MC_NIVEL_INTENT_HELP:
    "Ninguna opción es mejor que la otra. Solo cambia el tipo de campos que verás.",

  // §4 — consentimiento (Ley 1581). Aviso informado + acotado al propósito.
  MC_NIVEL_CONSENT_NOTICE:
    "Tratamiento de tus datos. Tu nivel de estudios y tu experiencia se usan únicamente para ajustar los ejemplos de ocupación que te mostramos. No se comparten con terceros y los puedes editar o eliminar cuando quieras desde tu perfil.",
  MC_NIVEL_CONSENT_LINK: "Ver cómo tratamos tus datos",
  // §4 — confirmación mostrada en el perfil al borrar los datos de nivel.
  MC_NIVEL_REVOKE_CONFIRM:
    "Tus datos de nivel se eliminaron. Las recomendaciones volverán a basarse solo en tus intereses.",

  // §5 — revelación ocupacional (encuadre no determinista). Reemplaza el heading
  // Phase-1 de la capa 3 del reporte por el reveal del pack. NUNCA "match %".
  MC_NIVEL_REVEAL_TITLE: "Campos que podrían resonar contigo",
  MC_NIVEL_REVEAL_DISCLAIMER:
    "Estos son ejemplos para explorar, no un veredicto. Son áreas donde personas con intereses parecidos a los tuyos suelen sentirse a gusto, ajustadas a tu nivel de preparación. Tú decides qué mirar de cerca.",
  // Prefijo del micro-tag por tarjeta; el código compone "<prefijo> <nombres>."
  // (p. ej. "Encaja con tu lado Investigativo y Convencional."). Se omite entero
  // si no hay letras coincidentes (nunca "Encaja con tu lado .").
  MC_NIVEL_MICROTAG_PREFIX: "Encaja con tu lado",
  MC_NIVEL_REVEAL_CTA:
    "Esto es solo por intereses. En tu perfil completo, estos campos se cruzan con tu personalidad, tus valores y tus fortalezas para afinar mucho más.",
  // §5.1 — estado vacío (tras los fallbacks del selector). Honesto solo en
  // entornos con el catálogo W4 sembrado (deploy-coupled, ship con esta fase).
  MC_NIVEL_REVEAL_EMPTY:
    "Por ahora no encontramos ejemplos claros para esta combinación. Con tu perfil completo vamos a poder mostrarte campos más afinados.",
  // §5.1 loading: N/A bajo SSR (las ocupaciones se cargan server-side en el
  // assembler; no hay fetch async cliente). Cadena omitida a propósito.

  // [GAP-MICROCOPY-NIVEL-CTA] — única cadena nueva, pendiente sign-off Cowork.
  MC_NIVEL_CTA: "Ver campos para explorar",
  // [GAP-MICROCOPY-NIVEL-CTA] — Phase 02.1 plan 03: label del CTA primario del
  // cierre Free (reveal ocupacional → teaser /perfil-integrado). PLACEHOLDER
  // pendiente de sign-off Cowork (UX Writer), mismo patrón que MC_NIVEL_CTA.
  // es-CO tuteo neutro (NO voseo — el voseo de MC_NIVEL_ERROR está bajo
  // [GAP-MICROCOPY-VOSEO-TO-ES-CO], no replicar).
  MC_NIVEL_CLOSE_CTA: "Ver tu perfil integrado",
  // Funcional (no del pack) — error de guardado, estilo repo (cf. account.ts).
  MC_NIVEL_ERROR: "No pudimos guardar tus datos. Intentá de nuevo.",
} as const;
