/**
 * Vitest stub for `server-only` — Phase 1 Wave 3 (Plan 01-06).
 *
 * The real `server-only` package ships a poisoned module that throws if
 * imported from a client bundle. Vitest is neither client nor server in
 * Next.js terms — it just runs Node — so we alias `server-only` to this
 * noop module via `vitest.config.ts` `resolve.alias`. Importing it has
 * no side effects.
 */
export {};
