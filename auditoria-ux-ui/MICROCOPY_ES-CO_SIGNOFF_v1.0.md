# MICROCOPY es-CO — PAQUETE DE SIGN-OFF v1.1

**Fecha:** 2026-07-01 (v1.1: agrega §9 frases reveladoras)
**Autor (Cowork):** [Rol: UX Writer + Investigador]
**Propósito:** consolidar TODO el copy autoral pendiente en un solo entregable firmable. Al aprobarlo German, Claude Code lo siembra sin re-decidir nada.
**Gaps que cierra al firmarse:** `[GAP-MICROCOPY-VOSEO-TO-ES-CO]` (P1), `[GAP-W6-HOOKS-1]` (P1, la parte de copy), `[GAP-FREE-TEST-INTRO-COPY]` (P2), `[GAP-TEASER-CROSS-TEMPLATES-ES-CO]` (P1), `[GAP-MICROCOPY-NIVEL-CTA]` (P2), el sign-off de `MC_NIVEL_CLOSE_CTA` y `[GAP-REVEAL-PHRASES-BY-BAND]` (P1, §9 — con esto queda completo el copy autoral del Free).
**Reglas:** es-CO tuteo; sin exclamaciones, sin emojis, sin urgencia; el copy de instrumento (stems/anclas) NO está aquí (regla de oro). Los cruces sin respaldo de validez se redactan como hipótesis ("suele", "podría", "vale mirar"), nunca como hechos (PRD §6).

---

## 1. Estado de sign-off

| Sección | Contenido | Estado |
|---|---|---|
| §2 | Voseo → es-CO (todo el producto) | **Firmado 2026-07-01** — listo para aplicar |
| §3 | Cierre Free: nivel + CTA (`MC_NIVEL_CLOSE_CTA`) | **Firmado 2026-07-01** — aplicar en prod |
| §4 | Hooks + intros + transición + mini-resultado | **Firmado 2026-07-01** |
| §5 | Plantillas de cruce del teaser (14) + arquetipos (12) | **Firmado 2026-07-01** |
| §6 | Pantalla "Revisa tu correo" | **Firmado 2026-07-01** |
| §7 | Estados (guardado / reanudar / error) | **Firmado 2026-07-01** |
| §9 | Frases reveladoras por dimensión×banda (57 claves) | **Firmado 2026-07-01** |

`Estado global:` **PAQUETE COMPLETO FIRMADO (§8).** CC puede sembrar todo el contenido sin re-consultar. Cualquier edición posterior a una frase firmada se registra en el changelog y se re-firma solo esa sección.

---

## 2. Voseo → es-CO tuteo (aplicación total, Ola 0)

Reemplazo directo en `lib/i18n/microcopy/*` y superficies vivas:

| Vivo hoy (voseo) | Corregido (es-CO tuteo) |
|---|---|
| "Conocé a fondo cómo funcionás" | "Conoce a fondo cómo funcionas" |
| "Empezá gratis" | "Empieza gratis" |
| "No necesitás crear cuenta" | "No necesitas crear cuenta" *(revisar: con ADR-029 el flujo SÍ pide cuenta; si la frase sigue viva, retirarla)* |
| "Trazá el mapa de quién sos" | "Traza el mapa de quién eres" |
| "Serás intereses, un patrón" | "Tus intereses dibujan un patrón" |
| "Resultados que reconocés como tuyos" | "Resultados que reconoces como tuyos" |
| Cualquier "vos/tenés/querés/podés/hacé/mirá" | tú/tienes/quieres/puedes/haz/mira |

**Landing (claves finales, del prototipo):**
- Eyebrow: "AUTOCONOCIMIENTO CON RIGOR"
- H1: "Conoce a fondo cómo funcionas, *sin etiquetas*."
- Sub: "Un primer mapa de tu personalidad, tus intereses, lo que valoras y tu bienestar. En 12-18 minutos, en lenguaje claro."
- CTA: "Empezar gratis →" · Micro: "Gratis. Sin tarjeta. Sin trucos."
- Chip honestidad: "Sin urgencia, sin contadores, sin letra pequeña"
- Pie: "Instrumentos validados · Resultados que reconoces como tuyos, no veredictos"
- Card instrumentos: "Tu mapa, en cuatro instrumentos validados" — Personalidad (Cinco grandes rasgos) · Intereses (Hexágono RIASEC) · Valores (Circumplejo) · Bienestar (PERMA, cinco pétalos)

