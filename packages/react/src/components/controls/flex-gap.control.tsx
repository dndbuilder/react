"use client";

import { BreakpointSelector } from "@/components/shared/breakpoint-selector";
import { Input } from "@/components/shared/input";
import { Label } from "@/components/shared/label";
import { Select } from "@/components/shared/select";
import { Tooltip } from "@/components/shared/tooltip";
import { useAppSelector } from "@/hooks/use-app-selector";
import { useSettings } from "@/hooks/use-settings";
import { getCurrentBreakpoint } from "@/store/selectors";
import { SettingsType } from "@/types";
import { PseudoClass } from "@/types/style";
import { FlexGapType, Unit } from "@/types/style";
import { classNames } from "@/utils";
import { FC, HTMLAttributes, ReactNode } from "react";
import { MdLink, MdLinkOff } from "react-icons/md";

export interface FlexGapsControlProps extends HTMLAttributes<HTMLDivElement> {
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

export const FlexGapControl: FC<FlexGapsControlProps> = ({
  className,
  units = defaultUnits,
  responsive,
  mode,
  type,
  fieldName,
  min,
  max,
  label,
  ...props
}) => {
  const currentBreakpoint = useAppSelector(getCurrentBreakpoint);
  const [value, setValue] = useSettings<FlexGapType | undefined>(
    responsive && mode
      ? `${fieldName}.${currentBreakpoint}.${mode}`
      : responsive
        ? `${fieldName}.${currentBreakpoint}`
        : mode
          ? `${fieldName}.${mode}`
          : fieldName,
    type
  );

  const handleChange = (val: unknown, property: "x" | "y") => {
    if (value?.linked) {
      setValue({
        ...value,
        x: Number(val),
        y: Number(val),
        unit: value?.unit ?? units[0],
      });
    } else {
      setValue({
        ...value,
        [property]: Number(val),
        unit: value?.unit ?? units[0],
      });
    }
  };
  const handleLinkedChange = (val: boolean) => {
    if (val) {
      setValue({
        ...value,
        x: value?.x,
        y: value?.y,
        linked: val,
        unit: value?.unit ?? units[0],
      });
    } else {
      setValue({
        ...value,
        linked: val,
      });
    }
  };

  const handleUnitChange = (val: Unit) => {
    setValue({ ...value, unit: val });
  };

  return (
    <div className={classNames("mt-4", className)} {...props}>
      {label && (
        <Label className="mb-1.5 flex items-center gap-1">
          {label} {responsive && <BreakpointSelector />}
        </Label>
      )}

      <div className={"flex w-full gap-0.5"}>
        <div>
          <Input
            min={min}
            max={max}
            onChange={(e) => handleChange(e.target.value, "y")}
            value={value?.y ?? ""}
            type="number"
            inputMode="numeric"
          />
          <p className="mt-0.5 text-center text-[10px] text-slate-400">Row</p>
        </div>
        <div>
          <Input
            min={min}
            max={max}
            onChange={(e) => handleChange(e.target.value, "x")}
            value={value?.x ?? ""}
            type="number"
            inputMode="numeric"
          />
          <p className="mt-0.5 text-center text-[10px] text-slate-400">Column</p>
        </div>
        <div>
          <div className="w-full rounded-sm border border-slate-300 ">
            <Tooltip>
              <Tooltip.Trigger asChild>
                {value?.linked ? (
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
            value={value?.unit || units[0]}
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
                    className="flex items-center justify-center px-0 py-1.5 text-xs"
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
