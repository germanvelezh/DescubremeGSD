# COWORK_PROMPTS_GATES_HUECOS_v1.0.md — intercambio sobre la auditoria de gates huecos

**Owner:** German Velez Hurtado.
**Fecha:** 2026-07-28.
**Origen:** accion derivada del ADR-037 ("auditar otros gates `skipped`"). Resultado documentado en `estado/BRIEF_Cowork_Auditoria_Gates_Huecos_v1.0.md` y en `[GAP-TESTS-INTEGRACION-HUECOS]` (P1).
**Estado:** el **prompt 1 ya se envio y Cowork respondio**. El **prompt 2 esta LISTO PARA ENVIAR** y espera el visto de German.

`Por que existe este archivo:` la respuesta de Cowork (§2) llego con una nota explicita — *"no lei el brief completo ni el codigo"*. Al verificar sus premisas contra el repo, **4 de sus posiciones descansan en datos que el codigo contradice**. El prompt 2 (§3) le devuelve la evidencia **antes** de que cierre el acta, porque registrarla ahora congelaria un orden basado en premisas falsas — que es exactamente el fallo que esta auditoria vino a documentar.

---

## 0. Contexto compartido (va al inicio de cada prompt)

> **Proyecto:** DescubreMe MVP — plataforma web de autoconocimiento profundo para adultos LATAM. No es clinico, no es diagnostico. Educativo, orientador, de desarrollo. Idioma es-CO neutro, tuteo cordial profesional.
>
> **Origen de la consulta:** la pidio Cowork. Al cerrar D3.3 (ADR-037) quedo la accion derivada "auditar otros gates `skipped`". La razon era precisa: un acceptance test `skipped` opero como guardia fantasma por tiempo indeterminado, el requisito verbatim que vigilaba se cayo, y nadie pudo notarlo porque el unico test que lo miraba estaba apagado.
>
> **Rol pedido a Cowork:** Investigador psicometrico senior + compliance (Ley 1581) y etica. **No necesita leer codigo.** La decision que se le pide es de **prioridad de riesgo** y de **vigencia de requisitos**, no tecnica.
>
> **Documento de respaldo:** `estado/BRIEF_Cowork_Auditoria_Gates_Huecos_v1.0.md`.

---

## 1. Prompt 1 — la consulta (ENVIADO)

**Tipo de entrega:** decision de prioridad + si/no a un cierre provisional + bandera de vigencia.
**Bloquea:** define como se cierra `[GAP-TESTS-INTEGRACION-HUECOS]`.

Contenido integro en `estado/BRIEF_Cowork_Auditoria_Gates_Huecos_v1.0.md`. Resumen de lo que se le planteo:

- **El hallazgo, en 3 estados:** un test puede *PASAR* (verifico y salio bien), estar en *SKIP* (se declara ausente, auditable) o ser **HUECO** (corre, dice "PASA", y no verifica nada). Se encontraron **24 huecos** en la suite de integracion; **18 reportan "PASA"** hoy en CI. Hasta la entrega 2 del CI estaban en SKIP, que era honesto: al agregarle base de datos al runner pasaron solos a verde. **La cifra de tests verdes subio y la verificacion real no cambio.**
- **Por que es asunto de Cowork:** los 18 no estan repartidos al azar. Vigilan **nominalmente** `COMPL-05/06/07/08/12/13/17`, `QUAL-06/08` y `FOUND-06` — **7 de 9 codigos son de compliance**.
- **Aclaracion incluida a proposito, para no invitar una respuesta de panico:** esto **no** dice que esas funcionalidades esten rotas; varias tienen cobertura por otras vias. Dice que **el test que se presenta como su guardia no lo es**.
- **Las 3 preguntas:** (1) orden de prioridad por riesgo, con un orden tentativo de ingenieria para corregir; (2) si acepta degradar los huecos a `it.todo` como cierre provisional (opcion B), explicitando que es honestidad de reporte y **no** progreso; (3) si algun criterio **ya no esta vigente** — un test hueco de un criterio muerto **se borra, no se implementa** (el caso D3.3).

