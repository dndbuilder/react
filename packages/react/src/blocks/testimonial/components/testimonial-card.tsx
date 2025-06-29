import { FC } from "react";
import { TestimonialItemType, TestimonialSettingsType } from "../types";
import { renderPreset } from "../utils";
import { BlockMeta } from "@/types/block";

type Props = {
  data: TestimonialItemType;
  settings: TestimonialSettingsType;
  meta?: BlockMeta;
};

const TestimonialCard: FC<Props> = ({ data, settings, meta }) => {
  return renderPreset(data, settings, meta);
};

export default TestimonialCard;
