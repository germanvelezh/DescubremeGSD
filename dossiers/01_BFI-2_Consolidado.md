# Dossier de Investigación Profunda v2.1 — Big Five Inventory-2 (BFI-2 / BFI-2-S)

**Proyecto:** DescubreMe — plataforma freemium B2C de autoconocimiento profundo (LATAM, foco Colombia, no clínico, no selección de personal)
**Decisión que respalda:** Migración M1 (Mini-IPIP 20 → BFI-2-S 30) en Free + Paid v1.5 (Q1 2027)
**Fecha de cierre:** 9 de mayo de 2026
**Versión consolidada:** síntesis unificada de dossiers Claude y Gemini, datos divergentes verificados contra fuente primaria.

---

## SECCIÓN 0 — PORTADA Y RESUMEN EJECUTIVO

**Instrumento:** Big Five Inventory-2 (BFI-2) y Big Five Inventory-2 Short (BFI-2-S).
**Autores:** Soto, C. J. y John, O. P.
**Año original:** 2017 (publicaciones gemelas en *Journal of Personality and Social Psychology* y *Journal of Research in Personality*).
**Idioma original:** inglés.
**Versiones disponibles:** BFI-2 60 ítems (forma completa), BFI-2-S 30 ítems (forma corta), BFI-2-XS 15 ítems (forma extra corta, solo dominios).
**Adaptación oficial al español:** Gallardo-Pujol et al. (2022, *Psychological Test Adaptation and Development*, 3(1), 44-69, DOI: 10.1027/2698-1866/a000020).

**Resumen ejecutivo (3-5 líneas).** El BFI-2 es un instrumento jerárquico de 60 ítems que mide los cinco dominios canónicos del Big Five y 15 facetas (3 por dominio), con consistencia interna media α ≈ .85-.87 a nivel de dominio y α ≈ .74-.76 a nivel de faceta. La forma corta BFI-2-S (30 ítems) captura aproximadamente el 91 % de la varianza de los dominios completos, con α de dominio en .73-.83. Existe versión oficial en español (Gallardo-Pujol et al., 2022) recolectada en España (N total = 1.673), con propiedades equivalentes al original excepto invarianza solo métrica entre sexos (no escalar) y ajuste reducido en Amabilidad (CFI = .83, RMSEA = .09). No existe validación peer-reviewed específica para Colombia, aunque sí hay aplicaciones publicadas (Universidad del Rosario, Nariño-Carchi).

**Recomendación ejecutiva.** **CONDICIONAL — INCLUIR** (confirmar migración M1 Mini-IPIP → BFI-2-S en Free + Paid v1.5), sujeta a tres pre-condiciones bloqueantes: (1) obtención de licencia comercial expresa por escrito de Soto y John, (2) adopción de la traducción Gallardo-Pujol et al. (2022) con piloto cognitivo en Colombia (n ≥ 30) antes del lanzamiento, (3) implementación de mitigaciones éticas para ítems sensibles de Emotividad Negativa.

---

## SECCIÓN 1 — CONSTRUCTO MEDIDO

### 1.1 El modelo Big Five y su estructura jerárquica

**Hecho:** El modelo Big Five organiza la personalidad disposicional en cinco dominios amplios — Extraversión, Amabilidad, Responsabilidad (Conscientiousness), Emotividad Negativa (Neuroticismo) y Apertura Mental (Open-Mindedness) — soportados por décadas de evidencia léxica y factorial (Goldberg, 1993; John, Naumann y Soto, 2008; McCrae y Costa, 2008). Soto y John (2017a) propusieron una estructura jerárquica donde cada dominio se descompone en tres facetas (15 facetas en total), seleccionadas por dos criterios: una faceta "factor-pura" central al dominio y dos facetas complementarias documentadas en la literatura.

| Dominio | Facetas anidadas | Relevancia predictiva |
|---|---|---|
| Extraversión | Sociabilidad, Asertividad, Nivel de Energía | Bienestar subjetivo, éxito en roles interactivos |
| Amabilidad | Compasión, Respeto, Confianza | Calidad de relaciones, clima laboral |
| Responsabilidad | Organización, Productividad, Responsabilidad | Predictor más robusto de desempeño académico/ocupacional |
| Emotividad Negativa | Ansiedad, Depresión, Volatilidad Emocional | Riesgo de burnout, salud mental |
| Apertura Mental | Curiosidad Intelectual, Sensibilidad Estética, Imaginación Creativa | Innovación, adaptabilidad |

### 1.2 Resolución del trade-off bandwidth-fidelity

**Inferencia:** El diseño jerárquico aborda directamente el clásico trade-off entre amplitud y fidelidad (Cronbach y Gleser, 1957; Soto y John, 2017a): los dominios amplios predicen un rango extenso de criterios pero con menor precisión, mientras que las facetas estrechas predicen criterios específicos con alta precisión pero menor generalización. La arquitectura del BFI-2 permite que el analista module la resolución según el criterio externo de interés.

### 1.3 Cambio terminológico: "Neuroticismo" → "Emotividad Negativa"

**Hecho:** Soto y John (2017a) reemplazaron deliberadamente el término histórico "Neuroticism" por "Negative Emotionality". La razón documentada es que "neurótico" arrastra una connotación clínica y patologizante en el lenguaje cotidiano que genera reactancia en contextos no clínicos (selección, autoconocimiento, encuesta), mientras que "Emotividad Negativa" anclar adecuadamente el rasgo como una variación normativa en la reactividad emocional. **Implicación para DescubreMe:** mantener este término en español ("Emotividad Negativa" o "Emocionalidad Negativa") y evitar sistemáticamente "Neuroticismo" en copy de cara al usuario.

### 1.4 Relación con instrumentos cercanos

**Hecho:** En las muestras de validación de Soto y John (2017a), las correlaciones monorasgo-heterométodo del BFI-2 promediaron r = .92 con el BFI original, r = .82 con los Big Five Aspect Scales (BFAS), r = .80 con los Mini-Markers de Saucier, r = .75 con el NEO-FFI y r = .72 con el NEO-PI-R (texto literal). El BFI-2 mantiene continuidad teórica con el BFI original (John y Srivastava, 1999) pero introduce: (a) jerarquía explícita dominio-faceta, (b) balance de claves directas e inversas para controlar aquiescencia, y (c) ítems en formato frase corta más interpretables que adjetivos sueltos.

- **Mini-IPIP (Donnellan et al., 2006):** mide solo los 5 dominios con 4 ítems cada uno (20 total); no aporta facetas; α típicos .60-.77.
- **IPIP-NEO-120 (Johnson, 2014):** 30 facetas y 5 dominios; dominio público pero más extenso (~25-30 min).
- **HEXACO-60 (Ashton y Lee, 2009):** seis dominios incluyendo Honestidad-Humildad; no es estrictamente comparable con Big Five.

