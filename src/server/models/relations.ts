import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 } from "uuid";

export const relationsTable = sqliteTable("relations", {
  id: text("id")
    .primaryKey()
    .$default(() => v4()),
  name: text("name").notNull(),
  chapter: text("chapter"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$onUpdate(() => new Date()),
});

export type InsertRelation = typeof relationsTable.$inferInsert;
export type SelectRelation = typeof relationsTable.$inferSelect;