**Intención (taste sin datos):** tag "Sin cuenta y sin guardar datos todavía" · pregunta "¿Qué quieres entender de ti?" · sub "Con esto ordenamos tu recorrido y lo retomamos al final. Puedes cambiarlo cuando quieras." · opciones: "Autoconocimiento general — Quiero una mirada completa de cómo funciono." / "Decisiones de carrera — Quiero claridad para decidir mi rumbo." / "Mi bienestar — Quiero entender cómo estoy hoy." · CTA "Continuar →"

**Registro:** eyebrow "UN SOLO PASO" · H1 "Crea tu cuenta sin contraseñas" · cuerpo "Te enviamos un enlace para entrar. Así guardamos tu avance y puedes volver cuando quieras, desde cualquier dispositivo." · label "Tu correo" · check "Confirmo que tengo 18 años o más." · CTA "Enviarme el enlace →" · micro "Sin contraseñas, sin spam. Usamos tu correo solo para entrar y avisarte de tu perfil."

**Consentimiento:** ver blueprint §4 (texto completo, sin cambios).

**Mapa:** recall "Para lo que buscas — {intención} — empezamos por aquí." · H1 "Cuatro paradas, 12-18 minutos" · sub "Puedes hacerlo de una o en dos ratos; guardamos tu avance." · CTA "Empezar por personalidad →"

---

## 3. Cierre Free (ADR-031) — nivel + CTA `MC_NIVEL_CLOSE_CTA`

**Pantalla de nivel (momento 1):**
- Título: "Un último dato para afinar tu mapa"
- Cuerpo: "Con tu nivel de estudios y tu momento profesional ajustamos los entornos de trabajo que te vamos a mostrar. No cambia tus resultados; cambia qué tan útiles son las sugerencias."
- `MC_NIVEL_CLOSE_CTA` (hoy placeholder "Ver tu perfil integrado"): **propuesta → "Ver tu primer mapa →"**
  - Por qué: "perfil integrado" promete el integrador Paid; "tu primer mapa" es el lenguaje del teaser (título "Tu primer mapa") y no sobre-promete. Coherente con `[GAP-MICROCOPY-NIVEL-CTA]`.
- Nota de control: "Puedes cambiar o borrar este dato cuando quieras en Mis datos."

**Sección "Entornos a explorar" (dentro del teaser, momento 2):**
- Título de sección: "Entornos a explorar"
- Intro: "Con tu patrón y tu nivel, estos entornos suelen sentirse en casa. Explóralos como pistas, no como veredictos."
- Item (por ocupación): nombre + dimensión RIASEC dominante. Sin porcentajes, sin "match".
- Cierre de sección: "Hay más entornos y más matices en el perfil completo."

---

## 4. Por test: hooks, intros y transición (Ola 2)

### 4.1 Hooks (firmados de facto en el prototipo)

| Test | Hook es-CO |
|---|---|
| Personalidad (BFI-2-S) | "Cinco grandes rasgos dan forma a cómo piensas, sientes y te relacionas. Vamos a ver los tuyos." |
| Intereses (O*NET IP-SF) | "Vamos a mapear qué tipo de actividades te energizan y cuáles te drenan." |
| Valores (TwIVI) | "Lo que más te importa guía tus decisiones, muchas veces sin que lo notes. Vamos a ponerlo en palabras." |
| Bienestar (PERMA) | "Una foto honesta de cómo está tu bienestar hoy, en cinco dimensiones." |

### 4.2 "Antes de comenzar" (intro factual por test) — cierra `[GAP-FREE-TEST-INTRO-COPY]`

| Test | Intro |
|---|---|
| Personalidad | "Vas a responder qué tanto te describen algunas frases, en una escala de muy en desacuerdo a muy de acuerdo. No hay respuestas correctas: la honesta es la útil." |
| Intereses | "Vas a calificar qué tanto te atraen distintas actividades de trabajo, de nada a mucho. Avanzas por bloques cortos; responde por gusto, no por lo que 'deberías'." |
| Valores | "Vas a leer descripciones cortas de personas y decir qué tanto se parecen a ti. No hay valores buenos ni malos: hay los tuyos." |
| Bienestar | "Vas a responder cómo te has sentido últimamente en cinco dimensiones de tu bienestar. Es una foto de hoy, no una etiqueta para siempre." |

