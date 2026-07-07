# BLUEPRINT DE EXPERIENCIA — DescubreMe

**Fecha:** 2026-07-01 (v1.2) · 2026-06-29 (v1.0/v1.1)
**Autor (Cowork):** [Rol: UX Researcher / UX Writer + Estratega de producto + PM con research]
**Versión:** 1.2
**Naturaleza:** spec de experiencia y microcopy (no código). Define comportamiento, flujo, textos es-CO y dirección visual. Lo implementa Claude Code con `ui-ux-pro-max-skill`.
**Fuentes de verdad:** `PRD_MAESTRO.md` v2.0 (§5 productos, §6 integrador, §7 lentes B2B, §8 stack), `UX_EXPERIENCE_SPEC.md` v1.0 (sistema de magia, hooks, capas), `auditoria-ux-ui/AUDITORIA.md` + mockups A/B/C, `auditoria-ux-ui/INVESTIGACION_MERCADO_UX_v1.0.md` (benchmarks y mejores prácticas del mercado), **prototipo navegable Claude Design** (`DescubreMe Prototipo.dc.html`, proyecto `15f3319f-a0fc-4573-aeba-c978ef465352`, 2026-06-30 — referencia visual de todas las pantallas del Free + teaser/Paid/integrador/Ikigai/B2B).
**Decisiones de sesión que gobiernan este blueprint:**
1. Dirección visual: **A "Papel y tinta" como base + tratamiento "constelación" de B para el clímax** (integrador y teaser).
2. Resultados Free: **híbrido** (pista mínima por test + resultados reales en el teaser).
3. Consentimiento: **"aceptar y listo"** (una pantalla, compatible Ley 1581).
4. Voz: **es-CO tuteo** (se elimina el voseo).
5. Cobertura: personas (Free → Paid → Ikigai) y empresas (B2B-A), todo a fondo.
6. **Valor antes de pedir datos:** un "taste" de intención sin datos en la landing (resuelve el value-first del mercado dentro de Ley 1581).
7. **Guardarraíl anti-dark-patterns:** la conversión nunca usa los patrones del §14; es además mensaje de marca ("sin trucos").
8. **Cierre canónico del Free (ADR-031):** nivel obligatorio → teaser-constelación CON ocupaciones dentro (un solo clímax). Reconcilia el recut de Phase 2.1 (W5/W6 vivos en prod) con el prototipo.

`Novedad v1.1 (2026-06-29):` integra la investigación de mercado (benchmarks de abandono, reveal por capas, frase por combinación, conversión ética, B2B identificación indirecta) y las decisiones del prototipo v2 (`prototipo-rediseno-free-v2.html`).

`Novedad v1.2 (2026-07-01):` integra la revisión del prototipo Claude Design y el ADR-031: cierre Free canónico (§7.7 reescrito con nivel + ocupaciones dentro de la constelación), pantalla "Revisa tu correo" del magic link (§7.3.1), reglas responsive móvil (§3.7), y pendientes de prototipo nombrados (§16). El prototipo pasa a ser la referencia visual; este blueprint sigue siendo la spec canónica de comportamiento.

> Todo el copy en bloques `>` o en comillas es **es-CO tuteo, listo para usar**. El copy de instrumento (stems de ítems, anclas de escala) NO está aquí: se extrae de fuente validada (regla de oro, UX_SPEC §1).

---

## 0. Resumen ejecutivo

DescubreMe gana cuando el usuario siente dos cosas a la vez: que esto es **riguroso y honesto**, y que es **hermoso y fluido**. Hoy cumple lo primero (por dentro) y falla lo segundo (por fuera). Este blueprint rediseña la experiencia completa para que cada pantalla tenga un foco, cada test devuelva un "ajá", cada transición explique "qué hiciste y qué sigue", y el clímax (el perfil integrado) se sienta como un descubrimiento, no como un documento. La estética base es un libro de psicología hermoso (cálido, sereno, editorial); el clímax se eleva a una constelación. Nada de esto altera la psicometría: la magia vive en el framing, lo visual y la narrativa, alrededor del instrumento.

---

## 1. Principios de experiencia (el norte)

`Opinión profesional:` siete principios resuelven el 90% de tus quejas. Cuando una decisión de diseño dude, gana el principio.

1. **Un foco por pantalla.** Una pregunta, un resultado, una acción. La calma comunica rigor. (Resuelve "el proceso es complicado".)
2. **Siempre sabes dónde estás y qué sigue.** Mapa del recorrido visible, progreso visible, transiciones que recapitulan y anticipan. (Resuelve "no entiendo qué hice ni qué debo hacer".)
3. **Cada paso devuelve algo.** Ningún test termina sin un "ajá" mínimo. El valor no se aplaza todo al final. (Resuelve "no veo resultados".)
4. **Visual primero, lenguaje cotidiano.** Cada resultado entra por una imagen y una frase que reconoces como tuya; la profundidad está disponible, no impuesta.
5. **Honestidad como parte del delight.** No inflamos, no predecimos tu futuro, declaramos límites. La confianza es parte de lo que enamora.
6. **Cero manipulación.** Sin urgencia, escasez, conteos, culpa ni halago vacío. El impacto viene del craft, no de trucos. (CLAUDE.md §8.)
7. **Continuidad de marca.** Un solo sistema visual y de voz entre los 4 tests y el integrador, para que el perfil se sienta uno solo.
8. **Valor antes de pedir datos.** Antes del registro, un "taste" sin datos (una pregunta de intención) entrega valor y baja la fricción de entrada, sin recolectar nada. Es la mejor práctica del mercado (Calm, Duolingo) adaptada a Ley 1581.

---

## 2. Voz y vocabulario es-CO

**Atributos:** tuteo cordial; profesional y cálido (como un buen orientador); claro antes que ingenioso; ligero en el framing, serio en el contenido; sin urgencia ni exclamaciones.

**Corrección obligatoria — voseo → tuteo (es-CO).** El producto vivo usa voseo. Reemplazo directo:

| Vivo hoy (voseo) | Corregido (es-CO tuteo) |
|---|---|
| "Conocé a fondo cómo funcionás" | "Conoce a fondo cómo funcionas" |
| "Empezá gratis" | "Empieza gratis" |
| "No necesitás crear cuenta" | "No necesitas crear cuenta" |
| "Trazá el mapa de quién sos" | "Traza el mapa de quién eres" |
| "Serás intereses, un patrón" | "Tus intereses dibujan un patrón" |
| "Resultados que reconocés como tuyos" | "Resultados que reconoces como tuyos" |

**Do:** frases cortas; segunda persona; verbos concretos; nombrar tensiones con respeto.
**Don't:** signos de exclamación en copy de producto; léxico clínico ("trastorno", "síntoma", "diagnóstico", salvo para negarlo); "ordenador", "coger", "vosotros"; superlativos vacíos; emojis; promesas deterministas ("tu carrera ideal es X").

`Nota:` las anclas de escala son registro-neutro (sin marca tú/usted); el tuteo aplica al stem e instrucciones, no a las etiquetas de la escala.

---

## 3. Sistema visual: A base + B clímax

