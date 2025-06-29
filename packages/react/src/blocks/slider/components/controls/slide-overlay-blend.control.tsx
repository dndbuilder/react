"use client";

import { SelectControl } from "@/components/controls/select.control";
import { useSettings } from "@/hooks/use-settings";
import { SettingsType } from "@/types";
import { FC, HTMLAttributes } from "react";

type Props = {
  type: SettingsType;
  fieldName: string;
  overlayField: string;
} & HTMLAttributes<HTMLDivElement>;

const SlideOverlayBlendControl: FC<Props> = ({ type, fieldName, overlayField, className }) => {
  const [overlay] = useSettings<string | undefined>(overlayField, type);
  return overlay ? (
    <SelectControl
      options={[
        { content: "Normal", value: "" },
        { content: "Screen", value: "screen" },
        { content: "Overlay", value: "overlay" },
        { content: "Darken", value: "darken" },
        { content: "Lighten", value: "lighten" },
        { content: "Color Dodge", value: "color-dodge" },
        { content: "Saturation", value: "saturation" },
        { content: "Color", value: "color" },
        { content: "Difference", value: "difference" },
        { content: "Exclusion", value: "exclusion" },
        { content: "Hue", value: "hue" },
        { content: "Luminosity", value: "luminosity" },
      ]}
      type={type}
      fieldName={fieldName}
      label="Blend Mode"
      className={className}
    />
  ) : null;
};

export default SlideOverlayBlendControl;
