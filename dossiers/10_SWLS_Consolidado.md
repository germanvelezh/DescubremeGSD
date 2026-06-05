# Dossier de Investigación Profunda v2.1 — Satisfaction with Life Scale (SWLS)

**Proyecto:** DescubreMe — plataforma freemium B2C de autoconocimiento profundo (LATAM, foco Colombia, no clínico, no selección de personal)
**Decisión que respalda:** Inclusión P2 (Alta) en Paid Track A y B2B Track B en v1.5 (Q1 2027) como complemento hedónico breve del Flourishing Scale y contraparte del Ryff PWB
**Fecha de cierre:** 10 de mayo de 2026
**Versión consolidada:** síntesis unificada de dossiers Claude y Gemini, datos divergentes verificados contra fuente primaria.

---

## SECCIÓN 0 — PORTADA Y RESUMEN EJECUTIVO

| Campo | Detalle |
|---|---|
| **Instrumento** | Satisfaction with Life Scale (SWLS) — Escala de Satisfacción con la Vida |
| **Autores originales** | Diener, E., Emmons, R. A., Larsen, R. J. y Griffin, S. |
| **Año / Idioma original** | 1985 / Inglés (Estados Unidos) |
| **Cita primaria** | Diener et al. (1985), *Journal of Personality Assessment*, 49(1), 71-75. https://doi.org/10.1207/s15327752jpa4901_13 |
| **Ítems / Tiempo** | 5 ítems / 1-2 minutos |
| **Formato** | Likert 7 puntos (1 = Totalmente en desacuerdo; 7 = Totalmente de acuerdo) con anclajes verbales en los 7 niveles |
| **Constructo** | Satisfacción vital cognitiva (componente cognitivo del bienestar subjetivo) |
| **Estructura factorial** | Unidimensional (un factor latente) |
| **Licencia** | Copyright Diener et al.; uso libre con atribución para investigación y profesionales sin cobro. Caveat de uso comercial documentado (ver §6). Riesgo legal: BAJO con caveat |
| **Adaptación ES recomendada** | Atienza, Pons, Balaguer y García-Merita (2000) en Likert 7 puntos, con calibración Colombia de Ruiz et al. (2019) |
| **Rol en stack DescubreMe** | Complemento hedónico breve a Flourishing Scale en Paid Track A (autoconocimiento avanzado) y B2B Track B (bienestar organizacional, NO selección) |

**Resumen ejecutivo (3-5 líneas).** El SWLS es el *gold standard* breve para medir satisfacción vital como juicio cognitivo global. Sus propiedades psicométricas son robustas a través de seis décadas de evidencia (α típico .79-.89; estructura unidimensional replicada; invarianza configural y métrica confirmada en 65 naciones según Swami et al., 2025, N = 56.968). Cuenta con tres validaciones colombianas independientes (Ruiz et al., 2019; Espejo et al., 2022; Vinaccia-Alpi et al., 2019; N total > 2.800) y, junto con su brevedad (~1 minuto) y costo cero de licencia, su inclusión es costo-eficiente. El artículo original ha superado las 47.000 citaciones a 2025, consolidándose como una de las medidas más utilizadas en psicología.

**Recomendación ejecutiva.** **INCLUIR** SWLS en Paid Track A y B2B Track B como complemento hedónico al Flourishing Scale (Diener et al., 2010), usando la traducción de Atienza et al. (2000) con calibración local (Ruiz et al., 2019). Implementar NFR-27/28 (ruta de contención si SWLS ≤ 9 sostenido). Pre-condiciones bloqueantes: (1) atribución prominente en producto y términos legales, (2) consulta legal sobre cláusula non-commercial vs. modelo freemium B2C antes del lanzamiento del Paid Track A, (3) piloto cognitivo n = 20-30 en Colombia para confirmar comprensión léxica.

---

## SECCIÓN 1 — CONSTRUCTO MEDIDO

### 1.1 Definición operacional

**Hecho:** El SWLS operacionaliza la **satisfacción vital cognitiva** (cognitive life satisfaction): un juicio global, consciente y evaluativo que el individuo realiza sobre la calidad de su vida en su conjunto, comparándola con un estándar autoseleccionado, no impuesto externamente (Diener et al., 1985; Pavot y Diener, 2008). En palabras de los autores originales: *"the judgment of how satisfied people are with their present state of affairs is based on a comparison with a standard which each individual sets for him or herself; it is not externally imposed"* (Diener et al., 1985, p. 71).

**Inferencia:** El postulado filosófico central del SWLS es que la satisfacción vital no está dictada por un conjunto predefinido y universal de logros objetivables (capital financiero, salud clínica, éxito profesional medible). Emerge únicamente de la congruencia o disonancia percibida entre las circunstancias de vida actuales del individuo y un estándar ideal autoimpuesto, forjado a lo largo de su historia vital. Al abstenerse de mencionar dominios específicos (empleo, finanzas, relaciones), el instrumento otorga al encuestado libertad para asignar el peso que considere pertinente a cada faceta de su existencia, lo que confiere ventaja transcultural sustantiva.

### 1.2 Modelo tripartito de bienestar subjetivo (Diener, 1984)

El bienestar subjetivo (SWB) se compone de tres componentes diferenciables empíricamente:

1. **Componente cognitivo** = Satisfacción con la vida (LS) → medido por SWLS.
2. **Componente afectivo positivo** (PA) → medido por PANAS-PA (Watson, Clark y Tellegen, 1988) o SPANE-P (Diener et al., 2010).
3. **Componente afectivo negativo** (NA) → medido por PANAS-NA o SPANE-N.

### 1.3 Distinciones críticas para el stack DescubreMe

| Constructo | Tradición | Instrumento principal | Lo que SWLS NO mide |
|---|---|---|---|
| Satisfacción vital cognitiva | Hedónica (Diener, 1984) | **SWLS** | — |
| Afecto (estado emocional) | Hedónica | PANAS / SPANE | SWLS no captura emociones momentáneas |
| Bienestar eudaimónico | Aristotélica/humanista (Ryff, 1989) | Ryff PWB Scales | SWLS no captura propósito, autonomía, crecimiento |
| Bienestar sintético (psicosocial) | Síntesis hedónico-eudaimónica (Diener et al., 2010) | Flourishing Scale | SWLS no incluye relaciones, competencia, optimismo |

**Inferencia:** El SWLS está deliberadamente acotado (Diener et al., 1985): no toca constructos relacionados como afecto positivo o soledad. Esta delimitación es virtud psicométrica, no defecto: permite triangular el SWB con instrumentos afectivos (PANAS) y eudaimónicos (Ryff/Flourishing) sin contaminar la medición.

### 1.4 Resiliencia frente a fluctuaciones temporales

**Hecho:** El juicio global puede estar ligeramente modulado por sesgos de memoria transitorios o por el estado de ánimo en el momento exacto de responder, pero la varianza atribuible a estos factores es modesta (Diener, Inglehart y Tay, 2013). El constructo central refleja un sedimento cognitivo estable, profundamente asociado a rasgos de personalidad y a condiciones estructurales prolongadas de la vida del sujeto. Una persona puede atravesar una jornada estresante y aun así reportar alta satisfacción si percibe que el sacrificio actual se alinea con sus estándares de largo plazo.

---

## SECCIÓN 2 — ESTRUCTURA DEL INSTRUMENTO

| Característica | Especificación |
|---|---|
| Número de ítems | 5 |
| Estructura factorial | Unidimensional (un factor latente, satisfacción global) |
| Formato de respuesta | Likert de 7 puntos: 1 = Totalmente en desacuerdo → 7 = Totalmente de acuerdo (anclajes verbales completos) |
| Dirección de los ítems | Todos redactados en dirección positiva (no requiere inversión) |
| Tiempo de aplicación | 60-120 segundos |
| Modo de aplicación | Autoaplicado (papel-lápiz, online, móvil) |
| Población | Adolescentes (≥13 años), adultos, adultos mayores |
| Score | Suma simple de los 5 ítems → rango 5-35 |

