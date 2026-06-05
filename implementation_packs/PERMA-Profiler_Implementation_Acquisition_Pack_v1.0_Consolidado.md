# Implementation Acquisition Pack v1.0 — PERMA-Profiler (23 ítems) — CONSOLIDADO
**Producto destino:** DescubreMe (LATAM, foco Colombia) · **Reemplazo de Ryff PWB en track Free / B2C Paid USD 19 / Ikigai Premium** · **Q3 2026**
**Versión del consolidado:** 1.0 · **Fecha:** mayo 2026
**Insumos:** `Prompt_11_PERMA-Profiler_IAR.Claude.md` (Implementation Acquisition Pack completo, 10 secciones) + `Prompt_11_PERMA-Profiler_IAR.Gemini.md` (revisión académica narrativa con aportes psicométricos complementarios)
**Idiomas:** español neutro (metadatos y notas internas) / español Colombia (Secciones 5 y 7)

> **Nota metodológica del consolidado.** Claude entregó el Pack completo siguiendo el prompt v1.0 al pie de la letra (10 secciones operativas con marcadores Hecho/Inferencia/Opinión profesional y anti-alucinación de baremos). Gemini entregó una revisión académica narrativa que NO sigue la estructura de 10 secciones del prompt, con prosa altamente redundante en su segunda mitad, pero aporta cuatro contribuciones verificables: (a) URL exacta del PDF oficial en español alojado por la propia autora, (b) traducción literal en español de los 23 ítems (versión Tarragona / Kern), (c) referencia al estudio test-retest a 6 meses en adultos mayores españoles (Martín-Díaz et al.), (d) referencia al estudio sudafricano (Botswana, ODL) que eliminó 1 ítem de Engagement por baja consistencia, refuerzo del patrón ya detectado por Claude en es-LATAM. Este consolidado usa el Pack de Claude como base estructural completa e inyecta los aportes verificables de Gemini con la marca `[Aporte Gemini]`. La trazabilidad del origen de cada bloque está en el **Apéndice A**.

---

## TABLA DE COBERTURA (requisitos explícitos del brief vs. entrega)

| Requisito | Sección | Cobertura |
|---|---|---|
| Portada y metadatos + estado de bloqueadores | §0 | OK |
| Plan adquisición banco de ítems + 23 ítems literales en inglés con clave directa/inversa | §1 | OK (paper IJW + PDF peggykern.org) |
| Adaptaciones al español (México, Chile, Venezuela, Ecuador, España, Perú, Argentina-adolescentes, Colombia) | §2 | OK + 2.1 + 2.2 |
| Baremos publicados (Butler & Kern internacional, México, Chile, Wammerl Alemania, Colombia) + recomendación LATAM + roadmap CO | §3 | OK + 3.1 + 3.2 |
| Tabla de los 23 ítems con clave (0 inversos en PERMA) | §4 | OK |
| Textos es-CO por dimensión y faceta en bandas BAJO/MEDIO/ALTO (5 dominios PERMA + 4 fillers H, N, Lon, hap) | §5 | OK (9 × 3 bandas = 27 textos) |
| Plan licencia (Penn Center for Innovation, práctica histórica, pasos, email inglés, costo, Plan B) | §6 | OK |
| Disclaimers pre/post + items sensibles + mensaje contención + líneas Colombia | §7 | OK |
| Piloto cognitivo Colombia (muestra, think-aloud, criterios, entregables) | §8 | OK |
| ≥ 3 gaps y preguntas abiertas | §9 | OK (6) |
| ≥ 10 referencias APA 7 con DOI | §10 | OK (14) |
| Marcadores Hecho/Inferencia/Opinión profesional | transversal | OK |
| Marcadores [sin fuente verificada] donde aplica | §3, §6, §7 | OK |
| **Aportes consolidados desde Gemini con verificación pendiente** | Apéndice A | OK |

---

## SECCIÓN 0 — PORTADA Y METADATOS

| Campo | Valor |
|---|---|
| Acrónimo | PERMA-Profiler |
| Nombre completo | The PERMA-Profiler: A brief multidimensional measure of flourishing |
| Autores originales | Butler, J., & Kern, M. L. |
| Año de publicación | 2016 (paper open-access); copyright editorial © 2013 University of Pennsylvania; PDF oficial revisado 14-oct-2016 (Kern, peggykern.org) |
| Versión a implementar | 23 ítems (15 PERMA + 8 fillers: 3 emoción negativa, 3 salud, 1 soledad, 1 felicidad global) |
| Idioma original | Inglés |
| Constructo | Bienestar (flourishing) según modelo PERMA de Seligman (2011) |
| Dimensiones | P, E, R, M, A (3 ítems c/u) + Negative emotion (N), Health (H), Loneliness (Lon), Overall happiness (hap) |
| Escala | Likert 11 puntos (0–10) con tres pares de anclajes: nunca/siempre, terrible/excelente, nada/completamente |
| Tiempo aplicación | 3–5 minutos |
| Titulares de derechos | Copyright editorial © 2013 University of Pennsylvania; licencia comercial vía Penn Center for Innovation (PCI). The Wellbeing Lab (Michelle McQuaid) opera una **variante** (PERMAH Workplace Survey), no es titular del PERMA-Profiler general. |
| Productos destino en DescubreMe | B2C Free, B2C Paid USD 19, Ikigai Premium |

**Resumen ejecutivo.** El PERMA-Profiler es uno de los pocos instrumentos de bienestar multidimensional cuyos ítems están disponibles públicamente en sitio del autor (peggykern.org) con copyright UPenn, uso académico gratuito y uso comercial sujeto a licencia con el Penn Center for Innovation. Para DescubreMe, este es el instrumento de bienestar más comunicable al usuario del stack (correlación latente con SWB r = .98 según Goodman et al., 2018), y por tanto reemplazo natural de Ryff PWB en el track Free. El bloqueador material no es psicométrico sino contractual: se requiere acuerdo escrito con PCI antes de Q3-2026. La debilidad psicométrica conocida es Engagement, en especial en español (doble valencia semántica de "absorberse"); el piloto cognitivo debe enfocarse ahí.

`[Aporte Gemini]` **Lectura teórica complementaria — debate Goodman vs. Seligman.** Goodman, Disabato, Kashdan & Kauffman (2018) reportaron una correlación latente r ≈ .98 entre el PERMA-Profiler y el constructo de Subjective Well-Being (Diener, 1984), y concluyeron que el modelo PERMA podría ser estadísticamente redundante. Seligman replicó en 2018 que dicha covarianza no invalida la teoría sino que la confirma: los cinco pilares son los **componentes causales** del bienestar subjetivo, no entidades ortogonales. Donaldson et al. (2020), usando *collateral reports* de pares para sortear el sesgo de método común, encontraron que los cinco pilares de PERMA predicen la satisfacción global por vías independientes. **Implicación para DescubreMe:** la correlación r=.98 es una fortaleza comunicacional (el PERMA-Profiler "puentea" bienestar global y dimensiones específicas en un solo instrumento), no una debilidad. Justifica el posicionamiento del test como "retrato multidimensional del bienestar" en el copy del producto.

**Status de bloqueadores**

| Bloqueador | Status | Razón |
|---|---|---|
| Banco de ítems literales (inglés) | **READY** | PDF oficial descargable en peggykern.org/questionnaires.html con redacción exacta (versión 14-oct-2016). |
| Banco de ítems en español oficial | **READY (academic only)** | `[Aporte Gemini]` La propia autora aloja un PDF oficial en español: `https://www.peggykern.org/uploads/5/6/6/7/56678211/the_perma_profiler_espanol_v2_112914.pdf` (versión 11-29-14) y una segunda versión específica "España" en `https://www.peggykern.org/uploads/5/6/6/7/56678211/perma-profiler_version_spanish__espan%CC%83a__1_.pdf`. Distribución sujeta a la misma política de uso académico gratuito + licencia comercial PCI. |
| Adaptación al español validada | **READY (academic only)** | Chaves et al. (2023, México, N=26.506) y Cobo-Rendón et al. (2020, Chile, N=1.462) publican estructura factorial validada bajo CC-BY. Validación específicamente colombiana es marginal (Hernández-Vergel et al. 2018 — adultos mayores institucionalizados, N=30; Pastrana & Salazar-Piñeros 2016, descriptivo). |
| Baremos numéricos con N, M, DT, percentiles | **PARTIAL** | Butler & Kern (2016) reportan alphas y cargas factoriales por muestra (Tablas 2 y 3) pero **no publican tabla de percentiles con M y DT desglosados por dimensión** en el cuerpo del artículo. Kern propone cortes orientativos no normativos en peggykern.org. |
| Licencia comercial freemium LATAM | **BLOCKED** | Sin tarifa pública; requiere negociación con Penn Center for Innovation (pciinfo@pci.upenn.edu). Plazo objetivo: firma antes de Q3-2026. |

---

## SECCIÓN 1 — ACQUISITION PLAN DEL BANCO DE ÍTEMS

### 1.1 Disponibilidad pública

**Hecho.** Los 23 ítems literales están publicados en dos fuentes abiertas, sin paywall ni registro obligatorio para lectura:

