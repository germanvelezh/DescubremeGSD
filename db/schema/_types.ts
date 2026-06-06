// Shared Drizzle column types — DescubreMe Phase 1.
import { customType } from "drizzle-orm/pg-core";

// envelope encryption per D4.2 — payload + DEK ciphertext stored as bytea
export const bytea = customType<{ data: Buffer; driverData: Buffer }>({
  dataType() {
    return "bytea";
  },
});
