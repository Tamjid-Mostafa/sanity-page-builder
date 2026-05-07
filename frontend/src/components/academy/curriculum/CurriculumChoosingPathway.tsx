"use client";

import { motion } from "motion/react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { stagger } from "@/lib/animations";

const considerations = [
  "The student's academic strengths and current level",
  "Their intended university destinations and course preferences",
  "Whether they suit high-stakes exams or continuous assessment",
  "Long-term goals and personal interests",
];

export function CurriculumChoosingPathway() {
  return (
    <SectionFrame id="choosing-pathway" className="bg-background">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
          Pathways
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground">
          Choosing the Right Pathway
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
            There is no single academic route that suits every student. At
            iCollege Academy, we offer recognised qualification pathways and
            guide families in choosing the route that best fits a student&apos;s
            strengths, goals, and future plans.
          </p>
          <p>
            The aim is to design a coherent academic journey that supports
            both strong results and long-term development.
          </p>
          <p className="text-sm font-semibold text-foreground leading-relaxed border-l-2 border-primary pl-4">
            Pathway decisions are made together — with the student, the family,
            and the Academy team.
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
            We consider
          </p>
          <ul className="space-y-4">
            {considerations.map((item, i) => (
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
