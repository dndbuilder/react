"use client";

import { BuilderProvider, Editor, store, Theme } from "@dndbuilder.com/react";
import { useState } from "react";
import { editorConfig } from "../config/editor.config";
import { Header } from "./header";
import { Page } from "@/lib/page";

type BuilderPageClientProps = {
  initialPage: Page | null;
  initialTheme: Theme | null;
};

export function BuilderInterface({ initialPage, initialTheme }: BuilderPageClientProps) {
  const [theme] = useState<Theme | null>(initialTheme);
  const pageId = initialPage?.id;
  const initialContent = initialPage?.content || {};

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
