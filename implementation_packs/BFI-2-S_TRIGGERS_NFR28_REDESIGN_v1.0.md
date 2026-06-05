# BFI-2-S — Re-diseño de triggers NFR-28 (detector de distrés)

**Tipo:** Spec separada referenciable. Reemplaza la regla de disparo de `BFI-2-S_Implementation_Acquisition_Pack_v1.0_Consolidado.md` §7.2. Apéndice A de este documento contiene el bloque drop-in para actualizar el pack.
**Versión:** 1.0 — 2026-05-20.
**Autor:** Cowork — Rol: Investigador psicométrico senior (con sombrero Arquitecto de sistema para la §6 spec algorítmica).
**Estado:** DRAFT para sign-off de German. Cierra GAP 3 (review Cowork SR-8, 2026-05-20), clasificado P0 ético en `STATUS.md` — bloquea production launch S10.
**Objeto:** corregir la insensibilidad estructural del trigger NFR-28 del BFI-2-S y entregar a Claude Code la spec algorítmica de `evaluateBfi2` en `lib/distress/detector.ts`.
**Idioma:** español neutro; términos psicométricos en inglés entre paréntesis la primera vez.

---

## Resumen ejecutivo

El trigger NFR-28 vigente del BFI-2-S (`faceta ≥ 4.5/5`) es estructuralmente insensible: la regla es **conjuntiva** (exige que el ítem directo y el ítem inverso de la faceta estén ambos cerca del máximo), por lo que un usuario que se autorreporta claramente deprimido en el ítem directo queda sin ruta de apoyo si el ítem inverso recodificado diluye la media. CC verificó el falso negativo el 2026-05-20; este documento lo confirma con la lógica de scoring. Para una red de seguridad (safety net) educativa y no clínica, el costo de un falso negativo (silenciar a una persona angustiada) supera ampliamente el de un falso positivo (mostrar un mensaje de contención suave a quien está bien). La recomendación es **Opción A refinada**: una regla **disjuntiva de dos cláusulas** — (A) endorso directo de ánimo deprimido a nivel de ítem, independiente del ítem inverso, y (B) elevación facetal corroborada con umbral bajado a 4.0. **No se introduce trigger `moderate`** en v1.0: el `strong` re-diseñado ya absorbe la sensibilidad, y un `moderate` facetal caería en la zona sin anclaje normativo que originó el gap HEURISTIC v0 de PERMA. Reversibilidad alta: cambio acotado en `evaluateBfi2`, sin migración de datos.

---

## 1. Verificación del falso negativo

### 1.1 Regla vigente (pack BFI-2-S §7.2)

> **Regla de disparo NFR-28:** Si el puntaje en faceta Depresión ≥ 4.5/5 (ítem 9 = 5 **y** ítem 24 = 1) **o** si el puntaje en faceta Ansiedad ≥ 4.5/5 (ítem 4 = 5 **y** ítem 19 = 1), mostrar la ruta de contención al finalizar el test, antes de los resultados.

**Hecho — estructura del instrumento (verificado contra Migration 018 y pack §4):**

| Faceta | Código `facet.code` | Ítem directo (D) | Ítem inverso (R) |
|---|---|---|---|
| Depresión | `N2` | 9 — "Tends to feel depressed, blue" | 24 — "Feels secure, comfortable with self" |
| Ansiedad | `N1` | 4 — "Worries a lot" | 19 — "Is relaxed, handles stress well" |

Escala Likert 1–5. Recodificación de ítems inversos: `recoded = 6 − raw`. La media facetal se calcula sobre los dos ítems **ya recodificados** (dossier `01_BFI-2_Consolidado.md` §scoring; Migration 018 `scoring_rule` `mean`, `apply_reverse_recoding = true`).

`facet N2 = mean(item9_raw, 6 − item24_raw)`
`facet N1 = mean(item4_raw, 6 − item19_raw)`

### 1.2 El caso falso negativo (confirmado)

| Variable | Valor | Nota |
|---|---|---|
| ítem 9 (raw, directo) | 5 | "Estoy muy de acuerdo: tiendo a sentirme deprimido/a, con el ánimo bajo" — endorso máximo del síntoma |
| ítem 24 (raw, inverso) | 3 | Respuesta neutra en "me siento seguro/a y a gusto conmigo" |
| ítem 24 recodificado | 3 | `6 − 3` |
| faceta N2 Depresión | **4.0** | `mean(5, 3)` |
| ¿Dispara regla vigente (≥ 4.5)? | **NO** | `4.0 < 4.5` |

**Hecho:** un usuario que marca el endorso máximo del síntoma de ánimo deprimido queda fuera de la ruta de contención porque la media facetal conjuntiva exige también que el ítem inverso esté cerca del máximo. La regla vigente solo dispara con sumas recodificadas ≥ 9, es decir, las combinaciones `(5,5)`, `(5,4)` y `(4,5)`. Cualquier respuesta neutra o moderada en el ítem inverso anula la señal del ítem directo.

### 1.3 Diagnóstico de causa raíz

**Inferencia.** El problema no es el umbral 4.5; es la **arquitectura conjuntiva** sobre una media de 2 ítems. Tres factores la agravan:

