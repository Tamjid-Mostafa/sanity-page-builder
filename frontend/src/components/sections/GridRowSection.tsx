import { stegaClean } from "next-sanity";
import { BlockStylesWrapper } from "../shared/BlockStylesWrapper";
import { ScrollReveal } from "../shared/ScrollReveal";
import { ContentRenderer } from "./ContentRenderer";
import type { GridRowData } from "@/types/sanity";
import { contentMaxWidthClass } from "@/lib/site-layout";
import { cn } from "@/lib/utils";

const GAP_MAP: Record<string, string> = {
  none: "gap-0",
  sm: "gap-2 md:gap-4",
  md: "gap-4 md:gap-6",
  lg: "gap-6 md:gap-8",
  xl: "gap-10 md:gap-12 lg:gap-16",
};

const PADDING_Y_MAP: Record<string, string> = {
  none: "py-0",
  sm: "py-4 md:py-6",
  compact: "py-6 md:py-8 lg:py-10",
  md: "py-8 md:py-12",
  lg: "py-12 md:py-16",
  xl: "py-16 md:py-24",
};

const PADDING_X_MAP: Record<string, string> = {
  none: "px-0",
  sm: "px-4 sm:px-6 lg:px-8",
  md: "px-6 sm:px-8 lg:px-12",
  lg: "px-8 sm:px-12 lg:px-16",
};

const ALIGN_MAP: Record<string, string> = {
  left: "mr-auto",
  center: "mx-auto",
  right: "ml-auto",
};

const LAYOUT_GRID: Record<string, string> = {
  full: "grid-cols-1",
  "50-50": "grid-cols-1 md:grid-cols-2",
  "33-66": "grid-cols-1 md:grid-cols-[1fr_2fr]",
  "66-33": "grid-cols-1 md:grid-cols-[2fr_1fr]",
  "25-75": "grid-cols-1 md:grid-cols-[1fr_3fr]",
  "75-25": "grid-cols-1 md:grid-cols-[3fr_1fr]",
  "33-33-33": "grid-cols-1 md:grid-cols-3",
  "25-50-25": "grid-cols-1 md:grid-cols-[1fr_2fr_1fr]",
  "25-25-25-25": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

const VALIGN_MAP: Record<string, string> = {
  top: "self-start",
  center: "self-center",
  bottom: "self-end",
  // sticky requires self-start so the cell doesn't stretch to row height
  sticky: "self-start lg:sticky lg:top-28",
};

const STAGGER_MS = 100;

type GridRowDataExtended = GridRowData & { containerAlign?: string; paddingX?: string | null };

export function GridRowSection({ data }: { data: GridRowData }) {
  const d = data as GridRowDataExtended;
  const layout = stegaClean(data.layout) || "full";
  const gridClass = LAYOUT_GRID[layout] || "grid-cols-1";
  const gapClass = GAP_MAP[stegaClean(data.gap) || "md"] || "";
  const paddingClass =
    PADDING_Y_MAP[stegaClean(data.paddingY) || "compact"] || "";
  const paddingXClass =
    PADDING_X_MAP[stegaClean(d.paddingX) || "md"] || PADDING_X_MAP.md;
  const maxWidthKey = stegaClean(data.maxWidth as string | undefined) || "default";
  const maxWidthClass = contentMaxWidthClass(maxWidthKey, "default");
  const isConstrainedWidth = maxWidthKey === "narrow" || maxWidthKey === "content";
  const alignKey =
    stegaClean(d.containerAlign) || (isConstrainedWidth ? "left" : "center");
  const contentAlignClass =
    ALIGN_MAP[alignKey] || (isConstrainedWidth ? "mr-auto" : "mx-auto");
  const reverseClass = data.reverseOnMobile ? "flex-col-reverse md:grid" : "";

  return (
    <BlockStylesWrapper as="section" blockStyles={data.blockStyles} className={cn(paddingClass)}>
      <div className={cn("container mx-auto", paddingXClass)}>
        <div className={cn("w-full", maxWidthClass, contentAlignClass)}>
          <div className={cn("grid", gridClass, gapClass, reverseClass)}>
            {data.columns?.map((column, colIdx) => {
              const valign =
                VALIGN_MAP[stegaClean(column.verticalAlign) || "top"] || "";
              return (
                <ScrollReveal key={column._key} delay={colIdx * STAGGER_MS}>
                  <BlockStylesWrapper
                    blockStyles={column.blockStyles}
                    className={cn(valign, "flex flex-col gap-6 md:gap-8")}
                  >
                    {column.content?.map((block) => (
                      <ContentRenderer key={block._key} block={block} />
                    ))}
                    {(!column.content || column.content.length === 0) && (
                      <div className="flex min-h-[100px] items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted">
                        Empty column
                      </div>
                    )}
                  </BlockStylesWrapper>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </BlockStylesWrapper>
  );
}
