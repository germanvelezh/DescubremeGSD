# PVQ-RR — Regla detector NFR-28 v1.0 (señal de proceso por omisión)

**Tipo:** Companion al `PVQ-RR_Implementation_Acquisition_Pack_v1.0_Consolidado.md` (§7.2 v2). Reemplaza la regla de disparo NFR-28 del pack §7.2 v1.0.
**Versión:** 1.0 — 2026-05-22.
**Autor:** Cowork — Rol: Investigador psicométrico senior.
**Estado:** APROBADA — sign-off German 2026-05-22 vía Opcion D (combo B+C) S12 mini-sprint planning. Cierra G1 `[GAP-PVQRR-SENSITIVE-NO-ROUTE]` P2 ético spec-delivered (SR-10 review, 2026-05-21). Impl `evaluatePvqRr` carry S13+ post-skip-feature CC (este sprint S12 entrega skip-feature pre-requisito).
**Patrón:** `BFI-2-S_TRIGGERS_NFR28_REDESIGN_v1.0.md` + `PERMA-Profiler_TRIGGERS_MODERATE_VALIDATION_v1.0.md` + `Flourishing_TRIGGERS_VALIDATION_v1.0.md`.
**Decisión de enfoque:** German, AskUserQuestion 2026-05-22 — "Regla de señal de proceso (omisión)".
**No bloquea:** S11 (cerrado, decisión C DD-93: JSDoc en `detector.ts` l.75 + BACKLOG entry). **Bloquea:** impl `evaluatePvqRr` CC S12+.

---

## Resumen ejecutivo

El PVQ-RR es un instrumento de **valores**, no una escala de depresión/ansiedad. A diferencia de BFI-2-S, PERMA y Flourishing —donde el *valor de la respuesta* es la señal de malestar (endosar "me siento deprimido" = señal)— en el PVQ-RR **ningún valor de respuesta es señal de distrés**: una calificación alta o baja de similitud con el retrato de Humildad, Tradición o Poder no indica malestar. Lo potencialmente incómodo es el *contenido del ítem* (puede evocar recuerdos dolorosos), no la respuesta dada. Por tanto la pre-recomendación de implementar una cláusula sobre `centered_score` de Humility o sobre `raw_value` de ítems HUM **se descarta**: exageraría el valor predictivo del test (no-negociable §6) y carece de sustento psicométrico. La señal honesta y derivable es de **proceso**: la **omisión** de ítems sensibles. El pack §7.2 v1.0 ya prevé saltar ítems manteniendo ≥2/3 por faceta; `rawResponses` se construye desde `item_response`, así que un ítem saltado queda ausente del array y es contable sin telemetría nueva. Regla v1.0: disjuntiva de dos cláusulas (omisión difusa **O** omisión concentrada en una faceta sensible), nivel **`moderate` únicamente** (sin `strong`: no hay endoso de síntoma agudo). Es una salvaguarda **secundaria**; la mitigación primaria de NFR-28 para PVQ-RR es la capa UX (disclaimer pre/post, opción explícita de saltar, pausar). Limitación estructural declarada: la regla no detecta a quien completa todos los ítems pese a la incomodidad.

---

## 1. Justificación empírica de las cláusulas

`Hecho.` No existe literatura que proporcione umbrales empíricos de cribado de distrés para el PVQ-RR. El instrumento no mide malestar psicológico: sus 57 ítems son retratos de prioridades de valor en escala de similitud 1–6, todos en clave directa (pack §4). El propio dossier `27_PVQ-RR_Consolidado` §10–§11 lo confirma: "PVQ-RR no está validado para… predicción"; ningún ítem es un autorreporte de síntoma. Cualquier umbral aquí es razonamiento clínico-conservador, no un corte validado.

