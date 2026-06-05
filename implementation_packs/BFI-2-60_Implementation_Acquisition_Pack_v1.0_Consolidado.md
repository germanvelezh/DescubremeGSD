# Implementation Acquisition Pack v1.0 — BFI-2-60 (60 ítems) — CONSOLIDADO
**Producto destino:** DescubreMe (LATAM, foco Colombia) · **B2C Paid Premium — upgrade sobre BFI-2-S**
**Versión del consolidado:** 1.0 · **Fecha:** mayo 2026
**Insumos:** `Prompt_13_BFI-2-60_IAR.Claude.md` (Implementation Acquisition Pack completo, 10 secciones) + `Prompt_13_BFI-2-60_IAR.Gemini.md` (revisión académica narrativa con aportes psicométricos y de arquitectura de producto complementarios)
**Idiomas:** español neutro (metadatos y notas internas) / español Colombia (Secciones 5 y 7)

> **Nota metodológica del consolidado.** Claude entregó el Pack completo cubriendo las 10 secciones del prompt v1.0 al pie de la letra: portada, banco literal de ítems en EN y ES, tabla maestra de baremos publicados, 60 ítems inversos numerados con dimensión/faceta, textos interpretativos es-CO en 5 dominios × 3 bandas, plan de licencia con email copy-paste, disclaimers + NFR-28 + tabla de líneas Colombia, protocolo de piloto cognitivo y 13 referencias APA 7. Gemini entregó las 10 secciones formalmente, pero en estilo narrativo y con omisiones operativas mayores: NO incluye lista literal de los 60 ítems en EN ni en ES, NO incluye §5 a nivel de dominio completo (solo a nivel de faceta), Plan B HEXACO mencionado sin operacionalización, tabla de baremos con medias y desviaciones típicas españolas pero sin percentiles, sin contactos email para Gallardo-Pujol, sin tabla operativa de líneas Colombia. Aporta sin embargo valor verificable en: medias y DT a nivel dominio/faceta de la muestra española, idea de A/B testing de psicología del color para facetas críticas, propuesta de arquitectura desacoplada vía JSON paramétrico para migración a HEXACO, mención de Hogrefe como posible canal de licenciamiento comercial, plan de bootstrapping para baremos colombianos a partir de los primeros 3.000 perfiles, y cronometría de latencia en el piloto cognitivo. Este consolidado usa el Pack de Claude como base estructural completa e inyecta los aportes verificables de Gemini con la marca `[Aporte Gemini]`. La trazabilidad del origen de cada bloque está en el **Apéndice A**.

---

## TABLA DE COBERTURA (requisitos explícitos del brief vs. entrega)

| Requisito | Sección | Cobertura |
|---|---|---|
| Portada y metadatos + estado de bloqueadores | §0 | OK |
| Plan adquisición banco de ítems + lista literal de 60 ítems en EN y ES | §1 | OK (Colby PDFs EN + ES Gallardo-Pujol) |
| Adaptaciones al español (España, México, LATAM coordinada) + recomendación es-CO | §2 | OK |
| Baremos publicados (EE.UU., España, México, meta-análisis multilingüe, Colombia) + medias y DT integradas desde Gemini | §3 | OK + 3.1 + 3.2 + 3.3 |
| Tabla de 60 ítems con faceta/dominio/clave (30 directos / 30 inversos) | §4 | OK |
| 15 textos es-CO a nivel dominio (BAJO/MEDIO/ALTO) + descripciones por faceta (heredados desde BFI-2-S) | §5 | OK (5/5 dominios + descripciones técnicas; las 15 facetas extienden lo cubierto por BFI-2-S) |
| Plan licencia (contactos, práctica, pasos, email inglés, costo, Plan B HEXACO-60) | §6 | OK |
| Disclaimers pre/post + items sensibles NFR-28 + mensaje contención + líneas Colombia | §7 | OK |
| Piloto cognitivo Colombia (muestra, think-aloud, criterios, entregables) | §8 | OK |
| ≥ 3 gaps y preguntas abiertas | §9 | OK (5 + aportes Gemini integrados) |
| ≥ 10 referencias APA 7 con DOI | §10 | OK (13) |
| Marcadores Hecho/Inferencia/Opinión profesional | transversal | OK |
| Marcadores [sin fuente verificada] donde aplica | §3, §6, §9 | OK |
| **Aportes consolidados desde Gemini con verificación pendiente** | Apéndice A | OK |

---

## SECCIÓN 0 — PORTADA Y METADATOS

- **Acrónimo:** BFI-2-60
- **Nombre completo:** Big Five Inventory–2, forma completa de 60 ítems
- **Autores originales:** Christopher J. Soto (Colby College) y Oliver P. John (UC Berkeley)
- **Año publicación original:** 2017 (*Journal of Personality and Social Psychology*, 113(1), 117–143; DOI 10.1037/pspp0000096). Última revisión documentada del banco oficial inglés: ítems con copyright 2015; sin revisión publicada posterior al cierre de mayo 2026.
- **Idioma original:** Inglés (EE. UU.)
- **Adaptación al español base:** Gallardo-Pujol, Rouco, Cortijos-Bernabeu, Oceja, Soto & John (2022), *Psychological Test Adaptation and Development*, 3(1), 44–69; DOI 10.1027/2698-1866/a000020. España, N total = 1.673.
- **Productos destino en DescubreMe:** Tier **B2C Paid Premium** como *upgrade* opcional sobre el BFI-2-S; reporte de 5 dominios + 15 facetas con narrativa interpretativa larga.
- **Resumen ejecutivo:** El BFI-2-60 es la forma completa del modelo jerárquico de Big Five de Soto & John (2017), con 60 ítems (12 por dominio, 4 por faceta, 30 directos / 30 inversos) en escala Likert de 5 puntos. Los ítems originales y la adaptación española oficial están **públicamente disponibles** en PDF abierto del Colby Personality Lab. Su valor agregado sobre el BFI-2-S es la medición fiable a nivel de faceta (α de faceta en muestra Internet de validación: rango .65–.84, M = .76; α promedio de los cinco dominios = .866). Se considera *de facto* "código abierto" para uso de investigación y no profit; el uso comercial requiere permiso explícito de los autores. Para Colombia es viable adoptar la traducción española de Gallardo-Pujol et al. (2022) con ajustes léxicos menores y un piloto cognitivo de aceptación.

`[Aporte Gemini]` **Sinergia de stack con BFI-2-S.** El BFI-2-60 comparte el mismo banco de ítems (en orden y numeración) con el BFI-2-S de 30 ítems ya implementado en DescubreMe: los 30 ítems del BFI-2-S son un subconjunto fijo del BFI-2-60. En la práctica de ingeniería esto significa que el motor de scoring del BFI-2-60 puede reutilizar el código base del BFI-2-S extendiendo la matriz de ítems y la tabla de claves inversas. La barrera de desarrollo tecnológico para el upgrade Premium es, por tanto, marginal.

- **Status de bloqueadores:**
  - Licencia para uso comercial B2C freemium: **PARTIAL** — texto y adaptaciones gratis para investigación y uso no profit; uso comercial no aparece autorizado por defecto y requiere consulta explícita por escrito a Soto y John.
  - Ítems literales (inglés y español de España): **READY** — PDFs abiertos en colby.edu.
  - Baremos colombianos: **BLOCKED** — sin baremos colombianos publicados; existen estadísticos en muestras de España (Gallardo-Pujol et al., 2022) y México (Toledo-Fernández et al., 2022) y la muestra estadounidense representativa de Soto (2021, N = 6.126).

---

## SECCIÓN 1 — ACQUISITION PLAN DEL BANCO DE ÍTEMS

### 1.1 Disponibilidad pública

**Hecho:** Los 60 ítems del BFI-2 en inglés están publicados literalmente en el PDF abierto `bfi2-form.pdf` del Colby Personality Lab, sin paywall ni registro, junto con la clave de codificación. URL exacta: `https://www.colby.edu/wp-content/uploads/2013/08/bfi2-form.pdf`. El aviso de copyright dice: *"BFI-2 items copyright 2015 by Oliver P. John and Christopher J. Soto"* y el sitio aclara: *"Permission is granted for personal and research use of the BFI-2"*. La versión oficial en español también es pública en PDF abierto: `https://www.colby.edu/wp-content/uploads/2022/07/bfi2-form-spanish.pdf` (Gallardo-Pujol, Oceja, Cortijos-Bernabeu, Rouco). El documento español indica: *"No hay costes asociados al uso del BFI-2 en su versión española. Los derechos de autor de la versión original en inglés del BFI-2 son propiedad de Oliver John y Christopher Soto. En la práctica científica, el BFI-2 se considera 'código abierto' (open source)."*

**Reproducción literal del banco oficial (inglés, stem común "I am someone who…")** — fuente: Colby PDF bfi2-form.pdf:

