"use client";

import { motion } from "motion/react";

export function PrinciplesIntro() {
  return (
    <section className="w-full py-24 md:py-28 bg-background border-b border-border/60">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.5 }}
          className="max-w-[70ch] space-y-6"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
            How we work
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-foreground leading-tight tracking-tight">
            Thoughtful design. Responsible delivery.
          </h2>
          <div className="h-px w-24 bg-border opacity-60" aria-hidden />
          <p className="text-lg md:text-xl text-muted-foreground leading-[1.65]">
            iCollege Life is built around clear principles for how learning is
            designed, delivered, and supported — with care, structure, and
            long-term thinking at the centre.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
