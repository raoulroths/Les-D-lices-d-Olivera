import Link from "next/link";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/format";

export function Footer() {
  return (
    <footer className="mt-auto bg-plum-deep text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-script text-4xl text-magenta-soft">Les Délices de Olivera</p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/75">
            Crêpes sucrées artisanales — nature lait, chocolat, Nutella et Céréalac.
            Pour le quotidien, les goûters, les anniversaires et toutes vos fêtes.
          </p>
          <a
            href={`tel:${PHONE_TEL}`}
            className="mt-6 inline-flex items-center gap-3 rounded-full bg-magenta px-5 py-2.5 text-sm font-medium text-white"
          >
            Commander · {PHONE_DISPLAY}
          </a>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-gold">Boutique</p>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            <li>
              <Link href="/boutique" className="hover:text-white">
                Toutes les crêpes
              </Link>
            </li>
            <li>
              <Link href="/boutique?saveur=nutella" className="hover:text-white">
                Nutella
              </Link>
            </li>
            <li>
              <Link href="/boutique?saveur=cerelac" className="hover:text-white">
                Céréalac
              </Link>
            </li>
            <li>
              <Link href="/evenements" className="hover:text-white">
                Plateaux événements
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-gold">Atelier</p>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            <li>Daloa, Côte d’Ivoire · cuisson minute</li>
            <li>Paiement avant la livraison : Orange Money, MTN MoMo, Wave</li>
            <li>Commandes événements 48h à l’avance</li>
            <li>
              <Link href="/a-propos" className="hover:text-white">
                L’histoire d’Olivera
              </Link>
            </li>
            <li>
              <Link href="/presenter" className="hover:text-white">
                Présenter & partager
              </Link>
            </li>
            <li>
              <Link href="/commandes" className="hover:text-white">
                Suivre les commandes (espace Olivera)
              </Link>
            </li>
            <li>
              <Link href="/checkout" className="hover:text-white">
                Paiement à la livraison
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-[11px] uppercase tracking-[0.2em] text-cream/50">
        © {new Date().getFullYear()} Les Délices de Olivera · Fait avec du beurre et du cœur
      </div>
    </footer>
  );
}
