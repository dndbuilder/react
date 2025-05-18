import Tooltip from "@/components/shared/tooltip";
import { useActionContext } from "@/contexts/action-context";
import { classNames } from "@/utils";
import { FC } from "react";
import { LuRedo2, LuUndo2 } from "react-icons/lu";

const UndoRedo: FC<{ className?: string }> = ({ className }) => {
  const { undo, redo, isRedoable, isUndoable } = useActionContext();

  return (
    <div
      className={classNames(
        "flex rounded-sm bg-dark-800 divide-x divide-dark-700 h-10",
        className
      )}
    >
      {/* Undo */}
      <Tooltip>
        <Tooltip.Trigger
          type="button"
          className="px-2.5 text-dark-100 enabled:hover:text-dokan-500 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={undo}
          disabled={!isUndoable}
        >
          <LuUndo2 size={18} />

          <Tooltip.Content>Undo - Ctrl/Cmd+Z</Tooltip.Content>
        </Tooltip.Trigger>
      </Tooltip>

      {/* Redo */}
      <Tooltip>
        <Tooltip.Trigger
          type="button"
          className="px-2.5 text-dark-100 enabled:hover:text-dokan-500 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={redo}
          disabled={!isRedoable}
        >
          <LuRedo2 size={16} />
          <Tooltip.Content>Redo - Ctrl/Cmd+Shift+Z</Tooltip.Content>
        </Tooltip.Trigger>
      </Tooltip>
    </div>
  );
};

export default UndoRedo;
