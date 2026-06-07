# STATUS — DescubreMe (estado actual)

**Owner:** German Velez Hurtado.
**Ultima actualizacion:** 2026-06-07 (Claude Code — cierre Plan 01-08 / scoring engine TS + ipsativa + baremo selector + quality validator + ethics middleware + POST /api/score; Wave 5 cerrada).
**Fase del proyecto:** **Phase 1 Wave 5 COMPLETA (Plans 01-01..01-08, 8/12). Plan 01-09 (Wave 6: reporte magia + email Resend + Sentry beforeSend) y Plan 01-10 (derechos titular Ley 1581) listos para arrancar.**

> Este archivo es la foto de "donde estamos hoy", de una pagina. Se actualiza al cierre de cada sesion (protocolo CLAUDE.md §4). Es la fuente de verdad durable de estado; el `STATE.md` de GSD es scratchpad de ejecucion.

---

## Donde estamos (3-5 lineas)

Plan 01-08 (Wave 5) completo (2026-06-07): **Scoring engine TS plugin-as-data end-to-end + ipsativa DD-57 v3.0 Opcion C + baremo selector con telemetry + quality validator + ethics middleware + ONET seeds finales + contention CO seed + POST /api/score**. El cierre de la fundacion psicometrica: el motor lee `scoring_rule.formula jsonb` (sum/mean, Zod discriminated union strict, dispatch via switch sin eval — T-01-08-01 mitigated) y NO contiene strings con codigos de instrumento (FOUND-04; CI lint `no-hardcoded-instruments` PASS). El test `tests/integration/plugin-swap.test.ts` con MOCK-PREF-12 finalmente cierra FOUND-06 GREEN: swap-ear un instrumento es SQL seeds, NO TypeScript. Layers entregadas: `lib/scoring/{types,apply-reverse,formulas/{sum,mean},interpreter,ipsative}.ts` (applyReverse `(max+min)-raw` con `RangeError` para raw fuera de [min,max] o scale invalida QUAL-04; ipsativa con divisor=N population variance Addendum §F, SD=0 degenerate -> MEDIO, bandas z<=-1 BAJO / -1<z<1 MEDIO / z>=1 ALTO); `lib/baremo/selector.ts` (`selectBaremo(supabase, serviceRole, instrumentVersionId, countryCode)` con fallback secuencial CO->MX->INTL + INSERT a `baremo_fallback_event` best-effort sin user_id por diseno T-01-08-02; `shouldShowPercentile(scoringRule, baremoUsed, psychometricStatus)` QUAL-02 gate que retorna false si alpha<0.70 o `psychometric_status.latam_status === 'pending'` o INTL fallback -> UI cae a Alto/Medio/Bajo + nota); `lib/quality/validator.ts` (severity ordering ok<warn<flag<block; signals `single_pattern` stdev<0.5 con N>=5 + `atypical_timing` mediana <0.8s o >5min QUAL-07 Pitfall 11; slot IMC reservado); `lib/ethics/{middleware,distress,contention}.ts` (`evaluateInstrumentEthics(instrumentVersionId)` lee `instrument.ethical_flags` con shape tolerance array+object jsonb defensivo, retorna `{requires_disclaimer, requires_contention_route, flags, sensitivity}`; `recordDistressEvent` service-role INSERT con structured logger; `getContentionResources(countryCode)` + `isContentionStale(row, 90d)` emite `logger.warn` no-bloquea COMPL-11; `[GAP-CONTENTION-VERIFY-2026]` para re-verificacion Cowork pre-merge). DB: `supabase/migrations/008_baremo_fallback_event.sql` (RLS deny-all anon+authenticated, service-role only, sin columna user_id) + `db/schema/baremo-fallback-event.ts` Drizzle mirror + barrel re-export. Seeds: `db/seeds/instruments/ONET-IP-SF/scoring-rule.sql` (6 idempotent RIASEC rows `{type:'sum', item_codes:[R/I/A/S/E/C 1..10], reverse_keyed:[], scale:[1,5]}` Pack §4 reverse=false confirmado) + `db/seeds/instruments/ONET-IP-SF/baremo-intl.sql` (Addendum §D fixed percentiles 0-10 native paper-and-pencil, `scale_descubreme_conversion_status: reference_only`, `[GAP-BAREMO-INTL-PCTL-EXTRACT]` para Opcion B 0-40 conversion deferred — Phase 1 Free usa Opcion C ipsativa asi que este stub NO bloquea el plan goal) + `db/seeds/contention-resources/CO/seed.sql` (6 verbatim D1.7 — Linea 106, Linea de la Vida, Linea 123, Linea 155, Profamilia, Asociacion Colombiana de Psiquiatria — `last_verified_at='2026-06-05T00:00:00Z'`). Route Handler: `app/api/score/route.ts` (`runtime='nodejs'`, strict Zod `ScoreBodySchema` COMPL-17, trust check via cookie + JWT, responses load + per-dim `Map<itemCode, raw_value>` derivado de `item.dimension+sequence_number`, validate quality + ethics + recordDistressEvent, per-rule formula parse via `ScoringFormulaSchema` + `score()` + `selectBaremo()` + `shouldShowPercentile()` + INSERT computed_score por rule (per-rule failures log+continue, solo catastrofico aborta), `computeIpsativeBands` sobre los 6 RIASEC scores, INSERT `report_snapshot.html_payload` jsonb con scores + bands + display_by_dim + narrative_version=1.0 + occupation_set_version=1.0 [stubs hasta `[GAP-RIASEC-NARRATIVES-ES-CO]` + `[GAP-ONET-OCCUPATIONS-LATAM]` en Plan 01-09], writeAudit `report_generated`, return `{ok: true, sessionId, redirect: '/reporte/<id>'}`). **9 commits atomicos:** `96cb394` (Task 1 RED 12 test files), `c9977e3` (Task 2 migration 008 + schema), `b38176e` (Task 3 scoring core GREEN), `4f68ecd` (Task 4 ipsative GREEN), `5e1146a` (Task 5 baremo + percentile gate GREEN), `3568081` (Task 6 quality validator GREEN), `15262ca` (Task 7 ethics + distress + contention GREEN), `5f747d3` (Task 8 seeds), `8d72b64` (Task 9 /api/score). **3 deviations auto-fixed, zero scope creep:** (a) ipsativa test expectation re-derivada empiricamente (libreria correcta, test mal calculado: spike R:50/I:10/A:10/S:10/E:10/C:10 -> M=16.67 SD≈14.91 z_I≈-0.447 -> MEDIO no BAJO; documentado in-line con calculo M+SD+z), (b) `topThreeRiasec` -> `computeRiasecTop3` (rename para match nombre exportado en Plan 01-07), (c) `execSync` -> `execFileSync` con argument-array form en `plugin-swap.test.ts` (security PostToolUse hook flagged tampering por shell interpolation; comando es fijo no input usuario, pero el patron mas seguro es correcto — defensa en profundidad). `npx vitest run` exit 0 con **110 passed / 16 skipped (DB-gated, esperan Plan 01-12 CI Postgres) / 3 todo** (era 57/6/11 al cierre de Wave 4; **+53 nuevos, 0 regresiones**). `npx vitest run tests/lint/no-hardcoded-instruments.test.ts` PASS (las nuevas libs scoring/baremo/quality/ethics cero strings con codigos de instrumento). `npm run typecheck` clean. `npx playwright test --list` 30 tests / 4 specs (unchanged). **PATTERNS row 4 LOCKED honored** (narrative_template slot enum DB CHECK migration 002 + espejo TS en `lib/scoring/types.ts`). Cubre FOUND-04, FOUND-05, FOUND-06, QUAL-01, QUAL-02, QUAL-03, QUAL-04, QUAL-06, QUAL-07, QUAL-08, COMPL-11, COMPL-12, COMPL-13. Plan 01-09 puede componer reporte completo ya — lee `report_snapshot.html_payload` (autenticado) o recomputa via /api/score on-the-fly (anonymous teaser path). **Wave 5 cerrada** — proxima accion: Wave 6 dual (Plan 01-09 reporte magia + Plan 01-10 derechos Ley 1581).

