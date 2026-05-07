"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const sections = [
  { id: "what-academy-is", label: "What iCollege Academy is" },
  { id: "who-its-for", label: "Who it's for" },
  { id: "our-approach", label: "Our approach" },
  { id: "academics-without-tunnel-vision", label: "Academics without tunnel vision" },
  { id: "supportive-environment", label: "Supportive environment" },
  { id: "outcomes-direction", label: "Outcomes & direction" },
  { id: "why-parents-choose", label: "Why parents choose" },
];

export function AcademyNavRail() {
  const [activeSectionId, setActiveSectionId] = useState<string>("");

  useEffect(() => {
    const observerOptions = {
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSectionId(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <aside className="hidden lg:block sticky top-32 self-start pt-10 space-y-6">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-[#233E5F]/60 font-medium">
          Academy overview
        </p>
      </div>

      <nav className="space-y-5">
        {sections.map((section) => {
          const isActive = activeSectionId === section.id;
          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="group relative w-full text-left"
            >
              <motion.div
                initial={false}
                animate={{ x: isActive ? 4 : 0, opacity: isActive ? 1 : 0.8 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="flex items-start gap-3 py-2 transition-colors pl-1"
              >
                {/* Active indicator bar */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#DBA19A] rounded-r-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}

                {/* Title */}
                <span
                  className={`text-sm leading-relaxed transition-colors ${
                    isActive
                      ? "text-[#383838] font-medium"
                      : "text-[#577A65] group-hover:text-[#383838]"
                  }`}
                >
                  {section.label}
                </span>
              </motion.div>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
