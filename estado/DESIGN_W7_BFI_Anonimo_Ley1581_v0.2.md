# DESIGN W7 — BFI-2-S como gancho anónimo (mecanismo Ley 1581) v0.2

**Estado:** PROPUESTA REVISADA para sign-off de German. NO implementado. NO se toca el funnel desplegado hasta OK legal formal.
**Owner / responsable del tratamiento:** German Velez Hurtado.
**Autor del diseño:** Claude Code.
**Fecha:** 2026-06-26.
**Reemplaza:** v0.1 (commit `572cf38`, en git history). v0.1 queda como registro; este doc es la versión activa.
**Decisión de origen:** ADR-027 Task 5 + German eligió "insistir en BFI-anónimo-primero" (2026-06-26), asumiendo los blockers.
**Insumo nuevo:** lectura jurídica preliminar de German (2026-06-26) — gobierna el framing de este doc (corrige la conclusión categórica de v0.1). Dos decisiones de arquitectura tomadas por German (AskUserQuestion, 2026-06-26): **(1)** W7 viable bajo condiciones, no descartada; **(2)** Arquitectura 1 (server + consentimiento previo) como primaria + hardening; Arquitectura 2 (local-first) como escalada documentada.
**Relacionado:** `estado/STATUS.md` (entrada 2026-06-26 PM), `02.1-01-PLAN.md` Wave 7, `lib/consent/*`, `app/auth/callback/route.ts`, `lib/session/*`, `app/api/respond/route.ts`, `lib/scoring/score-session.ts`.

---

## 1. Resumen ejecutivo (3-5 líneas)

W7 = entregar el reorder de ADR-027: BFI-2-S (personalidad, `sensitivity='high'`, distress-flagged) como la primera experiencia de un usuario **anónimo** (pre-signup). v0.1 concluyó "probablemente no" y trató la revisión legal como STOP probable. `Corrección (lectura de German, aceptada):` la conclusión era demasiado categórica — **W7 es viable bajo condiciones**. El eje no es "tiene cuenta o no", sino si las respuestas pueden vincularse a una persona determinable y si hay **consentimiento explícito previo** al tratamiento de sensibles (Ley 1581 Art. 6). Este doc especifica la **Arquitectura 1** (server + consentimiento previo, el mecanismo de v0.1 con el framing de riesgo ablandado) + hardening (TTL corto, minimizar identificadores, borrado `<18`-at-signup), y documenta la **Arquitectura 2** (local-first, la "mejor" según el abogado) como escalada. `No negociable (de v0.1 y de la propia lectura):` el código no se ejecuta hasta que el **paquete legal formal** (concepto de abogado es-CO + PIA + prueba técnica de anonimización) devuelva un OK — la lectura preliminar NO lo sustituye.

---

## 2. Qué cambia respecto a v0.1 (changelog para la revisión)

1. **Framing legal.** v0.1: "probablemente Opción A; posible no-waivable". v0.2: "viable bajo condiciones; el riesgo material concentrado es **menores**, no sensibles-en-general" (la política v1.0.0 §3 ya clasifica intereses/O*NET como sensibles — tensión pre-existente, no creada por W7).
2. **Arquitectura explícita.** v0.1 mezclaba server-side anónimo sin nombrarlo como elección. v0.2 separa **Arquitectura 1 (elegida)** vs **Arquitectura 2 (escalada)** con costo aterrizado.
3. **Hardening nuevo** sobre el mecanismo de v0.1 (§5.6): TTL en horas-no-días para sensibles anónimos; minimizar identificadores (sin IP en el path BFI anónimo); borrado en `<18`-at-signup (v0.1 §4.1 ya lo contemplaba, ahora es requisito).
4. **Estado actual aterrizado** con evidencia de código (§3): el flujo anónimo HOY persiste cada respuesta server-side; el scoring crudo es portable pero baremos/narrativas/distress son DB-dependientes; las plantillas del teaser son estáticas/públicas sin PII.
5. **Dependencia explícita** (§8): la enmienda de consent §3→1.1.0 está en la ruta crítica de W7 en cualquier arquitectura.
6. **Paquete legal formal** detallado (§11) con los componentes que la lectura de German enumera.
7. **Gap pre-existente en alcance (§11):** O*NET —gancho anónimo vivo en prod— recolecta respuestas de intereses que la política v1.0.0 §3 (`lib/consent/text/1.0.0.md:44-46`) ya clasifica sensibles (Art. 5), pre-consentimiento. El paquete legal debe cubrir el funnel actual, no solo W7. Flag `[GAP-ONET-ANON-SENSIBLE-PRECONSENT]`.

