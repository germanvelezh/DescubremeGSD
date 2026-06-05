# Implementation Acquisition Pack v1.0 — CFI-R (28 ítems) — CONSOLIDADO
**Producto destino:** DescubreMe (LATAM, foco Colombia) · **B2C Paid (USD 19) — v1.5** · NO recomendado para Free MVP por sensibilidad de Negative Career Outlook
**Versión del consolidado:** 1.0 · **Fecha:** mayo 2026
**Insumos:** `Prompt_10_CFI-R_IAR.Claude.md` (Implementation Acquisition Pack completo, 10 secciones) + `Prompt_10_CFI-R_IAR.Gemini.md` (revisión académica narrativa estilo white paper, sin estructura de prompt; aportes teóricos, psicométricos y de aplicabilidad)
**Idiomas:** español neutro (metadatos y notas internas) / español Colombia (Secciones 5 y 7)

> **Nota metodológica del consolidado.** Claude entregó el Pack completo siguiendo el prompt v1.0 al pie de la letra (10 secciones operativas). Gemini entregó una revisión académica narrativa de ~5.000 palabras sobre fundamentos epistemológicos, evolución histórica, andamiaje teórico (Parsons + Bandura + Savickas), arquitectura psicométrica, validaciones transculturales y fenomenología cualitativa del CFI-R; no produjo lista de ítems, clave de scoring, textos al usuario, plan de licencia, email, disclaimers ni piloto cognitivo. Este consolidado usa el Pack de Claude como base estructural completa e inyecta los aportes verificables de Gemini con la marca `[Aporte Gemini]`. La trazabilidad del origen de cada bloque está en el **Apéndice A**.

---

## TABLA DE COBERTURA (requisitos explícitos del prompt v1.0 vs. entrega)

| Requisito | Sección | Cobertura |
|---|---|---|
| Portada y metadatos + estado de bloqueadores | §0 | OK |
| Plan adquisición banco de ítems + lista literal 28 ítems en inglés con faceta/clave | §1 | OK (Apéndice abierto Rottinghaus et al., 2017) |
| Adaptaciones al español (España, México, Colombia, Argentina, Chile, Perú) | §2 | OK — **ningún país hispano tiene validación publicada del CFI-R 28** |
| Baremos publicados (EE. UU., Turquía + referencias internacionales) | §3 | OK (con marcadores `[sin fuente verificada]` para medias y percentiles de Rottinghaus 2012) |
| Tabla de ítems numerados con dirección (sólo ítem 15 invertido) | §4 | OK |
| 15 textos es-CO (5 dimensiones × 3 bandas) | §5 | OK (15/15) |
| Plan licencia (contacto Rottinghaus, práctica, pasos, email inglés, costo, Plan B CAAS) | §6 | OK |
| Disclaimers pre/post + ítems sensibles NCO + mensaje contención + líneas Colombia | §7 | OK |
| Piloto cognitivo Colombia (muestra n≈200, think-aloud, criterios, entregables) | §8 | OK |
| ≥ 3 gaps y preguntas abiertas | §9 | OK (5) |
| ≥ 10 referencias APA 7 con DOI | §10 | OK (13) |
| Marcadores Hecho/Inferencia/Opinión profesional | transversal | OK |
| Marcadores [sin fuente verificada] donde aplica | §3, §6 | OK |
| **Aportes consolidados desde Gemini con verificación pendiente** | Apéndice A | OK |

---

## SECCIÓN 0 — PORTADA Y METADATOS

| Campo | Valor |
|---|---|
| Acrónimo | CFI-R |
| Nombre completo | Career Futures Inventory–Revised |
| Autores | Rottinghaus, P. J.; Buelow, K. L.; Matyja, A.; Schneider, M. R. |
| Año / Publicación | 2012, *Journal of Career Assessment*, 20(2), 123–139 |
| DOI | 10.1177/1069072711420849 |
| Idioma original | Inglés (EE. UU.) |
| Versión / Longitud | CFI-R 28 ítems |
| Escala | Likert 5 puntos (1 = Strongly disagree → 5 = Strongly agree) |
| Tiempo estimado | 6–8 minutos |
| Subescalas (5) | Career Agency (10) · Occupational Awareness (6) · Support (4) · Work–Life Balance (4) · Negative Career Outlook (4) |
| Titular del copyright | Patrick J. Rottinghaus, University of Missouri (`rottinghausp@missouri.edu`) |
| Productos destino | DescubreMe **B2C Paid (USD 19 / v1.5)**. NO recomendado para Free MVP por sensibilidad de NCO. Aplicable a B2B-A previa licencia diferenciada. |

### Resumen ejecutivo (5 líneas)
El CFI-R es un instrumento autoinformado de 28 ítems que evalúa cinco dimensiones de la adaptabilidad de carrera en adultos jóvenes y trabajadores. **Hecho:** los ítems literales en inglés están publicados abiertamente en el Apéndice del artículo de validación de Rottinghaus, Eshelman, Gore, Keller, Schneider y Harris (2017, DOI 10.1007/s10775-016-9329-7), accesible vía SpringerLink. **Hecho:** no se ha localizado ninguna adaptación al español publicada del CFI-R 28 ítems en España, México, Colombia, Argentina, Chile ni Perú; sí existen adaptaciones al turco (Hamedoğlu et al., 2014) y referencias secundarias a alemán y coreano. **Opinión profesional:** DescubreMe debe (a) solicitar licencia escrita al autor antes del lanzamiento, (b) producir una adaptación es-CO propia siguiendo las ITC Guidelines (Muñiz, Elosua & Hambleton, 2013), y (c) operar con baremos provisionales (Z-scores sobre la propia muestra) hasta acumular n ≥ 500 colombianos.

`[Aporte Gemini]` **Evolución conceptual del instrumento (CFI 2005 → CFI-R 2012).** El CFI original (Rottinghaus, Day & Borgen, 2005, DOI 10.1177/1069072704270271) era un inventario de 25 ítems con tres subescalas: Adaptabilidad de Carrera (11), Optimismo de Carrera (11) y Conocimiento Percibido del mercado laboral (3). La revisión de 2012 reestructuró el modelo en cinco factores: el factor original de "Adaptabilidad" fue refinado, recortado y rebautizado como **"Career Agency"** (incorporando autoconciencia, locus de control interno y autoeficacia para transiciones); "Conocimiento Percibido" se expandió a **"Occupational Awareness"** con mayor densidad de ítems sobre tendencias económicas y tecnológicas; y se añadieron tres dimensiones sistémicas/ecológicas inexistentes en 2005: **Support, Work–Life Balance y Negative Career Outlook**. Esta evolución es relevante para el copy de DescubreMe: el CFI-R no es un "test de optimismo de carrera" sino un mapa multidimensional de la adaptabilidad que integra factores intrapsíquicos (agencia), cognitivos (conciencia), relacionales (apoyo), ejecutivos (equilibrio) y de vulnerabilidad clínica (NCO).

`[Aporte Gemini]` **Posicionamiento teórico vs. CAAS de Savickas.** El CFI-R sincretiza tres tradiciones: el modelo tripartito de Parsons (autoconocimiento + conocimiento del trabajo + razonamiento integrador), la teoría sociocognitiva de Bandura (autoeficacia, agencia personal, SCCT) y la Career Construction Theory de Savickas. Análisis de subescalas demuestran que el solapamiento entre Career Agency (CFI-R) y CAAS se concentra en las dimensiones "Control" y "Confidence" del modelo 4-C de Savickas; sin embargo, el CFI-R **no incorpora la dimensión temporal "Concern"** de la CCT. Implicación: Career Agency del CFI-R debe interpretarse como **medida de "respuestas de adaptación"** (conductas de afrontamiento ejecutivo en el presente) y no como "recursos de adaptabilidad" subyacentes. Esto otorga al CFI-R una ventaja para intervenciones de corto plazo y mediciones pre/post asesoramiento (verificable en Rottinghaus et al., 2017).

### Status de bloqueadores

