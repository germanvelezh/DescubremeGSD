# BACKLOG — DescubreMe (priorizado)

**Owner:** German Velez Hurtado.
**Ultima actualizacion:** 2026-06-07 (Claude Code — cierre Plan 01-05 / Wave 2 cerrada; Hard Gate 1 Auth Hook signature aplicado verbatim).
**Prioridad:** P0 (bloquea ahora) · P1 (prerequisito de una fase cercana) · P2 (necesario, no inminente) · P3 (deseable / futuro).
**Owner del item:** Cowork (research/producto) · CC (Claude Code, implementacion) · Adaptacion (proceso ITC con humanos) · German (decision/negociacion).

> Consolida las "carries" dispersas en los documentos. Si descubres un gap nuevo, anadelo aqui con su flag `[GAP-...]`. Fuente de verdad de pendientes del proyecto.

---

## P0 — Bloquea ahora

- (vacio) Ningun item bloquea el arranque de GSD.

---

## P1 — Prerequisito de una fase cercana

| Flag | Pendiente | Producto/Fase | Owner | Nota |
|---|---|---|---|---|
| `[GAP-PVQ21-ITEMS-ES-CO]` | Extraer/verificar los 21 items de PVQ-21 en es-CO desde fuente validada (ESS espanol / Castro Solano y Nader 2006) + decidir variante de genero | Free / Fase 2 | Cowork + Adaptacion | No inventar; NoDerivatives sobre adaptacion |
| `[GAP-PVQ21-ANCHORS-ES-CO]` | Verificar las 6 anclas verbales es-CO de PVQ-21 verbatim | Free / Fase 2 | Cowork | Analogo a RESPONSE_ANCHORS_es-CO |
| `[GAP-IKIGAI9-ITEMS-ES-CO]` | Adaptacion formal es-CO de los 9 items de Ikigai-9 (ITC 2017: traduccion doble, retrotraduccion, panel, piloto cognitivo) + permiso de autores | Ikigai / Fase 5 | Adaptacion + German | No existe validacion es; items EN publicos (Fido 2020) |
| `[GAP-IKIGAI9-ANCHORS-ES-CO]` | Anclas es-CO (escala 5 puntos) de Ikigai-9 | Ikigai / Fase 5 | Cowork + Adaptacion | Verbatim de fuente |
| ~~`[GAP-AUTH-HOOK-API]`~~ | **CERRADO 2026-06-05 (signature verificada RESEARCH §Gate 1 docs verbatim) + APLICADO 2026-06-07 (Plan 01-05 Task 2):** `supabase/migrations/005_jwt_auth_hook.sql` con `org_ids := '{}'` Phase 1 B2C-only + Phase 4 extension documentada como comment + GRANT execute supabase_auth_admin + REVOKE authenticated/anon/public; `supabase/config.toml` `[auth.hook.custom_access_token]` enabled=true. **Hard Gate 1 RESOLVED HIGH.** | Fundacion / Fase 1 | — | Resuelto |
| ~~`[GAP-RLS-JSONB]`~~ | **CERRADO 2026-06-05 (plan-phase 1):** operadores jsonb con `(select auth.jwt())` wrapping verificados en RESEARCH.md §Gate 2 (docs + benchmark 99.94% improvement). Aplicado en Plan 01-04. | Fundacion / Fase 1 | — | Resuelto |
| ~~`[GAP-SUPABASE-REGION]`~~ | **CERRADO 2026-06-05 (discuss-phase 1):** us-east-1 lockeada en `01-CONTEXT.md` D1.1. CCM Supabase queda para Phase 7. | Fundacion / Fase 1 | — | Resuelto |
| `[GAP-TAILWIND-V4-COMPAT]` | Verificar compat Tailwind CSS 4.x + `ui-ux-pro-max-skill` (config CSS-first vs `tailwind.config.js`) | UX transversal / Fase 1 (resolver) + Fase 6 (consolidar) | CC | Si incompat, quedarse en v3 |
| `[GAP-RIASEC-NARRATIVES-ES-CO]` | 120 plantillas narrativas top-3 RIASEC + 6 dimensionales para matices composicionales en es-CO neutral. Cada plantilla 2-4 lineas, tono cuidado anti-determinismo. Seeded en tabla `narrative_template`. | Fundacion / Fase 1 | Cowork | Bloquea deploy del reporte fase 1. Sin esto, frase reveladora cae a fallback generico. |
| `[GAP-ONET-OCCUPATIONS-LATAM]` | Curar 50-100 ocupaciones LATAM-relevantes con RIASEC code + nivel educativo + 1 frase descriptiva es-CO. Subset adaptado del catalogo O*NET US. Seeded en tabla `occupation`. | Fundacion / Fase 1 | Cowork | Bloquea deploy del reporte fase 1. Sin esto, "ocupaciones sugeridas" cae a O*NET US literal (nombres torpes en es-CO). |
| ~~`[GAP-AWS-KMS-SETUP]`~~ | **CERRADO 2026-06-06 (Plan 01-01 Task 1):** German provisiono cuenta AWS dedicada `descubreme-prod` (account ID ending ...2030) + Identity Provider OIDC `oidc.vercel.com/germanvelezhs-projects` + KMS key `alias/descubreme-prod-pii-kek-v1` (symmetric, single-region, rotacion anual) + IAM role `descubreme-prod-encrypt` con trust policy (StringEquals aud + StringLike sub para production+preview) + permission policy inline (4 ops KMS) + key policy del KMS lista el role como key user. `AWS_ROLE_ARN` + `AWS_REGION=us-east-1` guardados en `~/secrets/descubreme/.env.secrets`. | Fundacion / Fase 1 | — | Resuelto |
| `[GAP-CONSENT-TEXT-V0.1]` | Claude Code redacta v0.1 del texto de consent (general + sensitive_data) basado en COMPL-04 + us-east-1 + 5 subprocesadores. Cowork revisa antes de deploy. | Fundacion / Fase 1 | Claude Code (draft) + Cowork (review) | Revision legal formal externa queda para Phase 7. |

