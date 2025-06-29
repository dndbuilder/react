import { useContent } from "@dnd-page-builder/react/hooks";
import { BreakpointSwitch, Tooltip } from "@dnd-page-builder/react/components";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { TbDragDrop } from "react-icons/tb";
import { LuScanEye } from "react-icons/lu";

export const Header = () => {
  const [content] = useContent();

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Save to API instead of localStorage
      const response = await fetch("/api/builder-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error("Failed to save content");
      }

      toast.success("Content saved successfully!");
    } catch (error) {
      console.error("Error saving content:", error);
      toast.error("Failed to save content");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <header className="fixed left-0 top-0 z-[100] flex h-[60px] w-full items-center justify-between border-b bg-white px-4 shadow-sm">
      <div className="text-xl font-bold text-white">
        {/* Placeholder logo */}
        <Link href={"/"} className="flex items-center text-slate-800">
          <TbDragDrop size={32} className="mr-2" />
          <span className="font-bold">DnD Builder</span>
        </Link>
      </div>

      <BreakpointSwitch />

      <div className="flex items-center space-x-2">
        <Tooltip>
          <Tooltip.Trigger>
            <Link
              href={"/preview"}
              target="_blank"
              className="flex items-center rounded p-2 text-slate-600 ring-1 ring-inset ring-slate-300 transition-colors hover:bg-slate-100 hover:text-slate-800 hover:ring-slate-600"
            >
              <LuScanEye size={20} />
            </Link>
            <Tooltip.Content>Preview</Tooltip.Content>
          </Tooltip.Trigger>
        </Tooltip>

        <button
          className="rounded bg-slate-800 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>
    </header>
  );
};
