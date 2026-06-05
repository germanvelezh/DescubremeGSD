# PERMA-Profiler — Validación de triggers `moderate` (NFR-28)

**Tipo:** Addendum al `PERMA-Profiler_Implementation_Acquisition_Pack_v1.0_Consolidado.md` (§7.2).
**Versión:** 1.0 — 2026-05-20.
**Autor:** Cowork — Rol: Investigador psicométrico senior.
**Estado:** DRAFT para sign-off de German. Gating de production launch S10 (carry P1 BACKLOG, ticket Prompt 1 S7 / DD-80).
**Objeto:** validar los triggers `moderate` score-level del detector de distrés (`lib/distress/detector.ts`, función `evaluatePerma`), anotados in-code como `HEURISTIC v0 — pending Cowork validation`.

---

## Resumen ejecutivo

Los triggers `moderate` actuales (`PERMA_total < 5.0` o `N_mean > 6.5`) **no son una heurística arbitraria**: reproducen exactamente la banda "Languishing" publicada por Kern (peggykern.org) y, contra las normas internacionales de Butler & Kern (2016, Tabla 6, N≈32.000), corresponden aproximadamente al **percentil 11** (PERMA total) y al **percentil 84** (N). El comentario in-code que atribuye los umbrales a un cálculo `M + 1 SD` es **parcialmente incorrecto en la fuente** (la derivación real es la banda Kern; el cálculo `M+1 SD` para N converge por coincidencia: 4,46 + 2,06 ≈ 6,5). **Recomendación: Opción A — mantener los umbrales sin cambios**, corrigiendo la justificación bibliográfica in-code y degradando la etiqueta de `HEURISTIC v0` a `VALIDATED v1.0 (band-anchored, conservative)`. No se recomienda ajustar ni remover. Limitación clave: ningún corte PERMA tiene sensibilidad/especificidad validadas como screen de distrés; el trigger es una **señal conservadora de banda de bienestar**, no un instrumento de cribado.

---

## 1. Verificación contra fuentes primarias

### 1.1 Pack §7.2

**Hecho.** El Pack PERMA-Profiler v1.0 §7.2 declara la regla de activación de NFR-28 **únicamente con triggers item-level** (N1≥8, N3≥8, Lon≥8, hap≤2, combo N3≥7 ∧ Lon≥7). Todos corresponden al nivel `strong` del detector. **El pack no declara ningún trigger `moderate` ni ningún trigger score-level.** Los triggers `moderate` fueron añadidos por Claude Code en S6 como fallback score-level (DD-77/DD-78), no derivan del pack.

### 1.2 Butler & Kern (2016) — normas y postura sobre cortes

**Hecho** (Butler & Kern, 2016, Tabla 6, muestra combinada Samples 4–11):

| Dimensión | N | M | DT | P25 | P50 | P75 |
|---|---|---|---|---|---|---|
| Overall wellbeing (= PERMA total) | 31.966 | 7,02 | 1,66 | 6,13 | 7,38 | 8,25 |
| Negative emotion (N) | 31.386 | 4,46 | 2,06 | 3,00 | 4,33 | 6,00 |

**Hecho** (Butler & Kern, 2016, Tabla 7, validez convergente, Samples 4–11): PERMA total correlaciona con depresión r = −,61 (n=1.974), ansiedad r = −,53, estrés percibido r = −,58, soledad r = −,45. N correlaciona con depresión r = +,59, ansiedad r = +,68, estrés percibido r = +,67.
*Nota:* el pack §3 cita r PERMA–depresión = −,74; esa cifra proviene de la Tabla 4 (subconjunto k=4, n≈7.000), distinta de la Tabla 7 aquí verificada. Ambas son direccionalmente consistentes; se usa la cifra de Tabla 7 por ser la muestra mayor.

**Hecho** (Butler & Kern, 2016, p. 21): los autores declaran explícitamente *"At this point we cannot recommend an ideal profile. Indeed, the measure is intended to be descriptive – not prescriptive – in nature."* No publican puntos de corte ni tablas de sensibilidad/especificidad.

### 1.3 Bandas heurísticas de Kern (peggykern.org)

