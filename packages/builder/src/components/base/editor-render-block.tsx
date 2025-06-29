"use client";

import { BuilderConfiguration } from "@/config/builder.config";
import { getBlock } from "@/store/selectors";
import { Block, BlockMeta, BlockType } from "@/types/block";
import { generateBlockProps } from "@/utils/block";
import { useAppSelector } from "@/hooks/use-app-selector";
import { ErrorBoundary } from "react-error-boundary";
import { FC, Suspense, memo } from "react";
import BlockWrapper from "./block-wrapper";
import { ErrorFallback } from "../shared/error-fallback";
import EditorBlockWrapper from "./editor-block-wrapper";
import { LicenseManager } from "@/licensing";
import { FiLock } from "react-icons/fi";

export type EditorRenderBlockProps = {
  block: string | Block;
  index: number;
  isEditable: boolean;
  meta?: BlockMeta;
  isDragging?: boolean;
};

export const EditorRenderBlock: FC<EditorRenderBlockProps> = memo((props) => {
  const { block, index, isEditable, meta } = props;

  if (typeof block === "string") {
    return <RenderBlockFromId blockId={block} index={index} isEditable={isEditable} meta={meta} />;
  }

  return <RenderBlock block={block} index={index} isEditable={isEditable} meta={meta} />;
});

type RenderBlockProps = {
  block: Block;
  index: number;
  isEditable?: boolean;
  meta?: BlockMeta;
};

const RenderBlock: FC<RenderBlockProps> = memo(({ block, index, isEditable, meta }) => {
  const blockConfig = BuilderConfiguration.getBlock(block.type);

  if (!blockConfig) {
    return null;
  }

  const { component: Component } = blockConfig;

  const blockProps = generateBlockProps({ block, index, isEditable, meta });

  // Check if the block is premium and if the user can use it
  const isPremium = LicenseManager.isBlockPremium(block.type);
  const canUseBlock = LicenseManager.canUseBlock(block.type);

  // If the block is premium and the user can't use it, show a premium message
  if (isPremium && !canUseBlock) {
    return (
      <div className="rounded-sm border border-dashed border-amber-500 bg-amber-50 px-4 py-4 text-center text-amber-700">
        <div className="flex flex-col items-center justify-center">
          <FiLock size={24} className="mb-2" />
          <p className="font-medium">Premium Block</p>
          <p className="mt-1 text-sm">This {block.type} block requires a premium license</p>
          <button
            className="mt-3 rounded bg-amber-500 px-3 py-1 text-white transition-colors hover:bg-amber-600"
            onClick={() => window.open("https://your-upgrade-url.com", "_blank")}
          >
            Upgrade to Premium
          </button>
        </div>
      </div>
    );
  }

  if (block.type === BlockType.CONTAINER) {
    return (
      <ErrorBoundary fallbackRender={ErrorFallback}>
        <Suspense>
          <Component {...blockProps} />
        </Suspense>
      </ErrorBoundary>
    );
  }

  const Wrapper = isEditable ? EditorBlockWrapper : BlockWrapper;

  return (
    <Suspense>
      <Wrapper
        index={index}
        blockId={block.id}
        parentId={block.parentId}
        blockType={block.type}
        attributes={blockProps.attributes}
      >
        <Component {...blockProps} />
      </Wrapper>
    </Suspense>
  );
});

type RenderBlockFromIdProps = {
  blockId: string;
  index: number;
  isEditable?: boolean;
  meta?: BlockMeta;
};

const RenderBlockFromId = memo(({ blockId, index, isEditable, meta }: RenderBlockFromIdProps) => {
  const block = useAppSelector(getBlock(blockId));

  if (!block) {
    return null;
  }

  return <RenderBlock block={block} index={index} isEditable={isEditable} meta={meta} />;
});

RenderBlockFromId.displayName = "RenderBlockFromId";

export default EditorRenderBlock;