---

## 3. Estado actual (aterrizado con evidencia — `Hecho`)

- **Anon entry hardcodeado a O*NET:** `onboarding/before-you-start` CTA → `/test/onet-ip-sf`; `/test/[code]/done` rama anónima gatea en `progress < 60` (conteo O*NET) + computa teaser RIASEC → `/signup`. `product_stack.order` solo manda en el tramo autenticado (`resolveNextFreeTest`).
- **Persistencia anónima por ítem (server-side, síncrona):** `app/api/respond/route.ts:214` hace `upsert` a `item_response` (`onConflict: session_id,item_id`) con `user_id=null` en CADA submit; `advanceProgress` actualiza `assessment_session.progress`. NO hay buffer cliente. → **La superficie sensible pre-cuenta hoy son las filas `item_response` con `user_id=null`**, identificables por cookie/`session_id` (+ IP truncada si se loguea).
- **Scoring: puro vs DB-dependiente.** `lib/scoring/score-session.ts`. El crudo→dimensiones (sum/mean, reverse-key, ipsativo, MRAT) es **puro/portable al cliente**; baremos/percentiles, narrativas y umbrales de distress son **DB-dependientes** (deben quedar server-side). `Hecho clave:` para anónimos el scoring **ya no persiste nada** (computa in-memory; `computed_score`/`report_snapshot` tienen `user_id NOT NULL` → solo se escriben tras claim).
- **Teaser = contenido estático/público.** `lib/integrator/teaser.ts` es un motor declarativo sobre `integrator_rule` (tier='teaser'); `evaluateTeaserRule` es función pura sin DB. Las `narrative_template` son referencia seedada por Cowork **sin PII** → fetchables como contenido no sensible para renderizar el teaser.
- **Gate 18+ en signup:** `signupAction` (Zod + `isAtLeast18(dob)`) + re-verificación en `/auth/callback` (`<18` → signOut + `/?error=age`). NINGÚN dato sensible se procesa antes de este gate hoy.
- **Sesión anónima:** cookie `anonymous_session_id` (`middleware.ts`) → `assessment_session` con `user_id=null` (`lib/session/anonymous.ts`); `claimAnonymousSession(user.id)` (`lib/session/claim.ts`, llamado desde `app/auth/callback/route.ts`) setea `user_id` y limpia la cookie.
- **Consent keyed por user_id:** la tabla `consent` tiene `user_id NOT NULL` (FK). Un anónimo no tiene `user_id` → una fila de consent anónima no cabe en el modelo actual. El guard `lib/consent/guard.ts` usa `semverLt` (re-promptea en bumps MINOR) y el callback hardcodea `CONSENT_VERSION="1.0.0"` → un bump 1.1.0 sin ruta de re-consent daría **412 a los usuarios vivos** (ver §8).
- **NFR-27/28 ya existen:** `DisclaimerModal` (variant bfi|perma) + `ContentionBanner` + `getContentionResources`. Hoy se montan en el tramo autenticado. `getContentionResources` no depende de `user_id` → reutilizable anónimo.
- **Flags de instrumento (seed):** BFI-2-S `sensitivity='high'`, `ethical_flags={pretest_modal,contention_route,distress_detector}` true. O*NET `sensitivity='normal'`, sin flags.

---

## 4. El eje legal (reframe, lectura de German aceptada)

`Hecho:` Ley 1581 define sensible lo que afecte la intimidad o cuyo uso indebido pueda generar discriminación; la lista es enunciativa ("tales como"). Un perfil de personalidad (estabilidad emocional, preocupación, señales de distress) puede quedar comprendido. Posición prudente: respuestas individuales y perfil resultante = **sensibles**; inferencias de distress = **alto riesgo**; estadística verdaderamente agregada y anónima = no necesariamente dato personal.

