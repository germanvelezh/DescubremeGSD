# Implementation Acquisition Pack v1.0 — UWES-9 (9 ítems) — CONSOLIDADO
**Producto destino:** DescubreMe (LATAM, foco Colombia) · **B2C Paid (USD 19) + B2B-A (módulos trabajo/engagement)** · **Fase A Core v1.5**
**Versión del consolidado:** 1.0 · **Fecha:** mayo 2026
**Insumos:** `Prompt_05_UWES-9_IAR.Claude.md` (Implementation Acquisition Pack completo, 10 secciones) + `Prompt_05_UWES-9_IAR.Gemini.md` (revisión académica narrativa estilo *white paper*, sin sección operativa)
**Idiomas:** español neutro (metadatos y notas internas) / español Colombia (Secciones 5 y 7)

> **Nota metodológica del consolidado.** Claude entregó el Pack completo siguiendo el prompt v1.0 al pie de la letra (10/10 secciones operativas con marcadores Hecho/Inferencia/Opinión profesional y anti-alucinación de baremos). Gemini entregó una revisión académica narrativa de ~230 páginas de texto continuo (con la mayor parte de las cifras numéricas codificadas como imágenes base64 inline, lo cual impide verificación textual de valores específicos) que NO cumple la estructura de 10 secciones del prompt pero aporta contexto psicométrico complementario (evolución JD-R, debate factorial Kulikowski, distinción Dedicación vs. satisfacción, distinción Absorción vs. flow de Csikszentmihalyi, modelos bifactor jerárquicos, variantes UWES-6S Perú e implicaciones para diseño de intervención). Este consolidado usa el Pack de Claude como base estructural completa e inyecta los aportes verificables de Gemini con la marca `[Aporte Gemini]`. La trazabilidad del origen de cada bloque está en el **Apéndice A**.

---

## TABLA DE COBERTURA (requisitos explícitos del brief vs. entrega)

| Requisito | Sección | Cobertura |
|---|---|---|
| Portada y metadatos + estado de bloqueadores | §0 | OK |
| Plan adquisición banco de ítems + lista literal de 9 ítems en inglés con clave | §1 | OK (UWES_GB_9.pdf + manual oficial) |
| Adaptaciones al español (España, México, Argentina, Chile, Perú, PR, Uruguay, Ecuador, Colombia 2025) | §2 | OK (16 entradas) |
| Baremos publicados (Países Bajos, internacional 9 países, España, México, Argentina, Chile, Colombia) | §3 | OK + 3.1 + 3.2 |
| Tabla de ítems inversos numerados (UWES-9 = 0 inversos, todos directos) | §4 | OK |
| 9 textos es-CO (3 dimensiones × 3 bandas) + tensión absorción-workaholism | §5 | OK (9/9) |
| Plan licencia Triple i (contactos, práctica, pasos, email inglés, costo, Plan B) | §6 | OK |
| Disclaimers pre/post + items sensibles + NFR-28 + mensaje contención + líneas Colombia | §7 | OK |
| Piloto cognitivo Colombia (muestra, think-aloud, criterios, entregables) | §8 | OK |
| ≥ 3 gaps y preguntas abiertas | §9 | OK (5) |
| ≥ 10 referencias APA 7 con DOI | §10 | OK (16) |
| Marcadores Hecho/Inferencia/Opinión profesional | transversal | OK |
| Marcadores [sin fuente verificada] donde aplica | §3, §6 | OK |
| **Aportes consolidados desde Gemini con verificación pendiente** | Apéndice A | OK |

---

## SECCIÓN 0 — Portada y Metadatos

**Nombre completo:** Utrecht Work Engagement Scale — Short Form (UWES-9) / *Encuesta de Bienestar y Trabajo — versión corta de 9 ítems*.
**Autores:** Wilmar B. Schaufeli (Utrecht University / KU Leuven) y Arnold B. Bakker (Erasmus University Rotterdam); versión corta validada con Marisa Salanova (Universitat Jaume I).
**Versión original (UWES-17):** Schaufeli, Salanova, González-Romá & Bakker (2002). **Manual preliminar:** Schaufeli & Bakker (2003); revisión 1.1, diciembre 2004. **Versión corta UWES-9:** Schaufeli, Bakker & Salanova (2006), *Educational and Psychological Measurement, 66*(4), 701-716, DOI 10.1177/0013164405282471.
**Idioma original:** Holandés (paralelo a inglés). Versión española de referencia: Salanova, Schaufeli, Llorens, Peiró & Grau (2000).
**Estructura:** 9 ítems · 3 dimensiones (Vigor, Dedicación, Absorción) · 3 ítems por dimensión · escala Likert 7 puntos (0 = Nunca a 6 = Siempre/Todos los días).
**Tiempo de aplicación:** 3-5 minutos.
**Productos destino DescubreMe:** B2C Paid (USD 19 one-time) y B2B-A (track empresarial; módulos trabajo/engagement).

**Resumen ejecutivo.** El UWES-9 es el instrumento de referencia mundial para medir *work engagement* (vigor + dedicación + absorción) en adultos trabajadores. Sus 9 ítems están publicados literalmente en el sitio oficial del autor (wilmarschaufeli.nl) y en el manual de Schaufeli & Bakker (2003). El uso académico es gratuito; el uso comercial requiere contrato con Triple i Human Capital (info@3ihc.nl), sin tarifa pública. La adaptación al español de Salanova et al. (2000) es la base hispanohablante histórica; existen revalidaciones en México (Hernández-Vargas et al., 2016), Argentina (Spontón et al., 2012) y una validación colombiana reciente en sector salud (Dajud-Casas et al., 2025, N=410) con ajuste subóptimo (CFI=.81; RMSEA=.095). Los baremos europeos generan efecto techo en LATAM, por lo que se recomienda calibración local con N≥800.

`[Aporte Gemini]` **Encuadre histórico-conceptual del UWES.** La escala fue diseñada como ruptura paradigmática frente al *Maslach Burnout Inventory* (MBI). Maslach & Leiter (1997) habían postulado el engagement como mero polo opuesto del burnout sobre un único continuo (agotamiento ↔ vigor; cinismo ↔ dedicación; ineficacia ↔ ¿?), lo cual implicaba que no se necesitaba un instrumento independiente. Schaufeli, Salanova, González-Romá & Bakker (2002) demostraron que la ausencia de agotamiento no garantiza pasión y que un empleado puede co-experimentar engagement alto y burnout alto, configurando un riesgo crítico que el continuo no captura. De ahí la independencia métrica del UWES y la decisión de añadir **Absorción** como dominio fenomenológico nuevo (no como "opuesto de ineficacia"). Este encuadre es relevante para el copy de UX y para la justificación de no devolver Absorción aislada (ver §7.2). Los ítems originales se redactaron, en parte, invirtiendo la valencia semántica de reactivos del MBI ("me siento fatigado cuando me levanto y tengo que ir a trabajar" → "cuando me levanto por la mañana, tengo ganas de ir a trabajar"). [verificar tabla específica en Schaufeli & Bakker, 2003].

`[Aporte Gemini]` **Anclaje en JD-R.** El UWES no se entiende fuera del Modelo Job Demands-Resources (Bakker & Demerouti, 2007): los **recursos laborales** (autonomía, apoyo social, feedback, claridad de rol) y los **recursos personales** (resiliencia, autoeficacia, optimismo) activan un proceso motivacional cuyo **mediador clave es el work engagement**, que a su vez predice productividad, retención, innovación y comportamientos cívicos organizacionales; las **demandas** crónicas no compensadas activan el proceso de deterioro hacia burnout. Para B2B-A esto significa que el UWES-9 es la métrica del *outcome motivacional*, no del clima organizacional ni del compromiso normativo: complementa, no sustituye, escalas como WDQ-40 (recursos) o BPNSFS (necesidades psicológicas).

**Status de bloqueadores:**

| Bloqueador | Status | Notas |
|---|---|---|
| Ítems literales (es e inglés) | **READY** | Publicados en wilmarschaufeli.nl y en manual oficial (Salanova et al., 2000) |
| Baremos hispanohablantes consolidados (UWES-9) | **PARTIAL** | M/DT españolas, mexicanas, argentinas y colombianas disponibles; tabla de percentiles P5/P25/P75/P95 del manual a verificar in situ |
| Licencia comercial Triple i | **BLOCKED hasta cotización** | Modelo "REQUEST QUOTE"; sin tarifa pública. Debe iniciarse contacto antes de lanzar B2C Paid o B2B-A |
| Validación colombiana propia (N≥800) | **BLOCKED a 12-18 meses** | Validación 2025 disponible pero con ajuste pobre y N=410 sector salud (no generalizable) |

---

## SECCIÓN 1 — Acquisition Plan del Banco de Ítems

### 1.1 Disponibilidad pública

**Hecho:** Los 9 ítems del UWES-9 están publicados literalmente en el formulario oficial PDF descargable desde el sitio del autor: https://www.wilmarschaufeli.nl/publications/Schaufeli/Tests/UWES_GB_9.pdf (inglés) y en el manual técnico de libre descarga (Schaufeli & Bakker, 2003/2004) en https://www.wilmarschaufeli.nl/publications/Schaufeli/Test%20Manuals/Test_manual_UWES_English.pdf y su traducción al español https://www.wilmarschaufeli.nl/publications/Schaufeli/Test%20Manuals/Test_manual_UWES_Espanol.pdf. La nota de copyright al pie del PDF de ítems indica: *"© Schaufeli & Bakker (2003). The Utrecht Work Engagement Scale is free for use for non-commercial scientific research. Commercial and/or non-scientific use is prohibited, unless previous written permission is granted by the authors."*

