import { Hono } from "hono";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import { relationsTable } from "@/server/models/relations";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

export const relationRouter = new Hono();

relationRouter.post("/", async (c) => {
  const relation = await c.req.json();
  try {
    const result = await db.insert(relationsTable).values(relation).returning();
    return c.json(result);
  } catch (error) {
    return c.json({ message: "Relation creation failed", error }, 500);
  }
});

relationRouter.get(
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
      const relation = await db
        .select()
        .from(relationsTable)
        .limit(limit)
        .offset(page * limit);

      if (relation) {
        return c.json(relation);
      } else {
        return c.json({ message: "Relation not found" }, 404);
      }
    } catch (error) {
      return c.json({ message: "Failed to retrieve relation", error }, 500);
    }
  }
);

relationRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  try {
    const relation = await db
      .select()
      .from(relationsTable)
      .where(eq(relationsTable.id, id))
      .limit(1);

    if (relation) {
      return c.json(relation);
    } else {
      return c.json({ message: "Relation not found" }, 404);
    }
  } catch (error) {
    return c.json({ message: "Failed to retrieve relation", error }, 500);
  }
});
