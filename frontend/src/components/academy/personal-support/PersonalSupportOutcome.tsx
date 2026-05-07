"use client";

import { motion } from "motion/react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration, stagger } from "@/lib/animations";

const outcomes = [
  {
    label: "Manage their learning",
    description: "Students develop the habits, routines, and self-awareness to take ownership of their academic progress.",
  },
  {
    label: "Communicate effectively",
    description: "They learn to articulate ideas, ask for help when needed, and engage confidently with educators and peers.",
  },
  {
    label: "Make thoughtful decisions",
    description: "Guided self-reflection helps students think clearly about their future — from subject choices to life after school.",
  },
];

export function PersonalSupportOutcome() {
  return (
    <SectionFrame id="outcome" className="bg-foreground">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary mb-2">
            The Outcome
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-background">
            The goal of personal support is not dependence, but{" "}
            <span className="text-secondary">independence and confidence.</span>
          </h2>
          <p className="mt-5 text-sm sm:text-base font-light text-background leading-relaxed max-w-prose">
            Over time, students develop the ability to manage their learning,
            communicate effectively, and make thoughtful decisions about their
            future. Support fades as capability grows.
          </p>
        </motion.div>

        {/* Right: outcomes list */}
        <div className="flex flex-col gap-4">
          {outcomes.map((outcome, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                delay: i * stagger.cards,
                duration: duration.slow,
                ease: easing.apple,
              }}
            >
              <div
                className="relative rounded-2xl border border-white/10 p-5 hover:border-white/20 transition-all duration-300 overflow-hidden"
                style={{ background: "oklch(0.18 0.01 255)" }}
              >
                <div className="absolute top-0 left-0 bottom-0 w-0.5 bg-secondary" aria-hidden />
                <div className="pl-4">
                  <h3 className="text-sm font-semibold text-background mb-1">
                    {outcome.label}
                  </h3>
                  <p className="text-sm font-light text-background leading-relaxed">
                    {outcome.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
