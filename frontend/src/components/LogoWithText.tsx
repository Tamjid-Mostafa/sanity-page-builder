"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useNavbar } from "@/contexts/NavbarContext";

interface LogoWithTextProps {
  href?: string;
  className?: string;
}

export const LogoWithText = ({
  href = "/",
  className = "",
}: LogoWithTextProps) => {
  const { isAtTop } = useNavbar();

  return (
    <Link
      href={href}
      className={cn(
        "shrink-0 transition-opacity duration-200 hover:opacity-80",
        className
      )}
    >
      <div
        className={cn(
          "transition-all duration-300",
          isAtTop ? "filter invert brightness-0" : ""
        )}
      >
        <Image
          src="/logo_nobg.png"
          alt="iCollege Life Logo"
          width={160}
          height={44}
          className="h-7 lg:h-9 w-auto"
          priority
        />
      </div>
    </Link>
  );
};
