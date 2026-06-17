"use client";

import { motion } from "motion/react";
import {
  Trophy,
  BookOpen,
  ShieldCheck,
  Heart,
  Compass,
  GraduationCap,
} from "lucide-react";
import { easing, duration, stagger } from "@/lib/animations";
import { SanityImage } from "@/components/shared/SanityImage";
import type { ImageBlockData } from "@/types/sanity";

interface AthletesAboutProps {
  founderPortrait: ImageBlockData["image"];
}

const roots = [
  { icon: Trophy, text: "High-performance sport" },
  { icon: BookOpen, text: "Strong academic foundations" },
  { icon: ShieldCheck, text: "Structure and accountability" },
  { icon: Heart, text: "Mentorship and confidence" },
  { icon: Compass, text: "Leadership and direction" },
  { icon: GraduationCap, text: "Clear university pathways" },
];

export function AthletesAbout({ founderPortrait }: AthletesAboutProps) {
  return (
    <section className="py-14 md:py-20 bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
                About
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-[2.875rem] font-heading font-bold tracking-tight leading-tight text-foreground mb-4">
                Founded by a former professional athlete and qualified teacher
                who understands both performance sport and academic systems.
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="text-sm sm:text-base text-muted-foreground mb-2"
            >
              iCollege Athletes was built to solve a problem that traditional
              schools and online programmes haven&apos;t addressed properly.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.16, duration: 0.4 }}
              className="text-sm sm:text-base text-muted-foreground mb-8"
            >
              iCollege combines real experience of:
            </motion.p>

            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl mb-10">
              {roots.map((item, i) => (
                <motion.li
                  key={item.text}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * stagger.list,
                    duration: duration.medium,
                    ease: easing.apple,
                  }}
                  className="flex items-center gap-2.5 rounded-lg border border-border bg-card px-3 py-2.5"
                >
                  <item.icon
                    className="h-4 w-4 text-primary shrink-0"
                    strokeWidth={1.5}
                  />
                  <span className="text-xs sm:text-sm font-medium text-foreground leading-tight">
                    {item.text}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {founderPortrait?.asset && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.45, ease: easing.apple }}
              className="relative w-full max-w-[360px] aspect-3/4 rounded-2xl overflow-hidden border border-border bg-card lg:justify-self-end"
            >
              <SanityImage
                value={{
                  ...founderPortrait,
                  alt:
                    founderPortrait.alt ??
                    "Founder — former professional athlete and qualified teacher",
                }}
                width={720}
                fill
                sizes="(max-width: 1024px) 100vw, 360px"
                className="object-cover"
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
