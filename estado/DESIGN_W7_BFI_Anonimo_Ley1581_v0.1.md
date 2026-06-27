# DESIGN W7 — BFI-2-S como gancho anónimo (mecanismo Ley 1581) v0.1

**Estado:** PROPUESTA para sign-off de German. NO implementado. NO se toca el funnel desplegado hasta aprobación.
**Owner / responsable del tratamiento:** German Velez Hurtado.
**Autor del diseño:** Claude Code.
**Fecha:** 2026-06-26.
**Decisión de origen:** ADR-027 Task 5 + German eligió "insistir en BFI-anónimo-primero" (2026-06-26), asumiendo los blockers.
**Relacionado:** `estado/STATUS.md` (entrada 2026-06-26 PM), `02.1-01-PLAN.md` Wave 7, `lib/consent/*`, `app/auth/callback/route.ts`, `lib/session/*`.

---

## 1. Resumen ejecutivo (3-5 líneas)

German decidió entregar el reorder literal de ADR-027: BFI-2-S (personalidad, `sensitivity='high'`, distress-flagged) como la primera experiencia de un usuario **anónimo** (pre-signup). Eso cruza la línea que el proyecto protege hoy: exponer a un anónimo no consentido y con edad no verificada a un instrumento distress-flagged antes del disclaimer NFR-27 y la ruta NFR-28. Este documento especifica el mecanismo Ley 1581 mínimo para hacerlo defendible: gate de edad al tope, NFR-27 + autorización de datos sensibles pre-test, un modelo de consentimiento para sesión anónima (revocable, migrable al claim), TTL/borrado de datos anónimos no reclamados, y la generalización del anon-entry hoy hardcodeado a O*NET. **Recomendación firme: revisión legal formal antes de desplegar** (sensibles + posibles menores).

---

## 2. Estado actual (lo que existe — `Hecho`)

- **Anon entry hardcodeado a O*NET:** `onboarding/before-you-start` CTA → `/test/onet-ip-sf`; `/test/[code]/done` rama anónima gatea en `progress < 60` (conteo O*NET) + computa teaser RIASEC → `/signup`. `product_stack.order` solo manda en el tramo autenticado (`resolveNextFreeTest`).
- **Gate 18+ en signup:** `signupAction` (Zod + `isAtLeast18(dob)`) + re-verificación en `/auth/callback` (`isAtLeast18(metadata.dob_pending)`; `<18` → signOut + `/?error=age`). NINGÚN dato sensible se procesa antes de este gate hoy.
- **Sensibles post-consent:** BFI-2-S/TwIVI/PERMA se administran en el tramo autenticado, tras dual-consent (general + sensible) capturado en signup. O*NET (`sensitivity='normal'`, sin flags distress) es el gancho pre-consent.
- **Sesión anónima:** cookie `anonymous_session_id` → `assessment_session` con `user_id=null`; respuestas contra la sesión anónima; `claimAnonymousSession(user.id)` setea `user_id` al signup.
- **Consent keyed por user_id:** la tabla `consent` tiene `user_id NOT NULL` (FK). Un anónimo no tiene `user_id` → una fila de consent anónima no cabe en el modelo actual.
- **NFR-27/28 ya existen:** `DisclaimerModal` (variant bfi|perma) + `ContentionBanner` + `getContentionResources`. Hoy se montan en el tramo autenticado (TransitionScreen antes del 1er ítem del sensible).
- **Flags de instrumento (seed):** BFI-2-S `sensitivity='high'`, `ethical_flags={pretest_modal:true, contention_route:true, distress_detector:true}`. O*NET `sensitivity='normal'`, sin flags.

---

## 3. La línea que cruza el reorder (por qué necesita este mecanismo)

`Hecho:` exponer a un usuario **anónimo, no consentido, con edad no verificada** a un instrumento **distress-flagged** (NFR-27 modal + NFR-28 contención exigidos por su propio seed), ANTES de ese disclaimer y esa ruta, es lo que el funnel actual evita poniendo O*NET (no distress) de gancho.

`Opinión profesional (German decide como responsable):` bajo Ley 1581 / Decreto 1377, datos sensibles de **posibles menores** requieren consentimiento parental; un consentimiento atado a sesión anónima (sin identidad verificable) es estructuralmente débil y no-revocable por el canal normal. El mecanismo de abajo mitiga, no elimina, estos riesgos.

---

## 4. El mecanismo (5 componentes)

### 4.1 Gate de edad al tope del funnel (DOB use-and-discard, NO atestación)

- **DOB real, usar-y-descartar (recomendado):** recolectar fecha de nacimiento → `isAtLeast18(dob)` server-side → **descartar** (no almacenar) → re-recolectar en signup. Misma barra que el flujo de cuenta, NO almacena nada extra pre-cuenta, y elimina el reparo más obvio para un revisor legal ("procesaste datos sensibles distress-flagged tras un control de edad MÁS DÉBIL que el de tu propio signup"). Preferible a una atestación auto-declarada por checkbox.
  - Sub-opción descartada: atestación "Confirmo que tengo 18+" (más débil; un revisor legal la marcará).
