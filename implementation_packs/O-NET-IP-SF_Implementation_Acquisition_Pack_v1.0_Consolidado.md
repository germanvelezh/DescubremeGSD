# Implementation Acquisition Pack v1.0 — O*NET Interest Profiler Short Form (60 ítems, RIASEC) — CONSOLIDADO
**Producto destino:** DescubreMe (LATAM, foco Colombia) · **B2C Free MVP1/v1.5 + B2C Paid USD 19 + B2B-A + Ikigai Premium** · **Q1 2027**
**Versión del consolidado:** 1.0 · **Fecha:** mayo 2026
**Insumos:** `Prompt_12_O-NET-IP-SF_IAR.Claude.md` (Implementation Acquisition Pack completo, 10 secciones) + `Prompt_12_O-NET-IP-SF_IAR.Gemini.md` (revisión académica narrativa con aportes psicométricos complementarios y validaciones internacionales)
**Idiomas:** español neutro (metadatos y notas internas) / español Colombia (Secciones 5 y 7)

> **Nota metodológica del consolidado.** Claude entregó el Pack completo siguiendo el prompt v1.0 al pie de la letra (10 secciones operativas, 60 ítems literales, atribución legal del O*NET corregida vs. brief inicial, textos es-CO, piloto cognitivo y referencias APA 7). Gemini entregó una revisión académica narrativa estilo white paper que NO cumple la estructura de 10 secciones del prompt, pero aporta contexto psicométrico complementario: detalle del modelo IRT (Birnbaum 2-parámetros) usado en la selección de ítems, validación alemana del IP-SF (N = 276 + N = 672) con replicación de estructura circular, descripción del re-diseño "Career Starter" vs. "Standard" de marzo 2024, justificación cuantitativa de la migración a anclajes Emoji vía Doubly MANOVA + Kappa, contraste con la versión Mini-IP de 30 ítems, y contexto sobre My Next Move for Veterans y Sección 508. Este consolidado usa el Pack de Claude como base estructural completa e inyecta los aportes verificables de Gemini con la marca `[Aporte Gemini]`. La trazabilidad del origen de cada bloque está en el **Apéndice A**.

---

## TABLA DE COBERTURA (requisitos explícitos del brief vs. entrega)

| Requisito | Sección | Cobertura |
|---|---|---|
| Portada y metadatos + estado de bloqueadores | §0 | OK |
| Plan adquisición banco de ítems + lista literal de 60 ítems en inglés con # SF, # LF y dimensión | §1 | OK |
| Adaptaciones al español (Mi Próximo Paso EE. UU., Mudarra España 2007, Pasian Brasil 2020) + propuesta es-CO | §2 | OK |
| Baremos publicados (EE. UU. desarrollo, EE. UU. estabilidad, EE. UU. encarcelados, EE. UU. secundaria, España LF) | §3 | OK con limitación (percentiles Tabla 14 marcados [sin fuente verificada]) |
| Ítems inversos numerados (caso especial: ninguno, todos directos) | §4 | OK |
| 18 textos es-CO (6 dimensiones × 3 bandas BAJO/MEDIO/ALTO) | §5 | OK (18/18) |
| Plan licencia (USDOL/ETA; CC BY-ND 4.0 o O*NET Tools Developer License; email, atribución exacta, Plan B) | §6 | OK |
| Disclaimers pre/post + items sensibles (no aplican por contenido) + mensaje contención + líneas Colombia | §7 | OK |
| Piloto cognitivo Colombia (muestra, think-aloud, criterios, entregables) | §8 | OK |
| ≥ 3 gaps y preguntas abiertas | §9 | OK (6) |
| ≥ 10 referencias APA 7 con DOI/URL | §10 | OK (19) |
| Marcadores Hecho/Inferencia/Opinión profesional | transversal | OK |
| Marcadores [sin fuente verificada] donde aplica | §2, §3 | OK |
| **Aportes consolidados desde Gemini con verificación pendiente** | Apéndice A | OK |

---

## SECCIÓN 0 — PORTADA Y METADATOS

| Campo | Valor |
|---|---|
| **Acrónimo interno DescubreMe** | O-NET-IP-SF |
| **Nombre completo** | O*NET® Interest Profiler Short Form |
| **Autores originales (Short Form)** | Rounds, J., Su, R., Lewis, P., & Rivkin, D. |
| **Editor / Titular** | National Center for O*NET Development — U.S. Department of Labor, Employment and Training Administration (USDOL/ETA) |
| **Año de publicación del SF** | 2010 (forma corta de 60 ítems). El IP Long Form de 180 ítems es de Lewis & Rivkin (1999) |
| **Idioma original** | Inglés (EE. UU.) |
| **Versión oficial en español** | "Perfil de intereses O*NET" disponible en Mi Próximo Paso (miproximopaso.org), USDOL/ETA |
| **Versión a implementar** | Short Form, 60 ítems (10 por dimensión RIASEC), formato web con escala Likert de 5 puntos |
| **Constructo medido** | Intereses vocacionales según modelo RIASEC de Holland (1997) |
| **Dimensiones (6)** | Realistic, Investigative, Artistic, Social, Enterprising, Conventional |
| **Escala de respuesta** | 5 puntos: 0 = Strongly dislike / Me disgusta mucho → 4 = Strongly like / Me gusta mucho (puntaje 0–40 por dimensión) |
| **Tiempo de aplicación** | 5–20 minutos (web). Estimación DescubreMe: 4–7 min |
| **Mapeo a ocupaciones** | Vinculación con perfiles ocupacionales O*NET-SOC (1.016 ocupaciones en O*NET 30.2, febrero 2026) |
| **Productos destino DescubreMe** | B2C Free MVP1/v1.5 · B2C Paid USD 19/v1.5 · B2B-A track empresarial · Ikigai Premium (módulo intereses) |
| **Estatus legal** | **CORREGIDO vs. brief inicial.** No es dominio público estricto. Doble licencia de USDOL/ETA: (a) **CC BY-ND 4.0** para uso verbatim, o (b) **O*NET Tools Developer License** para adaptaciones. Sin costo monetario. |

**Resumen ejecutivo.** El O*NET Interest Profiler Short Form es el único instrumento vocacional viable para DescubreMe v1.5 tras descartar el Strong Interest Inventory (licencia comercial restrictiva con CPP/PMI), el Personal Globe Inventory (PGI; uso académico con autorización de autor, menos masivo), y el Self-Directed Search (SDS; licencia comercial PAR Inc.). El IP-SF combina (a) cero costo de licencia, (b) sólida base psicométrica con α = 0,78–0,87 por dimensión y test-retest M = 0,82 (Rounds, Su, Lewis & Rivkin, 2010), (c) versión oficial preexistente en español ("Mi Próximo Paso"), y (d) vinculación directa al banco ocupacional O*NET-SOC. El riesgo principal no es legal sino lexical/cultural: dos ítems Sociales y varios Realistas/Convencionales requieren adaptación a vocabulario colombiano.

`[Aporte Gemini]` **Por qué el IP-SF de 60 ítems es la "medida predilecta", no el Mini-IP de 30.** La familia O*NET incluye tres formatos: Long Form (180 ítems, 30 por dimensión, 30–45 min), Short Form (60 ítems, 10 por dimensión, 10–20 min) y Mini-IP (30 ítems, 5 por dimensión, ~5 min). Aunque el Mini-IP es atractivo por velocidad, los propios desarrolladores del O*NET advierten que la reducción a 5 ítems por escala degrada las estimaciones de fiabilidad y contrae el ancho de banda del contenido capturado. El Short Form preserva el "equilibrio óptimo precisión vs. velocidad" y sigue siendo la elección estándar para clínicas, aulas y orientación profesional cuando el tiempo no es restrictivo absoluto. Implicación para DescubreMe: el tier Free puede tolerar 4–7 min sin sacrificar la robustez psicométrica; bajar al Mini-IP solo se justificaría en un widget social o móvil ultra-corto futuro, nunca en el flujo principal.

`[Aporte Gemini]` **Cómo se seleccionaron los 60 ítems.** La depuración del banco de 180 ítems hacia 60 se ejecutó con Teoría de Respuesta al Ítem (IRT), específicamente con la parametrización logística de 2 parámetros de Birnbaum (1968). Se retuvieron únicamente reactivos con alta discriminación (parámetro *a*) y dificultad (parámetro *b*) diversa para cubrir todo el continuo del rasgo; los ítems con tasas de aprobación globales <10% o >75% se descartaron por baja varianza analítica; cualquier reactivo con deltas >0,30 entre subgrupos demográficos paralelos (género, etnia) fue eliminado. Esta nota es relevante para la comunicación con autores y para el copy de UX que explique al usuario por qué un instrumento corto puede mantener precisión.

**Status de bloqueadores:**

| Bloqueador | Estatus | Notas |
|---|---|---|
| Licencia | **READY** | CC BY-ND 4.0 o Developer License, USD 0 |
| Items literales (inglés) | **READY** | Publicados en IPSF_Psychometric.pdf y IPSF_PP.pdf, O*NET Resource Center |
| Items literales (español) | **PARTIAL** | Existe versión oficial Mi Próximo Paso, pero requiere extracción vía API (services.onetcenter.org/ip) y validación lexical para Colombia |
| Baremos | **PARTIAL** | Existen α, M y SD por dimensión en Rounds et al. (2010) y Rounds et al. (2018). **Percentiles exactos por dimensión (Tabla 14 de Rounds 2010) referenciados pero no extraídos** en este pack. Sin baremos colombianos publicados |
| Adaptación cross-cultural en español | **PARTIAL** | Una adaptación española (Mudarra Sánchez, 2003/2007) del Long Form, no del SF. Adaptación al portugués brasileño del SF publicada en 2020. No se encontraron adaptaciones académicas publicadas específicamente colombianas |

---

## SECCIÓN 1 — ACQUISITION PLAN DEL BANCO DE ITEMS

### 1.1 Disponibilidad pública

**Hecho:** Los 60 ítems del O*NET Interest Profiler Short Form están publicados literalmente en dos documentos del O*NET Resource Center:

1. Rounds, J., Su, R., Lewis, P., & Rivkin, D. (2010). *O*NET Interest Profiler Short Form Psychometric Characteristics: Summary*. Apéndice A. URL: https://www.onetcenter.org/dl_files/IPSF_Psychometric.pdf
2. Rounds, J., Hoff, K., Chu, C., Lewis, P., & Gregory, C. (2018). *O*NET Interest Profiler Short Form Paper-and-Pencil Version*. Apéndice B. URL: https://www.onetcenter.org/dl_files/IPSF_PP.pdf