**Hecho — origen del banco de ítems.** La decisión de limitar la escala a cinco reactivos no fue arbitraria sino resultado de un análisis factorial sobre un banco original de 48 ítems experimentales diseñados para medir conjuntamente bienestar subjetivo y afectividad. Tras análisis de similitud semántica y componentes principales se aislaron 10 ítems que cargaban poderosa y exclusivamente en el factor de satisfacción global; éstos fueron reducidos a los 5 reactivos definitivos para minimizar fatiga y maximizar eficiencia analítica.

**Banco de ítems (descripción funcional, sin texto literal):** El instrumento contiene cinco enunciados afirmativos centrados en (a) cercanía de la vida actual al ideal personal, (b) excelencia de las condiciones de vida, (c) satisfacción global con la vida, (d) logro de las cosas importantes deseadas, y (e) ausencia de cambios deseados si pudiera revivir la vida. Los ítems 1-4 evalúan el presente; el ítem 5 introduce un componente retrospectivo y, consistentemente, presenta cargas factoriales menores que los demás (Pavot y Diener, 2008). El texto literal en español de Atienza et al. (2000) está disponible públicamente en eddiener.com y en las publicaciones de validación.

**Anti-alucinación de ítems.** Por buenas prácticas de copyright, este dossier no reproduce los enunciados literales. Para acceso al texto, contactar a la Diener Education Fund / eddiener.com o consultar Atienza et al. (2000).

**Variantes documentadas:**
- Versión 5 puntos para encuestas poblacionales (Kobau et al., 2010; usada por Espejo et al., 2022 en Colombia).
- Versión 6 puntos (Schnettler et al., 2017, Chile; replicaciones en México y Colombia).
- Versión abreviada de 3 ítems eliminando el ítem 5 (Kjell y Diener, 2021).
- Versión SWLS-C para niños (Gadermann, Schonert-Reichl y Zumbo, 2010).

**Decisión recomendada DescubreMe:** versión original de 5 ítems con Likert de 7 puntos (compatible con la mayor cantidad de baremos internacionales y con la validación colombiana más robusta, Ruiz et al., 2019). Aunque algunas adaptaciones comprimen la escala a 5 o 6 puntos para simplificar la interfaz cognitiva en poblaciones de bajo nivel educativo, el consenso psicométrico internacional favorece la retención estricta de los 7 puntos para preservar comparabilidad con datos normativos globales.

---

## SECCIÓN 3 — PROPIEDADES PSICOMÉTRICAS ORIGINALES

### 3.1 Confiabilidad

| Estudio | Muestra (N) | α de Cronbach | Test-retest |
|---|---|---|---|
| Diener et al. (1985) Estudio 1 | 176 estudiantes | .87 | r = .82 (2 meses) |
| Pavot y Diener (1993) revisión | múltiples | .79-.89 | .54 (4 años) - .84 (1 mes) |
| Pavot y Diener (2008) revisión | múltiples | mayoritariamente >.80 | estable bajo condiciones invariantes; sensible al cambio bajo eventos |

**Inferencia:** La convergencia de estabilidad sostenida a largo plazo (r ≈ .54 a 4 años) y suficiente sensibilidad al cambio en intervalos cortos (r ≈ .82 a 2 meses) confirma que la escala captura un rasgo cognitivo sedimentado pero capaz de responder gradualmente a transformaciones sustanciales en el ecosistema o la percepción interna del individuo. Aproximadamente el 50 % de la varianza es trait estable (Magnus, Diener, Fujita y Pavot, 1993, citados en Pavot y Diener, 1993).

### 3.2 Estructura factorial

- **Análisis factorial exploratorio (Diener et al., 1985):** un solo factor explica ≈66 % de la varianza.
- **Análisis factoriales confirmatorios:** modelo unifactorial con buen ajuste replicado en docenas de muestras (Pavot y Diener, 2008). Las cargas factoriales individuales son robustas y estadísticamente significativas (p < .001) en todos los estudios.
- En algunos modelos, el ajuste mejora marginalmente al permitir correlación entre los errores de los ítems 1-2 o 4-5 (Glaesmer, Grande, Braehler y Roth, 2011).
- El **ítem 5** (componente retrospectivo) tiene cargas factoriales sistemáticamente menores y exhibe **funcionamiento diferencial documentado** según los paradigmas filosóficos: en algunas culturas asiáticas, individuos con altos índices latentes de satisfacción vital reportan puntuaciones moderadas o bajas en este ítem por creencias sobre la importancia del aprendizaje derivado de errores pasados (Pavot y Diener, 2008). El reactivo se mantiene en la escala oficial para preservar invarianza configuracional histórica.

### 3.3 Validez convergente y discriminante

- **Correlaciones positivas** con afecto positivo (PANAS-PA), felicidad subjetiva, optimismo (LOT-R), autoestima, salud autopercibida, ingresos, apoyo social y Flourishing Scale (Pavot y Diener, 2008).
- En la muestra colombiana de Espejo et al. (2022): **SWLS-SPANE-P r = .603; SWLS-Flourishing r = .492; SWLS-LOT-R Optimismo r = .566** (todas p < .001).
- **Correlaciones negativas** con afecto negativo (PANAS-NA), depresión (CES-D, BDI), ansiedad y soledad (Pavot y Diener, 2008; Meule y Voderholzer, 2020). En contexto colombiano, el SWLS correlaciona inversamente con DASS-21 (depresión, ansiedad, estrés) y con marcadores de fusión cognitiva y evitación experiencial; correlaciona positivamente con el constructo de **vivir valorado** (Ruiz et al., 2019).
- **Validez discriminante:** correlaciones con afecto moderadas (≈.40-.60), no perfectas, sosteniendo el modelo tripartito de SWB (Busseri y Sadava, 2011).

### 3.4 Invarianza cross-cultural

- Whisman y Judd (2016): invarianza escalar parcial entre EE.UU., Reino Unido y Japón.
- Jang et al. (2017): invarianza configural y métrica robusta a través de 26 países.
- Esnaola, Benito, Antonio-Agirre, Freeman y Sarasa (2017): invarianza estricta entre España y México.
- Castellá Sarriera y colaboradores (2012, 2014): consistencia configural-métrica en muestras adolescentes de Brasil, Argentina, Chile, España y Portugal.
- **Swami et al. (2025), PLOS ONE, N = 56.968:** estudio cross-cultural más amplio hasta la fecha. Confirman invarianza configural y métrica a través de **65 naciones, 40 idiomas, identidades de género y grupos etarios**, sosteniendo la *"universal applicability"* del modelo unidimensional.

### 3.5 Muestras y huella académica

- Muestra original: N = 176 estudiantes universitarios (Diener et al., 1985).
- Expansiones representativas: España N = 2.964 (Vázquez, Duque y Hervás, 2013); Chile N = 1.500 (Schnettler et al., 2017); México N = 13.220 adultos 50+ (López-Ortega, Torres-Castro y Rosas-Carrasco, 2016); Colombia N = 1.587 (Ruiz et al., 2019) + N = 1.255 (Espejo et al., 2022).
- **El artículo original ha superado las 47.000 citaciones en Google Scholar a 2025**, tras superar las 30.000 en 2021, consolidándolo como una de las medidas más utilizadas en psicología.

### 3.6 Limitaciones psicométricas

- **Efecto techo en muestras no clínicas:** las medias suelen ubicarse en 23-28 ("ligeramente satisfecho" a "satisfecho"), reduciendo la sensibilidad para detectar mejoras en personas ya satisfechas (Pavot y Diener, 2008).
- **Sensibilidad al cambio:** estable bajo condiciones invariantes pero responde a eventos vitales mayores (Diener, Inglehart y Tay, 2013); no es medida de estado momentáneo.
- **Efectos de orden de pregunta y modo de administración:** la posición en el cuestionario y el estado de ánimo actual modulan ligeramente las respuestas (Diener et al., 2013).

---

## SECCIÓN 4 — ADAPTACIONES CULTURALES (LATAM E IBÉRICA)

