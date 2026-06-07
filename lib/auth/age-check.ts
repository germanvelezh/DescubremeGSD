/**
 * Server-only authoritative age check (D2.4 + PATTERNS row 7 LOCKED).
 *
 * The Server Action MUST re-validate DOB even if the UI disables submit
 * for <18 — clients can tamper with form state. This util lives in
 * `lib/auth/` (plain TS module) because `app/(auth)/signup/actions.ts`
 * has `"use server"` directive and Next.js 16 forbids non-async exports
 * from Server Action files (Turbopack Build Error otherwise).
 *
 * Anchors:
 *  - 01-CONTEXT.md D2.4 (server-only age check).
 *  - 01-PATTERNS.md row 7 (DOB server-only authoritative).
 */

/** Returns true if the date-of-birth ISO string places the person at 18+ as of today. */
export function isAtLeast18(dobIso: string, today: Date = new Date()): boolean {
  const dob = new Date(`${dobIso}T00:00:00Z`);
  if (Number.isNaN(dob.getTime())) return false;
  const eighteenthBirthday = new Date(
    Date.UTC(
      dob.getUTCFullYear() + 18,
      dob.getUTCMonth(),
      dob.getUTCDate(),
    ),
  );
  return today.getTime() >= eighteenthBirthday.getTime();
}
