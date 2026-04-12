import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Spotlight } from "@/components/fx/spotlight";
import { ScrollProgress } from "@/components/fx/scroll-progress";
import { Scanline } from "@/components/fx/tech-grid";
import { Hud } from "@/components/hud";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://makai.ai"),
  title: {
    default: "MakAI — We build systems that grow your business.",
    template: "%s · MakAI",
  },
  description:
    "MakAI is a luxury AI agency building voice agents, automations, and custom AI systems for businesses that want to scale without hiring.",
  openGraph: {
    title: "MakAI — We build systems that grow your business.",
    description:
      "AI voice agents, automations, and custom builds. Book a discovery call.",
    url: "https://makai.ai",
    siteName: "MakAI",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "MakAI" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${space.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-fg relative overflow-x-hidden">
        {children}
        <Spotlight />
        <ScrollProgress />
        <Scanline />
        <Hud />
        <div className="grain" aria-hidden />
        <div className="vignette" aria-hidden />
      </body>
    </html>
  );
}
