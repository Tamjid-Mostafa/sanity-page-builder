"use client";

import { motion } from "motion/react";
import { GraduationCap } from "lucide-react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration, stagger } from "@/lib/animations";

const guidanceItems = [
  {
    label: "Subject selection & academic strategy",
    description:
      "Choosing the right combination of subjects for each student's target universities and intended direction.",
  },
  {
    label: "University requirements & applications",
    description:
      "Understanding what institutions look for — and building the profile, personal statement, and portfolio to match.",
  },
  {
    label: "Timelines & preparation",
    description:
      "Structured planning across the programme so students are never scrambling at the last minute.",
  },
  {
    label: "Realistic goal-setting",
    description:
      "Honest, constructive conversations about ambition, fit, and the steps required to reach meaningful targets.",
  },
];

const destinations = ["United Kingdom", "United States", "Europe", "International"];

export function PathwaysUniversity() {
  return (
    <SectionFrame id="university-pathways" className="bg-background">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
            University Pathways
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground">
            Recognised qualifications that open doors globally.
          </h2>
          <p className="mt-5 text-sm sm:text-base font-light text-foreground leading-relaxed max-w-prose">
            Students follow recognised academic qualifications that support
            progression to universities in the United Kingdom, the United
            States, Europe, and internationally. Planning develops gradually
            throughout the programme, so students build both strong academic
            profiles and the maturity needed for university life.
          </p>

          {/* Destination pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {destinations.map((dest) => (
              <span
                key={dest}
                className="text-[11px] font-medium text-foreground border border-border bg-muted rounded-full px-3 py-1"
              >
                {dest}
              </span>
            ))}
          </div>

          {/* Icon badge */}
          <div className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-card border border-border px-5 py-4">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 shrink-0">
              <GraduationCap className="w-5 h-5 text-primary" strokeWidth={1.5} />
            </div>
            <p className="text-sm font-light text-foreground leading-relaxed">
              Guidance is built into the programme — students are never left to
              navigate applications alone.
            </p>
          </div>
        </motion.div>

        {/* Right: guidance cards */}
        <div className="flex flex-col gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold uppercase tracking-[0.14em] text-primary"
          >
            Students receive guidance on
          </motion.p>
          {guidanceItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                delay: i * stagger.cards,
                duration: duration.slow,
                ease: easing.apple,
              }}
            >
              <div className="relative rounded-2xl bg-card border border-border p-5 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 bottom-0 w-0.5 bg-primary" aria-hidden />
                <div className="pl-4">
                  <h3 className="text-sm font-semibold text-foreground mb-1">
                    {item.label}
                  </h3>
                  <p className="text-sm font-light text-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
