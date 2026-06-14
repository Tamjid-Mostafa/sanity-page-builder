"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE_CALENDLY_URL } from "@/lib/site-cta";
import { easing, duration, scale } from "@/lib/animations";

interface BookConversationButtonProps {
  /** Visual variant — matches the section background */
  tone?: "on-dark" | "on-light";
  size?: "default" | "lg" | "sm";
  className?: string;
  /** Override the Calendly URL (defaults to SITE_CALENDLY_URL) */
  calendlyUrl?: string;
  showIcon?: boolean;
  showArrow?: boolean;
  label?: string;
}

function openCalendly(url: string) {
  if (typeof window !== "undefined" && (window as unknown as { Calendly?: { initPopupWidget: (opts: { url: string }) => void } }).Calendly) {
    (window as unknown as { Calendly: { initPopupWidget: (opts: { url: string }) => void } }).Calendly.initPopupWidget({ url });
    return;
  }
  // Fallback: open in new tab if script hasn't loaded yet
  window.open(url, "_blank", "noopener,noreferrer");
}

export function BookConversationButton({
  tone = "on-light",
  size = "default",
  className,
  calendlyUrl,
  showIcon = false,
  showArrow = true,
  label = "Book a Conversation",
}: BookConversationButtonProps) {
  const url = calendlyUrl ?? SITE_CALENDLY_URL;
  const isRoundedLg = className?.includes("rounded-lg");

  const baseClass =
    tone === "on-dark"
      ? "bg-primary text-primary-foreground hover:bg-primary/90"
      : "bg-primary text-primary-foreground hover:bg-primary/90";

  return (
    <motion.div
      whileHover={{ scale: scale.button }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: duration.fast, ease: easing.smooth }}
      className={cn("inline-block", className)}
    >
      <Button
        size={size}
        onClick={() => openCalendly(url)}
        className={cn(
          "font-semibold shadow-md transition-all duration-300 hover:shadow-lg group cursor-pointer",
          isRoundedLg ? "rounded-lg" : "rounded-xl",
          size === "lg" ? "h-14 px-8 text-sm" : "px-8 py-3 text-sm",
          !isRoundedLg && size !== "lg" && "px-6 py-2.5",
          baseClass,
        )}
      >
        {showIcon && (
          <Calendar className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
        )}
        <span>{label}</span>
        {showArrow && (
          <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-300" />
        )}
      </Button>
    </motion.div>
  );
}

/**
 * Outline variant — used as the secondary CTA alongside BookConversationButton.
 * Tone-aware: transparent on dark, bordered on light.
 */
export function OutlineCtaButton({
  href,
  label,
  tone = "on-light",
  size = "default",
  className,
  newTab = false,
}: {
  href: string;
  label: string;
  tone?: "on-dark" | "on-light";
  size?: "default" | "lg" | "sm";
  className?: string;
  newTab?: boolean;
}) {
  const isRoundedLg = className?.includes("rounded-lg");
  const isOnDark = tone === "on-dark";
  const darkClass =
    "border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white hover:border-white/30";
  const lightClass =
    "border-border text-foreground hover:bg-muted";

  return (
    <motion.div
      whileHover={{ scale: scale.button }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: duration.fast, ease: easing.smooth }}
      className={cn("inline-block", className)}
    >
      <Button
        size={size}
        variant={isOnDark ? "ghost" : "outline"}
        asChild
        className={cn(
          "font-semibold transition-all duration-300 group",
          isRoundedLg ? "rounded-lg" : "rounded-xl",
          size === "lg" ? "h-14 px-8 text-sm" : "px-8 py-3 text-sm",
          !isRoundedLg && size !== "lg" && "px-6 py-2.5",
          isOnDark ? darkClass : lightClass,
        )}
      >
        <a
          href={href}
          {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {label}
          <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-300" />
        </a>
      </Button>
    </motion.div>
  );
}
