# Flourishing Scale — Validación de triggers NFR-28 (§7.2)

**Tipo:** Addendum al `Flourishing_Implementation_Acquisition_Pack_v1.0_Consolidado.md` (§3.3 y §7.2).
**Versión:** 1.0 — 2026-05-21.
**Autor:** Cowork — Rol: Investigador psicométrico senior.
**Estado:** DRAFT para sign-off de German.
**Objeto:** validar los triggers de distrés del detector (`descubreme/lib/distress/detector.ts`, función `evaluateFlourishing`): cortes score-level (`total ≤ 24` → `strong`; `total 25–35` → `moderate`) y triggers item-level (ítems 1/6/7/8).
**Patrón:** `implementation_packs/PERMA-Profiler_TRIGGERS_MODERATE_VALIDATION_v1.0.md` v1.0.

---

## Resumen ejecutivo

A diferencia de PERMA `moderate` (que era una heurística añadida por Claude Code, sin respaldo en el pack — ver DD-86), los cortes Flourishing del detector **sí están declarados literalmente en el pack §7.2**: el código implementa el pack fielmente, no es inferencia CC. Sin embargo la verificación detecta tres problemas en el pack, no en el código: (1) **contradicción interna** — §3.3 fija el disparador de contención en `total ≤ 31` (≈P5) mientras §7.2 lo fija en `total ≤ 24`; (2) **etiquetas de percentil incorrectas** en §7.2 ("25–35 = P5–P10" cuando la propia tabla §3.1 da P5=31 y P10=35,6); (3) **préstamo conceptual sin fuente** — el comentario in-code rotula `total ≤ 24` como banda "languishing", categoría que pertenece al Mental Health Continuum de Keyes (2002), un instrumento distinto de la FS. La Flourishing Scale **no tiene cortes clínicos ni de cribado validados** (Diener et al., 2010, la define como medida continua; Martín-Carbonell et al., 2021, solo publica percentiles descriptivos). **Recomendación: Opción A — Ajustar.** Re-anclar el corte `strong` score-level de `≤ 24` a `≤ 31` (≤P5), llevándolo a coincidir con §3.3, y `moderate` de `25–35` a `32–35` (P5–P10). Esto resuelve la contradicción, ancla ambos niveles a la tabla de percentiles colombianos, y mantiene coherencia con las bandas de UI ya adoptadas (DD-80, BAJO ≤35). Los triggers item-level se mantienen sin cambios. Limitación clave: ningún corte de la FS tiene sensibilidad/especificidad validadas como screen; los triggers son **señales conservadoras de banda de bienestar**, no un instrumento de cribado.

---

## 1. Verificación contra fuentes primarias

### 1.1 Pack §7.2 y §3.3 — contradicción interna

**Hecho.** El detector `evaluateFlourishing` (líneas ~299–308 de `detector.ts`) implementa los cortes `total ≤ 24` → `strong` y `total ≤ 35` (rango efectivo 25–35) → `moderate`. Estos cortes **coinciden exactamente con el pack §7.2**, que declara: "Disparo fuerte: total ≤ 24 … O ítem 7 = 1 O ítem 6 = 1. Disparo moderado: total 25–35 … O ítem 1 = 1 O ítem 8 = 1. Sin disparo: total > 35." El detector no introdujo umbrales propios; reproduce §7.2.

**Hecho.** El mismo pack, en §3.3, declara una regla distinta: "Disparador NFR-28 (contención): puntaje total **≤ 31** (≈P5) O ítem 7 = 1 O ítem 6 = 1." §3.3 describe la misma ruta de contención (mismos triggers item-level 6 y 7) pero con umbral total **≤ 31**, no ≤ 24.

**Inferencia.** Hay una contradicción interna en el pack: §3.3 y §7.2 fijan el disparador `strong` en umbrales distintos (≤31 vs ≤24) para la misma regla. El detector siguió §7.2. Conforme al protocolo de inicio (CLAUDE.md proyecto §2.6), la contradicción se nombra explícitamente y no se asume cuál prevalece sin análisis (§2 de este documento).

### 1.2 Diener et al. (2010) — la FS es una medida continua sin cortes

