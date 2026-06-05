# Dossier de Investigación Profunda v2.1 — Personal Globe Inventory (PGI / PGI-Short)

**Proyecto:** DescubreMe — plataforma freemium B2C de autoconocimiento profundo (LATAM, foco Colombia, no clínico, no selección de personal)
**Decisión que respalda:** Evaluación P3 (Media prioridad) del PGI como instrumento de intereses vocacionales para Track A v1.5 (Q1 2027), sobre stack v2.0 que ya incorpora O*NET IP SF (RIASEC) como instrumento principal.
**Fecha de cierre:** 10 de mayo de 2026
**Versión consolidada:** sintesis unificada de dossiers Claude y Gemini, datos cuantitativos contrastados contra fuente primaria (Tracey, 2002; Etzel & Nagy, 2019; ZPID, 2021).

---

## SECCIÓN 0 — PORTADA Y RESUMEN EJECUTIVO

**Instrumento:** Personal Globe Inventory (PGI) y sus versiones derivadas (PGI completo de 108 títulos ocupacionales + 113 actividades; PGI-Short de ~40-80 ítems según iteración; PGI-Mini).
**Autor:** Terence J. G. Tracey (Arizona State University, Mary Lou Fulton Teachers College).
**Año original:** 2002 (monografía en *Journal of Vocational Behavior*, 60(1), 113-172, DOI: 10.1006/jvbe.2001.1817).
**Idioma original:** inglés estadounidense.
**Versión corta:** PGI-Short (Tracey, 2010) calibrada por Teoría de Respuesta al Ítem multidimensional sobre N = 2 813 administraciones online; 10 escalas (8 intereses básicos + alto/bajo prestigio); α reportados .79-.91; consolidación internacional de α en rango .71-.92 (Etzel & Nagy, 2019, DOI: 10.1016/j.jvb.2019.01.003).
**Adaptación oficial al español:** **inexistente**. No se identifica validación peer-reviewed del PGI o PGI-Short en ningún país hispanohablante (España, México, Argentina, Chile, Colombia, Perú, Ecuador, Uruguay, Paraguay) al cierre de mayo de 2026.

**Resumen ejecutivo (3-5 líneas).** El PGI es el inventario de intereses vocacionales más avanzado teóricamente disponible en código abierto académico: extiende el hexágono RIASEC de Holland a un modelo octante de 8 tipos en el ecuador (Facilitación Social, Gestión, Detalle Administrativo, Procesamiento de Datos, Mecánica, Naturaleza/Aire Libre, Artístico, Ayuda) más una tercera dimensión ortogonal de prestigio que define 5 escalas de alto prestigio en el polo norte y 5 escalas de bajo prestigio en el polo sur (total 18 escalas esféricas). Triangula simultáneamente preferencia por actividades, autoeficacia/competencia percibida en actividades y preferencia ocupacional. Tiene propiedades psicométricas robustas (α > .80; replicación estructural en al menos 12 países) y licencia CC-BY-SA 4.0 vía ZPID Open Test Archive (DOI: 10.23668/psycharchives.4545), lo que permite uso comercial pero obliga a publicar cualquier adaptación bajo la misma licencia. Sin embargo, no existe versión validada en español hispanoamericano, no hay normas para adultos LATAM, el crosswalk ocupacional es limitado frente al O*NET, y la cláusula ShareAlike impide propietarizar el banco traducido como ventaja competitiva.

**Recomendación ejecutiva.** **NO INCLUIR EN MVP1 / CONDICIONAL PARA v1.5 Q1 2027 como módulo opt-in premium**, sujeta a tres pre-condiciones: (1) confirmación de que el O*NET IP SF en español del stack v2.0 ya cubre el ~85 % del valor informativo de intereses para el segmento B2C masivo, (2) decisión estratégica sobre si DescubreMe quiere asumir el costo de I+D (USD 25 000-60 000 + 9-15 meses) para producir la primera validación colombiana del PGI-Short y publicarla open access, (3) presupuesto UX adicional para comunicar al usuario lego la riqueza del modelo octante + prestigio sin saturar la interfaz. **Hipótesis del proyecto sobre varianza única: confirmada parcialmente.** El PGI aporta varianza única real sobre O*NET IP SF (dimensiones People-Things/Data-Ideas explícitas, autoeficacia integrada, prestigio ortogonal, octantes que desdoblan Realistic y Conventional), pero la utilidad incremental para el usuario final no clínico es marginal frente al costo de implementación y comunicación.

---

## SECCIÓN 1 — CONSTRUCTO MEDIDO

### 1.1 El modelo esférico de intereses Tracey-Rounds

**Hecho:** El modelo esférico de intereses vocacionales (Tracey & Rounds, 1996; Tracey, 1997) se construyó empíricamente como generalización del modelo hexagonal RIASEC de Holland (1959, 1997). Tracey y Rounds (1995) demostraron mediante escalamiento multidimensional que los ítems de interés se distribuyen uniformemente alrededor de un círculo y no en seis nodos discretos; la división del círculo en seis tipos RIASEC es por tanto estadísticamente arbitraria. Esto abrió la puerta a representaciones equivalentes con cualquier número de "rebanadas". Tracey adoptó un modelo de 8 tipos (octante) por dos razones: (a) ajusta tan bien o mejor que el RIASEC en pruebas de orden aleatorizadas (Hubert & Arabie, 1987), y (b) calza geométricamente con las dos dimensiones bipolares de Prediger (1982): People-Things y Data-Ideas.

**Hecho:** Los 8 tipos básicos del ecuador del PGI son: Social Facilitating (Facilitación Social), Managing (Gestión/Dirección), Business Detail (Detalle Administrativo), Data Processing (Procesamiento de Datos), Mechanical (Mecánica), Nature/Outdoors (Naturaleza/Aire Libre), Artistic (Artístico) y Helping (Ayuda).

### 1.2 La tercera dimensión: prestigio ocupacional

**Hecho:** Tracey y Rounds (1996) y luego Tracey (2002) identificaron un tercer factor ortogonal —prestigio (estatus, nivel de entrenamiento, dificultad/responsabilidad)— que ya había sido sugerido por Roe (1956), Strong (1943) y Holland (1997) pero nunca operativizado en un inventario psicométrico mainstream. Al añadir esta dimensión, el modelo deja de ser un círculo y pasa a ser una esfera: el ecuador contiene los 8 tipos básicos en valor de prestigio neutro, el polo norte agrupa 5 escalas de alto prestigio (Influence, Financial Analysis, Social Sciences, Business Systems, Science) y el polo sur agrupa 5 escalas de bajo prestigio (Manual Work, Basic Services, Personal Service, Construction/Repair, Quality Control). Total: **18 escalas esféricas**.

**Inferencia:** El prestigio funciona como organizador de la cognición vocacional independiente del eje horizontal de contenido. Al ignorar el prestigio, los inventarios tradicionales colapsan profesiones drásticamente diferentes en una misma categoría plana — bajo el RIASEC clásico, un neurocirujano jefe y un técnico auxiliar de enfermería convergen en categorías Investigador/Social, ocultando el abismo de complejidad cognitiva, responsabilidad y trayectoria de formación. **Implicación para DescubreMe:** la dimensión de prestigio permite diferenciar perfiles que el O*NET IP SF no separa, lo que tiene valor narrativo para usuarios con interés en "aspiración" o "techo profesional".

**Hecho:** Tracey introdujo el concepto de convergencia dependiente del prestigio. Geométricamente, a medida que uno se aleja del ecuador hacia los polos, la circunferencia del globo se contrae; psicológicamente, esto implica que en los extremos del prestigio los intereses horizontales se vuelven menos diferenciados (un cajero de comida rápida y un operario de ingreso de datos rutinario quedan psicológicamente más cerca que un neurocirujano y un técnico de enfermería).

### 1.3 Triangulación: preferencia + competencia + ocupación

**Hecho:** El PGI clásico evalúa el perfil del usuario triangulando tres dominios cognitivos complementarios:

1. **Preferencias de actividad:** atracción o aversión hedónica hacia tareas concretas, en escala 1 ("disgusto fuerte") a 7 ("agrado fuerte").
2. **Creencias de competencia en actividad (autoeficacia):** percepción subjetiva sobre la propia capacidad para ejecutar dichas tareas, escala 1 ("incapaz") a 7 ("muy competente"). Esta integración refleja la Teoría Cognitiva Social de la Carrera (Lent, Brown & Hackett, 1994; Bandura, 1986).
3. **Preferencias ocupacionales:** atracción hacia títulos de trabajo profesionales específicos del mercado laboral, escala 1-7 idéntica.

**Inferencia:** La doble medición preferencia-competencia habilita la "liking-competence difference scale" (Tracey, 2002) — cuando la diferencia es alta, revela conflicto entre deseo y autoeficacia, marcador clínico relevante para orientación vocacional. **Implicación para DescubreMe:** este es el aporte conceptual más distintivo del PGI sobre RIASEC/O*NET y la base potencial para un módulo narrativo de "intereses vs. capacidad percibida" en un tier Paid premium.

