"use client";

import { motion } from "motion/react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration, stagger } from "@/lib/animations";

const details = [
  "Cohorts typically sit between 2 and 15 students",
  "Each learner is known individually and supported appropriately",
  "Individual subject teaching may be required depending on subject combinations",
  "Where applicable, individual arrangements are discussed transparently during admissions",
];

export function AdmissionsCohortSize() {
  return (
    <SectionFrame id="cohort-size" className="bg-foreground">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary mb-2">
          Environment
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-background">
          Cohort Size
        </h2>
        <p className="mt-4 text-sm sm:text-base font-light text-background leading-relaxed max-w-2xl">
          iCollege Academy operates with intentionally small cohorts, ensuring
          that each learner is known individually and supported appropriately.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="space-y-4 text-sm sm:text-base font-light text-background leading-relaxed"
        >
          <p>
            Small cohorts are not simply a feature of iCollege Academy — they
            are a core part of how the Academy works. When a teacher knows
            every student, learning becomes genuinely personalised.
          </p>
          <p>
            Subject combinations can vary significantly between students, and
            the Academy structures teaching to accommodate each individual
            academic pathway.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ul className="space-y-4">
            {details.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * stagger.list, duration: duration.slow, ease: easing.apple }}
                className="flex items-start gap-3 text-sm sm:text-base font-medium text-background leading-relaxed"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-10 text-sm font-semibold text-background leading-relaxed border-l-2 border-secondary pl-4 max-w-2xl"
      >
        Small cohorts are what make the Academy different — not just in
        experience, but in outcomes.
      </motion.p>
    </SectionFrame>
  );
}
