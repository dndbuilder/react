"use client";

import { Input } from "@/components/shared/input";
import { Label } from "@/components/shared/label";
import { useSettings } from "@/hooks/use-settings";
import { getCurrentBreakpoint } from "@/store/selectors";
import { SettingsType } from "@/types";
import { createId } from "@/utils";
import { useAppSelector } from "@/hooks/use-app-selector";
import { classNames } from "@/utils";
import { VariantProps, cva } from "class-variance-authority";
import { debounce } from "lodash";
import {
  FC,
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  useEffect,
  useRef,
} from "react";
import { useFieldName } from "@/hooks/use-field-name";
import { BreakpointSelector } from "../shared/breakpoint-selector";
import { LanguageSelector } from "../shared/language-selector";

const controlVariants = cva("", {
  variants: {
    direction: {
      row: "flex-row justify-between items-center",
      col: "flex-col",
    },
  },
  defaultVariants: {
    direction: "col",
  },
});

export type InputControlProps = {
  label?: string;
  type: SettingsType;
  fieldName: string;
  mode?: string;
  responsive?: boolean;
  isLocalized?: boolean;
  placeholder?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  min?: number;
  max?: number;
} & HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof controlVariants>;

export const InputControl: FC<InputControlProps> = ({
  className,
  label,
  responsive,
  mode,
  isLocalized,
  type,
  fieldName: fieldNameProp,
  direction,
  inputProps,
  labelProps,
  placeholder,
  min,
  max,
}) => {
  const currentBreakpoint = useAppSelector(getCurrentBreakpoint);

  const inputRef = useRef<HTMLInputElement>(null);

  const fieldName = useFieldName({
    key: fieldNameProp,
    responsive,
    mode,
    isLocalized,
  });

  const [value, setValue] = useSettings<string | undefined>(fieldName, type);
  const autoId = createId();

  const debouncedValue = debounce((value: string) => {
    setValue(value);
  }, 400);

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = value ?? "";
  }, [currentBreakpoint, value]);

  return (
    <div
      className={classNames("mt-4 flex w-full gap-1.5", controlVariants({ direction, className }))}
    >
      {label && (
        <Label htmlFor={autoId} className="flex w-full flex-1 items-center" {...labelProps}>
          <span>{label}</span>
          {responsive && <BreakpointSelector />}
          {isLocalized && <LanguageSelector className="ms-auto" />}
        </Label>
      )}
      <Input
        ref={inputRef}
        id={autoId}
        className="flex-1 text-[12px]"
        defaultValue={""}
        onChange={(e) => debouncedValue(e.target.value)}
        placeholder={placeholder}
        min={min}
        max={max}
        {...inputProps}
      />
    </div>
  );
};
