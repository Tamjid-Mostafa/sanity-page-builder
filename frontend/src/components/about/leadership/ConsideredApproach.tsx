"use client";

import { motion } from "motion/react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";

const principles = [
  "What can be delivered well",
  "What genuinely serves learners and families",
  "What maintains quality, safeguards, and trust",
];

export function ConsideredApproach() {
  return (
    <SectionFrame id="considered-approach" className="bg-foreground border-t border-white/10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary mb-2">
          Growth
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-background">
          A considered approach to growth
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="space-y-4 text-sm sm:text-base font-light text-background leading-relaxed"
        >
          <p>
            iCollege Life is intentionally not built for rapid or unchecked
            expansion. Leadership decisions are guided by:
          </p>
          <ul className="space-y-2.5">
            {principles.map((p, i) => (
              <li key={i} className="flex items-start gap-3 text-sm sm:text-base font-light text-background">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                {p}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="space-y-4 text-sm sm:text-base font-light text-background leading-relaxed"
        >
          <p>
            New programmes, partnerships, and directions are introduced only
            when they align with the organisation&apos;s purpose and can be
            supported responsibly.
          </p>
          <p className="font-semibold text-background border-l-2 border-secondary pl-4">
            This restraint is deliberate.
          </p>
        </motion.div>
      </div>
    </SectionFrame>
  );
}
