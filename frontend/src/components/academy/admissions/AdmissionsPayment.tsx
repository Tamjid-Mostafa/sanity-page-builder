"use client";

import { motion } from "motion/react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { stagger, easing, duration } from "@/lib/animations";

const enrolmentIncludes = [
  "Admissions and onboarding",
  "Academic setup and systems",
  "Learning profile assessments",
  "Administrative and enrolment processing",
];

const paymentOptions = [
  "Annually",
  "Termly (three payments across the academic year)",
  "Monthly across the academic year",
];

const incentives = [
  {
    label: "Early enrolment",
    saving: "€1,000 reduction",
    detail: "For places confirmed before the early enrolment deadline.",
  },
  {
    label: "Full-year payment",
    saving: "€1,000 reduction",
    detail: "When tuition for the full academic year is paid in advance.",
  },
  {
    label: "Sibling enrolment",
    saving: "€1,000 reduction",
    detail: "For additional siblings attending the Academy.",
  },
];

export function AdmissionsPayment() {
  return (
    <SectionFrame id="payment" className="bg-background">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
          Payment
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground">
          Fees & Payment Options
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4">

        {/* Enrolment fee */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ delay: 0, duration: duration.slow, ease: easing.apple }}
        >
          <div className="relative h-full rounded-2xl bg-card border border-border shadow-sm overflow-hidden flex flex-col">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary" aria-hidden />
            <div className="flex flex-col p-6 flex-1 gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-1">
                  Enrolment Fee
                </p>
                <p className="text-2xl font-heading font-bold text-foreground leading-tight">
                  €2,000
                </p>
                <p className="text-xs font-medium text-foreground mt-0.5">
                  one-time, all new students
                </p>
              </div>
              <p className="text-sm font-light text-foreground leading-relaxed">
                A one-time enrolment fee applies to all new students. This
                covers:
              </p>
              <ul className="space-y-2.5">
                {enrolmentIncludes.map((item, i) => (
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

        {/* Payment options */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ delay: 0.1, duration: duration.slow, ease: easing.apple }}
        >
          <div className="relative h-full rounded-2xl bg-card border border-border shadow-sm overflow-hidden flex flex-col">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-secondary" aria-hidden />
            <div className="flex flex-col p-6 flex-1 gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary mb-1">
                  Tuition Payment
                </p>
                <p className="text-2xl font-heading font-bold text-foreground leading-tight">
                  €2,000
                </p>
                <p className="text-xs font-medium text-foreground mt-0.5">
                  deposit to secure your place
                </p>
              </div>
              <p className="text-sm font-light text-foreground leading-relaxed">
                Places are secured with a deposit. Remaining tuition may
                typically be paid:
              </p>
              <ul className="space-y-2.5">
                {paymentOptions.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm font-light text-foreground leading-relaxed"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-sm font-light text-foreground leading-relaxed pt-1">
                Payment arrangements are agreed during the admissions process.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Commitment incentives */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ delay: 0.2, duration: duration.slow, ease: easing.apple }}
        >
          <div className="relative h-full rounded-2xl bg-card border border-border shadow-sm overflow-hidden flex flex-col">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-border" aria-hidden />
            <div className="flex flex-col p-6 flex-1 gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-1">
                Commitment Incentives
              </p>
              <p className="text-sm font-light text-foreground leading-relaxed">
                To support early planning and long-term commitment, the Academy
                offers a small number of tuition reductions.
              </p>
              <ul className="space-y-4">
                {incentives.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * stagger.list, duration: 0.4 }}
                    className="space-y-0.5"
                  >
                    <p className="text-sm font-semibold text-foreground">
                      {item.label}{" "}
                      <span className="text-primary">{item.saving}</span>
                    </p>
                    <p className="text-sm font-light text-foreground leading-relaxed">
                      {item.detail}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

      </div>
    </SectionFrame>
  );
}
