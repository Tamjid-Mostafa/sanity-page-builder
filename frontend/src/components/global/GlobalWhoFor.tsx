"use client";

import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration, stagger } from "@/lib/animations";

const primaryAudience = [
  {
    label: "Students preparing for university",
    description: "Building confidence, perspective, and clarity before committing to a degree.",
  },
  {
    label: "Students in a gap period during their degree",
    description: "Using structured time away to gain experience and return with greater purpose.",
  },
  {
    label: "Young adults exploring direction upon graduation",
    description: "Stepping back from the pressure of next steps to understand what matters most.",
  },
  {
    label: "Individuals seeking international exposure",
    description: "Gaining global perspective without long-term relocation or major life disruption.",
  },
];

export function GlobalWhoFor() {
  return (
    <SectionFrame id="who-for" className="bg-foreground">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary mb-2">
          Who They Are For
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-background">
          Young adults aged 18–25 who want perspective before their next long-term step.
        </h2>
        <p className="mt-4 text-sm sm:text-base font-light text-background leading-relaxed max-w-2xl">
          Some programmes may also be available for school groups or
          early-career professionals, depending on the partnership.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-4">
        {primaryAudience.map((item, index) => (
          <motion.div
            key={index}
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
            <div
              className="group relative h-full rounded-2xl border border-white/10 overflow-hidden flex gap-4 p-5 transition-all duration-300 hover:border-white/20"
              style={{ background: "oklch(0.18 0.01 255)" }}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-secondary" aria-hidden />
              <div className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-secondary/15 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-secondary" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-background mb-1">
                  {item.label}
                </h3>
                <p className="text-sm font-light text-background leading-relaxed">
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