`Hecho:` "sin cuenta" ≠ "anónimo". Hay tratamiento de datos personales aunque no haya registro, si las respuestas se asocian a IP, cookie, ID de dispositivo, sesión recuperable, fingerprint o resultado que luego se conecta a una cuenta. Lo seudonimizado/cifrado que aún permita reidentificar sigue siendo dato personal. → El análisis es sobre **todo el flujo de datos**, no sobre la ausencia de nombre/correo.

`Hecho:` la ley exige **consentimiento previo, expreso e informado** — no necesariamente autenticación previa. Flujo correcto: (1) declaración de edad; (2) aviso de privacidad; (3) explicación específica del tratamiento psicométrico; (4) casilla independiente de consentimiento explícito; (5) inicio del BFI-2-S; (6) cuenta **opcional** al finalizar. La cuenta NO es indispensable antes del test.

`Riesgo material concentrado — menores:` el tratamiento de datos de menores no está absolutamente prohibido (Decreto 1377 + jurisprudencia: interés superior + autorización del representante + escuchar al menor), pero para un test comercial dirigido a adultos es difícil justificar que recolectar perfiles psicológicos de menores anónimos sin autorización parental respete su interés superior. **Ahí está el riesgo material.** Es lo que la Arquitectura 1 acota (no elimina) y la Arquitectura 2 colapsa.

`Opinión profesional (German decide como responsable):` el reorder es defendible con consentimiento previo (Arquitectura 1). El control de edad auto-declarado reduce, no elimina, la exposición de sensibles de menores en la ventana anónima; una casilla "soy 18+" es protección débil para un perfil sensible → se prefiere DOB-real-use-and-discard (§5.1) y hardening de retención (§5.6).

---

## 5. Arquitectura 1 — server + consentimiento previo (ELEGIDA)

Mantiene la persistencia anónima server-side de hoy, pero **mueve un gate de consentimiento explícito + edad antes del primer ítem BFI**. Fila 2 de la tabla del abogado ("test sin cuenta, con consentimiento previo = viable"). Reusa el mecanismo de v0.1.

### 5.1 Gate de edad al tope del funnel (DOB use-and-discard, NO atestación)

- **DOB real, usar-y-descartar (recomendado):** recolectar fecha de nacimiento → `isAtLeast18(dob)` server-side → **descartar** (no almacenar) → re-recolectar en signup. Misma barra que el flujo de cuenta, no almacena nada extra pre-cuenta. La lectura de German lo respalda: una atestación por checkbox es débil para un perfil sensible.
  - Sub-opción descartada: atestación "Confirmo 18+".
- **Verificación real en signup (sin cambio + borrado):** `signupAction`/`callback` siguen verificando DOB. Si `<18` en signup → además de `signOut`, **borrar la sesión anónima + sus `item_response`** (sensibles capturados bajo un DOB-top falseado se eliminan). NUEVO: hoy el callback solo redirige; debe disparar el borrado de la sesión anónima reclamada-fallida.

### 5.2 NFR-27 (disclaimer distress) + NFR-28 (contención) para el anónimo

- Montar `DisclaimerModal` variant=bfi ANTES del primer ítem de BFI anónimo (mismo componente que el tramo autenticado). El usuario pasa el disclaimer antes de ver el primer ítem.
- `ContentionBanner` / ruta NFR-28 disponible para el anónimo durante y después de BFI (el distress no espera al signup). `getContentionResources` no depende de `user_id` → reutilizable.

### 5.3 Autorización de datos sensibles (Ley 1581 Art. 6) pre-test, anónima

- Antes del primer ítem: **autorización explícita** para tratar sensibles psicométricos, con propósito acotado (generar tu resultado de personalidad), texto + hash versionado.
- Art. 6 §a: la autorización de sensibles no puede condicionar actividades salvo cuando la actividad la requiere. Generar el resultado REQUIERE procesar las respuestas → condicionar "ver tu resultado" a la autorización es defendible (la política v1.0.0 §3 ya lo hace).

### 5.4 Modelo de consentimiento para sesión anónima (el problema estructural)

