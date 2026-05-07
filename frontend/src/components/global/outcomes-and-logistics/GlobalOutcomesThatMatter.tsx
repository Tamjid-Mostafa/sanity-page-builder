"use client";

import { motion } from "motion/react";
import { TrendingUp, MessageCircle, Globe2, Compass } from "lucide-react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";

const outcomes = [
  {
    icon: TrendingUp,
    title: "Confidence & independence",
    description:
      "Participants develop the self-assurance to navigate unfamiliar environments and take ownership of their choices.",
    accent: "bg-primary",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
  },
  {
    icon: MessageCircle,
    title: "Communication & adaptability",
    description:
      "Stronger ability to communicate across cultures, adapt to new contexts, and work effectively with diverse groups.",
    accent: "bg-secondary",
    iconColor: "text-secondary",
    iconBg: "bg-secondary/15",
  },
  {
    icon: Globe2,
    title: "Cultural & professional awareness",
    description:
      "Broader understanding of how different professional and cultural contexts shape thinking, work, and opportunity.",
    accent: "bg-primary",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
  },
  {
    icon: Compass,
    title: "Clarity on future direction",
    description:
      "Clearer thinking about education, career, and life choices — grounded in real experience rather than assumption.",
    accent: "bg-secondary",
    iconColor: "text-secondary",
    iconBg: "bg-secondary/15",
  },
];

export function GlobalOutcomesThatMatter() {
  return (
    <SectionFrame id="outcomes" className="bg-background">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
          Outcomes That Matter
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground">
          Experience becomes insight — not just memories.
        </h2>
        <p className="mt-4 text-sm sm:text-base font-light text-foreground leading-relaxed max-w-2xl">
          Global Experiences are not about collecting certificates or ticking
          boxes. Through structured learning, participants typically leave with:
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-4">
        {outcomes.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              delay: i * stagger.cards,
              duration: duration.slow,
              ease: easing.apple,
            }}
            whileHover={{ y: -4 }}
          >
            <div className="group relative h-full rounded-2xl bg-card border border-border overflow-hidden flex gap-4 p-5 shadow-sm hover:shadow-md transition-all duration-300">
              <div
                className={cn("absolute top-0 left-0 right-0 h-0.5", item.accent)}
                aria-hidden
              />
              <div
                className={cn(
                  "shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg mt-0.5",
                  item.iconBg,
                )}
              >
                <item.icon
                  className={cn("w-4 h-4", item.iconColor)}
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm font-light text-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionFrame>
  );
}
