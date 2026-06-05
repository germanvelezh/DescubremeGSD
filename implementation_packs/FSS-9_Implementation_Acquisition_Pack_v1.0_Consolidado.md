# FSS-9 Implementation Acquisition Pack v1.0 — DescubreMe — CONSOLIDADO

> **Nota metodológica.** Este documento consolida dos investigaciones independientes ejecutadas sobre el mismo prompt v1.0 (Claude y Gemini). Diagnóstico de cumplimiento: **Claude = OK** (10/10 secciones, con marcadores Hecho/Inferencia/Opinión profesional y anti-alucinación correctamente aplicados); **Gemini = OK** (10/10 secciones, pero con referencias por número de nota a pie y aportes cuantitativos que exigen verificación). Método aplicado: **Claude como base canónica (≈85%) + Gemini complementa (≈15%)**. Los bloques originados o reforzados por Gemini se marcan con `[Aporte Gemini]` en línea. El mapa completo de aportes consolidados está en el **Apéndice A**. Las notas de consolidación están en el **Apéndice B**. Cuando un dato cuantitativo procede de Gemini pero no fue verificado independientemente, se conserva el marcador `[sin fuente verificada]` o `[verificar antes de uso]`.

## Tabla de cobertura

| Sección | Claude | Gemini | Decisión |
|---|---|---|---|
| §0 Portada y metadatos | OK | OK | Base Claude (atribución 2008 + hallazgo correctivo + status bloqueadores). |
| §1 Acquisition plan banco de ítems | OK | OK | Base Claude. Aporte Gemini: ejemplos literales en inglés extraídos de papers de acceso abierto (con verificación pendiente). |
| §2 Adaptaciones al español | OK | OK | Base Claude (tabla con DOIs verificables). Aporte Gemini: matización sobre EFIM de Moral-Bofill como instrumento derivado de 6 dimensiones, no compatible con la estructura unifactorial DescubreMe. |
| §3 Baremos publicados | OK (con `[sin fuente verificada]` explícitos) | PARCIAL (cifras de Pedroli 2018 e Wang 2022 sin N declarado) | Base Claude. Aporte Gemini: medias cuantitativas de Pedroli, Wang y Lora-Ariza con marcador `[verificar antes de uso]`. |
| §4 Ítems inversos | OK | OK | Base Claude. Aporte Gemini: mitigación de sesgo de aquiescencia mediante interleaving con ítems inversos de WOLF/Matrix 2. |
| §5 Textos de interpretación es-CO | OK (≤80 palabras, tuteo cordial, no clínico) | OK | Base Claude. Se conservan las tres bandas de Claude por consistencia con el resto del stack v2.0. Versiones Gemini disponibles como alternativas en Apéndice A. |
| §6 License acquisition plan | OK (precios públicos Mind Garden, email completo, Plan B detallado) | PARCIAL (precio único $55 sin tabla de descuento volumétrico; email más genérico) | Base Claude. Aporte Gemini: rotulación del Plan B como "DFI-9 (DescubreMe Flow Index)" + protocolo Aiken-V con 3 jueces expertos colombianos. |
| §7 Disclaimers y NFR-28 | OK (con análisis de riesgo residual depresión/burnout y líneas Colombia verificadas) | OK | Base Claude. Aporte Gemini: argumento explícito de que las dimensiones 7 ("pérdida de autoconciencia") y 8 ("transformación del tiempo") pueden ser leídas como síntomas disociativos por usuarios legos — refuerza la necesidad de NFR-28. |
| §8 Piloto cognitivo Colombia | OK (n=12–15, estratificación rica, probes Willis 2005) | OK (n=15–20, prototipo Figma) | Base Claude. Aporte Gemini: validación UI mobile (slider vs. radio buttons) como punto explícito del protocolo. |
| §9 Gaps y preguntas abiertas | OK (5 gaps con plan) | OK (4 gaps con plan) | Base Claude. Aportes Gemini integrados: GAP de redundancia FSS-9 ↔ WOLF (Block A vs. Matrix 2) y GAP de UX state-vs-trait (campo de texto abierto de anclaje cognitivo). |
| §10 Referencias APA 7 | OK (18 entradas con DOI) | OK (12 entradas con DOI, otras solo URL) | Base Claude (referencias canónicas), enriquecida con Pedroli 2018, Wang 2022 y Lora-Ariza 2024 aportadas por Gemini. |

---

## SECCIÓN 0 — PORTADA Y METADATOS

- **Instrumento (nombre canónico):** Short Flow State Scale (S FSS-2) — alias de uso interno en DescubreMe: **FSS-9**.
- **Autoría correcta (forma corta de 9 ítems):** Jackson, S. A., Martin, A. J., & Eklund, R. C. (2008). *Long and short measures of flow: The construct validity of the FSS-2, DFS-2, and new brief counterparts*. Journal of Sport & Exercise Psychology, 30(5), 561–587. **DOI: 10.1123/jsep.30.5.561**.
- **Instrumento parental (36 ítems):** Jackson, S. A., & Marsh, H. W. (1996). *Development and validation of a scale to measure optimal experience: The Flow State Scale*. Journal of Sport & Exercise Psychology, 18(1), 17–35. **DOI: 10.1123/jsep.18.1.17**.
- **Versión revisada parental (36 ítems):** Jackson, S. A., & Eklund, R. C. (2002). FSS-2 / DFS-2.
- **Versión a implementar:** S FSS-2 (9 ítems, un ítem por dimensión, score global promediado).
- **Constructo evaluado:** Estado de flujo transitorio (state flow), no rasgo disposicional. Evalúa la experiencia inmersiva momentánea durante un evento, tarea o actividad específica e inmediatamente anterior a la evaluación. [Aporte Gemini: contraste explícito con DFS-2 disposicional]
- **Escala de respuesta:** Likert 1–5 (1 = Strongly disagree, 5 = Strongly agree).
- **Tiempo estimado de aplicación:** 2–3 minutos. [Aporte Gemini]
- **Idioma original:** inglés (Australia).
- **Titular del copyright:** Susan A. Jackson (© 2010); publicado y licenciado por **Mind Garden, Inc.**, Menlo Park, CA, EE. UU.
- **Productos destino DescubreMe:** B2C Paid (USD 19) + B2B-A; refactor a arquitectura test-as-plugin sobre stack v2.0 ya productivo. Rol estructural: complemento condicional ("Matrix 2") del WOLF (Block A) y del ecosistema Ikigai Premium. [Aporte Gemini: rol Matrix 2]

**Hallazgo correctivo crítico (atribución del brief).** El brief interno DescubreMe atribuye correctamente la autoría de la forma corta a Jackson, Martin y Eklund (2008). Se confirma: (a) la forma corta es de 2008 — *no* 1996 (1996 corresponde a la versión de 36 ítems con Marsh); (b) son 9 ítems en clave directa, uno por dimensión de Csikszentmihalyi; (c) Mind Garden Inc. es el editor licenciatario, no autor; (d) la dirección física de Mind Garden es Menlo Park, CA, no "MindGarden" sin guion. Sin errores adicionales detectados en la nomenclatura del brief.

**Resumen ejecutivo.** La forma corta del Flow State Scale tiene autoría correcta atribuida a Jackson, Martin y Eklund (2008) y es propiedad intelectual de Mind Garden Inc. Los 9 ítems literales **no están publicados en fuente abierta**: cada paper que los aplica reporta haber adquirido la licencia comercial. Existen tres adaptaciones útiles en español del FSS/FSS-2 (García-Calvo et al., 2008 — España, deporte; Calero & Injoque-Ricle, 2013 — Argentina, adolescentes; Moral-Bofill et al., 2020 — España, músicos), pero **ninguna validación colombiana de población general adulta**. Los Términos de Servicio de Mind Garden prohíben expresamente el uso comercial sin permiso escrito y la entrega de feedback individual al participante bajo la licencia estándar de investigación, lo que sitúa el riesgo legal en **MEDIO-ALTO** para un producto freemium B2C.

**Status de bloqueadores:**
- **Licencia:** BLOCKED — el uso B2C requiere acuerdo comercial escrito con Mind Garden; la licencia "research only" estándar (verbatim: *"This research license is for data collection only and not for providing individual feedback to survey participants"*) prohíbe feedback al usuario.
- **Banco de ítems:** BLOCKED para reproducción literal — los 9 ítems son IP de Mind Garden y solo se entregan tras compra de licencia.
- **Baremos:** PARTIAL — alfa y estructura factorial están publicados; medias y desviaciones para población general LATAM no existen.
- **Adaptación es-CO:** BLOCKED — sin validación colombiana publicada; se requiere piloto cognitivo + estudio psicométrico propio.

