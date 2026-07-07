# HANDOFF UI — DescubreMe (Cowork → Claude Code)

**Fecha:** 2026-07-01
**Autor (Cowork):** [Rol: UX Researcher/Writer + PM]
**Versión:** 1.0
**Naturaleza:** spec de implementación de la capa de experiencia. NO es código de producción (CLAUDE.md §6): define tokens, componentes, motion, rutas y criterios de aceptación; Claude Code implementa con `ui-ux-pro-max-skill`.
**Fuentes (leer antes de codear):**
1. `BLUEPRINT_EXPERIENCIA_v1.0.md` (interno v1.2) — spec canónica de comportamiento y copy.
2. **Prototipo Claude Design** — referencia visual pantalla por pantalla: proyecto `15f3319f-a0fc-4573-aeba-c978ef465352`, archivo `DescubreMe Prototipo.dc.html` (2026-06-30). Importable vía claude_design MCP (`https://api.anthropic.com/v1/design/mcp`, auth `/design-login`).
3. `estado/DECISIONS_LOG.md` **ADR-031** (cierre Free) + ADR-030 (dirección A+B) + ADR-021 (cicatriz tokens Tailwind).
4. `MICROCOPY_ES-CO_SIGNOFF_v1.0.md` — todo el copy listo para sembrar (misma carpeta).

`Regla de oro:` la magia vive ALREDEDOR del instrumento. Stems y anclas se extraen de fuente validada (packs), jamás se redactan aquí. Cualquier conflicto entre este handoff y el CLAUDE.md del proyecto → gana el CLAUDE.md.

---

## 0. Resumen ejecutivo

Cuatro olas de implementación (0-3) convierten el Free vivo en prod en la experiencia del prototipo: tokens editoriales (Fraunces/Hanken, crema/terracota/salvia), microcopy es-CO, transiciones recap+preview, mini-resultados por test, y el cierre canónico ADR-031 (nivel → constelación con ocupaciones dentro). La maquinaria de Phase 2.1 se conserva completa; esto es piel, momentos y textos. Responsive móvil es criterio de aceptación desde la ola 1, no una fase posterior.

---

## 1. Design tokens (ola 1)

`Cicatriz ADR-021 (obligatorio):` Tailwind v4 CSS-first. NO reintroducir tokens en los namespaces `--spacing-*` / `--container-*` con nombres t-shirt (colisión que colapsó el layout). Todo token nuevo se declara con prefijo propio `--dm-*` y el cambio se nombra explícitamente en el PR.

### 1.1 Color

| Token propuesto | Valor | Uso |
|---|---|---|
| `--dm-paper` | `#F4EEE2` | Fondo base (dirección A) |
| `--dm-paper-2` | `#EBE3D2` | Fondo alterno / cards suaves |
| `--dm-surface` | `#FBF8F1` (aprox., validar contra prototipo) | Cards blancas cálidas |
| `--dm-ink` | casi-negro cálido (extraer del prototipo; aprox `#2B2620`) | Texto principal |
| `--dm-ink-soft` | ink al ~70% | Texto secundario |
| `--dm-terracotta` | `#B0522A` | CTA primario, subrayados, eyebrows |
| `--dm-terracotta-deep` | oscurecido ~12% | Hover CTA (nunca fundirse con el fondo) |
| `--dm-sage` | `#6B7C5C` | Datos, barras, progreso |
| `--dm-night` | `#131C3A` | Fondo clímax (dirección B) |
| `--dm-mist` | `#E7ECF7` | Texto sobre nocturno |
| `--dm-gold` | `#E6C16B` | Estrellas, arquetipo, acentos clímax |
| `--dm-star-cyan` | `#8FC3DD` | Conexiones de constelación, links en nocturno |

`Regla:` el nocturno (`--dm-night` y acentos) se usa SOLO en teaser, integrador y momentos de revelación. Todo lo demás vive en la base A. Verificación AA §7.

### 1.2 Tipografía

