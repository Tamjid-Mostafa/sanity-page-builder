"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { stegaClean } from "next-sanity";
import { Image } from "next-sanity/image";
import Autoplay from "embla-carousel-autoplay";
import { urlFor } from "@/sanity/lib/image";
import { IconRenderer } from "@/lib/icon-registry";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type ApproachCard = {
  _key: string;
  label?: string | null;
  title?: string | null;
  description?: string | null;
  accentColor?: string | null;
  icon?: {
    source?: "lucide" | "image" | null;
    lucide?: string | null;
    image?: { asset?: { _ref?: string; url?: string | null } | null } | null;
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
  blockStyles?: unknown;
};


function ApproachCard({ card, index }: { card: ApproachCard; index: number }) {
  const accent = stegaClean(card.accentColor) || "primary";
  const isPrimary = accent !== "secondary";
  const iconOnTop = index % 2 === 0;

  const iconBlock = (
    <div className="flex-1 flex items-center justify-center relative py-8 min-h-40">
      <div
        className={cn(
          "absolute h-44 w-44 rounded-full blur-3xl opacity-20",
          isPrimary ? "bg-primary" : "bg-secondary"
        )}
      />
      <div
        className={cn(
          "relative inline-flex h-22 w-22 items-center justify-center rounded-3xl ring-1 ring-white/10",
          isPrimary ? "bg-primary/20" : "bg-secondary/15"
        )}
      >
        {card.icon && stegaClean(card.icon.source) === "image" && card.icon.image?.asset ? (
          <Image
            src={urlFor(card.icon.image).width(44).height(44).fit("max").url()}
            alt=""
            width={44}
            height={44}
          />
        ) : card.icon?.lucide ? (
          <IconRenderer
            name={stegaClean(card.icon.lucide)}
            className={cn(
              "h-11 w-11",
              isPrimary ? "text-primary/90" : "text-secondary"
            )}
            strokeWidth={1.2}
          />
        ) : null}
      </div>
    </div>
  );

  const textBlock = (
    <div className="px-7 py-6 flex flex-col gap-2">
      {card.label && (
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
         {card.label}
        </span>
      )}
      <h3 className="text-[1.45rem] font-heading font-bold text-white leading-[1.15]">
        {card.title}
      </h3>
      {card.description && (
        <p className="text-sm font-light text-white leading-relaxed">
          {card.description}
        </p>
      )}
    </div>
  );

  return (
    <div
      className="group h-full rounded-2xl border border-white/[0.07] shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col min-h-85"
      style={{ background: "oklch(0.18 0.01 255)" }}
    >
      {iconOnTop ? <>{iconBlock}{textBlock}</> : <>{textBlock}{iconBlock}</>}
    </div>
  );
}

export function ApproachCarouselContent({ data }: { data: ApproachCarouselData }) {
  const cards = data.cards || [];
  const titleAlign = stegaClean(data.titleAlign) === "center" ? "center" : "left";

  const plugins = useMemo(
    () => [Autoplay({ delay: 5000, stopOnInteraction: true })],
    []
  );

  if (cards.length === 0) return null;

  return (
    <div className="relative pb-14 overflow-x-clip">
      {(data.eyebrow || data.title || data.subtitle) && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className={cn("mb-8", titleAlign === "center" && "text-center")}
        >
          {data.eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.14em] mb-2 text-primary">
              {data.eyebrow}
            </p>
          )}
          {data.title && (
            <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground">
              {data.title}
            </h2>
          )}
          {data.subtitle && (
            <p className={cn(
              "mt-4 text-sm sm:text-base font-light text-foreground leading-relaxed max-w-3xl",
              titleAlign === "center" && "mx-auto"
            )}>
              {data.subtitle}
            </p>
          )}
        </motion.div>
      )}

      <Carousel
        opts={{ align: "start", loop: true }}
        plugins={plugins}
        className="w-full"
      >
        <CarouselContent className="-ml-3 md:-ml-4">
          {cards.map((card, index) => (
            <CarouselItem
              key={card._key}
              className="pl-3 md:pl-4 basis-4/5 sm:basis-1/2 lg:basis-1/3 py-2"
            >
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="h-full"
              >
                <ApproachCard card={card} index={index} />
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="absolute -bottom-12 right-0 flex items-center gap-2">
          <CarouselPrevious className="static translate-y-0 translate-x-0 h-9 w-9 rounded-full border border-border bg-card text-foreground hover:bg-muted shadow-sm transition-colors" />
          <CarouselNext className="static translate-y-0 translate-x-0 h-9 w-9 rounded-full border border-border bg-card text-foreground hover:bg-muted shadow-sm transition-colors" />
        </div>
      </Carousel>
    </div>
  );
}
