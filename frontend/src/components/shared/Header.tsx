"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogoWithText } from "@/components/LogoWithText";
import { FloatingNav } from "@/components/ui/floating-navbar";
import {
  Menu as NavbarMenu,
  MenuItem,
  HoveredLink,
} from "@/components/ui/navbar-menu";
import { StaggeredMenu, StaggeredMenuItem } from "@/components/StaggeredMenu";
import { getSanityImageProps } from "@/sanity/lib/image";
import type {
  SiteSettings,
  NavItem,
  NavLink,
  NavDropdown,
} from "@/types/sanity";

const hasText = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const isExternalHref = (href: string) => /^https?:\/\//i.test(href);

const isDropdown = (item: NavItem): item is NavDropdown =>
  item?._type === "navDropdown";

const isLink = (item: NavItem): item is NavLink => item?._type === "navLink";

export function Header({ settings }: { settings: SiteSettings | null }) {
  const [active, setActive] = useState<string | null>(null);

  const siteName = settings?.siteName || "Page Builder";
  const nav = (settings?.mainNav ?? []).filter(Boolean) as NavItem[];

  const validNavigation = useMemo(
    () =>
      nav.filter((item): item is NavDropdown | NavLink => {
        if (isDropdown(item)) {
          return hasText(item.label);
        }

        if (isLink(item)) {
          return hasText(item.label) && hasText(item.href) && !item.isButton;
        }

        return false;
      }),
    [nav],
  );

  const validCtaButtons = useMemo(
    () =>
      nav.filter(
        (item): item is NavLink =>
          isLink(item) &&
          !!item.isButton &&
          hasText(item.label) &&
          hasText(item.href),
      ),
    [nav],
  );

  const staggeredMenuItems: StaggeredMenuItem[] = useMemo(
    () =>
      validNavigation.map((item) => {
        if (isDropdown(item)) {
          return {
            label: item.label,
            ariaLabel: item.label,
            subItems: (item.items || [])
              .filter(
                (subItem) => hasText(subItem?.label) && hasText(subItem?.href),
              )
              .map((subItem) => ({
                label: subItem.label,
                link: subItem.href,
                newTab: isExternalHref(subItem.href),
              })),
          };
        }

        return {
          label: item.label,
          ariaLabel: item.label,
          link: item.href,
          newTab: isExternalHref(item.href),
        };
      }),
    [validNavigation],
  );

  const staggeredMenuActions = useMemo(
    () =>
      validCtaButtons.map((cta) => ({
        label: cta.label,
        href: cta.href,
        external: isExternalHref(cta.href),
        variant: "primary" as const,
      })),
    [validCtaButtons],
  );

  const staggeredSocialItems = useMemo(
    () =>
      (settings?.socialLinks ?? [])
        .filter((social) => hasText(social?.platform) && hasText(social?.url))
        .map((social) => ({
          label: social.platform,
          link: social.url,
        })),
    [settings?.socialLinks],
  );

  const logoImage = getSanityImageProps(settings?.logo, {
    width: 320,
    useAssetOnly: true,
    defaultWidth: 320,
    defaultHeight: 64,
  });
  const logoUrl = logoImage?.src ?? null;
  return (
    <>
      <div className="hidden lg:block">
        <FloatingNav className="px-0">
          <nav className="container mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex items-center justify-between h-16 lg:h-20">
              <LogoWithText
                href="/"
                logoImage={logoImage}
                siteName={siteName}
              />

              <div className="flex items-center gap-4">
                <NavbarMenu setActive={setActive}>
                  {validNavigation.map((item) => (
                    <MenuItem
                      key={item._key}
                      setActive={(value) => setActive(value)}
                      active={active}
                      item={item.label}
                    >
                      {isDropdown(item) ? (
                        <div className="flex flex-col space-y-4 text-sm pt-2">
                          {(item.items || [])
                            .filter(
                              (subItem) =>
                                hasText(subItem?.label) &&
                                hasText(subItem?.href),
                            )
                            .map((subItem) => (
                              <HoveredLink
                                key={subItem._key}
                                href={subItem.href}
                                target={
                                  isExternalHref(subItem.href)
                                    ? "_blank"
                                    : undefined
                                }
                                rel={
                                  isExternalHref(subItem.href)
                                    ? "noopener noreferrer"
                                    : undefined
                                }
                              >
                                {subItem.label}
                              </HoveredLink>
                            ))}
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          target={
                            isExternalHref(item.href) ? "_blank" : undefined
                          }
                          rel={
                            isExternalHref(item.href)
                              ? "noopener noreferrer"
                              : undefined
                          }
                        >
                          {item.label}
                        </Link>
                      )}
                    </MenuItem>
                  ))}
                </NavbarMenu>

                <div className="flex items-center gap-3 ml-4">
                  {validCtaButtons.map((cta) => {
                    const isPrimary = cta.label.toLowerCase().includes("book");

                    return (
                      <Button
                        key={cta._key}
                        asChild
                        size={isPrimary ? "lg" : "default"}
                        className={
                          isPrimary
                            ? "relative px-8 py-4 text-base md:text-lg font-semibold bg-primary text-primary-foreground rounded-lg shadow-lg hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 hover:bg-primary/90 group overflow-hidden"
                            : "px-5 py-2.5 text-sm font-medium shadow-md"
                        }
                      >
                        <Link
                          href={cta.href}
                          target={
                            isExternalHref(cta.href) ? "_blank" : undefined
                          }
                          rel={
                            isExternalHref(cta.href)
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="relative z-10 flex items-center gap-2"
                        >
                          <span>{cta.label}</span>
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

      <StaggeredMenu
        position="right"
        colors={["#022658", "#E56B60", "#F9D9D0"]}
        items={staggeredMenuItems}
        actions={staggeredMenuActions}
        socialItems={staggeredSocialItems}
        displaySocials={staggeredSocialItems.length > 0}
        displayItemNumbering={true}
        logoUrl={logoUrl || "/logo_nobg.png"}
        menuButtonColor="#111"
        openMenuButtonColor="#fff"
        accentColor="#E56B60"
        changeMenuColorOnOpen={true}
        className="lg:hidden"
      />
    </>
  );
}
