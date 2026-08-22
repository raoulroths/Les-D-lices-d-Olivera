import { and, desc, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { products, reviews, type Product, type Review } from "@/db/schema";
import { ensureSeeded } from "@/db/seed";

export type ProductWithRating = Product & {
  averageRating: number;
  reviewCount: number;
  images: string[];
};

function withImages(product: Product): Product {
  const images = Array.isArray(product.images)
    ? product.images.filter((item): item is string => typeof item === "string")
    : [];
  return {
    ...product,
    images: images.length ? images : [product.image],
  };
}

export async function getProducts(): Promise<ProductWithRating[]> {
  if (!process.env.DATABASE_URL) return [];
  await ensureSeeded();

  const rows = await db
    .select({
      product: products,
      averageRating: sql<number>`coalesce(avg(${reviews.rating}), 0)`,
      reviewCount: sql<number>`count(${reviews.id})::int`,
    })
    .from(products)
    .leftJoin(reviews, eq(reviews.productId, products.id))
    .groupBy(products.id)
    .orderBy(desc(products.featured), products.price);

  return rows.map((row) => ({
    ...withImages(row.product),
    averageRating: Number(row.averageRating) || 0,
    reviewCount: Number(row.reviewCount) || 0,
  }));
}

export async function getFeaturedProducts() {
  const all = await getProducts();
  return all.filter((p) => p.featured);
}

export async function getProductBySlug(slug: string): Promise<
  | (ProductWithRating & { productReviews: Review[] })
  | null
> {
  if (!process.env.DATABASE_URL) return null;
  await ensureSeeded();

  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1);

  if (!product) return null;

  const productReviews = await db
    .select()
    .from(reviews)
    .where(eq(reviews.productId, product.id))
    .orderBy(desc(reviews.createdAt));

  const reviewCount = productReviews.length;
  const averageRating =
    reviewCount === 0
      ? 0
      : productReviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount;

  return { ...withImages(product), productReviews, averageRating, reviewCount };
}

export async function getRelatedProducts(product: Product, limit = 4) {
  const all = await getProducts();
  return all
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.flavor === product.flavor || p.collection === product.collection),
    )
    .slice(0, limit);
}

export async function getProductStats() {
  if (!process.env.DATABASE_URL) return { reviewCount: 0 };
  await ensureSeeded();
  const [{ count }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(reviews);
  return { reviewCount: Number(count) || 0 };
}
