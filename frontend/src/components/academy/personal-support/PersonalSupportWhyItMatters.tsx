"use client";

import { motion } from "motion/react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration, stagger } from "@/lib/animations";

const reasons = [
  {
    heading: "They feel known.",
    body: "Small cohorts mean every student is understood as an individual — not a number in a register.",
  },
  {
    heading: "They feel supported.",
    body: "Proactive mentoring and regular check-ins mean students are never left to struggle silently.",
  },
  {
    heading: "They feel understood.",
    body: "Between 15 and 18, young people are managing academic expectations alongside confidence, identity, and future planning.",
  },
];

export function PersonalSupportWhyItMatters() {
  return (
    <SectionFrame id="why-it-matters" className="bg-background">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left: text */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
            Why It Matters
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground">
            Students learn best when they feel known, supported, and understood.
          </h2>
          <p className="mt-5 text-sm sm:text-base font-light text-foreground leading-relaxed max-w-prose">
            Between the ages of 15 and 18, young people are managing academic
            expectations while also developing confidence, identity, and plans
            for the future. At iCollege Academy, personal support is built into
            the programme so students can move forward with clarity, focus, and
            calm guidance.
          </p>
        </motion.div>

        {/* Right: reason cards */}
        <div className="flex flex-col gap-4">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                delay: i * stagger.cards,
                duration: duration.slow,
                ease: easing.apple,
              }}
              className="group relative rounded-2xl bg-card border border-border p-5 flex gap-4 items-start shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
            >
              <div className="absolute top-0 left-0 bottom-0 w-0.5 bg-primary" aria-hidden />
              <div className="pl-3">
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  {reason.heading}
                </h3>
                <p className="text-sm font-light text-foreground leading-relaxed">
                  {reason.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
