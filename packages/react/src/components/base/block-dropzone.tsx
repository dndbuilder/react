"use client";
import { BuilderConfiguration } from "@/config/builder.config";
import { addBlock, addBlocks } from "@/store/builder-slice";
import { Block, BlockType } from "@/types/block";
import { createBlock } from "@/utils";
import { isDropableBlock } from "@/utils/guard";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { classNames } from "@/utils";
import { FC, ReactNode, useRef } from "react";
import { useDrop } from "react-dnd";

type BlockDropzoneProps = {
  blockId?: string;
  className?: string;
  children?: ReactNode;
  onBlockAdded?: (block: Block) => void;
};

const BlockDropzone: FC<BlockDropzoneProps> = ({
  blockId = "root",
  className,
  children,
  onBlockAdded,
}) => {
  const blockTypes = BuilderConfiguration.getBlockTypes();

  const dispatch = useAppDispatch();

  const ContainerConfig = BuilderConfiguration.getBlock(BlockType.CONTAINER);

  const [{ isOver }, drop] = useDrop({
    accept: blockTypes,
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();

      if (didDrop) {
        return;
      }

      if (!isDropableBlock(item)) {
        return;
      }

      // If the block is not a container
      if (item.type !== BlockType.CONTAINER) {
        const container = createBlock({
          type: BlockType.CONTAINER,
          parentId: blockId,
          settings: ContainerConfig.settings,
          advancedSettings: ContainerConfig.advancedSettings,
        });

        const blocks: Block[] = [container];

        const block = createBlock({
          ...item,
          parentId: container.id,
        });

        blocks.push(block);

        dispatch(
          addBlocks({
            blocks,
            selectedBlockId: block.id,
          })
        );
        onBlockAdded?.(blocks[0]);
        return;
      }

      const block = createBlock({
        ...item,
        parentId: blockId,
      });

      dispatch(addBlock({ block }));
      onBlockAdded?.(block);
    },
    collect: (monitor) => ({
      isOver:
        monitor.isOver({ shallow: true }) &&
        monitor.canDrop() &&
        isDropableBlock(monitor.getItem()),
    }),
  });
  const dropRef = useRef<HTMLDivElement>(null);

  drop(dropRef);

  return (
    <div
      className={classNames(
        "flex w-full justify-center rounded-sm border border-dashed py-6",
        isOver ? "border-slate-800" : "border-slate-300",
        className
      )}
      ref={dropRef}
    >
      {children}
    </div>
  );
};

export default BlockDropzone;
