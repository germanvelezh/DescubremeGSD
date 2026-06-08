# CHANGELOG — DescubreMe

Cierre de fases per CLAUDE.md §4 (Added / Decisions / Lessons). Mas reciente arriba.

---

## Phase 1 — Fundacion + O*NET IP-SF + Walking Skeleton + Magia + Compliance (2026-06-05 → 2026-06-07)

**Status:** PARTIAL COMPLETE 2026-06-07 (verify-strict-partial). 12/12 plans con SUMMARY.md. Backend+data+compliance GREEN, UI E2E parcial (3 specs gap-closure). Lista para `/gsd-verify-work 1` con nota explicita.

### Added

- **22 schemas Drizzle** (Plan 01-04) — un archivo por tabla, PATTERNS row 1.4 convencion; bytea customType reusable; barrel `db/schema/index.ts`.
- **11 migrations SQL** (Plans 01-04, 01-05, 01-08, 01-10, 01-12) — 001 plugin_catalog, 002 user_data, 003 rls_policies, 004 audit_triggers (REVOKE + immutable + chain hash), 005 jwt_auth_hook (custom_access_token_hook resolviendo Hard Gate 1), 006 aggregate_view_placeholder, 007 encryption_scaffolding, 008 baremo_fallback_event, 009 anonymize_user_audit (SECURITY DEFINER), **010 delete_user_account (SECURITY DEFINER cross-schema atomic — cierra GAP-DELETE-ATOMIC-TX)**, **011 pii_storage_full_envelope (jsonb {ciphertext, dek_ciphertext, iv, tag, kid, v} reemplaza 4 columnas bytea — cierra BUG-PII-STORAGE-PLAN-07)**.
- **Scoring engine TS plugin-as-data** (Plan 01-08) — `lib/scoring/` con Zod discriminated union strict + switch dispatch (sin eval), formulas sum/mean, applyReverse `(max+min)-raw` con RangeError; **ipsativa Opcion C** divisor=N (population variance) per ADR-012, bandas z<=-1 BAJO / -1<z<1 MEDIO / z>=1 ALTO.
- **Baremo selector + percentile gate** (Plan 01-08) — `lib/baremo/selector.ts` fallback CO→MX→INTL con telemetry sin user_id (ADR-013); `shouldShowPercentile` gate Q

