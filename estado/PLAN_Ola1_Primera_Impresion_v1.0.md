# PLAN — Ola 1 "Primera impresión" (HANDOFF_UI §3)

**Fecha:** 2026-07-07 · **Autor:** Claude Code · **Rama:** `feat/ola-1-primera-impresion` (off `main`)
**Semilla:** `auditoria-ux-ui/HANDOFF_UI_v1.0.md §3 (Ola 1)` + BLUEPRINT v1.2 + prototipo `prototipo-rediseno-free-v2.html` + `MICROCOPY_ES-CO_SIGNOFF_v1.1 §2`.
**Regla:** sin commit/push/deploy sin OK de German. Verificación sin stack local → `tsc` + lint + unit + build; comportamiento por deploy-smoke (patrón 2.1).

---

## Decisión de arquitectura (aprobada por German, AskUserQuestion 2026-07-07)

**Tokens 1.1 = night-default `@theme` + wrapper `.dm-paper` scoped.**
- Se define TODA la capa `--dm-*` (paper + night) global en `@theme` (ADR-021: prefijo propio `--dm-*`, cero `--spacing-*`/`--container-*`).
- `.dm-paper` re-declara los tokens semánticos (`--color-*`) hacia los valores paper + override `--font-display` → Fraunces + background paper opaco (tapa el gradiente nocturno del `body`).
- Se aplica `.dm-paper` SOLO a las pantallas de Ola 1 (landing, `/intencion`, signup, `/consent`, `/onboarding/mapa`). **Los 36 archivos oscuros: 0 cambios.**
- Ola 2/3 voltean el default a paper y quitan wrappers cuando esas pantallas se rediseñan. Cambio nombrado en el PR.

## Cicatrices y no-tocar respetados
- ADR-021: solo `--dm-*`; nada en `--spacing-*`/`--container-*`.
- HANDOFF §9: arquitectura data-driven, NFR-27/28 (contenido intacto, solo contenedor), honestidad (sin match %/determinismo), `scoreCompletedSessionIfNeeded`, `me/data` byte-safe, anti-dark-patterns.
- Consent: captura sigue en signup (ADR-029/Ley 1581); solo reskin del contenedor; texto legal `lib/consent/text/` intacto.
- Fuentes: se AÑADE Fraunces; Instrument Serif se conserva (display nocturno del clímax, Ola 3). Hanken (body) intacto.
- Pin E2E: `MC_LANDING_CTA_PRIMARY = "Empezar gratis"` (el `→` es `<span aria-hidden>`).

---

## Sub-items (commits atómicos, en orden)

### 1.1 — Tokens + fuentes + motion base
- `app/layout.tsx`: añadir `Fraunces` (next/font, variable `--font-display-fraunces`, opsz auto, ital). Mantener Instrument Serif + Hanken.
- `app/globals.css`: añadir bloque `--dm-*` en `@theme` + regla `.dm-paper { … }` (re-declara semánticos + font-display Fraunces + background paper) + tokens/keyframes de motion §2 que falten (`--dm-ease`, reveal de título). Reduced-motion ya cubierto.
- **Verificar:** `tsc --noEmit` 0; `next build` verde; lint 13/13; grep confirma cero tokens en `--spacing-*`/`--container-*`.

### 1.2 — Landing rediseñada (hero asimétrico)
- `app/(public)/page.tsx`: `main.dm-paper`; hero grid `1.05fr/.95fr` (texto izq, hex-constelación der), eyebrow "Autoconocimiento con rigor", H1 Fraunces con `<em>` terracotta "sin etiquetas.", lead §2, CTA "Empezar gratis" → **`/intencion`** (cambia de `/signup`), chip honestidad sage, footer §2. Copy → `lib/i18n/microcopy/es-CO/landing.ts` (claves §2). Hex viz reusa patrón actual con paleta paper (sage/line).
- Responsive §6: hero apila <760px, H1 ≥36px, viz oculta en móvil.
- **Verificar:** typecheck; captura 375 + 1440; hook entendible <5s.

### 1.3 — Taste de intención (ruta nueva, sin datos)
- Nueva `app/(public)/intencion/page.tsx` (`.dm-paper`): notag "Sin cuenta y sin guardar datos todavía", H2 "¿Qué quieres entender de ti?", 3 cards (general / carrera / bienestar) §2, CTA "Continuar →" → `/signup?intent=<slug>`.
- Sin persistencia server: la elección viaja como query param. Client component para selección; el CTA arrastra `?intent=`.
- Copy → nuevo `lib/i18n/microcopy/es-CO/intencion.ts`.
- **Verificar:** typecheck; no hay fetch/DB; 375 + 1440.

### 1.4 — Registro magic link (reskin)
- `app/(auth)/signup/page.tsx` + `SignupForm.tsx`: `.dm-paper`; eyebrow "Un solo paso", H1 "Crea tu cuenta sin contraseñas", cuerpo/label/CTA/micro §2. Botón deshabilitado hasta email válido + 18+. Leer `?intent=` y pasarlo al `signupAction` (→ `user_metadata.intent`).
- El teaser de hexágono/`report-ready` del signup actual (herencia flujo anónimo) se retira o degrada bajo ADR-029 (signup-first, sin sesión previa). Confirmar mínima superficie.
- Copy → `lib/i18n/microcopy/es-CO/signup.ts` (+ claves §2).
- **Verificar:** typecheck; 375 + 1440; `signupAction` persiste `intent` en metadata.

