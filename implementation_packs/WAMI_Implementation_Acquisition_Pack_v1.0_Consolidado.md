# Implementation Acquisition Pack v1.0 — WAMI (Work and Meaning Inventory) — CONSOLIDADO Claude + Gemini

**Producto:** DescubreMe (plataforma freemium B2C de autoconocimiento adulto, LATAM/Colombia)
**Autor del pack:** Equipo psicométrico DescubreMe — para Germán Vélez
**Fecha de consolidación:** Mayo de 2026
**Versión:** v1.0 — refactor a arquitectura test-as-plugin sobre stack v2.0

---

## Nota metodológica del consolidado

Este documento integra dos investigaciones independientes ejecutadas sobre el mismo prompt v1.0:

- **Pack Claude:** entregó las 10 secciones operativas requeridas por el prompt v1.0, con cumplimiento alto en tabla de ítems literales (inglés + adaptación es-Duarte-Lores), baremos publicados con cita primaria, plan de licencia con email copy-paste, disclaimers es-CO con líneas Colombia, piloto cognitivo y referencias APA 7.
- **Pack Gemini:** NO cumplió la estructura de 10 secciones del prompt v1.0. Entregó un ensayo académico narrativo extenso (sin §5, §6, §7, §8, §9 operativas) centrado en marco teórico, variantes estructurales transculturales (EE.UU., Italia, Francia, Turquía, Indonesia, España fase 1 y 2, Sudáfrica, Polonia, Brasil) y red nomológica del constructo (SDT, job crafting, liderazgo transformacional, retención).

**Método de consolidación aplicado:** "Claude base + Gemini suple". El pack Claude se conserva como esqueleto operativo (cumple las 10 secciones). De Gemini se integran únicamente aportes que (a) añaden información nueva no presente en Claude, (b) son verificables con la cita citada por Gemini o con literatura conocida y (c) tienen valor de producto. Cada aporte se marca en línea con `[Aporte Gemini]` y se cataloga en el Apéndice A. Los aportes que no superaron el filtro de verificación se descartan o se marcan con `[verificar antes de uso]`.

---

## Tabla de cobertura (Claude vs Gemini frente al prompt v1.0)

| Sección | Claude | Gemini |
|---|---|---|
| §0 Portada / metadatos / status bloqueadores | OK | PARCIAL (sólo introducción narrativa, sin status de bloqueadores ni resumen ejecutivo operativo) |
| §1 Acquisition plan banco de ítems + lista literal con clave directa/inversa | OK (tabla en inglés con clave + copyright literal del PDF oficial) | PARCIAL (tabla bilingüe inglés-español, sin clave directa/inversa explícita salvo asterisco al ítem 3) |
| §2 Adaptaciones al español por país con DOI/URL + recomendación es-CO | OK (España Duarte-Lores 2023, España Carrasco 2026, Brasil Leonardo 2019, Brasil Zanotelli 2022, con DOIs y N) | PARCIAL (cita Duarte-Lores y Carrasco, agrega Letona-Ibañez N=814; no estructura tabla por país con DOI; sin recomendación es-CO operativa) |
| §3 Baremos publicados + recomendación LATAM + roadmap CO | OK (medias y DT del paper original; α por país; bandas operativas M±1DT; roadmap 0–24 meses) | NO (no baremos, no roadmap CO) |
| §4 Ítems inversos numerados con faceta | OK (tabla explícita + corrección documental del briefing) | PARCIAL (asterisco en ítem 3, sin tabla operativa) |
| §5 Textos interpretación es-CO (BAJO/MEDIO/ALTO por dimensión, tuteo cordial, ≤80 palabras) | OK (3 dimensiones × 3 bandas = 9 textos originales DescubreMe) | NO (cero textos para usuario final) |
| §6 License acquisition plan + email copy-paste + costo + Plan B | OK (titular, política verbatim de Steger, dossier, email copy-paste en inglés, costo USD 1.500/año, Plan B CMWS) | NO |
| §7 Disclaimers pre/post + NFR-28 + líneas Colombia | OK (pre, post, mensaje contención, tabla 7 líneas Colombia, trigger técnico) | NO |
| §8 Piloto cognitivo Colombia (muestra, think-aloud, criterios, entregables) | OK (N=12–20, estratificación, protocolo, criterios aceptación/re-adaptación, entregables) | NO |
| §9 Gaps y preguntas abiertas (≥3) | OK (5 gaps con plan) | NO |
| §10 Referencias APA 7 con DOI (≥10) | OK (15 referencias con DOI) | PARCIAL (27 fuentes en estilo numérico web, sin formato APA 7 estricto, varias URLs sin DOI) |

**Diagnóstico:**
- Claude: cumplimiento ALTO (10/10 secciones útiles para implementación).
- Gemini: cumplimiento NO (entrega ensayo académico, no IAR). Aporta enriquecimiento teórico y transcultural verificable que se integra como notas en línea.

---

## SECCIÓN 0 — PORTADA Y METADATOS

**Nombre del instrumento:** Work and Meaning Inventory (WAMI)
**Autores originales:** Steger, M. F., Dik, B. J., & Duffy, R. D.
**Año de publicación original:** 2012 (Journal of Career Assessment, 20(3), 322–337)
**DOI canónico:** 10.1177/1069072711436160
**Idioma original:** inglés (Estados Unidos)
**Versión a implementar:** WAMI estándar de 10 ítems, escala Likert de 5 puntos (1 = Absolutely untrue / Totalmente falso, a 5 = Absolutely true / Totalmente verdadero), conforme a la hoja oficial publicada por Steger (© 2011 Michael F. Steger). Tiempo estimado: 3–4 minutos.

> [Aporte Gemini] En investigación contemporánea, "algunos estudios han preferido utilizar una amplitud de 7 puntos para forzar una mayor sensibilidad estadística y capturar varianzas más sutiles" (p. ej., el propio Duarte-Lores et al., 2023, usó 7 puntos). DescubreMe mantiene 5 puntos por NFR-35 (retrocompatibilidad con stack v2.0) y por fidelidad a la hoja oficial de Steger.

**Constructo:** Trabajo significativo (meaningful work) como experiencia eudaimónica, modelo multidimensional con un factor de segundo orden ("Meaningful Work") y tres factores de primer orden:
- **Positive Meaning** (PM): significado positivo y propósito del trabajo (4 ítems: 1, 4, 5, 8)
- **Meaning-Making Through Work** (MM): el trabajo como vehículo para construir sentido vital (3 ítems: 2, 7, 9)
- **Greater Good Motivations** (GG): motivación por el bien mayor (3 ítems: 3R, 6, 10)

> [Aporte Gemini — marco teórico] Distinción conceptual relevante para textos pre-test: el "significado del trabajo" (Meaning of Work) es una evaluación neutral ("¿qué función cumple el trabajo en tu vida?"), mientras que el "trabajo significativo" (Meaningful Work) que mide el WAMI es un constructo con valencia inherentemente positiva ("¿cuán significativo es tu trabajo?"). Fuente: Steger et al., 2012; Both-Nwabuwe et al., 2017. Útil para evitar ambigüedad en copy de marketing y onboarding.

**Titular del copyright:** © 2011 Michael F. Steger. La marca WAMI® aparece como tal en el sitio actual del autor. Bryan J. Dik (Colorado State University) y Ryan D. Duffy (University of Florida) figuran como coautores del paper original.

**Productos destino en DescubreMe:** Paid (autoconocimiento profundo), B2B-A (orientación organizacional educativa) e Ikigai Premium (módulo de propósito laboral). WAMI seguirá como instrumento principal operativo de "trabajo significativo" en el stack; CMWS (Lips-Wiersma & Wright, 2012) queda como alternativa B2B premium condicional.

**Resumen ejecutivo (5 líneas).** El WAMI es un inventario corto (10 ítems, 3–4 min) con sólido respaldo psicométrico para medir trabajo significativo en adultos trabajadores. Sus ítems están publicados literalmente en fuente abierta del autor (michaelfsteger.com/WAMI.pdf) y replicados en el paper original. Tiene tres adaptaciones al español/portugués arbitradas (España 2023 Duarte-Lores et al., España 2026 Carrasco et al., y Brasil portugués 2019 Leonardo et al.); recomendamos como base la versión Duarte-Lores et al. (2023), única que el equipo ya validó para v2.0, complementada con revisión léxica colombiana. La licencia es académica gratuita; el uso freemium comercial **requiere autorización escrita previa de Michael F. Steger** y se debe gestionar antes del release v1.5.