`Intención:` un libro de psicología hermoso (base A, claro y cálido) que, en el momento del integrador y el teaser, se abre a un cielo nocturno donde tu perfil es una constelación (acento B). El contraste mismo cuenta la historia: de lo cotidiano y legible al momento de revelación.

### 3.1 Tipografía
- **Display/títulos:** Fraunces (serif cálido, óptico variable). Da carácter sin gritar; se siente "editorial premium". Títulos grandes (hero ≥56px desktop / ≥36px móvil), no los 30px actuales.
- **Cuerpo y UI:** Hanken Grotesk (sans humanista, alta legibilidad). Reemplaza a Inter (que la propia skill marca como "estética genérica de IA").
- **Acento técnico (opcional, solo en fichas técnicas/labels psicométricos):** un mono discreto para versión/confiabilidad del instrumento, reforzando "esto es medible".

### 3.2 Color
- **Base (A):** crema papel `#F4EEE2` / `#EBE3D2`, tinta cálida casi-negra para texto, acento terracota `#B0522A` para CTA y subrayados, salvia `#6B7C5C` para datos. Adiós al azul de stock.
- **Clímax (B):** índigo nocturno `#131C3A`, texto bruma `#E7ECF7`, oro tenue `#E6C16B` y cian estelar `#8FC3DD` para las estrellas/conexiones de la constelación. Se usa SOLO en el teaser, el integrador y momentos de revelación.
- `Guardrail accesibilidad:` todo par texto/fondo cumple WCAG AA (≥4.5:1 cuerpo, ≥3:1 títulos). El nocturno se audita con especial cuidado por el texto legal; donde haya texto largo legal sobre oscuro, se usa panel claro embebido.

### 3.3 Espaciado y composición
- Mucho aire; jerarquía espacial clara; un foco por pantalla.
- Romper la "caja centrada única": hero asimétrico (texto a la izquierda, data-viz a la derecha), resultados con la imagen dominante arriba y el texto en columna estrecha legible.
- `Cicatriz ADR-021:` cualquier cambio en tokens `--spacing`/`--container` de Tailwind v4 se nombra explícitamente (ya costó un bug de layout).

### 3.4 Motion (con propósito, nunca decorativo)
- **Entrada de títulos:** revelado línea por línea (máscara), 1 vez, ~400-600ms, con `prefers-reduced-motion` que lo desactiva.
- **Resultados:** la imagen del resultado se dibuja (la barra crece, el hexágono se traza) antes de que aparezca el texto. El movimiento guía la atención al patrón.
- **Transiciones entre pantallas:** cross-fade suave + leve desplazamiento; nunca recargas bruscas.
- **Clímax:** las estrellas de la constelación titilan suave y las conexiones se dibujan al entrar.

### 3.5 Data-viz (de funcional a hermoso)
- **Hexágono RIASEC (base A):** líneas finas tinta sobre crema, vértices etiquetados en serif, área activa en salvia translúcido. Limpio, editorial.
- **Constelación (clímax B):** en el integrador/teaser, el mismo hexágono se reinterpreta como constelación: vértices = estrellas, conexiones = líneas de luz; las dimensiones que más te definen brillan más. Aquí vive el mayor diferenciador (UX_SPEC §11.2: "merece el mayor cuidado visual").
- **Barras de rasgos:** la barra muestra tu posición vs. baremo, con banda de rango (no un punto falso-preciso); etiqueta cotidiana, número secundario.
- **Circumplejo de valores:** círculo de Schwartz con tus valores resaltados.
- `Guardrail:` toda gráfica tiene alternativa no-color (texto/patrón) y label legible por lector de pantalla.

### 3.6 Componentes clave (catálogo)
| Componente | Función | Nota de experiencia |
|---|---|---|
| Captura de intención (taste sin datos) | Micro-pregunta antes del registro | No recolecta datos; se reusa al final para cerrar el loop |
| Hook card | Tarjeta de cada test con su hook + tiempo honesto | Invita, no presiona |
| Pantalla "Antes de comenzar" | Intro factual + NFR-27 donde aplica | No rediseñar el copy legal; sí su contenedor |
| Item view | Un ítem + escala | Foco único; progreso visible; respuesta inmediata al tap |
| Barra de progreso | Avance por test / global; **por bloque** en tests largos | Tranquila, informativa; el progreso debe avanzar rápido (benchmark) |
| Mini-resultado (Free) | Visual + revelación con plantilla de 3 partes (§5.1) | Capa 1-2; "ganaste algo" |
| Transición recap+preview | Puente entre tests | Cierra lo hecho, abre lo que sigue; retoma la intención |
| Línea de honestidad | Microcopy "sin trucos" cerca del CTA | Diferenciador anti-dark-patterns (§14) |
| Result card (Paid) | Resultado por capas | Visual primero; expandible |
| Vista integrador/constelación | Clímax | El componente más distintivo |
| Teaser/puente al Paid | Cierre del Free | Valor real + pregunta abierta, sin urgencia |

### 3.7 Responsive / móvil (nuevo v1.2)

`Hecho:` el prototipo Claude Design es desktop-first por decisión de iteración; el tráfico B2C LATAM será mayormente móvil. Estas reglas gobiernan la implementación responsive (detalle por componente en `HANDOFF_UI_v1.0.md §6`):

- **Breakpoints:** móvil <480px (diseño base), tablet 480-1024, desktop >1024. Mobile-first en CSS; el desktop es la ampliación, no al revés.
- **Likert:** en <480px las 5 opciones pasan de fila horizontal a **columna vertical** (targets ≥44px de alto, ancho completo). Nunca encoger texto para forzar la fila.
- **Hero landing:** asimétrico solo en desktop; en móvil se apila (título ≥36px, data-viz debajo del CTA, no antes).
- **Teaser/constelación:** en móvil la constelación va arriba (cuadrada, max 85vw) y la síntesis debajo; el CTA visible sin scroll-trap.
- **Transición y mini-resultado:** una columna; el visual del recap se reduce a miniatura (≤120px) junto al texto.
- **Barras/hexágono/circumplejo:** hexágono y circumplejo mantienen proporción 1:1 y escalan por ancho; las barras de rasgos son full-width con etiqueta arriba (no al lado).
- **Tablas B2B:** el dashboard agregado usa cards apiladas en móvil, nunca tabla con scroll horizontal.
- **Targets y tipografía:** táctiles ≥44×44px; cuerpo ≥16px (evita zoom iOS); line-height ≥1.5 en texto largo.
- `Guardrail:` `prefers-reduced-motion` aplica igual en móvil; el titileo de la constelación se desactiva.

---

## 4. Modelo de consentimiento "aceptar y listo"

`Tu queja:` "por qué no es como aceptar términos y ya está". `Solución:` una sola pantalla, lenguaje plano, honesta, con el detalle legal a un tap. Cumple Ley 1581 (consentimiento informado) sin sentirse burocrático.

**Estructura de la pantalla única:**

