/**
 * Proyeccion de respuestas entre formas de un mismo instrumento (D-10) —
 * DescubreMe Fase 3 Wave 3 (Plan 03-04).
 *
 * PRINCIPIO 10 DEL PRD, EN UNA FRASE: quien ya respondio el BFI-2-S del Free no
 * vuelve a responder lo mismo al entrar al BFI-2-60 del Paid. Responde los 30
 * que le faltan y su reporte se calcula sobre los 60.
 *
 * LA LLAVE ES `item.item_code`, Y NADA MAS. Las dos formas del BFI numeran sus
 * items en el MISMO espacio (el del 60): el item 1 del BFI-2-S lleva
 * 'BFI-2-60-16'. Cruzar por esa columna es lo que convierte el reuso en un
 * hecho del dato en vez de un branch por instrumento.
 *
 * SE ARRASTRA EL VALOR, NO SE SALTA LA PREGUNTA. Es la decision central del
 * modulo. Presentar solo los 30 faltantes SIN copiar los otros 30 `raw_value`
 * dejaria al scorer con medio instrumento: el BFI-2-60 suma 12 items por
 * dominio, asi que un vector de 30 produciria un puntaje sobre la mitad
 * PRESENTADO COMO SI FUERA COMPLETO — peor que no reusar nada. Por eso el
 * arrastre escribe filas de `item_response` y no es un filtro de interfaz.
 *
 * ES AGNOSTICO DE INSTRUMENTO. No hay ni un codigo literal aca: el destino
 * entra como `instrument_version_id`. Para un par sin espacio de codigos comun
 * —D-11 aclara que TwIVI -> PVQ-RR no tiene reuso posible, es otro instrumento
 * y no una forma ampliada del mismo— simplemente no encuentra codigos comunes y
 * devuelve el instrumento completo, que es la respuesta correcta.
 *
 * Anchors:
 *   - 03-04-PLAN.md Task 3, must_haves D-10.
 *   - db/seeds/instruments/BFI-2-60/items.sql (la mitad de la llave que este plan sembro).
 *   - lib/free/next-test.ts (el analogo: funcion pura + loader con el cliente por parametro).
 */
import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";

import { logger } from "@/lib/logger";

/** Un item del instrumento DESTINO, con su identidad canonica. */
export interface ProjectableItem {
  id: string;
  itemCode: string | null;
}

/** Una fila de `item_response` lista para insertar. */
export interface ProjectedResponse {
  itemId: string;
  rawValue: number;
}

/**
 * Los `item_code` del instrumento destino que el usuario TODAVIA no respondio,
 * en el orden en que vienen (que es el orden de presentacion del destino).
 *
 * PURA: no consulta base, no conoce ningun instrumento, no lee entorno.
 *
 * Un item del destino SIN `item_code` cuenta siempre como faltante — no se le
 * puede aparear nada, asi que el usuario tendra que responderlo. Ese es el modo
 * de fallo silencioso que D-10 teme: si el seed olvidara poblar la columna,
 * esta funcion devolveria los 60 y el reuso desapareceria sin un solo error.
 * Por eso el test de integracion del seed afirma sobre la interseccion.
 */
export function resolveMissingItemCodes(
  targetItemCodes: readonly (string | null | undefined)[],
  answeredItemCodes: Iterable<string>,
): (string | null)[] {
  const answered = new Set<string>();
  for (const code of answeredItemCodes) {
    // `null` NUNCA es una llave. Los instrumentos del Free (O*NET, TwIVI,
    // PERMA) tienen `item_code` nulo, y dejarlos entrar colapsaria todas sus
    // respuestas sobre una sola clave.
    if (typeof code === "string" && code !== "") answered.add(code);
  }
  return targetItemCodes
    .filter((code) => !(typeof code === "string" && answered.has(code)))
    .map((code) => code ?? null);
}

/**
 * Las filas de `item_response` a insertar en la sesion nueva: un item del
 * destino por cada `item_code` que el usuario YA respondio antes.
 *
 * PURA. Los items del destino sin `item_code`, y los codigos respondidos que no
 * existen en el destino, se ignoran sin lanzar — un instrumento destino que no
 * comparte espacio de codigos con nada simplemente no arrastra nada.
 */
export function projectAnsweredResponses(
  targetItems: readonly ProjectableItem[],
  answeredByCode: ReadonlyMap<string, number>,
): ProjectedResponse[] {
  const rows: ProjectedResponse[] = [];
  for (const item of targetItems) {
    if (typeof item.itemCode !== "string" || item.itemCode === "") continue;
    const rawValue = answeredByCode.get(item.itemCode);
    if (typeof rawValue !== "number") continue;
    rows.push({ itemId: item.id, rawValue });
  }
  return rows;
}

// biome-ignore lint/suspicious/noExplicitAny: untyped Supabase client (no generated Database types yet)
type AnyClient = SupabaseClient<any, "public", any>;

export interface ProjectionInputs {
  targetItems: ProjectableItem[];
  answeredByCode: Map<string, number>;
}

