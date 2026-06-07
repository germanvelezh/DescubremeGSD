# DECISIONS_LOG — DescubreMe

**Owner:** German Velez Hurtado.
**Formato:** ADR (Architecture/Architecture Decision Record): contexto + opciones + decision + consecuencias + reversibilidad + referencia.
**Convencion:** un ADR por decision no trivial. Ordenadas cronologicamente. Owner del ADR entre parentesis al final del titulo.

> Este archivo es la fuente de verdad durable de decisiones del proyecto. Los `.planning/*` son scratchpad GSD; cualquier decision relevante migra aqui al cierre de sesion (CLAUDE.md §4). Para decisiones de producto/research, formato ADR. Para tecnicas, formato ADR. Comerciales y legales tambien.

---

## ADR-001 — GSD como sistema de desarrollo (2026-06-05) (German + Claude Code)

**Contexto:** Se requiere un sistema spec-driven que mantenga trazabilidad entre PRD/REQUIREMENTS/PHASES/PLANS y la implementacion, con artefactos versionables y subagentes especializados (researcher, roadmapper, verifier). El proyecto ya tenia `_MANIFEST.md`, `PRD_MAESTRO.md`, `ROADMAP.md` v2.0 y la capa `estado/*` como memoria viva.

**Opciones:**
1. **No usar sistema de desarrollo formal** — mantener PRD + ROADMAP + STATUS y dejar que Claude Code planee ad-hoc por sesion.
2. **Adoptar GSD (`@opengsd/gsd-core`, fork mantenido tras incidente de gobernanza)** — agrega ciclo formal `new-project → discuss-phase → plan-phase → execute-phase → verify-work → ship`.
3. **Construir sistema interno** — alto costo, sin beneficio claro vs. GSD.

**Decision:** Opcion 2 (GSD). Se siembra con `PRD_MAESTRO.md` como input unico y el `ROADMAP.md` v2.0 como ancla de fases.

**Consecuencias:**
- Agrega capa `.planning/*` como scratchpad de ejecucion (gitignored por diseno preexistente del repo).
- Introduce dependencia operativa de subagentes GSD (researcher, synthesizer, roadmapper, planner, verifier) en `.claude/agents/`.
- Mantiene fuente de verdad de producto en el repo (`PRD/ROADMAP/estado/`) — `.planning/*` no la sustituye, solo la operacionaliza.
- Cada cierre de sesion debe sincronizar decisiones desde `.planning/STATE.md` hacia `estado/STATUS.md` + `estado/DECISIONS_LOG.md` para no perder contexto entre sesiones.

**Reversibilidad:** Alta. `.planning/*` puede eliminarse y volver al flujo ad-hoc sin perder PRD/ROADMAP/estado/.

**Referencia:** `_MANIFEST.md` §5, `CLAUDE.md §5`, `.planning/PROJECT.md` Key Decisions.

---

## ADR-002 — Config GSD: mode=yolo, granularity=standard, model_profile=quality (2026-06-05) (German)

**Contexto:** Al inicializar GSD, hay 4 ejes de configuracion no triviales: modo de ejecucion (yolo vs interactive), granularidad de planes por fase (coarse/standard/fine), perfil de modelos (balanced/quality/budget/inherit) y workflow agents opcionales (research, plan_check, verifier, drift_guard).

**Opciones evaluadas:** Defaults workflow GSD recomienda balanced + standard + yolo + todos los agentes ON.

**Decision:**
- `mode=yolo` — auto-aprueba gates para no fragmentar sesiones largas.
- `granularity=standard` — 5-8 planes por fase, encaja con las 7 fases ya mapeadas.
- `model_profile=quality` — Opus para researcher (effort high) y roadmapper (effort xhigh); Sonnet para synthesizer (effort low). Justificado por complejidad psicometrica + Ley 1581 + multi-tenant.
- `workflow.research=true`, `plan_check=true`, `verifier=true`, `plan_review.source_grounding=true` (drift guard) — todos ON.
- `parallelization=true` — planes independientes corren simultaneos.

