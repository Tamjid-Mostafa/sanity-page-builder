"use client";

import { motion } from "motion/react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";

const framework = [
  "Clear safeguarding arrangements",
  "Transparent communication with families and participants",
  "Agreed standards for delivery and conduct",
  "Regular review and evaluation",
];

export function ResponsibilityOversight() {
  return (
    <SectionFrame id="responsibility-oversight" className="bg-foreground border-t border-white/10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary mb-2">
          Oversight
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-background">
          Responsibility and oversight
        </h2>
        <p className="mt-4 text-sm sm:text-base font-light text-background leading-relaxed max-w-xl">
          All partnerships operate within a framework of responsibility and
          oversight. This includes:
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {framework.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
          >
            <div
              className="relative h-full rounded-2xl border border-white/10 p-5 transition-all duration-300"
              style={{ background: "oklch(0.18 0.01 255)" }}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-secondary" aria-hidden />
              <p className="text-sm font-light text-background">{item}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="rounded-2xl border border-white/10 p-6 max-w-2xl"
        style={{ background: "oklch(0.18 0.01 255)" }}
      >
        <p className="text-base font-semibold text-background leading-snug border-l-2 border-secondary pl-4">
          Collaboration does not dilute responsibility. It requires more of it.
        </p>
      </motion.div>
    </SectionFrame>
  );
}
