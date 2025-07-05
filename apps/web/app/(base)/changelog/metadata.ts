import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation - Page Builder Guide",
  description: "Comprehensive documentation for the Page Builder. Learn how to install, configure, and use all features of our drag-and-drop page builder.",
  keywords: ["page builder documentation", "user guide", "installation guide", "configuration", "tutorials"],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Documentation - Page Builder Guide",
    description: "Comprehensive documentation for the Page Builder. Learn how to install, configure, and use all features of our drag-and-drop page builder.",
    images: [
      {
        url: "/images/docs-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Page Builder Documentation",
      },
    ],
  },
};