import { Hono } from "hono";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import { peopleTable } from "@/server/models/people";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { peopleToRelationsTable } from "../models/people-to-relations";

export const peopleRouter = new Hono();

peopleRouter.post("/", async (c) => {
  try {
    const { relations, ...person } = await c.req.json();

    console.log("PERSON ID:", person);

    const people = await db.insert(peopleTable).values(person).returning();

    if (people.length === 0) {
      throw new Error("Failed to insert person");
    }

    const personId = people[0].id;

    // Insert the relations into the people_relations table
    const relationsData = relations.map((relationId: string) => ({
      person_id: personId,
      relation_id: relationId,
    }));

    const result = await db
      .insert(peopleToRelationsTable)
      .values(relationsData);

    return c.json(result);
  } catch (error) {
    return c.json({ message: "Person creation failed", error }, 500);
  }
});

peopleRouter.get(
  "/",
  zValidator(
    "query",
    z.object({
      page: z.coerce.number().nonnegative().optional().default(0),
      limit: z.coerce.number().nonnegative().optional().default(10),
    })
  ),
  async (c) => {
    const { limit, page } = c.req.valid("query");

    try {
      const person = await db
        .select()
        .from(peopleToRelationsTable)
        .leftJoin(
          peopleTable,
          eq(peopleToRelationsTable.personId, peopleTable.id)
        )
        .limit(limit)
        .offset(page * limit);

      if (person) {
        return c.json(person);
      } else {
        return c.json({ message: "Person not found" }, 404);
      }
    } catch (error) {
      return c.json({ message: "Failed to retrieve person", error }, 500);
    }
  }
);

peopleRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  try {
    const person = await db
      .select()
      .from(peopleTable)
      .where(eq(peopleTable.id, id))
      .limit(1);

    if (person) {
      return c.json(person);
    } else {
      return c.json({ message: "Person not found" }, 404);
    }
  } catch (error) {
    return c.json({ message: "Failed to retrieve person", error }, 500);
  }
});
