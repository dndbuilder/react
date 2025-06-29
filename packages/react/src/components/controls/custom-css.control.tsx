"use client";
import { Label } from "@/components/shared/label";
import { useSettings } from "@/hooks/use-settings";
import { SettingsType } from "@/types";
import Editor from "@monaco-editor/react";
import { debounce } from "lodash";
import { FC, useState } from "react";

type CustomCSSControlProps = {
  label?: string;
  type: SettingsType;
  fieldName: string;
};

export const CustomCSSControl: FC<CustomCSSControlProps> = ({ type, label, fieldName }) => {
  const [customCss, setCustomCSS] = useSettings<string | undefined>(fieldName, type);
  const [errors, setErrors] = useState<any[]>([]);
  let hasError = false;

  const handleChange = debounce((val) => {
    if (!hasError) {
      setCustomCSS(val);
    }
  }, 2000);

  const defaultValue = `selector {
    /* Your custom CSS here */
}`;
  return (
    <div>
      {label && <Label className="mb-1.5">{label}</Label>}

      <div>
        <Editor
          defaultValue={customCss ?? defaultValue}
          onValidate={(markers) => {
            const errors = markers.filter((marker) => marker.code !== "emptyRules");
            hasError = Boolean(errors.length);
            setErrors(errors);
          }}
          onChange={handleChange}
          defaultLanguage="css"
          height="150px"
          options={{
            minimap: { enabled: false },
          }}
          className="rounded border"
        />
      </div>
      <ol className="flex list-decimal flex-col gap-1 px-4 pt-4">
        {errors.map((error, i) => (
          <li key={i} className="text-sm text-red-500">
            {error.message} : End Line Number {error.endLineNumber}
          </li>
        ))}
      </ol>
    </div>
  );
};
