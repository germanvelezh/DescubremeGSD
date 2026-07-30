/**
 * Microcopy es-CO del B2C Paid (Plan 03-01, Fase 3).
 *
 * Valores v0.1 de `03-UI-SPEC.md` §Copywriting Contract. **Cowork firma la
 * version final**: cambia el VALOR, nunca el ID (03-UI-SPEC A13).
 *
 * SOLO estan aca los IDs que este plan consume. El paywall completo de 8 pasos,
 * el aviso de reuso y los toggles de add-on son el plan 03-05 y traen los suyos.
 *
 * Registro: **tuteo cordial es-CO**. Sin voseo rioplatense, que el glosario
 * COMPL-18 ahora marca en rojo. Sin urgencia, sin costo hundido, sin minimizar
 * la duracion real del stack.
 *
 * Este archivo esta dentro de los SCAN_DIRS del gate de frases prohibidas, asi
 * que cada linea de aca la revisa `npm run test:lint` — **incluidos los
 * comentarios**. Por eso esta nota describe las formas prohibidas en vez de
 * escribirlas: citarlas como ejemplo pone el archivo en rojo, y la salida
 * correcta es reformular la nota, no relajar el gate. Los ejemplos literales
 * viven en `tests/lint/prohibited-phrases.test.ts`, que no esta bajo SCAN_DIRS.
 *
 * Anchors:
 *   - 03-UI-SPEC.md §Copywriting Contract (los valores v0.1).
 *   - lib/lint/prohibited-phrases.ts (el gate que las vigila).
 *   - lib/i18n/microcopy/es-CO/test.ts (convencion: MC_* y funciones para las
 *     cadenas parametrizadas).
 */

/** Titulo del paywall. Sin superlativos ni promesa de resultado. */
export const MC_PAID_TITLE = "Tu perfil profundo";

/**
 * CTA primario. **Nombra el cobro**: el boton nunca esconde que se paga.
 * `precio` llega ya formateado con nombre de moneda (`formatPaidAmount`).
 */
export const MC_PAID_CTA_PRIMARY = (precio: string): string =>
  `Pagar ${precio} y empezar`;

/** Equivalencia en la otra moneda. Va como `caption`, nunca como precio. */
export const MC_PAID_PRICE_REFERENCE = (moneda: string, monto: string): string =>
  `Equivalente: ${monto} ${moneda}`;

/** Que pasa despues de pagar. Cumple el anti-goal de suscripcion (AF-10). */
export const MC_PAID_AFTER_PURCHASE =
  "Después de pagar entras directo al primer instrumento. No hay suscripción ni cobros siguientes.";

/** Confirmacion. Sereno, sin celebracion desproporcionada. */
export const MC_PAID_SUCCESS_TITLE = "Listo, ya lo tienes";

/**
 * Estado de confirmacion en curso en `/paid/gracias`.
 *
 * Existe porque volver de Stripe NO es prueba de pago: la prueba es el webhook
 * firmado, que puede llegar unos segundos despues. Sin este estado, quien
 * acaba de pagar veria el paywall otra vez — el peor momento posible para
 * sugerirle que no pago.
 */
export const MC_PAID_CONFIRMING_TITLE = "Estamos confirmando tu pago";

export const MC_PAID_CONFIRMING_BODY =
  "Puede tardar unos segundos. Tu pago ya se procesó; falta que nos llegue la confirmación.";

/** Accion explicita para volver a mirar. */
export const MC_PAID_CONFIRMING_RETRY = "Volver a revisar";

/** Enlace al stack una vez concedido el acceso. */
export const MC_PAID_START_CTA = "Empezar el perfil profundo";

/**
 * Fallo al abrir el Checkout. Sin culpar al usuario y sin urgencia: no se
 * cobro nada, asi que el mensaje no debe alarmar ni presionar.
 */
export const MC_PAID_CHECKOUT_ERROR =
  "No pudimos abrir la pantalla de pago y no te cobramos nada. Puedes intentarlo de nuevo.";
