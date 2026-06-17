"use client";

import { motion } from "motion/react";
import {
  FileUser,
  GraduationCap,
  CalendarCheck,
  Building2,
  Route,
} from "lucide-react";
import { easing, duration, stagger } from "@/lib/animations";
import { SanityImage } from "@/components/shared/SanityImage";
import type { ImageBlockData } from "@/types/sanity";

interface AthletesHowItWorksProps {
  studyRoomImage: ImageBlockData["image"];
  tabletLearningImage: ImageBlockData["image"];
  classroomImage: ImageBlockData["image"];
}

const steps = [
  {
    icon: FileUser,
    title: "Personal Learning Plan",
    body: "Designed to align with training and competition schedules.",
  },
  {
    icon: GraduationCap,
    title: "Flexible Academics",
    body: "Earn an accredited US High School Diploma, recognised globally.",
  },
  {
    icon: CalendarCheck,
    title: "Weekly Coaching & Accountability",
    body: "Stay focused and organised, and make consistent progress.",
  },
  {
    icon: Building2,
    title: "Optional In-Person Sessions (Barcelona)",
    body: "Access a professional environment at The Social Hub.",
  },
  {
    icon: Route,
    title: "University Pathway Planning",
    body: "Benefit from clear pathways to universities in the US, UK, and Europe.",
  },
];

function MediaImage({
  image,
  alt,
  width,
  wrapperClassName,
  sizes,
}: {
  image: ImageBlockData["image"];
  alt: string;
  width: number;
  wrapperClassName: string;
  sizes: string;
}) {
  if (!image?.asset) return null;

  return (
    <div className={wrapperClassName}>
      <SanityImage
        value={{ ...image, alt: image.alt ?? alt }}
        width={width}
        fill
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}

export function AthletesHowItWorks({
  studyRoomImage,
  tabletLearningImage,
  classroomImage,
}: AthletesHowItWorksProps) {
  return (
    <section className="py-14 md:py-24 bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
            How it works
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-[2.25rem] font-heading font-bold tracking-tight leading-tight text-foreground">
            Our program offers a simple, structured system:
          </h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-start">
          <div className="grid gap-4 sm:grid-cols-2">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  delay: i * stagger.cards,
                  duration: duration.slow,
                  ease: easing.apple,
                }}
                className="rounded-2xl border border-border bg-card p-5 sm:p-6 flex gap-4"
              >
                <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <step.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-sm font-heading font-bold text-foreground mb-1.5 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: 0.2, duration: 0.5, ease: easing.apple }}
            className="grid grid-cols-2 gap-3 lg:sticky lg:top-24"
          >
            <MediaImage
              image={classroomImage}
              alt="Students learning in a classroom environment"
              width={900}
              wrapperClassName="relative col-span-2 aspect-16/10 rounded-xl overflow-hidden border border-border"
              sizes="(max-width: 1024px) 100vw, 35vw"
            />
            <MediaImage
              image={studyRoomImage}
              alt="Focused students studying together"
              width={600}
              wrapperClassName="relative aspect-square rounded-xl overflow-hidden border border-border"
              sizes="(max-width: 1024px) 50vw, 17vw"
            />
            <MediaImage
              image={tabletLearningImage}
              alt="Student using tablet for flexible learning"
              width={600}
              wrapperClassName="relative aspect-square rounded-xl overflow-hidden border border-border"
              sizes="(max-width: 1024px) 50vw, 17vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
