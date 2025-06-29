"use client";
import { classNames } from "@/utils";
import { FC } from "react";

type Props = {
  blockId: string;
  attributes: Record<string, string>;
  children: React.ReactNode;
};

const BlockWrapper: FC<Props> = ({ blockId, attributes, children }) => {
  const { className, ...restAttributes } = attributes;

  return (
    <>
      <div className={classNames(blockId, "relative", className)} {...restAttributes}>
        {children}
      </div>
    </>
  );
};

export default BlockWrapper;