**Hecho** (Diener et al., 2010; PDF oficial eddiener.com; Pack §1.2). La FS es una escala de 8 ítems, todos de clave directa, Likert 1–7, rango 8–56. La instrucción oficial de scoring es: "Add the responses … The possible range of scores is from 8 (lowest possible) to 56 (highest PWB possible). **A high score represents a person with many psychological resources and strengths.**" Los autores **no publican puntos de corte** —ni clínicos, ni de riesgo, ni de cribado—; presentan la FS como medida continua descriptiva.

**Hecho.** No existe evidencia indexada de cortes de la FS con sensibilidad/especificidad validadas como predictor de un nivel de riesgo afectivo. La FS correlaciona negativamente con depresión y ansiedad, pero **no evalúa malestar psicológico de forma directa** (todos sus ítems son afirmaciones positivas de bienestar). `[Sin fuente verificada — cutoff de la FS con accuracy diagnóstica.]`

### 1.3 Martín-Carbonell et al. (2021) — percentiles colombianos, sin cortes de riesgo

**Hecho** (Martín-Carbonell et al., 2021, DOI 10.3390/ijerph18052664, MDPI, CC BY 4.0). Adaptación colombiana, N = 1.255 adultos; estructura unidimensional confirmada (CFI = .985; RMSEA = .039; SRMR = .020); invarianza configural, métrica y escalar por género; fiabilidad compuesta CRI = .906; AVE = .758. Estadísticos del total: M = 46,79; DT = 8,64; asimetría = −1,99; curtosis = 5,07 (distribución fuertemente sesgada a la izquierda).

**Hecho.** El estudio **"provee percentiles para el puntaje total"** (resumen oficial) y describe la FS como medida válida "to assess **high levels** of wellbeing". Los autores **no proponen cortes clínicos ni de riesgo**: solo la tabla de percentiles. Tabla de percentiles colombianos (Pack §3.1, derivada de Martín-Carbonell et al., 2021, Tabla 6):

| Percentil | P5 | P10 | P15 | P20 | P25 | P50 | P75 | P90 | P95 |
|---|---|---|---|---|---|---|---|---|---|
| Puntaje FS | 31 | 35,6 | 39 | 42 | 44 | 49 | 52 | 55 | 56 |

### 1.4 Keyes (2002) — "languishing" es del MHC, no de la FS

**Hecho** (Keyes, 2002, DOI 10.2307/3090197). "Languishing" es una de tres categorías (flourishing / moderate / languishing) del modelo del Mental Health Continuum. Su operacionalización es **categórica y propia del instrumento MHC**: se diagnostica languishing cuando la persona reporta nivel bajo ("nunca" o "una o dos veces" en el último mes) en al menos 1 de 3 signos de bienestar hedónico **y** en al menos 6 de 11 signos de funcionamiento positivo.

**Inferencia.** "Languishing" no es un punto de corte numérico sobre la FS de Diener. Son instrumentos e ítems distintos (la propia Martín-Carbonell et al., 2021, cita el MHC como escala separada). El comentario in-code que rotula `total ≤ 24` como banda "languishing" es un **préstamo conceptual sin fuente sobre la FS** y debe retirarse para no inducir una equivalencia inexistente. Keyes (2002) respalda conceptualmente la idea de que existe un estado real de bajo bienestar distinto del trastorno clínico —lo cual legitima que DescubreMe señale bandas bajas— pero **no aporta cortes sobre la métrica FS**.

### 1.5 Posición de los cortes en la distribución colombiana

**Inferencia** (sobre la tabla de percentiles empírica §3.1; se usa la tabla empírica y no la aproximación normal porque la distribución es fuertemente asimétrica, asimetría −1,99):

- `total ≤ 24` (corte `strong` actual): muy por debajo de P5 (= 31). Como referencia internacional, en la muestra normativa neozelandesa (Hone et al., 2014, N = 9.646) los puntajes brutos 8–26 corresponden al **percentil 1–2**. En Colombia `≤ 24` se ubica aproximadamente en **P1**, no "debajo del P5" en el sentido de "apenas bajo P5" que sugiere la redacción de §7.2.
- `total 25–35` (rango `moderate` actual): abarca desde ≈P1 (25) hasta ≈P9–P10 (35). **No es "P5–P10"** como dice §7.2: el límite inferior 25 está claramente por debajo de P5 (= 31).
- `total ≤ 31` (corte de §3.3): coincide con **P5** exacto de la tabla colombiana.
- `total ≤ 35`: coincide con ≈**P10** (P10 = 35,6) y con el límite superior de la banda BAJO ya adoptada (Pack §3.3; DD-80).

