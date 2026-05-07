"use client";

import React from "react";
import { motion } from "motion/react";

interface AnimatedTrendingUpIconProps {
  size?: number;
  color?: string;
  className?: string;
  loop?: boolean;
  pause?: boolean;
}

export function AnimatedTrendingUpIcon({
  size = 24,
  color = "currentColor",
  className = "",
  loop = true,
  pause = false,
}: AnimatedTrendingUpIconProps) {
  // Path draws from bottom-left to top-right
  const pathAnimation = {
    pathLength: [0, 1],
    transition: {
      duration: 1.8,
      repeat: loop ? Infinity : 0,
      ease: [0.42, 0, 0.58, 1] as const, // easeInOut
      repeatDelay: 0.8,
    },
  };

  // Arrow head pops in after path completes
  const arrowAnimation = {
    opacity: [0, 0, 1],
    scale: [0.3, 0.3, 1],
    rotate: [0, 0, 0],
    transition: {
      duration: 1.8,
      repeat: loop ? Infinity : 0,
      times: [0, 0.75, 1],
      ease: [0.34, 1.56, 0.64, 1] as const, // backOut
      repeatDelay: 0.8,
    },
  };

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* 
        Path explanation (draws BOTTOM to TOP):
        M2 17 = Move to bottom-left (x=2, y=17)
        L8.5 10.5 = Line to first peak
        L13.5 15.5 = Line down to valley
        L22 7 = Line up to top-right corner
        
        SVG coordinate system: y increases DOWNWARD
        So y=17 is LOWER than y=7
      */}
      <motion.path
        d="M2 17 L8.5 10.5 L13.5 15.5 L22 7"
        initial={{ pathLength: 0, opacity: 1 }}
        animate={pause ? { pathLength: 0 } : pathAnimation}
      />
      
      {/* 
        Arrow corner (L-shape at top-right):
        M16 7 = Move to corner start
        h6 = horizontal line 6 units right (to x=22)
        v6 = vertical line 6 units down (to y=13)
      */}
      <motion.path
        d="M16 7h6v6"
        initial={{ opacity: 0, scale: 0.3 }}
        animate={pause ? { opacity: 0, scale: 0.3 } : arrowAnimation}
        // style={{ transformOrigin: "22px 7px" }}
      />
    </motion.svg>
  );
}

export default AnimatedTrendingUpIcon;
