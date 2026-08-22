import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { getProducts } from "@/lib/catalog";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Événements",
  description:
    "Plateaux de crêpes pour anniversaires, mariages, baptêmes, goûters d’école et afterworks.",
};

const occasions = [
  { t: "Anniversaires", d: "Le Nutella en tête d’affiche, Céréalac pour les plus petits." },
  { t: "Mariages & baptêmes", d: "Buffet sucré, dressage soigné, timing calé sur votre cérémonie." },
  { t: "Écoles & bureaux", d: "Grands volumes, prix clairs, livraison à l’heure de la pause." },
  { t: "Goûters & dimanches", d: "La box découverte pour que chacun trouve sa saveur." },
];

export default async function EventsPage() {
  const products = await getProducts();
  const eventProducts = products.filter((p) => p.collection === "evenements");

  return (
    <div>
      <section className="relative isolate overflow-hidden bg-plum-deep text-cream">
        <div className="absolute inset-0">
          <Image
            src="/images/evenement.jpg"
            alt="Plateau événement de crêpes"
            fill
            className="object-cover opacity-40"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-plum-deep via-plum-deep/80 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6">
          <p className="text-xs uppercase tracking-[0.24em] text-gold">Pour tous vos moments</p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl sm:text-7xl">
            Des crêpes pour l’événement, pas seulement pour le goûter.
          </h1>
          <p className="mt-5 max-w-xl text-cream/80">
            Plateaux de 20 ou 40 pièces, saveurs mixtes, nappage généreux. Olivera s’adapte à
            votre liste d’invités — et à votre budget.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/boutique?collection=evenements" className="btn-primary">
              Voir les plateaux
            </Link>
            <a href={`tel:${PHONE_TEL}`} className="btn-ghost">
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {occasions.map((o) => (
            <article key={o.t} className="rounded-[1.6rem] bg-white p-6 ring-1 ring-plum/10">
              <h2 className="font-display text-2xl">{o.t}</h2>
              <p className="mt-2 text-sm text-cocoa">{o.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-display text-4xl">Les formats fête</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {eventProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem]">
          <Image
            src="/images/celebration.jpg"
            alt="Table de fête"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-magenta">Comment ça se passe</p>
          <h2 className="mt-2 font-display text-4xl">On s’aligne sur votre horloge</h2>
          <ol className="mt-6 space-y-4 text-cocoa">
            <li>
              <strong className="text-plum">1. Le brief.</strong> Date, heure, nombre d’invités,
              saveur favorite.
            </li>
            <li>
              <strong className="text-plum">2. La confirmation.</strong> Un appel au {PHONE_DISPLAY}{" "}
              pour figer le plateau.
            </li>
            <li>
              <strong className="text-plum">3. La livraison chaude à Daloa.</strong> Dressage
              soigné, prêt à poser au centre de la table. Paiement avant la livraison.
            </li>
          </ol>
          <Link href="/checkout" className="btn-primary mt-8">
            Lancer une commande
          </Link>
        </div>
      </section>
    </div>
  );
}
