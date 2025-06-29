"use client";

import { Label, ToggleGroupControl } from "@/components";
import { BackgroundControl } from "@/components/controls/background.control";
import { BorderControl } from "@/components/controls/border.control";
import { BoxShadowControl } from "@/components/controls/box-shadow.control";
import { ColorControl } from "@/components/controls/color.control";
import { SliderInputControl } from "@/components/controls/slider-input.control";
import { SliderUnitControl } from "@/components/controls/slider-unit.control";
import { SpacingControl } from "@/components/controls/spacing.control";
import { TypographyControl } from "@/components/controls/typography.control";
import { Accordion } from "@/components/shared/accordion";
import { Separator } from "@/components/shared/separator";
import { Tabs } from "@/components/shared/tabs";
import { SettingsType } from "@/types";
import { PseudoClass, Unit } from "@/types/style";
import { AiOutlineAlignCenter, AiOutlineAlignLeft, AiOutlineAlignRight } from "react-icons/ai";

const ProgressBarStyleControl = () => {
  return (
    <Accordion defaultValue="Title" type="single" collapsible>
      <Accordion.Item value="Title">
        <Accordion.Trigger className="p-4">Title</Accordion.Trigger>
        <Accordion.Content className="px-4">
          <ColorControl
            type={SettingsType.BLOCK}
            mode={PseudoClass.DEFAULT}
            fieldName="title.color"
            label="Color"
          />

          <TypographyControl fieldName="title.typography" type={SettingsType.BLOCK} />

          <ColorControl
            type={SettingsType.BLOCK}
            mode={PseudoClass.DEFAULT}
            fieldName="title.background.color"
            label="Background Color"
          />

          <SpacingControl
            type={SettingsType.BLOCK}
            fieldName="title.padding"
            label="Padding"
            responsive
            units={[Unit.PX, Unit.REM, Unit.EM, Unit.PERCENTAGE]}
          />

          <SpacingControl
            type={SettingsType.BLOCK}
            fieldName="title.margin"
            label="Margin"
            responsive
            units={[Unit.PX, Unit.REM, Unit.EM, Unit.PERCENTAGE]}
          />
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value="Progress Bar">
        <Accordion.Trigger className="p-4">Progress Bar</Accordion.Trigger>
        <Accordion.Content className="px-4">
          <ColorControl
            type={SettingsType.BLOCK}
            mode={PseudoClass.DEFAULT}
            fieldName="progressBar.background.color"
            label="Background Color"
          />

          <SliderUnitControl
            type={SettingsType.BLOCK}
            fieldName="progressBar.height"
            label="Height"
            units={[Unit.PX, Unit.PERCENTAGE, Unit.REM, Unit.EM, Unit.VH]}
            responsive
          />

          <SliderUnitControl
            type={SettingsType.BLOCK}
            fieldName="progressBar.maxWidth"
            label="Max Width"
            units={[Unit.PX, Unit.PERCENTAGE, Unit.REM, Unit.EM, Unit.VW]}
            responsive
          />

          <SpacingControl
            type={SettingsType.BLOCK}
            fieldName="progressBar.padding"
            label="Padding"
            responsive
            units={[Unit.PX, Unit.REM, Unit.EM, Unit.PERCENTAGE]}
          />

          <SpacingControl
            type={SettingsType.BLOCK}
            fieldName="progressBar.margin"
            label="Margin"
            responsive
            units={[Unit.PX, Unit.REM, Unit.EM, Unit.PERCENTAGE]}
          />

          <BorderControl
            type={SettingsType.BLOCK}
            fieldName="progressBar.border"
            mode={PseudoClass.DEFAULT}
          />

          <Separator className="my-4" />

          <Label className="font-semibold">Progress Fill</Label>

          <ColorControl
            type={SettingsType.BLOCK}
            mode={PseudoClass.DEFAULT}
            fieldName="progressFill.background.color"
            label="Background Color"
          />

          <SpacingControl
            type={SettingsType.BLOCK}
            fieldName="progressFill.padding"
            label="Padding"
            responsive
            units={[Unit.PX, Unit.REM, Unit.EM, Unit.PERCENTAGE]}
          />

          <SpacingControl
            type={SettingsType.BLOCK}
            fieldName="progressFill.margin"
            label="Margin"
            responsive
            units={[Unit.PX, Unit.REM, Unit.EM, Unit.PERCENTAGE]}
          />

          <BorderControl
            type={SettingsType.BLOCK}
            fieldName="progressFill.border"
            mode={PseudoClass.DEFAULT}
          />
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value="Percentage">
        <Accordion.Trigger className="p-4">Percentage</Accordion.Trigger>
        <Accordion.Content className="px-4">
          <ColorControl
            type={SettingsType.BLOCK}
            mode={PseudoClass.DEFAULT}
            fieldName="percentage.color"
            label="Color"
          />

          <ColorControl
            type={SettingsType.BLOCK}
            mode={PseudoClass.DEFAULT}
            fieldName="percentage.background.color"
            label="Background Color"
          />

          <TypographyControl fieldName="percentage.typography" type={SettingsType.BLOCK} />

          <SpacingControl
            type={SettingsType.BLOCK}
            fieldName="percentage.padding"
            label="Padding"
            responsive
            units={[Unit.PX, Unit.REM, Unit.EM, Unit.PERCENTAGE]}
          />

          <SpacingControl
            type={SettingsType.BLOCK}
            fieldName="percentage.margin"
            label="Margin"
            responsive
            units={[Unit.PX, Unit.REM, Unit.EM, Unit.PERCENTAGE]}
          />

          <ToggleGroupControl
            type={SettingsType.BLOCK}
            fieldName={"percentage.alignment"}
            label={"Alignment"}
            responsive
            controls={[
              {
                tooltipContent: "Start",
                toggleTrigger: <AiOutlineAlignLeft className="text-sm" />,
                value: "flex-start",
              },
              {
                tooltipContent: "Center",
                toggleTrigger: <AiOutlineAlignCenter className="text-sm" />,
                value: "center",
              },
              {
                tooltipContent: "End",
                toggleTrigger: <AiOutlineAlignRight className="text-sm" />,
                value: "flex-end",
              },
            ]}
          />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

export default ProgressBarStyleControl;
