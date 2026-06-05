# Dossier de Investigación Profunda v2.1 — NEO-PI-3 / NEO-FFI-3

**Proyecto:** DescubreMe — plataforma freemium B2C de autoconocimiento profundo (LATAM, foco Colombia, no clínico, no selección de personal)
**Decisión que respalda:** Confirmación de NEO-PI-3 como **referencia teórica fuera del stack implementable** (Track A Paid v1.5 Q1 2027). Validación de hipótesis: licencia PAR Inc. con tarifa por aplicación es estructuralmente inviable para freemium LATAM.
**Fecha de cierre:** 10 de mayo de 2026
**Versión consolidada:** síntesis unificada de dossiers Claude y Gemini, datos comerciales verificados contra páginas oficiales de PAR, Hogrefe, SIGMA y TEA Ediciones.

---

## SECCIÓN 0 — PORTADA Y RESUMEN EJECUTIVO

**Instrumento:** NEO Personality Inventory-3 (NEO-PI-3, 240 ítems) y NEO Five-Factor Inventory-3 (NEO-FFI-3, 60 ítems).
**Autores:** McCrae, R. R., Costa, P. T. Jr., y Martin, T. A. (NEO-PI-3, 2005); McCrae y Costa (NEO-FFI-3, 2010).
**Año original:** NEO-PI-3 publicado en 2005; manual unificado NEO-PI-3 / NEO-FFI-3 / NEO-PI-R en 2010; **Normative Update (NU) 2024** con muestra censal EE.UU. 2020.
**Idioma original:** inglés (US y UK).
**Editor:** Psychological Assessment Resources, Inc. (PAR Inc., Lutz, FL, EE.UU.). Distribuidores: Hogrefe Ltd UK, Hogrefe TEA Ediciones (España y LATAM), SIGMA Assessment Systems (Canadá), PAA (Australia/NZ) y Manual Moderno (LATAM, filial Hogrefe desde 2 abril 2025).
**Versiones disponibles:** NEO-PI-3 (240 ítems Form S y Form R), NEO-PI-3:4FV (192 ítems sin Neuroticismo), NEO-FFI-3 (60 ítems), NEO-FFI-3:4FV (48 ítems), NEO-PI-3 First Half (120 ítems), NEO Style Graph, NEO Problems in Living Checklist y NEO Job Profiler.
**Adaptaciones al español:** Cordero, Pamos, Seisdedos y Avia (NEO-PI-R, TEA, 1999/2008); Arribas et al. (NEO-PI-3 español, Hogrefe TEA Ediciones, 2024); PAR Spanish NU (2024); JS NEO adolescentes (Ortet et al., 2007/2012); validación NEO-FFI-30 español (Aluja et al., 2005); validación peruana NEO-FFI (Martínez-Uribe y Cassaretto, 2011); validación NEO-FFI en adultos mayores colombianos (SciELO Colombia, 2022).

**Resumen ejecutivo (3-5 líneas).** El NEO-PI-3 es la operacionalización comercial gold-standard del Five-Factor Model (FFM) Costa-McCrae, con 5 dominios y 30 facetas, fiabilidad α de dominios .87-.94 (NU 2024) y validez transcultural replicada en más de 50 culturas. Sus dos limitaciones estructurales para DescubreMe son: (1) copyright comercial restrictivo de PAR Inc. con tarifa por aplicación entre USD 6 y USD 38 según canal (SIGMA: USD 38/admin; TEA Ediciones: ≈ USD 22.50/admin con informe), y (2) ausencia de API pública en PARiConnect/HTS que impide self-host en stack Next.js + Supabase + Vercel. Para un volumen freemium de 10.000-50.000 administraciones/año en LATAM el costo de licencia oscila entre USD 60.000 y USD 500.000+ anuales, estructuralmente incompatible con ingreso medio paid de USD 19.99 por usuario. Existen sustitutos open-source (BFI-2-S y IPIP-NEO-120) que capturan el 85-90 % del valor del constructo Big Five sin restricción comercial.

**Recomendación ejecutiva.** **EXCLUIR del stack implementable de DescubreMe** en MVP1, v1.5 y v2.0. NEO-PI-3 queda como **referencia teórica de validación cruzada** en documentación interna del Track A Paid. Reabrir la decisión únicamente si DescubreMe pivota a tier B2B premium con pricing > USD 200/usuario, o si Manual Moderno publica un acuerdo white-label para apps consumer en LATAM. **Hipótesis confirmada:** la licencia PAR Inc. con tarifa por aplicación hace inviable la integración del NEO-PI-3 en un modelo freemium LATAM con volumen 10.000-50.000 admin/año.

---

## SECCIÓN 1 — CONSTRUCTO MEDIDO

### 1.1 El Five-Factor Model y la arquitectura jerárquica del NEO

**Hecho:** El NEO-PI-3 operacionaliza el **Five-Factor Model (FFM) de Costa-McCrae**, taxonomía dominante en evaluación de personalidad normal adulta desde la consolidación léxica de los Big Five (Costa y McCrae, 1992; McCrae y Costa, 2008). El instrumento estructura la personalidad en cinco dominios amplios — Neuroticismo (N), Extraversión (E), Apertura a la Experiencia (O), Amabilidad (A) y Responsabilidad (C) — y descompone cada dominio en **seis facetas** subordinadas, produciendo un perfil topográfico de **30 facetas**.

| Dominio | Facetas (FFM Costa-McCrae) |
|---|---|
| Neuroticismo (N) | N1 Ansiedad, N2 Hostilidad, N3 Depresión, N4 Ansiedad social, N5 Impulsividad, N6 Vulnerabilidad |
| Extraversión (E) | E1 Cordialidad, E2 Gregarismo, E3 Asertividad, E4 Actividad, E5 Búsqueda de emociones, E6 Emociones positivas |
| Apertura (O) | O1 Fantasía, O2 Estética, O3 Sentimientos, O4 Acciones, O5 Ideas, O6 Valores |
| Amabilidad (A) | A1 Confianza, A2 Franqueza, A3 Altruismo, A4 Actitud conciliadora, A5 Modestia, A6 Sensibilidad a los demás |
| Responsabilidad (C) | C1 Competencia, C2 Orden, C3 Sentido del deber, C4 Necesidad de logro, C5 Autodisciplina, C6 Deliberación |

### 1.2 Linaje histórico

**Hecho:** Cronología verificada:

- **1978:** NEO-I (Costa y McCrae) mide solo N, E, O.
- **1985:** NEO-PI con cinco factores y facetas para N, E, O.
- **1992:** NEO-PI-R, 240 ítems con 6 facetas en cada uno de los cinco dominios.
- **2005:** NEO-PI-3 reemplaza 37-38 ítems del NEO-PI-R por dificultades de comprensión en adolescentes y población de baja escolaridad; reduce la legibilidad a equivalente Flesch-Kincaid grado 5.3.
- **2010:** Manual unificado NEO Inventories (NEO-PI-3, NEO-FFI-3 y NEO-PI-R) publicado por PAR; introduce el NEO-FFI-3 con 15 ítems revisados sobre el NEO-FFI 1989.
- **2024:** NEO-PI-3 Normative Update (NU), con muestra normativa N = 1.855 Self-Report y N = 1.200 Informant Report representativa del Censo EE.UU. 2020; introduce escalas SKK (Schinka, Kinder y Kremer) de validez Positive/Negative Presentation Management.

### 1.3 Justificación de la revisión 2005

**Hecho:** McCrae, Costa y Martin (2005) identificaron en muestras de campo que ítems del NEO-PI-R con vocabulario de baja frecuencia léxica (en inglés: "fastidious", "panhandlers", "lackadaisical", "shrewdness") generaban omisiones y respuestas no informativas en adolescentes y adultos con escolaridad básica. Se reemplazaron 30 ítems con comprensión deficiente (≥ 2 % de no comprensión en adolescentes) y 18 ítems con bajas correlaciones ítem-total, conservando la estructura factorial original. El resultado bajó el umbral de aplicación confiable a **12 años**.

### 1.4 NEO-FFI-3 como versión breve

**Hecho:** El NEO-FFI-3 es la forma corta de 60 ítems (12 por dominio) que mide **solo los cinco dominios sin facetas**. McCrae y Costa (2007, 2010) revisaron 15 ítems del NEO-FFI 1989 para mejorar fiabilidad y legibilidad. Tiempo de administración: 10-15 minutos. **Inferencia:** el NEO-FFI-3 sacrifica la resolución facetal del PI-3 a cambio de eficiencia temporal, lo que lo hace funcionalmente comparable al BFI-2 60 (pero con menor fiabilidad y sin balance de claves directas/inversas).

### 1.5 Relación con instrumentos cercanos

**Hecho:** En la literatura de validez convergente:

- **BFI-2** (Soto y John, 2017): correlaciones monorasgo-heterométodo r ≈ .75 con NEO-FFI y r ≈ .72 con NEO-PI-R en muestras estadounidenses originales.
- **IPIP-NEO-120** (Johnson, 2014): replica las 30 facetas del NEO-PI-R con r = .66 promedio sin corregir y r = .91 corregido por atenuación a nivel de faceta; r = .85-.90 (mediana .87) a nivel de dominio (Maples et al., 2014).
- **IPIP-NEO-300** (Goldberg, 1999): 30 facetas con 10 ítems cada una, dominio público.
- **HEXACO-PI-R** (Lee y Ashton, 2018): seis dominios incluyendo Honestidad-Humildad (factor H), 100/200 ítems, libre para investigación.
- **Mini-IPIP** (Donnellan et al., 2006): solo dominios, 20 ítems.

