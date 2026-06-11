"use client";
import { Image as SanityImg } from "next-sanity/image";
import { stegaClean } from "next-sanity";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { easing, duration, scale } from "@/lib/animations";
import {
  SITE_CONTAINER_SECTION,
  contentMaxWidthClass,
} from "@/lib/site-layout";
import { openCalendly } from "@/lib/site-cta";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import { BlockStylesWrapper } from "../shared/BlockStylesWrapper";
import { CallToActionContent } from "./content/CallToActionContent";
import type { HeroSectionData } from "@/types/sanity";

type SlideshowSlide = {
  _key?: string;
  tag?: string;
  headline?: string;
  subtitle?: string;
};

type SlideshowVideo = {
  _key?: string;
  videoUrl?: string;
  poster?: { asset?: { url?: string } };
};

type HeroSectionWithSlideshow = HeroSectionData & {
  layout?: string;
  slides?: SlideshowSlide[];
  backgroundVideos?: SlideshowVideo[];
  slideDurationMs?: number;
  primaryButton?: {
    label?: string;
    action?: "calendly" | "link";
    href?: string;
  };
  secondaryButton?: { label?: string; href?: string };
  pills?: string[];
  prospectusLink?: string;
  backgroundVideoUrl?: string;
  backgroundVideo?: { asset?: { url?: string } };
};

const ALIGN_MAP: Record<string, string> = {
  left: "text-left items-start",
  center: "text-center items-center",
  right: "text-right items-end",
};

function buildBackground(data: HeroSectionData): React.CSSProperties {
  const style: React.CSSProperties = {};
  const bgType = stegaClean(data.backgroundType);

  switch (bgType) {
    case "gradient":
      if (data.gradientFrom && data.gradientTo) {
        style.background = `linear-gradient(${stegaClean(data.gradientDirection) || "to bottom right"}, ${stegaClean(data.gradientFrom)}, ${stegaClean(data.gradientTo)})`;
      }
      break;
    case "color":
      if (data.backgroundColor)
        style.backgroundColor = stegaClean(data.backgroundColor);
      break;
    default:
      break;
  }

  const minHeight = stegaClean(data.minHeight);
  if (minHeight && minHeight !== "auto") {
    style.minHeight = minHeight;
  }

  if (data.textColor) {
    style.color = stegaClean(data.textColor);
  }

  return style;
}

function HeroButtons({ buttons }: { buttons: HeroSectionData["buttons"] }) {
  if (!buttons || buttons.length === 0) return null;

  return (
    <div className="mt-8 flex flex-wrap justify-center gap-4">
      {buttons.map((btn) => (
        <CallToActionContent key={btn._key} data={btn} />
      ))}
    </div>
  );
}

function FullWidthHero({ data }: { data: HeroSectionData }) {
  const fullWidthData = data as HeroSectionWithSlideshow;
  const alignClass =
    ALIGN_MAP[stegaClean(data.alignment) || "center"] || ALIGN_MAP.center;
  const maxWidthClass = contentMaxWidthClass(
    stegaClean(data.maxWidth),
    "default",
  );
  const bgType = stegaClean(data.backgroundType);
  const hasMediaBg = bgType === "image" || bgType === "video";
  const overlayOpacity = (data.overlay ?? 0) / 100;
  const videoSrc =
    fullWidthData.backgroundVideoUrl ||
    fullWidthData.backgroundVideo?.asset?.url;

  return (
    <section
      className="relative flex items-center overflow-hidden"
      style={buildBackground(data)}
    >
      {/* Background image */}
      {bgType === "image" && data.backgroundImage?.asset && (
        <SanityImg
          src={urlFor(data.backgroundImage).width(1920).fit("max").url()}
          alt=""
          fill
          sizes="100vw"
          quality={80}
          className="object-cover"
          priority
        />
      )}

      {/* Background video */}
      {bgType === "video" && videoSrc && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* Overlay */}
      {hasMediaBg && overlayOpacity > 0 && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}

      <div
        className={`relative z-10 mx-auto w-full px-4 py-20 sm:px-6 lg:px-8 ${maxWidthClass}`}
      >
        <div className={`flex flex-col ${alignClass}`}>
          {data.badge && (
            <BadgePill badge={data.badge} badgeLink={data.badgeLink} />
          )}

          {data.heading && (
            <h1 className="text-4xl font-heading font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              {data.heading}
            </h1>
          )}

          {data.subtitle && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed opacity-80 sm:text-xl">
              {data.subtitle}
            </p>
          )}

          {data.buttons && data.buttons.length > 0 && (
            <HeroButtons buttons={data.buttons} />
          )}
        </div>
      </div>
    </section>
  );
}

