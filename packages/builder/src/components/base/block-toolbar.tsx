import { BlockConfiguration } from "@/config/editor.config";
import { useFrame } from "@/hooks/use-frame";
import { removeBlock } from "@/store/builder-slice";
import { BlockToolbarProps } from "@/types/block";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { classNames } from "@/utils";
import * as Popover from "@radix-ui/react-popover";
import { FC, MouseEvent, Suspense, memo } from "react";
import { DragPreviewImage } from "react-dnd";
import { FiMove, FiTrash2 } from "react-icons/fi";
import { IoDuplicateOutline } from "react-icons/io5";
import { EditorContextMenu } from "../shared/editor-context-menu";

type Props = BlockToolbarProps & {
  children?: React.ReactNode;
};

const BlockToolbar: FC<Props> = memo(
  ({ blockId, blockType, isSelected, children, dragRef, previewRef }) => {
    const blockConfig = BlockConfiguration.getBlock(blockType);

    const { document } = useFrame();

    const dispatch = useAppDispatch();

    const remove = (e: MouseEvent) => {
      e.stopPropagation();
      dispatch(removeBlock(blockId));
    };

    if (!document) return null;

    return (
      <Popover.Root open={isSelected}>
        <EditorContextMenu blockId={blockId}>
          <Popover.Trigger asChild>{children}</Popover.Trigger>
        </EditorContextMenu>
        {/* <Popover.Portal> */}
        <Popover.Content
          sideOffset={4}
          side={"top"}
          align="start"
          alignOffset={-1}
          className="p-0 max-w-fit outline-hidden"
          collisionPadding={{ top: 100 }}
          hideWhenDetached
          avoidCollisions
        >
          {blockConfig.toolbar ? (
            <>
              <Suspense fallback={null}>
                <blockConfig.toolbar
                  blockType={blockType}
                  blockId={blockId}
                  isSelected={isSelected}
                  dragRef={dragRef}
                  previewRef={previewRef}
                />
              </Suspense>
            </>
          ) : (
            <>
              {blockConfig.previewImage && (
                <DragPreviewImage
                  connect={previewRef}
                  src={blockConfig.previewImage}
                />
              )}

              <div
                className={classNames(
                  "flex items-center bg-slate-800 px-1 text-slate-300 rounded-sm"
                )}
              >
                {/* Toolbar Controls */}
                <div
                  role="button"
                  className={classNames(
                    "flex cursor-grab! items-center gap-1 text-slate-100 hover:bg-transparent py-1 px-1 hover:text-white"
                  )}
                  // @ts-ignore-disable-next-line
                  ref={dragRef} // TODO: Fix this
                >
                  <FiMove className="rotate-90" />
                  <span className="text-xs">{blockConfig.label}</span>
                </div>
                {/* Duplicate */}
                <div
                  role="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Duplicate block", blockId);
                  }}
                  className="rounded-tr text-slate-100 hover:bg-transparent py-1 hover:text-white mx-1"
                >
                  <IoDuplicateOutline size={16} />
                </div>
                {/* Remove */}
                <div
                  role="button"
                  onClick={remove}
                  className="rounded-tr text-slate-100 hover:bg-transparent py-1 hover:text-white mx-1"
                >
                  <FiTrash2 size={16} />
                </div>
              </div>
            </>
          )}
        </Popover.Content>
        {/* </Popover.Portal> */}
      </Popover.Root>
    );
  }
);

BlockToolbar.displayName = "BlockToolbar";

export default BlockToolbar;
