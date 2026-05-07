"use client";

import Link from 'next/link';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { easing, duration, scale } from '@/lib/animations';

export default function CTABlock({ data }: { data: any }) {
  return (
    <section className="py-16 lg:py-24 bg-foreground text-white">
      <div className="container px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: easing.apple }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          {data.title}
        </motion.h2>

        {data.description && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12, duration: 0.5, ease: easing.apple }}
            className="text-lg mb-8 max-w-2xl mx-auto opacity-90"
          >
            {data.description}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.22, duration: 0.45, ease: easing.apple }}
          className="flex flex-wrap gap-4 justify-center"
        >
          {data.ctas?.map((cta: any, idx: number) => (
            <motion.div
              key={idx}
              whileHover={{ scale: scale.button }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: duration.fast, ease: easing.smooth }}
            >
              <Button asChild variant="secondary" size="lg">
                <Link href={cta.url} target={cta.newTab ? '_blank' : undefined}>
                  {cta.text}
                </Link>
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
