"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { FLAVOR_LABELS, formatPrice } from "@/lib/format";
import { IconClose } from "@/components/icons";
import { QtyInput } from "@/components/qty-input";

export function CartDrawer() {
  const { items, isOpen, closeCart, subtotal, updateQty, removeItem, count } = useCart();

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-plum-deep/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
        aria-hidden={!isOpen}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-ivory shadow-2xl transition-transform duration-500 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
        aria-label="Panier"
      >
        <header className="flex items-center justify-between border-b border-plum/10 px-6 py-5">
          <div>
            <p className="font-script text-3xl text-magenta">Votre panier</p>
            <p className="text-xs uppercase tracking-[0.2em] text-cocoa">
              {count} {count > 1 ? "articles" : "article"}
            </p>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="grid h-10 w-10 place-items-center rounded-full border border-plum/10 text-plum transition hover:border-magenta hover:text-magenta"
            aria-label="Fermer le panier"
          >
            <IconClose className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="font-display text-3xl text-plum">Le panier est vide</p>
              <p className="mt-2 max-w-xs text-sm text-cocoa">
                Les crêpes nature, chocolat, Nutella et Céréalac n’attendent que vous.
              </p>
              <Link
                href="/boutique"
                onClick={closeCart}
                className="btn-primary mt-6"
              >
                Voir le menu
              </Link>
            </div>
          ) : (
            <ul className="space-y-5">
              {items.map((item) => (
                <li key={item.productId} className="flex gap-4">
                  <Link
                    href={`/produits/${item.slug}`}
                    onClick={closeCart}
                    className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-display text-lg leading-tight text-plum">
                          {item.name}
                        </p>
                        <p className="text-xs uppercase tracking-wider text-magenta">
                          {FLAVOR_LABELS[item.flavor] ?? item.flavor} · {item.packSize} pcs
                        </p>
                      </div>
                      <p className="text-sm font-medium text-plum">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <QtyInput
                        value={item.quantity}
                        onChange={(q) => updateQty(item.productId, q)}
                        min={0}
                      />
                      <button
                        type="button"
                        onClick={() => removeItem(item.productId)}
                        className="text-xs uppercase tracking-wider text-cocoa underline-offset-4 hover:text-magenta hover:underline"
                      >
                        Retirer
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="border-t border-plum/10 bg-cream px-6 py-5">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-cocoa">Sous-total</p>
                <p className="font-display text-3xl text-plum">{formatPrice(subtotal)}</p>
              </div>
              <p className="max-w-[10rem] text-right text-[11px] leading-relaxed text-cocoa">
                Livraison à Daloa 500 F · offerte dès 5 000 F · paiement avant la livraison
              </p>
            </div>
            <Link href="/checkout" onClick={closeCart} className="btn-primary mt-4 w-full">
              Passer commande
            </Link>
            <button
              type="button"
              onClick={closeCart}
              className="mt-3 w-full text-center text-xs uppercase tracking-[0.18em] text-cocoa hover:text-plum"
            >
              Continuer mes achats
            </button>
          </footer>
        )}
      </aside>
    </>
  );
}
