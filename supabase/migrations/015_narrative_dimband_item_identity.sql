-- 015_narrative_dimband_item_identity.sql — Pre-seed schema for the 3 new Free
-- instruments (Plan 02-13, Wave 6). The BLOCKING dependency the 02-13 db reset
-- needs: without it, every bars/circumplex narrative seed (BFI-2-S 02-09,
-- TwIVI 02-10, PERMA 02-11) FAILS on insert.
--
-- Three accumulated schema gaps closed here (deferred-items.md):
--   1. [GAP-NARRATIVE-DIMBAND-SCHEMA] P0 — narrative_template (migration 002)
--      has riasec_code NOT NULL, NO dimension/band columns, and a slot CHECK
--      that excludes 'dimension_band'. lib/report/narrative-loader.ts (02-04)
--      already queries by (slot='dimension_band', dimension, band); this makes
--      the table able to HOLD those rows.
--   2. [GAP-ITEM-CODE-COLUMN] P1 (D-E2.1) — add item.item_code so BFI-2-S items
--      can carry their canonical BFI-2-60 identity for the Phase-3 Free->Paid
--      projection. Nullable: only the BFI rows populate it today.
--   3. [GAP-ITEM-ANCHOR-COLUMNS] P1 — add item.anchor_min/anchor_max so the
--      PERMA 0-10 numeric-endpoints per-block labels persist as DATA (UI-SPEC
--      §6.9 renders them via response-scales.ts, FOUND-05). Nullable: only the
--      numeric-endpoints instrument (PERMA) populates them.
--
-- [GAP-NARRATIVE-PER-INSTRUMENT-SCOPING] decision (deferred-items #2, locked):
-- narrative_template gets NO per-instrument discriminator (no instrument_version_id
-- FK). The 02-04 loader queries (dimension, band) WITHOUT an instrument filter,
-- and the three dimband seeds already enforce GLOBALLY-UNIQUE dimension codes by
-- convention (BFI EXT/AGR/CON/NEG/OPN; TwIVI OCH/SEN/CSV/STR — CON->CSV rename in
-- 02-10 precisely to avoid the BFI 'CON' collision; PERMA P/E/R/M/A/N/H/Lon/hap).
-- Cross-checked collision-free. Adding the FK would force rewriting all 3 seeds
-- + the loader + would break the 02-04 mocked test for zero benefit the current
-- code needs. The convention is the contract; this comment is its documentation.
--
-- Anchors:
--   - supabase/migrations/002_user_data.sql (narrative_template base table).
--   - supabase/migrations/001_plugin_catalog.sql (item base table).
--   - lib/report/narrative-loader.ts (dimension_band query path).
--   - db/seeds/narrative-templates/{BFI-2-S,TwIVI,PERMA-Profiler}/seed.sql.
--   - db/seeds/instruments/BFI-2-S/items.sql (item_code source), PERMA-Profiler/items.sql (anchors).
--   - 02-CONTEXT.md D-C.4 (narrative dimension×band), D-E2.1 (Free->Paid identity).
--   - deferred-items.md [GAP-NARRATIVE-DIMBAND-SCHEMA], [GAP-ITEM-CODE-COLUMN],
--     [GAP-ITEM-ANCHOR-COLUMNS], [GAP-NARRATIVE-PER-INSTRUMENT-SCOPING].
--
-- Threat register:
--   - T-02-13-SC: no new npm/pip/cargo installs in this migration.
--   - Tampering: the extended slot CHECK still bounds slot to a closed enum.
--   - RLS unchanged: narrative_template + item keep their existing public-read
--     policies (catalog tables); writes remain service_role-only.

-- ---------------------------------------------------------------------------
-- narrative_template: dimension×band support ([GAP-NARRATIVE-DIMBAND-SCHEMA])
-- ---------------------------------------------------------------------------

-- 1. riasec_code is only meaningful on the RIASEC (hexagon) path. dimension×band
--    rows (bars/circumplex) leave it NULL.
alter table public.narrative_template
  alter column riasec_code drop not null;

-- 2. Add the dimension×band keys the loader queries on.
alter table public.narrative_template
  add column dimension text;

alter table public.narrative_template
  add column band text;

-- 3. Extend the slot CHECK to admit the 'dimension_band' slot. The inline
--    constraint from migration 002 is auto-named narrative_template_slot_check.
alter table public.narrative_template
  drop constraint narrative_template_slot_check;

alter table public.narrative_template
  add constraint narrative_template_slot_check
    check (slot in ('top_3_phrase', 'dimensional_high', 'dimensional_low', 'dimension_band'));

-- 4. Partial unique index on the dimension×band rows so a re-seed cannot
--    duplicate a (version, lang, dimension, band) phrase. Scoped WHERE
--    slot='dimension_band' so the RIASEC rows (no dimension/band) are exempt.
create unique index narrative_template_dimband_unique
  on public.narrative_template (version, lang, dimension, band)
  where slot = 'dimension_band';

-- ---------------------------------------------------------------------------
-- item: canonical identity + numeric-endpoint anchors
-- ---------------------------------------------------------------------------

-- [GAP-ITEM-CODE-COLUMN] D-E2.1: the BFI-2-60 canonical number (e.g.
-- 'BFI-2-60-16'). Nullable — scoring stays positional (<dimension><ordinal>);
-- this is identity for the Phase-3 Free->Paid projection only.
alter table public.item
  add column item_code text;

-- [GAP-ITEM-ANCHOR-COLUMNS]: per-item 0-10 endpoint labels for the
-- numeric-endpoints scale (PERMA). Nullable — only numeric-endpoints
-- instruments populate them; labeled-rows/hexagon instruments leave them NULL
-- and render anchors via response-scales.ts.
alter table public.item
  add column anchor_min text;

alter table public.item
  add column anchor_max text;
