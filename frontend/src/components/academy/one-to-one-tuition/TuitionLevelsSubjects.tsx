"use client";

import { motion } from "motion/react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration, stagger } from "@/lib/animations";

const levels = [
  "GCSEs",
  "A-Levels",
  "Equivalent international qualifications",
];

const subjects = [
  "Mathematics",
  "English (Language & Literature)",
  "Biology, Chemistry, Physics",
  "History, Geography",
  "Business Studies, Economics",
  "Spanish and French",
  "Other subjects where suitable",
];

export function TuitionLevelsSubjects() {
  return (
    <SectionFrame id="levels-subjects" className="bg-foreground">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary mb-2">
          Qualifications
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-background">
          Levels & Subjects
        </h2>
        <p className="mt-4 text-sm sm:text-base font-light text-background leading-relaxed max-w-xl">
          Private tuition is available for a wide range of levels and subject areas.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Levels card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ delay: 0, duration: duration.slow, ease: easing.apple }}
          whileHover={{ y: -4 }}
          className="group"
        >
          <div
            className="relative h-full rounded-2xl border border-white/10 overflow-hidden flex flex-col transition-all duration-300 hover:border-white/20"
            style={{ background: "oklch(0.18 0.01 255)" }}
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary" aria-hidden />
            <div className="flex flex-col p-6 flex-1 gap-5">
              <h3 className="text-xl font-heading font-bold text-background">
                Levels
              </h3>
              <ul className="space-y-3">
                {levels.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * stagger.list, duration: 0.4 }}
                    className="flex items-start gap-2.5 text-sm font-light text-background leading-relaxed"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Subjects card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ delay: stagger.cards, duration: duration.slow, ease: easing.apple }}
          whileHover={{ y: -4 }}
          className="group"
        >
          <div
            className="relative h-full rounded-2xl border border-white/10 overflow-hidden flex flex-col transition-all duration-300 hover:border-white/20"
            style={{ background: "oklch(0.18 0.01 255)" }}
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-secondary" aria-hidden />
            <div className="flex flex-col p-6 flex-1 gap-5">
              <h3 className="text-xl font-heading font-bold text-background">
                Subjects
              </h3>
              <ul className="space-y-3">
                {subjects.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * stagger.list, duration: 0.4 }}
                    className="flex items-start gap-2.5 text-sm font-light text-background leading-relaxed"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                    {item}
                  </motion.li>
                ))}
              </ul>
              <p className="text-sm font-light text-background leading-relaxed pt-1">
                Subject availability depends on tutor expertise and demand.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionFrame>
  );
}
