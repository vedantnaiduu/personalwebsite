import type { Metadata } from "next";

import { AtmosphereBackground } from "@/components/layout/AtmosphereBackground";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { Y2KProvider } from "@/components/providers/Y2KProvider";
import { identity } from "@/lib/site-data";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Vedant Naidu - AI Engineer",
    template: "%s | Vedant Naidu",
  },
  description: identity.positioning,
  metadataBase: new URL("https://vedantnaidu.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "Vedant Naidu - AI Engineer",
    description: identity.positioning,
    url: "/",
    siteName: "Vedant Naidu",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Vedant Naidu - AI Engineer",
    description: identity.positioning,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Y2KProvider>
          <a
            className="sr-only z-[100] rounded-full bg-aero-deep px-4 py-3 font-bold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:outline-aero-lime"
            href="#main-content"
          >
            Skip to content
          </a>
          <AtmosphereBackground />
          <Nav />
          <main id="main-content" className="relative z-10">
            {children}
          </main>
          <Footer />
          <CommandPalette />
        </Y2KProvider>
      </body>
    </html>
  );
}
