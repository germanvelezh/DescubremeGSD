/**
 * El marcador de "llegue aca por la compuerta" (Plan 03-05 Task 3).
 *
 * El guard `solo-Paid` del runner redirige al paywall cuando el usuario pide un
 * instrumento que no tiene. El paywall necesita saberlo para mostrar UNA linea
 * neutra de contexto — y como la redireccion es un `redirect()` de servidor, el
 * unico canal disponible es la URL.
 *
 * ESTE MARCADOR NO ES UNA SENAL DE SEGURIDAD, Y NO PUEDE SERLO. Viaja en la URL,
 * asi que es entrada del cliente: cualquiera lo escribe a mano. Lo unico que
 * decide es **que copy se muestra**. No abre nada, no concede nada, no cambia
 * ninguna rama de acceso — todas esas siguen colgando de `resolveEntitlement`
 * leido de la base. Escribirlo a mano sin tener acceso solo consigue leer una
 * frase de contexto que no aplica.
 *
 * Vive en un modulo compartido para que el emisor (el runner) y el lector (el
 * paywall) no puedan divergir: dos literales iguales escritos en dos archivos
 * son dos literales que alguien va a cambiar en uno solo.
 *
 * Anchors:
 *   - 03-05-PLAN.md Task 3 paso 3.
 *   - 03-UI-SPEC.md §9 (Guard sin entitlement).
 */

/** Nombre del parametro de consulta. */
export const PAID_GATE_PARAM = "desde";

/** Valor que el runner emite al redirigir. */
export const PAID_GATE_VALUE = "test";

/** La ruta completa a la que redirige el guard del runner. */
export const PAID_GATE_REDIRECT = `/paid?${PAID_GATE_PARAM}=${PAID_GATE_VALUE}`;
