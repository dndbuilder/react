"use client";

import { Block, BlockMeta } from "@/types/block";
import { generateBlockProps } from "@/utils/block";
import { Suspense } from "react";
import BlockWrapper from "./block-wrapper";
import { BuilderConfiguration } from "@/config";

export type RenderBlockProps = {
  index: number;
  block: Block;
  meta?: BlockMeta;
};

export const RenderBlock = ({ block, index, meta }: RenderBlockProps) => {
  const blockId = block.id;

  const blockProps = generateBlockProps({ block, index, meta });

  const config = BuilderConfiguration.getBlock(block.type);

  const Component = config?.component;

  if (!Component) {
    return (
      <div className="px-4 py-2 border border-dashed rounded-sm border-danger-500 text-danger-500 text-center">
        <p>Block type &quot;{block.type}&quot; not found</p>
      </div>
    );
  }

  return (
    <Suspense>
      <BlockWrapper blockId={blockId} attributes={blockProps.attributes}>
        <Component {...blockProps} />
      </BlockWrapper>
    </Suspense>
  );
};

RenderBlock.displayName = "RenderBlock";

export default RenderBlock;
