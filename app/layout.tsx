import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { PendingSectionScroll } from "@/components/portfolio/section-link";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Alex Commeau — Développeur Fullstack & Ingénieur IA",
  description:
    "Portfolio d'Alex Commeau, développeur fullstack et ingénieur IA — projets, expérience et compétences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`dark ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-200">
        <PendingSectionScroll />
        {children}
      </body>
    </html>
  );
}
