"use client";

import { CartProvider } from "@/context/cart-context";
import { CartDrawer } from "@/components/cart-drawer";
import { WhatsappFloat } from "@/components/whatsapp-float";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
      <WhatsappFloat />
    </CartProvider>
  );
}
