import { ScrollArea } from "@/components/shared/scroll-area";
import { BlockConfiguration } from "@/config/editor.config";
import { useActionContext } from "@/contexts/action-context";
import {
  duplicateBlock,
  removeBlock,
  selectBlock,
} from "@/store/builder-slice";
import {
  getBlock,
  getContentRoot,
  getIsAnyChildSelected,
  getSelectedBlock,
} from "@/store/selectors";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { BuilderRightPanelType } from "@/store/app-slice";
import { classNames } from "@/utils";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import { BsQuestionCircle } from "react-icons/bs";
import { FiChevronRight, FiLayers, FiTrash2, FiX } from "react-icons/fi";
import { IoDuplicateOutline } from "react-icons/io5";
import { TiWarning, TiWarningOutline } from "react-icons/ti";

interface LayterItemProps {
  blockId: string;
  index: number;
}
const StructureItem = ({ blockId, index }: LayterItemProps) => {
  const dispatch = useAppDispatch();

  const block = useAppSelector(getBlock(blockId));

  const config = BlockConfiguration.getBlock(block.type);

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
    if (selectedblock?.id === blockId) return;
    const iframe = document.querySelector("iframe") as HTMLIFrameElement;
    const el = iframe.contentDocument?.querySelector(
      `[data-block-id="${blockId}"]`
    ) as HTMLElement;
    if (el?.classList.contains("after:ring-inset")) {
      el.classList.add("after:ring-1", "after:ring-dokan-500");
    } else {
      el?.classList.add("ring-1", "ring-dokan-500");
    }
  };

  const handleMouseLeave = () => {
    if (selectedblock?.id === blockId) return;
    const iframe = document.querySelector("iframe") as HTMLIFrameElement;
    const el = iframe.contentDocument?.querySelector(
      `[data-block-id="${blockId}"]`
    ) as HTMLElement;
    if (el?.classList.contains("after:ring-inset")) {
      el.classList.remove("after:ring-1", "after:ring-dokan-500");
    } else {
      el?.classList.remove("ring-1", "ring-dokan-500");
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
        "bg-dark-50": isSelected,
      })}
    >
      {/* // header // */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className={classNames(
          "flex items-center group cursor-pointer py-3 transition-colors duration-150 pe-4",
          isSelected ? "bg-dark-100" : "hover:bg-dark-100"
        )}
        style={{
          paddingInlineStart: index === 1 ? "10px" : `${index * 16}px`,
        }}
      >
        {/* down arrow */}
        <div
          onClick={toggleCollapse}
          className={classNames(
            "cursor-pointer transition-all duration-200 h-full me-2",
            {
              "rotate-90": !isCollapsed,
              invisible: !block.children.length,
            }
          )}
        >
          <FiChevronRight size={16} />
        </div>

        {/* Title */}
        <div className={classNames("flex gap-1.5 w-full items-center ")}>
          {config?.icon ? <config.icon /> : <BsQuestionCircle />}
          <span>{config?.label ?? "Unsupported Block"}</span>

          <div className="ms-auto items-center gap-2 hidden group-hover:flex">
            {config && (
              <IoDuplicateOutline
                size={14}
                onClick={duplicate}
                className="text-dark-600 hover:text-dark-900"
              />
            )}
            <FiTrash2
              size={14}
              onClick={remove}
              className="text-dark-600 hover:text-dark-900"
            />
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
                  <StructureItem
                    blockId={childId}
                    key={childId}
                    index={index + 1}
                  />
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
  const { toggleRightPanel } = useActionContext();

  return (
    <ScrollArea className="h-[calc(100vh-70px)]">
      <div>
        <div className="text-base font-semibold border-b flex items-center justify-between gap-2 p-4">
          <div className="flex items-center gap-2">
            <FiLayers />
            Structure
          </div>
          <button
            className="text-dark-600 hover:text-dark-900"
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
          <div className="text-center m-4 rounded-sm p-4">
            <h4 className="text-lg mb-1 font-medium text-dark-600">
              No Elements
            </h4>
            <p className="text-dark-500">
              Add an element to your page and it will show up here.
            </p>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default Structure;
