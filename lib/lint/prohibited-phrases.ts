/**
 * Prohibited-phrase glossary for CI lint — DescubreMe Phase 1 Wave 0 (Plan 01-03).
 *
 * `PROHIBITED_PATTERNS` is the single source of truth for the
 * `tests/lint/prohibited-phrases.test.ts` CI gate. It implements:
 *
 *   - COMPL-18 — Frases prohibidas regex bloquea PR.
 *   - UX-01    — Microcopy es-CO sin "vosotros"/"ordenador"/"coger".
 *   - UX-02    — Tono sin urgencia + glosario activo.
 *   - D3.11    — Anti-determinismo (no "tu carrera ideal", no "te define").
 *   - CLAUDE.md global §2 / project §9 — AI-words + saludos vacios.
 *   - PRD Principio 5 — Anti-clinico (excepto negacion).
 *
 * Authoritative source: `01-UI-SPEC.md §8.2` glossary table + `01-RESEARCH.md`
 * lines 1380-1399 PROHIBITED_PATTERNS block.
 *
 * Severity:
 *   - 'error'   — fail PR.
 *   - 'warning' — surface in output but do not fail (none currently; reserved
 *                 for migrations where a temporary exception is documented).
 *
 * Adding patterns: add a new entry with a regex (anchored with \b where the
 * surface allows it), a `reason` that links to the source authority, and a
 * severity. Do not delete entries without a corresponding ADR.
 *
 * NOTE on Unicode lookalikes (T-01-03-02): regexes here do NOT NFKC-normalize.
 * A hostile contributor can bypass with Cyrillic homoglyphs. Phase 6 POLISH-04
 * adds NFKC pre-normalization. Accepted for Phase 1 per threat register.
 */

export type ProhibitedSeverity = "error" | "warning";

export interface ProhibitedPattern {
  regex: RegExp;
  reason: string;
  severity: ProhibitedSeverity;
}

