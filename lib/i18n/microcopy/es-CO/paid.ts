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
 * Bajada del paywall. Sin promesa de resultado y **sin cifra de instrumentos
 * escrita a mano**: cuantos son sale del dato, y una cifra fija aca envejeceria
 * mal cada vez que un plan siembra el suyo.
 */
export const MC_PAID_SUBTITLE =
  "Instrumentos con evidencia psicométrica, respondidos a tu ritmo.";

/** Encabezado del paso 2 del orden de lectura: la tabla del stack. */
export const MC_PAID_STACK_HEADING = "Qué vas a responder";

/**
 * Nombre accesible de una fila del stack. Lleva las tres cifras juntas para que
 * un lector de pantalla no tenga que reconstruirlas de tres celdas sueltas.
 */
export const MC_PAID_STACK_ROW_ARIA = (
  label: string,
  items: number,
  minutos: number,
): string => `${label}: ${items} ítems, unos ${minutos} minutos`;

/**
 * Marca de fila cubierta. Va SIEMPRE acompanando al punto de acento: la banda
 * de informacion no puede comunicarse solo por color (WCAG 1.4.1).
 */
export const MC_PAID_STACK_ROW_REUSED = "Ya respondido";

/** Marca de fila parcialmente cubierta: el numero real, no una etiqueta vaga. */
export const MC_PAID_STACK_ROW_PARTIAL = (hechos: number, total: number): string =>
  `Ya respondiste ${hechos} de ${total}`;

/**
 * Total honesto (paso 4). Es la suma EXACTA de lo que la tabla muestra menos lo
 * que el usuario ya respondio. Sin redondeo a favor.
 */
export const MC_PAID_TOTAL = (items: number, minutos: number): string =>
  `${items} ítems en total, unos ${minutos} minutos.`;

/**
 * Que el stack se puede partir en varios ratos.
 *
 * `Sin estadistica inventada:` no dice cuantos ratos toma "la mayoria". No hay
 * datos — ningun usuario ha pagado todavia — y una cifra de aire seria una
 * afirmacion de producto que nadie puede sostener.
 */
export const MC_PAID_SESSIONS_NOTE =
  "Puedes hacerlo en varios ratos: cada respuesta se guarda sola y paras donde quieras.";

/**
 * Aviso de reuso, estados PARCIAL y COMPLETO.
 *
 * **Se enuncia como volumen restante, y eso no es un detalle de estilo.** El
 * discuss de la fase rechazo explicitamente la version-palanca (la que apela a
 * lo que el usuario ya invirtio): el reuso es INFORMACION para decidir, no
 * presion para cerrar. Por eso la frase termina en cuanto le queda, que es el
 * dato que le sirve, y no en cuanto lleva hecho, que es el que nos serviria a
 * nosotros.
 */
export const MC_PAID_REUSE_PARTIAL = (hechos: number, faltan: number): string =>
  `Ya respondiste ${hechos} de estos ítems en el Free. Te quedan ${faltan}.`;

/** Encabezado del paso 5. Pregunta abierta, sin empujar a decir que si. */
export const MC_PAID_ADDONS_HEADING = "¿Quieres agregar algo más?";

/** Costo de un add-on, en las dos unidades que el usuario compara. */
export const MC_PAID_ADDON_COST = (items: number, minutos: number): string =>
  `${items} ítems, unos ${minutos} minutos`;

/**
 * Add-on declarado pero todavia sin material para responderlo.
 *
 * Dice las dos cosas que importan: que no esta listo, y que anadirlo despues no
 * cuesta otro pago. Sin la segunda, un usuario podria posponer la compra para
 * "esperar a que este completo".
 */
export const MC_PAID_ADDON_UNAVAILABLE =
  "Todavía no está listo. Cuando lo esté, lo vas a poder agregar sin pagar de nuevo.";

/**
 * D-11 — la nota que evita una sorpresa de volumen DESPUES de pagar.
 *
 * Se muestra en la fila de un constructo que el Free ya mide con OTRO
 * instrumento. No hay llave de proyeccion entre los dos, asi que no hay nada que
 * reutilizar: la fila se responde completa. Un silencio ahi dejaria que quien
 * termino el Free infiera un ahorro que no existe.
 */
export const MC_PAID_REUSE_VALUES_NOTE =
  "Este se responde completo: el test corto del Free mide lo mismo con otro instrumento y no se reutiliza.";

/** Encabezado del pie de compra (paso 8). */
export const MC_PAID_PRIVACY_LINK = "Cómo tratamos tus datos";