---

## 2. Respuesta de Cowork (2026-07-28) — resumen para trazabilidad

**Principio que declaro usar:** severidad de dano (persona en el momento -> dato sensible/ley con violacion en curso -> fuga de PII -> derechos/arquitectura), **ajustada por control compensatorio existente** (a menor cobertura por otras vias, mas urge el test) y por vigencia.

`Nota:` el principio es correcto y es **exactamente el que se aplico para verificar**. Lo que fallo fueron las premisas sobre cuales controles compensatorios existen — informacion que solo estaba en el repo.

| Punto | Respuesta |
|---|---|
| **Orden** | `COMPL-12/13` #1 · `COMPL-08` #2 (subido sobre 07) · `COMPL-07/D1.5` #3 · `QUAL-08` #4 (subido sobre 17) · `COMPL-17` #5 **condicional a que RLS aisle por usuario en `/api/respond`** · `COMPL-05/06` #6 · `QUAL-06` verificar vigencia primero · `FOUND-06` ultimo |
| **Opcion B** | **Aceptada.** Argumento: un test hueco que dice PASA sobre un control de compliance **fabrica aseguramiento falso**, puede enganar una auditoria 1581 y a las propias decisiones. La caida 493 -> ~475 **corrige una cifra inflada por ficcion, no una regresion** |
| **3 condiciones sobre B** | (1) **meta-lint** que falle el CI ante test sin asercion real o con tautologia — arreglo de raiz, no de sintoma; (2) **extender el detector fuera de integracion** (18 es un piso, no el total); (3) mientras el guard de tier 1-2 siga hueco, **verificar manualmente una vez** contencion / revocacion / borrado y documentarlo |
| **Vigencia** | Candidato a **NO vigente: `QUAL-06`**. Inferencia: decision ipsativa-only, sin percentiles, "no hay baremo Colombia". Si ninguna superficie muestra salida normativa -> cadena muerta -> patron D3.3, se borra. `Dato que lo zanja (su pregunta):` ¿alguna superficie muestra output normativo, o el baremo se usa solo internamente? |
| **Vigentes** | Los otros 8, explicito. Invariantes legales o eticos; una decision de producto no los supera |
| **Su nota de metodo** | *"No lei el brief completo ni el codigo — no cambia el orden, que sale de principios de riesgo"* |
| **Su pregunta a German** | ¿Registro el acta como adenda de ADR en `Decision-docs/`? Una sola escritura si se confirma |

`Decision de German 2026-07-28:` **devolverle la evidencia primero**, y **no tocar codigo** hasta que el orden cierre.

---

## 3. Prompt 2 — seguimiento con las 5 correcciones (LISTO PARA ENVIAR)

### Prompt para Cowork (copy-paste):