- **Nueva tabla `anonymous_consent`** keyed por `anonymous_session_id` (NO user_id): `{anonymous_session_id, consent_sensitive, consent_version, text_sha256_hash, user_agent, granted_at, revoked_at}`. Aditiva; RLS: solo service-role. `Hardening (§5.6):` **sin IP** (ni truncada) en este path.
- **Enlazar, NO migrar-como-segundo-INSERT (corrección crítica de v0.1, vigente):** el callback YA inserta una fila `consent` para `(user_id,'free')`, y `consent_user_product_active_idx` es parcial-único sobre `(user_id, product_code) WHERE revoked_at IS NULL`. Un segundo INSERT → **23505**, que el callback HOY swallowea (`[BUG-CALLBACK-NOT-IDEMPOTENT]`) → se perdería el `granted_at`/hash anónimo, que ES la prueba de la autorización pre-signup. Por eso: **`anonymous_consent` permanece como prueba INMUTABLE de la autorización sensible pre-signup; la fila `consent` del signup NO cambia; se ENLAZA** por `anonymous_session_id`. NO se hace un segundo INSERT en `consent`.
- **Revocabilidad pre-cuenta:** (a) endpoint cookie-based `POST /api/anon/erase` que borra la sesión anónima + `item_response` + `anonymous_consent` por el `anonymous_session_id` de la cookie, dejando traza de auditoría anonimizada (patrón del delete de cuenta; Decreto 1377 Art. 11); (b) **TTL** (§5.6).

### 5.5 Generalización del anon-entry (hoy hardcodeado a O*NET)

El PLAN lo marcó como "key finding". Para BFI-anon-primero:
- `before-you-start` CTA: resolver el primer test desde `product_stack.order` (data-driven), no `/test/onet-ip-sf` hardcodeado.
- `/test/[code]/done` rama anónima: gatear por completitud del instrumento actual (data-driven `item_count`), no `progress < 60`; resolver el siguiente test / el punto de signup desde el stack. Teaser anónimo de RIASEC → personalidad (BFI).
- Signup teaser: de RIASEC top-3 a teaser de personalidad.
- **Orden resultante (ADR-027 §1):** BFI-2-S (1, anónimo) → O*NET (2) → TwIVI (3) → PERMA (4). `Recomendación:` solo BFI cruza la línea anónima (gancho); signup tras BFI; O*NET/TwIVI/PERMA autenticados. Minimiza la superficie sensible-pre-cuenta a UN instrumento. `Hecho (cierra gap pre-existente):` la política v1.0.0 §3 (`lib/consent/text/1.0.0.md:44-46`) clasifica las respuestas de **intereses** (O*NET) como sensibles Art. 5, pero el guard (`lib/consent/guard.ts:85`) solo exige consent-sensible para instrumentos `sensitivity='high'` (O*NET es `'normal'`) → hoy O*NET recolecta sensibles-Art.5 anónimos pre-consentimiento. Mover O*NET al tramo autenticado **también cierra ese gap**, por lo que la sub-decisión (O*NET anónimo-2º vs autenticado) se inclina a **autenticado**.
- **Plugin-as-data (FOUND-05):** el anon-entry generalizado NO debe hardcodear códigos de instrumento.

### 5.6 Hardening (nuevo en v0.2)

- **TTL en horas, no días, para sensibles anónimos:** cron que borra sesiones anónimas no reclamadas + sus `item_response` + `anonymous_consent` tras N horas (proponer 24-72h; v0.1 proponía 7-30 días — se acorta por ser sensibles). Decisión de N: German/legal.
- **Minimizar identificadores:** no almacenar IP (ni truncada) en el path BFI anónimo; la prueba de consentimiento se sostiene en `text_sha256_hash` + `consent_version` + `granted_at` + linkage por `anonymous_session_id`. `Sub-decisión:` si el legal prefiere riqueza probatoria sobre minimización, se reincorpora IP truncada — trade-off identificabilidad vs prueba.
- **Borrado en `<18`-at-signup:** requisito (§5.1), no opcional.

---

## 6. Arquitectura 2 — local-first, guardar después (ESCALADA documentada, NO elegida ahora)

La "mejor" según la lectura de German (fila 4). El BFI se calcula en el dispositivo; **no se persiste nada al server hasta el consentimiento/signup**. Durante la ventana anónima el responsable no recibe ni almacena sensibles → **colapsa el riesgo de menores y el de prueba-de-consentimiento-anónimo** (no hay tratamiento server hasta consentir).

