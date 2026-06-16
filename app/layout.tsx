import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { LenisProvider } from "@/components/providers/LenisProvider";
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
