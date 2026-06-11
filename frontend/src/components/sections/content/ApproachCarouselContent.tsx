"use client";

import { stegaClean } from "next-sanity";
import { MotionInView } from "@/components/motion/MotionInView";
import {
  ApproachCarousel,
  type ApproachCarouselItem,
} from "@/components/ui/approach-carousel";
import { cn } from "@/lib/utils";

type ApproachCard = {
  _key: string;
  label?: string | null;
  title?: string | null;
  description?: string | null;
  accentColor?: string | null;
  icon?: {
    source?: "lucide" | "image" | null;
    lucide?: string | null;
  } | null;
};

type ApproachCarouselData = {
  _type: "approachCarousel";
  _key?: string;
  eyebrow?: string | null;
  title?: string | null;
  subtitle?: string | null;
  titleAlign?: string | null;
  cards?: ApproachCard[];
};

const DEFAULT_ICONS = [
  "layers",
  "award",
  "clipboard-list",
  "compass",
  "monitor",
  "map-pin",
] as const;

function mapCardsToItems(cards: ApproachCard[]): ApproachCarouselItem[] {
  return cards
    .filter((card) => card.title)
    .map((card, index) => {
      const accent = stegaClean(card.accentColor) || (index % 2 === 0 ? "secondary" : "primary");
      const isSecondary = accent === "secondary";
      const iconName =
        stegaClean(card.icon?.lucide) || DEFAULT_ICONS[index % DEFAULT_ICONS.length];

      return {
        icon: iconName,
        label: card.label || "What makes us different",
        title: card.title || "",
        description: card.description || "",
        colorClass: isSecondary ? "text-secondary" : "text-primary",
        iconBgClass: isSecondary ? "bg-secondary/10" : "bg-primary/10",
      };
    });
}

export function ApproachCarouselContent({ data }: { data: ApproachCarouselData }) {
  const cards = data.cards || [];
  const items = mapCardsToItems(cards);
  const titleAlign = stegaClean(data.titleAlign) === "center" ? "center" : "left";

  if (items.length === 0) return null;

  return (
    <div className="bg-background border-t border-border">
      {(data.eyebrow || data.title) && (
        <MotionInView
          className={cn("mb-8", titleAlign === "center" && "text-center")}
          margin="-100px"
        >
          {data.eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
              {data.eyebrow}
            </p>
          )}
          {data.title && (
            <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground">
              {data.title}
            </h2>
          )}
        </MotionInView>
      )}

      <div className="relative pb-14 overflow-x-clip">
        <ApproachCarousel items={items} />
      </div>
    </div>
  );
}
