"use client";

import { motion } from "motion/react";

export function HowWeWorkVisual() {
  return (
    <section className="relative overflow-hidden bg-foreground">
      {/* Full-width image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1920&q=80"
        alt="Professional learning environment"
        className="w-full h-[420px] md:h-[560px] object-cover object-center opacity-30"
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-foreground/60 via-foreground/40 to-foreground/80" />
      <div className="absolute inset-0 bg-linear-to-r from-foreground/50 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary mb-4"
            >
              Our environment
            </motion.p>
            <motion.blockquote
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-[2rem] font-heading font-bold text-background leading-[1.2] tracking-tight mb-6"
            >
              The environment is not incidental.
              <br />
              <span className="text-secondary">It is part of the learning design.</span>
            </motion.blockquote>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-sm sm:text-base font-light text-background leading-relaxed max-w-lg"
            >
              Learning at iCollege Life takes place in environments that
              reflect the world students are preparing to enter — professional,
              real, and intentionally structured to blur the lines between
              education, work, and everyday life.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