| Bloqueador | Status | Razón |
|---|---|---|
| Licencia escrita del autor | **BLOCKED** | Sin política pública; requiere correo individual a Rottinghaus. Sin esta autorización **no** se debe ofrecer el test en producción comercial. |
| Acceso a ítems literales (EN) | **READY** | Apéndice abierto en Rottinghaus et al. (2017), SpringerLink. |
| Traducción es-CO validada | **BLOCKED** | No existe versión española publicada. Requiere traducción directa-inversa por comité + piloto cognitivo. |
| Baremos LATAM | **BLOCKED** | No hay baremos publicados para Colombia ni LATAM hispanohablante. Operar provisional con Z-scores intra-muestra. |
| Clave de scoring (directa/inversa) | **READY** | Clave oficial publicada en Apéndice 2017: sólo el ítem 15 es de inversión (RS). |
| Líneas de contención Colombia | **READY** | Línea 106 (Bogotá, SDS), Línea 192 opción 4 (MinSalud), Línea 123 (emergencias). |

---

## SECCIÓN 1 — ACQUISITION PLAN DEL BANCO DE ÍTEMS

### 1.1 Disponibilidad pública
**Hecho:** los 28 ítems en inglés están reproducidos íntegramente en el **Apéndice** del artículo Rottinghaus, P. J., Eshelman, A., Gore, J. S., Keller, K. J., Schneider, M., & Harris, K. L. (2017). *Measuring change in career counseling: Validation of the Career Futures Inventory-Revised.* *International Journal for Educational and Vocational Guidance*, 17(1), 61–75. DOI 10.1007/s10775-016-9329-7. URL del Apéndice (HTML): `https://link.springer.com/article/10.1007/s10775-016-9329-7` (sección "Appendix").

A continuación se reproduce el banco oficial **en inglés** (idioma original; la traducción al español es responsabilidad de DescubreMe y debe ser autorizada por el titular):

| seq_no | Ítem (EN, literal) | Faceta | Clave |
|---|---|---|---|
| 1 | I can perform a successful job search. | Career Agency | Directa |
| 2 | I doubt my career will turn out well in the future. | Negative Career Outlook | Directa (sube NCO) |
| 3 | I can establish a plan for my future career. | Career Agency | Directa |
| 4 | Others in my life are very supportive of my career. | Support | Directa |
| 5 | I understand how economic trends affect career opportunities available to me. | Occupational Awareness | Directa |
| 6 | I am aware of priorities in my life. | Career Agency | Directa |
| 7 | I am good at understanding job market trends. | Occupational Awareness | Directa |
| 8 | Thinking about my career frustrates me. | Negative Career Outlook | Directa (sube NCO) |
| 9 | I can easily manage my needs and those of other important people in my life. | Work–Life Balance | Directa |
| 10 | I can overcome potential barriers that may exist in my career. | Career Agency | Directa |
| 11 | I lack the energy to pursue my career goals. | Negative Career Outlook | Directa (sube NCO) |
| 12 | Balancing work and family responsibilities is manageable. | Work–Life Balance | Directa |
| 13 | My family is there to help me through career challenges. | Support | Directa |
| 14 | I can adapt to change in the world of work. | Career Agency | Directa |
| 15 | I do not understand job market trends. | Occupational Awareness | **INVERSA (RS)** |
| 16 | I am aware of my strengths. | Career Agency | Directa |
| 17 | I keep up with trends in at least one occupation or industry of interest to me. | Occupational Awareness | Directa |
| 18 | I receive encouragement from others to meet my career goals. | Support | Directa |
| 19 | I understand my work-related interests. | Career Agency | Directa |
| 20 | I am very strategic when it comes to balancing my work and personal lives. | Work–Life Balance | Directa |
| 21 | I keep current with job market trends. | Occupational Awareness | Directa |
| 22 | I understand my work-related values. | Career Agency | Directa |
| 23 | Friends are available to offer support in my career transition. | Support | Directa |
| 24 | I am good at balancing multiple life roles such as worker, family member, or friend. | Work–Life Balance | Directa |
| 25 | It is unlikely that good things will happen in my career. | Negative Career Outlook | Directa (sube NCO) |
| 26 | I will successfully manage my present career transition process. | Career Agency | Directa |
| 27 | I keep current with changes in technology. | Occupational Awareness | Directa |
| 28 | I am in control of my career. | Career Agency | Directa |

**Hecho — clave oficial de scoring (Apéndice 2017):**
- Career Agency: 1, 3, 6, 10, 14, 16, 19, 22, 26, 28
- Occupational Awareness: 5, 7, **15 (RS)**, 17, 21, 27
- Negative Career Outlook: 2, 8, 11, 25
- Support: 4, 13, 18, 23
- Work–Life Balance: 9, 12, 20, 24
- Recodificación de RS: 1→5, 2→4, 3→3, 4→2, 5→1.

### 1.2 Banco oficial vs. adaptaciones derivadas
**Hecho:** existen formas derivadas distintas al CFI-R 28: el **CFI original** de 25 ítems (Rottinghaus, Day & Borgen, 2005, DOI 10.1177/1069072704270271) y el **CFI Short Form / CFI-9** (McIlveen, Burton & Beccaria, 2013, DOI 10.1177/1069072712450493). DescubreMe utilizará el **CFI-R de 28 ítems**, no estas variantes.

`[Aporte Gemini]` **Diferencias estructurales CFI 2005 vs. CFI-R 2012 (no usar como sustituto).** El CFI 2005 (25 ítems) tiene tres factores; el CFI-R 2012 (28 ítems) tiene cinco. La transición no consistió en añadir ítems, sino en **reconceptualizar el factor "Adaptabilidad" como "Agency"** y **añadir las dimensiones relacionales (Support) y ejecutivas (WLB)**. Por tanto, las medias y baremos del CFI 2005 no son intercambiables con los del CFI-R 2012 y no deben usarse como punto de referencia para la versión que despliega DescubreMe.

### 1.3 Estructura del banco
- 28 ítems totales, escala Likert 1–5.
- Distribución por faceta: 10 / 6 / 4 / 4 / 4 (CA / OA / S / WLB / NCO).
- **Sólo 1 ítem invertido** en la clave oficial (ítem 15 en Occupational Awareness).
- Los 4 ítems de NCO se puntúan directos: la subescala mide un constructo de valencia negativa y un puntaje alto indica más pesimismo.

### 1.4 Recomendación operativa
- **Fuente primaria para reproducir los ítems en EN:** Apéndice abierto de Rottinghaus et al. (2017), `https://link.springer.com/article/10.1007/s10775-016-9329-7`.
- **Contacto inicial obligatorio:** Patrick J. Rottinghaus, `rottinghausp@missouri.edu` (Universidad de Missouri-Columbia). Aunque los ítems estén disponibles abiertamente con fines académicos, **el uso comercial en una plataforma de pago requiere licencia escrita**.

---

## SECCIÓN 2 — ADAPTACIONES AL ESPAÑOL DISPONIBLES

| País | Autores | Año | DOI/URL | N | Características | Acceso |
|---|---|---|---|---|---|---|
| España | — | — | — | — | No localizada | — |
| México | — | — | — | — | No localizada | — |
| Colombia | — | — | — | — | No localizada | — |
| Argentina | — | — | — | — | No localizada | — |
| Chile | — | — | — | — | No localizada | — |
| Perú | — | — | — | — | No localizada | — |

**Hecho:** búsquedas en Google Scholar, Semantic Scholar, ERIC, ResearchGate y Springer no devolvieron ninguna validación publicada del **CFI-R 28** en español hispanohablante. Tampoco se ubicó traducción depositada en SciELO, Dialnet o Redalyc. Existen, sí, adaptaciones del CFI-R a otros idiomas: **turco** (Hamedoğlu, Akin, Arslan, Kaya, Demir, Uysal & Sarıçam, 2014; N=346 docentes; DOI 10.1007/978-94-007-7362-2_59) y referencias secundarias a versiones en **alemán** (Spurk & Volmer, 2013) y **coreano** (Choi & Kim, 2006) [citadas en Çarkıt, 2025, DOI 10.54535/rep.1783405; sin fuente primaria verificada].

`[Aporte Gemini]` **Nota metodológica adicional sobre traducción.** Gemini reporta que las adaptaciones del CFI-R "han seguido protocolos de traducción y retro-traducción por especialistas lingüísticos y psicólogos nativos para asegurar que la semántica de Agencia, Apoyo y Optimismo no sufra distorsiones por modismos regionales". Esto refuerza la necesidad de un comité de traducción bilingüe con formación específica en psicología vocacional (no genérica) para la es-CO.

