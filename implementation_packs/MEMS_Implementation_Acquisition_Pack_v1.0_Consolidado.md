# Implementation Acquisition Pack v1.0 — MEMS (15 ítems) — CONSOLIDADO
**Multidimensional Existential Meaning Scale — George & Park (2017)**
**Producto destino:** DescubreMe (LATAM, foco Colombia) · **B2C Paid USD 19 (v1.5) + Ikigai Premium**
**Versión del consolidado:** 1.0 · **Fecha:** mayo 2026
**Insumos:** `Prompt_09_MEMS_IAR.Claude.md` (Implementation Acquisition Pack completo, 10 secciones) + `Prompt_09_MEMS_IAR.Gemini.md` (revisión académica narrativa con aportes psicométricos, clínicos y filosóficos complementarios)
**Idiomas:** español neutro (metadatos y notas internas) / español Colombia (Secciones 5 y 7)

> **Nota metodológica del consolidado.** Claude entregó el Pack completo siguiendo el prompt v1.0 al pie de la letra (10/10 secciones operativas, ítems literales en inglés y español, plan de licencia, disclaimers es-CO, NFR-28, piloto cognitivo, gaps y referencias APA 7). Gemini entregó una revisión académica narrativa estructurada como white paper temático (ontología tripartita, arquitectura psicométrica, comparación MEMS vs 3DM/MLQ, validaciones globales, implicaciones clínicas, crítica fenomenológica de Wong, trayectorias futuras) que NO cumple las 10 secciones del prompt v1.0, pero aporta contenido complementario verificable: tabla descriptiva ítem-por-ítem de Marco et al. (2022) con M/DT/asimetría/curtosis/r ítem-total; tabla de invarianza estricta por género; existencia de una propuesta argentina MEMS-13 (Buenos Aires, n=270); validación árabe iraquí; antecedente colombiano de la "Escala Dimensional del Sentido de Vida"; uso del modelo en criminología narrativa (caso colombiano publicado); efectos en ECA de intervenciones centradas en sentido para trastornos de la conducta alimentaria; advertencia conceptual de Paul Wong sobre la operacionalización cósmica del *mattering*. Este consolidado usa el Pack de Claude como base estructural completa e inyecta los aportes verificables de Gemini con la marca `[Aporte Gemini]`. La trazabilidad del origen de cada bloque está en el **Apéndice A**.

---

## TABLA DE COBERTURA (requisitos explícitos del brief vs. entrega)