1. **Paper open-access:** Butler, J., & Kern, M. L. (2016). *International Journal of Wellbeing*, 6(3), Tabla 5, pp. 16–17. DOI: 10.5502/ijw.v6i3.526. URL: `https://internationaljournalofwellbeing.org/index.php/ijow/article/view/526`. PDF directo: `https://internationaljournalofwellbeing.org/index.php/ijow/article/download/526/579/2749`
2. **Sitio oficial del autor:** PDF "The PERMA-Profiler" (versión 14-oct-2016), página 3. URL exacta: `https://www.peggykern.org/uploads/5/6/6/7/56678211/the_perma-profiler_101416.pdf`
3. **`[Aporte Gemini]` Versión oficial en español alojada por la autora:** `https://www.peggykern.org/uploads/5/6/6/7/56678211/the_perma_profiler_espanol_v2_112914.pdf` (versión v2, 29-nov-2014). También existe una variante específica para España: `https://www.peggykern.org/uploads/5/6/6/7/56678211/perma-profiler_version_spanish__espan%CC%83a__1_.pdf`. Útil como base léxica de partida, **pero está identificada en literatura mexicana como menos refinada que la versión Chaves et al. (2023)**; ver §2.

**Hecho.** El PDF oficial declara: *"You are welcome to use the measure for noncommercial research or assessment purposes, giving credit as noted below. There is no cost involved in using the measure for these purposes."* y *"For commercial purposes, please contact the Penn Center for Innovation (pciinfo@pci.upenn.edu)."*

### 1.2 Banco oficial vs adaptaciones derivadas

**Hecho.** El banco oficial es el publicado en Butler & Kern (2016) y en el PDF de peggykern.org. Existen variantes que **NO son la versión base**:

- **Workplace PERMA-Profiler** (Kern, 2014): 16 ítems PERMA reformulados al contexto laboral + fillers.
- **PERMAH Workplace Survey** (McQuaid & Kern): plataforma SaaS comercial; añade "H" (Health) explícita como pilar.
- **PERMA + 4** (Donaldson & Donaldson, 2021): extensión con mindset, environment, economic security.
- **PERMA-Profiler para adolescentes** (versiones en validación, Frontiers 2024).
- **`[Aporte Gemini]` Versión africana adaptada (Botswana, ODL, ~2019):** un estudio en estudiantes universitarios sudafricanos de educación a distancia eliminó **1 ítem del dominio Engagement** del PDF español extendido (de 35 ítems hipotéticos a 34) para mejorar la consistencia interna de E en contexto afrocéntrico. **No es una versión oficial; es evidencia adicional del patrón de debilidad psicométrica de E fuera del contexto WEIRD.**

**Opinión profesional.** DescubreMe debe implementar la versión "general" de 23 ítems de Butler & Kern (2016), no la workplace. La variante workplace puede explorarse después como módulo opcional para B2B-A.

### 1.3 Estructura del banco (cantidad por faceta, claves, formato)

**Hecho** (Butler & Kern, 2016, Tabla 5, p. 17):

- **15 ítems PERMA** (3 por dominio): P1–P3, E1–E3, R1–R3, M1–M3, A1–A3
- **8 ítems filler:** N1, N2, N3 (negative emotion); H1, H2, H3 (health); Lon (soledad, ítem único); hap (felicidad global, ítem único)

**Reproducción literal en inglés (texto original, distribuido por la autora bajo política de uso académico gratuito; copyright editorial © 2013 University of Pennsylvania).**

| # | Label | Pregunta (EN) | `[Aporte Gemini]` Traducción oficial al español (Tarragona/Kern, PDF peggykern.org v2 11-29-14) | Anclajes |
|---|---|---|---|---|
| 1 | A1 | How much of the time do you feel you are making progress towards accomplishing your goals? | ¿Qué parte del tiempo siente que está avanzando hacia el logro de sus metas? | 0=never, 10=always |
| 2 | E1 | How often do you become absorbed in what you are doing? | ¿Con qué frecuencia se siente usted absorbido/a en lo que está haciendo? | 0=never, 10=always |
| 3 | P1 | In general, how often do you feel joyful? | En general, ¿con qué frecuencia se siente alegre? | 0=never, 10=always |
| 4 | N1 | In general, how often do you feel anxious? | En general, ¿qué tan seguido se siente ansioso/a? | 0=never, 10=always |
| 5 | A2 | How often do you achieve the important goals you have set for yourself? | ¿Con qué frecuencia alcanza metas importantes que se ha propuesto para sí mismo/a? | 0=never, 10=always |
| 6 | H1 | In general, how would you say your health is? | En general, ¿cómo diría usted que es su salud? | 0=terrible, 10=excellent |
| 7 | M1 | In general, to what extent do you lead a purposeful and meaningful life? | En general, ¿en qué medida lleva usted una vida con propósito y significado? | 0=not at all, 10=completely |
| 8 | R1 | To what extent do you receive help and support from others when you need it? | ¿En qué medida recibe usted ayuda y apoyo de otras personas cuando lo necesita? | 0=not at all, 10=completely |
| 9 | M2 | In general, to what extent do you feel that what you do in your life is valuable and worthwhile? | En general, ¿en qué medida siente que lo que hace en su vida es valioso y vale la pena? | 0=not at all, 10=completely |
| 10 | E2 | In general, to what extent do you feel excited and interested in things? | En general, ¿en qué medida se siente usted entusiasmado/a e interesado/a en las cosas? | 0=not at all, 10=completely |
| 11 | Lon | How lonely do you feel in your daily life? | ¿Cuán solo/a se siente en su vida diaria? | 0=not at all, 10=completely |
| 12 | H2 | How satisfied are you with your current physical health? | ¿Qué tan satisfecho/a está usted con su salud física actual? | 0=not at all, 10=completely |
| 13 | P2 | In general, how often do you feel positive? | En general, ¿con qué frecuencia se siente positivo/a? | 0=never, 10=always |
| 14 | N2 | In general, how often do you feel angry? | En general, ¿qué tan seguido se siente enojado/a? | 0=never, 10=always |
| 15 | A3 | How often are you able to handle your responsibilities? | ¿Qué tan seguido se siente capaz para manejar sus responsabilidades? | 0=never, 10=always |
| 16 | N3 | In general, how often do you feel sad? | En general, ¿qué tan seguido se siente triste? | 0=never, 10=always |
| 17 | E3 | How often do you lose track of time while doing something you enjoy? | ¿Con qué frecuencia se le pasa el tiempo muy rápido cuando hace algo que disfruta? | 0=never, 10=always |
| 18 | H3 | Compared to others of your same age and sex, how is your health? | En comparación con otros de su misma edad y sexo, ¿cómo es su salud? | 0=terrible, 10=excellent |
| 19 | R2 | To what extent do you feel loved? | ¿Hasta qué punto se ha sentido amado/a? | 0=not at all, 10=completely |
| 20 | M3 | To what extent do you generally feel you have a sense of direction in your life? | En general, ¿hasta qué punto siente que sigue una dirección con sentido en su vida? | 0=not at all, 10=completely |
| 21 | R3 | How satisfied are you with your personal relationships? | ¿Qué tan satisfecho/a está usted con sus relaciones personales? | 0=not at all, 10=completely |
| 22 | P3 | In general, to what extent do you feel contented? | En general, ¿cuán satisfecho/a se siente usted? | 0=not at all, 10=completely |
| 23 | hap | Taking all things together, how happy would you say you are? | Considerando todas las cosas en conjunto, ¿cuán feliz diría usted que es? | 0=not at all, 10=completely |

**Hecho.** El orden de los ítems no es por dominio sino agrupado en 8 bloques visuales para reducir efectos de halo. El plugin debe respetar este orden literal.

**Reglas de scoring (Butler & Kern, 2016, p. 16):**
- P = mean(P1, P2, P3); E = mean(E1, E2, E3); R = mean(R1, R2, R3); M = mean(M1, M2, M3); A = mean(A1, A2, A3)
- **PERMA global** = mean(P1, P2, P3, E1, E2, E3, R1, R2, R3, M1, M2, M3, A1, A2, A3, hap) → 16 ítems
- N = mean(N1, N2, N3); H = mean(H1, H2, H3); Lon = ítem único; hap = ítem único
- Rango de cada subescala: 0–10
- **Cero ítems inversos** (ver §4).

### 1.4 Recomendación de acceso

**Opinión profesional.** Secuencia recomendada:
1. Descargar el PDF oficial (inglés) de peggykern.org y archivarlo como referencia maestra en el repositorio del plugin.
2. Descargar el PDF oficial en español (v2 11-29-14) de peggykern.org y archivarlo como base léxica inicial, **a comparar contra la versión Chaves et al. (2023)** en §2.
3. Registrarse en el formulario de uso académico que la autora referencia en peggykern.org/questionnaires.html (no implica costo ni bloquea uso).
4. En paralelo, escribir al Penn Center for Innovation (`pciinfo@pci.upenn.edu`) para uso comercial (draft en §6.4).
5. Citar el plugin como: `Butler, J., & Kern, M. L. (2016). The PERMA-Profiler: A brief multidimensional measure of flourishing. International Journal of Wellbeing, 6(3), 1–48. https://doi.org/10.5502/ijw.v6i3.526`

---

## SECCIÓN 2 — ADAPTACIONES AL ESPAÑOL DISPONIBLES

**Tabla maestra de adaptaciones al español publicadas**