Plan 01-07 (Wave 4) completo (2026-06-07): **Segunda mitad del Walking Skeleton MVP — signup + dual consent + magic link + claim atomico de sesion anonima + envelope encryption AES-256-GCM**. El usuario anonimo que termino 60 items aterriza en `/test/[code]/done` (hexagono RIASEC preview outline-only top-3, sin numeros, sin recomendaciones — COMPL-06 honrado), firma con email + DOB + pais + DOS checkboxes consent separados (general + sensitive_data, NO pre-checked, NO maestro — COMPL-01), recibe magic link via Supabase Auth `signInWithOtp`, click → `/auth/callback` (Route Handler nodejs) → `exchangeCodeForSession` → re-validacion server-side de DOB ≥18 (T-01-07-02, defensa contra tampering de metadata) → `encryptPII(dob, aad=user_id:<id>)` envelope AES-256-GCM + UPSERT `public.user` con `_ciphertext bytea + _dek_ciphertext bytea` (D4.2) → INSERT consent row con D1.6 metadata (`text_sha256_hash` SHA-256 de consent v1.0.0, `ip_truncated` /24 IPv4 o /48 IPv6, `user_agent`, `consent_version='1.0.0'`, `locale='es-CO'`) → `claimAnonymousSession(user.id)` atomico (UPDATE assessment_session + UPDATE item_response + DELETE cookie, FOUND-08) → `writeAudit({action: 'consent_granted'})` → redirect `/reporte/[sessionId]` (Plan 01-09 implementa la pantalla). Layers entregadas: `lib/crypto/{kms,kms.local,pii,pii.local}.ts` (KMS via `@aws-sdk/client-kms` + `@vercel/oidc-aws-credentials-provider` prod; XOR mock dev con `DEV_PII_SECRET` 32 bytes hex; switch via env `AWS_ROLE_ARN`; AAD pattern `user_id:<id>` anti-blob-swapping invariant T-01-07-AAD), `lib/consent/{versions,guard,text/1.0.0.md}` (CURRENT_CONSENT_VERSIONS semver registry + `getConsentTextHash` + `semverLt` helpers + `assertConsentActive` middleware 403/412 — defensa en profundidad sobre RLS — + DRAFT consent text es-CO 8 secciones cubriendo Ley 1581 Art. 5/6/8/26, 5 subprocesadores [Supabase US, Vercel US, AWS KMS us-east-1, Resend US, Upstash US], transferencia internacional explicita, NFR-27/28; `[GAP-CONSENT-TEXT-V0.1]` espera review Cowork pre-deploy), `lib/session/claim.ts` (3-step atomico FOUND-08), `lib/riasec/top3.ts` (ordering deterministico para preview), 4 UI components `components/ui/{Checkbox,DateField,Disclosure,HexagonoRiasecPreview}.tsx` (UI-SPEC §6.3/6.6/6.7/6.8 verbatim), 4 microcopy es-CO files (`report-ready/signup/consent/magic-link`), `app/(auth)/{signup,magic-link/sent,callback}` (Server Action `signupAction` con server-only `isAtLeast18` autoritativo — PATTERNS row 7 LOCKED — + Zod validation + dual checkbox + `signInWithOtp options.data` carrier de dob/country/consent flags como pending metadata), `app/(public)/consent/page.tsx` (legal page con inline markdown parser — no MDX en deps), `app/api/consent/grant/route.ts` (501 stub — el grant real ocurre en callback). **5 commits atomicos:** `bcc2c9e` (Task 1 RED crypto), `0f1debd` (Task 1 GREEN crypto), `67e665a` (Task 2 RED consent+claim), `4232414` (Task 2 GREEN consent+claim), `2932a62` (Task 3 GREEN signup+callback+UI). **Security follow-up `c4c9dea`:** PostToolUse security review flagged MEDIUM Open Redirect en `/auth/callback` line 73 (`next = url.searchParams.get("next") ?? "/"` pasado directo a `new URL(next, url)` — vector de phishing post-auth con `?next=//evil.com/x`). Fix: helper `safeNextPath()` que rechaza `//`, `/\\`, no-leading-slash, absolute URLs, `javascript:`, no-strings → colapsa a `/`. +6 tests en `tests/unit/auth/safe-next-path.test.ts`. `npx vitest run` exit 0 con **57 passed / 6 skipped / 11 todo** (era 29/6/8 al cierre de Wave 3; **+28 nuevos, 0 regresiones**). `npm run typecheck` clean. `npx vitest run tests/lint/` 8/8 verde. `npx playwright test --list` 30 tests / 4 specs (era 9/2). **PATTERNS row 2 + row 7 LOCKED honored.** Cubre FOUND-01, FOUND-08, COMPL-01, COMPL-02, COMPL-03, COMPL-04, COMPL-10. **Wave 4 cerrada** — proxima accion: Wave 5 Plan 01-08 (scoring engine TS + ipsativa + baremo selector + quality validator + ethics middleware + `/api/score` + ONET seeds completos + fixture tests).

