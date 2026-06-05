# Implementation Acquisition Pack v1.0 — PVQ-RR (Portrait Values Questionnaire – Revised, 57 ítems) — CONSOLIDADO
**Producto destino:** DescubreMe (LATAM, foco Colombia) · **Stack v2.0 — Migración a plugin Supabase/PostgreSQL** · **Q2–Q3 2027**
**Versión del consolidado:** 1.0 · **Fecha:** mayo 2026
**Insumos:** `Prompt_24_PVQ-RR_IAR.Claude.md` (Implementation Acquisition Pack completo, 10 secciones) + `Prompt_24_PVQ-RR_IAR.Gemini.md` (revisión académica narrativa estilo white paper, sin la estructura de 10 secciones del prompt)
**Idiomas:** español neutro (metadatos y notas internas) / español Colombia (Secciones 5 y 7)

> **Nota metodológica del consolidado.** Claude entregó el Pack completo siguiendo el prompt v1.0 al pie de la letra (10/10 secciones, con marcadores Hecho/Inferencia/Opinión profesional y `[sin fuente verificada]`). Gemini entregó una revisión académica de ~7.000 palabras estilo white paper sobre la teoría refinada de Schwartz, la arquitectura del PVQ-RR y los protocolos analíticos (MRAT, MDS vs EFA, data cleaning, predicción conductual); no cumple ninguna de las 10 secciones del prompt v1.0. Este consolidado usa el Pack de Claude como base estructural completa e inyecta los aportes verificables de Gemini con la marca `[Aporte Gemini]`. La trazabilidad del origen de cada bloque está en el **Apéndice A**.

---

## TABLA DE COBERTURA (requisitos explícitos del prompt vs. entrega)

| Requisito | Sección | Cobertura |
|---|---|---|
| Portada y metadatos + estado de bloqueadores | §0 | OK |
| Plan adquisición banco de ítems (57 ítems publicados en OSF/ORPC/MBC-Lab) | §1 | OK |
| Adaptaciones al español (tabla por país con DOI/URL + recomendación es-CO) | §2 | OK |
| Baremos publicados (Tabla 5 Schwartz & Cieciuch 2022, pooled 49 grupos) + roadmap CO | §3 | OK (PARCIAL en datos — no existen baremos nacionales standalone) |
| Ítems inversos numerados + Mapeo Item # → 19 valores refinados | §4 | OK (no aplica inversos tradicionales; protocolo MRAT) |
| 66 textos es-CO (4 HOV × 3 bandas + 19 valores refinados × 3 bandas) | §5 | OK (66/66) |
| Plan licencia (titular, contacto, práctica, pasos, email inglés, costo, Plan B TwIVI) | §6 | OK |
| Disclaimers pre/post + ítems sensibles + mensaje contención + líneas Colombia | §7 | OK |
| Piloto cognitivo Colombia (muestra, think-aloud, criterios, entregables) | §8 | OK |
| ≥ 3 gaps y preguntas abiertas | §9 | OK (5) |
| ≥ 10 referencias APA 7 con DOI | §10 | OK (12) |
| Marcadores Hecho/Inferencia/Opinión profesional | transversal | OK |
| Marcadores [sin fuente verificada] donde aplica | §2, §3, §6 | OK |
| **Aportes consolidados desde Gemini con verificación pendiente** | Apéndice A | OK |

---

## SECCIÓN 0 — PORTADA Y METADATOS

**Instrumento:** Portrait Values Questionnaire – Revised (PVQ-RR), versión final declarada por los autores en 2022.
**Autores:** Schwartz, S. H., Cieciuch, J., Vecchione, M., Davidov, E., Fischer, R., Beierlein, C., Ramos, A., Verkasalo, M., Lönnqvist, J.-E., Demirutku, K., Dirilen-Gumus, O., y Konty, M.
**Versión a implementar:** PVQ-RR de 57 ítems, 19 valores refinados, 4 valores de orden superior (Self-transcendence, Conservation, Self-enhancement, Openness to change). Escala Likert 6 puntos asimétrica (1 = not like me at all … 6 = very much like me).
**Año de publicación:** Teoría refinada en Schwartz et al. (2012, DOI 10.1037/a0029393); validación multicultural definitiva del instrumento en Schwartz y Cieciuch (2022, *Assessment*, 29(5), 1005–1019, DOI 10.1177/1073191121998760).
**Idioma original:** Inglés (con versiones masculina y femenina en lenguas con género gramatical).
**Tiempo de aplicación:** 12–15 minutos.
**Productos destino DescubreMe:** B2C Paid (USD 19), B2B-A, Ikigai Premium. *Excluido* del tier B2C Free MVP por consideraciones de licencia y duración.

**Resumen ejecutivo (refactor a test-as-plugin):** El PVQ-RR ya vive en stack v2.0 y debe migrarse al nuevo plugin Supabase/PostgreSQL con los seis bloques (Registry, Item Bank, Cultural Adaptations es-CO/es-MX/en, Scoring Engine con centrado MRAT, Reports por banda, Consent & Compliance). El instrumento es psicométricamente sólido a nivel cross-cultural pero presenta tres restricciones que el plugin debe codificar como NFR: (a) licencia restrictiva (no comercial sin permiso explícito de Schwartz), (b) ausencia de invarianza escalar entre los 49 grupos del estudio multinacional —que obliga al uso de centrado MRAT y prohíbe comparaciones absolutas de medias inter-país— y (c) faceta Humility con confiabilidad estructuralmente baja. Se mantiene PVQ-RR en stack; se retira definitivamente PVQ-57-R 2012, dado que los autores declaran textualmente que "The PVQ-RR is the final PVQ questionnaire designed to measure values differentiated in the refined model of Schwartz's values" (Schwartz y Cieciuch, 2022, p. 1007).

`[Aporte Gemini]` **Por qué la teoría pasó de 10 a 19 valores.** La teoría original de Schwartz (1992) postulaba 10 valores amplios; las evaluaciones psicométricas detectaron alta heterogeneidad interna en los ítems agrupados bajo cada uno de los 10 constructos, lo que generaba alfas subóptimos y dificultades para discriminar valores adyacentes en el círculo. La teoría refinada (Schwartz et al., 2012) particionó más finamente el continuo motivacional —expandiendo de 10 a 19 valores—, ganando homogeneidad interna por dominio y resolución para capturar variaciones culturales sutiles. Este es el rationale teórico que justifica la migración de PVQ-57-R (2012) a PVQ-RR (2022) en el stack DescubreMe.

**Status de bloqueadores:**

| Bloqueador | Status | Razón |
|---|---|---|
| Licencia para uso freemium comercial | **BLOCKED** | CC BY-NC-ND 3.0 en ORPC + CC BY-NC 4.0 en *Assessment* prohíben uso comercial sin permiso explícito de S. H. Schwartz. Activar Plan A (negociar permiso) o Plan B (TwIVI). |
| Ítems literales | **READY** | Disponibles en supplement S1 de Schwartz y Cieciuch (2022, OSF) y en sitio Mind, Body, Cultural Evolution Lab. |
| Baremos publicados | **PARTIAL** | Schwartz y Cieciuch (2022, Tabla 5) publican percentiles 25/50/75 de medias centradas en 49 grupos pooled; no existen baremos por país con N, M, DT, percentiles 16/84 desglosados. Sin baremo colombiano standalone. |
| Adaptación es-CO validada | **BLOCKED** | No existe; la muestra Colombia (N=410) en Schwartz y Cieciuch (2022) usó la traducción autorizada por Schwartz pero no se ha publicado adaptación standalone. Requiere piloto cognitivo propio. |

---

## SECCIÓN 1 — ACQUISITION PLAN DEL BANCO DE ÍTEMS

### 1.1 Disponibilidad pública

Los 57 ítems del PVQ-RR **están publicados literalmente** en fuentes abiertas:

1. **Schwartz y Cieciuch (2022), supplementary material**, alojado en SAGE Open y replicado en el repositorio OSF de los autores: `https://osf.io/w9as3/` (47 versiones lingüísticas, instrucciones de scoring y recomendaciones sobre centrado MRAT). Acceso libre, registro de cuenta OSF opcional. *Hecho:* el propio paper declara textualmente: "Versions of the PVQ-RR in 47 languages (male and female versions in languages that distinguish pronouns), scoring instructions, and recommendations regarding the statistical procedures that do or do not require centering of values within-person are stored at the Open Science Framework available at https://osf.io/w9as3/" (Schwartz y Cieciuch, 2022, p. 1008).
2. **Sitio académico Mind, Body, Cultural Evolution Lab**: `https://mindcultureevolution.wordpress.com/revised-portrait-value-questionnaire-57rr/` — incluye descarga del PDF completo con los 57 ítems en inglés (versiones masculina y femenina), las definiciones motivacionales de los 19 valores y la scoring key.
3. **Repositorio ORPC (Online Readings in Psychology and Culture)**, Schwartz (2021), "A Repository of Schwartz Value Scales with Instructions and an Introduction", DOI 10.9707/2307-0919.1173, `https://scholarworks.gvsu.edu/orpc/vol2/iss2/9/`. Licencia CC BY-NC-ND 3.0. Incluye versión PVQ-RR autorizada en múltiples idiomas (descarga gratuita "for educational uses").

Política para el plugin: dado que los ítems en inglés son públicos, se citan en el Item Bank con la fuente exacta. La **adaptación al español** disponible en OSF/ORPC también es pública pero rige la cláusula NoDerivatives: no se puede modificar léxicamente sin permiso. Cualquier ajuste léxico es-CO requiere autorización de Schwartz (ver Sección 6).

`[Aporte Gemini]` **Mejora vs. PVQ-40: eliminación de ítems double-barreled.** El PVQ-RR eliminó la práctica del PVQ-40 de incluir sentencias compuestas por más de una premisa en el mismo ítem ("double-barreled items"). Esta limpieza acorta la extensión sintáctica, abate el tiempo de procesamiento del respondiente y reduce el ruido sistemático en las respuestas. Es un argumento adicional para mantener PVQ-RR sobre cualquier predecesor en el stack DescubreMe.

### 1.2 Banco oficial vs adaptaciones derivadas

- **Banco oficial:** OSF repository `https://osf.io/w9as3/` (Schwartz y Cieciuch, 2022). Es la fuente canónica.
- **Adaptaciones derivadas:** Sánchez (2016, Honduras, citada en literatura UCR), Castro Solano y Nader (2006, Argentina — pero solo PVQ-40/PVQ-21, no PVQ-RR), Universidad de Costa Rica (Smith-Castro et al., 2019). Todas requieren permiso para uso comercial.

### 1.3 Estructura del banco

| Atributo | Especificación |
|---|---|
| Ítems totales | 57 |
| Ítems por valor refinado | 3 (tríadas balanceadas) |
| Valores refinados | 19 |
| Valores básicos clásicos | 10 (agregación de los 19) |
| Valores de orden superior | 4 (Openness, Self-enhancement, Conservation, Self-transcendence) |
| Formato | Retrato verbal en tercera persona ("Es importante para él/ella…") |
| Escala | Likert 6 puntos asimétrica (omite el ancla neutral central; obliga a posicionamiento decantado) |
| Versiones por género | Masculina, femenina (campo `gender_variant` en plugin); `[Aporte Gemini]` versiones de género neutral con they/them/their disponibles en literatura reciente para usuarios no binarios |
| Ítems inversos tradicionales | Ninguno (ver Sección 4) |
| Diseño metodológico | Método de "Retratos" (sustitución de términos abstractos del SVS por narrativas sociopsicológicas concretas → reduce sesgo de deseabilidad social vía juicio proyectivo de similitud "¿Cuánto se parece esta persona a usted?") `[Aporte Gemini]` |

### 1.4 Recomendación de adquisición

**Paso 1 (24h):** Descargar el supplement S1 desde `https://osf.io/w9as3/` y la versión publicada en el blog Mind, Body, Cultural Evolution Lab. Cargar como `item_bank_v1_en` en Supabase con marcador `source: 'Schwartz_Cieciuch_2022_OSF'`.

