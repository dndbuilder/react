import { ToggleGroupControl } from "@/components/controls/toggle-group.control";
import { SettingsType } from "@/types";
import { FC, HTMLAttributes, ReactNode } from "react";
import { AiOutlineAlignCenter, AiOutlineAlignLeft, AiOutlineAlignRight } from "react-icons/ai";

type Props = {
  label?: ReactNode;
  type: SettingsType;
  fieldName: string;
} & HTMLAttributes<HTMLDivElement>;

const SlideTextAlignControl: FC<Props> = ({ type, className, label = "Text Align", fieldName }) => {
  return (
    <ToggleGroupControl
      type={type}
      fieldName={fieldName}
      label={label}
      className={className}
      controls={[
        {
          tooltipContent: "Left",
          toggleTrigger: <AiOutlineAlignLeft className="text-sm" />,
          value: "left",
        },
        {
          tooltipContent: "Center",
          toggleTrigger: <AiOutlineAlignCenter className="text-sm" />,
          value: "center",
        },
        {
          tooltipContent: "Right",
          toggleTrigger: <AiOutlineAlignRight className="text-sm" />,
          value: "right",
        },
      ]}
    />
  );
};

export default SlideTextAlignControl;
