import React from 'react';
import { Footer } from './_components/footer';
import { Header } from './_components/header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
