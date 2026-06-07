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

## ADR-011 — `ScoringFormula` Zod discriminated union strict + switch dispatch sin eval (2026-06-07) (Claude Code, Plan 01-08 Task 3)

**Contexto:** `scoring_rule.formula jsonb` (D1.5 Plan 01-04) es **data** que `lib/scoring/interpreter.ts` ejecuta para producir `computed_score` per dimension. Es la piedra angular del principio plugin (D2 + FOUND-04 + FOUND-06): swap-ear un instrumento debe ser SQL seeds, NO TypeScript. Pero data ejecutable es un vector clasico de Tampering (STRIDE T-01-08-01): un `formula.type='__proto__'` o una payload con `Function(...)` podria escalar a RCE si el interpreter usa `eval` o accede a propiedades sin guards.

**Opciones evaluadas:**
1. **`eval(formula)` o `new Function(formula.expression)`** — flexibilidad maxima, RCE garantizado. Descartada inmediatamente.
2. **`switch(formula.type)` con dispatch a funciones puras + Zod parse strict antes del switch** — solo formulas en el enum compilan; payload extra rechazada por Zod; el dispatch es codigo, no data.
3. **JSON-logic-style mini-evaluator** — flexibilidad parcial, complejidad innecesaria para Phase 1 (2 formulas). Reservada para Phase 3 si VIA weighted_sum + Schwartz centered_mean requieren expresiones libres.

**Decision:** Opcion 2.
- `ScoringFormulaSchema = z.discriminatedUnion('type', [z.object({type: z.literal('sum'), item_codes: z.array(z.string()).min(1), reverse_keyed: z.array(z.string()), scale: z.tuple([z.number(), z.number()])}), z.object({type: z.literal('mean'), ...})])` con `.strict()` para rechazar campos extra.
- `score(formula, responses)` hace `switch(formula.type)` y despacha a `sumScore` / `meanScore` funciones puras.
- Phase 2 anadira `centered_mean` (PVQ-RR MRAT centering); Phase 3 anadira `weighted_sum` (VIA strength weighting). Comentarios `// reserved: <type> for Phase N` documentan el slot pero NO se implementan hasta que se necesiten.

**Consecuencias:**
- T-01-08-01 (Tampering on scoring_rule.formula) mitigated: aun si un attacker logra UPDATE service-role a `scoring_rule.formula`, el peor caso es que el interpreter throw Zod parse error -> `/api/score` log + skip rule + continue (no RCE).
- El CI lint `tests/lint/no-hardcoded-instruments.test.ts` PASS con el codigo nuevo (las nuevas libs scoring/baremo/quality/ethics cero strings con codigos de instrumento).
- Cualquier nueva formula type en Phase 2/3 es 1 PR: 1 union arm + 1 dispatch case + 1 funcion pura + tests fixture. NO requiere cambios al interpreter base.
- `applyReverse(raw, min, max) = (max + min) - raw` queda como helper unico canonical en `lib/scoring/apply-reverse.ts` (QUAL-04), con `RangeError` para raw fuera de [min, max] o scale invalida.

**Reversibilidad:** Media. Si se decide migrar a JSON-logic en Phase 3, los seeds existentes hay que reescribirlos a la nueva DSL. Pero el `scoring_version` int en cada `scoring_rule` permite versionar el migration.

**Referencia:**
- `lib/scoring/types.ts`, `lib/scoring/interpreter.ts`, `lib/scoring/apply-reverse.ts`, `lib/scoring/formulas/{sum,mean}.ts`.
- `.planning/phases/01-fundacion-o-net-ip-sf-skeleton-e2e-magia/01-RESEARCH.md` lineas 929-996.
- `.planning/phases/01-fundacion-o-net-ip-sf-skeleton-e2e-magia/01-08-PLAN.md` `<threat_model>` T-01-08-01.

---

## ADR-012 — Ipsativa DD-57 v3.0 Opcion C con divisor=N (population variance) (2026-06-07) (Claude Code, Plan 01-08 Task 4)

**Contexto:** El Addendum Tabla 14 de O*NET IP-SF documenta tres opciones para reportar puntajes:
- **Opcion A:** percentiles vs baremo nacional (requiere N grande de la poblacion del usuario + alpha >= 0.70 para esa poblacion).
- **Opcion B:** conversion 0-10 native paper-and-pencil -> 0-40 DescubreMe scale (requiere tabla de conversion).
- **Opcion C:** ipsative bands intra-perfil (cada usuario es su propia poblacion: M y SD se calculan sobre sus 6 RIASEC scores; bandas via z-score con umbrales z<=-1 / -1<z<1 / z>=1).