**Inferencia:** dado que el constructo "career adaptability" es relevante en LATAM y que existen adaptaciones al español del CAAS (no del CFI-R), la ausencia del CFI-R en español es un **vacío real**, no un artefacto de búsqueda. DescubreMe sería pionera al producir es-CO.

### 2.1 Recomendación de base para es-CO
Dado que **no hay base española existente**, el procedimiento recomendado es traducción directa desde el inglés con metodología **ITC Guidelines for Translating and Adapting Tests** (Muñiz, Elosua & Hambleton, 2013): (1) traducción directa por dos traductores bilingües independientes con formación en psicología vocacional; (2) síntesis por comité; (3) retrotraducción ciega al inglés; (4) revisión de equivalencia conceptual con Rottinghaus por email; (5) piloto cognitivo (ver Sección 8); (6) versión final es-CO.

### 2.2 Modificaciones léxicas anticipadas para Colombia
- **"job market trends"** (ítems 7, 15, 21) → "tendencias del mercado laboral" (evitar "mercado de trabajo", de menor uso conversacional en Colombia).
- **"work–life balance"** → "equilibrio entre trabajo y vida personal" (preferido a "conciliación", muy ibérico).
- **"career transitions"** → "transiciones laborales" o "cambios de carrera" (no "transiciones profesionales", calco anglosajón).
- **"career goals"** → "metas profesionales" (no "objetivos de carrera").
- **"good things will happen in my career"** (ítem 25) → "que me vayan a pasar cosas buenas en mi carrera" (registro coloquial colombiano sin perder formalidad).
- **"strategic"** (ítem 20) → "estratégico/a" — verificar comprensión en piloto, registro educativo medio.
- Evitar "currar", "majo", "vale", "vosotros". Tuteo cordial colombiano: "tú puedes…", "entiendes…".

---

## SECCIÓN 3 — BAREMOS PUBLICADOS

### Tabla maestra

| Estudio | País / Muestra | DOI | N | M (CA / OA / S / WLB / NCO) | DT | Percentiles |
|---|---|---|---|---|---|---|
| Rottinghaus et al. (2012) Sample 1 (development) | EE. UU., universitarios | 10.1177/1069072711420849 | "two large samples of university students" | **[sin fuente verificada — requiere acceso al PDF, no abierto]** | [sin fuente verificada] | [sin fuente verificada] |
| Rottinghaus et al. (2012) Sample 2 | EE. UU., universitarios | 10.1177/1069072711420849 | [sin fuente verificada] | [sin fuente verificada] | [sin fuente verificada] | [sin fuente verificada] |
| Rottinghaus et al. (2017) | EE. UU., 332 clientes centro orientación universitario; subconjunto longitudinal n=116 | 10.1007/s10775-016-9329-7 | 332 / 116 | [sin fuente verificada — no en abstract abierto] | [sin fuente verificada] | [sin fuente verificada] |
| Park, Rottinghaus, Wang, Zhang, Falk & Ko (2019) | EE. UU., muestra general universitaria vs muestra clínica | 10.1177/1069072718816514 | [sin fuente verificada] | [sin fuente verificada] | [sin fuente verificada] | Invariancia de medición (configural, métrica, escalar parcial) confirmada |
| Hamedoğlu et al. (2014) — versión turca | Turquía, 346 docentes Estambul/Sakarya | 10.1007/978-94-007-7362-2_59 | 346 (189 mujeres, 157 hombres) | **No reportadas medias en abstract** | — | **α por subescala (orden CA, NCO, OA, S, WLB): .57, .81, .70, .88, .83**. CFA: χ²=800.01, df=335, RMSEA=.049, CFI=.92, SRMR=.048 |
| **`[Aporte Gemini]` Oman (CFI-25)** | Universitarios omaníes — versión CFI 2005 25 ítems, NO CFI-R | ResearchGate 367166575 | n.r. en abstract | — | — | Estudio sobre la versión de 25 ítems (CFI original), no del CFI-R 28. **No transferible a DescubreMe sin re-validación.** |
| **`[Aporte Gemini]` Italia** | Universitarios italianos (Pignault, Houssemand y col.) | MDPI 10.3390/socsci10100372 | n.r. en abstract abierto | — | — | Validación de adaptabilidad de carrera en muestra italiana; relaciones con edad, género y áreas STEM/no-STEM. Referencia europea adyacente; verificar si usa CFI-R 28 o CAAS. |

**Nota crítica:** los datos descriptivos completos (M, DT, percentiles) del paper original de 2012 están en tablas detrás del paywall de SAGE. Para DescubreMe estos valores **NO deben copiarse de fuentes terciarias** sin verificación primaria. Recomendamos comprar el PDF (USD ~40) o solicitarlo directamente a Rottinghaus al hacer el contacto de licencia.

`[Aporte Gemini]` **Rango de fiabilidad reportado en literatura pre/post.** En estudios longitudinales pre/post de counseling, las alfas de las subescalas del CFI-R oscilan entre **α = 0.64 (NCO, atribuido a efectos de piso en muestras predispuestas positivamente y a asimetrías de interpretación)** y **α = 0.91 (Work–Life Balance)**. La versión turca corta (CFI-SF) reportó α = .81 para adaptabilidad general y α = .89 para optimismo. Implicación operativa para DescubreMe: la subescala NCO es la de menor consistencia interna; su uso clínico individual debe complementarse con disclaimers explícitos sobre interpretación descriptiva (ver §5.5 y §7).

`[Aporte Gemini]` **Sensibilidad al cambio (datos pre/post NC State).** Un estudio de pasantías estivales del NC State Extension (Farlow, ResearchGate / NC State Repository) reportó cambios estadísticamente notables tras inmersión laboral inmersiva: **Career Agency +29.3%, Occupational Awareness +15.5%, Work–Life Balance +28.3%, Negative Career Outlook −20%, Support −10%** (este último atribuido a la disminución de inmediatez de la red familiar al insertarse en el mundo adulto profesional). Implicación: el CFI-R es sensible al cambio en periodos cortos (semanas), lo que lo hace candidato para mediciones longitudinales en DescubreMe (test pre-onboarding y re-test trimestral en tier Paid), no sólo para snapshot de personalidad estable.

### 3.1 Recomendación de baremo provisional para LATAM
**Opinión profesional:** dado que no hay baremos hispanos publicados, el lanzamiento debe operar bajo un esquema de **baremos auto-generados intra-muestra** con la siguiente regla:
- Hasta n=200 respondientes colombianos: reportar al usuario **sólo bandas relativas** (Bajo/Medio/Alto) sobre Z-scores intra-muestra, sin percentiles publicitados como "norma".
- De n=201 a n=500: calcular percentiles propios de DescubreMe, etiquetados explícitamente "*baremo interno DescubreMe Colombia*, no normativo".
- Desde n≥500: percentiles internos con desagregación por sexo y rango etario (18–24, 25–34, 35–44, 45+).
- Mantener etiqueta visible al usuario: "Comparado con personas que han completado el test en DescubreMe Colombia" — nunca "con la población colombiana".

### 3.2 Roadmap para baremos colombianos propios
1. **Fase 0 (pre-launch):** piloto cognitivo n=150–300 (ver Sección 8).
2. **Fase 1 (lanzamiento controlado, mes 1–3):** muestreo no probabilístico ampliado, n objetivo 500, control de duplicados por device fingerprint + email.
3. **Fase 2 (mes 4–9):** análisis factorial confirmatorio para verificar la estructura de 5 factores en muestra colombiana; alfa de Cronbach y omega de McDonald por subescala.
4. **Fase 3 (mes 10–18):** publicar baremos en repositorio interno + propuesta de manuscrito de validación a *Revista Iberoamericana de Diagnóstico y Evaluación Psicológica* o *Universitas Psychologica*; coautoría con Rottinghaus si la licencia lo permite.

### 3.3 `[Aporte Gemini]` Validez convergente/discriminante reportada en literatura

