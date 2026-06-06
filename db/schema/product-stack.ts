// Product stack mapping: instruments per product (MODELO_DATOS §2.3).
import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { instrumentVersion } from "./instrument-version";
import { product } from "./product";

export const productStack = pgTable("product_stack", {
  id: uuid("id").primaryKey().defaultRandom(),
  productCode: text("product_code")
    .notNull()
    .references(() => product.code),
  instrumentVersionId: uuid("instrument_version_id")
    .notNull()
    .references(() => instrumentVersion.id),
  order: integer("order").notNull().default(0),
  layer: text("layer"),
});
