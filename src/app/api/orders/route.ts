import { NextResponse } from "next/server";
import { db } from "@/db";
import { orderItems, orders, products } from "@/db/schema";
import { deliveryFeeFor, PAYMENT_METHODS } from "@/lib/format";
import { ensureSeeded } from "@/db/seed";

type IncomingItem = {
  productId?: string;
  name?: string;
  quantity?: number;
  unitPrice?: number;
  image?: string;
};

export async function POST(request: Request) {
  await ensureSeeded();

  let body: {
    customerName?: string;
    phone?: string;
    email?: string;
    address?: string;
    city?: string;
    notes?: string;
    occasion?: string;
    deliveryType?: string;
    paymentMethod?: string;
    items?: IncomingItem[];
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const customerName = String(body.customerName ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const deliveryType = body.deliveryType === "pickup" ? "pickup" : "delivery";
  const paymentMethod = (PAYMENT_METHODS as readonly string[]).includes(
    String(body.paymentMethod ?? ""),
  )
    ? String(body.paymentMethod)
    : "Espèces";
  const items = Array.isArray(body.items) ? body.items : [];

  if (!customerName || !phone || items.length === 0) {
    return NextResponse.json(
      { error: "Nom, téléphone et au moins un article sont requis." },
      { status: 400 },
    );
  }

  if (deliveryType === "delivery" && !String(body.address ?? "").trim()) {
    return NextResponse.json(
      { error: "L’adresse est requise pour la livraison." },
      { status: 400 },
    );
  }

  const existingIds = new Set(
    (await db.select({ id: products.id }).from(products)).map((row) => row.id),
  );

  const prepared = items
    .map((item) => ({
      productId:
        item.productId && existingIds.has(item.productId) ? item.productId : null,
      name: String(item.name ?? "").trim(),
      quantity: Math.max(1, Math.min(99, Number(item.quantity) || 1)),
      unitPrice: Math.max(0, Math.round(Number(item.unitPrice) || 0)),
      image: item.image ?? null,
    }))
    .filter((item) => item.name && item.unitPrice > 0);

  if (!prepared.length) {
    return NextResponse.json({ error: "Panier invalide." }, { status: 400 });
  }

  const subtotal = prepared.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const deliveryFee = deliveryFeeFor(subtotal, deliveryType);
  const total = subtotal + deliveryFee;

  const [order] = await db
    .insert(orders)
    .values({
      customerName,
      phone,
      email: String(body.email ?? "").trim() || null,
      address: String(body.address ?? "").trim() || null,
      city: String(body.city ?? "").trim() || null,
      notes: String(body.notes ?? "").trim() || null,
      occasion: String(body.occasion ?? "").trim() || null,
      deliveryType,
      paymentMethod,
      subtotal,
      deliveryFee,
      total,
      status: "pending",
    })
    .returning();

  await db.insert(orderItems).values(
    prepared.map((item) => ({
      orderId: order.id,
      productId: item.productId,
      name: item.name,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      image: item.image,
    })),
  );

  return NextResponse.json({ id: order.id, total: order.total });
}