| País | Estudio | N | α | DOI / URL |
|---|---|---|---|---|
| **España (adolescentes)** | Atienza, Pons, Balaguer y García-Merita (2000), *Psicothema*, 12(2), 314-319 | 697 | .84 | Sin DOI (revista pre-DOI). URL: https://www.psicothema.com/pdf/296.pdf |
| **España (invarianza por sexo)** | Atienza, Balaguer y García-Merita (2003), *Personality and Individual Differences*, 35(6), 1255-1260 | 528 | — | https://doi.org/10.1016/S0191-8869(02)00284-9 |
| **España (adultos)** | Vázquez, Duque y Hervás (2013), *The Spanish Journal of Psychology*, 16, E82 | 2.964 | .88 | https://doi.org/10.1017/sjp.2013.82 |
| **México (50+ años)** | López-Ortega, Torres-Castro y Rosas-Carrasco (2016), *Health and Quality of Life Outcomes*, 14, 170 | 13.220 | .82 | https://doi.org/10.1186/s12955-016-0573-9 |
| **Argentina (adolescentes y adultos)** | Castullo y Castro Solano (2000); replicaciones posteriores | 1.270 + adultos | .72-.88 | URL Redalyc 369163433043 (DOI no localizado para artículo original) |
| **Chile (representativa)** | Schnettler, Denegri, Miranda, Sepúlveda, Mora y Lobos (2017), *The Spanish Journal of Psychology*, 20, E14 | 1.500 | promedio .80 | https://doi.org/10.1017/sjp.2017.7 |
| **Iberoamericana (España-México invarianza)** | Esnaola, Benito, Antonio-Agirre, Freeman y Sarasa (2017), *Psicothema*, 29(4), 596-601 | invarianza estricta | — | https://doi.org/10.7334/psicothema2016.394 |
| **Colombia (general)** | Espejo et al. (2022), *Frontiers in Public Health*, 9, 767534 | 1.255 | .842 | https://doi.org/10.3389/fpubh.2021.767534 |
| **Colombia (universitarios + general + clínica)** | Ruiz et al. (2019), *Revista Latinoamericana de Psicología*, 51(2), 58-65 | 1.587 + 1.057 ESP | .89 | https://doi.org/10.14349/rlp.2019.v51.n2.1 |
| **Colombia (universitarios Bogotá)** | Vinaccia-Alpi, Parada, Quiceno, Riveros-Munévar y Vera-Maldonado (2019), *Psicogente*, 22(42), 1-13 | 121 | .839 | https://doi.org/10.17081/psico.22.42.3468 |

**Conclusión §4.** La adaptación al español tiene múltiples versiones consolidadas. Para LATAM, las dos versiones más utilizadas son **Atienza et al. (2000)** (basada en muestra adolescente española) y **Vázquez, Duque y Hervás (2013)** (basada en muestra representativa española adulta). Ambas son cuasi-equivalentes y han sido aplicadas exitosamente en Colombia. La traducción de Atienza fue sometida a back-translation supervisada por hablantes nativos bilingües y panel de expertos culturales para garantizar fidelidad semántica con el constructo original.

---

## SECCIÓN 5 — ADAPTACIÓN AL ESPAÑOL DE COLOMBIA (PROFUNDIDAD)

**Existen tres validaciones SWLS específicas para población colombiana**, lo que sitúa al instrumento entre los mejor adaptados al país en el stack DescubreMe.

### 5.1 Ruiz et al. (2019) — La validación colombiana de referencia

- **Muestra:** N = 1.587 colombianos (762 universitarios Bogotá + 724 población general + 101 muestra clínica) + N = 1.057 españoles para análisis de invarianza.
- **Versión:** Atienza et al. (2000), Likert 7 puntos.
- **Confiabilidad:** α global = .89 (M1: .85; M2: .89; M3: .85). Omega McDonald global ≈ .87.
- **CFA modelo unifactorial, muestra global:** χ²(5) = 26.18; RMSEA = 0.052 [.034, .073]; CFI = .99; NNFI = .99.
- **Invarianza factorial:** métrica y escalar confirmadas (a) entre las tres muestras colombianas, (b) entre géneros y (c) **entre Colombia y España** (*"Metric and scalar invariance were observed between countries"*).
- **Validez convergente:** correlaciones en dirección teóricamente coherente con DASS-21 (depresión, ansiedad, estrés), VQ-Progress/Obstruction y CFQ.
- **Diferencias clínica vs no clínica:** la muestra clínica obtuvo medias significativamente menores (d = 0.36-0.66), apoyando validez de criterio.

### 5.2 Espejo et al. (2022) — Versión 5 puntos para población general

- **Muestra:** N = 1.255 (M edad = 25.62, DE = 8.60; 64.5 % mujeres; rango 18-67).
- **Versión:** Atienza et al. con 5 opciones de respuesta (rango 5-25).
- **Confiabilidad:** α = .842; CRI (≈ omega) = .851; AVE = .537.
- **CFA:** χ²(5) = 15.774; CFI = .992; TLI = .985; RMSEA = .042 [.020, .066]; SRMR = .016.
- **Invarianza escalar confirmada por género y por edad** (adolescentes/adultos emergentes ≤25 vs adultos 26-59). Los adultos mayores presentan más satisfacción (b = 0.155, z = 3.114, p = .002).
- **Validez convergente:** SWLS-SPANE-P r = .603; SWLS-Flourishing r = .492; SWLS-Optimismo r = .566.
- **Baremos por subgrupo (escala 5-25):** medias 18.86 (≤25 años) y 19.66 (26-59 años). Percentiles disponibles por edad y género.

### 5.3 Vinaccia-Alpi et al. (2019) — Universitarios Bogotá

- **Muestra:** N = 121 (M edad = 20.73; 69.4 % mujeres); muestreo no probabilístico.
- **Versión:** Vázquez et al. (2013), Likert 7 puntos.
- **Confiabilidad:** α = .839.
- **EFA:** estructura unifactorial, 62.3 % varianza explicada.
- **CFA:** χ²/gl = 0.925; GFI = .988; CFI = 1.000; RMSEA = .000.
- **Baremos por percentil para universitarios bogotanos:** M = 27.31, DE = 5.59; P50 = 28; P90 = 33.
- **Limitación:** muestra pequeña, sin invarianza, sin test-retest.

### 5.4 Recomendación operacional Colombia

**Opinión profesional.** Usar la traducción de Atienza et al. (2000) en Likert 7 puntos, alineada con Ruiz et al. (2019) por ser la validación colombiana con mayor N, mayor diversidad muestral (incluye población clínica para validez de criterio) y la única que demuestra invarianza Colombia-España. **No es necesario un piloto de validación adicional**, pero sí se recomienda:

1. **Piloto cognitivo breve (n = 20-30)** para confirmar comprensión léxica de los ítems en el público objetivo de DescubreMe (jóvenes 18-35 LATAM).
2. **Calibración de baremos internos** una vez se acumulen N ≥ 500 usuarios colombianos, comparando contra Espejo et al. (2022) y Vinaccia-Alpi et al. (2019).

---

## SECCIÓN 6 — LICENCIA Y PERMISOS (ANÁLISIS EN 9 PUNTOS)

