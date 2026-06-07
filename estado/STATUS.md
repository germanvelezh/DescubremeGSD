# STATUS — DescubreMe (estado actual)

**Owner:** German Velez Hurtado.
**Ultima actualizacion:** 2026-06-07 (Claude Code — cierre Plan 01-05 / audit + Auth Hook + encryption scaffolding; Wave 2 cerrada).
**Fase del proyecto:** **Phase 1 Wave 2 COMPLETA (Plans 01-01..01-05). Plan 01-06 (Wave 3: walking skeleton anonymous flow + lib/tenant/jwt + lib/crypto/pii) listo para arrancar.**

> Este archivo es la foto de "donde estamos hoy", de una pagina. Se actualiza al cierre de cada sesion (protocolo CLAUDE.md §4). Es la fuente de verdad durable de estado; el `STATE.md` de GSD es scratchpad de ejecucion.

---

## Donde estamos (3-5 lineas)

Plan 01-05 (Wave 2) completo (2026-06-07): **Hard Gate 1 RESOLVED HIGH** + COMPL-09 estructural cubierto end-to-end. 3 migraciones mas: `004_audit_triggers.sql` (audit_log table + REVOKE update/delete/truncate a `public, anon, authenticated, service_role` + BEFORE UPDATE/DELETE trigger raise exception `audit_log is append-only` + BEFORE INSERT SHA-256 chain hash trigger `this_hash = sha256(encode(prev_hash,'hex') || actor_id || action || entity_type || entity_id || occurred_at)` con prev_hash coalesced a 32 ceros para genesis row + policy `user_reads_own_audit` + usage_log placeholder D1.5 schema-forward), `005_jwt_auth_hook.sql` (**custom_access_token_hook** VERBATIM RESEARCH §Gate 1 con `org_ids := '{}'` para Phase 1 B2C-only + Phase 4 multi-tenant extension documentada como comment ejecutable + GRANT execute a `supabase_auth_admin` + REVOKE a `authenticated, anon, public`), `007_encryption_scaffolding.sql` (documentation-only confirmando contrato D4.2: cols `name_ciphertext`/`name_dek_ciphertext`/`date_of_birth_ciphertext`/`date_of_birth_dek_ciphertext` ya viven en 002; lib/crypto/pii.ts llega en Plan 01-06). `supabase/config.toml` extendido con `[auth.hook.custom_access_token]` enabled=true uri pg-functions + `[auth.email]` magic-link config + `[edge_runtime] enabled = false`. **`lib/audit/chain-hash.ts`** exporta `chainHash(prevHash, payload)` espejo TS del algoritmo SQL (sha256 sobre hex-encoded prev_hash + string-concatenated row fields) para tests + Phase 7 LEGAL-09 verifier job. **`lib/audit/writer.ts`** expone `writeAudit(supabase, opts)` como UNICO path autorizado de INSERT a audit_log con logger pino contract: solo ids+action en log, `meta` jamas serializado (defense in depth vs. PII leak). 5 tests: 2 chain-hash unit passed + 3 writer unit passed + 3 integration audit-immutable skip-graceful sin DATABASE_URL. 2 commits atomicos: f12909b (Task 1: triggers + chain hash + 004), 1e8cf73 (Task 2: Auth Hook + writer + 005/007/config.toml). `npx vitest run` exit 0 con 20 passed / 4 skipped / 8 todo. `npm run typecheck` clean. **Wave 2 cerrada** — proxima accion: Wave 3 Plan 01-06 (walking skeleton anonymous flow E2E + lib/tenant/jwt + lib/crypto/pii).

## Donde estabamos (ciclo previo)

Plan 01-04 (Wave 1) completo (2026-06-06): fundacion de datos completa. **22 Drizzle schemas** + `_types.ts` con bytea customType para PII envelope (D4.2) + barrel. **4 migraciones SQL** escritas a mano: `001_plugin_catalog.sql`, `002_user_data.sql`, `003_rls_policies.sql` con **COMPL-03 consent gate** estructural, `006_aggregate_view_placeholder.sql`. **Hard Gate 2 cerrado** (RLS jsonb operators + `(select auth.uid())` wrapping). 2 commits: 5d31d5e, 87ffeb5. 15 passed / 1 skipped / 8 todo.

---

## Provisioning de servicios externos (Plan 01-01 Task 1 — checkpoint cerrado)