Ambos están bajo CC BY-ND 4.0 (verbatim) o pueden reutilizarse bajo la O*NET Tools Developer License (adaptados). **Inferencia:** la reproducción literal a continuación es compatible con CC BY-ND 4.0 con la atribución correcta indicada en §6.

### Banco oficial de 60 ítems (versión 2018, idéntica a 2010 salvo un ítem Social actualizado por lenguaje "person-first")

**Realistic (R) — 10 ítems**

| # SF | # Long Form | Ítem (inglés, literal) |
|---|---|---|
| R1 | 1 | Build kitchen cabinets |
| R2 | 14 | Lay brick or tile |
| R3 | 26 | Repair household appliances |
| R4 | 49 | Raise fish in a fish hatchery |
| R5 | 61 | Assemble electronic parts |
| R6 | 62 | Drive a truck to deliver packages to offices and homes |
| R7 | 146 | Test the quality of parts before shipment |
| R8 | 158 | Repair and install locks |
| R9 | 169 | Set up and operate machines to make products |
| R10 | 170 | Put out forest fires |

**Investigative (I) — 10 ítems**

| # SF | # LF | Ítem |
|---|---|---|
| I1 | 27 | Develop a new medicine |
| I2 | 39 | Study ways to reduce water pollution |
| I3 | 75 | Conduct chemical experiments |
| I4 | 100 | Study the movement of planets |
| I5 | 111 | Examine blood samples using a microscope |
| I6 | 112 | Investigate the cause of a fire |
| I7 | 135 | Develop a way to better predict the weather |
| I8 | 136 | Work in a biology lab |
| I9 | 147 | Invent a replacement for sugar |
| I10 | 171 | Do laboratory tests to identify diseases |

**Artistic (A) — 10 ítems**

| # SF | # LF | Ítem |
|---|---|---|
| A1 | 29 | Write books or plays |
| A2 | 30 | Play a musical instrument |
| A3 | 54 | Compose or arrange music |
| A4 | 77 | Draw pictures |
| A5 | 90 | Create special effects for movies |
| A6 | 113 | Paint sets for plays |
| A7 | 137 | Write scripts for movies or television shows |
| A8 | 149 | Perform jazz or tap dance |
| A9 | 161 | Sing in a band |
| A10 | 173 | Edit movies |

**Social (S) — 10 ítems**

| # SF | # LF | Ítem |
|---|---|---|
| S1 | 7 | Teach an individual an exercise routine |
| S2 | 20 | Help people with personal or emotional problems |
| S3 | 44 | Give career guidance to people |
| S4 | 67 | Perform rehabilitation therapy |
| S5 | 68 | Do volunteer work at a non-profit organization |
| S6 | 80 | Teach children how to play sports |
| S7 | 92 | Teach sign language to people who are deaf or hard of hearing *(2018; sustituye "people with hearing disabilities" de la versión 2010)* |
| S8 | 104 | Help conduct a group therapy session |
| S9 | 151 | Take care of children at a day-care center |
| S10 | 176 | Teach a high-school class |

**Enterprising (E) — 10 ítems**

| # SF | # LF | Ítem |
|---|---|---|
| E1 | 9 | Buy and sell stocks and bonds |
| E2 | 10 | Manage a retail store |
| E3 | 22 | Operate a beauty salon or barber shop |
| E4 | 93 | Manage a department within a large company |
| E5 | 117 | Start your own business |
| E6 | 118 | Negotiate business contracts |
| E7 | 129 | Represent a client in a lawsuit |
| E8 | 142 | Market a new line of clothing |
| E9 | 154 | Sell merchandise at a department store |
| E10 | 166 | Manage a clothing store |

**Conventional (C) — 10 ítems**

| # SF | # LF | Ítem |
|---|---|---|
| C1 | 11 | Develop a spreadsheet using computer software |
| C2 | 12 | Proofread records or forms |
| C3 | 36 | Install software across computers on a large network *(reformulado en la versión 2018; en 2010 era "Load computer software into a large computer network")* |
| C4 | 60 | Operate a calculator |
| C5 | 96 | Keep shipping and receiving records |
| C6 | 107 | Calculate the wages of employees |
| C7 | 120 | Inventory supplies using a hand-held computer |
| C8 | 155 | Record rent payments |
| C9 | 167 | Keep inventory records |
| C10 | 179 | Stamp, sort, and distribute mail for an organization |

### 1.2 Banco oficial vs. adaptaciones derivadas

**Hecho:** La versión web actual del SF (delivered via My Next Move y Mi Próximo Paso) usa la misma lista de 60 ítems descrita arriba, con una escala de 5 puntos. La versión paper-and-pencil (IPSF_PP, Rounds et al., 2018) usa formato dicotómico (like/dislike) por simplicidad de auto-scoring; tiene los **mismos 60 ítems** pero distinto formato de respuesta.

**Recomendación operativa para DescubreMe:** usar el **formato web de 5 puntos** (escala Likert 0–4 con anclajes emoji opcionales validados por Rounds, Phan, Amrhein & Lewis, 2016). El rango de puntaje por dimensión es 0–40.

`[Aporte Gemini]` **Justificación cuantitativa de los anclajes Emoji.** Rounds, Phan, Amrhein & Lewis (2016) validaron formalmente el reemplazo de etiquetas textuales por emojis faciales mediante dos estudios: (Estudio 1) mapeo de 5 emojis al continuum afectivo "desagrada fuertemente → gusta fuertemente" con criba por porcentaje de categorización intuitiva libre de confusión; (Estudio 2) diseño contrabalanceado N = 569 trabajadores activos con 4 condiciones (Texto→Texto, Emoji→Emoji, Texto→Emoji, Emoji→Texto). Resultados: correlaciones test-retest equivalentes en ambos formatos; Kappa Index of Agreement confirma que el High-Point Code RIASEC asignado es virtualmente idéntico; Doubly MANOVA descarta interacción tiempo × formato × dimensión. Implicación para DescubreMe: usar anclajes emoji en mobile/Free es psicométricamente defendible y reduce carga de lectura.

### 1.3 Estructura del banco

- 60 ítems totales, 10 por cada una de las 6 dimensiones RIASEC.
- **Hecho:** El IP es una **escala de preferencia**, no de personalidad: todos los ítems tienen clave directa. **No existen ítems inversos** (ver §4).
- Formato sintáctico: cada ítem es una actividad laboral en infinitivo (en inglés: imperativo "Build…", "Repair…").
- Sin distribución aleatoria nativa; el orden original mezcla las dimensiones intencionadamente para reducir efectos de set de respuesta. **Inferencia:** la implementación en DescubreMe puede mantener orden fijo (replicable) o aleatorizar por dimensión.
- **`[Aporte Gemini]` Por qué la presentación intercalada de dimensiones:** análisis de componentes principales sobre datos del usuario muestra que la dispersión intencional de ítems entre dimensiones fragmenta la inercia cognitiva del encuestado y suprime sesgos de respuesta tipo "halo" o "endoso automatizado en bloque". DescubreMe debe respetar este orden o, si aleatoriza, mantener intercalado entre dimensiones (no agrupar por dimensión).

### 1.4 Dónde descargar

| Fuente | URL exacta | Contenido |
|---|---|---|
| Reporte psicométrico SF (Rounds et al., 2010) | https://www.onetcenter.org/dl_files/IPSF_Psychometric.pdf | 60 ítems + α + estructura RIASEC |
| Versión paper-and-pencil (Rounds et al., 2018) | https://www.onetcenter.org/dl_files/IPSF_PP.pdf | 60 ítems + scoring + muestras |
| Manual técnico integrado | https://www.onetcenter.org/dl_files/IP_Manual.pdf | Historia completa, capítulos sobre validez, fiabilidad, internacional |
| API Web Services (incluye versión español) | https://services.onetcenter.org/ip | Endpoint programático para questions/scoring |
| Versión española en producción | https://www.miproximopaso.org/explore/ip | Aplicación web con 60 ítems en español |
| Página índice (todos los recursos) | https://www.onetcenter.org/IP.html | Hub oficial |

---

## SECCIÓN 2 — ADAPTACIONES AL ESPAÑOL DISPONIBLES

### Tabla maestra de adaptaciones identificadas

| País / variedad | Autores | Año | Fuente / URL | N muestra | Características clave |
|---|---|---|---|---|---|
| Español de EE. UU. (oficial) | National Center for O*NET Development (USDOL/ETA) | sin fecha publicación, en producción desde 2011+ | https://www.miproximopaso.org/explore/ip | No reportado | Traducción oficial del SF de 60 ítems. Licencia CC BY 4.0 para contenido del sitio; el IP en sí mantiene la licencia Career Exploration Tools. Vocabulario neutro con tendencia a español-EE. UU. ("Perfil de intereses", "Zonas de trabajo") |
| España | Mudarra Sánchez, M. J. | 2003 (tesis UNED); 2007 (Educación XX1, 10, 195–213) | https://portalcientifico.uned.es/documentos/5e1863792999525aa4fac3e9 ; https://doi.org/10.5944/educxx1.1.10.298 | n = 689 (educación secundaria) | Adaptación del **Interest Profiler Long Form** (180 ítems), no del SF, integrada al Sistema de Autoevaluación de Áreas Profesionales. Coeficientes de consistencia α = 0,86–0,93 en las seis escalas RIASEC. Convergente con SDS. **Hecho:** la única adaptación académica al español del IP encontrada |
| Brasil (portugués brasileño; referencia metodológica) | Pasian, S. R., y col. (citados en Avaliação Psicológica) | 2020 | https://pepsic.bvsalud.org/scielo.php?script=sci_arttext&pid=S1516-36872020000100003 | No reportado en snippet | Adaptación del SF al portugués brasileño con evidencias aceptables de validez y fiabilidad. Útil como referencia metodológica para LATAM |
| **`[Aporte Gemini]` Alemania** | The German O*NET Interest Profiler Short Form (referencia Semantic Scholar ff5c/0a416997bd6cba106a6fde147d2bf064a344) | sin año confirmado | https://pdfs.semanticscholar.org/ff5c/0a416997bd6cba106a6fde147d2bf064a344.pdf | N = 276 adultos + N = 672 secundaria | Adaptación al alemán del IP-SF. Consistencias internas comparables a la muestra original EE. UU. Pruebas de aleatorización + escalamiento espacial multidimensional confirman que la estructura circular hexagonal de Holland se replica isométricamente en muestra alemana. Punto de referencia internacional adicional. **[verificar antes de uso]** la cita primaria. |
| México | [sin fuente verificada] de adaptación específica del IP-SF | — | — | — | Sí existen estudios de validez del **SDS** de Holland en estudiantes mexicanos (Fernández Nistal, Mora Soto & Ponce Zaragoza, 2023, EJREP 17(49); CI = 0,65 para Holland, α = 0,765–0,845), pero no del IP-SF específicamente |
| Argentina / Chile / Colombia | [sin fuente verificada] | — | — | — | Búsquedas en Dialnet, Redalyc, ResearchGate, SciELO no devolvieron adaptaciones académicas publicadas y revisadas del IP-SF para estos países |

