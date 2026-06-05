# UX_EXPERIENCE_SPEC — DescubreMe (v1.0)

**Producto:** DescubreMe.
**Owner:** German Velez Hurtado.
**Autor (Cowork):** [Rol: UX Researcher / UX Writer, con PM y Arquitecto]
**Version:** 1.0
**Fecha:** 2026-06-05
**Cobertura:** B2C Free y B2C Paid a fondo. B2B-A e Ikigai como lineamientos ligeros (se expanden en su fase).
**Fuente de verdad de producto:** `PRD_MAESTRO.md` v2.0 (esp. §6 integrador, §8 stack, §9 experiencia).
**Sistema de diseno de referencia (implementacion):** `ui-ux-pro-max-skill` (Claude Code).
**Naturaleza:** spec de experiencia (no codigo). Define el sistema; los textos finales item por item se redactan junto a cada implementation pack.

---

## 0. Resumen ejecutivo

DescubreMe compite por dos cosas a la vez: rigor psicometrico transparente y una experiencia que enamora. Esta spec define como se logra la segunda sin comprometer la primera. La "magia" no esta en inflar resultados ni en alterar instrumentos: esta en el framing (hooks que explican en una linea que va a revelar cada test), en la fluidez al responder, en presentar cada resultado visual primero y en lenguaje cotidiano, y en el Motor de Perfil Integrador que cruza instrumentos para revelar patrones que el usuario no habia nombrado. El Free entrega un perfil integrado teaser que da una pincelada del Paid; el Paid entrega profundidad por instrumento y un integrador que sorprende. Todo respeta la voz es-CO ya establecida (tuteo cordial, registro-neutro, sin urgencia, sin lexico clinico) y las salvaguardas NFR-27/28.

---

## 1. Alcance, relacion con otros documentos y regla de oro

| Documento | Que aporta a esta spec |
|---|---|
| `PRD_MAESTRO.md` §6, §8, §9 | Stack por producto, salidas del integrador, principios de experiencia |
| `implementation_packs/TEST_INTRO_MICROCOPY_es-CO_v1.0.md` | Pantalla "Antes de comenzar", NFR-27 pre-test, labels de instrumento |
| `implementation_packs/RESPONSE_ANCHORS_es-CO_v1.0.md` | Anclas de escala es-CO extraidas de fuentes validadas |
| Packs por instrumento (`implementation_packs/*`) | Items, scoring, baremos, textos de interpretacion |
| `ui-ux-pro-max-skill` | Sistema visual y de componentes en implementacion |

**Regla de oro (rigor vs. magia):** existen dos capas de texto con reglas distintas.

| Capa | Quien la escribe | Regla |
|---|---|---|
| **Copy autoral** (hooks, narrativa de resultado, microcopy de flujo, textos del integrador, teaser) | Cowork (UX Writer) | Se puede crear. Es donde vive la "magia". Debe pasar revision etica (no inflar, no determinismo). |
| **Copy del instrumento** (stems de items, anclas de escala, instrucciones tecnicas) | Extraido de fuente validada | **No se inventa.** Se extrae literal de la adaptacion es validada (ver RESPONSE_ANCHORS). Cambiarlo degrada el instrumento. |

`No-negociable:` la experiencia nunca altera el copy del instrumento para "hacerlo mas divertido". La diversion y el delight viven en la capa autoral y en lo visual, alrededor del instrumento, no dentro de el.

---

## 2. Que significa "magia" en DescubreMe (definicion operativa)

`Opinion profesional:` "magia" es un criterio de aceptacion, no un adjetivo. Operacionalmente, un momento es "magia" cuando cumple los cuatro:

1. **Reconocimiento:** el usuario lee el resultado y piensa "esto soy yo" (validez aparente alta, lenguaje cotidiano).
2. **Revelacion:** ademas de confirmar, le muestra algo que no habia nombrado (sobre todo en el integrador).
3. **Claridad sin esfuerzo:** lo entiende en segundos, sin jerga, visual primero.
4. **Honestidad:** no exagera, no predice su futuro, declara sus limites. La confianza es parte del delight.

