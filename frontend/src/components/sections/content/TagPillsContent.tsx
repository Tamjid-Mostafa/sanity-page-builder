import type { TagPillsData } from "@/types/sanity";

export function TagPillsContent({ data }: { data: TagPillsData }) {
  const items = (data.items ?? []).filter((item): item is string => Boolean(item))

  if (items.length === 0) return null;

  return (
    <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      {items.map((label) => (
        <li
          key={label}
          className="rounded-xl bg-foreground px-4 py-3 text-sm font-semibold text-background"
        >
          {label}
        </li>
      ))}
    </ul>
  );
}
