"use client";

import { BuilderConfiguration } from "@/config/builder.config";
import { useBlockSettings } from "@/hooks/use-block-settings";
import { useContainerSettings } from "@/hooks/use-container-settings";
import { addBlocks, moveBlock, selectBlock as setSelectedBlock } from "@/store/builder-slice";
import { getIsBlockSelected } from "@/store/selectors";
import { Direction } from "@/types";
import { Position } from "@/types/style";
import { Block, BlockType } from "@/types/block";
import { FlexDirection } from "@/types/style";
import { createBlock } from "@/utils";
import { isDropableBlock, isMoveableBlock } from "@/utils/guard";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { classNames } from "@/utils";
import { FC, MouseEventHandler, useRef, useState } from "react";
import { XYCoord, useDrag, useDrop } from "react-dnd";
import BlockPlaceholder from "./block-placeholder";
import BlockToolbar from "./block-toolbar";

type Props = {
  blockId: string;
  blockType: string;
  index: number;
  parentId: string;
  attributes: Record<string, string>;
  children: React.ReactNode;
};

const EditorBlockWrapper: FC<Props> = ({
  blockId,
  index,
  blockType,
  parentId,
  attributes,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const { className, ...restAttributes } = attributes;

  const blockTypes = BuilderConfiguration.getBlockTypes();

  const isSelected = useAppSelector(getIsBlockSelected(blockId));

  const [parentFlexDirection] = useBlockSettings<FlexDirection>(
    parentId,
    "flexDirection.{{BREAKPOINT}}"
  );

  const { settings, advancedSettings } = useContainerSettings();

  const direction =
    parentFlexDirection === FlexDirection.ROW || parentFlexDirection === FlexDirection.ROW_REVERSE
      ? Direction.HORIZONTAL
      : Direction.VERTICAL;

  const [placeholderPosition, setPlaceholderPosition] = useState<
    Position.TOP | Position.RIGHT | Position.BOTTOM | Position.LEFT | null
  >(null);

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    type: blockType,
    item: {
      id: blockId,
      index,
      parentId,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, dropRef] = useDrop({
    accept: blockTypes,
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }

      if (isDropableBlock(item)) {
        const blocks: Block[] = [];

        if (item.type !== BlockType.CONTAINER && parentId === "root") {
          const container = createBlock({
            type: BlockType.CONTAINER,
            parentId: "root",
            settings,
            advancedSettings,
          });

          blocks.push(container);
        }

        const block = createBlock({
          ...item,
          parentId: parentId === "root" ? blocks[0].id : parentId,
        });

        blocks.push(block);

        // Hover on top
        if (placeholderPosition === Position.TOP || placeholderPosition === Position.LEFT) {
          dispatch(addBlocks({ blocks, selectedBlockId: block.id, index }));
        }

        // Hover on bottom
        if (placeholderPosition === Position.BOTTOM || placeholderPosition === Position.RIGHT) {
          dispatch(addBlocks({ blocks, selectedBlockId: block.id, index: index + 1 }));
        }
      }
      if (isMoveableBlock(item)) {
        // Hover on top
        if (placeholderPosition === Position.TOP || placeholderPosition === Position.LEFT) {
          dispatch(
            moveBlock({
              sourceId: item.id,
              targetId: parentId,
              targetIndex: index,
            })
          );
        }
        // Hover on bottom
        if (placeholderPosition === Position.BOTTOM || placeholderPosition === Position.RIGHT) {
          dispatch(
            moveBlock({
              sourceId: item.id,
              targetId: parentId,
              targetIndex: index + 1,
            })
          );
        }
      }
    },
    hover: (item, monitor) => {
      if (!ref.current || !monitor.isOver() || !monitor.canDrop()) {
        return;
      }

      if (isMoveableBlock(item)) {
        const sourceIndex = item.index;
        const targetIndex = index;
        // Don't replace items with themselves
        if (sourceIndex === targetIndex && item.parentId === parentId) {
          return;
        }
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Get horizontal middle
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      // Get pixels to the left
      const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left;
      // Hover on start (top)
      if (direction === Direction.VERTICAL && hoverClientY < hoverMiddleY) {
        setPlaceholderPosition(Position.TOP);
      }
      // Hover on end (right)
      if (direction === Direction.HORIZONTAL && hoverClientX > hoverMiddleX) {
        setPlaceholderPosition(Position.RIGHT);
      }
      // Hover on end (bottom)
      if (direction === Direction.VERTICAL && hoverClientY > hoverMiddleY) {
        setPlaceholderPosition(Position.BOTTOM);
      }
      // Hover on start (left)
      if (direction === Direction.HORIZONTAL && hoverClientX < hoverMiddleX) {
        setPlaceholderPosition(Position.LEFT);
      }
    },
    collect: (monitor) => ({
      isOver:
        monitor.isOver({ shallow: true }) &&
        monitor.canDrop() &&
        (isDropableBlock(monitor.getItem()) || isMoveableBlock(monitor.getItem())),
    }),
  });

  const dispatch = useAppDispatch();

  const handleClick: MouseEventHandler = (e) => {
    e.stopPropagation();
    dispatch(setSelectedBlock(blockId));
  };

  dropRef(ref);

  return (
    <BlockToolbar
      blockId={blockId}
      blockType={blockType}
      isSelected={isSelected}
      dragRef={dragRef}
      previewRef={previewRef}
    >
      <div
        ref={ref}
        id={blockId}
        className={classNames(
          blockId,
          "relative transition-all duration-200 ease-in-out",
          parentId === "root" && "ring-inset",
          isSelected ? "ring-1 ring-slate-800" : "hover:ring-1 hover:ring-slate-800",
          isOver && placeholderPosition === Position.TOP && "mt-2",
          isOver && placeholderPosition === Position.RIGHT && "me-2",
          isOver && placeholderPosition === Position.BOTTOM && "mb-2",
          isOver && placeholderPosition === Position.LEFT && "ms-2",
          isDragging && "opacity-30",
          className
        )}
        onClick={handleClick}
        {...restAttributes}
      >
        {isOver && !!placeholderPosition && <BlockPlaceholder position={placeholderPosition} />}
        {children}
      </div>
    </BlockToolbar>
  );
};

export default EditorBlockWrapper;