### 1.5 Relevancia para autoconocimiento y orientación

**Hecho:** Soto (2019) replicó el 87 % de las asociaciones rasgo-resultado documentadas en literatura previa usando el BFI-2 en cuatro muestras estadounidenses (resultados individuales, interpersonales e institucionales). **Inferencia:** la estructura faceta-dominio del BFI-2 es particularmente útil para mapeos ocupacionales O*NET porque permite asociaciones más finas (por ejemplo, Productividad → tareas detalladas, Sociabilidad → ocupaciones interactivas) que el Mini-IPIP, que solo opera a nivel de dominio.

---

## SECCIÓN 2 — ESTRUCTURA DEL INSTRUMENTO

### 2.1 BFI-2 (forma completa)

- **Hecho:** 60 ítems (4 por faceta × 15 facetas; 12 por dominio).
- Escala Likert de 5 puntos: *Disagree strongly* (1) a *Agree strongly* (5).
- Tiempo de aplicación: 5-7 minutos según los autores; 8-10 minutos en condiciones reales con muestras heterogéneas.
- Balance de claves: 30 ítems directos y 30 inversos; cada faceta tiene 2 directos y 2 inversos.

### 2.2 BFI-2-S (forma corta)

- **Hecho:** 30 ítems (2 por faceta × 15 facetas; 6 por dominio).
- Tiempo: 3-5 minutos.
- Balance: 1 ítem directo y 1 inverso por faceta (15 directos / 15 inversos globales).

**Mapa de codificación BFI-2-S (numeración estándar Soto-John 2017b, R = puntuación inversa):**

| Dominio | Faceta | Ítems |
|---|---|---|
| Extraversión | Sociabilidad | 1R, 16 |
| | Asertividad | 6, 21R |
| | Nivel de Energía | 11, 26R |
| Amabilidad | Compasión | 2, 17R |
| | Respeto | 7R, 22 |
| | Confianza | 12, 27R |
| Responsabilidad | Organización | 3R, 18 |
| | Productividad | 8R, 23 |
| | Responsabilidad | 13, 28R |
| Emotividad Negativa | Ansiedad | 4, 19R |
| | Depresión | 9, 24R |
| | Volatilidad Emocional | 14R, 29 |
| Apertura Mental | Curiosidad Intelectual | 10R, 25 |
| | Sensibilidad Estética | 5, 20R |
| | Imaginación Creativa | 15, 30R |

### 2.3 BFI-2-XS (forma extra corta)

**Hecho:** 15 ítems, 3 por dominio. **NO** mide facetas. Soto y John no recomiendan su uso para evaluación intra-individual; α de dominios fluctúan entre .40 y .65 (Responsabilidad y Apertura especialmente bajos). Adoptado por OCDE en PIAAC (24 idiomas, 39 versiones lingüísticas; OECD, 2024).

### 2.4 Control de aquiescencia por diseño

**Hecho:** El balance directo/inverso 30/30 a nivel global y 2/2 (BFI-2) o 1/1 (BFI-2-S) por faceta permite controlar aquiescencia mediante centrado intra-sujeto (sustraer la media de las 60 respuestas a cada ítem antes de calcular puntuaciones). Es uno de los avances arquitectónicos más relevantes frente al BFI original y al Mini-IPIP, donde el balance es imperfecto.

### 2.5 Anti-alucinación de ítems

**Hecho:** No se reproducen ítems literales del BFI-2 ni del BFI-2-S en este dossier. La descripción del banco se limita a estructura (cantidades, claves, dominios). Para acceso a los ítems, contactar al Colby Personality Lab (Soto) o al Berkeley Personality Lab (John); el documento oficial está disponible para uso de investigación previa autorización.

---

## SECCIÓN 3 — PROPIEDADES PSICOMÉTRICAS ORIGINALES

### 3.1 Muestras de validación Soto y John (2017a, 2017b)

**Hecho:** Tres muestras: Eugene-Springfield Community Sample (ESCS, N = 1.000), muestra estudiantil universitaria (N ≈ 470), y muestra de internet de adultos (N ≈ 2.000, 50 % mujeres).

### 3.2 Confiabilidad — BFI-2 60 ítems

| Dominio | α (muestra Internet) | ω comparable |
|---|---|---|
| Extraversión | .87 | ≈ .87 |
| Amabilidad | .83 | ≈ .83 |
| Responsabilidad | .88 | ≈ .88 |
| Emotividad Negativa | .91 | ≈ .91 |
| Apertura Mental | .84 | ≈ .84 |
| **Promedio dominios** | **.87** (rango .83-.91) | — |

- **Facetas BFI-2 (4 ítems c/u):** α entre .65 y .85, M ≈ .76 (Internet) y M ≈ .77 (estudiantil).

### 3.3 Confiabilidad — BFI-2-S 30 ítems

**Hecho:** α de dominio M ≈ .77-.78 (rango .73-.83 entre muestras); retest dominios .76-.83 según muestra. Las facetas (2 ítems) tienen α entre .60 y .70 con M ≈ .60-.61.

**Advertencia metodológica explícita de Soto y John (2017b):** las facetas del BFI-2-S **solo deben usarse para inferencias confiables en muestras n ≥ 400**. Para diagnóstico individual a nivel de faceta usar BFI-2 60. **Implicación para DescubreMe:** en Free MVP1 con BFI-2-S, mostrar al usuario perfiles a nivel de dominio principalmente; las facetas se pueden ilustrar pero con disclaimer interpretativo.

### 3.4 Correlaciones BFI-2-S con BFI-2 60

**Hecho:** Correlaciones parte-todo de dominio entre BFI-2-S y BFI-2 60 promedian r = .95 (rango .94-.97); el BFI-2-S captura ≈ 91 % de la varianza de los dominios completos. Acuerdo self-peer cae solo de r = .55 a r = .53 (93 % de la validez convergente cruzada original).

### 3.5 Validez factorial (CFA)

**Hecho:** Soto y John (2017a) reportan ajustes adecuados para el modelo de 5 dominios con 15 facetas anidadas más un factor método de aquiescencia. Cuando se modela explícitamente el factor de aquiescencia, los índices de bondad de ajuste alcanzan CFI/TLI > .90 y RMSEA < .08 en las muestras originales. Las cargas factoriales de cada faceta sobre su dominio teórico son las más altas en todos los casos.

### 3.6 Validez convergente

