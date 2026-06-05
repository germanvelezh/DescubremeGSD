# VIA-IS-P — Cognitive Pilot Field Kit v1.0

**Tipo:** Field kit ejecutable — instrumentación completa de piloto cognitivo cualitativo. **NO es un reporte de piloto ejecutado.** Los datos de campo y el `..._REPORT.md` se generan cuando un equipo o agencia ejecute las sesiones con participantes reales.
**Companion de:** `VIA-IS-P-96_Implementation_Acquisition_Pack_v1.0_Consolidado.md` (§5 textos, §7 disclaimers, §8 protocolo, §6 licencia) y `VIA-IS-P_S5_UX_REFINEMENT_v1.1_DIFF.md`.
**Autor:** Cowork (Rol: Investigador psicométrico senior + UX Researcher senior).
**Versión:** 1.0 — 2026-05-23. **Estado:** DRAFT para sign-off de German.
**Carry que cierra (al ejecutarse):** `[GAP-VIA-PLUGIN]` items (3)+(4) — extensión UI middle/bottom.
**Gating:** Project License de VIA Institute firmada (sin urgencia hasta Q3 2026). Sub-gating: exposición UI de textos middle/bottom al usuario.

---

## Resumen ejecutivo

Este field kit instrumenta el piloto cognitivo cualitativo (n=8-15 colombianos) que valida los 78 textos de interpretación VIA-IS-P (24 fortalezas × 3 niveles + 6 virtudes) antes de exponer al usuario los niveles `tier_middle` y `tier_bottom`. El objetivo crítico es verificar que la etiqueta `tier_bottom` "Fortaleza en segundo plano" se lea como orientación descriptiva y no como déficit o juicio ("soy débil en X"). El kit cubre solo los textos de reporte (no la adaptación léxica de los 96 ítems del cuestionario, que iría en un kit aparte análogo al O*NET). Tiene dos partes: Parte A — 10 secciones ejecutables de campo (alcance, muestreo bundle-compatible, screener, consentimiento, guion, mock estímulo, captura, codebook, plantillas de output, logística); Parte B — revisión experta de escritorio de los 24 textos `tier_bottom` con watchlist priorizada. El reclutamiento está diseñado para tomar el subset VIA (8-15) de un panel compartido con los pilotos O*NET y NFR-27/28. La decisión final (APROBAR / re-redactar / DEFER la exposición UI) la determinan los criterios de §A-8.

