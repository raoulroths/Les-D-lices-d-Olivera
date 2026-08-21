"use client";

import { IconMinus, IconPlus } from "@/components/icons";

export function QtyInput({
  value,
  onChange,
  min = 1,
  max = 99,
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-plum/15 bg-ivory">
      <button
        type="button"
        aria-label="Diminuer"
        className="grid h-9 w-9 place-items-center text-plum transition hover:text-magenta"
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        <IconMinus className="h-4 w-4" />
      </button>
      <span className="w-7 text-center text-sm font-medium tabular-nums">{value}</span>
      <button
        type="button"
        aria-label="Augmenter"
        className="grid h-9 w-9 place-items-center text-plum transition hover:text-magenta"
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        <IconPlus className="h-4 w-4" />
      </button>
    </div>
  );
}
