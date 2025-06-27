"use client";

import { Block, BlockMeta } from "@/types/block";
import { FC, useEffect } from "react";
import EditorRenderBlock from "./editor-render-block";
import { BuilderConfiguration } from "@/config";
import { BuilderConfig } from "@/types";

type RenderContentClientProps = {
  content: Record<string, Block>;
  children?: React.ReactNode;
  meta?: BlockMeta;
  builderConfig?: BuilderConfig; // Add builderConfig prop
};

const EditorRenderContent: FC<RenderContentClientProps> = ({
  content,
  children,
  meta,
  builderConfig,
}) => {
  // Apply custom builder configuration if provided
  useEffect(() => {
    if (builderConfig) {
      BuilderConfiguration.mergeConfig(builderConfig);
    }
  }, [builderConfig]);

  const root = content["root"];

  if (!root) {
    return null;
  }

  return (
    <>
      <main>
        {root.children.map(
          (block, index) =>
            typeof block === "string" && (
              <EditorRenderBlock
                index={index}
                block={block}
                key={block}
                meta={meta}
                isEditable={true}
              />
            )
        )}
      </main>
      {children}
    </>
  );
};

export default EditorRenderContent;
