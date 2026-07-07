# DIAGNOSTICO UX/UI + PLAN PRIORIZADO — DescubreMe

**Fecha:** 2026-06-29
**Autor (Cowork):** [Rol: UX Researcher / UX Writer + Estratega de producto]
**Alcance:** los 4 productos (B2C Free, B2C Paid, Ikigai, B2B-A), con foco inmediato en el Free vivo en producción.
**Relación con otros docs:** extiende `auditoria-ux-ui/AUDITORIA.md` (2026-06-14, que cubrió la landing y la piel visual) hacia un plan de flujo completo. El rediseño detallado vive en `BLUEPRINT_EXPERIENCIA_v1.0.md`.
**Decisiones de sesión que gobiernan este plan:** dirección visual = A "Papel y tinta" como base + tratamiento "constelación" de B para el clímax; resultados Free = híbrido (pista mínima por test + resultados reales en el teaser); consentimiento = "aceptar y listo" (una sola pantalla, compatible Ley 1581); voz = es-CO tuteo (se elimina el voseo).

---

## 0. Resumen ejecutivo

`Hecho:` el motor está bien construido (arquitectura data-driven, accesibilidad real, ética/compliance integrada, datos cifrados). Lo que falta es la **capa de experiencia**, que el propio proyecto declaró como diferenciador #1 y que nunca se ejecutó. Por eso la app se siente "prototipo": cinco pantallas con el mismo molde, idioma roto (voseo), un Free que no te devuelve nada visible, transiciones mudas entre tests, y un flujo fracturado donde recomendaciones y pantallas quedaron en rutas inalcanzables.

`Opinión profesional:` tu malestar es correcto y ya estaba diagnosticado en el repo; tus quejas mapean 1:1 con gaps abiertos en el BACKLOG. La buena noticia: como los huesos son sólidos, esto es **aditivo, no un rewrite**. Se cambia la piel, los momentos, los textos y el cableado del flujo, no el motor de scoring.

---

## 1. Tu diagnóstico, traducido

| Lo que dijiste | Causa raíz | Gap en el repo | Severidad |
|---|---|---|---|
| "La página inicial no enamora, no invita a hacer nada" | Landing = bloque de texto centrado, h1 de 30px, botón que se funde en hover; además **voseo** rioplatense en vez de es-CO | `GAP-MICROCOPY-VOSEO-TO-ES-CO` (P1) + AUDITORIA §2 | Alta |
| "No es lindo, las transiciones no son lindas" | Tokens de motion definidos pero casi sin usar; sin atmósfera; un único `fadeIn` en todo el producto | AUDITORIA §1 (motion definido, no usado) | Alta |
| "Cuando paso de test a test no se entiende qué hice ni qué debo hacer" | La transición entre tests es un botón pelado: sin recap de lo que terminaste, sin preview de lo que sigue | `GAP-W6-HOOKS-1` (escalado a P1) | Alta |
| "El proceso es complicado, hay recomendaciones saliendo por varias partes" | Pantallas de nivel (W5) y de ocupaciones (W6) viven en `/reporte`, pero el Free termina en `/perfil-integrado` → **inalcanzables** y descoordinadas | `GAP-W5W6-ORPHANED-FREE-FLOW` (P1) | Alta |
| "No veo resultados" (implícito en tu queja de flujo) | El Free hoy solo muestra teaser; ningún test te devuelve un "ajá" propio | `GAP-FREE-NO-RESULTS-VISIBILITY` (P1) | Alta |
| "Por qué no es como aceptar términos y ya está" | El consentimiento Ley 1581 se presenta disperso, no como un único momento limpio | (nuevo) `GAP-CONSENT-UX-ONE-SCREEN` | Media |
| (no lo mencionaste, pero lo viste en el smoke) Textos PLACEHOLDER en el test de valores | TwIVI sembrado con stems placeholder, visibles en producción | `GAP-TWIVI-ITEMS-ANCHORS-ES-CO` (vivo en prod) | Alta (credibilidad) |

---

## 2. Los siete problemas de raíz

`Hecho, con evidencia:`

1. **La capa de experiencia no se construyó.** Las 5 pantallas del Free (landing, onboarding, loop de test, reporte, teaser) son la misma columna `max-w-3xl` centrada, h1 de 30px y un botón azul. No hay jerarquía, tipografía con carácter, color con intención ni composición. Es minimalismo por defecto, no por diseño (AUDITORIA §0).