> **Antes de empezar, lo justo y claro**
>
> Para construir tu perfil necesitamos tratar tus respuestas. Esto es lo que hacemos y lo que no:
>
> - **Qué medimos:** cómo eres, qué te interesa, qué valoras y cómo está tu bienestar hoy.
> - **Qué NO hacemos:** no es un diagnóstico clínico, no predecimos tu futuro y no vendemos tus datos.
> - **Tus datos:** se guardan cifrados, son tuyos, y puedes ver, descargar o borrar todo cuando quieras.
>
> [ ] Acepto el tratamiento de mis datos para generar mi perfil. *(Algunas preguntas tocan tu estado de ánimo y bienestar; es voluntario y puedes omitirlas.)*
>
> [ Acepto y empiezo → ]   ·   Ver el detalle completo (política de datos)

`Nota legal (confirmar fase 7):` si el concepto jurídico exige consentimiento separado para datos sensibles (Art. 5/6), se mantiene UN solo screen con dos checks claramente rotulados, no dos pantallas. El "ver detalle completo" abre la política `lib/consent/text/<versión>.md` sin sacarte del flujo. La granularidad legal vive en el texto; la fricción percibida es de un check.

---

## 5. Sistema de resultados híbrido (capas)

Todo resultado sigue el mismo patrón de capas (UX_SPEC §8), pero el Free se queda en las capas 1-2 por test (pista) y entrega las capas profundas cruzadas en el teaser; el Paid abre todas.

| Capa | Qué muestra | Free (por test) | Free (teaser) | Paid |
|---|---|:--:|:--:|:--:|
| 1. Visual primero | Imagen del resultado (barra, hexágono, constelación) | Sí (mínima) | Sí | Sí |
| 2. Frase reveladora | Una línea que nombra el hallazgo en cotidiano | Sí | Sí | Sí |
| 3. Explicación simple | 2-3 frases sin jerga | — | Sí | Sí |
| 4. Profundidad | Facetas, baremo, ejemplos | — | Insinuada | Completa |
| 5. Qué significa + límite | Lectura accionable + nota honesta | — | Sí | Sí |

**Ejemplo de mini-resultado Free (al cerrar el test de personalidad):**

> **[Visual]** tu posición en Extraversión sobre una banda suave.
> **Frase reveladora:** "Recargas energía más en lo tranquilo que en lo social."
> **Una línea de cierre:** "Esto es una pincelada. En tu perfil integrado vas a ver cómo se conecta con tus intereses y tu bienestar."
> [ Siguiente test → ]

`Regla:` la frase reveladora (capa 2) es copy autoral y es donde se juega la magia; debe ser específica por patrón para evitar el efecto Barnum ("aplica a cualquiera"). El cierre nunca promete el futuro.

### 5.1 Plantilla de revelación en 3 partes (validada por mercado)

`Hecho (investigación):` Finimize digiere contenido intimidante con un template fijo ("Qué pasa / Qué significa / Por qué te importa"). Adoptamos su forma para cada constructo:

| Parte | Qué dice | Ejemplo es-CO (personalidad) |
|---|---|---|
| **Qué medimos** | El constructo en una línea | "Tu nivel en cinco grandes rasgos." |
| **Qué dice tu resultado** | La frase reveladora (capa 2) | "Recargas energía en lo tranquilo y te mueves por la curiosidad." |
| **Por qué te importa** | El gancho al integrador | "En tu perfil integrado, esto se cruza con tus intereses y tu bienestar." |

`Free "completo pero estrecho" (Hecho):` el mercado más ético (HIGH5, Truity) entrega un resultado real y acotado gratis y vende profundidad, en vez del "viste el 5%" de 16Personalities. El Free de DescubreMe da las 3 partes por test (acotado) y reserva la profundidad y el cruce para el Paid.

---

## 6. Sistema de transiciones (recap + preview) — el momento entre tests

`Tu queja #1:` "cuando paso de test a test no se entiende qué hice ni qué debo hacer". `Solución:` la transición deja de ser un botón pelado y pasa a ser una pantalla breve de 3 partes.

**Anatomía de la transición:**

1. **Recap (qué acabas de hacer):** una línea + el mini-resultado del test que cerraste.
2. **Mapa (dónde vas):** el recorrido de 4 con el paso actual marcado ("2 de 4").
3. **Preview + hook (qué sigue y por qué vale la pena):** el hook del próximo test.

**Ejemplo es-CO (de personalidad a intereses):**

> **Listo: tu personalidad, en un primer trazo.**
> Recargas energía en lo tranquilo y te mueves por la curiosidad. *(mini-resultado visual arriba)*
>
> **Vas 1 de 4.** ●○○○
>
> **Sigue: tus intereses.**
> "Vamos a mapear qué tipo de actividades te energizan y cuáles te drenan." Toma unos 4 minutos.
>
> [ Empezar intereses → ]

`Refuerzo de mercado (Hecho):` Headspace y Calm muestran un recap "basado en tus respuestas" como momento de payoff que valida el esfuerzo. La transición de DescubreMe además **retoma la intención** capturada en la landing ("pediste claridad para tu rumbo; vas por buen camino"), cerrando el loop.

`Guardrail:` la transición no se repite en "reanudar" (si vuelves a media sesión, retomas donde quedaste, sin re-mostrar el recap). El NFR-27 (donde aplique al próximo test) aparece en "Antes de comenzar" del test que sigue, no en la transición, para no diluirlo.

---

## 7. Viaje B2C Personas — FREE (pantalla por pantalla)

`Objetivo:` que un desconocido entre por curiosidad, complete 4 tests sin fricción, gane un "ajá" en cada paso, llegue a un teaser que lo enamora, y termine queriendo el Paid. Stack Free (PRD §8): BFI-2-S (personalidad, 30 ítems), O*NET IP-SF (intereses, 60 ítems), valores (TwIVI/PVQ-21), PERMA-Profiler (bienestar). Orden vivo: personalidad primero (gancho), intereses, valores, bienestar.

### 7.1 Mapa del journey

| # | Pantalla | Foco | Salvaguarda |
|---|---|---|---|
| 1 | Landing | Prometer el valor en una línea; mostrar que es riguroso y gratis | Sin urgencia |
| 1b | Intención (taste sin datos) | Capturar el "para qué" sin recolectar datos; se reusa al final | Sin cuenta aún (§7.2.1) |
| 2 | Registro + consentimiento | Fricción mínima (magic link) + "aceptar y listo" (§4) | Ley 1581 |
| 3 | Mapa de los 4 tests | Mostrar el recorrido como descubrimiento, no formulario | Tiempos honestos |
| 4 | Por test: hook → antes de comenzar → loop → mini-resultado | Enganche + fluidez + "ganaste algo" | NFR-27 donde aplique |
| 5 | Transición entre tests (§6) | "Qué hiciste / qué sigue" | No repetir en resume |
| 6 | Teaser integrado | Unir las 4 dimensiones + pincelada del Paid | Valor real, no cebo |
| 7 | Invitación al Paid | Mostrar que hay mucho más, sin presión | Sin urgencia artificial |

### 7.2 Pantalla 1 — Landing

`Composición (dirección A):` hero asimétrico. Izquierda: eyebrow + título Fraunces grande + subtítulo + CTA. Derecha: hexágono RIASEC dibujándose (editorial, líneas tinta sobre crema). Pie con prueba de rigor.