- **Verificación real en signup (sin cambio):** `signupAction`/`callback` siguen recolectando + verificando DOB. Si `<18` en signup → además de `signOut`, **borrar la sesión anónima + sus respuestas** (sensibles capturados bajo un DOB-top falseado se eliminan). NUEVO: hoy el callback solo redirige; debe disparar el borrado de la sesión anónima reclamada-fallida.
- `Riesgo residual (no eliminado):` DOB-top es auto-reportado; un menor decidido miente igual (atestación o DOB). Eso es exactamente lo que §3 + la revisión legal §8.1 deben resolver — el control de edad reduce, no elimina, la exposición de sensibles de menores en la ventana anónima. Mitigación parcial: TTL corto + borrado en `<18`-at-signup (4.4).

### 4.2 NFR-27 (disclaimer distress) + NFR-28 (contención) para el anónimo

- Montar `DisclaimerModal` variant=bfi ANTES del primer ítem de BFI anónimo (mismo componente que el tramo autenticado, hoy en TransitionScreen). El usuario debe pasar el disclaimer antes de ver el primer ítem.
- `ContentionBanner` / ruta de contención NFR-28 disponible para el anónimo durante y después de BFI (el distress no espera al signup). `getContentionResources` no depende de user_id → reutilizable anónimo.

### 4.3 Autorización de datos sensibles (Ley 1581 Art. 6) pre-test, anónima

- Antes del primer ítem BFI: **autorización explícita** para tratar datos sensibles psicométricos, con propósito acotado (generar tu resultado de personalidad), texto + hash versionado (D1.6: `consent_version`, `text_sha256_hash`, `ip_truncated`, `user_agent`).
- Art. 6 §a: la autorización de sensibles no puede condicionar actividades, salvo cuando la actividad la requiere. Generar el resultado REQUIERE procesar las respuestas → condicionar "ver tu resultado" a la autorización es defendible (la política v1.0.0 §3 ya lo hace: "sin esa autorización no podemos ofrecerte el servicio").

### 4.4 Modelo de consentimiento para sesión anónima (el problema estructural)

- **Nueva tabla `anonymous_consent`** keyed por `anonymous_session_id` (NO user_id): `{anonymous_session_id, consent_sensitive, consent_version, text_sha256_hash, ip_truncated, user_agent, granted_at, revoked_at}`. Aditiva; RLS: sin acceso de cliente (solo service-role).
- **Enlazar, NO migrar-como-segundo-INSERT (corrección crítica):** el callback YA inserta una fila `consent` para `(user_id,'free')`, y `consent_user_product_active_idx` es parcial-único sobre `(user_id, product_code) WHERE revoked_at IS NULL`. Un segundo INSERT (la "migración" del consent anónimo) → **23505**, que el callback HOY swallowea ([BUG-CALLBACK-NOT-IDEMPOTENT]) → los valores que ganan (`consent_sensitive_data`/`text_sha256_hash`/`granted_at` anónimo vs signup) quedan indefinidos y se **perdería el `granted_at`/hash anónimo, que ES la prueba de la autorización pre-signup**. Por eso: **`anonymous_consent` permanece como prueba INMUTABLE de la autorización sensible pre-signup; la fila `consent` del signup NO cambia; se ENLAZA** (p. ej. el `claim` setea `consent.anonymous_session_id` o se conserva la fila `anonymous_consent` referenciable por `anonymous_session_id`). NO se hace un segundo INSERT en `consent`. La prueba pre-signup vive en `anonymous_consent`; la consent de cuenta vive en `consent`; quedan vinculadas por `anonymous_session_id`.
- **Revocabilidad pre-cuenta:** un anónimo que quiere revocar/borrar no tiene cuenta. Mecanismo: (a) endpoint cookie-based `POST /api/anon/erase` que borra la sesión anónima + respuestas + `anonymous_consent` por el `anonymous_session_id` de la cookie, **dejando una traza de auditoría anonimizada** (mismo patrón que el delete de cuenta: la traza queda, la identidad se desvincula — Decreto 1377 Art. 11); (b) **TTL**: cron que borra sesiones anónimas no reclamadas + sus datos tras N días (p. ej. 7-30). Ambos son nuevos.
- `Riesgo residual:` el consentimiento anónimo es novel; sin identidad, la prueba de quién consintió es más débil que con cuenta. El TTL + erase acotan la retención.

### 4.5 Generalización del anon-entry (hoy hardcodeado a O*NET)