**Hecho — texto literal Soto y John (2017a):** *"the BFI-2's monotrait-heteromethod convergent correlations averaged .92 with the original BFI, .82 with the BFAS, .80 with the Mini-Markers, .75 with the NEO-FFI, and .72 with the NEO PI-R"*. Acuerdo self-peer promedió r = .56 a nivel dominio (rango .42-.69) y r = .49 a nivel faceta (rango .27-.73).

### 3.7 Invarianza de medida

**Hecho:** En la muestra original estadounidense no se publicó invarianza por sexo. Estudios posteriores establecieron:
- Versión rusa (Shchebetenko et al., 2020): invarianza estricta entre sexos y entre grupos de edad.
- Versión española (Gallardo-Pujol et al., 2022): solo invarianza métrica entre sexos (no escalar).
- Versión china (Zhang et al., 2022, N total ≈ 5.000): invarianza configural y métrica entre cuatro muestras.
- Versión norteamericana de orientación japonesa (Yoshino et al., 2022): invarianza adecuada.

**Implicación:** las comparaciones de medias entre hombres y mujeres en español (Gallardo-Pujol) requieren interpretación cautelosa.

### 3.8 Validez predictiva e IRT

**Hecho:** Soto (2019, 2021) aplicó BFI-2 al *Life Outcomes of Personality Replication Project* y replicó el 87 % de asociaciones rasgo-resultado documentadas en la literatura. **Hallazgo IRT:** estudios contemporáneos (representados en muestras adolescentes-adultas jóvenes) demuestran que las curvas de información del BFI-2 acumulan máxima precisión en los percentiles bajos y medios de la distribución latente, mientras que el PID-5 (DSM-5 AMPD) acumula precisión solo en las desviaciones superiores. El BFI-2 y el PID-5 son por tanto simbióticos: el BFI-2 mapea variación normativa, el PID-5 discrimina patología severa.

---

## SECCIÓN 4 — ADAPTACIONES CULTURALES DISPONIBLES

### 4.1 Tabla resumen de adaptaciones validadas en español

| País | Cita | N | Diseño | Resultados clave |
|---|---|---|---|---|
| **España (oficial)** | Gallardo-Pujol, Rouco, Cortijos-Bernabeu, Oceja, Soto y John (2022). *Psychological Test Adaptation and Development*, 3(1), 44-69. DOI: 10.1027/2698-1866/a000020 | 1.673 (3 estudios) | Back-translation, CFA, invarianza, retest, validación BFI-2-S y BFI-2-XS | CFI .93-.95 (.83 Amabilidad); RMSEA .06-.07 (.09 Amabilidad); SRMR ~.04; **invarianza solo métrica entre sexos** |
| **México** | Toledo-Fernández, Pérez-Matus y Villalobos-Gallegos (2022). *Suma Psicológica*, 29(2), 119-128. DOI: 10.14349/sumapsi.2022.v29.n2.4 | 2.025 (ola 1) / 610 (ola 2 con BFI-2-XS) | CFA, retest, perfiles latentes (LPA), validez nomológica con Q-LES-Q-SF | α dominios .79-.86; ajuste satisfactorio; LPA identifica 5 perfiles configuracionales |
| **PIAAC multinacional** | Rammstedt, Lechner y Soto (2024). *European Journal of Psychological Assessment*. DOI: 10.1027/1015-5759/a000844 | Cuotas representativas | Doble traducción coordinada OECD; comparación EN-FR-DE-PL-ES-JA | Comparabilidad psicométrica alta; invarianza métrica garantizada excepto Apertura en japonés |
| **Argentina (BFI breve IRT)** | Inéditos vía SciELO Colombia (2024) | 987 | IRT (Modelo de Respuesta Graduada); reducción a 20 ítems | r ≥ .73 con BFI completo; precisión decae en extremos altos del rasgo |
| **Argentina + España + Perú (BFI-15p)** | Merino-Soto, Dominguez-Lara et al. (2025). *Acta Psychologica*, 250, 104456. DOI: 10.1016/j.actpsy.2025.104456 | 737 | ESEM, invarianza | Invarianza configural-métrica-escalar; ω ~ .60 |
| **Colombia (aplicación, no validación formal)** | Universidad del Rosario, estudio "Bisturí o Estetoscopio" en residentes de medicina (n = 250) | 250 | BFI-2-S aplicado para estudiar elección de carrera (quirúrgica vs clínica) | Correlaciones documentadas con preferencia ocupacional; sin propiedades psicométricas reportadas formalmente |
| **Colombia-Ecuador (Nariño-Carchi)** | Aglala (Corporación Universitaria Rafael Núñez) | 413 (194 colombianos) | BFI aplicado al emprendimiento bajo Upper Echelons Theory | Asimetrías transfronterizas: en Colombia, Estabilidad Emocional asociada NEGATIVAMENTE con innovación (β = -0.10) |

### 4.2 Versión "oficial" en español (Colby Personality Lab)

**Hecho — texto literal del PDF oficial distribuido por Colby:**
> "No hay costes asociados al uso del BFI-2 en su versión española. Los derechos de autor de la versión original en inglés del BFI-2 son propiedad de Oliver John y Christopher Soto. En la práctica científica, el BFI-2 se considera 'código abierto' (open source)."

**Importante:** "código abierto" en este contexto se refiere a uso académico/investigación, no a uso comercial sin permiso (ver Sección 6).

### 4.3 Estudios trans-culturales con el BFI-2

**Hecho:** Rammstedt et al. (2024) compararon coordinadamente las versiones francesa, alemana, polaca, española y japonesa del BFI-2 (más el original inglés) y establecieron al menos invarianza métrica con la versión estadounidense en todos los dominios excepto Apertura Mental en japonés. El International Situations Project (Baranski, Funder, Gardiner et al., 2020) cuenta con traducciones preliminares del BFI-2 a más de 30 idiomas y ha generado análisis trans-culturales de gran escala.

---

## SECCIÓN 5 — ADAPTACIÓN AL ESPAÑOL DE COLOMBIA (ANÁLISIS ESPECÍFICO)

### 5.1 Estado del arte

**Hecho:** Búsquedas en Google Scholar, Redalyc, SciELO, Acta Colombiana de Psicología y Diversitas (Universidad Santo Tomás) **no arrojaron una validación peer-reviewed específica del BFI-2 en Colombia** al 9 de mayo de 2026. Existen aplicaciones publicadas en Colombia (Universidad del Rosario, Nariño-Carchi) pero usan adaptaciones no calibradas formalmente para Colombia. Existen validaciones colombianas del BFI original 44 ítems y del BFQ (Caprara) en muestras locales, pero no del BFI-2.

### 5.2 Riesgos del uso directo de la versión Gallardo-Pujol et al. (España) en Colombia