QUAL-02 (CONTEXT D3.8) define cuando usar percentil vs banda: si alpha<0.70 para la poblacion del usuario, o si `psychometric_status.latam_status='pending'`, o si el baremo es INTL fallback, entonces el reporte muestra BAJO/MEDIO/ALTO + nota "baremo en validacion" NO percentil. Phase 1 Free arranca con baremo INTL fallback + no LATAM alpha measured todavia -> siempre cae a Opcion C.

**Decision tecnica sub-ordenada:** ¿La variancia para el z-score usa divisor=N o divisor=N-1?
- **divisor=N (population variance)**: trata los 6 RIASEC scores como la poblacion completa.
- **divisor=N-1 (sample variance)**: trata los 6 RIASEC scores como muestra de una poblacion hipotetica.

**Opciones evaluadas:**
1. **divisor=N-1**: estandar estadistico cuando los datos son muestra. Convencion en R `sd()` y Python `numpy.std(ddof=1)`.
2. **divisor=N**: el Addendum §F lo documenta explicitamente — los 6 RIASEC scores SON la poblacion del perfil del usuario, no una muestra. `numpy.std(ddof=0)`.

**Decision:** Opcion 2 (divisor=N).

**Consecuencias:**
- M_intra = (raw_R + raw_I + raw_A + raw_S + raw_E + raw_C) / 6.
- Var_intra = sum((raw_d - M_intra)^2) / 6.
- SD_intra = sqrt(Var_intra).
- z_d = (raw_d - M_intra) / SD_intra.
- Bandas: z_d <= -1.0 -> BAJO, -1.0 < z_d < 1.0 -> MEDIO, z_d >= 1.0 -> ALTO.
- Degenerate case SD=0 (todos los 6 scores iguales — usuario respondio el mismo valor a todos los items o tiene Holland code muy plano): todas las bandas colapsan a MEDIO (no se reporta ALTO ni BAJO artificialmente).
- Verificacion empirica: para profile R:32 I:28 A:24 S:18 E:14 C:10 -> M=21, SD≈8.0, z_R≈+1.37 ALTO, z_C≈-1.37 BAJO. Para profile spike R:50 I:10 A:10 S:10 E:10 C:10 -> M=16.67, SD≈14.91, z_R≈+2.24 ALTO, z_I/A/S/E/C≈-0.447 MEDIO (NO BAJO — la concentracion del mass en R hace que todos los demas queden cerca de la media).
- Sucesion: el test inicial de Plan 01-08 Task 4 expected `BAJO` para los 5 non-R en el caso spike. El codigo retorno MEDIO. Verificacion a mano confirmo que el codigo era correcto y el test estaba mal calculado. Test corregido con calculo M+SD+z explicit in-line.

**Reversibilidad:** Media-alta. Cambiar a divisor=N-1 es 1 linea en `ipsative.ts`. Pero romperia la consistencia con el Addendum y los baremos pre-computados (cuando se implementen Opcion A). Se mantiene la decision.

**Referencia:**
- `lib/scoring/ipsative.ts` `computeIpsativeBands`.
- `tests/unit/scoring/ipsative.test.ts`.
- `implementation_packs/O-NET-IP-SF_v1.0_Consolidado_ADDENDUM_Tabla14.md` §F.
- `.planning/phases/01-fundacion-o-net-ip-sf-skeleton-e2e-magia/01-CONTEXT.md` D3.8 (QUAL-02 display gate).

---

## ADR-013 — `baremo_fallback_event` telemetry sin user_id por diseno (2026-06-07) (Claude Code, Plan 01-08 Task 2)

**Contexto:** QUAL-08 requiere telemetry para saber con que frecuencia el `selectBaremo()` cae al fallback INTL (en vez de baremo CO nativo). Esto informa la priorizacion de Cowork: si 80% de los usuarios CO caen a INTL, urge un baremo CO real. La tabla `baremo_fallback_event` (migration 008) tiene 4 columnas: `instrument_version_id`, `country_requested`, `baremo_used`, `occurred_at`.

