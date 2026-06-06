// Plugin catalog: items as data (FOUND-02 + FOUND-05 no hardcoded codes).
import { boolean, integer, pgTable, text, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { instrumentVersion } from "./instrument-version";

export const item = pgTable(
  "item",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    instrumentVersionId: uuid("instrument_version_id")
      .notNull()
      .references(() => instrumentVersion.id),
    sequenceNumber: integer("sequence_number").notNull(),
    stem: text("stem").notNull(),
    dimension: text("dimension"),
    reverseKey: boolean("reverse_key").notNull().default(false),
  },
  (t) => ({
    versionSeqUnique: uniqueIndex("item_version_sequence_idx").on(
      t.instrumentVersionId,
      t.sequenceNumber,
    ),
  }),
);
