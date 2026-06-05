# BPNSFS Implementation Acquisition Pack v1.0 — Consolidado (Claude + Gemini)
### Para la plataforma DescubreMe (autoconocimiento freemium B2C, foco Colombia)

> **Nota metodológica del consolidado.** Este documento integra dos investigaciones independientes ejecutadas contra el mismo prompt v1.0 ("Implementation Acquisition Pack"). **Claude entregó las 10 secciones operativas exigidas (OK).** **Gemini entregó un informe académico/teórico extenso (~170 párrafos, 53 referencias) pero NO siguió la estructura de las 10 secciones del prompt: no hay banco literal de ítems, no hay plan de licencia con email copy-paste, no hay textos de interpretación es-CO, no hay disclaimers, no hay protocolo de piloto, no hay líneas Colombia (NO).** En consecuencia, este consolidado usa **Claude como base** y **Gemini suple** únicamente donde aporta: (a) información nueva verificable, (b) profundidad teórica útil para metodología pública, (c) datos colombianos/iberoamericanos no localizados por Claude. Los bloques con aporte de Gemini se marcan en línea con `[Aporte Gemini]`. El Apéndice A enumera todos los aportes integrados con su nivel de verificación.

---

## Tabla de cobertura

| Sección del prompt v1.0 | Claude | Gemini | Procedencia del consolidado |
|---|---|---|---|
| §0 Portada + status bloqueadores | OK | NO (no hay portada estructurada) | Claude base |
| §1 Acquisition plan banco de ítems | OK | NO | Claude base |
| §2 Adaptaciones español por país | OK | PARCIAL (cita Mexicana adolescentes + Patiño Zapata CO) | Claude base + 2 aportes Gemini |
| §3 Baremos publicados | OK | PARCIAL (cita M/DE Patiño 2025 CO) | Claude base + 1 aporte Gemini |
| §4 Ítems inversos numerados | OK | NO | Claude base |
| §5 Textos interpretación es-CO | OK | NO | Claude base |
| §6 License acquisition plan | OK | NO | Claude base |
| §7 Disclaimers + NFR-28 + líneas CO | OK | NO | Claude base |
| §8 Piloto cognitivo Colombia | OK | NO | Claude base |
| §9 Gaps y preguntas abiertas | OK | PARCIAL (Murphy 2023 + frustración óptima + Chen 2013 disertación) | Claude base + 2 aportes Gemini |
| §10 Referencias APA 7 con DOI | OK (18 refs) | PARCIAL (53 fuentes pero sin formato APA) | Claude base + 3 referencias Gemini |

---

## SECCIÓN 0 — PORTADA Y METADATOS

**Instrumento:** Basic Psychological Need Satisfaction and Frustration Scale (BPNSFS)
**Versión:** General, adultos, 24 ítems (NO BPNSFS-W, NO BPNSFS-ID, NO diary)
**Autores originales:** Chen, B., Vansteenkiste, M., Beyers, W., Boone, L., Deci, E. L., Van der Kaap-Deeder, J., Duriez, B., Lens, W., Matos, L., Mouratidis, A., Ryan, R. M., Sheldon, K. M., Soenens, B., Van Petegem, S., & Verstuyf, J.
**Publicación original:** *Motivation and Emotion*, 39(2), 216–236 (2015). DOI: 10.1007/s11031-014-9450-1
**Manual oficial vigente:** Van der Kaap-Deeder, J., Soenens, B., Ryan, R. M., & Vansteenkiste, M. (2020/2022). *Manual of the BPNSFS*. Ghent University.
**Idioma original:** Desarrollado simultáneamente en cuatro idiomas (inglés, neerlandés, chino, español ibérico/peruano)
**Constructo:** Necesidades psicológicas básicas según Teoría de la Autodeterminación (Deci & Ryan, 2000); modelo bidimensional — satisfacción Y frustración por cada una de 3 necesidades (autonomía, competencia, relación)
**Estructura:** 6 subescalas × 4 ítems = 24 ítems; Likert 5 puntos
**Tiempo aplicación:** 5–7 minutos
**Productos destino DescubreMe:** B2C Paid (USD 19), B2B-A, Ikigai Premium

### Resumen ejecutivo

El BPNSFS es el instrumento de referencia mundial para medir satisfacción y frustración de necesidades psicológicas básicas dentro del marco SDT. **Los 24 ítems en inglés están publicados literalmente en el Manual oficial del CSDT/Ghent University (descarga abierta), y existe versión en español también en dicho Manual** con contacto vigente con Lennia Matos (PUCP, coautora original peruana). El uso académico es libre; el uso comercial — caso de DescubreMe — requiere autorización escrita doble del CSDT (shannon@selfdeterminationtheory.org) y Maarten Vansteenkiste (Ghent University). **No existe baremo colombiano publicado de la versión general adultos**; sí existe validación chilena (Del Valle et al., 2018), datos peruanos en el estudio original, y `[Aporte Gemini]` un estudio colombiano reciente en adolescentes con TDAH (Patiño Zapata, 2025, Universidad de Manizales, N=110 estudiantes del Quindío) que reporta M y DE provisionales pero **NO es baremo poblacional**. Una controversia psicométrica relevante (Murphy et al., 2023) cuestiona si la distinción satisfacción/frustración refleja constructos separados o un artefacto de método; la postura del programa de Ghent y replicaciones recientes (Park et al., 2025) defienden la estructura de seis factores para uso aplicado.

### Status de bloqueadores

| Bloqueador | Status | Razón |
|---|---|---|
| Ítems literales (banco) | **READY** (inglés) / **PARTIAL** (español) | Versión inglesa íntegra en Manual CSDT abierto; versión española también en el Manual pero su reproducción literal en interfaz comercial cae bajo la cláusula de uso comercial. |
| Licencia de uso comercial | **BLOCKED** hasta gestión | El CSDT exige autorización expresa para uso comercial. Tiempo estimado de respuesta histórico: 2–8 semanas. |
| Baremos colombianos | **BLOCKED** | No existe baremo colombiano publicado de la versión general adultos. Provisional: usar referencias chilenas (Del Valle et al., 2018) o peruanas (Chen et al., 2015) y construir baremo propio post-piloto. `[Aporte Gemini]` Existe referencia colombiana reciente (Patiño Zapata, 2025, adolescentes con TDAH) que NO sustituye baremo poblacional adulto pero ofrece M/DE provisionales como anclaje LATAM-CO. |
| Adaptación es-CO formal | **PARTIAL** | Base: versión española del Manual + adaptación peruana (Matos) + adaptación chilena (Del Valle); requiere piloto cognitivo en Colombia. |

---

## SECCIÓN 1 — ACQUISITION PLAN DEL BANCO DE ÍTEMS

### 1.1 Disponibilidad pública

**Hecho:** Los 24 ítems en **inglés** están publicados literalmente en el Manual oficial *Manual of the Basic Psychological Need Satisfaction and Frustration Scale* (Van der Kaap-Deeder et al., 2020/2022), distribuido en abierto por el CSDT:
- https://selfdeterminationtheory.org/wp-content/uploads/2022/02/BPNSFS_Complete_2020.pdf
- https://selfdeterminationtheory.org/wp-content/uploads/2022/08/BPNSFS_Complete_2022.pdf

El Manual está sujeto a una cláusula explícita: *"In case you do consider using the scale for commercial purposes, you need to contact shannon@selfdeterminationtheory.org and Maarten.Vansteenkiste@ugent.be"* (Manual, sección 2.4, Terms of use).

**Hecho — ítems en inglés (versión adulto, Manual sección 3.1.2.1):**

| # | Texto (Manual CSDT, inglés) | Subescala | Clave |
|---|---|---|---|
| 1 | I feel a sense of choice and freedom in the things I undertake. | Autonomy Satisfaction (AS) | Directa |
| 2 | Most of the things I do feel like "I have to". | Autonomy Frustration (AF) | Directa |
| 3 | I feel that the people I care about also care about me. | Relatedness Satisfaction (RS) | Directa |
| 4 | I feel excluded from the group I want to belong to. | Relatedness Frustration (RF) | Directa |
| 5 | I feel confident that I can do things well. | Competence Satisfaction (CS) | Directa |
| 6 | I have serious doubts about whether I can do things well. | Competence Frustration (CF) | Directa |
| 7 | I feel that my decisions reflect what I really want. | AS | Directa |
| 8 | I feel forced to do many things I wouldn't choose to do. | AF | Directa |
| 9 | I feel connected with people who care for me, and for whom I care. | RS | Directa |
| 10 | I feel that people who are important to me are cold and distant towards me. | RF | Directa |
| 11 | I feel capable at what I do. | CS | Directa |
| 12 | I feel disappointed with many of my performances. | CF | Directa |
| 13 | I feel my choices express who I really am. | AS | Directa |
| 14 | I feel pressured to do too many things. | AF | Directa |
| 15 | I feel close and connected with other people who are important to me. | RS | Directa |
| 16 | I have the impression that people I spend time with dislike me. | RF | Directa |
| 17 | I feel competent to achieve my goals. | CS | Directa |
| 18 | I feel insecure about my abilities. | CF | Directa |
| 19 | I feel I have been doing what really interests me. | AS | Directa |
| 20 | My daily activities feel like a chain of obligations. | AF | Directa |
| 21 | I experience a warm feeling with the people I spend time with. | RS | Directa |
| 22 | I feel the relationships I have are just superficial. | RF | Directa |
| 23 | I feel I can successfully complete difficult tasks. | CS | Directa |
| 24 | I feel like a failure because of the mistakes I make. | CF | Directa |

