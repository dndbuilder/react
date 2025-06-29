"use client";
import { FC } from "react";
import { Block, BlockMeta } from "@/types/block";
import EditorRenderBlock from "./editor-render-block";
import RenderBlock from "./render-block";

type RenderChildrenProps = {
  blocks: Block[];
  meta?: BlockMeta;
};

const RenderChildren: FC<RenderChildrenProps> = ({ blocks, meta }) => {
  return (
    <>
      {blocks.map((block, index) => (
        <RenderBlock
          index={index}
          block={block}
          key={typeof block === "string" ? block : block.id}
          meta={meta}
        />
      ))}
    </>
  );
};

export default RenderChildren;