**Lo que la magia NO es (anti-patrones):** urgencia artificial ("solo hoy"), halago vacio ("eres especial"), barnums genericos que aplican a cualquiera, lenguaje clinico, promesas deterministas ("tu carrera ideal es X"), gamificacion que distrae del contenido. Ver §13.

---

## 3. Sistema de voz y tono es-CO

Alineado con la voz ya cerrada en RESPONSE_ANCHORS y TEST_INTRO_MICROCOPY.

| Atributo | Que significa | Ejemplo |
|---|---|---|
| Tuteo cordial | Tu, no usted; no voseo | "Vas a responder unas preguntas" |
| Profesional y calido | Riguroso pero cercano, como un buen orientador | "Esto describe tu manera de ser actual, no una etiqueta fija" |
| Claro sobre ingenioso | La claridad gana siempre; el ingenio nunca a costa de entender | — |
| Divertido sin frivolidad | Ligereza en el framing, seriedad en el contenido | "Esos momentos en que el tiempo vuela: vamos a ver cuando te pasan" |
| Sin urgencia ni manipulacion | Cero presion, cero exclamaciones, cero escasez | — |

**Do:** frases cortas; segunda persona; verbos concretos; nombrar tensiones con respeto.
**Don't:** signos de exclamacion en copy de producto; lexico clinico ("trastorno", "sintoma", "diagnostico" salvo para negarlo); "ordenador", "coger", "vosotros"; superlativos vacios; emojis.

`Nota es-CO:` las anclas de escala son registro-neutro (sin marca tu/usted); el tuteo aplica al stem e instrucciones, no a las etiquetas de la escala (consistente con RESPONSE_ANCHORS §notas transversales).

---

## 4. Mapa de experiencia — B2C Free

Objetivo de la experiencia Free: que un desconocido entre por curiosidad, complete 4 tests sin friccion, reciba resultados que lo enamoren, y termine queriendo el Paid.

### 4.1 Journey

| Paso | Momento | Objetivo de experiencia | Salvaguarda |
|---|---|---|---|
| 1 | Landing / entrada | Prometer el valor en una linea; mostrar que es riguroso y gratis | Sin urgencia |
| 2 | Registro + consentimiento | Friccion minima (magic link); consentimiento granular claro | Ley 1581, consentimiento por producto |
| 3 | Mapa de los 4 tests | Mostrar el recorrido como descubrimiento, no como formulario | Tiempos honestos por test |
| 4 | Hook del test | Una linea que explica que va a revelar y por que vale la pena | No inflar valor predictivo |
| 5 | Intro "Antes de comenzar" | Expectativa + NFR-27 pre-test donde aplica | NFR-27 (PERMA, BFI-2-S con distress) |
| 6 | Loop de respuesta | Fluidez, progreso visible, pausa/reanudar | Sin fatiga; sin patrones oscuros |
| 7 | Resultado por test | Magia: visual primero, frase reveladora, explicacion simple | Honestidad + limite |
| 8 | Perfil integrado teaser | Unir las 4 dimensiones en una narrativa breve + pincelada del Paid | Mostrar valor real, no cebo vacio |
| 9 | Invitacion al Paid | Mostrar que hay mucho mas, sin presion | Sin urgencia artificial |

### 4.2 Stack Free (v2.0) y nota de migracion

Free v2.0 = BFI-2-S (personalidad), O*NET IP-SF (intereses), PVQ-21 (valores), PERMA-Profiler (bienestar).

