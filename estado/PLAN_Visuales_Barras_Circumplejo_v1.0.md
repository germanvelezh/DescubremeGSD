# PLAN — Pase visual de barras (BFI/PERMA) y circumplejo (TwIVI) del reporte Free

**Fecha:** 2026-07-23 · **Autor:** Claude Code (arquitectura) desde los decision docs de Cowork (2026-07-23).
**Estado:** listo para ejecutar en ventana nueva. **Regla:** no commit/push sin OK de German.
**Cierra:** `[GAP-PERMA-BARS-VISUAL-PASS]` P1 (barras) + una nueva decisión de circumplejo. **Toca ADR-032** (proyección) → añadir ADR al cerrar.
**Origen evidencia:** `estado/SMOKE_ADR033_PERMA_CARE_RESULTADOS_v1.0.md`, snapshots BFI `21b0f79c` / TwIVI `96fe99d5`, brief `estado/BRIEF_Cowork_Visuales_Barras_Circumplejo_v1.0.md`.

---

## 0. Decisiones de Cowork (firmadas, verbatim)

**Barras → Opción B:** el largo de la barra **sigue a la banda** (tres largos canónicos Bajo < Medio < Alto), discreto. NO magnitud absoluta, NO continuo. **PERMA lleva marco propio** (estado del momento + valencia negativa en Emociones difíciles y Soledad).

**Círculo → Opción B:** **rango relativo, se abandona "centro = media / ≤0 colapsa".** Las 4 direcciones siempre se dibujan (forma de 4 puntas); la más baja recibe radio pequeño-pero-real (nunca cero), la más alta el mayor. Se conserva la oposición bipolar. Se **deja de codificar arriba/abajo de la media**. El escalado debe hacer que **diferencias pequeñas se vean pequeñas**; apoyarse en el flag de calidad para patrones muy parejos.

**Copy es-CO firmado (aprobado para seed):**
- `MC_BARS_LENGTH_NOTE`: "El largo de la barra sigue a la banda; no es un puntaje absoluto ni un ranking."
- `MC_BARS_INTRO_BFI`: "La banda —Bajo, Medio o Alto— te muestra qué tanto pesa cada rasgo dentro de tu propio perfil, no frente a otras personas. Ningún rasgo es mejor que otro."
- `MC_BARS_INTRO_PERMA`: "La banda —Bajo, Medio o Alto— refleja cómo te sientes en este momento dentro de tu propio perfil, no una etiqueta sobre ti ni una comparación con otras personas, y cambia con el tiempo. En Emociones difíciles y Soledad, \"Alto\" quiere decir que ahora hay más de eso, no un defecto tuyo."
- `MC_VALUECIRCLE_NO_ABSENCE_NOTE` (nombre tentativo): "Tienes las cuatro direcciones; ninguna está en cero. Si una se ve más corta, pesa un poco menos para ti, no que te falte."

`Conservar` (no tocar): `MC_BARS_TABLE_CAPTION`, `MC_REPORT_BAREMO_NOTE`, `MC_VALUECIRCLE_TITLE`, `MC_VALUECIRCLE_DESC_INTRO`, `MC_VALUECIRCLE_RELATIVE_NOTE`, `MC_QUALITY_FLAG_NOTE`. **No reutilizar** `MC_REPORT_SCORES_INTRO` (es de O*NET, "tus seis intereses").

---

## 1. Traducción técnica (qué cambia y por qué)

**Barras — raíz del bug (confirmada en DB):** `BarsWithBands` (`app/(b2c)/reporte/[sessionId]/_components/BarsWithBands.tsx:40-43`) calcula `pct = clamp(0,1, value/(max ?? 5))`. `projectBarsDimensions` (`lib/report/visual-dimensions.ts:63`) devuelve `{code,label,value,band}` sin `max`, y `value` = suma/media cruda (BFI 6-30, PERMA 0-10) → todo ≥5 clampea a 100%.
→ **Fix (Opción B):** el ancho se computa desde la **banda**, no desde `value`. Mapa `BAND_RATIO = {BAJO, MEDIO, ALTO}` con tres anchos fijos, distintos y monótonos. `value`/`max` dejan de gobernar el ancho (quedan vestigiales para barras). La banda sigue siendo la etiqueta a la derecha y la fuente sr-only.

