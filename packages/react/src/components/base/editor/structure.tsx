"use client";
import { ScrollArea } from "@/components/shared/scroll-area";
import { BuilderConfiguration } from "@/config/builder.config";
import { useAction } from "@/hooks";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { BuilderRightPanelType } from "@/types";
import { duplicateBlock, removeBlock, selectBlock } from "@/store/builder-slice";
import {
  getBlock,
  getContentRoot,
  getIsAnyChildSelected,
  getSelectedBlock,
} from "@/store/selectors";
import { classNames } from "@/utils";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import { BsQuestionCircle } from "react-icons/bs";
import { FiChevronRight, FiLayers, FiTrash2, FiX } from "react-icons/fi";
import { IoDuplicateOutline } from "react-icons/io5";

interface LayterItemProps {
  blockId: string;
  index: number;
}
const StructureItem = ({ blockId, index }: LayterItemProps) => {
  const dispatch = useAppDispatch();

  const block = useAppSelector(getBlock(blockId));

  const config = BuilderConfiguration.getBlock(block.type);

  const selectedblock = useAppSelector(getSelectedBlock);

  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  const isSelected = selectedblock?.id === blockId;

  const isChildSelected = useAppSelector(getIsAnyChildSelected(blockId));

  const toggleCollapse = (e: MouseEvent) => {
    e.stopPropagation();
    setIsCollapsed((prev) => !prev);
  };

  const handleClick = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      if (config) {
        dispatch(selectBlock(blockId));
      }
    },
    [blockId, dispatch]
  );

  const duplicate = (e: MouseEvent) => {
    e.stopPropagation();
    dispatch(duplicateBlock({ blockId }));
  };

  const remove = (e: MouseEvent) => {
    e.stopPropagation();
    dispatch(removeBlock(blockId));
  };

  const handleMouseEnter = () => {
    if (selectedblock?.id === blockId || typeof document === "undefined") return;

    try {
      const iframe = document.querySelector("iframe") as HTMLIFrameElement;
      if (!iframe || !iframe.contentDocument) return;

      const el = iframe.contentDocument.querySelector(
        `[data-block-id="${blockId}"]`
      ) as HTMLElement;

      if (!el) return;

      if (el.classList.contains("after:ring-inset")) {
        el.classList.add("after:ring-1", "after:ring-gray-800");
      } else {
        el.classList.add("ring-1", "ring-gray-800");
      }
    } catch (error) {
      console.error("Error in handleMouseEnter:", error);
    }
  };

  const handleMouseLeave = () => {
    if (selectedblock?.id === blockId || typeof document === "undefined") return;

    try {
      const iframe = document.querySelector("iframe") as HTMLIFrameElement;
      if (!iframe || !iframe.contentDocument) return;

      const el = iframe.contentDocument.querySelector(
        `[data-block-id="${blockId}"]`
      ) as HTMLElement;

      if (!el) return;

      if (el.classList.contains("after:ring-inset")) {
        el.classList.remove("after:ring-1", "after:ring-gray-800");
      } else {
        el.classList.remove("ring-1", "ring-gray-800");
      }
    } catch (error) {
      console.error("Error in handleMouseLeave:", error);
    }
  };

  useEffect(() => {
    if (isChildSelected) {
      setIsCollapsed(false);
    }

    return () => {
      setIsCollapsed(true);
    };
  }, [isChildSelected]);

  return (
    <div
      className={classNames({
        "bg-gray-50": isSelected,
      })}
    >
      {/* // header // */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className={classNames(
          "group flex cursor-pointer items-center py-3 pe-4 transition-colors duration-150",
          isSelected ? "bg-gray-100" : "hover:bg-gray-100"
        )}
        style={{
          paddingInlineStart: index === 1 ? "10px" : `${index * 16}px`,
        }}
      >
        {/* down arrow */}
        <div
          onClick={toggleCollapse}
          className={classNames("me-2 h-full cursor-pointer transition-all duration-200", {
            "rotate-90": !isCollapsed,
            invisible: !block.children.length,
          })}
        >
          <FiChevronRight size={16} />
        </div>

        {/* Title */}
        <div className={classNames("flex w-full items-center gap-1.5 ")}>
          {config?.icon ? <config.icon /> : <BsQuestionCircle />}
          <span>{config?.label ?? "Unsupported Block"}</span>

          <div className="ms-auto hidden items-center gap-2 group-hover:flex">
            {config && (
              <IoDuplicateOutline
                size={14}
                onClick={duplicate}
                className="text-gray-600 hover:text-gray-900"
              />
            )}
            <FiTrash2 size={14} onClick={remove} className="text-gray-600 hover:text-gray-900" />
          </div>
        </div>
      </div>

      {/* Children */}
      {block.children.length > 0 && (
        <div
          className={classNames(
            "grid grid-rows-[0fr] overflow-hidden transition-[grid-template-rows] duration-200",
            {
              "grid-rows-[1fr]": !isCollapsed,
            }
          )}
        >
          <div className={classNames("min-h-0", { "h-auto": !isCollapsed })}>
            {block.children.map(
              (childId) =>
                typeof childId === "string" && (
                  <StructureItem blockId={childId} key={childId} index={index + 1} />
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Structure = () => {
  const root = useAppSelector(getContentRoot);
  const { toggleRightPanel } = useAction();

  return (
    <ScrollArea className="h-[calc(100vh-70px)]">
      <div>
        <div className="flex items-center justify-between gap-2 border-b p-4 text-base font-semibold">
          <div className="flex items-center gap-2">
            <FiLayers />
            Structure
          </div>
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={() => {
              toggleRightPanel(BuilderRightPanelType.LAYER);
            }}
          >
            <FiX size={16} />
          </button>
        </div>

        {root.children.length > 0 ? (
          <div className="divide-y border-b">
            {root.children.map(
              (blockId) =>
                typeof blockId === "string" && (
                  <StructureItem blockId={blockId} key={blockId} index={1} />
                )
            )}
          </div>
        ) : (
          <div className="m-4 rounded-sm p-4 text-center">
            <h4 className="mb-1 text-lg font-medium text-gray-600">No Elements</h4>
            <p className="text-gray-500">Add an element to your page and it will show up here.</p>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default Structure;
