# Field Kit — Piloto Cognitivo Lexical es-CO · O*NET Interest Profiler Short Form (60 ítems, RIASEC)

**Producto destino:** DescubreMe (LATAM, foco Colombia) · **Versión:** 1.0 · **Fecha:** 2026-05-23
**Rol Cowork:** Investigador psicométrico senior + UX Researcher
**Insumo base:** `implementation_packs/O-NET-IP-SF_Implementation_Acquisition_Pack_v1.0_Consolidado.md` §2.2, §7.4, §8, §9
**Carry asociado:** P1 lexical CO O*NET (BACKLOG) · **Prompt origen:** Prompt 1 de `estado/sprints/PRE-LAUNCH_cowork_pilotos_consolidado.md`

---

## AVISO DE ALCANCE — LEER ANTES DE USAR

`Hecho:` Este documento **no es un reporte de piloto**. Es el **field kit**: la instrumentación lista para que un equipo humano ejecute el piloto cognitivo descrito en el pack §8.

`Hecho:` Cowork no recluta participantes, no conduce sesiones think-aloud, no codifica transcripciones humanas y no genera datos. Las métricas del pack §8.4 (α por dimensión, % de comprensión por ítem, mediana de tiempo) **solo existen tras el trabajo de campo real** y deben llenarse en las plantillas de la §A-9 / archivo `.xlsx` complementario.

`Opinión profesional:` Producir esas métricas sin datos reales sería fabricación de datos y contaminaría el Validation Study que exige la O*NET Tools Developer License (Standards AERA, APA & NCME; pack §6.3). Por la misma razón, el archivo se nombra `..._FIELD_KIT_...` y no `..._REPORT_...`: el nombre no debe implicar que existen datos.

**Estados de promoción de `cultural_adaptation.ucp_status`:**

| Estado | Significado | Quién lo habilita |
|---|---|---|
| `translated` | Traducción base sembrada (estado actual CC pre-S9) | CC, ya hecho |
| `cognitive_pilot` | Piloto cognitivo ejecutado y log de cambios aplicado | Requiere ESTE field kit ejecutado por equipo humano + Migration CC posterior |

CC no debe promover a `cognitive_pilot` hasta que exista log de cambios con datos reales. Production launch de O*NET user-facing está bloqueado hasta esa promoción.

---

## PARTE A — FIELD KIT EJECUTABLE (BUNDLE-COMPATIBLE)

### A-1. Alcance y encaje en el bundle de panel único

`Hecho:` STATUS 2026-05-23 propone correr los tres pilotos pre-launch Cowork-owned sobre **un solo panel** de colombianos urbanos, en lugar de tres reclutamientos separados. Este field kit está diseñado para esa opción.

**Arquitectura del bundle:**

| Estudio | Instrumento | n analizado | Formato de sesión | Dueño del protocolo |
|---|---|---|---|---|
| Prompt 1 (este kit) | O*NET IP-SF lexical | 30–36 (todo el panel) | Sesión O*NET 45 min | Este documento |
| Prompt 3 | NFR-27 / NFR-28 | 6–8 (subset) | Follow-up 15 min en la misma sesión O*NET | `NFR-27_NFR-28_COGNITIVE_PILOT_v1.0_REPORT.md` (pendiente) |
| Prompt 2 | VIA-IS-P | 8–15 (subset) | Sesión dedicada 60–90 min, otro día | `VIA-IS-P_COGNITIVE_PILOT_v1.0_REPORT.md` (pendiente) |

**Reglas de encaje:**

- Todo participante del panel hace la sesión O*NET de 45 min. El piloto O*NET analiza el panel completo (n ≈ 30–36), lo que supera el mínimo de 20–30 del pack §8.1.
- Un subset de 6–8 participantes hace, a continuación y en la misma cita, el follow-up NFR-27/28 de 15 min (sesión total ≈ 60 min para ese subset). Este field kit provee únicamente el **hook de transición** (§A-5, paso 4). El contenido del módulo NFR-27/28 lo define el Prompt 3; no se reproduce aquí.
- Un subset de 8–15 participantes es invitado a una **segunda cita** para la sesión VIA-IS-P. Ese protocolo lo define el Prompt 2.
- El screener (§A-3) marca elegibilidad para los tres estudios; la asignación final de subsets se coordina entre los tres dueños de prompt antes del trabajo de campo.

`Inferencia:` Si Germán decide correr los pilotos **serial** en lugar de bundle, este kit funciona sin cambios: basta ignorar el hook NFR-27/28 (§A-5 paso 4) y reclutar n = 20–30 solo para O*NET. La compatibilidad con bundle no impone costo al modo serial.

**Supuesto explícito:** se asume panel de **Colombia urbana** (Bogotá, Medellín, Cali y otras ciudades). El pack §8.2 admite "andina rural si es viable"; este kit lo trata como opcional y lo marca en la cuota como celda flexible.

---

### A-2. Plan de muestreo y cuotas

**Tamaño objetivo del panel:** reclutar **40**, analizar **mínimo 30** (colchón de ~25% por inasistencia y por sesiones inválidas).

**Variables de estratificación (pack §8.2):**

| Variable | Distribución objetivo | Sobre N = 36 (meta de análisis) |
|---|---|---|
| Ciudad | 50% Bogotá / 25% Medellín o Cali / 25% otras ciudades | 18 / 9 / 9 |
| Nivel educativo | ~33% secundaria / ~33% técnico-tecnológico / ~33% universitario | 12 / 12 / 12 |
| Género | 50% / 50% | 18 / 18 |
| Edad | Rango 18–55, distribución libre con mínimo en cada franja | ≥6 en 18–25, ≥6 en 26–40, ≥6 en 41–55 |

**Matriz de celdas de cuota (meta de análisis N = 36):**

Las cuotas son marginales (no se cruzan todas las variables). Llenar primero ciudad × educación, luego balancear género y edad dentro de cada celda.

| Ciudad | Secundaria | Técnico-tecnológico | Universitario | Subtotal |
|---|---|---|---|---|
| Bogotá | 6 | 6 | 6 | 18 |
| Medellín / Cali | 3 | 3 | 3 | 9 |
| Otras ciudades | 3 | 3 | 3 | 9 |
| **Subtotal** | **12** | **12** | **12** | **36** |

Dentro de cada celda de 6: 3 hombres / 3 mujeres. Dentro de cada celda de 3: alternar género entre celdas para cerrar 18/18 global. Edad: vigilar que ninguna franja quede por debajo de 6 en el total.

**Criterios de inclusión:**

- Edad 18–55 años cumplidos.
- Reside actualmente en Colombia.
- Español como lengua materna o de dominio pleno.
- Lectura funcional en pantalla (el instrumento es autoadministrado en pantalla).
- Capaz de verbalizar su pensamiento en voz alta (se valida en el screener con una microtarea, §A-3).

**Criterios de exclusión:**

- Formación o ejercicio profesional en psicometría, orientación vocacional, lingüística o traducción (sesga el think-aloud: evalúan el ítem como expertos, no como usuarios).
- Haber respondido el O*NET Interest Profiler o "Mi Próximo Paso" en los últimos 12 meses (efecto de familiaridad).
- Participación previa en pruebas de usabilidad o piloto cognitivo de DescubreMe.
- Discapacidad visual no corregida que impida lectura en pantalla (no es criterio de exclusión social; es una limitación de validez para *este* piloto lexical específico; ver nota de accesibilidad abajo).