`Costo (aterrizado, exploración de código):` NO está en el scoring (mover crudo→dimensiones al cliente es menor — baremos/narrativas/distress siguen server). Está en **bufferizar respuestas + re-arquitectura del modelo de confianza**:
- Buffer cliente (IndexedDB/sessionStorage) que acumula respuestas sin tocar el server.
- Nuevo endpoint batch-sync (`POST /api/sync-responses`) que escribe el lote al consentir.
- Consistencia atómica claim + sync (rollback conjunto).
- Diferir `getOrCreateAnonymousSession`/`advanceProgress`/`upsert item_response` (no escribir hasta consentir).
- Review RLS/trust (respuestas diferidas confían en la cookie hasta el claim).
- Migración de las sesiones anónimas vivas con progreso parcial.
- Plantillas del teaser pre-fetcheadas como contenido público (ya son estáticas, sin persistencia).

`Estimación:` ~3-4 semanas / 2 personas. **Divergencia alta** del patrón desplegado (rompe el write-por-ítem de `/api/respond`).

`Trigger de escalada:` la revisión legal formal (§11) declara que sensibles anónimos server-side, aun con consentimiento + TTL, no son aceptables — especialmente si el producto puede atraer **menores a escala**. En ese caso, Arquitectura 2 se planea como su propio Wave con su threat model.

`Residual de Arq. 2:` retención local en el dispositivo (IndexedDB) sigue siendo "dato en el dispositivo" (exposición mucho menor, pero no nula); requiere **prueba técnica de red/logs** de que nada filtra al server (no basta la UI).

---

## 7. Cambios técnicos (spec, NO implementación — Arquitectura 1)

| Área | Cambio |
|---|---|
| Schema | `anonymous_consent` (tabla nueva, aditiva); marker TTL. Migración nueva (017). |
| Rutas | Nueva pantalla gate (DOB use-and-discard + NFR-27 + autorización sensible) entre `before-you-start` y el 1er test; `POST /api/anon/erase`; cron/TTL de borrado. |
| before-you-start | CTA data-driven (primer test del stack), copy personality-led. |
| `/test/[code]/done` | Rama anónima generalizada (completitud por `item_count`, no `<60`); teaser personalidad. |
| signup/callback | Enlazar `anonymous_consent`↔`consent` al claim (NO segundo INSERT); borrar sesión anónima si `<18` en la verificación real. |
| NFR-27/28 | Montar `DisclaimerModal` + contención en el flujo anónimo. |
| §1 hooks (W6 diferido) | Cablear los 4 hooks verbatim en el orden resultante; Cowork revisa si "Empecemos"/"Ahora" calzan. |
| Política consent | Actualizar §3 para divulgar la recolección sensible anónima (coordinar con la enmienda 1.1.0, §8). |
| Hardening | TTL horas-no-días; sin IP en path BFI anónimo; borrado `<18`-at-signup. |
| Plugin-as-data | El anon-entry generalizado NO hardcodea códigos de instrumento (FOUND-05). |

---

## 8. Dependencia en ruta crítica: enmienda de consent §3→1.1.0

`Hecho:` W7 debe **divulgar la recolección sensible anónima** en la política (§3). Eso exige un bump de versión de consent. Pero el guard `lib/consent/guard.ts` re-promptea en bumps MINOR (`semverLt`) y el callback hardcodea `CONSENT_VERSION="1.0.0"` sin ruta de re-consent → un 1.1.0 hoy daría **412 a los 4 usuarios vivos y rompería signups**.

→ La enmienda formal del inventario §3 a 1.1.0 (guard major-only + callback lee registry + ruta re-consent) **NO es independiente de W7**: es prerequisito en cualquiera de las dos arquitecturas. Está en BACKLOG; W7 la consume. Secuenciar la enmienda **antes** del despliegue de W7.

---

## 9. Riesgos residuales (Arquitectura 1, no eliminados por el mecanismo)

1. **Menores:** DOB-top auto-reportado → sensibles de posibles menores en la ventana anónima. Acotado (18+ al tope + TTL horas + borrado `<18`-at-signup), NO eliminado. Arquitectura 2 lo colapsa (§6).
2. **Consentimiento anónimo:** prueba más débil sin identidad; modelo novel. TTL + erase acotan retención.
3. **Fricción de funnel:** DOB + NFR-27 + autorización antes del primer test reduce el carácter frictionless del gancho. Trade-off aceptado por German.
4. **Retención:** sensibles de sesiones anónimas no reclamadas = superficie; depende del TTL/erase funcionando.
5. **Divulgación:** la política §3 debe divulgar la recolección sensible anónima antes de desplegar (§8).

