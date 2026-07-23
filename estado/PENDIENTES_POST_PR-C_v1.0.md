# PENDIENTES — post OLA 2 PR-C (tracker de cierre)

**Fecha:** 2026-07-08 · **Autor:** Claude Code · **Owner:** German Velez Hurtado
**Para:** ventana de contexto NUEVA que cierra estos pendientes. El prompt de arranque está al final (§Prompt).
**Regla dura:** sin commit/push/deploy sin OK de German. `main` auto-deploya a Vercel Production. `estado/` es zona de German (no clobbear).

---

## RECONCILIACIÓN — 2026-07-23 (post smoke A1 + fix ValueCircle #17)

> Esta sección es el **estado vigente**. Los bloques A-E de abajo quedan como registro 2026-07-08.

`Hecho:` la corrida **A1 se ejecutó** en prod (2026-07-23; `estado/SMOKE_A1_RESULTADOS_v1.0.md` + vector reusable en `SMOKE_A1_vector_y_checklist_v1.0.md`) y **cerró en su núcleo** el deploy-smoke pendiente de PR-A/PR-B/PR-C **y** del overhaul de motion día/noche (#13/#16) — es la misma corrida, no pendientes separados. El **check crítico de inversión BFI NEG PASA** ("Sientes con intensidad…", NO "pulso estable"): no hay bug de inversión en el composer. Las 3 reglas dieron frases verbatim.

`Hecho:` A1 destapó **un bug real (P1): el ValueCircle** colapsaba los 10 valores Schwartz en 4 sectores. **Arreglado y en prod** — PR **#17** (`cf18343`), mergeado por German; gates verdes (typecheck + test:lint + test:unit **422** + build). Cierra `[GAP-HOV-LABELS-ES-CO]` y `[GAP-PERMA-DIM-LABELS-ES-CO]` con labels **firmados por Cowork** esta sesión.

### Delta por item

| Item | Antes (07-08) | Ahora (07-23) |
|---|---|---|
| **A1** smoke Free | P0 abierto | **CERRADO en núcleo.** NO "delivered" 100%: falta sub-checklist (reduced-motion, móvil 360/375, guardrail byte-safe "Mis datos", `/magic-link/sent`, bounds-check `?item=N` a media corrida, lector de pantalla real). Ver §"NO verificado" del smoke. |
| Smoke noche (#13/#16) | pendiente (STATUS 07-18) | **CERRADO en núcleo por A1** (misma corrida). Mismo residual. |
| **A2** `[GAP-PERMA-MINIRESULT-SURFACE]` | P1, decide German | **SIGUE ABIERTO**, decisión de German, ahora con evidencia del smoke. **Mantener SEPARADO** del nuevo P1 de seguridad (abajo). |
| **A3** afinar 4 umbrales | P2 tras smoke | **EN ESPERA.** Los 4 defaults se comportaron bien con el perfil A1, pero se diseñó con margen amplio → **no prueba los bordes.** No afinar sin un perfil de borde. |
| **C1** reseed `narrative_template` | P1 | **ALCANCE AMPLIADO** (detalle abajo): + seed `integrator-rule/teaser` (voseo) + regex de `waitlist.ts`. |
| **D1** `[GAP-TRANSITION-EST-TIME]` | P3, Cowork o CC | **YA TIENE FUENTE.** `/onboarding/mapa` muestra minutos por test (~4/~6/~3/~3). No necesita Cowork; es cablear la fuente existente. |
| **B2** cleanup ramas | P3 | Abierto + **añadir** `fix/valuecircle-hov-4-sectors` (mergeada #17) a las mergeadas por borrar. |

### Items NUEVOS (hallazgos A1)

- **P1 (seguridad) — la contención de PERMA nunca se surfacea en el flujo guiado.** El mecanismo NFR-28 funciona (banner prominente en `/reporte/{permaSessionId}`), pero el recorrido guiado no pasa por ahí: PERMA es el 4º (sin transición) → close = sesión de O*NET (no sensible) → `/perfil-integrado` (no menciona bienestar). Snapshot de prod: `severity:"moderate", showContention:true` y el usuario no ve nada. **Defecto con arreglo propio, SEPARADO de A2.** Hay que cerrarlo aunque A2 se difiera a OLA 3.
- **P1 (epic) — el visual de barras de PERMA necesita un pase.** Tres cosas juntas: (a) bug preexistente del `max` — el assembler nunca setea `max` → `BarsWithBands` cae a `DEFAULT_MAX=5` → las 5 barras de BFI (y las de PERMA) salen al 100%, la longitud no comunica; (b) acoplamiento invertBand-value — `flipBand` voltea la banda pero no el `value` (latente hasta que se arregle el `max`); (c) restructure de layout que propuso Cowork: separar "Bloques de bienestar" (P-E-R-M-A) de "Señales adicionales" (H/hap/N/Lon), `hap` como marcador atenuado (ítem único, confiabilidad baja), `Salud` marcada como autovaloración. Rigor + ética. **Secuenciar con OLA 3.**
- **P2 — el reporte llama "Intereses" a los 4 instrumentos.** PR #17 cerró los **códigos crudos de las barras** (NEG/Lon/hap → labels es-CO). **Queda abierto:** `/me/data` lista los 4 reportes como "Intereses", y el reporte de PERMA se titula "Tu perfil de intereses" con leyenda que dice "interés". Superficies distintas de los labels de barra.
- **P2 — el teaser de `/perfil-integrado` contradice los mini-resultados.** `db/seeds/integrator-rule/teaser/seed.sql` selecciona por **banda global por instrumento**, no por forma del perfil → "intereses equilibrados" a un perfil con pico I=50. **No es bug de código.** Evidencia directa para priorizar el reemplazo de OLA 3 (**D2**, 14 plantillas + 12 arquetipos ya firmados).

### C1 — alcance ampliado (detalle)
Además de `narrative_template` (RIASEC 132 + BFI, voseo → tuteo es-CO), el pase es-CO debe cubrir:
1. `db/seeds/integrator-rule/teaser/seed.sql` — voseo + sin acentos, se renderiza en prod ("hipotesis", "te sentis comodo", CTA "Avisame cuando este listo").
2. `lib/i18n/microcopy/es-CO/waitlist.ts:14` — "Avisame cuando este listo" sin acentos **a propósito**, para calzar con el regex de `tests/e2e/full-flow-onet.spec.ts:77`. El arreglo correcto es acentuar el copy **y** ajustar el regex del E2E, no al revés.

Sigue necesitando **OK de German** (muta datos vivos) + decidir si el pase incluye el seed del teaser en la misma pasada.

### Tabla owner × prioridad (vigente 07-23)

| Item | Prioridad | Owner | Bloquea |
|---|---|---|---|
| P1 seguridad — contención PERMA no surfaceada | **P1** | German (prioriza) + CC | señal de cuidado no llega en el Free |
| A2 superficie mini-resultado PERMA | P1 | German (decide) + CC | valor del 4º test en Free |
| Epic P1 — visual de barras PERMA (max + invertBand-value + layout Cowork) | P1 | German (decide) + CC | rigor/ética del reporte de bienestar (secuenciar OLA 3) |
| C1 reseed narrative_template + teaser + waitlist | P1 | CC + German (gate) | reporte/teaser en voseo (user-facing) |
| D2 seed cross-templates teaser | P1 (OLA 3) | CC (Cowork entregó) | teaser OLA 3 |
| P2 "Intereses" en /me/data + título PERMA | P2 | CC | claridad del reporte |
| P2 teaser por banda global (no forma) | P2 | reemplazo OLA 3 (D2) | primer espejo contradice |
| A3 afinar 4 umbrales | P2 (en espera) | CC (tras perfil de borde) | calidad de frases |
| C2 arreglar CI E2E gate | P2 | CC | CI atrapa regresiones |
| C3 reconciliar STATUS/docs | P2 | CC | **en curso (este doc)** |
| D1 tiempo estimado transición | P3 | CC (fuente ya existe) | pulido transición |
| B2 cleanup ramas (+ #17) | P3 | German/CC | higiene |

`Pendiente de CC con OK de German:` llevar los hallazgos nuevos a `BACKLOG.md` (zona de German) + un ADR en `DECISIONS_LOG` por las decisiones no triviales del fix (capar en `orderHovsOnBipolarAxes`, no-doble-flip N/Lon, HOV=verbos, invertBand en barras).

---

## 0. Dónde estamos (estado real, 2026-07-08)

`Hecho:` **OLA 2 completa a nivel de código y desplegada a prod.** PR-A (#10 correo/callback), PR-B (#11 runner rediseñado), **PR-C (#12 mini-resultado + transición + composer §9)** todas mergeadas a `main` y desplegadas. Vercel Production **READY** en `384b945` (deploy `dpl_X1Aw7y…`, rollback-candidate). El composer §9, el wire del mini-resultado y la transición 3-partes están vivos en prod.

`Inferencia:` lo que falta NO es construir la maquinaria (está hecha y verde: tsc 0, test:lint 13/13, test:unit 403/0, build OK), sino **verificar en vivo** (todo el Free es auth-gated, cero cobertura E2E local) + **cerrar gaps de superficie/contenido/higiene** que quedaron abiertos por diseño o heredados de olas previas.

**Rollback disponible** si el smoke sale mal: Vercel Instant Rollback al deploy anterior (Ola 2 PR-B, `01f417c`).

---

## BLOQUE A — Cerrar PR-C (lo más inmediato)

### A1 · Deploy-smoke del Free completo en prod `[P0 de cierre]` · Owner: German (o CC con navegador + tu magic-link)
Una sola corrida real del Free de 4 tests en prod **cubre el smoke pendiente de PR-A, PR-B y PR-C a la vez**. Email nuevo (evita estado residual). Checklist:

- **Transición entre tests (PR-C, lo nuevo):** cada transición muestra el mini-resultado 3 partes ("Qué medimos" / frase compuesta / "Por qué te importa") + visual compacto + leyenda de bandas, y debajo recap fijo §4.3 + dots ●○○○ + hook del siguiente test + recall de intención (si la declaraste en `/intencion`).
- **CRÍTICO — inversión BFI NEG:** con un perfil de NEG alto, la frase debe leer **"sientes con intensidad…"**, NUNCA "mantienes el pulso estable" (esa es la trampa que resolvimos; si sale al revés, hay bug de inversión).
- **Por instrumento:** BFI compone bien (ej. E-baja + O-alta → "Recargas energía en lo tranquilo y te mueves por la curiosidad."); O*NET da pico único o par; TwIVI da dominante o par adyacente; PERMA da driver o, si tu bienestar sale bajo, la variante LOW_OVERALL.
- **PR-B heredado:** freeze-wiring `/test/BFI-2-S?resumed=true&item=999` y `?item=abc` → sirve frontier, sin 500/freeze; "Atrás" precarga y vuelve al frontier; intro se muestra 1 sola vez (no en resume/back); NFR-27 bloquea el ítem 1 en BFI/PERMA; PERMA móvil ≥44px @360px; paper 375/1440.
- **PR-A heredado:** `/magic-link/sent` paper, reenvío sin contador visible; expirado con `[Reenviar enlace]`; email reusado con sesión incompleta → reanuda test pendiente, no 404.
- **Contención (NFR-28):** si algún test sensible cruza el umbral del servidor, el footer de contención aparece con las líneas CO.

`Cómo cerrar:` corrida limpia verde → PR-C/PR-B/PR-A quedan "delivered" (no solo "deployed"). Si algo falla → issue + fix + rollback si es rollback-crítico.

### A2 · `[GAP-PERMA-MINIRESULT-SURFACE]` — el mini-resultado de PERMA no tiene superficie `[P1]` · Owner: German (decisión) + CC (implementación)
`Hecho:` la transición (donde vive el mini-resultado del composer) solo existe entre tests 1-3 (hay "siguiente test"). **PERMA es el último** → cae al branch `allComplete` → close `?cierre=free`, que **no** muestra el mini-resultado del composer ni su contención LOW_OVERALL. El composer YA maneja PERMA correcto; falta **dónde mostrarlo**.
`Decisión abierta (German):` ¿un mini-resultado de PERMA en el close antes del teaser? ¿un bloque en el reporte de cierre? Ojo: el close (`?cierre=free`, recut O*NET) es zona "no-tocar" de PR-C — tocarlo es una decisión de producto (interactúa con ADR-031: cierre = nivel → teaser-constelación con ocupaciones). 
`Impacto:` sin esto, el 4º test (bienestar) no le devuelve valor glanceable al usuario en el Free — contradice parcialmente el objetivo "el Free devuelve valor". No es un bug; es un hueco de diseño de superficie.

### A3 · Afinar los 4 umbrales con datos reales `[P2]` · Owner: CC (valores) tras A1
`[GAP-ONET-PEAK-GAP-THRESHOLD]` (gap≥5) · `[GAP-TWIVI-ADJACENCY-THRESHOLD]` (<0.5) · `[GAP-PERMA-OVERALL-THRESHOLD]` (<5.0 Kern) · `[GAP-PERMA-BALANCED-THRESHOLD]` (spread<1.5). Viven en `lib/i18n/microcopy/es-CO/reveal-phrases.ts` (`family.thresholds`) → cambiar el valor NO toca el motor. Afinar si en el smoke las frases salen sistemáticamente pico-cuando-debería-par (o viceversa), etc. PERMA<5.0 está anclado a Kern (bien fundado), los otros 3 son juicio.

---

## BLOQUE B — Deuda OLA 2 (heredada, casi toda cubierta por A1)

### B1 · Smoke PR-A + PR-B → lo cubre A1 (corrida completa). No es trabajo aparte.
### B2 · Cleanup de ramas stale `[P3]` · Owner: German/CC
- Remotas mergeadas sin borrar: `origin/feat/ola-2b-runner` (PR #11), `origin/feat/twivi-items-anchors-es-co` (PR #7). Borrar.
- **Conservar** `origin/verify/phase-1-deploy-strict` (env Preview atada en Vercel — NO borrar).
- Locales mergeadas: `feat/phase-02.1-ux-remediation`, `feat/twivi-items-anchors-es-co`, `fix/free-transition-remove-report-link`. Borrar con `git branch -d`.
- `claude/recursing-varahamihira-edf075` (local, origen incierto — confirmar con German antes de borrar).

---

## BLOQUE C — Heredados de olas previas (siguen abiertos)

### C1 · Reseed PROD de `narrative_template` (voseo → es-CO) `[P1 — user-facing]` · Owner: CC + German (gate)
`Hecho:` Ola 0 pasó el microcopy `.ts` a tuteo es-CO (desplegado), PERO las **narrativas del reporte** vienen de la tabla `narrative_template` en la DB, y sus filas vivas siguen en **voseo** (RIASEC 132 + BFI). Hasta correr el reseed, el reporte full renderiza voseo en prod.
`Cómo cerrar:` reseed **DELETE-first idempotente** (`version 1.0` / `es-CO`, chequear FK con `item_response`), con **OK explícito de German** (muta prod). El seed committeado ya está en tuteo; es aplicar a prod.

### C2 · `[GAP-CI-E2E-DB-SUPABASE-ROLES]` — CI E2E gate roto `[P2]` · Owner: CC
El paso "Apply Supabase migrations (psql)" en CI falla por roles Supabase ausentes → seeds/unit/E2E se saltan → "Full suite" queda rojo-falso. typecheck+lint SÍ pasan. No bloquea merges (no es required check) PERO significa que **CI no atrapa regresiones** de comportamiento. Deuda E2E asociada: `pause-resume`, `full-flow-onet-anonymous`, `free-full-flow` codifican el funnel pre-ADR-029 → actualizar cuando se arregle el gate.

### C3 · Higiene de docs — STATUS desfasado + reconciliación `[P2]` · Owner: CC
El bloque STATUS de PR-C (commit `9e02210`, ya en `main`) dice "SIN commit/push/deploy" y "PRÓXIMA ACCIÓN: OK de German → commit" — quedó **desfasado** vs la realidad (PR #12 mergeado + Prod READY). Es la divergencia docs-vs-código recurrente. Reconciliar: bloque STATUS que refleje merged+deployed + (si aplica) CHANGELOG de cierre OLA 2 + plegar/archivar el `HANDOFF_PR-C_...` y este tracker.

---

## BLOQUE D — Cowork (contenido / research)

### D1 · `[GAP-TRANSITION-EST-TIME]` — tiempo estimado por test `[P3]` · Owner: Cowork (firma) o CC (heurística)
El §4.3 menciona "tiempo estimado" en la transición; no hay minutos firmados por test. Opciones: (a) Cowork firma minutos por test; (b) CC deriva de `item_count` (BFI 30 / O*NET 60 / TwIVI 20 / PERMA 23) con heurística documentada. No bloquea (la transición ya orienta con recap+dots+hook).

### D2 · `[GAP-TEASER-CROSS-TEMPLATES-ES-CO]` — cruces del perfil integrado (teaser) `[P1 para OLA 3]` · Owner: Cowork (ENTREGADO+firmado) → CC (seed)
Cowork YA entregó y German firmó las 14 plantillas de cruce inter-instrumento + 12 arquetipos (MICROCOPY §5). Falta que **CC las siembre** cuando se construya el teaser/perfil integrado (OLA 3). No es de PR-C, pero es el siguiente contenido grande que se activa.

### D3 · Otros gaps de contenido vivos (no bloquean OLA 2, contexto)
`[GAP-TWIVI-GENDER-SCHEMA]` (P2, diferido — branching él/ella, la app no captura género); reseed C1 arriba. Ver BACKLOG para la lista completa.

---

## BLOQUE E — Próximo hito (contexto, NO se cierra en esta ventana)

**OLA 3 — el clímax / teaser del perfil integrado + cierre.** Es el siguiente gran frente UX (HANDOFF_UI §3, ADR-031: cierre = nivel obligatorio → teaser-constelación con ocupaciones dentro). Depende de D2 (cross-templates, ya firmados) + posiblemente resuelve A2 (superficie de PERMA podría vivir aquí). No arrancar hasta cerrar el smoke de OLA 2.

---

## Resumen owner × prioridad

| Item | Prioridad | Owner | Bloquea |
|---|---|---|---|
| A1 Deploy-smoke Free completo | P0 cierre | German / CC+navegador | "delivered" de OLA 2 |
| A2 Superficie mini-resultado PERMA | P1 | German (decide) + CC | valor del 4º test en Free |
| C1 Reseed narrative_template | P1 | CC + German (gate) | reporte full en tuteo (user-facing) |
| D2 Seed cross-templates teaser | P1 (OLA 3) | CC (Cowork entregó) | teaser OLA 3 |
| A3 Afinar 4 umbrales | P2 | CC (tras smoke) | calidad de frases |
| C2 Arreglar CI E2E gate | P2 | CC | CI atrapa regresiones |
| C3 Reconciliar STATUS/docs | P2 | CC | higiene |
| B2 Cleanup ramas | P3 | German/CC | higiene |
| D1 Tiempo estimado transición | P3 | Cowork o CC | pulido transición |

---

## Referencias
- `estado/STATUS.md` (bloque 2026-07-08 PR-C) · `estado/BACKLOG.md` (flags nuevos en P2) · `estado/HANDOFF_PR-C_GATE_y_diseno_composer_v1.0.md`.
- `estado/PLAN_Ola2_El_Free_Devuelve_Valor_v1.0.md` · `auditoria-ux-ui/HANDOFF_UI_v1.0.md` §3 · `auditoria-ux-ui/MICROCOPY_ES-CO_SIGNOFF_v1.0.md` §4/§5/§9.
- Código PR-C: `lib/report/reveal-composer.ts` (+ `.test.ts`), `lib/i18n/microcopy/es-CO/reveal-phrases.ts`, `app/(b2c)/test/[code]/done/page.tsx`, `app/(b2c)/test/[code]/_components/TransitionScreen.tsx`, `lib/i18n/microcopy/es-CO/transitions.ts`.

---

## Prompt para la ventana nueva

> Copiar/pegar como primer mensaje de la ventana nueva:

```
Cierre de pendientes post OLA 2 PR-C. Sigue el protocolo de inicio (Tier 1: _MANIFEST, README, PRD_MAESTRO, ROADMAP, estado/STATUS.md, estado/BACKLOG.md) y LEE estado/PENDIENTES_POST_PR-C_v1.0.md — es el tracker de todo lo pendiente (no re-derivar; ya está priorizado por bloques A-E con owner). Contexto: OLA 2 (PR-A/B/C) está mergeada a main y desplegada a prod (Vercel READY en 384b945); lo que falta es verificación en vivo + cerrar gaps de superficie/contenido/higiene.

Empecemos por el BLOQUE A. Antes de tocar nada, dime tu plan para A1 (deploy-smoke del Free completo en prod) y A2 (decidir la superficie del mini-resultado de PERMA, [GAP-PERMA-MINIRESULT-SURFACE]) — para A2 usa AskUserQuestion con opciones concretas porque es decisión de producto e interactúa con el cierre ADR-031 (zona no-tocar de PR-C). Para A1, propón: ¿lo corres tú con el navegador (Claude in Chrome) en prod y yo te paso el magic-link, o lo corro yo y me das el checklist? El checklist crítico ya está en el doc (ojo la inversión BFI NEG: debe leer "intensidad", no "pulso estable").

Reglas: sin commit/push/deploy sin mi OK; main auto-deploya a prod; estado/ es mi zona (no clobbear). Si algo del tracker ya no aplica o encuentras que está desactualizado contra el código/prod, dilo antes de ejecutar.
```

---
*Fin del tracker de pendientes post PR-C v1.0. Actualizar/archivar a medida que se cierren los bloques.*
