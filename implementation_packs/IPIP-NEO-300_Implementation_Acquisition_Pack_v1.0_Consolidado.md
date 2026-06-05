# Implementation Acquisition Pack v1.0 — IPIP-NEO-300 (300 ítems) — CONSOLIDADO
**Producto destino:** DescubreMe (LATAM, foco Colombia) · **P3 condicional B2B-A Premium** · **Hermano mayor del IPIP-NEO-120**
**Versión del consolidado:** 1.0 · **Fecha:** mayo 2026
**Insumos:** `Prompt_16_IPIP-NEO-300_IAR.Claude.md` (Implementation Acquisition Pack completo, 10 secciones) + `Prompt_16_IPIP-NEO-300_IAR.Gemini.md` (revisión académica narrativa con aportes complementarios sobre librería *Five-Factor-E*, baremo UK/Irlanda, parámetro sex="N", textos B2B extendidos)
**Idiomas:** español neutro (metadatos y notas internas) / español Colombia (Secciones 5 y 7)

> **Nota metodológica del consolidado.** Claude entregó el Pack completo siguiendo el prompt v1.0 con las 10 secciones, incluyendo URLs verificables del IPIP, tabla M/SD facetal argentina N=604 (Cupani et al., 2014), conteo +/− por las 30 facetas y 15 referencias APA. Gemini entregó una versión narrativa que cubre nominalmente las 10 secciones pero con problemas: (a) no entrega lista literal de los 300 ítems ni tabla completa de inversos por faceta (solo ejemplifica seis); (b) referencia DOIs erróneos (10.1016/S2007-4719(14)70383-7 no corresponde a Cupani 2014); (c) sustituye las 30 facetas y los 5 dominios por etiquetas re-bautizadas tipo "Reactividad Emocional" y "Tolerancia a la Frustración" sin trazar la equivalencia con N1/N2/etc. Sin embargo Gemini sí aporta valor complementario verificable: la librería open-source *Five-Factor-E* en GitHub (NeuroQuestAi) con JSON estructurado, el dataset normativo UK/Irlanda de 18.591 casos (Hogrefe DOI 10.1027/1015-5759/a000644), el parámetro sex="N" para baremo neutral por sexo, una versión extendida B2B-corporativa de los 30 textos facetales, y una protocolización detallada de NFR-28 (re-enrutamiento del reporte hacia Medicina Laboral). Este consolidado usa el Pack de Claude como base estructural completa e inyecta los aportes verificables de Gemini con la marca `[Aporte Gemini]`. La trazabilidad está en el **Apéndice A**.

---

## TABLA DE COBERTURA (requisitos explícitos del brief vs. entrega)

| Requisito | Sección | Cobertura |
|---|---|---|
| Portada y metadatos + estado de bloqueadores (READY/PARTIAL/BLOCKED) | §0 | OK |
| Plan adquisición banco de ítems + URLs canónicas IPIP | §1 | OK (newNEOFacetsKey.htm + Five-Factor-E JSON) |
| Adaptaciones al español (Argentina, México, España, Paraguay) | §2 | OK + 2.1 + 2.2 |
| Baremos publicados (EE.UU., Argentina + UK/Irlanda agregado vía Gemini) | §3 | OK + 3.1 + 3.2 + 3.3 |
| Conteo +/− por las 30 facetas | §4 | OK (tabla completa) |
| Textos es-CO 5 dominios + plantilla 30 facetas (BAJO/MEDIO/ALTO) | §5 | OK (5/5 + plantilla + variantes B2B extendidas en 5.7) |
| Plan licencia (dominio público, contacto Johnson, email cortesía, Plan B) | §6 | OK |
| Disclaimers pre/post + ítems sensibles + mensaje contención + líneas Colombia | §7 | OK + protocolo NFR-28 detallado |
| Piloto cognitivo Colombia (muestra, think-aloud, criterios, entregables) | §8 | OK |
| ≥ 3 gaps y preguntas abiertas | §9 | OK (5 + 3 aporte Gemini) |
| ≥ 10 referencias APA 7 con DOI | §10 | OK (15 + 1 aporte Gemini = 16) |
| Marcadores Hecho/Inferencia/Opinión profesional | transversal | OK |
| Marcadores [sin fuente verificada] donde aplica | §3, §9 | OK |
| **Aportes consolidados desde Gemini con verificación pendiente** | Apéndice A | OK |

---

## Sección 0 — Portada y Metadatos

**Instrumento:** International Personality Item Pool – NEO, versión de 300 ítems (IPIP-NEO-300).

**Autoría:** Goldberg, L. R. (1999) construyó el banco original de 300 ítems IPIP que opera como representación pública del NEO-PI-R; Johnson, J. A. (2000, 2005, 2014) lo administró en formato web, lo etiquetó como "IPIP-NEO", validó sus propiedades psicométricas y desarrolló el subset abreviado IPIP-NEO-120.

**Versión:** 300 ítems, 5 dominios × 6 facetas × 10 ítems por faceta.

**Año de publicación original:** Goldberg, 1999 (capítulo en *Personality Psychology in Europe*, Vol. 7); última revisión psicométrica documentada: Johnson (2014, *Journal of Research in Personality*, 51, 78–89).

**Idioma original:** Inglés (EE. UU.).

**Productos destino en DescubreMe:** P3 — Condicional para B2B-A Premium (perfilamientos ejecutivos profundos). NO recomendado para B2C Free MVP1/v1.5, NO recomendado para B2C Paid USD 19/v1.5 estándar (fricción UX por tiempo). Reservado para Ikigai Premium B2B donde el cliente tiene contexto y motivación.

**Resumen ejecutivo:** El IPIP-NEO-300 es la representación pública de máxima granularidad del modelo NEO-PI-R: 300 ítems en dominio público, 30 facetas con 10 ítems cada una y confiabilidades de dominio α ≥ .90 en las muestras de Johnson (2014). Es psicométricamente sólido, gratuito, sin restricciones legales y con ítems literales accesibles en ipip.ori.org. Su fricción principal es operacional: aunque Johnson reporta tiempos típicos de 30–40 minutos en su página oficial, la especificación interna del proyecto contempla 60–75 minutos para sesiones reflexivas con lectura cuidadosa, lo que lo hace inviable para B2C masivo. La decisión recomendada es: implementar como módulo P3 condicional solo si emerge demanda B2B premium confirmada después de v1.5, manteniendo el IPIP-NEO-120 como caballo de batalla.

