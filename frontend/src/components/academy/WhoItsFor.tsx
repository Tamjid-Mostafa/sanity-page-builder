"use client";

import { motion } from "motion/react";
import { CheckCircle2, MinusCircle } from "lucide-react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration, stagger } from "@/lib/animations";

const studentBullets = [
  "Are academically capable and thrive with personalised, individual attention",
  "Feel disengaged, limited, or overlooked in traditional school systems.",
  "Want flexible academic pathways across the UK, US, or international systems.",
  "Benefit from mentoring and accountability, rather than micromanagement",
  "Are thinking seriously about life beyond school — not just exam results",
];

const familyBullets = [
  "Small cohorts and genuinely high-touch support",
  "Clear communication, honesty, and transparency",
  "Strong outcomes without unnecessary pressure or performative schooling",
  "A deeper understanding of their child's learning needs",
];

const notFitBullets = [
  "Need constant supervision, heavy discipline, or rigid timetables",
  "Prefer a one-size-fits-all or exam-only approach to education.",
  "Are looking for large classes or a conventional school environment",
  "Expect results without student ownership, effort, and engagement.",
];

export function WhoItsFor() {
  return (
    <SectionFrame id="who-its-for" className="bg-background">
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
          Who it&apos;s for
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
                  Good fit
                </h3>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-3">
                  Students who…
                </p>
                <ul className="space-y-2.5">
                  {studentBullets.map((item, i) => (
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

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary mb-3">
                  Families who value…
                </p>
                <ul className="space-y-2.5">
                  {familyBullets.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm font-light text-foreground leading-relaxed"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </motion.div>

        {/* Not a fit */}
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
                  Not the right fit
                </h3>
              </div>

              <p className="text-sm font-light text-foreground leading-relaxed">
                iCollege Academy is not designed for students or families who:
              </p>

              <ul className="space-y-2.5">
                {notFitBullets.map((item, i) => (
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
