"use client";
import { Label } from "@/components/shared/label";
import { Select } from "@/components/shared/select";
import { useAppSelector } from "@/hooks/use-app-selector";
import { useSettings } from "@/hooks/use-settings";
import { getCurrentBreakpoint } from "@/store/selectors";
import { SettingsType } from "@/types";
import { classNames } from "@/utils";
import { VariantProps, cva } from "class-variance-authority";
import { FC, HTMLAttributes, ReactNode } from "react";
import { createId } from "../../utils";
import { BreakpointSelector } from "../shared/breakpoint-selector";

const controlVariants = cva("flex", {
  variants: {
    direction: {
      row: "flex-row justify-between items-center",
      col: "flex-col",
    },
  },
  defaultVariants: {
    direction: "row",
  },
});

export type SelectOption = {
  value: string;
  content: ReactNode;
};

export type SelectControlProps = {
  options: SelectOption[];
  placeholder?: ReactNode;
  type: SettingsType;
  fieldName: string;
  label: ReactNode;
  responsive?: boolean;
  mode?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
} & HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof controlVariants>;

export const SelectControl: FC<SelectControlProps> = ({
  options,
  fieldName,
  type = SettingsType.BLOCK,
  label,
  className,
  responsive = false,
  mode,
  direction,
  onValueChange,
  defaultValue,
}) => {
  const currentBreakpoint = useAppSelector(getCurrentBreakpoint);
  const [value, setValue] = useSettings<string>(
    responsive && mode
      ? `${fieldName}.${currentBreakpoint}.${mode}`
      : responsive
        ? `${fieldName}.${currentBreakpoint}`
        : mode
          ? `${fieldName}.${mode}`
          : fieldName,
    type
  );

  const autoId = createId();
  return (
    <div className={classNames("mt-4 w-full gap-1.5", controlVariants({ direction, className }))}>
      {label && (
        <Label htmlFor={autoId} className="flex flex-1 items-center gap-1">
          {label} {responsive && <BreakpointSelector />}
        </Label>
      )}

      <Select
        onValueChange={(val) => {
          const value = val === "select" ? "" : val;
          setValue(value);
          onValueChange?.(value);
        }}
        value={value !== undefined && value !== null ? value : defaultValue || "select"}
      >
        <Select.Trigger id={autoId} className="flex-1 bg-white">
          <Select.Value />
        </Select.Trigger>

        <Select.Content>
          <Select.Item value="select" key="clear">
            Select
          </Select.Item>
          {options.map((opt, i) => (
            <Select.Item value={opt.value} key={i}>
              {opt.content}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </div>
  );
};