| # | Pregunta | Respuesta |
|---|---|---|
| 1 | **Tipo de licencia** | Copyright Diener et al. (no Creative Commons, no dominio público strictu sensu); **uso libre con atribución** para investigadores y profesionales. eddiener.com declara: *"The scale is copyrighted but is free to use without permission or charge by researchers as long as credit is given"* |
| 2 | **Costo** | $0 USD. Sin tarifa de licencia ni regalías para uso académico/profesional |
| 3 | **¿Permite uso comercial?** | **Ambigüedad documentada.** El sitio actual eddiener.com afirma *"permitted for non-commercial purposes only"*; el sitio histórico de Illinois (labs.psychology.illinois.edu/~ediener) afirma libre uso *"by all professionals (researchers and practitioners)"*. Múltiples fuentes terciarias declaran SWLS como public domain de facto. Resolver para producto B2C-freemium |
| 4 | **¿Permite uso de investigación?** | Sí, sin permiso ni cobro |
| 5 | **¿Permite uso educativo?** | Sí (inferido de cláusula amplia + uso histórico en universidades del mundo) |
| 6 | **¿Permite digitalización (web app)?** | Sí para investigación. Para comercial freemium se recomienda consulta legal y solicitud escrita |
| 7 | **¿Permite traducción/adaptación?** | Sí. eddiener.com solicita el envío de copia de la traducción al equipo Diener para registro |
| 8 | **Atribución requerida** | **Sí** — citar Diener et al. (1985), *Journal of Personality Assessment*, 49(1), 71-75. Requisito explícito y obligatorio en ambas fuentes oficiales. Si se usa la versión española, citar también Atienza et al. (2000) |
| 9 | **Restricciones territoriales / Riesgo legal global** | Ninguna documentada. Riesgo legal **BAJO con caveat sobre uso comercial.** Para DescubreMe (plataforma freemium con tier de pago), recomendamos: (a) atribución completa visible en la app; (b) consulta legal sobre cláusula non-commercial vs el carácter B2C-freemium; (c) opcionalmente, contactar a la Diener Education Fund para confirmación escrita; (d) no monetizar el SWLS aisladamente sino como parte de un paquete agregado de evaluación e insights |

**Contacto post-mortem.** Ed Diener falleció en abril 2021. La gestión del legado ha pasado a la Diener Education Fund / Ed Diener Center y a colaboradores académicos vinculados a University of Illinois. Para confirmación escrita sobre uso comercial, dirigirse a: (a) Diener Education Fund vía eddiener.com, (b) Department of Psychology, University of Illinois Urbana-Champaign (mantenedores del sitio histórico labs.psychology.illinois.edu/~ediener), (c) Ed Diener Center for Wellbeing.

**Conclusión §6.** Riesgo BAJO para uso en investigación, MVP gratuito y producto educativo. Riesgo MEDIO si la plataforma cobra explícitamente por aplicar el SWLS aislado (Paid Track A); mitigación recomendada: (i) integrar el SWLS en un paquete agregado de evaluación e insights, (ii) gestionar atribución prominente en footer/ToS, (iii) solicitar confirmación escrita al equipo Diener antes del lanzamiento del Paid Track A.

---

## SECCIÓN 7 — SCORING Y REGLAS DE PUNTUACIÓN

**Procedimiento.** Suma simple de los 5 ítems, sin inversión de puntaje (todos los ítems están en dirección positiva).

- **Rango:** 5 (mínimo) - 35 (máximo).
- **Punto neutro:** 20.

### 7.1 Rangos interpretativos (Pavot y Diener, 1993, 2008)

| Rango | Interpretación | Percentil normativo aproximado |
|---|---|---|
| 31-35 | Extremadamente satisfecho | > 85 |
| 26-30 | Satisfecho | 59-84 |
| 21-25 | Ligeramente satisfecho | 29-58 |
| 20 | Neutro (punto de inflexión) | 20-28 |
| 15-19 | Ligeramente insatisfecho | 6-19 |
| 10-14 | Insatisfecho | 2-5 |
| 5-9 | Extremadamente insatisfecho | < 1 |

### 7.2 Baremos normativos

- **Muestras comunitarias internacionales agregadas (k = 12, N > 4.000):** M ≈ 24.52, DE ≈ 6.22 (NovoPsych pooled; concordante con Pavot y Diener, 2008).
- **España adultos (Vázquez et al., 2013):** M ≈ 23.7.
- **Chile representativa (Schnettler et al., 2017):** medias por subgrupo entre 22 y 26.
- **Colombia universitarios Bogotá (Vinaccia-Alpi et al., 2019):** M = 27.31, DE = 5.59.
- **Colombia general (Espejo et al., 2022, escala 5-25):** M = 19.06-19.66 (equivalente aproximado en escala 5-35: ~25-27).
- **Muestras clínicas internacionales agregadas:** M ≈ 17.04 (cercana a "Ligeramente Insatisfecho"), discriminando claramente de muestras comunitarias.

### 7.3 Diferencia mínimamente importante (MID) longitudinal

**Hecho.** La literatura establece **MID ≈ 3 puntos brutos** como umbral clínicamente significativo de cambio, equivalente aproximadamente a la mitad de una desviación estándar normativa (Pavot y Diener, 1993). Toda fluctuación consolidada igual o superior a 3 puntos en el puntaje bruto debe interpretarse como cambio real, no como ruido del método de encuesta.

**Implicación operativa DescubreMe.**
- Mejora ≥ 3 puntos tras intervención o periodo: registrar como "asimilación cognitiva productiva" en el panel del usuario.
- Caída ≥ 3 puntos en aplicaciones sucesivas: activar **alarma longitudinal** y derivar a flujo de contención (NFR-27/28 si concurrente con SWLS ≤ 9).

### 7.4 Interpretación clínica vs no clínica

Pavot y Diener (2008) advierten que la mayoría de muestras comunitarias se sitúan en 23-28, por lo que un puntaje "neutro" (20) ya señala posible malestar relativo en contexto LATAM no clínico. El uso del SWLS como **radar preventivo sensible** —no diagnóstico— está validado por su capacidad de discriminar muestras clínicas (M ≈ 17) de no clínicas (M ≈ 24-25).

---

## SECCIÓN 8 — IMPLEMENTACIÓN DIGITAL

### 8.1 UX en pantalla

- **Pantalla única** con los 5 ítems visibles (no paginación). El instrumento es lo suficientemente corto para evitar fatiga.
- **Encabezado pedagógico:** explicación de 1-2 líneas: *"Esta escala mide qué tan satisfecho/a te sientes con tu vida en general. Responde con honestidad; no hay respuestas correctas o incorrectas."*
- **Anclajes verbales completos** en los 7 niveles (no solo extremos): mejora la confiabilidad en muestras con educación heterogénea (Diener, Inglehart y Tay, 2013).
- **Indicador de progreso:** "Pregunta X de 5".

### 8.2 Validación de respuestas

- **Bloqueo de envío** si <5 ítems respondidos (no permitir blancos).
- **Detección de straightlining:** los 5 ítems con idéntica respuesta + tiempo total <15 s → marcar como "baja calidad" en backend (no bloquear, no usar para baremos).
- **Tiempo mínimo:** registrar timestamps por ítem; tiempos <2 s/ítem flagear.

### 8.3 Privacidad y almacenamiento

- **Encriptación at-rest y in-transit** (AES-256, TLS 1.3).
- **Pseudonimización:** separar respuestas crudas del identificador del usuario (token interno).
- **Consentimiento informado** explícito antes de aplicación, alineado con Ley 1581 de 2012 (Colombia, Habeas Data) y LGPD (Brasil) si aplica.
- **Retención:** crudos por máximo 24 meses; agregados anonimizados indefinidamente para baremos.
- **Derecho al olvido** explícito: eliminación bajo solicitud en ≤72 horas.

### 8.4 Accesibilidad

- WCAG 2.1 nivel AA: contraste, tamaños de fuente ajustables, navegación por teclado, etiquetas ARIA.
- **Mobile first:** la población objetivo LATAM accede mayoritariamente vía smartphone.

### 8.5 Auditabilidad

Guardar para reproducibilidad: respuestas crudas por ítem, timestamp por ítem, versión del instrumento, versión de la traducción, versión del scoring engine. El scoring es determinista (suma simple) y, por tanto, todo perfil histórico es reconstruible si la lógica cambia.

---

## SECCIÓN 9 — MAPEO AL STACK DESCUBREME

### 9.1 Tabla comparativa SWLS vs instrumentos de bienestar del stack

