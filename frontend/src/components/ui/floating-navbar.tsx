"use client";
import React, { useState, ReactNode } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { NavbarProvider } from "@/contexts/NavbarContext";

export const FloatingNav = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true); // Start as visible when at top
  const [isAtTop, setIsAtTop] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      setIsAtTop(current < 0.06);
      const previous = scrollYProgress.getPrevious();
      
      if (typeof previous === "number") {
        let direction = current - previous;

        // At the top of the page - always show
        if (current < 0.05) {
          setVisible(true);
        } else {
          // Not at top - show on scroll up, hide on scroll down
          if (direction < 0) {
            setVisible(true);
          } else {
            setVisible(false);
          }
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
        }}
        transition={{
          duration: 0.45,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={cn(
          "flex max-w-full w-full fixed top-0 inset-x-0 mx-auto border-b z-5000 pr-2 pl-8 py-2 items-center justify-center space-x-4 transition-colors duration-500",
          isAtTop
            ? "bg-transparent border-transparent"
            : "bg-background/95 border-border/40 backdrop-blur-md",
          className
        )}
      >
        <NavbarProvider isAtTop={isAtTop}>
          {children}
        </NavbarProvider>
      </motion.div>
    </AnimatePresence>
  );
};
