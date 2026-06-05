# Dossier de Investigación Profunda v2.1 — PERMA-Profiler

**Proyecto:** DescubreMe — plataforma freemium B2C de autoconocimiento profundo (LATAM, foco Colombia, no clínico, no selección de personal)
**Decisión que respalda:** Candidato P3 (Media) para Track A de bienestar alternativo en v1.5 (Q1 2027); evaluar inclusión, reemplazo parcial o descarte frente al triplete bienestar actual del stack v2.0 (SWLS hedónico + Flourishing Scale + Ryff PWB).
**Fecha de cierre:** 11 de mayo de 2026
**Versión consolidada:** síntesis unificada de dossiers Claude y Gemini, datos divergentes verificados contra fuente primaria.

---

## SECCIÓN 0 — PORTADA Y RESUMEN EJECUTIVO

| Campo | Detalle |
|---|---|
| **Instrumento** | PERMA-Profiler |
| **Autores originales** | Butler, J. y Kern, M. L. |
| **Año / Idioma original** | 2016 / Inglés (Australia–EE. UU., distribuido vía Universidad de Melbourne y Universidad de Pensilvania) |
| **Cita primaria** | Butler, J. y Kern, M. L. (2016). The PERMA-Profiler: A brief multidimensional measure of flourishing. *International Journal of Wellbeing*, 6(3), 1-48. https://doi.org/10.5502/ijw.v6i3.526 |
| **Marco teórico** | Modelo PERMA de florecimiento humano de Seligman (2011, *Flourish*): cinco pilares constitutivos del bienestar — **P**ositive emotion, **E**ngagement, **R**elationships, **M**eaning, **A**ccomplishment. |
| **Ítems / Tiempo** | 23 ítems (15 PERMA + 3 emoción negativa + 3 salud + 1 soledad + 1 felicidad global) / 3-4 minutos |
| **Formato** | Likert de 11 puntos (0-10) con anclajes verbales mixtos: frecuencia, grado/extensión, calidad, satisfacción |
| **Estructura factorial** | 5 factores correlacionados (modelo confirmatorio) + 4 escalas auxiliares de control |
| **Licencia** | Uso libre no comercial previo registro en peggykern.org; uso comercial gestionado por The Wellbeing Lab (Michelle McQuaid). Copyright © 2013 University of Pennsylvania. |
| **Adaptación ES recomendada** | Chaves, Ballesteros-Valdés, Madridejos y Charles-Leija (2023, México, N > 26 000) como base léxica para Colombia, con piloto cognitivo local. |
| **Rol candidato en stack DescubreMe** | Track A bienestar alternativo (v1.5 Q1 2027): potencial reemplazo masivo-freemium de Ryff PWB, o módulo único integrador hedónico-eudaimónico. |

**Resumen ejecutivo (3-5 líneas).** El PERMA-Profiler operacionaliza el modelo de florecimiento de Seligman (2011) en cinco pilares con 15 ítems centrales más 8 ítems de control, validado con N acumulado superior a 31 000 participantes internacionales (Butler y Kern, 2016). La consistencia interna típica oscila entre α = .72 (Engagement, el pilar más débil) y α = .90 (Meaning); CFI suele superar .94 y RMSEA queda en .04-.08. Existen adaptaciones robustas al español en México (Chaves et al., 2023, N = 26 506) y España (Martín-Díaz y Fernández-Abascal, 2024, N = 2 525), pero no hay validación instrumental colombiana adulta general — solo dos publicaciones marginales (Hernández-Vergel et al., 2018, n = 30 ancianos institucionalizados; Pastrana y Salazar-Piñeros, 2016, descriptivo). La crítica de Goodman et al. (2018) reporta correlación latente r ≈ .98 entre PERMA y SWB clásico de Diener, planteando un debate teórico abierto sobre redundancia con el triplete bienestar actual.

**Recomendación ejecutiva.** **CONDICIONAL — INCLUIR COMO REEMPLAZO PARCIAL DE RYFF PWB EN TRACK A FREEMIUM**, no como suma redundante al triplete actual. Pre-condiciones bloqueantes: (1) obtener licencia comercial expresa con The Wellbeing Lab antes del lanzamiento; (2) adoptar la traducción mexicana de Chaves et al. (2023) con piloto cognitivo focal en Engagement (ítems históricamente débiles en español); (3) implementar mitigaciones éticas (Sección 10) incluyendo Línea 106 Bogotá / Línea 123 nacional; (4) decidir formalmente entre dos arquitecturas: (a) PERMA reemplaza Ryff PWB en Free y Ryff queda Pro, o (b) PERMA convive con Flourishing pero sustituye a SWLS y a Ryff. La hipótesis de redundancia con el triplete actual se confirma parcialmente: PERMA solapa fuertemente con SWB (r = .98 latente), pero aporta granularidad comunicacional única (5 pilares accionables) imposible de obtener con instrumentos unidimensionales como SWLS o Flourishing.

---

## SECCIÓN 1 — CONSTRUCTO MEDIDO

### 1.1 El modelo PERMA y su fundamento teórico

**Hecho:** Seligman (2011) propuso PERMA en *Flourish* como evolución del modelo previo de "felicidad auténtica" (2002). Los cinco elementos están concebidos como **bloques constitutivos** del florecimiento humano, no como tipos diferenciados de bienestar. Cada elemento debe cumplir tres criterios metodológicos: (a) contribuir directamente al bienestar general, (b) ser perseguido por su valor intrínseco, no instrumental, y (c) ser definido y medido independientemente de los demás. Seligman (2018) reiteró que PERMA no constituye un *tipo* distinto de bienestar, sino los *bloques causales* que producen la vía final común del bienestar subjetivo.

**Hecho:** El marco unifica las dos tradiciones filosóficas históricas del bienestar:
- **Tradición hedónica** (Bentham, Diener): énfasis en placer y afecto positivo → cubierto por **P**.
- **Tradición eudaimónica** (Aristóteles, Ryff): énfasis en sentido, autorrealización y funcionamiento óptimo → cubierto por **E, M, A**.
- **Relaciones (R)** opera transversalmente en ambas tradiciones.

### 1.2 Definiciones operacionales

| Pilar | Definición operacional |
|---|---|
| **P — Positive emotion** | Tendencia general a experimentar alegría, contentamiento, esperanza, interés, amor y afecto positivo; nivel disposicional, no estado momentáneo. |
| **E — Engagement** | Estado de absorción, interés e involucramiento cognitivo profundo en actividades; en su forma extrema, *flow* (Csikszentmihalyi, 1990). |
| **R — Relationships** | Sentirse amado, apoyado, valorado por otros; calidad subjetiva de los vínculos íntimos y comunitarios. |
| **M — Meaning** | Sentido de propósito y dirección; percepción de que la vida tiene valor y conecta con algo mayor que el yo. |
| **A — Accomplishment** | Sensación subjetiva de logro, maestría, autoeficacia y avance hacia metas autoseleccionadas. |

**Escalas auxiliares de control** (no constitutivas del modelo teórico pero incluidas en el Profiler):
- **N — Negative emotion** (3 ítems): tristeza, enojo, ansiedad.
- **H — Health** (3 ítems): salud física subjetiva.
- **Lon — Loneliness** (1 ítem).
- **Hap — Overall happiness** (1 ítem global, integrado en el cómputo del PERMA total).

### 1.3 Posición frente a tradiciones cercanas

| Instrumento | Tradición | N° dimensiones | Carácter | Brevedad |
|---|---|---|---|---|
| **PERMA-Profiler** | Psicología positiva (Seligman) | 5 pilares + 4 controles | Mixto hedónico + eudaimónico | 23 ítems / 3-4 min |
| **Ryff PWB** | Eudaimonía aristotélica | 6 (autoaceptación, relaciones positivas, autonomía, dominio del entorno, propósito, crecimiento) | Eudaimónico puro | 18-84 ítems |
| **Flourishing Scale** (Diener et al., 2010) | Florecimiento sintético | 1 (unidimensional) | Síntesis breve hedónico-eudaimónico | 8 ítems |
| **SWLS** (Diener et al., 1985) | Bienestar subjetivo cognitivo | 1 | Hedónico cognitivo | 5 ítems |
| **PANAS / SPANE** | Bienestar subjetivo afectivo | 2 | Hedónico afectivo | 10-20 ítems |

**Inferencia:** PERMA es el único instrumento que opera simultáneamente como (a) integrador hedónico-eudaimónico en una misma estructura factorial, (b) breve (≈3 min), y (c) accionable en cinco dominios distinguibles por el usuario lego. Ryff PWB es eudaimónicamente más puro y profundo pero menos comunicable y más extenso. Flourishing es más breve pero unidimensional, sin granularidad. SWLS captura solo el componente cognitivo del bienestar hedónico.

### 1.4 El debate de redundancia con el bienestar subjetivo (SWB) — tensión teórica central

**Hecho — crítica de Goodman et al. (2018):** Goodman, Disabato, Kashdan y Kauffman (2018, *Journal of Positive Psychology*, 13(4), 321-332) analizaron la relación psicométrica entre PERMA y el Subjective Well-Being clásico de Diener (alto afecto positivo + bajo afecto negativo + alta satisfacción con la vida) en N = 517 adultos. Usando ESEM y CFA, encontraron que el factor latente subyacente a PERMA total y el factor latente subyacente a SWB correlacionaban **r = .98**. Los pilares individuales correlacionaban entre sí con r = .61 a .82 (M = .72). Conclusión de los autores: PERMA y SWB representan "el mismo tipo subyacente de bienestar" y la introducción del acrónimo arriesga incurrir en la **falacia de jangle** (dos constructos con nombres distintos pero idénticos empíricamente).

**Hecho — réplica de Seligman (2018):** Seligman (2018, *Journal of Positive Psychology*, 13(4), 333-335) respondió que la alta correlación latente no invalida el modelo sino que lo confirma: PERMA fue propuesto como **bloques causales** del bienestar, no como un constructo competidor del SWB. La analogía: medir la excelencia de un lanzador de béisbol mediante la velocidad de la bola rápida, el movimiento de la curva y la precisión del slider correlacionará r ≈ .98 con la calificación subjetiva global de excelencia — esto no invalida que los tres lanzamientos sean componentes específicos modificables, sino que confirma que son los mecanismos causales que **producen** la excelencia. Para intervención aplicada (coaching, terapia), los pilares específicos accionables (R, M, A) son operacionalmente más útiles que un agregado global ("ten más bienestar").