| Rol | Fuente | Notas |
|---|---|---|
| Display / títulos | **Fraunces** (variable, optical sizing auto) | vía `next/font`; hero ≥56px desktop / ≥36px móvil; títulos de sección 28-36px |
| Cuerpo / UI | **Hanken Grotesk** | vía `next/font`; reemplaza a Inter en TODO el producto; cuerpo ≥16px |
| Acento técnico (opcional) | mono discreto (p.ej. la mono del sistema) | solo fichas técnicas/labels psicométricos |

`Nota:` Inter está cableada vía `next/font` desde ADR-021 — el swap es en el mismo mecanismo, no en CSS suelto. El itálico de Fraunces se usa para el énfasis del hero ("*sin etiquetas*") y el arquetipo del clímax.

### 1.3 Espaciado, radios, sombras

- Escala 8pt numérica existente (ADR-021) se conserva.
- Radios: cards grandes ~16px, botones pill (radio full), inputs ~10px (validar contra prototipo).
- Sombras: mínimas y cálidas; las cards del prototipo usan borde sutil + sombra baja. Nada de sombras azuladas.
- Composición: romper la columna única centrada — hero asimétrico en desktop (texto izquierda, data-viz derecha), resultados con visual dominante. Ver prototipo.

---

## 2. Motion spec (ola 1, se aplica en 2-3)

| Momento | Efecto | Duración/easing | Guardrail |
|---|---|---|---|
| Entrada de títulos | revelado línea por línea (máscara), 1 sola vez | 400-600ms, ease-out | `prefers-reduced-motion` lo desactiva (aparece sin animar) |
| Resultado (barras/hexágono) | el visual se DIBUJA antes de aparecer el texto (barra crece, trazo se traza) | 600-900ms, ease-in-out | igual |
| Transición entre pantallas | cross-fade + desplazamiento leve (~8px) | 200-300ms | nunca recarga brusca |
| Clímax constelación | estrellas titilan suave (loop), conexiones se dibujan al entrar | dibujo 800-1200ms; titileo sutil | reduce-motion: estático |
| Feedback de respuesta (ítem) | selección marca inmediata (outline terracota) | <100ms | el tap nunca se siente "muerto" |

`Principio:` motion con propósito (guiar la atención al patrón), nunca decorativo. Un solo momento de motion por pantalla.

---

## 3. Componentes por ola (con rutas y criterios de aceptación)

### Ola 0 — Parar la hemorragia (texto y datos, sin rediseño visual)

| # | Qué | Dónde (rutas conocidas) | Fuente de contenido | Criterio de aceptación |
|---|---|---|---|---|
| 0.1 | Voseo → es-CO tuteo en TODO el microcopy vivo | `lib/i18n/microcopy/*`, landing `app/(public)/page.tsx`, signup, tests | `MICROCOPY_ES-CO_SIGNOFF_v1.0.md §2` | grep sin "Conocé/Empezá/necesitás/funcionás/sos"; cierra `[GAP-MICROCOPY-VOSEO-TO-ES-CO]` |
| 0.2 | Sembrar ítems/anclas reales TwIVI | `db/seeds/instruments/TwIVI/items.sql` | pack TwIVI (brief `estado/BRIEF_Cowork_TwIVI_es-CO_v1.0.md`) | cero "PLACEHOLDER" renderizado; scoring MRAT verde contra fixture |
| 0.3 | Sign-off `MC_NIVEL_CLOSE_CTA` + microcopy de nivel | microcopy del recut cierre | `MICROCOPY_ES-CO_SIGNOFF_v1.0.md §3` | CTA dice "Ver tu primer mapa →" (pendiente OK German) |

### Ola 1 — Primera impresión (tokens + landing + onboarding)

