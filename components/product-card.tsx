"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import type { ProductWithRating } from "@/lib/catalog";
import { FLAVOR_LABELS, formatPrice } from "@/lib/format";
import { StarRating } from "@/components/star-rating";

export function ProductCard({ product }: { product: ProductWithRating }) {
  const { addItem } = useCart();
  const images = product.images ?? [product.image];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.6rem] bg-white shadow-[0_18px_40px_rgba(44,11,74,0.08)] ring-1 ring-plum/5 transition duration-500 hover:-translate-y-1 hover:shadow-[0_28px_50px_rgba(44,11,74,0.14)]">
      <Link href={`/produits/${product.slug}`} className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={images[0] ?? product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-plum/90 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-cream">
            {product.badge}
          </span>
        )}
        <span className="absolute bottom-3 left-3 rounded-full bg-ivory/95 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-magenta">
          {FLAVOR_LABELS[product.flavor] ?? product.flavor}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <Link href={`/produits/${product.slug}`}>
          <h3 className="font-display text-2xl leading-tight text-plum">{product.name}</h3>
        </Link>
        <p className="mt-2 line-clamp-2 text-sm text-cocoa">{product.shortDescription}</p>
        <div className="mt-3 flex items-center gap-2">
          <StarRating value={product.averageRating} />
          <span className="text-xs text-cocoa/70">({product.reviewCount})</span>
        </div>
        <div className="mt-auto flex items-end justify-between pt-5">
          <div>
            <p className="font-display text-2xl text-plum">{formatPrice(product.price)}</p>
            {product.compareAtPrice ? (
              <p className="text-xs text-cocoa line-through">
                {formatPrice(product.compareAtPrice)}
              </p>
            ) : (
              <p className="text-xs text-cocoa">{product.packSize} crêpes</p>
            )}
          </div>
          <button
            type="button"
            className="rounded-full bg-plum px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-cream transition hover:bg-magenta"
            onClick={() =>
              addItem({
                productId: product.id,
                slug: product.slug,
                name: product.name,
                image: product.image,
                price: product.price,
                flavor: product.flavor,
                packSize: product.packSize,
              })
            }
          >
            Ajouter
          </button>
        </div>
      </div>
    </article>
  );
}