UAL-02 (alpha<0.70 O latam_status=pending O INTL fallback → UI cae a Alto/Medio/Bajo).
- **Quality validator + ethics middleware** (Plan 01-08) — severity ordering ok<warn<flag<block; signals single_pattern (stdev<0.5, N>=5) + atypical_timing (mediana <0.8s o >5min); ethics tolerancia dual array+object shape (ADR-016); `evaluateInstrumentEthics` + `recordDistressEvent` + `getContentionResources(country)` + `isContentionStale(row, 90d)` (COMPL-11/12/13 plumbing); `disclaimer_shown` ON, `contention_route_shown` + `follow_up_dispatched` diferidos a Phase 2 (ADR-015).
- **Audit chain hash + immutable** (Plan 01-05) — `lib/audit/{chain-hash, writer}` espejo TS de mig 004; trigger DB rechaza UPDATE/DELETE excepto via SECURITY DEFINER (mig 009 anonymize, mig 010 delete).
- **Envelope encryption AES-256-GCM** (Plan 01-07) — `lib/crypto/{kms,kms.local,pii,pii.local}.ts` con `@aws-sdk/client-kms` + `@vercel/oidc-aws-credentials-provider` prod; XOR mock dev con `DEV_PII_SECRET`; AAD pattern `user_id:<id>` invariant T-01-07-AAD (anti-blob-swapping).
- **Magic-link auth + sesion anonima + claim atomico** (Plans 01-06 + 01-07) — `lib/supabase/{server,browser,service-role}`, `lib/tenant/{jwt,context}`, `lib/session/{anonymous,claim}`, middleware Vercel geo; reclamo 3-step (UPDATE session + UPDATE responses + DELETE cookie) FOUND-08.
- **Dual consent + revocacion granular + delete ≤2 clicks atomic** (Plans 01-07 + 01-10 + 01-12) — `lib/consent/{versions,guard,text/1.0.0.md}` (8 secciones es-CO cubriendo Ley 1581 Art. 5/6/8/26 + 5 subprocesadores; getConsentTextHash SHA-256); `assertConsentActive` middleware 403/412; UI `/me/{data,consent,delete}` con Modal sin Radix (custom focus trap + scrim, ADR-009 §9.5); deletion atomic via mig 010 `.rpc('delete_user_account')` post Task 1.
- **Reporte O*NET 3-capas + hexagono full WCAG + ocupaciones + ficha tecnica + footer NFR-27** (Plan 01-09) — `lib/report/{assembler,narrative-loader,occupation-selector}` cero strings con codigos de instrumento (FOUND-04); UI Server Component con auth check; HexagonoRiasecFull `role="img"` + `aria-labelledby` + `aria-describedby` + `<table class="sr-only">` WCAG 2.2 AA.
- **Email transaccional Resend** (Plan 01-09) — `lib/email/transactional.ts` minimal sin tracking pixel + audit `email_sent` (T-01-09-05).
- **Sentry beforeSend full PII scrub + runtime init** (Plans 01-09 + 01-11) — `lib/sentry-config.ts` redact user.email/name + extras (item_response/date_of_birth/raw_value/phone/email/name) + cookies anonymous_session_id drop + headers (Authorization/Cookie/x-api-key/proxy-authorization case-insensitive) + url query params (token/access_token/refresh_token/code/key/api_key) + drop request.data wholesale; `instrumentation.ts` Next.js 16 convention + 3 sentry.{client,server,edge}.config.ts (COMPL-14 ACTIVO runtime).
- **Plugin-as-data + 8 CI lint gates** (Plans 01-03 + 01-11 + 01-12) — `tests/lint/{no-hardcoded-instruments, prohibited-phrases, rls-enabled, rls-policies-syntax, no-hardcoded-strings, audit-modification-callers}` + `tests/integration/plugin-swap.test.ts` idempotente con git-status snapshot equality (MOCK-PREF-12); enforces FOUND-04/05/06, COMPL-18 (frases prohibidas), UI-SPEC §8.4 (stability contract), single-caller SECURITY DEFINER defense-in-depth.
- **CI workflow Postgres docker matrix** (Plan 01-12 Task 1) — `.github/workflows/ci.yml` con `services.postgres: postgres:16` + psql migrations loop + npm typecheck + test:lint + test:unit + playwright; activa 16 tests DB-gated antes skipped.
- **`db/database.types.ts` generated artifact** (Plan 01-12 Task 2 sub-flow) — 1161 lineas regen post `supabase db reset`; commiteado para CI sin requerir supabase CLI install.
- **5 E2E specs** (Plans 01-06 + 01-07 + 01-09 + 01-10 + 01-12) — full-flow-onet (anonymous→signup→reporte), full-flow-onet-anonymous, pause-resume, signup-consent, magic-link, account-delete-2-clicks, anon-cannot-read-item-response. 30 tests Playwright total.

### Decisions (ADRs emitidos Phase 1)

- **ADR-001** GSD como sistema de desarrollo
- **ADR-002** Config GSD: mode=yolo, granularity=standard, model_profile=quality
- **ADR-003** `commit_docs=false`: `.planning/*` gitignored
- **ADR-004** Arquitectura locked en 7 decisiones D1-D7
- **ADR-005** No sobreescribir CLAUDE.md del proyecto
- **ADR-006** KMS provider: AWS KMS (override de ARCHITECTURE.md D4 Supabase Vault)
- **ADR-007** Phase 1 onboarding: test-first, signup+consent al final
- **ADR-008** Tailwind v4 + `@theme` block como sistema de tokens
- **ADR-010** Validacion de `next` en magic-link callback con prefix-check
- **ADR-011** `ScoringFormula` Zod discriminated union strict + switch dispatch sin eval
- **ADR-012** Ipsativa DD-57 v3.0 Opcion C con divisor=N (population variance)
- **ADR-013** `baremo_fallback_event` telemetry sin user_id por diseno
- **ADR-014** Service-role client pasado explicitamente como parametro
- **ADR-015** Phase 1 ethics: solo `disclaimer_shown`; `contention_route_shown` + `follow_up_dispatched` diferidos Phase 2
- **ADR-016** `ethical_flags` jsonb tolerancia dual shape (array + object map)
- **ADR-017** `/api/score` per-rule failures: log + continue; solo catastrofico aborta
- **ADR-018** `report_snapshot.html_payload` persistido solo autenticados; anonymous re-computa
- **ADR-009** Decisiones Wave 6 (Plan 01-12 Task 1) — 5 sub-decisiones documentadas:
  - §9.1 anonymize_user_audit SECURITY DEFINER + CI grep gate audit-modification-callers
  - §9.2 Conteo ≤2 clicks per UI-SPEC §7.8 (modal safety net no contado)
  - §9.3 delete_user_account SECURITY DEFINER atomic cross-schema (mig 010 cierra GAP-DELETE-ATOMIC-TX)
  - §9.4 PII storage envelope full jsonb (mig 011 cierra BUG-PII-STORAGE-PLAN-07; safe wipe+repopulate pre-prod)
  - §9.5 Modal sin Radix — override del PLAN.md Plan 01-10 (UI-SPEC §1 prohibe Radix)

