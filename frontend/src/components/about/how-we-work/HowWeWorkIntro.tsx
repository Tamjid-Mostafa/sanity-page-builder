"use client";

import { motion } from "motion/react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";

export function HowWeWorkIntro() {
  return (
    <SectionFrame className="bg-background border-t border-border">
      <div className="grid md:grid-cols-2 gap-10 lg:gap-20 items-start">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
            Seven principles
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground mb-8">
            How we design, deliver, and support learning
          </h2>
          <div className="space-y-4 text-sm sm:text-base font-light text-foreground leading-relaxed">
            <p>
              iCollege Life is built around clear principles that shape how
              every programme, relationship, and decision is approached.
            </p>
            <p>
              These principles are not aspirational statements. They are the
              practical framework behind how we operate — from initial design
              through to long-term development.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative rounded-2xl bg-card border border-border shadow-sm p-6 md:p-8 overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-secondary" aria-hidden />
          <p className="text-lg sm:text-xl font-heading font-semibold text-foreground leading-snug mb-6">
            &ldquo;How we work matters as much as what we offer.&rdquo;
          </p>
          <p className="text-sm font-light text-foreground leading-relaxed">
            Our commitment is to clarity, care, and thoughtful design — so
            that learners, families, and partners can place their trust in the
            way iCollege Life operates today and grows over time.
          </p>
        </motion.div>
      </div>
    </SectionFrame>
  );
}
