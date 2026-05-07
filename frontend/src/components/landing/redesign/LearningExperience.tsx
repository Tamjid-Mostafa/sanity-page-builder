"use client";

import React from "react";
import { motion } from "motion/react";
import { Monitor, Globe, Users } from "lucide-react";
import { easing, duration } from "@/lib/animations";
import { SectionFrame } from "./SectionFrame";
import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import type { SectionImages } from "@/sanity/queries";

// Local photo fallbacks – matched by content name
import imgHybrid   from "../../../../assets/thesocialhub_barcelona_coworking_meetingroom_0.webp";
import imgRealWorld from "../../../../assets/Real World enviorments.webp";
import imgLifestyle from "../../../../assets/Collabrative Learning.jpg";

const features: {
  icon: React.ElementType;
  imgKey: keyof SectionImages;
  localImg: StaticImageData;
  localAlt: string;
  tag: string;
  title: string;
  description: string;
  large: boolean;
}[] = [
  {
    icon: Monitor,
    imgKey: "method_build",
    localImg: imgHybrid,
    localAlt: "TSH Barcelona coworking space – hybrid learning environment",
    tag: "Delivery",
    title: "Hybrid by design",
    description:
      "In-person teaching supported by intentional online tools — not the other way around.",
    large: true,
  },
  {
    icon: Globe,
    imgKey: "method_design",
    localImg: imgRealWorld,
    localAlt: "Real-world learning environment",
    tag: "Environment",
    title: "Real-world environments",
    description:
      "Professional settings. Adult contexts. Not isolated classrooms.",
    large: false,
  },
  {
    icon: Users,
    imgKey: "method_learn",
    localImg: imgLifestyle,
    localAlt: "Students collaborating – a learning lifestyle",
    tag: "Mindset",
    title: "A learning lifestyle",
    description: "Shaped by environment, experience, and purposeful work.",
    large: false,
  },
];

export function LearningExperienceSection({
  images,
}: {
  images: Partial<SectionImages>;
}) {
  return (
    <SectionFrame className="bg-muted/30" containerClassName="relative z-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground mb-2">
          How we learn
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground">
          A modern learning model.
        </h2>
      </motion.div>

      {/* Bento grid: large left + two stacked right */}
      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-3">
        {/* Large card */}
        <BentoCard feature={features[0]} images={images} index={0} />

        {/* Two small cards stacked */}
        <div className="grid grid-rows-2 gap-3">
          <BentoCard feature={features[1]} images={images} index={1} />
          <BentoCard feature={features[2]} images={images} index={2} />
        </div>
      </div>
    </SectionFrame>
  );
}

function BentoCard({
  feature,
  images,
  index,
}: {
  feature: (typeof features)[number];
  images: Partial<SectionImages>;
  index: number;
}) {
  const img = images[feature.imgKey];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{
        delay: index * 0.1,
        duration: duration.slow,
        ease: easing.apple,
      }}
      whileHover={{ y: -4, transition: { duration: 0.25, ease: easing.smooth } }}
      className={cn(
        "group relative overflow-hidden rounded-2xl",
        feature.large
          ? "min-h-[420px] md:min-h-[520px]"
          : "min-h-[200px] md:min-h-[248px]",
      )}
    >
      {/* Background image — Sanity first, then local photo fallback */}
      {img?.url ? (
        <Image
          src={img.url}
          alt={img.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 800px"
        />
      ) : (
        <Image
          src={feature.localImg}
          alt={feature.localAlt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 800px"
        />
      )}

      {/* Gradient overlay — dark at bottom, transparent at top */}
      <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/60 to-black/20" />

      {/* Top badge */}
      <div className="absolute top-4 left-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/50 text-[10px] font-bold uppercase tracking-widest text-white">
          <feature.icon className="w-3 h-3" strokeWidth={2} />
          {feature.tag}
        </span>
      </div>

      {/* Bottom text */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3
          className={cn(
            "font-heading font-semibold text-white leading-tight mb-1.5",
            feature.large ? "text-2xl sm:text-3xl" : "text-lg",
          )}
        >
          {feature.title}
        </h3>
        <p
          className={cn(
            "text-white/90 leading-relaxed font-light",
            feature.large ? "text-sm max-w-sm" : "text-xs",
          )}
        >
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}
