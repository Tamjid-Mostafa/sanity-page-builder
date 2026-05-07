"use client";

import React from "react";
import { motion } from "motion/react";
import { BookOpen, Compass, Rocket } from "lucide-react";
import { easing, duration } from "@/lib/animations";
import { SectionFrame } from "./SectionFrame";
import { cn } from "@/lib/utils";
import Image from "next/image";
import type { SectionImages } from "@/sanity/queries";

// Local photo fallbacks – named to match the content of each step
import imgLearn  from "../../../../assets/Collabrative Learning.jpg";
import imgDesign from "../../../../assets/medium-shot-woman-sitting-desk.jpg";
import imgBuild  from "../../../../assets/Real World enviorments.webp";

export function MethodSection({ images }: { images: Partial<SectionImages> }) {
  const steps = [
    {
      icon: BookOpen,
      illustration: images.method_learn?.url
        ? <Image src={images.method_learn.url} alt={images.method_learn.alt} fill className="object-cover" sizes="(max-width: 768px) 90vw, 33vw" />
        : <Image src={imgLearn} alt="Students learning collaboratively" fill className="object-cover" sizes="(max-width: 768px) 90vw, 33vw" />,
      title: "Learn what matters",
      description: "From academic foundations to real-world experiences",
      colorClass: "text-primary",
      iconBgClass: "bg-primary/10",
    },
    {
      icon: Compass,
      illustration: images.method_design?.url
        ? <Image src={images.method_design.url} alt={images.method_design.alt} fill className="object-cover" sizes="(max-width: 768px) 90vw, 33vw" />
        : <Image src={imgDesign} alt="Student designing her path at her desk" fill className="object-cover object-top" sizes="(max-width: 768px) 90vw, 33vw" />,
      title: "Design what fits",
      description: "Map out a direction that reflects your goals, strengths, and aspirations",
      colorClass: "text-primary",
      iconBgClass: "bg-primary/10",
    },
    {
      icon: Rocket,
      illustration: images.method_build?.url
        ? <Image src={images.method_build.url} alt={images.method_build.alt} fill className="object-cover" sizes="(max-width: 768px) 90vw, 33vw" />
        : <Image src={imgBuild} alt="Real-world learning environment" fill className="object-cover" sizes="(max-width: 768px) 90vw, 33vw" />,
      title: "Build what's real",
      description: "Apply knowledge in real environments, and leave equipped for what comes next",
      colorClass: "text-primary",
      iconBgClass: "bg-primary/10",
    },
  ];

  return (
    <SectionFrame className="bg-background">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
          How it works
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground">
          A structured approach to learning.
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              delay: index * 0.12,
              duration: duration.slow,
              ease: easing.apple,
            }}
          >
            <StepItem step={step} index={index} />
          </motion.div>
        ))}
      </div>

    </SectionFrame>
  );
}

function StepItem({
  step,
  index,
}: {
  step: {
    icon: React.ElementType;
    illustration: React.ReactNode;
    title: string;
    description: string;
    colorClass: string;
    iconBgClass: string;
  };
  index: number;
}) {
  return (
    <div className="group bg-card rounded-2xl shadow-sm overflow-hidden flex flex-col h-full transition-shadow duration-300 hover:shadow-md">
      {/* Illustration */}
      <div className="relative w-full h-44 overflow-hidden">
        <div className="w-full h-full transition-transform duration-500 group-hover:scale-[1.03]">
          {step.illustration}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-muted">
            <step.icon
              className={cn("w-4 h-4", step.colorClass)}
              strokeWidth={1.5}
            />
          </div>
          <span className="text-2xl font-bold text-charcoal select-none tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h3 className="text-sm font-semibold text-foreground leading-snug">
          {step.title}
        </h3>
        <p className="text-sm font-light text-foreground leading-relaxed">
          {step.description}
        </p>
      </div>
    </div>
  );
}
