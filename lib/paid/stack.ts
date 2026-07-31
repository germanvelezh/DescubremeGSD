/**
 * El stack del Paid: loader + composicion pura (Plan 03-05, Fase 3).
 *
 * LA TABLA DEL PAYWALL SE ARMA DESDE EL DATO, NUNCA DESDE UN ARREGLO EN EL
 * COMPONENTE (principio 1 + FOUND-05). Las filas salen de `product_stack` unido
 * a `instrument_version` e `instrument`, ordenadas por el campo de orden. Anadir
 * un instrumento al Paid es un seed, no un release — y por eso la pantalla crece
 * sola conforme cada plan de la fase siembra el suyo.
 *
 * FALLA RUIDOSA, NUNCA LISTA CORTA. Con cero filas core, o con una fila core
 * cuyo `item_count` no esta sembrado, la composicion devuelve un resultado NO
 * renderizable. Es el unico punto de esta fase donde una degradacion silenciosa
 * llegaria a un usuario que PAGA: una lista corta con un precio al lado es una
 * promesa de volumen equivocada, y el usuario descubre el resto despues de
 * pagar. El precedente vivo es `resolveTotalItems` en el runner, que prefiere
 * lanzar antes que mostrar "de 0".
 *
 * `Que NO se hace, y es deliberado:` **no se declara una constante de "cantidad
 * esperada de filas" a mano.** Una cifra mantenida a mano se desincroniza del
 * seed y reproduce la clase de fallo que ya mordio dos veces en este proyecto
 * (la 014 con su UPDATE que nunca matcheo, el gate que "pasaba en verde" sin
 * mirar nada). La verificacion de que cada instrumento materializo sus filas
 * vive en el test de integracion del plan de seed que lo introduce. Aca se
 * registra el conteo con el logger para que una caida sea VISIBLE, que es lo
 * que una constante a mano pretendia dar sin poder darlo.
 *
 * EL REUSO TIENE DOS MECANISMOS DISTINTOS, y los dos cuentan:
 *
 *   1. **La misma version ya completada.** Por D-11, O*NET IP-SF y
 *      PERMA-Profiler son el MISMO `instrument_version` en el Free y en el Paid.
 *      Quien ya los respondio en el Free no los vuelve a responder: esas filas
 *      estan cubiertas ENTERAS.
 *   2. **`item_code` compartidos entre dos formas.** Es D-10: el BFI-2-S del
 *      Free numera sus 30 items en el espacio del BFI-2-60, asi que cubre la
 *      mitad de la fila de personalidad. La llave la produce el plan 03-04.
 *
 * Los dos juntos son de donde sale el 113 que el UI-SPEC cita (30 + 60 + 23) —
 * **como aritmetica, no como constante**. Un usuario que no completo el Free
 * entero obtiene otro numero, y ese es justamente el punto.
 *
 * SIN LITERALES DE CODIGO DE INSTRUMENTO. La etiqueta sale del catalogo es-CO
 * (`instrumentCategoryLabel`), la capa y el orden salen del dato, y la regla de
 * "esta fila no se reutiliza" se deduce de la AUSENCIA de `item_code` — que es
 * la forma en dato de "otro instrumento mide lo mismo".
 *
 * Anchors:
 *   - 03-05-PLAN.md Task 1 pasos 2-3, Task 2 pasos 1-6.
 *   - 03-UI-SPEC.md §1 (estado de stack incompleto), §2 (los tres estados), §4 (add-ons).
 *   - lib/free/next-test.ts (el analogo: funcion pura + loader con el cliente por parametro).
 *   - lib/paid/projection.ts (plan 03-04) — de donde sale la llave `item_code`.
 */
import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";

import { instrumentCategoryLabel } from "@/lib/i18n/microcopy/es-CO/instrument-labels";
import { logger } from "@/lib/logger";
import { PAID_PRODUCT_CODE } from "@/lib/entitlement/resolve";
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

// biome-ignore lint/suspicious/noExplicitAny: untyped Supabase client (no generated Database types yet)
type AnyClient = SupabaseClient<any, "public", any>;

/**
 * Lee las filas del stack del Paid con sus `item_code`.
 *
 * El `SupabaseClient` entra COMO PARAMETRO, y el llamador pasa el cliente
 * **user-scoped**: el paywall no usa service_role. `product_stack`,
 * `instrument_version`, `instrument` e `item` tienen lectura publica, asi que
 * RLS no estorba y la politica sigue siendo la que manda.
 *
 * Devuelve `null` ante error de consulta. El llamador trata `null` igual que el
 * vacio: estado no-disponible. Ninguna rama renderiza una lista parcial.
 */