`Nota NFR-27 (personalidad y bienestar, contenedor aparte, contenido intacto):` "Algunas preguntas tocan tu estado de ánimo. No es una evaluación clínica y puedes omitir las que prefieras. Si en algún momento necesitas apoyo, te dejaremos a mano líneas de ayuda."

### 4.3 Transición (plantilla + las 3 instancias)

Plantilla: "Listo: {recap}. Vas {n} de 4. Sigue: {test} — {hook}. Toma unos {min} min."

| Paso | Recap (una línea) |
|---|---|
| 1→2 | "Tu personalidad, en un primer trazo." |
| 2→3 | "Tus intereses ya dibujan un patrón." |
| 3→4 | "Lo que más te importa, ya en palabras." |

Recall de intención (línea superior): "Sigues buscando {intención en minúscula}. Vas por buen camino."

### 4.4 Mini-resultado (plantilla de 3 partes)

| Parte | Personalidad (ejemplo firmado) |
|---|---|
| Qué medimos | "Tu nivel en cinco grandes rasgos de personalidad." |
| Qué dice tu resultado | frase reveladora por banda — **librería completa en §9** |
| Por qué te importa | "En tu perfil integrado, esto se cruza con qué actividades te atraen y con cómo sostienes tu bienestar." |

Leyenda de bandas (obligatoria bajo el visual): "La banda es tu rango probable, no un punto exacto."

`Resuelto en v1.1:` las frases reveladoras por dimensión × banda de los 4 tests están en **§9** (57 claves + reglas de composición). Las líneas fijas "Qué medimos" / "Por qué te importa" de los 4 tests, en §9.5.

---

## 5. Plantillas de cruce del teaser (cierra `[GAP-TEASER-CROSS-TEMPLATES-ES-CO]`)

**Uso:** la "pincelada" del teaser toma 1-2 plantillas cuyas condiciones se cumplan (prioridad por orden). Determinista, sin LLM, trazable. Notación: `HOV` = valor de orden superior dominante; `RIASEC` = dimensión(es) top; `E/O/C/A/N` = bandas BFI (alta/media/baja, etiquetas cotidianas); `PERMA driver` = dimensión de bienestar más alta.

`Salvaguardas:` lenguaje de hipótesis; nada clínico; el cruce nombra lo que existe y lo que el Paid profundiza, sin entregarlo a medias ni predecir.

