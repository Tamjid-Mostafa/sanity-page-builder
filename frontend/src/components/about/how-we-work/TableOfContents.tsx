"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const sections = [
  { id: "design-before-delivery", label: "Design before delivery" },
  { id: "structure-with-flexibility", label: "Structure with flexibility" },
  {
    id: "learning-environments",
    label: "Learning environments that reflect real life",
  },
  {
    id: "safeguarding-care",
    label: "Safeguarding, care, and responsibility",
  },
  { id: "human-led-tech", label: "Human-led, technology-supported" },
  { id: "partnerships", label: "Partnerships with purpose" },
  { id: "growing-responsibly", label: "Growing responsibly" },
];

export function TableOfContents() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile: Collapsible */}
      <div className="lg:hidden bg-white border-b border-black/5">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-4 flex items-center justify-between text-sm text-foreground hover:bg-muted transition-colors"
        >
          <span className="font-medium">On this page</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
        {isOpen && (
          <div className="px-4 pb-4 space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="block w-full text-left text-sm hover:text-foreground py-2 transition-colors"
              >
                {section.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop: Sticky top bar */}
      <div className="hidden lg:block sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-black/5">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-6xl mx-auto py-4">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-6 overflow-x-auto"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-primary/70 font-medium shrink-0">
                On this page
              </p>
              <nav className="flex items-center gap-4">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="text-sm hover:text-foreground py-2 transition-colors whitespace-nowrap"
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