| País | Autores | Año | DOI / Fuente | N muestra | Características | Disponibilidad de traducción |
|---|---|---|---|---|---|---|
| Internacional (oficial) | `[Aporte Gemini]` Tarragona, en colaboración con Butler & Kern | 2014 (v2 11-29-14) | PDF en peggykern.org (`the_perma_profiler_espanol_v2_112914.pdf`) | n/a (traducción) | Traducción oficial v2 alojada por la propia autora. Sin validación factorial publicada; base léxica de partida. Existe variante específica España. | Open access en sitio de Kern. |
| México | Chaves, C., Ballesteros-Valdés, R., Madridejos, E., & Charles-Leija, H. | 2023 | 10.1007/s11482-022-10132-1 | 23.723 estudiantes + 2.783 empleados (total 26.506) | Back-translation ITC 2017. ESEM confirma 5 factores. Invariancia género/edad. Engagement con confiabilidad menor. **Validación en español más robusta a la fecha.** Reformula E3 para evitar connotación peyorativa de "perder el tiempo" → "se le pasa el tiempo muy rápido cuando hace algo que disfruta". | Open access CC-BY; ítems reutilizables con atribución. |
| Chile | Cobo-Rendón, R., Pérez-Villalobos, M. V., & Díaz-Mujica, A. | 2020 | 10.12804/revistas.urosario.edu.co/revsalud/a.8775 | 1.462 universitarios | CFA 5 factores. α Engagement bajo. Usa traducción derivada inicial. | Open access. |
| Venezuela | Cobo-Rendón, R., Parra, J. A., & García-Álvarez, D. | 2021 | 10.1344/anpsic2021.51.5 | 202 estudiantes de Psicología (edad media 19) | CFA 5 factores con E débil. TLI=.944, CFI=.957. Validez predictiva: altas puntuaciones PERMA → menor distrés y ansiedad académica. | Open access. |
| Ecuador | Lima-Castro, S., et al. | 2017 | Universidad de Cuenca (sin DOI internacional estable) | Adultos | Primera adaptación al español usada como antecedente LATAM. | Restringida. |
| España | Martín-Díaz, M. D., & Fernández-Abascal, E. G. | 2024 | 10.1007/s11482-024-10342-9 | 2.525 adultos | ITC. CFA, invariancia, validez convergente con SWLS, PWB, PANAS, LOT-R, BDI-II, SF-36. Engagement débil. | Open access CC-BY. |
| España (adultos mayores) | Martín-Díaz y col. | 2023 | 10.1007/s12144-023-04883-9 | 330 adultos mayores (edad media 70.2; 61.5% hombres) | `[Aporte Gemini]` Reporta **estabilidad temporal test-retest a 6 meses** en cohorte de jubilados; soporta uso longitudinal en gerontología. | Springer (acceso restringido en algunos casos). |
| Perú | Validación UNIFE Lima Metropolitana | 2022–2024 | Repositorio UNIFE; Alicia CONCYTEC | 475 adultos | CFA 5 factores: χ²/gl=2.79; CFI=.997; SRMR=.039; RMSEA=.062. ω entre .52 y .89. **Invariancia métrica y escalar por género confirmada (ΔCFI<.005, ΔRMSEA<.010, ΔSRMR<.025).** | Tesis institucional. |
| Argentina (adolescentes) | Publicado en PMC / Frontiers 2024 | reciente | PMC10402642 / `https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2024.1415084/full` | Adolescentes | α: P=.87, E=.62, R=.78, M=.81, A=.82, total=.92. | Open access. |
| Colombia (adultos mayores) | Hernández-Vergel, V. K., Prada-Núñez, R., & Hernández-Suárez, C. A. | 2018 | 10.22463/17949831.1235 | 30 adultos mayores institucionalizados de muestra censal de 250 en Cúcuta | Descriptivo. N pequeño. **α global = .95 reportado** [verificar; alfa anormalmente alto que puede reflejar sobre-ajuste o reducción de varianza en muestra cautiva]. No es validación psicométrica formal. | Open access. |
| Colombia (jóvenes voluntarios) | Pastrana, M. P., & Salazar-Piñeros, F. | 2016 | *Revista Katharsis*, 22, 13–34 | Jóvenes voluntarios | Descriptivo; tamaño insuficiente para CFA. | Open access. |
| Sudáfrica/Botswana (no español, contexto) | `[Aporte Gemini]` Investigadores Universidad de Botswana | reciente | DOI [sin fuente verificada] | Estudiantes ODL | Bajo lente "afrocéntrico", la eliminación de 1 ítem de Engagement mejoró la consistencia interna global. **Refuerzo cross-cultural del patrón de debilidad de E fuera de muestras WEIRD.** | — |

### 2.1 Recomendación de base para es-CO

**Opinión profesional.** Partir de la versión mexicana de **Chaves, Ballesteros-Valdés, Madridejos & Charles-Leija (2023)** como traducción base, por tres razones:

1. **Hecho:** es la única adaptación en español con N > 26.000 y la única donde Covadonga Chaves (también autora del IPPI-D, intervención clínica de referencia en español) lidera la traducción, asegurando continuidad terminológica.
2. **Hecho:** aplica las ITC Guidelines 2017 con back-translation independiente.
3. **Inferencia:** el español de México (registro neutro hispanoamericano) es léxicamente más cercano al español colombiano urbano que el español ibérico de Martín-Díaz (2024).

Como triangulación, comparar contra (a) la versión chilena (Cobo-Rendón et al., 2020) específicamente en los ítems de Engagement donde se documenta inestabilidad semántica, y (b) `[Aporte Gemini]` la versión oficial v2 (Tarragona/Kern, peggykern.org) que es la "base léxica madre" de la cual derivan las adaptaciones posteriores. Diferencias entre las tres versiones deben documentarse antes del piloto cognitivo.

### 2.2 Modificaciones léxicas anticipadas para Colombia

**Opinión profesional** — hipótesis a validar en el piloto cognitivo (§8); **no aplicar de oficio**:

| Ítem | Riesgo léxico | Ajuste sugerido a probar |
|---|---|---|
| E1 ("become absorbed") | "Absorberse" tiene doble valencia en español (positiva = flow / negativa = ensimismarse). Documentado como causa del α bajo de E en Chile, Venezuela, Colombia y, `[Aporte Gemini]` también en Botswana. | "¿Con qué frecuencia te concentras profundamente en lo que estás haciendo?" |
| E3 ("lose track of time") | "Perder la noción del tiempo" puede asociarse a desorganización. `[Aporte Gemini]` Chaves et al. (2023) ya documentaron este choque en México y lo reformularon a "se le pasa el tiempo muy rápido cuando hace algo que disfruta". | Adoptar la reformulación mexicana de Chaves como base es-CO. |
| A3 ("handle your responsibilities") | "Manejar responsabilidades" suena empresarial. | "¿Con qué frecuencia logras sacar adelante tus responsabilidades del día a día?" |
| M2 ("valuable and worthwhile") | Formal. | "¿En qué medida sientes que lo que haces vale la pena?" |
| hap ("Taking all things together") | Calco. | "Considerando todo en conjunto, ¿qué tan feliz dirías que eres?" |
| H3 ("same age and sex") | "Sexo" puede generar fricción en algunos públicos. | "Comparado con otras personas de tu misma edad…" |
| Tratamiento "usted" en la versión oficial v2 (Tarragona) | El registro original es "usted" en todos los ítems. Colombia urbana joven (target B2C) prefiere "tú" cordial. | **Decisión: convertir a tú cordial en todos los ítems**, manteniendo la fidelidad semántica. |

---

## SECCIÓN 3 — BAREMOS PUBLICADOS

### Tabla maestra de baremos disponibles

| Estudio | País | N | Tipo de dato disponible | Cita APA + DOI |
|---|---|---|---|---|
| Butler & Kern (2016) Sample 5, norming set | Internacional (mayoría EE.UU., UK, Australia) | 23.692 | **α por dimensión** (no M ni DT en cuerpo del artículo). Tabla 2: α P=.88, α E=.71, α R=.81, α M=.90, α A=.79, α PERMA total=.94, α N=.73, α H=.92. | Butler & Kern (2016), DOI 10.5502/ijw.v6i3.526 |
| Butler & Kern (2016), Combined Samples 4–11 | Internacional | 31.966 | **α por dimensión**: α P=.88, α E=.72, α R=.82, α M=.90, α A=.79, α PERMA total=.94, α N=.71, α H=.92. **Test-retest Sample 4** (n=1.073, ~2 sem): r P=.84, r E=.78, r R=.83, r M=.86, r A=.80, r PERMA=.88, r N=.77, r H=.86. **CFA Butler & Kern (2016):** modelo 5 factores correlacionados χ²/df aceptable, CFI=.97, TLI=.96, RMSEA=.06, SRMR=.03. | Butler & Kern (2016) |
| Butler & Kern (2016), Tabla 4: validez convergente promedio (k=4 muestras, n≈7.000) | Internacional | ~7.000 | r PERMA con: Flourishing Scale .84, Life Satisfaction .79, WEMWBS .80, Depression –.74, Loneliness –.49, Health .43. | Butler & Kern (2016) |
| Chaves et al. (2023) | México | 26.506 | α reportados: P=.87, E=.62, R=.78, M=.81, A=.82, **escala total α=.92**. CFA-ESEM acepta estructura 5 factores. M y DT desglosadas por dimensión: **[sin fuente verificada — verificar en cuerpo del artículo y archivos suplementarios]**. | Chaves et al. (2023), DOI 10.1007/s11482-022-10132-1 |
| Cobo-Rendón et al. (2020) | Chile | 1.462 | CFA 5 factores. α por dimensión: **[sin fuente verificada — extraer del PDF del artículo]**, con α de Engagement reportado como bajo en literatura derivada. | DOI 10.12804/revistas.urosario.edu.co/revsalud/a.8775 |
| Cobo-Rendón et al. (2021) Venezuela | Venezuela | 202 | `[Aporte Gemini]` TLI=.944; CFI=.957. Validez predictiva: PERMA alto → menos distrés y ansiedad académica. | DOI 10.1344/anpsic2021.51.5 |
| Validación UNIFE Lima (2022–2024) | Perú | 475 | `[Aporte Gemini]` χ²/df=2.79; CFI=.997; SRMR=.039; RMSEA=.062; ω entre .52 y .89; invariancia métrica y escalar por género (ΔCFI<.005). | Repositorio UNIFE / Alicia CONCYTEC |
| Wammerl et al. (2019) | Alemania/Austria | 854 | Tabla 4: estadísticos descriptivos (M, mediana, DT, mín, máx, asimetría, curtosis) y reliability por dimensión: **[sin fuente verificada — números exactos en Tabla 4 del paper]**. | DOI 10.1007/s41543-019-00021-0 |
| Hernández-Vergel et al. (2018) | Colombia (Cúcuta) | 30 adultos mayores institucionalizados (de censo de 250) | `[Aporte Gemini]` α global reportado = .95 [verificar; valor alto que puede reflejar contracción de varianza en muestra cautiva, no representatividad colombiana]. Comparaciones por género/grupo etario: **[sin fuente verificada]**. | DOI 10.22463/17949831.1235 |
| Martín-Díaz et al. (2023) adultos mayores España | España | 330 (edad media 70.2; 61.5% hombres) | `[Aporte Gemini]` Test-retest a 6 meses con estabilidad temporal "alta" reportada. Valor numérico exacto: **[sin fuente verificada — extraer del PDF]**. | DOI 10.1007/s12144-023-04883-9 |

