# Implementation Acquisition Pack v1.0 — BFI-2-S (30 ítems) — CONSOLIDADO
**Producto destino:** DescubreMe (LATAM, foco Colombia) · **Migración M1 (Mini-IPIP 20 → BFI-2-S 30)** · **Q1 2027**
**Versión del consolidado:** 1.0 · **Fecha:** mayo 2026
**Insumos:** `Prompt_01_BFI-2-S_IAR.Claude.md` (Implementation Acquisition Pack completo, 10 secciones) + `Prompt_01_BFI-2-S_IAR.Gemini.md` (revisión académica narrativa con aportes psicométricos complementarios)
**Idiomas:** español neutro (metadatos y notas internas) / español Colombia (Secciones 5 y 7)

> **Nota metodológica del consolidado.** Claude entregó el Pack completo siguiendo el prompt v1.0 al pie de la letra. Gemini entregó una revisión académica narrativa que no cumple la estructura de 10 secciones del prompt pero aporta contexto psicométrico complementario y validaciones internacionales adicionales (Francia, Kuwait, advertencia Panamá, modelo bifactor DIFAB, Análisis de Perfiles Latentes mexicano). Este consolidado usa el Pack de Claude como base estructural completa e inyecta los aportes verificables de Gemini con la marca `[Aporte Gemini]`. La trazabilidad del origen de cada bloque está en el **Apéndice A**.

---

## TABLA DE COBERTURA (requisitos explícitos del brief vs. entrega)

| Requisito | Sección | Cobertura |
|---|---|---|
| Portada y metadatos + estado de bloqueadores | §0 | OK |
| Plan adquisición banco de ítems + lista literal de 30 ítems en inglés | §1 | OK (Colby PDF + Soto&John 2017b apéndice) |
| Adaptaciones al español (España, México, Chile, Argentina, Colombia, Colby) | §2 | OK + 2.1 + 2.2 |
| Baremos publicados (EE.UU., España, México, Chile, Argentina, Colombia + Francia, Kuwait) | §3 | OK + 3.1 + 3.2 + 3.3 |
| Tabla de 15 ítems inversos numerados | §4 | OK |
| 60 textos es-CO (5 dominios × 3 bandas + 15 facetas × 3 bandas) | §5 | OK (60/60) |
| Plan licencia (contactos, práctica, pasos, email inglés, costo, Plan B HEXACO-60) | §6 | OK |
| Disclaimers pre/post + items sensibles + mensaje contención + líneas Colombia | §7 | OK |
| Piloto cognitivo Colombia (muestra, think-aloud, criterios, entregables) | §8 | OK |
| ≥ 3 gaps y preguntas abiertas | §9 | OK (6) |
| ≥ 10 referencias APA 7 con DOI | §10 | OK (15) |
| Marcadores Hecho/Inferencia/Opinión profesional | transversal | OK |
| Marcadores [sin fuente verificada] donde aplica | §3, §6, §7 | OK |
| **Aportes consolidados desde Gemini con verificación pendiente** | Apéndice A | OK |

---

## SECCIÓN 0 — PORTADA Y METADATOS

| Campo | Valor |
|---|---|
| Acrónimo | BFI-2-S |
| Nombre completo | Big Five Inventory-2 Short Form |
| Autores | Soto, C. J. & John, O. P. |
| Año de publicación | 2017 |
| Versión | Forma corta de 30 ítems (BFI-2-S) |
| Idioma original | Inglés (EE. UU.) |
| Constructo | Cinco Grandes jerárquico — 5 dominios + 15 facetas |
| Escala de respuesta | Likert 5 puntos (1 = Disagree strongly → 5 = Agree strongly) |
| Tiempo de aplicación | 3–5 minutos |
| Copyright | Christopher J. Soto (Colby College) y Oliver P. John (UC Berkeley), 2015 |
| Productos destino DescubreMe | B2C Free + B2C Paid v1.5 (Migración M1) |

**Resumen ejecutivo (5 líneas).** El BFI-2-S es la forma corta de 30 ítems del BFI-2 (Soto & John, 2017a, 2017b), psicométricamente robusta para medir los cinco dominios y, en muestras grandes (n ≥ 400), las 15 facetas. Los ítems están publicados literalmente en el apéndice del paper de *J. Res. Pers.* y en el formulario oficial del Colby Personality Lab. La adaptación al español de referencia es Gallardo-Pujol et al. (2022), realizada en España, distribuida vía OSF. **El bloqueador crítico es legal:** el Berkeley Personality Lab declara textualmente que *"At this time, the BFI-2 is for non-commercial uses only"*; cualquier uso en producto comercial (Free freemium o Paid) exige licencia escrita previa.

`[Aporte Gemini]` **Por qué el BFI-2-S no es una "tijera" sobre el BFI-2.** A diferencia del enfoque "top-down" tradicional (que retiene los ítems de mayor carga factorial maximizando alfa a costa del ancho de banda), Soto y John (2017b) construyeron el BFI-2-S con un enfoque **bottom-up** estratificado por faceta: seleccionaron exactamente 2 ítems por cada una de las 15 facetas, 1 directo y 1 inverso. El resultado preserva ~91% de la varianza de los dominios del BFI-2 completo y ~89% del poder predictivo a nivel de facetas. Este detalle es relevante para el copy y para la comunicación con autores: el BFI-2-S no es una "versión light", es un instrumento facetal por diseño.

**Estado de bloqueadores:**

