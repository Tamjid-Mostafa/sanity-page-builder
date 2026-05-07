"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionFrame } from "./SectionFrame";
import illuVisionary from "../../../../assets/illustrations/undraw_visionary-technology_f6b3.svg";

export function EducationHasChangedSection() {
  return (
    <SectionFrame className="bg-background border-t border-border">
      {/* Flex row: text left, character right */}
      <div className="flex items-end gap-8 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="flex-1 min-w-0"
        >
          <SectionHeading
            title="Why iCollege Life Exists"
            align="left"
            className="mb-8 max-w-xl"
          />
          <div className="space-y-4 text-sm sm:text-base font-light text-foreground leading-relaxed max-w-3xl">
            <p>
              Education has long focused on academics, examinations, and
              credentials. Those things matter, but they are not enough. Many
              young people reach university and leave academically prepared, yet
              uncertain about direction, responsibility, and meaning.
            </p>
            <p>
              iCollege Life was created to bridge that gap. Our aim is simple:
              to help capable young people develop the knowledge, confidence, and
              direction to build meaningful lives.
            </p>
          </div>
        </motion.div>
      </div>
    </SectionFrame>
  );
}
