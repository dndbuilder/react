import AddContainer from "@/components/base/add-container";
import EditorContextMenu from "@/components/shared/editor-context-menu";
import { duplicateBlock, removeBlock } from "@/store/builder-slice";
import { getIsBlockSelected } from "@/store/selectors";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { classNames } from "@/utils";
import * as Popover from "@radix-ui/react-popover";
import { FC, MouseEvent, memo } from "react";
import { ConnectDragSource } from "react-dnd";
import { FiMove, FiPlusCircle, FiTrash2 } from "react-icons/fi";
import { IoDuplicateOutline } from "react-icons/io5";

type Props = {
  id: string;
  index: number;
  isInner: boolean;
  dragRef: ConnectDragSource;
  children?: React.ReactNode;
};

const ContainerToolbar: FC<Props> = memo(
  ({ id, index, isInner, dragRef, children }) => {
    const isSelected = useAppSelector(getIsBlockSelected(id));

    const dispatch = useAppDispatch();

    const duplicate = (e: MouseEvent) => {
      e.stopPropagation();
      dispatch(duplicateBlock({ blockId: id }));
    };

    const remove = (e: MouseEvent) => {
      e.stopPropagation;
      dispatch(removeBlock(id));
    };

    return (
      <Popover.Root open={isSelected}>
        <EditorContextMenu blockId={id}>
          <Popover.Trigger asChild>{children}</Popover.Trigger>
        </EditorContextMenu>
        <Popover.Portal>
          <Popover.Content
            sideOffset={3}
            side={"top"}
            className="p-0 max-w-fit outline-hidden"
            collisionPadding={{ top: 100 }}
            hideWhenDetached
          >
            <div
              className={classNames(
                "flex items-center rounded-sm justify-between bg-dokan-500 px-1"
              )}
            >
              <>
                <div
                  role="button"
                  className={classNames(
                    "flex cursor-grab! items-center gap-1 text-dark-100 hover:bg-transparent hover:text-white py-1 px-1"
                  )}
                  // @ts-ignore-disable-next-line
                  ref={dragRef} // TODO: Fix this
                >
                  <FiMove className="rotate-90" />
                  <span className="text-xs">Container</span>
                </div>
              </>
              {!isInner && (
                <AddContainer position={index}>
                  <div
                    role="button"
                    className="rounded-tl text-dark-100 hover:bg-transparent py-1 hover:text-white ms-1 me-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiPlusCircle size={16} />
                  </div>
                </AddContainer>
              )}

              <div
                role="button"
                onClick={duplicate}
                className="rounded-tr text-dark-100 hover:bg-transparent py-1 hover:text-white mx-1"
              >
                <IoDuplicateOutline size={16} />
              </div>

              <div
                role="button"
                onClick={remove}
                className="rounded-tr text-dark-100 hover:bg-transparent py-1 hover:text-white mx-1"
              >
                <FiTrash2 size={16} />
              </div>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    );
  }
);

ContainerToolbar.displayName = "ContainerToolbar";

export default ContainerToolbar;
