"use client";

import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import { stegaClean } from "next-sanity";
import { cn } from "@/lib/utils";
import type { ExperienceCardGridData } from "@/types/sanity";
import {
  ExperienceCardGridCard,
  type ExperienceCard,
} from "./ExperienceCardGridCard";

type ExtendedExperienceCardGridData = ExperienceCardGridData & {
  locationLabel?: string | null;
  titleAlign?: string | null;
  footerText?: string | null;
  footerHighlight?: string | null;
  footerHighlightColor?: string | null;
  cards?: ExperienceCard[];
};

function renderFooterText(
  text?: string | null,
  highlight?: string | null,
  highlightColor?: string | null,
) {
  if (!text) return null;
  if (!highlight || !text.includes(highlight)) return text;
  const parts = text.split(highlight);
  const color = highlightColor?.trim() || null;

  return (
    <>
      {parts[0]}
      <span
        className={cn("font-semibold", !color && "text-secondary")}
        style={color ? { color } : undefined}
      >
        {highlight}
      </span>
      {parts.slice(1).join(highlight)}
    </>
  );
}

export function ExperienceCardGridContent({
  data,
}: {
  data: ExperienceCardGridData;
}) {
  const d = data as ExtendedExperienceCardGridData;
  const cards = d.cards || [];
  const titleAlign = stegaClean(d.titleAlign) === "center" ? "center" : "left";

  if (cards.length === 0) return null;

  return (
    <div>
      {(d.locationLabel || d.title || d.subtitle) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className={cn(
            "mb-8",
            titleAlign === "center" ? "text-center" : "text-left",
          )}
        >
          {d.locationLabel && (
            <div
              className={cn(
                "mb-6 inline-flex rounded-full border border-secondary/30 bg-secondary/20 px-4 py-2",
                titleAlign === "center"
                  ? "mx-auto items-center justify-center gap-2"
                  : "items-center gap-2",
              )}
            >
              <MapPin className="h-5 w-5 text-secondary" />
              <span className="text-sm font-medium text-secondary">
                {d.locationLabel}
              </span>
            </div>
          )}

          {d.title && (
            <h2 className="text-3xl font-heading font-bold leading-[1.08] tracking-tight sm:text-4xl md:text-[2.625rem]">
              {d.title}
            </h2>
          )}

          {d.subtitle && (
            <p
              className={cn(
                "mt-4 max-w-3xl text-sm font-light leading-relaxed sm:text-base",
                titleAlign === "center" && "mx-auto",
              )}
            >
              {d.subtitle}
            </p>
          )}
        </motion.div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        {cards.map((card, index) => (
          <ExperienceCardGridCard
            key={card._key || index}
            card={card}
            index={index}
          />
        ))}
      </div>

      {d.footerText && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="mx-auto max-w-3xl text-base leading-relaxed md:text-lg">
            {renderFooterText(
              d.footerText,
              stegaClean(d.footerHighlight),
              stegaClean(d.footerHighlightColor),
            )}
          </p>
        </motion.div>
      )}
    </div>
  );
}
