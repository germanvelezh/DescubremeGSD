# Response Anchors es-CO — v1.0 (Flourishing + BFI-2-S + PERMA-Profiler)

**Versión:** v1.0 — 2026-06-05 | **Owner:** Cowork — Investigador psicométrico senior / UX Writer (adaptación cultural es-CO)
**Naturaleza:** Addendum standalone (reference). NO edita los implementation packs; vive en paralelo, análogo a los DIFF previos del pack.
**Estado:** Wording canónico cerrado para piloto cognitivo / piloto cuantitativo / beta externa. La beta interna ya opera con el constructo correcto.

---

## Resumen ejecutivo

- Las anclas verbales (etiquetas de cada punto de la escala) se **extrajeron literalmente de las fuentes es citadas en cada pack**; no se inventó wording. Donde la fuente trae una inconsistencia interna, se normaliza a su propia forma dominante (documentado en §3).
- **Flourishing:** confirmado verbatim contra Martín-Carbonell et al. (2021), Appendix A. Sin cambios sobre el provisional v0 de CC.
- **BFI-2-S:** confirmado contra el formulario oficial es (Gallardo-Pujol et al., 2022 / OSF kp572). **Decisión abierta cerrada** (puntos 2/4 = "Algo …", §2.1). Punto 3 se corrige al literal de la fuente ("Neutral, sin opinión").
- **PERMA-Profiler:** extraído del PDF oficial español v2 (Tarragona/Kern). Dos anclas del provisional v0 de CC se reemplazan por el literal de la fuente: salud → "Pésima/Excelente"; extensión → "Nada/Completamente".
- **Regla operativa del runner (sin cambios):** el número de puntos por instrumento (7 / 5 / 11) está fijado en `instrument_version.likert_min/max` y NO cambia. Estas etiquetas son cosméticas para el respondiente; el motor de scoring opera sobre `raw_value` numérico. Las anclas se cablean por instrumento (FS, BFI) y por tipo de bloque vía `sequence_number` (PERMA).

---

## Flourishing (1–7, acuerdo)

**Fuente:** Martín-Carbonell, M., Espejo, B., Checa, I., & Fernández-Daza, M. (2021), *IJERPH*, 18(5), 2664 — **Appendix A**, encabezado de la escala de respuesta (versión colombiana validada, CC BY 4.0). DOI 10.3390/ijerph18052664.

| valor | ancla es-CO | fuente (pág/sección) |
|---|---|---|
| 1 | Muy en desacuerdo | Martín-Carbonell et al. (2021), Appendix A |
| 2 | En desacuerdo | Martín-Carbonell et al. (2021), Appendix A |
| 3 | Algo en desacuerdo | Martín-Carbonell et al. (2021), Appendix A |
| 4 | Ni de acuerdo ni en desacuerdo | Martín-Carbonell et al. (2021), Appendix A |
| 5 | Algo de acuerdo | Martín-Carbonell et al. (2021), Appendix A |
| 6 | De acuerdo | Martín-Carbonell et al. (2021), Appendix A |
| 7 | Muy de acuerdo | Martín-Carbonell et al. (2021), Appendix A |

**Texto literal de la fuente (Appendix A):** *"A continuación, encontrará 8 afirmaciones con las cuales usted puede o no estar de acuerdo. Seleccione la respuesta que indique su grado de acuerdo con cada afirmación. 7—Muy de acuerdo 6—De acuerdo 5—Algo de acuerdo 4—Ni de acuerdo ni en desacuerdo 3—Algo en desacuerdo 2—En desacuerdo 1—Muy en desacuerdo."*

- **Fidelidad al constructo:** anclas de **acuerdo** (no de gusto). Mapea el original inglés (1=Strongly disagree … 7=Strongly agree; "Slightly"→"Algo", "Strongly"→"Muy"). Simetría desacuerdo↔acuerdo pareja. 7 puntos fijos.
- **Cambio vs v0 CC:** ninguno (coincidencia verbatim).
- **Nota de adaptación:** el encabezado de la fuente usa "usted"; en el runner es-CO el stem/instrucción va en tuteo, pero **las etiquetas de los 7 puntos son registro-neutro** (sin marca tú/usted), por lo que se adoptan sin cambio.

