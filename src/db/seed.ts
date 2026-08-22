import { sql } from "drizzle-orm";
import { db } from "@/db";
import { products, reviews } from "@/db/schema";
import { ensureSchema } from "./bootstrap";

const catalog = [
  {
    slug: "pack-5-crepes-nature",
    name: "5 Crêpes Nature",
    flavor: "nature",
    collection: "packs",
    packSize: 5,
    price: 1000,
    compareAtPrice: null,
    shortDescription:
      "Cinq crêpes dorées, tendres et parfumées au lait — la douceur simple qui plaît à tous.",
    description:
      "Notre recette nature est le cœur de Les Délices de Olivera : une pâte onctueuse au lait, cuite minute jusqu’à obtenir un blond doré. Sans garniture trop sucrée, elle laisse parler le beurre et la vanille. Idéale pour un goûter, un petit-déjeuner gourmand ou pour accompagner un verre de lait. Servies chaudes, pliées avec soin.",
    ingredients:
      "Farine de blé, lait frais, œufs, beurre, sucre, vanille, pincée de sel.",
    image: "/images/nature.jpg",
    images: ["/images/nature.jpg", "/images/nature-2.jpg", "/images/artisan.jpg"],
    featured: true,
    inStock: true,
    badge: "Essentiel",
  },
  {
    slug: "pack-10-crepes-nature",
    name: "10 Crêpes Nature",
    flavor: "nature",
    collection: "packs",
    packSize: 10,
    price: 2000,
    compareAtPrice: null,
    shortDescription:
      "Le format famille : dix crêpes nature au lait, parfaites à partager autour de la table.",
    description:
      "Deux fois plus de bonheur, le même goût maison. Ce pack de dix crêpes nature convient aux familles, aux réunions du dimanche et aux envies de se resservir. La pâte reste légère, jamais caoutchouteuse, avec une légère note lactée. À savourer telles quelles ou à garnir chez vous.",
    ingredients:
      "Farine de blé, lait frais, œufs, beurre, sucre, vanille, pincée de sel.",
    image: "/images/nature-2.jpg",
    images: ["/images/nature-2.jpg", "/images/nature.jpg", "/images/hero.jpg"],
    featured: false,
    inStock: true,
    badge: null,
  },
  {
    slug: "pack-7-crepes-chocolat",
    name: "7 Crêpes au Chocolat",
    flavor: "chocolat",
    collection: "packs",
    packSize: 7,
    price: 1500,
    compareAtPrice: null,
    shortDescription:
      "Sept crêpes nappées d’un chocolat fondant et brillant, pour les vraies gourmandes et gourmands.",
    description:
      "Une pluie de chocolat chaud sur des crêpes encore tièdes : voilà notre recette fétiche. Le cacao enrobe chaque pli sans noyer la pâte. Texture fondante, amertume délicate, finish irrésistible. Le format 7 pièces est pensé pour un goûter copieux ou un dessert à plusieurs.",
    ingredients:
      "Farine, lait, œufs, beurre, sucre, cacao, chocolat fondant, vanille.",
    image: "/images/chocolat.jpg",
    images: [
      "/images/chocolat.jpg",
      "/images/chocolat-2.jpg",
      "/images/box.jpg",
    ],
    featured: true,
    inStock: true,
    badge: "Gourmand",
  },
  {
    slug: "pack-10-crepes-chocolat",
    name: "10 Crêpes au Chocolat",
    flavor: "chocolat",
    collection: "packs",
    packSize: 10,
    price: 2000,
    compareAtPrice: 2200,
    shortDescription:
      "Le meilleur rapport plaisir-prix : dix crêpes au chocolat pour les grandes tablées.",
    description:
      "Quand le chocolat doit suffire à tout le monde, ce pack s’impose. Dix crêpes généreusement nappées, brillantes, prêtes à être dévorées. Idéal pour un after-school, une soirée film ou un buffet sucré. Un vrai avantage par pièce par rapport au format 7.",
    ingredients:
      "Farine, lait, œufs, beurre, sucre, cacao, chocolat fondant, vanille.",
    image: "/images/chocolat-2.jpg",
    images: [
      "/images/chocolat-2.jpg",
      "/images/chocolat.jpg",
      "/images/hero.jpg",
    ],
    featured: true,
    inStock: true,
    badge: "Meilleur prix",
  },
  {
    slug: "pack-7-crepes-nutella",
    name: "7 Crêpes au Nutella",
    flavor: "nutella",
    collection: "packs",
    packSize: 7,
    price: 2000,
    compareAtPrice: null,
    shortDescription:
      "La star des commandes : crêpes roulées, généreusement tartinées de pâte noisettes-cacao.",
    description:
      "On ne plaisante pas avec le Nutella chez Olivera. Chaque crêpe est roulée puis nappée d’une coulée crémeuse de pâte à tartiner noisettes-cacao, parfois relevée de raisins frais ou d’éclats de noisettes. Un classique indémodable, demandé pour les anniversaires comme pour les envies du soir.",
    ingredients:
      "Farine, lait, œufs, beurre, sucre, pâte à tartiner noisettes-cacao, noisettes.",
    image: "/images/nutella.jpg",
    images: ["/images/nutella.jpg", "/images/box.jpg", "/images/hero.jpg"],
    featured: true,
    inStock: true,
    badge: "Le plus demandé",
  },
  {
    slug: "pack-10-crepes-nutella",
    name: "10 Crêpes au Nutella",
    flavor: "nutella",
    collection: "packs",
    packSize: 10,
    price: 2500,
    compareAtPrice: 2800,
    shortDescription:
      "Dix crêpes Nutella pour les grandes faims et les belles occasions — on n’en jette jamais.",
    description:
      "Le format fête de notre recette signature. Dix crêpes, une nappe généreuse de Nutella, le parfum des noisettes grillées. Parfait pour un anniversaire d’enfant, un pique-nique chic ou un brunch du dimanche. Livré chaud, prêt à servir.",
    ingredients:
      "Farine, lait, œufs, beurre, sucre, pâte à tartiner noisettes-cacao, noisettes.",
    image: "/images/box.jpg",
    images: ["/images/box.jpg", "/images/nutella.jpg", "/images/evenement.jpg"],
    featured: true,
    inStock: true,
    badge: "Favori",
  },
  {
    slug: "pack-7-crepes-cerelac",
    name: "7 Crêpes au Céréalac",
    flavor: "cerelac",
    collection: "packs",
    packSize: 7,
    price: 2000,
    compareAtPrice: null,
    shortDescription:
      "La madeleine de Proust africaine : crêpes moelleuses saupoudrées de Céréalac au lait.",
    description:
      "Une saveur d’enfance, élevée en dessert. Nos crêpes au Céréalac mêlent la pâte lactée à la céréale infantile légèrement vanillée, pour un goût unique, réconfortant et très demandé. Texture fondante, parfum de lait concentré et de blé torréfié. Adorée des enfants… et des parents qui se resservent.",
    ingredients:
      "Farine, lait, œufs, beurre, sucre, céréales infantiles au lait (Céréalac), vanille.",
    image: "/images/cerelac.jpg",
    images: ["/images/cerelac.jpg", "/images/nature.jpg", "/images/nature-2.jpg"],
    featured: true,
    inStock: true,
    badge: "Enfance",
  },
  {
    slug: "pack-10-crepes-cerelac",
    name: "10 Crêpes au Céréalac",
    flavor: "cerelac",
    collection: "packs",
    packSize: 10,
    price: 2500,
    compareAtPrice: null,
    shortDescription:
      "Le grand format Céréalac — dix crêpes douces, parfumées, parfaites pour un goûter de classe.",
    description:
      "Pour les fêtes d’école, les naissances et les dimanches en famille, le pack de dix Céréalac fait l’unanimité. Moelleux, généreux, légèrement sucré. Une spécialité maison que l’on ne trouve pas ailleurs avec autant de cœur.",
    ingredients:
      "Farine, lait, œufs, beurre, sucre, céréales infantiles au lait (Céréalac), vanille.",
    image: "/images/cerelac.jpg",
    images: ["/images/cerelac.jpg", "/images/hero.jpg", "/images/nature.jpg"],
    featured: false,
    inStock: true,
    badge: null,
  },
  {
    slug: "box-decouverte-4-saveurs",
    name: "Box Découverte 4 saveurs",
    flavor: "mixte",
    collection: "signature",
    packSize: 8,
    price: 2200,
    compareAtPrice: null,
    shortDescription:
      "Deux crêpes de chaque : nature, chocolat, Nutella et Céréalac. Pour hésiter… puis tout aimer.",
    description:
      "Vous ne savez pas par quelle saveur commencer ? La box découverte réunit les quatre signatures d’Olivera : nature lait, chocolat fondant, Nutella et Céréalac. Huit crêpes, quatre voyages. Idéale en cadeau, pour un premier ordre, ou pour un pique-nique gourmand.",
    ingredients:
      "Farine, lait, œufs, beurre, sucre, cacao, pâte noisettes-cacao, Céréalac, vanille.",
    image: "/images/hero.jpg",
    images: [
      "/images/hero.jpg",
      "/images/nutella.jpg",
      "/images/chocolat.jpg",
      "/images/cerelac.jpg",
    ],
    featured: true,
    inStock: true,
    badge: "Signature",
  },
  {
    slug: "plateau-evenement-20",
    name: "Plateau Événement — 20 crêpes",
    flavor: "mixte",
    collection: "evenements",
    packSize: 20,
    price: 4500,
    compareAtPrice: 5000,
    shortDescription:
      "Un plateau assorti de 20 crêpes pour anniversaires, réunions et fêtes — prêt à impressionner.",
    description:
      "Olivera se déplace aussi dans vos fêtes. Ce plateau de 20 crêpes mélange nature, chocolat, Nutella et Céréalac, dressé pour être posé au centre de la table. Quantités ajustables, présentation soignée, service chaud. Pour les baptêmes, les after-works et les goûters d’enfants.",
    ingredients:
      "Farine, lait, œufs, beurre, sucre, cacao, Nutella, Céréalac, garnitures de saison.",
    image: "/images/evenement.jpg",
    images: [
      "/images/evenement.jpg",
      "/images/celebration.jpg",
      "/images/hero.jpg",
      "/images/box.jpg",
    ],
    featured: true,
    inStock: true,
    badge: "Événement",
  },
  {
    slug: "grande-fete-40",
    name: "Grande Fête — 40 crêpes",
    flavor: "mixte",
    collection: "evenements",
    packSize: 40,
    price: 8500,
    compareAtPrice: 9500,
    shortDescription:
      "Le format réception : quarante crêpes assorties pour mariages, collèges et grandes familles.",
    description:
      "Quand la liste d’invités s’allonge, ce plateau XXL prend le relais. 40 crêpes sucrées, saveurs mixtes selon vos souhaits, livrées en bacs prêts à servir. Nous pouvons inscrire un prénom, adapter le ratio Nutella / Céréalac, et synchroniser l’heure de livraison avec votre événement.",
    ingredients:
      "Farine, lait, œufs, beurre, sucre, cacao, Nutella, Céréalac, fruits de saison.",
    image: "/images/celebration.jpg",
    images: [
      "/images/celebration.jpg",
      "/images/evenement.jpg",
      "/images/hero.jpg",
    ],
    featured: false,
    inStock: true,
    badge: "Réception",
  },
  {
    slug: "mini-pack-enfant-cerelac",
    name: "Mini pack enfant Céréalac",
    flavor: "cerelac",
    collection: "signature",
    packSize: 4,
    price: 900,
    compareAtPrice: null,
    shortDescription:
      "Quatre petites crêpes au Céréalac, portion enfant — douceur, lait, et sourire garanti.",
    description:
      "Une portion pensée pour les plus petits (et les envies légères). Quatre crêpes au Céréalac, moins sucrées, moelleuses, faciles à tenir. Parfaites dans une lunch box, pour un goûter d’école ou une récompense du mercredi.",
    ingredients:
      "Farine, lait, œufs, beurre, un soupçon de sucre, Céréalac au lait.",
    image: "/images/cerelac.jpg",
    images: ["/images/cerelac.jpg", "/images/nature-2.jpg"],
    featured: false,
    inStock: true,
    badge: "Enfants",
  },
];