| ID | Condición | Texto es-CO |
|---|---|---|
| X-01 | HOV=apertura al cambio AND RIASEC⊇{I o A} | "Tus valores y tus intereses apuntan a entornos donde decides cómo trabajar. En el perfil completo verías cómo eso se combina con tus fortalezas y dónde asoman tensiones que aquí apenas se insinúan." |
| X-02 | HOV=autotrascendencia AND RIASEC⊇{S} | "Te importa aportar a otros y tus intereses van por el mismo camino. Vale mirar qué tanto tu día a día real te deja ejercer eso: ahí suele estar la diferencia entre motivación y desgaste." |
| X-03 | HOV=conservación AND RIASEC⊇{C o R} | "Valoras la estabilidad y te atraen las actividades con estructura clara. Es una combinación consistente; la pregunta interesante es dónde te deja espacio para variar sin perder piso." |
| X-04 | HOV=autopromoción AND RIASEC⊇{E} | "Te mueve avanzar y te atraen los entornos de iniciativa. El perfil completo mira qué papel juegan ahí tus rasgos: empuje sin freno y empuje con método se viven distinto." |
| X-05 | E=baja AND RIASEC⊇{S} | "Te atrae el trabajo con personas, y a la vez recargas energía en lo tranquilo. No es contradicción: suele ser cuestión de dosis. Vale mirar cómo la manejas." |
| X-06 | E=alta AND RIASEC⊇{I} | "Te energiza la gente y te atrae investigar, que suele ser trabajo silencioso. Esa mezcla suele buscar entornos donde pensar en voz alta con otros." |
| X-07 | O=alta AND HOV=conservación | "Tu curiosidad empuja hacia lo nuevo y tus valores piden estabilidad. Muchas personas viven bien esa tensión; el perfil completo te muestra dónde la sientes más." |
| X-08 | C=alta AND RIASEC⊇{A} | "Te atrae crear y lo tuyo no es el caos: organizas. La creatividad con método es menos común de lo que parece; vale ver en qué condiciones te rinde." |
| X-09 | C=baja AND HOV=autopromoción | "Quieres avanzar y arrancar te cuesta más de lo que quisieras. Antes que disciplina genérica, suele servir diseñar el entorno: eso se explora en tus bordes de crecimiento." |
| X-10 | PERMA driver=sentido | "Hoy tu bienestar se apoya sobre todo en el sentido de lo que haces, más que en lo social o el logro. Cuando el sentido flaquea, todo lo demás pesa más: es tu señal a cuidar." |
| X-11 | PERMA driver=relaciones AND E=baja | "Tus vínculos sostienen tu bienestar, aunque no seas de mucha gente a la vez. Pocas relaciones profundas parecen ser tu fórmula; el perfil completo mira cómo protegerla." |
| X-12 | PERMA driver=logro AND HOV=autopromoción | "El avance te da bienestar y tus valores van en la misma línea. La pregunta que el perfil completo explora: qué pasa contigo cuando el logro se demora." |
| X-13 | N=alta (calma baja) AND PERMA alto | "Sientes las emociones con intensidad y aun así tu bienestar hoy está bien apoyado. Eso suele hablar de recursos propios que vale la pena conocer con nombre." |
| X-14 | Fallback (sin cruce fuerte) | "Tus cuatro dimensiones ya dibujan un patrón propio. El perfil completo las cruza a fondo: ahí es donde aparecen las conexiones que uno no ve mirándolas de a una." |

`Regla de composición:` X-01..X-04 (valores×intereses) tienen prioridad 1; X-05..X-09 (personalidad×intereses/valores) prioridad 2; X-10..X-13 (bienestar) prioridad 3; X-14 solo si ninguna aplica. Máximo 2 pinceladas por teaser.

### 5.1 Arquetipos de constelación (nombre del "Tu primer mapa")

Determinista: `RIASEC top` × `energía social (E)`. Artículo según preferencia de género NO se pregunta → usar forma neutra "El/La" no: **usar sustantivo sin artículo posesivo, con artículo masculino genérico evitado → forma elegida: "Perfil {nombre}" o el nombre directo con artículo neutro plural no aplica.** Decisión: se usa "El/La" según palabra, eligiendo sustantivos de género fijo gramatical (no del usuario):

| RIASEC top | E baja (tranquilo) | E alta (social) |
|---|---|---|
| Investigar (I) | El explorador autónomo | La mente que piensa en voz alta |
| Crear (A) | El taller silencioso | La chispa que convoca |
| Social (S) | La presencia que acompaña | El puente entre personas |
| Emprender (E) | La estrategia paciente | El motor de arranque |
| Convencional (C) | El orden que da calma | La bitácora del equipo |
| Realista (R) | Las manos que resuelven | El terreno compartido |

`Nota:` los nombres usan género gramatical del sustantivo (la mente, el puente), no del usuario — sin asunciones. Son descriptivos, no etiquetas fijas; el subtítulo siempre matiza ("así se ve tu patrón hoy").

---

## 6. Pantalla "Revisa tu correo" (blueprint §7.3.1)

- Título: "Te enviamos el enlace"
- Cuerpo: "Revisa tu correo **{email}** y toca el enlace para entrar. Vale por un rato corto; si expira, aquí mismo te enviamos otro."
- Secundario: "¿No llega? Mira en spam o promociones."
- Botón (habilitado a los 30 s): "Reenviar enlace" → confirmación "Listo, enviamos uno nuevo."
- Micro: "Puedes cerrar esta pestaña: el enlace te trae de vuelta exactamente aquí."
- Estado link expirado: "Ese enlace ya expiró. Te enviamos uno nuevo si quieres." + [ Reenviar enlace ]

---

## 7. Estados (confirmados del blueprint §12)