| Tipo de validez | Hallazgo | Implicación para DescubreMe |
|---|---|---|
| Convergente | CFI-R total y Career Agency correlacionan **.38 a .49** con medidas de exploración de planes, auto-exploración y planificación de carrera | Justifica acoplar el CFI-R con instrumentos de exploración (RIASEC, valores) en la batería v1.5; los constructos convergen sin redundancia |
| Convergente | Agencia y optimismo del CFI-R correlacionan directamente con la **Career Decision Self-Efficacy Scale (CDMSE)** de Taylor & Betz | Refuerza el constructo como medida de autoeficacia vocacional accionable, no como rasgo abstracto |
| Discriminante | Aunque correlaciona con Big Five y bienestar psicológico general, retiene varianza predictiva única | El CFI-R **no es redundante** con BFI-2-S ni con escalas de bienestar; aporta señal independiente al perfil del usuario |
| Predictiva inversa | Occupational Awareness se asocia **negativamente** con indecisión vocacional, dificultades en el proceso y estrategias de evitación | OA emerge como predictor protector clave; merece tratamiento prominente en el feedback al usuario |

---

## SECCIÓN 4 — ÍTEMS INVERSOS NUMERADOS

**Fuente:** clave oficial de scoring publicada en el Apéndice de Rottinghaus et al. (2017).

| Ítem # | Faceta | Dirección | Notas |
|---|---|---|---|
| 1 | Career Agency | Directa | — |
| 2 | Negative Career Outlook | Directa | Puntaje alto = más pesimismo |
| 3 | Career Agency | Directa | — |
| 4 | Support | Directa | — |
| 5 | Occupational Awareness | Directa | — |
| 6 | Career Agency | Directa | — |
| 7 | Occupational Awareness | Directa | — |
| 8 | Negative Career Outlook | Directa | Sube NCO |
| 9 | Work–Life Balance | Directa | — |
| 10 | Career Agency | Directa | — |
| 11 | Negative Career Outlook | Directa | Sube NCO |
| 12 | Work–Life Balance | Directa | — |
| 13 | Support | Directa | — |
| 14 | Career Agency | Directa | — |
| **15** | **Occupational Awareness** | **INVERSA (RS)** | **Único ítem invertido oficialmente. Recodificar 1↔5, 2↔4, 3=3.** |
| 16 | Career Agency | Directa | — |
| 17 | Occupational Awareness | Directa | — |
| 18 | Support | Directa | — |
| 19 | Career Agency | Directa | — |
| 20 | Work–Life Balance | Directa | — |
| 21 | Occupational Awareness | Directa | — |
| 22 | Career Agency | Directa | — |
| 23 | Support | Directa | — |
| 24 | Work–Life Balance | Directa | — |
| 25 | Negative Career Outlook | Directa | Sube NCO |
| 26 | Career Agency | Directa | — |
| 27 | Occupational Awareness | Directa | — |
| 28 | Career Agency | Directa | — |

**Implementación en el Scoring Engine:**
```
raw_OA  = item5 + item7 + (6 - item15) + item17 + item21 + item27
raw_CA  = item1 + item3 + item6 + item10 + item14 + item16 + item19 + item22 + item26 + item28
raw_S   = item4 + item13 + item18 + item23
raw_WLB = item9 + item12 + item20 + item24
raw_NCO = item2 + item8 + item11 + item25
```
Promedio por subescala = raw / nº ítems. Rango de cada subescala: 1.0 – 5.0.

---

## SECCIÓN 5 — TEXTOS DE INTERPRETACIÓN AL USUARIO (es-CO)

> **Principios aplicados:** descriptivo (no etiquetador), aspiracional (no determinista), no clínico, tuteo cordial colombiano, banda + ejemplo conductual + invitación reflexiva. Bandas: BAJO ≤ p16 · MEDIO p17–p83 · ALTO ≥ p84. Cada texto ≤80 palabras.

### 5.1 Career Agency (Agencia de carrera)
*Descripción técnica interna:* percepción de la propia capacidad para reflexionar sobre, planificar y gestionar las transiciones de carrera; incluye autoconciencia, control percibido y autoeficacia vocacional. `[Aporte Gemini]` Conceptualmente medida de **"respuestas de adaptación"** (acciones de afrontamiento en el presente), no de "recursos de adaptabilidad" abstractos.

**BAJO (≤ p16):**
> Por ahora, sientes que tomar decisiones sobre tu trayectoria laboral te cuesta más trabajo que a otras personas. Es común dudar entre opciones o sentir que el rumbo no depende del todo de ti, sobre todo en momentos de cambio. ¿Qué pequeña decisión sobre tu carrera podrías tomar esta semana, aunque sea exploratoria, para empezar a recuperar sensación de control?

**MEDIO (p17–p83):**
> Tienes una percepción razonable de tu capacidad para conducir tu carrera. En algunos temas sientes claridad y autoeficacia; en otros, todavía estás definiendo. Eso es normal. ¿Qué áreas de tu vida laboral sientes que dominas y cuáles aún están en construcción? Identificarlas puede ayudarte a enfocar tu próxima etapa.

**ALTO (≥ p84):**
> Reportas una alta sensación de agencia sobre tu carrera: te ves capaz de planificar, adaptarte y superar obstáculos. Esto sugiere que valoras la autonomía y la iniciativa en lo profesional. ¿Cómo cuidas esa autoeficacia frente a contextos donde las decisiones dependen menos de ti, como reestructuraciones o mercados inestables?

### 5.2 Occupational Awareness (Conciencia ocupacional)
*Descripción técnica interna:* nivel autoinformado de comprensión sobre tendencias del mercado laboral, ocupaciones y dinámicas económicas relevantes para las propias decisiones de carrera. `[Aporte Gemini]` Literatura reciente la posiciona como un **factor protector** contra la ansiedad de carrera en contextos de incertidumbre (post-pandemia, IA).

**BAJO:**
> Por ahora sientes que conoces poco las tendencias del mercado laboral o que la información disponible te abruma. Eso es entendible: el entorno cambia rápido. Una opción concreta: elige una industria que te interese y dedica 30 minutos a leer un informe reciente sobre ella. ¿Qué te gustaría entender mejor del mundo del trabajo?

**MEDIO:**
> Tienes una comprensión intermedia del mercado laboral. Sigues algunas tendencias y conoces ciertas ocupaciones, aunque otras áreas se te escapan. Eso es lo más común. ¿Qué fuentes de información ocupacional consultas hoy y cuáles podrías sumar para enriquecer tu mirada?

**ALTO:**
> Reportas una alta conciencia de las tendencias laborales y los cambios del entorno. Esto sugiere que valoras la información y la usas para anticipar decisiones. ¿De qué manera traduces ese conocimiento del mercado en movimientos concretos en tu propia trayectoria?

### 5.3 Support (Apoyo)
*Descripción técnica interna:* percepción de apoyo de familia, amistades y red cercana en relación con metas y transiciones de carrera.

**BAJO:**
> Por ahora sientes que tu red cercana no acompaña mucho tus decisiones laborales o que enfrentas los retos de carrera más bien en solitario. Esto puede pesar, sobre todo en momentos de cambio. ¿Hay alguna persona —familiar, amigo, mentor— a quien podrías contarle qué estás pensando sobre tu carrera, aunque no esperes una solución?

**MEDIO:**
> Cuentas con cierto respaldo en tu entorno cercano para tus decisiones de carrera, aunque no en todos los temas ni con todas las personas. Es una situación habitual. ¿Quiénes son las personas a las que sí acudes hoy, y cómo podrías nutrir esos vínculos?

**ALTO:**
> Sientes un alto nivel de apoyo de familia y amistades para tus metas profesionales. Esto sugiere que tu red emocional está activa y disponible. ¿Cómo cuidas y retribuyes ese apoyo? Y, en momentos en que necesites otra mirada, ¿sabes a quién acudir?

### 5.4 Work–Life Balance (Equilibrio vida-trabajo)
*Descripción técnica interna:* percepción de capacidad para gestionar simultáneamente roles laborales, familiares y personales sin conflicto sostenido.

**BAJO:**
> Por ahora sientes que combinar trabajo, familia y vida personal te resulta exigente o que un área le quita energía a las otras. Es frecuente, sobre todo en etapas de carga alta. ¿Qué actividad fuera del trabajo te recarga y cuánto espacio tiene hoy en tu semana?

**MEDIO:**
> Logras un equilibrio aceptable entre tus distintos roles, con altibajos. Algunos días la balanza se inclina; otros la recuperas. Eso es lo normal en adultos activos. ¿Qué señales te avisan que el equilibrio se está rompiendo, y qué haces cuando aparecen?

