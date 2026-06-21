import "dotenv/config";
import { defineConfig } from "prisma/config";

const databaseUrl = process.env.DATABASE_URL;

export default defineConfig({
  schema: "models",
  datasource: {
    url: databaseUrl || "mysql://root:password@localhost:3306/database",
  },
});
