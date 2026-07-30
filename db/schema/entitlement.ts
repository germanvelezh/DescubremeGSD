// Entitlement — acceso pagado por usuario (Fase 1 esqueleto, activado en la
// Fase 3 Plan 03-01 con las dos columnas de idempotencia de Stripe).
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

  // ---- Idempotencia de Stripe (D-20, migracion 020) -----------------------
  // Nullable: un entitlement puede concederse por una via que no sea Stripe
  // (cortesia, soporte, B2B en la Fase 4). Los UNIQUE que los protegen son
  // PARCIALES (`WHERE ... IS NOT NULL`) y viven en la migracion 020 — drizzle
  // no los declara aca porque el repo mantiene el SQL a mano como fuente y
  // este archivo como espejo tipado.
  paymentIntentId: text("payment_intent_id"),
  checkoutSessionId: text("checkout_session_id"),
});