| # | Servicio | Estado | Identificadores no-secretos |
|---|---|---|---|
| 1 | **Supabase** | PROVISIONED us-east-1 | Project URL: `https://tzhhqaducmbxfebuyvnv.supabase.co` · Pooler region: `aws-1-us-east-1` · Extensiones: `pgcrypto` + `pg_cron` ON |
| 2 | **Vercel** | PROVISIONED | Team slug: `germanvelezhs-projects` · Project slug: `descubreme-gsd` · OIDC Federation: Active (Team Recommended mode) · iss=`https://oidc.vercel.com/germanvelezhs-projects` · aud=`https://vercel.com/germanvelezhs-projects` · sub pattern=`owner:germanvelezhs-projects:project:descubreme-gsd:environment:*` |
| 3 | **AWS** | PROVISIONED us-east-1 | Account ID ending ...2030 · OIDC Identity Provider `oidc.vercel.com/germanvelezhs-projects` registrado · KMS key alias `descubreme-prod-pii-kek-v1` (symmetric, single-region, rotacion anual ON) · IAM role `descubreme-prod-encrypt` con trust policy (StringEquals aud + StringLike sub) + permission policy inline (4 ops KMS sobre key ARN) · Key policy del KMS lista el role como key user |
| 4 | **Resend** | PROVISIONED | Org: `descubreme` · Domain `descubreme.co` VERIFIED · DNS records en Hostinger: MX/SPF/DKIM/DMARC propagados · API key `descubreme-vercel-prod` con Sending Access scoped a descubreme.co · Sender: `noreply@descubreme.co` |
| 5 | **Upstash Redis** | PROVISIONED us-east-1 | Database `descubreme-ratelimit-prod` · Type: **Global** (aceptado para MVP — ver `[ACCEPTED-RISK-UPSTASH-GLOBAL]`) · Eviction: `noeviction` · TLS implicito |
| 6 | **Sentry** | PROVISIONED US region | Org: `descubreme` · Project: `descubreme-web` (Next.js platform) · Plan: Developer Free · Auth token scopes: Project: Read + Release: Admin + Organization: Read |

**Archivo privado de secretos:** `~/secrets/descubreme/.env.secrets` (fuera del repo, `chmod 600`, texto plano). Contiene 17 secretos: 4 de Supabase (anon, service_role, access_token, ambos connection strings DB), 1 de Vercel (PROJECT_ID), 4 de AWS (OIDC_PROVIDER_ARN, KMS_KEY_ID, KMS_KEY_ARN, ROLE_ARN), 1 de Resend (API_KEY), 2 de Upstash (REST_URL, REST_TOKEN), 5 de Sentry (DSN dual, AUTH_TOKEN, ORG, PROJECT).

---

## Completado (este ciclo Plan 01-01)

| Entregable | Ubicacion | Notas |
|---|---|---|
| Checkpoint provisioning (Task 1) | German + Claude Code | 6 servicios PROVISIONED. `[GAP-AWS-KMS-SETUP]` CERRADO. |
| `.env.example` | `./.env.example` | Contrato de env vars con 7 bloques comentados (Supabase, Vercel, AWS+OIDC, Dev mock, Resend, Upstash, Sentry, App config). Comentario explicito `AWS_REGION` warning Vercel. `DEV_PII_SECRET` documentado con comando de generacion + warning NEVER commit. |
| `.gitignore` hardening | `./.gitignore` | Agregado: `tmp/`, `secrets/`, `*.secrets`, `*.key`, `*.pem`, `*.rtf` (defensa en profundidad). Tambien: `.next/`, `out/`, `*.tsbuildinfo`, logs, coverage, `.vercel`. |
| README seccion "Phase 1 Quickstart" | `./README.md` | Append no-destructivo al final. Prerequisitos (Node 20+, pnpm, Docker, Supabase CLI). Bootstrap (`cp .env.example .env.local` + `pnpm install` + `supabase start` + `pnpm dev`). Estructura objetivo Phase 1. Politica operacional de secretos. |
| Plan 01-01 SUMMARY | `.planning/phases/01-fundacion-o-net-ip-sf-skeleton-e2e-magia/01-01-SUMMARY.md` | Resumen de lo construido + key files + acceptance criteria check. |
| Cierre `[GAP-AWS-KMS-SETUP]` en BACKLOG | `estado/BACKLOG.md` | Reclasificado a "CERRADO 2026-06-06". |
| Nuevo `[ACCEPTED-RISK-UPSTASH-GLOBAL]` P3 en BACKLOG | `estado/BACKLOG.md` | Razon: free tier suficiente para MVP; migration a Regional si Phase 3+ muestra latencia issue. |

