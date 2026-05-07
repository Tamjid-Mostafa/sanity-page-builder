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
// Slide configuration — videos[i] is matched to slides[i] at render time.
// ---------------------------------------------------------------------------
const SLIDE_DURATION_MS = 6000;

interface VideoAsset {
  _id: string;
  title: string;
  videoUrl: string;
  mimeType?: string;
  posterUrl?: string;
  posterLqip?: string;
}

interface Slide {
  id: number;
  tag: string;
  headline: string;
  sub: string;
}

const slides: Slide[] = [
  {
    id: 0,
    tag: "International Academy · Barcelona",
    headline: "Education for a Life Worth Living",
    sub: "iCollege Life prepares young people for both university and life - combining pre-university academic pathways with global development programmes for young adults navigating what comes next.",
  },
  {
    id: 1,
    tag: "Pre-University Pathways",
    headline: "A Levels &\nHigh School Diploma",
    sub: "Academic pathways that combine recognised qualifications with personal development and global perspective.",
  },
  {
    id: 2,
    tag: "Global Development",
    headline: "For young adults\nnavigating what's next",
    sub: "Global development programmes for the transition beyond school — building direction, confidence, and real-world experience.",
  },
  {
    id: 3,
    tag: "Personal Growth",
    headline: "Knowledge, confidence,\nand direction",
    sub: "Helping capable young people develop the foundations to build meaningful lives.",
  },
];

// ---------------------------------------------------------------------------

export function HeroSection({
  videoData,
  videos: rawVideos = [],
}: {
  videoData?: any;
  videos?: VideoAsset[];
}) {
  // Move any "barcelona city" video to the last position
  const videos = [...rawVideos].sort((a, b) => {
    const aIsBarcelona = /barcelona\s*city/i.test(a.title);
    const bIsBarcelona = /barcelona\s*city/i.test(b.title);
    if (aIsBarcelona && !bIsBarcelona) return 1;
    if (!aIsBarcelona && bIsBarcelona) return -1;
    return 0;
  });
  const sectionRef = useRef<HTMLElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0); // restart CSS animation on slide change

  // Resolve per-slide video: prefer videos[] array, fallback to siteSettings heroVideo
  const fallbackUrl: string | undefined =
    videoData?.heroVideo?.video?.asset?.url;
  const fallbackPoster: string | undefined =
    videoData?.heroVideoPoster?.image?.asset?.url;
  const activeVideo: VideoAsset | undefined = videos[activeIndex] ?? videos[0];
  const videoUrl = activeVideo?.videoUrl ?? fallbackUrl;
  const posterUrl = activeVideo?.posterUrl ?? fallbackPoster;

  const goTo = useCallback((idx: number) => {
    setActiveIndex(idx);
    setProgressKey((k) => k + 1);
  }, []);

  const next = useCallback(() => {
    goTo((activeIndex + 1) % slides.length);
  }, [activeIndex, goTo]);

  // Auto-advance
  useEffect(() => {
    timerRef.current = setInterval(next, SLIDE_DURATION_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [next]);

  const resetTimer = (idx: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    goTo(idx);
    timerRef.current = setInterval(next, SLIDE_DURATION_MS);
  };

  const active = slides[0];
  console.log(videos, videoData);
  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[600px] max-h-[1080px] flex items-end bg-black overflow-hidden"
      aria-label="Hero section"
    >
      {/* ------------------------------------------------------------------ */}
      {/* Full-screen background video — watermark treatment (light overlay)  */}
      {/* ------------------------------------------------------------------ */}
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
            {/* Watermark-style overlay: subtle so video reads through */}
            <div className="absolute inset-0 bg-linear-to-r from-black/55 via-black/25 to-transparent" />
            {/* Bottom vignette behind text */}
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

      {/* ------------------------------------------------------------------ */}
      {/* Content — positioned bottom-left, intentionally compact            */}
      {/* ------------------------------------------------------------------ */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 pb-14 md:pb-16 lg:pb-20">
          <div className="flex flex-col gap-5 max-w-lg">
            {/* Slide tag / label */}
            <AnimatePresence mode="wait">
              <motion.span
                key={`tag-${active.id}`}
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
                key={`headline-${active.id}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="font-heading font-bold text-white leading-[1.08] tracking-tight text-3xl sm:text-4xl md:text-[2.625rem] whitespace-pre-line"
              >
                {active.headline}
              </motion.h1>
            </AnimatePresence>

            {/* Sub-copy */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`sub-${active.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-sm sm:text-base font-bold leading-relaxed text-white/90 max-w-[38ch]"
              >
                {active.sub}
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
                  onClick={() => openCalendly()}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 text-sm rounded-lg shadow-md transition-all duration-300 hover:shadow-lg group cursor-pointer"
                  aria-label="Book a conversation with iCollege Life"
                >
                  Book a Conversation
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
                  aria-label="Check your fit with iCollege Life"
                >
                  <Link href="/apply">
                    Check Your Fit
                    <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Credential pills */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="flex flex-wrap gap-2"
            >
              {[
                "A Levels",
                "High School Diploma",
                "Global Development",
                "Personal Growth",
              ].map((pill) => (
                <span
                  key={pill}
                  className="text-[11px] font-medium tracking-wide text-white/70 border border-white/20 bg-white/5 rounded-full px-3 py-1 backdrop-blur-sm"
                >
                  {pill}
                </span>
              ))}
            </motion.div>

            {/* Prospectus link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.4 }}
            >
              <Link
                href="/prospectus"
                className="text-xs sm:text-sm font-medium text-white/60 hover:text-white/90 underline underline-offset-4 transition-colors duration-200 inline-flex items-center gap-1.5"
              >
                <Download className="h-3.5 w-3.5" />
                Download Prospectus
              </Link>
            </motion.div>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Slide indicators — bottom right                                  */}
        {/* ---------------------------------------------------------------- */}
        <div className="absolute bottom-14 md:bottom-16 lg:bottom-20 right-6 sm:right-8 lg:right-12 flex flex-col gap-3 items-end">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
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
              {/* Progress bar */}
              <span className="relative h-0.5 w-10 rounded-full bg-white/20 overflow-hidden">
                {i === activeIndex && (
                  <motion.span
                    key={progressKey}
                    className="absolute inset-y-0 left-0 bg-white rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: SLIDE_DURATION_MS / 1000,
                      ease: "linear",
                    }}
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