**Status de bloqueadores:**
- **Banco de ítems literales (inglés):** READY. Hoja oficial pública en michaelfsteger.com (PDF con copyright explícito), replicada en el paper Steger et al. (2012).
- **Adaptación al español arbitrada:** READY (Duarte-Lores et al., 2023, Current Psychology, acceso abierto CC-BY 4.0).
- **Baremos publicados:** PARTIAL. El paper original publica medias y desviaciones por subescala y total (N = 370); invarianza por género en muestra española N = 806 (Carrasco et al., 2026); otra muestra española N = 350 + N = 312 salud (Duarte-Lores et al., 2023). **No existen percentiles publicados ni baremos colombianos**.
- **Licencia comercial freemium:** BLOCKED hasta correr el plan de Sección 6. La licencia académica es libre; la comercial requiere autorización escrita de Steger (mismo titular que MLQ).

---

## SECCIÓN 1 — ACQUISITION PLAN DEL BANCO DE ÍTEMS

### 1.1 Disponibilidad pública del banco de ítems en inglés

Los 10 ítems del WAMI están publicados literalmente y en abierto en dos fuentes del propio autor:

1. Hoja oficial del instrumento con instrucciones de puntaje: http://www.michaelfsteger.com/wp-content/uploads/2012/08/WAMI.pdf (PDF, © 2011 Michael F. Steger, sin paywall, sin registro).
2. Paper Steger, Dik & Duffy (2012), Tabla 1 (sin paywall vía michaelfsteger.com/wp-content/uploads/2012/12/Steger-Dik-Duffy-JCA-2012.pdf, además de la versión SAGE bajo DOI).

**Reproducción del banco oficial en inglés (instrucciones literales del autor: "Please honestly indicate how true each statement is for you and your work. Absolutely Untrue / Mostly Untrue / Neither True nor Untrue / Mostly True / Absolutely True"):**

| # | Ítem (inglés) | Subescala | Clave |
|---|---|---|---|
| 1 | I have found a meaningful career. | Positive Meaning (PM) | directa |
| 2 | I view my work as contributing to my personal growth. | Meaning-Making (MM) | directa |
| 3 | My work really makes no difference to the world. | Greater Good (GG) | **inversa (R)** |
| 4 | I understand how my work contributes to my life's meaning. | Positive Meaning (PM) | directa |
| 5 | I have a good sense of what makes my job meaningful. | Positive Meaning (PM) | directa |
| 6 | I know my work makes a positive difference in the world. | Greater Good (GG) | directa |
| 7 | My work helps me better understand myself. | Meaning-Making (MM) | directa |
| 8 | I have discovered work that has a satisfying purpose. | Positive Meaning (PM) | directa |
| 9 | My work helps me make sense of the world around me. | Meaning-Making (MM) | directa |
| 10 | The work I do serves a greater purpose. | Greater Good (GG) | directa |

**Aviso de copyright tomado literal del PDF oficial:** "© 2011 Michael F. Steger. The Work and Meaning Inventory (WAMI) can be used in research and educational capacities without restriction. Permission for commercial or revenue-generating applications of the WAMI must be obtained from Michael F. Steger prior to use."

### 1.2 Banco oficial vs adaptaciones derivadas

- **Banco oficial:** versión en inglés alojada en michaelfsteger.com (la única autoritativa). Cualquier adaptación a otro idioma es derivada y debe respetar la cadena de copyright al titular original.
- **Adaptaciones derivadas formalmente publicadas con DOI:** español de España (Duarte-Lores et al., 2023; Carrasco et al., 2026), portugués brasileño (Leonardo et al., 2019; Zanotelli et al., 2022), italiano (Paola et al., 2022), húngaro (Csordás et al., 2022), turco (Akın et al., 2013), polaco (Puchalska-Kamińska et al., 2019), indonesio (Rahmi et al., 2019). Según la propia página del autor (michaelfsteger.com/?page_id=105), "el WAMI está actualmente disponible en inglés y alemán, mientras que las traducciones al chino y al neerlandés están en desarrollo"; la versión alemana de referencia es la de Harzer & Steger (2012).

> [Aporte Gemini — replicaciones adicionales útiles para el dossier de licencia] Validaciones transculturales adicionales no listadas por Claude: **Italia** (Di Fabio, 2018; N=344; replicó modelo de 3 factores; α total > .90), **Francia** (Arnoux-Nicolas et al., 2017; replicó 3 factores), **Sudáfrica** (Finch, 2014; obtuvo estructura trunca de 2 dimensiones: Significado Positivo + Bien Mayor). Útiles para argumentar al titular en la solicitud de licencia que el WAMI tiene amplia validación internacional. [verificar antes de uso — la cita Finch 2014 Sudáfrica no fue verificada con DOI por Gemini]

### 1.3 Estructura del banco

- 10 ítems, todos cortos (8–14 palabras en inglés).
- 3 subescalas: PM (4 ítems), MM (3 ítems), GG (3 ítems).
- **1 ítem inverso**: ítem 3.
- Formato: declaración en primera persona + Likert de 5 puntos (anchors verbales en ambos extremos y el punto medio).
- Puntaje por subescala = suma simple de ítems; total = suma de las tres subescalas (rango 10–50).

### 1.4 Recomendación operativa

Descargar la hoja oficial directamente de http://www.michaelfsteger.com/wp-content/uploads/2012/08/WAMI.pdf, archivarla en el repositorio de assets de DescubreMe con su PDF original como evidencia documental, y mantenerla como referencia canónica del banco en inglés. Toda la implementación es-CO debe verificarse contra esta hoja, no contra mirrors de terceros.

---

## SECCIÓN 2 — ADAPTACIONES AL ESPAÑOL

### 2.1 Tabla maestra de adaptaciones conocidas

| País | Autores | Año | Revista / DOI / URL | N muestra | Escala respuesta | Características | Acceso |
|---|---|---|---|---|---|---|---|
| España | Duarte-Lores, I.; Rolo-González, G.; Suárez, E.; Chinea-Montesdeoca, C. | 2023 (online 2021) | Current Psychology, 42(14), 12151–12163. DOI: 10.1007/s12144-021-02569-8 | Estudio 1: N = 350 trabajadores variados; Estudio 2: N = 312 salud | 7 puntos (1 = totalmente en desacuerdo / 7 = totalmente de acuerdo) | Replica el modelo de tres factores de primer orden + factor general de segundo orden. α total = .928 (Estudio 1) y .91 (Estudio 2). α por subescala: PM = .907 / .85; MM = .871 / .81; GG = .651 / .68 (la GG es la más débil por el ítem 3 inverso). | Acceso abierto CC-BY 4.0 |
| España | Carrasco, M.; Letona-Ibañez, O.; Martinez-Rodriguez, S.; Amillano, A. | 2026 | Discover Psychology, 6, art. 58. DOI: 10.1007/s44202-026-00586-x | N = 806 trabajadores | 5 puntos (1 = not at all true of me / 5 = totally true of me) | Adaptación basada en la tesis doctoral de Letona-Ibañez (2020, Universidad de Deusto). Mejor ajuste en modelo bifactor de 2 dimensiones (Self-Perspective vs World-Perspective). α total = .912. ECV = 78.3%. Invariancia métrica y escalar por género. Recomienda interpretar primariamente el puntaje total. | Acceso abierto |
| España (adaptación concurrente) | Letona-Ibañez, O. | 2020 (tesis) | Universidad de Deusto | N = 814 | n.d. | [Aporte Gemini] Validación previa de la versión española que sirvió de base para Carrasco et al. (2026). Avaló la fiabilidad del modelo clásico tridimensional. [verificar antes de uso — Gemini no aportó DOI/URL del repositorio Deusto] | Tesis doctoral |
| Brasil (portugués) | Leonardo, M. G. L.; Pereira, M. M.; Valentini, F.; Freitas, C. P. P.; Damásio, B. F. | 2019 | Revista Brasileira de Orientação Profissional, 20(1), 79–89. DOI: 10.26707/1984-7270/2019v20n1p79 | N = 667 profesionales (74% mujeres, M edad = 35,74) | 5 puntos | Mejor ajuste en estructura unifactorial (TLI = .99; RMSEA = .08). Cargas factoriales .65–.95. Correlaciones positivas con autoeficacia ocupacional (r = .55), motivación intrínseca (r = .77) y engagement laboral (r = .81). | Acceso abierto (pepsic / SciELO Brasil) |
| Brasil (portugués, validación adicional) | Zanotelli, L. G.; De Andrade, A. L.; Peixoto, J. M. | 2022 | Paidéia, 32, e3225. DOI: 10.1590/1982-4327e3225 | [Aporte Gemini] N = 2.111 trabajadores 18–77 años, 67% mujeres | n.d. | Confirma estructura unifactorial brasileña. [Aporte Gemini] Cargas factoriales .79–.89 (rotación negativa); comunalidades >.63 hasta .80 en ítems centrales; ítem 3 invertido con carga anémica .42 y comunalidad .18. | Acceso abierto |

