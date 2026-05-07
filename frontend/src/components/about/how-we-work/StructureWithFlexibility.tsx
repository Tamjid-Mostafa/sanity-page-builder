"use client";

import { motion } from "motion/react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";

export function StructureWithFlexibility() {
  return (
    <SectionFrame id="structure-with-flexibility" className="bg-background border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="border-l-2 border-primary pl-6 md:pl-8 space-y-6 max-w-3xl"
      >
        <span className="block text-4xl md:text-5xl font-heading font-bold text-primary tabular-nums">
          02
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground">
          Structure with flexibility
        </h2>
        <div className="space-y-4 text-sm sm:text-base font-light text-foreground leading-relaxed">
          <p>
            Flexibility is a core value at iCollege Life — but it is never
            unstructured. Learning is shaped around individual students and
            families while remaining grounded in clear expectations, defined
            standards, and accountability and follow-through.
          </p>
          <p>
            This balance allows us to adapt learning thoughtfully without
            losing direction or academic seriousness.
          </p>
          <p className="font-semibold text-foreground">
            Flexibility exists to support better outcomes — not to lower
            expectations.
          </p>
        </div>
      </motion.div>
    </SectionFrame>
  );
}
