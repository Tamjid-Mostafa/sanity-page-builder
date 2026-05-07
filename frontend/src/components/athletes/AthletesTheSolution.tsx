"use client";

import { motion } from "motion/react";
import { Blend, Layers, UserRoundCheck, GraduationCap } from "lucide-react";
import { easing, duration, stagger } from "@/lib/animations";

const points = [
  {
    icon: Layers,
    title: "Structured academics",
  },
  {
    icon: Blend,
    title: "Flexible scheduling",
  },
  {
    icon: UserRoundCheck,
    title: "Personal coaching and accountability",
  },
  {
    icon: GraduationCap,
    title: "University pathway",
  },
];

export function AthletesTheSolution() {
  return (
    <section className="py-14 md:py-20 bg-muted/25 border-y border-border">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
            The solution
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.875rem] font-heading font-bold tracking-tight leading-tight text-foreground mb-4">
            iCollege Athletes takes a different approach.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-8 max-w-2xl">
            We combine:
          </p>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {points.map((item, i) => (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * stagger.cards,
                  duration: duration.medium,
                  ease: easing.apple,
                }}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                  <item.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                </span>
                <span className="text-sm font-semibold text-foreground leading-snug">
                  {item.title}
                </span>
              </motion.li>
            ))}
          </ul>
          <p className="text-sm sm:text-base font-medium text-foreground border-l-2 border-primary pl-4 max-w-2xl">
            This allows athletes to train fully while maintaining academic
            progress.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
