import RenderBlock from "@/components/base/render-block";
import { BlockProps } from "@/types/block";
import { classNames } from "@/utils";
import { FC } from "react";
import { ContainerSettingsType } from "../types";

const Container: FC<BlockProps<ContainerSettingsType>> = ({ children, meta }) => {
  return (
    <div className={classNames("content relative mx-auto flex w-full max-w-[1140px]")}>
      {children.map(
        (block, index) =>
          typeof block !== "string" && (
            <RenderBlock block={block} index={index} key={block.id} meta={meta} />
          )
      )}
    </div>
  );
};

export default Container;