**Hecho (Manual CSDT, secciones 3.1.4.1 y Tabla 2):** El Manual contiene la versión **española** (adultos) elaborada en el desarrollo original (Chen et al., 2015, Estudio 2, muestra peruana), con contacto vigente Lennia Matos (lenniamatos@gmail.com).

**Inferencia:** La versión española es accesible en abierto en el PDF para fines académicos, pero su uso en una plataforma B2C de pago cae bajo la cláusula comercial; **requiere autorización dual**.

### 1.2 Banco oficial vs adaptaciones derivadas

- **BPNSFS-general** (24 ítems, adultos / niños): versión a implementar.
- **BPNSFS-W** (work): Olafsen et al. (2021). NO aplicar a DescubreMe general.
- **BPNSFS-domain-specific:** education, sport, romantic, motherhood, etc. — irrelevantes.
- **BPNSFS-ID** (Intellectual Disability; Frielink et al., 2019): irrelevante. `[Aporte Gemini]` Para registro técnico: la BPNSFS-ID reporta estabilidad test-retest a dos semanas con r alto en las tres necesidades; útil como referencia metodológica de adaptación cognitiva pero no para DescubreMe.
- **BPNSFS-diary** (estado): irrelevante.
- **BPNSFS-12** (versión breve): no se recomienda; degrada confiabilidad por subescala. `[Aporte Gemini]` Existe validación alemana (Heissel et al., 2023) en n=344 con depresión clínica; muestra que la frustración predice morbilidad incluso cuando la satisfacción no diferencia bienestar — utilidad clínica pero NO B2C general.

### 1.3 Estructura del banco

- 24 ítems, 6 subescalas × 4 ítems.
- **Todas las claves son directas** matemáticamente; no hay ítems con scoring inverso por defecto. Los ítems de frustración están redactados directamente en clave frustración.
- Escala: Likert 5 puntos (1 = Completely disagree … 5 = Completely agree).
- Encabezado oficial: *"Below, we ask you about the kind of experiences you actually have in your life. Please read each of the following items carefully. You can choose from 1 to 5 to indicate the degree to which the statement is true for you at this point in your life."* (Manual, p. 24).
- Scoring por defecto: promedio aritmético por subescala; composite scores opcionales.

### 1.4 Recomendación de contacto inicial

**Opinión profesional:** escribir simultáneamente en un único email:
- **shannon@selfdeterminationtheory.org** (gestora CSDT)
- **Maarten.Vansteenkiste@ugent.be** (custodio académico)
- Copia (LATAM): **lenniamatos@gmail.com** (contacto versión española).

URL de partida: https://selfdeterminationtheory.org/basic-psychological-need-satisfaction-and-frustration-scale/

---

## SECCIÓN 2 — ADAPTACIONES AL ESPAÑOL DISPONIBLES

| País | Autores | Año | Referencia/DOI/URL | N | Características | Acceso PDF |
|---|---|---|---|---|---|---|
| Perú (original) | Chen, Vansteenkiste, Matos et al. | 2015 | DOI 10.1007/s11031-014-9450-1 (Estudio 2, submuestra d) | 244 universitarios | α subescalas 0.64–0.89; CFA seis factores SBS-χ²(231)=441.99, CFI=.95, RMSEA=.04, SRMR=.04 | Manual CSDT abierto; uso comercial requiere permiso |
| Chile | Del Valle Tapia, Matos, Díaz Mujica, Pérez Villalobos & Vergara Morales | 2018 | *Propósitos y Representaciones*, 6(1), 301–350. http://www.scielo.org.pe/scielo.php?script=sci_arttext&pid=S2307-79992018000100007 | 297 universitarios | AFC seis factores (χ²/gl=1.75; CFI=.92; RMSEA=.05; SRMR=.05); α ordinal global 0.90 (satisfacción) y 0.86 (frustración); subescalas 0.65–0.79 | PDF abierto en SciELO Perú |
| España ibérica | Versión en Manual CSDT; sin validación poblacional adulta independiente identificada | 2015–2022 | Manual BPNSFS_Complete_2020/2022, sección 3.1.4.1 | n/a | Versión del banco original; ítems disponibles en Manual | Manual abierto; uso comercial requiere permiso |
| Portugal (no es español pero referente cercano) | Cordeiro, Paixão, Lens, Lacante & Luyckx | 2016 | *Psychologica Belgica*, 56(3), 193–209. DOI 10.5334/pb.252 | 417 universitarios + 755 estudiantes 12.º grado | AFC seis factores; α subescalas 0.70–0.85 | PMC abierto (PMC5853851) |
| Argentina | [sin fuente verificada] de validación BPNSFS 24-ítems general adultos | — | — | — | No localizada en este ciclo de búsqueda. Existen adaptaciones argentinas de otras escalas SDT (Controlling Coach Behaviors, etc.) pero no del BPNSFS general | — |
| México (general) | [sin fuente verificada] adultos general | — | — | — | Citado adicionalmente por Gemini: existe adaptación dominio-específico para prevención de embarazo en adolescentes (López Cervantes et al., 2024; ResearchGate publicación 379692581) — ítems modificados, NO la versión general estándar. `[Aporte Gemini — verificar]` También se reporta versión BPNSFS-PE mexicana validada en quintos/sextos grados (Salazar-Ayala et al., 2020; ResearchGate 339834971) y BPNSFS en docentes mexicanos (Dialnet artículo 7783028). NO sustituyen la versión adulta general. | — |
| Colombia (adultos general) | [sin fuente verificada] de validación específica del BPNSFS general 24-ítems en adultos | — | — | — | Existe estudio SDT colombiano de Gil-Flórez et al. (2022) en empresas alimentarias pero usa BPNSFS-W (laboral), no general. |  — |
| Colombia (adolescentes con TDAH) `[Aporte Gemini]` | Patiño Zapata, M. | 2025 | Tesis de Maestría, Universidad de Manizales; Repositorio RIDUM https://ridum.umanizales.edu.co/server/api/core/bitstreams/1189a07b-5fc2-4edd-90e6-f38b6c278c63/content | 110 adolescentes (Quindío, 9 IE públicas) con diagnóstico TDAH | Aplicado bajo nomenclatura ESFNPB. M Satisfacción = 3.50 (DE = .88); M Frustración = 2.91 (DE = .74). Correlación bivariada Pearson Satisfacción–Frustración r = −.251. Análisis con SPSS 29 + LISREL 8.5. **NO es baremo poblacional adulto general — es muestra clínica adolescente regional.** Útil como anclaje provisional LATAM-CO y como evidencia de uso del instrumento en Colombia. **[verificar antes de uso en producto: revisar tesis original para confirmar redacción exacta de ítems usados y conversión a interpretación adulta]** | PDF abierto en RIDUM |
| Grubbs 2025 multipaís | [sin fuente verificada] de inclusión de datos colombianos | — | — | — | No fue posible verificar en este ciclo. Recomendación: contactar al equipo Grubbs (Brigham Young University) / consultar Open Science Framework | — |

### 2.1 Recomendación de base para es-CO

**Opinión profesional:** usar como punto de partida la **versión española del Manual CSDT** (versión peruana original de Chen et al., 2015, replicada por Del Valle et al., 2018 en universitarios chilenos), por tres razones:

1. Es la versión **oficial** distribuida por los autores.
2. Su léxico es **LATAM-neutro** (Lima fue una de las 4 muestras culturales originales), más cercano a Colombia que la versión ibérica.
3. Tiene **trayectoria psicométrica acumulada en LATAM** (Perú original + replicación chilena + uso documentado en Colombia adolescente vía Patiño Zapata 2025) que facilita la comparabilidad de baremos provisionales.

Sobre esta base se propone adaptación léxica menor para Colombia validada en piloto cognitivo (Sección 8).

`[Aporte Gemini — recomendación metodológica]` Para la adaptación lingüística en es-CO se recomienda aplicar el **índice de legibilidad de Fernández-Huerta** (objetivo > 79.97, equivalente a nivel de lectura 6.º grado) y comités de jueces expertos según directrices de la **International Test Commission (ITC)**, con traducción bidireccional + retrotraducción + decentering controlado. Esto fortalece defensa legal y científica de la adaptación.

### 2.2 Modificaciones léxicas anticipadas para Colombia

**Inferencia (basada en convenciones de adaptación transcultural):**

