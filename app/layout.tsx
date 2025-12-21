import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import GeometricBackground from "@/components/GeometricBackground";
import GoldenRatioGrid from "@/components/GoldenRatioGrid";

export const metadata: Metadata = {
  title: "Vedant Naidu - Computer Science Student & ML Researcher",
  description: "Computer Science student at UMass Amherst (4.0 GPA) | ML Research Fellow | Computational Biology Researcher at Stanford | Award-winning hackathon projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <GeometricBackground />
        <GoldenRatioGrid />
        <Navigation />
        <main className="relative z-10 bg-background-dark">{children}</main>
      </body>
    </html>
  );
}

