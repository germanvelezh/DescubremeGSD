-- 020_entitlement_idempotency.sql — idempotencia del cobro + guard de lectura
-- sobre `entitlement` (Plan 03-01, Fase 3 Wave 1).
--
-- PROPOSITO
-- Hard Gate del ROADMAP §Phase 3: un webhook de Stripe reintentado NO puede
-- conceder un segundo acceso pagado. Medido en prod el 2026-07-30, la tabla
-- `entitlement` era un esqueleto de la Fase 1 (migracion 006): sin
-- `payment_intent_id`, sin ningun UNIQUE mas alla del pkey, y con 0 filas.
-- La idempotencia que el Hard Gate exige, sencillamente, no existia.
--
-- DECISION DE ORIGEN — D-20, resuelta por German el 2026-07-30 (opcion
-- `parcial`). D-20 pedia literalmente "UNIQUE por payment_intent_id". Se
-- implementa la forma COMPLETA, que no lo contradice sino que lo cierra:
--
--   Un `UNIQUE (payment_intent_id)` plano NO PROTEGE NADA cuando la columna es
--   NULL. En Postgres dos NULL no colisionan entre si, asi que N filas con
--   `payment_intent_id IS NULL` conviven felices bajo un UNIQUE. Y hay un caso
--   real que produce exactamente eso: una Checkout Session con
--   `payment_status = 'no_payment_required'` se completa SIN PaymentIntent.
--   Por eso van dos indices parciales — uno por cada identificador con el que
--   Stripe puede identificar un pago— cada uno con su predicado IS NOT NULL.
--
-- LAS DOS CAPAS DE IDEMPOTENCIA (son distintas, y hacen falta las dos):
--   Capa 1 — `stripe_event_processed`: el MISMO `event.id` reintentado. Stripe
--            reintenta un webhook hasta que responda 2xx, asi que el mismo
--            evento llega varias veces por diseno, no por fallo.
--   Capa 2 — los indices parciales sobre `entitlement`: dos eventos DISTINTOS
--            que apuntan al mismo pago. La capa 1 no los ve (sus `event.id`
--            difieren); solo el schema puede pararlos.
--
-- Estos indices SON el target del `ON CONFLICT` del webhook: la idempotencia
-- vive en el schema y el codigo la consume. Al reves —dejarla en el codigo—
-- dos peticiones concurrentes se cruzan entre el SELECT y el INSERT.
--
-- ANCHORS
--   - 03-01-PLAN.md must_haves D-20, Task 2 (checkpoint:decision), Task 3 step 6.
--   - supabase/migrations/006_aggregate_view_placeholder.sql (crea `entitlement`
--     con RLS habilitado y CERO politicas — deny por defecto desde la Fase 1).
--   - supabase/migrations/012_item_response_session_item_unique.sql (analogo:
--     CREATE UNIQUE INDEX IF NOT EXISTS como invariante y como target de
--     ON CONFLICT).
--   - supabase/migrations/003_rls_policies.sql (convencion BLOQUEADA de politica
--     de datos propios). NO se usa como analogo la politica de catalogo de
--     014:72-75, que concede lectura a cualquier autenticado.
--   - app/api/stripe/webhook/route.ts (el unico escritor).
--
-- THREAT REGISTER
--   - T-03-01-01 Spoofing (critical): la firma del webhook se verifica en el
--     handler; esta migracion es la red de abajo si esa capa fallara.
--   - T-03-01-03 Elevation of Privilege (high): `own_entitlement_select` con la
--     convencion bloqueada, y CERO politicas de escritura sobre `entitlement`.
--     Deny por defecto: ni siquiera el propio usuario puede insertarse un
--     acceso. Solo el webhook, con service_role, concede.
--   - T-03-01-06 Repudiation (medium): `stripe_event_processed` deja trazable
--     que evento concedio que acceso, con su `processed_at`.
--   - T-03-01-SC: esta migracion no instala paquetes.
--
-- APPLY NOTE — IMPORTANTE
-- Reversibilidad `one-way`: una vez que haya filas de `entitlement` de usuarios
-- reales, cambiar la forma del indice exige backfill y ventana de mantenimiento.
-- Esta migracion corre en LOCAL y CI via `supabase db reset`. **MERGEAR NO LA
-- APLICA A PROD** ([GAP-MIGRACIONES-MERGEADAS-SIN-LLEGAR-A-PROD], regla
-- verificada del proyecto). Su aplicacion a produccion es un paso APARTE, con
-- OK explicito de German, en su propio momento.
--
-- Idempotente para forward-apply: columnas con IF NOT EXISTS, indices con
-- IF NOT EXISTS, tabla con IF NOT EXISTS y la politica con drop-then-create.
-- El paso de dedup del analogo 012 NO aplica: `entitlement` tiene 0 filas, asi
-- que no hay duplicados previos que resolver antes de imponer el UNIQUE.

