-- 013_fix_audit_chain_hash_search_path.sql — fix audit chain trigger under
-- restricted search_path ([GAP-DELETE-AUDIT-DIGEST-SEARCHPATH]).
--
-- ## Bug
--
-- `public.audit_log_chain_hash()` (migration 004) calls `digest(...)` from
-- pgcrypto WITHOUT a schema qualifier and WITHOUT its own `SET search_path`.
-- In Supabase, pgcrypto lives in the `extensions` schema (NOT `public`).
-- Ordinary audit INSERTs work because the request's default search_path
-- includes `extensions`. But when the trigger fires from inside a function
-- that pins a restricted search_path that OMITS `extensions` — namely
-- `public.anonymize_user_audit()` (migration 009, `SET search_path =
-- public, pg_temp`) appending its `user_data_delete_completed` row — the
-- trigger raises:
--
--   ERROR: function digest(text, unknown) does not exist
--
-- That exception aborts the whole `delete_user_account()` RPC, so account
-- deletion (COMPL-07, Ley 1581 derecho de supresion) silently fails. Found
-- during /gsd-verify-work 1 Test 16 — the first real end-to-end deletion
-- (the prior DELETE integration tests were DB-gated stubs that never ran
-- the RPC).
--
-- ## Fix
--
-- Recreate the trigger function with `SET search_path = ''` and a fully
-- schema-qualified `extensions.digest(...)`, matching the hardened pattern
-- of migration 010 (CVE-2018-1058 search_path injection defense). The hash
-- algorithm and output are UNCHANGED (same `digest(payload, 'sha256')`), so
-- the existing chain stays valid and `lib/audit/chain-hash.ts` still mirrors
-- it. `encode`/`coalesce` are pg_catalog/built-in and resolve under an empty
-- search_path; `public.audit_log` was already schema-qualified.
--
-- Anchors:
--   - supabase/migrations/004_audit_triggers.sql (original trigger).
--   - supabase/migrations/009_anonymize_user_audit.sql (the restricted-
--     search_path caller that exposed the bug).
--   - supabase/migrations/010_delete_user_account.sql (the `search_path = ''`
--     hardening pattern reused here).
--   - COMPL-07 / COMPL-09 (append-only audit + chain integrity preserved).

create or replace function public.audit_log_chain_hash() returns trigger
language plpgsql
set search_path = ''
as $$
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
  -- digest() lives in the `extensions` schema (Supabase pgcrypto); qualify it
  -- so the trigger resolves it regardless of the caller's search_path.
  v_payload := encode(v_prev_hash, 'hex')
    || coalesce(new.actor_id::text, '')
    || new.action
    || new.entity_type
    || new.entity_id
    || new.occurred_at::text;
  new.this_hash := extensions.digest(v_payload, 'sha256');

  return new;
end;
$$;
