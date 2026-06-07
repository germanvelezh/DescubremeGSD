/**
 * POST /api/consent/grant — Stub Route Handler (Plan 01-07 Task 3).
 *
 * Per Plan 01-07 task description: the consent grant is performed INLINE
 * in `app/(auth)/callback/route.ts` (simpler, fewer hops). This file
 * exists as a stub for Plan 01-09 / Plan 01-12 to wire revocation +
 * re-grant flows from the /me/data UI.
 *
 * For now it returns 501 Not Implemented so any premature caller gets
 * a clear signal rather than silent success.
 *
 * Anchors:
 *  - 01-PATTERNS.md §2.4 (Route Handler convention).
 *  - 01-CONTEXT.md D1.6 (consent metadata).
 */
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST() {
  return NextResponse.json(
    {
      error: "Not implemented",
      detail:
        "Consent grant is performed inline in /auth/callback during signup. This endpoint is reserved for future re-grant flows (Plan 01-09).",
    },
    { status: 501 },
  );
}
