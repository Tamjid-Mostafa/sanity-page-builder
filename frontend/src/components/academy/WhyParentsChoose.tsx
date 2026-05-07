"use client";

import { motion } from "motion/react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration, stagger } from "@/lib/animations";

const reasons = [
  "Academic seriousness without unnecessary pressure",
  "Personal attention without compromise",
  "Clear pathways without forcing one definition of success",
];

export function WhyParentsChoose() {
  return (
    <SectionFrame id="why-parents-choose" className="bg-foreground">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary mb-2">
          For families
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-background">
          Why parents choose iCollege Academy
        </h2>
        <p className="mt-4 text-sm sm:text-base font-light text-background leading-relaxed max-w-xl">
          Because it offers:
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {reasons.map((reason, index) => (
          <motion.div
            key={reason}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              delay: index * stagger.cards,
              duration: duration.slow,
              ease: easing.apple,
            }}
            whileHover={{ y: -4 }}
            className="group"
          >
            <div
              className="relative h-full rounded-2xl border border-white/10 p-6 flex items-center transition-all duration-300 hover:border-white/20"
              style={{ background: "oklch(0.18 0.01 255)" }}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-secondary" aria-hidden />
              <p className="text-base font-semibold text-background leading-snug">
                {reason}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-sm font-semibold text-background leading-relaxed border-l-2 border-secondary pl-4 max-w-2xl"
      >
        This is education designed for the world students are actually entering.
      </motion.p>
    </SectionFrame>
  );
}
