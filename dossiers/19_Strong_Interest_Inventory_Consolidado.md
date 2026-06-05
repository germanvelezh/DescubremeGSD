# Dossier de Investigacion Profunda v2.1 — Strong Interest Inventory (SII)

**Proyecto:** DescubreMe — plataforma freemium B2C de autoconocimiento profundo (LATAM, foco Colombia, no clinico, no seleccion de personal)
**Decision que respalda:** Confirmacion del Strong Interest Inventory (SII, version 291 items 2004 y Strong 244, 2023) como **referencia teorica fuera del stack implementable**. Validacion de hipotesis: licencia comercial de The Myers-Briggs Company con tarifa por administracion + certificacion de practitioner es estructuralmente inviable para freemium LATAM cuando O*NET IP SF (RIASEC gratuito) ya cubre el constructo central en el stack v2.0.
**Fecha de cierre:** 10 de mayo de 2026
**Version consolidada:** sintesis unificada de dossiers Claude y Gemini, datos comerciales y psicometricos verificados contra paginas oficiales de The Myers-Briggs Company, Psychometrics Canada, Career Assessment Site y literatura primaria indexada.

---

## SECCION 0 — PORTADA Y RESUMEN EJECUTIVO

**Instrumento:** Strong Interest Inventory (SII), 291 items (revision 2004) y Strong 244 Assessment (2023).
**Autores intelectuales originales:** Edward K. Strong Jr. (1927, *Strong Vocational Interest Blank*).
**Autores revision 1994:** Harmon, L. W., Hansen, J. C., Borgen, F. H., y Hammer, A. L.
**Autores revision moderna 2004 (manual tecnico vigente para la version 291 items):** Donnay, D. A. C., Morris, M. L., Schaubhut, N. A., y Thompson, R. C.
**Suplemento tecnico 244 (2023+):** Morris, M. L., y Thompson, R. C.
**Editor / titular de copyright:** The Myers-Briggs Company (Sunnyvale, California; antes Consulting Psychologists Press / CPP, Inc.).
**Idioma original:** ingles (EE. UU.). Marcas registradas: Strong, Strong Interest Inventory, Elevate.
**Versiones existentes:** Strong Profile, Strong + Skills Confidence Inventory Profile, Strong Interpretive Report, Strong College Edition, Strong High School Edition, Strong + MBTI Combined Career Report, Strong 244 Assessment y Strong 244 Profile (enero 2026, reemplaza al Career Satisfaction Report).
**Tiempo de aplicacion:** 35-40 minutos (rango reportado 30-50 minutos).
**Edad sugerida:** desde 13-14 anos (lectura ~9.o grado en ingles), uso optimo >= 16 anos.
**Adaptaciones al espanol:** **ninguna version comercial vigente publicada por el editor.** Estudios academicos historicos: Hansen y Fouad (1984) tradujeron el Strong-Campbell Interest Inventory previo al SII 1994; trabajos no han derivado en producto comercial. La pagina APAC del editor confirma traducciones unicamente al frances; Psychometrics Canada confirma que *"the Strong 244 assessment and the Strong 244 Profile will be available in English only"*.

**Resumen ejecutivo (3-5 lineas).** El SII es la operacionalizacion comercial gold standard del modelo hexagonal RIASEC de Holland, con cuatro capas jerarquicas (6 General Occupational Themes, 30 Basic Interest Scales / 32 en Strong 244, hasta 244 Occupational Scales empiricas en 2004 / 243 OS de satisfaccion + 321 ocupaciones de similitud en Strong 244, y 5 Personal Style Scales / 6 en Strong 244). Confiabilidad alfa de dominios GOT .90-.95 y test-retest .74-.92; validez predictiva ocupacional documentada por mas de cinco decadas. Sus tres limitaciones estructurales para DescubreMe son: (1) licencia restringida con copyright de The Myers-Briggs Company, certificacion obligatoria de practitioner (~USD 2.995) y costo por administracion de USD 13-30 mayorista y USD 25-100 retail; (2) inexistencia de version comercial vigente en espanol y prohibicion contractual de auto-hospedaje fuera de Elevate o plataformas de distribuidores autorizados; (3) redundancia funcional con O*NET IP Short Form, ya integrado en el stack v2.0 de DescubreMe a costo cero, con adaptacion al espanol disponible (Mi Proximo Paso) y derecho de auto-hospedaje irrestricto. Para un volumen freemium B2C de 10.000-100.000 administraciones/ano en LATAM, el costo de licencia oscila entre USD 200.000 y USD 2.000.000 anuales, estructuralmente incompatible con ARPU consumer LATAM (USD 5-15/mes).

**Recomendacion ejecutiva.** **EXCLUIR el Strong Interest Inventory del stack implementable de DescubreMe en MVP1, v1.5 y v2.0.** Mantener O*NET IP SF (ya en stack) como instrumento RIASEC primario, con SDS Forma R como candidato P3 evaluable solo si PAR Inc. ofrece licencia digital razonable. El SII queda como **referencia teorica de validacion cruzada** en documentacion interna del Track A Paid y como candidato condicional para un eventual SKU B2B premium donde el cliente corporativo pague >= USD 150/licencia, exista practitioner certificado en el flujo y se exija explicitamente el branding "Strong". **Hipotesis confirmada:** el modelo comercial del SII (tarifa por administracion + certificacion + sin self-host + sin version en espanol vigente) es estructuralmente inviable para freemium B2C LATAM cuando O*NET ya cubre el constructo central a costo cero.

---

## SECCION 1 — CONSTRUCTO MEDIDO

### 1.1 El modelo hexagonal RIASEC de Holland

**Hecho:** El SII operacionaliza el modelo de John L. Holland (Holland, 1959, 1997), que organiza los intereses vocacionales en seis tipologias ortogonales-circumplejas dispuestas en un hexagono: Realistic (R), Investigative (I), Artistic (A), Social (S), Enterprising (E) y Conventional (C). Las tipologias adyacentes en el hexagono comparten varianza conceptual (p. ej., R-I); las opuestas representan intereses divergentes (R-S, I-E, A-C). El SII mide preferencias declaradas frente a actividades, ocupaciones, materias escolares, tipos de personas y caracteristicas personales — no aptitudes ni personalidad.

| Dominio RIASEC | Etiqueta narrativa | Anclajes ocupacionales tipicos |
|---|---|---|
| Realistic (R) | "Los Hacedores" | Oficios tecnicos, ingenieria, agricultura, seguridad publica |
| Investigative (I) | "Los Pensadores" | Ciencias, medicina, investigacion, analisis de datos |
| Artistic (A) | "Los Creadores" | Diseno, arte, literatura, comunicacion creativa |
| Social (S) | "Los Ayudadores" | Educacion, enfermeria, psicologia, trabajo social |
| Enterprising (E) | "Los Persuasores" | Gerencia, ventas, politica, emprendimiento financiero |
| Conventional (C) | "Los Organizadores" | Contabilidad, administracion, paralegal, actuariales |

### 1.2 Linaje historico

**Hecho:** Cronologia verificada:

- **1927:** Edward K. Strong Jr. (Carnegie Institute of Technology) publica el *Strong Vocational Interest Blank* (SVIB), pionero del metodo de grupos contrastados.
- **1933:** Forma femenina del SVIB (separada de la masculina).
- **1974:** David P. Campbell y Jo-Ida Hansen fusionan ambas formas en el *Strong-Campbell Interest Inventory* (SCII), introducen 23 Basic Interest Scales y dos escalas especiales (Academic Comfort, Introversion-Extroversion).
- **1985:** Renombrado oficialmente como Strong Interest Inventory.
- **1994:** Revision Harmon, Hansen, Borgen y Hammer; integracion completa del modelo RIASEC.
- **2004:** Revision Donnay, Morris, Schaubhut y Thompson; consolidacion de los 291 items, escala Likert de 5 puntos, 6 GOT, 30 BIS, 244 OS y 5 PSS.
- **2023:** *Strong 244 Assessment* (Morris y Thompson, suplemento tecnico 2026); 244 items, 32 BIS, 243 OS de satisfaccion mas 321 ocupaciones de similitud, 100 escalas de especialidad academica universitaria, 6 PSS (escision de Work Style en dos escalas), scoring genero-neutro y muestra normativa general expandida a 100.000 personas (50.000 hombres / 50.000 mujeres).
- **Enero 2026:** Strong 244 Profile reemplaza al Career Satisfaction Report.

### 1.3 Estructura analitica en cuatro capas jerarquicas

**Hecho:** El SII (Strong 2004) entrega cuatro conjuntos jerarquicos de puntajes:

1. **6 General Occupational Themes (GOT):** RIASEC a nivel macro, normalizados sobre la General Representative Sample.
2. **30 Basic Interest Scales (BIS) en 2004 / 32 en Strong 244:** subdominios tematicos especificos (p. ej., Athletics, Sales, Performing Arts). El Strong 244 incorpora "Hospitality & Tourism" y "Conservation & Environmentalism".
3. **244 Occupational Scales (OS) en 2004 / 243 OS de satisfaccion + hasta 321 ocupaciones de similitud en Strong 244:** escalas empiricas construidas por contraste entre muestras ocupacionales satisfechas y la muestra de referencia general. **No son sumas directas: usan pesos ponderados item a item.**
4. **5 Personal Style Scales (PSS) en 2004 / 6 en Strong 244:** Work Style, Learning Environment, Leadership Style, Risk Taking, Team Orientation (la Work Style se divide en dos escalas en la version 244 segun el Technical Supplement de Morris y Thompson, 2026).

**Indices administrativos adicionales:** Total Response Index (TRI), Typicality Index (Brophy, 2006), Item Response Percentages.

