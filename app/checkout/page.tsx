import { CheckoutForm } from "@/components/checkout-form";

export const metadata = {
  title: "Commande",
  description: "Finalisez votre commande de crêpes Les Délices de Olivera.",
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <p className="text-xs uppercase tracking-[0.24em] text-magenta">Presque prêt</p>
      <h1 className="mt-2 font-display text-5xl">Checkout</h1>
      <p className="mt-3 max-w-xl text-cocoa">
        Une dernière étape. Nous confirmons chaque commande par téléphone — paiement à la
        livraison ou à l’enlèvement.
      </p>
      <div className="mt-10">
        <CheckoutForm />
      </div>
    </div>
  );
}