**Opciones evaluadas:**
1. **Incluir `user_id`** — permite reconstruir trayectorias individuales ("user X tomo ONET-IP-SF + obtuvo baremo INTL pq pidio CO inexistente"). Util para debugging individual.
2. **NO incluir `user_id`** — agregado anonimo. Solo cuenta agregada por (instrument, country, baremo, semana).

**Decision:** Opcion 2 (sin `user_id`).

**Consecuencias:**
- T-01-08-02 (Information Disclosure) mitigated por diseno del schema: aun si la RLS deny-all anon+authenticated fallara, no hay PII para filtrar.
- Service-role-only writes via policy `baremo_fallback_event_service_role_write` (GRANT INSERT TO service_role + REVOKE TO authenticated, anon, public).
- Dashboard B2B agregado (Phase 4) puede leer esta tabla sin riesgo de filtracion.
- Si Phase 4+ requiere trayectorias individuales para debugging tenant-level, se crea una tabla separada `baremo_lookup_audit` con user_id + RLS own-data. No se sobrecarga `baremo_fallback_event`.

**Reversibilidad:** Media. Anadir `user_id` es 1 migration `ALTER TABLE ADD COLUMN user_id UUID NULL REFERENCES user(id)`. Pero el patron es: tablas de telemetry agregada NO tienen user_id; tablas de auditoria individual SI lo tienen con RLS own-data. Mantener la separacion conceptualmente clara.

**Referencia:**
- `supabase/migrations/008_baremo_fallback_event.sql`.
- `db/schema/baremo-fallback-event.ts`.
- `lib/baremo/selector.ts` `selectBaremo()` INSERT path.
- `.planning/phases/01-fundacion-o-net-ip-sf-skeleton-e2e-magia/01-08-PLAN.md` `<threat_model>` T-01-08-02.

---

## ADR-014 — Service-role client pasado explicitamente como parametro (no module-level singleton) (2026-06-07) (Claude Code, Plan 01-08 Tasks 5+7)

**Contexto:** `selectBaremo()` y `recordDistressEvent()` requieren bypass de RLS para INSERT a tablas service-role-only (`baremo_fallback_event`, `distress_event`). Hay dos patrones para acceder al service-role client:
1. **Module-level singleton**: `import { serviceRoleClient } from '@/lib/supabase/service-role'` en el module — privilege escalation invisible al code reviewer.
2. **Argumento explicito**: `selectBaremo(supabase, serviceRole, instrumentVersionId, countryCode)` — privilege escalation visible en cada call site.

PATTERNS.md §1.5 row 6 LOCKED documenta esta convencion del proyecto.

**Decision:** Opcion 2.

**Consecuencias:**
- Code reviewer puede grep `serviceRole` en call sites y auditar cada uso de privilege escalation.
- `app/api/score/route.ts` instancia `getSupabaseAdminClient()` 1 vez por request y lo pasa a `selectBaremo()` + `recordDistressEvent()`. Si un module nuevo necesita service-role, el caller decide pasarlo, no el module asume.
- Pitfall 2.3 (service_role filtrado a route handler con input del usuario) tiene una defensa adicional: el parametro hace evidente cuando service-role esta en uso.
- Costo: signatures un poco mas largas. Aceptable.

**Reversibilidad:** Alta. Refactor a singleton es mecanico. Pero el patron se mantiene porque PATTERNS row 6 lo locked.

**Referencia:**
- `lib/baremo/selector.ts` `selectBaremo(supabase, serviceRole, ...)`.
- `lib/ethics/distress.ts` `recordDistressEvent(serviceRole, ...)`.
- `app/api/score/route.ts` call sites.
- PATTERNS §1.5 row 6 LOCKED.

---

## ADR-015 — Phase 1 ethics middleware: solo `disclaimer_shown`; `contention_route_shown` + `follow_up_dispatched` diferidos a Phase 2 con UI (2026-06-07) (Claude Code, Plan 01-08 Task 7)

**Contexto:** COMPL-12/13 requieren ethics middleware que detecte cuando un instrumento tiene `ethical_flags=emotional_distress` (PANAS NA, BPNSFS, PHQ stubs futuros) y dispare NFR-27 (disclaimer no-clinico no-dismissable) + NFR-28 (ruta de contencion a recursos profesionales CO). D3.12 difiere la UI a Phase 2 explicitamente — Phase 1 es plumbing only.

**Decision tecnica:** ¿Que actions emite `distress_event` en Phase 1?
- `action_taken` es un enum DB CHECK (Plan 01-04 migration 002). Phase 1 debe declarar el subset usable.

