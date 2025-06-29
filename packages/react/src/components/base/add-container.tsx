"use client";
import { createBlock } from "@/utils";
import { Popover } from "@/components/shared/popover";
import { BuilderConfiguration } from "@/config/builder.config";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { addBlocks } from "@/store/builder-slice";
import { Unit } from "@/types/style";
import { Block, BlockType, BlockConfig } from "@/types/block";
import { Breakpoint } from "@/types/responsive";
import { CSSProperties, FC, ReactNode } from "react";
import { AiOutlineArrowDown, AiOutlineArrowRight } from "react-icons/ai";

type LayoutType = {
  size: number[];
  direction: CSSProperties["flexDirection"];
  content?: ReactNode;
};

const layouts: LayoutType[] = [
  {
    size: [100],
    direction: "column",
    content: <AiOutlineArrowDown size={20} />,
  },
  { size: [100], direction: "row", content: <AiOutlineArrowRight size={20} /> },
  { size: [50, 50], direction: "row" },

  { size: [33.33, 33.33, 33.33], direction: "row" },
  { size: [25, 25, 25, 25], direction: "row" },
  { size: [20, 20, 20, 20, 20], direction: "row" },

  { size: [16.66, 16.66, 16.66, 16.66, 16.66, 16.66], direction: "row" },
  { size: [30, 70], direction: "row" },
  { size: [70, 30], direction: "row" },

  { size: [60, 20, 20], direction: "row" },
  { size: [20, 20, 60], direction: "row" },
  { size: [20, 60, 20], direction: "row" },
];

type AddContainerProps = {
  blockId?: string;
  children: ReactNode;
  position?: number;
  onBlockAdded?: (block: Block) => void;
};

const AddContainer: FC<AddContainerProps> = ({
  blockId = "root",
  children,
  position,
  onBlockAdded,
}) => {
  const dispatch = useAppDispatch();

  const { settings, advancedSettings } = BuilderConfiguration.getBlock(
    BlockType.CONTAINER
  ) as BlockConfig;

  const addContainer = ({ size, direction }: LayoutType) => {
    const parent: Block = createBlock({
      type: BlockType.CONTAINER,
      settings: {
        ...settings,
        width: {
          [Breakpoint.DESKTOP]: {
            unit: Unit.PERCENTAGE,
            value: 100,
          },
        },
        flexDirection: {
          [Breakpoint.DESKTOP]: direction,
        },
      },
      advancedSettings,
      parentId: blockId,
    });

    const children: Block[] = [];

    if (size.length > 1) {
      size.forEach((item) => {
        const child = createBlock({
          type: BlockType.CONTAINER,
          settings: {
            ...settings,
            width: {
              [Breakpoint.DESKTOP]: {
                unit: Unit.PERCENTAGE,
                value: item,
              },
            },
            flexDirection: {
              [Breakpoint.DESKTOP]: direction,
            },
          },
          advancedSettings,
          parentId: parent.id,
        });

        children.push(child);
      });
    }

    dispatch(
      addBlocks({
        blocks: [parent, ...children],
        selectedBlockId: parent.id,
        index: position,
      })
    );

    onBlockAdded?.(parent);
  };

  return (
    <Popover modal>
      <Popover.Trigger asChild>{children}</Popover.Trigger>

      <Popover.Portal container={window.frameDocument?.body || document.body}>
        <Popover.Content
          asChild
          sideOffset={10}
          className="w-[600px] rounded border border-slate-200 border-slate-300 bg-white p-4 shadow-sm"
        >
          <div onClick={(e) => e.stopPropagation()}>
            <div className="grid grid-cols-4 gap-4">
              {layouts.map((layout, index) => (
                <Popover.Close key={index} asChild>
                  <div className={`group flex gap-[2px]`} onClick={() => addContainer(layout)}>
                    {layout.size.map((item, index) => (
                      <div
                        style={{ width: `${item}%` }}
                        className={`flex h-[45px] cursor-pointer items-center justify-center rounded-[2px] bg-slate-200 text-white transition-colors duration-300 group-hover:bg-slate-300`}
                        key={index}
                      >
                        {layout.content}
                      </div>
                    ))}
                  </div>
                </Popover.Close>
              ))}
            </div>
            <Popover.Arrow width={20} height={9} fill="white" />
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
};

export default AddContainer;
