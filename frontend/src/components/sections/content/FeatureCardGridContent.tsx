import { stegaClean } from "next-sanity";
import { Image } from "next-sanity/image";
import { urlFor } from "@/sanity/lib/image";
import type { LucideProps } from "lucide-react";
import { ICON_REGISTRY } from "@/lib/icon-registry";
import type { FeatureCardGridData } from "@/types/sanity";

// Extended until sanity typegen picks up the new schema fields
type ExtendedFeatureCard = FeatureCardGridData["cards"][number] & {
  coverImage?: {
    asset?: { _ref?: string; url?: string | null } | null;
    hotspot?: unknown;
    crop?: unknown;
  } | null;
  subtitle?: string | null;
  accentColor?: string | null;
  icon?: {
    source?: "lucide" | "image" | null;
    lucide?: string | null;
    image?: { asset?: { _ref?: string; url?: string | null } | null } | null;
  } | null;
};

function RegistryIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = ICON_REGISTRY[name];
  if (!Icon) return null;
  return <Icon {...props} />;
}

type ExtendedFeatureCardGridData = FeatureCardGridData & {
  titleAlign?: string | null;
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

const GRADIENT_FALLBACK: Record<string, string> = {
  primary: "bg-linear-to-br from-primary/20 to-secondary/20",
  secondary: "bg-linear-to-br from-secondary/20 to-primary/20",
  none: "bg-muted",
};

export function FeatureCardGridContent({
  data,
}: {
  data: FeatureCardGridData;
}) {
  const d = data as ExtendedFeatureCardGridData;
  const cards = (data.cards || []) as ExtendedFeatureCard[];
  const columns = stegaClean(data.columns) || "3";
  const colClass = COLS_MAP[columns] || COLS_MAP["3"];
  const titleAlign = stegaClean(d.titleAlign) === "center" ? "center" : "left";

  if (cards.length === 0) return null;

  return (
    <div>
      {data.title && (
        <h2
          className={`text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground ${
            titleAlign === "center" ? "text-center" : "text-left"
          }`}
        >
          {data.title}
        </h2>
      )}
      {data.subtitle && (
        <p
          className={`mt-4 text-sm sm:text-base font-light text-foreground leading-relaxed max-w-3xl ${
            titleAlign === "center" ? "mx-auto text-center" : ""
          }`}
        >
          {data.subtitle}
        </p>
      )}

      <div
        className={`${data.title || data.subtitle ? "mt-8" : ""} grid grid-cols-1 gap-4 ${colClass}`}
      >
        {cards.map((card) => {
          const accent = stegaClean(card.accentColor) || "none";
          const accentBarClass = ACCENT_BAR[accent] ?? "hidden";
          const gradientClass = GRADIENT_FALLBACK[accent] ?? "bg-muted";
          return (
            <div
              key={card._key}
              className="group relative hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="relative h-full rounded-2xl bg-card border border-border shadow-sm group-hover:shadow-md transition-shadow duration-300 flex flex-col overflow-hidden">
                {/* Top accent bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-0.5 z-10 ${accentBarClass}`}
                  aria-hidden
                />

                {/* Cover image */}
                <div className="relative w-full h-44 overflow-hidden shrink-0">
                  {card.coverImage?.asset ? (
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
                  ) : (
                    <div
                      className={`absolute inset-0 ${gradientClass}`}
                      aria-hidden
                    />
                  )}
                </div>

                {/* Card content */}
                <div className="flex flex-col p-5 flex-1">
                  {/* Icon badge */}
                  {card.icon && (
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-muted mb-4 shrink-0">
                      {stegaClean(card.icon.source) === "image" && card.icon.image?.asset ? (
                        <Image
                          src={urlFor(card.icon.image).width(40).height(40).fit("max").url()}
                          alt=""
                          width={20}
                          height={20}
                          className="transition-transform duration-300 group-hover:scale-110"
                        />
                      ) : card.icon.lucide ? (
                        <RegistryIcon
                          name={stegaClean(card.icon.lucide)!}
                          className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${
                            accent === "primary"
                              ? "text-primary"
                              : accent === "secondary"
                                ? "text-secondary"
                                : "text-foreground"
                          }`}
                          strokeWidth={1.5}
                        />
                      ) : null}
                    </div>
                  )}

                  {/* Text */}
                  <div className="flex-1 space-y-2.5">
                    {card.title && (
                      <h3 className="text-2xl sm:text-3xl font-heading font-bold text-foreground leading-tight">
                        {card.title}
                      </h3>
                    )}
                    {card.subtitle && (
                      <p className="text-sm font-medium text-foreground">
                        {card.subtitle}
                      </p>
                    )}
                    {card.description && (
                      <p className="text-sm font-light leading-relaxed text-foreground">
                        {card.description}
                      </p>
                    )}
                  </div>

                  {/* CTA button */}
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
        })}
      </div>
    </div>
  );
}