1. **El ítem 24 no es el opuesto exacto del ítem 9.** "Feels secure, comfortable with self" toca seguridad/autoaceptación; "feels depressed, blue" toca estado de ánimo. Son facetas adyacentes pero no espejos; una persona puede endosar tristeza sin negar del todo su seguridad. Forzar la conjunción de ambos extremos pide una coherencia que el constructo no garantiza.
2. **El ítem inverso es el ítem ruidoso.** Los ítems con clave inversa son cognitivamente más exigentes y más sensibles a respuesta aquiescente (acquiescent responding) y a respuesta descuidada (careless responding). El balance directo/inverso del BFI-2 existe precisamente para controlar aquiescencia *en el puntaje de rasgo* (centrado intra-sujeto; dossier §2), pero ese mismo ítem inverso, usado como compuerta AND de un trigger de seguridad, se convierte en un atenuador de señal.
3. **La faceta del BFI-2-S tiene solo 2 ítems y baja confiabilidad.** α de facetas BFI-2-S ≈ .60–.70, M ≈ .60–.61 (Soto & John, 2017b; dossier §3.3). Soto y John advierten explícitamente que las facetas del BFI-2-S "solo deben usarse para inferencias confiables en muestras n ≥ 400" y que para inferencia individual a nivel de faceta se use el BFI-2 de 60 ítems. Una media de 2 ítems con α ≈ .65 tiene error de medición no trivial; construir un trigger conjuntivo sobre ella amplifica ese error en la dirección de la insensibilidad.

**Inconsistencia tonal con el resto del sistema (confirmada).** El pack PERMA §7.2 dispara `strong` con triggers **item-level disjuntivos** (`N1≥8`, `N3≥8`, `Lon≥8`, `hap≤2`, combo) sobre escala 0–10; no exige que dos ítems coincidan en el extremo. El pack Flourishing §7.2 también es disjuntivo (`item7=1 OR item6=1 OR total≤24`). El BFI-2-S es el único instrumento del stack con un trigger conjuntivo, y es el único con falso negativo estructural. La corrección alinea al BFI-2-S con el patrón ya validado de los otros dos instrumentos.

---

## 2. Marco: sensibilidad vs. especificidad en un safety net no clínico

### 2.1 Qué tipo de mecanismo es NFR-28

**Opinión profesional.** NFR-28 **no es un instrumento de cribado clínico (clinical screen)** y este documento no lo convierte en uno. Es una **red de seguridad editorial**: ante señales de malestar en ítems sensibles, antepone un mensaje de contención no clínico con rutas de ayuda (pack §7.3). El no-negociable §7 del proyecto exige proponer mitigaciones ante señales de malestar; NFR-28 es esa mitigación. Por tanto la pregunta de diseño no es "¿qué corte maximiza accuracy diagnóstica?" sino "¿qué regla minimiza el silenciamiento de casos reales sin que el mensaje pierda sentido por sobre-disparo?".

### 2.2 La asimetría de costos

| Error | Qué ocurre | Costo |
|---|---|---|
| **Falso negativo** | Usuario angustiado termina el test sin ver la ruta de contención | **Alto.** Se pierde la única oportunidad del producto de ofrecer apoyo. Contradice el no-negociable §7. Irreversible para esa sesión. |
| **Falso positivo** | Usuario que está bien ve un mensaje de contención suave y no alarmante | **Bajo.** El mensaje §7.3 es deliberadamente no clínico, no etiqueta y no exagera. Molestia menor. |

**Inferencia.** La asimetría obliga a diseñar hacia **sensibilidad**, exactamente lo contrario de lo que produce una regla conjuntiva (que prioriza especificidad). Esta es la misma lógica que Cowork aplicó y dejó documentada para el trigger `moderate` de PERMA (`PERMA-Profiler_TRIGGERS_MODERATE_VALIDATION_v1.0.md` §2): "el costo ético de un falso positivo (banner suave de más) es menor que el de un falso negativo (silencio ante malestar real)".

**Límite de la asimetría.** La sensibilidad no es gratis. Si el trigger dispara para una mayoría de usuarios, el mensaje de contención se vuelve ruido de fondo, pierde fuerza para quien sí lo necesita y roza un problema ético propio (alarmar o fatigar sin causa). Existe entonces un **piso de especificidad** que conviene preservar. El re-diseño busca el punto donde la sensibilidad sube de forma marcada sin que el disparo se generalice.

### 2.3 Evidencia bibliográfica

**Hecho — Emocionalidad Negativa como señal de malestar.** El neuroticismo / Emocionalidad Negativa (Negative Emotionality) es el predictor de rasgo más robusto de los trastornos internalizantes. El meta-análisis de Kotov, Gamez, Schmidt y Watson (2010) sobre la asociación entre los Big Five y los trastornos de ansiedad, depresivos y de uso de sustancias halló que el neuroticismo discrimina fuertemente a los grupos con trastorno depresivo y de ansiedad frente a controles (tamaños del efecto grandes; el neuroticismo fue el rasgo con mayor poder discriminante para los cuadros internalizantes). Esto respalda que los ítems de la faceta Depresión y Ansiedad del BFI-2-S **portan señal real de malestar** y son un sustrato legítimo para una red de seguridad.