**Paso 2 (semana 1):** Escribir a `shalom.schwartz@huji.ac.il` (correo institucional vigente declarado como autor de correspondencia en Schwartz y Cieciuch, 2022) solicitando la traducción autorizada al español que se usó en la muestra Colombia (N=410) — ver Sección 6.

---

## SECCIÓN 2 — ADAPTACIONES AL ESPAÑOL DISPONIBLES

| País | Autores | Año | DOI/URL | N | Características | Disponibilidad |
|---|---|---|---|---|---|---|
| Colombia | Schwartz y Cieciuch (parte del estudio multinacional) | 2022 | 10.1177/1073191121998760 | 410 estudiantes (M=21.8, DT=2.9; 55.9% mujeres) | Traducción autorizada por Schwartz; HOV α > .70; 14/19 facetas α > .60; Conservation CFI < .90 | Traducción en OSF, NoDerivatives |
| Costa Rica | Smith-Castro et al. (estudio UCR) | 2019 | ResearchGate 333457993 | 601 (PVQ-RR adaptación, primer ingreso UCR) | Universidad de Costa Rica | PDF abierto ResearchGate |
| Honduras (base es-Lat) | Sánchez | 2016 | (sin DOI; citada en literatura UCR) | n.d. | "Tropicalizada" para Honduras, recomendada por Schwartz | Acceso restringido |
| Argentina | Castro Solano y Nader (PVQ-40, no PVQ-RR) | 2006 | Interdisciplinaria 23(2), 155–174 | n.d. | Adaptación de versiones anteriores PVQ-40/PVQ-21 al castellano rioplatense | PDF abierto |
| Ecuador | Parte del estudio multinacional Schwartz y Cieciuch | 2022 | 10.1177/1073191121998760 | 514 adultos (M=41.5, DT=10.8) | Traducción Spanish utilizada por equipo local; psicometría reportada en suplementos | OSF |
| España | (sin adaptación standalone PVQ-RR documentada) | — | — | — | Aplicaciones puntuales reportadas; no hay validación publicada con título "PVQ-RR español" | [sin fuente verificada] |
| México | (sin adaptación standalone PVQ-RR documentada) | — | — | — | [sin fuente verificada] | — |
| Chile, Perú | No identificadas en la búsqueda | — | — | — | [sin fuente verificada]; buscar en SciELO Chile/Perú | — |

`[Aporte Gemini]` **Ejemplos de ítems en español validados (formato masculino/neutro).** La revisión narrativa de Gemini incluye una tabla con muestras textuales de cómo se ven los ítems traducidos al español (atribuidos a las validaciones iberoamericanas). Útil como referencia léxica para el equipo de UX y para el piloto cognitivo (Sección 8). **Advertencia: la fuente primaria de cada cita textual debe verificarse antes de cargar como `item_bank_v1_es` en producción.**

| Valor | Ejemplo retratado en español |
|---|---|
| Self-Direction-Thought | "Es importante para él desarrollar sus propias opiniones." |
| Self-Direction-Action | "Es importante para él tomar sus propias decisiones sobre su vida. Le gusta planificar de forma independiente." |
| Stimulation | "Busca aventura y le gusta tomar riesgos. Quiere una vida emocionante." |
| Hedonism | "Es importante para él disfrutar de los placeres de la vida." |
| Achievement | "Tener éxito es importante para él. Le gustaría que todo el mundo reconociese sus éxitos." |
| Power-Dominance | "Es importante para él tener el poder para hacer que la gente haga lo que él quiera." |
| Power-Resources | "Es importante para él ser rico. Quiere poseer cosas caras que muestren su riqueza." |
| Face | "Es importante para él proteger su imagen pública y que nadie nunca le avergüence." |
| Security-Personal | "Es importante para él estar personalmente seguro y protegido, evitando enfermedades." |
| Security-Societal | "Para él es importante que el gobierno le garantice su seguridad frente a amenazas, poseyendo un Estado fuerte." |
| Tradition | "Es importante para él mantener los valores y seguir las costumbres de su familia o su religión." |
| Conformity-Rules | "Es importante para él cumplir las normas incluso cuando nadie le esté mirando; no transgredir regulaciones." |
| Conformity-Interpersonal | "Es importante para él no molestar nunca a nadie; evitar actos que otros considerarían erróneos." |
| Humility | "Es importante para él ser humilde y modesto, intentando no llamar la atención sobre sí mismo." |
| Benevolence-Dependability | "Es importante para él ser un amigo fiable y en el que se puede confiar profundamente." |
| Benevolence-Caring | "Es muy importante para él ayudar a la gente que aprecia; cuidando constantemente de su bienestar." |
| Universalism-Concern | "Es importante para él que todas las personas del mundo sean tratadas equitativamente y tengan igualdad de oportunidades." |
| Universalism-Tolerance | "Es importante para él escuchar, comprender y ser tolerante con individuos o grupos que son diferentes a él." |
| Universalism-Nature | "Es importante para él participar proactivamente en actividades para defender la naturaleza y el ecosistema." |

### 2.1 Recomendación de base para es-CO

Adoptar la **traducción al español usada por el equipo de Schwartz y Cieciuch (2022) para la muestra Colombia (N=410)**, almacenada en OSF `https://osf.io/w9as3/`. Justificación: es la única traducción autorizada por el autor del instrumento con evidencia psicométrica en muestra colombiana — Schwartz y Cieciuch (2022, Tabla 6, p. 1014) reportan que en Colombia los 4 HOV alcanzaron α > .70 y 14 de las 19 facetas refinadas alcanzaron α > .60; el modelo CFA de Conservation fue el único de los cuatro HOV que no alcanzó CFI > .90 en esa muestra. La adaptación de Costa Rica es la segunda mejor candidata si la versión Colombia OSF no resulta accesible.

`[Aporte Gemini]` **Protocolo Schwartz para traducción y retro-traducción.** El protocolo oficial regulado por Schwartz prohíbe traducciones unidireccionales ad hoc y exige: (1) traducción del ítem en inglés al español, (2) re-traducción al inglés por un lingüista sin contacto previo con la versión original ("blind back-translation"), (3) auditoría personal de discrepancias hermenéuticas por Shalom Schwartz y su consorcio, (4) iteraciones correctivas sucesivas hasta consenso lingüístico. Es el mismo protocolo de tres iteraciones descrito en Schwartz (2021, "A Repository of Schwartz Value Scales"). DescubreMe debe presupuestar 3–4 iteraciones de back-translation (~4–8 semanas) para cualquier ajuste léxico es-CO.

### 2.2 Modificaciones léxicas anticipadas para Colombia

Pendientes de autorización (cláusula NoDerivatives). Candidatas para piloto cognitivo:

- "Le importa mucho" como conector estándar es-CO en lugar de variantes regionales.
- Reemplazar "ocio" por "tiempo libre" en ítems de hedonismo si genera confusión.
- "Cumplir con las reglas" en lugar de "obedecer reglas" en Conformity-Rules (menos coercitivo en es-CO adulto).
- "Cuidar la naturaleza" en lugar de "preservar el ambiente natural" en Universalism-Nature.

Las modificaciones requieren back-translation y aprobación de Schwartz antes de producción, conforme al protocolo de tres iteraciones descrito en Schwartz (2021) "A Repository of Schwartz Value Scales" (DOI 10.9707/2307-0919.1173).

---

## SECCIÓN 3 — BAREMOS PUBLICADOS

### 3.0 Fórmula de scoring MRAT (spec para el plugin PVQ-RR)

**Estado:** v1.0 — 2026-05-21. Autor: Cowork (Rol: Arquitecto de sistema + Investigador psicométrico senior). Pre-Sprint Planning S10. Patrón: §3.0 del pack VIA-IS-P-96.

**Nota de corrección de premisa.** El briefing de implementación (pre-S10) y DD-84 plantean el gap como "MRAT canónico es *item-level* (`raw − mean(all responses)` antes de agregar), NO facet-level; el engine v0.2 `centered_score` opera facet-level". Esa formulación es **parcialmente imprecisa** y conviene corregirla antes de codear:

- `Hecho:` El procedimiento canónico de Schwartz (Schwartz, 2021, repositorio ORPC; Schwartz & Cieciuch, 2022) aplica el centrado **a nivel de valor** (post-agregación): se computa MRAT, se computa el score crudo de cada valor como media de sus ítems, y se resta MRAT a ese score de valor. El propio pack §4 ya lo documenta así.
- `Inferencia:` Restar una constante por sujeto (MRAT) **antes o después de agregar es algebraicamente idéntico** para el score de cada valor: `media_tríada(rᵢₖ − MRAT) = media_tríada(rᵢₖ) − MRAT`. La distinción "item-level vs facet-level" **no es el gap**. Centrar ítem por ítem y luego promediar la tríada produce exactamente el mismo número que promediar la tríada y luego restar MRAT. No hace falta materializar respuestas centradas item-level.
- `Hecho — el gap real (verificado en `lib/scoring/engine.ts` + `lib/scoring/ipsative.ts`):` es doble. (1) **División por SD.** El `centered_score` actual (`computeIpsativeCenteredScores`, método C de O*NET, DD-65) calcula `(raw − M)/SD` — un z-score intra-perfil. El MRAT canónico es `raw − MRAT` **sin dividir por la SD individual**: las diferencias inter-individuales en la varianza del uso de la escala son sustantivamente significativas (unos sujetos discriminan más entre sus valores que otros) y estandarizar las borraría (Schwartz, 2021; pack §4, paso 6). Un z-score **no es comparable** con el baremo §3.1 (Schwartz & Cieciuch, 2022, Tabla 5), que está en métrica MRAT-centrada sin estandarizar. (2) **Denominador del MRAT.** MRAT = media de las **57 respuestas crudas**. El engine computa `M_intra = mean(facetScores)`; con 19 tríadas iguales eso coincide con MRAT *solo si* las facetas centradas son exactamente las 19 tríadas. Si se seedean también las 4 HOV (o cualquier rollup) como `scoring_rule`, `M_intra` se contamina. MRAT debe computarse sobre el vector de los 57 ítems, no sobre scores de faceta.

Conclusión: el PVQ-RR requiere una operación de centrado **distinta** de la ipsativa z-score de O*NET. No es un ajuste de "item-level"; es un transform de perfil propio (resta de constante, sin SD, denominador = 57 ítems).

#### 3.0.1 Fórmula completa

`Hecho` (Schwartz et al., 2012; Schwartz & Cieciuch, 2022; pack §4). El PVQ-RR tiene 57 ítems, escala Likert 1–6, todos en clave directa (sin recodificación inversa). Para un respondiente *i*:

1. **MRAT (Mean RATing).**
   `MRAT_i = (1/57) · Σ_{k=1..57} r_{i,k}`
   Media de las 57 respuestas crudas del sujeto. Es una constante por persona.

2. **Score crudo de cada valor refinado** *v* (19 valores; conjunto de ítems `I_v`, |I_v| = 3, mapeo del pack §4):
   `raw_{v,i} = (1/3) · Σ_{k∈I_v} r_{i,k}`

3. **Score centrado (MRAT) de cada valor refinado:**
   `centered_{v,i} = raw_{v,i} − MRAT_i`
   Métrica resultante: escala 1–6 centrada; rango teórico aproximado −5 a +5; un valor positivo indica prioridad por encima del promedio del propio sujeto. **No se divide por la SD.** Este es el score que se mapea contra el baremo §3.1.

4. **Rollup a los 4 valores de orden superior (HOV)** — agregación secundaria. Para cada HOV *h* con conjunto de valores refinados `V_h`:
   `centered_HOV_{h,i} = (1/|V_h|) · Σ_{v∈V_h} centered_{v,i}`
   Media no ponderada de los valores refinados que lo componen. (Equivale a `media(raw_v) − MRAT`.) Se usa **media**, no suma: el pack §4 dice "suma", pero sumar haría incomparables HOV con distinto número de valores (4 a 6 valores); para la UI se requiere media. Tratar como ajuste de redacción del §4.

