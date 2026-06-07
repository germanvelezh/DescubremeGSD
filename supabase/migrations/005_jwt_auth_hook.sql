-- 005_jwt_auth_hook.sql — Supabase custom_access_token_hook (COMPL-17 seam).
--
-- Hard Gate 1 RESOLVED HIGH per RESEARCH §Gate 1 (Supabase docs verified
-- 2026-06-05). Signature, return shape, and GRANT/REVOKE pattern copied
-- verbatim from that section.
--
-- Anchors:
--   - 01-RESEARCH.md §Gate 1 (verbatim signature + Phase 4 extension).
--   - 01-PATTERNS.md §1.6 (Auth Hook pattern).
--   - 01-CONTEXT.md D1.4 (multi-tenant via JWT app_metadata.org_ids).
--   - SKELETON.md "Tenant-aware seam from day one".
--
-- Threat register:
--   T-01-05-02 Elevation of Privilege — hook with SECURITY DEFINER must
--   only be executable by supabase_auth_admin. GRANT/REVOKE block below
--   enforces this; the REVOKE on authenticated/anon/public is the
--   defense-in-depth even though SECURITY DEFINER would not honor caller
--   role permissions by itself.
--
-- Registration: `supabase/config.toml` registers the hook via
--   [auth.hook.custom_access_token] enabled = true
--   uri = "pg-functions://postgres/public/custom_access_token_hook"
--
-- Phase 1 implementation: B2C-only, org_ids = '{}' always. The Phase 4
-- extension (populating from public.membership) is documented at the
-- bottom of this file as a commented-out patch — DO NOT execute now.

create or replace function public.custom_access_token_hook(event jsonb)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  claims jsonb;
  org_ids uuid[];
begin
  claims := event->'claims';

  -- Phase 1: B2C-only. org_ids siempre vacio.
  -- Phase 4 extension: poblar desde public.membership.
  org_ids := '{}';

  -- Inicializar app_metadata si no existe
  if jsonb_typeof(claims->'app_metadata') is null then
    claims := jsonb_set(claims, '{app_metadata}', '{}'::jsonb);
  end if;

  -- Inyectar org_ids
  claims := jsonb_set(claims, '{app_metadata, org_ids}',
    to_jsonb(org_ids));

  return jsonb_build_object('claims', claims);
end;
$$;

-- GRANT/REVOKE per RESEARCH §Gate 1 (Supabase docs verbatim).
-- Only supabase_auth_admin can execute; authenticated/anon/public are
-- locked out so a misconfigured RLS bypass cannot trigger the hook.
grant execute on function public.custom_access_token_hook to supabase_auth_admin;
revoke execute on function public.custom_access_token_hook from authenticated, anon, public;

-- ---------------------------------------------------------------------------
-- Phase 4 extension (OUT OF SCOPE for Phase 1 — documented to avoid debt).
-- ---------------------------------------------------------------------------
-- When B2B-A lands, replace `org_ids := '{}';` above with a select from
-- public.membership. The supabase_auth_admin role needs read access on the
-- membership table for the hook to execute the lookup, per RESEARCH §Gate 1
-- lines 228-231.
--
-- Phase 4 patch (do NOT run now):
--
--   select array_agg(organization_id) into org_ids
--   from public.membership
--   where user_id = (event->>'user_id')::uuid;
--   org_ids := coalesce(org_ids, '{}');
--
--   -- And grant table access:
--   grant all on table public.membership to supabase_auth_admin;
--   revoke all on table public.membership from authenticated, anon, public;
--
-- ---------------------------------------------------------------------------
