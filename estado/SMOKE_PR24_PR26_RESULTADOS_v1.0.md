# SMOKE PR #24 (narrativa Valores + ficha) y PR #26 (teaser es-CO) — RESULTADOS

**Fecha:** 2026-07-27
**Deploy:** prod `www.descubreme.co`, `dpl_4hMwvMaDKY7a1Rhg2jucu7Z8WXWx` = `main f6defd8` (READY). Incluye #24 `f61e4a9`, #25 `2c0bd2b`, #26 `2036851`; los dos commits por encima (`31edba2`, `f6defd8`) son solo-docs.
**Cuenta:** `germanvelezh+permacare1@gmail.com` (4 tests completos; unica con `showContention:true`)
**Conduccion:** Claude Code (Chrome MCP, click/JS programatico), medicion en el DOM real + verificacion contra la DB de prod via MCP.

`Nota de arranque:` la ventana de Chrome ya traia sesion viva de `permacare1`, asi que **no hubo que pedir magic link** — el gotcha de PKCE no se ejercito esta corrida. La identidad se confirmo leyendo el campo email de `/me/data` y cruzando los 4 `href` de reporte contra los `session_id` de la DB.

---

## 1. Resultados de los checks pedidos

| # | Check | Veredicto | Evidencia medida |
|---|---|---|---|
| A | **Narrativa de Valores — `[GAP-TWIVI-REPORT-NARRATIVE-EMPTY]`** | **PASA** | "Que sugiere esto sobre ti" trae **4 parrafos**, y cada uno empareja con su banda real de `bands_by_dim` (no solo son cuatro): CSV BAJO → "el orden establecido pesa menos"; OCH ALTO → "la apertura al cambio pesa mas"; SEN BAJO → "el logro personal pesa menos"; STR MEDIO → "pesa de forma pareja". Acentuados y en tuteo. Antes: heading con nada debajo. |
| B | **Ficha tecnica — `[GAP-REPORT-FICHA-NAME-JOIN]`** | **PASA 4/4** | `Twenty-Item Values Inventory v1.0` · `Big Five Inventory-2 (forma corta) v1.0` · `PERMA-Profiler v1.0` · `O*NET Interest Profiler-SF v1.0`. Ninguno dice "Instrumento de autoconocimiento". El embed `instrument!inner(code, name)` aguanta los 4 instrumentos: **ninguna fila se cayo por el `!inner`**. |
| C | **Teaser `/perfil-integrado` — PR #26** | **PASA** | Las 4 cadenas de chrome presentes literalmente: "Un primer espejo de **quien** eres" (con tilde), "Son **hipotesis** para explorarte" (con tilde), "**esta** en el perfil profundo", "**Aca** viste una pincelada; **alla** se despliega entero". Las 2 filas de `integrator_rule` que rindieron salen acentuadas y en tuteo → **las dos capas coherentes**. Cero voseo en el teaser propiamente dicho. |

**Regresiones sanas confirmadas de paso (sin costo extra):**

- `/me/data` sigue con las **4 etiquetas distintas** (Personalidad / Valores / Bienestar / Intereses), cada una cruzada contra el `session_id` de la DB → el fix de #20 aguanta.
- `h1` por instrumento correcto en los 4 reportes ("Tu perfil de personalidad / de valores / de bienestar / de intereses").
- Heading NFR-28 neutro de #21 ("...en soledad") **presente** en el reporte PERMA (`showContention:true`) y ausente en los demas → sigue data-driven.

**Salvedad de alcance en (B):** de BFI, PERMA y O*NET se leyo `h1` + ficha tecnica, **no** se inspecciono su seccion "Que sugiere esto sobre ti". No hace falta y no se hizo a proposito: #24 ya verifico la identidad de claves contra las 26 snapshots vivas de prod (BFI 0/6, O*NET 0/8, PERMA 0/6 con claves distintas), y con conjuntos de claves identicos el cambio es un **no-op** demostrado ahi. Es decir, el no-op en los instrumentos de barras descansa en esa comparacion offline, no en un chequeo de render de esta corrida — re-abrir 3 reportes habria costado 3 correos por evidencia mas debil de la que ya existe.

**Metodo para (C):** criterio = **presencia de substring exacto** en el DOM renderizado, no conteo por regex de voseo. La capa de DB ya estaba cerrada por `md5(prod)==md5(seed)`; lo que este deploy estrena es la capa de codigo. La leccion de C1 y del smoke del #20 (los regex de voseo subcuentan Y sobrecuentan) se respeto: no se uso ninguno como criterio.

---

## 2. Hallazgos nuevos (4) — ninguno del alcance de #24 ni de #26

### 2.1 `[GAP-TWIVI-BAND-DEFINICION-DOBLE]` — P1

