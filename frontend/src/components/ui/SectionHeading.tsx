import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "default" | "inverse";
  className?: string;
  subtitleClassName?: string;
};

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  tone = "default",
  className,
  subtitleClassName,
}: SectionHeadingProps) {
  const titleToneClass = tone === "inverse" ? "text-background" : "text-foreground";
  const subtitleToneClass = tone === "inverse" ? "text-background/90" : "text-foreground";

  return (
    <div className={cn(align === "center" ? "text-center" : "text-left", className)}>
      <h2
        className={cn(
          "text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08]",
          titleToneClass
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-lg md:text-xl leading-relaxed max-w-3xl",
            align === "center" && "mx-auto",
            subtitleToneClass,
            subtitleClassName
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