- Guardado: "Guardamos tu avance. Puedes cerrar y volver cuando quieras."
- Reanudar: "Retomamos donde quedaste."
- Error suave: "Algo no cargó bien. Vuelve a intentar en un momento; tu avance está a salvo."
- Declinar (neutro, sin culpa): "Ahora no"

---

## 8. Checklist de sign-off (German)

**FIRMADO — German Velez, 2026-07-01 (aprobación integral registrada vía Cowork).**

- [x] §3 `MC_NIVEL_CLOSE_CTA` = "Ver tu primer mapa →" (reemplaza "Ver tu perfil integrado")
- [x] §5 las 14 plantillas de cruce (leerlas una a una; son la voz del clímax)
- [x] §5.1 los 12 nombres de arquetipo
- [x] §4.2 las 4 intros "Antes de comenzar"
- [x] **§9 las frases reveladoras (57 claves)** — leer al menos: los 10 fragmentos BFI (§9.1), los 6 picos O*NET (§9.2), las 4 HOV (§9.3) y las variantes sensibles de PERMA (§9.4, incluida la salvaguarda LOW_OVERALL)
- [x] Resto (§2, §4.1, §4.3, §6, §7, §9.5): visto bueno general

**Al firmar:** CC siembra §2-§7 (olas 0-3 del `HANDOFF_UI_v1.0.md`) y §9 (ola 2.3: mini-resultados con datos reales). En BACKLOG se marcan entregados los gaps del encabezado. Con §9, **no queda copy autoral pendiente del Free** (los siguientes frentes de copy son Paid/integrador — blueprint §9 — y B2B).

---

## 9. Frases reveladoras por dimensión × banda (cierra `[GAP-REVEAL-PHRASES-BY-BAND]`) — nuevo v1.1

**Qué es:** la librería de la capa 2 ("Qué dice tu resultado") de los mini-resultados del Free. Es copy autoral (blueprint §5: ahí "se juega la magia") — distinto de los textos de interpretación de los packs, que alimentan las capas 3-4 del reporte. Determinista, sin LLM, trazable por clave.

**Contrato de entrada (este documento consume, NO calcula):**
- `banda[dim] ∈ {alta, media, baja}` y `saliencia[dim]` las define la capa de scoring según el pack de cada instrumento (baremo o puntos de corte anclados a escala — decisión del pack, no de este doc).
- Empates de dimensión top en O*NET: resolver con la regla de high-point code del pack; aquí llegan `top1/top2` ya resueltos.
- Umbrales ("gap grande", "HOV adyacentes cercanos") los fija el pack/scoring; aquí solo se definen las ramas.

**Reglas de redacción aplicadas (verificadas frase a frase):** es-CO tuteo; **cero adjetivos con marca de género aplicados al usuario** (construcciones verbales: "recargas", "te mueves", "prefieres"); sin léxico clínico; sin déficit (banda baja = preferencia o estilo, nunca carencia); sin exclamaciones; frases de hipótesis donde hay cruce; longitud objetivo 8-18 palabras por frase compuesta.

### 9.1 Personalidad (BFI-2-S) — fragmentos por dimensión × banda

`Decisión de diseño (refina el flag "5×3"):` la banda **media no genera frase propia** — "ni mucho ni poco" es el camino directo al efecto Barnum. El compositor usa solo dimensiones en banda alta/baja; si ninguna lo está, cae al fallback de equilibrio (que sí es específico: describe flexibilidad situacional como rasgo).

Fragmentos (cláusulas en minúscula, componibles con "y"):

