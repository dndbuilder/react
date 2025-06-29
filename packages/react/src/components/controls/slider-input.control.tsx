"use client";
import { useAppSelector } from "@/hooks/use-app-selector";
import { useSettings } from "@/hooks/use-settings";
import { getCurrentBreakpoint } from "@/store/selectors";
import { PseudoClass } from "@/types/style";
import { FC } from "react";
import { Input } from "@/components/shared/input";
import { Label } from "@/components/shared/label";
import { RangeSlider } from "@/components/shared/range-slider";
import { BreakpointSelector } from "../shared/breakpoint-selector";
import { SettingsType } from "@/types";
import { classNames } from "@/utils";

export type SliderInputControlProps = {
  type: SettingsType;
  fieldName: string;
  label?: string;
  mode?: string;
  responsive?: boolean;
  min?: number;
  max?: number;
  step?: number;
} & React.HTMLAttributes<HTMLDivElement>;

export const SliderInputControl: FC<SliderInputControlProps> = ({
  fieldName,
  type,
  mode,
  label,
  responsive = false,
  min = 0,
  max = 100,
  step = 1,
  className,
}) => {
  const currentBreakpoint = useAppSelector(getCurrentBreakpoint);
  const [value, setValue] = useSettings<number | undefined>(
    responsive && mode
      ? `${fieldName}.${currentBreakpoint}.${mode}`
      : responsive
        ? `${fieldName}.${currentBreakpoint}`
        : mode
          ? `${fieldName}.${mode}`
          : fieldName,
    type
  );

  return (
    <div className={classNames("mt-4", className)}>
      {label && (
        <Label className="mb-1.5 flex items-center gap-1">
          {label} {responsive && <BreakpointSelector />}
        </Label>
      )}
      <div className="flex gap-1.5">
        <RangeSlider
          value={[value ?? 0]}
          onValueChange={(val) => {
            setValue(val[0]);
          }}
          max={max}
          step={step}
          min={min}
        />
        <Input
          type="number"
          value={value ?? ""}
          onChange={(e) => {
            setValue(e.target.value === "" ? undefined : Number(e.target.value));
          }}
          min={min}
          max={max}
          step={step}
          className="w-[60px]"
        />
      </div>
    </div>
  );
};
