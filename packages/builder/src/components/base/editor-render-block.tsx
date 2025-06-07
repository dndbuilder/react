import { BlockConfiguration } from "@/config/editor.config";
import { getBlock } from "@/store/selectors";
import { Block, BlockMeta, BlockType } from "@/types/block";
import { generateBlockProps } from "@/utils/block";
import { useAppSelector } from "@/hooks/use-app-selector";
import { ErrorBoundary } from "react-error-boundary";
import { FC, Suspense, memo } from "react";
import BlockWrapper from "./block-wrapper";
import { ErrorFallback } from "../shared/error-fallback";
import EditorBlockWrapper from "./editor-block-wrapper";

type EditorRenderBlockProps = {
  block: string | Block;
  index: number;
  isEditable: boolean;
  meta: BlockMeta;
  isDragging?: boolean;
};

const EditorRenderBlock: FC<EditorRenderBlockProps> = memo((props) => {
  const { block, index, isEditable, meta } = props;

  if (typeof block === "string") {
    return (
      <RenderBlockFromId
        blockId={block}
        index={index}
        isEditable={isEditable}
        meta={meta}
      />
    );
  }

  return (
    <RenderBlock
      block={block}
      index={index}
      isEditable={isEditable}
      meta={meta}
    />
  );
});

type RenderBlockProps = {
  block: Block;
  index: number;
  isEditable?: boolean;
  meta: BlockMeta;
};

const RenderBlock: FC<RenderBlockProps> = memo(
  ({ block, index, isEditable, meta }) => {
    const blockConfig = BlockConfiguration.getBlock(block.type);

    if (!blockConfig) {
      return null;
    }

    const { component: Component } = blockConfig;

    const blockProps = generateBlockProps({ block, index, isEditable, meta });

    if (block.type === BlockType.CONTAINER) {
      return (
        <ErrorBoundary fallbackRender={ErrorFallback}>
          <Suspense>
            <Component {...blockProps} />
          </Suspense>
        </ErrorBoundary>
      );
    }

    const Wrapper = isEditable ? EditorBlockWrapper : BlockWrapper;

    return (
      <Suspense>
        <Wrapper
          index={index}
          blockId={block.id}
          parentId={block.parentId}
          blockType={block.type}
          attributes={blockProps.attributes}
        >
          <Component {...blockProps} />
        </Wrapper>
      </Suspense>
    );
  }
);

type RenderBlockFromIdProps = {
  blockId: string;
  index: number;
  isEditable?: boolean;
  meta: BlockMeta;
};

const RenderBlockFromId = memo(
  ({ blockId, index, isEditable, meta }: RenderBlockFromIdProps) => {
    const block = useAppSelector(getBlock(blockId));

    if (!block) {
      return null;
    }

    return (
      <RenderBlock
        block={block}
        index={index}
        isEditable={isEditable}
        meta={meta}
      />
    );
  }
);

RenderBlockFromId.displayName = "RenderBlockFromId";

export default EditorRenderBlock;