`Migracion vs. v1.5:` el Free anterior usaba Flourishing como cuarto test; v2.0 lo reemplaza por **PVQ-21** para que el teaser cubra 4 dimensiones distintas (personalidad + intereses + valores + bienestar). Implicacion para Claude Code: PVQ-21 ya tiene dossier+pack v1.0 (`dossiers/30_PVQ-21_Consolidado.md`, `implementation_packs/PVQ-21_..._v1.0.md`) con scoring, hook e intro microcopy; Flourishing pasa a ser instrumento del Paid. `Gap resuelto:` `[GAP-PVQ21-FREE-MICROCOPY]`. `Carries abiertos:` extraer items/anclas es-CO de fuente validada (`[GAP-PVQ21-ITEMS-ES-CO]`, `[GAP-PVQ21-ANCHORS-ES-CO]`).

---

## 5. Mapa de experiencia — B2C Paid

Objetivo: que quien pago sienta que cada test le aporto profundidad, y que el integrador final lo deje pensando "no me habia visto asi".

### 5.1 Journey

| Paso | Momento | Objetivo de experiencia |
|---|---|---|
| 1 | Compra | Checkout claro; expectativa de profundidad, no de "mas tests" |
| 2 | Plan de sesiones | El Paid son 95-130 min: presentarlo como un recorrido en 4-6 sesiones, con progreso guardado |
| 3 | Loop por instrumento | Mismo sistema de hook + fluidez del Free, sostenido en tests mas largos |
| 4 | Reporte profundo por test | Cada resultado explicado a alta profundidad, por capas (resumen -> facetas -> matices) |
| 5 | Motor de Perfil Integrador | El climax: cruces entre instrumentos, tensiones, constelacion/arquetipo (§9) |
| 6 | Retorno | Invitar a volver al reporte (7d, 30d); puente a Ikigai donde aplique |

### 5.2 Anti-fatiga en tests largos

El Paid es largo. Mitigaciones de experiencia: segmentar por instrumento y por bloques; progreso por test y global; permitir cerrar y volver sin perder nada; microcopy de aliento honesto entre bloques ("Vas en la mitad; este bloque mira como te relacionas"); nunca penalizar pausas; estimar tiempos por instrumento de forma realista (ver riesgo de estimador en TEST_INTRO_MICROCOPY §8).

---

## 6. Sistema de Hooks por test

El hook es el momento de enganche: una linea (maximo dos) que, en lenguaje cotidiano, dice que va a revelar el test y por que vale la pena. Va en la tarjeta del test y en la cabecera de la intro, antes del cuerpo factual "Antes de comenzar". No reemplaza la intro ni el NFR-27: los precede.

### 6.1 Formula del hook

`[Lo que el test revela de ti, en cotidiano] + [por que importa o que vas a poder hacer con eso]` — sin exageracion, sin promesa de futuro, sin exclamacion.

### 6.2 Ejemplos es-CO por constructo (exemplars, a pilotar cognitivamente)

| Constructo | Instrumento | Hook ejemplo (es-CO) |
|---|---|---|
| Personalidad | BFI-2-S / BFI-2-60 | "Cinco grandes rasgos dan forma a como piensas, sientes y te relacionas. Vamos a ver los tuyos." |
| Intereses | O*NET IP-SF | "Vamos a mapear que tipo de actividades te energizan y cuales te drenan." |
| Valores | PVQ-21 / PVQ-RR | "Lo que mas te importa guia tus decisiones, muchas veces sin que lo notes. Vamos a ponerlo en palabras." |
| Bienestar | PERMA-Profiler | "Una foto honesta de como esta tu bienestar hoy, en cinco dimensiones." |
| Fortalezas | VIA-IS-P-96 | "Todos usamos fortalezas sin darnos cuenta. Vamos a nombrar las tuyas y cuando las usas." |
| Sentido | MLQ + WAMI | "Que tanto sentido encuentras hoy, y que tanto lo estas buscando." |
| Afecto | PANAS | "Como ha sido tu clima emocional en las ultimas semanas." |
| Flow | FSS-9 | "Esos momentos en que te absorbes en algo y el tiempo vuela: cada cuanto te pasan y con que." |