**Listado literal en inglés (UWES-9), numerado en el orden del formulario oficial UWES_GB_9.pdf:**

| # | Ítem (inglés) | Dimensión | Clave |
|---|---|---|---|
| 1 | At my work, I feel bursting with energy | Vigor (VI) | Directa |
| 2 | At my job, I feel strong and vigorous | Vigor (VI) | Directa |
| 3 | I am enthusiastic about my job | Dedicación (DE) | Directa |
| 4 | My job inspires me | Dedicación (DE) | Directa |
| 5 | When I get up in the morning, I feel like going to work | Vigor (VI) | Directa |
| 6 | I feel happy when I am working intensely | Absorción (AB) | Directa |
| 7 | I am proud of the work that I do | Dedicación (DE) | Directa |
| 8 | I am immersed in my work | Absorción (AB) | Directa |
| 9 | I get carried away when I'm working | Absorción (AB) | Directa |

Fuentes: UWES_GB_9.pdf (Schaufeli & Bakker, 2003) directa del sitio oficial.

### 1.2 Banco oficial vs. adaptaciones derivadas

| Versión | N° ítems | Distribución | Año | Notas |
|---|---|---|---|---|
| UWES-24 | 24 | 9 VI / 8 DE / 7 AB | 1999 | Versión piloto, no usar |
| UWES-17 | 17 | 6 VI / 5 DE / 6 AB | 2002 (Schaufeli et al.) | Original largo |
| UWES-15 | 15 | 5 VI / 5 DE / 5 AB | ~2001 | Salanova et al. (2000); excluye AB06 y VI06 por inconsistencia |
| **UWES-9** | **9** | **3 VI / 3 DE / 3 AB** | **2006 (Schaufeli, Bakker & Salanova)** | **Recomendado para DescubreMe** |
| UWES-3 | 3 | 1 VI / 1 DE / 1 AB | 2019 (Schaufeli, Shimazu, Hakanen, Salanova & De Witte) | Ultracorto |
| `[Aporte Gemini]` UWES-6S | 6 | adolescentes Perú | 2022 | Domínguez-Lara et al.; derivado por purga de 3 ítems del UWES-9S con CFA inestable en adolescentes peruanos de NSE medio-bajo; convergente con autoestima/autoeficacia. **No usar como base en DescubreMe**, sólo como referencia comparativa. |

### 1.3 Estructura del banco

3 ítems por dimensión, **todos con clave directa** (sin ítems inversos). Escala Likert 0-6 con anclajes verbales y de frecuencia (0=Nunca, 1=Casi nunca/Pocas veces al año, 2=Algunas veces/Una vez al mes o menos, 3=Regularmente/Pocas veces al mes, 4=Bastantes veces/Una vez por semana, 5=Casi siempre/Pocas veces por semana, 6=Siempre/Todos los días).

### 1.4 Recomendación de primer contacto

- **Uso comercial (DescubreMe B2C/B2B-A):** info@3ihc.nl (Triple i Human Capital, Utrecht, +31 6 17240135). Web: https://www.3ihc.nl/en/our-license-options/
- **Backup académico:** w.schaufeli@uu.nl. Sitio del autor: https://www.wilmarschaufeli.nl/.

**Opinión profesional:** Escribir primero a info@3ihc.nl con cc explícita a Wilmar Schaufeli; el contacto científico aumenta la legitimidad del pitch.

---

## SECCIÓN 2 — Adaptaciones al Español Disponibles

| País | Autores | Año | DOI / URL | N muestra | Características |
|---|---|---|---|---|---|
| España | Salanova, Schaufeli, Llorens, Peiró & Grau | 2000 | https://dialnet.unirioja.es/servlet/articulo?codigo=620197 | 514 | Adaptación primaria al castellano del UWES-17/-15; ítems del UWES-9 marcados con asterisco; cedida para reproducción académica |
| España (sanitarios) | Lopez-Lopez et al. (UWES-9) | 2022 | PMC9719711 | n/d | UWES-9 en profesionales de la salud activos; CFI/RMSEA aceptables; útil como referencia profesional |
| México (IMSS + SS) | Hernández-Vargas, Llorens-Gumbau, Rodríguez-Sánchez & Dickinson-Bannack | 2016 | 10.11144/Javerianacali.PPSI14-2.veup | 475 (249 IMSS + 226 SS) | UWES-9 3 factores: χ²(24)=81.44; RMSEA=.04; CFI=.98; α=.85+; invarianza confirmada |
| México (mexicanos generales) | Villavicencio-Ayub, Jurado Cárdenas & Aguilar Villalobos | 2014 | 10.48102/pi.v22i2.61 | n/d | Adaptación de UWES y OSI |
| México (informales) | Lins de Holanda et al.; Rodríguez et al. | 2023 | varios | 290 | UWES-15 trabajadores informales; estructura tridimensional confirmada |
| México (UWES-3 docentes) | Juárez-García et al. | 2023 | http://www.scielo.org.pe/scielo.php?script=sci_arttext&pid=S2223-25162023000200011 | n/d | UWES-3 ultracorto comparado con UWES-9; 92% varianza compartida |
| Argentina (Córdoba) | Spontón, Medrano, Maffei, Spontón & Castellano | 2012 | http://www.scielo.org.pe/scielo.php?script=sci_arttext&pid=S1729-48272012000200005 | 674 | UWES-17/9; modelos 2 y 3 factores plausibles; α .69-.90 |
| Argentina (Mar del Plata) | Pujol-Cols & Arraigada | 2018 | Estudios Gerenciales | n/d | UWES-9 sin análisis de invarianza |
| Chile (trabajadores) | Müller, Pérez & Ramírez | 2013 | Universum, 28(1) — Estudios de Administración Univ. Chile | n/d | UWES-17; alta dedicación afectiva (Muy Alta) reportada en ~39% del segmento técnico/enfermería |
| Chile (estudiantes) | Carmona-Halty, Schaufeli & Salanova | 2019 | 10.3389/fpsyg.2019.01017 | 1502 | UWES-9S; 3 factores correlacionados ajustan mejor |
| Perú (docentes) | Flores, Fernández, Juárez, Merino & Guimet | 2015 | Liberabit | n/d | UWES-9 |
| Perú (adolescentes UWES-9S) | Domínguez-Lara et al. | 2022 | https://www.redalyc.org/journal/4595/459573725024/html/ | n/d | Baremos por sexo: muy bajo (<P10), bajo (<P25), promedio bajo, promedio alto, alto (>P75), muy alto (>P90); **`[Aporte Gemini]` el CFA forzó descartar 3 ítems → UWES-6S adolescentes NSE medio-bajo** |
| Puerto Rico | Rodríguez-Montalbán, Martínez-Lugo & Sánchez-Cardona | 2014; González-Seda et al., 2024 | https://revistacaribenadepsicologia.com/index.php/rcp/article/download/7843 · http://www.scielo.org.co/scielo.php?script=sci_arttext&pid=S1657-92672014000400003 | varios | UWES-9 y UWES-3 |
| Uruguay | Gómez-Garbero et al. | 2019 | n/d | n/d | Modelo trifactorial aceptable; correlaciones latentes muy altas |
| **Colombia (sector salud)** | **Dajud-Casas, Tuirán-Tuirán, Villota-Díaz & Monsalve-Ospina** | **2025** | **https://ciencialatina.org/index.php/cienciala/article/view/20526** | **410** | **UWES-17 oct 2024–may 2025; α global .89 (VI .84, DE .87, AB .81); AFC: CFI=.81; RMSEA=.095; correlaciones inter-dimensiones r=.60-.75; ajuste subóptimo** |
| `[Aporte Gemini]` Colombia (desarrolladores tech teletrabajo) | Repositorio UNAL | s.f. | https://repositorio.unal.edu.co/bitstreams/4705a9f5-6626-41a6-8e64-3da144855b9e/download | 126 | Bogotá; 81% teletrabajo, 13% híbrido, 6% presencial; ojo: usaron **EES de Shuck et al. (2016)**, no UWES; **referencia contextual, no es validación UWES**. Útil como dato cualitativo sobre liderazgo + autonomía como predictores en LATAM remoto. |
| `[Aporte Gemini]` Colombia (revisión teórica 2013-2023) | Revistas UCatólica Luis Amigó; SciELO Colombia | 2023 | https://revistas.ucatolicaluisamigo.edu.co/index.php/CYA/article/download/4489/3617 · http://www.scielo.org.co/scielo.php?script=sci_arttext&pid=S1794-99982023000100232 | revisión sistemática nacional | UWES/familia es la escala dominante en literatura colombiana 2013-2023 (>55% de las aplicaciones publicadas); UWES-9 desplazando a UWES-17 |
| Ecuador (estudiantes) | redalyc/818/81850404013 | s.f. | https://www.redalyc.org/journal/818/81850404013/html/ | n/d | UWES-S 9 estudiantes Ecuador |
| Brasil (PT) | Vázquez et al. (2015); Sinval et al. (2018); Lins de Holanda et al. (2023) | varios | varios | varios | Versiones portugués brasileño; modelos uni y trifactorial buenos |
| `[Aporte Gemini]` República Checa | Vinšová et al. (Czech UWES-9) | 2024 | PMC12663390 | n/d | Validación reciente UWES-9 con índices de ajuste adecuados; **referencia europea adicional** [verificar metadatos primarios antes de citar] |

### 2.1 Recomendación de base para es-CO

