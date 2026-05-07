"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import { easing, duration, scale } from "@/lib/animations";
import { openCalendly } from "@/lib/site-cta";

export function AcademyHero() {
  return (
    <section
      className="relative min-h-[70vh] flex items-end bg-black overflow-hidden"
      aria-label="iCollege Academy"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-[#0c1e35] to-[#112840]" />
      <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-primary/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-linear-to-r from-black/55 via-black/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/70 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 pb-14 md:pb-16 lg:pb-20">
          <div className="flex flex-col gap-5 max-w-lg">

            <motion.span
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="inline-block text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-white w-fit"
            >
              iCollege Academy · Barcelona
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading font-bold text-white leading-[1.08] tracking-tight text-3xl sm:text-4xl md:text-[2.625rem]"
            >
              Design the life you want —{" "}
              <span className="text-secondary">
                starting with a strong academic foundation.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-sm sm:text-base font-bold leading-relaxed text-white max-w-[38ch]"
            >
              A premium, small-cohort academy for students aged 15–18 seeking
              academic rigour, personal growth, and clear direction beyond
              school.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="flex flex-row flex-wrap gap-3 pt-1"
            >
              <motion.div
                whileHover={{ scale: scale.button }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: duration.fast, ease: easing.smooth }}
              >
                <Button
                  size="default"
                  onClick={() => openCalendly()}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 text-sm rounded-lg shadow-md transition-all duration-300 hover:shadow-lg group cursor-pointer"
                >
                  Book a Conversation
                  <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: scale.button }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: duration.fast, ease: easing.smooth }}
              >
                <Button
                  size="default"
                  variant="outline"
                  asChild
                  className="px-6 py-2.5 text-sm rounded-lg transition-all duration-300 group"
                >
                  <Link href="/apply">
                    Apply Now
                    <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="flex flex-wrap gap-2"
            >
              {["A Levels", "High School Diploma", "Ages 15–18", "Barcelona"].map((pill) => (
                <span
                  key={pill}
                  className="text-[11px] font-medium tracking-wide text-white border border-white/20 bg-white/5 rounded-full px-3 py-1 backdrop-blur-sm"
                >
                  {pill}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.4 }}
            >
              <Link
                href="/prospectus"
                className="text-xs sm:text-sm font-medium text-white underline underline-offset-4 hover:text-secondary transition-colors duration-200 inline-flex items-center gap-1.5"
              >
                <Download className="h-3.5 w-3.5" />
                Download Prospectus
              </Link>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