### 2.1 Recomendación de base para es-CO

**Opinión profesional.** La base de partida óptima para la versión es-CO de DescubreMe es **la traducción oficial Mi Próximo Paso del USDOL/ETA**, por cinco razones:

1. Procede del titular del instrumento, lo que elimina riesgo de derivación no autorizada.
2. Está alineada con el banco de ocupaciones O*NET-SOC traducido al español (taxonomía O*NET-SOC 2019 traducida por el propio Centro O*NET), lo que garantiza coherencia downstream con el motor de matching ocupacional.
3. Es legalmente accesible mediante la O*NET Web Services API en formato programático.
4. Su vocabulario base ya es relativamente neutro (no es español de España).
5. Cualquier ajuste léxico-cultural posterior se documenta como "modificación" bajo la O*NET Tools Developer License, evitando re-traducir desde cero.

**Recomendación práctica:** descargar los 60 ítems en español desde la API (`https://services.onetcenter.org/ws/mnm/interestprofiler/questions` con parámetro `Accept-Language: es` o equivalente; **verificar el parámetro exacto en la documentación actual de la API**) y aplicar el plan de modificaciones léxicas de §2.2.

### 2.2 Modificaciones léxicas anticipadas para Colombia

Estas son hipótesis a validar en piloto cognitivo (§8). La lista parte del análisis del vocabulario laboral colombiano y las divergencias documentadas entre español-EE. UU., español de España y español andino-caribeño.

| Ítem | Texto previsible Mi Próximo Paso (inferido / verificar) | Riesgo lexical para Colombia | Propuesta es-CO |
|---|---|---|---|
| R1 Build kitchen cabinets | "Construir gabinetes de cocina" | "Gabinete" es término correcto en Colombia. Bajo riesgo | Mantener |
| R6 Drive a truck to deliver packages | "Conducir un camión para repartir paquetes…" | "Conducir" vs. "manejar"; en Colombia se usa más "manejar" en habla cotidiana | "Manejar un camión para entregar paquetes a oficinas y casas" |
| R8 Repair and install locks | "Reparar e instalar cerraduras" | "Cerradura" es comprensible; "chapa" es coloquial colombiano. Bajo riesgo | Mantener "cerraduras" |
| R9 Set up and operate machines | "Configurar y operar máquinas para hacer productos" | "Configurar" puede sonar a TI; "instalar" sería ambiguo | "Poner a punto y operar máquinas para fabricar productos" |
| I7 Develop a way to better predict the weather | "Desarrollar un método para predecir mejor el clima" | "Tiempo" vs. "clima": en Colombia "el clima" cubre ambos significados | Mantener "clima" |
| A8 Perform jazz or tap dance | "Bailar jazz o claqué" | "Claqué" es término de España; en Colombia se entiende pero es poco usado. "Tap" es anglicismo común | "Bailar jazz o tap" |
| E1 Buy and sell stocks and bonds | "Comprar y vender acciones y bonos" | "Acciones" y "bonos" son correctos | Mantener |
| E3 Operate a beauty salon or barber shop | "Administrar un salón de belleza o peluquería" | "Salón de belleza" es correcto; "peluquería" funciona para ambos sexos en Colombia. "Barber shop" → "barbería" es el término reciente | "Administrar un salón de belleza o una barbería" |
| C1 Develop a spreadsheet using computer software | "Crear una hoja de cálculo usando un programa de computadora" | "Ordenador" (España) NO usar; "computadora" es aceptable; "computador" es la forma masculina más usada en Colombia | "Crear una hoja de cálculo en un programa de computador" |
| C3 Install software across computers on a large network | "Instalar software en computadoras de una red grande" | Igual al anterior | "Instalar software en los computadores de una red grande" |
| C4 Operate a calculator | "Usar una calculadora" | Sin problema | Mantener |
| (varios) | "fontanero" (España) | NO USAR en Colombia | Usar "plomero" si aparece |
| (varios) | "ordenador" (España) | NO USAR | "Computador" |
| (varios) | "móvil" (España) | Aceptable; "celular" es preferido | "Celular" |
| (varios) | "coche" (España) | NO USAR | "Carro" |

**Inferencia:** dado que Mi Próximo Paso está construido para hispanohablantes en EE. UU. (mayoritariamente mexicano-americanos y caribeños), su léxico **ya está más cerca del colombiano que del español peninsular**. El esfuerzo de adaptación es bajo (estimado ≤ 10 ítems con cambio léxico, ninguno con cambio conceptual).

**Ocupaciones potencialmente marginales en Colombia (a revisar en piloto):** R4 ("Raise fish in a fish hatchery" — la piscicultura comercial en estanques existe pero no es ocupación reconocible por mayoría de usuarios urbanos); R10 ("Put out forest fires" — bombero forestal es ocupación reconocida pero infrecuente fuera de zonas de páramo); I4 ("Study the movement of planets" — astrónomo profesional muy escaso en Colombia).

---

## SECCIÓN 3 — BAREMOS PUBLICADOS

### Tabla maestra de datos psicométricos publicados

| Muestra | Fuente (APA 7) | N | Estadísticos disponibles | Comentario |
|---|---|---|---|---|
| Desarrollo (EE. UU., 1999) | Rounds, J., Su, R., Lewis, P., & Rivkin, D. (2010). *O*NET Interest Profiler Short Form psychometric characteristics: Summary.* National Center for O*NET Development. https://www.onetcenter.org/reports/IPSF_Psychometric.html | 1.061 | α por escala (Tabla 3); M y SD por escala (Tablas 10 y 12); **Tabla 14: Percentile ranks of RIASEC Scale Scores [RESUELTO 2026-05-16: extracción literal + derivación combined-sex + percentiles fijos p10/p25/p50/p75/p90/p95/p99 en `implementation_packs/O-NET-IP-SF_v1.0_Consolidado_ADDENDUM_Tabla14.md`. Nota crítica: Tabla 14 está en escala paper-and-pencil 0-10; DescubreMe usa 5-point 0-40 → ver §E del addendum, 3 opciones de conversión, decisión pendiente DD-57]** | Muestra heterogénea: 41% hombres / 59% mujeres; 59% blancos no-hispanos, 25% afroamericanos, 10% hispanos, 6% otros; 4 estados de EE. UU. |
| Estabilidad (test-retest) | Rounds, J., Su, R., Lewis, P., & Rivkin, D. (2010). Tabla 4. | 132 (125 con datos completos) | α en T1 y T2, M y SD en T1 y T2 (escala proporción 0–1), correlaciones T1-T2 | M y SD reportados como proporción de ítems endosados, no en 0–40 |
| Encarcelados (EE. UU., 2018) | Rounds, J., Hoff, K., Chu, C., Lewis, P., & Gregory, C. (2018). *O*NET Interest Profiler Short Form Paper-and-Pencil Version.* National Center for O*NET Development. https://www.onetcenter.org/dl_files/IPSF_PP.pdf | 421 | α por escala, M y SD en escala P&P 0–10 | Versión P&P dicotómica, no comparable directamente con web |
| Estudiantes secundaria (EE. UU., 2018) | Rounds et al. (2018) | 140 | Cross-classification only | Muestra pequeña, sin baremos completos |
| España (Long Form) | Mudarra Sánchez, M. J. (2007). *Educación XX1, 10*, 195–213. https://doi.org/10.5944/educxx1.1.10.298 | 689 | α por escala (no baremos por género) | α = 0,86 a 0,93. Adaptación del IP **Long Form** (180 ítems), no SF |
| **`[Aporte Gemini]` Alemania** | The German O*NET Interest Profiler Short Form (Semantic Scholar pdf) | 276 + 672 | Consistencias internas adecuadas; pruebas de aleatorización + MDS confirman estructura circular RIASEC | Validación transcultural adicional; refuerza universalidad del modelo. **[verificar antes de uso]** cita primaria. |
| Colombia | [sin fuente verificada] | — | — | No se identificaron baremos colombianos publicados del IP-SF |
| México (IP-SF) | [sin fuente verificada] | — | — | Sí existen baremos del SDS en estudiantes mexicanos (Fernández Nistal et al., 2023), pero no del IP-SF |

### Tabla 3.1 — Coeficientes de consistencia interna (α de Cronbach) por dimensión, IP-SF Short Form

*Fuente: Rounds, Su, Lewis & Rivkin (2010), Tabla 3, N = 1.061. Reproducido literalmente.*

| Dimensión | α SF (10 ítems) | α LF (30 ítems) |
|---|---|---|
| Realistic (R) | 0,78 | 0,93 |
| Investigative (I) | 0,82 | 0,94 |
| Artistic (A) | 0,78 | 0,94 |
| Social (S) | 0,78 | 0,95 |
| Enterprising (E) | 0,87 | 0,93 |
| Conventional (C) | 0,83 | 0,96 |
| **M** | **0,81** | **0,94** |

### Tabla 3.2 — Estabilidad test-retest, IP-SF

*Fuente: Rounds et al. (2010), Tabla 5, N = 125, intervalo aproximado 4–6 semanas.*

| Dimensión | r SF | r LF |
|---|---|---|
| R | 0,79 | 0,87 |
| I | 0,78 | 0,81 |
| A | 0,82 | 0,88 |
| S | 0,85 | 0,92 |
| E | 0,82 | 0,88 |
| C | 0,86 | 0,91 |
| **M** | **0,82** | **0,88** |

### Tabla 3.3 — Medias, SD y α de la muestra de estabilidad SF (escala proporción 0–1; N=125)

*Fuente: Rounds et al. (2010), Tabla 4. Nota: los valores están en escala proporción de ítems endosados (rango 0–1), NO en escala 0–40 de la web actual.*

| Dimensión | M (T1) | SD (T1) | α (T1) | M (T2) | SD (T2) | α (T2) |
|---|---|---|---|---|---|---|
| R | 0,25 | 0,25 | 0,78 | 0,25 | 0,27 | 0,82 |
| I | 0,41 | 0,32 | 0,87 | 0,41 | 0,31 | 0,86 |
| A | 0,44 | 0,32 | 0,85 | 0,45 | 0,34 | 0,88 |
| S | 0,53 | 0,31 | 0,83 | 0,50 | 0,32 | 0,85 |
| E | 0,40 | 0,28 | 0,79 | 0,40 | 0,30 | 0,83 |
| C | 0,46 | 0,35 | 0,89 | 0,45 | 0,36 | 0,90 |