**Copy es-CO listo:**

> **(eyebrow)** AUTOCONOCIMIENTO CON RIGOR
>
> **(H1, Fraunces grande)** Conoce a fondo cómo funcionas, *sin etiquetas.*
>
> **(subtítulo)** Un primer mapa de tu personalidad, tus intereses, lo que valoras y tu bienestar. En 12-18 minutos y en lenguaje claro.
>
> **(CTA)** Empezar gratis →
> **(microcopy bajo CTA)** Gratis. Sin tarjeta. Sin trucos.
>
> **(línea de honestidad)** Sin urgencia, sin contadores, sin letra pequeña.
>
> **(pie)** Instrumentos validados · Resultados que reconoces como tuyos, no veredictos

`Por qué enamora:` título con carácter (serif grande, no 30px), promesa concreta en una línea, prueba de rigor sin jerga, y un dato visual (el hexágono) que insinúa lo que vas a recibir. El CTA es terracota sólido con hover que oscurece (no el hover actual que lo funde con el fondo). La línea de honestidad ("sin trucos") es diferenciación frente al mercado (§14).

### 7.2.1 Taste de intención (sin datos) — value-first dentro de Ley 1581

`Tensión resuelta:` el mercado entrega valor antes de pedir cuenta (Calm, Duolingo), pero DescubreMe debe pedir registro y consentimiento antes de los tests por Ley 1581 (datos sensibles, 18+). `Solución:` una micro-pregunta de intención **antes** del registro que no recolecta nada y ordena el recorrido; se reutiliza en el mapa, la transición y el teaser para cerrar el loop.

> **(tag)** Sin cuenta y sin guardar datos todavía
> **(pregunta)** ¿Qué quieres entender de ti?
> - **Autoconocimiento general** — "Quiero una mirada completa de cómo funciono."
> - **Decisiones de carrera** — "Quiero claridad para decidir mi rumbo."
> - **Mi bienestar** — "Quiero entender cómo estoy hoy."
> [ Continuar → ]

`Variante más ligera (decisión de German):` si se prefiere aún menos fricción, la intención puede ser una sola línea en la landing en vez de un paso aparte. `Salvaguarda:` la intención nunca se vuelve promesa determinista ("como buscas carrera, tu carrera es X"); solo ordena y personaliza el lenguaje.

### 7.3 Pantalla 2 — Registro + consentimiento

Magic link (fricción mínima) + la pantalla única de consentimiento (§4). El orden vivo (funnel invertido, ADR-029) pide registro y consentimiento antes del primer test; se mantiene, pero con la pantalla "aceptar y listo" en vez del consentimiento disperso. Confirmación de edad (18+) integrada en el mismo paso, sin pantalla aparte.

### 7.3.1 Pantalla 2b — "Revisa tu correo" (magic link enviado) — nuevo v1.2

`Por qué existe:` el viaje al correo es el punto de mayor abandono del funnel y hoy no está diseñado (el prototipo salta de registro a consentimiento). Además ya produjo fricción real (links expirados por prefetch, reenvíos — ver `[GAP-MAGIC-LINK-EXPIRED-PREFETCH]`). Esta pantalla acompaña la espera y recupera al usuario si el link falla.

**Anatomía (un foco: ir al correo):**

> **(título)** Te enviamos el enlace
> **(cuerpo)** Revisa tu correo **{email}** y toca el enlace para entrar. Vale por un rato corto; si expira, aquí mismo te enviamos otro.
> **(secundario)** ¿No llega? Mira en spam o promociones.
> [ Reenviar enlace ] *(habilitado tras 30 s, con confirmación "Listo, enviamos uno nuevo")*
> **(microcopy)** Puedes cerrar esta pestaña: el enlace te trae de vuelta exactamente aquí.

`Guardrails:` sin cuenta regresiva visible (ansiedad); el reenvío no invalida el mensaje con culpa; si el usuario abre el link en otro dispositivo, la sesión continúa allá (decir "desde cualquier dispositivo" en el registro, ya está en el copy §7.3). Estado de error del callback (link expirado) aterriza aquí con: "Ese enlace ya expiró. Te enviamos uno nuevo si quieres." + [ Reenviar enlace ].

### 7.4 Pantalla 3 — Mapa de los 4 tests

`Función:` que el recorrido se vea como un viaje de 4 paradas, no como "un formulario largo". Cuatro hook cards, cada una con su ícono/visual, su hook de una línea y su tiempo honesto. La primera activa, las otras como "próximas paradas".

> **Tu recorrido — 4 paradas, 12-18 minutos**
> Puedes hacerlo de una o en dos ratos; guardamos tu avance.
>
> 1. **Personalidad** · ~4 min — "Cómo piensas, sientes y te relacionas."
> 2. **Intereses** · ~6 min — "Qué actividades te energizan y cuáles te drenan."
> 3. **Valores** · ~3 min — "Lo que más te importa, en palabras."
> 4. **Bienestar** · ~3 min — "Una foto honesta de cómo estás hoy."
>
> [ Empezar por personalidad → ]

### 7.5 Patrón de cada test

Cada test sigue la misma secuencia de 4 momentos (continuidad de marca):

**(a) Hook card** — el enganche, una línea. Hooks es-CO por test (de UX_SPEC §6.2, listos):

| Test | Hook es-CO |
|---|---|
| Personalidad (BFI-2-S) | "Cinco grandes rasgos dan forma a cómo piensas, sientes y te relacionas. Vamos a ver los tuyos." |
| Intereses (O*NET IP-SF) | "Vamos a mapear qué tipo de actividades te energizan y cuáles te drenan." |
| Valores (TwIVI/PVQ-21) | "Lo que más te importa guía tus decisiones, muchas veces sin que lo notes. Vamos a ponerlo en palabras." |
| Bienestar (PERMA) | "Una foto honesta de cómo está tu bienestar hoy, en cinco dimensiones." |

**(b) Antes de comenzar** — intro factual (qué vas a responder, cuántos ítems, cómo es la escala) + NFR-27 donde aplique (personalidad y bienestar tocan señales sensibles). El bloque NFR-27 va separado del copy factual y no se rediseña su contenido legal, solo su contenedor visual.

**(c) Loop de respuesta** — un ítem a la vez o bloques cortos; escala con anclas es-CO de fuente validada; **progreso visible** ("vas en 12 de 30", no `sr-only`); respuesta inmediata al tap; guardado siempre; pausa/reanudar sin perder nada. `Riesgo específico (confirmado por benchmarks):` O*NET son 60 ítems, el test más largo del Free. La investigación de mercado muestra que el abandono sube fuerte pasadas ~20 preguntas y 7-8 minutos, y que las barras de progreso solo ayudan **si el progreso avanza rápido**. `Mitigación adoptada:` presentar O*NET en **bloques temáticos cortos con progreso por bloque** (ej. "Bloque 2 de 5"), no una barra única de 60 que avanza lento. `Recomendación (confirmada):` mantener la forma validada de 60 ítems y mitigar con UX, no acortar el instrumento.

**(d) Mini-resultado** — pista visual (capa 1-2) + frase reveladora + una línea que conecta con el perfil integrado (§5). Luego, transición (§6).

