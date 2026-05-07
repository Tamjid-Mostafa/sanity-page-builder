"use client";
import React from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import SplitText from "../SplitText";
import Link from "next/link";
import { useNavbar } from "@/contexts/NavbarContext";

const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

interface StaggeredTextSlideProps {
  text: string;
  isActive: boolean;
  duration?: number;
  staggerDelay?: number;
  className?: string;
  topClassName?: string;
  bottomClassName?: string;
}

export function StaggeredTextSlide({
  text,
  className = "",
  topClassName = "",
}: StaggeredTextSlideProps) {

  return (
    <span
      className={cn(
        "relative inline-block font-heading align-middle whitespace-nowrap",
        className
      )}
    >
      <span className={cn("block", topClassName)}>
        {text}
      </span>
    </span>
  );
}

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  const { isAtTop } = useNavbar();
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.2 }}
        className="cursor-pointer flex justify-center items-center gap-2 text-base font-normal relative pb-1"
      >
        <StaggeredTextSlide text={item} isActive={active === item} className={isAtTop ? "text-background" : "text-foreground"}/>
        <span className="sr-only">{item}</span>
        {active === item && (
          <motion.span
            layoutId="underline"
            className={cn(
              "absolute bg-primary h-0.5 bottom-0 origin-left left-0 w-full"
            )}
          />
        )}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%+1.5rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-background/98 backdrop-blur-md rounded-sm overflow-hidden border border-border/60 shadow-2xl"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className="relative shadow-input flex justify-center space-x-4 px-8 py-6"
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link href={href} className="flex space-x-2">
      <img
        src={src}
        width={140}
        height={70}
        alt={title}
        className="shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-foreground">
          {title}
        </h4>
        <p className="text-muted-foreground text-sm max-w-40">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <Link
      {...rest}
      className="text-muted-foreground hover:text-foreground after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-200 hover:after:w-full relative"
    >
      {children}
    </Link>
  );
};
