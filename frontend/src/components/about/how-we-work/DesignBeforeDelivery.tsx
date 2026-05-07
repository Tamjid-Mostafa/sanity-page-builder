"use client";

import { motion } from "motion/react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";

const questions = [
  "What problem does this solve — and for whom?",
  "Is this appropriate for the learner's stage of life?",
  "Does it add clarity, confidence, and direction?",
  "Can it be delivered responsibly and well?",
];

export function DesignBeforeDelivery() {
  return (
    <SectionFrame id="design-before-delivery" className="bg-background border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="border-l-2 border-primary pl-6 md:pl-8 space-y-6 max-w-3xl"
      >
        <span className="block text-4xl md:text-5xl font-heading font-bold text-primary tabular-nums">
          01
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground">
          Design before delivery
        </h2>
        <div className="space-y-4 text-sm sm:text-base font-light text-foreground leading-relaxed">
          <p>
            At iCollege Life, programmes are not assembled quickly or
            reactively. They are designed with intention — shaped around what
            genuinely serves people at different stages of life.
          </p>
          <p className="font-semibold text-foreground">
            Before we introduce anything new, we ask:
          </p>
          <ul className="space-y-2 border-l-2 border-border pl-5">
            {questions.map((q, i) => (
              <li key={i} className="text-sm sm:text-base font-light text-foreground">
                {q}
              </li>
            ))}
          </ul>
          <p className="font-semibold text-foreground italic">
            If the answer is unclear, we do not proceed.
          </p>
          <p>
            This design-led approach ensures that growth remains thoughtful,
            measured, and aligned with our purpose.
          </p>
        </div>
      </motion.div>
    </SectionFrame>
  );
}
