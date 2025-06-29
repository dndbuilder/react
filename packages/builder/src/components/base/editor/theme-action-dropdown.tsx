"use client";
import { Popover } from "@/components/shared/popover";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { getActiveTheme } from "@/store/selectors";
import { setActiveThemeSettings } from "@/store/theme-slice";
import { FC, useCallback, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineExport, AiOutlineImport } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { FiSave } from "react-icons/fi";

const ThemeActionDropdown: FC = () => {
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

      toast.success("Theme settings saved successfully");
    } catch (e) {
      setIsSaving(false);
      toast.error("Failed to save theme settings.");
    }
  };

  const exportContent = useCallback(() => {
    if (typeof document === "undefined") return;

    try {
      const data = JSON.stringify(theme.settings);
      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `theme-${theme.name.toLowerCase().split(" ").join("-")}-${Date.now()}.json`;
      a.click();

      toast.success("Theme settings exported successfully");
    } catch (error) {
      console.error("Error exporting theme settings:", error);
      toast.error("Failed to export theme settings");
    }
  }, [theme.settings, theme.name, toast]);

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
            if (!parsedContent.color && !parsedContent.typography) {
              toast.error("Invalid theme settings format");
              return;
            }

            dispatch(setActiveThemeSettings(parsedContent));
            toast.success("Theme settings imported successfully");
          } catch (error) {
            console.error("Error parsing imported theme settings:", error);
            toast.error("Failed to parse imported theme settings");
          }
        };
      };

      input.click();
    } catch (error) {
      console.error("Error importing theme settings:", error);
      toast.error("Failed to import theme settings");
    }
  }, [dispatch, toast]);

  return (
    <div className="flex h-9 divide-x divide-indigo-700 overflow-hidden rounded-sm bg-slate-900 text-white">
      <button
        className="flex h-full grow items-center justify-center gap-2 px-5 text-sm enabled:hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={save}
        disabled={isSaving}
      >
        <FiSave size={16} />
        Save Changes
      </button>
      <Popover modal>
        <Popover.Trigger asChild>
          <button className="h-full px-2.5 enabled:hover:bg-indigo-700">
            <BsThreeDots />
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className="w-[160px] overflow-hidden bg-slate-800 px-0 py-1" align="end">
            {/* Import */}
            <Popover.Close
              onClick={importContent}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-100 enabled:hover:bg-slate-700"
            >
              <AiOutlineImport /> Import Settings
            </Popover.Close>

            {/* Export */}
            <Popover.Close
              onClick={exportContent}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-100 enabled:hover:bg-slate-700"
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
