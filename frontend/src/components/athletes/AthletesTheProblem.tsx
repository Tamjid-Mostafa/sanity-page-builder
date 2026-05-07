"use client";

import { motion } from "motion/react";
import { CircleSlash, Plane, WifiOff, Scale, AlertTriangle } from "lucide-react";
import { stagger, easing, duration } from "@/lib/animations";

const bullets = [
  {
    icon: CircleSlash,
    text: "Fixed timetables clash with training.",
  },
  {
    icon: Plane,
    text: "Travel and competition often result in missed learning opportunities.",
  },
  {
    icon: WifiOff,
    text: "Many online schools lack structure, quality, and reliability.",
  },
  {
    icon: AlertTriangle,
    text: "This often leads to stress, falling behind, or difficult compromises.",
  },
];

export function AthletesTheProblem() {
  return (
    <section
      className="py-14 md:py-24 bg-background"
      aria-label="The problem with traditional school for athletes"
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-8 max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
            The problem
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.875rem] font-heading font-bold tracking-tight leading-tight text-foreground mb-6">
            Traditional schools are not designed for athletes.
          </h2>
        </motion.div>

        <ul className="space-y-4 max-w-2xl mb-8">
          {bullets.map((item, i) => (
            <motion.li
              key={item.text}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * stagger.cards,
                duration: duration.medium,
                ease: easing.apple,
              }}
              className="flex gap-3 text-sm sm:text-base text-foreground"
            >
              <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
                <item.icon
                  className="h-4 w-4 text-destructive"
                  strokeWidth={1.5}
                />
              </span>
              <span className="leading-relaxed pt-1">{item.text}</span>
            </motion.li>
          ))}
        </ul>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="max-w-2xl flex gap-3 text-sm sm:text-base font-medium text-foreground border-l-2 border-destructive/35 pl-4"
        >
          <Scale className="h-5 w-5 shrink-0 text-destructive/80 mt-0.5" strokeWidth={1.5} />
          <span>
            As a result, athletes are often forced to choose between their sport
            and their education.
          </span>
        </motion.p>
      </div>
    </section>
  );
}
