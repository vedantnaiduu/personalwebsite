import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import GenerativeMoiré from "@/components/GenerativeMoiré";

export const metadata: Metadata = {
  title: "Vedant Naidu - Brutalist Developer & Researcher",
  description: "Computer Science student at UMass Amherst (4.0 GPA) | Computational Biology Researcher at Stanford | Award-winning hackathon projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black">
      <body className="antialiased selection:bg-blue-600 selection:text-white">
        <GenerativeMoiré />
        <Navigation />
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}

