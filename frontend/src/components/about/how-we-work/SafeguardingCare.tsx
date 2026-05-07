"use client";

import { motion } from "motion/react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { stagger } from "@/lib/animations";

const items = [
  "Safeguarding and duty of care",
  "Clear boundaries and expectations",
  "Calm, structured environments",
  "Open communication with families and partners",
  "Respect for each individual as a person, not just a student",
];

export function SafeguardingCare() {
  return (
    <SectionFrame id="safeguarding-care" className="bg-background border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="border-l-2 border-primary pl-6 md:pl-8 space-y-6 max-w-3xl"
      >
        <span className="block text-4xl md:text-5xl font-heading font-bold text-primary tabular-nums">
          04
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground">
          Safeguarding, care, and responsibility
        </h2>
        <div className="space-y-4 text-sm sm:text-base font-light text-foreground leading-relaxed">
          <p>
            Working with young people and families carries responsibility.
            Our approach is shaped by:
          </p>
          <ul className="space-y-2.5">
            {items.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * stagger.list, duration: 0.4 }}
                className="flex items-start gap-3 text-sm sm:text-base font-light text-foreground"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {item}
              </motion.li>
            ))}
          </ul>
          <p>
            Students are treated as young adults — guided carefully, trusted
            appropriately, and supported as they develop judgement, confidence,
            and independence.
          </p>
          <p className="font-semibold text-foreground">
            Safety, well-being, and trust are never secondary considerations.
          </p>
        </div>
      </motion.div>
    </SectionFrame>
  );
}
