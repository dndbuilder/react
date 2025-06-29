import { useFrame } from "@/hooks/use-frame";
import { Position } from "@/types/style";
import { classNames } from "@/utils";
import { FC, RefObject, useEffect, useRef, useState } from "react";

type ContainerSpacerProps = {
  containerRef: RefObject<HTMLDivElement | null>;
  position: Position.TOP | Position.BOTTOM | Position.LEFT | Position.RIGHT;
  onChange?: (padding: number, position: Position) => void;
};

const paddingDirectionMap = {
  top: "paddingTop",
  bottom: "paddingBottom",
  left: "paddingLeft",
  right: "paddingRight",
} as const;

const positionClassMap = {
  top: "top-0 left-0 h-[8px] w-full cursor-row-resize min-h-[8px]",
  bottom: "bottom-0 left-0 h-[8px] w-full cursor-row-resize min-h-[8px]",
  left: "left-0 top-0 h-full w-[8px] cursor-col-resize min-w-[8px]",
  right: "right-0 top-0 h-full w-[8px] cursor-col-resize min-w-[8px]",
} as const;

const ContainerSpacer: FC<ContainerSpacerProps> = ({ containerRef, position, onChange }) => {
  const { window: frameWindow, document: frameDocument } = useFrame();

  const spacerRef = useRef<HTMLDivElement>(null);

  const [padding, setPadding] = useState<number | null>(null);

  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !spacerRef.current || !frameWindow || !frameDocument) {
      return;
    }

    // Get the resizeable element
    const spaceableElement = containerRef.current;

    // Get the resize handle
    const spacerElement = spacerRef.current;

    // Get resizeable element computed styles
    const styles = frameWindow.getComputedStyle(spaceableElement);

    // Get the padding of the resizeable element in px
    let paddingInPixel = parseInt(styles[paddingDirectionMap[position]], 10);

    // Set padding state
    setPadding(paddingInPixel);

    // Set initial mouse position
    let coordinate = 0;

    const onMouseMove = (event: MouseEvent) => {
      if (position === Position.TOP || position === Position.BOTTOM) {
        // Get the vertical coordinate
        const dy = event.clientY - coordinate;

        // Get the current mouse position
        coordinate = event.clientY;

        // Set the element's new padding in px
        paddingInPixel = paddingInPixel + dy;
      }

      if (position === Position.LEFT || position === Position.RIGHT) {
        // Get the horizontal coordinate
        const dx = event.clientX - coordinate;

        // Get the current mouse position
        coordinate = event.clientX;

        // Set the element's new padding in px
        paddingInPixel = position === Position.LEFT ? paddingInPixel + dx : paddingInPixel - dx;
      }

      // Set the minimum padding
      if (paddingInPixel < 0) {
        paddingInPixel = 0;
      }

      // Set the padding state
      setPadding(Number(paddingInPixel));

      // Set spaceable element padding
      spaceableElement.style[paddingDirectionMap[position]] = `${paddingInPixel}px`;

      // Set spacer element height
      if (position === Position.TOP || position === Position.BOTTOM) {
        spacerElement.style.height = `${paddingInPixel}px`;
      }

      // Set spacer element width
      if (position === Position.LEFT || position === Position.RIGHT) {
        spacerElement.style.width = `${paddingInPixel}px`;
      }

      // Set the isResizing state
      setIsDragging(true);
    };

    const onMouseUp = () => {
      // Remove the style attribute
      spaceableElement.removeAttribute("style");

      // Call the onResizeEnd callback
      onChange?.(Number(paddingInPixel), position);

      // Set the isResizing state
      setIsDragging(false);

      // Remove the listeners
      frameDocument.removeEventListener("mousemove", onMouseMove);
    };

    const onMouseDown = (event: MouseEvent) => {
      // Get the current mouse position
      if (position === Position.TOP || position === Position.BOTTOM) {
        coordinate = event.clientY;
      }

      if (position === Position.LEFT || position === Position.RIGHT) {
        coordinate = event.clientX;
      }

      // Call the onResize callback
      frameDocument.addEventListener("mousemove", onMouseMove);

      // Call the onResizeEnd callback
      frameDocument.addEventListener("mouseup", onMouseUp);
    };

    // Add the listeners
    spacerElement.addEventListener("mousedown", onMouseDown);

    // Add ResizeObserver to the spaceable element
    const resizeObserver = new ResizeObserver((entries) => {
      const target = entries[0].target as HTMLElement;

      const styles = frameWindow.getComputedStyle(target);

      // Get the padding of the resizeable element in px
      paddingInPixel = parseInt(styles[paddingDirectionMap[position]], 10);

      // Set padding state
      setPadding(paddingInPixel);

      // Set spacer element height
      if (position === Position.TOP || position === Position.BOTTOM) {
        spacerElement.style.height = `${paddingInPixel}px`;
      }

      // Set spacer element width
      if (position === Position.LEFT || position === Position.RIGHT) {
        spacerElement.style.width = `${paddingInPixel}px`;
      }
    });

    resizeObserver.observe(spaceableElement);

    return () => {
      // Remove the listeners
      spacerElement.removeEventListener("mousedown", onMouseDown);

      // Remove ResizeObserver
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={spacerRef}
      className={classNames(
        "group/spacer absolute flex items-center justify-center overflow-visible hover:bg-slate-50",
        positionClassMap[position],
        isDragging && "bg-slate-50"
      )}
    >
      <div
        className={classNames(
          "z-50 hidden rounded-sm bg-slate-900 p-1 text-xs leading-none text-white group-hover/spacer:inline-block",
          isDragging && "inline-block"
        )}
        style={{
          userSelect: "none",
        }}
      >{`${padding}px`}</div>
    </div>
  );
};

export default ContainerSpacer;
