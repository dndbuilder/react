import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { clearContent, setContent } from "@/store/builder-slice";
import { getContent } from "@/store/selectors";
import { Block } from "@/types/block";
import React, { FC, useEffect, useMemo } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CanvasArea from "./canvas-area";
import LeftPanel from "./left-panel";
import RightPanel from "./right-panel";
import { classNames } from "@/utils";

export type EditorProps = {
  content: Record<string, Block>;
  className?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "content" | "className">;

export const Editor: FC<EditorProps> = ({ content, className, ...props }) => {
  const dispatch = useAppDispatch();

  const contentState = useAppSelector(getContent);

  // Memoize the isDirty calculation to prevent recalculating on every render
  const isDirty = useMemo(() => {
    return JSON.stringify(content) !== JSON.stringify(contentState);
  }, [content, contentState]);

  useEffect(() => {
    if (!content) {
      dispatch(clearContent());
      return;
    }

    dispatch(setContent(content));
  }, [content]);

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
        className={classNames(
          "relative flex h-full w-full flex-wrap overflow-hidden",
          className
        )}
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