**Inferencia:** el NEO-PI-3 mantiene primacía académica para FFM en contextos clínicos y forenses, pero **IPIP-NEO-120 replica el constructo al 85-90 % del valor sin restricción comercial**, lo que es decisivo para B2C masivo.

### 1.6 El cisma HEXACO y la captura de la varianza

**Hecho:** Lee y Ashton (2018) y Ashton et al. (vía Hogrefe eContent, *Journal of Individual Differences*, 2020) argumentan que la investigación léxica trans-lingüística revela seis factores ortogonales en lugar de cinco; el factor adicional **Honestidad-Humildad (H)** captura varianza única asociada a psicopatía corporativa, narcisismo, maquiavelismo y conductas contraproducentes (Tétrada Oscura). En el NEO-PI-3, los componentes de rectitud y modestia están **subsumidos en las facetas A2 Franqueza y A5 Modestia** del dominio Amabilidad, lo que produce pérdida marginal de varianza explicativa para patología corporativa. **Inferencia:** para DescubreMe (autoconocimiento no clínico), esta limitación es secundaria; HEXACO sería relevante solo si se pivota a contextos de integridad laboral o evaluación forense, escenarios fuera del scope freemium.

---

## SECCIÓN 2 — ESTRUCTURA DEL INSTRUMENTO

### 2.1 NEO-PI-3 (forma completa)

- **Hecho:** 240 ítems + 1 ítem de validez ("he intentado contestar honestamente"), 8 ítems por faceta × 30 facetas (48 ítems por dominio).
- Escala Likert de 5 puntos: convención PAR de 0 (*Strongly Disagree*) a 4 (*Strongly Agree*).
- Tiempo de administración: 30-45 minutos para adultos sin deterioro cognitivo; el manual recomienda invalidar protocolos con > 40 ítems en blanco.
- Forma S (Self-Report) y Forma R (Observer Report, redactada en tercera persona; versiones masculino/femenino).

### 2.2 NEO-FFI-3 (forma breve)

- **Hecho:** 60 ítems (12 por dominio), escala Likert de 5 puntos, tiempo de administración 10-15 minutos. **No mide facetas.**
- Variantes: NEO-FFI-3 estándar y NEO-FFI-3:4FV (48 ítems sin Neuroticismo).

### 2.3 NEO-PI-3 First Half (FH)

**Hecho:** McCrae y Costa (2007) describieron una versión de los **primeros 120 ítems** del NEO-PI-3 que evalúa las 30 facetas con menor precisión; los puntajes se interpretan con normas NEO-PI-3 duplicando valores. **Inferencia:** alternativa intermedia entre PI-3 240 y FFI-3 60, raramente usada en LATAM.

### 2.4 Balance de claves y control de aquiescencia

**Hecho:** El NEO-PI-3 incluye ítems con codificación inversa (aproximadamente la mitad), pero **no balancea ítems directos e inversos por escala o por faceta** como sí lo hace el BFI-2 (Soto y John, 2017). Esto deja la prueba expuesta a aquiescencia y a contaminación inter-escala por estilo de respuesta. PAR mitiga esto mediante las escalas SKK (PPM y NPM) introducidas en la NU 2024.

### 2.5 Anti-alucinación de ítems

**Hecho:** No se reproducen ítems literales del NEO-PI-3 ni del NEO-FFI-3 en este dossier. El copyright PAR (© 1985, 1988, 1992, 1994, 2000, 2010, 2024 by PAR, Inc.) prohíbe la reproducción de ítems sin permiso escrito. Para acceso a los ítems es obligatorio adquirir el manual técnico vía PAR (USD 116-150) o vía Hogrefe TEA Ediciones (estimado €200-400). El pseudocódigo de la Sección 13 usa marcadores `declare` para los mapas de ítems.

---

## SECCIÓN 3 — PROPIEDADES PSICOMÉTRICAS

### 3.1 Muestras normativas

**Hecho:** Cronología de muestras:

- **NEO-PI-3 versión 2005 adultos** (McCrae, Martin y Costa, 2005): muestra adolescentes 14-20 años (N = 500) y adultos.
- **NEO-PI-3 Normative Update 2024** (PAR, 2024): N = 1.855 Self-Report y N = 1.200 Informant Report, representativa del Censo EE.UU. 2020 (estratificada por edad, género, raza/etnia, educación).
- **Validación griega** (Fountoulakis et al., 2014): N = 734, población general, 59.4 % mujeres.
- **Validación árabe** (NEO-FFI-3): N = 1.373 universitarios kuwaitíes, α dominios .72-.82, 53.98 % de varianza explicada.
- **Adultos mayores colombianos** (SciELO Colombia, *Psicología desde el Caribe*, 2022): N = 617 adultos mayores en Bogotá, validación NEO-FFI con limitaciones estructurales.

### 3.2 Confiabilidad — NEO-PI-3 (NU 2024)

| Nivel | α Cronbach | ICC test-retest |
|---|---|---|
| Dominios Self-Report | .87 - .94 | .71 - .90 |
| Dominios Informant Report | n/d (similar) | .72 - .95 |
| Facetas Self-Report (8 ítems c/u) | .54 - .84 (mediana .75) | n/d |

**Hecho:** Versión 2005 original adultos: dominios α = .89-.93; facetas α = .51-.86 (mediana .75). Adolescentes 14-20 (N = 500): dominios α = .87-.94; facetas α = .44-.84 (mediana .73).

### 3.3 Confiabilidad — NEO-FFI-3 (NU 2024)

| Nivel | α Cronbach | ICC test-retest |
|---|---|---|
| Dominios Self-Report | .72 - .87 | .79 - .91 |
| Dominios Informant Report | .73 - .90 | .82 - .94 |

### 3.4 Validez factorial (CFA)

**Hecho:** McCrae y Terracciano (2005) replicaron la estructura de cinco factores en **50+ culturas** con datos auto-reporte e informante (NIH Personality Profiles of Cultures Project). En muestras hispano-hablantes, la adaptación TEA Ediciones reporta consistencias internas globales en el rango α .82-.92 (adultos) en los cinco dominios.

**Caveat colombiano:** Acosta-Prado et al. (2022, *Psicología desde el Caribe*) reportaron que en adultos mayores bogotanos (N = 617) el NEO-FFI **no alcanzó ajuste adecuado** en CFA de primer orden ni en modelos bi-factoriales; las dimensiones Apertura y Amabilidad mostraron cargas factoriales débiles y consistencia interna deprimida, requiriendo eliminación de ítems específicos (p. ej., ítem 6 de Neuroticismo, ítem 42 de Extraversión). Neuroticismo y Extraversión sí mostraron robustez aceptable.

### 3.5 Validez convergente

**Hecho:** Correlaciones documentadas:

- NEO-FFI-3 ↔ NEO-PI-3 dominios correspondientes: r > .85.
- NEO-PI-3 ↔ BFI-2: r ≈ .70-.85 a nivel de dominio.
- NEO-PI-3 ↔ IPIP-NEO-120: r ≈ .80-.90 a nivel de dominio (Maples et al., 2014; inferido de comparación IPIP-NEO ↔ NEO-PI-R).
- Acuerdo self-informant NEO-PI-3 (NU 2024): consistente con r típica del FFM (~.40-.55 según faceta).

### 3.6 Invarianza de medida

**Hecho:** McCrae y Terracciano (2005) y McCrae y Allik (2002) establecieron equivalencia estructural cross-cultural en 50+ culturas, aunque la **invarianza escalar** estricta no se confirma en todos los dominios (especialmente Apertura en culturas no-WEIRD). Versión española (TEA Ediciones, Hogrefe): consistencias internas adultos α = .82-.92 en los cinco dominios. No se localizó estudio peer-reviewed de invarianza escalar entre poblaciones hispanohablantes (España, México, Colombia, Argentina).

### 3.7 Escalas de validez SKK (NU 2024)

**Hecho:** La Normative Update 2024 institucionalizó las escalas auxiliares de Schinka, Kinder y Kremer:

- **Positive Presentation Management (PPM):** detecta "faking good" o simulación defensiva, relevante en selección B2B y custodia infantil.
- **Negative Presentation Management (NPM):** detecta "faking bad" o exageración sintomatológica, relevante en evaluaciones forenses y litigios.

**Inferencia:** estas escalas son útiles en contextos clínico-forenses pero **no son necesarias en autoconocimiento no clínico** como DescubreMe; refuerzan, sin embargo, el posicionamiento clínico del instrumento.

### 3.8 Limitaciones psicométricas relevantes

1. α facetas en rango .54-.84 (8 ítems por faceta) limita la **interpretación individual** en facetas con α < .65.
2. Ausencia de balance directo/inverso por escala → expuesto a aquiescencia (Soto y John, 2017).
3. Normas históricamente sesgadas a estudiantes universitarios anglosajones; la NU 2024 mejora pero sigue siendo referente censal EE.UU.
4. Curvas IRT del FFM convencional muestran pérdida de precisión en extremos altos de los rasgos (consistente con hallazgos del BFI-2; literatura IRT argentina).

---

## SECCIÓN 4 — ADAPTACIONES CULTURALES DISPONIBLES

### 4.1 Tabla resumen

