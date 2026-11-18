import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { ReactNode } from "react";
import "./globals.scss";
import "./cp.css";
import { seo, siteUrl } from "./lib/site";
import { profile } from "./lib/portfolio";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: { type: "profile", url: "/", siteName: profile.name, title: seo.title, description: seo.description, locale: "en_IN" },
  twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  icons: { icon: "/icons/favicon.png" },
};

export const viewport: Viewport = { themeColor: "#05080d", colorScheme: "dark" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <NextTopLoader color="#3ee6ff" height={2} showSpinner={false} shadow="0 0 10px #3ee6ff" />
        {children}
      </body>
    </html>
  );
}
