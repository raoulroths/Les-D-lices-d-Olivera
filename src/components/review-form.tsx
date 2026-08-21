"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export function ReviewForm({ productId, slug }: { productId: string; slug: string }) {
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("saving");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, slug, author, title, body, rating }),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("done");
      setAuthor("");
      setTitle("");
      setBody("");
      setRating(5);
      router.refresh();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[1.6rem] bg-white p-6 ring-1 ring-plum/10">
      <h3 className="font-display text-2xl text-plum">Laisser un avis</h3>
      <p className="mt-1 text-sm text-cocoa">Dites-nous comment étaient vos crêpes.</p>
      <div className="mt-4 flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setRating(n)}
            className={`text-2xl ${n <= rating ? "text-gold" : "text-plum/20"}`}
            aria-label={`${n} étoiles`}
          >
            ★
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-3">
        <input
          required
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Votre nom"
          className="field"
        />
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre de l’avis"
          className="field"
        />
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Votre expérience…"
          rows={4}
          className="field resize-none"
        />
      </div>
      <button type="submit" className="btn-primary mt-4" disabled={status === "saving"}>
        {status === "saving" ? "Envoi…" : "Publier l’avis"}
      </button>
      {status === "done" && (
        <p className="mt-3 text-sm text-magenta">Merci — votre avis est en ligne.</p>
      )}
      {status === "error" && (
        <p className="mt-3 text-sm text-red-700">Impossible d’envoyer l’avis. Réessayez.</p>
      )}
    </form>
  );
}