---

## En progreso

- Wave 2 cerrada (Plan 01-05). Wave 3 Plan 01-06 (walking skeleton anonymous flow: landing → BYS → 60 items O*NET → auto-save + resume + service_role guard + `lib/tenant/jwt.ts` + `lib/crypto/pii.ts`) — proxima accion. Es el plan mas grande de la fase y entrega la primera experiencia E2E "magia" (anonima, sin auth) sobre la infra construida en Waves 0-2.

---

## Proxima accion

1. (Claude Code) Arrancar Wave 3 Plan 01-06 (walking skeleton anonymous flow). Implementar `lib/tenant/jwt.ts` (getUserFromJWT helper consume `app_metadata.org_ids` inyectado por el hook de 01-05 — seam Phase 4) + `lib/crypto/pii.ts` (envelope encryption real contra AWS KMS via OIDC, usando cols ya creadas en 002 + scaffolding de 007). Landing + BYS (Before You Start consent screen, COMPL-04) + 60 items O*NET IP-SF con auto-save por item + resume on reconnect + service_role guard test. Este plan consume `writeAudit` de 01-05 en el path `consent_granted` y el JWT hook para mantener `org_ids=[]` en sesiones anonimas (anon role).
2. (Cowork, paralelo a Phase 1 execute) Producir 120 plantillas top-3 + 6 dimensionales RIASEC es-CO (`[GAP-RIASEC-NARRATIVES-ES-CO]`) — checkpoint Wave 7 Plan 01-11 Task 2.
3. (Cowork, paralelo) Curar 50-100 ocupaciones LATAM con RIASEC code + nivel educativo (`[GAP-ONET-OCCUPATIONS-LATAM]`) — checkpoint Wave 7 Plan 01-11 Task 2.
4. (Cowork, paralelo) Microcopy es-CO definitivo en ~16 archivos `lib/i18n/microcopy/es-CO/*` (`[GAP-MICROCOPY-FASE1]`) — placeholders en code permiten E2E sin esperar; Cowork swap = 1 PR de datos.
5. (Cowork) Revisar texto consent v0.1 que Claude Code redactara en Wave 4 (`[GAP-CONSENT-TEXT-V0.1]`) antes del deploy.
6. (Cowork, paralelo) Adaptacion ITC 2017 + permiso de `[GAP-PVQ21-ITEMS-ES-CO]` (runway 3-6 meses; bloquea Phase 2).

---

## Bloqueadores

| Bloqueador | Impacto | No bloquea |
|---|---|---|
| Adaptacion es-CO de PVQ-21 (items/anclas) | Implementacion de Phase 2 (Free) | Phase 1 ni planning de phase 2 |
| Adaptacion es-CO de Ikigai-9 (ITC 2017 + permiso) | Implementacion de Phase 5 (Ikigai) | Phases 1-4 |
| Cierres de licencia | GA publico (Phase 7) | Phases 1-6 (legal diferido por diseno) |

`Nota:` Phase 1 (Fundacion + O*NET IP-SF) NO tiene bloqueadores. Provisioning cerrado. Tailwind v4 LOCKED via ADR-008 (2026-06-06).

---

## Hard gates para Phase 1 (estado post Plan 01-05)

1. ~~Auth Hook API signature~~ **RESUELTO HIGH 2026-06-07 (Plan 01-05 Task 2):** `custom_access_token_hook` aplicado verbatim de RESEARCH §Gate 1 en `supabase/migrations/005_jwt_auth_hook.sql` con `org_ids := '{}'` para Phase 1 B2C-only + Phase 4 multi-tenant extension documentada como comment ejecutable + GRANT execute a `supabase_auth_admin` + REVOKE a `authenticated, anon, public`. Hook registrado en `supabase/config.toml` `[auth.hook.custom_access_token]` enabled=true. Verbatim cumplido.
2. ~~RLS jsonb operators con `(select auth.jwt())` wrapping~~ **RESUELTO en RESEARCH §Gate 2** (Supabase docs + benchmark 99.94% improvement; HIGH confidence). Verbatim aplicado en Plan 01-04.
3. ~~Decision de region Supabase~~ **RESUELTO 2026-06-05 (`/gsd-discuss-phase 1`):** us-east-1 (CONTEXT D1.1). CCM con Supabase queda para Phase 7; clausula transferencia internacional + lista 5 subprocesadores en consent desde fase 1.
4. ~~Tailwind CSS 4.x + `ui-ux-pro-max-skill` compatibility~~ **RESUELTO 2026-06-06 en Plan 01-02 Task 2:** Tailwind v4 LOCKED via ADR-008. Smoke test PASS — `@theme` block compila clean en `app/globals.css`, 12 color + 7 spacing + 5 radii + 4 duration tokens verificados en `.next/static/chunks/*.css`, utility classes resuelven a `var(--*)`, build verde. Evaluacion del output del skill `ui-ux-pro-max-skill` queda para una wave UI posterior (skill no invokable desde sub-agente executor); procedimiento de downgrade reactivo a v3 documentado en 7 pasos en ADR-008. `[GAP-TAILWIND-V4-COMPAT]` CERRADO.
5. ~~AWS KMS account + IAM + Vercel-AWS OIDC trust~~ **RESUELTO 2026-06-06 en Plan 01-01 Task 1** (German provisiono cuenta dedicada `descubreme-prod`, IAM role + trust + permission policy, KMS key + key policy ajustada). `[GAP-AWS-KMS-SETUP]` CERRADO.

