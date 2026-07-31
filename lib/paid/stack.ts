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

import { PAID_PRODUCT_CODE } from "@/lib/entitlement/resolve";
import { logger } from "@/lib/logger";
import {
  PAID_CORE_LAYER,
  type PaidStackSourceRow,
  type PaidUserHistory,
} from "@/lib/paid/stack-model";

// La mitad PURA vive en `lib/paid/stack-model.ts` (sin `server-only`, para que
// el panel de compra —que es de cliente— pueda recalcular el total con la MISMA
// funcion). Se reexporta entera para que el servidor conserve una sola puerta.
export * from "@/lib/paid/stack-model";

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