### 7.6 Transición entre tests
Definida en §6 (recap + mapa + preview/hook). Es el arreglo directo de tu queja #1.

### 7.7 Cierre del Free: nivel → teaser-constelación con ocupaciones dentro (reescrito v1.2, ADR-031)

`Función:` el clímax del Free y el gancho central hacia el Paid. `Secuencia canónica (ADR-031):` tras el mini-resultado de PERMA (test 4), el cierre son **dos momentos**:

**Momento 1 — Captura de nivel (antes del reveal).** Se conserva la mecánica viva de prod (W5, obligatoria): nivel educativo + etapa de experiencia, con framing de afinación, no de trámite.

> **(título)** Un último dato para afinar tu mapa
> **(cuerpo)** Con tu nivel de estudios y tu momento profesional ajustamos los entornos de trabajo que te vamos a mostrar. No cambia tus resultados; cambia qué tan útiles son las sugerencias.
> [selección nivel educativo] · [selección etapa]
> [ Ver tu primer mapa → ] *(= `MC_NIVEL_CLOSE_CTA`, sign-off en `MICROCOPY_ES-CO_SIGNOFF_v1.0.md`)*

**Momento 2 — Teaser-constelación (dirección B), UN solo clímax con las ocupaciones dentro.** Aquí cambia la piel al **nocturno/constelación**. La pantalla une las 4 dimensiones y contiene, en orden: (1) constelación RIASEC que se dibuja + arquetipo; (2) síntesis de 4-6 frases por combinación; (3) pincelada de 1-2 cruces (plantillas en `MICROCOPY_ES-CO_SIGNOFF_v1.0.md §5`); (4) **sección "Entornos a explorar"**: las ocupaciones filtradas por Job Zone (W6) como parte del mapa — lista corta (5-8), agrupada por afinidad, microcopy no determinista ("entornos donde tu patrón suele sentirse en casa; explóralos, no son un veredicto"), sin match %; (5) rigor nombrado; (6) puente al Paid con precio; (7) línea de honestidad.

`Qué cambia respecto a prod:` la superficie `reporte/{onet}?cierre=free` (hoy: nivel → ocupaciones + CTA como pantalla terminal) evoluciona a esta composición; la maquinaria 2.1 (resolveFreeCloseTarget, LevelCapture, filtro Job Zone, email FREE-14) se conserva. Las ocupaciones dejan de ser una pantalla suelta: son una sección del clímax.

**Copy es-CO (ejemplo de síntesis — plantilla, el texto final se compone por bandas):**

> **(título)** Tu primer mapa
>
> **(síntesis)** Te mueves por la curiosidad y recargas energía en lo tranquilo. Te atraen las actividades de investigar y crear más que las de coordinar a otros. Valoras la autonomía y el aprendizaje por encima del estatus. Y hoy tu bienestar se apoya sobre todo en el sentido de lo que haces, más que en las relaciones.
>
> **(pincelada, lo que insinúa)** Tus valores y tus intereses apuntan a entornos donde decides cómo trabajar. En el perfil completo verías cómo eso se combina con tus fortalezas y dónde aparecen tensiones que hoy apenas se asoman.
>
> **(entornos a explorar — ocupaciones Job Zone, nuevo v1.2)** Con tu patrón y tu nivel, estos entornos suelen sentirse en casa: *(lista de 5-8 ocupaciones filtradas)*. Explóralos como pistas, no como veredictos.
>
> **(rigor nombrado)** Tu mapa se basa en 4 instrumentos validados: personalidad (BFI-2), intereses (O*NET), valores y bienestar (PERMA).
>
> **(puente al Paid)** Esto es un primer esbozo. El perfil completo cruza ocho dimensiones y te muestra patrones que aquí apenas se asoman.
> [ Ver el perfil completo → ]  ·  **USD 19, pago único, sin suscripción.**
>
> **(línea de honestidad)** Sin urgencia y sin contadores. Tu avance ya está guardado, y tu resultado es tuyo: puedes descargarlo o borrarlo cuando quieras.

`Frase por combinación (Hecho, investigación):` el dispositivo de mayor valor percibido en los reportes premium (CliftonStrengths) es una frase personalizada por la **combinación** de puntajes, no texto por rasgo. La constelación/arquetipo del teaser ("El explorador autónomo") es exactamente eso, en versión teaser.

`Criterio de éxito:` el teaser entrega valor real por sí solo (te vas sabiendo algo nuevo aunque no compres) y deja una pregunta abierta. Cebo vacío = anti-patrón. `Salvaguarda:` la pincelada nombra lo que existe, no lo entrega a medias; sin determinismo ("apuntan a", no "tu carrera es").

---

## 8. Transición Free → Paid (puente de conversión)

`Principio:` mostrar valor, no presionar. Sin urgencia, sin "solo hoy", sin contador. El puente aparece en el teaser y, si no convierte, en un correo honesto posterior.

**Qué comunica el puente:**
- Qué más hay (concreto): facetas de personalidad, tus 24 fortalezas, valores a fondo, sentido y afecto, y el integrador que cruza las 8 dimensiones.
- Qué cuesta y cuánto toma: USD 19 pago único; 95-130 minutos en 4-6 sesiones, a tu ritmo.
- La promesa honesta: profundidad e integración, no "más tests".

**Copy es-CO:**

> **El perfil completo**
> En el Free viste un primer trazo. El perfil completo va a fondo en cada dimensión y, sobre todo, las cruza: te muestra cómo tu personalidad, tus valores, tus intereses y tu bienestar se combinan en patrones que reconoces como tuyos.
>
> - Tus 5 rasgos con sus facetas, no solo el titular
> - Tus 24 fortalezas y cómo se expresan según tu manera de ser
> - El integrador: tus tensiones, tus fortalezas en acción, tu constelación
>
> **USD 19, pago único. A tu ritmo, en 4-6 sesiones.**
> [ Quiero mi perfil completo → ]   ·   Tu avance del Free ya está guardado.

`Refuerzo de mercado (Hecho):` Truity y Understand Myself convierten **nombrando los instrumentos validados** y mostrando un **reporte de muestra**. El puente al Paid debe (a) nombrar el rigor (qué instrumentos, qué mide cada uno) y (b) ofrecer ver una muestra del reporte/integrador. Upsell vertical por caso de uso (Free → Paid → Ikigai), **sin suscripción**.

`Conversión objetivo (PRD §5.1):` 5-10% en 30 días (supuesto a validar). `Métrica norte Free:` % que completa y visualiza el perfil integrado (objetivo 60%).

---

## 9. Viaje B2C Paid (profundidad + integrador)

`Objetivo:` que quien pagó sienta que cada test le aportó profundidad y que el integrador lo deje pensando "no me había visto así". Stack Paid (PRD §8): BFI-2-60, VIA-IS-P-96, PVQ-RR, O*NET + mapa, MLQ+WAMI, PERMA+Ryff+SWLS, PANAS, FSS-9 (+ opcionales).

