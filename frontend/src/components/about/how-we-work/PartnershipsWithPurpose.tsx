"use client";

import { motion } from "motion/react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";

export function PartnershipsWithPurpose() {
  return (
    <SectionFrame id="partnerships" className="bg-background border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="border-l-2 border-primary pl-6 md:pl-8 space-y-6 max-w-3xl"
      >
        <span className="block text-4xl md:text-5xl font-heading font-bold text-primary tabular-nums">
          06
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground">
          Partnerships with purpose
        </h2>
        <div className="space-y-4 text-sm sm:text-base font-light text-foreground leading-relaxed">
          <p>
            We work with a small number of carefully chosen partners —
            schools, institutions, and organisations that share our values
            and standards. Partnerships are built on mutual trust, clarity
            of roles and responsibility, and shared commitment to quality
            and safeguarding.
          </p>
          <p className="font-semibold text-foreground">
            We prioritise depth of collaboration over scale, and alignment
            over expansion.
          </p>
        </div>
      </motion.div>
    </SectionFrame>
  );
}
