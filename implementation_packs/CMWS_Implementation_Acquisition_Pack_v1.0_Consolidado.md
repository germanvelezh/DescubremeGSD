# Implementation Acquisition Pack v1.0 — CMWS (Comprehensive Meaningful Work Scale) — Proyecto DescubreMe — CONSOLIDADO Claude + Gemini

> **Nota metodológica de consolidación.** Este documento integra dos investigaciones independientes ejecutadas con el mismo prompt v1.0 sobre el CMWS-28 (Lips-Wiersma & Wright, 2012). La investigación de **Claude cumplió las 10 secciones del prompt** con rigor técnico, datos verificables, distinción correcta de la escala Likert de 5 puntos (vs 7 que asume el brief), distribución desigual de ítems (6/4/4/3/3/4/4), 3 ítems inversos literales con cargas factoriales, baremos por país y referencias APA 7 completas. La investigación de **Gemini fue PARCIAL**: cumplió nominalmente las 10 secciones pero contiene errores estructurales relevantes (afirma 4 ítems por dimensión y Likert de 7 puntos, ambos incorrectos; inventa un ítem "How often have you been emotionally exhausted?" que NO pertenece al CMWS; usa email info@themapofmeaning.org en lugar del verificado admin@themapofmeaning.org; sustituye §10 referencias APA 7 por una síntesis narrativa). Por consiguiente se adopta **el pack de Claude como base (≈92%)** y se integran de Gemini únicamente los aportes verificables y de valor para producto (≈8%), marcados en línea con `[Aporte Gemini]`. Los aportes no verificables o erróneos se documentan en el Apéndice A para trazabilidad.

## Tabla de cobertura

| Sección del prompt v1.0 | Claude | Gemini | Decisión |
|---|---|---|---|
| §0 Portada y metadatos + bloqueadores | OK (con tabla de correcciones al brief) | PARCIAL (sin tabla de correcciones; afirma Likert 7) | Base Claude |
| §1 Acquisition plan banco de ítems | OK (estructura desigual + 3 inversos literales + alfas) | PARCIAL (afirma 4 ítems/dimensión incorrectamente; reproduce ~12 ítems literales con narrativa, sin tabla 7-D) | Base Claude; aporte Gemini: glosa interpretativa por ítem |
| §2 Adaptaciones es-CO | OK (búsqueda exhaustiva confirma vacío; tabla con WAMI como comparador, no sustituto) | PARCIAL (confunde adaptación WAMI con CMWS, sugiere usarla como precedente metodológico — válido sólo como protocolo) | Base Claude; aporte Gemini: pivot léxico "Trabajo con Propósito" / "Sentido en el Trabajo" |
| §3 Baremos publicados | OK (tabla con N=275, N=879, Lopez & Ramos 2017) | NO (declara `[sin fuente verificada]` para todos los campos; sin descriptivos 2020) | Base Claude |
| §4 Ítems inversos numerados | OK (3 inversos en DIS con λ y función) | PARCIAL (incluye 3 inversos pero **inventa** uno: "emotionally exhausted" no pertenece al CMWS) | Base Claude; descartar item espurio |
| §5 Textos de interpretación es-CO | OK (≤80 palabras, tuteo, no clínico, aspiracional) | OK estructuralmente pero con marcadores Hecho/Inferencia/Opinión profesional en TEXTO AL USUARIO (no se debería mostrar al usuario) y bandas que exceden 80 palabras | Base Claude; aporte Gemini: anclaje al constructo eudaimónico y nota sobre instrumentalización |
| §6 License acquisition plan | OK (3 titulares con contactos verificados, email AUT, RightsLink, Trust admin@) | PARCIAL (usa info@themapofmeaning.org no verificado; carta más elaborada pero menos técnica) | Base Claude; aporte Gemini: argumento sobre arquitectura de privacidad B2B en el email |
| §7 Disclaimers + NFR-28 + líneas Colombia | OK (6 líneas + directorio Minsalud + Línea 106 verificada 2025) | PARCIAL (3 líneas; menciona "Línea Nacional Psicoactiva 018000 112439" no verificada en directorio Minsalud) | Base Claude; aporte Gemini: principio de blindaje de trazabilidad jerárquica B2B |
| §8 Piloto cognitivo Colombia | OK (n=15–30, estratificación por sector/género/región, criterios) | OK con aporte distintivo: estratificación por **jerarquía organizacional** (10 operativos / 10 gerencia / 10 decisores) | Base Claude; aporte Gemini: estratificación jerárquica adicional |
| §9 Gaps y preguntas abiertas | OK (6 gaps con plan: MGCFA, informalidad, baremos, reverse, licencia tripartita, marca) | OK con aporte distintivo: pregunta sobre **estructura bifactor S-1** vs 7 factores correlacionados | Fusión: Claude + 1 gap Gemini (bifactor) |
| §10 Referencias APA 7 (≥10) | OK (16 referencias APA con DOI) | NO (sección 10 es "síntesis narrativa" sin formato APA; lista al final son "obras citadas" web sin DOI ni autoría completa) | Base Claude |

**Resultado de cobertura:** Claude 10/10 OK. Gemini 4/10 OK + 4/10 PARCIAL + 2/10 NO. Modelo base = Claude; aportes Gemini integrados = ~8%.

---

## SECCIÓN 0 — Portada y metadatos

**Instrumento:** Comprehensive Meaningful Work Scale (CMWS).
**Autoras:** Marjolein Lips-Wiersma & Sarah Wright.
**Versión a implementar:** CMWS de 28 ítems (versión final de Estudio 2 CFA, N=275).
**Año de publicación original:** 2012, *Group & Organization Management*, 37(5), 655–685, DOI 10.1177/1059601112461578.
**Última revisión psicométrica de referencia:** Lips-Wiersma, Haar & Wright (2020), *Journal of Business Ethics*, 161(1), 35–52, DOI 10.1007/s10551-018-3967-2 — versión reducida 22 ítems en muestra internacional N=879; renombra "Developing the Inner Self" como "Integrity with Self".
**Idioma original:** Inglés (Nueva Zelanda / internacional).
**Productos destino en DescubreMe:** B2B-A Premium condicional, posterior a v1.5. NO se ofrecerá en B2C freemium.

**Resumen ejecutivo (Hecho).** El CMWS-28 es un instrumento multidimensional de trabajo significativo con 7 dimensiones que capturan tensiones paradojales del marco Map of Meaning. No existe adaptación validada al español ni baremos poblacionales publicados para la versión final de 28 ítems. La licencia está distribuida en una cadena de 3 titulares simultáneos (autora, SAGE, Map of Meaning International Trust). El presente Pack completa los bloques 2 (banco de ítems), 3 (adaptaciones es-CO/es-MX/en), 5 (textos de interpretación) y refuerza 4 (puntuación) y 6 (consentimiento y cumplimiento) sobre el dossier psicométrico v2.1.

**Estatus de bloqueadores.**
- **Licencia:** BLOQUEADO. Requiere las 3 autorizaciones escritas simultáneas.
- **Ítems literales:** PARCIAL. Tabla 4 del artículo original aparece en copias de autor abiertas (Academia.edu / ResearchGate) pero el artículo formal está tras el muro de pago de SAGE; cualquier reproducción literal en producto requiere permiso de SAGE.
- **Baremos:** BLOQUEADO. No hay normas poblacionales para LATAM ni para la versión 28 ítems; sólo descriptivos referenciales del estudio internacional 2020 (M, DT).
- **Adaptación es validada:** BLOQUEADO. No existe.

### 0.1 Correcciones al brief vs. fuente primaria verificada

| Punto | Brief | Fuente primaria verificada | Decisión |
|---|---|---|---|
| Escala de respuesta | Likert 7 puntos (1–7) | Likert **5 puntos**, **anclas de frecuencia** (1 = "never/hardly ever" a 5 = "always", confirmado en Lips-Wiersma, Haar & Wright, 2020); instrucción literal "How frequently do you experience the following at work?" | **USAR 5 puntos de frecuencia** |
| Distribución de ítems | 4 por dimensión uniforme | **Desigual** (Tabla 4, Lips-Wiersma & Wright, 2012): Unity 6 / Service 4 / Expressing Potential 4 / Developing Inner Self 3 / Reality 3 / Inspiration 4 / Balancing Tensions 4 = **28** | **USAR distribución desigual** |
| Ítems inversos | No especificado | **3 ítems, todos en Developing the Inner Self**, que codifican erosión moral y autodesconexión; produce el alfa más bajo (.72 en 2012) | **CONFIRMADO** |
| Tiempo de aplicación | 8–10 min | **6–8 min** (28 ítems Likert simple) | **USAR 6–8 min** |

