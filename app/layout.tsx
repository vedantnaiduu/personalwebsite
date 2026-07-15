import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare } from "geist/font/pixel";

import { Footer } from "@/components/layout/Footer";
import { IntroLoader } from "@/components/intro/IntroLoader";
import { Nav } from "@/components/layout/Nav";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { identity } from "@/lib/site-data";

import "./globals.css";

const fontVars = `${GeistSans.variable} ${GeistMono.variable} ${GeistPixelSquare.variable}`;

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
    <html lang="en" className={fontVars}>
      <body>
        <IntroLoader />
        <LenisProvider>
          <a
            className="sr-only z-[100] bg-accent px-4 py-3 font-medium text-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
            href="#main-content"
          >
            Skip to content
          </a>
          <Nav />
          <main id="main-content" className="relative z-10">
            {children}
          </main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
