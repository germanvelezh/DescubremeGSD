// Entitlement — Phase 3 Stripe placeholder (per-user product access).
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./user";

export const entitlement = pgTable("entitlement", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id),
  productCode: text("product_code").notNull(),
  // status check ('active','revoked','expired') enforced at SQL migration level
  status: text("status").notNull(),
  grantedAt: timestamp("granted_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  expiresAt: timestamp("expires_at", { withTimezone: true }),
});
