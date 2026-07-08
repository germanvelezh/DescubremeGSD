# HANDOFF — OLA 2 PR-C (mini-resultado 2.3 + transición 2.4)

**Fecha:** 2026-07-08 · **Autor:** Claude Code · **Estado:** GATE corrido + diseño cerrado · **PRE-CÓDIGO** (0 archivos escritos, 0 tests, rama no creada)
**Semilla:** `estado/PLAN_Ola2_El_Free_Devuelve_Valor_v1.0.md §PR-C` + `auditoria-ux-ui/MICROCOPY_ES-CO_SIGNOFF_v1.0.md §9/§4.3/§4.4` (firmado §8) + `HANDOFF_UI_v1.0.md §3` + `BLUEPRINT §6`.
**Regla:** sin commit/push/deploy sin OK de German. Rama nueva `feat/ola-2c-mini-result` off `main` (aún no creada).

> Este doc existe para **no re-derivar la orientación** (fue cara). Contiene el veredicto del GATE, el diseño del composer, los mapeos dim→clave exactos, los landmines de correctitud y las decisiones abiertas. Al retomar: leer esto + Tier 1, no re-grepear.

---

## 1. GATE (riesgo del PLAN L116) — VEREDICTO: PASS con matiz

`Hecho:` `report_snapshot.html_payload.{scores_by_dim, bands_by_dim}` está presente para los **4 instrumentos**. Son campos requeridos que `lib/scoring/score-session.ts:488-489` persiste SIEMPRE; el assembler los lee sin condicional. Expuestos en `ReportPayload` (assembler.ts):
- `layer1.scoresByDim` = `payload.scores_by_dim` (crudos) — presente para los 4.
- `layer2.scoresWithBands[dim].band` (bandas) — presente para los 4.
- `layer1.top3` — resuelto para los 4 (semántico solo en hexagon, pero utilizable).

`Matiz CRÍTICO para el wire:` **`visualDimensions` está VACÍO en el path hexagon (O*NET)** — `assembler.ts:543-550` lo llena SOLO para bars/circumplex. → El composer **NO** puede leer O*NET de `visualDimensions`. Contrato de entrada del composer = proyección **`{ visualType, scoresByDim, bandsByDim, top3, distress }`**, nunca `visualDimensions`.

### Mapeo `visual_type` (verificado en seeds) — clave del diseño
| Instrumento | visual_type | centering | dims en `scores_by_dim` |
|---|---|---|---|
| ONET-IP-SF | `hexagon` (único) | ipsative_z | R, I, A, S, E, C |
| BFI-2-S | `bars` | **none → ipsative** | EXT, OPN, CON, AGR, NEG |
| PERMA-Profiler | `bars` | **none → ipsative** | P, E, R, M, A (+ N, H, hap, Lon) |
| TwIVI | `circumplex` (único) | mrat (centered) | OCH, SEN, CSV, STR (4 HOV) |

`visualType` mapea **3 a 4**: BFI y PERMA comparten `bars`. Se desambiguan por el **set de dimCodes** (BFI `{EXT,OPN,CON,AGR,NEG}` vs PERMA `{P,E,R,M,A,...}` — cero solape). Los 4 HOV de TwIVI (`OCH/SEN/CSV/STR`) son **globalmente únicos por diseño** (el seed lo declara explícito).

---

## 2. Diseño del composer (cerrado)

Dos archivos nuevos:

### `lib/i18n/microcopy/es-CO/reveal-phrases.ts` (microcopy, **EXCLUIDO de FOUND-05**)
Aquí viven TODOS los literales de instrumento/dimensión + la inversión NEG. Contenido:
- Las **57 claves §9** (verbatim de `MICROCOPY §9`, ver §4 abajo) + **labels es-CO de dimensión** (columnas "etiqueta cotidiana", cierra `[GAP-DIMENSION-LABELS-ES-CO]`).
- Un **registro de familias** `REVEAL_FAMILIES`: por instrumento `{ visualType, dimCodes[], dimToKey (dim→clave fragmento/driver), rule, phrases, labels }`.

