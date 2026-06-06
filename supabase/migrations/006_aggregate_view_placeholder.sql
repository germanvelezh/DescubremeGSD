-- 006_aggregate_view_placeholder.sql — Phase 4 schema-forward placeholder.
-- Creates organization, membership, entitlement with ENABLE RLS + NO policies.
-- Default DENY guarantees zero access until Phase 4 activates them.
--
-- Also wires the organization_id foreign keys on Phase 1 tables (created in
-- 002_user_data.sql without the FK because public.organization didn't exist
-- yet). This keeps migration numbering locked while preserving referential
-- integrity once the org table lands.

-- ---------------------------------------------------------------------------
-- organization
-- ---------------------------------------------------------------------------
create table public.organization (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  plan_code text,
  created_at timestamptz not null default now()
);

alter table public.organization enable row level security;

-- ---------------------------------------------------------------------------
-- membership
-- ---------------------------------------------------------------------------
create table public.membership (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.user(id),
  organization_id uuid not null references public.organization(id),
  role text not null check (role in ('admin', 'viewer')),
  created_at timestamptz not null default now()
);

alter table public.membership enable row level security;

-- ---------------------------------------------------------------------------
-- entitlement (Phase 3 Stripe activates policies on webhook)
-- ---------------------------------------------------------------------------
create table public.entitlement (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.user(id),
  product_code text not null,
  status text not null check (status in ('active', 'revoked', 'expired')),
  granted_at timestamptz not null default now(),
  expires_at timestamptz
);

alter table public.entitlement enable row level security;

-- Phase 4 activates RLS policies for organization tenancy. Phase 3 activates
-- entitlement on Stripe webhook.

-- ---------------------------------------------------------------------------
-- Phase 4 reference policy example (RESEARCH lines 354-372 verbatim):
--
-- create policy "org_admin_reads_aggregate"
--   on public.aggregate_view for select
--   to authenticated
--   using (
--     (select auth.uid()) is not null
--     and organization_id::text in (
--       select jsonb_array_elements_text(
--         (select auth.jwt() -> 'app_metadata' -> 'org_ids')
--       )
--     )
--     and n >= 5
--   );
-- ---------------------------------------------------------------------------

-- ---------------------------------------------------------------------------
-- Wire organization_id FKs on Phase 1 tables (defined in 002).
-- These were created as bare uuid columns to preserve the locked migration
-- numbering (organization landed in 006). Adding them now preserves
-- referential integrity for the Phase 4 activation.
-- ---------------------------------------------------------------------------
alter table public.user
  add constraint user_organization_fk
  foreign key (organization_id) references public.organization(id);

alter table public.assessment_session
  add constraint assessment_session_organization_fk
  foreign key (organization_id) references public.organization(id);

alter table public.item_response
  add constraint item_response_organization_fk
  foreign key (organization_id) references public.organization(id);

alter table public.computed_score
  add constraint computed_score_organization_fk
  foreign key (organization_id) references public.organization(id);

alter table public.report_snapshot
  add constraint report_snapshot_organization_fk
  foreign key (organization_id) references public.organization(id);