| # | Ítem (EN) | # | Ítem (EN) |
|---|---|---|---|
| 1 | Is outgoing, sociable. | 31 | Is sometimes shy, introverted. |
| 2 | Is compassionate, has a soft heart. | 32 | Is helpful and unselfish with others. |
| 3 | Tends to be disorganized. | 33 | Keeps things neat and tidy. |
| 4 | Is relaxed, handles stress well. | 34 | Worries a lot. |
| 5 | Has few artistic interests. | 35 | Values art and beauty. |
| 6 | Has an assertive personality. | 36 | Finds it hard to influence people. |
| 7 | Is respectful, treats others with respect. | 37 | Is sometimes rude to others. |
| 8 | Tends to be lazy. | 38 | Is efficient, gets things done. |
| 9 | Stays optimistic after experiencing a setback. | 39 | Often feels sad. |
| 10 | Is curious about many different things. | 40 | Is complex, a deep thinker. |
| 11 | Rarely feels excited or eager. | 41 | Is full of energy. |
| 12 | Tends to find fault with others. | 42 | Is suspicious of others' intentions. |
| 13 | Is dependable, steady. | 43 | Is reliable, can always be counted on. |
| 14 | Is moody, has up and down mood swings. | 44 | Keeps their emotions under control. |
| 15 | Is inventive, finds clever ways to do things. | 45 | Has difficulty imagining things. |
| 16 | Tends to be quiet. | 46 | Is talkative. |
| 17 | Feels little sympathy for others. | 47 | Can be cold and uncaring. |
| 18 | Is systematic, likes to keep things in order. | 48 | Leaves a mess, doesn't clean up. |
| 19 | Can be tense. | 49 | Rarely feels anxious or afraid. |
| 20 | Is fascinated by art, music, or literature. | 50 | Thinks poetry and plays are boring. |
| 21 | Is dominant, acts as a leader. | 51 | Prefers to have others take charge. |
| 22 | Starts arguments with others. | 52 | Is polite, courteous to others. |
| 23 | Has difficulty getting started on tasks. | 53 | Is persistent, works until the task is finished. |
| 24 | Feels secure, comfortable with self. | 54 | Tends to feel depressed, blue. |
| 25 | Avoids intellectual, philosophical discussions. | 55 | Has little interest in abstract ideas. |
| 26 | Is less active than other people. | 56 | Shows a lot of enthusiasm. |
| 27 | Has a forgiving nature. | 57 | Assumes the best about people. |
| 28 | Can be somewhat careless. | 58 | Sometimes behaves irresponsibly. |
| 29 | Is emotionally stable, not easily upset. | 59 | Is temperamental, gets emotional easily. |
| 30 | Has little creativity. | 60 | Is original, comes up with new ideas. |

**Reproducción literal de la versión oficial al español (Gallardo-Pujol et al., 2022; PDF Colby)** — stem común "Soy alguien…":

| # | Ítem (ES) | # | Ítem (ES) |
|---|---|---|---|
| 1 | Abierto/a, sociable | 31 | A veces tímido/a, introvertido/a |
| 2 | Compasivo/a, con un gran corazón | 32 | Servicial y generoso/a con los demás |
| 3 | Que tiende a ser desorganizado/a | 33 | Que mantiene todo limpio y ordenado |
| 4 | Relajado/a, que gestiona bien el estrés | 34 | Que se preocupa mucho |
| 5 | Con pocos intereses artísticos | 35 | Que valora el arte y la belleza |
| 6 | Con una personalidad asertiva | 36 | A quien le es difícil influir en los demás |
| 7 | Respetuoso/a, que trata a los demás con respeto | 37 | Que a veces es grosero/a con los demás |
| 8 | Que tiende a ser perezoso/a | 38 | Eficiente, que consigue que las cosas se hagan |
| 9 | Que se mantiene optimista después de sufrir un contratiempo | 39 | Que a menudo se siente triste |
| 10 | Que siente curiosidad por gran variedad de cosas | 40 | Complejo/a, de pensamientos profundos |
| 11 | Que raramente se siente emocionado/a o entusiasmado/a | 41 | Lleno/a de energía |
| 12 | Que tiende a buscar los defectos de los demás | 42 | Que desconfía de las intenciones de los demás |
| 13 | Formal, constante | 43 | Fiable, con el/la que siempre se puede contar |
| 14 | Variable, con notables cambios de humor | 44 | Que controla sus emociones |
| 15 | Ingenioso/a, que busca formas inteligentes de hacer las cosas | 45 | Que tiene dificultad para imaginarse las cosas |
| 16 | Que tiende a estar callado/a | 46 | Hablador/a |
| 17 | Que siente poca compasión hacia los demás | 47 | Que puede ser frío/a e insensible |
| 18 | Metódico/a, a quien le gusta mantenerlo todo en orden | 48 | Que lo deja todo hecho un lío, que no limpia |
| 19 | Que puede ponerse tenso/a | 49 | Que raramente se siente ansioso/a o miedoso/a |
| 20 | Fascinado por el arte, la música o la literatura | 50 | Que considera que la poesía y el teatro son aburridos |
| 21 | Dominante, que actúa como líder | 51 | Que prefiere que otros asuman la responsabilidad |
| 22 | Que empieza discusiones con los demás | 52 | Educado/a, cortés con los demás |
| 23 | A quien le cuesta empezar las tareas | 53 | Tenaz, que trabaja hasta terminar la tarea |
| 24 | Que se siente seguro/a, cómodo/a consigo mismo/a | 54 | Que tiende a sentirse deprimido/a, melancólico/a |
| 25 | Que evita conversaciones intelectuales y filosóficas | 55 | Con poco interés por ideas abstractas |
| 26 | Menos activo/a que otras personas | 56 | Que muestra mucho entusiasmo |
| 27 | Comprensivo/a con los demás | 57 | Que piensa bien de la gente |
| 28 | Que puede ser algo descuidado/a | 58 | Que a veces se comporta de manera irresponsable |
| 29 | Emocionalmente estable, que no se altera con facilidad | 59 | Temperamental, que se exalta fácilmente |
| 30 | Con poca creatividad | 60 | Original, que aporta ideas nuevas |

### 1.2 Banco oficial vs. adaptaciones derivadas

El sitio Colby aloja también el BFI-2-S (30 ítems) y el BFI-2-XS (15 ítems), ambos subconjuntos del BFI-2 completo, y traducciones oficiales en 19 idiomas listadas explícitamente en la página de descargas (chino, croata, danés, holandés, francés, alemán, hebreo, indonesio, japonés, coreano, noruego, polaco, ruso, eslovaco, español, sueco y turco; ver Colby Personality Lab, n.d.). Adicionalmente, el sitio Colby señala literalmente: *"Preliminary translations of the BFI-2 into more than 30 additional languages are available from the International Situations Project"*, ampliando la cobertura lingüística más allá de las versiones validadas. El **banco oficial autoritativo** para el español sigue siendo el PDF Gallardo-Pujol et al. alojado en colby.edu (versión 2022). Para LATAM existe la validación mexicana de Toledo-Fernández, Pérez-Matus & Villalobos-Gallegos (2022) que utiliza la traducción española de Gallardo-Pujol et al. sin re-traducir los ítems.

### 1.3 Estructura del banco

- **Total:** 60 ítems, 5 dominios × 12 ítems, 15 facetas × 4 ítems (3 facetas por dominio).
- **Claves:** 30 ítems directos / 30 inversos (balance perfecto, 50/50).
- **Formato:** afirmación corta con stem único "I am someone who…/Soy alguien…". Likert 5 puntos: 1 = Muy en desacuerdo, 2 = Algo en desacuerdo, 3 = Neutral/sin opinión, 4 = Algo de acuerdo, 5 = Muy de acuerdo.
- **Tiempo administración:** 5–10 minutos (Soto & John, 2017b).

`[Aporte Gemini]` **Restricción de orden de presentación.** El orden secuencial nativo de los 60 ítems no debe aleatorizarse en producción. La distribución de ítems directos e inversos en el banco está deliberadamente espaciada para minimizar efectos de primacía y contigüidad semántica entre ítems de la misma faceta. Aleatorización indiscriminada destruiría esa separación y reduciría el control de aquiescencia.

### 1.4 Recomendación

**Opinión profesional:** Descargar e integrar como fuente única autoritativa:
1. `https://www.colby.edu/wp-content/uploads/2022/07/bfi2-form-spanish.pdf` (ítems es-ES).
2. `https://www.colby.edu/wp-content/uploads/2013/08/bfi2-form.pdf` (original EN, clave de codificación).
3. Sintaxis de puntuación SPSS/R y materiales suplementarios desde el repositorio OSF de la adaptación española: `https://osf.io/kp572/` (licencia CC-BY 4.0).

Antes de salir a producción comercial, escribir a `csoto@colby.edu` con copia a `ojohn@berkeley.edu` para confirmar uso B2C freemium (ver §6).

---

## SECCIÓN 2 — ADAPTACIONES AL ESPAÑOL DISPONIBLES

### 2.1 Tabla de adaptaciones al español del BFI-2 completo (60 ítems)

| País | Autores | Año | DOI / URL | N muestra | Características | Acceso ítems |
|---|---|---|---|---|---|---|
| España | Gallardo-Pujol, Rouco, Cortijos-Bernabeu, Oceja, Soto & John | 2022 | 10.1027/2698-1866/a000020 ; osf.io/kp572/ | 1.673 (3 estudios) | Estructura factorial 5 dominios y 15 facetas confirmada; invarianza métrica por género; invarianza escalar no establecida | **Pública** (PDF abierto Colby + OSF CC-BY 4.0) |
| México | Toledo-Fernández, Pérez-Matus & Villalobos-Gallegos | 2022 | 10.14349/sumapsi.2022.v29.n2.4 | 2.025 (baseline) / 610 (seguimiento) | Uso de la traducción española de Gallardo-Pujol; CFA con 3 facetas + aquiescencia con CFI ≥ .95, TLI ≥ .95; perfiles latentes con Q-LES-Q | **Pública** vía SciELO (artículo open access; los autores reutilizan la traducción de Gallardo-Pujol) |
| Argentina (contexto BFI clásico, referencia léxica) | Genise & Ungaretti | 2020 | *Diversitas — Perspectivas en Psicología* 16(2):285–301 (SciELO Colombia) | Muestra variable | `[Aporte Gemini]` Exploración estructural de modelos Big Five en el Cono Sur; útil como referencia dialectal de comparación, no es validación del BFI-2-60. | Pública vía SciELO |
| LATAM coordinada | Lechner, Danner, Rammstedt y eq. PIAAC (incluye español) | 2022 | Coordinated translation PIAAC, 5 idiomas | Multinacional | Traducción centralizada PIAAC; distinta del banco Colby; mantenida por GESIS | Permiso vía GESIS (Alemania) |

