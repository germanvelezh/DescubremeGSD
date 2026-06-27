-- 017_free_order_bfi_first.sql — Phase 2.1 Wave A (ADR-029, funnel invertido).
--
-- Reorders the B2C Free guided stack so BFI-2-S is the FIRST test (personality
-- hook) and O*NET second. New order: 1 BFI-2-S, 2 ONET-IP-SF, 3 TwIVI, 4 PERMA.
--
-- WHY a migration and not just the seed edit: db/seeds/product-stack/free/seed.sql
-- is idempotent via NOT EXISTS on (product_code, instrument_version_id), so editing
-- the seed's order column does NOT update rows that already exist (prod / any DB
-- seeded before this change). The seed edit only governs fresh DBs (supabase db
-- reset). This migration reorders the existing rows.
--
-- SAFE: public.product_stack has no unique constraint on (product_code, "order")
-- (002_user_data.sql:245-251 — PK is id only), so reassigning orders cannot collide.
-- IDEMPOTENT: declarative CASE sets the canonical order regardless of current values;
-- re-running yields the same result. Affects 0 rows on an unseeded DB (harmless).
--
-- Anchors: db/seeds/product-stack/free/seed.sql (fresh-DB source of the same order),
-- lib/free/next-test.ts (loadFreeOrderedCodes reads product_stack.order), ADR-029.

begin;

update public.product_stack ps
set "order" = case i.code
                when 'BFI-2-S'        then 1
                when 'ONET-IP-SF'     then 2
                when 'TwIVI'          then 3
                when 'PERMA-Profiler' then 4
                else ps."order"
              end
from public.instrument_version iv
join public.instrument i on i.id = iv.instrument_id
where ps.instrument_version_id = iv.id
  and ps.product_code = 'free'
  and iv.version = '1.0'
  and iv.lang = 'es-CO'
  and i.code in ('BFI-2-S', 'ONET-IP-SF', 'TwIVI', 'PERMA-Profiler');

commit;
