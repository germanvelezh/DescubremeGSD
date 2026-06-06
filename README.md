# DescubreMe — MVP (v2.0)

Plataforma web de autoconocimiento profundo para adultos LATAM. Integra instrumentos psicometricos validados y mapas ocupacionales O*NET en un motor unificado de perfilado. No es clinico ni diagnostico: es educativo, orientador y de desarrollo.

**Owner:** German Velez Hurtado (germanvelezh@gmail.com)
**Stack tecnico:** Next.js + Supabase (PostgreSQL) + TypeScript
**Sistema de desarrollo:** Claude Code + GSD (`@opengsd/gsd-core`, repo `open-gsd/gsd-core`)
**Sistema de diseno:** `ui-ux-pro-max-skill` (`nextlevelbuilder/ui-ux-pro-max-skill`)
**Idioma del producto:** espanol Colombia (es-CO) por defecto
**Estado:** Reinicio v2.0 sobre GSD (2026-06-05) — preparacion Cowork **completa**: documentos funcionales, `UX_EXPERIENCE_SPEC.md`, `arquitectura/`, dossiers+packs de PVQ-21 e Ikigai-9, y `estado/` (STATUS + BACKLOG) listos. Proxima accion: Claude Code corre `/gsd-new-project`. Pendiente para implementacion (no para arrancar): adaptaciones es-CO de PVQ-21 e Ikigai-9 — ver `estado/BACKLOG.md`.

---

## Que cambio en v2.0

El proyecto se reinicio alrededor de cuatro decisiones del owner. Las versiones v1.5 estan archivadas en `archivo/v1.5_pre_GSD/`.

1. **GSD como sistema de desarrollo.** El `PRD_MAESTRO.md` es la semilla unica de `/gsd-new-project`.
2. **Legal/licencias al ultimo sprint, sin bloquear el desarrollo.** Se construye con el mejor instrumento por constructo y plan-B abierto; lo legal se cierra en la fase 7.
3. **Best-test por constructo con plan-B abierto.** Instrumentos como metadata/plugin: el swap a plan-B es cambio de datos, no de codigo.
4. **Experiencia clase mundial como requisito de primer orden.** Cada test con hook; cada resultado simple y revelador; cada reporte un descubrimiento.

---

## Quick start para una sesion nueva

1. Lee `_MANIFEST.md` (estructura por tiers).
2. Lee `CLAUDE.md` (protocolo operativo).
3. Lee `PRD_MAESTRO.md` (fuente de verdad de producto, semilla GSD).
4. Lee `ROADMAP.md` (fases por valor).
5. Lee `estado/STATUS.md` y `estado/BACKLOG.md` (estado y pendientes).
6. Carga Tier 2 segun el dominio que toques.

---

## Productos del MVP

| Producto | Descripcion | Estado |
|---|---|---|
| **B2C Free** | 4 tests (BFI-2-S, O*NET IP-SF, PVQ-21, PERMA) + perfil integrado teaser (~12-18 min) | Disenado en PRD v2.0 |
| **B2C Paid USD 19** | Stack profundo + Motor de Perfil Integrador (~95-130 min) | Disenado en PRD v2.0 |
| **B2B-A** | Lentes configurables por necesidad + dashboard agregado anonimo | Disenado en PRD v2.0 |
| **Ikigai Premium** | Mapper integrador de proposito (add-on al Paid) | Requiere pack Ikigai-9 (gap) |

Stack completo por producto: `PRD_MAESTRO.md` §8.

---

## Flujo GSD (lo corre Claude Code)

```
/gsd-new-project        (semilla: PRD_MAESTRO.md + ROADMAP.md)
/gsd-discuss-phase N    (decisiones de la fase)
/gsd-plan-phase N       (research + plan, usa dossiers/packs)
/gsd-execute-phase N    (codigo en olas paralelas)
/gsd-verify-work N      (aceptacion manual)
/gsd-ship N             (PR)
/gsd-complete-milestone (cierre)
```

El repo es la fuente de verdad; los artefactos GSD (`.planning/`) son scratchpad de ejecucion. `Seguridad:` validar la legitimidad del paquete GSD antes de instalar.

---

## Fases (ROADMAP v2.0)

1. Fundacion + primer test "magia" (motor plugin + auth + 1 test E2E)
2. B2C Free (4 tests + perfil integrado teaser)
3. B2C Paid (stack profundo + Motor de Perfil Integrador)
4. B2B-A (lentes + dashboard agregado anonimo)
5. Ikigai Premium (mapper + disclaimer cultural)
6. Experiencia clase mundial (pulido, UX research, accesibilidad)
7. **Legal & Licencias** (revision Ley 1581, cierre de licencias, costos) — ultimo sprint

Cada fase entrega valor usable. Detalle en `ROADMAP.md`.

---

## Roles que esta carpeta atiende

| Quien | Que hace aqui |
|---|---|
| **Cowork (Claude desktop)** | Research psicometrico, PRDs, decisiones de producto, dossiers, UX spec, microcopy, adaptacion cultural, estrategia comercial |
| **Claude Code + GSD** | Implementacion (Next.js, Supabase, scoring, integrador, multi-tenant), tests, migraciones; mantiene STATUS/CHANGELOG/DECISIONS_LOG al cierre |
| **German (humano)** | Decisiones finales, priorizacion, validacion comercial, aprobacion de migraciones, negociaciones de licencia |

---

## Riesgos clave