**Inferencia:** Las diferencias léxico-semánticas entre el español peninsular y el español colombiano son moderadas pero no triviales para ítems de personalidad. Riesgos identificados:

1. **Vocabulario:** términos como "vago/a", "perezoso/a", "majo/a", "currar" tienen carga distinta o son inapropiados en Colombia.
2. **Voseo regional:** poco relevante en Bogotá pero sí en zonas rurales (Antioquia, Eje Cafetero); el uso del tú formal de Bogotá es seguro.
3. **Aquiescencia:** Soto y John (2017) y Rammstedt et al. (2013) reportan que la aquiescencia es mayor en respondentes con menor educación, lo cual es relevante en LATAM.
4. **Deseabilidad social y respuestas extremas:** Soto (2021) muestra que algunos ítems de Responsabilidad producen respuestas extremas en muestras representativas; el efecto puede magnificarse en culturas con mayor deseabilidad social como Colombia.

### 5.3 Recomendación operativa (procedimiento ITC 2017)

**Opinión profesional:** El procedimiento mínimo de adaptación sigue las guías de la International Test Commission (ITC, 2017):

1. **Revisión de equivalencia léxica** por panel bilingüe (psicólogos colombianos + lingüista) sobre la versión Gallardo-Pujol et al. (2022). Modificaciones puntuales esperadas en ≤ 5 ítems.
2. **Piloto cognitivo** con 30-50 colombianos heterogéneos (edad, educación, región) usando *think-aloud* para detectar ítems ambiguos.
3. **Validación cuantitativa diferida**: una vez DescubreMe acumule N ≥ 800 usuarios colombianos, realizar CFA y comparar α de cada dominio con benchmarks Gallardo-Pujol (2022) y Toledo-Fernández (2022). Si α de algún dominio cae > 0.05 puntos por debajo, revisar ítems.

---

## SECCIÓN 6 — LICENCIA Y PERMISOS (CRÍTICO)

### 6.1 Texto literal de las fuentes oficiales

**Hecho — Colby Personality Lab (Soto):**
> "The BFI-2 items are copyright 2015 by Oliver P. John and Christopher J. Soto. Permission is granted for personal and research use of the BFI-2."

**Hecho — Berkeley Personality Lab (FAQ John):**
> "Christopher J. Soto and I hold the copyright to the BFI-2 and it is not in the public domain per se. However, it is freely available for researchers to use for non-commercial research purposes. (...) At this time, the BFI-2 is for non-commercial uses only."

**Hecho — versión española (Colby/Gallardo-Pujol):**
> "No hay costes asociados al uso del BFI-2 en su versión española. Los derechos de autor de la versión original en inglés del BFI-2 son propiedad de Oliver John y Christopher Soto. En la práctica científica, el BFI-2 se considera 'código abierto' (open source)."

### 6.2 Respuesta explícita a las 9 preguntas obligatorias

| Pregunta | Respuesta |
|---|---|
| Tipo de licencia | Copyright privado de Soto y John (no Creative Commons, no dominio público) |
| ¿Permite uso comercial? | **No, sin permiso explícito.** "for non-commercial uses only" según texto literal |
| ¿Permite adaptación y traducción? | Sí para investigación; comercial requiere autorización |
| ¿Permite digitalización (web app)? | Sí para investigación; comercial requiere autorización |
| ¿Permite almacenar respuestas individuales? | Sí, pero atención a leyes de protección de datos del territorio (Ley 1581 Colombia) |
| Atribución requerida | Sí, citar Soto y John (2017a, 2017b) y Gallardo-Pujol et al. (2022) si se usa la versión española |
| Costo estimado uso comercial LATAM | No publicado. Práctica histórica: permisos sin costo monetario para usos educativos no abusivos, caso a caso |
| Email/institución de contacto | Christopher J. Soto: csoto@colby.edu (Colby College, Department of Psychology). Oliver P. John: ojohn@berkeley.edu (UC Berkeley) |
| Nivel de riesgo legal de usar en DescubreMe sin permiso | **ALTO.** Una plataforma freemium con suscripción Paid es inequívocamente comercial, incluso si el tier Free es gratuito. Uso sin permiso constituye infracción de copyright |

### 6.3 Acciones requeridas antes de Q1 2027

**Opinión profesional:**

1. **Contactar formalmente a Soto y John** describiendo: (a) naturaleza educativa-orientativa, no clínica ni de selección; (b) flujo de uso (cuestionario integrado con O*NET); (c) modelo freemium con/sin reventa de datos; (d) territorio LATAM con foco Colombia; (e) volumen estimado de aplicaciones/año.
2. **Solicitar licencia comercial expresa por escrito**, idealmente con: alcance LATAM, sin restricción de número de aplicaciones, derecho a almacenar respuestas individuales, derecho a usar la traducción Gallardo-Pujol et al., y duración mínima 5 años.
3. **Activar Plan B en paralelo**: implementar prototipo HEXACO-60 (uso libre académico) o IPIP-NEO-120 (dominio público) como contingencia si la negociación falla o impone tarifas inviables.

---

## SECCIÓN 7 — SCORING Y REGLAS DE PUNTUACIÓN

### 7.1 Procedimiento de puntuación

**Hecho:**

1. Para cada ítem inverso (clave R), recodificar: 1↔5, 2↔4, 3=3 (o equivalentemente, valor recodificado = 6 − valor original).
2. Para cada **faceta**, calcular la **media aritmética** de los 4 ítems (BFI-2) o 2 ítems (BFI-2-S) que la integran, después de la recodificación.
3. Para cada **dominio**, calcular la **media aritmética de las 3 facetas** (numéricamente equivalente a la media de los 12 o 6 ítems crudos).
4. Los rangos resultantes son [1, 5].

### 7.2 Control de aquiescencia (recomendación de Soto y John)

**Opinión profesional:** Para muestras grandes (n > 200), centrar cada respuesta del individuo restando su media de los 60 ítems (o 30 ítems en BFI-2-S). Esto produce puntuaciones desviadas que son más limpias para análisis factoriales y comparaciones interculturales. No es necesario para reportes individuales en interfaz de usuario, pero sí recomendable para análisis agregados internos.

### 7.3 Normas y baremos

**Hecho:** No existe un manual oficial con normas publicadas. Soto (2019) publicó estadísticos descriptivos para una muestra representativa adulta estadounidense (disponible en Colby Personality Lab). Para LATAM, **no existen normas estandarizadas oficiales**.

