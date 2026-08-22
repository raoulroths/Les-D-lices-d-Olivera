import Link from "next/link";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { orderItems, orders } from "@/db/schema";
import { WhatsappOrderButton } from "@/components/whatsapp-order-button";
import { formatPrice, PHONE_DISPLAY, PHONE_TEL } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Commande confirmée",
};

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [order] = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
  if (!order) notFound();

  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, order.id));

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <p className="font-script text-5xl text-magenta">Merci gourmand</p>
      <h1 className="mt-2 font-display text-5xl text-plum">Commande reçue</h1>
      <p className="mt-4 text-cocoa">
        {order.customerName}, nous vous appelons au {order.phone} pour confirmer l’heure.
        Paiement à {order.deliveryType === "delivery" ? "la livraison" : "l’enlèvement"}.
      </p>
      <div className="mt-8 rounded-[1.8rem] bg-white p-6 ring-1 ring-plum/10">
        <p className="text-xs uppercase tracking-[0.2em] text-magenta">
          N° {order.id.slice(0, 8).toUpperCase()}
        </p>
        <ul className="mt-4 divide-y divide-plum/10">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between py-3 text-sm">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>{formatPrice(item.unitPrice * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between font-display text-2xl">
          <span>Total</span>
          <span>{formatPrice(order.total)}</span>
        </div>
        <p className="mt-4 text-sm text-cocoa">
          Paiement {order.paymentMethod}{" "}
          {order.deliveryType === "delivery" ? "avant la livraison à Daloa" : "à l’enlèvement"}.
        </p>
        {order.notes ? (
          <p className="mt-2 text-sm text-cocoa">Note : {order.notes}</p>
        ) : null}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <WhatsappOrderButton
          customerName={order.customerName}
          phone={order.phone}
          orderNumber={order.id.slice(0, 8).toUpperCase()}
          items={items.map((i) => ({
            name: i.name,
            quantity: i.quantity,
            unitPrice: i.unitPrice,
          }))}
          total={order.total}
          deliveryType={order.deliveryType}
          address={order.address}
          city={order.city}
          notes={order.notes}
        />
        <a href={`tel:${PHONE_TEL}`} className="btn-gold">
          Appeler · {PHONE_DISPLAY}
        </a>
        <Link
          href="/boutique"
          className="rounded-full border border-plum/15 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-plum hover:border-magenta hover:text-magenta"
        >
          Continuer à flâner
        </Link>
      </div>
    </div>
  );
}
