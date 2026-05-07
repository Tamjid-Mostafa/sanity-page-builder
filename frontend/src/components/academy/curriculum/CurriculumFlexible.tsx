"use client";

import { motion } from "motion/react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { stagger } from "@/lib/animations";

const principles = [
  "Students moving between education systems",
  "Re-engaging with formal study after a break",
  "Requiring a transitional academic plan before a full pathway",
  "Needing a blended approach to qualification delivery",
];

export function CurriculumFlexible() {
  return (
    <SectionFrame id="flexible-arrangements" className="bg-background">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
          Flexible learning
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground">
          Flexible Academic Arrangements
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
            Some students benefit from blended or transitional academic plans,
            particularly when moving between education systems or re-engaging
            with study.
          </p>
          <p>
            Where appropriate, we work with families to design academic
            arrangements that remain rigorous while supporting the student&apos;s
            overall development.
          </p>
          <p className="text-sm font-semibold text-foreground leading-relaxed border-l-2 border-primary pl-4">
            These plans are discussed individually and implemented with care.
            Flexibility does not mean reduced expectations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-card rounded-2xl border border-border shadow-sm p-6"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-4">
            This may suit students who are
          </p>
          <ul className="space-y-4">
            {principles.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * stagger.list, duration: 0.4 }}
                className="flex items-start gap-3 text-sm sm:text-base font-medium text-foreground leading-relaxed"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </SectionFrame>
  );
}
