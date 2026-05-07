"use client";

import { motion } from "motion/react";
import { Image } from "next-sanity/image";
import { urlFor } from "@/sanity/lib/image";
import { easing, duration } from "@/lib/animations";

export type ExperienceCard = {
  _key?: string;
  title?: string | null;
  description?: string | null;
  alt?: string | null;
  image?: {
    asset?: { _ref?: string; url?: string | null } | null;
    hotspot?: unknown;
    crop?: unknown;
  } | null;
};

export function ExperienceCardGridCard({
  card,
  index,
}: {
  card: ExperienceCard;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        delay: index * 0.1,
        duration: duration.slow,
        ease: easing.apple,
      }}
      whileHover={{
        y: -4,
        transition: { duration: duration.medium, ease: easing.smooth },
      }}
      className="group relative overflow-hidden rounded-xl border border-border/40"
    >
      <div className="relative h-80 w-full overflow-hidden md:h-96">
        {card.image?.asset ? (
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, ease: easing.smooth }}
            className="h-full w-full"
          >
            <Image
              src={urlFor(card.image).width(1200).height(960).fit("crop").url()}
              alt={card.alt || card.title || ""}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-primary/30 to-secondary/20" />
        )}

        <div className="pointer-events-none absolute inset-0 bg-foreground/8" aria-hidden />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
          >
            {card.title && (
              <h3 className="text-2xl font-heading font-bold leading-tight text-white md:text-3xl">
                {card.title}
              </h3>
            )}
            {card.description && (
              <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-white opacity-0 transition-all duration-300 group-hover:max-h-20 group-hover:opacity-100 md:text-base">
                {card.description}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