**Conclusión §1.** Los cortes del detector son trazables al pack §7.2 (no son inferencia CC), pero §7.2 tiene un gap de derivación: umbrales sin fuente bibliográfica, etiquetas de percentil incorrectas, y contradicción con §3.3. La única ancla empírica defendible es la tabla de percentiles colombianos.

---

## 2. Análisis: ¿son válidos los triggers?

### 2.1 Triggers score-level

**Hecho — qué SÍ está respaldado.** La existencia de una señal de banda baja de bienestar es defendible: la FS tiene validez convergente fuerte y consistente con SWLS, PANAS y optimismo/pesimismo (LOT) en la muestra colombiana (Martín-Carbonell et al., 2021), y un puntaje bajo es —en palabras de la literatura aplicada— un indicador de que la persona "podría estar pasando dificultades y beneficiarse de una evaluación adicional". El análisis IRT/GRM húngaro y el efecto techo (Pack §3.5) confirman que la FS **discrimina bien en niveles bajos y medios** del rasgo, lo que es favorable para un uso de cribado por banda baja.

**Hecho — qué NO está respaldado.** Ningún corte específico de la FS (ni 24, ni 31, ni 35) tiene accuracy validada como screen. Diener et al. (2010) no publican cortes. Por tanto los triggers score-level **no pueden presentarse como instrumento de cribado**; son señal de banda de bienestar.

**Inferencia — el problema del corte `strong = ≤ 24`.** Con `strong` score-level en ≤24 (≈P1), un usuario en P2–P5 (p. ej. total 28: promedio ≈3,5/7 en los 8 ítems, un perfil uniformemente bajo) cae solo en `moderate` por la vía score-only, es decir recibe el mensaje empático con líneas al final del reporte pero no la ruta de contención previa al resultado. El umbral ≤24 no tiene anclaje: ni es P5 (=31), ni es una cifra publicada, ni corresponde a "languishing". La única ancla razonable es el percentil; y el percentil que el propio pack designa como disparador de contención —en §3.3— es P5 = 31.

### 2.2 Triggers item-level (ítems 1, 6, 7, 8)

**Hecho.** El detector marca: ítem 7 = 1 → `strong`; ítem 6 = 1 → `strong`; ítem 1 = 1 → `moderate`; ítem 8 = 1 → `moderate`. Coinciden con el pack §7.2. Cada uno dispara solo con la respuesta `1` (piso absoluto de la escala 1–7).

**Opinión profesional.** Los triggers item-level se mantienen. Son **flags de validez aparente (face validity), de un solo ítem, sobre la respuesta de piso** — no screens validados, pero conservadores y defendibles:

- Ítem 7 ("Veo mi futuro con optimismo" = 1): la desesperanza es un factor de riesgo proximal reconocido (tradición de investigación de Beck sobre hopelessness). Marcar el piso de este ítem como `strong` es una red de sensibilidad razonable.
- Ítem 6 ("Soy una buena persona y tengo una buena vida" = 1): señal de autocrítica/culpa o de insatisfacción vital global; algo más ambigua que el ítem 7 (combina "buena persona" + "buena vida"), pero el piso de respuesta justifica un flag conservador.
- Ítems 1 y 8 = 1 → `moderate`: señales de menor severidad (vacío de propósito, rumiación por falta de respeto social), apropiadamente ruteadas al nivel más suave.

**Limitación.** Todos los ítems de la FS son afirmaciones positivas de bienestar; una respuesta de piso en un ítem positivo es una señal **más leve** que un pico en un ítem de emoción negativa (como en PERMA, N1/N3 ≥ 8). Por eso el sistema no debe depender solo de los triggers item-level: necesita también un ancla agregada (score-level). Esto motiva conservar el corte score-level `strong`, no removerlo.

### 2.3 Opciones consideradas