**Consecuencias:**
- Mayor costo de tokens vs. balanced; justificado por la complejidad del dominio (compliance no negociable + multi-tenant + integrador cross-instrumento + ethics framework).
- Auto-aprobacion implica menos checkpoints interactivos; mitigado por verifier + plan_check + drift_guard activos.
- Si en alguna fase el costo escala mal, `/gsd-settings` permite cambiar profile sin re-init.

**Reversibilidad:** Alta. Cambios via `/gsd-settings` o editar `.planning/config.json` directo.

**Referencia:** `.planning/config.json`.

---

## ADR-003 — commit_docs=false: `.planning/*` queda gitignored (2026-06-05) (Claude Code)

**Contexto:** El workflow GSD por default recomienda `commit_docs=true` (versionar `.planning/*` en git). El repo DescubreMe tiene `.gitignore` con `.planning/` explicitamente excluido (comentario: "GSD scratchpad (si llega a aparecer)"), consistente con `_MANIFEST.md` §6 y `CLAUDE.md §5`: la fuente de verdad de producto/decisiones es `PRD/ROADMAP/estado/`; `.planning/` es scratchpad.

**Opciones:**
1. **Honrar el `.gitignore` existente:** `commit_docs=false`. Migrar decisiones/estado a `estado/*` al cierre de cada sesion.
2. **Sobreescribir el `.gitignore`:** habilitar versionado de `.planning/*`, lo cual contradice el diseno explicito del repo y duplica la fuente de verdad.

**Decision:** Opcion 1. `commit_docs=false`. Mantiene la separacion arquitectonica: `.planning/` = scratchpad GSD; `estado/` = memoria durable versionada.

**Consecuencias:**
- Toda decision/cambio de estado relevante DEBE migrar manualmente a `estado/*` al cierre de sesion (protocolo CLAUDE.md §4).
- `.planning/*` puede borrarse y regenerarse sin perder informacion critica (esta en `estado/` + el PRD/ROADMAP).
- Workflows GSD que asumen commit pueden fallar silenciosamente (el commit query retorna `skipped_gitignored`); el gsd-tools lo maneja sin errores.

**Reversibilidad:** Alta. Cambiar a `commit_docs=true` + remover `.planning/` del `.gitignore` cuando se quiera.

**Referencia:** `.gitignore`, `_MANIFEST.md` §6, `CLAUDE.md §5`, `.planning/config.json`.

---

## ADR-004 — Arquitectura locked en 7 decisiones D1-D7 (2026-06-05) (Claude Code + research Opus)

**Contexto:** El research dimension Architecture (subagente Opus, 759 lineas) produjo 7 decisiones arquitectonicas alineadas al stack Next.js + Supabase + TypeScript + al modelo conceptual `arquitectura/MODELO_DATOS_CONCEPTUAL.md`. Estas decisiones definen los service boundaries y patterns sin los cuales el principio "instrumento como plugin" se erosionaria.

**Decisiones (resumidas):**
- **D1 Scoring:** TypeScript interpreter en route handler/server action (NO Postgres functions, NO Edge Functions en hot path).
- **D2 Integrator:** declarative rule engine con tabla `integrator_rule` + flag `exploratory: boolean` + `provenance_template` (NO LLM, NO scripted if/else).
- **D3 Reports:** Server Components HTML-first; PDF on-demand async con `@react-pdf/renderer` v4 en Node runtime.
- **D4 PII encryption:** Supabase disk encryption + pgcrypto SOLO para `free_text_reflection` + Vault para llaves (NO pgsodium — deprecated, NO TCE — alta complejidad operacional).
- **D5 Multi-tenant:** tablas compartidas + `organization_id` nullable + JWT custom claims via `custom_access_token_hook`.
- **D6 B2B aggregation:** nightly precomputed via Edge Function `aggregate-tenant`; dashboard solo lee `aggregate_view`; n>=5 enforced en RLS Y service layer.
- **D7 Plugin enforcement:** CI lint `no-hardcoded-instruments.test.ts` + `plugin-swap.test.ts` desde Phase 1. Sin esto, "plugin" es slogan.

