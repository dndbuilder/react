import Popover from "@/components/shared/popover";
import Tooltip from "@/components/shared/tooltip";
import { useActionContext } from "@/contexts/action-context";
import { clearContent, setContent } from "@/store/builder-slice";
import { getContent } from "@/store/selectors";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import useToast from "@/hooks/use-toast";
import { singularize } from "@/utils";
import { FC, useCallback } from "react";
import { AiOutlineClear } from "react-icons/ai";
import { CiExport, CiImport } from "react-icons/ci";
import { FiChevronDown, FiSave } from "react-icons/fi";

const ActionDropdown: FC = () => {
  const toast = useToast();
  const content = useAppSelector(getContent);
  const dispatch = useAppDispatch();

  const exportContent = useCallback(() => {
    const data = JSON.stringify(content);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `content-${Date.now()}.json`;
    a.click();

    toast({
      type: "success",
      title: "Export successfully",
      subtitle: "Your data have been downloaded.",
    });
  }, [content]);

  const importContent = useCallback(() => {
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
        const content = readerEvent.target?.result;
        if (!content) {
          return;
        }

        const parsedContent = JSON.parse(content.toString());

        // Validating content
        if (!parsedContent.root?.id || !parsedContent.root?.type) {
          toast({
            type: "error",
            title: "Invalid file",
          });
          return;
        }

        dispatch(setContent(parsedContent));

        toast({
          type: "success",
          title: "Import successfully",
          subtitle: "Your data have been imported.",
        });
      };
    };

    input.click();
  }, []);

  const clearPresentContent = () => {
    dispatch(clearContent());
  };

  const { isSaving, save } = useActionContext();

  return (
    <div className="flex h-9 bg-dokan-600 rounded-sm text-white divide-x divide-dokan-700 overflow-hidden">
      <Tooltip>
        <Tooltip.Trigger asChild>
          <button
            className="px-5 h-full text-sm flex items-center gap-2 enabled:hover:bg-dokan-700 disabled:cursor-not-allowed disabled:opacity-50"
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
          <button className="px-2.5 h-full enabled:hover:bg-dokan-700">
            <FiChevronDown />
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            className="w-[160px] px-0 py-1 overflow-hidden bg-dark-800"
            align="end"
          >
            {/* Import */}
            <Popover.Close
              onClick={importContent}
              className="flex gap-2 items-center px-4 py-2 enabled:hover:bg-dark-700 text-dark-100 w-full text-sm"
            >
              <CiImport /> Import Content
            </Popover.Close>

            {/* Export */}
            <Popover.Close
              onClick={exportContent}
              className="flex gap-2 items-center px-4 py-2 enabled:hover:bg-dark-700 text-dark-100 w-full text-sm"
            >
              <CiExport /> Export Content
            </Popover.Close>

            {/* Clear Content */}
            <Popover.Close
              onClick={clearPresentContent}
              className="flex gap-2 items-center px-4 py-2 enabled:hover:bg-dark-700 text-dark-100 w-full text-sm"
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
