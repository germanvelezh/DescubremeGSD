# ADR-036 — Deploy-smoke de la banda unica de TwIVI en prod

**Fecha:** 2026-07-27 · **Ejecuto:** Claude Code (Chrome) · **Prod:** descubreme.co
**Deploy:** `descubreme-6maeuitjf` (target production, READY) = `main 7e347da` (merges de PR #29 codigo + PR #30 docs).
**Cuenta conducida:** `germanvelezh+permacare1@gmail.com` — la sesion ya estaba viva en el navegador (no hizo falta magic link, asi que el gotcha de PKCE no se ejercito).
**Reporte:** `/reporte/96fe99d5-3094-4c3f-95bb-e65305d088d5` — **la snapshot exacta del ADR**, la misma sobre la que se verifico la aritmetica.
**Objetivo:** verificar en prod ADR-036 mitad **B** (el circumplejo lee `bands_by_dim` en vez de recomputar) y que la contradiccion del reporte de Valores este cerrada.

---

## Veredicto

**B PASA.** La contradiccion que encontro el smoke de #24 esta muerta: el circulo y la narrativa de la
misma dimension por fin dicen lo mismo. **A NO queda verificado en prod** — no por un defecto, sino
porque es imposible verificarlo sobre un reporte existente (ver §3).

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

## 3. Por que A no se puede verificar aca (y no es un hueco)

Las **6 snapshots TwIVI vivas** guardan bandas de la era del signo. Eso es el resultado **diseñado** de
A+B, no una omision: es justo la propiedad que hace innecesaria la migracion (cada reporte coherente
consigo mismo). Este reporte confirma que el circulo **lee** lo guardado; por construccion no puede
decir nada sobre que regla usa el scoring al **escribir**.

Verificar A exige una **sesion NUEVA de TwIVI**. Y no hay atajo por UI:
`getOrCreateAuthenticatedSession` (`lib/session/authenticated.ts:93-106`) devuelve **siempre** la
sesion existente mas reciente para ese par usuario+version, asi que un usuario que ya completo TwIVI no
puede abrir una segunda por la aplicacion. (El schema si lo permitiria: `assessment_session` no tiene
constraint unico sobre `user_id + instrument_version_id`, solo PK y `anonymous_session_id`.)

**NO se intento** navegar a ninguna ruta `/done` para forzar un re-scoreo: el ADR y el brief lo dejan
fuera de alcance sin consulta previa, y un overwrite accidental destruiria justamente la evidencia que
hace estos 6 reportes coherentes.

A esta pineado a nivel unitario con el `scores_by_dim` real de esta misma snapshot
(`tests/unit/scoring/twivi-mrat-fixture.test.ts`, bloque ADR-036), incluyendo el delta de `SEN`
(`bandFromMrat` → BAJO vs regla nueva → MEDIO). En **produccion sigue sin ejercitar**.

---

## 4. Costo y hallazgos laterales

**Costo:** 1 correo (abrir un reporte dispara el transaccional).

**Sin hallazgos nuevos.** Se confirmo que `[GAP-FICHA-WHAT-MEASURES-ES-CO]` P2 sigue vivo — la ficha
tecnica de TwIVI dice "pesan mas para **vos**" en prod. Ya estaba flageado desde el smoke de #24; no
es hallazgo de esta corrida.

Conducido con lectura de DOM/a11y y JS programatico, cero coordenadas y cero teclado con `repeat`.
Bandas verificadas contra la DB (`report_snapshot.html_payload`), no solo contra el DOM.

---

## 5. Que queda

- **Cerrar A** — requiere corrida nueva de TwIVI. Opciones y costo en el bloque PM-14 de `STATUS.md`.
  Decision de German: implica signup (Ley 1581) o escritura en prod.
- `[GAP-A11Y-LECTOR-PANTALLA-REAL]` P2 — la tabla `sr-only` sigue sin ejercitarse con un lector real.
- `[GAP-FICHA-WHAT-MEASURES-ES-CO]` P2 — reseed de la ficha (muta prod, requiere OK).

---

*Fin del doc. Referencia: ADR-036 en `estado/DECISIONS_LOG.md`; flag `[GAP-TWIVI-BAND-DEFINICION-DOBLE]`; PR #29.*