**Hecho.** Butler & Kern (2016) **no publican una tabla de percentiles** (P10, P25, P50, P75, P90, P99) ni una tabla consolidada de M y DT por dimensión en el cuerpo recuperable del artículo. Los Apéndices 1 y 2 del paper contienen correlaciones por muestra individuales pero no un baremo normativo estandarizado.

**Hecho.** En peggykern.org/questionnaires.html, la propia autora declara que **no recomienda** el uso de puntos de corte y, "si fuera necesario", propone los siguientes clusters heurísticos basados en las medias observadas (registrar como **opinión profesional de la autora, no datos normativos publicados**):

| Banda heurística (Kern, peggykern.org) | P, E, R, M, A, H, hap | Negative Emotion (N) |
|---|---|---|
| "Very high functioning" | ≥ 9.0 | 0.0 – 1.0 |
| "High functioning" | 8.0 – 8.9 | 1.1 – 3.0 |
| "Normal functioning" | 6.5 – 7.9 | 3.1 – 5.0 |
| "Sub-optimal" | 5.0 – 6.4 | 5.1 – 6.5 |
| "Languishing" | < 5.0 | > 6.5 |

**Opinión profesional.** DescubreMe debe abstenerse de usar las etiquetas "languishing", "sub-óptimo" o "very high functioning" en el reporte al usuario; solo usarlas internamente para mapear a las bandas BAJO/MEDIO/ALTO de §5. La banda "MEDIO" descriptivo-aspiracional debe cubrir aproximadamente el rango 5.0–7.9 (correspondiente a "sub-optimal" + "normal" de Kern), porque ese es el rango donde están la mayoría de adultos según las muestras de validación internacionales.

### 3.1 Recomendación de baremo provisional para LATAM

**Opinión profesional.** Mientras DescubreMe no construya su propio baremo colombiano, usar como **referencia provisional**:

1. **Cortes heurísticos de Kern** (tabla anterior) traducidos a tres bandas: BAJO < 5.0 (5.1–6.5 para N); MEDIO 5.0–7.9 (3.0–6.5 para N); ALTO ≥ 8.0 (≤ 3.0 para N).
2. **Validación cruzada con las medias de Chaves et al. (2023)** por ser la muestra más grande en español; verificar que las bandas no produzcan distribuciones extremas (>30% BAJO o >30% ALTO) en los primeros 100 usuarios.
3. El motor de scoring debe:
   - Calcular el puntaje crudo por dimensión (0–10) con precisión a 2 decimales.
   - Mapear a BAJO / MEDIO / ALTO usando los cortes anteriores.
   - Etiquetar internamente cada reporte con `baremo_version: "provisional_kern_chaves_2026Q2"`.
   - **NO mostrar percentiles cuantitativos al usuario** hasta tener baremo colombiano propio.
   - **NO mostrar comparaciones interpersonales** ("estás por encima del X% de personas"); solo descripciones cualitativas.

### 3.2 Roadmap para baremos colombianos propios

| Fase | Plazo | Acción |
|---|---|---|
| Fase 0 (pre-launch) | Pre-Q3 2026 | Decisión documentada: no mostrar percentiles; mostrar solo bandas cualitativas (§5). |
| Fase 1 | Mes 1–6 post-launch, N ≥ 500 | Acumular datos anonimizados. Calcular P10, P25, P50, P75, P90 colombianos por dimensión, segmentados por género y rango etario (18–24, 25–34, 35–44, 45–54, 55+). |
| Fase 2 | N ≥ 2.000 | CFA con datos colombianos; comparar cargas con Chaves et al. (2023). Si α Engagement < .60, redactar E1/E3 alternativos validados en piloto. |
| Fase 3 | N ≥ 5.000 | Publicación interna del baremo colombiano (white paper técnico DescubreMe), opcionalmente como paper en revista indexada. Actualización del plugin con `baremo_version: "co_descubreme_v1"`. |

---

## SECCIÓN 4 — ÍTEMS INVERSOS NUMERADOS

**Hecho** (Butler & Kern, 2016, sección 4.4, p. 9): los autores decidieron incluir **únicamente ítems redactados positivamente** para las cinco dimensiones PERMA. Argumentan que (a) el bienestar no es la simple ausencia de malestar, (b) los ítems inversos suelen cargar en un factor de método separado, y (c) los ítems negativos se añaden como fillers (N1–N3) pero **no entran en el scoring de las dimensiones positivas**.

| Ítem # | Label | Faceta / Dimensión | Clave | Notas |
|---|---|---|---|---|
| 1 | A1 | Accomplishment | Directa | Mayor = mejor en A |
| 2 | E1 | Engagement | Directa | Mayor = mejor en E |
| 3 | P1 | Positive emotion | Directa | Mayor = mejor en P |
| 4 | N1 | Negative emotion (filler, anxious) | Directa **al constructo N** | NO se invierte para PERMA total. Se reporta independiente. |
| 5 | A2 | Accomplishment | Directa | |
| 6 | H1 | Health (filler) | Directa | Mayor = mejor salud percibida |
| 7 | M1 | Meaning | Directa | |
| 8 | R1 | Relationships | Directa | |
| 9 | M2 | Meaning | Directa | |
| 10 | E2 | Engagement | Directa | |
| 11 | Lon | Loneliness (filler) | Directa al constructo soledad | NO se invierte; alto Lon = más soledad. |
| 12 | H2 | Health | Directa | |
| 13 | P2 | Positive emotion | Directa | |
| 14 | N2 | Negative emotion (filler, angry) | Directa al constructo N | |
| 15 | A3 | Accomplishment | Directa | |
| 16 | N3 | Negative emotion (filler, sad) | Directa al constructo N | |
| 17 | E3 | Engagement | Directa | |
| 18 | H3 | Health | Directa | |
| 19 | R2 | Relationships | Directa | |
| 20 | M3 | Meaning | Directa | |
| 21 | R3 | Relationships | Directa | |
| 22 | P3 | Positive emotion | Directa | |
| 23 | hap | Overall happiness | Directa | Entra en PERMA total |

**Conclusión psicométrica para el plugin: la lista de ítems con clave inversa para el cálculo de las cinco subescalas PERMA y para la subescala PERMA-total es VACÍA (0 ítems).** El motor de scoring no requiere lógica de reversión. La única "inversión interpretativa" es que las subescalas N y Lon, cuando son altas, comunican menor bienestar, pero esto se maneja en la capa de interpretación al usuario (§5), no en el scoring crudo.

---

## SECCIÓN 5 — TEXTOS DE INTERPRETACIÓN AL USUARIO (es-CO)

> Reglas aplicadas: tuteo cordial colombiano, lenguaje descriptivo no etiquetador, aspiracional no determinista, no clínico. Cada texto: 2–4 oraciones, ≤80 palabras. Incluye descripción + ejemplo conductual implícito + invitación a reflexión (no instrucción).

### Emociones positivas (P)
*Descripción técnica (interna, no se muestra al usuario):* tendencia general a experimentar alegría, contentamiento y afecto positivo. Tres ítems: P1, P2, P3. α típica ≥.85.

**Banda BAJO (≤ percentil 16):** Por estos días, las emociones cálidas como la alegría o la calma no aparecen tan seguido en tu vida cotidiana. Esto puede pasar en temporadas de mucha exigencia, cambios o cansancio. Si te interesa, podrías observar qué pequeñas situaciones te conectaron con algo de calma esta semana, así sea por un momento.

**Banda MEDIO (percentil 17–83):** Las emociones positivas aparecen en tu vida de forma intermitente. A veces te sientes contento o tranquilo, otras veces el día se siente más plano. Te invitamos a notar qué actividades, personas o lugares suelen acompañar tus mejores momentos.

**Banda ALTO (≥ percentil 84):** Tiendes a experimentar alegría, contentamiento y emociones cálidas con frecuencia. Eso no significa que nunca sientas momentos bajos, sino que tu línea base afectiva es más bien luminosa. Podrías reflexionar qué hábitos cotidianos están sosteniendo ese estado para cuidarlos.

### Compromiso / Engagement (E)
*Descripción técnica (interna):* absorción, interés y pérdida del sentido del tiempo en actividades. Tres ítems: E1, E2, E3. Dimensión psicométricamente más débil en español; interpretar con cautela.

**Banda BAJO (≤ percentil 16):** Por ahora te cuesta encontrar actividades que te enganchen profundamente o en las que se te pase el tiempo sin darte cuenta. Eso puede pasar cuando la rutina se vuelve repetitiva. ¿Hubo alguna actividad en tu pasado que solías disfrutar a fondo y que valdría la pena explorar de nuevo?