### 1.4 Comparación con instrumentos cercanos

**Hecho:**

- **Hexágono RIASEC / O*NET IP SF:** 6 tipos equiespaciados; orden circular replicado pero forma hexagonal culturalmente sensible (Rounds & Tracey, 1996; Long & Tracey, 2006). El PGI reproduce el nivel GOT/RIASEC mediante composiciones angulares ponderadas de las 18 escalas esféricas.
- **Strong Interest Inventory (SII):** opera en cuatro niveles (6 GOT, 30 Basic Interest Scales, 244 Occupational Scales, 5 Personal Style Scales; Donnay et al., 2005). El PGI reproduce el nivel GOT, suma autoeficacia integrada (que el SII no incorpora; el SII derivó posteriormente un Skills Confidence Inventory separado) y suma prestigio explícito. SII es instrumento propietario; PGI es académico-abierto.
- **Self-Directed Search (SDS):** instrumento Holland propietario, 228 ítems en versión clásica. Convergente con PGI (Tracey, 2002) con correlación media r = .71 contra Strong; r = .68 contra Skills Confidence Inventory.
- **Inventory of Children's Activities (ICA):** versión paralela del PGI para población infantil (Tracey & Ward, 1998); fuera del alcance de DescubreMe.

### 1.5 Crítica al supuesto de bipolaridad de Prediger

**Hecho:** Tay, Su y Rounds (2011, *Journal of Counseling Psychology*, 58(3), 424-440, DOI: 10.1037/a0023488) realizaron un meta-análisis sobre 26 inventarios de intereses con N = 1 008 253 participantes. Las correlaciones meta-analíticas entre tipos RIASEC opuestos oscilaron entre -.03 y .18 (corregidas: -.23 a -.06), sin alcanzar el criterio mínimo de bipolaridad de -.40. **Inferencia:** la asunción de que People-Things y Data-Ideas son polos opuestos bipolares es débil empíricamente; podrían ser dimensiones más independientes que opuestas. El PGI absorbe esta limitación pero la atenúa mediante el modelo continuo circumplejo.

### 1.6 Relevancia para autoconocimiento y orientación

**Hecho:** El metaanálisis de Nye, Su, Rounds y Drasgow (2017, DOI: 10.1016/j.jvb.2016.10.002) reporta correlaciones modestas (r ≈ .14-.22) entre congruencia interés-ocupación y desempeño laboral. **Inferencia:** los inventarios de intereses no predicen rendimiento; predicen satisfacción y persistencia vocacional. Esto está alineado con el posicionamiento no-selección de DescubreMe.

---

## SECCIÓN 2 — ESTRUCTURA DEL INSTRUMENTO

### 2.1 PGI completo

- **Hecho:** dos bloques de ítems combinables.
  - **PGI-Occupations:** 108 títulos ocupacionales valorados en escala Likert de 7 puntos (1 = "very strongly dislike" → 7 = "very strongly like").
  - **PGI-Activities:** 113 actividades (108 puntuables + 5 exploratorias) valoradas dos veces — primero en preferencia (1-7 dislike/like) y después en competencia percibida (1 = "unable to do" → 7 = "very competent").
- Cada una de las 18 escalas esféricas se nutre de 6 ítems por tipo de respuesta.
- **Tiempo:** 20-30 minutos en formato online; >220 reactivos totales considerando las dos pasadas.
- **Output:** hasta 31 escalas compuestas para intereses + 31 para autoeficacia = **62 escalas finales** según manual.

### 2.2 PGI-Short (PGI-S, Tracey, 2010)

- **Hecho:** ~40 actividades valoradas dos veces (preferencia + competencia); 10 escalas (8 intereses básicos + 2 escalas de prestigio).
- Construida mediante Teoría de Respuesta al Ítem (Modelo de Crédito Parcial Generalizado) sobre N = 2 813 administraciones online en la Virtual Counseling Center.
- **Tiempo:** ~10-15 minutos en formato web.
- Conserva ajuste estructural esférico equivalente al PGI completo (Zhang et al., 2013; Etzel & Nagy, 2019).

### 2.3 PGI-Mini

- **Hecho:** versión ultra-breve referida en el manual ZPID (2021) para evaluación móvil y "big data" online. Aplicada al estudio internacional vía revista *Time* en N = 74 países (Stoll et al., 2020 según referencias colaterales en Gemini, no verificada con DOI primario).

### 2.4 Inventario derivado: Inventory of Children's Activities (ICA)

**Hecho:** versión paralela para población infantil (Tracey & Ward, 1998); fuera del alcance B2C adulto de DescubreMe.

### 2.5 Anti-alucinación de ítems

**Hecho:** No se reproducen ítems literales del PGI ni del PGI-Short en este dossier. La descripción del banco se limita a estructura (cantidades, claves, dominios). Para acceso a los ítems, descargar el repositorio oficial del ZPID Open Test Archive (Tracey, 2021, DOI: 10.23668/psycharchives.4545). La versión 2002 publicada en *Journal of Vocational Behavior* está bajo copyright Elsevier; **usar siempre el depósito ZPID 2021 como fuente legal**.

---

## SECCIÓN 3 — PROPIEDADES PSICOMÉTRICAS ORIGINALES

### 3.1 Muestras de validación

**Hecho:** Tracey (2002) usó muestras universitarias estadounidenses, en particular cohortes de Arizona State University (ASU) y la Virtual Counseling Center web platform; n acumulado de varios miles de respondentes con diversidad de edad (14+), género y etnia. Tracey (2010) calibró el PGI-Short sobre N = 2 813 administraciones online.

### 3.2 Confiabilidad

| Indicador | PGI completo | PGI-Short |
|---|---|---|
| α de Cronbach reportado por Tracey (2002, 2010) | > .80 en todas las escalas | .79-.91 |
| α consolidado internacional (Etzel & Nagy, 2019) | .69-.96 | **.71-.92** |
| α reportado por Gemini (varias muestras) | .79-.93 | .79-.91 |
| Test-retest | r > .77 | r ≈ .76-.85 (validaciones internacionales) |

**Inferencia:** Las facetas extremas del rango (.69 inferior; .96 superior) indican que algunas escalas son menos robustas que otras y que la heterogeneidad muestral influye. El PGI-Short tiene rango más estrecho y operativamente más manejable.

### 3.3 Validez estructural / CFA

**Hecho:**

- Tracey (2002) demostró ajuste superior del modelo octante respecto al hexágono RIASEC mediante el Randomization Test of Hypothesized Order Relations (RTHOR; Hubert & Arabie, 1987). El modelo esférico de tres dimensiones añade prestigio como factor ortogonal con respaldo empírico.
- Etzel, Nagy y Tracey (2016, *Journal of Career Assessment*, DOI: 10.1177/1069072715616122) confirmaron la estructura esférica en Alemania (N robusto).
- Zhang, Kube, Wang y Tracey (2013, DOI: 10.1016/j.jvb.2013.03.009) replicaron el ajuste en N = 2 567 estudiantes chinos (CI fuerte para octante y RIASEC).
- Etzel y Nagy (2019, DOI: 10.1016/j.jvb.2019.01.003) consolidan las dimensiones del modelo esférico en versiones larga y corta sobre muestras internacionales.

### 3.4 Validez convergente

**Hecho:** Tracey (2002) reporta correlaciones medias r = .71 entre las puntuaciones compuestas del PGI y las escalas del Strong Interest Inventory (SII) y r = .68 con el Skills Confidence Inventory (SCI). El PGI también converge con el Self-Directed Search (SDS) en muestras estadounidenses.

### 3.5 Invarianza factorial

**Hecho:**

- Tracey (2002) y validaciones posteriores (Long, Adams & Tracey, 2005 en China; Wilkins, Ramkissoon & Tracey, 2013 en Caribe; Zhang et al., 2013) reportan invarianza estructural por género y, en general, por etnicidad y nivel educativo en muestras estadounidenses.
- Wilkins et al. (2013, DOI: 10.1016/j.jvb.2013.06.005) en muestra caribeña (Jamaica + Trinidad, N = 221) encontraron buen ajuste para los modelos circulares (RIASEC y octante) pero **no para la estructura esférica completa** — la dimensión de prestigio puede tener especificidad cultural.
- Tracey (2002) reporta diferencias de medias significativas por género: hombres puntúan más alto en el polo "Things" (Mechanical, Nature/Outdoors), mujeres puntúan más alto en el polo "People" (Helping, Social Facilitating); tamaños de efecto d > 1.0 en algunas escalas (consistente con Su, Rounds & Armstrong, 2009, DOI: 10.1037/a0017364, meta-análisis que reporta d ≈ 0.93 en la dimensión People-Things).

### 3.6 Validez predictiva

**Hecho:** Estudios chinos reportados por Long, Adams y Tracey (2005) y subsiguientes muestran que las puntuaciones PGI predicen la elección educativa entre tres ramas (Artes/Humanidades, Negocios, Ciencias) en estudiantes de preparatoria. **Hecho:** Šverko y Babarović (2016) en N = 630 estudiantes universitarios croatas examinaron congruencia P-E (Person-Environment Fit) usando índices del PGI y encontraron que el ajuste capturó <1 % de la varianza en satisfacción y GPA — la congruencia predice débilmente outcomes académicos.

