"use client";
import { useSettings } from "@/hooks/use-settings";
import { getCurrentBreakpoint } from "@/store/selectors";
import { SettingsType } from "@/types";
import { useAppSelector } from "@/hooks/use-app-selector";
import { classNames } from "@/utils";
import { FC, HTMLAttributes } from "react";
import { Label } from "../shared/label";
import { FontSelector } from "../shared/font-selector";

export type FontFamilyControlProps = {
  mode?: string;
  responsive?: boolean;
  type: SettingsType;
  fieldName: string;
  label?: string;
  side?: "top" | "right" | "left" | "bottom";
  align?: "start" | "center" | "end";
  avoidCollisions?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export const FontFamilyControl: FC<FontFamilyControlProps> = ({
  type,
  className,
  label = "Font Family",
  mode,
  responsive = false,
  fieldName,
  side = "bottom",
  align = "center",
  avoidCollisions = true,
}) => {
  const currentBreakpoint = useAppSelector(getCurrentBreakpoint);
  const [fontFamily, setFontFamily] = useSettings<string>(
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
    <div className={classNames("mt-4 flex flex-col gap-1.5", className)}>
      {label && <Label className="flex-1 whitespace-nowrap">{label}</Label>}

      <FontSelector
        value={fontFamily}
        onChange={setFontFamily}
        side={side}
        align={align}
        avoidCollisions={avoidCollisions}
      />
    </div>
  );
};
