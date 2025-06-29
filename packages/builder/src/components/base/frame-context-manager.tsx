"use client";
import { useFrame } from "@/hooks/use-frame";
import { FC, ReactNode, useEffect } from "react";
import { useDragDropManager } from "react-dnd";

export const FrameContextManager: FC<{ children?: ReactNode }> = ({ children }) => {
  const manager = useDragDropManager();

  const { window: frameWindow, document: frameDocument } = useFrame();

  useEffect(() => {
    const backend = manager.getBackend();
    (backend as any) /*@typescript-eslint/no-explicit-any */
      .addEventListeners(frameWindow);

    // Set frame window to global
    window.frameWindow = frameWindow;

    // Set frame document to global
    window.frameDocument = frameDocument;
  }, [manager, frameDocument, frameWindow]);

  return <>{children}</>;
};