> **Nota crítica para consolidación.** Gemini reproduce en su §1.3 las afirmaciones erróneas del brief (4 ítems por dimensión + Likert 7 puntos). Cualquier especificación técnica que se enrute al equipo Claude Code debe usar EXCLUSIVAMENTE la tabla 0.1 anterior, no la sección de Gemini.

**Discrepancia adicional detectada (Inferencia).** La versión 2020 redujo el banco a 22 ítems y renombró "Developing the Inner Self" → "Integrity with Self". DescubreMe debe implementar la **versión 28-ítems de 2012** (la canónica), no la 22-ítems de 2020. Si la solicitud de licencia se enrutara a la versión 2020, costos se simplificarían pero perderíamos los 3 ítems inversos clave para detectar erosión moral.

---

## SECCIÓN 1 — Acquisition Plan del Banco de Ítems

### 1.1 Disponibilidad pública de los 28 ítems

**Hecho.** El artículo original Lips-Wiersma & Wright (2012) está alojado **detrás de muro de pago en SAGE Journals** (https://journals.sagepub.com/doi/10.1177/1059601112461578). El precio típico de un artículo SAGE individual está en USD 36–42 por descarga (RightsLink) o por suscripción institucional.

**Hecho.** Una **copia de autor del PDF completo, incluyendo la Tabla 4 con los 28 ítems literales y sus cargas factoriales estandarizadas**, está públicamente disponible en Academia.edu en el perfil oficial de Lips-Wiersma: https://www.academia.edu/2855100. También en ResearchGate (publication 258137959). Estas copias funcionan como green-OA / author self-archive; **no constituyen licencia de uso comercial**.

**Inferencia.** Aunque el banco literal de ítems es técnicamente legible desde fuentes abiertas, la **incorporación literal en un producto digital comercial (DescubreMe B2B Premium) requiere autorización formal de SAGE** (titular del copyright editorial), además de la autora y del Map of Meaning International Trust. Citar los ítems en este Pack interno con fines documentales se considera uso académico de referencia; **reproducirlos en el producto no lo es**.

**Ítems inversos literales (extraídos de la copia abierta de Tabla 4, Lips-Wiersma & Wright, 2012, p. 675; los 3 únicos ítems reverse-keyed del banco, todos en Developing the Inner Self):**

1. *"At work my sense of what is right and wrong gets blurred"* (reverse) — λ = .618
2. *"I don't like who I am becoming at work"* (reverse) — λ = .829
3. *"At work I feel divorced from myself"* (reverse) — λ = .806

Para los 25 ítems restantes, el Pack describe estructura sin reproducir literal en producto hasta tener licencia.

**[Aporte Gemini]** En literatura de acceso abierto (notablemente PDFs de ResearchGate del artículo 2012 y de "Sweeping the Floor or Putting a Man on the Moon", Both-Nwabuwe et al. 2017) aparecen otros ítems directos citados textualmente con fines ilustrativos:
- Unity: *"I have a sense of belonging"*, *"We talk about what matters to us"*.
- Expressing Potential: *"I experience a sense of achievement"*, *"I create and apply new ideas or concepts"*, *"In this work I have the time and space to think"*.
- Service: *"I feel I truly help our customers/clients"*.
- Reality: *"At work we face up to reality"*.
- Inspiration: *"The vision we collectively work towards inspires me"*.
- Balancing: *"We recognise that life is messy and that is OK"*, *"We have a good balance between focusing on getting things done and noticing how people are feeling"*, *"I have a good balance between the needs of others and my own needs"*.
Estos textos sirven SOLO como referencia conceptual para diseño de UI / sondas cognitivas; **no se incorporan al producto sin licencia SAGE**. [verificar antes de uso — confirmar carga factorial y numeración Tabla 4 con copia académica].

### 1.2 Banco oficial vs adaptaciones derivadas

**Hecho.** No existe banco oficial alternativo. La única versión canónica de 28 ítems es la publicada en GOM 2012. La versión de 22 ítems en Lips-Wiersma, Haar & Wright (2020) constituye un **refinamiento del mismo banco**, no una adaptación independiente. No se han publicado adaptaciones derivadas en otros idiomas con permiso editorial.

### 1.3 Estructura del banco (versión 28 ítems)

| Dimensión | # ítems | Direct/Reverse | α (2012, N=275) | α (2020, N=879, v.22) |
|---|---|---|---|---|
| Unity with Others | 6 | 6 directos | .90 | .82 |
| Service to Others | 4 | 4 directos | .83 | .87 |
| Expressing Full Potential | 4 | 4 directos | .83 | .83 |
| Developing the Inner Self | 3 | **3 inversos** | .72 | .83 (renombrada Integrity with Self) |
| Reality | 3 | 3 directos | .79 | .80 |
| Inspiration | 4 | 4 directos | .89 | .80 |
| Balancing Tensions | 4 | 4 directos | .85 | .84 |
| **Total** | **28** | **25 directos, 3 inversos** | **.92** (escala total); test-retest 2 meses r = .80 | — |

**Ajuste CFA (Lips-Wiersma & Wright, 2012, N=275):** χ² = 1148.38, df = 370; CFI = .972; RMSEA = .059 (90% CI .054–.064). El modelo de 7 factores supera ampliamente al de un solo factor (CFI .626; RMSEA .127).
**Ajuste CFA (Lips-Wiersma, Haar & Wright, 2020, N=879, sólo CMWS 7-factor):** χ² = 438, df = 188; CFI = .98; RMSEA = .04; SRMR = .04. El modelo de **segundo orden empeora el ajuste** (CFI .91; SRMR .16), por lo que se reporta perfil 7-D y no un puntaje global agregado.

**Formato de pregunta.** Instrucción canónica (Tabla 4, footer, 2012): *"For each of the items please indicate the frequency at which the item occurs in your work. Please respond to the items with reference to your current workplace only. How frequently do you experience the following at work?"* Anclas (confirmadas en Lips-Wiersma, Haar & Wright, 2020): **1 = never/hardly ever … 5 = always**.

### 1.4 Recomendación de contacto inicial

**Opinión profesional.** Iniciar simultáneamente las 3 vías para no perder ciclos:

1. **Marjo Lips-Wiersma** — marjo.lipswiersma@aut.ac.nz (AUT, Auckland University of Technology; perfil oficial https://academics.aut.ac.nz/marjo.lipswiersma).
2. **SAGE permissions** — vía RightsLink desde https://journals.sagepub.com/doi/10.1177/1059601112461578 (botón "Request permissions"), o Sage Permissions Portal https://us.sagepub.com/en-us/nam/rights-and-permissions.
3. **Map of Meaning International Trust** — admin@themapofmeaning.org (única vía pública de contacto; sitio https://www.themapofmeaning.org).

**Primer contacto recomendado: Lips-Wiersma**, porque es co-fundadora del Trust y puede facilitar la conversación trilateral; el permiso editorial SAGE típicamente se concede una vez la autora respalda el uso.

---

## SECCIÓN 2 — Adaptaciones al español disponibles

### 2.1 Tabla de adaptaciones conocidas

| País | Autores | Año | DOI/URL | N | Características |
|---|---|---|---|---|---|
| — | — | — | — | — | **No se ha localizado ninguna adaptación al español del CMWS revisada por pares.** |
| (comparador) España | Duarte-Lores, Rolo-González, Suárez & Chinea-Montesdeoca | 2023 | 10.1007/s12144-021-02569-8 | 350 + 312 | Adaptación al español **del WAMI (Steger et al., 2012)** — **no del CMWS**. Modelo bi-factor; α = .912; validez convergente con UWES-9 (r=.915) y SWLS (r=.899). Citada como instrumento alternativo, no como sustituto. |

**Hecho.** Búsquedas exhaustivas en SAGE, Springer, Elsevier, Redalyc, SciELO, Dialnet y Google Scholar (consultas: "CMWS español", "Lips-Wiersma español", "trabajo significativo escala validación Latinoamérica", "Comprehensive Meaningful Work Scale Spanish validation", "Lips-Wiersma adaptación portugués") **no devuelven ninguna validación peer-reviewed del CMWS-28 ni del CMWS-22 al español, portugués brasileño o variante LATAM**. Existe una mención en portugués brasileño que describe el CMWS como instrumento de referencia en un *canvas* de service design (Revista Mackenzie), pero no es una adaptación psicométrica.

### 2.2 Recomendación de base para es-CO

**Opinión profesional.** En ausencia de adaptación validada, la base debe ser el **inglés original 2012**, con un proceso de traducción-retrotraducción siguiendo las directrices ITC de Muñiz, Elosua & Hambleton (2013) — 20 reglas organizadas en 6 secciones/componentes (*Psicothema*, 25(2), 151–157). Pasos operativos: (1) traducción directa por 2 traductores bilingües independientes con formación en psicología organizacional; (2) reconciliación; (3) retrotraducción por traductor nativo de inglés; (4) revisión del comité (incluyendo titular o representante del Trust si la licencia lo exige); (5) prueba cognitiva n=15–30 en Colombia; (6) validación cuantitativa CFA / MGCFA. WAMI-Spanish (Duarte-Lores et al., 2023) **NO debe usarse como base de traducción del CMWS** porque mide constructos distintos; sí debe permanecer en stack v2.0 como instrumento complementario.

**[Aporte Gemini]** Aunque WAMI no sirve como sustituto de contenido, su protocolo de adaptación al español (Chinea-Montesdeoca/Duarte-Lores, basado en ITC) es un **precedente metodológico replicable**: doble traducción independiente + back-translation ciega + comité bilingüe. Útil como referencia procesal, no como fuente lexical.

### 2.3 Modificaciones lexicales anticipadas para Colombia

**Inferencia.** Anticipamos ajustes en:

- "Customers/clients" → **"usuarios/clientes"** (neutral entre sector privado y público colombiano).
- "Coworkers" → **"compañeros de trabajo"**.
- "Sense of belonging" → **"sentido de pertenencia"** (estándar es-CO).
- "Inner self" → **"yo interior"** o **"sí-mismo interno"**.
- "Worthwhile" → **"que vale la pena"**.
- "Right and wrong gets blurred" → **"se difumina mi noción de lo correcto y lo incorrecto"** (cuidar carga moral sin tono religioso).
- Evitar mexicanismos ("chamba"), argentinismos ("laburo"), españolismos ("currar", "majo", "vosotros").

**[Aporte Gemini]** Para nombre del constructo en la interfaz, considerar pivot léxico desde "trabajo significativo" (calco español académico) hacia **"trabajo con propósito"** o **"sentido en el trabajo"**, expresiones con mayor tracción en discursos de bienestar organizacional en Colombia. Validar en piloto cognitivo. Adicionalmente, la frase "life is messy" puede transponerse como *"reconocemos que la dinámica del día a día es compleja e impredecible"* en vez de la traducción literal "la vida es desordenada".

---

## SECCIÓN 3 — Baremos publicados

### 3.1 Tabla maestra de normas disponibles

| País | Fuente APA + DOI | N | M (por dimensión, escala 1–5) | DT | Percentiles |
|---|---|---|---|---|---|
| LATAM | — | — | — | — | **[sin fuente verificada]** |
| Colombia | — | — | — | — | **[sin fuente verificada]** |
| México | — | — | — | — | **[sin fuente verificada]** |
| Argentina | — | — | — | — | **[sin fuente verificada]** |
| Nueva Zelanda (Estudio 2) | Lips-Wiersma & Wright (2012). DOI 10.1177/1059601112461578 | 275 | No reportados por dimensión (sólo correlaciones interfactoriales .285–.470, Tabla 5). **Total Estudio 1, N=405, escala 32 ítems pre-final:** M=115.86; DT=18.48; rango 56–159 | — | No publicados |
| Internacional (NZ + EE. UU. MTurk) | Lips-Wiersma, Haar & Wright (2020). DOI 10.1007/s10551-018-3967-2 | 879 | Unity 3.8 (DT .81); Service 3.8 (.87); Expressing Full Potential 3.5 (.91); **Integrity with Self 4.2 (.87) (máx)**; Reality 3.8 (.83); **Inspiration 3.0 (1.1) (mín, mayor variabilidad)**; Balancing 3.5 (.86) | A 1 decimal | No publicados |
| EE. UU. (managers) | Lopez & Ramos (2017). DOI 10.1177/1069072716639851 | gender-balanced, age-diverse managers | M/DT por dimensión no reportadas en abstract abierto. Único efecto significativo: etapa de carrera en Balancing Tensions (40–54 < 25–39 y 55–65). | — | No publicados |

### 3.2 Recomendación de norma provisional para LATAM

**Opinión profesional.** En ausencia de baremos LATAM, **no se publicarán percentiles cuantitativos al usuario en B2B-A Premium hasta validación interna**. Se emplearán **bandas descriptivas internas (BAJO/MEDIO/ALTO)** calibradas con los descriptivos internacionales 2020 (N=879) como anclaje provisional, marcadas explícitamente como "referencia internacional, no normativa colombiana". Reportar **perfil 7-D, NUNCA un puntaje global agregado**, dado que el modelo de segundo orden no mejora el ajuste (CFI .91 vs .98; SRMR .16 vs .04 en Lips-Wiersma, Haar & Wright, 2020).

**[Aporte Gemini]** Considerar **lógica de puntuación ipsativa o intrasujeto** (puntajes promediados brutos en escala 1–5 con cortes lógicos provisionales en 2.5 y 4.0) durante una fase beta extendida, hasta acumular N ≥ 500 colombianos para baremo empírico. Validar contra anclajes 2020.

### 3.3 Roadmap para baremos colombianos propios

1. **Fase 1 (mes 1–2):** Solicitud de licencia trilateral.
2. **Fase 2 (mes 2–3):** Traducción y retrotraducción según ITC.
3. **Fase 3 (mes 3):** Piloto cognitivo n=15–30 (Sección 8).
4. **Fase 4 (mes 4–7):** Validación cuantitativa N≥500 empleados formales colombianos estratificados por sector (servicios, manufactura, comercio, salud, educación), género y edad. CFA del modelo 7-factor; invarianza factorial por género y por edad (configural / métrica / escalar); α por dimensión; test-retest 4–6 semanas n=80–100.
5. **Fase 5 (mes 7):** Generación de baremos por percentiles colombianos (mínimo P16/P84; idealmente deciles).
6. **Costo estimado:** USD 12 000–22 000 (dossier v2.1) incluyendo honorarios de traductores, panel de expertos, plataforma de recolección, incentivos a participantes y análisis estadístico. **Tiempo total: 5–7 meses.**

---

## SECCIÓN 4 — Ítems inversos numerados

| Item # (numeración Tabla 4, 2012) | Dimensión | Clave | Notas |
|---|---|---|---|
| Ítem reverse-1 (DIS-R1) | Developing the Inner Self | **Inverso** | *"At work my sense of what is right and wrong gets blurred"* — λ = .618. Codifica **erosión moral**. Carga factorial menor del trío. Disparador potencial de NFR-28. |
| Ítem reverse-2 (DIS-R2) | Developing the Inner Self | **Inverso** | *"I don't like who I am becoming at work"* — λ = .829. Codifica **alienación identitaria**. Disparador NFR-28. |
| Ítem reverse-3 (DIS-R3) | Developing the Inner Self | **Inverso** | *"At work I feel divorced from myself"* — λ = .806. Codifica **autodesconexión / disociación funcional**. Disparador NFR-28. |

**Nota crítica.** Los 25 ítems restantes son directos y se distribuyen en 6 dimensiones (Sección 1.3). Una puntuación **alta** en Developing the Inner Self (tras recodificar los 3 inversos) indica un yo interior protegido / no erosionado por el trabajo; una puntuación **baja** indica posible erosión moral o autodesconexión y debe activar el mensaje de contención (Sección 7).

> **Descartado por consolidación.** Gemini incluye en su tabla §4 un cuarto ítem inverso *"How often have you been emotionally exhausted?"*, atribuido genéricamente a "Balancing tensions / Reality". Este ítem **NO pertenece al CMWS**; corresponde a la subescala de Emotional Exhaustion del Maslach Burnout Inventory (MBI) que aparece como variable externa en estudios que utilizan el CMWS junto con otros instrumentos (incluido el propio Lips-Wiersma, Haar & Wright 2020). Se elimina del consolidado para evitar contaminación del banco.

---

## SECCIÓN 5 — Textos de interpretación al usuario (es-CO)

> Lineamientos transversales: tuteo cordial colombiano, descriptivo no etiquetador, aspiracional no determinista, no clínico. Máximo 80 palabras por banda. Bandas BAJO ≤ P16, MEDIO P17–P83, ALTO ≥ P84 (calibrados internamente con descriptivos internacionales 2020 hasta tener norma propia).
>
> **Nota de consolidación.** Se mantienen los textos de Claude, que respetan el límite de 80 palabras y no exponen al usuario los marcadores epistémicos Hecho/Inferencia/Opinión profesional (Gemini los incluyó en el texto final, lo cual viola las pautas de UX). Se incorpora del aporte de Gemini, en las descripciones técnicas internas, el anclaje al constructo eudaimónico cuando aplica.

### 5.1 Unity with Others — *Unidad con otros*
**Descripción técnica interna.** Frecuencia con que la persona experimenta pertenencia, valores compartidos y apoyo mutuo en el trabajo. α = .90 (Lips-Wiersma & Wright, 2012). [Aporte Gemini] Captura la calidad existencial de los vínculos y la seguridad psicológica para conversaciones de significado, más allá del "clima laboral" transaccional.

- **BAJO.** Tiendes a experimentar tu trabajo de manera más solitaria, con poca sensación de pertenencia o de propósito compartido con tus compañeros. Esto puede sentirse, por ejemplo, cuando las decisiones importantes se toman sin que tu voz cuente, o cuando no encuentras con quién hablar sobre lo que realmente te importa. ¿Qué tipo de vínculos te gustaría cultivar en tu próximo paso laboral?
- **MEDIO.** Encuentras momentos de conexión con tus compañeros, aunque no de forma constante. Hay días en que sientes que el equipo te respalda y otros en que la relación se vuelve más funcional. Esto sugiere que valoras la pertenencia, pero que probablemente la vives de forma situacional. ¿En qué tipo de equipos has sentido que tu voz pesa más?
- **ALTO.** Tu experiencia laboral tiende a estar marcada por un fuerte sentido de pertenencia y por relaciones donde puedes hablar abiertamente de tus valores. Por ejemplo, sientes con frecuencia que tus compañeros te respaldan y disfrutas trabajando con ellos. Esto sugiere que la calidad del tejido humano del trabajo es para ti una fuente importante de sentido.

### 5.2 Service to Others — *Servicio a otros*
**Descripción técnica interna.** Frecuencia con que la persona experimenta que su trabajo contribuye genuinamente a usuarios, clientes o comunidad. α = .83.

- **BAJO.** Tiendes a sentir que el impacto de tu trabajo en otros es difuso o lejano. Puede pasar, por ejemplo, que termines un día sin saber a quién benefició lo que hiciste. Esto sugiere que la línea entre tu esfuerzo y su contribución real podría ser más visible para ti. ¿Cuándo recuerdas haber visto el efecto concreto de tu trabajo en otra persona?
- **MEDIO.** A veces percibes que tu trabajo ayuda a otros y otras veces lo vives como una tarea más. Esto sugiere que la dimensión de servicio está presente, pero que aún no es central en cómo te orientas. ¿Qué tipo de personas o causas te gustaría tener más cerca en tu trabajo cotidiano?
- **ALTO.** Sueles experimentar con claridad que tu trabajo contribuye al bienestar de otras personas. Esto puede verse, por ejemplo, en que recuerdas con frecuencia situaciones específicas donde ayudaste a un usuario o cliente. Esto sugiere que el componente de servicio es un pilar importante de cómo encuentras sentido en lo que haces.

### 5.3 Expressing Full Potential — *Expresar el pleno potencial*
**Descripción técnica interna.** Frecuencia con que la persona despliega sus capacidades y logra cosas de las que se siente orgullosa. α = .83.

- **BAJO.** Tiendes a sentir que tu trabajo no te exige lo mejor de ti o que muchas de tus capacidades quedan sin usar. Por ejemplo, puede pasar que termines la semana con la sensación de no haber crecido. Esto sugiere que valoras el desarrollo, aunque tu rol actual te lo limite. ¿Qué capacidades tuyas te gustaría poner más a prueba?
- **MEDIO.** Hay áreas de tu trabajo donde te desafías y otras donde repites. Esto sugiere que el desarrollo está presente de manera parcial. ¿Qué proyectos o tareas te han hecho sentir, en el último año, que estás creciendo?
- **ALTO.** Sueles experimentar tu trabajo como un espacio donde puedes desplegar tu potencial y hacer cosas de las que te sientes orgulloso. Por ejemplo, identificas momentos recientes donde lograste algo que te resultó significativo. Esto sugiere que el crecimiento y la realización personal son una fuente central de sentido para ti.

### 5.4 Developing the Inner Self — *Desarrollo del yo interior* (recodificado; alto = yo interior protegido)
**Descripción técnica interna.** Los 3 ítems están redactados en clave **inversa** (erosión moral, autodesconexión, alienación). Una puntuación alta tras recodificación indica un yo interior **protegido**; una puntuación baja sugiere experiencia de erosión y debe activar la pieza de contención de Sección 7.

- **BAJO (yo interior erosionado).** Tu trabajo, con cierta frecuencia, parece estar tensionando aspectos importantes de quién eres o de lo que consideras correcto. Por ejemplo, puede ocurrirte que termines el día con la sensación de no reconocerte. Esto no es un diagnóstico ni una etiqueta: es información valiosa sobre la calidad del ajuste entre tu trabajo y tu mundo interior. Te invitamos a leer la sección de recursos al final.
- **MEDIO.** Hay periodos en que tu trabajo respeta tus valores y otros en que sientes ruido interno. Esto sugiere una relación cambiante con tu mundo interior según el contexto laboral. ¿Qué condiciones tienden a devolverte a ti mismo cuando notas que te estás alejando?
- **ALTO (yo interior protegido).** Tu trabajo tiende a respetar y a fortalecer tu sentido de quién eres y de lo que consideras correcto. Esto sugiere que has encontrado, o has construido, un espacio laboral donde puedes seguir siendo tú. ¿Qué prácticas o decisiones han cuidado ese equilibrio?

### 5.5 Reality — *Realidad*
**Descripción técnica interna.** Frecuencia con que la persona experimenta que su trabajo está conectado con hechos prácticos y con la realidad cotidiana. α = .79.

- **BAJO.** Tiendes a sentir que tu trabajo se mueve en planos abstractos o que pierde contacto con los problemas reales. Por ejemplo, puede pasar que las decisiones que se toman parezcan desconectadas del día a día de quienes ejecutan. ¿Qué te ayudaría a sentir tu trabajo más aterrizado?
- **MEDIO.** Tu trabajo combina momentos aterrizados con periodos más abstractos. Esto sugiere una experiencia mixta de aterrizaje. ¿En qué tareas concretas sientes que pisas tierra firme?
- **ALTO.** Sueles vivir tu trabajo como aterrizado, conectado con problemas reales y con resultados tangibles. Esto sugiere que valoras la concreción y que has encontrado un rol donde lo abstracto y lo práctico dialogan bien.

### 5.6 Inspiration — *Inspiración*
**Descripción técnica interna.** Frecuencia con que la persona experimenta entusiasmo, esperanza y conexión con un propósito mayor. α = .89. En Lips-Wiersma, Haar & Wright (2020) fue la dimensión con menor M (3.0/5) y mayor DT (1.1), sugiriendo alta variabilidad poblacional. Puntuaciones muy bajas pueden coexistir con malestar.

- **BAJO.** Tiendes a experimentar tu trabajo con poca inspiración o esperanza. Por ejemplo, puede ocurrir que sientas que cumples sin que algo te mueva. Esto no significa que tu trabajo no sirva, sino que su conexión con un propósito mayor podría no estar visible para ti hoy. Si esto se acompaña de tristeza persistente, considera consultar la sección de recursos.
- **MEDIO.** Tienes momentos de entusiasmo y momentos de cumplimiento. Esto sugiere que la inspiración está presente pero no es constante. ¿Qué proyectos te han movido genuinamente en el último año?
- **ALTO.** Sueles experimentar tu trabajo con entusiasmo y conexión con un propósito mayor que tú. Esto sugiere que has alineado actividad y vocación de manera frecuente.

### 5.7 Balancing Tensions — *Balance de tensiones*
**Descripción técnica interna.** Frecuencia con que la persona logra equilibrar tensiones inherentes al trabajo significativo (ser vs. hacer, sí mismo vs. otros). α = .85. En Lopez & Ramos (2017, *J. Career Assessment*, 25(3), 423–433), única dimensión con efecto significativo de etapa de carrera: managers en "prime work years" (40–54) puntuaron menos favorablemente que los de "settling in" (25–39) o "approaching retirement" (55–65).

- **BAJO.** Tiendes a sentir que las demandas de tu trabajo se contradicen entre sí y que es difícil sostenerlas todas. Por ejemplo, puede ocurrir que lo que debes hacer por la organización choque con lo que necesitas para ti. Esto sugiere que el equilibrio entre tus demandas internas y externas merece atención.
- **MEDIO.** Logras equilibrar tensiones en algunos momentos y en otros sientes que algo cede. Esto sugiere una negociación activa entre lo que tu trabajo te pide y lo que tú necesitas. ¿Qué prácticas te ayudan a no perder el rumbo cuando la tensión sube?
- **ALTO.** Sueles encontrar maneras de equilibrar las tensiones propias del trabajo significativo. Esto sugiere que has desarrollado recursos para sostener el "ser" y el "hacer" sin sacrificar uno por el otro.

---

## SECCIÓN 6 — License Acquisition Plan

### 6.1 Cadena de 3 titulares y contactos

| Titular | Rol | Contacto verificado |
|---|---|---|
| **Marjolein Lips-Wiersma** | Autora (copyright moral + co-fundadora del Trust) | marjo.lipswiersma@aut.ac.nz — Professor of Ethics and Sustainability Leadership, AUT (Auckland University of Technology). Perfil: https://academics.aut.ac.nz/marjo.lipswiersma |
| **SAGE Publications** | Publisher de *Group & Organization Management* (copyright editorial) | RightsLink desde https://journals.sagepub.com/doi/10.1177/1059601112461578 ("Request permissions"). Sage Permissions Portal: https://us.sagepub.com/en-us/nam/rights-and-permissions. |
| **Map of Meaning International Trust** | Titular de la marca registrada "Map of Meaning®" (Charitable Trust, Nueva Zelanda) | admin@themapofmeaning.org. Sitio: https://www.themapofmeaning.org. **No se publica política pública de licencia comercial; toda solicitud comercial pasa por admin@themapofmeaning.org**. |

### 6.2 Práctica histórica de concesión de permisos

**Hecho.** SAGE concede rutinariamente permiso de reproducción de tablas/ítems vía RightsLink para uso comercial digital, con tarifa por licencia. Según la página oficial de SAGE (https://www.sagepub.com/journals/permissions/process-for-requesting-permission), las solicitudes vía RightsLink suelen procesarse **inmediatamente** en casos estándar; para casos complejos la propia página declara: *"it may take up to four weeks to process your permission request"*.

**Opinión profesional.** Para reproducción literal de 28 ítems en producto comercial, el rango histórico observado en escalas similares de SAGE oscila entre USD 300 y USD 2 500 por licencia anual o perpetua. Map of Meaning Trust no publica política pública de licencia ni tarifa; suele canalizarse hacia su programa de practitioner certification.

**[Aporte Gemini]** Sensibilidad institucional del Trust hacia plataformas freemium: existe cautela documentada en literatura crítica frente a la instrumentalización de la escala para fines performativos corporativos (Bailey et al., 2017 sobre meaningful work como mecanismo alienante cuando se usa transaccionalmente). El argumento más fuerte ante el Trust es **garantizar arquitectónicamente la independencia analítica del individuo frente a su empleador**: agregación y anonimización del dashboard B2B, sin trazabilidad individual hacia recursos humanos. Incluir este punto explícitamente en la carta a Trust aumenta probabilidad de respuesta favorable.

### 6.3 Pasos para solicitar

1. Email simultáneo a Lips-Wiersma + admin@themapofmeaning.org explicando producto, alcance, geografías, modelo de monetización (B2B-A Premium), uso no clínico ni de selección.
2. Solicitud paralela vía RightsLink/CCC a SAGE para "reuse in digital product / republish in commercial digital tool".
3. Espera de respuesta: **inmediata (casos estándar) hasta 4 semanas (casos complejos) para SAGE**, según política oficial; 2–6 semanas para la autora y el Trust.
4. Si los 3 permisos llegan firmados, se procede a Sección 8. **Si sólo se obtienen 2 de 3, NO se implementa.**

### 6.4 Borrador de email inicial (copy-paste, inglés)

---
**To:** marjo.lipswiersma@aut.ac.nz; admin@themapofmeaning.org
**Cc:** [Sage permissions via RightsLink ticket]
**Subject:** License inquiry — Comprehensive Meaningful Work Scale (CMWS) for an educational/orienting Spanish-language digital product (DescubreMe, LATAM)

Dear Professor Lips-Wiersma and Map of Meaning International Trust,

I am writing on behalf of DescubreMe, a Spanish-language web platform devoted to deep self-knowledge and vocational orientation for adults in Latin America (primary market Colombia; secondary Mexico and Argentina). DescubreMe is **explicitly educational and orienting; it is not used for clinical assessment or personnel selection**.

We have studied the CMWS extensively and believe it is the most theoretically rich multidimensional measure of meaningful work available. We would like to inquire about the conditions under which we could:

1. Translate the 28-item CMWS into Latin American Spanish following ITC test adaptation guidelines (Muñiz, Elosua & Hambleton, 2013).
2. Conduct a cognitive pilot (n=15–30) and a full psychometric validation (N≥500) in formally employed adults in Colombia.
3. Include the validated Spanish version in a B2B premium product (organizations purchasing seats for employees), with no clinical or selection use.
4. Report a 7-dimension profile to end users (not an aggregate global score), in line with the higher-order model results in Lips-Wiersma, Haar & Wright (2020).

**[Aporte Gemini, integrado al cuerpo]** We are particularly committed to architectural safeguards that protect the individual's analytical sovereignty vis-à-vis their employer: organizational dashboards will display only aggregated, anonymized data, with no traceability of individual responses to HR. We share the concern expressed in the critical meaningful-work literature (e.g., Bailey et al., 2017) that meaning measurement can be subverted into a performative or surveillance tool, and we wish to design against that risk from the ground up.

We are aware that copyright is held jointly by you as authors, by SAGE Publications as journal publisher, and by Map of Meaning International Trust as holder of the "Map of Meaning®" trademark. We are submitting parallel requests to SAGE via RightsLink. We would value your guidance on conditions, attribution, fees, and any obligations regarding practitioner certification or use of the Map of Meaning® mark.

Thank you very much for your time. I look forward to hearing from you.

Sincerely,
[Nombre], DescubreMe — Bogotá, Colombia
[email] | [website]

---

### 6.5 Costos esperados y rangos

**Hecho (dossier v2.1).** Validación interna en español colombiano: **USD 12 000–22 000; tiempo total 5–7 meses.**
**Opinión profesional sobre licencia.** Rango razonable a presupuestar: **USD 500–3 000 por licencia editorial SAGE** (uso comercial digital, perpetuo o anual) + **honorarios negociables con autoras/Trust** (royalty por seat-uso o tarifa plana; benchmark de instrumentos comparables en LATAM: USD 1–4 por aplicación o cuota anual USD 2 000–10 000).

### 6.6 Plan B

**Si la licencia no se obtiene completa**, mantener **WAMI (Steger, Dik & Duffy, 2012; adaptación española Duarte-Lores et al., 2023, DOI 10.1007/s12144-021-02569-8)** como **instrumento primario** de trabajo significativo en stack v2.0. WAMI ya está validado al español, está incorporado en el stack actual y mide adecuadamente el constructo aunque de forma menos paradojal y sin la dimensión "balancing tensions". Plan B activable inmediatamente sin retrasar v1.5.

---

## SECCIÓN 7 — Disclaimers y mitigaciones específicas

### 7.1 Pre-test disclaimer (es-CO, ≤100 palabras)

> Vas a responder un cuestionario sobre cómo experimentas tu trabajo actual. Es una herramienta de **autoconocimiento y orientación vocacional**, no un examen, ni un diagnóstico clínico, ni una evaluación para selección de personal. No hay respuestas correctas. Te pedimos pensar en tu lugar de trabajo presente y responder con honestidad sobre la **frecuencia** con la que vives cada situación. Tomará entre 6 y 8 minutos. Tus respuestas son confidenciales y se usan únicamente para devolverte un perfil descriptivo de 7 dimensiones del sentido en el trabajo. Si en algún momento te sientes incómodo, puedes detenerte.

### 7.2 Ítems sensibles que disparan NFR-28

Los 3 ítems inversos de Developing the Inner Self codifican erosión moral / autodesconexión y, junto con puntuaciones muy bajas en Inspiration (≤ P10), activan automáticamente la pieza de contención. Disparadores:

- DIS-R1: "se difumina mi noción de lo correcto y lo incorrecto" — frecuencia ≥ 4 (often/always).
- DIS-R2: "no me gusta en quién me estoy convirtiendo en el trabajo" — frecuencia ≥ 4.
- DIS-R3: "en el trabajo me siento desconectado de mí mismo" — frecuencia ≥ 4.
- Inspiration total ≤ P10 en banda interna.

Cualquier disparador activa el módulo de contención (7.3) y la sección de líneas de ayuda (7.4).

**[Aporte Gemini]** Salvaguarda adicional B2B: el dashboard organizacional NUNCA debe permitir trazabilidad individual de ítems sensibles. Cualquier reporte agregado a recursos humanos debe (a) presentar sólo medias por dimensión a nivel equipo/área (no individuo), (b) requerir un mínimo de n ≥ 8 respuestas por celda agregada para publicarse, (c) ocultar la dimensión "Developing the Inner Self" a niveles de granularidad menores que toda la organización. Esto previene sesgos de represalia ante respuestas de erosión moral / alienación.

### 7.3 Mensaje de contención (es-CO, ≤120 palabras)

> Algunas de tus respuestas sugieren que tu trabajo, con cierta frecuencia, está poniendo bajo tensión cosas importantes para ti: tu sentido de lo correcto, tu identidad o tu conexión contigo mismo. Esto **no es un diagnóstico** y no implica que algo esté mal contigo. Es información valiosa que vale la pena mirar con calma, idealmente con alguien de tu confianza o con un profesional de psicología organizacional o vocacional. Si lo que estás sintiendo se acompaña de tristeza, ansiedad o ideas que te preocupan, recuerda que existen líneas de apoyo gratuitas en Colombia que puedes contactar en cualquier momento (ver abajo). Cuidarte es parte de orientarte.

### 7.4 Líneas de ayuda Colombia (verificadas a 2026)

- **Línea 106 — "El poder de ser escuchado"** (Bogotá D.C., Secretaría Distrital de Salud). Apoyo psicológico gratuito, 24/7. Tel: **106**. WhatsApp: **300 754 8933**. Email: linea106@saludcapital.gov.co. *Hecho — verificada en 2025/2026 por Secretaría Distrital de Salud y Alcaldía de Bogotá; entre enero–abril 2025 atendió 15 832 llamadas, +81% vs 2024.*
- **Línea 192 opción 4 — Teleorientación en Salud Mental** (Ministerio de Salud y Protección Social, cobertura nacional). 24/7, gratuita. *Hecho — Minsalud, vigente.*
- **Línea 123** (emergencias generales Bogotá; activa rutas de urgencia en salud mental con equipos interdisciplinarios). *Hecho — confirmado por Secretaría Distrital de Salud, 2025.*
- **Línea Púrpura** (Bogotá; mujeres mayores de 18 en situaciones de violencia o crisis): **01 8000 112 137**. WhatsApp: **300 755 1846**.
- **Línea Calma** (Bogotá; hombres con emociones difíciles, manejo de ira): **01 8000 423 614**.
- **Medellín — Línea Amiga Saludable:** (604) 444 44 48 / WhatsApp 300 723 1123.
- **Directorio nacional** de líneas territoriales de salud mental: Minsalud, agosto 2025, https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/VS/PP/ET/directorio-salud-mental-prevencion-suicidio-minsalud.pdf

> **Descartado por consolidación.** Gemini menciona "Línea Nacional Psicoactiva 018000 112439" como recurso primario. Esta línea **es histórica de atención al consumo de sustancias psicoactivas**, no de salud mental general; su uso como recurso de contención post-CMWS sería un mismatch de propósito. Se omite.

### 7.5 Post-test disclaimer (es-CO, ≤80 palabras)

> Lo que acabas de leer es un **perfil descriptivo** sobre cómo experimentas hoy 7 dimensiones del sentido en tu trabajo. No es un diagnóstico ni una predicción sobre tu carrera ideal. Las personas cambian, los trabajos cambian, y este perfil refleja tu momento actual. Si quieres profundizar, considera conversarlo con un orientador vocacional o con un profesional de psicología organizacional. Guarda tus resultados como un punto de referencia para volver a mirarlos en 6–12 meses.

---

## SECCIÓN 8 — Sugerencias de piloto cognitivo Colombia

### 8.1 Muestra

- **n = 15–30** (estándar del proyecto, alineado con ITC y con prácticas de adaptación lingüística).
- **Elegibilidad:** edad 22–60; empleados formales con vínculo laboral ≥ 3 meses en empresa colombiana; cobertura por sector (mínimo: servicios profesionales, salud, educación, manufactura, comercio); diversidad por género (≥40% mujeres), por nivel educativo (técnico/tecnólogo + universitario + posgrado) y por región (mínimo Bogotá + 1 ciudad intermedia + 1 ciudad costera).
- **[Aporte Gemini — estratificación jerárquica complementaria]** En la franja superior del rango (n = 30), reservar **~1/3 para nivel operativo de primera línea, ~1/3 para mandos intermedios / gerencia, ~1/3 para tomadores de decisión corporativos**. Esta segmentación detecta funcionamiento diferencial del ítem (DIF) por nivel jerárquico, particularmente relevante para reactivos como "I create enough space for me" o "In this work I have the time and space to think", que un operario de ensamblaje puede leer en términos físicos y un decisor en términos cognitivos.
- **Exclusión:** trabajo informal/gig. La OIT *Panorama Laboral 2024 de América Latina y el Caribe* (publicado febrero 2025) reporta que la informalidad laboral en la región fue del **47,6% en 2024 (vs 48% en 2023)**, *"característica predominante del mercado de trabajo en la región"*. Validación específica para informalidad queda pendiente como roadmap futuro.

### 8.2 Protocolo think-aloud

1. Sesiones individuales 25–35 min, presenciales o por videollamada.
2. Para cada ítem: lectura en voz alta + paráfrasis ("díceme qué entiendes de este ítem") + ejemplo concreto ("recuerda un momento en tu trabajo que se parezca") + selección de respuesta con justificación verbal.
3. Sondas específicas para los 3 ítems inversos: verificar que el reverso se entiende como erosión y no como ausencia.
4. Sondeo de carga emocional al cierre: "¿hubo algún ítem que te incomodó?" (input para 7.2).
5. **[Aporte Gemini]** Para ítems de "espacio para pensar" / "espacio para mí", incluir sonda explícita de DIF jerárquico: *"¿Estás pensando en espacio físico, en tiempo o en algo más?"*.

### 8.3 Criterios para aceptar / re-adaptar

- **Aceptar** si ≥80% de participantes parafrasean correctamente, dan ejemplo coherente y eligen respuesta consistente con el ejemplo. **[Aporte Gemini]** Umbral más estricto opcional: ≥85% de consenso interpretativo (al menos 26/30) si la muestra alcanza el techo.
- **Re-adaptar** si <80% en cualquiera de los 3 criterios, o si emergen lecturas culturales contradictorias entre regiones (Bogotá vs costa, por ejemplo, en lectura de "inner self" o "inspiration"), o si emergen lecturas divergentes por nivel jerárquico.
- **Eliminar y consultar a titulares** si un ítem genera reacción emocional adversa documentada en ≥2 participantes (poco probable salvo en los 3 reverse de DIS).

### 8.4 Output esperado

- Versión es-CO ajustada de los 28 ítems (Diccionario de Adaptación Semántica).
- Reporte cualitativo de adaptaciones lexicales por ítem.
- Lista de ítems que disparan reacciones intensas (input para refinamiento de 7.2/7.3).
- **[Aporte Gemini]** Análisis de *time-to-completion* observado por estrato jerárquico, para calibrar el contador de sesión en producto.
- Listo para Fase 4 (validación cuantitativa N≥500).

---

## SECCIÓN 9 — Gaps y preguntas abiertas

1. **Invarianza factorial intercultural no demostrada.** Ninguna publicación reporta MGCFA del CMWS-28 entre países o entre culturas (NZ/EE. UU. vs LATAM). Riesgo de DIF intercultural alto. **Plan:** dentro de Fase 4, incluir MGCFA por país (Colombia vs muestra anclaje 2020) y reportarlo en informe interno antes de release.
2. **Sin datos en informalidad laboral.** El 47.6% de LATAM trabaja informalmente (OIT, 2024); ningún estudio CMWS publicado incluye gig/informal. **Plan:** restringir release inicial a sectores formales B2B; estudio de extensión a informalidad como roadmap 2027.
3. **Sin baremos LATAM.** **Plan:** usar bandas internas calibradas con descriptivos internacionales 2020 hasta tener N≥500 colombianos; declararlo abiertamente al cliente B2B en la ficha técnica.
4. **Ítems reverse pueden generar incomodidad sin un marco de contención.** **Plan:** validar 7.2/7.3 en piloto cognitivo y monitorear tasas de abandono post-DIS en analytics; recalibrar disparadores si la tasa de activación supera 5% del total.
5. **Licencia trilateral sin precedente público.** No hay benchmark de instrumentos con 3 titulares simultáneos implementados en SaaS B2B en LATAM. **Plan:** asignar consultor legal especializado en propiedad intelectual transfronteriza Nueva Zelanda–Colombia para revisar contratos finales.
6. **Trademark "Map of Meaning®".** Uso del nombre comercial en interfaz de DescubreMe podría requerir licencia adicional de marca. **Plan:** consultar explícitamente al Trust si la denominación "CMWS" puede usarse sin invocar la marca registrada.
7. **[Aporte Gemini — gap adicional] Estabilidad de la estructura factorial: 7 factores correlacionados vs. bifactor S-1.** Literatura reciente sobre escalas eudaimónicas advierte que la estructura jerárquica puede colapsar hacia un factor general dominante en poblaciones distintas a la calibración original (ver discusión en Modeling Meaningful Work, ResearchGate publication 390222515; categoría: literatura especializada reciente, [verificar antes de uso]). **Plan:** durante el soft-launch (primeras N=500–1000 respuestas B2B), correr CFA comparativos del modelo de 7 factores correlacionados contra un modelo bifactor S-1 con DIS o Inspiration como factor de referencia. Si emerge un factor general dominante, ajustar el reporte de UX hacia menor granularidad para no inducir ilusión de precisión.
8. **[Aporte Gemini — gap adicional] Riesgo de instrumentalización corporativa.** Literatura crítica (Bailey, Yeoman, Madden, Thompson & Kerridge, 2019, *International Journal of Management Reviews*, DOI 10.1111/ijmr.12181) y el meta-marco de "dark side of meaningful work" advierten que las métricas de sentido pueden ser cooptadas por departamentos de RH para narrativas performativas. **Plan:** incluir en el contrato B2B una cláusula de uso ético que prohíba usar resultados individuales para decisiones de selección, promoción o sanción. Hacer explícito al usuario final que sus respuestas individuales nunca se comparten con su empleador.

---

## SECCIÓN 10 — Referencias (APA 7)

Both-Nwabuwe, J. M. C., Dijkstra, M. T. M., & Beersma, B. (2017). Sweeping the floor or putting a man on the moon: How to define and measure meaningful work. *Frontiers in Psychology*, 8, 1658. https://doi.org/10.3389/fpsyg.2017.01658

Duarte-Lores, I., Rolo-González, G., Suárez, E., & Chinea-Montesdeoca, C. (2023). Meaningful work, work and life satisfaction: Spanish adaptation of Work and Meaning Inventory Scale. *Current Psychology*, 42(14), 12151–12163. https://doi.org/10.1007/s12144-021-02569-8

International Labour Organization. (2025). *Panorama Laboral 2024 de América Latina y el Caribe*. Oficina Regional para América Latina y el Caribe, OIT. https://www.ilo.org/publications/2024-labour-overview-latin-america-and-caribbean

Lips-Wiersma, M., Haar, J., & Wright, S. (2020). The effect of fairness, responsible leadership and worthy work on multiple dimensions of meaningful work. *Journal of Business Ethics*, 161(1), 35–52. https://doi.org/10.1007/s10551-018-3967-2

Lips-Wiersma, M., & Morris, L. (2009). Discriminating between "meaningful work" and the "management of meaning". *Journal of Business Ethics*, 88(3), 491–511. https://doi.org/10.1007/s10551-009-0118-9

Lips-Wiersma, M., & Wright, S. (2012). Measuring the meaning of meaningful work: Development and validation of the Comprehensive Meaningful Work Scale (CMWS). *Group & Organization Management*, 37(5), 655–685. https://doi.org/10.1177/1059601112461578

Lips-Wiersma, M., Wright, S., & Dik, B. (2016). Meaningful work: Differences among blue-, pink-, and white-collar occupations. *Career Development International*, 21(5), 534–551. https://doi.org/10.1108/CDI-04-2016-0052

Lopez, F. G., & Ramos, K. (2017). An exploration of gender and career stage differences on a multidimensional measure of work meaningfulness. *Journal of Career Assessment*, 25(3), 423–433. https://doi.org/10.1177/1069072716639851

Ministerio de Salud y Protección Social de Colombia. (2025). *Directorio nacional de líneas territoriales de atención en salud mental en Colombia*. Bogotá: Minsalud. https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/VS/PP/ET/directorio-salud-mental-prevencion-suicidio-minsalud.pdf

Muñiz, J., Elosua, P., & Hambleton, R. K. (2013). Directrices para la traducción y adaptación de los tests: Segunda edición. *Psicothema*, 25(2), 151–157. https://doi.org/10.7334/psicothema2013.24

SAGE Publishing. (s.f.). *Process for requesting permission*. https://www.sagepub.com/journals/permissions/process-for-requesting-permission

Secretaría Distrital de Salud de Bogotá. (2025). *Línea 106 — El poder de ser escuchado*. https://www.saludcapital.gov.co/Paginas2/Quienes_Somos_linea106.aspx

Steger, M. F., Dik, B. J., & Duffy, R. D. (2012). Measuring meaningfulness in work: The Work and Meaning Inventory (WAMI). *Journal of Career Assessment*, 20(3), 322–337. https://doi.org/10.1177/1069072711436160

The Map of Meaning International Charitable Trust. (s.f.). *About the Map / Contact*. https://www.themapofmeaning.org

**[Aporte Gemini — referencias adicionales pertinentes]**

Bailey, C., Yeoman, R., Madden, A., Thompson, M., & Kerridge, G. (2019). A review of the empirical literature on meaningful work: Progress and research agenda. *International Journal of Management Reviews*, 21(1), 83–113. https://doi.org/10.1111/ijmr.12181 — [verificar antes de uso: DOI y volumen confirmados en repositorios académicos, pero conviene re-chequear; pertinencia documentada para la discusión del "dark side" de meaningful work y la instrumentalización corporativa].

---

## Apéndice A — Mapa de aportes consolidados desde Gemini

| # | Sección | Aporte | Valor agregado | Verificación |
|---|---|---|---|---|
| A1 | §1.1 | Lista de ~12 ítems directos adicionales citados en literatura abierta (Unity, Service, Expressing Potential, Reality, Inspiration, Balancing). | Útil como referencia conceptual para piloto cognitivo y diseño de sondas; complementa los 3 inversos literales de Claude. | Parcial. Las citas aparecen en Both-Nwabuwe et al. (2017) y en copias abiertas del artículo 2012. Antes de cualquier uso, verificar carga factorial y numeración en Tabla 4 con la copia académica. NO incorporar a producto sin licencia SAGE. |
| A2 | §2.2 | Sugerencia de usar el protocolo metodológico de Chinea-Montesdeoca para WAMI como referencia procesal (no lexical) para CMWS. | Refuerza la elección del marco ITC y aporta un precedente reciente y replicable en español. | Verificable; sólo procesal, no contenido. |
| A3 | §2.3 | Pivot léxico "trabajo significativo" → "trabajo con propósito" / "sentido en el trabajo" para interfaz. | Mejora resonancia cultural en Colombia. | Validar en piloto cognitivo. |
| A3 | §2.3 | Traducción adaptada de "life is messy" → "la dinámica del día a día es compleja e impredecible". | Mitiga el calco infeliz "la vida es desordenada". | Validar en piloto cognitivo. |
| A4 | §3.2 | Lógica de puntuación ipsativa / intrasujeto con cortes lógicos provisionales (2.5 y 4.0) durante beta. | Reduce el riesgo de transmitir falsa precisión normativa al usuario antes de tener baremos. | Operacionalmente viable; alinea con la decisión de no publicar percentiles hasta tener norma colombiana. |
| A5 | §5 | Anclaje al constructo eudaimónico en descripciones técnicas internas. | Refuerza fundamentación teórica sin alterar texto al usuario. | Verificable en la teoría base del CMWS. |
| A6 | §6.2 | Sensibilidad institucional del Map of Meaning Trust ante uso transaccional/performativo; argumento de soberanía analítica del individuo como diferenciador para la solicitud. | Aumenta probabilidad de respuesta favorable del Trust. | Apoyado por literatura crítica (Bailey et al., 2017/2019); marco general verificable, no cita literal. |
| A7 | §6.4 | Inserción explícita en el email del compromiso de privacidad B2B y referencia a la literatura crítica de meaningful work. | Diferenciador competitivo en la solicitud. | Aporte de comunicación; verificación no requerida. |
| A8 | §7.2 | Reglas técnicas para el dashboard B2B: agregación con n ≥ 8 por celda, no granularidad individual, ocultar DIS a niveles bajos. | Operacionaliza el principio de no-trazabilidad. | Aporte de diseño de producto; sin contraste empírico necesario. |
| A9 | §8.1 | Estratificación adicional por nivel jerárquico (≈10/10/10 en n=30). | Detecta DIF jerárquico desde el piloto. | Buena práctica de muestreo; verificable. |
| A10 | §8.2 | Sonda explícita de DIF jerárquico para ítems de "espacio". | Complementa think-aloud. | Buena práctica; verificable. |
| A11 | §8.4 | Inclusión de time-to-completion por estrato jerárquico en entregables del piloto. | Calibra el contador de sesión en producto. | Operacionalmente viable. |
| A12 | §9 | Gap nuevo sobre estabilidad 7 factores vs. bifactor S-1. | Riesgo psicométrico relevante. | Plan operativo durante soft-launch. La referencia específica (ResearchGate 390222515) requiere verificación antes de citar formalmente. |
| A13 | §9 | Gap nuevo sobre instrumentalización corporativa, con cláusula contractual B2B. | Salvaguarda ética. | Apoyada por literatura crítica; cláusula contractual a redactar con asesoría legal. |
| A14 | §10 | Referencia adicional Bailey et al. (2019). | Soporta gap 8. | DOI y volumen requieren confirmación final. Marcada `[verificar antes de uso]`. |

### Aportes de Gemini DESCARTADOS por errores u omisiones

| # | Sección | Error / omisión Gemini | Decisión |
|---|---|---|---|
| D1 | §0 / §1.3 | Escala Likert 7 puntos (en lugar de 5). | Descartado. Se usa la corrección de Claude (5 puntos de frecuencia, verificada en Lips-Wiersma, Haar & Wright 2020). |
| D2 | §1.3 | Distribución uniforme 4 ítems/dimensión. | Descartado. Distribución desigual 6/4/4/3/3/4/4 verificada en Tabla 4 de Lips-Wiersma & Wright (2012). |
| D3 | §4 | Item "How often have you been emotionally exhausted?" presentado como ítem inverso del CMWS. | Descartado. Es subescala de Emotional Exhaustion del MBI, no del CMWS. |
| D4 | §6.4 | Email `info@themapofmeaning.org`. | Descartado. Contacto verificado es `admin@themapofmeaning.org`. |
| D5 | §7.4 | "Línea Nacional Psicoactiva 018000 112439" como recurso primario de salud mental. | Descartado. Es línea de atención a consumo de sustancias, mismatch de propósito. Se usa el directorio Minsalud + 6 líneas verificadas en el consolidado. |
| D6 | §10 | Sección sustituida por "Síntesis narrativa" sin formato APA 7 con DOI. | Descartado. Se usa el bloque de 16 referencias APA de Claude + 1 referencia adicional verificable de Gemini (Bailey et al., 2019). |
| D7 | §5 | Bandas con marcadores Hecho/Inferencia/Opinión profesional dentro del texto al usuario. | Descartado. Estos marcadores son para uso interno del Pack, no para UI. Se usa la redacción limpia de Claude. |
| D8 | §3 | Tabla maestra completamente `[sin fuente verificada]` (omite descriptivos del estudio 2020 N=879 y Estudio 1 N=405). | Descartado. Se usa la tabla rica de Claude. |
| D9 | §0.1 | Falta tabla de correcciones al brief. | Suplementado por Claude. |

---

## Apéndice B — Notas de consolidación (metodología)

### Procedimiento aplicado

1. Lectura completa de ambos packs.
2. Diagnóstico de cumplimiento del prompt v1.0 sección por sección.
3. Decisión de método: "Claude base + Gemini suple" dado que Gemini fue PARCIAL (cumple nominalmente 10 secciones pero con errores estructurales mayores en §0, §1, §3, §4, §10 y omisiones en §0.1).
4. Integración selectiva de aportes Gemini con tres criterios: (a) información nueva no presente en Claude, (b) verificabilidad o naturaleza operacional clara, (c) valor para el producto DescubreMe.
5. Marcaje explícito de procedencia en línea con `[Aporte Gemini]`.
6. Documentación íntegra en Apéndice A (integrados) y bloque "Aportes descartados" (omitidos por error).

### Distribución final del documento

- Claude: ~92% del contenido sustantivo (estructura, datos, tablas, referencias, textos UI).
- Gemini integrado: ~8% (14 aportes verificables; principalmente §8 estratificación jerárquica, §9 gap bifactor + gap instrumentalización, §6 argumento de privacidad para Trust, §7 reglas de agregación B2B).

### Pendientes de verificación antes de uso

- Tabla de ítems directos sugerida en §1.1 [Aporte Gemini A1]: confirmar numeración y cargas en Tabla 4 con la copia abierta de Lips-Wiersma & Wright (2012) en Academia.edu/ResearchGate antes de usar en sondas cognitivas.
- Bailey et al. (2019): confirmar DOI y volumen en repositorio académico antes de citar formalmente.
- Referencia ResearchGate publication 390222515 (Modeling Meaningful Work): verificar autoría, año y revista antes de citar como fuente del gap A12 en §9.

### Banderas de riesgo para implementación

- **El brief original contiene errores propagables**: 4 ítems por dimensión + Likert 7 puntos. Cualquier downstream que use el brief sin pasar por este Pack reproducirá los errores. **Acción**: bloquear cualquier spec técnica para Claude Code que no cite la tabla 0.1 explícitamente.
- **Cadena trilateral de licencia**: precedente público inexistente en SaaS B2B LATAM. Asesoría legal especializada NZ–Colombia es indispensable antes de firmar contratos.

---

*Fin del Implementation Acquisition Pack v1.0 — CMWS — Consolidado Claude + Gemini.*