`Hecho — sustrato de la señal.` La metodología de encuestas documenta que los ítems de contenido sensible producen **mayor tasa de no-respuesta / omisión** que los ítems neutros (Tourangeau & Yan, 2007, *Psychological Bulletin*): la omisión selectiva de ítems sensibles es un indicador conocido de que el contenido del ítem resultó aversivo para el respondiente. Esto sustenta el *mecanismo* (contenido sensible → más omisión), **no** la inferencia "omisión = distrés clínico".

`Hecho — por qué estos 15 ítems.` El pack §7.2 v1.0 identifica 15 ítems sensibles con justificación de contenido: Humility 7/38/54 (pueden activar invalidación en baja autoestima — y el dossier §5 documenta que Torres et al., 2016, hallaron ítems de humildad "problemáticos" en LATAM, α global = .47); Tradition 18/33/40 (conflictos religiosos/familiares); Conformity-Interpersonal 4/22/51 (tensión en víctimas de coerción); Power-Dominance 6/29/41 y Power-Resources 12/20/44 (sentimientos de desigualdad económica/de género). Migration 021 los sembró con `item.sensitivity='emotional_distress'`.

`Inferencia.` Omitir ítems sensibles es una señal de **validez aparente (face validity), de baja especificidad**: un usuario puede saltarlos por incomodidad, pero también por fatiga, indiferencia o falta de comprensión. Por eso (a) la regla solo produce `moderate`, nunca `strong`; (b) la cláusula concentrada (§3, B) es más específica que la difusa; (c) el monitoreo post-piloto es obligatorio (§4).

`Opinión profesional.` La asimetría de costos aplicada en DD-85/DD-86/DD-89 se mantiene: el falso negativo (silenciar a alguien incómodo) pesa más que el falso positivo (banner empático suave de más). Pero aquí la asimetría se resuelve con un umbral moderado, no agresivo, porque la señal es indirecta y el riesgo de sobre-disparo erosiona el mensaje.

## 2. Item-level vs. facet-level vs. centered_score — sobre qué opera la regla

La regla **no opera sobre valores de respuesta ni sobre `centered_score`**. Opera sobre la **completitud de respuesta** (presencia/ausencia de filas `item_response`), una señal de proceso.

| Candidato | Veredicto |
|---|---|
| `rawResponses` (valor crudo 1–6) | **Descartado.** Ningún valor Likert del PVQ-RR es señal de distrés; usarlo patologizaría una prioridad de valor. |
| `centered_score` (post-MRAT, engine v0.4) | **Descartado.** El score centrado mide prioridad relativa de un valor, no malestar. Un Humility centrado ≤P5 significa "Humildad es de las prioridades más bajas de esta persona" — no implica distrés. |
| Omisión de ítems (ausencia en `rawResponses`) | **Adoptado.** Único sustrato honesto: refleja conducta de evitación frente a contenido sensible. |

Cláusula A es de nivel **subconjunto** (los 15 ítems sensibles agregados). Cláusula B es de nivel **faceta**, pero sobre completitud, no sobre score.

## 3. Regla canónica v1.0 — disjuntiva de dos cláusulas

Conjunto de ítems sensibles (sequenceNumber = número de ítem PVQ-RR, pack §4):

| Faceta sensible | Ítems (sequenceNumber) |
|---|---|
| Humility (HUM) | 7, 38, 54 |
| Tradition (TR) | 18, 33, 40 |
| Conformity-Interpersonal (COI) | 4, 22, 51 |
| Power-Dominance (POD) | 6, 29, 41 |
| Power-Resources (POR) | 12, 20, 44 |

**`moderate`** se activa si se cumple **cualquiera** de las dos cláusulas (disjunción):

- **Cláusula A — Omisión difusa.** El usuario omitió **≥ 4** de los 15 ítems sensibles (ausentes de `rawResponses`).
  Interpretación: evitación dispersa del contenido sensible. Umbral 4 ≈ 27 % del pool sensible; por encima de una omisión accidental, por debajo del máximo que la regla de validez §7.2 permite repartido (1 por faceta × 5 = 5). Elección conservadora de diseño.

