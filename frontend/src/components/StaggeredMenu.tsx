"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  cubicBezier,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import Facebook from "@/components/icons/facebook";
import Instagram from "@/components/icons/instagram";
import Linkedin from "@/components/icons/linkedin";
import Youtube from "@/components/icons/youtube";
import XIcon from "@/components/icons/X";
import TikTokIcon from "@/components/icons/tiktok";
import { stegaClean } from "next-sanity";

export interface StaggeredMenuSubItem {
  label: string;
  link: string;
  newTab?: boolean;
}

export interface StaggeredMenuItem {
  label: string;
  ariaLabel?: string;
  link?: string;
  icon?: React.ReactNode;
  default?: boolean;
  active?: boolean;
  newTab?: boolean;
  subItems?: StaggeredMenuSubItem[];
}

export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}

export interface StaggeredMenuProps {
  position?: "left" | "right";
  colors?: string[];
  items?: StaggeredMenuItem[];
  primaryItems?: StaggeredMenuItem[];
  personaItems?: StaggeredMenuItem[];
  secondaryItems?: StaggeredMenuItem[];
  actions?: {
    label: string;
    href: string;
    external?: boolean;
    variant?: "primary" | "outline" | "ghost";
    icon?: React.ReactNode;
  }[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;

  className?: string;
  logoUrl?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;

  changeMenuColorOnOpen?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
  getIsActive?: (href: string) => boolean;
}

const easeOut4 = cubicBezier(0.19, 1, 0.22, 1);
const easeIn3 = cubicBezier(0.55, 0.06, 0.68, 0.19);
const easeStd = cubicBezier(0.25, 0.1, 0.25, 1);

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = "right",
  colors = ["#B19EEF", "#5227FF", "#fe011e"],
  items = [],
  primaryItems,
  personaItems,
  secondaryItems,
  actions,
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logoUrl = "",
  menuButtonColor = "#fff",
  openMenuButtonColor = "#fff",
  changeMenuColorOnOpen = true,
  accentColor = "#BA2026",
  onMenuOpen,
  onMenuClose,
  getIsActive,
}) => {
  const [open, setOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);
  // Show the floating navbar when user scrolls up (and not at the very top)
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const [atTop, setAtTop] = useState(true);

  const closeMenu = React.useCallback(() => {
    setOpen(false);
    setExpandedItems(new Set()); // Reset expanded items when closing
    onMenuClose?.();
  }, [onMenuClose]);

  const toggleAccordion = React.useCallback((index: number) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }, []);

  const openMenuFn = React.useCallback(() => {
    setOpen(true);
    onMenuOpen?.();
  }, [onMenuOpen]);

  // update your scroll handler
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current !== "number") return;
    const prev = scrollYProgress.getPrevious() ?? current;
    const dir = current - prev;

    setAtTop(current < 0.05);

    const DEADZONE = 0.002; // prevents jitter on tiny deltas
    if (current < 0.05) {
      setVisible(false);
    } else if (dir < -DEADZONE) {
      setVisible(true); // scrolling up
    } else if (dir > DEADZONE) {
      setVisible(false); // scrolling down
    }
  });
  // Close on Esc and outside click
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const t = e.target as Node;
      if (panelRef.current?.contains(t)) return;
      if (triggerRef.current?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [open]);

  const prelayerColors = useMemo(() => {
    const raw = colors?.length ? colors.slice(0, 4) : ["#1e1e22", "#35353c"];
    const arr = [...raw];
    if (arr.length >= 3) arr.splice(Math.floor(arr.length / 2), 1);
    return arr;
  }, [colors]);

  const offscreen = position === "left" ? "-100%" : "100%";
  const layerStagger = 0.07;
  const panelDelay =
    (prelayerColors.length ? (prelayerColors.length - 1) * layerStagger : 0) +
    (prelayerColors.length ? 0.08 : 0);
  const panelDuration = 0.65;
  const itemsStart = panelDelay + panelDuration * 0.15;
  const socialsStart = panelDelay + panelDuration * 0.4;

  const prelayerVariants = (i: number) => ({
    closed: { x: offscreen },
    open: {
      x: "0%",
      transition: { duration: 0.5, ease: easeOut4, delay: i * layerStagger },
    },
  });

  const panelVariants = {
    closed: { x: offscreen, transition: { duration: 0.32, ease: easeIn3 } },
    open: {
      x: "0%",
      transition: {
        duration: panelDuration,
        ease: easeOut4,
        delay: panelDelay,
      },
    },
  };

  const itemVariants = (i: number) => ({
    closed: { y: 60, rotate: 10, opacity: 0 },
    open: {
      y: 0,
      rotate: 0,
      opacity: 1,
      transition: { duration: 1, ease: easeOut4, delay: itemsStart + i * 0.1 },
    },
  });

  const socialTitleVariants = {
    closed: { opacity: 0 },
    open: {
      opacity: 1,
      transition: { duration: 0.5, ease: easeStd, delay: socialsStart },
    },
  };

  const socialLinkVariants = (i: number) => ({
    closed: { y: 25, opacity: 0 },
    open: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.55,
        ease: easeStd,
        delay: socialsStart + 0.04 + i * 0.08,
      },
    },
  });

  const iconTopVariants = {
    closed: { rotate: 0, y: 0, transition: { duration: 0.35, ease: easeStd } },
    open: { rotate: 45, y: 6, transition: { duration: 0.5, ease: easeOut4 } },
  };
  const iconMidVariants = {
    closed: { opacity: 1, transition: { duration: 0.35, ease: easeStd } },
    open: { opacity: 0, transition: { duration: 0.2, ease: easeStd } },
  };
  const iconBotVariants = {
    closed: { rotate: 0, y: 0, transition: { duration: 0.35, ease: easeStd } },
    open: { rotate: -45, y: -6, transition: { duration: 0.5, ease: easeOut4 } },
  };

  const toggle = () => (open ? closeMenu() : openMenuFn());

  const actionBaseClass =
    "inline-flex items-center justify-center rounded-lg px-4 py-3 text-base font-semibold transition-colors";

  // For mobile menu, always show the header. For desktop, use scroll logic
  // Since this component is wrapped with lg:hidden, it's always mobile
  const showHeader = true; // Always show on mobile
  const background = !open && !atTop && visible; // background style when floating

  return (
    <>
      {/* HEADER (switches between hero header and floating background bar) */}
      <motion.header
        aria-label="Main navigation header"
        initial={false}
        animate={{
          y: showHeader ? 0 : -100,
          opacity: showHeader ? 1 : 0,
        }}
        transition={{
          y: { duration: 0.28, ease: easeOut4 },
          opacity: { duration: 0.28, ease: easeOut4 },
        }}
        className={cn(
          "fixed left-1/2 top-0 -translate-x-1/2 z-50 w-full",
          "px-6 sm:px-8 lg:px-12 py-6 flex items-center justify-between",
          // no bg/border/shadow classes here — we animate them
          "pointer-events-auto",
          className
        )}
        style={{ willChange: "transform, opacity" }}
      >
        {/* Animated BG layer - pure white background with subtle shadow */}
        <motion.div
          aria-hidden
          className="absolute inset-0 -z-10 bg-white shadow-sm"
          initial={false}
          style={{ willChange: "background-color" }}
        />
        <Link
          href="/"
          onClick={() => {
            open ? closeMenu() : "";
          }}
          className={cn("flex items-center select-none")}
          aria-label="Logo"
        >
          <Image
            src={logoUrl}
            alt="Logo"
            className={cn("block h-8 w-auto object-contain")}
            draggable={false}
            width={110}
            height={24}
          />
        </Link>

        <motion.button
          type="button"
          ref={triggerRef}
          onClick={toggle}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="staggered-menu-panel"
          className="relative inline-flex items-center gap-[0.3rem] bg-transparent border-0 cursor-pointer font-medium leading-none overflow-visible rounded focus-visible:outline-2 focus-visible:outline-coral-red focus-visible:outline-offset-4 z-50"
          animate={{
            color: "#111", // Always dark for mobile menu
          }}
          transition={{
            delay: changeMenuColorOnOpen ? 0.18 : 0,
            duration: 0.3,
            ease: easeStd,
          }}
        >
          <span
            className="relative mr-[0.5em] inline-block h-[1em] overflow-hidden whitespace-nowrap"
            aria-hidden="true"
          >
            <AnimatePresence initial={false} mode="popLayout">
              <motion.span
                key={open ? "Close" : "Menu"}
                className="block h-[1em] leading-none"
                initial={{ y: 20, rotate: 10, opacity: 0 }}
                animate={{ y: 0, rotate: 0, opacity: 1 }}
                exit={{ y: -20, rotate: 10, opacity: 0 }}
                transition={{ duration: 0.7, ease: easeOut4 }}
              >
                {open ? "Close" : "Menu"}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="relative w-6 h-6 shrink-0 inline-flex items-center justify-center">
            <motion.span
              className="absolute left-1/2 w-full h-0.5 bg-current rounded-[2px] -translate-x-1/2"
              style={{ top: '20%' }}
              variants={iconTopVariants}
              animate={open ? "open" : "closed"}
            />
            <motion.span
              className="absolute left-1/2 top-1/2 w-full h-0.5 bg-current rounded-[2px] -translate-x-1/2 -translate-y-1/2"
              variants={iconMidVariants}
              animate={open ? "open" : "closed"}
            />
            <motion.span
              className="absolute left-1/2 w-full h-0.5 bg-current rounded-[2px] -translate-x-1/2"
              style={{ bottom: '20%' }}
              variants={iconBotVariants}
              animate={open ? "open" : "closed"}
            />
          </span>
        </motion.button>
      </motion.header>

      {/* Dim overlay when menu is open */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-20 bg-black/10 backdrop-blur-[1px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            onClick={() => setOpen(false)}
            aria-hidden
          />
        )}
      </AnimatePresence>

      {/* PRELAYERS + PANEL (only mounted when open) */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="prelayers"
              className={cn(
                // was: "absolute ..."
                "fixed top-0 bottom-0 pointer-events-none z-45",
                position === "left" ? "left-0 right-auto" : "right-0",
                "h-screen w-[clamp(260px,38vw,420px)] max-lg:w-[76vw] max-lg:right-0"
              )}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              aria-hidden="true"
            >
              {prelayerColors.map((c, i) => (
                <motion.div
                  key={i}
                  className="absolute top-0 right-0 h-full w-full"
                  style={{ background: c }}
                  variants={prelayerVariants(i)}
                  initial="closed"
                  animate="open"
                  exit="closed"
                />
              ))}
            </motion.div>

            <motion.aside
              key="panel"
              ref={panelRef}
              id="staggered-menu-panel"
              className={cn(
                // was: "absolute ..."
                "fixed top-0 h-screen bg-background/70 flex flex-col p-[5em_2em_2em_2em] z-49",
                position === "left" ? "left-0 right-auto" : "right-0",
                "w-[clamp(260px,38vw,420px)] max-lg:w-[76vw] max-lg:right-0"
              )}
              variants={panelVariants}
              initial="closed"
              animate="open"
              exit="closed"
              aria-hidden={!open}
            >
              <ScrollArea
                className="h-[calc(100vh-64px)] pr-3 py-8"
                data-lenis-prevent
              >
                <div className="flex-1 flex flex-col gap-8">
                  {/* PRIMARY */}
                  {(() => {
                    const list = (
                      primaryItems && primaryItems.length ? primaryItems : items
                    ) as StaggeredMenuItem[];
                    return list?.length ? (
                      <ul
                        className="list-none m-0 p-0 flex flex-col gap-4"
                        role="list"
                      >
                        {list.map((it, idx) => {
                          const active =
                            typeof getIsActive === "function" && it.link
                              ? getIsActive(it.link)
                              : it.active;
                          const num = String(idx + 1).padStart(2, "0");
                          const isExpanded = expandedItems.has(idx);
                          const hasSubItems =
                            it.subItems && it.subItems.length > 0;

                          return (
                            <li
                              className="relative leading-none"
                              key={it.label + idx}
                            >
                              {hasSubItems ? (
                                <div className="flex flex-col">
                                  <button
                                    onClick={() => toggleAccordion(idx)}
                                    className={cn(
                                      "relative text-black font-semibold text-2xl cursor-pointer leading-tight tracking-[-1px] uppercase inline-flex items-center justify-between gap-3 w-full text-left transition-colors duration-200 py-2",
                                      isExpanded && "text-coral-red"
                                    )}
                                    aria-expanded={isExpanded}
                                    aria-label={it.ariaLabel ?? it.label}
                                  >
                                    {displayItemNumbering && (
                                      <span
                                        className="absolute top-[0.1em] right-[3.2em] text-sm font-normal pointer-events-none select-none opacity-50"
                                        style={{ color: accentColor }}
                                      >
                                        {num}
                                      </span>
                                    )}
                                    <div className="overflow-hidden">
                                      <motion.span
                                        className="inline-block flex-1"
                                        variants={itemVariants(idx)}
                                        initial="closed"
                                        animate="open"
                                      >
                                        {it.label}
                                      </motion.span>
                                    </div>
                                    <motion.div
                                      animate={{ rotate: isExpanded ? 180 : 0 }}
                                      transition={{
                                        duration: 0.3,
                                        ease: easeOut4,
                                      }}
                                      className="shrink-0"
                                    >
                                      <ChevronDown
                                        className="w-5 h-5"
                                        style={{ color: accentColor }}
                                      />
                                    </motion.div>
                                  </button>

                                  <AnimatePresence initial={false}>
                                    {isExpanded && (
                                      <motion.ul
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{
                                          duration: 0.3,
                                          ease: easeOut4,
                                        }}
                                        className="list-none m-0 p-0 pl-6 overflow-hidden flex flex-col gap-2 border-l-2"
                                        style={{
                                          borderColor: accentColor + "40",
                                        }}
                                      >
                                        {it.subItems!.map((subItem, subIdx) => (
                                          <motion.li
                                            key={subIdx}
                                            initial={{ x: -10, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            exit={{ x: -10, opacity: 0 }}
                                            transition={{
                                              duration: 0.2,
                                              delay: subIdx * 0.05,
                                            }}
                                          >
                                            <Link
                                              href={subItem.link}
                                              target={
                                                subItem.newTab
                                                  ? "_blank"
                                                  : undefined
                                              }
                                              rel={
                                                subItem.newTab
                                                  ? "noopener noreferrer"
                                                  : undefined
                                              }
                                              onClick={closeMenu}
                                              className="block text-base font-medium text-gray-700 hover:text-coral-red transition-colors duration-200 py-1.5"
                                            >
                                              {subItem.label}
                                            </Link>
                                          </motion.li>
                                        ))}
                                      </motion.ul>
                                    )}
                                  </AnimatePresence>
                                </div>
                              ) : it.link ? (
                                <Link
                                  href={it.link}
                                  target={it.newTab ? "_blank" : undefined}
                                  rel={
                                    it.newTab
                                      ? "noopener noreferrer"
                                      : undefined
                                  }
                                  onClick={closeMenu}
                                  aria-label={it.ariaLabel ?? it.label}
                                  className={cn(
                                    "relative text-black font-semibold cursor-pointer leading-tight tracking-[-1px] uppercase inline-flex items-center gap-3 no-underline py-2 hover:text-coral-red transition-colors duration-200",
                                    // Smaller font for longer menu items
                                    it.label.length > 12 ? "text-[1.5rem]" : "text-[1.75rem]"
                                  )}
                                >
                                  {displayItemNumbering && (
                                    <span
                                      className="absolute top-[0.1em] right-[3.2em] text-[14px] font-normal pointer-events-none select-none opacity-50"
                                      style={{ color: accentColor }}
                                    >
                                      {num}
                                    </span>
                                  )}
                                  <motion.span
                                    className="inline-block"
                                    variants={itemVariants(idx)}
                                    initial="closed"
                                    animate="open"
                                  >
                                    {it.label}
                                  </motion.span>
                                </Link>
                              ) : null}
                            </li>
                          );
                        })}
                      </ul>
                    ) : null;
                  })()}

                  {/* PERSONAS */}
                  {personaItems?.length ? (
                    <section>
                      <h3 className="m-0 mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Who We Serve
                      </h3>
                      <ul
                        className="list-none m-0 p-0 flex flex-col gap-1"
                        role="list"
                      >
                        {personaItems.map((p, i) => {
                          const active =
                            typeof getIsActive === "function" && p.link
                              ? getIsActive(p.link)
                              : p.active;
                          return (
                            <li key={p.label + i}>
                              <Link
                                href={p.link ? `/services/${p.link}` : "#"}
                                onClick={() => {
                                  open ? closeMenu() : "";
                                }}
                                aria-label={p.ariaLabel ?? p.label}
                                className="flex items-center gap-3 rounded-md px-3 py-2 text-lg overflow-hidden"
                              >
                                <motion.span
                                  className={p.default ? "font-semibold" : ""}
                                  variants={itemVariants(i)}
                                  initial="closed"
                                  animate="open"
                                  style={{
                                    color: active ? accentColor : undefined,
                                  }}
                                  whileHover={{
                                    color: accentColor,
                                    opacity: 1,
                                  }}
                                >
                                  {p.label}
                                </motion.span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </section>
                  ) : null}

                  {/* SECONDARY */}
                  {secondaryItems?.length ? (
                    <section>
                      <h3 className="m-0 mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        More
                      </h3>
                      <ul
                        className="list-none m-0 p-0 flex flex-col gap-1"
                        role="list"
                      >
                        {secondaryItems.map((s, i) => {
                          const active =
                            typeof getIsActive === "function" && s.link
                              ? getIsActive(s.link)
                              : s.active;
                          return (
                            <li key={s.label + i}>
                              <Link
                                href={s.link || "#"}
                                onClick={() => {
                                  open ? closeMenu() : "";
                                }}
                                className="block rounded-md px-3 py-2 text-base font-medium overflow-hidden"
                                style={{
                                  color: active ? accentColor : undefined,
                                }}
                              >
                                <motion.span
                                  variants={itemVariants(i)}
                                  initial="closed"
                                  animate="open"
                                  whileHover={{
                                    color: accentColor,
                                    opacity: 1,
                                  }}
                                >
                                  {s.label}
                                </motion.span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </section>
                  ) : null}

                  {/* ACTIONS */}
                  {actions?.length ? (
                    <section className="mt-2 flex flex-col gap-2">
                      {actions.map((a, i) => {
                        // Blue CTA for primary actions (like "Book a Call")
                        const isPrimaryCTA = a.variant === "primary";
                        const base: React.CSSProperties = {};
                        if (isPrimaryCTA) {
                          base.backgroundColor = "#023E7D"; // Primary blue (#023E7D)
                          base.color = "#fff";
                        } else if (a.variant === "outline") {
                          base.borderColor = "rgb(209 213 219)";
                          base.color = "#374151";
                        } else {
                          base.color = accentColor;
                        }
                        return (
                          <Link
                            key={a.label + i}
                            href={a.href}
                            target={a.external ? "_blank" : undefined}
                            rel={a.external ? "noopener noreferrer" : undefined}
                            className={
                              actionBaseClass +
                              (a.variant === "outline" ? " border" : "") +
                              (isPrimaryCTA ? " hover:opacity-90" : "")
                            }
                            style={base}
                          >
                            <motion.span whileHover={{ y: -2 }}>
                              {a.icon ? (
                                <span className="mr-2">{a.icon}</span>
                              ) : null}
                              {a.label}
                            </motion.span>
                          </Link>
                        );
                      })}
                    </section>
                  ) : null}

                  {/* SOCIALS */}
                  {displaySocials && socialItems.length > 0 && (
                    <div
                      className="mt-auto pt-6 flex flex-col gap-3"
                      aria-label="Social links"
                    >
                      <motion.h3
                        className="m-0 text-base font-medium"
                        style={{ color: accentColor }}
                        variants={socialTitleVariants}
                        initial="closed"
                        animate="open"
                      >
                        Socials
                      </motion.h3>
                      <ul
                        className="list-none m-0 p-0 flex flex-row items-center gap-3 flex-wrap group"
                        role="list"
                      >
                        {socialItems.map((s, i) => {
                          // Map social platform names to icons
                          const socialIcons: Record<string, React.ReactNode> = {
                            facebook: <Facebook className="w-5 h-5" />,
                            instagram: <Instagram className="w-5 h-5" />,
                            linkedin: <Linkedin className="w-5 h-5" />,
                            x: <XIcon className="w-5 h-5" />,
                            twitter: <XIcon className="w-5 h-5" />,
                            youtube: <Youtube className="w-5 h-5" />,
                            tiktok: <TikTokIcon className="w-5 h-5" />,
                          };
                          const platformKey = s.label.toLowerCase();
                          const icon = socialIcons[stegaClean(platformKey)];
                          
                          return (
                            <li key={s.label + i}>
                              <motion.a
                                href={s.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center text-foreground hover:text-primary transition-all duration-200 relative overflow-hidden group"
                                aria-label={s.label}
                                variants={socialLinkVariants(i)}
                                initial="closed"
                                animate="open"
                                whileHover={{ scale: 1.1, y: -2 }}
                              >
                                {icon || s.label.charAt(0)}
                              </motion.a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default StaggeredMenu;
