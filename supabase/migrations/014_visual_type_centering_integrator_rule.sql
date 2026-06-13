-- 014_visual_type_centering_integrator_rule.sql — Plugin-as-data backbone for
-- the 3 new Free instruments (Plan 02-01, Wave 1).
--
-- Adds two metadata columns to instrument_version so adding an instrument is
-- DATA, not code (D-C.2 visual_type, D-E1.3 centering_strategy), and creates
-- the integrator_rule table that holds the teaser's declarative rules
-- (D-B.1, FREE-13). All downstream .ts branches on these DATA values, never on
-- instrument-code literals (FOUND-05).
--
-- Anchors:
--   - implementation_packs/PVQ-RR_..._Consolidado.md §3.0.3 (schema), §4 (MRAT).
--   - 02-CONTEXT.md D-B.1 (integrator_rule mechanism), D-C.2 (assembler +
--     visual_type enum), D-E1.3 (MRAT centering, NOT ipsative).
--   - 02-RESEARCH.md §"visual_type Generalization" + §"integrator_rule Teaser".
--   - Analogs: 001_plugin_catalog.sql (table + RLS), 008_baremo_fallback_event.sql.
--
-- Threat register:
--   - T-02-01-01 Elevation: integrator_rule has RLS enabled + no write policy,
--     so only service_role can seed it (ASVS V4).
--   - T-02-01-02 Tampering: CHECK constraints bound visual_type and
--     centering_strategy to their enum domains.
--   - T-02-01-SC: no new npm/pip/cargo installs in this migration.
--
-- Apply note: authoritative `supabase db reset` is deferred to Plan 02-13. The
-- O*NET back-fill below is idempotent for forward-apply on the existing prod DB
-- (which already carries the Phase-1 O*NET row).

-- ---------------------------------------------------------------------------
-- instrument_version: visual_type + centering_strategy (metadata, D-C.2/D-E1.3)
-- ---------------------------------------------------------------------------
alter table public.instrument_version
  add column visual_type text
    check (visual_type in ('hexagon', 'bars', 'circumplex'));

alter table public.instrument_version
  add column centering_strategy text not null default 'none'
    check (centering_strategy in ('none', 'ipsative_z', 'mrat'));

-- Preserve Phase-1 O*NET behavior: hexagon visual + ipsative z-score centering.
-- Idempotent via `where visual_type is null` so re-runs are no-ops.
update public.instrument_version
set visual_type = 'hexagon',
    centering_strategy = 'ipsative_z'
from public.instrument i
where instrument_version.instrument_id = i.id
  and i.code = 'ONET-IP-SF'
  and instrument_version.visual_type is null;

-- ---------------------------------------------------------------------------
-- integrator_rule — declarative teaser rules as data (D-B.1, FREE-13).
-- Phase 3 extends THIS SAME table with full rules + provenance + exploratory
-- flag; those columns are an anti-goal here (D-B.1) and are NOT added.
-- ---------------------------------------------------------------------------
create table public.integrator_rule (
  id uuid primary key default gen_random_uuid(),
  tier text not null check (tier in ('teaser', 'full')),
  conditions jsonb not null,
  template_id text,
  template_text text,
  requires_dimensions jsonb not null default '[]'::jsonb,
  lang text not null default 'es-CO',
  version text not null default '1.0',
  created_at timestamptz not null default now()
);

alter table public.integrator_rule enable row level security;

-- Read posture mirrors public.scoring_rule (catalog data, non-sensitive
-- templates): SELECT allowed, no INSERT/UPDATE/DELETE policy => default DENY on
-- writes => only service_role (seeds) can write. Scoped to `authenticated`
-- only — the teaser is read post-signup (D-A.1), so anon has no read need.
create policy "integrator_rule_authenticated_select"
  on public.integrator_rule for select
  to authenticated
  using ((select auth.uid()) is not null);

comment on table public.integrator_rule is
  'Declarative teaser/integrator rules as data (D-B.1). Service-role writes only.';
