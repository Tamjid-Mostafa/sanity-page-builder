"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import { easing, duration, scale } from "@/lib/animations";
import Link from "next/link";
import { openCalendly } from "@/lib/site-cta";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types that mirror the Sanity heroSection schema (videoSlideshow layout)
// ---------------------------------------------------------------------------

export interface HeroSlide {
  _key?: string;
  tag?: string;
  headline: string;
  subtitle?: string;
}

export interface HeroVideo {
  _key?: string;
  title?: string;
  videoUrl?: string;
  poster?: {
    asset?: { url?: string; metadata?: { lqip?: string } };
  };
}

export interface HeroSectionData {
  layout?: "videoSlideshow" | "fullWidth" | "split";
  slides?: HeroSlide[];
  backgroundVideos?: HeroVideo[];
  slideDurationMs?: number;
  primaryButton?: { label?: string; action?: "calendly" | "link"; href?: string };
  secondaryButton?: { label?: string; href?: string };
  pills?: string[];
  prospectusLink?: string;
}

// ---------------------------------------------------------------------------
// Fallback content (used when no Sanity data is provided)
// ---------------------------------------------------------------------------
const FALLBACK_SLIDES: HeroSlide[] = [
  {
    tag: "International Academy · Barcelona",
    headline: "Education for a Life Worth Living",
    subtitle:
      "iCollege Life prepares young people for both university and life - combining pre-university academic pathways with global development programmes for young adults navigating what comes next.",
  },
  {
    tag: "Pre-University Pathways",
    headline: "A Levels &\nHigh School Diploma",
    subtitle:
      "Academic pathways that combine recognised qualifications with personal development and global perspective.",
  },
  {
    tag: "Global Development",
    headline: "For young adults\nnavigating what's next",
    subtitle:
      "Global development programmes for the transition beyond school — building direction, confidence, and real-world experience.",
  },
  {
    tag: "Personal Growth",
    headline: "Knowledge, confidence,\nand direction",
    subtitle: "Helping capable young people develop the foundations to build meaningful lives.",
  },
];

const FALLBACK_PILLS = ["A Levels", "High School Diploma", "Global Development", "Personal Growth"];

// ---------------------------------------------------------------------------

