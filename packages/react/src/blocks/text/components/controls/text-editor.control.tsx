"use client";

import { BreakpointSelector } from "@/components/shared/breakpoint-selector";
import { Label } from "@/components/shared/label";
import { LanguageSelector } from "@/components/shared/language-selector";
import { TextEditor } from "@/components/shared/text-editor";
import { useFieldName } from "@/hooks/use-field-name";
import { useSettings } from "@/hooks/use-settings";
import { SettingsType } from "@/types";
import { classNames } from "@/utils";
import { FC, HTMLAttributes, LabelHTMLAttributes, useId } from "react";

type Props = {
  label?: string;
  type: SettingsType;
  fieldName: string;
  mode?: string;
  responsive?: boolean;
  isLocalized?: boolean;
  placeholder?: string;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
} & HTMLAttributes<HTMLDivElement>;

const TextEditorContent: FC<Props> = ({
  className,
  label,
  responsive,
  mode,
  isLocalized,
  type,
  fieldName: fieldNameProp,
  labelProps,
  placeholder,
}) => {
  const fieldName = useFieldName({
    key: fieldNameProp,
    responsive,
    mode,
    isLocalized,
  });

  const [text, setText] = useSettings<string>(fieldName, type);

  const autoId = useId();

  return (
    <div className={classNames("mt-4 flex w-full flex-col gap-1.5", className)}>
      {label && (
        <Label htmlFor={autoId} className="flex flex-1 items-center gap-1" {...labelProps}>
          {label} {responsive && <BreakpointSelector />}{" "}
          {isLocalized && <LanguageSelector className="ms-auto" />}
        </Label>
      )}
      <TextEditor
        placeholder={placeholder}
        value={text}
        onChange={setText}
        className="control pb-4"
      />
    </div>
  );
};

export default TextEditorContent;
