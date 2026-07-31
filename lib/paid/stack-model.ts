/**
 * El modelo puro del stack del Paid (Plan 03-05, Fase 3).
 *
 * ESTE ARCHIVO ESTA SEPARADO DE `lib/paid/stack.ts` POR UNA RAZON MECANICA, NO
 * ESTETICA. `stack.ts` importa `server-only` porque contiene los loaders, y
 * `server-only` **revienta el build** en cuanto un componente de cliente toca
 * el modulo. El panel de compra ES de cliente: recalcula el total en vivo al
 * mover un toggle de add-on, asi que necesita `resolvePaidTotals` y los tipos.
 *
 * La alternativa —sumar el add-on con dos lineas dentro del componente— es
 * exactamente la segunda aritmetica que D-13 prohibe: se desincroniza en cuanto
 * alguien afina la constante de minutos en un solo sitio. Se parte el modulo,
 * no la cuenta.
 *
 * Aca no hay ni una consulta, ni un `process.env`, ni un literal de codigo de
 * instrumento. Los loaders viven en `lib/paid/stack.ts`, que reexporta todo lo
 * de aca para que el servidor siga teniendo una sola puerta de entrada.
 */
import { instrumentCategoryLabel } from "@/lib/i18n/microcopy/es-CO/instrument-labels";
import { estimateMinutes, sumEstimatedMinutes } from "@/lib/paid/estimate";

/** `product_stack.layer` del stack nuclear. Todo lo demas es add-on opcional. */
export const PAID_CORE_LAYER = "core";

/** Una fila del stack tal como sale del dato, antes de componerse. */
export interface PaidStackSourceRow {
  /** `instrument_version.id`. Llave estable de la fila (nunca el codigo). */
  versionId: string;
  /** `instrument.code`. Solo para derivar la etiqueta; nunca se muestra. */
  instrumentCode: string;
  /** `instrument_version.item_count`. Nullable en el catalogo: por eso importa. */
  itemCount: number | null;
  /** `product_stack.layer`. `core` o la capa de add-on que le corresponda. */
  layer: string;
  /** Los `item_code` de los items de esta version (null cuando no llevan). */
  itemCodes: readonly (string | null)[];
}

/** Lo que el usuario ya respondio, resuelto en el SERVIDOR. */
export interface PaidUserHistory {
  /** `instrument_version_id` de sus sesiones COMPLETADAS. */
  completedVersionIds: ReadonlySet<string>;
  /** Los `item_code` que ya respondio y son proyectables. */
  answeredItemCodes: ReadonlySet<string>;
}

/** Una fila lista para renderizar. */
export interface PaidStackRow {
  versionId: string;
  instrumentCode: string;
  /** Etiqueta es-CO del constructo. **Nunca el codigo crudo.** */
  label: string;
  itemCount: number;
  minutes: number;
  reusedCount: number;
  remainingCount: number;
  /** La fila entera esta cubierta: se marca "ya respondido". */
  fullyReused: boolean;
  /**
   * D-11: esta fila NO tiene reuso posible y el usuario tiene historial, asi
   * que podria inferir un ahorro que no existe. Lleva la nota explicita.
   */
  noReuseNote: boolean;
}

/** Un add-on opcional, apagado por defecto. */
export interface PaidAddOnRow {
  versionId: string;
  instrumentCode: string;
  label: string;
  /** Null cuando el instrumento todavia no tiene conteo sembrado. */
  itemCount: number | null;
  minutes: number | null;
  /** False = declarado pero no disponible: se muestra deshabilitado. */
  selectable: boolean;
}

/** Los tres estados del aviso de reuso (03-UI-SPEC §2). */
export type PaidReuseState = "cold" | "partial" | "complete";

export interface PaidStackAvailable {
  available: true;
  rows: PaidStackRow[];
  addOns: PaidAddOnRow[];
  /** Suma EXACTA de los `itemCount` de las filas. */
  totalItems: number;
  reusedItems: number;
  /** Siempre `totalItems - reusedItems`. */
  remainingItems: number;
  /** Suma de los minutos de lo que le queda por responder, fila a fila. */
  remainingMinutes: number;
  reuseState: PaidReuseState;
}

export interface PaidStackUnavailable {
  available: false;
  /** `empty` = no hay filas core. `incomplete` = una fila core sin conteo. */
  reason: "empty" | "incomplete";
}

export type PaidStackComposition = PaidStackAvailable | PaidStackUnavailable;

/**
 * Compone las filas de presentacion. **PURA**: recibe filas ya leidas y el
 * historial del usuario; no consulta base y no asume ninguna constante de reuso.
 */
