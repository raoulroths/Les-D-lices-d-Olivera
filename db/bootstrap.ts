import { sql } from "drizzle-orm";
import { db } from "@/db";

let schemaPromise: Promise<void> | null = null;
let seedPromise: Promise<void> | null = null;

/**
 * Crée les tables si elles n'existent pas (base neuve, ex. Neon).
 * Idempotent : sans effet si les tables existent déjà.
 * Sur Neon, on exécute les statements un par un pour éviter les erreurs de parallèle.
 */
export function ensureSchema(): Promise<void> {
  if (!schemaPromise) {
    schemaPromise = (async () => {
      const statements = [
        sql`CREATE TABLE IF NOT EXISTS products (
          id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          slug text NOT NULL UNIQUE,
          name text NOT NULL,
          flavor text NOT NULL,
          collection text NOT NULL,
          pack_size integer NOT NULL,
          price integer NOT NULL,
          compare_at_price integer,
          short_description text NOT NULL,
          description text NOT NULL,
          ingredients text NOT NULL,
          image text NOT NULL,
          images jsonb NOT NULL,
          featured boolean NOT NULL DEFAULT false,
          in_stock boolean NOT NULL DEFAULT true,
          badge text,
          created_at timestamptz NOT NULL DEFAULT now()
        )`,
        sql`CREATE TABLE IF NOT EXISTS reviews (
          id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
          author text NOT NULL,
          rating integer NOT NULL,
          title text NOT NULL,
          body text NOT NULL,
          created_at timestamptz NOT NULL DEFAULT now()
        )`,
        sql`CREATE TABLE IF NOT EXISTS orders (
          id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          customer_name text NOT NULL,
          phone text NOT NULL,
          email text,
          address text,
          city text,
          notes text,
          occasion text,
          delivery_type text NOT NULL,
          payment_method text NOT NULL DEFAULT 'Espèces',
          subtotal integer NOT NULL,
          delivery_fee integer NOT NULL,
          total integer NOT NULL,
          status text NOT NULL DEFAULT 'pending',
          created_at timestamptz NOT NULL DEFAULT now()
        )`,
        sql`CREATE TABLE IF NOT EXISTS order_items (
          id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
          product_id uuid REFERENCES products(id) ON DELETE SET NULL,
          name text NOT NULL,
          quantity integer NOT NULL,
          unit_price integer NOT NULL,
          image text
        )`,
      ];

      for (const statement of statements) {
        try {
          await db.execute(statement);
        } catch (error) {
          // 42P07 = duplicate_table / 23505 = unique_violation (déjà là), on ignore.
          const code =
            error && typeof error === "object" && "code" in error
              ? (error as { code?: string }).code
              : undefined;
          if (code && code !== "42P07" && code !== "23505") throw error;
        }
      }
    })().catch((error) => {
      schemaPromise = null;
      if (
        error &&
        typeof error === "object" &&
        "message" in error &&
        typeof (error as { message: unknown }).message === "string" &&
        ((error as { message: string }).message.includes(
          "DATABASE_URL",
        ) ||
          (error as { message: string }).message.includes("ECONNREFUSED") ||
          (error as { message: string }).message.includes("password authentication failed"))
      ) {
        console.warn(
          "[db] Base indisponible pendant le build, on ignore (schemaPromise réinitialisé).",
        );
        return;
      }
      throw error;
    });
  }
  return schemaPromise;
}