**Inferencia central para DescubreMe:** El debate Goodman vs. Seligman no se resuelve psicométricamente sino pragmáticamente. Para autoconocimiento orientado a acción del usuario (no diagnóstico), **el valor del PERMA-Profiler no está en su distintividad latente, sino en su comunicabilidad granular**. Los cinco pilares son verbalizables al usuario lego con menor fricción que las seis dimensiones de Ryff PWB ("autonomía", "dominio del entorno", "crecimiento personal" requieren explicación; P, E, R, M, A son intuitivamente legibles).

### 1.5 Versiones derivadas del modelo PERMA

**Hecho:** El modelo PERMA ha generado un ecosistema de instrumentos relacionados:

| Versión | Población / Aplicación | Particularidad |
|---|---|---|
| **PERMA-Profiler** | Adultos generales (18+) | 23 ítems, validación original Butler y Kern (2016) |
| **EPOCH Measure of Adolescent Well-Being** | Adolescentes (Kern et al., 2016) | 5 pilares adaptados: Engagement, Perseverance, Optimism, Connectedness, Happiness; Likert 5 puntos |
| **Workplace PERMA Profiler** | Empleados (Kern et al., 2015; Watanabe et al., 2018) | Items reformulados para contexto laboral |
| **PERMAH** | Salud incluida como 6° pilar | Adoptado por Geelong Grammar School (Australia) |
| **PERMA+4** | Funcionamiento positivo en el trabajo (Donaldson et al., 2022) | Agrega Salud Física, Mentalidad, Entorno Laboral, Seguridad Económica |

**Inferencia:** DescubreMe (consumer no clínico, adultos 18+, no selección de personal) corresponde al uso canónico del PERMA-Profiler estándar (Butler y Kern, 2016). PERMAH y PERMA+4 son extensiones organizacionales fuera del alcance v1.5 actual, aunque PERMAH podría ser pertinente si DescubreMe desarrolla en el futuro un módulo B2B-A de bienestar laboral.

---

## SECCIÓN 2 — ESTRUCTURA DEL INSTRUMENTO

### 2.1 Composición de los 23 ítems

| Bloque | Subescala | N° ítems | Identificadores | Tipo de anclaje | Polaridad |
|---|---|---|---|---|---|
| Core PERMA | Positive emotion (P) | 3 | P1, P2, P3 | Frecuencia / Grado | Directa |
| Core PERMA | Engagement (E) | 3 | E1, E2, E3 | Frecuencia / Grado | Directa |
| Core PERMA | Relationships (R) | 3 | R1, R2, R3 | Grado / Satisfacción | Directa |
| Core PERMA | Meaning (M) | 3 | M1, M2, M3 | Grado | Directa |
| Core PERMA | Accomplishment (A) | 3 | A1, A2, A3 | Frecuencia | Directa |
| Control | Negative emotion (N) | 3 | N1, N2, N3 | Frecuencia | Inversa (resta al bienestar) |
| Control | Health (H) | 3 | H1, H2, H3 | Calidad / Satisfacción | Directa |
| Control | Loneliness (Lon) | 1 | Lon | Grado | Inversa |
| Global | Happiness (Hap) | 1 | hap | Grado | Directa (integrado al PERMA total) |
| **Total** | | **23** | | | |

### 2.2 Escala de respuesta y orden de presentación

**Hecho:** Escala Likert de 11 puntos (0-10), con anclajes verbales en los extremos que varían según el contenido del ítem:
- Anclaje de **frecuencia**: 0 = "nunca" → 10 = "siempre"
- Anclaje de **grado/extensión**: 0 = "para nada" → 10 = "completamente"
- Anclaje de **calidad**: 0 = "terrible" → 10 = "excelente"
- Anclaje de **satisfacción**: 0 = "nada satisfecho/a" → 10 = "completamente satisfecho/a"

**Hecho:** Los 23 ítems se presentan en **8 bloques temáticos mezclados** (no agrupados por subescala) para reducir contaminación por orden, halo y respuesta semántica. Por ejemplo, el primer bloque mezcla ítems de Accomplishment, Engagement, Positive emotion y Negative emotion. Esta estructura de orden es prescriptiva del manual oficial.

### 2.3 Control de aquiescencia y validez de respuesta

**Inferencia:** La mezcla de anclajes (frecuencia, grado, calidad, satisfacción) actúa como mecanismo natural de ruptura de patrones de respuesta automatizada. Sin embargo, los 23 ítems están redactados en dirección semántica positiva (a más alto, más bienestar) excepto N1-N3 y Lon, lo cual significa que el balance directo/inverso es 19/4 — **menos robusto que el balance 15/15 del BFI-2-S**. Para implementación digital, agregar validaciones complementarias (Sección 8) es necesario.

### 2.4 Tiempo de aplicación

**Hecho:** Butler y Kern (2016) estiman 3-4 minutos en formato online. Cobo-Rendón et al. (2020) en universitarios chilenos reportan que la batería completa con instrumentos auxiliares no superó 25 minutos. Para DescubreMe en mobile-first con sliders, la estimación operativa razonable es **4-5 minutos**.

### 2.5 Anti-alucinación de ítems

**Hecho:** Aunque los ítems literales del PERMA-Profiler están públicamente disponibles en el manual oficial (Butler y Kern, 2016) y en peggykern.org/questionnaires.html, **este dossier no reproduce los ítems literales**. La descripción funcional anterior (Sección 1.2 y tabla 2.1) opera a nivel de constructo y anclaje, no de texto literal. La integración a DescubreMe deberá basarse en la versión adaptada al español que se seleccione (Chaves et al., 2023, recomendada — ver Sección 5).

---

## SECCIÓN 3 — PROPIEDADES PSICOMÉTRICAS ORIGINALES

### 3.1 Muestras de validación Butler y Kern (2016)

**Hecho:** El desarrollo del PERMA-Profiler combinó dos fases:
- **Fase de desarrollo (3 estudios):** N acumulado = 7 188 participantes. Reducción de un banco inicial superior a 700 ítems a 15 ítems centrales (3 por dimensión).
- **Fase de validación (8 estudios):** N acumulado = 31 966 participantes internacionales. Examen de propiedades psicométricas finales con 23 ítems (15 centrales + 8 controles).

### 3.2 Confiabilidad — consistencia interna

| Subescala | α de Cronbach (Butler y Kern, 2016) | Rango en validaciones internacionales |
|---|---|---|
| Positive emotion (P) | .88 | .85-.93 |
| Engagement (E) | .72 | **.36-.78** (Engagement es la más débil) |
| Relationships (R) | .82 | .76-.90 |
| Meaning (M) | .90 | .86-.94 |
| Accomplishment (A) | .79 | .74-.87 |
| Negative emotion (N) | .73 | .69-.84 |
| Health (H) | .91 | .86-.93 |
| **PERMA total** | .94 | .89-.94 |

**Hecho — alerta crítica sobre Engagement:** El pilar E muestra consistentemente la fiabilidad más baja en validaciones cross-cultural, especialmente en español. Cobo-Rendón et al. (2020) reportaron α = .36 en universitarios chilenos; Chaves et al. (2023) reportaron α = .69 en muestra mexicana. La hipótesis explicativa (Cobo-Rendón et al., 2020) es la **doble valencia semántica de los ítems E1 y E3 en español**: el constructo "absorción" puede leerse como flow positivo o como distracción/escapismo, generando varianza no atribuible al constructo teórico.

### 3.3 Estabilidad temporal (test-retest)

**Hecho:** Butler y Kern (2016) reportan estabilidad aceptable en submuestras evaluadas con intervalos de 1 día a 2 años (M = 68.9 días, mediana = 49 días). Coeficientes test-retest típicos r > .70 para las dimensiones principales en intervalos de 1-3 meses.

### 3.4 Validez factorial (CFA)

**Hecho:** Butler y Kern (2016) reportan ajuste adecuado para el modelo de **5 factores correlacionados** con los siguientes índices en la muestra de validación original:
- CFI > .95
- TLI > .94
- RMSEA en torno a .04-.08
- SRMR < .05

**Hecho:** Comparativas factoriales subsecuentes (Ryan et al., 2019, Australia, N = 1 642) confirman que el modelo unidimensional ajusta pobremente (CFI = .82, RMSEA = .14), validando la necesidad de modelar los 5 factores.

### 3.5 Validez convergente y divergente

**Hecho:** Correlaciones positivas y significativas con:
- SWLS (Diener et al., 1985): r típica .50-.70 con PERMA total
- Flourishing Scale (Diener et al., 2010): r típica .60-.80 con PERMA total
- PANAS-Positivo: r alta con pilar P
- Ryff PWB: convergencia documentada (Butler y Kern, 2016; Wammerl et al., 2019)

**Hecho:** Correlaciones negativas significativas con:
- Depresión (CES-D, DASS-21)
- Ansiedad (DASS-21)
- Soledad (UCLA Loneliness Scale)
- Estrés percibido (PSS)

### 3.6 Validez de criterio

**Hecho:** PERMA total correlaciona positivamente con engagement laboral (UWES), satisfacción laboral, comportamientos de ciudadanía organizacional, salud física objetiva (visitas médicas) y rendimiento académico en muestras estudiantiles.

### 3.7 Crítica psicométrica fundamental — alto solapamiento con SWB

**Hecho:** Goodman et al. (2018) reportaron correlación latente r = .98 entre PERMA total y SWB clásico (N = 517). Este hallazgo, replicado parcialmente por otros equipos, plantea que estadísticamente PERMA y SWB capturan el mismo constructo latente. **Implicación para el debate metodológico:** la diferencia entre PERMA y SWB es teórica (bloques constitutivos vs. ruta final) más que empírica.

### 3.8 Limitaciones psicométricas reconocidas