export function composePaidStack(
  sourceRows: readonly PaidStackSourceRow[],
  history: PaidUserHistory,
): PaidStackComposition {
  const coreSource = sourceRows.filter((r) => r.layer === PAID_CORE_LAYER);

  // Cero filas core: no hay stack que vender. Nunca una lista corta con precio.
  if (coreSource.length === 0) return { available: false, reason: "empty" };

  // Una sola fila core sin conteo invalida el paywall entero. Un add-on sin
  // conteo NO lo invalida (se declara deshabilitado): la diferencia es que el
  // core es lo que el usuario esta comprando, y su total tiene que ser exacto.
  if (coreSource.some((r) => r.itemCount == null || r.itemCount <= 0)) {
    return { available: false, reason: "incomplete" };
  }

  const hasHistory =
    history.completedVersionIds.size > 0 || history.answeredItemCodes.size > 0;

  const rows: PaidStackRow[] = coreSource.map((source) => {
    // `itemCount` ya esta verificado como numero positivo por el guard de arriba.
    const itemCount = source.itemCount as number;
    const versionCompleted = history.completedVersionIds.has(source.versionId);

    // Cuantos items de ESTA fila ya estan respondidos.
    //   - version ya completada -> la fila entera;
    //   - si no, la interseccion por `item_code`.
    // Se acota a `itemCount` a proposito: un `item_codes` mas largo que el
    // conteo sembrado (dato a medias) produciria un restante NEGATIVO y el
    // total mentiria hacia abajo.
    let reusedCount = 0;
    if (versionCompleted) {
      reusedCount = itemCount;
    } else {
      for (const code of source.itemCodes) {
        if (typeof code === "string" && code !== "" && history.answeredItemCodes.has(code)) {
          reusedCount += 1;
        }
      }
      reusedCount = Math.min(reusedCount, itemCount);
    }

    // Ninguna llave de proyeccion y ninguna sesion previa de esta version: no
    // hay reuso posible, ni ahora ni nunca. Es el caso D-11 expresado en dato
    // (TwIVI no es una forma corta del PVQ-RR: es otro instrumento).
    const hasProjectionKey = source.itemCodes.some(
      (c) => typeof c === "string" && c !== "",
    );
    const noReuseNote = hasHistory && reusedCount === 0 && !hasProjectionKey;

    return {
      versionId: source.versionId,
      instrumentCode: source.instrumentCode,
      label: instrumentCategoryLabel(source.instrumentCode),
      itemCount,
      minutes: estimateMinutes(itemCount),
      reusedCount,
      remainingCount: itemCount - reusedCount,
      fullyReused: reusedCount >= itemCount,
      noReuseNote,
    };
  });

  const totalItems = rows.reduce((acc, r) => acc + r.itemCount, 0);
  const reusedItems = rows.reduce((acc, r) => acc + r.reusedCount, 0);
  const remainingItems = totalItems - reusedItems;
  const remainingMinutes = sumEstimatedMinutes(rows.map((r) => r.remainingCount));

  const reuseState: PaidReuseState =
    reusedItems === 0 ? "cold" : reusedItems >= totalItems ? "complete" : "partial";

  const addOns: PaidAddOnRow[] = sourceRows
    .filter((r) => r.layer !== PAID_CORE_LAYER)
    .map((source) => {
      const selectable = source.itemCount != null && source.itemCount > 0;
      return {
        versionId: source.versionId,
        instrumentCode: source.instrumentCode,
        label: instrumentCategoryLabel(source.instrumentCode),
        itemCount: selectable ? (source.itemCount as number) : null,
        minutes: selectable ? estimateMinutes(source.itemCount as number) : null,
        selectable,
      };
    });

  return {
    available: true,
    rows,
    addOns,
    totalItems,
    reusedItems,
    remainingItems,
    remainingMinutes,
    reuseState,
  };
}

export interface PaidTotals {
  items: number;
  minutes: number;
}

/**
 * El total que el usuario lee, con los add-ons que haya encendido.
 *
 * **PURA, y es la MISMA fuente que produjo el total base.** El recalculo ocurre
 * en el cliente (el usuario mueve un toggle y las dos cifras cambian), asi que
 * la tentacion es sumarlo ahi mismo con dos lineas. Dos aritmeticas se
 * desincronizan en cuanto alguien afina la constante de minutos en un solo
 * sitio, y la pantalla empieza a mostrar un total que no cuadra con sus filas.
 *
 * Los add-ons se suman sobre lo que le QUEDA al usuario, no sobre el total en
 * frio: sumarlos sobre el frio reintroduciria en silencio los items que el
 * aviso de reuso acaba de decirle que ya tiene hechos.
 *
 * Un id no seleccionable —o desconocido— no mueve nada. Es lo que convierte
 * "el add-on sin pack no entra en la aritmetica" en una garantia del dominio en
 * vez de una promesa de la interfaz, y ademas impide que un cliente manipulado
 * infle su propio total inventando identificadores.
 */
export function resolvePaidTotals(
  stack: PaidStackAvailable,
  selectedAddOnIds: Iterable<string>,
): PaidTotals {
  const selected = new Set(selectedAddOnIds);
  let items = stack.remainingItems;
  let minutes = stack.remainingMinutes;

  for (const addOn of stack.addOns) {
    if (!addOn.selectable || !selected.has(addOn.versionId)) continue;
    items += addOn.itemCount ?? 0;
    minutes += addOn.minutes ?? 0;
  }

  return { items, minutes };
}