**Equivalencia item-level (para CC):** computar `centered_{v,i}` como `media_{k∈I_v}(r_{i,k} − MRAT_i)` da el mismo resultado que el paso 3. CC puede implementar cualquiera de las dos rutas; se recomienda la value-level (paso 2 → paso 3) por ser la canónica, la más simple y la que coincide con el manual de Schwartz.

#### 3.0.2 Spec de scoring para el plugin

| Parámetro | Valor |
|---|---|
| Ítems | 57, escala Likert 1–6 |
| Recodificación inversa | Ninguna (`reversed = FALSE` ×57; pack §4) |
| `scoring_rule.operation` por valor | `mean` (media de 3 ítems) → produce `raw_score` del valor |
| Centrado | MRAT — transform de perfil **post-agregación**, NO un `operation` del engine |
| División por SD | **No** (a diferencia del `centered_score` ipsativo de O*NET) |
| Output nivel 1 | 19 `computed_score` (valores refinados): `raw_score` + `centered_score` |
| Output nivel 2 (rollup) | 4 HOV: `centered_score` = media de los refinados que agrega |
| MRAT del individuo | Debe **persistirse** (pack §4): se sugiere columna en `assessment_session` o campo dedicado; necesario para trazabilidad y re-scoring |
| Banding | Contra baremo §3.1/§3.2 (percentiles pooled P25/P75 sobre score centrado). **No** usar el band tercil-de-máximo-teórico del engine: es inválido para scores centrados |

#### 3.0.3 Recomendación de arquitectura (responde a la pregunta "módulo vs operation")

| Opción | Descripción | Veredicto |
|---|---|---|
| **A — Módulo `lib/scoring/mrat.ts` + segundo paso instrument-aware (recomendada)** | Nuevo helper `mrat.ts` análogo a `ipsative.ts`. El segundo paso del engine despacha por estrategia de centrado: O*NET → `computeIpsativeCenteredScores` (z-score); PVQ-RR → MRAT. La estrategia se resuelve por una columna `centering_strategy` en `instrument_version` (`'none' \| 'ipsative_z' \| 'mrat'`) o feature flag `MRAT_ENABLED`. Bump engine v0.3 → v0.4. | **Adoptar.** Separación limpia, cada transform testeable aislado, sin tocar el enum de `aggregate.ts`. Alineado con DD-84 punto 7. |
| B — Nueva `operation` del engine (`centered_score_item_level`) | Añadir MRAT como operación en `aggregate.ts`. | Rechazada. Las `operation` de `aggregate.ts` son agregaciones **por faceta** sobre los ítems de esa faceta (`mean`/`sum`/`weighted_*`). MRAT necesita el vector completo de los 57 ítems (cross-faceta) y produce una constante por persona — no es expresable como operación por faceta. El nombre "item-level" además es un misnomer (el centrado es value-level). |
| C — Extender `ipsative.ts` con flag "sin SD" | Parametrizar `computeIpsativeCenteredScores` para omitir la división por SD y aceptar una media externa (MRAT). | Rechazada. Mezcla dos transforms psicométricamente distintos (z-score intra-perfil de O*NET vs. MRAT de Schwartz) en un helper; el denominador difiere (facetas vs. 57 ítems); el naming se vuelve ambiguo. Peor separación que A. |

#### 3.0.4 Spec drop-in TS para CC (pseudocódigo conceptual — CC implementa la versión de producción)

Módulo nuevo `descubreme/lib/scoring/mrat.ts`:

```typescript
// Centrado MRAT (Mean RATing) — procedimiento canonico de Schwartz para PVQ-RR.
// Ref: implementation_packs/PVQ-RR_..._Consolidado.md §3.0
// Schwartz et al. (2012); Schwartz (2021, repositorio ORPC); Schwartz & Cieciuch (2022).
//
// MRAT_i = media de las 57 respuestas crudas del sujeto i.
// raw_valor = media de los 3 items del valor.
// centered_valor = raw_valor - MRAT_i.   (NO se divide por la SD individual.)

export interface MratScore {
  code: string;          // SDT, SDA, ... (19 refinados) | HOV codes (4)
  rawScore: number;      // media de items, escala 1-6 (HOV: media de raw refinados)
  centeredScore: number; // rawScore - MRAT (HOV: media de centered refinados)
}

export interface MratResult {
  mrat: number;
  values: MratScore[];      // 19 valores refinados
  higherOrder: MratScore[]; // 4 HOV (rollup)
}

// rawResponses: las 57 respuestas crudas de la sesion {itemKey, rawValue}.
// valueMap: code refinado -> itemKey[] (3 c/u), del pack §4.
// hovMap:   code HOV -> code refinado[], del pack §4 (ver 3.0.5).
export function computeMratScores(
  rawResponses: { itemKey: string; rawValue: number }[],
  valueMap: Record<string, string[]>,
  hovMap: Record<string, string[]>,
): MratResult {
  if (rawResponses.length === 0) {
    throw new Error("computeMratScores: sesion sin respuestas");
  }
  const mrat =
    rawResponses.reduce((acc, r) => acc + r.rawValue, 0) / rawResponses.length;

  const byKey = new Map(rawResponses.map((r) => [r.itemKey, r.rawValue]));
  const values: MratScore[] = Object.entries(valueMap).map(([code, keys]) => {
    const vals = keys
      .map((k) => byKey.get(k))
      .filter((v): v is number => v !== undefined);
    if (vals.length === 0) throw new Error(`computeMratScores: valor ${code} sin items`);
    const raw = vals.reduce((a, b) => a + b, 0) / vals.length;
    return { code, rawScore: raw, centeredScore: raw - mrat };
  });

  const byCode = new Map(values.map((v) => [v.code, v]));
  const higherOrder: MratScore[] = Object.entries(hovMap).map(([hov, codes]) => {
    const comps = codes.map((c) => byCode.get(c)!);
    const raw = comps.reduce((a, v) => a + v.rawScore, 0) / comps.length;
    const centered = comps.reduce((a, v) => a + v.centeredScore, 0) / comps.length;
    return { code: hov, rawScore: raw, centeredScore: centered };
  });

  return { mrat, values, higherOrder };
}
```

Integración en `lib/scoring/engine.ts` (segundo paso, engine v0.4):

```typescript
// Segundo paso — dispatch por estrategia de centrado.
// strategy proviene de instrument_version.centering_strategy.
let centeredByFacet: Map<string, number>;
if (strategy === "mrat") {
  // MRAT sobre las 57 respuestas crudas de la sesion (responseByItem),
  // NO sobre facetScores. valueMap/hovMap se derivan del seed PVQ-RR.
  const result = computeMratScores(allRawResponses, valueMap, hovMap);
  centeredByFacet = new Map(
    [...result.values, ...result.higherOrder].map((s) => [s.code, s.centeredScore]),
  );
} else if (strategy === "ipsative_z") {
  const z = computeIpsativeCenteredScores(facetScores.map((s) => s.rawScore));
  centeredByFacet = new Map(facetScores.map((s, i) => [s.facetId, z[i]]));
} else {
  centeredByFacet = new Map(); // strategy 'none' -> centered_score = null
}
```

Notas para CC: (a) requiere migración que añada `instrument_version.centering_strategy` (o feature flag `MRAT_ENABLED`); (b) las 4 HOV pueden seedearse como facetas con un flag tipo `is_higher_order = true` para que `computed_score` las almacene sin que contaminen el cómputo de MRAT (MRAT se calcula de `item_response`, no de facetas — el riesgo no se materializa si MRAT lee ítems); (c) tests: verificar la equivalencia item-level/value-level y que `centered = raw − MRAT` sin SD; caso de borde respuestas constantes (todos = k → MRAT = k → todos los centrados = 0). El paquete R `persval` (CRAN) implementa el scoring PVQ-RR canónico y sirve como oráculo de verificación cruzada.

#### 3.0.5 Rollup a los 4 HOV — composición

`Hecho` (pack §4; Schwartz et al., 2012). Mapeo recomendado, partición no solapada de los 19 valores (cada refinado en exactamente un HOV):

| HOV | Valores refinados que agrega | n |
|---|---|---|
| Apertura al cambio | SDT, SDA, ST, **HE** | 4 |
| Autopromoción | AC, POD, POR, **FAC** | 4 |
| Conservación | SEP, SES, TR, COR, COI | 5 |
| Autotrascendencia | UNC, UNN, UNT, BEC, BED, **HUM** | 6 |

**Advertencia.** Hedonism (HE), Face (FAC) y Humility (HUM) son **valores frontera** en el continuo cuasi-circumplejo; su asignación a un HOV es una decisión de modelado, no un hecho unívoco. HE limita Apertura/Autopromoción; FAC limita Autopromoción/Conservación; HUM limita Conservación/Autotrascendencia. La partición de la tabla sigue la colocación primaria del pack §4, pero **debe confirmarse contra el material suplementario de Schwartz & Cieciuch (2022)** antes de seedear. `[Verificar — composición exacta de HOV con valores frontera.]`

**Advertencia psicométrica (análoga al rollup de virtudes VIA-IS-P §3.0).** No existe baremo §3.1 a nivel HOV; los scores HOV centrados sirven para **organización temática** en la UI, no para banding por percentil ni comparación entre HOV como escalas validadas. El nivel primario de reporte e interpretación es el de los 19 valores refinados.

#### 3.0.6 Notas de validez y contexto cultural

- **El centrado MRAT es obligatorio, no opcional.** Sin centrar, los scores crudos del PVQ-RR están inflados por estilo de respuesta y las correlaciones inter-valor se distorsionan (Rudnev, 2021). El reporte al usuario (pack §5) usa scores **centrados** mapeados contra el baremo §3.1.
- **Multicolinealidad.** Los 19 scores centrados suman aproximadamente cero por construcción; no deben usarse simultáneamente como predictores en una regresión lineal sin tratar la dependencia (pack §4, tabla de reglas diferenciales MRAT). No afecta el uso de DescubreMe (reporte descriptivo, no modelado predictivo), pero debe respetarse si v2.0+ añade analítica.
- **Baremo.** El único baremo disponible es internacional pooled (Schwartz & Cieciuch, 2022, 49 grupos culturales). No hay invarianza escalar plena inter-país; los percentiles colombianos propios (roadmap §3.3) son prerequisito de v2.0. Marcar el baremo como provisional en la UI (§3.2).
- **Cita.** El briefing referencia "Schwartz 2017, DOI 10.9707/2307-0919.1116". Ese DOI corresponde a Schwartz, S. H. (2012), *An overview of the Schwartz theory of basic values* (ORPC). El procedimiento de scoring MRAT no está en ese overview; está en el repositorio de instrucciones de Schwartz (2021, ORPC 2[2], Art. 9) y en Schwartz & Cieciuch (2022). La teoría refinada de 19 valores es Schwartz et al. (2012, JPSP). Referencias correctas en §10.

**Fuentes de esta spec:** Schwartz et al. (2012); Schwartz (2021); Schwartz & Cieciuch (2022); Rudnev (2021) — todas en §10. Verificación de implementación cruzable contra el paquete `persval` (CRAN). Spec de arquitectura verificada contra `lib/scoring/engine.ts` y `lib/scoring/ipsative.ts` (estado main al 2026-05-21).

---

### 3.1 Tabla maestra de baremos disponibles

No se han publicado baremos por país con N, M, DT y percentiles 16/84 desglosados. La única tabla normativa publicada es la **Tabla 5 de Schwartz y Cieciuch (2022, p. 1013)**, que reporta los percentiles 25, 50 y 75 de las medias **centradas (MRAT)** agrupando los 49 grupos culturales (N total = 53.472):