- **Cláusula B — Omisión concentrada en una faceta sensible.** El usuario omitió **≥ 2** de los 3 ítems de **alguna** de las 5 facetas sensibles (HUM/TR/COI/POD/POR).
  Interpretación: evitación de un tema específico — señal más específica que la difusa. Umbral 2 = piso de validez §7.2 (con 2 omitidos solo queda 1 ítem respondido, el mínimo). Si se omiten los 3 (faceta invalidada por scoring), B también dispara.

**`none`:** cualquier otro caso.
**`strong`:** **no se evalúa** para PVQ-RR v1.0. La omisión es una señal indirecta y de baja especificidad; el nivel `strong` (interstitial de contención antes del resultado) se reserva para endoso de síntoma agudo, que el diseño del PVQ-RR no puede producir. Decisión documentada análoga a BFI-2-S §5 ("no `moderate`"); aquí: "no `strong`". `evaluatePvqRr` devuelve `moderate` o `none`.

**Dependencia crítica.** La regla presupone que el plugin PVQ-RR implementa la función de **saltar ítems** (declarada como requisito en pack §7.2 v1.0). Si esa feature no está implementada, los 57 ítems siempre tendrán respuesta, la regla nunca dispara, y `evaluatePvqRr` degrada de facto a "siempre `none`" (equivalente al fallback UX-only). CC debe confirmar esto antes de la impl S12 — ver §Apéndice `[GAP-PVQRR-SKIP-FEATURE]`.

## 4. Caveat empírico v1.0

Este documento **no afirma evidencia empírica robusta**. El PVQ-RR es un instrumento de valores (pack §3.0, dossier §1), no clínico. Los umbrales (A ≥ 4, B ≥ 2) son **elecciones conservadoras de diseño**, no cortes con sensibilidad/especificidad validadas; no existe tasa de omisión base publicada para los ítems sensibles del PVQ-RR en ninguna población `[sin fuente verificada]`. La regla es **provisional Q3 2026, pre-piloto cognitivo** (pack §8, N=30 Colombia). Recalibración en el roadmap H1: con baremo colombiano N ≥ 500 (pack §3.3) y datos de tasa de omisión real, ajustar A y B. Guardarraíl operativo de monitoreo (inferencia, no corte validado): si `moderate` dispara en > 20–25 % de las completaciones PVQ-RR en los primeros 100–500 usuarios colombianos, revisar al alza el umbral A. Reversibilidad alta: cambio de un literal por umbral, sin migración de datos.

## 5. Microcopy NFR-28 es-CO (5 strings)

El detector `moderate` de PVQ-RR reutiliza los textos canónicos genéricos de `producto/microcopy/NFR-27_NFR-28_es-CO_v1.0.md` salvo el banner `moderate`, que requiere variante propia (el genérico habla de "tristeza/desánimo", inadecuado para un disparo por omisión). **Principio:** la microcopy del usuario **nunca** menciona que omitió preguntas — eso se sentiría como vigilancia; el trigger es interno y auditable, el copy es genérico-empático.

1. **`disclaimer_pre_emotional_distress`** — reutiliza el texto canónico genérico (microcopy v1.0 §2) con placeholders `{instrument_name}` = "el cuestionario de valores PVQ-RR" y `{item_count}` = 57.

2. **`disclaimer_post_emotional_distress`** — reutiliza el texto canónico genérico (microcopy v1.0 §3) sin cambios; se renderiza siempre en el reporte PVQ-RR por tener `ethical_flags='emotional_distress'`.

3. **`contention_message_moderate__pvqrr`** — variante PVQ-RR (banner inline en `/reporte/[sessionId]`, no bloqueante, después de resultados):

   > Algunas de las preguntas de este cuestionario tocan temas personales —la familia, las creencias, el lugar de uno frente a los demás— que a veces remueven recuerdos o emociones difíciles. Eso es normal cuando uno se mira con calma. Si en este momento sientes que algo te pesa, hablar con alguien suele aliviar. Más abajo encuentras líneas de atención gratuitas en Colombia, y siempre puedes acudir a tu EPS si quieres apoyo profesional. Tu bienestar va primero.