-- ---------------------------------------------------------------------------
-- 1. entitlement: los dos identificadores de pago de Stripe
-- ---------------------------------------------------------------------------
-- Nullable a proposito: un `entitlement` puede concederse por una via que no
-- sea Stripe (cortesia, soporte, B2B en la Fase 4). Los indices parciales son
-- justamente lo que permite que esas filas conviven sin colisionar.
ALTER TABLE public.entitlement
  ADD COLUMN IF NOT EXISTS payment_intent_id text;

ALTER TABLE public.entitlement
  ADD COLUMN IF NOT EXISTS checkout_session_id text;

-- ---------------------------------------------------------------------------
-- 2. Capa 2 de idempotencia — indices parciales (D-20, opcion `parcial`)
-- ---------------------------------------------------------------------------
-- El predicado `WHERE ... IS NOT NULL` es el punto entero de la decision: sin
-- el, las filas sin pago de Stripe chocarian entre si (una sola podria existir),
-- y con UNIQUE plano las multiples NULL no quedarian protegidas de todos modos.
CREATE UNIQUE INDEX IF NOT EXISTS entitlement_payment_intent_uniq
  ON public.entitlement (payment_intent_id)
  WHERE payment_intent_id IS NOT NULL;

-- Cubre el caso que el UNIQUE literal de D-20 dejaba fuera: Checkout Sessions
-- con `payment_status = 'no_payment_required'`, que se completan sin
-- PaymentIntent y por tanto sin nada que el indice de arriba pueda ver.
CREATE UNIQUE INDEX IF NOT EXISTS entitlement_checkout_session_uniq
  ON public.entitlement (checkout_session_id)
  WHERE checkout_session_id IS NOT NULL;

-- ---------------------------------------------------------------------------
-- 3. Capa 1 de idempotencia — registro de eventos ya procesados
-- ---------------------------------------------------------------------------
-- `event_id` es PRIMARY KEY, y ESA es la restriccion UNIQUE que el Hard Gate
-- pide (el plan la nombra `stripe_event_processed_event_id_uniq`). No se crea
-- un segundo indice unico sobre la misma columna: seria almacenamiento
-- duplicado y una segunda cosa que mantener sincronizada, sin ganar ninguna
-- garantia. El pkey sirve igual como target de `ON CONFLICT (event_id)`.
CREATE TABLE IF NOT EXISTS public.stripe_event_processed (
  event_id     text primary key,
  event_type   text not null,
  processed_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 4. RLS
-- ---------------------------------------------------------------------------
-- `entitlement` ya trae RLS habilitado desde 006; se repite por ser explicito
-- e idempotente (habilitar dos veces es un no-op).
ALTER TABLE public.entitlement ENABLE ROW LEVEL SECURITY;

-- Nadie lee esta tabla desde la app: solo el webhook la escribe con
-- service_role, que salta RLS. RLS habilitado + CERO politicas = deny total
-- para `anon` y `authenticated`. Los `event_id` no son secretos, pero tampoco
-- tienen ningun consumidor de usuario, y una tabla sin lectores no necesita
-- una politica de lectura.
ALTER TABLE public.stripe_event_processed ENABLE ROW LEVEL SECURITY;

-- La mitad de base de datos del guard doble del criterio 5 del ROADMAP. Con el
-- redirect del Server Component SOLO no se cumple el criterio: un redirect es
-- una decision de la capa de presentacion, y cualquier otra ruta que consulte
-- `entitlement` con el cliente user-scoped se saltaria esa decision. La
-- politica es la que hace que "ver el acceso de otro" sea imposible por
-- construccion, no por convencion.
--
-- Convencion BLOQUEADA del repo (003 + PATTERNS §1.5): `(select auth.uid())`
-- envuelto para el cacheo del initPlan, mas el guard IS NOT NULL contra el rol
-- `anon` colado con un JWT viejo.
DROP POLICY IF EXISTS "own_entitlement_select" ON public.entitlement;
CREATE POLICY "own_entitlement_select"
  ON public.entitlement FOR SELECT
  TO authenticated
  USING (
    (select auth.uid()) is not null
    and user_id = (select auth.uid())
  );

-- NINGUNA politica de INSERT / UPDATE / DELETE sobre `entitlement`, a
-- proposito. Deny por defecto: el acceso pagado solo lo concede el webhook con
-- firma verificada, corriendo con service_role. Que un usuario autenticado
-- pudiera insertar su propia fila haria que todo el flujo de cobro fuera
-- decorativo.
