import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Great_Vibes, Outfit } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Providers } from "@/components/providers";
import { PHONE_DISPLAY, STORE_NAME } from "@/lib/format";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: `${STORE_NAME} — Crêpes sucrées artisanales`,
    template: `%s · ${STORE_NAME}`,
  },
  description: `Crêpes nature lait, chocolat, Nutella et Céréalac. Pour tous, pour chaque événement. Commandez au ${PHONE_DISPLAY}.`,
  openGraph: {
    title: `${STORE_NAME} — Crêpes sucrées artisanales`,
    description: `Nature, chocolat, Nutella, Céréalac. Commandez au ${PHONE_DISPLAY}.`,
    type: "website",
    locale: "fr_FR",
    images: [{ url: "/images/hero.jpg", width: 1200, height: 800, alt: STORE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${STORE_NAME} — Crêpes sucrées`,
    description: `Nature, chocolat, Nutella, Céréalac. ${PHONE_DISPLAY}`,
    images: ["/images/hero.jpg"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body
        className={`${outfit.variable} ${cormorant.variable} ${greatVibes.variable} flex min-h-screen flex-col bg-cream font-sans text-plum antialiased`}
      >
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
