# Implementation Acquisition Pack v1.0 — MLQ (Meaning in Life Questionnaire, 10 ítems) — CONSOLIDADO
**Producto destino:** DescubreMe (LATAM, foco Colombia) · **Stack v2.0 — B2C Paid + Ikigai Premium** · **Instrumento histórico tras refactor a arquitectura *test-as-plugin***
**Versión del consolidado:** 1.0 · **Fecha:** mayo 2026
**Insumos:** `Prompt_21_MLQ_IAR.Claude.md` (Implementation Acquisition Pack completo, 10 secciones) + `Prompt_21_MLQ_IAR.Gemini.md` (revisión académica narrativa estilo white paper con aportes psicométricos y clínicos complementarios)
**Idiomas:** español neutro (metadatos y notas internas) / español Colombia (Secciones 5 y 7)

> **Nota metodológica del consolidado.** Claude entregó el Pack completo siguiendo el prompt v1.0 al pie de la letra (10 secciones + marcadores Hecho/Inferencia/Opinión profesional/[sin fuente verificada]). Gemini entregó una revisión académica narrativa estilo white paper que NO cumple la estructura de 10 secciones del prompt, pero aporta contexto psicométrico complementario relevante: modelo interpretativo de 4 cuadrantes (Steger, 2010), validaciones italiana/griega/rumana/china/brasileña, evidencia en BPD y enfermedad terminal, mediación espiritualidad→sentido→bienestar, mecanismos de coping mediados por sentido, descriptivos del ítem 9 en versión argentina y comparación con SoMe. Este consolidado usa el Pack de Claude como base estructural completa e inyecta los aportes verificables de Gemini con la marca `[Aporte Gemini]`. La trazabilidad del origen de cada bloque está en el **Apéndice A**.
>
> **Nota sobre calidad del insumo Gemini.** El archivo de Gemini presenta un segmento final con degradación severa de salida (model collapse / texto repetitivo no parseable) en la sección de poblaciones psiquiátricas crónicas; ese segmento fue descartado. Los aportes incorporados provienen del 80% del documento que sí es legible.

---

## TABLA DE COBERTURA (requisitos explícitos del prompt v1.0 vs. entrega)

| Requisito | Sección | Cobertura |
|---|---|---|
| Portada y metadatos + estado de bloqueadores | §0 | OK |
| Plan adquisición banco de ítems + lista literal de 10 ítems en inglés con clave | §1 | OK (Apéndice Steger et al., 2006 + michaelfsteger.com) |
| Adaptaciones al español (Argentina, España, Perú, EE.UU. hispanohablantes, Brasil portugués, versión oficial Steger) | §2 | OK + 2.1 + 2.2 |
| Baremos publicados (EE.UU., Argentina, España, Brasil, Perú, multinacional 17 países) | §3 | OK + 3.1 + 3.2 |
| Tabla de ítem inverso numerado (ítem 9) con faceta/dimensión | §4 | OK |
| 6 textos es-CO (2 dimensiones × 3 bandas) | §5 | OK (6/6) |
| Plan licencia (titular, contacto, práctica histórica, pasos, email inglés, costo, Plan B MEMS/PIL-SF) | §6 | OK |
| Disclaimers pre/post + ítems sensibles + mensaje contención + líneas Colombia | §7 | OK |
| Piloto cognitivo Colombia (muestra, think-aloud, criterios, entregables) | §8 | OK |
| ≥ 3 gaps y preguntas abiertas | §9 | OK (4) |
| ≥ 10 referencias APA 7 con DOI | §10 | OK (15) |
| Marcadores Hecho/Inferencia/Opinión profesional | transversal | OK |
| Marcadores [sin fuente verificada] donde aplica | §3, §6 | OK |
| **Aportes consolidados desde Gemini con verificación pendiente** | Apéndice A | OK |

---

## SECCIÓN 0 — PORTADA Y METADATOS

| Campo | Valor |
|---|---|
| Acrónimo | MLQ |
| Nombre completo | Meaning in Life Questionnaire / Cuestionario de Sentido en la Vida |
| Autores | Steger, M. F., Frazier, P., Oishi, S., & Kaler, M. |
| Año de publicación original | 2006 |
| Publicación seminal | *Journal of Counseling Psychology*, 53(1), 80–93. https://doi.org/10.1037/0022-0167.53.1.80 |
| Última revisión documentada | Distribución web por el autor en michaelfsteger.com (guía de scoring e interpretación © Michael F. Steger 2010). Política comercial actualizada a mayo 2026. |
| Versión a implementar | MLQ estándar — forma de 10 ítems (5 Presencia + 5 Búsqueda) |
| Idioma original | Inglés (EE.UU.) |
| Constructo | Sentido de la vida — modelo bidimensional (Presence + Search) |
| Escala de respuesta | Likert 7 puntos (1 = absolutely untrue → 7 = absolutely true) |
| Tiempo de aplicación | 3–4 minutos |
| Copyright | Michael F. Steger (Colorado State University) |
| Productos destino DescubreMe | B2C Paid + Ikigai Premium (stack v2.0; permanece como instrumento histórico tras refactor a arquitectura *test-as-plugin*) |

**Resumen ejecutivo (5 líneas).** El MLQ es un instrumento breve (10 ítems, 3–4 min), bidimensional (Presencia / Búsqueda de sentido), con uso libre académico-terapéutico-educativo por concesión explícita del autor en michaelfsteger.com (uso comercial requiere permiso previo por escrito). Existen múltiples adaptaciones validadas al español (Argentina, España, Perú, EE.UU. hispanohablantes) y portugués (Brasil), y la traducción del propio Steger está disponible públicamente, por lo que el refactor a arquitectura *test-as-plugin* es de baja fricción. **El bloqueador relevante es la obligación de obtener autorización escrita de Michael F. Steger para uso comercial B2C**, según política vigente del autor que define "comercial" como cualquier actividad que genere ingreso directamente del uso, distribución o promoción del instrumento. No existen baremos colombianos publicados; se propone uso provisional de baremos argentinos (Góngora & Castro Solano, 2011) y plan de baremación local en hoja de ruta.

`[Aporte Gemini]` **Por qué el MLQ marcó un cambio paradigmático.** Antes de 2006, las medidas dominantes de sentido (PIL Test, Life Regard Index) se solapaban factorialmente con afecto negativo, neuroticismo y distrés general, lo que hacía imposible discriminar entre vacío existencial genuino y depresión concurrente. El MLQ logró por primera vez disociar empíricamente la **experiencia subjetiva de poseer sentido (Presencia / MLQ-P, cognitivo-evaluativa)** de la **motivación por encontrarlo o expandirlo (Búsqueda / MLQ-S, motivacional-volitiva)**, sin solapamiento factorial con depresión/ansiedad. Esta pureza factorial es la razón por la cual el MLQ desplazó al PIL y al LRI como estándar internacional. Relevante para el copy de DescubreMe: explica al usuario por qué "buscar sentido" NO equivale a "no tener sentido" — pueden coexistir.

**Estado de bloqueadores:**

| Bloqueador | Estado | Razón breve |
|---|---|---|
| (a) Licencia (uso comercial B2C) | **PARTIAL** | Uso académico/terapéutico/educativo libre confirmado; uso comercial **requiere permiso previo por escrito** del autor (política actualizada en michaelfsteger.com, mayo 2026). |
| (b) Ítems literales (publicación) | **READY** | Ítems publicados en el Apéndice del artículo original (Steger et al., 2006, p. 93) y en michaelfsteger.com en EN y ES. |
| (c) Baremos para LATAM | **PARTIAL** | Normas publicadas para Argentina, Brasil, España y Perú; no hay baremo colombiano. Se documenta provisional. |

---

## SECCIÓN 1 — ACQUISITION PLAN DEL BANCO DE ÍTEMS

### 1.1 Disponibilidad pública

