"use client";

import { motion } from "motion/react";
import { Clock, Lightbulb, Building2, Handshake } from "lucide-react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";

const elements = [
  {
    icon: Clock,
    step: "01",
    title: "Short, focused programmes",
    description:
      "Typically lasting between 1 and 12 weeks, delivered in person and online. Designed to fit around existing commitments without demanding a year-long break.",
    accent: "bg-primary",
    iconColor: "text-primary",
  },
  {
    icon: Lightbulb,
    step: "02",
    title: "Workshops and reflection",
    description:
      "Facilitated sessions exploring personal development, life design, and decision-making — structured space to think clearly about direction.",
    accent: "bg-secondary",
    iconColor: "text-secondary",
  },
  {
    icon: Building2,
    step: "03",
    title: "Real-world exposure",
    description:
      "Industry visits, conversations with professionals, and project-based learning that connects classroom ideas to lived reality.",
    accent: "bg-primary",
    iconColor: "text-primary",
  },
  {
    icon: Handshake,
    step: "04",
    title: "Partner-led delivery",
    description:
      "Programmes are developed in collaboration with trusted institutions and organisations to ensure quality, oversight, and meaningful outcomes.",
    accent: "bg-secondary",
    iconColor: "text-secondary",
  },
];

export function GlobalHowItWorks() {
  return (
    <SectionFrame id="how-it-works" className="bg-background">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
          How Programmes Work
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground">
          Designed around a small number of core elements.
        </h2>
        <p className="mt-4 text-sm sm:text-base font-light text-foreground leading-relaxed max-w-2xl">
          Every Global Experience is built on the same foundations — whether
          delivered in Barcelona, internationally, or online.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-4">
        {elements.map((el, index) => (
          <motion.div
            key={el.step}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              delay: index * stagger.cards,
              duration: duration.slow,
              ease: easing.apple,
            }}
            whileHover={{ y: -4 }}
          >
            <div className="group relative h-full rounded-2xl bg-card border border-border overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all duration-300">
              <div className={cn("absolute top-0 left-0 right-0 h-0.5", el.accent)} aria-hidden />
              <div className="flex flex-col gap-3 p-5 flex-1">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10">
                    <el.icon className={cn("w-4 h-4", el.iconColor)} strokeWidth={1.5} />
                  </div>
                  <span className="text-2xl font-bold text-foreground/20 select-none tabular-nums">
                    {el.step}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-foreground leading-snug">
                  {el.title}
                </h3>
                <p className="text-sm font-light text-foreground leading-relaxed">
                  {el.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionFrame>
  );
}
