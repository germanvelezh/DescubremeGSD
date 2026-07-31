/**
 * La aritmetica de minutos del paywall — UNA sola fuente (Plan 03-05, Fase 3).
 *
 * POR QUE ESTE MODULO EXISTE SEPARADO. El minuto que muestra una fila del stack,
 * el minuto del total y el minuto que cambia al encender un add-on son la MISMA
 * cuenta. Calculada en dos sitios se desincroniza en cuanto alguien mueve un
 * toggle, y la pantalla termina mostrando un total que no cuadra con sus propias
 * filas. D-13 lo prohibe explicitamente: la aritmetica del volumen se comunica
 * sin redondear a favor.
 *
 * UNA CONSTANTE DECLARADA, NO UNA TABLA MAGICA POR INSTRUMENTO (03-UI-SPEC A5).
 * Una tabla por instrumento seria mas "precisa" y radicalmente menos revisable:
 * nadie puede auditar once cifras sin datos de campo, y hoy no hay ninguno —
 * cero usuarios pagos. Una sola cifra la puede afinar Cowork cuando existan
 * tiempos reales, y el efecto es visible de inmediato en toda la pantalla.
 *
 * SE REDONDEA HACIA ARRIBA, SIEMPRE. Redondear hacia abajo es redondear a favor,
 * que es exactamente lo que el principio 8 (tiempos honestos) prohibe. Una
 * estimacion que se queda corta es una promesa incumplida a mitad del stack.
 *
 * PURO: no lee entorno, no consulta base, no conoce ningun instrumento.
 *
 * Anchors:
 *   - 03-05-PLAN.md Task 1 paso 1, must_have D-13.
 *   - 03-UI-SPEC.md §Component Inventory (HonestTimeEstimate), A5.
 */

/**
 * Minutos por item. **Cifra declarada y revisable, no medida**: son ~21
 * segundos por item, que con los 368 items del stack completo dan 130 minutos —
 * el extremo ALTO del rango de 95-130 que el PRD ya promete por escrito. Se
 * eligio el extremo alto a proposito: si la estimacion tiene que equivocarse,
 * que se equivoque en contra nuestra.
 *
 * `Para Cowork:` esta es la unica palanca de tiempo de todo el paywall. Cambiarla
 * mueve las filas, el total y los add-ons a la vez, por construccion.
 */
export const MINUTES_PER_ITEM = 0.35;

/** Escala de presentacion. "Unos 25 minutos" se lee; "unos 21,4" no. */
export const MINUTES_ROUNDING_STEP = 5;

/**
 * Minutos estimados para un conteo de items, redondeados HACIA ARRIBA al paso
 * declarado.
 *
 * Cero items son cero minutos: no hay piso inventado. Un conteo negativo o no
 * finito devuelve 0 en vez de propagar un minuto negativo a la pantalla — un
 * dato corrupto se ve como "sin tiempo", nunca como "menos tiempo".
 */
export function estimateMinutes(itemCount: number): number {
  if (!Number.isFinite(itemCount) || itemCount <= 0) return 0;
  const raw = itemCount * MINUTES_PER_ITEM;
  return Math.ceil(raw / MINUTES_ROUNDING_STEP) * MINUTES_ROUNDING_STEP;
}

/**
 * Total de minutos de un conjunto de filas: la suma de los minutos YA
 * REDONDEADOS de cada una.
 *
 * Deliberado, y es la diferencia que importa: estimar sobre el gran total daria
 * un numero MENOR que la suma de las filas que la pantalla acaba de listar
 * (143 items dan 55 minutos en bloque, pero 60+60+23 dan 25+25+10 = 60). Un
 * usuario que sume las filas encontraria la diferencia, y la diferencia estaria
 * a nuestro favor. Se suma lo mostrado.
 */
export function sumEstimatedMinutes(itemCounts: readonly number[]): number {
  return itemCounts.reduce((acc, count) => acc + estimateMinutes(count), 0);
}