### 1.4 Relacion con instrumentos analogos

| Instrumento | Modelo | Items | Capas adicionales | Adaptacion al espanol |
|---|---|---|---|---|
| **O*NET IP Short Form** | RIASEC puro | 60 | Ninguna | Si (Mi Proximo Paso, libre) |
| **Self-Directed Search (SDS) Forma R 5.a ed.** | RIASEC + competencias autodeclaradas | ~228 | Codigos ocupacionales, EOF, OF | Si (SDS-R Martinez Vicente y Valls, 2006; version PAR EE. UU.) |
| **Kuder Career Search (KCS)** | Modelo propio + RIASEC | ~80 (elecciones forzadas) | Person Match, vinculos narrativos | Parcial / no oficial en LATAM |
| **CISS (Campbell)** | 7 Orientations (~RIASEC) + skills | 320 | 29 Basic, 60 Occupational | Estudios academicos, sin producto comercial claro LATAM |
| **UNIACT** | RIASEC | ~90 | Ninguna | Limitada |
| **18REST** (Ambiel et al., 2018, Brasil) | RIASEC corto | 18 | Ninguna | Validado en portugues brasileno; punto de referencia LATAM |

**Inferencia:** El diferencial pedagogico del SII frente al O*NET IP SF no esta en la medicion de RIASEC (estructuralmente equivalentes a nivel GOT), sino en (a) las 243-321 Occupational Scales empiricas con norma ocupacional real, (b) las 32 BIS y (c) las 5-6 Personal Style Scales. Para un usuario consumer en LATAM, este diferencial es marginal frente al costo y la fricción operacional.

### 1.5 Sinergia clinica historica con MBTI

**Hecho:** The Myers-Briggs Company comercializa el "Strong + MBTI Combined Career Report" como producto premium en outplacement ejecutivo y desarrollo de liderazgo, justificandolo en la complementariedad teorica: SII responde al *que* (campos de interes), MBTI responde al *como* (preferencias cognitivas, manejo de energia). **Inferencia:** este encadenamiento es relevante para el segmento corporativo high-end (>= USD 150/licencia) pero ajeno al posicionamiento freemium B2C de DescubreMe.

---

## SECCION 2 — ESTRUCTURA DEL INSTRUMENTO

### 2.1 SII Strong 2004 (forma vigente con 291 items)