**Nota de accesibilidad y límite de alcance.** Este piloto valida **comprensión lexical en lectura**. No cubre accesibilidad para personas con discapacidad visual, lectores de pantalla ni baja alfabetización digital severa. El pack (Apéndice A8) registra el compromiso de accesibilidad Sección 508 / WCAG AA heredado del O*NET; la validación de accesibilidad es un estudio separado y debe planearse aparte. Declararlo así en el reporte final evita sobre-afirmar el alcance.

---

### A-3. Screener de reclutamiento

Aplicar por teléfono, formulario web o agencia de muestreo. Texto listo para usar; tuteo cordial colombiano.

**Presentación (no revela el detalle del estudio para no sesgar):**

> Hola, gracias por tu interés. Estamos invitando a personas en Colombia a participar en una sesión para **mejorar un cuestionario digital sobre intereses laborales**. La sesión dura unos 45 minutos, es virtual o presencial según te quede mejor, y recibes una compensación por tu tiempo. Te voy a hacer unas preguntas cortas para confirmar si el perfil encaja. No hay respuestas correctas o incorrectas.

**Bloque 1 — Elegibilidad básica**

1. ¿Cuántos años tienes? `___` → *Excluir si < 18 o > 55.*
2. ¿En qué ciudad vives actualmente? `___` → *Registrar; clasificar en Bogotá / Medellín / Cali / Otra.*
3. ¿Hace cuánto vives en Colombia? `___` → *Excluir si reside fuera del país.*
4. ¿El español es tu lengua principal? Sí / No → *Excluir si No y no hay dominio pleno.*

**Bloque 2 — Estratificación**

5. ¿Cuál es el nivel de estudios más alto que completaste?
   - a. Primaria o menos
   - b. Bachillerato / secundaria completa
   - c. Técnico o tecnológico
   - d. Universitario (pregrado o posgrado)
   → *Clasificar: b = secundaria; c = técnico-tecnológico; d = universitario. Opción a: excluir para mantener comparabilidad de las celdas de cuota (registrar como dato y revisar si se quiere una celda exploratoria aparte).*
6. Género con el que te identificas: Mujer / Hombre / Otro / Prefiero no decir → *Usar para cerrar 50/50; "Otro" y "Prefiero no decir" se aceptan y se registran sin forzar la cuota binaria.*
7. ¿Cuál es tu ocupación o a qué te dedicas? `___` → *Excluir si trabaja en psicometría, orientación vocacional, lingüística o traducción.*

**Bloque 3 — Exclusiones de contaminación**

8. ¿Has respondido antes un cuestionario llamado "O*NET Interest Profiler" o "Mi Próximo Paso"? Sí / No → *Excluir si Sí en los últimos 12 meses.*
9. ¿Has participado antes en una prueba de DescubreMe? Sí / No → *Excluir si Sí.*

**Bloque 4 — Microtarea de verbalización (valida capacidad think-aloud)**

10. Te voy a pedir algo corto: dime en voz alta todo lo que se te pase por la cabeza mientras piensas esta pregunta — *"¿Cuántas ventanas hay en la casa o el lugar donde vives?"* No me des solo el número; cuéntame cómo lo vas calculando.
    → *Registrar:* el participante verbaliza el proceso (recorre habitaciones en voz alta) = **apto**. Solo dice el número final sin proceso, incluso tras un segundo intento = **no apto** para think-aloud.

**Bloque 5 — Marcas para el bundle**

11. ¿Tendrías disponibilidad para una segunda sesión, otro día, de hasta 90 minutos? Sí / No → *Marca `elegible_VIA`.*
12. La sesión principal podría extenderse unos 15 minutos adicionales el mismo día. ¿Tendrías disponibilidad para una sesión de hasta 60 minutos? Sí / No → *Marca `elegible_NFR2728`.*

**Cierre del screener:**

> Si el perfil encaja, te contactamos para agendar. La sesión será grabada solo con tu autorización y los datos se manejan de forma confidencial. ¿Tienes alguna pregunta?

**Salida del screener:** una fila por contacto con: ID, ciudad, celda de cuota, educación, género, edad, apto/no apto think-aloud, `elegible_VIA`, `elegible_NFR2728`, estado (reclutado / lista de espera / excluido + motivo). Estructura en la hoja `Reclutamiento` del `.xlsx`.

---

### A-4. Consentimiento informado (Ley 1581 de 2012)

`Hecho:` La sesión captura datos personales (audio/video, ciudad, edad, ocupación). Aplica el régimen de protección de datos personales de Colombia (Ley 1581 de 2012 y Decreto 1377 de 2013). El consentimiento debe ser **previo, expreso e informado**.

Leer en voz alta y entregar copia (o desplegar en pantalla con casillas). Texto listo para usar:

> **Consentimiento informado — Sesión de evaluación de cuestionario, proyecto DescubreMe**
>
> **Quién hace el estudio.** DescubreMe, plataforma de autoconocimiento (responsable del tratamiento de datos: [razón social y NIT a completar]; contacto: [correo a completar]).
>
> **Para qué es esta sesión.** Queremos mejorar la redacción de un cuestionario sobre intereses laborales. **Evaluamos el cuestionario, no a ti.** No hay respuestas correctas ni incorrectas, y esto no es una prueba clínica ni un diagnóstico.
>
> **Qué vamos a hacer.** Vas a responder un cuestionario en pantalla diciendo en voz alta lo que piensas, y luego conversamos unos minutos. Dura unos 45 minutos [o hasta 60 minutos si aplica el módulo adicional].
>
> **Grabación.** Con tu autorización, grabamos audio [y pantalla] para no perder detalles. Si no autorizas la grabación, igual puedes participar y la persona facilitadora toma notas.
>
> **Tus datos.** Tratamos tus datos solo para este estudio. Tu nombre no aparece en los reportes; usamos un código. Las grabaciones se guardan de forma segura y se eliminan máximo [plazo a definir, p. ej. 12 meses] después de cerrar el estudio. No vendemos ni compartimos tus datos con terceros con fines comerciales.
>
> **Tus derechos.** Puedes pausar o retirarte en cualquier momento sin dar explicaciones y sin perder la compensación. Puedes pedir conocer, actualizar, rectificar o solicitar la eliminación de tus datos escribiendo a [correo]. Tu participación es voluntaria.
>
> **Compensación.** Recibes [monto] por tu tiempo, sin importar si completas o no la sesión.
>
> Casillas (marcar):
> [ ] Autorizo participar en la sesión.
> [ ] Autorizo la grabación de audio.
> [ ] Autorizo la grabación de pantalla / video.
> [ ] Autorizo el tratamiento de mis datos personales en los términos descritos.
>
> Nombre: ____________  Firma o autorización verbal registrada: ____________  Fecha: ____________

`Opinión profesional:` Validar el texto final con la persona o área que maneje compliance del proyecto antes del campo. Los campos entre corchetes son obligatorios de completar. La política de privacidad de DescubreMe debe poder mostrarse si el participante la pide. Sin fuente verificada respecto al plazo de retención: definirlo según la política de datos del proyecto.

---

### A-5. Guion de sesión O*NET (45 minutos)

Una persona facilitadora por sesión. Sesión individual. Material: los 60 ítems en pantalla en su versión es-CO vigente (la sembrada por CC, `ucp_status='translated'`), cronómetro o registro de tiempos, hoja de captura (§A-6).