**Consecuencias:**
- Cualquier desviacion de D1-D7 en planes posteriores requiere ADR nuevo justificandolo.
- D4 contradice parcialmente lo que pudiera haber asumido `arquitectura/MODELO_DATOS_CONCEPTUAL.md` sobre pgcrypto/pgsodium — el conceptual data model es valido a nivel de schema; D4 es la implementacion correcta a 2026.
- D7 obliga a fase 1 a entregar dos tests CI antes del primer instrumento usable — no es opcional.

**Reversibilidad:** Media. D2 (integrator pattern) es la mas costosa de revertir si el rule engine no escala; el resto son cambios localizados.

**Referencia:** `.planning/research/ARCHITECTURE.md` §2 (decisiones D1-D7), `.planning/research/STACK.md` §3-§4 (versiones especificas), `.planning/research/SUMMARY.md` (Locked Engineering Decisions).

---

## ADR-006 — KMS provider: AWS KMS (override de ARCHITECTURE.md D4 Supabase Vault) (2026-06-05) (German + Claude Code)

**Contexto:** Durante `/gsd-discuss-phase 1`, Area 4 KMS provider, se identifico una incoherencia interna del research: `STACK.md` y `SUMMARY.md` recomiendan KMS externo ("AES-256-GCM app-side + KMS externo para PII") para defensa en profundidad; `ARCHITECTURE.md` D4 elige Supabase Vault por simplicidad operacional. La discusion forzo decidir cual prevalece.

**Opciones:**
1. **AWS KMS** — industria standard, blast-radius independiente del DB provider, ~$1/mo + $0.03/10k ops. Requiere cuenta AWS + IAM policy + Vercel-AWS OIDC trust. Si Supabase es compromised, las llaves siguen seguras en AWS.
2. **Supabase Vault** — envelope encryption nativa, mismo billing, integracion simple. Si Supabase es compromised, llaves estan en el mismo blast-radius.
3. **Doppler / Infisical** — DevOps-friendly, dashboard, audit log nativo. Subscription mensual (~$5-15/mo MVP). Curva moderada.
4. **Decision diferida (env var)** — fase 1 con env var + TODO. Violaria pitfall 1.3 ("keys nunca en env vars").

**Decision:** Opcion 1 (AWS KMS). Resuelve incoherencia a favor de defensa en profundidad. Costo neutral para MVP. Es estandar enterprise compatible con auditoria Ley 1581 + CCM Phase 7.

**Detalle de implementacion (CONTEXT.md D4.1-4.4):**
- Cuenta AWS dedicada para el proyecto (no mixta con personal).
- IAM role `descubreme-prod-encrypt` con policy minima: `kms:Encrypt`, `kms:Decrypt`, `kms:GenerateDataKey`.
- Vercel-AWS OIDC trust (preferido sobre static AWS keys en env vars).
- KEK alias: `alias/descubreme-prod-pii-kek-v1`.
- Annual auto-rotation del KEK + manual emergency rotation procedure documentada.
- Pattern envelope encryption: per-record DEK generada via `kms:GenerateDataKey` + AES-256-GCM en Node.
- Dev local: mock crypto `lib/crypto/pii.local.ts` con `DEV_PII_SECRET` env var (32 bytes random). Tests pasan sin AWS calls.

**Consecuencias:**
- Requiere setup AWS dedicado antes de `lib/crypto/pii.ts` (Phase 1 hard gate nuevo: `[GAP-AWS-KMS-SETUP]`).
- `arquitectura/ARCHITECTURE.md` D4 debe actualizarse en Phase 1 para reflejar AWS KMS en vez de Supabase Vault — esto NO es deuda de research, es resolucion de la incoherencia mediante decision del owner.
- Cuando se firmen CCMs en Phase 7, AWS estara en la lista de subprocesadores (KMS aunque solo guarda llaves wrapping, no payloads PII).
- Dev/staging usan mock crypto local — tests E2E NO ejercitan AWS KMS real; eso queda para test de integracion manual previo a deploy.

