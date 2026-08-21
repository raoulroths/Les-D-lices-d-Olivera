import { IconStar } from "@/components/icons";

export function StarRating({
  value,
  size = "sm",
}: {
  value: number;
  size?: "sm" | "md";
}) {
  const cls = size === "md" ? "h-5 w-5" : "h-3.5 w-3.5";
  return (
    <span className="inline-flex items-center gap-0.5 text-gold" aria-label={`${value.toFixed(1)} sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <IconStar key={i} className={cls} filled={i < Math.round(value)} />
      ))}
    </span>
  );
}