**Hecho — pero la Emocionalidad Negativa no es una métrica clínica.** Soto y John (2017a) reemplazaron deliberadamente el término "Neuroticism" por "Negative Emotionality" para anclar el rasgo como **variación normativa de la reactividad emocional**, no como indicador clínico (dossier §1, hecho documentado). El propio diseño del constructo advierte contra leer un puntaje alto como diagnóstico. Implicación: el trigger debe activar una ruta de **apoyo y derivación**, nunca un lenguaje evaluativo o diagnóstico (consistente con la microcopy es-CO v1.0 y el no-negociable §7).

**Hecho — los ítems únicos de síntoma son específicos pero poco sensibles.** Lacruz et al. (2013), estudio KORA F3, evaluaron una pregunta única de tamizaje de depresión: contra el PHQ-9 obtuvieron sensibilidad 46 % / especificidad 94 %, y contra una definición más estricta de trastorno depresivo mayor, sensibilidad 83 % / especificidad 88 %. El meta-análisis bayesiano de Mitchell (2008) en cáncer y cuidados paliativos halló para una pregunta única de "depresión" sensibilidad 72 % / especificidad 83 %, y para **dos preguntas (ánimo bajo + pérdida de interés) evaluadas de forma disjuntiva**, sensibilidad 91 % / especificidad 86 %.

**Inferencia — lectura de diseño:**

- Un ítem único de síntoma tiende a ser **específico, no sensible**; el umbral elegido mueve el balance. Un umbral estricto (solo el extremo máximo) acerca a la zona de sensibilidad ~46 %; un umbral más permisivo (incluye "de acuerdo") acerca a la zona ~72–83 %. Para una red de seguridad, el umbral permisivo es el correcto.
- Combinar señales **de forma disjuntiva** (positivo si dispara *cualquiera*) sube sensibilidad y especificidad a la vez frente a un ítem único (Mitchell, 2008: 91 %/86 % con dos preguntas). Una regla **conjuntiva** (positivo solo si disparan *ambas*) hace lo opuesto: maximiza especificidad y hunde la sensibilidad. La regla vigente del BFI-2-S es conjuntiva — por eso falla.

**Nota de validez y contexto cultural.** Toda la evidencia anterior proviene de poblaciones no colombianas (Alemania, contextos oncológicos anglófonos, meta-análisis internacional). No existe baremo del BFI-2-S en Colombia ni percentiles ítem-nivel publicados de los ítems 4/9/19/24 en ninguna población (pack §3; "no existe baremo CFA del BFI-2-S en Colombia a mayo 2026"). Las cifras de sensibilidad/especificidad citadas son **referencia conceptual del comportamiento de ítems de síntoma**, no estimaciones transferibles del BFI-2-S es-CO. La tasa de disparo real solo se conocerá con monitoreo post-launch (§9).

---

## 3. Evaluación de las opciones

Se evalúan las tres opciones del briefing más las descartadas, contra dos criterios: cierra el falso negativo, y mantiene un piso de especificidad razonable.

### 3.1 Opción A — Trigger item-level disjuntivo (briefing)

`strong` si `item9=5 OR item4=5 OR item24_recoded≥4 OR item19_recoded≥4`.

| Pros | Contras |
|---|---|
| Cierra el falso negativo (`item9=5` dispara solo). | `item24_recoded≥4` e `item19_recoded≥4` como condiciones **autónomas** dejan que el ítem inverso ruidoso dispare por sí solo con un valor solo "de acuerdo" (raw ≤ 2). Es el ítem menos confiable actuando sin corroboración. |
| Tonalmente consistente con PERMA / Flourishing (disjuntivo, item-level). | `item4=5` ("worries a lot") tiene base normativa alta: preocuparse mucho es muy común y poco distintivo de malestar; tratarlo igual que `item9` infla falsos positivos. |
| Simple de implementar. | Mezcla umbrales heterogéneos sin justificarlos. |

### 3.2 Opción B — Media facetal con umbral bajado

`strong` si `faceta N2 ≥ 3.5 OR faceta N1 ≥ 3.5`.

| Pros | Contras |
|---|---|
| Cierra el falso negativo (`mean(5,3)=4.0 ≥ 3.5`). | Mantiene la **media facetal** como único vehículo: persiste la dilución y la baja confiabilidad (α ≈ .65, 2 ítems). |
| Cambio mínimo de una línea. | 3.5 está apenas por encima del punto medio 3.0 de la escala. Una fracción amplia de la población adulta puntúa > 3.5 en facetas de Emocionalidad Negativa; riesgo de sobre-disparo masivo y mensaje vaciado de sentido. |
| — | Umbral 3.5 sin anclaje normativo (no hay baremo BFI-2-S). Reproduce el patrón del gap HEURISTIC v0 de PERMA. |
| — | La media sigue permitiendo que un ítem inverso ruidoso arrastre, p. ej. `(2,5) → 3.5` dispara con el ítem directo en desacuerdo. |

### 3.3 Opción C — Híbrido escalado con `moderate`

`strong` si `(item9≥4 AND item24_recoded≥4) OR (item9=5)`; `moderate` con media facetal 3.0–3.5.

