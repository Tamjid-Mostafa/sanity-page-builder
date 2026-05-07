"use client";

import { motion } from 'motion/react';
import { easing, duration, scale } from '@/lib/animations';

export default function ProgramGridBlock({ data }: { data: any }) {
  return (
    <section className="py-16 lg:py-24">
      <div className="container px-4 sm:px-6 lg:px-8">
        {data.title && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: easing.apple }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.title}</h2>
            {data.subtitle && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{data.subtitle}</p>
            )}
          </motion.div>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.programs?.map((program: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                delay: idx * 0.09,
                duration: duration.slow,
                ease: easing.apple,
              }}
              whileHover={{ y: -3, scale: scale.subtle }}
              className="border rounded-lg p-6 transition-shadow duration-300 hover:shadow-md"
            >
              <h3 className="text-xl font-bold mb-2">{program.title}</h3>
              <p className="text-muted-foreground">{program.excerpt}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