`Nota:` 5/5 hard gates CERRADOS post Plan 01-02. Phase 1 listo para Wave 1+.

---

## Detalle de pendientes

Ver `estado/BACKLOG.md` (priorizado P0-P3). Cerrados en este ciclo:
- ~~`[GAP-AWS-KMS-SETUP]`~~ resuelto en Plan 01-01 Task 1.

Items nuevos descubiertos en este ciclo:
- `[ACCEPTED-RISK-UPSTASH-GLOBAL]` P3 — Upstash Redis tipo Global (no Regional) aceptado para MVP. Free tier identico, latencia +10-30ms vs Regional. Migration path: export/import si Phase 3+ muestra latencia issue en rate limit hot path.

Cerrado en este ciclo (Plan 01-02):
- ~~`[GAP-TAILWIND-V4-COMPAT]`~~ resuelto via ADR-008 (2026-06-06). Tailwind v4 LOCKED.

Items vigentes (sin cambios):
- `[GAP-RIASEC-NARRATIVES-ES-CO]` P1 — Cowork (120 + 6 plantillas); checkpoint Wave 7 Plan 01-11.
- `[GAP-ONET-OCCUPATIONS-LATAM]` P1 — Cowork (50-100 ocupaciones); checkpoint Wave 7 Plan 01-11.
- `[GAP-CONSENT-TEXT-V0.1]` P1 — Claude Code drafts en Wave 4; Cowork review pre-deploy.
- `[GAP-MICROCOPY-FASE1]` P2 — Cowork ~16 archivos `lib/i18n/microcopy/es-CO/*`; placeholders permiten E2E.
- `[GAP-EDGE-CRON-LIMITS]` P2 — Phase 4.
- `[GAP-STRIPE-COP-SANDBOX]` P2 — Phase 3.
- `[FIX-ROADMAP-COUNT-37-38]` P3 — cosmetico.

---

## Decisiones lockeadas durante Plan 01-01 Task 2

- Email root AWS: alias Gmail `+descubreme-aws` (no `info@descubreme.co` para evitar mezcla con leads). Filtro Gmail label `AWS-root` activo.
- Archivo de secretos local: `~/secrets/descubreme/.env.secrets` plano + `chmod 600` (no `.rtf`, no dentro del repo).
- Upstash type Global aceptado para MVP (free tier suficiente, migration path documentado).
- Sender email Resend: `noreply@descubreme.co` (transactional, no respondible). DMARC en `p=none` por ahora (monitor, no block); subir a `p=quarantine` en Phase 3+.
- AWS region var `AWS_REGION=us-east-1` EXPLICITA en `.env.example` con comentario warning (Vercel docs).
- `.gitignore` defense-in-depth: `tmp/`, `secrets/`, `*.secrets`, `*.key`, `*.pem`, `*.rtf` agregados.

ADRs emitidos en este ciclo:
- **ADR-008** (2026-06-06) — Tailwind v4 LOCKED + `@theme` block como sistema de tokens (Plan 01-02 Task 2). Smoke test PASS, build verde, 12 colores + 7 spacing + 4 motion tokens verificados.

ADRs a emitir en proximos planes:
- ADR-009: Deletion UX `<=2 clicks` interpretation + funcion `anonymize_user_audit` SECURITY DEFINER (Plan 01-12 Task 1).

## Completado este ciclo (Plan 01-05)