`Limite:` estos son exemplars del sistema, no copy final. El hook final por test se redacta con el pack del instrumento y se valida en piloto cognitivo (igual que la microcopy NFR-27). Para tests con `emotional_distress`, el hook convive con el bloque NFR-27 sin diluirlo.

---

## 7. Experiencia de respuesta (fluidez)

| Elemento | Lineamiento |
|---|---|
| Presentacion de items | Un item a la vez o en bloques cortos coherentes; foco en una pregunta, sin muros de texto |
| Escala de respuesta | Anclas es-CO de RESPONSE_ANCHORS (verbatim de fuente validada); puntos fijos por instrumento (7/5/11/etc.); extremos rotulados donde la fuente asi lo define (PERMA) |
| Progreso | Barra por test y, en Paid, progreso global; "vas en X de Y" sin gamificacion ansiosa |
| Ritmo | Transiciones suaves entre items; sin recargas bruscas; respuesta inmediata al tap |
| Pausa / reanudar | Guardar siempre; retomar exactamente donde quedo; la intro NFR-27 no se repite en resume (TEST_INTRO §0) |
| Tiempos honestos | Estimacion realista por instrumento; nunca subestimar para "enganchar" |
| Anti-aquiescencia | El motor ya marca patron unico / tiempo atipico (Gate 1); la UX no premia velocidad |

`Principio:` responder debe sentirse como una conversacion guiada, no como llenar un formulario. La fluidez es responsabilidad compartida de copy (stems claros) y de implementacion (motion, latencia, estados).

---

## 8. Sistema de resultados "magia" (patron por capas)

Todo resultado de test sigue el mismo patron de cuatro a cinco capas, de lo simple a lo profundo. El usuario obtiene valor en la primera capa; la profundidad esta disponible, no impuesta.

| Capa | Que muestra | Free | Paid |
|---|---|:--:|:--:|
| 1. Visual primero | Una imagen del resultado (grafico, mapa, constelacion) antes que texto | Si | Si |
| 2. Frase reveladora | Una linea que nombra el hallazgo principal en cotidiano | Si | Si |
| 3. Explicacion simple | 2-3 frases que explican que significa, sin jerga | Si | Si |
| 4. Profundidad al expandir | Facetas, matices, comparacion con baremo, ejemplos | Teaser (limitado) | Completa |
| 5. Que significa para ti + limite | Lectura accionable + nota honesta de alcance | Si | Si |

### 8.1 Ejemplo trabajado (es-CO) — resultado de un rasgo

> **[Visual]** barra de Extraversion en su posicion vs. baremo.
> **Frase reveladora:** "Recargas energia mas en lo tranquilo que en lo social."
> **Explicacion simple:** "Tiendes a disfrutar contextos con menos estimulo. No es timidez: es de donde sacas energia."
> **Profundidad (expandir):** facetas (sociabilidad, asertividad, nivel de actividad) con su lectura.
> **Que significa para ti + limite:** "Esto describe tu tendencia actual, no una etiqueta fija. Un puntaje no predice como te ira en un rol."

`Regla:` la capa 2 (frase reveladora) es copy autoral y es donde mas se juega la "magia"; la capa 4 se apoya en los textos de interpretacion del pack. La capa 5 carga la honestidad (no determinismo, no prediccion individual).

---

## 9. Free: perfil integrado teaser

Es el gancho central del Free hacia el Paid. Une las 4 dimensiones (personalidad + intereses + valores + bienestar) en una narrativa breve y muestra, de forma explicita pero parcial, que el Paid revela mucho mas.

