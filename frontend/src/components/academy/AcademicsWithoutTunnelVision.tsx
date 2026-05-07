"use client";

import React from "react";
import { motion } from "motion/react";
import { BookOpen, Target, Sparkles } from "lucide-react";
import { easing, duration } from "@/lib/animations";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { cn } from "@/lib/utils";

const statements = [
  {
    icon: BookOpen,
    step: "01",
    title: "Understand why they are studying",
    description:
      "Students connect academic effort to real purpose — not just grades, but what those grades are for.",
    colorClass: "text-primary",
    accentBar: "bg-primary",
  },
  {
    icon: Target,
    step: "02",
    title: "Make informed choices about their future.",
    description:
      "Whether towards university, a gap year, or an alternative pathway — every decision is considered, not assumed.",
    colorClass: "text-secondary",
    accentBar: "bg-secondary",
  },
  {
    icon: Sparkles,
    step: "03",
    title: "Develop confidence in who they are becoming.",
    description:
      "Identity and direction matter as much as results. We help students grow as people, not just learners.",
    colorClass: "text-primary",
    accentBar: "bg-primary",
  },
];

export function AcademicsWithoutTunnelVision() {
  return (
    <SectionFrame id="academics-without-tunnel-vision" className="bg-foreground">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary mb-2">
          Academic focus
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-background">
          Academics without tunnel vision
        </h2>
        <p className="mt-4 text-sm sm:text-base font-light leading-relaxed text-background max-w-2xl">
          Academic outcomes matter. We take them seriously. But grades alone are
          not enough. Our students are supported to:
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4">
        {statements.map((s, index) => (
          <motion.div
            key={s.title}
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
        We help students connect academic effort to real purpose — whether that
        leads to university, further study, or another well-considered pathway.
      </motion.p>
    </SectionFrame>
  );
}
