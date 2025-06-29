"use client";

import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { BuilderRightPanelType } from "@/store/app-slice";
import { FC, ReactNode, useState } from "react";
import { useFrame } from "@/hooks/use-frame";
import {
  copyToClipboard,
  duplicateBlock,
  removeBlock,
  selectBlock as setSelectedBlock,
} from "@/store/builder-slice";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuPortal,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "./context-menu";
import { useAppSelector } from "@/hooks/use-app-selector";
import { getBlock } from "@/store/selectors";
import { useActionContext } from "@/contexts/action-context";

export type EditorContextMenuProps = {
  blockId: string;
  children: ReactNode;
};

export const EditorContextMenu: FC<EditorContextMenuProps> = ({ blockId, children }) => {
  const dispatch = useAppDispatch();

  const {
    save,
    pasteFromClipboard,
    getPlatformSpecificCopyShortcut,
    getPlatformSpecificPasteShortcut,
    getPlatformSpecificSaveShortcut,
    toggleRightPanel,
    getClipboardData,
  } = useActionContext();
  const { document } = useFrame();
  const [pastable, setPastable] = useState(true);
  const block = useAppSelector(getBlock(blockId));

  const blockType = block?.type;

  return (
    <ContextMenu
      onOpenChange={async (open) => {
        if (open) {
          const data = await getClipboardData();
          setPastable(!!data);
        }
      }}
    >
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuPortal container={document?.body}>
        <ContextMenuContent>
          {blockType !== "root" && (
            <>
              <ContextMenuItem onClick={() => dispatch(setSelectedBlock(blockId))}>
                Edit <span className="ml-1.5 capitalize">{blockType?.split("-")?.join(" ")}</span>
              </ContextMenuItem>
              <ContextMenuItem onClick={() => dispatch(duplicateBlock({ blockId }))}>
                Duplicate
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem onClick={() => dispatch(copyToClipboard({ blockId }))}>
                Copy <ContextMenuShortcut>{getPlatformSpecificCopyShortcut()}</ContextMenuShortcut>
              </ContextMenuItem>
            </>
          )}
          <ContextMenuItem disabled={!pastable} onClick={() => pasteFromClipboard({ blockId })}>
            Paste <ContextMenuShortcut>{getPlatformSpecificPasteShortcut()}</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem
            onClick={() => {
              if (blockType !== "root") {
                dispatch(setSelectedBlock(blockId));
              }
              toggleRightPanel(BuilderRightPanelType.LAYER);
            }}
          >
            Structure
          </ContextMenuItem>
          <ContextMenuItem onClick={save}>
            Save
            <ContextMenuShortcut>{getPlatformSpecificSaveShortcut()}</ContextMenuShortcut>
          </ContextMenuItem>

          {blockType !== "root" && (
            <>
              <ContextMenuItem onClick={() => dispatch(removeBlock(blockId))}>
                Delete
                <ContextMenuShortcut>⌦</ContextMenuShortcut>
              </ContextMenuItem>
            </>
          )}
        </ContextMenuContent>
      </ContextMenuPortal>
    </ContextMenu>
  );
};
