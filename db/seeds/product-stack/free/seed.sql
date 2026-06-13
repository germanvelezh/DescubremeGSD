-- product + product_stack seed (B2C Free) — DescubreMe Phase 2 Wave 6 (Plan 02-13).
--
-- Seeds the guided 4-test order that resolveNextFreeTest consumes
-- (lib/free/next-test.ts, Plan 02-07 — flagged this as dormant-until-seeded).
-- Without these rows loadFreeOrderedCodes() returns [] and the Free journey has
-- no ordered list; this seed activates the data-driven order (D-A.5):
--   1. ONET-IP-SF     (intereses,    hexagon)
--   2. BFI-2-S        (personalidad, bars)
--   3. TwIVI          (valores,      circumplex)
--   4. PERMA-Profiler (bienestar,    bars)
--
-- The order is DATA (product_stack.order), never a hardcoded code list in .ts
-- (FOUND-05 — no-hardcoded-instruments.test.ts covers lib/free). resolveNextFreeTest
-- branches only on the ordered list it is given; this seed is its source.
--
-- product_code = 'free' (FREE_PRODUCT_CODE in next-test.ts). The product row must
-- exist first (product_stack.product_code FK -> product.code).
--
-- IDEMPOTENT: product via ON CONFLICT (code); product_stack via NOT EXISTS on
-- (product_code, instrument_version_id). Safe to re-run / under supabase db reset.
-- Depends on the 4 instrument_version rows existing — so seed.sql MUST source the
-- instrument seeds BEFORE this file.
--
-- Anchors:
--   - lib/free/next-test.ts (FREE_PRODUCT_CODE, loadFreeOrderedCodes query shape).
--   - supabase/migrations/002_user_data.sql (product + product_stack tables).
--   - 02-CONTEXT.md D-A.5 (orden fijo), 02-UI-SPEC.md §7.1 (4-test flow).

BEGIN;

-- The B2C Free product (D-A.3 single consent product).
INSERT INTO public.product (code, description)
VALUES ('free', 'B2C Free — 4 tests + perfil integrado teaser')
ON CONFLICT (code) DO NOTHING;

-- The 4 Free instruments in guided order. Each row joins product 'free' to the
-- es-CO v1.0 instrument_version of the named instrument, with its 1-based order.
INSERT INTO public.product_stack (product_code, instrument_version_id, "order", layer)
SELECT 'free', iv.id, ord.position, 'free'
FROM (VALUES
  ('ONET-IP-SF',     1),
  ('BFI-2-S',        2),
  ('TwIVI',          3),
  ('PERMA-Profiler', 4)
) AS ord(code, position)
JOIN public.instrument i ON i.code = ord.code
JOIN public.instrument_version iv
  ON iv.instrument_id = i.id
 AND iv.version = '1.0'
 AND iv.lang = 'es-CO'
WHERE NOT EXISTS (
  SELECT 1
  FROM public.product_stack ps
  WHERE ps.product_code = 'free'
    AND ps.instrument_version_id = iv.id
);

COMMIT;
