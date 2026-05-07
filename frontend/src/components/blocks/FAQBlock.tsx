"use client";

import { motion } from 'motion/react';
import { easing } from '@/lib/animations';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function FAQBlock({ data }: { data: any }) {
  return (
    <section className="py-16 lg:py-24">
      <div className="container px-4 sm:px-6 lg:px-8">
        {data.title && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: easing.apple }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            {data.title}
          </motion.h2>
        )}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible>
            {data.faqs?.map((faq: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: idx * 0.07,
                  duration: 0.45,
                  ease: easing.apple,
                }}
              >
                <AccordionItem value={`item-${idx}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
