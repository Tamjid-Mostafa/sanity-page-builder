"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Compass,
  Layers,
  Building2,
  Shield,
  UserCog,
  Link2,
  Sprout,
} from "lucide-react";

const principles = [
  {
    id: "design-before-delivery",
    number: "01",
    title: "Design before delivery",
    icon: Compass,
  },
  {
    id: "structure-with-flexibility",
    number: "02",
    title: "Structure with flexibility",
    icon: Layers,
  },
  {
    id: "learning-environments",
    number: "03",
    title: "Learning environments that reflect real life",
    icon: Building2,
  },
  {
    id: "safeguarding-care",
    number: "04",
    title: "Safeguarding, care, and responsibility",
    icon: Shield,
  },
  {
    id: "human-led-tech",
    number: "05",
    title: "Human-led, technology-supported",
    icon: UserCog,
  },
  {
    id: "partnerships",
    number: "06",
    title: "Partnerships with purpose",
    icon: Link2,
  },
  {
    id: "growing-responsibly",
    number: "07",
    title: "Growing responsibly",
    icon: Sprout,
  },
];

interface PrinciplesRailProps {
  activeSectionId?: string;
  onActiveChange?: (id: string) => void;
}

export function PrinciplesRail({
  activeSectionId: externalActiveId,
  onActiveChange,
}: PrinciplesRailProps = {}) {
  const [internalActiveId, setInternalActiveId] = useState<string>("");
  const activeSectionId = externalActiveId ?? internalActiveId;

  useEffect(() => {
    // Only set up observer if not controlled externally
    if (externalActiveId !== undefined) return;

    const observerOptions = {
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setInternalActiveId(id);
          onActiveChange?.(id);
        }
      });
    }, observerOptions);

    principles.forEach((principle) => {
      const element = document.getElementById(principle.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      principles.forEach((principle) => {
        const element = document.getElementById(principle.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [externalActiveId, onActiveChange]);

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
    <aside className="hidden lg:block sticky top-32 self-start space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-primary/70 font-medium mb-2">
          Principles
        </p>
        <p className="text-sm/80 leading-relaxed">
          A clear set of practices for how iCollege Life designs, delivers, and
          grows.
        </p>
      </div>

      <nav className="space-y-1">
        {principles.map((principle) => {
          const isActive = activeSectionId === principle.id;
          const Icon = principle.icon;
          return (
            <button
              key={principle.id}
              onClick={() => scrollToSection(principle.id)}
              className="group relative w-full text-left"
            >
              <motion.div
                className={`flex items-start gap-3 py-2 transition-all pl-1 rounded-r-md ${
                  isActive
                    ? "bg-muted/50"
                    : "group-hover:bg-muted/30 group-hover:translate-x-1"
                }`}
                animate={{
                  opacity: isActive ? 1 : 0.8,
                  x: isActive ? 2 : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-0 bottom-0 w-[3px] bg-secondary rounded-r-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}

                {/* Icon */}
                <Icon
                  className={`w-4 h-4 shrink-0 mt-0.5 transition-colors ${
                    isActive ? "text-secondary" : "text-muted-foreground"
                  }`}
                  strokeWidth={1.5}
                />

                {/* Number */}
                <span
                  className={`text-xs font-medium tracking-[0.1em] shrink-0 pt-0.5 ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {principle.number}
                </span>

                {/* Title */}
                <span
                  className={`text-sm leading-relaxed transition-colors ${
                    isActive
                      ? "text-foreground font-medium"
                      : "text-secondary group-hover:text-foreground"
                  }`}
                >
                  {principle.title}
                </span>
              </motion.div>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