| País / lengua | Cita / autor | N | Diseño | Hallazgos clave |
|---|---|---|---|---|
| **España (NEO-PI-R)** | Cordero, Pamos, Seisdedos y Avia (1999/2008). TEA Ediciones. ISBN 978-84-7174-917-8 | n/d | Back-translation, baremos adultos | Consistencias dominios α .82-.92; baremos hiper-segmentados (adultos, selección general, fuerzas y cuerpos de seguridad) |
| **España (NEO-PI-3)** | Arribas, D. (2024). Hogrefe TEA Ediciones | n/d | Adaptación oficial NEO-PI-3 español europeo | Manual técnico publicado por Hogrefe TEA, costo aplicación + informe ≈ €20.95 por administración |
| **España (NEO-FFI-30)** | Aluja, García, Rossier y García (2005). *Personality and Individual Differences*, 38(3), 591-604. DOI: 10.1016/j.paid.2004.05.014 | suizos + españoles | Comparación NEO-FFI vs NEO-FFI-R vs NEO-60 | Equivalencia psicométrica aceptable en español ibérico |
| **España adolescentes (JS NEO)** | Ortet, Ibáñez, Moya et al. (2012). *Assessment*, 19(1), 114-130. DOI: 10.1177/1073191111410166 | n/d | Adaptación Junior NEO-PI-R | Versión adolescente española validada |
| **PSN (Personality Self-Notion adolescente)** | [sin fuente verificada] | n/d | Versión adolescente vinculada al NEO | No se ubicó publicación primaria con ese nombre exacto en bases peer-reviewed durante la consolidación; ver Sección 14 (gaps) |
| **PAR Spanish NU** | PAR (2024). NEO PI-3 Spanish (Normative Update) | n/d | Adaptación PAR para hispanohablantes en EE.UU. | Disponible solo digital vía PARiConnect |
| **Perú (NEO-PI-R)** | Cassaretto, M. (1999, 2009). PUCP, tesis | n/d | Adaptación académica, no comercial | Uso restringido a investigación universitaria |
| **Perú (NEO-FFI)** | Martínez-Uribe y Cassaretto (2011). *Revista Mexicana de Psicología*, 28(1), 63-74 | universitarios | Validación NEO-FFI español | Propiedades aceptables en universitarios peruanos |
| **Brasil-Portugal** | Flores-Mendoza et al.; Costa-Toledo-Bolívar (vía Vetor Editora y publicaciones afines) | n/d | Versión portuguesa adultos | Adaptación Brasil con baremos locales (referencia general; cita primaria del proyecto Costa-Toledo-Bolívar [sin fuente verificada] como artículo único peer-reviewed) |
| **Colombia (NEO-PI-R, aplicaciones)** | Contreras-Torres, Espinosa-Méndez y Esguerra-Pérez (2009); Zambrano-Hernández (2011, SciELO Colombia) | n/d | Aplicación de adaptación TEA española | Uso académico; sin re-estandarización colombiana |
| **Colombia (NEO-FFI adultos mayores)** | Acosta-Prado et al. (2022). *Psicología desde el Caribe*. http://www.scielo.org.co/scielo.php?script=sci_arttext&pid=S2011-30802022000200135 | 617 | CFA en adultos mayores bogotanos | Ajuste insuficiente CFA bi-factorial; ítems eliminados; Apertura/Amabilidad débiles |
| **Grecia** | Fountoulakis et al. (2014). *Annals of General Psychiatry*, 13, 36. DOI: 10.1186/s12991-014-0036-9 | 734 | Validación NEO-PI-3 griego | α facetas heterogéneos (.42 Impulsividad - .73 Estética); confirma equivalencia parcial |
| **Mundial (50 culturas)** | McCrae y Terracciano (2005). DOI: 10.1037/0022-3514.88.3.547 | n/d | Estudio cross-cultural NIH | Estructura cinco factores universal en self e informant |

### 4.2 La adaptación española de Cordero y la sucesora de Arribas (TEA Ediciones)

**Hecho:** La adaptación clásica del NEO-PI-R por Cordero, Pamos, Seisdedos y Avia (1999/2008) bajo TEA Ediciones es la **versión comercial española de referencia** para LATAM hasta la entrada del NEO-PI-3 adaptado por David Arribas (Hogrefe TEA, 2024). Esta nueva versión incorpora baremos estratificados: población general adulta, preadolescentes/adolescentes (desde 12 años) y procesos de selección de personal (incluyendo fuerzas y cuerpos de seguridad del estado). El proceso de adaptación incluyó back-translation, análisis de legibilidad y un "estudio de expertos" para contextualización sociolingüística a Latinoamérica, aunque sin re-estandarización formal por país.

### 4.3 Validación brasileña y portuguesa (Costa-Toledo-Bolívar)

**Inferencia:** la línea de adaptación NEO-PI-R portuguesa-brasileña asociada a Flores-Mendoza, Vetor Editora y desarrollos lusófonos posteriores cubre Brasil y Portugal con baremos diferenciados. La cita específica "Costa Toledo-Bolívar" referida al proyecto Brasil-Portugal no se pudo localizar verbatim en bases peer-reviewed indexadas (Web of Science, Scopus, SciELO) durante la consolidación. **[sin fuente verificada]** Marcado como gap en Sección 14.

### 4.4 Versión adolescente PSN (Personality Self-Notion)

**Inferencia:** la línea de validación PSN como versión adolescente del NEO-PI-3 no se localizó como referencia primaria peer-reviewed durante la consolidación. La adaptación adolescente española oficial es **JS NEO (Ortet et al., 2012)**, que sí está publicada en *Assessment*. **[sin fuente verificada]** sobre PSN como denominación específica; ver Sección 14.

### 4.5 Distribución LATAM y eje Manual Moderno

**Hecho:** El 2 de abril de 2025 el Hogrefe Publishing Group adquirió **Editorial Manual Moderno** (México) y Vesalius, incluyendo la subsidiaria colombiana de 15 empleados (comunicado oficial Hogrefe Publishing Group, 02.04.2025; Publishing Perspectives). Esto consolida a **Manual Moderno como brazo LATAM de facto** para productos NEO en español. Hogrefe TEA Ediciones (Madrid) sigue siendo el publisher principal para la versión española europea.

---

## SECCIÓN 5 — ADAPTACIÓN AL ESPAÑOL DE COLOMBIA (ANÁLISIS ESPECÍFICO)

### 5.1 Estado del arte

**Hecho:** No existe una adaptación normativa colombiana específica del NEO-PI-3 publicada con baremos locales al 10 de mayo de 2026, según búsquedas en SciELO Colombia, Redalyc, *Acta Colombiana de Psicología*, *Psicología desde el Caribe* y *Universitas Psychologica*. Los estudios colombianos disponibles aplican la **versión española TEA del NEO-PI-R** (no PI-3): Contreras-Torres, Espinosa-Méndez y Esguerra-Pérez (2009) y la revisión sistemática 2000-2010 de Zambrano-Hernández (2011, SciELO Colombia).

### 5.2 Evidencia local específica

**Hecho:** El único estudio peer-reviewed colombiano con CFA sobre familia NEO localizado es la validación del **NEO-FFI en 617 adultos mayores bogotanos** (Acosta-Prado et al., 2022, *Psicología desde el Caribe*). Resultados:

- CFA de primer orden y bi-factorial **no alcanzan ajuste adecuado**.
- Neuroticismo (α ≈ .76) y Extraversión (α ≈ .73) muestran robustez aceptable.
- Apertura y Amabilidad: cargas factoriales débiles y consistencia interna deprimida.
- Requiere eliminación de ítems (p. ej., ítem 6 N, ítem 42 E) para estabilizar el modelo.

**Inferencia:** la versión española del NEO-FFI no se traslada limpiamente al español colombiano, particularmente en los dominios Apertura y Amabilidad, que son culturalmente sensibles. La extrapolación a NEO-PI-3 sin re-estandarización local probablemente reproduce los mismos problemas amplificados por la mayor longitud del instrumento.

### 5.3 Vía de adquisición legal en Colombia

**Hecho:** Tres vías existen post-abril 2025:

1. **Manual Moderno Colombia** (Bogotá), tras la adquisición Hogrefe.
2. **Hogrefe TEA Ediciones (Madrid)** importando versión española europea.
3. **PAR Inc. directamente** vía PARiConnect en versión PAR Spanish NU.

**Opinión profesional:** ninguna de las tres vías ofrece baremos colombianos peer-reviewed. La interpretación de T-scores con baremos españoles o EE.UU. en muestras colombianas tiene validez ecológica limitada, especialmente en los dominios O y A. Para autoconocimiento freemium, esta limitación es decisiva: agrega costo sin garantía interpretativa local.

### 5.4 Recomendación operativa

**Opinión profesional:** Ante la ausencia de normas colombianas y la disponibilidad de IPIP-NEO-120/300 (dominio público) que permite calibración interna con la muestra de DescubreMe en Colombia, **no hay justificación práctica para asumir el costo de licencia del NEO-PI-3**. La estrategia recomendada es calibrar IPIP-NEO-120 con la base de usuarios colombianos de DescubreMe (N > 500) y construir baremos locales propios.

---

## SECCIÓN 6 — LICENCIA Y PERMISOS (CRÍTICO)

### 6.1 Titularidad y régimen de copyright

**Hecho — texto literal PAR Inc.:**
> "Tests, test protocols, test items, normative data, score reports, and other related materials are copyrighted and may not be reproduced in whole or in part without written permission from PAR."

**Hecho:** © Psychological Assessment Resources, Inc. (PAR), Lutz, FL — fechas 1985, 1988, 1992, 1994, 2000, 2010, 2024. Autores intelectuales: Robert R. McCrae, Paul T. Costa Jr. y Thomas A. Martin (NEO-PI-3, 2005).

