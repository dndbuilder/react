"use client";

import "@repo/builder/dist/builder.css";
import { BuilderProvider, store, Editor, Block } from "@repo/builder";
import { Header } from "./_components/header";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [initialContent, setInitialContent] = useState<Record<string, Block>>(
    {}
  );

  useEffect(() => {
    // Load content from localStorage on client-side
    try {
      const savedContent = localStorage.getItem("builder-content");
      if (savedContent) {
        const parsedContent = JSON.parse(savedContent);
        setInitialContent(parsedContent);
      }
    } catch (error) {
      console.error("Error loading content from localStorage:", error);
    }
  }, []);

  return (
    <div className="h-screen">
      <BuilderProvider store={store}>
        <Header />

        <Editor
          content={initialContent}
          style={{
            height: "calc(100vh - 60px)", // Adjust height to account for header
          }}
        />
      </BuilderProvider>
    </div>
  );
}
