import { Block, BlockMeta } from "@/types/block";
import { generateBlockProps } from "@/utils/block";
import { Suspense } from "react";
import BlockWrapper from "./block-wrapper";
import { BuilderConfiguration } from "@/config";
import { LicenseManager } from "@/licensing";
import { FiLock } from "react-icons/fi";

export type RenderBlockProps = {
  index: number;
  block: Block;
  meta?: BlockMeta;
};

export const RenderBlock = ({ block, index, meta }: RenderBlockProps) => {
  const blockId = block.id;
  const blockProps = generateBlockProps({ block, index, meta });
  const config = BuilderConfiguration.getBlock(block.type);
  const Component = config?.previewComponent || config?.component;

  // Check if the block is premium and if the user can use it
  const isPremium = LicenseManager.isBlockPremium(block.type);
  const canUseBlock = LicenseManager.canUseBlock(block.type);

  if (!Component) {
    return (
      <div className="border-danger-500 text-danger-500 rounded-sm border border-dashed px-4 py-2 text-center">
        <p>Block type &quot;{block.type}&quot; not found</p>
      </div>
    );
  }

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
