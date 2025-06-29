import BlockPlaceholder from "@/components/base/block-placeholder";
import EditorRenderBlock from "@/components/base/editor-render-block";
import { BuilderConfiguration } from "@/config/builder.config";
import { useBlockSettings } from "@/hooks/use-block-settings";
import { useContainerSettings } from "@/hooks/use-container-settings";
import {
  addBlocks,
  moveBlock,
  selectBlock,
  setBlockAdvancedSettingsValueByKey,
  setBlockSettingsValueByKey,
} from "@/store/builder-slice";
import { getIsBlockSelected } from "@/store/selectors";
import { Direction } from "@/types";
import { Position } from "@/types/style";
import { Block, BlockMeta, BlockProps, BlockType } from "@/types/block";
import { FlexDirection, Unit } from "@/types/style";
import { createBlock } from "@/utils";
import { isDropableBlock, isMoveableBlock } from "@/utils/guard";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { classNames } from "@/utils";
import { FC, MouseEvent, memo, useRef, useState } from "react";
import { DragPreviewImage, XYCoord, useDrag, useDrop } from "react-dnd";
import { BiPlus } from "react-icons/bi";
import ContainerConfig from "../container.config";
import { ContainerSettingsType } from "../types";
import ContainerResizer from "./container-resizer";
import ContainerSpacer from "./container-spacer";
import ContainerToolbar from "./container-toolbar";

const ContainerDndHandler: FC<BlockProps<ContainerSettingsType>> = ({
  id,
  type,
  parentId,
  index,
  attributes,
  children,
  meta,
  isEditable,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const innerRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const isInner = parentId !== "root";

  const isSelected = useAppSelector(getIsBlockSelected(id));

  const [flexDirection] = useBlockSettings<FlexDirection | undefined>(
    parentId,
    "flexDirection.{{BREAKPOINT}}"
  );

  const direction =
    flexDirection === FlexDirection.ROW || flexDirection === FlexDirection.ROW_REVERSE
      ? Direction.HORIZONTAL
      : Direction.VERTICAL;

  const [placeholderPosition, setPlaceholderPosition] = useState<
    Position.TOP | Position.RIGHT | Position.BOTTOM | Position.LEFT | null
  >(null);

  const blockTypes = BuilderConfiguration.getBlockTypes();

  const { settings, advancedSettings } = useContainerSettings();

  const { className, ...restAttributes } = attributes;

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    type,
    item: {
      id,
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
          parentId:
            parentId === "root" && item.type !== BlockType.CONTAINER ? blocks[0].id : parentId,
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

  const [{ isOver: isOverInner }, dropRefInner] = useDrop({
    accept: blockTypes,
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();

      if (didDrop) {
        return;
      }

      if (isDropableBlock(item)) {
        const blocks: Block[] = [];

        const block = createBlock({
          ...item,
          parentId: id,
        });

        blocks.push(block);

        dispatch(
          addBlocks({
            blocks,
            selectedBlockId: block.id,
          })
        );
        return;
      }

      if (isMoveableBlock(item)) {
        dispatch(
          moveBlock({
            sourceId: item.id,
            targetId: id,
            targetIndex: index,
          })
        );
      }
    },
    collect: (monitor) => ({
      isOver:
        monitor.isOver({ shallow: true }) &&
        monitor.canDrop() &&
        (isDropableBlock(monitor.getItem()) || isMoveableBlock(monitor.getItem())),
    }),
  });

  const handleSelect = (e: MouseEvent) => {
    e.stopPropagation();
    dispatch(selectBlock(id));
  };

  const handleResize = (width: number) => {
    dispatch(
      setBlockSettingsValueByKey({
        id,
        values: [
          { key: `width.{{BREAKPOINT}}.value`, value: width },
          { key: `width.{{BREAKPOINT}}.unit`, value: Unit.PERCENTAGE },
        ],
      })
    );
  };

  const handleSpaceChange = (padding: number, position: Position) => {
    dispatch(
      setBlockAdvancedSettingsValueByKey({
        id,
        values: [
          { key: `padding.{{BREAKPOINT}}.${position}`, value: padding },
          { key: `padding.{{BREAKPOINT}}.unit`, value: Unit.PX },
        ],
      })
    );
  };

  dropRef(ref);

  dropRefInner(innerRef);

  return (
    <ContainerToolbar id={id} index={index} isInner={isInner} dragRef={dragRef}>
      <div
        className={classNames(
          id,
          "group relative flex w-full flex-col",
          !isInner &&
            "items-center justify-center after:pointer-events-none after:absolute after:left-0 after:top-0 after:z-10 after:h-full after:w-full after:ring-inset",
          !isInner && isSelected && "after:ring-1  after:ring-inset after:ring-slate-800",
          !isInner &&
            !isSelected &&
            "after:ring-inset hover:after:ring-1 hover:after:ring-slate-800",
          isInner && isSelected && "ring-1 ring-inset ring-slate-800",
          isInner && !isSelected && "ring-inset hover:ring-1 hover:ring-slate-800",
          isOver && placeholderPosition === Position.TOP && "mt-2",
          isOver && placeholderPosition === Position.RIGHT && "me-2",
          isOver && placeholderPosition === Position.BOTTOM && "mb-2",
          isOver && placeholderPosition === Position.LEFT && "ms-2",
          className
        )}
        ref={ref}
        onClick={handleSelect}
        {...restAttributes}
      >
        {isOver && !!placeholderPosition && <BlockPlaceholder position={placeholderPosition} />}

        <div
          className={classNames(
            "content relative mx-auto flex w-full max-w-[1140px]",
            isDragging && "opacity-30 *:pointer-events-none",
            isOverInner && children.length === 0 && "bg-slate-50"
          )}
          ref={innerRef}
        >
          <RenderChildren blocks={children} meta={meta} isEditable={isEditable ?? false} />
        </div>
        {ContainerConfig.previewImage && (
          <DragPreviewImage connect={previewRef} src={ContainerConfig.previewImage} />
        )}
        {isInner && <ContainerResizer containerRef={ref} onChange={handleResize} />}
        {!isInner && isSelected && (
          <>
            <ContainerSpacer
              containerRef={ref}
              position={Position.TOP}
              onChange={handleSpaceChange}
            />
            <ContainerSpacer
              containerRef={ref}
              position={Position.BOTTOM}
              onChange={handleSpaceChange}
            />
          </>
        )}
      </div>
    </ContainerToolbar>
  );
};

type RenderChildrenProps = {
  blocks: (string | Block)[];
  meta?: BlockMeta;
  isEditable: boolean;
};

const RenderChildren: FC<RenderChildrenProps> = memo(({ blocks, meta, isEditable }) => {
  if (!blocks.length) {
    return (
      <div
        className={
          "pointer-events-none flex h-full min-h-[80px] w-full items-center justify-center border border-dashed border-slate-300"
        }
      >
        <BiPlus size={30} className="text-slate-300" />
      </div>
    );
  }

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
});

RenderChildren.displayName = "RenderChildren";

export default ContainerDndHandler;
