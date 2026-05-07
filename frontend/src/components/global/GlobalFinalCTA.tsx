"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration, scale } from "@/lib/animations";
import { openCalendly } from "@/lib/site-cta";

export function GlobalFinalCTA() {
  return (
    <SectionFrame id="global-cta" className="bg-background">
      <div className="flex flex-col items-center text-center">

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-4"
        >
          Interested in a Global Experience?
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading font-bold leading-[1.08] tracking-tight text-foreground text-3xl sm:text-4xl md:text-[2.625rem] max-w-xl"
        >
          The best place to begin is a conversation.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-4 mb-10 text-sm sm:text-base font-light text-foreground leading-relaxed max-w-lg"
        >
          Whether you&apos;re exploring for yourself or for someone you know,
          we&apos;re happy to talk through what a Global Experience could look
          like — no commitment required.
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
              className="px-8 py-3 text-sm font-semibold rounded-lg transition-all duration-300 group"
            >
              <Link href="/global-experiences/programmes">
                Explore Programmes
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
          {["Ages 18–25", "Barcelona", "In Person & Online", "Life Design"].map((pill) => (
            <span
              key={pill}
              className="text-[11px] font-medium text-foreground border border-border rounded-full px-3 py-1"
            >
              {pill}
            </span>
          ))}
        </motion.div>

      </div>
    </SectionFrame>
  );
}
