"use client";

import * as React from "react";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ReactLenis } from "lenis/react";

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
        <ReactLenis
          root
          options={{
            lerp: 0.08,
            duration: 1.1,
            smoothWheel: true,
            wheelMultiplier: 0.9,
            touchMultiplier: 1.2,
            syncTouch: true,
            syncTouchLerp: 0.08,
          }}
        >
          {content}
        </ReactLenis>
      ) : (
        content
      )}
    </>
  );
}