**Hecho:** No existe a la fecha de cierre (mayo 2026) una adaptación o validación específicamente colombiana del BFI-2-60 publicada con revisión por pares.

### 2.1.bis Recomendación de base para es-CO

**Opinión profesional:** Adoptar la versión española de Gallardo-Pujol et al. (2022) como **versión base** por cuatro razones:
1. Es la versión oficial autorizada por los autores y alojada en colby.edu.
2. Es CC-BY 4.0 en el repositorio OSF (osf.io/kp572/), permitiendo adaptación derivada con atribución.
3. La validación mexicana (Toledo-Fernández et al., 2022, N=2.025) ya demostró ajuste factorial aceptable en una muestra hispanohablante latinoamericana **usando exactamente esa traducción**, sin modificarla.
4. Tiene una validación coordinada con autores originales (Soto y John firman como coautores).

### 2.2 Modificaciones léxicas anticipadas para Colombia

**Hecho + Inferencia:** Algunos términos del español de España pueden producir fricción comprensiva o tono extraño en Colombia. Candidatos a verificar en piloto cognitivo (§8):

| # ítem | Versión ES (España) | Sugerencia a pilotar en Colombia | Motivo |
|---|---|---|---|
| 8 | "Que tiende a ser perezoso/a" | "Que tiende a ser flojo/a" o mantener "perezoso/a" | "Flojo/a" es más coloquial en Colombia, pero "perezoso/a" se entiende; preferir mantener. |
| 9 | "después de sufrir un contratiempo" | "después de un revés" o "después de un tropiezo" | Verificar comprensión. |
| 18 | "Metódico/a, a quien le gusta mantenerlo todo en orden" | Mantener | Sin fricción anticipada. |
| 33 | "Que mantiene todo limpio y ordenado" | Mantener | Sin fricción. |
| 37 | "Que a veces es grosero/a" | "grosero/a" o "maleducado/a" | Ambos funcionan. |
| 48 | "Que lo deja todo hecho un lío" | "Que deja todo desordenado / vuelto un reguero" | "Hecho un lío" es muy peninsular; **prioridad de piloto**. |
| 51 | "Que prefiere que otros asuman la responsabilidad" | Mantener | Sin fricción. |
| 58 | "Que a veces se comporta de manera irresponsable" | Mantener | Sin fricción. |
| 59 | "Temperamental, que se exalta fácilmente" | "Temperamental, que se altera fácilmente" | "Exaltarse" tiene matiz peninsular; "alterarse" es más natural en Colombia. |

**Regla:** modificar **solo** los ítems que el piloto cognitivo (§8) señale como problemáticos, manteniendo la equivalencia conceptual. Documentar cada cambio con justificación y remitir a Soto y a Gallardo-Pujol para visto bueno antes de fijar la versión es-CO.

---

## SECCIÓN 3 — BAREMOS PUBLICADOS

### 3.1 Tabla maestra de baremos disponibles para BFI-2 (60 ítems)

| País | Fuente APA + DOI | N | Estadísticos a nivel de DOMINIO | Estadísticos a nivel de FACETA | Percentiles publicados |
|---|---|---|---|---|---|
| EE. UU. (Internet, scale dev) | Soto, C. J., & John, O. P. (2017). DOI 10.1037/pspp0000096 | 1.000 adultos | α: E = .87, A = .83, C = .88, NE = .91, OM = .84 (M = .866) | α: rango .65–.84, M = .76 | [sin fuente verificada en publicación abierta; M y SD están en Tablas 5 y 7 del artículo paywalled] |
| EE. UU. (representativo adultos) | Soto, C. J. (2021). *Soc. Psych. Pers. Sci.* DOI 10.1177/1948550619900572 | 6.126 (LOOPR combinado) | α: E = .83, A = .79, C = .86, NE = .89, OM = .81 | [no reportado a nivel de faceta] | [no reportado] |
| EE. UU. (US adult reference) | "Descriptive statistics for the BFI-2" (recurso suplementario en colby.edu/.../the-bfi-2/) | — | Disponible para descarga libre | — | — |
| España | Gallardo-Pujol et al. (2022). DOI 10.1027/2698-1866/a000020 | 1.673 total | α reportadas en el meta-análisis de Husain et al. (2025, *BMC Psychology*, 13:20, DOI 10.1186/s40359-024-02271-x), subentrada "Gallardo-Pujol D., 2022, Spanish, BFI-2": E = .77, A = .77, C = .86, NE = .88, OM = .84 | [paywalled Hogrefe] | [sin fuente verificada abierta] |
| Meta-análisis multilingüe | Husain et al. (2025), *BMC Psychology*. DOI 10.1186/s40359-024-02271-x | 43.715 (57 estudios) | α pooled BFI+BFI-2: O = .80 (IC95% .79–.82), C = .83 (.82–.84), E = .83 (.82–.84), A = .77 (.76–.78), N = .85 (.84–.86) | — | — |
| México | Toledo-Fernández et al. (2022). DOI 10.14349/sumapsi.2022.v29.n2.4 | 2.025 (baseline) | α "satisfactorios" para dominios (Tabla 3 del artículo, en imagen embebida); test-retest BFI-2-XS: E r = .77, A r = .74, C r = .69, NE r = .73, OM r = .66 | [imagen embebida en SciELO] | [sin fuente verificada abierta] |
| Colombia | — | — | **[no existe baremo nacional publicado]** | — | — |

**Nota de transparencia (anti-alucinación):** No se reportan medias, desviaciones típicas y percentiles numéricos detallados de Gallardo-Pujol et al. (2022) ni de Toledo-Fernández et al. (2022) porque no se obtuvieron en fuente abierta verificable en formato texto (Hogrefe tiene el artículo con paywall y SciELO publica las tablas como imágenes). Se requiere el PDF original para extraerlos antes de codificar baremos en producción.

### 3.1.bis `[Aporte Gemini]` Matriz de medias y desviaciones típicas reportadas para España (a verificar)

Gemini cita la siguiente matriz de M y DT para la muestra española de Gallardo-Pujol et al. (2022, N = 1.673). Los valores se transcriben **textualmente desde el reporte de Gemini** y deben verificarse contra el PDF original de Hogrefe antes de cualquier uso operativo en el motor de scoring. Sirven como insumo provisional para el cálculo paramétrico de bandas P16/P50/P84 mientras no se acumula muestra colombiana propia.

| Dominio / Faceta | M (España) | DT (España) |
|---|---|---|
| **Extraversión (dominio)** | 3.30 | 0.57 |
| Sociabilidad (faceta) | 3.23 | 0.95 |
| Asertividad (faceta) | 3.36 | 0.64 |
| Nivel de Energía (faceta) | 3.55 | 0.76 |
| **Cordialidad / Amabilidad (dominio)** | 3.69 | 0.55 |
| Compasión (faceta) | 3.85 | 0.66 |
| Respeto (faceta) | 3.79 | 0.68 |
| Confianza (faceta) | 3.44 | 0.70 |
| **Responsabilidad (dominio)** | 3.26 | 0.64 |
| Organización (faceta) | 3.28 | 0.97 |
| Productividad (faceta) | 3.24 | 0.71 |
| Responsabilidad (faceta) | 3.27 | 0.63 |
| **Emocionalidad Negativa (dominio)** | 2.95 | 0.77 |
| Ansiedad (faceta) | 3.29 | 0.85 |
| Depresión (faceta) | 2.77 | 0.91 |
| Volatilidad Emocional (faceta) | 2.78 | 0.94 |
| **Apertura de Mente (dominio)** | 3.86 | 0.63 |
| Curiosidad Intelectual (faceta) | 4.05 | 0.70 |
| Sensibilidad Estética (faceta) | 3.65 | 0.96 |
| Imaginación Creativa (faceta) | 3.89 | 0.58 |

**Cómo derivar bandas paramétricas P16 / P50 / P84 (asumiendo distribución normal):** P16 ≈ M − 1·DT ; P50 ≈ M ; P84 ≈ M + 1·DT. **Advertencia:** todos los percentiles derivados de esta tabla son **provisionales** y mantienen el marcador `[sin fuente verificada]` hasta cotejar el PDF original Hogrefe.

### 3.2 Recomendación de baremo provisional para LATAM

**Opinión profesional:** Para el lanzamiento provisional en Colombia, **no calcular percentiles internos hasta tener N ≥ 1.000 usuarios colombianos**. Mientras tanto, usar como referencia descriptiva el baremo mexicano de Toledo-Fernández et al. (2022, N = 2.025), por ser la muestra latinoamericana más grande publicada con la **misma traducción española**, y mostrar al usuario:

> "Tu puntaje se compara con una muestra mexicana de 2.025 adultos (Toledo-Fernández et al., 2022). Aún no contamos con un baremo colombiano propio."

Como complemento, exponer las medias estadounidenses de Soto (2021, N = 6.126) solo en el dashboard interno, no al usuario final.

### 3.3 Roadmap para baremos colombianos propios

1. **Fase 0 (mes 1–3):** Definir esquema de cobertura demográfica (edad 18–65 estratificada por género, nivel educativo, región: Bogotá, Antioquia, Valle, Caribe, Eje Cafetero, Santanderes, Sur).
2. **Fase 1 (mes 4–9):** Recolección hasta N ≥ 1.500 usuarios completos con consentimiento explícito de uso anónimo para normalización. Re-calibrar mensualmente.
3. **Fase 2 (mes 10–12):** Calcular percentiles 5, 10, 16, 25, 50, 75, 84, 90, 95 por dominio y por faceta, estratificados por género y por grupo etario (18–25, 26–35, 36–50, 51–65). Reportar α y ω locales.
4. **Fase 3 (mes 13–18):** Publicar el baremo colombiano descriptivo en preprint (PsyArXiv) y enviar a *Suma Psicológica* o *Universitas Psychologica*.
5. **Trigger de re-baremo:** cada 3 años o tras ≥ 25% de cambio en composición sociodemográfica de la base.