**Inferencia crítica:** el PGI describe identidad vocacional con alta resolución, pero predice débilmente outcomes externos como GPA o satisfacción longitudinal. Esto es coherente con el metaanálisis de Nye et al. (2017) y refuerza el posicionamiento del PGI como instrumento de autoconocimiento, no de predicción de éxito.

### 3.7 Limitaciones metodológicas

**Hecho:**

1. Las muestras de derivación están sesgadas hacia universitarios estadounidenses jóvenes; la generalización a adultos trabajadores latinoamericanos no está empíricamente respaldada.
2. La dimensión de prestigio es culturalmente sensible — lo que se considera alto prestigio en EE. UU. no se replica idénticamente en Caribe (Wilkins et al., 2013) o Vietnam (Rose et al., 2022).
3. El uso del RTHOR como estadístico principal es robusto pero menos familiar para revisores no especializados; CFA tradicionales sobre circumplejos presentan desafíos por la naturaleza circular de las relaciones esperadas.
4. La suposición de bipolaridad estricta de las dimensiones People-Things y Data-Ideas ha sido cuestionada empíricamente por Tay et al. (2011) — correlaciones meta-analíticas insuficientes para sostener bipolaridad pura.

---

## SECCIÓN 4 — ADAPTACIONES CULTURALES DISPONIBLES

### 4.1 Tabla resumen de adaptaciones validadas

**Hecho:** El PGI ha sido objeto de validaciones estructurales en al menos 12 países o regiones distintas (citas verificadas con DOI cuando disponible):

| País / región | Versión | Cita primaria | DOI |
|---|---|---|---|
| Alemania | PGI completo / PGI-S | Etzel, Nagy & Tracey (2016); Etzel & Nagy (2019) | 10.1177/1069072715616122 ; 10.1016/j.jvb.2019.01.003 |
| China continental | PGI | Long, Adams & Tracey (2005) | 10.1016/j.jvb.2003.12.003 |
| China continental | PGI-S | Zhang, Kube, Wang & Tracey (2013) | 10.1016/j.jvb.2013.03.009 |
| Japón | PGI-Occupations traducido | Long, Watanabe & Tracey (2006) | [sin DOI Crossref verificado] |
| Vietnam | PGI-S | Rose, Nguyen, Kim & Nguyen (2022) | 10.1002/joec.12176 |
| Caribe (Jamaica + Trinidad) | PGI | Wilkins, Ramkissoon & Tracey (2013) | 10.1016/j.jvb.2013.06.005 |
| Turquía | PGI-S-T | Vardarlı, Özyürek, Wilkins-Yel & Tracey (2017) | 10.1007/s10775-016-9338-6 |
| Croacia | PGI / PGI-S | Šverko (2008); Šverko & Babarović (2016) | 10.1016/j.jvb.2007.10.001 |
| Serbia | PGI | Hedrih (2008) | 10.1016/j.jvb.2008.01.003 |
| Irlanda | PGI modificado | Darcy (2005) | 10.1016/j.jvb.2004.08.005 |
| Países Bajos | PGI | Holtrop, Born & de Vries (2018) | 10.1177/1069072717692745 |
| Portugal (lusófono europeo) | PGI traducido | Morais, Silva, Paixão & Tracey (2024) | 10.1007/s10775-024-09687-2 |

**Hecho:** En el espacio iberoamericano, los marcadores Alternate Forms Public Domain (AFPD) de RIASEC fueron adaptados al español por Cupani, Morán y colaboradores (Argentina, 2019; DOI: indirecto vía ResearchGate) en N = 1 107 universitarios de la Universidad Nacional de Córdoba (18-62 años, 61.6 % mujeres). Estos AFPD son estructuralmente análogos a las escalas que alimentan las tipologías del PGI, pero **no constituyen una adaptación del PGI propiamente**. La investigación reportó CFA con parcelación de ítems, retención exitosa de los 6 dominios RIASEC y eficacia discriminante: 75 % de varianza explicada en campos de formación; clasificación correcta 48.4-56.5 % vs. baseline aleatoria 3-19 %.

### 4.2 Estado del PGI en español hispanoamericano

**Hecho:** La búsqueda exhaustiva (mayo 2026, fuentes Google Scholar, Redalyc, SciELO, ResearchGate, PsycInfo) **no identifica ningún artículo peer-reviewed de validación del PGI o PGI-Short en español de España, México, Argentina, Chile, Colombia, Perú, Ecuador, Uruguay o Paraguay**. Materiales en español identificados que mencionan o aproximan el PGI:

- Presentación docente "Inventario Global Personal de Tracey" en Scribd — material informal, no validación.
- Capítulo mexicano sobre diferencias de sexo en el modelo esférico que cita el PGI pero no constituye validación psicométrica (Fernández-Nistal, Mora-Soto & Ponce-Zaragoza, citado en literatura RIASEC mexicana).
- Adaptación argentina del AFPD-RIASEC (Cupani et al., 2019) — análoga conceptualmente pero **NO** es PGI.
- Tesis y trabajos colombianos no peer-reviewed sobre orientación vocacional inspirados en Tracey y Holland (Universidad Distrital, Universidad Nacional de Colombia).

**Inferencia:** DescubreMe sería el primer actor en producir una adaptación validada del PGI en español hispanoamericano. Esto es simultáneamente oportunidad académica (publicación open access; posicionamiento científico) y costo de I+D no trivial (USD 25 000-60 000 + 9-15 meses).

### 4.3 Validaciones brasileñas y lusófonas

**Hecho:** Brasil no cuenta con publicación peer-reviewed con DOI verificado de validación estructural del PGI en portugués brasileño. La adaptación lusófona disponible es la europea de Morais, Silva, Paixão y Tracey (2024).

### 4.4 Aplicaciones en LATAM mencionadas en literatura paralela

**Hecho:** Investigaciones colombianas inspiradas en el modelo de Tracey pero no constituyendo adaptación del PGI:

- Universidad Distrital y Universidad Nacional de Colombia: trabajos de orientación vocacional con marco teórico Tracey-Holland; inventarios contextuales propios (>90 ítems, EFA) para programa de Psicología en clínica/educativa/organizacional.
- Herramientas digitales para preferencias profesionales en jóvenes colombianos publicadas en literatura regional (referencias en Gemini; sin DOI verificado de validación con N representativa).

**Inferencia:** existe interés académico colombiano en el modelo esférico, pero no hay todavía un instrumento PGI adaptado y validado para Colombia con muestra representativa y CFA reportada.

---

## SECCIÓN 5 — ADAPTACIÓN AL ESPAÑOL DE COLOMBIA (ANÁLISIS ESPECÍFICO)

### 5.1 Estado del arte

**Hecho:** No existe versión validada del PGI en español colombiano ni en ningún español hispanoamericano al cierre de mayo de 2026. DescubreMe tendría que ser el primer actor en producir esa adaptación si decide incorporar el PGI al stack.

### 5.2 Procedimiento de adaptación ITC 2017

**Opinión profesional:** Una adaptación ES-CO formal del PGI-Short (versión recomendada por tiempo administrativo) sigue las guías de la International Test Commission (ITC, 2017) y exige:

1. **Acuerdo con el autor y cumplimiento ShareAlike:** notificar al Dr. Terence Tracey y al ZPID Open Test Archive; aceptar publicar la adaptación bajo CC-BY-SA 4.0 (consecuencia: la traducción queda inmediatamente disponible para terceros).
2. **Traducción directa e inversa (forward-back translation)** por dos traductores bilingües certificados; reconciliación con un tercer traductor.
3. **Revisión por panel de expertos vocacionales colombianos** (mínimo 5) para validez de contenido (V de Aiken ≥ .80).
4. **Estudio piloto cognitivo** (cognitive interviewing, n ≈ 15-25 adultos urbanos colombianos heterogéneos en edad y educación) para detectar problemas de comprensión, especialmente en títulos ocupacionales (ej. "millwright", "actuary", "paralegal" carecen de equivalente cultural directo).
5. **Sustitución/adaptación de títulos ocupacionales** culturalmente lejanos por equivalentes colombianos manteniendo carga factorial dentro de cada escala esférica.
6. **Estudio de validación psicométrica** (n recomendado ≥ 500-1 000 adultos colombianos) con análisis: (a) fiabilidad α y ω, (b) RTHOR para ajuste octante y esférico, (c) invarianza por género y región (Andina, Caribe, Pacífico), (d) validez convergente con O*NET IP SF en español.
7. **Publicación open access** del artículo de validación + depósito del cuestionario adaptado en repositorio CC-BY-SA 4.0.

**Costo estimado (opinión profesional):** USD 25 000-60 000 + 9-15 meses calendario para llegar a una versión publicable.

### 5.3 Riesgos del uso directo de la versión inglesa traducida sin validación