4. **`contention_resources_intro`** — lead-in al bloque de recursos:

   > Si en cualquier momento quieres acompañamiento, estas líneas son gratuitas y confidenciales:

5. **`skip_item_affordance`** — microcopy del control "saltar pregunta" visible en los 15 ítems sensibles (hook UX que habilita toda la regla):

   > ¿Prefieres no responder esta? Puedes saltarla y seguir; tu perfil se calcula igual.

Las líneas de atención Colombia se renderizan desde la tabla consolidada de microcopy v1.0 §6 (componente `<ContentionResourcesList />`). La Línea 123 **no** aparece en el flujo `moderate` (microcopy v1.0 §5, criterio: 123 se reserva para `strong` / ideación activa).

## 6. Spec de implementación para Claude Code (S12+)

**Destinatario:** Claude Code. Cowork entrega spec; CC implementa, testea y mergea en S12+.

**Contrato.** Función `evaluatePvqRr(ctx: DistressContext): DistressResult` (firma existente del módulo `lib/distress/detector.ts`). Salida: `level ∈ {"moderate","none"}`, nunca `"strong"`. Dispatch: añadir `if (context.instrumentCode === "PVQ-RR") return evaluatePvqRr(context);` en `evaluateDistress`, reemplazando la rama JSDoc fallback de la línea ~75 (decisión C DD-93).

`rawResponses` se construye always-on desde `item_response` (`persist.ts` l.~88); un ítem saltado queda **ausente** del array. La regla cuenta ausencias, no valores.

```typescript
// PVQ-RR NFR-28 trigger v1.0 — regla de senal de proceso (omision).
// Ref: implementation_packs/PVQ-RR_TRIGGERS_NFR28_v1.0.md
//
// El PVQ-RR es un instrumento de valores: NINGUN valor de respuesta es senal
// de distres. La regla NO inspecciona rawValue ni centered_score; inspecciona
// la OMISION de items sensibles (ausencia en rawResponses).
//
// Regla v1.0 — `moderate` si CUALQUIERA (disjuncion):
//   Clausula A (subconjunto): >=4 de los 15 items sensibles omitidos.
//   Clausula B (faceta):      >=2 de los 3 items de alguna faceta sensible
//                             omitidos (HUM/TR/COI/POD/POR).
// Sin nivel `strong` (decision v1.0; ver spec seccion 3).
// Depende de que el plugin implemente saltar items (pack §7.2);
// si no, la regla nunca dispara -> [GAP-PVQRR-SKIP-FEATURE].

const PVQRR_SENSITIVE_FACETS: Record<string, number[]> = {
  HUM: [7, 38, 54],
  TR: [18, 33, 40],
  COI: [4, 22, 51],
  POD: [6, 29, 41],
  POR: [12, 20, 44],
};
const PVQRR_DIFFUSE_OMISSION_MIN = 4; // Clausula A: >=4 de 15 omitidos
const PVQRR_FACET_OMISSION_MIN = 2;   // Clausula B: >=2 de 3 por faceta

function evaluatePvqRr(ctx: DistressContext): DistressResult {
  const triggers: Record<string, number | string | boolean> = {};
  const answered = new Set((ctx.rawResponses ?? []).map((r) => r.sequenceNumber));

  let diffuseOmitted = 0;
  let moderate = false;

  for (const [facet, seqs] of Object.entries(PVQRR_SENSITIVE_FACETS)) {
    const omittedInFacet = seqs.filter((s) => !answered.has(s)).length;
    diffuseOmitted += omittedInFacet;
    // Clausula B — omision concentrada en una faceta sensible.
    if (omittedInFacet >= PVQRR_FACET_OMISSION_MIN) {
      triggers[`pvqrr_facet_omission_${facet}`] = omittedInFacet;
      moderate = true;
    }
  }
  // Clausula A — omision difusa sobre el pool de 15 items sensibles.
  if (diffuseOmitted >= PVQRR_DIFFUSE_OMISSION_MIN) {
    triggers.pvqrr_diffuse_omission = diffuseOmitted;
    moderate = true;
  }

  if (moderate) return { level: "moderate", triggers };
  return { level: "none", triggers: {} };
}
```