| Clave | Dimensión (etiqueta cotidiana) | Banda | Fragmento |
|---|---|---|---|
| `MC_REVEAL_BFI_FRAG_E_ALTA` | Energía social | alta | "la gente te carga las pilas" |
| `MC_REVEAL_BFI_FRAG_E_BAJA` | Energía social | baja | "recargas energía en lo tranquilo" |
| `MC_REVEAL_BFI_FRAG_O_ALTA` | Curiosidad | alta | "te mueves por la curiosidad" |
| `MC_REVEAL_BFI_FRAG_O_BAJA` | Curiosidad | baja | "prefieres lo probado a lo experimental" |
| `MC_REVEAL_BFI_FRAG_C_ALTA` | Organización | alta | "el orden te da impulso, no te frena" |
| `MC_REVEAL_BFI_FRAG_C_BAJA` | Organización | baja | "te acomodas mejor en lo flexible que en lo estructurado" |
| `MC_REVEAL_BFI_FRAG_A_ALTA` | Cooperación | alta | "te importa que la gente a tu alrededor esté bien" |
| `MC_REVEAL_BFI_FRAG_A_BAJA` | Cooperación | baja | "defiendes tu punto aunque incomode" |
| `MC_REVEAL_BFI_FRAG_N_ALTA` | Calma | alta | "mantienes el pulso estable aunque el entorno se agite" |
| `MC_REVEAL_BFI_FRAG_N_BAJA` | Calma | baja | "sientes con intensidad lo que pasa a tu alrededor" |

`Nota Calma/baja (sensible):` redactada como intensidad informativa, no como déficit ni ansiedad. No usar sinónimos clínicos al iterar.

Piezas de composición:

| Clave | Texto |
|---|---|
| `MC_REVEAL_BFI_CODA_SINGLE` | "Y eso ordena más de tu día a día de lo que parece." |
| `MC_REVEAL_BFI_FALLBACK_MEDIA` | "Tu perfil no vive en los extremos: te mueves según lo que la situación pide. Eso también es un rasgo, y de los útiles." |

**Regla de composición BFI (spec, no código):**

```
extremas = dimensiones con banda != media, ordenadas por saliencia desc
si extremas >= 2:  frase = Cap(frag[d1]) + " y " + frag[d2] + "."
si extremas == 1:  frase = Cap(frag[d1]) + ". " + CODA_SINGLE
si extremas == 0:  frase = FALLBACK_MEDIA
```

Los fragmentos están redactados para leerse bien en cualquier orden y posición (verbos variados, sin repetición de arranque). Ejemplo real: E baja + O alta → "Recargas energía en lo tranquilo y te mueves por la curiosidad." (la frase del prototipo, que este sistema reproduce).

### 9.2 Intereses (O*NET IP-SF / RIASEC) — pares top-2 y picos únicos

**Regla:** si `gap(top1, top2) >= umbral del pack` → frase de pico único; si no → frase del par (clave con las dos letras en orden canónico RIASEC: R < I < A < S < E < C; el orden del texto ya está resuelto en la redacción).

Pares (15):

| Clave | Par | Frase |
|---|---|---|
| `MC_REVEAL_ONET_PAIR_RI` | R+I | "Te llama entender cómo funcionan las cosas, mejor si puedes meterles mano." |
| `MC_REVEAL_ONET_PAIR_RA` | R+A | "Te gusta hacer con las manos, y que quede bonito además de útil." |
| `MC_REVEAL_ONET_PAIR_RS` | R+S | "Ayudar en concreto, con hechos más que con discursos: eso te llama." |
| `MC_REVEAL_ONET_PAIR_RE` | R+E | "Te gusta emprender en el terreno, donde las cosas pasan de verdad." |
| `MC_REVEAL_ONET_PAIR_RC` | R+C | "Te acomodan el orden y lo tangible: procesos claros y resultados que se ven." |
| `MC_REVEAL_ONET_PAIR_IA` | I+A | "Te llaman investigar y crear: entender cómo funcionan las cosas y hacer algo nuevo con eso." |
| `MC_REVEAL_ONET_PAIR_IS` | I+S | "Te atrae entender a fondo, y ponerlo al servicio de otros." |
| `MC_REVEAL_ONET_PAIR_IE` | I+E | "Te gusta entender el problema y también mover la solución." |
| `MC_REVEAL_ONET_PAIR_IC` | I+C | "Te atraen los problemas que se resuelven con análisis y método." |
| `MC_REVEAL_ONET_PAIR_AS` | A+S | "Crear y conectar con la gente son tus dos motores." |
| `MC_REVEAL_ONET_PAIR_AE` | A+E | "Te atrae crear y sacar lo creado al mundo, no dejarlo en el cajón." |
| `MC_REVEAL_ONET_PAIR_AC` | A+C | "Creas mejor con estructura: la forma y el orden no se te pelean." |
| `MC_REVEAL_ONET_PAIR_SE` | S+E | "Te energiza la gente: acompañarla y también movilizarla." |
| `MC_REVEAL_ONET_PAIR_SC` | S+C | "Te atrae ayudar con orden: que el cuidado también funcione bien." |
| `MC_REVEAL_ONET_PAIR_EC` | E+C | "Te atrae dirigir con método: iniciativa sí, pero organizada." |