**Opinión profesional:** Usar como base la adaptación española de Salanova et al. (2000), reconocida en el manual oficial como versión castellana de referencia y autorizada por los autores para reproducción académica (Hernández-Vargas et al., 2016, nota al pie). Esta base ha sido usada en todos los estudios LATAM mayores (México, Argentina, Chile, Perú). **Razón principal:** maximiza comparabilidad con la base internacional UWES (N=14.521; Schaufeli, Bakker & Salanova, 2006) y permite migrar entre baremos europeos transitorios y baremos colombianos cuando se acumulen.

### 2.2 Modificaciones léxicas anticipadas para Colombia (es-CO)

**Inferencia:** Las nueve formulaciones de Salanova et al. (2000) son comprensibles en es-CO; el único riesgo léxico significativo es "vigoroso" como autodescripción y "absorto" en niveles educativos medios-bajos. Ajustes a validar en piloto:

| Ítem | Texto Salanova 2000 | Posible ajuste es-CO | Justificación |
|---|---|---|---|
| 1 (VI) | En mi trabajo me siento lleno de energía | (mantener) | Comprensible |
| 2 (VI) | Soy fuerte y vigoroso en mi trabajo | "Me siento fuerte y con vigor en mi trabajo" | "Vigoroso" como adjetivo personal puede sonar formal |
| 3 (DE) | Estoy entusiasmado con mi trabajo | (mantener) | Comprensible |
| 4 (DE) | Mi trabajo me inspira | (mantener) | Comprensible |
| 5 (VI) | Cuando me levanto por las mañanas tengo ganas de ir a trabajar | (mantener) | Comprensible |
| 6 (AB) | Soy feliz cuando estoy absorto en mi trabajo | "Me siento feliz cuando estoy concentrado en mi trabajo" | "Absorto" baja frecuencia en es-CO informal |
| 7 (DE) | Estoy orgulloso del trabajo que hago | (mantener) | Comprensible |
| 8 (AB) | Estoy inmerso en mi trabajo | Conservar "inmerso" o "totalmente metido en mi trabajo" | Validar en piloto |
| 9 (AB) | Me dejo llevar por mi trabajo | (mantener) | Comprensible |

**Hecho:** Cualquier cambio léxico debe documentarse en el contrato con Triple i y mantener la dirección semántica original (Muñiz et al., 2013, *International Test Commission guidelines for translating and adapting tests*).

---

## SECCIÓN 3 — Baremos Publicados

### Tabla maestra país por país (M, DT, percentiles)

| País | Fuente (APA + DOI) | N | Dimensión / Total | M | DT |
|---|---|---|---|---|---|
| Países Bajos | Schaufeli & Bakker (2003), Tabla 25 (UWES-9) | 9.679 | Vigor | 4.01 | 1.14 |
| Países Bajos | Schaufeli & Bakker (2003), Tabla 25 | 9.679 | Dedicación | 3.88 | 1.38 |
| Países Bajos | Schaufeli & Bakker (2003), Tabla 25 | 9.679 | Absorción | 3.35 | 1.32 |
| Países Bajos | Schaufeli & Bakker (2003), Tabla 26 | 9.679 | Total UWES-9 | 3.74 | 1.17 |
| Internacional (9 países, UWES-15) | Schaufeli & Bakker (2003) | 12.631 (hombres 6.469) | Vigor | 4.28 | [sin fuente verificada DT por género] |
| Internacional (9 países, UWES-15) | Schaufeli & Bakker (2003) | 12.631 (hombres 6.469) | Dedicación | 3.83 | [sin fuente verificada DT por género] |
| Internacional (9 países, UWES-15) | Schaufeli & Bakker (2003) | 12.631 (hombres 6.469) | Absorción | 4.36 | [sin fuente verificada DT por género] |
| Internacional (9 países, UWES-15) | Schaufeli & Bakker (2003) | 12.631 (mujeres 5.722) | Vigor | 4.11 | [sin fuente verificada DT por género] |
| España (UWES-17, n=1.832) | Schaufeli & Bakker (2003), Tabla 15 | 1.832 | Total | [sin fuente verificada — manual no reporta país-específico desagregado] | — |
| México (UWES-9, IMSS+SS) | Hernández-Vargas et al. (2016) | 475 | α global ≥.85 | M, DT no reportadas en abstract; ver Tabla 2 del paper | — |
| Argentina Córdoba (UWES-17) | Spontón et al. (2012) | 674 | α .69–.90; M, DT no extraídas en este pack | [sin fuente verificada — consultar paper] | — |
| Colombia sector salud (UWES-17) | Dajud-Casas et al. (2025) | 410 | α global .89; Vigor α .84; Dedicación α .87; Absorción α .81; correlaciones inter-dim r=.60-.75 | [M, DT por dimensión no reportadas en abstract] | — |
| Chile estudiantes (UWES-9S) | Carmona-Halty et al. (2019) | 1.502 | α adecuados; estructura 3 factores | [M, DT en paper, ver Tabla 1 original] | — |
| `[Aporte Gemini]` República Checa (UWES-9) | PMC12663390 (2024) | n/d | n/d | n/d | Validación europea adicional con índices de ajuste adecuados [verificar paper primario] |

### Cinco categorías estadísticas del manual oficial

**Hecho:** El manual de Schaufeli & Bakker (2003), sección 6.2 "Individual norms", define textualmente cinco categorías por puntos de corte percentil: *"For the establishment of statistical norms for the UWES it was decided to use five categories: 'very low', 'low', 'average', 'high', and 'very high'."* Los puntos de corte corresponden a:

- **Muy bajo:** ≤ P5
- **Bajo:** P5 – P25
- **Promedio (Average):** P25 – P75
- **Alto:** P75 – P95
- **Muy alto:** ≥ P95

**Hecho:** Los valores numéricos absolutos de los puntos de corte por dimensión y por versión (UWES-9 / UWES-15 / UWES-17) aparecen en tablas finales del PDF del manual (páginas 35-40, sección 6.2 holandesa y 6.3 internacional). El texto extraído electrónicamente en este pack se trunca al inicio de estas tablas por límites técnicos: **los valores absolutos están publicados pero no se reproducen aquí para evitar inventarlos parcialmente** → [valores absolutos a verificar in situ en el PDF antes de implementar el motor de scoring].

**Hecho — Distribución por porcentajes (Tabla 27 del manual; UWES-9, N=9.679, Países Bajos):**

| Categoría recodificada (puntaje medio) | Vigor % | Dedicación % | Absorción % | Total UWES-9 % |
|---|---|---|---|---|
| 1 (puntaje 0-0.99 — una vez al año o menos) | 0.5 | 1.9 | 2.7 | 1.1 |
| 2 (1-1.99 — al menos una vez al año) | 2.8 | 6.2 | 10.1 | 5.8 |
| 3 (2-2.99 — al menos una vez al mes) | 13.0 | 15.2 | 23.0 | 19.1 |
| 4 (3-3.99 — varias veces al mes) | 25.0 | 21.7 | 27.6 | 28.3 |
| 5 (4-4.99 — al menos una vez por semana) | 31.4 | 25.8 | 21.5 | 28.7 |
| 6 (5-6 — varias veces por semana o diario) | 27.2 | 29.3 | 15.1 | 17.0 |

`[Aporte Gemini]` **Lectura cualitativa del manual oficial.** El centro de gravedad de la distribución internacional cae en la categoría "Promedio" (P25–P75) con la media absoluta del UWES-9 total oscilando ~3.7–4.0 sobre 6. La asimetría de la distribución se inclina ligeramente hacia el polo positivo (mayor frecuencia de respuestas en bandas 4–5), y dentro de los ítems individuales, **el ítem 7 "I am proud of the work that I do" (DE) sistemáticamente arroja la media más alta** en muestras internacionales. Implicación práctica: en reportes individuales, no celebrar como "alto" un puntaje 5/6 en Dedicación si el resto del perfil queda en 4/6; el efecto suelo en este ítem es bajo y el efecto techo es real.

### 3.1 Recomendación de baremo provisional para LATAM

**Opinión profesional:** Hasta acumular N≥800 muestra colombiana, usar como baremo puente la base europea/internacional (Schaufeli & Bakker, 2003) con advertencia visible en el reporte interno: *"Baremo provisional internacional; en LATAM puede producir efecto techo. Calibración local en curso."* Para usuarios mexicanos preferir las medias de Hernández-Vargas et al. (2016) si están disponibles las tablas completas.

`[Aporte Gemini]` **Advertencia adicional sobre transposición de baremos.** Hay literatura LATAM que advierte sobre el sesgo a la baja sistemático de los baremos europeos cuando se aplican en mercados con horarios laborales atípicos, precarización y alta informalidad — efectos contextuales del ecosistema económico que reducen la media observada (y no necesariamente el "engagement verdadero" del individuo). Esto refuerza el plan F4 de calibración local. La revisión sistemática LATAM (ResearchGate 402821833, 2024) reporta sostenimiento generalizado del modelo trifactorial en el subcontinente pero con escasos estudios longitudinales/invarianza temporal.

### 3.2 Roadmap para baremos colombianos propios

| Fase | Objetivo | N | Plazo |
|---|---|---|---|
| F1: Piloto cognitivo (think-aloud) | Validar comprensión lexical es-CO | 20-30 | Mes 1-2 |
| F2: Piloto cuantitativo | Verificar α, AFC trifactorial | 150-300 | Mes 3-5 |
| F3: Acumulación natural | Recolección de respuestas de usuarios B2C/B2B-A | ≥800 (Colombia) | Mes 6-18 |
| F4: Calibración baremos locales | Recomputar M, DT, percentiles P5/P25/P75/P95 | ≥800 estratificados (edad/género/sector) | Mes 18-24 |
| F5: Re-validación AFC | Confirmar invariancia con muestra LATAM | ≥800 | Mes 24+ |

