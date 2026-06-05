# Implementation Acquisition Pack v1.0 — Ryff Psychological Well-Being Scales (Ryff-PWB, forma corta 18 ítems) — CONSOLIDADO

**Proyecto:** DescubreMe (LATAM, foco Colombia) · Plataforma freemium B2C de autoconocimiento
**Stack DescubreMe:** v1.5 — Ryff-PWB migra a tier Paid; PERMA-Profiler entra a Free; retrocompatibilidad NFR-35
**Versión del consolidado:** 1.0 · **Fecha:** mayo 2026
**Insumos:** `Prompt_25_Ryff-PWB_IAR.Claude.md` (Implementation Acquisition Pack completo, 10 secciones) + `Prompt_25_Ryff-PWB_IAR.Gemini.md` (informe exhaustivo narrativo, white paper académico)
**Idiomas:** español neutro (metadatos y notas internas) / español Colombia (Secciones 5 y 7)
**Tipo de uso:** educativo / orientador / NO clínico / NO selección

> **Nota metodológica del consolidado.** Claude entregó el Pack completo siguiendo el prompt v1.0 al pie de la letra: 10 secciones operativas, ítems literales con clave, baremos publicados, plan de licencia, disclaimers es-CO, piloto cognitivo, gaps y referencias APA 7. Gemini entregó un *informe exhaustivo* académico-narrativo (estilo white paper de evolución métrica y validez nomológica) que **no sigue la estructura de 10 secciones del prompt v1.0** pero aporta profundidad teórica sobre el efecto del método, las versiones intermedias (54 y 84 ítems), validaciones adicionales (Suecia/Garcia 2006, Malasia, Argentina/García et al. 2024) y advertencias clínicas sobre puntos de corte. Este consolidado usa el Pack de Claude como base estructural completa e inyecta los aportes verificables de Gemini con la marca `[Aporte Gemini]`. La trazabilidad del origen de cada bloque está en el **Apéndice A**.

---

## TABLA DE COBERTURA (requisitos explícitos del brief vs. entrega)

| Requisito | Sección | Cobertura |
|---|---|---|
| Portada y metadatos + estado de bloqueadores | §0 | OK |
| Plan adquisición banco de ítems + lista literal de 18 ítems en inglés con clave | §1 | OK (SPARQtools/Stanford + MIDUS II) |
| Adaptaciones al español (España, Colombia, Chile, México, Argentina, Puerto Rico) | §2 | OK + 2.1 + 2.2 |
| Baremos publicados (descriptivos por dimensión, M/DE) + recomendación LATAM + roadmap CO | §3 | OK + 3.1 + 3.2 |
| Tabla de 10 ítems inversos numerados con faceta/dimensión | §4 | OK |
| 18 textos es-CO (6 dimensiones × 3 bandas) — tuteo cordial colombiano, ≤80 palabras | §5 | OK (18/18) |
| Plan licencia (titular Carol Ryff, contacto cryff@wisc.edu, práctica, pasos, email inglés, costo, Plan B) | §6 | OK |
| Disclaimers pre/post + ítems sensibles NFR-28 + mensaje contención + líneas Colombia | §7 | OK |
| Piloto cognitivo Colombia (muestra, think-aloud, criterios, entregables) | §8 | OK |
| ≥ 3 gaps y preguntas abiertas | §9 | OK (5) |
| ≥ 10 referencias APA 7 con DOI | §10 | OK (15) |
| Marcadores Hecho/Inferencia/Opinión profesional | transversal | OK |
| Marcadores [sin fuente verificada] donde aplica | §0, §3 | OK |
| **Aportes consolidados desde Gemini con verificación pendiente** | Apéndice A | OK |

---

## SECCIÓN 0 — PORTADA Y METADATOS

- **Nombre completo del instrumento:** Ryff Psychological Well-Being Scales (Escalas de Bienestar Psicológico de Ryff).
- **Autoría:** Carol D. Ryff (1989, modelo original de 6 dimensiones); Carol D. Ryff y Corey L. M. Keyes (1995, validación del modelo de seis factores y desarrollo de la forma breve de 3 ítems por dimensión).
- **Versión a implementar en DescubreMe:** Forma corta de 18 ítems (3 ítems por dimensión), Ryff & Keyes (1995). Mantener la forma media de 29 ítems (Díaz et al., 2006) como segunda opción de evaluación expandida ("Paid+").
- **Año de publicación original / última gran revisión:** 1989 (modelo); 1995 (forma corta 18 ítems); revisión conceptual del modelo en Ryff (2014, *Psychotherapy and Psychosomatics*, 83(1), 10–28).
- **Idioma original:** Inglés (Estados Unidos).
- **Productos destino en DescubreMe:** Módulo "Bienestar Eudaimónico" — tier Paid (v1.5 en adelante). Acceso histórico retrocompatible (NFR-35) para usuarios que tomaron Ryff-PWB en tier Free durante v2.0.
- **Resumen ejecutivo (≤5 líneas):** Ryff-PWB es uno de los instrumentos más citados a nivel mundial para medir bienestar eudaimónico — Ryff (1989) acumula más de 12.000 citas según Semantic Scholar y Ryff & Keyes (1995) supera las 7.000 citas en el *Journal of Personality and Social Psychology*. Mide 6 dimensiones: Autonomía, Dominio del entorno, Crecimiento personal, Relaciones positivas, Propósito en la vida, Autoaceptación. La forma corta de 18 ítems está disponible públicamente (SPARQtools/Stanford, MIDUS); presenta confiabilidad por subescala modesta (3 ítems/dim) y se recomienda reportar omega de McDonald. Para es-CO existen dos adaptaciones validadas: Díaz et al. (2006, España, 29 y 39 ítems) y Pineda-Roa et al. (2018, Colombia, 29 ítems, N=727).

`[Aporte Gemini]` **Linaje histórico de versiones que conviene tener documentado internamente.** El instrumento atravesó una progresión sistemática de reducción metodológica desde su matriz original: **120 ítems (1989, pool teórico)** → **84 ítems (14 por dimensión, estándar maestro del cual derivan todas las sub-selecciones estadísticas)** → **54 ítems (9 por dimensión)** → **42 ítems (7 por dimensión, MIDUS)** → **18 ítems (3 por dimensión, Ryff & Keyes, 1995)**. Las versiones de 84 y 54 ítems son útiles como referencia académica para mapear la trazabilidad de ítems específicos en la forma corta de 18, pero **DescubreMe no las implementa**. Importante: las directrices oficiales de distribución de Ryff advierten que la versión de 18 ítems "no es recomendada" por la propia autora dada su penalización psicométrica por bajo número de reactivos; este punto refuerza la importancia del disclaimer §7.5 y del Gap 3 sobre uso del puntaje total vs. dimensional.

**Status de bloqueadores:**

| Bloqueador | Status | Razón breve |
|---|---|---|
| Licencia para uso freemium comercial | **PARTIAL** | No es escala "copyrighted" en sentido restrictivo (Carnegie Mellon Common Cold Project usa la fórmula "Not a copyrighted scale" para múltiples instrumentos; Wabash National Study/Center of Inquiry confirma: sin cobro). La Dra. Ryff solicita carta de propósito y reporte posterior. Para uso comercial freemium **se requiere confirmación escrita**: enviar email a cryff@wisc.edu antes del lanzamiento Paid. |
| Ítems literales en inglés (forma 18) | **READY** | Publicados literalmente con clave de corrección en SPARQtools (Stanford), URLs: https://sparqtools.org/mobility-measure/psychological-wellbeing-scale/ y PDF https://sparqtools.org/wp-content/uploads/2022/10/Psychological-Well-Being-18-items.pdf |
| Ítems literales en español (forma 29 / 39) | **READY** | Publicados literalmente en Apéndice 1 de Díaz et al. (2006), Psicothema, acceso abierto: https://www.psicothema.com/pdf/3255.pdf |
| Baremos colombianos | **PARTIAL** | Pineda-Roa et al. (2018) publica M y DE por dimensión con N=727 (Bogotá/Tunja), pero **NO publica percentiles**. Para puntos de corte por banda se requiere derivar percentiles asumiendo aproximación normal o muestra propia. |
| Adaptación lingüística es-CO | **PARTIAL** | Pineda-Roa et al. (2018) usó traducción española de Díaz et al. (2006) sin re-adaptación léxica colombiana documentada. Se recomienda piloto cognitivo (ver §8). |

---

## SECCIÓN 1 — ACQUISITION PLAN DEL BANCO DE ÍTEMS

### 1.1 Disponibilidad pública

**Hecho:** Los ítems de la forma corta de 18 ítems están publicados literalmente en al menos dos fuentes abiertas verificables: (a) el toolkit Measuring Mobility de Stanford SPARQ (SPARQtools), que reproduce los 18 ítems en su PDF oficial citando como fuentes a Ryff & Keyes (1995) y Ryff et al. (2010, documentación MIDUS II); (b) la documentación pública de MIDUS II (Inter-university Consortium for Political and Social Research, ICPSR).

**URL exacta y verificada:** https://sparqtools.org/mobility-measure/psychological-wellbeing-scale/ y https://sparqtools.org/wp-content/uploads/2022/10/Psychological-Well-Being-18-items.pdf

**Listado oficial (forma corta 18 ítems) — texto literal en inglés según SPARQtools/Stanford, con subescala y dirección de codificación:**

