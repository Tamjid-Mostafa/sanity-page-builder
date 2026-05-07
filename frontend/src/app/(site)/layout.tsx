import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { SanityLive } from "@/sanity/lib/live";
import Link from "next/link";
import { Providers } from "../providers";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDraft = (await draftMode()).isEnabled;

  return (
    <>
      <Providers enableLenis={false}>{children}</Providers>
      <SanityLive />
      {isDraft && <VisualEditing />}
      {isDraft && (
        <Link
          href="/api/draft-mode/disable"
          className="fixed bottom-4 right-4 z-50 rounded-full bg-black px-4 py-2 text-sm font-medium text-white shadow-lg hover:bg-gray-800"
        >
          Exit Preview
        </Link>
      )}
    </>
  );
}