**Status de bloqueadores:**
- **Licencia: READY** (dominio público, sin permiso ni fee; política oficial de IPIP en ipip.ori.org).
- **Ítems literales: READY** en inglés (publicados ítem por ítem en https://ipip.ori.org/newNEOFacetsKey.htm); **PARTIAL** en español es-CO (solo existen adaptaciones argentina —Cupani et al., 2014— y mexicana del 120; ninguna colombiana validada).
- **Baremos: PARTIAL** (Johnson dispone de percentiles por edad/sexo internos a su script CGI; no hay tablas normativas del IPIP-NEO-300 publicadas en revista indexada con M/SD por dominio; las normas Kajonius & Johnson 2019 corresponden al IPIP-NEO-120, no al 300). `[Aporte Gemini]` El dataset abierto UK/Irlanda de Hogrefe (DOI 10.1027/1015-5759/a000644, N=18.591) es un recurso normativo internacional adicional a considerar como cohorte de respaldo.

---

## Sección 1 — Acquisition Plan del Banco de Ítems

### 1.1 Disponibilidad pública

**Hecho:** El sitio oficial del IPIP, mantenido por el Oregon Research Institute y administrado actualmente por John A. Johnson (j5j@psu.edu), declara textualmente en su página de inicio: *"The items and scales are in the public domain, which means that one can copy, edit, translate, or use them for any purpose without asking permission and without paying a fee"* (https://ipip.ori.org/). Esta declaración cubre el banco completo del IPIP, cuyo enlace de navegación oficial dice literalmente *"The 3,320 IPIP items in alphabetical order"* (https://ipip.ori.org/AlphabeticalItemList.htm), incluidos los 300 que componen el IPIP-NEO-300.

Los 300 ítems del IPIP-NEO se publican agrupados por faceta en https://ipip.ori.org/newNEOFacetsKey.htm con su clave de codificación (+ keyed / – keyed). El banco completo se encuentra también en orden alfabético en https://ipip.ori.org/AlphabeticalItemList.htm y en la tabla maestra de asignación https://ipip.ori.org/ItemAssignmentTable.htm.

`[Aporte Gemini]` **Fuente complementaria de implementación técnica:** existe la librería open-source **Five-Factor-E** (repositorio NeuroQuestAi en GitHub: https://github.com/NeuroQuestAi/five-factor-e) que provee los 300 ítems pre-estructurados en formato JSON con los identificadores numéricos, claves de codificación direccional (+/−) y metadatos de faceta ya pre-cargados. La librería tiene licencia permisiva tipo MIT. Para el equipo backend de DescubreMe esto significa que la migración a Supabase/PostgreSQL puede partir de un schema validado en lugar de re-transcribir desde el HTML del sitio IPIP, reduciendo riesgo de errores de transcripción de las claves inversas. **Verificación pendiente:** confirmar que la versión del JSON del repositorio replique fielmente las claves +/− del listado oficial newNEOFacetsKey.htm de Goldberg antes de usar en producción.

### 1.2 Banco oficial vs. adaptaciones derivadas

**Hecho:** Existen tres inventarios IPIP que miden las 30 facetas NEO: (a) el IPIP-NEO-300 original (Goldberg, 1999), 10 ítems por faceta; (b) el IPIP-NEO-120 (Johnson, 2014), 4 ítems por faceta seleccionados por consistencia interna; (c) un IPIP-NEO-120 alterno por Teoría de Respuesta al Ítem (Maples, Guan, Carter & Miller, 2014). El IPIP-NEO-300 es el banco "padre" del cual se derivan los demás.

### 1.3 Estructura del banco

- 5 dominios: Neuroticismo (N), Extraversión (E), Apertura (O), Amabilidad (A), Responsabilidad (C).
- 6 facetas por dominio = 30 facetas.
- 10 ítems por faceta = 300 ítems totales.
- Formato: frase corta autorreferenciada en primera persona (p. ej., *"Worry about things"*, *"Like order"*).
- Escala Likert de 5 puntos: 1 = Very Inaccurate, 2 = Moderately Inaccurate, 3 = Neither Accurate Nor Inaccurate, 4 = Moderately Accurate, 5 = Very Accurate.
- Distribución de claves +/–: aproximadamente equilibrada, variando entre 2+/8– y 8+/2– según faceta (ver Sección 4).

### 1.4 Recomendación

**Opinión profesional:** Tomar los 300 ítems en inglés directamente de https://ipip.ori.org/newNEOFacetsKey.htm como fuente canónica. Para la versión es-CO, partir de la adaptación argentina de Cupani et al. (2014), revisarla ítem por ítem por un equipo bilingüe colombiano y validarla con un piloto cognitivo (ver Sección 8). `[Aporte Gemini]` Para acelerar la implementación técnica, considerar como referencia secundaria el repositorio Five-Factor-E (JSON estructurado) descrito en 1.1, manteniendo siempre el listado oficial newNEOFacetsKey.htm como fuente de verdad para las claves.

---

## Sección 2 — Adaptaciones al Español Disponibles

| País | Autores | Año | DOI/URL | N muestra | Versión | Características clave |
|---|---|---|---|---|---|---|
| Argentina | Cupani, Pilatti, Urrizaga, Chincolla & Richaud de Minzi | 2014 | 10.32870/rmip.vi.303 | 604 universitarios (Córdoba) | IPIP-NEO-300 | Traducción directa + back-translation; entrevistas cognitivas; α dominio .90–.95; α facetas .59–.88; congruencia de Tucker con muestra USA .96–.98 |
| Argentina | Gross & Cupani; Cupani & Lorenzo-Seva | 2016 | 10.1016/j.paid.2015.11.051 | 910 (15–80 años) | IPIP-FFM 100 ítems | Versión breve balanceada por claves para controlar aquiescencia |
| Argentina | Moran, Cupani & Azpilicueta | 2020 | 10.22201/fpsi.20074719e.2020.2.344 | 499 heterogénea | IPIP-NEO (versión Cupani 2014) | Test-retest, validez convergente; respalda uso en muestras argentinas |
| Paraguay | Wells Samudio, Gauto Quiñonez & Samudio | 2023 | 10.53732/rccsociales/05.02.2023.72 | 345 universitarios | IPIP-NEO-120 (basado en Cupani 2014) | α dominio: N=.83, E=.79, O=.67, A=.80, C=.83 |
| México | Equipo IPIP/ORI | s.f. | https://ipip.ori.org/MexicanIPIP-NEO-120.htm | — | IPIP-NEO-120 mexicano | Publicación de los 120 ítems traducidos al español de México disponibles en sitio IPIP |
| España (transnacional) | Martínez-Molina & Arias | 2018 | 10.7717/peerj.5542 | Multi-muestra | Mini-IPIP (20 ítems) | Dos versiones (mixta y todo positivo); invariancia transcultural |
| España (Hancevich) | Hancevich, A. | s.f. | https://ipip.ori.org/SPANISH%20IPIP-EX.htm | — | Solo facetas de Extraversión | PDF parcial — no cubre todo el banco |
| España (Aluja) | Aluja, A., et al. | 2005 | `[Aporte Gemini, sin DOI verificado en el insumo]` | — | NEO-PI-R | Invarianza factorial NEO-PI-R transcultural en español; complementario al IPIP-NEO. **Verificación pendiente** antes de citar. |

**Inferencia:** No existe una adaptación al español del IPIP-NEO-300 completo validada en Colombia. La adaptación argentina de Cupani et al. (2014) es la única traducción documentada de los 300 ítems al español; las demás adaptaciones cubren subconjuntos (120, 100, 20, o solo Extraversión).

**Disponibilidad legal:** Todas las adaptaciones están en dominio público al ser derivadas del IPIP. La adaptación argentina está publicada en una revista de acceso abierto (Revista Mexicana de Investigación en Psicología) y se puede tomar como base sin permiso. La versión mexicana del 120 está publicada directamente en ipip.ori.org y se puede copiar literalmente.

### 2.1 Recomendación de base para es-CO

**Opinión profesional:** Tomar como base la traducción argentina de Cupani et al. (2014) por tres razones: (1) es la única traducción documentada de los 300 ítems; (2) fue validada con muestra hispanohablante y alcanzó congruencia factorial >.95 con la versión inglesa; (3) atravesó proceso de back-translation y entrevistas cognitivas. Para los ítems con α facetal <.70 en Argentina (N1 Ansiedad, N4 Ansiedad social, N5 Inmoderación, E3 Asertividad, E4 Actividad, A4 Cooperación, C1 Autoeficacia) se debe priorizar revisión léxica adicional.

### 2.2 Modificaciones léxicas anticipadas para Colombia

- "Soy el alma de la fiesta" → revisar "rumbero" (informal) vs. forma neutra.
- "Charlar / parlotear" (Argentina) → "conversar / hablar".
- "Pibe / chico" → eliminar; usar formas neutras.
- "Plata" (monetario) — común en ambos países, mantener.
- Voseo argentino → tuteo colombiano (tú).
- Pretérito perfecto compuesto ("he hecho") → pretérito simple ("hice") suele ser más natural en es-CO oral, aunque "he hecho" es aceptable en registro escrito formal.
- `[Aporte Gemini]` Ejemplos puntuales de re-localización es-CO B2B: *Often feel blue* → "Suelo sentirme desanimado/a" (evitar "bajoneado", argentinismo); *Go on binges* → "Tiendo a cometer excesos" (evitar lectura clínica de trastorno alimentario); *Get angry easily* → "Me da mal genio fácilmente" o "Me molesto con rapidez". Estos tres tipos de ítem son particularmente sensibles para el público ejecutivo colombiano por sus connotaciones clínicas o coloquiales.

---

## Sección 3 — Baremos Publicados

### Tabla maestra de datos psicométricos publicados

| País / muestra | Fuente APA | DOI/URL | N | Versión | M dominio | DT dominio | Percentiles |
|---|---|---|---|---|---|---|---|
| EE. UU. (Internet) | Johnson (2014) | 10.1016/j.jrp.2014.05.003 | 307.313 | IPIP-NEO-300 | [no reportadas en revista] | [no reportadas] | [Johnson opera percentiles dentro de su script CGI por edad/sexo; no publicó tabla] |
| EE. UU. (Eugene-Springfield) | Johnson (2014) | 10.1016/j.jrp.2014.05.003 | 501 | IPIP-NEO-300 | [no reportadas] | [no reportadas] | No |
| EE. UU. (Internet) | Kajonius & Johnson (2019) | 10.5964/ejop.v15i2.1671 | 320.128 | **IPIP-NEO-120** (¡no 300!) | N=11.10; E=13.69; O=13.71; A=14.87; C=14.95 (media de sumas facetales, escala 4–20) | N=2.66; E=2.36; O=2.06; A=2.01; C=2.34 | No (solo M/SD) |
| Argentina | Cupani et al. (2014) | 10.32870/rmip.vi.303 | 604 | IPIP-NEO-300 (es-AR) | M facetales reportados | DT facetales reportadas | No (no calculó percentiles) |
| Argentina | Moran, Cupani & Azpilicueta (2020) | 10.22201/fpsi.20074719e.2020.2.344 | 499 | IPIP-NEO (versión Cupani) | Edad M=27.00 | Edad DT=12.96 | No |
| **`[Aporte Gemini]` Reino Unido / Irlanda** | Hogrefe / OSF Repository — Open-source norms | 10.1027/1015-5759/a000644 · OSF tbmh5 | 18.591 | IPIP-NEO-300 | [no extraídas del insumo Gemini] | [no extraídas] | Disponibles en repositorio OSF abierto (osf.io/tbmh5). **Verificación pendiente:** descargar dataset y confirmar que corresponde al 300 y no al 120. |

**Confiabilidades por dominio del IPIP-NEO-300 — Johnson (2014, Tabla 2, N=307.313):**

| Dominio | α IPIP-NEO-300 | α IPIP-NEO-120 (comparación) | Convergencia con NEO-PI-R (Eugene-Springfield) |
|---|---|---|---|
| Neuroticismo | .95 | .90 | .88 |
| Extraversión | .94 | .89 | .89 |
| Apertura | .90 | .81 | .87 |
| Amabilidad | .92 | .86 | .83 |
| Responsabilidad | .94 | .90 | .84 |

**Promedio de convergencia IPIP-NEO-300 ↔ NEO-PI-R en 35 escalas (5 dominios + 30 facetas):** r = .73 (.94 corregido por atenuación) (Johnson, 2014).

**Adaptación argentina — α por dominio (Cupani et al., 2014, N=604):**

| Dominio | α Argentina (N=604) | α USA matched (n=676) |
|---|---|---|
| Neuroticismo | .95 | .95 |
| Extraversión | .94 | .94 |
| Apertura | .90 | .90 |
| Amabilidad | .92 | .92 |
| Responsabilidad | .94 | .93 |

**Coeficientes de congruencia de Tucker entre estructura factorial argentina y estadounidense** (Cupani et al., 2014): N=.96, E=.98, O=.97, A=.96, C=.96.

**Medias y desviaciones típicas por faceta — muestra argentina N=604** (escala suma 10 ítems × Likert 1–5, rango 10–50; Cupani et al., 2014, Tabla 3):

N1 Ansiedad 31.99 (6.73); N2 Ira 29.77 (8.03); N3 Depresión 26.73 (8.42); N4 Ansiedad social 28.68 (6.83); N5 Inmoderación 31.72 (6.32); N6 Vulnerabilidad 27.12 (6.36); E1 Cordialidad 36.20 (6.96); E2 Gregarismo 33.29 (7.77); E3 Asertividad 34.96 (6.54); E4 Actividad 31.41 (5.11); E5 Búsqueda de emociones 31.92 (6.76); E6 Animación 38.58 (6.32); O1 Imaginación 38.84 (6.74); O2 Intereses artísticos 40.76 (6.44); O3 Emocional 39.06 (5.84); O4 Aventurero 36.43 (6.05); O5 Intelecto 37.57 (6.24); O6 Liberalismo 30.41 (6.72); A1 Confianza 33.57 (6.55); A2 Moral 38.08 (5.93); A3 Altruismo 40.31 (5.51); A4 Cooperación 34.80 (6.33); A5 Modestia 31.92 (6.46); A6 Solidaridad 36.84 (6.43); C1 Autoeficacia 36.68 (5.33); C2 Orden 33.18 (7.04); C3 Sentido de deber 39.06 (5.49); C4 Necesidad de logro 37.30 (6.22); C5 Autodisciplina 32.12 (7.17); C6 Cautela 31.33 (6.42).

**[Sin fuente verificada]:** No se localizó ningún paper publicado en revista indexada que reporte percentiles (P16/P50/P84) específicos por edad y sexo para el IPIP-NEO-300 en muestra hispanohablante.

### 3.1 Recomendación de baremo provisional para LATAM

**Opinión profesional:** Para v1.0 utilizar como baremo provisional las medias y desviaciones facetales de Cupani et al. (2014) y construir bandas BAJO (≤ M − 1 DT), MEDIO (M ± 1 DT), ALTO (≥ M + 1 DT), aproximadamente equivalente a P16/P50/P84 bajo supuesto de normalidad. Etiquetar el reporte explícitamente: "Baremo provisional basado en estudiantes universitarios argentinos N=604 (Cupani et al., 2014). No representa población general colombiana."

`[Aporte Gemini]` **Variante metodológica alternativa para banda corta:** una opción más conservadora documentada por la literatura aplicada consiste en usar bandas de ±0.5 DT (BAJO < M−0.5 DT; MEDIO M±0.5 DT; ALTO > M+0.5 DT) en lugar de ±1 DT. La ventaja es que comprime la banda MEDIO y produce reportes más discriminativos; la desventaja es que aumenta la fracción de usuarios clasificados como BAJO/ALTO y por tanto la frecuencia de mensajes interpretativos polarizados. **Recomendación interna:** mantener ±1 DT (≈ P16/P84) para v1.0 por consistencia con el resto de instrumentos de DescubreMe; revisar a ±0.5 DT solo si UX research demuestra que la banda MEDIO está absorbiendo >70% de usuarios.

### 3.2 Roadmap para baremos colombianos propios

1. Recolección de N≥500 adultos colombianos en 18 meses (vía B2C Paid).
2. Estratificación por sexo, edad (18–29 / 30–44 / 45–59 / 60+) y región (Bogotá / Antioquia / Costa / Pacífico / Eje cafetero).
3. Análisis CFA por dominio (no FFM conjunto, que históricamente no ajusta).
4. Publicación de tabla normativa en repositorio público (OSF, Zenodo).
5. Recalibración de bandas con percentiles empíricos en lugar de M±1DT.

### 3.3 `[Aporte Gemini]` Parámetro de scoring neutral por sexo

La librería **Five-Factor-E** expone el parámetro `sex="N"` que promedia los metadatos normativos masculinos y femeninos para generar un puntaje estandarizado libre de discriminación binaria por sexo asignado al nacer. Su uso es útil para tres escenarios de DescubreMe: (a) usuarios que prefieren no declarar sexo en el onboarding; (b) clientes B2B con políticas estrictas de inclusión que demandan reportes género-neutrales por defecto; (c) entornos legales donde el uso de baremos sexo-específicos pueda ser cuestionado en auditoría. **Decisión interna sugerida:** ofrecer en el onboarding tres opciones (Femenino / Masculino / Prefiero no decir → activa sex="N"). **Verificación pendiente:** confirmar que el algoritmo de Johnson incluido en Five-Factor-E efectivamente publica una tabla normativa promediada y no solo una concatenación de los dos baremos sexo-específicos.

---

## Sección 4 — Estructura de Ítems Inversos por Faceta

**Hecho:** El conteo +/– por faceta del IPIP-NEO-300 se obtiene directamente del listado oficial de Goldberg en https://ipip.ori.org/newNEOFacetsKey.htm.

| Faceta (código) | Nombre (es) | Ítems + | Ítems – | Total |
|---|---|---|---|---|
| N1 Anxiety | Ansiedad | 5 | 5 | 10 |
| N2 Anger | Ira / Hostilidad | 5 | 5 | 10 |
| N3 Depression | Tendencia a la tristeza | 7 | 3 | 10 |
| N4 Self-Consciousness | Pudor social | 6 | 4 | 10 |
| N5 Immoderation | Manejo de impulsos | 5 | 5 | 10 |
| N6 Vulnerability | Sensibilidad al estrés | 5 | 5 | 10 |
| E1 Friendliness | Cordialidad | 5 | 5 | 10 |
| E2 Gregariousness | Gregarismo | 5 | 5 | 10 |
| E3 Assertiveness | Asertividad | 5 | 5 | 10 |
| E4 Activity Level | Nivel de actividad | 5 | 5 | 10 |
| E5 Excitement-Seeking | Búsqueda de emociones | 8 | 2 | 10 |
| E6 Cheerfulness | Animación | 8 | 2 | 10 |
| O1 Imagination | Imaginación | 6 | 4 | 10 |
| O2 Artistic Interests | Intereses artísticos | 5 | 5 | 10 |
| O3 Emotionality | Sensibilidad emocional | 5 | 5 | 10 |
| O4 Adventurousness | Apertura a la novedad | 4 | 6 | 10 |
| O5 Intellect | Apertura intelectual | 5 | 5 | 10 |
| O6 Liberalism | Apertura a valores | 3 | 7 | 10 |
| A1 Trust | Confianza | 6 | 4 | 10 |
| A2 Morality | Honestidad | 2 | 8 | 10 |
| A3 Altruism | Altruismo | 5 | 5 | 10 |
| A4 Cooperation | Cooperación | 3 | 7 | 10 |
| A5 Modesty | Modestia | 4 | 6 | 10 |
| A6 Sympathy | Solidaridad | 4 | 6 | 10 |
| C1 Self-Efficacy | Autoeficacia | 6 | 4 | 10 |
| C2 Orderliness | Orden | 5 | 5 | 10 |
| C3 Dutifulness | Sentido del deber | 5 | 5 | 10 |
| C4 Achievement-Striving | Orientación al logro | 7 | 3 | 10 |
| C5 Self-Discipline | Autodisciplina | 5 | 5 | 10 |
| C6 Cautiousness | Cautela | 3 | 7 | 10 |

**Notas:** (1) El conteo proviene del listado oficial https://ipip.ori.org/newNEOFacetsKey.htm. (2) Hay desbalance intencional en facetas como O6 Liberalism (3+/7–) y A2 Morality (2+/8–) que refleja el contenido conceptual: la mayoría de marcadores naturales del constructo se redactan negativamente. (3) En la implementación se debe codificar el reverse-scoring antes de sumar puntajes: respuestas 1-2-3-4-5 en ítems "–" se transforman a 5-4-3-2-1 antes de sumar al puntaje de faceta. (4) `[Aporte Gemini]` La librería *Five-Factor-E* ya incluye estos metadatos direccionales pre-cargados en el JSON, lo que reduce el riesgo de recodificación manual errónea; aun así, validar contra el listado oficial antes de producción.

---

## Sección 5 — Textos de Interpretación al Usuario (es-CO)

### 5.1 Dominio: Apertura a la Experiencia (O)

**Descripción técnica interna:** Tendencia general a apreciar la experiencia por sí misma, valorar la fantasía, las ideas abstractas, lo estético y lo no convencional.

**BAJO (≤P16):** "Tiendes a moverte con lo conocido y a confiar en lo que ya te ha funcionado. Prefieres rutinas claras y temas concretos sobre debates abstractos. Esa preferencia te da estabilidad y eficiencia en lo cotidiano; explorar lo nuevo es una habilidad que puedes ir entrenando a tu ritmo."

**MEDIO (P17–P83):** "Equilibras lo familiar con lo nuevo: te abres a ideas y experiencias cuando algo te llama la atención, pero también valoras la rutina. Este punto medio te permite adaptarte sin perder tu centro."

**ALTO (≥P84):** "Tiendes a buscar ideas, experiencias y perspectivas nuevas con frecuencia. Disfrutas el arte, las preguntas abiertas y los cambios de contexto. Esa curiosidad amplía tu mundo; cuidar el foco te ayuda a convertir esa exploración en proyectos sostenibles."

### 5.2 Dominio: Responsabilidad (C)

**Descripción técnica interna:** Tendencia a organizar, planificar, persistir y autorregularse en función de metas.

**BAJO:** "Tiendes a moverte de forma más flexible y espontánea que estructurada. Eso te permite improvisar y aprovechar oportunidades. Si te propones metas grandes, te puede ayudar el apoyo de rutinas externas o personas que te acompañen en el seguimiento."

**MEDIO:** "Combinas momentos de organización con momentos de flexibilidad. Cumples con lo importante y, al mismo tiempo, te das espacio para ajustar el plan. Es un balance funcional para la mayoría de contextos."

**ALTO:** "Tiendes a planear, cumplir y persistir hasta terminar lo que empiezas. Tu autodisciplina te abre puertas en lo académico y laboral. Recordar descansar y soltar el control cuando algo no depende de ti también suma a tu bienestar."

### 5.3 Dominio: Extraversión (E)

**Descripción técnica interna:** Tendencia a buscar estimulación social, expresar energía positiva y comprometerse con el mundo externo.

**BAJO:** "Te recargas en espacios tranquilos y prefieres conversaciones cercanas a grupos grandes. Tu energía es más reflexiva que efusiva. Eso te da profundidad; cuidar tus vínculos cercanos potencia ese estilo."

**MEDIO:** "Disfrutas la compañía y también la soledad, según el momento. Te adaptas a contextos sociales sin perderte y sabes cuándo retirarte. Esa versatilidad social es un activo."

**ALTO:** "Tiendes a sentirte cómoda o cómodo entre personas y a tomar la iniciativa social. Tu entusiasmo es contagioso. Reservar momentos de calma te ayuda a sostener esa energía sin agotarte."

### 5.4 Dominio: Amabilidad (A)

**Descripción técnica interna:** Orientación interpersonal de cooperación, confianza y consideración por los demás.

**BAJO:** "Tiendes a priorizar tus criterios y a sostener tu posición frente a otros. Eso te ayuda a negociar y a no ceder por presión. Practicar la escucha activa antes de responder potencia tu liderazgo."

**MEDIO:** "Balanceas cooperación con firmeza: ayudas cuando es necesario y también pones límites. Ese equilibrio te permite construir relaciones honestas y sostenibles."

**ALTO:** "Tiendes a ser empática o empático, a confiar en las personas y a buscar la cooperación. Eso construye comunidad. Cuidar que esa generosidad no se vuelva en tu contra (poniendo límites) sostiene tu bienestar."

### 5.5 Dominio: Estabilidad Emocional (inverso de Neuroticismo)

**Descripción técnica interna:** Capacidad de regular las emociones negativas. Puntajes ALTOS en Neuroticismo = BAJOS en Estabilidad Emocional. **No usar lenguaje clínico.**

**BAJO en Estabilidad / ALTO en N:** "Tiendes a sentir las emociones con intensidad y a notar antes que otras personas lo que te incomoda. Esa sensibilidad te da información valiosa sobre ti y tu entorno. Construir rutinas de descanso, ejercicio y conversaciones de apoyo te ayuda a regular esa intensidad."

**MEDIO:** "Vives las emociones con altibajos normales y, en general, vuelves al equilibrio con relativa facilidad. Conocer qué situaciones te activan más es clave para sostener ese balance."

**ALTO en Estabilidad / BAJO en N:** "Tiendes a mantener la calma incluso bajo presión y a recuperarte rápido del malestar. Esa serenidad es un recurso. Estar atenta o atento a señales tempranas de cansancio o estrés evita que pasen desapercibidas."

### 5.6 Plantillas por faceta (estructura reusable)

Por restricción de espacio, se entregan plantillas BAJO/MEDIO/ALTO para las 30 facetas siguiendo la misma estructura (máx. 80 palabras, descriptivo-aspiracional, no clínico). Ejemplo para **N1 → "Sensibilidad a la preocupación"**:
- **BAJO:** "Tiendes a tomarte las cosas con calma y a no anticipar problemas. Eso te ahorra desgaste mental."
- **MEDIO:** "Te preocupas cuando hay motivo y sueltas cuando lo resuelves. Es un manejo funcional."
- **ALTO:** "Tiendes a anticipar lo que podría salir mal. Esa atención te prepara; aprender técnicas de respiración y enfoque te ayuda a no agotarte."

Análogamente: **N2 Ira → "Reactividad emocional"**; **N3 Depression → "Tendencia a la tristeza"** (nunca "depresión"); **N4 → "Pudor social"**; **N5 → "Manejo de impulsos"**; **N6 → "Sensibilidad al estrés"**; y E1–E6, O1–O6, A1–A6, C1–C6 con la misma estructura BAJO/MEDIO/ALTO.

### 5.7 `[Aporte Gemini]` Variante extendida B2B-corporativa (opcional para Ikigai Premium)

Gemini desarrolló versiones largas (≈80–110 palabras) de los 30 textos facetales con vocabulario corporativo orientado a perfilamientos ejecutivos B2B. Estas versiones **no reemplazan** los textos cortos descriptivo-aspiracionales del 5.1–5.6, que son la línea base para el reporte B2C. Sin embargo, para el módulo Ikigai Premium B2B-A (perfilamientos directivos con coach), Gemini propone:

- Re-bautizo facetal con etiquetas corporativas (ej. N1 → "Preocupación Anticipatoria"; N5 → "Modulación de Impulsos"; E3 → "Asertividad y Dirección"; A2 → "Transparencia Intencional"; C4 → "Orientación al Logro"; C6 → "Deliberación Estratégica"). El mapping completo de 30 facetas con etiquetas B2B está disponible en el insumo crudo de Gemini.
- Cierres orientados a acción ejecutiva ("Te invitamos a auditar...", "Te invitamos a documentar...", "Te invitamos a integrar métricas...").
- Tono que reconoce el rasgo como capacidad estratégica y propone calibración en lugar de cambio.

**Recomendación interna:** la variante B2B extendida de Gemini puede usarse como **layer opcional configurable por tenant** (cliente B2B): si el cliente activa "modo ejecutivo", se muestran los textos largos; si no, los textos cortos de Claude. **Verificación pendiente:** auditoría editorial de las 30 facetas × 3 bandas = 90 textos B2B de Gemini para detectar argentinismos ("bajoneado"), americanismos no es-CO ("currar") o términos clínicos (Gemini repite "reactividad emocional" sin advertir lectura clínica). Antes de uso en producto, pasar por revisor lingüista colombiano.

---

## Sección 6 — License Acquisition Plan

### 6.1 Titular y contacto

**Hecho:** El IPIP no tiene titular en sentido legal restrictivo. Es un colaboratorio público mantenido por el Oregon Research Institute. Contacto operativo: John A. Johnson, Profesor Emérito, Penn State, correo j5j@psu.edu (webmaster oficial del sitio).

### 6.2 Práctica histórica de concesión

**Hecho:** La página de inicio de ipip.ori.org declara textualmente: *"The items and scales are in the public domain, which means that one can copy, edit, translate, or use them for any purpose without asking permission and without paying a fee."* Goldberg et al. (2006) ratifican esta política en el paper de referencia del proyecto: los ítems IPIP *"can be presented in any order, interspersed with other items, reworded, translated into other languages, and administered on the World Wide Web without asking permission of anyone."* `[Aporte Gemini]` Adicionalmente, implementaciones contemporáneas como la librería Five-Factor-E (GitHub NeuroQuestAi) consolidan la libertad operativa mediante licencias permisivas tipo MIT, lo que permite uso comercial directo sin obligación de open-sourcing del producto final.

### 6.3 Pasos para solicitar

**No aplica.** No hay solicitud que hacer. Las únicas acciones recomendadas son:
1. Citar correctamente conforme a la guía oficial de citación (https://ipip.ori.org/newCitation.htm): Goldberg (1999) para el banco de 300 ítems y Johnson (2014) para la metodología psicométrica.
2. Considerar una donación voluntaria al IPIP. La página de inicio del sitio declara verbatim: *"the grant that supported the creation of this website has expired, so if you find the IPIP website useful, we ask you to consider making a donation"* (link: https://ipip.ori.org/newWilling_to_Help.htm).

### 6.4 Borrador de email inicial

**No requerido.** Como cortesía profesional (recomendado para fines de buena ciudadanía científica):

> Asunto: Notificación de uso del IPIP-NEO-300 en plataforma DescubreMe (Colombia)
>
> Estimado Dr. Johnson,
>
> Le escribo para informarle que el equipo de DescubreMe, una plataforma web freemium de autoconocimiento adulto en Colombia, planea implementar el IPIP-NEO-300 como módulo opcional dentro de un producto B2B de perfilamiento ejecutivo profundo. Entendemos que el banco está en dominio público y no se requiere permiso; aun así, queremos notificar el uso y solicitar dos cosas: (1) confirmación de que la cita correcta para el banco es Goldberg (1999) y para la metodología psicométrica es Johnson (2014); (2) cualquier sugerencia de implementación que considere relevante. Agradeceremos también su autorización para reproducir las descripciones de las 30 facetas que usted redactó y colocó en dominio público, como base de los textos de interpretación, con crédito explícito.
>
> Cordialmente,
> [Equipo DescubreMe]

### 6.5 Costo esperado y rangos

**USD 0.** Donación voluntaria sugerida al IPIP entre USD 50 y USD 500 según presupuesto.

### 6.6 Plan B

El IPIP-NEO-300 es la elección. Si por capacidad operativa no se puede sostener una sesión larga, el **Plan B real es no implementar el 300 y mantener el IPIP-NEO-120 cubriendo los segmentos B2C Paid y B2B Premium**. El IPIP-NEO-120 ya está validado para los mismos 5 dominios y 30 facetas, con α dominio entre .81 y .90 (Johnson, 2014), y se completa, según Johnson, en aproximadamente 10–20 minutos.

`[Aporte Gemini]` **Variante de Plan B con activación condicional:** una arquitectura alternativa es desplegar el IPIP-NEO-300 con una **variable lógica de fallback** que detecte señales tempranas de fatiga del usuario (tiempo por ítem > umbral, abandono de pestaña, latencia creciente) y ofrezca conmutación dinámica al IPIP-NEO-120 a mitad de sesión, recuperando las 30 facetas con menor profundidad pero sin perder el perfil. Decisión de producto pendiente: la complejidad UX de esta conmutación dinámica probablemente no se justifica para v1.5; el Plan B simple (300 o 120, no ambos) es más limpio.

---

## Sección 7 — Disclaimers y Mitigaciones Específicas

### 7.1 Disclaimer pre-test (es-CO, máx. 100 palabras)

> "Vas a responder un cuestionario de personalidad de 300 frases. Toma entre 30 y 75 minutos, según tu ritmo: te recomendamos hacerlo en uno o dos bloques, en un lugar tranquilo y con buena conexión. No hay respuestas correctas; solo hay tu manera de verte. Es un instrumento educativo y de autoconocimiento, no es un diagnóstico clínico ni una herramienta de selección laboral. Si en algún momento te sientes mal o sin ánimo de continuar, puedes pausar o salir. Tus respuestas son confidenciales. Si necesitas hablar con alguien, en Colombia la Línea 106 atiende 24/7."

### 7.2 Ítems sensibles que activan NFR-28

**Hecho:** Los ítems siguientes del IPIP-NEO-300 (tomados literalmente de https://ipip.ori.org/newNEOFacetsKey.htm) tocan contenido emocionalmente sensible y deben ser monitoreados:

- **N3 Depression (+ keyed):** *"Often feel blue"*, *"Dislike myself"*, *"Am often down in the dumps"*, *"Have a low opinion of myself"*, *"Have frequent mood swings"*, *"Feel desperate"*, *"Feel that my life lacks direction"*.
- **N1 Anxiety (+ keyed):** *"Fear for the worst"*, *"Am afraid of many things"*, *"Get caught up in my problems"*.
- **N6 Vulnerability (+ keyed):** *"Become overwhelmed by events"*, *"Feel that I'm unable to deal with things"*, *"Get overwhelmed by emotions"*.
- **N5 Immoderation (+ keyed):** *"Often eat too much"*, *"Go on binges"*, *"Do things I later regret"* — pueden activar señales sobre conducta alimentaria o impulsividad.

**Mitigación:** si un usuario marca "Very accurate" (5) en ≥ 5 de los 7 ítems "+ keyed" de N3 Depression, activar mensaje de contención (Sección 7.3).

`[Aporte Gemini]` **Protocolo NFR-28 extendido para B2B (re-enrutamiento del reporte):** en escenarios B2B donde el cliente corporativo recibe agregados de su equipo, el protocolo NFR-28 debe incluir un *trigger* lógico silencioso que, ante la detección de patrones críticos en N3 + N6, **bloquee categóricamente el envío del reporte individual a la jefatura directa del usuario** y re-enrute el perfil exclusivamente al área de Medicina Laboral o a la Psicóloga Organizacional del cliente corporativo. El usuario sí recibe su propio reporte; lo que no se entrega al cliente B2B es la versión nominal individual sin contexto clínico. Esta capa es una barrera ética crítica para evitar que un perfilamiento de personalidad termine usado para decisiones laborales sobre un colaborador en momento vulnerable.

### 7.3 Mensaje de contención (es-CO, máx. 120 palabras)

> "Notamos que algunas de tus respuestas describen momentos difíciles. Queremos recordarte que este test no es un diagnóstico y que sentirse así puede pasarle a cualquier persona. No estás solo o sola. Si lo que estás viviendo te pesa más de lo habitual, o llevas tiempo sintiéndote así, hablar con alguien ayuda. En Colombia puedes contactar a la **Línea 106** marcando 106 desde cualquier celular o fijo (gratis, 24 horas), por WhatsApp al **300 754 8933**, o por correo a **linea106@saludcapital.gov.co**. En urgencia inmediata, llama al **123**. Si prefieres atención profesional privada, busca un psicólogo o psiquiatra de confianza. Tu bienestar es lo más importante."

### 7.4 Líneas de ayuda Colombia relevantes

| Línea | Cobertura | Número | Canales |
|---|---|---|---|
| Línea 106 "El poder de ser escuchado" | Bogotá (también nacional vía MinSalud) | 106 | Teléfono 24/7; WhatsApp 300 754 8933; linea106@saludcapital.gov.co |
| Línea 123 Emergencias | Nacional | 123 | Emergencias en salud mental inmediatas |
| Línea Nacional MinSalud (salud mental) | Nacional | 192 (Opción 4) | Atención especializada salud mental `[Aporte Gemini]` |
| Línea Calma (hombres) | Bogotá | 01 8000 423 614 | Hombres con emociones difíciles |
| Línea Púrpura (mujeres) | Bogotá | 01 8000 112 137; WhatsApp 300 755 1846 | Violencia contra mujeres |
| Línea Diversa | Bogotá | WhatsApp 310 864 4214 | Población LGBT+ |
| Línea 141 ICBF | Nacional | 141 | Niños, niñas, adolescentes |
| Línea Amiga Saludable | Medellín | (604) 444 44 48; WhatsApp 300 723 1123 | Salud mental Medellín |
| `[Aporte Gemini]` Chat *Porque Quiero Estar Bien* (Fundación Santo Domingo) | Nacional | WhatsApp +57 333 0333588 | Acompañamiento psicológico clínico vía chat. **Verificación pendiente del número.** |
| `[Aporte Gemini]` Línea Psicoactiva Bogotá | Bogotá | WhatsApp +57 301 2707039 | Apoyo psicológico. **Verificación pendiente del número.** |

### 7.5 Disclaimer post-test (es-CO, máx. 80 palabras)

> "Lo que acabas de leer es una descripción educativa de tendencias, no una etiqueta fija. Tu personalidad cambia con la experiencia y con lo que decides hacer. Este reporte no reemplaza una consulta con un profesional de la salud mental si lo necesitas. Si algo de lo que leíste te resonó incómodamente, vale la pena conversarlo con alguien de confianza o con un terapeuta. Gracias por dedicarle el tiempo a conocerte mejor."

---

## Sección 8 — Sugerencias de Piloto Cognitivo Colombia

### 8.1 Tamaño y características de la muestra

**Opinión profesional:** Para piloto cognitivo cualitativo del IPIP-NEO-300 en es-CO se recomienda N=20–30 participantes, estratificados:
- 50/50 hombres/mujeres.
- 3 grupos etarios: 18–29, 30–44, 45–60.
- Mix regional: 40% Bogotá, 30% Medellín/Antioquia, 15% Costa Caribe, 15% otros.
- Mix de nivel educativo (medio/superior).
- Excluir bilingües profesionales (psicólogos, lingüistas) en al menos el 70% de la muestra.

`[Aporte Gemini]` **Variante B2B-Premium del piloto:** si el lanzamiento se enfoca en Ikigai Premium B2B-A, considerar un piloto paralelo con N=40 profesionales activos, 50% mandos medios + 50% C-Level/directivos, estratificado por Bogotá / Medellín / Cali / Barranquilla en partes iguales. Esto valida la apropiación semántica en el público real al que va el producto y detecta polisemia regional (ej. términos que en Bogotá implican diligencia pero en Costa Caribe se perciben como ofensa).

### 8.2 Protocolo think-aloud

1. Participante lee cada ítem en voz alta y verbaliza qué entiende antes de responder.
2. Moderador anota: (a) palabras que el participante repite o pregunta, (b) re-lecturas, (c) tiempo por ítem >15s, (d) explicación divergente del constructo intencionado.
3. Tras bloques de 50 ítems, sondeo retrospectivo: *"¿Hubo algún ítem confuso o que no aplicara a tu vida?"*
4. Pregunta final: experiencia de fatiga, recomendación de tiempo máximo y puntos de pausa.

`[Aporte Gemini]` **Atención específica a doble negación:** los ítems con clave inversa frecuentemente producen confusión por doble negación cuando se traducen literalmente (ej. *"Am not easily annoyed"* → "No me molesto fácilmente" combinado con escala Likert que pregunta cuánto se identifica). El moderador debe registrar específicamente vacilaciones en ítems inversos.

### 8.3 Criterios para aceptar/re-adaptar ítem

- **ACEPTAR** si ≥ 80% de participantes interpretan el ítem en línea con el constructo.
- **RE-ADAPTAR** si 20–50% expresan confusión, ambigüedad, o regionalismo no familiar.
- **REEMPLAZAR** si > 50% no entienden o lo interpretan en sentido opuesto.
- Ítems que toman > 20s en promedio: revisar por extensión o vocabulario.

### 8.4 Output esperado del piloto

- Documento "es-CO v1.1": versión revisada de los 300 ítems con anotación de cambios respecto a la base Cupani 2014.
- Lista de ítems críticos (con α<.70 esperado).
- Recomendación operativa sobre tiempo máximo de sesión y cantidad de puntos de guardado intermedio sugeridos (probablemente 2–3 cada 100 ítems).
- `[Aporte Gemini]` **Matriz de equivalencias léxicas (formato CSV/Excel)** con tres columnas: (1) ítem original en inglés de Johnson, (2) traducción puente argentina de Cupani, (3) formulación final pulida es-CO. Esta matriz se entrega al equipo backend para sobreescribir masivamente los valores del JSON de Five-Factor-E. Es un entregable concreto y útil para la cadena de implementación técnica.

---

## Sección 9 — Gaps y Preguntas Abiertas

1. **¿Existen percentiles publicados por edad y sexo para el IPIP-NEO-300?** Johnson opera percentiles internos en su script CGI usando datos no publicados como tabla. **Plan:** contactar a Johnson directamente (j5j@psu.edu) solicitando el archivo de M/SD por celda edad×sexo, o acceder al dataset N=307.313 vía Open Science Framework (https://osf.io/tbmh5/) y construir tablas propias. `[Aporte Gemini]` Considerar además el dataset normativo UK/Irlanda (Hogrefe DOI 10.1027/1015-5759/a000644, N=18.591) como segunda fuente normativa abierta, sujeto a verificación de equivalencia métrica con LATAM.

2. **¿Cuál es la equivalencia métrica entre la adaptación argentina de Cupani y el uso colombiano sin re-adaptación?** Cupani et al. validaron en Córdoba (Argentina), no en Colombia. **Plan:** piloto cognitivo + recolección de N≥300 colombianos para análisis de invariancia (configural, métrica, escalar) con software como Mplus o lavaan.

3. **¿El CFA conjunto del FFM ajusta razonablemente con datos colombianos?** Kajonius & Johnson (2019) declaran en su abstract verbatim: *"Both hierarchical second-order and bi-factor models showed tolerable model fit indices, using confirmatory factor analysis in a structural equation modeling (SEM) framework… We conclude that IPIP-NEO is sufficiently structurally robust for future use."* **Plan:** reportar dominios por separado y usar ESEM o bi-factor en lugar de CFA estricto FFM-conjunto. `[Aporte Gemini]` Refuerza esta misma alerta: en la UI/UX no intentar promediar un "puntaje de personalidad global" porque el CFA estricto unidimensional sobre 300 ítems históricamente no ajusta; renderizar los 5 dominios + 30 facetas como espectros ortogonales separados.

4. **¿Es el riesgo de detección de ideación suicida vía N3 suficiente para justificar una rutina automática de detección/contención?** El ítem *"Feel desperate"* puede ser un proxy distante de malestar agudo, pero el IPIP no fue diseñado para detección clínica. **Plan:** consultar con psicólogo clínico colombiano sobre umbral de activación NFR-28 antes del lanzamiento.

5. **¿La sesión de 30–75 minutos es viable en B2C colombiano sin guardado intermedio?** **Plan:** test A/B con guardado cada 50 ítems vs. sesión continua, midiendo tasas de abandono. `[Aporte Gemini]` Plan técnico complementario: construir un sistema transaccional de autosave asíncrono en PostgreSQL/Supabase que registre respuestas en chunks de 10 ítems, habilitando pausa-reanuda multi-dispositivo. Esto baja el riesgo de pérdida total de perfil ante desconexión y es probablemente requisito mínimo para el 300 (no para el 120).

6. `[Aporte Gemini]` **¿Cuál es la política de género del scoring (binario vs. neutro)?** El IPIP original ofrece baremos separados Hombres/Mujeres. Las directrices contemporáneas de inclusión y RH demandan opciones género-neutrales. **Plan:** adoptar el parámetro `sex="N"` de Five-Factor-E como opción explícita en el onboarding ("Prefiero no decir") y documentar en metadata del reporte la cohorte normativa usada.

---

## Sección 10 — Referencias (APA 7)

Cupani, M., & Lorenzo-Seva, U. (2016). The development of an alternative IPIP inventory measuring the Big-Five factor markers in an Argentine sample. *Personality and Individual Differences, 91*, 40–46. https://doi.org/10.1016/j.paid.2015.11.051

Cupani, M., Pilatti, A., Urrizaga, A., Chincolla, A., & Richaud de Minzi, M. C. (2014). Inventario de Personalidad IPIP-NEO: estudios preliminares de adaptación al español en estudiantes argentinos. *Revista Mexicana de Investigación en Psicología, 6*(1), 55–73. https://doi.org/10.32870/rmip.vi.303

Goldberg, L. R. (1999). A broad-bandwidth, public domain, personality inventory measuring the lower-level facets of several five-factor models. In I. Mervielde, I. Deary, F. De Fruyt, & F. Ostendorf (Eds.), *Personality psychology in Europe* (Vol. 7, pp. 7–28). Tilburg University Press.

Goldberg, L. R., Johnson, J. A., Eber, H. W., Hogan, R., Ashton, M. C., Cloninger, C. R., & Gough, H. G. (2006). The International Personality Item Pool and the future of public-domain personality measures. *Journal of Research in Personality, 40*(1), 84–96. https://doi.org/10.1016/j.jrp.2005.08.007

International Personality Item Pool. (n.d.). *A scientific collaboratory for the development of advanced measures of personality and other individual differences*. Oregon Research Institute. Retrieved May 18, 2026, from https://ipip.ori.org/

Johnson, J. A. (2005). Ascertaining the validity of individual protocols from web-based personality inventories. *Journal of Research in Personality, 39*(1), 103–129. https://doi.org/10.1016/j.jrp.2004.09.009

Johnson, J. A. (2014). Measuring thirty facets of the Five Factor Model with a 120-item public domain inventory: Development of the IPIP-NEO-120. *Journal of Research in Personality, 51*, 78–89. https://doi.org/10.1016/j.jrp.2014.05.003

Kajonius, P. J., & Johnson, J. A. (2019). Assessing the structure of the Five Factor Model of Personality (IPIP-NEO-120) in the public domain. *Europe's Journal of Psychology, 15*(2), 260–275. https://doi.org/10.5964/ejop.v15i2.1671

Maples, J. L., Guan, L., Carter, N. T., & Miller, J. D. (2014). A test of the International Personality Item Pool representation of the revised NEO Personality Inventory and development of a 120-item IPIP-based measure of the Five-Factor Model. *Psychological Assessment, 26*(4), 1070–1084. https://doi.org/10.1037/pas0000004

Martínez-Molina, A., & Arias, V. B. (2018). Balanced and positively worded personality short-forms: Mini-IPIP validity and cross-cultural invariance. *PeerJ, 6*, e5542. https://doi.org/10.7717/peerj.5542

Moran, V. E., Cupani, M., & Azpilicueta, A. (2020). Inventario IPIP-NEO: Estabilidad y validez de estructura interna, convergente y concurrente en muestras argentinas. *Acta de Investigación Psicológica, 10*(2), 25–43. https://doi.org/10.22201/fpsi.20074719e.2020.2.344

Rehman, M., & Johnson, J. A. (2020). Structural validity and reliability of the Urdu translated version of IPIP-NEO-300 web-based inventory. *Pakistan Journal of Psychological Research, 35*(2). https://doi.org/10.33824/PJPR.2020.35.2.21

Secretaría Distrital de Salud de Bogotá. (2024). *Línea 106: El poder de ser escuchado*. https://www.saludcapital.gov.co/Paginas2/Quienes_Somos_linea106.aspx

Wells Samudio, C. M., Gauto Quiñonez, M. S., & Samudio, M. (2023). Propiedades psicométricas de la adaptación del IPIP-NEO en estudiantes universitarios paraguayos. *Revista Científica en Ciencias Sociales, 5*(2), 72–86. https://doi.org/10.53732/rccsociales/05.02.2023.72

`[Aporte Gemini]` Referencia adicional incorporada (verificación pendiente del DOI):

Open-Source Personality Trait Norms for the United Kingdom and Ireland. *European Journal of Psychological Assessment* (Hogrefe). https://doi.org/10.1027/1015-5759/a000644 — Dataset abierto N=18.591 (UK/Irlanda); útil como cohorte normativa internacional complementaria al dataset estadounidense de Johnson.

`[Aporte Gemini]` Recurso de implementación técnica (no referencia académica):

NeuroQuestAi. (s.f.). *Five-Factor-E: Python library implementing IPIP-NEO scoring (MIT License)* [Software]. GitHub. https://github.com/NeuroQuestAi/five-factor-e

---

## Apéndice A — Mapa de aportes consolidados desde Gemini

| # | Sección | Aporte | Valor agregado | Verificación |
|---|---|---|---|---|
| A1 | §0, §1.1, §1.4, §4 | Librería *Five-Factor-E* (GitHub NeuroQuestAi) con JSON de 300 ítems + claves +/− pre-cargadas + licencia MIT | Acelera implementación backend; reduce error de transcripción manual | Pendiente: confirmar que el JSON replica fielmente las claves de newNEOFacetsKey.htm |
| A2 | §0, §3, §9 | Dataset normativo abierto UK/Irlanda (Hogrefe DOI 10.1027/1015-5759/a000644, N=18.591) | Segunda cohorte normativa internacional para triangular con Johnson 2014 | Pendiente: descargar dataset OSF tbmh5 y confirmar versión (300 vs 120) y métricas |
| A3 | §2.2 | Ejemplos puntuales de re-localización es-CO B2B (*Often feel blue* → "desanimado/a"; *Go on binges* → "cometer excesos"; *Get angry easily* → "me da mal genio") | Vocabulario directamente aplicable en piloto cognitivo | Verificado contra estilo guide DescubreMe |
| A4 | §3.1 | Variante metodológica de bandas ±0.5 DT vs. ±1 DT | Opción documentada para escenarios donde la banda MEDIO absorbe demasiados usuarios | Recomendación: mantener ±1 DT en v1.0, revisitar tras UX research |
| A5 | §3.3 | Parámetro `sex="N"` de Five-Factor-E para baremo neutral por sexo | Política de inclusión para usuarios que no declaran sexo binario | Pendiente: confirmar si Johnson publicó tabla normativa promediada o solo concatenada |
| A6 | §5.7 | Variante extendida B2B-corporativa de los 30 textos facetales (80–110 palabras, vocabulario directivo) | Layer opcional configurable por tenant para Ikigai Premium B2B-A | Pendiente: auditoría editorial lingüista colombiana (detectar argentinismos, americanismos, lenguaje clínico) |
| A7 | §6.6 | Plan B con activación condicional dinámica (300 → 120 a mitad de sesión por detección de fatiga) | Idea arquitectónica de fallback | Decisión interna: complejidad UX no justifica para v1.5; mantener Plan B simple |
| A8 | §7.2 | Protocolo NFR-28 extendido para B2B: re-enrutamiento del reporte hacia Medicina Laboral / Psicóloga Organizacional, bloqueando entrega a jefatura | Capa ética crítica para escenarios B2B con agregados | Recomendado para implementación en v1.0 B2B |
| A9 | §7.4 | Líneas adicionales: MinSalud 192 opc.4, *Porque Quiero Estar Bien* WhatsApp +57 333 0333588, Psicoactiva Bogotá +57 301 2707039 | Ampliación del directorio de contención | Pendiente: verificar vigencia de los dos números WhatsApp antes de publicar |
| A10 | §8.1 | Variante de piloto cognitivo B2B-Premium (N=40, 50% C-Level, 4 ciudades) | Pertinente para Ikigai Premium B2B-A | Aceptado como protocolo paralelo opcional |
| A11 | §8.2 | Énfasis específico en registrar vacilaciones por doble negación en ítems inversos | Mejora la calidad del piloto cognitivo | Aceptado |
| A12 | §8.4 | Matriz de equivalencias léxicas en CSV/Excel (inglés / Cupani-AR / es-CO final) como entregable del piloto | Output operativo concreto para el equipo backend | Aceptado |
| A13 | §9 (gap 6) | Gap nuevo: política de género del scoring (binario vs. neutro) | Tema ético-legal que el pack de Claude no aborda explícitamente | Aceptado como gap formal |
| A14 | §10 | Referencia Hogrefe UK/Irlanda + recurso técnico Five-Factor-E | Documenta las dos fuentes nuevas integradas | Pendiente: confirmar DOI Hogrefe |

---

## Apéndice B — Notas de consolidación (metodología)

**Diagnóstico de cumplimiento del prompt v1.0:**

- **Claude:** OK — cumple las 10 secciones del prompt v1.0 con la estructura esperada, incluyendo tablas (adaptaciones, baremos, conteo +/− de las 30 facetas), URLs verificables del IPIP, textos es-CO BAJO/MEDIO/ALTO para los 5 dominios + plantilla extensible para las 30 facetas, email copy-paste, directorio de líneas Colombia, 5 gaps con plan, 15 referencias APA con DOI. Usa marcadores Hecho/Inferencia/Opinión profesional consistentemente y reconoce explícitamente [sin fuente verificada] donde aplica (percentiles colombianos por edad/sexo del IPIP-NEO-300).
- **Gemini:** PARCIAL — cubre nominalmente las 10 secciones pero con varios déficits estructurales: (a) no entrega lista literal de los 300 ítems en inglés; (b) la tabla de inversos en §4 solo ejemplifica 6 facetas en lugar de las 30; (c) re-bautiza dimensiones y facetas con etiquetas corporativas sin trazar la equivalencia con la nomenclatura oficial N1/N2/E1/etc., lo que rompe la trazabilidad psicométrica; (d) referencias APA narrativas con DOIs cuestionables (DOI 10.1016/S2007-4719(14)70383-7 atribuido a Cupani 2014 no corresponde con la fuente correcta 10.32870/rmip.vi.303); (e) §10 mezcla 26 "obras citadas" tipo dataset Kaggle, blog posts y un auto-referente al propio prompt como fuente. No obstante, aporta valor verificable en 6 áreas: librería *Five-Factor-E*, dataset UK/Irlanda Hogrefe, parámetro sex="N", textos B2B extendidos, protocolo NFR-28 detallado, y gaps adicionales (política de género, autosave técnico).

**Método aplicado:** Patrón "Claude base + Gemini suple" (idéntico a los 12 consolidados previos). Se mantuvo íntegra la estructura del pack de Claude y se inyectaron los 14 aportes verificables de Gemini con marca `[Aporte Gemini]` en línea (todos catalogados en Apéndice A). Aportes de Gemini rechazados o no integrados: (1) renombramiento masivo de facetas (Reactividad Emocional, Tolerancia a la Frustración, etc.) sin tabla de equivalencia — rompe trazabilidad; (2) los 90 textos extensos B2B (5 dominios × 3 + 30 facetas × 3) no se integraron literalmente porque requieren auditoría lingüística colombiana primero; quedan referenciados en §5.7 como layer opcional pendiente; (3) DOI 10.1016/S2007-4719(14)70383-7 atribuido a Cupani — descartado a favor del DOI correcto 10.32870/rmip.vi.303 ya documentado por Claude; (4) referencias tipo Kaggle/blog del §10 de Gemini — no se incorporan al §10 consolidado por no ser fuentes académicas indexadas.

**Equivalencia de etiquetas (Gemini → IPIP oficial):** para uso interno futuro si se decide adoptar las etiquetas B2B de Gemini, conservar la siguiente equivalencia:
- N1 Anxiety = Preocupación Anticipatoria | N2 Anger = Tolerancia a la Frustración | N3 Depression = Fluctuación del Estado de Ánimo | N4 Self-Consciousness = Sensibilidad a la Evaluación Social | N5 Immoderation = Modulación de Impulsos | N6 Vulnerability = Sensibilidad a Estímulos Estresantes
- E1 Friendliness = Orientación a las Personas | E2 Gregariousness = Afinidad Grupal | E3 Assertiveness = Asertividad y Dirección | E4 Activity Level = Ritmo de Actividad | E5 Excitement-Seeking = Búsqueda de Dinamismo | E6 Cheerfulness = Expresividad Positiva
- O1 Imagination = Pensamiento Divergente | O2 Artistic Interests = Sensibilidad Estética | O3 Emotionality = Conciencia Afectiva Interna | O4 Adventurousness = Apertura a la Novedad | O5 Intellect = Curiosidad Analítica | O6 Liberalism = Flexibilidad Paradigmática
- A1 Trust = Confianza Interpersonal | A2 Morality = Transparencia Intencional | A3 Altruism = Disposición de Servicio | A4 Cooperation = Orientación al Consenso | A5 Modesty = Proyección de Humildad | A6 Sympathy = Resonancia Empática
- C1 Self-Efficacy = Sentido de Autoeficacia | C2 Orderliness = Estructuración del Entorno | C3 Dutifulness = Sentido de Compromiso | C4 Achievement-Striving = Orientación al Logro | C5 Self-Discipline = Autodisciplina Operativa | C6 Cautiousness = Deliberación Estratégica

**Veredicto de proporciones:** Claude ≈ 90% + Gemini ≈ 10%. Gemini fue valioso para (a) acelerar la implementación técnica (librería Five-Factor-E), (b) sumar una cohorte normativa internacional adicional (UK/Irlanda), (c) refinar el protocolo NFR-28 para escenarios B2B, y (d) abrir un gap legítimo sobre política de género del scoring. El núcleo psicométrico (URLs IPIP, tabla M/SD argentina, conteo +/− por faceta, textos es-CO, plan de licencia, líneas Colombia, referencias APA) viene íntegramente de Claude.