**Paso 0 — Antes de que entre el participante (preparación)**

- Verificar grabación, conexión y que el cuestionario carga los 60 ítems.
- Tener a mano la hoja de captura y el codebook.
- Definir el orden de ítems: usar **orden fijo intercalado** (el orden nativo O*NET que mezcla dimensiones; pack §1.3). No agrupar por dimensión.

**Paso 1 — Introducción (5 min)**

Guion verbal:

> Gracias por venir. Te explico cómo va esto. Vamos a ver juntos un cuestionario sobre intereses laborales. Lo más importante: **evaluamos el cuestionario, no a ti.** Si una pregunta no se entiende, el problema es de la pregunta, no tuyo, y justamente eso es lo que necesito que me cuentes.
>
> Te voy a pedir algo particular: antes de responder cada pregunta, dime en voz alta **qué entiendes que te están preguntando**, con tus propias palabras. Como si me lo explicaras a mí. Después respondes normal. Si una palabra te suena rara, vieja o de otro país, dímelo. Si no entiendes algo, dímelo. No hay respuestas correctas.
>
> Voy a tomar notas y, si lo autorizaste, grabamos. ¿Alguna pregunta antes de empezar?

Microcalentamiento (no se codifica): pedir que piense en voz alta una pregunta trivial ("¿qué desayunaste hoy y por qué?") para que se suelte con el formato verbalizado.

**Paso 2 — Aplicación verbalizada de los 60 ítems (25–30 min)**

Para cada ítem, la facilitación sigue este micro-ciclo:

1. El participante lee el ítem (en voz alta o en silencio, como prefiera).
2. **Antes de responder**, verbaliza: "¿Qué entiendes que te preguntan aquí? Cuéntame con tus palabras."
3. El participante responde el ítem en la escala 0–4.
4. La facilitación registra en la hoja de captura (§A-6) y solo interviene con sondas neutras si hace falta.

**Sondas neutras permitidas** (no inducir respuestas):

- "¿Qué quiere decir esa palabra para ti?"
- "¿Cómo lo dirías tú?"
- "¿Esa actividad te suena conocida?"
- "Noté que dudaste, ¿qué estabas pensando?"

**Prohibido:** explicar el ítem, dar sinónimos, sugerir respuestas, opinar si la actividad es buena o mala. Si el participante pregunta "¿qué significa X?", la facilitación devuelve la pregunta: "¿qué crees tú que significa?" y registra el ítem como solicitud de aclaración.

**Manejo del ritmo:** 60 ítems en ~27 min ≈ 27 s/ítem promedio. No apurar. Si un ítem dispara conversación rica, dejar correr y recuperar ritmo después. La fatiga es un riesgo real a partir del ítem ~40: ofrecer una pausa breve opcional hacia la mitad.

**Paso 3 — Entrevista de cierre (10 min)**

Las tres preguntas del pack §8.2, más sondas:

1. "¿Hubo alguna pregunta donde no entendiste a la primera lo que se te preguntaba? ¿Cuál(es)?"
2. "¿Hay alguna palabra que no usarías tú normalmente, o que dirías de otra forma?"
3. "¿Alguna actividad que mencionara el cuestionario te pareció extraña, vieja o de otro país? ¿Cuál(es)?"
4. Sonda de cierre: "Si tuvieras que cambiarle una sola cosa a este cuestionario para que se entendiera mejor en Colombia, ¿qué le cambiarías?"

Registrar textual las menciones espontáneas de ítems; son señal de alta prioridad.

**Paso 4 — Hook de transición al módulo NFR-27/28 (solo subset `elegible_NFR2728`, 6–8 participantes)**

`Hecho:` El contenido del módulo NFR-27/28 lo define el Prompt 3 y su documento `NFR-27_NFR-28_COGNITIVE_PILOT_v1.0_REPORT.md`. Este field kit solo provee el puente.

Guion de transición:

> Hemos terminado la parte del cuestionario de intereses. Como acordamos, hay un módulo corto adicional de unos 15 minutos. Si te parece bien, seguimos; si prefieres parar aquí, también está perfecto.

A partir de aquí, la facilitación cambia al guion del Prompt 3. La sesión total de este subset es ≈ 60 min. Para participantes fuera del subset, la sesión termina en el Paso 3.

**Paso 5 — Cierre administrativo**

- Agradecer, entregar compensación (registrar entrega).
- Si el participante está marcado `elegible_VIA`, confirmar interés y dejar agendada o por agendar la segunda cita (sesión Prompt 2).
- Detener grabación, etiquetar archivo con el ID del participante.

---

### A-6. Hoja de captura por ítem

Una hoja (digital o impresa) por participante. **60 filas** (una por ítem) más metadatos de cabecera. Estructura en la hoja `Captura_plantilla` del `.xlsx`.

**Cabecera de la hoja:**

ID participante · Fecha · Facilitador/a · Codificador/a 1 · Codificador/a 2 · Ciudad · Celda de cuota · Educación · Género · Edad · Versión es-CO del instrumento usada · Subsets (NFR-27/28 sí/no, VIA sí/no)

**Columnas por ítem (60 filas):**

| Campo | Tipo | Descripción |
|---|---|---|
| `item_id` | texto | R1…C10 (código SF del pack §1.1) |
| `dimension` | texto | R / I / A / S / E / C |
| `texto_presentado` | texto | El texto es-CO exacto mostrado en pantalla |
| `tiempo_respuesta_seg` | número | Segundos entre que aparece el ítem y se registra la respuesta |
| `reformulo` | sí/no | ¿El participante reformuló el ítem con sus palabras de forma que sugiere ambigüedad? (señal de ambigüedad) |
| `pidio_aclaracion` | sí/no | ¿Pidió que le explicaran una palabra o el ítem? (señal de fallo lexical) |
| `senal_no_comprension` | sí/no | ¿Usó frases-señal: "no sé qué es eso", "¿qué quiere decir…?", "eso no se dice así"? |
| `marca_ajeno` | sí/no | ¿Comentó que el ítem o la actividad le resulta "ajeno", "extranjero", "raro", "viejo", "de otro país"? |
| `discrepancia_resp_racional` | sí/no | ¿La respuesta dada en la escala contradice lo que verbalizó? (p. ej. dice "no sé qué es" pero marca 4) |
| `respuesta_escala` | 0–4 | La respuesta del participante (necesaria para el cálculo de α; ver §A-8) |
| `palabras_senal` | texto | Transcripción literal de las palabras-señal y términos que el participante propuso como alternativa |
| `comentarios` | texto | Comentarios espontáneos relevantes; mención en la entrevista de cierre |
| `codigo_1` | texto | Código asignado por codificador/a 1 (ver codebook §A-7) |
| `codigo_2` | texto | Código asignado por codificador/a 2 |
| `codigo_consenso` | texto | Código final tras reconciliación |

**Regla operativa de tiempo:** si la herramienta digital registra tiempos automáticamente, usar ese dato. Si no, la facilitación cronometra de forma aproximada; marcar la columna como "estimado" para que el análisis lo trate con cautela. Umbral de alerta del pack §8.2: tiempo > 15 s en un ítem se anota como observación; el criterio formal de re-adaptación es el de > 2 SD del §8.3 (ver §A-8).

---

### A-7. Libro de códigos (codebook) para dos codificadores

`Hecho:` El pack §8.2 exige codificación por **dos codificadores** independientes. Este codebook define las categorías, las reglas de decisión y el procedimiento de acuerdo.

