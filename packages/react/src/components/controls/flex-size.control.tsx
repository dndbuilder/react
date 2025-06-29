"use client";
import { BreakpointSelector } from "@/components/shared/breakpoint-selector";
import { ToggleGroupControl } from "@/components/controls/toggle-group.control";
import { Input } from "@/components/shared/input";
import { Label } from "@/components/shared/label";
import { useAppSelector } from "@/hooks/use-app-selector";
import { useSettings } from "@/hooks/use-settings";
import { getCurrentBreakpoint } from "@/store/selectors";
import { SettingsType } from "@/types";
import { classNames } from "@/utils";
import { FC, HTMLAttributes } from "react";
import { BiBlock, BiDotsVerticalRounded } from "react-icons/bi";
import { CgArrowAlignH } from "react-icons/cg";
import { MdVerticalAlignCenter } from "react-icons/md";

export interface FlexSizeControlProps extends HTMLAttributes<HTMLDivElement> {
  type: SettingsType;
  fieldName: string;
  growFieldName: string;
  shrinkFieldName: string;
  label?: string;
}

export const FlexSizeControl: FC<FlexSizeControlProps> = ({
  className,
  type,
  fieldName,
  growFieldName,
  shrinkFieldName,
  label = "Size",
}) => {
  const currentBreakpoint = useAppSelector(getCurrentBreakpoint);
  const [flexSize] = useSettings<string | undefined>(`${fieldName}.${currentBreakpoint}`, type);
  const [flexGrow, setFlexGrow] = useSettings<number | undefined>(
    `${growFieldName}.${currentBreakpoint}`,
    type
  );
  const [flexShrink, setFlexShrink] = useSettings<number | undefined>(
    `${shrinkFieldName}.${currentBreakpoint}`,
    type
  );
  return (
    <div className={classNames("mt-5 ", className)}>
      <ToggleGroupControl
        type={type}
        fieldName="flexSize"
        label={label}
        responsive
        controls={[
          {
            tooltipContent: "None",
            toggleTrigger: <BiBlock className="text-sm" />,
            value: "none",
          },
          {
            tooltipContent: "Grow",
            toggleTrigger: <CgArrowAlignH className="text-sm" />,
            value: "grow",
          },
          {
            tooltipContent: "Shrink",
            toggleTrigger: <MdVerticalAlignCenter className="rotate-90 text-sm" />,
            value: "shrink",
          },
          {
            tooltipContent: "Custom",
            toggleTrigger: <BiDotsVerticalRounded className="text-sm" />,
            value: "custom",
          },
        ]}
      />

      <div
        className={classNames(
          "grid grid-rows-[0fr] overflow-hidden transition-[grid-template-rows] duration-200",
          {
            "grid-rows-[1fr]": flexSize === "custom",
          }
        )}
      >
        <div className={classNames("min-h-0", { "h-auto": flexSize === "custom" })}>
          <Label className="mt-3 flex items-center">
            Flex Grow <BreakpointSelector className="ms-1" />
            <Input
              value={flexGrow ?? 0}
              onChange={(e) => {
                setFlexGrow(Number(e.target.value));
              }}
              type="number"
              className="ms-auto w-[60px]"
              min={0}
            />
          </Label>
          <Label className="mt-1 flex items-center">
            Flex Shrink <BreakpointSelector className="ms-1" />
            <Input
              value={flexShrink ?? 0}
              onChange={(e) => {
                setFlexShrink(Number(e.target.value));
              }}
              type="number"
              className="ms-auto w-[60px]"
              min={0}
            />
          </Label>
        </div>
      </div>
    </div>
  );
};