**Supuestos explícitos:**
1. El estímulo del módulo reading-mode es un caso ficticio estandarizado (decisión German 2026-05-23), no las respuestas propias del participante.
2. La cobertura de los 78 textos en el think-aloud es por bloques rotados; cada texto recibe n≈3-5 lecturas. Es exploratorio por diseño y se declara así en cada output.
3. El reporte a VIA Institute (output #5) se entrega como plantilla; se activa solo si el campo deriva en re-adaptaciones sustanciales (cláusula ToS "no modifications without written permission").
4. Este kit es textos-only. La validación léxica de los 96 ítems del cuestionario no está en alcance.

**Faltantes que afinarían el kit (acción German pre-campo):**
- Razón social / NIT de DescubreMe para el consentimiento §A-4 (mismo pendiente que el kit O*NET).
- Plazo de retención de las grabaciones post-piloto (§A-4).
- Confirmar incentivo final por participante (asumido USD 15 + USD 5 si la sesión es parte del bundle).

---

# PARTE A — FIELD KIT EJECUTABLE

## A-1. Alcance, objetivos y preguntas de investigación

### A-1.1 Objeto de validación

Los 78 textos de la §5 v1.1 del pack VIA-IS-P:
- 72 textos de fortaleza = 24 fortalezas × 3 niveles (`tier_top` / `tier_middle` / `tier_bottom`).
- 6 textos de virtud (agrupación temática).

Etiquetas UX es-CO oficiales (sign-off Cowork S-9 Prompt 3), que el participante verá:
- `tier_top` → **"Fortaleza distintiva"**
- `tier_middle` → **"Fortaleza de apoyo"**
- `tier_bottom` → **"Fortaleza en segundo plano"** (reencuadre no-déficit)

### A-1.2 Objetivos

1. **Comprensión (objetivo heredado, pack §8.2):** verificar que los textos se entienden, son coherentes con el constructo y están libres de regionalismos o confusión léxica.
2. **Reading-mode emocional (objetivo nuevo, foco del kit):** verificar que cada nivel produce la reacción emocional esperada y, en particular, que `tier_bottom` NO se lea como déficit o juicio sobre la persona.

### A-1.3 Preguntas de investigación

| # | Pregunta | Módulo que la responde |
|---|---|---|
| RQ1 | ¿Los textos se comprenden sin confusión léxica ni regionalismos? | Think-aloud (§A-5.3) |
| RQ2 | ¿La interpretación del participante es coherente con la fortaleza descrita? | Think-aloud (§A-5.3) |
| RQ3 | ¿Cómo se siente el participante al leer cada una de las 3 etiquetas? | Reading-mode (§A-5.4) |
| RQ4 | ¿"Fortaleza en segundo plano" se lee como categoría descriptiva/aspiracional o como déficit/juicio? | Reading-mode (§A-5.4) |
| RQ5 | ¿Qué pensaría el participante de sí mismo si solo recibiera el texto `tier_bottom`? | Reading-mode, probing emocional (§A-5.4) |

### A-1.4 Fuera de alcance

- Adaptación léxica de los 96 ítems del cuestionario VIA-IS-P (kit independiente).
- Piloto cuantitativo n=150-300 / AFC (pack §8.1, fase posterior).
- Validación de baremos (no hay baremo colombiano; el plugin reporta ranking intra-individual — DD-84).

### A-1.5 Diseño de cobertura de textos (rotación)

Leer los 78 textos en voz alta con cada participante no cabe en una sesión de 60-90 min. Diseño:

- **Think-aloud (RQ1, RQ2):** los 24 fortalezas se reparten en **3 bloques de 8 fortalezas** (24 textos por bloque: 8 × 3 niveles). Cada participante recibe **un bloque**, asignado round-robin. Con 9-15 participantes, cada bloque lo ven 3-5 personas → cada texto recibe **n≈3-5 lecturas**. Las 6 virtudes (textos cortos y contextuales) las leen todos.
- **Reading-mode (RQ3, RQ4, RQ5):** mock ficticio **fijo**, idéntico para todos los participantes → la señal emocional sobre las 3 etiquetas tiene n=8-15 completo (máxima potencia sobre la pregunta crítica RQ4).

**Bloques de rotación:**

| Bloque | Fortalezas (orden de lectura) |
|---|---|
| Bloque 1 | Creatividad, Curiosidad, Apertura mental, Amor por el aprendizaje, Perspectiva, Valentía, Perseverancia, Honestidad |
| Bloque 2 | Vitalidad, Amor, Amabilidad, Inteligencia social, Trabajo en equipo, Imparcialidad, Liderazgo, Capacidad de perdonar |
| Bloque 3 | Humildad, Prudencia, Autorregulación, Apreciación de la belleza, Gratitud, Esperanza, Humor, Espiritualidad |

**Advertencia de potencia:** n≈3-5 por texto es **exploratorio**. Los criterios cuantitativos de §A-8.4 (umbrales de %) se aplican con rigor solo al módulo reading-mode (n completo). Para la comprensión por-texto, los porcentajes son señales cualitativas; la decision matrix marcará "evidencia limitada" donde n<4 y un patrón claro no emerja.

---

## A-2. Muestreo y cuotas (bundle-compatible)

### A-2.1 Tamaño

n = 8-15. Objetivo operativo: **12** (permite 4 participantes por bloque de rotación).

### A-2.2 Diseño bundle

El reclutamiento toma el **subset VIA** de un panel compartido de ~30-40 colombianos urbanos reclutado para los tres pilotos pre-launch (O*NET, NFR-27/28, VIA). La sesión VIA es **dedicada** (60-90 min), no se combina con las otras en la misma cita. El screener (§A-3) es el screener maestro del panel; este kit añade solo las cuotas específicas VIA.

### A-2.3 Cuotas de estratificación (mínimos, pack §8.1)

| Variable | Cuota | Nota |
|---|---|---|
| Género | ≥4 hombres + ≥4 mujeres + ≥2 personas no binarias | Para n=12: 5 + 5 + 2 |
| Edad | 3 bandas: 18-32, 33-46, 47-60 | ≥3 por banda |
| Región | ≥30% fuera de Bogotá | Para n=12: ≥4 fuera (Medellín, Cali, Barranquilla y ≥1 municipio rural o intermedio) |
| Escolaridad | Mezcla: ≥3 sin educación superior completa | Evita sesgo de muestra solo universitaria; los textos van a población adulta general |

### A-2.4 Asignación a bloques de rotación

Asignar bloque round-robin **cruzando** las cuotas: cada bloque debe quedar mixto en género, edad y región (no concentrar Bogotá en un solo bloque). Registrar la asignación en la hoja de control de reclutamiento.

### A-2.5 Criterios de exclusión

- Profesionales de psicología, psicometría o RR. HH. en ejercicio (sesgo de experto).
- Personas que hayan respondido el VIA-IS / VIA Survey en los últimos 12 meses.
- Vínculo personal o laboral con DescubreMe o con el equipo del proyecto.

---

## A-3. Screener de reclutamiento

> Instrumento de filtro. Se aplica por formulario o llamada corta antes de agendar. Tiempo: 4-6 min.

**Introducción (leer):** "Hola, estamos invitando a personas a participar en un estudio sobre cómo se entienden unos textos de un test de autoconocimiento. Es una conversación virtual de una hora aproximadamente, con un incentivo de [USD 15 / valor en COP]. ¿Te puedo hacer unas preguntas cortas para ver si el perfil encaja?"

| # | Pregunta | Uso |
|---|---|---|
| S1 | ¿Cuál es tu edad? | Cuota de banda etaria. Excluir <18 o >60. |
| S2 | ¿Con qué género te identificas? (hombre / mujer / no binario / otro / prefiero no decir) | Cuota de género. |
| S3 | ¿En qué ciudad o municipio vives actualmente? | Cuota de región. |
| S4 | ¿Cuál es tu nivel educativo más alto alcanzado? | Cuota de escolaridad. |
| S5 | ¿Trabajas o estudias actualmente en psicología, psicometría, recursos humanos o selección de personal? | Excluir si sí. |
| S6 | ¿Has respondido un test de fortalezas de carácter o "VIA Survey" en el último año? | Excluir si sí. |
| S7 | ¿Tienes computador o celular con cámara, micrófono e internet estable para una videollamada de una hora? | Requisito técnico. Excluir si no. |
| S8 | ¿Tienes algún vínculo personal o laboral con el proyecto DescubreMe o su equipo? | Excluir si sí. |
| S9 | ¿Aceptarías que la sesión se grabe (audio y video) solo para fines de análisis interno? | Pre-consentimiento. Si no acepta, no se puede incluir. |

**Cierre si califica:** "Gracias, tu perfil encaja. Te enviaré un correo con la fecha, el enlace y un documento de consentimiento para que lo leas antes." **Cierre si no califica:** agradecer sin revelar el criterio de exclusión.

---

## A-4. Consentimiento informado (Ley 1581 de 2012)

> Se envía por escrito 24-48 h antes y se relee verbalmente en el minuto 1 de la sesión. El participante da consentimiento verbal grabado y, si es viable, firma digital.

**[PENDIENTE GERMAN — completar antes de campo]:** razón social y NIT de DescubreMe; plazo de retención de grabaciones; correo del responsable de tratamiento de datos.

---

### Documento de consentimiento informado — Piloto cognitivo VIA-IS-P

**Quién hace el estudio.** [Razón social — PENDIENTE], responsable del proyecto DescubreMe, con NIT [PENDIENTE].

**Para qué.** Mejorar la claridad de unos textos de un producto educativo de autoconocimiento. Tu participación ayuda a que esos textos se entiendan bien y se sientan respetuosos.

**Qué vas a hacer.** Una videollamada de 60 a 90 minutos. Vas a leer unos textos en voz alta y a contarnos cómo los entiendes y cómo te hacen sentir. No hay respuestas correctas ni incorrectas, y no se te evalúa a ti: evaluamos los textos.

**Grabación.** La sesión se graba en audio y video solo para que el equipo pueda analizarla después. Las grabaciones se guardan de forma segura y se eliminan luego de [plazo — PENDIENTE]. No se publican ni se comparten fuera del equipo de investigación.

**Tratamiento de datos (Ley 1581 de 2012).** Tus datos personales (nombre, contacto, datos demográficos) y la grabación se tratan de forma confidencial y solo para este estudio. En los reportes internos se usan seudónimos (P1, P2, …); no se te identifica por nombre. Tienes derecho a conocer, actualizar, rectificar y suprimir tus datos, y a revocar esta autorización, escribiendo a [correo responsable — PENDIENTE].

**Voluntariedad.** Participar es voluntario. Puedes pausar o terminar la sesión en cualquier momento, o saltar cualquier pregunta, sin dar explicaciones y sin perder el incentivo acordado.

**Incentivo.** Recibes [USD 15 / valor en COP] por participar, al finalizar la sesión.

**Naturaleza del material.** Los textos que vas a leer provienen de un test **educativo y de orientación personal. No es un diagnóstico clínico** ni una herramienta de selección laboral. Si en algún momento un texto te genera incomodidad, puedes detenerte; al final de este documento encuentras líneas de apoyo.

**Si en algún momento te sientes incómodo emocionalmente:** puedes hacer una pausa o terminar. En Colombia puedes llamar gratis, 24/7, a la **Línea 106** (Bogotá) o a la **Línea 192 opción 4** (nacional). En emergencias, **123**.

**Consentimiento.**
- [ ] He leído y entendido este documento, resolví mis dudas y acepto participar.
- [ ] Autorizo la grabación en audio y video con los fines aquí descritos.
- [ ] Autorizo el tratamiento de mis datos personales conforme a la Ley 1581 de 2012.

Nombre: ____________________  Fecha: __________  Firma / consentimiento verbal grabado: __________

---

## A-5. Guion de sesión (60-90 min)

> Moderador: una persona. Idealmente un segundo miembro del equipo toma notas. Plataforma: Google Meet o Zoom con grabación. El moderador NO es psicólogo clínico; si surge malestar, aplica §A-5.5.

### A-5.1 Estructura y tiempos

| Bloque | Tiempo | Contenido |
|---|---|---|
| 0. Bienvenida y consentimiento | 5 min | Relectura del consentimiento, confirmación verbal, inicio de grabación |
| 1. Briefing think-aloud | 5 min | Explicar el método, encuadre "no se te juzga" |
| 2. Think-aloud de textos (1 bloque de rotación) | 35-45 min | 24 textos de fortaleza + 6 de virtud, con probing |
| 3. Módulo reading-mode emocional | 12-15 min | Mock ficticio fijo + preguntas RQ3-RQ5 |
| 4. Debrief | 8-10 min | Percepción global, cierre |
| **Total** | **65-80 min** | Margen hasta 90 min para sesiones lentas |

### A-5.2 Bloque 1 — Briefing think-aloud (5 min, leer)

"Vamos a hacer algo que se llama 'pensar en voz alta'. Te voy a mostrar unos textos cortos. Te pido que los leas en voz alta y que después me cuentes, con tus palabras, qué entendiste: qué crees que significa ese texto y de qué crees que habla. No hay respuestas correctas ni incorrectas. **No te estamos evaluando a ti; estamos evaluando si los textos están bien escritos.** Si algo no se entiende, eso es información valiosa para nosotros, no un error tuyo. ¿Tienes alguna duda antes de empezar?"

### A-5.3 Bloque 2 — Think-aloud de textos (35-45 min)

El moderador comparte en pantalla un texto a la vez (sin la descripción técnica interna, que es de uso interno). Por cada texto:

1. **Lectura en voz alta** por el participante.
2. **Pregunta de comprensión abierta:** "Con tus palabras, ¿qué entendiste de este texto?"
3. **Pregunta de mapeo al constructo (sin pista):** "¿De qué cualidad o característica de una persona crees que habla?"
4. **Probing dirigido** solo si aparece duda, silencio largo, una palabra cuestionada o una interpretación dudosa (ver banco de probes §A-5.6).

Orden: las 8 fortalezas del bloque asignado, leyendo los 3 niveles de cada fortaleza seguidos (top → middle → bottom) para observar si el participante percibe la gradación. Luego las 6 virtudes.

**Regla del moderador:** no explicar el texto ni "corregir" al participante. Si pregunta "¿está bien lo que dije?", responder: "No hay bien ni mal, me sirve mucho saber cómo lo leíste tú."

### A-5.4 Bloque 3 — Módulo reading-mode emocional (12-15 min)

Foco del kit. El moderador comparte el **mock ficticio estandarizado** (§A-6): un reporte de ejemplo de una persona ficticia con las 3 etiquetas visibles y un texto representativo por nivel.

**Encuadre (leer):** "Ahora te voy a mostrar un ejemplo de cómo se vería un reporte de este test. No es tu reporte: es el de una persona inventada para este ejercicio. Quiero que imagines que es tuyo y me cuentes cómo te sentirías al recibirlo."

Mostrar el mock completo 30-40 segundos para lectura. Luego, **por cada nivel en este orden** (top → middle → bottom):

1. "¿Cómo te sentirías al leer que algo es una **'[etiqueta]'**?"
2. "Si te dijeran solo eso de ti, ¿qué pensarías de ti mismo?" (probing emocional, RQ5)
3. Para `tier_bottom` específicamente, además: "Cuando lees **'Fortaleza en segundo plano'**, ¿lo entiendes como algo que te falta, como algo que tienes pero usas menos, o como otra cosa? Cuéntame."

**Pregunta de cierre del módulo:** "Si este reporte fuera tuyo, ¿qué parte te quedaría dando vueltas? ¿Por qué?"

**Regla del moderador:** no inducir la respuesta. Evitar preguntas como "¿no te parece positivo?". Si el participante guarda silencio, esperar; el silencio ante `tier_bottom` es dato relevante.

### A-5.5 Bloque 4 — Debrief (8-10 min)

- "En general, ¿cómo te pareció el test del que vienen estos textos?"
- "¿Hubo alguna palabra o frase que te sonara rara, de otro país, o difícil?"
- "Si un amigo tuyo recibiera este reporte, ¿se lo recomendarías? ¿Por qué?"
- Agradecimiento, confirmación del incentivo, cierre de grabación.

### A-5.6 Banco de probes (usar solo cuando aplique)

- Confusión léxica: "Mencionaste la palabra '[X]'. ¿Qué significa para ti? ¿La usarías tú?"
- Confusión conceptual: "Me dijiste que el texto habla de [Y]. ¿Qué parte del texto te llevó a eso?"
- Regionalismo: "¿Esa expresión la dirías así, o de otra forma donde tú vives?"
- Reacción emocional plana: "¿Y eso cómo te haría sentir: bien, mal, ni una cosa ni la otra?"
- Señal de déficit en `tier_bottom`: "Cuando dices que '[suena a que algo está mal / soy débil]', ¿el texto lo dice o es la sensación que te deja? ¿Qué palabra te da esa sensación?"

### A-5.7 Protocolo de contención (si surge malestar emocional)

Si el participante muestra angustia, llanto o reporta malestar sostenido:
1. Pausar el ejercicio. No continuar con el texto.
2. Validar sin interpretar: "Gracias por contarme. Lo que sientes es válido. Podemos parar aquí."
3. Ofrecer terminar la sesión manteniendo el incentivo completo.
4. Recordar las líneas de apoyo del consentimiento (Línea 106 Bogotá / Línea 192 opción 4 nacional / 123 emergencias).
5. No dar consejo clínico. El moderador no diagnostica ni aconseja tratamiento.
6. Registrar el incidente en la hoja de captura (campo "incidencias") para revisión del equipo.

---

## A-6. Mock estímulo — reporte ficticio estandarizado

> Estímulo fijo del módulo reading-mode. Idéntico para los 8-15 participantes. Es un caso ficticio: ningún dato es real. Se comparte en pantalla con el formato de abajo (puede maquetarse como imagen para mayor realismo, sin cambiar el texto).

**Decisión de diseño del estímulo:** el texto `tier_bottom` del mock es **Autorregulación**, un texto de riesgo medio-alto sin disclaimer clínico. Es deliberado: poner a prueba el reencuadre no-déficit con una fortaleza común y exigente. Los textos `tier_bottom` de riesgo alto con disclaimer clínico (Esperanza, Vitalidad — pack §7.2) NO se usan como estímulo fijo para no confundir la reacción a la etiqueta con la reacción al contenido sensible; se cubren en el think-aloud rotado (Bloque 3) con probing reforzado.

---

### [INICIO DEL MOCK — mostrar al participante]

**Tu mapa de fortalezas — Reporte de ejemplo**

*Persona de ejemplo: Daniela, 34 años.*

Este reporte ordena tus 24 fortalezas de carácter de la que más te caracteriza hoy a la que menos. No es un puntaje contra otras personas: es tu propio orden interno. Todas son fortalezas; lo que cambia es cuánto las usas en este momento de tu vida.

**Tus fortalezas distintivas** (parte alta de tu ranking)
1. Creatividad
2. Curiosidad
3. Amor por el aprendizaje
4. Apreciación de la belleza
5. Perspectiva

> **Creatividad — Fortaleza distintiva**
> Generar ideas y soluciones originales es una de tus marcas. Esa cualidad enriquece tus proyectos y abre caminos donde otros ven muros. Por ser tan tuya, vale la pena vigilar el sobreuso: a veces buscar lo novedoso desplaza lo que ya funciona bien. Tu creatividad rinde más cuando se combina con criterios de viabilidad.

**Tus fortalezas de apoyo** (zona media de tu ranking)
… Honestidad, Gratitud, Amabilidad, Trabajo en equipo, Liderazgo …

> **Amabilidad — Fortaleza de apoyo**
> Eliges cuándo y a quién ofrecer tu ayuda, sin sentirte obligado siempre. Esa selectividad cuida que puedas sostenerla en el tiempo. Observa si hay alguien cercano a quien no estás viendo.

**Tus fortalezas en segundo plano** (parte baja de tu ranking)
… Prudencia, Humor, Espiritualidad, Liderazgo, Autorregulación

> **Autorregulación — Fortaleza en segundo plano**
> Llevar adelante hábitos sostenidos te resulta difícil hoy, y eso es muy común. El autocontrol se entrena en pasos pequeños: ¿cuál es la rutina mínima que sí podrías sostener tres días seguidos esta semana?

*Este reporte describe tendencias en tu forma de actuar y pensar hoy; no es un diagnóstico ni define quién serás. Tus fortalezas pueden cambiar con la experiencia y la práctica.*

### [FIN DEL MOCK]

---

## A-7. Hoja de captura por participante

> Una hoja por sesión. La completa el moderador o el note-taker en vivo; se complementa con la grabación. Recomendado: replicar como pestaña de un libro Excel/Sheets, una fila por texto.

**Encabezado de sesión:** Seudónimo (P__) · Fecha · Moderador · Bloque de rotación (1/2/3) · Género · Banda etaria · Ciudad/región · Escolaridad · Duración real · Incidencias (sí/no + descripción).

**Captura think-aloud — una fila por texto leído (24 fortaleza + 6 virtud):**

| Campo | Contenido |
|---|---|
| Fortaleza / Virtud | Nombre |
| Nivel | tier_top / tier_middle / tier_bottom / virtud |
| Verbatim de comprensión | Cita textual de lo que dijo el participante |
| Mapeo al constructo | Fortaleza que el participante nombró (RQ2) |
| Palabra(s) cuestionada(s) | Si las hubo |
| Marca preliminar moderador | comprensión: a/b/c/d/e (provisional; la codificación formal es §A-8) |
| Probes aplicados | Sí/No + cuáles |

**Captura reading-mode — una fila por nivel (3 filas):**

| Campo | Contenido |
|---|---|
| Etiqueta | Fortaleza distintiva / de apoyo / en segundo plano |
| Verbatim reacción emocional (RQ3) | Cita textual |
| Verbatim "qué pensarías de ti" (RQ5) | Cita textual |
| Para tier_bottom: ¿déficit, tenencia con menor uso, u otra cosa? (RQ4) | Cita textual |
| Marca preliminar emocional | i/ii/iii/iv/v (provisional) |

**Cierre:** verbatim del debrief (percepción global, regionalismos detectados, recomendaría sí/no).

---

## A-8. Codebook, plan de análisis y criterios de decisión

### A-8.1 Procedimiento de codificación

- **Dos codificadores independientes** codifican cada sesión a partir de la grabación y la hoja de captura.
- Codifican por separado; luego se calcula acuerdo y se reconcilian discrepancias en reunión.
- Acuerdo inter-codificador: reportar **porcentaje de acuerdo** y **Cohen's kappa** por cada esquema (comprensión y emocional). Meta: kappa ≥ .70. Si kappa < .60, revisar definiciones del codebook y recodificar.
- Las discrepancias no reconciliadas se elevan a un tercer codificador (sénior).

### A-8.2 Esquema de comprensión (pack §8.2 — una codificación por texto leído)

| Código | Categoría | Definición operativa |
|---|---|---|
| a | Comprensión correcta | El participante reformula el sentido del texto correctamente y mapea el texto a la fortaleza correcta sin pista. |
| b | Reformulación con sentido equivalente | Usa otras palabras pero el sentido es equivalente al del texto; mapeo al constructo correcto. |
| c | Confusión léxica | Una o más palabras no se entienden o se entienden mal, pero el sentido general se preserva. |
| d | Confusión conceptual | El participante entiende algo distinto de lo que el texto quiere decir, o mapea el texto a la fortaleza equivocada. |
| e | Regionalismo | Una expresión se identifica como ajena, de otro país, o "no se dice así aquí", aunque se entienda. |

Nota: `c` y `e` pueden coexistir con `a`/`b`. Para los cómputos de §A-8.4, "comprensión correcta" = `a` o `b`; "interpretación coherente" = mapeo al constructo correcto sin pista.

### A-8.3 Esquema emocional reading-mode (NUEVO — una codificación por nivel por participante)

| Código | Categoría | Definición operativa |
|---|---|---|
| i | Positivo | El participante expresa una emoción claramente positiva (orgullo, agrado, validación). |
| ii | Neutro-aspiracional | Reacción no negativa orientada a crecimiento o posibilidad ("es algo que puedo trabajar / desarrollar"). |
| iii | Neutro-descriptivo | Lo lee como una descripción objetiva, sin carga emocional ("es un dato sobre cómo soy / uso hoy"). |
| iv | **Déficit / juicio (RIESGO)** | Lo lee como carencia, debilidad, fracaso o juicio sobre su valor ("soy malo en esto", "me falta", "estoy fallando"). |
| v | Confuso | No logra formar una reacción clara, o la reacción es ambivalente sin poder resolverla. |

Para los cómputos de §A-8.4, **"lectura positiva de `tier_bottom`"** = códigos `ii` o `iii` (la categoría `i`, positivo pleno, también cuenta como no-riesgo pero no es lo esperado para `tier_bottom`; reportarla aparte).

### A-8.4 Criterios de decisión

**A. Comprensión por texto (pack §8.3 — heredado).** Se aplica con la advertencia de potencia de §A-1.5 (n≈3-5 por texto: porcentajes como señal cualitativa).

| Resultado | Criterio | Decisión |
|---|---|---|
| Aceptar sin cambio | ≥80% comprensión correcta (a/b) Y ≥70% interpretación coherente | Texto pasa |
| Re-adaptar (léxico menor) | comprensión 60-79% O coherencia 50-69% | Ajuste de palabra/expresión, sin cambiar el constructo |
| Reformular sustancialmente | comprensión <60% O coherencia <50% | Reescritura; requiere validación con VIA Institute |

**B. Reading-mode emocional — `tier_bottom` "Fortaleza en segundo plano" (NUEVO — n completo 8-15).** Este es el criterio que gobierna la exposición UI.

| Resultado | Criterio | Decisión |
|---|---|---|
| **APROBAR exposición UI middle/bottom** | ≥80% de los participantes leen `tier_bottom` como `ii` o `iii` | CC implementa la extensión v1.2 (ver §A-9 / downstream) |
| **Re-redactar invitación** | 50-79% lectura positiva (`ii`/`iii`) | Re-redactar la "invitación a la reflexión" del nivel bottom + considerar prefijo descriptivo (texto propuesto abajo). Repiloto del módulo reading-mode antes de aprobar. |
| **DEFER exposición UI indefinidamente** | <50% lectura positiva O **≥20% lectura como déficit/juicio (`iv`)** | DEFER. Escalar a Cowork PM. Mantener solo `tier_top` en UI v1.0. Reubicar middle/bottom en una capa Paid con disclaimer expandido. Re-categorizar el carry como `[DEFER-PAID-DISCLAIMER]`. |

Nota: la condición de DEFER es disyuntiva. Aunque la lectura positiva supere el 50%, **si ≥20% lee `tier_bottom` como `iv` (déficit/juicio), la decisión es DEFER**, no re-redacción. El riesgo ético manda sobre el promedio.

**Prefijo descriptivo propuesto** (para el escenario de re-redacción): anteponer al bloque `tier_bottom` la frase — *"Estas fortalezas no son tu foco actual, pero siguen disponibles para ti cuando las necesites."*

**C. `tier_top` y `tier_middle` (reading-mode).** Resultado esperado: `tier_top` mayoritariamente `i`; `tier_middle` mayoritariamente `ii`/`iii`. Si `tier_top` produce `iv` (p. ej. el lenguaje de sobreuso se lee como crítica) o `tier_middle` produce `iv` ("apoyo" se lee como "second best"), registrarlo como hallazgo y recomendar ajuste de redacción, aunque no bloquea la exposición UI por sí solo.

### A-8.5 Umbral de escalamiento a Cowork PM

Escalar antes de cerrar el reporte si: (a) se cumple el criterio DEFER; (b) kappa inter-codificador <.60 tras recodificar; (c) aparece un patrón de malestar emocional en ≥2 sesiones atribuible a un texto específico; (d) se detecta que un texto induce una interpretación contraria al constructo (riesgo de mensaje equivocado al usuario).

---

## A-9. Plantillas de output

El equipo que ejecute el campo produce, en `implementation_packs/`, el archivo `VIA-IS-P_COGNITIVE_PILOT_v1.0_REPORT.md` con las siguientes secciones.

### Output 1 — Reporte cualitativo de comprensión (78 textos)

Tabla con: fortaleza/virtud, nivel, n de lecturas, % comprensión correcta (a/b), % coherencia, regionalismos detectados (verbatims), confusiones léxicas (verbatims), marca de "evidencia limitada" si n<4 sin patrón claro.

### Output 2 — Decision matrix 24 × 3 (+ 6 virtudes)

Una fila por fortaleza, una columna por nivel; cada celda con la decisión de §A-8.4-A: `Aceptar` / `Re-adaptar léxico` / `Reformular`. Fila adicional para las 6 virtudes. Columna de notas con la justificación.

### Output 3 — Reading-mode emocional report (foco `tier_bottom`)

- KPI principal: **% de lectura positiva (`ii`/`iii`) de `tier_bottom`** sobre n total, con intervalo.
- Distribución completa `i/ii/iii/iv/v` por las 3 etiquetas.
- **% de lectura como déficit (`iv`)** destacado por separado (gobierna el criterio DEFER).
- Verbatims ilustrativos por categoría, en especial todo `iv`.
- Veredicto: APROBAR / Re-redactar / DEFER, con el criterio de §A-8.4-B citado.

### Output 4 — Recomendación de UX writing

Ajustes concretos a la "invitación a la reflexión" de la banda `tier_bottom`; decisión sobre el prefijo descriptivo propuesto; ajustes a `tier_top`/`tier_middle` si §A-8.4-C los detectó.

### Output 5 — Reporte a VIA Institute (plantilla, condicional)

Se completa **solo si** el campo deriva en re-adaptaciones sustanciales (decisión "Reformular" en §A-8.4-A). Cumple la cláusula ToS "no modifications without written permission". Estructura: instrumento y versión, textos afectados, cambio propuesto vs. original, justificación cognitiva (datos del piloto), solicitud de aprobación escrita. Si el campo solo produce "Aceptar" y re-redacción de invitaciones (textos de DescubreMe, no ítems VIA), este output es de prioridad baja — confirmar con la negociación de licencia (pack §9, pregunta 5: política de VIA sobre bandas interpretativas de terceros).

### Downstream Claude Code (no es output de Cowork)

- Si el veredicto es **APROBAR**: CC actualiza `lib/plugins/via-isp-report.ts` a v1.2 (constantes `VIA_TIER_MIDDLE_TEXTS` + `VIA_TIER_BOTTOM_TEXTS`, 48 strings; narrative emite las 24 fortalezas) + componente `<StrengthsRanking>` con las 3 etiquetas + disclaimer empírico. Cierra `[GAP-VIA-PLUGIN]` items (3)+(4).
- Si el veredicto es **DEFER**: CC mantiene el plugin v1.1 (solo `tier_top` en UI v1.0); middle/bottom se evalúan para la capa Paid con disclaimer expandido; el carry se re-categoriza `[DEFER-PAID-DISCLAIMER]`.

---

## A-10. Logística y cronograma

### A-10.1 Roles

| Rol | Responsabilidad |
|---|---|
| Coordinador de campo | Reclutamiento, agenda, incentivos, control de cuotas |
| Moderador | Conduce las sesiones (puede ser 1-2 personas) |
| Note-taker | Apoya captura en vivo (opcional pero recomendado) |
| Codificador 1 y 2 | Codificación independiente |
| Codificador sénior | Reconcilia discrepancias; síntesis |

### A-10.2 Cronograma estimado (4-6 semanas)

| Fase | Duración | Notas |
|---|---|---|
| Reclutamiento | 1-2 semanas | Más demandante por estratificación 4+4+2 géneros + ≥30% fuera de Bogotá. Coordinado con el panel bundle. |
| Sesiones | 1-2 semanas | 8-15 sesiones de 60-90 min |
| Codificación | 1 semana | ~15-20 h, dos codificadores |
| Síntesis (outputs 1-4) | 1 semana | ~10-15 h |
| **Total Cowork-equivalente** | **4-6 semanas** | ~40-60 h de research distribuidas |

### A-10.3 Presupuesto

- Incentivos: 8-15 × [USD 15 + USD 5 si bundle] = ~USD 160-300.
- Agencia de muestreo cualitativo (si se usa): según cotización local.

### A-10.4 Riesgos operativos

| Riesgo | Mitigación |
|---|---|
| No completar las cuotas de no binarias / región rural | Empezar el reclutamiento por las cuotas difíciles; ampliar canales; aceptar municipio intermedio si rural estricto no es viable (declararlo). |
| Sesión se alarga >90 min | El bloque de rotación limita a 8 fortalezas; el moderador controla el ritmo del think-aloud. |
| El estímulo mock se percibe poco realista | Maquetar el mock como imagen con apariencia de producto real. |
| Sesgo de deseabilidad social en el reading-mode | Encuadre "no es tu reporte, es de una persona inventada"; probing por la reacción, no por el juicio de calidad. |
| Codificación inconsistente | Calibración previa: los dos codificadores codifican juntos 1-2 sesiones piloto antes de codificar por separado. |

---

# PARTE B — REVISIÓN EXPERTA DE ESCRITORIO

> Análisis previo al campo (desk review) de los 24 textos `tier_bottom` de la §5 v1.1 del pack. Objetivo: anticipar dónde es más probable la lectura como déficit/juicio (categoría `iv`) para priorizar el probing en campo. Es un juicio experto, no evidencia empírica; el piloto lo confirma o refuta.

`Inferencia:` el reencuadre no-déficit de la §5 v1.1 está, en general, bien construido: la mayoría de los textos `tier_bottom` nombran un beneficio del menor uso ("aporta estabilidad", "libera tiempo", "cuida tu energía"), afirman que la fortaleza sigue disponible y cierran con una invitación de bajo costo. El riesgo no es uniforme. Tres patrones lo elevan: (1) atribuir al participante una conducta socialmente evaluada (evitar, no terminar, parecer arrogante); (2) tematizar contenido emocionalmente sensible (energía baja, futuro que pesa); (3) describir una dificultad sin un beneficio compensatorio igual de explícito.

## B-1. Clasificación de riesgo de los 24 textos `tier_bottom`

| Riesgo | Fortaleza | Motivo del riesgo |
|---|---|---|
| **Alto** | Esperanza | "El futuro te pesa más que te inspira" puede co-ocurrir con desesperanza; ya marcada como sensible (pack §7.2). El texto incluye disclaimer clínico, lo que es correcto pero también señala al lector que "esto es serio". |
| **Alto** | Vitalidad | "Tu energía hoy se mueve en un registro más bajo" puede leerse como señal de fatiga o anhedonia; sensible (pack §7.2); incluye disclaimer clínico. |
| **Medio-alto** | Valentía | "Prefieres evitar situaciones donde algo importante esté en juego" puede leerse como cobardía o evitación, pese al matiz "puede ser una forma de cuidarte". |
| **Medio-alto** | Autorregulación | "Llevar adelante hábitos sostenidos te resulta difícil hoy" describe una dificultad directa; el atenuante "es muy común" ayuda, pero el verbo "te resulta difícil" es explícito. |
| **Medio-alto** | Inteligencia social | "Las dinámicas sociales a veces te parecen confusas o desgastantes" puede leerse como torpeza social. |
| **Medio** | Perseverancia | "Varios proyectos quedan abiertos… falta de claridad" puede leerse como ser inconstante o poco confiable. |
| **Medio** | Honestidad | "Mostrarte tal cual eres puede traer costos, por eso te cuidas" roza la idea de no ser auténtico. |
| **Medio** | Humildad | "Sueles mostrar tus logros con bastante claridad" puede leerse como arrogancia, aunque el texto la enmarque como sana en contextos competitivos. |
| **Medio** | Capacidad de perdonar | "Algunas heridas siguen presentes" puede leerse como rencor; el texto lo valida bien ("respuesta válida cuando hubo daño"). |
| **Medio** | Amor | "Las relaciones cercanas no ocupan el primer plano" puede leerse como frialdad o aislamiento. |
| **Medio** | Imparcialidad | "Sueles priorizar a tu círculo cercano" puede leerse como ser parcial o injusto. |
| **Medio** | Gratitud | "Te cuesta detenerte en lo positivo" tematiza contenido cercano a lo afectivo-negativo. |
| **Bajo-medio** | Apertura mental | "Confías en tus primeras impresiones" tiene contrapeso claro ("agiliza decisiones"). |
| **Bajo-medio** | Amabilidad | "Proteges tu energía y tu tiempo" enmarcado como autocuidado legítimo. |
| **Bajo-medio** | Liderazgo | "Tomar la conducción no te resulta natural" con contrapeso ("deja espacio para otras formas de aporte"). |
| **Bajo-medio** | Prudencia | "Te mueves rápido y aceptas riesgos" enmarcado como impulso y avance. |
| **Bajo-medio** | Espiritualidad | "Las preguntas sobre sentido no ocupan un lugar central" con encuadre de etapa legítima. |
| **Bajo** | Creatividad | "Recurres más a soluciones probadas" con beneficio explícito ("aporta estabilidad"). |
| **Bajo** | Curiosidad | "Te mueves dentro de territorios conocidos" con beneficio ("concentración y eficiencia"). |
| **Bajo** | Amor por el aprendizaje | "Aprender por aprender no es tu motor" con beneficio ("libera tiempo"). |
| **Bajo** | Perspectiva | "No lo reclamas como tuyo… está en reposo" reencuadre no-déficit fuerte. |
| **Bajo** | Trabajo en equipo | "Prefieres trabajar por tu cuenta" enmarcado como sostén de productividad. |
| **Bajo** | Apreciación de la belleza | "Tu atención está en lo funcional" enmarcado como elección legítima. |
| **Bajo** | Humor | "El humor no es hoy tu vía principal" con encuadre de etapa legítima. |

Resumen: 2 alto, 3 medio-alto, 7 medio, 5 bajo-medio, 7 bajo.

## B-2. Watchlist priorizada para el campo

Probing reforzado obligatorio en estos 7 textos `tier_bottom` (todos caen en los Bloques 1 y 3 de rotación, ninguno se omite por diseño):

1. **Esperanza** (Bloque 3) — verificar que el disclaimer clínico no convierta la lectura en alarma.
2. **Vitalidad** (Bloque 1) — íd.
3. **Valentía** (Bloque 1) — verificar lectura "cobardía" vs. "autocuidado".
4. **Autorregulación** (Bloque 3, también estímulo del mock) — doble evidencia: think-aloud rotado + reading-mode n completo.
5. **Inteligencia social** (Bloque 2) — verificar lectura "torpeza social".
6. **Perseverancia** (Bloque 1) — verificar lectura "poco confiable".
7. **Honestidad** (Bloque 1) — verificar lectura "no auténtico".

Probe específico para la watchlist: *"Cuando lees esto, ¿sientes que el texto te está señalando algo que está mal en ti, o que está describiendo algo que simplemente usas menos por ahora? ¿Qué palabra exacta te da esa sensación?"*

## B-3. Recomendación preliminar de redacción (a confirmar con el campo)

`Opinión profesional:` si el piloto activa el escenario de re-redacción (§A-8.4-B, 50-79% lectura positiva), el ajuste de mayor rendimiento esperado es el **prefijo descriptivo** de bloque ya propuesto en §A-8.4. Razón: mueve el encuadre fuera de cada texto individual y lo fija una sola vez para toda la banda, lo que reduce el riesgo de que un texto suelto se lea aislado como déficit. Como ajuste secundario, en los textos medio-alto y alto conviene revisar el verbo de apertura: "te resulta difícil" (Autorregulación) y "prefieres evitar" (Valentía) son las formulaciones más expuestas a lectura `iv`. Esta recomendación es preliminar; el campo decide.

---

## Changelog

**v1.0 — 2026-05-23.** Creación. Field kit ejecutable del piloto cognitivo VIA-IS-P, textos-only, reading-mode emocional con foco en `tier_bottom`. Alcance, panel bundle-compatible y estímulo ficticio estandarizado confirmados por German (2026-05-23). Pendientes pre-campo: razón social/NIT, plazo de retención de grabaciones, correo del responsable de datos.

*Fin del field kit. Al ejecutarse el campo, los resultados se consignan en `VIA-IS-P_COGNITIVE_PILOT_v1.0_REPORT.md`.*