**Inferencia:** los valores de M están expresados como proporción (0–1) en la muestra de desarrollo. Para conversión aproximada a la escala web (0–40), multiplicar por 40, pero la conversión es imperfecta porque la versión original era dicotómica. **Recomendación:** **no usar los M de Rounds 2010 como baremos numéricos directos** para DescubreMe; usarlos solo para comparación de perfil relativo entre dimensiones.

### Tabla 3.4 — Diferencias de género (d de Cohen), IP-SF

*Fuente: Rounds et al. (2010), Tabla 15. Valores negativos = favorece mujeres; positivos = favorece hombres.*

| Dimensión | d (SF) | d (LF) |
|---|---|---|
| R | +0,86 | +0,86 |
| I | +0,26 | +0,26 |
| A | 0,00 | –0,02 |
| S | –0,59 | –0,59 |
| E | –0,07 | –0,12 |
| C | –0,36 | –0,53 |

`[Aporte Gemini]` **Lectura cruzada con la muestra encarcelada (Rounds et al., 2018, N = 421).** En la muestra carcelaria los varones mostraron afinidad fuerte por Realistic, mientras la cohorte femenina puntuó más alto en Social, Conventional, Investigative y Enterprising. La paridad en Artistic se mantuvo. Importante: este patrón **invierte** parcialmente el efecto clásico de Su, Rounds y Armstrong (2009) — donde varones puntuaban más alto en Investigative y mujeres en Artistic. Esto evidencia que las brechas de género en intereses son sensibles al entorno (privación, hiper-regulación) y refuerza la decisión de §9.5 de NO aplicar baremos separados por género en DescubreMe Colombia.

**Percentiles exactos (Tabla 14 de Rounds 2010): [sin fuente verificada]** en este pack. El reporte declara la existencia de "Percentile Ranks, Means, and Standard Deviations of RIASEC Scale Scores for the Interest Profiler Short Form" (Tabla 14) y "Effect Sizes of Gender Differences" (Tabla 15), pero el detalle numérico de percentiles por dimensión no se extrajo en esta ronda de investigación. **Acción recomendada:** abrir IPSF_Psychometric.pdf, p. 39, y transcribir la tabla en una iteración v1.1 de este pack.

### 3.1 Recomendación de baremo provisional para LATAM

**Opinión profesional.** Para la fase B2C Free MVP1/v1.5, DescubreMe debe usar una **interpretación ipsativa** (el percentil de cada dimensión se calcula dentro del propio perfil del usuario, no contra una norma poblacional). Las bandas BAJO / MEDIO / ALTO se definen relativamente:

- **BAJO** = dimensión cuya puntuación queda ≥ 1,0 DT por debajo de la media del usuario en sus 6 dimensiones (corresponde aproximadamente al percentil ≤ 16 intra-perfil).
- **MEDIO** = dimensión dentro de ±1,0 DT de la media intra-perfil (percentiles 17–83).
- **ALTO** = dimensión ≥ 1,0 DT por encima de la media intra-perfil (percentil ≥ 84).

Esto evita el problema de inexistencia de baremos colombianos y es consistente con la práctica del propio O*NET, cuyo motor de matching usa **correlaciones de perfil (Pearson)** entre el perfil del usuario y el de cada ocupación, no puntajes absolutos (Gregory & Lewis, 2016).

Para v1.5 Paid y B2B-A track, una vez que DescubreMe acumule ≥ 1.500 perfiles colombianos, generar baremos normativos propios (§3.2).

### 3.2 Roadmap para baremos colombianos

| Hito | Criterio de avance | Estimación temporal |
|---|---|---|
| Recolección piloto cognitivo | n = 30 colombianos, think-aloud (§8) | Mes 1 |
| Validación lexical cuantitativa | n = 150–300, perfiles completos sin think-aloud | Mes 2–3 |
| Cálculo α por dimensión es-CO | Aceptar si α ≥ 0,70 por dimensión | Mes 3 |
| Análisis estructural RIASEC | Test de aleatorización de orden (Rounds, Tracey & Hubert, 1992); aceptar si CI ≥ 0,60 | Mes 4 |
| Generación de baremos provisionales | n ≥ 500 perfiles auto-seleccionados | Mes 6 |
| Baremos normativos finales por edad/educación | n ≥ 1.500, estratificada por edad (18–25, 26–40, 41+) y nivel educativo | Mes 12 |

---

## SECCIÓN 4 — ITEMS INVERSOS NUMERADOS

**Hecho:** El O*NET Interest Profiler es una escala de **preferencia/interés**, no una escala de personalidad ni de actitudes. Cada ítem describe una actividad laboral y solicita al respondiente que indique cuánto le gusta o disgusta. **No hay ítems inversos** porque la dirección semántica es uniforme: una puntuación más alta en cualquier ítem indica mayor preferencia por esa actividad y, por extensión, por la dimensión RIASEC a la que pertenece.

| Item # | Dimensión | Clave de codificación | Notas |
|---|---|---|---|
| R1–R10 (10) | Realistic | **Directa** | Suma simple de respuestas 0–4 |
| I1–I10 (10) | Investigative | **Directa** | |
| A1–A10 (10) | Artistic | **Directa** | |
| S1–S10 (10) | Social | **Directa** | |
| E1–E10 (10) | Enterprising | **Directa** | |
| C1–C10 (10) | Conventional | **Directa** | |

**Implicación para la arquitectura plugin DescubreMe:** el archivo de configuración del plugin O-NET-IP-SF debe declarar `reverse_keyed_items: []` (array vacío) y `scoring: sum_per_dimension`. No requiere lógica de inversión en el motor de scoring.

---

## SECCIÓN 5 — TEXTOS DE INTERPRETACIÓN AL USUARIO (es-CO)

Cada bloque sigue los principios obligatorios: descriptivo, no etiquetador, no clínico, no determinista, tuteo cordial colombiano, máx. 80 palabras por banda, incluye descripción de banda + ejemplo conductual + invitación a reflexión.

### 5.1 Realistic (Realista)

**Descripción técnica interna.** Dimensión que captura preferencia por actividades concretas, físicas, mecánicas o con herramientas; trabajo al aire libre, con animales, máquinas o materiales tangibles. Baja apetencia por trabajo administrativo o intensamente interpersonal.

- **BAJO (≤ p16):** Las actividades mecánicas, físicas o de trabajo manual no suelen llamarte la atención. Prefieres que tu día a día involucre ideas, personas o procesos antes que herramientas o maquinaria. Esto sugiere que valoras entornos donde lo tangible o lo físico ocupe un lugar secundario. ¿Reconoces esto en cómo eliges tus pasatiempos o tareas del hogar?

- **MEDIO (p17–83):** El trabajo manual o técnico te resulta interesante en ciertos momentos, pero no es lo que define tu día ideal. Tiendes a apreciar la utilidad de saber reparar algo o usar una herramienta, sin que sea tu motor principal. ¿Hay actividades prácticas en las que disfrutas perderte un rato y otras que prefieres delegar?

- **ALTO (≥ p84):** Las actividades concretas con resultados visibles —reparar, construir, operar maquinaria, trabajar al aire libre o con animales— te atraen con fuerza. Tiendes a sentirte más vivo cuando ves un producto físico al final del día. Esto sugiere que valoras la destreza manual y los entornos prácticos. ¿En qué tareas físicas pierdes la noción del tiempo?

### 5.2 Investigative (Investigador)

**Descripción técnica interna.** Preferencia por actividades de pensamiento abstracto, análisis, investigación científica, resolución de problemas complejos, trabajo con ideas y datos.

- **BAJO (≤ p16):** El análisis abstracto, la investigación científica o los problemas teóricos no son tu zona de confort principal. Tiendes a preferir actividades con resultados rápidos o aplicaciones más directas. Esto sugiere que valoras la acción o la interacción por encima de la reflexión prolongada. ¿Notas que pierdes interés cuando una tarea exige análisis muy detallado?

- **MEDIO (p17–83):** Disfrutas pensar y analizar cuando el tema te interesa, sin que la investigación sea tu vocación dominante. Tiendes a equilibrar curiosidad intelectual con otras formas de involucrarte con el mundo. ¿Qué temas te llevan a leer, investigar o profundizar por gusto propio?

- **ALTO (≥ p84):** Las preguntas complejas, la búsqueda de explicaciones y el trabajo con datos o ideas te resultan profundamente atractivos. Tiendes a sentirte cómodo en ambientes donde se valora la curiosidad y el rigor. Esto sugiere que disfrutas profesiones o proyectos centrados en descubrir, analizar o investigar. ¿En qué tema podrías leer durante horas sin notarlo?

### 5.3 Artistic (Artístico)

**Descripción técnica interna.** Preferencia por la expresión creativa, originalidad, ambientes poco estructurados, trabajo con formas, sonidos, palabras o imágenes.

- **BAJO (≤ p16):** Las actividades de expresión creativa o artística no suelen estar entre tus preferencias principales. Tiendes a sentirte más cómodo cuando hay reglas claras, procesos definidos o resultados medibles. Esto sugiere que valoras la estructura y la previsibilidad. ¿Reconoces esto en cómo organizas tu trabajo o tus aficiones?

- **MEDIO (p17–83):** Aprecias lo creativo cuando te conecta con algo significativo, pero no necesitas crear constantemente para estar bien. Tiendes a moverte entre lo estructurado y lo expresivo según el momento. ¿Hay formas de creatividad que disfrutas como hobby, aunque no las elijas como profesión?

- **ALTO (≥ p84):** La creación, la expresión y los ambientes poco estructurados te resultan altamente atractivos. Tiendes a buscar libertad para imaginar, componer, escribir o diseñar. Esto sugiere que valoras la originalidad y la autonomía creativa. ¿Qué proyectos artísticos o creativos te haría falta hacer si tuvieras tiempo libre?

### 5.4 Social (Social)

**Descripción técnica interna.** Preferencia por ayudar, enseñar, cuidar, asesorar; trabajo con personas en lugar de objetos o datos.

- **BAJO (≤ p16):** Las actividades centradas en ayudar, enseñar o cuidar directamente a otros no son las que más te energizan. Tiendes a preferir trabajos donde el foco esté en ideas, sistemas o resultados antes que en la interacción humana intensa. Esto sugiere que valoras espacios con menor demanda interpersonal. ¿Cómo recargas energía después de jornadas muy sociales?

