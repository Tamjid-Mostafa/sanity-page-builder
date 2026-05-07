"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export interface CarouselItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  colorClass: string;
  iconBgClass: string;
}

interface ApproachCarouselProps {
  items: CarouselItem[];
  className?: string;
}

export const ApproachCarousel = ({
  items,
  className = "",
}: ApproachCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollability();
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("scroll", checkScrollability);
      window.addEventListener("resize", checkScrollability);
      return () => {
        carousel.removeEventListener("scroll", checkScrollability);
        window.removeEventListener("resize", checkScrollability);
      };
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={cn("relative w-full", className)}>
      {/* Left gradient overlay */}
      <div className="absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-background to-transparent pointer-events-none md:w-12" />

      {/* Right gradient overlay */}
      <div className="absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-background to-transparent pointer-events-none md:w-12" />

      {/* Carousel container */}
      <div
        ref={carouselRef}
        className="flex overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] gap-4 px-4 md:px-6 py-4"
      >
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={`carousel-item-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="shrink-0 w-full sm:w-1/2 lg:w-1/3"
            >
              <div className="group relative h-full rounded-lg border border-border/30 bg-background p-6 transition-all duration-300 hover:border-border/60 hover:shadow-sm">
                {/* Icon */}
                <div
                  className={cn(
                    "relative z-10 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110",
                    item.iconBgClass
                  )}
                >
                  <Icon className={cn("h-6 w-6", item.colorClass)} />
                </div>

                {/* Content */}
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation buttons (hidden on mobile, visible on tablet+) */}
      <div className="hidden sm:flex gap-2 mt-6 justify-end px-4">
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          aria-label="Previous items"
          className="relative z-20 flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-background text-foreground transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:enabled:border-border hover:enabled:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          aria-label="Next items"
          className="relative z-20 flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-background text-foreground transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:enabled:border-border hover:enabled:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
