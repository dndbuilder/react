"use client";

import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { clearContent, setContent } from "@/store/builder-slice";
import { getContent } from "@/store/selectors";
import { Block } from "@/types/block";
import { FC, useEffect, useMemo } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CanvasArea } from "@/components";
import { LeftPanel } from "./left-panel";
import { RightPanel } from "./right-panel";
import { classNames } from "@/utils";
import { BuilderConfiguration } from "@/config";
import { BuilderConfig } from "@/types";

export type EditorProps = {
  content: Record<string, Block>;
  className?: string;
  builderConfig?: BuilderConfig; // Add builderConfig prop
} & Omit<React.HTMLAttributes<HTMLDivElement>, "content" | "className">;

export const Editor: FC<EditorProps> = ({ content, className, builderConfig, ...props }) => {
  const dispatch = useAppDispatch();

  // const contentState = useAppSelector(getContent);

  // Memoize the isDirty calculation to prevent recalculating on every render
  // const isDirty = useMemo(() => {
  //   return JSON.stringify(content) !== JSON.stringify(contentState);
  // }, [content, contentState]);

  useEffect(() => {
    if (!content) {
      dispatch(clearContent());
      return;
    }

    dispatch(setContent(content));
  }, [content]);

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
    </DndProvider>
  );
};