**El seed autoro 3 bandas y el scoring solo puede producir 2.** TwIVI tiene 12 narrativas sembradas (4 HOV × ALTO/MEDIO/BAJO), pero la funcion que decide la banda es un test de signo: MEDIO exige empatar el MRAT propio con 1e-9. **Las 4 narrativas MEDIO son inalcanzables en la practica** — en esta sesion STR salio MEDIO por coincidencia aritmetica exacta (BE=UN=4 y MRAT=4.0 clavado), no por diseño.

El sintoma visible del mismo defecto: **el reporte de Valores se contradice consigo mismo en la misma pagina.** La tabla `sr-only` del circumplejo dice `Destacar → Medio`; el parrafo de narrativa de esa misma dimension dice "el logro personal pesa **menos**" (banda BAJO). Destacar **es** SEN (`reveal-phrases.ts:280`, pineado por `visual-dimensions.test.ts:134`).

`Causa raiz:` hay **dos definiciones distintas de "banda"** sobre los mismos 4 HOV.

| Superficie | Funcion | Regla | Resultado en esta sesion |
|---|---|---|---|
| Narrativa (via `bands_by_dim` del snapshot) | `bandFromMrat` (`lib/scoring/mrat.ts:117`), llamada en `score-session.ts:435` | **test de signo**: `centered > 1e-9` → ALTO, `< -1e-9` → BAJO, MEDIO solo si es exactamente 0 | OCH ALTO · SEN **BAJO** · CSV BAJO · STR MEDIO |
| Circumplejo + su tabla a11y | `computeIpsativeBands` (`lib/scoring/ipsative.ts`), llamada en `visual-dimensions.ts:105` | **corte por z**: `\|z\| >= 1` para salir de MEDIO | OCH ALTO · SEN **MEDIO** · CSV BAJO · STR MEDIO |

Aritmetica verificada con los `scores_by_dim` reales del snapshot (AC4 BE4 CO2 HE6 PO3 SD6 SE3 ST6 TR2 UN4) y el `hovMap` (OCH=SD,ST,HE · SEN=AC,PO · CSV=SE,CO,TR · STR=BE,UN): MRAT = 4.0; centrados OCH +2.0, SEN −0.5, CSV −1.667, STR 0.0; z: OCH +1.54, SEN −0.35, CSV −1.23, STR +0.03. Las dos columnas de la tabla salen exactas. **El centrado no explica la diferencia** (la z es invariante a un corrimiento constante): son dos reglas distintas, no dos escalas.

`La segunda regla parece un duplicado accidental, no una eleccion.` El comentario que justifica el recalculo en `visual-dimensions.ts` dice que la banda se recomputa sobre los 4 centrados **"no se reusa la de los 10 valores"**. Esa premisa nunca fue cierta para TwIVI, y hay dos pruebas independientes:

1. **Las 6 snapshots TwIVI vivas en prod tienen exactamente 4 claves** `CSV,OCH,SEN,STR`. Ninguna guardo jamas los 10 Schwartz — para `centering_strategy='mrat'` el scoring siempre escribio por HOV.
2. **Orden cronologico:** el branch `bandFromMrat` aterrizo en `e2572d8` (2026-06-12) y `visual-dimensions.ts` nacio en `cf18343` (2026-07-23, #17). Cuando se escribio el recalculo, las bandas guardadas **ya eran** las 4 del HOV.

`Efecto secundario, no el titular:` con el test de signo **cualquier** desviacion respecto al propio promedio —por minima que sea— narra ALTO o BAJO. Aqui SEN esta a −0.5 en una escala 1-6 y se le dice al usuario "tiendes a ponerlo en segundo plano", mientras la otra regla lo lee como variacion normal. Roza la regla etica de no exagerar el valor de la senal (CLAUDE.md §8.6) y la de "banda baja como estilo, nunca deficit".

`No es un defecto de #24:` la narrativa antes no renderizaba nada, asi que no habia con que contradecirse. #24 hizo **visible** un desacuerdo latente; el fix de #24 (leer de `bands_by_dim`) es correcto.

`Superficie afectada:` la tabla es `sr-only` → el que ve las dos versiones a la vez es un usuario de lector de pantalla. El resto ve solo la narrativa (regla de signo).

`Decision que hace falta (no la tomo CC) — y las dos rutas NO son simetricas:`

| | **Opcion A — el scoring pasa a z** | **Opcion B — el visual lee `bands_by_dim`** |
|---|---|---|
| Cambio | `score-session.ts:435` deja de usar `bandFromMrat` | `visual-dimensions.ts:105` deja de recomputar |
| Alcance | Una linea + revisar `mrat.test.ts` | Una linea |
| **Cola de datos** | **`bands_by_dim` esta GUARDADO en el snapshot**: solo aplica a sesiones nuevas. Las **6 snapshots TwIVI vivas** conservan bandas de signo salvo que se re-scoreen (migracion de datos) | **Ninguna** — el visual computa en render, aplica de inmediato a los 6 reportes existentes |
| Semantica que sobrevive | z intra-perfil (la de ADR-034 y la de los otros 3 instrumentos) | signo MRAT (por encima/por debajo de tu propio promedio) |

`Lectura de CC:` las dos pruebas de arriba apuntan a que el recalculo del visual entro por una premisa equivocada, lo que favorece **B** (restaurar la fuente unica); pero **B conserva la regla de signo**, que es justo la que hace inalcanzables las 4 narrativas MEDIO. Si lo que se quiere es que MEDIO exista, hace falta **A** — y con A hay que decidir que pasa con las 6 snapshots viejas. La eleccion es de producto, no tecnica.

### 2.2 `[GAP-FICHA-WHAT-MEASURES-ES-CO]` — P2

El campo "Que mide" de la ficha tecnica sale de `instrument_version.psychometric_status->>'what_it_measures'`. Estado en prod, por instrumento:

| Instrumento | Prod | Seed | Diagnostico |
|---|---|---|---|
| **TwIVI** | "Muestra que valores pesan mas **para vos**..." (acentuado, **voseo**) | `instrument-version.sql:142` dice "para **ti**" | **Fila viva stale**: OLA 0 arreglo el seed, prod nunca se resembro. **Mismo patron exacto que el teaser.** |
| **BFI-2-S** | tuteo, **sin tildes** ("evaluacion clinica") | igual de sin tildes | El defecto esta en el **seed**, no es deuda de reseed |
| **PERMA-Profiler** | tuteo, **sin tildes** ("areas", "mas", "animo", "diagnostico", "sentias") | `instrument-version.sql:139-142`, igual | Idem |
| **ONET-IP-SF** | `null` | sin `what_it_measures` | Nunca se sembro → cae al generico |

Es una **cuarta superficie** del mismo problema es-CO, no cubierta por OLA 0 (que barrio microcopy `.ts` + seeds de `narrative_template`) ni por #26 (teaser). El "para vos" de TwIVI es lo mas grave: es voseo vivo en prod con el seed ya corregido, o sea que se cierra con un reseed scopeado por `instrument_version_id` (patron del teaser: UPDATE scopeado, no DELETE-first, porque solo cambia texto).

### 2.3 `[GAP-FICHA-QUE-MIDE-PREFIJO-DOBLE]` — P3

El reporte de Intereses rinde literalmente:

```
Que mide: Que mide: ficha tecnica en preparacion para este instrumento.
```

`Causa:` el fallback de `assembler.ts:529` ya trae el prefijo "Que mide: " dentro del propio string, y `FichaTecnica.tsx:71` renderiza ademas su `<span>Que mide: </span>`. Solo se ve en O*NET porque es el unico sin `what_it_measures` sembrado — o sea que **2.2 y 2.3 se cierran juntos**: sembrar el texto de O*NET oculta el sintoma, pero el prefijo duplicado en el fallback hay que quitarlo igual (volveria a aparecer en cualquier instrumento futuro sin ficha).

### 2.4 Residuo conocido, NO defecto nuevo: el CTA del waitlist

`/perfil-integrado` y los 4 reportes muestran **"Avisame cuando este listo"** — voseo y sin tildes. **Esta pineado a proposito**: `lib/i18n/microcopy/es-CO/waitlist.ts:8` lo documenta ("Pin E2E (no acentuar / no cambiar)") porque `tests/e2e/full-flow-onet.spec.ts:77` lo matchea con `getByLabel(/Avisame cuando este listo/i)`. Ya estaba anotado como alcance corto de C1. Se deja registrado aqui para que la proxima corrida no lo reporte como hallazgo: **el arreglo es cambiar el spec y el copy a la vez**, no el copy solo.

---

## 3. Costo de la corrida

**4 correos disparados** (uno por reporte abierto; `reporte/page.tsx:190-202` no es idempotente). Orden elegido a proposito para que el costo cayera al final: (C) primero —gratis, porque el aterrizaje es `/perfil-integrado`—, luego (A) sobre Valores, y los otros 3 al cierre para (B).

---

## 4. Lo que este smoke NO cubrio

Sin cambios respecto a lo que ya estaba anotado: **reduced-motion del SO, lector de pantalla real, movil 360/375, y una corrida de 4 tests nueva** (esta, como las recientes, fue sobre reportes ya existentes).

`Nota:` 2.1 sube la prioridad del lector de pantalla real — la contradiccion de bandas vive justo en la superficie a11y, que ninguna corrida ha ejercitado con un lector de verdad.

**Sigue abierto y fuera de alcance (sin tocar):** `[GAP-REPORT-BAND-LEGEND-INTERES]` P2, los 3 adjetivos con marca de genero del teaser (copy Cowork), `[GAP-TEASER-BAND-NOT-SHAPE]`, A2 `[GAP-PERMA-MINIRESULT-SURFACE]`, `[GAP-CI-E2E-PROJECT-MATRIX]` P3 y la **entrega 2 del CI** (9 fallas E2E ya diagnosticadas; arrancar desde `main`, no como PR encadenada).