| # | Ítem (verbatim, inglés) | Subescala | Clave |
|---|---|---|---|
| 1 | "I like most parts of my personality." | Self-Acceptance | Inversa (reverse) |
| 2 | "When I look at the story of my life, I am pleased with how things have turned out so far." | Self-Acceptance | Inversa |
| 3 | "Some people wander aimlessly through life, but I am not one of them." | Purpose in Life | Inversa |
| 4 | "The demands of everyday life often get me down." | Environmental Mastery | Directa |
| 5 | "In many ways I feel disappointed about my achievements in life." | Self-Acceptance | Directa |
| 6 | "Maintaining close relationships has been difficult and frustrating for me." | Positive Relations with Others | Directa |
| 7 | "I live life one day at a time and don't really think about the future." | Purpose in Life | Directa |
| 8 | "In general, I feel I am in charge of the situation in which I live." | Environmental Mastery | Inversa |
| 9 | "I am good at managing the responsibilities of daily life." | Environmental Mastery | Inversa |
| 10 | "I sometimes feel as if I've done all there is to do in life." | Purpose in Life | Directa |
| 11 | "For me, life has been a continuous process of learning, changing, and growth." | Personal Growth | Inversa |
| 12 | "I think it is important to have new experiences that challenge how I think about myself and the world." | Personal Growth | Inversa |
| 13 | "People would describe me as a giving person, willing to share my time with others." | Positive Relations with Others | Inversa |
| 14 | "I gave up trying to make big improvements or changes in my life a long time ago." | Personal Growth | Directa |
| 15 | "I tend to be influenced by people with strong opinions." | Autonomy | Directa |
| 16 | "I have not experienced many warm and trusting relationships with others." | Positive Relations with Others | Directa |
| 17 | "I have confidence in my own opinions, even if they are different from the way most other people think." | Autonomy | Inversa |
| 18 | "I judge myself by what I think is important, not by the values of what others think is important." | Autonomy | Inversa |

**Nota clave de codificación SPARQtools (literal):** *"Q1, Q2, Q3, Q8, Q9, Q11, Q12, Q13, Q17, and Q18 should be reverse-scored."* La escala SPARQtools usa Likert 7 puntos (1 = strongly agree → 7 = strongly disagree). En el formato MIDUS II original se usa Likert 7 puntos también, pero la fuente primaria Ryff & Keyes (1995) y Ryff (1989) usaron Likert 6 puntos. **DescubreMe debe declarar explícitamente la escala elegida (6 vs 7 puntos) y mantenerla constante para que los baremos español/colombiano (1–6) sean comparables.**

### 1.2 Banco oficial vs adaptaciones derivadas

- **Banco oficial (inglés):** Las cuatro versiones canónicas son 84 ítems (14/dim, longitudinal MIDUS), 54 ítems (9/dim, Wisconsin Longitudinal Study), 42 ítems (7/dim, MIDUS II/III) y 18 ítems (3/dim, encuestas nacionales). Fuente: Center of Inquiry, Wabash National Study, y SPARQtools/Stanford.
- **Adaptaciones derivadas españolas:** Van Dierendonck (2004) propuso una versión de 39 ítems en inglés/holandés. Díaz et al. (2006) tradujo esta versión al español y propuso una versión reducida de 29 ítems con mejor ajuste factorial (CFI = 0.95, RMSEA = 0.04). Esta versión 29-ítems es la **base de facto** para investigación iberoamericana.

`[Aporte Gemini]` **Mapeo factorial de la versión 39 ítems de Díaz et al. (útil para extender a forma 29 o forma media en Paid+).** La versión de 39 ítems tiene una estructura asimétrica: Autoaceptación 6 ítems (4 directos: 1, 7, 19, 31; 2 inversos: 13, 25); Relaciones Positivas 6 ítems (2 directos: 14, 32; 4 inversos: 2, 8, 20, 26); Autonomía 8 ítems (3 directos: 3, 10, 21; 5 inversos: 4, 9, 15, 27, 33); Dominio del Entorno 6 ítems (4 directos: 11, 16, 28, 39; 2 inversos: 5, 22); Propósito en la Vida 6 ítems (5 directos: 6, 12, 17, 18, 23; 1 inverso: 29); Crecimiento Personal 7 ítems (4 directos: 24, 35, 37, 38; 3 inversos: 30, 34, 36). Total: 22 directos + 17 inversos. La versión 29 ítems retiene de este mapa: Autoaceptación 1, 7, 19, 31 (4); Relaciones 2, 8, 14, 26, 32 (5); Autonomía 3, 4, 9, 15, 21, 27 (6); Dominio 5, 11, 16, 22, 39 (5); Propósito 6, 12, 17, 18, 23 (5); Crecimiento 24, 36, 37, 38 (4). **Aplicación práctica:** si el módulo Paid+ ofrece la forma 29 (Díaz et al.), el equipo psicométrico debe sembrar el schema con esta numeración exacta para mantener trazabilidad con la literatura. **[verificar antes de uso]** los ítems específicos contra el Apéndice 1 de Díaz et al. (2006) en https://www.psicothema.com/pdf/3255.pdf antes de implementar.

### 1.3 Estructura del banco (forma 18 ítems)

- 6 dimensiones × 3 ítems = 18 ítems.
- 10 ítems con codificación inversa, 8 ítems con codificación directa (ver §1.1 y §4).
- Formato: declaraciones autorreferenciales en primera persona ("I…"); respuesta tipo Likert (6 o 7 puntos según implementación; se recomienda **6 puntos** para alinear con tradición Ryff y baremos hispanohablantes).
- Tiempo de aplicación estimado: 3–5 minutos (Stanford SPARQ); DescubreMe puede asumir 6–8 min por seguridad incluyendo introducción y consentimiento.

### 1.4 Recomendación