export function HeroSection({ block }: { block?: HeroSectionData }) {
  const slides = (block?.slides?.length ? block.slides : FALLBACK_SLIDES);
  const videos = block?.backgroundVideos ?? [];
  const slideDuration = block?.slideDurationMs ?? 6000;
  const pills = block?.pills?.length ? block.pills : FALLBACK_PILLS;
  const prospectusLink = block?.prospectusLink ?? "/prospectus";

  const primaryBtn = block?.primaryButton ?? { label: "Book a Conversation", action: "calendly" as const };
  const secondaryBtn = block?.secondaryButton ?? { label: "Check Your Fit", href: "/apply" };

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  const goTo = useCallback((idx: number) => {
    setActiveIndex(idx);
    setProgressKey((k) => k + 1);
  }, []);

  const next = useCallback(() => {
    goTo((activeIndex + 1) % slides.length);
  }, [activeIndex, goTo, slides.length]);

  useEffect(() => {
    timerRef.current = setInterval(next, slideDuration);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [next, slideDuration]);

  const resetTimer = (idx: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    goTo(idx);
    timerRef.current = setInterval(next, slideDuration);
  };

  // Match video to slide by index; cycle if fewer videos than slides
  const activeVideo = videos.length > 0 ? videos[activeIndex % videos.length] : undefined;
  const videoUrl = activeVideo?.videoUrl;
  const posterUrl = activeVideo?.poster?.asset?.url;

  const active = slides[activeIndex] ?? slides[0];

  const handlePrimaryClick = () => {
    if (primaryBtn.action === "link" && primaryBtn.href) {
      window.location.href = primaryBtn.href;
    } else {
      openCalendly();
    }
  };

  return (
    <section
      className="relative h-screen min-h-150 max-h-270 flex items-end bg-black overflow-hidden"
      aria-label="Hero section"
    >
      {/* ── Full-screen background video ─────────────────────────────────── */}
      <AnimatePresence mode="sync">
        {videoUrl ? (
          <motion.div
            key={`video-${activeIndex}`}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover object-center"
              poster={posterUrl}
              src={videoUrl}
            />
            <div className="absolute inset-0 bg-linear-to-r from-black/55 via-black/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/70 to-transparent" />
          </motion.div>
        ) : (
          <motion.div
            key="fallback"
            className="absolute inset-0 bg-linear-to-br from-slate-900 via-slate-800 to-slate-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        )}
      </AnimatePresence>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 pb-14 md:pb-16 lg:pb-20">
          <div className="flex flex-col gap-5 max-w-lg">
            {/* Tag */}
            <AnimatePresence mode="wait">
              <motion.span
                key={`tag-${activeIndex}`}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="inline-block text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-white/60 w-fit"
              >
                {active.tag}
              </motion.span>
            </AnimatePresence>

            {/* Headline */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={`headline-${activeIndex}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="font-heading font-bold text-white leading-[1.08] tracking-tight text-3xl sm:text-4xl md:text-[2.625rem] whitespace-pre-line"
              >
                {active.headline}
              </motion.h1>
            </AnimatePresence>

            {/* Subtitle */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`sub-${activeIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-sm sm:text-base font-bold leading-relaxed text-white/90 max-w-[38ch]"
              >
                {active.subtitle}
              </motion.p>
            </AnimatePresence>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="flex flex-row flex-wrap gap-3 pt-1"
            >
              <motion.div
                whileHover={{ scale: scale.button }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: duration.fast, ease: easing.smooth }}
              >
                <Button
                  size="default"
                  onClick={handlePrimaryClick}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 text-sm rounded-lg shadow-md transition-all duration-300 hover:shadow-lg group cursor-pointer"
                  aria-label={primaryBtn.label ?? "Primary action"}
                >
                  {primaryBtn.label ?? "Book a Conversation"}
                  <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: scale.button }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: duration.fast, ease: easing.smooth }}
              >
                <Button
                  size="default"
                  variant="outline"
                  asChild
                  className="px-6 py-2.5 text-sm rounded-lg transition-all duration-300 group"
                  aria-label={secondaryBtn.label ?? "Secondary action"}
                >
                  <Link href={secondaryBtn.href ?? "/apply"}>
                    {secondaryBtn.label ?? "Check Your Fit"}
                    <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Credential pills */}
            {pills.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="flex flex-wrap gap-2"
              >
                {pills.map((pill) => (
                  <span
                    key={pill}
                    className="text-[11px] font-medium tracking-wide text-white/70 border border-white/20 bg-white/5 rounded-full px-3 py-1 backdrop-blur-sm"
                  >
                    {pill}
                  </span>
                ))}
              </motion.div>
            )}

            {/* Prospectus link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.4 }}
            >
              <Link
                href={prospectusLink}
                className="text-xs sm:text-sm font-medium text-white/60 hover:text-white/90 underline underline-offset-4 transition-colors duration-200 inline-flex items-center gap-1.5"
              >
                <Download className="h-3.5 w-3.5" />
                Download Prospectus
              </Link>
            </motion.div>
          </div>
        </div>

        {/* ── Slide indicators — bottom right ──────────────────────────── */}
        <div className="absolute bottom-14 md:bottom-16 lg:bottom-20 right-6 sm:right-8 lg:right-12 flex flex-col gap-3 items-end">
          {slides.map((slide, i) => (
            <button
              key={slide._key ?? i}
              onClick={() => resetTimer(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="group flex items-center gap-2 focus:outline-none"
            >
              <span
                className={cn(
                  "text-[10px] font-medium uppercase tracking-widest transition-colors duration-300",
                  i === activeIndex
                    ? "text-white"
                    : "text-white/30 group-hover:text-white/60",
                )}
              >
                0{i + 1}
              </span>
              <span className="relative h-0.5 w-10 rounded-full bg-white/20 overflow-hidden">
                {i === activeIndex && (
                  <motion.span
                    key={progressKey}
                    className="absolute inset-y-0 left-0 bg-white rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: slideDuration / 1000, ease: "linear" }}
                  />
                )}
                {i < activeIndex && (
                  <span className="absolute inset-y-0 left-0 w-full bg-white/60 rounded-full" />
                )}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

