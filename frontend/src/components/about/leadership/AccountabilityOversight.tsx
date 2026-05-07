"use client";

import { motion } from "motion/react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";

const responsibilities = [
  "Safeguarding and duty of care",
  "Educational quality and integrity",
  "Ethical use of technology and data",
  "Clear communication and transparency",
];

export function AccountabilityOversight() {
  return (
    <SectionFrame id="accountability-oversight" className="bg-foreground border-t border-white/10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary mb-2">
          Accountability
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-background">
          Accountability and oversight
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="space-y-4 text-sm sm:text-base font-light text-background leading-relaxed"
        >
          <p>
            Leadership at iCollege Life is accountable to students, families,
            partners, and the broader community in which it operates.
          </p>
          <p>This includes responsibility for:</p>
          <ul className="space-y-2.5 mt-4">
            {responsibilities.map((r, i) => (
              <li key={i} className="flex items-start gap-3 text-sm sm:text-base font-light text-background">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                {r}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="rounded-2xl border border-white/10 p-6 md:p-8"
          style={{ background: "oklch(0.18 0.01 255)" }}
        >
          <p className="text-base font-semibold text-background leading-relaxed border-l-2 border-secondary pl-4">
            Leadership is not a title. It is a commitment to careful
            decision-making over time.
          </p>
        </motion.div>
      </div>
    </SectionFrame>
  );
}