| Pros | Contras |
|---|---|
| `item9=5` solo cierra el falso negativo. | Solo trata Depresión en el ejemplo; necesita simetría para Ansiedad. |
| La conjunción `(item9≥4 AND item24_recoded≥4)` es una señal corroborada sólida. | Introduce `moderate` con banda facetal 3.0–3.5: zona apenas sobre el punto medio, **sin anclaje en literatura**. Es exactamente el gap que German pide evitar (riesgo HEURISTIC v0). |
| Estructura de dos niveles. | El `moderate` 3.0–3.5 dispararía para gran parte de la población; sobre-disparo del nivel suave. |

### 3.4 Decisión

**Recomendación: Opción A refinada** — se conserva el espíritu de A (item-level, disjuntivo, alineado con PERMA/Flourishing) y se corrigen sus dos debilidades: (1) se sustituyen las condiciones autónomas sobre el ítem inverso por una **cláusula de corroboración facetal** que impide que el ítem inverso ruidoso dispare solo salvo que sea casi máximo en combinación; (2) se reconoce la asimetría de base normativa entre `item9` (ánimo deprimido, baja base, alta saliencia) e `item4` (preocupación, base alta) y se les asigna trato distinto. Se **descarta el `moderate`** (§5). Detalle en §4.

---

## 4. Regla canónica re-diseñada — NFR-28 BFI-2-S v1.0

### 4.1 Regla

`strong` se activa si se cumple **cualquiera** de las dos cláusulas (disjunción):

**Cláusula A — Endorso directo de ánimo deprimido (item-level).**
ítem 9 (valor raw; ítem directo, `reversed = false`) **≥ 4**.
Interpretación: el usuario marca "de acuerdo" o "muy de acuerdo" con "Tiendo a sentirme deprimido/a, con el ánimo bajo". Es independiente del ítem inverso 24: cierra el falso negativo declarado de forma directa.

**Cláusula B — Elevación facetal corroborada (facet-level).**
faceta `N2` Depresión (media post-recodificación) **≥ 4.0** **O** faceta `N1` Ansiedad (media post-recodificación) **≥ 4.0**.
Interpretación: ambos ítems de la faceta, en conjunto, indican elevación. El ítem inverso contribuye, pero no puede disparar solo salvo que sea casi máximo cuando el directo es moderado.

`moderate`: **no se evalúa** para BFI-2-S v1.0 (§5).
`none`: cualquier otro caso.

### 4.2 Justificación de cada parámetro

| Decisión | Justificación |
|---|---|
| **Cláusula A solo sobre ítem 9, no sobre ítem 4** | "Tends to feel depressed, blue" es un autorreporte de bajo ánimo de **base normativa más baja y mayor saliencia** que "Worries a lot": preocuparse mucho es muy común y poco distintivo. Un path item-level sobre el ítem 4 inflaría falsos positivos sin ganancia de seguridad. La Ansiedad queda cubierta por la Cláusula B (ver 4.3, caso anxiety). **Punto de sign-off:** si German prefiere máxima sensibilidad simétrica, puede añadirse una Cláusula A2 `item4 = 5` (solo el extremo, no ≥ 4, para acotar el efecto base); Cowork la **no recomienda** pero la deja como override explícito. |
| **Umbral Cláusula A `≥ 4`, no `= 5`** | La evidencia de ítems únicos de tamizaje muestra que el umbral estricto (solo el extremo) acerca a sensibilidad ~46 % (Lacruz et al., 2013); el permisivo acerca a ~72–83 % (Mitchell, 2008). Para una red de seguridad con asimetría de costos, "de acuerdo" con un autorreporte explícito de ánimo deprimido **debe** activar la ruta. `= 5` descartaría a los respondedores "de acuerdo", una pérdida de sensibilidad inaceptable. |
| **Umbral Cláusula B `≥ 4.0`, no `3.5`** | 4.0 equivale a una media "de acuerdo" sobre los dos ítems; está claramente por encima del punto medio 3.0 y preserva el piso de especificidad. 3.5 (Opción B) cae apenas sobre el punto medio y dispararía para una fracción amplia de adultos normativos, vaciando el mensaje. No hay baremo es-CO que ancle ningún corte; 4.0 es la elección conservadora defendible mientras §9 no aporte datos. |
| **Disjunción A OR B, no conjunción** | Mitchell (2008): combinar señales de forma disjuntiva sube sensibilidad y especificidad frente al ítem único; la conjunción hace lo contrario. La disjunción también alinea al BFI-2-S con PERMA y Flourishing. |
| **El ítem inverso solo entra vía media facetal** | El ítem inverso es el más ruidoso (aquiescencia, respuesta descuidada, confiabilidad baja). Vía Cláusula B contribuye, pero para disparar solo necesita ser casi máximo (ver 4.3); no se le da una condición autónoma como en la Opción A original. |

### 4.3 Comportamiento — casos verificados

Likert 1–5. `N2 = mean(item9_raw, 6 − item24_raw)`; `N1 = mean(item4_raw, 6 − item19_raw)`.

