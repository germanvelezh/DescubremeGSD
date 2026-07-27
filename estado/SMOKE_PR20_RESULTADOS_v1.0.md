# SMOKE PR #20 (mislabel) — RESULTADOS

**Fecha:** 2026-07-27
**Deploy:** prod `descubreme.co`, `dpl_A2dwuLEPTdwKGF5LKYVazdBrCke2` = `main 8ddba16` (incluye #20 `762a689`, #21 `69178f2`, #22 `6fbd021`, #23 `8ddba16`)
**Cuenta:** `germanvelezh+permacare1@gmail.com` (4 tests completos; unica cuenta con `showContention:true`)
**Conduccion:** Claude Code (Chrome MCP, click/JS programatico), medicion en el DOM real + verificacion contra la DB de prod via MCP.

---

## 0. Contexto: el smoke estuvo bloqueado por un P0

El primer intento (misma sesion, antes del merge de #23) **no pudo ni entrar**: ninguna cuenta registrada podia volver a autenticarse (`[GAP-RETURNING-USER-RESIGNUP-AGE]`, ver ADR-035). Se arreglo primero (PR #23), se mergeo, y recien entonces se pudo correr esta verificacion.

---

## 1. Resultados

| # | Check | Veredicto | Evidencia medida |
|---|---|---|---|
| 0 | **Login de usuario que vuelve** (PR #23) | **PASA** | El enlace de acceso entra y ruta a `/perfil-integrado` — destino correcto para una cuenta con los 4 tests completos. Antes: `/?error=age`. |
| a | `/me/data` — 4 etiquetas distintas | **PASA** | `21b0f79c`→**Personalidad**, `2cc214ee`→**Intereses**, `96fe99d5`→**Valores**, `066dcdab`→**Bienestar**. Cada una cruzada contra el `instrument.code` de la DB. Antes: 4 links "Intereses ·" identicos. |
| b | Titulo del reporte por instrumento | **PASA** | `h1` = "Tu perfil de personalidad" / "de intereses" / "de valores" / "de bienestar". Los 4 abiertos y leidos. |
| c | Email por-reporte neutro | **NO VERIFICADO** | Se dispararon 4 correos (uno por reporte abierto; `reporte/page.tsx:190-202` NO es idempotente). Falta que German confirme en la bandeja el asunto "Tu reporte esta listo" (el viejo decia "Tu reporte **de intereses** esta listo"). |
| d | Reseed C1 de narrativas en tuteo | **PASA** | BFI: "Buscas… Puedes ceder… Cumples… Tiendes a percibir con intensidad…". O*NET: "te mueve… Sueles fluir… tiendes a engancharte… quieres entender". **Cero** coincidencias de voseo estricto en los 4 reportes. |
| e | Heading NFR-28 neutro (#21) | **PASA** | "No tienes que pasar por esto en soledad." presente en el reporte PERMA (`showContention:true`) y **ausente** en los no-sensibles → el banner sigue siendo data-driven, no decorativo. |

**Residuales confirmados de paso:** check critico BFI NEG sigue verde (Calma·Bajo rinde "percibir con intensidad", no "pulso estable"); chips O*NET exactos R30 I50 A40 S30 E20 C10; etiquetas HOV firmadas (Explorar/Aportar/Destacar/Conservar).

**Nota de metodo:** el primer regex de voseo dio un falso positivo con "haces" (que es tuteo). Se repitio con formas inequivocas (acentuadas + `sos`/`vos` como palabra suelta) → 0 hits. Complementa la leccion inversa de C1 (los regex de voseo tambien SUBCUENTAN): un regex de voseo no sirve solo, ni para confirmar ni para descartar.

---

## 2. Defectos nuevos encontrados (ninguno del alcance de #20)

### 2.1 `[GAP-TWIVI-REPORT-NARRATIVE-EMPTY]` — seccion vacia en el reporte de Valores

El reporte de TwIVI renderiza el encabezado **"Que sugiere esto sobre ti" con NADA debajo** (medido: 27 caracteres entre ese heading y el bloque siguiente; los otros 3 reportes si traen narrativa).

**Causa exacta:** `lib/report/assembler.ts:403` deriva las dimensiones con `Object.keys(payload.scores_by_dim)`, y para TwIVI ese objeto trae los **10 valores Schwartz**, no los 4 HOV. Verificado en el snapshot real de prod (sesion `96fe99d5`):

```
scores_by_dim  ->  AC, BE, CO, HE, PO, SD, SE, ST, TR, UN   (10 Schwartz)
bands_by_dim   ->  CSV, OCH, SEN, STR                        (4 HOV)
```

El loader pide entonces narrativas para `SD`, `ST`, `HE`… y `narrative_template` solo tiene `OCH/SEN/CSV/STR` → cero matches → seccion vacia. **Las 12 narrativas HOV existen en prod y estan en tuteo**; nunca se muestran.

Es la misma trampa que el handoff de PR-C documento para el composer del mini-resultado ("TwIVI `scoresByDim` = 10 Schwartz, NO 4 HOV"). El composer la respeto reconstruyendo los HOV; **el assembler del reporte full nunca se ajusto**.

**Fix:** derivar `dims` de `bands_by_dim` cuando el visual es circumplejo (o, mas general, de la union), no de `scores_by_dim`. Ojo: `payload.bands_by_dim[dim] ?? "MEDIO"` (`assembler.ts:473`) hoy tapa el fallo devolviendo MEDIO para claves inexistentes — al arreglar el keying, revisar que ese default no siga enmascarando.

### 2.2 Sexta superficie del mislabel — la leyenda de banda

`lib/i18n/microcopy/es-CO/report.ts:43` dice **"ALTO significa que ese _interes_ es de los mas fuertes dentro de tu propio perfil…"** y se renderiza en los **cuatro** reportes, incluido el de bienestar y el de personalidad. PR #20 cerro 5 superficies del mislabel; esta se escapo.

**Fix:** mismo patron ya introducido por #20 — neutralizar el sustantivo ("esa dimension" / "ese aspecto") o parametrizar por `instrumentCode`. Copy de Cowork.

### 2.3 Teaser de `/perfil-integrado` en voseo y sin acentos

Medido en `integrator_rule` (prod): **5 de 14 filas en voseo** y **14 de 14 sin un solo caracter acentuado**. Renderizado real: "esto puede sugerir que te **sentis comodo** combinando distintos tipos de actividad", "**areas**", "**hipotesis**".

Es el **primer espejo** que ve el usuario al terminar el Free, y contrasta con los 4 reportes que si quedaron en es-CO acentuado tras C1. Es el alcance ampliado de C1 que quedo pendiente.

**Decision de secuenciacion (para German):** esas 14 filas son probablemente las mismas que OLA 3 reemplaza con las 14 plantillas de cruce + 12 arquetipos ya firmados por Cowork (`[GAP-TEASER-BAND-NOT-SHAPE]` / D2). Arreglar el voseo ahora seria trabajo tirado si el reemplazo esta cerca. Dos rutas:
- **Plegar a OLA 3** (recomendado si OLA 3 arranca pronto): el reemplazo trae copy nuevo ya en es-CO.
- **Reseed puntual ahora** (~30 min, DELETE-first scopeado, patron C1): si OLA 3 se corre, no dejar el primer espejo en voseo.

---

## 3. Lo que este smoke NO cubre

- **(c)** el asunto del email — pendiente de confirmacion de German en la bandeja.
- Reduced-motion del OS y lector de pantalla real (siguen requiriendo Playwright).
- Movil 360/375 en estas superficies.
- El flujo guiado completo (esta corrida es sobre reportes ya existentes, no sobre una corrida de 4 tests nueva).

---

*Fin. Ver `estado/STATUS.md` (PM-9) y `estado/BACKLOG.md` para el seguimiento.*
