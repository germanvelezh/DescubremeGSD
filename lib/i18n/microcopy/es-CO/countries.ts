/**
 * Nombres de pais en es-CO para el selector de `/signup`.
 *
 * El `value` que viaja al servidor sigue siendo el codigo ISO-3166-1 alpha-2
 * (es lo que se guarda y lo que compara el prefill geo). Esto es solo la
 * etiqueta visible: el selector renderizaba "CO", "MX", "AR"... y obligaba al
 * usuario a conocer su propio codigo de pais para verificar que el prefill
 * habia acertado.
 *
 * La lista cubre exactamente los codigos de `PROBABLE_LATAM_COUNTRIES`
 * (app/(auth)/signup/page.tsx). Un codigo sin nombre cae al propio codigo, que
 * es feo pero nunca vacio.
 */
export const COUNTRY_NAMES_ES_CO: Record<string, string> = {
  AR: "Argentina",
  BO: "Bolivia",
  CL: "Chile",
  CO: "Colombia",
  CR: "Costa Rica",
  CU: "Cuba",
  DO: "República Dominicana",
  EC: "Ecuador",
  GT: "Guatemala",
  HN: "Honduras",
  MX: "México",
  NI: "Nicaragua",
  PA: "Panamá",
  PE: "Perú",
  PY: "Paraguay",
  SV: "El Salvador",
  US: "Estados Unidos",
  UY: "Uruguay",
  VE: "Venezuela",
};

/** Nombre visible de un codigo de pais (o el codigo si no esta mapeado). */
export function countryName(code: string): string {
  return COUNTRY_NAMES_ES_CO[code] ?? code;
}