const reviewSeed: { slug: string; author: string; rating: number; title: string; body: string }[] =
  [
    {
      slug: "pack-5-crepes-nature",
      author: "Aïcha K.",
      rating: 5,
      title: "Simples et parfaites",
      body: "Commandé pour le petit-déj du dimanche. Pâte légère, goût de lait, mes enfants ont tout fini. Je reprendrai le pack de 10.",
    },
    {
      slug: "pack-5-crepes-nature",
      author: "Marc T.",
      rating: 4,
      title: "Très bon rapport qualité",
      body: "Arrivées encore tièdes. Un peu moins sucrées que prévu — c’est même mieux. 1000 F les 5, imbattable.",
    },
    {
      slug: "pack-10-crepes-nature",
      author: "Famille N’Guessan",
      rating: 5,
      title: "Le dimanche en famille",
      body: "On a partagé autour d’un thé. Rien à jeter, pâte homogène, pas d’odeur d’œuf. Bravo Olivera.",
    },
    {
      slug: "pack-7-crepes-chocolat",
      author: "Sandra M.",
      rating: 5,
      title: "Le chocolat est généreux",
      body: "Pas une petite rature de cacao : une vraie nappe. Mes collègues au bureau m’ont demandé le numéro.",
    },
    {
      slug: "pack-7-crepes-chocolat",
      author: "Yannick B.",
      rating: 4,
      title: "Fondant à souhait",
      body: "Très gourmand, un peu sucré pour moi mais excellent. La photo est fidèle.",
    },
    {
      slug: "pack-10-crepes-chocolat",
      author: "Nadia C.",
      rating: 5,
      title: "Meilleure affaire du menu",
      body: "10 crêpes au chocolat pour 2000 F, on a fêté l’anniversaire de ma nièce pour presque rien. Tout le monde a adoré.",
    },
    {
      slug: "pack-7-crepes-nutella",
      author: "Léa O.",
      rating: 5,
      title: "Comme sur la photo",
      body: "Roulées, nappées, avec un raisin dessus. On se serait crus dans une boutique de Paris. Merci !",
    },
    {
      slug: "pack-7-crepes-nutella",
      author: "Jean-Paul D.",
      rating: 5,
      title: "Addiction déclarée",
      body: "J’en commande chaque vendredi. Texture, chaleur, Nutella — rien à redire. Service rapide au téléphone.",
    },
    {
      slug: "pack-7-crepes-nutella",
      author: "Rita F.",
      rating: 4,
      title: "Très copieux",
      body: "7 suffisent largement pour 3 personnes. Un peu collant (c’est le Nutella) mais délicieux.",
    },
    {
      slug: "pack-10-crepes-nutella",
      author: "Élodie S.",
      rating: 5,
      title: "Anniversaire réussi",
      body: "Les enfants se sont jetés dessus. Présentation soignée, quantité honnête, je recommande pour les fêtes.",
    },
    {
      slug: "pack-10-crepes-nutella",
      author: "Karim B.",
      rating: 5,
      title: "Le top du menu",
      body: "On sent que c’est fait minute. Le Nutella n’est pas avare. 2500 F c’est cadeau.",
    },
    {
      slug: "pack-7-crepes-cerelac",
      author: "Maman Aminata",
      rating: 5,
      title: "Goût d’enfance",
      body: "Le Céréalac sur crêpe, je n’avais jamais goûté aussi bien. Ma fille de 4 ans en a mangé trois.",
    },
    {
      slug: "pack-7-crepes-cerelac",
      author: "Serge L.",
      rating: 5,
      title: "Original et addictif",
      body: "Saveur unique, légèrement vanillée. À faire connaître ! J’ai déjà renvoyé deux amis vers Olivera.",
    },
    {
      slug: "pack-10-crepes-cerelac",
      author: "Classe de CE2 — École Saint-Paul",
      rating: 5,
      title: "Goûter de classe",
      body: "Commandé pour 22 enfants, on a pris aussi du nature. RAS, tout le monde content, livraison à l’heure.",
    },
    {
      slug: "box-decouverte-4-saveurs",
      author: "Inès P.",
      rating: 5,
      title: "Pour ne plus choisir",
      body: "La box est maline. Mon chéri Nutella, moi Céréalac, les enfants nature et chocolat. Paix dans la maison.",
    },
    {
      slug: "box-decouverte-4-saveurs",
      author: "Olivier R.",
      rating: 4,
      title: "Belle introduction",
      body: "Parfait pour un premier essai. Les 4 pâtes sont distinctes, aucune n’est sèche.",
    },
    {
      slug: "plateau-evenement-20",
      author: "Hôtesse Mariam",
      rating: 5,
      title: "Baptême de ma fille",
      body: "Plateau magnifique, encore chaud, les invités ont pris des photos. Olivera a géré le timing comme une pro.",
    },
    {
      slug: "plateau-evenement-20",
      author: "Cabinet Koffi & Associés",
      rating: 5,
      title: "Afterwork sucré",
      body: "On a surpris l’équipe un vendredi. 20 crêpes, 4 saveurs, zéro reste. Facture légère pour l’effet produit.",
    },
    {
      slug: "grande-fete-40",
      author: "Wedding planner — Casa Blanca",
      rating: 5,
      title: "Mariage 80 personnes (buffet sucré)",
      body: "En complément du wedding cake, les crêpes ont volé la vedette. Communication fluide, présentation soignée.",
    },
    {
      slug: "mini-pack-enfant-cerelac",
      author: "Papa Joël",
      rating: 5,
      title: "Goûter de mercredi",
      body: "Portion parfaite, pas trop sucrée. Mon fils demande « les crêpes d’Olivera » maintenant.",
    },
    {
      slug: "pack-10-crepes-nature",
      author: "Béatrice A.",
      rating: 4,
      title: "Toujours constantes",
      body: "Troisième commande. La qualité ne baisse pas. J’ajoute parfois du chocolat chez moi.",
    },
  ];

let seeding: Promise<void> | null = null;

export async function ensureSeeded() {
  if (!process.env.DATABASE_URL) return;
  await ensureSchema();
  if (seeding) return seeding;

  seeding = (async () => {
    try {
      const [{ count }] = await db
        .select({ count: sql<number>`count(*)::int` })
        .from(products);
      if (Number(count) > 0) return;

      const inserted = await db.insert(products).values(catalog).returning();
      const bySlug = new Map(inserted.map((p) => [p.slug, p.id]));
      const rows = reviewSeed
        .map((r) => {
          const productId = bySlug.get(r.slug);
          if (!productId) return null;
          return {
            productId,
            author: r.author,
            rating: r.rating,
            title: r.title,
            body: r.body,
          };
        })
        .filter(
          (
            row,
          ): row is {
            productId: string;
            author: string;
            rating: number;
            title: string;
            body: string;
          } => row !== null,
        );

      if (rows.length) {
        await db.insert(reviews).values(rows);
      }
    } catch (err) {
      console.warn("[seed] seed ignoré", (err as Error)?.message);
    }
  })().finally(() => {
    seeding = null;
  });

  await seeding;
}
