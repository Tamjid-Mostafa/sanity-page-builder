"use client";

import { motion } from "motion/react";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration, scale } from "@/lib/animations";
import { openCalendly } from "@/lib/site-cta";

export function AcademyFinalCTA() {
  return (
    <SectionFrame id="academy-cta" className="bg-foreground">
      <div className="flex flex-col items-center text-center">

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary mb-4"
        >
          Interested in iCollege Academy?
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading font-bold leading-[1.08] tracking-tight text-background text-3xl sm:text-4xl md:text-[2.625rem] max-w-xl"
        >
          The best next step is a conversation.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-4 mb-10 text-sm sm:text-base font-light text-background leading-relaxed max-w-lg"
        >
          Book a short call with our team to learn more and ask any questions.
          There&apos;s no obligation — just an open conversation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <motion.div
            whileHover={{ scale: scale.button }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: duration.fast, ease: easing.smooth }}
          >
            <Button
              size="lg"
              onClick={() => openCalendly()}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-sm font-semibold rounded-lg shadow-md transition-all duration-300 hover:shadow-lg group cursor-pointer"
            >
              Book a Conversation
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-300" />
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: scale.button }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: duration.fast, ease: easing.smooth }}
          >
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-white/20 bg-white/5 text-background hover:bg-white/10 hover:text-background hover:border-white/30 px-8 py-3 text-sm font-semibold rounded-lg transition-all duration-300 group"
            >
              <Link href="/apply">
                Apply Now
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-300" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.65, duration: 0.4 }}
          className="mt-8 flex flex-wrap justify-center gap-2"
        >
          {["A Levels", "High School Diploma", "Ages 15–18", "Barcelona"].map((pill) => (
            <span
              key={pill}
              className="text-[11px] font-medium text-background border border-white/20 bg-white/5 rounded-full px-3 py-1"
            >
              {pill}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="mt-6"
        >
          <Link
            href="/prospectus"
            className="text-xs sm:text-sm font-medium text-background underline underline-offset-4 hover:text-secondary transition-colors duration-200 inline-flex items-center gap-1.5"
          >
            <Download className="h-3.5 w-3.5" />
            Download Prospectus
          </Link>
        </motion.div>

      </div>
    </SectionFrame>
  );
}
