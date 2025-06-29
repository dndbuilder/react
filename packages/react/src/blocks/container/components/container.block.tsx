"use client";

import { BlockProps } from "@/types/block";
import { FC } from "react";
import { ContainerSettingsType } from "../types";
import ContainerDndHandler from "./container-dnd-handler";
import { classNames } from "@/utils";
import EditorRenderBlock from "@/components/base/editor-render-block";

const Container: FC<BlockProps<ContainerSettingsType>> = (props) => {
  if (props.isEditable) {
    return <ContainerDndHandler {...props} />;
  }

  const isInner = props.parentId !== "root";

  const { className, ...restAttributes } = props.attributes;

  return (
    <div
      className={classNames(
        props.id,
        "group relative flex w-full  flex-col",
        !isInner &&
          "items-center justify-center after:pointer-events-none after:absolute after:left-0 after:top-0 after:z-10 after:h-full after:w-full after:ring-inset",
        className
      )}
      {...restAttributes}
    >
      <div className={classNames("content relative mx-auto flex w-full max-w-[1140px]")}>
        {props.children.map((block, index) => (
          <EditorRenderBlock
            index={index}
            block={block}
            key={typeof block === "string" ? block : block.id}
            meta={props.meta}
            isEditable={props.isEditable ?? false}
          />
        ))}
      </div>
    </div>
  );
};

export default Container;