**Inferencia:** Las diferencias léxico-semánticas entre el inglés estadounidense (banco original) y el español colombiano son sustanciales para títulos ocupacionales y descripciones de actividades. Riesgos identificados:

1. **Vocabulario ocupacional:** títulos como "actuary", "paralegal", "millwright" no tienen equivalente cultural en Colombia; los lectores podrían marcar respuestas vacías o sesgadas hacia disgusto por desconocimiento, no por preferencia real.
2. **Calibración del prestigio:** lo que se considera alto prestigio en EE. UU. (ej. abogado corporativo, consultor financiero) no necesariamente se mapea en Colombia con la misma intensidad sociológica. Sin recalibración, las normas son ruidosas.
3. **Aquiescencia y deseabilidad social:** consistentes con literatura LATAM (Rammstedt et al., 2013), respondentes con menor educación muestran mayor aquiescencia, lo que distorsiona puntuaciones de competencia percibida.
4. **Diferencias sexuales en People-Things:** Su et al. (2009) reportan d ≈ 0.93 a nivel meta-analítico; en Colombia, donde la segregación ocupacional por género sigue siendo alta, el uso de normas mixtas podría reproducir patrones discriminatorios.

---

## SECCIÓN 6 — LICENCIA Y PERMISOS (CRÍTICO)

### 6.1 Texto de la fuente oficial

**Hecho — ZPID Open Test Archive (Leibniz Institute for Psychology), metadatos DC.rights del depósito Tracey (2021):**

> "DC.rights: https://creativecommons.org/licenses/by-sa/4.0/"

**Hecho — Creative Commons Attribution-ShareAlike 4.0 International (CC-BY-SA 4.0), texto literal de la licencia:**

> "You are free to: Share — copy and redistribute the material in any medium or format. Adapt — remix, transform, and build upon the material for any purpose, even commercially. (...) Under the following terms: Attribution — You must give appropriate credit, provide a link to the license, and indicate if changes were made. ShareAlike — If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original."

**Hecho — sitio del autor:** Terence J. G. Tracey mantiene el repositorio canónico web público histórico en https://pgi.asu.edu y el sitio personal académico vinculado a Arizona State University. La versión legalmente actualizada del banco de ítems vive en ZPID (Tracey, 2021, DOI: 10.23668/psycharchives.4545). Contacto: terence.tracey@asu.edu. **Verificación cruzada con el URL provisto en el brief (https://wendymtracey.faculty.arizona.edu):** [sin fuente verificada] al cierre de mayo de 2026 ese URL no corresponde al sitio oficial del PGI; el sitio activo es pgi.asu.edu y el depósito autoritativo es ZPID.

### 6.2 Respuesta explícita a las 9 preguntas obligatorias

| Pregunta | Respuesta |
|---|---|
| 1. Tipo de licencia | **Creative Commons Attribution-ShareAlike 4.0 International (CC-BY-SA 4.0)** según metadatos del depósito ZPID (2021). Copyright original retenido por Terence J. G. Tracey. |
| 2. ¿Permite uso comercial? | **Sí, explícitamente.** CC-BY-SA 4.0 autoriza usos comerciales incluyendo modelos freemium B2C. |
| 3. ¿Permite adaptación y traducción? | **Sí**, sujeta a ShareAlike: la traducción al español de Colombia debe redistribuirse bajo CC-BY-SA 4.0. |
| 4. ¿Permite digitalización (web app)? | **Sí**, sujeto a atribución y ShareAlike. |
| 5. ¿Permite almacenar respuestas individuales? | Sí, pero atención a Ley 1581 de 2012 de Colombia para protección de datos personales. |
| 6. Atribución requerida | Sí: citar Tracey (2002) para la fuente teórica + Tracey (2021, ZPID) para el depósito + indicar los cambios + enlazar a la licencia CC-BY-SA 4.0. |
| 7. Costo estimado uso comercial LATAM | **USD 0 en licencia.** Sin tarifa de licencia, sin pago a Tracey ni a ZPID. Costo total se concentra en adaptación cultural + validación psicométrica colombiana (USD 25 000-60 000 estimados). |
| 8. Email/institución de contacto | terence.tracey@asu.edu (Arizona State University, Mary Lou Fulton Teachers College) y ZPID Open Test Archive https://www.testarchiv.eu. Notificación cortés recomendada aunque no legalmente obligatoria. |
| 9. Nivel de riesgo legal de usar en DescubreMe sin permiso adicional | **BAJO**, condicionado al cumplimiento estricto de las cláusulas BY-SA. Riesgo principal: si DescubreMe quiere mantener su banco de ítems traducidos como ventaja competitiva propietaria, **CC-BY-SA 4.0 es incompatible con esa estrategia** (la traducción queda inmediatamente pública). Riesgo secundario: usar la versión 2002 publicada en *Journal of Vocational Behavior* (Elsevier) infringe copyright Elsevier; usar siempre la versión ZPID 2021. |

### 6.3 Acciones requeridas antes de Q1 2027

**Opinión profesional:**

1. **Decisión estratégica previa:** si DescubreMe decide incluir el PGI-Short como módulo opt-in, asumir que la traducción colombiana será pública y no constituirá moat de producto. El moat tendría que construirse en la capa de interpretación, UX y crosswalk ocupacional, no en el banco de ítems.
2. **Notificación cortés al autor:** enviar correo a Tracey describiendo naturaleza del proyecto, planes de adaptación al ES-CO y compromiso de publicación open access del banco resultante. No es obligación legal pero es estándar académico y mantiene relación constructiva.
3. **Cumplimiento operativo BY-SA:** preparar plantilla de atribución para la interfaz ("Basado en Tracey, T. J. G. (2002, 2021). PGI – Personal Globe Inventory. ZPID Open Test Archive, DOI: 10.23668/psycharchives.4545. Adaptación al español de Colombia 2027 por DescubreMe, distribuida bajo CC-BY-SA 4.0").
4. **Plan B legal:** si el equipo decide que el moat de banco propio es crítico, descartar PGI y mantener exclusivamente O*NET IP SF (dominio público estadounidense, sin obligación ShareAlike) como instrumento principal de intereses.

---

## SECCIÓN 7 — SCORING Y REGLAS DE PUNTUACIÓN

### 7.1 Procedimiento de puntuación PGI-Short

**Hecho:**

1. Para cada una de las 10 escalas (8 octantes + 2 prestigios), calcular la **media aritmética** de los 4 ítems que la integran, separadamente para preferencia y competencia.
2. **Dimensiones bipolares de Prediger** (People-Things, Data-Ideas): se obtienen como coordenadas cartesianas (x, y) del centroide del perfil en el ecuador, usando los ángulos teóricos de las 8 escalas básicas:
   - Coordenada People-Things: ∑ᵢ Sᵢ · cos(θᵢ)
   - Coordenada Data-Ideas: ∑ᵢ Sᵢ · sin(θᵢ)
3. **Dimensión de prestigio:** diferencia entre la media de las escalas de alto prestigio y la media de las escalas de bajo prestigio.
4. **Composición RIASEC:** las 6 escalas RIASEC se construyen como composiciones angulares ponderadas de las 8 escalas esféricas; los pesos se derivan de las posiciones angulares teóricas de cada tipo Holland en el círculo (Tracey, 2002).
5. **Vector resumen del perfil:** ángulo (dirección dominante) + magnitud (longitud = diferenciación / nitidez vocacional). Vector largo = intereses cristalinos; vector corto = ambivalencia.

### 7.2 Procedimiento de puntuación PGI completo

**Hecho:** cada escala esférica se calcula como media de los 6 ítems que la componen, separadamente para los 3 dominios (preferencia de ocupación, preferencia de actividad, competencia de actividad). Total: 18 × 3 = 54 puntuaciones primarias + 18 compuestos inter-dominio + 6 RIASEC + 2 bipolares + 1 prestigio = 45 escalas adicionales según manual, alcanzando las 31 escalas compuestas finales descritas por Tracey (2002).

### 7.3 Normas y baremos

**Hecho:** Tracey (2002) provee normas separadas por género construidas sobre la muestra estadounidense de la Virtual Counseling Center; Tracey (2010) actualiza normas para PGI-S sobre N = 2 813. **No existen normas para población hispanohablante**.

**Opinión profesional para DescubreMe:**

- **Fase 1 (lanzamiento):** mostrar puntuaciones en métrica POMP (% de máximo posible sobre la escala 1-7) y bandas tertiles (bajo/medio/alto) basadas en las medias de Tracey (2010) como referencia provisional, con disclaimer explícito de que las normas son estadounidenses.
- **Fase 2 (post N ≥ 1 000 usuarios colombianos):** generar baremos colombianos propios separados por género en banda People-Things (donde la diferencia d > 1.0 es esperable) y por edad si los datos lo permiten.

### 7.4 Interpretación de bandas

**Inferencia:**

- Banda baja: ≤ percentil 16 (≈ 1 DT bajo la media de referencia).
- Banda media: percentiles 17-84.
- Banda alta: ≥ percentil 84.

