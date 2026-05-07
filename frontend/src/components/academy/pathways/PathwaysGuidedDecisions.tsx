"use client";

import { motion } from "motion/react";
import { MessageSquare, BookOpen, TrendingUp } from "lucide-react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Mentoring conversations",
    description:
      "Regular one-to-one conversations that explore the student's interests, concerns, and emerging sense of direction.",
    colorClass: "text-primary",
    iconBg: "bg-white/10",
    accentBar: "bg-primary",
  },
  {
    icon: BookOpen,
    step: "02",
    title: "Academic reflection",
    description:
      "Students review their progress, strengths, and areas for growth — building self-awareness alongside academic skill.",
    colorClass: "text-secondary",
    iconBg: "bg-white/10",
    accentBar: "bg-secondary",
  },
  {
    icon: TrendingUp,
    step: "03",
    title: "Increasing ownership",
    description:
      "As students mature, they take greater responsibility for their choices — guided, but not directed. The goal is confident, independent decision-making.",
    colorClass: "text-primary",
    iconBg: "bg-white/10",
    accentBar: "bg-primary",
  },
];

export function PathwaysGuidedDecisions() {
  return (
    <SectionFrame id="guided-decisions" className="bg-foreground">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary mb-2">
          Guided Decision-Making
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-background">
          Pathways planning is ongoing and personalised.
        </h2>
        <p className="mt-4 text-sm sm:text-base font-light text-background leading-relaxed max-w-2xl">
          Students are supported through mentoring conversations, academic
          reflection, and guidance around future decisions. As they mature,
          students take increasing ownership of their choices.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-3 gap-4">
        {steps.map((s, index) => (
          <motion.div
            key={s.step}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              delay: index * stagger.cards,
              duration: duration.slow,
              ease: easing.apple,
            }}
          >
            <div
              className="group relative h-full rounded-2xl border border-white/10 overflow-hidden flex flex-col transition-all duration-300 hover:border-white/20"
              style={{ background: "oklch(0.18 0.01 255)" }}
            >
              <div className={cn("absolute top-0 left-0 right-0 h-0.5", s.accentBar)} aria-hidden />
              <div className="flex flex-col gap-3 p-5 flex-1">
                <div className="flex items-center justify-between">
                  <div className={cn("inline-flex items-center justify-center w-9 h-9 rounded-lg", s.iconBg)}>
                    <s.icon className={cn("w-4 h-4", s.colorClass)} strokeWidth={1.5} />
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
    </SectionFrame>
  );
}
