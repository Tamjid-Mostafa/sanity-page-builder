"use client";

import { motion } from "motion/react";
import {
  GraduationCap,
  UserCheck,
  Route,
  BadgeCheck,
} from "lucide-react";
import { easing, duration, stagger } from "@/lib/animations";

const points = [
  {
    icon: GraduationCap,
    title: "Qualified teachers, experiential system",
    body: "Not a self-directed online program.",
  },
  {
    icon: UserCheck,
    title: "Personal support and accountability",
    body: "Structure and follow-through at every step.",
  },
  {
    icon: Route,
    title: "Clear academic and university pathways",
    body: "US, UK, and EU options explained early.",
  },
  {
    icon: BadgeCheck,
    title: "Invest in stability and trust",
    body: "You are not simply purchasing flexibility. You are investing in stability, trust, and your child’s future.",
  },
];

export function AthletesWhyUs() {
  return (
    <section className="py-14 md:py-24 bg-muted/30">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
            Why parents trust us
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.875rem] font-heading font-bold tracking-tight leading-tight text-foreground">
            Real teaching. Real pathways. Real support.
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 max-w-4xl">
          {points.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                delay: i * stagger.cards,
                duration: duration.slow,
                ease: easing.apple,
              }}
              className="rounded-xl border border-border bg-card p-5 flex gap-4"
            >
              <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <item.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-sm font-heading font-bold text-foreground mb-1 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