2. **El idioma está roto.** La landing viva dice "Conocé", "funcionás", "Empezá", "necesitás", "Serás" — voseo rioplatense. Viola CLAUDE.md §13 (es-CO tuteo) y rompe la confianza: un colombiano percibe de inmediato que "esto no me habla a mí".

3. **El Free no te devuelve nada.** Respondes 4 tests (~100+ ítems incluyendo O*NET de 60) y no ves ni un resultado propio; solo un teaser al final. La promesa "conócete" no se cumple en el camino, solo (parcialmente) al final.

4. **Las transiciones son mudas.** Al terminar un test pasas al siguiente con un botón, sin que el producto te diga "esto acabas de descubrir" ni "esto viene ahora y por qué vale la pena". El usuario pierde el hilo: no sabe qué hizo ni qué sigue.

5. **El flujo está fracturado.** La captura de nivel educativo/experiencia y el mapa de ocupaciones quedaron cableados en `/reporte`, una ruta que el Free no visita (termina en `/perfil-integrado`). Resultado: pantallas huérfanas y "recomendaciones saliendo por varias partes".

6. **El consentimiento se siente burocrático.** Lo que debería ser un momento de confianza ("esto hacemos con tus datos; acepto y sigo") está disperso. Se puede cumplir Ley 1581 con UNA pantalla clara y honesta.

7. **Hay placeholders en producción.** El test de valores (TwIVI) muestra texto tipo "PLACEHOLDER — Self-Direction item 1". Esto destruye la credibilidad del rigor, que es tu diferenciador #1.

`Inferencia:` 1-2 son piel; 3-5 son arquitectura de flujo; 6-7 son confianza. Los tres frentes se atacan en paralelo pero con secuencia (ver §4).

---

## 3. Decisiones de producto fijadas en esta sesión

| Decisión | Qué significa | Por qué |
|---|---|---|
| **Visual A + clímax B** | Base editorial cálida y legible (Fraunces + Hanken, crema/terracota/salvia); el tratamiento "constelación" oscuro se reserva para el integrador y el teaser | Mejor relación impacto/riesgo; el oscuro complica el mucho texto legal y de resultados; el "wow" se concentra donde más pesa |
| **Resultados híbridos en Free** | Cada test cierra con una pista visual mínima (un "ajá" + 1 frase), sin "gastar" el resultado completo; el teaser integrado entrega los resultados reales cruzados | Resuelve "no veo nada" sin canibalizar el Paid; el Paid vende profundidad e integración, no "el resultado" |
| **Consentimiento "aceptar y listo"** | Una sola pantalla: qué medimos, qué NO hacemos (no clínico, no predicción), qué pasa con tus datos, un check, "Acepto y empiezo" | Cumple Ley 1581 (informado, granular en el texto) sin fricción percibida |
| **Voz es-CO tuteo** | Se elimina el voseo en todo el producto | CLAUDE.md §13; confianza con el usuario colombiano |

---

## 4. Plan priorizado por olas

Cada ola entrega valor usable y es independiente de la siguiente. Owner: Cowork (contenido/UX), CC (Claude Code, implementación), German (decisión).

### Ola 0 — Parar la hemorragia (P0/P1, lo que ya está vivo y resta credibilidad)

| Acción | Owner | Resultado | Reversibilidad |
|---|---|---|---|
| Reemplazar voseo → es-CO tuteo en landing y microcopy | Cowork (texto) + CC (aplica) | El producto "habla colombiano" | Total (es texto) |
| Reemplazar placeholders TwIVI por ítems/anclas es-CO de fuente validada | Cowork + Adaptación | Se va el "PLACEHOLDER" de prod | Total (seed) |
| Re-anclar W5 (nivel) y W6 (ocupaciones) dentro del flujo Free alcanzable | CC | El flujo deja de estar fracturado | Media (routing) |
| Consolidar consentimiento en una pantalla "aceptar y listo" | Cowork (texto) + CC | Confianza, menos fricción | Media |

### Ola 1 — Primera impresión (dirección visual aplicada)

| Acción | Owner | Resultado |
|---|---|---|
| Implementar tokens dirección A (tipografía Fraunces/Hanken, paleta crema/terracota/salvia, motion) | CC | Sale del look "prototipo" |
| Rediseñar landing + onboarding en es-CO con jerarquía y un momento de motion | Cowork (copy) + CC | La landing enamora e invita |

