import { BlockConfiguration } from "@/config/editor.config";
import { useFrame } from "@/hooks/use-frame";
import { duplicateTab, removeBlock } from "@/store/builder-slice";
import { BlockToolbarProps } from "@/types/block";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { classNames } from "@/utils";
import { FC, memo, MouseEvent, Suspense } from "react";
import { FiTrash2 } from "react-icons/fi";
import { IoDuplicateOutline } from "react-icons/io5";

const TabsToolbar: FC<BlockToolbarProps> = memo(
  ({ blockId, blockType, isSelected }) => {
    const blockConfig = BlockConfiguration.getBlock(blockType);

    const { document } = useFrame();

    const dispatch = useAppDispatch();

    const duplicate = (e: MouseEvent) => {
      e.stopPropagation();
      dispatch(duplicateTab({ blockId }));
    };

    const remove = (e: MouseEvent) => {
      e.stopPropagation();
      dispatch(removeBlock(blockId));
    };

    if (!document) return null;

    return (
      <div
        className={classNames(
          "flex items-center gap-3 bg-dokan-500 px-2 py-1 text-dark-200 rounded-sm"
        )}
      >
        <div
          role="button"
          className="flex items-center gap-1 bg-transparent text-dark-100 hover:bg-transparent hover:text-white"
        >
          <Suspense fallback={null}>
            {blockConfig.icon && <blockConfig.icon />}
          </Suspense>
          <span className="text-xs">{blockConfig.label}</span>
        </div>
        {/* Duplicate */}
        <div
          role="button"
          onClick={duplicate}
          className="rounded-tr text-dark-100 hover:bg-transparent hover:text-white"
        >
          <IoDuplicateOutline size={16} />
        </div>
        {/* Remove */}
        <div
          role="button"
          onClick={remove}
          className="rounded-tr text-dark-100 hover:bg-transparent hover:text-white"
        >
          <FiTrash2 size={16} />
        </div>
      </div>
    );
  }
);

TabsToolbar.displayName = "TabsToolbar";

export default TabsToolbar;
