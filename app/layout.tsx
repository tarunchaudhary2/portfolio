import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.scss";
import NextTopLoader from "nextjs-toploader";
import Layout from "./component/Layout";
import { ThemeProvider } from "./providers/ThemeProvider"; // ✅ our wrapper
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Tarun Chaudhary's portfolio",
  description: "A portfolio website for Tarun Chaudhary",
  icons: {
    icon: "/icons/favicon.png ", // or "/favicon.png"
  },
};

const soraFont = Sora({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={soraFont.className} suppressHydrationWarning>
        <NextTopLoader
          color="#F3F3F3"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #F5888E,0 0 5px #F5888E"
        />

        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