- **MEDIO (p17–83):** Te involucras con otras personas cuando hay propósito o vínculo claro, pero no buscas la interacción continua como rasgo principal. Tiendes a alternar momentos de colaboración con momentos de trabajo más autónomo. ¿En qué contextos disfrutas más ayudar o enseñar a alguien?

- **ALTO (≥ p84):** Acompañar, enseñar, asesorar o cuidar a otras personas te resulta naturalmente significativo. Tiendes a sentirte útil y a recibir energía cuando el impacto humano del trabajo es visible. Esto sugiere que valoras profesiones y proyectos donde el centro sea el bienestar o aprendizaje de otros. ¿A quién has ayudado últimamente y qué sentiste?

### 5.5 Enterprising (Emprendedor)

**Descripción técnica interna.** Preferencia por liderar, persuadir, vender, asumir riesgos, iniciar y dirigir proyectos o negocios.

- **BAJO (≤ p16):** Liderar grupos, negociar o vender no son actividades que te llamen especialmente. Tiendes a sentirte más cómodo en roles de apoyo, ejecución o análisis que en roles de visibilidad y persuasión. Esto sugiere que valoras la profundidad técnica o la colaboración tranquila por encima de la exposición. ¿En qué momentos prefieres estar al frente y en cuáles no?

- **MEDIO (p17–83):** Asumes el liderazgo cuando es necesario y disfrutas convencer o iniciar proyectos en ciertos temas. Tiendes a moverte entre roles de iniciativa y roles de soporte según el contexto. ¿En qué tipo de proyectos te has descubierto tomando la delantera?

- **ALTO (≥ p84):** Liderar, persuadir, emprender, asumir riesgos calculados o impulsar iniciativas te energiza. Tiendes a sentirte cómodo siendo visible y proponiendo dirección. Esto sugiere que valoras la influencia y la autonomía para construir cosas nuevas. ¿Qué idea has tenido recientemente que te gustaría llevar a la práctica?

### 5.6 Conventional (Convencional)

**Descripción técnica interna.** Preferencia por la organización, atención al detalle, trabajo con datos, sistemas, registros, procedimientos y precisión.

- **BAJO (≤ p16):** Las tareas con foco en orden, registros, procedimientos detallados o rutina no son tus favoritas. Tiendes a preferir entornos donde haya variedad, flexibilidad o creación por encima de la precisión administrativa. Esto sugiere que valoras la espontaneidad o la innovación más que la estructura. ¿Qué tipo de tareas administrativas terminas posponiendo?

- **MEDIO (p17–83):** Aprecias el orden cuando facilita el trabajo, sin que la rutina detallada sea lo que más te motiva. Tiendes a equilibrar organización con otras formas de aporte. ¿En qué áreas de tu vida te gusta mantener todo en orden y en cuáles prefieres más libertad?

- **ALTO (≥ p84):** Te resulta natural y satisfactorio trabajar con datos, sistemas, registros y procedimientos claros. Tiendes a notar errores que otros pasan por alto y disfrutas dejar las cosas bien organizadas. Esto sugiere que valoras la precisión y la confiabilidad. ¿En qué tareas eres la persona a la que otros acuden por tu orden?

---

## SECCIÓN 6 — LICENSE ACQUISITION PLAN

### 6.1 Titular y estatus legal correcto

**Hecho (corrección al brief inicial):** El O*NET Interest Profiler **no es estrictamente dominio público**. Es una obra del U.S. Department of Labor, Employment and Training Administration (USDOL/ETA), desarrollada por el National Center for O*NET Development. Aunque las obras del gobierno federal de EE. UU. están en dominio público dentro de EE. UU. (17 U.S.C. § 105), el USDOL ha optado por **licenciar el Interest Profiler bajo un esquema dual**:

1. **Creative Commons Attribution-NoDerivatives 4.0 International (CC BY-ND 4.0)** — para redistribución verbatim, sin modificaciones.
2. **O*NET Tools Developer License** — para adaptación, traducción, modificación o integración en aplicaciones derivadas. Esta licencia exige conducir un "Validation Study" alineado con los *Standards for Educational and Psychological Testing* (AERA, APA & NCME) si se modifica el propósito original del instrumento.

Documentación de licencia: https://www.onetcenter.org/license_tools.html y https://www.onetcenter.org/license_toolsdev.html

### 6.2 Práctica histórica

**Hecho:** Cientos de aplicaciones comerciales, ONGs, sistemas estatales de empleo y desarrolladores privados usan el IP libremente desde 2001 con atribución correcta. La página oficial invita explícitamente a "register your use of the Interest Profiler" en https://www.onetcenter.org/IP.html (registro voluntario, no licencia condicionante).

`[Aporte Gemini]` **Precedente de propagación digital masiva.** El IP-SF se distribuye gratuitamente a desarrolladores externos vía tres canales: (a) widgets HTML embeddables (bloques portátiles para incrustar en sitios web del cliente), (b) llamadas crudas a la O*NET Web Services API en JSON (preguntas, scoring, perfiles), (c) deep-links unidireccionales hacia el portal nativo My Next Move. DescubreMe puede elegir cualquiera de los tres modos; para B2C Paid y B2B-A se recomienda la opción (b) (API JSON) para tener control total de UX y persistir los datos del usuario en la base interna.

`[Aporte Gemini]` **Reportes "Standard" vs "Career Starter" (marzo de 2024).** En su parche de marzo 2024, el consorcio O*NET bifurcó los reportes PDF del IP-SF en dos arquitecturas: (a) **Standard Version**, para adultos en transición laboral o re-orientación de mitad de carrera; (b) **Career Starter**, para jóvenes sin experiencia laboral previa, orientado a Zonas Laborales 1–2 antes de extrapolar hacia jerarquías ejecutivas. Implicación para DescubreMe: si el producto detecta usuario joven (18–22, sin experiencia), el reporte exportado puede inspirarse en la lógica "Career Starter" (focus en Job Zones bajas + roadmap formativo). No es obligatorio bajo licencia, pero es buena práctica heredada del titular.

### 6.3 Pasos para DescubreMe

Dado que DescubreMe planea **(a) traducir/adaptar al español colombiano**, **(b) integrar el instrumento en un producto comercial freemium**, y **(c) modificar formato visual y textos de retroalimentación**, el camino legal es:

1. **Elegir la O*NET Tools Developer License** (no la CC BY-ND, porque sí hay adaptaciones).
2. Aceptar las condiciones de uso al primer uso (la licencia es de aceptación implícita por uso).
3. Cumplir con la **atribución exacta** requerida en cada pantalla donde se presente el instrumento o resultados (ver §6.7).
4. Conducir un **Validation Study** alineado con los Standards (AERA, APA & NCME). El piloto cognitivo de §8 más los análisis de fiabilidad/estructura con n ≥ 300 cumplen este requisito mínimamente, aunque la robustez se eleva con n ≥ 500.
5. Mantener un **registro voluntario** ante O*NET completando el formulario en https://www.onetcenter.org/register.html
6. Notificar cortésmente al equipo O*NET por email (ver §6.4) para abrir un canal de soporte técnico.

### 6.4 Borrador de email a O*NET (copy-paste, inglés)

**Para:** onet@onetcenter.org
**Asunto:** Notification of O*NET Interest Profiler Short Form integration — DescubreMe (LATAM)

```
Dear National Center for O*NET Development Team,

I am writing on behalf of DescubreMe, a Colombia-based vocational self-discovery
web platform serving Spanish-speaking adults in Latin America (primary market:
Colombia; secondary: Mexico and Argentina).

We are preparing to integrate the O*NET Interest Profiler Short Form (60-item,
web-based, 5-point Likert version) into our freemium B2C product as a
non-clinical, non-selection career exploration tool. We will operate under the
O*NET Tools Developer License, since we plan to (a) adapt the existing Spanish
("Mi Próximo Paso") wording to Colombian Spanish where minor lexical
modifications improve cultural fit (e.g., "computador" instead of
"computadora"), and (b) embed the instrument within a broader self-knowledge
product with our own interpretation texts.

We commit to:
1. Displaying the required attribution on every page where the Interest Profiler
   or its results appear.
2. Conducting a cognitive pilot (n ≈ 30) and a quantitative lexical validation
   (n ≥ 300) consistent with the Standards for Educational and Psychological
   Testing (AERA, APA & NCME).
3. Maintaining the original RIASEC structure, scoring algorithm and 60-item
   content; modifications are strictly lexical.
4. Sharing aggregated psychometric findings (alpha, structural fit) with the
   O*NET Center upon request.

We have two specific technical questions:

a) Is the Spanish-language version of the 60 items available via the O*NET Web
   Services API (services.onetcenter.org/ip), or do we need to extract them
   from the Mi Próximo Paso production site?

b) Are there any updated psychometric reports or norms beyond Rounds, Su,
   Lewis & Rivkin (2010) that we should consult before our v1.5 launch?

We are also registering our use of the Interest Profiler via the form at
onetcenter.org/register.html.

Thank you for the public service O*NET provides; your work meaningfully
expands access to evidence-based career exploration in our region.

Best regards,
[Nombre del responsable de producto DescubreMe]
[Cargo]
DescubreMe — [URL]
[Email de contacto]
```

### 6.5 Costo esperado

**USD 0.** Tanto la CC BY-ND 4.0 como la O*NET Tools Developer License son gratuitas.

### 6.6 Plan B

**No aplica como contingencia legal.** La licencia no requiere aprobación previa. Si por una improbable razón política se restringiera la O*NET Tools Developer License en el futuro, el "Plan B" sería operar bajo CC BY-ND 4.0 (verbatim) usando los 60 ítems sin modificación léxica colombiana, lo cual es legalmente seguro pero subóptimo para experiencia de usuario.

### 6.7 Atribución requerida — formato exacto

En cualquier pantalla, reporte exportado o documento donde aparezca el instrumento o sus resultados, DescubreMe debe mostrar (mínimo):

> *Este test está adaptado del O*NET® Interest Profiler Short Form, desarrollado por el National Center for O*NET Development y patrocinado por el U.S. Department of Labor, Employment and Training Administration (USDOL/ETA). Usado bajo la O*NET Tools Developer License. O*NET® es marca registrada de USDOL/ETA. DescubreMe ha modificado parte de este contenido para adaptación lingüística al español de Colombia. USDOL/ETA no ha aprobado, respaldado ni probado estas modificaciones.*