**ALTO:**
> Reportas alta habilidad para sostener múltiples roles —trabajador, familiar, amigo— sin que uno colonice al resto. Esto sugiere que valoras la integración y has desarrollado estrategias para protegerla. ¿Cuáles son esas estrategias, y cómo las mantendrías si tus circunstancias cambiaran?

### 5.5 Negative Career Outlook (Perspectiva de carrera negativa) — **APLICAR MÁXIMA CAUTELA**
*Descripción técnica interna:* tendencia a anticipar resultados desfavorables en la propia carrera y a experimentar emociones de frustración o desánimo asociadas a ella. **No es una medida de depresión ni de salud mental.** `[Aporte Gemini]` α típica = 0.64 en literatura pre/post; la subescala es psicométricamente la más débil del instrumento — interpretación cautelosa obligatoria.

**BAJO (puntaje bajo en NCO = perspectiva más optimista):**
> Por ahora tu mirada sobre tu futuro laboral es más bien favorable: no sueles anticipar que las cosas saldrán mal. Esto sugiere una disposición optimista que puede ser un recurso valioso. ¿Reconoces qué experiencias o personas han alimentado esa mirada?

**MEDIO:**
> Tienes una mirada mixta sobre tu futuro de carrera: a veces aparecen dudas o frustraciones, y otras veces predomina la confianza. Es lo más habitual. ¿Qué situaciones suelen activar las dudas, y qué te ayuda a volver a una mirada más equilibrada?

**ALTO (puntaje alto = más pesimismo) — texto especialmente cuidadoso:**
> En este momento aparecen con frecuencia pensamientos de que tu carrera podría no ir bien o sensaciones de frustración al pensar en ella. Esto **no define quién eres ni tu futuro**: puede reflejar un contexto difícil o cansancio sostenido. Te invitamos a observar qué situaciones acompañan esos pensamientos y, si lo deseas, a hablarlo con alguien de confianza. Encontrarás líneas de apoyo gratuito al final del informe.

---

## SECCIÓN 6 — LICENSE ACQUISITION PLAN

### 6.1 Titular y contacto
- **Persona:** Dr. Patrick J. Rottinghaus
- **Cargo:** Program Training Director, Counseling Psychology; Profesor, Department of Educational, School and Counseling Psychology
- **Institución:** University of Missouri–Columbia (Mizzou)
- **Email institucional:** `rottinghausp@missouri.edu`
- **Página oficial:** https://cehd.missouri.edu/person/patrick-rottinghaus/

### 6.2 Práctica histórica de concesión
**Hecho:** Rottinghaus es coautor de múltiples adaptaciones idiomáticas (turca documentada; alemana y coreana citadas en literatura secundaria) y ha publicado el banco completo de ítems en un apéndice abierto (2017), lo que indica disposición al uso académico amplio. **Inferencia:** no existe política pública de fees ni un editor formal (a diferencia de instrumentos publicados por PAR, Pearson, Hogrefe o CPP/Kuder, donde sí actúa como consultor pero el copyright es corporativo). El CFI-R parece estar bajo gestión personal del autor, lo que da margen para negociar términos no comerciales y comerciales por separado. **Opinión profesional:** la práctica más común en estos casos es licencia gratuita o de bajo costo para uso académico, y licencia comercial negociable (orden de magnitud USD 500–5 000/año o royalty por uso) para plataformas de pago.

### 6.3 Pasos para solicitar
1. Enviar email inicial (ver 6.4) explicando uso, contexto, escala y compromiso de fidelidad psicométrica.
2. Esperar respuesta 7–21 días; si no hay respuesta, enviar follow-up cortés a los 14 días.
3. Confirmar términos por escrito: alcance (CFI-R 28 ítems, español-Colombia, plataforma B2C de pago), duración, fee, atribución, restricciones (no clínico, no selección, sin entrega de ítems a terceros).
4. Firmar acuerdo (Memorandum of Understanding o License Agreement); si el monto supera USD 3 000/año, involucrar al University of Missouri Office of Technology Advancement.
5. Coordinar permiso adicional para producir y publicar la **traducción es-CO** (derecho derivado).
6. Si se planea publicar la validación es-CO en revista, ofrecer coautoría al titular.

### 6.4 Borrador de email inicial (en inglés)

> **Subject:** License inquiry — CFI-R for a Spanish-language adult self-discovery platform in Latin America
>
> Dear Dr. Rottinghaus,
>
> My name is [NOMBRE], and I lead [ROL] at **DescubreMe**, a Colombia-based, Latin-America-focused digital platform offering psychometric self-discovery tools to adult users. We operate a paid B2C tier (USD 19) and a B2B-academic tier; our use case is **strictly educational and developmental — not clinical, not used for hiring or selection decisions, and not used for diagnosis.**
>
> We are interested in licensing the **Career Futures Inventory–Revised (CFI-R, 28 items; Rottinghaus, Buelow, Matyja & Schneider, 2012)** for inclusion in our platform. The CFI-R's five-factor architecture (Career Agency, Occupational Awareness, Support, Work–Life Balance, Negative Career Outlook) is uniquely well-suited to the developmental questions our adult users bring to the platform.
>
> Specifically, we would like to request:
>
> 1. Permission to use the CFI-R 28-item English version with our small English-speaking user segment.
> 2. Permission to produce a **Spanish (Colombia) translation** following ITC Guidelines (forward–back translation, expert committee, cognitive pretesting with n≈200), with the translation submitted to you for review before deployment.
> 3. Clarification of any licensing fees (one-time or annual) for commercial B2C use, and any conditions regarding score reporting, item confidentiality, and attribution.
>
> We commit to:
> - Strict psychometric fidelity (no item modifications beyond linguistic adaptation; same 5-point Likert scale; official scoring key as published in the 2017 Appendix).
> - No use of CFI-R scores for hiring, admissions, clinical diagnosis, or any high-stakes decision.
> - Clear user-facing language framing results as developmental, descriptive, and non-deterministic.
> - Full attribution to you and the original authors in every report and in our platform's psychometric documentation.
> - Sharing aggregate Colombian normative data with you should you wish, and offering co-authorship on any resulting validation manuscript.
>
> Could we schedule a brief call (15–20 min) at your convenience to discuss terms? I am happy to send a more detailed product overview and a draft of the Spanish translation protocol in advance.
>
> Thank you very much for your time and for your continued contribution to vocational psychology — the CFI-R fills a gap that no other instrument addresses for our population.
>
> Warm regards,
>
> [NOMBRE] · [CARGO] · DescubreMe · [EMAIL] · [WEB] · [TELÉFONO]

### 6.5 Costo esperado (USD)
**Inferencia / opinión profesional, no cifra publicada por el autor:**
- Uso académico no comercial: típicamente **USD 0**.
- Licencia comercial B2C plataforma freemium: rango estimado **USD 500 – 5 000 / año** o royalty por administración (≈ USD 0.50–2.00 por test completado).
- Permiso para producir traducción es-CO: usualmente sin fee adicional si se cede coautoría académica o se entrega la versión validada al autor.
- Si el autor remite a University of Missouri Office of Technology Advancement, podría escalar a un acuerdo formal con upfront + royalty.

### 6.6 Plan B si no se obtiene licencia
**Hecho — equivalencia constructiva:** el **CAAS (Career Adapt-Abilities Scale)** de Savickas y Porfeli (2012, DOI 10.1016/j.jvb.2012.01.011) es el instrumento más usado a nivel internacional para adaptabilidad de carrera (24 ítems, 4 factores: Concern, Control, Curiosity, Confidence), con validaciones en 13+ países y **adaptaciones publicadas al español**.

