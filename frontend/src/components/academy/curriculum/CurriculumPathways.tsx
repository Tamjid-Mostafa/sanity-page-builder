"use client";

import { motion } from "motion/react";
import { BookOpen, Globe } from "lucide-react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";

const pathways = [
  {
    icon: BookOpen,
    label: "UK Pathway",
    qualification: "GCSEs & A Levels",
    accentBar: "bg-primary",
    colorClass: "text-primary",
    description:
      "The UK pathway provides a structured and academically rigorous route. Students focus on a small number of subjects, allowing for depth, confidence, and strong preparation for university entry.",
    includes: [
      "International GCSEs",
      "International A Levels (subject availability depends on cohort needs)",
      "Small-group teaching and individual academic support",
      "Calm, structured exam preparation",
    ],
    note: "UK and international universities widely recognise this pathway.",
  },
  {
    icon: Globe,
    label: "US Pathway",
    qualification: "US High School Diploma",
    accentBar: "bg-secondary",
    colorClass: "text-secondary",
    description:
      "The US pathway offers a flexible academic structure based on credit-based progression and continuous assessment. Students complete coursework across a range of subjects while building credits toward the diploma.",
    includes: [
      "Accredited US High School Diploma",
      "Credit-based progression",
      "Ongoing assessment and feedback",
      "Recognition by US and international universities",
    ],
    note: "Often suits students who prefer flexibility and continuous evaluation rather than high-stakes final exams.",
  },
];

export function CurriculumPathways() {
  return (
    <SectionFrame id="pathways" className="bg-foreground">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary mb-2">
          Academic routes
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-background">
          UK & US Pathways
        </h2>
        <p className="mt-4 text-sm sm:text-base font-light text-background leading-relaxed max-w-2xl">
          Both pathways are internationally recognised and supported through
          personalised academic guidance.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4">
        {pathways.map((pathway, index) => (
          <motion.div
            key={pathway.label}
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
              <div className={cn("absolute top-0 left-0 right-0 h-0.5", pathway.accentBar)} aria-hidden />
              <div className="flex flex-col p-6 flex-1 gap-5">

                <div className="flex items-start gap-3">
                  <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 shrink-0">
                    <pathway.icon className={cn("w-4 h-4", pathway.colorClass)} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className={cn("text-xs font-semibold uppercase tracking-[0.14em] mb-0.5", pathway.colorClass)}>
                      {pathway.label}
                    </p>
                    <h3 className="text-xl font-heading font-bold text-background leading-snug">
                      {pathway.qualification}
                    </h3>
                  </div>
                </div>

                <p className="text-sm font-light text-background leading-relaxed">
                  {pathway.description}
                </p>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-background mb-3">
                    Programme includes
                  </p>
                  <ul className="space-y-2.5">
                    {pathway.includes.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * stagger.list, duration: 0.4 }}
                        className="flex items-start gap-2.5 text-sm font-light text-background leading-relaxed"
                      >
                        <span className={cn("mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full", pathway.accentBar)} />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <p className="text-sm font-semibold text-background leading-relaxed border-l-2 border-white/20 pl-3 mt-auto">
                  {pathway.note}
                </p>

              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionFrame>
  );
}
