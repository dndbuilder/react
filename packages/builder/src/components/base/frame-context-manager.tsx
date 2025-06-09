import { useFrame } from "@/hooks/use-frame";
import { FC, ReactNode, useEffect } from "react";
import { useDragDropManager } from "react-dnd";

export const FrameContextManager: FC<{ children?: ReactNode }> = ({
  children,
}) => {
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

    // Dynamically load Iconify script in the iframe
    if (frameDocument) {
      const iconifyScript = frameDocument.createElement('script');
      iconifyScript.src = "https://code.iconify.design/iconify-icon/3.0.0/iconify-icon.min.js";
      frameDocument.head.appendChild(iconifyScript);

      // Also load the drawer script if needed
      const drawerScript = frameDocument.createElement('script');
      drawerScript.src = "/scripts/drawer.js";
      drawerScript.defer = true;
      frameDocument.head.appendChild(drawerScript);
    }
  }, [manager, frameDocument, frameWindow]);

  return <>{children}</>;
};
