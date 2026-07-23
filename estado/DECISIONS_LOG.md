# DECISIONS_LOG — DescubreMe

**Owner:** German Velez Hurtado.
**Formato:** ADR (Architecture/Architecture Decision Record): contexto + opciones + decision + consecuencias + reversibilidad + referencia.
**Convencion:** un ADR por decision no trivial. Ordenadas cronologicamente. Owner del ADR entre parentesis al final del titulo.

> Este archivo es la fuente de verdad durable de decisiones del proyecto. Los `.planning/*` son scratchpad GSD; cualquier decision relevante migra aqui al cierre de sesion (CLAUDE.md §4). Para decisiones de producto/research, formato ADR. Para tecnicas, formato ADR. Comerciales y legales tambien.

---

## ADR-022 — Plan-B PVQ-RR como 4o instrumento de valores del B2C Free (Phase 2), reporte a nivel 4 HOV (2026-06-12) (German + Claude Code)

**Contexto:** El B2C Free necesita un test de valores como 4o instrumento (junto a O*NET, BFI-2-S, PERMA). El ROADMAP y el PRD asumian **PVQ-21**, pero `[GAP-PVQ21-ITEMS-ES-CO]` + `[GAP-PVQ21-ANCHORS-ES-CO]` siguen abiertos (Cowork no ha producido la adaptacion formal ITC 2017 + permiso de los items/anclas es-CO). El ROADMAP define un hard gate explicito para Phase 2: "`[GAP-PVQ21]` cerrado O plan-B PVQ-RR/TwIVI activado por decision documentada". CLAUDE.md (decisiones v2.0 #2/#3) manda construir con el mejor instrumento disponible + plan-B abierto, sin bloquear el desarrollo por adaptacion/licencia.

**Opciones consideradas (decision de German via AskUserQuestion en `/gsd-discuss-phase 2`):**

- **A. Activar plan-B PVQ-RR ahora.** PVQ-RR ya tiene traduccion es-CO autorizada (Schwartz & Cieciuch 2022, OSF `osf.io/w9as3/`, NoDerivatives) con evidencia psicometrica en muestra Colombia (N=410, HOV alpha>.70) + 66 textos es-CO de interpretacion en el pack §5. Los 4 tests + teaser de 4 dimensiones salen completos en Phase 2.
- **B. Andamiar PVQ-21 tras un flag.** Lanzar 3 tests + teaser de 3 dimensiones ahora; activar valores por seed cuando Cowork entregue la adaptacion. Teaser inicial mas pobre.
- **C. Esperar a Cowork.** No planear Phase 2 hasta cerrar `[GAP-PVQ21]`. Contradice el principio de no-bloqueo; bloquea el arranque indefinidamente.

**Decision: Opcion A** — la familia **PVQ-RR** es el instrumento de valores del Free. Satisface el hard gate del ROADMAP por decision documentada. El motor lo trata como metadata (principio plugin): un swap futuro a PVQ-21 sera cambio de seeds, no de codigo.

**Correcciones tecnicas (advisor, verificadas contra el pack PVQ-RR durante la sesion):** la primera redaccion del CONTEXT traslado por error la estructura de PVQ-21 a PVQ-RR. Hechos correctos:
- PVQ-RR = **57 items, 19 valores refinados, 4 valores de orden superior (HOV)**, Likert 1-6 clave directa. NO "10 valores / ~21 items".
- **Nivel de reporte Free = los 4 HOV** (Self-transcendence, Conservation, Self-enhancement, Openness to change) — es el nivel validado en Colombia (HOV alpha>.70; solo 14/19 facetas alpha>.60; Conservation CFA CFI<.90).
- **MRAT centering es un transform NUEVO**, NO reuso de `lib/scoring/ipsative.ts`: el pack §4 lo rechaza explicitamente (la ipsativa O*NET divide por SD intra-perfil; MRAT resta una constante = media de TODAS las respuestas crudas, sin dividir por SD; denominador = vector completo de items). Rollup a HOV = media (no suma). Reporte como prioridades relativas, nunca medias absolutas (no-invarianza escalar documentada).
- Las narrativas es-CO por banda **ya existen en los packs §5** (PVQ-RR 66/66, BFI-2-S, PERMA) — sembrarlas es implementacion (Claude Code), no research nuevo de Cowork.

**Punto OPEN (lo resuelve el research de `/gsd-plan-phase 2`):** el PVQ-RR completo (57 items) no cabe en el budget Free de 12-18 min (O*NET 60 + BFI-2-S 30 + PERMA 23 ya ~113 items). MRAT exige el vector completo de items, asi que subsetear no es trivial. El researcher debe elegir entre (a) PVQ-RR completo recortando tiempo en otro lado, (b) forma reducida defendible que preserve HOV + MRAT, o (c) **TwIVI** (20 items, el Plan-B documentado en el pack §6). Si se elige TwIVI, el reuso Free->Paid (mapeo al PVQ-RR del Paid) deja de ser trivial.

**Consecuencias:**
- `[GAP-PVQ21-ITEMS-ES-CO]` y `[GAP-PVQ21-ANCHORS-ES-CO]` **dejan de bloquear Phase 2**; quedan vivos solo para un eventual swap a PVQ-21.
- Nuevo GAP genuino: `[GAP-TEASER-CROSS-TEMPLATES-ES-CO]` P1 (Cowork) — plantillas de cruce inter-instrumento del teaser (ningun pack las cubre).
- Phase 3 (Paid) usa el PVQ-RR completo; la identidad canonica de items del Free se alinea a la forma larga (si Free usa PVQ-RR; si usa TwIVI, ver punto OPEN).
- Licencia: PVQ-RR es Schwartz (CC BY-NC-ND, requiere permiso comercial) igual que PVQ-21 — el cierre de licencia (o swap a TwIVI abierto) es Phase 7, no bloquea fases 1-6.

**Reversibilidad:** alta. El instrumento es metadata/seed; cambiar PVQ-RR <-> PVQ-21 <-> TwIVI es cambio de `db/seeds/` + `product_stack`, sin tocar `.ts` (es justamente el examen del principio plugin de Phase 7).

**Referencias:**
- `.planning/phases/02-b2c-free-4-tests-perfil-teaser/02-CONTEXT.md` (D-GATE.1, D-C.1, D-E1.3, D-E2.1) + `02-DISCUSSION-LOG.md`.
- `implementation_packs/PVQ-RR_Implementation_Acquisition_Pack_v1.0_Consolidado.md` §1/§4/§5/§6; `dossiers/27_PVQ-RR_Consolidado.md`.
- `arquitectura/STACK_POR_PRODUCTO.md` §2; ROADMAP Phase 2 hard gate.

---

## ADR-021 — Fix 5 verify-work: colision de namespace Tailwind v4 `--spacing-{tshirt}` vs `--container-*` (causa raiz de `[GAP-UI-QUALITY-PREVIEW]`) (2026-06-10) (German + Claude Code)

**Contexto:** Tras los 4 fixes de ADR-020 la navegacion E2E funcionaba pero el usuario reporto "el UI no esta bien" sin detalle (`[GAP-UI-QUALITY-PREVIEW]` P1). Screenshots desktop del 2026-06-10 mostraron un **colapso de layout catastrofico y global**: cada bloque de texto envuelto a una palabra por linea, botones colapsados a cajas de ~4px con el label desbordado, contenido comprimido a una columna central de ~64px. No era cosmetico ni residuo de los fixes previos.

Diagnostico empirico (compilando el CSS real desde fuente con `@tailwindcss/cli@4.3.0`, no por teoria): las utilities de sizing con nombres t-shirt emitian `max-width: var(--spacing-3xl)` (64px) en vez de `var(--container-3xl)` (48rem/768px), y `max-w-xs` → `var(--spacing-xs)` (4px) en vez de `var(--container-xs)` (20rem/320px). **Causa raiz:** UI-SPEC §11.1 definio la escala 8pt como tokens con nombres t-shirt `--spacing-xs: 4px` … `--spacing-3xl: 64px`. En Tailwind v4 las utilities `max-w-*`/`w-*`/`min-w-*` con nombres t-shirt resuelven contra el namespace `--spacing-*`, que **shadowea** `--container-*` cuando esos nombres existen. Asi, definir la escala 8pt con nombres t-shirt colapso todo contenedor de la app.

**Por que el Fix #3 de ADR-020 fue un no-op:** agrego `--container-3xs..7xl` al `@theme`, pero v4.3.0 **ya los trae por default** (verificado en `node_modules/tailwindcss/theme.css:333-345`). El namespace `--spacing-*` gana igual. Fix #3 redeclaro valores identicos a los defaults — exactamente por no recompilar y verificar el output. Esta es la leccion: probar la cura en CSS compilado, no asumir.

**Opciones consideradas:**

- **A. Quirurgico (17 callsites):** reescribir solo las utilities de sizing t-shirt (`max-w-3xl` → `max-w-[48rem]`, etc.) a valores arbitrarios. Conserva el vocabulario named (`gap-lg`, `p-md`). **Costo:** la colision sigue viva → footgun permanente; requiere un lint gate que PROHIBE utilities estandar comunes (`max-w-2xl`, `max-w-md`, `max-w-prose`, `w-md`) en todas las fases UI siguientes. Friccion recurrente en un proyecto que apuesta a UX clase mundial (decision v2.0 #4).
- **B. Raiz (~189 callsites + globals.css):** migrar la escala 8pt de nombres t-shirt a la escala numerica de v4 (`gap-lg` → `gap-6`, `p-md` → `p-4`, mapeo determinista xs→1 sm→2 md→4 lg→6 xl→8). El default `--spacing: 0.25rem` produce los mismos px exactos. Borrar los tokens `--spacing-*` custom Y el bloque `--container-*` no-op. Elimina el footgun para siempre; toda utility de sizing estandar funciona normal. **Costo:** desvia del vocabulario named de UI-SPEC §2/§11.1 (requiere corregir el spec); diff grande pero mecanico y compile-verificable.

**Decision: Opcion B** (eleccion explicita del usuario via AskUserQuestion 2026-06-10). El footgun de Opcion A — un lint-ban permanente de utilities estandar a traves de 4+ fases UI — pesa mas que el diff one-time de B en un proyecto con UX como requisito de primer orden. B ademas simplifica `globals.css`.

**Fix secundario (mismo commit):** `--font-sans: "Inter Variable"` se referenciaba pero la fuente nunca se cargaba (sin `next/font`, sin `@font-face`, sin dep) → caia a `system-ui`. UI-SPEC A14 pedia Inter Variable self-hosted. Cargada via `next/font/google` (self-hosted en build-time, sin request a Google en runtime → satisface A14 privacy); `--font-sans` ahora referencia `var(--font-inter)`.

**Verificacion (4 capas, no solo grep):** (1) CSS compilado de la fuente editada: `max-w-3xl`→`var(--container-3xl)`, spacing numerico `calc(var(--spacing)*N)` correcto, 0 orphans `var(--spacing-{tshirt})`; (2) computed styles en render local (localhost:3000, viewport 1280): `<main>` maxWidth 768px / actual 768px, CTA maxWidth 320px / actual 320px, padding 24/16/8px, `body` fontFamily = "Inter, Inter Fallback…"; (3) render visual de landing + BYS (la pagina mas rota, antes una-palabra-por-linea) — ambas correctas; (4) `tsc --noEmit` limpio. Codemod confirmado quirurgico: los unicos tokens removidos del diff fueron de la familia spacing (gap/p/m/space); sizing/text/rounded intactos.

**Consecuencias:**
- 28 archivos: `app/globals.css` (remueve bloques `--spacing-*` + `--container-*`, comentario actualizado, `--font-sans` → `var(--font-inter)`), `app/layout.tsx` (Inter via next/font), 26 `.tsx` (codemod spacing named→numeric).
- Las paginas DB-backed (test, signup, reporte, me/*) usan el mismo mecanismo CSS → curadas por el mismo fix; se confirman al re-correr el flujo en el preview.
- UI-SPEC §11.1 corregido (era la fuente del bug): documenta usar la escala numerica de v4 + warning explicito de la colision t-shirt.
- No se necesita lint gate (la causa raiz se elimino, no se mitigo).
- **Reversibilidad:** alta. Todo el cambio es codigo en la branch `verify/phase-1-deploy-strict`, reversible via `git revert`. No toca DB ni prod.

**Follow-up 2026-06-10 (hexagono preview, verificado en pantalla por el usuario):** con el layout ya correcto, el usuario detecto dos cosas en `components/ui/HexagonoRiasecPreview.tsx`: (1) las etiquetas E y A quedaban tapadas por las lineas del hexagono. Causa: el codigo posicionaba las etiquetas con `y - 8` (8px hacia arriba) en vez de "8px afuera del vertice" como pide UI-SPEC §6.8; para los vertices de abajo "arriba" es hacia adentro. Fix: posicion radial hacia afuera desde el centro (offset 14, las 6 etiquetas a radio 94 vs vertices a radio 80, `dominant-baseline=middle`, 14px text-primary semibold per spec) + viewBox expandido a `-12 -12 224 224`. (2) Decision de producto (eleccion del usuario via AskUserQuestion): la linea top-3 de arriba pasa de iniciales (`S · E · C`) a nombres completos es-CO (`Social · Emprendedor · Convencional`), reusando el mapa `FULL_NAMES` de `HexagonoRiasecFull.tsx`. Los 6 vertices siguen como iniciales. Es una desviacion menor del §6.8 ("solo top-3 letras") que mejora comprension sin romper el teaser (no muestra scores/narrativa/ocupaciones → COMPL-06/D2.3 intactos). La copy final es-CO la confirma Cowork. Verificado en render local (posiciones SVG a radio 94, sin overlap; top3 line = nombres).

**Referencias:**
- Branch: `verify/phase-1-deploy-strict`.
- Evidencia compilada: `node_modules/tailwindcss/theme.css:325` (`--spacing: 0.25rem`), `:333-345` (`--container-*` defaults).
- UI-SPEC: `.planning/phases/01-fundacion-o-net-ip-sf-skeleton-e2e-magia/01-UI-SPEC.md` §11.1 (lineas 1262-1268, tokens fuente del bug), §2 (escala 8pt), A14 (Inter self-hosted).
- Cierra `[GAP-UI-QUALITY-PREVIEW]` en BACKLOG.

---

## ADR-020 — Verify-work Phase 1 deploy-strict: 4 fixes iterativos + write-through-MCP a prod (2026-06-08 PM) (German + Claude Code)

**Contexto:** `/gsd-verify-work 1` se inicio contra Vercel Preview (no Production) per decision de usuario. Test 1 (Cold Start Smoke) escalo a 4 root causes secuenciales que bloqueaban el flow E2E `/ → /onboarding/before-you-start → /test/onet-ip-sf`. Cada root cause fue identificado, autorizado por el usuario, y fixeado en la sesion antes de avanzar al siguiente. Tres de los 4 fixes son cambios de codigo committed a la branch `verify/phase-1-deploy-strict`; uno es write-irreversible a prod Supabase.

**Opciones consideradas en cada decision:**

1. **Schema vacio en prod** (descubierto via `mcp__supabase__list_tables` retornando 0 tablas en `public`):
   - A. Aplicar 11 mig + 8 seeds AHORA via MCP dentro del verify-work (~10 min wall clock; sale del scope estricto).
   - B. Marcar verify blocked, abrir Plan 01-13 dedicado "apply-schema-to-prod-and-cowork-seeds" con ADR + security review + atomic commits separados via `/gsd-plan-phase`.
   - C. Pausar verify, cerrar UAT partial, resolver en proxima sesion.

2. **Tailwind v4 max-w-* token collision** (`--spacing-3xl: 64px` causaba `max-w-3xl: 64px` por fallback):
   - A. Agregar `--container-3xs..7xl` explicit al `@theme` block (additive, 20 lineas, no rompe nada).
   - B. Renombrar tokens custom `--spacing-{xs..3xl}` a algo no-colisionante (rompe ~100 callsites de `gap-lg`, `p-md`, `mt-sm` etc.).
   - C. Downgrade a Tailwind v3 (regresion arquitectonica grande).

3. **Next.js 16 cookies forbidden en Server Components** (`cookies().set()` en `lib/session/anonymous.ts:117` lanzando `Error: Cookies can only be modified in a Server Action or Route Handler` digest 4101590665):
   - A. Mover mint a middleware con pattern `request.cookies.set + response.cookies.set` (documentado por Next.js, mint visible en misma request via cookies() del SC + persiste al browser).
   - B. Convertir `/test/[code]/page.tsx` a Client Component que invoca Server Action de mint antes de render (rompe SC contract).
   - C. Crear Route Handler `/api/session/start` que el SC redirige antes de render (loop redirect potencial).

4. **Vercel framework preset incorrecto** (4 deploys previos en `main` fallaban con "No Output Directory named 'public' found"):
   - A. Crear `vercel.json` con `framework: "nextjs"` committed a la branch (portable, override del project setting via repo).
   - B. Cambiar Framework Preset en Vercel Dashboard (manual, no portable a otros environments del project).

**Decisiones:**

1. **Opcion A** (apply schema + seeds AHORA via MCP). Usuario autorizo explicitamente en AskUserQuestion: "Si, autorizo escribir a prod Supabase tzhhqaducmbxfebuyvnv (11 migrations + 8 seeds)". El classifier de Claude Code primero bloqueo el bulk apply pidiendo autorizacion granular — el AskUserQuestion satisfizo el threshold de consent explicit. Counts post-aplicacion verificados.
2. **Opcion A** (agregar `--container-*` explicit). Commit `2ae3740` en branch verify.
3. **Opcion A** (middleware mint). Commit `9542672` en branch verify + cleanup de `lib/session/anonymous.ts` para solo-read + throw on missing.
4. **Opcion A** (`vercel.json` committed). Commit `a2d4142` en branch verify.

**Consecuencias:**

- **Reversibilidad:**
  - Schema + seeds a prod: NO reversible automatico. Si Phase 2 quiere down-migration, requiere SQL manual. Mitigacion: documentado en BACKLOG `[GAP-VERIFY-PROD-WRITE-IRREVERSIBLE]` + las migrations son idempotentes (todas usan `IF NOT EXISTS` o son CREATE-only).
  - 3 commits en branch verify: reversibles via `git revert` o branch delete. Si los 4 fixes no llegan a main, hay que decidir merge strategy.
- **Trazabilidad:** los 4 fixes + el prod-write quedan en este ADR + CHANGELOG entry "Sesion 2026-06-08 PM" + UAT `setup_journal` + git history. La sesion paro antes de completar verify-work (18 tests pendientes) — `[GAP-VERIFY-TESTS-2-20-PENDING]` cubre el resto.
- **Mejor proceso para futuro:** El descubrimiento de prod schema vacio debio detectarse ANTES de `/gsd-verify-work` via un Plan dedicado "deploy-to-prod" entre `/gsd-ship` y `/gsd-verify-work`. La asumpcion implicita era "main pushea → Vercel deploya → Vercel runtime conecta a Supabase que ya tiene state listo", pero el `link` de Supabase nunca se hizo. **Lesson learned**: Phase 2 debe agregar checkpoint "supabase link --project-ref + supabase db push" como parte del primer plan que toca DB.

**Referencias:**
- Branch: `verify/phase-1-deploy-strict` en `github.com/germanvelezh/DescubremeGSD`.
- Commits: `a2d4142` (vercel.json), `2ae3740` (Tailwind v4 container scale), `9542672` (middleware cookie + anonymous.ts cleanup).
- Vercel Preview: `https://descubreme-gsd-git-verify-phase-1-e07f2b-germanvelezhs-projects.vercel.app` (auth required via vercel.com login).
- Supabase project: `tzhhqaducmbxfebuyvnv` (descubreme-prod).
- UAT state-of-truth: `.planning/phases/01-fundacion-o-net-ip-sf-skeleton-e2e-magia/01-UAT.md`.
- Vercel runtime log evidencia: digest `4101590665` (Next.js 16 cookies) + digest `1417863217` (schema missing antes del fix #2).

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

## ADR-009 — Decisiones Wave 6: deletion flow + PII storage + Modal override (2026-06-07) (Claude Code, Wave 6 Plans 01-09 + 01-10 + Wave 8 Plan 01-12)

**Date:** 2026-06-07
**Status:** Accepted
**Context:** Wave 6 (Plans 01-09 + 01-10) produjo 5 decisiones no triviales que merecen ADR formal: (a) la introduccion de SECURITY DEFINER para bypassear el immutable trigger de audit_log; (b) la interpretacion de "≤2 clicks" en UI-SPEC §7.8; (c) el descubrimiento de [GAP-DELETE-ATOMIC-TX] en Plan 01-10 y su fix path; (d) el descubrimiento de [BUG-PII-STORAGE-PLAN-07] en Plan 01-10 Task 1 y su fix path; (e) el override del PLAN.md original Plan 01-10 que afirmaba "Radix instalado" contra UI-SPEC §1 que lo prohibe. Documentar estas decisiones evita que plan-checker / verify-work las lea como deviation no documentada.

### §9.1 anonymize_user_audit SECURITY DEFINER + CI grep gate
Plan 01-10 mig 009 emitio `public.anonymize_user_audit(uuid)` SECURITY DEFINER con `SET search_path = public, pg_temp` (defense vs injection; pg_temp appended last para que objetos user no shadowen public) + GRANT EXECUTE solo a service_role + REVOKE a public/anon/authenticated. Internals: DISABLE trigger audit_log_no_modify -> UPDATE actor_id=NULL -> ENABLE trigger; analogous para usage_log + distress_event. Defense-in-depth complementaria en este Plan 01-12: tests/lint/audit-modification-callers.test.ts asegura que solo app/api/me/data/route.ts invoca la funcion (grep gate). Reversibility: media.

### §9.2 Conteo "≤2 clicks" para COMPL-07 deletion UX
UI-SPEC §7.8 lineas 906-913 definen "≤2 clicks" como: link `/me/data -> /me/delete` (click 1) + button `Borrar mi cuenta` en `/me/delete -> modal` (click 2). El modal de confirmacion intermedio NO se cuenta — es safety net D1.5 anti-borrado-accidental, no obstaculo recursivo. Opciones consideradas: A. interpretacion estricta "1 click destruye" (descartada por riesgo de borrado accidental); B. 2 clicks visibles + modal safety net (adoptada). Reversibility: media (refactor 2 pantallas).

### §9.3 delete_user_account SECURITY DEFINER atomic cross-schema (Plan 01-12 mig 010)
Plan 01-10 Task 1 implemento DELETE /me/data en dos fases NO atomicas: (1) anonymize via SECURITY DEFINER + DELETE public.user dentro del flujo Postgres, (2) FUERA del flujo: `supabase.auth.admin.deleteUser` contra auth schema separado de Supabase. Si (2) falla tras (1): orphan row en auth.users sin contraparte public.user. Riesgo aceptado documentado en SUMMARY 01-10. Fix Plan 01-12: emitir mig 010 con `public.delete_user_account(uuid)` SECURITY DEFINER que ejecuta anonymize + DELETE public.user + DELETE auth.users en UNA SOLA transaction Postgres. El handler de Plan 01-10 cambia de `db.transaction(...)+supabase.auth.admin.deleteUser(...)` a `supabase.rpc('delete_user_account', ...)`. Opciones consideradas: A. dos transactions separadas (estado actual, rechazado por orphan risk); B. SECURITY DEFINER atomic (adoptado); C. eventual consistency + cleanup cron (rechazado por complejidad operacional + ventana de inconsistencia visible al usuario). Decision: B. Reversibility: media (revertir requiere refactor route handler).

### §9.4 PII storage envelope full jsonb (Plan 01-12 mig 011)
Plan 01-10 Task 1 descubrio que el schema actual `user.{name,date_of_birth}_ciphertext bytea + _dek_ciphertext bytea` (Plan 01-04 + 01-07) NO permite reconstruir un EncryptedField completo: decryptPII necesita ademas IV, GCM auth tag, key id (kid), y version (v) que encryptPII produce. Consecuencia: GET /me/data degrada DOB+name a null con logger.warn. Cumple COMPL-05 estructuralmente pero el campo viene vacio. Fix Plan 01-12: mig 011 migra a columna `_encrypted jsonb` que persiste el EncryptedField verbatim con shape `{v, kid, edk, iv, ct, tag}` (per `lib/crypto/pii.ts`). Opciones consideradas: A. anadir 4 columnas bytea separadas iv/tag/kid/v (descartada por verbosidad + migration extra al rotar key version); B. consolidar a jsonb (adoptada por flexibilidad para key rotation sin migration extra). Safe wipe+repopulate (no hay usuarios prod aun); riesgo residual: si llega a aplicarse prod con usuarios, perdida de PII; mitigacion: confirmar 0 users antes de prod push (checkpoint manual, NO automatable). Reversibility: baja (revertir requiere preservar usuarios y re-encrypt round-trip).

### §9.5 Modal sin Radix — override del PLAN.md Plan 01-10
PLAN.md original Plan 01-10 afirmaba "Radix instalado en Plan 01-02" — falso. Verificacion: package.json no incluye Radix; UI-SPEC §1 lineas explicitamente prohiben Radix ("componentes a mano, sin Radix/Headless UI"). Decision Plan 01-10: implementacion custom `components/ui/Modal.tsx` con focus trap + scrim rgba(15,20,25,0.5) + variants default/destructive (destructive desactiva Escape como safety). Razon del override: UI-SPEC §1 es LOCKED contract; PLAN.md text dependia de premise no verificada. Reversibility: alta (swap a Radix Dialog en Phase 2/UI polish si justifica trade-off de bundle size).

**Consequences globales:** cierra Wave 6 con todos los GAPs P1 documentados. Sin ADR-009 el plan-checker no puede distinguir entre decisiones intencionales y deviation no documentada. Plan 01-12 cierra mecanicamente los 2 GAPs P1 via migrations 010 + 011 + lint.

**Reference:** Plan 01-09 SUMMARY, Plan 01-10 SUMMARY, Plan 01-12 (este plan), UI-SPEC §1 + §7.8, BACKLOG.md [GAP-DELETE-ATOMIC-TX] + [BUG-PII-STORAGE-PLAN-07], lib/crypto/pii.ts, supabase/migrations/009/010/011, components/ui/Modal.tsx.

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

## ADR-019 — Crosswalk RIASEC seed `occupation` toma O*NET OnLine 2026 verbatim sobre ejemplos calibratorios del Prompt 4 — (2026-06-08) (Cowork delivery + Claude Code review, Cowork delivery checkpoint Phase 1)

**Contexto:** el Prompt 4 (`estado/COWORK_PROMPTS_FASE1.md` §Prompt 4) incluyo ejemplos calibratorios para varias dimensiones RIASEC (ej. "Software Developers RIC JZ4", "Singers 27-2031.00 AES JZ3", "Registered Nurses ISA JZ4"). Cowork al curar el seed contra O*NET OnLine explore-by-interest 2026-06-08 descubrio que el crosswalk RIASEC actual de O*NET difiere en varios casos de mi memoria ("clasicos de Holland"). Tension: usar mis ejemplos verbatim vs ir a la fuente.

**Opciones evaluadas:**
1. Usar los ejemplos del Prompt 4 verbatim, incluso si O*NET 2026 marca high-point distinto.
2. **Usar O*NET OnLine 2026-06-08 verbatim como fuente de verdad; omitir o reclasificar las ocupaciones del prompt que no calzan.**
3. Forzar tercera letra cuando O*NET solo publica 1-2 (para encajar el patron "3 letras MAYUSCULAS" mas estricto).

**Decision:** Opcion 2 (O*NET 2026 verbatim).

**Correcciones aplicadas al seed:**
- **Software Developers omitido** — O*NET 2026 marca C/I-first, no R-first. Bonus: evita sobre-representar tech.
- **"Cantante" usa `27-2042.00`** (Musicians and Singers, AE, JZ4), no `27-2031.00` (esto ultimo es Dancers).
- **Registered Nurses = S-first (SCI, JZ4)**, no I-first.
- **Chief Executives** (EC, JZ5) y **Lawyers** (ECI, JZ5) confirmados E-first → incluidos como "Director/a general" y "Abogado/a".
- **Ingenieros civil/mecanico/electrico R-first (RIC, JZ4)**; **Industrial Engineer C-first (CIR, JZ4)** — distincion preservada.
- `riasec_code` conserva 1-3 letras verbatim de O*NET. Donde la fuente solo publica 1 letra (ej. Bombero/a = "R") no se rellena con tercera letra inventada. El selector (`lib/report/occupation-selector.ts`) filtra por substring del top-3 del usuario; funciona igual.

**Consecuencias:**
- El seed es defendible psicometricamente (cita fuente + fecha de extraccion en el header del SQL).
- Algunos ejemplos del prompt no calzaron — el prompt afinado en `estado/COWORK_PROMPTS_FASE1.md` §Prompt 4 queda con esos errores residuales para futuras sesiones. **Anotacion:** si se re-genera el seed en Phase 2 o Phase 3, releer este ADR antes de copy/paste de los ejemplos del prompt.
- Validez limitada cross-cultural: el crosswalk de intereses de O*NET esta normado en EE.UU. La afinidad RIASEC→ocupacion es orientativa, NO equivalente psicometrico local LATAM. El uso en Capa 3 es como **ejemplos por afinidad**, jamas prescripcion de carrera ni prediccion individual (cumple D3.11 anti-determinismo).
- Salud no clinica: el seed incluye `Fisioterapeuta`, `Fonoaudiologo/a`, `Psicologo/a` (sin "clinico"), `Educador/a en salud`. Pasan el lint glossary (regex bloquea "trastorno"/"patologia"/"diagnostico"/"sintoma"/"depresion"/"ansiedad clinica" pero permite nombres de profesiones legitimas).

**Reversibilidad:** Alta. Re-export del seed desde fuente nueva (otro crosswalk, baremo LATAM, etc.) es un rebuild del .sql sin codigo asociado.

**Referencia:**
- `db/seeds/occupations/LATAM/seed.sql` header (fuente + fecha extraccion).
- `estado/COWORK_PROMPTS_FASE1.md` §Prompt 4 (con ejemplos calibratorios que NO sobreviven al crosswalk real).
- O*NET OnLine — Explore by Interest, O*NET-SOC 2019 + Job Zones. https://www.onetonline.org/explore/interests/

---

## ADR-023 — Forma del 4o instrumento (valores) del Free = TwIVI + reconciliacion de su ruta de contencion (2026-06-12) (German + Claude Code, `/gsd-plan-phase 2` research sign-off)

Refina ADR-022 (que activo la familia PVQ-RR como instrumento de valores del Free, reporte a 4 HOV) resolviendo el punto OPEN que ADR-022 dejo: la **forma de administracion concreta** para el budget Free, y el **conflicto CONTEXT-vs-pack** sobre la ruta de contencion del instrumento de valores. Ambas decisiones se tomaron via `AskUserQuestion` durante el research de `/gsd-plan-phase 2`.

### Parte A — Forma de administracion = TwIVI (20 items)

**Contexto:** El PVQ-RR completo son 57 items (~12-15 min). El budget Free es 12-18 min y ya consume ~113 items (O*NET 60 + BFI-2-S 30 + PERMA 23 = ~13-15 min); el full 57 lo rompe ~2x. El MRAT exige el vector completo de items administrados como denominador (D-E1.3), asi que subsetear no es trivial. El research (`02-RESEARCH.md` §D-GATE.1) encontro ademas que el pack PVQ-RR §6.6 **excluye explicitamente el PVQ-RR del Free y designa TwIVI como el instrumento de valores Free**; a nivel 4 HOV TwIVI y un PVQ-RR reducido rinden granularidad identica.

**Opciones (decision de German):**
- **(a) Full PVQ-RR 57** — rechazada: rompe el budget ~2x.
- **(b) PVQ-RR reducido (~20)** — unica ventaja: conserva la identidad de items Free->Paid (D-E2.1). Pero es una forma corta SIN validar, mantiene el mismo bloqueador de licencia CC BY-NC-ND, y exige a Cowork seleccion de items + piloto + banding propio (gap mas pesado que TwIVI, sin ventaja de licencia).
- **(c) TwIVI 20** (Sandy, Gosling, Schwartz, Koelkebeck 2017) — validado (estabilidad .86; derivacion N=38,049), **licencia 100% libre** (sin bloqueador Phase 7), cabe en 5-7 min, rinde los 4 HOV, es la forma que el pack designa para Free.

**Decision: Opcion (c) TwIVI.** El motor se construye **form-agnostic** (TwIVI<->PVQ-RR = cambio de seed, no de codigo), honrando el principio plugin. MRAT centering aplica igual sobre el vector TwIVI (n=20).

**Consecuencias:**
- (+) Sin bloqueador de licencia para valores; forma validada; budget respetado; los 4 tests + teaser salen completos en Phase 2.
- (-) Se pierde el reuso opcional Free->Paid de valores (D-E2.1): Phase 3 (Paid) **re-administra** valores con el PVQ-RR completo en vez de proyectar por codigo. La identidad canonica de items se conserva solo para BFI-2-S (mismo codigo que BFI-2-60).
- (-) GAP nuevo `[GAP-TWIVI-ITEMS-ANCHORS-ES-CO]` P1 (Owner Cowork): stems es-CO de los 20 items TwIVI + anclas Likert + particion 10 valores basicos -> 4 HOV. Ningun pack los cubre (el pack §5 cubre textos de interpretacion HOV, que SI aplican). Bloquea el deploy del test de valores funcional, NO la maquinaria del plan.
- Cierra `[GAP-PVQ-RR-FREE-FORM]`. `[GAP-PVQ21-ITEMS/ANCHORS-ES-CO]` siguen vivos solo para un eventual swap futuro a PVQ-21.

**Reversibilidad:** Alta. Swap TwIVI->PVQ-RR reducido->PVQ-21 = cambio de seeds (instrument + items + scoring_rule + anclas), cero codigo, por diseno form-agnostic.

### Parte B — Ruta de contencion del instrumento de valores (reconciliacion §8)

**Contexto:** Conflicto CONTEXT-vs-pack que el research nombro (O-2). La CONTEXT (D-A.2) clasifica el instrumento de valores como `sensitivity=high` por **convicciones** (Ley 1581 Art. 5), NO `emotional_distress` -> sin modal NFR-27. El pack PVQ-RR (TRIGGERS + §5.2/§7.2) le asigna `emotional_distress` + un detector NFR-28 por **omision** de items sensibles. Omitir toda ruta de contencion toca CLAUDE.md §8 (no-negociable: mitigaciones para senales de malestar).

**Decision (German): Reconciliacion MVP.** El instrumento de valores (TwIVI): **sin modal NFR-27 pre-test** (per CONTEXT), pero **link discreto de contencion permanente en el footer + disclaimer post-test**. El **detector NFR-28 por omision se DIFIERE** (`[GAP-PVQRR-SKIP-FEATURE]`): es salvaguarda secundaria (pack §7.2), depende de una feature skip-item no construida, y ademas sus 15 items sensibles son PVQ-RR-especificos -> moot bajo TwIVI. **BFI-2-S y PERMA conservan modal NFR-27 + banner NFR-28 con thresholds completos** (numeros verbatim en `02-RESEARCH.md` §NFR-27/28; sembrados via flags decoupled `pretest_modal`/`contention_route`/`distress_detector` en plan 02-06/02-10).

**Consecuencias:**
- (+) Honra CLAUDE.md §8 (mitigacion presente via footer + disclaimer) sin sobre-construir; no exige feature skip-item en Phase 2.
- (+) Decoupla `pretest_modal` de `contention_route` en el modelo de datos (mejora reusable para Phase 3).
- (-) El detector por omision queda diferido; si un swap futuro vuelve a PVQ-RR completo, reevaluar `[GAP-PVQRR-SKIP-FEATURE]`.

**Reversibilidad:** Alta. Activar el detector = construir skip-item + seed `distress_detector=true` para el instrumento.

**Referencia:** `02-RESEARCH.md` §D-GATE.1 + §NFR-27/28 + §"Critical de-risk" (banding within-person); `02-CONTEXT.md` D-GATE.1 / D-A.2 / D-E2.1 [RESUELTO 2026-06-12]; ADR-022 (decision base PVQ-RR/4 HOV).

---

## ADR-024 — Match de instrument code: case-insensitive en runtime, SIN re-seed (2026-06-13) (German + Claude Code, Plan 02-18 gap-closure)

**Contexto:** El E2E autenticado real de 02-16 expuso un 500 user-facing vivo (`GET /test/TwIVI`): el runner uppercasea el code de URL (`code.toUpperCase()`) pero los lookups DB eran case-sensitive (`.eq("instrument.code", "TWIVI")`) contra seeds mixed-case (`TwIVI`, `PERMA-Profiler`; `ONET-IP-SF`/`BFI-2-S` ya upper, por eso "funcionaban"). Bloqueaba el tail autenticado + el scoring de TwIVI/PERMA.

**Opciones:** (1) case-insensitive en todos los sitios de match (`.ilike` en DB + compare CI en JS), sin tocar data; (2) normalizar seeds a un casing canonico (re-seed: toca instrument/version/product_stack/narrative/teaser); (3) dejar de uppercasear y resolver el code canonico desde la DB.

**Decision:** Opcion 1 (case-insensitive, sin re-seed). El casing del seed queda como canonico de display; solo el MATCH es CI. Blast radius minimo (3 archivos: authenticated.ts, anonymous.ts, score-on-done.ts), cero cambio de data, robusto a variantes de casing en URL. Los codes no llevan wildcards LIKE (`_`/`%`), asi que `.ilike` es match exacto-CI, no prefijo/substring (T-02-18-01).

**Consecuencias:** Production correcta (E2E verde lo prueba). Un mock unit de anonymous.test.ts quedo stale (esperaba `.eq`) -> arreglado en el mismo cierre (`[GAP-ANONYMOUS-TEST-MOCK-ILIKE]` cerrado).

**Reversibilidad:** Alta (cambio de operador localizado).

**Referencia:** `02-18-PLAN.md`; BACKLOG `[GAP-INSTRUMENT-CODE-CASING]`.

---

## ADR-025 — NFR-28 distress banner: cablear claves de threshold DERIVABLES; diferir item-level + BFI-facet (2026-06-13) (German + Claude Code, Plan 02-19 gap-closure)

**Contexto:** El banner prominente NFR-28 estaba dormido (`showContention=false` hardwired; el evaluador `evaluateDistressThreshold` y los `distress_thresholds` sembrados existian pero nadie los conectaba en el scoring/report path — stub conocido desde 02-08). CLAUDE.md decision-2 + §8: NFR-27/28 continuas desde fase 1, no-negociables. La RUTA de contencion del footer (link de crisis siempre presente) SI cubre el baseline; lo dormido era el surfacing proactivo por threshold.

**Opciones:** (a) sintetizar el scoreMap COMPLETO incluyendo claves item-level (`N1`/`N3`) -> requiere descomposicion item-level del scoring engine (open-ended, riesgo de 6o hallazgo); (b) cablear SOLO las claves DERIVABLES de lo que score-session ya computa (domain-means) y diferir item-level; (c) dejar dormido + footer route como baseline.

**Decision:** Opcion (b) — derivable-minimum. score-session sintetiza un scoreMap data-driven con claves derivables (`PERMA_total` agregado, `N_mean`, `Lon1`/`hap1` single-item), evalua los thresholds sembrados, y persiste `{showContention,severity}` en `report_snapshot.html_payload` (jsonb, SIN migracion). El report lo lee (data-driven, no hardwired). El evaluador ignora claves ausentes (actual==null -> false), asi que un subconjunto es CORRECTO: cubre TODO `moderate` (`PERMA_total<5.0 OR N_mean>6.5`) + la mayoria de `strong` (`Lon1>=8`, `hap1<=2`).

**Consecuencias:** NFR-28 prominente funcional (decision real per-score, banner dispara) con datos existentes, sin plumbing item-level. DIFERIDO + rastreado: `[GAP-NFR28-ITEM-LEVEL-TRIGGERS]` (claves item-level `N1`/`N3`) P2; distress de BFI DORMANT BY DESIGN en Phase 2 (thresholds facet-level, facetas son Paid) -> `[GAP-NFR28-BFI-FACET-DISTRESS]`. La UI renderiza la decision del server, nunca computa el threshold (T-02-08-02 intacto).

**Reversibilidad:** Alta (additive; activar item-level = ampliar el scoreMap synthesis).

**Referencia:** `02-19-PLAN.md`; `lib/ethics/distress.ts`; BACKLOG `[GAP-NFR28-ITEM-LEVEL-TRIGGERS]`.

---

## ADR-026 — UX/UI redesign direccion B "Cartografia interior": paleta dark + Instrument Serif supersede la decision light de 01-UI-SPEC §4/§11.1 (2026-06-14) (German + Claude Code)

**Contexto:** La app cumplia la FUNCION (psicometria, compliance NFR-27/28, a11y, i18n) pero la **capa de experiencia "clase mundial"** — declarada diferenciador #1 en CLAUDE.md §2.4 y especificada en `UX_EXPERIENCE_SPEC.md` — nunca se implemento. Las 5 pantallas del flujo Free eran estructuralmente identicas (una columna `max-w-3xl` centrada, `h1` de 30px, un boton azul); minimalismo por defecto, no por diseno. German pidio una auditoria UX/UI total + caminos de mejora con impacto. Auditoria entregada en `auditoria-ux-ui/AUDITORIA.md` con 3 direcciones mockeadas como landings reales.

**Opciones consideradas (eleccion de German via AskUserQuestion, viendo los 3 mockups renderizados):**
- **A. "Papel y tinta"** — editorial sereno (Fraunces + terracota sobre crema). Re-skin de bajo costo/riesgo, cabe en los tokens actuales sin componentes nuevos.
- **B. "Cartografia interior"** — nocturno con constelacion (Instrument Serif + oro sobre indigo). Se apoya en la metafora "constelacion/arquetipo" que la propia `UX_EXPERIENCE_SPEC §10.2` nombra como climax del integrador. Costo medio (modo oscuro + data-viz nueva).
- **C. "Bloques de caracter"** — editorial bold (Archivo, grids, numeros protagonistas). Maximo caracter, mayor costo.

**Decision: Opcion B, alcance flujo completo.** La mas diferenciadora y la mejor respuesta al dolor declarado ("no impacta a nadie"), construida sobre lo unico del producto (el cruce de dimensiones como mapa estelar).

**Implementacion (22 archivos + `components/Starfield.tsx`; 471 inserciones / 186 borrados):**
- **Tokens (`globals.css`):** paleta nocturna (dominante `#0C1226`, acento oro `#E6C16B`, texto bruma) — **supersede la paleta light 60/30/10 que 01-UI-SPEC §4 lockeo**. Tipografia Instrument Serif (display) + Hanken Grotesk (body) via `next/font` — **supersede Inter de 01-UI-SPEC §11.1 / ADR-021** (mantiene el self-host A14). Se definieron 2 **tokens fantasma** usados pero nunca declarados (`--color-background`, `--color-surface-secondary`) — sin ellos los headers sticky y los chips de disclaimer no tenian superficie en dark. Se resolvio la **conflacion de `--color-secondary`** (superficie elevada Y texto-sobre-acento) con un indigo oscuro que sirve ambos roles. **NO se toco** la zona `--spacing`/`--container` (cicatriz ADR-021).
- **Firma B:** constelacion (landing + `HexagonoRiasecFull` reescrito de poligono-relleno a estrellas+halos+ejes, a11y scaffold intacto), atmosfera estelar (`Starfield` determinista SSR-safe), motion orquestado con guard `motion-safe`/`prefers-reduced-motion`.
- **Dark-mode debt destapada (predicha por el advisor):** ~14 superficies usaban utilidades fuera del sistema de tokens (`bg-white`, `text-white`, `hover:bg-gray-50`) que el cascade no alcanzaba. Critico: `DisclaimerModal` (NFR-27) + `Modal` base tenian panel `bg-white` -> texto invisible en oscuro. Tokenizadas todas (modales de compliance, signup, `SurveyFeedback`, paginas `/me/*`). Los 2 botones destructive (borrar cuenta) se dejan en `bg-red-700` a proposito (rojo semantico, legible sobre noche).
- **Fix de presentacion:** el reporte mostraba `[GAP - Cowork delivery: catalogo de ocupaciones LATAM pendiente]` CRUDO al usuario; ahora la seccion se oculta entera hasta que el catalogo exista (sin placeholder visible).

**Verificacion:** `tsc --noEmit` limpio. App compila y renderiza limpia — cada pantalla verificada en navegador (dev server + screenshots); data-viz verificada en aislamiento con una ruta de preview throwaway (ya eliminada) + props mock. **La suite unit/lint NO corre en este worktree** por un fallo de bootstrap vitest/PostCSS (`Loading PostCSS Plugin failed: undefined is not a function`) **PRE-EXISTENTE** — reproducido en `main` sin el diff. No es regresion; el dev server compila el mismo `postcss.config.mjs` sin problema.

**Consecuencias:**
- **`01-UI-SPEC.md §4 (paleta) y §11.1 (tipografia) quedan desactualizados** — drift a reconciliar (igual que ADR-021 corrigio el spec). Owner del spec (Cowork) debe alinear o ratificar.
- Micro-textos de la estetica nueva (eyebrows, tagline del footer) son **placeholders de presentacion — copy de producto es lane de Cowork**, pendiente de validacion.
- `[BLOCKER-CI]` la suite unit/lint debe correrse en CI / entorno sano **antes del merge** (no pudo verificarse aqui por el entorno).
- Ortogonal a los bloqueadores tecnicos de Phase 2 (`[GAP-INSTRUMENT-CODE-CASING]` ya cerrado en ADR-024; deploy a prod) — este trabajo es capa de experiencia, no toca scoring/runtime.

**Reversibilidad:** Alta. Todo es codigo en la branch `claude/recursing-varahamihira-edf075`, reversible via `git revert`. No toca DB, seeds ni prod. Volver a light = revertir `globals.css` + `layout.tsx`.

**Referencias:**
- `auditoria-ux-ui/AUDITORIA.md` (diagnostico + 3 direcciones) + `auditoria-ux-ui/mockup-{A,B,C}-*.html` + screenshots.
- Branch `claude/recursing-varahamihira-edf075`. Supersede parcialmente ADR-021 (Inter -> Instrument Serif/Hanken).

---

## ADR-027 — Gancho del Free = personalidad (BFI-2-S); recomendacion O*NET filtrada por Job Zone; sin sexo/edad (2026-06-25) (German + Cowork)

**Contexto:** El primer test del B2C Free era O*NET IP-SF y su recomendacion ocupacional mezclaba niveles de preparacion (oficios de zona baja junto a roles profesionales). Causa raiz verificada en codigo: `lib/report/occupation-selector.ts` filtra solo por coincidencia RIASEC (top-3) e ignora `occupation.education_level` (= Job Zone), pese a estar sembrado en las 96 filas de `db/seeds/occupations/LATAM/seed.sql`. O*NET mide intereses, no nivel: el nivel se resuelve en un paso aparte (seleccion de Job Zone) que el codigo habia omitido (National Center for O*NET Development, s.f.; Rounds et al., s.f.). Ademas el owner cuestiono que O*NET fuera el gancho del Free para la audiencia profesional (P1/P2).

**Opciones consideradas (decision de German tras analisis Cowork con AskUserQuestion):**
- Gancho: (A) liderar con personalidad BFI-2-S; (B) mantener O*NET primero pero arreglado; (C) micro-gancho nuevo ~2 min.
- Ajuste de nivel: (1) inferir desde educacion/experiencia; (2) usuario elige Job Zone (metodo O*NET oficial); (3) hibrido (inferir + permitir ajuste).

**Decision:**
- Gancho = **Opcion A**: BFI-2-S (personalidad) pasa a ser el primer test del Free como gancho de identidad; la revelacion ocupacional se reposiciona dentro del teaser integrado, ya filtrada por Job Zone. Razon: en autoconocimiento el momento de identidad convierte mejor que una lista de empleos; no conviene liderar con el output mas debil; la personalidad es la mejor columna del cruce integrador.
- Ajuste de nivel = **Opcion 3 (hibrido)**: educacion + experiencia infieren la Job Zone; el usuario la ajusta ("con mi preparacion actual" vs "abierto a formarme mas"). Mapeo y reglas en el pack Job Zones.
- **Sexo y edad NO se usan** para recomendar ocupaciones: reproducen estereotipos ocupacionales, no aportan validez y contradicen el principio 6 (no determinismo). La edad solo serviria, a futuro, para baremos/normas.

**Consecuencias:**
- Mejor calidad percibida de la recomendacion para P1/P2. El filtro funciona ya con las 96 filas existentes (Job Zone sembrado); la extension de dataset (pack Ocupaciones) es P1 y requiere verificacion contra O*NET OnLine antes de produccion (Gate 1).
- Nuevos campos de perfil `education_level` y `career_stage` con consentimiento (Ley 1581, Gate 2).
- O*NET consolido (feb-2026) las Zonas 1 y 2 en "1-2"; el filtro normaliza el seed actual ('1'/'2' -> '1-2') sin reescribirlo.
- BFI-2-S como gancho introduce una licencia "por confirmar" (Soto & John); mitigada por el principio "legal al final" + plan-B IPIP. No bloquea fases 1-6.
- Valores del Free se mantiene en **TwIVI** segun ADR-023 (no es discrepancia abierta, aunque el PRD §8 aun cite PVQ-21); esta decision no lo toca.
- Trabajo Cowork entregado: analisis + 3 implementation packs (Job Zones, microcopy, extension ocupacional) + prompt para Claude Code.

**Reversibilidad:** Alta. El orden del gancho es metadata (`product_stack.order`); el filtro por Job Zone es aditivo; el dataset es seed. Swap o rollback sin reescribir el motor (examen del principio plugin).

**Referencias:**
- `estado/ANALISIS_Gancho_y_ONET_Fase2_v1.0.md`
- `implementation_packs/JobZones_es-CO_Pack_v1.0.md` + `implementation_packs/Onboarding_Nivel_Microcopy_es-CO_Pack_v1.0.md` + `implementation_packs/Ocupaciones_O-NET_Extension_es-CO_Pack_v1.0.md`
- `estado/PROMPT_ClaudeCode_Gancho_JobZone_Fase2_v1.0.md`
- Relacionado: ADR-019 (crosswalk RIASEC seed), ADR-023 (TwIVI como valores del Free).
- O*NET OnLine Help: Job Zones — https://www.onetonline.org/help/online/zones

---

## ADR-028 — W7 BFI-anonimo: Arquitectura 1 (server + consentimiento previo) + hardening primaria; Arquitectura 2 (local-first) como escalada; gate legal formal intacto (2026-06-26) (German + Claude Code)

**Contexto:** ADR-027 movio el gancho del Free a BFI-2-S (personalidad). El reorder implica exponer un instrumento `sensitivity='high'` distress-flagged a un usuario ANONIMO (pre-signup, pre-consent). El diseño v0.1 (`estado/DESIGN_W7_..._v0.1.md`, commit `572cf38`) concluyo "probablemente Opcion A; revision legal como STOP probable / posible no-waivable". German aporto una **lectura juridica preliminar** (2026-06-26) que corrige esa conclusion por demasiado categorica: W7 es viable bajo condiciones; el eje legal es consentimiento-explicito-previo a sensibles (Ley 1581 Art. 6) + el riesgo material de menores, no la existencia de cuenta ("sin cuenta ≠ anonimo": respuestas vinculables por IP/cookie/sesion son datos personales).

**Opciones consideradas (2 AskUserQuestion):**
- Direccion: (a) **revisar W7 → v0.2** [elegida]; (b) construir ya (contradice §8.1 + la propia lectura preliminar); (c) Opcion A para el MVP (BFI primer test autenticado); (d) trabajo desbloqueado primero.
- Arquitectura: (1) **server + consentimiento previo** [elegida] — gatea el 1er item BFI tras 18+ + NFR-27 + autorizacion sensible; reusa el mecanismo de v0.1 (`anonymous_consent`); fila 2 del abogado ("viable"); (2) **local-first** — nada al server hasta consentir, scoring crudo en cliente; fila 4 ("la mejor"); colapsa el riesgo de menores pero ~3-4 sem de re-arquitectura del trust model (exploracion de codigo: el costo no esta en el scoring sino en bufferizar respuestas + migracion de sesiones vivas); (3) v0.2 architecture-neutral.

**Decision:**
- **Arquitectura 1 (server + consentimiento previo) + hardening** como diseño primario de v0.2. Hardening: TTL en horas (no dias) para sensibles anonimos; minimizar identificadores (sin IP en el path BFI anonimo); borrado en `<18`-at-signup. Razon: el abogado la marca "viable"; reusa el mecanismo ya diseñado (cabe en timeframe MVP); el gate consentimiento-antes-del-1er-item cubre el requisito central; secuencia la re-arquitectura de Arq.2 DETRAS del concepto legal formal que de todos modos se exige.
- **Arquitectura 2 (local-first)** documentada como escalada que el concepto legal formal puede exigir (especialmente si el producto puede atraer menores a escala).
- **Gate legal formal INTACTO (de v0.1 §8.1 + la propia lectura):** no hay implementacion hasta que el paquete legal (concepto abogado es-CO + PIA + diagrama de datos + matriz de terceros + prueba tecnica de anonimizacion + texto de consentimiento + protocolo menores) devuelva un OK. La lectura preliminar de German NO lo sustituye.

**Consecuencias:**
- Entregable: `estado/DESIGN_W7_BFI_Anonimo_Ley1581_v0.2.md` (reemplaza v0.1; v0.1 en git history, NO borrado).
- Hallazgo lateral (advisor + fuente primaria): O*NET —gancho anonimo vivo en prod— ya recolecta respuestas de intereses que la politica v1.0.0 §3 (`lib/consent/text/1.0.0.md:44-46`) clasifica sensibles Art. 5, anonimas pre-consentimiento; el guard `lib/consent/guard.ts:85` solo gatea `sensitivity='high'` (O*NET es `'normal'`) → la politica y el enforcement DIVERGEN. Nuevo `[GAP-ONET-ANON-SENSIBLE-PRECONSENT]` P1; el paquete legal debe cubrir el funnel actual, no solo W7; mismo fix que v0.2 §5.5 (O*NET→autenticado).
- Dependencia en ruta critica: la enmienda de consent §3→1.1.0 (`[GAP-CONSENT-LEVEL-1.1.0]`) — W7 debe divulgar la recoleccion sensible anonima sin 412-ear a usuarios vivos (guard major-only + callback lee registry + ruta re-consent).
- Decisiones abiertas (v0.2 §11.2): N del TTL (horas), IP-truncada si/no en `anonymous_consent`, mitigacion interim de O*NET.
- W7 entra por `/gsd-plan-phase` como su propio Wave/plan con threat model SOLO tras OK legal (toca el funnel desplegado + schema 017 `anonymous_consent` + cron TTL).

**Reversibilidad:** Alta para Arq.1 (orden = feature-flag del `product_stack`; schema aditivo). Arq.2, si se escala, es compromiso mayor (buffer cliente + trust model). Rollback al orden actual (O*NET-primero) sin migracion destructiva.

**Referencias:**
- `estado/DESIGN_W7_BFI_Anonimo_Ley1581_v0.2.md` (reemplaza v0.1 commit `572cf38`).
- Lectura juridica preliminar de German (2026-06-26, en transcript de sesion).
- Evidencia de codigo: `app/api/respond/route.ts:214`, `lib/scoring/score-session.ts`, `lib/consent/text/1.0.0.md:44-46`, `lib/consent/guard.ts:85`.
- Relacionado: ADR-027 (gancho personalidad), `[GAP-CONSENT-LEVEL-1.1.0]`, `[GAP-ONET-ANON-SENSIBLE-PRECONSENT]`.

---

## ADR-029 — Funnel invertido: signup+consent PRIMERO + BFI como gancho (1er test autenticado); supersede el mecanismo anonimo de W7; cierra [GAP-ONET-ANON-SENSIBLE-PRECONSENT] (2026-06-26) (German + Claude Code)

**Contexto:** ADR-027 movio el gancho del Free a personalidad (BFI-2-S). Los diseños v0.1/v0.2 (`DESIGN_W7_..._v0.1/v0.2.md`) lo resolvian haciendo BFI el PRIMER test ANONIMO (pre-signup), con un mecanismo Ley 1581 para sensibles anonimos (`anonymous_consent`, TTL, erase, DOB-use-and-discard, Arq.1 server / Arq.2 local-first) gateado por revision legal formal (sensibles de posibles menores en la ventana anonima). Afloro ademas que O*NET —gancho anonimo vivo en prod— ya recolecta respuestas de intereses clasificadas sensibles Art. 5 por la propia politica §3, anonimas y pre-consentimiento (`[GAP-ONET-ANON-SENSIBLE-PRECONSENT]`). German decidio NO seguir la ruta anonima: pone **signup + consentimiento PRIMERO** (autenticado desde el arranque, cero test anonimo) con **BFI como primer test autenticado** (el gancho). Razon de producto: O*NET no da "punch" como opener, la personalidad si. Razon de compliance: signup-first elimina toda recoleccion sensible anonima de raiz.

**Opciones consideradas:**
- A. Mecanismo BFI-anonimo (v0.2 Arq.1 server+consent / Arq.2 local-first) — gateado por paquete legal formal; complejo (`anonymous_consent`, TTL, cron, trust model).
- B. **Funnel invertido: signup+consent primero + BFI 1er test autenticado** [elegida] — compliance-clean (nada anonimo), entrega el gancho de personalidad, mucho menos codigo.
- Sub-decision (AskUserQuestion): el gancho lo carga el **landing personality-led SIN anticipo** [elegida]; un "taste" de personalidad sin-datos en el landing queda como fast-follow si la conversion top-funnel es debil.

**Decision: Opcion B.** Funnel nuevo: `landing (personality-led) → signup + dual-consent → [AUTH] BFI (gancho, 1er test) → O*NET (2º) → TwIVI → PERMA → teaser integrado`. Cero tramo anonimo. O*NET NO se elimina (baja a 2º; sigue alimentando la recomendacion ocupacional por Job Zone de ADR-027/W5).

**Consecuencias (cambios + resoluciones):**
- `product_stack.order` Free → BFI-2-S primero (data/seed; principio plugin).
- Landing CTA `/` → `/signup` (hoy → `before-you-start` → `/test/onet-ip-sf`) + copy personality-led (Cowork).
- **Callback: redirigir al 1er test tras signup-first** — hoy va a `/` cuando no hay sessionId (`app/auth/callback/route.ts:284`); cargar `product_stack.order` → `/test/{primerCode}`. ES el cambio de codigo principal. (Exploracion: signup no depende de sessionId — `signup/actions.ts:45` optional; `claimAnonymousSession` es no-op seguro sin sesion — `claim.ts:66`; el orden ya es data-driven — `lib/free/next-test.ts`.)
- **NFR-27 (disclaimer) + NFR-28 (contencion) ANTES del 1er item de BFI** — ahora HARD compliance (lo primero que ve un usuario nuevo es un instrumento distress-flagged); cierra `[GAP-AUTH-TRANSITION-MODAL-UNWIRED]` para el caso BFI-first.
- Hooks §1 (W6 diferido) cableados con el orden BFI-primero.
- Codigo anonimo muerto/bypassed marcado (NO borrado, CLAUDE.md no-delete): rama anonima de `/test/[code]/done`, `lib/riasec/top3.ts`, preview hexagono en signup, E2E anonimos.
- E2E nuevo: signup-first → BFI → O*NET → … → teaser.
- `[GAP-ONET-ANON-SENSIBLE-PRECONSENT]` **CERRADO por diseño** (no hay recoleccion anonima; O*NET tambien queda post-consent).
- **Postura de menores MEJORA**: hoy O*NET se responde antes de verificar edad; signup-first pone el gate 18+ antes de cualquier test.
- W5/W6 (ya commiteados, `bbe073d`) NO se invalidan: captura de nivel + reveal ocupacional viven en el reporte (post-tests), independientes del orden; el enfasis del teaser pasa de RIASEC a personalidad.
- **W7 (mecanismo anonimo, v0.1/v0.2) SUPERSEDED**; el bloqueador legal especifico (sensibles anonimos) ya no aplica → desbloqueado para construir. La revision final del texto de consent queda en Fase 7 (legal-last), no como gate.
- Enmienda consent §3→1.1.0 (`[GAP-CONSENT-LEVEL-1.1.0]`) sigue como cleanup P2 (divulgar campos de nivel de W5).

**Reversibilidad:** Alta. El orden es `product_stack` (seed/feature-flag); el cambio de callback es aditivo (redireccion); rollback al funnel actual sin migracion destructiva. El codigo anonimo se conserva (solo se bypassa) → volver atras no requiere reescribir.

**Referencias:**
- Supersede `estado/DESIGN_W7_..._v0.1.md` + `v0.2.md` (marcados superseded, NO borrados).
- ADR-027 (gancho personalidad), ADR-007 (test-first/signup-al-final, que este invierte), ADR-028 (Arq.1/Arq.2, ahora superseded).
- Exploracion de codigo: `app/(auth)/signup/actions.ts:45` (sessionId optional), `app/auth/callback/route.ts:284` (redirect), `lib/session/claim.ts:66` (no-op), `lib/free/next-test.ts` (orden data-driven), `app/(public)/page.tsx:93` (landing CTA).
- Cierra `[GAP-ONET-ANON-SENSIBLE-PRECONSENT]`; relacionado `[GAP-AUTH-TRANSITION-MODAL-UNWIRED]`, `[GAP-CONSENT-LEVEL-1.1.0]`.

---

## ADR-030 — Rediseno de experiencia v1.1: direccion visual A+B (clima clima), resultados hibridos, consent una pantalla, es-CO, taste de intencion sin datos, guardarrail anti-dark-patterns + mejores practicas de mercado adoptadas/descartadas (2026-06-29) (German + Cowork)

**Contexto:** German reporto insatisfaccion integral con el Free vivo en prod: la landing no enamora ni invita; las transiciones entre tests son mudas (no se entiende que se hizo ni que sigue); no se ven resultados; el proceso se siente complicado con recomendaciones dispersas; el consentimiento es burocratico; hay voseo rioplatense y placeholders (TwIVI) visibles. Coincide con lo ya diagnosticado (AUDITORIA.md + flags de BACKLOG tras el smoke 2026-06-29). Se produjo: diagnostico + plan, blueprint de experiencia de los 4 productos, investigacion de mercado citada (5 frentes: directos psicometricos, reportes premium, adyacentes de UX, B2B, dark patterns+LATAM+benchmarks) y dos prototipos navegables (v1 y v2). Estas decisiones cruzan Free/Paid/Ikigai/B2B y se congelan aqui.

**Decisiones (con opciones donde hubo bifurcacion, via AskUserQuestion):**
- **D1. Direccion visual = A "Papel y tinta" (base) + tratamiento constelacion de B solo en el climax** (integrador/teaser). Opciones: A pura / B pura (lo vivo) / C / combinacion. Elegida: combinacion. `ENMIENDA ADR-026:` ADR-026 fijo direccion B (dark "Cartografia interior") para TODO; ADR-030 la corrige — el oscuro se reserva al climax; la base es clara/editorial (Fraunces+Hanken, crema/terracota/salvia) por legibilidad del mucho texto legal y de resultados y menor riesgo de contraste AA.
- **D2. Resultados Free = hibrido** (pista minima por test + resultados reales en el teaser). Opciones: mini-resultado real por test / teaser-only / hibrido. Elegida: hibrido. Validado por mercado (Free "completo pero estrecho", HIGH5/Truity, mas etico que el "viste el 5%" de 16P).
- **D3. Consentimiento = "aceptar y listo"** — una sola pantalla, lenguaje plano, un check, detalle a un tap (compatible Ley 1581; granularidad legal en el texto, friccion percibida de un check). Nuevo flag `[GAP-CONSENT-UX-ONE-SCREEN]`.
- **D4. Voz = es-CO tuteo**, se elimina el voseo. Atiende `[GAP-MICROCOPY-VOSEO-TO-ES-CO]` (Ola 0). Tambien es diferenciacion de mercado (white space LATAM: nadie combina rigor + es-CO + sin trucos).
- **D5. Taste de intencion sin datos en la landing** (pregunta "¿que quieres entender de ti?", sin recolectar nada) para entregar value-first dentro de Ley 1581; se reusa en mapa/transicion/teaser (cierra el loop). Activa el fast-follow que ADR-029 dejo abierto, pero como pregunta de intencion (no taste de personalidad). `Decision abierta:` paso aparte vs. una sola linea en la landing.
- **D6. Guardarrail anti-dark-patterns** como criterio de aceptacion de conversion (checklist: paywall sorpresa, cuenta forzada, suscripcion oculta, urgencia/escasez falsas, confirmshaming, falsa precision, perfilar terceros) + mensaje de marca "sin trucos". Fuentes: Brignull/deceptive.design, FTC 2022, NN/g.
- **D7. Practicas de mercado ADOPTADAS:** plantilla de revelacion en 3 partes (Finimize); frase por combinacion no por rasgo (CliftonStrengths); tests largos en bloques con progreso que avanza rapido (benchmarks: abandono sube pasadas ~20 preguntas / 7-8 min); reporte premium = accion + puntos ciegos + PDF descargable; nombrar el rigor + reporte de muestra (Truity/Understand Myself); upsell vertical por caso de uso, pago unico sin suscripcion; B2B identificacion indirecta + "confidencial, no anonimo" + "desarrollo, no seleccion" (Culture Amp/Gallup). **DESCARTADAS:** rachas con culpa/loss-aversion (Duolingo); cuenta forzada o pedir sensibles a mitad del test (VIA/CareerExplorer); falsa precision ("91,2%"); "mentores IA"/generadores de CV (16P, fuera del MVP); vistas con nombre o match-score/ranking para el empleador (Gallup grid/Plum/Pymetrics = seleccion, prohibido); urgencia/escasez/contadores/anchoring agresivo.

**Consecuencias:**
- Entregables (en `auditoria-ux-ui/`): `DIAGNOSTICO_Y_PLAN_v1.0.md`, `BLUEPRINT_EXPERIENCIA_v1.0.md` (internamente v1.1), `INVESTIGACION_MERCADO_UX_v1.0.md` (.md + .docx), `prototipo-rediseno-free.html` (v1) y `prototipo-rediseno-free-v2.html` (v2, con las practicas validadas).
- Plan de ejecucion en **6 olas (0-5)**, ver `DIAGNOSTICO_Y_PLAN §4`. Como specs ejecutables se agrupan en ~5 paquetes (Ola 0; Free olas 1-3; Paid; B2B; Ikigai), con Ola 5 (accesibilidad+piloto+metricas) como criterios transversales.
- O*NET se mantiene en 60 items (forma validada); mitigado por **progreso por bloque** (recomendacion confirmada por benchmarks, ya no "decision abierta").
- El dashboard B2B suma el mecanismo de **identificacion indirecta** (ocultar grupo adyacente <min), nuevo respecto al blueprint v1.0.
- Flags de BACKLOG que esto ordena/ataca: `[GAP-UX-FLOW-REDESIGN]` (umbrella), `[GAP-MICROCOPY-VOSEO-TO-ES-CO]`, `[GAP-W5W6-ORPHANED-FREE-FLOW]`, `[GAP-FREE-NO-RESULTS-VISIBILITY]`, `[GAP-W6-HOOKS-1]`, `[GAP-FREE-TEST-INTRO-COPY]`, `[GAP-TWIVI-ITEMS-ANCHORS-ES-CO]`; nuevo `[GAP-CONSENT-UX-ONE-SCREEN]`.
- Es trabajo de diseno/contenido (Cowork) + implementacion (Claude Code); no toca psicometria ni motor de scoring.

**Reversibilidad:** Alta. Es spec de experiencia: tokens visuales, microcopy es-CO, routing y un paso adicional (taste). Nada de migracion de datos ni cambio de schema. La direccion visual son tokens; el taste es un paso removible; los textos son copy. Rollback sin costo estructural.

**Referencias:**
- Entregables de esta sesion (arriba) + mockups A/B/C de `AUDITORIA.md`.
- `ENMIENDA ADR-026` (direccion B dark-para-todo → A base + B solo climax).
- Construye sobre ADR-029 (funnel invertido; el taste era su fast-follow) y ADR-027 (gancho personalidad).
- Investigacion con citas (APA 7 + URL) en `INVESTIGACION_MERCADO_UX_v1.0.md §8`.

### ADDENDUM ADR-030 (2026-07-01, Claude Code) — Estrategia de genero de TwIVI: variante NEUTRA ahora, ramificado el/ella DIFERIDO

**Contexto:** al integrar el pack TwIVI de Cowork (que cierra el lado contenido de `[GAP-TWIVI-ITEMS-ANCHORS-ES-CO]`, uno de los flags que este ADR-030 ataca), se verifico contra codigo + prod que la app **no captura genero declarado en ningun lado** (ni `user`, ni signup, ni `assessment_session`; prod `item` no tiene `gender_variant`). El pack traia una decision previa "ramificado el/ella" (German 2026-07-01) cuya dependencia oculta —construir captura de genero— quedaba sin cubrir. Reabierta con esa informacion nueva.

**Opciones (via AskUserQuestion):**
1. **Variante NEUTRA ahora + branching diferido (ELEGIDA).** Sirve una sola variante neutra en genero ya; desbloquea los placeholders vivos en prod; difiere el/ella a fase propia.
2. Default masculino ahora. Cero contenido/legal nuevo (el set M ya existe), pero todo usuario ve retratos en masculino en un test de auto-semejanza.
3. Construir branching el/ella ya. Entrega la decision previa, pero el costo dominante NO es UI: es Ley 1581/consent (genero ≈ dato sensible Art. 5, misma superficie que `[GAP-CONSENT-LEVEL-1.1.0]`).

**Decision:** Opcion 1. Motivos: (a) las 3 rutas de schema (token en render / columna `gender_variant` / `stem_f`) dependen todas de captura de genero, que no existe; (b) neutra es **schema-limpia** (1 fila por item, INSERT de 5 columnas, sin migracion); (c) urgencia baja (pre-trafico) favorece hacerlo bien e inclusivo sin superficie legal apurada.

**Consecuencias:**
- Contenido: los 20 stems neutros son Cowork (CLAUDE.md §6; no es swap de token, reestructura frases). Brief `estado/BRIEF_Cowork_TwIVI_NEUTRAL_STEMS_v1.0.md` + scaffold SQL turnkey `estado/TwIVI_items_NEUTRAL_es-CO_SEED_SCAFFOLD_v1.0.sql` entregados. Los sets M/F del seed original quedan intactos para la fase de branching.
- Nuevo flag `[GAP-TWIVI-GENDER-SCHEMA]` (P2, diferido): ramificado el/ella = captura de genero + Ley 1581 + ruta de schema (A/B/C del pack §4).
- Hecho este turno (working tree, sin push): anclas es-CO reales en `lib/questionnaire/response-scales.ts`; PRD L124/L131 PVQ-21->TwIVI.
- **Correccion de claims stale del pack (verificado en prod `tzhhqaducmbxfebuyvnv` via MCP):** `[GAP-MRAT-METADATA-READ]` (score-session.ts ya lee value_map/hov_map; resuelto 02-13) y `[GAP-NARRATIVE-DIMBAND-SCHEMA]` (mig 015; 12 textos HOV×banda vivos) **ya estan hechos Y aplicados en prod** — no son tareas CC abiertas.
- Aplicacion a prod del seed real: gated con OK de German (DELETE-first porque 20 placeholders en seq 1..20 bloquean el NOT-EXISTS; chequear `item_response` por FK; patron out-of-band 016/017).

**Reversibilidad:** Alta. La variante neutra es datos (seed); el branching el/ella es aditivo despues (columna o token, sin reescribir el motor). No hay migracion en la ruta elegida.

**Referencias:** pack `implementation_packs/TwIVI_Implementation_Acquisition_Pack_v1.0.md` §4; brief + scaffold (arriba); seed M/F fuente `estado/TwIVI_items_es-CO_SEED_v1.0.sql`. Coherente con ADR-030 D2 (resultados hibridos) y ADR-031 (cierre canonico Free).

---

## ADR-031 — Cierre canonico del Free: nivel obligatorio → teaser-constelacion CON ocupaciones dentro (un solo climax); reconcilia el recut 2.1 (W5/W6) con el prototipo Claude Design (2026-07-01) (German + Cowork)

**Contexto:** tras el merge de Phase 2.1 (PR #5/#6), el cierre Free VIVO en prod es: post-PERMA → `/reporte/{onet}?cierre=free` → captura de nivel educativo OBLIGATORIA (W5) → ocupaciones filtradas por Job Zone + CTA (W6). En paralelo, el prototipo navegable de Claude Design (`DescubreMe Prototipo.dc.html`, proyecto 15f3319f, 2026-06-30) — que materializa el BLUEPRINT v1.1/ADR-030 — cierra el Free con el teaser-constelacion ("El explorador autonomo") y NO incluye ni la captura de nivel ni las ocupaciones. Contradiccion de flujo detectada en la revision Cowork 2026-07-01: dos cierres distintos para el mismo producto. Habia que fijar la secuencia canonica antes de implementar la Ola 3.

**Opciones evaluadas (via AskUserQuestion):**
1. **Nivel → constelacion con ocupaciones dentro (ELEGIDA).** Captura de nivel primero (se conserva la mecanica prod, antes del reveal, maximiza tasa de captura); despues UN solo climax: el teaser-constelacion integra las 4 dimensiones e incluye las ocupaciones Job Zone como seccion propia. Un solo momento wow; las ocupaciones dejan de ser pantalla suelta y pasan a ser parte del mapa.
2. Nivel → ocupaciones → constelacion (3 actos). Menor retrabajo de routing, pero dos reveals compiten y el momentum se diluye; las ocupaciones tienden a "gastarse" antes del climax.
3. Constelacion primero, ocupaciones despues (nivel post-climax). Maximiza emocion temprana, pero la captura de nivel post-reveal caeria (el usuario ya recibio el valor) y el filtro Job Zone la necesita ANTES de mostrar ocupaciones.

**Decision:** Opcion 1. Secuencia canonica del cierre Free: `PERMA (test 4) → mini-resultado PERMA → captura de nivel (obligatoria, framing "para afinar tu mapa") → teaser-constelacion (direccion B) que contiene: sintesis por combinacion + pincelada de cruce + seccion "entornos a explorar" (ocupaciones Job Zone, no deterministas, sin match %) + rigor nombrado + puente al Paid (USD 19, pago unico) + linea de honestidad`.

**Consecuencias:**
- El recut de `reporte/[sessionId]?cierre=free` evoluciona: deja de ser la pantalla terminal de ocupaciones y pasa a ser (o redirigir a) la vista teaser-constelacion con las ocupaciones como seccion interna. La maquinaria 2.1 (resolveFreeCloseTarget, LevelCapture, filtro Job Zone, FREE-14 email) SE CONSERVA; cambia la composicion visual de la superficie.
- `MC_NIVEL_CLOSE_CTA` (placeholder "Ver tu perfil integrado") cambia de destino semantico → propuesta Cowork: "Ver tu primer mapa →" (sign-off en `auditoria-ux-ui/MICROCOPY_ES-CO_SIGNOFF_v1.0.md`).
- El prototipo Claude Design queda con gap conocido (no dibuja nivel ni ocupaciones); el BLUEPRINT v1.2 §7.7 pasa a ser la spec canonica del cierre; el prototipo se actualiza cuando German itere en Claude Design (no bloquea el handoff).
- `[GAP-FREE-NO-RESULTS-VISIBILITY]` (decision de producto "que ve el Free") queda RESUELTO a nivel de diseno: mini-resultado por test (capas 1-2) + cierre con constelacion + ocupaciones.
- Cierra la decision abierta que dejo el bloque STATUS 2026-06-29 ("la decision de producto 'que ve el Free' sigue abierta").

**Reversibilidad:** Alta. Es composicion de UI sobre maquinaria existente; el routing por query param y los componentes se conservan. Volver a la secuencia de 3 actos o al recut actual es reorganizacion de vistas, sin migracion de datos.

**Referencias:**
- `auditoria-ux-ui/BLUEPRINT_EXPERIENCIA_v1.0.md` (internamente v1.2) §7.7 — spec de la pantalla.
- `auditoria-ux-ui/HANDOFF_UI_v1.0.md` §5 — spec de implementacion para Claude Code.
- Prototipo: Claude Design proyecto `15f3319f-a0fc-4573-aeba-c978ef465352`, archivo `DescubreMe Prototipo.dc.html` (2026-06-30).
- Construye sobre ADR-027 (Job Zone, sin sexo/edad), ADR-029 (funnel invertido), ADR-030 (rediseno v1.1, direccion A+B).
- Relacionado: PR #6 (Decision B: quitar link "Ver reporte completo" del mini-result — sigue valido; el mini-result no linkea al reporte, el cierre si).

---

## ADR-032 — Proyeccion del reporte desacoplada del scoring: vista derivada (HOV centrados / banda por familia) en vez de scores_by_dim 1:1; capar el circumplejo a su orden de eje; convencion de banda en una sola fuente (2026-07-23) (German + Claude Code)

**Contexto:** el smoke A1 (prod, 2026-07-23; `estado/SMOKE_A1_RESULTADOS_v1.0.md`) confirmo un bug P1 en el ValueCircle. El circumplejo de TwIVI recibia `scores_by_dim` 1:1 desde el assembler, rompiendo su contrato de tres formas: **cantidad** (10 valores Schwartz a un visual de 4 sectores; `ValueCircle.tsx:46` reparte con `i % 4` → etiquetas apiladas de a 3), **centrado** (medias crudas 1-6 a un radio que se mide desde el MRAT de la persona y puede ser NEGATIVO → forma de estrella), y **etiquetas** (codigos psicometricos crudos: "NEG", "Lon", "hap"). El componente NO estaba mal escrito; su cabecera ya documentaba el contrato (4 sectores cardinales, dos ejes bipolares, radio = valor centrado). El assembler nunca lo cumplia. Es la misma discrepancia que PR-C ya habia corregido para el composer (que reconstruye los 4 HOV desde las 10 medias) pero que nunca se aplico al visual — el bug nacio de dos lugares discrepando sobre `scoresByDim`.

**Decisiones (AskUserQuestion, German 2026-07-23):**
1. **Proyeccion desacoplada, no 1:1.** Nueva capa `lib/report/visual-dimensions.ts` (motor generico, cero literales, FOUND-05 clean): el circumplejo se proyecta con `projectCircumplexDimensions` (reconstruye 4 HOV centrados por MRAT) y las barras con `projectBarsDimensions` (label es-CO por familia). El assembler deja de mapear `scores_by_dim` 1:1.
2. **Capar el circumplejo a `hovAxisOrder` (no anexar).** `orderHovsOnBipolarAxes` devuelve SIEMPRE los HOV declarados en `family.hovAxisOrder`, en orden de eje bipolar (opuestos enfrentados en indices 0/2 y 1/3). Un HOV en `hov_map` fuera del orden declarado se descarta con `logger.warn`, no se anexa. Trade-off: anexar no oculta nada pero con 5+ HOV re-dispara el bug `i % 4`; capar lo hace estructuralmente irrepetible al precio de que un HOV nuevo desaparezca en silencio (mitigado por el warn). Una familia circumplex sin `hovAxisOrder` es violacion de invariante → throw (la unica familia circumplex, TwIVI, lo declara).
3. **Convencion de banda en UNA sola fuente por instrumento.** El "voltear la banda" para dimensiones cuya etiqueta es el inverso del constructo vive en un solo lugar por familia. Para BFI: `dimToKey.invertBand` (NEG puntua emocionalidad negativa, etiqueta "Calma" → `projectBarsDimensions` aplica `flipBand`; esto corrige el "Calma·Alto" falso que el propio fix de labels destapo). Para PERMA: la banda YA invierte en el baremo (N/Lon: Alto = extremo de cuidado que rutea a contencion; la narrativa keya en N-ALTO/Lon-ALTO) → NO se declara `invertBand`, porque un doble-flip mandaria el texto de "poca emocion negativa" a quien reporto tristeza frecuente. **Regla dura: N/Lon de PERMA nunca llevan `invertBand`** (test `[no-doble-flip]` lo blinda).
4. **Helpers de MRAT y flip compartidos, no duplicados.** `centeredHovScores` y `flipBand` se exportan desde `reveal-composer` y los consumen tanto el composer como la proyeccion del assembler. Duplicar la formula del MRAT entre dos lugares fue el ORIGEN del bug; una sola implementacion lo previene.
5. **Labels es-CO firmados por Cowork (esta sesion).** HOV = verbos de accion cortos (**Explorar/Destacar/Conservar/Aportar**), no los nombres academicos de Schwartz — la etiqueta es UX; el termino tecnico y la validez de constructo viven en la nota metodologica (trazabilidad etiqueta → HOV → valores). PERMA = 9 dims, con **E="Involucramiento"** (no "Compromiso", ambiguo hacia "obligacion") y **N="Emociones dificiles"** (no "negativas": preserva valencia sin estigmatizar, en la dimension que rutea a crisis). Cierran `[GAP-HOV-LABELS-ES-CO]` y `[GAP-PERMA-DIM-LABELS-ES-CO]`.

**Consecuencias:**
- Un solo `visualDimensions` alimenta las DOS superficies (transicion `done/page.tsx` + reporte `reporte/page.tsx`); el fix cubre ambas.
- 14 tests nuevos (`visual-dimensions.test.ts`): regresion que falla si vuelven 10 dims al circumplejo, guard de no-doble-flip para N/Lon, invariante de opuestos vs `family.adjacency`, centrado con negativos, QUAL-05. Gates verdes (tsc 0, test:lint, test:unit 422, build). PR #17 (`cf18343`), mergeado.
- **Deuda destapada, NO cerrada en este PR** (`[GAP-PERMA-BARS-VISUAL-PASS]`, P1): el assembler nunca setea `max` → las barras salen al 100%; y `flipBand` voltea la banda pero no el `value` (acoplado con el bug del max). Mas el restructure de layout de PERMA que propuso Cowork.
- **Alcance del guard de regresion (honestidad):** la regresion protege `projectCircumplexDimensions`, no el sitio del assembler que rompio (el `dims.map` 1:1). Un guard a nivel `composeReport` (que un reporte circumplex rinde exactamente 4 `visualDimensions`) seria mas fiel al modo de fallo real, pero requiere fixture de instrumento circumplex — anotado, no hecho.
- **Conflicto de copy abierto (no se inventa):** NEG usa "Calma" (reveal-phrases, invertBand) mientras el seed BFI documenta "Sensibilidad emocional" (reframe D-D.4, no invertido) como user-facing — dos reframes firmados que se contradicen; queda para reconciliar (ver `[GAP-REPORT-INTERESES-MISLABEL]` y la reconciliacion del tracker).

**Reversibilidad:** Alta. Es una capa de proyeccion pura sobre el payload + datos firmados; no toca schema, snapshot ni scoring. Volver al mapeo 1:1 es revertir el ternario del assembler.

**Referencias:**
- PR #17 (`cf18343`). Codigo: `lib/report/visual-dimensions.ts` (+ `.test.ts`), `lib/report/reveal-composer.ts` (`centeredHovScores`/`flipBand` exportados), `lib/i18n/microcopy/es-CO/reveal-phrases.ts` (`hovLabels`/`hovAxisOrder`/`dimToKey` PERMA), `lib/report/assembler.ts`.
- `estado/SMOKE_A1_RESULTADOS_v1.0.md` (hallazgo P1 + evidencia de prod).
- `app/(b2c)/reporte/[sessionId]/_components/ValueCircle.tsx` (contrato del circumplejo), `BarsWithBands.tsx`.
- `db/seeds/instruments/PERMA-Profiler/baremo.sql` (convencion de banda N/Lon invertida, load-bearing).
- Construye sobre el composer §9 de PR-C (misma reconstruccion HOV, ahora compartida). Relacionado: `[GAP-PERMA-BARS-VISUAL-PASS]`, `[GAP-PERMA-CONTENTION-GUIDED-FLOW]`.

---

*Fin de DECISIONS_LOG. Anadir ADR nuevo al final, con numero incremental, fecha y owner. Migrar decisiones no triviales desde `.planning/STATE.md` al cierre de cada sesion (CLAUDE.md §4).*
