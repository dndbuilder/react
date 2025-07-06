import { BlockProps } from "@/types/block";
import { FC } from "react";
import { TextSettingsType } from "../types";

const Text: FC<BlockProps<TextSettingsType>> = ({ settings, meta }) => {
  const locale = meta?.locale || "en";

  const text = settings.text?.[locale] || "";

  return (
    <div
      className="tiptap text ProseMirror prose prose-slate max-w-none p-4"
      dangerouslySetInnerHTML={{
        __html: text.replaceAll(/<p><\/p>/g, '<p><br class="ProseMirror-trailingBreak"></p>'),
      }}
    ></div>
  );
};

export default Text;