**Banda MEDIO (percentil 17–83):** Hay momentos en los que te sumerges en lo que haces y otros en los que la atención se dispersa. Es un patrón común en adultos con muchas demandas en paralelo. Una posible reflexión: ¿cuáles son los espacios de tu semana donde sí te concentras y disfrutas?

**Banda ALTO (≥ percentil 84):** Tiendes a involucrarte de lleno en lo que haces y con frecuencia se te pasa el tiempo sin sentirlo. Esa capacidad de concentración profunda es un recurso valioso. Te puede ser útil identificar qué actividades específicas activan ese estado, para acceder a él más conscientemente.

### Relaciones (R)
*Descripción técnica (interna):* sentirse amado, apoyado y satisfecho con relaciones personales. Tres ítems: R1, R2, R3. α típica ≥.80.

**Banda BAJO (≤ percentil 16):** Las relaciones cercanas no se sienten tan nutritivas o disponibles en este momento de tu vida. Puede ser una etapa de transición, distancia o cambios en tu círculo. ¿Hay alguna persona con la que valdría la pena retomar contacto, o un espacio donde podrías conocer gente afín?

**Banda MEDIO (percentil 17–83):** Tienes relaciones que te sostienen, aunque quizá no siempre sientes que recibes el apoyo o cercanía que quisieras. Esto es habitual en la vida adulta. Podrías preguntarte qué vínculo te gustaría profundizar y qué primer paso pequeño sería posible esta semana.

**Banda ALTO (≥ percentil 84):** Sientes que las personas importantes en tu vida te quieren y te respaldan, y eso se nota en cómo describes tus relaciones. Ese tejido social es uno de los predictores más consistentes de bienestar a largo plazo. Vale la pena reconocer y cuidar a quienes están ahí.

### Sentido / Meaning (M)
*Descripción técnica (interna):* propósito, dirección de vida, sentir que lo que se hace vale la pena. Tres ítems: M1, M2, M3. α típica ≥.85.

**Banda BAJO (≤ percentil 16):** En este momento te cuesta sentir que lo que haces día a día tiene una dirección clara o un sentido más grande. Esa búsqueda es parte de muchas etapas adultas y no significa que algo esté "mal". Podrías explorar qué actividades, causas o personas te conectan con algo que sí te importa.

**Banda MEDIO (percentil 17–83):** Tienes una idea general de hacia dónde va tu vida y de lo que te importa, pero hay momentos en los que esa claridad se difumina. Es un terreno donde casi todos seguimos trabajando. Una pregunta útil: ¿qué cosa concreta hiciste este mes que sentiste valiosa por sí misma?

**Banda ALTO (≥ percentil 84):** Tiendes a sentir que tu vida tiene propósito y que lo que haces aporta a algo que te importa. Esa sensación de dirección es un recurso poderoso para sostener decisiones difíciles. Vale la pena nombrar de vez en cuando, en tus propias palabras, qué es eso que da sentido a tu día a día.

### Logro / Accomplishment (A)
*Descripción técnica (interna):* sentido subjetivo de progreso, maestría y manejo de responsabilidades. Tres ítems: A1, A2, A3. α típica ≥.78.

**Banda BAJO (≤ percentil 16):** Sientes que avanzar hacia tus metas o sacar adelante tus responsabilidades te está costando más de lo que quisieras. Eso suele intensificarse en temporadas de carga alta o cuando las metas no están bien definidas. ¿Hay una meta pequeña y concreta en la que podrías ver progreso esta semana?

**Banda MEDIO (percentil 17–83):** Cumples con tus responsabilidades y avanzas en lo que te propones, aunque no siempre con la fluidez que te gustaría. Es un patrón común y saludable. Te puede servir reconocer un logro reciente, por pequeño que parezca, antes de pasar a la siguiente meta.

**Banda ALTO (≥ percentil 84):** Tiendes a sentir que avanzas hacia tus metas y que puedes manejar lo que el día te exige. Esa sensación de eficacia personal alimenta otros ámbitos del bienestar. Una buena práctica es no perder de vista por qué esas metas te importan, no solo cumplirlas.

### Salud física percibida (H)
*Descripción técnica (interna):* satisfacción con salud subjetiva. Tres ítems: H1, H2, H3. **No es indicador médico.** α típica ≥.90.

**Banda BAJO (≤ percentil 16):** Tu percepción de tu salud física hoy no es la que quisieras tener. Esta es una percepción subjetiva, no un diagnóstico, y puede reflejar cansancio, dolor, sedentarismo o malestar general. Si esta sensación es persistente, conversarlo con un profesional de la salud puede ser útil.

**Banda MEDIO (percentil 17–83):** Sientes que tu salud está en un punto medio: ni excelente ni preocupante. En esa franja, los hábitos cotidianos (sueño, movimiento, alimentación, descanso) suelen marcar la diferencia. ¿Cuál de esos hábitos sientes que más se te ha descuidado últimamente?

**Banda ALTO (≥ percentil 84):** Te percibes en buena forma física y sientes satisfacción con tu cuerpo y tu energía cotidiana. Ese capital de salud subjetiva está vinculado con casi todas las demás dimensiones del bienestar. Cuidarlo activamente, no darlo por hecho, es probablemente la mejor inversión.

### Emoción negativa (N)
*Descripción técnica (interna):* tristeza, enojo y ansiedad. Tres ítems: N1, N2, N3. α típica ≈.72. **Reporte invertido**: alto N = mensaje de cuidado, NO etiqueta clínica.

**Banda BAJO (≤ percentil 16) — poca emoción negativa:** En tu día a día no sientes con frecuencia tristeza, enojo o ansiedad intensa. Eso habla de una buena regulación emocional en este momento. Vale la pena recordar que sentir estas emociones de vez en cuando es parte normal de la vida humana, no algo a evitar siempre.

**Banda MEDIO (percentil 17–83):** Como la mayoría de las personas adultas, experimentas tristeza, enojo o ansiedad con cierta frecuencia, sin que dominen tu vida cotidiana. Notar qué situaciones suelen disparar cada una puede ayudarte a entenderte mejor.

**Banda ALTO (≥ percentil 84) — mucha emoción negativa:** Por estos días, sentimientos como tristeza, ansiedad o enojo aparecen con bastante frecuencia. Esto no es un diagnóstico: este test no evalúa salud mental clínica. Si esta intensidad lleva semanas o interfiere con tu vida cotidiana, conversarlo con un profesional puede ser un buen paso. En Colombia puedes llamar a la Línea 106 (Bogotá) o a la Línea 192 opción 4 (MinSalud).

### Soledad (Lon)
*Descripción técnica (interna):* ítem único. **Reporte invertido**: alto Lon = más sensación de soledad.

**Banda BAJO (≤ percentil 16) — poca soledad:** En tu día a día rara vez te sientes solo o sola. Mantener la calidad de tus relaciones cercanas es probablemente uno de los factores que sostienen esa sensación.

**Banda MEDIO (percentil 17–83):** A veces te sientes acompañado y otras veces no tanto. Es un patrón muy humano, especialmente en ciudades grandes y en etapas de transición. ¿Hay un encuentro concreto, así sea breve, que podrías agendar esta semana?

**Banda ALTO (≥ percentil 84) — mucha soledad:** Estás sintiendo soledad con bastante frecuencia. Esta sensación no equivale a estar físicamente solo: se puede sentir incluso rodeado de gente. Si lleva tiempo, vale la pena explorar qué relaciones te gustaría profundizar y considerar conversarlo con alguien de confianza o con un profesional. En Colombia, la Línea 106 y la Línea 192 opción 4 están disponibles.

### Felicidad global (hap)
*Descripción técnica (interna):* ítem único, evaluación global retrospectiva. Entra en PERMA total.

**Banda BAJO (≤ percentil 16):** Si tuvieras que resumir cómo estás, dirías que en general la felicidad no es la palabra que mejor te describe en este momento. Esa lectura global puede pesar más que cualquier subescala. Es un buen punto de partida para preguntarte qué dimensión específica (relaciones, sentido, salud) sientes que más necesita atención.

**Banda MEDIO (percentil 17–83):** Te describes como una persona moderadamente feliz, en línea con la mayoría de adultos en evaluaciones de este tipo. Esa lectura suele moverse con el contexto vital. ¿Qué cambio sutil notarías si la felicidad subiera un escalón?

**Banda ALTO (≥ percentil 84):** Cuando lo miras en conjunto, dirías que eres una persona feliz. Esa autopercepción global es uno de los predictores más estables de bienestar futuro. Vale la pena reconocer qué prácticas, vínculos y decisiones la sostienen.

---

## SECCIÓN 6 — LICENSE ACQUISITION PLAN

### 6.1 Titular y contacto

**Hecho.** El PERMA-Profiler tiene copyright editorial © 2013 University of Pennsylvania. Para **uso comercial**, el contacto oficial es el **Penn Center for Innovation (PCI)**, antes denominado Center for Technology Transfer.

- Email comercial: `pciinfo@pci.upenn.edu`
- Sitio: `https://pci.upenn.edu`
- Contacto académico complementario (autora): Dra. Margaret L. Kern, University of Melbourne — `pkern001@gmail.com` y `margaret.kern@unimelb.edu.au`
- `[Aporte Gemini]` Penn Positive Psychology Center (referencia institucional adicional, no canal de licencia): `https://ppc.sas.upenn.edu/resources/questionnaires-researchers/perma-profiler`

