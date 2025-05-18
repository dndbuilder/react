import Popover from "@/components/shared/popover";
import { getActiveTheme } from "@/store/selectors";
import { setActiveThemeSettings } from "@/store/theme-slice";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import useToast from "@/hooks/use-toast";
import { FC, useCallback, useState } from "react";
import { AiOutlineExport, AiOutlineImport } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { FiSave } from "react-icons/fi";

const ThemeActionDropdown: FC = () => {
  const toast = useToast();
  const theme = useAppSelector(getActiveTheme);
  const dispatch = useAppDispatch();
  const [isSaving, setIsSaving] = useState(false);

  const saveTheme = () => {
    console.log("Saving theme...");
  };

  const save = async () => {
    try {
      setIsSaving(true);
      await saveTheme();
      setIsSaving(false);

      toast({
        type: "success",
        title: "Saved successfully",
        subtitle: "Your changes have been saved.",
        position: "top-right",
      });
    } catch (e) {
      setIsSaving(false);
      toast({
        type: "error",
        title: "Failed to save",
        subtitle: "Something went wrong. Please try again.",
        position: "top-right",
      });
    }
  };

  const exportContent = useCallback(() => {
    const data = JSON.stringify(theme.settings);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `theme-${theme.name.toLowerCase().split(" ").join("-")}-${Date.now()}.json`;
    a.click();

    // toast({
    //   type: 'success',
    //   title: 'Export successfully',
    //   subtitle: 'Your data have been downloaded.',
    // });
  }, [theme.settings]);

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
        if (!parsedContent.color && !parsedContent.typography) {
          toast({
            type: "error",
            title: "Invalid file",
          });
          return;
        }

        dispatch(setActiveThemeSettings(parsedContent));
        toast({
          type: "success",
          title: "Import successfully",
          subtitle: "Your data have been imported.",
        });
      };
    };

    input.click();
  }, []);

  return (
    <div className="flex h-9 bg-dokan-600 rounded-sm text-white divide-x divide-dokan-700 overflow-hidden">
      <button
        className="px-5 h-full grow text-sm flex justify-center items-center gap-2 enabled:hover:bg-dokan-700 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={save}
        disabled={isSaving}
      >
        <FiSave size={16} />
        Save Changes
      </button>
      <Popover modal>
        <Popover.Trigger asChild>
          <button className="px-2.5 h-full enabled:hover:bg-dokan-700">
            <BsThreeDots />
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
              <AiOutlineImport /> Import Settings
            </Popover.Close>

            {/* Export */}
            <Popover.Close
              onClick={exportContent}
              className="flex gap-2 items-center px-4 py-2 enabled:hover:bg-dark-700 text-dark-100 w-full text-sm"
            >
              <AiOutlineExport /> Export Settings
            </Popover.Close>
          </Popover.Content>
        </Popover.Portal>
      </Popover>
    </div>
  );
};

export default ThemeActionDropdown;