### `lib/report/reveal-composer.ts` (`lib/report` = **ESCANEADO por FOUND-05 → CERO literales** de instrumento/dimensión)
- 4 funciones puras de regla + dispatcher fino: selecciona familia por `visualType` (desempata `bars` por overlap de dimCodes contra `family.dimCodes`) y ejecuta `family.rule`.
- Firma sugerida: `composeReveal(input: RevealInput): RevealResult` con `RevealInput = { visualType, scoresByDim, bandsByDim, top3?, distress? }` y `RevealResult = { text: string, tone: 'normal'|'sensitive', showContention: boolean }`.
- Importa `REVEAL_FAMILIES` de reveal-phrases (el path no es literal de instrumento → FOUND-05 clean).

**Fuente única (§9.6 nota 2):** el composer alimenta el mini-resultado (2.3) Y cualquier reuso en la transición. No duplicar generadores de frase.

---

## 3. Las 4 reglas de composición (§9)

### BFI — saliencia (`bars`, dims EXT/OPN/CON/AGR/NEG)
- `dimToKey`: EXT→E, OPN→O, CON→C, AGR→A, NEG→N. Labels: E="Energía social", O="Curiosidad", C="Organización", A="Cooperación", N="Calma".
- **extremas** = dims con banda ≠ MEDIO, ordenadas por **saliencia** desc. Saliencia = |z-score del raw a través de los 5 dominios| (distancia ipsativa; computar de `scoresByDim`).
- 2+ extremas → `Cap(frag[d1]) + " y " + frag[d2] + "."` · 1 → `Cap(frag[d1]) + ". " + CODA_SINGLE` · 0 → `FALLBACK_MEDIA`.
- **Ejemplo firmado (test rojo→verde obligatorio):** EXT=BAJO + OPN=ALTO → `"Recargas energía en lo tranquilo y te mueves por la curiosidad."`
- **LANDMINE — inversión NEG/"Calma":** la dimensión se puntúa como afecto negativo (`NEG`); la etiqueta es "Calma" (su inverso). `NEG=ALTO` debe usar el fragmento `N_BAJA` ("sientes con intensidad…"), `NEG=BAJO` → `N_ALTA` ("mantienes el pulso estable…"). **VERIFICAR primero** el sentido del score en `db/seeds/instruments/BFI-2-S/items.sql` (¿reverse-keying a nivel dominio? si `scoresByDim["NEG"]` ya mide Calma, NO invertir). Encoding en `dimToKey` (flag `invertBand` en la familia). Test dedicado.

### O*NET — pico vs par (`hexagon`, dims R/I/A/S/E/C)
- `top1/top2` de `layer1.top3` (ya resueltos por el assembler). `gap = scoresByDim[top1] − scoresByDim[top2]`.
- `gap >= UMBRAL` → `SINGLE_{top1}` (6 claves) · si no → `PAIR_{orden canónico}` con R<I<A<S<E<C (15 claves).
- **UMBRAL ausente en repo** → default documentado + `[GAP-ONET-PEAK-GAP-THRESHOLD]`.

### TwIVI — dominante vs par adyacente (`circumplex`, dims OCH/SEN/CSV/STR)
- `dimToKey`/labels: OCH→APERTURA ("Apertura al cambio"), SEN→AUTOPROM ("Autopromoción" = Self-Enhancement), CSV→CONSERV ("Conservación"), STR→AUTOTRASC ("Autotrascendencia" = Self-Transcendence).
- dominante = argmax `scoresByDim` (centered MRAT). Adyacencias (4 pares válidos): APER-PROM (OCH+SEN), APER-TRASC (OCH+STR), CONS-PROM (CSV+SEN), CONS-TRASC (CSV+STR). Opuestos (no co-dominan por MRAT): OCH↔CSV, SEN↔STR.
- top1&top2 adyacentes AND dentro de UMBRAL cercanía → `PAIR_*` (4 claves) · si no → `HOV_{driver}` (4 claves).
- **UMBRAL ausente** → default + `[GAP-TWIVI-ADJACENCY-THRESHOLD]`.