| Regla | Detalle |
|---|---|
| Que muestra | Una sintesis de 4-6 frases que conecta los 4 resultados en una historia coherente sobre el usuario |
| Que insinua | Una "pincelada" de 1-2 cruces que el integrador Paid haria a fondo (ej. "tus valores y tus intereses apuntan a entornos donde X; en el perfil completo verias como se combinan con tus fortalezas") |
| Que oculta | Las fortalezas (VIA), las facetas, el integrador completo, el mapa O*NET — sin frustrar: se nombra que existe, no se entrega a medias |
| Tono del puente al Paid | "Esto es un primer esbozo. El perfil completo cruza ocho dimensiones y te muestra patrones que aqui apenas se asoman." Sin urgencia. |

`Criterio de exito:` el teaser entrega valor real por si solo (el usuario se va sabiendo algo nuevo aunque no compre) y a la vez deja una pregunta abierta. Cebo vacio = anti-patron.

---

## 10. Paid: reporte profundo + Motor de Perfil Integrador

### 10.1 Reporte profundo por instrumento

Cada test del Paid usa el patron por capas (§8) con la capa 4 completa: facetas, comparacion con baremo CO/MX, textos de interpretacion del pack, ejemplos cotidianos. Profundidad alta, lenguaje legible para no expertos.

### 10.2 El integrador como climax

Las seis salidas del integrador (PRD §6) se presentan en este orden narrativo, de lo analitico a lo sintetico, cerrando con la constelacion:

| Orden | Salida | Como se presenta |
|---|---|---|
| 1 | Ajuste persona-trabajo | Mapa: intereses x valores x personalidad x O*NET, con ocupaciones a explorar (no veredictos) |
| 2 | Mapa de coherencia y tensiones | Visual de alineaciones y tensiones (valores vs. lo que hace; sentido vs. engagement) |
| 3 | Fortalezas en accion | Como tus fortalezas VIA se expresan segun tus facetas de personalidad |
| 4 | Drivers de bienestar | Que dimensiones se asocian a tu bienestar, mas alla del puntaje |
| 5 | Bordes de crecimiento | Donde tienes mas palanca de desarrollo, en tono de posibilidad |
| 6 | Constelacion / arquetipo | Cierre: una narrativa unificadora que el usuario reconoce como "soy yo" |

`Salvaguardas del integrador (PRD §6):` los cruces sin respaldo de validez se etiquetan como exploratorios y se redactan como hipotesis ("esto podria sugerir..."), no como hechos. Sin lenguaje causal ni predictivo. La constelacion describe, no profetiza.

`Por que sorprende:` el usuario ya vio sus resultados sueltos; el integrador le muestra el patron entre ellos. La sorpresa viene del cruce, no de un dato nuevo aislado.

---

## 11. Direccion visual

Principios de nivel direccion (no pixel-perfect; el detalle lo ejecuta `ui-ux-pro-max-skill` en implementacion).

### 11.1 Principios

| Principio | Que implica |
|---|---|
| Datos como visual primero | Cada resultado entra por una imagen (barra, radar, mapa, constelacion) antes que por texto. El numero es secundario al patron. |
| Calma y foco | Mucho espacio en blanco; un foco por pantalla; jerarquia tipografica clara. La calma comunica rigor. |
| Profundidad progresiva | Capas expandibles (acordeon / drill-down): simple arriba, profundo al pedirlo. Nunca todo a la vez. |
| Continuidad de marca | Un sistema visual coherente entre los 4 tests y el integrador, para que el perfil se sienta uno solo. |
| Motion con proposito | Transiciones que guian la atencion y dan fluidez; nunca decorativas ni lentas. |
| Accesibilidad como base | Contraste, tamano, navegacion por teclado, lectores de pantalla (§13). |

### 11.2 Componentes clave de la experiencia

| Componente | Funcion | Notas de experiencia |
|---|---|---|
| Hook card | Tarjeta de cada test con su hook | Invita; muestra tiempo honesto; no presiona |
| Pantalla "Antes de comenzar" | Intro factual + NFR-27 donde aplica | Definida en TEST_INTRO_MICROCOPY; no rediseñar el copy legal |
| Item view | Presentacion de un item + escala | Foco unico; anclas es-CO; respuesta inmediata |
| Barra de progreso | Avance por test / global | Tranquila, informativa, no ansiosa |
| Result card | Resultado por capas (§8) | Visual primero; expandible |
| Vista del integrador / constelacion | Clima del Paid: el cruce entre dimensiones | El componente mas distintivo; merece el mayor cuidado visual |
| Teaser / puente al Paid | Cierre del Free | Valor real + pregunta abierta, sin urgencia |

