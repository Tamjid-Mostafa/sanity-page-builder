"use client";

import { motion } from "motion/react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration, stagger } from "@/lib/animations";

const philosophy = [
  "Safeguarding and duty of care",
  "Clear boundaries and expectations",
  "Open communication with families and partners",
  "Respect for each learner as an individual",
];

const environment = ["Calm", "Structured", "Supportive", "Appropriately challenging"];

export function ResponsibilityCare() {
  return (
    <SectionFrame id="responsibility-care" className="bg-background border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
          Trust & care
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground">
          Responsibility, care, and judgement
        </h2>
        <p className="mt-4 text-sm sm:text-base font-medium text-foreground leading-relaxed max-w-2xl">
          We create real-world learning environments that blur the lines between
          education, work, and life. That comes with responsibility, and we
          design for that carefully.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ delay: 0, duration: duration.slow, ease: easing.apple }}
          whileHover={{ y: -4 }}
        >
          <div className="relative h-full rounded-2xl bg-foreground overflow-hidden flex flex-col">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary" aria-hidden />
            <div className="p-6 flex flex-col gap-4 flex-1">
              <h3 className="text-base font-bold text-background">
                Our philosophy includes:
              </h3>
              <ul className="space-y-3">
                {philosophy.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * stagger.list, duration: 0.4 }}
                    className="flex items-start gap-3 text-sm font-medium text-background leading-relaxed"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ delay: stagger.cards, duration: duration.slow, ease: easing.apple }}
          whileHover={{ y: -4 }}
        >
          <div className="relative h-full rounded-2xl bg-card border border-border shadow-sm overflow-hidden flex flex-col">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-secondary" aria-hidden />
            <div className="p-6 flex flex-col gap-4 flex-1">
              <h3 className="text-base font-bold text-foreground">
                We aim to create environments that are:
              </h3>
              <div className="flex flex-wrap gap-2">
                {environment.map((trait, index) => (
                  <motion.span
                    key={trait}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06, duration: 0.3 }}
                    whileHover={{ scale: 1.04 }}
                    className="inline-block px-3 py-1.5 rounded-full bg-foreground text-sm font-semibold text-background cursor-default"
                  >
                    {trait}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="rounded-2xl bg-card border border-border p-6"
      >
        <p className="text-sm sm:text-base font-medium text-foreground leading-relaxed max-w-2xl">
          Students are treated as young adults — guided, trusted, and supported
          to take increasing responsibility for their own learning and choices,
          within a framework that&apos;s designed with their safety, wellbeing,
          and long-term development in mind.
        </p>
      </motion.div>
    </SectionFrame>
  );
}