/**
 * Resuelve los dos insumos de la proyeccion. El `SupabaseClient` entra COMO
 * PARAMETRO — permite inyectar el cliente correcto y probar el modulo sin
 * mockear el builder.
 *
 * FRONTERA DE CONFIANZA (T-03-04-01). La consulta de respuestas previas filtra
 * por el `userId` que el llamador resolvio en el SERVIDOR
 * (`getUser()`, JWT validado), nunca por un valor recibido del cliente. Un
 * usuario no puede arrastrar respuestas de otro, y hay un test que lo afirma.
 *
 * Tres filtros mas, cada uno cerrando un modo de fallo distinto:
 *   - `status = 'completed'`: solo se arrastra de un test TERMINADO (es lo que
 *     escribe `lib/scoring/score-session.ts` al cerrar). Media sesion abandonada
 *     no es evidencia de nada.
 *   - `instrument_version_id <> destino`: un instrumento nunca se arrastra a SI
 *     MISMO. Sin esto, una segunda sesion del destino se auto-alimentaria.
 *   - `item_code NOT NULL`: hoy solo las dos formas del BFI lo tienen poblado;
 *     los demas instrumentos lo traen nulo y no deben aportar nada.
 */
export async function loadProjectionInputs(
  supabase: AnyClient,
  targetVersionId: string,
  userId: string,
): Promise<ProjectionInputs> {
  const { data: targetRows, error: targetErr } = await supabase
    .from("item")
    .select("id, item_code")
    .eq("instrument_version_id", targetVersionId)
    .order("sequence_number", { ascending: true });
  if (targetErr) {
    throw new Error(
      `Failed to load target items for projection: ${targetErr.message}`,
    );
  }
  const targetItems = ((targetRows ?? []) as Array<{
    id: string;
    item_code: string | null;
  }>).map((r) => ({ id: r.id, itemCode: r.item_code }));

  const { data: answeredRows, error: answeredErr } = await supabase
    .from("item_response")
    .select(
      "raw_value, responded_at, item!inner(item_code, instrument_version_id), assessment_session!inner(user_id, status)",
    )
    .eq("assessment_session.user_id", userId)
    .eq("assessment_session.status", "completed")
    .neq("item.instrument_version_id", targetVersionId)
    .not("item.item_code", "is", null)
    .order("responded_at", { ascending: true });
  if (answeredErr) {
    throw new Error(
      `Failed to load previous responses for projection: ${answeredErr.message}`,
    );
  }

  const answeredByCode = new Map<string, number>();
  for (const row of (answeredRows ?? []) as unknown as Array<{
    raw_value: number;
    item: { item_code: string | null } | null;
  }>) {
    const code = row.item?.item_code;
    if (typeof code !== "string" || code === "") continue;
    // Orden ascendente por `responded_at` + sobrescritura = gana la respuesta
    // MAS RECIENTE si el usuario completo dos formas que comparten el codigo.
    answeredByCode.set(code, row.raw_value);
  }

  return { targetItems, answeredByCode };
}

/**
 * Escribe en `sessionId` las respuestas que el usuario ya dio en otras formas
 * del mismo espacio de codigos. Devuelve cuantas filas quedaron escritas.
 *
 * Se llama UNA sola vez, cuando la sesion se CREA — nunca al reanudarla. Ese
 * guard vive en el llamador (`getOrCreateAuthenticatedSession`) porque es el
 * unico que sabe si acaba de insertar la fila.
 *
 * INSERTS POR FILA CON CATCH POR FILA (ADR-042): una fila que falla no se lleva
 * las otras 29, y el log nombra cual rompio. El log lleva el PATRON y el
 * conteo, nunca el usuario ni sus respuestas.
 *
 * NO fija `progress`: eso lo hace `advanceProgress`, que lo recalcula desde el
 * conteo real de filas. Derivarlo de `rows.length` seria afirmar una cobertura
 * que un fallo parcial no tendria.
 */
export async function carryForwardResponses(
  supabase: AnyClient,
  sessionId: string,
  targetVersionId: string,
  userId: string,
): Promise<number> {
  let inputs: ProjectionInputs;
  try {
    inputs = await loadProjectionInputs(supabase, targetVersionId, userId);
  } catch (err) {
    // El arrastre es una MEJORA, no un requisito para empezar el test. Si su
    // lectura falla, el usuario responde el instrumento completo — que es lo
    // que habria hecho sin D-10. Nunca puede impedirle entrar.
    logger.warn(
      { err: err instanceof Error ? err.message : String(err) },
      "paid_projection_load_failed",
    );
    return 0;
  }

  const rows = projectAnsweredResponses(
    inputs.targetItems,
    inputs.answeredByCode,
  );
  if (rows.length === 0) return 0;

  let written = 0;
  const failed: string[] = [];
  for (const row of rows) {
    const { error } = await (
      supabase.from("item_response") as unknown as {
        insert: (
          v: Record<string, unknown>,
        ) => Promise<{ error: { message: string } | null }>;
      }
    ).insert({
      session_id: sessionId,
      item_id: row.itemId,
      raw_value: row.rawValue,
      user_id: userId,
    });
    if (error) failed.push(row.itemId);
    else written += 1;
  }

  logger.info(
    {
      projected: written,
      candidates: rows.length,
      failed_item_ids: failed.length > 0 ? failed : undefined,
    },
    "paid_projection_carried_forward",
  );
  return written;
}
