"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { GraduationCap, Compass, ArrowRight } from "lucide-react";
import { easing, duration } from "@/lib/animations";
import { SectionFrame } from "./SectionFrame";
import Image from "next/image";
import type { SectionImages } from "@/sanity/queries";

export function WhoThisIsForSection({ images }: { images: Partial<SectionImages> }) {
  const audiences = [
    {
      icon: GraduationCap,
      illustration: images.who_academy?.url ? <Image src={images.who_academy.url} alt={images.who_academy.alt} fill className="object-cover" sizes="(max-width: 768px) 90vw, 50vw" /> : null,
      title: "Students (15–18)",
      description: "Seeking a rigorous, future-facing alternative to traditional schooling.",
      colorClass: "text-primary",
      href: "/academy",
      label: "iCollege Academy",
    },
    {
      icon: Compass,
      illustration: images.who_global?.url ? <Image src={images.who_global.url} alt={images.who_global.alt} fill className="object-cover" sizes="(max-width: 768px) 90vw, 50vw" /> : null,
      title: "Young adults (18–25)",
      description: "Seeking clarity during key academic or life transitions.",
      colorClass: "text-secondary",
      href: "/global-experiences",
      label: "iCollege Global",
    },
  ];

  return (
    <SectionFrame className="bg-background">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground mb-2">
          Who we work with
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground">
          Education at every stage.
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4">
        {audiences.map((audience, index) => (
          <Link key={audience.title} href={audience.href} className="block group">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.12, duration: duration.slow, ease: easing.apple }}
              whileHover={{ y: -2 }}
              className="h-full bg-card rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              {/* Illustration */}
              <div className="relative w-full h-44 overflow-hidden">
                {audience.illustration}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-3 p-6 flex-1">
                <div className="flex items-center gap-2">
                  <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-muted shrink-0">
                    <audience.icon className={`w-4 h-4 ${audience.colorClass}`} strokeWidth={1.5} />
                  </div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {audience.label}
                  </p>
                </div>
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-foreground leading-tight">
                  {audience.title}
                </h3>
                <p className="text-sm font-light text-foreground/70 leading-relaxed flex-1">
                  {audience.description}
                </p>
                <div className={`inline-flex items-center gap-1 text-sm font-medium ${audience.colorClass}`}>
                  Learn more
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </SectionFrame>
  );
}