| Opción | Pros | Contras |
|---|---|---|
| **B1. CAAS-International / CAAS-SF (12 ítems)** | Ítems publicados como apéndice en Savickas & Porfeli (2012); validaciones en español disponibles; menor licencia | Mide adaptabilidad como recurso interno, **no incluye Support, Work–Life Balance ni Negative Career Outlook**. Pierde la riqueza relacional y emocional. |
| **B2. CFI-9 / CFI Short Form** (McIlveen, Burton & Beccaria, 2013) | 9 ítems, 3 factores; más breve | Mismo titular de copyright (Rottinghaus). Si no se obtiene licencia del CFI-R, tampoco se obtendrá esta. |
| **B3. Construir instrumento propio** de adaptabilidad inspirado en literatura abierta | Sin restricciones legales | Requiere ciclo completo de validación (12–18 meses, n≥400); no es un sustituto a corto plazo. |
| **B4. Combinar CAAS-SF + módulo propio de Work–Life Balance** (e.g., ítems de la Work–Family Balance Scale, Hill et al., 2001) | Recupera contenido faltante | Mezcla de fuentes; reportar como "batería compuesta DescubreMe" sin atribuir adaptabilidad clínica a la combinación. |

`[Aporte Gemini]` **Nota teórica sobre la elección Plan A vs. Plan B.** Si DescubreMe migra al CAAS (Plan B1), debe comunicar internamente que **NO está midiendo lo mismo**: el CAAS mide "recursos de adaptabilidad" (constructos disposicionales subyacentes según CCT Savickas), mientras que Career Agency del CFI-R mide "respuestas de adaptación" (acciones conductuales de afrontamiento en el presente). Esta diferencia afecta tanto el copy al usuario como el frame del producto (capacidad latente vs. comportamiento accionable).

**Recomendación:** intentar primero licencia del CFI-R (2 ciclos de contacto, 30 días). Si no hay respuesta o términos son inviables, **migrar a CAAS-International como producto v1.0**, dado que ya cuenta con validaciones en español y permisos públicos en su apéndice.

---

## SECCIÓN 7 — DISCLAIMERS Y MITIGACIONES ESPECÍFICAS

### 7.1 Disclaimer pre-test (es-CO, ≤100 palabras)

> Este cuestionario explora cómo te ves frente a tu carrera y tu vida laboral. **No es una prueba clínica, no diagnostica y no debe usarse para decisiones de contratación, admisión o tratamiento.** Tus respuestas son confidenciales y se usan únicamente para generarte un informe descriptivo. No hay respuestas correctas ni incorrectas; responde con sinceridad lo que sientes hoy, sabiendo que las personas cambian. Tomará entre 6 y 10 minutos. Al continuar, aceptas el tratamiento de tus datos según nuestra Política de Privacidad. Si en cualquier momento te sientes incómodo/a, puedes detenerte.

### 7.2 Ítems sensibles que activan NFR-28 (No-Fly Rules de contención)

NFR-28 se activa cuando el usuario marca **respuesta 4 o 5 (Acuerdo / Fuerte acuerdo)** en cualquiera de estos cuatro ítems de NCO:

| Ítem # | Texto (EN) | Riesgo |
|---|---|---|
| 2 | I doubt my career will turn out well in the future. | Anticipación negativa |
| 8 | Thinking about my career frustrates me. | Frustración aguda |
| **11** | **I lack the energy to pursue my career goals.** | **Posible solapamiento con anhedonia/agotamiento — máxima cautela** |
| 25 | It is unlikely that good things will happen in my career. | Desesperanza |

**Regla operativa:**
- 1 ítem ≥4 → mostrar nota suave al final del informe ("Algunas preguntas mostraron desánimo; si te interesa, mira las líneas de apoyo").
- 2 ítems ≥4 → mostrar mensaje de contención (7.3) **antes** del informe.
- 3 o 4 ítems ≥4, **o** ítem 11 = 5 → mostrar mensaje de contención **prominente** + ofrecer salir del flujo + listar líneas de ayuda al inicio del informe.

NFR-28 **nunca** debe diagnosticar, etiquetar al usuario, ni bloquear el acceso al informe; sólo añade contención.

### 7.3 Mensaje de contención (es-CO, ≤120 palabras)

> Hemos notado que varias de tus respuestas reflejan cansancio o desánimo en relación con tu carrera. Queremos recordarte algo importante: **lo que respondiste hoy describe un momento, no una sentencia sobre tu futuro.** Muchas personas pasan por etapas así, sobre todo en transiciones difíciles, y la mayoría las atraviesan con apoyo y tiempo. Si sientes que el desánimo va más allá de lo laboral —si afecta tu sueño, tu ánimo o tus ganas de vivir— por favor habla con alguien de confianza o llama a una de las líneas gratuitas que listamos abajo. Pedir ayuda no es debilidad: es una decisión valiente. Tu informe estará disponible cuando quieras continuar.

### 7.4 Líneas de ayuda en Colombia (verificadas 2025)

| Línea | Cobertura | Número | Operador / Fuente |
|---|---|---|---|
| **Línea 106 "El poder de ser escuchado"** | Bogotá, 24/7, gratuita | **106** (fijo o celular); WhatsApp **300 754 8933** | Secretaría Distrital de Salud (saludcapital.gov.co) |
| **Línea Nacional de Salud Mental** | Nacional, 24/7 | **192, opción 4** | Ministerio de Salud y Protección Social |
| **Línea de Emergencias** | Nacional, riesgo vital inmediato | **123** | Sistema NUSE |
| **Línea Calma** | Hombres adultos, Bogotá | **01 8000 423 614** | Secretaría Distrital de Cultura |
| **Línea Púrpura** | Mujeres en situaciones de violencia | **01 8000 112 137**; WhatsApp **300 755 1846** | Distrital |
| **Línea Amiga Saludable** | Medellín | **(604) 444 4448**; WhatsApp **300 723 1123** | Secretaría de Salud de Medellín |
| **Línea de la Vida** | Barranquilla | **(605) 339 9999** | Distrital |

**Hecho:** según la Secretaría Distrital de Salud de Bogotá (bogota.gov.co, mayo 2025), la Línea 106 atendió 40 000 intervenciones entre enero y abril de 2025 (+81 % vs 2024). El **Directorio Nacional de Líneas Territoriales de Atención en Salud Mental** de MinSalud (agosto 2025) consolida la oferta departamental.

### 7.5 Disclaimer post-test (es-CO, ≤80 palabras)

> Este informe es **descriptivo, no diagnóstico**. Refleja cómo te ves hoy, no quién eres ni en qué te convertirás. Los resultados pueden cambiar con el tiempo, las experiencias y los apoyos. **No los uses para decisiones laborales o académicas de alto impacto sin acompañamiento profesional.** Si algún tema te dejó pensando o incómodo/a, habla con alguien de confianza o con un/a profesional. Las líneas listadas son gratuitas y confidenciales.

---

## SECCIÓN 8 — SUGERENCIAS DE PILOTO COGNITIVO COLOMBIA

### 8.1 Muestra
- **n objetivo:** 200 (mínimo 150, ideal 300 para análisis exploratorio paralelo).
- **Distribución geográfica:** Bogotá ~45 %, Medellín ~25 %, Cali ~15 %, otras ciudades intermedias ~15 %.
- **Edad:** 60 % Millennials (28–43) + 40 % Gen Z adultos (18–27), reflejando el perfil esperado del tier B2C Paid.
- **Sexo:** mínimo 40 % de cada sexo registrado.
- **Educación:** 50 % universitario completo, 30 % técnico/tecnológico, 20 % bachiller.
- **Estado laboral:** mix de empleados, independientes, en transición, estudiantes-trabajadores. Excluir: menores de edad, personas en duelo agudo (<6 meses), personas en tratamiento psiquiátrico activo (autoinformado).

### 8.2 Protocolo think-aloud
- Modalidad: remoto vía videollamada, 45–60 min, incentivo monetario equivalente a USD 10–15.
- Cada participante completa los 28 ítems verbalizando: (a) qué entiende por cada palabra clave, (b) qué evento de su vida usa como referencia, (c) por qué eligió la respuesta marcada.
- Probe estandarizado por ítem: *"¿Puedes contarme con tus palabras qué quiere decir esta pregunta?"* y *"¿Hay alguna palabra que te sonó rara o forzada?"*.
- Para los 4 ítems de NCO: probe adicional sobre confort emocional al responder.
- Codificación por dos investigadores, índice de acuerdo Cohen's kappa ≥ .70.

### 8.3 Criterios para aceptar / re-adaptar ítem
- **Índice de comprensibilidad (IC):** ≥ 85 % de participantes parafrasean correctamente el constructo → **aceptar**.
- **IC 70–84 % →** re-adaptar léxico y re-pilotear con n=30.
- **IC < 70 % →** re-traducir, consultar a Rottinghaus y re-pilotear completo.
- **Tasa de respuestas "neutro" > 35 %** en un ítem → revisar formulación (posible ambigüedad).
- **Skip/no-respuesta > 5 %** → revisar incomodidad o falta de aplicabilidad.

