"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const pics = images.length ? images : ["/images/hero.jpg"];
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-3">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-cream shadow-[0_24px_60px_rgba(44,11,74,0.14)] sm:aspect-square">
        <Image
          src={pics[active] ?? pics[0]}
          alt={alt}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      {pics.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {pics.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              className={`relative aspect-square overflow-hidden rounded-2xl ring-2 transition ${
                i === active ? "ring-magenta" : "ring-transparent hover:ring-plum/30"
              }`}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="120px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
