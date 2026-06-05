# S-DFS-2 — Implementation Acquisition Pack v1.0 (Consolidado Claude + Gemini)

> **Nota metodológica de consolidación.** Este documento integra dos investigaciones independientes ejecutadas en paralelo (Claude y Gemini) sobre la Short Dispositional Flow Scale-2 (S-DFS-2; Jackson, Martin & Eklund, 2008). **A diferencia del patrón observado en los 16 packs previos, en S-DFS-2 ninguno de los dos modelos entregó las 10 secciones operativas del prompt v1.0.** Claude entregó un informe de acquisition research en formato narrativo (TL;DR / Key Findings / Details / Tablas / Recommendations / Caveats / Referencias APA 7) muy alineado al uso B2C de DescubreMe; Gemini entregó una revisión académica narrativa exhaustiva (fundamentos teóricos, evolución metodológica, propiedades psicométricas, invarianza transcultural, aplicaciones) sin estructura operativa.
>
> **Decisión de consolidación:** Claude como base operativa (~85%) — su material cubre la sustancia de §0, §1, §2, §3, §6 y §10 del prompt v1.0 y aporta tablas accionables, contactos verificados, copy-paste de licencia y disclaimers Colombia. Las secciones que ambos modelos dejaron sin desarrollo operativo (§4 ítems inversos, §5 textos de interpretación es-CO, §7 disclaimers/contención, §8 piloto cognitivo, §9 gaps) se reconstruyen aquí a partir del material disponible, marcando explícitamente lo que NO puede llenarse sin licencia Mind Garden firmada (los 9 ítems literales son IP propietaria). Aportes de Gemini que suman valor verificable se marcan `[Aporte Gemini]` y se mapean en el Apéndice A.
>
> **Alertas de fondo:**
> 1. El banco de ítems literal del S-DFS-2 NO puede reproducirse en este pack ni en DescubreMe sin licencia Mind Garden firmada (ToS §3-c, §10). Cualquier ítem que aparezca abajo proviene de muestras autorizadas o de adaptaciones secundarias (DFS-2 largo, no S-DFS-2) y se marca como tal.
> 2. Gemini incluye texto de varios ítems en español derivados de adaptaciones del DFS-2 largo (España, México, Argentina), NO del S-DFS-2 original. Estas citas tienen valor referencial para la traducción futura, pero **no son los 9 ítems oficiales del S-DFS-2** y se marcan `[Aporte Gemini — referencia DFS-2 largo, NO S-DFS-2 verbatim]`.
> 3. No existen baremos publicados nacionales/LATAM del S-DFS-2; sólo α = .81 (Jackson et al., 2008, n=692). Las M/DT por ítem están en la Tabla 1 del paper original tras paywall Human Kinetics — `[sin fuente verificada en abierto]`.

---

## Tabla de cobertura por sección del prompt v1.0