---

## 10. Reversibilidad

Media. El orden + las superficies de consent son reversibles (feature-flag del orden del stack). El schema (`anonymous_consent`, TTL) es aditivo. El compromiso mayor es el modelo de consent anónimo + el endpoint de erase + el cron TTL. Un rollback al orden actual (O*NET-primero) no requiere migración destructiva. Arquitectura 2, si se escala, es un compromiso mayor (buffer cliente + trust model).

---

## 11. Qué falta para el sign-off (acciones de German)

1. **Paquete legal formal como posible STOP, NO como visto bueno.** La lectura preliminar de German NO lo sustituye (ella misma lo recomienda). Sign-off de German = "apruebo el diseño + comisiono el paquete legal" — NO "construir ya". **No hay implementación hasta que el paquete DEVUELVA un OK.** Componentes (de la lectura de German):
   - Concepto escrito de abogado colombiano especializado (sensibles + posibles menores + transferencia internacional + consentimiento anónimo). **Alcance ampliado:** debe cubrir también el **funnel desplegado hoy** — O*NET recolecta respuestas de intereses (sensibles Art. 5 por la política §3) de forma anónima pre-consentimiento (caso "fila 1" del abogado, vivo en prod). Un concepto acotado a W7/BFI dejaría ese gap sin tocar.
   - **Mitigación interim del funnel vivo (`[GAP-ONET-ANON-SENSIBLE-PRECONSENT]`):** exposición actual baja (pre-lanzamiento, ~4 usuarios de prueba, sin tráfico real), pero estructural. Decidir si requiere acción antes de tráfico real, independiente de W7: (a) mover O*NET al tramo autenticado ya (mismo fix que §5.5); (b) consent-sensible anónimo para O*NET; (c) reclasificar intereses en §3 si el legal lo respalda. Puede ser MÁS urgente que W7 por estar live.
   - Evaluación de impacto de privacidad (PIA).
   - Diagrama completo del flujo de datos.
   - Matriz de terceros y analítica (SDKs, fingerprinting).
   - Prueba técnica de anonimización (red + logs), no solo lo que diga la UI.
   - Texto de consentimiento + aviso específico de tratamiento psicométrico.
   - Protocolo para usuarios que declaren ser menores.
   - `Nota:` una consulta a la SIC da criterio general pero NO equivale a autorización/certificación previa; los conceptos no son obligatorios ni salvoconducto. No esperar a la SIC como gate.
   - `Input al concepto:` "¿Arquitectura 1 (server + consentimiento previo + TTL) es suficiente, o se exige Arquitectura 2 (local-first)?" — el abogado decide el pivote.
2. Aprobar (o ajustar) las decisiones abiertas: (a) N del TTL (horas); (b) IP truncada sí/no en `anonymous_consent` (§5.6 sub-decisión); (c) O*NET anónimo-2º vs autenticado; (d) modelo de enlace `anonymous_consent`↔`consent`.
3. Confirmar el orden final + autorizar a Cowork la revisión del copy §1 + el texto de la pantalla gate + la divulgación §3.
4. Secuenciar la enmienda de consent §3→1.1.0 (§8) antes del despliegue de W7.
5. Solo tras OK legal: se planea como su propio Wave/plan GSD (`/gsd-plan-phase` → `02.1-0X-PLAN.md`) con threat model — toca el funnel desplegado + schema + un cron.

---

## 12. Alternativa A (recordatorio, NO elegida)

O*NET sigue de gancho anónimo; BFI = primer test AUTENTICADO con framing personality-led + copy + clímax del teaser. Entrega el espíritu de ADR-027 sin cruzar la línea distress-pre-consent ni el modelo de consent anónimo. Queda documentada por si el paquete legal del §11 desaconseja tanto Arquitectura 1 como 2.

---

*Fin del DESIGN W7 v0.2. PROPUESTA REVISADA — pendiente de sign-off de German + paquete legal formal. No implementar hasta OK legal. Reemplaza v0.1.*
