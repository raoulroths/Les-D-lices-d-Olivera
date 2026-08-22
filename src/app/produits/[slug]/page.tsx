import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/add-to-cart";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { ReviewForm } from "@/components/review-form";
import { ShareBar } from "@/components/share-bar";
import { StarRating } from "@/components/star-rating";
import { getProductBySlug, getRelatedProducts } from "@/lib/catalog";
import {
  COLLECTION_LABELS,
  FLAVOR_LABELS,
  formatDate,
  formatPrice,
} from "@/lib/format";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Produit introuvable" };
  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product);
  const gallery = product.images?.length ? product.images : [product.image];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <nav className="text-xs uppercase tracking-[0.16em] text-cocoa">
        <Link href="/boutique" className="hover:text-magenta">
          Boutique
        </Link>
        <span className="mx-2">/</span>
        <span>{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-2">
        <ProductGallery images={gallery} alt={product.name} />
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-magenta">
            {FLAVOR_LABELS[product.flavor]} · {COLLECTION_LABELS[product.collection]}
          </p>
          <h1 className="mt-2 font-display text-5xl leading-tight text-plum">{product.name}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <StarRating value={product.averageRating} size="md" />
            <span className="text-sm text-cocoa">
              {product.reviewCount} avis · {product.packSize} crêpes
            </span>
          </div>
          <div className="mt-6 flex items-end gap-3">
            <p className="font-display text-5xl text-plum">{formatPrice(product.price)}</p>
            {product.compareAtPrice ? (
              <p className="mb-1 text-lg text-cocoa line-through">
                {formatPrice(product.compareAtPrice)}
              </p>
            ) : null}
          </div>
          <p className="mt-6 text-base leading-relaxed text-cocoa">{product.description}</p>
          <div className="mt-8">
            <AddToCart
              productId={product.id}
              slug={product.slug}
              name={product.name}
              image={product.image}
              price={product.price}
              flavor={product.flavor}
              packSize={product.packSize}
            />
          </div>
          <div className="mt-6">
            <ShareBar
              title={product.name}
              text={`${product.name} — ${formatPrice(product.price)} chez Les Délices de Olivera`}
            />
          </div>
          <dl className="mt-10 grid gap-4 rounded-[1.4rem] bg-white p-5 text-sm ring-1 ring-plum/10 sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-magenta">Ingrédients</dt>
              <dd className="mt-1 text-cocoa">{product.ingredients}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-magenta">Service</dt>
              <dd className="mt-1 text-cocoa">
                Cuit minute · à emporter ou livré · paiement à la réception
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <section className="mt-20 grid gap-10 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <h2 className="font-display text-4xl">Avis gourmands</h2>
          <div className="mt-6 space-y-5">
            {product.productReviews.length === 0 ? (
              <p className="text-cocoa">Soyez le premier à raconter votre dégustation.</p>
            ) : (
              product.productReviews.map((review) => (
                <article
                  key={review.id}
                  className="rounded-[1.4rem] bg-white p-5 ring-1 ring-plum/10"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium text-plum">{review.author}</p>
                    <p className="text-xs text-cocoa">{formatDate(review.createdAt)}</p>
                  </div>
                  <div className="mt-1">
                    <StarRating value={review.rating} />
                  </div>
                  <h3 className="mt-2 font-display text-2xl">{review.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-cocoa">{review.body}</p>
                </article>
              ))
            )}
          </div>
        </div>
        <ReviewForm productId={product.id} slug={product.slug} />
      </section>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-4xl">À savourer aussi</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <div className="mt-16 overflow-hidden rounded-[1.8rem]">
        <div className="relative h-40 sm:h-56">
          <Image src="/images/box.jpg" alt="" fill className="object-cover" sizes="100vw" />
        </div>
      </div>
    </div>
  );
}
