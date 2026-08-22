import Image from "next/image";
import Link from "next/link";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/format";

export const metadata = {
  title: "À propos",
  description:
    "L’histoire de Les Délices de Olivera — crêpes sucrées artisanales, nature, chocolat, Nutella et Céréalac.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-magenta">La maison</p>
          <h1 className="mt-3 font-script text-6xl text-magenta sm:text-7xl">Olivera</h1>
          <p className="mt-4 font-display text-3xl leading-snug text-plum">
            Une poêle chaude, une pâte au lait, et l’envie de faire plaisir à tout le monde.
          </p>
          <p className="mt-6 text-base leading-relaxed text-cocoa">
            Les Délices de Olivera est né d’une recette de crêpes sucrées que l’on n’arrêtait pas
            de demander — d’abord pour la famille, puis pour le quartier, puis pour les fêtes.
            Nature lait pour les purs, chocolat pour les gourmands, Nutella pour les indécis,
            Céréalac pour l’enfance qui ne nous quitte jamais.
          </p>
          <p className="mt-4 text-base leading-relaxed text-cocoa">
            Chaque commande est cuite minute. Pas de stock endormi, pas de nappage avare. Que vous
            preniez cinq crêpes nature à 1 000 F ou un plateau de quarante pour un mariage, la
            main reste la même.
          </p>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
          <Image
            src="/images/artisan.jpg"
            alt="Préparation des crêpes"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-3">
          {[
            {
              t: "Pâte lactée",
              d: "Farine, lait, œufs, beurre, vanille. Fine, souple, jamais caoutchouteuse.",
            },
            {
              t: "Quatre saveurs",
              d: "Nature, chocolat fondant, Nutella, Céréalac — le menu que tout le monde connaît maintenant.",
            },
            {
              t: "Pour tous",
              d: "Goûter du mercredi, afterwork, baptême. On ajuste le format, pas la générosité.",
            },
          ].map((item) => (
            <article key={item.t}>
              <h2 className="font-display text-3xl">{item.t}</h2>
              <p className="mt-2 text-sm text-cocoa">{item.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {["/images/nature.jpg", "/images/chocolat.jpg", "/images/cerelac.jpg"].map((src) => (
            <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-[1.6rem]">
              <Image src={src} alt="" fill className="object-cover" sizes="33vw" />
            </div>
          ))}
        </div>
        <div className="mt-12 rounded-[2rem] bg-plum px-6 py-12 text-center text-cream sm:px-12">
          <p className="font-script text-5xl text-magenta-soft">On se parle ?</p>
          <p className="mt-3 text-cream/75">
            Commandes, événements, questions de nappage — Olivera répond au {PHONE_DISPLAY}.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={`tel:${PHONE_TEL}`} className="btn-gold">
              Appeler maintenant
            </a>
            <Link href="/boutique" className="btn-primary">
              Voir les crêpes
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