**Círculo — raíz (confirmada):** `ValueCircle` (`ValueCircle.tsx:111-116`) usa radio positivo escala 10→70 y `≤0 → muñón 10`. `projectCircumplexDimensions` (`visual-dimensions.ts:90`) devuelve `value = centered[hov]` (media HOV − MRAT, puede ser negativo).
→ **Fix (Opción B):** el radio deja de ramificar por signo. Todas las 4 direcciones reciben radio real (nunca cero). Se elimina el aro-base "media = 0" (`ValueCircle.tsx:100-109`) porque codifica el concepto que se abandona (Cowork: no añadir referencia). Las **bandas siguen ipsativas** (se recomputan igual sobre los centrados para la etiqueta/sr-only); solo cambia el **radio**.

**Rutéo BFI vs PERMA para el intro (FOUND-05-safe):** `RevealFamily` ya tiene `id` ("bfi"/"perma") y el assembler ya llama `selectFamily` + pasa la familia a `projectBarsDimensions`. Añadir a la familia un campo `barsIntroKey` (o el texto) en `reveal-phrases.ts` (EXCLUIDO de FOUND-05). El assembler lee `family.barsIntroKey` y lo propaga a `VisualProps.intro`. `BarsWithBands` renderiza el `intro` que reciba → sigue agnóstico (cero literal de instrumento en `lib/report`).

---

## 2. Decisión abierta para el implementador — mapeo del radio del círculo

Cowork dio dos constraints en leve tensión: (a) "prioridad relativa dentro del propio rango" y (b) "diferencias pequeñas se vean pequeñas". Un min-max **por perfil** satisface (a) pero **viola (b)** (mapea cualquier spread al rango completo → exagera).

`Recomendación:` mapear el radio desde la **media HOV cruda** (escala 1-6 de TwIVI, NO centrada) con una afín **de escala fija**: piso real para el mínimo teórico, máximo para el máximo teórico. Así: nunca cero, orden preservado, magnitud honesta (spread chico → radios casi iguales), sin normalización por perfil. `projectCircumplexDimensions` pasa a devolver `value = media HOV cruda` (o expone ambos); las bandas se siguen computando sobre los centrados.

`Criterios de aceptación (tests obligatorios):`
1. **Nunca cero:** las 4 direcciones tienen radio > piso, para cualquier input.
2. **Dominante claro** (perfil A1: OCH 6, STR 4, SEN 3.5, CSV 2.33): 4 puntas visibles, OCH la más larga.
3. **Casi parejo** (4 medias ~iguales): radios casi iguales, NO aguja/estrella asimétrica; disparar `MC_QUALITY_FLAG_NOTE` (patrón parejo, ya existe el flag).
4. **Oposición bipolar** preservada (orden por `hovAxisOrder` = OCH/STR/CSV/SEN → cardinales opuestos).
5. **QUAL-05** (todos iguales) → sectores iguales, sin ganador.

Si el fixed-scale no cuadra con la intención de Cowork tras verlo en smoke, confirmar con German/Cowork antes de cerrar (es reversible).

---

## 3. Tareas (numeradas, con verificación por paso)

