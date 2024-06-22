import { Hono } from "hono";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import { peopleTable } from "@/server/models/people";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

export const peopleRouter = new Hono();

peopleRouter.post("/", async (c) => {
  const person = await c.req.json();
  try {
    const result = await db.insert(peopleTable).values(person).returning();
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
        .from(peopleTable)
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