| # | Qué | Dónde | Criterio de aceptación |
|---|---|---|---|
| 1.1 | Tokens §1 + fuentes §1.2 + motion base §2 | capa de tokens global | typecheck + build verdes; ADR-021 respetado; visual regression manual contra prototipo |
| 1.2 | Landing rediseñada (hero asimétrico, card 4 instrumentos, línea de honestidad) | `app/(public)/page.tsx` | igual al prototipo pantalla "1 · Landing" (desktop) y §3.7 blueprint (móvil); hook entendible <5s |
| 1.3 | Taste de intención sin datos | paso previo a `/signup` (nuevo, sin persistencia server; la elección viaja como param/cookie efímera hasta post-signup) | pantalla "2 · Intención" del prototipo; NO recolecta datos pre-consent; la intención se retoma en mapa/transición/teaser |
| 1.4 | Registro magic link + 18+ (reskin) | `/signup` | pantalla "3 · Registro"; botón deshabilitado hasta email válido |
| 1.5 | Consentimiento "aceptar y listo" (reskin del contenedor, NO del texto legal) | pantalla de consent actual | pantalla "4 · Consentimiento"; texto legal intacto (`lib/consent/text/`); cierra `[GAP-CONSENT-UX-ONE-SCREEN]` en lo visual |
| 1.6 | Mapa de 4 paradas con intent recall | post-consent (hoy el flujo salta directo a BFI; añadir la vista mapa) | pantalla "5 · Mapa"; tiempos honestos por test; "empezamos por aquí" refleja la intención |

### Ola 2 — El Free devuelve valor (loop + transiciones + correo)

| # | Qué | Dónde | Criterio de aceptación |
|---|---|---|---|
| 2.1 | Loop de ítem rediseñado: stem grande serif, Likert 5, progreso visible por bloque, "Atrás" | `app/(b2c)/test/[code]/page.tsx` + componentes | pantalla "Personalidad · respondiendo"; progreso "Vas en X de Y" visible (quitar `sr-only`); bloques: O*NET 5 bloques temáticos, resto barra continua que avanza rápido; móvil: Likert vertical §3.7 |
| 2.2 | Hook + "Antes de comenzar" + NFR-27 en un solo contenedor | entrada de cada test (`PretestDisclaimerGate` se conserva como gate) | pantalla "Personalidad · intro"; NFR-27/28 NO se rediseñan en contenido, solo contenedor; el gate sigue bloqueando el ítem 1 |
| 2.3 | Mini-resultado 3 partes por test | `done/page.tsx` + `TransitionScreen` (maquinaria 02.1-04 ya renderiza por `visualType`) | pantalla "Personalidad · resultado"; plantilla Qué medimos / Qué dice / Por qué te importa; bandas, no puntos; **las barras reflejan las respuestas reales** (gap conocido del prototipo — aquí es obligatorio) |
| 2.4 | Transición recap+preview con intent recall | `TransitionScreen` | pantalla "Transición"; recap + dots 1-4 + hook siguiente + tiempo; NO se re-muestra al reanudar (blueprint §6 guardrail) |
| 2.5 | Pantalla "Revisa tu correo" + estado link expirado + reenvío | `/magic-link/sent` (existe) + error path del callback | blueprint §7.3.1; reenvío habilitado a los 30s; el estado expirado NO aterriza en `/?error=` pelado |
| 2.6 | Fix 404 sesión incompleta reclamada | `app/auth/callback/route.ts` | `[GAP-CALLBACK-INCOMPLETE-SESSION-REPORTE-404]`: email reusado con sesión incompleta → reanudar test pendiente, no `/reporte` sin snapshot |

### Ola 3 — El clímax (cierre canónico ADR-031)