**Hecho — SIGMA Assessment Systems:** *"this product is not available for licensing"* (sigmatesting.com, mayo 2026).

### 6.2 Respuesta explícita a las 9 preguntas obligatorias

| # | Pregunta | Respuesta NEO-PI-3 / NEO-FFI-3 |
|---|---|---|
| 1 | Tipo de licencia | Copyright comercial PAR Inc. con **qualified-user restriction**. PAR clasifica el NEO-PI-3 NU en **Qualification Level S** (master's en psicología o equivalente). Hogrefe UK exige TUOP-Personality (Test User Occupational: Personality) con verificación de credenciales en checkout. No es Creative Commons, no es dominio público, no admite uso libre |
| 2 | ¿Permite uso comercial? | **Sí, dentro del marco de "uso profesional autorizado"** (clínico, counseling, RR.HH., investigación), siempre vía las plataformas oficiales del publisher (PARiConnect, HTS). **No permite redistribución ni incorporación libre en producto digital de terceros sin licencia enterprise negociada caso a caso** |
| 3 | ¿Permite adaptación y traducción? | No sin acuerdo escrito. PAR exige permiso vía custsup@parinc.com / Licensing Team para cualquier traducción no autorizada, modificación de ítems o uso parcial |
| 4 | ¿Permite digitalización (web app)? | **Solo a través de PARiConnect (PAR) o HTS (Hogrefe Test System)**. No hay API REST pública. Para DescubreMe esto implica: imposible self-host en Next.js + Supabase + Vercel; única integración técnica viable sería iframe/redirect a la plataforma del publisher (rompe UX) |
| 5 | ¿Permite almacenar respuestas individuales? | Sí dentro de la plataforma del publisher; almacenamiento externo requiere acuerdo de licencia enterprise específico. Sujeto en Colombia a Ley 1581 de 2012 (protección de datos personales) y eventualmente a tratamiento de dato sensible si se interpretan facetas N3 Depresión, N4 Ansiedad social, N6 Vulnerabilidad |
| 6 | Atribución requerida | Sí, citar McCrae, Costa y Martin (2005) y manual unificado McCrae y Costa (2010). Si se usa adaptación española, citar Cordero et al. (2008) o Arribas (2024) según versión. PAR exige también atribución comercial en reportes |
| 7 | Costo estimado uso comercial LATAM | **Verificado** (mayo 2026): SIGMA USD 38/admin (Business Report) o USD 37/admin (Counseling Report); Hogrefe TEA Ediciones ≈ €8.11 aplicación + €12.84 informe = ~**USD 22.50 por administración con informe** en español; Hogrefe UK £39-48 (×100 self-admin) hasta £108 (full-managed); PAR per-use estimado **USD 6-10/admin** (NEO-PI-3:4FV histórico, mínimo 5 usos/orden) — confirmar con PAR Customer Support |
| 8 | Email/institución de contacto | **PAR:** custsup@parinc.com — +1.800.331.8378 (EE.UU.) — Licensing Team (parinc.com/about/connect-with-us/licensing-team). **Hogrefe TEA Ediciones (Madrid):** madrid@hogrefe-tea.com — +34 912 705 060. **Hogrefe UK:** customersupport@hogrefe.co.uk. **Manual Moderno Colombia:** vía manualmoderno.com (distribuidor LATAM Hogrefe desde 2 abril 2025). **SIGMA Assessment Systems (Canadá):** sigmatesting.com |
| 9 | Nivel de riesgo legal sin permiso | **ALTO.** Usar ítems literales sin licencia = infracción de copyright federal (DMCA en EE.UU., Convenio de Berna vigente en Colombia); paráfrasis cercanas pueden activar trabajo derivado (riesgo MEDIO-ALTO); distribuir reportes interpretativos sin licencia del scoring algorítmico (riesgo ALTO) |

### 6.3 Costos detallados verificados (mayo 2026)

**PAR (USD, EE.UU.) — Kits iniciales (incluyen lote inicial + manual):**

| Producto | Precio USD |
|---|---|
| NEO-PI-3 (NU) Digital Admin Kit con Score Reports | 637 |
| NEO-PI-3 (NU) Digital Admin Kit con Interpretive Reports | 860 |
| NEO-PI-3 (NU) Print Admin Kit con Score Reports | 473 |
| NEO-PI-3 (NU) Print Admin Kit con Interpretive Reports | 697 |
| NEO-FFI-3 (NU) Digital con Score Reports | 483 |
| NEO-FFI-3 (NU) Digital con Interpretive Reports | 710 |
| Per-uso (i-Admin + Score Report) estimado | 6-10/uso (mínimo 5 usos/orden) |

**SIGMA Assessment Systems (USD, online, sigmatesting.com mayo 2026):**

| Producto | Precio USD/admin |
|---|---|
| NEO-PI-3 con Basic Business Report | 38 |
| NEO-PI-3 con Basic Counseling Report | 37 |

**Hogrefe UK (GBP, exc. VAT):**

| Producto | Precio |
|---|---|
| Complete Kit papel-lápiz (manual + materiales) | £305 (~USD 385) |
| Online HTS Technical & Personal Insight Report self-admin (1 uso) | £68 → £48 (×100, -30 %) |
| Online HTS Technical Report self-admin (1 uso) | £53 → £39 (×100) |
| Hogrefe Administration Service (full-managed) | £108 + £40 admin fee + VAT |
| Manual UK / Technical Manual | £61 / £99 |

**Hogrefe TEA Ediciones (Madrid, EUR, IVA aparte):**

| Producto | Precio EUR |
|---|---|
| Aplicación y corrección online (1 uso, requiere manual previo) | €8.11 (ISBN 9789203159814) |
| Informe (1 uso, no incluye aplicación ni corrección) | €12.84 (ISBN 9789203159807) |
| **Costo total por administración con informe** | **≈ €20.95 ≈ USD 22.50** |
| Professional Manual (estimado, página JS no renderiza precios) | €200-400 |

### 6.4 Costo anual estimado LATAM por volumen freemium

**Hecho/Inferencia — cotización contra escenarios DescubreMe 10.000-50.000 admin/año:**

| Volumen anual de admins | NEO-PI-3 vía PAR (estimado USD 6-10/uso) | NEO-PI-3 vía Hogrefe TEA (USD ~22.50/admin con informe) | SIGMA (USD ~38/admin) |
|---|---|---|---|
| 500 admins | USD 5.000-7.500 | USD 11.250 | USD 19.000 |
| 2.000 admins | USD 14.000-20.000 | USD 45.000 | USD 76.000 |
| **10.000 admins** | **USD 60.000-100.000** (negociable) | **USD 225.000** | **USD 380.000** |
| **50.000 admins** | **USD 250.000+** (acuerdo enterprise) | **USD 1.125.000** | **USD 1.900.000** |

**Inferencia — análisis vs revenue freemium DescubreMe:**

- Tier Paid DescubreMe pricing actual: USD 19.99 por usuario.
- Escenario optimista: 10.000 conversiones paid/año = USD 199.900 ingreso bruto.
- NEO-PI-3 a USD 6/admin (estimado PAR óptimo): **USD 60.000** → consume **30 % del revenue** solo en licencia.
- NEO-PI-3 a USD 22.50/admin (TEA con informe): **USD 225.000** → **consume 113 % del revenue**, margen negativo.
- NEO-PI-3 a USD 38/admin (SIGMA retail): **USD 380.000** → **consume 190 % del revenue**, inviabilidad absoluta.

**Conclusión cuantitativa:** Aún en el escenario más favorable de tarifa PAR negociada óptima (USD 6/admin), el NEO-PI-3 es **estructuralmente incompatible** con un modelo freemium B2C de USD 19.99. La integración solo sería viable con pricing premium > USD 200/usuario (B2B clínico/HR), fuera del scope de DescubreMe.

### 6.5 Riesgo legal específico

| Escenario | Nivel de riesgo |
|---|---|
| Usar NEO-PI-3 con ítems literales sin licencia | **ALTO** — exposición a demanda por copyright federal (DMCA, Convenio de Berna vigente en Colombia/LATAM) |
| Usar versión adaptada propia "inspirada en NEO" sin licencia | **MEDIO-ALTO** — paráfrasis cercanas pueden activar acción legal por trabajo derivado |
| Distribuir reportes interpretativos sin licencia | **ALTO** — los algoritmos de scoring y reportes interpretativos PAR también están protegidos |
| Usar IPIP-NEO-120 como sustituto open | **BAJO** — IPIP es dominio público (Goldberg, 1999; ipip.ori.org) y replica el constructo sin infringir |
| Usar BFI-2-S con permiso Soto/John | **BAJO** — uso comercial requiere autorización explícita de Soto y John, sin costo monetario reportado para casos educativos |

### 6.6 Plan B obligatorio

**Opinión profesional:** Dado que la hipótesis del proyecto se confirma (licencia PAR Inc. inviable para freemium LATAM), el Plan B **ya está activado** en el roadmap DescubreMe:

1. **BFI-2-S** (Soto y John, 2017) como instrumento M1 en Free + Paid v1.5 (Q1 2027).
2. **IPIP-NEO-120** (Johnson, 2014) como upgrade opcional Track A Paid para usuarios que quieren 30 facetas reales sin costo de licencia.
3. **NEO-PI-3** permanece como referencia teórica de validación cruzada en documentación interna; nunca se integra al stack implementable.

---

## SECCIÓN 7 — SCORING Y REGLAS DE PUNTUACIÓN

### 7.1 Procedimiento de puntuación NEO-PI-3

**Hecho:**

1. Para cada ítem inverso, recodificar 0 ↔ 4, 1 ↔ 3, 2 = 2 (valor recodificado = 4 − valor original).
2. Para cada **faceta**, sumar los 8 ítems (rango 0-32).
3. Para cada **dominio**, sumar las 6 facetas que lo componen (rango 0-192).
4. **Factor scores:** combinación ponderada de los 30 puntajes de faceta usando la matriz de pesos Tabla 4 del NEO Inventories Manual (PAR). Esta matriz está protegida por copyright y **no se reproduce aquí**.
5. Conversión a **T-scores** (M = 50, SD = 10) usando baremos por edad/sexo/cultura.

### 7.2 Bandas interpretativas (NEO Inventories Manual)

| T-score | Interpretación |
|---|---|
| < 35 | Muy bajo |
| 35-44 | Bajo |
| 45-55 | Promedio |
| 56-64 | Alto |
| > 65 | Muy alto |

### 7.3 Normas y baremos

**Hecho:** La NU 2024 ofrece normas combinadas y diferenciadas por género en muestra censal EE.UU. 2020. La adaptación TEA española ofrece baremos para:

1. Población general adulta española.
2. Adolescentes/preadolescentes (12-20 años).
3. Selección de personal (general y fuerzas/cuerpos de seguridad).

**No existen baremos colombianos oficiales** para NEO-PI-3 ni NEO-FFI-3. Cualquier uso en Colombia implicaría usar baremos españoles o EE.UU. con limitación de validez ecológica documentada (Acosta-Prado et al., 2022).

### 7.4 Validez del protocolo

**Hecho:** Reglas oficiales PAR:

1. Invalidar protocolo con > 40 ítems en blanco.
2. Invalidar series patológicamente largas de respuestas idénticas (todos "Strongly Agree" o "Strongly Disagree").
3. Aplicar escalas SKK (PPM y NPM) en NU 2024 para detectar simulación.

---

## SECCIÓN 8 — IMPLEMENTACIÓN DIGITAL

### 8.1 Arquitectura propietaria de los publishers

**Hecho:** PAR exige administración exclusivamente vía **PARiConnect** (plataforma SaaS propietaria). Hogrefe expone **HTS (Hogrefe Test System)**, también plataforma cerrada con login propio. **Ningún publisher expone API REST pública** para integración con apps de terceros.

### 8.2 Implicaciones para DescubreMe

**Inferencia:** Para el stack Next.js + Supabase + Vercel de DescubreMe:

- **No es posible self-host del cuestionario sin violar copyright.**
- **Integración técnicamente posible solo vía:**
  1. **Redirect/iframe externo a PARiConnect o HTS:** rompe UX del freemium, expone marca PAR/Hogrefe al usuario final, no permite reporte unificado con otros instrumentos del stack (BFI-2, PVQ-RR, O*NET).
  2. **Negociación de licencia enterprise con derechos de digitalización white-label:** estimado 6-18 meses de proceso legal + entrada USD 20.000-100.000 en honorarios + costo per-use ongoing.

**Opinión profesional:** la inviabilidad técnica de digitalizar NEO-PI-3 en el stack DescubreMe **es por sí sola** razón suficiente para descartarlo del MVP y de v1.5. Cualquier alternativa requeriría rediseñar arquitectónicamente el flujo del producto.

### 8.3 UX y compliance (referencial, no aplicable a NEO-PI-3 en DescubreMe)

- Tiempo de administración NEO-PI-3 (30-45 min) es prohibitivo en mobile-first B2C; tasa de abandono esperada > 50 % (vs. 5-15 % para BFI-2-S).
- Ítems N3 Depresión, N4 Ansiedad social, N6 Vulnerabilidad son potencialmente sensibles bajo Ley 1581/2012 (Colombia).
- PARiConnect maneja almacenamiento de respuestas; transferir respuestas individuales fuera de la plataforma requiere acuerdo de licencia específico.

---

## SECCIÓN 9 — MAPEO AL STACK DESCUBREME (POST v2.0)

### 9.1 Stack actual de DescubreMe

- BFI-2-S (M1, reemplaza Mini-IPIP en v1.5)
- IPIP-NEO-120 (upgrade Track A Paid opcional)
- O*NET IP SF (RIASEC)
- PVQ-RR (valores)
- Core Strengths 18 (IPIP-VIA-R)
- Ryff PWB corta (bienestar eudaimónico)
- FSS-9 (flow)
- Módulo propio Karasek 14 (B2B-A)

### 9.2 Tabla comparativa amplia

| Dimensión | NEO-PI-3 | NEO-FFI-3 | BFI-2 | BFI-2-S | IPIP-NEO-120 | IPIP-NEO-300 | HEXACO-PI-R | Mini-IPIP |
|---|---|---|---|---|---|---|---|---|
| Autores | McCrae, Costa, Martin (2005) | McCrae y Costa (2010) | Soto y John (2017) | Soto y John (2017) | Johnson (2014) | Goldberg (1999) | Lee y Ashton (2018) | Donnellan et al. (2006) |
| Ítems | 240 | 60 | 60 | 30 | 120 | 300 | 100/200 | 20 |
| Dominios | 5 (Big Five) | 5 | 5 | 5 | 5 | 5 | 6 (incl. H-H) | 5 |
| Facetas | 30 (6/dom) | 0 | 15 (3/dom) | 15 (limitada) | 30 (4 ítems c/u) | 30 (10 ítems c/u) | 24/25 | 0 |
| Tiempo | 30-45 min | 10-15 min | 5-10 min | 3-5 min | 10-15 min | 25-30 min | 10-25 min | 2-3 min |
| Edad mínima | 12 | 12 | 12 | 12 | 18 (recom.) | 18 | 16 | 18 |
| α dominios | .87-.94 | .72-.87 | .83-.91 | .73-.83 | .85-.89 | .89-.95 | .84-.92 | ≥ .60 |
| α facetas | .54-.84 | n/a | .65-.85 (M .76) | .50-.70 (M .60) | .70-.80 | .80-.85 | .76-.91 | n/a |
| Balance directo/inverso | NO | NO | SÍ (30/30) | SÍ (15/15) | parcial | parcial | parcial | NO |
| Control aquiescencia | Bajo (SKK 2024) | Bajo | Excelente | Excelente | Limitado | Limitado | Limitado | Limitado |
| Validez clínica | Alta (uso DSM) | Alta | Media | Baja | Media | Alta | Media | Baja |
| Licencia | Comercial PAR | Comercial PAR | Free non-commercial (Soto-John) | Free non-commercial | Dominio público | Dominio público | Free para investigación | Dominio público |
| Costo USD/admin | 6-38 | 5-15 | 0 | 0 | 0 | 0 | 0 | 0 |
| Self-host posible | NO | NO | SÍ | SÍ | SÍ | SÍ | SÍ | SÍ |
| Adaptación ES Colombia | parcial (TEA España) | parcial (TEA España) | Sí (BFI-2 Spanish Gallardo-Pujol 2022) | Sí | Sí (open) | Sí (open) | Sí (open) | Sí (open) |
| Apto B2C freemium | **NO** | **NO** | **SÍ** | **SÍ** | **SÍ** | SÍ (largo) | SÍ | SÍ |
| Apto Big Five facetado | SÍ (30) | NO | SÍ (15) | limitado | SÍ (30) | SÍ (30) | SÍ (24, +H) | NO |

### 9.3 NEO-PI-3 vs BFI-2-S (instrumento M1 v1.5)

| Criterio | NEO-PI-3 | BFI-2-S |
|---|---|---|
| Ítems | 240 | 30 |
| Tiempo usuario | ~40 min | 3-5 min |
| Facetas | 30 | 15 (limitada) |
| Costo | USD 6-38/admin | USD 0 |
| Tasa abandono esperada B2C | 40-60 % | 5-15 % |
| Control aquiescencia | Bajo | Excelente |
| Licencia comercial | Restrictiva PAR | Permiso Soto/John (sin costo monetario reportado) |
| Self-host | NO | SÍ |

**Veredicto:** **BFI-2-S domina aplastantemente** para DescubreMe M1.

### 9.4 NEO-PI-3 vs IPIP-NEO-120 (alternativa Track A Paid)

**Hecho:** IPIP-NEO-120 (Johnson, 2014, https://doi.org/10.1016/j.jrp.2014.05.003) replica las 30 facetas del NEO-PI-R con:

- α dominios .85-.89 (N = 619.150, ipip.ori.org/30FacetNEO-PI-RItems.htm).
- Convergencia r = .66 sin corregir / .91 corregido por atenuación a nivel de faceta.
- Convergencia r = .85-.90 (mediana .87) a nivel de dominio (Maples et al., 2014, *Psychological Assessment*).
- Dominio público, sin licencia requerida.
- Self-host completo en Supabase, sin redirect externo.

**Inferencia:** para DescubreMe, **IPIP-NEO-120 ofrece ~85-90 % del valor del NEO-PI-3 al 0 % del costo y 100 % libre para self-host**. Es el sustituto open obvio. La única ventaja diferencial del NEO-PI-3 sería el prestigio de marca y los reportes interpretativos PAR, ninguno de los cuales aporta varianza única al constructo Big Five.

### 9.5 ¿Es redundante NEO-PI-3 con BFI-2-S y IPIP-NEO-120?

**Inferencia:** Funcionalmente **sí** dentro del scope DescubreMe (autoconocimiento no clínico):

- A nivel de dominio: BFI-2-S e IPIP-NEO-120 capturan la varianza Big Five con α comparable o superior.
- A nivel de faceta: IPIP-NEO-120 replica las 30 facetas del NEO-PI-R con convergencia r = .85-.90 dominio.
- A nivel de control de aquiescencia: BFI-2-S supera al NEO-PI-3.
- A nivel de validación local Colombia: ninguno tiene baremo oficial colombiano, pero IPIP-NEO-120 permite calibración interna libre.

**Varianza única del NEO-PI-3 dentro del stack DescubreMe:** ninguna que sea decisiva para autoconocimiento freemium. La varianza diferencial (escalas SKK, reportes interpretativos clínicos, Problems in Living Checklist, NEO Style Graph, NEO Job Profiler) corresponde a usos clínicos y de selección que están **fuera del scope explícito** de DescubreMe.

### 9.6 Decisión sobre la inclusión del NEO-PI-3 en algún producto DescubreMe

**Opinión profesional:** **NO entra en MVP1, v1.5 ni v2.0.** Solo se reconsidera una integración futura (> v3.0) si concurren simultáneamente:

1. DescubreMe pivota a tier B2B Premium (psicólogos clínicos, counselors, HR enterprise) con pricing > USD 200/usuario.
2. Existe una versión enterprise white-label digital de Hogrefe o PAR para LATAM con API REST pública.
3. Hay baremos colombianos peer-reviewed publicados.
4. ROI positivo verificable vs. mantener IPIP-NEO-120 calibrado internamente.

---

## SECCIÓN 10 — RED FLAGS ÉTICOS Y SESGOS

### 10.1 Posicionamiento clínico explícito

**Hecho — texto PAR:**
> "NEO-PI-3 Interpretive Report is intended for use in clinical populations only. The hypotheses it offers should be accepted only when they are supported by other corroborating evidence."

**Inferencia:** el Interpretive Report incluye **Problems in Living Checklist** y referencias a personality disorders del DSM. Esto colisiona directamente con la promesa NO clínica de DescubreMe y expone al producto a:

1. **Riesgo posicional:** asociar la marca con uso clínico contradice el messaging "autoconocimiento profundo, no clínico, no selección".
2. **Riesgo regulatorio Colombia:** la **Ley 1090 de 2006** reglamenta el ejercicio profesional psicológico; aplicar instrumentos clasificados como clínicos sin profesional certificado y sin propósito clínico explícito puede constituir ejercicio ilegal de la psicología.
3. **Riesgo iatrogénico:** un usuario lego puede interpretar puntuaciones altas en N3 Depresión o N6 Vulnerabilidad como diagnóstico clínico, generando malestar o auto-etiquetado patologizante.

### 10.2 Sesgo de auto-reporte y deseabilidad social

**Hecho:** El NEO-PI-3 depende del paradigma de autoinforme introspectivo, vulnerable a:

1. **Deseabilidad social (autoengaño positivo):** autopercepción inflada genuina, sin agenda consciente.
2. **Gestión de impresiones:** falsificación intencional para alterar la percepción del evaluador (Paulhus, taxonomía clásica).
3. **Aquiescencia y disconformidad:** respuestas autómatas sin procesamiento lingüístico, especialmente en muestras de baja escolaridad.
4. **Efecto halo** en formas R (observador): contaminación afectiva del evaluador.
5. **Fatiga** en 240 ítems: especialmente disruptiva en mobile-first.

**Mitigaciones NU 2024:** escalas SKK PPM y NPM, conteo de omisiones, detección de patrones invariantes.

### 10.3 Limitaciones cross-culturales en Colombia

**Hecho — Acosta-Prado et al. (2022):** Apertura y Amabilidad son los dominios con mayor déficit de ajuste estructural en muestra colombiana de adultos mayores. **Inferencia:** los constructos están fuertemente matizados por:

- Socialización generacional y dogmatismo religioso tradicional.
- Inestabilidad política y trauma colectivo (desplazamiento, conflicto armado).
- Redes familiares de gran proximidad que modifican la expresión de Amabilidad.
- Presunciones epistemológicas WEIRD (Western, Educated, Industrialized, Rich, Democratic) que no son universales.

### 10.4 Mitigaciones obligatorias si se incluyera (escenario hipotético)

**Opinión profesional:**

1. Reporte solo a nivel de dominio, nunca de facetas individuales clínicas (N3, N4, N6).
2. Excluir el Problems in Living Checklist del flujo de usuario.
3. Disclaimer explícito y persistente: "este instrumento NO es diagnóstico; consulta a un profesional certificado".
4. Profesional psicólogo licenciado en Colombia firmando los reportes.
5. Líneas de ayuda visibles: Línea 106 (Bogotá, apoyo emocional), Línea 123 (emergencia nacional), CARE (318 376 7400, salud mental).
6. Derecho de eliminación accesible en ≤ 2 clics, Ley 1581/2012.

**Inferencia consolidada:** estos costos éticos refuerzan la decisión de **NO incluir** el NEO-PI-3 en el stack implementable. La mitigación adecuada del posicionamiento clínico es estructuralmente incompatible con la promesa freemium de DescubreMe.

---

## SECCIÓN 11 — LIMITACIONES Y CONTEXTO DE USO

1. **Posicionamiento clínico:** el NEO-PI-3 está semánticamente cargado de uso clínico (DSM linkage, Problems in Living Checklist); contradice la promesa NO clínica de DescubreMe.
2. **Costo prohibitivo para B2C freemium:** USD 6-38/admin × 10.000-50.000 admins/año = USD 60.000 a USD 1.900.000 anuales.
3. **Sin API ni capacidad self-host:** incompatible con la arquitectura Next.js + Supabase + Vercel.
4. **Tiempo de administración** (30-45 min) prohibitivo en mobile-first; tasas de abandono esperadas > 50 %.
5. **Adaptación ES Colombia ausente:** sin baremos locales, T-scores con baremos españoles/EE.UU. tienen validez ecológica limitada (especialmente en O y A).
6. **Falta de control de aquiescencia por diseño:** el NEO no balancea ítems directos/inversos por escala como sí lo hace BFI-2.
7. **Qualification Level S:** requiere master's en psicología o equivalente para uso profesional; modelo B2C consumer no califica salvo con psicólogo licenciado firmando reportes.
8. **Vigencia de versión:** cualquier licencia debe ser sobre la NU 2024; versiones anteriores quedan desactualizadas.
9. **Rango etario:** 12-65+; no hay problema de rango para Gen Z/Millennials, pero limita aplicaciones intergeneracionales.

---

## SECCIÓN 12 — RECOMENDACIÓN DE USO EN DESCUBREME

### 12.1 Decisión accionable y CLARA sobre el destino del NEO-PI-3

**Opinión profesional — DECISIÓN:** **EXCLUIR el NEO-PI-3 y el NEO-FFI-3 del stack implementable de DescubreMe en MVP1, v1.5 y v2.0.** Mantener únicamente como **referencia teórica de validación cruzada** en documentación interna del Track A Paid benchmark.

### 12.2 Tabla decisional por stage

| Stage DescubreMe | Decisión NEO-PI-3 | Decisión NEO-FFI-3 | Justificación |
|---|---|---|---|
| MVP1 (actual) | **NO INCLUIR** | **NO INCLUIR** | Costo licencia + no self-host + posicionamiento clínico incompatible |
| v1.5 (M1 BFI-2-S, Q1 2027) | **NO INCLUIR** | **NO INCLUIR** | BFI-2-S domina psicometricamente y en licencia |
| v2.0 / v3.0 futuro | **CONDICIONAL** (solo si pivot B2B clínico/enterprise con licencia PAR/Hogrefe negociada y pricing > USD 200/usuario) | **NO INCLUIR** (BFI-2 domina siempre) | Triggers en Sección 12.4 |
| Track A Paid benchmark teórico | **MANTENER COMO REFERENCIA** en documentación interna | n/a | Calibración cruzada IPIP-NEO-120 contra benchmark NEO |

### 12.3 Stack recomendado para Big Five en DescubreMe

- **Free + Paid v1.5 (default):** BFI-2-S 30 ítems (free non-commercial, 15 facetas con caveat n grande, control de aquiescencia 15/15) — primary.
- **Paid v1.5 (premium opcional):** IPIP-NEO-120 como upgrade a 30 facetas reales (dominio público, sin licencia, 100 % self-host en Supabase).
- **Benchmark teórico:** mencionar NEO-PI-3 en documentación interna del equipo psicométrico como gold-standard académico, pero **no incorporar al producto**.

### 12.4 Trigger thresholds que reabren la decisión NEO-PI-3

**Opinión profesional:** reabrir solo si concurren al menos tres de los siguientes:

1. DescubreMe alcanza > 50.000 usuarios paid/año Y pivota a tier B2B clínico/HR (> USD 200/usuario).
2. Manual Moderno Colombia publica acuerdo de digitalización white-label para apps de bienestar consumer.
3. PAR o Hogrefe publican API REST pública con licencia enterprise LATAM disponible.
4. Aparece adaptación normativa colombiana revisada por pares del NEO-PI-3 con baremos para Gen Z/Millennial.
5. Estudio publicado demuestra varianza única del NEO-PI-3 sobre IPIP-NEO-120 calibrado internamente.

**Si nada de lo anterior ocurre:** NEO-PI-3 permanece descartado permanentemente del producto; queda solo como referencia académica.

### 12.5 Reversibilidad

**Opinión profesional:** la decisión de **excluir** el NEO-PI-3 es totalmente reversible. Re-incluirlo en el futuro requeriría:

- Negociación con PAR Licensing Team o Manual Moderno (6-18 meses).
- Implementación de iframe/redirect a PARiConnect o HTS (4-8 semanas de desarrollo).
- Validación legal del flujo bajo Ley 1090 de 2006 y Ley 1581 de 2012.

Por contraste, **incluir** ahora y luego excluir tendría costo hundido alto (licencias pagadas + integración + comunicación al usuario).

---

## SECCIÓN 13 — PSEUDOCÓDIGO CONCEPTUAL DE SCORING

```
NOTA: NO contiene ítems literales; solo lógica de scoring conceptual.
Su uso en producto requiere licencia PAR. Los mapas de ítems están
declarados como referencias al manual oficial NEO Inventories (PAR, 2010, 2024).

ENTRADA:
  respuestas[1..240]  // NEO-PI-3, valores Likert 0..4
  o respuestas[1..60] // NEO-FFI-3, valores Likert 0..4

PASO 1 — Validación del protocolo (reglas PAR):
  if (omisiones > 40) return invalid("> 40 ítems en blanco")
  if (respuestas_idénticas_consecutivas >= umbral) return invalid("patrón único")
  // En NU 2024: aplicar escalas SKK PPM y NPM (no reproducidas)

PASO 2 — Recodificación de ítems inversos:
  para cada item_R en lista_inversos (protegida por copyright):
    respuestas[item_R] = 4 - respuestas[item_R]

PASO 3 — Cómputo de facetas (NEO-PI-3, 30 facetas):
  para cada faceta f:
    items_f = lista de 8 ítems pertenecientes a f (manual PAR)
    faceta_raw[f] = suma(respuestas[items_f])  // rango 0..32

PASO 4 — Cómputo de dominios (NEO-PI-3, 5 dominios):
  para cada dominio d:
    facetas_d = las 6 facetas anidadas en d
    dominio_raw[d] = suma(faceta_raw[facetas_d])  // rango 0..192

PASO 4-FFI3 — Cómputo dominios NEO-FFI-3:
  para cada dominio d:
    items_d = 12 ítems del dominio (manual PAR)
    dominio_raw[d] = suma(respuestas[items_d])  // rango 0..48

PASO 5 — Factor scores (NEO-PI-3, combinación ponderada):
  factor_score[d] = suma sobre 30 facetas (faceta_raw[f] * peso_d_f)
  // peso_d_f = matriz Tabla 4 NEO Inventories Manual, copyright PAR

PASO 6 — Conversión a T-scores:
  T[d] = 50 + 10 * (raw[d] - M_baremo[d]) / SD_baremo[d]
  // baremos por edad/sexo/cultura; NU 2024 = censal EE.UU.

PASO 7 — Banda interpretativa:
  if T < 35:        banda = "muy bajo"
  if 35 <= T < 45:  banda = "bajo"
  if 45 <= T <= 55: banda = "promedio"
  if 55 < T <= 65:  banda = "alto"
  if T > 65:        banda = "muy alto"

PASO 8 — Output:
  metadatos: version_instrumento (NU 2024), version_traduccion,
             timestamp, tiempo_total, plataforma (PARiConnect / HTS)
  raw: facetas[30], dominios[5], factores[5]
  T: dominios[5]
  bandas: dominios[5]
  validez: SKK_PPM, SKK_NPM, omisiones, patrón
  NOTA: en NEO-PI-3 el reporte interpretativo requiere intérprete certificado nivel S
```

---

## SECCIÓN 14 — GAPS DE INVESTIGACIÓN Y PREGUNTAS ABIERTAS

1. **Costo real LATAM actualizado vía PAR:** PAR no expone precios per-use públicamente para NEO-PI-3 full; las cifras USD 6-10/admin son inferencias basadas en pricing comparable (NEO-PI-3:4FV). **Acción:** llamar a custsup@parinc.com con volumen estimado 10.000-50.000 admin/año para cotización oficial. También cotizar Manual Moderno Colombia (post-abril 2025) para versión española LATAM.
2. **Adaptación normativa colombiana ausente:** no existe NEO-PI-3 con baremos colombianos peer-reviewed. **Acción:** buscar tesis no indexadas en Universidad de los Andes, Universidad del Valle, Universidad del Norte, Universidad Javeriana; monitorear *Acta Colombiana de Psicología*, *Universitas Psychologica* y *Psicología desde el Caribe*.
3. **PSN adolescente como denominación específica:** no se localizó cita primaria peer-reviewed; la adaptación adolescente oficial es JS NEO de Ortet et al. (2012). **[sin fuente verificada]** sobre PSN como instrumento separado.
4. **Adaptación Costa-Toledo-Bolívar (Brasil-Portugal):** la línea exacta de autores y la cita primaria peer-reviewed no se confirmó verbatim en bases indexadas durante la consolidación. **[sin fuente verificada]** sobre la denominación específica; la línea brasileña documentada es Flores-Mendoza et al. vía Vetor Editora.
5. **Acuerdo Hogrefe TEA / Manual Moderno post-2 abril 2025:** la integración corporativa cambia el panorama de licenciamiento LATAM. **Acción:** monitorear comunicados de Manual Moderno sobre nuevos productos NEO disponibles en Colombia y eventuales acuerdos white-label.
6. **API oficial Hogrefe / PAR:** ninguno publica API REST. **Acción:** consultar partner programs si existe path a integración white-label en producto digital de terceros.
7. **Costo del Professional Manual TEA:** no expuesto en hogrefe-tea.com (página JS-renderizada); estimado €200-400. **Acción:** confirmación telefónica con TEA Madrid antes de cualquier contratación.
8. **Convergencia IPIP-NEO-120 vs NEO-PI-3 NU 2024:** las cifras r = .85-.90 a nivel dominio provienen de Maples et al. (2014) comparando con NEO-PI-R; no existe estudio publicado que compare directamente IPIP-NEO-120 con NEO-PI-3 NU 2024.
9. **Validación cross-cultural de la NU 2024:** las escalas SKK (PPM, NPM) son nuevas en la NU 2024; no se localizó validación en muestras hispanohablantes ni colombianas.

---

## SECCIÓN 15 — REFERENCIAS (APA 7)

### 15.1 Fuentes primarias NEO-PI-3 / NEO-FFI-3

- Costa, P. T., Jr., & McCrae, R. R. (1992). *Revised NEO Personality Inventory (NEO-PI-R) and NEO Five-Factor Inventory (NEO-FFI) professional manual*. Psychological Assessment Resources.
- McCrae, R. R., Costa, P. T., Jr., & Martin, T. A. (2005). The NEO-PI-3: A more readable revised NEO Personality Inventory. *Journal of Personality Assessment, 84*(3), 261-270. https://doi.org/10.1207/s15327752jpa8403_05
- McCrae, R. R., Martin, T. A., & Costa, P. T., Jr. (2005). Age trends and age norms for the NEO Personality Inventory-3 in adolescents and adults. *Assessment, 12*(4), 363-373. https://doi.org/10.1177/1073191105279724
- McCrae, R. R., & Costa, P. T., Jr. (2007). Brief versions of the NEO-PI-3. *Journal of Individual Differences, 28*(3), 116-128. https://doi.org/10.1027/1614-0001.28.3.116
- McCrae, R. R., & Costa, P. T., Jr. (2010). *NEO Inventories: Professional manual for the NEO Personality Inventory-3 (NEO-PI-3), NEO Five-Factor Inventory-3 (NEO-FFI-3), and NEO Personality Inventory-Revised (NEO-PI-R)*. Psychological Assessment Resources. ISBN 978-0-911907-65-5 (sin DOI asignado por el editor).

### 15.2 Validaciones psicométricas y cross-cultural

- Fountoulakis, K. N., Siamouli, M., Magiria, M., Pantoula, E., Moutou, K., Kemeridou, M., Mavridou, E., Panagiotidis, P., Kantartzis, S., Tsolaki, M., & McCrae, R. R. (2014). Standardization of the NEO-PI-3 in the Greek general population. *Annals of General Psychiatry, 13*, Article 36. https://doi.org/10.1186/s12991-014-0036-9
- Maples, J. L., Guan, L., Carter, N. T., & Miller, J. D. (2014). A test of the International Personality Item Pool representation of the Revised NEO Personality Inventory and development of a 120-item IPIP-based measure of the Five Factor Model. *Psychological Assessment, 26*(4), 1070-1084. https://doi.org/10.1037/pas0000004
- McCrae, R. R., & Terracciano, A. (2005). Universal features of personality traits from the observer's perspective: Data from 50 cultures. *Journal of Personality and Social Psychology, 88*(3), 547-561. https://doi.org/10.1037/0022-3514.88.3.547
- McCrae, R. R., & Allik, J. (Eds.). (2002). *The Five-Factor Model of personality across cultures*. Kluwer Academic. https://doi.org/10.1007/978-1-4615-0763-5
- McCrae, R. R., & Costa, P. T., Jr. (2008). The Five-Factor Theory of personality. In O. P. John, R. W. Robins, & L. A. Pervin (Eds.), *Handbook of personality: Theory and research* (3rd ed., pp. 159-181). Guilford Press.

### 15.3 Adaptaciones español (España, Perú, Colombia, Brasil, JS NEO)

- Aluja, A., García, Ó., Rossier, J., & García, L. F. (2005). Comparison of the NEO-FFI, the NEO-FFI-R and an alternative short version of the NEO-PI-R (NEO-60) in Swiss and Spanish samples. *Personality and Individual Differences, 38*(3), 591-604. https://doi.org/10.1016/j.paid.2004.05.014
- Costa, P. T., Jr., McCrae, R. R., Avia, M. D., Pamos, A., Seisdedos, N., Cordero, A., & Departamento I+D TEA Ediciones. (2008). *NEO PI-R, Inventario de Personalidad NEO Revisado, y NEO-FFI: Manual profesional* (3ª ed.). TEA Ediciones. ISBN 978-84-7174-917-8
- Arribas, D. (2024). *NEO-PI-3: Inventario de Personalidad NEO-3, adaptación española*. Hogrefe TEA Ediciones. https://www.hogrefe-tea.com/public/catalogo/producto/neo-pi-3-inventario-de-personalidad-neo-3
- Martínez-Uribe, P., & Cassaretto, M. (2011). Validación del Inventario de los Cinco Factores NEO-FFI en español en estudiantes universitarios peruanos. *Revista Mexicana de Psicología, 28*(1), 63-74. https://www.redalyc.org/pdf/2430/243029630006.pdf
- Ortet, G., Ibáñez, M. I., Moya, J., Villa, H., Viruela, A., & Mezquita, L. (2012). Assessing the Five Factors of personality in adolescents: The Junior Version of the Spanish NEO-PI-R. *Assessment, 19*(1), 114-130. https://doi.org/10.1177/1073191111410166
- Zambrano-Hernández, R. (2011). Revisión sistemática del Inventario de Personalidad NEO (NEO-PI). *Psicología desde el Caribe, (27)*, 179-198. http://www.scielo.org.co/scielo.php?script=sci_arttext&pid=S0123-417X2011000100009
- Acosta-Prado, J. C., et al. (2022). Evidencias de validez del Inventario NEO-FFI en adultos mayores colombianos. *Psicología desde el Caribe*. http://www.scielo.org.co/scielo.php?script=sci_arttext&pid=S2011-30802022000200135

### 15.4 Big Five / FFM teoría y alternativas

- John, O. P., Naumann, L. P., & Soto, C. J. (2008). Paradigm shift to the integrative Big Five trait taxonomy: History, measurement, and conceptual issues. In O. P. John, R. W. Robins, & L. A. Pervin (Eds.), *Handbook of personality: Theory and research* (3rd ed., pp. 114-158). Guilford Press.
- Soto, C. J., & John, O. P. (2017a). The next Big Five Inventory (BFI-2): Developing and assessing a hierarchical model with 15 facets to enhance bandwidth, fidelity, and predictive power. *Journal of Personality and Social Psychology, 113*(1), 117-143. https://doi.org/10.1037/pspp0000096
- Soto, C. J., & John, O. P. (2017b). Short and extra-short forms of the Big Five Inventory-2: The BFI-2-S and BFI-2-XS. *Journal of Research in Personality, 68*, 69-81. https://doi.org/10.1016/j.jrp.2017.02.004
- Johnson, J. A. (2014). Measuring thirty facets of the Five Factor Model with a 120-item public domain inventory: Development of the IPIP-NEO-120. *Journal of Research in Personality, 51*, 78-89. https://doi.org/10.1016/j.jrp.2014.05.003
- Lee, K., & Ashton, M. C. (2018). Psychometric properties of the HEXACO-100. *Assessment, 25*(5), 543-556. https://doi.org/10.1177/1073191116659134
- Donnellan, M. B., Oswald, F. L., Baird, B. M., & Lucas, R. E. (2006). The Mini-IPIP scales: Tiny-yet-effective measures of the Big Five factors of personality. *Psychological Assessment, 18*(2), 192-203. https://doi.org/10.1037/1040-3590.18.2.192
- Kajonius, P. J., & Johnson, J. A. (2019). Assessing the structure of the Five Factor Model of Personality (IPIP-NEO-120) in the public domain. *Europe's Journal of Psychology, 15*(2), 260-275. https://doi.org/10.5964/ejop.v15i2.1671
- Ashton, M. C., et al. (2020). Recovering the HEXACO personality factors — and psychoticism — from variable sets assessing normal and abnormal personality. *Journal of Individual Differences*. https://doi.org/10.1027/1614-0001/a000305

### 15.5 Fuentes sobre licencia, publishers y distribución LATAM

- Psychological Assessment Resources. (2024). *NEO Personality Inventory-3 (Normative Update) product page*. https://www.parinc.com/products/NEO-PI-3-NU
- Psychological Assessment Resources. (2024). *NEO Five-Factor Inventory-3 (Normative Update) product page*. https://www.parinc.com/products/NEO-FFI-3-NU
- Hogrefe Ltd UK. (2024). *NEO-PI-3 UK Edition product page*. https://www.hogrefe.com/uk/shop/neo-personality-inventory-third-edition-uk.html
- Hogrefe TEA Ediciones. (2024). *NEO-PI-3 Inventario de Personalidad NEO-3 (adaptación española)*. https://www.hogrefe-tea.com/public/catalogo/producto/neo-pi-3-inventario-de-personalidad-neo-3
- SIGMA Assessment Systems. (2025). *NEO-PI-3 prices*. https://sigmatesting.com/prices/neopi3price.htm
- Hogrefe Publishing Group. (2025, April 2). *Press release: Hogrefe acquires Editorial Manual Moderno (Mexico) and Vesalius, with Colombian subsidiary*. https://www.hogrefe.com/eu/service/for-media-partners/press-releases
- Kurtz, J. E. (2020). NEO Inventories. In V. Zeigler-Hill & T. K. Shackelford (Eds.), *Encyclopedia of personality and individual differences*. Springer. https://doi.org/10.1007/978-3-319-24612-3_940

### 15.6 Estándares, compliance y dominio público

- International Personality Item Pool. (n.d.). *30 Facet NEO-PI-R items*. https://ipip.ori.org/30FacetNEO-PI-RItems.htm
- International Test Commission. (2017). *ITC Guidelines for translating and adapting tests* (2nd ed.). https://www.intestcom.org/files/guideline_test_adaptation_2ed.pdf
- Congreso de la República de Colombia. (2006). Ley 1090 de 2006 — Por la cual se reglamenta el ejercicio de la profesión de Psicología.
- Congreso de la República de Colombia. (2012). Ley 1581 de 2012 — Por la cual se dictan disposiciones generales para la protección de datos personales.

---

## CAVEATS FINALES

- **Precios per-uso PAR no son públicos:** las cifras USD 6-10/admin son inferencias basadas en pricing comparable (NEO-PI-3:4FV) y deben confirmarse con cotización oficial PAR antes de cualquier negociación. Las cifras SIGMA (USD 37-38/admin) y TEA Ediciones (€20.95 ≈ USD 22.50/admin con informe) sí están verificadas en páginas públicas del publisher (mayo 2026).
- **Hogrefe TEA Ediciones €8.11 / €12.84:** confirmados vía resellers autorizados (Librería Imagina); página oficial hogrefe-tea.com renderiza precios en cliente JS. Recomendable confirmación telefónica con TEA Madrid antes de firmar contrato.
- **Adquisición Manual Moderno:** ocurrió el 2 de abril de 2025. El catálogo NEO-PI-3 en Manual Moderno Colombia post-adquisición aún no es público; los productos NEO en Colombia hoy se canalizan principalmente vía importación TEA España.
- **Convergencias IPIP-NEO vs NEO-PI-R:** las cifras r = .85-.90 a nivel de dominio provienen de Maples et al. (2014) sobre IPIP-based 120-item measures vs NEO-PI-R; no existe estudio publicado que compare directamente IPIP-NEO-120 con NEO-PI-3 NU 2024.
- **Sin DOI verificable para el manual unificado McCrae y Costa (2010):** el manual de PAR no fue depositado en Crossref por el editor; se cita por ISBN. Esto es típico de manuales propietarios y no afecta la validez de la referencia.
- **PSN adolescente y Costa Toledo-Bolívar Brasil-Portugal:** denominaciones reportadas en la solicitud original pero no localizables verbatim en bases peer-reviewed indexadas durante la consolidación. Marcadas como **[sin fuente verificada]** en la Sección 4 y como gaps en la Sección 14. La línea adolescente española oficial documentada es JS NEO (Ortet et al., 2012); la línea brasileña documentada es Flores-Mendoza et al. vía Vetor Editora.
- **Ningún ítem literal del NEO-PI-3 fue reproducido** en este dossier, en cumplimiento del copyright PAR; el pseudocódigo de scoring usa marcadores `declare` para los mapas de ítems, que deberían rellenarse desde el manual oficial bajo licencia.
- **Trazabilidad de divergencia entre dossiers Claude y Gemini:** ambos coincidieron en la inviabilidad estructural del NEO-PI-3 para freemium B2C, en la dominancia de IPIP-NEO-120 como sustituto open, y en la ausencia de baremos colombianos peer-reviewed. Datos comerciales detallados (PAR USD 637-860, SIGMA USD 37-38, Hogrefe UK £39-108, TEA €8.11+€12.84) provienen del análisis Claude. Marco teórico HEXACO vs FFM, profundidad fenomenológica de facetas y discusión de SKK y deseabilidad social provienen del análisis Gemini. La validación colombiana de NEO-FFI en adultos mayores (Acosta-Prado et al., 2022, SciELO Colombia) proviene del análisis Gemini.

---

*Cierre del dossier consolidado v2.1 — NEO-PI-3 / NEO-FFI-3. Hipótesis confirmada: licencia PAR Inc. con tarifa por aplicación es estructuralmente inviable para freemium LATAM con volumen 10.000-50.000 admin/año. NEO-PI-3 queda fuera del stack implementable; permanece como referencia teórica de validación.*