**Opciones evaluadas:**
1. **Phase 1 emite las 3 actions (`disclaimer_shown`, `contention_route_shown`, `follow_up_dispatched`)** — todas en DB con flags TODO de UI Phase 2.
2. **Phase 1 emite solo `disclaimer_shown`; `contention_route_shown` + `follow_up_dispatched` se anaden cuando Phase 2 entrega la UI**.

**Decision:** Opcion 2.

**Consecuencias:**
- `lib/ethics/distress.ts` `recordDistressEvent(serviceRole, {userId, instrumentVersionId, action: 'disclaimer_shown'})` es la unica accion valida en Phase 1.
- `lib/ethics/middleware.ts` `evaluateInstrumentEthics()` retorna `{requires_disclaimer, requires_contention_route, flags, sensitivity}` pero solo `requires_disclaimer=true` actualmente dispara INSERT. `requires_contention_route` queda como flag estructural para Phase 2.
- Phase 2 anade la UI + extiende `recordDistressEvent` para emitir las 2 actions adicionales. Migration NO requiere cambio (el enum DB ya lista las 3 por Plan 01-04).
- Esto evita un "fake green": si Phase 1 emitiera `contention_route_shown` sin UI, el `audit_log` tendria entradas falsas que distorsionan el reporte de cumplimiento Ley 1581.

**Reversibilidad:** Alta. Phase 2 simplemente anade los 2 call sites adicionales en el handler donde renderiza la UI.

**Referencia:**
- `lib/ethics/distress.ts`, `lib/ethics/middleware.ts`.
- `tests/integration/ethics-middleware.test.ts`.
- `.planning/phases/01-fundacion-o-net-ip-sf-skeleton-e2e-magia/01-CONTEXT.md` D3.12 (Phase 1 plumbing only).

---

## ADR-016 — `ethical_flags` jsonb tolerancia dual shape (array + object map) (2026-06-07) (Claude Code, Plan 01-08 Task 7)

**Contexto:** El seed `MOCK-DISTRESS-1/instrument.sql` (Plan 01-03) declara `ethical_flags={"emotional_distress": true}` (object map shape). Pero los ejemplos de RESEARCH §"Audit log domain" sugieren shape array `["emotional_distress"]`. Las RESEARCH lines son verbatim de la documentacion psicometrica original; el MOCK fue una decision de scaffolding antes de finalizar el schema.

**Opciones evaluadas:**
1. **Forzar shape array** — migrar el MOCK, romper el invariant que MOCKs solo se editan en Plan 01-12 CI refresh.
2. **Forzar shape object map** — convencion explicita en SCHEMA + actualizar RESEARCH si confirma.
3. **Tolerar ambos shapes en `evaluateInstrumentEthics()`** — defensive parsing.

**Decision:** Opcion 3 (tolerar ambos).

**Consecuencias:**
- `evaluateInstrumentEthics()` parsea: si `Array.isArray(ethical_flags)`, lo trata como `string[]`; si `typeof === 'object'`, extrae keys donde `value === true`.
- Tests cubren ambos shapes con fixtures.
- Si el equipo decide canonicalizar en una forma sola, es 1 PR cambiar `evaluateInstrumentEthics()` + actualizar seeds inconsistentes.
- Costo: ~5 lineas adicionales en el parser. Beneficio: no rompe migration history del MOCK + sobrevive a cualquier decision futura sobre el shape canonico.

**Reversibilidad:** Alta. Eliminar 1 branch del parser cuando se canonicalice.

**Referencia:**
- `lib/ethics/middleware.ts` `evaluateInstrumentEthics()`.
- `db/seeds/mocks/MOCK-DISTRESS-1/instrument.sql`.
- RESEARCH lineas 1325-1349.

---

## ADR-017 — `app/api/score/route.ts` per-rule failures: log + continue; solo catastrofico aborta (2026-06-07) (Claude Code, Plan 01-08 Task 9)

**Contexto:** `/api/score` POST handler itera sobre los `scoring_rule` rows de la instrument_version (6 rules para ONET-IP-SF, 1 per dimension RIASEC). Para cada rule: parsea formula via Zod, evalua, llama `selectBaremo()`, llama `shouldShowPercentile()`, INSERT `computed_score`. ¿Que pasa si UN rule falla pero los otros 5 estan bien?

