"use client";

import { WHATSAPP_ORDER } from "@/lib/share";

export function WhatsappFloat() {
  return (
    <a
      href={WHATSAPP_ORDER}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(37,211,102,0.45)] transition hover:scale-105"
      aria-label="Commander sur WhatsApp"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
        <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.94L2 22l5.4-1.4a10 10 0 0 0 4.64 1.17h.04c5.46 0 9.89-4.4 9.89-9.84C21.97 6.4 17.5 2 12.04 2Zm5.75 13.9c-.24.67-1.4 1.28-1.94 1.36-.5.07-1.13.1-1.82-.11-.42-.14-.96-.31-1.66-.61-2.92-1.26-4.82-4.2-4.97-4.4-.14-.2-1.18-1.57-1.18-3 0-1.42.74-2.12 1-2.41.24-.28.64-.41 1.02-.41.12 0 .23 0 .33.01.3.01.44.03.64.5.24.58.82 2 .89 2.15.07.14.12.31.02.5-.1.2-.15.31-.3.48l-.44.5c-.15.17-.3.35-.13.68.17.33.77 1.27 1.65 2.06 1.14 1.02 2.1 1.33 2.43 1.48.33.14.52.12.71-.07.2-.2.82-.95 1.04-1.28.22-.33.44-.27.73-.16.3.1 1.88.89 2.2 1.05.33.17.55.24.63.38.08.14.08.8-.16 1.47Z" />
      </svg>
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