Evitar lenguaje categórico determinista ("eres tipo Realístico-Mecánico"); usar lenguaje descriptivo-exploratorio ("tu perfil de intereses se inclina hacia actividades relacionadas con manipulación de objetos y entornos al aire libre, con autoeficacia percibida moderada-alta en esa zona").

### 7.5 Liking-competence difference score

**Opinión profesional:** Calcular para cada escala la diferencia (preferencia – competencia). Si |diferencia| ≥ 1.5 puntos Likert, marcar la escala con disclaimer narrativo: "Te atrae fuertemente pero te sientes poco capaz" o "Te sientes muy capaz pero te atrae poco". Esta es la huella diagnóstica más distintiva del PGI y la base potencial del módulo Paid premium.

---

## SECCIÓN 8 — IMPLEMENTACIÓN DIGITAL

### 8.1 Orden de presentación

**Opinión profesional:**

- Randomización del orden de los 40 (PGI-S) o 108 (PGI) ítems para reducir efectos de orden y fatiga.
- Mantener ítem por pantalla independiente o bloques de 4-8 ítems para mobile-first.
- **Doble respuesta por ítem (preferencia + competencia):** mostrar los dos sliders en la misma pantalla del ítem (no pasadas separadas), con etiquetas inequívocas en español neutro:
  - "¿Cuánto te gustaría hacer esto?" → escala 1 ("Me disgusta mucho") a 7 ("Me gusta mucho")
  - "¿Qué tan capaz te sientes de hacerlo?" → escala 1 ("Incapaz de hacerlo") a 7 ("Muy competente")

### 8.2 Validación de respuestas y patrones sospechosos

**Opinión profesional — implementar:**

1. Tiempo mínimo por par de ítems (preferencia + competencia): < 2 s sugiere respuesta no atenta.
2. Detector de patrón único: ≥ 60 % de ítems con misma respuesta en preferencia o en competencia.
3. Aquiescencia extrema: media intra-sujeto ≥ 6.0 o ≤ 2.0 sobre las dos escalas → flag y no mostrar perfil.
4. Inconsistencia preferencia-competencia patológica: si ≥ 30 % de los pares tienen |diferencia| ≥ 4, sugerir relectura.
5. Tiempo total atípicamente bajo: < 4 minutos en PGI-S sugiere clic-clic sin lectura.

### 8.3 UX recomendada

- Mostrar la escala Likert de 7 puntos con etiquetas en cada extremo y punto medio.
- Permitir retroceder en cualquier momento.
- Barra de progreso visible.
- No forzar respuesta (permitir saltar), pero advertir antes del envío si hay ≥ 10 % de ítems sin contestar.
- Mostrar duración estimada al inicio: "40 ítems × 2 escalas, ~10-15 minutos" para PGI-S.
- Disclaimer pre-test: "Este cuestionario explora preferencias e intereses vocacionales, no es diagnóstico clínico ni evaluación de selección de personal".

### 8.4 Visualización del perfil

**Opinión profesional:**

- **Vista principal (Free):** radar/polar plot con las 8 escalas básicas en el ecuador.
- **Vista expandida (Paid):** mismo radar + barra vertical separada para prestigio + punto en plano cartesiano para People-Things × Data-Ideas + listado de 5 ocupaciones con mayor proximidad euclidiana (si se logra crosswalk con O*NET).
- **Liking-competence delta (Paid premium):** doble radar superpuesto (preferencia vs. competencia) con resaltado de escalas con |delta| ≥ 1.5.
- **Evitar el globo 3D literal:** alta complejidad cognitiva, bajo retorno informativo para usuario lego. El globo es una metáfora teórica; en producto, descomponer en componentes 2D digeribles.

### 8.5 Privacidad y compliance

**Opinión profesional:**

- Cifrado en reposo y en tránsito (TLS 1.3+).
- Cumplimiento de Ley 1581 de 2012 (protección de datos personales Colombia); consentimiento granular para uso anónimo agregado vs. perfil identificado.
- Derecho de eliminación accesible desde la cuenta del usuario.
- Auditabilidad: guardar respuestas crudas por ítem + timestamp por ítem + versión del instrumento + versión de la traducción + versión del scoring engine.
- Atribución CC-BY-SA visible en footer del reporte y en términos del producto.

### 8.6 Server-side scoring

**Opinión profesional:** Implementar el cálculo de coordenadas angulares y composiciones RIASEC en Supabase Edge Functions o backend equivalente, para proteger pesos angulares y normas evolutivas. Almacenar respuestas crudas + puntuaciones derivadas con versionado por release del scoring engine.

---

## SECCIÓN 9 — MAPEO AL STACK DESCUBREME (POST v2.0)

### 9.1 Stack v2.0 actual y posición del PGI

Stack v2.0 confirmado:

- BFI-2-S (personalidad Big Five, 30 ítems) — confirmado M1
- O*NET IP SF (intereses RIASEC, 60 ítems) — **Track A actual de intereses**
- PVQ-RR (valores, 57 ítems)
- VIA-IS-P 96 (fortalezas)
- BPNSFS (necesidades psicológicas básicas)
- SWLS, PANAS (bienestar subjetivo)
- IPIP-NEO opcional Paid premium (facetas extendidas)

Posición potencial del PGI:

- **No reemplaza a O*NET IP SF** como Track A principal. Razones operativas: O*NET tiene crosswalk ocupacional masivo (~1 000 ocupaciones actualizadas anualmente), versión oficial española del Departamento de Trabajo de EE. UU., dominio público sin ShareAlike, normas adultas diversas, validaciones internacionales emergentes.
- **Candidato a módulo Paid premium opt-in v1.5+**: PGI-Short como herramienta de profundización para usuarios que quieran resolución octante + autoeficacia + prestigio. Etiquetado claramente como instrumento de exploración avanzada / sin normas LATAM definitivas hasta validación local.

### 9.2 Tabla comparativa: PGI vs. O*NET IP SF vs. SDS vs. Strong Interest Inventory

| Dimensión | **PGI / PGI-S** | **O*NET IP SF** | **SDS Holland** | **Strong Interest Inventory** |
|---|---|---|---|---|
| Modelo teórico | Esférico Tracey-Rounds (8 octantes + prestigio + autoeficacia) | RIASEC hexagonal Holland | RIASEC hexagonal Holland | RIASEC + 30 BIS + 244 OS + 5 PSS |
| Ítems | 108 + 113 (PGI) / ~40 (PGI-S) | 60 (SF) / 180 (long) | 228 | 291 |
| Tiempo | 25-35 min / 10-15 min | ~10 min | 25-30 min | 35-40 min |
| Output | 18 esféricas + 6 RIASEC + 2 bipolar + prestigio + autoeficacia | 6 RIASEC | 6 RIASEC + 3-letter code | 6 GOT + 30 BIS + 244 OS + 5 PSS |
| Autoeficacia/competencia integrada | **Sí** | No | No (parcial; el SDS tiene escalas de actividades, competencias y ocupaciones pero menos psicométricas) | No (separada en SCI) |
| Prestigio explícito | **Sí** | No | No | Implícito en OS |
| Crosswalk ocupacional | Limitado (~16 Career Clusters OVAE) | **Masivo (~1 000 ocupaciones O*NET)** | Holland Occupations Finder (~500) | 244 ocupaciones empíricamente normadas |
| Normas | Solo EE. UU., universitarios | EE. UU. adultos diversos, dominio público | EE. UU., propietarias | EE. UU., comerciales |
| Validación en español | **Ninguna** | Disponible (versión oficial DOL) | Versión hispana TEA Ediciones (propietaria) | Versión hispana The Myers-Briggs Co. (propietaria) |
| Licencia | CC-BY-SA 4.0 (libre, ShareAlike) | Dominio público EE. UU. | Propietaria PAR | Propietaria CPP/MBC |
| Costo | USD 0 + costo adaptación | USD 0 | USD ~15-30 / aplicación | USD ~13-20 / aplicación |
| Ajuste estructural | Octante > hexágono en RTHOR | Hexágono adecuado, ajuste medio | Hexágono adecuado | Hexágono adecuado |
| Apto para freemium B2C LATAM masivo | Condicional (requiere adaptación) | **Recomendado (Track A)** | No (costo + propietaria) | No (costo prohibitivo) |

### 9.3 Veredicto sobre la hipótesis del proyecto: ¿PGI aporta varianza única sobre O*NET IP SF?

**Inferencia central:** El PGI aporta **varianza única real pero marginalmente accionable** para un B2C masivo no clínico:

1. **Dimensiones bipolares People-Things y Data-Ideas explícitas:** O*NET no expone estas dimensiones directamente al usuario; el PGI las computa como output narrativo. **Valor único: medio-alto** para narrativa de autoconocimiento ("trabajas mejor con personas o con objetos"); **valor incremental sobre RIASEC: bajo** porque RIASEC ya está estructurado sobre esas mismas dimensiones latentes.
2. **Octantes que desdoblan Realistic en Mechanical + Nature/Outdoors y Conventional en Business Detail + Data Processing:** **Valor único: medio**. Para usuarios con perfil R o C dominante, el PGI ofrece resolución que O*NET diluye. Para el 70-80 % de usuarios con perfiles intermedios, la diferencia es invisible.
3. **Tercera dimensión de prestigio ortogonal:** **Valor único: alto teóricamente, medio operativamente**. Diferencia entre cirujano y técnico de enfermería que O*NET colapsa. Útil para narrativa de "ambición" / "techo profesional". Riesgo ético: puede reforzar segregación socioeconómica si no se enmarca como preferencia y no como valor.
4. **Autoeficacia/competencia percibida integrada:** **Valor único: muy alto**. Liking-competence delta no se obtiene de O*NET. Es la huella diagnóstica más distintiva del PGI y la base más sólida para un módulo Paid premium.

**Veredicto operativo:**

- **Para Free MVP1:** mantener O*NET IP SF como instrumento único de intereses. La complejidad adicional del PGI no se justifica para conversión inicial.
- **Para Paid v1.5+ opt-in:** PGI-Short es candidato razonable como "módulo de profundización vocacional" en tier premium, pero solo si DescubreMe está dispuesto a financiar la adaptación colombiana y aceptar que el banco será público bajo ShareAlike.
- **Plan B:** si el moat de banco propio es crítico, descartar PGI y considerar construir un módulo propietario de autoeficacia + dimensiones bipolares inspirado teóricamente en el modelo Tracey pero con ítems originales (riesgo de validez no probada hasta validación interna).

### 9.4 Complementariedad triangular en el stack DescubreMe

**Inferencia:** El triángulo de mapeo persona-trabajo de DescubreMe se compone de:

- BFI-2-S → cómo soy (rasgos disposicionales).
- PVQ-RR → qué priorizo (valores normativos).
- O*NET IP SF → qué me interesa (intereses RIASEC) ± PGI-Short (octantes + prestigio + autoeficacia, opcional Paid premium).

El PGI no rompe el triángulo, lo refina en el vértice de intereses. Su inclusión es aditiva, no sustitutiva.

---

## SECCIÓN 10 — RED FLAGS ÉTICOS Y SESGOS

### 10.1 Determinismo vocacional

**Inferencia:** Todos los inventarios de intereses arrastran riesgo de ser interpretados como "destino" por usuarios legos. Mitigación obligatoria: lenguaje en el reporte que enfatice exploración, no prescripción ("perfiles compatibles" en lugar de "tu carrera ideal es..."). Disclaimer pre-test y post-test.

### 10.2 Sesgos culturales en títulos ocupacionales

**Hecho:** Los ítems del PGI contienen ocupaciones del mercado laboral estadounidense (ej. actuary, paralegal, millwright) sin equivalente directo en Colombia o culturalmente sub-representadas. Consecuencia: posible desinflación sistemática de ciertos perfiles. **Mitigación:** adaptación cultural con pilotaje cognitivo (Sección 5.2).

### 10.3 Sesgos de género en la dimensión People-Things

**Hecho:** Su, Rounds y Armstrong (2009, *Psychological Bulletin*, DOI: 10.1037/a0017364) demostraron meta-analíticamente que People-Things es la dimensión con mayor diferencia por género (d ≈ 0.93) en intereses vocacionales — hombres más Things, mujeres más People. **Riesgo:** con normas mixtas, los perfiles femeninos sistemáticamente quedan reducidos en escalas Mechanical/Nature, reproduciendo segregación ocupacional. **Mitigación:** normas separadas por género (como hace Tracey, 2002), notificando al usuario que los perfiles se contrastan dentro de su grupo de género. Decisión ética debatible — alternativa: normas mixtas con narrativa explícita de "tendencia poblacional" para no naturalizar el sesgo.

### 10.4 Sesgo de prestigio y desigualdad estructural

**Inferencia:** La dimensión de prestigio puede consolidar aspiraciones diferenciadas por estrato socioeconómico — usuarios de menor estrato podrían ser empujados sistemáticamente al hemisferio sur. **Mitigación:** presentar el prestigio como una preferencia, no como una jerarquía de valor; explícitamente reconocer que ocupaciones de "bajo prestigio sociológico" pueden tener alto valor económico, comunitario y de calidad de vida en contextos LATAM (ej. comercio independiente, agricultura tecnificada, oficios técnicos especializados).

### 10.5 No clínico, no diagnóstico, no selección

**Hecho:** El PGI no evalúa salud mental, personalidad clínica ni capacidad cognitiva; no es test de aptitud, es de intereses. Debe acompañarse de disclaimer claro y de bloqueo técnico de exportación masiva de perfiles bajo términos y condiciones.

### 10.6 Limitaciones predictivas para outcomes laborales

**Hecho:** Šverko y Babarović (2016) mostraron <1 % de varianza compartida con satisfacción/GPA en muestra croata. Nye et al. (2017) reportan r ≈ .14-.22 entre congruencia y desempeño. **Implicación:** evitar promesas predictivas en el copy de marketing ("descubre tu carrera ideal"); reformular como exploración ("explora tus inclinaciones vocacionales").

---

## SECCIÓN 11 — LIMITACIONES Y CONTEXTO DE USO

- **Rango de edad recomendado:** 14+ según manual ZPID; el grueso de las muestras de validación se concentra entre 14-30 años. Para adultos colombianos de 30-55 años (segmento clave de DescubreMe), las normas estadounidenses universitarias son cuestionables. Recomendación: aplicar a adultos 18-60 con disclaimer de normas provisionales.
- **Vigencia de normas:** las normas datan de cohortes universitarias estadounidenses de finales de los 90 / 2000s; el mercado laboral ha cambiado sustancialmente (gig economy, creator economy, IA generativa, prompt engineering, especialistas en sostenibilidad). El PGI no captura ocupaciones digitales emergentes adecuadamente.
- **Limitaciones cross-culturales:** el modelo esférico replica bien en EE. UU., Alemania, Croacia, China, pero no de forma uniforme en Caribe (Wilkins et al., 2013) y muestra acomodaciones en Vietnam (Rose et al., 2022). Sin datos colombianos, la generalización es especulativa.
- **No clínico:** confirmado, no apto para tamizaje psicopatológico ni para selección de personal con efecto jurídico.
- **No predice desempeño laboral directamente:** correlaciones modestas con outcomes (r ≈ .14-.22).
- **Validez para uso B2C masivo:** sujeta a UX cuidadosa; el modelo octante + prestigio + autoeficacia puede saturar al usuario lego si no se descompone narrativamente.

---

## SECCIÓN 12 — RECOMENDACIÓN DE USO EN DESCUBREME

### 12.1 Veredicto final

**Opinión profesional — RECOMENDACIÓN: NO INCLUIR EN MVP1 / NO TRACK A.** Mantener O*NET IP SF en español como instrumento principal de intereses del stack v2.0.

**Para v1.5 (Q1 2027) y v2.0+: CONDICIONAL — Plan B premium o módulo de profundización opt-in**, sujeta a tres condiciones:

1. **Decisión estratégica de negocio:** confirmar si DescubreMe puede asumir el costo de adaptación al ES-CO (USD 25 000-60 000 + 9-15 meses) y aceptar que el banco resultante sea público bajo ShareAlike.
2. **Posicionamiento UX:** definir si el PGI-Short se ofrece como tier Paid premium con valor narrativo claro (liking-competence delta, dimensiones bipolares, prestigio) o como módulo gratuito complementario con disclaimer de versión beta.
3. **Validación local mínima:** completar al menos un pilotaje cognitivo y un estudio de validación con N ≥ 500 antes de exponer el instrumento como producto definitivo.

### 12.2 Configuración Free vs Paid v1.5+

| Tier | Instrumento de intereses | Justificación |
|---|---|---|
| **Free v1.5** | O*NET IP SF 60 ítems | Suficiente para mapeo RIASEC, crosswalk ocupacional masivo, sin costo, sin compromiso de adaptación |
| **Paid v1.5 (default)** | O*NET IP SF + insights extendidos | Mismo instrumento que Free, con análisis adicionales y mapeo PVQ-RR + BFI-2-S |
| **Paid v1.5 (premium opcional, condicional)** | PGI-Short ES-CO (si se decide adaptar) | Para usuarios que quieran profundización vocacional con liking-competence delta, dimensiones bipolares y prestigio. Disclaimer obligatorio de normas en desarrollo |

### 12.3 Decisión explícita sobre destino del PGI

**Decisión recomendada:** **DESCARTAR del MVP1 como instrumento principal. EVALUAR para v1.5+ como módulo Paid premium opt-in, condicional a financiación de adaptación ES-CO y a aceptación de ShareAlike.**