- **Tuteo cordial** ("tú", no "usted") en franja 18–60. Confirmar en piloto.
- "Las cosas que emprendo" → revisar si suena empresarial; alternativa "las cosas que hago".
- "Decepcionado/a con mis desempeños" → "decepcionado/a con cómo me desempeño".
- "Me desprecian" → registro fuerte; alternativa "no me tienen aprecio".
- "Una cadena de obligaciones" → expresión válida en Colombia, mantener.
- Evitar regionalismos peruanos/chilenos (no "fome", no "chévere"/"bacano" en evaluación formal).
- Anclajes Likert es-CO: "Totalmente en desacuerdo / En desacuerdo / Ni de acuerdo ni en desacuerdo / De acuerdo / Totalmente de acuerdo".

---

## SECCIÓN 3 — BAREMOS PUBLICADOS

**Advertencia anti-alucinación:** solo se reportan valores verificados en fuente primaria. Celdas marcadas *[sin fuente verificada]* reflejan ausencia de dato confirmado.

| País / Muestra | Fuente (APA + DOI) | N | Subescalas reportadas | M (Likert 1–5) | DT | Percentiles |
|---|---|---|---|---|---|---|
| Perú (universitarios) | Chen et al. (2015), Estudio 2 submuestra d; DOI 10.1007/s11031-014-9450-1 | 244 | α subescala 0.64–0.89; medias específicas no transcritas en abstract público | [requiere acceso al paper completo] | [requiere acceso al paper completo] | [sin fuente verificada] |
| Chile (universitarios) | Del Valle Tapia et al. (2018); http://www.scielo.org.pe/scielo.php?script=sci_arttext&pid=S2307-79992018000100007 | 297 | α ordinal global: 0.90 satisfacción; 0.86 frustración; α subescalas 0.65–0.79 | [reportadas en artículo completo; abstract no las transcribe] | [reportadas en artículo completo] | [sin fuente verificada en abstract; consultar PDF completo en SciELO] |
| Noruega (muestra estratificada general) | Validación noruega (2022); DOI 10.3389/fpsyg.2022.1032006 | muestra estratificada | 6 subescalas | reportadas en tablas del artículo abierto | reportadas | reportadas por estrato edad/género |
| Países Bajos (1709 adultos) | Van Assche et al. (2022); DOI 10.1007/s10902-021-00482-2 | 1709 | α global = 0.90 | reportadas en artículo | reportadas | [sin percentiles publicados explícitos] |
| Polonia (4 estudios) | Polish adaptation, Brzeziński et al.; PMC7025581 | 272 / 265 / 158 / 204 | 6 subescalas | reportadas en artículo | reportadas | [sin fuente verificada] |
| Colombia (adolescentes TDAH, Quindío) `[Aporte Gemini]` | Patiño Zapata (2025); RIDUM Universidad de Manizales | 110 | Sat. global vs Frus. global; r Pearson = −.251 | M Sat. = 3.50; M Frus. = 2.91 | DE Sat. = .88; DE Frus. = .74 | No percentiles. **NO sustituye baremo poblacional adulto. Usar solo como anclaje LATAM provisional con disclaimer.** [verificar antes de uso en producto] |
| Colombia (adultos general) | [sin fuente verificada] | — | — | — | — | — |
| México (adultos general) | [sin fuente verificada] | — | — | — | — | — |
| Argentina (adultos general) | [sin fuente verificada] | — | — | — | — | — |

**Hecho relevante:** Chen et al. (2015) reportan α por subescala 0.64–0.89, con las subescalas de frustración tendiendo al extremo bajo del rango (consistente con observaciones posteriores de Murphy et al., 2023).

### 3.1 Recomendación de baremo provisional para LATAM

**Opinión profesional:** durante los primeros 6 meses de operación, **NO reportar baremos numéricos en percentiles al usuario**. En su lugar:

1. Mostrar la puntuación bruta por subescala (promedio 1–5) y la **banda relativa de DescubreMe** (BAJO / MEDIO / ALTO), calculada provisionalmente como:
   - **BAJO** = M de subescala < (media de referencia LATAM Del Valle 2018 o Chen 2015 Perú) − 1 DT
   - **MEDIO** = M ± 1 DT alrededor de la media de referencia
   - **ALTO** = M > (media de referencia) + 1 DT
2. Documentar internamente esta heurística como **provisional**, no como baremo poblacional.
3. Migrar a baremos colombianos propios tras N ≥ 1.000 usuarios colombianos con datos completos.

Esta estrategia es transparente, no inventa números y respeta la convención SDT (Vansteenkiste et al., 2020) de privilegiar la interpretación de perfil intra-individual sobre comparaciones poblacionales.

### 3.2 Roadmap para baremos colombianos propios

| Fase | N mínimo | Estratificación | Plazo |
|---|---|---|---|
| Fase 0 — Piloto cognitivo | 15–30 | Bogotá + Medellín + Cali; urbano; mixto | Mes 1 |
| Fase 1 — Piloto cuantitativo | 150–300 | 18–65, género balanceado, NSE mixto, ≥30% fuera de Bogotá | Mes 2–4 |
| Fase 2 — Norma exploratoria | 600–1.000 | + edad (18–29/30–44/45–59/60+), 5 macrorregiones DANE, NSE 1–6 | Mes 6–12 |
| Fase 3 — Norma definitiva | 2.000–3.000 | + invariancia factorial entre subgrupos | Mes 12–24 |

Reporte público recomendado: *technical report* DescubreMe y/o publicación en revista LATAM (*Universitas Psychologica*, *Revista Latinoamericana de Psicología*) con tabla de medias, DT y percentiles 5/10/16/25/50/75/84/90/95 por subescala y subgrupo.

---

## SECCIÓN 4 — ÍTEMS INVERSOS NUMERADOS

**Hecho clave (Manual CSDT, sección 2.2):** en el BPNSFS general 24-ítems, **ningún ítem requiere recodificación inversa** para calcular el puntaje de su propia subescala. La inversión se aplica únicamente cuando se calcula un *composite score por necesidad* combinando satisfacción + frustración invertida (procedimiento opcional, no por defecto).

| Ítem # | Subescala | Clave para puntaje de subescala | Notas |
|---|---|---|---|
| 1 | AS | Directa | — |
| 2 | AF | Directa | Mayor valor = más frustración |
| 3 | RS | Directa | — |
| 4 | RF | Directa | Sensible (exclusión). Monitor NFR-28. |
| 5 | CS | Directa | — |
| 6 | CF | Directa | Sensible (dudas serias sobre capacidad). Monitor NFR-28. |
| 7 | AS | Directa | — |
| 8 | AF | Directa | — |
| 9 | RS | Directa | — |
| 10 | RF | Directa | Sensible (frialdad de allegados). Monitor NFR-28. |
| 11 | CS | Directa | — |
| 12 | CF | Directa | Sensible (decepción con propio desempeño). Monitor NFR-28. |
| 13 | AS | Directa | — |
| 14 | AF | Directa | — |
| 15 | RS | Directa | — |
| 16 | RF | Directa | Sensible (rechazo social). Monitor NFR-28. |
| 17 | CS | Directa | — |
| 18 | CF | Directa | Sensible (inseguridad en capacidades). Monitor NFR-28. |
| 19 | AS | Directa | — |
| 20 | AF | Directa | — |
| 21 | RS | Directa | — |
| 22 | RF | Directa | Sensible (relaciones superficiales). Monitor NFR-28. |
| 23 | CS | Directa | — |
| 24 | CF | Directa | **Muy sensible** ("me siento un fracaso"). Bandera prioritaria NFR-28 si respuesta ≥4. |

**Confirmado contra:** Manual oficial (Van der Kaap-Deeder et al., 2020, secciones 2.2 y 3.1.2.1).

---

## SECCIÓN 5 — TEXTOS DE INTERPRETACIÓN AL USUARIO (es-CO)

> *Principios aplicados:* tuteo cordial colombiano; descripción no etiquetadora; lenguaje aspiracional no determinista; nada clínico; descripción + ejemplo + invitación a reflexión. Bandas ALTO de frustración: lenguaje cuidadoso, no patologizar, ruta hacia NFR-28.

### Satisfacción de Autonomía
**Descripción técnica (interna):** experiencia subjetiva de volición, elección y autoría en las propias acciones. Núcleo SDT de la autonomía (Deci & Ryan, 2000).

**Banda BAJO:** En este momento sientes pocas veces que lo que haces día a día nace de una elección genuinamente tuya. Tal vez muchas decisiones se sienten "automáticas" o impuestas por la rutina, el trabajo o el entorno. Una práctica útil es identificar una sola actividad de tu semana donde puedas elegir cómo, cuándo o por qué hacerla. ¿Cuál sería?

**Banda MEDIO:** Tiendes a experimentar algo de libertad en lo que haces, aunque también hay áreas donde sientes que actúas por obligación. Esta combinación es común en la adultez con responsabilidades múltiples. Una pregunta que te puede servir: ¿en qué momento de tu semana sientes con más claridad que eliges, y qué tiene de particular ese espacio?

