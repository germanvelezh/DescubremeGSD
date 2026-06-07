-- 004_audit_triggers.sql — audit_log (COMPL-09) + usage_log placeholder.
--
-- Anchors:
--   - 01-RESEARCH.md §"Audit log domain" (verbatim DDL).
--   - 01-PATTERNS.md §1.7 (chain hash + append-only triggers).
--   - 01-CONTEXT.md D1.5 (audit_log ANONIMIZAR on user delete — not cascade).
--   - COMPL-09 (append-only audit + chain integrity).
--
-- Threat register (PLAN.md §threat_model):
--   - T-01-05-01 Tampering: BEFORE UPDATE/DELETE trigger + REVOKE on
--     update/delete/truncate for ALL roles (service_role included).
--   - T-01-05-SC Tampering supply chain: no new npm installs.
--
-- pgcrypto already installed in 001_plugin_catalog.sql. The
-- `create extension if not exists pgcrypto;` here is idempotent and
-- documents the dependency at the point of use (digest function).

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- audit_log — append-only ledger with SHA-256 chain
-- ---------------------------------------------------------------------------
create table public.audit_log (
  id bigint generated always as identity primary key,
  occurred_at timestamptz not null default now(),
  actor_id uuid,
  actor_role text not null,            -- 'authenticated' | 'service_role' | 'system'
  action text not null,                -- 'consent_granted' | 'pdf_export' | ...
  entity_type text not null,
  entity_id text not null,
  meta jsonb,                          -- ip_truncated, user_agent, request_id; NO PII
  prev_hash bytea,
  this_hash bytea
);

alter table public.audit_log enable row level security;

-- Only owner reads own accesses (Ley 1581 derecho de consulta).
-- The (select auth.uid()) wrap enables initPlan caching per RESEARCH §Gate 2.
create policy "user_reads_own_audit"
  on public.audit_log for select
  to authenticated
  using (
    (select auth.uid()) is not null
    and actor_id = (select auth.uid())
  );

-- Lock down: append-only at the privilege level. service_role included by
-- design — even server-side code MUST go through public.audit_log INSERT
-- via the trigger; no role can mutate or truncate existing rows.
revoke update, delete, truncate on public.audit_log from public, anon, authenticated, service_role;

-- BEFORE UPDATE/DELETE trigger raises an exception. Belt and suspenders
-- with the REVOKE above — protects against future GRANT mistakes.
create or replace function public.audit_log_immutable() returns trigger
language plpgsql as $$
begin
  raise exception 'audit_log is append-only';
end;
$$;

create trigger audit_log_no_modify
  before update or delete on public.audit_log
  for each row execute function public.audit_log_immutable();

-- Chain hash BEFORE INSERT trigger. Mirror algorithm in lib/audit/chain-hash.ts
-- (TS) so unit tests + Phase 7 LEGAL-09 verifier job can recompute.
--
-- Payload composition (verbatim RESEARCH §6, lines 1107-1113):
--   sha256(
--     encode(prev_hash, 'hex')
--     || coalesce(actor_id::text, '')
--     || action
--     || entity_type
--     || entity_id
--     || occurred_at::text
--   )
--
-- prev_hash defaults to 32 zero bytes (`\x00...00`) for the first row.
create or replace function public.audit_log_chain_hash() returns trigger
language plpgsql as $$
declare
  v_prev_hash bytea;
  v_payload text;
begin
  -- Get previous row hash (or zero hash for first row).
  select this_hash into v_prev_hash
  from public.audit_log
  order by id desc limit 1;
  v_prev_hash := coalesce(v_prev_hash, '\x0000000000000000000000000000000000000000000000000000000000000000');
  new.prev_hash := v_prev_hash;

  -- Hash chain: sha256(prev_hash || actor_id || action || entity_type || entity_id || occurred_at)
  v_payload := encode(v_prev_hash, 'hex')
    || coalesce(new.actor_id::text, '')
    || new.action
    || new.entity_type
    || new.entity_id
    || new.occurred_at::text;
  new.this_hash := digest(v_payload, 'sha256');

  return new;
end;
$$;

create trigger audit_log_chain_hash_trigger
  before insert on public.audit_log
  for each row execute function public.audit_log_chain_hash();

-- ---------------------------------------------------------------------------
-- usage_log — placeholder for Phase 6 analytics (D1.5 anonymize on delete).
-- No policies in Phase 1: schema-forward only, no write path enabled.
-- ---------------------------------------------------------------------------
create table public.usage_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.user(id) on delete set null,
  event_type text not null,
  meta jsonb,
  created_at timestamptz not null default now()
);

alter table public.usage_log enable row level security;