### Lessons

- **Greenfield Phase 1 fue la mas grande del proyecto** (12 plans, 8 waves, 22 schemas, 11 migrations, ~5000+ LOC produccion + ~3000 LOC tests). Split en plans pequenos mantuvo cada uno <50% contexto, viable para sub-agents executor.
- **Walking Skeleton MVP requirio TDD primero** (failing E2E en Wave 3 Plan 01-06) — establecio el contrato antes de cualquier UI; los tests se actualizaron a measure-twice-cut-once como side effect.
- **Plan 01-10 forzo ADR-009 por contradiccion app-immutability vs derechos titular Ley 1581** — el principio de inmutabilidad del audit_log entra en conflicto directo con COMPL-07 deletion ≤2 clicks. SECURITY DEFINER + grant restrictivo + lint single-caller resolvio mantando ambos principios honrados.
- **Plan 01-12 quedo stale al cerrar Wave 6** (mig 009 emitida fuera de scope original en Plan 01-10). Re-plan pre-spawn en Wave 8 (commit `1073fef`) evito ejecucion incorrecta. Lesson para Phase 2: revisar PLAN.md al final de cada wave grande; si plan downstream depende de output de wave actual y wave hace cambios de scope, re-validar PLAN.md downstream antes de spawn.
- **Plan 01-12 Task 2 sub-flow descubrio 3 bloqueadores pre-existentes** que NUNCA se habian smoke-tested en local con env real: (1) supabase config.toml CLI keys deprecated, (2) `isAtLeast18` exportado como sync function desde `"use server"` rompia Next.js 16 Turbopack, (3) seeds `db/seeds/*` no wired a `supabase db reset`. Lesson: agregar smoke test E2E local-only AL FINAL de cada plan que toque UI; estos bloqueadores se habrian cazado en Wave 3 o 4 si hubiera habido protocolo.
- **Cowork tasks (4 GAPs P1: microcopy, consent v1.0.0, narrativas RIASEC, ocupaciones LATAM) son data-only PRs pre-deploy** — no bloquean implementation. Pero deploy prod bloqueado hasta PROVISIONED.
- **`db/database.types.ts` necesita commit** para CI sin supabase CLI install. Alternative: workflow step `supabase gen types --local`, pero requires supabase CLI en runner. Trade-off: 1161 lineas en repo vs CI complexity. Decision: commit (chore commit `1afa35d`).

### Cubre requirements (38 IDs Phase 1)

FOUND-01..09, COMPL-01..18, QUAL-01/02/03/04/06/07/08, UX-01/02/06/08 — ver SUMMARY.md por plan + lint gates.

### Commits

