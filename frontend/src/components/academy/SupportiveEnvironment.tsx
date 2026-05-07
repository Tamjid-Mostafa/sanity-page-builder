"use client";

import { motion } from "motion/react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";

const includes = [
  "Clear expectations and routines",
  "Ongoing mentoring, guidance, and pastoral oversight where needed",
  "Clear and natural communication with families",
  "Safeguarding and student well-being are taken seriously.",
];

export function SupportiveEnvironment() {
  return (
    <SectionFrame id="supportive-environment" className="bg-background">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
          Student wellbeing
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground">
          A supportive & responsible environment
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="space-y-4 text-sm sm:text-base font-light text-foreground leading-relaxed"
        >
          <p>
            iCollege Academy provides a calm, structured environment where
            students feel supported — academically and personally.
          </p>
          <p>This includes:</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-3"
        >
          {includes.map((item, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              whileHover={{ scale: 1.03 }}
              className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-foreground border border-border bg-card cursor-default transition-shadow duration-200 hover:shadow-sm"
            >
              {item}
            </motion.span>
          ))}
          <p className="w-full text-sm font-light text-foreground leading-relaxed pt-2">
            Students are treated as young adults, while still receiving the
            guidance they need.
          </p>
        </motion.div>
      </div>
    </SectionFrame>
  );
}
