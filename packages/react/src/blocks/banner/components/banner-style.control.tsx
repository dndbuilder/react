"use client";

import { ColorControl } from "@/components/controls/color.control";
import { SelectControl } from "@/components/controls/select.control";
import { SliderInputControl } from "@/components/controls/slider-input.control";
import { SliderUnitControl } from "@/components/controls/slider-unit.control";
import { ToggleGroupControl } from "@/components/controls/toggle-group.control";
import { TypographyControl } from "@/components/controls/typography.control";
import { Accordion } from "@/components/shared/accordion";
import { Tabs } from "@/components/shared/tabs";
import { SettingsType } from "@/types";
import { PseudoClass, Unit } from "@/types/style";
import { AiOutlineAlignCenter, AiOutlineAlignLeft, AiOutlineAlignRight } from "react-icons/ai";
import { TfiAlignJustify } from "react-icons/tfi";

const BannerStyleControl = () => {
  return (
    <Accordion defaultValue={"Card"} type="single" collapsible>
      <Accordion.Item value="Card">
        <Accordion.Trigger className="p-4">Card</Accordion.Trigger>
        <Accordion.Content className="px-4">
          {/* Padding */}
          <SliderUnitControl
            responsive
            label="Padding"
            fieldName="card.padding"
            type={SettingsType.BLOCK}
            units={[Unit.PX, Unit.EM, Unit.REM]}
          />
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="Image">
        <Accordion.Trigger className="p-4">Image</Accordion.Trigger>
        <Accordion.Content className="px-4">
          {/* Image fit */}
          <SelectControl
            responsive
            label="Image fit"
            fieldName="image.fit"
            type={SettingsType.BLOCK}
            mode={PseudoClass.DEFAULT}
            options={[
              { content: "Auto", value: "auto" },
              { content: "Cover", value: "cover" },
              { content: "Contain", value: "contain" },
            ]}
            className="mt-0"
          />

          {/* Overlay color */}
          <ColorControl
            label="Overlay color"
            fieldName="overlayColor.desktop"
            type={SettingsType.BLOCK}
            mode={PseudoClass.DEFAULT}
          />
        </Accordion.Content>
      </Accordion.Item>

      {/* Title */}
      <Accordion.Item value="Title">
        <Accordion.Trigger className="p-4">Title</Accordion.Trigger>
        <Accordion.Content className="px-4">
          {/* Alignment */}
          <ToggleGroupControl
            type={SettingsType.BLOCK}
            fieldName={"title.alignment"}
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
            fieldName="title.color.desktop"
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
          <SliderUnitControl
            responsive
            label="Spacing"
            fieldName="title.spacing"
            type={SettingsType.BLOCK}
            units={[Unit.PX, Unit.EM, Unit.REM]}
          />
        </Accordion.Content>
      </Accordion.Item>

      {/* Sub Title */}
      <Accordion.Item value="Subtitle">
        <Accordion.Trigger className="p-4">Subtitle</Accordion.Trigger>
        <Accordion.Content className="px-4">
          {/* Alignment */}
          <ToggleGroupControl
            responsive
            type={SettingsType.BLOCK}
            fieldName={"subTitle.alignment"}
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
            fieldName="subTitle.color.desktop"
            type={SettingsType.BLOCK}
            mode={PseudoClass.DEFAULT}
          />

          {/* Typography */}
          <TypographyControl
            label="Typography"
            fieldName="subTitle.typography"
            type={SettingsType.BLOCK}
          />

          {/* Spacing */}
          <SliderUnitControl
            responsive
            label="Spacing"
            fieldName="subTitle.spacing"
            type={SettingsType.BLOCK}
            units={[Unit.PX, Unit.EM, Unit.REM]}
          />
        </Accordion.Content>
      </Accordion.Item>

      {/* Description */}
      <Accordion.Item value="Description">
        <Accordion.Trigger className="p-4">Description</Accordion.Trigger>
        <Accordion.Content className="px-4">
          {/* Alignment */}
          <ToggleGroupControl
            responsive
            type={SettingsType.BLOCK}
            fieldName={"description.alignment"}
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
            fieldName="description.color.desktop"
            type={SettingsType.BLOCK}
            mode={PseudoClass.DEFAULT}
          />

          {/* Typography */}
          <TypographyControl
            label="Typography"
            fieldName="description.typography"
            type={SettingsType.BLOCK}
          />

          {/* Spacing */}
          <SliderUnitControl
            responsive
            label="Spacing"
            fieldName="description.spacing"
            type={SettingsType.BLOCK}
            units={[Unit.PX, Unit.EM, Unit.REM]}
          />
        </Accordion.Content>
      </Accordion.Item>

      {/* Button */}
      <Accordion.Item value="Button">
        <Accordion.Trigger className="p-4">Button</Accordion.Trigger>
        <Accordion.Content className="px-4">
          {/* Alignment */}
          <ToggleGroupControl
            responsive
            type={SettingsType.BLOCK}
            fieldName={"button.alignment"}
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

          <Tabs defaultValue={PseudoClass.DEFAULT}>
            <Tabs.List className="mb-2 mt-5 h-8 w-full rounded-full">
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
                fieldName="button.color.desktop"
                type={SettingsType.BLOCK}
                mode={PseudoClass.DEFAULT}
              />

              {/* Background */}
              <ColorControl
                label="Background Color"
                fieldName="button.backgroundColor"
                type={SettingsType.BLOCK}
                mode={PseudoClass.DEFAULT}
              />
            </Tabs.Content>
            <Tabs.Content value={PseudoClass.HOVER}>
              {/* Color */}
              <ColorControl
                label="Color"
                fieldName="button.color.desktop"
                type={SettingsType.BLOCK}
                mode={PseudoClass.HOVER}
              />

              {/* Hover Background */}
              <ColorControl
                label="Background Color"
                fieldName="button.backgroundColor"
                type={SettingsType.BLOCK}
                mode={PseudoClass.HOVER}
              />

              {/* Transition Duration */}
              <SliderInputControl
                label="Transition Duration"
                fieldName="transitionDuration"
                type={SettingsType.BLOCK}
                min={0}
                max={10000}
              />
            </Tabs.Content>
          </Tabs>

          {/* Typography */}
          <TypographyControl
            label="Typography"
            fieldName="button.typography"
            type={SettingsType.BLOCK}
          />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

export default BannerStyleControl;