**Unidad de codificación:** cada par ítem × participante (60 ítems × N participantes).

**Esquema de codificación.** Cada unidad recibe **un código primario** de comprensión y, si aplica, **marcas secundarias** no excluyentes.

**Código primario de comprensión (excluyente, elegir uno):**

| Código | Etiqueta | Definición | Ejemplo |
|---|---|---|---|
| `OK` | Comprensión plena | El participante reformula el ítem de forma equivalente al significado original, sin dudar, sin pedir aclaración. | Item I3 "Realizar experimentos químicos" → "que si me gusta hacer experimentos de química, en un laboratorio". |
| `AMB` | Ambigüedad | El participante entiende palabras sueltas pero reformula el ítem en un sentido distinto o más estrecho/amplio que el original; o duda entre dos interpretaciones. | Item R9 → el participante lo entiende solo como "configurar un computador" cuando el ítem es sobre máquinas de fabricación. |
| `LEX` | Fallo lexical | Una o más palabras no se comprenden; el participante pide aclaración o declara desconocer el término. | Item A8 → "claqué, no sé qué es eso". |
| `CULT` | Distancia cultural | El participante comprende el ítem pero lo marca como ajeno, extranjero, viejo o irreconocible en su contexto. | Item R4 → "criar peces en un criadero, eso aquí casi no se ve, suena de otro país". |
| `NC` | No comprensión total | El participante no logra reconstruir el significado del ítem ni siquiera tras una sonda neutra. | Item C7 → "no entiendo qué me preguntan, ni idea". |

**Marcas secundarias (no excluyentes, marcar todas las que apliquen):**

| Marca | Definición |
|---|---|
| `m_reformulo` | Hubo reformulación espontánea (independiente de si fue correcta). |
| `m_discrepancia` | La respuesta en escala contradice lo verbalizado. |
| `m_tiempo` | Tiempo de respuesta marcado como atípico por el análisis (> 2 SD del ítem). Se completa después del cálculo de tiempos, no durante la codificación inicial. |
| `m_propone_alt` | El participante propuso una palabra o frase alternativa concreta. |

**Reglas de decisión (para resolver casos límite):**

1. Si hay fallo lexical Y ambigüedad, prima `LEX` (el fallo lexical es la causa raíz).
2. `CULT` se asigna solo cuando la comprensión semántica es correcta; si el participante no entiende además la palabra, es `LEX`.
3. La duda silenciosa larga sin verbalización no basta para `AMB`; debe haber evidencia verbal. El tiempo atípico se captura aparte con `m_tiempo`.
4. Una respuesta correcta en escala no convierte un `LEX` en `OK`: lo que se codifica es la comprensión verbalizada, no el acierto.
5. Ante empate irresoluble entre dos codificadores, el código más conservador (el que señala más problema) se lleva a reconciliación, no se promedia.

**Procedimiento de acuerdo y confiabilidad:**

1. Los dos codificadores codifican **de forma independiente** el 100% de las unidades. No se consultan entre sí durante esta fase.
2. Calcular el acuerdo inter-codificador con **Kappa de Cohen** sobre el código primario. Para los datos de cada ítem se puede reportar también el porcentaje de acuerdo bruto.
3. **Umbral objetivo:** κ ≥ 0,70 aceptable; κ ≥ 0,80 bueno. Si κ < 0,70, los codificadores revisan el codebook, aclaran definiciones, recodifican una muestra de calibración y se recalcula antes de seguir.
4. **Calibración previa recomendada:** antes de codificar todo, ambos codifican en conjunto 2–3 sesiones piloto, comparan y afinan criterios. Esto reduce desacuerdo sistemático.
5. **Reconciliación:** las unidades en desacuerdo se discuten y se asigna `codigo_consenso`. Si no hay acuerdo, decide un tercer codificador o la persona que lidera la investigación.
6. Reportar en el output: κ global, κ por dimensión si la muestra lo permite, y número de unidades reconciliadas.

`Opinión profesional:` Con N ≈ 30 participantes × 60 ítems = ~1.800 unidades, la codificación es la tarea más pesada del piloto. Estimar 10–15 h por codificador. La calibración previa no es opcional: sin ella, κ tiende a caer por debajo de 0,70 y obliga a recodificar.

---

### A-8. Plan de análisis

Operacionaliza los criterios del pack §8.3. Todo el análisis se corre **después** del campo y la codificación, sobre el dataset consolidado.

**A-8.1. Métricas de comprensión por ítem**

Para cada uno de los 60 ítems, sobre N participantes:

| Métrica | Cálculo | Criterio del pack §8.3 |
|---|---|---|
| `% no comprensión` | (unidades con `codigo_consenso` ∈ {`LEX`, `NC`}) / N | **> 20% → re-adaptar léxicamente** |
| `% reformulación espontánea` | (unidades con marca `m_reformulo`) / N | **> 30% → re-adaptar** |
| `% distancia cultural` | (unidades con `codigo_consenso` = `CULT` o marca `marca_ajeno`) / N | **> 25% → re-adaptar manteniendo equivalencia conceptual** |
| `% discrepancia respuesta-racionalización` | (unidades con marca `m_discrepancia`) / N | **> 20% → re-adaptar** |
| `% comprensión plena` | (unidades con `codigo_consenso` = `OK`) / N | Métrica de reporte (pack §8.4 punto 3) |

**A-8.2. Análisis de tiempos**

1. Por ítem, calcular media y desviación estándar (SD) del `tiempo_respuesta_seg` sobre los participantes válidos.
2. Marcar como atípica toda respuesta individual con tiempo > media del ítem + 2 SD. Setear la marca `m_tiempo` en esas unidades.
3. Criterio del pack §8.3: si un ítem tiene tiempo atípico en **> 15% de la muestra**, el ítem se marca para revisión.
4. Reportar la **mediana** de tiempo por ítem (pack §8.4 punto 3); la mediana es preferible a la media por robustez ante valores extremos.

`Inferencia:` Con N ≈ 30 y posibles tiempos "estimados" por la facilitación, el análisis de tiempos es el más frágil. Tratarlo como señal secundaria de apoyo, no como criterio único de re-adaptación.

**A-8.3. Alfa de Cronbach por dimensión RIASEC**

`Hecho:` Durante la sesión think-aloud el participante responde los 60 ítems en la escala 0–4. Ese dataset permite calcular α por dimensión (R, I, A, S, E, C; 10 ítems cada una) usando la columna `respuesta_escala`.

`Inferencia / nota psicométrica crítica:` Con N ≈ 30, el α estimado tiene **intervalo de confianza amplio** y es **provisional**. Sirve como chequeo temprano (¿hay algún ítem que degrada gravemente su escala?), no como evidencia de confiabilidad definitiva.

- Reportar α por las 6 dimensiones con su intervalo de confianza al 95%.
- Reportar α-si-se-elimina-el-ítem para detectar ítems problemáticos.
- **Criterio de referencia:** α ≥ 0,70 por dimensión es deseable (consistente con el pack §3.2 y con el α original EE. UU. de 0,78–0,87; Rounds et al., 2010). Un α bajo en esta fase es señal de alerta, no veredicto.
- La confiabilidad se confirma en la fase 2 del pack §8.1 (validación lexical cuantitativa, n = 150–300), no aquí.

