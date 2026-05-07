"use client";

import { motion } from "motion/react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";

const collaborators = [
  "Companies and entrepreneurial ventures",
  "Private investors and enterprise partners",
  "Selected schools, colleges, and universities (where aligned)",
  "Professional, cultural, and international organisations",
];

const supports = [
  "Applied learning through real-world projects and exposure",
  "Workshops, events, and short-form programmes connected to practice",
  "Short-term and modular international experiences",
  "Progression into further study, enterprise, or professional environments",
];

export function TypesOfCollaboration() {
  return (
    <SectionFrame id="types-of-collaboration" className="bg-background border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
          Collaboration
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground">
          Types of collaboration
        </h2>
        <p className="mt-4 text-sm sm:text-base font-light text-foreground leading-relaxed max-w-2xl">
          iCollege Life works at the intersection of education, business, and
          enterprise — partnering with organisations that operate in real-world
          environments and value thoughtful talent development over time.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-4">
            Our collaborators may include:
          </p>
          <ul className="space-y-2.5">
            {collaborators.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm font-light text-foreground leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary mb-4">
            These collaborations support:
          </p>
          <ul className="space-y-2.5">
            {supports.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm font-light text-foreground leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-8 space-y-3 text-sm sm:text-base font-light text-foreground leading-relaxed max-w-2xl"
      >
        <p>
          Each partnership is formed around a clear commercial and educational
          purpose — not as a generic affiliation or branding exercise.
        </p>
        <p>
          We are interested in partnerships that create value for learners,
          organisations, and the broader ecosystem alike.
        </p>
      </motion.div>
    </SectionFrame>
  );
}