| Valor | P25 | P50 (Mediana) | P75 |
|---|---|---|---|
| Benevolence-Caring | 0.559 | 0.794 | 0.887 |
| Benevolence-Dependability | 0.546 | 0.726 | 0.907 |
| Self-Direction-Action | 0.469 | 0.597 | 0.734 |
| Self-Direction-Thought | 0.388 | 0.582 | 0.696 |
| Universalism-Concern | 0.375 | 0.502 | 0.669 |
| Universalism-Tolerance | 0.178 | 0.370 | 0.511 |
| Security-Societal | 0.126 | 0.322 | 0.440 |
| Security-Personal | 0.224 | 0.281 | 0.373 |
| Hedonism | 0.085 | 0.228 | 0.484 |
| Achievement | −0.045 | 0.078 | 0.277 |
| Face | −0.114 | 0.047 | 0.204 |
| Universalism-Nature | −0.243 | −0.105 | 0.089 |
| Stimulation | −0.292 | −0.110 | 0.005 |
| Conformity-Interpersonal | −0.335 | −0.162 | 0.036 |
| Humility | −0.333 | −0.205 | −0.096 |
| Conformity-Rules | −0.459 | −0.257 | −0.119 |
| Tradition | −0.943 | −0.719 | −0.331 |
| Power-Resources | −1.585 | −1.332 | −0.991 |
| Power-Dominance | −1.560 | −1.403 | −1.108 |

**Fuente:** Schwartz y Cieciuch (2022), *Assessment*, 29(5), 1013, Tabla 5. Los valores están en la métrica de la escala 1–6 centrada por la media intra-sujeto (MRAT). N=53.472 a través de 49 grupos culturales pooled.

**Lo que falta** [sin fuente verificada]: percentiles 16 y 84 explícitos; baremos colombianos standalone con N, M, DT, percentiles completos; baremos por sexo, edad, nivel educativo.

`[Aporte Gemini]` **Evidencia psicométrica global agregada.** El estudio multinacional Schwartz & Cieciuch (2022) reclutó N = 53.472 respondientes a través de 49 subgrupos culturales en todos los continentes habitables, aplicando más de 32 versiones lingüísticas certificadas. De los 19 valores refinados, **15 fueron validados de forma irrefutable** y los 4 restantes mostraron comportamiento de "altísima aceptabilidad" en la matriz multinacional. Alfas reportados: tríadas de 3 ítems en rango robusto; al colapsar sobre los 4 HOV los alfas se elevan hasta cota preeminente; sobre los 10 valores básicos clásicos los alfas se ubican en rango intermedio. Esto reafirma que la consistencia interna no se sacrifica en aras de la granularidad facetal.

### 3.2 Recomendación de baremo provisional para LATAM

Utilizar los percentiles 25/50/75 de la Tabla 5 pooled como **bandas provisionales** mapeadas así en el plugin: BAJO = score centrado ≤ P25; MEDIO = P25 < score < P75; ALTO = score ≥ P75. Marcar explícitamente como "baremo provisional internacional pooled" en la UI. Esta solución es defensible porque (a) Colombia integra el pool y (b) la falta de invarianza escalar entre los 49 grupos (Schwartz y Cieciuch, 2022) hace que un baremo nacional standalone tampoco sea directamente comparable inter-país.

### 3.3 Roadmap para baremos colombianos propios

1. **Fase A (mes 1-3):** Aplicación piloto N=300 adultos colombianos (18–65) reclutados vía DescubreMe Free, balanceando sexo, edad y región (Bogotá/Medellín/Cali/Costa).
2. **Fase B (mes 4):** Calcular M, DT, percentiles 16/50/84 para cada uno de los 19 valores centrados. Comparar con percentiles pooled.
3. **Fase C (mes 5-6):** Validación cruzada con N=500. Publicar normas técnicas internas y, si N ≥ 800, considerar publicación abierta del baremo colombiano (sería el primero standalone).
4. **Criterio de gobierno:** cuando N ≥ 500 y α de los 4 HOV en muestra colombiana sea ≥ .75, sustituir baremo pooled por baremo colombiano en el plugin (flag `norms_source = 'co_internal_v1'`).

### 3.4 `[Aporte Gemini]` Posibles extensiones analíticas (validez predictiva documentada)

La revisión de Gemini reporta tres dominios donde el PVQ-RR ha mostrado validez predictiva por encima de instrumentos anteriores (SVS, BVS, SVO). Son ideas candidatas para features de producto v2.0+, no para v1.0:

- **Conducta prosocial e índices de solidaridad.** Auto-Trascendencia predice intervenciones asistenciales y reduce comportamientos disociativos, con varianza única no explicada por instrumentos competidores.
- **Gestión ambiental y militancia ecológica.** Universalism-Nature + Self-Direction predicen políticas conservacionistas; Hedonism + Achievement + Power-Dominance correlacionan negativamente.
- **Estilos de liderazgo organizacional y deportivo.** Líderes anclados en Conservation + Face + Humility tienden a estilos transaccionales y verticales; líderes anclados en Self-Transcendence + Stimulation + Self-Direction tienden a estilos transformacionales e inspiradores. Útil como input para futuras integraciones de DescubreMe con productos B2B-A de coaching.

**Verificación:** la mayoría de estas afirmaciones provienen de referencias secundarias en la revisión de Gemini (Frontiers in Psychology 2018 sobre coaches de baloncesto; estudios deportivos varios). Antes de usar en copy de producto, validar paper primario.

---

## SECCIÓN 4 — ÍTEMS INVERSOS Y MAPEO ÍTEM–VALOR

**Nota importante:** El PVQ-RR **no utiliza ítems con clave inversa tradicional**. Todos los ítems están redactados en clave directa: una puntuación alta en un ítem indica alta similitud con la persona retratada que prioriza ese valor. En lugar de claves inversas, el scoring requiere **centrado MRAT** (Mean RATing of all values), que es el procedimiento canónico de Schwartz para corregir sesgos de uso de la escala.

**Procedimiento MRAT (Schwartz, manual "Coding and analyzing PVQ-RR data", ResearchGate 308166496):**

1. Computar el promedio de los 57 ítems para cada participante. Llamarlo MRAT.
2. Computar el score de cada valor refinado como la media de sus 3 ítems indicadores.
3. Restar MRAT al score de cada uno de los 19 valores. El resultado es el score centrado.
4. Para correlaciones, MDS, comparaciones inter-individuales: usar scores **centrados**.
5. Para análisis CFA y SEM con item-level: usar respuestas crudas con MRAT como covariable.
6. **No** dividir por la desviación estándar individual (las diferencias individuales en varianza son sustantivamente significativas).

`[Aporte Gemini]` **Tabla de reglas diferenciales MRAT por paradigma analítico** (síntesis ampliada del manual Schwartz):

| Paradigma analítico | Variable dependiente | Predictores (valores) | Raciocinio |
|---|---|---|---|
| Correlaciones bivariadas (Pearson) | — | **Centradas (C)** | Subsana correlaciones positivas artificialmente infladas por estilo de respuesta. |
| Comparación grupal (T-Student, ANOVA, MANOVA, ANCOVA) | **Centrada (C)** | — | Erradica el sesgo donde toda la población exhibiría tendencias infladas frente a variables exógenas. |
| Regresión lineal o múltiple | **Centrada (C)** | **Crudas (no centradas)** si se integran los 19 valores; centradas si se excluyen dimensiones a priori. | Trampa de multicolinealidad: ipsatizar los 19 valores → su suma tiende a cero → "dependencia lineal perfecta" → coeficientes Beta colapsan. |
| Factoriales confirmatorias complejas (CFA, MDS, funciones canónicas/discriminantes) | — | **Crudas (raw items)** | La ipsatización introduce artificialidades en la estructura topológica euclidiana; CFA y MDS manejan el sesgo de escala mediante estimadores bayesianos subyacentes. |

`[Aporte Gemini]` **MDS, no EFA.** Para validar la estructura cuasi-circumpleja, los manuales prescriben Multidimensional Scaling (MDS) y proscriben Análisis Factorial Exploratorio (EFA). EFA asume axiomas ortogonales independientes, lo cual fuerza vectores que aglutinan subdimensiones ilegítimas y genera cargas cruzadas espurias sobre la arquitectura cuasi-circumpleja orgánica de los valores. Implicación para DescubreMe: cuando se haga la validación interna del baremo colombiano (Sección 3.3 Fase B), usar MDS para evaluar la replicación de la topología, no EFA.

`[Aporte Gemini]` **Protocolos de data cleaning recomendados.** (1) **Filtro flat-lining:** excluir respondientes que asignen el mismo guarismo a > 28 de los 57 ítems (umbral extrapolado del criterio histórico de 16/21 ítems para el PVQ-21); idealmente combinar con preguntas centinela intercaladas. (2) **Missing data:** la convención de la European Social Survey trata "Rechazo a contestar" y "No sabe" como missing taxativos; para pérdidas marginales (< 5% de ítems por respondiente) usar imputación por algoritmo Expectation-Maximization (EM) en lugar de eliminar el caso. Implementar ambos protocolos en el módulo de Scoring Engine del plugin antes de calcular MRAT.

**Implicación arquitectónica para el plugin:** la tabla `scoring_engine` debe almacenar, por cada submission, tanto los scores crudos como los centrados, más el MRAT del individuo. Los reports al usuario (Sección 5) usan **scores centrados** mapeados contra los percentiles pooled de la Sección 3.

### Mapeo oficial Item # → Valor refinado (PVQ-RR Scoring Key)

| Valor refinado | Ítems |
|---|---|
| Self-Direction-Thought (SDT) | 1, 23, 39 |
| Self-Direction-Action (SDA) | 16, 30, 56 |
| Stimulation (ST) | 10, 28, 43 |
| Hedonism (HE) | 3, 36, 46 |
| Achievement (AC) | 17, 32, 48 |
| Power-Dominance (POD) | 6, 29, 41 |
| Power-Resources (POR) | 12, 20, 44 |
| Face (FAC) | 9, 24, 49 |
| Security-Personal (SEP) | 13, 26, 53 |
| Security-Societal (SES) | 2, 35, 50 |
| Tradition (TR) | 18, 33, 40 |
| Conformity-Rules (COR) | 15, 31, 42 |
| Conformity-Interpersonal (COI) | 4, 22, 51 |
| Humility (HUM) | 7, 38, 54 |
| Benevolence-Caring (BEC) | 11, 25, 47 |
| Benevolence-Dependability (BED) | 19, 27, 55 |
| Universalism-Concern (UNC) | 5, 37, 52 |
| Universalism-Nature (UNN) | 8, 21, 45 |
| Universalism-Tolerance (UNT) | 14, 34, 57 |

**Fuente:** Schwartz, manual "Coding and analyzing PVQ-RR data" (ResearchGate publication 308166496) y supplement de Schwartz y Cieciuch (2022). **Verificación cruzada Claude + Gemini:** las codificaciones numéricas coinciden 100% entre ambas fuentes.

**Mapeo a HOV (suma de valores refinados):**
- Openness to change = SDT + SDA + ST (+ HE en el modelo extendido)
- Self-enhancement = AC + POD + POR (+ FAC modificado)
- Conservation = SEP + SES + TR + COR + COI (+ FAC)
- Self-transcendence = BEC + BED + UNC + UNN + UNT (+ HUM)

---

## SECCIÓN 5 — TEXTOS DE INTERPRETACIÓN AL USUARIO (es-CO)

Bandas: **BAJO** (score centrado ≤ P25 pooled), **MEDIO** (P25 < score < P75 pooled), **ALTO** (score ≥ P75 pooled). Los textos están redactados en tuteo cordial colombiano, lenguaje descriptivo-aspiracional, máximo 80 palabras, no clínico, no determinista. Cada texto incluye descripción de banda + ejemplo conductual + invitación a la reflexión.

### 5.A Valores de Orden Superior (HOV)

#### Openness to Change (Apertura al cambio)

*Descripción técnica:* Conjunto motivacional orientado a la exploración, la novedad y la autonomía de pensamiento y acción.

- **BAJO:** Tiendes a sentirte más cómodo cuando las cosas son predecibles y conocidas. Por ejemplo, podrías preferir restaurantes y rutinas que ya conoces antes que probar algo nuevo. Esto sugiere que valoras la estabilidad como base para tu día a día. ¿En qué áreas de tu vida sí te gustaría dejar entrar un poco más de novedad?
- **MEDIO:** Equilibras la curiosidad con la rutina. A veces te animas a explorar y a veces prefieres lo conocido. Por ejemplo, puedes aceptar un cambio de rol si lo evalúas con calma. Esto sugiere que decides caso por caso. ¿Qué señales te indican cuándo te conviene moverte hacia algo nuevo?
- **ALTO:** Tiendes a buscar lo novedoso y a cuestionar la rutina. Por ejemplo, te entusiasma proponer ideas distintas en el trabajo o probar caminos no recorridos. Esto sugiere que valoras la libertad de pensar y actuar a tu manera. ¿Cómo cuidas el descanso cuando esa búsqueda constante te agota?

