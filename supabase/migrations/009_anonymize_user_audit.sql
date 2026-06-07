-- 009_anonymize_user_audit.sql — SECURITY DEFINER anonymizacion D1.5.
--
-- ## Purpose
--
-- DELETE /api/me/data (COMPL-07) must anonymize `audit_log`, `usage_log`,
-- and `distress_event` rows for the deleted user (D1.5 ANONIMIZAR policy).
-- However, migration 004 REVOKEs UPDATE/DELETE on `audit_log` AND installs
-- `audit_log_no_modify` BEFORE UPDATE OR DELETE trigger that raises an
-- exception on any mutation. This is correct for COMPL-09 (append-only),
-- but it structurally blocks the legitimate D1.5 anonymizacion path.
--
-- This migration defines an authorized escape hatch:
--   `public.anonymize_user_audit(target_user_id uuid)`
-- as a SECURITY DEFINER function owned by the migration role. The function:
--   1. DISABLES the `audit_log_no_modify` trigger.
--   2. UPDATEs audit_log SET actor_id = NULL WHERE actor_id = target_user_id.
--   3. UPDATEs usage_log SET user_id = NULL WHERE user_id = target_user_id.
--   4. UPDATEs distress_event SET user_id = NULL WHERE user_id = target_user_id.
--   5. RE-ENABLES the trigger.
--   6. Inserts an audit_log row `user_data_delete_completed` so the chain
--      continues with proper SHA-256 linkage to the prior tail.
--
-- ## Security posture
--
-- - `SECURITY DEFINER`: runs with the privileges of the function owner
--   (postgres / supabase_admin), so the function CAN disable the trigger
--   and run the UPDATEs.
-- - `SET search_path = public, pg_temp`: defense against search_path
--   injection attacks against SECURITY DEFINER functions (CVE-2018-1058
--   pattern). pg_temp is appended last so user objects cannot shadow public.
-- - `GRANT EXECUTE ... TO service_role`: only the service-role client
--   (used exclusively in the server-only DELETE /me/data handler) can
--   call this function. `REVOKE EXECUTE FROM public, anon, authenticated`
--   is implicit because `CREATE FUNCTION` does not GRANT to PUBLIC by
--   default in PostgreSQL >=14.
-- - Even with service_role at the client, COMPL-17 enforcement at the
--   route handler layer means `target_user_id` is derived from the
--   verified JWT, NEVER from the request body.
-- - The function is a single-purpose escape hatch; do NOT add other
--   audit_log mutations here.
--
-- ## ADR-009 (pending)
--
-- An ADR-009 (Deletion UX + audit anonymizacion) is to be emitted in
-- Plan 01-12 Task 1 (per STATE.md "Active TODOs"). That ADR will
-- formalize this pattern + verify no other code path can UPDATE
-- audit_log (CI grep gate). Until then, this migration is the
-- authoritative documentation of the anti-pattern.
--
-- Anchors:
--   - 01-PLAN-01-10.md threat_model T-01-10-03 (verbatim solucion lockeada).
--   - 01-CONTEXT.md D1.5 (BORRAR vs ANONIMIZAR policy).
--   - 01-RESEARCH.md §"Derechos del titular" lines 1250-1274.
--   - supabase/migrations/004_audit_triggers.sql (the immutable trigger
--     and REVOKEs this function intentionally bypasses).

create or replace function public.anonymize_user_audit(target_user_id uuid)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_audit_rows int;
  v_usage_rows int;
  v_distress_rows int;
begin
  -- Belt: disable the immutable trigger for the duration of this routine.
  -- Suspenders: re-enable in every exit path via a sub-block + raise.
  alter table public.audit_log disable trigger audit_log_no_modify;

  begin
    update public.audit_log
       set actor_id = null
     where actor_id = target_user_id;
    get diagnostics v_audit_rows = row_count;

    update public.usage_log
       set user_id = null
     where user_id = target_user_id;
    get diagnostics v_usage_rows = row_count;

    update public.distress_event
       set user_id = null
     where user_id = target_user_id;
    get diagnostics v_distress_rows = row_count;
  exception when others then
    -- Re-enable the trigger even on error, then re-raise so the calling
    -- transaction rolls back the partial UPDATEs.
    alter table public.audit_log enable trigger audit_log_no_modify;
    raise;
  end;

  alter table public.audit_log enable trigger audit_log_no_modify;

  -- Append a chain-continuing audit row recording that anonymization ran.
  -- INSERT path goes through `audit_log_chain_hash` trigger normally — only
  -- UPDATE/DELETE were disabled.
  insert into public.audit_log (
    actor_id,
    actor_role,
    action,
    entity_type,
    entity_id,
    meta
  ) values (
    null,                                  -- actor anonymized post-deletion
    'system',
    'user_data_delete_completed',
    'user',
    target_user_id::text,
    jsonb_build_object(
      'anonymized_audit_rows', v_audit_rows,
      'anonymized_usage_rows', v_usage_rows,
      'anonymized_distress_rows', v_distress_rows
    )
  );
end;
$$;

-- Default GRANT in PostgreSQL >=14 does NOT include PUBLIC for SECURITY
-- DEFINER functions, but be explicit for forward compatibility + auditing.
revoke execute on function public.anonymize_user_audit(uuid) from public;
revoke execute on function public.anonymize_user_audit(uuid) from anon;
revoke execute on function public.anonymize_user_audit(uuid) from authenticated;

-- service_role is the ONLY caller. The DELETE /api/me/data handler invokes
-- this via the service-role Supabase client (lib/supabase/service-role.ts).
grant execute on function public.anonymize_user_audit(uuid) to service_role;

comment on function public.anonymize_user_audit(uuid) is
  'D1.5 ANONIMIZAR escape hatch for DELETE /api/me/data. SECURITY DEFINER. '
  'service_role only. See ADR-009 (pending Plan 01-12) + migration 009 docs.';
