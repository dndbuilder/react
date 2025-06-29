import { Block, BlockMeta } from "@/types/block";
import { FC } from "react";
import RenderBlock from "./render-block";

type RenderChildrenProps = {
  blocks: Block[];
  meta?: BlockMeta;
};

export const RenderChildren: FC<RenderChildrenProps> = ({ blocks, meta }) => {
  return (
    <>
      {blocks.map((block, index) => (
        <RenderBlock index={index} block={block} key={block.id} meta={meta} />
      ))}
    </>
  );
};