#### Self-Enhancement (Autopromoción)

*Descripción técnica:* Motivaciones orientadas al éxito personal, el reconocimiento y el control de recursos y personas.

- **BAJO:** Tiendes a poner el logro personal en segundo plano frente a otras prioridades. Por ejemplo, podrías rechazar un ascenso que implique competir mucho con colegas. Esto sugiere que valoras más la armonía o la colaboración. ¿Qué tipo de reconocimiento sí te resulta significativo?
- **MEDIO:** Te interesa avanzar, sin que eso defina toda tu identidad. Por ejemplo, puedes celebrar un logro y al día siguiente enfocarte en tu familia. Esto sugiere que combinas ambición con otras facetas. ¿Cómo decides cuándo empujar por más y cuándo soltar?
- **ALTO:** Tiendes a mover tus acciones hacia el éxito y la visibilidad. Por ejemplo, te enfocas en metas medibles y te gusta que tu esfuerzo se note. Esto sugiere que valoras demostrar competencia. ¿Qué relaciones quieres cuidar para que ese impulso no opaque otros vínculos importantes?

#### Conservation (Conservación)

*Descripción técnica:* Motivaciones orientadas al orden, la seguridad, la tradición y la conformidad con normas y costumbres.

- **BAJO:** Tiendes a sentirte cómodo cuestionando reglas y costumbres. Por ejemplo, podrías replantear cómo se hacen las cosas en tu familia o en tu equipo. Esto sugiere que valoras la flexibilidad por encima del orden establecido. ¿Qué tradiciones sí conservas por elección propia?
- **MEDIO:** Respetas las normas cuando tienen sentido y las cuestionas cuando no. Por ejemplo, sigues procesos en el trabajo pero propones mejoras. Esto sugiere que ves el orden como herramienta, no como fin. ¿En qué situaciones la estabilidad te suma y en cuáles te limita?
- **ALTO:** Tiendes a valorar la estabilidad, las costumbres y el cumplimiento de normas. Por ejemplo, te genera tranquilidad mantener rituales familiares o procesos claros. Esto sugiere que ves en el orden una forma de cuidado. ¿Cómo distingues entre tradiciones que te nutren y otras que te conviene revisar?

#### Self-Transcendence (Autotrascendencia)

*Descripción técnica:* Motivaciones orientadas al bienestar de otros y de la naturaleza más allá del interés personal.

- **BAJO:** Tiendes a priorizar tus necesidades inmediatas antes que las del entorno. Por ejemplo, podrías dejar para después las causas colectivas. Esto sugiere que cuidar de ti es un foco actual. ¿Hay personas o causas que sí te mueven aunque no sea tu primer impulso?
- **MEDIO:** Cuidas de los tuyos y a veces extiendes ese cuidado más allá. Por ejemplo, ayudas en proyectos comunitarios cuando te queda espacio. Esto sugiere un balance entre lo propio y lo colectivo. ¿Qué causa te gustaría sumar si tuvieras más energía?
- **ALTO:** Tiendes a moverte por el bienestar de otros y por causas amplias. Por ejemplo, te involucras en temas ambientales, voluntariados o redes de apoyo. Esto sugiere que valoras la justicia y el cuidado de la comunidad. ¿Cómo recargas tu energía para sostener ese compromiso en el tiempo?

### 5.B Valores Refinados (19) — Textos por banda

Por extensión, se presentan los 19 textos siguiendo el mismo formato. Cada bloque debe cargarse como fila independiente en la tabla `reports` del plugin.

**Self-Direction-Thought** (SDT): libertad de pensar y desarrollar las propias ideas.
- BAJO: Tiendes a apoyarte en ideas ya probadas más que en producirlas. Por ejemplo, prefieres aplicar lo que ya funciona antes que reinventar. Esto sugiere que valoras la eficiencia práctica. ¿Qué tema te invitaría a pensar desde cero?
- MEDIO: Combinas curiosidad intelectual con pragmatismo. Por ejemplo, generas ideas nuevas cuando un problema lo amerita. Esto sugiere un pensamiento situacional. ¿Qué te impulsa a profundizar cuando un tema te enrumba?
- ALTO: Tiendes a cultivar ideas propias y a explorar conceptos por gusto. Por ejemplo, lees, escribes o reflexionas sobre temas que pocos consideran. Esto sugiere que valoras la libertad mental. ¿Cómo conviertes esas ideas en algo que comparten otros?

**Self-Direction-Action** (SDA): libertad de elegir las propias acciones.
- BAJO: Tiendes a sentirte cómodo cuando alguien más fija el rumbo. Por ejemplo, prefieres seguir procesos antes que improvisar. Esto sugiere que valoras la claridad estructural. ¿En qué decisiones quieres recuperar margen de elección?
- MEDIO: Tomas la iniciativa cuando hace falta y delegas cuando conviene. Por ejemplo, lideras proyectos puntuales pero también te sumas a planes ajenos. Esto sugiere flexibilidad de rol. ¿Qué área de tu vida pide más decisión propia ahora?
- ALTO: Tiendes a decidir por ti y a marcar tu propio ritmo. Por ejemplo, eliges horarios, estilos y caminos sin pedir permiso. Esto sugiere que valoras la autonomía práctica. ¿Cómo equilibras esa libertad con compromisos compartidos?

**Stimulation** (ST): emoción, novedad y desafío.
- BAJO: Tiendes a sentir bienestar en lo estable y predecible. Por ejemplo, evitas planes con incertidumbre alta. Esto sugiere que valoras la tranquilidad. ¿Qué pequeña novedad sí te animaría a probar?
- MEDIO: Aceptas desafíos puntuales sin volverlos un estilo de vida. Por ejemplo, viajas a un lugar nuevo de vez en cuando. Esto sugiere búsqueda moderada de estímulo. ¿Cuándo el reto te energiza y cuándo te desgasta?
- ALTO: Tiendes a buscar emociones, viajes y desafíos. Por ejemplo, te atraen actividades intensas o cambios constantes. Esto sugiere que valoras la adrenalina. ¿Cómo cuidas la sostenibilidad de ese ritmo?

**Hedonism** (HE): placer y gratificación sensorial.
- BAJO: Tiendes a posponer el placer en favor de otras metas. Por ejemplo, dejas para después celebraciones o gustos. Esto sugiere disciplina o un foco fuerte en deber. ¿Qué pequeño placer te gustaría recuperar esta semana?
- MEDIO: Equilibras disfrute con responsabilidad. Por ejemplo, te das gustos sin que dominen tu agenda. Esto sugiere autorregulación. ¿Qué placeres te conectan mejor contigo?
- ALTO: Tiendes a buscar disfrute y bienestar sensorial. Por ejemplo, valoras buena comida, descanso y experiencias placenteras. Esto sugiere que valoras vivir el presente. ¿Cómo combinas ese disfrute con metas que te importan a mediano plazo?

**Achievement** (AC): éxito por demostración de competencia.
- BAJO: Tiendes a no medir tu valor por logros visibles. Por ejemplo, priorizas el proceso sobre el resultado. Esto sugiere una identidad poco atada al rendimiento. ¿Qué tipo de progreso sí te resulta satisfactorio?
- MEDIO: Te alegran los logros sin que definan tu identidad. Por ejemplo, celebras una meta y sigues. Esto sugiere ambición moderada. ¿Cómo defines un buen logro para ti?
- ALTO: Tiendes a buscar destacarte y demostrar competencia. Por ejemplo, te enfocas en resultados medibles y reconocimiento. Esto sugiere que valoras el alto desempeño. ¿Cómo lidias con momentos en los que no llegas a la meta?

**Power-Dominance** (POD): poder a través del control sobre personas.
- BAJO: Tiendes a evitar posiciones que impliquen mandar sobre otros. Por ejemplo, prefieres trabajar entre pares. Esto sugiere que valoras la horizontalidad. ¿En qué situaciones sí asumes mando sin sentir tensión?
- MEDIO: Asumes rol de liderazgo cuando hace falta sin buscarlo activamente. Por ejemplo, coordinas un equipo solo si nadie más lo hace. Esto sugiere flexibilidad jerárquica. ¿Qué tipo de influencia te resulta cómoda?
- ALTO: Tiendes a buscar tener voz y dirección sobre lo que pasa alrededor. Por ejemplo, te animas a liderar grupos o decisiones. Esto sugiere que valoras la influencia directa. ¿Cómo distingues entre influir e imponer?

**Power-Resources** (POR): poder por control de recursos materiales y sociales.
- BAJO: Tiendes a no priorizar la acumulación de recursos o estatus. Por ejemplo, no buscas activamente cargos con mayor presupuesto. Esto sugiere foco en otros logros. ¿Qué recursos sí cuidas porque te dan seguridad?
- MEDIO: Te interesan recursos suficientes sin que sea tu motor principal. Por ejemplo, negocias salario pero no compites por bonos. Esto sugiere balance. ¿Qué nivel de holgura material te basta?
- ALTO: Tiendes a buscar recursos, ingresos y estatus visible. Por ejemplo, planificas finanzas y red de contactos. Esto sugiere que valoras tener medios para influir. ¿Cómo cuidas que esa búsqueda no opaque otros valores?

**Face** (FAC): mantener imagen pública y evitar humillación.
- BAJO: Tiendes a no preocuparte mucho por la opinión externa. Por ejemplo, hablas o vistes como quieres sin medir aprobación. Esto sugiere autenticidad. ¿Qué imagen sí te interesa proyectar y por qué?
- MEDIO: Cuidas tu reputación sin obsesionarte. Por ejemplo, mides tono en contextos formales. Esto sugiere conciencia social moderada. ¿Cuándo la imagen te suma y cuándo te limita?
- ALTO: Tiendes a cuidar mucho cómo te ven los demás. Por ejemplo, te incomoda quedar en evidencia. Esto sugiere que valoras la dignidad pública. ¿Qué espacios te permiten relajar esa exigencia?

**Security-Personal** (SEP): seguridad en el entorno cercano.
- BAJO: Tiendes a no enfocarte mucho en riesgos personales. Por ejemplo, viajas o haces planes sin sobre-planear protecciones. Esto sugiere apertura al riesgo cotidiano. ¿Qué mínimos sí cuidas para sentirte tranquilo?
- MEDIO: Mantienes precauciones razonables. Por ejemplo, cierras la casa, evitas zonas conflictivas. Esto sugiere prudencia normal. ¿Qué nivel de control sobre tu entorno te basta?
- ALTO: Tiendes a planear para minimizar riesgos en tu día a día. Por ejemplo, evalúas rutas, contactos y entornos. Esto sugiere que valoras la previsibilidad. ¿Cómo evitas que esa vigilancia se vuelva agotadora?

**Security-Societal** (SES): seguridad y estabilidad en la sociedad amplia.
- BAJO: Tiendes a no priorizar el orden social macro en tus decisiones. Por ejemplo, te interesan poco temas de seguridad ciudadana. Esto sugiere foco en lo personal. ¿Qué tema social sí te importa cuidar?
- MEDIO: Te informas sobre seguridad pública sin volverlo eje. Por ejemplo, votas pensando en estabilidad, pero no exclusivamente. Esto sugiere conciencia cívica. ¿Qué estabilidad social querrías ver en tu entorno?
- ALTO: Tiendes a valorar el orden, la institucionalidad y la estabilidad colectiva. Por ejemplo, apoyas políticas que refuerzan seguridad. Esto sugiere que valoras un país predecible. ¿Cómo balanceas ese deseo con la apertura al cambio social?