### 8.4 Output esperado
1. Versión final es-CO de los 28 ítems con bitácora de cambios por ítem.
2. Reporte de comprensibilidad por ítem y por subescala.
3. Estimación preliminar de alfa de Cronbach (sólo orientativa con n<300).
4. Lista de ítems candidatos a reformulación para v1.1.
5. Briefing para el equipo de redacción sobre términos colombianos confirmados/descartados.
6. Reporte de adherencia, tiempo medio de respuesta y tasa de abandono por bloque.

---

## SECCIÓN 9 — GAPS Y PREGUNTAS ABIERTAS

1. **¿Cuáles son las medias (M), desviaciones típicas (DT) y percentiles publicados en las dos muestras originales de Rottinghaus et al. (2012)?**
   *Plan:* comprar el PDF en SAGE (USD ~40) o solicitarlo a Rottinghaus en el primer contacto de licencia. Sin estos datos no se puede construir un "baremo de referencia internacional" siquiera tentativo para comparar a Colombia.

2. **¿Cuál es el coste real de licencia comercial que el autor exigirá para uso en una plataforma B2C de pago en LATAM?**
   *Plan:* contacto formal (Sección 6.4) y, en paralelo, revisión de antecedentes en University of Missouri Office of Technology Advancement. Si el costo supera USD 5 000/año o exige royalty por uso, recalcular el modelo unit economics del tier USD 19 antes de comprometer la licencia.

3. **¿La estructura de 5 factores se mantiene en una muestra colombiana, o emerge una agrupación distinta (por ejemplo, fusión de Support y Career Agency en culturas más colectivistas)?**
   *Plan:* análisis factorial confirmatorio en la Fase 2 del roadmap (Sección 3.2) con n≥300; si el ajuste es pobre (RMSEA > .08, CFI < .90), considerar análisis exploratorio en submuestra y consultar a Rottinghaus.

4. **¿El ítem 11 ("I lack the energy to pursue my career goals") activará reacciones afectivas adversas significativas en usuarios colombianos en contextos post-pandemia y crisis laboral?**
   *Plan:* análisis específico en el piloto cognitivo (Sección 8.2) y en el primer trimestre de producción, monitoreando tasa de activación NFR-28 y feedback cualitativo. Si > 8 % de respondientes marcan 4–5 simultáneamente en ítems 8, 11 y 25, revisar el umbral de contención.

5. **¿Existe alguna validación al español del CFI-R en tesis no indexadas o literatura gris de programas de postgrado en Iberoamérica?**
   *Plan:* búsqueda en repositorios institucionales (Universidad de Salamanca, UNAM, Universidad de Buenos Aires, Universidad de los Andes Bogotá, Universidad de Antioquia) y contacto con el International Association for Educational and Vocational Guidance (IAEVG). Tiempo estimado: 2–3 semanas.

6. **`[Aporte Gemini]` ¿Debe DescubreMe explorar una sexta dimensión emergente de "Cooperación" en muestra colombiana?** Un estudio cualitativo brasileño con sobrevivientes del colapso de la represa de Mariana (SciELO `SSjwcCnjqpczZyKfbr4Drbd`) sugiere que, en contextos de crisis colectiva o cultura colectivista, la **cooperación grupal** emerge como recurso de adaptabilidad no capturado en el modelo de 5 factores del CFI-R. *Plan:* añadir en el debrief cualitativo del piloto cognitivo (Sección 8) preguntas abiertas sobre el rol de la comunidad/cooperación en transiciones de carrera; si emerge señal robusta, considerar un módulo complementario propio para v2.0 (no modificar el CFI-R original). Marcado como roadmap, no v1.5.

---

## SECCIÓN 10 — REFERENCIAS (APA 7)

Çarkıt, E. (2025). The Career Future Inventory Short Form: Validity and reliability study. *Research on Education and Psychology, 9*(2), 370–383. https://doi.org/10.54535/rep.1783405

Hamedoğlu, M. A., Akin, A., Arslan, S., Kaya, Ç., Demir, T., Uysal, R., & Sarıçam, H. (2014). The Turkish version of the Career Futures Inventory-Revised: The validity and reliability study. In S. Banerjee & Ş. Erçetin (Eds.), *Chaos, complexity and leadership 2012* (Springer Proceedings in Complexity, pp. 545–550). Springer. https://doi.org/10.1007/978-94-007-7362-2_59

McIlveen, P., Burton, L. J., & Beccaria, G. (2013). A short form of the Career Futures Inventory. *Journal of Career Assessment, 21*(1), 127–138. https://doi.org/10.1177/1069072712450493

Ministerio de Salud y Protección Social de Colombia. (2025, agosto). *Directorio nacional de líneas territoriales de atención en salud mental en Colombia.* https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/VS/PP/ET/directorio-salud-mental-prevencion-suicidio-minsalud.pdf

Muñiz, J., Elosua, P., & Hambleton, R. K. (2013). Directrices para la traducción y adaptación de los tests: Segunda edición. *Psicothema, 25*(2), 151–157. https://doi.org/10.7334/psicothema2013.24

Park, C. J., Rottinghaus, P. J., Wang, Z., Zhang, T., Falk, N. A., & Ko, S.-J. (2019). Measurement invariance of the Career Futures Inventory–Revised across general and client samples. *Journal of Career Assessment, 27*(4), 627–642. https://doi.org/10.1177/1069072718816514

Rottinghaus, P. J., Buelow, K. L., Matyja, A., & Schneider, M. R. (2012). The Career Futures Inventory–Revised: Assessing multiple dimensions of career adaptability. *Journal of Career Assessment, 20*(2), 123–139. https://doi.org/10.1177/1069072711420849

Rottinghaus, P. J., Day, S. X., & Borgen, F. H. (2005). The Career Futures Inventory: A measure of career-related adaptability and optimism. *Journal of Career Assessment, 13*(1), 3–24. https://doi.org/10.1177/1069072704270271

Rottinghaus, P. J., Eshelman, A., Gore, J. S., Keller, K. J., Schneider, M., & Harris, K. L. (2017). Measuring change in career counseling: Validation of the Career Futures Inventory-Revised. *International Journal for Educational and Vocational Guidance, 17*(1), 61–75. https://doi.org/10.1007/s10775-016-9329-7

Savickas, M. L., & Porfeli, E. J. (2012). Career Adapt-Abilities Scale: Construction, reliability, and measurement equivalence across 13 countries. *Journal of Vocational Behavior, 80*(3), 661–673. https://doi.org/10.1016/j.jvb.2012.01.011

Secretaría Distrital de Salud de Bogotá. (2025). *Línea 106 — El poder de ser escuchado*. https://www.saludcapital.gov.co/Paginas2/Quienes_Somos_linea106.aspx

University of Missouri, College of Education and Human Development. (2025). *Patrick Rottinghaus — Faculty profile.* https://cehd.missouri.edu/person/patrick-rottinghaus/

**`[Aportes desde Gemini — verificación pendiente]`** (las siguientes referencias se citan en el reporte de Gemini con enlaces secundarios; se conservan aquí como punto de partida para verificación antes de uso en producción):

Aldarmaki, F., y col. (2023). *Psychometric Properties of the Career Futures Inventory (CFI-25) Among Undergraduate Students in Oman.* ResearchGate publication 367166575. **Nota:** estudio sobre CFI 2005 (25 ítems), NO sobre CFI-R 28; no transferible directamente. Verificar paper primario antes de citar.

Farlow, S. E. (s.f.). *A Study of Career Intentions and Career Adaptability among Extension Summer Internship Program participants.* NC State Repository. https://repository.lib.ncsu.edu/bitstreams/fcc724ab-b0c6-40ba-936e-6dfc8cf84cb6/download — Tesis de máster; útil para argumentar sensibilidad al cambio del CFI-R en intervenciones cortas. Verificar autoría y año exactos antes de citar formalmente.