| Entregable | Ubicacion | Commit |
|---|---|---|
| audit_log + usage_log schemas + 004 audit triggers (REVOKE + immutable + chain hash) + lib/audit/chain-hash.ts + chain-hash.test.ts + audit-immutable.test.ts | `db/schema/audit-log.ts`, `db/schema/usage-log.ts`, `supabase/migrations/004_audit_triggers.sql`, `lib/audit/chain-hash.ts`, `tests/unit/audit/chain-hash.test.ts`, `tests/integration/audit-immutable.test.ts` | f12909b |
| 005 custom_access_token_hook (Hard Gate 1) + 007 encryption doc-only + supabase/config.toml [auth.hook.custom_access_token]+[auth.email]+[edge_runtime] + lib/audit/writer.ts + writer.test.ts | `supabase/migrations/005_jwt_auth_hook.sql`, `supabase/migrations/007_encryption_scaffolding.sql`, `supabase/config.toml`, `lib/audit/writer.ts`, `tests/unit/audit/writer.test.ts` | 1e8cf73 |
| Plan 01-05 SUMMARY | `.planning/phases/01-fundacion-o-net-ip-sf-skeleton-e2e-magia/01-05-SUMMARY.md` | (gitignored — `.planning/` no commitea per ADR-003) |

## Completado ciclo previo (Plan 01-04)

| Entregable | Ubicacion | Commit |
|---|---|---|
| 22 Drizzle schemas + bytea customType + barrel + relations test | `db/schema/_types.ts`, `db/schema/<22 files>.ts`, `db/schema/index.ts`, `tests/unit/schema/relations.test.ts` | 5d31d5e |
| 4 migrations SQL + RLS own-data + COMPL-03 consent gate + pg_cron + supabase/config.toml | `supabase/migrations/001_plugin_catalog.sql`, `002_user_data.sql`, `003_rls_policies.sql`, `006_aggregate_view_placeholder.sql`, `supabase/config.toml`, `tests/lint/rls-policies-syntax.test.ts` (catalog exemption + 3 nuevos asserts), `tests/lint/rls-enabled.test.ts` (comentario) | 87ffeb5 |
| Plan 01-04 SUMMARY | `.planning/phases/01-fundacion-o-net-ip-sf-skeleton-e2e-magia/01-04-SUMMARY.md` | (gitignored — `.planning/` no commitea per ADR-003) |

## Completado ciclo previo (Plan 01-03)

| Entregable | Ubicacion | Commit |
|---|---|---|
| Vitest 2.1.9 + Playwright 1.60 install + 3 E2E fixtures | `package.json`, `package-lock.json`, `vitest.config.ts`, `playwright.config.ts`, `tests/setup.ts`, `tests/e2e/fixtures/{auth,anonymous-session,db-reset}.ts` | 03d82c1 |
| 4 CI lint gates + 2 scaffold tests + glossary + 2 mocks | `tests/lint/{no-hardcoded-instruments,prohibited-phrases,rls-enabled,rls-policies-syntax}.test.ts`, `tests/integration/plugin-swap.test.ts`, `tests/unit/scoring/onet-fixture.test.ts`, `lib/lint/prohibited-phrases.ts`, `db/seeds/mocks/MOCK-PREF-12/instrument.sql`, `db/seeds/mocks/MOCK-DISTRESS-1/instrument.sql` | 140790d |
| Plan 01-03 SUMMARY | `.planning/phases/01-fundacion-o-net-ip-sf-skeleton-e2e-magia/01-03-SUMMARY.md` | (gitignored — `.planning/` no commitea per ADR-003) |

## Completado ciclo previo (Plan 01-02)

| Entregable | Ubicacion | Commit |
|---|---|---|
| Scaffold Next.js 16 + Drizzle 0.34 + TS strict | `package.json`, `tsconfig.json`, `next.config.ts`, `drizzle.config.ts` | d7bc409 |
| Tailwind v4 + `@theme` tokens + ADR-008 | `app/globals.css`, `postcss.config.mjs`, `app/layout.tsx`, `app/(public)/page.tsx`, `estado/DECISIONS_LOG.md` | 8337577 |
| pino logger COMPL-14 redact + sanity test | `lib/logger.ts`, `lib/logger.test.ts`, `tsconfig.json` | 886f314 |
| Plan 01-02 SUMMARY | `.planning/phases/01-fundacion-o-net-ip-sf-skeleton-e2e-magia/01-02-SUMMARY.md` | (gitignored — `.planning/` no commitea per ADR-003) |