Notas para CC: (a) `evaluatePvqRr` nunca devuelve `strong` — el banner UI consume `contention_message_moderate__pvqrr` (§5.3); (b) si la feature de saltar ítems no está implementada, `answered` siempre tiene 57 elementos y la regla devuelve `none` — verificar antes de impl (§Apéndice); (c) `triggers` alimenta `distress_event` para auditoría, pero la microcopy al usuario nunca refleja la omisión (§5).

## 7. Verificación de la regla provisional

Likert 1–6; "omitido" = sequenceNumber ausente de `rawResponses`. 15 ítems sensibles.

| # | Omitidos | A (≥4 difusa) | B (≥2/faceta) | Resultado | Comentario |
|---|---|---|---|---|---|
| 1 | ninguno | No | No | **none** | Completó todo. |
| 2 | POD 6 | No (1) | No (POD=1) | **none** | Una omisión aislada; no dispara. Correcto. |
| 3 | HUM 7, HUM 38 | No (2) | **Sí (HUM=2)** | **moderate** | Omisión concentrada — B la captura aunque A no. |
| 4 | HUM 7, TR 18, COI 4, POD 6 | **Sí (4)** | No (todas =1) | **moderate** | Omisión difusa de 1 por faceta — A la captura. |
| 5 | TR 18, TR 33, TR 40 | No (3) | **Sí (TR=3)** | **moderate** | Faceta entera omitida (también invalida TR en scoring). |
| 6 | HUM 7, POD 6, POR 12 | No (3) | No (todas =1) | **none** | 3 difusas, ninguna faceta ≥2: por debajo de ambos umbrales. |

