import { BuilderConfiguration, ThemeConfiguration } from "@/config";
import { BuilderConfig } from "@/types";
import { Block, BlockMeta } from "@/types/block";
import { generateBlockTree } from "@/utils/block";
import { FC } from "react";
import RenderBlock from "./render-block";
import { AssetManager } from "./asset-manager";

export type RenderContentProps = {
  content: Record<string, Block>;
  meta?: BlockMeta;
  builderConfig?: BuilderConfig; // Add builderConfig prop
};

export const RenderContent: FC<RenderContentProps> = ({ content, meta, builderConfig }) => {
  if (builderConfig) {
    BuilderConfiguration.mergeConfig(builderConfig);
  }

  const tree = generateBlockTree("root", content);

  const root = tree["root"];

  if (!root) {
    return null;
  }

  return (
    <>
      <main>
        {root.children.map(
          (block, index) =>
            typeof block !== "string" && (
              <RenderBlock index={index} block={block} key={block.id} meta={meta} />
            )
        )}
      </main>
      <AssetManager content={content} themeSettings={ThemeConfiguration.settings} />
    </>
  );
};

export default RenderContent;