| Atributo | **SWLS** | **Flourishing Scale** | **PANAS** | **Ryff PWB** |
|---|---|---|---|---|
| Constructo principal | Satisfacción vital cognitiva | Bienestar psicosocial sintético | Afecto positivo y negativo | Bienestar eudaimónico |
| Tradición teórica | Hedónica (Diener) | Síntesis hedónica + eudaimónica | Hedónica afectiva | Eudaimónica (Ryff/Aristóteles) |
| Componente SWB | Cognitivo | Mixto | Afectivo | Fuera del SWB clásico |
| Ítems | 5 | 8 | 20 (10 PA + 10 NA) | 18 / 42 / 54 / 84 / 120 |
| Tiempo aprox. | 1-2 min | 2-3 min | 5-7 min | 5-15 min |
| Likert | 7 puntos | 7 puntos | 5 puntos | 6 puntos |
| Dimensiones | Unidimensional | Unidimensional | 2 (PA, NA) | 6 (autonomía, dominio del entorno, crecimiento, relaciones positivas, propósito, autoaceptación) |
| Autor original | Diener et al. (1985) | Diener et al. (2010) | Watson, Clark y Tellegen (1988) | Ryff (1989) |
| Costo licencia | $0 (caveat comercial) | $0 | $0 | $0 |
| Validación Colombia | Múltiple (Ruiz, Espejo, Vinaccia) | Sí (Espejo et al., 2022) | Parcial | Parcial |

### 9.2 ¿Son SWLS, Flourishing y Ryff redundantes o complementarios?

**Discusión central solicitada por el brief.** El stack DescubreMe ya contempla Flourishing Scale y Ryff PWB. Añadir SWLS no es redundancia: los tres operan en planos teóricos distintos.

| Eje | SWLS | Flourishing Scale | Ryff PWB |
|---|---|---|---|
| Pregunta que responde | "¿Cuán satisfecho estoy con mi vida en su conjunto?" | "¿Estoy floreciendo psicosocialmente?" | "¿Tengo una vida psicológicamente plena en seis dimensiones?" |
| Naturaleza | **Hedónica cognitiva** (juicio evaluativo global) | **Sintética hedónico-eudaimónica** (8 ítems combinan competencia, propósito, relaciones, optimismo) | **Eudaimónica pura** (autonomía, dominio del entorno, crecimiento personal, relaciones positivas, propósito, autoaceptación) |
| Marco teórico | Diener (1984) modelo tripartito | Diener et al. (2010) síntesis | Ryff (1989) tradición aristotélica/humanista |
| Solapamiento empírico | SWLS-Flourishing r ≈ .49 (Espejo et al., 2022) | Flourishing-Ryff r típicamente .55-.65 | Ryff-SWLS r típicamente .40-.60 |

**Inferencia consolidada.** Las correlaciones son moderadas, no saturadas: cada instrumento aporta varianza única. **SWLS es el único que captura el juicio cognitivo global de satisfacción vital despojado de afecto y de dimensiones psicosociales específicas.** Flourishing es un constructo de eficacia psicosocial percibida (incluye competencia, contribución social, optimismo), y Ryff es eudaimonía estructurada en seis facetas.

**Opinión profesional.** En Paid Track A, el triplete SWLS + Flourishing + Ryff funciona como cobertura completa del espectro de bienestar (cognitivo + sintético + eudaimónico), permitiendo al usuario perfiles diferenciales. Por ejemplo: un usuario con SWLS alto pero Ryff "Propósito en la vida" bajo señala satisfacción hedónica sin ancla eudaimónica → contenido recomendado: módulo Ikigai. Un usuario con SWLS bajo pero Flourishing competencia alto señala disonancia entre logro objetivable y valoración subjetiva → contenido recomendado: revisión de estándares ideales y reframing cognitivo.

### 9.3 Justificación inclusión SWLS en Paid Track A

1. **Costo marginal de tiempo:** ~1 minuto adicional sobre Flourishing. Total combinado <5 minutos.
2. **Alta señal informativa:** medida más usada y validada del componente cognitivo del SWB; permite comparar al usuario con baremos internacionales y colombianos (47.000+ citaciones).
3. **Complementariedad:** permite calcular un índice compuesto SWB hedónico (SWLS + SPANE) y compararlo con el sintético (Flourishing) y el eudaimónico (Ryff).
4. **Costo de licencia:** $0 (con caveat comercial).
5. **Anclaje narrativo:** la "satisfacción con la vida" es un concepto inmediatamente comprensible para usuarios sin formación psicológica, ideal para la propuesta de valor de DescubreMe.

### 9.4 Justificación inclusión SWLS en B2B Track B

- Encuestas de pulso trimestrales: SWLS + Flourishing como medidas brevísimas (combinadas <5 minutos) entregan métrica longitudinal de bienestar agregado del equipo.
- **Prohibición técnica:** los puntajes individuales no se exponen al empleador; solo agregados anónimos con n ≥ 10 por subgrupo.
- **Restricción de uso:** NO usar para selección de personal, NO para evaluación de desempeño. Términos contractuales B2B explícitos.

---

## SECCIÓN 10 — RED FLAGS ÉTICOS Y SESGOS

### 10.1 Sesgos cross-cultural

- **Variación significativa de medias entre culturas:** los puntajes promedio difieren sistemáticamente entre países por factores no atribuibles solamente a calidad de vida objetiva (Diener, Inglehart y Tay, 2013). Países latinoamericanos tienden a reportar puntajes altos a pesar de indicadores objetivos modestos: **"paradoja latinoamericana de la felicidad"** (Bericat y Acosta, 2021), quienes documentan que *"los niveles de felicidad declarados en América Latina son mucho más altos de lo que cabría esperar en función de su calidad de vida y calidad societal"*.
- **Sesgo de aquiescencia y respuesta extrema:** poblaciones latinas muestran mayor tendencia a respuestas extremas; hispanohablantes responden distinto en encuestas en su lengua materna vs. en inglés.
- **Mitigación:** usar baremos LATAM/Colombia (Ruiz et al., 2019; Espejo et al., 2022), no baremos estadounidenses.

### 10.2 Efectos demográficos

- **Edad:** relación curvilínea documentada; en Colombia adultos 26-59 puntúan significativamente más alto que ≤25 (Espejo et al., 2022, b = 0.155, p = .002). El maturity principle aplica también al SWLS.
- **Ingreso/educación:** correlación positiva pequeña-moderada (Vázquez et al., 2013).
- **Estado civil:** personas en pareja tienden a puntuar más alto.
- **Género:** invarianza confirmada (Ruiz et al., 2019; Espejo et al., 2022; Swami et al., 2025) → diferencias de medias son **sustantivas, no artefactos métricos**. Las comparaciones de medias por sexo no logran diferencias estadísticamente discernibles en el constructo en muestras colombianas (Ruiz et al., 2019).

### 10.3 Riesgo de uso indebido como instrumento clínico

**CRÍTICO para DescubreMe (no clínico).** SWLS bajo ≠ depresión clínica. Aunque correlaciona con depresión (r ≈ -.50; Meule y Voderholzer, 2020), NO es sustituto de evaluación clínica.

- **Mitigación NFR-27/28:** si SWLS ≤ 9 sostenido (extremadamente insatisfecho) **+** otras señales del stack (Flourishing bajo, PANAS-NA elevado): **activar ruta de contención** con mensajes empáticos, NO diagnósticos, y derivación a recursos de salud mental locales:
  - **Línea 106 (Bogotá)** — apoyo emocional gratuito
  - **Línea 192** — Salud Pública Colombia
  - **Línea 123** — emergencia nacional Colombia
- **Lenguaje:** nunca decir "estás deprimido"; usar *"tu nivel de satisfacción vital actual es bajo, lo cual puede ser señal de un momento difícil…"*.

### 10.4 Privacidad y consentimiento informado

- Comunicar explícitamente: *"esta evaluación no es un diagnóstico clínico ni reemplaza atención profesional"*.
- Almacenar respuestas con encriptación; no compartir con terceros sin consentimiento granular.
- En B2B Track B: **prohibir** que empleadores accedan a puntajes individuales; solo agregados anónimos (n ≥ 10 por subgrupo).
- Disclaimer pre-test obligatorio + botón de salida visible permanente.

### 10.5 Riesgo de uso para selección o ranking

