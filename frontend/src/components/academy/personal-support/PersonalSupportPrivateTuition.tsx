"use client";

import { motion } from "motion/react";
import { Target, BookCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration, stagger, scale } from "@/lib/animations";
import { openCalendly } from "@/lib/site-cta";

const tuitionTypes = [
  {
    icon: Target,
    title: "Subject-specific tutoring",
    description: "Dedicated one-to-one sessions focused on a specific subject area, aligned with the student's current programme or examination syllabus.",
  },
  {
    icon: BookCheck,
    title: "Exam preparation & catch-up",
    description: "Structured revision and targeted support for students working towards examinations or catching up after a disrupted period.",
  },
  {
    icon: Zap,
    title: "Stretch & extension",
    description: "Enrichment sessions for high-performing students who want to go deeper, explore beyond the syllabus, or prepare for competitive applications.",
  },
];

export function PersonalSupportPrivateTuition() {
  return (
    <SectionFrame id="private-tuition" className="bg-background">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
          Private Tuition
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground">
          One-to-one tuition, available separately.
        </h2>
        <p className="mt-4 text-sm sm:text-base font-light text-foreground leading-relaxed max-w-2xl">
          In addition to the Academy programme, iCollege Life offers private
          one-to-one tuition as a separate service. This may include a range of
          options suited to different academic stages and goals. Private tuition
          is optional for Academy students and also available to external
          families.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-3 gap-4">
        {tuitionTypes.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              delay: index * stagger.cards,
              duration: duration.slow,
              ease: easing.apple,
            }}
            whileHover={{ y: -4 }}
          >
            <div className="group relative h-full rounded-2xl bg-card border border-border p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary" aria-hidden />
              <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10">
                <item.icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-semibold text-foreground leading-snug">
                {item.title}
              </h3>
              <p className="text-sm font-light text-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="mt-8 flex items-center gap-3"
      >
        <motion.div
          whileHover={{ scale: scale.button }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: duration.fast, ease: easing.smooth }}
        >
          <Button
            size="default"
            variant="outline"
            onClick={() => openCalendly()}
            className="px-6 py-2.5 text-sm rounded-lg transition-all duration-300 group cursor-pointer"
          >
            Ask about private tuition
            <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-300" />
          </Button>
        </motion.div>
      </motion.div>
    </SectionFrame>
  );
}