**Alternativa pragmática (recomendada como default):** **No incluir el PGI en ninguna versión de DescubreMe.** Mantener O*NET IP SF como único instrumento de intereses y reinvertir el presupuesto de adaptación PGI (USD 25-60k) en: (a) baremos colombianos propios del O*NET IP SF a partir de los primeros 1 000 usuarios, (b) módulo narrativo propio de "preferencia × competencia" inspirado teóricamente en Tracey pero con ítems originales aplicados al perfil RIASEC del O*NET (riesgo: validez no probada hasta validación interna). Esta ruta protege el moat de banco propio sin renunciar a la riqueza informativa del concepto liking-competence.

### 12.4 Plan B y reversibilidad

**Opinión profesional:** la no-inclusión del PGI es **completamente reversible** porque:

- No hay dependencia técnica histórica (no está en el stack v2.0).
- La licencia CC-BY-SA 4.0 no caduca; el instrumento estará disponible cuando se decida adoptarlo.
- El conocimiento teórico del modelo esférico puede informar el diseño del módulo propietario de DescubreMe sin necesidad de usar el banco PGI literal.

---

## SECCIÓN 13 — PSEUDOCÓDIGO CONCEPTUAL DE SCORING

```
ENTRADA:
  respuestas_preferencia[1..40]    // PGI-S Likert 1..7
  respuestas_competencia[1..40]    // PGI-S Likert 1..7
  mapa_item_a_escala[1..40]        // 4 ítems por cada una de 10 escalas
                                   // (8 octantes + AltoPrestigio + BajoPrestigio)

PASO 1 — Promedios por escala:
  para cada escala s en {SF, Mng, BD, DP, Mch, NO, Art, Hlp, HP, LP}:
    items_s = ítems mapeados a s
    preferencia[s]  = media(respuestas_preferencia[items_s])
    competencia[s]  = media(respuestas_competencia[items_s])

PASO 2 — Dimensiones bipolares (centroide angular sobre los 8 octantes):
  // Ángulos teóricos en radianes
  theta = {SF: 0,        Mng: pi/4,      BD: pi/2,        DP: 3*pi/4,
           Mch: pi,      NO: 5*pi/4,     Art: 3*pi/2,     Hlp: 7*pi/4}

  people_things = (1/8) * sum_{i in octantes}(preferencia[i] * cos(theta[i]))
  data_ideas    = (1/8) * sum_{i in octantes}(preferencia[i] * sin(theta[i]))

PASO 3 — Prestigio neto:
  prestigio_neto = preferencia[HP] - preferencia[LP]

PASO 4 — Composiciones RIASEC (ángulos teóricos):
  theta_RIASEC = {R: pi, I: 5*pi/4, A: 3*pi/2, S: 0, E: pi/4, C: pi/2}
  para cada letra L en {R,I,A,S,E,C}:
    sumW = 0; sumWS = 0
    para cada octante i:
      w = (1 + cos(theta[i] - theta_RIASEC[L])) / 2   // peso angular
      sumW += w
      sumWS += w * preferencia[i]
    RIASEC[L] = sumWS / sumW

PASO 5 — Liking-competence delta (huella distintiva del PGI):
  para cada escala s:
    delta[s] = preferencia[s] - competencia[s]
  flags_delta = { s : |delta[s]| >= 1.5 }

PASO 6 — Vector resumen (ángulo + magnitud):
  // Sobre ecuador octante
  angle  = atan2(data_ideas, people_things)   // dirección dominante
  length = sqrt(people_things^2 + data_ideas^2)  // diferenciación
  // length pequeño => perfil indiferenciado / ambivalente

PASO 7 — Conversión a percentiles vía baremo:
  para cada salida X (escalas, dimensiones, RIASEC):
    percentil[X] = lookup_baremo(X, baremo_referencia, sexo, edad)
  banda = {≤16: bajo, 17-84: medio, ≥84: alto}

PASO 8 — Validaciones de calidad:
  flag_aquiescencia = media_individual >= 6.0 OR media_individual <= 2.0
  flag_patron_unico = >= 60% items con misma respuesta en una escala
  flag_tiempo_atipico = tiempo_total < 4 minutos (PGI-S)
  flag_pares_incoherentes = >= 30% pares con |delta| >= 4

  si cualquier flag bloqueante: NO mostrar perfil, mostrar mensaje "respuesta atípica"

SALIDAS:
  preferencia[10], competencia[10]
  people_things, data_ideas, prestigio_neto
  RIASEC[6]
  angle, length
  delta[10], flags_delta
  percentiles, bandas
  flags_calidad
  metadatos: version_instrumento, version_traduccion, timestamp, tiempo_total
```

**Notas de implementación:**
(a) Los ángulos teóricos idealizados pueden reemplazarse por coordenadas empíricas reportadas por Tracey (2002) en muestras ASU; (b) las normas (T-scores) requieren transformación contra muestra de referencia — no existe baremo colombiano al cierre, usar Tracey (2010) como provisional con disclaimer; (c) versionar el scoring engine permite reconstruir cualquier perfil histórico si cambia la lógica de pesos angulares.

---

## SECCIÓN 14 — GAPS DE INVESTIGACIÓN Y PREGUNTAS ABIERTAS

1. **Gap 1 — Validación en español hispanoamericano.** No existe ningún estudio peer-reviewed de adaptación y validación del PGI o PGI-Short en países hispanohablantes. Para DescubreMe esto es simultáneamente barrera (no se pueden usar normas establecidas) y oportunidad (publicar la primera validación colombiana posicionaría a DescubreMe como referente científico regional). Sub-gap: ausencia de evidencia de invarianza de medida entre español de España y español de LATAM, y entre regiones de Colombia.

2. **Gap 2 — Adultos trabajadores fuera del sistema universitario.** Las muestras de validación dominantes son universitarias (14-30 años); existen pocos datos sobre adultos en transición laboral, reinserción o cambio de carrera medio (35-55 años). Para DescubreMe, cuyo segmento incluye profesionales en re-skilling, esta laguna es crítica.

3. **Gap 3 — Vigencia del banco de ítems frente a ocupaciones emergentes.** El banco PGI fue construido sobre el mercado laboral pre-2002. Ocupaciones digitales, creator economy, prompt engineers, especialistas en sostenibilidad, etc., no están adecuadamente representadas. Investigar si las nuevas ocupaciones se distribuyen consistentemente en el modelo octante o si requieren una novena/décima escala es proyecto abierto.

4. **Gap 4 — Convergencia empírica con O*NET IP SF en español.** Si DescubreMe adopta ambos instrumentos, convendría producir evidencia local de convergencia/divergencia entre las puntuaciones RIASEC derivadas del PGI-Short y las del O*NET IP SF en muestra colombiana. Esto añadiría valor académico y permitiría defender la decisión de mantener uno u otro como instrumento principal.

5. **Gap 5 — Estabilidad de la dimensión de prestigio en contextos LATAM.** Wilkins et al. (2013) mostraron que la estructura esférica completa (con prestigio) no replicó en Caribe; Rose et al. (2022) mostraron acomodaciones en Vietnam. No hay datos colombianos. Sub-gap: ¿el prestigio en Colombia se organiza igual que en EE. UU. o tiene topología diferente influenciada por estructura de clases y mercado laboral local?

6. **Gap 6 — Funcionamiento diferencial por estrato socioeconómico.** Riesgo ético no estudiado: ¿usuarios de estratos bajos sistemáticamente quedan empujados al hemisferio sur por sesgo de exposición ocupacional, no por preferencia real? Estudio diferido a fase de validación colombiana.

---

## SECCIÓN 15 — REFERENCIAS (APA 7)

### 15.1 Fuente original Tracey y obra del autor

- Tracey, T. J. G. (1997). The structure of interests and self-efficacy expectations: An expanded examination of the spherical model of interests. *Journal of Counseling Psychology, 44*(1), 32-43. https://doi.org/10.1037/0022-0167.44.1.32
- Tracey, T. J. G. (2002). Personal Globe Inventory: Measurement of the spherical model of interests and competence beliefs [Monograph]. *Journal of Vocational Behavior, 60*(1), 113-172. https://doi.org/10.1006/jvbe.2001.1817
- Tracey, T. J. G. (2010). Development of an abbreviated Personal Globe Inventory using item response theory: The PGI-Short. *Journal of Vocational Behavior, 76*(1), 1-15. https://doi.org/10.1016/j.jvb.2009.06.007
- Tracey, T. J. G. (2021). *PGI. Personal Globe Inventory* [Test description, manual, questionnaires PGI-Activities, PGI-Occupations, PGI-Short, PGI-Mini, scoring, and case examples]. In Leibniz Institute for Psychology (ZPID) (Ed.), *Open Test Archive*. ZPID. https://doi.org/10.23668/psycharchives.4545
- Tracey, T. J. G., & Rounds, J. (1995). The arbitrary nature of Holland's RIASEC types: A concentric-circles structure. *Journal of Counseling Psychology, 42*(4), 431-439. https://doi.org/10.1037/0022-0167.42.4.431
- Tracey, T. J. G., & Rounds, J. (1996). The spherical representation of vocational interests. *Journal of Vocational Behavior, 48*(1), 3-41. https://doi.org/10.1006/jvbe.1996.0002

### 15.2 Validaciones y desarrollo del modelo Tracey-Rounds