**Tradition** (TR): respeto a costumbres culturales o religiosas.
- BAJO: Tiendes a no organizar tu vida alrededor de tradiciones. Por ejemplo, no celebras festividades por convención. Esto sugiere preferencia por crear tus propios rituales. ¿Qué tradición sí elegirías mantener?
- MEDIO: Honras ciertas tradiciones y dejas pasar otras. Por ejemplo, mantienes rituales familiares clave. Esto sugiere selección personal. ¿Qué tradiciones te conectan con quienes amas?
- ALTO: Tiendes a sostener tradiciones culturales, familiares o religiosas. Por ejemplo, mantienes prácticas que tus mayores te transmitieron. Esto sugiere que valoras la continuidad. ¿Qué tradición querrías actualizar sin perderla?

**Conformity-Rules** (COR): cumplir reglas y obligaciones formales.
- BAJO: Tiendes a cuestionar reglas que no tienen sentido para ti. Por ejemplo, propones excepciones cuando ves rigideces. Esto sugiere flexibilidad normativa. ¿Qué reglas sí respetas por convicción y no por temor?
- MEDIO: Cumples reglas razonables y discutes las que no lo son. Por ejemplo, sigues procesos pero sugieres ajustes. Esto sugiere conformidad reflexiva. ¿Cómo eliges qué normas seguir?
- ALTO: Tiendes a cumplir reglas y obligaciones formales con consistencia. Por ejemplo, sigues procedimientos al pie de la letra. Esto sugiere que valoras el orden compartido. ¿Cuándo una regla pierde sentido para ti?

**Conformity-Interpersonal** (COI): evitar molestar o dañar a otros.
- BAJO: Tiendes a expresar lo que piensas aunque incomode. Por ejemplo, das opiniones directas. Esto sugiere franqueza alta. ¿Cómo cuidas la relación cuando dices verdades difíciles?
- MEDIO: Mides cuándo opinar y cuándo guardar silencio. Por ejemplo, escoges momentos para temas sensibles. Esto sugiere prudencia social. ¿En qué relaciones puedes ser más directo?
- ALTO: Tiendes a cuidar mucho no molestar a los demás. Por ejemplo, callas para no incomodar. Esto sugiere que valoras la armonía. ¿Cómo te aseguras de que también tus necesidades se escuchen?

**Humility** (HUM): reconocer la propia insignificancia. **Nota psicométrica:** esta faceta tiene baja confiabilidad sistemática en los 49 grupos del estudio multinacional de Schwartz y Cieciuch (2022). Interpretar con cautela.
- BAJO: Tiendes a reconocer tu propio valor y aporte abiertamente. Por ejemplo, hablas de tus logros sin minimizarlos. Esto sugiere autoafirmación sana. ¿En qué área te ayudaría una mirada más relativizada?
- MEDIO: Equilibras reconocer tus aportes con reconocer límites. Por ejemplo, aceptas elogios y también críticas. Esto sugiere autoconocimiento. ¿Qué te ayuda a mantener ese equilibrio?
- ALTO: Tiendes a verte como parte de algo más grande. Por ejemplo, restas importancia a tus logros. Esto sugiere que valoras la perspectiva amplia. ¿Cómo reconoces tu valor sin que se sienta arrogante?

**Benevolence-Caring** (BEC): devoción al bienestar de personas cercanas.
- BAJO: Tiendes a cuidar tu energía antes de darla a otros. Por ejemplo, pones límites firmes con familia. Esto sugiere autocuidado priorizado. ¿A quién sí quieres acercarte más?
- MEDIO: Cuidas a tu círculo cercano sin sobre-extenderte. Por ejemplo, acompañas a quien lo necesita pero no a costa tuya. Esto sugiere cuidado sostenible. ¿Cómo decides cuánto dar?
- ALTO: Tiendes a estar atento al bienestar de tus seres queridos. Por ejemplo, ofreces tiempo, escucha y ayuda. Esto sugiere que valoras el vínculo profundo. ¿Cómo recargas energía después de cuidar mucho?

**Benevolence-Dependability** (BED): ser confiable y digno de confianza en el grupo.
- BAJO: Tiendes a no comprometerte demasiado con expectativas ajenas. Por ejemplo, cumples lo mínimo pactado. Esto sugiere autonomía relacional. ¿Con quién sí quieres ser sostén?
- MEDIO: Cumples con lo que prometes en relaciones importantes. Por ejemplo, llegas cuando dijiste que llegarías. Esto sugiere confiabilidad práctica. ¿Cómo proteges esa confianza?
- ALTO: Tiendes a ser el referente confiable de tu grupo. Por ejemplo, otros te buscan porque saben que respondes. Esto sugiere que valoras la lealtad. ¿Cómo cuidas no cargar solo con todo?

**Universalism-Concern** (UNC): compromiso con igualdad y justicia para todos.
- BAJO: Tiendes a enfocarte en lo cercano antes que en causas amplias. Por ejemplo, no priorizas temas globales. Esto sugiere foco local. ¿Qué tema de justicia te ha tocado de cerca?
- MEDIO: Te importan los temas sociales sin volverlos militancia. Por ejemplo, opinas o donas ocasionalmente. Esto sugiere conciencia cívica. ¿Qué causa te gustaría conocer mejor?
- ALTO: Tiendes a involucrarte por la justicia y la igualdad. Por ejemplo, participas en iniciativas sociales o defiendes derechos. Esto sugiere que valoras el bien común. ¿Cómo sostienes ese compromiso sin agotarte?

**Universalism-Nature** (UNN): preservación del entorno natural.
- BAJO: Tiendes a no priorizar acciones ambientales en tu día a día. Por ejemplo, no organizas tu rutina por sostenibilidad. Esto sugiere otros focos vitales. ¿Qué pequeña práctica te haría sentido?
- MEDIO: Cuidas el ambiente cuando puedes. Por ejemplo, reciclas y ahorras energía sin volverlo ideología. Esto sugiere coherencia moderada. ¿Qué hábito te gustaría sumar?
- ALTO: Tiendes a integrar el cuidado de la naturaleza en tus decisiones. Por ejemplo, eliges productos y prácticas sostenibles. Esto sugiere que valoras al planeta como prioridad. ¿Cómo invitas a otros sin imponer?

**Universalism-Tolerance** (UNT): aceptación de personas diferentes a uno.
- BAJO: Tiendes a sentirte más cómodo entre personas similares a ti. Por ejemplo, tus círculos comparten ideas y estilos. Esto sugiere preferencia por lo conocido. ¿Qué diferencia te ha enseñado algo en tu vida?
- MEDIO: Aceptas la diversidad sin que sea bandera central. Por ejemplo, convives con visiones distintas a la tuya. Esto sugiere apertura práctica. ¿Qué diferencia te cuesta más comprender?
- ALTO: Tiendes a abrirte a personas con visiones, culturas y estilos muy distintos. Por ejemplo, buscas espacios diversos. Esto sugiere que valoras el pluralismo. ¿Cómo procesas desacuerdos profundos sin perder esa apertura?

---

## SECCIÓN 6 — LICENSE ACQUISITION PLAN

### 6.1 Titular y contacto

**Titular del copyright:** Prof. Shalom H. Schwartz, Profesor Emérito, Departamento de Psicología, Hebrew University of Jerusalem; dirección postal listada en Schwartz y Cieciuch (2022): 100 Woodland Pond Circle, New Paltz, NY 12561, USA.
**Email institucional vigente (autor de correspondencia, 2022):** `shalom.schwartz@huji.ac.il`.
**Co-titular del repositorio ORPC:** International Association for Cross-Cultural Psychology (IACCP) / ScholarWorks@GVSU.

### 6.2 Práctica histórica de concesión

*Hecho:* el repositorio ORPC declara: "This work is licensed under a Creative Commons Attribution-Noncommercial-No Derivative Works 3.0 License" (`https://scholarworks.gvsu.edu/orpc/vol2/iss2/9/`); el artículo en *Assessment* declara: "This article is distributed under the terms of the Creative Commons Attribution-NonCommercial 4.0 License […] which permits non-commercial use, reproduction and distribution of the work without further permission" (Schwartz y Cieciuch, 2022, página de copyright). *Hecho:* en hilos públicos de ResearchGate, investigadores reportan que Schwartz responde personalmente y suele enviar la versión más reciente del instrumento a quienes la solicitan con propósito investigativo. *Inferencia:* la práctica histórica para uso académico es la concesión gratuita previa solicitud por correo. *Opinión profesional:* el uso comercial freemium requiere permiso explícito porque ambas licencias (CC BY-NC-ND 3.0 y CC BY-NC 4.0) prohíben el uso comercial; ningún hilo público documenta un licenciamiento comercial otorgado, por lo que la negociación debe enmarcarse como excepción condicionada.

### 6.3 Pasos para solicitar

1. **Semana 0:** Equipo legal DescubreMe redacta MoU corto explicando modelo freemium (B2C Paid USD 19), uso no diagnóstico, alcance educativo, exclusión de B2C Free MVP.
2. **Semana 1:** Envío de email inicial a Schwartz (borrador en 6.4).
3. **Semana 2-3:** Si responde positivamente, agendar videollamada para alinear condiciones.
4. **Semana 4-6:** Firma de acuerdo escrito y eventual compromiso de compartir datos agregados anonimizados con su laboratorio.
5. **Paralelo:** Activar Plan B (TwIVI) en el plugin como fallback técnico mientras dura la negociación.

### 6.4 Borrador de email inicial (inglés)

> Subject: Request for permission to use the PVQ-RR in DescubreMe — an educational self-knowledge platform in Colombia
>
> Dear Professor Schwartz,
>
> My name is [Nombre], and I lead [rol] at DescubreMe, a web platform based in Colombia that offers educational and orientational self-knowledge profiles to adult users in Latin America. We are not a clinical or personnel-selection service; our purpose is to help adults reflect on their values, strengths and life direction.
>
> We have studied your work extensively and would like to ask permission to administer the PVQ-RR (57 items, final version 2022) within two of our paid products: a USD 19 individual deep profile and a B2B engagement module. We would not use the PVQ-RR in our free tier. We commit to (a) using the Spanish translation authorized by you for the Colombia 2022 sample, (b) applying MRAT centering as specified in your scoring manual, (c) never presenting results as diagnostic or predictive, (d) citing Schwartz et al. (2012) and Schwartz & Cieciuch (2022) in every report, and (e) sharing anonymized aggregated Colombian adult data with your laboratory for research purposes if you find it useful.
>
> Could we schedule a 30-minute video call to discuss conditions and any concerns? I am attaching a one-page summary of the platform.
>
> With deep respect for your work,
> [Nombre, cargo, correo, teléfono]

### 6.5 Costo esperado

- **Escenario base:** USD 0 monetarios + compromiso de compartir datos agregados anonimizados + revisión y aprobación de traducción es-CO por el autor (3-4 iteraciones de back-translation, 4-8 semanas).
- **Escenario alto:** Schwartz podría declinar uso comercial o exigir un licenciamiento simbólico. No hay tarifa pública estandarizada para el PVQ-RR; el rango plausible USD 0–USD 5.000 anuales es estimación interna [sin fuente verificada — proponer benchmarking con licenciamientos de otros instrumentos académicos como NEO-PI-R o BFI-2 a través de su editor].
- **Escenario rechazo:** Activar Plan B.

### 6.6 Plan B — TwIVI (Twenty-Item Values Inventory)

**Instrumento alterno:** TwIVI (Sandy, Gosling, Schwartz y Koelkebeck, 2017, *Journal of Personality Assessment*, 99(5), 545–555, DOI 10.1080/00223891.2016.1231115). 20 ítems, mide los 10 valores básicos clásicos de Schwartz, escala Likert 6, MRAT centering recomendado.

*Hecho (Sandy et al., 2017, p. 552, Tabla 7):* "The stability coefficient for the TwIVI was .86 (SD = .15)". *Hecho (abstract, Sandy et al., 2017):* "Rigorous psychometric procedures based on separate derivation (N = 38,049) and evaluation (N = 29,143) samples yielded 10- and 20-item measures of values".

