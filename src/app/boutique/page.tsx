import { Suspense } from "react";
import { Catalog } from "@/components/catalog";
import { getProducts } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Boutique",
  description:
    "Menu des crêpes sucrées Olivera : nature, chocolat, Nutella, Céréalac, packs et plateaux événements.",
};

export default async function BoutiquePage({
  searchParams,
}: {
  searchParams: Promise<{ saveur?: string; collection?: string; tri?: string }>;
}) {
  const products = await getProducts();
  const sp = await searchParams;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <p className="text-xs uppercase tracking-[0.24em] text-magenta">Menu sucré</p>
      <h1 className="mt-2 font-display text-5xl text-plum">La boutique</h1>
      <p className="mt-3 max-w-2xl text-cocoa">
        Tous les packs du menu — 5, 7 ou 10 crêpes — et nos plateaux pour les fêtes. Filtrez par
        saveur, triez par prix, ajoutez au panier.
      </p>
      <div className="mt-10">
        <Suspense fallback={<p className="text-cocoa">Chargement du menu…</p>}>
          <Catalog
            products={products}
            initialFlavor={sp.saveur}
            initialCollection={sp.collection}
            initialSort={sp.tri}
          />
        </Suspense>
      </div>
    </div>
  );
}
