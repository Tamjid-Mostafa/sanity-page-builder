"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { easing, duration, scale } from "@/lib/animations";
import Link from "next/link";
import { SectionFrame } from "./SectionFrame";
import { openCalendly } from "@/lib/site-cta";

export function FinalCTASection() {
  return (
    <SectionFrame className="bg-foreground" containerClassName="max-w-4xl">
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary mb-5">
          Next step
        </p>

        {/* Headline */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-heading font-bold text-white tracking-tight leading-[1.04] mb-6 max-w-3xl">
          Start with a Conversation.
        </h2>

        {/* Subtext */}
        <p className="text-base md:text-lg text-white font-light leading-relaxed max-w-xl mb-10">
          The right environment changes everything. If iCollege sounds like it
          might be the right fit — for you or your family — we'd welcome a
          conversation.
        </p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10"
        >
          <motion.div
            whileHover={{ scale: scale.button }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: duration.fast, ease: easing.smooth }}
          >
            <Button
              size="lg"
              onClick={() => openCalendly()}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 h-14 text-base rounded-xl font-bold min-w-[190px] group cursor-pointer"
            >
              <Calendar className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              Book a Conversation
            </Button>
          </motion.div>

        </motion.div>

        {/* Divider */}
        <div className="w-12 h-px bg-white/15 mb-8" />

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-white text-xs font-medium tracking-wide"
        >
          <span className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-secondary inline-block" />
            A Levels
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-secondary inline-block" />
            High School Diploma
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-secondary inline-block" />
            Global Development
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-secondary inline-block" />
            Personal Growth
          </span>
        </motion.div>

        {/* Prospectus link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8"
        >
          <Link
            href="/prospectus"
            className="group inline-flex items-center gap-1.5 text-sm text-white hover:text-secondary transition-colors duration-200"
          >
            Download our prospectus
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </motion.div>
      </motion.div>
    </SectionFrame>
  );
}