**Inferencia.** El SWLS no fue diseñado ni validado para selección de personal, ranking inter-personal o decisiones de alto stake. En manos equivocadas podría usarse para discriminar candidatos por "satisfacción vital baja". Mitigación: términos y condiciones explícitos prohibiendo estos usos; bloqueo técnico de exportación masiva de perfiles con identificación.

---

## SECCIÓN 11 — LIMITACIONES Y CONTEXTO DE USO

1. **NO es instrumento clínico.** Aunque correlaciona con depresión, no diagnostica trastornos. DescubreMe nunca debe presentarlo como screening clínico.
2. **Efecto techo en muestras no clínicas:** dificulta detectar cambios en personas ya satisfechas.
3. **Vigencia temporal:** estabilidad media a largo plazo (r ≈ .54 a 4 años) → solo ~50 % de la varianza es trait estable. Útil como medida de momento actual con cierta robustez, pero no como rasgo inmutable.
4. **Sensibilidad limitada al cambio fino:** para intervenciones breves (<2 semanas), considerar PANAS o SPANE como medida más sensible.
5. **Restricción etaria:** no validado para niños <13 años. Para esa población existe SWLS-C (Gadermann et al., 2010).
6. **Contexto sociopolítico:** en países con alta inestabilidad (conflicto armado, migración), los puntajes pueden reflejar estrés contextual, no rasgo individual. Relevante para Colombia (regiones afectadas por violencia, migración venezolana).
7. **Ítem 5 retrospectivo:** carga factorial menor; algunos autores recomiendan versión 3-ítems (Kjell y Diener, 2021) en contextos de alta carga cognitiva.

---

## SECCIÓN 12 — RECOMENDACIÓN DE USO EN DESCUBREME

### 12.1 Decisión: INCLUIR SWLS en Paid Track A y B2B Track B

### 12.2 Justificación cuantificada

| Criterio | Evaluación | Score (0-5) |
|---|---|---|
| Brevedad / costo de tiempo | ~1 min adicional | 5 |
| Calidad psicométrica | α = .79-.89; CFA robusto; invarianza cross-cultural | 5 |
| Validación Colombia | 3 estudios independientes, N total >2.800 | 5 |
| Costo de licencia | $0 (con caveat comercial) | 4 |
| Complementariedad con Flourishing y Ryff | Solapamiento moderado, no redundante; cobertura hedónico-sintético-eudaimónico | 5 |
| Interpretabilidad para usuario final | Constructo intuitivo ("satisfacción con la vida") | 5 |
| Riesgo ético | BAJO con NFR-27/28 implementados | 4 |
| **Score total** | **33/35** | **94 %** |

### 12.3 Ubicación en el customer journey

1. **Onboarding (Free):** NO incluir; reservar para Paid.
2. **Paid Track A (autoconocimiento profundo):** SWLS aplicado en bloque "Bienestar 360°" junto con Flourishing y SPANE. Re-evaluación opcional cada 6 meses (intervalo coherente con la estabilidad temporal del constructo).
3. **B2B Track B (bienestar organizacional):** SWLS + Flourishing como medidas brevísimas para encuestas de pulso trimestrales. NO para selección, NO para evaluación de desempeño individual.

### 12.4 Prerrequisitos antes de lanzamiento

- [ ] Confirmar versión española: **Atienza et al. (2000)** alineada con Ruiz et al. (2019) para Colombia.
- [ ] Implementar NFR-27/28 (ruta de contención).
- [ ] Implementar alarma longitudinal MID ≥ 3 puntos.
- [ ] Validar consentimiento informado y política de privacidad alineada con Ley 1581/2012.
- [ ] Confirmar atribución visible en footer y términos de servicio (Diener et al., 1985 + Atienza et al., 2000).
- [ ] Piloto cognitivo n = 20-30 colombianos.
- [ ] Consulta legal sobre cláusula non-commercial vs modelo freemium; opcionalmente solicitud escrita a Diener Education Fund.

### 12.5 Plan B en caso de denegación de uso comercial

**Opinión profesional.** Si Diener Education Fund deniega uso comercial expreso, opciones de contingencia:

1. **Cantril Self-Anchoring Striving Scale (Cantril Ladder)** — dominio público de facto, 1 ítem, mide satisfacción vital global. Pérdida de granularidad y de baremos LATAM colombianos.
2. **OECD Better Life Index satisfaction items** — uso gubernamental abierto. Pérdida de tradición psicométrica.
3. **Mantener solo Flourishing + Ryff** y eliminar SWLS. Costo: pérdida del juicio cognitivo global puro.

Probabilidad estimada de aceptación de uso comercial freemium: alta-media, basada en que Diener históricamente aprobó usos educativos amplios y la Fund continúa con esta línea filantrópica. Sin garantía.

---

## SECCIÓN 13 — PSEUDOCÓDIGO DE SCORING (TYPESCRIPT)

```typescript
// SWLS Scoring Module — DescubreMe v2.0
// Diener et al. (1985) | Atienza et al. (2000) ES adaptation

type LikertResponse = 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface SWLSResponses {
  item1: LikertResponse; // ideal
  item2: LikertResponse; // condiciones
  item3: LikertResponse; // satisfacción
  item4: LikertResponse; // logros importantes
  item5: LikertResponse; // sin cambios retrospectivo
}

type SWLSInterpretation =
  | "extremely_satisfied"
  | "satisfied"
  | "slightly_satisfied"
  | "neutral"
  | "slightly_dissatisfied"
  | "dissatisfied"
  | "extremely_dissatisfied";

interface SWLSResult {
  rawScore: number;             // 5 a 35
  interpretation: SWLSInterpretation;
  interpretationLabelES: string;
  flagLowWellbeing: boolean;    // NFR-27/28
  flagMidDeclineSevere: boolean; // alarma longitudinal MID
  qualityFlag: { straightline: boolean; tooFast: boolean };
}

function validateResponses(r: SWLSResponses): void {
  const items = [r.item1, r.item2, r.item3, r.item4, r.item5];
  for (const v of items) {
    if (!Number.isInteger(v) || v < 1 || v > 7) {
      throw new Error(`SWLS: respuesta inválida (${v}); debe ser entero 1-7`);
    }
  }
}

function detectStraightline(r: SWLSResponses): boolean {
  const items = [r.item1, r.item2, r.item3, r.item4, r.item5];
  return new Set(items).size === 1; // todas iguales
}

function interpretSWLS(score: number): {
  code: SWLSInterpretation;
  labelES: string;
} {
  if (score >= 31) return { code: "extremely_satisfied", labelES: "Extremadamente satisfecho/a con la vida" };
  if (score >= 26) return { code: "satisfied",            labelES: "Satisfecho/a con la vida" };
  if (score >= 21) return { code: "slightly_satisfied",   labelES: "Ligeramente satisfecho/a con la vida" };
  if (score === 20) return { code: "neutral",             labelES: "Punto neutro: ni satisfecho/a ni insatisfecho/a" };
  if (score >= 15) return { code: "slightly_dissatisfied", labelES: "Ligeramente insatisfecho/a con la vida" };
  if (score >= 10) return { code: "dissatisfied",         labelES: "Insatisfecho/a con la vida" };
  return { code: "extremely_dissatisfied",                labelES: "Extremadamente insatisfecho/a con la vida" };
}

function scoreSWLS(
  responses: SWLSResponses,
  responseTimeMs: number,
  previousScore?: number
): SWLSResult {
  validateResponses(responses);

  const rawScore =
    responses.item1 + responses.item2 + responses.item3 +
    responses.item4 + responses.item5;

  const { code, labelES } = interpretSWLS(rawScore);

  // NFR-27/28: bandera para ruta de contención
  const flagLowWellbeing = rawScore <= 9;

  // Alarma longitudinal MID (caída >= 3 puntos vs aplicación previa)
  const flagMidDeclineSevere =
    typeof previousScore === "number" && (rawScore - previousScore) <= -3;

  // Quality controls
  const straightline = detectStraightline(responses);
  const tooFast = responseTimeMs < 10_000; // <10 segundos para 5 ítems

  return {
    rawScore,
    interpretation: code,
    interpretationLabelES: labelES,
    flagLowWellbeing,
    flagMidDeclineSevere,
    qualityFlag: { straightline, tooFast },
  };
}

// Ejemplo de uso
const result = scoreSWLS(
  { item1: 5, item2: 6, item3: 6, item4: 5, item5: 4 },
  45_000,
  29 // puntuación previa hipotética
);
// → { rawScore: 26, interpretation: "satisfied", flagLowWellbeing: false, flagMidDeclineSevere: true, ... }
```

