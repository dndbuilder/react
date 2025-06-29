"use client";

import { useSettings } from "@/hooks/use-settings";
import { SettingsType } from "@/types";
import { Unit } from "@/types/style";
import { FC, HTMLAttributes } from "react";

import { classNames } from "@/utils";
import { SelectControl } from "@/components/controls/select.control";
import { SpacingControl } from "@/components/controls/spacing.control";
import { ColorControl } from "@/components/controls/color.control";

export type TabsBorderControlProps = {
  fieldName: string;
  mode?: string;
  type: SettingsType;
} & HTMLAttributes<HTMLDivElement>;

export const TabsBorderControl: FC<TabsBorderControlProps> = ({
  fieldName,
  mode,
  type,
  className,
}) => {
  const [borderType] = useSettings<string | undefined>(
    mode ? `${fieldName}.type.${mode}` : `${fieldName}.type`,
    type
  );

  return (
    <div className={classNames(className)}>
      {/* Border Type */}
      <SelectControl
        type={type}
        options={[
          { content: "None", value: "none" },
          { content: "Solid", value: "solid" },
          { content: "Double", value: "double" },
          { content: "Dotted", value: "dotted" },
          { content: "Groove", value: "groove" },
        ]}
        fieldName={`${fieldName}.type`}
        label="Border Type"
        mode={mode}
      />

      {borderType && borderType !== "none" && (
        <>
          <SpacingControl
            type={type}
            fieldName={`${fieldName}.width`}
            label="Border Width"
            mode={mode}
            min={0}
          />

          <ColorControl
            type={type}
            label="Border Color"
            fieldName={`${fieldName}.color`}
            mode={mode}
          />
        </>
      )}

      {/* Border Radius */}
      <SpacingControl
        type={type}
        fieldName={`${fieldName}.radius`}
        label="Border Radius"
        mode={mode}
        min={0}
        units={[Unit.PX, Unit.PERCENTAGE, Unit.REM, Unit.EM]}
      />
    </div>
  );
};

export default TabsBorderControl;
