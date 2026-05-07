"use client";

import { motion } from "motion/react";
import { Globe, Compass, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration, stagger, scale } from "@/lib/animations";

const benefits = [
  {
    icon: Globe,
    title: "Build confidence & perspective",
    description:
      "Living and learning in a new context stretches students in ways that classrooms cannot — developing resilience and a wider worldview.",
  },
  {
    icon: Compass,
    title: "Designed with intention",
    description:
      "iCollege Global programmes are structured experiences, not gap years — each with clear purpose, support, and meaningful progression.",
  },
  {
    icon: Users,
    title: "Supported throughout",
    description:
      "Students are guided before, during, and after the experience — ensuring the time leads somewhere, academically and personally.",
  },
];

export function PathwaysGlobal() {
  return (
    <SectionFrame id="global-experiences" className="bg-foreground">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary mb-2">
          Global Experiences
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-background">
          University is not always the immediate next step.
        </h2>
        <p className="mt-4 text-sm sm:text-base font-light text-background leading-relaxed max-w-2xl">
          Some students benefit from structured global experiences that build
          confidence, perspective, and independence before continuing their
          studies. Through iCollege Global, students may access international
          programmes and transition experiences designed with intention and
          support.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-3 gap-4">
        {benefits.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              delay: index * stagger.cards,
              duration: duration.slow,
              ease: easing.apple,
            }}
            whileHover={{ y: -4 }}
          >
            <div
              className="group relative h-full rounded-2xl border border-white/10 overflow-hidden flex flex-col transition-all duration-300 hover:border-white/20"
              style={{ background: "oklch(0.18 0.01 255)" }}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-secondary" aria-hidden />
              <div className="flex flex-col gap-3 p-5 flex-1">
                <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-secondary/15">
                  <item.icon className="w-4 h-4 text-secondary" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-semibold text-background leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm font-light text-background leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="mt-8"
      >
        <motion.div
          whileHover={{ scale: scale.button }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: duration.fast, ease: easing.smooth }}
          className="inline-block"
        >
          <Button
            size="default"
            asChild
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-6 py-2.5 text-sm rounded-lg shadow-md transition-all duration-300 hover:shadow-lg group"
          >
            <Link href="/global-experiences">
              Explore iCollege Global
              <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-300" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </SectionFrame>
  );
}
