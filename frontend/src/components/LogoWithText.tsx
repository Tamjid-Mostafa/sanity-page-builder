"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Image as SanityImage } from "next-sanity/image";
import { cn } from "@/lib/utils";
import { useNavbar } from "@/contexts/NavbarContext";

interface SanityLogoImage {
  src: string;
  alt?: string | null;
  width: number;
  height: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
}

interface LogoWithTextProps {
  href?: string;
  className?: string;
  logoImage?: SanityLogoImage | null;
  siteName?: string;
}

export const LogoWithText = ({
  href = "/",
  className = "",
  logoImage,
  siteName,
}: LogoWithTextProps) => {
  const { isAtTop } = useNavbar();

  const imageClass = cn(
    "h-7 lg:h-9 w-auto object-contain object-left transition-all duration-300",
    isAtTop ? "filter invert brightness-0" : "",
  );

  return (
    <Link
      href={href}
      className={cn(
        "shrink-0 transition-opacity duration-200 hover:opacity-80",
        className,
      )}
    >
      {logoImage ? (
        <SanityImage
          src={logoImage.src}
          alt={logoImage.alt || siteName || "Logo"}
          width={logoImage.width}
          height={logoImage.height}
          className={imageClass}
          placeholder={logoImage.placeholder}
          blurDataURL={logoImage.blurDataURL}
          preload
        />
      ) : (
        <Image
          src="/logo_nobg.png"
          alt={siteName || "Logo"}
          width={160}
          height={44}
          className={imageClass}
          priority
        />
      )}
    </Link>
  );
};