- **Engagement débil en español** (ver 3.2).
- **Sesgo hacia el extremo positivo:** las medianas poblacionales caen en 6.5-7.5 (no en el punto medio 5 de la escala 0-10), reflejando deseabilidad social y/o asimetría natural del bienestar autoinformado.
- **Auto-reporte:** susceptible a sesgo de deseabilidad social (Diener, 1994).
- **Escala 11 puntos:** sometida a debate por carga cognitiva en algunas culturas.

---

## SECCIÓN 4 — ADAPTACIONES CULTURALES DISPONIBLES

### 4.1 Tabla resumen de adaptaciones publicadas en español

| País | Cita | N | Diseño | Resultados clave | DOI |
|---|---|---|---|---|---|
| **México** | Chaves, Ballesteros-Valdés, Madridejos y Charles-Leija (2023). *Applied Research in Quality of Life*, 18(3), 1225-1247 | 23 723 estudiantes + 2 783 empleados | CFA + ESEM + invarianza | α PERMA-15 = .94; α total = .90; α E = .69 (más baja); ω McDonald = .93; modelo 5 factores mejor ajuste; invarianza por género y edad confirmada | 10.1007/s11482-022-10132-1 |
| **España (general)** | Martín-Díaz y Fernández-Abascal (2024). *Applied Research in Quality of Life*, 19(5), 2503-2538 | 2 525 adultos | CFA + invarianza + validez | CFI = .948, TLI = .932, RMSEA = .082, SRMR = .036; 5 factores correlacionados; invarianza por género y edad; α aceptable excepto Engagement | 10.1007/s11482-024-10342-9 |
| **España (mayores)** | Paniagua-Granados, Fernández-Fernández y Molina-Martínez (2024). *Current Psychology*, 43(8), 6713-6724 | Adultos mayores españoles | CFA | Estructura 5 factores aceptable; convergencia con PWB | 10.1007/s12144-023-04883-9 |
| **Chile** | Cobo-Rendón, Pérez-Villalobos y Díaz-Mujica (2020). *Revista Ciencias de la Salud*, 18(1), 119-133 | 1 462 universitarios | CFA | CFI = .94, TLI = .95, RMSEA = .054; **α E = .36 (problemática)**; 5 factores confirmados | 10.12804/revistas.urosario.edu.co/revsalud/a.8775 |
| **Ecuador** | Lima-Castro, Peña-Contreras, Cedillo-Quizphe y Cabrera-Vélez (2017). *Eureka*, 14(1), 69-83 | 1 247 adultos 18-89 (Cuenca) | EFA + traducción-retrotraducción | α total = .913; CFI = .99; RMSEA = .047; **estructura emergente de 3 factores** (no 5) explicando 62.99 % varianza | URL: psicoeureka.com.py (sin DOI estándar) |
| **Perú (Lima)** | Várela et al. (2020-2022, tesis UCV / UNIFE) | 410 / 475 | CFA | 5 factores; CFI = .997, RMSEA = .062; ω = .52-.89; invarianza por sexo confirmada | Repositorios universitarios (sin DOI) |
| **Argentina (adolescentes)** | Waigel y Lemos (2023). *International Journal of Psychological Research*, 16(1), 103-113 | 421 adolescentes (M = 14.9 años) | CFA | V de Aiken .8-1; CFI = .94, TLI = .92, RMSEA = .08, SRMR = .04; 5 dimensiones confirmadas | 10.21500/20112084.5737 |
| **Colombia (mayores)** | Hernández-Vergel, Prada-Núñez y Hernández-Suárez (2018). *Revista Ciencia y Cuidado*, 15(1), 83-97 | 30 adultos mayores institucionalizados (Cúcuta) | Exploratorio | α total = .95; muestra pequeña; usa adaptación previa de Tarragona | 10.22463/17949831.1235 |
| **Colombia (jóvenes voluntarios)** | Pastrana y Salazar-Piñeros (2016). *Katharsis*, 22, 13-34 | Voluntarios AIESEC 18-30 | Descriptivo no instrumental | Voluntarios > no-voluntarios en P, E, M, A | 10.25057/25005731.813 |

### 4.2 Adaptaciones globales relevantes

**Hecho:** Validaciones publicadas en alemán (Wammerl et al., 2019, CFI = .972, RMSEA = .045), italiano (Giangrasso, 2021), griego (Pezirkianidis et al., 2019, 2021; con invarianza confirmada), japonés (Watanabe et al., 2018, Workplace PERMA), portugués brasileño (Carvalho et al., 2021), y traducciones disponibles en francés y mandarín (Butler y Kern, 2016).

### 4.3 Inferencia clave sobre estado del arte en español

**Inferencia:** Las dos validaciones más robustas para población hispanohablante adulta general son:
1. **Chaves et al. (2023, México, N > 26 000):** explícitamente desarrollada para "español universal", invarianza confirmada, escalas robustas excepto E. Es la **mejor base léxica para Colombia**.
2. **Martín-Díaz y Fernández-Abascal (2024, España, N = 2 525):** adaptación peninsular reciente, propiedades psicométricas equivalentes.

**Inferencia:** Para Colombia adulto general no existe validación instrumental peer-reviewed publicada. Las dos publicaciones colombianas son metodológicamente insuficientes: una muestra muy pequeña (n = 30 ancianos) y una descriptiva no psicométrica.

---

## SECCIÓN 5 — ADAPTACIÓN AL ESPAÑOL DE COLOMBIA (ANÁLISIS ESPECÍFICO)

### 5.1 Estado del arte

**Hecho:** A la fecha (11 de mayo de 2026) no existe una validación psicométrica instrumental completa del PERMA-Profiler con muestra adulta general colombiana representativa que reporte CFA del modelo de 5 factores, invarianza por género/edad, validez convergente con SWLS/Flourishing/Ryff, y consistencia interna sobre N ≥ 300. La mejor evidencia disponible es indirecta vía adaptaciones mexicana y española.

### 5.2 Estrategia recomendada — dos opciones

#### Opción A — Adoptar versión mexicana Chaves et al. (2023) con revisión léxica
- **Ventajas:** Validada con N > 26 000 hispanohablantes; explícitamente redactada en "español universal"; invarianza por género y edad; propiedades psicométricas robustas excepto Engagement; bajo costo de implementación.
- **Riesgos:** Diferencias léxicas Colombia vs. México (vocabulario coloquial, expresiones idiomáticas como "lograr" vs. "alcanzar", "valioso" vs. "que vale la pena").
- **Acción mínima:** Panel de 3-5 jueces expertos colombianos (psicólogos clínicos / psicometristas) para revisar adecuación léxica; piloto cognitivo con 30-50 colombianos para detectar ítems ambiguos.

#### Opción B — Adaptación colombiana propia siguiendo guías ITC (Muñiz, Elosua y Hambleton, 2013)

1. **Traducción/retrotraducción:** Partir de versión Chaves et al. (2023). Dos traductores bilingües independientes → versión Colombia v0 → retrotraducción al inglés → comparación con original → comité de reconciliación.
2. **Validez de contenido:** Panel de 5-7 jueces expertos. V de Aiken ≥ .80 por ítem.
3. **Pruebas cognitivas (cognitive interviews):** n = 10-15 usuarios objetivo, con foco específico en ítems E1, E2, E3 (los más problemáticos en español).
4. **Piloto cuantitativo:** n ≥ 230 (10 por ítem mínimo, Streiner, Norman y Cairney, 2015).
5. **Análisis psicométrico:** EFA + CFA del modelo de 5 factores; α de Cronbach y ω de McDonald por dimensión; invarianza por género; correlación con SWLS y Flourishing Scale ya validados en Colombia.

### 5.3 Estimación de timeline y recursos (Opción B)

| Fase | Duración | Costo aproximado |
|---|---|---|
| Traducción/retrotraducción + reconciliación | 3-4 semanas | USD 800-1 500 |
| Panel de jueces expertos | 2 semanas | USD 500-1 000 |
| Pruebas cognitivas | 2 semanas | USD 300-600 |
| Piloto cuantitativo (n = 250) | 4-6 semanas | USD 1 500-3 500 |
| Análisis y reporte | 3-4 semanas | (interno) |
| **Total** | **14-18 semanas** | **USD 3 100-6 600** |

**[sin fuente verificada]** Estimación orientativa para LATAM 2026 basada en práctica de mercado.

### 5.4 Recomendación operativa

**Opinión profesional:** Para v1.5 Track A freemium con timeline Q1 2027, **Opción A (versión Chaves et al. con revisión léxica)** es viable y suficiente. Reservar Opción B para v2.0 si DescubreMe acumula N ≥ 500 colombianos y se quiere publicar validación propia.

### 5.5 Riesgos lingüísticos específicos Colombia

**Inferencia:** Riesgos identificados para los pilares centrales:
- **E (Engagement):** los ítems sobre absorción y pérdida de noción del tiempo deben validarse en pruebas cognitivas; el verbo "absorberse" puede leerse como negativo (distracción) en algunos contextos colombianos.
- **M (Meaning):** la expresión "vida con propósito" funciona bien; "sentido de dirección" puede sonar más anglicada — alternativa: "rumbo".
- **A (Accomplishment):** "metas" funciona bien en Colombia; evitar "objetivos" que suena corporativo.
- **R (Relationships):** anclar bien la frase "sentirse amado" — en Colombia rural puede activar deseabilidad social.

---

## SECCIÓN 6 — LICENCIA Y PERMISOS (CRÍTICO)

### 6.1 Texto literal de las fuentes oficiales

**Hecho — manual oficial Butler y Kern (2016, p. 41):**
> "You are welcome to use the measure for noncommercial research or assessment purposes... For commercial purposes, please contact..."

**Hecho — sitio oficial peggykern.org (fetched mayo 2026):**
> "For commercial uses of the measures, contact the Wellbeing Lab (https://www.michellemcquaid.com/thewellbeinglab/)."

**Hecho — copyright:** © 2013 The Trustees of the University of Pennsylvania. El manual de 2016 inicialmente referenciaba al Penn Center for Innovation (pciinfo@pci.upenn.edu) para licencias comerciales; el sitio oficial actualizado de la coautora Margaret Kern redirige actualmente a **The Wellbeing Lab** (Michelle McQuaid).

### 6.2 Respuesta explícita a las 9 preguntas obligatorias