| # | item9 | item24 raw | N2 | item4 | item19 raw | N1 | ¿A? | ¿B? | Resultado | Comentario |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 5 | 3 | 4.0 | — | — | — | Sí | Sí | **strong** | **Falso negativo declarado — corregido.** Doble cobertura. |
| 2 | 5 | 1 | 5.0 | — | — | — | Sí | Sí | **strong** | Caso máximo; la regla vigente también disparaba. |
| 3 | 4 | 3 | 3.5 | — | — | — | Sí | No | **strong** | Endorso directo moderado; la regla vigente lo silenciaba. |
| 4 | 3 | 1 | 4.0 | — | — | — | No | Sí | **strong** | Ítem directo neutro; el inverso máximo (raw 1) corrobora. |
| 5 | 3 | 2 | 3.5 | — | — | — | No | No | **none** | Señal mixta y leve; no disparar es defendible. |
| 6 | 2 | 1 | 3.5 | — | — | — | No | No | **none** | Perfil contradictorio; el ítem inverso solo no basta (Opción A original sí dispararía aquí — sobre-disparo evitado). |
| 7 | — | — | — | 5 | 3 | 4.0 | No | Sí | **strong** | Análogo del falso negativo en Ansiedad — cubierto por B. |
| 8 | — | — | — | 5 | 4 | 3.5 | No | No | **none** | "Me preocupo mucho" pero "manejo bien el estrés"; señal neta leve. |
| 9 | — | — | — | 4 | 2 | 4.0 | No | Sí | **strong** | Ambos ítems de Ansiedad elevados; corroborado. |
| 10 | 1 | 1 | 3.0 | 1 | 1 | 3.0 | No | No | **none** | Sin señal. |

**Nota sobre el caso 8.** `item4=5 + item19_raw=4` da `N1=3.5` y no dispara. Es un perfil internamente contradictorio (máxima preocupación + acuerdo explícito con "manejo bien el estrés"). No disparar es la decisión deliberada: la preocupación, contradicha por un autorreporte de buen afrontamiento y sin path item-level para el ítem 4, no constituye señal neta de la red de seguridad. Si German activa la Cláusula A2 opcional (§4.2), el caso 8 pasaría a `strong`.

---

## 5. Decisión sobre el trigger `moderate`

**Recomendación: NO introducir un trigger `moderate` para BFI-2-S en v1.0.**

| Razón | Detalle |
|---|---|
| **Redundancia** | El `strong` re-diseñado ya está calibrado al extremo sensible (Cláusula A `≥ 4`, Cláusula B `≥ 4.0`). A diferencia de PERMA — donde `moderate` (`N_mean>6.5`) capturaba un perfil de malestar difuso sin pico item-level que el `strong` item-level no veía — aquí la Cláusula B facetal ya captura la elevación agregada. No queda un residual de "malestar difuso" que un `moderate` cubra de forma única. |
| **Falta de anclaje** | Un `moderate` BFI-2-S caería forzosamente en media facetal ~3.0–3.5: zona apenas sobre el punto medio, **sin baremo ni corte publicado** (Soto & John no publican normas del BFI-2-S; pack §3). Es exactamente la zona que originó el gap HEURISTIC v0 de PERMA. Introducirlo replicaría el problema que este documento cierra. |
| **Confiabilidad** | La faceta BFI-2-S (2 ítems, α ≈ .65) no soporta una segunda clasificación más fina. Soto y John desaconsejan inferencia individual facetal con el BFI-2-S. |
| **Consistencia con el pack** | El pack §7.2 declara solo `strong`. Mantener el BFI-2-S de un solo nivel evita scope creep y es coherente con el origen documental. |

**Regla canonizada para el futuro.** Si más adelante emerge necesidad de un nivel `moderate` BFI-2-S (p. ej. tras el baremo colombiano H2/H3, pack §3.2), **debe anclarse primero en literatura o en percentiles colombianos** mediante ticket Cowork, y nunca introducirse en código como heurística. Esta es la lección del gap PERMA HEURISTIC v0 (`PERMA-Profiler_TRIGGERS_MODERATE_VALIDATION_v1.0.md`); se canoniza aquí para el BFI-2-S.

**Consecuencia para `detector.ts`:** `evaluateBfi2` devuelve únicamente `level: "strong"` o `level: "none"`. No produce `"moderate"`. El tipo `DistressLevel` no cambia (lo comparten PERMA y Flourishing).

---

## 6. Spec algorítmica para `lib/distress/detector.ts` → `evaluateBfi2`

**Destinatario:** Claude Code. Trabajo de implementación (~30 min estimado post-spec). Cowork entrega spec; CC implementa, testea y mergea.

### 6.1 Contrato

- **Función:** `evaluateBfi2(ctx: DistressContext): DistressResult` (firma existente, sin cambios).
- **Entradas relevantes de `ctx`:**
  - `ctx.scores`: `DistressScore[]` con `facetCode` y `rawScore`. Se leen `facetCode === "N2"` (Depresión) y `"N1"` (Ansiedad) — medias facetales **post-recodificación** ya calculadas por el engine. *(CC: confirmar que estos son los `facetCode` exactos que emite `computed_score` para el BFI-2-S; si el engine los prefija, ajustar las claves.)*
  - `ctx.rawResponses?`: `DistressItemResponse[]` con `sequenceNumber` y `rawValue`. `sequenceNumber` mapea 1:1 al número de ítem del pack (verificado en Migration 018). El ítem 9 es `sequenceNumber = 9`, `reversed = false`: su `rawValue` es directo, **sin recodificación**.
