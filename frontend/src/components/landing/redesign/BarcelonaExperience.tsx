"use client";

import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import { PremiumImage } from "./PremiumImage";
import { easing, duration } from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionFrame } from "./SectionFrame";
import type { SectionImages } from "@/sanity/queries";

interface Props {
  images?: Partial<SectionImages>;
}

export function BarcelonaExperienceSection({ images = {} }: Props) {
  const cards: {
    key: keyof SectionImages;
    title: string;
    description: string;
    fallbackGradient: string;
  }[] = [
    {
      key: "barcelona_coworking",
      title: "Coworking Space",
      description: "Work in a professional environment with mentors",
      fallbackGradient: "from-primary to-secondary",
    },
    {
      key: "barcelona_sunset",
      title: "Barcelona Life",
      description: "Experience the beauty of Mediterranean living",
      fallbackGradient: "from-secondary to-muted",
    },
    {
      key: "barcelona_students",
      title: "Collaborative Learning",
      description:
        "Learn alongside ambitious peers in a project-driven environment.",
      fallbackGradient: "from-secondary to-primary",
    },
    {
      key: "barcelona_culture",
      title: "Cultural Immersion",
      description: "Language, culture, and lived experience — not tourism.",
      fallbackGradient: "from-muted to-secondary",
    },
  ];

  return (
    <SectionFrame className="bg-foreground">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="inline-flex gap-2 px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30 mb-6">
          <MapPin className="w-5 h-5 text-secondary" />
          <span className="text-sm font-medium text-secondary">
            Barcelona, Spain
          </span>
        </div>

        <SectionHeading
          title="Hybrid & Global Learning"
          subtitle="Learning combines in-person teaching in Barcelona with access to international educators and online expertise."
          tone="inverse"
          align="left"
        />
      </motion.div>

      {/* Image Grid */}
      <div className="grid md:grid-cols-2 gap-5">
        {cards.map((image, index) => (
          <motion.div
            key={image.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              delay: index * 0.1,
              duration: duration.slow,
              ease: easing.apple,
            }}
            whileHover={{
              y: -4,
              transition: { duration: duration.medium, ease: easing.smooth },
            }}
            className="group relative overflow-hidden rounded-xl border border-border/40"
          >
            {/* Photo from Sanity — upload: `node scripts/upload-barcelona-images.mjs` | restore sunset: `node scripts/restore-barcelona-sunset.mjs` */}
            <div className="relative w-full h-80 md:h-96 overflow-hidden">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5, ease: easing.smooth }}
                className="w-full h-full"
              >
                <PremiumImage
                  src={images[image.key]?.url ?? ""}
                  alt={images[image.key]?.alt ?? image.title}
                  fill
                  objectFit="cover"
                  fallbackGradient={image.fallbackGradient}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              {/* Serious tone overlay: slight tint so photography sits in section */}
              <div
                className="absolute inset-0 bg-foreground/8 pointer-events-none"
                aria-hidden
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  className=""
                >
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-white leading-tight">
                    {image.title}
                  </h3>
                  <p className="text-white text-sm md:text-base leading-relaxed mt-2 opacity-0 group-hover:opacity-100 duration-300 max-h-0 group-hover:max-h-20 overflow-hidden transition-all">
                    {image.description}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="text-center mt-8"
      >
        <p className="text-white text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
          Our campus is located at{" "}
          <span className="text-secondary font-medium">TSH Barcelona</span>,
          providing you with access to world-class facilities and a vibrant
          community of creators, entrepreneurs, and learners.
        </p>
      </motion.div>
    </SectionFrame>
  );
}