| Opción | Descripción | Veredicto |
|---|---|---|
| **A — Ajustar (recomendada)** | Re-anclar score-level a percentiles colombianos: `strong ≤ 31` (≤P5), `moderate 32–35` (P5–P10). Mantener item-level. Corregir trazabilidad y contradicción. | **Adoptar.** Resuelve la contradicción §3.3↔§7.2, ancla a la tabla empírica, coherente con DD-80. |
| B — Mantener (solo corregir trazabilidad) | Dejar `strong ≤ 24` / `moderate 25–35`; solo corregir comentarios y etiquetas de percentil. | Rechazada. Deja a un usuario en P2–P5 en `moderate`-solo; el umbral 24 no tiene ancla bibliográfica y contradice §3.3. |
| C — Remover score-level `strong` (estilo PERMA) | Dejar `strong` solo item-level (ítems 6/7); `moderate` cubre toda la banda BAJO. | Rechazada. La FS no tiene ítems de emoción negativa; dejar la ruta más intrusiva apoyada solo en dos ítems positivos de piso es base demasiado delgada. El ancla agregada (score-level) aporta robustez. |

**Opinión profesional — sobre el costo de subir `strong` de ≤24 a ≤31.** El cambio eleva la tasa de disparo `strong` score-only de ≈P1 a ≈P5 (hasta 5% de usuarios colombianos por la vía score-only). Se acepta porque: (a) §3.3 —la sección de bandas del propio pack— ya designa P5 = 31 como disparador de contención; el ≤24 de §7.2 es la anomalía interna, no §3.3; (b) mantiene coherencia con las bandas de UI ya adoptadas (DD-80: BAJO ≤35); (c) la asimetría de costos favorece no silenciar con `moderate`-solo a un usuario en P2–P5, cuyo perfil de bienestar es claramente bajo. El microcopy de contención es no clínico y de apoyo (Pack §7.3); el costo de un falso positivo (ruta de contención de más) es menor que el de un falso negativo.

---

## 3. Recomendación

**Opción A — Ajustar, con corrección sincronizada de código y pack.**

| Acción | Detalle |
|---|---|
| 3.1 Corte `strong` score-level | `total ≤ 24` → **`total ≤ 31`** (≤P5 colombiano; coincide con §3.3). |
| 3.2 Corte `moderate` score-level | `total 25–35` → **`total 32–35`** (P5–P10; límite superior de la banda BAJO §3.3). Sin disparo: `total > 35`. |
| 3.3 Triggers item-level | **Sin cambios.** Ítems 7 y 6 → `strong`; ítems 1 y 8 → `moderate`. |
| 3.4 Etiqueta in-code | Retirar el comentario `banda "languishing"` (préstamo de Keyes, instrumento distinto). Anotar `VALIDATED v1.0 (band-anchored a percentiles colombianos, conservative)` con referencia a este addendum. |
| 3.5 Pack §7.2 | Reescribir la regla de disparo con umbrales y percentiles correctos (texto en §4.2). |
| 3.6 Pack §3.3 | **Sin cambios** — §3.3 ya es correcto (≤31 = P5). La resolución de la contradicción es alinear §7.2 con §3.3, no al revés. |
| 3.7 Limitación explícita | Documentar que no es un screen validado; es señal conservadora de banda de bienestar. |
| 3.8 Monitoreo post-launch | Verificar en los primeros 100–500 usuarios colombianos que `strong` + `moderate` (score-level) disparen en conjunto en < 12–15% de las completaciones de FS (≈ banda BAJO ≤P10). Si excede, recalibrar contra percentiles propios (Pack §3.4, baremo DescubreMe H1). |

**Reversibilidad:** alta. El ajuste es un cambio de dos literales numéricos; sin migración de datos. Las `computed_score` y `distress_event` históricas no se ven afectadas.

**Trazabilidad de la decisión:** se sugiere registrar como DD-NN (decision doc) con referencia a este addendum, en línea con DD-85 (BFI-2-S) y DD-86 (PERMA). Carry para BACKLOG, análogo a PERMA: `[GAP-DETECTOR-FLOURISHING-scoreonly]` P2 — en modo score-only (sin `rawResponses`), los triggers item-level no se evalúan; garantizar que `evaluateFlourishing` reciba siempre `rawResponses` (call sites `lib/distress/persist.ts`) o documentar el fallback como degradado.

---

## 4. Specs para Claude Code (copy-paste-able)

### 4.1 Drop-in TypeScript — `descubreme/lib/distress/detector.ts`, función `evaluateFlourishing`

Reemplazar el bloque `// SCORE-level triggers (pack §7.2).` (actualmente líneas ~299–308) por:

