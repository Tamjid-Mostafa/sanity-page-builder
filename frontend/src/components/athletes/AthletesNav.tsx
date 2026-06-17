"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ATHLETES_CALENDLY_URL } from "@/lib/athletes-cta";
import { openCalendly } from "@/lib/site-cta";

export function AthletesNav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-black/60 border-b border-white/10">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between h-14">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-heading font-bold text-white text-base tracking-tight">
            iCollege
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-secondary">
            Athletes
          </span>
        </Link>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <Button
            size="sm"
            onClick={() => openCalendly(ATHLETES_CALENDLY_URL)}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg text-xs font-semibold px-4 shadow-sm group cursor-pointer"
          >
            Book a Conversation
            <ArrowRight className="ml-1 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
          </Button>
        </motion.div>
      </div>
    </header>
  );
}
