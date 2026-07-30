-- product + product_stack seed (B2C Paid) — DescubreMe Fase 3 Wave 1 (Plan 03-01).
--
-- El stack del Paid son 11 filas de DATOS, no codigo (FOUND-05, principio 1).
-- El orden vive en `product_stack."order"`, nunca en una lista de codigos en
-- .ts. Orden del stack core segun 03-CONTEXT.md:39:
--
--    1. BFI-2-60        (personalidad, 60 items)   <- plan 03-04
--    2. VIA-IS-P-96     (fortalezas,   96 items)   <- plan posterior
--    3. PVQ-RR          (valores,      57 items)   <- plan posterior
--    4. ONET-IP-SF      (intereses,    60 items)   <- ESTE PLAN
--    5. MLQ             (sentido,      10 items)   <- plan posterior
--    6. WAMI            (sentido,      10 items)   <- plan posterior
--    7. PERMA-Profiler  (bienestar,    23 items)   <- ESTE PLAN
--    8. Ryff-PWB        (bienestar,    18 items)   <- plan posterior
--    9. SWLS            (satisfaccion,  5 items)   <- plan posterior
--   10. PANAS-S         (afecto,       20 items)   <- plan posterior
--   11. FSS-9           (flow,          9 items)   <- plan posterior
--
-- ESTE PLAN SIEMBRA SOLO 2 FILAS. Las otras 9 requieren instrumentos que
-- todavia no existen en el catalogo; un INSERT ... SELECT con JOIN sobre
-- `instrument` simplemente no produce fila para un instrumento ausente, asi
-- que sembrarlas ahora seria un seed que "pasa en verde" habiendo insertado
-- nada. Cada plan posterior ANADE su propia fila a ESTE MISMO archivo con el
-- numero de `order` que le corresponde arriba.
--
-- D-11 — POR QUE ESTAS DOS Y POR QUE IMPORTA:
-- O*NET IP-SF y PERMA-Profiler son EL MISMO `instrument_version` en el Free y
-- en el Paid (misma version, mismo idioma). Despues de este seed cada uno
-- tendra DOS filas de `product_stack` que difieren solo en `product_code`.
-- Esa es exactamente la razon por la que el guard de `/test/*` NO puede
-- preguntar "pertenece al stack Paid": eso devolveria verdadero para O*NET y
-- mandaria al paywall a los usuarios del Free, que es el embudo de adquisicion
-- vivo. El predicado correcto es la EXCLUSIVIDAD (esta en Paid Y NO en Free) —
-- ver lib/entitlement/resolve.ts y tests/unit/entitlement/paid-only.test.ts.
--
-- `layer = 'core'` distingue el stack core de los add-ons opcionales (MEMS,
-- BPNSFS, CFI-R/PGI), que llegan en el plan 03-10 con su propia capa. OJO: la
-- capa TAMPOCO sirve para decidir el guard — O*NET tiene una fila con capa
-- 'free' y otra con 'core'.
--
-- IDEMPOTENTE: `product` via ON CONFLICT (code); `product_stack` via NOT EXISTS
-- sobre (product_code, instrument_version_id) — la tabla no tiene UNIQUE sobre
-- ese par, asi que el NOT EXISTS es la unica garantia. Seguro de re-correr y
-- bajo `supabase db reset`.
--
-- DEPENDENCIA DE ORDEN: necesita que existan los `instrument_version` de
-- ONET-IP-SF y PERMA-Profiler, asi que en `supabase/config.toml` [db.seed]
-- `sql_paths` este archivo va DESPUES de los seeds de instrumentos. Si no
-- queda registrado ahi, no corre y el seed falla EN VERDE.
--
-- Anchors:
--   - db/seeds/product-stack/free/seed.sql (plantilla literal).
--   - 03-CONTEXT.md:39 (orden del stack core), D-11 (reuso O*NET/PERMA).
--   - 03-01-PLAN.md Task 3 step 8.

BEGIN;

-- El producto B2C Paid (perfil profundo, pago unico — sin suscripcion, AF-10).
INSERT INTO public.product (code, description)
VALUES ('paid', 'B2C Paid — perfil profundo (11 instrumentos + reporte por capas)')
ON CONFLICT (code) DO NOTHING;

-- Las filas del stack core cuyos instrumentos YA existen en el catalogo.
INSERT INTO public.product_stack (product_code, instrument_version_id, "order", layer)
SELECT 'paid', iv.id, ord.position, 'core'
FROM (VALUES
  ('ONET-IP-SF',     4),
  ('PERMA-Profiler', 7)
) AS ord(code, position)
JOIN public.instrument i ON i.code = ord.code
JOIN public.instrument_version iv
  ON iv.instrument_id = i.id
 AND iv.version = '1.0'
 AND iv.lang = 'es-CO'
WHERE NOT EXISTS (
  SELECT 1
  FROM public.product_stack ps
  WHERE ps.product_code = 'paid'
    AND ps.instrument_version_id = iv.id
);

COMMIT;
