'use client";';

import { BreakpointSwitch, Tooltip, UndoRedo } from "@dndbuilder.com/react/components";
import { useAction, useContent } from "@dndbuilder.com/react/hooks";
import Link from "next/link";
import { FC, useState } from "react";
import { toast } from "sonner";
import { LuScanEye, LuSettings } from "react-icons/lu";
import { TbDragDrop } from "react-icons/tb";
import { BASE_URL } from "@/lib/constants";
import { useSession } from "next-auth/react";
import { FiLayers } from "react-icons/fi";
import { BuilderRightPanelType } from "@dndbuilder.com/react";

type HeaderProps = {
  pageId?: string;
};

export const Header: FC<HeaderProps> = ({ pageId }) => {
  const [content] = useContent();

  const [isSaving, setIsSaving] = useState(false);

  const { toggleRightPanel } = useAction();

  const { data: session } = useSession();

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (!pageId) {
        // Create new page if pageId is not provided
        const response = await fetch(`${BASE_URL}/pages`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: session?.accessToken ? `Bearer ${session.accessToken}` : "",
          },
          body: JSON.stringify({ name: "home", content }),
        });

        if (!response.ok) {
          throw new Error("Failed to create new page");
        }
      } else {
        // Update existing page
        const response = await fetch(`${BASE_URL}/pages/${pageId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: session?.accessToken ? `Bearer ${session.accessToken}` : "",
          },
          body: JSON.stringify({ content }),
        });

        if (!response.ok) {
          throw new Error("Failed to update page");
        }
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
        <Link href={"/"} className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-gray-900 to-black">
            <TbDragDrop className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">DnD Builder</span>
        </Link>
      </div>

      <div className="flex items-center space-x-2">
        <BreakpointSwitch />
        <UndoRedo />
      </div>

      <div className="flex items-center space-x-2">
        <Tooltip>
          <Tooltip.Trigger asChild>
            <button
              className="flex items-center rounded p-2 text-gray-600 ring-1 ring-inset ring-gray-300 transition-colors hover:bg-gray-100 hover:text-gray-800 hover:ring-gray-600"
              onClick={() => toggleRightPanel(BuilderRightPanelType.LAYER)}
            >
              <FiLayers size={20} />
            </button>
          </Tooltip.Trigger>
          <Tooltip.Content>Layers</Tooltip.Content>
        </Tooltip>

        <Tooltip>
          <Tooltip.Trigger asChild>
            <button
              className="flex items-center rounded p-2 text-gray-600 ring-1 ring-inset ring-gray-300 transition-colors hover:bg-gray-100 hover:text-gray-800 hover:ring-gray-600"
              onClick={() => toggleRightPanel(BuilderRightPanelType.SETTINGS)}
            >
              <LuSettings size={20} />
            </button>
          </Tooltip.Trigger>
          <Tooltip.Content>Settings</Tooltip.Content>
        </Tooltip>

        <Tooltip>
          <Tooltip.Trigger asChild>
            <Link
              href={"/preview"}
              target="_blank"
              className="flex items-center rounded p-2 text-gray-600 ring-1 ring-inset ring-gray-300 transition-colors hover:bg-gray-100 hover:text-gray-800 hover:ring-gray-600"
            >
              <LuScanEye size={20} />
            </Link>
          </Tooltip.Trigger>
          <Tooltip.Content>Preview</Tooltip.Content>
        </Tooltip>

        <button
          className="rounded bg-gray-800 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>
    </header>
  );
};