`[Aporte Gemini]` **Método estadístico recomendado para el primer baremo CO.** Una vez se alcancen los primeros ~3.000 perfiles colombianos completados, aplicar *bootstrapping* (re-muestreo con reemplazo, ≥ 10.000 iteraciones) para calcular intervalos de confianza de los percentiles empíricos P5–P95. Esto reduce la sensibilidad a outliers y permite reportar bandas con incertidumbre cuantificada, en lugar de percentiles puntuales sin IC.

---

## SECCIÓN 4 — ÍTEMS INVERSOS NUMERADOS

**Hecho:** clave de codificación oficial (Colby PDF). "R" indica ítem inverso. NFR-28 marca los ítems sensibles de Ansiedad y Depresión.

| # | Faceta | Dominio | Clave | Notas |
|---|---|---|---|---|
| 1 | Sociabilidad | Extraversión | Directa | "outgoing, sociable" / "Abierto, sociable" |
| 2 | Compasión | Cordialidad | Directa | — |
| 3 | Organización | Responsabilidad | **Inversa (R)** | "tends to be disorganized" |
| 4 | Ansiedad | Emocionalidad negativa | **Inversa (R)** | NFR-28; "is relaxed, handles stress well" |
| 5 | Sensibilidad Estética | Apertura de mente | **Inversa (R)** | "has few artistic interests" |
| 6 | Asertividad | Extraversión | Directa | — |
| 7 | Respeto | Cordialidad | Directa | — |
| 8 | Productividad | Responsabilidad | **Inversa (R)** | "tends to be lazy" |
| 9 | Depresión | Emocionalidad negativa | **Inversa (R)** | NFR-28; "stays optimistic after experiencing a setback" |
| 10 | Curiosidad Intelectual | Apertura de mente | Directa | — |
| 11 | Nivel de Energía | Extraversión | **Inversa (R)** | "rarely feels excited or eager" |
| 12 | Confianza | Cordialidad | **Inversa (R)** | "tends to find fault with others" |
| 13 | Responsabilidad (faceta) | Responsabilidad | Directa | — |
| 14 | Volatilidad Emocional | Emocionalidad negativa | Directa | — |
| 15 | Imaginación Creativa | Apertura de mente | Directa | — |
| 16 | Sociabilidad | Extraversión | **Inversa (R)** | — |
| 17 | Compasión | Cordialidad | **Inversa (R)** | — |
| 18 | Organización | Responsabilidad | Directa | — |
| 19 | Ansiedad | Emocionalidad negativa | Directa | NFR-28 |
| 20 | Sensibilidad Estética | Apertura de mente | Directa | — |
| 21 | Asertividad | Extraversión | Directa | — |
| 22 | Respeto | Cordialidad | **Inversa (R)** | — |
| 23 | Productividad | Responsabilidad | **Inversa (R)** | — |
| 24 | Depresión | Emocionalidad negativa | **Inversa (R)** | NFR-28; "feels secure, comfortable with self" |
| 25 | Curiosidad Intelectual | Apertura de mente | **Inversa (R)** | — |
| 26 | Nivel de Energía | Extraversión | **Inversa (R)** | — |
| 27 | Confianza | Cordialidad | Directa | — |
| 28 | Responsabilidad (faceta) | Responsabilidad | **Inversa (R)** | — |
| 29 | Volatilidad Emocional | Emocionalidad negativa | **Inversa (R)** | — |
| 30 | Imaginación Creativa | Apertura de mente | **Inversa (R)** | — |
| 31 | Sociabilidad | Extraversión | **Inversa (R)** | — |
| 32 | Compasión | Cordialidad | Directa | — |
| 33 | Organización | Responsabilidad | Directa | — |
| 34 | Ansiedad | Emocionalidad negativa | Directa | NFR-28 |
| 35 | Sensibilidad Estética | Apertura de mente | Directa | — |
| 36 | Asertividad | Extraversión | **Inversa (R)** | — |
| 37 | Respeto | Cordialidad | **Inversa (R)** | — |
| 38 | Productividad | Responsabilidad | Directa | — |
| 39 | Depresión | Emocionalidad negativa | Directa | NFR-28 |
| 40 | Curiosidad Intelectual | Apertura de mente | Directa | — |
| 41 | Nivel de Energía | Extraversión | Directa | — |
| 42 | Confianza | Cordialidad | **Inversa (R)** | — |
| 43 | Responsabilidad (faceta) | Responsabilidad | Directa | — |
| 44 | Volatilidad Emocional | Emocionalidad negativa | **Inversa (R)** | — |
| 45 | Imaginación Creativa | Apertura de mente | **Inversa (R)** | — |
| 46 | Sociabilidad | Extraversión | Directa | — |
| 47 | Compasión | Cordialidad | **Inversa (R)** | — |
| 48 | Organización | Responsabilidad | **Inversa (R)** | — |
| 49 | Ansiedad | Emocionalidad negativa | **Inversa (R)** | NFR-28 |
| 50 | Sensibilidad Estética | Apertura de mente | **Inversa (R)** | — |
| 51 | Asertividad | Extraversión | **Inversa (R)** | — |
| 52 | Respeto | Cordialidad | Directa | — |
| 53 | Productividad | Responsabilidad | Directa | — |
| 54 | Depresión | Emocionalidad negativa | Directa | NFR-28 |
| 55 | Curiosidad Intelectual | Apertura de mente | **Inversa (R)** | — |
| 56 | Nivel de Energía | Extraversión | Directa | — |
| 57 | Confianza | Cordialidad | Directa | — |
| 58 | Responsabilidad (faceta) | Responsabilidad | **Inversa (R)** | — |
| 59 | Volatilidad Emocional | Emocionalidad negativa | Directa | — |
| 60 | Imaginación Creativa | Apertura de mente | Directa | — |

**Conteo de control:** 30 directos / 30 inversos = balance perfecto, conforme con Soto & John (2017).

**Acción de implementación:** en el schema PostgreSQL `bfi260_items`, columna `reverse_keyed BOOLEAN`, sembrar `TRUE` exactamente para los 30 ítems marcados con (R) en la columna "Clave". `[Aporte Gemini]` La instrucción algebraica para el motor backend es: `score_corregido = 6 − valor_respuesta` para cada ítem `reverse_keyed = TRUE`. Establecer auditoría de código que verifique el correcto mapeo de estos 30 indicadores antes de cada despliegue a producción; un error en la tabla de inversiones destruye la interpretabilidad factorial de forma irrecuperable.

---

## SECCIÓN 5 — TEXTOS DE INTERPRETACIÓN AL USUARIO (es-CO)

> Lenguaje descriptivo, aspiracional, no determinista. Tuteo cordial colombiano. No clínico. Máx. 80 palabras por texto. Bandas: BAJO ≤ P16; MEDIO P17–P83; ALTO ≥ P84.

### 5.1 Extraversión

**Descripción técnica interna:** Tendencia hacia la actividad social, la asertividad y la energía positiva; agrupa las facetas Sociabilidad, Asertividad y Nivel de Energía (Soto & John, 2017).

- **BAJO:** Tiendes a disfrutar los espacios tranquilos y a recargarte en solitario o con poca gente. Hablas cuando tienes algo que aportar y te tomas tu tiempo antes de tomar la iniciativa social. Ejemplo: prefieres una cena con un amigo cercano a una fiesta grande. ¿Qué espacios te dan más energía y cuáles te la quitan?
- **MEDIO:** Te mueves con flexibilidad entre la compañía y la soledad. A veces te animas a liderar y otras prefieres escuchar; ajustas tu energía según el momento. Ejemplo: disfrutas un plan grupal el sábado y un domingo tranquilo en casa. ¿En qué contextos sientes que estás dando tu mejor versión social?
- **ALTO:** Tiendes a buscar la compañía, tomar la iniciativa y mostrar entusiasmo con facilidad. Tu energía se nota en grupo y otras personas suelen seguir tu ritmo. Ejemplo: propones planes, abres conversaciones con desconocidos. ¿Cómo cuidas tus momentos de descanso para no agotar esa energía social?

### 5.2 Cordialidad (Agreeableness)

**Descripción técnica interna:** Orientación prosocial; agrupa Compasión, Respeto y Confianza.

- **BAJO:** Tiendes a ser directo/a y a poner el análisis crítico por encima de la armonía. Defiendes tu punto de vista sin rodeos y eres selectivo/a con tu confianza. Ejemplo: en una reunión, dices lo que piensas aunque incomode. ¿Cómo equilibras esa franqueza con cuidar los vínculos importantes?
- **MEDIO:** Sabes cuándo ceder y cuándo sostener tu posición. Confías de manera medida y tratas a los demás con respeto sin perder tu criterio. Ejemplo: escuchas a un colega y, si no estás de acuerdo, lo dices con tacto. ¿En qué situaciones te cuesta más mantener ese equilibrio?
- **ALTO:** Tiendes a priorizar la armonía, a confiar y a tratar a los demás con calidez. Te involucras emocionalmente en los problemas de la gente cercana. Ejemplo: eres quien media cuando hay un conflicto en el grupo. ¿Cómo cuidas tus propios límites cuando das mucho a los demás?

### 5.3 Responsabilidad (Conscientiousness)

**Descripción técnica interna:** Auto-regulación dirigida a metas; agrupa Organización, Productividad y Responsabilidad (faceta).

