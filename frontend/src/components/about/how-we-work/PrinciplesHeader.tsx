"use client";

import { motion } from "motion/react";

export function PrinciplesHeader() {
  return (
    <section className="w-full bg-white border-t border-black/5 py-20 sm:py-24">
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-black leading-tight">
            A clear set of practices
          </h2>
          <p className="text-lg text-black leading-relaxed max-w-[68ch] mx-auto">
            A clear set of practices for how iCollege Life designs, delivers, and grows.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
