"use client";

import { motion } from "motion/react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { stagger } from "@/lib/animations";

const keyPoints = [
  "Most students join in September for the start of the academic year",
  "Mid-year admissions may be available depending on cohort availability",
  "Because places are limited, families are encouraged to begin conversations months in advance",
  "Early contact ensures the admissions process can be completed without pressure",
];

export function AdmissionsWhenToApply() {
  return (
    <SectionFrame id="when-to-apply" className="bg-background">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
          Timing
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground">
          When to Apply
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
            iCollege Academy operates on an academic year beginning in
            September. Most families begin the admissions process in the spring
            or early summer ahead of their intended start date.
          </p>
          <p>
            There is no formal application deadline, but places are limited and
            are allocated as part of an ongoing admissions process.
          </p>
          <p className="text-sm font-semibold text-foreground leading-relaxed border-l-2 border-primary pl-4">
            The earlier a family makes contact, the better we are able to
            support a considered and unhurried admissions process.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-card rounded-2xl border border-border shadow-sm p-6"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-4">
            Key points
          </p>
          <ul className="space-y-4">
            {keyPoints.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * stagger.list, duration: 0.4 }}
                className="flex items-start gap-3 text-sm sm:text-base font-medium text-foreground leading-relaxed"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </SectionFrame>
  );
}
