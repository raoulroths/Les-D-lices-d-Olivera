import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { StarRating } from "@/components/star-rating";
import { getFeaturedProducts } from "@/lib/catalog";
import { formatPrice, PHONE_DISPLAY, PHONE_TEL } from "@/lib/format";

export const dynamic = "force-dynamic";

const collections = [
  {
    flavor: "nature",
    title: "Nature lait",
    copy: "La pâte dorée, le parfum du lait, la simplicité qui rassemble.",
    image: "/images/nature.jpg",
    price: "dès 1 000 F",
  },
  {
    flavor: "chocolat",
    title: "Chocolat",
    copy: "Une nappe fondante, brillante, généreuse — le plaisir sans détour.",
    image: "/images/chocolat.jpg",
    price: "dès 1 500 F",
  },
  {
    flavor: "nutella",
    title: "Nutella",
    copy: "La star des commandes. Roulées, nappées, impossible à partager équitablement.",
    image: "/images/nutella.jpg",
    price: "dès 2 000 F",
  },
  {
    flavor: "cerelac",
    title: "Céréalac",
    copy: "La madeleine d’enfance, en crêpe moelleuse. Les enfants (et les parents) l’adorent.",
    image: "/images/cerelac.jpg",
    price: "dès 2 000 F",
  },
];

const steps = [
  { n: "01", t: "Choisissez", d: "Saveur, format, plateau événement — le menu est clair, les prix aussi." },
  { n: "02", t: "Commandez", d: "En ligne ou au 07 10 05 69 94. Paiement avant la livraison — Orange Money, MTN MoMo, Wave." },
  { n: "03", t: "Savourez", d: "Crêpes cuites minute, chaudes, prêtes pour la table ou la fête." },
];

