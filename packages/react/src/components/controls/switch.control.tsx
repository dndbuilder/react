"use client";
import { useSettings } from "@/hooks/use-settings";
import { Label } from "@/components/shared/label";
import { Switch } from "@/components/shared/switch";
import { FC, HTMLAttributes } from "react";
import { classNames } from "@/utils";
import { PseudoClass } from "@/types/style";
import { useAppSelector } from "@/hooks/use-app-selector";
import { getCurrentBreakpoint } from "@/store/selectors";
import { BreakpointSelector } from "../shared/breakpoint-selector";
import { SettingsType } from "@/types";

export type SwitchControlProps = {
  type: SettingsType;
  fieldName: string;
  responsive?: boolean;
  mode?: string;
  label: string;
  onCheckedChange?: (value: boolean) => void;
  defaultChecked?: boolean;
  defaultValue?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export const SwitchControl: FC<SwitchControlProps> = ({
  type,
  className,
  onCheckedChange,
  defaultChecked,
  defaultValue,
  fieldName,
  label,
  responsive = false,
  mode,
}) => {
  const currentBreakpoint = useAppSelector(getCurrentBreakpoint);
  const [value, setValue] = useSettings<boolean>(
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
    <Label
      className={classNames(
        "mt-4 flex items-center justify-between text-xs text-gray-800",
        className
      )}
    >
      {label && (
        <div className="flex items-center gap-1">
          {label} {responsive && <BreakpointSelector />}
        </div>
      )}

      <Switch
        checked={value}
        defaultChecked={defaultChecked}
        defaultValue={defaultValue}
        onCheckedChange={(val) => {
          setValue(val);
          onCheckedChange?.(val);
        }}
      />
    </Label>
  );
};