**Verbatim de Tabla 1 de Duarte-Lores et al. (2023), traducción al español (recomendada como base es-CO):**

| # | Inglés (Steger et al., 2012) | Español (Duarte-Lores et al., 2023) |
|---|---|---|
| 1 | I have found a meaningful career. | He encontrado una carrera profesional llena de sentido. |
| 2 | I view my work as contributing to my personal growth. | Considero que mi trabajo contribuye a mi crecimiento personal. |
| 3 (R) | My work really makes no difference to the world. | Mi trabajo realmente no produce ningún cambio en el mundo. |
| 4 | I understand how my work contributes to my life's meaning. | Entiendo cómo mi trabajo contribuye al sentido de mi vida. |
| 5 | I have a good sense of what makes my job meaningful. | Tengo una buena idea de lo que hace que mi trabajo tenga sentido. |
| 6 | I know my work makes a positive difference in the world. | Sé que mi trabajo tiene un impacto positivo en el mundo. |
| 7 | My work helps me better understand myself. | Mi trabajo me ayuda a comprenderme mejor. |
| 8 | I have discovered work that has a satisfying purpose. | He descubierto un trabajo que tiene un propósito satisfactorio. |
| 9 | My work helps me make sense of the world around me. | Mi trabajo me ayuda a dar sentido al mundo que me rodea. |
| 10 | The work I do serves a greater purpose. | El trabajo que hago tiene un propósito mayor. |

**Nota sobre el dato de catálogo:** No se localiza adaptación arbitrada hecha en Colombia, México, Argentina, Chile ni Perú al cierre de mayo de 2026 (búsqueda en Dialnet, SciELO-Colombia, Redalyc, Google Scholar). El stack v2.0 había priorizado la adaptación española arbitrada (Duarte-Lores et al., 2023) por ser la única con validación formal disponible en el momento; en 2026 entró Carrasco et al. (2026) que ofrece un análisis bifactor más sofisticado pero con conclusión similar (la traducción es semánticamente equivalente).

### 2.2 Recomendación de base para es-CO

**Recomendación primaria:** mantener la traducción de Duarte-Lores et al. (2023), Tabla 1, como base para es-CO, con dos ajustes deliberados:
1. **Escala de respuesta:** usar 5 puntos (alineado con la hoja oficial de Steger y con el rango histórico del stack v2.0; NFR-35 retrocompatibilidad). Los anclajes Likert se traducen como: 1 = Totalmente falso / 2 = Casi falso / 3 = Ni falso ni verdadero / 4 = Casi verdadero / 5 = Totalmente verdadero.
2. **Revisión léxica colombiana** con tres ítems donde el español peninsular podría chocar con el oído colombiano (ver §2.3).

**Justificación:** Duarte-Lores et al. siguieron las directrices de Muñiz, Elosua y Hambleton (2013) — traducción/retrotraducción independiente con dos profesionales bilingües y reconciliación — y reportaron que "no había inconsistencias" entre versiones por la naturaleza corta y directa de las frases. Carrasco et al. (2026) confirman que ambas versiones españolas (Duarte-Lores y Letona-Ibañez) son "semánticamente equivalentes al instrumento original". La versión Duarte-Lores ya está implementada en stack v2.0, lo que minimiza riesgo de quiebre de datos históricos (NFR-35).

### 2.3 Modificaciones léxicas anticipadas para Colombia

**Hecho:** los ítems Duarte-Lores ya usan español neutro funcional. **Opinión profesional:** las únicas piezas con riesgo de extrañeza para usuario colombiano son:
- Ítem 1: "He encontrado una carrera profesional llena de sentido" — la palabra "carrera" en Colombia connota fuertemente "carrera universitaria/pregrado". Recomendación: mantener "carrera profesional" pero acompañar con tooltip explicativo "(tu trayectoria laboral)" en la UI.
- Ítem 5: "Tengo una buena idea de lo que hace que mi trabajo tenga sentido" — opcionalmente reformular como "Tengo claro qué le da sentido a mi trabajo" si el piloto cognitivo (§8) lo respalda.
- Ítem 9: "Mi trabajo me ayuda a dar sentido al mundo que me rodea" — frase abstracta; el piloto debe confirmar comprensión.

> [Aporte Gemini — hallazgo empírico antropológico relevante para el ítem 9] Carrasco et al. (2026) descubrieron que en la muestra española el ítem 9 NO carga adecuadamente en el factor "Perspectiva del Mundo (Comunión)" sino que muestra inmensa preferencia estadística por el factor general. Interpretación de Gemini: "para un trabajador en este marco cultural, la acción hermenéutica de 'dar sentido al mundo' no se concibe como un acto prosocial, exteriorizado o comunitario, sino como un proceso intensamente individual, reflexivo e internalizado". Valor para producto: durante el piloto §8, indagar específicamente si el respondiente colombiano interpreta el ítem 9 como acto prosocial o como acto introspectivo, lo que tiene implicación directa en cómo el motor de scoring asigna el ítem a la dimensión.

**Inferencia:** ninguno de los ítems contiene regionalismos peninsulares fuertes (no aparecen "currar", "majo", "vosotros", "ordenador", "móvil"), por lo que el riesgo léxico es bajo y se resuelve con piloto cognitivo de bajo N (§8).

---

## SECCIÓN 3 — BAREMOS PUBLICADOS

### 3.1 Tabla maestra de estadísticos publicados

**Anti-alucinación:** se reporta SOLO lo publicado verbatim. No existen tablas de percentiles publicadas para el WAMI en ninguna muestra; los autores originales y todas las adaptaciones reportan medias y desviaciones, no normas percentilares. Lo que sigue son los descriptivos exactos que sí están publicados, con cita.

| País / muestra | Fuente APA + DOI | N | Subescala / total | M | DT | Notas |
|---|---|---|---|---|---|---|
| EE.UU. (universidad, ocupaciones diversas) | Steger, M. F., Dik, B. J., & Duffy, R. D. (2012). *Journal of Career Assessment, 20*(3), 322–337. https://doi.org/10.1177/1069072711436160 | 370 | PM | 15.12 | 4.01 | Likert 1–5; rango teórico PM 4–20 |
| ídem | ídem | 370 | MM | 10.70 | 3.05 | Rango teórico MM 3–15 |
| ídem | ídem | 370 | GG | 11.80 | 2.85 | Rango teórico GG 3–15 |
| ídem | ídem | 370 | Total MW | 37.54 | 8.84 | Rango teórico total 10–50 |
| ídem | ídem | 370 | α total | — | — | α = .93 (total escala) [Aporte Gemini] α por subescala: PM = .89; MM = .82; GG = .83 |
| España (trabajadores variados) | Duarte-Lores, I. et al. (2023). *Current Psychology, 42*(14), 12151–12163. https://doi.org/10.1007/s12144-021-02569-8 | 350 | α total | — | — | α = .928 |
| España (salud) | ídem | 312 | α total | — | — | α = .91 |
| España (general) | Carrasco, M. et al. (2026). *Discover Psychology, 6*, art. 58. https://doi.org/10.1007/s44202-026-00586-x | 806 | Total WAMI (en métrica de media de ítem, 1–5) | 3.92 | 0.80 | α = .912; ECV = 78.3%; ωH = .853. [Aporte Gemini] Correlación con SWLS (Diener) r = .899 |
| Italia | Di Fabio, 2018 [verificar antes de uso — Gemini no aportó DOI] | 344 | α total | — | — | α > .90; replicó estructura de 3 factores |
| Brasil (validación masiva) | Zanotelli et al. (2022) | 2.111 | n.d. | — | — | [Aporte Gemini] Confirmó estructura unifactorial; ítem 3 con carga .42 y comunalidad .18 (anémica) |

**Sobre rangos teóricos por subescala (citado del paper original):** "Total scores on the PM (M = 15.12, SD = 4.01), MM (M = 10.70, SD = 3.05), and GG (M = 11.80, SD = 2.85) spanned the entire range of responses (3–15 or 4–20). The GG subscale received the highest ratings per item (3.93) followed by the PM (3.78) and MM subscales (3.57). The mean for the full MW scale was 37.54 (SD = 8.84)" (Steger, Dik & Duffy, 2012, p. 329).

**Percentiles publicados:** [sin fuente verificada]. Ninguna de las publicaciones revisadas reporta tabla de percentiles del WAMI. Esto es un gap real del instrumento.

### 3.2 Recomendación de baremo provisional para LATAM en DescubreMe

**Hecho:** no existen baremos publicados con percentiles, ni para LATAM, ni para España, ni para EE.UU.

