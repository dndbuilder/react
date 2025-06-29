"use client";
import { Popover } from "@/components/shared/popover";
import { Tooltip } from "@/components/shared/tooltip";
import { useActionContext } from "@/contexts/action-context";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { clearContent, setContent } from "@/store/builder-slice";
import { getContent } from "@/store/selectors";
import { FC, useCallback } from "react";
import toast from "react-hot-toast";
import { AiOutlineClear } from "react-icons/ai";
import { CiExport, CiImport } from "react-icons/ci";
import { FiChevronDown, FiSave } from "react-icons/fi";

const ActionDropdown: FC = () => {
  const content = useAppSelector(getContent);
  const dispatch = useAppDispatch();

  const exportContent = useCallback(() => {
    if (typeof document === "undefined") return;

    try {
      const data = JSON.stringify(content);
      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `content-${Date.now()}.json`;
      a.click();

      toast.success("Exported successfully");
    } catch (error) {
      console.error("Error exporting content:", error);
      toast.error("Failed to export content");
    }
  }, [content, toast]);

  const importContent = useCallback(() => {
    if (typeof document === "undefined") return;

    try {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "application/json";

      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) {
          return;
        }

        const reader = new FileReader();
        reader.readAsText(file, "UTF-8");

        reader.onload = (readerEvent) => {
          try {
            const content = readerEvent.target?.result;
            if (!content) {
              return;
            }

            const parsedContent = JSON.parse(content.toString());

            // Validating content
            if (!parsedContent.root?.id || !parsedContent.root?.type) {
              toast.error("Invalid content format");
              return;
            }

            dispatch(setContent(parsedContent));

            toast.success("Content imported successfully");
          } catch (error) {
            console.error("Error parsing imported content:", error);
            toast.error("Failed to parse imported content");
          }
        };
      };

      input.click();
    } catch (error) {
      console.error("Error importing content:", error);
      toast.error("Failed to import content");
    }
  }, [dispatch, toast]);

  const clearPresentContent = () => {
    dispatch(clearContent());
  };

  const { isSaving, save } = useActionContext();

  return (
    <div className="flex h-9 divide-x divide-indigo-700 overflow-hidden rounded-sm bg-slate-900 text-white">
      <Tooltip>
        <Tooltip.Trigger asChild>
          <button
            className="flex h-full items-center gap-2 px-5 text-sm enabled:hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={save}
            disabled={isSaving}
          >
            <FiSave size={16} />
            Save
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content>Save - Ctrl/Cmd+S</Tooltip.Content>
      </Tooltip>
      <Popover modal>
        <Popover.Trigger asChild>
          <button className="h-full px-2.5 enabled:hover:bg-indigo-700">
            <FiChevronDown />
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className="w-[160px] overflow-hidden bg-slate-800 px-0 py-1" align="end">
            {/* Import */}
            <Popover.Close
              onClick={importContent}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-100 enabled:hover:bg-slate-700"
            >
              <CiImport /> Import Content
            </Popover.Close>

            {/* Export */}
            <Popover.Close
              onClick={exportContent}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-100 enabled:hover:bg-slate-700"
            >
              <CiExport /> Export Content
            </Popover.Close>

            {/* Clear Content */}
            <Popover.Close
              onClick={clearPresentContent}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-100 enabled:hover:bg-slate-700"
            >
              <AiOutlineClear /> Clear Content
            </Popover.Close>
          </Popover.Content>
        </Popover.Portal>
      </Popover>
    </div>
  );
};

export default ActionDropdown;
