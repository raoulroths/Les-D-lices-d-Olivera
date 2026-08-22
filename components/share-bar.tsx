"use client";

import { useEffect, useState } from "react";
import { facebookShareUrl, whatsappShareUrl } from "@/lib/share";

export function ShareBar({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const message = url ? `${text}\n${url}` : text;

  async function copy() {
    try {
      await navigator.clipboard.writeText(url || message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  async function nativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch {
        /* cancelled */
      }
    }
    await copy();
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-[10px] uppercase tracking-[0.18em] text-cocoa">Partager</span>
      <a
        href={whatsappShareUrl(message)}
        target="_blank"
        rel="noreferrer"
        className="rounded-full bg-[#25D366] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white"
      >
        WhatsApp
      </a>
      <a
        href={url ? facebookShareUrl(url) : "#"}
        target="_blank"
        rel="noreferrer"
        className="rounded-full bg-[#1877F2] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white"
      >
        Facebook
      </a>
      <button
        type="button"
        onClick={copy}
        className="rounded-full border border-plum/15 px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] text-plum hover:border-magenta hover:text-magenta"
      >
        {copied ? "Lien copié" : "Copier le lien"}
      </button>
      <button
        type="button"
        onClick={nativeShare}
        className="rounded-full bg-plum px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] text-cream"
      >
        Envoyer
      </button>
    </div>
  );
}