**Banda ALTO:** Sueles experimentar tus actividades como expresiones de lo que realmente quieres, y tus decisiones suelen sentirse alineadas con quien eres. Esto suele asociarse con motivación sostenida y mayor disfrute de los procesos. Una pregunta útil: ¿cómo puedes proteger esa sensación de elección cuando aumentan las demandas externas?

### Frustración de Autonomía
**Descripción técnica (interna):** experiencia subjetiva de presión, obligación y conflicto con la propia voluntad. NO es ausencia de satisfacción sino constructo independiente (Vansteenkiste et al., 2020).

**Banda BAJO:** Sientes pocas veces que tu vida se reduce a un encadenado de obligaciones. Esto sugiere que has logrado preservar un espacio de margen frente a las presiones externas. Una invitación: observa qué prácticas tuyas concretas ayudan a mantener ese margen, para sostenerlas activamente.

**Banda MEDIO:** Algunas áreas de tu vida se sienten como obligaciones que no elegiste del todo. Esta experiencia es frecuente en momentos de transición o carga. Una pregunta útil: si tuvieras que nombrar la fuente principal de "tengo que" en tu semana, ¿qué nombrarías, y qué pequeña renegociación sería posible?

**Banda ALTO:** Estás atravesando un momento donde una parte importante de tu día se vive como presión o como hacer cosas que preferirías no hacer. Tu reporte no describe quién eres, sino cómo se siente esta etapa. Tener este patrón presente puede ayudarte a explorar qué fuentes de presión son negociables y cuáles podrían beneficiarse de conversación con alguien de confianza o con un/a profesional. *(Si esta sensación es intensa y persistente, revisa la sección de orientación al final del informe.)*

### Satisfacción de Competencia
**Descripción técnica (interna):** experiencia subjetiva de eficacia y maestría en las propias actividades.

**Banda BAJO:** Hoy sientes pocas veces que las cosas que haces te salen bien o que tienes las capacidades para lo que enfrentas. Esto puede ser circunstancial — una etapa nueva, un reto que excede tus herramientas actuales — y no una característica fija. Una invitación: identifica una habilidad específica que te gustaría reforzar y un primer paso concreto, pequeño y verificable, para esta semana.

**Banda MEDIO:** Tiendes a sentirte capaz en algunas áreas y menos capaz en otras. Esta variabilidad es lo más común en adultos. Una pregunta útil: ¿en qué dominio sientes más solidez y qué de lo que haces allí podrías trasladar a un área donde te sientes con menos confianza?

**Banda ALTO:** Sueles sentirte capaz de hacer bien las cosas que emprendes, incluso las difíciles. Esta sensación de eficacia suele alimentar la persistencia y el aprendizaje. Una pregunta: ¿qué condiciones (entorno, sueño, apoyo, claridad de meta) acompañan esa sensación, y cómo cuidarlas cuando enfrentes retos mayores?

### Frustración de Competencia
**Descripción técnica (interna):** experiencia subjetiva de fracaso, ineficacia y duda profunda sobre las propias capacidades.

**Banda BAJO:** Pocas veces sientes que las cosas se te dificultan al punto de cuestionar tus capacidades. Esto sugiere que cuentas con recursos internos y/o externos que sostienen tu sensación de eficacia. Una invitación: nombra qué estrategias o personas te ayudan a sostener esta calma frente al error, para fortalecerlas.

**Banda MEDIO:** En algunos momentos te sientes inseguro/a sobre lo que puedes lograr o decepcionado/a con cómo te desempeñas. Esta experiencia, en dosis razonables, es parte natural del aprendizaje adulto. Una pregunta útil: ¿cómo es tu diálogo interno cuando algo no sale como esperabas, y qué cambiaría si te hablaras como le hablarías a alguien a quien quieres?

**Banda ALTO:** En este momento se asoma con frecuencia la idea de no estar a la altura, sentirte un/a fracaso/a o dudar profundamente de tus capacidades. Este patrón merece cuidado: no describe quién eres, describe una experiencia presente que puede aliviarse. Considera conversar con alguien de confianza o con un/a profesional. *(Si esta sensación es intensa, persistente o se acompaña de desesperanza, consulta la sección de orientación al final del informe.)*

### Satisfacción de Relación
**Descripción técnica (interna):** experiencia subjetiva de cercanía, calidez y reciprocidad en vínculos importantes.

**Banda BAJO:** En este momento sientes pocas veces cercanía o calidez en tus vínculos. A veces esto refleja una etapa de transición (mudanza, ruptura, duelo, cambio laboral) y no una característica permanente. Una invitación: identifica una persona con quien la conexión haya sido genuina en el pasado, y considera un gesto pequeño de retomar contacto esta semana.

**Banda MEDIO:** Tienes vínculos donde experimentas cercanía y otros donde la sientes menos. Esto es lo más habitual en redes adultas diversificadas. Pregunta útil: ¿con quién te sientes más visto/a y entendido/a, y qué de esa relación podrías cultivar más conscientemente?

**Banda ALTO:** Sueles experimentar tus relaciones importantes como cálidas, recíprocas y significativas. Esta base relacional es uno de los predictores más robustos de bienestar sostenido en estudios SDT. Pregunta: ¿qué prácticas concretas tuyas alimentan esos vínculos, y cómo cuidarlas en temporadas de mayor estrés?

### Frustración de Relación
**Descripción técnica (interna):** experiencia subjetiva de soledad, exclusión, rechazo o superficialidad en los vínculos.

**Banda BAJO:** Pocas veces te sientes excluido/a o distante de quienes te importan. Esto sugiere que tu red afectiva, sea grande o pequeña, te está sosteniendo. Una invitación: reconoce explícitamente esas relaciones — incluso un mensaje breve de agradecimiento puede fortalecer el vínculo.

**Banda MEDIO:** Hay momentos en que sientes distancia, frialdad o superficialidad en tus vínculos, junto con otros momentos de conexión. Este balance variable es común. Pregunta útil: ¿qué situación específica activa más esa sensación de distancia, y qué de ella es modificable desde tu lado?

**Banda ALTO:** Estás atravesando un momento donde la sensación de exclusión, frialdad de tus allegados o superficialidad en tus relaciones aparece con frecuencia. Esta experiencia es dolorosa y merece atención cuidadosa. Considera conversar con una persona de confianza, y si la sensación es persistente o se acompaña de soledad intensa, busca apoyo profesional. *(Consulta la sección de orientación al final del informe.)*

---

## SECCIÓN 6 — LICENSE ACQUISITION PLAN

### 6.1 Titular y contactos exactos

- **Custodio académico:** Maarten Vansteenkiste, Ghent University — **Maarten.Vansteenkiste@ugent.be**
- **Titular institucional comercial:** Center for Self-Determination Theory (CSDT), gestora Shannon Hoefen — **shannon@selfdeterminationtheory.org**
- **Contacto versión española adultos:** Lennia Matos, Pontificia Universidad Católica del Perú — **lenniamatos@gmail.com**

### 6.2 Práctica histórica del CSDT para uso comercial

**Hecho:** la cláusula oficial del Manual y de cada página de cuestionarios del CSDT establece: *"All academic use is permitted, but you must obtain permission from the Center for Self-Determination Theory for commercial use."* El sitio CSDT (selfdeterminationtheory.org/questionnaires/) reitera esta condición.

**Hecho:** el CSDT **NO publica tarifas en abierto**. El CSDT es organización sin fines de lucro (Tax ID 81-0900459, sede Celebration, FL).

**Inferencia:** el CSDT atiende solicitudes comerciales caso por caso. Modelos observados en la práctica (a partir de patrones generales de licencias de instrumentos psicométricos no comerciales gestionados por consorcios académicos): (a) tarifa anual fija; (b) regalía por uso/aplicación; (c) acuerdo de uso sin pago a cambio de compartir datos agregados anónimos para investigación SDT. La modalidad se negocia.

**Opinión profesional:** rango realista para una plataforma freemium de tamaño inicial-medio en LATAM: **USD 1.500–8.000/año**, o licencia única USD 500–2.000 más reporting anual. Para volúmenes >100.000 administraciones/año, escalado adicional probable.

### 6.3 Pasos detallados para solicitar

1. **Semana 0:** Preparar dossier DescubreMe (1–2 páginas): descripción, público, volumen estimado, monetización, garantías no-clínico/no-selección, gobernanza de datos.
2. **Semana 1:** Enviar email inicial (ver 6.4).
3. **Semana 2–4:** Seguimiento educado si en 14 días no hay respuesta.
4. **Semana 4–8:** Negociación de términos: versión autorizada, idioma, modo de presentación (literal en interfaz vs backend), tarifa, duración, renovaciones, reporting, atribución obligatoria.
5. **Semana 8–12:** Firma de acuerdo escrito y pago si aplica.
6. **Post-firma:** Implementar atribución obligatoria (*"BPNSFS © Chen et al. (2015); used under license from CSDT and Ghent University"*) en interfaz y T&C.

### 6.4 Borrador de email inicial (inglés, copy-paste)

