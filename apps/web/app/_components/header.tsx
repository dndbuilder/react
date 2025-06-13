import { useContent } from "@repo/builder/hooks";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { TbDragDrop } from "react-icons/tb";

export const Header = () => {
  const [content] = useContent();

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      // Simulate saving process
      try {
        localStorage.setItem("builder-content", JSON.stringify(content));
        toast.success("Content saved successfully!");
      } catch (error) {
        console.error("Error saving content to localStorage:", error);
      } finally {
        setIsSaving(false);
      }
    }, 1000); // Simulate a delay for saving
  };

  return (
    <header className="h-[60px] fixed top-0 left-0 z-[100] border-b shadow-sm w-full bg-white flex items-center justify-between px-4">
      <div className="text-white font-bold text-xl">
        {/* Placeholder logo */}
        <Link href={"/"} className="flex items-center text-slate-800">
          <TbDragDrop size={32} className="mr-2" />
          <span className="font-bold">DnD Builder</span>
        </Link>
      </div>
      <button
        className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleSave}
        disabled={isSaving}
      >
        {isSaving ? "Saving..." : "Save"}
      </button>
    </header>
  );
};