| # | Qué | Dónde | Criterio de aceptación |
|---|---|---|---|
| 3.1 | Captura de nivel con framing de afinación | `LevelCapture` (existe, W5) | blueprint §7.7 momento 1; sigue obligatoria pre-reveal; editable en "Mis datos" (ya existe) |
| 3.2 | Teaser-constelación con ocupaciones dentro | superficie `reporte/[sessionId]?cierre=free` (evoluciona) | blueprint §7.7 momento 2: constelación se dibuja + arquetipo + síntesis por combinación + pincelada + "Entornos a explorar" (5-8 ocupaciones Job Zone, sin match %) + rigor + puente Paid USD 19 + honestidad; pantalla "Teaser · clímax" del prototipo como referencia visual |
| 3.3 | Frase por combinación (síntesis + pincelada) | plantillas determinísticas por bandas | sembrar `MICROCOPY_ES-CO_SIGNOFF_v1.0.md §5` (cierra `[GAP-TEASER-CROSS-TEMPLATES-ES-CO]`); trazable, no-LLM |
| 3.4 | Data-viz elevada (hexágono editorial, barras banda, circumplejo) | componentes de visual (`ValueCircle.tsx` etc.) | blueprint §3.5; validar label-overlap del circumplejo con datos reales TwIVI; alternativa no-color + aria |
| 3.5 | Vista histórica "Mis datos" intacta | `me/data/page.tsx` | byte-safe: la vista full de `/reporte` desde Mis datos NO cambia (patrón 02.1-03) |

`Fuera de alcance de este handoff:` Paid/integrador/Ikigai/B2B (olas 4-5, specs en blueprint §9-11); el prototipo ya los dibuja como dirección.

---

## 4. Rutas y flujo canónico (para no re-decidir)

```
/ (landing) → [intención, sin datos] → /signup (magic link + 18+)
  → /magic-link/sent (§7.3.1) → email → /auth/callback
  → consentimiento (una pantalla) → mapa 4 paradas
  → /test/BFI-2-S → mini-resultado → transición
  → /test/ONET-IP-SF (bloques) → mini-resultado → transición
  → /test/TwIVI → mini-resultado → transición
  → /test/PERMA-Profiler → mini-resultado
  → captura de nivel (obligatoria) → teaser-constelación con ocupaciones (ADR-031)
  → puente Paid (sin urgencia) · email FREE-14 (awaited, idempotente — conservar)
```

Orden de tests = data-driven (`product_stack`, BFI=1 desde mig 017). El flujo NO tiene tramo anónimo (ADR-029).

---

## 5. Cierre Free ADR-031 — detalle de implementación

1. **Conservar:** `resolveFreeCloseTarget` (resolución por `visual_type='hexagon'` + snapshot), `LevelCapture` + `captureLevelAction`, filtro Job Zone, `sendFreeCompleteEmail` awaited, query param `?cierre=free` (preserva la vista full para "Mis datos").
2. **Cambiar:** la composición del render `isFreeClose`: hoy "nivel → ocupaciones + CTA"; pasa a "nivel → vista constelación" donde las ocupaciones son una sección interna (blueprint §7.7). El hexágono RIASEC del Free se re-renderiza como constelación (mismo dato, tratamiento B).
3. **Microcopy:** claves nuevas/actualizadas en `MICROCOPY_ES-CO_SIGNOFF_v1.0.md §3-5`. `MC_NIVEL_CLOSE_CTA` = "Ver tu primer mapa →" (pendiente sign-off German).
4. **No romper:** PR #6 sigue válido (el mini-result de transición no linkea al reporte); la única puerta al cierre es post-PERMA.

---

## 6. Responsive (criterio de aceptación transversal)

Reglas completas en blueprint §3.7. Resumen operativo por componente: Likert vertical <480px con targets ≥44px; hero apilado en móvil (título ≥36px); constelación cuadrada ≤85vw arriba y síntesis debajo; transición a una columna con visual miniatura; dashboard B2B en cards apiladas; cuerpo ≥16px. **Cada PR de olas 1-3 incluye captura móvil (375px) y desktop (1440px) en la verificación.**

---

## 7. Accesibilidad (gate de cada ola)