---

## P2 — Necesario, no inminente

| Flag | Pendiente | Producto/Fase | Owner | Nota |
|---|---|---|---|---|
| `[GAP-IKIGAI9-CFA-LOCAL]` | Confirmar dimensionalidad de Ikigai-9 (3 factores vs. unifactorial) en muestra es-CO; mientras tanto reportar puntaje global | Ikigai / Fase 5 | Cowork + CC | UK=1 factor, Japon/Alemania=3 |
| `[GAP-EDGE-CRON-LIMITS]` | Verificar limites de cron Edge Functions Supabase (frecuencia, max duration) para `aggregate-tenant` antes de implementar | B2B / Fase 4 | CC | Funcion expira con orgs grandes → agregados B2B quedan stale sin alerta |
| `[GAP-STRIPE-COP-SANDBOX]` | Verificar Stripe Adaptive Pricing + COP funcionando en sandbox antes de comprometerse a arquitectura de pricing | Paid / Fase 3 | CC + German | Fallback: dual pricing (`paid_usd` + `paid_cop`) seleccionado por `Vercel geo.country` en middleware |
| `[GAP-PACK-PGI]` | Implementation pack de PGI (Personal Growth Initiative) si se usa standalone en B2B | B2B / Fase 4 | Cowork | Hoy PGI entra combinado en lentes |
| `[GAP-PACK-PVQRR]` | Revisar textos §5.A HOV del pack PVQ-RR tras reasignacion FAC -> Conservacion (ver `PVQ-RR_HOV_PARTITION_VALIDATION_v1.0.md`) | Paid/B2B / Fase 3-4 | Cowork | Alcance probablemente menor |
| `[GAP-MICROCOPY-FASE1]` | Microcopy es-CO definitivo para pantalla "Antes de comenzar" (D2.5), pantalla "Tu reporte esta listo" (D2.3), email transaccional (D3.7), survey de feedback (D3.4), footer anti-determinismo (D3.11), ficha tecnica (D3.10) | Fundacion / Fase 1 | Cowork (UX writer) | Plantillas Claude Code en plan-phase; Cowork pulir antes de deploy. Extender `UX_EXPERIENCE_SPEC.md` con sub-spec O*NET. |
| Sub-specs por producto | Specs detalladas Free/Paid/B2B/Ikigai si se requieren (gran parte ya en PRD + UX spec) | Fases 2-5 | Cowork | Crear bajo demanda |
| Spec de experiencia B2B + dashboard | Experiencia del dashboard agregado anonimo (rol admin) | B2B / Fase 4 | Cowork | UX_EXPERIENCE_SPEC §14 lo deja como lineamiento |
| Textos finales por test | Hooks validados, frases reveladoras (capa 2), narrativa del integrador es-CO | Fases 2-3 | Cowork | Se redactan junto a cada pack |
| Piloto cognitivo es-CO | N=6-8 para instrumentos/anclas nuevos (PVQ-21, Ikigai-9) antes de go-live | Fases 2,5 | Adaptacion | Estandar del proyecto |

---

## P3 — Deseable / futuro