- **BAJO:** Te mueves mejor en lo espontáneo y flexible que en lo planeado. Las rutinas estrictas te pesan y prefieres improvisar. Ejemplo: arrancas el día sin agenda fija y vas viendo. ¿Qué sistema mínimo te ayudaría a no dejar pasar lo importante para ti?
- **MEDIO:** Combinas planificación con flexibilidad. Cumples lo esencial sin volverte rígido/a y te das margen para adaptarte. Ejemplo: tienes una lista de tareas, pero la ajustas cuando hace falta. ¿Qué hábitos te están dando los mejores resultados ahora?
- **ALTO:** Tiendes a organizar, terminar lo que empiezas y cumplir lo que prometes. Tu disciplina te abre puertas y suele inspirar confianza. Ejemplo: planeas tu semana, llegas a tiempo, dejas todo listo. ¿Cómo te das permiso para descansar sin sentir culpa?

### 5.4 Emocionalidad negativa (Negative Emotionality) — *Atención NFR-28: incluye facetas Ansiedad y Depresión*

**Descripción técnica interna:** Sensibilidad a estímulos estresantes y fluctuación emocional; agrupa Ansiedad, Depresión y Volatilidad Emocional. **No es un indicador clínico**; describe diferencias normales en cómo se experimentan las emociones.

- **BAJO:** Tiendes a mantener la calma frente al estrés y a recuperarte rápido de los contratiempos. Las situaciones tensas te afectan menos que a la mayoría. Ejemplo: ante una mala noticia, sigues funcionando y luego procesas. ¿Cómo te aseguras de no minimizar lo que sí merece tu atención emocional?
- **MEDIO:** Sientes el estrés y las emociones intensas como cualquier persona y, en general, los gestionas. Hay días más sensibles y otros más estables. Ejemplo: una semana difícil te desgasta, pero te repones con tus rutinas. ¿Qué te ayuda más a recuperar el equilibrio cuando lo pierdes?
- **ALTO:** Tiendes a registrar las emociones con mucha intensidad y a ser sensible a lo que pasa alrededor. Esa sensibilidad puede ser fuente de profundidad y empatía. Ejemplo: notas cambios en el ambiente que otros pasan por alto. ¿Qué estrategias te están funcionando para cuidarte cuando el día se siente pesado?

### 5.5 Apertura de mente (Open-Mindedness)

**Descripción técnica interna:** Interés intelectual, estético y creativo; agrupa Curiosidad Intelectual, Sensibilidad Estética e Imaginación Creativa.

- **BAJO:** Tiendes a moverte mejor en lo conocido y lo concreto que en lo abstracto. Prefieres soluciones prácticas y comprobadas. Ejemplo: eliges lo que ya sabes que funciona en vez de experimentar. ¿Qué nueva experiencia pequeña te animarías a probar este mes?
- **MEDIO:** Equilibras lo familiar con lo nuevo. Te abres a ideas distintas cuando ves que valen la pena y mantienes los pies en la tierra. Ejemplo: lees temas variados y eliges con criterio. ¿Qué tema te ha sorprendido positivamente últimamente?
- **ALTO:** Tiendes a explorar ideas, arte y formas distintas de pensar. La novedad te energiza y conectas conceptos que otros separan. Ejemplo: pasas de un libro de filosofía a una expo de arte sin transición. ¿Cómo aterrizas todas esas ideas en algo concreto en tu vida?

### 5.6 Nota operativa sobre textos a nivel de faceta (15 facetas × 3 bandas)

El BFI-2-60, a diferencia del BFI-2-S, habilita el reporte fiable a nivel de cada una de las 15 facetas (α faceta M = .76, rango .65–.84). Los textos interpretativos de las 15 facetas × 3 bandas ya están redactados en el consolidado del BFI-2-S (Sección 5), porque la estructura facetal es idéntica entre ambas formas. **Acción:** reutilizar literalmente los 45 textos de faceta del BFI-2-S consolidado en el tier Paid Premium del BFI-2-60. Validar consistencia tonal en QA. Si el piloto cognitivo (§8) detecta fricciones en algún texto, ajustar puntualmente y propagar el cambio a ambos productos para mantener equivalencia narrativa.

---

## SECCIÓN 6 — LICENSE ACQUISITION PLAN

### 6.1 Titular y contacto

- **Christopher J. Soto**, Department of Psychology, Colby College, 5550 Mayflower Hill, Waterville, ME 04901, EE. UU. — email: `csoto@colby.edu`. Sitio: `https://www.colby.edu/.../personality-lab/the-bfi-2/`.
- **Oliver P. John**, Department of Psychology, University of California, Berkeley — email: `ojohn@berkeley.edu`. Sitio: `https://psychology.berkeley.edu/people/oliver-p-john`.
- **Berkeley Personality Lab — solicitudes comerciales:** `ucbpersonalitylab@gmail.com` (canal explícito declarado para uso comercial del BFI; aplica al BFI-2 por extensión y debe incluirse en cualquier solicitud B2C).
- Para la traducción al español: **David Gallardo-Pujol** (`david.gallardo@ub.edu`), Universitat de Barcelona, y **Luis Oceja** (`luis.oceja@uam.es`), Universidad Autónoma de Madrid.
- `[Aporte Gemini]` **Posible canal editorial:** Hogrefe Publishing gestiona distribuciones europeas del BFI-2 (la adaptación española está publicada en *Psychological Test Adaptation and Development* de Hogrefe). Si Soto y John derivan la negociación a una oficina de transferencia tecnológica, Hogrefe es un punto plausible de redireccionamiento; mantener en el radar pero **no contactar primero** — la autoridad de licencia comercial reside en los autores.

### 6.2 Práctica histórica de concesión

**Hecho:** Los autores conceden por defecto permiso para uso personal y de investigación de forma gratuita. El sitio Colby señala literalmente: *"Permission is granted for personal and research use of the BFI-2"* y el PDF español indica *"No hay costes asociados al uso del BFI-2 en su versión española"*, mencionando que se considera *"código abierto"* en la práctica científica. El paper original (Soto & John, 2017, nota del autor) invita a contactar a los autores para iniciar traducciones, formas cortas u otras adaptaciones. **No se documentan precios públicos** para uso comercial.

**Inferencia:** El uso B2C comercial en una plataforma freemium con cobro de tier Premium **no está cubierto explícitamente** por la licencia abierta declarada en el sitio Colby. Se requiere consulta y permiso por escrito antes de monetizar el instrumento.

### 6.3 Pasos para solicitar

1. Enviar email a `csoto@colby.edu` con copia a `ojohn@berkeley.edu`, a `ucbpersonalitylab@gmail.com` y, dado que se usará la versión española, a `david.gallardo@ub.edu`. Asunto sugerido: *"Permission request — commercial B2C educational use of BFI-2-60 (Spanish, Gallardo-Pujol et al. 2022)"*.
2. Adjuntar one-pager con: propósito educativo no clínico, modelo freemium, país, idioma, número estimado de aplicaciones/año, cómo se reportarán los resultados al usuario, plan de citación y atribución, política de datos y de uso anónimo para baremo colombiano.
3. Negociar términos por escrito: alcance geográfico, vigencia, derecho a publicar el baremo, atribución requerida, restricciones (no usar en selección de personal ni diagnóstico clínico).
4. Recoger contrato o autorización firmada antes de pasar a producción del tier Premium.
5. Esperar respuesta: 2–6 semanas hábiles típico para correos académicos.

### 6.4 Borrador de email inicial (en inglés)

> **Subject:** Permission request — commercial educational use of the BFI-2 (Spanish adaptation, Gallardo-Pujol et al., 2022) on a B2C self-knowledge platform in Latin America
>
> Dear Dr. Soto and Dr. John,
>
> My name is [NAME] and I direct DescubreMe, a Spanish-language web platform offering deep self-knowledge tools to Latin American adults (initial focus: Colombia). The service is strictly educational and orientational — it is not used for clinical diagnosis, treatment, or personnel selection.
>
> We would like to integrate the full 60-item BFI-2, using the Spanish adaptation by Gallardo-Pujol, Rouco, Cortijos-Bernabeu, Oceja, Soto, and John (2022, Psychological Test Adaptation and Development; DOI 10.1027/2698-1866/a000020), as an optional premium module on top of a freemium tier already using the BFI-2-S.
>
> We are writing to (a) confirm that this commercial educational deployment is acceptable to you as copyright holders; (b) discuss any required license terms, attribution, audit, or fee; (c) explore whether we may share anonymous Colombian normative data back with you once we reach N ≥ 1,000 respondents, in order to publish a Colombian descriptive baremo as a peer-reviewed open-access paper co-authored by your team if of interest.
>
> The platform commits to:
> – Citing Soto & John (2017) and Gallardo-Pujol et al. (2022) prominently on the report.
> – Presenting results as normal-range descriptive feedback, with explicit non-clinical and non-selection disclaimers, including reverse-keyed item handling and an NFR-28 containment flow for users scoring high on Anxiety/Depression facets.
> – Not modifying item wording without your written approval.
>
> A one-page summary of the deployment is attached. We would deeply appreciate guidance on the appropriate licensing path and any conditions you wish to set.
>
> Thank you for your time and for making the BFI-2 available to the research community.
>
> Sincerely,
> [NAME, ROLE, ORG, COUNTRY, EMAIL, WEBSITE]

### 6.5 Costo esperado y rangos

