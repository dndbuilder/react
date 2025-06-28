"use client";

import { Block } from "@repo/builder";
import { BuilderProvider, Editor } from "@repo/builder/components";
import "@repo/builder/dist/builder.css";
import { store } from "@repo/builder/store";
import { useEffect, useState } from "react";
import { Header } from "./_components/header";

export default function BuilderPage() {
  const [initialContent, setInitialContent] = useState<Record<string, Block>>({});

  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load content from API instead of localStorage
    const fetchContent = async () => {
      try {
        const response = await fetch("/api/builder-content");
        if (!response.ok) {
          throw new Error("Failed to fetch content");
        }

        const data = await response.json();
        if (data.content && Object.keys(data.content).length > 0) {
          setInitialContent(data.content);
        }
      } catch (error) {
        console.error("Error loading content:", error);
        // Fallback to localStorage if API fails
        try {
          const savedContent = localStorage.getItem("builder-content");
          if (savedContent) {
            const parsedContent = JSON.parse(savedContent);
            setInitialContent(parsedContent);
          }
        } catch (localError) {
          console.error("Error loading from localStorage:", localError);
        }
      } finally {
        // setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  return (
    <>
      <BuilderProvider store={store}>
        <Header />

        <main className="mt-[60px]">
          <Editor
            content={initialContent}
            style={{
              height: "calc(100vh - 60px)", // Adjust height to account for header
            }}
          />
        </main>
      </BuilderProvider>
    </>
  );
}