**Opinión profesional para DescubreMe:**
- **Fase 1 (lanzamiento):** mostrar puntuaciones en métrica POMP (% de máximo posible) y bandas tertiles (bajo/medio/alto) basadas en las medias de Toledo-Fernández (2022, México, N = 2.025) o Gallardo-Pujol (2022, España, N = 1.673). Preferir la mexicana por proximidad cultural.
- **Fase 2 (a partir de N ≥ 1.000 usuarios colombianos):** reemplazar por baremos colombianos propios.

### 7.4 Interpretación de bandas

**Inferencia:**
- **Bajo:** ≤ 1 DT por debajo de la media (≈ percentil 16).
- **Medio:** ±1 DT (percentiles 17-84).
- **Alto:** ≥ 1 DT sobre la media (≈ percentil 84).

Evitar lenguaje categórico-clínico ("eres neurótico"); usar lenguaje descriptivo-aspiracional ("tu nivel de Emotividad Negativa indica que tiendes a experimentar emociones negativas con más frecuencia que el promedio de la población de referencia").

---

## SECCIÓN 8 — IMPLEMENTACIÓN DIGITAL

### 8.1 Orden de ítems

**Hecho:** Soto y John recomiendan el **orden estándar publicado** del BFI-2/BFI-2-S; los ítems están alternados de modo que ítems del mismo dominio no aparecen consecutivamente, lo cual reduce halo y fatiga. Cambiar el orden es admisible pero pierde comparabilidad con datos normativos.

### 8.2 Validación de respuestas y patrones sospechosos

**Opinión profesional — implementar:**

1. **Tiempo mínimo por ítem**: < 1.0 s sugiere respuesta no atenta.
2. **Detector de patrón único**: ≥ 50 % de ítems con misma respuesta (e.g., todo "3").
3. **Aquiescencia extrema**: media intra-sujeto ≥ 4.5 o ≤ 1.5 sobre los 30 o 60 ítems → *flag* y no mostrar perfil.
4. **Inconsistencia ítem-pareja**: el BFI-2 incluye pares con clave opuesta dentro de una misma faceta; correlación intra-sujeto entre pares < −0.20 sugiere respuesta aleatoria.
5. **Tiempo total atípicamente bajo**: < 2 minutos en BFI-2-S sugiere clic-clic sin lectura.

### 8.3 UX recomendada

- Mostrar la escala Likert con etiquetas en cada uno de los 5 puntos, no solo extremos.
- Permitir retroceder en cualquier momento.
- Barra de progreso visible.
- No forzar respuesta (permitir "saltar"), pero advertir antes del envío si hay ≥ 10 % de ítems sin contestar.
- Mostrar duración estimada al inicio: "30 ítems, ~5 minutos" para BFI-2-S; "60 ítems, ~8-10 minutos" para BFI-2.
- Disclaimer pre-test: este cuestionario explora rasgos de personalidad, no es diagnóstico clínico ni evaluación de selección.

### 8.4 Privacidad y compliance

**Opinión profesional:** Los ítems de Emotividad Negativa (Ansiedad, Depresión, Volatilidad) son potencialmente sensibles bajo Ley 1581 de 2012 (Colombia, dato sensible-emocional según interpretación de la SIC). Tratamiento recomendado:

- Cifrado en reposo y en tránsito (TLS 1.3+).
- Acceso restringido por roles (RBAC).
- Derecho de eliminación accesible desde la cuenta del usuario en ≤ 2 clics.
- No compartir respuestas individuales con terceros sin consentimiento explícito documentado.
- Retención: definir política (sugerencia: 5 años desde último login, eliminación automática post).

### 8.5 Auditabilidad y trazabilidad

**Opinión profesional:** El scoring es determinista (recodificación + media). Guardar para reproducibilidad: respuestas crudas por ítem, timestamp por ítem, versión del instrumento usado, versión de la traducción, versión del scoring engine. Esto permite reconstruir cualquier perfil histórico si cambia la lógica.

---

## SECCIÓN 9 — MAPEO AL STACK DESCUBREME (POST v2.0)

### 9.1 Stack actual y posición del BFI-2

Stack v2.0:
- Mini-IPIP (personalidad Big Five, 20 ítems) — **BFI-2-S lo reemplaza en M1 v1.5**
- IPIP-NEO-120 (Big Five con 30 facetas, opcional Paid)
- O*NET IP SF (RIASEC)
- PVQ-RR (valores)
- Core Strengths 18 (fortalezas, IPIP-VIA-R)
- Ryff PWB corta (bienestar eudaimónico)
- FSS-9 (flow)
- Módulo propio Karasek 14 (B2B-A)

### 9.2 Comparación BFI-2-S vs Mini-IPIP

| Criterio | Mini-IPIP 20 | BFI-2-S 30 |
|---|---|---|
| Dominios | 5 | 5 |
| Facetas | 0 | 15 (con caveat n grande) |
| α dominios típico | .60-.77 | .73-.83 |
| Balance directo/inverso | 9/11 (no balanceado) | 15/15 (perfectamente balanceado) |
| Control aquiescencia | Limitado | Excelente |
| Validez en muestras LATAM | Sí, parcial | Sí (México, España, aplicaciones Colombia) |
| Mapeo a O*NET | Solo dominios | Posible a nivel facetal |
| Licencia comercial | Libre (dominio público IPIP) | Requiere permiso Soto/John |
| Tiempo estimado | 2-3 min | 3-5 min |

**Conclusión:** BFI-2-S es **psicométricamente superior** en casi todas las dimensiones excepto licencia. La pregunta clave de la migración M1 es si la mejora psicométrica justifica el costo legal y de gestión de licencia.

### 9.3 Comparación BFI-2 60 vs IPIP-NEO-120

**Inferencia:** Son complementarios pero parcialmente redundantes. IPIP-NEO-120 mide 30 facetas (más granularidad); BFI-2 mide 15 facetas con mejor calidad psicométrica por faceta (α ≈ .76 vs .60-.80) y mejor control de aquiescencia. Para DescubreMe, BFI-2 60 es más eficiente; ofrecer IPIP-NEO-120 como upgrade premium para usuarios que quieren máxima granularidad facetal sería redundante con un BFI-2 60 ya implementado.

### 9.4 BFI-2-S vs HEXACO-60

**Inferencia:** HEXACO-60 incorpora la dimensión Honestidad-Humildad (relevante para integridad laboral) pero su sexto factor reduce comparabilidad con la mayoría de literatura O*NET (basada en Big Five). HEXACO-60 es de uso libre académico sin restricción explícita; sería el **Plan B principal** si Soto y John no autorizan uso comercial.

### 9.5 Complementariedad con PVQ-RR y O*NET IP SF

**Inferencia:** El stack DescubreMe forma un triángulo conceptual sólido:
- BFI-2 → cómo soy (rasgos disposicionales).
- PVQ-RR → qué priorizo (valores normativos).
- O*NET IP SF → qué me interesa (intereses RIASEC).