## Donde estabamos (ciclo previo)

Plan 01-07 (Wave 4) completo (2026-06-07): **Signup + dual consent + magic link + callback claim + envelope encryption AES-256-GCM**. Cerrada en sesion previa; ver historial completo en CHANGELOG.

Plan 01-06 (Wave 3) completo (2026-06-07): **Walking Skeleton anonymous flow operativo end-to-end**. Usuario anonimo aterriza, completa 60 items O*NET, auto-save invisible via `/api/respond` (Zod strict COMPL-17), resume tras cerrar navegador 7d via cookie nanoid(30). Layers: `lib/supabase/{server,browser,service-role}`, `lib/tenant/{jwt,context}`, `lib/session/anonymous`, `middleware.ts` (Vercel geo), seeds ONET-IP-SF 60 items + scoring rule, anchors verbatim UI-SPEC §6.4, microcopy placeholder, Landing + BYS + Test SC shell + ItemForm CC + ProgressIndicator CC + Route Handler `/api/respond`. 2 E2E specs scaffold. 3 commits: 3aef81e, cd2fe01, be94a04. 29 passed / 6 skipped / 8 todo.

Plan 01-05 (Wave 2) completo (2026-06-07): Hard Gate 1 RESOLVED HIGH + COMPL-09 estructural. Migrations 004 audit triggers + 005 custom_access_token_hook + 007 encryption scaffolding + `lib/audit/{chain-hash, writer}` + 5 tests. Commits: f12909b, 1e8cf73.

