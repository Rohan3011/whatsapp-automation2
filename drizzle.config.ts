import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });

export default defineConfig({
  schema: "./src/server/models/*.ts",
  out: "./src/server/migrations",
  dialect: "sqlite",
  dbCredentials: {
    url: "./database.db",
  },
});
