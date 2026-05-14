import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Nocodly AI — AI-Powered SaaS Platform",
    template: "%s | Nocodly AI",
  },
  description:
    "Nocodly AI is a modern AI SaaS platform for text generation, automation, and intelligent workflows. Built for teams who want to ship faster.",
  keywords: [
    "AI SaaS Dashboard",
    "SaaS MVP",
    "AI Web Application",
    "Startup SaaS Platform",
    "AI Automation",
    "Stripe SaaS",
    "Full Stack SaaS",
    "OpenAI integration",
    "Nocodly AI",
  ],
  authors: [{ name: "Nocodly" }],
  creator: "Nocodly",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nocodly-ai.vercel.app",
    siteName: "Nocodly AI",
    title: "Nocodly AI — AI-Powered SaaS Platform",
    description:
      "Modern AI SaaS platform with text generation, smart dashboard, and Stripe billing.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Nocodly AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nocodly AI — AI-Powered SaaS Platform",
    description: "Modern AI SaaS platform with text generation and Stripe billing.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://nocodly-ai.vercel.app"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
