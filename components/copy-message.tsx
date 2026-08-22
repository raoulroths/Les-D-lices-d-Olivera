"use client";

import { useState } from "react";

export function CopyMessage({
  label,
  text,
}: {
  label: string;
  text: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <article className="rounded-[1.5rem] bg-white p-5 ring-1 ring-plum/10">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-2xl text-plum">{label}</h3>
        <button
          type="button"
          onClick={copy}
          className="shrink-0 rounded-full bg-plum px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-cream"
        >
          {copied ? "Copié" : "Copier"}
        </button>
      </div>
      <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-relaxed text-cocoa">
        {text}
      </pre>
    </article>
  );
}
