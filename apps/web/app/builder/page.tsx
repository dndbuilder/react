"use client";

import { BASE_URL } from "@/lib/constants";
import { Block, BuilderProvider, Editor, store, Theme } from "@dndbuilder.com/react";
import "@dndbuilder.com/react/dist/style.css";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Header } from "./_components/header";
import { editorConfig } from "./config/editor.config";

export default function BuilderPage() {
  const [pageId, setPageId] = useState<string | undefined>(undefined);
  const [initialContent, setInitialContent] = useState<Record<string, Block>>({});
  const [theme, setTheme] = useState<Theme | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.accessToken) return;

    // Load content from API instead of localStorage
    const fetchContent = async () => {
      try {
        const response = await fetch(`${BASE_URL}/pages`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`,
          },
          cache: "no-store", // Ensure we always fetch the latest content
        });

        if (!response.ok) {
          throw new Error("Failed to fetch content");
        }

        const data = await response.json();

        // API returns an array of pages, so we'll use the first page's content
        if (data && data.length > 0 && data[0].content && Object.keys(data[0].content).length > 0) {
          setPageId(data[0].id);
          setInitialContent(data[0].content as Record<string, Block>);
        }
      } catch (error) {
        console.error("Error loading content:", error);
      }
    };

    fetchContent();
  }, [session?.accessToken]);

  useEffect(() => {
    if (!session?.accessToken) return;

    // Fetch the active theme
    const getActiveTheme = async () => {
      try {
        const response = await fetch(`${BASE_URL}/themes/active`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch active theme");
        }

        const data = await response.json();
        setTheme(data);
      } catch (error) {
        console.error("Error fetching active theme:", error);
      }
    };

    getActiveTheme();
  }, [session?.accessToken]);

  return (
    <>
      <BuilderProvider store={store}>
        <Header pageId={pageId} />

        <main className="mt-[60px]">
          <Editor
            content={initialContent}
            builderConfig={editorConfig}
            theme={theme || undefined}
            style={{
              height: "calc(100vh - 60px)", // Adjust height to account for header
            }}
          />
        </main>
      </BuilderProvider>
    </>
  );
}
