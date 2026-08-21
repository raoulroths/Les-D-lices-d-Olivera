import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { products, reviews } from "@/db/schema";
import { ensureSeeded } from "@/db/seed";

export async function POST(request: Request) {
  await ensureSeeded();

  let body: {
    productId?: string;
    slug?: string;
    author?: string;
    title?: string;
    body?: string;
    rating?: number;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const author = String(body.author ?? "").trim();
  const title = String(body.title ?? "").trim();
  const text = String(body.body ?? "").trim();
  const rating = Math.max(1, Math.min(5, Math.round(Number(body.rating) || 5)));
  const productId = String(body.productId ?? "");

  if (!author || !title || !text || !productId) {
    return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 });
  }

  const [product] = await db
    .select({ id: products.id, slug: products.slug })
    .from(products)
    .where(eq(products.id, productId))
    .limit(1);

  if (!product) {
    return NextResponse.json({ error: "Produit introuvable." }, { status: 404 });
  }

  const [review] = await db
    .insert(reviews)
    .values({
      productId: product.id,
      author,
      title,
      body: text,
      rating,
    })
    .returning();

  revalidatePath(`/produits/${product.slug}`);
  revalidatePath("/boutique");
  revalidatePath("/");

  return NextResponse.json({ id: review.id });
}
