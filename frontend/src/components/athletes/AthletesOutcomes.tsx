"use client";

import { motion } from "motion/react";
import {
  Award,
  BookMarked,
  Sparkles,
  Globe2,
  Trophy,
} from "lucide-react";
import { easing, duration, stagger } from "@/lib/animations";
import Image from "next/image";
import { urlForImage, type SanityImageField } from "@/sanity/lib/image";

interface AthletesOutcomesProps {
  tennisImage: SanityImageField;
}

const outcomes = [
  {
    icon: Award,
    text: "A recognised US High School Diploma",
  },
  {
    icon: BookMarked,
    text: "Strong academic foundations and experience",
  },
  {
    icon: Sparkles,
    text: "Confidence, direction and modern life skills",
  },
  {
    icon: Globe2,
    text: "Clear pathways to university in the US, UK, and Europe.",
  },
  {
    icon: Trophy,
    text: "The ability to pursue sport without compromising academic achievement",
  },
];

export function AthletesOutcomes({ tennisImage: tennisData }: AthletesOutcomesProps) {
  const tennisImg = urlForImage(tennisData, { maxWidth: 720 });
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
            Outcomes
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.875rem] font-heading font-bold tracking-tight leading-tight text-foreground mb-3">
            This is more than flexible schooling; it is a comprehensive pathway.
          </h2>
          <p className="text-sm text-muted-foreground">Students leave with:</p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px] items-start">
          <ul className="grid gap-3 max-w-3xl">
            {outcomes.map((item, i) => (
              <motion.li
                key={item.text}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * stagger.list,
                  duration: duration.medium,
                  ease: easing.apple,
                }}
                className="flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3.5"
              >
                <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary/15">
                  <item.icon
                    className="h-4 w-4 text-foreground"
                    strokeWidth={1.5}
                  />
                </span>
                <span className="text-sm sm:text-base text-foreground leading-snug pt-0.5">
                  {item.text}
                </span>
              </motion.li>
            ))}
          </ul>
          {tennisImg && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.45 }}
              className="relative hidden lg:block w-full max-w-[360px] aspect-3/4 rounded-2xl overflow-hidden border border-border lg:justify-self-end"
            >
              <Image
                src={tennisImg.src}
                alt={tennisImg.alt ?? "Tennis athlete training on court"}
                fill
                className="object-cover"
                sizes="360px"
                placeholder={tennisImg.blurDataURL ? "blur" : "empty"}
                blurDataURL={tennisImg.blurDataURL ?? undefined}
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
