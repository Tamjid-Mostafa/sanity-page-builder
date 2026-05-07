"use client";

import { motion } from "motion/react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";

const interests = [
  "Long-term relationships rather than short-term transactions",
  "Depth of collaboration rather than volume of partnerships",
  "Work that genuinely serves learners and families",
];

export function GrowingEcosystem() {
  return (
    <SectionFrame id="growing-ecosystem" className="bg-background border-t border-border">
      <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
            Vision
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground mb-8">
            Growing an educational ecosystem
          </h2>
          <div className="space-y-4 text-sm sm:text-base font-light text-foreground leading-relaxed">
            <p>
              Over time, iCollege Life aims to contribute to a broader
              educational ecosystem — one built on trust, thoughtful design,
              and shared purpose.
            </p>
            <p>We are interested in:</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="space-y-3"
        >
          <ul className="space-y-3">
            {interests.map((interest, i) => (
              <li key={i} className="flex items-start gap-3 text-sm sm:text-base font-light text-foreground leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                {interest}
              </li>
            ))}
          </ul>
          <p className="text-sm font-light text-foreground leading-relaxed pt-2">
            Growth is guided not only by opportunity but also by suitability
            and alignment.
          </p>
        </motion.div>
      </div>
    </SectionFrame>
  );
}