---

## SECCIÓN 1 — ACQUISITION PLAN DEL BANCO DE ÍTEMS

### 1.1 Disponibilidad pública

**Hecho:** Los 9 ítems literales del FSS-9 / S FSS-2 **no están reproducidos en ninguna fuente abierta verificable**. El artículo seminal de Jackson, Martin & Eklund (2008) está alojado tras paywall en Human Kinetics (DOI 10.1123/jsep.30.5.561), y el PDF abierto en ResearchGate/Semantic Scholar no incluye el anexo con los ítems literales; cuando aparecen ejemplos parciales, lo hacen como "sample items" preautorizados para citación (uno por dimensión). Validaciones posteriores — Polonia (Józefowicz, Kowalczyk-Grębska & Brzezicka, 2022, *Frontiers in Psychology* 13:818036, DOI 10.3389/fpsyg.2022.818036, N=360 adultos, M edad=33.46 — valida la FSS-2 de 36 ítems), Brasil (Bittencourt et al., 2024) y Turquía (Çağlar, Sarı, Aşçı, Eklund & Jackson, 2020, *Studia Psychologica* 62(3), 179–197, N=423 atletas turcos validando la S FSS-2 de 9 ítems) — reportan explícitamente haber adquirido la licencia de Mind Garden y citan que la guía oficial es "The Flow Scales Instrument and Scoring Guide" (Jackson, Eklund & Martin, 2010, Mind Garden, Inc.).

**Inferencia:** Reproducir los 9 ítems literales en el código fuente de DescubreMe sin licencia escrita constituye infracción de copyright bajo los Términos de Servicio de Mind Garden.

### 1.2 Banco oficial vs. adaptaciones