- WCAG AA: cuerpo ≥4.5:1, títulos/large-text ≥3:1. Pares a auditar con herramienta real (no a ojo): `mist #E7ECF7` sobre `night #131C3A` (esperado OK); `gold #E6C16B` sobre night (usar solo para display grande, NO cuerpo); `star-cyan #8FC3DD` sobre night (links: subrayar además del color); `terracotta #B0522A` sobre `paper #F4EEE2` (esperado OK para texto grande y botones; validar en cuerpo); `sage` sobre paper solo para elementos gráficos, no texto pequeño.
- Texto legal largo NUNCA sobre nocturno: panel claro embebido (blueprint §3.2).
- Conservar lo que ya está bien: radiogroup, aria-live, targets ≥44px, `prefers-reduced-motion` (DIAGNOSTICO §6 "qué no tocar").
- Toda data-viz con alternativa no-color y label legible por lector de pantalla.

---

## 8. Mapeo a gaps del BACKLOG

| Flag | Qué entrega este handoff | Qué hace CC |
|---|---|---|
| `[GAP-MICROCOPY-VOSEO-TO-ES-CO]` P1 | Copy completo es-CO (`MICROCOPY... §2`) | Aplicar en microcopy/landing/tests (ola 0.1) |
| `[GAP-W6-HOOKS-1]` P1 | Los 4 hooks + copy de transición firmables (`§4`) | Sembrar en la maquinaria 02.1-04 ya construida (ola 2.4) |
| `[GAP-FREE-TEST-INTRO-COPY]` P2 | Intros "Antes de comenzar" por test (`§4.3`) | Render en la entrada de cada test (ola 2.2) |
| `[GAP-FREE-NO-RESULTS-VISIBILITY]` P1 | Resuelto por diseño (ADR-031 + mini-results) | Olas 2.3 + 3.2 |
| `[GAP-W5W6-ORPHANED-FREE-FLOW]` P1 | Ya cerrado en código (02.1-03); ADR-031 fija la composición final | Ola 3.2 |
| `[GAP-TEASER-CROSS-TEMPLATES-ES-CO]` P1 | 14 plantillas de cruce (`MICROCOPY... §5`) | Seed determinístico por bandas (ola 3.3) |
| `[GAP-MICROCOPY-NIVEL-CTA]` P2 + `MC_NIVEL_CLOSE_CTA` | Propuesta de labels (`MICROCOPY... §3`) | Aplicar tras sign-off (ola 0.3) |
| `[GAP-CONSENT-UX-ONE-SCREEN]` | Contenedor visual spec (blueprint §4) | Ola 1.5 (sin tocar texto legal) |
| `[GAP-CALLBACK-INCOMPLETE-SESSION-REPORTE-404]` P2 | Decisión de UX: reanudar test pendiente | Ola 2.6 |
| `[GAP-UX-FLOW-REDESIGN]` P1 (umbrella) | Este handoff completo | Cerrar al completar olas 0-3 |

---

## 9. Qué NO tocar (heredado, obligatorio)

Arquitectura data-driven (instrumento como metadata/plugin); accesibilidad existente; NFR-27 modal pre-test + NFR-28 ruta de contención (contenido intacto, solo contenedores); honestidad psicométrica (sin determinismo ni match %); `scoreCompletedSessionIfNeeded` (contrato pineado); `me/data` byte-safe; guardarraíl anti-dark-patterns (blueprint §14) como criterio de aceptación de TODA conversión.

---

## 10. Orden sugerido y verificación

1. Ola 0 (texto/datos, sin riesgo visual) → deploy + smoke corto.
2. Ola 1 (tokens + landing + onboarding) → smoke visual desktop+móvil contra prototipo.
3. Ola 2 (loop + transiciones + correo) → E2E del funnel completo con email nuevo.
4. Ola 3 (cierre ADR-031) → smoke del cierre: post-PERMA → nivel → constelación con ocupaciones → puente Paid; "Mis datos" sigue full.

Cada ola es una fase GSD ejecutable (`/gsd-plan-phase` sobre este handoff + blueprint). Sin stack local: verificación de comportamiento por deploy + smoke (patrón 2.1). **No commit/deploy sin OK de German.**

---

*Fin del HANDOFF_UI v1.0. Se sincroniza con BLUEPRINT v1.2 y ADR-031. Actualizar si cambia el prototipo de referencia o el orden de olas.*