```
SEGUIMIENTO — auditoría de gates huecos: 4 correcciones de premisa antes
del acta

Gracias por la respuesta. El principio que usás —severidad de daño ajustada
por control compensatorio existente— es el correcto, y es exactamente el que
apliqué para verificar. Por eso esto vuelve: dijiste que no leíste el código,
y al verificar los controles compensatorios uno por uno, CUATRO de tus
posiciones descansan en premisas que el repositorio contradice.

Ninguna corrección toca tu razonamiento. Todas corrigen el dato de entrada.
Con los datos reales, tu propio principio produce un orden distinto.

Registrar el acta ahora congelaría un orden basado en premisas falsas — que
es literalmente el fallo que esta auditoría vino a documentar. Por eso pido
que reordenes antes de escribirla.


CORRECCIÓN 1 — COMPL-08 no solo merece el #2: es el ÚNICO sin ningún
control compensatorio. Sube a #1.

Lo verificado:
  - El guard de consentimiento filtra por `revoked_at IS NULL`. O sea: si el
    consentimiento está revocado, la fila se excluye y la escritura debería
    bloquearse.
  - Ese mecanismo NO está verificado por ningún test. El archivo de tests
    del guard tiene 5 tests, y LOS CINCO fijan `revoked_at: null`. Ninguno
    ejercita jamás el estado revocado.
  - Busqué en TODA la suite un test que ponga `revoked_at` en no-nulo: el
    único lugar del repositorio que lo nombra en contexto de aserción es el
    propio test hueco.
  - Ningún E2E afirma bloqueo de escritura después de revocar.

Es decir: llegaste a #2 razonando desde principios, y el dato te respalda
más fuerte de lo que suponías. De los nueve criterios, este es el único con
cobertura real CERO.


CORRECCIÓN 2 — COMPL-17: la premisa (RLS) es falsa, pero la conclusión
mejora. No hay que implementarlo: es redundante.

Condicionaste su posición a "si se verifica que RLS aísla por usuario en
/api/respond". Verificado, y el resultado es doble:

  - RLS NO es el control ahí. La ruta usa cliente service-role, que
    BYPASSEA RLS por completo. Tu condicional no se podía cumplir como
    estaba planteado.
  - Pero el control existe y es más fuerte de lo que pedías: autorización
    explícita en la propia ruta (usuario autenticado debe coincidir con el
    dueño de la sesión; anónimo debe coincidir por cookie; si no, 403). Y
    ESTÁ TESTEADA DE VERDAD, en tests unitarios reales: uno afirma el 403
    ante un usuario distinto, y otro afirma el 400 cuando el body trae
    user_id inyectado — que es exactamente lo que el test hueco decía
    vigilar.

Conclusión: el test hueco de COMPL-17 DUPLICA cobertura que ya existe. No
es una brecha. Recomendación: borrarlo, no implementarlo.


CORRECCIÓN 3 — QUAL-08: la fuga de PII que vigila es estructuralmente
imposible. No hay que implementarlo.

  - La tabla de telemetría de baremo NO TIENE columna user_id. Verificado en
    dos lugares: el esquema del repositorio (con comentario explícito: "sin
    columna user_id por diseño", citando la mitigación T-01-08-02 de
    divulgación de información) y las columnas reales de producción (son
    cinco: id, versión del instrumento, país solicitado, baremo usado,
    timestamp).
  - Una escritura de user_id fallaría a nivel de base de datos. El control
    compensatorio es el esquema mismo, que es el control más fuerte posible.

Nota: el camino de escritura SÍ está vivo (producción tiene 138 eventos de
fallback), así que el test correría. Simplemente no puede fallar.

Recomendación: borrarlo, no implementarlo.


CORRECCIÓN 4 — QUAL-06 no está muerto. Cae en tu SEGUNDA rama, no en la
primera.

Tu inferencia era: "si ninguna superficie muestra salida normativa, la
cadena de fallback está muerta → criterio superado → se borra". La primera
mitad es correcta; la segunda no.

  - La cadena de baremo se EJECUTA en cada scoring. No es código muerto.
  - Su resultado alimenta una compuerta de visualización que SUPRIME los
    percentiles, porque el estado de validación LATAM está en "pendiente".
  - El microcopy del reporte le dice esto al usuario de forma explícita: que
    no se muestran percentiles porque no existe todavía un baremo validado
    para Colombia y no se muestran comparaciones que no se puedan respaldar.
  - Producción: 3 baremos cargados y 138 eventos de fallback. El camino se
    ejercita constantemente.

O sea: NO es el patrón D3.3 (allá la constante tenía cero consumidores). Es
una función diferida cuya maquinaria corre hoy con la salida deliberadamente
apagada. Vos misma diste la salida para este caso: "si es feature diferida
en roadmap, dejalo como pendiente de una función no lanzada y no inviertas
ahora". Eso aplica.


CORRECCIÓN 5 (menor, pero afecta tu #1) — COMPL-12/13 es el MEJOR cubierto
de los nueve.

  - Tiene cobertura real en 14 archivos, incluidos tests dedicados de la
    compuerta de contención, de los flags de malestar desacoplados, de la
    pantalla de cuidado, y un E2E de la compuerta crítica NFR-27.

PERO tu observación de fondo sigue siendo correcta y vale conservarla: "el
test debe cubrir el flujo guiado, no solo el banner aislado". El problema es
que implementar el test hueco de ética prueba EXACTAMENTE el banner aislado,
así que NO reduciría el riesgo que te preocupa. Ese riesgo ya tiene ticket
propio y abierto: [GAP-PERMA-CONTENTION-GUIDED-FLOW], P1. Tu preocupación es
válida; simplemente aterriza en otro lugar.


ORDEN RESULTANTE (aplicando TU principio con los datos reales)

  1o  COMPL-08        — control compensatorio: NINGUNO
  2o  COMPL-07/D1.5   — parcial: el E2E afirma el flujo de borrado y que el
                        usuario queda deslogueado, pero NO la completitud
                        del cascade (7 tablas + 3 anonimizadas + baja de
                        auth), que es justo lo que el test hueco reclamaba
  3o  COMPL-05/06     — más débil de lo que asumiste: el E2E solo afirma el
                        enlace de descarga, no el CONTENIDO de la respuesta.
                        RLS cubre la lectura cruzada, no la completitud del
                        export (derecho ARCO)
  4o  COMPL-12/13     — cobertura fuerte; el riesgo vivo está en otro ticket
  5o  FOUND-06        — sin consecuencia sobre persona ni ley

  NO IMPLEMENTAR (borrar el test hueco):
      COMPL-17        — redundante con tests unitarios reales existentes
      QUAL-08         — imposible por esquema

  NO INVERTIR AHORA (función diferida, no criterio muerto):
      QUAL-06

Resultado neto: 3 de los 9 no requieren escribir ningún test. El trabajo
real se concentra en tres criterios de Ley 1581, no en nueve.


LO QUE NO CAMBIA DE TU RESPUESTA

  - Opción B aceptada. Tu argumento (un test hueco sobre un control de
    compliance fabrica aseguramiento falso y puede engañar una auditoría
    1581) queda como está.
  - Tus 3 condiciones se aceptan. El meta-lint es implementable como una
    compuerta más: el proyecto ya tiene 15 gates de lint, así que es
    infraestructura existente, no nueva.
  - La secuencia sí se ajusta: no se degrada nada hasta cerrar el orden,
    porque 3 de los huecos son candidatos a BORRARSE y no a degradarse, y
    conviene una sola pasada.


DETALLE DE UBICACIÓN

Proponés registrar en `Decision-docs/`. Ese directorio no existe en este
repositorio. Los ADR viven todos en `estado/DECISIONS_LOG.md` (van 37, el
último es ADR-038). El acta debería ir ahí como ADR-039.


LO QUE SE TE PIDE AHORA (una sola respuesta)

  1. Confirmá o corregí el orden resultante de arriba.
  2. Confirmá las 3 exclusiones: COMPL-17 y QUAL-08 se borran (no se
     implementan), QUAL-06 queda como pendiente de función no lanzada.
  3. Con eso, el acta se puede cerrar. Decí si la escribís vos como ADR-039
     en estado/DECISIONS_LOG.md, o si preferís que la redacte ingeniería
     citando tu razonamiento.

Toda la evidencia de las 5 correcciones es verificable en el repositorio;
si querés las rutas y números de línea exactos, se los pido a ingeniería.
```

