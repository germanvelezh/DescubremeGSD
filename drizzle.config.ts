import { defineConfig } from "drizzle-kit";

// Migrations require direct connection (port 5432) — not the transaction
// pooler. See PATTERNS.md §4 + .env.example DATABASE_URL vs SUPABASE_DB_URL.
const dbUrl = process.env.SUPABASE_DB_URL ?? process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error(
    "SUPABASE_DB_URL (or DATABASE_URL) must be set for drizzle-kit. " +
      "See .env.example.",
  );
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema/*",
  out: "./db/migrations",
  dbCredentials: {
    url: dbUrl,
  },
  strict: true,
  verbose: true,
});