Picos únicos (6):

| Clave | Dim | Frase |
|---|---|---|
| `MC_REVEAL_ONET_SINGLE_R` | Realista | "Lo concreto te llama: herramientas, terreno y resultados que se pueden tocar." |
| `MC_REVEAL_ONET_SINGLE_I` | Investigar | "Entender cómo funcionan las cosas te energiza más que casi cualquier otra actividad." |
| `MC_REVEAL_ONET_SINGLE_A` | Crear | "Darle forma a algo que no existía: eso es lo que más te llama." |
| `MC_REVEAL_ONET_SINGLE_S` | Social | "El trabajo con personas te energiza más que el trabajo con cosas." |
| `MC_REVEAL_ONET_SINGLE_E` | Emprender | "Arrancar cosas y convencer a otros de subirse: eso te mueve." |
| `MC_REVEAL_ONET_SINGLE_C` | Convencional | "El orden no te aburre: te da terreno firme para rendir." |

`Nota:` estas frases son capa 2 del mini-resultado. NO reemplazan las narrativas RIASEC del reporte (seed existente de 132 plantillas) — ojo: ese seed está redactado con **voseo verbal** (delivery 2026-06-08) y entra al alcance de la ola 0.1 del `HANDOFF_UI` (pasarlo a es-CO tuteo).

### 9.3 Valores (TwIVI / 4 HOV) — dominante y pares adyacentes

**Regla:** si dos HOV **adyacentes** en el circumplejo quedan dentro del umbral de cercanía → frase de par; si no → frase del dominante. (Los opuestos no pueden dominar juntos por construcción MRAT.)

| Clave | HOV | Frase |
|---|---|---|
| `MC_REVEAL_TWIVI_HOV_APERTURA` | Apertura al cambio | "Valoras decidir tu rumbo y probar cosas nuevas, por encima de lo seguro." |
| `MC_REVEAL_TWIVI_HOV_AUTOTRASC` | Autotrascendencia | "El bienestar de otros y del entorno pesa fuerte en tus decisiones." |
| `MC_REVEAL_TWIVI_HOV_CONSERV` | Conservación | "Valoras la estabilidad y el terreno conocido: ahí es donde construyes." |
| `MC_REVEAL_TWIVI_HOV_AUTOPROM` | Autopromoción | "Lograr cosas y avanzar ocupa un lugar alto en lo que valoras." |
| `MC_REVEAL_TWIVI_PAIR_APER_PROM` | Apertura + Autopromoción | "Valoras la autonomía y el logro: decidir tu camino y llegar lejos en él." |
| `MC_REVEAL_TWIVI_PAIR_APER_TRASC` | Apertura + Autotrascendencia | "Valoras tu libertad y el cuidado de otros: independencia que no se desentiende." |
| `MC_REVEAL_TWIVI_PAIR_CONS_PROM` | Conservación + Autopromoción | "Valoras avanzar sobre terreno firme: ambición con cimientos." |
| `MC_REVEAL_TWIVI_PAIR_CONS_TRASC` | Conservación + Autotrascendencia | "Valoras cuidar: a los tuyos, las costumbres y lo que ya se ha construido." |

### 9.4 Bienestar (PERMA-Profiler) — driver + variantes sensibles

**Regla:** `overall banda baja` → variante sensible con el driver como apoyo; `todas las dimensiones parejas` → variante de equilibrio; caso general → frase del driver (dimensión más alta).

| Clave | Driver | Frase |
|---|---|---|
| `MC_REVEAL_PERMA_DRIVER_P` | Emociones positivas | "Hoy tu bienestar se apoya sobre todo en tu capacidad de disfrutar lo cotidiano." |
| `MC_REVEAL_PERMA_DRIVER_E` | Engagement | "Hoy tu bienestar se apoya en esos momentos en los que el tiempo se te pasa sin sentir." |
| `MC_REVEAL_PERMA_DRIVER_R` | Relaciones | "Hoy tu bienestar se apoya sobre todo en tus vínculos." |
| `MC_REVEAL_PERMA_DRIVER_M` | Sentido | "Hoy tu bienestar se apoya sobre todo en el sentido de lo que haces." |
| `MC_REVEAL_PERMA_DRIVER_A` | Logro | "Hoy tu bienestar se apoya sobre todo en la sensación de avanzar." |

