"use client";

import { FC, memo } from "react";
import { AiFillFile, AiOutlinePlus } from "react-icons/ai";
import AddContainer from "./add-container";
import BlockDropzone from "./block-dropzone";
import BlockLibrary from "./block-library";
import { Block } from "@/types/block";

type Props = {
  blockId?: string;
  showBlockLibrary?: boolean;
  className?: string;
  onBlockAdded?: (block: Block) => void;
};

const AddNewSection: FC<Props> = memo(
  ({ blockId, showBlockLibrary = false, className, onBlockAdded }) => {
    return (
      <div className={className}>
        <BlockDropzone blockId={blockId} onBlockAdded={onBlockAdded}>
          <div className={"flex w-36 items-center justify-center gap-3 rounded-full bg-white p-3"}>
            <AddContainer blockId={blockId} onBlockAdded={onBlockAdded}>
              <div
                role="button"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 transition-colors duration-150 hover:bg-slate-900"
                aria-label="Select Container"
              >
                <span className="inline-block rounded-full bg-white p-[3px]">
                  <AiOutlinePlus className="text-slate-800" size={12} />
                </span>
              </div>
            </AddContainer>
            {showBlockLibrary && (
              <BlockLibrary>
                <div
                  role="button"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 hover:bg-slate-900"
                >
                  <AiFillFile size={20} className="text-white" />
                </div>
              </BlockLibrary>
            )}
          </div>
        </BlockDropzone>
      </div>
    );
  }
);

AddNewSection.displayName = "AddNewSection";

export default AddNewSection;