**Caso falso positivo tolerado (#4).** Un usuario que salta 1 ítem por faceta por fatiga, no por incomodidad, dispara `moderate` y ve un banner empático suave. Costo bajo; aceptable bajo la asimetría de costos (§1).

**Caso falso negativo NO cubierto — limitación estructural declarada.** Un usuario genuinamente incomodado por el contenido de Humildad que **responde todos los ítems igual** (no salta ninguno) **no** dispara la regla. La detección por omisión es ciega a quien empuja a través de la incomodidad. Por eso la regla es una salvaguarda **secundaria**: la mitigación primaria de NFR-28 para PVQ-RR es la capa UX —disclaimer pre (advierte que algunas preguntas pueden incomodar y se puede pausar/saltar), affordance de saltar visible, disclaimer post con líneas de ayuda visible siempre—. La regla detector añade un banner más prominente solo cuando hay conducta de evitación observable; no la sustituye.

## Apéndice — Carry-overs detectados

| Flag | Prioridad | Detalle |
|---|---|---|
| `[GAP-PVQRR-SKIP-FEATURE]` | P1 | La regla presupone que el plugin PVQ-RR implementa saltar ítems (pack §7.2 v1.0 lo declara como requisito). CC debe confirmar que la feature existe y que un ítem saltado **no** genera fila `item_response` (o la genera con `rawValue` null y se filtra). Si no existe, `evaluatePvqRr` devuelve siempre `none` — la regla es inerte hasta que la feature se implemente. Bloquea la utilidad real de la impl S12. |
| `[GAP-PVQRR-OMISSION-TELEMETRY]` | P3 | `DistressItemResponse` solo expone `sequenceNumber` + `rawValue`; sin timestamp. No es posible detectar dwell-time anómalo ni abandono mid-test sobre un ítem sensible. La omisión es la única señal de proceso disponible v1.0. Si telemetría futura añade timing por ítem, la regla puede enriquecerse. |
| Drift de naming pack §7.2 v1.0 | P3 | El pack §7.2 v1.0 pide marca `sensitive_content: true`; Migration 021 sembró `item.sensitivity='emotional_distress'`. Misma intención, atributo distinto. Sugerido: alinear el texto del pack §7.2 al nombre real de la columna al promover este documento. |

Al aprobarse este documento: (1) registrar DD-NN (decision doc) referenciando este archivo, DD-93 y SR-10 §G1; (2) actualizar el carry `[GAP-PVQRR-SENSITIVE-NO-ROUTE]` en BACKLOG a "spec entregada — pendiente impl CC S12+"; (3) añadir los carry-overs del Apéndice al BACKLOG; (4) reemplazar la regla de disparo NFR-28 del pack `PVQ-RR_..._Consolidado.md` §7.2 por un puntero a este archivo.

## Referencias (APA 7)

Schwartz, S. H., & Cieciuch, J. (2022). Measuring the refined theory of individual values in 49 cultural groups: Psychometrics of the Revised Portrait Value Questionnaire. *Assessment, 29*(5), 1005–1019. https://doi.org/10.1177/1073191121998760

Schwartz, S. H., Cieciuch, J., Vecchione, M., Davidov, E., Fischer, R., Beierlein, C., Ramos, A., Verkasalo, M., Lönnqvist, J.-E., Demirutku, K., Dirilen-Gumus, O., & Konty, M. (2012). Refining the theory of basic individual values. *Journal of Personality and Social Psychology, 103*(4), 663–688. https://doi.org/10.1037/a0029393

Tourangeau, R., & Yan, T. (2007). Sensitive questions in surveys. *Psychological Bulletin, 133*(5), 859–883. https://doi.org/10.1037/0033-2909.133.5.859

Torres, C. V., Schwartz, S. H., & Nascimento, T. G. (2016). A teoria de valores refinada: Associações com comportamento e evidências de validade discriminante e preditiva. *Psicologia USP, 27*(2), 341–356. https://doi.org/10.1590/0103-656420150045

## Notas de calidad y limitaciones

- **No es un cribado clínico.** NFR-28 no diagnostica, no etiqueta, no predice. Activa una ruta de apoyo no clínica. La regla respeta los no-negociables §6 (no exagerar valor predictivo) y §7 (mitigación ante señales de malestar).
- **Validez / contexto cultural.** Los umbrales no tienen anclaje normativo es-CO; el PVQ-RR carece de baremo colombiano standalone (pack §3.3) y la equivalencia escalar inter-país no está plenamente soportada (Schwartz & Cieciuch, 2022). Recalibración obligatoria post-piloto (§4).
- **Especificidad de la señal.** La omisión de ítems sensibles es validez aparente, baja especificidad; Tourangeau & Yan (2007) sustenta el mecanismo (contenido sensible → más omisión), no la inferencia de distrés individual. Por eso solo `moderate` y monitoreo obligatorio.
- **Disanalogía con BFI-2-S/PERMA/Flourishing reconocida.** Esos instrumentos disparan sobre el valor de la respuesta porque incluyen ítems de síntoma; el PVQ-RR no. La regla v1.0 es disjuntiva como aquellas, pero sobre un sustrato distinto (omisión, no puntaje). No es comparable en poder de detección.
- **Dato que afinaría la respuesta.** Tasa de omisión por ítem en el piloto cognitivo N=30 (pack §8) permitiría fijar A y B sobre base empírica en lugar de diseño conservador. Es el primer insumo de la recalibración H1.

---

*Fin del documento v1.0. Pendiente sign-off de German. Reemplaza la regla de disparo NFR-28 del pack PVQ-RR §7.2 v1.0.*
