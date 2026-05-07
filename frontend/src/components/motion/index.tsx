"use client";

/**
 * Motion Primitives
 * Reusable animated wrapper components powered by Framer Motion.
 * Design philosophy: Apple / Stripe — subtle, purposeful, non-distracting.
 *
 * Usage:
 *   import { FadeUp, Stagger, StaggerItem, AnimatedNumber } from "@/components/motion";
 */

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  type Variants,
  useInView,
  useMotionValue,
  useSpring,
} from "motion/react";
import { easing } from "@/lib/animations";

// ─── Shared prop types ───────────────────────────────────────────────────────

interface BaseProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds before this element starts animating after viewport entry. */
  delay?: number;
  /** Animation duration in seconds. */
  duration?: number;
  /** Whether to trigger the animation only once (recommended). */
  once?: boolean;
  /**
   * Intersection margin — negative value means "trigger when element
   * is N pixels inside the viewport". Keeps reveals feeling natural.
   */
  margin?: string;
}

// ─── FadeUp ──────────────────────────────────────────────────────────────────
// The workhorse: fade + 22 px slide-up when scrolled into view.
// Use for section headings, text blocks, and primary content.
// ─────────────────────────────────────────────────────────────────────────────

export function FadeUp({
  children,
  className,
  delay = 0,
  duration = 0.55,
  once = true,
  margin = "-80px",
}: BaseProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin }}
      transition={{ duration, delay, ease: easing.apple }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── FadeIn ──────────────────────────────────────────────────────────────────
// Pure opacity reveal — for decorative elements and images.
// ─────────────────────────────────────────────────────────────────────────────

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.55,
  once = true,
  margin = "-80px",
}: BaseProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once, margin }}
      transition={{ duration, delay, ease: easing.apple }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── ScaleIn ─────────────────────────────────────────────────────────────────
// Subtle scale from 0.96 + fade — for images, cards, and media.
// ─────────────────────────────────────────────────────────────────────────────

export function ScaleIn({
  children,
  className,
  delay = 0,
  duration = 0.55,
  once = true,
  margin = "-80px",
}: BaseProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once, margin }}
      transition={{ duration, delay, ease: easing.smooth }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── SlideIn ─────────────────────────────────────────────────────────────────
// Horizontal slide + fade — for side-by-side layouts.
// ─────────────────────────────────────────────────────────────────────────────

interface SlideInProps extends BaseProps {
  /** Which side to slide from. */
  direction?: "left" | "right";
}

export function SlideIn({
  children,
  className,
  direction = "left",
  delay = 0,
  duration = 0.55,
  once = true,
  margin = "-80px",
}: SlideInProps) {
  const x = direction === "left" ? -24 : 24;
  return (
    <motion.div
      initial={{ opacity: 0, x }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once, margin }}
      transition={{ duration, delay, ease: easing.apple }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Stagger + StaggerItem ───────────────────────────────────────────────────
// Container + children pattern for sequenced list/grid reveals.
//
// Usage:
//   <Stagger className="grid grid-cols-3 gap-4">
//     {items.map(item => (
//       <StaggerItem key={item.id}>
//         <Card>{...}</Card>
//       </StaggerItem>
//     ))}
//   </Stagger>
// ─────────────────────────────────────────────────────────────────────────────

const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easing.apple },
  },
};

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds between each child's animation start. */
  staggerDelay?: number;
  /** Seconds before ANY child starts animating after viewport entry. */
  initialDelay?: number;
  once?: boolean;
  margin?: string;
}

export function Stagger({
  children,
  className,
  staggerDelay = 0.09,
  initialDelay = 0,
  once = true,
  margin = "-80px",
}: StaggerProps) {
  const variants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={staggerItemVariants} className={className}>
      {children}
    </motion.div>
  );
}

// ─── AnimatedNumber ───────────────────────────────────────────────────────────
// Counts up from 0 to `value` with a spring when the element enters view.
// Perfect for statistics, KPIs, and impact numbers.
//
// Usage:
//   <AnimatedNumber value={240} suffix="+" className="text-5xl font-bold" />
//   <AnimatedNumber value={99.8} decimals={1} suffix="%" />
// ─────────────────────────────────────────────────────────────────────────────

interface AnimatedNumberProps {
  /** Target number to count up to. */
  value: number;
  /** Appended after the number, e.g. "+" or "%". */
  suffix?: string;
  /** Prepended before the number, e.g. "$". */
  prefix?: string;
  /** Spring animation duration in seconds. */
  duration?: number;
  /** Decimal places to display. */
  decimals?: number;
  className?: string;
}

export function AnimatedNumber({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  decimals = 0,
  className,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, motionValue, value]);

  useEffect(() => {
    return springValue.on("change", (v) => setDisplay(v.toFixed(decimals)));
  }, [springValue, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

// ─── RevealText ───────────────────────────────────────────────────────────────
// Staggered word-by-word reveal — for impactful headlines.
// Words fade up in sequence for a premium editorial feel.
//
// Usage:
//   <RevealText text="Education for a life worth living" as="h1" className="text-5xl" />
// ─────────────────────────────────────────────────────────────────────────────

interface RevealTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export function RevealText({
  text,
  as: Tag = "p",
  className,
  delay = 0,
  staggerDelay = 0.04,
}: RevealTextProps) {
  const words = text.split(" ");

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: easing.apple },
    },
  };

  const MotionTag = motion[Tag] as typeof motion.p;

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={containerVariants}
      className={className}
      aria-label={text}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordVariants}
          className="inline-block mr-[0.25em] last:mr-0"
        >
          {word}
        </motion.span>
      ))}
    </MotionTag>
  );
}
