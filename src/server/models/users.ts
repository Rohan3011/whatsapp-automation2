import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 } from "uuid";

export const usersTable = sqliteTable("users", {
  id: text("id")
    .primaryKey()
    .$default(() => v4()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$onUpdate(() => new Date()),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
