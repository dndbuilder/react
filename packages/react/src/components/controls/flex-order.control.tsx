"use client";
import { BreakpointSelector } from "@/components/shared/breakpoint-selector";
import { ToggleGroupControl } from "@/components/controls/toggle-group.control";
import { InfoMessage } from "@/components/shared/info-message";
import { Input } from "@/components/shared/input";
import { Label } from "@/components/shared/label";
import { useAppSelector } from "@/hooks/use-app-selector";
import { useSettings } from "@/hooks/use-settings";
import { getCurrentBreakpoint } from "@/store/selectors";
import { SettingsType } from "@/types";
import { ResponsiveValue } from "@/types/responsive";
import { classNames } from "@/utils";
import { FC, HTMLAttributes } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { RxPinLeft, RxPinRight } from "react-icons/rx";

export type FlexOrderProps = {
  type: SettingsType;
  fieldName: string;
  customFieldName: string;
  label?: string;
} & HTMLAttributes<HTMLDivElement>;

export const FlexOrderControl: FC<FlexOrderProps> = ({
  type,
  className,
  fieldName,
  customFieldName,
  label,
}) => {
  const currentBreakpoint = useAppSelector(getCurrentBreakpoint);
  const [flexOrder] = useSettings<ResponsiveValue>(fieldName, type);
  const [flexOrderCustom, setFlexOrderCustom] = useSettings<ResponsiveValue>(customFieldName, type);
  return (
    <div className={classNames("mt-4", className)}>
      <ToggleGroupControl
        type={type}
        fieldName="flexOrder"
        label={label}
        responsive
        controls={[
          {
            tooltipContent: "Start",
            toggleTrigger: <RxPinLeft className="text-sm" />,
            value: "start",
          },
          {
            tooltipContent: "End",
            toggleTrigger: <RxPinRight className="text-sm" />,
            value: "end",
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
            "grid-rows-[1fr]": flexOrder?.[currentBreakpoint] === "custom",
          }
        )}
      >
        <div
          className={classNames("min-h-0", {
            "h-auto": flexOrder?.[currentBreakpoint] === "custom",
          })}
        >
          <Label className="mt-3 flex items-center">
            Custom Order <BreakpointSelector className="ms-1" />
            <Input
              value={flexOrderCustom?.[currentBreakpoint] ?? 0}
              onChange={(e) =>
                setFlexOrderCustom({
                  ...flexOrderCustom,
                  [currentBreakpoint]: Number(e.target.value),
                })
              }
              type="number"
              className="ms-auto w-[60px]"
              min={0}
            />
          </Label>
        </div>
      </div>

      <InfoMessage>This control will affect contained elements only.</InfoMessage>
    </div>
  );
};
