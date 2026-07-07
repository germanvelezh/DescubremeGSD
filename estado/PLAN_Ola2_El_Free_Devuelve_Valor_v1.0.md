# PLAN — Ola 2 "El Free devuelve valor" (HANDOFF_UI §3)

**Fecha:** 2026-07-07 · **Autor:** Claude Code · **Ramas:** 3 escalonadas off `main` (ver abajo)
**Semilla:** `auditoria-ux-ui/HANDOFF_UI_v1.0.md §3 (Ola 2)` + `BLUEPRINT_EXPERIENCIA_v1.0.md §6/§7.3/§7.5` + `MICROCOPY_ES-CO_SIGNOFF_v1.1 §4/§6/§9` (firmado §8).
**Regla:** sin commit/push/deploy sin OK de German. Verificación sin stack local → `tsc --noEmit` + lint + unit + `next build`; comportamiento por deploy-smoke (patrón 2.1). `[GAP-CI-E2E-DB-SUPABASE-ROLES]` sigue abierto → E2E no corre.

**Decisión de secuencia (German, AskUserQuestion 2026-07-07): 3 PRs escalonados.** Una etapa por PR, cada una con su OK-gate + deploy-smoke antes de la siguiente. Mecánica git: **una rama por PR, off `main`, secuencial** (merge de la anterior antes de arrancar la siguiente), coherente con el precedente OLA 1 (`feat/ola-1-*` → PR #9) y con rollback fino.

| PR | Rama | Sub-items | Naturaleza |
|---|---|---|---|
| A | `feat/ola-2a-correo-callback` | 2.5 correo · 2.6 callback | Bajo riesgo; `sent` capturable local, callback = deploy-smoke |
| B | `feat/ola-2b-runner` | 2.1 loop · 2.2 intro | Runner; auth-gated → deploy-smoke |
| C | `feat/ola-2c-mini-result` | 2.3 mini-resultado · 2.4 transición | Valor + composer §9; auth-gated → deploy-smoke E2E funnel |

---

## Decisiones de arquitectura (CC, dominio técnico CLAUDE.md §6 — anotadas, no bloqueantes)

1. **Frases reveladoras §9 → módulo TS + composer puro, NO seed en DB.** Son microcopy (`lib/i18n/microcopy/es-CO/*`); TS las desacopla del reseed voseo→es-CO PROD pendiente y hace las 4 reglas de composición unit-testables. "Patrón seed RIASEC" de §9.6 se lee como "determinista, con clave estable, sin LLM" — TS lo cumple. El composer es fuente única: alimenta mini-resultado (2.3) Y recap de transición 1→2 (§9.6 nota 2).
2. **Tema paper → `.dm-paper` quirúrgico por pantalla** (patrón OLA 1 §1.1), NO voltear el default nocturno global. Las 4 pantallas de OLA 2 (loop, done/transición, sent) renderizan nocturno hoy; se envuelven en `.dm-paper`. El nocturno/constelación se queda en OLA 3.
3. **ONET "5 bloques temáticos" → 5 chunks secuenciales de 12 ("Bloque X de 5"), SIN reordenar.** `Inferencia:` 5 bloques ≠ 6 dimensiones RIASEC → no es agrupación por dimensión; reordenar rompería la administración validada y clusterizaría ítems de la misma dimensión (sesgo straight-lining). El ejemplo del blueprint §7.5c es literal "Bloque 2 de 5" (conteo). Data-driven por `code` + `itemCount`.
4. **PERMA LOW_OVERALL** reusa `getContentionResources` / `ContentionBanner` existentes (NFR-28). Sin construir nada nuevo.
5. **Mini-resultado = sección superior del `TransitionScreen`** (lectura de una pantalla, blueprint §6 mete el mini-resultado dentro de la anatomía de la transición). No una pantalla aparte previa.

## Cicatrices y no-tocar respetados (HANDOFF §9)

- ADR-021: solo `--dm-*`; nada en `--spacing-*`/`--container-*`.
- Arquitectura data-driven (instrumento como metadata/plugin); `resolveScaleForInstrument` es el único puente code→escala (exento FOUND-05).
- NFR-27 modal + NFR-28 contención: **contenido intacto, solo contenedor** (2.2). `PretestDisclaimerGate` sigue siendo la fuente única del gate; su desviación a11y declarada (Escape/scrim no-op) se conserva.
- `scoreCompletedSessionIfNeeded` (contrato pineado); `/done` es el único trigger de scoring; `advanceProgress` recomputa progreso por COUNT (no tocar).
- Decisión B (PR #6): el mini-resultado/transición NO linkea al reporte full.
- `me/data` byte-safe; honestidad (sin match %/determinismo); anti-dark-patterns (blueprint §14).
- Resend omite `options.data` (preserva metadata pending → recall/consent intactos). No tocar.

---

## PR-A — Correo + callback (2.5, 2.6)

### 2.5 — "Revisa tu correo" + expirado + reenvío 30s
`Reencuadre (Hecho):` el estado expirado YA aterriza en `/magic-link/sent?error=expired` (callback route.ts:137-142), no en `/?error=` pelado. El criterio "no aterriza en /?error= pelado" ya se cumple para fallos magic-link. Trabajo real:
- `app/(auth)/magic-link/sent/_components/ResendButton.tsx`: `COOLDOWN_SECONDS` **60 → 30** (spec §6 / blueprint §7.3.1). Confirmación "Listo, enviamos uno nuevo".
- `lib/i18n/microcopy/es-CO/magic-link.ts`: aplicar copy §6 exacto — título "Te enviamos el enlace"; cuerpo "Revisa tu correo **{email}**… si expira, aquí mismo te enviamos otro."; secundario "¿No llega? Mira en spam o promociones."; botón "Reenviar enlace"; micro "Puedes cerrar esta pestaña: el enlace te trae de vuelta exactamente aquí."; expirado "Ese enlace ya expiró. Te enviamos uno nuevo si quieres."
- `.dm-paper` en `app/(auth)/magic-link/sent/page.tsx` (flip a paper).
- **Verificar:** tsc + lint + unit; captura local 375 + 1440 de `/magic-link/sent` (estado normal + `?error=expired`); botón habilita a los 30s.

### 2.6 — Fix 404 sesión incompleta reclamada
`[GAP-CALLBACK-INCOMPLETE-SESSION-REPORTE-404]`. Bug: `app/auth/callback/route.ts:286-289` hace `if (sessionId) redirect(/reporte/${sessionId})` incondicional, sin chequear `scored.ok`. Sesión anónima incompleta reclamada → sin snapshot → `composeReport` throw → `notFound()`.
- **Cambio quirúrgico (solo el bloque de decisión de redirect, pasos 1-10 de consent/DOB/scoring intactos, Ley 1581):** antes de redirigir a `/reporte/${sessionId}`, verificar presencia de snapshot / `scored.ok`. Si NO hay snapshot (incompleta), caer al branch existente `loadFreeOrderedCodes` + `resolveNextFreeTest` → reanudar test pendiente (o `/onboarding/mapa` si 0 completos). Espejo de la disciplina snapshot-verified que `free-close.ts`/`done/page.tsx` ya tienen.
- **TDD:** `tests/unit/auth/` — test nuevo para la rama `sessionId` incompleta (hoy sin cobertura). Rojo→verde.
- **Verificar:** tsc + lint + unit nuevo verde; deploy-smoke: email reusado con sesión anónima incompleta → reanuda test pendiente, NO 404.

---

## PR-B — Runner: loop + intro (2.1, 2.2)

### 2.1 — Loop de ítem rediseñado
Archivos: `app/(b2c)/test/[code]/page.tsx` + `_components/ItemForm.tsx` + `ProgressIndicator.tsx`.
- **`.dm-paper`** en `page.tsx` (flip a paper).
- **Stem grande serif:** aplicar `--font-display` (Fraunces) al stem del ítem (ItemForm).
- **Progreso "Vas en X de Y" visible:** promover `MC_TEST_QUESTION_LABEL(seq, total)` a elemento prominente con `aria-live="polite"`; reconciliar/quitar el `sr-only` de ItemForm.tsx:261-263 (el requisito "quitar sr-only" = hacerlo visible, no duplicado oculto).
- **Bloques ONET (5×12):** derivar `bloque = ceil(seq/12)` y `totalBloques = 5` SOLO para `ONET-IP-SF` (data-driven por code + itemCount=60); mostrar "Bloque X de 5" + progreso intra-bloque. BFI/TwIVI/PERMA: barra continua. Sin reordenar; sin tocar `getNextItemForSession`.
- **"Atrás":** navegación al ítem previo. `Hecho:` el servidor ya soporta re-responder (upsert idempotente + progreso por COUNT). Back = renderizar `seq-1` con su `raw_value` guardado precargado. Deshabilitado en el ítem 1. `Riesgo:` toca la resolución server-driven del ítem — es la pieza más delicada de 2.1 (ver Riesgos).
- **Móvil <480px:** la escala numérica de 11 puntos de **PERMA** (numeric-endpoints, horizontal hoy) → wrap/stack con targets ≥44px. BFI/ONET/TwIVI ya son vertical con 56px (no tocar).
- **Motion §2:** selección = outline terracota inmediato (<100ms, ya existe); reduced-motion respetado.
- **Verificar:** tsc + lint + unit (item-form-scales); captura 375 + 1440 (ONET con bloques, PERMA móvil); deploy-smoke: "Atrás" precarga respuesta; progreso visible.

### 2.2 — Hook + "Antes de comenzar" + NFR-27 en un contenedor
- **Nuevo componente de intro por test**, mostrado en `progress === 0` (entrada): hook §4.1 + "antes de comenzar" §4.2 en un solo contenedor. No se re-muestra en resume (solo progress===0).
- **NFR-27 (BFI/PERMA sensibles):** el bloque NFR-27 §4.2 va embebido en el mismo contenedor; "Entiendo y continúo" = acknowledge. Se **reusa la maquinaria** de `PretestDisclaimerGate` + `getContentionResources` (contenido NFR-27/28 intacto, solo el contenedor cambia). El gate sigue bloqueando el ítem 1.
- Copy → nuevo `lib/i18n/microcopy/es-CO/test-intro.ts` (hooks §4.1 + intros §4.2 por code).
- Cierra `[GAP-FREE-TEST-INTRO-COPY]`.
- **Verificar:** tsc + lint + unit; captura 375 + 1440 (intro BFI con NFR-27, intro ONET sin NFR-27); deploy-smoke: intro aparece 1 vez, no en resume; gate bloquea ítem 1.

---

## PR-C — Mini-resultado + transición (2.3, 2.4)

### 2.3 — Mini-resultado 3 partes con frases reveladoras §9
- **`lib/i18n/microcopy/es-CO/reveal-phrases.ts`** — 57 claves §9 (10 fragmentos BFI + 2 composición + 21 O*NET + 8 TwIVI + 8 PERMA + 8 líneas fijas §9.5) + labels es-CO de dimensión (columnas "etiqueta cotidiana", cierra `[GAP-DIMENSION-LABELS-ES-CO]`).
- **`lib/report/reveal-composer.ts`** — composer puro, 4 reglas §9: BFI (extremas por saliencia, 2→"y", 1→coda, 0→fallback); O*NET (gap top1/top2 → pico único vs par canónico); TwIVI (dominante vs par adyacente); PERMA (driver vs LOW_OVERALL/BALANCED). Consume `bands_by_dim`/`scores_by_dim` del `ReportPayload`.
- **TDD (rojo→verde):** ejemplo firmado "E baja + O alta → 'Recargas energía en lo tranquilo y te mueves por la curiosidad.'" + un caso por instrumento + LOW_OVERALL. Lint de frases prohibidas aplica (§9.6 nota 3).
- **Wire en `done/page.tsx`:** `result.revealPhrase` viene del composer — **supersede SOLO el hack narrative-first-paragraph** (assembler.ts:530 / done/page.tsx:202-209) para el mini-resultado; NO tocar la narrativa del reporte full.
- **Plantilla 3 partes en `TransitionScreen.result`:** Qué medimos (§9.5) / Qué dice (composer) / Por qué te importa (§9.5) + leyenda "La banda es tu rango probable, no un punto exacto." (§4.4). Barras reflejan respuestas reales (ya lo hacen; ahora con label es-CO + frase real).
- **PERMA LOW_OVERALL:** variante sensible + footer de contención (`ContentionBanner`, NFR-28). No iterar el texto sin la salvaguarda §9.4.
- **`.dm-paper`** en `done/page.tsx` + `TransitionScreen.tsx`.
- **Verificar:** tsc + lint + unit composer verde; captura 375 + 1440; deploy-smoke: mini-resultado con frase real por test, PERMA-bajo muestra contención.

### 2.4 — Transición recap+preview + intent recall
- **Hooks §4.1 por test** → `lib/i18n/microcopy/es-CO/transitions.ts` (reemplaza `MC_TRANSITION_HOOK_DEFAULT` placeholder). Cierra `[GAP-W6-HOOKS-1]`.
- **Recap §4.3** (3 instancias 1→2/2→3/3→4) + dots 1-4 (●○○○) + tiempo. El recap 1→2 reusa la frase BFI del composer (§9.6 nota 2, no duplicar).
- **Intent recall:** plumbing de `user_metadata.intent` → nuevo prop en `TransitionScreen` (hoy `intent` solo vive en `/onboarding/mapa`); línea §4.3 "Sigues buscando {intención en minúscula}. Vas por buen camino."
- **No re-show en resume:** ya cubierto por el resume-gate de page.tsx. `Anotado (fuera de alcance):` el hueco de re-visita de `/done` ya completado NO se arregla aquí (más allá del requisito literal).
- Limpieza: props muertos `completed`/`total` de TransitionScreen — mencionados, no borrados salvo que estorben (CLAUDE.md: nombrar dead code, no borrar).
- **Verificar:** tsc + lint + unit; captura 375 + 1440; deploy-smoke E2E funnel: 4 tests → mini-resultado → transición con recap/dots/hook/recall correctos.

---

## Verificación transversal (gate de cada item, HANDOFF §6/§7)

- **Responsive:** captura 375px + 1440px por pantalla nueva/rediseñada.
- **A11y AA (herramienta real, no a ojo):** pares terracotta/paper, ink/paper, ink-soft/paper; targets ≥44px; `prefers-reduced-motion`; toda data-viz con alternativa no-color + label legible por lector.
- **Cada commit:** `tsc --noEmit` 0 + lint 13/13 + unit afectados verdes antes del siguiente.
- **Anti-dark-patterns** (blueprint §14) como criterio de aceptación de toda conversión.

## Fuera de alcance (anotado, no se toca)

- OLA 3 (clímax/constelación/nocturno, cierre ADR-031); Paid/integrador/Ikigai/B2B.
- Reseed PROD de `narrative_template` (voseo→es-CO) — separado, gated por German. El composer §9 (TS) NO depende de él.
- Hueco de re-show de transición en re-visita de `/done` completado.
- Deuda E2E STALE (heredada de OLA 1) — se salda cuando `[GAP-CI-E2E-DB-SUPABASE-ROLES]` se arregle.

## Riesgos

- **2.1 "Atrás"** toca la resolución server-driven del ítem (page.tsx). Server ya soporta re-responder; el riesgo es el estado cliente (precargar `raw_value`, no romper el two-step anti-`[GAP-RESUME-BOUNCE]`). Pieza más delicada.
- **2.6 auth-sensible:** cambio limitado al bloque de redirect; pasos consent/DOB/scoring intactos.
- **2.3 composer:** depende de que el snapshot exponga `bands_by_dim` para los 4 instrumentos — verificar en PR-C antes de codear el wire (el mapa confirma `visualDimensions` con `band`; validar cobertura por instrumento).
- **Sin stack local:** loop/done/transición son auth-gated → verificación por deploy-smoke; solo `/magic-link/sent` captura local.

---

*Fin del PLAN Ola 2 v1.0. Se sincroniza con HANDOFF_UI v1.0 §3, BLUEPRINT v1.2, MICROCOPY v1.1. Actualizar si cambia la secuencia de PRs o el alcance.*
