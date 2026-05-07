"use client";

import { motion } from "motion/react";
import { Award } from "lucide-react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration } from "@/lib/animations";
import { cn } from "@/lib/utils";

const providers = [
  {
    route: "UK Pathway",
    name: "Pearson Edexcel",
    accentBar: "bg-primary",
    colorClass: "text-primary",
    description:
      "A globally recognised UK awarding body offering GCSE and A Level qualifications accepted by universities worldwide.",
  },
  {
    route: "UK Pathway",
    name: "Cambridge International",
    accentBar: "bg-secondary",
    colorClass: "text-secondary",
    description:
      "Part of the University of Cambridge, providing internationally respected qualifications including Cambridge IGCSE and Cambridge International A Levels.",
  },
  {
    route: "US Pathway",
    name: "University of Nebraska High School",
    accentBar: "bg-primary",
    colorClass: "text-primary",
    description:
      "An accredited American high school diploma programme operated by the University of Nebraska–Lincoln. The diploma is recognised by universities in the United States and internationally.",
  },
];

export function CurriculumProviders() {
  return (
    <SectionFrame id="qualification-providers" className="bg-foreground">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary mb-2">
          Qualifications
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-background">
          Recognised Qualification Providers
        </h2>
        <p className="mt-4 text-sm sm:text-base font-light text-background leading-relaxed max-w-2xl">
          iCollege Academy works with internationally recognised qualification
          providers to ensure students follow credible and widely accepted
          academic pathways.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4">
        {providers.map((provider, index) => (
          <motion.div
            key={provider.name}
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
              <div className={cn("absolute top-0 left-0 right-0 h-0.5", provider.accentBar)} aria-hidden />
              <div className="flex flex-col gap-4 p-6 flex-1">

                <div className="flex items-start gap-3">
                  <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 shrink-0">
                    <Award className={cn("w-4 h-4", provider.colorClass)} strokeWidth={1.5} />
                  </div>
                  <p className={cn("text-xs font-semibold uppercase tracking-[0.14em] pt-2", provider.colorClass)}>
                    {provider.route}
                  </p>
                </div>

                <h3 className="text-base font-heading font-bold text-background leading-snug">
                  {provider.name}
                </h3>

                <p className="text-sm font-light text-background leading-relaxed">
                  {provider.description}
                </p>

              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-8 text-sm font-semibold text-background leading-relaxed border-l-2 border-secondary pl-4 max-w-2xl"
      >
        Students are guided in selecting subjects and pathways aligned with
        their intended university destinations — whether in the UK, the US,
        Europe, or elsewhere internationally.
      </motion.p>
    </SectionFrame>
  );
}