**Licencia explícita** (Gosling site, UT Austin, `https://gosling.psy.utexas.edu/two-short-measures-of-values-tivi-and-twivi/`): "WANT TO USE THE TIVI or TwIVI? GO AHEAD. ANYONE CAN USE IT FOR ANY PURPOSE. NO NEED TO ASK ME FOR PERMISSION."

**Tradeoff:** se pierde granularidad de los 19 valores refinados (queda en 10 valores básicos) y se sacrifican Humility, Face y las subdivisiones de Power, Security, Universalism, Benevolence, Self-Direction y Conformity. Se gana libertad legal total, tiempo de aplicación (5–7 min vs 12–15 min) y posibilidad de incluir el test en el tier Free MVP.

**Decisión arquitectónica recomendada:** implementar PVQ-RR como instrumento principal y TwIVI como fallback técnico activable por flag `instrument_variant: 'twivi_fallback'`. Si la negociación con Schwartz falla a las 8 semanas, migrar tier Paid a TwIVI sin re-deploy.

---

## SECCIÓN 7 — DISCLAIMERS Y MITIGACIONES ESPECÍFICAS

### 7.1 Disclaimer pre-test (es-CO, ≤100 palabras)

> Este cuestionario te ayuda a explorar qué valores guían tus decisiones según el modelo de Shalom Schwartz, ampliamente usado en investigación. Es una herramienta educativa y de autoconocimiento: no es un diagnóstico, no predice tu carrera ni tu salud, y no debe usarse para procesos de selección. Te tomará 12 a 15 minutos. Responde con honestidad sobre cómo te ves hoy: no hay respuestas correctas o incorrectas. Tus resultados son privados. Si en algún momento te sientes incómodo, puedes pausar o salir sin perder tu cuenta. ¿Listo para empezar?

### 7.2 Ítems sensibles que activan NFR-28

> **Nota S12 (2026-05-22):** este §7.2 v1.0 está **superado** por `PVQ-RR_TRIGGERS_NFR28_v1.0.md` (companion v2). El companion provee la regla detector canónica (omisión, no puntaje) y reemplaza la regla de disparo NFR-28 de §7.2 v1.0. Consulta el companion como source-of-truth para impl CC.
>
> El atributo de marca `sensitive_content: true` mencionado abajo está alineado a la columna real del schema como `item.sensitivity = 'emotional_distress'` (enum `item_sensitivity`, Migration 007 + 021). Drift naming P3 cerrado en S12 (DD-95).

Aunque el PVQ-RR no contiene ítems de salud mental, los siguientes pueden generar incomodidad emocional en usuarios vulnerables y deben llevar marca `item.sensitivity = 'emotional_distress'` (schema; antes documentada como `sensitive_content: true`) para el monitor de contención:
- Ítems de **Humility** (7, 38, 54) — pueden activar sentimientos de invalidación en personas con baja autoestima.
- Ítems de **Tradition** (18, 33, 40) — pueden activar conflictos en personas con experiencias religiosas o familiares dolorosas.
- Ítems de **Conformity-Interpersonal** (4, 22, 51) — pueden activar tensión en víctimas de abuso o dinámicas coercitivas.
- Ítems de **Power-Dominance** (6, 29, 41) y **Power-Resources** (12, 20, 44) — pueden generar sentimientos de desigualdad económica o de género.

El plugin debe permitir saltar ítems sin invalidar la prueba siempre y cuando se mantenga ≥ 2 de los 3 ítems por faceta (NFR-28 de DescubreMe).

### 7.3 Mensaje de contención (es-CO, ≤120 palabras)

> Notamos que algunas preguntas pueden traer recuerdos o emociones difíciles. Eso es normal cuando uno se mira con calma. Si en este momento te sientes muy mal, triste o con ideas de hacerte daño, por favor pausa el test y busca acompañamiento. En Colombia puedes llamar gratis a la Línea 106 "El poder de ser escuchado" (Bogotá, 24 horas), a la Línea Amiga Saludable de Medellín (604) 444 4448, o marcar 192 opción 4 desde cualquier ciudad para orientación en salud mental. Si estás en emergencia, llama al 123. Tu bienestar va primero. Cuando estés listo, este cuestionario te espera. No hay prisa.

### 7.4 Líneas de ayuda Colombia relevantes

| Línea | Cobertura | Teléfono / Canal | Horario |
|---|---|---|---|
| Línea 106 "El poder de ser escuchado" | Bogotá (Secretaría Distrital de Salud) | 106 | 24/7 |
| Línea Amiga Saludable | Medellín | (604) 444 4448 / WhatsApp 300 723 1123 | 24/7 |
| Orientación en salud mental | Nacional desde celular | 192 opción 4 | 24/7 |
| Línea Púrpura (mujeres en violencia) | Bogotá / nacional | 01 8000 112 137 / WhatsApp 300 755 1846 | 24/7 |
| Línea Calma (hombres, manejo emocional) | Bogotá | 01 8000 423 614 | Horario laboral ampliado |
| Línea de Emergencia | Nacional | 123 | 24/7 |

Fuentes: Secretaría Distrital de Salud de Bogotá (`https://bogota.gov.co/servicios/tramites/linea-106`), Alcaldía de Santiago de Cali (`https://www.cali.gov.co/salud/publicaciones/160736/linea-106-para-atencion-en-salud-mental/`), Directorio del Colegio Colombiano de Psicólogos (`https://www.colpsic.org.co/wp-content/uploads/2021/08/Directorio-salud-mental-Colombia.pdf`).

### 7.5 Disclaimer post-test (es-CO, ≤80 palabras)

> Estos resultados describen tendencias en tus valores hoy, no rasgos fijos. Los valores cambian con el tiempo, los vínculos y las experiencias. Lo que ves aquí es una invitación a la reflexión, no una etiqueta ni un diagnóstico. No tomes decisiones grandes de carrera, pareja o salud basándote solo en este perfil. Si quieres profundizar, conversa con un psicólogo, coach o persona de confianza. Tu historia siempre es más amplia que cualquier cuestionario.

---

## SECCIÓN 8 — SUGERENCIAS DE PILOTO COGNITIVO COLOMBIA

### 8.1 Tamaño y características de la muestra

- N=30 participantes para piloto cognitivo cualitativo, alineado con la evidencia de saturación de Scott et al. (2021, *Health Policy and Planning*, 36(6), PMC8227989): "reasonable evidence of saturation with a total of 20–25 participants over three rounds"; y con la recomendación de Willis (2014, *Cognitive Interviewing*) de 8–12 sujetos por ronda en 1–3 rondas.
- Edad: 18–65 años, distribución balanceada (10 por tramo: 18–30, 31–50, 51–65).
- Sexo: ≥40% mujeres, ≥40% hombres, ≥10% diversidad de género.
- Nivel educativo: ≥30% bachillerato máximo, ≥30% técnico/tecnólogo, ≥30% universitario.
- Región: ≥40% Bogotá, ≥20% Antioquia, ≥20% Valle/Costa, ≥20% Eje cafetero/Santanderes.
- Excluir: profesionales en psicometría, traductores, hablantes nativos de inglés.

### 8.2 Protocolo think-aloud

1. Aplicación 1-a-1, vía Google Meet o presencial, 45 min por sesión.
2. Cada participante recibe los 57 ítems en orden aleatorio (no el orden del scoring key).
3. Por cada ítem, se pide: leer en voz alta + parafrasear con palabras propias + indicar dificultad (escala 1–5) + identificar términos confusos.
4. Tras los 57 ítems, entrevista semiestructurada de 15 min sobre: claridad global, fatiga, ítems incómodos, sugerencias léxicas.
5. Grabación con consentimiento; transcripción para análisis temático.

### 8.3 Criterios para aceptar/re-adaptar ítem

- **Aceptar tal cual:** ≥80% paráfrasis correcta + dificultad ≤2 + sin más de 1 sugerencia léxica idéntica.
- **Re-adaptar léxico:** 60–80% paráfrasis correcta o ≥3 sugerencias léxicas idénticas (proponer 2 alternativas al autor para back-translation).
- **Marca rojo (revisar con autor):** <60% paráfrasis correcta o dificultad media >3.
- Cualquier modificación debe pasar back-translation y aprobación de Schwartz (cláusula NoDerivatives).

### 8.4 Output esperado del piloto

- Reporte cualitativo de 8–12 páginas con: matriz ítem × paráfrasis correcta × dificultad × sugerencias.
- Lista priorizada de 0–10 ítems a re-adaptar.
- Borrador de versión es-CO para envío a Schwartz.
- Recomendación final: aprobar/rechazar/condicionar despliegue del PVQ-RR para producción.

---

## SECCIÓN 9 — GAPS Y PREGUNTAS ABIERTAS

1. **¿Cuál es exactamente la traducción al español usada en la muestra Colombia (N=410) de Schwartz y Cieciuch (2022)?** *Plan:* descargar el archivo correspondiente desde `https://osf.io/w9as3/?view_only=e1f02bf232c34d39b9884398b4f2df63` y compararlo letra a letra con la versión Costa Rica y la versión Sánchez 2016 Honduras. Si el archivo OSF está restringido, escribir a `shalom.schwartz@huji.ac.il` solicitando explícitamente el archivo de la traducción Colombia.

2. **¿Cuáles son las 5 facetas con α < .60 en Colombia?** Schwartz y Cieciuch (2022, Tabla 6) reportan que en Colombia 14/19 facetas alcanzaron α > .60, sin nombrar las 5 restantes en el cuerpo principal. *Plan:* descargar el supplement Word S2 y S3 de SAGE (`https://journals.sagepub.com/doi/suppl/10.1177/1073191121998760`) o del OSF; reproducir en el plugin como caveat per-faceta en es-CO. *Hipótesis fuerte:* Humility, Self-Direction-Thought, Security-Personal y Achievement están entre las 5 dado su perfil M α relativamente bajo a nivel pooled.

3. **¿Existe alguna validación standalone es-CO o es-MX del PVQ-RR publicada en 2023–2026 que la búsqueda actual no haya recuperado?** *Plan:* consultar trimestralmente SciELO Colombia, Redalyc, Universitas Psychologica, Revista Latinoamericana de Psicología, Anales de Psicología y Psicothema; alertas Google Scholar con "PVQ-RR Colombia", "valores Schwartz adaptación México", "valores refinados español".

4. **¿La estabilidad topológica de Universalism vs Benevolence se replica en muestra adulta colombiana o solo en estudiantes?** *Plan:* en el piloto de validación interno (Sección 3.3 Fase B), examinar MDS Tucker's phi y posiciones de las facetas. Si la inversión Universalism-Benevolence ocurre, documentarla como caveat en los reports al usuario.

5. **¿Es defensible regulatoriamente (SIC, Ley 1581 Habeas Data colombiano) aplicar un test con licencia CC BY-NC-ND a producto comercial sin permiso explícito mientras se negocia?** *Plan:* consulta legal previa al go-live; default conservador es no aplicar PVQ-RR sin permiso firmado y mantener TwIVI como instrumento activo en producción.

---

## SECCIÓN 10 — REFERENCIAS (APA 7)

Castro Solano, A., & Nader, M. (2006). La evaluación de los valores humanos con el Portrait Values Questionnaire de Schwartz. *Interdisciplinaria*, 23(2), 155–174.

Cieciuch, J., Davidov, E., Vecchione, M., Beierlein, C., & Schwartz, S. H. (2014). The cross-national invariance properties of a new scale to measure 19 basic human values: A test across eight countries. *Journal of Cross-Cultural Psychology*, 45(5), 764–776. https://doi.org/10.1177/0022022114527348

Costa, P. J. C., Moreira, P. A. S., Faria, S., & Correia Lopes, J. (2023). The Twenty Item Values Inventory (TwIVI) in Portuguese adults: Factorial structure, internal consistency, and criterion-related validity. *Journal of Personality Assessment*, 105(1), 22–33. https://doi.org/10.1080/00223891.2022.2048844

Rudnev, M. (2021). Caveats of non-ipsatization of basic values: A review of issues and a simulation study. *Journal of Research in Personality*, 93, 104118. https://doi.org/10.1016/j.jrp.2021.104118