Las correlaciones entre estos tres dominios son moderadas pero no redundantes; cada uno aporta varianza única al mapeo persona-trabajo.

---

## SECCIÓN 10 — RED FLAGS ÉTICOS Y SESGOS

### 10.1 Diferencias de sexo

**Hecho:** En Schmitt et al. (2008, *JPSP*, 94(1), 168-182, N = 17.637 en 55 culturas con BFI-44), las mujeres puntuaron sistemáticamente más alto que los hombres en Neuroticismo y Amabilidad (d = 0.15 a 0.58 según instrumento). En la versión rusa del BFI-2 (Shchebetenko et al., 2020), los hombres puntuaron más bajo en Emotividad Negativa y Amabilidad, y ligeramente más alto en Extraversión.

**Mitigación DescubreMe:** Mostrar baremos diferenciados por sexo cuando sea estadísticamente significativo, con texto explicativo: "Los hombres y mujeres en promedio puntúan diferente en algunos rasgos; tu puntuación se compara con personas de tu mismo sexo en la población de referencia".

### 10.2 Diferencias de edad

**Hecho:** "Maturity principle" (Soto et al., 2011; Atherton et al., 2022): Responsabilidad y Amabilidad aumentan con la edad; Emotividad Negativa decrece. Cambios pequeños pero consistentes entre 18 y 60+.

**Mitigación:** Usar bandas de edad (18-25, 26-40, 41-60, 60+) en los baremos cuando se acumulen datos colombianos suficientes.

### 10.3 Educación baja y aquiescencia

**Hecho:** Rammstedt et al. (2013) y Soto y John (2017) documentan que respondentes con menor educación muestran mayor aquiescencia, lo que comprime la varianza factorial y distorsiona las medias.

**Mitigación:** Aplicar centrado intra-sujeto antes de scoring para usuarios que reportan educación ≤ secundaria; incluir advertencia en UX si la respuesta es altamente uniforme (≥ 70 % mismo valor).

### 10.4 Ítems sensibles de Emotividad Negativa

**Opinión profesional:** Los ítems de la faceta Depresión pueden activar malestar en usuarios con sintomatología depresiva. **Mitigación obligatoria:**

- Disclaimer pre-test: "Este cuestionario explora rasgos de personalidad. No es un diagnóstico clínico. Si experimentas malestar emocional persistente, consulta con un profesional de salud mental".
- Botón de salida visible permanentemente.
- Línea de ayuda visible al cierre del cuestionario:
  - **Línea 106 (Bogotá)** — apoyo emocional
  - **Línea 123 (emergencia nacional Colombia)**
  - **CARE (Mensajería WhatsApp 318 376 7400)** — atención en salud mental
- NO devolver puntuaciones de "Depresión" como etiqueta clínica; usar "tendencia a sentir tristeza".

### 10.5 Limitación del BFI-2 en zonas extremas (alerta IRT)

**Hecho:** Las curvas de información del BFI-2 demuestran máxima precisión en los percentiles bajos y medios; precisión decae en extremos altos del rasgo (Soto, 2021; estudios IRT argentinos basados en muestra n = 987). El BFI-2 no es apto para discriminar entre niveles "altos" y "muy altos" de psicopatología; para ese rango se requiere PID-5 (DSM-5 AMPD).

**Implicación DescubreMe:** Cuando un usuario obtenga puntuación ≥ 1.5 DT en Emotividad Negativa, mostrar disclaimer adicional sobre la limitación del instrumento para diagnóstico fino, y referir explícitamente a recursos profesionales.

### 10.6 Riesgos de uso indebido

**Inferencia:** Riesgos potenciales:
- Selección de personal encubierta: contradice la licencia "no clínica/no selección".
- Etiquetado patologizante: contradice ética de orientación.
- Reventa de perfiles a empleadores: ilegal bajo Ley 1581/2012.
- Uso para etiquetar "MBTI-style" en redes sociales sin disclaimer.

**Mitigación:** Términos y condiciones explícitos prohibiendo uso para selección, ranking inter-personal, decisiones de alto stake o reventa de datos. Bloqueo técnico de exportación masiva de perfiles.

---

## SECCIÓN 11 — LIMITACIONES Y CONTEXTO DE USO

- **Validez para uso NO clínico y NO de selección.** El BFI-2 está diseñado y autorizado para investigación y autoconocimiento; no debe usarse para diagnóstico psiquiátrico ni para decisiones de contratación o promoción.
- **Validez en LATAM y Colombia.** La versión española (Gallardo-Pujol) tiene buenas propiedades pero solo invarianza métrica entre sexos (no escalar) y ajuste reducido en Amabilidad; en Colombia no hay validación formal pero sí aplicaciones publicadas.
- **Limitaciones de edad.** Rango recomendado: 18-65+. Para adolescentes existe BFI-2 versión adolescente (Soto et al., 2022); no cubierto en este dossier.
- **Limitaciones de nivel educativo.** Lectura básica suficiente; mayor aquiescencia en educación baja debe controlarse vía centrado intra-sujeto.
- **Tiempo de vigencia del resultado.** Big Five es relativamente estable en adultez; reaplicar cada 2-3 años o tras eventos vitales mayores. Comunicar al usuario que sus resultados pueden cambiar moderadamente con el tiempo y que la puntuación no es una "etiqueta permanente".

---

## SECCIÓN 12 — RECOMENDACIÓN DE USO EN DESCUBREME

### 12.1 Confirmación de la migración M1

**Opinión profesional — RECOMENDACIÓN: SÍ confirmar la migración Mini-IPIP → BFI-2-S** condicionada a:

1. Obtener licencia comercial escrita de Soto y John ANTES del lanzamiento.
2. Adoptar la traducción Gallardo-Pujol et al. (2022) con piloto cognitivo en Colombia.
3. Implementar mitigaciones éticas (Sección 10).

### 12.2 Configuración Free vs Paid v1.5

| Tier | Instrumento recomendado | Justificación |
|---|---|---|
| **Free v1.5** | BFI-2-S 30 ítems | Suficiente para perfil de 5 dominios + ilustración de facetas con disclaimer; tiempo razonable (~5 min); calidad psicométrica superior al Mini-IPIP |
| **Paid v1.5 (default)** | BFI-2-S 30 ítems | Mismo instrumento que Free, pero con análisis adicionales (mapeo O*NET, comparativos, recomendaciones); minimiza dispersión instrumental |
| **Paid v1.5 (premium opcional)** | BFI-2 60 ítems | Para usuarios que quieren máxima precisión a nivel de facetas; añade ~5 minutos pero α faceta sube de ~.60 a ~.76 |

