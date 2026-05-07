"use client";

import { motion } from "motion/react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Core Academy",
    price: "€17,500",
    period: "per academic year",
    accentBar: "bg-primary",
    colorClass: "text-primary",
    description:
      "Designed for students whose subjects are primarily taught in small academic cohorts.",
    includes: [
      "Small-cohort academic teaching",
      "Structured academic timetable",
      "Mentoring and academic guidance",
      "University pathway preparation",
      "Personal development and life-design frameworks",
    ],
  },
  {
    name: "Enhanced Hybrid",
    price: "€21,500",
    period: "per academic year",
    accentBar: "bg-secondary",
    colorClass: "text-secondary",
    description:
      "Includes the full Core Academy Programme together with increased levels of personalised weekly 1-to-1 teaching lessons.",
    includes: [
      "Everything in Core Academy",
      "Increased personalised 1-to-1 sessions",
      "Flexible subject combinations",
      "Higher level of individual academic support",
    ],
  },
  {
    name: "Accelerator",
    price: "From €25,500",
    period: "per academic year",
    accentBar: "bg-primary",
    colorClass: "text-primary",
    description:
      "A premium pathway for students requiring significant individual 1-to-1 teaching or accelerated academic programmes.",
    includes: [
      "Significant individual 1-to-1 teaching",
      "Accelerated academic programme",
      "Bespoke subject combinations",
      "Programme structure agreed during admissions",
    ],
  },
];

export function AdmissionsTuition() {
  return (
    <SectionFrame id="tuition" className="bg-foreground">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary mb-2">
          Fees
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-background">
          Academy Tuition
        </h2>
        <p className="mt-4 text-sm sm:text-base font-light text-background leading-relaxed max-w-2xl">
          Tuition at iCollege Academy reflects the personalised nature of the
          learning environment, small academic cohorts, and the level of
          mentoring and academic guidance provided.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              delay: index * 0.1,
              duration: duration.slow,
              ease: easing.apple,
            }}
            whileHover={{ y: -4 }}
            className="group"
          >
            <div
              className="relative h-full rounded-2xl border border-white/10 overflow-hidden flex flex-col transition-all duration-300 hover:border-white/20"
              style={{ background: "oklch(0.18 0.01 255)" }}
            >
              <div className={cn("absolute top-0 left-0 right-0 h-0.5", plan.accentBar)} aria-hidden />
              <div className="flex flex-col p-6 flex-1 gap-4">

                <div>
                  <p className={cn("text-xs font-semibold uppercase tracking-[0.14em] mb-2", plan.colorClass)}>
                    {plan.name}
                  </p>
                  <p className="text-2xl font-heading font-bold text-background leading-tight">
                    {plan.price}
                  </p>
                  <p className="text-xs font-medium text-background mt-0.5">
                    {plan.period}
                  </p>
                </div>

                <p className="text-sm font-light text-background leading-relaxed">
                  {plan.description}
                </p>

                <div className="pt-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-background mb-3">
                    Includes
                  </p>
                  <ul className="space-y-2.5">
                    {plan.includes.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * stagger.list, duration: 0.4 }}
                        className="flex items-start gap-2.5 text-sm font-light text-background leading-relaxed"
                      >
                        <span className={cn("mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full", plan.accentBar)} />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionFrame>
  );
}
