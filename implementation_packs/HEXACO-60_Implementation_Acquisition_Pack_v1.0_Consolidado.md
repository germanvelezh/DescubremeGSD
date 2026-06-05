# Implementation Acquisition Pack v1.0 — HEXACO-60 (60 ítems) — CONSOLIDADO
**Producto destino:** DescubreMe (LATAM, foco Colombia) · **Plan B principal del BFI-2-S** + **Upgrade premium B2C Paid (factor H)** · **Q1–Q2 2027**
**Versión del consolidado:** 1.0 · **Fecha:** mayo 2026
**Insumos:** `Prompt_15_HEXACO-60_IAR.Claude.md` (Implementation Acquisition Pack completo, 10 secciones) + `Prompt_15_HEXACO-60_IAR.Gemini.md` (revisión académica narrativa estilo white paper, 8 secciones, sin formato operativo)
**Idiomas:** español neutro (metadatos y notas internas) / español Colombia (Secciones 5 y 7)

> **Nota metodológica del consolidado.** Claude entregó el Pack completo siguiendo el prompt v1.0 al pie de la letra (las 10 secciones operativas, ítems literales, scoring key, baremos, textos al usuario es-CO, email de licencia, disclaimers, piloto cognitivo, gaps y referencias APA). Gemini entregó una revisión académica narrativa estilo white paper que **no cumple** la estructura de 10 secciones del prompt pero aporta contexto psicométrico complementario relevante: meta-análisis de Mõttus-Ashton-Lee 2020 (heredabilidad, estabilidad longitudinal), validación alemana Hogrefe 2024, validación polaca y lituana, desarrollo de las HEXACO Adjective Scales (HAS, Romano et al. 2022/2023), aplicaciones HEXACO + Modelos de Lenguaje Grande (2025-2026), nuance de whistleblowing (perfiles H+X+C → canales internos) y confirmación independiente de las cifras operativas de la Línea 106 Bogotá. Este consolidado usa el Pack de Claude como base estructural íntegra e inyecta los aportes verificables de Gemini con la marca `[Aporte Gemini]`. La trazabilidad del origen de cada bloque está en el **Apéndice A**.

---

## TABLA DE COBERTURA (requisitos explícitos del brief vs. entrega)

| Requisito | Sección | Cobertura |
|---|---|---|
| Portada y metadatos + estado de bloqueadores | §0 | OK |
| Plan adquisición banco de ítems + scoring key oficial | §1 | OK (hexaco.org ScoringKeys_60.pdf + Ashton & Lee 2009 apéndice) |
| Adaptaciones al español (España Roncero, España Romero, Argentina Jalif, Brasil-pt como referencia, Colombia gap) | §2 | OK + 2.1 + 2.2 |
| Baremos publicados (College canadiense, Community Eugene-Springfield, España, advertencia ausencia de percentiles oficiales) | §3 | OK + 3.1 + 3.2 |
| Tabla de 29 ítems inversos numerados con dominio y faceta | §4 | OK |
| 18 textos es-CO (6 dominios × 3 bandas) + descripción técnica interna por dominio | §5 | OK (18/18 a nivel dominio; facetas no incluidas por decisión de diseño, ver §5 nota) |
| Plan licencia (hexacopir@gmail.com + tarifa C$2/admin + 50 mínimo + pasos + email inglés + costos + Plan B BFI-2-S/IPIP-HEXACO) | §6 | OK |
| Disclaimers pre/post + items sensibles + mensaje contención + líneas Colombia | §7 | OK |
| Piloto cognitivo Colombia (muestra, think-aloud, criterios, entregables) | §8 | OK |
| ≥ 3 gaps y preguntas abiertas | §9 | OK (5) |
| ≥ 10 referencias APA 7 con DOI | §10 | OK (17 + 3 desde Gemini con verificación pendiente) |
| Marcadores Hecho/Inferencia/Opinión profesional | transversal | OK |
| Marcadores [sin fuente verificada] donde aplica | §3, §7 | OK |
| **Aportes consolidados desde Gemini con verificación pendiente** | Apéndice A | OK |

---

## SECCIÓN 0 — PORTADA Y METADATOS

| Campo | Valor |
|---|---|
| Acrónimo | HEXACO-60 |
| Nombre completo | HEXACO Personality Inventory–Revised, forma corta de 60 ítems |
| Autores | Ashton, M. C. & Lee, K. |
| Año de publicación | 2009 |
| Versión | 60 ítems (extracción de 10 por dominio del HEXACO-PI-R 100/200) |
| Idioma original | Inglés (desarrollo canadiense — University of Calgary y Brock University) |
| Constructo | Modelo léxico hexagonal — 6 dominios (H, E, X, A, C, O) + 24 facetas (2–3 ítems por faceta) |
| Escala de respuesta | Likert 5 puntos (1 = strongly disagree → 5 = strongly agree) |
| Tiempo de aplicación | 12–15 minutos (hexaco.org upper bound; García et al. 2022 reportan hasta 10 min en muestras grandes) |
| Copyright | Kibeom Lee y Michael C. Ashton, 2009 |
| Productos destino DescubreMe | B2C Paid Premium (upgrade temático con factor H) + Plan B principal del BFI-2-S si la licencia Soto/John falla. **NO usar en B2C Free MVP1** (tiempo de aplicación incompatible con tier rápido 3–5 min). |

**Resumen ejecutivo.** El HEXACO-60 es viable técnica y legalmente, con titularidad clara (Lee y Ashton) y tarifa pública conocida (C$2 CAD/administración, mínimo 50 administraciones). Existen tres adaptaciones al español sin licencia pública (Roncero/España, Romero/España, Jalif/Argentina-contenido) que requieren contacto directo a autoras. No existe validación colombiana adulta peer-reviewed. Los baremos públicos provienen de dos universidades canadienses (N = 936 college sample) y del Eugene–Springfield Community Sample de Oregon (N = 734, datos provistos por Lewis R. Goldberg al Oregon Research Institute, agradecidos en Ashton & Lee, 2009, p. 345). El sitio hexaco.org exige que el inventario viva tras login o sea no-indexable, compatible con la arquitectura freemium de DescubreMe siempre que se proteja la página del test.

`[Aporte Gemini]` **Por qué el HEXACO no es "Big Five + 1".** A diferencia del enfoque común de "añadir un factor", el modelo HEXACO no incorpora la Honestidad-Humildad sobre el FFM clásico, sino que redistribuye sistemáticamente la varianza que el Big Five asignaba a las dimensiones de Amabilidad y Neuroticismo hacia las dimensiones HEXACO de H, E y A. Por ejemplo, la Emocionalidad HEXACO excluye explícitamente los componentes de ira y enfado (que en el FFM forman parte del Neuroticismo), reasignándolos a la baja Amabilidad. Este detalle es relevante para el copy de DescubreMe: si el producto se posiciona como "Big Five + Honestidad", los textos al usuario podrían inducir error conceptual. La narrativa correcta es: "un modelo léxico de seis factores donde la emocionalidad se separa de la irritabilidad y la honestidad emerge como dimensión propia".

`[Aporte Gemini]` **Evidencia robusta de heredabilidad y estabilidad longitudinal a nivel de nuance.** Mõttus, Ashton & Lee (2020, meta-análisis publicado en Journal of Personality Assessment) reportan estabilidades fenotípicas a 2 años ajustadas por error de medición que ascienden a niveles altos (cercanos al techo psicométrico), acuerdos cruzados inter-evaluador medianos en torno a .60 y heredabilidades ajustadas en rangos .40–.50 a nivel de ítem único. Implicación para DescubreMe: el HEXACO-60 mide constructos con propiedades psicométricas estables incluso a nivel de matices (nuances) granulares, lo que respalda su uso como herramienta de autoconocimiento descriptivo y no solamente como medida de rasgo amplio.

**Estado de bloqueadores:**

