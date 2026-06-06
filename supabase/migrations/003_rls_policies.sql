-- 003_rls_policies.sql — Own-data RLS policies (RESEARCH §Gate 2).
-- All policies follow the locked convention (PATTERNS.md §1.5):
--   (select auth.uid()) is not null AND user_id = (select auth.uid())
-- The (select auth.uid()) wrapping enables Postgres initPlan caching
-- (99.94% perf improvement per Supabase benchmark) and the IS NOT NULL
-- guard mitigates PITFALL 2.1 (anon role smuggled past).
--
-- Catalog tables (instrument*, item, scoring_rule, baremo,
-- contention_resources, narrative_template, occupation, product*) get
-- public-read policies in migrations 001/002 and below; service_role
-- bypasses RLS for writes.
--
-- The item_response INSERT policy is the COMPL-03 defense-in-depth: it
-- requires an active consent for the product associated with the session,
-- and consent_sensitive_data when the underlying instrument is high
-- sensitivity. This is the structural complement to lib/consent/guard.ts.

-- ---------------------------------------------------------------------------
-- user
-- ---------------------------------------------------------------------------
create policy "own_user_select"
  on public.user for select
  to authenticated
  using (
    (select auth.uid()) is not null
    and id = (select auth.uid())
  );

create policy "own_user_update"
  on public.user for update
  to authenticated
  using (
    (select auth.uid()) is not null
    and id = (select auth.uid())
  )
  with check (
    (select auth.uid()) is not null
    and id = (select auth.uid())
  );

create policy "own_user_delete"
  on public.user for delete
  to authenticated
  using (
    (select auth.uid()) is not null
    and id = (select auth.uid())
  );

-- ---------------------------------------------------------------------------
-- assessment_session — authenticated own-data only. Anonymous sessions
-- (user_id IS NULL) are managed via service_role guard in lib/session/anonymous.ts
-- per PATTERNS §3.8. RLS here covers the authenticated paths only.
-- ---------------------------------------------------------------------------
create policy "own_assessment_session_select"
  on public.assessment_session for select
  to authenticated
  using (
    (select auth.uid()) is not null
    and user_id = (select auth.uid())
  );

create policy "own_assessment_session_insert"
  on public.assessment_session for insert
  to authenticated
  with check (
    (select auth.uid()) is not null
    and user_id = (select auth.uid())
  );

create policy "own_assessment_session_update"
  on public.assessment_session for update
  to authenticated
  using (
    (select auth.uid()) is not null
    and user_id = (select auth.uid())
  )
  with check (
    (select auth.uid()) is not null
    and user_id = (select auth.uid())
  );

create policy "own_assessment_session_delete"
  on public.assessment_session for delete
  to authenticated
  using (
    (select auth.uid()) is not null
    and user_id = (select auth.uid())
  );

-- ---------------------------------------------------------------------------
-- item_response — own-data + COMPL-03 consent gate (RESEARCH lines 305-340).
-- The INSERT policy requires:
--   1. authenticated user_id matches the inserted user_id;
--   2. an active consent row (consent_general = true, revoked_at IS NULL);
--   3. consent_sensitive_data = true if the instrument is high sensitivity.
-- ---------------------------------------------------------------------------
create policy "own_item_response_select"
  on public.item_response for select
  to authenticated
  using (
    (select auth.uid()) is not null
    and user_id = (select auth.uid())
  );

create policy "own_item_response_insert"
  on public.item_response for insert
  to authenticated
  with check (
    (select auth.uid()) is not null
    and user_id = (select auth.uid())
    and exists (
      select 1
      from public.consent c
      join public.assessment_session s on s.id = item_response.session_id
      join public.instrument_version iv on iv.id = s.instrument_version_id
      join public.instrument i on i.id = iv.instrument_id
      where c.user_id = (select auth.uid())
        and c.product_code = 'B2C_FREE'
        and c.consent_general = true
        and c.revoked_at is null
        and (i.sensitivity <> 'high' or c.consent_sensitive_data = true)
    )
  );

create policy "own_item_response_delete"
  on public.item_response for delete
  to authenticated
  using (
    (select auth.uid()) is not null
    and user_id = (select auth.uid())
  );

