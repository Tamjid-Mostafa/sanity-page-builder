"use client";

import React, { useMemo } from "react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "motion/react";
import { IconRenderer } from "@/lib/icon-registry";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export interface ApproachCarouselItem {
  icon: string;
  label?: string;
  title: string;
  description: string;
  colorClass?: string;
  iconBgClass?: string;
}

interface ApproachCarouselProps {
  items: ApproachCarouselItem[];
  className?: string;
}

const AUTOPLAY_DELAY_MS = 5000;

export function ApproachCarousel({ items, className }: ApproachCarouselProps) {
  const plugins = useMemo(
    () => [Autoplay({ delay: AUTOPLAY_DELAY_MS, stopOnInteraction: true })],
    [],
  );

  return (
    <div className={cn("w-full", className)}>
      <Carousel
        opts={{ align: "start", loop: true }}
        plugins={plugins}
        className="w-full"
      >
        <CarouselContent className="-ml-3 md:-ml-4">
          {items.map((item, index) => {
            const isSecondary = item.colorClass?.includes("secondary");
            const iconOnTop = index % 2 === 0;

            const iconBlock = (
              <div className="flex-1 flex items-center justify-center relative py-8">
                <div
                  className={cn(
                    "absolute h-44 w-44 rounded-full blur-3xl opacity-25",
                    isSecondary ? "bg-secondary" : "bg-primary",
                  )}
                />
                <div
                  className={cn(
                    "relative inline-flex h-[88px] w-[88px] items-center justify-center rounded-3xl ring-1 ring-white/10",
                    isSecondary ? "bg-secondary/15" : "bg-primary/20",
                  )}
                >
                  <IconRenderer
                    name={item.icon}
                    className={cn(
                      "h-11 w-11",
                      isSecondary ? "text-secondary" : "text-primary",
                    )}
                    strokeWidth={1.2}
                  />
                </div>
              </div>
            );

            const textBlock = (
              <div className="px-7 py-6 flex flex-col gap-2">
                {item.label && (
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                    {item.label}
                  </span>
                )}
                <h3 className="text-[1.45rem] font-heading font-bold text-white leading-[1.15]">
                  {item.title}
                </h3>
                <p className="text-sm font-light text-white leading-relaxed">
                  {item.description}
                </p>
              </div>
            );

            return (
              <CarouselItem
                key={`approach-item-${index}`}
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
                  <div
                    className="group h-full rounded-2xl border border-white/[0.07] shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col min-h-[340px]"
                    style={{ background: "oklch(0.18 0.01 255)" }}
                  >
                    {iconOnTop ? (
                      <>
                        {iconBlock}
                        {textBlock}
                      </>
                    ) : (
                      <>
                        {textBlock}
                        {iconBlock}
                      </>
                    )}
                  </div>
                </motion.div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <div className="absolute bottom-[-48px] right-0 flex items-center justify-end gap-2 mt-3">
          <CarouselPrevious className="static translate-y-0 translate-x-0 h-9 w-9 rounded-full border border-border bg-card text-foreground hover:bg-muted shadow-sm transition-colors" />
          <CarouselNext className="static translate-y-0 translate-x-0 h-9 w-9 rounded-full border border-border bg-card text-foreground hover:bg-muted shadow-sm transition-colors" />
        </div>
      </Carousel>
    </div>
  );
}