---

## BFI-2-S (1–5, acuerdo) — decisión puntos 2/4 cerrada

**Fuente:** Gallardo-Pujol, D., Rouco, V., Cortijos-Bernabeu, A., Oceja, L., Soto, C. J., & John, O. P. (2022), *Psychological Test Adaptation and Development*, 3(1), 44–69 — **formulario oficial es del BFI-2-S**, sección "Instrucciones / escala de respuesta". DOI 10.1027/2698-1866/a000020. Materiales: OSF kp572 (CC-BY 4.0); PDF oficial alojado por Colby (`colby.edu/wp-content/uploads/2022/07/bfi2s-form-spanish.pdf`). Stem confirmado: **"Soy alguien que…"**.

| valor | ancla es-CO | fuente |
|---|---|---|
| 1 | Muy en desacuerdo | Gallardo-Pujol et al. (2022), formulario es BFI-2-S / OSF kp572 |
| 2 | Algo en desacuerdo | Gallardo-Pujol et al. (2022), formulario es BFI-2-S / OSF kp572 |
| 3 | Neutral, sin opinión | Gallardo-Pujol et al. (2022), formulario es BFI-2-S / OSF kp572 |
| 4 | Algo de acuerdo | Gallardo-Pujol et al. (2022), formulario es BFI-2-S / OSF kp572 |
| 5 | Muy de acuerdo | Gallardo-Pujol et al. (2022), formulario es BFI-2-S / OSF kp572 |

**Texto literal de la fuente:** *"1 Muy en desacuerdo · 2 Algo en desacuerdo · 3 Neutral, sin opinión · 4 Algo de acuerdo · 5 Muy de acuerdo"* (mapea el original 1=Disagree strongly … 5=Agree strongly; 3="Neutral; no opinion").

### Decisión abierta cerrada — puntos 2 y 4: **"Algo en desacuerdo" / "Algo de acuerdo"**

Referencia al planteamiento: pack BFI-2-S §9 punto 5 (línea 521) — Soto (2021) advierte que el rating "Agree a little" produce respuestas extremas que limitan la diferenciación; el pack dejó planteado testear `"De acuerdo"` simple vs `"De acuerdo un poco"`.

**Resolución y justificación (anclada):**
- **"Algo en desacuerdo / Algo de acuerdo" es el wording literal de la traducción validada y avalada por los autores** (Gallardo-Pujol et al., 2022, CC-BY; única versión española listada oficialmente por Colby). Criterio del proyecto: extraer de la fuente, no inventar; digitalizar sin degradar el instrumento.
- Se **descarta "Un poco …"**: aunque es un calco más literal del inglés "a little", NO es el wording validado; introducirlo sería un cambio sin respaldo psicométrico.
- Se **descarta "De acuerdo" simple** como ancla canónica v1.0: elimina el cuantificador y altera el espaciamiento semántico de la escala (el punto 4 dejaría de ser "acuerdo leve"), debilitando la equivalencia con el instrumento validado.
- La advertencia de Soto (2021) se atiende como **hipótesis a A/B-testear en el piloto cuantitativo** (no como motivo para desviarse del instrumento validado antes de tener datos es-CO). Reversible y documentada; ver §4.
- **Beneficio de consistencia entre instrumentos:** "Algo" coincide con los puntos 3/5 de Flourishing, lo que da coherencia léxica a las dos escalas de acuerdo del producto.

**Cambio vs v0 CC:** puntos 1, 2, 4, 5 = idénticos. **Punto 3 corregido**: v0 usaba "Ni de acuerdo ni en desacuerdo"; se adopta el literal de la fuente **"Neutral, sin opinión"** (política "fiel a cada fuente", confirmada por Owner 2026-06-05). Implica que el midpoint del BFI difiere intencionalmente del de Flourishing; ver §3 nota de midpoint.

