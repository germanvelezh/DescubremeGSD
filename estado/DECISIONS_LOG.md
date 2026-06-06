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

*Fin de DECISIONS_LOG. Anadir ADR nuevo al final, con numero incremental, fecha y owner. Migrar decisiones no triviales desde `.planning/STATE.md` al cierre de cada sesion (CLAUDE.md §4).*
