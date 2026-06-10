-- 012: enforce one item_response per (session_id, item_id).
--
-- Fixes the magic-link signup-claim failure discovered during
-- /gsd-verify-work 1 (2026-06-10). `/api/respond` used a plain INSERT, so
-- re-answering a Likert item created duplicate item_response rows (all with
-- user_id NULL while anonymous). When the callback claimed the session and
-- set user_id on every row at once, the partial unique index
-- `(user_id, item_id) WHERE user_id IS NOT NULL` (migration 002) was
-- violated -> claim threw -> callback redirected to /?error=signup.
--
-- `/api/respond` now upserts on (session_id, item_id) (last answer wins).
-- This migration (a) deduplicates pre-existing rows and (b) adds the unique
-- index that the upsert uses as its ON CONFLICT target.
--
-- Idempotent: the DELETE is a no-op once deduplicated; the index uses
-- IF NOT EXISTS.

-- Step 1: keep the most recent response per (session_id, item_id), drop the rest.
DELETE FROM public.item_response a
USING public.item_response b
WHERE a.session_id = b.session_id
  AND a.item_id = b.item_id
  AND (
    a.responded_at < b.responded_at
    OR (a.responded_at = b.responded_at AND a.id < b.id)
  );

-- Step 2: one response per item per session + ON CONFLICT target for the upsert.
CREATE UNIQUE INDEX IF NOT EXISTS item_response_session_item_uniq
  ON public.item_response (session_id, item_id);
