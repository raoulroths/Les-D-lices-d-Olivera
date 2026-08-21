"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import { useCart } from "@/context/cart-context";
import {
  deliveryFeeFor,
  FLAVOR_LABELS,
  formatPrice,
  OCCASIONS,
  PAYMENT_METHODS,
  PHONE_DISPLAY,
  PHONE_TEL,
  STORE_CITY,
} from "@/lib/format";

export function CheckoutForm() {
  const router = useRouter();
  const { items, subtotal, clear } = useCart();
  const [deliveryType, setDeliveryType] = useState<"pickup" | "delivery">("delivery");
  const [paymentMethod, setPaymentMethod] = useState<string>("Espèces");
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [error, setError] = useState("");

  const deliveryFee = useMemo(
    () => deliveryFeeFor(subtotal, deliveryType),
    [subtotal, deliveryType],
  );
  const total = subtotal + deliveryFee;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!items.length) return;
    const form = new FormData(e.currentTarget);
    setStatus("saving");
    setError("");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.get("customerName"),
          phone: form.get("phone"),
          email: form.get("email"),
          address: form.get("address"),
          city: form.get("city"),
          notes: form.get("notes"),
          occasion: form.get("occasion"),
          deliveryType,
          paymentMethod,
          items: items.map((i) => ({
            productId: i.productId,
            name: i.name,
            quantity: i.quantity,
            unitPrice: i.price,
            image: i.image,
          })),
        }),
      });
      const data = (await res.json()) as { id?: string; error?: string };
      if (!res.ok || !data.id) throw new Error(data.error || "fail");
      clear();
      router.push(`/commande/${data.id}`);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Commande impossible");
    }
  }

  if (items.length === 0) {
    return (
      <div className="rounded-[2rem] bg-white p-10 text-center ring-1 ring-plum/10">
        <h1 className="font-display text-4xl text-plum">Votre panier est vide</h1>
        <p className="mt-3 text-cocoa">Ajoutez quelques crêpes avant de passer commande.</p>
        <Link href="/boutique" className="btn-primary mt-6 inline-flex">
          Retour à la boutique
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-8">
        <section className="rounded-[1.8rem] bg-white p-6 ring-1 ring-plum/10 sm:p-8">
          <p className="text-xs uppercase tracking-[0.22em] text-magenta">Coordonnées</p>
          <h2 className="mt-2 font-display text-3xl text-plum">Qui savoure ?</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="sm:col-span-2">
              <span className="label">Nom complet</span>
              <input name="customerName" required className="field mt-1" placeholder="Olivera" />
            </label>
            <label>
              <span className="label">Téléphone</span>
              <input name="phone" required className="field mt-1" placeholder={PHONE_DISPLAY} />
            </label>
            <label>
              <span className="label">Email (optionnel)</span>
              <input name="email" type="email" className="field mt-1" placeholder="vous@email.com" />
            </label>
            <label className="sm:col-span-2">
              <span className="label">Occasion</span>
              <select name="occasion" className="field mt-1">
                {OCCASIONS.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>
          </div>
        </section>

        <section className="rounded-[1.8rem] bg-white p-6 ring-1 ring-plum/10 sm:p-8">
          <p className="text-xs uppercase tracking-[0.22em] text-magenta">Livraison — {STORE_CITY}</p>
          <h2 className="mt-2 font-display text-3xl text-plum">Où envoyer les crêpes ?</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setDeliveryType("delivery")}
              className={`rounded-2xl border p-4 text-left transition ${
                deliveryType === "delivery"
                  ? "border-magenta bg-magenta/5"
                  : "border-plum/10 hover:border-plum/30"
              }`}
            >
              <p className="font-display text-xl text-plum">Livraison à Daloa</p>
              <p className="text-sm text-cocoa">500 F · offerte dès 5 000 F</p>
            </button>
            <button
              type="button"
              onClick={() => setDeliveryType("pickup")}
              className={`rounded-2xl border p-4 text-left transition ${
                deliveryType === "pickup"
                  ? "border-magenta bg-magenta/5"
                  : "border-plum/10 hover:border-plum/30"
              }`}
            >
              <p className="font-display text-xl text-plum">À emporter</p>
              <p className="text-sm text-cocoa">Prêt à l’heure convenue</p>
            </button>
          </div>
          {deliveryType === "delivery" && (
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="sm:col-span-2">
                <span className="label">Adresse</span>
                <input name="address" required className="field mt-1" placeholder="Quartier, rue, précisions" />
              </label>
              <label className="sm:col-span-2">
                <span className="label">Ville / commune</span>
                <input name="city" required className="field mt-1" placeholder="Votre ville" />
              </label>
            </div>
          )}
          <div className="mt-5">
            <p className="label">Paiement avant la livraison</p>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {PAYMENT_METHODS.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setPaymentMethod(m)}
                  className={`rounded-xl border px-3 py-2 text-xs transition ${
                    paymentMethod === m
                      ? "border-magenta bg-magenta/5 font-semibold text-plum"
                      : "border-plum/10 text-cocoa hover:border-plum/30"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          <label className="mt-5 block">
            <span className="label">Notes pour Olivera</span>
            <textarea
              name="notes"
              rows={3}
              className="field mt-1 resize-none"
              placeholder="Allergies, heure souhaitée, message sur le plateau…"
            />
          </label>
        </section>
      </div>

      <aside className="h-fit rounded-[1.8rem] bg-plum p-6 text-cream sm:p-8 lg:sticky lg:top-28">
        <p className="font-script text-4xl text-magenta-soft">Récapitulatif</p>
        <ul className="mt-6 space-y-4">
          {items.map((item) => (
            <li key={item.productId} className="flex gap-3">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                <Image src={item.image} alt="" fill className="object-cover" sizes="64px" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{item.name}</p>
                <p className="text-xs text-cream/60">
                  {FLAVOR_LABELS[item.flavor]} · ×{item.quantity}
                </p>
              </div>
              <p className="text-sm">{formatPrice(item.price * item.quantity)}</p>
            </li>
          ))}
        </ul>
        <dl className="mt-6 space-y-2 border-t border-white/15 pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-cream/70">Sous-total</dt>
            <dd>{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-cream/70">Livraison</dt>
            <dd>{deliveryFee === 0 ? "Offerte" : formatPrice(deliveryFee)}</dd>
          </div>
          <div className="flex justify-between font-display text-2xl">
            <dt>Total</dt>
            <dd>{formatPrice(total)}</dd>
          </div>
        </dl>
        <p className="mt-4 text-xs leading-relaxed text-cream/65">
          Paiement {paymentMethod} avant la livraison : Olivera vous rappelle pour confirmer,
          puis vous effectuez le paiement. Téléphone : {PHONE_DISPLAY}.
        </p>
        <button type="submit" className="btn-gold mt-6 w-full" disabled={status === "saving"}>
          {status === "saving" ? "Envoi de la commande…" : "Confirmer la commande"}
        </button>
        {status === "error" && (
          <p className="mt-3 text-sm text-gold">{error || "Une erreur est survenue."}</p>
        )}
        <a href={`tel:${PHONE_TEL}`} className="mt-4 block text-center text-xs uppercase tracking-[0.18em] text-gold">
          Ou appeler {PHONE_DISPLAY}
        </a>
      </aside>
    </form>
  );
}
