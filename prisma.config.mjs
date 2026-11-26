/**
 * Prisma 7 reads the connection URL from here rather than schema.prisma.
 *
 * DATABASE_URL comes from .env.local (gitignored), falling back to .env —
 * the same precedence Next.js uses. On Neon, use the POOLED connection string.
 *
 * Read through process.env rather than Prisma's env() helper: env() throws on
 * a missing variable at load, which would break `prisma generate` (run on
 * every `npm install`) on machines that have no database configured.
 */

import { config as loadEnv } from "dotenv";
import { defineConfig } from "prisma/config";

loadEnv({ path: ".env", quiet: true });
loadEnv({ path: ".env.local", override: true, quiet: true });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: { url: process.env.DATABASE_URL ?? "" },
});