export const PROHIBITED_PATTERNS: ProhibitedPattern[] = [
  // ---- (a) AI-words (CLAUDE.md global §2 + project §9) -----------------------
  {
    regex:
      /\b(delve|tapestry|unlock|empower|seamlessly|game-changer|synergy|paradigm|holistic)\b/i,
    reason: "AI-word forbidden (CLAUDE.md §2 / §9 — drop the word, rewrite plain)",
    severity: "error",
  },
  {
    regex: /\bleverage\b/i,
    reason: "AI-word 'leverage' (as verb) forbidden (CLAUDE.md §2 / §9)",
    severity: "error",
  },
  {
    regex: /\brobust\b/i,
    reason: "AI-word 'robust' as muletilla forbidden (CLAUDE.md §2 / §9)",
    severity: "error",
  },

  // ---- (b) Empty greetings / closers (CLAUDE.md §2) -------------------------
  {
    regex:
      /(Great question!|Absolutely!|¡Excelente pregunta!|¡Por supuesto!|¡Claro que sí!)/i,
    reason: "Saludo vacio forbidden (CLAUDE.md global §2)",
    severity: "error",
  },

  // ---- (c) Tipologico / esencialismo (AF-01) --------------------------------
  {
    regex: /\beres (extrovertid[oa]|introvertid[oa]|creativ[oa]|ansios[oa]|sensible|reservad[oa])\b/i,
    reason: "Anti-tipologia (AF-01) — no etiquetar al usuario como un tipo",
    severity: "error",
  },
  {
    regex: /\btu personalidad real\b/i,
    reason: "Anti-esencialismo (AF-01) — la personalidad no tiene un 'real' fijo",
    severity: "error",
  },
  {
    regex: /\btu verdadero yo\b/i,
    reason: "Anti-esencialismo (AF-01) — no hay 'yo verdadero' descubrible",
    severity: "error",
  },
  {
    regex: /\bte define como\b/i,
    reason: "Anti-determinismo (D3.11) — un test no define a una persona",
    severity: "error",
  },

  // ---- (d) Carrera deterministica (D3.11 + D3.3 re-anclado, ADR-037) --------
  //
  // Este bloque es ahora TAMBIEN el guardrail de D3.3, que hasta ADR-037 vivia
  // como pin de igualdad exacta sobre `MC_REPORT_OCCUPATIONS_HEADING`. Ese pin
  // se pudrio en silencio: el copy evoluciono, la constante quedo sin
  // consumidores y el unico test que la vigilaba estaba skipped. Un pin
  // semantico sobrevive a que el copy cambie; uno de igualdad exacta no.
  //
  // Cubre la seccion de ocupaciones del reporte via SCAN_DIRS
  // (`lib/i18n/microcopy/**`), donde vive el encabezado actual
  // `MC_NIVEL_REVEAL_TITLE` = "Campos que podrian resonar contigo".
  {
    // `campo|area|sector|vocacion` se agregan a proposito: el patron viejo solo
    // cubria carrera/profesion/trabajo, asi que un encabezado de ocupaciones que
    // dijera "tu campo ideal" o "tu area ideal" pasaba el gate. Es exactamente
    // la superficie que D3.3 protegia.
    regex: /\btu (carrera|profesi[oó]n|trabajo|campo|[aá]rea|sector|vocaci[oó]n) ideal\b/i,
    reason:
      "Anti-determinismo carrera (D3.11 + D3.3 via ADR-037) — no hay carrera, campo ni area 'ideal' predecible",
    severity: "error",
  },
  {
    // Afirmacion vocacional directa sobre la seccion de ocupaciones. El copy
    // vigente cumple por construccion ("Campos que PODRIAN RESONAR contigo");
    // esto impide que una edicion futura lo vuelva asertivo.
    regex: /\b(tu|su) (vocaci[oó]n|campo|[aá]rea) es\b/i,
    reason:
      "Anti-determinismo (D3.11 + D3.3 via ADR-037) — el reporte sugiere areas, no las asigna",
    severity: "error",
  },
  {
    // "naciste para", "estas hecho/a para": determinismo vocacional por esencia.
    regex: /\b(naciste|est[aá]s hecho\/?a?) para\b/i,
    reason:
      "Anti-determinismo (D3.11 + D3.3 via ADR-037) — el producto no afirma destino vocacional",
    severity: "error",
  },
  {
    regex: /\b(esta|esa) es tu carrera\b/i,
    reason: "Anti-determinismo (D3.11) — el test no asigna carrera",
    severity: "error",
  },
  {
    regex: /\btu profesi[oó]n es\b/i,
    reason: "Anti-determinismo (D3.11) — el test no asigna profesion",
    severity: "error",
  },

  // ---- (e) Clinico (PRD Principio 5) ----------------------------------------
  // Note: 'no es clinico' / 'no clinico' is the negation form that the project
  // uses to explain the product. Match the bare word standalone via word boundary.
  {
    regex: /\b(trastorno|patolog[ií]a|diagn[oó]stico)\b/i,
    reason: "Anti-clinico (PRD Principio 5) — instrumento educativo, no clinico",
    severity: "error",
  },
  {
    regex: /\bs[ií]ntoma\b/i,
    reason: "Anti-clinico (PRD Principio 5) — no usar lexico clinico",
    severity: "error",
  },
  {
    regex: /\b(depresi[oó]n|ansiedad cl[ií]nica)\b/i,
    reason: "Anti-clinico (PRD Principio 5) — no diagnosticar trastornos",
    severity: "error",
  },

  // ---- (e2) Clinico reforzado — HARD GATE D-D.4 / UI-SPEC §8.2 --------------
  // Extension Phase 2 (Plan 02-02): gate clinico ANTES del 1er reporte sensible
  // (BFI-2-S / PERMA). Reframe obligatorio "Neuroticism" -> "Sensibilidad
  // emocional"; PANAS / afecto negativo / bienestar-as-judgment con lenguaje
  // suave. Las negaciones (disclaimers, ruta de contencion NFR-28) NO se marcan.
  {
    regex: /\bneurotic(?:ism)?[oa]?\b/i,
    reason: "Reframe -> 'Sensibilidad emocional' (D-D.4 / UI-SPEC §8.2)",
    severity: "error",
  },
  {
    // Atributo de persona. Lookbehind variable salta "no es depresivo" /
    // "no depresivo" (negacion/disclaimer) pero captura "eres ansiosa" /
    // "el resultado es depresivo". V8 soporta lookbehind de longitud variable.
    regex: /(?<!\bno\s(?:es\s)?)\b(depresiv[oa]|ansios[oa])\b/i,
    reason: "Anti-clinico atributo de persona (Principio 5 / UI-SPEC §8.2)",
    severity: "error",
  },
  {
    regex: /\bPANAS\b/,
    reason: "Reframe suave — no etiqueta de persona (D-D.4 / UI-SPEC §8.2)",
    severity: "error",
  },
  {
    regex: /\bafecto negativo\b/i,
    reason: "Reframe suave — no etiqueta de persona (D-D.4 / UI-SPEC §8.2)",
    severity: "error",
  },
  {
    regex: /\b(tu bienestar es bajo|eres infeliz)\b/i,
    reason: "Banda descriptiva, no juicio (PERMA / UI-SPEC §8.2)",
    severity: "error",
  },
  {
    regex: /\bdisfunci[oó]n\b/i,
    reason: "Anti-clinico (UI-SPEC §8.2) — sin anclas clinicas tipo Ryff",
    severity: "error",
  },

  // ---- (f) Anti-Ikigai determinismo (AF-20, deja en glossary Phase 1) -------
  {
    regex: /\btu Ikigai es\b/i,
    reason: "Anti-determinismo Ikigai (AF-20) — Ikigai es proceso, no etiqueta",
    severity: "error",
  },
  {
    regex: /\btu prop[oó]sito de vida es\b/i,
    reason: "Anti-determinismo (AF-20) — el proposito no se 'asigna' por test",
    severity: "error",
  },

  // ---- (g) Comparativos sociales (AF-08) ------------------------------------
  {
    regex: /\bm[aá]s [a-zñáéíóú]+ que el \d{1,3}\s*%/i,
    reason: "Anti-comparativo social (AF-08) — no rankear usuarios entre si",
    severity: "error",
  },
  {
    regex: /\bmejor que el \d{1,3}\s*%/i,
    reason: "Anti-comparativo social (AF-08) — no ranking percentil entre personas",
    severity: "error",
  },

  // ---- (h) Urgencia (AF-06) -------------------------------------------------
  {
    regex: /\bsolo hoy\b/i,
    reason: "Anti-urgencia (AF-06) — sin manipulacion temporal",
    severity: "error",
  },
  {
    regex: /\b(ultima|última) oportunidad\b/i,
    reason: "Anti-urgencia (AF-06) — sin manipulacion temporal",
    severity: "error",
  },
  {
    regex: /\bAp[uú]rate\b/i,
    reason: "Anti-urgencia (AF-06) — sin presion al usuario",
    severity: "error",
  },
  {
    regex: /\bquedan\s+\d+\s+minutos?\b/i,
    reason: "Anti-urgencia (AF-06) — sin contadores regresivos",
    severity: "error",
  },

  // ---- (i) Marketing exagerado ----------------------------------------------
  // Rule 1 (Plan 01-09) bug fix: lookbehind `(?<!NO\s)` allows the canonical
  // D3.10 verbatim phrase "NO predice exito laboral" used in the report
  // ficha tecnica (and any other explicit negation). Without the lookbehind
  // the linter rejected the project's own anti-determinism copy.
  {
    regex: /(?<!NO\s)\bpredice\b/i,
    reason: "Anti-marketing — sin claims deterministas de prediccion",
    severity: "error",
  },
  {
    regex: /\b(garantizad[oa]|exacto al \d+%)\b/i,
    reason: "Anti-marketing — sin claims deterministas de prediccion",
    severity: "error",
  },

  // ---- (j) Anti-espanol-no-CO (UX-01 / CLAUDE.md §13) -----------------------
  {
    regex: /\bvosotros\b/i,
    reason: "Anti-espanol-no-CO (UX-01) — usar 'tu/ustedes', no 'vosotros'",
    severity: "error",
  },
  {
    regex: /\bcoger\b/i,
    reason: "Anti-espanol-no-CO (UX-01) — preferir 'tomar/agarrar'",
    severity: "error",
  },
  {
    regex: /\bordenador\b/i,
    reason: "Anti-espanol-no-CO (UX-01) — preferir 'computador/computadora'",
    severity: "error",
  },
  {
    regex: /\bm[oó]vil\b/i,
    reason: "Anti-espanol-no-CO (UX-01) — preferir 'celular' (CO context)",
    severity: "error",
  },

  // ---- (k) Jerga generacional -----------------------------------------------
  {
    regex: /\b(OK Boomer|slay|lit)\b/i,
    reason: "Profesionalismo es-CO neutral — sin jerga generacional",
    severity: "error",
  },

  // ---- (l) Voseo rioplatense — HARD GATE Fase 3 (Plan 03-01) ----------------
  //
  // ROADMAP §Phase 3 Hard Gate: "ningun texto sembrado viola COMPL-18 ni
  // introduce voseo rioplatense contra CLAUDE.md §13". Se amplia el glosario
  // ANTES del primer texto del Paid: la Fase 3 siembra ~180 filas de
  // narrative_template y los 45 textos de faceta del BFI, y el research los
  // encontro en voseo (`sentis`, `pensa`, `vos`, `mantenes`). Un gate que
  // llega despues del seed no es un gate, es un inventario.
  //
  // EL DISCRIMINANTE ES LA TILDE, no la letra. Las clases de caracteres tipo
  // `[áa]` estan PROHIBIDAS aca: `\bllev[áa]s\b` marcaria `llevas`, que es la
  // forma de TUTEO correcta en es-CO y aparece en el copy vigente. Solo formas
  // acentuadas exactas. El acento grave se incluye por si un editor lo produce.
  //
  // Verificado contra los 5 SCAN_DIRS (35 archivos) antes de anadirse: cero
  // colisiones con el copy existente, asi que NO hace falta ninguna exclusion.
  // Anadir patrones esta permitido; relajar el lint exige firma (UI-SPEC A10).
  //
  // `sos` (voseo de "eres") queda deliberadamente FUERA: colisiona con "SOS"
  // como nombre de linea de ayuda, superficie viva de NFR-28, y el contrato de
  // 03-UI-SPEC no lo pide.
  //
  // OJO con `\b` y las tildes: en JavaScript `\b` es un limite ASCII, asi que
  // una tilde en el BORDE del patron lo rompe en silencio. `\bpens[áà]\b` NO
  // matchea "Pensá en..." porque entre `á` (no-ASCII-word) y el espacio no hay
  // transicion de limite. Por eso las formas que TERMINAN en tilde usan un
  // lookahead de letra en vez de `\b`. Verificado por test rojo, no por lectura.
  {
    regex: /\b(llev[áà]s|sent[íì]s|pod[éè]s|asum[íì]s|manten[éè]s|ten[éè]s|quer[éè]s)\b/i,
    reason:
      "Voseo rioplatense (CLAUDE.md §13 / Hard Gate Fase 3) — usar tuteo es-CO: llevas, sientes, puedes, asumes, mantienes, tienes, quieres",
    severity: "error",
  },
  {
    // Termina en tilde -> lookahead, no `\b` (ver nota de arriba).
    regex: /\bpens[áà](?![a-záéíóúüñ])/i,
    reason:
      "Voseo rioplatense (CLAUDE.md §13 / Hard Gate Fase 3) — el imperativo es-CO es 'piensa', no 'pensa'",
    severity: "error",
  },
  {
    regex: /\bvos\b/i,
    reason:
      "Voseo rioplatense (CLAUDE.md §13 / Hard Gate Fase 3) — el pronombre es 'tu', no 'vos'",
    severity: "error",
  },

  // ---- (m) Costo hundido como palanca — D-22 (Plan 03-01) -------------------
  // Rechazado explicitamente en el discuss de la Fase 3: el paywall informa
  // cuanto se reutiliza del Free, pero NO lo usa como presion para pagar.
  // `MC_PAID_REUSE_PARTIAL` ("Ya respondiste N de estos items en el Free")
  // es informacion y pasa; "no pierdas lo que ya respondiste" es palanca.
  {
    regex: /\bno pierdas\b/i,
    reason: "Anti-costo-hundido (D-22) — el reuso se informa, no se usa como presion",
    severity: "error",
  },
  {
    regex: /\bya invertiste\b/i,
    reason: "Anti-costo-hundido (D-22) — el tiempo ya dado no es argumento de compra",
    severity: "error",
  },
  {
    regex: /\baprovecha lo que (llevas|ya)\b/i,
    reason: "Anti-costo-hundido (D-22) — sin palanca sobre el avance previo",
    severity: "error",
  },
  {
    regex: /\best[áa]s a un paso\b/i,
    reason: "Anti-costo-hundido (D-22) — falsa proximidad como presion de cierre",
    severity: "error",
  },

  // ---- (n) Urgencia artificial del paywall — AF-06 / ADR-030 D6 -------------
  // Extiende el bloque (h) a las formas propias de una pantalla de cobro.
  {
    regex: /\bsolo quedan\b/i,
    reason: "Anti-urgencia (AF-06) — sin escasez inventada",
    severity: "error",
  },
  {
    // Empieza en tilde -> lookbehind de letra, no `\b` (mismo trap ASCII).
    regex: /(?<![a-záéíóúüñ])[úu]ltimas horas\b/i,
    reason: "Anti-urgencia (AF-06) — sin ventana artificial",
    severity: "error",
  },
  {
    regex: /\bpor tiempo limitado\b/i,
    reason: "Anti-urgencia (AF-06) — sin ventana artificial",
    severity: "error",
  },
  {
    regex: /\d+\s+personas?\s+(viendo|mirando|comprando)\b/i,
    reason: "Anti-urgencia (AF-06) — sin prueba social fabricada",
    severity: "error",
  },

  // ---- (o) Ancla de descuento falsa (Plan 03-01) ----------------------------
  // El Paid tiene UN precio (USD 19 / equivalente COP). No hay precio anterior,
  // asi que cualquier tachado o porcentaje es una referencia inventada.
  {
    regex: /-\s?\d{1,3}\s*%\s*(de\s*)?(descuento|dcto|off)\b/i,
    reason: "Anti-ancla-falsa — el Paid no tiene precio anterior contra el cual descontar",
    severity: "error",
  },

  // ---- (p) Tiempos deshonestos — principio 8 (Plan 03-01) -------------------
  // El stack Paid son ~95-130 minutos. Minimizarlo con "solo"/"apenas" rompe
  // la estimacion honesta que el propio UI-SPEC exige (HonestTimeEstimate).
  {
    regex: /\bsolo te toma\b/i,
    reason: "Tiempos honestos (principio 8) — no minimizar la duracion real del stack",
    severity: "error",
  },
  {
    regex: /\bapenas \d+\s*(minutos?|min)\b/i,
    reason: "Tiempos honestos (principio 8) — no minimizar la duracion real del stack",
    severity: "error",
  },

  // ---- (q) Determinismo vocacional del Paid (CLAUDE.md §8) ------------------
  // Complementa el bloque (d) con las dos formas que el reporte profundo
  // podria introducir y que el patron viejo no cubria.
  {
    regex: /\bdeber[íi]as dedicarte a\b/i,
    reason: "Anti-determinismo vocacional (CLAUDE.md §8) — el producto no asigna ocupacion",
    severity: "error",
  },
  {
    regex: /\bvas a tener [ée]xito en\b/i,
    reason: "Anti-prediccion de exito (CLAUDE.md §8) — no se predice exito individual",
    severity: "error",
  },
];
