"use client";

import { CanvasArea } from "@/components";
import { BuilderConfiguration } from "@/config";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { clearContent, setContent } from "@/store/builder-slice";
import { BuilderConfig } from "@/types";
import { Theme } from "@/types/theme";
import { Block } from "@/types/block";
import { classNames } from "@/utils";
import { FC, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { LeftPanel } from "./left-panel";
import { RightPanel } from "./right-panel";
import { setActiveTheme } from "@/store/theme-slice";

export type EditorProps = {
  content: Record<string, Block>;
  className?: string;
  builderConfig?: BuilderConfig; // Add builderConfig prop
  theme?: Theme;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "content" | "className">;

export const Editor: FC<EditorProps> = ({ content, className, builderConfig, theme, ...props }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!content) {
      dispatch(clearContent());
      return;
    }

    dispatch(setContent(content));
  }, [content]);

  useEffect(() => {
    if (!theme) return;

    // Dispatch an action to set the theme in the store
    dispatch(setActiveTheme(theme));
  }, [dispatch, theme]);

  // Apply custom builder configuration if provided
  useEffect(() => {
    if (builderConfig) {
      BuilderConfiguration.mergeConfig(builderConfig);
    }
  }, [builderConfig]);

  // Call onChange when contentState changes
  // useEffect(() => {
  //   if (onChange && isDirty) {
  //     onChange(contentState);
  //   }
  // }, [contentState, onChange, isDirty]);

  // useEffect(() => {
  //     onChange?.(contentState);
  // }, [contentState]);
  //
  // useEffect(() => {
  //   const handleBeforeUnload = (e: BeforeUnloadEvent) => {
  //     if (isDirty) {
  //       e.preventDefault();
  //       e.returnValue = true;
  //     }
  //   };
  //
  //   window.addEventListener("beforeunload", handleBeforeUnload);
  //
  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, [isDirty]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className={classNames("relative flex h-full w-full flex-wrap overflow-hidden", className)}
        {...props}
      >
        {/* Builder Left Sidebar Panel */}
        <LeftPanel />
        {/* Builder Canvas */}
        <CanvasArea />
        {/* Builder Right Sidebar Panel */}
        <RightPanel />
      </div>

      {/* <script src="https://code.iconify.design/iconify-icon/3.0.0/iconify-icon.min.js"></script> */}
    </DndProvider>
  );
};