**Notas de implementación.**
- El umbral `<=9` para `flagLowWellbeing` corresponde al rango "extremadamente insatisfecho" (Pavot y Diener, 1993, 2008).
- El umbral MID de 3 puntos se basa en Pavot y Diener (1993) ≈ media DT normativa.
- `flagLowWellbeing` y `flagMidDeclineSevere` activan flujos NFR-27/28 (mensaje empático + recursos), nunca diagnóstico.
- Calibrar el umbral de tiempo (10 s) tras observabilidad de las primeras 1.000 sesiones.
- Guardar metadatos (versión instrumento, traducción, scoring engine, timestamp) para auditabilidad.

---

## SECCIÓN 14 — GAPS DE INVESTIGACIÓN Y DECISIONES PENDIENTES

1. **Confirmación escrita de uso comercial freemium por la Diener Education Fund.** Ambigüedad documentada entre eddiener.com (post-2024 *"non-commercial only"*) y el sitio histórico de Illinois (uso libre por profesionales). **Acción:** consulta legal + solicitud escrita antes del lanzamiento del Paid Track A. Probabilidad de aceptación estimada como alta-media; sin garantía.

2. **Calibración de baremos internos LATAM Colombia.** Los baremos de Pavot y Diener (1993) son anglosajones. **Acción:** una vez acumulados N ≥ 500 usuarios colombianos, recalibrar percentiles internos comparando contra Espejo et al. (2022) y Vinaccia-Alpi et al. (2019).

3. **Decisión final entre Atienza (2000) vs Vázquez (2013) como traducción de referencia.** Recomendación: Atienza (2000) por alineación con Ruiz et al. (2019) y validación colombiana mayor. **Bloqueante operativo:** confirmar disponibilidad legal del texto literal (Spanish 1 vs Spanish 2 publicado en eddiener.com).

4. **Umbral exacto de NFR-27/28.** El umbral propuesto (≤9) es conservador pero arbitrario. **Acción:** validar empíricamente con datos longitudinales y, si es posible, correlacionar con autoreporte de búsqueda de ayuda profesional en seguimiento a 30 días.

5. **Política de re-test.** ¿Cada cuánto permitir/sugerir reaplicación? La estabilidad temporal sugiere **mínimo 3 meses entre aplicaciones** para detectar cambio real, no ruido. Documentar en producto.

6. **Equivalencia visual de los anclajes.** Los anclajes verbales en español 7 puntos no son equidistantes psicométricamente para todas las poblaciones. **Acción:** considerar piloto con escala 1-7 numérica + anclajes solo en extremos vs. anclajes completos.

7. **Funcionamiento diferencial del ítem 5 en Colombia.** Documentado en culturas asiáticas; no se ha investigado específicamente en Colombia. **Acción:** análisis DIF en la microvalidación interna post-lanzamiento.

8. **Equivalencia psicométrica de la versión 5 puntos (Espejo et al., 2022) vs. la versión clásica 7 puntos.** Estudio comparativo formal pendiente para decidir si DescubreMe puede migrar a versión 5 puntos en B2B (encuestas de pulso) sin pérdida significativa de información.

---

## SECCIÓN 15 — REFERENCIAS APA 7 (DOI VERIFICADOS)

### 15.1 Artículo original y revisiones autorales

1. Diener, E., Emmons, R. A., Larsen, R. J., y Griffin, S. (1985). The Satisfaction with Life Scale. *Journal of Personality Assessment, 49*(1), 71-75. https://doi.org/10.1207/s15327752jpa4901_13
2. Pavot, W., y Diener, E. (1993). Review of the Satisfaction With Life Scale. *Psychological Assessment, 5*(2), 164-172. https://doi.org/10.1037/1040-3590.5.2.164
3. Pavot, W., y Diener, E. (2008). The Satisfaction With Life Scale and the emerging construct of life satisfaction. *The Journal of Positive Psychology, 3*(2), 137-152. https://doi.org/10.1080/17439760701756946
4. Pavot, W., Diener, E., Colvin, C. R., y Sandvik, E. (1991). Further validation of the Satisfaction with Life Scale: Evidence for the cross-method convergence of well-being measures. *Journal of Personality Assessment, 57*(1), 149-161. https://doi.org/10.1207/s15327752jpa5701_17

### 15.2 Adaptaciones LATAM e ibéricas

5. Atienza, F. L., Pons, D., Balaguer, I., y García-Merita, M. (2000). Propiedades psicométricas de la Escala de Satisfacción con la Vida en adolescentes. *Psicothema, 12*(2), 314-319. URL: https://www.psicothema.com/pdf/296.pdf
6. Atienza, F. L., Balaguer, I., y García-Merita, M. L. (2003). Satisfaction with Life Scale: Analysis of factorial invariance across sexes. *Personality and Individual Differences, 35*(6), 1255-1260. https://doi.org/10.1016/S0191-8869(02)00284-9
7. Espejo, B., Martín-Carbonell, M., Checa, I., Paternina, Y., Fernández-Daza, M., Higuita, J. D., Albarracín, A., y Cerquera, A. (2022). Psychometric properties of the Diener Satisfaction with Life Scale with five response options applied to the Colombian population. *Frontiers in Public Health, 9*, 767534. https://doi.org/10.3389/fpubh.2021.767534
8. Esnaola, I., Benito, M., Antonio-Agirre, I., Freeman, J., y Sarasa, M. (2017). Measurement invariance of the Satisfaction With Life Scale (SWLS) by country, gender and age. *Psicothema, 29*(4), 596-601. https://doi.org/10.7334/psicothema2016.394
9. López-Ortega, M., Torres-Castro, S., y Rosas-Carrasco, O. (2016). Psychometric properties of the Satisfaction with Life Scale (SWLS): Secondary analysis of the Mexican Health and Aging Study. *Health and Quality of Life Outcomes, 14*, 170. https://doi.org/10.1186/s12955-016-0573-9
10. Ruiz, F. J., Suárez-Falcón, J. C., Flórez, C. L., Odriozola-González, P., Tovar, D., López-González, S., y Baeza-Martín, R. (2019). Validity of the Satisfaction with Life Scale in Colombia and factorial equivalence with Spanish data. *Revista Latinoamericana de Psicología, 51*(2), 58-65. https://doi.org/10.14349/rlp.2019.v51.n2.1
11. Schnettler, B., Denegri, M., Miranda, H., Sepúlveda, J., Mora, M., y Lobos, G. (2017). Spanish version of the Satisfaction with Life Scale: Validation and factorial invariance analysis in Chile. *The Spanish Journal of Psychology, 20*, E14. https://doi.org/10.1017/sjp.2017.7
12. Vázquez, C., Duque, A., y Hervás, G. (2013). Satisfaction with Life Scale in a representative sample of Spanish adults: Validation and normative data. *The Spanish Journal of Psychology, 16*, E82. https://doi.org/10.1017/sjp.2013.82
13. Vinaccia-Alpi, S., Parada, N., Quiceno, J. M., Riveros-Munévar, F., y Vera-Maldonado, L. A. (2019). Escala de satisfacción con la vida (SWLS): Análisis de validez, confiabilidad y baremos para estudiantes universitarios de Bogotá. *Psicogente, 22*(42), 1-13. https://doi.org/10.17081/psico.22.42.3468

### 15.3 Marco teórico del bienestar subjetivo y validez transcultural