1. **Fuente primaria de ítems en inglés (forma 18):** descargar PDF oficial de SPARQtools (https://sparqtools.org/wp-content/uploads/2022/10/Psychological-Well-Being-18-items.pdf) y archivar la versión recibida.
2. **Confirmación de licencia comercial:** escribir a la Dra. Carol Ryff (cryff@wisc.edu) ANTES de poner Ryff-PWB tras paywall (ver §6).
3. **Traducción al español:** NO traducir de cero. Usar las traducciones literales de Díaz et al. (2006, 39/29 ítems) y mapear los 18 ítems de la forma corta a sus equivalentes españoles ya validados. Detalles en §2.

---

## SECCIÓN 2 — ADAPTACIONES AL ESPAÑOL DISPONIBLES

| País | Autores | Año | DOI / URL | N | Características |
|---|---|---|---|---|---|
| España | Díaz, Rodríguez-Carvajal, Blanco, Moreno-Jiménez, Gallardo, Valle y Van Dierendonck | 2006 | psicothema.com/pdf/3255.pdf (acceso abierto; PubMed 17296089) | 467 (18–72 años) | Traducción de la versión 39-ítems de Van Dierendonck (2004); propone versión reducida 29-ítems con CFI = 0.95, NNFI = 0.94, RMSEA = 0.04. Apéndice 1 reproduce los 39 ítems en castellano literalmente. **Traducción pública (PDF descargable).** Alfas reportadas: Autoaceptación .83, Relaciones Positivas .81, Autonomía .73, Dominio del Entorno .71, Propósito en la Vida .83, Crecimiento Personal .68. |
| Colombia | Pineda-Roa, Castro-Muñoz y Chaparro-Clavijo | 2018 | DOI 10.11144/Javerianacali.PPSI16-1.epeb | 727 (Bogotá/Tunja, M=22.5 años) | Validación de la versión Díaz et al. (39 y 29 ítems) en adultos jóvenes colombianos. Mejor ajuste para 29 ítems. Omega de McDonald entre 0.60 (Dominio del entorno) y 0.84 (Propósito en la vida). **Acceso abierto.** No re-tradujo léxico colombiano. |
| Colombia (adolescentes) | `[Aporte Gemini]` Validación adicional citada | s.f. | bonga.unisimon.edu.co/bitstreams/33acbc39-796a-4dd5-8b30-29391f9d0df6/download | 733 adolescentes (13–18 años) | Propiedades psicométricas de la versión española en adolescentes colombianos. Útil como referencia secundaria si DescubreMe ampliara cobertura demográfica. **[verificar autor y año primarios antes de uso]** |
| Chile | Vera-Villarroel, Urzúa, Silva, Pavez y Celis-Atenas | 2013 | DOI 10.1590/S0102-79722013000100012 | 1.646 (18–90 años) | Aplicó versión Díaz et al. (29 ítems). Reporta alfas por grupo de edad. No publica medias/DT por dimensión. **Acceso abierto.** |
| Chile (adolescentes) | `[Aporte Gemini]` Estudio Talca | s.f. | scielo.org.co/scielo.php?script=sci_arttext&pid=S1657-92672012000300021 | 335 adolescentes (Talca) | Análisis psicométrico versión española en muestra adolescente chilena. **[verificar]** |
| Chile (universitarios Temuco) | `[Aporte Gemini]` | s.f. | — | 691 universitarios | Reporta RMSEA .068, CFI .95, NNFI .94, SRMR .060. **[verificar referencia primaria]** |
| México | Padrós Blázquez et al. | 2013–2018 | Revista de Educación y Desarrollo, 27 | Variable | Replicación parcial de la estructura factorial; modelos alternos de 3–4 factores. |
| Argentina | Aranguren e Irrazábal | 2015 | DOI 10.22235/cp.v9i1.166 | Estudiantes universitarios | Modelo factorial alterno de 3 factores; baja confiabilidad en Dominio y Crecimiento. |
| Argentina (adolescentes) | Meier y Oros (adaptación de Díaz et al.) | 2019 | Psicoperspectivas (SciELO) | 825 adolescentes | Re-adaptó 11 ítems léxicamente para Argentina; modelo de 4 factores. |
| **`[Aporte Gemini]` Argentina (cohorte 2024)** | García, Del Valle, López Morales y Urquijo | 2024 | scielo.edu.uy/scielo.php?script=sci_arttext&pid=S1688-42212024000201208 + Redalyc 4595/459582021013 | 3.228 adultos (20–83 años) + 153 universitarios | **Validación grande sobre la versión 29 ítems**: Fiabilidad Compuesta (Omega/Alfa) Autoaceptación .88, Relaciones .88, Autonomía .78, Dominio .78, Propósito .84, Crecimiento .77. CFA con saturaciones > .30 en todos los ítems (excepto ítem 13 retenido por validez de contenido). Modelo hexa-dimensional con ajuste impecable. **Útil como referencia LATAM moderna; complementa a Pineda-Roa et al. 2018.** |
| Puerto Rico | González, Quintero, Veray y Rosario | 2016 | Salud y Conducta, 3(1), 1–14 | 1.060 universitarios | Modelo factorial alterno de 2 factores. |
| México (médicos) | Domínguez-Lara et al. | 2019 | redalyc.org/journal/582/58275096007/html/ | 1.974 estudiantes medicina | Adaptación específica para ciencias de la salud. |
| **`[Aporte Gemini]` Suecia (forma 18 — referencia internacional clave)** | Garcia (2006); reanalizado 2023 | 2006/2023 | pmc.ncbi.nlm.nih.gov/articles/PMC10580072/ + frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2023.1208300/full | 768 (279 mujeres + 489 hombres) | **Único estudio de validación de la forma de 18 ítems con back-translation completa y pilotaje cognitivo.** Análisis con IRT/GRM. Conclusión: usar puntaje total (no fraccionar por subescala). Sugiere solución alterna de 5 factores excluyendo Propósito en la Vida por comportamiento anómalo del ítem 7 ("Vivo la vida un día a la vez..."). **Relevante para DescubreMe porque es la única validación robusta específica de la forma 18.** |

**Hecho:** Toledo-Fernández et al. (2022) (México) y otros usuarios LATAM operan sobre la traducción de Díaz et al. (2006) sin re-tradución autónoma. La trazabilidad lingüística converge.

### 2.1 Recomendación de base para es-CO

**Opinión profesional:** Usar la **traducción de Díaz et al. (2006)** como base lingüística (versión más validada y citada en español, con 349 citas Dialnet a diciembre 2025), y mapear los 18 ítems de la forma corta inglesa de Ryff & Keyes (1995) a sus equivalentes castellanos cuando exista correspondencia 1:1; para los ítems que NO aparecen en la versión Díaz et al. 39 ítems (porque proceden del banco mayor de 120/84 ítems), traducir con metodología back-translation supervisada por un lingüista bilingüe y un psicómetra. Validar el resultado con el piloto cognitivo descrito en §8. **Adicionalmente referenciar Pineda-Roa et al. (2018) como evidencia psicométrica colombiana** y como justificación de NFR de confiabilidad (omega ≥ 0.60 por dimensión como umbral mínimo aceptable para uso educativo, no clínico).

### 2.2 Modificaciones léxicas anticipadas para Colombia

**Inferencia (a confirmar en piloto cognitivo):**

- Cambiar "Disfruto haciendo planes para el futuro y trabajar para hacerlos realidad" → "Disfruto hacer planes para el futuro y trabajar para hacerlos realidad" (uso colombiano del infinitivo sin gerundio doble).
- Revisar "He sido capaz de construir un hogar y un modo de vida a mi gusto" — palabra "hogar" tiene resonancia familiar/de pareja en Colombia; alternativa: "He sido capaz de construir un entorno y un modo de vida a mi gusto".
- Sustituir "objetivo" por "propósito" o "meta" en contextos donde "objetivo" pueda leerse como tecnicismo administrativo.
- Mantener el formato Likert 1–6 con anclas explícitas: 1=Totalmente en desacuerdo, 2=Bastante en desacuerdo, 3=Algo en desacuerdo, 4=Algo de acuerdo, 5=Bastante de acuerdo, 6=Totalmente de acuerdo.
- Confirmar uso de tuteo cordial colombiano (sin "vosotros", sin localismos como "currar" o "majo").

---

## SECCIÓN 3 — BAREMOS PUBLICADOS

**Anti-alucinación:** No se han publicado **percentiles** normativos por dimensión para Ryff-PWB en ninguna de las muestras hispanohablantes consultadas (Díaz et al., 2006; Pineda-Roa et al., 2018; Vera-Villarroel et al., 2013). Solo se reportan medias, desviaciones típicas, y en algunos casos mínimo-máximo. La derivación de bandas BAJO/MEDIO/ALTO debe hacerse a partir de los descriptivos disponibles, asumiendo aproximación normal y declarándolo explícitamente al usuario, o esperando muestra propia (§3.2).

### Tabla maestra de baremos (descriptivos publicados)

**Escala de respuesta: Likert 1–6 (promedio por ítem); a mayor puntaje, mayor bienestar.**

| Dimensión | España — Díaz et al. (2006), N=467 — M (DT) | Colombia — Pineda-Roa et al. (2018), N=727 — M (DE) |
|---|---|---|
| Autoaceptación | 4.31 (0.86) | 4.52 (0.82) |
| Relaciones positivas con otros | 4.58 (0.85) | 4.06 (0.74) |
| Autonomía | 4.24 (0.73) | 4.26 (0.77) |
| Dominio del entorno | 4.31 (0.72) | 4.57 (0.78) |
| Propósito en la vida | 4.47 (0.83) | 4.87 (0.84) |
| Crecimiento personal | 4.57 (0.64) | 4.72 (0.71) |
| Total (Bienestar Psicológico, sumatorio) | [sin fuente verificada] | 29.50 (3.87) |

**Confiabilidad reportada (Pineda-Roa et al., 2018, omega de McDonald, versión 29 ítems):** Autoaceptación 0.74; Relaciones positivas 0.73; Autonomía 0.69; Dominio del entorno 0.60; Crecimiento personal 0.76; Propósito en la vida 0.83; Total 0.91.

`[Aporte Gemini]` **Referencia LATAM 2024 — Argentina (García et al., 2024, N=3.228 adultos 20–83 años, versión 29 ítems):** Fiabilidad Compuesta Omega/Alfa por dimensión: Autoaceptación .88, Relaciones Positivas .88, Autonomía .78, Dominio del Entorno .78, Propósito en la Vida .84, Crecimiento Personal .77. Estos valores son consistentemente superiores a Pineda-Roa et al. (2018) y validan robustez transcultural del instrumento en LATAM adulta. **Implicación de producto:** García et al. (2024) es la referencia más sólida disponible para LATAM adulta general (no solo universitaria). Si Pineda-Roa resulta restrictivo (universitarios M=22.5 años), considerar García et al. como referencia complementaria. **[verificar DOI y descriptivos M/DE — Gemini reportó solo Omega.]**

**Percentiles:** [sin fuente verificada — no publicados por Díaz et al. 2006 ni Pineda-Roa et al. 2018 ni Vera-Villarroel et al. 2013 ni García et al. 2024].

### 3.1 Recomendación de baremo provisional para LATAM (foco Colombia)

**Opinión profesional:** Mientras DescubreMe genera baremos propios (§3.2), usar como referencia provisional **Pineda-Roa et al. (2018)** por ser muestra colombiana adulta joven (N=727). Calcular bandas asumiendo distribución aproximadamente normal y declarando esa asunción al usuario:

- **Banda BAJO** ≤ percentil 16 ≈ M – 1 DE
- **Banda MEDIO** percentiles 17–83
- **Banda ALTO** ≥ percentil 84 ≈ M + 1 DE

Aplicando este criterio a Pineda-Roa et al. (2018), los **puntos de corte provisionales (promedio por ítem, escala 1–6)** son:

| Dimensión | Punto BAJO (≤ M – 1 DE) | Punto ALTO (≥ M + 1 DE) |
|---|---|---|
| Autoaceptación | ≤ 3.70 | ≥ 5.34 |
| Relaciones positivas | ≤ 3.32 | ≥ 4.80 |
| Autonomía | ≤ 3.49 | ≥ 5.03 |
| Dominio del entorno | ≤ 3.79 | ≥ 5.35 |
| Propósito en la vida | ≤ 4.03 | ≥ 5.71 |
| Crecimiento personal | ≤ 4.01 | ≥ 5.43 |

**Disclaimer obligatorio asociado:** "Estos rangos son provisionales y se basan en una muestra colombiana de adultos jóvenes universitarios (Pineda-Roa et al., 2018, N=727). No representan a la población colombiana general."

`[Aporte Gemini]` **Advertencia teórica explícita de Carol Ryff sobre puntos de corte (SPWB-Guidelines).** La autora original ha declarado en el documento rector y matriz fundacional del instrumento que **NO existen puntos de corte numéricos, umbrales absolutos predefinidos, ni hitos normativos clínicos estandarizados con universalidad inamovible que permitan dictaminar a un individuo como "Alto Bienestar" o "Bajo Bienestar" en términos absolutos**. Cualquier delimitación categórica debe usar exclusivamente fuentes distribucionales estadísticas (medias, DE, percentiles) derivadas de la propia muestra investigada. La regla heurística aprobada por la autora es: *Bienestar alto* = cuartil superior (top 25%) de la distribución de la muestra; *zona de alerta/orientación* = cuartil inferior (bottom 25%) de la muestra. **Implicación operativa para DescubreMe:** (a) reforzar en §7.5 que las bandas son descriptivas, no diagnósticas; (b) considerar mostrar al usuario la posición dentro de la distribución DescubreMe-CO una vez se tenga N ≥ 1.000 (ver §3.2), no solo bandas absolutas; (c) evitar lenguaje categórico clínico en los textos de §5.

### 3.2 Roadmap para baremos colombianos propios

1. **Fase 1 (meses 1–3 post-lanzamiento):** capturar respuestas anónimas en producción con consentimiento explícito de uso para investigación interna. Objetivo: N ≥ 1.000.
2. **Fase 2 (mes 4):** análisis de distribución por dimensión, segmentar por edad (18–24 / 25–34 / 35–49 / 50+), sexo, ciudad, y nivel educativo. Calcular percentiles 16, 50, 84 directamente sobre datos.
3. **Fase 3 (mes 5):** sustituir baremos provisionales Pineda-Roa por baremos DescubreMe-LATAM, manteniendo trazabilidad versionada (v1 = Pineda-Roa; v2 = DescubreMe-2026).
4. **Fase 4 (mes 6+):** publicación opcional de descriptivos en repositorio abierto (OSF) o paper instrumental para contribuir a la literatura psicométrica latinoamericana.

---

## SECCIÓN 4 — ÍTEMS INVERSOS NUMERADOS (forma corta 18 ítems, fuente SPARQtools/Stanford)

| Ítem # | Dimensión | Clave | Nota |
|---|---|---|---|
| 1 | Self-Acceptance | Inversa | Ítem positivo invertido al codificar (formato SPARQ 1=strongly agree → score = 8 – respuesta) |
| 2 | Self-Acceptance | Inversa | Mismo principio |
| 3 | Purpose in Life | Inversa | Ítem positivo invertido |
| 4 | Environmental Mastery | Directa | Ítem negativo: "demandas me deprimen" |
| 5 | Self-Acceptance | Directa | Ítem negativo: "decepcionado de mis logros" |
| 6 | Positive Relations | Directa | Ítem negativo: "mantener relaciones cercanas ha sido difícil" |
| 7 | Purpose in Life | Directa | Ítem negativo: "vivo día a día sin pensar en el futuro" |
| 8 | Environmental Mastery | Inversa | Ítem positivo invertido |
| 9 | Environmental Mastery | Inversa | Ítem positivo invertido |
| 10 | Purpose in Life | Directa | Ítem negativo |
| 11 | Personal Growth | Inversa | Ítem positivo invertido |
| 12 | Personal Growth | Inversa | Ítem positivo invertido |
| 13 | Positive Relations | Inversa | Ítem positivo invertido |
| 14 | Personal Growth | Directa | Ítem negativo: "dejé de intentar grandes cambios" |
| 15 | Autonomy | Directa | Ítem negativo: "me influencian quienes opinan fuerte" |
| 16 | Positive Relations | Directa | Ítem negativo: "no he experimentado relaciones cálidas" |
| 17 | Autonomy | Inversa | Ítem positivo invertido |
| 18 | Autonomy | Inversa | Ítem positivo invertido |

**Aclaración técnica:** SPARQtools usa la convención inversa: 1 = strongly agree, 7 = strongly disagree. Por eso los ítems "positivos" (1, 2, 3, 8, 9, 11, 12, 13, 17, 18) deben **reverse-scorearse** para que mayor puntaje represente mayor bienestar. Si DescubreMe usa convención estándar (1 = totalmente en desacuerdo → 6 = totalmente de acuerdo), entonces se invierten los **ítems negativos** (4, 5, 6, 7, 10, 14, 15, 16). **Mantener documentación clara de la convención elegida.**

`[Aporte Gemini]` **Contexto crítico sobre el "Method Effect" de ítems inversos en Ryff-PWB.** La literatura psicométrica de los últimos 20 años ha documentado que la inclusión de ítems con redacción negativa en Ryff-PWB genera un artefacto estadístico denominado *Method Effect*: cuando se modelan los datos con ESEM (rotación Geomin oblicua, extracción WLSMV), los ítems negativos tienden a agruparse entre sí formando un "factor de método" espurio independiente del constructo eudaimónico real, lo cual puede distorsionar la estructura factorial. Esto es especialmente relevante en muestras con menor recurso lingüístico, fatiga atencional o estresores ambientales. **Implicaciones para DescubreMe:** (a) en el piloto cognitivo (§8) prestar atención específica al funcionamiento de los 8 ítems negativos (4, 5, 6, 7, 10, 14, 15, 16); (b) en el análisis de baremos propios (§3.2), considerar un análisis exploratorio del Method Effect en la muestra colombiana; (c) NO eliminar ítems inversos del banco sin re-validación formal — es un trade-off documentado, no un defecto del instrumento. Referencia primaria: Tomás et al. (2010), *Psicológica*, *Method Effects associated with reversed items in the 29-item Spanish version of Ryff's Scales*, https://www.uv.es/psicologica/articulos2.10/10TOMAS.pdf

---

## SECCIÓN 5 — TEXTOS DE INTERPRETACIÓN AL USUARIO (es-CO)

**Convenciones aplicadas:** tuteo cordial colombiano; lenguaje descriptivo no etiquetador; lenguaje aspiracional no determinista; sin terminología clínica; 2–4 oraciones, máximo 80 palabras por banda; banda BAJO ≤ p16, banda MEDIO p17–p83, banda ALTO ≥ p84.

### 5.1 Autonomía

*Descripción técnica interna (no se muestra al usuario):* capacidad de autodeterminación, resistencia a la presión social y autorregulación con base en convicciones propias (Ryff, 1989).

- **BAJO:** Tiendes a darle bastante peso a lo que otras personas opinan al momento de tomar decisiones, y a veces eso te lleva a cambiar de rumbo aunque no estés del todo convencido. Esto puede sugerir que valoras la armonía con tu entorno. Vale la pena preguntarte: ¿qué decisiones recientes sientes que tomaste por convicción propia?
- **MEDIO:** Sueles sostener tus opiniones cuando las tienes claras, aunque en ciertos contextos prefieres ajustarte a lo que piensa el grupo. Esto sugiere que sabes leer cuándo defender una postura y cuándo ceder. ¿En qué áreas de tu vida te gustaría sentirte un poco más firme con tu criterio?
- **ALTO:** Tomas decisiones a partir de lo que crees que es importante, incluso cuando difieres de la mayoría. Esto sugiere que valoras la coherencia entre lo que piensas y lo que haces. Una buena pregunta para reflexionar: ¿cómo cuidas que esta autonomía conviva con la escucha de otras perspectivas?

### 5.2 Dominio del entorno

*Descripción técnica interna:* habilidad para gestionar las demandas cotidianas y crear entornos coherentes con las propias necesidades (Ryff, 1989).

- **BAJO:** En este momento las demandas del día a día se te están sintiendo cuesta arriba, y a veces cuesta organizar lo que toca hacer. Esto puede sugerir que estás atravesando una etapa exigente o de muchos cambios. Te invito a observar: ¿hay una sola tarea pequeña que sí puedas tomar bajo tu control esta semana?
- **MEDIO:** En general manejas las responsabilidades de tu vida cotidiana con cierta soltura, aunque hay días en que las demandas te superan. Esto sugiere que tienes recursos prácticos y también límites realistas. Vale la pena preguntarte: ¿qué tipo de situaciones te dejan sintiendo que vas un paso atrás?
- **ALTO:** Sientes que tienes las riendas de la situación en la que vives y que has armado un entorno que te acomoda. Esto sugiere que has desarrollado habilidades sólidas de organización y gestión. Una reflexión útil: ¿qué prácticas concretas te están funcionando y vale la pena conservar?

### 5.3 Crecimiento personal

*Descripción técnica interna:* apertura a la experiencia, sentido de desarrollo continuo y realización del potencial (Ryff, 1989).

- **BAJO:** Por ahora sientes que tu vida está más en pausa que en movimiento, y quizás hace tiempo que no inviertes energía en cambios grandes. Esto puede sugerir que estás en una etapa de consolidación o cansancio. Vale la pena preguntarte: ¿hay alguna curiosidad o aprendizaje que tenías guardado y que valga la pena retomar?
- **MEDIO:** Valoras aprender y cambiar, aunque no siempre estás en modo "experimentar cosas nuevas". Esto sugiere que combinas estabilidad con apertura según el momento. Una buena reflexión: ¿qué experiencias recientes sentiste que te movieron a pensar diferente?
- **ALTO:** Vives tu historia como un proceso continuo de aprender, cambiar y crecer, y buscas activamente experiencias que te reten. Esto sugiere que la apertura a lo nuevo es un valor importante para ti. Te invito a observar: ¿cómo equilibras la búsqueda de novedad con el cuidado de lo que ya construiste?

### 5.4 Relaciones positivas con otros

*Descripción técnica interna:* calidad y profundidad de los vínculos interpersonales, capacidad de calidez, confianza y empatía (Ryff, 1989).

- **BAJO:** En este momento sientes que tus relaciones cercanas no te están dando la calidez o confianza que necesitas, o que mantenerlas se te ha hecho cuesta arriba. Esto puede sugerir que estás atravesando una etapa de soledad o de redefinir vínculos. Vale la pena preguntarte: ¿quién de tu entorno actual te gustaría volver a buscar?
- **MEDIO:** Cuentas con relaciones que aportan, aunque sientes que el nivel de cercanía o confianza varía según el vínculo. Esto sugiere que sabes diferenciar conexiones y poner cada una en su lugar. Una pregunta útil: ¿qué tipo de vínculo te gustaría profundizar en los próximos meses?
- **ALTO:** Las personas que te rodean te describirían como alguien generoso con su tiempo, y tú sientes que tienes relaciones cálidas y de confianza. Esto sugiere que cuidar los vínculos es algo que haces de forma natural. Te invito a reflexionar: ¿cómo cuidas tu propia energía mientras das tanto a otros?

### 5.5 Propósito en la vida

*Descripción técnica interna:* sentido de dirección, metas e intencionalidad temporal hacia el futuro (Ryff, 1989).

- **BAJO:** Por ahora sientes que vives más día a día que con un rumbo claro hacia adelante, y a veces no tienes claro qué quieres conseguir. Esto puede sugerir que estás en una transición o en un momento de replanteamiento. Vale la pena preguntarte: ¿hay algún tema o causa que te genere curiosidad genuina hoy?
- **MEDIO:** Tienes una idea general de hacia dónde vas, aunque hay áreas en las que el rumbo no está del todo definido. Esto sugiere que combinas claridad con preguntas abiertas. Una reflexión útil: ¿qué proyecto pequeño podría darte más claridad sobre lo que sí quieres?
- **ALTO:** Tienes clara la dirección de tu vida y disfrutas hacer planes para el futuro y trabajar para volverlos realidad. Esto sugiere que el sentido de propósito es uno de tus motores. Te invito a observar: ¿cómo te das espacio para revisar si ese propósito sigue alineado con quien estás siendo hoy?

### 5.6 Autoaceptación

*Descripción técnica interna:* actitud positiva hacia sí mismo, reconocimiento e integración de aspectos múltiples del propio carácter, incluyendo aspectos no deseados (Ryff, 1989).

- **BAJO:** En este momento sientes cierta decepción con varios aspectos de tu vida o de quien eres, y hay cosas de ti que te gustaría cambiar. Esto puede sugerir que estás atravesando un momento exigente contigo. Vale la pena preguntarte: ¿qué aspecto de ti, aunque pequeño, sí reconoces como una fortaleza hoy?
- **MEDIO:** Hay partes de ti que te gustan y otras con las que sigues en conversación. Esto sugiere que tienes una mirada honesta sobre ti, sin idealizarte ni descalificarte. Una reflexión útil: ¿qué rasgo tuyo te cuesta más aceptar y qué crees que te ayudaría a mirarlo distinto?
- **ALTO:** En su mayor parte te sientes orgulloso de quien eres y de la vida que llevas. Esto sugiere que has logrado integrar aspectos diversos de ti con una actitud positiva. Te invito a observar: ¿cómo sostienes esta aceptación cuando aparecen días difíciles o errores propios?

---

## SECCIÓN 6 — LICENSE ACQUISITION PLAN

### 6.1 Titular y contacto

- **Titular:** Dra. Carol D. Ryff, Hilldale Professor of Psychology, Director of the Institute on Aging, University of Wisconsin-Madison.
- **Dirección postal:** Institute on Aging, 2245 Medical Sciences Center, 1300 University Avenue, Madison, WI 53706, USA.
- **Email:** cryff@wisc.edu
- **Teléfono:** (608) 262-1818 / (608) 262-5597.
- **Página oficial:** https://aging.wisc.edu/staff/ryff-carol/ y https://psych.wisc.edu/staff/ryff-carol/

### 6.2 Práctica histórica de concesión

**Hecho:** El Common Cold Project de Carnegie Mellon University (https://www.cmu.edu/common-cold-project/measures-by-study/psychological-and-social-constructs/social-relationships-loneliness-measures/psychological-well-being.html) describe explícitamente las Ryff Scales como "Not a copyrighted scale" — esa fórmula es usada por el CCP para múltiples instrumentos en su directorio. Wabash National Study / Center of Inquiry confirma: "There is no charge to use the Ryff. However, institutions must pay for the cost of reproducing it from the electronic master file, which is sent upon request." La Dra. Ryff solicita: (a) carta describiendo cómo se va a usar la escala; (b) que se le envíen resultados/citas del estudio posteriormente.

**Inferencia:** No hay evidencia pública de que Ryff haya **negado** uso comercial freemium específicamente, pero tampoco hay evidencia de concesión previa para producto B2C escalado. Por prudencia y trazabilidad legal, DescubreMe debe obtener confirmación escrita explícita antes del lanzamiento Paid.

### 6.3 Pasos para solicitar

1. Preparar carta de propósito (1 página) describiendo DescubreMe, el uso de Ryff-PWB (forma 18 ítems), idioma (español de Colombia), tier de monetización (freemium / Paid), volumen estimado, y compromisos éticos (no clínico, no selección).
2. Enviar email a cryff@wisc.edu con copia formal a la administración del Institute on Aging (consultar primero la página https://aging.wisc.edu para la dirección administrativa actualizada).
3. Esperar respuesta 2–6 semanas (basado en patrones reportados en literatura instrumental).
4. Si respuesta positiva, archivar acuerdo y mencionar autoría/atribución de Ryff en cada reporte al usuario y en el footer del módulo.
5. Compromiso de reporte: enviar a la Dra. Ryff un resumen de uso anual con tamaño muestral y citas en literatura (si aplica).

### 6.4 Borrador de email inicial (copy-paste, inglés)

> **Subject:** License inquiry — Use of Ryff Psychological Well-Being Scales (18-item form) in DescubreMe, a Spanish-language self-knowledge platform (Colombia/Latin America)
>
> Dear Dr. Ryff,
>
> My name is [NAME] and I am [ROLE] at DescubreMe, a Spanish-language, web-based educational self-knowledge platform for adults in Latin America (focus: Colombia). DescubreMe operates a freemium B2C model and is explicitly **non-clinical and non-selection**: results are framed as invitations to self-reflection, not as diagnoses or hiring criteria.
>
> We would like to include the **18-item short form of the Ryff Psychological Well-Being Scales (Ryff & Keyes, 1995)** in our paid tier, using the Spanish translation of Díaz et al. (2006) as a linguistic base and Pineda-Roa et al. (2018) for Colombian psychometric reference. We would commit to: (a) full attribution to your work in every user-facing report and in our methodology documentation; (b) annual reporting of usage data to your team; (c) no use of scale results for clinical diagnosis or personnel selection; (d) sharing of aggregate descriptive statistics that may be useful to future psychometric research.
>
> Could you confirm whether this use is acceptable under your customary terms, and indicate any additional conditions or attribution language you would like us to include? I am happy to send a detailed project description if useful.
>
> Thank you very much for your time and for the foundational contribution your work has made to the field.
>
> Sincerely,
> [NAME, ROLE]
> DescubreMe — [contact]

### 6.5 Costo esperado y rangos

- **Hecho:** No hay fee de licencia reportado en literatura abierta para Ryff-PWB. Wabash National Study indica únicamente "cost of reproducing it from the electronic master file" sin especificar monto.
- **Inferencia:** Posibles costos asociados: (a) costo administrativo de reproducción del archivo maestro electrónico (estimado USD $0–$200); (b) costo legal interno DescubreMe para revisar términos (USD $0–$500); (c) costo de traducción/back-translation profesional certificada si Ryff lo solicita (USD $500–$1.500).
- **Rango total estimado de adquisición:** USD $0–$2.000 una sola vez. Sin renta anual reportada.

### 6.6 Plan B

Si Ryff niega o no responde uso comercial freemium en 8 semanas:

1. **Plan B-1:** Usar **PERMA-Profiler** (Butler & Kern, 2016, *International Journal of Wellbeing*, 6(3), 1–48, https://doi.org/10.5502/ijw.v6i3.526) en el tier Paid para cubrir bienestar eudaimónico-hedónico integrado. El PERMA-Profiler consta de 23 ítems (15 PERMA + 8 filler). Para uso comercial, los autores indican contactar Penn Center for Innovation (pciinfo@pci.upenn.edu) según la hoja oficial de Kern (peggykern.org). PERMA ya está en el stack v1.5 como Free; expandirlo a un módulo Paid+ es factible bajo el mismo titular.
2. **Plan B-2:** Usar **Flourishing Scale** (Diener et al., 2010) de 8 ítems, licencia abierta declarada, cubre constructo eudaimónico de manera más breve.
3. **Plan B-3:** Mantener Ryff-PWB en tier Free únicamente (sin paywall) con disclaimer educativo, evitando configuración comercial específica.
4. **Plan B-4:** Para los usuarios v2.0 que ya tomaron Ryff (NFR-35 de retrocompatibilidad), mantener acceso histórico al reporte sin generar nuevas instancias, hasta resolver licencia.

---

## SECCIÓN 7 — DISCLAIMERS Y MITIGACIONES ESPECÍFICAS

### 7.1 Disclaimer pre-test (literal, ≤100 palabras, es-CO)

> Vas a responder un cuestionario sobre cómo experimentas distintas áreas de tu bienestar psicológico. No es una prueba clínica ni una evaluación de selección laboral. Sus resultados son una invitación a reflexionar sobre ti, no un diagnóstico ni una predicción sobre tu vida. Algunas preguntas pueden tocar temas personales como tus relaciones, tus logros o tu sentido de propósito; si en algún momento te sientes incómodo, puedes pausar o salir. Te tomará entre 6 y 8 minutos. Responde con honestidad sobre cómo te sientes hoy, no como crees que deberías estar.

### 7.2 Ítems sensibles que activan NFR-28 (alerta y oferta de contención)

| Ítem # | Texto (forma corta) | Razón de activación |
|---|---|---|
| 5 | "En muchos aspectos me siento decepcionado de mis logros en la vida." | Decepción global con la propia vida — riesgo de rumiación negativa. |
| 6 | "Mantener relaciones cercanas ha sido difícil y frustrante para mí." | Aislamiento social percibido. |
| 10 | "A veces siento como si ya hubiera hecho todo lo que hay por hacer en la vida." | Posible desesperanza / vacío existencial. |
| 14 | "Hace mucho tiempo dejé de intentar hacer grandes mejoras o cambios en mi vida." | Apatía y abandono de agencia. |
| 16 | "No he experimentado muchas relaciones cálidas y de confianza." | Privación afectiva. |

**Regla NFR-28:** si el usuario responde con la opción más extrema en ≥3 de estos 5 ítems (escala 1–6: respuestas que indiquen acuerdo fuerte con la afirmación negativa, es decir 5–6), mostrar mensaje de contención (§7.3) al final del reporte, antes de los resultados detallados.

### 7.3 Mensaje de contención (literal, ≤120 palabras, es-CO)

> Antes de mostrarte el detalle de tus resultados queremos detenernos un momento. Algunas de tus respuestas nos hacen pensar que puede que estés atravesando un periodo emocionalmente exigente: sentirte lejos de tu gente, decepcionado con tu vida o sin energía para hacer cambios. Eso no es un diagnóstico ni una etiqueta; es una señal de que mereces cuidado. Si estos sentimientos son frecuentes o muy intensos en este momento, hablar con un profesional de salud mental puede ayudar. En Colombia puedes llamar gratis al 106 (Bogotá, 24/7) o al 192 opción 4 (nacional, 24/7) para escucha y orientación. Tus resultados te estarán esperando cuando estés listo.

### 7.4 Líneas de ayuda Colombia relevantes

- **Línea 106 — "El Poder de Ser Escuchado":** Secretaría Distrital de Salud de Bogotá. Marcar 106 desde fijo o celular (Bogotá). WhatsApp: 300 754 8933. Correo: linea106@saludcapital.gov.co. Disponible 24 horas, 365 días. Servicio gratuito de escucha, intervención en crisis y orientación en salud mental.
- **Línea Nacional 192 — opción 4 (Teleorientación en Salud Mental):** Ministerio de Salud y Protección Social de Colombia. Cobertura nacional, 24/7, gratuita. Primeros auxilios psicológicos y orientación.
- **Línea 123:** Emergencias generales en Colombia. **Usar SOLO para urgencias en salud mental que requieran atención prehospitalaria inmediata** (p. ej., riesgo suicida inminente).
- **Línea Calma:** 01 8000 423 614. Espacio de escucha para hombres mayores de 18 años (Bogotá).
- **Línea Púrpura Distrital:** 01 8000 112 137 / WhatsApp 300 755 1846. Apoyo a mujeres en situaciones de violencia.

**Fuente verificable:** Directorio Nacional de Líneas Territoriales de Atención en Salud Mental, Ministerio de Salud y Protección Social (agosto 2025); Secretaría Distrital de Salud de Bogotá; Colegio Colombiano de Psicólogos (Directorio Líneas Salud Mental Colombia, 2021).

### 7.5 Disclaimer post-test (literal, ≤80 palabras, es-CO)

> Estos resultados describen cómo te sientes hoy, en seis áreas del bienestar psicológico estudiadas por Carol Ryff. No predicen tu futuro, no son un diagnóstico, y no te definen como persona. El bienestar cambia con el tiempo, con tus contextos y con tus decisiones. Si quieres profundizar en alguna área, considera conversar con un psicólogo o coach formado. Si una respuesta te dejó pensando, esa también es información útil.

`[Aporte Gemini]` **Refuerzo al disclaimer post-test desde validez nomológica.** La literatura argentina reciente (García et al., 2024) ha corroborado correlaciones negativas robustas entre dimensiones de Ryff-PWB y sintomatología clínica (BDI-II depresión, STAI-E/R ansiedad), específicamente desde Dominio del Entorno y Autoaceptación bajos hacia riesgo afectivo-depresivo elevado. **Implicación para producto:** esto refuerza tanto la pertinencia del NFR-28 (§7.2) que disparó ítems en Autoaceptación, Propósito y Relaciones — no son arbitrarios, mapean evidencia empírica de validez nomológica clínica — como la importancia del disclaimer post-test que aclara que el instrumento NO es diagnóstico. La línea fina es: la sensibilidad clínica del instrumento existe (no es trivial), pero la responsabilidad diagnóstica requiere un profesional. No se modifica el copy de §7.5, pero se documenta aquí el respaldo conceptual.

---

## SECCIÓN 8 — PILOTO COGNITIVO COLOMBIA

### 8.1 Tamaño y características de la muestra

- **N mínimo:** 30 participantes; recomendado 40–50 para detectar variabilidad léxica.
- **Distribución sugerida:**
  - Sexo: 50% mujeres, 50% hombres (mínimo 5 personas no binarias si la muestra lo permite).
  - Edad: 4 estratos balanceados (18–24, 25–34, 35–49, 50+).
  - Nivel educativo: al menos 30% con educación media (no universitaria) para detectar ítems con vocabulario inaccesible.
  - Geografía: mínimo 3 ciudades distintas (Bogotá, Medellín, Cali) y al menos 5 participantes de regiones no andinas (Caribe, Pacífico).
- **Criterios de exclusión:** psicólogos en ejercicio (sesgo de familiaridad con instrumentos); estudiantes de psicología.

### 8.2 Protocolo think-aloud

1. Sesión individual remota (Zoom/Meet), 30–40 min.
2. El participante lee cada ítem en voz alta y verbaliza qué entendió antes de responder.
3. Tras cada ítem, sondeo con prompts cortos: "¿hay alguna palabra que te haya hecho dudar?", "¿cómo lo dirías tú con tus palabras?", "¿la escala 1–6 te quedó clara?".
4. Al final, debriefing global: ítems más confusos, ítems repetitivos percibidos, sensación general del cuestionario.
5. Registro: grabación con consentimiento + planilla estructurada de codificación por ítem (claro / dudoso / problemático / sugerencia).

`[Aporte Gemini]` **Foco específico en ítems con riesgo de Method Effect documentado.** Durante el think-aloud, marcar de forma destacada los 8 ítems negativos (4, 5, 6, 7, 10, 14, 15, 16) y verificar: (a) si el participante invierte mentalmente la lógica al responder; (b) si percibe "doble negación" o sintaxis enrevesada; (c) si el ítem 7 ("Vivo la vida un día a la vez...") es interpretado como deseable o no — la literatura sueca (Garcia 2006, reanalizada 2023) identificó este ítem como anómalo en términos IRT. Si emerge un patrón de confusión sistemática en estos 8 ítems, considerar elevar a la Dra. Ryff antes de hacer ajustes léxicos.

### 8.3 Criterios para aceptar / re-adaptar ítem

- **Aceptar:** ≥85% de los participantes interpretó el ítem en línea con la definición teórica de la dimensión.
- **Re-adaptar léxicamente (cambio menor):** 70–84% de comprensión correcta, con dudas léxicas específicas no estructurales.
- **Reescribir:** <70% de comprensión correcta, o ≥20% de participantes interpretó la dimensión equivocada, o detección de palabras con resonancia clínica/estigmatizante en español de Colombia.

### 8.4 Output esperado del piloto

- Documento de adaptación lingüística es-CO versionado (v1.0) con los 18 ítems en su forma final.
- Tabla de cambios respecto a Díaz et al. (2006), con justificación cualitativa por ítem.
- Listado de ítems "amarillos" para monitoreo post-lanzamiento (revisión a los 6 meses con datos reales).
- Recomendación final sobre escala 6 vs 7 puntos basada en preferencia y comprensión del piloto.
- Acta de IRB interna o equivalente ético si el piloto se documenta para publicación.

---

## SECCIÓN 9 — GAPS Y PREGUNTAS ABIERTAS

1. **¿Carol Ryff autoriza explícitamente uso freemium comercial B2C escalado en Spanish-speaking LATAM?**
   *Plan de resolución:* enviar email (§6.4) en semana 1 post-aprobación de este Pack. SLA: respuesta esperada 2–6 semanas. Si no responde en 8 semanas, activar Plan B (§6.6).

2. **¿Cuál es la métrica de baremo más válida para Colombia: percentiles derivados de muestra propia DescubreMe, o conversión normal desde Pineda-Roa et al. (2018)?**
   *Plan de resolución:* dual track. (a) Lanzar con baremos provisionales calculados sobre Pineda-Roa (§3.1), marcados como v1. (b) Capturar datos propios desde día 1 y recalcular percentiles a los 1.000 respondientes (§3.2). Trazabilidad versionada.

3. **¿La forma corta de 18 ítems tiene confiabilidad suficiente por subescala para que reportes individuales sean éticamente defendibles?** La validación alemana reciente de la forma corta de Ryff (Hanke et al., 2025, *Frontiers in Aging*, PMC11861829) reporta literalmente: *"The internal consistency in terms of Cronbach's alpha are the lowest for both subscales with 0.17 and 0.35. The other subscales reached acceptable values considering the shortness of the subscales (0.42–0.66)."* En Colombia, Pineda-Roa et al. (2018) reportó omegas entre 0.60 y 0.84 (mejor escenario), lo cual ya es modesto. `[Aporte Gemini]` La validación sueca de Garcia (2006), reanalizada con IRT en 2023, recomienda **usar el puntaje total de los 18 ítems como predictor general monolítico** y NO fraccionar el reporte en 6 subescalas dado el ruido inherente al bajo número de ítems por dimensión. Sugiere incluso una solución alterna de 5 factores excluyendo Propósito.
   *Plan de resolución:* (a) reportar siempre el puntaje total de Bienestar Psicológico como dato principal y los 6 perfiles dimensionales como información complementaria/orientativa; (b) incluir en el disclaimer post-test (§7.5) referencia a que las dimensiones son "indicativas", no definitivas; (c) ofrecer en Paid+ la forma 29 ítems (Díaz et al., 2006) para usuarios que quieran reporte dimensional más confiable.

4. **¿Existe sesgo de ítems negativamente formulados (10 de 18) que distorsione la estructura factorial en hispanohablantes?** `[Aporte Gemini]` La literatura confirma este *Method Effect* explícitamente: análisis ESEM con WLSMV y rotación Geomin oblicua sobre la versión española de 29 ítems en muestras de atletas y estudiantes latinoamericanos han evidenciado que los ítems negativos forman un factor de método artificial independiente del bienestar.
   *Plan de resolución:* analizar en datos propios la correlación ítem-total y el funcionamiento diferencial; considerar referencia a Francis et al. (2022, *Mental Health, Religion & Culture*, 25(10), 1057–1072, DOI 10.1080/13674676.2022.2139364) sobre versión PWS-MS que retiró ítems negativos. Revisar si se justifica una variante "DescubreMe-10" interna para reporting más claro al usuario, sin pretender re-estandarizar la escala. Referencia primaria adicional: Tomás et al. (2010, *Psicológica*, https://www.uv.es/psicologica/articulos2.10/10TOMAS.pdf).

5. **¿La adaptación Díaz et al. (2006) requiere ajustes específicos para Colombia más allá del piloto cognitivo?**
   *Plan de resolución:* ejecutar §8 y comparar con literatura argentina de Meier y Oros (2019) y con la versión Pineda-Roa et al. (2018) que mantuvo léxico español; documentar diferencias. `[Aporte Gemini]` Considerar también la cohorte argentina adulta de García et al. (2024) como referencia de validez de contenido para población LATAM adulta general (no solo universitaria).

---

## SECCIÓN 10 — REFERENCIAS (APA 7)

1. Aranguren, M., & Irrazábal, N. (2015). Estudio de las propiedades psicométricas de las Escalas de Bienestar Psicológico de Ryff en una muestra de estudiantes argentinos. *Ciencias Psicológicas, 9*(1), 73–83. https://doi.org/10.22235/cp.v9i1.166

2. Butler, J., & Kern, M. L. (2016). The PERMA-Profiler: A brief multidimensional measure of flourishing. *International Journal of Wellbeing, 6*(3), 1–48. https://doi.org/10.5502/ijw.v6i3.526

3. Díaz, D., Rodríguez-Carvajal, R., Blanco, A., Moreno-Jiménez, B., Gallardo, I., Valle, C., & Van Dierendonck, D. (2006). Adaptación española de las escalas de bienestar psicológico de Ryff. *Psicothema, 18*(3), 572–577. https://www.psicothema.com/pdf/3255.pdf

4. Francis, L. J., Rolph, J., Rolph, P., Powell, R., & Robbins, M. (2022). Introducing the Psychological Wellbeing Scale for Muslim Societies (PWS-MS): A study among young adults in Pakistan. *Mental Health, Religion & Culture, 25*(10), 1057–1072. https://doi.org/10.1080/13674676.2022.2139364

5. Freire, C., Ferradás, M. M., Núñez, J. C., & Valle, A. (2017). Estructura factorial de las Escalas de Bienestar Psicológico de Ryff en estudiantes universitarios. *European Journal of Education and Psychology, 10*(1), 1–8. https://doi.org/10.1016/j.ejeps.2016.10.001

6. McNeish, D. (2018). Thanks coefficient alpha, we'll take it from here. *Psychological Methods, 23*(3), 412–433. https://doi.org/10.1037/met0000144

7. Ministerio de Salud y Protección Social de Colombia. (2025, agosto). *Directorio Nacional de Líneas Territoriales de Atención en Salud Mental en Colombia*. https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/VS/PP/ET/directorio-salud-mental-prevencion-suicidio-minsalud.pdf

8. Pineda-Roa, C. A., Castro-Muñoz, J. A., & Chaparro-Clavijo, R. A. (2018). Estudio psicométrico de las Escalas de Bienestar Psicológico de Ryff en adultos jóvenes colombianos. *Pensamiento Psicológico, 16*(1), 44–55. https://doi.org/10.11144/Javerianacali.PPSI16-1.epeb

9. Ryff, C. D. (1989). Happiness is everything, or is it? Explorations on the meaning of psychological well-being. *Journal of Personality and Social Psychology, 57*(6), 1069–1081. https://doi.org/10.1037/0022-3514.57.6.1069

10. Ryff, C. D., & Keyes, C. L. M. (1995). The structure of psychological well-being revisited. *Journal of Personality and Social Psychology, 69*(4), 719–727. https://doi.org/10.1037/0022-3514.69.4.719

11. Ryff, C. D. (2014). Psychological well-being revisited: Advances in the science and practice of eudaimonia. *Psychotherapy and Psychosomatics, 83*(1), 10–28. https://doi.org/10.1159/000353263

12. Sirigatti, S., Penzo, I., Iani, L., Mazzeschi, A., Hatalskaja, H., Giannetti, E., & Stefanile, C. (2013). Measurement invariance of Ryff's psychological well-being scales across Italian and Belarusian students. *Social Indicators Research, 113*(1), 67–80. https://doi.org/10.1007/s11205-012-0082-0

13. Stanford SPARQ. (2022). *Psychological Wellbeing Scale (18-item)*. Measuring Mobility Toolkit. https://sparqtools.org/mobility-measure/psychological-wellbeing-scale/

14. Van Dierendonck, D. (2004). The construct validity of Ryff's Scales of Psychological Well-being and its extension with spiritual well-being. *Personality and Individual Differences, 36*(3), 629–643. https://doi.org/10.1016/S0191-8869(03)00122-3

15. Vera-Villarroel, P., Urzúa, A., Silva, J. R., Pavez, P., & Celis-Atenas, K. (2013). Escala de Bienestar de Ryff: Análisis comparativo de los modelos teóricos en distintos grupos de edad. *Psicologia: Reflexão e Crítica, 26*(1), 106–112. https://doi.org/10.1590/S0102-79722013000100012

**`[Aportes desde Gemini — verificación pendiente]`** (las siguientes referencias se citan en el reporte de Gemini con enlaces secundarios; se conservan aquí como punto de partida para verificación antes de uso en producción):

García, M. P., Del Valle, M., López Morales, H., & Urquijo, S. (2024). Propiedades psicométricas de la Escala de Bienestar Psicológico de Ryff en Argentina. *Ciencias Psicológicas, 18*(2). http://www.scielo.edu.uy/scielo.php?script=sci_arttext&pid=S1688-42212024000201208 — Cohorte N=3.228 adultos 20–83 años; Fiabilidad Compuesta Omega/Alfa por dimensión .77–.88. **[verificar DOI y descriptivos M/DE primarios]**

Garcia, D. (2006/2023, reanálisis). The 18-item Swedish version of Ryff's psychological wellbeing scale: psychometric properties based on classical test theory and item response theory. *Frontiers in Psychology / PMC10580072*. https://pmc.ncbi.nlm.nih.gov/articles/PMC10580072/ — Validación de la forma 18 con N=768; sugiere usar puntaje total y modelo alternativo de 5 factores excluyendo Propósito. **[verificar autor y año de publicación primaria; el reanálisis de 2023 puede tener otra autoría]**

Tomás, J. M., Meléndez, J. C., & Navarro, E. (2010). Efectos de método en las escalas de Ryff: Un estudio en población de personas mayores. *Psicológica*. https://www.uv.es/psicologica/articulos2.10/10TOMAS.pdf — Documentación primaria del Method Effect en versión española. **[verificar volumen y páginas exactos]**

Validación psicométrica en adolescentes colombianos (N=733, 13–18 años). https://bonga.unisimon.edu.co/bitstreams/33acbc39-796a-4dd5-8b30-29391f9d0df6/download — **[verificar autoría primaria y año]**

Validación en universitarios mexicanos (UNAM). https://cuved.unam.mx/rdipycs/wp-content/uploads/2022/03/2.-Versi%C3%B3n-aceptada_An%C3%A1lisis-factorial-de-la-Escala-de-Bienestar-Psicol%C3%B3gico-de-Ryff-en-universitarios-mexicanos.pdf — **[verificar autor y año]**

---

## APÉNDICE A — Mapa de aportes consolidados desde Gemini

| # | Aporte | Sección donde se integró | Valor agregado | Verificación recomendada |
|---|---|---|---|---|
| A1 | Linaje histórico completo de versiones (120 → 84 → 54 → 42 → 18 ítems) + advertencia de Ryff sobre forma de 18 | §0 (Resumen ejecutivo, párrafo final) | Contexto para entender por qué la forma 18 es la más reducida y por qué hay debate sobre su uso individual; refuerza la decisión de reportar puntaje total prioritariamente. | Confirmable en Ryff (1989) y en SPWB-Guidelines (documento rector). Las versiones intermedias 84 y 54 están bien documentadas en MIDUS/Wisconsin. |
| A2 | Mapeo factorial detallado de la versión 39 ítems de Díaz et al. (numeración exacta de ítems directos/inversos por dimensión) y derivación a versión 29 ítems | §1.2 | Útil si DescubreMe ofrece la forma 29 (Díaz et al.) en Paid+: permite sembrar el schema PostgreSQL con la numeración correcta. | **[verificar antes de uso]** contra el Apéndice 1 de Díaz et al. (2006) en https://www.psicothema.com/pdf/3255.pdf. |
| A3 | Validación argentina García et al. (2024) — N=3.228 adultos, Omega .77–.88 por dimensión | §2 (tabla de adaptaciones, fila nueva) y §3 (post-tabla, nota LATAM 2024) | Punto de referencia LATAM adulta moderna; complementa Pineda-Roa et al. 2018 (más restringido a universitarios). Puede ser referencia secundaria para baremos. | DOI/URL provistos por Gemini; verificar descriptivos M/DE adicionales que Gemini no reportó. |
| A4 | Validación sueca de la forma 18 ítems (Garcia 2006, reanalizada 2023 con IRT) | §2 (tabla, fila nueva), §9 (gap 3) | Única validación específica de la forma de 18 ítems con back-translation rigurosa; sugiere usar puntaje total y modelo alterno de 5 factores excluyendo Propósito. Decisión de producto clave (reportar total como principal). | Verificar autoría primaria (Garcia 2006) y autoría del reanálisis 2023 (Frontiers, PMC10580072). |
| A5 | Method Effect — artefacto estadístico de ítems negativos en Ryff-PWB español | §4 (post-tabla), §8.2 (foco del piloto), §9 (gap 4) | Sustento técnico para: (a) prestar atención específica a los 8 ítems negativos en piloto cognitivo; (b) planear análisis de Method Effect en la muestra DescubreMe; (c) NO eliminar ítems inversos sin re-validación formal. | Tomás et al. (2010) es la referencia primaria — verificar volumen y páginas en *Psicológica*. |
| A6 | Advertencia explícita de Carol Ryff sobre no usar puntos de corte absolutos (SPWB-Guidelines) | §3.1 (post-tabla de puntos de corte) | Refuerza el carácter descriptivo y no diagnóstico de las bandas BAJO/MEDIO/ALTO; sugiere mostrar posición distribucional dentro de muestra DescubreMe-CO una vez se tenga N≥1.000. | Verificar en SPWB-Guidelines original (Wisconsin); Gemini lo cita pero sin URL directa. |
| A7 | Validez nomológica clínica: correlaciones negativas robustas con BDI-II y STAI (García et al., 2024) | §7.5 (post-disclaimer, refuerzo conceptual) | Respaldo empírico al NFR-28: los ítems sensibles que disparan contención mapean evidencia clínica real, no son arbitrarios. | García et al. (2024); verificar magnitudes específicas. |
| A8 | Validaciones colombianas y chilenas adicionales (adolescentes Colombia N=733, adolescentes Talca N=335, universitarios Temuco N=691) | §2 (tabla, filas adicionales con etiqueta `[verificar]`) | Mapeo más completo del paisaje psicométrico LATAM del instrumento; útil para extensión demográfica futura (adolescentes, otras ciudades). | Todas marcadas como **[verificar]** porque Gemini reportó URLs/snippets sin autoría primaria clara. |

**Lectura general del Apéndice A:** los aportes de Gemini integrados son de tres tipos: (1) refuerzos teóricos/históricos sobre el linaje de versiones y el Method Effect; (2) referencias adicionales internacionales y LATAM (Suecia Garcia, Argentina García et al. 2024); (3) advertencias clínico-éticas (Ryff sobre puntos de corte; validez nomológica clínica). **Ninguno altera decisiones operativas centrales del Pack** (licencia, ítems literales en inglés, baremos colombianos primarios Pineda-Roa, textos al usuario, disclaimers, piloto cognitivo). **Refuerzan la robustez teórica** y abren posibles features de roadmap (ej.: reportar posición distribucional propia, análisis de Method Effect). Antes de citar García et al. (2024), Garcia (Suecia) o Tomás et al. (2010) en publicación oficial, **verificar autoría y referencias primarias** porque Gemini citó desde fuentes secundarias (URLs de ResearchGate, PMC, Frontiers, SciELO sin DOI siempre confirmado).

---

## APÉNDICE B — Notas de consolidación (metodología)

**Origen del documento.** Este consolidado combina dos investigaciones independientes producidas en mayo 2026:

1. `Prompt_25_Ryff-PWB_IAR.Claude.md` — Implementation Acquisition Pack completo de 10 secciones siguiendo el prompt v1.0. Cumplimiento: 100% de los requisitos del brief. Estructura, ítems literales, baremos numéricos con M/DE, plan de licencia con email copy-paste, disclaimers es-CO, piloto cognitivo, gaps, referencias APA 7 con DOI: todo presente.
2. `Prompt_25_Ryff-PWB_IAR.Gemini.md` — Informe exhaustivo narrativo (white paper académico) sobre el Ryff-PWB. NO siguió la estructura de 10 secciones del prompt v1.0. Aportes principales: (a) profundidad histórica del linaje de versiones (120→84→54→42→18); (b) discusión técnica del Method Effect en ítems inversos; (c) validación sueca de la forma 18 con IRT (Garcia 2006/2023); (d) validación argentina García et al. (2024) N=3.228; (e) advertencias clínico-éticas explícitas de Carol Ryff sobre puntos de corte; (f) validez nomológica con BDI-II y STAI. **El informe de Gemini incluye 58 referencias pero solo en URLs secundarias (Scribd, ResearchGate, PMC, SciELO) sin DOIs primarios claros; arrastró un cierre narrativo notablemente verboso (concluyendo en una sola oración de más de 600 palabras) que se descartó por completo.**

**Criterio de consolidación aplicado.**
- **Estructura:** se preserva íntegra la del Pack de Claude (10 secciones + Apéndices A y B nuevos).
- **Contenido operativo (ítems, baremos, textos al usuario, email de licencia, disclaimers, piloto):** se mantiene el de Claude porque Gemini no lo produjo en formato accionable.
- **Aportes académicos de Gemini:** se integran SOLO cuando aportan información nueva verificable y útil para producto. Cada aporte se marca con `[Aporte Gemini]` en el lugar donde aparece, y se traza en el Apéndice A con nivel de verificación.
- **Discrepancias entre Claude y Gemini:** los datos coincidentes son consistentes (Díaz et al. 2006, Pineda-Roa 2018, autoría de Ryff, versiones canónicas, escala Likert 1–6, Method Effect documentado). No se detectaron contradicciones factuales. Gemini agregó la cohorte García et al. (2024) que Claude no mencionó; el dato es plausible y refuerza la sección de baremos LATAM.

**Limitaciones del consolidado.**
- Las referencias García et al. (2024), Garcia (Suecia 2006/2023), Tomás et al. (2010) y las validaciones colombianas/chilenas adicionales (apartado A8) deben verificarse en bases primarias antes de citarse en comunicación oficial con la Dra. Ryff o en publicaciones.
- El mapeo factorial de la versión 39 ítems (A2) se reproduce desde el informe de Gemini; **antes de implementar la forma 29 en Paid+**, verificar la numeración exacta en el Apéndice 1 de Díaz et al. (2006).
- La advertencia de Ryff sobre puntos de corte (A6) debe rastrearse en el SPWB-Guidelines original (Wisconsin); Gemini la cita sin URL directa.

---

*Fin del Implementation Acquisition Pack v1.0 — Ryff-PWB — CONSOLIDADO · DescubreMe · LATAM/Colombia · Mayo 2026*
