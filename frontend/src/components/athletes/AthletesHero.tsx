"use client";

import { motion } from "motion/react";
import { CheckCircle } from "lucide-react";
import { easing } from "@/lib/animations";
import { AthletesCTAButtons } from "@/components/athletes/AthletesCTAButtons";
import Image from "next/image";
import { urlForImage, type SanityImageField } from "@/sanity/lib/image";

const credentials = [
  "Accredited US High School Diploma",
  "Ages 13–19",
  "Online & Barcelona (The Social Hub)",
  "University pathways: US · UK · Europe",
];

interface AthletesHeroProps {
  heroImage: SanityImageField;
}

export function AthletesHero({ heroImage }: AthletesHeroProps) {
  const img = urlForImage(heroImage, { maxWidth: 1920 });

  return (
    <>
      <section
        className="relative min-h-[88vh] flex items-end bg-black overflow-hidden pt-14"
        aria-label="iCollege Athletes"
      >
        {img && (
          <Image
            src={img.src}
            alt={img.alt ?? "Student-athletes sprinting during a football match"}
            fill
            priority
            className="object-cover"
            sizes="100vw"
            placeholder={img.blurDataURL ? "blur" : "empty"}
            blurDataURL={img.blurDataURL ?? undefined}
          />
        )}
        <div className="absolute inset-0 bg-linear-to-br from-slate-900/55 via-[#0c1e35]/45 to-[#0e2540]/40" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-primary/8 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-r from-black/35 via-black/12 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/55 to-transparent" />

        <div className="relative z-10 w-full">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12 pb-14 md:pb-20 lg:pb-24">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 lg:gap-16">
              <div className="flex flex-col gap-5 max-w-xl">
                <motion.span
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary w-fit"
                >
                  iCollege Athletes
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="font-heading font-bold text-white leading-[1.06] tracking-tight text-3xl sm:text-4xl md:text-[2.75rem] lg:text-[3.25rem]"
                >
                  Train hard. Build a life worth living.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.12 }}
                  className="text-base leading-relaxed text-white/82 max-w-[48ch]"
                >
                  Flexible academic pathways for student-athletes, built around training, competition, travel, and future university goals.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28, duration: 0.4 }}
                >
                  <AthletesCTAButtons tone="on-dark" />
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45, duration: 0.4 }}
                  className="text-xs text-white/45"
                >
                  No commitment — explore fit in one conversation.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.55, ease: easing.apple }}
                className="hidden lg:flex flex-col gap-3 min-w-[280px]"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-1">
                  At a glance
                </p>
                {credentials.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.48 + i * 0.06, duration: 0.35 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle
                      className="h-4 w-4 text-secondary shrink-0"
                      strokeWidth={1.5}
                    />
                    <span className="text-sm text-white/72 leading-snug">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-black/95 border-b border-white/8">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-3.5">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.45 }}
            className="flex flex-wrap items-center gap-x-5 gap-y-2 justify-center lg:justify-start text-center lg:text-left"
          >
            {[
              { label: "Accredited diploma", hint: "US · global recognition" },
              { label: "Guided programme", hint: "Not self-study only" },
              { label: "Built for travel", hint: "Training-first scheduling" },
            ].map((badge, i) => (
              <span
                key={badge.label}
                className="inline-flex items-center gap-2 text-[11px] text-white/55"
              >
                {i !== 0 && (
                  <span className="hidden sm:inline h-3 w-px bg-white/15" aria-hidden />
                )}
                <span className="font-semibold text-white/75">{badge.label}</span>
                <span className="text-white/40">·</span>
                <span>{badge.hint}</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}
