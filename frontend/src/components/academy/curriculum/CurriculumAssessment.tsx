"use client";

import { motion } from "motion/react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { stagger } from "@/lib/animations";

const progressMethods = [
  "Regular formative assessments",
  "Termly summative assessment",
  "Ongoing teacher feedback",
  "Individual learning plans",
  "Clear reporting to families",
];

export function CurriculumAssessment() {
  return (
    <SectionFrame id="assessment-progress" className="bg-background">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
          Academic progress
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground">
          Assessment & Progress
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
            Students gradually take increasing responsibility for their own
            learning and progress. This is part of how the Academy develops
            independence and academic maturity alongside qualifications.
          </p>
          <p>
            Families are kept informed throughout the year through regular
            reporting and direct communication with the Academy team.
          </p>
          <p className="text-sm font-semibold text-foreground leading-relaxed border-l-2 border-primary pl-4">
            Progress is measured honestly — against each student&apos;s individual
            starting point, not a one-size-fits-all standard.
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
            Progress is monitored through
          </p>
          <ul className="space-y-4">
            {progressMethods.map((item, i) => (
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