**Hecho.** Kern (s.f.), en peggykern.org/questionnaires.html, propone bandas heurísticas y advierte que **no recomienda el uso de puntos de corte**; las publica solo "si fueran necesarios", como opinión de la autora, no como datos normativos. Banda "Languishing": PERMA total **< 5,0**; N **> 6,5**. Banda "Sub-optimal": PERMA 5,0–6,4; N 5,1–6,5.

**Inferencia.** Los umbrales del detector (`PERMA_total < 5.0`, `N_mean > 6.5`) son **idénticos a los límites de la banda "Languishing" de Kern**. La derivación verdadera es la banda Kern, no un cálculo `M + 1 SD`. La coincidencia con `M + 1 SD` de N es fortuita pero confirmatoria: 4,46 + 2,06 = 6,52 ≈ 6,5.

### 1.4 Posición de los umbrales en la distribución normativa

**Inferencia** (cálculo Cowork sobre Tabla 6, asumiendo aproximación normal):

- `PERMA_total < 5,0`: z = (5,0 − 7,02) / 1,66 = **−1,22 → ≈ percentil 11**. Coincide con el límite inferior de la banda BAJO ya adoptada por DescubreMe (DD-57/DD-80, cortes literales Kern).
- `N_mean > 6,5`: z = (6,5 − 4,46) / 2,06 = **+0,99 → ≈ percentil 84**. El P75 de N es 6,00; el umbral 6,5 cae entre P75 y P90 (≈ 14–16 % de la muestra).

**Supuesto explícito.** El cálculo asume normalidad; N presenta asimetría positiva (M 4,46 > Mediana 4,33 leve), por lo que el percentil real de `N>6,5` puede ser algo más alto (menos casos). No degrada la conclusión.

### 1.5 Datos LATAM

**Hecho.** Chaves et al. (2023, México, N=26.506) reporta α total = ,92 y estructura de 5 factores, pero las medias y desviaciones por dimensión **no fueron verificables** en las fuentes accesibles (artículo Springer tras paywall). `[Sin fuente verificada — M y DT por dimensión de Chaves et al. 2023]`. Sin estos datos no es posible estimar la tasa de disparo `moderate` en una distribución hispanohablante; se asume provisionalmente equivalencia con la norma internacional y se traslada la verificación al post-launch (§4, monitoreo).

**Hecho.** No se localizó literatura indexada que reporte sensibilidad/especificidad de ningún corte de PERMA total o N como predictor de un nivel de riesgo afectivo. `[Sin fuente verificada — cutoff PERMA con accuracy diagnóstica]`. La noción de "languishing" como estado real de bajo bienestar, distinto del trastorno clínico, está respaldada conceptualmente por Keyes (2002), pero Keyes no aporta cortes sobre la métrica PERMA-Profiler.

---

## 2. Análisis: ¿son válidos los triggers `moderate`?

**Hecho — qué SÍ está respaldado.** (a) Los umbrales reproducen la banda "Languishing" de Kern, ya adoptada por DescubreMe para la banda BAJO (coherencia interna con DD-57/DD-80). (b) La validez convergente es fuerte: PERMA total bajo y N alto se asocian de forma robusta con depresión, ansiedad y estrés (Butler & Kern, 2016, Tabla 7). (c) Los umbrales son conservadores: ≈ P11 y ≈ P84 de la norma, no capturan a la mayoría.

**Hecho — qué NO está respaldado.** Ningún corte de PERMA tiene accuracy validada como screen. Butler & Kern y Kern desaconsejan explícitamente los cortes prescriptivos. Por tanto el trigger `moderate` **no puede presentarse como instrumento de cribado**; es una señal de banda de bienestar.

**Inferencia — lógica de dos niveles del detector.** El diseño actual es coherente: `strong` = señal aguda item-level (un ítem emocional ≥8, o felicidad ≤2); `moderate` = bienestar agregado bajo o afecto negativo agregado elevado, **sin pico item-level severo**. El trigger `N_mean > 6.5` cubre específicamente el perfil de malestar difuso (N1/N2/N3 uniformemente elevados sin que ninguno llegue a 8) que los triggers `strong` item-level no detectan. Esto es complementariedad útil, no redundancia.

**Opinión profesional — riesgos de remover (Opción C).** Eliminar `moderate` produciría: (1) incoherencia entre subsistemas — el reporte muestra "Banda BAJO" y el texto §5 de N-ALTO ya enruta a Línea 106/192, pero el detector quedaría en silencio; (2) falso negativo del perfil difuso; (3) tensión con el no-negociable §7 (rutas de contención ante señales de malestar). Se descarta C.

