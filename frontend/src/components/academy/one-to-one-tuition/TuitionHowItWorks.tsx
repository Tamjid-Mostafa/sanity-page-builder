"use client";

import { motion } from "motion/react";
import { Search, UserCheck, MapPin } from "lucide-react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration } from "@/lib/animations";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Understand the student's needs and goals",
    description:
      "Before tuition begins we take time to understand what the student needs — academically and personally — and what success looks like for them.",
    colorClass: "text-primary",
    accentBar: "bg-primary",
  },
  {
    icon: UserCheck,
    step: "02",
    title: "Match with the right tutor",
    description:
      "We match each student with an appropriate, experienced subject specialist based on their level, subject, and learning style.",
    colorClass: "text-secondary",
    accentBar: "bg-secondary",
  },
  {
    icon: MapPin,
    step: "03",
    title: "Agree a clear plan for progress",
    description:
      "Sessions are structured, purposeful, and focused on measurable academic progress — delivered in person in Barcelona or online.",
    colorClass: "text-primary",
    accentBar: "bg-primary",
  },
];

export function TuitionHowItWorks() {
  return (
    <SectionFrame id="how-tuition-works" className="bg-foreground">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary mb-2">
          Process
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-background">
          How Tuition Works
        </h2>
        <p className="mt-4 text-sm sm:text-base font-light text-background leading-relaxed max-w-2xl">
          Every student is different. Before we begin, we make sure the fit is right.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4">
        {steps.map((s, index) => (
          <motion.div
            key={s.step}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              delay: index * 0.12,
              duration: duration.slow,
              ease: easing.apple,
            }}
          >
            <div
              className="group relative h-full rounded-2xl border border-white/10 shadow-sm overflow-hidden flex flex-col transition-all duration-300 hover:border-white/20"
              style={{ background: "oklch(0.18 0.01 255)" }}
            >
              <div className={cn("absolute top-0 left-0 right-0 h-0.5", s.accentBar)} aria-hidden />
              <div className="flex flex-col gap-3 p-5 flex-1">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/10">
                    <s.icon
                      className={cn("w-4 h-4", s.colorClass)}
                      strokeWidth={1.5}
                    />
                  </div>
                  <span className="text-2xl font-bold text-background select-none tabular-nums">
                    {s.step}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-background leading-snug">
                  {s.title}
                </h3>
                <p className="text-sm font-light text-background leading-relaxed">
                  {s.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-8 text-sm font-semibold text-background leading-relaxed border-l-2 border-secondary pl-4 max-w-2xl"
      >
        Tuition may be delivered in person in Barcelona, or online for
        international students and remote learners.
      </motion.p>
    </SectionFrame>
  );
}
