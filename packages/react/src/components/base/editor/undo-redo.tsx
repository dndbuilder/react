"use client";

import { Tooltip } from "@/components/shared/tooltip";
import { useAction } from "@/hooks/use-action";

import { classNames } from "@/utils";
import { FC } from "react";
import { LuRedo2, LuUndo2 } from "react-icons/lu";

export type UndoRedoProps = React.HTMLAttributes<HTMLDivElement>;

export const UndoRedo: FC<{ className?: string }> = ({ className, ...rest }) => {
  const { undo, redo, isRedoable, isUndoable } = useAction();

  return (
    <div
      className={classNames(
        "flex h-10 items-center rounded-sm px-2 text-lg ring-1 ring-inset ring-gray-300 transition-colors duration-150 hover:bg-gray-100 hover:ring-gray-600",
        className
      )}
      {...rest}
    >
      {/* Undo */}
      <Tooltip>
        <Tooltip.Trigger
          type="button"
          className="p-2 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={undo}
          disabled={!isUndoable}
        >
          <LuUndo2 size={20} />
        </Tooltip.Trigger>
        <Tooltip.Content>Undo - Ctrl/Cmd+Z</Tooltip.Content>
      </Tooltip>

      {/* Redo */}
      <Tooltip>
        <Tooltip.Trigger
          type="button"
          className="p-2 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={redo}
          disabled={!isRedoable}
        >
          <LuRedo2 size={20} />
        </Tooltip.Trigger>
        <Tooltip.Content>Redo - Ctrl/Cmd+Shift+Z</Tooltip.Content>
      </Tooltip>
    </div>
  );
};
