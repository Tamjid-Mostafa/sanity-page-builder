"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration, scale } from "@/lib/animations";

export function HowWeWorkClosing() {
  return (
    <SectionFrame className="bg-foreground border-t border-white/10">
      <div className="flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary mb-4"
        >
          How we work
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading font-bold leading-[1.08] tracking-tight text-background text-3xl sm:text-4xl md:text-[2.625rem] max-w-lg mb-6"
        >
          Judgement over speed
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="space-y-3 text-sm sm:text-base font-light text-background leading-relaxed max-w-xl mb-10"
        >
          <p>How we work matters as much as what we offer.</p>
          <p>
            Our commitment is to clarity, care, and thoughtful design — so
            that learners, families, and partners can place their trust in the
            way iCollege Life operates today and grows over time.
          </p>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary mb-5"
        >
          Learn more about the people and partnerships behind iCollege Life
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <motion.div
            whileHover={{ scale: scale.button }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: duration.fast, ease: easing.smooth }}
          >
            <Button
              size="default"
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 text-sm rounded-lg shadow-md group"
            >
              <Link href="/about/leadership">
                Leadership
                <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-300" />
              </Link>
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
              className="border-white/20 bg-white/5 text-background hover:bg-white/10 hover:text-background hover:border-white/30 px-6 py-2.5 text-sm rounded-lg group"
            >
              <Link href="/about/partners">
                Partners & Collaborators
                <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-300" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </SectionFrame>
  );
}
