"use client";

/**
 * Icon rendering for CMS-driven icon names (kebab-case strings from
 * sanity-plugin-lucide-icon-picker).
 *
 * Uses the official `DynamicIcon` from `lucide-react/dynamic` — the
 * recommended approach for content management systems where icon names
 * are stored in a database.
 *
 * Docs: https://lucide.dev/guide/react/advanced/dynamic-icon-component
 * Sanity plugin: https://www.sanity.io/plugins/lucide
 *
 * Usage:
 *   import { IconRenderer } from "@/lib/icon-registry"
 *   <IconRenderer name="arrow-right" className="h-5 w-5" strokeWidth={1.5} />
 */

import { DynamicIcon, iconNames } from "lucide-react/dynamic";
import type { IconName } from "lucide-react/dynamic";
import type { LucideProps } from "lucide-react";

export type { IconName };

/**
 * Renders any of the 1600+ Lucide icons by kebab-case name.
 * Accepts nullable strings directly from Sanity fields — returns null
 * for missing or invalid names instead of throwing.
 */
export function IconRenderer({
  name,
  ...props
}: { name?: string | null } & LucideProps) {
  if (!name) return null;
  const clean = name.trim() as IconName;
  if (!iconNames.includes(clean)) return null;
  return <DynamicIcon name={clean} {...props} />;
}