Variantes:

| Clave | Cuándo | Texto |
|---|---|---|
| `MC_REVEAL_PERMA_LOW_OVERALL` | overall = baja | "Hoy tu bienestar pasa por un momento más bajo, y verlo con claridad ya es información valiosa. Tu punto de apoyo más firme hoy: {driver_label}." |
| `MC_REVEAL_PERMA_BALANCED` | sin driver claro | "Tu bienestar hoy se reparte parejo entre sus cinco dimensiones; ninguna carga sola con todo." |
| `MC_REVEAL_PERMA_INCOMPLETE` | (futuro, si existe skip) | "Tu foto de hoy quedó incompleta, y está bien: puedes completarla cuando quieras." |

`driver_label` (para LOW_OVERALL): P="el disfrute cotidiano" · E="lo que te absorbe" · R="tus vínculos" · M="el sentido de lo que haces" · A="la sensación de avanzar".

`Salvaguarda NFR-27/28 (obligatoria):` cuando `overall = baja`, el mini-resultado muestra además el footer de contención existente (ruta NFR-28). La frase LOW_OVERALL está redactada para no reforzar lo negativo (nombra el momento, no etiqueta a la persona; "momento más bajo", nunca términos de estado clínico) ni caer en positivismo vacío. No iterar este texto sin revisar esta salvaguarda.

### 9.5 Líneas fijas del mini-resultado por test (completa §4.4)

| Test | `MC_MINIRESULT_*_MEASURE` (Qué medimos) | `MC_MINIRESULT_*_WHY` (Por qué te importa) |
|---|---|---|
| BFI | "Tu nivel en cinco grandes rasgos de personalidad." | "En tu perfil integrado, esto se cruza con qué actividades te atraen y con cómo sostienes tu bienestar." |
| ONET | "Qué tipos de actividades te atraen, en seis dimensiones." | "Sobre este mapa se eligen los entornos de trabajo que vas a explorar al final." |
| TWIVI | "Lo que más pesa cuando decides, en cuatro grandes direcciones." | "En tu perfil integrado, tus valores se cruzan con tus intereses: ahí se ve si tu rumbo y tu brújula van juntos." |
| PERMA | "Cómo está tu bienestar hoy, en cinco dimensiones." | "Cierra tu primer mapa: muestra desde dónde estás leyendo todo lo demás." |

### 9.6 Notas de implementación (CC)

1. Sembrar como plantillas determinísticas (patrón del seed RIASEC: clave estable + slot), NO generar con LLM en runtime.
2. La frase del mini-resultado BFI alimenta también el recap de la transición 1→2 (misma fuente, no duplicar texto).
3. Lint de frases prohibidas del repo aplica a este contenido (igual que al seed RIASEC).
4. Total de piezas: 10 fragmentos BFI + 2 composición + 21 O*NET + 8 TwIVI + 8 PERMA + 8 líneas fijas = **57 claves**.

---

## Changelog

| Versión | Fecha | Cambios |
|---|---|---|
| 1.1 | 2026-07-01 | Nueva §9: librería de frases reveladoras por dimensión×banda (57 claves: BFI composición por fragmentos, O*NET 15 pares + 6 picos, TwIVI 4 HOV + 4 pares adyacentes, PERMA 5 drivers + variantes sensibles con salvaguarda NFR-27/28, líneas fijas por test). Cierra `[GAP-REVEAL-PHRASES-BY-BAND]` a nivel de contenido (pendiente sign-off §8 + seed CC). §4.4 y §8 actualizados. |
| 1.0 | 2026-07-01 | Versión inicial del paquete firmable. |

---

*Fin del paquete de microcopy v1.1. Fuente visual: prototipo Claude Design 2026-06-30. Sin firmar §3, §5 y §9, CC puede avanzar olas 0-2 con lo ya listo (§9 se siembra en ola 2.3).*