---

## SECCIÓN 4 — Ítems Inversos Numerados

| Ítem # | Dimensión | Clave | Notas |
|---|---|---|---|
| 1 | Vigor | Directa | Sin recodificación |
| 2 | Vigor | Directa | Sin recodificación |
| 3 | Dedicación | Directa | Sin recodificación |
| 4 | Dedicación | Directa | Sin recodificación |
| 5 | Vigor | Directa | Sin recodificación |
| 6 | Absorción | Directa | Sin recodificación |
| 7 | Dedicación | Directa | Sin recodificación |
| 8 | Absorción | Directa | Sin recodificación |
| 9 | Absorción | Directa | Sin recodificación |

**Hecho — confirmación explícita:** El UWES-9 **no contiene ningún ítem con clave inversa**. Todos los 9 ítems están redactados en sentido positivo (estado deseable) y se puntúan directamente (Schaufeli, Bakker & Salanova, 2006). Esto contrasta con el MBI, donde la escala de eficacia profesional se invierte para obtener "falta de eficacia". **Implementación en Supabase:** la columna `is_reverse` para los 9 ítems del UWES-9 debe ser `FALSE` sin excepciones; el cálculo del puntaje por dimensión es la media simple de los 3 ítems correspondientes (rango 0-6); el puntaje total es la media de los 9 ítems.

