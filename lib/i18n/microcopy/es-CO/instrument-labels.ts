/**
 * Etiquetas de categoria por instrumento — titulo del reporte y lista "Mis datos".
 *
 * Cierra [GAP-REPORT-INTERESES-MISLABEL]: el titulo del reporte, la lista de
 * /me/data y el asunto del email nombraban "intereses" fijo (heredado de cuando
 * O*NET era el unico instrumento). Estas 4 etiquetas son verbatim de `mapa.ts`
 * (firmadas por Cowork) — la misma voz que el usuario ve en /onboarding/mapa.
 *
 * Keyed por el codigo EXACTO de la DB ([GAP-INSTRUMENT-CODE-CASING]: los codigos
 * son mixed-case — `TwIVI` y `PERMA-Profiler` NO son upper). El consumidor pasa
 * el `code` tal como viene del join, NUNCA `.toUpperCase()`.
 */
export const INSTRUMENT_CATEGORY_LABELS: Record<string, string> = {
  "BFI-2-S": "Personalidad",
  "ONET-IP-SF": "Intereses",
  TwIVI: "Valores",
  "PERMA-Profiler": "Bienestar",
};

/** Fallback neutro para codigo ausente (join nulo) o instrumento no mapeado. */
export const INSTRUMENT_CATEGORY_LABEL_FALLBACK = "Autoconocimiento";

/** Etiqueta de categoria para un codigo de instrumento (o el fallback neutro). */
export function instrumentCategoryLabel(
  code: string | null | undefined,
): string {
  if (!code) return INSTRUMENT_CATEGORY_LABEL_FALLBACK;
  return INSTRUMENT_CATEGORY_LABELS[code] ?? INSTRUMENT_CATEGORY_LABEL_FALLBACK;
}
