"use client";

import { useMemo, useState, type ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import type { ProductWithRating } from "@/lib/catalog";
import { COLLECTION_LABELS, FLAVOR_LABELS, formatPrice } from "@/lib/format";

const FLAVORS = ["nature", "chocolat", "nutella", "cerelac", "mixte"] as const;
const COLLECTIONS = ["packs", "evenements", "signature"] as const;

type SortKey = "featured" | "price-asc" | "price-desc" | "name" | "rating";

export function Catalog({
  products,
  initialFlavor,
  initialCollection,
  initialSort,
}: {
  products: ProductWithRating[];
  initialFlavor?: string;
  initialCollection?: string;
  initialSort?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [flavor, setFlavor] = useState(initialFlavor ?? "all");
  const [collection, setCollection] = useState(initialCollection ?? "all");
  const [sort, setSort] = useState<SortKey>((initialSort as SortKey) || "featured");
  const [query, setQuery] = useState("");

  function pushParams(next: { flavor?: string; collection?: string; sort?: string }) {
    const params = new URLSearchParams(searchParams.toString());
    const f = next.flavor ?? flavor;
    const c = next.collection ?? collection;
    const s = next.sort ?? sort;
    if (f && f !== "all") params.set("saveur", f);
    else params.delete("saveur");
    if (c && c !== "all") params.set("collection", c);
    else params.delete("collection");
    if (s && s !== "featured") params.set("tri", s);
    else params.delete("tri");
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = products.filter((p) => {
      if (flavor !== "all" && p.flavor !== flavor) return false;
      if (collection !== "all" && p.collection !== collection) return false;
      if (q) {
        const hay = `${p.name} ${p.shortDescription} ${p.flavor}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    list.sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "name") return a.name.localeCompare(b.name, "fr");
      if (sort === "rating") return b.averageRating - a.averageRating;
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return a.price - b.price;
    });
    return list;
  }, [products, flavor, collection, sort, query]);

  const min = products.reduce((m, p) => Math.min(m, p.price), products[0]?.price ?? 0);
  const max = products.reduce((m, p) => Math.max(m, p.price), 0);

  return (
    <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
      <aside className="h-fit rounded-[1.6rem] bg-white p-6 ring-1 ring-plum/10 lg:sticky lg:top-28">
        <p className="text-xs uppercase tracking-[0.22em] text-magenta">Filtrer</p>
        <label className="mt-4 block">
          <span className="sr-only">Recherche</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher…"
            className="field"
          />
        </label>

        <p className="mt-6 text-xs uppercase tracking-[0.18em] text-cocoa">Saveur</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Chip
            active={flavor === "all"}
            onClick={() => {
              setFlavor("all");
              pushParams({ flavor: "all" });
            }}
          >
            Toutes
          </Chip>
          {FLAVORS.map((f) => (
            <Chip
              key={f}
              active={flavor === f}
              onClick={() => {
                setFlavor(f);
                pushParams({ flavor: f });
              }}
            >
              {FLAVOR_LABELS[f]}
            </Chip>
          ))}
        </div>

        <p className="mt-6 text-xs uppercase tracking-[0.18em] text-cocoa">Collection</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Chip
            active={collection === "all"}
            onClick={() => {
              setCollection("all");
              pushParams({ collection: "all" });
            }}
          >
            Toutes
          </Chip>
          {COLLECTIONS.map((c) => (
            <Chip
              key={c}
              active={collection === c}
              onClick={() => {
                setCollection(c);
                pushParams({ collection: c });
              }}
            >
              {COLLECTION_LABELS[c]}
            </Chip>
          ))}
        </div>

        <p className="mt-6 text-xs text-cocoa">
          Prix du menu : {formatPrice(min)} — {formatPrice(max)}
        </p>
      </aside>

      <div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-cocoa">
            {filtered.length} {filtered.length > 1 ? "créations" : "création"}
          </p>
          <label className="flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-cocoa">
            Trier
            <select
              value={sort}
              onChange={(e) => {
                const next = e.target.value as SortKey;
                setSort(next);
                pushParams({ sort: next });
              }}
              className="field py-2 text-xs normal-case tracking-normal"
            >
              <option value="featured">Coups de cœur</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="rating">Mieux notés</option>
              <option value="name">Nom A–Z</option>
            </select>
          </label>
        </div>
        {filtered.length === 0 ? (
          <p className="rounded-[1.6rem] bg-white p-10 text-center text-cocoa ring-1 ring-plum/10">
            Aucune crêpe ne correspond à ces filtres. Essayez une autre saveur.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] transition ${
        active ? "bg-plum text-cream" : "bg-cream text-plum hover:bg-plum/10"
      }`}
    >
      {children}
    </button>
  );
}