export default async function HomePage() {
  const featured = await getFeaturedProducts();
  if (featured.length === 0 && process.env.NODE_ENV === "production") {
    // On Vercel Hobby build-time, production pre-render may run without DB;
    // dynamic requests will populate later. Show a static shell on first hit, but
    // since this page is force-dynamic, real requests always have the key set.
  }

  const highlights = [
    {
      author: "Léa O.",
      text: "Roulées, nappées, avec un raisin dessus. On se serait crus dans une boutique de Paris.",
      flavor: "Nutella",
    },
    {
      author: "Maman Aminata",
      text: "Le Céréalac sur crêpe, je n’avais jamais goûté aussi bien. Ma fille de 4 ans en a mangé trois.",
      flavor: "Céréalac",
    },
    {
      author: "Hôtesse Mariam",
      text: "Plateau magnifique, encore chaud. Olivera a géré le timing du baptême comme une pro.",
      flavor: "Événement",
    },
  ];

  return (
    <div>
      <section className="grain relative overflow-hidden bg-plum-deep text-cream">
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt="Crêpes nappées de Les Délices de Olivera"
            fill
            priority
            className="object-cover opacity-45"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-plum-deep via-plum-deep/85 to-plum/40" />
        </div>
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
          <div>
            <p className="fade-up text-xs uppercase tracking-[0.28em] text-gold">
              Crêpes sucrées · pour tous · pour chaque événement
            </p>
            <h1 className="fade-up delay-1 mt-4 font-script text-6xl leading-none text-magenta-soft sm:text-7xl lg:text-8xl">
              Les Délices de Olivera
            </h1>
            <p className="fade-up delay-2 mt-6 max-w-lg font-display text-2xl font-normal leading-snug text-cream/90 sm:text-3xl">
              Nature lait, chocolat, Nutella, Céréalac — cuites minute, nappées avec amour.
            </p>
            <div className="fade-up delay-3 mt-8 flex flex-wrap gap-3">
              <Link href="/boutique" className="btn-primary">
                Voir le menu
              </Link>
              <a href={`tel:${PHONE_TEL}`} className="btn-ghost">
                Appeler {PHONE_DISPLAY}
              </a>
            </div>
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-white/15 pt-6">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.18em] text-gold">Dès</dt>
                <dd className="font-display text-3xl">1 000 F</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.18em] text-gold">Saveurs</dt>
                <dd className="font-display text-3xl">4</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.18em] text-gold">Événements</dt>
                <dd className="font-display text-3xl">Oui</dd>
              </div>
            </dl>
          </div>
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.2rem] shadow-[0_40px_80px_rgba(0,0,0,0.35)] ring-1 ring-white/20">
              <Image
                src="/images/nutella.jpg"
                alt="Crêpes au Nutella"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 480px"
              />
            </div>
            <div className="absolute -bottom-6 -left-4 hidden rounded-3xl bg-ivory p-4 text-plum shadow-xl sm:block">
              <p className="text-[10px] uppercase tracking-[0.2em] text-magenta">Menu du jour</p>
              <p className="font-display text-xl">7 Nutella · {formatPrice(2000)}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-plum py-3 text-cream">
        <div className="marquee">
          <div className="marquee-track">
            {Array.from({ length: 2 }).map((_, loop) => (
              <div key={loop} className="flex items-center">
                {["Nature lait", "Chocolat", "Nutella", "Céréalac", "Anniversaires", "Mariages", "Goûters", "Livraison"].map(
                  (item) => (
                    <span
                      key={`${loop}-${item}`}
                      className="flex items-center gap-4 px-6 text-xs uppercase tracking-[0.28em]"
                    >
                      <span className="text-magenta-soft">♥</span>
                      {item}
                    </span>
                  ),
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-magenta">Collections</p>
            <h2 className="mt-2 font-display text-4xl text-plum sm:text-5xl">Toutes nos saveurs</h2>
          </div>
          <Link href="/boutique" className="text-xs uppercase tracking-[0.2em] text-cocoa hover:text-magenta">
            Toute la boutique →
          </Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((c) => (
            <Link
              key={c.flavor}
              href={`/boutique?saveur=${c.flavor}`}
              className="group relative overflow-hidden rounded-[1.8rem] bg-plum"
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-plum-deep via-plum/20 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5 text-cream">
                <p className="text-[10px] uppercase tracking-[0.2em] text-gold">{c.price}</p>
                <h3 className="font-display text-3xl">{c.title}</h3>
                <p className="mt-1 text-sm text-cream/80">{c.copy}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-magenta">Le menu</p>
              <h2 className="mt-2 font-display text-4xl sm:text-5xl">Coups de cœur</h2>
            </div>
            <p className="max-w-sm text-sm text-cocoa">
              Les packs du menu officiel — 5, 7 ou 10 crêpes — plus les plateaux pour vos fêtes.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.slice(0, 6).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] sm:aspect-[5/4]">
          <Image
            src="/images/artisan.jpg"
            alt="Olivera prépare les crêpes"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-magenta">La maison</p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl">Cuites minute, servies avec le cœur</h2>
          <p className="mt-5 text-base leading-relaxed text-cocoa">
            Derrière Les Délices de Olivera, une recette précise et une main généreuse. Pâte au lait,
            cuisson fine, nappage chocolat, Nutella ou Céréalac — jamais trop, jamais trop peu.
            On prépare pour le voisin comme pour le mariage de 80 personnes.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-plum">
            <li>— Ingrédients simples, goût sincère</li>
            <li>— Formats 5, 7, 10 crêpes et plateaux événements</li>
            <li>— Commande au {PHONE_DISPLAY} ou en ligne</li>
          </ul>
          <Link href="/a-propos" className="btn-primary mt-8">
            Notre histoire
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden bg-plum py-20 text-cream">
        <div className="absolute inset-0 opacity-30">
          <Image src="/images/evenement.jpg" alt="" fill className="object-cover" sizes="100vw" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.24em] text-gold">Événements</p>
            <h2 className="mt-2 font-display text-4xl sm:text-6xl">
              Anniversaires, mariages, goûters, bureaux…
            </h2>
            <p className="mt-5 text-cream/80">
              Plateaux de 20 ou 40 crêpes assorties, dressés pour la table, livrés à Daloa.
              Dites-nous l’heure, la saveur star, et le prénom à célébrer.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/evenements" className="btn-gold">
                Organiser un plateau
              </Link>
              <Link href="/boutique?collection=evenements" className="btn-ghost">
                Voir les formats
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <h2 className="text-center font-display text-4xl sm:text-5xl">Ils en parlent encore</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-cocoa">
          Avis de clients gourmands — familles, collèges, wedding planners.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {highlights.map((h) => (
            <blockquote
              key={h.author}
              className="rounded-[1.6rem] bg-white p-6 ring-1 ring-plum/10"
            >
              <StarRating value={5} size="md" />
              <p className="mt-4 font-display text-2xl font-normal leading-snug text-plum">
                « {h.text} »
              </p>
              <footer className="mt-5 text-sm text-cocoa">
                {h.author} · {h.flavor}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="border-t border-plum/10 bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n}>
              <p className="font-script text-4xl text-magenta">{s.n}</p>
              <h3 className="mt-2 font-display text-3xl">{s.t}</h3>
              <p className="mt-2 text-sm text-cocoa">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="overflow-hidden rounded-[2rem] bg-plum-deep px-6 py-12 text-center text-cream sm:px-12">
          <p className="font-script text-5xl text-magenta-soft">Envie de crêpes ce soir ?</p>
          <p className="mt-3 text-cream/75">
            Nature, chocolat, Nutella, Céréalac — on s’occupe du reste.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/boutique" className="btn-primary">
              Commander en ligne
            </Link>
            <a href={`tel:${PHONE_TEL}`} className="btn-ghost">
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
