import { BlockProps } from "@/types/block";
import { FC } from "react";
import { HeadingSettingsType } from "../types";
import HeadingEditable from "./heading-editable";

const Heading: FC<BlockProps<HeadingSettingsType>> = ({ id, settings, meta, isEditable }) => {
  if (!isEditable) {
    const TagName = settings.htmlTag || "h2";
    const defaultTitle = settings.title?.["en"] || "";
    return <TagName className="heading">{defaultTitle}</TagName>;
  }

  return <HeadingEditable id={id} settings={settings} meta={meta} />;
};

export default Heading;