export async function loadPaidStack(
  supabase: AnyClient,
): Promise<PaidStackSourceRow[] | null> {
  const { data, error } = await supabase
    .from("product_stack")
    .select(
      "order, layer, instrument_version_id, instrument_version!inner(id, item_count, instrument!inner(code))",
    )
    .eq("product_code", PAID_PRODUCT_CODE)
    .order("order", { ascending: true });

  if (error || !data) {
    logger.error(
      { err: error?.message ?? "no rows returned" },
      "paid_stack_load_failed",
    );
    return null;
  }

  const stackRows = data as unknown as Array<{
    order: number;
    layer: string | null;
    instrument_version_id: string;
    instrument_version: {
      id: string;
      item_count: number | null;
      instrument: { code: string } | null;
    } | null;
  }>;

  const versionIds = stackRows
    .map((r) => r.instrument_version_id)
    .filter((id): id is string => typeof id === "string" && id.length > 0);

  // Los `item_code` de todos los instrumentos del stack, en UNA consulta. Uno
  // por fila seria N+1, y `loadProjectionInputs` no sirve aca: esta acotado a
  // un unico destino (excluye la version objetivo a proposito).
  const itemCodesByVersion = new Map<string, (string | null)[]>();
  if (versionIds.length > 0) {
    const { data: itemRows, error: itemErr } = await supabase
      .from("item")
      .select("instrument_version_id, item_code")
      .in("instrument_version_id", versionIds);

    if (itemErr) {
      logger.error({ err: itemErr.message }, "paid_stack_item_codes_load_failed");
      return null;
    }

    for (const row of (itemRows ?? []) as Array<{
      instrument_version_id: string;
      item_code: string | null;
    }>) {
      const bucket = itemCodesByVersion.get(row.instrument_version_id) ?? [];
      bucket.push(row.item_code);
      itemCodesByVersion.set(row.instrument_version_id, bucket);
    }
  }

  const rows: PaidStackSourceRow[] = stackRows.map((r) => ({
    versionId: r.instrument_version_id,
    instrumentCode: r.instrument_version?.instrument?.code ?? "",
    itemCount: r.instrument_version?.item_count ?? null,
    layer: r.layer ?? PAID_CORE_LAYER,
    itemCodes: itemCodesByVersion.get(r.instrument_version_id) ?? [],
  }));

  // Degradacion INSTRUMENTADA (el patron y el conteo, nunca el usuario): el
  // conteo de filas queda registrado en cada render para que una caida sea
  // visible sin mantener a mano una cifra "esperada" que se desincroniza sola.
  logger.info(
    {
      stack_rows: rows.length,
      core_rows: rows.filter((r) => r.layer === PAID_CORE_LAYER).length,
      rows_without_item_count: rows.filter((r) => r.itemCount == null).length,
    },
    "paid_stack_loaded",
  );

  return rows;
}

/**
 * El historial del usuario que alimenta el reuso.
 *
 * FRONTERA DE CONFIANZA (T-03-05-03): el `userId` lo resolvio el SERVIDOR con
 * `getUser()` (JWT validado). Nunca llega por parametro del cliente, asi que un
 * usuario no puede pedir el reuso de otro. Ademas el cliente es user-scoped y
 * las politicas de `assessment_session` / `item_response` son la mitad de base
 * de datos de la misma garantia.
 *
 * Solo cuentan las sesiones COMPLETADAS: media sesion abandonada no es evidencia
 * de nada, y prometer un ahorro sobre ella seria una sorpresa despues de pagar.
 *
 * Devuelve historial VACIO ante error, no lanza: el paywall degrada al estado
 * frio —que muestra el trabajo COMPLETO y ningun aviso— en vez de mostrar un
 * numero de reuso equivocado. Degradar hacia "te falta todo" nunca cobra de mas
 * en atencion; degradar hacia "ya tienes mucho hecho" si.
 */
export async function loadPaidUserHistory(
  supabase: AnyClient,
  userId: string,
): Promise<PaidUserHistory> {
  const empty: PaidUserHistory = {
    completedVersionIds: new Set<string>(),
    answeredItemCodes: new Set<string>(),
  };

  const [sessionsResult, responsesResult] = await Promise.all([
    supabase
      .from("assessment_session")
      .select("instrument_version_id")
      .eq("user_id", userId)
      .eq("status", "completed"),
    supabase
      .from("item_response")
      .select("item!inner(item_code), assessment_session!inner(user_id, status)")
      .eq("assessment_session.user_id", userId)
      .eq("assessment_session.status", "completed")
      .not("item.item_code", "is", null),
  ]);

  if (sessionsResult.error || responsesResult.error) {
    logger.warn(
      {
        err:
          sessionsResult.error?.message ??
          responsesResult.error?.message ??
          "unknown",
      },
      "paid_reuse_history_load_failed",
    );
    return empty;
  }

  const completedVersionIds = new Set<string>();
  for (const row of (sessionsResult.data ?? []) as Array<{
    instrument_version_id: string | null;
  }>) {
    if (typeof row.instrument_version_id === "string") {
      completedVersionIds.add(row.instrument_version_id);
    }
  }

  const answeredItemCodes = new Set<string>();
  for (const row of (responsesResult.data ?? []) as unknown as Array<{
    item: { item_code: string | null } | null;
  }>) {
    const code = row.item?.item_code;
    if (typeof code === "string" && code !== "") answeredItemCodes.add(code);
  }

  return { completedVersionIds, answeredItemCodes };
}