### Ola 2 — El Free devuelve valor (resultados híbridos + transiciones)

| Acción | Owner | Resultado |
|---|---|---|
| Sistema de transición entre tests: recap ("esto descubriste") + preview ("esto sigue y por qué") | Cowork (copy) + CC | "Ahora sí entiendo qué hice y qué viene" |
| Pista mínima por test (capa 1-2 de resultado: visual + frase reveladora) | Cowork + CC | Ganas algo en cada paso |
| Progreso visible ("vas en X de Y") en vez de `sr-only` | CC | El usuario ve su avance |

### Ola 3 — El clímax (teaser/integrador con constelación)

| Acción | Owner | Resultado |
|---|---|---|
| Teaser integrado rediseñado con tratamiento constelación (dirección B) | Cowork (narrativa) + CC | El momento "no me había visto así" |
| Elevar data-viz (hexágono RIASEC, barras, circumplejo) de funcional a hermoso | CC | El activo diferenciador se ve diferenciador |

### Ola 4 — Profundidad de los otros productos

| Acción | Owner | Resultado |
|---|---|---|
| Spec de experiencia Paid a fondo (sesiones, reporte por capas, integrador 6 salidas) | Cowork | Paid listo para construir |
| Transición Paid → Ikigai (mapper + disclaimer cultural) | Cowork | Ikigai listo para fase 5 |
| Spec de experiencia B2B-A (doble destinatario, lentes, dashboard, confianza) | Cowork | B2B listo para fase 4 |

### Ola 5 — Clase mundial (pulido + validación)

| Acción | Owner | Resultado |
|---|---|---|
| Accesibilidad WCAG AA en todo motion/color nuevo | CC | Inclusivo y conforme |
| Piloto cognitivo de hooks y resultados (Colombia, n=15-20) | Cowork + German | Se valida que "esto soy yo" |
| Tablero de métricas (activación, completion, NPS reporte) | CC | Se mide que mejoró |

`Inferencia de secuencia:` Olas 0-1 son días de trabajo y atacan lo que más duele hoy (lo vivo en prod + primera impresión). Olas 2-3 construyen el enganche real. Ola 4 expande a Paid/Ikigai/B2B. Ola 5 cierra "clase mundial". El BLUEPRINT detalla el contenido de cada ola.

---

## 5. Cómo sabremos que mejoró (criterios)

- **Heurístico (por pantalla):** hook entendible en <5 s; un foco por pantalla; resultado legible sin jerga; transición que responde "qué hice / qué sigue"; cero anti-patrones (urgencia, halago vacío).
- **Con usuarios (Colombia, n=15-20, ola 5):** comprensión (explica su resultado con sus palabras), reconocimiento ("esto soy yo"), revelación (nombra un hallazgo nuevo), fluidez (completa sin fricción), confianza (lo percibe riguroso y honesto).
- **Métricas (PRD §11):** activación Free ≥60%, completion Free ≥40%, dropoff por instrumento ≤15%, NPS reporte Paid ≥40, retorno 7d/30d.

---

## 6. Qué NO tocar (los activos)

`No-negociable, heredado de AUDITORIA §1 y CLAUDE.md §8:`

- Arquitectura de componentes data-driven (instrumentos como metadata/plugin).
- Accesibilidad real (radiogroup, aria-live, targets ≥44px, prefers-reduced-motion).
- Ética/compliance (NFR-27 modal pre-test, NFR-28 ruta de contención, sin dark patterns).
- Honestidad psicométrica (no determinismo, no predicción individual, límites visibles).
- La cicatriz ADR-021 (tokens Tailwind v4 `--spacing`/`--container`): cualquier cambio de token se nombra explícitamente.

`Regla de oro:` la "magia" vive en la capa autoral (hooks, narrativa, microcopy) y en lo visual alrededor del instrumento, **nunca dentro** del instrumento (los stems y anclas se extraen de fuente validada, no se inventan).

---

*Fin del diagnóstico + plan v1.0. El rediseño detallado (pantalla por pantalla, microcopy es-CO, sistema visual, los 4 flujos) vive en `BLUEPRINT_EXPERIENCIA_v1.0.md`.*
