"use client";

import { motion } from "motion/react";
import { AthletesCTAButtons } from "@/components/athletes/AthletesCTAButtons";

const trustPoints = [
  "Limited September places",
  "~30-minute conversation",
  "No pressure or obligation",
];

export function AthletesFinalCTA() {
  return (
    <section
      id="athletes-cta"
      className="py-16 md:py-28 bg-foreground overflow-hidden scroll-mt-20"
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary mb-4"
          >
            Take the next step
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-bold leading-tight tracking-tight text-background text-3xl sm:text-4xl md:text-[2.65rem] mb-4"
          >
            Ready to explore if this is the right fit?
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="mb-10"
          >
            <AthletesCTAButtons tone="on-dark" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
          >
            {trustPoints.map((point, i) => (
              <span
                key={point}
                className="flex items-center gap-2 text-xs text-background/50"
              >
                {i !== 0 && (
                  <span className="h-3 w-px bg-white/15" aria-hidden />
                )}
                <span
                  className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0"
                  aria-hidden
                />
                {point}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
