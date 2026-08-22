"use client";

import { useState } from "react";
import { useCart } from "@/context/cart-context";
import { QtyInput } from "@/components/qty-input";
import { formatPrice } from "@/lib/format";

export function AddToCart({
  productId,
  slug,
  name,
  image,
  price,
  flavor,
  packSize,
}: {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  flavor: string;
  packSize: number;
}) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <QtyInput value={qty} onChange={setQty} />
        <p className="font-display text-2xl text-plum">{formatPrice(price * qty)}</p>
      </div>
      <button
        type="button"
        className="btn-primary w-full sm:w-auto"
        onClick={() => {
          addItem(
            { productId, slug, name, image, price, flavor, packSize },
            qty,
          );
          setAdded(true);
          window.setTimeout(() => setAdded(false), 1600);
        }}
      >
        {added ? "Ajouté au panier" : "Ajouter au panier"}
      </button>
    </div>
  );
}