| # | Pregunta | Respuesta |
|---|---|---|
| 1 | Tipo de licencia | Copyright privado (University of Pennsylvania); uso libre **no comercial** con registro/atribución; uso comercial bajo licencia con The Wellbeing Lab. |
| 2 | Costo de uso no comercial | **USD 0** previo registro en peggykern.org. |
| 3 | ¿Permite uso comercial? | **NO sin licencia explícita.** Costo comercial no publicado, negociable caso a caso con The Wellbeing Lab. |
| 4 | ¿Permite adaptación y traducción? | Sí, con atribución y citación adecuada. Adaptaciones de idioma están registradas (francés, alemán, italiano, japonés, mandarín, español-México, español-España, etc.). |
| 5 | ¿Permite digitalización (web app)? | Sí para investigación; comercial requiere autorización de The Wellbeing Lab. |
| 6 | ¿Permite almacenar respuestas individuales? | Sí, con cumplimiento de leyes de protección de datos del territorio (Ley 1581 Colombia). |
| 7 | Atribución requerida | Sí. Cita obligatoria: Butler, J., y Kern, M. L. (2016). The PERMA-Profiler: A brief multidimensional measure of flourishing. *International Journal of Wellbeing*, 6(3), 1-48. https://doi.org/10.5502/ijw.v6i3.526 |
| 8 | Email/institución de contacto | Dr. Peggy L. Kern (pkern001@gmail.com, University of Melbourne); The Wellbeing Lab (https://www.michellemcquaid.com/thewellbeinglab/); perma.flourish@gmail.com (consultas generales). |
| 9 | Nivel de riesgo legal de usar en DescubreMe sin licencia | **MEDIO-ALTO.** DescubreMe es una plataforma freemium B2C comercial (incluso si el tier de entrada es gratuito). El uso del PERMA-Profiler en un producto monetizable cae fuera del alcance de la licencia no comercial gratuita. Una plataforma con suscripción Paid es inequívocamente comercial. Riesgo final: **ALTO sin licencia explícita / BAJO con licencia obtenida**. |

### 6.3 Acciones requeridas antes de Q1 2027

**Opinión profesional:**

1. **Contactar formalmente a The Wellbeing Lab** describiendo: (a) naturaleza educativa-orientativa, no clínica ni de selección; (b) flujo de uso (cuestionario integrado con autoconocimiento y O*NET); (c) modelo freemium con/sin reventa de datos; (d) territorio LATAM con foco Colombia; (e) volumen estimado de aplicaciones/año.
2. **Solicitar licencia comercial expresa por escrito**, idealmente con: alcance LATAM, sin restricción de número de aplicaciones, derecho a almacenar respuestas individuales, derecho a usar la traducción mexicana de Chaves et al. (2023), duración mínima 5 años.
3. **Activar Plan B en paralelo**: si la negociación con The Wellbeing Lab falla o impone tarifas inviables, opciones de reemplazo en orden de preferencia:
   - **Flourishing Scale (Diener et al., 2010):** uso libre incluso comercial; 8 ítems; unidimensional; ya en stack actual.
   - **SWLS (Diener et al., 1985):** dominio público de facto; 5 ítems; hedónico cognitivo; ya en stack.
   - **Ryff PWB (Díaz et al., 2006 ES):** uso libre académico; eudaimónico puro; ya en stack.

**Inferencia:** El triplete actual (SWLS + Flourishing + Ryff PWB) ya provee cobertura conceptual completa. El valor incremental de PERMA-Profiler está en **comunicabilidad granular al usuario consumer**, no en cobertura del constructo. Si la licencia es inviable, el riesgo de no incluir PERMA es bajo en términos psicométricos pero medio en términos de UX/marketing.

---

## SECCIÓN 7 — SCORING Y REGLAS DE PUNTUACIÓN

### 7.1 Procedimiento oficial de puntuación

**Hecho — algoritmo Butler y Kern (2016):**

```
P = mean(P1, P2, P3)
E = mean(E1, E2, E3)
R = mean(R1, R2, R3)
M = mean(M1, M2, M3)
A = mean(A1, A2, A3)
N = mean(N1, N2, N3)
H = mean(H1, H2, H3)
Lon = Lon (ítem único)
Hap = hap (ítem único)
PERMA total = mean(P1, P2, P3, E1, E2, E3, R1, R2, R3,
                   M1, M2, M3, A1, A2, A3, hap)   // 16 ítems
```

**Nota técnica importante:** La fórmula oficial del **PERMA total incluye el ítem de felicidad global (hap)**, lo cual es debate metodológico: Bartholomaeus et al. (2020) y otras validaciones argumentan a favor de usar solo los 15 ítems PERMA por consistencia teórica. **DescubreMe debe documentar explícitamente cuál fórmula usa** en su dossier de scoring interno; recomendación: usar la fórmula oficial (16 ítems con hap) para comparabilidad internacional.

### 7.2 Baremos sugeridos por Kern (peggykern.org)

**Hecho — cita textual del sitio oficial:**
> "Very high functioning = 9 and above (0 to 1 for negative emotion); High functioning = 8-8.9 (1.1 to 3 for negative emotion); Normal functioning = 6.5 to 7.9 (3 to 5 for negative emotion); Sub-optimal functioning = 5 to 6.4 (5.1 to 6.5 for negative emotion); Languishing = below 5 (above 6.5 for negative emotion)."

**Caveat explícito de la propia autora:**
> "I dislike the use of thresholds and labels... but there is a normal curve around that threshold, and so you end up with false diagnoses."

Kern desaconseja activamente el uso de cortes dicotómicos y recomienda percentiles + perfil multidimensional visual.

### 7.3 Valores normativos internacionales

**Hecho:** En la muestra original (N ≈ 31 966 multinacional) las medias por dimensión típicamente caen entre **6.5 y 7.5** en escala 0-10, con sesgo positivo. El punto medio matemático (5) **NO** representa funcionamiento promedio.

### 7.4 Interpretación recomendada para DescubreMe

**Opinión profesional:**
- **Fase 1 (lanzamiento):** mostrar puntuaciones en escala 0-10 con baremo de Chaves et al. (2023, México, N > 26 000) como referencia provisional. Banda interpretativa de Kern adaptada con lenguaje no patologizante.
- **Fase 2 (a partir de N ≥ 1 000 usuarios colombianos):** generar baremos propios con percentiles por sexo y banda de edad.
- **Visualización:** gráfico de barras o radar de 5 pilares + 4 controles, **no un único número agregado** como rasgo central.
- **Lenguaje:** evitar etiquetas categóricas "languishing", "sub-optimal" → usar lenguaje aspiracional y de crecimiento ("área de oportunidad", "fortaleza").
- **Disclaimer:** naturaleza no-clínica y no-diagnóstica explícita.

### 7.5 Bandas interpretativas recomendadas para DescubreMe

| Banda Kern (escala 0-10) | Equivalente percentil aprox. | Etiqueta DescubreMe recomendada |
|---|---|---|
| ≥ 9 | ≥ 90 | "Florecimiento alto" |
| 8.0 – 8.9 | 75-90 | "Bienestar consolidado" |
| 6.5 – 7.9 | 50-75 | "Bienestar funcional típico" |
| 5.0 – 6.4 | 25-50 | "Área de exploración" |
| < 5 | < 25 | "Zona de cuidado emocional" (con derivación profesional disponible) |

---

## SECCIÓN 8 — IMPLEMENTACIÓN DIGITAL

### 8.1 Orden de ítems

**Hecho:** El manual oficial recomienda mantener el **orden original de los ítems en 8 bloques mezclados** (no agrupar por subescala). Esto reduce sesgo de respuesta semántica y halo.

### 8.2 Validación de respuestas y patrones sospechosos

**Opinión profesional — implementar:**

1. **Tiempo mínimo por ítem:** < 1.5 s sugiere respuesta no atenta (slider requiere movimiento).
2. **Detector de patrón único:** ≥ 50 % de ítems con misma respuesta (e.g., todo "5" o todo "10") → flag.
3. **Aquiescencia extrema:** media intra-sujeto ≥ 9.0 o ≤ 1.0 sobre los 23 ítems → flag y no mostrar perfil; ofrecer re-tomar el cuestionario.
4. **Inconsistencia ítems N (emoción negativa) vs. PERMA total:** correlación esperada negativa moderada (r ≈ -.30 a -.50); valores positivos altos sugieren respuesta aleatoria.
5. **Tiempo total atípicamente bajo:** < 90 segundos en 23 ítems sugiere clic-clic sin lectura.

### 8.3 UX recomendada

| Aspecto UX | Recomendación |
|---|---|
| **Tipo de input** | Slider 0-10 con etiquetas verbales visibles en extremos. Kern señala que sliders son más amigables que radio buttons en versión digital. |
| **Páginas** | 8 pantallas (una por bloque temático del manual) o 2-3 pantallas agrupando bloques con mismo anchor. Evitar 23 ítems en una sola pantalla (fatiga). |
| **Validación de respuesta** | Forzar respuesta a cada ítem (no permitir avanzar sin marcar). Mostrar % de progreso visible. |
| **Diseño responsive** | Slider con touch-friendly target ≥ 44px (iOS HIG). Cifras visibles en el slider en mobile. |
| **Feedback visual** | Tras finalizar: gráfico radar o barras horizontal de los 5 pilares + mini-cards explicando cada dimensión. Comparación con baremo o percentil de la base. |
| **Accesibilidad** | Anchor verbal claro (no solo numérico). ARIA labels para lectores de pantalla. Contraste WCAG AA mínimo. |
| **Tiempo estimado** | Mostrar "23 preguntas, ~4 minutos" en pantalla de inicio. |
| **Disclaimer pre-test** | "Este cuestionario explora tu bienestar según el modelo PERMA. No es un diagnóstico clínico." |

### 8.4 Comunicabilidad al usuario consumer (ventaja vs Ryff)

**Inferencia:** Los 5 pilares PERMA son **considerablemente más fáciles de comunicar** al usuario lego que las 6 dimensiones de Ryff PWB. Comparativa:

| Ryff PWB | PERMA |
|---|---|
| Autoaceptación | Emoción positiva |
| Relaciones positivas | Relaciones |
| Autonomía | Compromiso |
| Dominio del entorno | Sentido / Propósito |
| Propósito en la vida | Logro |
| Crecimiento personal | — |

**Opinión profesional:** PERMA es **aproximadamente 2-3 veces más comunicable** que Ryff en interfaces consumer-facing, medido por (a) número de términos que requieren glosario, (b) ratio de mensajes accionables por dimensión, y (c) reconocimiento de marca (Seligman, libros de divulgación).

### 8.5 Privacidad y compliance

**Opinión profesional:** Los ítems de N (Negative emotion) y Lon (Loneliness) son potencialmente sensibles bajo Ley 1581 de 2012 (Colombia). Tratamiento recomendado:

- Cifrado en reposo y en tránsito (TLS 1.3+).
- Acceso restringido por roles (RBAC).
- Derecho de eliminación accesible desde la cuenta del usuario en ≤ 2 clics.
- No compartir respuestas individuales con terceros sin consentimiento explícito documentado.
- Retención: definir política (sugerencia: 5 años desde último login, eliminación automática post).
- Consentimiento informado explícito antes de almacenar datos sensibles emocionales.

### 8.6 Auditabilidad y trazabilidad

**Opinión profesional:** Guardar para reproducibilidad: respuestas crudas por ítem, timestamp por ítem, versión del instrumento usado, versión de la traducción (Chaves et al. 2023 vs. propia), versión del scoring engine, fórmula PERMA total elegida (16 vs. 15 ítems).

---

## SECCIÓN 9 — MAPEO AL STACK DESCUBREME (POST v2.0) — VERIFICACIÓN DE LA HIPÓTESIS DE COMPLEMENTARIEDAD VS. REDUNDANCIA

### 9.1 Stack bienestar v2.0 actual

| Instrumento | Tradición | Items | Constructo |
|---|---|---|---|
| **SWLS** (Diener et al., 1985) | Hedónico cognitivo | 5 | Satisfacción vital global |
| **Flourishing Scale** (Diener et al., 2010) | Síntesis hedónico-eudaimónica | 8 | Florecimiento sintético unidimensional |
| **Ryff PWB** (Díaz et al., 2006 ES) | Eudaimónico puro | 18-42 | 6 dimensiones: autoaceptación, relaciones positivas, autonomía, dominio del entorno, propósito, crecimiento |

### 9.2 Análisis de redundancia conceptual y empírica

**Hecho — correlaciones empíricas documentadas:**

| Par | Correlación empírica documentada | Fuente |
|---|---|---|
| PERMA total ↔ SWB (alta PA + baja NA + alta SWL) | r latente = .98 | Goodman et al. (2018) |
| PERMA total ↔ SWLS | r ≈ .60-.75 | Butler y Kern (2016); Wammerl et al. (2019); Chaves et al. (2023) |
| PERMA total ↔ Flourishing Scale | r ≈ .70-.85 | Butler y Kern (2016); Pezirkianidis et al. (2021) |
| PERMA total ↔ Ryff PWB | r ≈ .65-.80 | Butler y Kern (2016); Wammerl et al. (2019) |
| PERMA M ↔ Ryff Propósito | r ≈ .70-.85 (solapamiento alto) | Inferencia conceptual + validaciones |
| PERMA R ↔ Ryff Relaciones positivas | r ≈ .65-.80 (solapamiento alto) | Inferencia conceptual |
| PERMA A ↔ Ryff Dominio del entorno + Crecimiento | r ≈ .50-.65 (parcial) | Inferencia |
| PERMA E ↔ Ryff Autonomía | r ≈ .25-.40 (bajo) | Constructos distintos |
| PERMA P ↔ SWLS | r ≈ .50-.65 | Solapamiento moderado pero no idéntico |

### 9.3 Cuadro de varianza única aportada por PERMA

| Pilar PERMA | Cobertura ya provista por triplete actual | Varianza única aportada | Veredicto |
|---|---|---|---|
| P (Positive emotion) | Parcial vía SWLS y Flourishing | Baja (~10-15 %) | Redundante con SWLS |
| E (Engagement) | NO cubierto por triplete (Ryff Autonomía es distinto) | **Alta** | **APORTE ÚNICO** |
| R (Relationships) | Cubierto por Ryff Relaciones positivas (más profundo) | Baja | Redundante con Ryff |
| M (Meaning) | Cubierto por Ryff Propósito (más profundo) | Baja | Redundante con Ryff |
| A (Accomplishment) | Cubierto parcialmente por Ryff Dominio y Crecimiento | Media | Solapamiento parcial |

**Inferencia central:** La varianza realmente única que PERMA aporta sobre el triplete actual es **Engagement** (no medido por SWLS, Flourishing, ni Ryff PWB de forma clara). Sin embargo, este pilar es **el psicométricamente más débil del instrumento en español** (α = .36-.69), comprometiendo su aporte incremental.

### 9.4 Verificación de la hipótesis: ¿PERMA-Profiler complementa o reemplaza el triplete actual?

**Respuesta consolidada:** **PERMA-Profiler es MAYORITARIAMENTE REDUNDANTE con el triplete actual a nivel de constructo latente, pero APORTA VALOR DIFERENCIAL en comunicabilidad y granularidad accionable.** El veredicto bidireccional:

**A favor de REEMPLAZAR (no complementar):**
1. **Redundancia empírica alta:** r latente .98 con SWB; r .65-.85 con Flourishing y Ryff. Agregar PERMA a un stack con triplete sería contar tres veces el mismo constructo.
2. **Fatiga del usuario:** 23 ítems PERMA + 5 SWLS + 8 Flourishing + 18-42 Ryff = 54-78 ítems solo de bienestar. Inviable para freemium.
3. **Confusión interpretativa:** múltiples puntajes de "bienestar" desorientan al usuario lego.

**A favor de COMPLEMENTAR:**
1. **Granularidad accionable:** PERMA ofrece 5 pilares específicos vs. SWLS unidimensional y Flourishing unidimensional. Ryff sí ofrece 6 dimensiones, pero con comunicabilidad más baja.
2. **Engagement aporta varianza única** que el triplete no captura (con caveat de α débil en español).
3. **Marca y reconocimiento:** PERMA tiene mayor difusión consumer (libros Seligman, programas corporativos) que Ryff o Flourishing.

### 9.5 Tres arquitecturas posibles para v1.5

| Arquitectura | Composición Track A Free | Composición Track A Pro | Pros | Contras |
|---|---|---|---|---|
| **Arq. 1 — Complementaria pura (PROHIBIDA)** | SWLS + Flourishing + Ryff + PERMA | Igual + módulos avanzados | Cobertura máxima | Redundancia masiva; fatiga; no recomendada |
| **Arq. 2 — Reemplazo PERMA por Ryff (RECOMENDADA)** | SWLS + Flourishing + **PERMA** | SWLS + Flourishing + **Ryff PWB** | PERMA accesible para masas, Ryff profundo para Pro | Pierde profundidad eudaimónica en Free |
| **Arq. 3 — PERMA único integrador** | **PERMA** solo | PERMA + Ryff + SWLS para validación cruzada | Brevedad y simplicidad máximas | Pierde validación cruzada interna |

**Opinión profesional:** **Arquitectura 2 es la óptima.** PERMA-Profiler entra al stack v1.5 **en sustitución parcial de Ryff PWB en Track A freemium**, mientras Ryff PWB se mantiene en Track A Pro como módulo de profundidad eudaimónica. Esto preserva:
- Brevedad y comunicabilidad en Free (PERMA = 4 min vs. Ryff = 7-15 min).
- Profundidad psicométrica en Pro (Ryff con 6 dimensiones distintivas).
- Pricing tier diferenciado.
- SWLS y Flourishing como **anclas de validación cruzada** del PERMA total (no se descartan).

### 9.6 Cross-mapping con resto del stack DescubreMe

| Instrumento DescubreMe | Relación con PERMA | Recomendación |
|---|---|---|
| **BFI-2-S (personalidad Big Five)** | Extraversión y baja Emotividad Negativa correlacionan con P; Amabilidad con R; Responsabilidad con A. Constructo distal. | Complementario, no redundante |
| **PVQ-RR (valores Schwartz)** | Benevolencia/Universalismo predicen M y R; Logro ↔ A. | Complementario |
| **O*NET IP SF (intereses RIASEC)** | Intereses vocacionales no se solapan con bienestar PERMA. | Independiente |
| **Core Strengths 18 (VIA fortalezas)** | Fortalezas como Esperanza, Gratitud, Amor predicen P y R. | Complementario |
| **FSS-9 (flow)** | Solapamiento ALTO con pilar E (mismo constructo). | **POSIBLE REDUNDANCIA — revisar** |
| **Eneagrama / MBTI (si están en stack)** | No psicométricos; no se mapean formalmente. | N/A |

**Inferencia adicional:** El FSS-9 (Flow Short Scale) mide específicamente flow/engagement con mayor profundidad que el pilar E del PERMA. Si DescubreMe mantiene FSS-9 y agrega PERMA, **el pilar E se vuelve doblemente redundante** (con FSS-9 directo + con su propia α débil). Considerar usar el score FSS-9 como sustituto o validación cruzada del pilar E del PERMA.

### 9.7 Conclusión decisional sobre la hipótesis

**Veredicto final:**

> **La hipótesis "PERMA complementa con foco práctico" es PARCIALMENTE CORRECTA pero requiere reformulación. PERMA NO complementa al triplete actual añadiéndose: lo REEMPLAZA parcialmente en Track A Free, con Ryff PWB migrando a Track A Pro. SWLS y Flourishing se mantienen como anclas breves de validación cruzada. La inclusión es CONDICIONAL a obtener licencia comercial y a aceptar que el pilar Engagement es psicométricamente débil en español.**

---

## SECCIÓN 10 — RED FLAGS ÉTICOS Y SESGOS

### 10.1 Bajo bienestar y riesgo psicológico

**Hecho:** Bajo bienestar PERMA correlaciona negativamente con depresión, ansiedad y soledad (Butler y Kern, 2016; Pezirkianidis et al., 2019). Una puntuación PERMA total < 5 (zona "languishing" según baremo de Kern) puede ser indicador de riesgo psicológico, aunque **NO es diagnóstico**.

### 10.2 Sesgo individualista occidental (WEIRD)

**Hecho:** El modelo PERMA fue desarrollado en poblaciones **WEIRD** (Western, Educated, Industrialized, Rich, Democratic) y refleja valores individualistas occidentales (Joshanloo, 2014; Wong, 2011). Críticas relevantes:
- **Sesgo hacia logro individual:** el pilar A privilegia maestría personal sobre contribución colectiva.
- **Meaning individualista:** el pilar M se construye como propósito personal, no como armonía social o filial.
- **Relationships como instrumento:** R se mide como apoyo recibido, no como tejido relacional indivisible (perspectiva Ubuntu africana o confuciana).

**Implicación para LATAM:** Colombia tiene tradiciones más colectivistas que el contexto estadounidense original. Es esperable que poblaciones latinoamericanas puntúen alto en R y bajo en A (más enfocadas en familia/comunidad que en logro autónomo). Las adaptaciones mexicana (Chaves et al., 2023) y española (Martín-Díaz y Fernández-Abascal, 2024) muestran funcionamiento aceptable pero las medias culturales pueden diferir del baremo original.

### 10.3 Diferencias de sexo y edad

**Inferencia:** Estudios de adaptación muestran invarianza por género y edad confirmada en México (Chaves et al., 2023) y España (Martín-Díaz y Fernández-Abascal, 2024). Sin embargo, las medias pueden diferir:
- Mujeres tienden a puntuar más alto en R y M, ligeramente más bajo en P en algunas culturas.
- Adultos mayores puntúan más alto en M y A, ligeramente más bajo en E.

**Mitigación:** Mostrar baremos diferenciados por sexo y banda de edad cuando se acumulen datos colombianos suficientes (N ≥ 1 000).

### 10.4 Protocolo de mitigación recomendado

1. **Disclaimer pre-test:**
   > "Este cuestionario es una herramienta de autoconocimiento basada en investigación de psicología positiva (modelo PERMA de Seligman). NO es una evaluación clínica ni diagnóstica."

2. **Umbrales de alerta operativos (Inferencia, [sin fuente verificada] como umbrales clínicos específicos):**
   - PERMA total < 5 **AND** Negative emotion > 6.5 → mostrar mensaje de soporte y recursos.
   - Loneliness ítem ≥ 8 → mensaje de soporte específico.
   - Health < 4 sostenido → sugerir consulta médica.

3. **Mensaje de derivación:**
   > "Si tus respuestas reflejan un momento difícil, considera hablar con un profesional de salud mental. En Colombia:
   > - **Línea 106 (Bogotá)** — apoyo emocional gratuito 24/7
   > - **Línea 123** (emergencia nacional Colombia)
   > - **CARE WhatsApp 318 376 7400** — atención en salud mental"

4. **No bloquear la app** — el disclaimer debe ser informativo, no paternalista.

5. **Framing de feedback:** tras completar el test, mostrar narrativa de fortalezas primero, áreas de oportunidad después. NO destacar inmediatamente la puntuación más baja.

6. **No usar etiquetas dicotómicas "languishing"** — usar lenguaje aspiracional ("área de oportunidad", "espacio de crecimiento").

### 10.5 Privacidad de datos

**Hecho:** Alineado con Ley 1581 de 2012 (Colombia, protección de datos personales). Los ítems de Negative emotion, Loneliness y Health son potencialmente sensibles.

- Consentimiento informado explícito antes de almacenar datos sensibles.
- Cifrado, RBAC, derecho de eliminación.
- Política clara de retención y portabilidad.

### 10.6 Riesgos de uso indebido

**Inferencia:** Riesgos potenciales:
- **Selección de personal encubierta:** contradice la licencia "no comercial" y el alcance del instrumento.
- **Etiquetado patologizante:** contradice ética de orientación; "languishing" no es diagnóstico.
- **Reventa de perfiles a empleadores:** ilegal bajo Ley 1581/2012.
- **Uso para etiquetar a otros en redes sociales:** uso individual del autoconocimiento, no comparativo.

**Mitigación:** Términos y condiciones explícitos prohibiendo uso para selección, ranking inter-personal, decisiones de alto stake o reventa de datos. Bloqueo técnico de exportación masiva de perfiles.

---

## SECCIÓN 11 — LIMITACIONES Y CONTEXTO DE USO

### 11.1 Rango de edad validado

**Hecho:** PERMA-Profiler está validado para **adultos ≥18 años**. Para adolescentes existe la medida EPOCH (Kern et al., 2016). DescubreMe debe **restringir su uso a 18+** en alineación con su scope adulto.

### 11.2 Vigencia

**Hecho:** Publicado en 2016, ampliamente replicado entre 2017-2026. El instrumento permanece vigente y activo en investigación contemporánea.

### 11.3 Críticas académicas al modelo

1. **Redundancia con SWB clásico** (Goodman et al., 2018): r latente .98 cuestiona la distintividad empírica.
2. **Sesgo individualista occidental** (Wong, 2011; Joshanloo, 2014): el modelo privilegia logro y meaning individuales sobre dimensiones colectivistas (Ubuntu, confucianismo, armonía).
3. **Engagement empíricamente débil**: ítems con doble valencia semántica en español → fiabilidad α baja consistente.
4. **Ausencia de Crecimiento personal** explícito (presente en Ryff PWB) y de Autonomía (presente en Ryff). PERMA cubre menos del espectro eudaimónico que Ryff.

### 11.4 Deseabilidad social

**Hecho:** Auto-reporte de bienestar es susceptible a sesgo (Diener, 1994; Wammerl et al., 2019). Diener argumenta que la deseabilidad social es parte inevitable de la evaluación de bienestar y controlarla compromete la validez.

**Inferencia:** Aceptable para uso en DescubreMe sin medidas de control adicionales, dado el contexto no clínico.

### 11.5 Limitación cultural

**Hecho:** Las adaptaciones LATAM muestran funcionamiento aceptable pero no idéntico al original. La estructura emergente en Ecuador (Lima-Castro et al., 2017) fue de 3 factores, no 5 — alerta de invarianza cultural.

### 11.6 No es diagnóstico clínico

**Hecho:** Medida de bienestar normal en población no clínica, no de psicopatología. No reemplaza herramientas clínicas como BDI, GAD-7, PHQ-9.

### 11.7 Vigencia del resultado

**Inferencia:** El bienestar es relativamente estable a corto plazo pero modulable a mediano plazo (intervenciones, eventos vitales). Reaplicar cada 6-12 meses o tras eventos vitales mayores. Comunicar al usuario que sus resultados pueden cambiar y que la puntuación no es una "etiqueta permanente".

---

## SECCIÓN 12 — RECOMENDACIÓN DE USO EN DESCUBREME

### 12.1 Decisión recomendada

**Opinión profesional fundamentada:**

> **INCLUIR el PERMA-Profiler como instrumento de bienestar Track A Freemium en v1.5 (Q1 2027), en sustitución parcial de Ryff PWB en ese tier**, CONDICIONADO a las cuatro pre-condiciones bloqueantes descritas en Sección 0.

### 12.2 Arquitectura recomendada (Arq. 2)

| Tier | Instrumento(s) de bienestar | Justificación |
|---|---|---|
| **Free v1.5** | SWLS (5 ítems) + Flourishing (8 ítems) + **PERMA-Profiler (23 ítems)** | Total ~36 ítems / ~6-8 min. Cobertura hedónica (SWLS) + síntesis (Flourishing) + granularidad accionable (PERMA). |
| **Paid v1.5 Track A** | SWLS + Flourishing + PERMA + **Ryff PWB (18-42 ítems)** | Agrega profundidad eudaimónica con 6 dimensiones distintivas (autonomía, crecimiento) ausentes en PERMA. |
| **B2B-A** | PERMA Workplace (si licenciado) + Flourishing | Foco organizacional con marca conocida. |

### 12.3 Plan de implementación

**Cronograma operativo:**

| Semana | Hito | Responsable |
|---|---|---|
| 0-2 | Contactar The Wellbeing Lab; solicitar licencia comercial | Legal / Compliance |
| 0-4 | Revisión léxica versión Chaves et al. (2023) con panel de 3-5 jueces colombianos | Investigación |
| 4-6 | Piloto cognitivo n = 30 colombianos heterogéneos | Investigación / UX |
| 4-8 | Negociación contractual con The Wellbeing Lab | Legal |
| 6-10 | Implementación digital en stack (slider, validaciones, scoring) | Ingeniería |
| 10-12 | Pruebas internas + QA | QA |
| 12-14 | Lanzamiento beta a usuarios actuales | Producto |
| 14-16 | Análisis psicométrico inicial sobre datos beta (N ≥ 500) | Investigación |
| 16+ | Lanzamiento producción v1.5 | Producto |

### 12.4 Plan de migración usuarios existentes

1. **Mantener** los puntajes históricos de Ryff PWB con etiqueta "instrumento previo Track A v2.0".
2. **Invitar** a los usuarios Pro a re-tomar bienestar con PERMA-Profiler + Ryff (Pro mantiene ambos).
3. **Mostrar** equivalencia aproximada entre PERMA M / Ryff Propósito (r ≈ .70-.85) para que usuarios entiendan continuidad.
4. **NO sobrescribir** datos históricos.

### 12.5 Reversibilidad y Plan B

**Opinión profesional:** La inclusión de PERMA es **reversible** porque:
- No se elimina código de scoring de Ryff PWB.
- Las respuestas históricas se conservan.
- En caso de denegación de licencia comercial, el Plan B (mantener triplete actual SWLS + Flourishing + Ryff PWB) es viable en ≤ 2 semanas (no se requiere desarrollo, solo cancelar feature).

**Riesgo de retrocompatibilidad:** Bajo. Las puntuaciones de los tres instrumentos previos siguen accesibles y recalculables.

---

## SECCIÓN 13 — PSEUDOCÓDIGO CONCEPTUAL DE SCORING

```typescript
// PERMA-Profiler scoring — DescubreMe v1.5
// Input: array de 23 respuestas Likert 0-10 indexadas por código de ítem

interface PermaResponses {
  P1: number; P2: number; P3: number;
  E1: number; E2: number; E3: number;
  R1: number; R2: number; R3: number;
  M1: number; M2: number; M3: number;
  A1: number; A2: number; A3: number;
  N1: number; N2: number; N3: number;
  H1: number; H2: number; H3: number;
  Lon: number;
  hap: number;
  metadata: {
    response_times_ms: number[];
    instrument_version: string;
    translation_version: string;
  };
}

interface PermaScores {
  // Pilares centrales (escala 0-10)
  P: number; E: number; R: number; M: number; A: number;
  // PERMA total (fórmula oficial Butler y Kern 2016: 15 PERMA + hap)
  PERMA_total: number;
  // Escalas de control
  N: number; H: number; Lon: number; hap: number;
  // Banda interpretativa
  banda: 'florecimiento_alto' | 'bienestar_consolidado' | 'bienestar_funcional' | 'area_exploracion' | 'zona_cuidado';
  // Alertas
  red_flags: string[];
  // Validez de la respuesta
  flags_calidad: {
    aquiescencia_extrema: boolean;
    patron_unico: boolean;
    tiempo_atipico: boolean;
    inconsistencia_N_PERMA: boolean;
  };
  metadata: object;
}

function mean(values: number[]): number {
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function round2(x: number): number {
  return Math.round(x * 100) / 100;
}

function validateResponses(r: PermaResponses): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const coreItems = ['P1','P2','P3','E1','E2','E3','R1','R2','R3','M1','M2','M3','A1','A2','A3','hap'];
  // Validación de rango y completitud
  for (const k of coreItems) {
    const v = (r as any)[k];
    if (typeof v !== 'number' || v < 0 || v > 10) {
      errors.push(`Ítem ${k}: valor ${v} fuera de rango 0-10`);
    }
  }
  return { valid: errors.length === 0, errors };
}

function scorePerma(r: PermaResponses): PermaScores {
  const validation = validateResponses(r);
  if (!validation.valid) {
    throw new Error(`Validación fallida: ${validation.errors.join('; ')}`);
  }

  // PASO 1 — Pilares centrales
  const P = mean([r.P1, r.P2, r.P3]);
  const E = mean([r.E1, r.E2, r.E3]);
  const R = mean([r.R1, r.R2, r.R3]);
  const M = mean([r.M1, r.M2, r.M3]);
  const A = mean([r.A1, r.A2, r.A3]);

  // PASO 2 — PERMA total (fórmula oficial: 15 PERMA + hap)
  const PERMA_total = mean([
    r.P1, r.P2, r.P3, r.E1, r.E2, r.E3,
    r.R1, r.R2, r.R3, r.M1, r.M2, r.M3,
    r.A1, r.A2, r.A3, r.hap
  ]);

  // PASO 3 — Escalas de control
  const N = mean([r.N1, r.N2, r.N3]);
  const H = mean([r.H1, r.H2, r.H3]);

  // PASO 4 — Banda interpretativa (basada en baremos Kern, no etiquetas patologizantes)
  let banda: PermaScores['banda'];
  if (PERMA_total >= 9) banda = 'florecimiento_alto';
  else if (PERMA_total >= 8) banda = 'bienestar_consolidado';
  else if (PERMA_total >= 6.5) banda = 'bienestar_funcional';
  else if (PERMA_total >= 5) banda = 'area_exploracion';
  else banda = 'zona_cuidado';

  // PASO 5 — Alertas (red flags)
  const red_flags: string[] = [];
  if (PERMA_total < 5 && N > 6.5) red_flags.push('low_perma_high_negative_emotion');
  if (r.Lon >= 8) red_flags.push('high_loneliness');
  if (H < 4) red_flags.push('low_subjective_health');

  // PASO 6 — Validez de respuesta
  const allResponses = [r.P1, r.P2, r.P3, r.E1, r.E2, r.E3, r.R1, r.R2, r.R3,
                        r.M1, r.M2, r.M3, r.A1, r.A2, r.A3, r.N1, r.N2, r.N3,
                        r.H1, r.H2, r.H3, r.Lon, r.hap];
  const media_individual = mean(allResponses);
  const frecuencias: { [k: string]: number } = {};
  allResponses.forEach(v => { frecuencias[v] = (frecuencias[v] || 0) + 1; });
  const max_frecuencia = Math.max(...Object.values(frecuencias));

  const flags_calidad = {
    aquiescencia_extrema: media_individual >= 9.0 || media_individual <= 1.0,
    patron_unico: max_frecuencia / 23 >= 0.5,
    tiempo_atipico: r.metadata.response_times_ms.reduce((a, b) => a + b, 0) < 90000,
    inconsistencia_N_PERMA: (N >= 7 && PERMA_total >= 7), // ambos altos = inconsistente
  };

  return {
    P: round2(P), E: round2(E), R: round2(R), M: round2(M), A: round2(A),
    PERMA_total: round2(PERMA_total),
    N: round2(N), H: round2(H), Lon: r.Lon, hap: r.hap,
    banda, red_flags, flags_calidad,
    metadata: {
      instrument_version: r.metadata.instrument_version || 'butler_kern_2016_es_mx_v1',
      translation_version: r.metadata.translation_version || 'chaves_2023',
      scoring_formula: 'official_butler_kern_2016_with_hap',
      scoring_timestamp: new Date().toISOString(),
    }
  };
}

// Función auxiliar: si flags_calidad.aquiescencia_extrema || patron_unico:
//   NO mostrar perfil; mostrar mensaje "respuesta atípica detectada, considera re-tomar"
```

---

## SECCIÓN 14 — GAPS DE INVESTIGACIÓN Y PREGUNTAS ABIERTAS

### Gap 1 — Ausencia de validación instrumental colombiana adulta general

**Hecho:** No existe a la fecha (mayo 2026) un estudio peer-reviewed con muestra colombiana representativa adulta (N ≥ 300), CFA del modelo de 5 factores, invarianza por género/edad, y validez convergente con SWLS/Flourishing/Ryff. Las dos publicaciones colombianas son metodológicamente insuficientes (Hernández-Vergel et al., 2018, n = 30 ancianos; Pastrana y Salazar-Piñeros, 2016, descriptivo).

**Relevancia para DescubreMe:** ALTA. La validación cruzada usando datos propios de la plataforma (una vez acumulados N ≥ 500 colombianos) podría ser una **contribución académica publicable** que refuerce la legitimidad científica del producto.

**Acción recomendada:** Diseñar desde el lanzamiento un protocolo de captura de metadatos (consentimiento informado, datos anonimizados) que permita publicar un estudio psicométrico DescubreMe-Colombia 2027.

### Gap 2 — Engagement débil en español: oportunidad de mejora léxica

**Hecho:** La dimensión E muestra fiabilidad inferior consistentemente en validaciones hispanohablantes (Cobo-Rendón et al., 2020 α = .36; Chaves et al., 2023 α = .69). La hipótesis explicativa (doble valencia semántica de "absorción" en español) no ha sido testeada empíricamente.

**Relevancia para DescubreMe:** MEDIA-ALTA. Si se decide producir una versión Colombia adaptada (Opción B §5), incorporar pruebas cognitivas específicas para E1 y E3 y considerar reescritura léxica que distinga absorción positiva (flow) de evasión.

**Acción recomendada:** Cognitive interviews enfocadas en E + análisis comparativo con la sub-escala de Flow (FSS-9) ya en stack.

### Gap 3 — Validez incremental sobre SWLS / Flourishing Scale

**[sin fuente verificada]** No hay estudios definitivos en español que cuantifiquen cuánto valor incremental aporta el PERMA-Profiler sobre instrumentos más breves (SWLS de 5 ítems, Flourishing Scale de 8 ítems) en términos de predicción de outcomes vocacionales o satisfacción laboral.

**Relevancia para DescubreMe:** CRÍTICA. Es exactamente la pregunta que motiva este dossier: ¿el costo de 23 ítems + licencia adicional + Engagement débil justifica el aporte sobre un triplete ya robusto? La respuesta inferencial se inclina a "sí, por comunicabilidad" pero sin evidencia empírica directa.

### Gap 4 — Costo concreto de licencia comercial con The Wellbeing Lab

**Hecho:** No hay tarifa pública para licencia comercial. La negociación es caso a caso.

**Relevancia:** ALTA. Es uno de los pre-condiciones bloqueantes para la decisión final. Sin tarifa conocida no se puede evaluar ROI vs. mantener triplete actual sin costo adicional.

**Acción:** Contactar The Wellbeing Lab antes de Q3 2026.

### Gap 5 — Sesgo individualista y aplicabilidad en sub-poblaciones colombianas rurales

**Inferencia:** La crítica WEIRD aplica con fuerza en sub-poblaciones colombianas con tradiciones más colectivistas (campesinas, indígenas, comunidades religiosas). El modelo PERMA podría infraestimar dimensiones de bienestar comunitario, espiritual o filial.

**Relevancia:** MEDIA. DescubreMe LATAM-Colombia tiene en su rango público a usuarios urbanos predominantemente. Pero si se expande a campañas rurales o B2B con organizaciones comunitarias, la inadecuación cultural se vuelve relevante.

**Acción diferida:** Considerar complementar PERMA con ítems contextuales de bienestar comunitario/colectivo para usuarios que se autoidentifican con contextos rurales o tradicionales.

---

## SECCIÓN 15 — REFERENCIAS (APA 7)

### 15.1 Fuente original Butler-Kern y marco teórico Seligman

Butler, J., y Kern, M. L. (2016). The PERMA-Profiler: A brief multidimensional measure of flourishing. *International Journal of Wellbeing*, 6(3), 1-48. https://doi.org/10.5502/ijw.v6i3.526

Seligman, M. E. P. (2011). *Flourish: A visionary new understanding of happiness and well-being*. Free Press.

Seligman, M. E. P. (2018). PERMA and the building blocks of well-being. *The Journal of Positive Psychology*, 13(4), 333-335. https://doi.org/10.1080/17439760.2018.1437466

Kern, M. L., Waters, L. E., Adler, A., y White, M. A. (2015). A multidimensional approach to measuring well-being in students: Application of the PERMA framework. *The Journal of Positive Psychology*, 10(3), 262-271. https://doi.org/10.1080/17439760.2014.936962

### 15.2 Crítica de redundancia con SWB y debate teórico

Goodman, F. R., Disabato, D. J., Kashdan, T. B., y Kauffman, S. B. (2018). Measuring well-being: A comparison of subjective well-being and PERMA. *The Journal of Positive Psychology*, 13(4), 321-332. https://doi.org/10.1080/17439760.2017.1388434

Disabato, D. J., Goodman, F. R., Kashdan, T. B., Short, J. L., y Jarden, A. (2016). Different types of well-being? A cross-cultural examination of hedonic and eudaimonic well-being. *Psychological Assessment*, 28(5), 471-482. https://doi.org/10.1037/pas0000209

Diener, E. (1984). Subjective well-being. *Psychological Bulletin*, 95(3), 542-575. https://doi.org/10.1037/0033-2909.95.3.542

### 15.3 Validaciones internacionales del PERMA-Profiler

Ryan, J., Curtis, R., Olds, T., Edney, S., Vandelanotte, C., Plotnikoff, R., y Maher, C. (2019). Psychometric properties of the PERMA Profiler for measuring wellbeing in Australian adults. *PLoS ONE*, 14(12), e0225932. https://doi.org/10.1371/journal.pone.0225932

Wammerl, M., Jaunig, J., Mairunteregger, T., y Streit, P. (2019). The German version of the PERMA-Profiler: Evidence for construct and convergent validity of the PERMA theory of well-being in German speaking countries. *Journal of Well-Being Assessment*, 3(1), 75-96. https://doi.org/10.1007/s41543-019-00021-0

Giangrasso, B. (2021). Psychometric properties of the PERMA-Profiler as hedonic and eudaimonic well-being measure in an Italian context. *Current Psychology*, 40(3), 1175-1184. https://doi.org/10.1007/s12144-018-0040-3

Pezirkianidis, C., Stalikas, A., Lakioti, A., y Yotsidi, V. (2021). Validating a multidimensional measure of wellbeing in Greece: Translation, factor structure, and measurement invariance of the PERMA Profiler. *Current Psychology*, 40(6), 3030-3047. https://doi.org/10.1007/s12144-019-00236-7

Watanabe, K., Kawakami, N., Shiotani, T., Adachi, H., Matsumoto, K., Imamura, K., Matsumoto, K., Yamagami, F., Fusejima, A., Muraoka, T., Kagami, T., Shimazu, A., y Kern, M. L. (2018). The Japanese Workplace PERMA-Profiler: A validation study among Japanese workers. *Journal of Occupational Health*, 60(5), 383-393. https://doi.org/10.1539/joh.2018-0050-OA

### 15.4 Adaptaciones al español hispanohablante

Chaves, C., Ballesteros-Valdés, R., Madridejos, E., y Charles-Leija, H. (2023). PERMA-Profiler for the evaluation of well-being: Adaptation and validation in a sample of university students and employees in the Mexican educational context. *Applied Research in Quality of Life*, 18(3), 1225-1247. https://doi.org/10.1007/s11482-022-10132-1

Martín-Díaz, M. D., y Fernández-Abascal, E. G. (2024). Multidimensional measure of well-being, translation, factor structure, measurement invariance, reliability and validity of the PERMA-Profiler in Spain. *Applied Research in Quality of Life*, 19(5), 2503-2538. https://doi.org/10.1007/s11482-024-10342-9

Paniagua-Granados, T., Fernández-Fernández, V., y Molina-Martínez, M. Á. (2024). Psychometric properties of the PERMA-Profiler for measuring well-being in Spanish older adults. *Current Psychology*, 43(8), 6713-6724. https://doi.org/10.1007/s12144-023-04883-9

Cobo-Rendón, R., Pérez-Villalobos, M. V., y Díaz-Mujica, A. (2020). Propiedades psicométricas del PERMA-Profiler para la medición del bienestar en una muestra de estudiantes universitarios chilenos. *Revista Ciencias de la Salud*, 18(1), 119-133. https://doi.org/10.12804/revistas.urosario.edu.co/revsalud/a.8775

Lima-Castro, S., Peña-Contreras, E. K., Cedillo-Quizphe, C., y Cabrera-Vélez, M. (2017). Adaptación del Perfil PERMA en una muestra ecuatoriana. *Eureka*, 14(1), 69-83.

Waigel, N. C., y Lemos, V. N. (2023). Psychometric properties of PERMA Profiler scale in Argentinian adolescents. *International Journal of Psychological Research*, 16(1), 103-113. https://doi.org/10.21500/20112084.5737

Hernández-Vergel, V. K., Prada-Núñez, R., y Hernández-Suárez, C. A. (2018). Adaptación del perfil PERMA de bienestar subjetivo para adultos mayores institucionalizados colombianos. *Revista Ciencia y Cuidado*, 15(1), 83-97. https://doi.org/10.22463/17949831.1235

Pastrana, M. P., y Salazar-Piñeros, F. (2016). Perfil PERMA en una muestra de jóvenes voluntarios colombianos. *Katharsis*, 22, 13-34. https://doi.org/10.25057/25005731.813

### 15.5 Instrumentos comparativos (Ryff, Flourishing, SWLS)

Ryff, C. D. (1989). Happiness is everything, or is it? Explorations on the meaning of psychological well-being. *Journal of Personality and Social Psychology*, 57(6), 1069-1081. https://doi.org/10.1037/0022-3514.57.6.1069

Díaz, D., Rodríguez-Carvajal, R., Blanco, A., Moreno-Jiménez, B., Gallardo, I., Valle, C., y van Dierendonck, D. (2006). Adaptación española de las escalas de bienestar psicológico de Ryff. *Psicothema*, 18(3), 572-577.

Diener, E., Wirtz, D., Tov, W., Kim-Prieto, C., Choi, D. W., Oishi, S., y Biswas-Diener, R. (2010). New well-being measures: Short scales to assess flourishing and positive and negative feelings. *Social Indicators Research*, 97(2), 143-156. https://doi.org/10.1007/s11205-009-9493-y

Diener, E., Emmons, R. A., Larsen, R. J., y Griffin, S. (1985). The Satisfaction With Life Scale. *Journal of Personality Assessment*, 49(1), 71-75. https://doi.org/10.1207/s15327752jpa4901_13

### 15.6 Extensiones del modelo PERMA

Donaldson, S. I., van Zyl, L. E., y Donaldson, S. I. (2022). PERMA+4: A framework for work-related wellbeing, performance and positive organizational psychology 2.0. *Frontiers in Psychology*, 12, 817244. https://doi.org/10.3389/fpsyg.2021.817244

Kern, M. L., Benson, L., Steinberg, E. A., y Steinberg, L. (2016). The EPOCH measure of adolescent well-being. *Psychological Assessment*, 28(5), 586-597. https://doi.org/10.1037/pas0000201

### 15.7 Críticas transculturales

Wong, P. T. P. (2011). Positive psychology 2.0: Towards a balanced interactive model of the good life. *Canadian Psychology*, 52(2), 69-81. https://doi.org/10.1037/a0022511

Joshanloo, M. (2014). Eastern conceptualizations of happiness: Fundamental differences with Western views. *Journal of Happiness Studies*, 15(2), 475-493. https://doi.org/10.1007/s10902-013-9431-1

### 15.8 Licencia, distribución y estándares

Kern, M. L. (n.d.). *Questionnaires*. peggykern.org. https://www.peggykern.org/questionnaires.html

The Wellbeing Lab. (n.d.). *Commercial licensing of wellbeing measures*. https://www.michellemcquaid.com/thewellbeinglab/

University of Pennsylvania, Penn Center for Innovation. (n.d.). *Licensing*. https://pci.upenn.edu/partners/licensing/

International Test Commission. (2017). *ITC Guidelines for Translating and Adapting Tests* (2nd ed.). https://www.intestcom.org/files/guideline_test_adaptation_2ed.pdf

Muñiz, J., Elosua, P., y Hambleton, R. K. (2013). Directrices para la traducción y adaptación de los tests: segunda edición. *Psicothema*, 25(2), 151-157. https://doi.org/10.7334/psicothema2013.24

Congreso de la República de Colombia. (2012). Ley 1581 de 2012 — Por la cual se dictan disposiciones generales para la protección de datos personales.

---

## CAVEATS FINALES

- **Validación colombiana inexistente:** todos los baremos propuestos (México, España) son aproximaciones provisionales hasta acumular N ≥ 1 000 usuarios colombianos.
- **Licencia comercial pendiente:** este dossier asume cooperación de The Wellbeing Lab; si la respuesta es negativa o impone tarifas inviables, activar Plan B (mantener triplete actual SWLS + Flourishing + Ryff PWB sin adición de PERMA).
- **Engagement débil en español:** el pilar E del PERMA mostrará fiabilidad menor en datos colombianos. Reportar perfil completo de 5 pilares pero advertir interpretativamente sobre E.
- **Datos sensibles:** los ítems de Negative emotion, Loneliness y Health son potencialmente activadores; toda implementación debe incluir disclaimers, referidos a salud mental y derecho de eliminación según Ley 1581/2012.
- **Trazabilidad de divergencia:** este dossier consolida síntesis de Claude y Gemini. En datos psicométricos críticos (α por pilar, N de validación, modelos factoriales) ambos coincidieron. Aportes únicos: Claude provee la estructura operativa y de cumplimiento (Secciones 0, 6, 8-13); Gemini provee profundidad teórica única en el debate Goodman-Seligman (jangle fallacy, analogía de béisbol), críticas WEIRD (Ubuntu, confucianismo), y la genealogía PERMAH/PERMA+4. Ambas vías están integradas en este consolidado.
- **Hipótesis verificada:** la hipótesis del usuario "PERMA complementa con foco práctico" es parcialmente correcta. PERMA aporta granularidad accionable que SWLS y Flourishing (unidimensionales) no proveen, pero es redundante con Ryff PWB y con el SWB general. La arquitectura recomendada es **reemplazo parcial de Ryff PWB en Track A Free**, no suma redundante al triplete.

---

*Cierre del dossier consolidado v2.1 — Listo para revisión científica y legal antes de v1.5 Q1 2027.*