`Opinión profesional:` No usar el α del piloto cognitivo para decidir nada irreversible. Su función es detectar problemas groseros y dar un dato de transparencia para el reporte de licencia. Decir esto explícitamente en el reporte protege la integridad del Validation Study.

**A-8.4. Regla de decisión por ítem**

Para cada ítem, integrar las señales:

- **Sin cambio:** ningún criterio del §8.3 superado y sin mención espontánea en la entrevista de cierre.
- **Re-adaptar:** uno o más criterios del §8.3 superados, o mención espontánea recurrente. La nueva redacción la propone el equipo (consenso experto) tomando como insumo las alternativas que propusieron los participantes (`m_propone_alt`, `palabras_senal`).
- **Revisar / observar:** señal parcial (p. ej. solo tiempo atípico, o 15–20% de no comprensión). Decisión cualitativa del equipo; documentar el razonamiento.

**A-8.5. Criterio de escalamiento (magnitud de re-adaptación)**

`Hecho:` El briefing del Prompt 1 fija un umbral de escalamiento: si el piloto detecta **~25 o más ítems** que requieren re-adaptación mayor, no se procede con un simple log de cambios, sino que se escala a Germán + PM Cowork.

- **Re-adaptación menor (≈ 5–15 ítems con cambio):** flujo normal. Se entrega el log de cambios; CC genera la Migration de actualización y promueve `ucp_status` a `cognitive_pilot`.
- **Re-adaptación mayor (≈ 25+ ítems):** escalar. Opciones a evaluar: re-seed completo de la versión es-CO, o partición entre ítems aceptables sin cambio vs. ítems que requieren validación con el autor / O*NET. CC difiere la implementación hasta la decisión de producto.
- **Zona intermedia (16–24 ítems):** decisión de Germán + PM caso a caso; el reporte debe presentar el detalle para esa decisión.

`Opinión profesional:` La revisión léxica experta a priori (Parte B) propone cambios en 24 ítems, pero la mayoría son sustituciones léxicas menores y precautorias (preservan el concepto) y muchas pueden resultar innecesarias si el texto real de "Mi Próximo Paso" ya usa el término colombiano. El conteo de la Parte B **no** anticipa una re-adaptación mayor: el umbral de escalamiento se evalúa con datos del piloto, no con el desk review.

---

### A-9. Plantillas de output

Tres entregables al cierre del piloto. La estructura tabular vive en el `.xlsx` complementario; aquí se documentan los esquemas.

**A-9.1. Log de cambios (pack §8.4 punto 2)**

Una fila por ítem modificado. Esquema de columnas (hoja `Log_cambios` del `.xlsx`):

| Columna | Descripción |
|---|---|
| `item_id` | R1…C10 |
| `dimension` | R/I/A/S/E/C |
| `texto_mi_proximo_paso` | Texto oficial es-EE.UU. (a verificar vía API O*NET) |
| `texto_es_co_propuesto_a_priori` | Propuesta del desk review (Parte B) |
| `texto_es_co_post_piloto` | Redacción final tras el piloto |
| `tipo_cambio` | lexical / cultural / sin cambio / observación |
| `justificacion` | Razón del cambio, citando la señal del §8.3 |
| `fuente` | think-aloud / consenso experto / ambos |
| `metrica_disparadora` | El criterio del §8.3 que se superó, con su valor |
| `decision` | aplicar / observar / escalar |

Esquema JSON equivalente (para que CC lo consuma directo):

```json
{
  "instrument": "O-NET-IP-SF",
  "locale": "es-CO",
  "pilot_version": "1.0",
  "pilot_n": 0,
  "source": "lexical cognitive pilot",
  "changes": [
    {
      "item_id": "A8",
      "dimension": "A",
      "texto_mi_proximo_paso": "",
      "texto_es_co_propuesto_a_priori": "",
      "texto_es_co_post_piloto": "",
      "tipo_cambio": "lexical",
      "justificacion": "",
      "fuente": "think-aloud",
      "metrica_disparadora": "",
      "decision": "aplicar"
    }
  ]
}
```

**A-9.2. Tabla de métricas piloto (pack §8.4 punto 3)**

Dos hojas en el `.xlsx`:

- `Metricas_item`: 60 filas, columnas `item_id`, `dimension`, `n_validos`, `% comprensión plena`, `% no comprensión`, `% reformulación`, `% distancia cultural`, `% discrepancia`, `mediana_tiempo_seg`, `% tiempo atípico`, `decision`.
- `Metricas_dimension`: 6 filas (R/I/A/S/E/C), columnas `dimension`, `n_items`, `alpha`, `alpha_IC95_inf`, `alpha_IC95_sup`, `% comprensión media de la dimensión`.

**A-9.3. Reporte breve para O*NET Validation Study (pack §8.4 punto 4)**

Documento de 1–2 páginas **en inglés**, archivable para cumplimiento de la O*NET Tools Developer License. Esqueleto:

```
O*NET Interest Profiler Short Form — Colombian Spanish (es-CO)
Lexical Cognitive Pilot — Summary Report

1. Purpose and scope
   - Lexical/cultural comprehension validation of the 60-item IP-SF for
     Colombian Spanish. Non-clinical, non-selection use within DescubreMe.
   - Explicitly NOT an accessibility or full psychometric validation study.

2. Method
   - Think-aloud cognitive interviewing protocol.
   - Sample: N = [ ], urban Colombia, stratified by city, education, gender, age.
   - Two independent coders; Cohen's kappa = [ ].
   - Base text: official "Mi Próximo Paso" Spanish, USDOL/ETA.

3. Results
   - Item-level comprehension rates; items flagged for re-adaptation.
   - Provisional Cronbach's alpha per RIASEC dimension (N small; CI wide).
   - Number of items modified: [ ].

4. Adaptations applied
   - Summary of lexical changes (Colombian Spanish), with rationale.
   - Conceptual equivalence preserved; no item content changed.

5. Limitations
   - Small N; alpha provisional. Lexical scope only.
   - Quantitative lexical validation (n = 150-300) pending.

6. Compliance note
   - Conducted under the O*NET Tools Developer License. Attribution
     displayed per license terms. Change log archived.

Contact: [ ]   Date: [ ]
```

---

### A-10. Logística, presupuesto y cronograma

**A-10.1. Incentivos (modelo bundle, según STATUS 2026-05-23)**

| Concepto | Monto referencia | Aplica a |
|---|---|---|
| Incentivo sesión O*NET (45 min) | USD 15 equivalente en COP | Todo el panel |
| Adicional módulo NFR-27/28 (15 min) | USD 5 equivalente en COP | Subset 6–8 |
| Sesión VIA-IS-P (segunda cita, 60–90 min) | Definir en el Prompt 2 | Subset 8–15 |

`Inferencia:` STATUS estima ~USD 800–900 de reclutamiento total para los tres pilotos del bundle. El costo atribuible solo a O*NET es aproximadamente 40 participantes × USD 15 ≈ USD 600, más honorarios de facilitación y codificación.

**A-10.2. Roles y esfuerzo estimado (equipo humano, no Cowork)**

| Rol | Tarea | Esfuerzo estimado |
|---|---|---|
| Reclutamiento | Agencia de muestreo local + redes propias; aplicar screener; agendar | ~1 semana |
| Facilitación | 30–40 sesiones × 45–60 min + preparación + notas | ~15–23 h |
| Codificación | 2 codificadores × ~1.800 unidades + calibración + reconciliación | ~10–15 h por codificador |
| Análisis y síntesis | Cálculo de métricas, log de cambios, reporte en inglés | ~10–15 h |

