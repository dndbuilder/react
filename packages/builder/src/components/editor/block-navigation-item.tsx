import { EditorBlockConfig } from "@/types/block";
import { Suspense, useRef } from "react";
import { useDrag } from "react-dnd";
import { FiGrid } from "react-icons/fi";

type Props = {
  block: EditorBlockConfig;
};

const BlockNavigationItem = ({ block }: Props) => {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: block.type,
      item: {
        type: block.type,
        settings: block.settings,
        advancedSettings: block.advancedSettings,
      },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    []
  );

  const dragRef = useRef<HTMLDivElement>(null);

  drag(dragRef);

  return (
    <div
      ref={dragRef}
      style={{ opacity }}
      className="h-[88px] flex cursor-move flex-col items-center overflow-hidden rounded-sm border border-dark-200 bg-dark-50 py-4 text-dark-800 transition-colors duration-200 hover:border-dokan-500 hover:bg-dokan-50 hover:text-dokan-500"
    >
      <div className="text-[22px] mb-1">
        <Suspense fallback={null}>
          {block.icon ? <block.icon /> : <FiGrid />}
        </Suspense>
      </div>
      <p className="mt-auto text-center text-xs">{block.label}</p>
    </div>
  );
};

export default BlockNavigationItem;
