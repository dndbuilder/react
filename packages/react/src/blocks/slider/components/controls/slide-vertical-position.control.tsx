import { ToggleGroupControl } from "@/components/controls/toggle-group.control";
import { SettingsType } from "@/types";
import { FC, HtmlHTMLAttributes } from "react";
import { CgPushLeft, CgPushRight } from "react-icons/cg";
import { MdVerticalAlignCenter } from "react-icons/md";

type Props = {
  type: SettingsType;
  fieldName: string;
} & HtmlHTMLAttributes<HTMLDivElement>;

const SlideVerticalPosition: FC<Props> = ({ type, fieldName, className }) => {
  return (
    <ToggleGroupControl
      type={type}
      fieldName={fieldName}
      label="Vertical Position"
      className={className}
      defaultValue="center"
      controls={[
        {
          tooltipContent: "Top",
          toggleTrigger: <CgPushLeft className="rotate-90 text-sm" />,
          value: "start",
        },
        {
          tooltipContent: "Middle",
          toggleTrigger: <MdVerticalAlignCenter className="text-sm" />,
          value: "center",
        },
        {
          tooltipContent: "Bottom",
          toggleTrigger: <CgPushRight className="rotate-90 text-sm" />,
          value: "end",
        },
      ]}
    />
  );
};

export default SlideVerticalPosition;
