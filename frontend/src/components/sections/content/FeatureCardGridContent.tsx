"use client";

import { stegaClean } from "next-sanity";
import { Image } from "next-sanity/image";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { IconRenderer } from "@/lib/icon-registry";
import { Button } from "@/components/ui/button";
import { openCalendly } from "@/lib/site-cta";
import type { FeatureCardGridData } from "@/types/sanity";
import { cn } from "@/lib/utils";

type ExtendedFeatureCard = FeatureCardGridData["cards"][number] & {
  coverImage?: {
    asset?: { _ref?: string; url?: string | null } | null;
    hotspot?: unknown;
    crop?: unknown;
  } | null;
  subtitle?: string | null;
  price?: string | null;
  enrolmentFee?: string | null;
  format?: string | null;
  bulletsLabel?: string | null;
  accentColor?: string | null;
  accentApplyTo?: string[] | null;
  bestFor?: string[] | null;
  includes?: string[] | null;
  note?: string | null;
  icon?: {
    source?: "lucide" | "image" | null;
    lucide?: string | null;
    image?: { asset?: { _ref?: string; url?: string | null } | null } | null;
  } | null;
};

type ExtendedFeatureCardGridData = FeatureCardGridData & {
  eyebrow?: string | null;
  titleAlign?: string | null;
  showStepNumbers?: boolean | null;
  gridLayout?: string | null;
  stepNumberOffset?: number | null;
  style?: string | null | undefined;
  cardIconSize?: string | null;
  cardTitleTypography?: {
    textAlign?: string | null;
    fontSize?: string | null;
    fontWeight?: string | null;
    textColor?: string | null;
  } | null;
  // Backward compatibility for already-created content.
  cardTitleFontSize?: number | null;
};


const COLS_MAP: Record<string, string> = {
  "1": "grid-cols-1",
  "2": "sm:grid-cols-2",
  "3": "sm:grid-cols-2 lg:grid-cols-3",
  "4": "sm:grid-cols-2 lg:grid-cols-4",
  "5": "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
};

function resolveColumns(
  columns: string | null | undefined,
  cardCount: number,
): string {
  const cleaned = stegaClean(columns);
  if (cleaned && COLS_MAP[cleaned]) return cleaned;
  if (cardCount === 1) return "1";
  return "3";
}

const ACCENT_BAR: Record<string, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  none: "hidden",
};

const ACCENT_TEXT: Record<string, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  none: "",
};

const ACCENT_ICON_BG: Record<string, string> = {
  primary: "bg-primary/10",
  secondary: "bg-secondary/10",
  none: "bg-muted",
};

const ICON_SIZE_MAP: Record<
  string,
  { box: string; icon: string; image: string }
> = {
  small: { box: "w-8 h-8 rounded-md", icon: "w-4 h-4", image: "w-4 h-4" },
  medium: { box: "w-10 h-10 rounded-xl", icon: "w-5 h-5", image: "w-5 h-5" },
  large: { box: "w-12 h-12 rounded-xl", icon: "w-6 h-6", image: "w-6 h-6" },
  xl: { box: "w-14 h-14 rounded-2xl", icon: "w-7 h-7", image: "w-7 h-7" },
};

const CARD_STYLE_CLASSES: Record<string, string> = {
  simple: "bg-card shadow-sm hover:shadow-md",
  bordered:
    "bg-card border border-border shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-primary/25 hover:shadow-md",
  shadow: "bg-card shadow-md hover:shadow-lg",
  highlighted:
    "bg-card border border-primary/20 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-primary/25 hover:shadow-md",
};

