"use client";

import { BorderControl } from "@/components/controls/border.control";
import { ColorControl } from "@/components/controls/color.control";
import { InputControl } from "@/components/controls/input.control";
import { SelectControl } from "@/components/controls/select.control";
import { SliderUnitControl } from "@/components/controls/slider-unit.control";
import { SpacingControl } from "@/components/controls/spacing.control";
import { ToggleGroupControl } from "@/components/controls/toggle-group.control";
import { TypographyControl } from "@/components/controls/typography.control";
import { Accordion } from "@/components/shared/accordion";
import { Separator } from "@/components/shared/separator";
import { Tabs } from "@/components/shared/tabs";
import { SettingsType } from "@/types";
import { PseudoClass, Unit } from "@/types/style";
import { AiOutlineAlignCenter, AiOutlineAlignLeft, AiOutlineAlignRight } from "react-icons/ai";

const ImageStyleControl = () => {
  return (
    <Accordion defaultValue="Image" type="single" collapsible>
      {/* Image */}
      <Accordion.Item value="Image">
        <Accordion.Trigger className="p-4">Image</Accordion.Trigger>
        <Accordion.Content className="px-4">
          {/* Width */}
          <SliderUnitControl
            responsive
            type={SettingsType.BLOCK}
            fieldName="width"
            label="Width"
            className="mt-0"
            units={[Unit.PX, Unit.PERCENTAGE, Unit.REM, Unit.EM, Unit.VW]}
          />

          {/* Max Width */}
          <SliderUnitControl
            responsive
            type={SettingsType.BLOCK}
            fieldName="maxWidth"
            label="Max Width"
            units={[Unit.PX, Unit.PERCENTAGE, Unit.REM, Unit.EM, Unit.VW]}
          />

          {/* Height */}
          <SliderUnitControl
            responsive
            type={SettingsType.BLOCK}
            fieldName="height"
            label="Height"
            units={[Unit.PX, Unit.PERCENTAGE, Unit.REM, Unit.EM, Unit.VH]}
          />

          {/* Max Height */}
          <SliderUnitControl
            responsive
            type={SettingsType.BLOCK}
            fieldName="maxHeight"
            label="Max Height"
            units={[Unit.PX, Unit.PERCENTAGE, Unit.REM, Unit.EM, Unit.VH]}
          />

          {/* Object Fit */}
          <SelectControl
            type={SettingsType.BLOCK}
            fieldName="objectFit"
            label="Object Fit"
            responsive
            options={[
              { content: "Fill", value: "fill" },
              { content: "Contain", value: "contain" },
              { content: "Cover", value: "cover" },
              { content: "None", value: "none" },
            ]}
          />

          {/* Margin */}
          <SpacingControl
            type={SettingsType.BLOCK}
            fieldName="margin"
            label="Margin"
            responsive
            units={[Unit.PX, Unit.REM, Unit.EM, Unit.PERCENTAGE]}
          />

          {/* Padding */}
          <SpacingControl
            type={SettingsType.BLOCK}
            fieldName="padding"
            label="Padding"
            responsive
            units={[Unit.PX, Unit.REM, Unit.EM, Unit.PERCENTAGE]}
          />

          {/* Seperate */}
          <Separator className="my-4" />

          <Tabs defaultValue={PseudoClass.DEFAULT}>
            <Tabs.List className="h-8 w-full rounded-full">
              <Tabs.Trigger
                className="flex-1 rounded-full p-[3px] text-[13px]"
                value={PseudoClass.DEFAULT}
              >
                {"Normal"}
              </Tabs.Trigger>
              <Tabs.Trigger
                className="flex-1 rounded-full p-[3px] text-[13px]"
                value={PseudoClass.HOVER}
              >
                {"Hover"}
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value={PseudoClass.DEFAULT}>
              {/* Border */}
              <BorderControl
                type={SettingsType.BLOCK}
                fieldName="border"
                mode={PseudoClass.DEFAULT}
              />

              {/* Opacity */}
              <InputControl
                type={SettingsType.BLOCK}
                fieldName="opacity"
                label="Opacity"
                mode={PseudoClass.DEFAULT}
                inputProps={{
                  type: "number",
                  className: "w-14",
                  min: 0,
                  max: 1,
                  step: 0.1,
                }}
              />
            </Tabs.Content>
            <Tabs.Content value={PseudoClass.HOVER}>
              {/* Border */}
              <BorderControl
                type={SettingsType.BLOCK}
                fieldName="border"
                mode={PseudoClass.HOVER}
              />

              {/* Hover Opacity */}
              <InputControl
                type={SettingsType.BLOCK}
                fieldName="opacity"
                label="Opacity"
                mode={PseudoClass.HOVER}
                inputProps={{
                  type: "number",
                  className: "w-14",
                  min: 0,
                  max: 1,
                  step: 0.1,
                }}
              />
            </Tabs.Content>
          </Tabs>
        </Accordion.Content>
      </Accordion.Item>

      {/* Caption */}
      <Accordion.Item value="Caption">
        <Accordion.Trigger className="p-4">Caption</Accordion.Trigger>

        <Accordion.Content className="px-4">
          {/* Color */}
          <ColorControl
            type={SettingsType.BLOCK}
            fieldName="caption.color"
            mode={PseudoClass.DEFAULT}
            label="Color"
          />

          {/* Typography */}
          <TypographyControl type={SettingsType.BLOCK} fieldName="caption.typography" />

          {/* <Alignment /> */}
          <ToggleGroupControl
            type={SettingsType.BLOCK}
            fieldName={"caption.alignment"}
            label={"Alignment"}
            responsive
            controls={[
              {
                tooltipContent: "Left",
                toggleTrigger: <AiOutlineAlignLeft className="text-sm" />,
                value: "left",
              },
              {
                tooltipContent: "Center",
                toggleTrigger: <AiOutlineAlignCenter className="text-sm" />,
                value: "center",
              },
              {
                tooltipContent: "Right",
                toggleTrigger: <AiOutlineAlignRight className="text-sm" />,
                value: "right",
              },
            ]}
          />

          {/* Margin */}
          <SpacingControl
            type={SettingsType.BLOCK}
            fieldName="caption.margin"
            label="Margin"
            responsive
            units={[Unit.PX, Unit.REM, Unit.EM, Unit.PERCENTAGE]}
          />

          {/* Padding */}
          <SpacingControl
            type={SettingsType.BLOCK}
            fieldName="caption.padding"
            label="Padding"
            responsive
            units={[Unit.PX, Unit.REM, Unit.EM, Unit.PERCENTAGE]}
          />
        </Accordion.Content>
      </Accordion.Item>

      {/* Wrapper */}
      <Accordion.Item value="Wrapper">
        <Accordion.Trigger className="p-4">Wrapper</Accordion.Trigger>

        <Accordion.Content className="px-4">
          {/* Width */}
          <SliderUnitControl
            responsive
            type={SettingsType.BLOCK}
            fieldName="wrapper.width"
            label="Width"
            className="mt-0"
            units={[Unit.PX, Unit.PERCENTAGE, Unit.REM, Unit.EM, Unit.VW]}
          />

          {/* Height */}
          <SliderUnitControl
            responsive
            type={SettingsType.BLOCK}
            fieldName="wrapper.height"
            label="Height"
            units={[Unit.PX, Unit.PERCENTAGE, Unit.REM, Unit.EM, Unit.VH]}
          />

          {/* Margin */}
          <SpacingControl
            type={SettingsType.BLOCK}
            fieldName="wrapper.margin"
            label="Margin"
            responsive
            units={[Unit.PX, Unit.REM, Unit.EM, Unit.PERCENTAGE]}
          />

          {/* Padding */}
          <SpacingControl
            type={SettingsType.BLOCK}
            fieldName="wrapper.padding"
            label="Padding"
            responsive
            units={[Unit.PX, Unit.REM, Unit.EM, Unit.PERCENTAGE]}
          />

          {/* Border */}
          <BorderControl
            type={SettingsType.BLOCK}
            fieldName="wrapper.border"
            mode={PseudoClass.DEFAULT}
          />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

export default ImageStyleControl;
