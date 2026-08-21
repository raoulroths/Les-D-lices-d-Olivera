import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const databaseUrl = process.env.DATABASE_URL;

function buildFallbackPool() {
  return new Pool({
    // Dummy pool for build-time prerender on Vercel Hobby where DATABASE_URL is not
    // available in the "Development" environment. Real requests never hit this pool
    // because production/preview always have DATABASE_URL set.
    connectionString: "postgresql://user:password@localhost:5432/olivera",
  });
}

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

export const pool =
  globalForDb.__arenaNextJsPostgresqlPool ??
  (databaseUrl
    ? new Pool({ connectionString: databaseUrl })
    : buildFallbackPool());

if (process.env.NODE_ENV !== "production") {
  globalForDb.__arenaNextJsPostgresqlPool = pool;
}

export const db = drizzle(pool, { schema });

// Fail-safe: during Vercel build without DATABASE_URL we must not throw; pages that
// need data simply return [] and dynamic routes hit a real DB at request time.
if (!databaseUrl) {
  console.warn("[db] DATABASE_URL absent au build, utilisation d'un pool factice.");
}
