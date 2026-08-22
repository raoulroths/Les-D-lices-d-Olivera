import { PHONE_DISPLAY, PHONE_TEL, STORE_NAME } from "@/lib/format";

export const WHATSAPP_ORDER =
  `https://wa.me/${PHONE_TEL}?text=${encodeURIComponent(
    `Bonjour ${STORE_NAME} 👋 Je souhaite commander des crêpes. Merci de me dire les disponibilités.`,
  )}`;

export function whatsappShareUrl(text: string) {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

export function facebookShareUrl(url: string) {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
}

export const PITCH_MESSAGES = {
  entreprise: `Bonjour Olivera 👋

Je vous ai préparé une boutique en ligne pour Les Délices de Olivera (Daloa, Côte d’Ivoire).

On y retrouve votre menu officiel :
• Nature lait (5 = 1 000 F / 10 = 2 000 F)
• Chocolat (7 = 1 500 F / 10 = 2 000 F)
• Nutella (7 = 2 000 F / 10 = 2 500 F)
• Céréalac (7 = 2 000 F / 10 = 2 500 F)
• Plateaux événements

Les clients voient les photos, choisissent, commandent, et vous les rappelez au ${PHONE_DISPLAY}.
Paiement avant la livraison : Orange Money, MTN MoMo ou Wave.

Je vous envoie le lien pour que vous cliquiez comme un client.`,

  client: `Les Délices de Olivera 🥞💜 — Daloa, Côte d’Ivoire
Crêpes sucrées : nature, chocolat, Nutella, Céréalac.
Commande en ligne ou au ${PHONE_DISPLAY}.
Livraison à Daloa · paiement avant la livraison (Orange Money, MTN MoMo, Wave).
Pour le goûter, l’anniversaire, le bureau, la fête.`,

  statut: `Crêpes chaudes aujourd’hui 🥞 — Daloa
Nature · Chocolat · Nutella · Céréalac
Commandez ici ou appelez le ${PHONE_DISPLAY}
Paiement avant la livraison 💜`,

  instagram: `Les Délices de Olivera — crêpes sucrées artisanales 🥞
Nature lait, chocolat, Nutella, Céréalac.
Pour tous. Pour chaque événement.
Commande : ${PHONE_DISPLAY}
#LesDelicesDeOlivera #Crepes #Nutella #Cerelac`,
};

export function productShareText(name: string, priceLabel: string, url: string) {
  return `${name} — ${priceLabel} chez ${STORE_NAME} 🥞\nCommande au ${PHONE_DISPLAY}\n${url}`;
}