/**
 * Estado NO DISPONIBLE del paywall.
 *
 * Se muestra cuando el stack no se puede leer completo. **Es la alternativa a
 * mostrar una lista corta con un precio al lado**, que le prometeria al usuario
 * un volumen equivocado y se lo cobraria. No culpa al usuario ni promete fecha.
 */
export const MC_PAID_UNAVAILABLE_TITLE = "El perfil profundo no está disponible ahora";

export const MC_PAID_UNAVAILABLE_BODY =
  "No podemos mostrarte todo lo que incluye, así que preferimos no cobrarte a medias. Vuelve a intentarlo en un rato.";

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

/**
 * Accion explicita para volver a mirar.
 *
 * `Sobrevive al reintento automatico del plan 03-05, a proposito:` el reintento
 * corre en el cliente, asi que una pestana suspendida o una red intermitente lo
 * dejan sin efecto sin avisar. Sin este enlace, ese usuario se queda mirando
 * "confirmando" sin nada que hacer. Es la salida manual del automatismo.
 */
export const MC_PAID_CONFIRMING_RETRY = "Volver a revisar";

/** Enlace al stack una vez concedido el acceso. */
export const MC_PAID_START_CTA = "Empezar el perfil profundo";

/**
 * Buzon al que escribir si la confirmacion se demora.
 *
 * `[GAP-FASE3-CONTACTO-SOPORTE-PAGOS]`: es el buzon de PRIVACIDAD que ya vive
 * en el texto de consentimiento — la unica direccion real y atendida del
 * producto. Se reusa a proposito en vez de inventar una de soporte que nadie
 * lee: una direccion inventada convierte "dile a donde escribir" en un callejon
 * sin salida. **Abrir un buzon propio de pagos es decision de German.**
 */
export const MC_PAID_SUPPORT_EMAIL = "descubreme.privacidad@descubreme.co";

/**
 * Confirmacion demorada. Aparece cuando el reintento automatico se agoto.
 *
 * Dice QUE HACER y A DONDE ESCRIBIR, y **no afirma que el pago fallo**: no lo
 * sabemos. Lo unico que sabemos es que la confirmacion todavia no llego, y
 * decir mas seria inventar. Tampoco se queda girando en silencio, que es la
 * otra forma de abandonar al usuario en esta pantalla.
 */
export const MC_PAID_CONFIRMING_DELAYED_TITLE =
  "La confirmación se está demorando más de lo normal";

export const MC_PAID_CONFIRMING_DELAYED_BODY = (correo: string): string =>
  `Si pagaste, tu acceso va a aparecer solo: no hace falta volver a pagar. Si quieres que lo revisemos, escríbenos a ${correo} y te respondemos.`;

/**
 * `/paid/cancelado`. Las dos afirmaciones que el usuario necesita leer son que
 * **no se le cobro nada** y que **no perdio lo que ya respondio**. Sin lenguaje
 * de culpa, de perdida ni de reintento urgente, y sin una segunda pantalla que
 * le pregunte si esta seguro de irse.
 */
export const MC_PAID_CANCELLED_TITLE = "No completaste el pago";

export const MC_PAID_CANCELLED_BODY =
  "No te cobramos nada y no perdiste nada de lo que ya respondiste. Puedes volver cuando quieras.";

export const MC_PAID_CANCELLED_BACK = "Ver qué incluye el perfil profundo";

/**
 * Llegada al paywall por la compuerta del runner.
 *
 * **Ni un mensaje de error ni uno de bloqueo.** Una linea neutra que explica por
 * que esta ahi y pasa a lo util. Nada de "acceso denegado" y ningun color
 * destructivo: el usuario no hizo nada malo, simplemente pidio algo que todavia
 * no tiene.
 */
export const MC_PAID_GATE_NOTICE =
  "Para responder ese instrumento necesitas el perfil profundo. Acá está lo que incluye.";

/**
 * Quien YA tiene el acceso y llega al paywall. Impide el doble cobro visual:
 * en vez del CTA de pago ve por donde seguir.
 */
export const MC_PAID_ALREADY_OWNED = "Ya tienes el perfil profundo.";

export const MC_PAID_ALREADY_OWNED_CTA = "Continuar donde ibas";

/**
 * Enlace de upsell desde la superficie nocturna del perfil integrado.
 * Sin urgencia y sin prometer un resultado: nombra el destino, no una promesa.
 */
export const MC_PAID_UPSELL_LINK = "Ver qué incluye el perfil profundo";

/**
 * Fallo al abrir el Checkout. Sin culpar al usuario y sin urgencia: no se
 * cobro nada, asi que el mensaje no debe alarmar ni presionar.
 */
export const MC_PAID_CHECKOUT_ERROR =
  "No pudimos abrir la pantalla de pago y no te cobramos nada. Puedes intentarlo de nuevo.";
