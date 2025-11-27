import { Open_Sans } from "next/font/google";
import React from "react";
import { Toaster } from "sonner";
import "@dndbuilder.com/react/dist/style.css";
import "./globals.css";
import ProgressProvider from "@/providers/progress-provider";
import NextAuthSessionProvider from "@/providers/session-provider";
import { Analytics } from "@vercel/analytics/next";

const openSans = Open_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://dndbuilder.com"),
  title: {
    default: "DnD Builder - Create Beautiful Pages with Drag and Drop",
    template: "%s | DnD Builder",
  },
  description:
    "A powerful drag-and-drop page builder for creating beautiful, responsive web pages without coding.",
  keywords: ["page builder", "drag and drop", "website builder", "no-code", "web design"],
  authors: [{ name: "Page Builder Team" }],
  creator: "Page Builder Team",
  publisher: "DnD Builder",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/favicon.svg",
    },
  },
  manifest: "/manifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "DnD Builder - Create Beautiful Pages with Drag and Drop",
    description:
      "A powerful drag-and-drop page builder for creating beautiful, responsive web pages without coding.",
    siteName: "DnD Builder",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DnD Builder - Create Beautiful Pages with Drag and Drop",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DnD Builder - Create Beautiful Pages with Drag and Drop",
    description:
      "A powerful drag-and-drop page builder for creating beautiful, responsive web pages without coding.",
    images: ["/images/twitter-image.jpg"],
    creator: "@dndbuilder",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={openSans.className}>
      <NextAuthSessionProvider>
        <body>
          <ProgressProvider>{children}</ProgressProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              classNames: {
                toast: "max-w-[90vw] !w-fit", // makes toast width adapt to content
              },
            }}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          />
          <Analytics />
        </body>
      </NextAuthSessionProvider>
    </html>
  );
}
