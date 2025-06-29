import { Tooltip } from "@/components/shared/tooltip";
import { useFrame } from "@/hooks/use-frame";
import { FC, RefObject, useEffect, useRef, useState } from "react";

type ContainerResizerProps = {
  containerRef: RefObject<HTMLDivElement | null>;
  onChange?: (width: number) => void;
};

const ContainerResizer: FC<ContainerResizerProps> = ({ containerRef, onChange }) => {
  const { window: frameWindow, document: frameDocument } = useFrame();

  const resizeHandleRef = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState<number | null>(null);

  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !resizeHandleRef.current || !frameWindow || !frameDocument) {
      return;
    }

    // Get the resizeable element
    const resizeableElement = containerRef.current;

    // Get the parent element
    const parentElement = resizeableElement.parentElement as HTMLDivElement;

    // Get the resize handle
    const resizeHandle = resizeHandleRef.current;

    // Get resizeable element computed styles
    const styles = frameWindow.getComputedStyle(resizeableElement);

    // Get parent element computed styles
    const parentStyles = frameWindow.getComputedStyle(parentElement);

    // Get the width of the resizeable element in px
    let widthInPixel = parseInt(styles.width, 10);

    // Get the width of the resizeable element in %
    let widthInPercentage = ((widthInPixel / parentElement.offsetWidth) * 100).toFixed(2);

    // Get the width of the parent element in px
    const parentWidthInPixel = parseInt(parentStyles.width, 10);

    // Set initial mouse position
    let xCoordinate = 0;

    const onMouseMove = (event: MouseEvent) => {
      // Get the horizontal coordinate
      const dx = event.clientX - xCoordinate;

      // Get the current mouse position
      xCoordinate = event.clientX;

      // Set the element's new width in px
      widthInPixel = widthInPixel + dx;

      // Set the minimum padding
      if (widthInPixel < 0) {
        widthInPixel = 0;
      }

      // Set the element's new width in %
      widthInPercentage = ((widthInPixel / parentWidthInPixel) * 100).toFixed(2);

      // Set the element's new width in %
      resizeableElement.style.width = `${widthInPercentage}%`;

      // Set the width state
      setWidth(Number(widthInPercentage));

      // Set the isResizing state
      setIsResizing(true);
    };

    const onMouseUp = () => {
      // Remove the style attribute
      resizeableElement.removeAttribute("style");

      // Call the onEnd callback
      onChange?.(Number(widthInPercentage));

      // Set the isResizing state
      setIsResizing(false);

      // Remove the listeners
      frameDocument.removeEventListener("mousemove", onMouseMove);
    };

    const onMouseDown = (event: MouseEvent) => {
      // Get the current mouse position
      xCoordinate = event.clientX;

      // Call the onChange callback
      frameDocument.addEventListener("mousemove", onMouseMove);

      // Call the onEnd callback
      frameDocument.addEventListener("mouseup", onMouseUp);
    };

    // Add the listeners
    resizeHandle.addEventListener("mousedown", onMouseDown);

    return () => {
      // Remove the listeners
      resizeHandle.removeEventListener("mousedown", onMouseDown);
    };
  }, []);

  return (
    <Tooltip open={isResizing}>
      <Tooltip.Trigger asChild>
        <div
          ref={resizeHandleRef}
          className="absolute -right-1 top-0 z-10 h-full w-2 cursor-col-resize bg-transparent"
        ></div>
      </Tooltip.Trigger>
      <Tooltip.Content side="left">{`${width}%`}</Tooltip.Content>
    </Tooltip>
  );
};

export default ContainerResizer;