1. **Riesgo de experiencia:** que los resultados se perciban genericos. Mitigacion: hooks por test, integrador como diferenciador, UX research temprano, fase 6 dedicada.
2. **Licencias (fase 7):** un instrumento propietario que no se pueda licenciar. Mitigacion: plan-B abierto listo por diseno; swap = cambio de metadata.
3. **Ley 1581 Colombia:** datos sensibles (afecto negativo, frustracion, animo) requieren NFR-27/28, cifrado, audit log, construidos desde la fase 1.
4. **Gap Ikigai-9:** no hay dossier ni pack; bloquea la fase 5 hasta producirlo.
5. **Riesgo cultural Ikigai:** el Venn de 4 circulos es de Zuzunaga/Winn, no ikigai japones (Hasegawa/Kamiya/Mogi). Disclaimer explicito obligatorio.

---

## Convenciones del proyecto

- **Espanol neutro** para documentacion interna. **Espanol Colombia** para interfaz al usuario.
- **Ingles** para terminos psicometricos sin traduccion consolidada.
- **APA 7** para citas. Si no hay fuente verificable: `[sin fuente verificada]`.
- **Decision docs** formato ADR (contexto, opciones, decision, consecuencias, reversibilidad).
- **Sin emojis** en ningun archivo del proyecto.
- Marcadores `Hecho:` / `Inferencia:` / `Opinion profesional:` para separar hechos de juicios.

---

## Documentos relacionados (fuera de esta carpeta)

- CLAUDE.md global del usuario en `/Users/germanvelez/Documents/Pruebas Proyectos Aprendizaje/Claude Context/`
- Research previo en `/Users/germanvelez/Documents/Autoconocimiento/`

---

## Phase 1 Quickstart

Setup local para desarrollo de Phase 1 (Fundacion + O*NET IP-SF skeleton).

### Prerequisitos

- **Node.js 20+** (`nvm install 20 && nvm use 20`)
- **pnpm 9+** o **npm 10+** (Plan 01-02 confirma el package manager)
- **Docker Desktop 24+** (para Supabase CLI local — opcional si trabajas directo contra DB remota)
- **Supabase CLI** (`brew install supabase/tap/supabase` o `npm i -g supabase`)
- **AWS CLI v2** (opcional, para debugging IAM/KMS: `brew install awscli`)
- **gh CLI** (opcional, para PRs: `brew install gh`)

### Cuentas externas requeridas

Los 6 servicios externos del stack estan documentados en `estado/STATUS.md`
seccion "Provisioning de servicios externos". Si vas a desarrollar local sin
deploy, necesitas como minimo:

1. **Supabase** project en `us-east-1` con extensiones `pgcrypto` + `pg_cron` habilitadas
2. **Resend** account con dominio verificado (para emails transaccionales en E2E)
3. **Upstash Redis** Regional en `us-east-1` (para rate limit)
4. **Sentry** project Next.js (para error monitoring)

AWS KMS y Vercel se pueden diferir en dev local:
- **AWS KMS**: usar `DEV_PII_SECRET` mock (`openssl rand -hex 32`) en `.env.local`.
  `lib/crypto/pii.ts` detecta automaticamente si `AWS_ROLE_ARN` esta vacio.
- **Vercel**: solo necesario para deploy. En local todo corre con `next dev`.

### Bootstrap

```bash
# 1. Clonar e instalar dependencias (despues de Plan 01-02 scaffold)
cd "MVP Descubreme GSD"
pnpm install   # o npm install

# 2. Configurar env vars locales
cp .env.example .env.local
# Edita .env.local con los valores reales obtenidos del provisioning.
# Secretos NO se commitean — viven en ~/secrets/descubreme/.env.secrets
# (fuera del repo, chmod 600) y en Vercel env vars para deploy.

# 3. (Opcional) Levantar Supabase local
supabase start              # arranca Postgres + Auth + Storage en Docker
supabase db push            # aplica migraciones 001-009

# 4. Dev server Next.js
pnpm dev                    # http://localhost:3000

# 5. Tests
pnpm test                   # unit tests con Vitest
pnpm test:e2e               # Playwright E2E
```

### Estructura del codigo (objetivo Phase 1)

Despues de Plan 01-02 (scaffold), Wave 0 deja:

```
.
├── app/                      Next.js App Router (server + client components)
├── components/               UI components (Tailwind v4 + ui-ux-pro-max-skill)
├── db/                       Drizzle schema + migrations
├── lib/                      Server-side utilities (crypto, supabase, scoring)
├── public/                   Assets estaticos
├── tests/                    Unit + integration + E2E
└── ...                       Configs (tsconfig, drizzle, vitest, playwright)
```

Greenfield — antes de Plan 01-02 la carpeta solo tiene documentacion + `.planning/` (gitignored).

### Secretos: politica operacional

- **Nunca pegar secretos en chat / Slack / issues**. Los identificadores no-secretos (Project IDs, Team slugs, Account IDs) son aceptables.
- **Archivo privado:** `~/secrets/descubreme/.env.secrets` (fuera del repo, `chmod 600`, texto plano).
- **Repo:** solo `.env.example` con placeholders. `.env.local` y `.env*.local` estan en `.gitignore`.
- **Vercel:** secretos via `vercel env add` o el dashboard (auto-encrypted at rest).
- **Rotacion:** API keys y tokens se rotan al menos cada 6 meses; ver Plan 01-10 Sentry rotation policy.

Para detalle de cuentas, IDs y arquitectura post-provisioning ver `estado/STATUS.md`.

---

*Ultima actualizacion: 2026-06-06 (Plan 01-01 Task 2).*
