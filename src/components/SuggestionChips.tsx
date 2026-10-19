import type { Suggestion } from "@/content/suggestions";

export function SuggestionChips({
  items,
  onSend,
  disabled,
  className = "",
}: {
  items: Suggestion[];
  onSend: (text: string) => void;
  disabled: boolean;
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((item) => (
        <li key={item.label}>
          <button
            type="button"
            disabled={disabled}
            onClick={() => onSend(item.label)}
            className="rounded-full border border-border px-4 py-2 text-left text-sm text-foreground transition-colors hover:border-accent disabled:opacity-40"
          >
            {item.featured ? (
              <span className="mr-1 text-accent" aria-hidden>
                ✦
              </span>
            ) : null}
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );
}
