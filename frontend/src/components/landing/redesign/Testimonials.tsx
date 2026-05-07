"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import Autoplay from "embla-carousel-autoplay";
import { Quote } from "lucide-react";
import { SectionFrame } from "./SectionFrame";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  tag?: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "iCollege gave me the structure I needed without making me feel like just another student. I actually understood what I was learning and why it mattered.",
    name: "Sofia R.",
    role: "A Level graduate, now studying Architecture in London",
    tag: "Academic Pathway",
  },
  {
    quote:
      "I came in unsure about what I wanted to do next. By the end of the year I had a plan, a portfolio, and the confidence to go after it.",
    name: "Marcus T.",
    role: "Global Development programme, Barcelona",
    tag: "Global Development",
  },
  {
    quote:
      "The mentoring here is genuinely different. My mentor asked me hard questions and helped me find real answers — not just what to study, but who I wanted to become.",
    name: "Lena W.",
    role: "High School Diploma, graduated 2024",
    tag: "Personal Growth",
  },
  {
    quote:
      "As a parent, what reassured me most was how well they actually knew my son — as a person, not just a student. The progress he made in one year was remarkable.",
    name: "Caroline M.",
    role: "Parent of an iCollege Academy student",
    tag: "Parent Perspective",
  },
  {
    quote:
      "Barcelona as a base for learning completely changed my perspective. Being in the city, meeting professionals, and doing real projects made study feel alive.",
    name: "Andrei P.",
    role: "Global Development, Romania",
    tag: "Barcelona Experience",
  },
];

export function Testimonials() {
  const plugins = useMemo(
    () => [Autoplay({ delay: 6000, stopOnInteraction: true })],
    []
  );

  return (
    <SectionFrame className="bg-background">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
          Student voices
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground">
          Testimonials
        </h2>
      </motion.div>

      {/* Carousel */}
      <Carousel
        opts={{ align: "start", loop: true }}
        plugins={plugins}
        className="w-full"
      >
        <CarouselContent className="-ml-4 md:-ml-6">
          {testimonials.map((t, index) => (
            <CarouselItem
              key={index}
              className="pl-4 md:pl-6 basis-full sm:basis-4/5 lg:basis-1/2 py-2"
            >
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="h-full"
              >
                <div className="h-full flex flex-col justify-between gap-6 rounded-2xl border border-border bg-card p-8 shadow-sm hover:shadow-md transition-shadow duration-300 min-h-60">
                  {/* Quote mark + tag */}
                  <div className="flex items-start justify-between gap-4">
                    <Quote
                      className="h-8 w-8 shrink-0 text-primary mt-0.5"
                      strokeWidth={1.5}
                    />
                    {t.tag && (
                      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground border border-border rounded-full px-3 py-1 shrink-0">
                        {t.tag}
                      </span>
                    )}
                  </div>

                  {/* Quote text */}
                  <p className="text-base sm:text-lg font-light leading-relaxed text-foreground flex-1">
                    "{t.quote}"
                  </p>

                  {/* Attribution */}
                  <div className="flex items-center gap-3 pt-2 border-t border-border">
                    {/* Initial avatar */}
                    <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary">
                      <span className="text-sm font-semibold text-primary-foreground">
                        {t.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground leading-none">
                        {t.name}
                      </p>
                      <p className="text-xs text-foreground mt-1 leading-snug">
                        {t.role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation */}
        <div className=" absolute bottom-[-48px] right-0 flex items-center justify-end gap-2 mt-3">
          <CarouselPrevious className="static translate-y-0 translate-x-0 h-9 w-9 rounded-full border border-border bg-card text-foreground hover:bg-card/80 shadow-sm transition-colors" />
          <CarouselNext className="static translate-y-0 translate-x-0 h-9 w-9 rounded-full border border-border bg-card text-foreground hover:bg-card/80 shadow-sm transition-colors" />
        </div>
      </Carousel>
    </SectionFrame>
  );
}