**Opciones evaluadas:**
1. **Throw early — abort el request**: si UNA rule falla, el request retorna 500 sin INSERT de ningun computed_score.
2. **Log + continue: per-rule failures se loguean a `logger.warn(rule_id, error)`; los 5 que pasan generan computed_score; el reporte muestra los 5 dims + "1 dim no disponible" para el fallado**.
3. **Per-rule failure marca el reporte completo como `partial` con flag visible**: opcion 2 + warning UI.

**Decision:** Opcion 2 (log + continue per-rule, abort solo en errores catastroficos).

**Errores catastroficos que SI abortan:**
- `report_snapshot` INSERT falla (no se puede persistir el resultado completo, el usuario nunca vera el reporte).
- `formula parse error` en TODOS los rules (instrumento mal seedeado, no hay nada que reportar).
- `assessment_session` not found o `session.completed_at` null (precondicion no cumplida).
- `quality validator` returns `severity='block'` (precondicion etica).

**Consecuencias:**
- Resiliencia: un rule mal seedeado no rompe los demas. El reporte muestra 5/6 dimensiones con flag claro sobre la dim faltante (Plan 01-09 implementa el copy).
- Auditabilidad: cada per-rule failure deja `logger.warn` con `instrument_version_id`, `dimension`, `rule_id`, `error.message`. Si en produccion una dim empieza a fallar consistentemente, se ve en logs.
- T-01-08-04 (DOS) accept: report_snapshot persiste, future GETs no recalculan (D3.6).

**Reversibilidad:** Alta. Cambiar a fail-fast es 1 try/catch que rethrows.

**Referencia:**
- `app/api/score/route.ts` per-rule loop.
- `.planning/phases/01-fundacion-o-net-ip-sf-skeleton-e2e-magia/01-08-PLAN.md` `<implementation>` POST handler.

---

## ADR-018 — `report_snapshot.html_payload` persistido solo para usuarios autenticados; anonymous re-computa via `/api/score` (2026-06-07) (Claude Code, Plan 01-08 Task 9)

**Contexto:** `computed_score.user_id` es NOT NULL FK (Plan 01-04 D1.5 cascade). Para el anonymous flow (BYS -> 60 items -> done -> signup -> claim), el usuario completa los 60 items SIN haber firmado todavia. Cuando llega a `/test/[code]/done`, ¿guardamos un `report_snapshot` con `user_id=NULL`?

**Opciones evaluadas:**
1. **Permitir `user_id=NULL` en `report_snapshot` + `computed_score`** — relaja la FK constraint a `NULL`. Riesgo: PII orphans si el usuario nunca firma.
2. **Re-computar scores in-memory para anonymous; persistir solo despues del signup + claim**.
3. **Cache transient en Redis con TTL 7d (anonymous session lifetime)** — complejidad adicional sin claro beneficio sobre 2.

**Decision:** Opcion 2 (re-computar in-memory para anonymous).

**Consecuencias:**
- `/api/score` route handler check: si `session.user_id IS NULL`, computa scores + bands in memory y retorna `{ok, sessionId, scores, bands, redirect:null, persisted:false}` — el caller (Plan 01-09 `/test/[code]/done`) renderiza el teaser sin persistir.
- Cuando el usuario firma + magic-link + `claimAnonymousSession()` (Plan 01-07), el `assessment_session.user_id` se setea + `/api/score` se llama de nuevo automaticamente en `/auth/callback` next-step (Plan 01-09 implementa el chain). Esa segunda llamada SI persiste.
- Costo: `/test/[code]/done` paga el costo de scoring 2 veces (1 vez anonymous + 1 vez autenticada). Cost is ~5ms x 60 items, despreciable.
- Beneficio: no orphans. `report_snapshot.user_id` es NOT NULL sin caso especial.

**Reversibilidad:** Media. Relajar a `user_id NULL` requiere migration + RLS update. La decision se mantiene porque el simple no-orphan invariant tiene mas valor que el ahorro de 5ms.

**Referencia:**
- `app/api/score/route.ts` anonymous vs authenticated branch.
- Plan 01-07 `lib/session/claim.ts` (claim chain).
- Plan 01-09 (proximo) `/test/[code]/done` + `/auth/callback` post-claim re-score.

---

*Fin de DECISIONS_LOG. Anadir ADR nuevo al final, con numero incremental, fecha y owner. Migrar decisiones no triviales desde `.planning/STATE.md` al cierre de cada sesion (CLAUDE.md §4).*