Reglas estrictas de marca (de https://www.onetcenter.org/license_tools.html):
- "O*NET" debe usarse como **adjetivo**, nunca como sustantivo o verbo. Correcto: "datos O*NET", "del sistema O*NET". Incorrecto: "incluye O*NET", "consultando el O*NET".
- Nunca usar la marca en forma posesiva ("del O*NET") o plural ("los O*NETs").
- El símbolo ® debe acompañar a "O*NET" al menos en la primera mención de cada página.

`[Aporte Gemini]` **Nota sobre accesibilidad (Sección 508).** El IP-SF, al operar dentro de la infraestructura federal estadounidense, ha sido auditado bajo la **Sección 508 de la Rehabilitation Act** mediante los protocolos DHS *Trusted Tester Conformance Test Process*, lo que garantiza paridad de acceso para usuarios con discapacidades sensoriales. Implicación para DescubreMe: heredar este compromiso de accesibilidad (contraste, navegación con lector de pantalla, etiquetas ARIA, escalado responsivo) es un diferencial competitivo y un mitigador de riesgo legal en Colombia bajo la Ley 1618 de 2013 (derechos personas con discapacidad). Recomendación operativa: la versión es-CO en DescubreMe debe pasar un check WCAG 2.1 nivel AA antes del lanzamiento.

---

## SECCIÓN 7 — DISCLAIMERS Y MITIGACIONES ESPECÍFICAS

### 7.1 Disclaimer pre-test (es-CO, ≤ 100 palabras)

> **Antes de comenzar.** Este test mide tus intereses vocacionales: qué tipo de actividades laborales te atraen más. **No es un test clínico, no diagnostica nada y no se usa para selección de personal.** Sus resultados son un punto de partida para explorar carreras y áreas de trabajo que podrían encajar contigo, no una sentencia sobre tu futuro. Tus intereses pueden cambiar con el tiempo y la experiencia, y eso es completamente normal. Responde según lo que sientes ahora, sin pensar cuánto estudio necesitas o cuánto dinero ganarías. Tiempo estimado: 5–7 minutos.

(98 palabras)

### 7.2 Items sensibles

**Hecho:** Los 60 ítems del IP-SF no abordan contenidos clínicos, traumáticos, sexuales, religiosos, ni preguntas sobre síntomas, conductas de riesgo o ideación suicida. La activación emocional esperable es de **baja intensidad** y se limita a la posible toma de conciencia vocacional ("¿estoy en la carrera correcta?").

**Inferencia:** El mecanismo NFR-28 (contención por contenido sensible) **no se activa por contenido del instrumento**. Sin embargo, puede activarse de forma indirecta si el usuario, al ver resultados muy divergentes de su carrera actual, experimenta angustia. Recomendación: aplicar NFR-28 **en la pantalla de resultados**, no en la de items, y solo si el usuario marca explícitamente "me siento abrumado/a con este resultado".

### 7.3 Mensaje de contención (si aplica post-test)

Texto sugerido (≤ 60 palabras):

> Es normal sentir cierta incomodidad si tu perfil de intereses no coincide con tu trayectoria actual. Esto no significa que estés en el camino equivocado; significa que ahora tienes información nueva para reflexionar. Si quieres conversar esto con alguien, considera contactar a un orientador vocacional o, si lo necesitas, las líneas de apoyo emocional listadas a continuación.

### 7.4 Líneas de ayuda Colombia (buenas prácticas)

Aunque el instrumento no es clínico, DescubreMe ofrece estas líneas como buena práctica de cuidado del usuario en cualquier producto digital de autoconocimiento:

| Línea | Cobertura | Horario | Contacto |
|---|---|---|---|
| **Línea 106** "El poder de ser escuchado" | Bogotá (Secretaría Distrital de Salud) — apoyo psicosocial, contención emocional e intervención en crisis de salud mental | 24/7 | Marcar 106 desde celular o fijo en Bogotá. Email: linea106@saludcapital.gov.co |
| **Línea 192 opción 4** | Nacional Colombia — teleorientación en salud mental, primeros auxilios psicológicos, intervención en crisis (Ministerio de Salud y Protección Social) | 24/7 | Marcar 192 y seleccionar opción 4 |
| **Línea 123** | Nacional — emergencias generales, también activa rutas en salud mental urgente | 24/7 | Marcar 123 |
| **Línea Calma** | Bogotá — escucha para hombres adultos | Lun–vie 8:30 a.m.–10:30 p.m. / sáb–dom 2:00–10:30 p.m. | 01 8000 423 614 |
| **Línea Púrpura** | Bogotá — apoyo a mujeres en situación de violencia | 24/7 | 01 8000 112 137 / WhatsApp 300 755 1846 |

### 7.5 Disclaimer post-test (es-CO, ≤ 80 palabras)

> **Sobre tu resultado.** Tus intereses no son tu destino: son un punto de partida útil. Este perfil refleja qué tipo de actividades te atraen hoy, no qué carrera "deberías" tener. Las personas suelen combinar varias dimensiones, y es completamente normal que tu perfil evolucione con la experiencia. Usa estos resultados para abrir conversaciones, explorar opciones y hacerte mejores preguntas, no para cerrar puertas. Si quieres profundizar, considera hablar con un orientador vocacional o seguir explorando en DescubreMe.

(79 palabras)

---

## SECCIÓN 8 — SUGERENCIAS DE PILOTO COGNITIVO COLOMBIA

### 8.1 Tamaño de muestra

| Fase | n | Objetivo |
|---|---|---|
| Piloto cognitivo (think-aloud) | 20–30 | Detectar ítems con vocabulario ajeno o ambiguo |
| Validación lexical cuantitativa | 150–300 | Confirmar comprensión >95% y obtener α por dimensión |
| Validación psicométrica completa | 500–1.500 | α por dimensión, estructura RIASEC (test de aleatorización CI ≥ 0,60), invarianza por género |

### 8.2 Protocolo think-aloud (resumen ejecutivo)

**Reclutamiento:** 20–30 adultos colombianos (18–55 años), estratificados por:
- Ciudad: 50% Bogotá, 25% Medellín o Cali, 25% otras (incl. caribe y región andina rural si es viable)
- Nivel educativo: ~33% secundaria, ~33% técnico/tecnológico, ~33% universitario
- Género: 50/50

**Procedimiento (45 min por sesión):**
1. **Introducción (5 min):** explicar que se evalúa el instrumento, no a la persona.
2. **Aplicación con verbalización (25–30 min):** el participante responde los 60 ítems en pantalla, **verbalizando en voz alta** lo que entiende de cada ítem antes de responder.
3. **Entrevista de cierre (10 min):** preguntas como:
   - "¿Hubo alguna pregunta donde no entendiste a la primera lo que se te preguntaba?"
   - "¿Hay alguna palabra que no usarías tú normalmente?"
   - "¿Alguna actividad que mencionara el test te pareció extraña, vieja o de otro país?"

**Qué registrar (en hoja de captura por ítem):**
- ¿El participante reformuló el ítem? → posible ambigüedad
- ¿Pidió aclaración? → fallo lexical
- Tiempo de respuesta por ítem (alertas si > 15 seg.)
- Comentarios espontáneos
- Palabras-señal de no comprensión: "no sé qué es eso", "¿qué quiere decir…?", "eso no se dice así"

### 8.3 Criterios para aceptar / re-adaptar item

| Métrica | Umbral | Acción |
|---|---|---|
| % de participantes que no comprenden el ítem | > 20% | **Re-adaptar léxicamente** |
| % que reformula el ítem espontáneamente | > 30% | **Re-adaptar** |
| Ítem con tiempo de respuesta atípico (> 2 SD respecto al promedio del ítem) | en > 15% de la muestra | **Revisar y re-adaptar** |
| % que reporta sentir el ítem "ajeno", "extranjero" o "raro" | > 25% | **Re-adaptar manteniendo equivalencia conceptual** |
| Discrepancia entre respuesta dada y respuesta racionalizada | en > 20% | **Re-adaptar** |

**Inferencia:** los ítems más probables de requerir adaptación son R4 ("Raise fish in a fish hatchery"), R10 ("Put out forest fires"), E1 ("Buy and sell stocks and bonds"), E7 ("Represent a client in a lawsuit"), y A8 (riesgo de "claqué" si la traducción Mi Próximo Paso usa esa palabra de España).

### 8.4 Output esperado

1. **Versión es-CO v1.0 validada** de los 60 ítems, con changelog detallado de cada modificación léxica.
2. **Log de cambios** (Excel/JSON) con columnas: ítem #, dimensión, texto original Mi Próximo Paso, texto modificado es-CO, justificación, fuente del cambio (think-aloud / consenso experto).
3. **Métricas piloto:** α por dimensión, % de comprensión por ítem, mediana de tiempo por ítem.
4. **Reporte breve para Validation Study** del O*NET (1–2 páginas en inglés, archivable para cumplimiento de licencia).

---

## SECCIÓN 9 — GAPS Y PREGUNTAS ABIERTAS

### 9.1 ¿Existe una adaptación colombiana o mexicana del IP-SF que no se haya encontrado?

**Estado actual:** Búsquedas en Dialnet, Redalyc, ResearchGate, SciELO, PubMed y Google Scholar no devolvieron adaptaciones académicas publicadas del IP-SF para Colombia, México, Argentina o Chile. Sí existe la adaptación española del **Long Form** por Mudarra Sánchez (2007), una al portugués brasileño del SF (Pasian et al., 2020), y `[Aporte Gemini]` una al alemán (Semantic Scholar, N = 276 + N = 672) que confirma replicación de la estructura circular RIASEC en muestra no anglosajona.

**Plan de resolución:**
1. Consulta directa al Centro Nacional de Desarrollo O*NET vía el email del §6.4 preguntando si tienen registro de adaptaciones latinoamericanas no indexadas internacionalmente.
2. Búsqueda en repositorios universitarios colombianos: Universidad Nacional de Colombia, Universidad de los Andes, Pontificia Universidad Javeriana, Universidad del Norte (Barranquilla), tesis de psicología vocacional 2015–2025.
3. Contacto con la división de Orientación Vocacional del SENA y con el Observatorio Laboral y Ocupacional.

### 9.2 ¿Cómo mapear códigos SOC (EE. UU.) a CUOC (Colombia) sin pérdida de información?

**Contexto:** El O*NET mapea cada perfil RIASEC del usuario a códigos O*NET-SOC (Standard Occupational Classification de EE. UU., 2018; 1.016 ocupaciones en la versión actual O*NET 30.2). Colombia adoptó la **Clasificación Única de Ocupaciones para Colombia (CUOC)** mediante el Decreto 654 de 2021 y la Resolución 771 de 2021, basada en la CIUO-08 A.C. de la OIT con un quinto dígito propio (676 ocupaciones que agrupan ~14.701 denominaciones).

**Problema:** SOC se basa en la SOC 2018 de EE. UU.; CIUO-08 y CUOC en estándares OIT. No hay un crosswalk oficial SOC↔CUOC publicado por DANE o O*NET.

**Plan de resolución:**
1. Usar el **crosswalk SOC↔ISCO-08** publicado por la U.S. Bureau of Labor Statistics como puente intermedio.
2. Aplicar el **crosswalk ISCO-08↔CUOC** del DANE (el documento metodológico CUOC 2022, https://www.dane.gov.co/files/sen/nomenclatura/cuoc/documento-clasificacion-unica-ocupaciones-colombia-CUOC-2022.pdf, declara comparabilidad internacional hasta el 4º dígito).
3. Para ocupaciones del O*NET sin equivalente CUOC directo, mantener la **etiqueta O*NET-SOC traducida al español** (taxonomía O*NET-SOC 2019 ya traducida por el National Center for O*NET Development) y, paralelamente, sugerir la CUOC más cercana con un disclaimer.
4. **Aceptar pérdida controlada:** estimación conservadora de 10–15% de las ocupaciones O*NET no tendrán equivalente CUOC nítido (típicamente ocupaciones muy especializadas del mercado laboral estadounidense, p. ej., "Pile Driver Operator", "Fish Hatchery Manager").

### 9.3 ¿Qué hacer con ocupaciones del O*NET marginales en el mercado laboral colombiano?

**Ejemplos identificados:** "Pile Driver Operators" (SOC 49-3043), "Fence Erectors" (47-4031), "Foundry Mold and Coremakers" (51-4071), "Hazardous Materials Removal Workers" (47-4041) — todas presentes en el O*NET-SOC pero con muy baja prevalencia o sin denominación reconocible en CUOC.

**Plan de resolución:**
1. **Filtro de pertinencia:** mantener solo las ocupaciones cuya CUOC equivalente tenga ≥ 100 empleados en la última Gran Encuesta Integrada de Hogares (GEIH) del DANE.
2. Para B2C Free MVP1: limitar las ocupaciones mostradas en pantalla de resultados a las **300 ocupaciones colombianas más prevalentes**, manteniendo el resto accesible via "ver más opciones".
3. Documentar transparentemente al usuario: *"Tu perfil sugiere ~30 ocupaciones del catálogo internacional O*NET; te mostramos las más relevantes en el mercado laboral colombiano."*

### 9.4 ¿Cómo manejar la actualización de la API O*NET en 2026?

**Hecho:** La base de datos O*NET 30.2 se publica en febrero de 2026 e incluye una **transición de 5 a 4 niveles de Job Zones**, lo cual afecta el motor de matching del Interest Profiler (Gregory & Lewis, 2016, usa Job Zones para filtrar ocupaciones).

`[Aporte Gemini]` **Contexto sobre Job Zones (estructura previa de 5 niveles).** Antes del cambio 2026, el sistema clasificaba todas las ocupaciones SOC en 5 estratos según preparación académica/experiencial: Zone 1 (escolaridad media, operatividad empírica base), Zone 2 (diploma de secundaria, adiestramiento técnico breve), Zone 3 (asociado / técnico-tecnológico), Zone 4 (bachillerato universitario 4 años), Zone 5 (posgrado, doctorado, especialización médica o jurídica). El sistema permite al usuario declarar una "Zona de Trabajo Futura Potencial" para proyectar mapeos no limitados a su nivel actual. Implicación para DescubreMe: replicar la lógica de "zona actual + zona aspiracional" en la UX puede enriquecer el motor de matching sin necesidad de re-implementar la taxonomía.

**Plan de resolución:**
1. Versionar internamente la integración: `descubreme_onet_integration_v1.0` corresponde a O*NET 30.1; `v1.1` deberá implementarse con O*NET 30.2.
2. Suscribirse al feed "What's New" del O*NET Resource Center (https://www.onetcenter.org/whatsnew.html) y al feed de actualizaciones de la Database Services API.
3. Reservar 2–3 semanas de sprint en Q1 2026 para refactorizar el mapeo Job Zones tras el release de 30.2.
4. Mantener compatibilidad hacia atrás durante 6 meses; los perfiles ya generados deben re-mapearse a la nueva estructura sin pérdida de datos del usuario.

### 9.5 ¿Es ético usar diferencias de género de la muestra estadounidense?

**Observación crítica:** Las diferencias de género reportadas por Rounds et al. (2010) (R: d = +0,86 favoreciendo hombres; S: d = –0,59 favoreciendo mujeres) son magnitudes grandes y reflejan, en parte, **socialización de roles** específica de la muestra estadounidense 1999. Aplicar baremos separados por género en Colombia 2026 podría reforzar estereotipos.

`[Aporte Gemini]` **Refuerzo empírico de la decisión.** Los datos de la muestra encarcelada (Rounds et al., 2018, N = 421) muestran que las brechas de género en intereses se reconfiguran bajo entornos atípicos (en cárcel las mujeres puntuaron más alto en Investigative y Conventional, invirtiendo el patrón meta-analítico de Su, Rounds & Armstrong 2009). Esta sensibilidad contextual valida la decisión de NO codificar baremos separados por género para DescubreMe.

**Recomendación:** **No usar baremos separados por género** en DescubreMe. Usar interpretación ipsativa (§3.1) y, si se generan baremos colombianos en el futuro (§3.2), reportarlos **sin estratificación de género** o solo como dato de transparencia metodológica, no como criterio de interpretación al usuario.

### 9.6 ¿Cuáles son los percentiles exactos de Rounds (2010) Tabla 14?

**Estado:** **RESUELTO 2026-05-16.** Extracción completa en `implementation_packs/O-NET-IP-SF_v1.0_Consolidado_ADDENDUM_Tabla14.md`.

**Hallazgo crítico de la extracción:** La Tabla 14 NO contiene una matriz fija p10/p25/p50/p75/p90/p95/p99 como este pack supuso originalmente. La estructura real del PDF (p. 39) es: percentil cumulativo por score crudo (0-10) × dimensión × género (12 columnas), título oficial *"Percentile Ranks of RIASEC Scale Scores for the Interest Profiler Short Form by Gender"*. Los percentiles fijos se **derivan** invirtiendo esa tabla (interpolación lineal entre scores discretos). Ver §A-C del addendum.

**Segundo hallazgo crítico:** La Tabla 14 está en **escala paper-and-pencil 0-10** (3-point: like/dislike/unsure). DescubreMe usa la versión computerizada **5-point 0-40**. Rounds 2010 NO publica percentiles en escala 0-40. El addendum analiza 3 opciones de conversión (§E) — Opción A (ratio simple), Opción B (z-score normal con M+SD de Tabla 4), Opción C (interpretación ipsativa). **Decisión pendiente: DD-57 debe formalizar cuál método adopta DescubreMe para v1.5 Free y v1.5 Paid.**

**Output para CC:** JSON jsonb listo en §D del addendum (escala 0-10 verificada). Migration 011 espera a DD-57 formalizado.

---

## SECCIÓN 10 — REFERENCIAS (APA 7)

Armstrong, P. I., Hubert, L., & Rounds, J. (2003). Circular unidimensional scaling: A new look at group differences in interest structure. *Journal of Counseling Psychology, 50*(3), 297–308. https://doi.org/10.1037/0022-0167.50.3.297

Departamento Administrativo Nacional de Estadística (DANE). (2022). *Clasificación Única de Ocupaciones para Colombia – CUOC 2022.* Bogotá: DANE. https://www.dane.gov.co/files/sen/nomenclatura/cuoc/documento-clasificacion-unica-ocupaciones-colombia-CUOC-2022.pdf

Fernández Nistal, M. T., Mora Soto, J. K., & Ponce Zaragoza, F. A. (2023). La validez estructural de los modelos de Holland y Gati sobre los intereses vocacionales RIASEC en estudiantes mexicanos. *Electronic Journal of Research in Education Psychology, 17*(49). https://ojs.ual.es/ojs/index.php/EJREP/article/view/2634

Gregory, C., & Lewis, P. (2016). *Linking client assessment profiles to O*NET® occupational profiles within the O*NET Interest Profiler Short Form and Mini Interest Profiler (Mini-IP).* National Center for O*NET Development. https://www.onetcenter.org/dl_files/Mini-IP_Linking.pdf

Holland, J. L. (1997). *Making vocational choices: A theory of vocational personalities and work environments* (3rd ed.). Psychological Assessment Resources.

Lewis, P., & Rivkin, D. (1999). *Development of the O*NET Interest Profiler.* National Center for O*NET Development. https://www.onetcenter.org/reports/IP.html

Ministerio del Trabajo de Colombia. (2021). Decreto 654 de 2021: Clasificación Única de Ocupaciones para Colombia. https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=164615

Mudarra Sánchez, M. J. (2007). El sistema de autoevaluación de áreas profesionales: un instrumento de diagnóstico y orientación profesional. *Educación XX1, 10*, 195–213. https://doi.org/10.5944/educxx1.1.10.298

National Center for O*NET Development. (2024). *O*NET® Interest Profiler Manual* (J. Rounds, K. A. Hoff, P. M. Lewis, H. S. Nelson, K. E. Granillo-Velasquez, & C. J. M. Wee, Eds.). National Center for O*NET Development. https://www.onetcenter.org/dl_files/IP_Manual.pdf

National Center for O*NET Development. (2025). *O*NET® Career Exploration Tools Content License.* https://www.onetcenter.org/license_tools.html

National Center for O*NET Development. (2025). *O*NET® Tools Developer License.* https://www.onetcenter.org/license_toolsdev.html

Pasian, S. R., Okino, E. T. K., & Pacanaro, S. V. (2020). Adaptation to Brazilian Portuguese of the O*NET Interests Profiler – Short Form. *Avaliação Psicológica.* https://pepsic.bvsalud.org/scielo.php?script=sci_arttext&pid=S1516-36872020000100003

Rounds, J., Hoff, K., Chu, C., Lewis, P., & Gregory, C. (2018). *O*NET® Interest Profiler Short Form Paper-and-Pencil Version: Evaluation of self-scoring and psychometric characteristics.* National Center for O*NET Development. https://www.onetcenter.org/dl_files/IPSF_PP.pdf

Rounds, J., Phan, W. M. J., Amrhein, R., & Lewis, P. (2016). *Examining the efficacy of emoji anchors for the O*NET Interest Profiler Short Form.* National Center for O*NET Development. https://www.onetcenter.org/reports/IP_Emoji.html

Rounds, J., Su, R., Lewis, P., & Rivkin, D. (2010). *O*NET Interest Profiler Short Form psychometric characteristics: Summary.* National Center for O*NET Development. https://www.onetcenter.org/reports/IPSF_Psychometric.html

Rounds, J., & Tracey, T. J. (1996). Cross-cultural structural equivalence of RIASEC models and measures. *Journal of Counseling Psychology, 43*(3), 310–329. https://doi.org/10.1037/0022-0167.43.3.310

Rounds, J., Tracey, T. J., & Hubert, L. (1992). Methods for evaluating vocational interest structural hypotheses. *Journal of Vocational Behavior, 40*(2), 239–259. https://doi.org/10.1016/0001-8791(92)90041-W

Rounds, J., Walker, C. M., Day, S. X., Hubert, L., Lewis, P., & Rivkin, D. (1999). *O*NET Interest Profiler: Reliability, validity, and self-scoring.* National Center for O*NET Development. https://www.onetcenter.org/dl_files/IP_RVS.pdf

Su, R., Rounds, J., & Armstrong, P. I. (2009). Men and things, women and people: A meta-analysis of sex differences in interests. *Psychological Bulletin, 135*(6), 859–884. https://doi.org/10.1037/a0017364

U.S. Department of Labor, Employment and Training Administration. (n.d.). *Mi Próximo Paso – Perfil de intereses O*NET.* National Center for O*NET Development. https://www.miproximopaso.org/explore/ip

**`[Aportes desde Gemini — verificación pendiente]`** (las siguientes referencias se citan en el reporte de Gemini con enlaces secundarios; se conservan aquí como punto de partida para verificación antes de uso en producción):

The German O*NET Interest Profiler Short Form. (s. f.). *Semantic Scholar* ID ff5c/0a416997bd6cba106a6fde147d2bf064a344. https://pdfs.semanticscholar.org/ff5c/0a416997bd6cba106a6fde147d2bf064a344.pdf [verificar cita primaria con DOI antes de uso].

Birnbaum, A. (1968). Some latent trait models and their use in inferring an examinee's ability. En F. M. Lord & M. R. Novick, *Statistical theories of mental test scores*. Addison-Wesley. [Citada por Gemini como referencia teórica del modelo IRT logístico de 2 parámetros usado en la selección de ítems del IP-SF; verificar paginación si se cita en producción].

---

## APÉNDICE A — Mapa de aportes consolidados desde Gemini

| # | Aporte | Sección donde se integró | Valor agregado | Verificación recomendada |
|---|---|---|---|---|
| A1 | Justificación del Short Form 60 vs. Mini-IP 30: la reducción a 5 ítems/escala degrada fiabilidad y ancho de banda; SF es la "medida predilecta" del propio O*NET | §0 (Resumen ejecutivo) | Refuerza la decisión de NO usar Mini-IP en el flujo principal. Útil para defender la elección ante stakeholders. | Rounds, Phan, Amrhein & Lewis (2016) y Gregory & Lewis (2016) ya están en referencias. Verificar afirmación específica en el manual O*NET. |
| A2 | Detalle del modelo IRT (Birnbaum 2-parámetros) usado en la depuración de 180 → 60 ítems; criterios de discriminación, dificultad y filtros demográficos (deltas ≤0,30) | §0 + §1.3 | Contexto técnico para comunicación con O*NET y para copy de UX que explique por qué un test corto puede ser preciso. | Verificar cita primaria de Birnbaum (1968) y referencia a parametrización en el reporte psicométrico de Rounds 2010. |
| A3 | Validación alemana del IP-SF: N = 276 adultos + N = 672 secundaria; replicación isométrica de la estructura circular hexagonal vía MDS y pruebas de aleatorización | §2 (tabla maestra) + §3 (tabla maestra) + §9.1 | Punto de referencia transcultural adicional fuera del eje anglosajón / latinoamericano; refuerza universalidad del RIASEC. | Localizar cita primaria con DOI desde Semantic Scholar ff5c/0a416997bd6cba106a6fde147d2bf064a344. Marcado [verificar antes de uso]. |
| A4 | Justificación cuantitativa de los anclajes Emoji: Doubly MANOVA + Kappa Index of Agreement + diseño contrabalanceado N = 569 (Rounds, Phan, Amrhein & Lewis, 2016) | §1.2 | Defensa psicométrica de usar emojis en mobile/Free. | Rounds, Phan, Amrhein & Lewis (2016) ya en referencias; verificar tablas exactas. |
| A5 | Bifurcación marzo 2024 de reportes O*NET en "Standard" (adultos en transición) vs. "Career Starter" (jóvenes sin experiencia) con focus en Zonas Laborales 1–2 | §6.2 | Idea de feature para roadmap v1.5+: reporte adaptativo por perfil de usuario (joven sin experiencia vs. adulto en re-orientación). | Verificar fecha de bifurcación y diseño exacto en el O*NET Resource Center "What's New". |
| A6 | Detalle de Job Zones (5 niveles previos al cambio 2026) y mecánica "zona actual + zona aspiracional" del motor O*NET | §9.4 | Contexto para la refactorización del mapping en O*NET 30.2 (transición 5 → 4 niveles). | Gregory & Lewis (2016) ya en referencias; Job Zones documentadas en onetcenter.org. |
| A7 | Lectura cruzada de la muestra encarcelada (Rounds et al., 2018, N = 421): inversión parcial del patrón de género meta-analítico de Su, Rounds & Armstrong (2009); mujeres puntúan más en Investigative y Conventional dentro de cárcel | §3 (Tabla 3.4) + §9.5 | Refuerza la decisión de NO aplicar baremos separados por género en DescubreMe Colombia. | Rounds et al. (2018) y Su, Rounds & Armstrong (2009) ya están en referencias. Verificar valores d específicos en muestra carcelaria. |
| A8 | Compromiso de accesibilidad Sección 508 / DHS Trusted Tester / WCAG AA del IP-SF en infraestructura federal | §6.7 | Nota de buena práctica para el equipo de UX/QA: heredar este compromiso es mitigador de riesgo legal en Colombia (Ley 1618 de 2013). | Marco normativo y certificaciones DHS son públicas; verificar antes de hacer claim explícito en copy de marketing. |
| A9 | Canales de propagación digital: widgets HTML, API JSON, deep-links a My Next Move (modelos para la integración técnica) | §6.2 | Confirma 3 modos de integración; DescubreMe debe elegir API JSON para B2C Paid y B2B-A. | Endpoint documentado en services.onetcenter.org/ip. |

**Lectura general del Apéndice A:** los nueve aportes de Gemini integrados son de naturaleza académica y técnica complementaria. No alteran ninguna decisión operativa del Pack (licencia, ítems, baremos, textos al usuario, disclaimers, piloto cognitivo). Refuerzan el contexto psicométrico (IRT, validación alemana, anclajes emoji, sensibilidad contextual de género), abren ideas de roadmap (reporte adaptativo "Career Starter", refactorización Job Zones 30.2) y elevan la barra de calidad (accesibilidad Sección 508 / WCAG AA). Antes de citar en comunicación oficial con O*NET o en publicaciones, **los DOIs primarios de A3 (Alemania) y A2 (Birnbaum 1968) deben verificarse** porque Gemini los citó desde fuentes secundarias.

---

## APÉNDICE B — Notas de consolidación (metodología)

**Origen del documento.** Este consolidado combina dos investigaciones independientes producidas en mayo 2026:

1. `Prompt_12_O-NET-IP-SF_IAR.Claude.md` — Implementation Acquisition Pack completo de 10 secciones siguiendo el prompt v1.0. Cumplimiento: 100% de los requisitos del brief. Corrigió de manera explícita el estatus legal (no es dominio público estricto; aplica CC BY-ND 4.0 o O*NET Tools Developer License) y dejó marcado [sin fuente verificada] para los percentiles exactos de la Tabla 14 de Rounds 2010.

2. `Prompt_12_O-NET-IP-SF_IAR.Gemini.md` — Revisión académica narrativa estilo white paper (≈ 240 párrafos, 14 secciones temáticas no equivalentes a las 10 del prompt). No siguió la estructura del prompt v1.0. Aportes principales: detalle del modelo IRT Birnbaum 2-parámetros, validación alemana (N = 276 + N = 672), justificación cuantitativa de anclajes emoji vía Doubly MANOVA + Kappa, bifurcación marzo 2024 "Standard" vs. "Career Starter", contexto Job Zones de 5 niveles, lectura cruzada de muestra encarcelada vs. patrón meta-analítico, accesibilidad Sección 508. Limitación: estilo profundamente narrativo y con prosa hiperbólica que dificulta la extracción operativa; algunas referencias citan fuentes secundarias (Semantic Scholar, ResearchGate) sin DOI primario.

**Criterio de consolidación aplicado.**
- **Estructura:** se preserva íntegra la del Pack de Claude (10 secciones + Apéndices A y B nuevos).
- **Contenido operativo (ítems, baremos, textos al usuario, email de licencia, disclaimers, piloto):** se mantiene el de Claude porque Gemini no lo produjo en formato comparable.
- **Aportes académicos y técnicos de Gemini:** se integran SOLO cuando aportan información nueva, verificable y útil para producto. Cada aporte se marca con `[Aporte Gemini]` en el lugar donde aparece, y se traza en el Apéndice A con nivel de verificación.
- **Discrepancias entre Claude y Gemini:** no se encontraron discrepancias factuales sustanciales (ambos coinciden en autores, año 2010, fiabilidad α = 0,78–0,87 promedio 0,81, test-retest M = 0,82, escala Likert 0–4 con anclajes emoji, ausencia de ítems inversos, licencia dual del O*NET, atribución obligatoria, riesgo cero de items clínicos sensibles, muestra encarcelada N = 421, diferencias de género). Las cifras coinciden donde ambos las reportan.

**Limitaciones del consolidado.**
- Los percentiles exactos de la Tabla 14 de Rounds 2010 siguen marcados como [sin fuente verificada]; transcripción manual recomendada para v1.1.
- La cita primaria de la validación alemana del IP-SF (Aporte A3) debe verificarse antes de uso en publicación oficial — el enlace de Gemini apunta a Semantic Scholar pero sin DOI.
- El detalle Birnbaum (1968) IRT 2-parámetros se cita conceptualmente; si DescubreMe quisiera reproducir el cálculo de discriminación / dificultad por ítem, se requiere acceder al apéndice metodológico del reporte de Rounds 2010, no al texto narrativo de Gemini.
- Gemini no produjo el email de licencia, los textos es-CO, los disclaimers, el piloto cognitivo ni las modificaciones léxicas Colombia: 100% de ese contenido operativo proviene de Claude.

---

*Fin del Implementation Acquisition Pack v1.0 — O*NET Interest Profiler Short Form — CONSOLIDADO · DescubreMe · LATAM/Colombia · Mayo 2026*
