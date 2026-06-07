-- 010_delete_user_account.sql — SECURITY DEFINER atomic cross-schema deletion.
--
-- ## Purpose
--
-- DELETE /api/me/data (COMPL-07) requires deleting a user's identity rows
-- from BOTH `public.user` (RLS-managed app schema) AND `auth.users`
-- (Supabase Auth schema). Plan 01-10 Task 1 implemented this as a
-- non-atomic two-phase flow: (1) anonymize via SECURITY DEFINER + DELETE
-- public.user inside a Postgres transaction, then (2) OUTSIDE that
-- transaction `supabase.auth.admin.deleteUser(...)` against the auth
-- schema. If (2) fails after (1) commits, an orphan row remains in
-- `auth.users` with no `public.user` counterpart — documented in
-- [GAP-DELETE-ATOMIC-TX] and ADR-009 §9.3.
--
-- This migration emits the atomic fix:
--   `public.delete_user_account(target_user_id uuid)`
-- as a SECURITY DEFINER function that executes anonymize + DELETE
-- public.user + DELETE auth.users in a SINGLE Postgres transaction.
-- The route handler switches from a Drizzle transaction wrapper to a
-- single `.rpc('delete_user_account', ...)` call.
--
-- ## Security posture
--
-- - `SECURITY DEFINER`: runs with the privileges of the function owner
--   (postgres / supabase_admin), so the function CAN reach `auth.users`
--   (normally not exposed to service_role direct DELETE) AND invoke
--   `public.anonymize_user_audit(uuid)` which itself disables the
--   immutable trigger from migration 004.
-- - `SET search_path = ''`: every reference inside the body is fully
--   qualified (`public.anonymize_user_audit`, `public.user`, `auth.users`).
--   This is stricter than mig 009 (`public, pg_temp`) and forecloses
--   search_path injection attacks against SECURITY DEFINER functions
--   (CVE-2018-1058 pattern).
-- - Caller verification: the function refuses to run unless the calling
--   role is `service_role` OR the caller's JWT `sub` equals
--   `target_user_id`. Double-defense over the GRANT below.
-- - `GRANT EXECUTE ... TO service_role`: only the service-role client
--   (used exclusively in the server-only DELETE /me/data handler) can
--   call this function. `REVOKE EXECUTE FROM public, anon, authenticated`
--   is explicit for forward compatibility + auditing.
-- - Defense-in-depth: tests/lint/audit-modification-callers.test.ts
--   (Plan 01-12) ensures only `app/api/me/data/route.ts` references
--   this function name across the codebase.
--
-- ## ADR-009 §9.3
--
-- Closes [GAP-DELETE-ATOMIC-TX] (P1 in BACKLOG since 2026-06-07).
--
-- Anchors:
--   - estado/DECISIONS_LOG.md ADR-009 §9.3.
--   - 01-PLAN-01-12.md threat_model T-01-12-01, T-01-12-02.
--   - supabase/migrations/009_anonymize_user_audit.sql (the helper this
--     function invokes).
--   - 01-CONTEXT.md D1.5 (BORRAR vs ANONIMIZAR policy).

create or replace function public.delete_user_account(target_user_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  -- Caller verification: service_role OR caller JWT sub = target.
  -- current_setting returns 'role' as a string; jwt.claims is jsonb when
  -- the request originated from a PostgREST/Supabase Auth context.
  if current_setting('role') <> 'service_role'
     and coalesce(
           current_setting('request.jwt.claims', true)::jsonb->>'sub',
           ''
         ) <> target_user_id::text
  then
    raise exception 'unauthorized: caller must be service_role or target user';
  end if;

  -- 1. Anonimize audit trail BEFORE deletion (preserves audit_log row
  --    of the deletion event via the helper's tail-append).
  perform public.anonymize_user_audit(target_user_id);

  -- 2. DELETE public.user -> CASCADE FK borra D1.5 BORRAR tables
  --    (item_response, computed_score, assessment_session, consent,
  --     report_snapshot, feedback_event).
  delete from public.user where id = target_user_id;

  -- 3. DELETE auth.users (atomicidad cross-schema dentro de la
  --    transaction Postgres del statement). Si esto falla, los pasos
  --    1 y 2 rollback con el mismo statement — no orphan posible.
  delete from auth.users where id = target_user_id;
end;
$$;

-- Default GRANT in PostgreSQL >=14 does NOT include PUBLIC for SECURITY
-- DEFINER functions, but be explicit for forward compatibility + auditing.
revoke execute on function public.delete_user_account(uuid) from public;
revoke execute on function public.delete_user_account(uuid) from anon;
revoke execute on function public.delete_user_account(uuid) from authenticated;

-- service_role is the ONLY caller. The DELETE /api/me/data handler
-- invokes this via the service-role Supabase client.
grant execute on function public.delete_user_account(uuid) to service_role;

comment on function public.delete_user_account(uuid) is
  'SECURITY DEFINER atomic deletion. Caller MUST be service_role or '
  'target user (JWT sub match). Invocable solo desde '
  'app/api/me/data/route.ts (audit-modification-callers lint gate). '
  'Cierra [GAP-DELETE-ATOMIC-TX] Plan 01-10. ADR-009 §9.3.';