```typescript
  // SCORE-level triggers — pack §7.2 corregido v1.0.
  //
  // VALIDATED v1.0 (band-anchored a percentiles colombianos, conservative)
  // — Cowork 2026-05-21.
  // Ref: implementation_packs/Flourishing_TRIGGERS_VALIDATION_v1.0.md
  //
  // Umbrales anclados a la tabla de percentiles colombianos de
  // Martin-Carbonell et al. (2021) Tabla 6 (N=1.255; M=46,79; DT=8,64):
  //   total <= 31  => <=P5    => `strong`   (coincide con disparador pack §3.3).
  //   total 32-35  =>  P5-P10 => `moderate` (limite superior de la banda BAJO).
  //   total  > 35  => >P10    => sin disparo (banda MEDIO/ALTO).
  // La FS no tiene cortes clinicos validados: Diener et al. (2010) la define
  // como medida continua y no publica cutoffs. `strong`/`moderate` NO son un
  // screen con sensibilidad/especificidad validada: son senales conservadoras
  // de banda de bienestar. Se retira la etiqueta "languishing" del comentario
  // previo: languishing es una categoria del Mental Health Continuum de Keyes
  // (2002), instrumento distinto de la FS; no aplica como corte numerico aqui.
  // Monitoreo post-launch: si `strong`+`moderate` score-level disparan juntos
  // >12-15% de completaciones FS en los primeros 100-500 usuarios CO,
  // recalibrar vs percentiles propios (Pack §3.4 baremo DescubreMe H1).
  // Carry P2: [GAP-DETECTOR-FLOURISHING-scoreonly] — analogo PERMA/BFI-2-S.
  if (total !== null) {
    if (total <= FLOURISHING_STRONG_TOTAL_MAX) {
      triggers.flourishing_total_strong = total;
      strong = true;
    } else if (total <= FLOURISHING_MODERATE_TOTAL_MAX) {
      triggers.flourishing_total_moderate = total;
      moderate = true;
    }
  }
```

Constantes nombradas a nivel de módulo (junto a `PERMA_LANGUISHING_TOTAL_MAX` / `PERMA_LANGUISHING_N_MIN`, patrón DD-86):

```typescript
// Flourishing Scale — cortes NFR-28 score-level, anclados a percentiles
// colombianos (Martin-Carbonell et al., 2021, Tabla 6).
// Ref: implementation_packs/Flourishing_TRIGGERS_VALIDATION_v1.0.md
const FLOURISHING_STRONG_TOTAL_MAX = 31;   // <=P5  colombiano
const FLOURISHING_MODERATE_TOTAL_MAX = 35; // <=P10 colombiano (banda BAJO)
```

El bloque item-level (ítems 1/6/7/8) **no cambia**. Recomendado: ajustar su comentario de cabecera para que cite este addendum y aclare que son flags de validez aparente de un solo ítem (no screens validados).

Sin cambios funcionales fuera de los dos umbrales. Tests esperados a actualizar: los casos unitarios de `evaluateFlourishing` que asumen `strong` en el rango 25–31 deben re-clasificarse a `strong` (antes `moderate`); añadir caso de borde `total = 31` → `strong`, `total = 32` → `moderate`, `total = 35` → `moderate`, `total = 36` → `none`.

### 4.2 Texto corregido para el pack — `Flourishing_Implementation_Acquisition_Pack_v1.0_Consolidado.md` §7.2

Reemplazar el bloque "Regla de disparo NFR-28" de §7.2 por:

```markdown
**Regla de disparo NFR-28** (cortes score-level validados v1.0 — ver
`implementation_packs/Flourishing_TRIGGERS_VALIDATION_v1.0.md`):

- **Disparo fuerte:** puntaje total ≤ 31 (≈ P5 colombiano, Martín-Carbonell
  et al., 2021, Tabla 6) **O** ítem 7 = 1 **O** ítem 6 = 1 → ruta de
  contención activa antes de mostrar el resultado.
- **Disparo moderado:** puntaje total 32–35 (≈ P5–P10; límite superior de la
  banda BAJO) **O** ítem 1 = 1 **O** ítem 8 = 1 → mensaje empático + líneas
  de atención al final del reporte.
- **Sin disparo:** puntaje total > 35 (≈ por encima de P10).

*Nota de corrección v1.0:* la versión original de §7.2 fijaba el disparo
fuerte en total ≤ 24 y el moderado en 25–35, etiquetados como "P5–P10".
Esa etiqueta era incorrecta (P5 = 31; P10 = 35,6 según §3.1) y el umbral
24 contradecía el disparador ≤ 31 declarado en §3.3. Se alinea §7.2 con
§3.3 y con la tabla de percentiles §3.1. La FS no tiene cortes clínicos
validados (Diener et al., 2010); estos umbrales son señales conservadoras
de banda de bienestar, no un instrumento de cribado.
```

