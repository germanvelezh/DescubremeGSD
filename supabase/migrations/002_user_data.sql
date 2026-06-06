-- 002_user_data.sql — User entities + auxiliary tables (14 tables).
-- All tables get ENABLE ROW LEVEL SECURITY here; own-data policies are added
-- in 003_rls_policies.sql per PATTERNS.md §1.5 (separation of concerns:
-- structure first, access policy second).
--
-- organization_id columns are nullable in Phase 1 (B2C). The FK constraint to
-- public.organization is added in 006_aggregate_view_placeholder.sql because
-- the organization table is created there (locked migration numbering).
--
-- pg_cron job at end implements D2.2 — nightly cleanup of expired anonymous
-- sessions (user_id IS NULL AND expires_at < now()).

-- ---------------------------------------------------------------------------
-- user
-- ---------------------------------------------------------------------------
create table public.user (
  -- matches auth.users.id (Supabase Auth)
  id uuid primary key,
  email text not null unique,
  email_lookup_hash text,
  -- envelope encryption per D4.2: payload + DEK ciphertext as bytea
  name_ciphertext bytea,
  name_dek_ciphertext bytea,
  date_of_birth_ciphertext bytea,
  date_of_birth_dek_ciphertext bytea,
  country_code text not null default 'CO',
  lang text not null default 'es-CO',
  deleted boolean not null default false,
  organization_id uuid,
  created_at timestamptz not null default now()
);

alter table public.user enable row level security;

-- ---------------------------------------------------------------------------
-- assessment_session
-- ---------------------------------------------------------------------------
create table public.assessment_session (
  id uuid primary key default gen_random_uuid(),
  -- D1.5 cascade — session belongs to user when claimed
  user_id uuid references public.user(id) on delete cascade,
  anonymous_session_id text unique,
  instrument_version_id uuid not null references public.instrument_version(id),
  status text not null default 'open'
    check (status in ('open', 'completed', 'expired')),
  progress integer not null default 0,
  started_at timestamptz not null default now(),
  expires_at timestamptz,
  completed_at timestamptz,
  organization_id uuid
);

create index assessment_session_user_instrument_idx
  on public.assessment_session (user_id, instrument_version_id);
create index assessment_session_anonymous_idx
  on public.assessment_session (anonymous_session_id);
create index assessment_session_expires_anonymous_idx
  on public.assessment_session (expires_at) where user_id is null;

alter table public.assessment_session enable row level security;

-- ---------------------------------------------------------------------------
-- item_response
-- ---------------------------------------------------------------------------
create table public.item_response (
  id uuid primary key default gen_random_uuid(),
  -- null pre-claim (FOUND-08); cascade once user_id is set
  user_id uuid references public.user(id) on delete cascade,
  session_id uuid not null references public.assessment_session(id) on delete cascade,
  item_id uuid not null references public.item(id),
  raw_value integer not null,
  responded_at timestamptz not null default now(),
  organization_id uuid
);

-- Partial unique: one response per (user, item) once user_id is assigned
create unique index item_response_user_item_idx
  on public.item_response (user_id, item_id)
  where user_id is not null;

alter table public.item_response enable row level security;

-- ---------------------------------------------------------------------------
-- computed_score
-- ---------------------------------------------------------------------------
create table public.computed_score (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.user(id) on delete cascade,
  scoring_rule_id uuid not null references public.scoring_rule(id),
  baremo_id uuid references public.baremo(id),
  raw integer not null,
  normalized numeric,
  band text,
  scoring_version text not null,
  computed_at timestamptz not null default now(),
  organization_id uuid
);

create index computed_score_user_rule_idx
  on public.computed_score (user_id, scoring_rule_id);

alter table public.computed_score enable row level security;

-- ---------------------------------------------------------------------------
-- consent
-- ---------------------------------------------------------------------------
create table public.consent (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.user(id) on delete cascade,
  product_code text not null,
  consent_version text not null,
  text_sha256_hash text not null,
  consent_general boolean not null,
  consent_sensitive_data boolean not null,
  granted_at timestamptz not null default now(),
  revoked_at timestamptz,
  ip_truncated text,
  user_agent text,
  locale text not null default 'es-CO'
);

