"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration, scale } from "@/lib/animations";
import { openCalendly } from "@/lib/site-cta";

export function GlobalPartnersCTA() {
  return (
    <SectionFrame id="partners-cta" className="bg-foreground">
      <div className="flex flex-col items-center text-center">

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary mb-4"
        >
          Interested in Partnering?
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading font-bold leading-[1.08] tracking-tight text-background text-3xl sm:text-4xl md:text-[2.625rem] max-w-xl"
        >
          Let&apos;s start a conversation.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-4 mb-10 text-sm sm:text-base font-light text-background/75 leading-relaxed max-w-lg"
        >
          We welcome conversations with institutions and organisations
          interested in international learning collaborations. No commitment
          required — just a conversation about what&apos;s possible.
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
              Start a Partnership Conversation
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
              className="border-white/25 bg-white/5 text-background hover:bg-white/10 hover:text-background hover:border-white/35 px-8 py-3 text-sm font-semibold rounded-lg transition-all duration-300 group"
            >
              <Link href="/global-experiences/programmes">
                Explore Programmes
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-300" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

      </div>
    </SectionFrame>
  );
}