**Reversibilidad:** Media. Cambiar a Supabase Vault implica:
1. Setup Vault.
2. Decrypt todos los registros con KMS y re-encrypt con Vault (batch job).
3. Update `lib/crypto/pii.ts` para apuntar a Vault.
4. Documentar el cambio en CONTEXT.md de fase relevante.

**Referencia:** `.planning/phases/01-fundacion-o-net-ip-sf-skeleton-e2e-magia/01-CONTEXT.md` §D4, `.planning/research/STACK.md` §4.4 + §3, `.planning/research/SUMMARY.md` (locked decisions, AES-256-GCM line), `.planning/research/ARCHITECTURE.md` D4 (override aqui), `01-DISCUSSION-LOG.md` Area 4.

---

## ADR-007 — Phase 1 onboarding: test-first, signup+consent al final (2026-06-05) (German)

**Contexto:** FOUND-09 permite tomar test sin haberse registrado; FOUND-08 obliga reclamar sesion anonima al signup. La decision UX critica de fase 1 era cuando se piden auth + consent doble checkbox: antes del test (compliance-first), durante, o al ver el resultado (engagement-first). El instrumento de fase 1 (O*NET IP-SF) no es `sensitivity=high`, asi que tecnicamente permite onboarding diferido.

**Opciones:**
1. **Test primero, signup+consent al ver resultado** — landing CTA "Empezar gratis" → sesion anonima (cookie + DB row con `user_id=null`) → 60 items → pantalla "Tu reporte esta listo" con teaser visual + signup form + dos checkboxes consent. Engagement maximo; reclama sesion al firmar.
2. **Consent + magic link primero** — checkboxes + email antes del test. Compliance-first; mas friccion upfront.
3. **Hibrido** — consent general + email antes; sensitive_data al ver resultado.
4. **Test demo + signup + test completo** — 2-3 items demo, luego signup, luego test completo.

**Decision:** Opcion 1 (test-first). Aprovecha que O*NET IP-SF no es sensitive=high y maximiza engagement antes del momento de friccion. La sesion anonima dura 7 dias (cookie persistente + cleanup nightly via pg_cron). Al signup, `UPDATE assessment_session SET user_id = $new WHERE anonymous_session_id = $cookie` + igual para `item_response` (FOUND-08).

**Consecuencias:**
- Implementacion requiere sesion anonima persistente con cookie `anonymous_session_id` (nanoid 30 chars) + `assessment_session.expires_at = now() + 7d`.
- Cleanup job nightly para `item_response` huerfanos (cookie expirado).
- En Phase 2 cuando entren BFI-2-S (sensitivity=high) y PERMA (emotional_distress), el patron cambia — esos instrumentos NO se pueden tomar sin `consent_sensitive`. Esto se documenta en Phase 2 context.
- Pantalla "Tu reporte esta listo" muestra teaser visual: hexagono parcial + top-3 letras grandes + 1 frase generica, ANTES del signup. Compromise transparente.
- Survey feedback + waitlist Paid en post-reporte (REQ nuevo propuesto FREE-X). Share visual queda en deferred V2-SOCIAL-01.

**Reversibilidad:** Alta. Cambiar a Opcion 2 (compliance-first) requiere reorganizar el flow de pantallas y borrar la logica de sesion anonima. Cero perdida de datos.

**Referencia:** `.planning/phases/01-fundacion-o-net-ip-sf-skeleton-e2e-magia/01-CONTEXT.md` D2.1-D2.8, FOUND-08, FOUND-09, COMPL-03, `01-DISCUSSION-LOG.md` Area 2.

---

## ADR-005 — No sobreescribir el CLAUDE.md del proyecto (2026-06-05) (Claude Code)

**Contexto:** El workflow GSD `new-project` paso 8 ejecuta `gsd-tools generate-claude-md` para escribir un `CLAUDE.md` con guidance default de workflow GSD. El proyecto DescubreMe YA tiene un `CLAUDE.md` v2.0 extenso (15 secciones operativas: protocolo de inicio/cierre, integracion GSD, division Cowork/Claude Code, roles, etica no-negociable, output rules, citas, research existente, seleccion instrumentos, idioma, safety).

