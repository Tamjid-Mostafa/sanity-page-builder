"use client";

import { motion } from "motion/react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";

export function WhyPartnershipsMatter() {
  return (
    <SectionFrame id="why-partnerships-matter" className="bg-background border-t border-border">
      <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
            Partnerships
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground mb-8">
            Why partnerships matter
          </h2>
          <div className="space-y-4 text-sm sm:text-base font-light text-foreground leading-relaxed">
            <p>Education does not exist in isolation.</p>
            <p>
              Relationships among educators, institutions, companies, and
              communities shape high-quality learning experiences. When chosen
              carefully, collaboration strengthens quality, perspective, and
              opportunity.
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="space-y-4 text-sm sm:text-base font-light text-foreground leading-relaxed"
        >
          <p>
            At iCollege Life, partnerships are not pursued for scale or
            visibility. They are formed to deepen learning, extend experience,
            and support people at different stages of life.
          </p>
          <p className="font-semibold text-foreground border-l-2 border-secondary pl-4">
            No institution stands alone.
          </p>
        </motion.div>
      </div>
    </SectionFrame>
  );
}