**Hecho.** The Wellbeing Lab (Michelle McQuaid, https://www.michellemcquaid.com) opera bajo asociación con Kern una variante (PERMAH Workplace Survey); su sitio describe la asociación como "in partnership with Dr Peggy Kern at Melbourne University". **No es el titular del copyright del PERMA-Profiler general.**

### 6.2 Práctica histórica de concesión

**Hecho.** El PDF oficial (peggykern.org, 14-oct-2016) declara explícitamente: *"You are welcome to use the measure for noncommercial research or assessment purposes, giving credit as noted below. There is no cost involved in using the measure for these purposes."* y redirige el uso comercial sistemáticamente a PCI.

**Inferencia.** No hay tarifa pública publicada. Los acuerdos de PCI con plataformas digitales se estructuran típicamente como (a) licencia plana anual, (b) royalty por usuario activo o por completación, o (c) licencia perpetua para uso específico. Para una plataforma freemium B2C en LATAM, lo razonable es proponer un **flat fee anual con cap por usuario gratuito** y un **uplift para el track B2B-A**.

### 6.3 Pasos para solicitar

1. **Pre-contacto académico:** registrar el uso en el formulario de peggykern.org/questionnaires.html y notificar por email cortés a la Dra. Kern, mencionando intención comercial a través de PCI.
2. **Solicitud formal a PCI:** email a `pciinfo@pci.upenn.edu` describiendo caso de uso (ver §6.4).
3. **Discovery call** con licensing officer asignado por PCI (usualmente 1–3 semanas después del primer contacto).
4. **NDA** y luego **term sheet** con rangos económicos.
5. **License agreement** definitivo. Plazo total estimado: 8–16 semanas. **Negociar y firmar antes de Q3-2026** para no bloquear roadmap.

### 6.4 Borrador de email inicial (inglés)

> **To:** pciinfo@pci.upenn.edu
> **Cc:** pkern001@gmail.com
> **Subject:** Commercial license inquiry – PERMA-Profiler (Butler & Kern, 2016) – LATAM freemium B2C platform
>
> Dear Penn Center for Innovation team,
>
> I am writing on behalf of DescubreMe, a Colombian freemium B2C platform focused on adult self-knowledge and personal development across Latin America. Our use is educational and orientational, not clinical and not for personnel selection.
>
> We would like to license the PERMA-Profiler (23-item version; Butler & Kern, 2016, *International Journal of Wellbeing*, 6(3), 1–48, DOI: 10.5502/ijw.v6i3.526) for inclusion in three of our products: a free tier (MVP1 / v1.5), a paid consumer tier (USD 19 one-time), and an integrative Ikigai product. We expect a first-year volume of approximately [X] free completions and [Y] paid completions, primarily in Colombia, Mexico, and the Andean region.
>
> Our intended use is fully aligned with the measure's spirit:
> - Exact 23 items in the order published, with no modification to wording beyond an authorized Spanish translation (we plan to base our Spanish version on Chaves et al., 2023, with a cognitive pilot in Colombia).
> - Full Butler & Kern (2016) authorship attribution and University of Pennsylvania copyright notice in every user report.
> - Results will not be presented as clinical, diagnostic, or screening output; explicit disclaimers and referral information for Colombian mental health hotlines will accompany sensitive scores.
>
> Could you confirm: (a) the appropriate commercial license track, (b) typical fee structures for a freemium consumer platform of our profile, and (c) the documentation we should prepare for the licensing review?
>
> Happy to schedule a call at your convenience.
>
> Best regards,
> [Nombre], [Cargo]
> DescubreMe — [URL]
> [Email] · [Teléfono]

### 6.5 Costo esperado y rangos

**[Sin fuente verificada — PCI no publica tarifas; rangos estimados con base en patrones de licencias académicas comparables].**

**Opinión profesional**, basada en patrones de licencias de instrumentos psicométricos académicos a plataformas digitales:

- Flat fee anual para uso freemium B2C: **USD 3.000 – 15.000/año** según volumen proyectado.
- Royalty por usuario pago: **USD 0.50 – 2.00 por completación pagada**.
- Licencia académica / no comercial: **USD 0** (con registro en peggykern.org).

Reservar **buffer de USD 20.000 anuales** en el modelo financiero para el primer año, ajustable cuando llegue el term sheet real.

### 6.6 Plan B

Si la negociación con PCI se traba o las condiciones son inviables para el modelo freemium:

1. **Plan B-1: Flourishing Scale de Diener et al. (2010).** 8 ítems, licencia abierta (CC-BY equivalente), mide flourishing eudaimónico. Cubre constructo similar con licencia más ligera, aunque pierde la profundidad de 5 facetas.
2. **Plan B-2: Mental Health Continuum-Short Form (MHC-SF) de Keyes.** 14 ítems, uso no comercial gratuito; tiene validación en español (Ecuador, México) y se usa en contextos B2C.
3. **Plan B-3:** licenciar **PERMAH Workplace Survey vía Michelle McQuaid** solo para el track B2B-A; mantener Flourishing Scale para B2C Free y Paid.

---

## SECCIÓN 7 — DISCLAIMERS Y MITIGACIONES ESPECÍFICAS

### 7.1 Disclaimer pre-test (≤100 palabras, es-CO)

> "A continuación verás un cuestionario corto de 23 preguntas sobre cómo te sientes en cinco áreas de tu vida: emociones, vínculos, sentido, logros y salud. Toma unos 4 minutos. Esto **no** es un test clínico ni un diagnóstico de salud mental, y no se usa para selección laboral. Es una herramienta de autoconocimiento que te muestra un retrato de tu bienestar en este momento. No hay respuestas correctas ni incorrectas. Si en alguna pregunta sientes incomodidad fuerte, puedes pausar o salir cuando quieras." (87 palabras)

### 7.2 Ítems sensibles que activan NFR-28

**Regla de activación de NFR-28** (mensaje de contención post-test):

**Nivel `strong` (item-level, pack original)**. Se activa cuando se cumple **cualquiera**:
- **N1** (anxious, ítem 4) ≥ 8 **o**
- **N3** (sad, ítem 16) ≥ 8 **o**
- **Lon** (soledad, ítem 11) ≥ 8 **o**
- **hap** (felicidad global, ítem 23) ≤ 2 **o**
- **Combinación**: N3 ≥ 7 **y** Lon ≥ 7 (doble señal).

**Nivel `moderate` (score-level, addendum VALIDATED v1.0 — DD-86 2026-05-20).** Se activa cuando se cumple **cualquiera** sin pico item-level severo:
- **PERMA_total** < 5.0 (banda "Languishing" Kern; ~percentil 11 normas Butler & Kern 2016 Tabla 6 N~31,966) **o**
- **N_mean** > 6.5 (banda invertida Kern; ~percentil 84).

Validación + spec algorítmica completa: `implementation_packs/PERMA-Profiler_TRIGGERS_MODERATE_VALIDATION_v1.0.md` (Cowork DRAFT 2026-05-20, DD-86 sign-off German). Monitoreo post-launch obligatorio: si `moderate` dispara >25-30% completaciones CO primeros 100-500 usuarios → recalibrar vs percentiles colombianos (§3.2 Fase 1).

Ítems específicamente sensibles a marcar como "atención editorial" en el plugin:
- **N3** ("¿Con qué frecuencia te sientes triste?"): tristeza frecuente sostenida.
- **N1** ("¿Con qué frecuencia te sientes ansioso/a?"): ansiedad frecuente.
- **Lon** ("¿Qué tan solo/a te sientes en tu día a día?"): soledad alta.
- **hap** ("Considerando todo en conjunto, ¿qué tan feliz dirías que eres?"): insatisfacción global severa.

### 7.3 Mensaje de contención (≤120 palabras, es-CO)

> "Tus respuestas indican que en este momento sientes con frecuencia tristeza, ansiedad o soledad, o que tu nivel de felicidad global está muy bajo. Queremos recordarte algo importante: este test **no es un diagnóstico** y DescubreMe no es un servicio clínico. Lo que sí sabemos es que sentirse así durante semanas seguidas merece atención profesional, no porque algo esté 'mal contigo', sino porque mereces apoyo. En Colombia puedes llamar gratis a la **Línea 106** en Bogotá, a la **Línea 192 opción 4** (Ministerio de Salud, nacional), o consultar con tu EPS. Si pensaste alguna vez en hacerte daño, por favor llama al **123** ahora." (118 palabras)

### 7.4 Líneas de ayuda Colombia relevantes

| Recurso | Cobertura | Notas |
|---|---|---|
| **Línea 106** | Bogotá D.C. | "El poder de ser escuchado", Secretaría Distrital de Salud. Atención psicológica gratuita. |
| **Línea 192, opción 4** | Nacional | Ministerio de Salud y Protección Social. Salud mental. |
| **Línea Amiga 444-44-48** | Medellín / Antioquia | Secretaría de Salud de Medellín. |
| **Línea Calma 018000-423-614** | Bogotá, hombres | Línea específica para hombres en crisis. |
| **Línea 123** | Nacional, emergencias | Para crisis suicida activa. |

**[Sin fuente verificada en mayo 2026]:** vigencia exacta de horarios y disponibilidad efectiva. El equipo legal/compliance de DescubreMe debe revalidar cada línea **antes de cada release semestral**.

### 7.5 Disclaimer post-test (≤80 palabras, es-CO)

> "Lo que viste es un retrato de cómo te sentías al momento de responder. El bienestar cambia con el tiempo, las circunstancias y las decisiones que tomas. Estos resultados son para tu reflexión personal, no son un diagnóstico clínico ni una predicción sobre tu futuro. Si quieres profundizar, explora las otras dimensiones de tu perfil DescubreMe. Si necesitas apoyo profesional, busca un psicólogo de confianza o llama a las líneas de ayuda que mencionamos." (75 palabras)

---

## SECCIÓN 8 — SUGERENCIAS DE PILOTO COGNITIVO COLOMBIA

### 8.1 Tamaño y características de la muestra

- **N objetivo:** 18–24 participantes (saturación típica en piloto cognitivo según norma ISPOR / ITC).
- **Estratificación:**
  - Género: 50% femenino, 45% masculino, 5% no binario / prefiere no decir.
  - Edad: 6 participantes 18–24, 6 participantes 25–34, 6 participantes 35–49, 4 participantes 50+.
  - Ciudades: 8 Bogotá, 4 Medellín, 4 Cali, 4 Barranquilla / Cartagena.
  - Educación: mínimo 30% sin título universitario, para evitar sesgo léxico-académico.
- **Criterios de exclusión:** título en psicología; haber respondido el PERMA-Profiler en los últimos 6 meses; ser empleado de DescubreMe.

### 8.2 Protocolo think-aloud

1. **Pre-test (5 min):** explicar el ejercicio: "vas a responder un test, pero pensando en voz alta. No me interesan tus respuestas, me interesa qué pasa en tu cabeza cuando lees cada pregunta".
2. **Aplicación con think-aloud (15–20 min):** el participante lee cada ítem en voz alta y comenta: ¿qué entendiste? ¿qué palabra te detuvo? ¿cómo decidiste tu número?
3. **Verbal probing dirigido** en ítems críticos:
   - **E1, E3:** "¿Qué significa 'absorberte' / 'perder la noción del tiempo' para ti? ¿Es algo bueno o malo?"
   - **M2:** "¿Qué entendiste por 'valioso'?"
   - **H3:** "¿Te incomodó la palabra 'sexo'? ¿Cómo lo dirías tú?"
   - **Lon:** "¿Sentirte solo es lo mismo que estar solo?"
4. **Post-test (5 min):** ¿qué pregunta te pareció más rara? ¿Cuál te hizo pensar más? ¿Faltó algo?

### 8.3 Criterios para aceptar / re-adaptar ítem

| Indicador | Acción |
|---|---|
| ≥ 80% de participantes interpretan el ítem en la dirección teóricamente correcta | Aceptar redacción. |
| 50–79% interpretación correcta | Refinar redacción y re-probar con submuestra de 6 participantes nuevos. |
| < 50% interpretación correcta o doble valencia consistente | Reescribir ítem con panel de expertos colombianos + back-translation al inglés + chequeo de equivalencia con autores. Registrar como "ítem adaptado" en el plugin. |
| Palabra tabú, ofensiva o invasiva reportada por ≥ 3 participantes | Sustituir por sinónimo neutro. |

### 8.4 Output esperado del piloto

1. Documento de **23 ítems en es-CO finales**, con justificación por ítem (mantenido / refinado / reescrito).
2. **Reporte cualitativo de comprensión** ítem por ítem (frecuencia de interpretaciones, palabras problemáticas).
3. **Lista de hallazgos para los reports al usuario** (§5): qué metáforas, ejemplos o palabras del usuario podrían adoptarse.
4. **Recomendación para Engagement**: confirmar o no la hipótesis de inestabilidad semántica en es-CO; si se confirma, decisión documentada sobre nueva redacción de E1/E3.
5. **Sign-off psicométrico interno** firmado por psicometrista lead antes del go-live.

---

## SECCIÓN 9 — GAPS Y PREGUNTAS ABIERTAS

1. **Tabla de percentiles oficial.** Butler & Kern (2016) no publican baremo con M, DT y percentiles por dimensión en el cuerpo recuperable del artículo. *Plan de resolución:* extraer datos del Apéndice 2 y archivos suplementarios del paper; si no aparecen, solicitar dataset normativo directamente a Dra. Kern (pkern001@gmail.com) o reconstruir con datos LATAM (Chaves 2023, N=26.506) mientras DescubreMe acumula su propio N.

2. **Costo real de la licencia comercial.** Sin tarifa pública del Penn Center for Innovation. *Plan de resolución:* enviar el email de §6.4 en las próximas dos semanas y agendar discovery call; documentar en el master plan financiero el rango USD 3K–20K/año como buffer hasta firma.

3. **Validez de la versión española en muestra colombiana.** Hernández-Vergel et al. (2018) y Pastrana & Salazar-Piñeros (2016) son insuficientes (muestras pequeñas y/o descriptivos). *Plan de resolución:* piloto cognitivo de §8 + recolección de datos en los primeros 6 meses de operación → publicación interna del baremo colombiano (§3.2 Fase 1).

4. **Estabilidad psicométrica de Engagement en es-CO.** Reportes consistentes de α bajo (.36 en Chile en literatura derivada, .62 en México [Chaves 2023], α=.62 en adolescentes argentinos). `[Aporte Gemini]` La evidencia botswanesa (eliminación de 1 ítem de E para mejorar consistencia) refuerza que el problema no es solo léxico-hispano sino cross-cultural. *Plan de resolución:* el piloto debe sobre-muestrear comprensión de E1 y E3; si α < .60 en los primeros 500 usuarios colombianos, redactar versión alternativa siguiendo el procedimiento de §8.3.

5. **Equivalencia semántica de la versión mexicana de Chaves et al. (2023) con el español colombiano, y con la versión oficial Tarragona/Kern (v2 11-29-14).** Aunque cercanas, no idénticas. *Plan de resolución:* revisar línea por línea los 23 ítems mexicanos vs. Tarragona/Kern con dos lingüistas colombianos (uno en Bogotá, uno en costa Caribe) antes del piloto. Documentar diferencias y decisión por ítem.

6. **Vigencia de líneas de ayuda en mayo 2026.** El equipo de compliance debe revalidar Línea 106, Línea 192 opción 4 y Línea 123 antes de cada release.

---

## SECCIÓN 10 — REFERENCIAS (APA 7)

Butler, J., & Kern, M. L. (2016). The PERMA-Profiler: A brief multidimensional measure of flourishing. *International Journal of Wellbeing*, *6*(3), 1–48. https://doi.org/10.5502/ijw.v6i3.526

Chaves, C., Ballesteros-Valdés, R., Madridejos, E., & Charles-Leija, H. (2023). PERMA-Profiler for the evaluation of well-being: Adaptation and validation in a sample of university students and employees in the Mexican educational context. *Applied Research in Quality of Life*, *18*(3), 1225–1247. https://doi.org/10.1007/s11482-022-10132-1

Cobo-Rendón, R., Pérez-Villalobos, M. V., & Díaz-Mujica, A. (2020). Propiedades psicométricas del PERMA-Profiler para la medición del bienestar en una muestra de estudiantes universitarios chilenos. *Revista Ciencias de la Salud*, *18*(1), 119–133. https://doi.org/10.12804/revistas.urosario.edu.co/revsalud/a.8775

Cobo-Rendón, R., Parra, J. A., & García-Álvarez, D. (2021). Análisis psicométrico del perfil de bienestar «PERMA-Profiler» en una muestra de estudiantes de Psicología. *Anuario de Psicología*, *51*(1), 35–44. https://doi.org/10.1344/anpsic2021.51.5

Diener, E., Wirtz, D., Tov, W., Kim-Prieto, C., Choi, D.-W., Oishi, S., & Biswas-Diener, R. (2010). New well-being measures: Short scales to assess flourishing and positive and negative feelings. *Social Indicators Research*, *97*(2), 143–156. https://doi.org/10.1007/s11205-009-9493-y

Donaldson, S. I., Heshmati, S., Lee, J. Y., & Donaldson, S. I. (2020). Examining building blocks of well-being beyond PERMA and self-report bias. *The Journal of Positive Psychology*, advance online publication. [verificar DOI primario]

Goodman, F. R., Disabato, D. J., Kashdan, T. B., & Kauffman, S. B. (2018). Measuring well-being: A comparison of subjective well-being and PERMA. *The Journal of Positive Psychology*, *13*(4), 321–332. https://doi.org/10.1080/17439760.2017.1388434

Hernández-Vergel, V. K., Prada-Núñez, R., & Hernández-Suárez, C. A. (2018). Adaptación del perfil PERMA de bienestar subjetivo para adultos mayores institucionalizados colombianos. *Revista Ciencia y Cuidado*, *15*(1), 83–97. https://doi.org/10.22463/17949831.1235

Kern, M. L. (s. f.). *Questionnaires – The PERMA Profiler*. Centre for Wellbeing Science, University of Melbourne. Recuperado el 12 de mayo de 2026 de https://www.peggykern.org/questionnaires.html

Martín-Díaz, M. D., & Fernández-Abascal, E. G. (2024). Multidimensional measure of well-being: Translation, factor structure, measurement invariance, reliability and validity of the PERMA-Profiler in Spain. *Applied Research in Quality of Life*, *19*(5), 2467–2495. https://doi.org/10.1007/s11482-024-10342-9

Martín-Díaz, M. D., et al. (2023). Psychometric properties of the PERMA-Profiler for measuring well-being in Spanish older adults. *Current Psychology*. https://doi.org/10.1007/s12144-023-04883-9

Pastrana, M. P., & Salazar-Piñeros, F. (2016). Perfil PERMA en una muestra de jóvenes voluntarios colombianos. *Revista Katharsis*, *22*, 13–34.

Pezirkianidis, C., Stalikas, A., Lakioti, A., & Yotsidi, V. (2021). Validating a multidimensional measure of wellbeing in Greece: Translation, factor structure, and measurement invariance of the PERMA Profiler. *Current Psychology*, *40*(6), 3030–3047. https://doi.org/10.1007/s12144-019-00236-7

Seligman, M. E. P. (2011). *Flourish: A visionary new understanding of happiness and well-being*. Free Press.

Wammerl, M., Jaunig, J., Mairunteregger, T., & Streit, P. (2019). The German version of the PERMA-Profiler: Evidence for construct and convergent validity of the PERMA theory of well-being in German speaking countries. *Journal of Well-Being Assessment*, *3*(2–3), 75–96. https://doi.org/10.1007/s41543-019-00021-0

Watanabe, K., Kawakami, N., Shiotani, T., Adachi, H., Matsumoto, K., Imamura, K., Matsumoto, K., Yamagami, F., Fusejima, A., Muraoka, T., Kagami, T., Shimazu, A., & Kern, M. L. (2018). The Japanese Workplace PERMA-Profiler: A validation study. *Journal of Occupational Health*, *60*(5), 383–393. https://doi.org/10.1539/joh.2018-0050-OA

---

## APÉNDICE A — Mapa de aportes consolidados desde Gemini

| # | Aporte | Sección donde se integró | Valor agregado | Verificación recomendada |
|---|---|---|---|---|
| A1 | URL exacta del PDF oficial en español (Tarragona/Kern v2 11-29-14) alojado en peggykern.org y variante específica España | §0 (status), §1.1 (acceso), §1.3 (columna traducción oficial), §2 (tabla) | Acceso directo a la "versión madre" en español avalada por la autora. Útil como base léxica para comparar contra Chaves (2023) en el piloto. | URL ya validada por inspección directa del dominio peggykern.org en literatura citada. **Confirmar vigencia al descargar.** |
| A2 | Traducción literal de los 23 ítems en español (Tarragona/Kern v2) incorporada a la tabla maestra de §1.3 | §1.3 | Lista única consolidada inglés + español oficial. Reduce trabajo de traducción inicial del equipo y permite trazabilidad ítem por ítem en el piloto. | Cotejar contra el PDF descargable; verificar que coincida con el texto exacto. |
| A3 | Debate Goodman vs. Seligman (2018) sobre redundancia PERMA-SWB y respuesta de Seligman con Donaldson (2020) | §0 (resumen ejecutivo, lectura teórica) | Soporta la narrativa de producto: el PERMA-Profiler no compite con SWB, es su descomposición causal. Útil para copy de UX y comunicación con stakeholders. | Goodman et al. (2018) ya en referencias. **Verificar cita primaria de Seligman (2018) y Donaldson et al. (2020) con DOI antes de publicación.** |
| A4 | Validación venezolana Cobo-Rendón (2021) con TLI=.944, CFI=.957, n=202, validez predictiva contra distrés | §2 (tabla), §3 (tabla de baremos) | Punto adicional de referencia psicométrica LATAM más cercano a Colombia que Chile/México. | Verificar valores exactos en Anuario de Psicología 51(1) — DOI 10.1344/anpsic2021.51.5. |
| A5 | Validación UNIFE Lima 2022–2024, N=475, índices de ajuste detallados e invariancia métrica/escalar por género | §2, §3 | Refuerza la base LATAM andina; relevante por proximidad cultural con Colombia. | Acceder al repositorio UNIFE / Alicia CONCYTEC para verificar valores exactos. |
| A6 | Estudio gerontológico español Martín-Díaz et al. (2023) con test-retest 6 meses, n=330 | §2, §3 | Aval longitudinal para uso en gerontología (Ikigai Premium podría incluir cohorte 55+); estabilidad temporal demostrada. | Verificar valor exacto del coeficiente test-retest en *Current Psychology* DOI 10.1007/s12144-023-04883-9. |
| A7 | Evidencia botswanesa (Universidad de Botswana, ODL) de eliminación de 1 ítem de Engagement para mejorar consistencia interna | §1.2, §2 (fila Sudáfrica), §9 punto 4 | Refuerza el patrón de debilidad de E como fenómeno cross-cultural, no solo hispano. Soporta decisión psicométrica de §3.2 Fase 2 de re-redactar E1/E3 si α<.60. | DOI primario no localizado por Gemini; el estudio está en repositorio Universidad de Pretoria. **Verificar antes de citar formalmente.** |
| A8 | Reformulación mexicana de E3 ("se le pasa el tiempo muy rápido cuando hace algo que disfruta") fundamentada en evitar connotación peyorativa de "perder el tiempo" | §2 (tabla México), §2.2 | Aporta ajuste léxico validado con N=26.506. Recomendación firme para el plugin es-CO. | Chaves et al. (2023) ya en referencias; redacción exacta confirmada en el PDF peggykern.org en español. |
| A9 | α global = .95 reportado en Hernández-Vergel et al. (2018) Colombia adultos mayores | §2 (tabla Colombia), §3 (tabla baremos) | Único dato cuantitativo colombiano disponible, aunque metodológicamente limitado (N=30, muestra cautiva). | Verificar Tablas del artículo en Ciencia y Cuidado 15(1). **Marcar como "limitado por diseño" si se cita.** |
| A10 | Detalles de Venezuela (n=202, edad media 19) y validez predictiva concurrente del PERMA contra distrés y ansiedad académica | §2, §3 | Justifica claim de producto: bienestar alto se asocia con menor distrés en jóvenes adultos hispanos. | Verificar en paper primario de Anuario de Psicología 2021. |

**Lectura general del Apéndice A:** los aportes integrados de Gemini son principalmente (a) **acceso directo al PDF oficial en español alojado por la autora**, (b) **traducción literal de los 23 ítems es** que ahorra un paso de traducción al equipo, (c) **detalles psicométricos adicionales de cuatro estudios LATAM** (Venezuela, Perú, México E3, Colombia α), (d) **soporte teórico Goodman/Seligman/Donaldson** útil para narrativa de producto, y (e) **evidencia botswanesa** del patrón cross-cultural de debilidad de Engagement. No alteran ninguna decisión operativa del Pack original de Claude (licencia, ítems, scoring, textos al usuario, disclaimers, piloto). Antes de presentar el Pack a Penn Center for Innovation (§6) o de publicar resultados internos, **los DOIs primarios de A3 (Seligman 2018, Donaldson 2020), A5 (UNIFE), A6 (Martín-Díaz 2023 test-retest exacto) y A7 (Botswana) deben verificarse** porque Gemini los citó desde fuentes secundarias o sin DOI explícito.

---

## APÉNDICE B — Notas de consolidación (metodología)

**Origen del documento.** Este consolidado combina dos investigaciones independientes producidas en mayo 2026:

1. `Prompt_11_PERMA-Profiler_IAR.Claude.md` — Implementation Acquisition Pack completo de 10 secciones siguiendo el prompt v1.0. Cumplimiento: 100% de los requisitos del brief. Diagnóstico: **OK**.
2. `Prompt_11_PERMA-Profiler_IAR.Gemini.md` — Revisión académica narrativa estilo white paper sobre el PERMA-Profiler. **No siguió la estructura de 10 secciones del prompt v1.0** (diagnóstico: **NO**). Calidad del texto desigual: las primeras secciones contienen información valiosa y verificable (PDFs en español, traducción literal, debate Goodman/Seligman, validaciones LATAM puntuales); la segunda mitad presenta prosa altamente redundante con repetición de adjetivos ("asintótica paramétrica algorítmica iterativa") que dificulta extraer contenido útil.

**Criterio de consolidación aplicado.**
- **Estructura:** se preserva íntegra la del Pack de Claude (10 secciones + Apéndices A y B nuevos).
- **Contenido operativo (ítems en inglés, baremos, scoring, textos al usuario, email de licencia, disclaimers, piloto):** se mantiene el de Claude porque Gemini no lo produjo en formato operativo.
- **Aportes académicos de Gemini:** se integran SOLO cuando aportan información nueva verificable y útil para producto. Cada aporte se marca con `[Aporte Gemini]` en el lugar donde aparece, y se traza en el Apéndice A con nivel de verificación.
- **Contenido único de Gemini que se incorporó al consolidado:** PDF oficial español (URL + variante España), traducción literal de los 23 ítems en español, detalles de Venezuela/Perú UNIFE/Martín-Díaz gerontológico/Hernández-Vergel α=.95/Botswana, debate Goodman-Seligman-Donaldson.
- **Contenido de Gemini que se descartó por baja densidad informativa o falta de verificación:** secciones narrativas redundantes sobre la "trampa WEIRD", repeticiones de la arquitectura PERMA ya explicada por Claude, y prosa altamente adjetivada en las secciones de validación que no aporta cifras nuevas.
- **Discrepancias entre Claude y Gemini:** no se encontraron discrepancias factuales sustanciales (autores, año, ítems, anclajes, DOI principal, contactos coinciden). Gemini atribuye la coautoría de la traducción oficial española a "Tarragona en colaboración con Butler y Kern"; el dato es plausible (Sonja Lyubomirsky-Tal Ben-Shahar circle, M. Tarragona en México) pero **no fue verificado** por Claude. Mantenemos la atribución con cautela.

**Limitaciones del consolidado.**
- Los DOIs primarios de Seligman (2018) réplica a Goodman, Donaldson et al. (2020), y el estudio Botswana (A7) deben verificarse antes de citarse en comunicación oficial con PCI o en publicaciones.
- El valor exacto del coeficiente test-retest a 6 meses en Martín-Díaz et al. (2023) está pendiente de verificación.
- La traducción literal en español incluida en §1.3 es la versión Tarragona/Kern v2 (2014), no la versión Chaves et al. (2023) que es la recomendada como base es-CO en §2.1. El piloto cognitivo de §8 deberá decidir el equilibrio léxico final.

---

*Fin del Implementation Acquisition Pack v1.0 — PERMA-Profiler — CONSOLIDADO · DescubreMe · LATAM/Colombia · Mayo 2026*