| Flag | Pendiente | Producto/Fase | Owner | Nota |
|---|---|---|---|---|
| `[FIX-ROADMAP-COUNT-37-38]` | `.planning/ROADMAP.md` L373 reporta "37" requirements para Phase 1 en tabla de distribucion; lista enumerada L31 contiene 38 IDs. Cosmetico, no afecta planning/execute. | Transversal | CC | Detectado por plan-checker durante plan-phase 1 (no bloqueante). |
| `[ACCEPTED-RISK-UPSTASH-GLOBAL]` | Upstash Redis aprovisionado en Plan 01-01 quedo tipo **Global** (no Regional) por defecto del UI de Upstash en cuentas nuevas free tier — Regional ya no se ofrece como opcion visible. Funcionalmente equivalente para nuestro rate limit (counter increment + TTL), con +10-30ms de latencia por overhead de replicacion cross-region. Free tier identico (10K cmd/dia). | Fundacion / Fase 1 (live), revisitable Phase 3+ | German + CC | Aceptado para MVP. Migration path: si Phase 3+ muestra latencia issue en magic-link hot path, Upstash permite export/import a una instancia Regional sin downtime mayor. |

---

## P2/P3 — Fase 7 (Legal & Licencias) — diferido por diseno

| Pendiente | Instrumentos | Owner | Nota |
|---|---|---|---|
| Cierre de licencia comercial | BFI-2 (Soto-John), VIA-IS-P (VIA Institute), PVQ-RR/PVQ-21 (Schwartz), WDQ-40 (cadena APA/autores/editor), Ikigai-9 (Imai et al.) | German + Cowork (pitch) | Cada uno con plan-B abierto listo |
| Confirmar uso comercial de los abiertos | PERMA, SWLS, Ryff, PANAS, MLQ, WAMI, CMWS, UWES-9, BPNSFS, FSS-9, MEMS, CFI-R, PGI | Cowork | Uso academico amplio; confirmar comercial |
| Revision legal Ley 1581 | Toda la plataforma (firmada antes de GA Free) | German + asesor legal | Privacidad-by-design ya continua desde fase 1 |
| Presupuesto de licencias | Cash flow | German | Costos por titular |

---

## Riesgos abiertos (seguimiento)

| ID | Riesgo | Estado |
|---|---|---|
| R-01 | Licencia de valores (todas las formas Schwartz requieren permiso; plan-B debil) | Vivo; gestionar en fase 7 |
| R-03 | Ikigai-9 sin adaptacion es-CO validada | Dossier+pack listos; adaptacion pendiente (P1) |
| R-04 | Experiencia "magia" no se logra (efecto Barnum) | Mitigar con piloto temprano + integrador |
| R-05 | Riesgo cultural Ikigai (Venn != ikigai japones) | Disclaimer especificado en dossier/pack Ikigai-9 |

---

## Hecho recientemente (para contexto)

- 2026-06-05: reinicio v2.0 (docs funcionales, UX spec, arquitectura). Carpetas sin prefijo numerico. PVQ-21 y Ikigai-9 (dossier+pack). Ver `estado/STATUS.md`.
- 2026-06-05: `/gsd-new-project` ejecutado (init GSD, 8 artefactos en `.planning/`). Ver ADR-001..ADR-005.
- 2026-06-05: `/gsd-discuss-phase 1` completo. 32 preguntas en 4 areas, 28 decisiones lockeadas. CONTEXT.md + DISCUSSION-LOG.md en `.planning/phases/01-*/`. Ver ADR-006 (AWS KMS).
- 2026-06-05: `/gsd-plan-phase 1` completo (auto-chain). RESEARCH (2219 ln) + VALIDATION + UI-SPEC (6/6 dim PASS) + PATTERNS (~95 archivos clasificados) + 12 PLAN.md + SKELETON.md. plan-checker: PLANS APPROVED, 38/38 REQ IDs cubiertos. 2 gates cerrados (`[GAP-AUTH-HOOK-API]`, `[GAP-RLS-JSONB]`); 1 ASSUMED (`[GAP-TAILWIND-V4-COMPAT]` cierra con ADR-008 en Wave 0).
- 2026-06-06: Plan 01-01 Task 1 (checkpoint humano provisioning) cerrado. 6 servicios externos PROVISIONED (Supabase us-east-1, Vercel descubreme-gsd con OIDC Team mode, AWS descubreme-prod con KMS+IAM role+OIDC trust, Resend descubreme.co domain verified, Upstash Redis Global us-east-1, Sentry descubreme/descubreme-web). `[GAP-AWS-KMS-SETUP]` CERRADO. Nuevo `[ACCEPTED-RISK-UPSTASH-GLOBAL]` P3 anotado. Plan 01-01 Task 2 entrego `.env.example`, README "Phase 1 Quickstart", `.gitignore` hardening, STATUS+BACKLOG actualizados.

`Nota:` cuando exista `estado/CHANGELOG.md` y `DECISIONS_LOG.md`, el historico detallado y los ADR migran alli; este bloque queda solo como puntero corto.