Plan 01-04 (Wave 1) completo (2026-06-06): 22 Drizzle schemas + 4 migraciones SQL + RLS own-data + COMPL-03 consent gate estructural + pg_cron cleanup. Hard Gate 2 cerrado. Commits: 5d31d5e, 87ffeb5.

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

- Wave 5 cerrada (Plan 01-08 — scoring engine + ipsativa + baremo selector + quality validator + ethics middleware + POST /api/score). Wave 6 dual (Plan 01-09 reporte magia + Plan 01-10 derechos Ley 1581) — proxima accion. Plan 01-09 puede componer reporte completo ya — depende solo de Cowork entregar plantillas narrativas + ocupaciones LATAM para reemplazar los stubs `narrative_version=1.0` / `occupation_set_version=1.0` que dejo Plan 01-08 en `report_snapshot.html_payload`.

---

## Proxima accion

1. (Claude Code) Arrancar Wave 6 Plan 01-09 (reporte magia + email + Sentry beforeSend). Implementar `app/(b2c)/reporte/[sessionId]/page.tsx` (Server Component lee `report_snapshot.html_payload` o recomputa via /api/score on-the-fly para anonymous teaser path) + `components/report/{HexagonoFull,Capa1Frase,Capa2Matices,Capa3FichaTecnica,FooterNFR27Chip}.tsx` (UI-SPEC §6.x verbatim — Capa 3 ficha tecnica expandible con alpha LATAM + baremo CO/MX/INTL + version del scoring_rule + fingerprint del item_bank), `lib/report/template-loader.ts` (load `narrative_template` row por top-3 RIASEC code con fallback generico no-deterministico si Cowork aun no entrega `[GAP-RIASEC-NARRATIVES-ES-CO]`), `lib/report/occupation-loader.ts` (load `occupation` rows por RIASEC code, top-N por nivel educativo, fallback O*NET US literal con flag `[GAP-ONET-OCCUPATIONS-LATAM]`), `app/api/report/email/route.ts` (Resend transactional con link persistente al reporte, sin urgencia, sin manipulacion — copy es-CO Cowork-owned `[GAP-MICROCOPY-FASE1]`), `instrumentation-client.ts` + `sentry.server.config.ts` (Sentry `beforeSend` que strippea PII: emails, DOB, telefonos, addresses, encriptados; tag `phase=1`; entrar en `lib/observability/`). REQ-MAP: UX-08 reporte capa 1-3 visible + UX-09 footer NFR-27, COMPL-08 audit_log entry on email send, COMPL-14 PII strip en Sentry, FREE-06 reporte persistente 7d+30d.
2. (Claude Code, paralelo Wave 6) Plan 01-10 derechos titular Ley 1581. Implementar `app/(auth)/me/{data,page.tsx}` + `app/api/me/{data/route.ts,consent/revoke/route.ts}`. `GET /me/data` retorna struct con todos los datos del usuario en formato JSON descargable (consent rows, computed_score rows, item_response rows, report_snapshot rows, audit_log entries — PII desencriptada via `decryptPII`). `PATCH /me/data` permite rectificacion de campos (limitado a dob_ciphertext + country + locale por scope MVP, resto deferred). `DELETE /me/data` ejecuta `anonymize_user(user_id)` que pone `dob_ciphertext=NULL, email=NULL` + anonimiza `audit_log.actor_user_id` a hash determinista + UPDATE assessment_session set `user_id=NULL` + UPDATE report_snapshot.html_payload strip PII (Plan 01-12 entrega la function via migration 009; aqui solo el handler). `POST /me/consent/revoke` con body `{product_code}` UPDATE `consent` set `revoked_at=NOW()` + assertConsentActive bloquea proximas respuestas. ADR-009 (Deletion UX ≤2 clicks) se emite en Plan 01-12 Task 1, pero la UX la dejamos aqui: 1 click "Borrar mi cuenta" -> 1 modal confirmacion con `confirm_email` re-prompt -> DELETE. UI <=2 clicks.
2. (German, no bloquea) Provisionar AWS KMS prod (`[GAP-AWS-KMS-SETUP]` — el code de `lib/crypto/kms.ts` esta listo y verbatim; switch dev → prod = setear `AWS_ROLE_ARN` + crear KEK alias). Solo bloquea deploy a Vercel, NO Wave 5.
3. (Cowork) Revisar texto consent v1.0.0 en `lib/consent/text/1.0.0.md` que Claude Code redacto en Wave 4 (`[GAP-CONSENT-TEXT-V0.1]`) pre-deploy. Si hay cambios, bump a 1.0.1 y `getConsentTextHash` regenera SHA-256 automaticamente.
4. (Cowork, paralelo) Producir 120 plantillas top-3 + 6 dimensionales RIASEC es-CO (`[GAP-RIASEC-NARRATIVES-ES-CO]`) — checkpoint Wave 7 Plan 01-11 Task 2.
5. (Cowork, paralelo) Curar 50-100 ocupaciones LATAM con RIASEC code + nivel educativo (`[GAP-ONET-OCCUPATIONS-LATAM]`) — checkpoint Wave 7 Plan 01-11 Task 2.
6. (Cowork, paralelo) Microcopy es-CO definitivo en ~16 archivos `lib/i18n/microcopy/es-CO/*` (`[GAP-MICROCOPY-FASE1]`) — Plans 01-06 + 01-07 dejaron 8 placeholders (landing/before-you-start/test/resume/report-ready/signup/consent/magic-link); Cowork swap = 1 PR de datos.
7. (Cowork, paralelo) Producir addendum O*NET IP-SF en `implementation_packs/RESPONSE_ANCHORS_es-CO_v1.0.md` (`[GAP-ONET-ANCHORS-SOURCE]` P2 — el archivo cubre FS/BFI/PERMA pero no O*NET; Phase 1 uso UI-SPEC §6.4 verbatim como canon temporal).
8. (Cowork, paralelo) Adaptacion ITC 2017 + permiso de `[GAP-PVQ21-ITEMS-ES-CO]` (runway 3-6 meses; bloquea Phase 2).

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
