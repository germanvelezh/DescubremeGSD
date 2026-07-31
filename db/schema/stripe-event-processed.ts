// stripe_event_processed — capa 1 de idempotencia del webhook de Stripe
// (D-20, migracion 020, Plan 03-01).
//
// Stripe reintenta un webhook hasta recibir un 2xx, asi que el MISMO
// `event.id` llega varias veces por diseno. Esta tabla es el registro de "ya
// procesado": el handler inserta con ON CONFLICT DO NOTHING y ramifica sobre
// las filas afectadas — cero filas significa reintento, y responde 200 sin
// conceder nada.
//
// RLS habilitada y CERO politicas (migracion 020): la app no lee esta tabla,
// solo el webhook la escribe con service_role.
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const stripeEventProcessed = pgTable("stripe_event_processed", {
  // El PRIMARY KEY ES la restriccion UNIQUE que exige el Hard Gate, y el
  // target del ON CONFLICT (event_id) del handler.
  eventId: text("event_id").primaryKey(),
  eventType: text("event_type").notNull(),
  processedAt: timestamp("processed_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