- **Investigación / sin fines de lucro / educativo no comercial:** USD 0 (consistente con el aviso del sitio Colby).
- **Uso comercial B2C educativo del BFI-2:** sin tarifa pública. **Inferencia:** En la práctica académica, los autores tienden a permitir uso comercial educativo bajo atribución completa; podrían pedir un royalty simbólico o ningún cobro a cambio de acceso a datos anonimizados para investigación. Rango estimado tentativo: **USD 0–5.000/año** a negociar; flag de presupuesto contingente USD 10.000 por si se exige licencia formal con auditor.
- **Uso para selección de personal o diagnóstico clínico:** **fuera del alcance** del proyecto y, además, los autores típicamente desaconsejan estos usos en sus comunicaciones públicas.

### 6.6 Plan B — HEXACO-60

**Hecho:** HEXACO-60 (Ashton & Lee, 2009, *Journal of Personality Assessment*, 91(4), 340–345; DOI 10.1080/00223890902935878). Mide 6 dimensiones (Honesty-Humility, Emotionality, Extraversion, Agreeableness, Conscientiousness, Openness) con 10 ítems cada una. El sitio oficial `hexaco.org/hexaco-inventory` indica literalmente: *"You can download any of these forms free of charge, but only for the purpose of non-profit academic research. (Please note that we do not allow researchers to collect data through an online survey site or an app accessible by the general public. Those online survey pages or apps must either be password-protected or not searchable through search engines.)"* A diferencia del BFI-2, el HEXACO tiene **tarifa comercial pública** declarada por sus autores en `hexaco.org/nonacademicuse.htm`: *"The royalty/license fee for one administration of the inventory is (Canadian) $2, and the minimum purchase of the inventory is 50 administrations (C$100)"*.

**Opinión profesional:** Para uso comercial B2C, HEXACO-60 tiene una restricción más fuerte y un costo unitario explícito (C$2 por aplicación). A volumen 10.000 aplicaciones/año, el costo licenciado sería C$20.000 ≈ USD 14.700/año. Como Plan B:
- Vía A: pedir permiso comercial directamente a Kibeom Lee (`kibeomlee@ucalgary.ca`, Universidad de Calgary) y Michael C. Ashton (`mashton@brocku.ca`, Brock University), aceptando la tarifa publicada. Probabilidad de éxito alta (precio público); añade la dimensión Honesty-Humility, valiosa para autoconocimiento.
- Vía B: usar **IPIP-HEXACO** (dominio público, sin permiso necesario, descargable desde `https://ipip.ori.org`), pero con propiedades psicométricas algo inferiores al HEXACO-PI-R y sin facetas idénticas.
- Vía C: ampliar la oferta del BFI-2-S en lugar del 60 si la licencia comercial del 60 se vuelve restrictiva.

`[Aporte Gemini]` **Arquitectura desacoplada para hot-swap de instrumento.** Para minimizar el costo de cambio si el Plan B se activa, diseñar el motor de scoring de forma paramétrica: separar el servicio de presentación de ítems (Item Presentation Microservice) del servicio de scoring (Scoring Engine), y mantener el mapeo `item_id → dominio/faceta → clave directa/inversa` en un archivo de configuración JSON externo. Bajo ese patrón, una migración a HEXACO-60 requiere sustituir el JSON maestro sin reescribir lógica de negocio. Cronograma de contingencia razonable: semana 1 redacción de PRD + firma legal + descarga; semana 2 traducción técnica es-CO; semana 3 reescritura de textos BAJO/MEDIO/ALTO para las 6 dimensiones; semana 4 integración, QA y staging.

---

## SECCIÓN 7 — DISCLAIMERS Y MITIGACIONES ESPECÍFICAS

### 7.1 Disclaimer pre-test (es-CO, ≤100 palabras)

> Vas a responder un cuestionario de personalidad llamado BFI-2 (60 preguntas, 8 a 10 minutos). Esta herramienta es **educativa y de autoconocimiento**, no es un diagnóstico médico, psicológico ni una prueba de selección de personal. Tus respuestas son confidenciales y se usarán anónimamente para mejorar el servicio y construir un referente colombiano. No hay respuestas buenas o malas: contesta con sinceridad pensando cómo eres usualmente, no cómo te gustaría ser. Si en algún momento te sientes incómodo/a, puedes pausar o cerrar el test. ¿Quieres continuar?

### 7.2 Ítems sensibles que activan NFR-28

**Hecho:** Las facetas **Ansiedad** (ítems 4R, 19, 34, 49R) y **Depresión** (ítems 9R, 24R, 39, 54) miden sensibilidad emocional normal, no patología. Tres de los ocho ítems contienen lenguaje que puede activar emocionalmente a usuarios sensibles:
- Ítem 39: "Que a menudo se siente triste"
- Ítem 54: "Que tiende a sentirse deprimido/a, melancólico/a"
- Ítem 34: "Que se preocupa mucho"

**Trigger NFR-28** (mostrar mensaje de contención post-test):
- **Trigger principal:** puntaje crudo en faceta Depresión ≥ 16 (de 20 máximo) **O** en faceta Ansiedad ≥ 16. Equivalente aproximado a media ≥ 4.0/5 sostenida.
- **Trigger secundario:** respuesta = 5 ("Muy de acuerdo") en el ítem 39 ("a menudo se siente triste") **Y** respuesta = 5 en el ítem 54 ("se siente deprimido/a, melancólico/a").
- **Trigger de seguridad inmediata:** **no aplica** — el BFI-2 no contiene ítems de ideación suicida; **no se debe inferir** riesgo suicida a partir del BFI-2.

`[Aporte Gemini]` **Mitigación visual UX para tier Premium.** Está prohibido usar codificación semafórica punitiva (rojos, negros, grises oscuros) para representar bandas altas en facetas de Ansiedad, Depresión y Volatilidad Emocional. Usar paletas de tonos fríos neutrales (azules, violetas). El equipo de UX Writing debe asegurar que el copy enaltezca la sensibilidad emocional y la riqueza introspectiva como fortalezas adaptativas, evitando que el usuario de pago se sienta juzgado. Ejecutar pruebas A/B de psicología del color en el primer mes post-lanzamiento.

### 7.3 Mensaje de contención (es-CO, ≤120 palabras)

> Algunas de tus respuestas indican que has estado sintiendo tristeza, preocupación o tensión con frecuencia en este último tiempo. Eso es información que vale la pena escuchar, no juzgar. El BFI-2 **no es un diagnóstico**: solo describe cómo te estás sintiendo en general. Si esta carga emocional te está afectando el sueño, los estudios, el trabajo o tus relaciones por más de dos semanas, te invitamos a hablar con un profesional de salud mental. En Colombia puedes llamar gratis 24/7 a la **Línea 106** (Bogotá) o a la **Línea 192 opción 4** (nacional). Cuidarte también es un acto de autoconocimiento. ¿Quieres ver tus resultados ahora o prefieres tomar una pausa?

### 7.4 Líneas de ayuda Colombia vigentes (2026)

**Hecho:** verificadas en fuentes oficiales (Minsalud, Secretaría Distrital de Salud de Bogotá, Alcaldía de Bogotá; consultas 2025–2026):

| Línea | Cobertura | Tipo | Horario | Canales |
|---|---|---|---|---|
| **123** | Nacional | Emergencias generales (incluida urgencia salud mental) | 24/7 | Telefónico |
| **106 "El poder de ser escuchado"** | Bogotá (Secretaría Distrital de Salud) | Apoyo psicológico y crisis no urgente | 24/7 | Llamada 106, WhatsApp `300 754 8933`, Facebook Línea106, correo `linea106@saludcapital.gov.co` |
| **192 opción 4** | Nacional (Minsalud) | Teleorientación en salud mental | 24/7 | Telefónico gratis fijo o celular |
| **Línea de la Vida** | Barranquilla | Apoyo emocional | 24/7 | `(605) 339 99 99` |
| **Línea Amiga Saludable** | Medellín | Apoyo emocional | 24/7 | `(604) 444 44 48`, WhatsApp `300 723 1123` |
| **Línea Calma** | Nacional (apoyo a hombres) | Emociones difíciles, ira, celos | 24/7 | `01 8000 423 614` |
| **Línea Púrpura** | Bogotá | Violencia de género | 24/7 | `01 8000 112 137`, WhatsApp `300 755 1846` |

**Nota de mantenimiento:** revisar trimestralmente la vigencia de estos canales antes de cada release.

### 7.5 Disclaimer post-test (es-CO, ≤80 palabras)

> Este reporte describe tendencias generales de tu personalidad en cinco dimensiones, basado en el BFI-2 (Soto & John, 2017; adaptación española Gallardo-Pujol et al., 2022). **No es un diagnóstico clínico ni un predictor de tu desempeño laboral o académico.** Las personas cambian: tu perfil de hoy puede ser distinto en unos años. Usa estos resultados como un punto de partida para conversar contigo mismo/a, no como una etiqueta.

---

## SECCIÓN 8 — SUGERENCIAS DE PILOTO COGNITIVO COLOMBIA

### 8.1 Tamaño y características de la muestra

**Opinión profesional:** N = 30–45 participantes, mayores de edad, residentes en Colombia, distribuidos así:
- 5 regiones (Bogotá, Antioquia, Valle, Caribe, Eje Cafetero), 6–9 personas por región.
- Distribución por género: ~50/50.
- Distribución educativa: 1/3 educación media o menor, 1/3 técnica/tecnológica, 1/3 universitaria o posgrado.
- Edad: 18–65, con cuotas en 18–25, 26–40, 41–65.
- Criterio de exclusión: trabajar como psicólogo/a clínico/a o de selección (sesgo de familiaridad con instrumentos).

### 8.2 Protocolo think-aloud