### PERMA — driver + variantes sensibles (`bars`, dims P/E/R/M/A + extras)
- driver = argmax `scoresByDim` sobre **{P,E,R,M,A}** (RAW 0-10, NO banda ipsativa; ignorar extras N/H/hap/Lon).
- **LANDMINE:** las bandas de PERMA son **ipsativas** (relativas) → "overall bajo" (§9.4) NO se puede derivar de bandas. `LOW_OVERALL = mean(raw {P,E,R,M,A}) < UMBRAL` (absoluto, 0-10). `BALANCED = (max−min de {P,E,R,M,A}) < UMBRAL` (sin driver claro). **UMBRALES ausentes** → defaults + `[GAP-PERMA-OVERALL-THRESHOLD]`.
- Claves: `DRIVER_{P,E,R,M,A}` (5) + `LOW_OVERALL` (con `{driver_label}`) + `BALANCED` + `INCOMPLETE` (futuro). driver_label: P="el disfrute cotidiano", E="lo que te absorbe", R="tus vínculos", M="el sentido de lo que haces", A="la sensación de avanzar".
- **Contención (NFR-28):** footer reusa `getContentionResources`/`ContentionBanner`. La decisión de MOSTRARLO viene del servidor `report.distress.showContention` (ya persistido, `score-session.ts:448-465`) — **NO recomputar umbral** (regla T-02-08-02). La variante de COPY LOW_OVERALL se decide por score crudo; pueden divergir (ver decisión abierta 3).

---

## 4. Contenido §9 verbatim (57 claves) — fuente para reveal-phrases.ts

Todo el texto es-CO firmado está en `auditoria-ux-ui/MICROCOPY_ES-CO_SIGNOFF_v1.0.md`:
- **§9.1** BFI: 10 fragmentos (`MC_REVEAL_BFI_FRAG_{E,O,C,A,N}_{ALTA,BAJA}`) + 2 composición (`MC_REVEAL_BFI_CODA_SINGLE`, `MC_REVEAL_BFI_FALLBACK_MEDIA`) = 12. (líneas 219-239)
- **§9.2** O*NET: 15 pares (`MC_REVEAL_ONET_PAIR_XX`) + 6 picos (`MC_REVEAL_ONET_SINGLE_X`) = 21. (líneas 258-285)
- **§9.3** TwIVI: 4 HOV (`MC_REVEAL_TWIVI_HOV_*`) + 4 pares (`MC_REVEAL_TWIVI_PAIR_*`) = 8. (líneas 293-302)
- **§9.4** PERMA: 5 drivers (`MC_REVEAL_PERMA_DRIVER_{P,E,R,M,A}`) + 3 variantes (`LOW_OVERALL`, `BALANCED`, `INCOMPLETE`) = 8. (líneas 308-324)
- **§9.5** líneas fijas: `MC_MINIRESULT_{BFI,ONET,TWIVI,PERMA}_{MEASURE,WHY}` = 8. (líneas 330-335)

Complementos (no cuentan en las 57):
- **§4.4** leyenda de bandas: `"La banda es tu rango probable, no un punto exacto."`
- **§4.3** recap transición (fijas): 1→2 `"Tu personalidad, en un primer trazo."` · 2→3 `"Tus intereses ya dibujan un patrón."` · 3→4 `"Lo que más te importa, ya en palabras."` · plantilla `"Listo: {recap}. Vas {n} de 4. Sigue: {test} — {hook}. Toma unos {min} min."` · recall `"Sigues buscando {intención en minúscula}. Vas por buen camino."`

---

## 5. Wire (2.3) + transición (2.4)

**2.3 wire en `app/(b2c)/test/[code]/done/page.tsx:206-224`:** reemplazar SOLO el hack narrative-first-paragraph (`revealPhrase = narrativeTopPhrase || narrativeExtended.split(...)`) por la salida del composer, para el mini-resultado. **NO tocar** la narrativa del reporte full (assembler.ts:530). Plantilla 3 partes en `TransitionScreen.result`: Qué medimos (§9.5 MEASURE) / Qué dice (composer) / Por qué te importa (§9.5 WHY) + leyenda §4.4. `.dm-paper` en done/page + TransitionScreen (patrón OLA 1/2b).