Sobrinho, A., y col. (2025). *Employee career adaptability after an extreme event in a mining company.* *Revista de Administração Mackenzie* (SciELO). http://www.scielo.br/j/ram/a/SSjwcCnjqpczZyKfbr4Drbd/ — Estudio cualitativo sobre dimensión emergente de "Cooperación" tras el colapso de la represa de Mariana; soporte conceptual para el gap §9.6.

Pignault, A., Houssemand, C., y col. (2021). Measuring Career Adaptability in a Sample of Italian University Students. *Social Sciences, 10*(10), 372. https://doi.org/10.3390/socsci10100372 — Verificar si la muestra italiana usa CFI-R 28 o CAAS antes de citar como baremo internacional.

---

## APÉNDICE A — Mapa de aportes consolidados desde Gemini

| # | Aporte | Sección donde se integró | Valor agregado | Verificación recomendada |
|---|---|---|---|---|
| A1 | Evolución conceptual CFI 2005 (3 factores) → CFI-R 2012 (5 factores); refinamiento de "Adaptabilidad" → "Career Agency" y adición de Support / WLB / NCO | §0 (Resumen ejecutivo) y §1.2 (banco oficial vs. derivadas) | Contexto histórico que justifica usar CFI-R 28 y NO sustituirlo por CFI 2005; útil para copy y para comunicación con Rottinghaus. | Rottinghaus, Day & Borgen (2005) y Rottinghaus et al. (2012) ya están en referencias; el detalle histórico está en sus introducciones. |
| A2 | Posicionamiento teórico: sincretismo Parsons + Bandura + Savickas; Career Agency = "respuestas de adaptación" (no "recursos de adaptabilidad") | §0 (Resumen ejecutivo, párrafo 3) y §5.1 (nota técnica de Career Agency); §6.6 (Plan B CAAS) | Diferencia conceptual clave para el frame del producto: el CFI-R mide comportamiento accionable presente, no rasgos disposicionales. Afecta copy y posicionamiento vs. CAAS. | Verificar en Rottinghaus et al. (2017) y en Savickas (2013, capítulo Career Adaptability). |
| A3 | Rango de fiabilidad pre/post: α = 0.64 (NCO) a 0.91 (WLB) | §3 (Rango de fiabilidad reportado) y §5.5 (nota cautelar sobre NCO) | Alerta sobre la subescala más débil; refuerza la necesidad de disclaimers explícitos en NCO y de no usarla como medida única. | Verificar en Rottinghaus et al. (2017) — paper de measuring change, donde se reportan los pre/post. |
| A4 | Sensibilidad al cambio (NC State internship study): Career Agency +29.3%, OA +15.5%, WLB +28.3%, NCO −20%, Support −10% | §3 (Sensibilidad al cambio) | Sustenta la idea de usar el CFI-R como medida longitudinal (pre/post intervención), no sólo snapshot. Candidato a feature de "re-test trimestral" en tier Paid. | Verificar tesis/dissertation de Farlow en NC State Repository; cita primaria pendiente. |
| A5 | Validez convergente: r = .38–.49 con exploración/planificación; correlación con CDMSE (Taylor & Betz); discriminante con Big Five | §3.3 (nueva subsección — Validez convergente/discriminante) | Justifica acoplar CFI-R con otros instrumentos del stack DescubreMe (RIASEC, valores, BFI-2-S) sin redundancia. | Verificar en Rottinghaus, Buelow et al. (2012) y Rottinghaus et al. (2017). |
| A6 | Estudio Mariana (Brasil): emergencia de "Cooperación" como sexta dimensión potencial en contextos colectivistas/crisis | §9 punto 6 (nuevo gap) | Hipótesis para piloto cualitativo colombiano: ¿emerge una dimensión cooperativa? Posible roadmap v2.0. | Verificar Sobrinho et al. (2025) en SciELO/RAM; revisar metodología cualitativa. |
| A7 | Validación turca (Hamedoğlu et al., 2014) y existencia de adaptaciones alemana (Spurk & Volmer, 2013) y coreana (Choi & Kim, 2006) | §2 (tabla de adaptaciones) | Ya estaba en Claude; Gemini lo refuerza y añade la mención de protocolos de traducción y retro-traducción usados. | Las citas alemana y coreana están en literatura secundaria (vía Çarkıt, 2025); confirmar acceso primario antes de citarlas en comunicación con Rottinghaus. |
| A8 | Referencias secundarias: Oman CFI-25 (ResearchGate 367166575) e Italia (MDPI 10/10/372) | §3 (filas adicionales con marcador de verificación) | Puntos internacionales adicionales; Oman es CFI-25 (no CFI-R), por lo que **no es transferible**. Italia puede serlo si usa CFI-R 28. | Localizar papers primarios; el de Oman queda descartado para baremos del CFI-R 28. |

**Lectura general del Apéndice A:** los ocho aportes de Gemini integrados son de naturaleza académica/teórica y no alteran ninguna decisión operativa del Pack (licencia, ítems, scoring, textos al usuario, disclaimers, piloto cognitivo). Sin embargo, **A2 y A4 son los más accionables a corto plazo**: A2 afina el copy y el frame del producto, y A4 abre la puerta a una feature de re-test longitudinal en el tier Paid. A3 refuerza un disclaimer ya presente. A6 alimenta un gap de investigación de v2.0. Antes de citar A4 y A6 en comunicación oficial con Rottinghaus, **los papers primarios deben verificarse**.

---

## APÉNDICE B — Notas de consolidación (metodología)

**Origen del documento.** Este consolidado combina dos investigaciones independientes producidas en mayo 2026:

1. `Prompt_10_CFI-R_IAR.Claude.md` — Implementation Acquisition Pack completo de 10 secciones siguiendo el prompt v1.0. Cumplimiento: 100% de los requisitos del prompt; entrega operativa completa (ítems, scoring, textos es-CO, email, disclaimers, piloto).
2. `Prompt_10_CFI-R_IAR.Gemini.md` — Análisis exhaustivo académico estilo white paper de ~5.000 palabras sobre fundamentos epistemológicos, evolución histórica, andamiaje teórico, propiedades psicométricas, validaciones transculturales y fenomenología cualitativa del CFI-R. **No siguió la estructura de 10 secciones del prompt v1.0**; no entregó lista de ítems, clave de scoring, textos al usuario, plan de licencia, email, disclaimers ni piloto cognitivo. Aportes principales: contexto histórico CFI→CFI-R, posicionamiento teórico vs. CAAS, datos de fiabilidad pre/post, sensibilidad al cambio en intervenciones cortas, validez convergente/discriminante, dimensión emergente "Cooperación" en crisis.

**Criterio de consolidación aplicado.**
- **Estructura:** se preserva íntegra la del Pack de Claude (10 secciones + Apéndices A y B nuevos).
- **Contenido operativo (ítems, baremos, scoring, textos al usuario, email de licencia, disclaimers, piloto):** se mantiene el de Claude porque Gemini no lo produjo.
- **Aportes académicos de Gemini:** se integran SOLO cuando aportan información nueva verificable y útil para producto. Cada aporte se marca con `[Aporte Gemini]` en el lugar donde aparece, y se traza en el Apéndice A con nivel de verificación.
- **Discrepancias entre Claude y Gemini:** no se encontraron discrepancias factuales sustanciales. Donde ambos tocaron el mismo punto (autores, año del CFI-R, estructura de 5 factores, validación turca de Hamedoğlu, contacto con Rottinghaus, ítems sensibles de NCO, ausencia de adaptación española), las cifras y nombres coinciden.

**Limitaciones del consolidado.**
- Los datos cuantitativos atribuidos a Gemini (alfas pre/post, % de cambio en NC State, correlaciones .38–.49) provienen de la síntesis narrativa de Gemini y deben verificarse en papers primarios antes de citarse en comunicación oficial con Rottinghaus o en publicaciones académicas.
- La referencia al estudio brasileño de Mariana (A6) es sólida como soporte cualitativo conceptual, pero la dimensión "Cooperación" no es un constructo psicométricamente validado para el CFI-R; se conserva como hipótesis de roadmap.
- La referencia al CFI-25 de Oman (A8) NO es transferible al CFI-R 28 y queda registrada sólo como nota negativa.

---

*Fin del Implementation Acquisition Pack v1.0 — CFI-R — CONSOLIDADO · DescubreMe · LATAM/Colombia · Mayo 2026*
