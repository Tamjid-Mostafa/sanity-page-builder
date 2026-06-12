"use client";

import { stegaClean } from "next-sanity";
import { Image } from "next-sanity/image";
import { urlFor } from "@/sanity/lib/image";
import { IconRenderer } from "@/lib/icon-registry";
import type { FeatureCardGridData } from "@/types/sanity";
import { cn } from "@/lib/utils";

type ExtendedFeatureCard = FeatureCardGridData["cards"][number] & {
  coverImage?: {
    asset?: { _ref?: string; url?: string | null } | null;
    hotspot?: unknown;
    crop?: unknown;
  } | null;
  subtitle?: string | null;
  accentColor?: string | null;
  accentApplyTo?: string[] | null;
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
  "2": "sm:grid-cols-2",
  "3": "sm:grid-cols-2 lg:grid-cols-3",
  "4": "sm:grid-cols-2 lg:grid-cols-4",
};

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
  secondary: "bg-secondary/15",
  none: "bg-muted",
};

const ICON_SIZE_MAP: Record<
  string,
  { box: string; icon: string; image: string }
> = {
  small: { box: "w-8 h-8 rounded-md", icon: "w-4 h-4", image: "w-4 h-4" },
  medium: { box: "w-10 h-10 rounded-lg", icon: "w-5 h-5", image: "w-5 h-5" },
  large: { box: "w-12 h-12 rounded-xl", icon: "w-6 h-6", image: "w-6 h-6" },
  xl: { box: "w-14 h-14 rounded-2xl", icon: "w-7 h-7", image: "w-7 h-7" },
};

const CARD_STYLE_CLASSES: Record<string, string> = {
  simple: "bg-card shadow-sm hover:shadow-md",
  bordered: "bg-card border border-border shadow-sm hover:shadow-md",
  shadow: "bg-card shadow-md hover:shadow-lg",
  highlighted: "bg-card border border-primary/20 shadow-sm hover:shadow-md",
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

  return (
    <div className="group relative hover:-translate-y-1 transition-transform duration-300">
      <div
        className={cn(
          "relative h-full rounded-2xl transition-shadow duration-300 flex flex-col overflow-hidden",
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
        <div className="flex flex-col gap-3 p-5 flex-1">
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
          <div className="flex-1 space-y-2.5 text-left">
            {card.title && (
              <h3
                className={cn(
                  "text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08]",
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
                  "text-sm font-light leading-relaxed",
                  accentTargets.has("description") && accentTextClass,
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

function OnDarkCard({
  card,
  iconSize,
}: {
  card: ExtendedFeatureCard;
  iconSize: { box: string; icon: string; image: string };
}) {
  const accent = stegaClean(card.accentColor) || "secondary";
  const accentBarClass = ACCENT_BAR[accent] ?? "bg-secondary";

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
    <div className="group relative flex flex-col rounded-3xl border border-border/50 bg-card/70 p-6 shadow-none ring-1 ring-black/3 transition-[border-color,background-color] duration-300 hover:border-secondary/20 hover:bg-card md:p-7">
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

export function FeatureCardGridContent({
  data,
}: {
  data: FeatureCardGridData;
}) {
  const d = data as ExtendedFeatureCardGridData;
  const cards = (data.cards || []) as ExtendedFeatureCard[];
  const columns = stegaClean(data.columns) || "3";
  const colClass = COLS_MAP[columns] || COLS_MAP["3"];
  const style = stegaClean(d.style);
  const isAudience = style === "audience";
  const isPathway = style === "pathway";
  const isOnDark = style === "onDark";
  const titleAlign = stegaClean(d.titleAlign) === "center" ? "center" : "left";
  const showStepNumbers = d.showStepNumbers ?? false;
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

  return (
    <div>
      {(d.eyebrow || d.title || d.subtitle) && (
        <div
          className={cn(
            "mb-8",
            titleAlign === "center" ? "text-center" : "text-left",
          )}
        >
          {d.eyebrow && (
            <p
              className={cn(
                "mb-2 text-xs font-semibold uppercase tracking-[0.14em]",
                isOnDark ? "text-secondary" : "text-primary",
              )}
            >
              {d.eyebrow}
            </p>
          )}
          {d.title && (
            <h2
              className={cn(
                "text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08]",
                isOnDark && "text-background",
              )}
            >
              {d.title}
            </h2>
          )}
          {d.subtitle && (
            <p
              className={cn(
                "mt-4 max-w-3xl text-sm font-light leading-relaxed sm:text-base",
                titleAlign === "center" && "mx-auto",
                isOnDark ? "text-background/80" : "text-muted-foreground",
              )}
            >
              {d.subtitle}
            </p>
          )}
        </div>
      )}
      <div
        className={cn(
          "grid grid-cols-1",
          isOnDark
            ? cn("gap-4 md:gap-5", colClass)
            : isPathway
              ? "gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 xl:gap-7"
              : isAudience
                ? "gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7"
                : `gap-4 ${colClass}`,
        )}
      >
        {cards.map((card, index) =>
          isOnDark ? (
            <OnDarkCard key={card._key} card={card} iconSize={iconSize} />
          ) : isPathway ? (
            <PathwayCard key={card._key} card={card} />
          ) : isAudience ? (
            <AudienceCard key={card._key} card={card} />
          ) : (
            <LightCard
              key={card._key}
              card={card}
              index={index}
              showStepNumbers={showStepNumbers}
              cardStyle={cardStyle}
              iconSize={iconSize}
              cardTitleStyle={cardTitleStyle}
              cardTitleAlign={cardTitleAlign}
            />
          ),
        )}
      </div>
    </div>
  );
}