- Etzel, J. M., & Nagy, G. (2019). Evaluation of the dimensions of the spherical model of vocational interests in the long and short version of the Personal Globe Inventory. *Journal of Vocational Behavior, 112*, 1-16. https://doi.org/10.1016/j.jvb.2019.01.003
- Etzel, J. M., Nagy, G., & Tracey, T. J. G. (2016). The spherical model of vocational interests in Germany. *Journal of Career Assessment, 24*(4), 701-717. https://doi.org/10.1177/1069072715616122
- Rounds, J., & Tracey, T. J. (1993). Prediger's dimensional representation of Holland's RIASEC circumplex. *Journal of Applied Psychology, 78*(6), 875-890. https://doi.org/10.1037/0021-9010.78.6.875
- Sodano, S. M., & Tracey, T. J. G. (2008). Prestige in interest activity assessment. *Journal of Vocational Behavior, 73*(2), 310-317. https://doi.org/10.1016/j.jvb.2008.07.002
- Tay, L., Su, R., & Rounds, J. (2011). People-things and data-ideas: Bipolar dimensions? *Journal of Counseling Psychology, 58*(3), 424-440. https://doi.org/10.1037/a0023488

### 15.3 Adaptaciones culturales

- Darcy, M. U. A. (2005). Examination of the structure of Irish students' vocational interests and competence perceptions. *Journal of Vocational Behavior, 67*(2), 321-333. https://doi.org/10.1016/j.jvb.2004.08.005
- Hedrih, V. (2008). Structure of vocational interests in Serbia: Evaluation of the spherical model. *Journal of Vocational Behavior, 73*(1), 13-23. https://doi.org/10.1016/j.jvb.2008.01.003
- Holtrop, D., Born, M. Ph., & de Vries, R. E. (2018). Perceptions of vocational interest: Self- and other-reports in student-parent dyads. *Journal of Career Assessment, 26*(4), 643-664. https://doi.org/10.1177/1069072717692745
- Long, L., Adams, R. S., & Tracey, T. J. G. (2005). Generalizability of interest structure to China: Application of the Personal Globe Inventory. *Journal of Vocational Behavior, 66*(1), 66-80. https://doi.org/10.1016/j.jvb.2003.12.003
- Morais, M., Silva, J. M. T., Paixão, M. P., & Tracey, T. J. G. (2024). Modelling vocational interests: Application of the Personal Globe Inventory in Portugal. *International Journal for Educational and Vocational Guidance*. Advance online publication. https://doi.org/10.1007/s10775-024-09687-2
- Rose, P., Nguyen, N. P., Kim, J. K., & Nguyen, D. T. N. (2022). The Personal Globe Inventory: The structure of vocational interest in Vietnam. *Journal of Employment Counseling, 59*(1), 27-36. https://doi.org/10.1002/joec.12176
- Šverko, I. (2008). Spherical model of interests in Croatia. *Journal of Vocational Behavior, 72*(1), 14-24. https://doi.org/10.1016/j.jvb.2007.10.001
- Šverko, I., & Babarović, T. (2016). Integrating personality and career adaptability into vocational interest space. *Journal of Vocational Behavior, 94*, 89-103. https://doi.org/10.1016/j.jvb.2016.02.017
- Vardarlı, B., Özyürek, R., Wilkins-Yel, K. G., & Tracey, T. J. G. (2017). Examining the structure of vocational interests in Turkey in the context of the personal globe model. *International Journal for Educational and Vocational Guidance, 17*(3), 347-359. https://doi.org/10.1007/s10775-016-9338-6
- Wilkins, K. G., Ramkissoon, M., & Tracey, T. J. G. (2013). Structure of interest in a Caribbean sample: Application of the Personal Globe Inventory. *Journal of Vocational Behavior, 83*(3), 367-372. https://doi.org/10.1016/j.jvb.2013.06.005
- Zhang, Y., Kube, E., Wang, Y., & Tracey, T. J. G. (2013). Vocational interests in China: An evaluation of the Personal Globe Inventory-Short. *Journal of Vocational Behavior, 83*(1), 99-105. https://doi.org/10.1016/j.jvb.2013.03.009

### 15.4 Holland RIASEC, SII y modelos relacionados

- Donnay, D. A. C., Morris, M. L., Schaubhut, N. A., & Thompson, R. C. (2005). *Strong Interest Inventory manual: Research, development, and strategies for interpretation*. CPP, Inc.
- Holland, J. L. (1997). *Making vocational choices: A theory of vocational personalities and work environments* (3rd ed.). Psychological Assessment Resources.
- Nye, C. D., Su, R., Rounds, J., & Drasgow, F. (2017). Interest congruence and performance: Revisiting recent meta-analytic findings. *Journal of Vocational Behavior, 98*, 138-151. https://doi.org/10.1016/j.jvb.2016.10.002
- Prediger, D. J. (1982). Dimensions underlying Holland's hexagon: Missing link between interests and occupations? *Journal of Vocational Behavior, 21*(3), 259-287. https://doi.org/10.1016/0001-8791(82)90036-7
- Su, R., Rounds, J., & Armstrong, P. I. (2009). Men and things, women and people: A meta-analysis of sex differences in interests. *Psychological Bulletin, 135*(6), 859-884. https://doi.org/10.1037/a0017364

### 15.5 Licencia, fuentes institucionales y O*NET

- Creative Commons. (2013). *Attribution-ShareAlike 4.0 International (CC BY-SA 4.0) legal code*. https://creativecommons.org/licenses/by-sa/4.0/legalcode
- Hubert, L., & Arabie, P. (1987). Evaluating order hypotheses within proximity matrices. *Psychological Bulletin, 102*(1), 172-178. https://doi.org/10.1037/0033-2909.102.1.172
- International Test Commission. (2018). *ITC Guidelines for translating and adapting tests* (2nd ed.). https://www.intestcom.org/page/16
- Leibniz Institute for Psychology (ZPID). (2021). *Open Test Archive: PGI – Personal Globe Inventory*. https://www.testarchiv.eu/en/test/9000001
- Roemer, L., Lewis, P., & Rounds, J. (2023). The German O*NET Interest Profiler Short Form. *Psychological Test Adaptation and Development, 4*(1), 156-167. https://doi.org/10.1027/2698-1866/a000048
- Rounds, J., Su, R., Lewis, P., & Rivkin, D. (2010). *O*NET® Interest Profiler Short Form psychometric characteristics: Summary*. National Center for O*NET Development. https://www.onetcenter.org/dl_files/IPSF_Psychometric.pdf

### 15.6 Adaptaciones LATAM relacionadas (no PGI estricto)

- Cupani, M., Pérez, E. R., Morán, V. E., Castro Solano, A., & Tracey, T. J. G. (2019). Alternate Forms Public Domain RIASEC Markers for interests and self-efficacy: Spanish version. *Evaluar, 19*(2), 25-43. https://doi.org/10.35670/1667-4545.v19.n2.25116

### 15.7 Estándares y compliance

- Congreso de la República de Colombia. (2012). *Ley 1581 de 2012 — Por la cual se dictan disposiciones generales para la protección de datos personales*.

---

## CAVEATS FINALES

- **Adaptación colombiana inexistente:** todas las propuestas de baremos provisionales se apoyan en Tracey (2010, EE. UU.) hasta acumular N ≥ 500 usuarios colombianos. Sin pilotaje cognitivo previo, el riesgo de mala comprensión de ítems es real.
- **Licencia CC-BY-SA 4.0 con consecuencia estratégica:** cualquier adaptación al ES-CO queda inmediatamente pública. Si DescubreMe quiere moat de banco propio, debe descartar PGI y construir módulo propietario inspirado teóricamente.
- **Sitio del autor mencionado en el brief:** el URL https://wendymtracey.faculty.arizona.edu indicado en la tarea no aparece como sitio oficial del PGI al cierre de mayo de 2026; el repositorio canónico web del autor es https://pgi.asu.edu y la fuente legal autoritativa es el depósito ZPID 2021. **[Sin fuente verificada]** para el URL del brief.
- **Datos predictivos modestos:** la congruencia P-E predice <1 % de varianza en satisfacción/GPA (Šverko & Babarović, 2016); evitar promesas predictivas en el copy de marketing del producto.
- **Trazabilidad de divergencia entre dossiers fuente:** este consolidado sintetiza Claude y Gemini; en datos psicométricos críticos (α dominios, replicación octante) ambos coinciden con valores cercanos. Datos únicos: la consolidación de α internacional .71-.92 (Etzel & Nagy, 2019) proviene de Claude; el detalle del estudio Šverko-Babarović sobre congruencia <1 % varianza y el contexto histórico Tracey-Rounds-Prediger más profundo proviene de Gemini. La descripción de adaptaciones AFPD-RIASEC argentinas con N = 1 107 (Cupani et al., 2019) proviene de Gemini y se conservó como contexto cercano, no como adaptación del PGI propiamente.

---

*Cierre del dossier consolidado v2.1 — Listo para revisión estratégica antes de v1.5 Q1 2027.*