Sandy, C. J., Gosling, S. D., Schwartz, S. H., & Koelkebeck, T. (2017). The development and validation of brief and ultrabrief measures of values. *Journal of Personality Assessment*, 99(5), 545–555. https://doi.org/10.1080/00223891.2016.1231115

Schwartz, S. H. (2012). An overview of the Schwartz theory of basic values. *Online Readings in Psychology and Culture*, 2(1), Article 11. https://doi.org/10.9707/2307-0919.1116

Schwartz, S. H. (2021). A repository of Schwartz value scales with instructions and an introduction. *Online Readings in Psychology and Culture*, 2(2), Article 9. https://doi.org/10.9707/2307-0919.1173

Schwartz, S. H., & Cieciuch, J. (2022). Measuring the refined theory of individual values in 49 cultural groups: Psychometrics of the Revised Portrait Value Questionnaire. *Assessment*, 29(5), 1005–1019. https://doi.org/10.1177/1073191121998760

Schwartz, S. H., Cieciuch, J., Vecchione, M., Davidov, E., Fischer, R., Beierlein, C., Ramos, A., Verkasalo, M., Lönnqvist, J.-E., Demirutku, K., Dirilen-Gumus, O., & Konty, M. (2012). Refining the theory of basic individual values. *Journal of Personality and Social Psychology*, 103(4), 663–688. https://doi.org/10.1037/a0029393

Schwartz, S. H., Cieciuch, J., Vecchione, M., Torres, C., Dirilen-Gumus, O., & Butenko, T. (2017). Value tradeoffs propel and inhibit behavior: Validating the 19 refined values in four countries. *European Journal of Social Psychology*, 47(3), 241–258. https://doi.org/10.1002/ejsp.2228

Scott, K., Ummer, O., & LeFevre, A. E. (2021). The devil is in the detail: Reflections on the value and application of cognitive interviewing to strengthen quantitative surveys in global health. *Health Policy and Planning*, 36(6), 982–995. https://doi.org/10.1093/heapol/czab048

Secretaría Distrital de Salud de Bogotá. (2025). *Servicio de escucha y apoyo emocional – Línea 106*. Alcaldía Mayor de Bogotá. https://bogota.gov.co/servicios/tramites/linea-106

Willis, G. B. (2014). *Analysis of the Cognitive Interview in Questionnaire Design*. Oxford University Press. https://doi.org/10.1093/acprof:osobl/9780199957750.001.0001

**`[Aportes desde Gemini — verificación pendiente]`** (las siguientes referencias se citan en el reporte de Gemini con enlaces secundarios; se conservan aquí como punto de partida para verificación antes de uso en producción):

Smith-Castro, V., y colegas. (2019). Adaptación del Cuestionario Psicométrico de Valores Retratados (PVQ-RR) con estudiantes de primer ingreso de la sede Rodrigo Facio de la Universidad de Costa Rica. *ResearchGate publication 333457993*. [verificar paper primario en repositorio UCR; ya citado por Claude].

Evaluating value measures across cultures: study on PVQ-RR, PVQ-40, and PVQ-21 in Turkey. (2025). *PMC12802304*. [referencia internacional adicional sobre el PVQ-RR; verificar DOI primario].

Sorvali, J., y colaboradores. (2021). Value priorities of the Finnish farmers: Time to stop thinking of farmers as inherently conservative and traditional. *Journal of Community and Applied Social Psychology*. [referencia ilustrativa del uso aplicado del PVQ-RR; útil como ejemplo en estudios de segmentación].

Frontiers in Psychology. (2018). Relationships Between Personal Values and Leadership Behaviors in Basketball Coaches. *Frontiers in Psychology*. https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2018.01661/full [evidencia de validez predictiva PVQ-RR sobre liderazgo, citada por Gemini].

---

## APÉNDICE A — Mapa de aportes consolidados desde Gemini

| # | Aporte | Sección donde se integró | Valor agregado | Verificación recomendada |
|---|---|---|---|---|
| A1 | Rationale teórico del paso de 10 a 19 valores (heterogeneidad interna, alfas subóptimos en modelo de 10) | §0 (Resumen ejecutivo, nota teórica) | Justifica narrativamente la migración PVQ-57-R → PVQ-RR en el stack DescubreMe; útil para copy interno y documentación arquitectónica. | Schwartz et al. (2012) ya está en referencias; el razonamiento es estándar en la literatura. **Verificación: paper primario disponible.** |
| A2 | Eliminación de ítems double-barreled vs PVQ-40 | §1.1 (nota técnica de diseño) | Argumento técnico adicional para mantener PVQ-RR sobre predecesores. | Schwartz y Cieciuch (2022) lo menciona en su introducción. **Verificable.** |
| A3 | Diseño del método de "Retratos" (sustitución de términos abstractos del SVS por narrativas proyectivas) | §1.3 (estructura del banco — fila "Diseño metodológico") | Contexto pedagógico sobre por qué el PVQ-RR reduce sesgo de deseabilidad social; útil para copy de UX y para responder dudas de usuarios sobre validez. | Schwartz (2012, Overview) lo describe explícitamente. **Verificable.** |
| A4 | Disponibilidad de versiones de género neutral (they/them) en literatura reciente | §1.3 (estructura del banco — fila "Versiones por género") | Insumo para roadmap de inclusión; campo `gender_variant: 'neutral'` en el plugin si DescubreMe quiere atender usuarios no binarios. | Gemini cita la práctica de forma genérica sin referencia primaria específica. **Verificar paper que documente la versión neutral antes de implementarla.** |
| A5 | Ejemplos de ítems en español validado para los 19 valores (tabla 5.B en Gemini) | §2 (tabla "Ejemplos de ítems en español validados") | Referencia léxica de partida para el piloto cognitivo y para conversaciones con el equipo de UX. **NO sustituye la traducción autorizada por Schwartz para Colombia 2022 (OSF).** | Las cadenas textuales provienen de citas mezcladas (Costa Rica, España, Ecuador) en la revisión de Gemini. **Antes de cargar en producción, verificar cada cita literal contra el archivo OSF de la versión Colombia.** |
| A6 | Protocolo Schwartz de traducción y retro-traducción ciega (3 iteraciones) | §2.1 (nota técnica) | Refuerza el cronograma de licencia y costo (Sección 6.5): 4-8 semanas para back-translation iterativa. | Schwartz (2021) lo describe en el repositorio ORPC. **Verificable.** |
| A7 | Evidencia psicométrica global agregada del estudio multinacional (N=53.472, 49 grupos, 32 idiomas, 15/19 valores validados de forma irrefutable) | §3.1 (nota psicométrica) | Soporte cuantitativo para defender la elección del PVQ-RR en comunicación con stakeholders B2B-A. | Schwartz y Cieciuch (2022) es la fuente primaria. **Verificable.** |
| A8 | Tabla de reglas diferenciales MRAT por paradigma analítico (correlaciones, ANOVA, regresión, CFA/MDS) | §4 (tabla post-procedimiento MRAT) | Guía operativa para el equipo psicométrico al desarrollar el módulo de Scoring Engine y los análisis de validación del baremo colombiano. | Schwartz, manual "Coding and analyzing PVQ-RR data" (ResearchGate 308166496). **Verificable.** |
| A9 | Prescripción de MDS sobre EFA para validar estructura cuasi-circumpleja | §4 (nota técnica) | Decisión metodológica crítica para la Fase B del roadmap de baremo colombiano (Sección 3.3): usar MDS, no EFA. | Schwartz (2021) lo menciona explícitamente. **Verificable.** |
| A10 | Protocolos de data cleaning: flat-lining (>28/57 ítems idénticos) e imputación EM para missing data | §4 (nota técnica) | Especificación operativa para el Scoring Engine: dos filtros adicionales antes de calcular MRAT. | Convención metodológica documentada en literatura ESS y manuales del PVQ. **Umbral 28/57 es extrapolación; el criterio histórico es 16/21. Verificar en piloto.** |
| A11 | Tres dominios de validez predictiva documentados (prosocialidad, ambientalismo, liderazgo) | §3.4 (extensiones analíticas) | Ideas de feature para roadmap v2.0+: cruzar PVQ-RR con módulos B2B-A de coaching y desarrollo organizacional. | Referencias secundarias en Gemini (Frontiers 2018, estudios deportivos). **Validar paper primario antes de usar en copy de producto.** |

**Lectura general del Apéndice A:** los 11 aportes integrados desde Gemini son de naturaleza teórico-metodológica y complementan el rigor académico del Pack sin alterar ninguna decisión operativa de Claude (licencia, ítems, baremos, textos al usuario, disclaimers, piloto cognitivo, plan B). Refuerzan el contexto psicométrico, agregan protocolos de data cleaning concretos para el Scoring Engine (A8–A10) y abren ideas para roadmap v2.0+ (A4, A11). Los aportes A4, A5 y A11 requieren verificación adicional en fuentes primarias antes de uso en producción o en comunicación oficial con Schwartz.

---

## APÉNDICE B — Notas de consolidación (metodología)

**Origen del documento.** Este consolidado combina dos investigaciones independientes producidas en mayo 2026:

1. `Prompt_24_PVQ-RR_IAR.Claude.md` — Implementation Acquisition Pack completo de 10 secciones siguiendo el prompt v1.0. Cumplimiento: 100% de los requisitos del brief (10/10 secciones, marcadores Hecho/Inferencia/Opinión profesional aplicados, ítems sensibles identificados, plan B operativo TwIVI, costo de licencia con escenarios, 12 referencias APA 7).
2. `Prompt_24_PVQ-RR_IAR.Gemini.md` — Revisión académica narrativa estilo white paper de ~7.000 palabras sobre la teoría refinada de Schwartz, la arquitectura del PVQ-RR y los protocolos analíticos. **No siguió la estructura de 10 secciones del prompt v1.0.** Sin §0 portada como tal, sin §5 textos al usuario, sin §6 plan de licencia, sin §7 disclaimers ni líneas de ayuda, sin §8 piloto cognitivo, sin §9 gaps explícitos. Aportes principales: contexto teórico bottom-up del modelo refinado, protocolos analíticos MRAT con tabla de reglas por paradigma, prescripción de MDS sobre EFA, ejemplos de ítems en español validado, evidencia psicométrica global agregada, validez predictiva en tres dominios.

**Criterio de consolidación aplicado.**
- **Estructura:** se preserva íntegra la del Pack de Claude (10 secciones + Apéndices A y B nuevos).
- **Contenido operativo (ítems, baremos, textos al usuario, email de licencia, disclaimers, piloto):** se mantiene el de Claude porque Gemini no lo produjo.
- **Aportes académicos y metodológicos de Gemini:** se integran SOLO cuando aportan información nueva verificable y útil para producto. Cada aporte se marca con `[Aporte Gemini]` en el lugar donde aparece, y se traza en el Apéndice A con nivel de verificación.
- **Discrepancias entre Claude y Gemini:** no se encontraron discrepancias factuales sustanciales. El mapeo Item # → Valor refinado (Sección 4) coincide 100% entre ambas fuentes, lo cual es validación cruzada útil. Las cifras psicométricas (N=53.472, 49 grupos, 19 valores, 4 HOV, Schwartz y Cieciuch 2022) coinciden donde ambas fuentes las tocan.

**Limitaciones del consolidado.**
- Los aportes A4 (versiones de género neutral), A5 (cadenas textuales en español) y A11 (validez predictiva en tres dominios) deben verificarse en fuentes primarias antes de uso en producción o de comunicación oficial con Schwartz.
- El umbral de flat-lining de 28/57 ítems (A10) es una extrapolación lógica del criterio histórico 16/21 del PVQ-21; debe validarse empíricamente en el piloto cuantitativo Fase B (Sección 3.3).
- El aporte A2 (eliminación de double-barreled vs PVQ-40) está implícitamente en Schwartz y Cieciuch (2022) pero merece cita literal exacta si se usa en MoU con Schwartz.

---

*Fin del Implementation Acquisition Pack v1.0 — PVQ-RR — CONSOLIDADO · DescubreMe · LATAM/Colombia · Mayo 2026*