> **To:** shannon@selfdeterminationtheory.org; Maarten.Vansteenkiste@ugent.be
> **Cc:** lenniamatos@gmail.com
> **Subject:** Commercial use license request — BPNSFS (general, 24-item) — DescubreMe self-knowledge platform, Latin America
>
> Dear Shannon Hoefen and Prof. Vansteenkiste,
>
> I am writing on behalf of DescubreMe, a Spanish-language, freemium B2C self-knowledge platform for adults in Latin America (primary market: Colombia; secondary: Mexico, Argentina). DescubreMe is an educational and orientation platform — explicitly non-clinical and not used for personnel selection — designed to help adults reflect on their psychological functioning through validated instruments and personalized, descriptive feedback.
>
> We would like to formally request permission to use the **Basic Psychological Need Satisfaction and Frustration Scale (BPNSFS; Chen, Vansteenkiste, Beyers, et al., 2015), general 24-item adult version**, in Spanish (anchored to the Spanish version included in the official CSDT Manual, with minor Colombia-specific lexical adaptation to be cognitively pretested), within our paid tiers (B2C Paid, USD 19; B2B-A; Ikigai Premium).
>
> Key parameters of our intended use:
> - **Application context:** general self-knowledge, never clinical diagnosis, never employment selection.
> - **Estimated annual administrations:** [insert realistic first-year volume, e.g., 5,000–20,000].
> - **Item presentation:** items administered through a secure backend (Supabase/PostgreSQL); item text displayed during testing with copyright/attribution clearly stated.
> - **Reporting to user:** six subscales reported separately, with descriptive non-pathologizing language and an explicit safety pathway to local Colombian mental-health helplines if frustration scores exceed defined thresholds.
> - **Attribution:** *"BPNSFS © Chen et al. (2015), used under license from the Center for Self-Determination Theory and Ghent University"* will be displayed in the user-facing report and in our public documentation.
> - **Data sharing:** we are open to sharing anonymized aggregate data for SDT research if of interest to your team.
>
> Could you please share:
> 1. Whether commercial licensing for this scope is available;
> 2. The pricing model and any terms (annual fee, per-administration royalty, or other);
> 3. Any documentation or contract template you typically use;
> 4. Whether you recommend coordinating with Dr. Lennia Matos (cc'd) regarding the Spanish adult version.
>
> We are happy to provide additional documentation, schedule a video call, or sign appropriate confidentiality agreements as needed.
>
> Thank you very much for your time and for the foundational work the BPNSFS represents in our field.
>
> With kind regards,
> [Name], [Title]
> DescubreMe — [URL]
> [Email] — [Phone]

### 6.5 Costo esperado y rangos

**Hecho:** el CSDT no publica tarifa pública para uso comercial de BPNSFS.

**Inferencia / opinión profesional:** rango realista USD 1.500–8.000/año para una plataforma freemium de volumen inicial bajo-medio en LATAM. Provisión presupuestal recomendada: **USD 5.000** para el primer año, sujeto a renegociación según volumen y términos finales.

### 6.6 Plan B (si licencia no se concede o demora >12 semanas)

| Opción | Instrumento | Notas |
|---|---|---|
| B-1 | **W-BNS — Work-related Basic Need Satisfaction (Van den Broeck, Vansteenkiste, De Witte, Soenens & Lens, 2010)** | 18 ítems, dominio laboral. **Ya presente en stack DescubreMe v2.0.** Cubre parcialmente SDT solo en contexto trabajo. Licencia: misma estructura CSDT — verificar autorización separada. NO sustituye al BPNSFS general. |
| B-2 | **Psychological Need Thwarting Scale (PNTS) — Bartholomew et al. (2011) / adaptación general Costa et al. (2015)** | Mide explícitamente frustración con redacción clara. Complemento, no sustituto completo (no incluye satisfacción bidimensional). |
| B-3 | **Balanced Measure of Psychological Needs (BMPN) — Sheldon & Hilpert (2012)** | 18 ítems, satisfacción y frustración de las tres necesidades; menos prevalente en LATAM pero estructura paralela. |
| B-4 | **BPN Satisfaction Scale (BPNSS "in general") — Deci & Ryan / Gagné (2003)** | 21 ítems, solo satisfacción. Fallback minimalista. |
| B-5 | **Inventario propio NPB-DM (DescubreMe)** | Solo último recurso. Requiere desarrollo psicométrico de 12–18 meses. NO recomendado. |

**Opinión profesional:** **B-1 + B-2** combinados pueden cubrir transitoriamente el caso de uso. Solución estable: licenciar BPNSFS. Iniciar gestión 4–6 meses antes del release objetivo.

---

## SECCIÓN 7 — DISCLAIMERS Y MITIGACIONES ESPECÍFICAS

### 7.1 Disclaimer pre-test (es-CO, copy-paste, ≤100 palabras)

> Estás por completar la **Escala de Satisfacción y Frustración de Necesidades Psicológicas Básicas (BPNSFS)**, una herramienta educativa de autoconocimiento. **No es una evaluación clínica, ni un diagnóstico, ni una prueba de selección.** Sus resultados describen cómo te sientes en este momento de tu vida, no quién eres como persona. Tómate tu tiempo, responde con honestidad y, si alguna pregunta te conmueve, sabes que puedes hacer una pausa. Al final encontrarás orientación si necesitas apoyo. Tomará entre 5 y 7 minutos.

### 7.2 Ítems sensibles y reglas NFR-28

**Ítems sensibles que activan monitor NFR-28 (ruta de contención):**

- **Frustración de relación:** ítems 4 (exclusión), 10 (frialdad), 16 (rechazo), 22 (relaciones superficiales).
- **Frustración de competencia:** ítems 6 (dudas sobre capacidad), 12 (decepción con desempeño), 18 (inseguridad), 24 (sentirse un fracaso).
- **Frustración de autonomía:** ítems 2, 8, 14, 20 (en menor medida; presión sostenida).

**Reglas de activación NFR-28:**

1. **Activación principal:** cualquier subescala de frustración (AF, CF, RF) con **media ≥ 4.0** sobre 5.
2. **Activación compuesta (bandera técnica interna):** Total_Frustration_promedio (media de los 12 ítems de frustración) **≥ 3.5** sobre 5.
3. **Activación crítica (prioridad alta):** ítem 24 ("me siento un fracaso por los errores que cometo") con respuesta **= 5**, o ítem 16 ("personas con las que paso tiempo me desprecian") con respuesta **= 5**.

**Acciones del backend al activarse NFR-28:**
- (a) Mostrar mensaje de contención (ver 7.3) al final del informe, antes del cierre.
- (b) Incluir referencia visible y clickable a líneas de ayuda (ver 7.4).
- (c) Sugerir, si DescubreMe lo tiene en stack, derivación a NFR-28 batería extendida o a contacto con profesional aliado.
- (d) Registrar en backend flag técnico interno (`risk_flag_bpnsfs = high`) para analítica agregada, **sin** exponer un puntaje "Total Frustration" agregado al usuario en la UI.

**Regla de reporte al usuario:** las 6 subescalas se reportan SIEMPRE por separado. **NUNCA** mostrar al usuario un "Total Frustration" o "Total Satisfaction" agregado (sí pueden existir como banderas técnicas en backend).

### 7.3 Mensaje de contención (es-CO, copy-paste, ≤120 palabras)

> **Notamos que algunas respuestas reflejan un momento difícil.**
> Lo que describes en esta evaluación — sensaciones de presión, exclusión, frustración o duda profunda sobre ti — son experiencias reales y dolorosas, y al mismo tiempo son experiencias **modificables**. No definen quién eres.
> Si lo que sientes es intenso o persistente, te invitamos a conversar con una persona de confianza y, si es posible, con un/a profesional de salud mental. En Colombia tienes líneas gratuitas de escucha disponibles 24 horas (ver más abajo).
> Buscar apoyo no es debilidad: es información, igual que cualquier resultado de esta plataforma. Estás haciendo algo importante al mirarte con honestidad.

### 7.4 Líneas de ayuda Colombia (vigentes a mayo 2026)

**Hecho (verificado en fuentes oficiales mayo 2025–2026):**

| Línea | Cobertura | Número | Modalidad | Horario | Fuente |
|---|---|---|---|---|---|
| Línea 106 — "El poder de ser escuchado" | Bogotá (también activa en Medellín, Cali, Cartagena como línea local de emergencia salud mental) | **106** | Llamada gratuita desde cel/fijo | 24/7 | Secretaría Distrital de Salud Bogotá (saludcapital.gov.co; bogota.gov.co, 2025) |
| Línea 106 WhatsApp | Bogotá | **300 754 8933** | WhatsApp | 24/7 | Idem |
| Línea Nacional de Salud Mental | Colombia (toda) | **192 opción 4** | Llamada gratuita | 24/7 | MinSalud Colombia |
| Línea 123 | Bogotá / nacional | **123** | Urgencias generales — incluye salud mental | 24/7 | Distrito Bogotá |
| Línea Psicoactiva Distrital (consumo SPA) | Bogotá | **01 8000 112 439** / WhatsApp 301 276 1197 | Llamada/WA | 24/7 | Distrito Bogotá (selia.co directorio; Secretaría Distrital de Salud) |
| Línea Calma (hombres adultos) | Bogotá | **01 8000 423 614** | Llamada gratuita | Programada | Cultura Ciudadana Bogotá (culturaciudadana.gov.co) |
| Línea Púrpura (violencia de género) | Bogotá | **01 8000 112 137** / WA 300 755 1846 | Llamada/WA | 24/7 | Distrito Bogotá |
| Línea Amiga Saludable | Medellín | **(604) 444 44 48** / WA 300 723 1123 | Llamada/WA | 24/7 | Alcaldía Medellín |
| Línea de la Vida | Barranquilla / Cartagena | **(605) 339 99 99** | Llamada | 24/7 | Distrito |
| Línea de la Vida México (usuarios MX) | México (toda) | **800 911 2000** | Llamada gratuita | 24/7 | Secretaría de Salud MX |
| SAPTEL (Cruz Roja Mexicana, soporte emocional) | México (toda) | **55 5259 8121** | Llamada | 24/7 | SAPTEL Cruz Roja Mexicana |
| Línea Nacional Salud Mental Argentina | Argentina (toda) | **0800 999 0091** | Llamada gratuita | 24/7 | Ministerio de Salud AR |

**Nota sobre "Línea Psicoactiva 113":** la mención de **113** en el brief de planificación parece referirse a un número que **no es estándar nacional** en Colombia para psicoactiva. La línea distrital de Psicoactiva en Bogotá es el toll-free 01 8000 112 439 (WA 301 276 1197). El número 113 NO está documentado oficialmente como línea psicoactiva nacional en las fuentes consultadas (MinSalud, Secretaría Distrital de Salud, Selia, agosto 2025). **Recomendación:** no usar "113" en la UI hasta confirmar; usar 01 8000 112 439 o 192 opción 4.

**Teléfono de la Esperanza Colombia:** [sin fuente verificada en este ciclo respecto a disponibilidad de línea local activa en 2026]. Verificar antes del release con la fuente local (https://telefonodelaesperanza.es/internacional muestra puntos en LATAM; verificar nodo Colombia).

### 7.5 Disclaimer post-test (es-CO, copy-paste, ≤80 palabras)

> Lo que acabas de ver es una **fotografía descriptiva** de tu experiencia en este momento, basada en una escala validada (BPNSFS, Chen et al., 2015). No es un diagnóstico, no te define y no es información médica. Si algo te resonó fuerte, conversarlo con alguien de confianza — y si lo necesitas, con un/a profesional — es siempre una buena decisión. Tu autoconocimiento es un proceso, y este es solo un paso.

---

## SECCIÓN 8 — SUGERENCIAS DE PILOTO COGNITIVO COLOMBIA

### 8.1 Tamaño y características de muestra

**Think-aloud cualitativo:** n = 15–30.
- Bogotá (n≈10), Medellín (n≈6), Cali (n≈6), zona rural / ciudad intermedia n=3–8.
- Edad: cuotas 18–29 (≈8), 30–44 (≈10), 45–59 (≈8), 60+ (≈4).
- Género: 50/50 mujer/hombre + mínimo 1 no-binario si la red lo permite.
- NSE: mezcla estratos 2–3 (≥40%), 4–5, 6.
- Educación: ≥30% con bachillerato como nivel máximo (no exclusivamente universitarios).

**Piloto cuantitativo:** n = 150–300.
- Reclutamiento por panel online + redes sociales con cuotas (edad, género, 5 macrorregiones DANE, NSE 1–6).
- Estratificación urbana/rural (≥15% rural).

### 8.2 Protocolo think-aloud

**Duración por sesión:** 45–60 minutos. **Formato:** entrevista 1:1, presencial o videollamada, grabada con consentimiento.

**Estructura:**
1. (5 min) Bienvenida, consentimiento informado (con derecho a no responder ítems que conmuevan), explicación del think-aloud.
2. (25–30 min) Aplicación ítem por ítem. Para CADA ítem preguntar:
   - "¿Qué entendiste por esta frase?"
   - "Si tuvieras que explicarle esta frase a un familiar tuyo, ¿cómo lo dirías?"
   - "¿Hay alguna palabra que te sonara rara, formal, o que no usarías?"
   - "¿Qué respuesta diste y por qué?"
3. (10 min) Revisión global de instrucciones y anclajes Likert.
4. (5 min) Experiencia emocional: ¿algún ítem te incomodó? ¿faltó algo?
5. (5 min) Datos demográficos breves y cierre.

**Registro:** transcripción verbatim; matriz ítem × participante × código (comprende / pide aclaración / propone redacción).

`[Aporte Gemini — control metodológico]` Adicionar un paso de medición de legibilidad con índice **Fernández-Huerta** (objetivo > 79.97 = nivel 6.º grado) sobre la versión es-CO 1.0 generada en el piloto, para documentar accesibilidad lectora y blindar la adaptación frente a sesgos educacionales/socioeconómicos.

### 8.3 Criterios para aceptar / re-adaptar ítem

| Indicador | Umbral de re-adaptación |
|---|---|
| Tasa de incomprensión espontánea | ≥ 20% (3/15 o más) |
| Tasa de palabras "raras"/"formales" | ≥ 25% |
| Tasa de no-respuesta o respuesta evasiva | ≥ 10% |
| Doble-barreled, ambigüedad o regionalismo | cualquier ocurrencia |
| Ítem activa malestar evitable (≠ malestar intrínseco al constructo) | revisión caso por caso con psicólogo/a clínico/a |

**Re-adaptación:** si un ítem cae bajo criterio, proponer 2 redacciones alternativas, validar con el contacto autorizado de la versión española (Lennia Matos), y re-pilotar en 5–10 sujetos.

### 8.4 Output esperado del piloto

1. **Informe lexical** (10–15 páginas): tabla 24 ítems × redacción original × redacción ajustada × evidencia × decisión.
2. **Versión es-CO 1.0** lista para piloto cuantitativo.
3. **Validación de instrucciones y anclajes Likert** en colombiano.
4. **Lista de ítems sensibles** con tratamiento UX específico.
5. **Recomendaciones de orden** de ítems (mezclado entre subescalas según convención SDT).
6. `[Aporte Gemini]` **Reporte de invariancia factorial** prevista para piloto cuantitativo: configural → métrica → escalar, idealmente con división por país (CO/MX/AR) si el N lo permite. Marco de referencia: directrices ITC + estudios de invariancia previos (Costa et al. 2015 multipaís; Chen et al. 2015 cuatro culturas).

---

## SECCIÓN 9 — GAPS Y PREGUNTAS ABIERTAS

### Pregunta 1 — Controversia Murphy et al. (2023) sobre validez de la frustración

**Cuestión:** Murphy et al. (2023, DOI 10.1037/pas0001193), reanalizando 8 muestras (N combinado ≈ 3.692), concluyen que la distinción satisfacción/frustración del BPNSFS "es probablemente un artefacto de método causado por la dirección del item keying". La defensa SDT (Park et al., 2025, DOI 10.1080/00223891.2024.2444460, con 807 militares canadienses) sostiene la estructura de seis factores, con correlaciones AS-AF, CS-CF, RS-RF moderadas-altas pero compatibles con constructos distintos.

`[Aporte Gemini — antecedente documental]` Murphy et al. (2023) además documentan que el **trabajo preliminar de disertación de Chen (2013)**, precursor directo de la publicación de 2015, concluyó inicialmente que el conjunto de ítems **no poseía soporte empírico suficiente para justificar escalas de frustración independientes**, y recomendó originalmente colapsar los reactivos en solo tres factores robustos de satisfacción. La bifurcación posterior en seis subescalas pudo responder a presión heurística por alinear el instrumento con la teoría de la asimetría motivacional de Vansteenkiste y Ryan (2013). **[verificar en disertación original Chen 2013 antes de citar públicamente]** — Implicación para DescubreMe: este antecedente fortalece la decisión metodológica de **no interpretar la frustración como polo opuesto de la satisfacción** y de transparentar la controversia en la documentación pública.

**Impacto en DescubreMe:** si la frustración fuera puramente artefacto, reportar subescalas separadas podría sobreinterpretar. Sin embargo, la utilidad aplicada de reportarlas por separado se sostiene tanto en la literatura como en la práctica SDT global.

**Plan de resolución:**
1. Documentar la controversia explícitamente en la *metodología pública* de DescubreMe.
2. Reportar las 6 subescalas pero **NO** interpretar la frustración como "polo opuesto" de la satisfacción — interpretar como experiencia adicional/separada.
3. En piloto cuantitativo DescubreMe (n ≥ 300), correr CFA seis factores + CFA tres factores con factores de método (Murphy modelo c) y comparar fit. Reportar en informe técnico.
4. Monitorear publicaciones 2026–2027 (extensiones Payne & Schimmack anuncian replicaciones).

### Pregunta 2 — Validación colombiana del BPNSFS

**Cuestión:** ¿Existe validación colombiana específica publicada o en proceso del BPNSFS 24-ítems general adultos?

**Estado:** **No identificada validación adulta general** en este ciclo de búsqueda. Estudios SDT colombianos identificados (Gil-Flórez et al., 2022) usan la versión laboral, no general. `[Aporte Gemini]` Existe uso documentado del BPNSFS (bajo nomenclatura ESFNPB) en Colombia en muestra adolescente clínica: **Patiño Zapata (2025), Universidad de Manizales, n=110 adolescentes con TDAH en el Quindío**, con M Satisfacción = 3.50 (DE=.88), M Frustración = 2.91 (DE=.74), r Pearson Sat-Frus = −.251. **NO es validación adulta general**, pero **es el primer uso colombiano documentado del instrumento** y establece precedente de viabilidad regional. [verificar antes de uso en producto: contrastar redacción exacta con versión Manual CSDT].

**Plan de resolución:**
1. Búsqueda extendida en Redalyc, SciELO Colombia, Dialnet, tesis doctorales (UNAL, U. de Los Andes, Javeriana, U. del Valle, CES, Universidad de Manizales).
2. Contacto directo con grupos SDT en Colombia (Wilson López-López, *Universitas Psychologica*; CES Medellín; U. del Norte; Universidad de Manizales — equipo Patiño Zapata).
3. Si efectivamente no existe validación adulta general, posicionar piloto cuantitativo DescubreMe (n=150–300) como contribución psicométrica original y considerar publicación.
4. Reverificar hipótesis Grubbs et al. (2025) con datos colombianos directamente con el equipo (Brigham Young University / repositorios OSF).

### Pregunta 3 — Doble idioma del consentimiento informado

**Cuestión:** ¿Cómo gestionar el consentimiento informado para usuarios bilingües (es/en) o usuarios LATAM que prefieren leer en inglés?

**Plan de resolución:**
1. Versión maestra en español Colombia; versión paralela en inglés disponible vía botón "View in English".
2. Ambas versiones legalmente vinculantes; en caso de discrepancia prevalece la versión en el idioma elegido por el usuario al aceptar.
3. Revisión legal en jurisdicción colombiana (Ley 1581/2012 protección de datos personales, Decreto 1377/2013) y alineación con leyes MX/AR.
4. Asentar elección de idioma en backend (`user.consent_language`) para trazabilidad.

### Preguntas abiertas adicionales

4. ¿La versión española del Manual CSDT (muestra peruana) mantiene equivalencia métrica plena con población colombiana adulta? **Plan:** análisis de invariancia configural/métrica/escalar en piloto N≥300, dividido por país (CO/MX/AR) si el volumen permite.
5. ¿Cómo conciliar la recomendación SDT de orden mixto de ítems con la trazabilidad de patrones de respuesta para detección de inconsistencia y "carelessness"? **Plan:** orden mixto fijo (no aleatorio por sujeto) + ítems de control de atención mínimos.
6. `[Aporte Gemini]` ¿Cómo manejar el concepto de **"frustración óptima"** (frustración moderada con función desarrollo-evolutiva, descrita en literatura psicodinámica y del desarrollo adolescente; Pinquart 2017 y otros)? El BPNSFS asume axiomáticamente que **toda frustración es nociva**, lo cual contradice evidencia de que niveles moderados, predecibles y contenidos de frustración operan como catalizadores de autonomía y resiliencia. **Plan:** (a) no etiquetar como problema un puntaje MEDIO de frustración en la interpretación al usuario; (b) reservar lenguaje de alerta solo para banda ALTO; (c) documentar esta limitación conceptual en metodología pública. **[Sin fuente verificada en este ciclo respecto a la disponibilidad de un estudio específico que demuestre el rol salutogénico de la frustración moderada en el BPNSFS — citar como gap teórico, no como hecho establecido].**

---

## SECCIÓN 10 — REFERENCIAS APA 7

Bartholomew, K. J., Ntoumanis, N., Ryan, R. M., & Thøgersen-Ntoumani, C. (2011). Psychological need thwarting in the sport context: Assessing the darker side of athletic experience. *Journal of Sport and Exercise Psychology*, 33(1), 75–102. https://doi.org/10.1123/jsep.33.1.75

Chen, B., Vansteenkiste, M., Beyers, W., Boone, L., Deci, E. L., Van der Kaap-Deeder, J., Duriez, B., Lens, W., Matos, L., Mouratidis, A., Ryan, R. M., Sheldon, K. M., Soenens, B., Van Petegem, S., & Verstuyf, J. (2015). Basic psychological need satisfaction, need frustration, and need strength across four cultures. *Motivation and Emotion*, 39(2), 216–236. https://doi.org/10.1007/s11031-014-9450-1

Cordeiro, P., Paixão, P., Lens, W., Lacante, M., & Luyckx, K. (2016). The Portuguese validation of the Basic Psychological Need Satisfaction and Frustration Scale: Concurrent and longitudinal relations to well-being and ill-being. *Psychologica Belgica*, 56(3), 193–209. https://doi.org/10.5334/pb.252

Costa, S., Ntoumanis, N., & Bartholomew, K. J. (2015). Predicting the brighter and darker sides of interpersonal relationships: Does psychological need thwarting matter? *Motivation and Emotion*, 39(1), 11–24. https://doi.org/10.1007/s11031-014-9427-0

Del Valle Tapia, M., Matos, L., Díaz Mujica, A. E., Pérez Villalobos, M. V., & Vergara Morales, J. (2018). Propiedades psicométricas de la Escala de Satisfacción y Frustración de las Necesidades Psicológicas Básicas (ESFNPB/BPNSFS) en universitarios chilenos. *Propósitos y Representaciones*, 6(1), 301–350. http://www.scielo.org.pe/scielo.php?script=sci_arttext&pid=S2307-79992018000100007

Frielink, N., Schuengel, C., & Embregts, P. J. C. M. (2019). Psychometric properties of the Basic Psychological Need Satisfaction and Frustration Scale — Intellectual Disability (BPNSFS-ID). *European Journal of Psychological Assessment*, 35(1), 37–45. https://doi.org/10.1027/1015-5759/a000366

Gil-Flórez, A., Llorens, S., Acosta-Antognoni, H., & Salanova, M. (2022). Basic Psychological Needs at Work: Their relationship with psychological well-being and healthy organisational outcomes with a gender perspective. *International Journal of Environmental Research and Public Health*, 19(5), 3103. https://doi.org/10.3390/ijerph19053103

Heissel, A., Pietrek, A., Rapp, M. A., Van der Kaap-Deeder, J., & Heinzel, S. (2023). Validating the German short Basic Psychological Need Satisfaction and Frustration Scale in individuals with depression. *Healthcare*, 11(3), 412. https://doi.org/10.3390/healthcare11030412

Murphy, B. A., Watts, A. L., Baker, Z. G., Don, B. P., Jolink, T. A., & Algoe, S. B. (2023). The Basic Psychological Need Satisfaction and Frustration Scales probably do not validly measure need frustration. *Psychological Assessment*, 35(2), 127–139. https://doi.org/10.1037/pas0001193

Olafsen, A. H., Halvari, H., & Frølund, C. W. (2021). The Basic Psychological Need Satisfaction and Need Frustration at Work scale: A validation study. *Frontiers in Psychology*, 12, 697306. https://doi.org/10.3389/fpsyg.2021.697306

Park, E. L., Dineva, D. R., Nordstokke, D. W., Goldring, R., MacDonald, S. W. S., & Watkins, K. (2025). The Basic Psychological Need Satisfaction and Frustration Scale: Some satisfying and frustrating findings. *Journal of Personality Assessment*, 107(4). https://doi.org/10.1080/00223891.2024.2444460

`[Aporte Gemini]` Patiño Zapata, M. (2025). *Relación entre la satisfacción o frustración de necesidades psicológicas básicas y la desregulación emocional en adolescentes con TDAH en instituciones educativas del Quindío* [Tesis de Maestría, Universidad de Manizales]. Repositorio Institucional RIDUM. https://ridum.umanizales.edu.co/server/api/core/bitstreams/1189a07b-5fc2-4edd-90e6-f38b6c278c63/content **[verificar título exacto y año en repositorio]**

Šakan, D. (2022). Validation of the Basic Psychological Need Satisfaction and Frustration Scale (BPNSFS) on adolescents in Serbia. *Current Psychology*, 41(4), 2227–2240. https://doi.org/10.1007/s12144-020-00742-z

Sheldon, K. M., & Hilpert, J. C. (2012). The Balanced Measure of Psychological Needs (BMPN) scale: An alternative domain general measure of need satisfaction. *Motivation and Emotion*, 36(4), 439–451. https://doi.org/10.1007/s11031-012-9279-4

Van Assche, J., van der Kaap-Deeder, J., Audenaert, E., De Schryver, M., & Vansteenkiste, M. (2022). Basic psychological need satisfaction and well-being across age: A cross-sectional general population study among 1709 Dutch-speaking adults. *Journal of Happiness Studies*, 23, 1707–1727. https://doi.org/10.1007/s10902-021-00482-2

Van den Broeck, A., Vansteenkiste, M., De Witte, H., Soenens, B., & Lens, W. (2010). Capturing autonomy, competence, and relatedness at work: Construction and initial validation of the Work-related Basic Need Satisfaction scale. *Journal of Occupational and Organizational Psychology*, 83(4), 981–1002. https://doi.org/10.1348/096317909X481382

Van der Kaap-Deeder, J., Soenens, B., Ryan, R. M., & Vansteenkiste, M. (2020). *Manual of the Basic Psychological Need Satisfaction and Frustration Scale (BPNSFS)*. Ghent University. https://selfdeterminationtheory.org/wp-content/uploads/2022/02/BPNSFS_Complete_2020.pdf

Vansteenkiste, M., Ryan, R. M., & Soenens, B. (2020). Basic psychological need theory: Advancements, critical themes, and future directions. *Motivation and Emotion*, 44(1), 1–31. https://doi.org/10.1007/s11031-019-09818-1

Zayed, K. N., Omara, E. N., Al-Rawahi, N. Y., Al-Shamli, A. K., Al-Atiyah, A. A., Al-Haramleh, A. A., Azab, M. S., Al-Khasawneh, G. M., & Hassan, M. A. (2021). Psychometric properties of the Arabic version of the Basic Psychological Needs Satisfaction-Frustration Scale (BPNSFS). *BMC Psychology*, 9(1), 15. https://doi.org/10.1186/s40359-020-00506-1

---

## Apéndice A — Mapa de aportes consolidados desde Gemini

| # | Sección | Aporte de Gemini | Valor agregado al pack | Verificación |
|---|---|---|---|---|
| 1 | §0, §2, §3, §9 | **Patiño Zapata (2025), Universidad de Manizales, tesis de maestría sobre BPNSFS/ESFNPB en n=110 adolescentes con TDAH del Quindío.** Reporta M Sat. = 3.50 (DE=.88), M Frus. = 2.91 (DE=.74), r Pearson Sat-Frus = −.251. Análisis con SPSS 29 + LISREL 8.5. URL RIDUM proporcionada. | Primer uso colombiano documentado del instrumento. No es baremo adulto general pero ancla la viabilidad regional y permite contraste futuro. Justifica contacto académico con Universidad de Manizales. | **PARCIAL** — URL del repositorio existe; redacción exacta del título e ítems usados **debe verificarse en PDF original antes de cita pública**. Etiquetado [verificar antes de uso]. |
| 2 | §2 (México) | Adaptación BPNSFS para prevención de embarazo adolescente (López Cervantes et al. 2024 — ResearchGate 379692581); BPNSFS-PE mexicana (Salazar-Ayala et al. 2020 — ResearchGate 339834971); BPNSFS docentes mexicanos (Dialnet 7783028). | Amplía panorama mexicano. Aclara que NINGUNA es la versión adulta general estándar. | **PARCIAL** — identificadores ResearchGate/Dialnet existen; revisar autoría exacta antes de cita formal. Etiquetado [verificar]. |
| 3 | §1.2 | Heissel et al. (2023) versión corta alemana 12-ítems en depresión clínica (n=344); BPNSFS-ID con test-retest a 2 semanas. | Contexto técnico sobre versiones derivadas; argumenta la decisión de NO usar versión corta para B2C general. | **OK** — Heissel et al. (2023) ya está en referencias de Claude (DOI 10.3390/healthcare11030412). |
| 4 | §2.1, §8.2 | Recomendación metodológica: aplicar **índice de legibilidad Fernández-Huerta** (objetivo > 79.97 = lectura 6.º grado) + directrices ITC para traducción/retrotraducción/decentering. | Refuerza defensa metodológica y legal de la adaptación es-CO; criterio cuantitativo concreto. | **OK** — Fernández-Huerta es índice de legibilidad estándar para español, documentado en literatura psicométrica. |
| 5 | §8.4 | Sugerencia explícita de incluir **reporte de invariancia configural/métrica/escalar** en piloto cuantitativo, idealmente por país (CO/MX/AR). | Eleva el rigor del piloto cuantitativo a estándar publicable. | **OK** — convención psicométrica estándar; alineada con Costa et al. 2015 ya en referencias. |
| 6 | §9 (Pregunta 1) | Antecedente documental Murphy: la **disertación original de Chen (2013)** recomendaba inicialmente tres factores de satisfacción y NO la bifurcación en seis subescalas. La separación final habría respondido a presión teórica. | Fortalece la decisión de DescubreMe de no interpretar frustración como polo opuesto. Útil para metodología pública. | **PENDIENTE** — necesita confirmar disertación de Chen 2013. Etiquetado [verificar antes de cita pública]. |
| 7 | §9 (Pregunta 6 adicional) | Concepto de **"frustración óptima"** (frustración moderada como catalizador del desarrollo) como gap conceptual del BPNSFS. | Justifica la decisión de NO patologizar puntajes MEDIO de frustración en la interpretación al usuario. | **PARCIAL** — concepto existe en literatura psicodinámica/del desarrollo (Pinquart 2017 citado por Gemini), pero su aplicación específica al BPNSFS es interpretación de Gemini. Tratado como gap conceptual abierto, no como hecho. |
| 8 | §3 (anclaje) | Confirma M Sat. y M Frus. en muestra colombiana adolescente como **anclaje provisional LATAM** además de Chen 2015 Perú y Del Valle 2018 Chile. | Triangulación regional para la heurística de bandas BAJO/MEDIO/ALTO. | **PARCIAL** — usar solo con disclaimer (muestra adolescente clínica, no adulta general). |

---

## Apéndice B — Notas de consolidación (metodología)

1. **Diagnóstico de cumplimiento del prompt v1.0:**
   - **Claude:** OK. Entregó las 10 secciones obligatorias con todos los sub-requisitos (24 ítems literales en inglés + tabla; adaptaciones por país; baremos publicados con marcadores anti-alucinación; ítems inversos numerados con notas NFR-28; 18 textos de interpretación es-CO en 6 subescalas × 3 bandas con tuteo cordial; license plan con email copy-paste; disclaimers pre/post + reglas NFR-28 + líneas Colombia con verificación 2025–2026; protocolo de piloto Colombia; ≥3 gaps con plan; 18 referencias APA 7). Uso correcto de marcadores `Hecho/Inferencia/Opinión profesional/[sin fuente verificada]`. Checklist propio de cumplimiento incluido.
   - **Gemini:** NO. Entregó un informe académico extenso (~170 párrafos, 53 fuentes citadas en formato no APA, con metadatos `[image1]…[image17]` corruptos de fórmulas estadísticas) que describe la historia, teoría y validaciones del BPNSFS, pero **no entrega ninguna de las 10 secciones operativas** requeridas. No hay banco literal de 24 ítems; no hay plan de licencia con email; no hay textos de interpretación al usuario; no hay disclaimers en es-CO; no hay líneas Colombia; no hay protocolo de piloto; no hay referencias APA 7 con DOI.

2. **Método de consolidación elegido:** **Claude base + Gemini suple.** Justificación: el desbalance estructural es tan profundo que no había base operativa en Gemini sobre la que comparar sección por sección. Se extrajeron de Gemini únicamente aquellos elementos que (a) aportan información nueva no localizada por Claude, (b) son verificables o etiquetables como `[verificar]`, (c) tienen valor para implementación o defensa metodológica.

3. **Aportes finales integrados desde Gemini:** 8 (ver Apéndice A). Concentrados en: hallazgo colombiano Patiño Zapata 2025; adaptaciones mexicanas adicionales; recomendaciones metodológicas (Fernández-Huerta, ITC, invariancia); antecedente histórico Chen 2013; concepto frustración óptima.

4. **Lo NO integrado de Gemini:** los ~120 párrafos teóricos de SDT (analogía planta/sal, asimetría motivacional, historia BPNS→BPNSFS, validaciones transculturales general, aplicaciones clínicas IGD/COVID, etc.) son sustantivamente correctos pero **no eran lo pedido por el prompt v1.0** (que era operacional, no teórico). Estos contenidos pueden alimentar un futuro documento de "metodología pública" o sección de FAQ académico de DescubreMe, pero no este pack de adquisición. La cita Patiño Zapata 2025 + Murphy + frustración óptima sí se conservan porque tocan decisiones operativas concretas del pack.

5. **Estado final:** v1.0 — listo para revisión legal, gestión de licencia y piloto cognitivo. Marcadores `[verificar antes de uso]` y `[sin fuente verificada]` mantenidos en todas las afirmaciones no confirmadas.

---

**Documento:** BPNSFS_Implementation_Acquisition_Pack_v1.0_Consolidado
**Fecha de elaboración:** mayo de 2026
**Estado:** v1.0 — listo para revisión legal y gestión de licencia.
**Nota final:** este pack es complementario al Dossier Psicométrico v2.1 previo de DescubreMe y NO sustituye al análisis psicométrico básico ya documentado. Toda decisión de implementación queda condicionada a la obtención de licencia de uso comercial del CSDT/Ghent University.
