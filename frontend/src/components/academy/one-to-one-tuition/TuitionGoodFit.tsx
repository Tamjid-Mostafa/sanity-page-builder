"use client";

import { motion } from "motion/react";
import { CheckCircle2, MinusCircle } from "lucide-react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration, stagger } from "@/lib/animations";

const goodFitBullets = [
  "Need focused academic support in one or more subjects",
  "Are preparing for upcoming GCSE or A-Level examinations",
  "Want subject extension, enrichment, or challenge",
  "Need reliable, structured catch-up tutoring",
];

const notDesignedFor = [
  "Replace full-time schooling or a complete academic programme",
  "Provide pastoral support, mentoring, or broader guidance",
  "Cover every subject simultaneously across all levels",
];

export function TuitionGoodFit() {
  return (
    <SectionFrame id="good-fit" className="bg-background">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
          Admissions
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground">
          A Good Fit For
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Good fit */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ delay: 0, duration: duration.slow, ease: easing.apple }}
          whileHover={{ y: -4 }}
          className="group"
        >
          <div className="relative h-full rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary" aria-hidden />
            <div className="flex flex-col p-6 flex-1 gap-5">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
                  <CheckCircle2 className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground">
                  Students who need
                </h3>
              </div>
              <ul className="space-y-2.5">
                {goodFitBullets.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * stagger.list, duration: 0.4 }}
                    className="flex items-start gap-2.5 text-sm font-light text-foreground leading-relaxed"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Not designed for */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ delay: stagger.cards, duration: duration.slow, ease: easing.apple }}
          whileHover={{ y: -4 }}
          className="group"
        >
          <div className="relative h-full rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-border" aria-hidden />
            <div className="flex flex-col p-6 flex-1 gap-5">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-muted">
                  <MinusCircle className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground">
                  Not designed to
                </h3>
              </div>
              <p className="text-sm font-light text-foreground leading-relaxed">
                Private tuition is not designed to:
              </p>
              <ul className="space-y-2.5">
                {notDesignedFor.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm font-light text-foreground leading-relaxed"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionFrame>
  );
}