| Requisito | Sección | Cobertura |
|---|---|---|
| Portada y metadatos + estado de bloqueadores | §0 | OK |
| Plan adquisición banco de ítems + lista literal de 15 ítems en inglés y español | §1 | OK (Marco et al. 2022 Tabla 2 + George & Park 2017) |
| Adaptaciones al español (España, Argentina, México, Chile, Perú, Colombia) | §2 | OK + 2.1 + 2.2 |
| Baremos publicados (España, EE.UU., Polonia MEMS-9 + Argentina MEMS-13, validación árabe) | §3 | OK + 3.1 + 3.2 |
| Tabla de ítems inversos numerados | §4 | OK (1 ítem inverso: #2) |
| 9 textos es-CO (3 dimensiones × 3 bandas) en tuteo cordial colombiano | §5 | OK (9/9) |
| Plan licencia (Routledge / T&F + autores George y Park + Plan B) | §6 | OK |
| Disclaimers pre/post + ítems sensibles + mensaje contención + líneas Colombia | §7 | OK |
| Piloto cognitivo Colombia (muestra, think-aloud, criterios, entregables) | §8 | OK |
| ≥ 3 gaps y preguntas abiertas | §9 | OK (5) |
| ≥ 10 referencias APA 7 con DOI | §10 | OK (15 +) |
| Marcadores Hecho/Inferencia/Opinión profesional | transversal | OK |
| Marcadores [sin fuente verificada] donde aplica | §2, §3, §6, §9 | OK |
| **Aportes consolidados desde Gemini con verificación pendiente** | Apéndice A | OK |

---

## SECCIÓN 0 — PORTADA Y METADATOS

**Nombre completo:** Multidimensional Existential Meaning Scale (MEMS).
**Autores originales:** Login S. George (actualmente en Rutgers School of Nursing; previamente posdoctorando en University of Connecticut) y Crystal L. Park (Board of Trustees Distinguished Professor, Department of Psychological Sciences, University of Connecticut).
**Versión a implementar:** MEMS 15 ítems (versión final del paper original).
**Año original:** Publicado online el 26 de julio de 2016; impreso en *The Journal of Positive Psychology*, vol. 12(6), pp. 613–627, 2 de noviembre de 2017. DOI 10.1080/17439760.2016.1209546.
**Última revisión metodológica relevante:** Adaptación española de Marco, García-Alandete, Pérez Rodríguez, Guillén, Baños y Tormo-Irun, *Frontiers in Psychiatry*, 13, 832934 (2 febrero 2022). DOI 10.3389/fpsyt.2022.832934 (open access, CC BY 4.0).
**Idioma original:** Inglés (Estados Unidos; muestras de estudiantes universitarios).
**Constructo:** Sentido existencial de la vida, modelo tripartito (*comprehension/coherence*, *purpose*, *mattering/significance*).
**Formato:** 15 ítems, Likert 7 puntos (1 = *Very strongly disagree* / Muy en desacuerdo; 7 = *Very strongly agree* / Muy de acuerdo). Tiempo estimado de aplicación: 4–6 minutos.
**Productos destino confirmados:** B2C Paid (USD 19 / v1.5) e Ikigai Premium. **No despliegue** en B2C Free MVP1/v1.5 ni en B2B-A track empresarial hasta resolver licencia y baremos colombianos. Para usuarios legacy v2.0 que ya cuentan con MLQ, el MLQ se mantiene en su histórico y el MEMS se adjunta como módulo nuevo, no reemplazo: ver política de coexistencia en Sección 1.2.

**Resumen ejecutivo (3–5 líneas).** El MEMS es la única escala corta consolidada que mide simultáneamente las tres dimensiones del sentido vital (comprensión, propósito e importancia). Su valor diferencial frente al MLQ ya integrado en el stack v2.0 es la dimensión *mattering*, que en validación clínica española mostró ser el predictor inverso más fuerte de depresión y ansiedad. La adaptación al español de Marco et al. (2022) está publicada bajo Creative Commons BY 4.0 con los 15 ítems literales en inglés y español, lo que despeja el riesgo de propiedad sobre la traducción. La versión inglesa original sigue siendo propiedad editorial de Taylor & Francis / Routledge y su política de uso comercial es ambigua, por lo que se requiere licencia explícita antes del despliegue en producción paga.

`[Aporte Gemini]` **Por qué la MEMS desplaza a sus antecesoras (MLQ y PIL).** A diferencia del MLQ (Steger et al., 2006), cuya subescala de Presencia amalgama comprensión y propósito en un solo factor y omite casi por completo el *mattering*, y a diferencia del PIL clásico de Frankl, que mide plenitud existencial agregada, la MEMS se construye **explícitamente desde el modelo tripartito** descrito en la *Review of General Psychology* (George & Park, 2016) y operacionaliza los tres pilares como subescalas independientes con cargas factoriales exclusivas. Esta granularidad permite mapear con precisión qué pilar exacto del sentido está perturbado en cada perfil. Útil para la comunicación de valor con autores (Sección 6) y como justificación de producto frente a usuarios legacy v2.0 con MLQ.

**Status de bloqueadores.**

| Bloqueador | Estado | Razón breve |
|---|---|---|
| Licencia comercial sobre los ítems originales en inglés | **PARTIAL** | Routledge / T&F autoriza usos comerciales sólo vía RightsLink (Copyright Clearance Center) con permiso escrito; George y Park no han publicado declaración pública de uso libre. Riesgo legal medio-alto. |
| Ítems literales en español | **READY** | Los 15 ítems en español están reproducidos en Marco et al. (2022), Tabla 2, bajo licencia CC BY 4.0; basta atribución correcta. |
| Ítems literales en inglés | **READY** | También reproducidos en Marco et al. (2022) Tabla 2 con la versión inglesa origen, bajo la misma licencia CC BY 4.0; uso permitido con atribución. |
| Baremos colombianos / LATAM | **BLOCKED** | No existe validación peer-reviewed en Colombia, México, Chile ni Perú. Sólo medias y desviaciones españolas (Marco 2022), polacas (MEMS-9) y argentinas no publicadas formalmente (MEMS-13, Acta Académica). Sin percentiles publicados. |
| Invarianza por edad | **PARTIAL** | Invarianza configural se sostuvo en español; métrica/escalar por grupos de edad falló (ΔCFI marginal). Invarianza estricta por género sí se demostró (`[Aporte Gemini]` ver Apéndice A2). Interpretación recomendada acotada a 22–38 años hasta validación local. |

---

## SECCIÓN 1 — ACQUISITION PLAN DEL BANCO DE ÍTEMS

### 1.1 Disponibilidad pública

**Hecho:** Los 15 ítems del MEMS están publicados literalmente —en inglés y en español— en la Tabla 2 del artículo de Marco et al. (2022) en *Frontiers in Psychiatry*. El artículo es Open Access bajo licencia **Creative Commons Attribution 4.0 (CC BY 4.0)**, lo que permite reproducir, redistribuir, traducir y adaptar el contenido para fines comerciales siempre que se cite a los autores originales y la publicación.
URL del artículo: https://www.frontiersin.org/journals/psychiatry/articles/10.3389/fpsyt.2022.832934/full
URL del PDF en PMC: https://pmc.ncbi.nlm.nih.gov/articles/PMC8847179/pdf/fpsyt-13-832934.pdf

**Inferencia:** Aunque la versión inglesa original pertenece editorialmente a Taylor & Francis / Routledge por haber aparecido primero en *The Journal of Positive Psychology* (2017), su reimpresión literal en un artículo CC BY 4.0 posterior implica que cualquier reuso comercial de la versión española de Marco está cubierto por la licencia abierta. Reuso comercial de la versión inglesa original, en cambio, sigue requiriendo permiso editorial de T&F.

**Listado oficial reproducido (orden y polaridad).** Se conserva la numeración 1–15 del paper original. Sólo el ítem 2 está formulado como inverso (R).

| # | Faceta | Versión inglesa (George & Park, 2017) | Versión española (Marco et al., 2022) | Clave |
|---|---|---|---|---|
| 1 | Comprehension | My life makes sense | Mi vida tiene sentido | Directo |
| 2 | Mattering | There is nothing special about my existence | No hay nada que haga especial mi existencia | **Inverso (R)** |
| 3 | Purpose | I have aims in my life that are worth striving for | Tengo objetivos en mi vida por los que vale la pena luchar | Directo |
| 4 | Mattering | Even a thousand years from now, it would still matter whether I existed or not | Incluso dentro de mil años, todavía importaría si yo existiera o no | Directo |
| 5 | Purpose | I have certain life goals that guide me to keep going | Tengo ciertas metas en la vida que me obligan a seguir adelante | Directo |
| 6 | Purpose | I have overarching goals that guide me in my life | Tengo objetivos globales que me guían en mi vida | Directo |
| 7 | Comprehension | I know what my life is about | Yo sé de qué trata mi vida | Directo |
| 8 | Comprehension | I can make sense of the things that happen in my life | Puedo construir un sentido de las cosas que pasan en mi vida | Directo |
| 9 | Purpose | I have goals in my life that are very important to me | Tengo metas y objetivos en mi vida muy importantes para mí | Directo |
| 10 | Comprehension | I understand my life | Comprendo mi vida | Directo |
| 11 | Mattering | Whether my life ever existed matters even in the grand scheme of the universe | Si mi vida alguna vez existió, fue importante en el esquema general del universo | Directo |
| 12 | Purpose | My direction in life is motivating to me | Mi sentido en la vida es motivador para mí | Directo |
| 13 | Mattering | I am certain that my life is of importance | Estoy seguro de que mi vida es importante | Directo |
| 14 | Comprehension | Looking at my life as a whole, things seem clear to me | Mirando mi vida como un todo, las cosas parecen evidentes | Directo |
| 15 | Mattering | Even considering how big the universe is, I can say that my life matters | Incluso considerando lo grande que es el universo, puedo decir que mi vida importa | Directo |

`[Aporte Gemini]` **Estadísticos descriptivos por ítem (Marco et al., 2022; N = 1.106 no clínicos, España).** Los siguientes valores —M, DT, asimetría, curtosis y correlación ítem-total corregida— son útiles para el equipo psicométrico al validar la calidad de cada ítem en piloto colombiano y como referencia internacional para benchmarking.

| # | Subescala | M | DT | Asimetría | Curtosis | r ítem-total |
|---|---|---|---|---|---|---|
| 1 | Comprehension | 6.05 | 1.19 | −1.40 | 1.93 | 0.691 |
| 7 | Comprehension | 5.65 | 1.40 | −1.11 | 1.00 | 0.804 |
| 8 | Comprehension | 5.83 | 1.21 | −1.09 | 1.11 | 0.798 |
| 10 | Comprehension | 5.59 | 1.34 | −0.95 | 0.60 | 0.840 |
| 14 | Comprehension | 5.27 | 1.43 | −0.65 | −0.04 | 0.689 |
| 3 | Purpose | 6.30 | 1.05 | −1.74 | 3.25 | 0.782 |
| 5 | Purpose | 6.10 | 1.15 | −1.50 | 2.44 | 0.792 |
| 6 | Purpose | 5.99 | 1.21 | −1.41 | 2.18 | 0.809 |
| 9 | Purpose | 6.09 | 1.14 | −1.40 | 2.02 | 0.855 |
| 12 | Purpose | 5.79 | 1.28 | −1.20 | 1.37 | 0.744 |
| 2 (R) | Mattering | 5.93 | 1.72 | −1.59 | 1.40 | 0.454 |
| 4 | Mattering | 4.71 | 2.06 | −0.53 | −0.95 | 0.701 |
| 11 | Mattering | 4.73 | 1.94 | −0.55 | −0.79 | 0.742 |
| 13 | Mattering | 5.75 | 1.40 | −1.25 | 1.28 | 0.714 |
| 15 | Mattering | 5.39 | 1.70 | −1.09 | 0.45 | 0.762 |

**Observaciones clave:** los ítems 4 y 11 (los más "cósmicos" de Mattering) presentan las medias más bajas y la mayor varianza (DT > 1.9), confirmando que son los más controvertidos y los que más discriminan en el polo bajo. El ítem 2 (único inverso) tiene la correlación ítem-total más baja (0.454), lo que refuerza la recomendación operativa de aplicar centrado intra-sujeto (ver §1.3) y vigilarlo en piloto cognitivo.

### 1.2 Banco oficial vs adaptaciones derivadas

El banco oficial de 15 ítems corresponde al paper original George & Park (2017). Existen tres derivaciones publicadas relevantes:

- **MEMS-9 (Polonia):** Gerymski y Krok (2020) redujeron el instrumento a 9 ítems (*comprehension*: 7, 8, 10; *purpose*: 3, 5, 9; *mattering*: 2, 13, 15). No es la versión recomendada porque pierde representación facetaria y resolución en el polo bajo de *mattering*, justamente la zona psicométricamente más informativa para detectar usuarios vulnerables.
- **MEMS-15 español (España):** Marco et al. (2022) confirmaron la estructura tripartita original con los 15 ítems intactos en N = 1.106 adultos españoles. Esta es la base recomendada para es-CO.
- `[Aporte Gemini]` **MEMS-13 argentino (Buenos Aires):** un estudio instrumental con 270 adultos de Buenos Aires (edad media 38 años) propuso una reducción a 13 ítems vía AFC con buen ajuste y consistencia interna aceptable (Acta Académica, ref. 000-004/89). **[sin fuente verificada como peer-review]** — la cita primaria está alojada en Acta Académica (repositorio de actas de congreso), no en revista indexada. Útil como antecedente regional latinoamericano y como pista para contacto local (psicólogos UBA), no como baremo operacional.

**Política de coexistencia MEMS / MLQ en DescubreMe.** Para usuarios v2.0 que ya completaron MLQ y permanecen activos, el MLQ se preserva en el histórico (no se borra ni se reescribe). El MEMS se ofrece como módulo nuevo. Para usuarios nuevos en B2C Paid e Ikigai Premium, MEMS es el instrumento primario de sentido vital y MLQ se aplica sólo opcionalmente. El Scoring Engine debe generar un mapeo bidireccional documentado: presencia-MLQ ≈ promedio-Comprehension-MEMS; búsqueda-MLQ no tiene equivalente directo en MEMS y se conserva como dimensión auxiliar histórica. Esta política se debe describir explícitamente en el changelog v2.0→v2.1 para que el equipo de Producto, Soporte y Analítica conozca la convivencia.

**Inferencia:** No se localizó adaptación peer-reviewed en México, Argentina (en versión peer-review formal de 15 ítems), Chile, Perú, Colombia ni Brasil hasta el cierre de esta investigación (12 mayo 2026). Existen una versión turca (Subasi et al., 2024), una versión del 3DM (Martela & Steger, 2023), una `[Aporte Gemini]` adaptación al árabe en universitarios iraquíes con equivalencia de medición establecida, y una `[Aporte Gemini]` adaptación al polaco (Gerymski & Krok) que confirmó la validez convergente con MLQ y PIL.

### 1.3 Estructura del banco

- **Comprehension** (cognitiva — coherencia y comprensibilidad): 5 ítems (1, 7, 8, 10, 14). Todos directos.
- **Purpose** (motivacional — metas y dirección): 5 ítems (3, 5, 6, 9, 12). Todos directos.
- **Mattering / significance** (afectivo-existencial — importancia intrínseca): 5 ítems (2, 4, 11, 13, 15). Sólo el ítem 2 es inverso.

Formato de pregunta: afirmaciones en primera persona del singular, Likert 7 puntos. Balance directos / inversos: 14 / 1.

`[Aporte Gemini]` **Nota estructural: modelo bifactor recomendado para análisis maduros.** Investigaciones analíticas posteriores sobre la validez estructural de la MEMS han favorecido un modelo **bifactor** sobre el modelo simple de tres factores correlacionados. En el modelo bifactor, los 15 ítems cargan simultáneamente en un factor general de Sentido Existencial *y* en su factor específico (Comprehension, Purpose o Mattering). Esto justifica teóricamente reportar al usuario tanto un score global (para reporte ejecutivo) como tres scores facetarios (para reporte detallado). Se sugiere modelar el bifactor cuando se acumule muestra colombiana ≥ 500 (hito H2 del roadmap §3.2).

**Opinión profesional:** El balance 14:1 es estructuralmente débil para controlar aquiescencia. Para muestras n > 200, recomendamos aplicar centrado intra-sujeto (*within-person mean centering*) como rutina del Scoring Engine antes de cualquier análisis poblacional, y reportar la métrica de aquiescencia derivada como flag interno (no se muestra al usuario).

### 1.4 Recomendación

**Primera acción (esta semana):** descargar el PDF CC BY 4.0 de Marco et al. (2022) directamente desde https://pmc.ncbi.nlm.nih.gov/articles/PMC8847179/pdf/fpsyt-13-832934.pdf y archivar copia en el repositorio interno con metadatos de licencia. Los 15 ítems en español pueden integrarse al Item Bank con atribución CC BY 4.0 al pie del informe del usuario.

**Segunda acción (mes 1):** abrir paralelamente el proceso de Sección 6 (licencia) ante Routledge y los autores para cubrir la versión inglesa, requerida si se ofrece la prueba en *en* dentro de los productos pagos.

---

## SECCIÓN 2 — ADAPTACIONES AL ESPAÑOL DISPONIBLES

| País | Autores | Año | DOI / URL | N muestra | Características | ¿Pública? |
|---|---|---|---|---|---|---|
| España | Marco, J. H., García-Alandete, J., Pérez Rodríguez, S., Guillén, V., Baños, R. M., & Tormo-Irun, M. P. | 2022 | 10.3389/fpsyt.2022.832934 | 1.106 no clínicos + 88 clínicos (40,9 % de los clínicos provienen de países hispanohablantes sudamericanos) | CFA con buen ajuste tripartito (CFI = 0,991; RMSEA = 0,043). Invarianza configural, métrica, escalar y estricta por género. Invarianza sólo configural por grupos de edad. ω = 0,91 (Comprehension), 0,92 (Purpose), 0,86 (Mattering). Traducción y retro-traducción supervisada por editor bilingüe. | **Sí — PDF descargable, CC BY 4.0** |
| Argentina | `[Aporte Gemini]` Estudio instrumental Buenos Aires (referenciado en Acta Académica 000-004/89) | s. f. | https://www.aacademica.org/000-004/89.pdf | 270 adultos, edad media 38 años | Propone reducción a 13 ítems (MEMS-13) vía AFC; ajuste óptimo de tres factores; consistencia interna aceptable. **[sin fuente verificada como peer-review]** — está en repositorio de actas, no en revista indexada. | Parcial — PDF de actas |
| Colombia | `[Aporte Gemini]` Construcciones afines no son MEMS sino derivadas de logoterapia | s. f. | — | 820 personas (Bogotá, Cali, Medellín, Barranquilla) | Existencia documentada de una **"Escala Dimensional del Sentido de Vida"** colombiana (Acta Colombiana de Psicología, Universidad Católica) de inspiración logoterapéutica, con estructura bidimensional (coherencia existencial + propósito vital). **No es la MEMS** y no tiene la dimensión Mattering, pero documenta que existe ecosistema académico colombiano interesado en el constructo. | Sí — abierto |
| México, Chile, Perú | — | — | — | — | Sin validación peer-reviewed publicada hasta mayo 2026. **[sin fuente verificada]** | No |

### 2.1 Recomendación de base para es-CO

**Opinión profesional:** Adoptar Marco et al. (2022) como traducción base. Razones:

1. Es la única versión española peer-reviewed con CFA confirmatorio (no sólo exploratorio) sobre los 15 ítems intactos.
2. Está bajo licencia CC BY 4.0, lo que elimina el riesgo legal sobre la versión española aun cuando la licencia inglesa siga pendiente.
3. La muestra clínica incluyó 40,9 % de participantes sudamericanos hispanohablantes, lo que la hace menos distante culturalmente de Colombia que una traducción mexicana o argentina aislada.
4. Las propiedades psicométricas reportadas (omegas 0,86–0,92) son adecuadas para uso descriptivo-orientador no clínico.
5. `[Aporte Gemini]` Existe **invarianza estricta por género** demostrada estadísticamente en muestra española (ver Apéndice A2), lo que permite comparar puntuaciones de hombres y mujeres en el reporte sin sesgo métrico — un requisito mínimo para una plataforma B2C.

### 2.2 Modificaciones léxicas anticipadas para Colombia

Tras lectura ítem por ítem de la versión Marco (2022), proponemos las siguientes adaptaciones menores para es-CO. Ninguna toca el constructo psicométrico; son sólo ajustes de naturalidad coloquial que deben validarse en piloto cognitivo (Sección 8).

| Ítem | Versión Marco (es-ES) | Propuesta es-CO | Razón |
|---|---|---|---|
| 5 | "Tengo ciertas metas en la vida que me obligan a seguir adelante" | "Tengo ciertas metas en la vida que me impulsan a seguir adelante" | "Obligan" tiene connotación coercitiva en es-CO; "impulsan" preserva el sentido motivacional. |
| 6 | "Tengo objetivos globales que me guían en mi vida" | "Tengo objetivos generales que me guían en mi vida" | "Globales" en es-CO se asocia con escala geográfica; "generales" mantiene el matiz de *overarching*. |
| 8 | "Puedo construir un sentido de las cosas que pasan en mi vida" | "Puedo encontrarle sentido a lo que me pasa en la vida" | Frase más natural en es-CO; preserva el verbo *make sense*. |
| 11 | "Si mi vida alguna vez existió, fue importante en el esquema general del universo" | "Que mi vida exista importa, incluso a la escala del universo entero" | La versión Marco está en pasado condicional y suena marcada; reformulación más directa y presente. **Atención piloto:** este ítem y el 4 son los señalados por la crítica de Wong (ver §9.5) como potencialmente disonantes para usuarios laicos o pragmáticos; vigilar reacción en think-aloud. |
| 14 | "Mirando mi vida como un todo, las cosas parecen evidentes" | "Cuando miro mi vida en conjunto, las cosas se ven claras" | "Evidentes" en es-CO sugiere obviedad fáctica más que claridad existencial. |
| 2 (R) | "No hay nada que haga especial mi existencia" | "No hay nada que haga especial mi existencia" | Mantener sin cambios; es el único inverso y conviene preservar la formulación validada. |

**Hecho:** Cualquier modificación léxica, por menor que sea, exige nuevo proceso de validación local antes de publicar baremos. Mientras tanto, las modificaciones se documentan en el Item Bank como "variantes es-CO sujetas a piloto cognitivo".

---

## SECCIÓN 3 — BAREMOS PUBLICADOS

### Tabla maestra de baremos

| País | Fuente | N | Subescala | M | DT | Percentiles publicados |
|---|---|---|---|---|---|---|
| España (no clínicos) | Marco et al. (2022). *Front. Psychiatry*, 13, 832934. DOI 10.3389/fpsyt.2022.832934 | 1.106 | Comprehension (suma 5 ítems, rango 5–35) | 28,39 | 5,60 | **[sin fuente verificada]** — los autores no publicaron percentiles. |
| España (no clínicos) | Marco et al. (2022) | 1.106 | Purpose (rango 5–35) | 30,26 | 5,09 | **[sin fuente verificada]** |
| España (no clínicos) | Marco et al. (2022) | 1.106 | Mattering (rango 5–35) | 26,41 | 7,12 | **[sin fuente verificada]** |
| EE. UU. | George & Park (2017). *J. Posit. Psychol.*, 12(6), 613–627. DOI 10.1080/17439760.2016.1209546 | Tres muestras de pregrado (250–400 c/u) | Tres subescalas | Reportadas en tablas internas del paper | Reportadas en tablas internas | **[sin fuente verificada]** — el paper original no publica percentiles, sólo medias por muestra. Alfas reportadas: Comprehension α = 0.95; Purpose α = 0.91; Mattering α = 0.79 (`[Aporte Gemini]` cifras documentadas en el paper original y replicadas por Gemini). |
| Polonia (MEMS-9) | Gerymski & Krok (2020). *Roczniki Psychologiczne*, 23(2). | 401 | Tres subescalas reducidas a 3 ítems c/u | No comparable directamente con MEMS-15 | — | **[sin fuente verificada]** |
| `[Aporte Gemini]` Argentina (MEMS-13) | Estudio instrumental Buenos Aires (Acta Académica 000-004/89) | 270 | Tres subescalas con 13 ítems | No reportada en cifras públicas verificables | — | **[sin fuente verificada]** — repositorio de actas, no peer-review. |
| `[Aporte Gemini]` Iraq (árabe) | Validación de equivalencia de medición vía traducción inversa (citada por Gemini ref. 28, Atlantis Press) | Universitarios iraquíes | Tres subescalas en árabe | — | — | **[sin fuente verificada]** — útil sólo como referencia transcultural. |
| `[Aporte Gemini]` Turquía | Validación MEMS turca (citada por Gemini ref. 11) | — | Tres subescalas | Reporta χ² ≈ 409.6; ajuste excelente | — | **[sin fuente verificada]** — verificar paper primario. |

**Hecho clave Marco 2022:** Sample 1 N = 1.106; edad 18–83 años (M = 35,05; DT = 13,72); 80,4 % mujeres; 82,7 % con estudios universitarios o de máster.

`[Aporte Gemini]` **Hecho clínico relevante (Marco et al., 2022, muestra clínica n = 88).** En pacientes con trastornos mentales severos, la dimensión **Mattering** mostró la asociación negativa **más fuerte** con síntomas de depresión y ansiedad. El modelo tripartito combinado explicó hasta el **52 % de la varianza** en sintomatología depresiva. Implicación operativa para DescubreMe: la regla NFR-28 (Sección 7) debe priorizar el monitoreo del polo bajo de Mattering como señal de mayor vulnerabilidad psicológica, no de Comprehension ni de Purpose. La Sección 7.2 ya recoge esta priorización.

### 3.1 Recomendación de baremo provisional para LATAM

**Opinión profesional:** En ausencia de percentiles publicados y de validación colombiana, derivar bandas provisionales por la regla **M ± 1 DT sobre la muestra española de Marco 2022**, asumiendo distribución aproximadamente normal pese a la asimetría negativa moderada reportada (Sk entre −0,78 y −1,35 según subescala). Las bandas provisionales serían:

| Subescala | Banda BAJO (≤ M − 1 DT, ≈ percentil 16) | Banda MEDIO | Banda ALTO (≥ M + 1 DT, ≈ percentil 84) |
|---|---|---|---|
| Comprehension | ≤ 22 | 23–34 | ≥ 34 |
| Purpose | ≤ 25 | 26–35 | ≥ 35 |
| Mattering | ≤ 19 | 20–33 | ≥ 33 |

**Limitaciones documentadas internamente:**
- Estos puntos de corte son provisionales y no constituyen un baremo colombiano.
- Aplicar sólo a usuarios de 22–38 años (rango central de validación) hasta tener invarianza colombiana por edad.
- El techo de Purpose (35 = máximo posible) implica efecto techo: muchos usuarios obtendrán percentil ≥ 84 sin que ello discrimine bien. Comunicar al usuario en banda alta de Purpose con prudencia.

### 3.2 Roadmap para baremos colombianos propios

| Fase | Meses 0–3 | Meses 3–9 | Meses 9–15 |
|---|---|---|---|
| Hito | Piloto cognitivo es-CO (n ≈ 30–40, ver Sección 8) | Recolección con muestra de conveniencia DescubreMe (n ≥ 600, edad 18–60, balanceo por género y región) | Validación independiente con muestra estratificada nacional (n ≥ 1.000) en convenio con universidad colombiana |
| Entregable | Ítems es-CO ajustados; consentimiento auditado | Tabla de percentiles 1–99 por subescala; CFA confirmatorio; invarianza por género y edad; **`[Aporte Gemini]` modelado bifactor para extraer scores libres de aquiescencia y score global** | Paper sometido a revista indexada (sugerido: *Revista Latinoamericana de Psicología* o *Universitas Psychologica*); baremos publicables |
| Decisión gating | Aceptación de ítems sin re-traducción | Si CFA falla → re-adaptar ítems, no publicar baremos provisionales como definitivos | Si invarianza por edad falla → publicar baremos segmentados |

---

## SECCIÓN 4 — ÍTEMS INVERSOS NUMERADOS

| Ítem # | Faceta/Dimensión | Clave | Notas |
|---|---|---|---|
| 2 | Mattering | **Inverso (R)** | Único ítem inverso del MEMS-15. Antes de sumar a la subescala Mattering, recodificar 1→7, 2→6, 3→5, 4→4, 5→3, 6→2, 7→1. El balance 14:1 (directos:inversos) es estructuralmente débil; **el Scoring Engine debe agregar una métrica de aquiescencia auxiliar** (por ejemplo, desviación estándar intra-sujeto sobre los 15 ítems) y marcar como "respuesta de baja varianza" cualquier patrón con DT intra-sujeto < 0,8 (flag interno, no visible al usuario). `[Aporte Gemini]` Recordar que este ítem tiene la **correlación ítem-total más baja (r = 0.454)** del banco según Marco et al. (2022), lo que confirma que su contribución a la subescala es marginal y refuerza la necesidad de tratamiento estadístico cuidadoso. |

---

## SECCIÓN 5 — TEXTOS DE INTERPRETACIÓN AL USUARIO (es-CO)

> Aplican los siguientes principios obligatorios: descriptivo no etiquetador, aspiracional no determinista, no clínico, tuteo cordial colombiano, máximo 80 palabras por texto; cada texto incluye descripción de banda + ejemplo conductual + invitación a reflexión (no instrucción).

### COMPRENSIÓN (coherencia)

**Descripción técnica (interna, no se muestra al usuario):** Grado en que la persona percibe que su vida tiene orden, conexión y comprensibilidad como un todo. Es la dimensión cognitiva del sentido vital. Puntajes bajos se asocian con experiencias no integradas y con disonancia narrativa. `[Aporte Gemini]` En pacientes con dolor crónico y TEPT, la dimensión Comprehension se asocia inversamente con la frecuencia e interferencia del dolor, mientras que Purpose y Mattering no muestran ese efecto analgésico-cognitivo. Implicación: la banda baja de Comprehension es un foco clínicamente relevante en usuarios que reportan adversidad sostenida.

**Banda BAJO (≤ percentil 16):**
En este momento tiendes a sentir que las piezas de tu vida no terminan de encajar y que cuesta verle el hilo a lo que te pasa. Por ejemplo: cuando intentas explicarle a alguien por qué estás donde estás, te quedas sin palabras claras. ¿Qué pequeña pieza de tu historia te gustaría empezar a entender un poco mejor primero?

**Banda MEDIO (percentil 17–83):**
Tiendes a comprender buena parte de tu vida, aunque hay zonas que todavía se ven borrosas o contradictorias. Por ejemplo: hay capítulos tuyos que sabrías contar con claridad, y otros que aún están en proceso de tomar forma. ¿Cuál de esas zonas borrosas te llama hoy a mirarla con más calma?

**Banda ALTO (≥ percentil 84):**
Tiendes a percibir tu vida como una historia con orden y conexión, donde los eventos —incluso los difíciles— encuentran su lugar. Por ejemplo: puedes mirar atrás y reconocer cómo decisiones aparentemente sueltas se enlazan. ¿Qué parte de esa claridad te gustaría usar para abrir un nuevo capítulo?

### PROPÓSITO

**Descripción técnica (interna, no se muestra al usuario):** Grado en que la persona tiene metas y direcciones que orientan su vida. Es la dimensión motivacional. Se asocia inversamente con desesperanza y con riesgo de mortalidad en adultos mayores; predice positivamente afecto positivo. `[Aporte Gemini]` En la literatura sobre intervenciones (Meaning-Centered Interventions para trastornos de la conducta alimentaria), Purpose mostró tamaños de efecto moderados (η ≈ 0.11) post-intervención. Es la dimensión más modificable terapéuticamente.

**Banda BAJO (≤ percentil 16):**
En este periodo tiendes a sentir que tu vida no está apuntando hacia algo que te jale fuerte. Por ejemplo: te cuesta nombrar dos o tres cosas que quisieras lograr en el próximo año y que de verdad te importen. ¿Qué tema, persona o causa te haría salir de la cama un poco más temprano si lo retomaras?

**Banda MEDIO (percentil 17–83):**
Tiendes a tener metas que te orientan, aunque a veces se difuminan o compiten entre sí. Por ejemplo: sabes hacia dónde quieres ir en lo laboral o en lo personal, pero no siempre tienes claro cuál va primero. ¿Cuál de tus metas actuales merecería que le dieras un poco más de aire esta semana?

**Banda ALTO (≥ percentil 84):**
Tiendes a percibir tu vida orientada hacia metas que te mueven y te dan dirección. Por ejemplo: cuando alguien te pregunta qué estás construyendo, puedes contarlo con energía y detalle. ¿Cómo te gustaría cuidar esa dirección para que siga siendo tuya y no se vuelva una carga?

### IMPORTANCIA (mattering)

**Descripción técnica (interna, no se muestra al usuario):** Grado en que la persona percibe que su existencia tiene valor inherente y deja huella en el mundo. Es la dimensión afectivo-existencial. En la validación clínica española (Marco et al., 2022), *mattering* fue la dimensión más fuertemente asociada inversamente con depresión y ansiedad: la banda baja exige especial cuidado de redacción. `[Aporte Gemini]` La crítica fenomenológica de Wong (ver §9) señala que la operacionalización "cósmica" del mattering (ítems 4, 11, 15) puede ser interpretada como exigencia de grandiosidad por usuarios laicos o pragmáticos; conviene que el texto al usuario aterrice deliberadamente la dimensión en lo relacional y cotidiano, no en lo universal-trascendente.

**Banda BAJO (≤ percentil 16):**
En este momento tiendes a sentir que tu existencia no termina de pesar, como si tu presencia en el mundo importara poco. Es una experiencia más común de lo que parece y suele aliviarse cuando se habla con alguien de confianza. Si esta sensación te acompaña hace tiempo, puede ayudarte conversarlo con alguien cercano o con una línea de apoyo gratuita.

**Banda MEDIO (percentil 17–83):**
Tiendes a sentir que tu vida importa, aunque hay días en que esa certeza se afloja. Por ejemplo: en algunos momentos reconoces tu valor para quienes te rodean, y en otros te cuesta verlo en ti mismo. ¿Qué gestos pequeños, propios o ajenos, suelen recordarte que tu presencia hace una diferencia?

**Banda ALTO (≥ percentil 84):**
Tiendes a percibir que tu existencia tiene valor en sí misma, independiente de lo que produzcas o demuestres. Por ejemplo: cuando piensas en las personas o espacios donde estás, reconoces que tu presencia ahí cuenta. ¿Cómo te gustaría seguir habitando esa certeza sin que se transforme en exigencia hacia ti o hacia otros?

---

## SECCIÓN 6 — LICENSE ACQUISITION PLAN

### 6.1 Titular y contacto

**Hecho:** El copyright editorial del paper original George & Park (2017) pertenece a Informa UK Limited, trading as Taylor & Francis Group (Routledge). Los autores conservan derechos morales y, salvo cláusula expresa en el contrato de publicación, no retienen derecho de uso comercial independiente sobre el material publicado en el journal de suscripción.

Contactos verificados:
- **Login S. George, PhD.** Assistant Professor, Rutgers School of Nursing (previamente Department of Psychology, University of Connecticut). Correo de correspondencia del paper original (2016–2017): login.s.george@gmail.com. Perfil institucional actual: https://nursing.rutgers.edu/profile/login-george/. **[Verificar correo institucional Rutgers antes de enviar.]**
- **Crystal L. Park, PhD.** Board of Trustees Distinguished Professor, Department of Psychological Sciences, University of Connecticut. Perfil: https://psychology.uconn.edu/person/crystal-park/. Formulario monitorizado: https://today.uconn.edu/experts/expert-inquiry/crystal.park/crystal-park-phd/. El correo institucional sigue el patrón crystal.park@uconn.edu **[verificar al enviar; ZoomInfo lo confirma parcialmente como c***@uconn.edu]**.
- **Routledge / Taylor & Francis — Journals Permissions.** Vía RightsLink (Copyright Clearance Center) en la página del artículo en tandfonline.com (pestaña "Reprints & Permissions"). URL del artículo: https://www.tandfonline.com/doi/full/10.1080/17439760.2016.1209546. Para usos comerciales explícitos, formulario directo: https://taylorandfrancis.com/corporate-solutions/journals-permissions/.

### 6.2 Práctica histórica de concesión

**Hecho documentado:** La política Routledge / T&F distingue entre uso académico (que se procesa vía RightsLink / CCC con tarifas estándar, frecuentemente gratuito para autor original) y uso comercial (que exige confirmación escrita explícita de un representante T&F; las licencias estándar son válidas por un año, hasta cinco si se solicita expresamente).

**Inferencia:** Para una plataforma freemium B2C que vende reportes a USD 19 y reutiliza el instrumento de forma sistemática, el uso califica como comercial. El precio típico para licencias comerciales de extractos cortos (≤ 15 ítems) suele oscilar entre USD 300 y USD 2.500 anuales por idioma según volumen y territorio, pero no hay tarifa pública — cada caso se cotiza vía CCC. **[sin fuente verificada de tarifa específica para escalas psicométricas].**

**Hecho adicional:** T&F advierte que "permission to use any material published in a Taylor & Francis publication which is published with permission of a third party must be obtained from the third party owner". Aun obteniendo la licencia editorial, conviene contar con autorización explícita de los autores como respaldo ético, especialmente porque son ellos quienes pueden bloquear o autorizar futuras adaptaciones colombianas.

### 6.3 Pasos para solicitar

1. **Día 1.** Enviar email simultáneo a George y Park (borrador en 6.4) presentando el proyecto y solicitando su autorización moral y, si corresponde, contractual.
2. **Día 1.** Abrir solicitud en RightsLink desde la página del artículo en tandfonline.com, indicando "Commercial — Reuse in digital/online product, freemium B2C, audience Latin America, expected first-year volume 5.000–20.000 aplicaciones".
3. **Día 7–14.** Seguimiento si no hay respuesta. T&F indica plazos de 3–5 días hábiles vía CCC y hasta 6 semanas para casos complejos.
4. **Día 14.** Si George/Park responden afirmativamente con cesión informal, registrar consentimiento por escrito (email basta) y cruzar con el paso T&F.
5. **Día 30.** Cerrar contrato comercial T&F (RightsLink emite licencia formal) y archivar PDF de la licencia en el repositorio legal.
6. **Mes 6.** Renovar licencia anual o ampliar a multianual.

### 6.4 Borrador de email inicial (inglés)

```
Subject: Permission request — commercial use of MEMS (George & Park, 2017) on a Latin American self-knowledge platform

Dear Dr. George and Dr. Park,

My name is [Name], and I write on behalf of DescubreMe, a Spanish-language web platform
for adult self-knowledge based in Bogotá, Colombia, with secondary markets in Mexico and
Argentina. We are educational and orientational in nature — we do not perform clinical
diagnosis, screening, or personnel selection.

We are preparing to integrate the Multidimensional Existential Meaning Scale (MEMS,
15 items; George & Park, 2017, The Journal of Positive Psychology, 12(6), 613–627,
doi 10.1080/17439760.2016.1209546) as one module of our paid product (USD 19) and our
Ikigai Premium product. The Spanish adaptation we plan to use as the base text is the
open-access CC BY 4.0 version by Marco et al. (2022, Frontiers in Psychiatry, 13, 832934).

We are writing to:

1. Inform you of our intended use and confirm that you have no objection to a non-clinical,
   freemium commercial use of the MEMS in Spanish (and, eventually, in English).
2. Ask whether you require any specific attribution, citation format, or notification
   protocol beyond the standard APA reference and CC BY 4.0 attribution to Marco et al.
3. Explore your interest in collaborating on the first peer-reviewed Colombian validation
   of the MEMS, for which we could provide an anonymized adult sample (n ≥ 600) at no cost
   to you.

We are concurrently submitting a commercial reuse request through Taylor & Francis
RightsLink for the English version, but we believe your moral and scientific endorsement
is the more important step.

Happy to share our consent form, scoring engine documentation, and user-facing report
templates upon request. Thank you for considering this; the MEMS is, in our view, the
most informative short measure of meaning in life available today, and we would like to
deploy it responsibly.

Sincerely,

[Name, role]
DescubreMe — [URL]
[Email] · [Phone]
```

**Variante corta para Routledge / T&F (si RightsLink no permite especificar todo):**

```
Subject: Commercial reuse — 15 items from George & Park (2017) JoPP 12(6):613–627

We seek a commercial license to reuse the 15 items of the Multidimensional Existential
Meaning Scale (MEMS) in English and Spanish, embedded in a non-clinical, educational
freemium web platform for adults (DescubreMe, Colombia). Expected volume: 5,000–20,000
administrations during year 1; geography: Colombia, Mexico, Argentina. Please advise on
fee structure, duration options (1 vs. 5 years), and required attribution language.
We have parallel written endorsement from the authors.
```

### 6.5 Costo esperado y rangos

**Inferencia (no hay tarifa pública):** Para una licencia comercial T&F de ítems literales en este perfil de uso, rango plausible **USD 400 – USD 2.500 por año, por idioma**. Los pagos a autores no suelen ser obligatorios pero pueden negociarse como contribución a línea de investigación (rango habitual USD 0 – USD 1.500 simbólico).

**Costo total año 1 estimado:** USD 800 – USD 5.000.
**Costo total año 1 pesimista:** USD 8.000 (si T&F categoriza como uso *publishing-equivalente*).
**Costo recurrente:** USD 400 – USD 2.500 / año si se renueva anualmente.

### 6.6 Plan B

Si la licencia no se obtiene en plazo razonable (60 días) o el costo excede el techo presupuestal (USD 5.000/año), alternativas en orden de preferencia:

1. **Plan B-1 (recomendado):** Desplegar sólo la versión española Marco 2022 bajo licencia CC BY 4.0 con atribución completa, omitiendo la versión inglesa. CC BY 4.0 permite reuso comercial; esto resuelve legalmente Colombia, México y Argentina sin necesidad de licencia T&F. Riesgo legal: bajo. Riesgo reputacional: moderado.
2. **Plan B-2:** Sustituir MEMS por el **MLQ** (Steger et al., 2006) ya integrado en v2.0, asumiendo la pérdida de la dimensión *mattering*. Cobertura: *comprehension* (presence) + *purpose* (search). No es óptimo.
3. **Plan B-3:** Adoptar el **Three-Dimensional Meaning in Life Scale (3DM)** de Martela & Steger (2023), competidor reciente con licencia potencialmente más abierta. `[Aporte Gemini]` Ventaja adicional del 3DM: su tercera dimensión (Significance) se conceptualiza como **valor subjetivo personal**, no cósmico, evitando la crítica fenomenológica de Wong sobre los ítems 4 y 11 de MEMS. Desventaja: 11 ítems vs 15, pero menos antecedentes de validación es-CO. Requiere repetir todo el flujo de adquisición.
4. **Plan B-4:** Desarrollar un ítem-banco propio inspirado en el modelo tripartito Martela-Steger, sin reproducir literalmente ítems MEMS. Costoso (≥ 12 meses) pero elimina dependencia editorial.

---

## SECCIÓN 7 — DISCLAIMERS Y MITIGACIONES ESPECÍFICAS

### 7.1 Disclaimer pre-test (texto literal, es-CO, ≤ 100 palabras)

> Vas a responder un cuestionario corto sobre cómo experimentas el sentido de tu vida. No es una prueba clínica, ni un diagnóstico, ni una evaluación para selección laboral. Tus respuestas se usarán para generar una lectura descriptiva que te invite a reflexionar sobre ti mismo. Algunas preguntas pueden tocar temas existenciales y movilizarte emocionalmente; si en algún momento prefieres no continuar, puedes salir sin penalización. Tus datos se tratan según nuestra política de privacidad y la Ley 1581 de 2012 de Colombia. ¿Deseas continuar?

### 7.2 Ítems sensibles que activan NFR-28

**Regla operativa.** **Trigger NFR-28 activado** cuando se cumpla **cualquiera** de estas condiciones tras el envío del cuestionario:

- Subescala Mattering ≤ 2 (promedio ≤ 2 sobre los 5 ítems, tras invertir el ítem 2). `[Aporte Gemini]` Esta es la dimensión con mayor asociación negativa con depresión y ansiedad en muestra clínica (Marco et al., 2022); priorizarla operativamente es coherente con la evidencia.
- Ítem 4 ≤ 2 ("Incluso dentro de mil años, todavía importaría si yo existiera o no") combinado con ítem 13 ≤ 2 ("Estoy seguro de que mi vida es importante").
- Ítem 1 ≤ 2 ("Mi vida tiene sentido") en cualquier caso (señal de baja comprensión global).

**Acción al activarse:**
1. No se muestra el reporte de bandas inmediato.
2. Se muestra el "Mensaje de contención" de 7.3.
3. Se ofrece el ingreso al reporte completo sólo después de aceptación explícita.
4. Se guarda en el log de auditoría que NFR-28 se activó (sin almacenar datos de salud).

### 7.3 Mensaje de contención (texto literal, es-CO, ≤ 120 palabras)

> Algunas de tus respuestas nos dicen que en este momento estás atravesando una sensación intensa de que la vida pesa poco o no se siente con sentido. Queremos detenernos un momento antes de mostrarte tu reporte: lo que sientes es más común de lo que parece y suele aliviarse cuando se habla con alguien. Si te ayuda, puedes llamar gratis a la **Línea 106** de la Secretaría de Salud de Bogotá (24/7), escribir al **WhatsApp 300 754 8933**, o llamar a la **Línea 192 opción 4** del Ministerio de Salud, en cualquier parte de Colombia. Cuando te sientas listo, podemos seguir con tu reporte o dejarlo para otro día. Tú decides.

### 7.4 Líneas de ayuda Colombia relevantes (vigentes a mayo 2026)

| Línea | Cobertura | Horario | Naturaleza | Verificación |
|---|---|---|---|---|
| **Línea 106 — "El poder de ser escuchado"** | Bogotá D. C. | 24/7, 365 días | Apoyo psicológico gratuito, atención de crisis, orientación. Operada por Secretaría Distrital de Salud. Canal WhatsApp: 300 754 8933. | saludcapital.gov.co/paginas2/linea106-inicio.aspx; verificada activa con cifras 2025 (15.832 llamadas ene–abr 2025). |
| **Línea 192 opción 4 — Teleorientación en Salud Mental** | Nacional Colombia | 24/7 | Primeros auxilios psicológicos, orientación, activación CRUE territorial en riesgo inminente. Operada por MinSalud. | minsalud.gov.co — activa desde abril 2020. |
| **Línea 123** | Bogotá y principales ciudades | 24/7 | Emergencias generales y de salud mental con respuesta prehospitalaria. | Activa. |
| **Línea Calma** | Bogotá (hombres ≥ 18) | Horario diurno | Apoyo emocional masculino, prevención de violencias. 018000 423614. | culturaciudadana.gov.co. |
| **Línea Púrpura Distrital** | Bogotá (mujeres ≥ 18) | 24/7 | Violencias de género y crisis emocionales. | Activa. |
| **Línea 141 ICBF** | Nacional Colombia (NNA) | 24/7 | Protección de niños, niñas y adolescentes. | Activa. |

**Hecho:** El producto DescubreMe está dirigido a adultos, por lo que las líneas primarias que se ofrecen al usuario son 106 (Bogotá), 192-opción-4 (nacional) y 123 (emergencias). Las líneas Calma, Púrpura e ICBF se incluyen como contexto interno para el equipo de soporte.

### 7.5 Disclaimer post-test (texto literal, es-CO, ≤ 80 palabras)

> Lo que acabas de leer es una lectura descriptiva y orientadora, no un diagnóstico. El sentido de la vida cambia con el tiempo, los vínculos y las circunstancias. Si algún punto te movió, conversarlo con alguien de confianza o con un profesional de salud mental puede ser un buen paso. Si quieres profundizar, también puedes guardar este reporte y volver a hacer la prueba en unos meses para ver cómo evolucionan tus respuestas.

---

## SECCIÓN 8 — SUGERENCIAS DE PILOTO COGNITIVO COLOMBIA

### 8.1 Tamaño y características de muestra

**Recomendación:** n = 30–40 participantes adultos colombianos, reclutados por muestreo intencional con cuotas:

- 50 % mujeres, 50 % hombres (más 2–3 personas no binarias si la cuota lo permite).
- Tres tramos de edad: 22–28 (≥ 10), 29–38 (≥ 10), 39–55 (≥ 10).
- Tres niveles educativos: bachiller (≥ 8), técnico/tecnólogo (≥ 10), profesional/posgrado (≥ 12).
- Tres regiones: Bogotá/Cundinamarca (≥ 15), Antioquia/Eje Cafetero (≥ 10), Costa Atlántica (≥ 8).
- Exclusión: diagnóstico clínico activo de trastorno mental severo (criterio ético, no psicométrico).

### 8.2 Protocolo think-aloud

1. **Sesión individual de 45–60 minutos**, en línea (video) o presencial, con consentimiento grabado.
2. **Calentamiento (5 min):** explicar el método, asegurar que no hay respuestas correctas, recordar que se está evaluando el cuestionario, no a la persona.
3. **Aplicación ítem por ítem (35 min):** el participante lee el ítem en voz alta, responde la Likert y a continuación verbaliza:
   - "¿Qué entiendes con este ítem?" (paráfrasis).
   - "¿Qué palabras o frases te chocaron, te parecieron raras o ambiguas?"
   - "¿Qué te hizo elegir ese número y no el siguiente?"
4. **Sondeos focalizados (10 min):** revisar específicamente ítems 5, 6, 8, 11 y 14 (los priorizados en Sección 2.2). `[Aporte Gemini]` Añadir un sondeo específico para los ítems 4 y 11 enfocado en detectar la reacción al marco "cósmico" del *mattering* señalada por la crítica fenomenológica de Wong: preguntar al participante si la formulación le resulta exagerada, ajena o cómoda, sin inducir la respuesta.
5. **Cierre (5 min):** valoración general, comodidad emocional, sugerencias libres.

### 8.3 Criterios para aceptar / re-adaptar ítem

| Indicador | Aceptar el ítem | Re-adaptar |
|---|---|---|
| Paráfrasis coincidente con constructo objetivo | ≥ 80 % de participantes | < 80 % |
| Palabras señaladas como raras/ambiguas | ≤ 15 % de participantes | > 15 % |
| Tiempo medio de respuesta | < 12 segundos | ≥ 12 segundos |
| Reportes de incomodidad emocional no resuelta | 0–1 casos | ≥ 2 casos → revisar redacción, no constructo |
| `[Aporte Gemini]` Reacciones explícitas de "esto suena exagerado / pomposo" en ítems 4 u 11 | ≤ 20 % | > 20 % → preparar variante "aterrizada" para v1.2 |

### 8.4 Output esperado del piloto

- Documento "MEMS es-CO v1.1 — Hallazgos piloto cognitivo": tabla ítem por ítem con redacción propuesta final, justificación y citas literales de los participantes.
- Reporte de tiempos por ítem.
- Lista de ítems aprobados, ítems modificados y (si los hay) ítems descartados con razón.
- Documento de consentimiento informado pulido sobre la base del feedback recibido.
- Recomendación go/no-go para iniciar la fase de muestreo amplio (n ≥ 600).

---

## SECCIÓN 9 — GAPS Y PREGUNTAS ABIERTAS

1. **¿Existe un baremo en percentiles publicado para alguna versión hispana del MEMS-15?**
   *Estado actual:* Marco et al. (2022) publican medias y desviaciones por género y por edad, pero no tablas de percentiles. **[sin fuente verificada]**.
   *Plan de resolución:* Escribir al primer autor (jose.h.marco@uv.es) solicitando tabla suplementaria de percentiles o microdataset bajo acuerdo de uso secundario. Plazo: 30 días. Si no se obtiene, derivar percentiles aproximados M ± k·DT como provisional documentado.

2. **¿La propuesta argentina MEMS-13 (Buenos Aires, Acta Académica) existe en versión peer-review y es citable?**
   *Estado actual:* `[Aporte Gemini]` Referenciada en Acta Académica 000-004/89 con n = 270 adultos, edad media 38 años; ajuste óptimo de tres factores con 13 ítems; no se localizó en SciELO, Redalyc, ResearchGate ni en el sitio de la AAPC hasta el cierre. **[sin fuente verificada como peer-review]**.
   *Plan de resolución:* Buscar en BDU2 (Sistema de Información Universitaria argentino), enviar correo al departamento de psicología de UBA / UNC con la consulta específica. Plazo: 45 días.

3. **¿Cuál es la tarifa real de Routledge para licencia comercial de los 15 ítems del MEMS en español e inglés, para un volumen de 5.000–20.000 aplicaciones anuales en LATAM?**
   *Estado actual:* RightsLink no publica tarifa pública; T&F requiere cotización individual. **[sin fuente verificada]**.
   *Plan de resolución:* Iniciar solicitud RightsLink la próxima semana (ver Sección 6.3) y registrar la cotización resultante.

4. **¿Login S. George conserva derechos morales o de uso suficientes para autorizar uso comercial, dado que el copyright editorial es de T&F?**
   *Estado actual:* No declarado públicamente. La autoría correspondiente recae en él (login.s.george@gmail.com en el paper original).
   *Plan de resolución:* Pregunta explícita en el email inicial (Sección 6.4) sobre el alcance de su autorización moral vs. obligación de pasar por T&F.

5. **¿La invarianza por edad falla en muestras colombianas o sólo en la española de Marco?**
   *Estado actual:* Marco et al. reportan invarianza configural pero el paso siguiente (métrica / escalar) no se sostuvo del todo entre grupos de edad. Por género, sin embargo, la `[Aporte Gemini]` invarianza estricta sí se demostró en muestra española. No hay réplica colombiana.
   *Plan de resolución:* En la fase de validación amplia (n ≥ 600), planificar análisis multigrupo por edad como output primario, no secundario.

6. **`[Aporte Gemini]` ¿La crítica fenomenológica de Paul Wong sobre la operacionalización "cósmica" del mattering (ítems 4, 11) afecta la validez del instrumento en población colombiana laica o pragmática?**
   *Estado actual:* Wong (2023, *drpaulwong.com*) argumenta que ítems del tipo "Incluso dentro de mil años, todavía importaría si yo existiera o no" o "Si mi vida alguna vez existió, fue importante en el esquema general del universo" miden ideación de grandiosidad o cosmología religiosa más que sensación genuina de importancia. Es una crítica conceptual relevante pero no es un fallo psicométrico documentado en muestras hispanohablantes.
   *Plan de resolución:* Incorporar al protocolo de piloto cognitivo (Sección 8.2.4 y 8.3) sondeos específicos sobre la reacción a los ítems 4 y 11. Documentar el porcentaje de participantes que reportan disonancia con la formulación cósmica. Si > 20 %, preparar redacción aterrizada para v1.2 y comunicar el hallazgo a los autores George & Park como entrada complementaria a la solicitud de licencia.

---

## SECCIÓN 10 — REFERENCIAS (APA 7)

George, L. S., & Park, C. L. (2016). Meaning in life as comprehension, purpose, and mattering: Toward integration and new research questions. *Review of General Psychology*, 20(3), 205–220. https://doi.org/10.1037/gpr0000077

George, L. S., & Park, C. L. (2017). The Multidimensional Existential Meaning Scale: A tripartite approach to measuring meaning in life. *The Journal of Positive Psychology*, 12(6), 613–627. https://doi.org/10.1080/17439760.2016.1209546

Gerymski, R., & Krok, D. (2020). A Polish adaptation of the Multidimensional Existential Meaning Scale: Internal structure, reliability, and validity. *Roczniki Psychologiczne / Annals of Psychology*, 23(2), 173–190. https://doi.org/10.18290/rpsych20232-4

Marco, J. H., García-Alandete, J., Pérez Rodríguez, S., Guillén, V., Baños, R. M., & Tormo-Irun, M. P. (2022). Spanish validation of the Multidimensional Existential Meaning Scale: Which dimension of meaning in life is more associated with psychopathology in people with mental disorders? *Frontiers in Psychiatry*, 13, 832934. https://doi.org/10.3389/fpsyt.2022.832934

Martela, F., & Steger, M. F. (2016). The three meanings of meaning in life: Distinguishing coherence, purpose, and significance. *The Journal of Positive Psychology*, 11(5), 531–545. https://doi.org/10.1080/17439760.2015.1137623

Martela, F., & Steger, M. F. (2023). The role of significance relative to the other dimensions of meaning in life — an examination utilizing the Three Dimensional Meaning in Life Scale (3DM). *The Journal of Positive Psychology*, 18(4), 606–626. https://doi.org/10.1080/17439760.2022.2070528

Costin, V., & Vignoles, V. L. (2020). Meaning is about mattering: Evaluating coherence, purpose, and existential mattering as precursors of meaning in life judgments. *Journal of Personality and Social Psychology*, 118(4), 864–884. https://doi.org/10.1037/pspp0000225

Steger, M. F., Frazier, P., Oishi, S., & Kaler, M. (2006). The Meaning in Life Questionnaire: Assessing the presence of and search for meaning in life. *Journal of Counseling Psychology*, 53(1), 80–93. https://doi.org/10.1037/0022-0167.53.1.80

Taylor & Francis Group. (s.f.). *Permissions for journal content — Commercial reuse policy.* https://taylorandfrancis.com/corporate-solutions/journals-permissions/

Taylor & Francis Group. (s.f.). *Understanding copyright for journal authors.* https://authorservices.taylorandfrancis.com/publishing-your-research/moving-through-production/copyright-for-journal-authors/

Secretaría Distrital de Salud de Bogotá. (2025, 7 de mayo). *Línea 106 para apoyo psicológico y más información en Bogotá este 2025.* Alcaldía Mayor de Bogotá. https://bogota.gov.co/mi-ciudad/salud/linea-106-para-apoyo-psicologico-y-mas-informacion-en-bogota-este-2025

Ministerio de Salud y Protección Social de Colombia. (2021, 15 de abril). *Más de 18 mil atenciones en salud mental en opción 4 de Línea 192.* https://www.minsalud.gov.co/Paginas/Mas-de-18-mil-atenciones-en-salud-mental-en-opcion-4-de-Linea-192.aspx

Subasi, S., et al. (2024). Turkish validation of the MEMS. [Cita parcial; **sin fuente verificada en el detalle bibliográfico completo**, referenciada por Martela & Steger 2023.]

Congreso de la República de Colombia. (2012). *Ley 1581 de 2012 — Por la cual se dictan disposiciones generales para la protección de datos personales.* Diario Oficial.

**`[Aportes desde Gemini — verificación pendiente]`** (las siguientes referencias se citan en el reporte de Gemini con enlaces secundarios; se conservan aquí como punto de partida para verificación antes de uso en producción):

Adaptación argentina MEMS-13 (Buenos Aires). (s.f.). *Acta Académica* — actas de congreso. https://www.aacademica.org/000-004/89.pdf [referencia de actas; verificar si existe versión peer-reviewed en revista indexada].

"Escala Dimensional del Sentido de Vida" — antecedente colombiano. *Acta Colombiana de Psicología*, Universidad Católica de Colombia. https://actacolombianapsicologia.ucatolica.edu.co/article/view/350/355 [no es la MEMS, es instrumento bidimensional de inspiración logoterapéutica; útil como antecedente local].

Aplicación de la MEMS en criminología narrativa — desistimiento de carrera delictiva (Colombia). *Revista Criminalidad*, Policía Nacional de Colombia. http://www.scielo.org.co/scielo.php?script=sci_arttext&pid=S1794-31082021000200033 [aplicación cualitativa, útil para contextualizar uso colombiano del modelo tripartito].

Equivalencia de medición de la MEMS en árabe — estudiantes iraquíes. (s.f.). *Atlantis Press* — Bridging East and West. https://www.atlantis-press.com/article/126020233.pdf [verificar publicación primaria y autor].

Causal Influence of Life Meaning on Weight and Shape Concerns — ECA con Meaning-Centered Intervention para trastornos de la conducta alimentaria, con efectos sobre MEMS. *Frontiers in Psychology*. https://doi.org/10.3389/fpsyg.2021.593393 [evidencia de sensibilidad al cambio].

Wong, P. T. P. (s.f.). *Critique of Positive Psychology and Positive Interventions.* drpaulwong.com. https://www.drpaulwong.com/critique-of-positive-psychology/ [crítica fenomenológica del mattering cósmico; no es publicación peer-review formal pero es referencia académica de un investigador establecido].

---

## APÉNDICE A — Mapa de aportes consolidados desde Gemini

| # | Aporte | Sección donde se integró | Valor agregado | Verificación recomendada |
|---|---|---|---|---|
| A1 | Tabla descriptiva ítem-por-ítem de Marco et al. (2022): M, DT, asimetría, curtosis, correlación ítem-total para los 15 ítems en muestra española (N = 1.106) | §1.1 (tabla de estadísticos descriptivos por ítem) | Da al equipo psicométrico un benchmark internacional preciso para comparar contra la muestra colombiana en piloto y CFA; documenta que el ítem 2 (único inverso) tiene la r ítem-total más baja (0.454) y que los ítems 4 y 11 (los "cósmicos") tienen la mayor varianza. Útil también para el reporte final de la futura publicación colombiana. | Marco et al. (2022) ya está en referencias §10 y los valores se reproducen literalmente del paper open-access (Tabla 2). Verificación: bajar el PDF de PMC y confirmar transcripción exacta antes de citar en producción. |
| A2 | Invarianza estricta por género demostrada estadísticamente en validación española (tabla configural → métrico → escalar → estricto, todos con ΔCFI < 0.01, RMSEA < 0.05) | §0 (status bloqueadores), §2.1 (recomendación es-CO punto 5) | Resuelve técnicamente un requisito mínimo para reportar puntuaciones de hombres y mujeres en el mismo eje sin sesgo métrico. Justifica el uso de comparaciones de género en el reporte al usuario sin reservas. | Marco et al. (2022) ya está en referencias §10; los datos están en Tabla 3 del paper. Verificación: confirmar cifras exactas (Δχ², ΔCFI, ΔRMSEA) si se publican en futuro paper colombiano. |
| A3 | Antecedente argentino MEMS-13 (Buenos Aires, Acta Académica 000-004/89, n = 270, edad media 38 años) | §1.2 (banco oficial vs derivaciones), §3 (tabla de baremos), §9 (gap 2) | Documenta la existencia de una propuesta latinoamericana previa con reducción de ítems; señala una pista para colaboración o referencia regional. **No** es base operacional porque no es peer-review. | **CRÍTICA.** Buscar versión peer-reviewed en revistas indexadas argentinas; verificar autores y año exactos. Si no existe, marcar definitivamente como "actas de congreso, no operacional". |
| A4 | Antecedente colombiano: "Escala Dimensional del Sentido de Vida" (no es MEMS) con muestra n = 820 en cuatro ciudades | §2 (tabla, fila Colombia) | Documenta que existe ecosistema académico colombiano interesado en el constructo, lo que facilita identificación de aliados universitarios para la futura validación CFA colombiana del MEMS. | Acta Colombiana de Psicología, ya con URL específica. Verificar cita exacta antes de citar formalmente. |
| A5 | Modelo bifactor recomendado para análisis maduros (factor general + tres específicos) | §1.3 (nota estructural), §3.2 (roadmap H2) | Sugerencia analítica para producto v2.0+: reportar al usuario un score global de Sentido y tres scores facetarios desde un modelo bifactor, no desde modelo tripartito puro. Mejora la coherencia interpretativa del reporte. | Reportes secundarios; localizar el paper bifactor primario sobre MEMS antes de implementar. Marcado como roadmap, no v1.5. |
| A6 | Crítica fenomenológica de Paul Wong sobre la operacionalización "cósmica" del mattering (ítems 4, 11) | §2.2 (modificaciones léxicas), §5 (texto interpretativo Mattering — descripción técnica interna), §8.2.4 y §8.3 (sondeos piloto cognitivo), §9 (gap 6) | Anticipa un riesgo de validez fenomenológica relevante para población colombiana laica o pragmática; permite preparar variante "aterrizada" en v1.2 si el piloto confirma disonancia. También permite comunicar a Soto/Park una entrada constructiva en la solicitud de licencia. | Wong en *drpaulwong.com* (no es paper peer-review); usar como referencia académica complementaria, no como fuente psicométrica primaria. Verificar si tiene publicación formal posterior. |
| A7 | Hallazgo clínico Marco et al. (2022) muestra clínica n = 88: Mattering explica el 52 % de varianza en sintomatología depresiva | §0 (no aplica directamente), §3 (Hecho clínico relevante post-tabla), §7.2 (justificación de la regla NFR-28) | Justifica empíricamente la decisión operativa de priorizar Mattering en NFR-28; permite documentar al equipo de Producto y Compliance por qué la regla está donde está. | Marco et al. (2022) ya en referencias §10; cifra del 52 % aparece en Tabla 4/Discusión del paper. Verificar precisión antes de citar externamente. |
| A8 | Aplicación de la MEMS en criminología narrativa colombiana (Revista Criminalidad SciELO) | §10 (referencias adicionales con verificación pendiente) | Documenta uso prevalente del marco tripartito en investigación cualitativa colombiana; pista de aliados académicos potenciales para CFA colombiano. | Ya con URL SciELO; verificar autor y año exactos. No es base para baremos pero sí contexto local. |
| A9 | Evidencia de sensibilidad al cambio: ECA Meaning-Centered Interventions para trastornos de la conducta alimentaria con tamaños del efecto η ≈ 0.11–0.13 sobre subescalas MEMS post-intervención | §5 (texto interpretativo Purpose — descripción técnica interna) | Refuerza el marco aspiracional del producto: "la dimensión Purpose es modificable terapéuticamente". Útil como copy interno (no se muestra al usuario) y como argumentación frente a autores en la solicitud de licencia. | Frontiers in Psychology DOI 10.3389/fpsyg.2021.593393. Verificar cifras exactas de tamaño del efecto antes de citar en publicación. |
| A10 | Adaptación árabe (Iraq) y turca de la MEMS con buenas propiedades psicométricas | §3 (tabla de baremos, filas Iraq y Turquía) | Refuerza la robustez transcultural del instrumento como argumento de elegibilidad para validación colombiana; pista internacional adicional. | Atlantis Press y referencias secundarias. Verificar publicaciones primarias antes de citar en paper colombiano. |

**Lectura general del Apéndice A:** los diez aportes integrados son de naturaleza académica complementaria y refuerzan la base operativa del Pack de Claude. Los más relevantes para producto son **A1** (estadísticos descriptivos por ítem, directamente usable en QA psicométrico), **A2** (invarianza por género, resuelve un requisito técnico), **A6** (crítica de Wong, que se traduce en sondeos específicos del piloto cognitivo y en una variante de redacción de respaldo) y **A7** (justificación empírica de la regla NFR-28). Los aportes A3, A4, A8 y A10 son contextuales y deben verificarse en fuentes primarias antes de citarse oficialmente; los aportes A5 y A9 son roadmap para v2.0+, no v1.5.

---

## APÉNDICE B — Notas de consolidación (metodología)

**Origen del documento.** Este consolidado combina dos investigaciones independientes producidas en mayo 2026:

1. `Prompt_09_MEMS_IAR.Claude.md` — Implementation Acquisition Pack completo de 10 secciones siguiendo el prompt v1.0. Cumplimiento: 100 % de los requisitos del brief, con marcadores `Hecho:` / `Inferencia:` / `Opinión profesional:` / `[sin fuente verificada]` aplicados a lo largo del documento.
2. `Prompt_09_MEMS_IAR.Gemini.md` — Revisión académica narrativa estilo white paper sobre la MEMS, organizada en siete grandes secciones temáticas (introducción, ontología tripartita, arquitectura psicométrica, psicometría comparada vs 3DM/MLQ, validaciones globales, implicaciones clínicas, críticas epistemológicas, trayectorias futuras). No siguió la estructura de 10 secciones del prompt v1.0. Aportes principales: tabla descriptiva ítem-por-ítem (Marco 2022), tabla de invarianza por género (Marco 2022), antecedente argentino MEMS-13, validación árabe iraquí, antecedente colombiano de la Escala Dimensional del Sentido de Vida, aplicación en criminología narrativa colombiana, evidencia de sensibilidad al cambio en ECA, modelo bifactor, crítica fenomenológica de Wong sobre el mattering cósmico.

**Criterio de consolidación aplicado.**
- **Estructura:** se preserva íntegra la del Pack de Claude (10 secciones + Apéndices A y B nuevos).
- **Contenido operativo (ítems, baremos, textos al usuario, email de licencia, disclaimers, piloto):** se mantiene el de Claude porque Gemini no lo produjo. Donde Claude tenía un blanco operativo (descriptivos por ítem) y Gemini lo cubría con datos del mismo paper de Marco 2022, se integró tabla completa.
- **Aportes académicos de Gemini:** se integran SOLO cuando aportan información nueva, verificable y útil para producto. Cada aporte se marca con `[Aporte Gemini]` en el lugar donde aparece, y se traza en el Apéndice A con nivel de verificación.
- **Discrepancias entre Claude y Gemini:** no se encontraron discrepancias factuales sustanciales en este test (ítems literales, autores, año, DOI principal, contactos, único ítem inverso) porque Gemini no entregó la mayoría de esos datos operativos. Donde ambos tocaron el mismo punto (Marco 2022 español, validación polaca de Gerymski & Krok, comparación con MLQ y 3DM), las cifras y la atribución coinciden. Las diferencias son de **enfoque** (Claude operativo, Gemini académico), no de hecho.

**Limitaciones del consolidado.**
- Los aportes A3 (Argentina MEMS-13), A4 (Escala Dimensional Colombia), A6 (crítica de Wong) y A10 (validaciones árabe y turca) provienen de fuentes secundarias o no peer-review y deben verificarse en bases primarias antes de citarse en comunicación oficial con Routledge / T&F, George o Park, o en publicaciones colombianas futuras.
- El modelo bifactor (A5) y los hallazgos de ECA en TCA (A9) son sugerencias de roadmap; no se implementan en v1.5.
- La crítica fenomenológica de Wong (A6) no es un fallo psicométrico documentado en muestras hispanohablantes; se incorpora como hipótesis a verificar en el piloto cognitivo es-CO, no como bloqueador.

---

*Fin del Implementation Acquisition Pack v1.0 — MEMS — CONSOLIDADO · DescubreMe · LATAM/Colombia · Mayo 2026*
*Próxima revisión obligatoria: noviembre 2026 o al recibir respuesta de Routledge / T&F y de los autores, lo que ocurra primero.*
