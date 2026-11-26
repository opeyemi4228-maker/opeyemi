/**
 * The Prisma client, created on first use. Server only.
 *
 * Lazy so the static public pages build and render on a machine with no
 * DATABASE_URL — only code that actually touches the database needs one.
 * Cached on globalThis because dev-mode hot reloads would otherwise open a
 * fresh connection pool on every edit.
 */

import "server-only";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/index.js";

const globalForPrisma = globalThis;

export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

export class DatabaseNotConfiguredError extends Error {
  constructor() {
    super(
      "DATABASE_URL is not set. Add your Postgres connection string to .env.local (see .env.example)."
    );
    this.name = "DatabaseNotConfiguredError";
  }
}

export function db() {
  if (globalForPrisma.__otoPrisma) return globalForPrisma.__otoPrisma;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new DatabaseNotConfiguredError();

  const client = new PrismaClient({
    // DATABASE_POOL_MAX caps connections per server instance. Serverless
    // hosts run many instances, so a small pool (e.g. 3) protects the database.
    adapter: new PrismaPg({ connectionString, max: Number(process.env.DATABASE_POOL_MAX) || 10 }),
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });
  globalForPrisma.__otoPrisma = client;
  return client;
}
