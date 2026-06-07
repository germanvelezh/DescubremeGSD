-- 008_baremo_fallback_event.sql — QUAL-08 telemetry (Plan 01-08, Wave 5).
--
-- Records WHEN lib/baremo/selector.ts falls back from the requested country
-- to a sibling (CO -> MX) or to INTL. Used by Phase 6 POLISH-06 to measure
-- how often LATAM users hit US-based baremos so the empirical baremo CO
-- (§G of the ONET-IP-SF Addendum) gets prioritized when N_CO >= 500.
--
-- Anchors:
--   - 01-PLAN 01-08 §<feature> behavior #8 (QUAL-08).
--   - 01-RESEARCH.md §"Pitfall 10: Baremo INTL fallback silencioso" (lines 1780-1782).
--   - 01-PATTERNS.md §2.3 (lib/baremo/selector).
--
-- Threat register:
--   - T-01-08-02 Information Disclosure: NO user_id, NO PII. Only
--     instrument_version_id + country + baremo population + timestamp.
--     This bounds the leakage surface to "which version was scored where".
--   - T-01-08-SC Tampering supply chain: no new npm installs.
--
-- RLS posture:
--   - ENABLE RLS (deny by default).
--   - No SELECT / INSERT / UPDATE / DELETE policies for `authenticated` or
--     `anon` — telemetry is service_role-only (writer = Route Handler
--     /api/score via service-role client, reader = future ops dashboard).

create table public.baremo_fallback_event (
  id uuid primary key default gen_random_uuid(),
  instrument_version_id uuid not null references public.instrument_version(id),
  country_requested text not null,
  baremo_used text not null check (baremo_used in ('CO', 'MX', 'INTL')),
  occurred_at timestamptz not null default now()
);

alter table public.baremo_fallback_event enable row level security;

-- Defense in depth: service-role bypasses RLS by design. Both anon and
-- authenticated roles get explicit REVOKE so a future policy regression
-- can't accidentally expose telemetry to a JWT-bearing user.
revoke all on public.baremo_fallback_event from public, anon, authenticated;

comment on table public.baremo_fallback_event is
  'QUAL-08 telemetry. Service-role writes only. No user_id by design (T-01-08-02).';
