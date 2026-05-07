"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FloatingNav } from "@/components/ui/floating-navbar";
import {
  Menu as NavbarMenu,
  MenuItem,
  HoveredLink,
} from "@/components/ui/navbar-menu";
import { StaggeredMenu, StaggeredMenuItem } from "@/components/StaggeredMenu";
import { LogoWithText } from "@/components/LogoWithText";
import { Calendar, ArrowRight } from "lucide-react";

interface NavLink {
  text: string | null;
  url: string | null;
  newTab?: boolean | null;
}

interface NavItem {
  label: string | null;
  items?: NavLink[] | null;
  link?: NavLink | null;
}

interface CTAButton {
  text: string | null;
  url: string | null;
  style: "primary" | "secondary" | "outline" | "ghost" | null;
  newTab?: boolean | null;
}

interface SocialLinks {
  facebook?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
  tiktok?: string | null;
  x?: string | null;
  youtube?: string | null;
}

interface HeaderProps {
  navigation?: NavItem[] | null;
  ctaButtons?: CTAButton[] | null;
  logo?: {
    asset?: {
      url?: string | null;
    } | null;
  } | null;
  socialLinks?: SocialLinks | null;
}

export function Header({
  navigation = [],
  ctaButtons = [],
  logo,
  socialLinks,
}: HeaderProps) {
  const [active, setActive] = useState<string | null>(null);

  // Filter out null/invalid navigation items
  const validNavigation = (navigation || []).filter(
    (item): item is NavItem & { label: string } =>
      item !== null && item.label !== null,
  );

  // Filter out null/invalid CTA buttons
  const validCtaButtons = (ctaButtons || []).filter(
    (
      cta,
    ): cta is CTAButton & {
      text: string;
      url: string;
      style: NonNullable<CTAButton["style"]>;
    } =>
      cta !== null &&
      cta.text !== null &&
      cta.url !== null &&
      cta.style !== null,
  );

  // Transform navigation for StaggeredMenu with accordion support
  const staggeredMenuItems: StaggeredMenuItem[] = validNavigation.map(
    (item) => {
      if (item.items && item.items.length > 0) {
        // Create parent item with subItems for accordion
        return {
          label: item.label,
          ariaLabel: item.label,
          subItems: item.items
            .filter((subItem) => subItem.url && subItem.text)
            .map((subItem) => ({
              label: subItem.text!,
              link: subItem.url!,
              newTab: subItem.newTab || false,
            })),
        };
      } else if (item.link && item.link.url) {
        return {
          label: item.label,
          ariaLabel: item.label,
          link: item.link.url,
          newTab: item.link.newTab || false,
        };
      }
      return {
        label: item.label,
        ariaLabel: item.label,
      };
    },
  );

  // Transform CTA buttons for StaggeredMenu actions
  const staggeredMenuActions = validCtaButtons.map((cta) => ({
    label: cta.text,
    href: cta.url,
    external: cta.newTab || false,
    variant: "primary" as const,
  }));

  // Transform social links for StaggeredMenu
  const staggeredSocialItems = socialLinks
    ? ([
        socialLinks.facebook && {
          label: "Facebook",
          link: socialLinks.facebook,
        },
        socialLinks.instagram && {
          label: "Instagram",
          link: socialLinks.instagram,
        },
        socialLinks.linkedin && {
          label: "LinkedIn",
          link: socialLinks.linkedin,
        },
        socialLinks.tiktok && { label: "TikTok", link: socialLinks.tiktok },
        socialLinks.x && { label: "X", link: socialLinks.x },
        socialLinks.youtube && { label: "YouTube", link: socialLinks.youtube },
      ].filter(Boolean) as { label: string; link: string }[])
    : [];

  return (
    <>
      {/* Desktop Navigation - Hidden on mobile */}
      <div className="hidden lg:block">
        <FloatingNav className="px-0">
          <nav className="container mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex items-center justify-between h-16 lg:h-20">
              {/* Logo with Text */}
              <LogoWithText href="/" />

              {/* Desktop Navigation */}
              <div className="flex items-center gap-4">
                <NavbarMenu setActive={setActive}>
                  {validNavigation.map((item, i) => (
                    <MenuItem
                      key={i}
                      setActive={setActive}
                      active={active}
                      item={item.label}
                    >
                      {item.items && item.items.length > 0 ? (
                        <div className="flex flex-col space-y-4 text-sm pt-2">
                          {item.items
                            .filter((subItem) => subItem.url && subItem.text)
                            .map((subItem, i) => (
                              <HoveredLink
                                key={i}
                                href={subItem.url || "#"}
                                target={subItem.newTab ? "_blank" : undefined}
                                rel={
                                  subItem.newTab
                                    ? "noopener noreferrer"
                                    : undefined
                                }
                              >
                                {subItem.text}
                              </HoveredLink>
                            ))}
                        </div>
                      ) : item.link && item.link.url ? (
                        <Link
                          href={item.link.url}
                          target={item.link.newTab ? "_blank" : undefined}
                          rel={
                            item.link.newTab ? "noopener noreferrer" : undefined
                          }
                        >
                          {item.label}
                        </Link>
                      ) : null}
                    </MenuItem>
                  ))}
                </NavbarMenu>

                {/* CTA Buttons */}
                <div className="flex items-center gap-3 ml-4">
                  {validCtaButtons.map((cta, idx) => {
                    const isPrimary =
                      cta.style === "primary" ||
                      cta.text?.toLowerCase().includes("book a call");
                    return (
                      <Button
                        key={idx}
                        asChild
                        size={isPrimary ? "lg" : "default"}
                        className={cn(
                          isPrimary
                            ? "relative px-8 py-4 text-base md:text-lg font-semibold bg-primary text-primary-foreground rounded-lg shadow-lg hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 hover:bg-primary/90 group overflow-hidden"
                            : "px-5 py-2.5 text-sm font-medium shadow-md",
                        )}
                      >
                        <Link
                          href={cta.url}
                          target={cta.newTab ? "_blank" : undefined}
                          rel={cta.newTab ? "noopener noreferrer" : undefined}
                          className="relative z-10 flex items-center gap-2"
                        >
                          {isPrimary && (
                            <Calendar className="h-4 w-4 md:h-5 md:w-5 group-hover:rotate-12 transition-transform duration-300" />
                          )}
                          <span>{cta.text}</span>
                          {isPrimary && (
                            <ArrowRight className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform duration-300" />
                          )}
                          {/* Shine effect on hover */}
                          {isPrimary && (
                            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent" />
                          )}
                        </Link>
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>
          </nav>
        </FloatingNav>
      </div>

      {/* Mobile StaggeredMenu - Only visible on mobile/tablet */}
      <StaggeredMenu
        position="right"
        colors={["#022658", "#E56B60", "#F9D9D0"]}
        items={staggeredMenuItems}
        actions={staggeredMenuActions}
        socialItems={staggeredSocialItems}
        displaySocials={staggeredSocialItems.length > 0}
        displayItemNumbering={true}
        logoUrl={logo?.asset?.url || "/logo_nobg.png"}
        menuButtonColor="#111"
        openMenuButtonColor="#fff"
        accentColor="#E56B60"
        changeMenuColorOnOpen={true}
        className="lg:hidden"
      />
    </>
  );
}
function DesktopNavContent({
  logo,
  validNavigation,
  active,
  setActive,
  validCtaButtons,
}: {
  logo: HeaderProps["logo"];
  validNavigation: (NavItem & { label: string })[];
  active: string | null;
  setActive: (v: string | null) => void;
  validCtaButtons: (CTAButton & {
    text: string;
    url: string;
    style: NonNullable<CTAButton["style"]>;
  })[];
}) {
  return (
    <nav className="container mx-auto px-6 sm:px-8 lg:px-12">
      <div className="flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 transition-opacity duration-200 hover:opacity-80"
        >
          <Image
            src={logo?.asset?.url || "/logo_nobg.png"}
            alt="iCollege Life"
            width={180}
            height={50}
            className="h-8 lg:h-10 w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="flex items-center gap-4">
          <NavbarMenu setActive={setActive}>
            {validNavigation.map((item, i) => (
              <MenuItem
                key={i}
                setActive={setActive}
                active={active}
                item={item.label}
              >
                {item.items && item.items.length > 0 ? (
                  <div className="flex flex-col space-y-4 text-sm pt-2">
                    {item.items
                      .filter((subItem) => subItem.url && subItem.text)
                      .map((subItem, i) => (
                        <HoveredLink
                          key={i}
                          href={subItem.url || "#"}
                          target={subItem.newTab ? "_blank" : undefined}
                          rel={
                            subItem.newTab ? "noopener noreferrer" : undefined
                          }
                        >
                          {subItem.text}
                        </HoveredLink>
                      ))}
                  </div>
                ) : item.link && item.link.url ? (
                  <Link
                    href={item.link.url}
                    target={item.link.newTab ? "_blank" : undefined}
                    rel={item.link.newTab ? "noopener noreferrer" : undefined}
                  >
                    {item.label}
                  </Link>
                ) : null}
              </MenuItem>
            ))}
          </NavbarMenu>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3 ml-4">
            {validCtaButtons.map((cta, idx) => (
              <Button key={idx} asChild size="default">
                <Link
                  href={cta.url}
                  target={cta.newTab ? "_blank" : undefined}
                  rel={cta.newTab ? "noopener noreferrer" : undefined}
                >
                  {cta.text}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