`Hecho:` STATUS estima ~80–100 h de research humano para el bundle completo, distribuidas en 4–6 semanas. La porción O*NET es una fracción de eso.

**A-10.3. Cronograma referencial (4 semanas, modo serial O*NET; 4–6 si bundle completo)**

| Semana | Hito |
|---|---|
| 1 | Finalizar consentimiento con compliance; reclutar y agendar; calibrar codificadores |
| 2 | Sesiones de campo (tanda 1); transcribir y empezar codificación |
| 3 | Sesiones de campo (tanda 2); completar codificación; calcular κ |
| 4 | Análisis, log de cambios, métricas, reporte en inglés; entrega |

**A-10.4. Riesgos y mitigaciones**

| Riesgo | Impacto | Mitigación |
|---|---|---|
| Inasistencia / no-show | Celdas de cuota incompletas | Sobre-reclutar a 40; lista de espera por celda |
| κ < 0,70 entre codificadores | Codificación no confiable; retrabajo | Calibración previa obligatoria (2–3 sesiones conjuntas) |
| Fatiga del participante tras ítem ~40 | Tiempos y comprensión degradados al final | Pausa opcional a mitad; vigilar efecto de orden; orden fijo permite detectarlo |
| Texto real de "Mi Próximo Paso" difiere de lo inferido en Parte B | Propuestas a priori desalineadas | Extraer el texto real vía API O*NET antes del campo; ver Parte B nota de método |
| Sesión bundle alarga el tiempo y sube el abandono | Pérdida de datos NFR-27/28 | El hook (§A-5 paso 4) hace el módulo explícitamente opcional |
| Participantes expertos se filtran al panel | Think-aloud sesgado | Exclusión explícita en screener (pregunta 7) |

---

## PARTE B — REVISIÓN LÉXICA EXPERTA A PRIORI DE LOS 60 ÍTEMS

### B-1. Método del desk review

`Hecho:` Esta revisión es un análisis de escritorio (consenso experto), no un piloto. Bajo el esquema del pack §8.4, califica como `fuente: consenso experto` del log de cambios. Su función es triple: priorizar qué ítems vigilar en campo, pre-poblar el changelog y reducir la carga del piloto.

**Insumos:** banco oficial de 60 ítems en inglés (pack §1.1), tabla de modificaciones léxicas anticipadas (pack §2.2), divergencias documentadas entre español de EE. UU., español de España y español andino-caribeño, y vocabulario laboral colombiano.

**Advertencia de método — leer antes de usar la tabla.**

`Inferencia:` La columna "Texto previsible Mi Próximo Paso" es **inferida**. El pack §2.1–§2.2 advierte que el texto oficial es-EE.UU. no se extrajo literalmente y recomienda obtenerlo vía la O*NET Web Services API (`services.onetcenter.org/ip`). Por lo tanto:

1. **Antes del campo, extraer el texto real de "Mi Próximo Paso" vía API.** Si el texto real ya usa el término colombiano, la propuesta de esta tabla queda sin efecto (no es un cambio, es una coincidencia).
2. Ninguna propuesta de esta Parte B modifica el **concepto** del ítem; todas preservan la equivalencia conceptual. Son sustituciones léxicas o de registro.
3. La decisión final de cada cambio la confirma el piloto (§A-8.4). El desk review propone; el think-aloud valida.

**Escala de riesgo:**

- **Bajo:** el término inferido es comprensible y de uso normal en Colombia; sin cambio anticipado.
- **Medio:** divergencia léxica o de registro probable (término de España, calco del inglés, forma mexicana, tecnicismo o palabra anticuada); o actividad/ocupación poco familiar en Colombia urbana. Se propone ajuste o vigilancia.
- **Alto:** no se identificó ningún ítem de riesgo alto en el desk review. El IP-SF no contiene ítems sensibles ni de alta complejidad lexical; el riesgo del instrumento es difuso y de bajo grado, concentrado en sustituciones puntuales.

### B-2. Tabla de los 60 ítems