`Handoff visual:` Claude Code define tokens (color, tipografia, espaciado, motion) con `ui-ux-pro-max-skill`. Esta spec fija el comportamiento y la intencion de experiencia; el skill fija el sistema visual concreto. En conflicto sobre intencion de experiencia, prevalece esta spec; sobre detalle visual, prevalece el skill.

---

## 12. Salvaguardas de experiencia etica y accesibilidad

| Tema | Lineamiento |
|---|---|
| NFR-27 (disclaimer no-clinico) | Pre-test en instrumentos con `emotional_distress` (PERMA, BFI-2-S, PANAS, BPNSFS, lente B2B desgaste). Bloque separado del copy factual (TEST_INTRO §0). |
| NFR-28 (ruta de contencion) | Disponible al detectar senal de malestar; con lineas Colombia; sin lenguaje alarmista. |
| Items sensibles | Framing cuidadoso; el resultado de afecto negativo nunca se presenta como diagnostico; siempre con lectura de desarrollo y limite. |
| No manipulacion | Cero urgencia artificial, escasez, conteos regresivos, culpa o halago vacio. El puente al Paid muestra valor, no presiona. |
| Transparencia | El usuario ve version, confiabilidad y limite del instrumento como parte del resultado, no escondido. |
| Accesibilidad (WCAG) | Contraste AA minimo; texto escalable; navegacion por teclado; alternativas no-color para graficos; lectores de pantalla; sin depender solo de motion. |
| B2B | Senales sensibles solo agregadas (n>=5); nunca por individuo al empleador. |

---

## 13. Criterios de aceptacion "clase mundial"

`Inferencia:` "clase mundial" debe medirse, no declararse. Tres frentes:

### 13.1 Heuristicas (revision experta, por pantalla)
Hook entendible en <5 s; un foco por pantalla; resultado legible sin jerga; profundidad disponible no impuesta; honestidad visible; cero anti-patrones (§2).

### 13.2 Pruebas con usuarios (Colombia, n=15-20, fase 6)
- Comprension: el usuario explica su resultado con sus palabras.
- Reconocimiento: "esto soy yo" (validez aparente).
- Revelacion: nombra al menos un hallazgo nuevo tras el integrador.
- Fluidez: completa un test sin friccion ni confusion.
- Confianza: percibe el producto como riguroso y honesto.

### 13.3 Metricas (de PRD §11)
Activacion Free >=60%; completion Free >=40%; completion Paid >=75%; dropoff por instrumento <=15%; NPS reporte Paid >=40; retorno 7d/30d. La fase 6 busca mover estas vs. baseline.

---

## 14. Lineamientos ligeros — B2B-A

Reutiliza todo el sistema (voz, hooks, fluidez, resultados por capas). Particularidades a especificar en la fase B2B:

- **Doble destinatario:** el empleado vive la experiencia individual completa (su autoconocimiento); la empresa ve solo dashboard agregado anonimo (n>=5).
- **Confianza P3:** el empleado llega por su empleador; la experiencia debe comunicar desde el inicio que sus respuestas no se usan para seleccion y que la empresa no ve individuos. Esto es requisito de experiencia, no letra pequena.
- **Lentes:** la empresa configura por su pregunta de negocio (PRD §7); el empleado solo ve los tests de las lentes activas, con la misma calidad de experiencia.
- **Dashboard:** experiencia aparte (rol administrador), con foco en claridad de lectura agregada y cero exposicion individual.

---

## 15. Lineamientos ligeros — Ikigai Premium

