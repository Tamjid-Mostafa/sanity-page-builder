"use client";

import { motion } from "motion/react";

export function PartnersHero() {
  return (
    <section
      className="relative min-h-[70vh] flex items-end bg-black overflow-hidden"
      aria-label="Partners & Collaborators"
    >
      <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-[#0c1e35] to-[#112840]" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-secondary/15 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-linear-to-r from-black/50 via-black/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/60 to-transparent" />

      <div className="relative z-10 w-full">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 pb-14 md:pb-16 lg:pb-20">
          <div className="flex flex-col gap-5 max-w-2xl">
            <motion.span
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="inline-block text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-white w-fit"
            >
              Partners & Collaborators
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading font-bold text-white leading-[1.08] tracking-tight text-3xl sm:text-4xl md:text-[2.625rem]"
            >
              Collaboration{" "}
              <span className="text-secondary">with purpose.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-sm sm:text-base font-bold leading-relaxed text-white max-w-[46ch]"
            >
              iCollege Life works with a small number of carefully chosen
              partners and collaborators who share our values, standards, and
              long-term view of education.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
