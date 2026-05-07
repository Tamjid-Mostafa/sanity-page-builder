"use client";

import { motion } from "motion/react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";

export function GrowingResponsibly() {
  return (
    <SectionFrame id="growing-responsibly" className="bg-foreground border-t border-white/10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="border-l-2 border-secondary pl-6 md:pl-8 space-y-6 max-w-3xl"
      >
        <span className="block text-4xl md:text-5xl font-heading font-bold text-secondary tabular-nums">
          07
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-background">
          Growing responsibly
        </h2>
        <div className="space-y-4 text-sm sm:text-base font-light text-background leading-relaxed">
          <p>
            iCollege Life is intentionally designed to grow steadily and
            responsibly. We do not pursue growth for its own sake. Instead,
            all development is guided by a single design question:
          </p>
          <p className="border-l-2 border-secondary pl-5 font-semibold text-background text-base sm:text-lg">
            What genuinely serves people at each stage of life?
          </p>
          <p>
            This principle shapes every decision — from programmes and
            environments to partnerships and future directions.
          </p>
        </div>
      </motion.div>
    </SectionFrame>
  );
}
