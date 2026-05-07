"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";

interface PremiumImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  fallbackGradient?: string;
  objectFit?: "cover" | "contain" | "fill";
}

export function PremiumImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = "",
  priority = false,
  fallbackGradient = "from-muted to-secondary",
  objectFit = "cover",
}: PremiumImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // If error or no src, show gradient fallback
  if (hasError || !src) {
    return (
      <div
        className={`bg-linear-to-br ${fallbackGradient} ${className}`}
        style={{ width, height }}
      />
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Loading skeleton with shimmer effect */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className={`absolute inset-0 bg-linear-to-br ${fallbackGradient} animate-pulse`}
        >
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </motion.div>
      )}

      {/* Actual image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          fill={fill}
          priority={priority}
          className={`${objectFit === "cover" ? "object-cover" : objectFit === "contain" ? "object-contain" : "object-fill"}`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </motion.div>
    </div>
  );
}

// Add shimmer animation to globals.css
// @keyframes shimmer {
//   0% { transform: translateX(-100%); }
//   100% { transform: translateX(100%); }
// }
// .animate-shimmer {
//   animation: shimmer 2s infinite;
// }

