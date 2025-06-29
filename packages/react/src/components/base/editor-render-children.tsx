"use client";
import { FC } from "react";
import { Block, BlockMeta } from "@/types/block";
import EditorRenderBlock from "./editor-render-block";

type EditorRenderChildrenProps = {
  blocks: (string | Block)[];
  meta?: BlockMeta;
  isEditable: boolean;
};

const EditorRenderChildren: FC<EditorRenderChildrenProps> = ({ blocks, meta, isEditable }) => {
  return (
    <>
      {blocks.map((block, index) => (
        <EditorRenderBlock
          index={index}
          block={block}
          key={typeof block === "string" ? block : block.id}
          meta={meta}
          isEditable={isEditable}
        />
      ))}
    </>
  );
};

export default EditorRenderChildren;
