"use client";

import { useBlockSettings } from "@/hooks/use-block-settings";
import { BlockMeta } from "@/types/block";
import { FC, useRef } from "react";
import sanitizeHtml from "sanitize-html";
import { HeadingSettingsType } from "../types";
import ContentEditable, { ContentEditableEvent } from "@/components/shared/content-editable";

const HeadingEditable: FC<{
  settings: HeadingSettingsType;
  id: string;
  meta?: BlockMeta;
}> = ({ id, settings, meta }) => {
  const locale = meta?.locale || "en";

  const [title, setTitle] = useBlockSettings<string>(id, `title.${locale}`);

  const text = useRef<string>("");

  const sanitizeConf = {
    allowedTags: ["div", "span", "br", "p", "strong", "small", "abbr", "sub", "mark", "em"],
  };

  const handleChange = (e: ContentEditableEvent) => {
    const value = e.currentTarget.innerText;
    text.current = value;
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    const value = e.currentTarget.innerText;
    setTitle(sanitizeHtml(value, sanitizeConf));
  };

  const TagName = settings.htmlTag || "h2";

  const defaultTitle = settings.title?.["en"] || "";

  return (
    <ContentEditable
      tagName={TagName}
      onChange={handleChange}
      onBlur={handleBlur}
      html={title || defaultTitle}
      className="heading leading-5 focus-visible:outline-0"
    />
  );
};

export default HeadingEditable;