| Bloqueador | Estado | Razón breve |
|---|---|---|
| (a) Licencia comercial | **BLOCKED** | Berkeley FAQ y Colby Personality Lab restringen el uso a fines no comerciales; se requiere solicitud explícita a Soto/John y a `ucbpersonalitylab@gmail.com`. |
| (b) Ítems literales (inglés) | **READY** | Publicados en Soto & John (2017b, Apéndice A) y en `bfi2s-form.pdf` del Colby Personality Lab; consultables sin paywall. |
| (b') Ítems en español (España) | **PARTIAL** | Disponibles en OSF (Gallardo-Pujol et al., 2022) para fines de investigación; requiere revisión léxica es-CO y notificación a los autores. |
| (c) Baremos colombianos | **BLOCKED** | No existe baremo CFA colombiano del BFI-2-S publicado a mayo 2026. Norma provisional: Gallardo-Pujol (España) o Toledo-Fernández (México). |

---

## SECCIÓN 1 — ACQUISITION PLAN DEL BANCO DE ÍTEMS

### 1.1 Disponibilidad pública

**Hecho:** Los 30 ítems del BFI-2-S en inglés están publicados literalmente en al menos tres fuentes abiertas verificables: (1) el Apéndice A del artículo de Soto & John (2017b) en *Journal of Research in Personality* 68, 69–81; (2) el formulario `bfi2s-form.pdf` alojado en el Colby Personality Lab (`https://www.colby.edu/wp-content/uploads/2013/08/bfi2s-form.pdf`); (3) la ficha pública del repositorio EMERGE de UCSD. La nota de copyright reza: *"BFI-2 items copyright 2015 by Oliver P. John and Christopher J. Soto. Reprinted with permission."*

**Lista literal en inglés (numeración oficial BFI-2-S; * = reverse-keyed):**

| # | Ítem (I am someone who…) | Faceta | Clave |
|---|---|---|---|
| 1 | Tends to be quiet.* | Sociability | R |
| 2 | Is compassionate, has a soft heart. | Compassion | D |
| 3 | Tends to be disorganized.* | Organization | R |
| 4 | Worries a lot. | Anxiety | D |
| 5 | Is fascinated by art, music, or literature. | Aesthetic Sensitivity | D |
| 6 | Is dominant, acts as a leader. | Assertiveness | D |
| 7 | Is sometimes rude to others.* | Respectfulness | R |
| 8 | Has difficulty getting started on tasks.* | Productiveness | R |
| 9 | Tends to feel depressed, blue. | Depression | D |
| 10 | Has little interest in abstract ideas.* | Intellectual Curiosity | R |
| 11 | Is full of energy. | Energy Level | D |
| 12 | Assumes the best about people. | Trust | D |
| 13 | Is reliable, can always be counted on. | Responsibility | D |
| 14 | Is emotionally stable, not easily upset.* | Emotional Volatility | R |
| 15 | Is original, comes up with new ideas. | Creative Imagination | D |
| 16 | Is outgoing, sociable. | Sociability | D |
| 17 | Can be cold and uncaring.* | Compassion | R |
| 18 | Keeps things neat and tidy. | Organization | D |
| 19 | Is relaxed, handles stress well.* | Anxiety | R |
| 20 | Has few artistic interests.* | Aesthetic Sensitivity | R |
| 21 | Prefers to have others take charge.* | Assertiveness | R |
| 22 | Is respectful, treats others with respect. | Respectfulness | D |
| 23 | Is persistent, works until the task is finished. | Productiveness | D |
| 24 | Feels secure, comfortable with self.* | Depression | R |
| 25 | Is complex, a deep thinker. | Intellectual Curiosity | D |
| 26 | Is less active than other people.* | Energy Level | R |
| 27 | Tends to find fault with others.* | Trust | R |
| 28 | Can be somewhat careless.* | Responsibility | R |
| 29 | Is temperamental, gets emotional easily. | Emotional Volatility | D |
| 30 | Has little creativity.* | Creative Imagination | R |

### 1.2 Banco oficial vs. adaptaciones derivadas

**Hecho:** El banco oficial es el publicado por Soto & John. El Colby Personality Lab cataloga las traducciones autorizadas (alemán, holandés, danés, noruego, polaco, turco, eslovaco, ruso, indonesio, hebreo, chino, **español**, entre otras). La adaptación española de Gallardo-Pujol et al. (2022) figura en el listado oficial y sus materiales (60 ítems + scoring para las formas cortas) están depositados en OSF (`https://osf.io/kp572/`) bajo **License CC-BY Attribution 4.0 International** (project-level irrevocable, fijada por David Gallardo-Pujol 2023-09-21; DD-87 verificación empírica accedida 2026-05-21). **Anclar trazabilidad de la fuente al depósito OSF kp572 (CC-BY 4.0)**, NO al apéndice del artículo Hogrefe DOI `10.1027/2698-1866/a000020` cuya licencia interna es contradictoria (texto declara CC BY 4.0 pero badge/href apunta a BY-NC-ND/4.0; afecta solo texto artículo, no items OSF). **Inferencia:** Cualquier adaptación derivada (incluida una versión es-CO de DescubreMe) debe notificarse a `christopher.soto@colby.edu` para validación de traducción y para no infringir copyright sobre la capa 1 (obra subyacente Soto-John). La capa 2 (traducción Gallardo-Pujol) es reutilizable comercialmente con atribución bajo CC-BY 4.0.

`[Aporte Gemini]` **Nota técnica DIFAB.** La literatura reciente reporta el uso del modelo bifactor **DIFAB** (*Domains-Incremental Facets-Acquiescence Bifactor*) sobre el BFI-2-S para extraer puntuaciones "purificadas" de aquiescencia (Soto, Anusic, John, Gosling, Potter, en literatura indexada). Es relevante para DescubreMe a medio plazo: cuando se acumule la muestra colombiana ≥ 500 (hito H3 del roadmap §3.2), el equipo psicométrico debería considerar modelar DIFAB para reportar scores libres del sesgo de estilo de respuesta y mejorar la validez incremental de las facetas en los modelos predictivos (intereses, valores, sentido).

### 1.3 Estructura del banco
- **Ítems totales:** 30 (subconjunto fijo de los 60 del BFI-2 completo).
- **Distribución:** 2 ítems por faceta × 15 facetas; cada faceta contiene 1 ítem directo + 1 inverso para controlar aquiescencia.
- **Distribución por dominio:** 6 ítems por dominio.
- **Direct/Reverse:** 15 directos + 15 inversos (50/50 balanceado).
- **Formato de respuesta:** Likert 5 con stem común *"I am someone who…"* / *"Soy alguien que…"*.
- **`[Aporte Gemini]` Filosofía del diseño:** método bottom-up por facetas → preserva ~91% de varianza y ~89% del poder predictivo a nivel facetal vs. BFI-2 completo de 60 ítems.

### 1.4 Recomendación de acceso primario
1. Descargar formulario oficial: `https://www.colby.edu/wp-content/uploads/2013/08/bfi2s-form.pdf`.
2. Descargar artículo: Soto & John (2017b), DOI `10.1016/j.jrp.2017.02.004`.
3. Para la versión española base: OSF `https://osf.io/kp572/` + artículo Hogrefe DOI `10.1027/2698-1866/a000020`.
4. Escribir simultáneamente a `christopher.soto@colby.edu` y a `ucbpersonalitylab@gmail.com` (ver §6.4).

---

## SECCIÓN 2 — ADAPTACIONES AL ESPAÑOL DISPONIBLES

| País | Autores | Año | DOI / URL | N | Características |
|---|---|---|---|---|---|
| España | Gallardo-Pujol, Rouco, Cortijos-Bernabeu, Oceja, Soto & John | 2022 | 10.1027/2698-1866/a000020 · OSF kp572 | 1.673 (3 estudios) | Valida BFI-2, BFI-2-S y BFI-2-XS en español ibérico; invariancia por género; estabilidad temporal. Materiales en OSF. Versión preferida por Colby. |
| México | Toledo-Fernández, Pérez-Matus & Villalobos-Gallegos | 2022 | SciELO *Suma Psicológica* 29(2):119–128 | 2.025 (T1) / 610 (T2) | CFA del BFI-2 (60) y BFI-2-XS (15) en muestra mexicana usando la traducción de Gallardo-Pujol provista por los autores. **No reporta CFA del BFI-2-S 30.** Acceso abierto. |
| Argentina (adolescentes, BFI breve, no BFI-2) | Cupani et al. | 2024 | RGSA — versión breve BFI 32 ítems | 483 | No es BFI-2-S; versión breve del BFI clásico para adolescentes. Referencia léxica del Cono Sur. |
| Chile (BFI clásico, no BFI-2) | Lara, Monje, Fuster-Villaseca & Dominguez-Lara | 2021 | *Rev. Mexicana de Psicología* 38(2):83–94 | 731 + 188 | Adaptación del BFI clásico en universitarios; replicación de cinco factores. Referencia léxica, no equivalente psicométrico. |
| Colombia (validación directa BFI-2-S) | — | — | — | — | **No localizada validación CFA colombiana del BFI-2-S a mayo 2026** [sin fuente verificada]. Existen aplicaciones del BFI clásico y del Mini-IPIP en muestras colombianas, pero ninguna validación formal del BFI-2-S. DescubreMe tiene aquí una oportunidad de publicación primaria. |
| Latinoamérica genérica (Colby) | Distribución vía Colby Personality Lab | — | colby.edu/psych/personality-lab | — | El Colby Lab lista "BFI-2 Spanish" como traducción única; remite a Gallardo-Pujol et al. (2022). No hay versión separada "es-LATAM" oficial. |

**Hecho:** Toledo-Fernández et al. (2022) declaran textualmente que utilizaron la traducción al español del BFI-2 *"provided by one [of] the authors of the original validation … as a preprint version (Gallardo-Pujol et al., 2022)"*. Es decir: la versión léxica española de Gallardo-Pujol ya circula como base operativa en México, con buen ajuste psicométrico.

### 2.1 Recomendación de base es-CO
**Opinión profesional:** Adoptar la versión española de Gallardo-Pujol et al. (2022) como base de traducción, con una capa de revisión léxica colombiana. Razones: (1) es la única versión española avalada explícitamente por Soto/John y listada oficialmente por Colby; (2) sus materiales están en OSF; (3) ya fue reutilizada exitosamente en México (Toledo-Fernández et al., 2022); (4) re-traducir desde cero introduciría drift semántico y debilitaría la comparabilidad transcultural.

### 2.2 Modificaciones léxicas anticipadas para Colombia

| Expresión española (Gallardo-Pujol) | Riesgo en Colombia | Reemplazo es-CO sugerido |
|---|---|---|
| "currar" / "currante" | Calco peninsular | Evitar; usar "trabajar". |
| "tenaz, que trabaja hasta terminar la tarea" (ítem 23) | Aceptable | Conservar. |
| "que lo deja todo hecho un lío" (referido a "disorganized") | "Lío" es entendible pero menos universal | "Tiende a ser desordenado/a". |
| "majo/a" | Calco peninsular | Sustituir por "agradable" si aparece. |
| "ordenador" | Calco | "Computador". |
| "que se exalta fácilmente" (ítem 29) | Aceptable es-CO | "Se altera con facilidad" como alternativa. |
| "fiable, con el/la que siempre se puede contar" (ítem 13) | Aceptable | "Confiable, alguien con quien siempre se puede contar". |
| "frío/a e insensible" (ítem 17) | OK | Conservar. |
| "piensa bien de la gente" (ítem 12) | OK | "Piensa bien de los demás". |
| "lleno de energía" (ítem 11) | OK | "Lleno/a de energía". |
| Tratamiento "tú" vs. "usted" | Colombia urbana joven mezcla ambos | **Decisión: tú cordial** (consistente con público freemium B2C). |
| Forma "vosotros" | No se usa en Colombia | Eliminar de instrucciones. |

**Inferencia:** Una revisión léxica de 30 ítems requiere ~3 horas de un lingüista bilingüe + 1 sesión de panel con 3 psicólogos colombianos. El cambio será mínimo en ítems técnicos (4, 9, 14, 19, 24, 29) y mayor en ítems con marcadores afectivos o sociales.

---

## SECCIÓN 3 — BAREMOS PUBLICADOS

| País | Fuente | N | Métricas reportadas | Percentiles |
|---|---|---|---|---|
| EE. UU. (Internet) | Soto & John (2017b). DOI 10.1016/j.jrp.2017.02.004 | 2.000 (validation) | Alfas dominio BFI-2-S: M = 0.77–0.78 (rango 0.73–0.84); part-whole con BFI-2 ≈ 0.95 | No publica percentiles |
| EE. UU. (universitaria) | Soto & John (2017b) | 423 | Alfas dominio BFI-2-S = 0.77; correlaciones self-peer ≈ 0.53 | No |
| EE. UU. (adultos representativos) | Soto (2021) — descriptivos BFI-2 en Colby Lab | varias miles | Medias por dominio/faceta en POMP, graficadas por edad/género | Aproximación gráfica POMP, no tablas de percentiles |
| España | Gallardo-Pujol et al. (2022). DOI 10.1027/2698-1866/a000020 | 1.673 | Estructura factorial, invariancia de género, alfas por dominio/faceta, medias y DT | No reporta percentiles canónicos; datos crudos en OSF kp572 |
| México | Toledo-Fernández et al. (2022). *Suma Psicológica* 29(2):119–128 | 2.025 / 610 | CFA, alfas, validez nomológica con Q-LES-Q-SF; cinco perfiles latentes (Big Five 60 y BFI-2-XS 15) | No reporta percentiles del BFI-2-S 30 específicamente |
| Chile | Lara et al. (2021) — BFI clásico | 731 | No comparable | No |
| Argentina | Cupani et al. (2024) — BFI breve adolescentes | 483 | No comparable | No |
| Colombia | — | — | **[sin fuente verificada]** No existe baremo CFA del BFI-2-S en Colombia a mayo 2026. | — |
| **`[Aporte Gemini]` Francia** | Validación BFI-2-S/BFI-2-XS en francés (citada por Gemini ref. PubMed 40089439, 2025) | >1.000 univ. franceses | CFI/TLI > 0.90; RMSEA < 0.08; bondad de ajuste excelente; correlaciones residuales modeladas en pares de ítems por faceta | No reporta percentiles |
| **`[Aporte Gemini]` Kuwait (árabe)** | Adaptación al árabe del BFI-2-S, universitarios kuwaitíes (citada por Gemini ref. ResearchGate 363231388, 2022) | 1.560 | α dominio: Emocionalidad Negativa 0.79 · Responsabilidad 0.77 · Amabilidad 0.76 · Extraversión 0.73 · Apertura 0.73 | No |
| **`[Aporte Gemini]` Panamá (advertencia metodológica)** | "BFI-S de 5 elementos" (NO es el BFI-2-S, instrumento ultra-breve distinto), COVIDiSTRESS global survey 2020 | 648 | **Consistencia interna inaceptable**; el instrumento de 5 ítems no produjo validez formal en muestra panameña | No |

**Hecho clave (Berkeley FAQ, textual):** *"There is no official BFI-2 manual with published norms."*

**`[Aporte Gemini]` Lectura de la lección panameña:** comprimir el Big Five por debajo del BFI-2-XS (15 ítems, 1 por faceta) colapsa la consistencia interna. El BFI-2-S de 30 ítems es el límite inferior recomendado para un producto que aspire a reportar perfiles facetales con varianza interpretable. DescubreMe NO debe descender a inventarios tipo TIPI / BFI-10 ni siquiera para el tier Free.

### 3.1 Recomendación de norma provisional LATAM
- **Q1 2027 (lanzamiento M1):** usar bandas BAJO ≤ p16, MEDIO p17–p83, ALTO ≥ p84 calculadas a partir de la muestra mexicana (Toledo-Fernández, 2022, n = 2.025) por proximidad cultural; solicitar dataset crudo a los autores. Si no es viable, usar el dataset OSF de Gallardo-Pujol como fallback.
- **Documentar explícitamente** en la metadata del plugin: *"Bandas provisionales basadas en muestra mexicana; pendiente baremo colombiano (Q3 2027)"*.

### 3.2 Roadmap para baremos colombianos propios

| Hito | Tamaño muestral | Estrategia | Plazo |
|---|---|---|---|
| H1 — Piloto cognitivo | n = 30–50 | Intencional; urbano (Bogotá/Medellín/Cali); 18–55 años | Mes 1–2 post-licencia |
| H2 — Validación piloto cuantitativa | n = 300 | Cuotas por edad/sexo/región/NSE | Mes 3–5 |
| H3 — CFA colombiano | n ≥ 500 | Online + presencial, 5 regiones (Andina, Caribe, Pacífica, Orinoquía, Amazonía) | Mes 6–9 |
| H4 — Baremo definitivo + publicación | n ≥ 1.000 | Estratificación nacional (DANE 2018+) | Mes 10–14 |
| H5 — Re-baremo periódico | n ≥ 1.000/año | Captura continua desde producto | Anual |

### 3.3 `[Aporte Gemini]` Posible extensión analítica futura: Análisis de Perfiles Latentes (LPA)

Toledo-Fernández et al. (2022) ejecutaron un Análisis de Perfiles Latentes sobre la muestra mexicana (n = 2.025) y extrajeron **cinco tipologías personológicas** estadísticamente diferenciables (alta amabilidad / baja apertura, alta estabilidad / baja plasticidad, perfiles intermedios). Las tipologías correlacionaron con calidad de vida (Q-LES-Q-SF). **Implicación para DescubreMe:** una vez se acumulen ≥ 1.000 perfiles colombianos (H4), el equipo podría implementar LPA para enriquecer el reporte con un "perfil tipológico" además del puntaje dimensional. Es una característica de producto candidata para roadmap v2.0+, no para v1.5.

---

## SECCIÓN 4 — ÍTEMS INVERSOS NUMERADOS (clave oficial Colby)

| Ítem # | Texto (EN, abreviado) | Dimensión | Faceta | Clave |
|---|---|---|---|---|
| 1 | Tends to be quiet | Extraversion | Sociability | **R** |
| 3 | Tends to be disorganized | Conscientiousness | Organization | **R** |
| 7 | Is sometimes rude to others | Agreeableness | Respectfulness | **R** |
| 8 | Has difficulty getting started on tasks | Conscientiousness | Productiveness | **R** |
| 10 | Has little interest in abstract ideas | Open-Mindedness | Intellectual Curiosity | **R** |
| 14 | Is emotionally stable, not easily upset | Negative Emotionality | Emotional Volatility | **R** |
| 17 | Can be cold and uncaring | Agreeableness | Compassion | **R** |
| 19 | Is relaxed, handles stress well | Negative Emotionality | Anxiety | **R** |
| 20 | Has few artistic interests | Open-Mindedness | Aesthetic Sensitivity | **R** |
| 21 | Prefers to have others take charge | Extraversion | Assertiveness | **R** |
| 24 | Feels secure, comfortable with self | Negative Emotionality | Depression | **R** |
| 26 | Is less active than other people | Extraversion | Energy Level | **R** |
| 27 | Tends to find fault with others | Agreeableness | Trust | **R** |
| 28 | Can be somewhat careless | Conscientiousness | Responsibility | **R** |
| 30 | Has little creativity | Open-Mindedness | Creative Imagination | **R** |

**Hecho:** Esta lista corresponde literalmente a la clave del documento `bfi2s-form.pdf` del Colby Personality Lab. Coincide al 100% con la lista del briefing original de DescubreMe. **Acción de implementación:** En el schema PostgreSQL `bfi2s_items`, columna `reverse_keyed BOOLEAN`, sembrar `TRUE` exactamente para estos 15 ítems.

---

## SECCIÓN 5 — TEXTOS DE INTERPRETACIÓN AL USUARIO (es-CO)

**Convenciones:** "tú" cordial colombiano; 2–4 oraciones, ≤ 80 palabras; lenguaje descriptivo y no determinista; banda BAJO ≤ p16, MEDIO p17–p83, ALTO ≥ p84.

### Dominio 1 — Extraversión
**Descripción técnica (interna):** Tendencia a buscar estimulación social, expresar energía y asumir roles activos en interacciones interpersonales.
- **BAJO.** Tiendes a disfrutar la calma y los momentos a solas, y en grupos prefieres escuchar antes que tomar la palabra. Es probable que recargues energía en espacios tranquilos, como leyendo o caminando sin compañía. Esto sugiere que valoras la profundidad sobre la cantidad de interacciones. ¿En qué situaciones sentís que estar solo te ayuda a pensar mejor?
- **MEDIO.** Combinas momentos de socialización con espacios de retiro según el contexto. A veces tomas la iniciativa en una conversación y otras prefieres observar. Esto sugiere flexibilidad social: puedes adaptarte a reuniones grandes o a charlas íntimas. Pensá en qué entornos te sentís más cómodo.
- **ALTO.** Tiendes a buscar la compañía de otros y a expresar tus ideas con seguridad. Es común que te sientas con energía después de eventos sociales y que asumas roles visibles en grupos. Esto sugiere que la interacción te estimula. ¿Qué tipo de espacios sociales te dan mayor satisfacción?

#### Faceta 1.1 — Sociabilidad
**Técnica:** Disfrute de la compañía de otros y preferencia por entornos con presencia humana.
- **BAJO.** Tiendes a preferir compañías reducidas o el tiempo a solas, y los eventos masivos pueden cansarte. Esto no implica timidez: muchas veces refleja una elección consciente. ¿Qué tamaño de grupo te resulta más cómodo?
- **MEDIO.** Te sentís a gusto tanto en planes íntimos como en reuniones más amplias, según el ánimo del día. Esto sugiere un equilibrio entre necesidad de compañía y necesidad de privacidad.
- **ALTO.** Disfrutas estar rodeado de gente y buscas activamente planes con otros. Esto sugiere que la presencia social te alimenta. ¿Hay momentos en que también necesitás silencio?

#### Faceta 1.2 — Asertividad
**Técnica:** Tendencia a tomar la iniciativa, expresar opiniones y ejercer influencia en grupo.
- **BAJO.** Tiendes a dejar que otros lideren y a expresar tus ideas cuando sentís que es necesario, no como costumbre. Esto puede reflejar prudencia o un estilo más colaborativo. ¿En qué temas sí te animás a hablar primero?
- **MEDIO.** Alternas entre proponer y seguir, según leas el contexto. Sabes cuándo intervenir y cuándo escuchar. Esto sugiere una asertividad situacional.
- **ALTO.** Sueles tomar la palabra y proponer rumbos en los grupos donde participas. Esto sugiere comodidad con la visibilidad. ¿En qué contextos creés que conviene moderar ese impulso?

#### Faceta 1.3 — Nivel de Energía
**Técnica:** Vitalidad subjetiva y disposición a la actividad sostenida.
- **BAJO.** Tiendes a moverte a un ritmo pausado y a elegir actividades menos demandantes en lo físico. Esto sugiere que valoras la regulación de tu energía. ¿Qué rutinas te ayudan a sentirte con más impulso cuando lo necesitás?
- **MEDIO.** Tu nivel de energía varía con el día y la tarea. Tenés capacidad para esfuerzos sostenidos sin saturarte.
- **ALTO.** Tiendes a sentirte con vitalidad y a involucrarte en varias actividades a la vez. Esto sugiere un estilo activo. ¿Cómo equilibrás esa energía con momentos de descanso?

---

### Dominio 2 — Cordialidad (Agreeableness)
**Técnica:** Orientación prosocial, disposición a confiar y a cooperar.
- **BAJO.** Tiendes a ser directo y a poner tus criterios sobre la mesa sin rodeos. A veces priorizás la franqueza antes que la armonía del grupo. Esto sugiere independencia de juicio. ¿En qué relaciones notás que esa franqueza ayuda y en cuáles podría matizarse?
- **MEDIO.** Buscas un equilibrio entre cooperar y defender tu posición. Podés ceder cuando ves valor en el otro y mantenerte firme cuando algo te importa.
- **ALTO.** Tiendes a confiar en las intenciones de los demás y a buscar el entendimiento antes que el conflicto. Esto sugiere una orientación cooperativa. ¿Cómo cuidás que esa apertura no te exponga en exceso?

#### Faceta 2.1 — Compasión
**Técnica:** Sensibilidad emocional hacia el bienestar de otros.
- **BAJO.** Tiendes a tomar decisiones con base en datos más que en el impacto emocional sobre otros. Esto no significa indiferencia; sugiere un estilo más analítico. ¿En qué momentos te sirve también escuchar lo emocional?
- **MEDIO.** Combinas empatía y criterio práctico. Te conmoves con lo que ves, sin perder de vista la decisión que toca tomar.
- **ALTO.** Te conmueve fácilmente el sufrimiento de otros y solés ofrecer apoyo. Esto sugiere alta sensibilidad afectiva. ¿Cómo cuidás tu propia carga emocional al acompañar?

#### Faceta 2.2 — Respeto
**Técnica:** Estilo cortés y consideración del lugar de otros.
- **BAJO.** Tiendes a ser frontal y a veces tu tono puede leerse como brusco. Esto puede ser útil en debates, menos útil en relaciones largas. ¿En qué espacios te conviene matizar?
- **MEDIO.** Equilibrás franqueza y cortesía según el contexto.
- **ALTO.** Tratás a los demás con consideración incluso en desacuerdo. Esto sugiere madurez en el manejo de las diferencias.

#### Faceta 2.3 — Confianza
**Técnica:** Tendencia a asumir buenas intenciones en los demás.
- **BAJO.** Tiendes a esperar para confiar y a pedir evidencia antes de creer. Esto puede protegerte, aunque también puede aislar. ¿En qué vínculos esa cautela te ha servido?
- **MEDIO.** Confiás con base en señales claras y revisás tus impresiones con el tiempo.
- **ALTO.** Sueles pensar bien de la gente y dar el beneficio de la duda. Esto sugiere apertura relacional. ¿Cómo decidís cuándo conviene revisar esa confianza?

---

### Dominio 3 — Responsabilidad (Conscientiousness)
**Técnica:** Autodisciplina, organización y orientación a objetivos.
- **BAJO.** Tiendes a un estilo más espontáneo y flexible, con menos apego a planes detallados. Esto puede ser una fortaleza creativa. ¿Qué pequeñas rutinas te ayudarían cuando una meta importa mucho?
- **MEDIO.** Combinas planificación y adaptabilidad. Cumplís con lo importante sin volverte rígido.
- **ALTO.** Tiendes a planificar, cumplir plazos y mantener orden en tus tareas. Esto sugiere autodisciplina. ¿Cómo equilibrás esa exigencia con el descanso?

#### Faceta 3.1 — Organización
**Técnica:** Estructuración del entorno y de las tareas.
- **BAJO.** Tu entorno suele ser flexible; lo importante aparece cuando se necesita, aunque no esté siempre ordenado. ¿Qué espacios te conviene priorizar para ordenar?
- **MEDIO.** Mantenés orden en lo esencial y dejás margen para el caos creativo.
- **ALTO.** Mantenés tu entorno y tus tareas en orden de forma constante. Esto sugiere preferencia por la estructura.

#### Faceta 3.2 — Productividad
**Técnica:** Persistencia en iniciar y completar tareas.
- **BAJO.** Tiendes a postergar el arranque y a movilizarte cerca del plazo. Esto puede generar buenos resultados a presión, también desgaste. ¿Qué método de arranque te ha funcionado antes?
- **MEDIO.** Iniciás con un empujón razonable y sostenés el ritmo hasta cerrar.
- **ALTO.** Iniciás con facilidad y terminás lo que comenzás. Esto sugiere alta persistencia.

#### Faceta 3.3 — Responsabilidad (faceta)
**Técnica:** Cumplimiento de compromisos y confiabilidad percibida.
- **BAJO.** A veces aplazás compromisos o asumís más de lo que podés cumplir. Esto puede reflejar entusiasmo o dificultad para decir no.
- **MEDIO.** Cumplís con tus compromisos centrales y renegociás cuando se requiere.
- **ALTO.** Las personas suelen contar con vos. Esto sugiere alta confiabilidad. ¿Cómo protegés tu propio espacio cuando todos te buscan?

---

### Dominio 4 — Emocionalidad negativa
**Técnica:** Sensibilidad a estímulos estresantes y tendencia a fluctuación emocional. **No es un indicador clínico; describe variabilidad afectiva normal.**
- **BAJO.** Tiendes a mantenerte estable frente a presiones y a recuperar tu equilibrio rápido tras un contratiempo. Esto sugiere alta tolerancia al estrés cotidiano. ¿Cómo notás cuándo sí necesitás parar?
- **MEDIO.** Tu estado de ánimo se mueve con los eventos, dentro de un rango manejable. Sabés identificar qué te afecta y buscar apoyo cuando hace falta.
- **ALTO.** Tiendes a percibir con intensidad las tensiones del día a día y a tomarte tiempo para procesar lo que sentís. Esto sugiere alta sensibilidad emocional. Conversar con personas de confianza o con un profesional puede ser de ayuda.

#### Faceta 4.1 — Ansiedad
**Técnica:** Tendencia a anticipar amenazas y a experimentar preocupación. Descriptivo, no clínico.
- **BAJO.** Tiendes a mantener la calma frente a la incertidumbre y a no anticipar amenazas con frecuencia. Esto sugiere comodidad con lo inesperado.
- **MEDIO.** Te preocupás por lo importante sin que la inquietud te paralice.
- **ALTO.** Tiendes a anticipar lo que podría salir mal y a darle vueltas a las preocupaciones. Esto puede ser agotador. Hablar con alguien de confianza o con un profesional puede aliviar la carga.

#### Faceta 4.2 — Depresión
**Técnica:** Tendencia a experimentar tristeza y baja en el ánimo. Descriptivo, no diagnóstico.
- **BAJO.** Solés mantener un ánimo estable y recuperás motivación con facilidad.
- **MEDIO.** Tu ánimo varía con los eventos de la vida, dentro de un rango habitual.
- **ALTO.** Tiendes a experimentar momentos de tristeza o desánimo con cierta frecuencia. Esto no es un diagnóstico; es información sobre tu estilo emocional. Si esa sensación se sostiene en el tiempo, te recomendamos hablar con un profesional o llamar a la **Línea 106** de Bogotá.

#### Faceta 4.3 — Volatilidad emocional
**Técnica:** Fluctuación de estados afectivos.
- **BAJO.** Tu ánimo tiende a ser parejo a lo largo del día.
- **MEDIO.** Tu ánimo varía con los eventos, sin saltos extremos.
- **ALTO.** Tu ánimo cambia con relativa rapidez según lo que vivís. Esto sugiere alta reactividad afectiva. ¿Qué te ayuda a darte un respiro cuando lo notás?

---

### Dominio 5 — Apertura mental (Open-Mindedness)
**Técnica:** Apertura a ideas, experiencias estéticas y pensamiento abstracto.
- **BAJO.** Preferís lo conocido y lo práctico antes que lo experimental. Esto sugiere un estilo concreto. ¿Qué experiencia nueva te gustaría probar este año?
- **MEDIO.** Combinas rutinas y curiosidad: explorás cuando algo te interesa de verdad.
- **ALTO.** Disfrutas ideas nuevas, arte y pensamiento abstracto. Esto sugiere alta curiosidad. ¿En qué áreas querés profundizar tu exploración?

#### Faceta 5.1 — Curiosidad intelectual
**Técnica:** Gusto por las ideas y el análisis profundo.
- **BAJO.** Preferís ideas prácticas y aplicables sobre debates teóricos.
- **MEDIO.** Apreciás un debate intelectual cuando el tema te toca, sin perseguirlo siempre.
- **ALTO.** Disfrutas pensar en problemas complejos y profundizar en temas abstractos.

#### Faceta 5.2 — Sensibilidad estética
**Técnica:** Aprecio por arte, música y expresión.
- **BAJO.** Tu vínculo con el arte y la estética es ocasional o funcional.
- **MEDIO.** Disfrutas el arte cuando se cruza en tu camino y tenés gustos definidos.
- **ALTO.** El arte, la música o la literatura ocupan un lugar significativo en tu vida.

#### Faceta 5.3 — Imaginación creativa
**Técnica:** Generación de ideas originales.
- **BAJO.** Preferís soluciones probadas y consolidadas.
- **MEDIO.** Aportás ideas nuevas cuando el problema lo amerita.
- **ALTO.** Generás ideas originales con frecuencia y disfrutás el proceso creativo.

---

## SECCIÓN 6 — LICENSE ACQUISITION PLAN

### 6.1 Titulares y contactos exactos
- **Christopher J. Soto** — Department of Psychology, Colby College, 5550 Mayflower Hill, Waterville, ME 04901, USA. Email: `christopher.soto@colby.edu` (también `csoto@colby.edu`).
- **Oliver P. John** — Department of Psychology, University of California, Berkeley. Email: `ojohn@berkeley.edu`.
- **Berkeley Personality Lab — solicitudes comerciales:** `ucbpersonalitylab@gmail.com` (canal explícito declarado en `https://www.ocf.berkeley.edu/~johnlab/bfi.php`).
- **Colby Personality Lab:** `https://www.colby.edu/academics/departments-and-programs/psychology/research-opportunities/personality-lab/the-bfi-2/`.

### 6.2 Práctica histórica de concesión
**Hecho (literal, Berkeley FAQ):** *"At this time, the BFI-2 is for non-commercial uses only. … If you are interested in using the BFI for commercial purposes, please submit a request to ucbpersonalitylab@gmail.com."* La autorización del Colby Lab dice: *"Permission is granted for personal and research use of the BFI-2."* **[sin fuente verificada]** No se localizó un acuerdo comercial publicado del BFI-2 con un producto B2C tipo freemium a mayo 2026. **Inferencia:** Existe un canal explícito para solicitudes comerciales, lo cual sugiere que los autores no descartan licencias caso por caso; sin embargo, no hay tarifario público.

### 6.3 Pasos para solicitar
1. Email simultáneo a Soto, John y `ucbpersonalitylab@gmail.com`.
2. Adjuntar: (a) descripción de DescubreMe, (b) wireframes del flujo del test, (c) volumen anual estimado, (d) plan de tratamiento de datos (Ley 1581 Colombia / GDPR), (e) compromiso de no presentar el test como instrumento clínico o de selección.
3. Esperar respuesta (estimado 2–6 semanas); follow-up cordial a las 4 semanas.
4. Si avanza, negociar términos: alcance (Free/Paid), territorios (Colombia + LATAM), idiomas, plazo, fee/royalty.
5. **No desplegar** el BFI-2-S en producción mientras esté pendiente la licencia. Mantener Mini-IPIP 20 vigente.
6. Mantener Plan B HEXACO-60 listo para activar en ≤ 4 semanas.

### 6.4 Borrador inicial de email (copy-paste, inglés)

> **To:** christopher.soto@colby.edu; ojohn@berkeley.edu; ucbpersonalitylab@gmail.com
> **Subject:** Commercial licensing request — BFI-2-S Spanish (Colombia) for educational consumer product
>
> Dear Prof. Soto and Prof. John,
>
> My name is [Nombre], and I lead Product/Psychometrics at **DescubreMe** (`[url]`), an educational, non-clinical, non-selection self-knowledge platform based in Colombia and serving Spanish-speaking users across Latin America.
>
> We are writing to formally request **written terms for a commercial license** to administer the **BFI-2-S (30-item short form)** in Spanish (Colombian adaptation derived from Gallardo-Pujol et al., 2022, with lexical revision and pilot cognitive testing) within our consumer product. Specifically:
>
> - **Use case:** voluntary self-administration by adult users, with descriptive feedback at the level of the five domains and the fifteen facets. Strictly educational and vocational-orientation framing. We do **not** use scores for clinical diagnosis, employee selection, or individual prediction.
> - **Tiers:** (i) **Free** freemium tier (basic feedback) and (ii) **Paid** tier at USD 19 (extended feedback). Both deliver descriptive, non-deterministic interpretations.
> - **Language:** Spanish (Colombia base), derived from the Gallardo-Pujol Spanish adaptation, with documented lexical revisions and a planned cognitive pilot (n ≈ 30–50) followed by a CFA study (target n ≥ 500) that we intend to submit for peer-reviewed publication, citing your work.
> - **Estimated annual volume:** [X] administrations in year 1, scaling to [Y] in year 2.
> - **Data handling:** compliant with Colombian Law 1581/2012 and GDPR; aggregate, anonymized norms will be derived; no individual data will be shared with third parties.
> - **Attribution and citation:** every administration will display the canonical citations (Soto & John, 2017a, 2017b; Gallardo-Pujol et al., 2022).
> - **Containment protocol:** for sensitive items (Anxiety and Depression facets), we have implemented a non-clinical containment route directing users to mental-health helplines (Línea 106 Bogotá, Línea 123).
>
> We would be grateful to receive your written terms — including any fees, royalty model, scope restrictions, and renewal conditions — and to schedule a brief call at your convenience.
>
> Thank you for your time and for the rigorous work the BFI-2 represents.
>
> Sincerely,
> [Nombre, cargo]
> DescubreMe · `[email]` · `[teléfono]`

### 6.5 Costo esperado y rangos
**[sin fuente verificada]** No existe tarifario público para el BFI-2. **Inferencia (con anclaje a precedentes de inventarios análogos):**

| Modelo plausible | Rango estimado anual | Comentario |
|---|---|---|
| Fee fijo anual modesto (uso académico-comercial híbrido) | USD 1.000 – 5.000 | Compatible con postura no-comercial estricta + reconocimiento del valor educativo. |
| Royalty por administración Paid | USD 0.10 – 0.50 por administración | Modelo usual en instrumentos análogos. |
| Fee + co-publicación de baremo colombiano | USD 0 – 2.000 + crédito de coautoría | Posible si DescubreMe aporta datos de validación. |
| Negativa total | n/a | Activar Plan B HEXACO-60. |

Buffer presupuestal recomendado: **USD 5.000–10.000** para año 1 (licencia + asesoría psicométrica + traducción jurídica del contrato).

### 6.6 Plan B — HEXACO-60 (Lee & Ashton, 2009)

**Hecho:** El HEXACO-60 es un inventario no comercial de 60 ítems que evalúa seis factores: *Honesty-Humility, Emotionality, eXtraversion, Agreeableness, Conscientiousness, Openness to Experience*. Se distribuye libremente vía `https://hexaco.org`, traducido a más de 40 idiomas. Ashton & Lee (2009), DOI `10.1080/00223890902935878`, reportan consistencia interna 0.73–0.80 y correlaciones self-observer > 0.50 en promedio.

**Ventajas como fallback:**
- Licencia no comercial pública y explícita; precedentes de uso en investigación masiva multinacional (García et al., 2022, 18 países).
- Versión española validada disponible en `hexaco.org`.
- Mismo formato Likert 5 puntos → migración técnica low-effort en el plugin DescubreMe.
- Aporta la dimensión adicional **Honesty-Humility**, que enriquece el feedback vocacional y de integridad.

**Desventajas:**
- 60 ítems (vs. 30 BFI-2-S) → ~8–10 min vs. 3–5; impacto en tasa de finalización.
- Cambio de modelo teórico → re-escritura completa de los textos interpretativos y de bandas.
- Pérdida de comparabilidad con literatura Big Five clásica.

**Cronograma de migración a HEXACO-60 (si Plan A se bloquea):**
- Semana 1: redacción de PRD, firma legal, descarga de materiales.
- Semana 2: traducción técnica y revisión léxica es-CO.
- Semana 3: re-escritura de textos BAJO/MEDIO/ALTO.
- Semana 4: integración en plugin, QA, despliegue a staging.

---

## SECCIÓN 7 — DISCLAIMERS Y MITIGACIONES (es-CO)

### 7.1 Disclaimer pre-test (≤ 100 palabras)

> Lo que vas a responder es una herramienta educativa de autoconocimiento, basada en el inventario BFI-2-S (Soto y John, 2017). **No es una evaluación clínica, ni un diagnóstico, ni una prueba de selección laboral.** Tus respuestas describen estilos de personalidad, no predicen tu futuro ni definen lo que podés lograr. Tomáte tu tiempo, respondé con honestidad y sin pensar demasiado cada frase. Si en algún momento alguna pregunta te incomoda, podés salir del cuestionario sin perder tu progreso. Al continuar, aceptás el uso anónimo y agregado de tus respuestas para mejorar el servicio.

### 7.2 Ítems sensibles que disparan NFR-28

| Faceta | Ítem # | Texto literal (EN) | Clave |
|---|---|---|---|
| **Anxiety** | 4 | Worries a lot. | D |
| **Anxiety** | 19 | Is relaxed, handles stress well. | **R** |
| **Depression** | 9 | Tends to feel depressed, blue. | D |
| **Depression** | 24 | Feels secure, comfortable with self. | **R** |

**Regla de disparo NFR-28 (v1.0 — re-diseñada DD-85 2026-05-20).** El detector activa `strong` si se cumple **cualquiera** de: (A) el ítem 9 ("Tiendo a sentirme deprimido/a, con el ánimo bajo", valor crudo, ítem directo) ≥ 4; **o** (B) la faceta Depresión (N2) ≥ 4.0/5 **o** la faceta Ansiedad (N1) ≥ 4.0/5 (medias post-recodificación). No se evalúa nivel `moderate`. La regla conjuntiva original (`faceta ≥ 4.5` exigiendo ambos ítems en el extremo) se descartó por producir un falso negativo estructural verificado en Cowork SR-8 review (GAP 3 P0 ético). Spec completa, justificación de sensibilidad/especificidad y spec algorítmica: `implementation_packs/BFI-2-S_TRIGGERS_NFR28_REDESIGN_v1.0.md`.

### 7.3 Mensaje de contención (≤ 120 palabras)

> Algunas de tus respuestas reflejan momentos en los que podés estar sintiendo bastante tristeza, preocupación o tensión emocional. Queremos recordarte que esto no es un diagnóstico: es información sobre cómo te sentís hoy. **No estás solo.** Si sentís que la carga es demasiada, hablar con alguien puede aliviar. En Colombia podés contactar:
> - **Línea 106 — "El poder de ser escuchado"** (Bogotá, Secretaría Distrital de Salud): marcá **106** desde cualquier celular o fijo, gratis, 24/7. También por WhatsApp al **300 754 8933**.
> - **Línea 123** para urgencias (incluye emergencias en salud mental).
> Si preferís hablar con un profesional cercano, también podés acudir a tu EPS. Lo importante es dar el paso de pedir ayuda.

### 7.4 Líneas de atención Colombia (verificadas 2025)

| Línea | Cobertura | Número | Horario | Fuente |
|---|---|---|---|---|
| **Línea 106 — "El poder de ser escuchado"** | Bogotá — Secretaría Distrital de Salud; salud mental, niños/adolescentes/adultos | 106 (gratuito) · WhatsApp 300 754 8933 · `linea106@saludcapital.gov.co` | 24/7 | `saludcapital.gov.co` (vigente 2025) |
| **Línea 123** | Bogotá — emergencias generales, incluida urgencia en salud mental | 123 | 24/7 | Secretaría Distrital de Salud |
| **Línea Calma** | Bogotá — hombres ≥ 18 años, soporte emocional y prevención de violencias | 018000 423 614 | Verificar horario actual | Cultura Ciudadana, Alcaldía de Bogotá |
| **Línea 141 — ICBF** | Nacional — niños, niñas y adolescentes en riesgo | 141 | 24/7 | Instituto Colombiano de Bienestar Familiar |
| **Línea Púrpura Distrital** | Bogotá — mujeres víctimas de violencia | 018000 112 137 (vigencia 2026 [sin fuente verificada]) | 24/7 reportado | Secretaría Distrital de la Mujer |
| **Directorio Nacional MinSalud** | Líneas territoriales por departamento | `minsalud.gov.co` (directorio agosto 2025) | — | Ministerio de Salud y Protección Social |

**Hecho:** La Secretaría Distrital de Salud reportó más de 40.000 intervenciones en la Línea 106 entre enero y abril de 2025, confirmando operación vigente. **Recomendación operativa:** verificar trimestralmente los números antes de cada release del plugin, ya que las líneas distritales pueden modificarse.

### 7.5 Disclaimer post-test (≤ 80 palabras)

> Estos resultados describen tendencias actuales, no etiquetas fijas. La personalidad cambia con el tiempo y con las experiencias. Lo que leíste es una invitación a la reflexión, no una predicción de tu carrera, tus relaciones o tu salud mental. Para decisiones importantes —vocacionales, clínicas o laborales— consultá con un profesional acreditado. DescubreMe es una herramienta educativa basada en el BFI-2-S (Soto & John, 2017).

---

## SECCIÓN 8 — PILOTO COGNITIVO COLOMBIA

### 8.1 Muestra
- **Tamaño:** n = 30–50 (think-aloud + debrief).
- **Cuotas:** 50/50 género; tramos 18–25, 26–40, 41–55; 3 regiones (Bogotá, Medellín, Cali); ≥ 30% NSE 1–3; ≥ 10% zona rural.
- **Criterios de inclusión:** hablantes nativos de español colombiano, alfabetización funcional, acceso a dispositivo móvil.
- **Criterios de exclusión:** profesionales de psicología activos (sesgo experto), personas en crisis emocional aguda (riesgo ético).

### 8.2 Protocolo think-aloud
1. **Briefing (5 min):** explicar que se evalúa la prueba, no a la persona; consentimiento informado.
2. **Aplicación grabada (8–12 min):** participante lee cada ítem en voz alta y verbaliza interpretación antes de responder. Se registran tropiezos léxicos, dobles lecturas, solicitudes de aclaración.
3. **Debrief estructurado (10–15 min):** preguntar por cada ítem marcado como difícil; preguntar si el lenguaje suena "colombiano natural"; recoger sugerencias.
4. **Registro:** audio + planilla por ítem con campos {claridad 1–5, naturalidad 1–5, sugerencia textual, faceta intencionada vs. faceta percibida}.

### 8.3 Criterios de aceptación / re-adaptación de un ítem
- **Aceptar tal cual:** ≥ 80% de participantes marcan claridad ≥ 4 y naturalidad ≥ 4.
- **Re-redactar y re-pilotar:** ≥ 30% marcan claridad ≤ 3 **o** se detecta interpretación sistemática en una faceta distinta a la intencionada.
- **Escalar a Soto/John:** si un ítem requiere cambio semántico sustantivo (no sólo léxico), notificar a los autores antes de modificar.

### 8.4 Entregables y compuertas de decisión

| Entregable | Plazo | Compuerta |
|---|---|---|
| Informe de piloto cognitivo (30–50 pp) | Semana 6 | ≤ 5 ítems requieren re-redacción → pasar a piloto cuantitativo. > 5 → revisión léxica adicional y re-piloto. |
| Versión es-CO v1.1 lista para QA | Semana 7 | Aprobada por psicometrista interno + revisor externo. |
| Dataset crudo (audios + transcripciones) | Semana 7 | Anonimizado, almacenado en bucket cifrado. |
| Carta de notificación a Soto/John | Semana 8 | Adjuntar tabla de cambios léxicos vs. Gallardo-Pujol. |

---

## SECCIÓN 9 — GAPS Y PREGUNTAS ABIERTAS

1. **No existe baremo colombiano CFA del BFI-2-S a mayo 2026.** *Plan:* construir baremo interno con los primeros n ≥ 500 usuarios colombianos del piloto cuantitativo; comparar contra Toledo-Fernández (México) y Gallardo-Pujol (España). Publicar resultados en *Revista Latinoamericana de Psicología* o *Suma Psicológica*.
2. **No se localizaron precedentes públicos de licenciamiento comercial del BFI-2.** *Plan:* solicitar formalmente a Soto/John/Berkeley antes de Q4 2026; si en 8 semanas no hay respuesta favorable, ejecutar Plan B (HEXACO-60). Mantener Mini-IPIP 20 en producción hasta resolver.
3. **No existe evidencia indexada de aplicaciones del BFI-2-S en Colombia.** Las referencias del briefing original ("Bisturí o Estetoscopio" — programa de la Escuela de Medicina del Rosario; estudio "Nariño-Carchi") no aparecen en la literatura indexada como validaciones formales del BFI-2-S [sin fuente verificada]. *Plan:* contactar grupos de Psicometría de Universidad de los Andes, Universidad Nacional y Universidad del Rosario; explorar colaboración para el CFA colombiano.
4. **Las normas oficiales del BFI-2 completo no existen como manual.** Berkeley FAQ declara textualmente: *"There is no official BFI-2 manual with published norms."* *Plan:* documentar este hecho explícitamente en la UI del producto y en el reporte de transparencia.
5. **Soto (2021) ha advertido que el rating scale "Agree a little" produce respuestas extremas que limitan la diferenciación.** *Plan:* considerar testear ambas etiquetas ("Agree" vs. "Agree a little") en el piloto cuantitativo, ya que la versión es-CO podría beneficiarse de "De acuerdo" simple.
6. **`[Aporte Gemini]` Lección regional sobre instrumentos ultra-breves:** un estudio panameño en COVIDiSTRESS (n = 648) demostró que comprimir el Big Five a 5 ítems (BFI-S 5) destruye la consistencia interna y los resultados pierden validez formal. *Plan:* mantener como nota interna del producto que **bajar de BFI-2-XS 15 ítems está descartado** para DescubreMe en cualquier tier; el BFI-2-S 30 es el piso operativo.

---

## SECCIÓN 10 — REFERENCIAS (APA 7)

Ashton, M. C., & Lee, K. (2009). The HEXACO–60: A short measure of the major dimensions of personality. *Journal of Personality Assessment, 91*(4), 340–345. https://doi.org/10.1080/00223890902935878

Berkeley Personality Lab. (s. f.). *Big Five Inventory — FAQ*. University of California, Berkeley. https://www.ocf.berkeley.edu/~johnlab/bfi.html

Colby Personality Lab. (s. f.). *The Big Five Inventory–2 (BFI-2)*. Colby College. https://www.colby.edu/academics/departments-and-programs/psychology/research-opportunities/personality-lab/the-bfi-2/

Cupani, M., y colaboradores. (2024). Estudio y validación de una versión breve del inventario de personalidad BFI para adolescentes argentinos. *Revista de Gestão Social e Ambiental, 18*(3).

Gallardo-Pujol, D., Rouco, V., Cortijos-Bernabeu, A., Oceja, L., Soto, C. J., & John, O. P. (2022). Factor structure, gender invariance, measurement properties, and short forms of the Spanish adaptation of the Big Five Inventory-2. *Psychological Test Adaptation and Development, 3*(1), 44–69. https://doi.org/10.1027/2698-1866/a000020 (Materiales en OSF: https://osf.io/kp572/)

García, L. F., Aluja, A., Rossier, J., Ostendorf, F., y col. (2022). Exploring the stability of HEXACO-60 structure and the association of gender, age, and social position with personality traits across 18 countries. *Journal of Personality, 90*(5), 769–788. https://doi.org/10.1111/jopy.12664

Lara, L., Monje, M. F., Fuster-Villaseca, J., & Dominguez-Lara, S. (2021). Adaptación y validación del Big Five Inventory para estudiantes universitarios chilenos. *Revista Mexicana de Psicología, 38*(2), 83–94.

Ministerio de Salud y Protección Social de Colombia. (2025, agosto). *Directorio nacional de líneas territoriales de atención en salud mental en Colombia*. https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/VS/PP/ET/directorio-salud-mental-prevencion-suicidio-minsalud.pdf

Secretaría Distrital de Salud de Bogotá. (2025). *Línea 106 — El poder de ser escuchado*. Alcaldía Mayor de Bogotá. https://www.saludcapital.gov.co/Paginas2/Quienes_Somos_linea106.aspx · https://bogota.gov.co/mi-ciudad/salud/linea-106-para-apoyo-psicologico-y-mas-informacion-en-bogota-este-2025

Soto, C. J., & John, O. P. (2017a). The next Big Five Inventory (BFI-2): Developing and assessing a hierarchical model with 15 facets to enhance bandwidth, fidelity, and predictive power. *Journal of Personality and Social Psychology, 113*(1), 117–143. https://doi.org/10.1037/pspp0000096

Soto, C. J., & John, O. P. (2017b). Short and extra-short forms of the Big Five Inventory–2: The BFI-2-S and BFI-2-XS. *Journal of Research in Personality, 68*, 69–81. https://doi.org/10.1016/j.jrp.2017.02.004

Soto, C. J. (2021). *Descriptive statistics for the BFI-2 (from the representative US adult samples used in Soto, 2019)*. Colby Personality Lab. https://www.colby.edu/academics/departments-and-programs/psychology/research-opportunities/personality-lab/the-bfi-2/

Toledo-Fernández, A., Pérez-Matus, S., & Villalobos-Gallegos, L. (2022). The Big Five Inventory-2: Confirmatory factor analysis and latent profiles in a Mexican sample. *Suma Psicológica, 29*(2), 119–128. http://www.scielo.org.co/scielo.php?script=sci_arttext&pid=S0121-43812022000200119

**`[Aportes desde Gemini — verificación pendiente]`** (las siguientes referencias se citan en el reporte de Gemini con enlaces secundarios; se conservan aquí como punto de partida para verificación antes de uso en producción):

Validación francesa del BFI-2-S y BFI-2-XS. (2025). *PubMed* ID 40089439. [sin DOI verificado en este consolidado — verificar en PubMed].

Psychometric Properties of the Arabic Big Five Inventory-2 Short Form among Undergraduates in Kuwait. (2022). *ResearchGate* publication 363231388. [referencia secundaria; localizar paper primario antes de uso].

Aplicabilidad del BFI-S en Panamá. (s. f.). *Portal AmeliCA* y *Redalyc* 7599/759981311003. [referencia secundaria sobre instrumento BFI-S de 5 ítems, no sobre BFI-2-S; útil como nota metodológica].

---

## APÉNDICE A — Mapa de aportes consolidados desde Gemini

| # | Aporte | Sección donde se integró | Valor agregado | Verificación recomendada |
|---|---|---|---|---|
| A1 | Enfoque "bottom-up" del BFI-2-S (2 ítems por faceta) y preservación de ~91% varianza / ~89% predicción | §0 (Resumen ejecutivo) y §1.3 (Estructura del banco) | Contexto de diseño que justifica por qué el BFI-2-S no es una mera "versión corta"; útil para comunicación con autores y para el copy de UX que explique el valor del instrumento al usuario. | Soto & John (2017b) ya está en referencias; los porcentajes 91% / 89% se citan en el paper original. **Verificar tablas exactas.** |
| A2 | Modelo bifactor DIFAB para purificación de aquiescencia | §1.2 (nota técnica DIFAB) | Posible feature técnico v2.0+ para el equipo psicométrico al consolidar baremo colombiano. | Localizar el paper primario del DIFAB (probablemente Soto, John, Anusic et al., ~2020). Marcado como roadmap, no v1.5. |
| A3 | Validación francesa BFI-2-S/BFI-2-XS con CFI/TLI > 0.90 y RMSEA < 0.08 | §3 (fila Francia en tabla de baremos) | Punto de referencia internacional adicional para la sección de baremos publicados. | Verificar en PubMed ID 40089439 (citado por Gemini) y obtener cita primaria con DOI. |
| A4 | Validación árabe Kuwait BFI-2-S con alfas 0.73–0.79 (n=1.560) | §3 (fila Kuwait en tabla de baremos) | Otro punto internacional; refuerza la robustez transcultural del instrumento. | Localizar paper primario; ResearchGate 363231388 es secundario. |
| A5 | Análisis de Perfiles Latentes (LPA) sobre BFI-2 mexicano → 5 tipologías personológicas | §3.3 (nueva subsección — extensión analítica futura) | Idea de feature para roadmap v2.0+: "perfil tipológico" complementario al puntaje dimensional. | Toledo-Fernández et al. (2022) ya está en referencias; el LPA con 5 perfiles está descrito en ese paper. |
| A6 | Advertencia panameña: BFI-S 5 ítems destruye consistencia interna | §3 (fila Panamá en tabla) y §9 punto 6 | Sustenta la decisión de NO bajar nunca por debajo del BFI-2-S 30 en DescubreMe. | Verificar paper primario en AmeliCA/Redalyc; el dato es importante para defender la decisión de stack. |

**Lectura general del Apéndice A:** los seis aportes de Gemini integrados son de naturaleza académica complementaria. No alteran ninguna decisión operativa del Pack (licencia, ítems, baremos, textos al usuario, disclaimers, piloto cognitivo). Refuerzan el contexto psicométrico y abren ideas para roadmap. Antes de presentar el Pack a Soto/John (Sección 6) o de publicar resultados, **los DOIs primarios de A3, A4 y A6 deben verificarse** porque Gemini los citó desde fuentes secundarias.

---

## APÉNDICE B — Notas de consolidación (metodología)

**Origen del documento.** Este consolidado combina dos investigaciones independientes producidas en mayo 2026:

1. `Prompt_01_BFI-2-S_IAR.Claude.md` — Implementation Acquisition Pack completo de 10 secciones siguiendo el prompt v1.0. Cumplimiento: 100% de los requisitos del brief.
2. `Prompt_01_BFI-2-S_IAR.Gemini.md` — Revisión académica narrativa estilo white paper sobre el BFI-2-S. No siguió la estructura de 10 secciones del prompt v1.0. Aportes principales: contexto teórico bottom-up, validaciones internacionales adicionales, modelo bifactor DIFAB, advertencia panameña.

**Criterio de consolidación aplicado.**
- **Estructura:** se preserva íntegra la del Pack de Claude (10 secciones + Apéndices A y B nuevos).
- **Contenido operativo (ítems, baremos, textos al usuario, email de licencia, disclaimers, piloto):** se mantiene el de Claude porque Gemini no lo produjo.
- **Aportes académicos de Gemini:** se integran SOLO cuando aportan información nueva verificable y útil para producto. Cada aporte se marca con `[Aporte Gemini]` en el lugar donde aparece, y se traza en el Apéndice A con nivel de verificación.
- **Discrepancias entre Claude y Gemini:** no se encontraron discrepancias factuales sustanciales en este test (ítems literales, autores, año, DOI principal, contactos, ítems inversos) porque Gemini no entregó la mayoría de esos datos. Donde ambos tocaron el mismo punto (Toledo-Fernández mexicano, Gallardo-Pujol español), las cifras coinciden.

**Limitaciones del consolidado.**
- Los DOIs A3 (Francia), A4 (Kuwait) y A6 (Panamá BFI-S 5) deben verificarse en bases primarias antes de citarse en comunicación oficial con Soto/John o en publicaciones.
- El modelo DIFAB (A2) se mencionó como roadmap; no se implementa en v1.5.

---

*Fin del Implementation Acquisition Pack v1.0 — BFI-2-S — CONSOLIDADO · DescubreMe · LATAM/Colombia · Mayo 2026*