- **Salida:** `DistressResult` con `level ∈ {"strong","none"}` y `triggers` poblado para auditoría / UI.

### 6.2 Algoritmo (pseudocódigo)

```
función evaluateBfi2(ctx):
    triggers ← {}
    strong ← falso

    # --- Cláusula A: endorso directo de ánimo deprimido (item-level) ---
    # Requiere rawResponses. Ítem 9 es directo (reversed=false): rawValue sin recodificar.
    si ctx.rawResponses no está vacío:
        item9 ← rawValue donde sequenceNumber == 9
        si item9 existe y item9 >= 4:
            triggers.bfi2_item9_depressed ← item9
            strong ← verdadero

    # --- Cláusula B: elevación facetal corroborada (facet-level, siempre evaluable) ---
    N2 ← rawScore donde facetCode == "N2"   # Depresión, media post-recode
    N1 ← rawScore donde facetCode == "N1"   # Ansiedad, media post-recode
    si N2 existe y N2 >= 4.0:
        triggers.bfi2_depresion ← N2
        strong ← verdadero
    si N1 existe y N1 >= 4.0:
        triggers.bfi2_ansiedad ← N1
        strong ← verdadero

    si strong: devolver { level: "strong", triggers }
    devolver { level: "none", triggers: {} }
```

### 6.3 Spec ilustrativa en TypeScript

CC adapta al estilo real del archivo; los umbrales y la lógica son canónicos.

```typescript
// BFI-2-S NFR-28 trigger v1.0 — redisenado.
// Ref: implementation_packs/BFI-2-S_TRIGGERS_NFR28_REDESIGN_v1.0.md
//
// Reemplaza la regla conjuntiva v0 (faceta >= 4.5) que producia un falso
// negativo estructural: el item directo de sintoma quedaba diluido por el
// item inverso recodificado. Verificado SR-8 / GAP 3 (2026-05-20).
//
// Regla v1.0 — `strong` si CUALQUIERA (disjuncion):
//   Clausula A (item-level): item 9 (raw, directo) >= 4.
//   Clausula B (facet-level): faceta N2 Depresion >= 4.0 OR N1 Ansiedad >= 4.0.
// Sin trigger `moderate` (decision v1.0; ver spec seccion 5).
//
// Item 9 = sequenceNumber 9, reversed=false -> rawValue directo, sin recode.
// N1/N2 = medias facetales post-recode ya calculadas por el engine.
// Umbral A >= 4 (no = 5) y B >= 4.0 (no 3.5): ver spec secciones 2 y 4.2.
function evaluateBfi2(ctx: DistressContext): DistressResult {
  const triggers: Record<string, number | string | boolean> = {};
  let strong = false;

  // Clausula A — endorso directo de animo deprimido (requiere rawResponses).
  if (ctx.rawResponses && ctx.rawResponses.length > 0) {
    const byseq = new Map(
      ctx.rawResponses.map((r) => [r.sequenceNumber, r.rawValue]),
    );
    const item9 = byseq.get(9); // directo: sin recodificacion.
    if (item9 !== undefined && item9 >= 4) {
      triggers.bfi2_item9_depressed = item9;
      strong = true;
    }
  }

  // Clausula B — elevacion facetal corroborada (siempre evaluable).
  const scoreBy = new Map(ctx.scores.map((s) => [s.facetCode, s.rawScore]));
  const depresion = scoreBy.get("N2");
  const ansiedad = scoreBy.get("N1");
  if (depresion !== undefined && depresion >= 4.0) {
    triggers.bfi2_depresion = depresion;
    strong = true;
  }
  if (ansiedad !== undefined && ansiedad >= 4.0) {
    triggers.bfi2_ansiedad = ansiedad;
    strong = true;
  }

  if (strong) return { level: "strong", triggers };
  return { level: "none", triggers: {} };
}
```

### 6.4 Fallback score-only y gap derivado

**Inferencia.** Si `ctx.rawResponses` no se provee (modo score-only), la Cláusula A no se evalúa; solo corre la Cláusula B sobre las medias facetales. En ese modo el detector pierde el caso #3 de la tabla §4.3 (`item9=4, item24=3 → N2=3.5`, que solo la Cláusula A captura). El resultado es un cribado **degradado**, no equivalente.

**Recomendación:** garantizar que `evaluateBfi2` siempre reciba `rawResponses` cuando el instrumento es BFI-2-S; o documentar explícitamente el modo score-only como degradado. Es el mismo patrón ya señalado para PERMA (`[GAP-DETECTOR-PERMA-scoreonly]`).
**Acción BACKLOG sugerida:** ítem P2 con flag `[GAP-DETECTOR-BFI2-scoreonly]`.

### 6.5 Tests sugeridos para CC

Tests unitarios (pure function) que cubran como mínimo los 10 casos de la tabla §4.3. Críticos: caso #1 (falso negativo declarado → `strong`), caso #6 (ítem inverso solo → `none`, evita sobre-disparo), caso #7 (análogo Ansiedad → `strong`), y un caso score-only (sin `rawResponses`) verificando que la Cláusula B corre y la A no. Los tests S7 de scaffolding que asumían la regla `≥ 4.5` deben actualizarse.

