"use client";

import { BuilderConfiguration } from "@/config/builder.config";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useFrame } from "@/hooks/use-frame";
import { duplicateTab, removeBlock } from "@/store/builder-slice";
import { BlockToolbarProps } from "@/types/block";
import { classNames } from "@/utils";
import { FC, memo, MouseEvent, Suspense } from "react";
import { FiTrash2 } from "react-icons/fi";
import { IoDuplicateOutline } from "react-icons/io5";

const TabsToolbar: FC<BlockToolbarProps> = memo(({ blockId, blockType }) => {
  const blockConfig = BuilderConfiguration.getBlock(blockType);

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
        "flex items-center gap-3 rounded-sm bg-slate-800 px-2 py-1 text-slate-300"
      )}
    >
      <div
        role="button"
        className="flex items-center gap-1 bg-transparent text-slate-100 hover:bg-transparent hover:text-white"
      >
        <Suspense fallback={null}>{blockConfig.icon && <blockConfig.icon />}</Suspense>
        <span className="text-xs">{blockConfig.label}</span>
      </div>
      {/* Duplicate */}
      <div
        role="button"
        onClick={duplicate}
        className="rounded-tr text-slate-100 hover:bg-transparent hover:text-white"
      >
        <IoDuplicateOutline size={16} />
      </div>
      {/* Remove */}
      <div
        role="button"
        onClick={remove}
        className="rounded-tr text-slate-100 hover:bg-transparent hover:text-white"
      >
        <FiTrash2 size={16} />
      </div>
    </div>
  );
});

TabsToolbar.displayName = "TabsToolbar";

export default TabsToolbar;
