"use client";

import { ToggleGroupControl } from "@/components/controls/toggle-group.control";
import { SettingsType } from "@/types";
import { FC, HtmlHTMLAttributes } from "react";
import { CgPushLeft, CgPushRight } from "react-icons/cg";
import { MdVerticalAlignCenter } from "react-icons/md";

type Props = {
  type: SettingsType;
  fieldName: string;
} & HtmlHTMLAttributes<HTMLDivElement>;

const SlideHorizontalPosition: FC<Props> = ({ type, fieldName, className }) => {
  return (
    <ToggleGroupControl
      type={type}
      fieldName={fieldName}
      label="Horizontal Position"
      className={className}
      defaultValue="center"
      controls={[
        {
          tooltipContent: "Left",
          toggleTrigger: <CgPushLeft className="text-sm" />,
          value: "start",
        },
        {
          tooltipContent: "Center",
          toggleTrigger: <MdVerticalAlignCenter className="rotate-90 text-sm" />,
          value: "center",
        },
        {
          tooltipContent: "Right",
          toggleTrigger: <CgPushRight className="text-sm" />,
          value: "end",
        },
      ]}
    />
  );
};

export default SlideHorizontalPosition;