function LightCard({
  card,
  index,
  showStepNumbers,
  cardStyle,
  iconSize,
  cardTitleStyle,
  cardTitleAlign,
}: {
  card: ExtendedFeatureCard;
  index: number;
  showStepNumbers: boolean;
  cardStyle: string;
  iconSize: { box: string; icon: string; image: string };
  cardTitleStyle?: React.CSSProperties;
  cardTitleAlign: "left" | "center" | "right";
}) {
  const accent = stegaClean(card.accentColor) || "none";
  const accentTargets = new Set(
    (card.accentApplyTo || ["icon"]).map((item) => stegaClean(item)),
  );
  const accentBarClass = ACCENT_BAR[accent] ?? "hidden";
  const accentTextClass = ACCENT_TEXT[accent] ?? "";
  const iconBgClass = ACCENT_ICON_BG[accent] ?? "bg-muted";
  const cardStyleClass =
    CARD_STYLE_CLASSES[cardStyle] ?? CARD_STYLE_CLASSES.simple;
  const showAccentBar = cardStyle === "bordered" || cardStyle === "highlighted";
  const isCompactCard = cardStyle === "bordered" || cardStyle === "highlighted";
  const hasCustomTitleSize = Boolean(cardTitleStyle?.fontSize);

  return (
    <div
      className={cn(
        "group relative h-full",
        !isCompactCard && "hover:-translate-y-1 transition-transform duration-300",
      )}
    >
      <div
        className={cn(
          "relative h-full flex flex-col overflow-hidden transition-shadow duration-300",
          isCompactCard ? "rounded-xl" : "rounded-2xl",
          cardStyleClass,
        )}
      >
        {showAccentBar && (
          <div
            className={`absolute top-0 left-0 right-0 h-0.5 z-10 ${accentBarClass}`}
            aria-hidden
          />
        )}
        {card.coverImage?.asset && (
          <div className="relative w-full h-44 overflow-hidden shrink-0">
            <Image
              src={urlFor(card.coverImage)
                .width(600)
                .height(176)
                .fit("crop")
                .url()}
              alt={card.title || ""}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 90vw, 50vw"
            />
          </div>
        )}
        <div
          className={cn(
            "flex flex-1 flex-col",
            isCompactCard ? "gap-2 p-4 pt-1" : "gap-3 p-5",
          )}
        >
          {(card.icon || showStepNumbers) && (
            <div
              className={cn(
                "flex shrink-0",
                showStepNumbers ? "items-center justify-between" : "",
              )}
            >
              {card.icon && (
                <div
                  className={cn(
                    "inline-flex items-center justify-center",
                    iconSize.box,
                    accentTargets.has("iconBg") ? iconBgClass : "bg-muted",
                  )}
                >
                  {stegaClean(card.icon.source) === "image" &&
                  card.icon.image?.asset ? (
                    <Image
                      src={urlFor(card.icon.image)
                        .width(40)
                        .height(40)
                        .fit("max")
                        .url()}
                      alt=""
                      width={20}
                      height={20}
                      className={cn(
                        "transition-transform duration-300 group-hover:scale-110",
                        iconSize.image,
                      )}
                    />
                  ) : card.icon.lucide ? (
                    <IconRenderer
                      name={stegaClean(card.icon.lucide)}
                      className={cn(
                        "transition-transform duration-300 group-hover:scale-110",
                        iconSize.icon,
                        accentTargets.has("icon")
                          ? accentTextClass || "text-foreground"
                          : "text-foreground",
                      )}
                      strokeWidth={1.5}
                    />
                  ) : null}
                </div>
              )}
              {showStepNumbers && (
                <span className="text-2xl font-bold text-charcoal select-none tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
              )}
            </div>
          )}
          <div className={cn("flex-1 text-left", isCompactCard ? "space-y-2" : "space-y-2.5")}>
            {card.title && (
              <h3
                className={cn(
                  hasCustomTitleSize
                    ? "font-heading font-bold tracking-tight leading-[1.08]"
                    : isCompactCard
                      ? "font-heading text-sm font-semibold leading-snug text-foreground"
                      : "font-heading text-base font-semibold leading-snug text-foreground sm:text-lg",
                  cardTitleAlign === "center"
                    ? "text-center"
                    : cardTitleAlign === "right"
                      ? "text-right"
                      : "text-left",
                  accentTargets.has("title") && accentTextClass,
                )}
                style={cardTitleStyle}
              >
                {card.title}
              </h3>
            )}
            {card.subtitle && (
              <p
                className={cn(
                  "text-sm font-medium",
                  accentTargets.has("subtitle") && accentTextClass,
                )}
              >
                {card.subtitle}
              </p>
            )}
            {card.description && (
              <p
                className={cn(
                  isCompactCard
                    ? "text-xs font-light leading-relaxed text-muted-foreground sm:text-[13px]"
                    : "text-sm font-light leading-relaxed text-foreground",
                  !isCompactCard && accentTargets.has("description") && accentTextClass,
                )}
              >
                {card.description}
              </p>
            )}
          </div>
          {card.cta?.label && card.cta?.href && (
            <a
              href={card.cta.href}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 px-4 py-2.5 text-sm font-medium"
            >
              {card.cta.label}
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function PathwayCard({ card }: { card: ExtendedFeatureCard }) {
  const href = card.cta?.href;
  const label = card.cta?.label || "Learn more";
  const icon = stegaClean(card.icon?.lucide);

  const inner = (
    <article className="group/card relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/50 bg-card/70 shadow-none ring-1 ring-black/3 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-1 hover:border-primary/25 hover:bg-card">
      <div
        className="absolute left-5 right-5 top-0 h-px bg-linear-to-r from-transparent via-primary/55 to-transparent sm:left-6 sm:right-6"
        aria-hidden
      />
      {card.coverImage?.asset && (
        <div className="relative aspect-4/3 w-full overflow-hidden bg-muted sm:aspect-5/4">
          <Image
            src={urlFor(card.coverImage).width(600).fit("crop").url()}
            alt={card.title || ""}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-[1.04]"
            sizes="(max-width: 640px) 90vw, (max-width: 1280px) 45vw, 25vw"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
        {icon && (
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
            <IconRenderer name={icon} className="h-5 w-5" strokeWidth={1.5} />
          </div>
        )}
        <div className="min-w-0 flex-1 space-y-2">
          {card.title && (
            <h3 className="font-heading text-lg font-semibold leading-snug tracking-tight text-foreground md:text-xl">
              {card.title}
            </h3>
          )}
          {card.subtitle && (
            <p className="text-sm font-medium leading-snug text-foreground">
              {card.subtitle}
            </p>
          )}
          {card.description && (
            <p className="text-sm font-normal leading-relaxed text-muted-foreground">
              {card.description}
            </p>
          )}
        </div>
        {href && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            {label}
            <svg
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover/card:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </span>
        )}
      </div>
    </article>
  );

  if (href) {
    return (
      <a
        href={href}
        className="block h-full rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {inner}
      </a>
    );
  }
  return <div className="h-full">{inner}</div>;
}

function PathwayDetailCard({ card }: { card: ExtendedFeatureCard }) {
  const accent = stegaClean(card.accentColor) || "primary";
  const accentBarClass = ACCENT_BAR[accent] ?? "bg-primary";
  const accentTextClass = ACCENT_TEXT[accent] ?? "text-primary";
  const icon = stegaClean(card.icon?.lucide);
  const bestFor = (card.bestFor || []).filter(Boolean);
  const includes = (card.includes || []).filter(Boolean);

  return (
    <div className="group relative h-full transition-transform duration-300 hover:-translate-y-1">
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-white/20">
        <div
          className={cn("absolute inset-x-0 top-0 h-0.5", accentBarClass)}
          aria-hidden
        />
        <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
          <div className="flex items-start gap-3">
            {icon && (
              <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10">
                <IconRenderer
                  name={icon}
                  className={cn("h-5 w-5", accentTextClass)}
                  strokeWidth={1.5}
                />
              </div>
            )}
            <div className="min-w-0">
              {card.title && (
                <h3 className="font-heading text-lg font-bold leading-snug text-background">
                  {card.title}
                </h3>
              )}
              {card.subtitle && (
                <p className="mt-1 text-sm font-light leading-relaxed text-background/85">
                  {card.subtitle}
                </p>
              )}
            </div>
          </div>

          {card.description && (
            <p className="text-sm font-light leading-relaxed text-background/90">
              {card.description}
            </p>
          )}

          {bestFor.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-background/70">
                Best for
              </p>
              <ul className="space-y-2">
                {bestFor.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-xs font-light leading-relaxed text-background sm:text-sm"
                  >
                    <span
                      className={cn(
                        "mt-1.5 h-1 w-1 shrink-0 rounded-full",
                        accentBarClass,
                      )}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {includes.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-background/70">
                Includes
              </p>
              <ul className="space-y-2">
                {includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-xs font-light leading-relaxed text-background sm:text-sm"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/40" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {card.note && (
            <p className="mt-auto border-l-2 border-white/25 pl-3 text-xs font-medium leading-relaxed text-background/90 sm:text-sm">
              {card.note}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function CalloutCard({
  card,
  iconSize,
}: {
  card: ExtendedFeatureCard;
  iconSize: { box: string; icon: string; image: string };
}) {
  const accent = stegaClean(card.accentColor) || "secondary";
  const accentBarClass = ACCENT_BAR[accent] ?? "bg-secondary";
  const accentTextClass = ACCENT_TEXT[accent] ?? "text-secondary";

  return (
    <div className="relative flex h-full min-h-48 flex-col justify-end overflow-hidden rounded-2xl border border-border bg-foreground p-6 shadow-sm sm:min-h-52 sm:p-8">
      <div
        className={cn("absolute inset-x-0 top-0 h-0.5", accentBarClass)}
        aria-hidden
      />
      {card.icon?.lucide && (
        <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
          <IconRenderer
            name={stegaClean(card.icon.lucide)}
            className={cn(iconSize.icon, accentTextClass)}
            strokeWidth={1.5}
          />
        </div>
      )}
      {card.title?.trim() && (
        <h3 className="mb-2 font-heading text-base font-semibold leading-snug text-background">
          {card.title}
        </h3>
      )}
      {card.description && (
        <p className="text-sm font-light leading-relaxed text-background">
          {card.description}
        </p>
      )}
    </div>
  );
}

function OnDarkCard({
  card,
  iconSize,
  showStepNumbers,
  index,
  stepOffset = 0,
}: {
  card: ExtendedFeatureCard;
  iconSize: { box: string; icon: string; image: string };
  showStepNumbers?: boolean;
  index: number;
  stepOffset?: number;
}) {
  const accent = stegaClean(card.accentColor) || "secondary";
  const accentBarClass = ACCENT_BAR[accent] ?? "bg-secondary";
  const accentTextClass = ACCENT_TEXT[accent] ?? "text-secondary";

  if (showStepNumbers) {
    return (
      <div className="h-full">
        <div className="relative flex h-full min-h-44 flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-white/20">
          <div
            className={cn("absolute inset-x-0 top-0 h-0.5", accentBarClass)}
            aria-hidden
          />
          <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
            <div className="flex items-center justify-between">
              {card.icon?.lucide && (
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                  <IconRenderer
                    name={stegaClean(card.icon.lucide)}
                    className={cn("h-4 w-4", accentTextClass)}
                    strokeWidth={1.5}
                  />
                </div>
              )}
              <span className="select-none text-2xl font-bold tabular-nums text-background">
                {String(index + 1 + stepOffset).padStart(2, "0")}
              </span>
            </div>
            {card.title && (
              <h3 className="text-sm font-semibold leading-snug text-background sm:text-base">
                {card.title}
              </h3>
            )}
            {card.description && (
              <p className="text-sm font-light leading-relaxed text-background/90">
                {card.description}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative h-full transition-transform duration-300 hover:-translate-y-0.5">
      <div className="relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-white/10 bg-[oklch(0.18_0.01_255)] p-5 transition-colors duration-300 hover:border-white/20 md:p-6">
        <div
          className={cn("absolute inset-x-0 top-0 h-0.5", accentBarClass)}
          aria-hidden
        />
        {card.icon?.lucide && (
          <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/5">
            <IconRenderer
              name={stegaClean(card.icon.lucide)}
              className={cn(iconSize.icon, "text-background")}
              strokeWidth={1.5}
            />
          </div>
        )}
        <div className="flex flex-1 flex-col gap-2">
          {card.title && (
            <h3 className="font-heading text-base font-semibold leading-snug tracking-tight text-background md:text-lg">
              {card.title}
            </h3>
          )}
          {card.description && (
            <p className="text-sm font-normal leading-relaxed text-background/75">
              {card.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function AudienceCard({ card }: { card: ExtendedFeatureCard }) {
  return (
    <div className="group relative flex h-full flex-col rounded-3xl border border-border/50 bg-card/70 p-6 shadow-none ring-1 ring-black/3 transition-[border-color,background-color] duration-300 hover:border-secondary/20 hover:bg-card md:p-7">
      <div
        className="absolute left-6 right-6 top-0 h-px bg-linear-to-r from-transparent via-secondary/50 to-transparent md:left-7 md:right-7"
        aria-hidden
      />
      <h3 className="mb-3 pt-1 font-heading text-lg font-semibold leading-snug tracking-tight text-foreground md:text-xl">
        {card.title}
      </h3>
      {card.description && (
        <p className="text-sm font-normal leading-relaxed text-muted-foreground md:text-[0.9375rem]">
          {card.description}
        </p>
      )}
    </div>
  );
}

function resolveCardHref(card: ExtendedFeatureCard): string | null {
  const href = card.cta?.href?.trim();
  return href || null;
}

function ProgrammeFeesCard({ card }: { card: ExtendedFeatureCard }) {
  const href = resolveCardHref(card);
  const bestFor = (card.bestFor || []).filter(Boolean);
  const bestForText = bestFor.length > 0 ? bestFor.join(" ") : null;

  return (
    <div className="relative flex h-full flex-col rounded-2xl border border-border bg-card p-8 shadow-sm transition-shadow duration-300 hover:border-primary/30 hover:shadow-md">
      {card.title && (
        <h3 className="font-heading text-xl font-bold text-foreground">{card.title}</h3>
      )}
      {card.price && (
        <p className="mt-5 font-heading text-3xl font-bold tracking-tight text-foreground">
          {card.price}
        </p>
      )}
      {card.enrolmentFee && (
        <p className="mt-2 text-sm font-medium text-muted-foreground">{card.enrolmentFee}</p>
      )}
      {card.format && (
        <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-secondary">
          {card.format}
        </p>
      )}
      {card.description && (
        <p className="mt-6 flex-1 text-sm leading-relaxed text-foreground">{card.description}</p>
      )}
      {bestForText && (
        <>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Best for
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{bestForText}</p>
        </>
      )}
      {card.cta?.label && href && (
        <Button className="mt-8 w-full group" variant="secondary" asChild>
          <Link href={href} target="_blank" rel="noopener noreferrer">
            {card.cta.label}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>
      )}
    </div>
  );
}

function ThemePreviewCard({ card }: { card: ExtendedFeatureCard }) {
  const accent = stegaClean(card.accentColor) || "primary";
  const accentBarClass = accent === "secondary" ? "bg-secondary" : "bg-primary";

  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card p-4 shadow-sm transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <div className={cn("absolute inset-x-0 top-0 h-0.5", accentBarClass)} aria-hidden />
      {card.title && (
        <h3 className="pt-1 font-heading text-sm font-semibold leading-snug text-foreground">
          {card.title}
        </h3>
      )}
      {card.description && (
        <p className="mt-2 text-xs font-light leading-relaxed text-muted-foreground sm:text-[13px]">
          {card.description}
        </p>
      )}
    </article>
  );
}

function ExploreLinkCard({
  card,
  iconSize,
}: {
  card: ExtendedFeatureCard;
  iconSize: { box: string; icon: string; image: string };
}) {
  const href = resolveCardHref(card);
  const icon = stegaClean(card.icon?.lucide);
  if (!href) return null;

  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
    >
      {icon && (
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <IconRenderer name={icon} className={iconSize.icon} strokeWidth={1.5} aria-hidden />
        </span>
      )}
      {card.title && (
        <span className="mt-4 font-heading text-lg font-semibold text-foreground group-hover:text-primary">
          {card.title}
        </span>
      )}
      {card.description && (
        <span className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {card.description}
        </span>
      )}
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
        Continue
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </span>
    </Link>
  );
}

function ProgrammeThemeCard({
  card,
  iconSize,
}: {
  card: ExtendedFeatureCard;
  iconSize: { box: string; icon: string; image: string };
}) {
  const accent = stegaClean(card.accentColor) || "primary";
  const accentBarClass = ACCENT_BAR[accent] ?? "bg-primary";
  const iconBgClass = ACCENT_ICON_BG[accent] ?? "bg-primary/10";
  const accentTextClass = ACCENT_TEXT[accent] ?? "text-primary";
  const icon = stegaClean(card.icon?.lucide);
  const bullets = (card.includes || []).filter(Boolean);
  const bestFor = (card.bestFor || []).filter(Boolean);
  const bestForText = bestFor.join(" ");
  const bulletsLabel = card.bulletsLabel || "Can include";

  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 pt-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className={cn("absolute inset-x-0 top-0 h-0.5", accentBarClass)} aria-hidden />
      {icon && (
        <div className={cn("mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl", iconBgClass, accentTextClass)}>
          <IconRenderer name={icon} className={iconSize.icon} strokeWidth={1.5} />
        </div>
      )}
      {card.title && (
        <h3 className="font-heading text-lg font-semibold leading-snug text-foreground">{card.title}</h3>
      )}
      {card.description && (
        <p className="mt-2 text-sm font-light leading-relaxed text-muted-foreground">{card.description}</p>
      )}
      {bullets.length > 0 && (
        <>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-primary/90">
            {bulletsLabel}
          </p>
          <ul className="mt-2 flex-1 space-y-1.5 text-sm font-light leading-relaxed text-foreground">
            {bullets.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/60" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </>
      )}
      {bestForText && (
        <p className="mt-4 border-t border-border pt-4 text-xs text-foreground sm:text-sm">
          <span className="font-semibold text-foreground">Best for:</span> {bestForText}
        </p>
      )}
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-4 w-full font-semibold"
        onClick={() => openCalendly()}
      >
        Enquire about this theme
      </Button>
    </article>
  );
}

function BookingChipCard({
  card,
  iconSize,
}: {
  card: ExtendedFeatureCard;
  iconSize: { box: string; icon: string; image: string };
}) {
  const icon = stegaClean(card.icon?.lucide);

  return (
    <div className="flex h-full flex-col items-center gap-2 rounded-xl border border-border bg-card px-3 py-4 text-center shadow-sm transition-shadow duration-300 hover:shadow-md">
      {icon && (
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <IconRenderer name={icon} className={iconSize.icon} strokeWidth={1.5} aria-hidden />
        </span>
      )}
      {card.title && (
        <span className="text-xs font-medium leading-snug text-foreground sm:text-[13px]">
          {card.title}
        </span>
      )}
    </div>
  );
}

function ProcessStepCard({
  card,
  index,
}: {
  card: ExtendedFeatureCard;
  index: number;
}) {
  return (
    <li className="relative flex flex-col lg:pt-0">
      <div className="flex gap-4 lg:flex-col lg:items-center lg:gap-3 lg:text-center">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background font-heading text-lg font-bold text-primary lg:relative lg:z-1"
          aria-hidden
        >
          {String(index + 1)}
        </div>
        <div className="min-w-0">
          {card.title && (
            <h3 className="mb-2 text-sm font-semibold leading-snug text-foreground">{card.title}</h3>
          )}
          {card.description && (
            <p className="text-sm font-light leading-relaxed text-foreground">{card.description}</p>
          )}
        </div>
      </div>
    </li>
  );
}

function ProgrammeReviewCard({ card }: { card: ExtendedFeatureCard }) {
  const href = resolveCardHref(card);
  const descriptionParts = (card.description || "")
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean);
  const lead = descriptionParts[0];
  const secondary = descriptionParts.slice(1).join(" ");

  return (
    <div className="rounded-2xl border border-border bg-muted/30 p-8 shadow-sm sm:p-10">
      {card.title && (
        <h3 className="font-heading text-xl font-bold text-foreground">{card.title}</h3>
      )}
      {card.price && (
        <p className="mt-4 font-heading text-3xl font-bold text-foreground">{card.price}</p>
      )}
      {lead && (
        <p className="mt-6 text-sm leading-relaxed text-foreground">{lead}</p>
      )}
      {secondary && (
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{secondary}</p>
      )}
      {card.note && (
        <p className="mt-4 text-sm font-medium leading-relaxed text-foreground">{card.note}</p>
      )}
      {card.cta?.label && href && (
        <Button className="mt-8 w-full group" asChild>
          <Link href={href} target="_blank" rel="noopener noreferrer">
            {card.cta.label}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>
      )}
    </div>
  );
}

function PaymentOptionCard({
  card,
  iconSize,
}: {
  card: ExtendedFeatureCard;
  iconSize: { box: string; icon: string; image: string };
}) {
  const icon = stegaClean(card.icon?.lucide);

  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
      {icon && (
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <IconRenderer name={icon} className={iconSize.icon} strokeWidth={1.5} aria-hidden />
        </div>
      )}
      {card.title && (
        <h3 className="mt-6 font-heading text-lg font-semibold text-foreground">{card.title}</h3>
      )}
      {card.description && (
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{card.description}</p>
      )}
    </div>
  );
}

function IncludedListCard({ card }: { card: ExtendedFeatureCard }) {
  const items = (card.includes || []).filter(Boolean);

  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-8 shadow-sm sm:p-10">
      {card.title && (
        <h3 className="font-heading text-lg font-semibold text-foreground">{card.title}</h3>
      )}
      <ul className="mt-6 flex-1 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2} aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ExtraListCard({ card }: { card: ExtendedFeatureCard }) {
  const items = (card.includes || []).filter(Boolean);

  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-8 shadow-sm sm:p-10">
      {card.title && (
        <h3 className="font-heading text-lg font-semibold text-foreground">{card.title}</h3>
      )}
      <ul className="mt-6 flex-1 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 border-l-2 border-border pl-3 text-sm leading-relaxed text-muted-foreground"
          >
            {item}
          </li>
        ))}
      </ul>
      {card.note && (
        <p className="mt-8 border-t border-border pt-6 text-sm leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">Guide:</span> {card.note}
        </p>
      )}
    </div>
  );
}

export function FeatureCardGridContent({
  data,
}: {
  data: FeatureCardGridData;
}) {
  const d = data as ExtendedFeatureCardGridData;
  const cards = (data.cards || []) as ExtendedFeatureCard[];
  const columns = resolveColumns(stegaClean(data.columns), cards.length);
  const colClass = COLS_MAP[columns] || COLS_MAP["3"];
  const style = stegaClean(d.style) as string | null | undefined;
  const isAudience = style === "audience";
  const isPathway = style === "pathway";
  const isPathwayDetail = style === "pathwayDetail";
  const isCallout = style === "callout";
  const isOnDark = style === "onDark";
  const isProgrammeFees = style === "programmeFees";
  const isProgrammeReview = style === "programmeReview";
  const isPaymentOption = style === "paymentOption";
  const isIncludedList = style === "includedList";
  const isExtraList = style === "extraList";
  const isExploreLink = style === "exploreLink";
  const isProgrammeTheme = style === "programmeTheme";
  const isBookingChips = style === "bookingChips";
  const isProcessStep = style === "processStep";
  const isThemePreview = style === "themePreview";
  const isFeesSection =
    isProgrammeFees || isPaymentOption || isIncludedList || isExtraList;
  const isGlobalSection =
    isExploreLink || isProgrammeTheme || isBookingChips || isProcessStep;
  const isCompactGrid =
    style === "bordered" ||
    style === "highlighted" ||
    style === "audience" ||
    isThemePreview ||
    isFeesSection;
  const titleAlign = stegaClean(d.titleAlign) === "center" ? "center" : "left";
  const showStepNumbers = d.showStepNumbers ?? false;
  const hasHeader = Boolean(d.eyebrow || d.title || d.subtitle);
  const subtitleParts = (d.subtitle ?? "")
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean);
  const subtitleLead = isOnDark && subtitleParts.length > 1 ? subtitleParts[0] : null;
  const subtitleBody =
    isOnDark && subtitleParts.length > 1
      ? subtitleParts.slice(1).join("\n\n")
      : d.subtitle;
  const cardStyle = stegaClean(d.style) || "simple";
  const iconSize =
    ICON_SIZE_MAP[stegaClean(d.cardIconSize) || "medium"] ||
    ICON_SIZE_MAP.medium;
  const titleTypography = stegaClean(d.cardTitleTypography);
  const parsedTypographySize = titleTypography?.fontSize
    ? Number(titleTypography.fontSize)
    : undefined;
  const legacySize =
    typeof d.cardTitleFontSize === "number" ? d.cardTitleFontSize : undefined;
  const cardTitleFontSize =
    typeof parsedTypographySize === "number" &&
    Number.isFinite(parsedTypographySize)
      ? Math.min(Math.max(parsedTypographySize, 20), 96)
      : typeof legacySize === "number"
        ? Math.min(Math.max(legacySize, 20), 96)
        : undefined;
  const cardTitleAlignRaw = titleTypography?.textAlign;
  const cardTitleAlign: "left" | "center" | "right" =
    cardTitleAlignRaw === "center" || cardTitleAlignRaw === "right"
      ? cardTitleAlignRaw
      : "left";
  const cardTitleFontWeightRaw = titleTypography?.fontWeight;
  const cardTitleFontWeight =
    cardTitleFontWeightRaw &&
    ["400", "500", "600", "700", "800"].includes(cardTitleFontWeightRaw)
      ? Number(cardTitleFontWeightRaw)
      : undefined;
  const cardTitleStyle: React.CSSProperties | undefined =
    cardTitleFontSize || cardTitleFontWeight || titleTypography?.textColor
      ? {
          ...(cardTitleFontSize ? { fontSize: `${cardTitleFontSize}px` } : {}),
          ...(cardTitleFontWeight ? { fontWeight: cardTitleFontWeight } : {}),
          ...(titleTypography?.textColor
            ? { color: titleTypography.textColor }
            : {}),
        }
      : undefined;
  if (cards.length === 0) return null;

  const gridLayout = stegaClean(d.gridLayout) || "default";
  const stepNumberOffset = d.stepNumberOffset ?? 0;
  const effectiveStepOffset =
    stepNumberOffset > 0
      ? stepNumberOffset
      : isOnDark && showStepNumbers && !hasHeader && cards.length <= 2
        ? 3
        : 0;
  const isPillarLayout =
    isOnDark &&
    showStepNumbers &&
    (cards.length === 5 ||
      (gridLayout === "3-2" && cards.length >= 4));
  const isPillarHeader = isOnDark && showStepNumbers && cards.length === 5;

  const renderCard = (card: ExtendedFeatureCard, index: number) => {
    if (isProgrammeFees) return <ProgrammeFeesCard card={card} />;
    if (isProgrammeReview) return <ProgrammeReviewCard card={card} />;
    if (isPaymentOption) return <PaymentOptionCard card={card} iconSize={iconSize} />;
    if (isThemePreview) return <ThemePreviewCard card={card} />;
    if (isExploreLink) return <ExploreLinkCard card={card} iconSize={iconSize} />;
    if (isProgrammeTheme) return <ProgrammeThemeCard card={card} iconSize={iconSize} />;
    if (isBookingChips) return <BookingChipCard card={card} iconSize={iconSize} />;
    if (isProcessStep) return <ProcessStepCard card={card} index={index} />;
    if (isIncludedList) return <IncludedListCard card={card} />;
    if (isExtraList) return <ExtraListCard card={card} />;
    if (isPathwayDetail) return <PathwayDetailCard card={card} />;
    if (isCallout) return <CalloutCard card={card} iconSize={iconSize} />;
    if (isOnDark) {
      return (
        <OnDarkCard
          card={card}
          iconSize={iconSize}
          showStepNumbers={showStepNumbers}
          index={index}
          stepOffset={effectiveStepOffset}
        />
      );
    }
    if (isPathway) return <PathwayCard card={card} />;
    if (isAudience) return <AudienceCard card={card} />;
    return (
      <LightCard
        card={card}
        index={index}
        showStepNumbers={showStepNumbers}
        cardStyle={cardStyle}
        iconSize={iconSize}
        cardTitleStyle={cardTitleStyle}
        cardTitleAlign={cardTitleAlign}
      />
    );
  };

  const headerBlock = (d.eyebrow || d.title || d.subtitle) && (
    <div
      className={cn(
        isCompactGrid || isPathwayDetail || isPillarHeader
          ? cn(
              "mb-10 max-w-3xl",
              (isFeesSection || isGlobalSection) && "mx-auto",
              isExploreLink && "max-w-2xl mx-auto",
            )
          : "mb-8",
        titleAlign === "center" ? "text-center" : "text-left",
        (isFeesSection || isExploreLink) && titleAlign === "center" && "max-w-2xl mx-auto",
      )}
    >
      {d.eyebrow && (
        <p
          className={cn(
            "mb-2 text-xs font-semibold uppercase tracking-[0.14em]",
            isOnDark || isPathwayDetail ? "text-secondary" : "text-primary",
          )}
        >
          {d.eyebrow}
        </p>
      )}
      {d.title && (
        <h2
          className={cn(
            "font-heading font-bold leading-[1.08] tracking-tight",
            isExploreLink
              ? "text-2xl sm:text-3xl"
              : "text-3xl sm:text-4xl md:text-[2.625rem]",
            isCompactGrid && !subtitleBody && "max-w-2xl",
            subtitleBody && !isOnDark && "mb-4",
            (isOnDark || isPathwayDetail) && "text-background",
          )}
        >
          {d.title}
        </h2>
      )}
      {subtitleLead && (
        <p className="mt-4 text-base font-semibold text-background sm:text-lg">
          {subtitleLead}
        </p>
      )}
      {subtitleBody && (
        <p
          className={cn(
            "max-w-3xl text-sm font-light leading-relaxed sm:text-base",
            !d.title && "mt-0",
            d.title && !isOnDark && !subtitleLead && "mt-0",
            d.title && (isOnDark || subtitleLead) && "mt-2",
            d.title && isFeesSection && !isOnDark && "mt-4 text-muted-foreground",
            d.title && isBookingChips && !isOnDark && "mt-4 text-muted-foreground",
            isExploreLink && !isOnDark && "mt-3 text-muted-foreground",
            titleAlign === "center" && "mx-auto",
            isOnDark || isPathwayDetail
              ? "text-background/90"
              : "text-foreground",
          )}
        >
          {subtitleBody}
        </p>
      )}
    </div>
  );

  const isSingleStandalone =
    cards.length === 1 &&
    !hasHeader &&
    (isCallout || isProgrammeReview || columns === "1");

  if (isPillarLayout) {
    const topCards = cards.slice(0, 3);
    const bottomCards = cards.slice(3);

    return (
      <div>
        {headerBlock}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {topCards.map((card, index) => (
            <div key={card._key} className="h-full">
              {renderCard(card, index)}
            </div>
          ))}
        </div>
        {bottomCards.length > 0 && (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mx-auto lg:max-w-4xl">
            {bottomCards.map((card, index) => (
              <div key={card._key} className="h-full">
                {renderCard(card, index + 3)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (isProcessStep) {
    return (
      <div>
        {headerBlock}
        <div className="relative">
          <div
            className="pointer-events-none hidden h-px bg-border lg:absolute lg:left-[6%] lg:right-[6%] lg:top-8"
            aria-hidden
          />
          <ol className="relative grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-8 lg:grid-cols-4 lg:gap-6">
            {cards.map((card, index) => renderCard(card, index))}
          </ol>
        </div>
      </div>
    );
  }

  return (
    <div className={cn((isIncludedList || isExtraList || isExploreLink) && "h-full")}>
      {headerBlock}
      {isSingleStandalone ? (
        isProgrammeReview ? (
          <div className="mx-auto max-w-lg">{renderCard(cards[0], 0)}</div>
        ) : (
          <div className={cn((isIncludedList || isExtraList) && "h-full")}>
            {renderCard(cards[0], 0)}
          </div>
        )
      ) : (
        <div
          className={cn(
            "grid grid-cols-1 items-stretch",
            isPathwayDetail
              ? cn("gap-5", colClass)
              : isCallout
                ? cn("gap-5", colClass)
                : isProgrammeFees
                  ? cn("mx-auto max-w-6xl gap-8", colClass)
                : isPaymentOption
                  ? cn("mx-auto max-w-5xl gap-8 md:gap-8", colClass)
                : isIncludedList || isExtraList
                  ? cn("mx-auto max-w-5xl gap-8 lg:grid-cols-2 lg:gap-12", colClass)
                : isExploreLink
                  ? cn("mx-auto max-w-5xl gap-5 md:grid-cols-2", colClass)
                : isThemePreview
                  ? "gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
                : isProgrammeTheme
                  ? cn("gap-6 sm:grid-cols-2 xl:grid-cols-3", colClass)
                : isBookingChips
                  ? "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                : isOnDark
                  ? cn(
                      "gap-4 md:gap-5",
                      colClass,
                      !hasHeader &&
                        cards.length <= 2 &&
                        "mt-4 lg:mx-auto lg:max-w-4xl",
                    )
                  : isPathway
                    ? "gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 xl:gap-7"
                    : isAudience
                      ? "gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7"
                      : isCompactGrid
                        ? cn(
                            "gap-4 sm:gap-4 md:gap-5",
                            colClass,
                            columns === "5" && "xl:gap-5",
                          )
                        : `gap-4 ${colClass}`,
          )}
        >
          {cards.map((card, index) => (
            <div key={card._key} className="h-full">
              {renderCard(card, index)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
