#!/usr/bin/env node
// Creates the dashboard owner account, or resets its password.
//
//   npm run admin:create
//
// Asks for name, email and password. For non-interactive use (CI, a hosted
// shell) set ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD instead.
// Running it again with the same email updates that account's password and
// signs out all of its sessions, which makes it the "forgot password" route.

import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { config as loadEnv } from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";
import prismaPkg from "../lib/generated/prisma/index.js";
import { hashPassword, passwordProblem } from "../lib/auth/password.mjs";

const { PrismaClient } = prismaPkg;

loadEnv({ path: ".env", quiet: true });
loadEnv({ path: ".env.local", override: true, quiet: true });

if (!process.env.DATABASE_URL) {
  console.error("\n  DATABASE_URL is not set. Add it to .env.local first (see .env.example).\n");
  process.exit(1);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

async function ask(rl, question, { hidden = false } = {}) {
  if (!hidden) return (await rl.question(question)).trim();
  // Mute the echo while the password is typed.
  const write = rl._writeToOutput;
  rl._writeToOutput = (s) => (s.includes(question) ? write.call(rl, s) : write.call(rl, ""));
  const answer = await rl.question(question);
  rl._writeToOutput = write;
  stdout.write("\n");
  return answer;
}

async function collect() {
  const env = { name: process.env.ADMIN_NAME, email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD };
  if (env.email && env.password) return { name: env.name || "Owner", email: env.email, password: env.password };

  const rl = createInterface({ input: stdin, output: stdout, terminal: true });
  console.log("\n  Create the dashboard owner account\n");
  const name = (await ask(rl, "  Your name: ")) || "Owner";
  const email = await ask(rl, "  Email (used to sign in): ");
  let password;
  for (;;) {
    password = await ask(rl, "  Password (12+ characters): ", { hidden: true });
    const problem = passwordProblem(password);
    if (problem) {
      console.log(`  ${problem}`);
      continue;
    }
    const again = await ask(rl, "  Repeat password: ", { hidden: true });
    if (again === password) break;
    console.log("  Those did not match. Try again.");
  }
  rl.close();
  return { name, email, password };
}

const input = await collect();
const email = input.email.trim().toLowerCase();
if (!EMAIL_RE.test(email)) {
  console.error(`\n  "${input.email}" is not a valid email address.\n`);
  process.exit(1);
}
const problem = passwordProblem(input.password);
if (problem) {
  console.error(`\n  Password rejected: ${problem}\n`);
  process.exit(1);
}

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });
try {
  const passwordHash = await hashPassword(input.password);
  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (existing) {
    await prisma.adminUser.update({ where: { email }, data: { passwordHash, name: input.name.slice(0, 120) } });
    await prisma.adminSession.deleteMany({ where: { userId: existing.id } });
    console.log(`\n  Password updated for ${email}. All of its sessions were signed out.\n`);
  } else {
    await prisma.adminUser.create({ data: { email, name: input.name.slice(0, 120), passwordHash } });
    console.log(`\n  Account created for ${email}. Sign in at /admin/login.\n`);
  }
} catch (error) {
  console.error("\n  Could not save the account:", error.message);
  console.error("  If the tables do not exist yet, run: npm run db:migrate\n");
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
