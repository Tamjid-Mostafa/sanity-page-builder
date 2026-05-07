"use client";

import * as React from "react";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ReactLenis, useLenis } from "lenis/react";

type ProvidersProps = {
  children: React.ReactNode;
  /** Show Sanity Visual Editing overlay */
  enableVisualEditing?: boolean;
  /** Enable Lenis root wrapper */
  enableLenis?: boolean;
};

export function Providers({ children, enableLenis = true }: ProvidersProps) {
  const content = (
    <>
      <TooltipProvider delayDuration={150}>{children}</TooltipProvider>
    </>
  );

  return (
    <>
      {enableLenis ? (
        <ReactLenis root options={{ duration: 1.1 }}>
          {content}
        </ReactLenis>
      ) : (
        content
      )}
    </>
  );
}
