"use client";

import { motion } from "motion/react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration } from "@/lib/animations";

const priorities = [
  "Depth of experience",
  "Alignment of judgement and approach",
  "Clarity of roles and responsibility",
];

export function ContributorsCollaborators() {
  return (
    <SectionFrame id="contributors-collaborators" className="bg-background border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
          Team
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground">
          Contributors & collaborators
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="space-y-4 text-sm sm:text-base font-light text-foreground leading-relaxed"
        >
          <p>
            iCollege Life works with a small group of educators, mentors, and
            collaborators who share its values and standards.
          </p>
          <p>Rather than building large teams quickly, we prioritise:</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-3">
          {priorities.map((priority, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: index * 0.1, duration: duration.slow, ease: easing.apple }}
              whileHover={{ y: -2 }}
              className="relative rounded-2xl bg-card border border-border shadow-sm p-5 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary" aria-hidden />
              <p className="text-sm font-medium text-foreground">{priority}</p>
            </motion.div>
          ))}
          <p className="text-sm font-light text-foreground leading-relaxed pt-2">
            This allows the organisation to remain coherent, responsive, and
            grounded as it develops.
          </p>
        </div>
      </div>
    </SectionFrame>
  );
}