**Banco oficial (canónico):**
- Distribuidor único: Mind Garden, Inc. (https://www.mindgarden.com/100-flow-scales).
- Modalidades:
  - *Transform Survey Hosting: S FSS-2* (data license, online en plataforma Mind Garden).
  - *License to Administer* (PDF para retipear/reproducir en sistema propio o papel-lápiz).
  - *Flow Scales Manual* (PDF, 86 páginas, USD 50).

**Adaptación al español más cercana al banco oficial:**
- Calero & Injoque-Ricle (2013) — "Inventario Breve de Experiencias Óptimas" (9 ítems, retrotraducción de Jackson et al., 2008). Argentina, adolescentes. Reportan haber pedido autorización a la autora original. α = 0.864.
- Moral-Bofill et al. (2020) — FSS-2 (36 ítems) en músicos españoles, traducción con permiso de Mind Garden. No equivale a la forma corta. [Aporte Gemini: identifica el instrumento como EFIM — "Estado de Flujo para Intérpretes Musicales" — derivado del FSS-2 pero con estructura de 6 factores empíricos, no 9, por lo cual es estructuralmente incompatible con la arquitectura unifactorial v2.0 de DescubreMe.]
- García-Calvo et al. (2008) — FSS original 36 ítems en deportistas españoles.

### 1.3 Estructura del banco (canónica, sin reproducir ítems literales)

| # | Dimensión Csikszentmihalyi | Anclaje conceptual del ítem | Clave |
|---|---|---|---|
| 1 | Challenge–skill balance | Percepción de equiparación entre desafío y habilidad | Directa |
| 2 | Action–awareness merging | Automaticidad / acción sin esfuerzo | Directa |
| 3 | Clear goals | Claridad sobre qué se busca lograr | Directa |
| 4 | Unambiguous feedback | Retroalimentación legible durante la actividad | Directa |
| 5 | Concentration on task at hand | Foco atencional total | Directa |
| 6 | Sense of control | Percepción de control sobre la ejecución | Directa |
| 7 | Loss of self-consciousness | Disminución del auto-monitoreo evaluativo | Directa |
| 8 | Transformation of time | Distorsión subjetiva del tiempo | Directa |
| 9 | Autotelic experience | Experiencia intrínsecamente gratificante | Directa |

Score global: media aritmética de los 9 ítems (rango 1.00–5.00).

### 1.4 Ejemplos literales en inglés circulando en literatura secundaria abierta — [Aporte Gemini, verificación pendiente antes de uso]

**Inferencia (DescubreMe):** Los siguientes textos en inglés aparecen citados como "sample items" en metodologías de papers de acceso abierto. **No deben ser tomados como banco oficial ni reescritos en español sin licencia de Mind Garden.** Se conservan únicamente como evidencia que orienta el diseño del piloto cognitivo y la negociación con Mind Garden (permite confirmar que la traducción interna respeta la semántica original).

| Dimensión | Texto reportado en literatura abierta (inglés) | Fuente citante (verificar trazabilidad antes de uso) |
|---|---|---|
| Challenge–skill balance | "I feel I am competent enough to meet the high demands of the scenario." | Wang et al. (2022); Lora-Ariza et al. (2024) — `[verificar antes de uso]` |
| Action–awareness merging | "I act spontaneously and automatically, without thinking." | Wang et al. (2022) — `[verificar antes de uso]` |
| Clear goals | "I know exactly what I want to do." | Wang et al. (2022) — `[verificar antes de uso]` |
| Unambiguous feedback | "I know how I am performing." | Lora-Ariza et al. (2024) — `[verificar antes de uso]` |
| Concentration on task | "I am completely focused on the task at hand." | Jackson et al. (2008), cita secundaria — `[verificar antes de uso]` |
| Sense of control | "I have a sense of complete control over what I am doing." | Lora-Ariza et al. (2024) — `[verificar antes de uso]` |

**Recomendación:** No reproducir estos textos en código fuente sin confirmar con Mind Garden que constituyen "sample items" autorizados. Si lo son, pueden anclar la conversación de traducción; si no, su circulación en papers secundarios no extingue el copyright.

### 1.5 Recomendación de URL/contacto

- **URL del producto (Transform):** https://www.mindgarden.com/flow-scales/462-flow-sfss2-transform-survey-hosting.html.
- **URL del manual:** https://www.mindgarden.com/flow-scales/467-flow-manual.html.
- **Contacto comercial:** info@mindgarden.com (telefónico: +1 650 322 6300; dirección: P.O. Box 7086, Menlo Park, CA 94026, EE. UU.).
- **Acción:** abrir cotización formal indicando "commercial B2C SaaS use, Colombia/LATAM, Spanish translation needed, feedback to individual user required" — ver borrador en §6.4.

---

## SECCIÓN 2 — ADAPTACIONES AL ESPAÑOL

| País | Autores | Año | Referencia / DOI / URL | N muestra | Características | ¿PDF abierto? |
|---|---|---|---|---|---|---|
| España | García-Calvo, T., Jiménez, R., Santos-Rosa, F. J., Reina, R., & Cervelló, E. | 2008 | *Spanish Journal of Psychology*, 11(2), 660–669. DOI: 10.1017/S1138741600004662 | 2.036 deportistas | FSS original 36 ítems (Jackson & Marsh, 1996); estructura jerárquica (factor global + 9 facetas) confirmada | Resumen abierto; PDF detrás de paywall Cambridge |
| Argentina | Calero, A. D., & Injoque-Ricle, I. | 2013 | *Revista Evaluar*, 13(1), 40–55. DOI: 10.35670/1667-4545.v13.n1.6796 | 211 adolescentes (M = 14.26 años) escolarizados, CABA | "Inventario Breve de Experiencias Óptimas" — 9 ítems, retrotraducción del S FSS-2; α = 0.864 | Abstract abierto; PDF acceso libre con anti-scraping |
| España | Moral-Bofill, L., López de la Llave, A., Pérez-Llantada, M. C., & Holgado-Tello, F. P. | 2020 | *PLOS ONE*, 15(4): e0231054. DOI: 10.1371/journal.pone.0231054 (Corrección: 10.1371/journal.pone.0233006) | 486 músicos | FSS-2 36 ítems → derivado EFIM con 6 factores empíricos. α por dimensión .81–.94; ω .86–.97. **Estructuralmente incompatible con FSS-9 unifactorial.** [Aporte Gemini: caracterización EFIM] | PDF open access |
| Brasil (pt-BR) | Bittencourt, I., Freires, L., et al. | 2024 | *PLOS ONE* (FSS-BR-S, forma corta brasileña) — PMC10833536 | 396 participantes | Forma corta 9 ítems, contexto general (no deportivo); CFI = 0.99, TLI = 0.98, RMSEA = 0.04 | PDF open access |
| Argentina | Jordan Muiños, F. M., & Simkin, H. | 2023 | *Revista Argentina de Ciencias del Comportamiento*, 15(3), 72–81 | 749 videojugadores (18–59 años) | **ATENCIÓN: NO es el FSS-9 de Jackson.** Es el Flow Short Scale de Rheinberg/Vollmeyer/Engeser (2003), 10 ítems. ω total = .763. | PDF open access (Dialnet) |
| Colombia | — | — | **NO se identifica validación publicada del FSS-9 ni de la FSS-2 en población colombiana general adulta** | — | — | — |

### 2.1 Recomendación de base léxica para es-CO

**Opinión profesional:** Tomar como base léxica la versión de **Calero & Injoque-Ricle (2013)** por tres razones: (a) es la única adaptación al español de la **misma instancia psicométrica** (S FSS-2 de 9 ítems, Jackson et al. 2008); (b) ya generaliza el referente más allá del deporte ("la actividad evaluada"); (c) usa rioplatense pero permite localización mínima a Colombia. Complementar con revisión cruzada del léxico técnico de García-Calvo et al. (2008) para los anclajes de "desafío/habilidad" y "metas claras".

### 2.2 Modificaciones léxicas anticipadas para Colombia

- Reemplazar "vos/tenés" rioplatenses por "tú/tienes" cordial colombiano.
- "Disfrute" se mantiene (común en es-CO).
- "Sentí que tenía el control" (Argentina, pretérito perfecto simple) se conserva; Colombia usa ambas formas, pero el perfecto compuesto ("he sentido") es más extendido en escritura formal. Estandarizar en pretérito simple por brevedad.
- "Las cosas parecían suceder automáticamente" — verificar comprensión de "automáticamente" en muestra de baja escolaridad (riesgo cognitivo bajo).
- "Transformación del tiempo" suele requerir paráfrasis: "el tiempo se sintió distinto" / "no me di cuenta del tiempo".
- Evitar "consciencia de sí mismo" (calco); preferir "estaba pendiente de mí mismo / de lo que pensaban de mí".
- [Aporte Gemini] Abstracción del contexto de ejecución: purgar residuos de lenguaje de "prueba" o "competición" (herencia deportiva) y universalizar hacia "Mientras realizaba la actividad..." / "Durante esta tarea..." / "Al ejecutar mi labor..." — alineado con cobertura Ikigai/laboral del producto.
- [Aporte Gemini] Para el ítem de retroalimentación, sustituir la traducción literal "retroalimentación sin ambigüedades" por una formulación más orgánica como "tuve claro en todo momento qué tan bien lo estaba haciendo".

---

## SECCIÓN 3 — BAREMOS PUBLICADOS

| País / Contexto | Fuente APA 7 + DOI | N | M (total) | DT (total) | Percentiles | Notas |
|---|---|---|---|---|---|---|
| Australia (físico) | Jackson, S. A., Martin, A. J., & Eklund, R. C. (2008). *Journal of Sport & Exercise Psychology*, 30(5), 561–587. DOI: 10.1123/jsep.30.5.561 | 865 (estado) / 692 (disposicional) | [sin fuente verificada — Tabla del original tras paywall] | [sin fuente verificada] | No publicados como tabla normativa | Confiabilidad: α ≈ .81 para la forma corta de 9 ítems en citas secundarias verificables. |
| Argentina | Calero, A. D., & Injoque-Ricle, I. (2013). *Revista Evaluar*, 13(1). DOI: 10.35670/1667-4545.v13.n1.6796 | 211 adolescentes | [sin fuente verificada para M/DT total] | [sin fuente verificada] | No publicados | α = 0.864 (confirmado vía Calero, 2016, *Psicoperspectivas* 15(2), 102–109). Correlaciones ítem-total ≥ 0.44. Replicación n=300: α = 0.81. |
| Turquía | Çağlar et al. (2020). *Studia Psychologica*, 62(3), 179–197 | 423 atletas | [sin fuente verificada] | [sin fuente verificada] | No publicados | α = .82 para S FSS-2; α = .77 para S DFS-2 |
| España (música, 36 ítems) | Moral-Bofill, L., et al. (2020). *PLOS ONE*, 15(4): e0231054. DOI: 10.1371/journal.pone.0231054 | 486 músicos | No reportado como puntaje global único (estructura de 6 dimensiones) | — | No publicados | α subdimensiones .81–.94; ω .86–.97. **No es FSS-9.** |
| España (deporte, 36 ítems) | García-Calvo, T., et al. (2008). *Spanish Journal of Psychology*, 11(2), 660–669. DOI: 10.1017/S1138741600004662 | 2.036 deportistas | [sin fuente verificada para M/DT global] | [sin fuente verificada] | No publicados | Estructura jerárquica (factor global + 9 facetas) confirmada por CFA. **No es FSS-9.** |
| Brasil (general, 9 ítems) | Bittencourt et al. (2024). *PLOS ONE*. PMC10833536 | 396 | [sin fuente verificada] | [sin fuente verificada] | No publicados | Reporta buena consistencia interna, CFI = .99 |
| Italia (VR — Positive Bike, ancianos) | Pedroli, E., et al. (2018). *Sensors*, 18(7), 2343. DOI: 10.3390/s18072343 | [sin fuente verificada para N exacto] | **4.33** (puntaje global, escala 1–5) | **0.84** | No publicados | [Aporte Gemini — `verificar antes de uso`]: cifra reportada como evidencia de techo en condiciones inmersivas de RV; no generalizable a uso no-VR. |
| China (Diabolo + sonido, ancianos) | Wang, X., et al. (2022). *Frontiers in Public Health*, 10. PMC9265835. DOI: 10.3389/fpubh.2022.883713 | [sin fuente verificada para N exacto] | Por dimensión: 3.63 (reto-habilidad) / 3.13 (fusión acción-conciencia) | 0.81 / 1.31 | No publicados | [Aporte Gemini — `verificar antes de uso`]: ilustra variabilidad por estímulo y por dimensión. |
| China (Diabolo silente, ancianos) | Wang, X., et al. (2022). Idem. | [sin fuente verificada] | 3.26 / 3.03 | 0.85 / 1.20 | No publicados | [Aporte Gemini — `verificar antes de uso`] |
| Contexto experimental (Tetris) | Lora-Ariza, D. S., et al. (2024). *Preprints* 202401.0933 | [sin fuente verificada] | **35.93** (suma de 9 ítems, no promedio) | 4.26 | No publicados | [Aporte Gemini — `verificar antes de uso`]: nota epistemológica — usa puntaje sumado, no promediado; equivalente aproximado en escala 1–5 ≈ 3.99. |
| Colombia | — | — | — | — | — | **Sin baremos publicados.** |

### 3.1 Recomendación de baremo provisional LATAM

**Opinión profesional:** No publicar baremos numéricos a los usuarios B2C **hasta** contar con N ≥ 300 colombianos. En el interim:
- Usar bandas conceptuales (BAJO ≤ p16 / MEDIO p17–p83 / ALTO ≥ p84) calibradas internamente sobre los primeros N = 200–300 registros de DescubreMe usando bootstrapping no paramétrico.
- Mostrar al usuario el score crudo (1.00–5.00) y la banda **sin** referencia normativa explícita ("estás en un momento de flow alto/medio/bajo respecto a tu propia actividad reportada"), evitando comparación poblacional.

### 3.2 Roadmap para baremos colombianos propios

1. Fase 0 (mes 0–1): Definir constructo de actividad referente ("una actividad reciente que valoras"). Aprobación ética.
2. Fase 1 (mes 1–3): Piloto cognitivo (n = 12–15) — §8.
3. Fase 2 (mes 3–6): Estudio psicométrico con N ≥ 400 adultos colombianos, balance regional Bogotá/Medellín/Cali/Barranquilla, edades 18–65. CFA del modelo unidimensional + invarianza por sexo y edad.
4. Fase 3 (mes 6–9): Construcción de percentiles, definición de bandas BAJO/MEDIO/ALTO con criterios externos (correlación con WOLF, satisfacción vital).
5. Fase 4 (mes 9–12): Refresco anual a N ≥ 1.000 usando datos de producción anonimizados (depende del clausulado del acuerdo Mind Garden).

[Aporte Gemini — estrategia alternativa de cobertura temprana]: el roadmap puede iniciar en **Fase 1 con bandas criterion-referenced** (BAJO 1.00–2.49 / MEDIO 2.50–3.99 / ALTO 4.00–5.00) basadas en la media aritmética cruda, evitando reportar percentiles hasta acumular N ≥ 1.000 colombianos validados ("data harvesting silencioso"). Mantener marcadores `[sin fuente verificada]` en el dashboard interno hasta que el data science department ejecute la fase 3.

---

## SECCIÓN 4 — ÍTEMS Y CLAVES (descripción estructural, sin reproducción literal)

| Ítem # | Dimensión / Faceta | Clave | Score reverso | Notas |
|---|---|---|---|---|
| 1 | Challenge–skill balance | Directa | No | Ítem evalúa equilibrio entre dificultad y capacidad |
| 2 | Action–awareness merging | Directa | No | Acción sin esfuerzo consciente |
| 3 | Clear goals | Directa | No | Claridad de objetivo |
| 4 | Unambiguous feedback | Directa | No | Retroalimentación legible |
| 5 | Concentration on task | Directa | No | Foco completo |
| 6 | Sense of control | Directa | No | Control percibido |
| 7 | Loss of self-consciousness | Directa | No | Reducción de auto-evaluación. **Pese a que el rótulo conceptual sugiere "pérdida", el ítem afirma positivamente la inmersión liberadora del ego.** [Aporte Gemini] |
| 8 | Transformation of time | Directa | No | Distorsión temporal. Factor con mayor volatilidad transcultural; ver §9 (gap específico). |
| 9 | Autotelic experience | Directa | No | Experiencia intrínsecamente gratificante |

**Confirmado:** El FSS-9 **no tiene ítems inversos**. Los 9 ítems se redactan en clave directa y se promedian para producir un score global único (rango 1.00–5.00). Esto es consistente con Jackson, Martin & Eklund (2008) y con la replicación argentina (Calero & Injoque-Ricle, 2013).

### 4.1 Mitigación del sesgo de aquiescencia — [Aporte Gemini]

La uniformidad direccional de los 9 ítems introduce vulnerabilidad al patrón de respuesta mecanizada (acquiescence bias). El motor de frontend de DescubreMe deberá **intercalar los 9 ítems directos del FSS-9 con reactivos inversos procedentes de otros instrumentos de la Matrix 2** (por ejemplo, ítems inversos del WOLF), forzando al usuario a procesar el contenido semántico de cada afirmación de manera consciente. Esta mitigación debe documentarse en el motor scoring_engine de Supabase con un flag `interleave=true` aplicado a las baterías que incluyen FSS-9.

---

## SECCIÓN 5 — TEXTOS DE INTERPRETACIÓN AL USUARIO (es-CO)

**Dimensión global:** Estado de Flow.

**Descripción técnica interna (NO mostrada al usuario):** El FSS-9 mide la experiencia momentánea de flow al recordar una actividad específica reciente. Score global = media aritmética de los 9 ítems (rango 1.00–5.00). Bandas calibradas sobre percentiles de la muestra de calibración interna DescubreMe (provisional hasta baremo colombiano formal). Constructo no clínico, no predictivo individual.

### Banda BAJO (≤ percentil 16, score aproximado ≤ 2.6)

> Durante la actividad que recordaste, parece que la experiencia se sintió fragmentada: tal vez la atención se te dispersó, el tiempo se hizo largo o no sentiste que la actividad te enganchara del todo. Esto no dice nada sobre tu capacidad: muchas veces depende del momento, del cansancio o del contexto. ¿Qué tendría que cambiar de esa actividad para que te resultara más absorbente?

### Banda MEDIO (percentil 17–83, score aproximado 2.7–3.9)

> En la actividad que elegiste hubo momentos en los que te conectaste y otros en los que la atención se te fue. Es un estado común y útil: muestra que la actividad te interesa, pero todavía hay espacio para que las metas, la dificultad o la retroalimentación se ajusten mejor a ti. ¿Cuándo, en esa misma actividad, sentiste el mayor enganche?

### Banda ALTO (≥ percentil 84, score aproximado ≥ 4.0)

> Tu reporte sugiere que esa actividad te puso en un estado de mucha concentración y disfrute, donde el tiempo y la conciencia de ti mismo pasaron a segundo plano. Es una señal de buen ajuste entre lo que sabes hacer y lo que la actividad te pide. ¿Qué condiciones la hicieron posible? Identificarlas te ayuda a repetirlas.

> *Versiones alternativas redactadas por Gemini para los mismos tres niveles están disponibles en el Apéndice A.5. Mantienen el espíritu (tuteo cordial, ≤80 palabras, no clínico) pero con tono más narrativo; se reservan como respaldo en caso de A/B test en el módulo report_texts.*

---

## SECCIÓN 6 — LICENSE ACQUISITION PLAN

### 6.1 Titular y contacto

- **Titular del copyright:** Susan A. Jackson, PhD (Univ. of Queensland). Marcas y derechos de publicación: Mind Garden, Inc.
- **Distribuidor exclusivo:** Mind Garden, Inc. — 855 Oak Grove Avenue, Suite 215, Menlo Park, CA 94025, EE. UU. P.O. Box 7086, Menlo Park, CA 94026. Tel: +1 650 322 6300; Fax: +1 650 322 6398.
- **Email primario:** **info@mindgarden.com** (único canal documentado para licencias, cotizaciones y traducciones).

### 6.2 Práctica histórica de concesión

**Hecho:** Mind Garden licencia los Flow Scales en tres modalidades públicas (Transform Hosting, License to Administer, Manual). Precios verificados directamente en mindgarden.com (mayo 2026):

**Transform Survey Hosting: S FSS-2** (mínimo 20 unidades):

| Cantidad | Precio/unidad (USD) |
|---|---|
| 20 | 2.75 |
| 100 | 1.93 |
| 500 | 1.51 |
| 1 000 | 1.10 |
| 5 000 | 0.88 |
| 10 000 | 0.66 |
| 25 000 | 0.47 |
| 50 000 | 0.39 |

**License to Administer** (PDF reproducible en sistema propio, mínimo 50 unidades, idéntica curva de descuento desde 100): cubre las 8 variantes de los Flow Scales incluido S FSS-2. La traducción al español disponible en este paquete está marcada en Mind Garden como **"FSS-2-General & DFS-2-General Only"** — **no existe traducción al español del S FSS-2 en el archivo público de Mind Garden**, lo que confirma que DescubreMe deberá producir y validar la traducción propia.

**Hecho (crítico para B2C):** Los términos estándar incluyen (verbatim en mindgarden.com): (a) *"administer the Work for your own personal research purposes only and not for any commercial or third-party use"*; (b) *"This research license is for data collection only and not for providing individual feedback to survey participants"*; (c) *"The Work may not be made available via the open (e.g., public) web"*. El producto DescubreMe (freemium B2C que entrega feedback al usuario) **NO** cae dentro de la licencia estándar y **requiere acuerdo comercial separado**.

**Inferencia:** Mind Garden sí concede licencias comerciales B2C, pero por cotización individual ("custom commercial license"), no por shopping cart. Casos públicos similares sugieren que el proceso toma 4–10 semanas.

### 6.3 Pasos para solicitar

1. **Semana 0:** Enviar email inicial a info@mindgarden.com (texto §6.4). Adjuntar one-pager de DescubreMe (uso, audiencia, geografía, volumen anual estimado, modelo de feedback al usuario).
2. **Semana 1–2:** Conferencia inicial. Mind Garden tipicamente referirá a Sue Jackson para el clausulado de feedback al usuario.
3. **Semana 2–4:** Recepción de term sheet con: (a) royalty por administración o flat fee anual; (b) requisito de incluir copyright notice en cada página; (c) revisión de la traducción al español; (d) restricciones de redistribución de ítems en código fuente.
4. **Semana 4–8:** Negociación de la cláusula "feedback to individual user".
5. **Semana 8–10:** Firma. Pago inicial. Recepción de PDF del banco oficial + scoring guide + copyright notice template.
6. **Semana 10–12:** Implementación con copyright notice visible en página de test ("Flow State Scale © 2010 Susan A. Jackson. Published by Mind Garden, Inc. Used under license.").

[Aporte Gemini]: imponer **cronómetro operativo de 14 días calendario** entre el envío del email y la primera respuesta sustantiva. Si Mind Garden no responde con term sheet o cotización clara en ese plazo, escalar a Sue Jackson directamente; si en semana 6 no hay acuerdo viable, activar Plan B (§6.6).

### 6.4 Borrador de email inicial (inglés, copy-paste)

> **To:** info@mindgarden.com  
> **Subject:** Commercial license inquiry — Short Flow State Scale (S FSS-2) for B2C self-knowledge platform in Latin America
>
> Dear Mind Garden team,
>
> My name is [NAME], [TITLE] at DescubreMe (https://descubreme.[tld]), a freemium B2C web platform for adult self-knowledge based in Colombia and serving Latin American Spanish-speaking users. We provide educational, non-clinical, non-selection assessments with personalized formative feedback.
>
> We are interested in licensing the **Short Flow State Scale (S FSS-2, 9 items)** by Jackson, Martin, & Eklund (2008) for two products: (a) a paid B2C self-assessment priced at USD 19, and (b) a B2B-A offering for organizational well-being clients. We expect an initial annual volume of approximately [X] administrations, with growth in years 2–3.
>
> Key features of our intended use that require explicit authorization beyond your standard research license:
> 1. **Commercial use** (paid product / B2B contracts).
> 2. **Individual feedback to the test-taker** in the form of a banded score (low/medium/high) and an educational narrative; we do not paraphrase your items in the feedback.
> 3. **Spanish translation** for Colombian Spanish (we plan to commission a forward-back translation and a cognitive pilot, and we are happy to share the resulting linguistic validation with Mind Garden under your IP terms).
> 4. **Hosting on our own platform** (not Transform), so we would need the License to Administer route or a custom commercial agreement.
>
> Could you confirm:
> - Whether Mind Garden offers a commercial license that permits items 1–4 above, and what the pricing model is (per-administration royalty, flat annual fee, hybrid)?
> - Whether an existing Spanish translation of the S FSS-2 is in your archive, and under what conditions we may use or improve it?
> - Whether Dr. Susan Jackson would need to co-approve the feedback templates we plan to show to users (we can share drafts).
> - Estimated timeline from term sheet to executed agreement.
>
> Thank you. We are committed to honoring the integrity of the instrument and the copyright. Please find attached a one-page summary of our platform and intended use.
>
> Best regards,  
> [NAME], [TITLE]  
> DescubreMe  
> [EMAIL] · [PHONE]

### 6.5 Costo esperado y rangos

**Hecho (precio público Mind Garden, mayo 2026):** ver tabla §6.2. Manual de Flow Scales: USD 50 (PDF, 86 pp).

**Inferencia para B2C comercial:** Mind Garden no publica el premium comercial. Casos análogos (otros instrumentos de su catálogo en plataformas comerciales) sugieren un sobreprecio del **2x–4x sobre la tarifa research**, o un fee anual fijo entre USD 5.000–20.000 dependiendo del volumen anual. Para DescubreMe en escenario base 5.000 administraciones/año, el rango estimado es **USD 4.000–18.000/año** + manual + setup legal.

**Recomendación financiera:** Negociar fee anual fijo en lugar de royalty per-administration, para predecibilidad. Solicitar cap por administración para escalamiento.

### 6.6 Plan B — DescubreMe Flow Index (DFI-9), instrumento propio basado en literatura

Si Mind Garden no autoriza el uso B2C con feedback al usuario, o el costo excede USD 25.000/año, activar el desarrollo de un instrumento propietario denominado **DFI-9 — DescubreMe Flow Index**. [Nombre y framing aportado por Gemini]

1. **No reusar** los 9 ítems literales del S FSS-2.
2. Diseñar un **inventario propio** de 9 ítems, uno por dimensión de Csikszentmihalyi (1990), tomando como anclajes conceptuales: (a) las dimensiones publicadas en abierto en Jackson & Marsh (1996, abstract); (b) Csikszentmihalyi & Larson (1987), Experience Sampling Method; (c) las definiciones operacionales de Nakamura & Csikszentmihalyi (2002, *Handbook of Positive Psychology*).
3. [Aporte Gemini] Generar un **banco embrionario de 27 reactivos** (3 por dimensión teórica) redactados nativamente en es-CO, suficientemente distantes del material protegido para evitar infracción por parafraseo. Evaluación por comité de 3 psicólogos organizacionales colombianos mediante índice de **concordancia Aiken-V**; seleccionar los 9 ítems más robustos.
4. Realizar Delphi con 3 expertos hispanohablantes en flow.
5. Piloto cognitivo (n = 12) + estudio piloto cuantitativo (N = 200–300).
6. Estudio principal (N ≥ 400) con CFA, alfa, omega, MIC, validación convergente contra WOLF (Bakker, 2008, ya licenciado en stack).
7. Tiempo estimado: 4–6 meses. Costo estimado: USD 8.000–15.000 (panel de expertos + plataforma de muestreo + estadístico).

**Ventaja Plan B:** propiedad intelectual de DescubreMe; sin restricciones de feedback; sin regalías recurrentes.  
**Desventaja:** sacrificio del aval bibliográfico del S FSS-2; necesita re-validación periódica.

---

## SECCIÓN 7 — DISCLAIMERS Y MITIGACIONES

### 7.1 Disclaimer pre-test (≤ 100 palabras, es-CO)

> Este cuestionario te invita a reflexionar sobre una actividad reciente que valoras: puede ser laboral, deportiva, creativa o de ocio. No es una prueba de diagnóstico ni de selección, y no mide tu personalidad, tu salud mental ni tu rendimiento. Tus respuestas son tuyas y nadie te evaluará por ellas. Te tomará alrededor de 3 minutos. Al terminar, recibirás una lectura educativa de tu reporte que busca apoyarte en tu autoconocimiento, no etiquetarte. Si en cualquier momento te sientes incómodo, puedes detenerte y cerrar la ventana.

### 7.2 Ítems sensibles que activan NFR-28

**Análisis:** El FSS-9 es un constructo positivo (experiencia óptima) y no contiene ítems que indaguen ideación suicida, autolesión, síntomas clínicos, trauma, o conductas de riesgo. **Ningún ítem activa NFR-28 por contenido directo.**

**Riesgo residual (bajo, pero presente):**
- Un usuario en estado depresivo o con anhedonia puede experimentar un score uniformemente bajo y leerlo como confirmación de su malestar. Mitigación: la banda BAJO está redactada en clave situacional ("la actividad", "el momento"), no rasgo ("eres alguien sin flow").
- Un usuario con burnout puede reportar bajo flow en su actividad laboral; el cruce con WOLF en el stack puede amplificar la lectura negativa. Mitigación: en el reporte cruzado FSS-9 + WOLF, incluir mensaje normalizador.
- [Aporte Gemini] **Riesgo de malinterpretación fenomenológica:** las dimensiones 7 ("pérdida de autoconciencia") y 8 ("transformación del tiempo"), pese a ser experiencias positivas y normales en estados de inmersión, pueden ser leídas por usuarios legos como síntomas alarmantes de **disociación, despersonalización o amnesia temporal**. Mitigación: pop-up condicional opcional (§7.3 alterno abajo) y vocabulario reformulado en los reportes (evitar "perdiste la noción de ti mismo" → preferir "la actividad te absorbió por completo").

**Recomendación NFR-28:** clasificar el FSS-9 como **Tier 2 (bajo riesgo)** en el sistema de safeguards de DescubreMe; no se requiere disparo automático de contención salvo cruce con otros indicadores.

### 7.3 Mensaje de contención (≤ 120 palabras, es-CO) — solo si el usuario lo solicita o si el sistema detecta cruce con indicadores de malestar

> Si al responder este cuestionario notaste que muchas de las cosas que antes disfrutabas hoy se sienten apagadas o vacías, es una señal de que algo está pesando, y vale la pena escucharte. Esto no es un diagnóstico, pero tampoco es algo que tengas que cargar solo. Hablar con alguien ayuda. En Colombia puedes llamar gratis a la **Línea 106** desde cualquier celular o fijo, a la línea nacional **192 opción 4** del Ministerio de Salud, o escribir por WhatsApp al **300 754 8933**. La atención es 24/7, confidencial y gratuita. Y si conoces a alguien que también la esté pasando difícil, compártele esta información.

**Variante "fenomenológica" — pop-up condicional alterno (≤ 120 palabras)** [Aporte Gemini, integrado para riesgo de malinterpretación de dimensiones 7/8]:

> Experimentar que "el tiempo se detiene" o "perder la noción de lo que ocurre alrededor" mientras haces algo que te apasiona es una respuesta normal, positiva y saludable. Esto se llama experiencia de flujo y no tiene relación con problemas de salud mental ni con desconexión emocional. Si, por fuera de tus actividades, sientes con frecuencia vacío, desconexión persistente del entorno o emociones que te angustian, vale la pena explorar ese sentir con un profesional. Buscar orientación es un acto de cuidado, no de debilidad. En Colombia: Línea 106 o 192 opción 4.

### 7.4 Líneas de ayuda Colombia (verificadas mayo 2026)

- **Línea 106 — "El poder de ser escuchado"** (Bogotá, escalable nacional): marcar 106 desde cualquier teléfono. WhatsApp: 300 754 8933. Correo: linea106@saludcapital.gov.co. 24 horas, 365 días. Fuente: Secretaría Distrital de Salud de Bogotá.
- **Línea Nacional 106 — Ministerio de Salud y Protección Social:** atención teleorientada 24/7 en territorios sin línea local. Conmutador: (57) (60-1) 330 5043. Nacional: 01 8000 960 020.
- **Línea 123 Social — Bogotá.**
- **Línea 192 opción 4 — Orientación nacional en salud mental.**
- **Línea 141 — ICBF**, para niños, niñas y adolescentes, 24/7.
- **Medellín — Línea Amiga Saludable:** (604) 444 44 48; WhatsApp 300 723 1123.
- **Barranquilla — Línea de la Vida:** (5) 339 99 99.

### 7.5 Disclaimer post-test (≤ 80 palabras, es-CO)

> Esta lectura es una herramienta de autoconocimiento, no un diagnóstico clínico, ni una predicción de tu desempeño futuro, ni una evaluación de tu persona. Lo que mide es un estado momentáneo durante una actividad específica que tú elegiste, y cambia con el tiempo y el contexto. Si quieres profundizar, te invitamos a explorar otros instrumentos de DescubreMe. Si lo que leíste te genera malestar, recuerda que puedes contactar la Línea 106 (Bogotá) o la línea nacional 192 opción 4.

---

## SECCIÓN 8 — PILOTO COGNITIVO COLOMBIA

### 8.1 Tamaño y características de la muestra

- **N = 12–15 participantes** (saturación típica para cognitive interviewing siguiendo Willis, 2005, y guías ITC de adaptación de tests, 2017). [Aporte Gemini: variante ampliada N=15–20 para producto B2C con alto riesgo de malinterpretación dimensional.]
- **Estratificación:**
  - Sexo: 6–8 mujeres / 6–7 hombres.
  - Edad: 4 jóvenes adultos (18–29), 5 adultos (30–49), 3 adultos mayores (50–65).
  - Educación: 5 secundaria completa o menos / 5 técnica/tecnológica / 5 universitaria.
  - Regiones: Bogotá (6), Medellín (3), Cali (3), Barranquilla (3).
  - Tipo de actividad referente: 4 laboral, 4 deportiva/física, 4 creativa/aprendizaje, 3 ocio social.
- **Modalidad:** entrevista 1:1 sincrónica por videollamada (45–60 min), grabada con consentimiento.

### 8.2 Protocolo think-aloud

1. **Calentamiento (5 min):** ejemplo neutro (Goerman, 2005, FCSM): "¿Cuántas ventanas hay en tu casa?" + verbalización paso a paso para entrenar al participante.
2. **Selección de actividad referente (3 min):** "Piensa en una actividad que hayas hecho en los últimos 7 días que valores especialmente." Anotar la actividad. [Aporte Gemini: forzar anclaje a "estado" y no a "rasgo" mediante campo de texto abierto en el prototipo — ver §9 GAP UX.]
3. **Lectura ítem a ítem (25 min):** para cada ítem (1–9), el participante: (a) lo lee en voz alta; (b) lo parafrasea con sus palabras; (c) responde en escala 1–5; (d) explica por qué eligió ese número.
4. **Probes específicos por ítem** (Willis, 2005):
   - Comprensión: "¿Qué significa para ti la frase X?"
   - Recuperación: "¿Cómo decidiste tu respuesta? ¿Recordaste algo específico?"
   - Juicio: "¿La actividad que pensaste encaja bien con esta pregunta?"
   - Respuesta: "¿La escala 1–5 te permitió responder con precisión?"
5. **Debriefing final (10 min):** "¿Hubo alguna palabra que te resultó rara, técnica o de otra región? ¿Habrías escrito la pregunta diferente?"
6. **Validación UX mobile** [Aporte Gemini]: verificar que la interfaz (slider vs. radio buttons de 5 puntos) en dispositivo móvil sea responsiva e intuitiva, mitigando errores de pulsación mecánica involuntaria. Documentar la elección final de componente UI.

### 8.3 Criterios para aceptar / re-adaptar ítem

| Criterio | Umbral aceptar | Umbral re-adaptar |
|---|---|---|
| Paráfrasis correcta del ítem | ≥ 10/12 participantes | ≤ 8/12 |
| Discrepancia entre paráfrasis y constructo intencionado | < 20% de participantes | ≥ 30% |
| Reportes de palabra "rara" o regionalismo extraño | ≤ 2/12 | ≥ 4/12 |
| Tiempo medio de respuesta por ítem | < 25 s | > 40 s |
| Saturación de "no sé qué responder" | ≤ 1/12 | ≥ 3/12 |
| Re-lectura del reactivo [Aporte Gemini] | < 20% de la muestra | ≥ 20% (declarar carga cognitiva excesiva) |

Si un ítem cae en zona de re-adaptación: (a) consultar a Mind Garden (si licencia ya firmada) sobre la edición permitida; (b) generar 2 alternativas; (c) micro-piloto adicional n = 6.

### 8.4 Output esperado

- Documento "FSS-9-es-CO v1.0" con los 9 ítems aceptados o ajustados.
- Tabla de evidencia ítem × participante × paráfrasis.
- Reporte ejecutivo (4–6 pp) con decisiones y trazabilidad.
- Aprobación de Mind Garden / Sue Jackson de los cambios léxicos antes de pasar al estudio psicométrico cuantitativo (N ≥ 400, §3.2).
- [Aporte Gemini] **Friction Log** — bitácora de los puntos exactos de atasco cognitivo, lista para alimentar la *Golden Item Matrix* sincronizada con la tabla `item_bank` de Supabase.

---

## SECCIÓN 9 — GAPS Y PREGUNTAS ABIERTAS

1. **¿Concede Mind Garden licencia comercial B2C con feedback al usuario para el S FSS-2?**  
   *Plan de resolución:* enviar email §6.4 dentro de las primeras dos semanas del sprint; abrir paralelamente conversación con Sue Jackson (drsuejackson.com) como respaldo. Decisión go/no-go en semana 6.

2. **¿Cuáles son los valores exactos de M, DT y alfa del FSS-9 reportados por Jackson, Martin & Eklund (2008) en la muestra n = 865?**  
   *Plan de resolución:* comprar el artículo en Human Kinetics (USD 30) o solicitarlo por interlibrary loan; alternativamente, contactar a Andrew Martin (Univ. of Sydney) para el preprint. Plazo: 2 semanas.

3. **¿Existe una validación colombiana inédita (tesis de maestría / doctoral) del FSS-9?**  
   *Plan de resolución:* búsqueda sistemática en SciELO Colombia, repositorios Univ. de los Andes / Javeriana / UPB / UN; correo a Sociedad Colombiana de Psicología y a Asociación Colombiana de Psicología del Deporte (ASCOPSIDE). Plazo: 3 semanas.

4. **¿Es el FSS-9 generalizable a actividades no deportivas, o el efecto techo en autotelic experience es un sesgo?**  
   *Plan de resolución:* analizar resultados de piloto cognitivo §8 y comparar score distributions por tipo de actividad referente. Decisión sobre necesidad de adaptación específica DescubreMe en semana 12.

5. **¿La cláusula de Mind Garden sobre feedback al usuario admite que mostremos la banda BAJO/MEDIO/ALTO con texto narrativo propio, o exige que solo mostremos el score crudo?**  
   *Plan de resolución:* incluir explícitamente esta pregunta en el email de §6.4 y reservar respuesta documentada de Mind Garden como evidencia contractual.

6. **[Aporte Gemini] ¿Cómo evitar que el usuario, condicionado por tests "disposicionales" (rasgo) previos en DescubreMe, promedie memorias de varias actividades y corrompa la métrica state del FSS-9?**  
   *Plan de resolución:* implementar pantalla previa al test con campo de texto abierto obligatorio donde el usuario escribe la actividad concreta que va a evaluar (ej.: "Reunión de planificación estratégica", "Programando código", "Pintando acuarela"). El motor de scoring incluye este string como metadato del registro. Decisión en semana 4 del sprint UX.

7. **[Aporte Gemini] ¿Cómo gestionar el solapamiento ontológico entre FSS-9 (estado, ventana de horas) y WOLF (rasgo laboral, ventana de meses) en la Matrix 2?**  
   *Plan de resolución:* parametrizar reglas de bifurcación algorítmica. En perfiles B2B-A, levantar primero el WOLF como macro-assessment; reservar el FSS-9 como **pulse-check micro-assessment** disparado tras eventos críticos (cierre de proyecto, sesión Ikigai, etc.), no como medición masiva paralela. Documentar la regla en el árbol de decisión del orchestrator.

8. **[Aporte Gemini] ¿Cuán inestable es la dimensión "transformación del tiempo" en muestra colombiana, dado que García-Calvo et al. (2008) reportaron las cargas factoriales más débiles para ese ítem?**  
   *Plan de resolución:* mantener el ítem en v1.0 con flag `track_variance=true` en Supabase. Tras 500 administraciones colombianas, ejecutar análisis de consistencia interna y omega jerárquico; si la fiabilidad cae por debajo de .70, parchear el motor de scoring para reducir ponderación o sustituir el ítem con autorización de Mind Garden.

---

## SECCIÓN 10 — REFERENCIAS APA 7

1. Bittencourt, I., Freires, L., et al. (2024). Psychometric properties of the Brazilian-Portuguese Flow State Scale Short (FSS-BR-S). *PLOS ONE*. https://pmc.ncbi.nlm.nih.gov/articles/PMC10833536/

2. Çağlar, E., Sarı, İ., Aşçı, F. H., Eklund, R. C., & Jackson, S. A. (2020). Short versions of Turkish flow scales: Reliability and validity study. *Studia Psychologica*, 62(3), 179–197.

3. Calero, A. D. (2016). Actividades extraescolares durante la adolescencia: características que facilitan las experiencias óptimas. *Psicoperspectivas*, 15(2), 102–109. https://doi.org/10.5027/psicoperspectivas-Vol15-Issue2-fulltext-856

4. Calero, A. D., & Injoque-Ricle, I. (2013). Propiedades psicométricas del Inventario Breve de Experiencias Óptimas (Flow). *Revista Evaluar*, 13(1), 40–55. https://doi.org/10.35670/1667-4545.v13.n1.6796

5. Csikszentmihalyi, M. (1990). *Flow: The psychology of optimal experience*. Harper & Row.

6. García-Calvo, T., Jiménez, R., Santos-Rosa, F. J., Reina, R., & Cervelló, E. (2008). Psychometric properties of the Spanish version of the Flow State Scale. *The Spanish Journal of Psychology*, 11(2), 660–669. https://doi.org/10.1017/S1138741600004662

7. Goerman, P. L. (2005). *Adapting cognitive interview techniques for use in pretesting Spanish language survey instruments*. U.S. Census Bureau, Federal Committee on Statistical Methodology. https://nces.ed.gov/FCSM/pdf/2005FCSM_Goerman_VIIIB.pdf

8. International Test Commission. (2017). *ITC guidelines for translating and adapting tests* (2nd ed.). https://www.intestcom.org

9. Jackson, S. A., & Eklund, R. C. (2002). Assessing flow in physical activity: The Flow State Scale–2 and Dispositional Flow Scale–2. *Journal of Sport & Exercise Psychology*, 24(2), 133–150. https://doi.org/10.1123/jsep.24.2.133

10. Jackson, S. A., Eklund, R. C., & Martin, A. J. (2010). *The Flow Scales Manual*. Mind Garden, Inc. https://www.mindgarden.com/flow-scales/467-flow-manual.html

11. Jackson, S. A., & Marsh, H. W. (1996). Development and validation of a scale to measure optimal experience: The Flow State Scale. *Journal of Sport & Exercise Psychology*, 18(1), 17–35. https://doi.org/10.1123/jsep.18.1.17

12. Jackson, S. A., Martin, A. J., & Eklund, R. C. (2008). Long and short measures of flow: The construct validity of the FSS-2, DFS-2, and new brief counterparts. *Journal of Sport & Exercise Psychology*, 30(5), 561–587. https://doi.org/10.1123/jsep.30.5.561

13. Jordan Muiños, F. M., & Simkin, H. (2023). Validación la Escala Corta de Fluidez (FSS) en videojugadores argentinos. *Revista Argentina de Ciencias del Comportamiento*, 15(3), 72–81. [NB: corresponde al Flow Short Scale de Rheinberg/Vollmeyer/Engeser, no al S FSS-2 de Jackson]. https://revistas.unc.edu.ar/index.php/racc/article/view/33716

14. Józefowicz, J., Kowalczyk-Grębska, N., & Brzezicka, A. (2022). Validation of Polish version of Dispositional Flow Scale-2 and Flow State Scale-2 questionnaires. *Frontiers in Psychology*, 13, 818036. https://doi.org/10.3389/fpsyg.2022.818036

15. Lora-Ariza, D. S., Sanchez-Ruiz, A. A., Gonzalez-Calero, P. A., & Camps-Ortueta, I. (2024). Exploring the neural correlates of flow experience with Tetris. *Preprints* 202401.0933. https://www.preprints.org/manuscript/202401.0933 [Aporte Gemini]

16. Moral-Bofill, L., López de la Llave, A., Pérez-Llantada, M. C., & Holgado-Tello, F. P. (2020). Adaptation to Spanish and psychometric study of the Flow State Scale-2 in the field of musical performers. *PLOS ONE*, 15(4), e0231054. https://doi.org/10.1371/journal.pone.0231054

17. Nakamura, J., & Csikszentmihalyi, M. (2002). The concept of flow. En C. R. Snyder & S. J. Lopez (Eds.), *Handbook of positive psychology* (pp. 89–105). Oxford University Press.

18. Pedroli, E., Greci, L., Colombo, D., Serino, S., Cipresso, P., Arlati, S., … & Riva, G. (2018). Characteristics, usability, and users experience of a system combining cognitive and physical therapy in a virtual environment: Positive Bike. *Sensors*, 18(7), 2343. https://doi.org/10.3390/s18072343 [Aporte Gemini]

19. Secretaría Distrital de Salud de Bogotá. (2024). *Línea 106 — El poder de ser escuchado*. https://www.saludcapital.gov.co/Paginas2/Quienes_Somos_linea106.aspx

20. Wang, X., Lu, Y., & Li, R. (2022). Influence mechanism of soundscape perception on flow state of older adults in diabolo exercise. *Frontiers in Public Health*, 10. https://doi.org/10.3389/fpubh.2022.883713 [Aporte Gemini]

21. Willis, G. B. (2005). *Cognitive interviewing: A tool for improving questionnaire design*. Sage.

---

## APÉNDICE A — MAPA DE APORTES CONSOLIDADOS DESDE GEMINI

| # | Sección | Aporte de Gemini | Valor agregado para DescubreMe | Estado de verificación |
|---|---|---|---|---|
| A.1 | §0 Metadatos | Identificación explícita como **constructo "state flow"** vs. DFS-2 disposicional; tiempo estimado de aplicación 2–3 min; framing como complemento "Matrix 2" del WOLF (Block A). | Define la lógica de orquestación del test dentro del stack v2.0 y aclara al producto y al consultor cuándo disparar FSS-9 vs. WOLF. | **Verificable** vs. Jackson, Martin & Eklund (2008) — coherente con literatura canónica. |
| A.2 | §1.4 Ítems literales en inglés | Tabla con 6 textos de ítems en inglés extraídos de Wang et al. (2022) y Lora-Ariza et al. (2024) como "sample items". | Orienta la negociación de traducción con Mind Garden y permite contraste semántico interno. | **`[verificar antes de uso]`** — confirmar con Mind Garden si son "sample items" autorizados o reproducciones no consentidas. No publicar en código sin licencia. |
| A.3 | §2 Adaptaciones | Caracterización de Moral-Bofill et al. (2020) como **EFIM** (instrumento derivado con 6 factores, no 9), estructuralmente incompatible con la arquitectura unifactorial DescubreMe. | Evita seleccionar accidentalmente la traducción musical como base. | **Verificable** vs. DOI 10.1371/journal.pone.0231054 — coherente con el reporte de 6 factores. |
| A.4 | §2.2 / §2.x Modificaciones léxicas | Abstracción del lenguaje deportivo/competitivo hacia universales "Mientras realizaba la actividad..."; reformulación del ítem de feedback como "tuve claro en todo momento qué tan bien lo estaba haciendo". | Mejora cobertura Ikigai/laboral del producto. | **Opinión profesional verificable** en piloto cognitivo. |
| A.5 | §3 Baremos | Cifras descriptivas de Pedroli 2018 (M=4.33, DT=0.84 en VR), Wang 2022 (medias por dimensión) y Lora-Ariza 2024 (suma 35.93, DT 4.26). | Ofrece puntos de referencia para calibrar bandas BAJO/MEDIO/ALTO durante la fase 1 del roadmap. | **`[verificar antes de uso]`** — Gemini no reporta N exacto vinculado a cada media; las muestras son de contexto experimental (VR, ancianos en Diabolo), no generalizables a adulto colombiano. **No publicar en dashboard sin contraste contra fuentes primarias.** |
| A.6 | §3.2 Roadmap | Estrategia complementaria de bandas **criterion-referenced** (1.00–2.49 / 2.50–3.99 / 4.00–5.00) durante MVP v1.0 antes de tener N suficiente para percentiles. | Habilita lanzamiento temprano sin reportar percentiles falsos. | **Opinión profesional verificable**, alineada con la recomendación de Claude de no publicar percentiles hasta N ≥ 300. |
| A.7 | §4.1 Mitigación aquiescencia | Recomendación de **interleaving** de los 9 ítems FSS-9 con reactivos inversos del WOLF (Matrix 2) en el frontend para forzar lectura consciente. | Mitigación arquitectónica concreta del sesgo de respuesta mecanizada inherente a una batería 100% directa. | **Verificable** — práctica estándar en diseño de cuestionarios; documentar en motor scoring_engine. |
| A.8 | §5 Textos alternativos | Tres bandas (BAJO/MEDIO/ALTO) con redacción más narrativa, ≤80 palabras, tuteo cordial, formato "Tiendes a...". Se reservan como respaldo para A/B test. | Opción adicional para refresco de copy. | **Verificable** — cumplen restricciones del prompt v1.0. No se integran como golden por consistencia con el resto del stack consolidado. |
| A.9 | §6.3 Pasos licencia | **Cronómetro operativo de 14 días** para escalar el contacto inicial con Mind Garden antes de activar contingencia. | Disciplina operativa para evitar que la negociación se estanque. | **Opinión profesional**. |
| A.10 | §6.6 Plan B | Nombre del Plan B = **DFI-9 (DescubreMe Flow Index)** + protocolo de 27 ítems embrionarios → 9 finales mediante **Aiken-V con 3 jueces expertos colombianos**. | Convierte el Plan B en proyecto bautizable, vendible internamente y con métricas de validez de contenido cuantitativas. | **Opinión profesional verificable** — Aiken-V es procedimiento estándar publicado. |
| A.11 | §7.2 / §7.3 Riesgo fenomenológico | Identificación de las **dimensiones 7 y 8** como vector de malinterpretación (disociación, despersonalización, amnesia temporal) por usuarios legos; **pop-up condicional fenomenológico** alterno (≤120 palabras) que normaliza la experiencia y deriva a líneas de ayuda. | Cubre un riesgo NFR-28 que el pack base de Claude solo cubre indirectamente. | **Opinión profesional clínicamente sensata.** Texto cumple las restricciones del prompt. |
| A.12 | §8.2 / §8.3 Piloto cognitivo | Validación UI mobile (slider vs. radio buttons) como punto del protocolo; criterio adicional de "re-lectura del reactivo >20% → carga cognitiva excesiva". | Mejora ejecutabilidad del piloto en el contexto real (web mobile). | **Verificable** — práctica UX estándar. |
| A.13 | §9 Gaps (GAP UX state-vs-trait) | Campo de texto abierto obligatorio antes del test para anclar la respuesta a una actividad concreta. | Resuelve riesgo de contaminación del constructo "state" por hábitos previos del usuario en tests disposicionales. | **Opinión profesional verificable** en piloto cognitivo. |
| A.14 | §9 Gaps (GAP redundancia WOLF) | Regla de orquestación: WOLF como macro-assessment; FSS-9 como pulse-check micro-assessment post-evento (cierre de proyecto, sesión Ikigai). | Define el lugar del FSS-9 en el árbol de orquestación de la plataforma. | **Opinión profesional verificable.** |
| A.15 | §9 Gaps (Inestabilidad ítem 8) | Flag `track_variance=true` en Supabase + trigger automático de análisis tras 500 administraciones colombianas; parche de scoring si ω < .70. | Estrategia operacional concreta para gestionar el ítem históricamente más débil. | **Opinión profesional verificable** — coherente con García-Calvo et al. (2008). |
| A.16 | §10 Referencias | Pedroli (2018), Wang (2022), Lora-Ariza (2024). | Amplían base bibliográfica del documento. | **Verificables** vs. los DOIs/URLs reportados. |

**Aportes de Gemini NO integrados (con razón):**
- "Transform Survey Hosting cuesta $55.00 USD inicial" — cifra parcial e incompleta; Claude entrega la tabla completa de descuento volumétrico de Mind Garden, más útil para la negociación.
- Listado de líneas de ayuda de Gemini ("Líneas de Esperanza", red de EPS) — vago, sin números concretos. Claude entrega lista verificada con teléfonos, WhatsApp y horarios.
- Email template de Gemini — más corto y genérico; Claude entrega versión más completa, con 4 features específicas y 4 preguntas concretas.

---

## APÉNDICE B — NOTAS DE CONSOLIDACIÓN

**Método aplicado:** Claude como base (≈85%), Gemini como suplemento verificado (≈15%). Ambos packs entregaron las 10 secciones del prompt v1.0, pero con perfiles distintos:

- **Claude** aplica disciplinadamente los marcadores `Hecho:` / `Inferencia:` / `Opinión profesional:` / `[sin fuente verificada]`. Reporta una tabla de precios públicos de Mind Garden completa (8 escalones de descuento). Identifica con cita verificable que la Línea 106 es de la Secretaría Distrital de Salud de Bogotá. Su Plan B es metodológicamente detallado (Delphi + 3 expertos + piloto cuantitativo). Las 18 referencias APA 7 incluyen DOIs verificables. Maneja explícitamente la confusión Jordan Muiños (2023) ≠ FSS-9 de Jackson.

- **Gemini** entrega las 10 secciones con prosa más densa y rhetorica. Aporta **valor real complementario** en tres focos: (a) identifica el riesgo de malinterpretación fenomenológica de las dimensiones 7 y 8 — un riesgo NFR-28 que Claude no cubrió explícitamente; (b) propone arquitectura de orquestación WOLF/FSS-9 (Block A vs. Matrix 2) con regla de pulse-check post-evento; (c) introduce el nombre "DFI-9" y el protocolo Aiken-V con 27 ítems embrionarios para el Plan B. Sus debilidades: cita por número de nota a pie en lugar de cita APA en línea, reporta cifras descriptivas (Pedroli, Wang, Lora-Ariza) sin N declarado, y su tabla de baremos contiene varios `[sin fuente verificada]` no marcados explícitamente como tales.

**Reglas de integración aplicadas:**
1. Cuando ambos coincidían (ej.: autoría, copyright, base léxica Calero & Injoque-Ricle, ausencia de baremos colombianos), se conservó la redacción de Claude por mejor cumplimiento de marcadores.
2. Cuando Gemini agregaba un dato verificable y útil (ej.: EFIM no es FSS-9 unifactorial; cronómetro de 14 días), se integró marcado `[Aporte Gemini]` en línea.
3. Cuando Gemini agregaba cifras cuantitativas sin trazabilidad clara (medias de Pedroli/Wang/Lora-Ariza), se integraron en la tabla §3 con marcador `[verificar antes de uso]` para no contaminar la cadena de evidencia.
4. Cuando Gemini agregaba una pieza arquitectónica novedosa (mitigación de aquiescencia, GAP UX state-vs-trait, GAP redundancia WOLF, riesgo fenomenológico dimensiones 7/8), se elevó a sección propia o gap dedicado.
5. Los textos alternativos de Gemini para §5 se conservaron como respaldo de A/B test en el Apéndice A, no como golden, para mantener consistencia con el resto del stack v2.0 consolidado.

**Discrepancias materiales detectadas:** Ninguna que comprometa la trazabilidad. Ambos packs convergen en autoría, copyright, status de bloqueadores y recomendación de base léxica argentina. La única discrepancia menor es el rango de tamaño del piloto cognitivo (Claude: 12–15; Gemini: 15–20); se conservó el rango de Claude por alineación con Willis (2005) y se documentó la variante.

**Flags pendientes para el equipo:**
- Verificar que los "sample items" en inglés de §1.4 sean efectivamente reproducciones autorizadas o citas de cortesía antes de cualquier uso en código.
- Confirmar con Mind Garden si las medias de Pedroli (2018) / Wang (2022) / Lora-Ariza (2024) son utilizables para anclaje conceptual, dado que los contextos (VR, Diabolo, Tetris experimental) son atípicos.
- Decidir en sprint 1 si el "pop-up fenomenológico" §7.3-alterno se activa siempre o solo bajo cruce con indicadores de malestar.