| # | Dim | Ítem (inglés, literal) | Texto previsible Mi Próximo Paso (inferido) | Riesgo | Propuesta es-CO | Justificación |
|---|---|---|---|---|---|---|
| R1 | R | Build kitchen cabinets | Construir gabinetes de cocina | Bajo | Mantener | "Gabinete" se comprende en Colombia; "muebles de cocina" como alternativa si el piloto lo pide |
| R2 | R | Lay brick or tile | Colocar ladrillos o baldosas | Bajo | Mantener | "Ladrillo" y "baldosa" son términos estándar en Colombia |
| R3 | R | Repair household appliances | Reparar electrodomésticos | Bajo | Mantener | "Electrodomésticos" es el término usual colombiano |
| R4 | R | Raise fish in a fish hatchery | Criar peces en una piscifactoría | Medio | Criar peces en un criadero | "Piscifactoría" es término de España; "criadero" se entiende mejor. Ocupación poco familiar en zona urbana: vigilar marca de distancia cultural |
| R5 | R | Assemble electronic parts | Ensamblar partes electrónicas | Bajo | Mantener ("piezas" como alternativa) | "Ensamblar" se comprende; "piezas" suena algo más natural que "partes" pero la diferencia es menor |
| R6 | R | Drive a truck to deliver packages to offices and homes | Conducir un camión para repartir paquetes a oficinas y casas | Medio | Manejar un camión para entregar paquetes a oficinas y casas | En el habla colombiana "manejar" es más frecuente que "conducir" (pack §2.2) |
| R7 | R | Test the quality of parts before shipment | Probar la calidad de las piezas antes del envío | Bajo | Mantener | Redacción comprensible y neutra |
| R8 | R | Repair and install locks | Reparar e instalar cerraduras | Bajo | Mantener "cerraduras" | "Cerradura" es comprensible; "chapa" es coloquial y se evita en registro formal (pack §2.2) |
| R9 | R | Set up and operate machines to make products | Configurar y operar máquinas para hacer productos | Medio | Poner a punto y operar máquinas para fabricar productos | "Configurar" connota informática; "poner a punto" describe mejor la preparación de maquinaria industrial (pack §2.2) |
| R10 | R | Put out forest fires | Apagar incendios forestales | Medio | Mantener; vigilar en campo | El léxico es correcto; el riesgo es de familiaridad: bombero forestal es ocupación infrecuente fuera de zonas de páramo (pack §2.2) |
| I1 | I | Develop a new medicine | Desarrollar una medicina nueva | Medio | Desarrollar un medicamento nuevo | "Medicamento" es preferido en Colombia; "medicina" es ambiguo (disciplina vs. fármaco) |
| I2 | I | Study ways to reduce water pollution | Estudiar formas de reducir la contaminación del agua | Bajo | Mantener | Redacción clara y neutra |
| I3 | I | Conduct chemical experiments | Realizar experimentos químicos | Bajo | Mantener | Redacción estándar |
| I4 | I | Study the movement of planets | Estudiar el movimiento de los planetas | Medio | Mantener; vigilar en campo | Léxico claro; riesgo de familiaridad: astrónomo profesional es ocupación muy escasa en Colombia (pack §2.2) |
| I5 | I | Examine blood samples using a microscope | Examinar muestras de sangre con un microscopio | Bajo | Mantener | Redacción estándar |
| I6 | I | Investigate the cause of a fire | Investigar la causa de un incendio | Bajo | Mantener | Redacción estándar |
| I7 | I | Develop a way to better predict the weather | Desarrollar una forma de predecir mejor el clima | Bajo | Mantener "clima" | En Colombia "clima" cubre el sentido de tiempo atmosférico (pack §2.2) |
| I8 | I | Work in a biology lab | Trabajar en un laboratorio de biología | Bajo | Mantener | Redacción estándar |
| I9 | I | Invent a replacement for sugar | Inventar un reemplazo para el azúcar | Medio | Inventar un sustituto del azúcar | "Sustituto del azúcar" es la colocación natural en Colombia; "reemplazo para" suena a calco |
| I10 | I | Do laboratory tests to identify diseases | Hacer pruebas de laboratorio para identificar enfermedades | Bajo | Mantener | Redacción estándar |
| A1 | A | Write books or plays | Escribir libros u obras de teatro | Bajo | Mantener | Redacción estándar |
| A2 | A | Play a musical instrument | Tocar un instrumento musical | Bajo | Mantener | Redacción estándar |
| A3 | A | Compose or arrange music | Componer o arreglar música | Bajo | Mantener | Redacción estándar |
| A4 | A | Draw pictures | Dibujar | Bajo | Mantener | "Dibujar" es claro y suficiente |
| A5 | A | Create special effects for movies | Crear efectos especiales para películas | Bajo | Mantener | Redacción estándar |
| A6 | A | Paint sets for plays | Pintar decorados para obras de teatro | Medio | Pintar escenografías para obras de teatro | "Decorado" se comprende, pero "escenografía" es el término más estándar; evitar el anglicismo "set" |
| A7 | A | Write scripts for movies or television shows | Escribir guiones para películas o programas de televisión | Bajo | Mantener | "Guion" es el término estándar en Colombia |
| A8 | A | Perform jazz or tap dance | Bailar jazz o claqué | Medio | Bailar jazz o tap | "Claqué" es término de España, poco usado en Colombia; "tap" es anglicismo de uso común (pack §2.2, §8.3) |
| A9 | A | Sing in a band | Cantar en una banda | Bajo | Mantener | "Banda" es comprensible; "grupo musical" como alternativa |
| A10 | A | Edit movies | Editar películas | Bajo | Mantener | Redacción estándar |
| S1 | S | Teach an individual an exercise routine | Enseñarle a una persona una rutina de ejercicios | Bajo | Mantener | Redacción clara |
| S2 | S | Help people with personal or emotional problems | Ayudar a personas con problemas personales o emocionales | Bajo | Mantener | Redacción clara |
| S3 | S | Give career guidance to people | Dar consejería de carrera a las personas | Medio | Orientar a las personas en su carrera profesional | "Consejería de carrera" es calco del inglés / es-EE.UU.; "orientación profesional" o "vocacional" es el término colombiano |
| S4 | S | Perform rehabilitation therapy | Realizar terapia de rehabilitación | Bajo | Mantener | Redacción estándar |
| S5 | S | Do volunteer work at a non-profit organization | Hacer trabajo voluntario en una organización sin fines de lucro | Medio | Hacer trabajo voluntario en una organización sin ánimo de lucro | "Sin ánimo de lucro" es el término legal y de uso corriente en Colombia; "sin fines de lucro" es más mexicano |
| S6 | S | Teach children how to play sports | Enseñarles a los niños a practicar deportes | Bajo | Mantener | Redacción clara |
| S7 | S | Teach sign language to people who are deaf or hard of hearing | Enseñar lengua de señas a personas sordas o con dificultades auditivas | Bajo | Mantener | "Lengua de señas" es correcto en Colombia (Lengua de Señas Colombiana) |
| S8 | S | Help conduct a group therapy session | Ayudar a dirigir una sesión de terapia de grupo | Bajo | Mantener | "Terapia de grupo" / "grupal" son comprensibles |
| S9 | S | Take care of children at a day-care center | Cuidar niños en una guardería | Bajo | Mantener; vigilar | "Guardería" es comprensible; alternativas colombianas: "jardín infantil", "hogar infantil" |
| S10 | S | Teach a high-school class | Dar una clase de escuela secundaria | Medio | Dictar una clase en un colegio de secundaria | "Dictar clase" es la colocación colombiana; "high school" → colegio / bachillerato, no "escuela secundaria" |
| E1 | E | Buy and sell stocks and bonds | Comprar y vender acciones y bonos | Medio | Mantener; vigilar comprensión del concepto | "Acciones y bonos" es léxicamente correcto; el riesgo es de familiaridad con el concepto financiero (pack §8.3) |
| E2 | E | Manage a retail store | Administrar una tienda minorista | Medio | Administrar una tienda | "Minorista" es poco frecuente en el habla; "tienda" es suficiente y claro |
| E3 | E | Operate a beauty salon or barber shop | Administrar un salón de belleza o una peluquería | Medio | Administrar un salón de belleza o una barbería | "Barber shop" → "barbería" es el término reciente y específico en Colombia (pack §2.2) |
| E4 | E | Manage a department within a large company | Administrar un departamento dentro de una empresa grande | Medio | Dirigir un área o departamento de una empresa grande | En la empresa colombiana "área" es de uso muy común; "departamento" puede confundirse con la división político-administrativa |
| E5 | E | Start your own business | Iniciar tu propio negocio | Bajo | Mantener | Redacción clara; "montar un negocio" como alternativa coloquial |
| E6 | E | Negotiate business contracts | Negociar contratos de negocios | Bajo | Negociar contratos comerciales | "Comerciales" es algo más natural que "de negocios"; cambio menor |
| E7 | E | Represent a client in a lawsuit | Representar a un cliente en un pleito | Medio | Representar a un cliente en un juicio | "Pleito" / "litigio" son tecnicismos; "juicio" o "demanda" son más accesibles (pack §8.3) |
| E8 | E | Market a new line of clothing | Mercadear una nueva línea de ropa | Medio | Promocionar una nueva línea de ropa | "Mercadear" es calco; "promocionar" o "hacer mercadeo de" son más claros |
| E9 | E | Sell merchandise at a department store | Vender mercancía en una tienda por departamentos | Medio | Vender mercancía en un almacén por departamentos | "Almacén" es el término común en Colombia para una tienda grande |
| E10 | E | Manage a clothing store | Administrar una tienda de ropa | Bajo | Mantener | Comprensible; "almacén de ropa" como alternativa |
| C1 | C | Develop a spreadsheet using computer software | Crear una hoja de cálculo usando un programa de computadora | Medio | Crear una hoja de cálculo en un programa de computador | "Computador" (masculino) es la forma usual en Colombia; "ordenador" (España) se prohíbe (pack §2.2) |
| C2 | C | Proofread records or forms | Corregir registros o formularios | Medio | Revisar y corregir registros o formularios | "Proofread" implica revisión de errores; "revisar y corregir" lo deja explícito y evita ambigüedad |
| C3 | C | Install software across computers on a large network | Instalar software en las computadoras de una red grande | Medio | Instalar software en los computadores de una red grande | "Computador" es la forma usual en Colombia (pack §2.2) |
| C4 | C | Operate a calculator | Usar una calculadora | Bajo | Mantener | Redacción clara |
| C5 | C | Keep shipping and receiving records | Llevar registros de envíos y recepciones | Medio | Llevar registros de despacho y recepción de mercancía | "Despacho y recepción" es el término logístico de uso en Colombia |
| C6 | C | Calculate the wages of employees | Calcular los sueldos de los empleados | Bajo | Calcular los salarios de los empleados | "Salario" es el término usual y legal en Colombia; cambio menor |
| C7 | C | Inventory supplies using a hand-held computer | Inventariar suministros usando una computadora de mano | Medio | Hacer inventario de suministros con un dispositivo portátil | "Computadora de mano" es anticuado y poco claro; "dispositivo portátil" o "lector de mano" describe mejor el equipo actual |
| C8 | C | Record rent payments | Registrar pagos de renta | Medio | Registrar pagos de arriendo | En Colombia se dice "arriendo"; "renta" en este sentido es mexicano y puede confundirse con el impuesto de renta |
| C9 | C | Keep inventory records | Llevar registros de inventario | Bajo | Mantener | Redacción estándar |
| C10 | C | Stamp, sort, and distribute mail for an organization | Sellar, clasificar y distribuir el correo de una organización | Bajo | Mantener | Redacción comprensible |