**Opciones:**
1. **Ejecutar `generate-claude-md`** — sobreescribe el CLAUDE.md curado del owner con guidance default GSD. Perdida masiva de contexto operativo.
2. **Saltar este paso del workflow** — preservar el CLAUDE.md v2.0 existente. El init GSD se completa sin tocar el archivo.

**Decision:** Opcion 2. Saltar `generate-claude-md`. El CLAUDE.md v2.0 del proyecto es la fuente de verdad operativa y no se sobreescribe.

**Consecuencias:**
- Algunos comportamientos de workflow GSD que asumen su CLAUDE.md default pueden requerir contexto manual (poco probable; el CLAUDE.md v2.0 ya cubre GSD en §5).
- Si en el futuro se quiere reconciliar, hacer un merge manual: tomar las secciones utiles del template GSD e integrarlas como apendice del CLAUDE.md v2.0.

**Reversibilidad:** Alta. Ejecutar `gsd-tools generate-claude-md --output CLAUDE.md.gsd-template` para ver que produciria, sin sobreescribir.

**Referencia:** `CLAUDE.md` v2.0 §5 (integracion GSD), `.claude/gsd-core/workflows/new-project.md` Step 8 (paso saltado).

---

## ADR-008 — Tailwind v4 + @theme block como sistema de tokens (2026-06-06) (Claude Code, Wave 0 Plan 01-02 Task 2)

**Contexto:** UX-06 y CLAUDE.md §1 lockean `ui-ux-pro-max-skill` como sistema de diseno. `.planning/research/SUMMARY.md` Hard Gate 3 marca la compatibilidad con Tailwind v4 como `[ASSUMED]`. UI-SPEC §11 documenta el smoke test obligatorio para lockear v4 vs v3 antes de cualquier trabajo UI: si v4 no compila el `@theme` block del §11.1, o si las utility classes no resuelven los tokens, hay que downgrade a v3 con `tailwind.config.js` clasico.

`Restriccion operacional:` `ui-ux-pro-max-skill` se invoca en la sesion Claude Code del usuario, no desde este sub-agente executor. El smoke test se realizo con **primitivos hand-coded** (Button, Checkbox, RadioGroup, Disclosure) en `app/(public)/page.tsx` que ejercitan la superficie de tokens. La evaluacion del output del skill queda para una wave UI posterior; si en ese momento el skill asume `tailwind.config.js`, se aplicara la rama "downgrade" documentada abajo.

**Opciones:**
1. **Tailwind v4.3 + `@theme` block CSS-first + `@tailwindcss/postcss` 4.3.** Tokens viven en `app/globals.css`. Sin `tailwind.config.js`. Utility classes se generan a partir del nombre del token (`bg-accent`, `p-md`, `text-text-primary`, etc.).
2. **Tailwind v3 + `tailwind.config.js` clasico + `tailwindcss` + `postcss` + `autoprefixer`.** Tokens viven en `theme.extend` del JS config. Conocido-bueno con la mayoria de skills/registries.

**Decision:** Opcion 1 — **Tailwind v4.3 + `@theme` block**. Smoke test PASS sin friccion.

**Evidencia del smoke test (Plan 01-02 Task 2):**

Build con Next 16.2.7 Turbopack:

```
> descubreme@0.0.0 build
> next build

▲ Next.js 16.2.7 (Turbopack)

  Creating an optimized production build ...
✓ Compiled successfully in 1405ms
  Running TypeScript ...
  Finished TypeScript in 733ms ...
  Collecting page data using 4 workers ...
✓ Generating static pages using 4 workers (3/3) in 144ms

Route (app)
┌ ○ /
└ ○ /_not-found
```

- Exit code: 0.
- TypeScript: 0 errores.
- Static generation: 3/3 paginas (incluye `/` + `/_not-found`).
- Tokens compilados verificados en `.next/static/chunks/*.css`:
  - 12 tokens `--color-*` (todos los del §11.1).
  - 7 tokens `--spacing-*` (xs, sm, md, lg, xl, 2xl, 3xl).
  - 2 tokens `--radius-*` (sm, md) — el resto no se ejercitaron en este smoke pero estan declarados.
  - 1 token `--duration-*` (fast) — el resto declarados.
