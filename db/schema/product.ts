// Product catalog placeholder (MODELO_DATOS §2.3).
import { pgTable, text } from "drizzle-orm/pg-core";

export const product = pgTable("product", {
  code: text("code").primaryKey(),
  description: text("description"),
});
