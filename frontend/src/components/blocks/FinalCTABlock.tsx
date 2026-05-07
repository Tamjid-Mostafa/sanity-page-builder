"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Calendar, Send, Download, ArrowRight } from "lucide-react";
import { easing, duration, scale } from "@/lib/animations";
import Link from "next/link";

interface TrustElement {
  text?: string;
  indicatorColor?: 'coral' | 'green' | 'white' | 'navy';
}

interface CTAButton {
  text?: string;
  url?: string;
  icon?: 'calendar' | 'send' | 'arrow-right' | 'download' | 'none';
}

interface FinalCTABlockProps {
  heading?: string;
  highlightedText?: string;
  description?: string;
  primaryCTA?: CTAButton;
  secondaryCTA?: CTAButton;
  tertiaryCTA?: CTAButton;
  trustElements?: TrustElement[];
  backgroundColor?: 'navy' | 'dark' | 'gradient';
  showAnimatedPattern?: boolean;
  showDecorativeBlurs?: boolean;
}

const getIconComponent = (iconName?: string) => {
  switch (iconName) {
    case 'calendar':
      return Calendar;
    case 'send':
      return Send;
    case 'download':
      return Download;
    case 'arrow-right':
      return ArrowRight;
    default:
      return null;
  }
};

const getIndicatorColorClass = (color?: string) => {
  switch (color) {
    case 'coral':
      return 'bg-[#DBA19A]';
    case 'green':
      return 'bg-[#577A65]';
    case 'white':
      return 'bg-white';
    case 'navy':
      return 'bg-[#233E5F]';
    default:
      return 'bg-[#DBA19A]';
  }
};

const getBackgroundClass = (bg?: string) => {
  switch (bg) {
    case 'navy':
      return 'bg-[#233E5F]';
    case 'dark':
      return 'bg-gray-900';
    case 'gradient':
      return 'bg-gradient-to-br from-[#233E5F] to-[#577A65]';
    default:
      return 'bg-[#233E5F]';
  }
};

export default function FinalCTABlock({
  heading = "Ready to Learn, Design and Build the life you want?",
  highlightedText = "Learn, Design and Build",
  description = "Start your journey with iCollege Life today.",
  primaryCTA = { text: "Book a Conversation", url: "#", icon: "calendar" },
  secondaryCTA = { text: "Apply Now", url: "#", icon: "send" },
  tertiaryCTA = { text: "Download Prospectus", url: "#", icon: "download" },
  trustElements = [
    { text: "Accredited Programs", indicatorColor: "coral" },
    { text: "Expert Coaching", indicatorColor: "green" },
    { text: "Global Community", indicatorColor: "white" },
  ],
  backgroundColor = "navy",
  showAnimatedPattern = true,
  showDecorativeBlurs = true,
}: FinalCTABlockProps) {
  // Split heading to highlight specific text
  const headingParts = heading.split(highlightedText);
  const PrimaryIcon = getIconComponent(primaryCTA?.icon);
  const SecondaryIcon = getIconComponent(secondaryCTA?.icon);
  const TertiaryIcon = getIconComponent(tertiaryCTA?.icon);

  return (
    <section className={`py-20 md:py-24 lg:py-32 ${getBackgroundClass(backgroundColor)} relative overflow-hidden`}>
      {/* Background Decorative Elements */}
      {showDecorativeBlurs && (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#DBA19A] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#577A65] rounded-full blur-3xl" />
        </div>
      )}

      {/* Animated Background Pattern */}
      {showAnimatedPattern && (
        <div className="absolute inset-0 opacity-5">
          <motion.div
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
          />
        </div>
      )}

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-heading font-bold text-white mb-6">
            {headingParts[0]}
            {highlightedText && (
              <span className="relative inline-block">
                <span className="relative z-10">{highlightedText}</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-[#DBA19A] -z-0 opacity-60" />
              </span>
            )}
            {headingParts[1]}
          </h2>

          {description && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto"
            >
              {description}
            </motion.p>
          )}

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            {/* Primary CTA */}
            {primaryCTA?.text && (
              <motion.div
                whileHover={{ scale: scale.button }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: duration.fast, ease: easing.smooth }}
              >
                <Button
                  size="lg"
                  asChild
                  className="bg-white text-[#233E5F] hover:bg-white/90 px-10 py-7 text-xl rounded-xl shadow-2xl transition-all duration-300 hover:shadow-white/20 font-bold min-w-[220px] group"
                  aria-label={primaryCTA.text}
                >
                  <Link href={primaryCTA.url || "#"}>
                    {PrimaryIcon && (
                      <PrimaryIcon className="mr-2 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                    )}
                    {primaryCTA.text}
                  </Link>
                </Button>
              </motion.div>
            )}

            {/* Secondary CTA */}
            {secondaryCTA?.text && (
              <motion.div
                whileHover={{ scale: scale.button }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: duration.fast, ease: easing.smooth }}
              >
                <Button
                  size="lg"
                  asChild
                  className="bg-[#DBA19A] text-white hover:bg-[#DBA19A]/90 px-8 py-6 text-lg rounded-xl shadow-2xl transition-all duration-300 hover:shadow-[#DBA19A]/30 font-bold min-w-[200px] group"
                  aria-label={secondaryCTA.text}
                >
                  <Link href={secondaryCTA.url || "#"}>
                    {SecondaryIcon && (
                      <SecondaryIcon className="mr-2 h-5 w-5 group-hover:translate-x-0.5 transition-transform duration-300" />
                    )}
                    {secondaryCTA.text}
                  </Link>
                </Button>
              </motion.div>
            )}
          </motion.div>

          {/* Tertiary CTA (Link) */}
          {tertiaryCTA?.text && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Link
                href={tertiaryCTA.url || "#"}
                className="group inline-flex items-center gap-2 text-white/95 hover:text-white text-base md:text-lg font-medium transition-colors duration-300"
                aria-label={tertiaryCTA.text}
              >
                {TertiaryIcon && (
                  <TertiaryIcon className="h-5 w-5 group-hover:animate-bounce" />
                )}
                <span className="underline underline-offset-4">{tertiaryCTA.text}</span>
              </Link>
            </motion.div>
          )}

          {/* Trust Elements */}
          {trustElements && trustElements.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-16 pt-12 border-t border-white/10"
            >
              <div className="flex flex-wrap items-center justify-center gap-8 text-white/70 text-sm">
                {trustElements.map((element, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getIndicatorColorClass(element.indicatorColor)}`} />
                    <span>{element.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
