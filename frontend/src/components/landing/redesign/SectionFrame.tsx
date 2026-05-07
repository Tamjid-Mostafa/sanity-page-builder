import { cn } from "@/lib/utils";

type SectionFrameProps = {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
};

export function SectionFrame({
  children,
  className,
  containerClassName,
  id,
}: SectionFrameProps) {
  return (
    <section id={id} className={cn("py-6 md:py-8 lg:py-10", className)}>
      <div
        className={cn(
          "container mx-auto px-6 sm:px-8 lg:px-12",
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}