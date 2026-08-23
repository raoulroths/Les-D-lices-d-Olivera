import { PHONE_TEL } from "@/lib/format";

export function WhatsappOrderButton({
  customerName,
  phone,
  items,
  total,
  orderNumber,
  deliveryType,
  address,
  city,
  notes,
}: {
  customerName: string;
  phone: string;
  items: { name: string; quantity: number; unitPrice: number }[];
  total: number;
  orderNumber: string;
  deliveryType: string;
  address?: string | null;
  city?: string | null;
  notes?: string | null;
}) {
  const lines: string[] = [];
  lines.push("Bonjour Les Délices de Olivera 👋");
  lines.push(`Voici ma commande n° ${orderNumber}.`);
  lines.push("");
  lines.push(`Nom : ${customerName}`);
  lines.push(`Téléphone : ${phone}`);
  lines.push(
    `Mode : ${deliveryType === "delivery" ? "Livraison à Daloa" : "À emporter"}`,
  );
  if (deliveryType === "delivery") {
    lines.push(
      `Adresse : ${address?.trim() || "(à préciser)"}${
        city?.trim() ? `, ${city.trim()}` : ""
      }`,
    );
  }
  lines.push("");
  lines.push("Crêpes commandées :");
  for (const item of items) {
    const sub = item.unitPrice * item.quantity;
    lines.push(`• ${item.name} × ${item.quantity} → ${sub.toLocaleString("fr-FR")} F`);
  }
  lines.push("");
  lines.push(`Total : ${total.toLocaleString("fr-FR")} F`);
  if (notes?.trim()) lines.push(`Note : ${notes.trim()}`);
  lines.push("");
  lines.push("Merci de confirmer l’heure 🙏");

  const message = lines.join("\n");
  // WhatsApp international: "+225" + le numéro (sans le 0 au début du numéro Ivoirien).
  // Le numéro d'Olivera est 07 10 05 69 94 → 225 0710056994.
  const whatsappNumber = PHONE_TEL;
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white shadow-[0_12px_30px_rgba(37,211,102,0.35)] transition hover:brightness-105"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
        <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.4 5L2 22l5.2-1.4c1.4.8 3 1.3 4.8 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2Zm4.9 14.3c-.2.6-1.3 1.2-1.8 1.2-.5.1-1.1.1-1.8-.1-.4-.1-.9-.3-1.6-.6-2.8-1.2-4.7-4.1-4.8-4.3-.1-.2-1.1-1.5-1.1-2.9 0-1.4.7-2.1 1-2.4.2-.2.6-.4 1-.4h.3c.1 0 .2 0 .3.2.1.2.4 1.3.5 1.4.1.1.1.3 0 .5-.1.2-.1.3-.3.5l-.4.5c-.1.2-.3.3-.1.6.2.3.8 1.3 1.6 2.1 1.1 1 2 1.3 2.3 1.4.3.2.5.1.7-.1.2-.2.8-.9 1-1.2.2-.3.4-.3.7-.2.3.1 1.8.8 2.1 1 .3.2.5.3.6.4.1.1.1.8-.1 1.4Z" />
      </svg>
      Envoyer la commande sur WhatsApp
    </a>
  );
}