### B-3. Changelog preliminar de consenso experto

Ítems con cambio propuesto a priori (24 de 60). `fuente: consenso experto`. Cada cambio queda **sujeto a** (a) verificación del texto real de "Mi Próximo Paso" vía API O*NET y (b) confirmación en el piloto cognitivo. Los ítems "Mantener; vigilar" (R10, I4, S9) **no** entran al changelog: no se propone cambio, solo observación en campo.

| # | Dim | Cambio propuesto (resumen) | Tipo |
|---|---|---|---|
| R4 | R | "piscifactoría" → "criadero" | lexical |
| R6 | R | "conducir" → "manejar"; "repartir" → "entregar" | lexical / registro |
| R9 | R | "configurar" → "poner a punto"; "hacer" → "fabricar" | lexical |
| I1 | I | "medicina" → "medicamento" | lexical (desambiguación) |
| I9 | I | "reemplazo para" → "sustituto de" | registro |
| A6 | A | "decorados" → "escenografías" | lexical |
| A8 | A | "claqué" → "tap" | lexical (término de España) |
| S3 | S | "consejería de carrera" → "orientación profesional" | lexical (calco) |
| S5 | S | "sin fines de lucro" → "sin ánimo de lucro" | lexical (variante regional) |
| S10 | S | "escuela secundaria" → "colegio de secundaria"; "dar" → "dictar" | lexical / registro |
| E2 | E | quitar "minorista" | registro |
| E3 | E | "peluquería" → "barbería" | lexical (precisión) |
| E4 | E | "departamento" → "área o departamento" | lexical (desambiguación) |
| E6 | E | "de negocios" → "comerciales" | registro (menor) |
| E7 | E | "pleito" → "juicio" | lexical (tecnicismo) |
| E8 | E | "mercadear" → "promocionar" | lexical (calco) |
| E9 | E | "tienda por departamentos" → "almacén por departamentos" | lexical |
| C1 | C | "computadora" → "computador" | lexical (variante regional) |
| C2 | C | "corregir" → "revisar y corregir" | desambiguación |
| C3 | C | "computadoras" → "computadores" | lexical (variante regional) |
| C5 | C | "envíos y recepciones" → "despacho y recepción de mercancía" | lexical |
| C6 | C | "sueldos" → "salarios" | registro (menor) |
| C7 | C | "computadora de mano" → "dispositivo portátil" | lexical (modernización) |
| C8 | C | "renta" → "arriendo" | lexical (variante regional) |

`Opinión profesional:` De los 24 cambios, ninguno toca el concepto del ítem. La mayoría son sustituciones de bajo impacto y precautorias. Estimación de cuántos sobrevivirán como cambio real tras verificar "Mi Próximo Paso" vía API: probablemente menos de la mitad, porque el léxico de "Mi Próximo Paso" ya está construido para hispanohablantes en EE. UU. (mayoría mexicano-americana y caribeña) y suele estar más cerca del colombiano que del español peninsular (pack §2.2). El conteo de 24 **no** activa el criterio de escalamiento del §A-8.5, que se evalúa con datos del piloto, no con el desk review.

### B-4. Lista priorizada de ítems a vigilar en campo

Orden de prioridad para la atención de la facilitación y de los codificadores durante el piloto.

**Prioridad 1 — riesgo lexical concreto (verificar comprensión de la palabra):**

- **A8** "claqué" — riesgo de término de España; el más citado en el pack (§2.2, §8.3).
- **E7** "pleito / litigio" — tecnicismo legal.
- **C8** "renta" vs. "arriendo" — variante regional que puede generar confusión con el impuesto.
- **R4** "piscifactoría" — término de España.
- **E8** "mercadear" — calco que puede no comprenderse.
- **R9** "configurar" — riesgo de interpretación informática (señal de ambigüedad, no de fallo lexical).

**Prioridad 2 — riesgo de familiaridad cultural (la palabra se entiende, la actividad puede sentirse ajena):**

- **R4** "criar peces en un criadero" — piscicultura poco visible en zona urbana.
- **R10** "apagar incendios forestales" — ocupación infrecuente.
- **I4** "estudiar el movimiento de los planetas" — astronomía profesional muy escasa en Colombia.
- **E1** "comprar y vender acciones y bonos" — concepto financiero de familiaridad desigual según nivel educativo.

**Prioridad 3 — variantes regionales de bajo impacto (confirmar que no estorban):**

- **C1 / C3** "computadora" vs. "computador".
- **S5** "sin fines de lucro" vs. "sin ánimo de lucro".
- **R6** "conducir" vs. "manejar".
- **I1** "medicina" vs. "medicamento".

`Inferencia:` E1 y R4 aparecen en dos prioridades porque combinan ambos tipos de riesgo. Los codificadores deben distinguir con cuidado entre `LEX` (no entiende la palabra) y `CULT` (entiende pero la siente ajena); el codebook §A-7 regla 2 cubre ese caso.

---

## REFERENCIAS

Las referencias psicométricas y de licencia del instrumento están consolidadas en el pack base, `implementation_packs/O-NET-IP-SF_Implementation_Acquisition_Pack_v1.0_Consolidado.md` §10 (19 referencias APA 7). Las relevantes para este field kit:

Congreso de la República de Colombia. (2012). *Ley 1581 de 2012, por la cual se dictan disposiciones generales para la protección de datos personales.* Diario Oficial No. 48.587. http://www.secretariasenado.gov.co/senado/basedoc/ley_1581_2012.html

Rounds, J., Su, R., Lewis, P., & Rivkin, D. (2010). *O*NET Interest Profiler Short Form psychometric characteristics: Summary.* National Center for O*NET Development. https://www.onetcenter.org/reports/IPSF_Psychometric.html

National Center for O*NET Development. (2025). *O*NET® Tools Developer License.* https://www.onetcenter.org/license_toolsdev.html

`Nota de validez y límites:` Este field kit instrumenta un piloto de **comprensión lexical** en español de Colombia. No valida confiabilidad ni estructura RIASEC (eso corresponde a las fases 2 y 3 del pack §8.1), no valida accesibilidad, y no produce baremos. La equivalencia cultural plena requiere, además del piloto cognitivo, la validación cuantitativa posterior. El α que arroje el piloto es provisional por el tamaño muestral pequeño.

---

*Fin del Field Kit v1.0 — Piloto Cognitivo Lexical es-CO · O*NET Interest Profiler Short Form · DescubreMe · 2026-05-23*