### 9.1 Plan de sesiones (anti-fatiga)
El Paid son 95-130 min: se presenta como un recorrido en **4-6 sesiones**, no como un muro. Progreso por test y global; cerrar y volver sin perder nada; microcopy de aliento honesto entre bloques ("Vas en la mitad; este bloque mira cómo te relacionas"); tiempos realistas por instrumento; nunca penalizar pausas.

> **(pantalla de plan)** Tu perfil completo, en 5 sesiones
> Hazlo a tu ritmo. Cada sesión es un bloque con sentido propio y guardamos todo.
> Sesión 1 · Personalidad a fondo (~25 min) — Sesión 2 · Fortalezas (~20 min) — Sesión 3 · Valores e intereses (~25 min) — Sesión 4 · Sentido y bienestar (~25 min) — Sesión 5 · Tu integrador (~15 min)

### 9.2 Reporte profundo por instrumento
Cada test usa el patrón por capas (§5) con la capa 4 completa: facetas, comparación con baremo CO/MX, textos de interpretación del pack, ejemplos cotidianos. Visual primero; profundidad disponible al expandir (acordeón/drill-down), nunca todo a la vez.

`Dispositivos de alto valor (Hecho, investigación):` todos los reportes premium del mercado (Gallup, HIGH5, 16P, Truity) combinan **lectura accionable + puntos ciegos/bordes de crecimiento + un PDF descargable y compartible**. El reporte Paid de DescubreMe incluye los tres, con framing de desarrollo (no diagnóstico) y de posibilidad (no veredicto).

### 9.3 El integrador como clímax
Las 6 salidas (PRD §6) se presentan de lo analítico a lo sintético, cerrando con la constelación (dirección B a pleno):

| Orden | Salida | Cómo se presenta |
|---|---|---|
| 1 | Ajuste persona-trabajo | Mapa intereses × valores × personalidad × O*NET, con ocupaciones a explorar (no veredictos) |
| 2 | Mapa de coherencia y tensiones | Visual de alineaciones y tensiones (valores vs. lo que haces; sentido vs. engagement) |
| 3 | Fortalezas en acción | Cómo tus fortalezas VIA se expresan según tus facetas de personalidad |
| 4 | Drivers de bienestar | Qué dimensiones mueven tu bienestar, más allá del puntaje |
| 5 | Bordes de crecimiento | Dónde tienes más palanca de desarrollo, en tono de posibilidad |
| 6 | Constelación / arquetipo | Cierre: una narrativa unificadora que reconoces como "soy yo" |

`Salvaguarda (PRD §6):` los cruces sin respaldo de validez se etiquetan exploratorios y se redactan como hipótesis ("esto podría sugerir..."), no como hechos. Sin lenguaje causal ni predictivo. La constelación describe, no profetiza. `Por qué sorprende:` la sorpresa viene del cruce entre resultados que ya viste, no de un dato nuevo aislado.

### 9.4 Retorno
Invitar a volver al reporte (7d, 30d) con un correo honesto ("tu perfil sigue aquí; algunas cosas se leen distinto con tiempo"); puente a Ikigai donde aplique.

---

## 10. Transición Paid → Ikigai (add-on de propósito)

`Gate:` Ikigai es add-on del Paid (PRD §5.4). Solo se ofrece a quien completó el Paid. Añade un único instrumento (Ikigai-9) + el mapper.

`Experiencia:` el mapper es el componente estrella — un mapa visual de 4 bloques (lo que amo · en lo que soy bueno · lo que el mundo necesita · por lo que me pagan) sobre el stack Paid + Ikigai-9 como eje. Muestra coherencias y tensiones entre los 4 bloques y nombra un "centro" como exploración, no como veredicto.

`Disclaimer cultural (no es letra pequeña, es parte del rigor):` antes y dentro del mapper se declara que el Venn de 4 círculos es de Zuzunaga/Winn, no el ikigai japonés (Hasegawa/Kamiya/Mogi). Esto diferencia a DescubreMe de los "tests de ikigai" superficiales.

**Copy es-CO (puente + disclaimer):**

> **Ikigai — el mapa de tu propósito**
> Con tu perfil completo ya hecho, podemos cruzar todo en un mapa de cuatro fuerzas: lo que amas, en lo que eres bueno, lo que el mundo necesita y por lo que te pagan.
> Te toma 10-15 minutos más.
>
> **(disclaimer dentro del mapper)** Este mapa de cuatro círculos es la versión occidental popularizada por Zuzunaga y Winn. El ikigai japonés original (Hasegawa, Kamiya, Mogi) es más cotidiano y no se reduce a un diagrama. Te mostramos coherencias y tensiones para explorar, no una respuesta única de vida.

`Pricing (PRD §5.4):` USD 29-49 como add-on (supuesto a validar). `Prerequisito abierto (fase 5):` adaptación es-CO de Ikigai-9 (`[GAP-IKIGAI9-ITEMS-ES-CO]`).

---

## 11. Manejo de empresas (B2B-A)

`Principio rector (PRD §5.3, §7):` siempre desarrollo, nunca selección; siempre agregado anónimo (n≥5). El producto B2B reutiliza todo el sistema de experiencia (voz, hooks, fluidez, resultados por capas), con tres particularidades.

### 11.1 Doble destinatario
- **El empleado** vive la experiencia individual completa (su autoconocimiento Paid + los módulos de las lentes activas). Es su perfil, no un examen de la empresa.
- **La empresa** ve un dashboard agregado anónimo por lente, tendencias trimestrales y equipos en riesgo. **Nunca ve individuos.**

### 11.2 Onboarding por lentes (lado empresa)
La empresa no compra un paquete fijo: elige **lentes según su pregunta de negocio** (PRD §7). El admin configura, y el empleado solo ve los tests de las lentes activas.

Las 11 lentes disponibles (PRD §7), con la pregunta de negocio que responden: Engagement & energía ("¿qué tan conectado está el equipo?"), Bienestar & riesgo de desgaste ("¿hay equipos en riesgo de burnout?"), Necesidades psicológicas/SDT, Diseño del trabajo ("¿cómo rediseñamos los roles?"), Sentido & propósito laboral, Cultura & alineación de valores ("¿vivimos los valores que decimos?"), Fortalezas del equipo, Composición & diversidad de personalidad, Desarrollo de carrera, Adaptabilidad/readiness al cambio, Ajuste persona-rol. **Set core sugerido para el MVP** (PRD §7): Engagement, Bienestar & desgaste, Diseño del trabajo, Sentido laboral, Cultura & valores, Fortalezas del equipo, Desarrollo de carrera, Adaptabilidad.

> **(pantalla admin, selección de lentes)** ¿Qué quieres entender de tu equipo?
> Elige las preguntas que te importan. Cada una activa los instrumentos necesarios y suma tiempo al recorrido de cada persona.
> [ ] ¿Qué tan conectado está el equipo? · [ ] ¿Hay riesgo de desgaste? · [ ] ¿Vivimos los valores que decimos? · [ ] ¿Con qué fortalezas contamos? ...

### 11.3 Experiencia del empleado — la confianza es requisito, no letra pequeña
`Hecho (UX_SPEC §14):` el empleado llega por su empleador; la experiencia debe comunicar desde el primer segundo que sus respuestas no se usan para selección y que la empresa no ve individuos. Esto es un requisito de experiencia (P3 de confianza), no una nota al pie.

