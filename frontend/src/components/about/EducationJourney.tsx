"use client";

import { motion } from "motion/react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration } from "@/lib/animations";

const stages = [
  {
    number: "01",
    title: "Foundational learning",
    description:
      "Strong academics, mentoring, and personal development during the teenage years.",
    accent: "bg-primary",
  },
  {
    number: "02",
    title: "Perspective through experience",
    description:
      "International and real-world experiences that support reflection, growth, and clarity.",
    accent: "bg-secondary",
  },
  {
    number: "03",
    title: "Application in adult and professional life",
    description:
      "The gradual transition into independence, responsibility, and leadership.",
    accent: "bg-primary",
  },
];

export function EducationJourney() {
  return (
    <SectionFrame id="education-journey" className="bg-foreground">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary mb-2">
          Learning
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-background">
          Education as a journey, not a checklist
        </h2>
        <div className="mt-4 space-y-3 text-sm sm:text-base font-medium text-background leading-relaxed max-w-2xl">
          <p>
            Education isn&apos;t something that happens in one place or ends at
            a single point. It&apos;s a journey that unfolds over time, through
            multiple stages of life.
          </p>
          <p>
            At iCollege Life, we think about learning as a connected progression
            — from foundational academic work and mentoring in the teenage
            years, through real-world experiences that support reflection and
            growth, to the gradual transition into adult and professional life.
          </p>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4">
        {stages.map((stage, index) => (
          <motion.div
            key={stage.number}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: index * 0.12, duration: duration.slow, ease: easing.apple }}
            whileHover={{ y: -4 }}
          >
            <div
              className="relative h-full rounded-2xl border border-white/10 overflow-hidden flex flex-col transition-all duration-300 hover:border-white/20"
              style={{ background: "oklch(0.18 0.01 255)" }}
            >
              <div className={`absolute top-0 left-0 right-0 h-0.5 ${stage.accent}`} aria-hidden />
              <div className="p-6 flex flex-col gap-4 flex-1">
                <span className="text-4xl font-bold text-background select-none tabular-nums">
                  {stage.number}
                </span>
                <h3 className="text-base font-bold text-background leading-snug">
                  {stage.title}
                </h3>
                <p className="text-sm font-medium text-background leading-relaxed">
                  {stage.description}
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
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-8 text-sm font-medium text-background leading-relaxed max-w-2xl"
      >
        Not every learner will follow the same path through these stages, but
        each can benefit from an approach that&apos;s intentional, structured,
        and designed to support their long-term development — not just the next
        test or application deadline.
      </motion.p>
    </SectionFrame>
  );
}