### 1.5 — Consent "aceptar y listo" (solo contenedor)
- Reskin del bloque de consentimiento DENTRO de `SignupForm.tsx` (promise list + consent-box estética prototipo) — checkboxes/captura/labels legales intactos.
- Reskin del contenedor de `app/(public)/consent/page.tsx` a `.dm-paper` (el markdown legal `lib/consent/text/` intacto).
- **Verificar:** texto legal byte-idéntico; captura sigue en signup; 375 + 1440.

### 1.6 — Mapa 4 paradas + intent recall
- Nueva `app/(b2c)/onboarding/mapa/page.tsx` (`.dm-paper`, autenticada): recall "Para lo que buscas — {intención} — empezamos por aquí." (lee `user_metadata.intent`), H1 §2, 4 stops con lead-stop resaltado + tiempos, CTA "Empezar por personalidad →" → primer test (`resolveNextFreeTest`/`loadFreeOrderedCodes`).
- `app/auth/callback/route.ts`: cambiar el redirect final post-consent de "primer test" a `/onboarding/mapa` (respetando `next` explícito + safeNextPath).
- Copy → `lib/i18n/microcopy/es-CO/mapa.ts`.
- **Verificar:** typecheck; callback redirige a mapa; mapa enruta al primer test; recall refleja intent; 375 + 1440.

---

## Verificación transversal (gate de cada item, HANDOFF §6/§7)
- Responsive: captura 375px + 1440px por pantalla nueva/rediseñada.
- A11y AA: pares terracotta/paper, ink/paper auditados con herramienta; targets ≥44px; `prefers-reduced-motion`; data-viz con alternativa.
- Cada item: `tsc --noEmit` 0 + lint 13/13 + unit afectados verdes antes de pasar al siguiente.

## Fuera de alcance (anotado, no se toca)
- Olas 2 (loop/transición/correo/mini-resultado) y 3 (clímax/constelación). Nocturno-default se voltea allí.
- `[GAP-CI-E2E-DB-SUPABASE-ROLES]` (CI E2E roto) sigue abierto → la suite E2E no corre localmente ni en CI.

### E2E que quedan STALE (deuda a saldar cuando `[GAP-CI-E2E-DB-SUPABASE-ROLES]` se arregle)
Actualizado en lockstep: `tests/e2e/signup-consent.spec.ts` (nuevo contrato: sin hexágono/top3, CTA "Enviarme el enlace"). **Siguen codificando el funnel pre-ADR-029 + contrato viejo y deben actualizarse** (no re-escritos aquí — Wave D, y no puedo correr E2E sin stack):
- `tests/e2e/pause-resume.spec.ts` — click "Empezar gratis" → espera `/test/onet-ip-sf`; ahora landing→`/intencion`. Además `/onboarding/before-you-start` (flujo anónimo muerto).
- `tests/e2e/full-flow-onet-anonymous.spec.ts` — flujo anónimo `landing → before-you-start → onet`; superseded por ADR-029.
- `tests/e2e/free-full-flow.spec.ts` — `goto("/signup?top3=R,I,A")` (top3 removido) + rutas anónimas.
`Nota:` estas aserciones YA eran inconsistentes antes de esta ola (el CTA del landing era `/signup`, no `/test/onet-ip-sf`); mi cambio no las rompe "nuevas", pero la deuda es real y se documenta aquí en vez de silenciarla.

## Verificación pendiente (deploy-smoke — sin stack local, patrón 2.1)
La única pantalla no capturada localmente es **el mapa (1.6), auth-gated**. Contrato de comportamiento a smokear en deploy:
1. **Signup fresco** (email nuevo) → magic link → callback → **aterriza en `/onboarding/mapa`** (no directo al test) con la **frase de recall correcta** según la intención elegida en `/intencion` (p.ej. "Para lo que buscas — claridad para decidir tu rumbo — empezamos por aquí.").
2. CTA "Empezar por personalidad →" → **`/test/BFI-2-S`** (primer pendiente, data-driven).
3. **Usuario que regresa a mitad de camino** (≥1 test completo) → **NO ve el mapa**, va directo a su siguiente test pendiente.
4. Reenvío del magic link (`/magic-link/sent`) **preserva la intención** (resend omite `options.data` → metadata intacta → recall se mantiene). Verificado por lectura de código; confirmar en smoke.
Middleware: verificado que `middleware.ts` NO intercepta `/onboarding/mapa` (solo mint de cookie anónima en `/test/*` + header geo); el guard de auth vive en la página.

## Riesgos
- Reroute del funnel toca `callback` (auth-sensible): cambio limitado al destino del redirect final (fresh → mapa; returning → next test).
- Sin stack local → comportamiento por deploy-smoke; capturas visuales vía dev server/Playwright en las 5 pantallas sin DB (landing, intención, signup, consent). Mapa = deploy-smoke.
