"use client";

import { motion } from "motion/react";
import { easing } from "@/lib/animations";

export function BrandPositioningStrip() {
  return (
    <section className="relative py-16 md:py-20 bg-muted">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Section Title */}
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: easing.apple }}
            className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground"
          >
            The World Has Changed. Education Must Too…
          </motion.h2>

          {/* First paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.14, duration: 0.6, ease: easing.apple }}
            className="text-lg md:text-xl font-light leading-relaxed max-w-4xl mx-auto hyphens-none break-normal"
          >
            AI, globalisation, and access to knowledge are reshaping how we live and work.{" "}
            What matters now is{" "}
            <span className="font-medium text-primary">adaptability</span>,{" "}
            <span className="font-medium text-secondary">self-direction</span>, and{" "}
            <span className="font-medium">independent thinking</span>{" "}
            to live a well-lived life.
          </motion.p>

          {/* Second paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.26, duration: 0.55, ease: easing.apple }}
            className="text-lg md:text-xl font-light leading-relaxed max-w-4xl mx-auto hyphens-none break-normal"
          >
            iCollege Life is designed for this reality — not outdated systems built for a past world.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

