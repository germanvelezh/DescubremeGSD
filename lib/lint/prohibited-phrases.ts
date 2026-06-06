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

  // ---- (d) Carrera deterministica (D3.11) -----------------------------------
  {
    regex: /\btu (carrera|profesi[oó]n|trabajo) ideal\b/i,
    reason: "Anti-determinismo carrera (D3.11) — no hay carrera 'ideal' predecible",
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
  {
    regex: /\b(predice|garantizad[oa]|exacto al \d+%)\b/i,
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
];