**Decisión recomendada:** Si la licencia comercial encarece por usuario, mantener BFI-2-S como default en ambos tiers y usar BFI-2 60 solo como upgrade opcional (minimiza regalías).

### 12.3 Plan de migración para usuarios existentes con Mini-IPIP

1. **Mantener** las puntuaciones Mini-IPIP históricas con etiqueta "v1.0 - instrumento previo".
2. **Invitar** a re-tomar con BFI-2-S, explicando que es una medición más precisa y permite información de facetas.
3. **Mostrar** equivalencia aproximada de dominios (correlaciones típicamente r > .70 entre Mini-IPIP y BFI-2-S a nivel dominio).
4. **NO sobrescribir** datos históricos; transparencia de instrumentos es ética obligatoria.

### 12.4 Reversibilidad y Plan B

**Opinión profesional:** La migración M1 es **reversible** porque:

- No se elimina código de scoring del Mini-IPIP.
- Las respuestas históricas se conservan.
- En caso de denegación de licencia comercial, el Plan B (HEXACO-60 o regreso a Mini-IPIP) es viable en ≤ 4 semanas de desarrollo.

**Riesgo NFR-35 (retrocompatibilidad):** la decisión cumple porque las puntuaciones Mini-IPIP siguen siendo accesibles, recalculables y no se rompe ningún flujo de datos histórico.

---

## SECCIÓN 13 — PSEUDOCÓDIGO CONCEPTUAL DE SCORING

```
ENTRADA:
  respuestas[1..30]  // BFI-2-S, valores Likert 1..5
  o respuestas[1..60] // BFI-2, valores Likert 1..5

PASO 1 — Recodificación de ítems inversos:
  para cada item_R en lista_inversos:
    respuestas[item_R] = 6 - respuestas[item_R]

PASO 2 — Cómputo de facetas (15 facetas):
  para cada faceta f:
    items_f = lista de ítems pertenecientes a f
    faceta_score[f] = media(respuestas[items_f])

PASO 3 — Cómputo de dominios (5 dominios):
  para cada dominio d:
    facetas_d = las 3 facetas anidadas en d
    dominio_score[d] = media(faceta_score[facetas_d])

PASO 4 — Centrado intra-sujeto (opcional, recomendado n>200):
  media_individual = media(respuestas[1..30 o 1..60])
  para cada faceta f:
    faceta_centrada[f] = faceta_score[f] - media_individual
  (recalcular dominios sobre facetas centradas si se aplica)

PASO 5 — Conversión a percentiles vía baremo:
  para cada dominio d:
    percentil[d] = lookup_baremo(dominio_score[d], baremo_referencia, sexo, edad)

PASO 6 — Banda interpretativa:
  si percentil <= 16:  banda = "bajo"
  si percentil 17..84: banda = "medio"
  si percentil >= 84:  banda = "alto"

PASO 7 — Validaciones de calidad:
  flag_aquiescencia_extrema = (media_individual >= 4.5 OR media_individual <= 1.5)
  flag_patron_unico = (>= 50% items con misma respuesta)
  flag_tiempo_atipico = (tiempo_total < 2 minutos en BFI-2-S)
  si cualquier flag: NO mostrar perfil, mostrar mensaje "respuesta atípica detectada"

SALIDAS:
  faceta_score[15]
  dominio_score[5]
  percentil[5]
  banda[5]
  flags_calidad
  metadatos: version_instrumento, version_traduccion, timestamp, tiempo_total
```

---

## SECCIÓN 14 — GAPS DE INVESTIGACIÓN Y PREGUNTAS ABIERTAS

1. **Validación formal del BFI-2 en Colombia.** No existe estudio peer-reviewed con muestra colombiana representativa, CFA y cálculo de invarianza vs versión española. DescubreMe podría liderar esa publicación una vez acumule N ≥ 1.000 usuarios colombianos.
2. **Magnitud y costo del permiso comercial Soto-John.** No hay tarifa pública. Caso a caso, depende de negociación. **Pregunta abierta:** ¿qué tarifa razonable se puede esperar para uso freemium con ~10.000-50.000 usuarios/año en LATAM?
3. **Equivalencia escalar entre español-Colombia y español-España.** Solo se ha establecido equivalencia métrica entre sexos en España; no se ha estudiado equivalencia entre regiones hispanohablantes.
4. **Performance del BFI-2 con usuarios colombianos de baja educación.** La aquiescencia LATAM puede comprometer el control de claves directas/inversas; se requiere piloto cognitivo para confirmar.
5. **Funcionamiento diferencial de la faceta de Depresión en culturas con alto estigma de salud mental.** Estudio diferido a fase de validación.
6. **¿BFI-2 60 vs BFI-2-S 30 en mapeo a O*NET?** No hay estudio publicado que cuantifique la pérdida predictiva de mapeo persona-ocupación al usar 30 vs 60 ítems.

---

## SECCIÓN 15 — REFERENCIAS (APA 7)

### 15.1 Fuente original Soto-John 2017 y manual técnico

- Soto, C. J., & John, O. P. (2017a). The next Big Five Inventory (BFI-2): Developing and assessing a hierarchical model with 15 facets to enhance bandwidth, fidelity, and predictive power. *Journal of Personality and Social Psychology*, 113(1), 117-143. https://doi.org/10.1037/pspp0000096
- Soto, C. J., & John, O. P. (2017b). Short and extra-short forms of the Big Five Inventory-2: The BFI-2-S and BFI-2-XS. *Journal of Research in Personality*, 68, 69-81. https://doi.org/10.1016/j.jrp.2017.02.004

### 15.2 Validaciones psicométricas principales