- **Hecho:** 291 items totales. Los primeros 282 usan escala Likert de 5 puntos (*Strongly Like / Like / Indifferent / Dislike / Strongly Dislike*); los 9 items finales (seccion "Your Characteristics") usan anclajes de identificacion personal (*Strongly like me / Like me / Don't know / Unlike me / Strongly unlike me*).
- Tiempo: 35-40 minutos; rango reportado 30-50 minutos.
- Lectura: equivalente ~9.o grado en ingles.
- Autoaplicado, online o lapiz y papel.
- Administracion exclusiva via plataforma autorizada del editor (Elevate desde 2024-2025) o de distribuidores certificados.

### 2.2 Strong 244 (2023)

- **Hecho:** 244 items, misma estructura Likert de 5 puntos. Suplemento tecnico: Morris y Thompson (2026).
- 6 GOT (RIASEC).
- 32 BIS (incluye Hospitality & Tourism y Conservation & Environmentalism).
- 243 OS con prediccion de satisfaccion + hasta 321 ocupaciones de similitud.
- 100 escalas de especialidad academica universitaria.
- 6 PSS (escision de Work Style).
- Scoring genero-neutro: elimina la solicitud explicita del dato demografico de genero y unifica baremos historicamente segregados por sexo.
- Muestra normativa General Representative Sample (GRS): 100.000 personas (50.000 hombres / 50.000 mujeres).

### 2.3 Tipos de item (sin reproduccion literal)

**Hecho:** Las cinco familias de items del SII son: ocupaciones (gusto/disgusto), areas de actividad y materias escolares, tipos de personas con quienes preferiria interactuar, caracteristicas personales autodescriptivas y un numero limitado de items con eleccion forzada entre dos opciones.

### 2.4 Anti-alucinacion de items

**Hecho:** No se reproducen items literales del SII ni del Strong 244 en este dossier. El copyright de The Myers-Briggs Company protege items, vectores de pesos de OS, algoritmos de scoring y matrices de baremos. Cualquier reproduccion sin autorizacion expresa es infraccion de copyright y trademark. El pseudocodigo de la Seccion 13 usa marcadores conceptuales y declarativos.

---

## SECCION 3 — PROPIEDADES PSICOMETRICAS

### 3.1 Muestras normativas

**Hecho:**

- **Strong 2004 (291 items):** General Representative Sample (GRS) de **2.250 adultos** (50 % hombres / 50 % mujeres), 370 ocupaciones de calibracion, mayoritariamente caucasica con representacion afroamericana, latina, asiatica y multietnica (Donnay et al., 2005).
- **Strong 244 (2023):** GRS expandida a **100.000 personas** (50.000 hombres / 50.000 mujeres) y "hundreds of new occupation and major samples" segun el Technical Supplement de Morris y Thompson (2026).
- Conteo agregado total de trabajadores empleados y satisfechos en muestras ocupacionales: no publicado en cifra unica primaria (los manuales hacen referencia a "decenas de miles"); el volumen historico de mas de 500.000 mencionado en literatura comercial corresponde a administraciones acumuladas, no a tamano normativo formal.

### 3.2 Confiabilidad (Strong 2004; Donnay, Morris, Schaubhut y Thompson, 2005)

| Nivel | Alfa de Cronbach | Test-retest | Error estandar de medida (SEM) |
|---|---|---|---|
| GOT (6 escalas) | .90-.95 | .74-.92 | ~3.74 |
| BIS (30 escalas) | .80-.92 (rango .74-.94 segun Statistics Solutions) | .74-.92 | — |
| PSS (5 escalas) | .82-.87 | — | — |
| OS (244 escalas) | No aplica formalmente (escalas empiricas heterogeneas, derivadas por contraste de criterio) | Estables a lo largo del tiempo segun estudios de Hansen | — |

### 3.3 Validez estructural

**Hecho:** El ordenamiento hexagonal RIASEC del SII se ajusta razonablemente al modelo circular de Holland en muestras estadounidenses (Donnay y Borgen, 1996); el ajuste es mas debil en muestras transculturales (Rounds y Tracey, 1996; Tracey y Rounds, 1993). El orden Realistic-Conventional es inestable interculturalmente.

### 3.4 Validez predictiva ocupacional

**Hecho:** Evidencia acumulada de mas de 50 anos de que las Occupational Scales predicen la ocupacion que el respondente eventualmente ejerce (Strong, 1935, 1955; Hansen y Swanson, 1983; Dik y Hansen, 2004). Meta-analisis de Nye, Su, Rounds y Drasgow (2012) reporta correlaciones moderadas entre intereses vocacionales y desempeno laboral, y mayor prediccion cuando se usan indices de congruencia (Nye et al., 2017). Validez concurrente con Vocational Preference Inventory: r ~ .77 (Donnay y Borgen, 1996).

### 3.5 Estabilidad temporal de los intereses

**Hecho:** Low, Yoon, Roberts y Rounds (2005, *Psychological Bulletin*) demostraron en meta-analisis cuantitativo que la estabilidad de los intereses vocacionales se incrementa fuertemente entre los 18 y 22 anos y se mantiene durante las dos decadas siguientes. **Implicacion:** los intereses miden constructos estables, no fluctuaciones animicas temporales; el SII es interpretable para adultos jovenes y maduros con un horizonte predictivo de 2-5 anos minimo.

### 3.6 Limitaciones psicometricas relevantes

1. **DIF de genero (Strong 2004):** Einarsdottir y Rounds (2009) detectaron *Differential Item Functioning* relacionado con genero en aproximadamente dos tercios de los items de las escalas GOT y BI; al eliminar items sesgados, las diferencias R/I a favor de hombres se reducen, pero las diferencias A/S a favor de mujeres persisten.
2. **DIF cultural / racial-etnico:** Fouad y Walker (2005) hallaron *Differential Bundle Functioning* atribuible a barreras percibidas, modelado de roles y exposicion ocupacional, no solo a diferencias verdaderas de interes (Fouad y Mohler, 2004).
3. **Equivalencia transcultural:** validez estructural decrece fuera de muestras estadounidenses (Rounds y Tracey, 1996); el orden Realistic-Conventional es inestable interculturalmente.
4. **Norma US-centrica:** las 244 OS reflejan ocupaciones, titulos y mercados laborales estadounidenses; ocupaciones colombianas y latinoamericanas relevantes (emprendimiento informal, oficios tecnicos regionales, sector cooperativo) estan subrepresentadas o ausentes.
5. **Dimorfismo vocacional de sexo a gran escala:** Morris (2016, *Journal of Counseling Psychology*) analizo N = 1.283.110 residentes estadounidenses (14-63 anos) que completaron el SII entre 2005 y 2014; documenta predominancia masculina en R-I-C-E y predominancia femenina en A-S, con distancia de Mahalanobis D = 1.61 y solapamiento de distribuciones de aproximadamente 27 %. Su, Rounds y Armstrong (2009, *Psychological Bulletin*) replicaron via meta-analisis (R d ~ 0.84 a favor de hombres; S d ~ -0.68 a favor de mujeres).
6. **Efecto SES y prestigio ocupacional:** analisis multidimensional revela una tercera dimension latente de estatus socioeconomico / prestigio que contamina la interpretacion pura del modelo Datos-Ideas / Personas-Cosas de Prediger (1982); los items que describen ocupaciones de alto perfil social atraen patrones de respuesta positivos que reflejan aspiracion sistemica, no solo afinidad vocacional genuina.

### 3.7 Correccion parcial en Strong 244 (2023)

**Hecho:** El Strong 244 elimina la normalizacion por sexo y entrega scoring genero-neutro con la GRS de 100.000 personas. **Inferencia:** esto mitiga el DIF de genero pero no resuelve los sesgos culturales, de SES ni la norma US-centrica.

---

## SECCION 4 — ADAPTACIONES CULTURALES DISPONIBLES

### 4.1 Estado oficial de traducciones (editor)

**Hecho — texto literal:** la pagina APAC oficial del editor confirma *"translations are available for selected Strong products and assessments in the following languages: French"* — unicamente frances. Psychometrics Canada confirma para Strong 244 *"the Strong 244 assessment and the Strong 244 Profile will be available in English only"*. **No existe version comercial oficial del Strong Interest Inventory en espanol** publicada por The Myers-Briggs Company al cierre de mayo 2026.

### 4.2 Estudios academicos de adaptacion (no comerciales)

| Idioma / pais | Cita | Hallazgos |
|---|---|---|
| **Espanol (EE. UU. hispano)** | Hansen y Fouad (1984). *Measurement and Evaluation in Guidance*, 16(4), 192-198. DOI: 10.1080/00256307.1984.12022356 | Traduccion del Strong-Campbell Interest Inventory (previo al SII 1994). No derivo en producto comercial vigente. |
| **Chino** | Goh (2004); Goh y Yu (2001) | Replica parcial de la estructura de seis factores. |
| **Islandes** | Einarsdottir, Rounds, Aegisdottir y Gerstein | Evaluacion en clientes de orientacion. |
| **Croata, aleman, italiano** | Estudios academicos diversos | Validaciones parciales sin traduccion comercial. |

### 4.3 Distribuidores LATAM autorizados

**Hecho:**

- **Human Development Solutions (Mexico)** se identifica como *"the only consulting company authorized by The Myers-Briggs Company in Latin America that certifies professionals in MBTI and FIROB"*. Ofrece programa de certificacion Strong, pero el instrumento se administra en ingles.
- **Psychometrics Canada** distribuye el Strong 244 en Norteamerica via sistema de creditos.
- **JVR Africa Group** distribuye en Africa.
- **The Career Project** y **Career Assessment Site** distribuyen el Strong en EE. UU. para consumer final con sesion de interpretacion.

### 4.4 Brecha academica documentada en Colombia

**Hecho:** Una revision bibliometrica reciente sobre inventarios de intereses vocacionales en educacion secundaria colombiana (2012-2022) reporta que aproximadamente 89 % de los estudios revisados usan instrumentos disenados en contextos culturales ajenos sin documentar procedimientos formales de traduccion (back-translation), adaptacion linguistica o validacion psicometrica adaptada al sujeto colombiano (Revista Tempus Psicologico, Universidad de Manizales, 2024). **Inferencia:** la importacion directa del SII a Colombia sin adaptacion formal es practica academica pero no respaldada metricamente.

---

## SECCION 5 — ADAPTACION AL ESPANOL DE COLOMBIA (ANALISIS ESPECIFICO)

### 5.1 Estado del arte

**Hecho:** No existe version comercial oficial del SII en espanol neutro ni en espanol Colombia publicada por The Myers-Briggs Company al cierre de mayo de 2026. El catalogo en espanol del distribuidor norteamericano Career Assessment Site lista MBTI, TKI y FIRO-B en espanol, pero **no incluye Strong Interest Inventory en espanol**. Human Development Solutions (Mexico), unico certificador LATAM autorizado, ofrece el SII solo en ingles.

### 5.2 Autoconcepto interdependiente y validez ecologica en LATAM

**Hecho / Inferencia:** El modelo subyacente del SII presupone autoconcepto independiente (Markus y Kitayama, 1991), tipico de sociedades occidentales liberales. En culturas latinoamericanas con autoconcepto interdependiente, la eleccion vocacional esta entrelazada con cohesion familiar, expectativas parentales, mandatos intergeneracionales y restricciones economicas grupales. Esto produce respuestas potencialmente inestables y context-dependent: un mismo respondente puede generar perfiles diferentes segun si responde pensando en aspiraciones privadas o expectativas de movilidad social del grupo familiar. **Implicacion para DescubreMe:** una administracion del SII en muestras colombianas sin marco de orientacion humana cualificada arriesga producir lecturas deterministas inadecuadas.

### 5.3 Procedimiento minimo de adaptacion formal (estandar ITC 2017)

**Opinion profesional:** Una eventual adaptacion formal del SII a espanol Colombia requeriria como minimo:

1. Acuerdo formal de licenciamiento + adaptacion con The Myers-Briggs Company (no con distribuidor regional; la adaptacion de instrumentos restringidos pasa por la casa matriz).
2. Traduccion / retro-traduccion siguiendo estandares ITC (International Test Commission, 2017).
3. Recoleccion de muestra normativa colombiana o regional (minimo 1.000-2.250 individuos en ocupaciones representativas; idealmente N >= 10.000 para construir GRS local).
4. **Reconstruccion empirica de las Occupational Scales** con muestras ocupacionales locales: las OS son norm-criterio y no se pueden simplemente traducir; requieren miles de profesionales colombianos satisfechos por ocupacion para calibrar pesos item a item.
5. Auditoria de equivalencia metrica (invarianza factorial, DIF transcultural).

**Costo estimado total:** USD 150.000-500.000, horizonte 18-36 meses, antes de royalties por administracion. **[sin fuente verificada para Colombia especificamente]**, basado en benchmarks de adaptacion de instrumentos restringidos comparables (MBTI, NEO-PI-R, WAIS).

### 5.4 Mercado clinico colombiano del SII

**Hecho:** En el mercado bogotano, la orientacion vocacional individual con psicologos clinicos certificados ronda los 70.000-160.000 COP por sesion (Doctoralia, Psychology Today; consultas 2026); programas integrales como Mentiall (3 fases) alcanzan 760.000 COP. **Inferencia:** este nicho B2B y B2C premium presencial es donde el SII tiene encaje natural en Colombia, no en freemium digital masivo.

### 5.5 Recomendacion operativa

**Opinion profesional:** ante la inexistencia de version comercial en espanol, la prohibicion contractual de auto-hospedaje y la disponibilidad de O*NET IP SF / Mi Proximo Paso (libre, en espanol), **no hay justificacion practica para asumir el costo de licencia y adaptacion del SII en DescubreMe**. La estrategia recomendada es mantener O*NET IP SF como instrumento RIASEC primario y, opcionalmente, capa de mapeo a la Clasificacion Nacional de Ocupaciones (CNO/DANE).

---

## SECCION 6 — LICENCIA Y PERMISOS (CRITICO)

### 6.1 Titularidad y regimen de copyright

**Hecho:** Copyright Strong Interest Inventory, Strong y Strong 244 propiedad de The Myers-Briggs Company (Sunnyvale, California). Marcas registradas Strong, Strong Interest Inventory, MBTI, Elevate. Cualquier reproduccion de items, vectores de pesos OS, algoritmos de scoring o reportes interpretativos sin autorizacion escrita constituye infraccion federal (DMCA EE. UU.; Convenio de Berna vigente en Colombia / LATAM).

**Hecho — texto literal APAC del editor:** *"the Strong instrument is what we call 'Restricted' and you need to be trained and certified to access and use it"* (themyersbriggs.com APAC, 2024-2026).

**Hecho — texto literal del editor sobre plataforma de compra:** *"all purchasing now happens through Elevate, including paper materials and digital books"* (themyersbriggs.com, 2024-2025).

### 6.2 Respuesta explicita a las 9 preguntas obligatorias

| # | Pregunta | Respuesta SII / Strong 244 |
|---|---|---|
| 1 | Tipo de licencia | **Copyright comercial "Restricted"** de The Myers-Briggs Company. Acceso condicionado a (a) certificacion Strong vigente, (b) calificacion BPS Test User: Occupational, Ability (ex Level A) en jurisdicciones con regulacion BPS, o (c) elegibilidad por grado academico equivalente (Educational Eligibility). No es Creative Commons, no es dominio publico, no admite uso libre. |
| 2 | ¿Permite uso comercial? | Si, dentro del marco de uso profesional autorizado (counseling, RR.HH., outplacement, investigacion), siempre via Elevate o distribuidores autorizados. **No permite redistribucion ni incorporacion libre en producto digital de terceros sin licencia enterprise negociada caso a caso.** |
| 3 | ¿Permite adaptacion y traduccion? | **No sin contrato formal con casa matriz.** La adaptacion debe ser auditada y aprobada por The Myers-Briggs Company; los distribuidores regionales no tienen autoridad para autorizar traducciones. |
| 4 | ¿Permite digitalizacion (web app) / self-host? | **No.** Toda administracion debe canalizarse exclusivamente a traves de Elevate (plataforma global del editor, vigente desde 2024-2025; consolida OPPassessment y shops legacy) o de plataformas de distribuidores autorizados (Psychometrics Canada, Human Development Solutions, JVR Africa Group). **No se permite self-hosting en infraestructura de terceros.** **No hay API publica REST.** |
| 5 | ¿Permite almacenar respuestas individuales? | Si dentro de la plataforma del editor. Almacenamiento externo requiere acuerdo de licencia enterprise especifico; sujeto a Ley 1581 de 2012 (Colombia, proteccion de datos personales). |
| 6 | Atribucion requerida | Si: citar Donnay, Morris, Schaubhut y Thompson (2005) para version 2004; Morris y Thompson (2026) para Strong 244; mencion explicita de marcas registradas Strong y Strong Interest Inventory. |
| 7 | Costo estimado uso comercial LATAM | **Verificado (mayo 2026):** Strong + Skills Confidence Inventory Profile USD 13.25 (catalogo historico 2021 The Career Project); Strong + Skills Confidence Profile + Strong Interpretive Report USD 20.25; via Psychometrics Canada por sistema de creditos: Strong Profile ~21 creditos (~USD 15), Strong + Interpretive Report ~33 creditos (~USD 24), Strong + Skills Confidence Profile ~26 creditos (~USD 19). **Strong 244 Profile lanzado enero 2026 sin precio publicado al cierre [sin fuente verificada para precio actual del 244 Profile en wholesale].** Retail consumer con sesion de interpretacion (Career Assessment Site): USD 96.95 referencial (posiblemente desactualizado tras transicion al SKU 244). **Rango operacional DescubreMe:** USD 13-30 por reporte mayorista, USD 25-100 retail. |
| 8 | Email / institucion de contacto | **The Myers-Briggs Company:** themyersbriggs.com (Sunnyvale, CA). **Distribuidor LATAM autorizado:** Human Development Solutions (Mexico) — humandevelopmentsolutions.com. **Norteamerica wholesale:** Psychometrics Canada — psychometrics.com. **EE. UU. retail consumer:** Career Assessment Site — careerassessmentsite.com. **Certificacion practitioner:** themyersbriggs.com/en-us/get-certified/strong. |
| 9 | Nivel de riesgo legal sin permiso | **ALTO.** Uso no autorizado del instrumento, su nombre o sus marcas registradas constituye infraccion de copyright y trademark; puede derivar en cease-and-desist, demanda civil y reclamo por danos. The Myers-Briggs Company es titular de marca y monitorea uso indebido activamente. |

### 6.3 Costos detallados verificados (mayo 2026)

**Wholesale Psychometrics Canada (CAD ≈ USD):**

| Producto | Creditos | Aprox USD |
|---|---|---|
| Strong Profile | 21 | ~15 |
| Strong + Interpretive Report | 33 | ~24 |
| Strong + Skills Confidence Profile | 26 | ~19 |
| Setup de plataforma distribuidor | n/a | ~99 (unico) |

**Retail consumer EE. UU.:**

| Producto | USD |
|---|---|
| Strong Profile con sesion de interpretacion (Career Assessment Site) | 96.95 (referencial, posiblemente desactualizado) |
| Strong + MBTI Combined Career Report (mercado outplacement) | 150-300+ |

**Catalogo The Career Project (catalogo historico 2021):**

| Producto | USD |
|---|---|
| Strong + Skills Confidence Inventory Profile | 13.25 |
| Strong + Skills Confidence Profile + Strong Interpretive Report | 20.25 |

**Certificacion Strong practitioner (The Myers-Briggs Company):**

- USD ~2.995 por persona (precio 2026 reportado por Paperbell; pagina oficial del editor no publica precio directo). Programa: 2 dias completos de formacion inmersiva + tareas previas + examen final (umbral >= 80 %).

### 6.4 Costo anual estimado LATAM por volumen freemium

**Hecho / Inferencia — escenarios DescubreMe asumiendo USD 20 promedio por administracion (mid-point del rango wholesale Strong + Interpretive Report):**

| Volumen anual de admins | Costo licencia anual (USD) | % del revenue freemium (ARPU paid USD 19.99 × 10.000 conversiones = USD 199.900) |
|---|---|---|
| 1.000 admins | USD 20.000 | 10 % |
| 5.000 admins | USD 100.000 | 50 % |
| 10.000 admins | **USD 200.000** | **100 % (margen cero)** |
| 25.000 admins | USD 500.000 | 250 % (margen estructuralmente negativo) |
| 100.000 admins (escala consumer LATAM viable) | **USD 2.000.000** | 1.000 % (inviabilidad absoluta) |

**Conclusion cuantitativa:** aun en el escenario mas favorable (USD 15/admin via Psychometrics Canada), el SII consume el 75-150 % del revenue freemium proyectado. Estructuralmente **incompatible** con un modelo B2C de USD 19.99/usuario. La integracion solo seria viable con pricing premium > USD 150/usuario (B2B corporativo / universidades).

### 6.5 Riesgo legal especifico

| Escenario | Nivel de riesgo |
|---|---|
| Usar items literales del SII sin licencia | **ALTO** — exposicion a demanda por copyright federal (DMCA + Convenio de Berna) |
| Usar version adaptada propia "inspirada en Strong" sin licencia | **MEDIO-ALTO** — parafrasis cercanas pueden activar accion por trabajo derivado |
| Distribuir reportes interpretativos sin licencia | **ALTO** — algoritmos OS y reportes PAR/MBC tambien protegidos |
| Usar marca "Strong" o "Strong Interest Inventory" en marketing sin permiso | **ALTO** — infraccion de trademark monitoreada |
| Usar O*NET IP SF como sustituto open | **BAJO** — dominio publico (US Department of Labor); replica el constructo RIASEC central |
| Usar SDS Forma R via PAR Inc. con licencia | **BAJO** si se negocia acuerdo digital; **MEDIO** sin acuerdo |

### 6.6 Plan B obligatorio (ya activo en stack v2.0)

**Opinion profesional:** dado que la hipotesis del proyecto se confirma (licencia The Myers-Briggs Company inviable para freemium LATAM), el Plan B **ya esta activado en el roadmap DescubreMe**:

1. **O*NET IP Short Form** (Rounds, Su, Lewis y Rivkin, 2010; 60 items, dominio publico, en stack v2.0) como instrumento RIASEC primario en Free + Paid v1.5.
2. **Mi Proximo Paso** (O*NET IP en espanol, libre) como cobertura idiomatica oficial.
3. **SDS Forma R** (Holland y Messer, 2013; PAR Inc.) como candidato P3 evaluable solo si PAR ofrece licencia digital razonable.
4. **18REST** (Ambiel et al., 2018; brasileno, validado, abierto) como referencia metodologica regional.
5. **SII** permanece como referencia teorica de validacion cruzada en documentacion interna; nunca se integra al stack implementable consumer.

---

## SECCION 7 — SCORING Y REGLAS DE PUNTUACION

### 7.1 Cuatro conjuntos principales de puntajes

**Hecho:**

1. **6 GOT (RIASEC):** puntajes estandar T (M = 50, DE = 10) referidos a la GRS, presentados como categorias *Very Little / Little / Moderate / High / Very High Interest*.
2. **30 BIS / 32 BIS en 244:** puntajes T sobre la GRS.
3. **244 OS / 243 OS + 321 ocupaciones de similitud en Strong 244:** *similarity scores* obtenidos por contraste empirico item a item entre el respondente y la muestra ocupacional respectiva. Interpretacion: *Similar Results / Mid-Range / Dissimilar Results*. **Los pesos por item son propiedad intelectual no publicada del editor.**
4. **5 PSS / 6 PSS en 244:** puntajes T bipolares (p. ej., Work Style: *Works with Ideas/Data/Things ↔ Works with People*).
5. **Indices administrativos:** Total Response Index, Typicality Index (Brophy, 2006), Item Response Percentages.

### 7.2 Normalizacion

**Hecho:**

- GOT, BIS y PSS se normalizan contra la GRS (T = 50, DE = 10).
- OS se construyen empiricamente: contraste de patrones de respuesta de la muestra ocupacional vs. la GRS; los pesos se asignan por diferencia item a item.
- **Strong 2004:** normaba por sexo (escalas separadas para hombres y mujeres en muchas OS).
- **Strong 244 (2023):** **elimina la normalizacion por sexo** y entrega puntajes genero-neutros con la GRS de 100.000 personas.

### 7.3 Baremos por edad / sexo / cultura

**Hecho:**

- La version 2004 mantiene baremos por sexo.
- La version 244 unifica por genero.
- **No existen baremos colombianos oficiales ni LATAM** para SII 2004 ni Strong 244; en uso comercial actual los puntajes se interpretan contra la GRS estadounidense, lo cual constituye una limitacion interpretativa material para usuarios colombianos.

### 7.4 Validez del protocolo

**Hecho:** Reglas oficiales del editor:

1. Aplicar Total Response Index para identificar respuesta incompleta.
2. Aplicar Typicality Index (Brophy, 2006) para detectar patrones invariantes o respuesta sin lectura.
3. Revisar Item Response Percentages para identificar uso extremo de la escala (p. ej., > 70 % "Strongly Like").
4. Invalidar protocolos con respuestas patologicamente uniformes.

---

## SECCION 8 — IMPLEMENTACION DIGITAL

### 8.1 Arquitectura propietaria del editor

**Hecho:** Toda administracion del SII debe canalizarse exclusivamente a traves de:

- **Elevate** (plataforma global de The Myers-Briggs Company, vigente desde 2024-2025; consolida OPPassessment y shops legacy).
- **Plataformas de distribuidores autorizados** (Psychometrics Canada, Human Development Solutions, JVR Africa Group).

**Hecho:** **No existe API publica REST del SII** para integracion programatica en plataformas de terceros. Las integraciones existentes se limitan a (a) deep links al portal del distribuidor para que el usuario complete el cuestionario y (b) recepcion del PDF de reporte via email o descarga manual.

### 8.2 Implicaciones para el stack DescubreMe

**Inferencia:** para el stack Next.js + Supabase + Vercel de DescubreMe:

- **No es posible self-host del cuestionario sin violar copyright.**
- **Integracion tecnicamente posible solo via:**
  1. **Redirect / iframe externo a Elevate o plataforma de distribuidor:** rompe UX del freemium, expone marca Myers-Briggs al usuario final, no permite reporte unificado con otros instrumentos del stack (BFI-2-S, PVQ-RR, O*NET IP SF, Core Strengths 18).
  2. **Negociacion de licencia enterprise con derechos de digitalizacion white-label:** estimado 12-24 meses de proceso legal + entrada USD 50.000-200.000 en honorarios + costo per-use ongoing.

**Opinion profesional:** la inviabilidad tecnica de digitalizar SII en el stack DescubreMe **es por si sola** razon suficiente para descartarlo del MVP, v1.5 y v2.0. Cualquier alternativa requeriria redisenar arquitectonicamente el flujo del producto.

### 8.3 UX y compliance (referencial, no aplicable a SII en DescubreMe)

- Tiempo de administracion SII (35-40 min) es prohibitivo en mobile-first B2C; tasa de abandono esperada > 40-50 % vs 5-15 % para O*NET IP SF (60 items, 10-15 min).
- Items de ocupaciones especificas pueden no resonar con el mercado laboral colombiano.
- Almacenamiento de respuestas individuales fuera del editor requiere acuerdo de licencia especifico; en Colombia, sujeto a Ley 1581 de 2012.

---

## SECCION 9 — MAPEO AL STACK DESCUBREME (POST v2.0)

### 9.1 Stack actual de DescubreMe

- BFI-2-S (M1 v1.5, Big Five jerarquico)
- IPIP-NEO-120 (upgrade Track A Paid opcional, 30 facetas Big Five)
- **O*NET IP Short Form** (RIASEC, en stack v2.0, dominio publico)
- PVQ-RR (valores)
- Core Strengths 18 (IPIP-VIA-R)
- Ryff PWB corta (bienestar eudaimonico)
- FSS-9 (flow)
- Modulo propio Karasek 14 (B2B-A)

### 9.2 Tabla comparativa amplia

| Atributo | **SII Strong 244 (2023)** | **SII Strong 2004 (291 items)** | **O*NET IP SF** | **SDS Forma R 5.a ed.** | **CISS (Campbell)** | **18REST (LATAM)** |
|---|---|---|---|---|---|---|
| Editor | The Myers-Briggs Company | The Myers-Briggs Company | US Department of Labor | PAR Inc. | Pearson | Academico abierto |
| Items | 244 | 291 | 60 | ~228 | 320 (200 interes + 120 skill) | 18 |
| Tiempo | 35-40 min | 35-40 min | 10-15 min | 35-45 min | 25-30 min | < 10 min |
| Edad minima | 13-14 | 13-14 | 12 | 13 | 18 | 13 |
| Alfa GOT | .90-.95 | .90-.95 | .77-.85 | .80-.90 | .85-.90 | .70-.85 |
| Capas adicionales | 32 BIS, 243 OS + 321 similitud, 6 PSS, 100 majors | 30 BIS, 244 OS, 5 PSS | Ninguna | Codigos ocupacionales, EOF, OF | 29 Basic, 60 Occupational | Ninguna |
| Scoring genero-neutro | Si | No (sex-typed) | Si | Parcial | Parcial | Si |
| Licencia | Restringida (certificacion + tarifa por uso) | Restringida | **Dominio publico** | Restringida (PAR Qualification Level A) | Restringida (Pearson Qualification Level B) | Abierta / academica |
| Costo USD/admin | 15-30 wholesale, 25-100 retail | 13-25 wholesale | **0** | 10-25 | bajo demanda | 0 |
| Self-host | **NO** | **NO** | **SI** (API publica de O*NET) | NO | NO | SI |
| Adaptacion al espanol | No oficial | No oficial | **Si** (Mi Proximo Paso, libre, en espanol) | SDS-R Martinez Vicente y Valls 2006 (EE. UU. / Espana); adaptable a Colombia con autorizacion PAR | Estudios academicos | Validado en portugues brasileno |
| Validez transcultural | Cuestionada | Cuestionada | Aceptable RIASEC en multiples paises | Aceptable | Limitada | Aceptable LATAM |
| Validez predictiva ocupacional | Alta (50+ anos OS) | Alta | Moderada (RIASEC puro) | Moderada-Alta | Moderada-Alta | Moderada |
| Apto B2C freemium LATAM | **NO** | **NO** | **SI** | **CONDICIONAL** | NO | **SI** |

### 9.3 SII vs O*NET IP SF (instrumento RIASEC primario v2.0)

| Criterio | SII Strong 244 | O*NET IP SF |
|---|---|---|
| Items | 244 | 60 |
| Tiempo usuario | 35-40 min | 10-15 min |
| Costo USD/admin | 15-30 wholesale, hasta 100 retail | 0 |
| Capas RIASEC (GOT) | 6 (T = 50, DE = 10) | 6 (escala 1-5 por dominio) |
| Capas adicionales | 32 BIS, 243 OS, 6 PSS, 100 majors | Ninguna |
| Tasa abandono esperada B2C | 40-50 % | 5-15 % |
| Licencia comercial | Restringida + certificacion practitioner | Dominio publico |
| Self-host | NO | SI (API publica) |
| Adaptacion al espanol | No oficial | Si (Mi Proximo Paso) |
| Validez RIASEC en muestras LATAM | No establecida formalmente | Aceptable (validado en circular unidimensional scaling, Rounds et al., 2010) |

**Veredicto cuantitativo del trade-off:** O*NET IP SF cubre el constructo RIASEC central (6 GOT) con alfa .77-.85 y validez circular hexagonal aceptable a 0 % del costo y 100 % de derecho de auto-hospedaje. SII anade 32 BIS, 243-321 OS empiricas, 6 PSS y 100 majors — todo ello con norma US-centrica, sin adaptacion al espanol y con costo de licencia inviable. **¿Aporta varianza unica al stack DescubreMe?** A nivel GOT (RIASEC): no, son funcionalmente equivalentes. A nivel BIS y OS: si aporta granularidad ocupacional incremental, pero (a) con titulos ocupacionales US, (b) requiere interpretacion profesional para evitar determinismo, y (c) duplica parcialmente el catalogo ocupacional que O*NET ya provee gratuitamente (~1.100 ocupaciones, 925 con descriptores completos, en O*NET Resource Center).

### 9.4 ¿Puede replicarse la base de datos ocupacional del SII con O*NET?

**Hecho:** O*NET Resource Center mantiene una base de datos publica de ~925-1.100 ocupaciones con descriptores en seis dominios (Tasks, Knowledge, Skills, Abilities, Work Activities, Work Context) y un mapeo RIASEC oficial por ocupacion. SII tiene 243-321 OS empiricas calibradas con muestras de profesionales satisfechos.

**Inferencia:** ambas bases responden a constructos diferentes:

- **SII OS** miden similitud entre el patron de respuestas del usuario y el patron de profesionales satisfechos en una ocupacion especifica (similarity score empirico). Requiere data primaria de profesionales por ocupacion.
- **O*NET** mapea cada ocupacion a un codigo RIASEC y permite recomendacion por congruencia entre el codigo del usuario y el codigo de la ocupacion (sin similitud empirica per se).

**Verdaderos sustitutos para DescubreMe:**

1. **O*NET puro:** recomendar ocupaciones por congruencia RIASEC del codigo del usuario con el codigo de cada ocupacion (~925 ocupaciones).
2. **O*NET + calibracion interna:** una vez DescubreMe acumule N >= 1.000 usuarios colombianos con datos de satisfaccion ocupacional 12-24 meses post-test, se puede calibrar pesos empiricos propios para ocupaciones colombianas relevantes (replicando la logica de OS sin licencia SII).

**Opinion profesional:** las 243-321 OS del SII **no se pueden replicar tecnicamente** desde O*NET sin recolectar data primaria de profesionales colombianos satisfechos por ocupacion (algo que DescubreMe podria hacer eventualmente con su base de usuarios). Para el caso de uso consumer freemium MVP1-v2.0, O*NET puro es suficiente; las OS solo son decisivas en outplacement ejecutivo y counseling intensivo de carrera, fuera del scope.

### 9.5 SII vs SDS Forma R (candidato P3)

**Inferencia:** SDS Forma R (Holland y Messer, 2013) es operacionalmente cercano al SII pero con licencia PAR Inc. mas accesible (USD 10-25/admin retail) y version SDS-R en espanol publicada (Martinez Vicente y Valls, 2006) aplicable a Colombia con autorizacion. Limitaciones: PAR Qualification Level A, no self-host, version espanol disenada para Espana. **Aporta varianza unica frente a O*NET:** si, anade escalas de competencias autoreportadas (EOF, OF) y codigo RIASEC de tres letras. **Recomendacion DescubreMe:** mantener como candidato P3 para evaluacion v2.5+ si PAR ofrece acuerdo digital razonable. Es el sustituto premium logico antes que SII.

### 9.6 SII vs PGI (P3)

**Inferencia:** Personal Globe Inventory (PGI) es un instrumento de Tracey con modelo esferico-circumplejo de intereses (mas complejo que el hexagono Holland); academico, abierto, pero menos consolidado en LATAM y sin adaptaciones validadas en Colombia. **Aporta varianza unica:** si, en investigacion academica; **no** en producto consumer B2C. Mantener como referencia teorica P3.

### 9.7 ¿SII aporta varianza unica sobre O*NET en el stack DescubreMe?

**Opinion profesional consolidada:** dentro del scope freemium B2C de DescubreMe (autoconocimiento + orientacion vocacional inicial + recomendacion de carreras), O*NET IP SF cubre el 80-90 % del valor informacional del SII a 0 % del costo. La varianza unica del SII (243-321 OS empiricas con prediccion de satisfaccion + 6 PSS + 100 majors) corresponde a usos B2B clinicos y de outplacement ejecutivo que estan **fuera del scope explicito** de DescubreMe.

### 9.8 Decision sobre la inclusion del SII en algun producto DescubreMe

**Opinion profesional:** **NO entra en MVP1, v1.5 ni v2.0.** Solo se reconsidera una integracion futura (> v3.0) si concurren simultaneamente al menos tres de:

1. DescubreMe pivota a Track B2B premium (universidades, programas de outplacement, areas de talento corporativo) con pricing >= USD 150/licencia.
2. Existe un practitioner certificado en el flujo (interno o partner via Human Development Solutions).
3. El cliente solicita explicitamente el branding "Strong" (requisito de RFP).
4. The Myers-Briggs Company lanza una version oficial en espanol para LATAM a precio <= USD 5/administracion con API publica.
5. ARPU consumer LATAM sostenido >= USD 25/mes.

---

## SECCION 10 — RED FLAGS ETICOS Y SESGOS

### 10.1 Sesgos de genero historicos

**Hecho:** Einarsdottir y Rounds (2009) documentan DIF en aproximadamente dos tercios de los items GOT/BI del SII; las normas anteriores a 2023 eran sex-typed. Su, Rounds y Armstrong (2009) confirman via meta-analisis que las diferencias de genero en intereses RIASEC (R d ~ 0.84 a favor de hombres; S d ~ -0.68 a favor de mujeres) tienden a reproducir estereotipos ocupacionales si no se corrigen psicometricamente.

**Hecho:** El Strong 244 (2023) corrige parcialmente este punto al adoptar scoring genero-neutro y eliminar la solicitud explicita del dato demografico de genero. Sin embargo, los items de fondo y las ocupaciones referenciadas siguen reflejando un mercado laboral US donde la segregacion ocupacional por genero opera. **Inferencia:** quedan sesgos residuales no medidos publicamente al cierre 2026.

### 10.2 Sesgos culturales y de SES

**Hecho:** Las 243-321 Occupational Scales se construyen a partir de muestras ocupacionales US empleadas y satisfechas. Ocupaciones colombianas y latinoamericanas relevantes (emprendimiento informal, oficios tecnicos regionales, sector cooperativo, economia naranja) estan subrepresentadas o ausentes. Fouad y Walker (2005) muestran Differential Bundle Functioning sustantivo entre grupos etnicos en EE. UU.

**Hecho:** Analisis multidimensional revelan una tercera dimension latente de prestigio / SES que contamina la lectura pura del modelo Datos-Ideas / Personas-Cosas. Individuos de estratos socioeconomicos bajos internalizan restricciones institucionales y autodescartan dominios percibidos inalcanzables.

### 10.3 Riesgo de determinismo vocacional

**Inferencia:** la presentacion de "ocupaciones similares" como rankings (similarity scores OS) genera, en usuarios sin interpretacion profesional, la lectura *"el test me dice que sea X"*. **DescubreMe NO es determinista** y debe evitar instrumentos que en la UX consumer puedan inducir esta lectura sin marco de orientacion humana.

### 10.4 Equidad cultural

**Inferencia:** aplicar normas US (GRS 100.000 EE. UU.) a usuarios colombianos genera (a) ocupaciones recomendadas que pueden no existir o no ser accesibles localmente, (b) escalas BIS sensibles a contexto cultural (p. ej., "Religion & Spirituality") con anclajes US-protestantes, (c) lectura potencialmente excluyente para usuarios indigenas, afrodescendientes y rurales.

### 10.5 Autoconcepto interdependiente

**Hecho / Inferencia:** En culturas con autoconcepto interdependiente (LATAM, Asia), las respuestas pueden variar segun si el respondente piensa en aspiraciones privadas o expectativas familiares. Esto desafia la presuncion de estabilidad temporal del constructo vocacional. **Mitigacion:** en B2B con counselor certificado, se contextualiza; en B2C autoadministrado, es un riesgo no manejable sin orientacion humana.

### 10.6 Mitigaciones obligatorias si se incluyera (escenario hipotetico)

**Opinion profesional:**

1. Reporte solo a nivel de GOT (RIASEC) en autoservicio; OS y BIS solo con interpretacion profesional certificada.
2. Disclaimer explicito y persistente: "este instrumento mide intereses declarados; las recomendaciones ocupacionales no son determinaciones; consulta con orientador o psicologo".
3. Practitioner certificado en el flujo (firma de reportes en escenario B2B).
4. No usar marca Strong en messaging consumer freemium para evitar asociacion con outplacement ejecutivo / clinico.
5. Derecho de eliminacion accesible en <= 2 clics, Ley 1581 de 2012.

**Inferencia consolidada:** estos costos eticos refuerzan la decision de **NO incluir** el SII en el stack consumer freemium. La mitigacion adecuada del posicionamiento clinico-elitista es estructuralmente incompatible con la promesa B2C de DescubreMe.

---

## SECCION 11 — LIMITACIONES Y CONTEXTO DE USO

1. **Posicionamiento clinico-elitista:** el SII esta historicamente cargado de uso en outplacement ejecutivo, counseling intensivo y desarrollo de liderazgo corporativo; contradice el posicionamiento de autoconocimiento freemium masivo.
2. **Costo prohibitivo para B2C freemium:** USD 13-30/admin × 10.000-100.000 admins/ano = USD 130.000 a USD 3.000.000 anuales.
3. **Sin API ni capacidad self-host:** incompatible con la arquitectura Next.js + Supabase + Vercel.
4. **Tiempo de administracion** (35-40 min) prohibitivo en mobile-first; tasas de abandono esperadas > 40-50 %.
5. **Sin version comercial vigente en espanol:** Strong 244 explicitamente "available in English only".
6. **Sin baremos colombianos ni LATAM:** T-scores con GRS estadounidense tienen validez ecologica limitada.
7. **Certificacion practitioner obligatoria:** USD ~2.995/persona; barrera operacional para escala consumer.
8. **DIF de genero y items culturalmente sensibles:** Einarsdottir y Rounds (2009); Fouad y Walker (2005).
9. **Validez transcultural cuestionada:** estructura hexagonal inestable fuera de EE. UU. (Rounds y Tracey, 1996).
10. **Rango etario:** uso recomendado >= 13-14 anos; intereses cristalizan progresivamente entre adolescencia tardia y juventud (Low et al., 2005).

---

## SECCION 12 — RECOMENDACION DE USO EN DESCUBREME

### 12.1 Decision accionable y CLARA sobre el destino del SII

**Opinion profesional — DECISION:** **EXCLUIR el Strong Interest Inventory (Strong 2004 / Strong 244) del stack implementable de DescubreMe en MVP1, v1.5 y v2.0.** Mantener como **referencia teorica de validacion cruzada** en documentacion interna del Track A Paid benchmark; reabrir solo bajo escenario B2B premium o pivot enterprise.

### 12.2 Tabla decisional por stage

| Stage DescubreMe | Decision SII Strong 244 | Decision SII Strong 2004 | Justificacion |
|---|---|---|---|
| MVP1 (actual) | **NO INCLUIR** | **NO INCLUIR** | Costo licencia + no self-host + no version en espanol |
| v1.5 (M1 BFI-2-S, Q1 2027) | **NO INCLUIR** | **NO INCLUIR** | O*NET IP SF domina en costo y self-host |
| v2.0 / v2.5 | **NO INCLUIR** | **NO INCLUIR** | Idem; evaluar SDS Forma R como alternativa P3 |
| v3.0 + Track B2B Premium | **CONDICIONAL** (solo si concurren los 5 triggers de Seccion 9.8) | NO (version 244 domina si se incluye) | Reabrir negociacion con Human Development Solutions |
| Track A Paid benchmark teorico | **MANTENER COMO REFERENCIA** en documentacion interna | MANTENER | Validacion cruzada de RIASEC interno vs gold standard |

### 12.3 Stack RIASEC recomendado para DescubreMe

- **Free + Paid v1.5 (default):** O*NET IP Short Form 60 items (dominio publico, en stack v2.0) — primary.
- **Cobertura idiomatica:** Mi Proximo Paso (O*NET IP en espanol, libre).
- **Capa de mapeo ocupacional:** O*NET Resource Center (~925-1.100 ocupaciones con codigos RIASEC oficiales) + Clasificacion Nacional de Ocupaciones (DANE-Colombia) como capa de localizacion.
- **Upgrade premium (evaluable v2.5+):** SDS Forma R via PAR Inc. si se logra acuerdo digital razonable.
- **Benchmark teorico:** SII mencionado en documentacion interna del equipo psicometrico como gold standard academico-comercial, pero **no incorporado al producto**.

### 12.4 ¿Strong fuera del stack o como upgrade premium con tarifa absorbida por usuario?

**Opinion profesional:** la opcion "upgrade premium con tarifa absorbida por usuario final" (p. ej., un SKU "DescubreMe Premium Vocacional" donde el usuario paga adicionalmente USD 30-50 por reporte SII) es **tecnicamente viable pero operacionalmente subóptima** por las siguientes razones:

1. **Fricción UX:** el usuario debe salir de DescubreMe y completar el cuestionario en Elevate o plataforma de distribuidor, recibir reporte por email y reintegrar la informacion. No hay reporte unificado nativo.
2. **Riesgo de marca:** exponer marca "Strong" y "The Myers-Briggs Company" en el flujo del producto puede desviar valor de marca de DescubreMe al editor.
3. **Necesidad de practitioner:** la interpretacion profesional requerida para OS / PSS no se puede delegar a IA; requiere humano certificado.
4. **Volumen minimo:** el SKU premium tendria volumen marginal (estimacion < 1-3 % de usuarios paid); el costo fijo de mantenimiento de la integracion (legal, soporte, certificacion interna de personal) no se justifica.

**Recomendacion definitiva:** **Strong fuera del stack consumer.** Si en el futuro DescubreMe lanza un Track B2B universitario o corporativo (>= USD 150/licencia institucional), evaluar partnership con Human Development Solutions (Mexico) para ofrecer SII como add-on B2B premium con practitioner certificado en el flujo. Mientras tanto, **no integrar el SII en ningun SKU consumer**.

### 12.5 Reversibilidad

**Opinion profesional:** la decision de excluir el SII es totalmente reversible. Re-incluirlo en el futuro requeriria:

- Negociacion con The Myers-Briggs Company / Human Development Solutions (6-12 meses).
- Certificacion de practitioner interno (USD 2.995 + 2-4 semanas).
- Implementacion de iframe / redirect a Elevate (4-8 semanas de desarrollo).
- Validacion legal del flujo bajo Ley 1090 de 2006 (ejercicio profesional psicologico Colombia) y Ley 1581 de 2012 (datos personales).

Por contraste, **incluir** ahora y luego excluir tendria costo hundido alto (licencias, certificaciones, integracion y comunicacion al usuario).

---

## SECCION 13 — PSEUDOCODIGO CONCEPTUAL DE SCORING

```
ADVERTENCIA LEGAL: pseudocodigo conceptual y educativo. La implementacion
operacional del SII por terceros esta PROHIBIDA por licencia. Ningun
sistema de DescubreMe debe ejecutar este algoritmo con datos de usuarios
reales sin contrato vigente con The Myers-Briggs Company. Los mapas de
items, vectores de pesos OS, baremos y algoritmos de reporte son propiedad
intelectual no publicada del editor.

ENTRADA:
  respuestas[1..291]   // SII Strong 2004, valores Likert 1..5
  o respuestas[1..244] // Strong 244 (2023), valores Likert 1..5
  metadatos: edad, sexo (Strong 2004), idioma (siempre ingles oficial)

PASO 1 — Validacion del protocolo:
  TRI := total_response_index(respuestas)
  typicality := typicality_index(respuestas)  // cf. Brophy (2006)
  item_pct := porcentaje_por_categoria_likert(respuestas)
  if (TRI < umbral) or (typicality fuera de rango): return invalid

PASO 2 — General Occupational Themes (GOT, 6 escalas RIASEC):
  PARA cada tema_RIASEC en {R, I, A, S, E, C}:
    items_tema := mapeo_GOT[tema_RIASEC]   // protegido por copyright
    raw[tema_RIASEC] := suma(respuestas[items_tema])
    T[tema_RIASEC] := normalizar_T(raw[tema_RIASEC],
                                   media_GRS[tema_RIASEC],
                                   sd_GRS[tema_RIASEC])
    banda[tema_RIASEC] := clasificar(T[tema_RIASEC],
        umbrales={"Very Little", "Little", "Moderate", "High", "Very High"})

PASO 3 — Basic Interest Scales (BIS, 30 en 2004 / 32 en 244):
  PARA cada bis en BIS_LIST:
    items_bis := mapeo_BIS[bis]   // protegido por copyright
    raw[bis] := suma(respuestas[items_bis])
    T[bis] := normalizar_T(raw[bis], media_GRS[bis], sd_GRS[bis])

PASO 4 — Occupational Scales (OS, 244 en 2004 / 243+321 en 244):
  // CRITICO: cada OS usa vector de pesos empiricos derivado por contraste
  // entre muestra ocupacional satisfecha y la GRS. NO es suma directa.
  PARA cada ocup en OCUPACIONES:
    pesos := pesos_OS[ocup]   // propiedad intelectual no publicada
    raw[ocup] := producto_punto(respuestas, pesos)
    similarity_score[ocup] := normalizar_T(raw[ocup],
                                           media_OS[ocup],   // muestra ocupacional
                                           sd_OS[ocup])
    interpretacion[ocup] := clasificar(similarity_score[ocup],
        umbrales={"Dissimilar" < 40, "Mid-Range" 40-49, "Similar" >= 50})

PASO 5 — Personal Style Scales (PSS, 5 en 2004 / 6 en 244):
  PARA cada pss en {WorkStyle, LearningEnv, Leadership, RiskTaking, TeamOrient}:
    items_pss := mapeo_PSS[pss]
    raw[pss] := suma_ponderada(respuestas[items_pss])
    T[pss] := normalizar_T(raw[pss], media_GRS[pss], sd_GRS[pss])
    polo[pss] := determinar_polo_bipolar(T[pss])

PASO 6 — Strong 244 adiciones (si version 244):
  PARA cada major en MAJORS[100 escalas]:
    similarity_score[major] := producto_punto(respuestas, pesos_major[major])

PASO 7 — Output:
  metadatos: version (2004 o 244), plataforma (Elevate o distribuidor),
             timestamp, tiempo_total, idioma (ingles)
  GOT: T[6], bandas
  BIS: T[30 o 32]
  OS: similarity_score[244 o 243+321], interpretacion
  PSS: T[5 o 6], polo
  Majors: T[100] si version 244
  Indices: TRI, typicality, item_pct
  NOTA: el reporte interpretativo requiere practitioner certificado
        (Strong Certification, ~USD 2.995, examen >= 80 %).
```

---

## SECCION 14 — GAPS DE INVESTIGACION Y PREGUNTAS ABIERTAS

1. **Validacion metrica del SII en muestras colombianas / LATAM contemporaneas.** No se identificaron estudios psicometricos publicados con muestras colombianas que reporten alfa, estructura factorial, invarianza por genero o validez predictiva del SII (versiones 2004 o 244). Existe el trabajo historico de Hansen y Fouad (1984) con poblacion hispanohablante en EE. UU., pero nada sobre el SII actual en Colombia. **Implicacion:** cualquier despliegue regional sin esta evidencia opera en zona psicometrica ciega.

2. **Comparacion empirica directa SII vs O*NET IP SF en utilidad incremental para decision vocacional.** La literatura compara estructuralmente RIASEC entre instrumentos, pero **no se identifico un estudio que cuantifique la utilidad incremental de las 243-321 OS del SII frente al IP SF** para predecir resultados vocacionales (matricula, persistencia, satisfaccion a 5 anos) en muestras hispanohablantes. Esta es la pregunta mas relevante para la decision costo-beneficio.

3. **Equivalencia metrica del Strong 244 (2023) con el Strong 2004.** El editor afirma continuidad ("certified Strong practitioners can start using it without recertification"), pero la literatura academica revisada por pares de equivalencia psicometrica entre 2004 y 244 es escasa al momento de este dossier.

4. **Sesgos algoritmicos en la version 244 genero-neutra.** La adopcion del scoring genero-neutro en 2023 es bienvenida eticamente, pero no se identificaron estudios publicos post-2023 que evaluen si la nueva norma genera DIF residual o redistribuye sesgos hacia otras dimensiones (etnia, nivel socioeconomico, contexto cultural).

5. **Precio oficial del Strong 244 Profile (post enero 2026).** El precio referencial de "32 creditos / ~USD 23" corresponde al producto Career Satisfaction Report descontinuado; el precio del 244 Profile no esta publicado en pagina accesible al cierre de mayo 2026. **[sin fuente verificada para precio actual del 244 Profile en wholesale.]**

6. **Costo real del Professional Manual y Technical Supplement.** Los precios oficiales del manual tecnico Donnay et al. (2005) y del Technical Supplement Morris y Thompson (2026) no estan publicados consistentemente. Estimacion **[sin fuente verificada]**: USD 150-300.

7. **API publica o programa partner Elevate.** The Myers-Briggs Company no publica programa partner para integracion white-label en producto digital de terceros. **Accion:** consultar themyersbriggs.com / Human Development Solutions si existe path tecnico hacia integracion.

8. **Adaptacion oficial al espanol post-2026.** No hay anuncio publico de The Myers-Briggs Company sobre adaptacion al espanol del Strong 244 al cierre de este dossier. **Accion:** monitorear comunicados del editor y de Human Development Solutions sobre productos LATAM.

9. **Validez de las OS para ocupaciones colombianas / LATAM.** Las 243-321 OS estan calibradas con muestras estadounidenses; no existe estudio que cuantifique la perdida predictiva al aplicarlas a usuarios colombianos.

---

## SECCION 15 — REFERENCIAS (APA 7)

### 15.1 Manuales oficiales del editor

- Donnay, D. A. C., Morris, M. L., Schaubhut, N. A., & Thompson, R. C. (2005). *Strong Interest Inventory manual: Research, development, and strategies for interpretation*. Consulting Psychologists Press / The Myers-Briggs Company. [sin DOI editorial; manual tecnico no indexado]
- Grutter, J., & Hammer, A. L. (2005). *Strong Interest Inventory user's guide*. Consulting Psychologists Press. [sin DOI]
- Harmon, L. W., Hansen, J. C., Borgen, F. H., & Hammer, A. L. (1994). *Strong Interest Inventory: Applications and technical guide*. Stanford University Press. [ISBN 978-0891060703]
- Herk, N. A., & Thompson, R. C. (2012). *Strong Interest Inventory manual supplement*. The Myers-Briggs Company. [sin DOI]
- Morris, M. L., & Thompson, R. C. (2026). *Technical supplement for the Strong 244 Assessment*. The Myers-Briggs Company. [reporte tecnico]

### 15.2 Validacion, propiedades psicometricas y validez predictiva

- Dik, B. J., & Hansen, J. C. (2004). Development and validation of discriminant functions for the Strong Interest Inventory. *Journal of Vocational Behavior, 64*(1), 182-197. https://doi.org/10.1016/S0001-8791(03)00046-0
- Donnay, D. A. C., & Borgen, F. H. (1996). Validity, structure, and content of the 1994 Strong Interest Inventory. *Journal of Counseling Psychology, 43*(3), 275-291. https://doi.org/10.1037/0022-0167.43.3.275
- Gasser, C. E., Larson, L. M., & Borgen, F. H. (2007). Concurrent validity of the 2005 Strong Interest Inventory: An examination of gender and major field of study. *Journal of Career Assessment, 15*(1), 23-43. https://doi.org/10.1177/1069072706294516
- Hansen, J. C., & Swanson, J. L. (1983). Stability of interests and the predictive and concurrent validity of the 1981 Strong-Campbell Interest Inventory for college majors. *Journal of Counseling Psychology, 30*(2), 194-201. https://doi.org/10.1037/0022-0167.30.2.194
- Low, K. S. D., Yoon, M., Roberts, B. W., & Rounds, J. (2005). The stability of vocational interests from early adolescence to middle adulthood: A quantitative review of longitudinal studies. *Psychological Bulletin, 131*(5), 713-737. https://doi.org/10.1037/0033-2909.131.5.713
- Morris, M. L. (2016). Vocational interests in the United States: Sex, age, ethnicity, and year effects. *Journal of Counseling Psychology, 63*(5), 604-615. https://doi.org/10.1037/cou0000164
- Nye, C. D., Su, R., Rounds, J., & Drasgow, F. (2012). Vocational interests and performance: A quantitative summary of over 60 years of research. *Perspectives on Psychological Science, 7*(4), 384-403. https://doi.org/10.1177/1745691612449021
- Nye, C. D., Su, R., Rounds, J., & Drasgow, F. (2017). Interest congruence and performance: Revisiting recent meta-analytic findings. *Journal of Vocational Behavior, 98*, 138-151. https://doi.org/10.1016/j.jvb.2016.11.002

### 15.3 Adaptaciones y validez cultural / racial-etnica / de genero

- Einarsdottir, S., & Rounds, J. (2009). Gender bias and construct validity in vocational interest measurement: Differential item functioning in the Strong Interest Inventory. *Journal of Vocational Behavior, 74*(3), 295-307. https://doi.org/10.1016/j.jvb.2009.01.003
- Fouad, N. A., & Mohler, C. J. (2004). Cultural validity of Holland's theory and the Strong Interest Inventory for five racial/ethnic groups. *Journal of Career Assessment, 12*(4), 423-439. https://doi.org/10.1177/1069072704267736
- Fouad, N. A., & Walker, C. M. (2005). Cultural influences on responses to items on the Strong Interest Inventory. *Journal of Vocational Behavior, 66*(1), 104-123. https://doi.org/10.1016/j.jvb.2003.12.003
- Goh, D. S. (2004). Factor structure of the Strong Interest Inventory with a Chinese high school sample. *Journal of Psychology: Interdisciplinary and Applied, 138*(2), 171-183. https://doi.org/10.3200/JRLP.138.2.171-184
- Hansen, J. C., & Fouad, N. A. (1984). Translation and validation of the Spanish form of the Strong-Campbell Interest Inventory. *Measurement and Evaluation in Guidance, 16*(4), 192-198. https://doi.org/10.1080/00256307.1984.12022356
- Su, R., Rounds, J., & Armstrong, P. I. (2009). Men and things, women and people: A meta-analysis of sex differences in interests. *Psychological Bulletin, 135*(6), 859-884. https://doi.org/10.1037/a0017364

### 15.4 Holland RIASEC, estructura, historia

- Holland, J. L. (1959). A theory of vocational choice. *Journal of Counseling Psychology, 6*(1), 35-45. https://doi.org/10.1037/h0040767
- Holland, J. L. (1997). *Making vocational choices: A theory of vocational personalities and work environments* (3rd ed.). Psychological Assessment Resources. [sin DOI; libro]
- Rounds, J., & Tracey, T. J. (1993). Prediger's dimensional representation of Holland's RIASEC circumplex. *Journal of Applied Psychology, 78*(6), 875-890. https://doi.org/10.1037/0021-9010.78.6.875
- Rounds, J., & Tracey, T. J. (1996). Cross-cultural structural equivalence of RIASEC models and measures. *Journal of Counseling Psychology, 43*(3), 310-329. https://doi.org/10.1037/0022-0167.43.3.310
- Tracey, T. J., & Rounds, J. (1993). Evaluating Holland's and Gati's vocational-interest models: A structural meta-analysis. *Psychological Bulletin, 113*(2), 229-246. https://doi.org/10.1037/0033-2909.113.2.229

### 15.5 Instrumentos comparados

- Ambiel, R. A. M., Hauck-Filho, N., Barros, L. O., Martins, G. H., Abrahams, L., & De Fruyt, F. (2018). 18REST: A short RIASEC-interest measure for large-scale educational and vocational assessment. *Psicologia: Reflexao e Critica, 31*, Article 2. https://doi.org/10.1186/s41155-018-0086-z
- Campbell, D. P. (2002). The history and development of the Campbell Interest and Skill Survey. *Journal of Career Assessment, 10*(2), 150-168. https://doi.org/10.1177/1069072702010002002
- Holland, J. L., & Messer, M. A. (2013). *Self-Directed Search (SDS) Form R, 5th edition: Professional manual*. Psychological Assessment Resources. [sin DOI; manual]
- Martinez Vicente, J. M., & Valls Fernandez, F. (2006). Aplicacion de la version espanola del Self-Directed Search (SDS-R) de Holland a una muestra de estudiantes universitarios. *Apuntes de Psicologia, 24*(1-3), 141-158. [sin DOI verificado] **[sin fuente verificada para DOI]**
- Rounds, J., Su, R., Lewis, P., & Rivkin, D. (2010). *O*NET Interest Profiler Short Form psychometric characteristics: Summary*. National Center for O*NET Development. https://www.onetcenter.org/dl_files/IPSF_Psychometric.pdf

### 15.6 Fuentes de licencia, precios y distribucion

- The Myers-Briggs Company. (2024). *Strong Interest Inventory product page*. https://www.themyersbriggs.com/en-US/Products-and-Services/Strong
- The Myers-Briggs Company. (2023). *All about the new Strong 244 career and interest assessment*. https://www.themyersbriggs.com/en-US/Access-Resources/Articles/all-about-the-new-strong-244-career-and-interest-assessment
- The Myers-Briggs Company. (2024). *Strong Interest Inventory Certification*. https://www.themyersbriggs.com/en-us/get-certified/strong
- Psychometrics Canada. (2024). *Strong Interest Inventory 244 product page*. https://www.psychometrics.com/assessments/strong-244-assessment/
- Career Assessment Site. (2024). *Strong Interest Inventory Myers-Briggs combined report*. https://careerassessmentsite.com/strong-interest-inventory/myers-briggs/
- JVR Africa Group. (2024). *Strong Interest Inventory product catalogue*. https://jvrafricagroup.co.za/catalogue/strong

### 15.7 Brecha academica colombiana y contexto LATAM

- Revisión bibliométrica sobre inventarios de intereses vocacionales en Colombia 2012-2022. *Tempus Psicológico*, Universidad de Manizales. https://revistasum.umanizales.edu.co/index.php/tempuspsi/article/view/4987
- Congreso de la Republica de Colombia. (2012). Ley 1581 de 2012 — Proteccion de datos personales.
- Congreso de la Republica de Colombia. (2006). Ley 1090 de 2006 — Ejercicio profesional de la psicologia.
- International Test Commission. (2017). *ITC Guidelines for Translating and Adapting Tests* (2nd ed.). https://www.intestcom.org/files/guideline_test_adaptation_2ed.pdf

---

## CAVEATS FINALES

- **Norma colombiana inexistente:** todos los baremos del SII son estadounidenses (Strong 2004 sex-typed; Strong 244 genero-neutro con GRS = 100.000). Aplicacion en Colombia opera con validez ecologica limitada.
- **Sin version oficial en espanol:** Strong 244 explicitamente "available in English only" segun Psychometrics Canada; ninguna adaptacion comercial vigente de The Myers-Briggs Company al cierre mayo 2026.
- **Costo y arquitectura cerrados:** USD 13-30/admin mayorista + certificacion practitioner USD 2.995 + sin self-host + sin API publica. Estructuralmente incompatible con freemium B2C LATAM.
- **Validez psicometrica solida:** alfa GOT .90-.95, test-retest .74-.92, validez predictiva ocupacional >50 anos, gold standard academico-comercial. El problema NO es la calidad del instrumento; es la incompatibilidad del modelo de licenciamiento con el caso de uso DescubreMe.
- **Hipotesis confirmada:** SII sale del stack implementable de DescubreMe. Mantener O*NET IP SF como instrumento RIASEC primario en stack v2.0 y subsiguientes; evaluar SDS Forma R como upgrade P3 si PAR ofrece acuerdo digital; reservar SII unicamente para escenario B2B premium futuro con practitioner certificado en el flujo.
- **Trazabilidad de divergencia:** este dossier consolida sintesis de Claude y Gemini. En datos psicometricos criticos (alfa GOT, OS, GRS, costos wholesale) ambos coincidieron. Datos unicos de Gemini integrados: dimorfismo vocacional N = 1.283.110 (Morris, 2016), efecto SES / prestigio (Prediger, 1982), autoconcepto interdependiente LATAM (Markus y Kitayama, 1991), brecha academica colombiana 89 % (Tempus Psicológico, 2024), benchmark de precios en orientacion vocacional bogotana (Doctoralia, Mentiall). Datos unicos de Claude integrados: estructura de licencia y costos detallados (Psychometrics Canada, Career Assessment Site, The Career Project), plan B explicito con O*NET / SDS / 18REST, comparativa cuantitativa SII vs O*NET, recomendacion accionable por stage.

---

*Cierre del dossier consolidado v2.1 — Listo para revision cientifica y de producto antes de v2.0.*
