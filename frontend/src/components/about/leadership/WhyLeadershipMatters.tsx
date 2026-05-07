"use client";

import { motion } from "motion/react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";

export function WhyLeadershipMatters() {
  return (
    <SectionFrame id="why-leadership-matters" className="bg-background border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
          Leadership
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground mb-8">
          Why leadership matters in education
        </h2>
        <div className="space-y-4 text-sm sm:text-base font-light text-foreground leading-relaxed max-w-3xl">
          <p>Education is neither neutral nor mechanical.</p>
          <p>
            Decisions about learning, structure, boundaries, and progression
            shape how people understand themselves and engage with the world
            they are entering. They require experience, perspective, and
            responsibility.
          </p>
          <p>
            At iCollege Life, leadership exists not to control learning, but
            to design the conditions in which people can develop confidence,
            capability, and direction over time.
          </p>
          <p className="font-semibold text-foreground border-l-2 border-secondary pl-4">
            Responsibility before systems.
          </p>
        </div>
      </motion.div>
    </SectionFrame>
  );
}