-- Partial unique: only one active (non-revoked) consent per (user, product)
create unique index consent_user_product_active_idx
  on public.consent (user_id, product_code)
  where revoked_at is null;

alter table public.consent enable row level security;

-- ---------------------------------------------------------------------------
-- report_snapshot
-- ---------------------------------------------------------------------------
create table public.report_snapshot (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.user(id) on delete cascade,
  session_id uuid not null references public.assessment_session(id),
  instrument_version_id uuid not null references public.instrument_version(id),
  narrative_version text not null,
  occupation_set_version text not null,
  html_payload jsonb not null,
  rendered_at timestamptz not null default now(),
  organization_id uuid
);

alter table public.report_snapshot enable row level security;

-- ---------------------------------------------------------------------------
-- feedback_event
-- ---------------------------------------------------------------------------
create table public.feedback_event (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.user(id) on delete cascade,
  report_snapshot_id uuid references public.report_snapshot(id),
  stars integer not null check (stars >= 1 and stars <= 5),
  text_free text,
  created_at timestamptz not null default now()
);

alter table public.feedback_event enable row level security;

-- ---------------------------------------------------------------------------
-- waitlist
-- ---------------------------------------------------------------------------
create table public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  joined_at timestamptz not null default now(),
  source text not null default 'free_complete',
  interest text not null default 'paid'
);

alter table public.waitlist enable row level security;

-- ---------------------------------------------------------------------------
-- distress_event
-- ---------------------------------------------------------------------------
create table public.distress_event (
  id uuid primary key default gen_random_uuid(),
  -- D1.5 anonymize — keep audit trail after user delete
  user_id uuid references public.user(id) on delete set null,
  instrument_version_id uuid not null references public.instrument_version(id),
  threshold_triggered text not null,
  action_taken text not null check (action_taken in ('disclaimer_shown', 'contention_route_shown', 'follow_up_dispatched')),
  created_at timestamptz not null default now()
);

alter table public.distress_event enable row level security;

-- ---------------------------------------------------------------------------
-- contention_resources (catalog, public read)
-- ---------------------------------------------------------------------------
create table public.contention_resources (
  id uuid primary key default gen_random_uuid(),
  country_code text not null,
  type text not null check (type in ('crisis_line', 'mental_health', 'gender_violence', 'emergency')),
  name text not null,
  phone text,
  url text,
  description_es_co text not null,
  hours text,
  last_verified_at timestamptz not null
);

alter table public.contention_resources enable row level security;

-- ---------------------------------------------------------------------------
-- narrative_template (catalog)
-- ---------------------------------------------------------------------------
create table public.narrative_template (
  id uuid primary key default gen_random_uuid(),
  version text not null default '1.0',
  riasec_code text not null,
  lang text not null default 'es-CO',
  slot text not null check (slot in ('top_3_phrase', 'dimensional_high', 'dimensional_low')),
  template_text text not null
);

alter table public.narrative_template enable row level security;

-- ---------------------------------------------------------------------------
-- occupation (catalog)
-- ---------------------------------------------------------------------------
create table public.occupation (
  id uuid primary key default gen_random_uuid(),
  code_onet text not null unique,
  name_es_co text not null,
  riasec_code text not null,
  education_level text
);

alter table public.occupation enable row level security;

-- ---------------------------------------------------------------------------
-- product
-- ---------------------------------------------------------------------------
create table public.product (
  code text primary key,
  description text
);

alter table public.product enable row level security;

-- ---------------------------------------------------------------------------
-- product_stack
-- ---------------------------------------------------------------------------
create table public.product_stack (
  id uuid primary key default gen_random_uuid(),
  product_code text not null references public.product(code),
  instrument_version_id uuid not null references public.instrument_version(id),
  "order" integer not null default 0,
  layer text
);

alter table public.product_stack enable row level security;

-- ---------------------------------------------------------------------------
-- pg_cron — D2.2 nightly cleanup of expired anonymous sessions
-- ---------------------------------------------------------------------------
create extension if not exists pg_cron;

select cron.schedule(
  'cleanup-expired-anonymous-sessions',
  '0 3 * * *',
  $$ delete from public.assessment_session where user_id is null and expires_at < now(); $$
);
