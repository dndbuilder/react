"use client";
import { useAppSelector } from "@/hooks/use-app-selector";
import { FC } from "react";
import { CgPushLeft, CgPushRight } from "react-icons/cg";
import { useSettings } from "@/hooks/use-settings";
import { getCurrentBreakpoint } from "@/store/selectors";
import { SettingsType } from "@/types";
import { Unit } from "@/types/style";
import { SelectControl } from "./select.control";
import { SliderUnitControl } from "./slider-unit.control";
import { ToggleGroupControl } from "./toggle-group.control";

export type PositionControlProps = {
  type: SettingsType;
  fieldName?: string;
};

export const PositionControl: FC<PositionControlProps> = ({ type, fieldName = "position" }) => {
  const currentBreakpoint = useAppSelector(getCurrentBreakpoint);
  const [position] = useSettings<"relative" | "absolute" | "fixed" | "sticky" | undefined>(
    `${fieldName}.value.${currentBreakpoint}`,
    type
  );

  return (
    <div>
      <SelectControl
        type={type}
        fieldName={`${fieldName}.value`}
        label="Position"
        responsive
        options={[
          { content: "Relative", value: "relative" },
          { content: "Absolute", value: "absolute" },
          { content: "Fixed", value: "fixed" },
          // { content: 'Sticky', value: 'sticky' },
        ]}
      />
      {position && (
        <div>
          {/* Horizontal position */}
          <ToggleGroupControl
            type={type}
            fieldName={`${fieldName}.horizontal`}
            responsive
            label="Horizontal Position"
            controls={[
              {
                tooltipContent: "Left",
                toggleTrigger: <CgPushLeft className="text-sm" />,
                value: "left",
              },
              {
                tooltipContent: "Right",
                toggleTrigger: <CgPushRight className="text-sm" />,
                value: "right",
              },
            ]}
          />

          {/* Offset */}
          <SliderUnitControl
            type={type}
            fieldName={`${fieldName}.horizontalOffset`}
            label="Offset"
            responsive
            units={[Unit.PX, Unit.REM, Unit.EM, Unit.PERCENTAGE]}
          />

          {/* Vertical */}
          <ToggleGroupControl
            type={type}
            fieldName={`${fieldName}.vertical`}
            responsive
            label="Vertical Position"
            controls={[
              {
                tooltipContent: "Top",
                toggleTrigger: <CgPushLeft className="rotate-90 text-sm" />,
                value: "top",
              },
              {
                tooltipContent: "Bottom",
                toggleTrigger: <CgPushRight className="rotate-90 text-sm" />,
                value: "bottom",
              },
            ]}
          />

          <SliderUnitControl
            type={type}
            fieldName={`${fieldName}.verticalOffset`}
            label="Offset"
            responsive
            units={[Unit.PX, Unit.REM, Unit.EM, Unit.PERCENTAGE]}
          />
        </div>
      )}
    </div>
  );
};
