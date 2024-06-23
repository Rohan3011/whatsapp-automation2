import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { peopleTable } from "./people";
import { relationsTable } from "./relations";

export const peopleToRelationsTable = sqliteTable("people_to_relations", {
  personId: text("person_id")
    .notNull()
    .references(() => peopleTable.id),
  relationId: text("relation_id")
    .notNull()
    .references(() => relationsTable.id),
});
