"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { easing, duration, scale } from "@/lib/animations";
import { openCalendly } from "@/lib/site-cta";

export function GlobalOutcomesLogisticsHero() {
  return (
    <section
      className="relative min-h-[62vh] flex items-end bg-black overflow-hidden"
      aria-label="Outcomes & Logistics"
    >
      <div className="absolute inset-0 bg-linear-to-br from-[#0a1628] via-[#0c2340] to-[#0f1f35]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-secondary/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/70 to-transparent" />

      <div className="relative z-10 w-full">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 pb-14 md:pb-16 lg:pb-20">
          <div className="flex flex-col gap-5 max-w-xl">

            <motion.span
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="inline-block text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-secondary/80 w-fit"
            >
              iCollege Life · Global Experiences
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading font-bold text-white leading-[1.08] tracking-tight text-3xl sm:text-4xl md:text-[2.625rem]"
            >
              Outcomes & Logistics
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="text-sm sm:text-base font-semibold uppercase tracking-[0.12em] text-secondary"
            >
              Clarity, confidence, and responsible delivery
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.14 }}
              className="text-sm sm:text-base font-light leading-relaxed text-white/80 max-w-[46ch]"
            >
              iCollege Global programmes are designed to help participants gain
              perspective, independence, and clearer thinking about their next
              step.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
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
                  className="border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white hover:border-white/40 px-6 py-2.5 text-sm rounded-lg transition-all duration-300 group"
                >
                  <Link href="/global-experiences/programmes">
                    Explore Programmes
                    <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
