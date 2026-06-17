"use client";

import { motion } from "motion/react";
import { User, Clock, Globe2, ListChecks, HeartHandshake } from "lucide-react";
import { easing, duration, stagger } from "@/lib/animations";

const criteria = [
  { icon: User, text: "Teenagers 13–19 years of age" },
  { icon: Clock, text: "Train 10+ hours per week" },
  { icon: Globe2, text: "Compete regularly or travel internationally" },
  {
    icon: ListChecks,
    text: "Require flexibility while maintaining academic structure",
  },
  {
    icon: HeartHandshake,
    text: "Committed to both their sport and future academic or career opportunities",
  },
];

export function AthletesWhoItsFor() {
  return (
    <section className="py-14 md:py-24 bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-8 max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
            Who it&apos;s for
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.875rem] font-heading font-bold tracking-tight leading-tight text-foreground">
            This program is designed for athletes who:
          </h2>
        </motion.div>

        <ul className="grid gap-3 sm:grid-cols-2 max-w-4xl mb-6">
          {criteria.map((item, i) => (
            <motion.li
              key={item.text}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                delay: i * stagger.cards,
                duration: duration.medium,
                ease: easing.apple,
              }}
              className="flex gap-3 rounded-xl border border-border bg-card p-4"
            >
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <item.icon className="h-4 w-4 text-primary" strokeWidth={1.5} />
              </span>
              <span className="text-sm sm:text-[15px] text-foreground leading-snug pt-1">
                {item.text}
              </span>
            </motion.li>
          ))}
        </ul>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="max-w-2xl flex items-center gap-2.5 text-sm text-muted-foreground border-l-2 border-muted pl-4"
        >
          <span className="shrink-0 text-base">—</span>
          Not designed for students looking for an easier option.
        </motion.p>
      </div>
    </section>
  );
}
