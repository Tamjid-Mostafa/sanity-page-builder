"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface BigWordSectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  bigWord: string;
  align?: "left" | "center";
  className?: string;
}

export function BigWordSectionHeader({
  eyebrow,
  title,
  subtitle,
  bigWord,
  align = "left",
  className,
}: BigWordSectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "relative py-10 md:py-12 lg:py-18",
        isCenter ? "text-center mx-auto" : "text-left",
        className,
      )}
    >
      {/* Big background word - faint, non-interactive, with marquee effect */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 bottom-0 pointer-events-none select-none overflow-hidden"
      >
        <motion.div
          animate={{
            x: [0, -1000],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className={cn(
            "whitespace-nowrap",
            "text-[12rem] sm:text-[16rem] md:text-[20rem] lg:text-[24rem] xl:text-[28rem]",
            "font-heading font-black uppercase tracking-tighter leading-none",
            "text-foreground/3",
            isCenter
              ? "absolute top-1/2 -translate-y-1/2 left-0"
              : "absolute top-1/2 -translate-y-1/2 left-0",
          )}
        >
          {bigWord} {bigWord} {bigWord} {bigWord} {bigWord}
        </motion.div>
      </div>

      {/* Content - on top of big word */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className={cn(
              "text-sm md:text-base font-medium text-primary uppercase tracking-wide mb-4",
              isCenter && "mx-auto",
            )}
          >
            {eyebrow}
          </motion.p>
        )}

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className={cn(
            "text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold text-foreground mb-3 tracking-tight leading-[1.08]",
            isCenter && "mx-auto",
          )}
        >
          {title}
        </motion.h2>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={cn(
              "text-sm sm:text-base font-light text-foreground leading-relaxed max-w-3xl",
              isCenter && "mx-auto",
            )}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}