- Atherton, O. E., Sutin, A. R., Terracciano, A., & Robins, R. W. (2022). Stability and change in the Big Five personality traits: Findings from a longitudinal study of Mexican-origin adults. *Journal of Personality and Social Psychology*, 122(2), 337-350. https://doi.org/10.1037/pspp0000385
- Føllesdal, H., & Soto, C. J. (2022). The Norwegian adaptation of the Big Five Inventory-2. *Frontiers in Psychology*, 13, 858920. https://doi.org/10.3389/fpsyg.2022.858920
- Rammstedt, B., Lechner, C. M., & Soto, C. J. (2024). Adapting the BFI-2 around the world: Coordinated translation and validation in five languages and cultural contexts. *European Journal of Psychological Assessment*. https://doi.org/10.1027/1015-5759/a000844
- Shchebetenko, S., Kalugin, A. Y., Mishkevich, A. M., Soto, C. J., & John, O. P. (2020). Measurement invariance and sex and age differences of the Big Five Inventory-2: Evidence from the Russian version. *Assessment*, 27(3), 472-486. https://doi.org/10.1177/1073191119860901
- Soto, C. J. (2019). How replicable are links between personality traits and consequential life outcomes? The Life Outcomes of Personality Replication Project. *Psychological Science*, 30(5), 711-727. https://doi.org/10.1177/0956797619831612
- Soto, C. J. (2021). Do links between personality and life outcomes generalize? Testing the robustness of trait-outcome associations across gender, age, ethnicity, and analytic approaches. *Social Psychological and Personality Science*, 12(1), 118-130. https://doi.org/10.1177/1948550619900572
- Yoshino, S., Shimotsukasa, T., Hashimoto, Y., & Oshio, A. (2022). A validation of the Japanese adaptation of the Big Five Inventory-2. *Frontiers in Psychology*, 13, 924351. https://doi.org/10.3389/fpsyg.2022.924351
- Zhang, B., Li, Y. M., Li, J., Luo, J., Ye, Y., Yin, L., Chen, Z., Soto, C. J., & John, O. P. (2022). The Big Five Inventory-2 in China: A comprehensive psychometric evaluation in four diverse samples. *Assessment*, 29(6), 1262-1284. https://doi.org/10.1177/10731911211008245

### 15.3 Adaptaciones culturales (España, México, Argentina, Perú, aplicaciones Colombia)

- Gallardo-Pujol, D., Rouco, V., Cortijos-Bernabeu, A., Oceja, L., Soto, C. J., & John, O. P. (2022). Factor structure, gender invariance, measurement properties, and short forms of the Spanish adaptation of the Big Five Inventory-2. *Psychological Test Adaptation and Development*, 3(1), 44-69. https://doi.org/10.1027/2698-1866/a000020
- Merino-Soto, C., Dominguez-Lara, S., Rodriguez, L. M., Chans, G. M., & Marti-Vilar, M. (2025). Cross-cultural measurement invariance of the BFI-15p in university students from Argentina, Spain, and Peru. *Acta Psychologica*, 250, 104456. https://doi.org/10.1016/j.actpsy.2025.104456
- Toledo-Fernández, A., Pérez-Matus, S., & Villalobos-Gallegos, L. (2022). The Big Five Inventory-2: Confirmatory factor analysis and latent profiles in a Mexican sample. *Suma Psicológica*, 29(2), 119-128. https://doi.org/10.14349/sumapsi.2022.v29.n2.4
- Universidad del Rosario. (2024). Bisturí o estetoscopio: relationship between personality traits and choice of medical residency program. https://pure.urosario.edu.co/en/publications/scalpel-or-stethoscope-relationship-between-personality-traits-an
- Aglala — Corporación Universitaria Rafael Núñez. (2024). Personality of the entrepreneur and its relationship with innovation in micro and small enterprises in the Ecuador-Colombia border context. https://revistas.uninunez.edu.co/index.php/aglala

### 15.4 Literatura relacionada (Big Five, NEO-PI-3, IPIP-NEO, Mini-IPIP, HEXACO, AMPD)

- Ashton, M. C., & Lee, K. (2009). The HEXACO-60: A short measure of the major dimensions of personality. *Journal of Personality Assessment*, 91(4), 340-345. https://doi.org/10.1080/00223890902935878
- Donnellan, M. B., Oswald, F. L., Baird, B. M., & Lucas, R. E. (2006). The Mini-IPIP scales: Tiny-yet-effective measures of the Big Five factors of personality. *Psychological Assessment*, 18(2), 192-203. https://doi.org/10.1037/1040-3590.18.2.192
- John, O. P., Naumann, L. P., & Soto, C. J. (2008). Paradigm shift to the integrative Big Five trait taxonomy: History, measurement, and conceptual issues. In O. P. John, R. W. Robins, & L. A. Pervin (Eds.), *Handbook of personality: Theory and research* (3rd ed., pp. 114-158). Guilford Press.
- Kajonius, P. J., & Johnson, J. (2018). Sex differences in 30 facets of the five factor model of personality in the large public (N = 320,128). *Personality and Individual Differences*, 129, 126-130. https://doi.org/10.1016/j.paid.2018.03.026
- Schmitt, D. P., Realo, A., Voracek, M., & Allik, J. (2008). Why can't a man be more like a woman? Sex differences in Big Five personality traits across 55 cultures. *Journal of Personality and Social Psychology*, 94(1), 168-182. https://doi.org/10.1037/0022-3514.94.1.168

### 15.5 Fuentes sobre licencia y derechos

- Colby Personality Lab — Big Five Inventory-2. https://www.colby.edu/academics/departments-and-programs/psychology/research-opportunities/personality-lab/the-bfi-2/
- OECD. (2024). Going Global: 39 Language Versions of the BFI-2-XS. EDU/WKP(2024)4. https://one.oecd.org/document/EDU/WKP(2024)4/en/pdf

### 15.6 Estándares y compliance

- International Test Commission. (2017). *ITC Guidelines for Translating and Adapting Tests* (2nd ed.). https://www.intestcom.org/files/guideline_test_adaptation_2ed.pdf
- Congreso de la República de Colombia. (2012). Ley 1581 de 2012 — Por la cual se dictan disposiciones generales para la protección de datos personales.

---

## CAVEATS FINALES

- **Norma colombiana inexistente:** todos los baremos propuestos (México, España) son aproximaciones provisionales hasta acumular N ≥ 1.000 usuarios colombianos.
- **Licencia comercial pendiente:** este dossier asume cooperación de Soto y John; si la respuesta es negativa o impone tarifas inviables, activar Plan B (HEXACO-60 o IPIP-NEO-120).
- **Invarianza escalar Spanish vs inglés:** Gallardo-Pujol et al. (2022) solo confirmaron invarianza métrica entre sexos; las comparaciones de medias entre hombres y mujeres en español requieren interpretación cautelosa.
- **Datos sensibles:** los ítems de Emotividad Negativa son potencialmente activadores; toda implementación debe incluir disclaimers, referidos a salud mental y derecho de eliminación según Ley 1581/2012 (Colombia).
- **Trazabilidad de divergencia:** este dossier consolida síntesis de Claude y Gemini; en datos psicométricos críticos (α dominios BFI-2, varianza captada BFI-2-S) ambos coincidieron. Datos adicionales únicos de cada fuente: aplicaciones colombianas específicas (Rosario "Bisturí", Nariño-Carchi) provienen del análisis Gemini; estructura de licencia con texto literal y plan de acción cronograma proviene del análisis Claude.

---

*Cierre del dossier consolidado v2.1 — Listo para revisión científica y legal antes de M1.*
