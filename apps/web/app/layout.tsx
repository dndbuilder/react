import "./globals.css";
import React from "react";
import { Open_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";

const openSans = Open_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={openSans.className}>
      <head></head>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