---

## 4. Evidencia de las 5 correcciones (rutas y lineas — para ingenieria, no va en el prompt)

El prompt 2 se escribio **sin rutas ni numeros de linea a proposito**: Cowork no lee codigo y el detalle le anade ruido sin cambiar su decision. Queda aca por si lo pide.

| # | Afirmacion | Evidencia verificada |
|---|---|---|
| 1 | El guard filtra por revocacion | `lib/consent/guard.ts:64` -> `.is("revoked_at", null)` |
| 1 | Los 5 tests del guard fijan `revoked_at: null` | `tests/unit/consent/guard.test.ts` lineas 35, 56, 77, 111 (+ los 5 nombres de test: ninguno menciona revocacion) |
| 1 | El unico `revoked_at` no-nulo en asercion es el test hueco | grep en todo `tests/`: solo `tests/integration/consent-revoke.test.ts:48` y `:53`, que **es** el hueco. `relations.test.ts:124` solo afirma que la **columna existe** |
| 1 | Ningun E2E afirma bloqueo post-revocacion | grep `revoke` + `block/forbid/403/denied` en `tests/e2e/*.spec.ts` -> vacio. `account-delete-2-clicks.spec.ts:166` es UI (modal + chip), no bloqueo |
| 2 | `/api/respond` bypassea RLS | `app/api/respond/route.ts:89` -> `getSupabaseAdminClient()` (import en `:53`) |
| 2 | La autorizacion vive en la ruta | `route.ts:109-142` (anonimo por cookie; autenticado por `user.id === session.user_id`; si no, **403**) |
| 2 | El 403 cross-user esta testeado de verdad | `tests/unit/api/respond-multiscale.test.ts:269-276` — *"getUser returns a different user -> forbidden"*, `expect(...).toBe(403)` |
| 2 | El 400 por `user_id` extra esta testeado de verdad | mismo archivo, Test 6 en `:331` — *"body con user_id extra -> 400 (.strict() intacto)"* |
| 3 | La tabla de telemetria no tiene `user_id` | `db/schema/baremo-fallback-event.ts:3-4` (comentario de diseno, mitigacion T-01-08-02) **y** columnas reales de prod: `id, instrument_version_id, country_requested, baremo_used, occurred_at` |
| 3 | El camino de escritura esta vivo | prod: **138** filas en `baremo_fallback_event` |
| 4 | La cadena de baremo se ejecuta | `lib/scoring/score-session.ts:349` -> `selectBaremo(...)`, dentro del loop por dimension |
| 4 | Su salida alimenta la compuerta de percentiles | `score-session.ts:366` -> `shouldShowPercentile({alpha, baremoPopulation, latamStatus})`; gate en `lib/baremo/selector.ts:158` |
| 4 | La compuerta suprime hoy | `latamStatus` = `'pending'` salvo `psychometric_status.latam_status === 'validated'` (`score-session.ts:363`) |
| 4 | El usuario lo ve dicho | `lib/i18n/microcopy/es-CO/report.ts:56` y `:84`; `FichaTecnica.tsx:15` documenta que QUAL-02 suprime percentiles |
| 4 | Prod ejercita el fallback | 3 filas en `baremo`, 138 en `baremo_fallback_event`, 187 en `computed_score` |
| 5 | COMPL-12/13 tiene cobertura real amplia | 14 archivos en `tests/` referencian la superficie de etica/contencion, incl. `lib/free/contention-gate.test.ts`, `tests/unit/ethics/decoupled-flags.test.ts`, `tests/integration/perma-care-screen.test.tsx`, `tests/e2e/free-critical-gates.spec.ts` (compuerta NFR-27) |
| orden 2 | El E2E de borrado no afirma el cascade | `tests/e2e/account-delete-2-clicks.spec.ts:42` afirma flujo de 2 clics + redirect a `/signup` (deslogueado). Sin asercion sobre 7 tablas / 3 anonimizadas / baja de auth |
| orden 3 | COMPL-05 solo afirma el enlace | mismo archivo `:144-159` — *"Descargar todos mis datos triggers GET /api/me/data"* afirma `toHaveAttribute("href", "/api/me/data")`, **no** el contenido de la respuesta |

`Advertencia de alcance, la misma del brief:` esta verificacion cubrio los **controles compensatorios de los 9 codigos**. **No** se barrio `tests/unit/` buscando mas tests huecos — sigue vigente la condicion 2 de Cowork (18 es un piso, no el total).

---

*Fin. Version 1.0 — 2026-07-28. Actualizar cuando Cowork responda el prompt 2 y se cierre el ADR-039.*
