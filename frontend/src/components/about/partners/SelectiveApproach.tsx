"use client";

import { motion } from "motion/react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration } from "@/lib/animations";

const criteria = [
  "Shared educational values and standards",
  "Commitment to safeguarding and responsibility",
  "Clarity of roles, expectations, and accountability",
  "Ability to deliver consistently and well",
];

export function SelectiveApproach() {
  return (
    <SectionFrame id="selective-approach" className="bg-foreground border-t border-white/10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary mb-2">
          Standards
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-background">
          A selective approach
        </h2>
        <p className="mt-4 text-sm sm:text-base font-light text-background leading-relaxed max-w-xl">
          We are deliberately selective in who we work with. All partnerships
          are evaluated against clear criteria:
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {criteria.map((criterion, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: index * 0.08, duration: duration.slow, ease: easing.apple }}
            whileHover={{ y: -3 }}
          >
            <div
              className="relative h-full rounded-2xl border border-white/10 p-5 transition-all duration-300 hover:border-white/20"
              style={{ background: "oklch(0.18 0.01 255)" }}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-secondary" aria-hidden />
              <p className="text-sm font-medium text-background">{criterion}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="space-y-3 text-sm sm:text-base font-light text-background leading-relaxed max-w-2xl"
      >
        <p className="font-semibold text-background border-l-2 border-secondary pl-4">
          If alignment is not clear, we do not proceed.
        </p>
        <p>
          This approach protects quality, trust, and coherence across
          everything we offer.
        </p>
      </motion.div>
    </SectionFrame>
  );
}
