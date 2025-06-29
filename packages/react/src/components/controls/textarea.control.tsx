"use client";

import { Label } from "@/components/shared/label";
import { Textarea } from "@/components/shared/textarea";
import { useSettings } from "@/hooks/use-settings";
import { SettingsType } from "@/types";
import { classNames } from "@/utils";
import {
  FC,
  HTMLAttributes,
  LabelHTMLAttributes,
  TextareaHTMLAttributes,
  useEffect,
  useRef,
} from "react";
import { createId } from "@/utils";
import { debounce } from "lodash";
import { useFieldName } from "@/hooks/use-field-name";
import { BreakpointSelector } from "../shared/breakpoint-selector";
import { LanguageSelector } from "@/components/shared/language-selector";

export type TextareaControlProps = {
  label?: string;
  type: SettingsType;
  fieldName: string;
  mode?: string;
  responsive?: boolean;
  isLocalized?: boolean;
  inputProps?: TextareaHTMLAttributes<HTMLTextAreaElement>;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
} & HTMLAttributes<HTMLDivElement>;

export const TextareaControl: FC<TextareaControlProps> = ({
  className,
  label,
  type,
  fieldName: fieldNameProps,
  mode,
  responsive,
  isLocalized,
  inputProps,
  labelProps,
}) => {
  const fieldName = useFieldName({
    key: fieldNameProps,
    responsive,
    mode,
    isLocalized,
  });

  const [value, setValue] = useSettings<string | undefined>(fieldName, type);
  const autoId = createId();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const debouncedValue = debounce((value: string) => {
    setValue(value);
  }, 400);

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = value ?? "";
  }, [value]);

  return (
    <div className={classNames("mt-4 grid w-full gap-1.5", className)}>
      {label && (
        <Label htmlFor={autoId} className="flex flex-1 items-center gap-1" {...labelProps}>
          <span>{label}</span>
          {responsive && <BreakpointSelector />}
          {isLocalized && <LanguageSelector className="ms-auto" />}
        </Label>
      )}

      <Textarea
        ref={inputRef}
        id={autoId}
        className="flex-1 text-[12px]"
        defaultValue={""}
        onChange={(e) => debouncedValue(e.target.value)}
        {...inputProps}
      />
    </div>
  );
};
