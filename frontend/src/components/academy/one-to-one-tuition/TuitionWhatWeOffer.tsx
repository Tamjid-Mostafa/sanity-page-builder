"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { stagger } from "@/lib/animations";

const bullets = [
  "Available to both Academy and external students",
  "Delivered by experienced subject specialists",
  "Structured around clear academic goals",
];

export function TuitionWhatWeOffer() {
  return (
    <SectionFrame id="what-we-offer" className="bg-background">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
          Tuition
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground">
          What We Offer
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
            iCollege Life provides structured private tuition for students who
            need targeted academic support, exam preparation, or
            subject-specific focus.
          </p>
          <p>
            For students seeking broader academic and personal development,
            families may wish to explore{" "}
            <Link
              href="/academy"
              className="font-semibold text-foreground hover:text-primary transition-colors duration-200"
            >
              iCollege Academy
            </Link>{" "}
            as a full programme.
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
            Tuition is
          </p>
          <ul className="space-y-4">
            {bullets.map((item, i) => (
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