**Inferencia + Opinión profesional:** la práctica menos invasiva es usar las medias y DT de Steger et al. (2012, N = 370) **solo como anclas de orientación interna** y NO comunicar percentiles al usuario hasta que DescubreMe acumule muestra propia. Para el algoritmo de bandas (bajo / medio / alto) del primer release, recomendamos usar **bandas teóricas calculadas a partir de la M y DT publicadas** del paper original, asumiendo normalidad aproximada (que el paper original sustenta con curtosis/asimetría dentro de ±2 y que la adaptación española de Carrasco et al., 2026, también respalda):

Bandas operativas iniciales para puntaje total WAMI (1–5 escala promedio por ítem; rango 10–50 sumatorio):
- **Banda BAJO**: total ≤ M – 1 DT ≈ ≤ 28,7 (≈ percentil ~16 asumiendo normalidad)
- **Banda MEDIO**: 28,7 < total < 46,4 (≈ percentil 17–83)
- **Banda ALTO**: total ≥ M + 1 DT ≈ ≥ 46,4 (≈ percentil ~84)

**Esto es una banda derivada, no un percentil empírico**: debe rotularse internamente como "banda orientativa basada en M ± 1 DT de la muestra original Steger et al. 2012", y la copy al usuario (Sección 5) NO debe afirmar "percentil X".

### 3.3 Roadmap para baremos colombianos propios

1. **Mes 0–3 post-release v1.5:** acumular datos anónimos en DescubreMe (≥ 500 respuestas Colombia adultos 18+ con consentimiento informado de uso agregado).
2. **Mes 3–6:** primer análisis interno — descriptivos, asimetría, curtosis, α de Cronbach, ω, descriptivos por edad/sexo/sector.
3. **Mes 6–12:** publicación interna de baremo provisional Colombia (M, DT, percentiles 10/25/50/75/90), revalidación de la estructura factorial (replicar CFA Duarte-Lores y bifactor Carrasco).
4. **Mes 12–24:** alianza académica con una universidad colombiana (Uniandes, Javeriana, Universidad del Valle, ULL como mentora) para publicación arbitrada de la adaptación-validación colombiana.

> [Aporte Gemini — hipótesis estructural relevante para el roadmap CO] Gemini sintetiza una hipótesis útil: "la persistencia de una estructura unidimensional en muestras sudamericanas masivas (Brasil N=2.111) sugiere una matriz cultural gestáltica" donde el respondiente latinoamericano procesa los beneficios personales y la contribución comunitaria como una experiencia inseparable, no como tres dimensiones discretas. **Implicación para el roadmap CO:** al replicar el CFA en Colombia, comparar explícitamente los 4 modelos (3 factores Steger, bifactor 2D Carrasco, unifactor Brasil, y modelo de 2D Sudáfrica Finch) antes de decidir cómo reportar subscores al usuario en el output de DescubreMe. Si el modelo unifactorial brasileño gana, simplificar la copy de §5 hacia un único score global puede ser psicométricamente más honesto. [verificar antes de uso — la lectura gestáltica de Gemini es interpretativa, no consenso académico]

---

## SECCIÓN 4 — ÍTEMS INVERSOS NUMERADOS

| Ítem # | Subescala / Dimensión | Clave | Notas |
|---|---|---|---|
| 1 | Positive Meaning | Directa | — |
| 2 | Meaning-Making | Directa | — |
| **3** | **Greater Good Motivations** | **INVERSA (R)** | Único ítem inverso del WAMI. Fórmula de puntaje (Steger): "Subtract the rating for item 3 from 6 (e.g., if a client gave item 3 a rating of 2, then their converted rating would be 4 [6-2=4])". El ítem es: "My work really makes no difference to the world" / "Mi trabajo realmente no produce ningún cambio en el mundo". Duarte-Lores et al. (2023) lo confirman explícitamente: "it is the only inverse item of the whole instrument, both in the original and the translated versions". Riesgo conocido: cargas factoriales bajas, doble negación, sensible a sesgos de respuesta; tanto Duarte-Lores et al. (.651 α GG con ítem 3) como Carrasco et al. (correlación ítem-total = .548, la más baja) lo documentan. [Aporte Gemini] Zanotelli et al. (2022, N=2.111 Brasil) reportan que el ítem 3 también tiene la carga más baja del instrumento (.42) y la comunalidad más marginal (.18), confirmando que el problema del ítem 3 es transcultural y no específico del español. |
| 4 | Positive Meaning | Directa | — |
| 5 | Positive Meaning | Directa | — |
| 6 | Greater Good Motivations | Directa | — |
| 7 | Meaning-Making | Directa | — |
| 8 | Positive Meaning | Directa | — |
| 9 | Meaning-Making | Directa | — |
| 10 | Greater Good Motivations | Directa | — |

**Corrección importante respecto al briefing del usuario.** El briefing original indicaba "Ítem 4 inverso: único ítem inverso del WAMI". **Esto es un error documental que el Pack corrige aquí con cita primaria.** El único ítem inverso es el **#3**, según (a) las instrucciones de puntaje del propio Steger, (b) la Tabla 1 del paper original (donde el ítem 3 aparece con la etiqueta "(R)"), y (c) la confirmación en la adaptación española de Duarte-Lores et al. (2023). Implementación: en el motor de puntaje, el `reverse_items` del descriptor del test WAMI debe ser `[3]`, no `[4]`. Auditar v2.0 antes de migrar para verificar si el bug se arrastra.

---

## SECCIÓN 5 — TEXTOS DE INTERPRETACIÓN AL USUARIO (es-CO)

Las traducciones de ítems al es-CO son las de Duarte-Lores et al. (2023) con la nota léxica de §2.3. Los textos siguientes son originales para DescubreMe, redactados en tuteo colombiano cordial, no clínicos, descriptivos y aspiracionales, máx. 80 palabras.

### Dimensión 1 — Significado positivo del trabajo (Positive Meaning)

**Descripción técnica interna (no visible al usuario):** mide en qué grado la persona experimenta que su trabajo tiene significado, propósito y relevancia personal. Es el indicador "insignia" del constructo (Steger et al., 2012: "the 'flagship indicator of the overall construct of meaningful work'").

**BANDA BAJO (≤ percentil 16 aprox.):**
Hoy tu trabajo te aporta poco sentido personal, y eso es información valiosa, no una sentencia. Quizás te encuentras en una etapa en la que las tareas se sienten desconectadas de lo que valoras, o todavía estás explorando qué te mueve. Te invitamos a preguntarte: ¿qué actividad reciente, por pequeña que sea, te hizo sentir que estabas en el lugar correcto?

**BANDA MEDIO (percentil 17–83 aprox.):**
Encuentras sentido en tu trabajo de manera parcial: hay momentos y tareas que te conectan con un propósito, y otros que se sienten más rutinarios. Esto sugiere que valoras lo significativo en lo que haces, aunque convive con zonas grises. Una reflexión útil: ¿qué parte de tu semana laboral te recuerda por qué elegiste este camino?

**BANDA ALTO (≥ percentil 84 aprox.):**
Tu trabajo tiene un lugar claro y significativo en tu vida; lo vives como algo que importa y que vale la pena. Esto sugiere que has logrado, al menos por ahora, una conexión sólida entre lo que haces y lo que consideras importante. Te invitamos a pensar: ¿qué prácticas o decisiones tuyas sostienen esa conexión y cómo podrías cuidarlas?

### Dimensión 2 — El trabajo como fuente de sentido vital (Meaning-Making Through Work)

**Descripción técnica interna:** mide en qué grado la persona percibe que su trabajo le ayuda a construir sentido más amplio para su vida y a entenderse a sí misma. Capta el rol del trabajo como vehículo hacia significado eudaimónico personal.

**BANDA BAJO:**
Por ahora, tu trabajo no funciona como una fuente importante de sentido para tu vida en general. Tal vez el sentido lo encuentras más en tus relaciones, tus aficiones o proyectos personales. Esto no es positivo ni negativo en sí mismo. Pregúntate: ¿qué espacios fuera del trabajo te ayudan hoy a entenderte y a darle forma a tu historia?

**BANDA MEDIO:**
Tu trabajo aporta algo de sentido a tu vida, aunque no es la fuente principal. A veces conecta con tu crecimiento personal o te ayuda a entenderte mejor; otras veces, no tanto. Esto sugiere que estás en un equilibrio observable. Reflexiona: ¿qué tipo de proyecto o aprendizaje laboral reciente te hizo sentir que estabas creciendo?

**BANDA ALTO:**
Tu trabajo es un vehículo importante para darle sentido a tu vida y entenderte mejor. Esto sugiere que ves tu trayectoria laboral como parte de un proceso de desarrollo personal, no solo como una fuente de ingresos. Te invitamos a pensar: ¿qué aprendizaje sobre ti mismo te ha dejado tu rol actual y qué te gustaría seguir explorando?

