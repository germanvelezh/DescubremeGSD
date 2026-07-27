# ADR-036 — Deploy-smoke de la banda unica de TwIVI en prod

**Fecha:** 2026-07-27 · **Ejecuto:** Claude Code (Chrome) · **Prod:** descubreme.co
**Deploy:** `descubreme-6maeuitjf` (target production, READY) = `main 7e347da` (merges de PR #29 codigo + PR #30 docs).
**Cuenta conducida:** `germanvelezh+permacare1@gmail.com` — la sesion ya estaba viva en el navegador (no hizo falta magic link, asi que el gotcha de PKCE no se ejercito).
**Reporte:** `/reporte/96fe99d5-3094-4c3f-95bb-e65305d088d5` — **la snapshot exacta del ADR**, la misma sobre la que se verifico la aritmetica.
**Objetivo:** verificar en prod ADR-036 mitad **B** (el circumplejo lee `bands_by_dim` en vez de recomputar) y que la contradiccion del reporte de Valores este cerrada.

---

## Veredicto

**A+B PASAN. ADR-036 cerrado end-to-end en produccion.**

- **B** (el circumplejo lee `bands_by_dim`): verificado sobre la snapshot del ADR — la contradiccion que
  encontro el smoke de #24 esta muerta (§1).
- **A** (el scoring bandea por z): verificado con una **corrida nueva de TwIVI** que reproduce el perfil
  del ADR. Misma entrada, distinta banda, exactamente en la celda predicha (§3).
- **ADR-034 intacto** en las dos corridas: radios `70 / 51.6 / 47 / 36.3` (§2).
- **Las narrativas MEDIO, que eran contenido muerto, renderizan** (§3.3).

**El check fue de UNA CELDA, no de coherencia general.** Es la parte que importa del diseño de este
smoke: sobre esta snapshot, la regla vieja (signo) y la nueva (z) **coinciden en 3 de las 4
dimensiones**. Solo `SEN` las separa. Un chequeo de "la pagina es coherente consigo misma" habria
pasado **igual con el bug puesto**; solo la prediccion de que se mueve `Destacar` y **nada mas** es
falsable.

---

## 1. La tabla `sr-only` del circumplejo (medida en el arbol de accesibilidad)

`bands_by_dim` de la snapshot: `{"CSV":"BAJO","OCH":"ALTO","SEN":"BAJO","STR":"MEDIO"}`

| Dimension | `bands_by_dim` (lo guardado) | Circulo AHORA | Circulo PRE-FIX (recalculo z) | Narrativa (siempre salio de `bands_by_dim`) |
|---|---|---|---|---|
| Explorar · OCH | ALTO | **Alto** | Alto (z +1.54) | "la apertura al cambio pesa **mas**" |
| Aportar · STR | MEDIO | **Medio** | Medio (z +0.03) | "pesa de forma **pareja**" |
| **Destacar · SEN** | **BAJO** | **Bajo** | **Medio** (z −0.35) ← LA CONTRADICCION | "el logro personal pesa **menos**" |
| Conservar · CSV | BAJO | **Bajo** | Bajo (z −1.23) | "el orden establecido pesa **menos**" |

Se movio **una sola celda**, exactamente la predicha. Las cuatro filas de la tabla reproducen ahora
`bands_by_dim` verbatim.

El sintoma textual de #24 —`Destacar → Medio` junto a "el logro personal pesa menos"— ya no existe.

**La otra superficie a11y tambien:** el `<desc>` del SVG dice completo *"Tus prioridades de valores,
relativas a tu propio perfil. Explorar: banda Alto. Aportar: banda Medio. Destacar: banda Bajo.
Conservar: banda Bajo."* — consistente con la tabla y con la narrativa.

`Nota de metodo:` la tabla se leyo por el **arbol de accesibilidad**, no por `innerText`. Es la
superficie que el ADR señala como el lugar donde la contradiccion se veia entera, y segun como este
implementado el `sr-only` el texto plano puede o no incluirla — un falso verde ahi habria sido
invisible. Sigue pendiente ejercitarla con un lector real (`[GAP-A11Y-LECTOR-PANTALLA-REAL]` P2).

---

## 2. Regresion de forma: ADR-034 intacto

B no debia mover el dibujo, solo la banda. Geometria leida del SVG (`viewBox 0 0 200 200`, centro
100,100), radio = distancia del centro a la punta de cada sector:

| Direccion | Media HOV cruda | Proporcion `(x−1)/5` | Radio dibujado | Radio en el smoke de ADR-034 (24/7) |
|---|---|---|---|---|
| Explorar · OCH (arriba) | 6.0 | 1.000 | **70** | 70 |
| Aportar · STR (derecha) | 4.0 | 0.600 | **51.6** | 51.6 |
| Destacar · SEN (izquierda) | 3.5 | 0.500 | **47** | 47 |
| Conservar · CSV (abajo) | 2.333 | 0.267 | **36.3** | 36.3 |

**Identicos digito por digito** a la corrida anterior. El radio sigue siendo escala fija sobre la media
cruda y ninguna direccion colapsa a cero. B cambio la banda y nada mas.

---

## 3. La mitad A — corrida NUEVA de TwIVI

### 3.1 Por que hizo falta una corrida nueva

Las **6 snapshots TwIVI previas** guardan bandas de la era del signo. Eso es el resultado **diseñado**
de A+B, no una omision: es justo la propiedad que hace innecesaria la migracion. Ningun reporte
existente puede ejercitar la regla de **escritura**; solo la de lectura.

Tampoco habia atajo por UI: `getOrCreateAuthenticatedSession` (`lib/session/authenticated.ts:93-106`)
devuelve **siempre** la sesion existente mas reciente para ese par usuario+version. (El schema si
permitiria una segunda: `assessment_session` no tiene constraint unico sobre
`user_id + instrument_version_id`, solo PK y `anonymous_session_id`.)

**NO se toco ninguna ruta `/done` de una sesion vieja** para forzar re-scoreo: el ADR lo deja fuera de
alcance y un overwrite habria destruido la evidencia que hace coherentes a los 6 reportes.

### 3.2 Como se corrio (Ruta 1)

Cuenta **nueva**: `germanvelezh+adr036@gmail.com` (uid `17f1fa6c`), signup hecho por German desde la
misma ventana de Chrome (Ley 1581 + PKCE). Aterrizaje en `/onboarding/mapa` (ruta de usuario fresco) y
**navegacion directa a `/test/twivi`** — el runner resuelve el codigo de la URL y no fuerza el orden
del stack, asi que no hubo que pasar por BFI (30) ni O*NET (60): 20 items en vez de 110.

Hoja de respuestas = el patron de 10 valores repetido dos veces, escala 1-6:
`2,2,4,4,6,6,6,4,3,3` × 2. Reproduce el perfil del ADR.

`Metodo:` conducido por el **numero de item real** leido de "Vas en N de 20" en cada vuelta, no por
secuencia ciega — si un avance se perdiera, el driver se autocorrige en vez de desalinear la hoja
entera. Click programatico sobre el radio, cero coordenadas y cero teclado con `repeat`. Los stems
confirmaron en vivo el mapeo del seed dimension por dimension (item 1 = CO "respeto a mayores",
item 7 = HE "diversion", item 9 = PO "quien toma las decisiones", ...).

### 3.3 El resultado: misma entrada, distinta banda

Sesion `c98e28e0`, `status=completed`, 20/20 respuestas.

| | 3 snapshots viejas (misma entrada) | **Snapshot NUEVA `c98e28e0`** |
|---|---|---|
| `scores_by_dim` | AC4 BE4 CO2 HE6 PO3 SD6 SE3 ST6 TR2 UN4 | **identico** |
| OCH | ALTO | ALTO |
| STR | MEDIO | MEDIO |
| **SEN** | **BAJO** (regla de signo) | **MEDIO** (regla z) |
| CSV | BAJO | BAJO |

**Entrada byte-identica, salida distinta exactamente en la celda predicha.** No hay aritmetica
intermedia que auditar: el delta entre las dos filas *es* la prueba de A. Reusar el perfil del ADR fue
deliberado justamente por esto — cualquier otro perfil habria exigido recalcular la z a mano para
interpretar el resultado.

**Y la consecuencia que motivaba el ADR, visible en pantalla:** la narrativa de Destacar en el reporte
nuevo dice *"La autopromocion pesa de forma **pareja** con tus otras prioridades: te interesa avanzar,
sin que eso defina toda tu identidad."* Ese texto **era contenido muerto**: con el test de signo, SEN
solo podia salir ALTO o BAJO, asi que la variante MEDIO del seed no tenia forma de renderizar jamas. En
el reporte viejo con los mismos puntajes, esa misma dimension decia *"el logro personal pesa menos"*.

Las dos superficies del reporte nuevo coinciden entre si y con `bands_by_dim`: tabla `sr-only`
= Explorar Alto · Aportar Medio · **Destacar Medio** · Conservar Bajo, y el `<desc>` igual. Radios
`70 / 51.6 / 47 / 36.3` — sin cambio, como debe ser (el radio depende de los puntajes crudos, que son
los mismos).

---

## 4. Costo y hallazgos laterales

**Costo:** 2 correos transaccionales (uno por reporte abierto: el de permacare1 para B, el nuevo para A)
+ 1 magic link del signup.

**Sin hallazgos nuevos.** Se confirmo que `[GAP-FICHA-WHAT-MEASURES-ES-CO]` P2 sigue vivo — la ficha
tecnica de TwIVI dice "pesan mas para **vos**" en prod. Ya estaba flageado desde el smoke de #24; no
es hallazgo de esta corrida.

Conducido con lectura de DOM/a11y y JS programatico, cero coordenadas y cero teclado con `repeat`.
Bandas verificadas contra la DB (`report_snapshot.html_payload`), no solo contra el DOM.

---

## 5. Que queda

**De ADR-036, nada.** A y B verificados en prod, el flag `[GAP-TWIVI-BAND-DEFINICION-DOBLE]` se cierra.

Sigue abierto, ajeno a este ADR:

- `[GAP-A11Y-LECTOR-PANTALLA-REAL]` P2 — la tabla `sr-only` se leyo por el arbol de accesibilidad, que
  es un proxy honesto pero no un lector real. Sigue sin ejercitarse con VoiceOver/NVDA.
- `[GAP-FICHA-WHAT-MEASURES-ES-CO]` P2 — reseed de la ficha (muta prod, requiere OK). **Confirmado
  vivo** en las dos corridas: la ficha de TwIVI dice "pesan mas para **vos**".
- **Entrega 2 del CI** — las 9 fallas E2E, 5 archivos. Es la deuda mas grande del repo.

`Nota:` la cuenta `germanvelezh+adr036@gmail.com` queda viva con **una sola** sesion (TwIVI). No se
completo el resto del Free, asi que no sirve como cobertura del hueco "corrida de 4 tests nueva", que
sigue abierto.

---

*Fin del doc. Referencia: ADR-036 en `estado/DECISIONS_LOG.md`; flag `[GAP-TWIVI-BAND-DEFINICION-DOBLE]`; PR #29.*
