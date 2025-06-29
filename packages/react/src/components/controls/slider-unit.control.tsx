"use client";

import { Label } from "@/components/shared/label";
import { RangeSlider } from "@/components/shared/range-slider";
import { Select } from "@/components/shared/select";
import { Tooltip } from "@/components/shared/tooltip";
import { useAppSelector } from "@/hooks/use-app-selector";
import useDebounce from "@/hooks/use-debounce";
import { useSettings } from "@/hooks/use-settings";
import { getCurrentBreakpoint } from "@/store/selectors";
import { SettingsType } from "@/types";
import { Unit, UnitValue } from "@/types/style";
import { classNames } from "@/utils";
import { FC, HTMLAttributes, ReactNode, useEffect, useState } from "react";
import { BreakpointSelector } from "../shared/breakpoint-selector";

export interface SliderControlProps extends HTMLAttributes<HTMLDivElement> {
  step?: number;
  min?: number;
  max?: number;
  units?: Unit[];
  label?: ReactNode;
  type: SettingsType;
  fieldName: string;
  mode?: string;
  responsive?: boolean;
}

const defaultUnits: Unit[] = [Unit.PX, Unit.PERCENTAGE, Unit.REM, Unit.EM];

export const SliderUnitControl: FC<SliderControlProps> = ({
  min,
  max,
  step = 1,
  units = defaultUnits,
  className,
  label,
  type,
  fieldName,
  mode,
  responsive = false,
  ...props
}) => {
  const currentBreakpoint = useAppSelector(getCurrentBreakpoint);
  const [value, setValue] = useSettings<Partial<UnitValue> | undefined>(
    responsive && mode
      ? `${fieldName}.${currentBreakpoint}.${mode}`
      : responsive
        ? `${fieldName}.${currentBreakpoint}`
        : mode
          ? `${fieldName}.${mode}`
          : fieldName,
    type
  );

  const [innerValue, setInnerValue] = useState<Partial<UnitValue> | undefined>(
    value ?? {
      value: undefined,
      unit: units[0] ?? Unit.PX,
    }
  );

  const debounceValue = useDebounce(innerValue, 400);

  useEffect(() => {
    if (value?.value !== debounceValue?.value || value?.unit !== debounceValue?.unit) {
      setValue(debounceValue);
    }
  }, [debounceValue]);

  useEffect(() => {
    if (value?.value !== innerValue?.value || value?.unit !== innerValue?.unit) {
      setInnerValue(value);
    }
  }, [value]);

  const handleValueChange = (val: number | undefined) => {
    setInnerValue({ ...innerValue, value: val });
  };

  const onUnitChange = (val: Unit) => {
    setInnerValue({
      ...innerValue,
      unit: val,
    });
  };

  const minMaxRules = () => {
    const unit = value?.unit || Unit.PX;
    switch (unit) {
      case "px":
        return {
          min: min ?? 0,
          max: max ?? 1600,
        };
      default:
        return {
          min: min ?? 0,
          max: max ?? 100,
        };
    }
  };

  const { min: minimum, max: maximum } = minMaxRules();

  return (
    <div className={classNames("mt-4", className)}>
      {label && (
        <Label className="mb-1.5 flex items-center gap-1">
          {label} {responsive && <BreakpointSelector />}
        </Label>
      )}
      <div className={classNames("flex gap-1.5")} {...props}>
        <RangeSlider
          onValueChange={(val) => handleValueChange(val[0])}
          value={[innerValue?.value ?? 0]}
          step={step}
          max={maximum}
          min={minimum}
        />
        <div
          className={classNames(
            "flex h-7 items-center justify-between rounded-sm border text-slate-800"
          )}
        >
          <Tooltip>
            <Tooltip.Trigger>
              <input
                onChange={(e) =>
                  handleValueChange(e.target.value === "" ? undefined : Number(e.target.value))
                }
                value={innerValue?.value ?? ""}
                className="remove-spinner w-[46px] rounded-sm border-0 bg-transparent p-0 pl-1.5 pt-[3px] text-[11px] leading-3 shadow-none outline-none focus:ring-0"
                type="number"
                min={minimum}
                max={maximum}
                step={step}
              />
            </Tooltip.Trigger>
            {innerValue?.value && innerValue.value > maximum ? (
              <Tooltip.Content>Value must be less than or equel to {maximum}</Tooltip.Content>
            ) : null}
          </Tooltip>

          <Select onValueChange={onUnitChange} value={innerValue?.unit || units[0]}>
            <Select.Trigger
              className="flex h-full w-7 items-center justify-center rounded-none rounded-r border-0 border-l p-0 text-[11px] leading-3 hover:bg-slate-300 focus:ring-0 focus:ring-offset-0"
              chevronDown={false}
            >
              <Select.Value />
            </Select.Trigger>
            <Select.Content alignOffset={-10} sideOffset={-60} className="min-w-[38px] border-0">
              <Select.Group>
                {units.map((unit) => (
                  <Select.Item
                    showCheck={false}
                    value={unit}
                    className="flex items-center justify-center px-0 py-1.5 text-xs"
                    key={unit}
                  >
                    {unit}
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Content>
          </Select>
        </div>
      </div>
    </div>
  );
};
