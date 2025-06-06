"use client";

import "@repo/builder/dist/index.css";
import { BuilderProvider, store, Editor, Block } from "@repo/builder";
import { Header } from "./_components/header";

export default function HomePage() {
  return (
    <div className="h-screen">
      <BuilderProvider store={store}>
        <Header />

        <Editor content={{} as Record<string, Block>} />
      </BuilderProvider>
    </div>
  );
}
