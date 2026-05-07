"use client";

import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";

export function AthletesFooter() {
  return (
    <footer className="py-8 bg-foreground border-t border-white/10">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="font-heading font-bold text-background text-sm tracking-tight">
            iCollege Life
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-background/60">
            <a
              href="mailto:info@icollege.life"
              className="inline-flex items-center gap-1.5 hover:text-background transition-colors duration-200"
            >
              <Mail className="h-3.5 w-3.5" strokeWidth={1.5} />
              info@icollege.life
            </a>
            <a
              href="https://wa.me/34618332384"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-background transition-colors duration-200"
            >
              <MessageCircle className="h-3.5 w-3.5" strokeWidth={1.5} />
              WhatsApp: +34 618 332 384
            </a>
          </div>
          <p className="text-xs text-background/40">
            &copy; {new Date().getFullYear()} iCollege Life. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