**Opinión profesional — riesgo de falsos positivos.** `N_mean > 6.5` puede disparar para ≈14–16 % de usuarios. Es la cifra más alta y la principal candidata a dilución de señal. Mitigantes: (a) el banner `moderate` (`contention_message_moderate`, microcopy v1.0, 80 palabras) es deliberadamente suave y no clínico; (b) buena parte de los casos N realmente severos ya caen en `strong`; (c) el residual `moderate`-solo es precisamente el perfil difuso que se quiere no silenciar. El costo ético de un falso positivo (banner suave de más) es menor que el de un falso negativo (silencio ante malestar real). Se acepta la sensibilidad.

**Opinión profesional — por qué no ajustar (Opción B).** Subir a `N>7,0` (≈ P89) solaparía casi por completo con `strong` y anularía la detección del perfil difuso. Bajar PERMA a `<4,5` (≈ P6) rompería la alineación con la banda BAJO (<5,0) ya adoptada, generando la misma incoherencia que la Opción C. Se descarta B.

---

## 3. Recomendación

**Opción A — mantener los umbrales actuales, con tres correcciones de trazabilidad.**

| Acción | Detalle |
|---|---|
| 3.1 Umbrales | `PERMA_total < 5.0` y `N_mean > 6.5` **se mantienen sin cambios**. |
| 3.2 Justificación | Re-anclar de "heurística `M+1 SD`" a: banda "Languishing" de Kern (s.f.), corroborada por las normas de Butler & Kern (2016, Tabla 6) — ≈ P11 y ≈ P84 de N≈32.000 — y por validez convergente (Tabla 7). |
| 3.3 Etiqueta in-code | Degradar `HEURISTIC v0 — pending Cowork validation` a `VALIDATED v1.0 (band-anchored, conservative)` con referencia a este addendum. |
| 3.4 Limitación explícita | Documentar que no es un screen validado; es señal de banda de bienestar. |
| 3.5 Monitoreo post-launch | Verificar en los primeros 100–500 usuarios colombianos que `moderate` se dispara en < 25–30 % de las completaciones de PERMA; si excede, recalibrar contra percentiles colombianos (Pack §3.2, Fase 1 baremo). |

**Reversibilidad:** alta. Si el monitoreo (3.5) muestra sobre-disparo, ajustar es un cambio de una línea por umbral. No hay migración de datos; las `computed_score` y `distress_event` históricas no se ven afectadas.

**Observación adicional (fuera de alcance estricto, sugerida para BACKLOG P2).** En modo score-only fallback (sin `rawResponses`), los triggers `strong` item-level no se evalúan; un usuario con N1=9 pero N2=2/N3=2 (media 4,3) no sería detectado por ninguna vía. Recomendación: garantizar que `evaluatePerma` siempre reciba `rawResponses`, o documentar el fallback como degradado. Flag sugerido: `[GAP-DETECTOR-PERMA-scoreonly]`.

---

## 4. Umbrales para CC (copy-paste-able)

