"use client";

import { BlockConfig } from "@/types/block";
import { memo, Suspense, useRef } from "react";
import { useDrag } from "react-dnd";
import { FiGrid, FiLock } from "react-icons/fi";
import { LicenseManager } from "@/licensing";
import { classNames } from "@/utils";

export type BlockNavigationItemProps = {
  block: BlockConfig;
} & React.HTMLAttributes<HTMLDivElement>;

const BlockNavigationItem = memo(({ block, ...props }: BlockNavigationItemProps) => {
  const isPremium = LicenseManager.isBlockPremium(block.type);
  const canUseBlock = LicenseManager.canUseBlock(block.type);

  const [{ opacity }, drag] = useDrag(
    () => ({
      type: block.type,
      item: {
        type: block.type,
        settings: block.settings,
        advancedSettings: block.advancedSettings,
      },
      canDrag: canUseBlock, // Disable dragging for premium blocks if not licensed
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    [canUseBlock]
  );

  const dragRef = useRef<HTMLDivElement>(null);

  // Only enable drag if the block can be used
  if (canUseBlock) {
    drag(dragRef);
  }

  return (
    <div
      ref={dragRef}
      style={{ opacity }}
      className={classNames(
        "relative flex h-[88px] flex-col items-center overflow-hidden rounded-sm bg-gray-50 py-4 text-gray-800 ring-1 ring-gray-300 transition-colors duration-300",
        canUseBlock
          ? "cursor-move hover:border-gray-600 hover:bg-gray-100 hover:text-gray-800 hover:ring-gray-600"
          : "cursor-not-allowed !opacity-70"
      )}
      {...props}
    >
      {isPremium && (
        <div className={classNames("absolute right-1 top-1")}>
          <span
            className={classNames(
              "flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-800"
            )}
          >
            <FiLock className="mr-0.5" size={10} />
            PRO
          </span>
        </div>
      )}
      <div className={classNames("mb-1 text-[22px] text-gray-700")}>
        <Suspense fallback={null}>{block.icon ? <block.icon /> : <FiGrid />}</Suspense>
      </div>
      <p className={classNames("mt-auto text-center text-xs")}>{block.label}</p>
    </div>
  );
});

export default BlockNavigationItem;