§3.3 del pack **no requiere cambios**: su disparador "total ≤ 31 (≈P5)" ya era correcto.

---

## 5. Referencias (APA 7)

Diener, E., Wirtz, D., Tov, W., Kim-Prieto, C., Choi, D., Oishi, S., & Biswas-Diener, R. (2010). New well-being measures: Short scales to assess flourishing and positive and negative feelings. *Social Indicators Research, 97*(2), 143–156. https://doi.org/10.1007/s11205-009-9493-y

Hone, L. C., Jarden, A., & Schofield, G. (2014). Psychometric properties of the Flourishing Scale in a New Zealand sample. *Social Indicators Research, 119*(2), 1031–1045. https://doi.org/10.1007/s11205-013-0501-x

Keyes, C. L. M. (2002). The mental health continuum: From languishing to flourishing in life. *Journal of Health and Social Behavior, 43*(2), 207–222. https://doi.org/10.2307/3090197

Martín-Carbonell, M., Espejo, B., Checa, I., & Fernández-Daza, M. (2021). Adaptation and measurement invariance by gender of the Flourishing Scale in a Colombian sample. *International Journal of Environmental Research and Public Health, 18*(5), 2664. https://doi.org/10.3390/ijerph18052664

---

## 6. Notas de calidad y limitaciones

- **Validez / contexto cultural.** Los percentiles usados provienen de la muestra colombiana de Martín-Carbonell et al. (2021), N = 1.255 pero **sesgada a jóvenes** (edad media 25,6; <1% > 65 años — Pack §9, gap 2). Los cortes son referencia provisional, no baremo nacional estratificado. La recalibración con baremo propio DescubreMe (Pack §3.4, hitos H1–H3) es obligatoria pre-consolidación de v2.0.
- **La FS no es un instrumento de distrés.** Sus 8 ítems son afirmaciones positivas de bienestar; correlaciona negativamente con depresión y ansiedad pero no las mide directamente. Los triggers NFR-28 son una salvaguarda de cuidado, no un cribado clínico. No producen diagnóstico ni etiqueta clínica (no-negociable §7).
- **Confiabilidad y error de medición.** Fiabilidad compuesta CRI = .906 (alta) en la muestra colombiana, pero la distribución tiene fuerte efecto techo (asimetría −1,99); el análisis IRT/GRM (Pack §3.5) indica buena discriminación en niveles bajos-medios y pobre en niveles altos — favorable para un uso de cribado por banda baja, pero el error alrededor de cualquier corte sigue siendo no trivial. Esto refuerza tratar `strong`/`moderate` como señales conservadoras, no como clasificación dura.
- **Triggers item-level.** Se conservan por validez aparente; no tienen sensibilidad/especificidad validadas. El ítem 7 (optimismo/desesperanza) tiene el respaldo conceptual más fuerte (factor de riesgo proximal); el ítem 6 es algo más ambiguo. `[Sin fuente verificada — accuracy de ítems individuales de la FS como flag de riesgo.]`
- **Errata observada.** Martín-Carbonell et al. (2021), Tabla 6, reporta un mínimo observado = 7, fuera del rango teórico 8–56 (Pack §9, gap 4). No afecta los percentiles operativos ni esta recomendación.
- **Dato que afinaría la respuesta.** Un baremo colombiano estratificado por edad/región/NSE (o el dataset crudo de Martín-Carbonell et al., 2021) permitiría estimar la tasa de disparo real antes del launch, en lugar de depender del monitoreo post-launch (§3.8). Es el hito H1 del Pack §3.4.

---

*Fin del addendum v1.0. Pendiente sign-off de German. Al aprobarse: (1) registrar DD-NN; (2) mini-PR a `detector.ts` (patrón PR #35/#39); (3) actualizar pack §7.2; (4) añadir carry `[GAP-DETECTOR-FLOURISHING-scoreonly]` P2 a BACKLOG.*
