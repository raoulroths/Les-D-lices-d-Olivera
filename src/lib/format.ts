export const PHONE_DISPLAY = "07 10 05 69 94";
export const PHONE_TEL = "2250710056994";
export const STORE_NAME = "Les Délices de Olivera";
export const STORE_CITY = "Daloa, Côte d’Ivoire";
export const PAYMENT_METHODS = [
  "Espèces",
  "Orange Money",
  "MTN MoMo",
  "Wave",
] as const;

export function formatPrice(amount: number) {
  return `${new Intl.NumberFormat("fr-FR").format(amount)} F`;
}

export function formatDate(value: Date | string) {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export const FLAVOR_LABELS: Record<string, string> = {
  nature: "Nature lait",
  chocolat: "Chocolat",
  nutella: "Nutella",
  cerelac: "Céréalac",
  mixte: "Assortiment",
};

export const COLLECTION_LABELS: Record<string, string> = {
  packs: "Packs sucrés",
  evenements: "Événements",
  signature: "Signature",
};

export const OCCASIONS = [
  "Goûter",
  "Anniversaire",
  "Mariage",
  "Baptême",
  "Réunion de famille",
  "Bureau / équipe",
  "Autre",
] as const;

export function deliveryFeeFor(subtotal: number, deliveryType: string) {
  if (deliveryType !== "delivery") return 0;
  if (subtotal >= 5000) return 0;
  return 500;
}