### Dimensión 3 — Contribución al bien mayor (Greater Good Motivations)

**Descripción técnica interna:** mide la percepción de que el propio trabajo aporta a otros, a la comunidad o a la sociedad. Es la dimensión prosocial del trabajo significativo. Contiene el único ítem inverso del WAMI (ítem 3).

**BANDA BAJO:**
Hoy no percibes que tu trabajo tenga un impacto claro en algo más grande que tú o tu entorno inmediato. Eso puede deberse al rol específico que tienes, al momento del proyecto o a la distancia que sientes con los beneficiarios finales. Pregúntate: ¿quién, fuera del equipo más cercano, podría estar siéndole útil de alguna forma lo que hago?

**BANDA MEDIO:**
Reconoces que tu trabajo aporta a algo más grande, aunque ese impacto no siempre es visible o tangible para ti. Esto sugiere que valoras la idea de contribuir, y que a veces la vives con claridad y otras te queda lejana. Una reflexión: ¿en qué momento reciente sentiste con nitidez que lo que hacías servía a alguien más allá de ti?

**BANDA ALTO:**
Sientes con claridad que tu trabajo aporta a otros, a tu comunidad o a algo más grande. Esto sugiere que la dimensión prosocial es una pieza central de cómo entiendes tu rol laboral. Te invitamos a pensar: ¿cómo podrías hacer aún más visible para ti mismo (y para tu equipo) ese impacto, y qué decisiones lo protegen del desgaste?

---

## SECCIÓN 6 — LICENSE ACQUISITION PLAN

### 6.1 Titular y contacto

- **Titular del copyright:** Michael F. Steger, Ph.D., Professor of Psychology y Founding Director del Center for Meaning and Purpose, Colorado State University. Según michaelfsteger.com (2026), "también ocupa posiciones honorarias en la University of Melbourne, la Stockholm School of Economics y la North-West University en Sudáfrica" (en esta última, con el título específico de "Extraordinary Professor" según su perfil institucional).
- **Coautores (sin derecho exclusivo de licencia, pero por cortesía académica conviene CC en la solicitud):** Bryan J. Dik (Colorado State University) y Ryan D. Duffy (University of Florida).
- **Contacto público listado por el propio autor para consultas:** "michael_f_steger (at) yahoo . com" (formato anti-bot publicado en michaelfsteger.com/?page_id=105). Email institucional alternativo: michael.f.steger@colostate.edu (Colorado State University, Departamento de Psicología).
- **Sitio canónico:** https://michaelfsteger.com — sección "Programs & Tools" donde se aloja la hoja descargable del WAMI y del MLQ.

### 6.2 Práctica histórica de concesión

**Política declarada del autor (verbatim, michaelfsteger.com, 2026):** "The MLQ, WAMI, and 3DM are provided free of charge for educational, therapeutic, and academic research purposes. Commercial use requires prior written permission. Commercial use includes any activity in which revenue is generated directly from the use, distribution, or promotion of these instruments. Coaches, trainers, consultants, and therapists may incorporate these tools into their professional work, provided that clients are not charged specifically for accessing the instruments. The tools may not be sold, redistributed, or marketed as part of a paid product, service, or value-added offering without advance authorization."

**Lectura aplicada a DescubreMe (Opinión profesional):** un modelo freemium B2C donde el WAMI esté detrás de un paywall ("Paid") o sea parte de un paquete de pago (Ikigai Premium, B2B-A) **cae claramente bajo "commercial use" según los términos del propio autor**, y por tanto requiere autorización escrita previa. La oferta gratuita (free tier) de DescubreMe podría argumentarse como "educativa", pero la línea es ambigua y se recomienda solicitar la licencia completa para todos los tiers desde el inicio.

**Práctica histórica (Hecho/Inferencia):** Steger ha concedido licencias comerciales del MLQ y WAMI a plataformas de evaluación, programas de coaching y empresas de wellness; los términos suelen incluir (a) atribución obligatoria al autor en pantalla, (b) reporte anual de uso (número de aplicaciones, países), (c) tarifa única o por volumen. **No publica una tarifa oficial** y maneja cada caso bilateralmente, por lo que el costo real solo se confirma con la solicitud formal.

### 6.3 Pasos para solicitar la licencia

1. **Preparar dossier interno** (máx. 2 páginas): qué es DescubreMe, descripción del flujo del usuario donde se aplicará el WAMI, modelo de monetización (free vs Paid vs B2B), volumen estimado año 1, países de operación (Colombia + LATAM), políticas de privacidad y manejo de datos, plan de adaptación al español (versión Duarte-Lores), plan de baremos colombianos a 12–24 meses.
2. **Enviar email inicial en inglés** a michael.f.steger@colostate.edu con copia al email yahoo del autor (ver §6.4).
3. **Esperar 1–3 semanas** y, si no hay respuesta, reescribir vía formulario de contacto de michaelfsteger.com.
4. **Negociar términos** (atribución, regalías, alcance territorial, alcance temporal, derecho a la versión española de Duarte-Lores como traducción de referencia).
5. **Firmar acuerdo escrito** (puede ser una carta-licencia, no requiere instrumento jurídico complejo si Steger acepta la práctica usual).
6. **Archivar evidencia** en el repositorio legal de DescubreMe + atribución persistente en la UI ("WAMI © 2011 Michael F. Steger, usado con autorización").
7. **Aviso a coautores por cortesía:** correo informativo a Bryan J. Dik y Ryan D. Duffy, sin solicitar autorización separada (no son titulares exclusivos, pero la cortesía académica ayuda).

### 6.4 Borrador de email inicial (copy-paste, inglés)