1. **Tarea principal:** responder los 60 ítems en pantalla, en voz alta, narrando lo que piensan al leer cada uno. Grabar audio.
2. **Sonda específica obligatoria** en ítems candidatos a fricción léxica (8, 9, 14, 18, 37, 48, 51, 58, 59): "¿Qué entendiste con esa palabra? ¿La dirías así en tu día a día? Si no, ¿cómo la dirías?"
3. **Sonda para ítems NFR-28** (4, 9, 19, 24, 34, 39, 49, 54): preguntar al final del bloque, no en línea, para no inducir reactividad: "¿Hubo alguna pregunta que se te quedó dando vueltas?".
4. **Cierre:** Cuestionario breve de aceptabilidad: claridad general (Likert 1–5), tono emocional (cómodo / incómodo / muy incómodo), tiempo percibido, intención de recomendar el test.
5. **Logística:** entrevista remota por videollamada de 50–70 min, compensación simbólica (bono digital ~COP $50.000).

`[Aporte Gemini]` **Cronometría digital de latencia.** Registrar el tiempo (en milisegundos) que cada participante tarda en responder cada uno de los 60 ítems. Latencias > 1.5 desviaciones típicas sobre el promedio del participante son indicador automático de fricción cognitiva y deben revisarse en el debrief incluso si el participante no lo verbalizó. Particular atención a los ítems inversos: la doble negación inherente puede colapsar la comprensión en perfiles con menor escolaridad.

### 8.3 Criterios para aceptar / re-adaptar ítem

- **Aceptar tal cual:** ≥ 80% de la muestra entiende el ítem en una sola lectura **y** ningún subgrupo regional reporta extrañeza léxica.
- **Re-adaptar léxico (manteniendo significado):** 20–40% reporta fricción o pide reformular (o la latencia media del ítem está > 1.5 DT sobre el promedio del banco). Generar dos alternativas, retraducir al inglés, contrastar con el original y enviar la propuesta a Gallardo-Pujol y Soto para visto bueno.
- **Re-adaptar significado conceptual:** > 40% confunde el ítem con otro constructo. Marca de alerta crítica; escalar a comité de adaptación, NO mover sin acuerdo de autores.
- **No tocar ítems NFR-28** sin acuerdo expreso con autores: cambios en facetas Ansiedad/Depresión afectan la integridad de la escala y los disparadores de contención.

### 8.4 Output esperado del piloto

1. Versión es-CO del BFI-2 con cambios léxicos mínimos justificados, lista para producción.
2. Reporte de aceptabilidad (claridad, tono, tiempo).
3. Lista de ítems críticos a re-validar en muestra ampliada (N ≥ 200) antes del lanzamiento masivo.
4. Decisión binaria por ítem: **mantener** vs. **re-adaptar**, firmada por adaptador externo (psicometrista colombiano con experiencia en adaptaciones transculturales).
5. Versión preliminar de microcopia (tooltips, mensaje de progreso, NFR-28) probada conductualmente.
6. `[Aporte Gemini]` Validación empírica del umbral de tiempo de aplicación prometido (objetivo: < 10 minutos para el 85% de los usuarios). Si el percentil 85 supera 12 min, revisar microcopia y onboarding para reducir fricción y proteger la tasa de finalización del tier Premium.

---

## SECCIÓN 9 — GAPS Y PREGUNTAS ABIERTAS

1. **¿Permiso comercial explícito de Soto & John y de Gallardo-Pujol?** No documentado para uso B2C freemium. **Plan:** ejecutar §6.4 (email) y registrar respuesta por escrito. Plazo: 60 días antes del lanzamiento del tier Premium. Sin respuesta o respuesta negativa → activar Plan B HEXACO con permiso explícito (C$2/aplicación) o mantener solo BFI-2-S.
2. **¿Medias, desviaciones típicas y percentiles numéricos exactos de Gallardo-Pujol et al. (2022) y Toledo-Fernández et al. (2022)?** Las tablas detalladas están detrás de paywall (Hogrefe) o como imágenes embebidas (SciELO). La matriz M/DT integrada en §3.1.bis desde Gemini debe verificarse contra el PDF original. **Plan:** acceder al PDF vía biblioteca de una universidad colombiana (Universidad de los Andes, Javeriana, Nacional) o pedir el reprint directamente a `david.gallardo@ub.edu` y al primer autor mexicano. Plazo: antes de codificar baremos provisionales.
3. **¿Invarianza de medición LATAM vs. España?** La invarianza escalar no se estableció siquiera dentro de la muestra española (Gallardo-Pujol et al., 2022). Comparar puntajes colombianos vs. españoles vs. mexicanos requiere precaución. **Plan:** una vez se tenga N ≥ 600 colombianos, calcular invarianza configural/métrica/escalar contra el dataset español del OSF (osf.io/kp572/) y publicar.
4. **¿Existe una adaptación colombiana en marcha que no esté aún publicada?** **Plan:** consultar con Asociación Colombiana para el Avance de las Ciencias del Comportamiento (ABA Colombia) y con grupos de personalidad de Universidad de los Andes, Javeriana, Nacional y El Bosque; búsqueda en Redcol y SciELO Colombia con corte semestral.
5. **¿Es suficiente la traducción peninsular para Colombia sin alterar significados?** **Plan:** piloto cognitivo §8; si > 5 ítems requieren cambio léxico, validar empíricamente la versión es-CO en muestra ≥ 200 antes de operacionalizar baremos.
6. `[Aporte Gemini]` **¿Invarianza de medición entre Generación Z colombiana y muestras originales adultas?** La invarianza de género en España está confirmada, pero la invarianza etaria intracultural en LATAM permanece desconocida. **Plan:** automatizar una rutina de Análisis Factorial Confirmatorio Multigrupo (MGCFA) cuando la base nacional acumule ~2.000 registros. Si la invarianza escalar se rompe en cohortes jóvenes (18–25), construir tablas de estandarización por rango etario para preservar la fiabilidad del producto.
7. `[Aporte Gemini]` **¿Cómo neutralizar el costo emocional para usuarios del tier Premium que reciben puntajes altos en Emocionalidad Negativa?** **Plan:** ya integrado en §7.2 como nota UX (color frío + tono aspiracional). Verificar con pruebas A/B post-lanzamiento que la tasa de cancelación de suscripción de usuarios con perfil ALTO en facetas Ansiedad/Depresión no supere la base; si lo hace, ajustar copy del reporte y revisitar el flujo NFR-28.

---

## SECCIÓN 10 — REFERENCIAS (APA 7)

Ashton, M. C., & Lee, K. (2009). The HEXACO–60: A short measure of the major dimensions of personality. *Journal of Personality Assessment, 91*(4), 340–345. https://doi.org/10.1080/00223890902935878

Cemalcilar, Z., Baruh, L., Kezer, M., Soto, C. J., Sumer, N., & John, O. P. (2021). Testing the BFI-2 in a non-WEIRD community sample. *Personality and Individual Differences, 182*, 111087. https://doi.org/10.1016/j.paid.2021.111087

Colby Personality Lab. (n.d.). *The Big Five Inventory–2 (BFI-2)*. Colby College. Recuperado el 18 de mayo de 2026, de https://www.colby.edu/academics/departments-and-programs/psychology/research-opportunities/personality-lab/the-bfi-2/

Denissen, J. J. A., Geenen, R., Soto, C. J., John, O. P., & van Aken, M. A. G. (2020). The Big Five Inventory–2 (BFI-2): Replication of psychometric properties in a Dutch adaptation and first evidence for the discriminant predictive validity of the facet scales. *Journal of Personality Assessment, 102*(3), 309–324. https://doi.org/10.1080/00223891.2018.1539004

Gallardo-Pujol, D., Rouco, V., Cortijos-Bernabeu, A., Oceja, L., Soto, C. J., & John, O. P. (2022). Factor structure, gender invariance, measurement properties, and short forms of the Spanish adaptation of the Big Five Inventory-2. *Psychological Test Adaptation and Development, 3*(1), 44–69. https://doi.org/10.1027/2698-1866/a000020

Genise, G., & Ungaretti, J. (2020). El Inventario de los Cinco Grandes Factores de Personalidad en el contexto argentino: puesta a prueba de los modelos BFI. *Diversitas — Perspectivas en Psicología, 16*(2), 285–301. http://www.scielo.org.co/pdf/dpp/v15n2/1794-9998-dpp-15-02-285.pdf  *(`[Aporte Gemini]`)*

Husain, W., Haddad, A. M., Husain, M. A., Ghazzawi, H., Trabelsi, K., Ammar, A., Saif, Z., Pakpour, A. H., & Jahrami, H. (2025). Reliability generalization meta-analysis of the internal consistency of the Big Five Inventory (BFI) by comparing BFI (44 items) and BFI-2 (60 items) versions controlling for age, sex, language factors. *BMC Psychology, 13*(20). https://doi.org/10.1186/s40359-024-02271-x

Lee, K., & Ashton, M. C. (2004). Psychometric properties of the HEXACO Personality Inventory. *Multivariate Behavioral Research, 39*(2), 329–358. https://doi.org/10.1207/s15327906mbr3902_8

Ministerio de Salud y Protección Social de Colombia. (2025). *Directorio nacional de líneas territoriales de atención en salud mental en Colombia* [PDF]. https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/VS/PP/ET/directorio-salud-mental-prevencion-suicidio-minsalud.pdf

Secretaría Distrital de Salud de Bogotá. (n.d.). *Línea 106 — Quiénes somos*. https://www.saludcapital.gov.co/Paginas2/Quienes_Somos_linea106.aspx

Soto, C. J. (2021). Do links between personality and life outcomes generalize? Testing the robustness of trait–outcome associations across gender, age, ethnicity, and analytic approaches. *Social Psychological and Personality Science, 12*(1), 118–130. https://doi.org/10.1177/1948550619900572

