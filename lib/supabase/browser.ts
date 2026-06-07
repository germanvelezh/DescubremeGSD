/**
 * Supabase browser client — DescubreMe Phase 1 Wave 3 (Plan 01-06).
 *
 * Singleton `createBrowserClient` for Client Components. Returns the
 * same instance per page-load so React subscriptions stay stable.
 *
 * Anchors:
 * - 01-RESEARCH.md §"1. Auth domain".
 * - 01-PATTERNS.md §2.3.
 *
 * Browser bundle: this file gets shipped to the client. NEVER import
 * `lib/supabase/server.ts` or `lib/supabase/service-role.ts` here —
 * both have `import 'server-only'` guards that would explode at build.
 */
import { createBrowserClient } from "@supabase/ssr";

type BrowserClient = ReturnType<typeof createBrowserClient>;

let cachedClient: BrowserClient | null = null;

export function getSupabaseBrowserClient(): BrowserClient {
  if (cachedClient) return cachedClient;
  cachedClient = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  );
  return cachedClient;
}