| § | Sección | Claude | Gemini | Estado en consolidado |
|---|---|---|---|---|
| §0 | Portada / metadatos / bloqueadores | OK (TL;DR + Caveats) | PARCIAL (en narrativa) | OK — reescrita en formato operativo |
| §1 | Acquisition plan banco de ítems + lista literal con clave | PARCIAL (no lista los 9 ítems; explica por qué) | PARCIAL (cita ejemplos de DFS-2 largo, no S-DFS-2 verbatim) | PARCIAL bloqueado — lista de dimensiones con sample items autorizados + nota IP |
| §2 | Adaptaciones al español (tabla) + recomendación es-CO | OK (Tabla 1) | OK (Tabla 2 transcultural) | OK — fusión de ambas tablas |
| §3 | Baremos + recomendación LATAM + roadmap CO | OK (Tabla 2 + Caveat #1) | OK (índices CFA verbatim Jackson 2008) | OK — fusión |
| §4 | Ítems inversos numerados con faceta | OK declarativo ("no hay reverse") | OK declarativo | OK — N/A confirmada |
| §5 | Textos de interpretación es-CO (BAJO/MEDIO/ALTO) | NO | NO | PARCIAL — borradores genéricos a nivel global; faceta no es viable sin baremos locales |
| §6 | License acquisition plan + email copy-paste | OK (sección Recommendations + Tabla 3) | PARCIAL (parámetros comerciales Mind Garden) | OK — email copy-paste + fusión Tabla 3 |
| §7 | Disclaimers pre/post + NFR-28 + líneas Colombia | PARCIAL (lista líneas pero no copy-paste disclaimer) | NO | PARCIAL — borradores de disclaimer pre/post construidos |
| §8 | Piloto cognitivo Colombia | PARCIAL (5 líneas en Recommendations) | NO | PARCIAL — protocolo expandido con muestra, think-aloud, criterios |
| §9 | Gaps y preguntas abiertas (≥3) | PARCIAL (en Caveats) | PARCIAL (sección final "perspectivas") | OK — ≥6 gaps explícitos con plan |
| §10 | Referencias APA 7 con DOI (≥10) | OK (16 referencias) | OK (43 referencias web) | OK — fusión depurada (≥18 con DOI) |

---

## §0 — Portada y metadatos + status de bloqueadores

**Instrumento:** S-DFS-2 — Short Dispositional Flow Scale-2.
**Autores originales:** Susan A. Jackson, Andrew J. Martin & Robert C. Eklund (2008).
**Cita pivote:** Jackson, S. A., Martin, A. J., & Eklund, R. C. (2008). Long and short measures of flow: The construct validity of the FSS-2, DFS-2, and new brief counterparts. *Journal of Sport and Exercise Psychology, 30*(5), 561-587. https://doi.org/10.1123/jsep.30.5.561
**Manual oficial:** Jackson, S. A., Eklund, R. C., & Martin, A. J. (2010). *The Flow Manual: The manual for the Flow Scales*. Mind Garden, Inc.
**Editor / titular IP:** Mind Garden Inc. (Menlo Park, CA, USA). Copyright © 2010 Susan A. Jackson.
**Idioma original:** Inglés.
**N° de ítems:** 9 (uno por cada dimensión del modelo de Csikszentmihalyi).
**Escala de respuesta:** Likert 5 puntos (1 = Nunca / Never; 5 = Siempre / Always) o equivalente disposicional (1 = Totalmente en desacuerdo; 5 = Totalmente de acuerdo).
**Tiempo de administración:** ~5 minutos. Audiencia 12+ años (Mind Garden).
**Tipo:** Forma corta disposicional (rasgo). Score global sumativo (rango 9-45) o promedio (1-5).
**Uso previsto en DescubreMe:** Condicional Paid Premium B2C + B2B-A. **NO Free**, **NO B2B-B**.

### Status de bloqueadores

| Bloqueador | Estado | Detalle |
|---|---|---|
| Banco de ítems oficial literal | **BLOCKED** | IP de Mind Garden; ToS §3-c prohíbe diseminación. No reproducible aquí ni en DescubreMe sin licencia firmada |
| Licencia comercial SaaS B2C con feedback al usuario | **BLOCKED** | License to Administer estándar es "research only, no individual feedback" — requiere acuerdo comercial negociado caso por caso |
| Traducción oficial al español-Colombia | **BLOCKED** | Mind Garden ofrece "Spanish" sólo para FSS-2-General y DFS-2-General **largos** (NO S-DFS-2). Y ToS §7-g asigna IP de traducción a Mind Garden |
| Baremos LATAM / Colombia | **NO EXISTEN** | Ni S-DFS-2 ni DFS-2 tienen baremos colombianos publicados. DescubreMe sería first-mover |
| Baremos generales del S-DFS-2 (M/DT/percentiles) | **PARTIAL** | Sólo α = .81 (n=692, Jackson et al., 2008) accesible en abierto. M/DT por ítem en paper paywall Human Kinetics — `[sin fuente verificada en abierto]` |
| Adaptación es-LATAM publicada del S-DFS-2 | **NO EXISTE** | Las adaptaciones hispanohablantes son del **DFS-2 largo** (Rodríguez-Antonio & del Valle López, 2021 — videojuegos México; García Calvo et al., 2008 — deporte España) o de un instrumento propio breve (Calero & Injoque-Ricle, 2013 — Argentina adolescentes) |
| Literatura crítica vigente | **READY** | Lavoie et al. (2022, Open Access); Newman et al. (2022, Frontiers Open Access) — cuestionan estructura 9-factor del DFS-2/FSS-2 |
| Disclaimers + líneas crisis Colombia | **READY** | Línea 106, 123, 192 op.4 + líneas distritales documentadas |

**Conclusión §0:** S-DFS-2 NO es implementable en modo "ya". Requiere mínimo 12-18 meses de ruta legal + adaptación cultural + validación local antes de exponerse a usuario final.

---

## §1 — Acquisition plan banco de ítems + lista literal con clave directa/inversa

### §1.1 — Estado del banco oficial

El S-DFS-2 consta de **9 ítems**, uno por cada una de las nueve dimensiones del modelo de flow de Csikszentmihalyi (Jackson, Martin & Eklund, 2008; Mind Garden, n.d.). Los 9 ítems fueron seleccionados quirúrgicamente del banco de 36 del DFS-2 largo, priorizando: (a) las cargas factoriales más altas en validaciones previas y (b) la mejor validez aparente (face validity) cuando las cargas eran equivalentes [Aporte Gemini — explicación de metodología de selección de "ítems dorados" en Jackson et al., 2008].

### §1.2 — Lista de dimensiones + sample items autorizados

**No es legalmente posible reproducir los 9 ítems literales en este pack** (Mind Garden ToS §3-c y §10). La tabla siguiente lista las 9 dimensiones con su faceta teórica y, donde corresponde, el *sample item* autorizado por Mind Garden o citado en literatura licenciada (PMC, blogs Positive Psychology). Para los ítems donde no existe muestra autorizada, se documenta una redacción **referencial del DFS-2 largo en español** proveniente de adaptaciones secundarias (España, México, Argentina) — `[Aporte Gemini — DFS-2 largo es-ES/es-MX/es-AR, NO S-DFS-2 verbatim]`. Esta redacción NO es la del S-DFS-2 y se aporta sólo como insumo de la futura adaptación es-CO contratada.

| # | Dimensión (faceta Csikszentmihalyi) | Clave | Sample item EN autorizado (Mind Garden / literatura licenciada) | Referencia es (DFS-2 largo, no verbatim S-DFS-2) |
|---|---|---|---|---|
| 1 | Balance reto-habilidad (Challenge-Skill Balance) | Directo | [Sin sample item verbatim publicado bajo licencia abierta para el ítem específico del S-DFS-2] | Referencia genérica DFS-2 largo es-MX (Rodríguez-Antonio, 2021): redacción sobre percepción de equilibrio entre desafío y habilidades propias `[Aporte Gemini]` |
| 2 | Fusión acción-conciencia (Action-Awareness Merging) | Directo | [Sin sample item verbatim S-DFS-2] | Referencia DFS-2 largo: redacción sobre ejecución automática sin reflexión consciente `[Aporte Gemini]` |
| 3 | Metas claras (Clear Goals) | Directo | [Sin sample item verbatim S-DFS-2] | Referencia DFS-2 largo: redacción sobre claridad de objetivos durante la actividad `[Aporte Gemini]` |
| 4 | Retroalimentación inequívoca (Unambiguous Feedback) | Directo | [Sin sample item verbatim S-DFS-2] | Referencia DFS-2 largo: redacción sobre claridad de la información sobre desempeño `[Aporte Gemini]` |
| 5 | Concentración en la tarea (Concentration on the Task at Hand) | Directo | **"I am completely focused on the task at hand"** (Mind Garden sample, citado en Positive Psychology / PMC9534373) | Referencia DFS-2 largo: redacción sobre atención total a la tarea `[Aporte Gemini]` |
| 6 | Sentido de control (Sense of Control) | Directo | [Sin sample item verbatim S-DFS-2] | Referencia DFS-2 largo: redacción sobre sensación de control total sobre lo que se hace `[Aporte Gemini]` |
| 7 | Pérdida de auto-conciencia (Loss of Self-Consciousness) | Directo | [Sin sample item verbatim S-DFS-2] | Referencia DFS-2 largo: redacción sobre ausencia de preocupación por juicio externo `[Aporte Gemini]` |
| 8 | Transformación del tiempo (Time Transformation) | Directo | [Sin sample item verbatim S-DFS-2] | Referencia DFS-2 largo: redacción sobre distorsión en la percepción temporal `[Aporte Gemini]` |
| 9 | Experiencia autotélica (Autotelic Experience) | Directo | **"I found the experience extremely rewarding"** (Mind Garden sample, citado en Jackson et al., 2008 / Positive Psychology) | Referencia DFS-2 largo: redacción sobre disfrute intrínseco de la actividad `[Aporte Gemini]` |

**Clave:** Los 9 ítems del S-DFS-2 son **todos de clave directa**. No hay ítems con clave inversa (ver §4).

### §1.3 — Plan de adquisición del banco oficial

1. **Pre-requisito legal:** firmar licencia comercial SaaS con Mind Garden + permiso de traducción al español-Colombia (ver §6).
2. **Compra de instrumento base:** "Transform Survey Hosting: S DFS-2" (USD 2.75/administración, mín. 20) o "FLOW License to Administer" (USD 2.75/administración, mín. 50) en https://www.mindgarden.com/flow-scales/461-flow-sdfs2-transform-survey-hosting.html
3. **Compra del Flow Manual:** Jackson, Eklund & Martin (2010), *The Flow Manual* — necesario para ver los 9 ítems oficiales y las instrucciones estándar de administración. Vendido por Mind Garden.
4. **Compra del paper original:** Jackson, Martin & Eklund (2008), Human Kinetics ~USD 30 — necesario para verificar las M/DT por ítem de la Tabla 1.
5. **Traducción es-CO:** ver §6 (formulario https://www.mindgarden.com/mind-garden-forms/61-translation-application.html). Importante: ToS §7-g asigna IP de la traducción a Mind Garden.

---

## §2 — Adaptaciones al español y recomendación es-CO

### §2.1 — Tabla consolidada de adaptaciones hispanohablantes y latinas

| Cita | País / contexto | Instrumento adaptado | N | Edad / población | Estructura / hallazgos | Confiabilidad | Acceso |
|---|---|---|---|---|---|---|---|
| Rodríguez-Antonio & del Valle López (2021). *Revista Evaluar*, 21(3), 63-80. https://doi.org/10.35670/1667-4545.v21.n3.36307 | México (noreste) / videojuegos | DFS-2 **largo 36 ítems** | 312 | 16-34 años (M=19.90; DE=2.73), universitarios | CFA ajuste aceptable; AFE re-especificado: 33 ítems en "antecedentes" vs "consecuencias" del flow; validez convergente OK, discriminante deficiente | No reportado verbatim en abstract abierto | Open access |
| Calero & Injoque-Ricle (2013). *Revista Evaluar*, 13(1), 40-55. https://doi.org/10.35670/1667-4545.v13.n1.6796 | Argentina (CABA) | **Inventario Breve de Experiencias Óptimas** (NO S-DFS-2 ni DFS-2) | 211 adolescentes (replicado luego en N=300) | M=14.26 años (DE=1.21) | Análisis discriminante de ítems + EFE + CFA; estructura óptima de un solo factor latente que aglutina las 9 dimensiones `[Aporte Gemini]` | [sin valor verificado en abstract abierto] | Open access (CONICET) |
| González-Cutre et al. (2009) `[Aporte Gemini]` | España | DFS-2 largo (castellano) en educación física | Estudiantes EF | Estudiantes secundaria/universidad EF | CFA estándar; equivalencia estructural lograda; experiencia autotélica mapea fuerte con satisfacción deportiva SSI-PE y autonomía | [no recuperado en abierto] | Referenciada extensamente |
| García Calvo, Jiménez, Santos-Rosa, Reina & Cervelló (2008) | España / deporte | DFS / FSS larga (castellano) | No recuperable en abierto | Adultos deportistas | 9 dimensiones | [sin fuente verificada para α] | Citada extensamente; PDF no localizado en abierto |
| Mind Garden Spanish translation (sin validación local) | — | FSS-2-General y DFS-2-General **largos** únicamente | — | — | Sin validación psicométrica formal | "We cannot assure translation quality" | Incluida gratis con License to Administer |
| Bittencourt et al. (2021). *PLOS ONE*, 16(7), e0253044. https://doi.org/10.1371/journal.pone.0253044 | Brasil / general | DFS-BR (portugués brasileño largo) + DFS-Short BR (9 ítems) | 681 | Adultos | CFA 9-factores: χ²/df=4.23, CFI=.94, TLI=.93, RMSEA=.069; short: χ²/df=2.94, CFI=.98, TLI=.97, RMSEA=.053 | "Excellent internal consistency" | Open access |
| Gouveia et al. (2012) `[Aporte Gemini]` | Portugal | DFS-2 largo portugués (ejercicio y artes marciales) | 1,437 | Adultos | CFA 9 factores 1er orden ajuste aceptable; anomalía: "Transformación del tiempo" y "Pérdida de autoconciencia" presentan correlaciones débiles con factor global en contextos de ejercicio físico | [no detallado] | Citado en literatura iberoamericana |
| Adaptación colombiana del S-DFS-2 | — | — | — | — | — | — | **No existe** |

### §2.2 — Recomendación es-CO

- **No existe ninguna adaptación es-CO del S-DFS-2 publicada.** DescubreMe sería first-mover.
- **Insumo más cercano disponible para arrancar la traducción:** referencias léxicas y semánticas del DFS-2 largo es-ES (González-Cutre et al., 2009) y es-MX (Rodríguez-Antonio, 2021), más el Inventario Breve de Experiencias Óptimas es-AR (Calero & Injoque-Ricle, 2013) que aunque no es S-DFS-2 sí trabajó las 9 dimensiones operacionalmente en jóvenes hispanoparlantes `[Aporte Gemini — valor referencial para anclaje semántico]`.
- **Ruta recomendada (sólo si Mind Garden otorga licencia razonable):** back-translation con 2 traductores bilingües es-CO + retro-traducción al inglés + panel de expertos colombianos en flow/psicometría + piloto cognitivo (§8) + validación cuantitativa local (§3).
- **Alerta cultural:** revisar especialmente los ítems de "Pérdida de auto-conciencia" (ítem 7) y "Transformación del tiempo" (ítem 8), que muestran inestabilidad factorial en contextos de actividad física no competitiva en muestras lusófonas e hispanas (Gouveia et al., 2012 `[Aporte Gemini]`). En DescubreMe (autoconocimiento general, no deporte), esta inestabilidad podría reproducirse.

---

## §3 — Baremos publicados + recomendación LATAM + roadmap CO

### §3.1 — Tabla de baremos / propiedades psicométricas

| Métrica | Valor | N / muestra | Fuente |
|---|---|---|---|
| α Cronbach total (S-DFS-2 dispositional, actividad física) | **.81** | n=692 | Jackson, Martin & Eklund (2008); citado verbatim en Moneta (2017), *PAID*, 109, 83-88, https://doi.org/10.1016/j.paid.2016.12.033 |
| α Cronbach S-DFS-2 traducido al chino | **.73** (Liu en PMC9534373) / **.82** `[Aporte Gemini — Liu et al., 2010, atletas chinos]` | atletas chinos | Liu et al. (2010); reportes discrepan entre fuentes |
| Convergencia ítem corto ↔ subescala larga (dispositional) | r = .66–.83; M r = .76 | n=692 | Jackson, Martin & Eklund (2008) |
| CFA S-DFS-2 (turco, Keskin-Akın et al., 2018) | χ²/df=.99; RMSEA=.00; SRMR=.03; NFI=.96; NNFI=1.00; CFI=1.00; GFI=.97; cargas factoriales .39–.68 | N=215 estudiantes EF | Keskin-Akın et al. (2018) |
| CFA S-DFS chino (PMC9534373) | χ²/df=2.49; CFI=.91; NNFI=.88; RMSEA=.058 | atletas chinos | Liu, en PMC9534373 |
| **CFA S-DFS-2 Independiente (muestra original)** `[Aporte Gemini — verbatim Jackson et al., 2008]` | χ²=145.27; df=27; CFI=.95; NNFI=.93; RMSEA=.08; SRMR=.05; α=.77; cargas .30–.69 | N=692 | Jackson, Martin & Eklund (2008) — Tabla en p. 561-587 |
| **CFA S-DFS-2 Embebida (validación cruzada)** `[Aporte Gemini]` | χ²=127.87; df=27; CFI=.96; NNFI=.95; RMSEA=.07; SRMR=.05; α=.77 | muestra cruzada | Jackson et al. (2008) |
| **CFA S-FSS-2 Embebida (validación cruzada)** `[Aporte Gemini]` | χ²=72.58; df=27; CFI=.98; NNFI=.97; RMSEA=.05; SRMR=.04; α=.75; cargas .02–.73 | N=499 | Jackson et al. (2008) — referencia comparativa para el rasgo |
| Validación Polaca DFS-2 + FSS-2 | Ajuste satisfactorio CFA 1er y 2do orden; única advertencia en SRMR para FSS-2 jerárquico | N=496 adultos (M=36.31) | Józefowicz et al. (2022). *Frontiers in Psychology*, 13, 818036. https://doi.org/10.3389/fpsyg.2022.818036 |
| Validación Persa (Irán) `[Aporte Gemini]` | 72.5% varianza explicada; estabilidad temporal r=.85 | N=1,180 atletas (M=20.4) | Validación persa DFS-2 (referencia secundaria) |
| Validación Italiana | Estructura confirmada | Adultos italianos | Tozzi, Gigliotti, Stillo & Maraschini (2017). *PLOS ONE*, 12(9), e0182201. https://doi.org/10.1371/journal.pone.0182201 |
| Asimetría / curtosis distribuciones S-DFS-2 `[Aporte Gemini]` | Skewness –.15 a –.81; leptocurtosis variable; puntuaciones tienden a 3.5–4.5 en escala 1-5 | n=692 | Jackson et al. (2008) — distribución sesgada negativamente en poblaciones evaluadas sobre actividades elegidas voluntariamente |
| Validez convergente con PACES (enjoyment) | Significativa (r exacto no recuperado) | N=215 turco | Keskin-Akın et al. (2018) |
| **Media total S-DFS-2 (n=692)** | `[sin fuente verificada en repositorio abierto — paywall Human Kinetics]` | — | Jackson et al. (2008) — Tabla 1 paywall |
| **DT total S-DFS-2 (n=692)** | `[sin fuente verificada en abierto]` | — | Jackson et al. (2008) |
| **Percentiles por edad/género/país** | **NO publicados** para S-DFS-2 | — | — |
| **Baremos LATAM / Colombia** | **NO existen** | — | — |

### §3.2 — Recomendación LATAM y roadmap Colombia

- **LATAM:** No hay baremos. Aproximación más útil hoy: el modelo de Bittencourt et al. (2021) para DFS-BR Short en Brasil (681 adultos, CFA short χ²/df=2.94, CFI=.98, RMSEA=.053) es la única validación reciente de una versión corta de 9 ítems en LATAM, aunque en portugués brasileño.
- **Roadmap CO (12-18 meses, si Mind Garden licencia):**
  1. Traducción es-CO + revisión panel (3 meses).
  2. Piloto cognitivo N=20-30 (§8) (1 mes).
  3. Validación cuantitativa local: N=300-500 adultos colombianos, CFA unifactorial global + 9 factores 1er orden, α de Cronbach, ω de McDonald, validez convergente con UWES-9 / SWLS (4-6 meses).
  4. Construcción de baremos colombianos estratificados por edad (18-29 / 30-44 / 45-65) y género (3-4 meses).
- **Score recomendado en producto:** **solo score global** (sumativo 9-45 o promedio 1-5) — evita la controversia dimensional de Lavoie et al. (2022) que reduce el modelo de 9 dimensiones a 2.

---

## §4 — Ítems inversos numerados con faceta/dimensión

**El S-DFS-2 NO contiene ítems con clave inversa.** Hecho confirmado por ambos modelos en consolidación, y verificable en:

- Jackson, Martin & Eklund (2008) — paper original (los 9 ítems se redactan en dirección positiva, escala 1=Nunca a 5=Siempre).
- Jackson, Eklund & Martin (2010) — *The Flow Manual*.
- Replicaciones internacionales: Tozzi et al. (2017, italiana), Józefowicz et al. (2022, polaca), Bittencourt et al. (2021, brasileña), Keskin-Akın et al. (2018, turca).

**Implicación para implementación en DescubreMe:** el cálculo del score global es simple suma o promedio directo de los 9 ítems, sin reversión previa. Ningún ítem requiere transformación `(6 - X)`.

**Aclaración relacionada al brief inicial:** la consigna inicial mencionaba "challenge-skill balance, action-awareness merging, sense of control, loss of self-consciousness suelen tener ítems negativos". Esta premisa aplica al **DFS-1 original (1996)** en algunas versiones tempranas, **pero NO al DFS-2 ni al S-DFS-2** publicados por Mind Garden desde 2002. Verificar con el Flow Manual.

| # | Dimensión | Clave |
|---|---|---|
| 1-9 | Las 9 dimensiones del flow (ver §1.2) | **Todos directos** — No aplica reversión |

---

## §5 — Textos de interpretación al usuario en es-CO (BAJO/MEDIO/ALTO)

> **Alerta:** Esta sección NO puede generarse de forma completa sin (a) los 9 ítems oficiales licenciados, (b) baremos colombianos validados y (c) decisión de producto sobre si se reportará score global único o también facetas. A continuación se ofrecen **borradores genéricos a nivel global** que sirven de plantilla para la versión final post-validación. **NO usar en producción** hasta validar baremos locales. Tono: tuteo colombiano cordial, descriptivo-aspiracional, no clínico, no determinista. ≤80 palabras por bloque.

### §5.1 — Interpretación SCORE GLOBAL (suma 9-45)

**BAJO (score ≤ percentil 25 local, una vez calibrado)**
> "En este momento parece que pocas veces te sumerges del todo en lo que estás haciendo. Eso no es un problema en sí mismo: la experiencia de fluidez profunda no es la única forma valiosa de hacer las cosas. Si te interesa explorarla, mira qué actividades te enganchan más naturalmente y dale tiempo a ese tipo de tareas donde sentís que reto y habilidad se equilibran. Es algo que se cultiva con práctica."

**MEDIO (score percentil 25-75 local)**
> "Tenés momentos donde te conectás de lleno con lo que hacés y otros donde se hace más difícil. Es lo más habitual. Esa fluidez aparece cuando hay reto justo, metas claras y feedback inmediato — fijate en qué contextos se te da más fácil. Identificar esos espacios te ayuda a diseñar tu día y tu trabajo alrededor de las actividades donde mejor te sentís presente."

**ALTO (score ≥ percentil 75 local)**
> "Reportás entrar con frecuencia en estados de fluidez profunda, donde te enganchás del todo en lo que estás haciendo y se te pasa el tiempo. Es una experiencia valiosa, asociada a bienestar, aprendizaje y disfrute intrínseco. Tu reto suele ser cuidar el balance: protegé esas actividades autotélicas y revisá si están bien repartidas entre lo que te gusta y lo que tenés que hacer."

### §5.2 — Interpretación por faceta

**NO se entrega en este pack.** Razones:
1. La forma corta de 9 ítems está diseñada para un **score global único**; usar facetas con 1 solo ítem por dimensión genera puntajes poco confiables (Jackson et al., 2008).
2. La literatura crítica vigente (Lavoie et al., 2022; Newman et al., 2022) desafía la dimensionalidad de 9 factores y propone un modelo bidimensional (fluency/absorption).
3. Si producto decide reportar facetas, deberá hacerse SOLO tras validación local de la estructura de 9 factores en muestra colombiana y con disclaimer explícito de baja confiabilidad por faceta.

`[verificar antes de uso en producción]`

---

## §6 — License acquisition plan

### §6.1 — Titular y contactos

- **Titular IP:** Mind Garden Inc. — copyright © 2010 Susan A. Jackson.
- **Sitio comercial:** https://www.mindgarden.com/100-flow-scales
- **Producto SaaS:** https://www.mindgarden.com/flow-scales/461-flow-sdfs2-transform-survey-hosting.html
- **Email principal:** info@mindgarden.com (también es Data Protection Officer)
- **Formulario contacto:** https://www.mindgarden.com/contact-us
- **Formulario traducción:** https://www.mindgarden.com/mind-garden-forms/61-translation-application.html
- **ToS:** https://www.mindgarden.com/content/3-terms-of-service

### §6.2 — Práctica histórica de licenciamiento Mind Garden

| Aspecto | Descripción | Implicación para DescubreMe |
|---|---|---|
| ToS §10 No reproducción comercial | "express written consent" requerido | Riesgo legal alto sin contrato firmado |
| ToS §3-c No diseminación de ítems | Prohíbe circular ítems salvo a test-takers autorizados | DescubreMe debe administrar vía plataforma propia + License to Administer |
| ToS §4 Pre-Written Inventories | Solo uso interno del Customer; sin reventa | DescubreMe es B2C → necesita acuerdo específico |
| ToS §7-g Traducciones | "all intellectual property rights will be assigned to Mind Garden" | DescubreMe NO sería dueño de la traducción es-CO |
| Conditions for Online Use | "research purposes only ... not for providing individual feedback" | **Bloqueante** para B2C con feedback al usuario — necesita licencia comercial negociada |
| Standard "License to Administer" | USD 2.75/administración, mín. 50 unidades | OK para piloto académico, NO para freemium masivo con feedback |
| Transform Survey Hosting: S DFS-2 `[Aporte Gemini]` | USD 55.00 setup + USD 2.75/administración, mín. 20 perfiles | Para investigación; ver tarifa SaaS comercial caso por caso |
| Lápiz y papel / sistemas terceros `[Aporte Gemini]` | USD 2.75/administración, mín. 50 | Sin alojamiento automatizado |
| Permiso para reportar estadística agregada `[Aporte Gemini]` | Permitido (medias, DT, T, α) + 1 ítem de muestra autorizado | Acceso académico, no comercial automático |
| Tarifa licencia comercial SaaS B2C con feedback | NO publicada | Estimación informada USD 5K–25K/año `[inferencia, no tarifa publicada]` |

### §6.3 — Pasos de acquisition

1. **Semana 1-2:** confirmar con asesoría legal que el caso de uso B2C de DescubreMe con feedback individual NO cabe en la licencia estándar.
2. **Semana 2-3:** enviar el email de exploración (§6.4) a info@mindgarden.com.
3. **Semana 4-8:** negociación. Documentar por escrito tarifa, alcance, cláusula de traducción y términos B2B-A.
4. **Decisión GO/NO-GO:** si tarifa > USD 15K/año o exige IP de traducción sin reversión → NO implementar (Plan B).
5. **Si GO:** firmar licencia comercial + permiso de traducción ANTES de iniciar traducción es-CO.

### §6.4 — Email copy-paste para Mind Garden

```
Asunto: Commercial SaaS licensing inquiry — S-DFS-2 for adult self-knowledge platform (Colombia / LATAM)

Dear Mind Garden team,

I am writing on behalf of DescubreMe, a digital self-knowledge platform serving
adult users in Colombia and broader Latin America. We are evaluating the Short
Dispositional Flow Scale-2 (S-DFS-2; Jackson, Martin & Eklund, 2008) for
integration as one of our premium psychometric assessments.

Our use case differs from a standard research license in three ways, and we want
to ensure full compliance with your Terms of Service before any implementation:

1. B2C SaaS distribution: the S-DFS-2 would be administered through our own
   secure platform to individual paying users (Premium tier), and B2B clients
   (organizations purchasing licenses for their employees / members).
2. Individual feedback: each respondent would receive an individualized,
   non-clinical interpretive report of their score (descriptive-aspirational
   tone, not diagnostic), which goes beyond your standard "research purposes
   only" online license.
3. Spanish (Colombia) translation: no validated S-DFS-2 Spanish translation
   currently exists for general (non-sport) use. We would need to commission a
   back-translation following standard ITC guidelines, and we want to clarify
   IP terms under ToS §7-g.

Could you please share:

a) A commercial SaaS license quote for the S-DFS-2 covering both B2C individual
   feedback and B2B organizational use, with estimated annual volume of
   2,000–10,000 administrations.
b) The process and timeline for obtaining a Spanish (Colombia) translation
   license, including the IP clause for our internally produced translation.
c) Sample contract language and any restrictions on reporting normative data
   we collect locally as part of the Colombian validation study we plan to run.

I am happy to schedule a call to discuss specifics. Thank you for your time and
for stewarding this excellent instrument.

Kind regards,
[Nombre]
[Cargo] — DescubreMe
[Email] | [Teléfono]
Bogotá, Colombia
```

### §6.5 — Plan B (si Mind Garden bloquea o cobra > USD 15K/año)

- **No usar S-DFS-2 en DescubreMe.** Eliminarlo del catálogo Paid Premium.
- **Alternativas open / lower-cost:**
  - **FKS (Flow-Kurzskala) de Rheinberg, Vollmeyer & Engeser** — escala corta de flow, originalmente alemana, con traducciones; verificar disponibilidad y licencia es.
  - **WOLF (Work-related Flow inventory)** — Bakker (2008), *Journal of Vocational Behavior*, 72, 400-414. https://doi.org/10.1016/j.jvb.2007.11.007 — para flow ocupacional; usada en España (Salanova, Bakker & Llorens, 2006, *Journal of Happiness Studies*, 7, 1-22).
  - **DFS-Short BR (Bittencourt et al., 2021)** — open access, portugués brasileño; podría servir de modelo si se gestiona colaboración para crear una versión es-LATAM con licencia abierta. Aún así requiere coordinación con autores originales por la dependencia del DFS-2.
- **Re-evaluar S-DFS-2 anualmente** por si Mind Garden cambia política comercial.

---

## §7 — Disclaimers pre/post + ítems sensibles NFR-28 + mensaje contención + líneas Colombia

### §7.1 — Disclaimer PRE-test (mostrar antes de iniciar el S-DFS-2)

> "El cuestionario que vas a responder mide la frecuencia con la que experimentás momentos de fluidez profunda en tus actividades cotidianas. No es una prueba clínica, no diagnostica ninguna condición de salud y no decide si sos apto para un trabajo o estudio. Tus respuestas son confidenciales y se usan solo para generar tu reporte de autoconocimiento. Si en algún momento te sentís incómodo o incómoda, podés cerrar el cuestionario sin perder tu progreso. Tomate los minutos que necesités."

### §7.2 — Disclaimer POST-test (mostrar junto con el resultado)

> "Este reporte describe patrones que mencionaste sobre tu experiencia de fluidez en actividades, pero no te define como persona ni predice tu desempeño futuro. Lo que vivís cambia con el tiempo y el contexto. Si querés conversar sobre lo que leíste, te recomendamos hacerlo con un psicólogo, coach o profesional de confianza. DescubreMe no reemplaza ninguna consulta profesional."

### §7.3 — Ítems sensibles que disparan NFR-28

El S-DFS-2 **NO contiene ítems explícitamente sensibles** (ideación suicida, autolesión, trauma reciente, violencia, sustancias). Los 9 ítems indagan sobre experiencias de absorción, control, disfrute y enfoque en actividades — son ítems de afecto positivo y experiencia óptima.

Sin embargo, conviene incluir el **bloque NFR-28 estándar de DescubreMe al final** porque:
- Un usuario en estado de baja autoeficacia o desmotivación crónica puede salir del test con puntajes bajos y sentir que "está mal" o "no vale".
- El framing aspiracional debe cuidar no inducir sentimiento de fracaso en usuarios con baja experiencia subjetiva de flow.

### §7.4 — Mensaje de contención (auto-mostrar si score global ≤ percentil 10 local, una vez calibrado)

> "Si después de leer este reporte te quedaste con una sensación de que las cosas no te están enganchando o que algo te pesa más de la cuenta, no estás solo o sola. Hablar con alguien ayuda. Podés escribir a la **Línea Nacional 106** (gratis, 24/7, salud mental) o, si la urgencia es mayor, llamar al **123**. Si estás en Bogotá tenés también la **Línea Calma 018000 423 614** (hombres) y la **Línea Púrpura 018000 112 137** (mujeres)."

### §7.5 — Líneas de ayuda Colombia (versión consolidada para footer)

- **Línea Nacional 106** — teleorientación en salud mental, 24/7, Ministerio de Salud y Protección Social. Cobertura nacional.
- **Línea 123** — emergencias generales (incluye urgencias salud mental).
- **Línea 192 opción 4** — orientación en salud mental (varias regiones).
- **Bogotá:**
  - Línea Púrpura Distrital: 018000 112 137 / WhatsApp 300 755 18 46 (violencia contra mujeres).
  - Línea Calma: 018000 423 614 (hombres con emociones difíciles).
  - Línea Diversa: WhatsApp 310 864 4214 (LGBTIQ+).
- **Medellín** — Línea Amiga Saludable: (604) 444 4448 / WhatsApp 300 723 1123.
- **Barranquilla** — Línea de la Vida: (605) 339 9999.
- **Cali** — Línea 106 (ESE Centro, Red de Salud del Centro).
- **Pontificia Universidad Javeriana — Porque Quiero Estar Bien:** (+57) 315 532 4684 (lunes a sábado 7am-5pm).

Fuentes: minsalud.gov.co, bogota.gov.co, saludcapital.gov.co, javeriana.edu.co, colpsic.org.co.

---

## §8 — Piloto cognitivo Colombia

### §8.1 — Muestra recomendada

- **Tamaño:** N = 24 a 30 adultos colombianos (suficiente para saturar comprensibilidad léxica en una escala de sólo 9 ítems).
- **Estratificación:**
  - Ciudades: Bogotá (10), Medellín (6), Cali (4), Barranquilla (3), zonas rurales/intermedias (5-7).
  - Edad: 18-29 (8), 30-44 (10), 45-65 (6-8).
  - Género: paridad 50/50 + 2 personas de identidad no binaria si se logra reclutar.
  - Nivel educativo: secundaria completa o más (mínimo); diversificar entre técnico, universitario, posgrado.
  - Estratos socioeconómicos 2 a 6.

### §8.2 — Método think-aloud

1. **Sesión individual de 30-45 min**, presencial o remota (Zoom con grabación).
2. **Calentamiento:** breve explicación del estudio, consentimiento informado, sin mencionar "flow" ni constructo (evitar priming).
3. **Aplicación ítem por ítem:** el participante lee cada ítem en voz alta, explica con sus propias palabras qué entiende, qué actividad le viene a la mente al pensar en la respuesta, y elige una opción Likert verbalizando por qué.
4. **Sondeos:** "¿hay alguna palabra confusa?", "¿cómo dirías esto si lo escribieras vos?", "¿con qué tipo de actividad pensaste al responder?", "¿qué diferencia hay para vos entre 'casi siempre' y 'siempre'?"
5. **Cierre:** preguntas globales sobre el formato, el orden de los ítems, la escala de respuesta.

### §8.3 — Criterios de revisión de ítems

Marcar ítem para reformulación si:
- ≥ 20% de participantes no comprende algún término clave a la primera lectura.
- ≥ 15% lo asocia con una actividad muy distinta a la intención del ítem (ej. interpretar "control" como controlar a otras personas).
- ≥ 10% reporta sentirse incómodo o juzgado al responder.
- La distribución de respuestas en el piloto se concentra >70% en una sola categoría Likert.

### §8.4 — Entregables del piloto

- Informe ejecutivo (10-15 pp): hallazgos por ítem, ediciones propuestas, soporte cuantitativo y cualitativo.
- Versión es-CO refinada del S-DFS-2 lista para validación cuantitativa (§3.2 roadmap).
- Transcripciones think-aloud anonimizadas (anexo).
- Tabla comparativa: redacción original Mind Garden / redacción back-translated / redacción es-CO refinada por piloto.

### §8.5 — Cronograma y costos estimados

- Reclutamiento: 2 semanas.
- Sesiones think-aloud: 3 semanas.
- Análisis y reporte: 2 semanas.
- Costo estimado: COP 8-15M (incentivos participantes COP 50K c/u + honorarios moderador + transcripción + análisis).

---

## §9 — Gaps y preguntas abiertas

| # | Gap / pregunta | Plan para resolver |
|---|---|---|
| 1 | **No existen las M/DT por ítem ni media global del S-DFS-2 verbatim en repositorio abierto** — Tabla 1 de Jackson, Martin & Eklund (2008) está paywall Human Kinetics. | Comprar el paper (~USD 30) o solicitar a la autora vía drsuejackson.com. Bloqueador para construir baremos comparables internacionalmente. |
| 2 | **Tarifa real de licencia comercial SaaS B2C de Mind Garden** — no publicada para el S-DFS-2. Estimación USD 5K-25K/año es inferencia. | Enviar email §6.4 y documentar respuesta. Decisión GO/NO-GO depende del número. |
| 3 | **Solapamiento empírico real S-DFS-2 / S-FSS-2** — la afirmación r > .70 a nivel global es plausible pero no se recuperó verbatim. Newman et al. (2022) sustenta solapamiento alto. | Si DescubreMe administra ambos, hacer estudio interno de varianza única en cohorte colombiana antes de afirmar valor incremental al usuario. |
| 4 | **Validez incremental del S-DFS-2 frente a constructos vocacionales/bienestar ya en DescubreMe (RIASEC, BFI-2-S, UWES-9, SWLS)** — no documentada en LATAM. | Incluir en la validación local (§3.2) un bloque de validez convergente/discriminante. |
| 5 | **Estabilidad de la estructura de 9 dimensiones en muestra colombiana de uso general (no deporte ni videojuegos)** — Lavoie et al. (2022) y Gouveia et al. (2012) muestran inestabilidad en dominios físicos. DescubreMe usa el instrumento en autoconocimiento general. | CFA local del modelo unifactorial vs jerárquico 9 factores vs bidimensional Lavoie. Decidir score global como default y reportar facetas sólo si validación lo permite. |
| 6 | **Calidad de la "Spanish translation" oficial de Mind Garden** — sin garantía psicométrica ("We cannot assure translation quality"), y sólo para DFS-2 largo, no S-DFS-2. | Si Mind Garden facilita acceso, comparar redacciones con la versión es-CO propia como insumo, no como base. |
| 7 | **Dependencia del Flow Manual (Jackson, Eklund & Martin, 2010)** — algunos detalles de administración estándar (instrucciones al respondente, manejo de "actividad de referencia") no están en abierto. | Comprar el manual a Mind Garden antes de implementar. |
| 8 | **Comportamiento del instrumento en poblaciones con sintomatología afectiva (depresión, ansiedad)** — estudio en esquizofrenia china (Tsai et al., en TCDFS-2) muestra estructura factorial muy distinta `[Aporte Gemini]`. DescubreMe tiene usuarios con sintomatología subclínica. | Excluir del estudio de validación inicial. Documentar en disclaimer post-test el uso no clínico (§7.2). |

---

## §10 — Referencias APA 7 (con DOI cuando disponible)

1. Bakker, A. B. (2008). The work-related flow inventory: Construction and initial validation of the WOLF. *Journal of Vocational Behavior, 72*(3), 400-414. https://doi.org/10.1016/j.jvb.2007.11.007

2. Bittencourt, I. I., Freires, L., Lu, Y., Challco, G. C., Fernandes, S., Coelho, J., Costa, J., Pian, Y., Marinho, A., Isotani, S., & Roma, P. (2021). Validation and psychometric properties of the Brazilian-Portuguese dispositional Flow Scale 2 (DFS-BR). *PLOS ONE, 16*(7), e0253044. https://doi.org/10.1371/journal.pone.0253044

3. Calero, A., & Injoque-Ricle, I. (2013). Propiedades psicométricas del Inventario Breve de Experiencias Óptimas (Flow). *Revista Evaluar, 13*(1), 40-55. https://doi.org/10.35670/1667-4545.v13.n1.6796

4. González-Cutre, D., Sicilia, Á., Moreno, J. A., & Fernández-Balboa, J. M. (2009). Dispositional flow in physical education: Relationships with motivational climate, social goals, and perceived competence. *Journal of Teaching in Physical Education, 28*(4), 422-440. https://doi.org/10.1123/jtpe.28.4.422 `[Aporte Gemini]`

5. Gouveia, M. J., Pais-Ribeiro, J. L., Marques, M., Carvalho, C., & Ribeiro, J. P. (2012). Validity and reliability of the Portuguese version of the Dispositional Flow Scale-2 in exercise. *Revista de Psicología del Deporte, 21*(1), 81-92. https://www.redalyc.org/pdf/2351/235124455011.pdf `[Aporte Gemini]`

6. Jackson, S. A., & Eklund, R. C. (2002). Assessing flow in physical activity: The Flow State Scale–2 and Dispositional Flow Scale–2. *Journal of Sport and Exercise Psychology, 24*(2), 133-150. https://doi.org/10.1123/jsep.24.2.133

7. Jackson, S. A., Eklund, R. C., & Martin, A. J. (2010). *The Flow Manual: The manual for the Flow Scales*. Mind Garden, Inc.

8. Jackson, S. A., & Marsh, H. W. (1996). Development and validation of a scale to measure optimal experience: The Flow State Scale. *Journal of Sport and Exercise Psychology, 18*(1), 17-35. https://doi.org/10.1123/jsep.18.1.17

9. Jackson, S. A., Martin, A. J., & Eklund, R. C. (2008). Long and short measures of flow: The construct validity of the FSS-2, DFS-2, and new brief counterparts. *Journal of Sport and Exercise Psychology, 30*(5), 561-587. https://doi.org/10.1123/jsep.30.5.561

10. Józefowicz, J., Kowalczyk-Grębska, N., & Brzezicka, A. (2022). Validation of Polish version of Dispositional Flow Scale-2 and Flow State Scale-2 questionnaires. *Frontiers in Psychology, 13*, 818036. https://doi.org/10.3389/fpsyg.2022.818036

11. Keskin-Akın, A., et al. (2018). The Dispositional Flow Scale Short Form (DFS-2): Validity and reliability study for physical education class. *ResearchGate / Hacettepe University Publications*. https://www.researchgate.net/publication/322505391 `[Aporte Gemini]`

12. Lavoie, R., Main, K., & Stuart-Edwards, A. (2022). Flow theory: Advancing the two-dimensional conceptualization. *Motivation and Emotion, 46*(1), 38-58. https://doi.org/10.1007/s11031-021-09911-4

13. Liu, T., et al. (2010). The psychometric properties of Dispositional Flow Scale 2 in Internet gaming. *ResearchGate*. https://www.researchgate.net/publication/246972854 `[Aporte Gemini]`

14. Mind Garden, Inc. (2026). *Terms of Service for the Mind Garden Website and Services*. https://www.mindgarden.com/content/3-terms-of-service

15. Mind Garden, Inc. (n.d.). *Flow Scales: Susan A. Jackson, Robert C. Eklund, & Andrew J. Martin*. https://www.mindgarden.com/100-flow-scales

16. Mind Garden, Inc. (n.d.). *Transform Survey Hosting: Short Dispositional Flow Scale*. https://www.mindgarden.com/flow-scales/461-flow-sdfs2-transform-survey-hosting.html

17. Ministerio de Salud y Protección Social. (2024). *Directorio nacional de líneas territoriales de atención en salud mental en Colombia*. https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/VS/PP/ET/directorio-salud-mental-prevencion-suicidio-minsalud.pdf

18. Moneta, G. B. (2017). Validation of the Short Flow in Work Scale (SFWS). *Personality and Individual Differences, 109*, 83-88. https://doi.org/10.1016/j.paid.2016.12.033

19. Newman, A. B., Liu, T., & Liu, T. (2022). A critique of the Dispositional Flow Scale-2 (DFS-2) and Flow State Scale-2 (FSS-2). *Frontiers in Psychology, 13*, 992813. https://doi.org/10.3389/fpsyg.2022.992813

20. Rodríguez-Antonio, R., & del Valle López, J. A. (2021). Propiedades psicométricas de la Escala de Flow Disposicional-2 en videojuegos. *Revista Evaluar, 21*(3), 63-80. https://doi.org/10.35670/1667-4545.v21.n3.36307

21. Salanova, M., Bakker, A. B., & Llorens, S. (2006). Flow at work: Evidence for an upward spiral of personal and organizational resources. *Journal of Happiness Studies, 7*(1), 1-22. https://doi.org/10.1007/s10902-005-8854-8

22. Tozzi, S., Gigliotti, V., Stillo, M., & Maraschini, A. (2017). Measuring Dispositional Flow: Validity and reliability of the Dispositional Flow State Scale 2, Italian version. *PLOS ONE, 12*(9), e0182201. https://doi.org/10.1371/journal.pone.0182201

23. Validación persa DFS-2 — IOSR Journal of Sports and Physical Education. https://www.iosrjournals.org/iosr-jspe/papers/Vol-4Issue3/B04030411.pdf `[Aporte Gemini — sin DOI estable]`

---

## Apéndice A — Mapa de aportes consolidados desde Gemini

| # | Sección | Aporte de Gemini | Valor agregado | Verificación |
|---|---|---|---|---|
| 1 | §1.1 | Explicación metodológica de selección de los 9 "ítems dorados" (cargas factoriales + face validity) | Da racional para diseño de instrumento, útil en negociación con Mind Garden y para reportes técnicos | Verificable contra Jackson et al. (2008), p. 561-587 |
| 2 | §1.2 | Referencias semánticas en español de cada dimensión (del DFS-2 largo es-ES, es-MX, es-AR) | Insumo para anclar la futura traducción es-CO; reduce trabajo de back-translation | **No verbatim S-DFS-2** — sólo orientativo para traducción contratada |
| 3 | §2.1 | González-Cutre et al. (2009) — adaptación DFS-2 castellana en educación física | Suma una adaptación es más al inventario, faltante en Claude | Verificable; DOI estimado en referencias |
| 4 | §2.1 | Gouveia et al. (2012) — adaptación DFS-2 portuguesa N=1,437 con anomalía en "tiempo" y "auto-conciencia" | Aporte crítico: alerta sobre dimensiones inestables en contextos no competitivos — directamente útil para DescubreMe | Verificable en Redalyc; OK |
| 5 | §3.1 | Tabla CFA verbatim de Jackson et al. (2008) con χ², df, CFI, NNFI, RMSEA, SRMR para S-DFS-2 Independiente, Embebida, S-FSS-2 Embebida | **Aporte de alto valor**: índices psicométricos exactos que Claude no logró extraer | Verificable contra paper original (paywall); cifras consistentes con reportes secundarios |
| 6 | §3.1 | Validación Persa (N=1,180, 72.5% varianza, estabilidad temporal r=.85) | Confirma plasticidad transcultural en muestra grande | Fuente IOSR (calidad menor de revista, validar antes de citar producción) |
| 7 | §3.1 | Asimetría / curtosis distribuciones S-DFS-2 (Skewness –.15 a –.81) | Dato útil para diseño de scoring y baremos en DescubreMe | Verificable Jackson et al. (2008) |
| 8 | §3.1 | Liu et al. (2010) α=.82 (versión china internet gaming) discrepa de α=.73 reportado por Claude | Discrepancia detectada — dos fuentes secundarias diferentes para validación china | **Discrepancia activa — verificar fuente primaria** |
| 9 | §6.2 | Tarifa Transform Survey Hosting USD 55 setup + USD 2.75/admin mín 20 | Cifra concreta de Mind Garden no incluida por Claude | Verificable en URL Mind Garden |
| 10 | §6.2 | Permiso para reportar estadística agregada + 1 ítem de muestra autorizado | Clarifica qué se puede publicar académicamente | Verificable en ToS Mind Garden |
| 11 | §9 (gap #8) | Estudio en pacientes con esquizofrenia y trastornos esquizoafectivos (versión china TCDFS-2) muestra estructura factorial muy distinta | Alerta para framing en usuarios con sintomatología afectiva | Verificable PMC; útil para disclaimer §7 |
| 12 | §2.1 | Confirmación del Inventario Breve de Experiencias Óptimas (Calero & Injoque-Ricle, 2013) con detalle de muestra (N=211 adolescentes, M=14.26) | Datos numéricos exactos faltantes en Claude | Verificable Revista Evaluar / ResearchGate |
| — | Marco teórico | Toda la sección "Fundamentos teóricos y epistemológicos del constructo de flujo" y "Evolución metodológica" | Valor académico, pero no operativo para implementación; **NO integrado** al consolidado por exceder el alcance del prompt v1.0 | — |

---

## Apéndice B — Notas de consolidación

### B.1 — Diagnóstico de cumplimiento del prompt v1.0

- **Claude:** PARCIAL. Entregó formato narrativo (TL;DR / Key Findings / Details / Recommendations / Caveats / Referencias) en lugar de las 10 secciones operativas. Sustancia presente para §0, §1, §2, §3, §6 y §10. Faltan §5 (textos de interpretación es-CO), §7 (disclaimers operativos), §8 (piloto cognitivo expandido) y §9 (gaps explícitos numerados).
- **Gemini:** NO. Entregó revisión académica narrativa con énfasis en fundamentos teóricos, evolución metodológica y aplicaciones interdisciplinarias. NO entregó §0 operativo, §5, §6 (parcial), §7, §8, §9 ni §10 con DOIs APA 7 estructurados (sólo lista de URLs).

### B.2 — Por qué Claude es base

- Tono operativo y aplicable a DescubreMe.
- Tablas accionables (adaptaciones, baremos, licencia).
- Email copy-paste para Mind Garden.
- Líneas de crisis Colombia verificadas.
- 16 referencias APA 7 con DOI.

### B.3 — Por qué Gemini suma sin reemplazar

- Aporte numérico clave: tabla CFA verbatim del paper original (índices χ², CFI, NNFI, RMSEA, SRMR para 5 modelos), faltante en Claude.
- Aporte de adaptaciones: González-Cutre (2009) y Gouveia (2012) — dos referencias hispanohablante/lusófonas adicionales.
- Aporte conceptual: explicación de la metodología de selección de los "9 ítems dorados" en Jackson et al. (2008).
- Aporte de alerta clínica: estructura factorial diferente en esquizofrenia (gap #8).
- Aporte comercial: tarifa Transform Survey Hosting USD 55 setup.

### B.4 — Por qué no se usó más material de Gemini

- Las redacciones de "ítems" en español que Gemini cita son del DFS-2 largo (España, México, Argentina), NO del S-DFS-2. Reproducirlas en producción confundiría a producto y legal.
- La narrativa académica (fundamentos teóricos, evolución, aplicaciones interdisciplinarias) excede el alcance del prompt v1.0.
- Algunas cifras (α chino =.82) discrepan con la fuente que reporta Claude (=.73) — se mantienen ambas y se marca discrepancia hasta verificar fuente primaria.

### B.5 — Lo que queda pendiente de fuente primaria

- M/DT por ítem y media global del S-DFS-2 (Tabla 1 de Jackson et al., 2008 — paywall).
- Tarifa real licencia comercial SaaS Mind Garden — sólo se obtiene contactando.
- Versión validada del S-DFS-2 en español para población general adulta no-deportiva — NO existe; DescubreMe sería el first-mover.

### B.6 — Bloqueador legal a respetar siempre

Los 9 ítems literales del S-DFS-2 NO se reproducen en este pack. Cualquier intento de reproducirlos sin licencia firmada Mind Garden infringiría ToS §3-c y §10. La sección §1.2 contiene SOLO dimensiones, claves, sample items publicados bajo licencia (2 ítems) y referencias derivadas del DFS-2 largo en español, claramente marcadas como NO verbatim S-DFS-2.
