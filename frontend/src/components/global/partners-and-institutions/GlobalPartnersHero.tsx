"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { easing, duration, scale } from "@/lib/animations";
import { openCalendly } from "@/lib/site-cta";

export function GlobalPartnersHero() {
  return (
    <section
      className="relative min-h-[62vh] flex items-end bg-black overflow-hidden"
      aria-label="Partners & Institutions"
    >
      <div className="absolute inset-0 bg-linear-to-br from-[#0a1628] via-[#0c2340] to-[#0f1f35]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/70 to-transparent" />

      <div className="relative z-10 w-full">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 pb-14 md:pb-16 lg:pb-20">
          <div className="flex flex-col gap-5 max-w-xl">

            <motion.span
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="inline-block text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-primary/80 w-fit"
            >
              iCollege Life · Global Experiences
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading font-bold text-white leading-[1.08] tracking-tight text-3xl sm:text-4xl md:text-[2.625rem]"
            >
              Partners & Institutions
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="text-sm sm:text-base font-semibold uppercase tracking-[0.12em] text-primary/90"
            >
              Built with partners. Delivered with care.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.14 }}
              className="text-sm sm:text-base font-light leading-relaxed text-white/80 max-w-[48ch]"
            >
              iCollege Global works with schools, colleges, universities,
              organisations, and companies to design international learning
              experiences that connect education with the real world.
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
                  Start a Partnership Conversation
                  <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.4 }}
              className="flex flex-wrap gap-2"
            >
              {["Schools", "Universities", "Organisations", "Barcelona & Online"].map((pill) => (
                <span
                  key={pill}
                  className="text-[11px] font-medium tracking-wide text-white border border-white/20 bg-white/5 rounded-full px-3 py-1 backdrop-blur-sm"
                >
                  {pill}
                </span>
              ))}
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
