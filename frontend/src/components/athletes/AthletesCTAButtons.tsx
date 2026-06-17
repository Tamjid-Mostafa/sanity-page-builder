"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ATHLETES_CALENDLY_URL } from "@/lib/athletes-cta";
import { openCalendly } from "@/lib/site-cta";
import { duration, easing, scale } from "@/lib/animations";
import { cn } from "@/lib/utils";

type Tone = "on-dark" | "on-light";

export function AthletesCTAButtons({
  tone = "on-light",
  className,
  compact = false,
}: {
  tone?: Tone;
  className?: string;
  compact?: boolean;
}) {

  const primary =
    "bg-primary text-primary-foreground hover:bg-primary/90 border-0";

  const secondary =
    tone === "on-dark"
      ? "border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white hover:border-white/40 backdrop-blur-sm"
      : "border-border bg-background text-foreground hover:bg-muted hover:border-border";

  const size = compact ? "sm" : "lg";
  const height = compact ? "h-10 text-xs" : "h-12 text-sm";

  return (
    <>
      <div
        className={cn(
          "flex flex-col sm:flex-row flex-wrap gap-3",
          className,
        )}
      >
        {/* Book a Conversation — Calendly popup */}
        <motion.div
          whileHover={{ scale: scale.button }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: duration.fast, ease: easing.smooth }}
        >
          <Button
            size={size as "sm" | "lg"}
            onClick={() => openCalendly(ATHLETES_CALENDLY_URL)}
            className={cn(
              "rounded-xl font-semibold px-6 shadow-sm transition-all duration-300 group cursor-pointer",
              height,
              primary,
            )}
          >
            👉 Book a Conversation
            <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-300" />
          </Button>
        </motion.div>

        {/* Explore Academy Partnership — scrolls to #sports-academies */}
        <motion.div
          whileHover={{ scale: scale.button }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: duration.fast, ease: easing.smooth }}
        >
          <Button
            size={size as "sm" | "lg"}
            variant="outline"
            onClick={() => {
              const el = document.getElementById("sports-academies");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className={cn(
              "rounded-xl font-semibold px-6 transition-all duration-300 group cursor-pointer",
              height,
              secondary,
            )}
          >
            Explore Academy Partnership
            <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-300" />
          </Button>
        </motion.div>
      </div>
    </>
  );
}