---

## PERMA-Profiler (0–10, extremos por bloque)

**Fuente de anclas:** Kern, M. L., & Butler, J. (2014). *PERMA Profiler: Versión Española* (traducción de M. Tarragona, Universidad Tecmilenio; © 2013 University of Pennsylvania) — columna "Response Anchors", PDF oficial v2 (rev. 23-oct-2014): `peggykern.org/uploads/5/6/6/7/56678211/the_perma_profiler_espanol_v2_112914.pdf`. Instrumento base: Butler & Kern (2016), DOI 10.5502/ijw.v6i3.526. Triangulación de adaptación validada: Chaves et al. (2023, MX).

**Anclaje:** solo los extremos (0 y 10). Los puntos 1–9 quedan numéricos a propósito (radio buttons con solo los extremos rotulados, según el PDF oficial). Mapeo sequence→tipo idéntico al del pack §1.3 y al cableado por `sequence_number`.

| bloque | items (sequence) | extremo 0 | extremo 10 | fuente |
|---|---|---|---|---|
| frecuencia | 1, 2, 3, 4, 5, 13, 14, 15, 16, 17 | Nunca | Siempre | PERMA-Profiler español v2 (Tarragona/Kern), Response Anchors |
| evaluación / salud | 6, 18 | Pésima | Excelente | PERMA-Profiler español v2 (Tarragona/Kern), Response Anchors |
| extensión | 7, 8, 9, 10, 11, 12, 19, 20, 21, 22, 23 | Nada | Completamente | PERMA-Profiler español v2 (Tarragona/Kern), Response Anchors |

- **Fidelidad al constructo:** frecuencia (nunca/siempre), evaluación de salud (pésima/excelente), extensión/grado (nada/completamente). NO son anclas de gusto. "Pésima" concuerda en género con "salud" (femenino), que es el referente de ambos ítems del bloque (H1, H3). 11 puntos fijos (0–10).
- **Cambios vs v0 CC:** frecuencia = sin cambio (nunca/siempre). Evaluación: v0 "Terrible" → **"Pésima"** (literal de la fuente; confirmado por Owner 2026-06-05). Extensión: v0 "Para nada" → **"Nada"** (literal de la fuente; confirmado por Owner 2026-06-05).

### Nota de normalización (inconsistencias internas del PDF fuente)

El PDF oficial español trae dos etiquetas atípicas que se normalizan a la forma dominante del propio documento (no es invención; es alinear el outlier a la convención de la fuente):

| ítem (sequence) | etiqueta atípica en el PDF | forma canónica adoptada | razón |
|---|---|---|---|
| 1 (A1, "avance hacia metas") | frecuencia rotulada "0 = nada, 10 = todo" | **Nunca / Siempre** | 9 de 10 ítems de frecuencia usan "nunca/siempre"; "nada/todo" es outlier tipográfico |
| 7 (M1, "vida con propósito") | extensión rotulada "0 = Ninguna" | **Nada** | el resto del bloque extensión usa "Nada" |

Dado que el runner ancla por **tipo de bloque** (no por etiqueta individual), basta una etiqueta canónica por bloque; estas normalizaciones quedan absorbidas automáticamente.

---

## Notas transversales (fidelidad, criterios del proyecto)

