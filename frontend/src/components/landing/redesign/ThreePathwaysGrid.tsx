"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { GraduationCap, Globe, ArrowRight } from "lucide-react";
import { easing, duration, stagger } from "@/lib/animations";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Image from "next/image";
import type { SectionImages } from "@/sanity/queries";
import { SectionFrame } from "./SectionFrame";
import { cn } from "@/lib/utils";

export function ThreePathwaysGrid({ images }: { images: Partial<SectionImages> }) {
  const pathways = [
    {
      icon: GraduationCap,
      illustration: images.pathway_academy?.url ? (
        <Image src={images.pathway_academy.url} alt={images.pathway_academy.alt} fill className="object-cover" sizes="(max-width: 768px) 90vw, 50vw" />
      ) : (
        <div className={cn("absolute inset-0 bg-linear-to-br from-primary/20 to-secondary/20")} aria-hidden />
      ),
      title: "iCollege Academy",
      ageBand: null,
      subtitle: "Motivated students aged 15–18 seeking a focused, modern learning environment.",
      description:
        "Students complete internationally recognised qualifications such as A Levels or High School Diploma pathways, alongside structured mentoring and personal development.",
      buttonText: "Learn More",
      href: "/academy",
      iconColorClass: "text-primary",
      accentClass: "bg-primary",
    },
    {
      icon: Globe,
      illustration: images.pathway_global?.url ? (
        <Image src={images.pathway_global.url} alt={images.pathway_global.alt} fill className="object-cover" sizes="(max-width: 768px) 90vw, 50vw" />
      ) : (
        <div className={cn("absolute inset-0 bg-linear-to-br from-secondary/20 to-primary/20")} aria-hidden />
      ),
      title: "iCollege Global",
      ageBand: null,
      subtitle: "Ambitious young adults navigating transition beyond school or university.",
      description:
        "Through internships, leadership development, and real-world projects, students gain clarity, direction, and experience that goes beyond the classroom.",
      buttonText: "Explore Programs",
      href: "/global-experiences",
      iconColorClass: "text-secondary",
      accentClass: "bg-secondary",
    },
  ];

  return (
    <SectionFrame className="bg-background">
      <SectionHeading
        title="Who We Work With"
        subtitle="iCollege Life supports young people at pivotal stages of development. Admission is selective and based on readiness and fit."
        align="left"
        className="mb-8"
        subtitleClassName="text-sm sm:text-base font-light"
      />

      <div className="grid md:grid-cols-2 gap-4">
        {pathways.map((pathway, index) => (
          <motion.div
            key={pathway.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              delay: index * stagger.cards,
              duration: duration.slow,
              ease: easing.apple,
            }}
            whileHover={{ y: -4 }}
            className="group relative"
          >
            <div className="relative h-full p-0 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col overflow-hidden">
              {/* Top accent bar */}
              <div
                className={`absolute top-0 left-0 right-0 h-0.5 ${pathway.accentClass}`}
                aria-hidden
              />
              {/* Illustration */}
              <div className="relative w-full h-44 overflow-hidden bg-muted">
                {pathway.illustration}
              </div>

              {/* Content */}
              <div className="flex flex-col p-5 flex-1">
                {/* Icon Badge */}
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-muted mb-4">
                  <pathway.icon
                    className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${pathway.iconColorClass}`}
                    strokeWidth={1.5}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-2.5">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-heading font-bold text-foreground leading-tight mb-1">
                      {pathway.title}
                    </h3>
                    {pathway.ageBand && (
                      <span className="inline-block px-3 py-0.5 text-xs font-medium bg-muted rounded-full">
                        {pathway.ageBand}
                      </span>
                    )}
                  </div>

                  <p className="text-sm font-medium text-foreground">
                    {pathway.subtitle}
                  </p>

                  <p className="text-sm font-light leading-relaxed text-foreground">
                    {pathway.description}
                  </p>
                </div>

                {/* CTA Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: duration.fast, ease: easing.smooth }}
                >
                  <Button
                    className="mt-5 w-full rounded-xl transition-all duration-300"
                    size="default"
                    asChild
                  >
                    <Link href={pathway.href}>
                      {pathway.buttonText}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </SectionFrame>
  );
}
