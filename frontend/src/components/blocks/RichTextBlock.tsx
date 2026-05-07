"use client";

import { motion } from 'motion/react';
import { easing } from '@/lib/animations';

export default function RichTextBlock({ data }: { data: any }) {
  return (
    <section className="py-16 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: easing.apple }}
        className="container px-4 sm:px-6 lg:px-8"
      >
        <div className="prose prose-lg max-w-3xl mx-auto">
          {/* Add Portable Text rendering here */}
          <p>Rich text content</p>
        </div>
      </motion.div>
    </section>
  );
}