**Copy es-CO (primera pantalla del empleado):**

> **Este perfil es tuyo**
> Llegas aquí por tu empresa, pero lo que descubras es para ti. Tres promesas claras:
> - Tus respuestas **no** se usan para seleccionar, promover ni evaluar a nadie.
> - Tu empresa solo ve **tendencias del equipo**, nunca resultados individuales.
> - Y solo las ve cuando hay **al menos 5 personas** en un grupo, para que nadie sea identificable.
>
> [ Empezar mi perfil → ]

`Lente sensible (Bienestar & desgaste):` dispara NFR-27 (disclaimer no-clínico) y NFR-28 (ruta de contención) a nivel individual; a la empresa se reporta solo agregado, sin etiquetas clínicas ni identificación. `No-negociable:` ninguna lente produce outputs por individuo para el empleador.

### 11.4 Dashboard de la empresa (rol admin)
Experiencia aparte, con foco en claridad de lectura agregada y cero exposición individual. Cada celda muestra n y se oculta si n<5. Tendencias trimestrales, no rankings de personas. Lenguaje de desarrollo ("dónde rediseñar roles", "qué necesidades frustra el entorno"), nunca de evaluación individual.

`Confidencialidad — modelo Culture Amp (Hecho, investigación; nuevo en v1.1):` adoptar tres mecanismos, no solo el umbral simple:

1. **Mínimo de grupo n≥5 por defecto**, configurable solo hacia arriba y **bloqueado antes de lanzar** cada medición (la regla no cambia después).
2. **Protección contra identificación indirecta:** cuando un subgrupo queda por debajo del mínimo, ocultar también el **grupo adyacente más pequeño** para impedir calcular su valor por diferencia del promedio.
3. **Umbral mayor a 5 para señales sensibles** (lente de desgaste/bienestar y comentarios).

`Postura declarada:` decir al empleado "confidencial, no anónimo" de forma explícita, y sellar cada vista con "desarrollo, no selección" + el disclaimer de validez (no validado para predecir éxito en un rol). `Anti-patrón a evitar (Hecho):` vistas identificadas por nombre para el empleador (los team grids de Gallup/HIGH5) y cualquier match-score/ranking (Plum, Pymetrics) — son selección, prohibidas.

`Out-of-scope B2B (PRD §5.3):` decisiones de selección/promoción/despido, comparativos individuales, comparativos entre empresas, API pública, integraciones HRIS.

---

## 12. Biblioteca de microcopy es-CO (momentos clave, listo para copiar/pegar)

Consolidado para `lib/i18n/microcopy/es-CO/`. Todo tuteo, sin emojis, sin exclamaciones.

**Landing**
- Eyebrow: "AUTOCONOCIMIENTO CON RIGOR"
- H1: "Conoce a fondo cómo funcionas, sin etiquetas."
- Sub: "Un primer mapa de tu personalidad, tus intereses, lo que valoras y tu bienestar. En 12-18 minutos y en lenguaje claro."
- CTA: "Empezar gratis →" · Micro: "Gratis. Sin tarjeta. Tus datos son tuyos."
- Pie: "Instrumentos validados · Resultados que reconoces como tuyos, no veredictos"

**Consentimiento (una pantalla):** ver §4 (texto completo).

**Hooks por test:** ver §7.5 (los 4).

**Transición (plantilla):** "Listo: [recap de una línea]. Vas [n] de 4. Sigue: [próximo test] — [hook]. [ Empezar [test] → ]"

**Mini-resultado (plantilla):** "[Visual]. [Frase reveladora]. Esto es una pincelada; en tu perfil integrado vas a ver cómo se conecta con [otra dimensión]."

**Teaser:** ver §7.7. **Puente al Paid:** ver §8. **Puente a Ikigai:** ver §10.

**Empleado B2B (confianza):** ver §11.3.

**Estados vacíos / error (tono sereno, sin culpa):**
- Guardado: "Guardamos tu avance. Puedes cerrar y volver cuando quieras."
- Reanudar: "Retomamos donde quedaste."
- Error suave: "Algo no cargó bien. Vuelve a intentar en un momento; tu avance está a salvo."

`Regla:` esto es copy autoral (se puede crear). El copy de instrumento (stems, anclas) NO está aquí: se extrae de fuente validada por el implementation pack de cada test.

---

## 13. Mejores prácticas de mercado: adoptado / descartado / matizado

`Fuente:` `auditoria-ux-ui/INVESTIGACION_MERCADO_UX_v1.0.md`. Adoptamos el dispositivo estructural, nunca la retórica.

### 13.1 Adoptado (integrado en este blueprint)
- Resultado real gratis, cobrar profundidad; Free "completo pero estrecho" (HIGH5/Truity). → §5.1, §8
- Plantilla de revelación en 3 partes (Finimize). → §5.1
- Frase por combinación, no por rasgo (CliftonStrengths). → §7.7, §9.3
- Tests largos en bloques con progreso que avanza rápido (benchmarks). → §7.5
- Taste de intención sin datos antes del registro (Duolingo/Headspace). → §7.2.1
- Recap personalizado como payoff + framing positivo (Headspace/Calm). → §6
- Una sola acción siguiente tras el reveal, evitar choice overload. → §6, §7.7
- Reporte premium = acción + puntos ciegos + PDF; nombrar el rigor + muestra. → §8, §9.2
- Pago único, upsell vertical por caso de uso, sin suscripción. → §8, §10
- B2B: n≥5 + identificación indirecta + "desarrollo, no selección" (Culture Amp/Gallup). → §11.4

### 13.2 Descartado (no encaja con DescubreMe)
- Rachas con culpa / loss-aversion (Duolingo): categoría emocionalmente sensible.
- Cuenta forzada antes de cualquier valor; pedir datos sensibles a mitad del test (VIA, CareerExplorer).
- Falsa precisión ("91,2%") y "viste el 5%" (16P).
- "Mentores IA" / generadores de CV (16P Premium): fuera de la propuesta de rigor + integración (no MVP).
- Vistas con nombre para el empleador y match-score/ranking (Gallup grid, Plum, Pymetrics): es selección, prohibido.
- Urgencia, escasez, contadores, anchoring agresivo de precios.

### 13.3 Matizado
- Understand Myself (pago primero): adoptamos su transparencia, no su modelo (el Free es la entrada del embudo).
- Paywall duro de Calm (commitment device): no aplica al Free (que ES el valor); su idea de "caer en una acción usable tras pagar" sirve para el onboarding del Paid.
- Barras de progreso: solo si avanzan rápido (por bloque).

---

## 14. Guardarraíl anti-dark-patterns (criterio de aceptación de conversión)

`Fuente:` Brignull (deceptive.design), FTC (2022), NN/g. La conversión de DescubreMe nunca usa:

- [ ] Paywall sorpresa tras invertir tiempo → el precio se dice antes (§8, landing).
- [ ] Resultado como rehén sin un free honesto → resultados híbridos (§5).
- [ ] Cuenta forzada para ver cualquier valor → taste sin datos (§7.2.1).
- [ ] Suscripción oculta / "una vez" que es recurrente → pago único explícito.
- [ ] Difícil de cancelar / continuidad forzada → cancelar = tan fácil como suscribir.
- [ ] Urgencia o escasez falsas (contadores) → línea de honestidad (§7.7).
- [ ] Prueba social falsa → solo cifras reales.
- [ ] Confirmshaming (opt-outs con culpa) → declinar es neutro ("Ahora no").
- [ ] Falsa precisión científica → declaramos límites.
- [ ] Perfilar a terceros sin consentimiento → jamás.

`Doble uso:` además de guardarraíl, es mensaje de marca — DescubreMe puede decir "sin trucos" y diferenciarse en LATAM.

---

## 15. Métricas y criterios de aceptación "clase mundial"

**Heurísticas (revisión experta, por pantalla):** hook entendible en <5 s; un foco por pantalla; resultado legible sin jerga; profundidad disponible no impuesta; transición que responde "qué hice / qué sigue"; honestidad visible; cero anti-patrones.

**Pruebas con usuarios (Colombia, n=15-20, ola 5):** comprensión (explica su resultado con sus palabras), reconocimiento ("esto soy yo"), revelación (nombra un hallazgo nuevo tras el integrador), fluidez (completa sin fricción), confianza (lo percibe riguroso y honesto).

**Métricas (PRD §11):** activación Free ≥60%; completion Free ≥40%; completion Paid ≥75%; dropoff por instrumento ≤15%; NPS reporte Paid ≥40; conversión Free→Paid 5-10% en 30 días; retorno 7d/30d.

---

## 16. Handoff a Claude Code + checklist

`División de trabajo (CLAUDE.md §6):` Cowork entrega este blueprint + microcopy + narrativas; Claude Code implementa tokens, componentes, motion, routing y data-viz con `ui-ux-pro-max-skill`.

**Checklist de implementación (por ola del DIAGNOSTICO_Y_PLAN §4):**

- [ ] **Ola 0:** voseo→es-CO en landing y microcopy; reemplazar placeholders TwIVI; re-anclar W5/W6 dentro del Free alcanzable; consentimiento de una pantalla (§4); línea de honestidad "sin trucos" (§14).
- [ ] **Ola 1:** tokens dirección A (Fraunces+Hanken; crema/terracota/salvia; motion) nombrando cualquier cambio zona ADR-021; landing + onboarding rediseñados (§7.2-7.4); taste de intención sin datos (§7.2.1).
- [ ] **Ola 2:** transición recap+preview que retoma la intención (§6); mini-resultado con plantilla de 3 partes (§5.1); progreso por bloque en tests largos (§7.5, quitar `sr-only`); pantalla "Revisa tu correo" + estado de link expirado (§7.3.1).
- [ ] **Ola 3:** cierre canónico ADR-031 — nivel con framing de afinación + teaser/constelación B con ocupaciones dentro + frase por combinación + rigor + precio + honestidad (§7.7); elevar data-viz (§3.5); responsive móvil (§3.7) como criterio de aceptación de cada componente nuevo.
- [ ] **Ola 4:** specs Paid (§9; reporte = acción + puntos ciegos + PDF), Ikigai (§10), B2B con identificación indirecta (§11.4) — fases 3/5/4.
- [ ] **Ola 5:** accesibilidad WCAG AA en todo lo nuevo; piloto cognitivo; métricas; guardarraíl anti-dark-patterns como criterio de aceptación (§14).

`Pendientes Cowork que alimentan la implementación (actualizado v1.2):` frase reveladora (capa 2) por dimensión (borradores en prototipo y en `MICROCOPY_ES-CO_SIGNOFF_v1.0.md`); ~~plantillas de cruce del teaser~~ **entregadas** en `MICROCOPY_ES-CO_SIGNOFF_v1.0.md §5` (`[GAP-TEASER-CROSS-TEMPLATES-ES-CO]` → pendiente solo sign-off + seed); ítems/anclas es-CO de TwIVI (`[GAP-TWIVI-ITEMS-ANCHORS-ES-CO]`, brief en `estado/BRIEF_Cowork_TwIVI_es-CO_v1.0.md`); narrativa del integrador (6 salidas + constelación); adaptación es-CO Ikigai-9.

`Pendientes del prototipo Claude Design (no bloquean el handoff, v1.2):` (1) el mini-resultado no refleja las respuestas reales (las barras son estáticas); (2) no dibuja el cierre canónico ADR-031 (nivel + ocupaciones dentro de la constelación); (3) falta la pantalla "Revisa tu correo" (§7.3.1); (4) es desktop-first (móvil se especifica en §3.7 y `HANDOFF_UI §6`); (5) B2B sin pantalla admin de selección de lentes (§11.2); (6) contraste AA del clímax nocturno pendiente de auditoría formal.

---

## 17. Changelog

| Versión | Fecha | Cambios |
|---|---|---|
| 1.2 | 2026-07-01 | Integra la revisión del prototipo Claude Design (`DescubreMe Prototipo.dc.html`, referencia visual) y el **ADR-031** (cierre canónico del Free): §7.7 reescrito — nivel obligatorio con framing de afinación → teaser-constelación con las ocupaciones Job Zone como sección interna (un solo clímax); nueva §7.3.1 pantalla "Revisa tu correo" (magic link + reenvío + estado expirado); nueva §3.7 reglas responsive móvil; §16 actualizado (olas 2-3, pendientes del prototipo nombrados, cross-templates entregadas en `MICROCOPY_ES-CO_SIGNOFF_v1.0.md`). |
| 1.1 | 2026-06-29 | Integra investigación de mercado y decisiones del prototipo v2: taste de intención sin datos (§7.2.1), plantilla de revelación en 3 partes (§5.1), progreso por bloque confirmado por benchmarks (§7.5), frase por combinación + rigor + precio + honestidad en el teaser (§7.7), nombrar el rigor + reporte de muestra en el puente Paid (§8), dispositivos premium (acción + puntos ciegos + PDF) en el reporte Paid (§9.2), B2B identificación indirecta + "confidencial, no anónimo" (§11.4), línea de honestidad en landing (§7.2), y dos secciones nuevas: mejores prácticas adoptadas/descartadas (§13) y guardarraíl anti-dark-patterns (§14). |
| 1.0 | 2026-06-29 | Versión inicial. Rediseño de experiencia de los 4 productos. Decisiones de sesión: visual A+clímax B, resultados híbridos, consent "aceptar y listo", es-CO tuteo. Incluye microcopy es-CO listo para Free, puentes Paid/Ikigai, lineamientos B2B a fondo, sistema de transiciones y de resultados híbrido. |

---

*Fin del BLUEPRINT DE EXPERIENCIA v1.1. Documento vivo. La capa autoral (hooks, narrativas, microcopy) puede crearse; el copy de instrumento se extrae de fuente validada. Se sincroniza con `PRD_MAESTRO.md`, `UX_EXPERIENCE_SPEC.md`, `auditoria-ux-ui/INVESTIGACION_MERCADO_UX_v1.0.md` y `ui-ux-pro-max-skill`.*