Soto, C. J., & John, O. P. (2017a). The next Big Five Inventory (BFI-2): Developing and assessing a hierarchical model with 15 facets to enhance bandwidth, fidelity, and predictive power. *Journal of Personality and Social Psychology, 113*(1), 117–143. https://doi.org/10.1037/pspp0000096

Soto, C. J., & John, O. P. (2017b). Short and extra-short forms of the Big Five Inventory–2: The BFI-2-S and BFI-2-XS. *Journal of Research in Personality, 68*, 69–81. https://doi.org/10.1016/j.jrp.2017.02.004

Toledo-Fernández, A., Pérez-Matus, S., & Villalobos-Gallegos, L. (2022). The Big Five Inventory-2: Confirmatory factor analysis and latent profiles in a Mexican sample. *Suma Psicológica, 29*(2), 119–128. https://doi.org/10.14349/sumapsi.2022.v29.n2.4

---

## APÉNDICE A — Mapa de aportes consolidados desde Gemini

| # | Aporte | Sección donde se integró | Valor agregado | Verificación recomendada |
|---|---|---|---|---|
| A1 | Sinergia de stack con BFI-2-S: mismo banco de ítems, reuso de código base de scoring | §0 (Resumen ejecutivo, párrafo final) | Argumento de bajo costo de ingeniería para justificar el upgrade Premium; útil para el business case y el PRD. | Verificable directamente en el code base del BFI-2-S y en la documentación de Soto & John (2017b). |
| A2 | Restricción de orden de presentación de los 60 ítems (no aleatorizar) | §1.3 | Decisión de producto crítica: si el frontend aleatoriza, se rompe el control de aquiescencia. Vale la pena documentarlo como NFR. | Verificable en Soto & John (2017a) y en la nota del PDF Colby. |
| A3 | Mención de Genise & Ungaretti (2020) como referencia léxica argentina del Big Five | §2.1 (fila Argentina en tabla) | Punto de contraste dialectal para Cono Sur; útil si se expande a Argentina post-Colombia. No es validación del BFI-2-60. | URL SciELO en §10; verificable. |
| A4 | Matriz de M y DT a nivel dominio y faceta para muestra española (N=1.673) | §3.1.bis (nueva subsección) | Insumo provisional para calcular bandas paramétricas P16/P50/P84 antes de tener muestra colombiana propia. **El aporte de mayor valor operativo de Gemini.** | **Verificar cifras contra el PDF original Hogrefe (DOI 10.1027/2698-1866/a000020)** antes de codificar en el motor de scoring. Marcado [sin fuente verificada] hasta cotejar. |
| A5 | Bootstrapping con ≥ 10.000 iteraciones para baremo CO sobre los primeros ~3.000 perfiles | §3.3 (cierre del roadmap) | Buena práctica psicométrica moderna; reporta IC para los percentiles en lugar de puntos sin incertidumbre. | Estándar de la literatura; sin verificación adicional. |
| A6 | Instrucción algebraica explícita para inversión de ítems: `score_corregido = 6 − valor_respuesta` | §4 (acción de implementación) | Especificación operativa para el motor de scoring; reduce ambigüedad para el equipo de ingeniería. | Estándar psicométrico para escalas Likert 1–5; sin verificación adicional. |
| A7 | Hogrefe Publishing como posible canal editorial intermedio para licencia | §6.1 (contactos) | Información útil si Soto/John derivan negociación. Mantener como nota; no contactar primero. | Hogrefe publica la adaptación española; verificable en colby.edu y hogrefe.com. |
| A8 | Arquitectura desacoplada (microservicios + JSON paramétrico) para hot-swap de instrumento si Plan B se activa | §6.6 (cierre de Plan B) | Reduce el costo y el plazo de migración a HEXACO-60 a 4 semanas; protege el roadmap Premium ante negativa de Soto/John. | Recomendación de ingeniería; sin verificación externa. |
| A9 | Restricción cromática UX para facetas altas en Ansiedad/Depresión/Volatilidad | §7.2 (nota UX) | Protege la experiencia del usuario premium y reduce el riesgo de cancelación post-resultados emocionalmente cargados. | A validar con pruebas A/B post-lanzamiento; sin verificación bibliográfica. |
| A10 | Cronometría digital de latencia ítem-por-ítem en el piloto cognitivo | §8.2 (paso 3) y §8.3 | Indicador objetivo y barato de fricción cognitiva que complementa el think-aloud; revela problemas que el participante no verbaliza. | Buena práctica de UX research; sin verificación adicional. |
| A11 | Validación empírica del umbral de 10 minutos de aplicación en el piloto | §8.4 (entregable 6) | KPI directo de producto; protege la tasa de finalización (objetivo declarado 85%). | KPI interno; sin verificación externa. |
| A12 | Gap nuevo: invarianza de medición entre Generación Z colombiana y muestras adultas originales | §9 (punto 6) | Pregunta empírica relevante para el roadmap psicométrico; rutina MGCFA al alcanzar 2.000 registros. | Tema abierto en la literatura; sin disputa. |
| A13 | Gap nuevo: costo emocional para usuarios Premium con puntajes altos en Emocionalidad Negativa | §9 (punto 7) | Conecta el diseño UX (A9) con la salud del producto (churn). | Métrica interna; sin verificación externa. |

**Lectura general del Apéndice A:** Gemini aportó 13 elementos integrables. De ellos, **A4 (matriz M/DT España)** es el aporte de mayor valor operativo y debe verificarse contra el PDF original Hogrefe antes de codificar en producción. A2 y A6 son decisiones técnicas con justificación bibliográfica directa. A8, A9, A10 y A11 son aportes de arquitectura de producto y diseño UX que enriquecen el Pack más allá de la psicometría estricta. A12 y A13 abren preguntas empíricas legítimas para el roadmap. Ningún aporte de Gemini contradice información del Pack de Claude; todos son complementarios.

---

## APÉNDICE B — Notas de consolidación (metodología)

**Origen del documento.** Este consolidado combina dos investigaciones independientes producidas en mayo 2026:

1. `Prompt_13_BFI-2-60_IAR.Claude.md` — Implementation Acquisition Pack completo de 10 secciones siguiendo el prompt v1.0. Cumplimiento: 100% de los requisitos del brief. Entregó lista literal de los 60 ítems en EN y ES, clave completa de los 30 ítems inversos con dimensión y faceta, baremos publicados con DOIs, plan de licencia con email copy-paste, disclaimers + NFR-28 + tabla de líneas Colombia, protocolo de piloto cognitivo y 13 referencias APA 7.
2. `Prompt_13_BFI-2-60_IAR.Gemini.md` — Reporte académico-narrativo con las 10 secciones formalmente nombradas pero con cobertura parcial: NO incluyó lista literal de los 60 ítems en EN ni en ES, §5 cubierta solo a nivel de faceta (no dominio), §6 sin email copy-paste, §7 sin tabla de líneas Colombia, §8 demasiado breve. Aportes principales: matriz M/DT España, restricción de orden de presentación, instrucción algebraica de inversión, arquitectura desacoplada vía JSON paramétrico, cronometría de latencia en piloto, mitigación visual UX para Premium, gap de invarianza etaria y gap de costo emocional Premium.

**Criterio de consolidación aplicado.**
- **Estructura:** se preserva íntegra la del Pack de Claude (10 secciones + Apéndices A y B nuevos).
- **Contenido operativo (ítems literales, baremos publicados, textos al usuario, email de licencia, disclaimers, NFR-28, piloto):** se mantiene el de Claude porque Gemini no lo produjo con el mismo nivel de granularidad o no lo produjo en absoluto.
- **Aportes académicos, de arquitectura y de UX desde Gemini:** se integran SOLO cuando aportan información nueva verificable y útil para producto. Cada aporte se marca con `[Aporte Gemini]` en el lugar donde aparece, y se traza en el Apéndice A con nivel de verificación.
- **Discrepancias entre Claude y Gemini:** no se encontraron discrepancias factuales sustanciales en este test (autores, año, DOI principal, contactos, lista de ítems inversos en cuanto a numeración coincide). Donde ambos tocaron el mismo punto (Gallardo-Pujol español, Toledo-Fernández mexicano), las cifras y referencias coinciden.

**Reutilización del consolidado BFI-2-S.**
- §5 (textos a nivel faceta): los 45 textos de faceta del BFI-2-S consolidado se reutilizan literalmente en el BFI-2-60 porque la estructura facetal es idéntica entre ambas formas. La sinergia se documenta en §5.6.
- §6 (licencia) y §7 (NFR-28): los contactos, el procedimiento, las líneas Colombia y los triggers son comunes a ambas formas. Una sola solicitud de permiso debería cubrir BFI-2-S y BFI-2-60 simultáneamente.
- §8 (piloto cognitivo): si el piloto del BFI-2-S ya se ejecutó, ampliar la muestra para cubrir los 30 ítems adicionales del BFI-2-60 (ítems no compartidos), no rehacer todo desde cero.

**Limitaciones del consolidado.**
- La matriz M/DT de España transcrita desde Gemini (§3.1.bis) **debe verificarse contra el PDF Hogrefe** antes de codificarse en el motor de scoring. Mantiene marcador `[sin fuente verificada]`.
- Las cifras del meta-análisis de Husain et al. (2025) reportadas en §3.1 son del paper open access; verificadas.
- Las medias y desviaciones típicas detalladas de la muestra mexicana (Toledo-Fernández et al., 2022) siguen sin transcribirse al consolidado porque están como imagen embebida en SciELO; pendiente de extracción manual o pedido de reprint.
- La política comercial efectiva de Soto, John y Berkeley Personality Lab sobre el BFI-2 sigue siendo el bloqueador #1 para el tier Premium.

---

*Fin del Implementation Acquisition Pack v1.0 — BFI-2-60 — CONSOLIDADO · DescubreMe · LATAM/Colombia · Mayo 2026*