Los **umbrales funcionales no cambian**. El mini-PR follow-up (patrón PR #35) es solo trazabilidad: reemplazar el bloque de comentario `HEURISTIC v0` en `lib/distress/detector.ts` (actualmente líneas ~123–135, antes del bloque score-level fallback de `evaluatePerma`) por:

```typescript
  // SCORE-level fallback (always evaluable from scores).
  //
  // VALIDATED v1.0 (band-anchored, conservative) — Cowork 2026-05-20.
  // Ref: implementation_packs/PERMA-Profiler_TRIGGERS_MODERATE_VALIDATION_v1.0.md
  //
  // Umbrales = limites de la banda "Languishing" de Kern (peggykern.org).
  // Corroborados por normas Butler & Kern (2016) Tabla 6 (N~31.966):
  //   PERMA_total < 5.0  => z=-1.22 => ~percentil 11.
  //   N_mean      > 6.5  => z=+0.99 => ~percentil 84 (~14-16% de la muestra).
  // Soporte de validez convergente (Butler & Kern 2016, Tabla 7):
  //   PERMA_total ~ depresion r=-.61, ansiedad r=-.53.
  //   N           ~ depresion r=+.59, ansiedad r=+.68.
  // NO es un screen con sensibilidad/especificidad validada: es una senal
  // conservadora de banda de bienestar. `moderate` = bienestar agregado bajo
  // o afecto negativo agregado elevado SIN pico item-level severo (los picos
  // item-level los cubre `strong`). Remover romperia coherencia con la banda
  // BAJO (DD-57/DD-80) y con la ruta de contencion §7.
  // Monitoreo post-launch: si `moderate` dispara >25-30% de completaciones
  // PERMA en los primeros 100-500 usuarios CO, recalibrar vs percentiles
  // colombianos (Pack §3.2 Fase 1). Carry: [GAP-DETECTOR-PERMA-scoreonly].
```

Bloque condicional sin cambios funcionales:

```typescript
  const scoreBy = new Map(ctx.scores.map((s) => [s.facetCode, s.rawScore]));
  const permaTotal = scoreBy.get("PERMA_TOTAL");
  const nMean = scoreBy.get("N");
  let moderate = false;
  if (permaTotal !== undefined && permaTotal < 5) {
    triggers.perma_total_low = permaTotal;
    moderate = true;
  }
  if (nMean !== undefined && nMean > 6.5) {
    triggers.perma_n_mean_high = nMean;
    moderate = true;
  }
```

*Opcional (mejora de trazabilidad, no obligatorio):* extraer `5.0` y `6.5` a constantes nombradas (p. ej. `PERMA_LANGUISHING_TOTAL_MAX = 5.0`, `PERMA_LANGUISHING_N_MIN = 6.5`) con el comentario de referencia. No altera comportamiento.

---

## 5. Referencias (APA 7)

Butler, J., & Kern, M. L. (2016). The PERMA-Profiler: A brief multidimensional measure of flourishing. *International Journal of Wellbeing, 6*(3), 1–48. https://doi.org/10.5502/ijw.v6i3.526

Chaves, C., Ballesteros-Valdés, R., Madridejos, E., & Charles-Leija, H. (2023). PERMA-Profiler for the evaluation of well-being: Adaptation and validation in a sample of university students and employees in the Mexican educational context. *Applied Research in Quality of Life, 18*(3), 1225–1247. https://doi.org/10.1007/s11482-022-10132-1

Kern, M. L. (s.f.). *Questionnaires – The PERMA-Profiler*. Centre for Wellbeing Science, University of Melbourne. Recuperado el 20 de mayo de 2026 de https://www.peggykern.org/questionnaires.html

Keyes, C. L. M. (2002). The mental health continuum: From languishing to flourishing in life. *Journal of Health and Social Behavior, 43*(2), 207–222. https://doi.org/10.2307/3090197

---

## 6. Notas de calidad y limitaciones

- **Validez/contexto cultural.** Las normas usadas (Butler & Kern, 2016) son internacionales con mayoría EE.UU./UK/Australia. No hay evidencia de equivalencia escalar con población colombiana; los percentiles estimados en §1.4 son **referencia provisional**, no baremo es-CO. La recalibración Fase 1 (§3.5) es obligatoria pre-consolidación de v2.0.
- **Confiabilidad de N.** N es una subescala de 3 ítems con α ≈ ,71–,73 (Butler & Kern, 2016); confiabilidad moderada. El error de medición alrededor del umbral 6,5 es no trivial; esto refuerza tratar `moderate` como señal conservadora y no como clasificación dura.
- **Ética §7.** La recomendación no produce diagnóstico, no etiqueta clínicamente y no exagera valor predictivo. El banner `moderate` es no clínico y aspiracional acotado. La asimetría de costos (falso positivo suave vs. falso negativo silencioso) se resuelve a favor de la sensibilidad, consistente con el no-negociable §7.
- **Dato que afinaría la respuesta.** M y DT por dimensión de Chaves et al. (2023) permitirían estimar la tasa de disparo en población hispanohablante antes del launch, en lugar de depender del monitoreo post-launch. Si German tiene acceso al PDF de Springer o a los archivos suplementarios, Cowork puede cerrar ese gap.

---

*Fin del addendum v1.0. Pendiente sign-off de German para cerrar el gating P1 de production launch S10.*