function SplitHero({ data }: { data: HeroSectionData }) {
  const isMediaLeft = stegaClean(data.mediaPosition) === "left";
  const maxWidthClass = contentMaxWidthClass(
    stegaClean(data.maxWidth),
    "default",
  );

  return (
    <section style={buildBackground(data)}>
      <div className={`mx-auto px-4 py-16 sm:px-6 lg:px-8 ${maxWidthClass}`}>
        <div
          className={`grid items-center gap-8 md:grid-cols-2 lg:gap-16 ${isMediaLeft ? "" : ""}`}
        >
          {/* Text column */}
          <div className={isMediaLeft ? "order-2" : "order-1 md:order-1"}>
            {data.badge && (
              <BadgePill badge={data.badge} badgeLink={data.badgeLink} />
            )}

            {data.heading && (
              <h1 className="text-4xl font-heading font-bold tracking-tighter sm:text-5xl lg:text-6xl">
                {data.heading}
              </h1>
            )}

            {data.subtitle && (
              <p className="mt-6 text-lg leading-relaxed opacity-80">
                {data.subtitle}
              </p>
            )}

            {data.buttons && data.buttons.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-4">
                {data.buttons.map((btn) => (
                  <CallToActionContent key={btn._key} data={btn} />
                ))}
              </div>
            )}
          </div>

          {/* Media column */}
          <div className={isMediaLeft ? "order-1" : "order-2 md:order-2"}>
            {data.mediaImage?.asset && (
              <SanityImg
                src={urlFor(data.mediaImage).width(1200).fit("max").url()}
                alt={data.mediaImage.alt || ""}
                width={
                  data.mediaImage.asset.metadata?.dimensions?.width || 1200
                }
                height={
                  data.mediaImage.asset.metadata?.dimensions?.height || 750
                }
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={75}
                className="w-full rounded-2xl"
                preload
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function VideoSlideshowHero({ data }: { data: HeroSectionWithSlideshow }) {
  const slides = (data.slides || []).filter((s) => s.headline);
  const videos = data.backgroundVideos || [];
  const slideDuration = data.slideDurationMs ?? 6000;
  const pills = data.pills || [];
  const prospectusLink = data.prospectusLink;
  const primaryBtn = data.primaryButton || {
    label: "Book a Conversation",
    action: "calendly" as const,
  };
  const secondaryBtn = data.secondaryButton || {
    label: "Check Your Fit",
    href: "/apply",
  };

  // Cycle count is driven by whichever is larger — slides or videos.
  // Each uses modulo independently so 1 slide + 4 videos = text stays,
  // videos cycle; 4 slides + 1 video = slides cycle, video stays; etc.
  const totalSteps = Math.max(slides.length, videos.length, 1);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  const goTo = useCallback((idx: number) => {
    setActiveIndex(idx);
    setProgressKey((k) => k + 1);
  }, []);

  const next = useCallback(() => {
    if (totalSteps <= 1) return;
    goTo((activeIndex + 1) % totalSteps);
  }, [activeIndex, goTo, totalSteps]);

  useEffect(() => {
    if (totalSteps <= 1) return;
    timerRef.current = setInterval(next, slideDuration);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [next, slideDuration, totalSteps]);

  if (!slides.length) {
    return null;
  }

  const resetTimer = (idx: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    goTo(idx);
    if (totalSteps > 1) {
      timerRef.current = setInterval(next, slideDuration);
    }
  };

  const activeSlide = slides[activeIndex % slides.length];
  const activeVideo =
    videos.length > 0 ? videos[activeIndex % videos.length] : undefined;
  const videoUrl = activeVideo?.videoUrl;
  const posterUrl = activeVideo?.poster?.asset?.url;

  const handlePrimaryClick = () => {
    if (primaryBtn.action === "link" && primaryBtn.href) {
      window.location.href = primaryBtn.href;
      return;
    }
    openCalendly();
  };

  return (
    <section
      className="relative h-screen min-h-150 max-h-270 flex items-end bg-black overflow-hidden"
      aria-label="Hero section"
    >
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

      <div className="relative z-10 w-full">
        <div className={SITE_CONTAINER_SECTION}>
          <div className="flex flex-col gap-5 max-w-lg">
            <AnimatePresence mode="wait">
              <motion.span
                key={`tag-${activeIndex % slides.length}`}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="inline-block text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-white w-fit"
              >
                {activeSlide.tag}
              </motion.span>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.h1
                key={`headline-${activeIndex % slides.length}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="font-heading font-bold text-white leading-[1.08] tracking-tight text-3xl sm:text-4xl md:text-[2.625rem] whitespace-pre-line"
              >
                {activeSlide.headline}
              </motion.h1>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.p
                key={`sub-${activeIndex % slides.length}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-sm sm:text-base font-bold leading-relaxed text-white max-w-[40ch] whitespace-pre-line"
              >
                {activeSlide.subtitle}
              </motion.p>
            </AnimatePresence>

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
                  aria-label={primaryBtn.label || "Primary action"}
                >
                  {primaryBtn.label || "Book a Conversation"}
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
                  aria-label={secondaryBtn.label || "Secondary action"}
                >
                  <Link href={secondaryBtn.href || "/apply"}>
                    {secondaryBtn.label || "Check Your Fit"}
                    <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

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

            {prospectusLink && (
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
            )}
          </div>
        </div>

        {totalSteps > 1 && (
          <div className="absolute bottom-14 md:bottom-16 lg:bottom-20 right-6 sm:right-8 lg:right-12 flex flex-col gap-3 items-end">
            {Array.from({ length: totalSteps }, (_, i) => (
              <button
                key={i}
                onClick={() => resetTimer(i)}
                aria-label={`Go to step ${i + 1}`}
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
                      transition={{
                        duration: slideDuration / 1000,
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
        )}
      </div>
    </section>
  );
}

function BadgePill({
  badge,
  badgeLink,
}: {
  badge: string;
  badgeLink?: string;
}) {
  const classes =
    "mb-6 inline-flex items-center rounded-full border border-current/10 bg-foreground/5 px-4 py-1.5 text-sm font-medium backdrop-blur-sm";

  if (badgeLink) {
    return (
      <a
        href={badgeLink}
        className={`${classes} transition-colors hover:bg-foreground/10`}
      >
        {badge}
        <svg
          className="ml-2 h-3 w-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </a>
    );
  }

  return <span className={classes}>{badge}</span>;
}

export function HeroSection({ data }: { data: HeroSectionData }) {
  const heroData = data as HeroSectionWithSlideshow;
  const layout = stegaClean(heroData.layout as string | undefined);
  if (layout === "videoSlideshow") {
    return (
      <BlockStylesWrapper blockStyles={data.blockStyles}>
        <VideoSlideshowHero data={heroData} />
      </BlockStylesWrapper>
    );
  }

  const content =
    stegaClean(data.layout) === "split" ? (
      <SplitHero data={data} />
    ) : (
      <FullWidthHero data={data} />
    );

  return (
    <BlockStylesWrapper blockStyles={data.blockStyles}>
      {content}
    </BlockStylesWrapper>
  );
}
