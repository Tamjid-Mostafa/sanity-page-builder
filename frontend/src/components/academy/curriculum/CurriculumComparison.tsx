"use client";

import { motion } from "motion/react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration } from "@/lib/animations";

const rows = [
  { label: "Qualifications", uk: "GCSEs & A Levels", us: "US High School Diploma" },
  { label: "Structure", uk: "Focused subject depth", us: "Broad credit-based curriculum" },
  { label: "Assessment", uk: "Final external examinations", us: "Continuous coursework" },
  { label: "Learning style", uk: "Academic specialisation", us: "Flexible subject mix" },
  { label: "Common destination", uk: "UK & international universities", us: "US & international universities" },
];

export function CurriculumComparison() {
  return (
    <SectionFrame id="pathway-comparison" className="bg-background">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
          At a glance
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground">
          Academic Pathways Comparison
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden"
      >
        {/* Header */}
        <div className="grid grid-cols-3 border-b border-border">
          <div className="px-5 py-4 sm:px-6 sm:py-5" />
          <div className="px-5 py-4 sm:px-6 sm:py-5 border-l border-border">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              UK Pathway
            </p>
            <p className="text-sm font-bold text-foreground mt-0.5">
              GCSEs & A Levels
            </p>
          </div>
          <div className="px-5 py-4 sm:px-6 sm:py-5 border-l border-border">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary">
              US Pathway
            </p>
            <p className="text-sm font-bold text-foreground mt-0.5">
              High School Diploma
            </p>
          </div>
        </div>

        {/* Rows */}
        {rows.map((row, i) => (
          <motion.div
            key={row.label}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: duration.slow, ease: easing.apple }}
            className="grid grid-cols-3 border-b border-border last:border-0"
          >
            <div className="px-5 py-4 sm:px-6 sm:py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground">
                {row.label}
              </p>
            </div>
            <div className="px-5 py-4 sm:px-6 sm:py-5 border-l border-border">
              <p className="text-sm font-light text-foreground leading-relaxed">
                {row.uk}
              </p>
            </div>
            <div className="px-5 py-4 sm:px-6 sm:py-5 border-l border-border">
              <p className="text-sm font-light text-foreground leading-relaxed">
                {row.us}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-6 text-sm font-semibold text-foreground leading-relaxed border-l-2 border-primary pl-4 max-w-2xl"
      >
        Both pathways are internationally recognised and supported through
        personalised academic guidance.
      </motion.p>
    </SectionFrame>
  );
}
