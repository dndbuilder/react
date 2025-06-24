"use client";
import { Position } from "@/types";
import { FC } from "react";

type BlockPlaceholderProps = {
  position: Position.TOP | Position.RIGHT | Position.BOTTOM | Position.LEFT;
};

const BlockPlaceholder: FC<BlockPlaceholderProps> = ({ position }) => {
  if (position === Position.TOP) {
    return (
      <div className="absolute left-0 top-0 z-20 h-2 w-full -translate-y-full transform bg-slate-100"></div>
    );
  }

  if (position === Position.RIGHT) {
    return (
      <div className="absolute right-0 top-0 z-20 h-full w-2 translate-x-full transform bg-slate-100"></div>
    );
  }

  if (position === Position.BOTTOM) {
    return (
      <div className="absolute bottom-0 left-0 z-20 h-2 w-full translate-y-full transform bg-slate-100"></div>
    );
  }

  if (position === Position.LEFT) {
    return (
      <div className="absolute left-0 top-0 z-20 h-full w-2 -translate-x-full transform bg-slate-100"></div>
    );
  }

  return null;
};

export default BlockPlaceholder;
