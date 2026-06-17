import { Providers } from "@/app/providers";
import { CalendlyProvider } from "@/components/CalendlyProvider";

export default function AthletesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers enableLenis>
      <CalendlyProvider />
      {children}
    </Providers>
  );
}