14. Bericat, E., y Acosta, M. J. (2021). La paradoja latinoamericana de la felicidad. Consideraciones teórico-metodológicas. *Revista Mexicana de Sociología, 83*(3), 709-743. https://doi.org/10.22201/iis.01882503p.2021.3.60137
15. Busseri, M. A., y Sadava, S. W. (2011). A review of the tripartite structure of subjective well-being: Implications for conceptualization, operationalization, analysis, and synthesis. *Personality and Social Psychology Review, 15*(3), 290-314. https://doi.org/10.1177/1088868310391271
16. Diener, E. (1984). Subjective well-being. *Psychological Bulletin, 95*(3), 542-575. https://doi.org/10.1037/0033-2909.95.3.542
17. Diener, E., Inglehart, R., y Tay, L. (2013). Theory and validity of life satisfaction scales. *Social Indicators Research, 112*(3), 497-527. https://doi.org/10.1007/s11205-012-0076-y
18. Diener, E., Wirtz, D., Tov, W., Kim-Prieto, C., Choi, D., Oishi, S., y Biswas-Diener, R. (2010). New well-being measures: Short scales to assess flourishing and positive and negative feelings. *Social Indicators Research, 97*(2), 143-156. https://doi.org/10.1007/s11205-009-9493-y
19. Jang, S., Kim, E. S., Cao, C., Allen, T. D., Cooper, C. L., Lapierre, L. M., O'Driscoll, M. P., Sanchez, J. I., Spector, P. E., y Poelmans, S. A. Y. (2017). Measurement invariance of the Satisfaction With Life Scale across 26 countries. *Journal of Cross-Cultural Psychology, 48*(4), 560-576. https://doi.org/10.1177/0022022117697844
20. Kjell, O. N. E., y Diener, E. (2021). Abbreviated three-item versions of the Satisfaction with Life Scale and the Harmony in Life Scale yield as strong psychometric properties as the original scales. *Journal of Personality Assessment, 103*(2), 183-194. https://doi.org/10.1080/00223891.2020.1737093
21. Kobau, R., Sniezek, J., Zack, M. M., Lucas, R. E., y Burns, A. (2010). Well-being assessment: An evaluation of well-being scales for public health and population estimates of well-being among US adults. *Applied Psychology: Health and Well-Being, 2*(3), 272-297. https://doi.org/10.1111/j.1758-0854.2010.01035.x
22. Ryff, C. D. (1989). Happiness is everything, or is it? Explorations on the meaning of psychological well-being. *Journal of Personality and Social Psychology, 57*(6), 1069-1081. https://doi.org/10.1037/0022-3514.57.6.1069
23. Swami, V., Stieger, S., Voracek, M., et al. (2025). Life satisfaction around the world: Measurement invariance of the Satisfaction With Life Scale (SWLS) across 65 nations, 40 languages, gender identities, and age groups. *PLOS ONE, 20*(1), e0313107. https://doi.org/10.1371/journal.pone.0313107
24. Watson, D., Clark, L. A., y Tellegen, A. (1988). Development and validation of brief measures of positive and negative affect: The PANAS scales. *Journal of Personality and Social Psychology, 54*(6), 1063-1070. https://doi.org/10.1037/0022-3514.54.6.1063
25. Whisman, M. A., y Judd, C. M. (2016). A cross-national analysis of measurement invariance of the Satisfaction With Life Scale. *Psychological Assessment, 28*(2), 239-244. https://doi.org/10.1037/pas0000181

### 15.4 Aplicaciones clínicas, en salud y población vulnerable

26. Arrindell, W. A., Meeuwesen, L., y Huyse, F. J. (1991). The Satisfaction With Life Scale (SWLS): Psychometric properties in a non-psychiatric medical outpatients sample. *Personality and Individual Differences, 12*(2), 117-123. https://doi.org/10.1016/0191-8869(91)90094-R
27. Castellá Sarriera, J., Saforcada, E., Tonon, G., Rodríguez de la Vega, L., Mozobancyk, S., y Bedin, L. M. (2012). Bienestar subjetivo de los adolescentes: Un estudio comparativo entre Argentina y Brasil. *Psychosocial Intervention, 21*(3), 273-280. https://doi.org/10.5093/in2012a24
28. Gadermann, A. M., Schonert-Reichl, K. A., y Zumbo, B. D. (2010). Investigating validity evidence of the Satisfaction with Life Scale adapted for Children. *Social Indicators Research, 96*(2), 229-247. https://doi.org/10.1007/s11205-009-9474-1
29. Glaesmer, H., Grande, G., Braehler, E., y Roth, M. (2011). The German version of the Satisfaction With Life Scale (SWLS): Psychometric properties, validity, and population-based norms. *European Journal of Psychological Assessment, 27*(2), 127-132. https://doi.org/10.1027/1015-5759/a000058
30. Meule, A., y Voderholzer, U. (2020). The Satisfaction with Life Scale: Psychometric properties in a clinical inpatient sample. *Journal of Clinical Psychology, 76*(7), 1267-1278. https://doi.org/10.1002/jclp.22951

### 15.5 Licencia y fuentes oficiales

31. Diener, E. (n.d.). *Satisfaction with Life Scale (SWLS).* eddiener.com. Recuperado el 5 de mayo de 2026, de https://eddiener.com/scales/7
32. Pavot, W., y Diener, E. (n.d.). *Review of the Satisfaction with Life Scale.* University of Illinois Personality Lab. https://labs.psychology.illinois.edu/~ediener/Documents/Pavot-Diener_1993.pdf

**Total de referencias verificadas con DOI/URL: 32** (supera el mínimo de 15).

---

## SECCIÓN 16 — METADATOS Y CAVEATS FINALES

| Campo | Valor |
|---|---|
| Versión del dossier | v2.0 consolidado |
| Fecha de elaboración | 10 de mayo de 2026 |
| Posición en el stack | Dossier #10 (P2 Alta — complementa Flourishing v2.0 y Ryff) |
| Stack relacionado | Flourishing Scale, PANAS, SPANE, Ryff PWB, MLQ |
| Próxima revisión sugerida | Mayo 2027 (revisión anual de literatura nueva) |
| Idioma del dossier | Español neutro (LATAM) |
| Conformidad metodológica | APA 7, anti-alucinación de ítems, distinción SWLS-Flourishing-Ryff aplicada |

**Caveats finales.**

- **Norma colombiana sólida pero limitada.** Aunque existen tres validaciones colombianas, ninguna combina población general, clínica y representativa con baremos por edad y género en una sola muestra. La calibración interna DescubreMe (post-N=500) suplirá este vacío parcialmente.
- **Licencia comercial sujeta a confirmación.** Este dossier asume continuidad de la apertura histórica del legado Diener; en caso de denegación o restricción severa, activar Plan B (§12.5).
- **Ítem 5 con DIF documentado en culturas asiáticas; no investigado en Colombia.** Análisis DIF post-lanzamiento es prioritario.
- **Datos sensibles.** SWLS bajo sostenido es proxy de malestar emocional bajo Ley 1581/2012 (interpretación SIC); toda implementación debe incluir disclaimers, derecho de eliminación y derivación a líneas de ayuda colombianas.
- **Trazabilidad de divergencias entre fuentes:** datos críticos (α global, RMSEA Ruiz 2019, AVE Espejo 2022, MID = 3 puntos, invarianza Swami 2025) coincidieron entre los dossiers Claude y Gemini; dato divergente principal: la cita Atienza et al. (2000) — paginación Psicothema 12(2), 314-319 (Claude) vs 331-336 (Gemini). Conservada la primera por verificación contra repositorio Psicothema. Aplicaciones colombianas adicionales (paradoja latinoamericana, predicción en adolescentes con afrontamiento proactivo, sensibilidad MID) provienen del análisis Gemini; texto literal de licencia y plan operativo de implementación provienen del análisis Claude.

---

*Cierre del dossier consolidado v2.0 — Listo para revisión científica y legal antes de la inclusión en Paid Track A y B2B Track B v1.5 (Q1 2027).*