- Plan 01-01: 1 docs commit + 1 README+env append
- Plan 01-02: 3 commits (scaffold, tailwind v4 + ADR-008, logger redact)
- Plan 01-03: 2 commits (vitest+playwright install, lint gates + scaffolds)
- Plan 01-04: 2 commits (schemas, migrations + RLS)
- Plan 01-05: 2 commits (audit triggers, jwt hook + encryption scaffold)
- Plan 01-06: 3 commits (libs supabase/session/tenant, UI Walking Skeleton, E2E scaffolds)
- Plan 01-07: 5 commits (crypto RED+GREEN, consent+claim RED+GREEN, signup+callback+UI) + 1 security follow-up (`c4c9dea`)
- Plan 01-08: 9 commits (test RED, mig 008, scoring core, ipsative, baremo, quality, ethics, seeds, /api/score)
- Plan 01-09: 6 commits (test RED, GREEN report+sentry+email, UI+routes+E2E, audit email_sent, Sentry expansion post-review, IDOR mitigation)
- Plan 01-10: 5 commits (test RED data-rights+consent-revoke, mig 009, GREEN routes, /me pages+Modal+E2E, robustness)
- Plan 01-11: 6 commits (Sentry init, FOUND-05 extended, FOUND-06 plugin-swap, COMPL-18 extended, deviation aria-labels MC, UI-SPEC §8.4 lint)
- Plan 01-12 Task 1: 6 commits (ADR-009, mig 010, mig 011, schema+callsite migrate, lint nuevo, CI Postgres matrix)
- Plan 01-12 Task 2 sub-flow: 4 commits (gitignore supabase cache, config.toml CLI keys, isAtLeast18 split, db.types regen)
- Total commits Phase 1: ~58 atomicos en `main`.

### Cowork delivery checkpoint COMPLETO (2026-06-08)

Los 4 GAPs P1 Cowork del checkpoint estan CERRADOS via 4 commits feat atomicos:

- ~~`[GAP-MICROCOPY-FASE1]`~~ — commit `94d7186` (14 archivos `lib/i18n/microcopy/es-CO/*.ts`; verbatim D3.3/D3.10/D3.12; 13 pin-E2E defensivos).
- ~~`[GAP-CONSENT-TEXT-V0.1]`~~ — commit `8c61911` (`lib/consent/text/1.0.0.md` v1.0.0 con Sentry como 6to subprocesador + Art. 8 lit. b "prueba de autorizacion" + 10d/15d plazos + tildes es-CO).
- ~~`[GAP-RIASEC-NARRATIVES-ES-CO]`~~ — commit `ee62bf5` (`db/seeds/narrative-templates/RIASEC/seed.sql` con 132 plantillas: 120 top_3_phrase 6P3 + 6 dimensional_high + 6 dimensional_low; voseo verbal + tu/tus posesivos).
- ~~`[GAP-ONET-OCCUPATIONS-LATAM]`~~ — commit `ab8f606` (`db/seeds/occupations/LATAM/seed.sql` con 96 ocupaciones LATAM; 16/dim + JZ 2/9/21/48/16; fuente O*NET 2026-06-08 verbatim — ADR-019).

Nuevo ADR durante delivery: ADR-019 (correcciones de crosswalk RIASEC O*NET 2026 vs ejemplos calibratorios del Prompt 4).

Nuevo item P2 al BACKLOG: `[GAP-RIASEC-NARRATIVES-UNIQUE-INDEX]` (DELETE+INSERT funciona, ON CONFLICT puro requiere migration + unique index).

### Pendientes residuales (post Phase 1)

- 3 GAPs P1 E2E UI (full-flow-anonymous, pause-resume, signup-AGE_BLOCK) — fix probable: UI form interaction bugs Plan 01-06/07
- 1 GAP infra `[GAP-SUPABASE-SEED-WIRING]` (wiring formal `supabase/seed.sql` para que `db reset` aplique seeds automatic)
- 1 GAP infra `[GAP-RIASEC-NARRATIVES-UNIQUE-INDEX]` (ON CONFLICT robustez seed narratives)
- 1 GAP P2 `[GAP-NPM-AUDIT-PHASE7]` (13 vulns transitivas Sentry SDK install)
- 1 GAP infra `[GAP-CONTENTION-VERIFY-2026]` (verificar 6 lineas CO empiricamente pre-deploy)
- 1 GAP P2 `[GAP-ONET-ANCHORS-SOURCE]` (addendum O*NET IP-SF; Phase 1 uso UI-SPEC §6.4 verbatim)
- 1 RISK aceptado `[ACCEPTED-RISK-UPSTASH-GLOBAL]` P3 (Upstash Global vs Regional)

Phase 1 ahora listo para `/gsd-verify-work 1` deploy-strict (modulo recordatorios pre-deploy Sentry DSN + AWS env vars en Vercel).

Ver `estado/BACKLOG.md` con priorizacion P0-P3.