- Utility classes confirmadas resolviendo via `var(--*)`: `bg-accent`, `p-md`, `text-text-primary`.
- Sin warnings sobre `tailwind.config.js` faltante.
- Sin error de `@tailwindcss/postcss` plugin.
- Setup: `npm install tailwindcss@^4 @tailwindcss/postcss postcss` (resolvieron a 4.3.0/4.3.0/8.5.15).

**Consecuencias:**

Beneficios capturados:
- Tokens declarativos viven en CSS, no en JS — alineado con la direccion de CSS moderna y reduce surface JS de build.
- Sin `tailwind.config.js` que mantener. Cuando Cowork edita la paleta del §4, solo se toca `app/globals.css`.
- Compatible con Next 16.2.7 Turbopack sin custom webpack hooks.
- `prefers-reduced-motion` y rules base viven en el mismo archivo CSS — coherente con UI-SPEC §5 + §9.6.

Riesgos asumidos:
- El skill `ui-ux-pro-max-skill` NO se ha probado contra este setup en este sub-agente. Cuando el usuario lo invoque en una wave UI posterior, si el output del skill genera `tailwind.config.js` o usa `theme.extend.colors`, se reabrira esta decision (ver Reversibilidad).
- `@tailwindcss/postcss` es un paquete relativamente nuevo (4.x). Si en el futuro se reporta inestabilidad con Next Turbopack, el downgrade es de bajo costo.
- Tailwind v4 cambio nombres de utilities default vs v3; cualquier copia/paste de snippets de v3 puede romper en v4 (`shadow-sm` vs `shadow-xs`, etc.). Se debe documentar en PATTERNS.md cuando entren componentes reales.

**Reversibilidad:** ALTA. Procedimiento de downgrade reactivo si el skill ui-ux-pro-max o algun componente futuro no es compatible:

1. `npm uninstall tailwindcss @tailwindcss/postcss` (mantener `postcss` si se quiere; v3 lo requiere ademas con `autoprefixer`).
2. `npm install -D tailwindcss@^3 postcss@^8 autoprefixer`.
3. `npx tailwindcss init -p` para generar `tailwind.config.js` + `postcss.config.js`.
4. Reescribir `app/globals.css` con `@tailwind base; @tailwind components; @tailwind utilities;` (en lugar del actual `@import "tailwindcss"; @theme {...}`).
5. Migrar los tokens del `@theme` block del §11.1 a `theme.extend` de `tailwind.config.js` siguiendo §11.3 row "v3" criterio downgrade.
6. Re-emitir ADR-008-bis con la decision actualizada y referencia al sintoma que forzo el downgrade.
7. Re-correr `npm run build` para confirmar paridad funcional.

Costo estimado del downgrade: < 1 hora trabajo. Ningun cambio de componente requerido si las utility classes se mantienen identicas (Tailwind preserva las clases default cross-version en su mayoria).

**Files modificados como parte de esta decision:**

- `app/globals.css` (nuevo): `@import "tailwindcss"; @theme {...}` con los tokens §11.1.
- `postcss.config.mjs` (nuevo): registra `@tailwindcss/postcss`.
- `app/layout.tsx` (nuevo): Server Component root con `<html lang="es-CO">`, importa `globals.css`.
- `app/(public)/page.tsx` (nuevo): 4 primitivos hand-coded para el smoke test (Button, Checkbox, RadioGroup 5pt Likert, Disclosure).
- `package.json`: agrega `tailwindcss ^4.3.0`, `@tailwindcss/postcss ^4.3.0`, `postcss ^8.5.15` (devDependencies de facto; quedaron en `dependencies` por el comportamiento default de `npm install` — cleanup deferred a wave UI).

**Referencia:**

