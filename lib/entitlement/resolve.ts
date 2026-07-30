/**
 * Acceso pagado — fuente unica de verdad (Plan 03-01, Fase 3).
 *
 * Dos responsabilidades, deliberadamente separadas:
 *
 *   1. `requiresPaidAccess(rows)` — predicado PURO sobre las membresias de
 *      `product_stack` de un `instrument_version`: ¿este instrumento exige
 *      acceso pagado?
 *   2. `resolveEntitlement(supabase, userId, productCode)` — ¿este usuario
 *      TIENE ese acceso?
 *
 * **La URL de retorno de Stripe NO es prueba de pago.** La unica prueba es una
 * fila de `entitlement`, concedida por un webhook con firma verificada. Toda
 * pantalla que decida sobre acceso pagado ramifica sobre este modulo.
 *
 * El `SupabaseClient` entra como PARAMETRO (misma forma que
 * `loadFreeOrderedCodes`). Eso permite —y obliga a— inyectar el cliente
 * user-scoped: la lectura de `entitlement` tiene que pasar por la politica
 * `own_entitlement_select` de la migracion 020. Si aca se usara el cliente
 * service_role, la politica dejaria de ser load-bearing y el guard de base de
 * datos seria decorativo (prohibicion explicita del plan: service_role queda
 * confinado al webhook, que no tiene sesion de usuario).
 *
 * Anchors:
 *   - 03-01-PLAN.md must_haves (predicado solo-Paid), Task 3 steps 9 y 14.
 *   - supabase/migrations/020_entitlement_idempotency.sql (own_entitlement_select).
 *   - lib/free/next-test.ts (analogo: constante con nombre + funcion pura
 *     separada del loader + SupabaseClient como parametro).
 */
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

import { FREE_PRODUCT_CODE } from "@/lib/free/next-test";

/** `product.code` del stack B2C Paid (seed `db/seeds/product-stack/paid`). */
export const PAID_PRODUCT_CODE = "paid";

/** Valor de `entitlement.status` que concede acceso (CHECK de la migracion 006). */
const ACTIVE_STATUS = "active";

/** Una fila de `product_stack` reducida a lo unico que el predicado necesita. */
export interface ProductStackMembership {
  product_code: string;
}

/**
 * ¿Este `instrument_version` exige acceso pagado?
 *
 * EL PREDICADO ES LA EXCLUSIVIDAD: pertenece al stack Paid **Y NO** al Free.
 *
 * Por que NO alcanza con "pertenece al stack Paid": por D-11, O*NET IP-SF y
 * PERMA-Profiler son el MISMO `instrument_version` en los dos stacks, asi que
 * tienen dos filas de `product_stack` que difieren solo en `product_code`. El
 * predicado ingenuo devolveria verdadero para ellos y mandaria al paywall a
 * todo usuario del Free — la ruta de adquisicion viva, que se despliega sola
 * desde la rama principal. El campo `layer` tampoco discrimina: esas filas
 * tienen capas distintas ('free' y 'core') para el mismo instrumento.
 *
 * FALLA ABIERTO a proposito: sin filas (instrumento no sembrado en ningun
 * stack, o lectura fallida) devuelve `false`. Fallar cerrado convertiria
 * cualquier hueco de seed en un paywall sobre la adquisicion. El guard protege
 * lo declarado como exclusivo, no lo desconocido.
 */
export function requiresPaidAccess(
  rows: readonly ProductStackMembership[],
): boolean {
  const codes = new Set(rows.map((r) => r.product_code));
  return codes.has(PAID_PRODUCT_CODE) && !codes.has(FREE_PRODUCT_CODE);
}

/**
 * Carga las membresias de `product_stack` de un `instrument_version`.
 *
 * Se consulta por `instrument_version_id`, NUNCA por el codigo del
 * instrumento: `[GAP-INSTRUMENT-CODE-CASING]` ya mordio en este repo, y ademas
 * la pregunta es sobre una VERSION, no sobre un nombre.
 *
 * `product_stack` tiene politica de lectura publica (`product_stack_public_select`,
 * `USING (true)` para `anon` y `authenticated`), asi que el cliente user-scoped
 * basta y el caso anonimo tambien funciona. No hace falta service_role.
 *
 * Devuelve `[]` ante error: combinado con el fallo abierto de
 * `requiresPaidAccess`, una base caida no paywallea el embudo del Free.
 */
export async function loadProductStackMemberships(
  // biome-ignore lint/suspicious/noExplicitAny: untyped Supabase client (no generated Database types yet)
  supabase: SupabaseClient<any, "public", any>,
  instrumentVersionId: string,
): Promise<ProductStackMembership[]> {
  const { data, error } = await supabase
    .from("product_stack")
    .select("product_code")
    .eq("instrument_version_id", instrumentVersionId);

  if (error || !data) return [];
  return data as ProductStackMembership[];
}

export interface EntitlementState {
  /** True solo con `status = 'active'` y sin vencimiento pasado. */
  active: boolean;
}

/**
 * ¿El usuario tiene acceso activo a `productCode`?
 *
 * Activo = `status` concedido Y (`expires_at` nulo O futuro). El B2C Paid es un
 * pago unico sin vencimiento, asi que `expires_at` sera nulo; la comprobacion
 * existe porque la columna admite vencimiento y una concesion temporal
 * (cortesia, B2B de la Fase 4) no debe sobrevivir a su fecha.
 *
 * `supabase` DEBE ser el cliente user-scoped: la politica
 * `own_entitlement_select` es lo que impide leer el acceso de otro.
 */
export async function resolveEntitlement(
  // biome-ignore lint/suspicious/noExplicitAny: untyped Supabase client (no generated Database types yet)
  supabase: SupabaseClient<any, "public", any>,
  userId: string,
  productCode: string = PAID_PRODUCT_CODE,
): Promise<EntitlementState> {
  const { data, error } = await supabase
    .from("entitlement")
    .select("status, expires_at")
    .eq("user_id", userId)
    .eq("product_code", productCode)
    .eq("status", ACTIVE_STATUS);

  if (error || !data) return { active: false };

  const rows = data as Array<{ status: string; expires_at: string | null }>;
  const now = Date.now();
  const active = rows.some(
    (r) =>
      r.status === ACTIVE_STATUS &&
      (r.expires_at == null || new Date(r.expires_at).getTime() > now),
  );

  return { active };
}
