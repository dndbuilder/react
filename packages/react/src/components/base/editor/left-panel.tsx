"use client";
import CollapseShape from "@/components/icons/collapse-shape";
import { BuilderConfiguration } from "@/config/builder.config";
import { useAction } from "@/hooks";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { unselectBlock } from "@/store/builder-slice";
import { getSelectedBlock } from "@/store/selectors";
import { classNames } from "@/utils";
import { FiChevronLeft } from "react-icons/fi";
import { BlockControlPanel } from "./block-control-panel";
import { BlockNavigation } from "./block-navigation";
import { FC } from "react";

export type LeftPanelProps = React.HTMLAttributes<HTMLDivElement>;

export const LeftPanel: FC<LeftPanelProps> = ({ className, ...props }) => {
  const { isLeftPanelOpen } = useAction();

  const selectedBlock = useAppSelector(getSelectedBlock);

  const dispatch = useAppDispatch();

  const goBack = () => {
    dispatch(unselectBlock());
  };

  return (
    <div
      className={classNames(
        "editor-sidebar absolute z-30 h-full w-[290px] border-r bg-white shadow-sm transition-all duration-300",
        !isLeftPanelOpen ? "left-[-290px]" : "left-0",
        className
      )}
      {...props}
    >
      {/* Header */}
      {selectedBlock && (
        <button
          className="editor-sidebar-header relative flex h-14 w-[290px] items-center justify-center border-b bg-white"
          onClick={goBack}
        >
          <FiChevronLeft size={20} className="absolute left-2 top-1/2 -translate-y-1/2" />
          <span className="text-base font-semibold">
            Edit {BuilderConfiguration.getBlock(selectedBlock.type)?.label}
          </span>
        </button>
      )}
      {/* Body */}
      <div className="relative h-full">
        {selectedBlock ? (
          <BlockControlPanel type={selectedBlock.type} key={selectedBlock.id} />
        ) : (
          <BlockNavigation />
        )}
        <CollapseShape />
      </div>
    </div>
  );
};