1. **es-CO Colombia, tuteo cordial:** las anclas de los 3 instrumentos son **registro-neutro** (etiquetas de grado/frecuencia/evaluación sin marca tú/usted). No contienen "vosotros", "ordenador", "coger" ni regionalismos. El tuteo aplica al stem/instrucciones del ítem, no a estas etiquetas.
2. **Simetría interna:** Flourishing (3↔5 "Algo", 2↔6, 1↔7 "Muy") y BFI (1↔5 "Muy", 2↔4 "Algo") leen simétricos desacuerdo↔acuerdo, con pivote neutro central.
3. **Midpoint distinto entre FS y BFI (intencional):** FS usa "Ni de acuerdo ni en desacuerdo" y BFI usa "Neutral, sin opinión". Política adoptada: **fiel a cada fuente** (máxima equivalencia psicométrica con cada instrumento validado), aun a costa de uniformidad cosmética entre tests. Decisión reversible si producto prioriza consistencia UX (implicaría desviar el BFI 1 etiqueta del literal Gallardo-Pujol).
4. **No clínico, no determinista:** las etiquetas describen grado de acuerdo / frecuencia / extensión; no son cortes diagnósticos ni predicciones.
5. **Número de puntos fijo:** 7 (FS) / 5 (BFI) / 11 (PERMA). Lo único confirmado/ajustado aquí es el wording verbal, no la métrica.

---

## Pendientes / a validar (no bloqueantes para v1.0)

- **A/B test BFI puntos 2/4** ("Algo" vs "De acuerdo" simple) en el piloto cuantitativo, para cerrar empíricamente la advertencia de Soto (2021) con datos es-CO. Si el simple mejora diferenciación sin romper equivalencia, evaluar v1.1.
- **Piloto cognitivo:** verificar comprensión es-CO de "Pésima" (extremo 0 salud) y de "Nada" como "not at all" en el bloque extensión (alternativa documentada de UX: "Para nada", descartada como canónica por fidelidad a la fuente).
- **Triangulación Chaves et al. (2023):** confirmar que la adaptación mexicana validada no difiere en las etiquetas de extremo respecto del PDF oficial v2 (base léxica adoptada).

---

## Referencias (APA 7)

Butler, J., & Kern, M. L. (2016). The PERMA-Profiler: A brief multidimensional measure of flourishing. *International Journal of Wellbeing, 6*(3), 1–48. https://doi.org/10.5502/ijw.v6i3.526

Chaves, C., Ballesteros-Valdés, R., Madridejos, E., & Charles-Leija, H. (2023). PERMA-Profiler for the evaluation of well-being: Adaptation and validation in a sample of Mexican adults. *Applied Research in Quality of Life, 18*, 1517–1545. https://doi.org/10.1007/s11482-022-10132-1

Gallardo-Pujol, D., Rouco, V., Cortijos-Bernabeu, A., Oceja, L., Soto, C. J., & John, O. P. (2022). Factor structure, gender invariance, measurement properties, and short forms of the Spanish adaptation of the Big Five Inventory-2. *Psychological Test Adaptation and Development, 3*(1), 44–69. https://doi.org/10.1027/2698-1866/a000020 (Materiales: https://osf.io/kp572/)

Kern, M. L., & Butler, J. (2014). *PERMA Profiler: Versión Española* (M. Tarragona, Trad.; © 2013 University of Pennsylvania). https://www.peggykern.org/uploads/5/6/6/7/56678211/the_perma_profiler_espanol_v2_112914.pdf

Martín-Carbonell, M., Espejo, B., Checa, I., & Fernández-Daza, M. (2021). Adaptation and measurement invariance by gender of the Flourishing Scale in a Colombian sample. *International Journal of Environmental Research and Public Health, 18*(5), 2664. https://doi.org/10.3390/ijerph18052664

Soto, C. J. (2021). *Descriptive statistics for the BFI-2*. Colby Personality Lab. https://www.colby.edu/academics/departments-and-programs/psychology/research-opportunities/personality-lab/the-bfi-2/

Soto, C. J., & John, O. P. (2017). Short and extra-short forms of the Big Five Inventory–2: The BFI-2-S and BFI-2-XS. *Journal of Research in Personality, 68*, 69–81. https://doi.org/10.1016/j.jrp.2017.02.004

---

*Fin del addendum Response Anchors es-CO v1.0 — DescubreMe · Flourishing + BFI-2-S + PERMA-Profiler · 2026-06-05. No modifica los implementation packs; consúmase como reference junto a ellos.*