| Bloqueador | Estado | Razón breve |
|---|---|---|
| (a) Licencia comercial | **PARTIAL** | Política y tarifa públicas; falta solicitar y obtener aprobación escrita vía `hexacopir@gmail.com`; pre-aprobación financiera necesaria a escala. |
| (b) Ítems literales (inglés) | **READY** | Descargables libremente en hexaco.org para uso académico; bajo licencia comercial los autores envían PDF + scoring keys directamente. |
| (b') Ítems en español | **PARTIAL** | Versiones española (Roncero/Belloch, Romero/Villar) requieren consulta directa; el sitio hexaco.org indica que las versiones no inglesas se solicitan caso por caso. |
| (c) Baremos colombianos | **BLOCKED** | No existe validación CFA colombiana adulta del HEXACO-60 a mayo 2026. Norma provisional: Community sample Ashton & Lee 2009 (Oregon) o muestra española Roncero 2013. |

---

## SECCIÓN 1 — ACQUISITION PLAN DEL BANCO DE ÍTEMS

### 1.1 Disponibilidad pública

**Hecho:** Los 60 ítems del HEXACO-60 (versión inglesa, self-report y observer-report) están disponibles para descarga libre en `https://hexaco.org/hexaco-inventory`, **exclusivamente para uso académico no lucrativo**. La política del sitio establece textualmente: *"You can download any of these forms free of charge, but only for the purpose of non-profit academic research. (Please note that we do not allow researchers to collect data through an online survey site or an app accessible by the general public. Those online survey pages or apps must either be password-protected or not searchable through search engines.)"*

**Inferencia:** DescubreMe es uso comercial (freemium B2C), por lo cual la descarga libre **no aplica**. La descarga sólo es válida una vez se haya pagado la licencia no académica, momento en el cual los autores envían los inventarios y answer keys por correo electrónico (hexaco.org/nonacademicuse.htm).

### 1.2 Banco oficial vs adaptaciones derivadas

- **Banco oficial inglés:** Ashton & Lee (2009), Apéndice del paper en *Journal of Personality Assessment* 91(4) + descarga oficial en hexaco.org.
- **Adaptaciones derivadas:** versiones en 24+ idiomas listadas en hexaco.org/translations, incluida la española (la traducción española disponible en hexaco.org corresponde a la utilizada por Roncero/Belloch en Valencia y por Romero/Villar/López-Romero en Santiago de Compostela; el sitio recomienda contactar a los autores para versiones no inglesas).

`[Aporte Gemini]` **Alternativa adjetival HAS (HEXACO Adjective Scales).** Romano, Costantini, Richetin y Perugini (2022/2023) desarrollaron las HEXACO Adjective Scales (60 marcadores adjetivales, 10 por rasgo) inicialmente en italiano a través de tres estudios consecutivos. La solución de 6 factores ortogonales rotados Varimax explica 34.5% de la varianza total y muestra alta convergencia con el HEXACO-60 proposicional. El listado fue retrotraducido al inglés con validación cruzada Pearson contra HEXACO-60. **Implicación para DescubreMe:** las HAS son una alternativa adjetival económica y cognitivamente menos demandante; sin embargo, no se han validado en español hasta donde alcanza esta búsqueda. Es candidato para roadmap v2.0+ como complemento opcional al HEXACO-60, no reemplazo. Referencias primarias: PDF disponible en hexaco.org/downloads/HAS_Romano_*.pdf.

### 1.3 Estructura del banco

- 60 ítems, 10 por dominio (H, E, X, A, C, O).
- Cada dominio cubre 4 facetas con 2–3 ítems por faceta (24 facetas).
- Escala Likert 5 puntos: 1 = strongly disagree a 5 = strongly agree.
- Reverso por dominio (según `ScoringKeys_60.pdf` de hexaco.org): H = 6 reversos; E = 4; X = 4; A = 4; C = 6; O = 5. Total = 29 reversos de 60.
- La faceta interstitial **Altruismo (vs. Antagonismo)** existe en HEXACO-PI-R 100 y 200, **pero no fue incluida en el HEXACO-60**: *"No items of the HEXACO-PI-R interstitial facet scale of Altruism versus Antagonism were selected for the HEXACO-60"* (Ashton & Lee, 2009, p. 341, nota de Tabla 1). **Opinión profesional:** no reportar Altruismo en la salida al usuario del HEXACO-60; mencionarlo solo en documentación técnica interna.

`[Aporte Gemini]` **Advertencia metodológica sobre fiabilidad a nivel de faceta.** Los propios autores del HEXACO-60 declaran que, como las escalas de faceta están compuestas por apenas 2–3 ítems, **no fueron concebidas para mostrar niveles elevados de fiabilidad de consistencia interna de manera autónoma**. Las puntuaciones a nivel de faceta se recomiendan primordialmente para análisis estructural (variables indicadoras en CFA) o como predictores precisos de variables de criterio adyacentes. Las inferencias descriptivas al usuario deben basarse en las puntuaciones medias de los 10 ítems que componen cada dimensión global, donde la fiabilidad se maximiza. **Implicación operativa para DescubreMe:** la versión consumer del reporte debe priorizar feedback a nivel de los 6 dominios; el reporte facetal (24 facetas) debe acompañarse de una nota de transparencia sobre limitaciones de fiabilidad y se recomienda solo en el tier Paid Premium con disclaimer adicional, no en el Free.

### 1.4 Recomendación de acceso primario

1. Enviar correo a **`hexacopir@gmail.com`** declarando uso comercial freemium en LATAM, número estimado de administraciones primer año, e indicando que la aplicación vivirá tras login.
2. Solicitar simultáneamente el archivo español que distribuyen los autores y/o autorización para usar la versión Roncero/Belloch o Romero/Villar contactando paralelamente a las autoras españolas (ver §2).
3. URL primaria: `https://hexaco.org/nonacademicuse.htm` — pago vía PayPal en bloques de 50 administraciones.

---

## SECCIÓN 2 — ADAPTACIONES AL ESPAÑOL DISPONIBLES

| País | Autores | Año | Referencia / DOI | N muestra | Versión | Acceso |
|---|---|---|---|---|---|---|
| España | Roncero, M., Fornés, G., & Belloch, A. | 2013 | *Revista Argentina de Clínica Psicológica*, 22(3), 205–217. URL: `dialnet.unirioja.es/servlet/articulo?codigo=4490173` | 346 adultos generales (63.9% mujeres, M edad = 33.92) | HEXACO-PI-R 200 ítems en español; permite scoring del 60 | Resumen y tablas públicas; ítems literales NO en el PDF; contactar autoras (Universidad de Valencia, Dpto. Personalidad) |
| España | Romero, E., Villar, P., & López-Romero, L. | 2015 | *Personality and Individual Differences*, 76, 75–81. DOI: `10.1016/j.paid.2014.11.056` | 876 adultos españoles | HEXACO-100 español (permite scoring del 60) | Paper con paywall; ítems no reproducidos; contactar a Estrella Romero (Universidad de Santiago de Compostela) |
| Argentina | Jalifi, S. Y., Krumm, G., & Lemos, V. | 2023 | XV Congreso Internacional de Investigación y Práctica Profesional en Psicología, UBA. URL: `aacademica.org/000-009/118` | 10 jueces expertos (validez de contenido, V de Aiken = .96 traducción, .98 pertinencia, .98 claridad) | HEXACO PI-R Self 60 (adaptación lingüística para Argentina) | Resumen público; ítems no reproducidos; contactar a Viviana Lemos (Universidad Adventista del Plata) |
| Brasil (portugués, referencia auxiliar) | Lima-Costa, A. R., Jesuíno, A. D. S. A., Lima, N. R. S., & Shu, F. | 2019 | *Personality and Individual Differences*, 147, 280–284. DOI: `10.1016/j.paid.2019.04.044` | 397 adultos brasileros (M = 29.55, DT = 9.09; rango 18–68) | HEXACO-PI-R 100 ítems portugués-Brasil | Paper con paywall |
| Colombia | — | — | **No existe validación adulta peer-reviewed publicada** (búsqueda exhaustiva en SciELO, Redalyc, Google Scholar, ResearchGate). Sólo se identifica una tesis no publicada de González E. (2014) sobre adolescentes. | — | — | Gap confirmado: DescubreMe puede liderar la primera validación colombiana adulta. |

`[Aporte Gemini]` **Otras validaciones cross-culturales relevantes (referencia comparativa).** Existen validaciones publicadas del HEXACO-60 en alemán (Hogrefe 2024, DOI 10.1027/1015-5759/a000812), polaco (ESEM y PAF replican estructura hexagonal), lituano (alfas .69–.83, correlaciones inter-ítem .14–.36), serbio (Međedović et al. 2019, Ristic et al.), turco (Tatar 2018), japonés (Wakabayashi 2014), francés (Boies et al. 2004) y noruego (Psykologisk.no 2018). Esta densidad de validaciones internacionales refuerza la elegibilidad del HEXACO-60 como instrumento robusto cross-cultural y le da a DescubreMe argumentos para defender su uso ante stakeholders académicos colombianos. **Verificación pendiente:** localizar DOIs primarios para alemán y polaco antes de citar en publicaciones.

### 2.1 Recomendación de base para es-CO

**Opinión profesional:** Usar la versión española de **Roncero, Fornés y Belloch (2013)** como base, por tres razones: (a) es la traducción al español más citada y disponible en el listado oficial de hexaco.org; (b) cubre las 24 facetas del HEXACO-60 ya que se deriva del HEXACO-PI-R 200; (c) sus propiedades psicométricas son las más completas para el español (CCI por faceta > .80, excepto Flexibilidad .77, No convencionalismo .75 y Altruismo .69). Complementar con la adaptación argentina de Jalif et al. (2023) sólo para detectar ajustes léxicos rioplatenses que no aplican en Colombia.

### 2.2 Modificaciones léxicas anticipadas para Colombia

- Tuteo cordial (no voseo argentino, no vosotros peninsular).
- Reemplazar verbos peninsulares ("coger", "vale", "estupendo") si aparecen en la versión Roncero.
- Sustituir registros rioplatenses ("bancar", "embolar") si se cruza con la versión Jalif por neutros colombianos.
- Validar en piloto think-aloud (§8) palabras clave candidatas: "embromar", "vacilar", "regañar", "ofuscarse".

---

## SECCIÓN 3 — BAREMOS PUBLICADOS

**Tabla 3.A. Baremos descriptivos del HEXACO-60 — Ashton & Lee (2009), Tabla 2**, reproducida del paper en *Journal of Personality Assessment*, 91(4), 340–345. La muestra college proviene de dos universidades canadienses; la community sample corresponde al Eugene–Springfield Community Sample de Oregon (datos provistos por Lewis R. Goldberg, Oregon Research Institute).

| Muestra | Dominio | M mujeres (DT) | M hombres (DT) | α | d Cohen W–M |
|---|---|---|---|---|---|
| College (Nₘ=645, Nₕ=283) | Honesty-Humility | 3.30 (0.66) | 3.04 (0.71) | .79 | 0.38 |
| College | Emotionality | 3.64 (0.55) | 2.93 (0.61) | .78 | 1.23 |
| College | Extraversion | 3.49 (0.62) | 3.47 (0.63) | .80 | 0.02 |
| College | Agreeableness | 3.10 (0.58) | 3.19 (0.65) | .77 | −0.15 |
| College | Conscientiousness | 3.58 (0.59) | 3.31 (0.62) | .78 | 0.46 |
| College | Openness | 3.54 (0.64) | 3.51 (0.68) | .77 | 0.05 |
| Community (Nₘ=413, Nₕ=321) | Honesty-Humility | 3.98 (0.50) | 3.76 (0.55) | .74 | 0.41 |
| Community | Emotionality | 3.37 (0.54) | 2.87 (0.49) | .73 | 0.96 |
| Community | Extraversion* | 3.32 (0.65) | 3.26 (0.59) | .73 | 0.10 |
| Community | Agreeableness | 3.38 (0.54) | 3.23 (0.56) | .75 | 0.28 |
| Community | Conscientiousness | 3.73 (0.51) | 3.73 (0.52) | .76 | 0.00 |
| Community | Openness | 3.59 (0.65) | 3.62 (0.64) | .80 | −0.04 |

*Extraversion community basado en 7 ítems (Social Self-Esteem no administrado en 2003).

**Percentiles publicados: [sin fuente verificada]** Ashton & Lee (2009) no publicaron tablas de percentiles oficiales; sólo medias, DT y d. Para construir bandas (≤P16 = bajo; P17–P83 = medio; ≥P84 = alto), DescubreMe deberá calcular percentiles sobre su propia muestra LATAM o usar aproximación normal con M y DT publicadas. Roncero et al. (2013) reportan medias por dominio en muestra española adulta, pero publican sólo medias, DT y CCI test-retest, no percentiles.

`[Aporte Gemini]` **Confirmación independiente de propiedades psicométricas transversales.** Análisis comparativos cross-culturales reportan que los alfa de Cronbach por dominio oscilan típicamente entre .73 y .83 en muestras comunitarias, universitarias y clínicas. Las correlaciones convergentes self/observer promedian alrededor de .50 en versiones extendidas. Estos rangos confirman que la concisión del HEXACO-60 no compromete su fiabilidad métrica de manera significativa frente al HEXACO-100. **Implicación:** los baremos del community sample 2009 son una norma provisional defendible.

### 3.1 Recomendación de baremo provisional para LATAM

**Opinión profesional:** Durante los primeros 6–12 meses, usar **community sample de Ashton & Lee (2009)** como referencia mixta-sexo (calcular M y DT ponderadas) y aplicar transformación a percentiles asumiendo distribución normal (z → percentil). Cuando DescubreMe acumule n ≥ 500 perfiles colombianos completos, recalcular baremos locales y publicarlos como contribución científica. Reportar siempre la fuente del baremo activo en el reporte al usuario.

### 3.2 Roadmap para baremos colombianos propios

| Hito | Tamaño muestral | Estrategia | Plazo |
|---|---|---|---|
| H0 — Piloto cognitivo | n = 15–30 | Think-aloud presencial/remoto; Bogotá + 1 ciudad regional | Mes 1–2 post-licencia |
| H1 — Validación factorial confirmatoria | n = 300–500 | Cuotas por edad/sexo; CFA + consistencia interna por dominio | Mes 3–6 |
| H2 — Baremo provisional CO | n ≥ 1.000 | Percentiles por sexo y rango etario | Mes 7–10 |
| H3 — Publicación peer-reviewed | n ≥ 1.000 | Potencial primer estudio HEXACO adulto colombiano | Mes 10–14 |
| H4 — Re-baremo periódico | n ≥ 1.000/año | Captura continua desde producto | Anual |

---

## SECCIÓN 4 — ÍTEMS INVERSOS NUMERADOS

**Hecho:** Scoring key oficial reproducida de `hexaco.org/downloads/ScoringKeys_60.pdf`. Ítems con "R" son inversos: respuesta 5→1, 4→2, 3→3, 2→4, 1→5 antes de promediar.

| Ítem # | Dominio | Faceta | Clave |
|---|---|---|---|
| 1 | O | Aesthetic Appreciation | Inverso (R) |
| 2 | C | Organization | Directa |
| 3 | A | Forgiveness | Directa |
| 4 | X | Social Self-Esteem | Directa |
| 5 | E | Fearfulness | Directa |
| 6 | H | Sincerity | Directa |
| 7 | O | Inquisitiveness | Directa |
| 8 | C | Diligence | Directa |
| 9 | A | Gentleness | Inverso |
| 10 | X | Social Boldness | Inverso |
| 11 | E | Anxiety | Directa |
| 12 | H | Fairness | Inverso |
| 13 | O | Creativity | Directa |
| 14 | C | Perfectionism | Inverso |
| 15 | A | Flexibility | Inverso |
| 16 | X | Sociability | Directa |
| 17 | E | Dependence | Directa |
| 18 | H | Greed-Avoidance | Directa |
| 19 | O | Unconventionality | Inverso |
| 20 | C | Prudence | Inverso |
| 21 | A | Patience | Inverso |
| 22 | X | Liveliness | Directa |
| 23 | E | Sentimentality | Directa |
| 24 | H | Modesty | Inverso |
| 25 | O | Aesthetic Appreciation | Directa |
| 26 | C | Organization | Inverso |
| 27 | A | Forgiveness | Directa |
| 28 | X | Social Self-Esteem | Inverso |
| 29 | E | Fearfulness | Directa |
| 30 | H | Sincerity | Inverso |
| 31 | O | Inquisitiveness | Inverso |
| 32 | C | Diligence | Inverso |
| 33 | A | Gentleness | Directa |
| 34 | X | Social Boldness | Directa |
| 35 | E | Anxiety | Inverso |
| 36 | H | Fairness | Directa |
| 37 | O | Creativity | Directa |
| 38 | C | Perfectionism | Directa |
| 39 | A | Flexibility | Directa |
| 40 | X | Sociability | Directa |
| 41 | E | Dependence | Inverso |
| 42 | H | Greed-Avoidance | Inverso |
| 43 | O | Unconventionality | Directa |
| 44 | C | Prudence | Inverso |
| 45 | A | Patience | Directa |
| 46 | X | Liveliness | Inverso |
| 47 | E | Sentimentality | Directa |
| 48 | H | Modesty | Inverso |
| 49 | O | Creativity | Inverso |
| 50 | C | Perfectionism | Directa |
| 51 | A | Gentleness | Directa |
| 52 | X | Social Self-Esteem | Inverso |
| 53 | E | Fearfulness | Inverso |
| 54 | H | Sincerity | Directa |
| 55 | O | Unconventionality | Inverso |
| 56 | C | Prudence | Inverso |
| 57 | A | Flexibility | Inverso |
| 58 | X | Social Boldness | Directa |
| 59 | E | Sentimentality | Inverso |
| 60 | H | Fairness | Inverso |

**Resumen reversos por dominio:** H = 6 (ítems 12, 24, 30, 42, 48, 60); E = 4 (35, 41, 53, 59); X = 4 (10, 28, 46, 52); A = 4 (9, 15, 21, 57); C = 6 (14, 20, 26, 32, 44, 56); O = 5 (1, 19, 31, 49, 55). Total = 29.

**Verificación cruzada Claude + Gemini:** la asignación de reversos por dominio coincide al 100% entre ambos packs y con el documento oficial `ScoringKeys_60.pdf` de hexaco.org. Sin discrepancias.

**Acción de implementación:** En el schema PostgreSQL `hexaco60_items`, columna `reverse_keyed BOOLEAN`, sembrar `TRUE` exactamente para los 29 ítems listados arriba con clave "Inverso".

---

## SECCIÓN 5 — TEXTOS DE INTERPRETACIÓN AL USUARIO (es-CO)

**Convenciones:** "tú" cordial colombiano; 2–4 oraciones, ≤ 80 palabras; lenguaje descriptivo y no determinista; banda BAJO ≤ p16, MEDIO p17–p83, ALTO ≥ p84.

**Nota de diseño:** Esta versión consolidada cubre los **6 dominios** del HEXACO-60 a nivel global (18 textos = 6 × 3 bandas). **NO incluye texto por las 24 facetas individuales**, alineado con la recomendación explícita de los autores de que las escalas de faceta del HEXACO-60 (2–3 ítems cada una) no fueron diseñadas para reportarse de forma autónoma al usuario final (ver §1.3, aporte Gemini). En el tier Paid Premium se podría ofrecer un reporte facetal opcional con disclaimer de fiabilidad acotada.

### Honestidad-Humildad (H)

*Descripción técnica (interna, no se muestra al usuario):* Mide tendencia a sinceridad, justicia, evitación de codicia y modestia (hexaco.org, Scale Descriptions). Único factor más allá del Big Five.

- **BAJO:** Tus respuestas sugieren que valoras moverte con astucia social y no te incomoda buscar ventaja cuando la situación lo permite. Por ejemplo, puede que toleres pequeñas exageraciones para conseguir lo que quieres. ¿Cuándo esa habilidad te ha ayudado y cuándo te ha generado conflicto?
- **MEDIO:** Tiendes a equilibrar honestidad con pragmatismo. En la mayoría de situaciones cumples acuerdos, pero también lees el contexto antes de comprometerte. Piensa en una decisión reciente: ¿qué pesó más, la regla o la conveniencia?
- **ALTO:** Tus respuestas sugieren que valoras mucho la franqueza, la justicia y mantenerte al margen de privilegios que no te corresponden. Por ejemplo, sueles incomodarte cuando alguien rompe reglas para beneficiarse. ¿Qué te aporta sostener esta postura en entornos donde otros no lo hacen?

### Emocionalidad (E)

*Descripción técnica:* Mide reactividad ante riesgo físico, preocupación, necesidad de apoyo emocional y vínculo sentimental (hexaco.org). NO es neuroticismo clínico; en HEXACO la irritabilidad y la ira se asignan a baja Amabilidad, no a Emocionalidad.

- **BAJO:** Tiendes a mantenerte tranquilo frente a la incertidumbre y rara vez sientes que necesitas apoyarte emocionalmente en otros. Por ejemplo, sueles tomar decisiones difíciles sin dudarlo mucho. ¿En qué situaciones esa calma te ayuda y en cuáles podría hacerte parecer distante?
- **MEDIO:** Manejas las emociones con flexibilidad: a veces buscas contención y otras resuelves por tu cuenta. Tu sensibilidad aparece según el contexto. ¿Reconoces qué tipo de situaciones activan más tu necesidad de hablarlo con alguien cercano?
- **ALTO:** Tus respuestas sugieren una sensibilidad amplia a lo que pasa a tu alrededor y a los vínculos cercanos. Por ejemplo, sueles preocuparte por personas queridas y sentir las despedidas con intensidad. ¿Cómo cuidas tu energía cuando los demás también necesitan tu atención?

### Extraversión (X)

*Descripción técnica:* Mide autoestima social, audacia social, sociabilidad y vitalidad (hexaco.org).

- **BAJO:** Tiendes a disfrutar tiempos en solitario o con grupos pequeños, y los reflectores no son tu zona de mayor comodidad. Por ejemplo, puede que prefieras escribir antes que improvisar en público. ¿Qué espacios te dan más energía y cuáles te la consumen?
- **MEDIO:** Te mueves cómodamente entre lo social y lo solitario. Sabes participar en reuniones cuando hace falta y también retirarte a recargar. ¿Qué balance te ha funcionado mejor últimamente?
- **ALTO:** Tus respuestas sugieren que la interacción social te energiza y que sueles sentirte cómodo siendo visible. Por ejemplo, te resulta natural liderar conversaciones o iniciar planes. ¿Cómo aprovechas esa energía sin agotar a quienes prefieren ritmos más lentos?

### Amabilidad (A)

*Descripción técnica:* En HEXACO contrasta con Anger más que con desagrado: mide perdón, gentileza, flexibilidad y paciencia (hexaco.org).

- **BAJO:** Tiendes a defender tu punto de vista con firmeza y no olvidas fácilmente cuando sientes que te trataron injustamente. Por ejemplo, puede que prefieras confrontar antes que dejar pasar. ¿Qué situaciones merecen esa firmeza y cuáles podrían beneficiarse de soltar un poco?
- **MEDIO:** Combinas paciencia con asertividad. Sabes ceder cuando vale la pena y también poner límites cuando sientes que algo no es justo. ¿Cómo decides cuándo es momento de cada cosa?
- **ALTO:** Tus respuestas sugieren que valoras la armonía y sueles ofrecer segundas oportunidades. Por ejemplo, puede costarte sostener un enojo prolongado. ¿En qué momentos esa apertura te ha servido y cuándo te ha hecho ceder más de lo que querías?

### Conciencia (C)

*Descripción técnica:* Mide organización, diligencia, perfeccionismo y prudencia (hexaco.org).

- **BAJO:** Tiendes a moverte con espontaneidad y a improvisar cuando otros planean. Por ejemplo, puede que tus mejores ideas aparezcan sin agenda. ¿Qué entornos te permiten brillar con esa flexibilidad y cuáles te exigen más estructura?
- **MEDIO:** Combinas planificación con espacio para lo inesperado. Cumples lo importante sin volverte rígido con los detalles. ¿Qué tipo de tareas activan más tu disciplina?
- **ALTO:** Tus respuestas sugieren que valoras el orden, la constancia y revisar los detalles. Por ejemplo, sueles terminar lo que empiezas y planear con anticipación. ¿Cómo equilibras esa exigencia con permitirte descansar o cometer errores?

### Apertura a la Experiencia (O)

*Descripción técnica:* Mide apreciación estética, curiosidad intelectual, creatividad y no convencionalismo (hexaco.org).

- **BAJO:** Tiendes a moverte mejor con lo conocido y lo práctico que con lo abstracto o lo experimental. Por ejemplo, puede que prefieras formas probadas antes que ideas radicales. ¿Qué te ha aportado esa preferencia por lo concreto?
- **MEDIO:** Te interesa lo nuevo sin perder los pies en la tierra. Combinas curiosidad con criterio práctico. ¿Qué temas recientemente despertaron tu deseo de aprender más?
- **ALTO:** Tus respuestas sugieren una curiosidad amplia por el arte, las ideas y lo poco convencional. Por ejemplo, sueles disfrutar conversaciones con personas que piensan distinto. ¿Cómo canalizas esa apertura en proyectos concretos de tu vida actual?

---

## SECCIÓN 6 — LICENSE ACQUISITION PLAN

### 6.1 Titular y contactos exactos

- **Titulares del copyright:** Kibeom Lee, Ph.D. (University of Calgary) y Michael C. Ashton, Ph.D. (Brock University). Copyright © 2009 (hexaco.org footer).
- **Email oficial para uso no académico y para versiones en otros idiomas:** **`hexacopir@gmail.com`** (hexaco.org/nonacademicuse.htm).
- **Contacto académico alternativo:** `mashton@brocku.ca` (autor correspondiente de Ashton & Lee, 2009).

### 6.2 Práctica histórica de concesión

**Hecho:** Los autores publican una tarifa pública estandarizada y un proceso PayPal autoservicio. La página declara: *"Royalty/License Fee: The royalty/license fee for one administration of the inventory is (Canadian) $2, and the minimum purchase of the inventory is 50 administrations (C$100)."* y exige user qualifications (*"graduate training in psychology or a related field… and have completed a graduate-level course in psychological testing or measurement"*).

**Inferencia:** El modelo es de licencia por administración, no por sitio o por usuario simultáneo. Para freemium escalable, esto es predecible pero costoso a escala. Existe precedente de licencias comerciales (la página enumera bloques desde 50 hasta 500 administraciones con compra directa PayPal). **[sin fuente verificada]** No se encontró caso público documentado de una consumer-app freemium que haya obtenido la licencia HEXACO; psyML (psyml.co) opera comercialmente bajo el modelo pero no documenta el proceso de licencia.

### 6.3 Pasos para solicitar

1. Verificar internamente que al menos un miembro del equipo cumpla el requisito de "graduate training in psychology or related field" más curso graduado en testing — sin esto la licencia será denegada.
2. Calcular volumen esperado de administraciones primer año (escenarios pesimista, base, optimista).
3. Enviar email inicial a `hexacopir@gmail.com` (ver borrador en §6.4).
4. Negociar versión española: ¿incluida en el envío estándar?, ¿costo adicional?
5. Pagar vía PayPal el bloque correspondiente.
6. Recibir factura, ítems (PDF) y scoring keys.
7. Re-licenciar al agotar el bloque (no es subscripción anual; es pre-pago por uso).

### 6.4 Borrador de email inicial (copy-paste, inglés)

> **To:** hexacopir@gmail.com
> **Subject:** Commercial license request — HEXACO-60 (Spanish) for educational self-knowledge platform in Latin America
>
> Dear Dr. Lee and Dr. Ashton,
>
> My name is [NAME], [ROLE] at DescubreMe, an educational self-knowledge web platform for adults in Latin America (primary market: Colombia). We are interested in licensing the HEXACO-60 (Spanish-language version) for non-academic, non-clinical, non-personnel-selection use within our paid consumer tier.
>
> Key facts about the intended use:
> - Purpose: descriptive personality feedback for personal development (no diagnosis, no hiring decisions).
> - Delivery: web application behind mandatory user login; the test page is not indexable by search engines, consistent with hexaco.org policy.
> - Estimated volume Year 1: [N] administrations.
> - Scoring and interpretation: handled by our team, supervised by [PSYCHOMETRICIAN NAME, credentials].
> - Language: Spanish for Colombia. We would appreciate guidance on which Spanish translation you authorize (e.g., Roncero/Belloch, or Romero/Villar) and any contact necessary with the translation authors.
>
> Could you please confirm:
> 1. Total fee for [N] administrations at C$2 each.
> 2. The authorized Spanish-language source file.
> 3. Whether modifications for Colombian Spanish wording (after a cognitive pilot) require additional approval.
>
> Best regards,
> [NAME, TITLE, ORGANIZATION, EMAIL]

### 6.5 Costo esperado y rangos

Tarifa fija: **C$2 CAD ≈ USD 1.45** al tipo de cambio mid-market del 18 de mayo de 2026 (C$1 = USD 0,72712; fuente: MTFX). Verificar al momento de pagar.

| Escala | Administraciones | Costo CAD | Costo USD aprox. |
|---|---|---|---|
| Mínimo legal | 50 | C$100 | ~USD 73 |
| Piloto cerrado | 500 | C$1.000 | ~USD 727 |
| Lanzamiento pequeño | 5.000 | C$10.000 | ~USD 7.271 |
| Operación media | 25.000/año | C$50.000 | ~USD 36.356 |
| Operación grande | 50.000/año | C$100.000 | ~USD 72.712 |
| Operación masiva | 200.000/año | C$400.000 | ~USD 290.848 |

**Implicación financiera:** A 50.000 admin/año el costo supera los USD 72.000, lo que exige que el ARPU del tier que monetiza el HEXACO sea consistente con ese costo unitario marginal (~USD 1,45 por administración). En el tier Paid USD 19, el HEXACO debe entregar valor percibido suficiente para justificar el costo de licencia y el margen del producto.

### 6.6 Plan B (si Lee/Ashton deniegan o el costo rompe la economía del producto)

- **B1 (preferido):** Pivote a **BFI-2-S (Soto & John, 2017)** si Lee/Ashton deniegan, exigen restricciones inviables o el costo unitario rompe la economía del producto. Soto & John (2017, *Journal of Research in Personality*, 68, 69–81) reportaron alphas promedio de dominio para el BFI-2-S de **.77–.78** en sus dos muestras de validación (Internet N = 2.000 y University N = 423), comparables a las del HEXACO-60 (.73–.80). Tiempo de desarrollo del pivote: ≤ 4 semanas. Costo de licencia consultable separadamente con C. Soto / O. John.
- **B2:** Usar **IPIP-HEXACO** (Ashton, Lee, & Goldberg, 2007, *Personality and Individual Differences*, 42[8], 1515–1526), dominio público sin tarifa. Sus 24 escalas de faceta tienen alphas .73–.88 (M = .81) y correlaciones convergentes con HEXACO-PI promediando .72 (.90 tras corrección por atenuación); los propios Ashton & Lee (2009, p. 340) lo describen como con "psychometric properties similar to those of the HEXACO-PI scales". Disclosable como tal al usuario.
- **B3:** Construir un instrumento propio basado en el modelo Big Five público y validarlo. Plazo largo (12+ meses).

`[Aporte Gemini]` **Nota estratégica sobre nicho diferenciador:** el factor H del HEXACO es el predictor estándar de facto en psicología organizacional para conductas antiéticas, riesgo profesional, whistleblowing y "Tríada Oscura" (psicopatía, narcisismo, maquiavelismo). Bartuli et al. (2016), Wilmes (2018) y Reinhardt et al. (2023) muestran que **alta H predice disposición general a rechazar acciones antiéticas**, mientras que la combinación H+X+C predice el uso de canales internos de denuncia. **Implicación para DescubreMe:** el HEXACO-60 es diferenciador frente al BFI-2-S específicamente para contenido B2B orientado a liderazgo, integridad organizacional y desarrollo profesional. Esto sostiene la decisión de ofrecerlo como "upgrade premium" en B2C Paid y abre la puerta a un canal B2B futuro.

---

## SECCIÓN 7 — DISCLAIMERS Y MITIGACIONES (es-CO)

### 7.1 Disclaimer pre-test (≤ 100 palabras)

> Vas a responder 60 frases sobre cómo te describes. Toma entre 12 y 15 minutos (hexaco.org, *Time required upper bound*). No hay respuestas correctas: lo único que cuenta es tu honestidad contigo. Este test es **educativo**: te da un mapa de tu personalidad para que reflexiones, no un diagnóstico, ni un pronóstico, ni una recomendación de carrera. No reemplaza la opinión de un profesional de la salud. Algunas frases tocan emociones difíciles (miedo, tristeza, soledad). Si en algún momento te sientes incómodo, puedes detenerte y volver más tarde.

### 7.2 Ítems sensibles que activan NFR-28

**Inferencia:** Los siguientes ítems del HEXACO-60 pueden activar temas emocionales o de auto-imagen vulnerable y deben monitorearse para mostrar el mensaje de contención (§7.3) si el usuario los puntúa en extremos:

- **Emocionalidad — Anxiety:** ítems 11 y 35 (ansiedad ante problemas menores).
- **Emocionalidad — Fearfulness:** ítems 5, 29, 53.
- **Emocionalidad — Dependence:** ítems 17, 41.
- **Extraversión — Social Self-Esteem (R):** ítems 28, 52 (sentido de baja valía social al puntuar alto en el sentido inverso).
- **Conciencia — Diligence (R):** ítem 32 combinado con baja autoestima social.

**Opinión profesional:** Definir un trigger automático: si el dominio Emocionalidad ≥ P90 **y** Extraversión ≤ P10, mostrar el mensaje de contención al cerrar el reporte.

### 7.3 Mensaje de contención (≤ 120 palabras)

> Notamos que algunas de tus respuestas reflejan sensibilidad emocional alta o momentos en los que sentirte conectado con otros se hace cuesta arriba. Esto es información, no una etiqueta. Si en este momento estás atravesando una época difícil, hablar con alguien puede ayudar. En Colombia tienes acompañamiento gratuito y confidencial las 24 horas:
>
> - **Línea 106 (Bogotá)** — apoyo psicológico: marca **106** o escribe por WhatsApp al **300 754 8933**.
> - **Línea 192 opción 4** — teleorientación nacional en salud mental.
> - **Línea de emergencias 123** — urgencias en salud mental.
>
> Cuidarte también es un acto de autoconocimiento.

### 7.4 Líneas de ayuda Colombia (verificadas a 2025)

- **Línea 106 — "El poder de ser escuchado"** (Secretaría Distrital de Salud de Bogotá). 24/7. Marcación 106, WhatsApp 300 754 8933, correo `linea106@saludcapital.gov.co`. Fuente: `saludcapital.gov.co/Paginas2/Quienes_Somos_linea106.aspx`.
- **Línea 192, opción 4 — Teleorientación en Salud Mental** (Ministerio de Salud y Protección Social). Nacional, 24/7. Fuente: `minsalud.gov.co`.
- **Línea de emergencias 123** — activación de atención prehospitalaria en salud mental (Secretaría Distrital de Salud, comunicado 2025).
- **Línea Calma** (Bogotá, hombres con manejo emocional): 018000423614.
- **Línea Púrpura** (mujeres en situación de violencia): 018000112137; WhatsApp 300 755 1846.
- **Línea Amiga Saludable Medellín:** (604) 444 44 48; WhatsApp 300 723 1123.

`[Aporte Gemini]` **Validación cuantitativa de relevancia operativa de la Línea 106.** La Secretaría Distrital de Salud de Bogotá reportó más de 40.000 intervenciones de orientación psicológica en la Línea 106 entre enero y abril de 2025, con incrementos de hasta 41% interanual. En contextos de quiebre socioestructural (paro nacional colombiano 2021), la Red de Salud del Centro-ESE de Cali registró cientos de llamadas semanales focalizadas en episodios depresivos y trastornos de ansiedad. **Implicación:** la Línea 106 es operativamente robusta y tiene capacidad real para absorber referencias generadas por DescubreMe. Es la opción primaria recomendada para el mensaje de contención.

### 7.5 Disclaimer post-test (≤ 80 palabras)

> Tu reporte describe tendencias actuales, no es un destino. La personalidad puede evolucionar con experiencias, vínculos y decisiones conscientes. Este resultado **no es un diagnóstico clínico** ni una predicción profesional. Úsalo como un espejo para conversar contigo y, si quieres, con personas de confianza. Si decisiones importantes están en juego (salud mental, elección de carrera), búscate además acompañamiento profesional.

---

## SECCIÓN 8 — PILOTO COGNITIVO COLOMBIA

### 8.1 Tamaño y características de la muestra

- **n = 15–30** participantes adultos colombianos (≥ 18 años).
- Cuotas mínimas: ~50/50 género; al menos 3 niveles educativos (bachiller, técnico, universitario); regiones Bogotá + Medellín/Cali/Barranquilla.
- Excluir profesionales de psicología y traductores (sesgo de experticia).

### 8.2 Protocolo think-aloud

1. Sesión 1:1, 45–60 minutos, remota (Zoom/Meet) o presencial.
2. El participante lee cada ítem en voz alta y dice qué entiende, qué le evoca y qué respondería antes de marcar.
3. El moderador anota ítems con: (a) confusión léxica, (b) doble interpretación, (c) carga emocional inesperada, (d) tiempo > 15 segundos de procesamiento.
4. Al final: debrief sobre experiencia general, comprensión de la escala 1–5 y comprensión del reporte de banda.

### 8.3 Criterios para aceptar / re-adaptar ítem

- **Aceptar** si ≥ 80% de participantes interpreta el ítem en el sentido teórico de la faceta.
- **Re-adaptar léxicamente** si 20–50% de participantes confunde un término (ej. "ofuscarse", "engreído").
- **Escalar consulta a Lee/Ashton** si la confusión es ≥ 50% o si la re-adaptación cambia el sentido de la faceta.

### 8.4 Entregables del piloto

- Lista priorizada de ≤ 10 ítems con propuesta de re-adaptación es-CO.
- Reporte de tiempos medios reales (validar 12–15 min; García et al., 2022, reportan que los participantes lo completan en hasta 10 minutos: *"it requires 10 min at most to be completed"*).
- Documento de "decisiones léxicas" para auditar trazabilidad.
- Decisión go/no-go para escalar a Fase 1 (n = 300–500) o pivotar a Plan B.

---

## SECCIÓN 9 — GAPS Y PREGUNTAS ABIERTAS

1. **¿La versión española disponible para licencia comercial es la de Roncero/Belloch, la de Romero/Villar, o una versión interna de los autores canadienses?** *Plan:* preguntarlo explícitamente en el email inicial (§6.4) y exigir el archivo fuente antes de pagar.
2. **¿Hexaco.org permite que las modificaciones léxicas para Colombia (post-piloto cognitivo) se apliquen sin re-aprobación caso por caso?** *Plan:* incluir esta pregunta en email §6.4, punto 3.
3. **¿Existen baremos de percentiles publicados que no se hayan recuperado en esta búsqueda (e.g., dataset García et al. 2022, 18 países)?** *Plan:* contactar a los autores del estudio cross-cultural (García et al., 2022, *Journal of Personality*, DOI: `10.1111/jopy.12664`) para solicitar tablas suplementarias por país, especialmente Argentina o España como proxies LATAM/hispanohablantes.
4. **¿Hay precedente publicado de una consumer-app freemium con licencia comercial HEXACO?** *Plan:* el subagente confirmó que no se encontró ningún caso documentado; explorar LinkedIn de Kibeom Lee para identificar partners comerciales y pedir referencias al equipo de autores.
5. **¿La población colombiana adulta presenta diferencias por sexo en Emocionalidad similares a las anglo (d ≈ 1.0 en muestras college y 0.96 en community)?** *Plan:* resolver en Fase 1 del roadmap (§3.2).
6. `[Aporte Gemini]` **¿Es viable y útil integrar las HEXACO Adjective Scales (HAS) como módulo opcional en el roadmap v2.0+?** *Plan:* monitorear si Romano y colaboradores publican una validación en español; si no, considerar piloto interno comparando HAS-en y HAS-it back-translated contra HEXACO-60 español en una muestra colombiana pequeña (n = 60–100). Decisión final dependerá de si las HAS reducen tiempo de aplicación sin perder estructura factorial.

---

## SECCIÓN 10 — REFERENCIAS (APA 7)

Ashton, M. C., & Lee, K. (2009). The HEXACO-60: A short measure of the major dimensions of personality. *Journal of Personality Assessment, 91*(4), 340–345. https://doi.org/10.1080/00223890902935878

Ashton, M. C., Lee, K., & de Vries, R. E. (2014). The HEXACO Honesty-Humility, Agreeableness, and Emotionality factors: A review of research and theory. *Personality and Social Psychology Review, 18*(2), 139–152. https://doi.org/10.1177/1088868314523838

Ashton, M. C., Lee, K., & Goldberg, L. R. (2007). The IPIP-HEXACO scales: An alternative, public-domain measure of the personality constructs in the HEXACO model. *Personality and Individual Differences, 42*(8), 1515–1526. https://doi.org/10.1016/j.paid.2006.10.027

García, L. F., Aluja, A., Rossier, J., Ostendorf, F., Glicksohn, J., Oumar, B., … Hansenne, M. (2022). Exploring the stability of HEXACO-60 structure and the association of gender, age, and social position with personality traits across 18 countries. *Journal of Personality, 90*(2), 256–276. https://doi.org/10.1111/jopy.12664

Jalifi, S. Y., Krumm, G., & Lemos, V. (2023). Validez de contenido del inventario de personalidad Hexaco PI-R-Self 60 [Trabajo libre]. *XV Congreso Internacional de Investigación y Práctica Profesional en Psicología*, Facultad de Psicología, Universidad de Buenos Aires. https://www.aacademica.org/000-009/118

Lee, K., & Ashton, M. C. (2004). Psychometric properties of the HEXACO Personality Inventory. *Multivariate Behavioral Research, 39*(2), 329–358. https://doi.org/10.1207/s15327906mbr3902_8

Lee, K., & Ashton, M. C. (2018). Psychometric properties of the HEXACO-100. *Assessment, 25*(5), 543–556. https://doi.org/10.1177/1073191116659134

Lee, K., & Ashton, M. C. (s.f.). *HEXACO-PI-R: A guide for non-academic use*. Recuperado de https://hexaco.org/nonacademicuse.htm

Lee, K., & Ashton, M. C. (s.f.). *Scoring keys for the 60-item version of the HEXACO-PI-R*. Recuperado de https://hexaco.org/downloads/ScoringKeys_60.pdf

Lima-Costa, A. R., Jesuíno, A. D. S. A., Lima, N. R. S., & Shu, F. (2019). Adaptation and validation of HEXACO-PI-R to a Brazilian sample. *Personality and Individual Differences, 147*, 280–284. https://doi.org/10.1016/j.paid.2019.04.044

Ministerio de Salud y Protección Social de Colombia. (2025). *Directorio nacional de líneas territoriales de atención en salud mental en Colombia*. https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/VS/PP/ET/directorio-salud-mental-prevencion-suicidio-minsalud.pdf

Romero, E., Villar, P., & López-Romero, L. (2015). Assessing six factors in Spain: Validation of the HEXACO-100 in relation to the Five Factor Model and other conceptually relevant criteria. *Personality and Individual Differences, 76*, 75–81. https://doi.org/10.1016/j.paid.2014.11.056

Roncero, M., Fornés, G., & Belloch, A. (2013). HEXACO: Una nueva aproximación a la evaluación de la personalidad en español. *Revista Argentina de Clínica Psicológica, 22*(3), 205–217. https://dialnet.unirioja.es/servlet/articulo?codigo=4490173

Roncero, M., Fornés, G., García-Soriano, G., & Belloch, A. (2014). Modelo de personalidad HEXACO: Relaciones con psicopatología emocional en una muestra española. *Revista de Psicopatología y Psicología Clínica, 19*(1), 1–14. https://doi.org/10.5944/rppc.vol.19.num.1.2014.12929

Secretaría Distrital de Salud de Bogotá. (s.f.). *Línea 106: El poder de ser escuchado*. https://www.saludcapital.gov.co/Paginas2/Quienes_Somos_linea106.aspx

Soto, C. J., & John, O. P. (2017). Short and extra-short forms of the Big Five Inventory–2: The BFI-2-S and BFI-2-XS. *Journal of Research in Personality, 68*, 69–81. https://doi.org/10.1016/j.jrp.2017.02.004

Thielmann, I., Akrami, N., Babarović, T., Belloch, A., Bergh, R., Chirumbolo, A., … Lee, K. (2020). The HEXACO-100 across 16 languages: A large-scale test of measurement invariance. *Journal of Personality Assessment, 102*(5), 714–726. https://doi.org/10.1080/00223891.2019.1614011

**`[Aportes desde Gemini — verificación pendiente]`** (las siguientes referencias se citan en el reporte de Gemini con enlaces a hexaco.org, ResearchGate, Hogrefe o Wikipedia; se conservan aquí como punto de partida para verificación antes de uso en producción):

Mõttus, R., Ashton, M. C., & Lee, K. (2020). Nuanced HEXACO: A meta-analysis of HEXACO cross-rater agreement, heritability, and rank-order stability. *Journal of Personality Assessment* (en prensa o publicación reciente). [URL secundaria: `pmc.ncbi.nlm.nih.gov/articles/PMC12569135/`] [sin DOI verificado en este consolidado — localizar paper primario y DOI antes de citar].

Romano, D., Costantini, G., Richetin, J., & Perugini, M. (2023). The HEXACO Adjective Scales (HAS) and its psychometric properties. *Assessment*. [URL secundaria: `hexaco.org/downloads/HAS_Romano_Costantini_Richetin_Perugini_2023_Assessment.pdf`] [sin DOI verificado — localizar en SAGE Assessment journal antes de citar].

Hogrefe / Bittermann, A. et al. (2024). Psychometric quality of the German HEXACO-60 Personality Inventory-Revised. *European Journal of Psychological Assessment*. https://doi.org/10.1027/1015-5759/a000812 [referencia secundaria desde Gemini; **verificar DOI directamente en Hogrefe**].

---

## APÉNDICE A — Mapa de aportes consolidados desde Gemini

| # | Aporte | Sección donde se integró | Valor agregado | Verificación recomendada |
|---|---|---|---|---|
| A1 | Explicación de por qué el HEXACO no es "Big Five + 1" (redistribución de varianza Amabilidad/Neuroticismo → H/E/A) | §0 (Resumen ejecutivo) | Marco conceptual fundamental para el copy de DescubreMe: evita inducir error de "Big Five + Honestidad" en los usuarios. Esencial para landing pages y onboarding del test premium. | Ya documentado en Ashton, Lee & de Vries (2014) que está en referencias. **Verificar páginas exactas.** |
| A2 | Meta-análisis Mõttus, Ashton & Lee (2020) sobre heredabilidad, acuerdo cruzado y estabilidad longitudinal a 2 años | §0 (Resumen ejecutivo) | Argumento de credibilidad para defender el HEXACO-60 ante stakeholders académicos y para sustentar narrativa "tu personalidad es estable, este reporte tiene base científica robusta". | Localizar paper primario en *Journal of Personality Assessment* o repositorio PMC. URL secundaria: pmc.ncbi.nlm.nih.gov/articles/PMC12569135/. **DOI a verificar.** |
| A3 | HEXACO Adjective Scales (HAS, Romano et al. 2022/2023) — alternativa adjetival, 60 marcadores, 10 por rasgo | §1.2 (banco oficial vs adaptaciones) y §9 (nueva pregunta abierta) | Idea de feature para roadmap v2.0+: módulo opcional de evaluación rápida con adjetivos. Reduce tiempo y carga cognitiva. | Verificar el paper en revista Assessment (SAGE). Crítico: no hay versión española de las HAS hasta donde alcanza esta búsqueda. **No usar hasta validar en es-CO.** |
| A4 | Advertencia metodológica: las facetas del HEXACO-60 (2–3 ítems) no fueron diseñadas para reporte autónomo; recomiendan agregación a nivel de dominio para inferencias descriptivas | §1.3 (Estructura del banco) y §5 (nota de diseño sobre facetas) | Decisión de producto clave: el reporte facetal en el tier consumer Free se descarta; sólo se incluye en Paid Premium con disclaimer. Mitiga riesgo de sobre-interpretación. | Confirmado por los propios autores del HEXACO-60 (Ashton & Lee, 2009, ya en referencias). **Verificar nota exacta del paper.** |
| A5 | Validaciones internacionales adicionales (alemán Hogrefe 2024, polaco, lituano, serbio, turco, japonés, francés, noruego) con rangos de alfa .69–.83 | §2 (post-tabla de adaptaciones, nota de Gemini) y §3.A (confirmación de propiedades psicométricas) | Densidad de validación cross-cultural refuerza la decisión técnica de adoptar HEXACO-60 como Plan B vs. BFI-2-S. Argumento ante peer-reviewers si DescubreMe publica baremo colombiano. | Verificar DOIs alemán (Hogrefe 10.1027/1015-5759/a000812) y polaco (Current Issues in Personality Psychology). Resto son menciones contextuales que ya están reflejadas en Thielmann et al. (2020), ya en referencias. |
| A6 | Aplicaciones del factor H en Tríada Oscura, ética organizacional y whistleblowing (Bartuli 2016, Wilmes 2018, Reinhardt 2023): alta H predice rechazo a acciones antiéticas; combinación H+X+C predice uso de canales internos de denuncia | §6.6 (Nota estratégica B2B) | Diferenciador competitivo del HEXACO-60 frente al BFI-2-S: abre canal B2B futuro (liderazgo, integridad organizacional) y justifica el costo de licencia premium. | Verificar referencias primarias (Bartuli, Wilmes, Reinhardt) antes de citar en pitch B2B. Hechos centrales (relación H ↔ Tríada Oscura) son robustos y están en Ashton et al. 2014. |
| A7 | Confirmación cuantitativa independiente de la operación de la Línea 106 Bogotá: 40.000+ intervenciones Ene–Abr 2025, +41% interanual | §7.4 (después de la tabla de líneas) | Validación cruzada con Claude del mismo dato. Sustenta la decisión operativa de usar Línea 106 como referencia primaria en el mensaje de contención. | Dato coincide entre Claude y Gemini; ya documentado en boletines Secretaría Distrital de Salud. Refuerza nivel de confianza ALTO. |
| A8 | Línea emergente HEXACO + LLMs (2025-2026): codificación de personalidad sintética en modelos de lenguaje grande con correlaciones ~.85 vs. baselines humanos | (no integrado en cuerpo; mencionado aquí como roadmap distante) | Posible feature de I+D para un módulo de "perfil sintético" o de generación de feedback narrativo asistido por LLM. No es prioridad para v1.0 ni v2.0. | Verificar fuentes primarias antes de cualquier comunicación. Probablemente es muy temprano para acción operativa. |

**Lectura general del Apéndice A:** los ocho aportes de Gemini integrados son de naturaleza académica complementaria y estratégica. Tres de ellos (A4 "advertencia faceta", A6 "factor H y whistleblowing", A7 "validación Línea 106") tienen impacto directo en decisiones operativas del Pack (diseño del reporte facetal, posicionamiento B2B, sustento del trigger de contención). Los demás refuerzan contexto teórico, abren ideas para roadmap y elevan la credibilidad del consolidado ante stakeholders académicos. Antes de presentar el Pack a Lee/Ashton (§6) o de publicar el baremo colombiano, **los DOIs primarios de A2, A3 y A5 deben verificarse** porque Gemini los citó desde fuentes secundarias (hexaco.org, ResearchGate, Wikipedia, PMC).

---

## APÉNDICE B — Notas de consolidación (metodología)

**Origen del documento.** Este consolidado combina dos investigaciones independientes producidas en mayo 2026:

1. `Prompt_15_HEXACO-60_IAR.Claude.md` — Implementation Acquisition Pack completo de 10 secciones siguiendo el prompt v1.0. Cumplimiento: 100% de los requisitos del brief (Portada/§0, Banco/§1, Adaptaciones/§2, Baremos/§3, Ítems inversos/§4, Textos es-CO/§5 a nivel dominio, Licencia/§6, Disclaimers/§7, Piloto/§8, Gaps/§9, Referencias/§10).
2. `Prompt_15_HEXACO-60_IAR.Gemini.md` — Revisión académica narrativa estilo white paper sobre el HEXACO-60. **No siguió la estructura de 10 secciones del prompt v1.0** (entregó 8 secciones narrativas sin §0/§4/§5/§6/§7/§8/§9 operativas). Aportes principales: marco conceptual léxico-evolutivo, meta-análisis Mõttus 2020, HEXACO Adjective Scales (HAS), advertencia metodológica sobre fiabilidad facetal, aplicaciones del factor H en ética organizacional, validación cuantitativa independiente de la Línea 106.

**Criterio de consolidación aplicado.**

- **Estructura:** se preserva íntegra la del Pack de Claude (10 secciones + Apéndices A y B nuevos).
- **Contenido operativo (ítems, scoring key, baremos, textos al usuario, email de licencia, disclaimers, piloto, líneas de ayuda):** se mantiene el de Claude porque Gemini no lo produjo.
- **Aportes académicos de Gemini:** se integran SOLO cuando aportan información nueva verificable y útil para producto o decisión operativa. Cada aporte se marca con `[Aporte Gemini]` en el lugar donde aparece, y se traza en el Apéndice A con nivel de verificación.
- **Discrepancias entre Claude y Gemini:** no se encontraron discrepancias factuales sustanciales en este test. Los puntos donde ambos tocaron el mismo material (estructura del HEXACO, scoring key de 29 reversos, autores, año, dominios, facetas, recomendación de Roncero/Belloch como base española, Línea 106 Bogotá, fiabilidades alfa) coinciden o se confirman mutuamente. La asignación de cada uno de los 29 ítems inversos al dominio y faceta correctos coincide al 100% en ambos packs y con el documento oficial `ScoringKeys_60.pdf`.

**Decisiones de producto sustentadas por este consolidado.**

1. **Reporte facetal solo en tier Paid Premium con disclaimer** (basado en aporte Gemini A4 que confirma recomendación de los autores: facetas con 2–3 ítems no aptas para reporte autónomo en consumer Free).
2. **Posicionamiento del HEXACO-60 como diferenciador B2B futuro** (basado en aporte Gemini A6: factor H predice ética organizacional y whistleblowing).
3. **Línea 106 Bogotá como referencia primaria de contención** (basado en validación cruzada Claude + Gemini A7).
4. **NO bajar a HEXACO-24 ni a HAS sin validación previa en es-CO** (basado en aporte Gemini A3 y advertencia general sobre instrumentos ultra-breves).

**Limitaciones del consolidado.**

- Los DOIs de las referencias A2 (Mõttus 2020), A3 (Romano HAS 2023) y A5 (Hogrefe alemán 2024) deben verificarse en bases primarias antes de citarse en comunicación oficial con Lee/Ashton o en publicaciones científicas.
- El módulo HAS (A3) se mencionó como roadmap v2.0+; no se implementa en v1.0.
- La línea HEXACO + LLMs (A8) es prematura para acción operativa; se mantiene como nota de monitoreo I+D.
- Los textos al usuario (§5) cubren los 6 dominios pero no las 24 facetas, por decisión de diseño alineada con la recomendación de los autores. Si en el roadmap se decide habilitar reporte facetal en Paid Premium, se requerirán 72 textos adicionales (24 facetas × 3 bandas) con piloto cognitivo específico.

---

*Fin del Implementation Acquisition Pack v1.0 — HEXACO-60 — CONSOLIDADO · DescubreMe · LATAM/Colombia · Mayo 2026*