- **El mapper es el componente estrella:** visual integrador de 4 bloques (lo que amo, en lo que soy bueno, lo que el mundo necesita, por lo que me pagan) sobre el stack Paid + Ikigai-9.
- **Disclaimer cultural como parte de la experiencia:** antes y dentro del mapper, declarar que el Venn de 4 circulos es de Zuzunaga/Winn, no ikigai japones (Hasegawa/Kamiya/Mogi). No es letra pequena: es parte del rigor que diferencia.
- **No prometer "respuesta unica de vida":** el mapa muestra coherencias y tensiones; nombra un centro como exploracion, no como veredicto.
- `Gap:` dossier+pack Ikigai-9 v1.0 ya listos; antes de especificar la experiencia a fondo falta la adaptacion es-CO del instrumento (`[GAP-IKIGAI9-ITEMS-ES-CO]`).

---

## 16. Handoff y pendientes Cowork

### 16.1 Que implementa Claude Code (con ui-ux-pro-max)
Sistema visual y tokens; componentes (§11.2); motion y estados; accesibilidad; drill-down de resultados; vista del integrador/constelacion.

### 16.2 Pendientes Cowork (alimentan la implementacion)
| Pendiente | Para | Flag |
|---|---|---|
| PVQ-21: dossier+pack v1.0 listos; pendiente extraer items/anclas es-CO de fuente validada | Fase 2 | `[GAP-PVQ21-ITEMS-ES-CO]`, `[GAP-PVQ21-ANCHORS-ES-CO]` |
| Hook final por test (validado en piloto) | Fases 2-3 | — |
| Textos de resultado (frase reveladora capa 2) por dimension | Fases 2-3 | — |
| Narrativa y textos del integrador (las 6 salidas + constelacion) | Fase 3 | — |
| Spec de experiencia B2B y dashboard | Fase 4 | — |
| Ikigai-9 dossier+pack listos; pendiente adaptacion es-CO + experiencia del mapper | Fase 5 | `[GAP-IKIGAI9-ITEMS-ES-CO]` |

---

## 17. Supuestos, gaps y riesgos

- `Supuesto:` el sistema visual concreto lo define ui-ux-pro-max; esta spec fija intencion y comportamiento. Si el skill impone patrones que chocan con una salvaguarda etica, prevalece la salvaguarda.
- `Gap:` Free v2.0 cambia Flourishing por PVQ-21; el codigo/microcopy actual se hizo para Flourishing. Requiere microcopy y anclas PVQ-21 nuevas y mover Flourishing a Paid.
- `Riesgo (R-04 del PRD):` que los resultados se perciban genericos (efecto Barnum). Mitigacion: frase reveladora especifica por patron, integrador como diferenciador, piloto cognitivo temprano.
- `Riesgo:` que la profundidad del Paid genere fatiga. Mitigacion: §5.2 (segmentacion, progreso, pausas, tiempos honestos).
- `Riesgo:` que el hook, al buscar enganche, infle el valor predictivo. Mitigacion: formula §6.1 + revision etica; el hook describe lo que revela, no promete resultados.

---

## 18. Changelog

| Version | Fecha | Cambios |
|---|---|---|
| 1.0 | 2026-06-05 | Version inicial. Cobertura Free + Paid a fondo; B2B/Ikigai lineamientos. Sistema de magia, voz es-CO, hooks por constructo (exemplars), resultados por capas, perfil integrado teaser, presentacion del integrador, direccion visual + componentes, salvaguardas eticas, criterios de aceptacion. Detecta gap PVQ-21 en Free v2.0. |

---

*Fin del UX_EXPERIENCE_SPEC v1.0. Documento vivo. La capa autoral (hooks, narrativas) puede crearse; el copy de instrumento se extrae de fuente validada. Se sincroniza con `PRD_MAESTRO.md` (producto) y `ui-ux-pro-max-skill` (sistema visual).*