El PLAN ya lo marcó como el "key finding". Para BFI-anon-primero hay que generalizar:
- `onboarding/before-you-start` CTA: resolver el primer test desde `product_stack.order` (data-driven) en vez de `/test/onet-ip-sf` hardcodeado.
- `/test/[code]/done` rama anónima: hoy gatea `progress < 60` (O*NET) + teaser RIASEC. Generalizar: gatear por completitud del instrumento actual (data-driven `item_count`) + resolver el siguiente test / el punto de signup desde el stack. El teaser anónimo pasa de RIASEC a personalidad (BFI).
- Signup teaser: de RIASEC top-3 a un teaser de personalidad.
- `resolveNextFreeTest` / `loadFreeOrderedCodes`: ya son data-driven; el cambio es que el tramo anónimo también los consuma (hoy el anónimo está hardcodeado).
- **Orden resultante (ADR-027 §1):** BFI-2-S (1, anónimo) → O*NET (2) → TwIVI (3) → PERMA (4). Sub-decisión abierta: ¿O*NET sigue siendo anónimo (2º test anon) o pasa al tramo autenticado? Su revelación ocupacional (W5) necesita la captura de nivel post-consent; los ítems pueden ser anónimos y la revelación post-signup. **Recomendación:** BFI anónimo (gancho) → signup tras BFI → O*NET/TwIVI/PERMA autenticados. Así solo UN instrumento (BFI) cruza la línea anónima, minimizando la superficie sensible-pre-cuenta.

---

## 5. Cambios técnicos (spec, NO implementación)

| Área | Cambio |
|---|---|
| Schema | `anonymous_consent` (tabla nueva, aditiva) o columnas en `assessment_session`; TTL marker. Migración nueva (017). |
| Rutas | Nueva pantalla gate (atestación 18+ + NFR-27 + autorización sensible) entre `before-you-start` y el 1er test; `POST /api/anon/erase`; cron/TTL de borrado. |
| before-you-start | CTA data-driven (primer test del stack), copy personality-led. |
| `/test/[code]/done` | Rama anónima generalizada (completitud por `item_count`, no `<60`); teaser personalidad. |
| signup/callback | Migrar `anonymous_consent`→`consent` al claim; borrar sesión anónima si `<18` en la verificación real. |
| NFR-27/28 | Montar DisclaimerModal + contención en el flujo anónimo. |
| §1 hooks (W6 diferido) | Cablear los 4 hooks verbatim en el orden resultante; Cowork revisa si "Empecemos"/"Ahora" calzan. |
| Política consent | Actualizar texto §3 para divulgar la recolección sensible anónima (coordinar con la enmienda 1.1.0 ya en BACKLOG). |
| Plugin-as-data | El anon-entry generalizado NO debe hardcodear códigos de instrumento (FOUND-05). |

---

## 6. Riesgos residuales (no eliminados por el mecanismo)

1. **Menores:** DOB-top auto-reportado → datos sensibles de posibles menores se procesan en la ventana anónima. Mitigado parcialmente (control 18+ al tope + TTL + borrado en `<18`-at-signup), NO eliminado — puede ser el blocker que la revisión legal §8.1 declare no-waivable.
2. **Consentimiento anónimo:** prueba de consentimiento más débil sin identidad; modelo novel.
3. **Fricción de funnel:** atestación + NFR-27 + autorización antes del primer test reduce el carácter frictionless del gancho (el objetivo mismo del reorder). Trade-off aceptado por German.
4. **Retención:** respuestas sensibles de sesiones anónimas no reclamadas = superficie de datos; depende del TTL/erase funcionando.
5. **Divulgación:** la política §3 debe divulgar la recolección sensible anónima antes de desplegar.

---

## 7. Reversibilidad

Media. El orden + las superficies de consent son reversibles (feature-flag del orden del stack). El schema (`anonymous_consent`, TTL) es aditivo. El compromiso mayor es el modelo de consent anónimo + el endpoint de erase + el cron TTL. Un rollback al orden actual (O*NET-primero) no requiere migración destructiva.

---

## 8. Qué falta para el sign-off (acciones de German)

1. **Revisión legal formal como posible STOP, NO como visto bueno.** Sign-off de German = "apruebo el diseño + comisiono la revisión legal" — NO "construir ya". `Honesto:` procesar datos sensibles de menores bajo cualquier control de edad puede ser **no waivable aceptando el riesgo**; un resultado legal probable es "no se hace", que ruta de vuelta a la Opción A (§9). **No hay implementación hasta que la revisión legal DEVUELVA un OK**, no solo porque German apruebe el diseño. Cubre: sensibles + posibles menores + transferencia internacional + consentimiento anónimo.
2. Aprobar (o ajustar) las decisiones abiertas: (a) DOB-real-use-and-discard (recomendado) vs atestación al tope; (b) O*NET anónimo-2º vs autenticado; (c) TTL exacto de datos anónimos; (d) modelo de enlace `anonymous_consent`↔`consent`.
3. Confirmar el orden final + autorizar a Cowork la revisión del copy §1 + el texto de la pantalla gate + la divulgación §3.
4. Solo tras OK legal: se planea como su propio Wave/plan (toca el funnel desplegado + schema + un cron) con su threat model.

---

## 9. Alternativa (recordatorio, NO elegida)

La opción A (recomendada originalmente): O*NET sigue de gancho anónimo; BFI = primer test AUTENTICADO con framing personality-led + copy + clímax del teaser. Entrega el espíritu de ADR-027 sin cruzar la línea distress-pre-consent ni el modelo de consent anónimo. Queda documentada por si la revisión legal del §8.1 desaconseja B.

---

*Fin del DESIGN W7 v0.1. PROPUESTA — pendiente de sign-off de German + revisión legal. No implementar hasta aprobación.*
