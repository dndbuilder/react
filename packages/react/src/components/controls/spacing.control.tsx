"use client";

import { Input } from "@/components/shared/input";
import { Label } from "@/components/shared/label";
import { Select } from "@/components/shared/select";
import { Tooltip } from "@/components/shared/tooltip";
import { useSettings } from "@/hooks/use-settings";
import { getCurrentBreakpoint } from "@/store/selectors";
import { SettingsType } from "@/types";
import { PseudoClass, SpacingValue, Unit } from "@/types/style";
import { useAppSelector } from "@/hooks/use-app-selector";
import { classNames } from "@/utils";
import { FC, HTMLAttributes, ReactNode, useEffect, useState } from "react";
import { MdLink, MdLinkOff } from "react-icons/md";
import { BreakpointSelector } from "../shared/breakpoint-selector";
import useDebounce from "@/hooks/use-debounce";

export interface SpacingControlProps extends HTMLAttributes<HTMLDivElement> {
  units?: Unit[];
  min?: number;
  max?: number;
  label?: ReactNode;
  type: SettingsType;
  fieldName: string;
  mode?: string;
  responsive?: boolean;
}

const defaultUnits = [Unit.PX, Unit.PERCENTAGE];

export const SpacingControl: FC<SpacingControlProps> = ({
  className,
  units = defaultUnits,
  min,
  max,
  responsive,
  mode,
  fieldName,
  type,
  label,
  ...props
}) => {
  const currentBreakpoint = useAppSelector(getCurrentBreakpoint);
  const [value, setValue] = useSettings<SpacingValue | undefined>(
    responsive && mode
      ? `${fieldName}.${currentBreakpoint}.${mode}`
      : responsive
        ? `${fieldName}.${currentBreakpoint}`
        : mode
          ? `${fieldName}.${mode}`
          : fieldName,
    type
  );
  const [innerValue, setInnerValue] = useState<SpacingValue | undefined>(
    value ?? {
      top: undefined,
      right: undefined,
      bottom: undefined,
      left: undefined,
      unit: units[0] ?? Unit.PX,
      linked: false,
    }
  );

  const debounceValue = useDebounce(innerValue, 400);

  useEffect(() => {
    if (
      value?.top !== debounceValue?.top ||
      value?.right !== debounceValue?.right ||
      value?.bottom !== debounceValue?.bottom ||
      value?.left !== debounceValue?.left ||
      value?.unit !== debounceValue?.unit ||
      value?.linked !== debounceValue?.linked
    ) {
      setValue(debounceValue);
    }
  }, [debounceValue]);

  useEffect(() => {
    if (
      value?.top !== innerValue?.top ||
      value?.right !== innerValue?.right ||
      value?.bottom !== innerValue?.bottom ||
      value?.left !== innerValue?.left ||
      value?.unit !== innerValue?.unit ||
      value?.linked !== innerValue?.linked
    ) {
      setInnerValue(value);
    }
  }, [value]);

  const handleChange = (val: string, property: keyof Omit<SpacingValue, "linked" | "unit">) => {
    const num = val === "" ? undefined : Number(val);

    if (innerValue?.linked) {
      setInnerValue({
        ...innerValue,
        top: num,
        right: num,
        bottom: num,
        left: num,
        unit: innerValue?.unit ?? units[0],
      });
    } else {
      setInnerValue({
        ...innerValue,
        [property]: num,
        unit: innerValue?.unit ?? units[0],
      });
    }
  };

  const handleLinkedChange = (val: boolean) => {
    if (val) {
      setInnerValue({
        ...innerValue,
        top: innerValue?.top,
        right: innerValue?.top,
        bottom: innerValue?.top,
        left: innerValue?.top,
        linked: val,
        unit: innerValue?.unit ?? units[0],
      });
    } else {
      setInnerValue({
        ...innerValue,
        linked: val,
      });
    }
  };

  const handleUnitChange = (val: Unit) => {
    setInnerValue({ ...innerValue, unit: val });
  };

  return (
    <div className={classNames("mt-4", className)} {...props}>
      {label && (
        <Label className="mb-1.5 flex items-center gap-1">
          {label} {responsive && <BreakpointSelector />}
        </Label>
      )}

      <div className="flex w-full gap-0.5">
        <div>
          <Input
            min={min}
            max={max}
            onChange={(e) => handleChange(e.target.value, "top")}
            value={innerValue?.top ?? ""}
            type="number"
          />
          <p className="mt-0.5 text-center text-[10px] text-slate-400">Top</p>
        </div>
        <div>
          <Input
            min={min}
            max={max}
            onChange={(e) => handleChange(e.target.value, "right")}
            value={innerValue?.right ?? ""}
            type="number"
          />
          <p className="mt-0.5 text-center text-[10px] text-slate-400">Right</p>
        </div>
        <div>
          <Input
            min={min}
            max={max}
            onChange={(e) => handleChange(e.target.value, "bottom")}
            value={innerValue?.bottom ?? ""}
            type="number"
          />
          <p className="mt-0.5 text-center text-[10px] text-slate-400">Bottom</p>
        </div>
        <div>
          <Input
            min={min}
            max={max}
            onChange={(e) => handleChange(e.target.value, "left")}
            value={innerValue?.left ?? ""}
            type="number"
          />
          <p className="mt-0.5 text-center text-[10px] text-slate-400">Left</p>
        </div>
        <div>
          <div
            className={classNames("w-full rounded-sm border border-slate-300", {
              "bg-slate-100": !innerValue?.linked,
            })}
          >
            <Tooltip>
              <Tooltip.Trigger asChild>
                {innerValue?.linked ? (
                  <div
                    onClick={() => handleLinkedChange(false)}
                    className="cursor-pointer rounded-sm px-3 py-[7px] hover:bg-slate-100"
                  >
                    <MdLink className="text-slate-600" />
                  </div>
                ) : (
                  <div
                    onClick={() => handleLinkedChange(true)}
                    className="cursor-pointer rounded-sm px-3 py-[7px] hover:bg-slate-100"
                  >
                    <MdLinkOff className="text-slate-600" />
                  </div>
                )}
              </Tooltip.Trigger>
              <Tooltip.Content>Link values together</Tooltip.Content>
            </Tooltip>
          </div>
          <Select
            value={innerValue?.unit || units[0]}
            onValueChange={(val) => handleUnitChange(val as Unit)}
          >
            <Select.Trigger
              className="mx-auto h-auto w-auto border-none p-0 text-[10px] text-slate-400 hover:text-slate-600 hover:underline focus:underline"
              chevronDown={false}
            >
              <Select.Value placeholder="px" />
            </Select.Trigger>
            <Select.Content alignOffset={-10} sideOffset={-20} className="min-w-[38px] border-0">
              <Select.Group>
                {units.map((unit) => (
                  <Select.Item
                    showCheck={false}
                    value={unit}
                    key={unit}
                    className="flex items-center justify-center py-1.5 ps-2 text-xs"
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
