// src/schema.ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { v4 } from "uuid";
import { relationsTable } from "./relations";
import { relations } from "drizzle-orm";

export const peopleTable = sqliteTable("people", {
  id: text("id")
    .primaryKey()
    .$default(() => v4()),
  name: text("name").notNull(),
  dateOfBirth: text("date_of_birth"),
  salutation: text("salutation"),
  metaData: text("meta_data", { mode: "json" }),
  relationId: text("relation_id", { mode: "json" }).notNull().$type<string[]>(),
  additionalInfo: text("additional_info"),
  image: text("image"),
  email: text("email"),
  gender: text("gender", { enum: ["male", "female", "other"] }).notNull(),
  mobile: text("mobile"),
  extendedFamily: integer("extended_family", { mode: "boolean" }),
  //   relative: integer("relative").nullable(), // Assuming the relative field stores an ID of another record in the same collection
  familyRelation: text("family_relation"),
  company: text("company"),
  socialLink: text("social_link"),
  ex: integer("ex", { mode: "boolean" }),
  createdAt: text("created_at").notNull().default(new Date().toDateString()),
  updatedAt: text("updated_at")
    .notNull()
    .$onUpdate(() => new Date().toDateString()),
});

export const peopleRelations = relations(peopleTable, ({ many }) => ({
  posts: many(relationsTable),
}));

export type InsertPeople = typeof peopleTable.$inferInsert;
export type SelectPeople = typeof peopleTable.$inferSelect;
