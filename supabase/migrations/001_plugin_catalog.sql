-- 001_plugin_catalog.sql — Plugin catalog (FOUND-02).
-- Creates the 5 catalog tables (instrument, instrument_version, item,
-- scoring_rule, baremo) + ENABLE RLS + public-read policies.
-- INSERT/UPDATE/DELETE intentionally restricted to service_role (default DENY
-- after ENABLE RLS), used only by seed scripts.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- instrument
-- ---------------------------------------------------------------------------
create table public.instrument (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  construct text,
  sensitivity text not null default 'normal'
    check (sensitivity in ('low', 'normal', 'high')),
  ethical_flags jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.instrument enable row level security;

create policy "instrument_public_select"
  on public.instrument for select
  to anon, authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- instrument_version
-- ---------------------------------------------------------------------------
create table public.instrument_version (
  id uuid primary key default gen_random_uuid(),
  instrument_id uuid not null references public.instrument(id),
  version text not null,
  lang text not null default 'es-CO',
  item_count integer,
  likert_min integer,
  likert_max integer,
  psychometric_status jsonb,
  plan_b_ref text,
  created_at timestamptz not null default now()
);

alter table public.instrument_version enable row level security;

create policy "instrument_version_public_select"
  on public.instrument_version for select
  to anon, authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- item
-- ---------------------------------------------------------------------------
create table public.item (
  id uuid primary key default gen_random_uuid(),
  instrument_version_id uuid not null references public.instrument_version(id),
  sequence_number integer not null,
  stem text not null,
  dimension text,
  reverse_key boolean not null default false,
  constraint item_version_sequence_unique unique (instrument_version_id, sequence_number)
);

alter table public.item enable row level security;

create policy "item_public_select"
  on public.item for select
  to anon, authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- scoring_rule
-- ---------------------------------------------------------------------------
create table public.scoring_rule (
  id uuid primary key default gen_random_uuid(),
  instrument_version_id uuid not null references public.instrument_version(id),
  dimension text not null,
  formula jsonb not null,
  scoring_version text not null default '1.0'
);

alter table public.scoring_rule enable row level security;

create policy "scoring_rule_public_select"
  on public.scoring_rule for select
  to anon, authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- baremo
-- ---------------------------------------------------------------------------
create table public.baremo (
  id uuid primary key default gen_random_uuid(),
  instrument_version_id uuid not null references public.instrument_version(id),
  population text not null check (population in ('CO', 'MX', 'INTL')),
  type text not null check (type in ('percentil', 'ECDF', 'ipsativa')),
  reference_data jsonb
);

alter table public.baremo enable row level security;

create policy "baremo_public_select"
  on public.baremo for select
  to anon, authenticated
  using (true);

-- RLS enabled; default DENY for write paths. Seeds use service_role only.