---

## 7. Costo ético-clínico comparado de las opciones

| Opción | Falsos negativos | Falsos positivos | Veredicto ético (safety net no clínico) |
|---|---|---|---|
| **Vigente (conjuntiva ≥ 4.5)** | **Altos** — silencia casos con endorso directo del síntoma. Viola el no-negociable §7. | Casi nulos. | **Inaceptable.** Optimiza la variable equivocada (especificidad) en un mecanismo donde el falso negativo es el error caro. |
| **A original** | Bajos. | Elevados — el ítem inverso ruidoso y el ítem 4 de base alta disparan solos. | Aceptable en sensibilidad; sobre-disparo erosiona el mensaje y fatiga sin causa. |
| **B (≥ 3.5)** | Bajos. | **Muy elevados** — umbral apenas sobre el punto medio. | El sobre-disparo masivo vacía de sentido el mensaje; problema ético propio. |
| **C (con `moderate`)** | Bajos. | El `moderate` 3.0–3.5 sobre-dispara; banda sin anclaje. | El `moderate` reintroduce el gap HEURISTIC v0. |
| **A refinada (recomendada)** | Bajos — Cláusula A cierra el falso negativo declarado; Cláusula B cubre Ansiedad y la elevación corroborada. | Moderados y acotados — el ítem inverso no dispara solo salvo casi máximo; sin path sobre el ítem 4 de base alta. | **Recomendada.** Diseña hacia sensibilidad respetando un piso de especificidad; mensaje §7.3 no clínico mitiga el costo de los falsos positivos restantes. |

**Opinión profesional.** La recomendación no produce diagnóstico, no etiqueta clínicamente y no exagera valor predictivo: solo decide *cuándo* anteponer una ruta de apoyo. La asimetría de costos se resuelve a favor de la sensibilidad, consistente con el no-negociable §7 y con el criterio ya aplicado al trigger `moderate` de PERMA.

---

## 8. Monitoreo post-launch (obligatorio)

No existe baremo del BFI-2-S es-CO ni percentiles ítem-nivel publicados; la tasa de disparo real es desconocida pre-launch. `[Sin fuente verificada — tasa de disparo NFR-28 BFI-2-S en población colombiana]`.

| Acción | Detalle |
|---|---|
| 8.1 Métrica | Registrar `% de completaciones BFI-2-S que producen level="strong"` sobre `distress_event`, segmentado por cláusula disparada (`bfi2_item9_depressed` vs `bfi2_depresion` vs `bfi2_ansiedad`). |
| 8.2 Ventana | Primeros 100–500 usuarios colombianos del BFI-2-S post production launch S10. |
| 8.3 Umbral de alerta | **Inferencia / [sin fuente verificada]:** si `strong` se dispara en **> 30–35 %** de las completaciones, revisar. No es un corte validado; es un guardarraíl operativo análogo al de PERMA (`> 25–30 %`), algo más alto porque el BFI-2-S concentra ítems de Emocionalidad Negativa. |
| 8.4 Recalibración | Si se excede 8.3: subir Cláusula A a `= 5`, o subir Cláusula B a `≥ 4.25`, o ambas. Cambio de una línea por umbral; reversibilidad alta; sin migración de datos (`computed_score` y `distress_event` históricos no se afectan). |
| 8.5 Dato que afinaría la decisión | Percentiles ítem-nivel de los ítems 4/9/19/24 en muestra mexicana (Toledo-Fernández et al., 2022) o española (OSF kp572, Gallardo-Pujol et al., 2022) permitirían estimar la tasa de disparo **antes** del launch. Si German consigue acceso a esos datasets crudos, Cowork puede cerrar el gap en una iteración. |

---

## 9. Acciones para Claude Code y actualización del pack

1. Reemplazar `evaluateBfi2` en `lib/distress/detector.ts` por la spec §6.3. Actualizar el bloque de comentario v0 que cita la regla `≥ 4.5`.
2. Añadir tests unitarios §6.5; actualizar los tests S7 de scaffolding que asumían `≥ 4.5`.
3. Añadir a `BACKLOG.md` el ítem P2 `[GAP-DETECTOR-BFI2-scoreonly]` (§6.4).
4. Registrar la decisión como nuevo ADR en `DECISIONS_LOG.md` (formato decision doc; siguiente número disponible, DD-85 según `STATUS.md`), referenciando este archivo y GAP 3 / SR-8.
5. Actualizar el pack `BFI-2-S_Implementation_Acquisition_Pack_v1.0_Consolidado.md` §7.2 con el bloque drop-in del Apéndice A (o dejar el pack con un puntero a este archivo).

**Nota de clasificación.** `STATUS.md` clasifica GAP 3 como **P0 ético** (bloquea production launch S10); el briefing rotula la tarea de re-diseño como P1. No es contradicción: el gap es P0, la tarea Cowork derivada es P1. Este documento cierra ambos: entrega la spec que CC necesita para S9+/S10.

---

## Apéndice A — Bloque drop-in para `pack §7.2`

Reemplazar el párrafo "**Regla de disparo NFR-28:**" del pack por:

> **Regla de disparo NFR-28 (v1.0 — re-diseñada).** El detector activa `strong` si se cumple **cualquiera** de: (A) el ítem 9 ("Tiende a sentirse deprimido/a, con el ánimo bajo", valor crudo, ítem directo) ≥ 4; **o** (B) la faceta Depresión (N2) ≥ 4.0/5 **o** la faceta Ansiedad (N1) ≥ 4.0/5 (medias post-recodificación). No se evalúa nivel `moderate`. La regla conjuntiva original (`faceta ≥ 4.5` exigiendo ambos ítems en el extremo) se descartó por producir un falso negativo estructural. Spec completa, justificación de sensibilidad/especificidad y spec algorítmica: `implementation_packs/BFI-2-S_TRIGGERS_NFR28_REDESIGN_v1.0.md`.

---

## 10. Referencias (APA 7)

Gallardo-Pujol, D., Rouco, V., Cortijos-Bernabeu, A., Oceja, L., Soto, C. J., & John, O. P. (2022). Factor structure, gender invariance, measurement properties, and short forms of the Spanish adaptation of the Big Five Inventory-2. *Psychological Test Adaptation and Development, 3*(1), 44–69. https://doi.org/10.1027/2698-1866/a000020

Kotov, R., Gamez, W., Schmidt, F., & Watson, D. (2010). Linking "big" personality traits to anxiety, depressive, and substance use disorders: A meta-analysis. *Psychological Bulletin, 136*(5), 768–821. https://doi.org/10.1037/a0020327

Lacruz, M. E., Emeny, R. T., Bickel, H., Linkohr, B., & Ladwig, K. H. (2013). Diagnostic utility of a one-item question to screen for depressive disorders: Results from the KORA F3 study. *BMC Family Practice, 14*, 198. https://doi.org/10.1186/1471-2296-14-198

Mitchell, A. J. (2008). Are one or two simple questions sufficient to detect depression in cancer and palliative care? A Bayesian meta-analysis. *British Journal of Cancer, 98*(12), 1934–1943. https://doi.org/10.1038/sj.bjc.6604396

Soto, C. J., & John, O. P. (2017a). The next Big Five Inventory (BFI-2): Developing and assessing a hierarchical model with 15 facets to enhance bandwidth, fidelity, and predictive power. *Journal of Personality and Social Psychology, 113*(1), 117–143. https://doi.org/10.1037/pspp0000096

Soto, C. J., & John, O. P. (2017b). Short and extra-short forms of the Big Five Inventory-2: The BFI-2-S and BFI-2-XS. *Journal of Research in Personality, 68*, 69–81. https://doi.org/10.1016/j.jrp.2017.02.004

Toledo-Fernández, A., Pérez-Matus, M., & Villalobos-Gallegos, L. (2022). Confirmatory factor analysis of the Big Five Inventory-2 and its extra-short form in a Mexican sample. *Suma Psicológica, 29*(2), 119–128. https://doi.org/10.14349/sumapsi.2022.v29.n2.4

---

## 11. Notas de calidad y limitaciones

- **Validez y contexto cultural.** No existe baremo del BFI-2-S en Colombia ni percentiles ítem-nivel publicados de los ítems 4/9/19/24 en ninguna población (pack §3). Los umbrales (A `≥ 4`, B `≥ 4.0`) son elecciones conservadoras de diseño, no cortes normativos validados. La equivalencia escalar es-CO está pendiente del piloto cognitivo (pack §8) y del baremo H2/H3 (pack §3.2). El monitoreo post-launch (§8) es obligatorio para validar la tasa de disparo real.
- **Confiabilidad facetal.** Las facetas del BFI-2-S tienen 2 ítems y α ≈ .60–.70 (Soto & John, 2017b); Soto y John desaconsejan inferencia individual facetal con el BFI-2-S. La Cláusula B se usa como **señal conservadora de banda**, no como clasificación dura; el error de medición alrededor de 4.0 es no trivial y refuerza el monitoreo §8.
- **No es un cribado clínico.** NFR-28 no diagnostica, no etiqueta y no predice. Activa una ruta de contención no clínica con recursos de ayuda. La spec respeta el no-negociable §7 y la microcopy es-CO v1.0.
- **Naturaleza de la evidencia citada.** Kotov et al. (2010), Lacruz et al. (2013) y Mitchell (2008) sustentan el *comportamiento general* de la Emocionalidad Negativa como señal de malestar y de los ítems de síntoma como específicos-pero-poco-sensibles. No son estimaciones transferibles del BFI-2-S es-CO; se usan como marco conceptual del trade-off, no como calibración.
- **Reversibilidad.** Alta. El cambio se acota a `evaluateBfi2`; no toca schema, migraciones ni datos históricos. Recalibrar umbrales (§8.4) es un cambio de una línea por umbral.
- **Decisión `moderate`.** Documentada en §5: no se introduce en v1.0. Cualquier `moderate` futuro debe anclarse en literatura o percentiles colombianos antes de implementarse.

---

*Fin de la spec v1.0. Pendiente sign-off de German para habilitar la implementación CC en S9+/S10 y cerrar GAP 3 (P0 ético, gating de production launch).*
