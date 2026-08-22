"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/format";
import { IconBag, IconClose, IconMenu, IconPhone } from "@/components/icons";

const NAV = [
  { href: "/", label: "Accueil" },
  { href: "/boutique", label: "Boutique" },
  { href: "/evenements", label: "Événements" },
  { href: "/a-propos", label: "À propos" },
  { href: "/presenter", label: "Partager" },
];

export function Header() {
  const pathname = usePathname();
  const { count, openCart } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-plum text-cream">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-[11px] uppercase tracking-[0.22em] sm:px-6">
          <p className="hidden sm:block">Daloa, Côte d’Ivoire · livraison · paiement avant la livraison</p>
          <p className="sm:hidden">Olivera · Daloa · crêpes sucrées</p>
          <a
            href={`tel:${PHONE_TEL}`}
            className="inline-flex items-center gap-2 text-gold transition hover:text-white"
          >
            <IconPhone className="h-3.5 w-3.5" />
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>
      <div className="border-b border-plum/10 bg-ivory/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" className="group leading-none">
            <span className="block font-script text-[2rem] text-magenta sm:text-[2.35rem]">
              Les Délices
            </span>
            <span className="block -mt-1 font-display text-lg tracking-[0.18em] text-plum uppercase">
              de Olivera
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-xs uppercase tracking-[0.22em] transition ${
                    active ? "text-magenta" : "text-plum/80 hover:text-magenta"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openCart}
              className="relative grid h-11 w-11 place-items-center rounded-full border border-plum/15 text-plum transition hover:border-magenta hover:text-magenta"
              aria-label="Ouvrir le panier"
            >
              <IconBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-magenta px-1 text-[10px] font-semibold text-white">
                  {count}
                </span>
              )}
            </button>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-plum/15 text-plum lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              {open ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {open && (
          <nav className="border-t border-plum/10 px-4 py-4 lg:hidden">
            <div className="flex flex-col gap-3">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-2xl text-plum"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
