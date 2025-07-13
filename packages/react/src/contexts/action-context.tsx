"use client";

import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import useLocalstorage from "@/hooks/use-localstorage";
import { BuilderRightPanelType } from "@/types";
import { getSelectedBlock } from "@/store/selectors";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import toast from "react-hot-toast";
import { useHotkeys } from "react-hotkeys-hook";
import { ActionCreators } from "redux-undo";
import { useContainerSettings } from "../hooks/use-container-settings";
import {
  copyToClipboard,
  duplicateBlock,
  insertFromClipboard,
  removeBlock,
} from "../store/builder-slice";

export type ActionContextType = {
  save: () => void;
  isSaving: boolean;
  duplicate: (blockId: string) => void;
  pasteFromClipboard: ({ blockId }: { blockId: string }) => void;
  getPlatformSpecificCopyShortcut: () => string;
  getPlatformSpecificPasteShortcut: () => string;
  getPlatformSpecificSaveShortcut: () => string;
  isLeftPanelOpen: boolean;
  setIsLeftPanelOpen: Dispatch<SetStateAction<boolean>>;
  activeRightPanel: BuilderRightPanelType | null;
  toggleRightPanel: (panel: BuilderRightPanelType) => void;
  getClipboardData: () => Promise<any>;
  isUndoable: boolean;
  isRedoable: boolean;
  undo: () => void;
  redo: () => void;
};

export const ActionContext = createContext<ActionContextType | undefined>(undefined);

export const ActionProvider = ({ children }: { children: ReactNode }) => {
  const containerSettings = useContainerSettings();
  const selectedBlock = useAppSelector(getSelectedBlock);

  const [isLeftPanelOpen, setIsLeftPanelOpen] = useLocalstorage("eidtor-left-panel-open", true);
  const [activeRightPanel, setActiveRightPanel] = useLocalstorage<BuilderRightPanelType | null>(
    "active-right-panel",
    null
  );

  const dispatch = useAppDispatch();

  const [isSaving, setIsSaving] = useState(false);

  const isUndoable = useAppSelector((state) => state.builder.past.length > 1);
  const isRedoable = useAppSelector((state) => state.builder.future.length > 0);

  const undo = () => {
    if (!isUndoable) return;
    dispatch(ActionCreators.undo());
  };

  const redo = () => {
    if (!isRedoable) return;
    dispatch(ActionCreators.redo());
  };

  const saveTheme = () => {
    console.log("Saving theme");
  };

  const saveModel = async () => {
    console.log("Saving model");
  };

  const save = async () => {
    try {
      setIsSaving(true);
      await saveTheme();
      await saveModel();
      setIsSaving(false);

      toast.success("Saved successfully");
    } catch (e) {
      setIsSaving(false);
      toast.error("Failed to save content.");
    }
  };

  const duplicate = (blockId: string) => {
    dispatch(duplicateBlock({ blockId }));
  };

  // const getClipboardData = async () => {
  //   return navigator.clipboard.readText().then((text) => {
  //     try {
  //       const json = JSON.parse(text);
  //       if (!json || typeof json !== 'object' || !json.id || !json.type || !json.parentId) return null;

  //       return json;
  //     } catch (e) {
  //       return null;
  //     }
  //   });
  // };

  const getClipboardData = async () => {
    if (!navigator.clipboard || !navigator.clipboard.readText) {
      // console.error('Clipboard API is not available');
      return null;
    }

    try {
      const text = await navigator.clipboard.readText();
      const json = JSON.parse(text);
      if (!json || typeof json !== "object" || !json.id || !json.type || !json.parentId) {
        return null;
      }
      return json;
    } catch (e) {
      // console.error('Failed to parse clipboard data:', e);
      return null;
    }
  };

  const pasteFromClipboard = async ({ blockId }: { blockId: string }) => {
    try {
      const data = await getClipboardData();
      if (!data) return;

      dispatch(insertFromClipboard({ blockId, data, containerSettings }));
    } catch (err) {
      // console.log('Failed to read clipboard contents: ', err);
    }
  };

  const getPlatformSpecificCopyShortcut = () => {
    let shortcutKey = "Ctrl+C";
    if (navigator.userAgent && navigator.userAgent.toUpperCase().includes("MAC")) {
      shortcutKey = "⌘+C";
    } else if (navigator.platform && navigator.platform.toUpperCase().includes("MAC")) {
      shortcutKey = "⌘+C";
    }
    return shortcutKey;
  };

  const getPlatformSpecificPasteShortcut = () => {
    let shortcutKey = "Ctrl+V";
    if (navigator.userAgent && navigator.userAgent.toUpperCase().includes("MAC")) {
      shortcutKey = "⌘+V";
    } else if (navigator.platform && navigator.platform.toUpperCase().includes("MAC")) {
      shortcutKey = "⌘+V";
    }
    return shortcutKey;
  };

  const getPlatformSpecificSaveShortcut = (): string => {
    let shortcutKey = "Ctrl+S";
    if (navigator.userAgent && navigator.userAgent.toUpperCase().includes("MAC")) {
      shortcutKey = "⌘+S";
    } else if (navigator.platform && navigator.platform.toUpperCase().includes("MAC")) {
      shortcutKey = "⌘+S";
    }

    return shortcutKey;
  };

  const toggleRightPanel = (panel: BuilderRightPanelType) => {
    if (activeRightPanel === panel) {
      setActiveRightPanel(null);
    } else {
      setActiveRightPanel(panel);
    }
  };

  useHotkeys(["ctrl+s", "meta+s"], (e) => {
    e.preventDefault();
    save();
  });

  useHotkeys(["ctrl+c", "meta+c"], (e) => {
    if (selectedBlock) {
      e.preventDefault();
      dispatch(copyToClipboard({ blockId: selectedBlock.id }));
    }
  });

  useHotkeys(["ctrl+v", "meta+v"], (e) => {
    if (selectedBlock) {
      e.preventDefault();
      pasteFromClipboard({ blockId: selectedBlock.id });
    }
  });

  useHotkeys(["del", "backspace"], () => {
    if (selectedBlock) {
      dispatch(removeBlock(selectedBlock.id));
    }
  });

  useHotkeys(["ctrl+z", "meta+z"], (e) => {
    e.preventDefault();
    undo();
  });
  useHotkeys(["ctrl+shift+z", "meta+shift+z"], (e) => {
    e.preventDefault();
    redo();
  });

  return (
    <ActionContext.Provider
      value={{
        save,
        isSaving,
        duplicate,
        pasteFromClipboard,
        getPlatformSpecificCopyShortcut,
        getPlatformSpecificPasteShortcut,
        getPlatformSpecificSaveShortcut,
        isLeftPanelOpen,
        setIsLeftPanelOpen,
        activeRightPanel,
        toggleRightPanel,
        getClipboardData,
        isUndoable,
        isRedoable,
        undo,
        redo,
      }}
    >
      {children}
    </ActionContext.Provider>
  );
};