**2.4 en `lib/i18n/microcopy/es-CO/transitions.ts` + `TransitionScreen.tsx`:**
- Hooks §4.1 por test → reemplazar `MC_TRANSITION_HOOK_DEFAULT`. Cierra `[GAP-W6-HOOKS-1]`. **VERIFICAR:** PR-B ya creó `test-intro.ts` con hooks §4.1 + intros §4.2 — reusar esa fuente para el hook del SIGUIENTE test, no duplicar.
- Recap §4.3 (3 instancias) + dots 1-4 (●○○○) + tiempo estimado.
- Intent recall: plumbing `user_metadata.intent` → nuevo prop en TransitionScreen (hoy `intent` solo vive en `/onboarding/mapa`).
- Props muertos `completed`/`total` de TransitionScreen: mencionar, no borrar salvo que estorben.

---

## 6. Decisiones abiertas (pedir criterio de German o aplicar default)

1. **Umbrales ausentes** (O*NET gap, TwIVI adyacencia, PERMA overall/balanced). §9 dice "los fija el pack" pero no existen en repo. **Recomendación:** proceder con defaults documentados + flags `[GAP-*-THRESHOLD]`, afinar en deploy-smoke. → ¿aceptas defaults o das valores?
2. **Recap 1→2:** §4.3 firmado da línea fija; el prompt pidió reusar la frase BFI del composer. En una sola pantalla mostrar ambas = duplicación (§9.6 nota 2 lo prohíbe). **Recomendación:** mini-resultado muestra la frase compuesta; el recap usa la línea fija §4.3 (distinta de registro, sin duplicar). → ¿ok?
3. **PERMA contención:** footer = `report.distress.showContention` (servidor, respeta no-recompute) vs §9.4 que quiere footer siempre que overall=baja (copy). **Recomendación:** footer por decisión servidor; LOW_OVERALL copy independiente; flag si divergen. → ¿ok?

---

## 7. TDD (rojo→verde, `test:lint` de frases prohibidas aplica al composer)
Ejemplo firmado BFI (E baja + O alta) + 1 caso por instrumento (O*NET single y par; TwIVI driver y par adyacente; PERMA driver y LOW_OVERALL) + BFI single/coda + fallback media + **caso NEG-inversión**.

## 8. Verificación (sin stack local → funnel E2E por deploy-smoke)
`tsc --noEmit` 0 · `test:lint` (13/13 frases + FOUND-05 + hardcoded-strings) · `test:unit` (composer verde) · `next build`. Responsive 375/1440 + a11y AA (barras con alternativa no-color + label legible). Nota: **biome NO es gate** (sin biome.json); indentación de espacios. Deploy-smoke: 4 tests → mini-resultado con frase real por test → transición con recap/dots/hook/recall; PERMA-bajo muestra contención.

## 9. No-tocar (HANDOFF §9 / PLAN)
`scoreCompletedSessionIfNeeded` (contrato pineado, /done único trigger scoring) · `advanceProgress` por COUNT · Decisión B PR #6 (mini-resultado NO linkea al reporte full) · `me/data` byte-safe · honestidad (sin match%/determinismo) · anti-dark-patterns (blueprint §14) · NFR-27/28 contenido intacto · reseed PROD `narrative_template` (Ola 0, separado, gated — el composer §9 en TS NO depende de él) · narrativa del reporte full (assembler.ts:530).

## 10. Landmines a verificar ANTES de codear cada regla
1. **BFI NEG:** sentido del score (`db/seeds/instruments/BFI-2-S/items.sql` reverse flags) → decide inversión.
2. **PERMA:** confirmar escala raw 0-10 + fijar umbrales overall/balanced.
3. **O*NET/TwIVI:** valores de umbral gap/adyacencia.
4. **§4.1 hooks:** confirmar que ya viven en `test-intro.ts` (PR-B) → reusar.
5. **advisor:** la consulta de diseño quedó pendiente (opcional como primer paso).

---
*Fin HANDOFF PR-C v1.0. Al cerrar PR-C, plegar lo relevante a `estado/STATUS.md` + `CHANGELOG.md` + `BACKLOG.md` (flags de umbral) y archivar este doc.*
