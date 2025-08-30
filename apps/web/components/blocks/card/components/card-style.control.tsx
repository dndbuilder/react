"use client";

import { PseudoClass, SettingsType, Unit } from "@dndbuilder.com/react";
import {
  Accordion,
  BorderControl,
  BoxShadowControl,
  ColorControl,
  Separator,
  SliderInputControl,
  SliderUnitControl,
  SpacingControl,
  Tabs,
  ToggleGroupControl,
  TypographyControl,
} from "@dndbuilder.com/react/components";
import { AiOutlineAlignCenter, AiOutlineAlignLeft, AiOutlineAlignRight } from "react-icons/ai";
import { TfiAlignJustify } from "react-icons/tfi";

const CardStyleControl = () => {
  return (
    <Accordion defaultValue={"Card"} type="single" collapsible>
      <Accordion.Item value="Card">
        <Accordion.Trigger className="p-4">Card</Accordion.Trigger>
        <Accordion.Content className="px-4">
          {/* Width */}
          <SliderUnitControl
            responsive
            label="Width"
            fieldName="width"
            type={SettingsType.BLOCK}
            units={[Unit.PX, Unit.PERCENTAGE, Unit.EM, Unit.REM]}
            className="mt-0"
          />

          {/* Height */}
          <SliderUnitControl
            responsive
            label="Height"
            fieldName="height"
            type={SettingsType.BLOCK}
            units={[Unit.PX, Unit.PERCENTAGE, Unit.EM, Unit.REM]}
          />

          {/* Padding */}
          <SpacingControl
            responsive
            label="Padding"
            fieldName="padding"
            type={SettingsType.BLOCK}
          />

          {/* Margin */}
          <SpacingControl responsive label="Margin" fieldName="margin" type={SettingsType.BLOCK} />

          {/* Border */}

          {/* Background */}
          <Tabs defaultValue={PseudoClass.DEFAULT} className="mt-4">
            <Tabs.List className="mb-2 mt-0 h-8 w-full rounded-full">
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
              <ColorControl
                fieldName="background.color"
                type={SettingsType.BLOCK}
                mode={PseudoClass.DEFAULT}
                className="mt-0"
              />

              {/* Border */}
              <BorderControl
                fieldName="border"
                type={SettingsType.BLOCK}
                mode={PseudoClass.DEFAULT}
              />

              {/* Box Shadow */}
              <BoxShadowControl
                label="Box Shadow"
                fieldName="boxShadow"
                type={SettingsType.BLOCK}
                mode={PseudoClass.DEFAULT}
              />
            </Tabs.Content>
            <Tabs.Content value={PseudoClass.HOVER}>
              <ColorControl
                label="Background"
                fieldName="background.color"
                type={SettingsType.BLOCK}
                mode={PseudoClass.HOVER}
                className="mt-0"
              />

              {/* Border */}
              <BorderControl
                fieldName="border"
                type={SettingsType.BLOCK}
                mode={PseudoClass.HOVER}
              />

              {/* Box Shadow */}
              <BoxShadowControl
                label="Box Shadow"
                fieldName="boxShadow"
                type={SettingsType.BLOCK}
                mode={PseudoClass.HOVER}
              />
            </Tabs.Content>
          </Tabs>
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value="Image">
        <Accordion.Trigger className="p-4">Image</Accordion.Trigger>
        <Accordion.Content className="px-4">
          {/* Image */}
          <SliderUnitControl
            responsive
            label="Width"
            fieldName="image.width"
            type={SettingsType.BLOCK}
            units={[Unit.PX, Unit.PERCENTAGE, Unit.EM, Unit.REM]}
            className="mt-0"
          />

          <SliderUnitControl
            responsive
            label="Height"
            fieldName="image.height"
            type={SettingsType.BLOCK}
            units={[Unit.PX, Unit.PERCENTAGE, Unit.EM, Unit.REM]}
          />

          {/* Padding */}
          <SpacingControl
            responsive
            label="Padding"
            fieldName="image.padding"
            type={SettingsType.BLOCK}
          />

          {/* Margin */}
          <SpacingControl
            responsive
            label="Margin"
            fieldName="image.margin"
            type={SettingsType.BLOCK}
          />
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value="Title">
        <Accordion.Trigger className="p-4">Title</Accordion.Trigger>
        <Accordion.Content className="px-4">
          {/* Text Align */}
          <ToggleGroupControl
            type={SettingsType.BLOCK}
            fieldName={"title.textAlign"}
            responsive
            label={"Alignment"}
            className="mt-0"
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
              {
                tooltipContent: "Justified",
                toggleTrigger: <TfiAlignJustify className="text-sm" />,
                value: "justify",
              },
            ]}
          />

          {/* Color */}
          <ColorControl
            label="Color"
            fieldName="title.color"
            type={SettingsType.BLOCK}
            mode={PseudoClass.DEFAULT}
          />

          {/* Typography */}
          <TypographyControl
            label="Typography"
            fieldName="title.typography"
            type={SettingsType.BLOCK}
          />

          {/* Spacing */}
          <SpacingControl
            responsive
            label="Padding"
            fieldName="title.padding"
            type={SettingsType.BLOCK}
          />

          <SpacingControl
            responsive
            label="Margin"
            fieldName="title.margin"
            type={SettingsType.BLOCK}
          />
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value="Description">
        <Accordion.Trigger className="p-4">Description</Accordion.Trigger>
        <Accordion.Content className="px-4">
          {/* Color */}
          <ColorControl
            label="Color"
            fieldName="description.color"
            type={SettingsType.BLOCK}
            mode={PseudoClass.DEFAULT}
            className="mt-0"
          />

          {/* Typography */}
          <TypographyControl
            label="Typography"
            fieldName="description.typography"
            type={SettingsType.BLOCK}
          />

          {/* Spacing */}
          <SpacingControl
            responsive
            label="Padding"
            fieldName="description.padding"
            type={SettingsType.BLOCK}
          />

          <SpacingControl
            responsive
            label="Margin"
            fieldName="description.margin"
            type={SettingsType.BLOCK}
          />
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value="Link">
        <Accordion.Trigger className="p-4">Link</Accordion.Trigger>
        <Accordion.Content className="px-4">
          {/* Typography */}
          <TypographyControl
            label="Typography"
            fieldName="link.typography"
            type={SettingsType.BLOCK}
          />

          {/* Spacing */}
          <SpacingControl
            responsive
            label="Padding"
            fieldName="link.padding"
            type={SettingsType.BLOCK}
          />

          <SpacingControl
            responsive
            label="Margin"
            fieldName="link.margin"
            type={SettingsType.BLOCK}
          />

          <Tabs defaultValue={PseudoClass.DEFAULT} className="mt-4">
            <Tabs.List className="mb-2 mt-0 h-8 w-full rounded-full">
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
              {/* Color */}
              <ColorControl
                label="Color"
                fieldName="link.color"
                type={SettingsType.BLOCK}
                mode={PseudoClass.DEFAULT}
                className="mt-0"
              />

              {/* Background */}
              <ColorControl
                mode={PseudoClass.DEFAULT}
                label="Background"
                fieldName="link.background.color"
                type={SettingsType.BLOCK}
              />
            </Tabs.Content>
            <Tabs.Content value={PseudoClass.HOVER}>
              {/* Color */}
              <ColorControl
                label="Color"
                fieldName="link.color"
                type={SettingsType.BLOCK}
                mode={PseudoClass.HOVER}
                className="mt-0"
              />
              {/* Background */}
              <ColorControl
                mode={PseudoClass.HOVER}
                label="Background"
                fieldName="link.background.color"
                type={SettingsType.BLOCK}
              />
            </Tabs.Content>
          </Tabs>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

export default CardStyleControl;
