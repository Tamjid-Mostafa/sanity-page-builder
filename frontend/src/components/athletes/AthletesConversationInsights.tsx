"use client";

import { motion } from "motion/react";
import { Quote } from "lucide-react";
import { easing, duration, stagger } from "@/lib/animations";

const quotes = [
  {
    text: "We're constantly trying to make school fit around training, and it doesn't really work.",
  },
  {
    text: "Online options feel too unstructured.",
  },
  {
    text: "We don't want to sacrifice education for sport.",
  },
  {
    text: "My son needs more flexibility but without losing structure.",
  },
];

export function AthletesConversationInsights() {
  return (
    <section className="py-14 md:py-24 bg-foreground overflow-hidden">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 max-w-xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary mb-2">
            Conversation insights
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.875rem] font-heading font-bold tracking-tight leading-tight text-background">
            What we&apos;re hearing from parents
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 max-w-4xl">
          {quotes.map((quote, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                delay: i * stagger.cards,
                duration: duration.slow,
                ease: easing.apple,
              }}
              className="rounded-2xl border border-background/10 bg-background/5 p-6 flex flex-col gap-4"
            >
              <Quote
                className="h-5 w-5 text-secondary/70 shrink-0"
                strokeWidth={1.5}
              />
              <blockquote className="text-base sm:text-[17px] font-medium leading-snug text-background/90 italic">
                &ldquo;{quote.text}&rdquo;
              </blockquote>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