-- ---------------------------------------------------------------------------
-- computed_score
-- ---------------------------------------------------------------------------
create policy "own_computed_score_select"
  on public.computed_score for select
  to authenticated
  using (
    (select auth.uid()) is not null
    and user_id = (select auth.uid())
  );

create policy "own_computed_score_insert"
  on public.computed_score for insert
  to authenticated
  with check (
    (select auth.uid()) is not null
    and user_id = (select auth.uid())
  );

create policy "own_computed_score_delete"
  on public.computed_score for delete
  to authenticated
  using (
    (select auth.uid()) is not null
    and user_id = (select auth.uid())
  );

-- ---------------------------------------------------------------------------
-- consent
-- ---------------------------------------------------------------------------
create policy "own_consent_select"
  on public.consent for select
  to authenticated
  using (
    (select auth.uid()) is not null
    and user_id = (select auth.uid())
  );

create policy "own_consent_insert"
  on public.consent for insert
  to authenticated
  with check (
    (select auth.uid()) is not null
    and user_id = (select auth.uid())
  );

create policy "own_consent_update"
  on public.consent for update
  to authenticated
  using (
    (select auth.uid()) is not null
    and user_id = (select auth.uid())
  )
  with check (
    (select auth.uid()) is not null
    and user_id = (select auth.uid())
  );

-- ---------------------------------------------------------------------------
-- report_snapshot
-- ---------------------------------------------------------------------------
create policy "own_report_snapshot_select"
  on public.report_snapshot for select
  to authenticated
  using (
    (select auth.uid()) is not null
    and user_id = (select auth.uid())
  );

create policy "own_report_snapshot_insert"
  on public.report_snapshot for insert
  to authenticated
  with check (
    (select auth.uid()) is not null
    and user_id = (select auth.uid())
  );

create policy "own_report_snapshot_delete"
  on public.report_snapshot for delete
  to authenticated
  using (
    (select auth.uid()) is not null
    and user_id = (select auth.uid())
  );

-- ---------------------------------------------------------------------------
-- feedback_event
-- ---------------------------------------------------------------------------
create policy "own_feedback_event_select"
  on public.feedback_event for select
  to authenticated
  using (
    (select auth.uid()) is not null
    and user_id = (select auth.uid())
  );

create policy "own_feedback_event_insert"
  on public.feedback_event for insert
  to authenticated
  with check (
    (select auth.uid()) is not null
    and user_id = (select auth.uid())
  );

create policy "own_feedback_event_delete"
  on public.feedback_event for delete
  to authenticated
  using (
    (select auth.uid()) is not null
    and user_id = (select auth.uid())
  );

-- ---------------------------------------------------------------------------
-- waitlist — own-data (anonymous insert path handled by service_role guard).
-- ---------------------------------------------------------------------------
create policy "own_waitlist_select"
  on public.waitlist for select
  to authenticated
  using (
    (select auth.uid()) is not null
  );

-- ---------------------------------------------------------------------------
-- distress_event — own-data SELECT only. INSERT path is service_role
-- (server-side ethics middleware in lib/ethics/middleware.ts, Plan 01-08).
-- ---------------------------------------------------------------------------
create policy "own_distress_event_select"
  on public.distress_event for select
  to authenticated
  using (
    (select auth.uid()) is not null
    and user_id = (select auth.uid())
  );

-- ---------------------------------------------------------------------------
-- contention_resources — public read-only catalog.
-- ---------------------------------------------------------------------------
create policy "contention_resources_public_select"
  on public.contention_resources for select
  to anon, authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- narrative_template — public read-only catalog.
-- ---------------------------------------------------------------------------
create policy "narrative_template_public_select"
  on public.narrative_template for select
  to anon, authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- occupation — public read-only catalog.
-- ---------------------------------------------------------------------------
create policy "occupation_public_select"
  on public.occupation for select
  to anon, authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- product, product_stack — public read-only catalog.
-- ---------------------------------------------------------------------------
create policy "product_public_select"
  on public.product for select
  to anon, authenticated
  using (true);

create policy "product_stack_public_select"
  on public.product_stack for select
  to anon, authenticated
  using (true);