1. **Copy nuevo** en `lib/i18n/microcopy/es-CO/report.ts`: agregar las 4 claves verbatim (§0). → verificar: `test:lint` (frases prohibidas 13/13) pasa; ninguna reutiliza `MC_REPORT_SCORES_INTRO`.
2. **Familia → intro key** en `lib/i18n/microcopy/es-CO/reveal-phrases.ts`: `BFI_FAMILY.barsIntroKey = "MC_BARS_INTRO_BFI"`, `PERMA_FAMILY.barsIntroKey = "MC_BARS_INTRO_PERMA"` (o el texto directo). → verificar: `tsc` 0; el tipo `RevealFamily` lo declara opcional.
3. **VisualProps.intro** en `visual-registry.ts`: campo opcional `intro?: string`. → verificar: `tsc` 0; hexagon/circumplex no lo requieren.
4. **Assembler**: al proyectar 'bars', resolver `intro` desde `family.barsIntroKey` y adjuntarlo al payload de VisualProps. → verificar: BFI→intro BFI, PERMA→intro PERMA (unit).
5. **BarsWithBands**: ancho desde `BAND_RATIO[band]` (no `value/max`); renderizar `intro` (si viene) arriba de las barras y `MC_BARS_LENGTH_NOTE` como regla compartida; conservar `MC_REPORT_BAREMO_NOTE` y la tabla sr-only. → verificar: Bajo < Medio < Alto en ancho; una dim Bajo con `value` alto sale corta.
6. **projectCircumplexDimensions / centeredHovScores** (`visual-dimensions.ts` + `reveal-composer.ts`): exponer la media HOV cruda para el radio; mantener el cómputo de bandas ipsativas. → verificar: unit del perfil A1 (medias/centrados correctos, sin regresión del fix #17: capar a `hovAxisOrder`, no doble-flip N/Lon no aplica aquí).
7. **ValueCircle**: nuevo mapeo de radio (§2), quitar branch por signo + aro-base "media=0"; todos los sectores con relleno calmo (sin rojo), ganador enfatizado; agregar `MC_VALUECIRCLE_NO_ABSENCE_NOTE`. → verificar: criterios §2 (5 tests).
8. **Tests** (`visual-dimensions.test.ts` + render tests de los componentes): regresión barras (ancho↔banda, no ancho↔value); círculo (nunca-cero, dominante-4-puntas, casi-parejo-no-spiky, bipolar, QUAL-05). → verificar: `test:unit` verde, +N tests.
9. **Gates:** `tsc --noEmit` 0 · `test:lint` (13/13 + FOUND-05 + hardcoded-strings) · `test:unit` 0 fail · `next build`. Biome NO es gate (indentación de espacios).
10. **ADR** en `estado/DECISIONS_LOG.md` (ADR-034): barras discretas-por-banda + círculo rango-relativo; referencia a los decision docs de Cowork; consecuencias (ADR-032 extendido: la proyección de barras ya no pasa magnitud, el círculo abandona media=0); reversibilidad alta.

---

## 4. Verificación en prod (deploy-smoke, tras merge)

Reusar las **2 cuentas ya sembradas**: `permacare1` (PERMA bajo) y `permacontrol2` (PERMA alto). Tras el deploy:
- **Barras BFI** (transición `/test/BFI-2-S/done` + reporte full): "Energía social/Bajo" y "Calma/Bajo" salen **más cortas** que las "Medio"/"Alto"; el intro BFI aparece; la barra ya no está siempre al 100%.
- **Barras PERMA** (reporte `/reporte/{permaSession}`): anchos varían por banda; intro PERMA con la frase de Emociones difíciles/Soledad; color calmo, sin alarma.
- **Círculo TwIVI** (transición `/test/TwIVI/done`): **forma de 4 puntas**, Explorar la más larga, las otras 3 cortas-pero-visibles (no aguja); nota anti-ausencia presente.
- **Guardrail "Mis datos" → /reporte full:** renderiza la composición NUEVA correcta (el guardrail byte-safe era sobre ANIMACIÓN, no sobre congelar el render; este cambio de radio/ancho es intencional).
- Conducción con click programático + verificación DB (ver `[[smoke-navegador-gotchas]]`).

---

## 5. Anclas

- Barras: `BarsWithBands.tsx:40-43,70-71,108`; `visual-dimensions.ts:63-80`; `assembler.ts:556-565`.
- Círculo: `ValueCircle.tsx:100-116`; `visual-dimensions.ts:90-108` (`projectCircumplexDimensions`); `reveal-composer.ts` (`centeredHovScores`).
- Familias: `reveal-phrases.ts:65` (`RevealFamily`), `:142` (BFI), `:290` (PERMA), `:225` (TwIVI); `selectFamily` en `reveal-composer.ts:103`.
- Copy: `lib/i18n/microcopy/es-CO/report.ts`. Registro visual: `visual-registry.ts`.
- Spec: `02-UI-SPEC.md` §6.1 (bars) / §6.2 (circumplex). FOUND-05: `tests/lint/no-hardcoded-instruments.test.ts`.
- Decision docs de Cowork (pegados por German 2026-07-23) — origen de §0.

---

## 6. Riesgos / notas

- **FOUND-05:** el rutéo BFI/PERMA del intro NO debe usar literal de código en `lib/report`; rueda sobre `family.barsIntroKey` (data). El copy vive en `lib/i18n` (fuera del scan). Correr el lint antes de dar por cerrado.
- **Ética PERMA:** las barras invertidas (Emociones difíciles, Soledad) con color calmo (nunca rojo); el largo no debe leerse como alarma. La ruta de contención NFR-28 sigue aparte (`showContention`), no se acopla a la barra.
- **Anti-determinismo círculo:** nunca radio cero + nota anti-ausencia; validar que un perfil casi-parejo no se dibuje como asimetría fuerte (criterio §2.3).
- **Reversibilidad:** ambos cambios son render + copy aditiva; sin tocar schema, snapshot ni scoring. Revertir = volver el mapeo de ancho/radio anterior.
