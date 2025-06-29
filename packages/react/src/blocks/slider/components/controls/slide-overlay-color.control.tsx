"use client";

import { ColorControl } from "@/components/controls/color.control";
import { useSettings } from "@/hooks/use-settings";
import { SettingsType } from "@/types";
import { classNames } from "@/utils";
import { FC, HTMLAttributes } from "react";

type Props = {
  type: SettingsType;
  fieldName: string;
  overlayField: string;
} & HTMLAttributes<HTMLDivElement>;

const SlideOverlayColorControl: FC<Props> = ({ type, fieldName, overlayField, className }) => {
  const [overlay] = useSettings<string | undefined>(overlayField, type);
  return overlay ? (
    <div className={classNames("mt-4", className)}>
      <ColorControl type={type} label="Color" fieldName={fieldName} />
    </div>
  ) : null;
};

export default SlideOverlayColorControl;