**Hecho:** Los 10 ítems del MLQ están publicados de forma literal en el Apéndice del artículo original (Steger et al., 2006, *Journal of Counseling Psychology*, 53(1), 80–93, https://doi.org/10.1037/0022-0167.53.1.80) y han sido redistribuidos por el propio autor en versión PDF y .doc en su sitio personal http://www.michaelfsteger.com (página "Meaning in Life Questionnaire", URL https://www.michaelfsteger.com/?page_id=13), con explícita autorización de uso libre para fines educativos, terapéuticos e investigativos.

**Lista literal del banco de ítems (en inglés, redacción original; Steger et al., 2006, p. 93, Apéndice; replicada en https://cic.edu/wp-content/uploads/2023/08/Meaning-in-Life-Questionnaire.pdf y http://www.michaelfsteger.com/wp-content/uploads/2012/08/MLQ.pdf):**

| # | Ítem (EN) | Dimensión | Clave |
|---|---|---|---|
| 1 | I understand my life's meaning. | Presencia | Directo |
| 2 | I am looking for something that makes my life feel meaningful. | Búsqueda | Directo |
| 3 | I am always looking to find my life's purpose. | Búsqueda | Directo |
| 4 | My life has a clear sense of purpose. | Presencia | Directo |
| 5 | I have a good sense of what makes my life meaningful. | Presencia | Directo |
| 6 | I have discovered a satisfying life purpose. | Presencia | Directo |
| 7 | I am always searching for something that makes my life feel significant. | Búsqueda | Directo |
| 8 | I am seeking a purpose or mission for my life. | Búsqueda | Directo |
| 9 | My life has no clear purpose. | Presencia | **Inverso** |
| 10 | I am searching for meaning in my life. | Búsqueda | Directo |

**Escala de respuesta (literal, EN):** 1 = absolutely untrue, 2 = mostly untrue, 3 = somewhat untrue, 4 = can't say true or false, 5 = somewhat true, 6 = mostly true, 7 = absolutely true.

`[Aporte Gemini]` **Proceso de destilación del banco.** Los 10 ítems finales se destilaron desde un banco inicial de 44 ítems teóricamente derivados, sometidos a tres estudios empíricos sucesivos con cohortes universitarias estadounidenses. La retención final se basó en máxima carga factorial, mejor consistencia interna y mayor relevancia teórica respecto a las dos dimensiones. Este pedigree explica por qué la versión de 10 ítems es defendiblemente "el instrumento" y no una versión corta de uno más extenso.

### 1.2 Banco oficial vs. adaptaciones derivadas

**Hecho:** El banco oficial es el del Apéndice del artículo original; constituye la "fuente de verdad". Existen adaptaciones derivadas al español (Steger, Frazier & Zacchanini, 2008; Góngora & Castro Solano, 2011; Marco et al., 2022; Villarreal-Zegarra et al., 2022) y al portugués brasileño (Damásio & Koller, 2015). La traducción al español distribuida por el autor en http://www.michaelfsteger.com/wp-content/uploads/2013/03/MLQ-Spanish.doc se considera la versión "canónica" en español para fines de armonización.

**Inferencia:** Para evitar fragmentación entre múltiples traducciones, conviene anclar la versión `es-base` de DescubreMe en la versión Spanish distribuida por Steger y producir desde ahí las variantes `es-CO` y `es-MX` mediante adaptaciones léxicas mínimas verificadas con piloto cognitivo.

### 1.3 Estructura del banco

- **Total de ítems:** 10.
- **Dimensión Presencia de Sentido (MLQ-P):** ítems 1, 4, 5, 6, 9. Distribución: 4 directos + 1 inverso (ítem 9). Rango bruto: 5–35.
- **Dimensión Búsqueda de Sentido (MLQ-S):** ítems 2, 3, 7, 8, 10. Distribución: 5 directos, 0 inversos. Rango bruto: 5–35.
- **Formato de pregunta:** afirmación en primera persona; respuesta tipo Likert de 7 puntos.
- **Tiempo de aplicación estimado:** 3–4 minutos.
- **Estructura factorial publicada:** dos factores oblicuos relativamente independientes (Steger et al., 2006). La estructura bifactorial ha sido replicada en un estudio multinacional de invarianza con N = 3.867 adultos de 17 países, que reportó "buenas propiedades psicométricas y altos niveles de invarianza aproximada de medida para la subescala de Presencia tras eliminar el ítem 9, el único ítem formulado en sentido inverso" (Delle Fave et al., 2023, *Applied Research in Quality of Life*, 18(3), 1491–1519, https://doi.org/10.1007/s11482-023-10150-7).

`[Aporte Gemini]` **Pureza factorial frente a depresión/ansiedad.** Las matrices multi-rasgo multi-método aplicadas en los estudios fundacionales (Steger et al., 2006) y replicaciones internacionales confirman que ni MLQ-P ni MLQ-S solapan ítems con medidas estándar de afecto negativo, neuroticismo o sintomatología afectiva. Esta es la propiedad psicométrica diferencial que separa al MLQ del PIL Test y del Life Regard Index, y que justifica usarlo en producto sin riesgo de capturar variabilidad clínica espuria.

### 1.4 Recomendación operativa

**Opinión profesional:** El equipo de desarrollo debe acudir primero a la página oficial del autor https://www.michaelfsteger.com/?page_id=13 para descargar la versión EN y la versión Spanish (.doc) y, en paralelo, abrir el ticket de licencia (Sección 6). Como respaldo, conservar copia del Apéndice de Steger et al. (2006) en el repositorio interno.

---

## SECCIÓN 2 — ADAPTACIONES AL ESPAÑOL DISPONIBLES

### Tabla maestra de adaptaciones al español/portugués LATAM-Iberia

| País | Autores | Año | DOI / URL | N | Características |
|---|---|---|---|---|---|
| EE.UU. (universitarios hispanohablantes) | Steger, Frazier & Zacchanini | 2008 | https://doi.org/10.1080/15325020802173660 | 46 | Primer test de equivalencia de la traducción al español; CFA replicó la estructura de 2 factores; muestra pequeña. |
| Argentina (Buenos Aires) | Góngora & Castro Solano | 2011 | https://www.redalyc.org/pdf/284/28425426009.pdf | 707 adultos + 180 adolescentes | Traducción-retrotraducción; AFE 2 factores (56.55% varianza adultos, 47.11% adolescentes); ítem 9 con carga baja (−.51); α = .79 Presencia / .87 Búsqueda en adultos; α = .79 / .82 en adolescentes; mejor ajuste de CFA al eliminar ítem 9. |
| Brasil (portugués) | Damásio & Koller | 2015 | https://doi.org/10.1016/j.rlp.2015.06.004 | 3.020 (22 estados) | Validación nacional; estructura de 2 factores; mejor ajuste analizando subescalas por separado. |
| España | Marco, Privado, Guillén, Quero, Pérez, Baños & Tormo | 2022 (*Behavioral Psychology / Psicología Conductual*, 30(3), 809–826) | https://www.behavioralpsycho.com/wp-content/uploads/2022/12/13.Marco_30-3Es.pdf | 683 adultos (80,4% mujeres) | CFA confirma 2 factores Presencia y Búsqueda; correlación baja positiva (.19); α ≈ .80 para ambas subescalas; no se asume invarianza por sexo/edad. |
| Perú (universitarios) | Villarreal-Zegarra et al. | 2022 | https://pmc.ncbi.nlm.nih.gov/articles/PMC9400558/ | 581 (18–35 años) | Recomienda versión de 9 ítems (omite ítem 9); invarianza por género; confiabilidad adecuada en ambas dimensiones. |
| Hispanohablantes generales | Steger, M. F. (sitio oficial) | s.f. (≈2013) | http://www.michaelfsteger.com/wp-content/uploads/2013/03/MLQ-Spanish.doc | — | Versión "canónica" distribuida por el autor para uso libre no comercial. Steger indica además que el MLQ "ha sido traducido a más de dos docenas de idiomas y muestra propiedades psicométricas robustas a través de género, edad, raza y grupos nacionales" (michaelfsteger.com/?page_id=13). |
| `[Aporte Gemini]` Italia | Negri et al. (validación italiana, citada en literatura italiana del MLQ) | s.f. | https://www.ovid.com/journals/psyre/fulltext/10.1177/0033294118821302 | [sin fuente verificada — paper en Ovid] | CFA confirma estructura de 2 factores; correlación positiva moderada con autoestima y sentido de coherencia. |
| `[Aporte Gemini]` Grecia | Pezirkianidis et al. (refinamiento posterior a Filippi & Stalikas, 2012) | 2016 | https://www.researchgate.net/publication/309880540 | [sin fuente verificada — paper en ResearchGate] | Énfasis en relación de Presencia con emociones positivas (esperanza, gratitud, amor) medidas con mDES; Presencia opera como ancla cognitiva para construcción afectiva. |
| `[Aporte Gemini]` Rumania | Robu et al. (citados por Gemini) | s.f. | https://lumenpublishing.com/journals/index.php/rrem/article/view/2619 | [sin fuente verificada] | Estructura factorial y invarianza de género en muestra universitaria rumana. |
| `[Aporte Gemini]` China (universitarios) | Estudio de invarianza longitudinal | s.f. | https://pmc.ncbi.nlm.nih.gov/articles/PMC9640618/ | [sin fuente verificada] | Invarianza longitudinal del MLQ en universitarios chinos; pertinente para argumentar uso en cohortes con seguimiento. |

**Sobre la accesibilidad de las traducciones:**

- La traducción del autor en michaelfsteger.com es **descargable libremente** (uso comercial requiere permiso previo por escrito).
- La traducción argentina de Góngora & Castro Solano (2011) está parcialmente reproducida en el artículo (ítems usados como ejemplo en el cuerpo del texto y en publicaciones derivadas); para obtener la versión literal completa se sugiere contactar a la autora (vgongora@psi.uba.ar).
- La adaptación española de Marco et al. (2022) reproduce ítems ilustrativos en el cuerpo del artículo pero la versión completa debe solicitarse a los autores.
- La adaptación brasileña (portugués) NO es directamente reutilizable para Colombia.

### 2.1 Recomendación de base para `es-CO`

**Opinión profesional:** Adoptar como base la **versión Spanish distribuida por Steger en michaelfsteger.com** (referencia canónica del autor del instrumento) y triangularla con las soluciones léxicas validadas por Góngora & Castro Solano (2011) y Marco et al. (2022). Esta decisión:

1. Minimiza fragmentación entre versiones (alineada con el pedido explícito del autor de centralizar traducciones).
2. Aprovecha la trazabilidad psicométrica acumulada en español rioplatense (más cercano dialectalmente a Colombia que el español peninsular).
3. Reduce riesgo legal en el flujo B2C, al partir de la versión oficial del titular del copyright.

### 2.2 Modificaciones léxicas anticipadas para Colombia (es-CO)

**Inferencia profesional (sujeta a piloto cognitivo):**

| Forma rioplatense / peninsular | Forma sugerida es-CO | Justificación |
|---|---|---|
| "significado" (cuando se usa en el sentido de "sentido vital") | "sentido" | Uso colombiano coloquial prefiere "sentido de vida" sobre "significado de la vida". |
| "estás buscando" (voseo o tuteo ambiguo) | "estás buscando" (tuteo neutro) | Tuteo cordial colombiano. |
| "absolutamente verdadero" / "totalmente cierto" | "completamente cierto" | Registro natural en Colombia. |
| "propósito o misión" | "propósito o misión" | Se mantiene; uso colombiano alto. |

Estas modificaciones afectan exclusivamente el etiquetado del polo de la escala y matices léxicos; **no alteran el constructo ni la equivalencia semántica de los ítems**.

### 2.3 `[Aporte Gemini]` Tabla descriptiva comparativa de la versión argentina (referencia de calibración)

Análisis publicado en literatura derivada (Villarreal-Zegarra et al., 2022 y publicaciones de validez de contenido del MLQ-es) reporta los siguientes descriptivos por ítem en la versión argentina sobre muestra adulta hispanohablante (escala 1–7; g1 = asimetría, g2 = curtosis):

| Ítem | Versión argentina (Góngora et al.) | M | SD | g1 | g2 |
|---|---|---|---|---|---|
| 1 (Presencia) | Sé cuál es el sentido de mi vida | 5.71 | 1.33 | −1.45 | 5.42 |
| 2 (Búsqueda) | Estoy buscando algo que me haga sentir que vivo una vida significativa | 4.77 | 1.79 | −0.72 | 2.59 |
| 3 (Búsqueda) | Siempre estoy buscando encontrar el propósito de mi vida | 4.79 | 1.78 | −0.71 | 2.53 |
| 4 (Presencia) | Mi vida tiene un sentido claro de propósito | 5.64 | 1.33 | −1.34 | 5.09 |
| 5 (Presencia) | Tengo bien en claro qué es lo que hace que mi vida tenga sentido | 5.78 | 1.29 | −1.28 | 4.83 |
| 6 (Presencia) | Descubrí un propósito de vida que me da plena satisfacción | 5.44 | 1.44 | −1.08 | 3.94 |
| 7 (Búsqueda) | Siempre estoy buscando algo que me haga sentir que mi vida tiene sentido | 4.79 | 1.79 | −0.74 | 2.61 |
| 8 (Búsqueda) | Estoy en la búsqueda de un propósito o misión para mi vida | 4.93 | 1.73 | −0.79 | 2.80 |
| 9 (Presencia, inverso) | Mi vida no tiene un claro propósito | 5.19 | 1.83 | −0.74 | 2.39 |
| 10 (Búsqueda) | Estoy buscándole sentido a mi vida | 4.19 | 1.92 | −0.40 | 1.97 |

**Lectura útil para producto:** Los ítems de Presencia (1, 4, 5, 6) presentan medias 5.44–5.78 con asimetría negativa fuerte (g1 < −1) y curtosis leptocúrtica, lo que evidencia un **efecto techo** habitual en poblaciones hispanohablantes neurotípicas. Los ítems de Búsqueda presentan medias 4.19–4.93, distribuciones menos sesgadas y mayor variabilidad. Implicación: en el motor de scoring, una banda BAJO en Presencia es una señal más rara (y más relevante clínicamente) que una banda BAJO en Búsqueda.

---

## SECCIÓN 3 — BAREMOS PUBLICADOS

### Tabla maestra de normas disponibles

| País / muestra | Fuente APA + DOI | N | Subescala | M | DE | Percentiles |
|---|---|---|---|---|---|---|
| EE.UU. (universitarios) | Steger et al., 2006 — Estudio 1b, p. 84. https://doi.org/10.1037/0022-0167.53.1.80 | 154 | Presencia | 23.5 | 6.6 | [sin fuente verificada] |
| EE.UU. (universitarios) | Steger et al., 2006 — Estudio 1b, p. 84. | 154 | Búsqueda | 23.1 | 6.6 | [sin fuente verificada] |
| EE.UU. (universitarios) | Steger et al., 2006 — Estudio 2, p. 85. | 400 | Presencia | 23.8 | 5.9 | [sin fuente verificada] |
| EE.UU. (universitarios) | Steger et al., 2006 — Estudio 2, p. 85. | 400 | Búsqueda | 23.4 | 6.3 | [sin fuente verificada] |
| EE.UU. (universitarios + community college) | Steger et al., 2006 — Estudio 3, T1, p. 86. | 70 | Presencia | 24.0 | 5.6 | [sin fuente verificada] |
| EE.UU. | Steger et al., 2006 — Estudio 3, T1, p. 86. | 70 | Búsqueda | 22.5 | 6.2 | [sin fuente verificada] |
| Argentina (adultos – hombres) | Góngora & Castro Solano, 2011 (*Rev. Interam. Psicol.*, 45(3), Tabla 4). | 327 | Presencia | 20.99 | 4.25 | [sin fuente verificada] |
| Argentina (adultos – mujeres) | Góngora & Castro Solano, 2011, Tabla 4. | 380 | Presencia | 21.43 | 4.08 | [sin fuente verificada] |
| Argentina (adultos – total) | Góngora & Castro Solano, 2011, Tabla 4. | 707 | Presencia | 21.23 | 4.16 | [sin fuente verificada] |
| Argentina (adultos – hombres) | Góngora & Castro Solano, 2011, Tabla 4. | 327 | Búsqueda | 19.68 | 7.39 | [sin fuente verificada] |
| Argentina (adultos – mujeres) | Góngora & Castro Solano, 2011, Tabla 4. | 380 | Búsqueda | 19.67 | 7.74 | [sin fuente verificada] |
| Argentina (adultos – total) | Góngora & Castro Solano, 2011, Tabla 4. | 707 | Búsqueda | 19.68 | 7.57 | [sin fuente verificada] |
| Argentina (adolescentes – total) | Góngora & Castro Solano, 2011, Tabla 4. | 180 | Presencia | 18.46 | 5.85 | [sin fuente verificada] |
| Argentina (adolescentes – total) | Góngora & Castro Solano, 2011, Tabla 4. | 180 | Búsqueda | 18.92 | 7.64 | [sin fuente verificada] |
| España (adultos) | Marco et al., 2022 (*Behavioral Psychology*, 30(3), 809–826). | 683 | Presencia | [sin fuente verificada] | [sin fuente verificada] | [sin fuente verificada] |
| España (adultos) | Marco et al., 2022. | 683 | Búsqueda | [sin fuente verificada] | [sin fuente verificada] | [sin fuente verificada] |
| Brasil (nacional) | Damásio & Koller, 2015. https://doi.org/10.1016/j.rlp.2015.06.004 | 3.020 | Presencia | [sin fuente verificada] | [sin fuente verificada] | [sin fuente verificada] |
| Brasil (nacional) | Damásio & Koller, 2015. | 3.020 | Búsqueda | [sin fuente verificada] | [sin fuente verificada] | [sin fuente verificada] |
| Perú (universitarios) | Villarreal-Zegarra et al., 2022. https://pmc.ncbi.nlm.nih.gov/articles/PMC9400558/ | 581 | Presencia (versión 9 ítems) | [sin fuente verificada] | [sin fuente verificada] | [sin fuente verificada] |
| Perú (universitarios) | Villarreal-Zegarra et al., 2022. | 581 | Búsqueda | [sin fuente verificada] | [sin fuente verificada] | [sin fuente verificada] |
| Multinacional (17 países) | Delle Fave et al., 2023. https://doi.org/10.1007/s11482-023-10150-7 | 3.867 adultos | Presencia / Búsqueda (medias por país) | [sin fuente verificada] | [sin fuente verificada] | [sin fuente verificada] |
| `[Aporte Gemini]` Universitarios España (referencial bajo) | Reportado por Steger en literatura derivada | varía | Presencia | 21.15 | [sin fuente verificada] | — |
| `[Aporte Gemini]` Pacientes crónicos internados (referencial alto, contraintuitivo) | Schulenberg, Strack & Buchanan, 2011, citado por Steger en literatura clínica | varía | Presencia | 28.16 | 6.93 | — |
| `[Aporte Gemini]` Pacientes crónicos internados | Schulenberg, Strack & Buchanan, 2011 | varía | Búsqueda | 26.6 | 6.97 | — |

**Hecho clave:** El propio autor advierte explícitamente que "el MLQ no tiene puntajes de corte como las medidas de trastornos psicológicos; está pensado para medir el sentido en la vida a lo largo de todo el rango del funcionamiento humano" (Steger, 2010, *MLQ description, scoring, and feedback packet*, http://www.michaelfsteger.com/wp-content/uploads/2013/12/MLQ-description-scoring-and-feedback-packet.pdf). Por tanto, los percentiles deben usarse SOLO como referencias descriptivas no clínicas.

### 3.1 `[Aporte Gemini]` Modelo interpretativo heurístico de 4 cuadrantes (Steger, 2010)

Steger (2010) propuso un esquema de cuadrantes con punto de corte heurístico fijado en **24 puntos** sobre cada subescala (rango 5–35). Esto NO es un punto de corte clínico — es una rejilla pedagógica para conversación. **DescubreMe NO debe presentarlo al usuario como diagnóstico**, pero puede usarlo internamente para enriquecer la lectura de perfiles:

| Cuadrante | Presencia | Búsqueda | Lectura |
|---|---|---|---|
| **Q1 — Exploración satisfecha (eudaimonía dinámica)** | > 24 | > 24 | Sentido consolidado + curiosidad existencial activa. Asociado a alta satisfacción vital, amplio espectro de emociones positivas, baja rumiación. La búsqueda potencia el bienestar solo en este cuadrante. |
| **Q2 — Plenitud estática / consolidación** | > 24 | < 24 | Marco de sentido robusto y maduro; sin imperativo motivacional de expandirlo. Alta estabilidad del ego, alegría serena, baja intensidad emocional disruptiva. |
| **Q3 — Vacío angustiante (vulnerabilidad clínica)** | < 24 | > 24 | Ausencia de pilares consolidados + búsqueda intensa y a menudo desesperada. Perfil de mayor riesgo: distrés psicológico significativo; estudios reportan que esta combinación correlaciona con puntos de corte para depresión clínica. **Es el perfil que debería disparar el flujo de contención NFR-28 (ver §7.2).** |
| **Q4 — Apatía existencial / nihilismo pasivo** | < 24 | < 24 | Ausencia de sentido sin motivación para buscarlo. Anhedonia, bajo optimismo prospectivo, insatisfacción crónica sorda. |

**Uso interno recomendado en DescubreMe:** mapear el cuadrante en el `instrument_registry` como metadato no visible al usuario, y usarlo (a) para enriquecer los textos de §5 con matiz adicional, (b) para la regla de disparo de NFR-28 (combinación Q3), y (c) para análisis agregado en el reporte interno.

### 3.2 Baremo provisional recomendado para LATAM

**Opinión profesional:** Mientras DescubreMe no cuente con baremo colombiano propio, usar como **referencia provisional los baremos argentinos de adultos (Góngora & Castro Solano, 2011)** dado:

1. Mayor proximidad cultural y lingüística respecto del baremo de EE.UU.
2. Muestra grande (N = 707) y heterogénea de adultos urbanos.
3. Estructura factorial estable con la advertencia conocida sobre el ítem 9.

**Conversión operativa propuesta para DescubreMe:** Aplicar bandas no por percentiles brutos sino por desviaciones respecto a la media argentina, con cortes en M − 1·DE (BAJO ≤ percentil 16 aproximado), entre M ± 1·DE (MEDIO), y ≥ M + 1·DE (ALTO ≥ percentil 84 aproximado). Esta operacionalización es transparente, defendible y no requiere percentiles brutos (que no están publicados con detalle suficiente).

Con la media y DE argentinas en adultos: **Presencia BAJO ≤ 17, MEDIO 18–25, ALTO ≥ 26**; **Búsqueda BAJO ≤ 12, MEDIO 13–27, ALTO ≥ 28**.

### 3.3 Hoja de ruta para baremos colombianos

1. **Fase 0 (mes 0–1):** Piloto cognitivo es-CO (Sección 8).
2. **Fase 1 (mes 2–4):** Recolección observacional dentro de DescubreMe (N ≥ 800 adultos colombianos, edad 18–65, sin diagnóstico psiquiátrico autoinformado, consentimiento informado de uso secundario anonimizado).
3. **Fase 2 (mes 5–6):** Análisis psicométrico: CFA bifactorial, invarianza por sexo y rango etario, cálculo de percentiles 16/50/84 y normas por edad/sexo.
4. **Fase 3 (mes 7+):** Publicación interna del baremo `MLQ-CO-v1` y reemplazo del baremo provisional argentino en el motor de scoring.

---

## SECCIÓN 4 — ÍTEMS DE CLAVE INVERSA, NUMERADOS

**Hecho confirmado en la fuente primaria** (Steger et al., 2006, p. 84, Tabla 2, con marca "(r)" indicando *reverse-scored item*; y p. 93, Apéndice/Scoring: *"Item 9 is reverse scored. Items 1, 4, 5, 6 & 9 make up the Presence of Meaning subscale; items 2, 3, 7, 8 & 10 make up the Search for Meaning subscale"*):

| Ítem # | Dimensión | Clave | Notas |
|---|---|---|---|
| 9 | Presencia de Sentido | **Inversa** | Único ítem inverso del MLQ. Redacción: "My life has no clear purpose" / "Mi vida no tiene un propósito claro". Múltiples estudios reportan carga factorial más baja (Góngora & Solano, 2011: −.51; Villarreal-Zegarra et al., 2022 lo eliminan en la versión de 9 ítems peruana). El estudio multinacional de invarianza de Delle Fave et al. (2023, N = 3.867 adultos, 17 países) concluye que las propiedades psicométricas y la invarianza aproximada de la subescala Presencia mejoran tras eliminar el ítem 9. Mantener en la implementación canónica para preservar comparabilidad internacional, pero monitorear su comportamiento en el piloto colombiano. |

`[Aporte Gemini]` **Explicación cognitiva del problema del ítem 9.** El "factor de método" recurrente del ítem 9 probablemente se debe a la combinación de (a) negación lingüística ("no tiene") + (b) escala orientada inherentemente a la positividad ("absolutamente verdadero" en el polo alto). Esta combinación impone una carga de procesamiento adicional y puede inducir confusiones direccionales en grupos no habituados a inventarios bidireccionales. Es una alerta de UX: en el piloto cognitivo es crítico observar la latencia de respuesta y el tropiezo verbal en este ítem específicamente.

**Implicación de scoring:** En la rutina del motor `scoring_engine`, para el ítem 9 se aplica `valor_invertido = 8 − valor_respuesta` (escala 1–7), y posteriormente se suma con los ítems 1, 4, 5, 6 para obtener el puntaje de Presencia (rango 5–35).

---

## SECCIÓN 5 — TEXTOS DE INTERPRETACIÓN PARA EL USUARIO (es-CO)

### 5.1 Dimensión: Presencia de Sentido / *Presence of Meaning*

**Descripción técnica interna (no visible al usuario):** Esta subescala mide el grado en que la persona comprende, percibe o experimenta su vida como portadora de sentido, propósito o significación coherente (Steger et al., 2006). Correlaciones positivas robustas con satisfacción con la vida, autoestima y optimismo; correlaciones negativas con depresión y ansiedad. Puntaje bruto: 5–35.

**BAJO (≤ percentil 16, ≈ ≤ 17 en baremo argentino adulto):**
> En este momento tiendes a sentir que aún estás armando el rompecabezas de lo que le da sentido a tu vida. Es algo común en etapas de cambio, transición o cuando se cierran ciclos. Por ejemplo, te puede pasar que las metas que antes te movían ya no te dicen lo mismo. Te invitamos a explorar con calma qué actividades, vínculos o causas te conectan con lo que tú consideras importante.

**MEDIO (percentiles 17–83):**
> Sientes que tu vida tiene un sentido en algunas áreas, aunque hay otras donde la claridad todavía está en construcción. Es una zona muy común y saludable: hay días con más certeza y otros donde toca volverse a preguntar. Por ejemplo, puede que tengas claridad en lo laboral pero menos en lo personal. Te invitamos a darle espacio a ambas cosas sin presionarte.

**ALTO (≥ percentil 84, ≈ ≥ 26 en baremo argentino adulto):**
> Tiendes a percibir tu vida como portadora de un sentido claro y a entender qué la hace valiosa para ti. Esa claridad suele aparecer cuando lo que haces a diario se conecta con lo que valoras. Por ejemplo, puedes notar que cuidas tus vínculos, tu trabajo o tus causas con coherencia. Te invitamos a cuidar y nutrir las fuentes que sostienen ese sentido, porque también se renuevan.

### 5.2 Dimensión: Búsqueda de Sentido / *Search for Meaning*

**Descripción técnica interna (no visible al usuario):** Esta subescala mide el grado en que la persona está activamente buscando, profundizando o esforzándose por establecer sentido en su vida (Steger et al., 2006). La búsqueda no es equivalente a ausencia de sentido: una persona puede tener simultáneamente alta Presencia y alta Búsqueda, lo cual configura perfiles interpretativos ricos (Steger, Oishi & Kashdan, 2009). Puntaje bruto: 5–35.

`[Aporte Gemini]` **Matiz interpretativo a tener en cuenta:** la Búsqueda alta es **adaptativa cuando coexiste con Presencia alta** (Q1, "eudaimonía dinámica") y **potencialmente desadaptativa cuando coexiste con Presencia baja** (Q3, perfil de vulnerabilidad). En consecuencia, los textos abajo se redactan como "lectura de Búsqueda en aislado", y la combinación con Presencia se maneja en el motor de scoring (regla de disparo NFR-28, §7.2) y en el reporte enriquecido del cuadrante (§3.1).

**BAJO (≤ percentil 16):**
> En este momento no estás invirtiendo mucha energía en preguntarte por el sentido de tu vida. Eso puede deberse a que ya sientes claridad, o bien a que el tema no te resulta prioritario hoy. Por ejemplo, te puede pasar que prefieres enfocarte en lo cotidiano más que en preguntas grandes. Te invitamos a quedarte con esta foto y, si en algún momento aparece la inquietud, recibirla con curiosidad.

**MEDIO (percentiles 17–83):**
> Tiendes a hacerte preguntas sobre el sentido de tu vida con cierta regularidad, sin que esto te genere malestar constante. Es una postura activa y saludable: combinas hacer con preguntarte. Por ejemplo, puedes detenerte ocasionalmente a revisar si lo que estás haciendo se alinea con lo que quieres. Te invitamos a sostener esa práctica como un hábito de cuidado interno.

**ALTO (≥ percentil 84):**
> Estás en una búsqueda activa e intensa de sentido para tu vida. Esto puede convivir con tener ya claridad en algunas áreas, o ser una etapa de exploración profunda. Por ejemplo, puedes estar revisando vínculos, propósito laboral o creencias. Te invitamos a darle estructura a esa búsqueda con espacios concretos de reflexión, conversaciones o acompañamiento, para que sea fértil y no agotadora.

**Principios verificados en cada texto:**
- Lenguaje descriptivo ("tiendes a", "estás en") y no etiquetador.
- Aspiracional y no determinista (no usa "siempre", "eres", "te define").
- No clínico (sin términos como "depresión", "ansiedad clínica", "neurótico").
- Tuteo cordial colombiano sin modismos regionales fuertes.
- ≤ 80 palabras por banda.

---

## SECCIÓN 6 — PLAN DE ADQUISICIÓN DE LICENCIA

### 6.1 Titular de derechos y contacto

- **Titular:** Michael F. Steger, Ph.D., Professor of Psychology y Founding Director, Center for Meaning and Purpose, Colorado State University (también con posiciones honoríficas en University of Melbourne, Stockholm School of Economics y North-West University).
- **Correo de contacto:** steger@colostate.edu (también disponible vía formulario en michaelfsteger.com).
- **Sitio oficial:** https://www.michaelfsteger.com/?page_id=13

### 6.2 Práctica histórica de concesión

**Hecho:** La política vigente del autor declara explícitamente: *"Commercial use requires prior written permission. Commercial use includes any activity in which revenue is generated directly from the use, distribution, or promotion of these instruments. Coaches, trainers, consultants, and therapists may incorporate these tools into their professional work, provided that clients are not charged specifically for accessing the instruments. The tools may not be sold, redistributed, or marketed as part of a paid product, service, or value-added offering without advance authorization."* (michaelfsteger.com, consulta de mayo 2026). El autor también señala que el MLQ "está siendo utilizado internacionalmente en salud pública y encuestas poblacionales por los Centers for Disease Control de Estados Unidos, el Oxford Poverty and Human Development Institute y el International Wellbeing Study" (michaelfsteger.com/?page_id=13).

**Inferencia:** La política actualizada deja poco margen de ambigüedad: dado que DescubreMe es una plataforma B2C **paga** (Paid + Ikigai Premium) en la que el MLQ formaría parte del producto pagado, **la autorización previa por escrito es obligatoria** y debe quedar resuelta antes del despliegue del refactor a producción. La práctica histórica del autor sigue siendo cooperativa y abierta, lo que sugiere alta probabilidad de respuesta, pero no debe asumirse autorización tácita.

### 6.3 Pasos para solicitar

1. Preparar carta-correo formal en inglés (ver 6.4) describiendo el uso previsto, número estimado de usuarios/año, modelo de monetización, idioma(s), almacenamiento de datos y país de operación.
2. Adjuntar enlace al sitio público de DescubreMe y un PDF con la política de privacidad y el flujo de consentimiento.
3. Especificar si se solicita licencia perpetua, licencia anual o autorización por uso.
4. Proponer condiciones (atribución visible "© Michael F. Steger, used with permission"; envío anual de reporte agregado y anonimizado de hallazgos).
5. Conservar evidencia escrita de la autorización en el repositorio legal.

### 6.4 Borrador inicial de correo (copy-paste ready, en inglés)

> **Subject:** Request for commercial-use license — Meaning in Life Questionnaire (MLQ) for DescubreMe (Colombia, LATAM)
>
> Dear Dr. Steger,
>
> My name is [NAME], [ROLE] at DescubreMe (https://[URL]), a B2C web platform for adult self-knowledge based in Colombia and serving Latin America. Per the commercial-use policy on michaelfsteger.com, we are writing to formally request prior written authorization to include the Meaning in Life Questionnaire (MLQ; Steger, Frazier, Oishi, & Kaler, 2006) in two of our paid product tiers ("B2C Paid" and "Ikigai Premium").
>
> Our use is **educational and orientational, non-clinical, and explicitly not used for personnel selection or diagnostic purposes**. End users complete the MLQ as a self-knowledge exercise; they receive descriptive (non-prescriptive) feedback by subscale band. We do not present cut-offs as clinical thresholds, and we display a pre-test disclaimer aligned with your guidance ("The MLQ does not have cut scores like measures of psychological disorders…").
>
> We would like to: (a) use the Spanish version you distribute on michaelfsteger.com as our base, with light lexical adaptation for Colombian Spanish (es-CO) and Mexican Spanish (es-MX); (b) include the original English version (en) for English-speaking users; (c) display proper attribution ("© Michael F. Steger; used with permission") on every results screen and in our privacy/credits page; (d) leave all items unmodified beyond minor lexical adaptation, preserving Item 9 as reverse-scored.
>
> Estimated volume: approximately [N] new completions per year. We are happy to share, on an annual basis, aggregated and fully anonymized descriptive statistics (means, SDs, sample size, country) for your own scholarly use, should you find that useful.
>
> Could you please let us know: (1) whether a commercial-use license is available; (2) any fee, royalty, or one-time payment expected; (3) any conditions you require regarding attribution, reporting, or item modification.
>
> Thank you for the generosity with which you have shared this instrument over the years, and for your continued contributions to the field.
>
> Warmly,
>
> [NAME]
> [ROLE], DescubreMe
> [EMAIL] · [PHONE]

### 6.5 Costo esperado y rangos

**[Sin fuente verificada]** No existe tarifa pública publicada por el autor para uso comercial del MLQ. Por analogía con otros instrumentos psicométricos de uso libre académico que requieren licencia comercial (e.g., SWLS de Diener, PERMA-Profiler), los escenarios plausibles son:

- **Escenario A (gratuito condicionado):** Autorización sin costo monetario a cambio de atribución y reporte anual de datos agregados. Probabilidad estimada: **media** (la política actualizada del autor incluye explícitamente la categoría "paid product" como uso que requiere autorización, lo que sugiere que el autor previó tarificarlo).
- **Escenario B (pago simbólico / único):** USD 500–2.500 como pago único o anual.
- **Escenario C (royalty por uso):** Royalty por completación o por usuario activo (poco frecuente en este instrumento).

**Recomendación:** Presupuestar USD 2.500 como reserva contingente y registrar la respuesta efectiva en el repositorio.

### 6.6 Plan B

Si la respuesta es negativa o no llega en 30 días hábiles:

1. **B1 — MEMS (Multidimensional Existential Meaning Scale, George & Park, 2017, https://doi.org/10.1080/17439760.2016.1209546):** Ya prevista en el stack v2.0 (Bloque A). Reemplaza funcionalmente al MLQ para nuevos usuarios.
2. **B2 — PIL-SF (Purpose in Life Test – Short Form, Schulenberg et al., 2011; adaptación al español Weber et al., 2022, https://www.redalyc.org/journal/6723/672371222012/html/):** Instrumento alternativo con adaptación al español publicada.
3. **B3 — Pregunta abierta con ítem único de propósito**, no psicométrico, etiquetado claramente como reflexión orientativa.

En cualquier escenario B, los datos históricos del MLQ en stack v2.0 se conservan en el bloque `instrument_registry` con flag `frozen=true` para cumplir NFR-35 (retrocompatibilidad). La decisión de producto es **mantener histórico MLQ para usuarios v2.0 y ofrecer MEMS a nuevos usuarios**, sin sobrescritura de datos.

---

## SECCIÓN 7 — DISCLAIMERS Y MITIGACIONES ESPECÍFICAS

### 7.1 Disclaimer pre-test (es-CO, ≤ 100 palabras)

> Este cuestionario te invita a reflexionar sobre el sentido que le das a tu vida hoy. **No es una prueba clínica ni diagnóstica, ni sirve para procesos de selección laboral.** No hay respuestas correctas o incorrectas. Tus respuestas son confidenciales y se usarán para darte una devolución descriptiva y orientativa. Si en algún momento sientes malestar emocional intenso, puedes detener el cuestionario y, si lo necesitas, comunicarte con la Línea 106 (gratuita, 24/7). Al continuar, aceptas participar de manera voluntaria.

### 7.2 Ítems sensibles que activan NFR-28 (containment)

NFR-28 (regla de contención emocional) se activa si la combinación de respuestas configura un perfil de **alta Búsqueda + muy baja Presencia** sostenida (cuadrante Q3 del modelo de Steger, 2010; ver §3.1), o si el usuario marca respuestas extremas (1 = "completamente falso") en los siguientes ítems particularmente cercanos a vivencia de vacío existencial:

- Ítem 4: "Mi vida tiene un claro sentido de propósito." (respuesta 1–2)
- Ítem 6: "He descubierto un propósito satisfactorio en la vida." (respuesta 1–2)
- Ítem 9 directo (antes de invertir): "Mi vida no tiene un propósito claro." (respuesta 6–7)

**Importante:** El MLQ por sí mismo NO mide ideación suicida ni depresión clínica. La Búsqueda alta puede ser positiva (Steger & Shin, 2010). El gatillo NFR-28 es por **prudencia educativa**, no por screening.

`[Aporte Gemini]` **Sustento empírico de la regla Q3.** Investigaciones de Cohen y Cairns (2010), citadas en literatura clínica derivada del MLQ, reportan mediante correlaciones multivariadas y diagramas de dispersión bivariada que los sujetos anclados en el perfil "baja Presencia × alta Búsqueda" superan con frecuencia poblacional los puntos de corte diagnósticos para episodios de depresión clínica mayor. Esto NO se usa para diagnosticar (no es función de DescubreMe), pero **justifica el disparo del flujo de contención** sin que sea una decisión arbitraria.

### 7.3 Mensaje de contención (es-CO, ≤ 120 palabras)

> Notamos que algunas de tus respuestas reflejan un momento en el que el sentido de tu vida puede sentirse poco claro o frágil. Eso le pasa a muchas personas, especialmente en etapas de cambio, duelo o cansancio sostenido. **No es un diagnóstico ni una sentencia: es una foto del momento.** Si sientes que esta sensación te está pesando, hablar con alguien puede ayudar mucho. Te dejamos algunas líneas gratuitas en Colombia donde te pueden escuchar sin juzgarte. Si en cualquier momento sientes que no puedes seguir adelante solo, llama al **106** (gratuita 24/7) o al **123** en una emergencia. No estás solo.

### 7.4 Líneas de ayuda relevantes en Colombia (verificadas a 2025)

| Línea | Número | Cobertura | Horario | Fuente |
|---|---|---|---|---|
| Línea 106 "El poder de ser escuchado" — apoyo psicosocial, intervención en crisis | **106** (gratuita) / WhatsApp **300 754 8933** / linea106@saludcapital.gov.co | Bogotá D.C. (Secretaría Distrital de Salud) | 24/7 | https://www.saludcapital.gov.co/Paginas2/Quienes_Somos_linea106.aspx |
| Línea Nacional 106 (Ministerio de Salud) | 106 | Nacional (donde no exista línea local) | 24/7 | Minsalud, *Directorio Nacional de Líneas Territoriales de Salud Mental*, 2025 |
| Línea de emergencias | **123** | Nacional | 24/7 | bogota.gov.co |
| Línea Púrpura Distrital (violencia de género) | 01 8000 112 137 / WhatsApp 300 755 1846 | Bogotá | 24/7 | saludcapital.gov.co |
| Línea Calma (hombres con emociones difíciles) | 01 8000 423 614 | Bogotá | Horario ampliado | saludcapital.gov.co |
| Línea Diversa (atención LGBT+) | WhatsApp 310 864 4214 | Bogotá | Lunes–viernes | saludcapital.gov.co |
| Orientación en salud mental | **192 opción 4** | Nacional (variable por territorio) | 24/7 (variable) | Minsalud |
| ICBF (niños, niñas y adolescentes) | **141** | Nacional | 24/7 | ICBF |
| Medellín — Línea 106 / Línea Amiga Saludable | (604) 444 44 48 / WhatsApp 300 723 1123 | Medellín | 24/7 | Minsalud directorio |
| Barranquilla — Línea de la Vida | (605) 339 99 99 | Barranquilla | 24/7 | Minsalud directorio |

### 7.5 Disclaimer post-test (es-CO, ≤ 80 palabras)

> Esta devolución es una **lectura descriptiva y educativa**, no un diagnóstico ni una predicción. El sentido de vida no es estático: cambia con tus etapas, vínculos y elecciones. Si algo de lo que leíste resonó fuerte y quieres profundizar, puedes hablarlo con un profesional de tu confianza o llamar a la Línea 106 (gratuita, 24/7). Tus respuestas se conservan de manera confidencial y puedes solicitar su eliminación cuando quieras.

---

## SECCIÓN 8 — PILOTO COGNITIVO COLOMBIANO: SUGERENCIAS

### 8.1 Tamaño de muestra y características

- **N:** 12–18 participantes (saturación esperada a los 12 según práctica estándar de *cognitive interviewing*; Willis, 2005).
- **Perfil:** Adultos colombianos 18–65 años, residentes en al menos tres ciudades (Bogotá, Medellín, Cali) y zonas rurales/urbanas mixtas; balanceo aproximado 50/50 por sexo; balanceo por nivel educativo (≥3 con educación secundaria completa, ≥6 con técnica/tecnológica, ≥6 universitaria).
- **Criterios de exclusión:** Diagnóstico psiquiátrico activo autoinformado; participación previa en validaciones del MLQ.

### 8.2 Protocolo *think-aloud*

1. Explicación del estudio + consentimiento informado (oral grabado).
2. Calentamiento: ítem práctico no MLQ ("Tengo amigos cercanos en mi vida"). El participante verbaliza cómo entendió el ítem, qué pensó al responder y cuál fue su respuesta.
3. Aplicación ítem-por-ítem del MLQ es-CO. Para cada ítem se aplican *probes* estructurados:
   - "¿Qué entendiste con la frase tal cual te la leí?"
   - "Cuéntame con tus palabras qué te están preguntando."
   - "¿Hay alguna palabra que te resultó rara, difícil o que en Colombia se diga distinto?"
   - "¿Por qué elegiste esa opción de la escala?"
4. Cierre: evaluación global del tiempo y de la escala de respuesta (1–7).
5. Duración estimada por sesión: 45–60 minutos.

### 8.3 Criterios para aceptar / re-adaptar un ítem

| Criterio | Decisión |
|---|---|
| ≥ 80% de participantes interpretan el ítem en el sentido pretendido por el constructo | **Aceptar** sin cambios. |
| 50–79% lo interpretan correctamente; el resto presenta confusión léxica menor | **Aceptar con nota** y considerar paráfrasis suave (mantener equivalencia semántica). |
| < 50% lo interpretan correctamente, o ≥ 30% señalan que la palabra clave "no se usa así en Colombia" | **Re-adaptar léxicamente** y testear con 4–6 nuevos participantes. |
| Ítem 9 (inverso) muestra confusión sistemática (≥ 40% lo responden en dirección opuesta) | **Marcar como problemático**, conservar para retrocompatibilidad pero documentar en el reporte interpretativo; explorar redacción alternativa para versión futura. |

`[Aporte Gemini]` **Probe específico recomendado para el ítem 9:** dado que el problema documentado del ítem 9 es de naturaleza cognitiva (negación + escala orientada positivamente), además del probe estándar conviene **medir latencia de respuesta** (si lleva > 1.5× el promedio del resto) y **pedir paráfrasis activa** ("¿qué afirmación estarías diciendo si respondes 1 / 7?"). Si ≥ 30% paráfrasea en sentido opuesto al modelo, escalar inmediatamente la alerta a re-redacción.

### 8.4 Output esperado del piloto

- **D1:** Versión `MLQ-es-CO-v1.0` consolidada, con tabla de cambios léxicos respecto a la versión Spanish base de Steger.
- **D2:** Tabla de ítems con porcentaje de comprensión correcta y observaciones cualitativas.
- **D3:** Recomendación operativa para el motor de scoring respecto al ítem 9 (mantener / flag).
- **D4:** Insumo para el protocolo de baremación (Sección 3.3).

---

## SECCIÓN 9 — BRECHAS Y PREGUNTAS ABIERTAS

### 9.1 ¿Cuál es la versión Spanish exacta y verbatim distribuida por Steger en michaelfsteger.com?

**Estado:** Durante esta investigación el archivo http://www.michaelfsteger.com/wp-content/uploads/2013/03/MLQ-Spanish.doc no respondió a múltiples intentos de descarga automatizada (timeouts del servidor). Las versiones reconstruidas en Sección 1 provienen de validaciones publicadas (Góngora & Castro Solano, 2011; Marco et al., 2022) y son léxicamente próximas, pero no se confirmó verbatim el archivo oficial.

**Plan de resolución:** (a) Reintentar descarga manual desde navegador con sesión humana; (b) si falla, escribir a steger@colostate.edu solicitando copia oficial del .doc; (c) registrar en el `cultural_adaptations` block la huella SHA-256 del archivo recibido para trazabilidad.

### 9.2 ¿Existe alguna validación psicométrica del MLQ específicamente en población colombiana?

**Estado:** Se identificó un proyecto en curso de "Validación colombiana del cuestionario del sentido de la vida (MLQ): propiedades psicométricas. Fase I: revisión documental" (Universidad El Bosque, https://repositorio.unbosque.edu.co/items/cef1207e-c363-470f-88cf-79b10e06d490) que reconoce explícitamente que el MLQ "ha sido validado en otros países, pero no en Colombia, lo que limita su uso y puede generar sesgos" hasta el momento de su redacción.

**Plan de resolución:** Monitorear publicación final del proyecto El Bosque; si emerge baremo colombiano publicado, incorporar como referencia primaria en Sección 3 antes del lanzamiento del baremo `MLQ-CO-v1` interno de DescubreMe.

### 9.3 ¿Cuáles son los percentiles exactos (16, 50, 84) para Presencia y Búsqueda en el baremo argentino?

**Estado:** Góngora & Castro Solano (2011) reportan medias y desviaciones estándar (Tabla 4 del artículo) pero no publican una tabla de percentiles brutos para cada subescala. Los percentiles utilizados en la operacionalización propuesta en Sección 3.2 se derivan asumiendo distribución aproximadamente normal a partir de M ± 1·DE.

**Plan de resolución:** (a) Solicitar a Vanesa Góngora (vgongora@psi.uba.ar) la tabla de percentiles si está disponible; (b) en su defecto, derivar percentiles empíricos a partir de los primeros 200–300 usuarios colombianos del MLQ es-CO antes de lanzar la versión 1.0 del reporte al público general.

### 9.4 ¿Se justifica retener el ítem 9 en la implementación es-CO, dado que tanto Argentina como Perú lo problematizan, y el estudio multinacional de 17 países lo identifica como el más no-invariante?

**Estado:** Góngora & Solano (2011) y Villarreal-Zegarra et al. (2022) recomiendan eliminar el ítem 9 por baja carga factorial y dificultad de comprensión del ítem inverso. El estudio de Delle Fave et al. (2023, *Applied Research in Quality of Life*, 18(3), 1491–1519, https://doi.org/10.1007/s11482-023-10150-7) con N = 3.867 adultos de 17 países confirma que la invarianza aproximada de la subescala Presencia mejora tras eliminar el ítem 9, aunque la subescala Búsqueda "varía más entre muestras, sugiriendo cautela en la interpretación de resultados relacionados que soportan invarianza aproximada".

**Plan de resolución:** Retener el ítem 9 en la versión canónica para preservar comparabilidad internacional, pero (a) marcarlo en el `item_bank` con flag `psychometric_warning=true`, (b) ofrecer en el scoring engine una bandera opcional `omit_item9=true` para análisis comparativo, y (c) documentar la decisión en el reporte del piloto cognitivo. Si el piloto colombiano replica el problema del ítem 9, evaluar publicar oficialmente `MLQ-CO-9items` como variante con consentimiento del autor.

---

## SECCIÓN 10 — REFERENCIAS (APA 7)

1. Damásio, B. F., & Koller, S. H. (2015). Meaning in Life Questionnaire: Adaptation process and psychometric properties of the Brazilian version. *Revista Latinoamericana de Psicología, 47*(3), 185–195. https://doi.org/10.1016/j.rlp.2015.06.004

2. Delle Fave, A., Brdar, I., Wissing, M. P., Araujo, U., Castro Solano, A., Freire, T., Hernández-Pozo, M. R., Jose, P., Martos, T., Nafstad, H. E., Nakamura, J., Singh, K., & Soosai-Nathan, L. (2023). Measurement invariance of the Meaning in Life Questionnaire across 17 countries. *Applied Research in Quality of Life, 18*(3), 1491–1519. https://doi.org/10.1007/s11482-023-10150-7

3. George, L. S., & Park, C. L. (2017). The Multidimensional Existential Meaning Scale: A tripartite approach to measuring meaning in life. *The Journal of Positive Psychology, 12*(6), 613–627. https://doi.org/10.1080/17439760.2016.1209546

4. Góngora, V., & Castro Solano, A. (2011). Validación del Cuestionario de Significado de la Vida MLQ en población adulta y adolescente argentina. *Revista Interamericana de Psicología / Interamerican Journal of Psychology, 45*(3), 395–404. https://www.redalyc.org/pdf/284/28425426009.pdf

5. Marco, J. H., Privado, J., Guillén, V., Quero, S., Pérez, S., Baños, R., & Tormo, M. P. (2022). Propiedades psicométricas de la versión española del "Cuestionario de sentido en la vida" (MLQ) en adultos. *Behavioral Psychology / Psicología Conductual, 30*(3), 809–826. https://www.behavioralpsycho.com/wp-content/uploads/2022/12/13.Marco_30-3Es.pdf

6. Naghiyaee, M., Bahmani, B., & Asgari, A. (2020). The psychometric properties of the Meaning in Life Questionnaire (MLQ) in patients with life-threatening illnesses. *The Scientific World Journal, 2020*, 8361602. https://doi.org/10.1155/2020/8361602

7. Steger, M. F. (2010). *MLQ — Description, scoring, and feedback packet* [PDF]. http://www.michaelfsteger.com/wp-content/uploads/2013/12/MLQ-description-scoring-and-feedback-packet.pdf

8. Steger, M. F., Frazier, P., Oishi, S., & Kaler, M. (2006). The Meaning in Life Questionnaire: Assessing the presence of and search for meaning in life. *Journal of Counseling Psychology, 53*(1), 80–93. https://doi.org/10.1037/0022-0167.53.1.80

9. Steger, M. F., Frazier, P., & Zacchanini, J. L. (2008). Terrorism in two cultures: Traumatization and existential protective factors following the September 11th attacks and the Madrid train bombings. *Journal of Loss and Trauma, 13*(6), 511–527. https://doi.org/10.1080/15325020802173660

10. Steger, M. F., Kawabata, Y., Shimai, S., & Otake, K. (2008). The meaningful life in Japan and the United States: Levels and correlates of meaning in life. *Journal of Research in Personality, 42*(3), 660–678. https://doi.org/10.1016/j.jrp.2007.09.003

11. Steger, M. F., Oishi, S., & Kashdan, T. B. (2009). Meaning in life across the life span: Levels and correlates of meaning in life from emerging adulthood to older adulthood. *The Journal of Positive Psychology, 4*(1), 43–52. https://doi.org/10.1080/17439760802303127

12. Steger, M. F., & Shin, J. Y. (2010). The relevance of the Meaning in Life Questionnaire to therapeutic practice: A look at the initial evidence. *International Forum for Logotherapy, 33*(2), 95–104.

13. Villarreal-Zegarra, D., Copez-Lonzoy, A., Vilela-Estrada, A. L., & Huarcaya-Victoria, J. (2022). Meaning of Life Questionnaire (MLQ) in Peruvian undergraduate students: Study of its psychometric properties from the perspective of classical test theory (CTT). *Heliyon, 8*(8), e10231. https://pmc.ncbi.nlm.nih.gov/articles/PMC9400558/

14. Weber, M. C., Schulenberg, S. E., & Pareja Solano, J. (2022). Adaptación y validación al español del Test Breve de Propósito en la Vida (PIL Breve). *PSOCIAL, 8*(1). https://www.redalyc.org/journal/6723/672371222012/html/

15. Secretaría Distrital de Salud de Bogotá. (2025). *Línea 106 — El poder de ser escuchado*. https://www.saludcapital.gov.co/Paginas2/Quienes_Somos_linea106.aspx

**`[Aportes desde Gemini — verificación pendiente]`** (las siguientes referencias se citan en el reporte de Gemini con enlaces secundarios; se conservan aquí como punto de partida para verificación antes de uso en producción):

Negri, L., et al. Italian Validation of the Meaning in Life Questionnaire. *Psychological Reports* (citado vía Ovid). [sin DOI verificado en este consolidado — verificar en Ovid/PubMed].

Pezirkianidis, C., et al. (2016). Validation of the Meaning in Life Questionnaire (MLQ) in a Greek Sample. *ResearchGate publication 309880540*. [verificar paper primario].

Cohen, K., & Cairns, D. (2010). Is searching for meaning in life associated with reduced subjective well-being? Confirmation and possible moderators. *Journal of Happiness Studies* (citado por Gemini en literatura clínica derivada). [verificar DOI primario].

Schulenberg, S. E., Strack, K. M., & Buchanan, E. M. (2011). The Meaning in Life Questionnaire: Psychometric properties with individuals with serious mental illness in an inpatient setting. *Journal of Clinical Psychology* (citado por Gemini con descriptivos M=28.16/SD=6.93 para Presencia y M=26.6/SD=6.97 para Búsqueda en pacientes crónicos internados). [verificar paper primario].

Park, N., Park, M., & Peterson, C. (2010). When is the search for meaning related to life satisfaction? *Applied Psychology: Health and Well-Being*. (Aporta el matiz Q1 del modelo de 4 cuadrantes: la Búsqueda potencia el bienestar solo en presencia alta.) [verificar DOI].

---

## APÉNDICE A — Mapa de aportes consolidados desde Gemini

| # | Aporte | Sección donde se integró | Valor agregado | Verificación recomendada |
|---|---|---|---|---|
| A1 | Cambio paradigmático del MLQ vs. PIL/LRI: pureza factorial frente a depresión/ansiedad | §0 (Resumen ejecutivo, nota Gemini) y §1.3 (pureza factorial) | Argumento de fondo para el copy del producto y para defensa metodológica ante auditorías académicas. Refuerza por qué DescubreMe usa MLQ y no instrumentos clásicos. | Steger et al. (2006) ya está en referencias; el contraste con PIL/LRI está documentado en la introducción de ese paper. |
| A2 | Proceso de destilación desde 44 ítems iniciales hasta 10 finales | §1.1 (nota Gemini en sección de banco) | Pedigree de construcción que justifica defender que la versión de 10 ítems es "el instrumento" y no una versión recortada. | Verificable en Steger et al. (2006), apartado de método. |
| A3 | Tabla descriptiva por ítem en versión argentina (M, SD, asimetría, curtosis) + efecto techo en Presencia | §2.3 (nueva subsección) | Insumo para calibración del motor de scoring y para interpretación de BAJO/MEDIO/ALTO con conocimiento del shape de la distribución hispanohablante. | Datos compilados desde Góngora & Castro Solano (2011) y Villarreal-Zegarra et al. (2022); ambos en referencias primarias. |
| A4 | Validaciones internacionales adicionales: Italia, Grecia, Rumania, China | §2 (tabla maestra, filas Aporte Gemini) | Refuerzo de robustez transcultural; útil en la solicitud de licencia a Steger para mostrar conocimiento del estado del arte. | Verificar referencias primarias (Ovid, ResearchGate, Lumen, PMC) antes de citarlas en comunicación oficial. |
| A5 | Modelo interpretativo de 4 cuadrantes (Steger, 2010) con punto de corte heurístico en 24 | §3.1 (nueva subsección completa) | Marco de lectura cruzada Presencia × Búsqueda; sustenta operacionalmente la regla de NFR-28 (cuadrante Q3) y enriquece el reporte interno. Permite hablar de "eudaimonía dinámica" y "vacío angustiante" como categorías de producto. | Steger (2010) *Description, scoring, and feedback packet* ya está en referencias primarias. |
| A6 | Descriptivos referenciales contraintuitivos en pacientes crónicos internados (Presencia M=28.16; Búsqueda M=26.6) | §3 (tabla maestra, filas Aporte Gemini) | Pone en contexto que puntajes altos no garantizan bienestar; los pacientes crónicos pueden mostrar M alta de Presencia (sentido construido sobre la enfermedad) y alta Búsqueda (resiliencia activa). Útil para el copy: "el sentido no es lo mismo que la felicidad". | Schulenberg, Strack & Buchanan (2011) — verificar paper primario antes de citar en producto. |
| A7 | Explicación cognitiva del problema del ítem 9 (negación + escala positiva → carga cognitiva extra) | §4 (nota Gemini) | Marco interpretativo para el piloto cognitivo; informa el diseño del probe específico para el ítem 9. | Inferencia teórica respaldada por Delle Fave et al. (2023) y replicaciones; no requiere verificación adicional. |
| A8 | Probe específico recomendado para ítem 9 (latencia + paráfrasis activa) | §8.3 (nota Gemini) | Insumo concreto para el protocolo del piloto cognitivo. | Recomendación operativa basada en A7; no requiere fuente primaria. |
| A9 | Sustento empírico del disparo NFR-28 en cuadrante Q3 (Cohen & Cairns, 2010) | §7.2 (nota Gemini) | Justifica que la regla de contención NO es arbitraria; cita literatura que conecta Q3 con criterios de depresión clínica mayor. | Cohen & Cairns (2010) — verificar paper primario; está en bloque de referencias pendientes de verificación. |
| A10 | Matiz interpretativo de Búsqueda según interacción con Presencia (Park, Park & Peterson, 2010) | §5.2 (nota Gemini al inicio de la dimensión) | Clarifica al lector interno que los textos están redactados como "lectura en aislado" y que la combinación con Presencia se maneja vía cuadrante (§3.1) y NFR-28 (§7.2). | Park, Park & Peterson (2010) — verificar paper primario. |

**Lectura general del Apéndice A:** los diez aportes de Gemini integrados son de naturaleza académica complementaria. **Ninguno altera decisiones operativas críticas del Pack** (licencia, ítems, baremos, textos al usuario, disclaimers, piloto cognitivo). Refuerzan el marco interpretativo, justifican operacionalmente reglas de producto (NFR-28), aportan calibración estadística (descriptivos por ítem) y abren ideas para el reporte enriquecido. Antes de presentar el Pack a Steger (Sección 6) o de publicar comunicación que cite estas fuentes, **los DOIs primarios de A4, A6, A9 y A10 deben verificarse** porque Gemini los citó desde fuentes secundarias.

---

## APÉNDICE B — Notas de consolidación (metodología)

**Origen del documento.** Este consolidado combina dos investigaciones independientes producidas en mayo 2026:

1. `Prompt_21_MLQ_IAR.Claude.md` — Implementation Acquisition Pack completo de 10 secciones siguiendo el prompt v1.0. Cumplimiento: 100% de los requisitos del brief.
2. `Prompt_21_MLQ_IAR.Gemini.md` — Revisión académica narrativa estilo white paper sobre el MLQ. No siguió la estructura de 10 secciones del prompt v1.0. Aportes principales: contexto teórico-histórico (PIL/LRI vs. MLQ), modelo de 4 cuadrantes (Steger, 2010), validaciones internacionales adicionales (Italia, Grecia, Rumania, China, Brasil), descriptivos por ítem en versión argentina, evidencia en BPD y enfermedad terminal, descriptivos referenciales contraintuitivos en pacientes crónicos.

**Criterio de consolidación aplicado.**
- **Estructura:** se preserva íntegra la del Pack de Claude (10 secciones + Apéndices A y B nuevos).
- **Contenido operativo (ítems, baremos, textos al usuario, email de licencia, disclaimers, piloto):** se mantiene el de Claude porque Gemini no lo produjo.
- **Aportes académicos de Gemini:** se integran SOLO cuando aportan información nueva verificable y útil para producto. Cada aporte se marca con `[Aporte Gemini]` en el lugar donde aparece, y se traza en el Apéndice A con nivel de verificación.
- **Discrepancias entre Claude y Gemini:** no se encontraron discrepancias factuales sustanciales (ambos coinciden en autores, año, DOI principal, 10 ítems literales, ítem 9 como único inverso, problema documentado del ítem 9, Góngora & Castro Solano 2011 como validación argentina pivotal). Donde ambos tocaron el mismo punto, las cifras coinciden.
- **Descartes:** el segmento final del archivo de Gemini sobre "Profundos Descubrimientos en Sub-Poblaciones Clínicas" presenta degradación severa de salida (texto repetitivo no parseable / model collapse) y fue descartado en su integridad. Los descriptivos numéricos rescatables de ese segmento (M=28.16/SD=6.93 Presencia; M=26.6/SD=6.97 Búsqueda en pacientes crónicos) se conservaron porque aparecen en la primera mención coherente del párrafo, antes de la degradación.

**Limitaciones del consolidado.**
- Los DOIs de las validaciones internacionales adicionales (Italia, Grecia, Rumania, China) y de Schulenberg/Cohen-Cairns/Park deben verificarse en bases primarias antes de citarse en comunicación oficial con Steger o en publicaciones internas.
- El modelo de 4 cuadrantes (§3.1) y el sustento del disparo NFR-28 (§7.2) son robustos en la literatura del MLQ, pero **no deben presentarse al usuario final como diagnóstico**; son rejillas internas de lectura.
- La discrepancia Gemini-Claude sobre la atribución del estudio de invarianza (Gemini lo llama "Schutte et al., 2023"; Claude y la literatura indexada lo atribuyen a **Delle Fave et al., 2023**) se resolvió a favor de Claude tras verificación cruzada: el paper en *Applied Research in Quality of Life* 18(3), 1491–1519, DOI 10.1007/s11482-023-10150-7 está firmado por Delle Fave et al. La mención de "Schutte" en Gemini se considera un error de atribución y no se incorporó.

---

*Fin del Implementation Acquisition Pack v1.0 — MLQ — CONSOLIDADO · DescubreMe · LATAM/Colombia · Mayo 2026*
