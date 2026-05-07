"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration, scale } from "@/lib/animations";

export function PartnersClosing() {
  return (
    <SectionFrame className="bg-background border-t border-border">
      <div className="flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-4"
        >
          Partners
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading font-bold leading-[1.08] tracking-tight text-foreground text-3xl sm:text-4xl md:text-[2.625rem] max-w-lg mb-6"
        >
          Working with the right people
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="space-y-3 text-sm sm:text-base font-light text-foreground leading-relaxed max-w-xl mb-10"
        >
          <p>
            At iCollege Life, partnership is a matter of judgement and
            responsibility.
          </p>
          <p>
            We collaborate with those who take education seriously, think
            long-term, and are committed to supporting people in growing their
            capability, independence, and direction.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4 }}
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
                Learn more about leadership
                <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-300" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </SectionFrame>
  );
}