- `.planning/phases/01-fundacion-o-net-ip-sf-skeleton-e2e-magia/01-UI-SPEC.md` §1, §4, §11.
- `.planning/phases/01-fundacion-o-net-ip-sf-skeleton-e2e-magia/01-PATTERNS.md` §4 row "Tailwind version".
- `.planning/research/SUMMARY.md` Hard Gate 3 (`[GAP-TAILWIND-V4-COMPAT]`).
- `.planning/phases/01-fundacion-o-net-ip-sf-skeleton-e2e-magia/01-02-PLAN.md` Task 2.
- `app/globals.css`, `postcss.config.mjs`, `app/(public)/page.tsx` (artefactos del smoke).

---

## ADR-010 — Validacion de `next` en magic-link callback con prefix-check (2026-06-07) (Claude Code, Plan 01-07 security follow-up)

**Contexto:** Tras el merge del Task 3 de Plan 01-07 (`2932a62`), el security review automatico de plugin `security-guidance` detecto un Open Redirect MEDIUM en `app/(auth)/callback/route.ts` linea 73: `next = url.searchParams.get("next") ?? "/"` se pasaba directo a `new URL(next, url)`. Un atacante puede craftear un magic link con `?next=//evil.com/x` o `?next=https://evil.com` y, post-autenticacion, redirigir al usuario a un dominio externo — vector de phishing tipico ("estas logueado, sigue aqui") que aprovecha la confianza recien establecida.

**Opciones:**
1. **Prefix-check minimo (suggested fix del review):** `next` debe empezar con `/` pero NO con `//` ni `/\\`; cualquier otro valor colapsa a `/`. Simple, testeable, cubre los vectores conocidos.
2. **Origin-check via `new URL`:** parsear `next` relativo a base y comparar `resolved.origin === base.origin`. Mas robusto contra variantes Unicode/encoding raras (ej. `%2F%2Fevil.com`), pero requiere base URL y mas codigo.
3. **Allowlist explicita de paths internos** (ej. `["/", "/reporte/*", "/test/*"]`). Maximo control pero rigido: cada path nuevo requiere mantener la lista, y la mayoria de redirects post-auth son a paths arbitrarios `/reporte/[sessionId]` con IDs dinamicos.

**Decision:** Opcion 1 (prefix-check). Implementado como helper exportado `safeNextPath(next)` en `app/(auth)/callback/route.ts`. Rechaza: null/undefined/non-string, no-leading-slash, leading `//`, leading `/\\`. Devuelve `/` en cualquier caso invalido.

**Justificacion:**
- El review explicitamente sugirio este pattern; replicar el suggested fix reduce review-burden en sesiones futuras.
- `URL.searchParams.get` ya decodifica `%2F` a `/` antes de la verificacion, asi que el prefix-check cubre tambien el vector encoded.
- Origin-check anade complejidad sin beneficio para nuestros vectores actuales (no consumimos `next` de fuentes user-controlled que vengan ya parseadas).
- Allowlist es prematuro: Phase 1 solo tiene un consumidor de `?next=` (callback). Si Phase 2+ anade mas redirects parametrizados, podemos endurecer.

**Consecuencias:**
- Test unitario `tests/unit/auth/safe-next-path.test.ts` (6 casos) bloquea regresion en CI.
- Si Phase 2 o posterior introduce nuevos sinks que aceptan `next` de query string (forgot-password callback, etc.), deben reutilizar `safeNextPath` (re-export desde `lib/auth/` si gana mas consumidores).
- Si aparece un vector nuevo (`/\\/`, control chars, Unicode normalization), bump a Opcion 2 origin-check.

**Reversibilidad:** Alta. El helper es 8 lineas + 6 tests; sustituir por Opcion 2 es swap quirurgico sin tocar callers.

**Referencia:**
- Commit: `c4c9dea` (`fix(01-07): validate next param in magic-link callback (open redirect)`).
- Security review hookSpecificOutput: PostToolUse security-guidance plugin, 2026-06-07.
- `app/(auth)/callback/route.ts` `safeNextPath()`.
- `tests/unit/auth/safe-next-path.test.ts`.

---

*Fin de DECISIONS_LOG. Anadir ADR nuevo al final, con numero incremental, fecha y owner. Migrar decisiones no triviales desde `.planning/STATE.md` al cierre de cada sesion (CLAUDE.md §4).*
