import Link from "next/link";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { orderItems, orders } from "@/db/schema";
import { formatPrice } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata = { title: "Suivi des commandes" };

const ADMIN_CODE = process.env.NEXT_PUBLIC_ADMIN_CODE ?? "olivera";

export default async function CommandesPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const { code } = await searchParams;

  if (code !== ADMIN_CODE) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <p className="font-script text-5xl text-magenta">Espace Olivera</p>
        <h1 className="mt-2 font-display text-4xl text-plum">Suivi des commandes</h1>
        <p className="mt-3 text-cocoa">
          Cette page est réservée à la boutique. Entrez le code remis à Olivera pour voir les
          commandes reçues.
        </p>
        <form method="GET" action="/commandes" className="mt-6 space-y-3">
          <input type="password" name="code" className="field" placeholder="Code" required />
          <button type="submit" className="btn-primary w-full">
            Ouvrir
          </button>
        </form>
      </div>
    );
  }

  const [orderList, allItems] = await Promise.all([
    db.select().from(orders).orderBy(desc(orders.createdAt)),
    db.select().from(orderItems),
  ]);

  const itemsByOrder = new Map<string, typeof allItems>();
  for (const item of allItems) {
    const list = itemsByOrder.get(item.orderId) ?? [];
    list.push(item);
    itemsByOrder.set(item.orderId, list);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs uppercase tracking-[0.24em] text-magenta">Espace Olivera</p>
      <h1 className="mt-2 font-display text-5xl text-plum">Commandes reçues</h1>
      <p className="mt-3 max-w-xl text-cocoa">
        Tout ce qui arrive en ligne, plus récent en premier. Gardez cette page en favori dans
        Safari pour la retrouver d’un geste.
      </p>

      {orderList.length === 0 ? (
        <p className="mt-10 rounded-[1.6rem] bg-white p-10 text-center text-cocoa ring-1 ring-plum/10">
          Pas encore de commande en ligne. Dès qu’un client commande sur le site, elle apparaît
          ici.
        </p>
      ) : (
        <ul className="mt-10 space-y-5">
          {orderList.map((order) => {
            const items = itemsByOrder.get(order.id) ?? [];
            const when = new Intl.DateTimeFormat("fr-FR", {
              day: "numeric",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            }).format(new Date(order.createdAt));

            return (
              <li key={order.id} className="rounded-[1.6rem] bg-white p-6 ring-1 ring-plum/10">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs uppercase tracking-[0.16em] text-cocoa">{when}</p>
                  <p className="font-display text-3xl text-plum">{formatPrice(order.total)}</p>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <p className="font-display text-2xl text-plum">{order.customerName}</p>
                  <a
                    href={`tel:${order.phone}`}
                    className="rounded-full bg-plum px-3 py-1 text-xs uppercase tracking-[0.12em] text-cream"
                  >
                    Appeler · {order.phone}
                  </a>
                </div>
                <p className="mt-2 text-sm text-cocoa">
                  {order.deliveryType === "delivery"
                    ? `Livraison à Daloa — ${order.address ?? ""} ${order.city ?? ""}`.trim()
                    : "À emporter"}
                  {" · "}Paiement {order.paymentMethod}
                  {order.occasion ? ` · ${order.occasion}` : ""}
                </p>
                <ul className="mt-3 border-t border-plum/10 pt-3 text-sm text-cocoa">
                  {items.map((item) => (
                    <li key={item.id} className="flex justify-between py-1">
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span>{formatPrice(item.unitPrice * item.quantity)}</span>
                    </li>
                  ))}
                </ul>
                {order.notes ? (
                  <p className="mt-3 text-sm text-cocoa">Note : {order.notes}</p>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}

      <Link
        href="/boutique"
        className="mt-10 inline-block text-xs uppercase tracking-[0.18em] text-magenta hover:text-plum"
      >
        ← Retour à la boutique
      </Link>
    </div>
  );
}
