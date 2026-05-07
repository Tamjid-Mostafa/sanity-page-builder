"use client";

import { motion } from "motion/react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration, stagger } from "@/lib/animations";

const progressions = [
  "UK, US, and international universities",
  "Global experiences and structured transitional programmes",
  "Entrepreneurial or alternative pathways",
  "Further academic or professional development",
];

export function OutcomesDirection() {
  return (
    <SectionFrame id="outcomes-direction" className="bg-background">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
          After Academy
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground">
          Outcomes & direction
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="space-y-4 text-sm sm:text-base font-light text-foreground leading-relaxed"
        >
          <p>
            Our goal is not simply for students to finish school, but to move
            forward with clarity and confidence.
          </p>
          <p>iCollege Academy supports progression into:</p>
          <p className="text-sm font-light text-foreground leading-relaxed">
            We work closely with students and families to ensure next steps are
            thoughtful, realistic, and well-prepared.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-card rounded-2xl border border-border shadow-sm p-6"
        >
          <ul className="space-y-4">
            {progressions.map((prog, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * stagger.list, duration: 0.4 }}
                className="flex items-start gap-3 text-sm sm:text-base font-medium text-foreground leading-relaxed"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {prog}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </SectionFrame>
  );
}