`[Aporte Gemini]` **Nota CFA — errores residuales correlacionados.** En el modelo confirmatorio trifactorial publicado en la literatura, los autores frecuentemente liberan correlación residual entre los ítems de Absorción (AB8 y AB9 del UWES-17, equivalentes a AB2 y AB3 / ítems #8 e #9 del UWES-9) para alcanzar RMSEA < 0.08; la justificación es solapamiento semántico ("inmerso" / "me dejo llevar"). **Implicación operativa para DescubreMe:** si en F2 (piloto cuantitativo N=150-300) el CFA tridimensional restringido no ajusta, antes de descartar el modelo se debe testear el modelo con esa correlación residual ítem-8 ↔ ítem-9; documentar en el reporte psicométrico interno.

---

## SECCIÓN 5 — Textos de Interpretación al Usuario (es-CO)

> **Principios aplicados (no negociables):** lenguaje descriptivo, no etiquetador; aspiracional, no determinista; no clínico; tuteo cordial colombiano; 2-4 oraciones, máx. 80 palabras por banda.

### VIGOR

**Descripción técnica (interna, no se muestra al usuario):** Vigor refleja niveles de energía, resiliencia mental y disposición a invertir esfuerzo en el trabajo, incluso ante dificultades (Schaufeli, Bakker & Salanova, 2006). `[Aporte Gemini]` Es el opuesto conceptual directo del *agotamiento emocional* del MBI; predice negativamente cuadros somáticos (dolor musculoesquelético inespecífico, afecciones dermatológicas psicosomáticas) y se asocia positivamente con resiliencia y autoeficacia.

**Banda BAJO (≤ percentil 16):**
En este momento sueles sentirte con poca energía o con baja chispa cuando piensas en tu trabajo. Es algo común en etapas de cansancio, cambios o desajustes con el rol. Te invitamos a observar qué actividades laborales sí te dan algo de impulso y a explorar pequeños cambios en tu rutina o entorno que podrían recargar tu energía.

**Banda MEDIO (percentil 17-83):**
Tu energía en el trabajo se mueve en un rango promedio: hay días con buen impulso y otros más planos. Esto es lo habitual en la mayoría de las personas. Una buena pregunta para ti: ¿qué condiciones (horarios, tareas, compañeros) hacen que tu energía suba? Identificarlas te ayuda a diseñar mejores semanas.

**Banda ALTO (≥ percentil 84):**
Tiendes a sentirte con bastante energía y resistencia mental en tu trabajo. Recuperarte después de un día complicado suele costarte menos que al promedio. Aprovecha esta fortaleza para tomar iniciativas y, al mismo tiempo, cuida tus tiempos de descanso para que la energía sea sostenible y no se queme con el tiempo.

### DEDICACIÓN

**Descripción técnica (interna):** Dedicación se refiere a involucramiento fuerte con el trabajo, sentido de significado, entusiasmo, inspiración, orgullo y reto (Schaufeli, Bakker & Salanova, 2006). `[Aporte Gemini]` Es la antítesis directa del *cinismo/despersonalización* del MBI. **No confundir con satisfacción laboral:** la satisfacción mide pasivamente cuán contento está el empleado con su entorno (un estado de saciedad/comodidad); la dedicación captura una conexión activa con el contenido y la ejecución de la tarea misma. Un empleado puede estar muy satisfecho con horarios, salario y ambiente pero con dedicación baja (perfil "cómodo, no apasionado").

**Banda BAJO (≤ percentil 16):**
Hoy tu trabajo no te conecta mucho con un sentido claro de propósito o inspiración. Esto puede deberse a la tarea, al equipo, al momento de tu carrera o a desalineaciones con tus valores. Te invitamos a explorar qué partes de tu rol sí te importan y qué le falta a tu trabajo actual para que vuelvas a sentirlo significativo.

**Banda MEDIO (percentil 17-83):**
Sientes que tu trabajo tiene algo de sentido y por momentos te entusiasma, aunque no de forma constante. Es una zona típica y saludable. Te puede servir hacer una lista corta de las tareas o proyectos que sí te inspiran: ahí están las pistas para fortalecer tu vínculo con lo que haces.

**Banda ALTO (≥ percentil 84):**
Tiendes a vivir tu trabajo con bastante orgullo, entusiasmo y sentido de propósito. Probablemente lo vives como un reto positivo, no como una carga. Usa este nivel de dedicación como brújula para decisiones de carrera, y verifica que tu entorno reconozca y proteja esa conexión (no la dé por sentada).

### ABSORCIÓN

**Descripción técnica (interna):** Absorción se refiere a estar plenamente concentrado y felizmente involucrado en el trabajo, con percepción de que el tiempo pasa rápido y dificultad para desconectarse. **Nota crítica:** absorción alta puede coexistir con engagement sano O con workaholism (Schaufeli, Taris & Van Rhenen, 2008). DescubreMe NUNCA reporta absorción aislada; siempre la presenta junto con vigor y dedicación.

`[Aporte Gemini]` **Absorción vs. Flow.** Aunque comparten fenomenología (distorsión temporal, concentración profunda), Csikszentmihalyi describe el *flow* como un **pico episódico** dependiente de una tarea específica con balance reto/habilidad, mientras la **absorción del UWES** es una **actitud macro-cognitiva persistente** hacia el puesto entero. Un usuario alto en absorción no está describiendo un momento de flow puntual: describe que su patrón habitual es ese estado de inmersión. Esto justifica medirla como rasgo de estado prolongado, no como métrica de productividad inmediata.

**Banda BAJO (≤ percentil 16):**
En tu trabajo te cuesta entrar en un estado de concentración profunda donde el tiempo pasa rápido. Eso no es bueno ni malo por sí mismo: puede reflejar tareas fragmentadas, interrupciones frecuentes o poca afinidad con la actividad actual. Vale la pena preguntarte cuándo sí logras enfocarte y qué condiciones favorecen ese estado.

> `[Aporte Gemini · uso interno B2B-A]` **Diagnóstico organizacional asociado.** Si en una organización el patrón modal es **Absorción baja con Vigor y Dedicación normales/altos**, no se trata de un problema de motivación: indica *hipoestimulación* (rutinas monótonas, subempleo cognitivo, exceso de interrupciones, fragmentación de tareas). La intervención correcta es **rediseño del puesto / job crafting**, no programas de bienestar ni vacaciones obligatorias.

**Banda MEDIO (percentil 17-83):**
Tienes momentos en los que te enfocas con fuerza en tu trabajo y otros en los que tu atención se dispersa. Es un patrón común. Identificar tus ventanas de mayor concentración y proteger ese tiempo (sin notificaciones, con tareas que te reten) puede multiplicar tu impacto sin obligarte a trabajar más horas.

**Banda ALTO (≥ percentil 84):**
Sueles entrar en estados de concentración profunda donde el tiempo vuela y te enganchas mucho con lo que haces. Esto puede ser una gran fortaleza cuando convive con energía (vigor) y sentido (dedicación) altos. **Si además notas que te cuesta desconectarte, descansar, o que el trabajo se mete en otros espacios de tu vida, vale la pena revisar tus límites:** la absorción alta puede acompañar un engagement sano o, en otros casos, dinámicas de sobre-trabajo. Una buena señal de salud es poder apagar y disfrutar fuera del trabajo.

---

## SECCIÓN 6 — License Acquisition Plan

### 6.1 Titular y contacto

**Hecho — fuente: https://www.wilmarschaufeli.nl/downloads/** (verbatim):
*"You are welcomed to use both tests provided that you agree to the following two conditions: The use is free for academic purposes only, such as PhD theses and scientific papers. For all other purposes, a contract should be drafted. Please email info@3ihc.nl."*

- **Comercial:** **Triple i Human Capital BV** — Utrecht, Países Bajos. Email: info@3ihc.nl · Tel: +31 6 17240135 · Web: https://www.3ihc.nl/en/ · Página de opciones de licencia: https://www.3ihc.nl/en/our-license-options/. Empresa de aplicación del trabajo de Wilmar Schaufeli; KvK 75585898. Representante operativo visible en LinkedIn: Elco Schaufeli.
- **Académico:** Prof. Wilmar Schaufeli (w.schaufeli@uu.nl) — Utrecht University y KU Leuven. Sitio personal: https://www.wilmarschaufeli.nl/. Condiciones para uso académico gratuito: compartir datos brutos (puntajes, edad, género, ocupación) y descripción narrativa de la muestra para alimentar la base internacional UWES.

### 6.2 Práctica histórica de concesión

**Inferencia:** No existe tarifa pública publicada en 3ihc.nl ni en literatura indexada ni en foros profesionales rastreables. La práctica reportada es "REQUEST QUOTE" individualizada. **Hecho:** No localizamos en ninguna fuente pública un rango numérico confirmado para la licencia comercial del UWES → [sin fuente verificada en monto]. **Inferencia razonable:** la cuantía depende de (a) tamaño del usuario final, (b) volumen anual de aplicaciones, (c) si se incluye uso de baremos del manual y sistema de scoring, (d) territorialidad. **Hecho:** Triple i compromete respuesta dentro de 1 día hábil según su página de contacto.

### 6.3 Pasos para solicitar

1. Enviar email inicial a info@3ihc.nl con cc a w.schaufeli@uu.nl (ver borrador 6.4).
2. Esperar respuesta (1 día hábil esperado).
3. Recibir cuestionario/intake sobre uso, volumen, idiomas, territorio.
4. Recibir cotización formal y borrador de contrato.
5. Negociar términos (estructura de tarifas; data-sharing científico; uso de baremos; sublicencia B2B).
6. Firma, pago inicial y acceso documentado al material oficial.

### 6.4 Borrador de email inicial (copy-paste, inglés)

**Asunto:** Commercial license request — UWES-9 for B2C self-knowledge platform in Latin America

> Dear Triple i Human Capital team (cc: Prof. Schaufeli),
>
> My name is [NAME], [ROLE] at DescubreMe (https://descubreme.[domain]), a freemium B2C web platform focused on adult self-knowledge in Latin America (primary markets: Colombia, Mexico, Argentina). DescubreMe is **educational and orientational, not clinical and not used for personnel selection**. Each psychometric instrument is implemented as a "plugin" on a shared Supabase/PostgreSQL infrastructure, and reports are individual, descriptive and non-deterministic.
>
> We would like to request a quote for a **commercial license** to administer the **UWES-9 (Utrecht Work Engagement Scale, 9-item short form; Schaufeli, Bakker & Salanova, 2006)** in two products:
>
> 1. **B2C Paid** — one-time purchase, USD 19, for individual adult users to receive a personal report (vigor / dedication / absorption with descriptive interpretation).
> 2. **B2B-A** — enterprise track for organizational diagnostics (work and engagement modules), with pricing to be defined per client.
>
> **Languages requested:** Spanish (Colombia, Mexico, neutral LatAm) and English.
> **Expected volume (year 1):** B2C ~ [X,000] administrations; B2B-A ~ [Y] organizations × [Z] employees.
> **Geographic scope:** Colombia, Mexico, Argentina; potential expansion to other Spanish-speaking countries.
> **Item source:** Spanish adaptation of Salanova, Schaufeli, Llorens, Peiró & Grau (2000), with minor lexical adjustments validated via cognitive pilot in Colombian Spanish, preserving the original semantic direction of each item.
> **Norms:** Provisional use of the European/Spanish norms from Schaufeli & Bakker (2003); local Colombian norms to be calibrated once we reach N≥800. We are happy to **share anonymized data** with the authors to contribute to the international UWES database, as stated on wilmarschaufeli.nl.
>
> Could you please share:
> - License fee structure (one-time, per-user, annual) for the two use cases above
> - Conditions for use of the official norms / scoring system
> - Data-sharing requirements and reporting obligations
> - Estimated turnaround for contract execution
>
> We deeply appreciate the scientific rigor of the UWES and want to use it responsibly.
>
> Best regards,
> [NAME] · [TITLE] · DescubreMe · [EMAIL] · [PHONE]

### 6.5 Costo esperado y rangos

**Hecho:** Modelo "REQUEST QUOTE" sin tarifa pública. Cualquier rango específico es especulativo → [sin fuente verificada en monto].

**Opinión profesional:** Para un B2C en LATAM con ticket de USD 19, debe negociarse una **estructura mixta**: fee de entrada bajo + royalty per-administration bajo (rango razonable a explorar: 5-15% del precio del producto, o tarifa fija por bloque de mil administraciones). Para B2B-A, tarifa anual por organización + per-employee bajo. **No comprometerse a una estructura solo per-administration alta** porque dañaría la unidad económica del producto.

### 6.6 Plan B — alternativas si la licencia es prohibitiva

| Instrumento | Autor / Año | Constructo | Licencia | Compatibilidad |
|---|---|---|---|---|
| **WOLF (Work-related Flow Inventory)** | Bakker (2008) | Flow en trabajo (absorción + work enjoyment + intrinsic motivation) | Solicitud al autor | Solapamiento parcial (absorción) |
| **MWMS (Multidimensional Work Motivation Scale)** | Gagné et al. (2015) | Motivación laboral autodeterminada (5 dimensiones) | Mayoritariamente abierto | Constructo complementario |
| **BPNSFS-Work** | Chen et al. (2015) | Necesidades psicológicas básicas en trabajo | Académico abierto | Marco SDT; no mide engagement |
| **UWES-3** | Schaufeli et al. (2019) | Engagement ultracorto | Misma licencia (Triple i) | No resuelve el bloqueo |
| `[Aporte Gemini]` **EES (Employee Engagement Scale)** | Shuck et al. (2016) | Engagement conductual/cognitivo/afectivo en marco Kahn (1990) | Licencia académica/comercial separada | Marco teórico distinto (Kahn vs. JD-R); ya se usa en Colombia (Repositorio UNAL, n=126 tech) |
| **Uso académico restringido** | — | — | Gratuito | No monetiza el reporte del UWES-9 |

**Opinión profesional:** El UWES-9 es el instrumento de referencia mundial; sustituirlo degrada la propuesta B2B-A. Si Triple i cotiza por encima del umbral de viabilidad, **MWMS de Gagné como reemplazo principal y UWES-3 académico restringido como puente conceptual**.

---

## SECCIÓN 7 — Disclaimers y Mitigaciones Específicas

### 7.1 Disclaimer pre-test (es-CO, ≤100 palabras)

> Este cuestionario explora cómo te sientes con tu trabajo actual en términos de energía, sentido y concentración. Es una herramienta **educativa y de autoconocimiento, no un diagnóstico clínico ni una prueba de selección laboral**. Para responder con sentido necesitas tener un trabajo o actividad laboral en curso (empleado, independiente o emprendedor). Tus respuestas son confidenciales. Te tomará 3 a 5 minutos. Responde según cómo te has sentido la mayoría de los días en las últimas semanas, sin pensar demasiado cada respuesta.

### 7.2 Ítems sensibles que activan NFR-28

**Hecho:** Schaufeli, Taris & Van Rhenen (2008) documentaron que la dimensión **absorción** correlaciona moderada y positivamente con la sub-dimensión "trabajo excesivo" del workaholism, mientras vigor y dedicación correlacionan negativamente con la sub-dimensión "compulsión interna". Los autores concluyen explícitamente: *"absorption is perhaps not a unique feature of work engagement"* (Schaufeli, Taris & Van Rhenen, 2008, p. 196). Los tres ítems de Absorción del UWES-9 ("Soy feliz cuando estoy absorto en mi trabajo", "Estoy inmerso en mi trabajo", "Me dejo llevar por mi trabajo") pueden, en combinación con altos puntajes de Dedicación y bajos de Vigor, sugerir patrón de workaholism más que engagement sano.

`[Aporte Gemini]` **Refuerzo del NFR-28 desde la teoría de intervención.** El patrón "Dedicación alta + Absorción alta + Vigor bajo" es descrito en la literatura como **señal temprana de burnout inminente por sobrecarga sin recuperación homeostática** (no como falta de pasión). La intervención organizacional correcta no es "más significado" o "más trabajo retador" sino lo contrario: **políticas de desconexión digital, redistribución de volumen, descarga emergente y rediseño ergonómico que recargue energía**. Esto valida la lógica del mensaje de contención de DescubreMe (§7.3).

**NFR-28 (DescubreMe):** nunca devolver puntuación de Absorción aislada al usuario; siempre combinar con Vigor y Dedicación. **Regla de activación de bandera interna y mensaje de contención:** Absorción ≥ P90 AND Dedicación ≥ P75 AND Vigor ≤ P40; o si el usuario responde en encuesta post-test que experimenta malestar persistente.

### 7.3 Mensaje de contención (es-CO, ≤120 palabras)

> Tus respuestas muestran un patrón interesante: te sientes muy involucrado/a y concentrado/a en tu trabajo, pero con menos energía de la que sería ideal. Este patrón a veces refleja **engagement sano en una etapa exigente**, pero también puede ser una señal temprana de sobre-trabajo o desgaste. No es un diagnóstico, es una invitación a observar: ¿estás descansando bien? ¿puedes desconectarte después del trabajo? ¿tu cuerpo te está pidiendo algo? Si sientes malestar persistente, irritabilidad, problemas de sueño o agotamiento que no mejora, vale la pena hablar con un/a profesional de salud mental o con el área de bienestar laboral de tu organización. En la siguiente sección te dejamos líneas de apoyo gratuitas en Colombia.

### 7.4 Líneas de ayuda Colombia (verificadas)

| Recurso | Cobertura | Contacto | Horario |
|---|---|---|---|
| Línea 106 "El poder de ser escuchado" | Bogotá D.C. (también en Medellín, Cali, Cartagena como Línea de Atención en Salud Mental local) | 106 (marcado directo) · WhatsApp Bogotá 300 754 9833 | 24/7 |
| Línea Nacional Salud Mental | Nacional Colombia | 192, opción 4 | 24/7 |
| Línea 123 emergencias | Nacional | 123 | 24/7 (solo emergencias) |
| ARL SURA — riesgo psicosocial | Afiliados ARL SURA | 01 8000 511 414 · WhatsApp 315 275 7888 | Horario laboral |
| ARL Positiva | Afiliados ARL Positiva | 01 8000 111 170 | Horario laboral |
| ARL Colmena | Afiliados ARL Colmena | 01 8000 919 667 | Horario laboral |
| Línea Calma (hombres) | Bogotá | 01 8000 423 614 | Verificar |
| Línea Púrpura (violencia hacia mujeres) | Bogotá | 01 8000 112 137 · WhatsApp 300 755 1846 | 24/7 |

Para México: Línea de la Vida 800 911 2000. Para Argentina: 0800 999 0091 (Línea Nacional Salud Mental).

### 7.5 Disclaimer post-test (es-CO, ≤80 palabras)

> Este reporte describe cómo te sientes ahora con tu trabajo, no quién eres. Los resultados pueden cambiar con el tiempo, el rol, el equipo y tu momento de vida. **No es un diagnóstico clínico ni una recomendación de carrera específica**. Úsalo como punto de partida para conversaciones contigo mismo/a, con tu líder o con un/a profesional. Si sientes malestar persistente, consulta a un/a psicólogo/a o llama a las líneas de apoyo que te dejamos.

---

## SECCIÓN 8 — Sugerencias de Piloto Cognitivo Colombia

### 8.1 Tamaño y características de muestra

| Fase | Tipo | N recomendado | Características |
|---|---|---|---|
| Piloto cognitivo (think-aloud) | Cualitativo | 20-30 | Adultos colombianos 22-55 años, trabajando actualmente (empleados formales 60%, independientes 25%, mixtos 15%); diversidad de nivel educativo (bachiller, técnico, universitario, posgrado); cuotas Bogotá/Medellín/Cali/otra |
| Piloto cuantitativo | Cuantitativo | 150-300 | Misma diversidad; permite α y AFC preliminar |
| Calibración baremos locales | Cuantitativo | ≥800 | Estratificación por edad/género/sector económico colombiano |

### 8.2 Protocolo think-aloud

Por cada ítem, en sesión 1-a-1 de ~30 min:
1. Presentación del ítem con la escala 0-6 visible.
2. "¿Puedes leer este ítem en voz alta y decirme con tus propias palabras qué entiendes?"
3. "¿Qué número escogerías y por qué?"
4. "¿Hay alguna palabra que te haya hecho dudar o que cambiarías por una más natural?"
5. Registro de: comprensión correcta (sí/no/parcial), tiempo de respuesta, varianza en la respuesta, palabras señaladas como confusas.

Preguntas adicionales:
- "¿La escala 0-6 con sus etiquetas de frecuencia te quedó clara?"
- "¿Sentiste que algún ítem se repetía?"
- "¿Hubo algún ítem que te incomodara?"

### 8.3 Criterios para aceptar / re-adaptar ítem

| Criterio | Umbral aceptar | Umbral re-adaptar |
|---|---|---|
| % comprensión correcta | ≥85% | <70% → re-adaptar |
| Varianza respuesta (0-6) | DT ≥ 0.8 entre sujetos | DT < 0.5 → revisar (efecto suelo/techo) |
| Comentarios sistemáticos sobre una palabra | ≤2 sujetos | ≥4 sujetos → re-adaptar |
| Tiempo de lectura promedio | ≤25 segundos | >40 seg → simplificar |

### 8.4 Output esperado del piloto

- Versión es-CO validada lexicalmente (formato PDF + JSON con item_id, dimension, text_es-CO, audit trail de cambios respecto a Salanova 2000)
- α de Cronbach preliminar por dimensión y total (target: vigor ≥.75; dedicación ≥.80; absorción ≥.70; total ≥.85)
- `[Aporte Gemini]` Si el N piloto cuantitativo lo permite, **reportar también ω de McDonald** (no solo α de Cronbach): la literatura reciente sobre UWES-9 (Dajud-Casas 2025 Colombia y otros) está migrando a ω porque no requiere supuesto tau-equivalente y refleja mejor la fiabilidad cuando las cargas factoriales son asimétricas.
- Estructura factorial preliminar AFC (target CFI ≥.90, RMSEA ≤.08, factor loadings ≥.50). **Si CFA trifactorial estricto no ajusta, testear modelo trifactorial con correlación residual entre ítems 8 y 9 antes de descartar** (ver §4 nota CFA).
- M, DT por dimensión y total, contrastadas contra medias holandesas (Schaufeli & Bakker, 2003) y mexicanas (Hernández-Vargas et al., 2016)
- Reporte de revisión léxica documentado para Triple i (parte de la negociación de licencia)

---

## SECCIÓN 9 — Gaps y Preguntas Abiertas

**Pregunta abierta 1: ¿Cuáles son los valores numéricos exactos de los puntos de corte por percentil (P5, P25, P75, P95) para cada dimensión del UWES-9 en los baremos del manual (sección 6.2 holandesa y 6.3 internacional)?**
*Plan:* Descargar y consultar directamente el PDF de Schaufeli & Bakker (2003), páginas 35-40 (tablas finales). Si los cutoffs no aparecen separados para UWES-9, recalcularlos a partir de la base UWES-9 (N=9.679) usando las distribuciones de la Tabla 27 del manual. **Confirmar valores con Triple i en la conversación de licencia.** **Bloquea el motor de scoring de DescubreMe.**

**Pregunta abierta 2: ¿Cuál es el costo real de la licencia comercial Triple i para un caso B2C/B2B-A LATAM de USD 19 por venta?**
*Plan:* Enviar el email de Sección 6.4 dentro de los próximos 7 días. Esperar cotización formal. Si supera el umbral de viabilidad (~5-15% del ticket B2C), activar Plan B (MWMS + UWES-3) y/o renegociar estructura mixta.

**Pregunta abierta 3: ¿Debe DescubreMe reportar engagement como factor global único o como 3 dimensiones, dada la multicolinealidad latente r=.80-.95?**
**Hecho:** Schaufeli, Bakker & Salanova (2006) y el manual (Schaufeli & Bakker, 2003) sugieren explícitamente: *"the use of the total score is preferred"* cuando se trate de análisis de regresión multivariada por multicolinealidad. Las correlaciones latentes UWES-9 base internacional son: Vigor-Dedicación r=.96; Dedicación-Absorción r=.84; Vigor-Absorción r=.79 (Tabla 22 del manual).
`[Aporte Gemini]` **El debate factorial es más amplio.** La revisión sistemática de Kulikowski sobre 11 estudios CFA del UWES-9 reporta: 3 estudios respaldan el modelo **unidimensional**, 3 respaldan el **trifactorial clásico**, 4 concluyen que ambos modelos son **estadísticamente equivalentes** y 1 no respalda ninguno. Adicionalmente, hay escuelas que proponen modelo **bidimensional Vigor + Dedicación** (omitiendo Absorción, p. ej. estudios en banca India y revisiones en Polonia/Sudáfrica) bajo la tesis de que la absorción es epifenomenal o solapa con workaholism. La síntesis contemporánea favorece **modelos jerárquicos / bifactor** con un factor general inclusivo en la cima y los 3 factores específicos subordinados.
*Plan:* **Decisión recomendada provisional (Opinión profesional): reportar las 3 dimensiones de cara al usuario por su valor narrativo y formativo (especialmente en B2B-A), pero internamente almacenar también el factor global UWES-9 total** (M=3.74; DT=1.17 base holandesa) para análisis longitudinal y benchmarking. **Cuando se acumule N≥800 colombianos, ajustar modelos bifactor (factor general + 3 específicos) y comparar contra trifactorial clásico, antes de decidir cómo reportar definitivamente.** Auditoría de coherencia: si la correlación intra-usuario entre dimensiones supera .90, mostrar advertencia interna y enfatizar el factor global.

**Pregunta abierta 4: ¿La validación colombiana 2025 (Dajud-Casas et al.) será replicada en revistas de mayor impacto y con muestra no limitada a sector salud?**
*Plan:* Monitorear publicaciones de Universidad de los Andes, Javeriana, Externado, Rosario y El Bosque en *Universitas Psychologica*, *Suma Psicológica*, *Revista Latinoamericana de Psicología*. Considerar co-publicación de los datos acumulados de DescubreMe con un equipo académico colombiano una vez se alcance N≥800. **`[Aporte Gemini]`** El paper de revisión 2013-2023 (SciELO Colombia, "Análisis de aspectos metodológicos y aplicaciones del engagement laboral en organizaciones colombianas") confirma que UWES domina pero advierte sobre la **escasez de estudios longitudinales e invarianza temporal en Colombia** — DescubreMe puede aportar esta evidencia capturando re-tests del mismo usuario en t+6 y t+12 meses.

**Pregunta abierta 5: ¿El factor global UWES-9 puede activar el NFR-28 (riesgo workaholism) sin perder sensibilidad?**
*Plan:* El patrón Absorción≥P90 + Dedicación≥P75 + Vigor≤P40 solo se detecta usando las 3 dimensiones; el factor global no lo captura. **Decisión:** mantener motor dual (factor global + 3 dimensiones) y reservar la activación del mensaje de contención al perfil de dimensiones, no al factor global.

---

## SECCIÓN 10 — Referencias APA 7

Bakker, A. B., Albrecht, S. L., & Leiter, M. P. (2011). Key questions regarding work engagement. *European Journal of Work and Organizational Psychology, 20*(1), 4-28. https://doi.org/10.1080/1359432X.2010.485352

Bakker, A. B., & Demerouti, E. (2007). The Job Demands-Resources model: State of the art. *Journal of Managerial Psychology, 22*(3), 309-328. https://doi.org/10.1108/02683940710733115

Carmona-Halty, M., Schaufeli, W. B., & Salanova, M. (2019). The Utrecht Work Engagement Scale for Students (UWES–9S): Factorial validity, reliability, and measurement invariance in a Chilean sample of undergraduate university students. *Frontiers in Psychology, 10*, 1017. https://doi.org/10.3389/fpsyg.2019.01017

Cortés-Denia, D., Lopez-Zafra, E., & Pulido-Martos, M. (2023). Physical and psychological health relations to engagement and vigor at work: A PRISMA-compliant systematic review. *Current Psychology, 42*(1), 765-780. https://doi.org/10.1007/s12144-021-01450-y

Dajud-Casas, L. E., Tuirán-Tuirán, Y. I., Villota-Díaz, W. E., & Monsalve-Ospina, Y. O. (2025). Validación de la Utrecht Work Engagement Scale (UWES) para medir la motivación laboral en trabajadores de la salud en Colombia. *Ciencia Latina Revista Científica Multidisciplinar, 9*(5). https://ciencialatina.org/index.php/cienciala/article/view/20526

Hernández-Vargas, C. I., Llorens-Gumbau, S., Rodríguez-Sánchez, A. M., & Dickinson-Bannack, M. E. (2016). Validación de la escala UWES-9 en profesionales de la salud en México. *Pensamiento Psicológico, 14*(2), 89-100. https://doi.org/10.11144/Javerianacali.PPSI14-2.veup

Kahn, W. A. (1990). Psychological conditions of personal engagement and disengagement at work. *Academy of Management Journal, 33*(4), 692-724. https://doi.org/10.5465/256287

Salanova, M., Schaufeli, W. B., Llorens, S., Peiró, J. M., & Grau, R. (2000). Desde el "burnout" al "engagement": ¿Una nueva perspectiva? *Revista de Psicología del Trabajo y de las Organizaciones, 16*(2), 117-134. https://dialnet.unirioja.es/servlet/articulo?codigo=620197

Schaufeli, W. B., & Bakker, A. B. (2003). *UWES — Utrecht Work Engagement Scale: Preliminary manual* [Version 1.1, December 2004]. Occupational Health Psychology Unit, Utrecht University. https://www.wilmarschaufeli.nl/publications/Schaufeli/Test%20Manuals/Test_manual_UWES_English.pdf [versión española: https://www.wilmarschaufeli.nl/publications/Schaufeli/Test%20Manuals/Test_manual_UWES_Espanol.pdf]

Schaufeli, W. B., Bakker, A. B., & Salanova, M. (2006). The measurement of work engagement with a short questionnaire: A cross-national study. *Educational and Psychological Measurement, 66*(4), 701-716. https://doi.org/10.1177/0013164405282471

Schaufeli, W. B., Martínez, I. M., Marques-Pinto, A., Salanova, M., & Bakker, A. B. (2002). Burnout and engagement in university students: A cross-national study. *Journal of Cross-Cultural Psychology, 33*(5), 464-481. https://doi.org/10.1177/0022022102033005003

Schaufeli, W. B., Salanova, M., González-Romá, V., & Bakker, A. B. (2002). The measurement of engagement and burnout: A two sample confirmatory factor analytic approach. *Journal of Happiness Studies, 3*(1), 71-92. https://doi.org/10.1023/A:1015630930326

Schaufeli, W. B., Shimazu, A., Hakanen, J., Salanova, M., & De Witte, H. (2019). An ultra-short measure for work engagement: The UWES-3 — Validation across five countries. *European Journal of Psychological Assessment, 35*(4), 577-591. https://doi.org/10.1027/1015-5759/a000430

Schaufeli, W. B., Taris, T. W., & Bakker, A. B. (2008). It takes two to tango: Workaholism is working excessively and working compulsively. In R. J. Burke & C. L. Cooper (Eds.), *The long work hours culture: Causes, consequences and choices* (pp. 203-225). Emerald. https://www.wilmarschaufeli.nl/publications/Schaufeli/288.pdf

Schaufeli, W. B., Taris, T. W., & Van Rhenen, W. (2008). Workaholism, burnout, and work engagement: Three of a kind or three different kinds of employee well-being? *Applied Psychology: An International Review, 57*(2), 173-203. https://doi.org/10.1111/j.1464-0597.2007.00285.x

Spontón, C., Medrano, L. A., Maffei, L., Spontón, M., & Castellano, E. (2012). Validación del cuestionario de Engagement UWES a la población de trabajadores de Córdoba, Argentina. *Liberabit, 18*(2), 147-154. http://www.scielo.org.pe/scielo.php?script=sci_arttext&pid=S1729-48272012000200005

Triple i Human Capital. (s.f.). *Our license options*. https://www.3ihc.nl/en/our-license-options/

Villavicencio-Ayub, E., Jurado Cárdenas, S., & Aguilar Villalobos, J. (2014). Adaptación de las escalas UWES y OSI para trabajadores mexicanos. *Psicología Iberoamericana, 22*(2), 6-15. https://doi.org/10.48102/pi.v22i2.61

**`[Aportes desde Gemini — verificación pendiente]`** (las siguientes referencias se citan en el reporte de Gemini con enlaces secundarios; se conservan aquí como punto de partida para verificación antes de uso en comunicación oficial o publicaciones):

Kulikowski, K. (revisión sistemática sobre dimensionalidad UWES-9). [Localizar paper primario; citado por Gemini sin DOI directo.]

Vinšová et al. (2024). *Validation of the Utrecht Work Engagement Scale (UWES-9) in the Czech Republic*. PMC12663390. [Verificar metadatos primarios; en Gemini aparece como referencia 5 sin DOI directo.]

Shuck, B., et al. (2016). *Employee Engagement Scale (EES)*. [Referencia para Plan B y para contextualizar estudio Repositorio UNAL de 126 desarrolladores en Bogotá.]

Análisis de aspectos metodológicos y aplicaciones del engagement laboral en organizaciones colombianas (2023). *SciELO Colombia*. http://www.scielo.org.co/scielo.php?script=sci_arttext&pid=S1794-99982023000100232 [Revisión sistemática 2013-2023 que documenta hegemonía de UWES en literatura colombiana.]

Domínguez-Lara, S., y col. (2022). Análisis psicométrico y datos normativos de la UWES en adolescentes peruanos. *Dialnet*. https://dialnet.unirioja.es/descarga/articulo/8836245.pdf [Referencia primaria del UWES-6S peruano por purga de 3 ítems.]

Repositorio UNAL — Estudio teletrabajo 126 desarrolladores Bogotá. https://repositorio.unal.edu.co/bitstreams/4705a9f5-6626-41a6-8e64-3da144855b9e/download [Uso de EES de Shuck, no UWES; referencia contextual sobre liderazgo y autonomía en teletrabajo LATAM.]

---

## APÉNDICE A — Mapa de aportes consolidados desde Gemini

| # | Aporte | Sección donde se integró | Valor agregado | Verificación recomendada |
|---|---|---|---|---|
| A1 | Encuadre histórico-conceptual: UWES como ruptura con modelo continuo de Maslach & Leiter (1997); ítems del UWES como inversión semántica del MBI | §0 (Resumen ejecutivo, bloque post-resumen) | Justifica para UX y para comunicación con Triple i por qué se introduce la Absorción como dominio nuevo (no como opuesto de "ineficacia"). Refuerza la decisión de no devolver Absorción aislada. | Schaufeli et al. (2002) y Schaufeli & Bakker (2003) están en referencias. La tesis del MBI invertido aparece literalmente en el manual; **verificar tabla específica antes de citar en comunicación con autores**. |
| A2 | Anclaje en JD-R (Bakker & Demerouti, 2007): engagement como mediador del proceso motivacional entre recursos (laborales + personales) y outcomes (productividad, retención, innovación) | §0 (segundo aporte) | Útil para framing del UWES-9 en B2B-A: el UWES mide el outcome motivacional, no el clima ni el compromiso normativo. | Bakker & Demerouti (2007) añadida a referencias. Marco teórico estándar; sin riesgo de cita débil. |
| A3 | Variante UWES-6S adolescentes peruanos (Domínguez-Lara et al., 2022) — derivada por purga de 3 ítems con CFA inestable en NSE medio-bajo | §1.2 (tabla banco oficial vs. derivadas) y §2 (tabla adaptaciones) | Nota de cautela: si en Colombia se acumulan datos de adolescentes o NSE medio-bajo, no asumir invarianza con la base trabajadora-adulta. | Paper en Dialnet (Domínguez-Lara, 2022); referencia primaria localizable, citada con marca de aporte. |
| A4 | Validación checa UWES-9 (Vinšová et al., 2024; PMC12663390) | §2 (tabla adaptaciones) y §3 (tabla baremos) | Punto de referencia europeo adicional al manual original holandés. | El registro PubMed es secundario en el reporte de Gemini; **verificar paper primario y DOI antes de citar a Triple i**. |
| A5 | Lectura cualitativa de la distribución internacional: media ítem 7 (orgullo) sistemáticamente la más alta; asimetría positiva ligera | §3 (Lectura cualitativa del manual oficial) | Permite afinar interpretación de bandas en DescubreMe (no celebrar como "alto" el orgullo aislado). | Aseveración derivable del manual oficial Schaufeli & Bakker (2003); confirmar tabla específica al verificar valores de cutoffs. |
| A6 | Distinción Dedicación vs. Satisfacción laboral | §5 (descripción técnica de Dedicación, banda interna) | Mejora el copy interpretativo: evita que un usuario lea "alto en dedicación" como sinónimo de "contento con el trabajo". | Tesis estándar en literatura JD-R; no requiere cita primaria nueva. |
| A7 | Distinción Absorción vs. Flow (Csikszentmihalyi) | §5 (descripción técnica de Absorción) | Justifica medir absorción como estado prolongado (no como pico de flow); útil para responder preguntas de usuarios formados. | Tesis estándar en literatura; referenciable vía Schaufeli et al. y vía Csikszentmihalyi (no añadida a §10 para no inflar referencias). |
| A8 | Errores residuales correlacionados ítem 8 ↔ ítem 9 (Absorción) en CFA trifactorial | §4 (nota CFA) y §8.4 (Output esperado piloto) | Salvavidas operativo: si el CFA del piloto colombiano no ajusta con modelo estricto, testear esta liberación antes de descartar modelo. | Documentado en validaciones múltiples; **confirmar índices exactos en Schaufeli & Bakker (2003) o Hernández-Vargas et al. (2016)** antes de usar como argumento en reporte académico. |
| A9 | Modelo bifactor jerárquico (factor general + 3 específicos) como síntesis del debate factorial | §9 pregunta 3 | Da un camino concreto para la decisión "global vs. dimensiones" cuando DescubreMe tenga N≥800. | Documentado en literatura UWES (ResearchGate 360359415, "Testing second-order and bifactor models"). |
| A10 | Revisión sistemática Kulikowski (11 estudios CFA UWES-9): 3 unifactor / 3 trifactor / 4 equivalentes / 1 ninguno | §9 pregunta 3 | Encuadra honestamente la indeterminación factorial del instrumento; útil para reportar limitaciones en publicación colombiana. | **Localizar paper primario Kulikowski**; en Gemini aparece sin DOI directo. |
| A11 | Patrón Absorción alta + Dedicación alta + Vigor bajo → burnout en ciernes (no falta de pasión) | §7.2 (refuerzo NFR-28) | Justifica conceptualmente el mensaje de contención de DescubreMe desde la teoría de intervención, no solo desde Schaufeli, Taris & Van Rhenen (2008). | Schaufeli, Taris & Van Rhenen (2008) ya está en referencias; la inferencia de intervención organizacional es estándar en literatura JD-R. |
| A12 | Patrón Absorción baja + Vigor/Dedicación normales → hipoestimulación → job crafting (no programas de bienestar) | §5 (banda baja Absorción, nota interna B2B-A) | Insight de producto para reportes B2B-A: orienta la intervención organizacional sin pretender ser clínico. | Estándar en literatura JD-R y job crafting; **marcar como opinión profesional** al usarlo con clientes B2B-A. |
| A13 | Migración Cronbach α → McDonald ω en validaciones recientes UWES | §8.4 (Output esperado piloto) | Recomendación técnica para el reporte psicométrico del piloto colombiano: usar ω además de α. | Tendencia documentada en literatura psicométrica reciente (incl. Dajud-Casas 2025). |
| A14 | Estudio Repositorio UNAL (n=126 tech Bogotá, 81% teletrabajo) — usaron EES de Shuck, no UWES | §2 (tabla adaptaciones, marcado como referencia contextual) y §6.6 (Plan B con EES) | Evidencia contextual sobre liderazgo y autonomía como predictores en teletrabajo LATAM; advierte que no es validación UWES. | URL del repositorio incluida; **al citar, dejar claro que NO es validación UWES** para no engañar al lector. |
| A15 | Revisión 2013-2023 (SciELO Colombia): UWES domina >55% de la literatura colombiana sobre engagement; UWES-9 desplazando a UWES-17 | §2 (tabla adaptaciones) y §9 pregunta 4 | Soporte de mercado para decisión de stack (no es elección caprichosa: es la escala nacionalmente dominante). | Paper SciELO Colombia (S1794-99982023000100232) citado por Gemini; **verificar lectura específica del 55% antes de usar como dato de mercado en presentaciones**. |

**Lectura general del Apéndice A:** quince aportes de Gemini integrados, todos de naturaleza académica/conceptual complementaria. Ninguno altera las decisiones operativas del Pack (licencia, ítems, baremos numéricos, textos al usuario, disclaimers, líneas de ayuda, piloto cognitivo). Los aportes valen como (a) refuerzo conceptual para el copy de UX y para diálogo con Triple i / con academia colombiana, (b) salvavidas técnicos para el piloto (correlación residual ítem 8 ↔ 9; modelos bifactor; ω de McDonald), y (c) framings de intervención para reportes B2B-A. Los aportes A1, A4, A8 y A10 requieren verificación primaria antes de citarse en comunicación oficial o publicación.

---

## APÉNDICE B — Notas de consolidación (metodología)

**Origen del documento.** Este consolidado combina dos investigaciones independientes producidas en mayo 2026:

1. `Prompt_05_UWES-9_IAR.Claude.md` — Implementation Acquisition Pack completo de 10 secciones siguiendo el prompt v1.0. Cumplimiento: 100% de los requisitos del brief (10/10 secciones operativas, marcadores Hecho/Inferencia/Opinión profesional, anti-alucinación de baremos con [sin fuente verificada] explícito, referencias APA 7 con DOI).
2. `Prompt_05_UWES-9_IAR.Gemini.md` — Revisión académica narrativa estilo *white paper* (~230 secciones de texto continuo) sobre el UWES-9. **NO siguió la estructura de 10 secciones del prompt v1.0; no entregó ítems literales (es/en), lista de inversos, textos de interpretación es-CO, plan de licencia operativo, borrador de email, disclaimers pre/post, NFR-28, líneas Colombia, piloto cognitivo, costo licencia ni baremos numéricos.** Gran parte de los valores cuantitativos están codificados como imágenes base64 inline, lo cual impide verificación textual de cifras. Aportes principales en formato narrativo: encuadre histórico (MBI → UWES), anclaje JD-R, debate factorial (Kulikowski), distinciones conceptuales clave (Dedicación vs. satisfacción, Absorción vs. flow), variantes UWES-6S, dimensión bifactor, errores residuales CFA AB8-AB9, implicaciones de intervención organizacional.

**Criterio de consolidación aplicado.**
- **Estructura:** se preserva íntegra la del Pack de Claude (10 secciones + Apéndices A y B nuevos).
- **Contenido operativo (ítems, baremos numéricos, textos al usuario es-CO, email de licencia, disclaimers, NFR-28, piloto, líneas Colombia):** se mantiene el de Claude porque Gemini no lo produjo.
- **Aportes académicos de Gemini:** se integran SOLO cuando aportan información nueva verificable y útil para producto. Cada aporte se marca con `[Aporte Gemini]` en el lugar donde aparece, y se traza en el Apéndice A con nivel de verificación.
- **Discrepancias entre Claude y Gemini:** no se encontraron discrepancias factuales sustanciales (autores, año, DOI principal, contactos, estructura tridimensional, ítems sin clave inversa, licencia comercial vía Triple i) porque Gemini no entregó la mayoría de esos datos. Donde ambos tocaron el mismo punto (Hernández-Vargas et al. 2016 México; Dajud-Casas et al. 2025 Colombia N=410 sector salud con CFI=.81/RMSEA=.095; Spontón et al. 2012 Argentina; Carmona-Halty et al. 2019 Chile), las cifras y conclusiones coinciden.

**Limitaciones del consolidado.**
- Los valores numéricos de cutoffs P5/P25/P75/P95 por dimensión del manual oficial siguen marcados como [valores absolutos a verificar in situ en el PDF antes de implementar el motor de scoring]. **Bloquea el motor de scoring (§9 pregunta 1).**
- El costo real de la licencia comercial Triple i sigue marcado como [sin fuente verificada en monto]. **Bloquea el lanzamiento comercial (§9 pregunta 2).**
- Los aportes A1, A4, A8 y A10 (datos específicos del manual sobre MBI invertido; metadatos de la validación checa; correlaciones residuales numéricas del CFA; revisión Kulikowski) requieren verificación primaria antes de usarse en comunicación oficial con Triple i o en publicación académica colombiana.
- El estudio Repositorio UNAL (n=126 tech Bogotá) NO es una validación UWES — usaron la EES de Shuck — y debe citarse como referencia contextual sobre teletrabajo LATAM, no como evidencia psicométrica del UWES.
- La validación colombiana 2025 (Dajud-Casas et al., N=410) tiene ajuste subóptimo (CFI=.81; RMSEA=.095) y está limitada a sector salud; **no es generalizable** al universo trabajador colombiano de DescubreMe.

---

*Fin del Implementation Acquisition Pack v1.0 — UWES-9 — CONSOLIDADO · DescubreMe · LATAM/Colombia · Mayo 2026*
