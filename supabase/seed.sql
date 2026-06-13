-- supabase/seed.sql — canonical seed ORDER + documentation for the Free phase
-- (DescubreMe Phase 2 Wave 6, Plan 02-13). Closes [GAP-SUPABASE-SEED-WIRING]:
-- Phase 1 applied seeds manually via `psql -f`; this is the formal, ordered,
-- idempotent wiring the reset (and CI) run automatically AFTER migrations
-- 001-015.
--
-- HOW IT RUNS: the Supabase CLI (>=2.x) `supabase db reset` does NOT support
-- psql meta-commands (\ir) in its seed batch — it sends the seed as one SQL
-- statement stream. So the actual concatenation order is declared in
-- supabase/config.toml [db.seed] sql_paths, which the CLI reads, concatenates in
-- array order, and runs as SQL. This file is the human-readable index of that
-- order; sql_paths in config.toml is the executable source of truth. CI mirrors
-- the same order (.github/workflows/ci.yml). Every sourced file is idempotent
-- (ON CONFLICT / NOT EXISTS / scoped delete-then-insert).
--
-- DEPENDENCY ORDER (must hold; mirrored in config.toml sql_paths):
--   1. Instrument catalog per instrument: instrument -> instrument_version ->
--      items -> scoring_rule -> baremo. (PERMA + TwIVI fold their instrument row
--      into instrument-version.sql; TwIVI has no baremo — MRAT bypasses it.)
--   2. narrative_template seeds (need migration 015 dimension/band columns).
--   3. integrator_rule teaser seed.
--   4. product + product_stack (needs the 4 instrument_version rows from step 1).
--   5. contention_resources (Phase 1 catalog).
--   6. occupations (Phase 1 O*NET occupation catalog, for the RIASEC report).
--
-- The 4 Free instruments (membership = product_stack 'free'):
--   ONET-IP-SF (intereses) | BFI-2-S (personalidad) | TwIVI (valores) | PERMA-Profiler (bienestar)
--
-- Anchors:
--   - db/seeds/** (the component seeds this file wires).
--   - .github/workflows/ci.yml (mirrors this order in the CI seed step).
--   - deferred-items.md [GAP-SUPABASE-SEED-WIRING].

-- ===========================================================================
-- 1. Instrument catalog (dependency order within each instrument)
-- ===========================================================================

-- O*NET IP-SF (Phase 1 — intereses / hexagon / ipsative_z)
-- run: db/seeds/instruments/ONET-IP-SF/instrument.sql
-- run: db/seeds/instruments/ONET-IP-SF/instrument-version.sql
-- run: db/seeds/instruments/ONET-IP-SF/items.sql
-- run: db/seeds/instruments/ONET-IP-SF/scoring-rule.sql
-- run: db/seeds/instruments/ONET-IP-SF/baremo-intl.sql

-- BFI-2-S (personalidad / bars / ipsative_z)
-- run: db/seeds/instruments/BFI-2-S/instrument.sql
-- run: db/seeds/instruments/BFI-2-S/instrument-version.sql
-- run: db/seeds/instruments/BFI-2-S/items.sql
-- run: db/seeds/instruments/BFI-2-S/scoring-rule.sql
-- run: db/seeds/instruments/BFI-2-S/baremo.sql

-- TwIVI (valores / circumplex / mrat) — instrument row folded into
-- instrument-version.sql; no baremo (MRAT is within-person, no HOV baremo).
-- run: db/seeds/instruments/TwIVI/instrument-version.sql
-- run: db/seeds/instruments/TwIVI/items.sql
-- run: db/seeds/instruments/TwIVI/scoring-rule.sql

-- PERMA-Profiler (bienestar / bars / none) — instrument row folded into
-- instrument-version.sql.
-- run: db/seeds/instruments/PERMA-Profiler/instrument-version.sql
-- run: db/seeds/instruments/PERMA-Profiler/items.sql
-- run: db/seeds/instruments/PERMA-Profiler/scoring-rule.sql
-- run: db/seeds/instruments/PERMA-Profiler/baremo.sql

-- ===========================================================================
-- 2. narrative_template seeds (need migration 015 dimension/band columns)
-- ===========================================================================
-- run: db/seeds/narrative-templates/RIASEC/seed.sql
-- run: db/seeds/narrative-templates/BFI-2-S/seed.sql
-- run: db/seeds/narrative-templates/TwIVI/seed.sql
-- run: db/seeds/narrative-templates/PERMA-Profiler/seed.sql

-- ===========================================================================
-- 3. integrator_rule teaser seed (declarative teaser rules, D-B.1)
-- ===========================================================================
-- run: db/seeds/integrator-rule/teaser/seed.sql

-- ===========================================================================
-- 4. product + product_stack (guided 4-test order; needs instrument_versions)
-- ===========================================================================
-- run: db/seeds/product-stack/free/seed.sql

-- ===========================================================================
-- 5. contention_resources (Phase 1 — NFR-28 help-line catalog, CO)
-- ===========================================================================
-- run: db/seeds/contention-resources/CO/seed.sql

-- ===========================================================================
-- 6. occupations (Phase 1 — O*NET occupation catalog for the RIASEC report)
-- ===========================================================================
-- run: db/seeds/occupations/LATAM/seed.sql
