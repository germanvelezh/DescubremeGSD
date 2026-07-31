-- 019_instrument_version_block_size.sql — el tamano de bloque del runner deja
-- de ser un branch por codigo de instrumento y pasa a ser DATO (Plan 03-02,
-- Wave 2, D-15 / ADR-046).
--
-- Hasta hoy el bloqueo anti-abandono vivia cableado en el Server Component como
-- `runnerCode === 'ONET-IP-SF' && totalItems === 60 ? 12 : null` — un branch por
-- codigo de instrumento, justo lo que el motor evita por FOUND-05. Con esta
-- columna, sembrar un instrumento con bloques (VIA-IS-P-96 = 8 x 12) pasa a ser
-- SEED, no release.
--
-- Anchors:
--   - 03-CONTEXT.md D-15 (block_size como columna), D-16/D-17/D-18 (runner).
--   - 03-UI-SPEC.md §5 (Runner del stack) y §6 (sugerencia de pausa).
--   - Consumidor: lib/session/anonymous.ts (getInstrumentVersionMeta) ->
--     app/(b2c)/test/[code]/page.tsx -> lib/free/runner-navigation.ts
--     (resolveBlockPosition, que YA recibia blockSize como parametro).
--   - Analogo de forma: 014_visual_type_centering_integrator_rule.sql:31-47.
--
-- IDEMPOTENCIA: el backfill esta guardado por `block_size is null`, asi que
-- re-correr la migracion sobre una base ya migrada no cambia ningun valor.
--
-- ============================================================================
-- POR QUE EL BACKFILL VA ADEMAS EN EL SEED (leelo antes de borrar cualquiera
-- de los dos — MEDIDO, no supuesto)
-- ============================================================================
-- `supabase db reset` corre las migraciones PRIMERO y los seeds DESPUES (ver la
-- cabecera de supabase/seed.sql). La fila de `instrument_version` de ONET-IP-SF
-- la crea el SEED, no una migracion. Consecuencia: este UPDATE no encuentra
-- ninguna fila en un reset limpio y es un NO-OP en local y en CI.
--
-- Se verifico en la base local: `select i.code, iv.visual_type from
-- instrument_version iv join instrument i on i.id = iv.instrument_id` devuelve
-- `visual_type = null` para ONET-IP-SF — es decir, el backfill del analogo
-- `014:41-47` NUNCA hizo trabajo en un reset limpio, y nadie lo noto.
--
-- Por eso el valor vive en DOS lugares, cada uno cubriendo un entorno distinto:
--   1. ESTE UPDATE  -> cubre PROD (la fila ya existe alli; el forward-apply la
--      alcanza). Sin el, al retirar el branch del codigo el bloqueo de 5x12
--      desapareceria EN SILENCIO en produccion: es UX, ningun test enrojece.
--   2. `db/seeds/instruments/ONET-IP-SF/instrument-version.sql` -> cubre LOCAL,
--      CI y cualquier reseed futuro, donde la fila nace despues de esta
--      migracion.
-- Borrar cualquiera de los dos rompe uno de los dos entornos sin senal roja.
--
-- Threat register:
--   - T-03-02-01 Tampering: el CHECK rechaza valores no positivos (un
--     `block_size` de 0 o negativo produciria division por cero / bordes
--     infinitos en el runner). El backfill es guardado y acotado a un solo
--     instrumento por codigo. La asercion de que el valor efectivo es 12 vive en
--     tests/integration/block-size-data.test.ts, no en la lectura de este archivo.
--   - T-03-02-SC: esta migracion no instala ningun paquete. Sin superficie de
--     cadena de suministro nueva.
--
-- Apply note: se aplica en LOCAL y CI via `supabase db reset`. **Mergear NO
-- aplica migraciones** ([GAP-MIGRACIONES-MERGEADAS-SIN-LLEGAR-A-PROD]): la
-- aplicacion a PROD es un paso aparte, con OK explicito de German.

-- ---------------------------------------------------------------------------
-- instrument_version.block_size — items por bloque del runner (D-15)
-- ---------------------------------------------------------------------------
-- NULL = sin presentacion por bloques (barra continua). Es el default correcto:
-- la mayoria de los instrumentos del stack son cortos y no necesitan chunking.
alter table public.instrument_version
  add column block_size integer
    check (block_size is null or block_size > 0);

comment on column public.instrument_version.block_size is
  'Items por bloque del runner (D-15). NULL = barra continua, sin bloques. El runner lee ESTE dato; no existe branch por codigo de instrumento.';

-- Preserva el comportamiento vivo de O*NET IP-SF: 60 items en 5 bloques de 12.
-- Idempotente via `block_size is null` (re-correr no cambia nada).
-- NO-OP en un reset limpio a proposito — ver la nota larga de arriba; el seed
-- del instrumento es quien cubre ese entorno.
update public.instrument_version
set block_size = 12
from public.instrument i
where instrument_version.instrument_id = i.id
  and i.code = 'ONET-IP-SF'
  and instrument_version.block_size is null;