> **Subject:** WAMI commercial-use license request — DescubreMe (Colombia/LATAM self-knowledge platform)
>
> Dear Dr. Steger,
>
> My name is Germán Vélez and I lead DescubreMe, a freemium web platform for self-knowledge launching in Colombia and Latin America. DescubreMe is educational and orientation-focused — it is explicitly **not** clinical and **not** used for personnel selection. We help adults reflect on meaning, purpose, strengths and values through scientifically grounded, well-attributed instruments.
>
> We are preparing the v1.5 release and would like to formally request **written permission to use the Work and Meaning Inventory (WAMI) in our paid and B2B tiers** (a free tier may also use it for educational previews, contingent on your terms). We will use the standard 10-item WAMI with a Spanish-language adaptation based on Duarte-Lores et al. (2023, *Current Psychology*, https://doi.org/10.1007/s12144-021-02569-8), with light Colombian lexical review verified through a cognitive pilot.
>
> Our commitments:
> 1. Persistent on-screen attribution: "WAMI © 2011 Michael F. Steger. Used with permission."
> 2. Full citation of Steger, Dik, & Duffy (2012) wherever scoring is displayed.
> 3. No resale or redistribution of the instrument outside the DescubreMe product.
> 4. Annual usage reporting (administrations, countries, aggregate descriptives) if requested.
> 5. Non-clinical, non-selection use only, with clear disclaimers to users.
> 6. We are happy to share, upon request, anonymized aggregate Colombian data to contribute to your normative research program.
>
> Volume estimate for year 1: 5,000–20,000 administrations across Colombia and LATAM.
>
> Could you please share your preferred licensing terms and any applicable fee structure? I am attaching a 2-page brief about DescubreMe and would be glad to schedule a brief call at your convenience.
>
> Thank you for your time and for making the WAMI available to the field.
>
> Sincerely,
> Germán Vélez
> Founder, DescubreMe
> [email] · [phone] · [website]

### 6.5 Costo esperado y rangos

**Hecho:** Steger no publica tarifas. **Inferencia (basada en práctica observada en el mercado de instrumentos psicométricos cortos en autor-titular individual, sin distribuidor):**

- **Rango típico para licencia comercial freemium de un instrumento de 10 ítems sin scoring app propietaria del autor:** USD 0–500 anuales por una licencia simple con atribución, o USD 1.000–3.000 anuales por un acuerdo de uso ilimitado con reporte. En algunos casos, autores académicos otorgan permiso comercial sin tarifa a cambio de atribución + reporte anual + acceso a datos agregados. **Estos rangos son orientativos, no oficiales** [sin fuente verificada].
- **Variables que suben el costo:** volumen alto, uso en selección (no aplica acá), modificaciones al instrumento, exclusividad regional.
- **Variables que bajan el costo:** atribución visible, ausencia de modificaciones, compromiso de compartir datos agregados, fines educativos demostrables.

**Recomendación operativa:** presupuestar USD 1.500 anuales como reserva para v1.5; tratar cualquier monto inferior como ganancia.

### 6.6 Plan B

Si Steger no responde o pide una tarifa fuera de presupuesto:
1. **Plan B-1 (preferido):** sustituir WAMI por el Comprehensive Meaningful Work Scale (CMWS) de Lips-Wiersma & Wright (2012, *Group & Organization Management*, 37(5), 655–685, DOI 10.1177/1059601112461578). El CMWS tiene exactamente dos autores titulares (Marjolein Lips-Wiersma y Sarah Wright, ambas vinculadas a University of Canterbury, Nueva Zelanda) y está alojado/gestionado a través de themapofmeaning.org. Lani Morris coescribió el libro asociado *The Map of Meaning* (2011, Greenleaf), pero no es coautora del CMWS ni titular de licencias. No tiene adaptación arbitrada al español a mayo de 2026.
2. **Plan B-2:** dejar el WAMI únicamente en la versión free + educativa (no monetizada) y rescatar el módulo de "trabajo significativo" en Paid e Ikigai Premium con un instrumento alternativo no licenciado bajo paywall (por ejemplo, ítems propios derivados del Job Crafting Scale o de la Meaningful Work subscale del Engagement at Work, según licencias).
3. **Plan B-3 (no recomendado):** restringir el WAMI a uso "informacional dentro de un servicio gratuito" y verificar si encaja en la categoría "educational" de Steger; alto riesgo de incumplimiento si DescubreMe genera revenue por suscripción que incluya ese contenido.

---

## SECCIÓN 7 — DISCLAIMERS Y MITIGACIONES

### 7.1 Disclaimer pre-test (texto literal, es-CO, máx. 100 palabras)

> "Estás por completar un cuestionario corto sobre cómo experimentas tu trabajo. No es una prueba clínica, no diagnostica trastornos y no se usa para seleccionar personal. Es una herramienta educativa para ayudarte a reflexionar. Tus respuestas son confidenciales y se guardan de forma anónima en nuestra base agregada. Tómate 3 a 4 minutos y responde con sinceridad pensando en tu trabajo actual. Si estás pasando por un momento emocional difícil, te recomendamos hacer esta reflexión más adelante o acompañado por un profesional de confianza."

### 7.2 Ítems sensibles que activan NFR-28

**Inferencia:** ninguno de los 10 ítems del WAMI es clínicamente sensible (no pregunta por ideación suicida, autolesión, consumo de sustancias, violencia, etc.). Sin embargo, dos contextos pueden activar el protocolo de contención NFR-28:

1. **Patrón de respuesta consistentemente bajo** en todas las subescalas (total ≤ 20 de 50, es decir < percentil 5 aproximado teórico) puede indicar burnout, alienación laboral severa o un momento vital difícil. El paper original lo señala: "Low scores on any of these scales reflect an absence of work meaning, and may be predictive of poor work engagement, low commitment... People who score low on these scales are also more likely... to experience both low levels of well-being and higher levels of psychological distress" (Steger et al., 2012, citado de la hoja oficial).
2. **Respuestas extremas inconsistentes** (todo 1 o todo 5) que sugieran patrón de respuesta automática o estado emocional agudo.

> [Aporte Gemini — refuerzo para NFR-28] Gemini sintetiza evidencia adicional citando a Maslach (2001) y el corpus de burnout: "la energía inicial se pudre convirtiéndose en agotamiento crónico, la implicación altruista muta en cinismo corrosivo, y la eficacia originaria decae hacia la impotencia absoluta". Implicación para el trigger: contemplar un caso adicional de NFR-28 cuando un usuario obtenga puntaje BAJO en la dimensión Greater Good pero ALTO en intensidad declarada de "vocación" o "calling" en algún test previo del flujo (señal clásica de disonancia vocacional que precede al burnout). Reservar para v1.6+ cuando el motor permita correlaciones cruzadas entre tests.

**Trigger técnico recomendado:** si `total_WAMI ≤ 20` O `varianza_intra_respuesta < 0.1`, mostrar el mensaje de contención (§7.3) en lugar del resultado normal, manteniendo el resultado disponible en "ver de todos modos".

### 7.3 Mensaje de contención (texto literal, es-CO, máx. 120 palabras)

> "Tus respuestas sugieren que hoy tu trabajo te aporta poco sentido y eso puede pesar. No queremos darte una etiqueta a partir de un cuestionario corto; queremos invitarte a una pausa. Si estás pasando por agotamiento, desánimo persistente o sientes que no encuentras salida, hablar con alguien ayuda. En Colombia tienes acceso gratuito a la **Línea 106** de la Secretaría Distrital de Salud de Bogotá (marca 106 desde cualquier celular o fijo, 24/7) y a la **Línea Nacional 192 opción 4** del Ministerio de Salud (atención psicosocial nacional, 24/7). Si lo deseas, podemos mostrarte tu resultado de todas formas; tú decides el ritmo."

### 7.4 Líneas de ayuda Colombia relevantes

| Línea | Cobertura | Horario | Operador |
|---|---|---|---|
| Línea 106 "El poder de ser escuchado" | Bogotá D.C.; WhatsApp 300 754 8933; correo linea106@saludcapital.gov.co | 24 horas, 365 días | Secretaría Distrital de Salud de Bogotá |
| Línea 192 opción 4 | Nacional Colombia (excepto territorios con Línea 106 local) | 24/7 | Ministerio de Salud y Protección Social |
| Línea 123 | Bogotá, urgencias y emergencias en salud (incluida salud mental) | 24/7 | Secretaría Distrital de Salud |
| Línea Calma 01 8000 423 614 | Hombres mayores de 18 años, Bogotá | Lun–Vie 8:30–22:30; Sáb–Dom 14:00–22:30 | Secretaría Distrital de la Mujer + Salud |
| Línea Púrpura 01 8000 112 137 / WhatsApp 300 755 1846 | Mujeres víctimas de violencia, Bogotá | 24/7 | Secretaría Distrital de la Mujer |
| Línea Amiga Saludable (604) 444 4448 / WhatsApp 300 723 1123 | Medellín y Antioquia | n/d | Secretaría de Salud de Medellín |
| Línea de la Vida (605) 339 9999 | Barranquilla / Atlántico | 24/7 | Distrito de Barranquilla |

Mostrar al menos Línea 106 (Bogotá) + Línea 192 opción 4 (nacional) en el mensaje de contención. Para usuarios fuera de Bogotá, priorizar la 192.

### 7.5 Disclaimer post-test (texto literal, es-CO, máx. 80 palabras)

> "Este resultado es una foto de hoy, no una etiqueta de quién eres. El sentido en el trabajo cambia con las etapas, los proyectos y los momentos de vida. Tómalo como un punto de partida para conversar contigo mismo o con tu coach, no como un diagnóstico. Si quieres profundizar, en la sección Recursos encontrarás lecturas y ejercicios para reflexionar más sobre tu propósito laboral. Tus respuestas se guardan de forma anónima en nuestra base agregada."

---

## SECCIÓN 8 — SUGERENCIAS DE PILOTO COGNITIVO COLOMBIA

### 8.1 Tamaño y características de muestra

- **N recomendado:** 12–20 participantes adultos colombianos. La referencia clásica para entrevistas cognitivas es Willis, G. B. (2005), *Cognitive Interviewing: A Tool for Improving Questionnaire Design* (Sage), donde se indica que "muestras de 5 a 15 por ronda de prueba son comunes" (p. 7); 12–20 ofrece margen para subgrupos sociodemográficos relevantes.
- **Estratificación obligatoria:**
  - Edad: 4–5 por rango — 18–25, 26–35, 36–50, 51+.
  - Educación: al menos 3 con bachillerato completo sin universidad, 3 con técnico/tecnólogo, resto universitarios/posgrado.
  - Región: ≥ 3 fuera de Bogotá (Medellín, Cali, Barranquilla o región caribe/pacífico).
  - Sector: mezcla entre empleado dependiente, independiente/freelance, emprendedor, sector público, sector salud y sector educativo.
- **Exclusión:** menores de 18, personas en crisis de salud mental activa, personas con relación laboral o de propiedad con DescubreMe.

### 8.2 Protocolo think-aloud

1. **Briefing (5 min):** explicar que el objetivo es probar el cuestionario, no a la persona; pedir consentimiento informado para grabación de audio.
2. **Aplicación con verbalización (15–20 min):** el participante lee cada ítem en voz alta, dice qué entiende ("con tus palabras, ¿qué te está preguntando este ítem?"), elige una respuesta y verbaliza por qué la eligió.
3. **Sondas estructuradas tras cada ítem:**
   - "¿Qué palabra o frase te resultó menos clara?"
   - "¿Esta pregunta se siente escrita para una persona colombiana o suena extranjera?"
   - "¿Pensaste en tu trabajo actual, en tu carrera completa, o en otra cosa?"
   - Ítem 3 específicamente: "Este ítem está en negativo. ¿Te confundió al responder?"
   - [Aporte Gemini] Ítem 9 específicamente: "Cuando lees 'mi trabajo me ayuda a dar sentido al mundo que me rodea', ¿estás pensando en cómo entiendes el mundo (proceso interno) o en cómo cambias el mundo (acto hacia otros)?" — esta sonda permite testear si el patrón antropológico observado por Carrasco et al. (2026) en España se repite en Colombia.
4. **Debrief final (10 min):** preguntas sobre los textos de interpretación (Sección 5): "¿Este texto te parece útil? ¿Hay alguna frase que te suene a regaño, etiqueta o diagnóstico?".
5. **Total por sesión:** 30–45 min; remuneración simbólica (bono digital).

### 8.3 Criterios para aceptar / re-adaptar ítem

Un ítem se considera **ACEPTADO** si:
- ≥ 80% de los participantes verbaliza el constructo correcto (PM, MM o GG según corresponda) sin necesidad de aclaración.
- Ningún participante reporta una palabra o construcción como "extraña" o "no colombiana" de forma espontánea.
- El ítem 3 inverso, específicamente, no provoca confusión de polaridad (la persona entiende que "no produce ningún cambio" es la opción que indica BAJO sentido).

Un ítem **REQUIERE RE-ADAPTACIÓN** si:
- ≥ 30% de los participantes reporta palabras como "carrera" mal interpretadas (p. ej., como "pregrado universitario" en vez de "trayectoria"), o
- ≥ 30% pide releer el ítem dos veces, o
- En el ítem 3, ≥ 20% se equivoca en la dirección de la respuesta.

Si un ítem requiere re-adaptación, se reformula respetando la equivalencia semántica con el original en inglés (validación posterior con back-translation independiente) y se vuelve a probar con N adicional de 5.

### 8.4 Output esperado del piloto

1. Documento `WAMI-CO-v1.0-pilot-report.pdf` con:
   - Versión final es-CO de los 10 ítems con anclajes Likert.
   - Tabla de hallazgos por ítem (comprensión, polaridad, lexicón problemático).
   - Recomendaciones de reformulación con back-translation.
   - Evidencia de aceptación del texto de interpretación por banda.
2. Versión congelada `WAMI_es-CO_v1.0.json` lista para el plugin del motor de tests.
3. Auditoría del item 3: verificar puntaje invertido correctamente en el motor.

---

## SECCIÓN 9 — GAPS Y PREGUNTAS ABIERTAS

1. **¿Existen baremos percentilares publicados del WAMI para LATAM o cualquier muestra hispanohablante?** Plan: revisar tesis doctorales en Dialnet, BDIGITAL Uniandes, Repositorio Javeriana, y escribir directamente a Cristina Chinea-Montesdeoca (Universidad de La Laguna) y a Olatz Letona-Ibañez (Universidad de Deusto) preguntando si dispusieron de cortes percentilares no publicados.
2. **¿Steger acepta la versión española de Duarte-Lores como traducción oficial reconocida o exige una nueva back-translation auditada para uso comercial?** Plan: incluir esta pregunta explícita en el email inicial (Sección 6.4) y registrar la respuesta como anexo legal.
3. **¿La estructura factorial del WAMI en Colombia se parecerá más a la versión tres-factores de Duarte-Lores (España, N=350), a la bifactor 2D de Carrasco et al. (España, N=806), o a la unifactorial gestáltica de Brasil (N=2.111)?** Plan: tras acumular N≥500 en DescubreMe, replicar los tres CFA (3 factores Steger, bifactor 2D Carrasco, unifactor Brasil) y reportar al equipo. Es relevante para decidir si reportar los tres subscores al usuario, dos, o solo el puntaje total. [Aporte Gemini consolidado] La hipótesis de matriz cultural latinoamericana (Brasil-like) merece prueba explícita por proximidad cultural.
4. **¿El ítem 3 inverso debe mantenerse o eliminarse?** El paper original lo mantiene; Duarte-Lores et al. (2023) muestran que removerlo sube el α de GG de .65 a .81 pero empeora otros índices; Zanotelli et al. (2022, Brasil N=2.111) reportan carga .42 y comunalidad .18 (las más bajas del instrumento). **Hecho:** la decisión por integridad de comparación con literatura es mantenerlo. **Plan:** monitorear su comportamiento en datos colombianos y considerar reportarlo como dato de validez interna en la futura publicación adaptación-Colombia.
5. **¿La doble negación del ítem 3 en español ("no produce ningún cambio") induce errores adicionales respecto al inglés ("makes no difference")?** Plan: el piloto cognitivo (§8) debe medir explícitamente esto y comparar tasas de error con datos publicados de Carrasco et al. (2026) e Italia (Paola et al., 2022).
6. **[Aporte Gemini] ¿El ítem 9 ("Mi trabajo me ayuda a dar sentido al mundo que me rodea") será procesado por colombianos como acto introspectivo (MM) o como acto prosocial (GG)?** Plan: incluir sonda específica en el piloto cognitivo §8.2.3 y, según resultado, decidir si reasignar el ítem 9 al factor general o mantenerlo en MM tal como propone el modelo original Steger.

---

## SECCIÓN 10 — REFERENCIAS (APA 7)

Akın, A., Hamedoglu, M. A., Kaya, Ç., & Sarıçam, H. (2013). Turkish version of the Work and Meaning Inventory (WAMI): Validity and reliability study. *Journal of European Education, 3*(2), 11–16. https://doi.org/10.18656/jee.91401

Allan, B. A., Batz-Barbarich, C., Sterling, H. M., & Tay, L. (2019). Outcomes of meaningful work: A meta-analysis. *Journal of Management Studies, 56*(3), 500–528. https://doi.org/10.1111/joms.12406

Arnoux-Nicolas, C., Sovet, L., Lhotellier, L., Di Fabio, A., & Bernaud, J.-L. (2017). Perceived work conditions and turnover intentions: The mediating role of meaning of work. *Frontiers in Psychology, 8*, 704. https://doi.org/10.3389/fpsyg.2017.00704 [Aporte Gemini — referencia adicional; verificar DOI antes de uso]

Both-Nwabuwe, J. M. C., Dijkstra, M. T. M., & Beersma, B. (2017). Sweeping the floor or putting a man on the moon: How to define and measure meaningful work. *Frontiers in Psychology, 8*, 1658. https://doi.org/10.3389/fpsyg.2017.01658

Carrasco, M., Letona-Ibañez, O., Martinez-Rodriguez, S., & Amillano, A. (2026). Spanish adaptation and analysis of psychometric properties of the Work and Meaning Inventory. *Discover Psychology, 6*, Artículo 58. https://doi.org/10.1007/s44202-026-00586-x

Csordás, G., Matuszka, B., Sallay, V., & Martos, T. (2022). Assessing meaningful work among Hungarian employees: Testing psychometric properties of Work and Meaning Inventory in employee subgroups. *BMC Psychology, 10*, Artículo 56. https://doi.org/10.1186/s40359-022-00749-0

Di Fabio, A. (2018). Italian version of the Work and Meaning Inventory. [Aporte Gemini — referencia no localizada con DOI específico por Gemini; verificar antes de uso]

Duarte-Lores, I., Rolo-González, G., Suárez, E., & Chinea-Montesdeoca, C. (2023). Meaningful work, work and life satisfaction: Spanish adaptation of Work and Meaning Inventory Scale. *Current Psychology, 42*(14), 12151–12163. https://doi.org/10.1007/s12144-021-02569-8

Finch, J. (2014). [Aporte Gemini — citado por Gemini como estudio sudafricano con estructura trunca de 2 factores; verificar antes de uso, sin DOI aportado]

Leonardo, M. da G. L., Pereira, M. M., Valentini, F., Freitas, C. P. P. de, & Damásio, B. F. (2019). Adaptação do Inventário de Sentido do Trabalho (WAMI) para o contexto brasileiro. *Revista Brasileira de Orientação Profissional, 20*(1), 79–89. https://doi.org/10.26707/1984-7270/2019v20n1p79

Letona-Ibañez, O., Carrasco, M., Martinez-Rodriguez, S., Amillano, A., & Ortiz-Marqués, N. (2021). Cognitive, task and relational job crafting as a mediator between social support and work engagement. *PLOS ONE, 16*(5), e0252143. https://doi.org/10.1371/journal.pone.0252143 [Aporte Gemini — para el job crafting referenciado en marco teórico]

Lips-Wiersma, M., & Wright, S. (2012). Measuring the meaning of meaningful work: Development and validation of the Comprehensive Meaningful Work Scale (CMWS). *Group & Organization Management, 37*(5), 655–685. https://doi.org/10.1177/1059601112461578

Maslach, C., Schaufeli, W. B., & Leiter, M. P. (2001). Job burnout. *Annual Review of Psychology, 52*, 397–422. https://doi.org/10.1146/annurev.psych.52.1.397 [Aporte Gemini — refuerzo conceptual para §7.2 NFR-28]

Muñiz, J., Elosua, P., & Hambleton, R. K. (2013). Directrices para la traducción y adaptación de los tests: Segunda edición. *Psicothema, 25*(2), 151–157. https://doi.org/10.7334/psicothema2013.24

Paola, M., Rita, Z., & Giuseppe, S. (2022). Evaluating meaningful work: Psychometric properties of the Work and Meaning Inventory (WAMI) in Italian context. *Current Psychology*. Publicación anticipada en línea. https://doi.org/10.1007/s12144-021-02503-y

Puchalska-Kamińska, M., Czerw, A., & Roczniewska, M. (2019). Work meaning in self and world perspective: A new outlook on the WAMI scale. *Social Psychological Bulletin, 14*(1), Artículo e30207. https://doi.org/10.32872/spb.v14i1.30207

Steger, M. F. (s.f.). *Work and Meaning Inventory (WAMI) — Scoring instructions* [PDF]. Recuperado el 15 de mayo de 2026, de http://www.michaelfsteger.com/wp-content/uploads/2012/08/WAMI.pdf

Steger, M. F., Dik, B. J., & Duffy, R. D. (2012). Measuring meaningful work: The Work and Meaning Inventory (WAMI). *Journal of Career Assessment, 20*(3), 322–337. https://doi.org/10.1177/1069072711436160

Willis, G. B. (2005). *Cognitive interviewing: A tool for improving questionnaire design*. Sage Publications.

Zanotelli, L. G., De Andrade, A. L., & Peixoto, J. M. (2022). Work as Meaning Inventory: Psychometric properties and additional evidence of the Brazilian version. *Paidéia (Ribeirão Preto), 32*, Artículo e3225. https://doi.org/10.1590/1982-4327e3225

---

## Apéndice A — Mapa de aportes consolidados desde Gemini

| # | Sección consolidada | Aporte de Gemini integrado | Valor agregado | Nivel de verificación |
|---|---|---|---|---|
| A1 | §0 metadatos | Nota sobre escala 7 puntos como alternativa contemporánea | Justifica explícitamente la decisión NFR-35 de mantener 5 puntos frente a la práctica de algunas adaptaciones (incluida la propia Duarte-Lores que usó 7) | Verificado contra Duarte-Lores 2023 |
| A2 | §0 metadatos | Distinción "significado del trabajo" vs "trabajo significativo" | Útil para copy de onboarding y marketing; previene ambigüedad conceptual | Verificado contra Both-Nwabuwe 2017 y Steger 2012 |
| A3 | §1.2 banco | Replicaciones adicionales: Italia (Di Fabio 2018), Francia (Arnoux-Nicolas 2017), Sudáfrica (Finch 2014) | Robustece el dossier ante Steger mostrando amplitud transcultural del WAMI | PARCIAL — Finch sin DOI; marcado [verificar antes de uso] |
| A4 | §2.1 tabla adaptaciones | Letona-Ibañez (2020, tesis Deusto N=814) | Contextualiza el origen de la adaptación española alternativa que sustenta Carrasco 2026 | PARCIAL — tesis sin URL repositorio verificable |
| A5 | §2.1 tabla adaptaciones | Zanotelli 2022 con N=2.111 y cargas factoriales detalladas (.79–.89; ítem 3 = .42) | Aumenta peso empírico de la evidencia brasileña; útil para §3 y §9 | Verificado en abstract SciELO (Paidéia) |
| A6 | §2.3 léxico | Hallazgo de Carrasco 2026 sobre el ítem 9 cargando en factor general vs comunión | Refina la sonda de piloto cognitivo para el ítem 9; señala riesgo de mal asignación factorial | Verificado contra Carrasco 2026 |
| A7 | §3.1 baremos | α por subescala del paper original (PM .89 / MM .82 / GG .83) | Granularidad útil para QA del motor de scoring; permite comparar α empírico CO contra benchmark original | Verificado en Steger 2012 |
| A8 | §3.1 baremos | Correlación WAMI–SWLS r=.899 (Carrasco 2026) | Sustenta validez convergente; útil para argumentar al usuario el vínculo trabajo significativo–satisfacción vital | Verificado |
| A9 | §3.1 / §3.3 | Hipótesis de "matriz cultural gestáltica" latinoamericana basada en hallazgo unifactorial brasileño | Refuerza la decisión de probar el modelo unifactorial brasileño en el roadmap colombiano | Interpretativa — marcada como hipótesis, no consenso |
| A10 | §4 ítems inversos | Carga del ítem 3 en Brasil (.42) y comunalidad (.18) | Confirma que el problema del ítem 3 es transcultural, no exclusivo del español | Verificado |
| A11 | §7.2 NFR-28 | Refuerzo Maslach 2001 sobre burnout vocacional y caso de disonancia vocacional | Sugiere trigger adicional para v1.6+ basado en cruce de tests | Verificado |
| A12 | §8.2 piloto | Sonda específica para el ítem 9 (introspectivo vs prosocial) | Operacionaliza el hallazgo A6 en protocolo de piloto | Derivado lógico de A6 |
| A13 | §9 gaps | Nuevo gap #6 sobre la asignación factorial del ítem 9 en Colombia | Cierra el loop entre A6, A9, A12 y la decisión de scoring para el motor | Derivado |
| A14 | §10 referencias | Arnoux-Nicolas 2017, Di Fabio 2018, Finch 2014, Letona-Ibañez 2021, Maslach 2001 | Amplía bibliografía a 20 referencias APA 7 (sube de 15 originales de Claude) | PARCIAL — algunas sin DOI verificado |

**Aportes de Gemini NO integrados (filtrados):**
- Ensayos sobre Teoría de la Autodeterminación, Hackman & Oldham, Jahoda, MOW: relevantes para una página académica del producto pero no operativos para implementación.
- Discusiones sobre "instrumentalización performativa" del significado y crítica neoliberal: enriquecimiento ético filosófico fuera del scope de un IAR.
- Tabla comparativa de "Topografía Estructural" en 10 países: redundante con §2.1 y §3.1 ya consolidadas.
- Coeficientes β estructurales sobre engagement → turnover (β=0.820, r=-0.500): pertinentes para un módulo B2B futuro pero fuera del IAR de implementación inicial.

---

## Apéndice B — Notas de consolidación (metodología)

1. **Cumplimiento del prompt v1.0:**
   - Claude entregó las 10 secciones del prompt v1.0 con tablas operativas, ítems literales con clave, baremos publicados, textos al usuario, plan de licencia con email copy-paste, disclaimers con líneas Colombia, piloto cognitivo y referencias APA 7. Cumplimiento = OK.
   - Gemini entregó un ensayo académico narrativo extenso (≈ 18.000 palabras estimadas) centrado en marco teórico, comparación transcultural de estructura factorial y red nomológica del constructo. NO entregó §5 (textos al usuario), §6 (plan de licencia), §7 (disclaimers), §8 (piloto), §9 (gaps con plan). Cumplimiento = NO.

2. **Método aplicado:** "Claude base + Gemini suple", consistente con el patrón observado en los 20 packs anteriores consolidados.

3. **Filtros de integración aplicados a Gemini:**
   - (a) ¿Aporta información nueva no presente en Claude? Sí.
   - (b) ¿Es verificable? La mayoría sí; los aportes parcialmente verificables se marcaron con `[verificar antes de uso]`.
   - (c) ¿Tiene valor de producto (no solo académico)? Se aceptaron los que se conectan con scoring, piloto, gaps o decisiones de UI.

4. **Hallazgo psicométrico relevante derivado de la consolidación:** la combinación del modelo bifactor 2D español (Carrasco 2026) + modelo unifactorial brasileño (Zanotelli 2022, N=2.111) + el comportamiento problemático del ítem 9 y el ítem 3 abre la puerta a que la futura adaptación colombiana del WAMI sea más cercana al modelo brasileño que al español. Esto debe testearse explícitamente en el roadmap §3.3 antes de fijar la UI de subscores.

5. **Discrepancia documental crítica vs briefing del usuario:** el briefing original señalaba el ítem 4 como inverso; ambos modelos (Claude y Gemini) coinciden en que el único ítem inverso es el #3. Se mantiene la corrección documental que ya hacía Claude en §4.

6. **Cobertura final del consolidado:** 10/10 secciones del prompt v1.0 cumplidas, con enriquecimiento parcial en §0, §1, §2, §3, §4, §7, §8, §9 y §10 a partir del pack Gemini.

— Fin del Pack Consolidado —
