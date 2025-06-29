"use client";

import { BoxShadowControl } from "@/components/controls/box-shadow.control";
import { ColorControl } from "@/components/controls/color.control";
import { SliderUnitControl } from "@/components/controls/slider-unit.control";
import { SpacingControl } from "@/components/controls/spacing.control";
import { ToggleGroupControl } from "@/components/controls/toggle-group.control";
import { TypographyControl } from "@/components/controls/typography.control";
import { Accordion } from "@/components/shared/accordion";
import { Tabs } from "@/components/shared/tabs";
import { useSettings } from "@/hooks/use-settings";
import { SettingsType } from "@/types";
import { PseudoClass, Unit } from "@/types/style";
import {
  MdAlignHorizontalCenter,
  MdAlignHorizontalLeft,
  MdAlignHorizontalRight,
  MdAlignVerticalBottom,
  MdAlignVerticalCenter,
  MdAlignVerticalTop,
} from "react-icons/md";
import { RxPinLeft, RxPinTop } from "react-icons/rx";
import { TabsBorderControl } from "./tabs-border.control";

const TabsStyleControl = () => {
  const [orientation] = useSettings<"horizontal" | "vertical">(
    "list.orientation.{{BREAKPOINT}}",
    SettingsType.BLOCK
  );

  return (
    <Accordion defaultValue="List" type="single" collapsible>
      <Accordion.Item value="List">
        <Accordion.Trigger className="p-4">List</Accordion.Trigger>

        <Accordion.Content className="px-4">
          {/* Layout */}
          <ToggleGroupControl
            type={SettingsType.BLOCK}
            fieldName={"list.orientation"}
            label={"Orientation"}
            responsive
            className="mt-0"
            controls={[
              {
                tooltipContent: "Horizontal",
                toggleTrigger: <RxPinTop className="text-sm" />,
                value: "horizontal",
              },
              {
                tooltipContent: "Vertical",
                toggleTrigger: <RxPinLeft className="text-sm" />,
                value: "vertical",
              },
            ]}
          />

          {/*  Alignment */}
          <ToggleGroupControl
            type={SettingsType.BLOCK}
            fieldName={"list.alignment"}
            label={"Alignment"}
            responsive
            controls={[
              {
                tooltipContent: "Start",
                toggleTrigger:
                  orientation === "horizontal" ? (
                    <MdAlignHorizontalLeft className="text-sm" />
                  ) : (
                    <MdAlignVerticalTop className="text-sm" />
                  ),
                value: "flex-start",
              },
              {
                tooltipContent: "Center",
                toggleTrigger:
                  orientation === "horizontal" ? (
                    <MdAlignHorizontalCenter className="text-sm" />
                  ) : (
                    <MdAlignVerticalCenter className="text-sm" />
                  ),
                value: "center",
              },
              {
                tooltipContent: "End",
                toggleTrigger:
                  orientation === "horizontal" ? (
                    <MdAlignHorizontalRight className="text-sm" />
                  ) : (
                    <MdAlignVerticalBottom className="text-sm" />
                  ),
                value: "flex-end",
              },
            ]}
          />

          {/* Spacing */}
          <SliderUnitControl
            type={SettingsType.BLOCK}
            fieldName="list.spacing"
            label="Spacing"
            responsive
            units={[Unit.PX, Unit.REM, Unit.EM, Unit.PERCENTAGE]}
          />

          {/* Margin */}
          <SpacingControl
            type={SettingsType.BLOCK}
            fieldName="list.margin"
            label="Margin"
            responsive
            units={[Unit.PX, Unit.REM, Unit.EM, Unit.PERCENTAGE]}
          />

          {/* Padding */}
          <SpacingControl
            type={SettingsType.BLOCK}
            fieldName="list.padding"
            label="Padding"
            responsive
            units={[Unit.PX, Unit.REM, Unit.EM, Unit.PERCENTAGE]}
          />
        </Accordion.Content>
      </Accordion.Item>

      {/* Button */}
      <Accordion.Item value="Button">
        <Accordion.Trigger className="p-4">Button</Accordion.Trigger>

        <Accordion.Content className="px-4">
          {/* Width */}
          <SliderUnitControl
            type={SettingsType.BLOCK}
            fieldName="button.width"
            label="Width"
            responsive
            units={[Unit.PX, Unit.REM, Unit.EM, Unit.PERCENTAGE]}
          />

          {/* Height */}
          <SliderUnitControl
            type={SettingsType.BLOCK}
            fieldName="button.height"
            label="Height"
            responsive
            units={[Unit.PX, Unit.REM, Unit.EM, Unit.PERCENTAGE]}
          />

          {/*  Alignment */}
          <ToggleGroupControl
            type={SettingsType.BLOCK}
            fieldName={"button.alignment"}
            label={"Alignment"}
            responsive
            controls={[
              {
                tooltipContent: "Start",
                toggleTrigger: <MdAlignHorizontalLeft className="text-sm" />,
                value: "flex-start",
              },
              {
                tooltipContent: "Center",
                toggleTrigger: <MdAlignHorizontalCenter className="text-sm" />,
                value: "center",
              },
              {
                tooltipContent: "End",
                toggleTrigger: <MdAlignHorizontalRight className="text-sm" />,
                value: "flex-end",
              },
            ]}
          />

          {/* Spacing */}
          <SliderUnitControl
            type={SettingsType.BLOCK}
            fieldName="button.spacing"
            label="Spacing"
            responsive
            units={[Unit.PX, Unit.REM, Unit.EM, Unit.PERCENTAGE]}
          />

          {/* Typography */}
          <TypographyControl
            type={SettingsType.BLOCK}
            fieldName="button.typography"
            label="Typography"
          />

          {/* Margin */}
          <SpacingControl
            type={SettingsType.BLOCK}
            fieldName="button.margin"
            label="Margin"
            responsive
            units={[Unit.PX, Unit.REM, Unit.EM, Unit.PERCENTAGE]}
          />

          {/* Padding */}
          <SpacingControl
            type={SettingsType.BLOCK}
            fieldName="button.padding"
            label="Padding"
            responsive
            units={[Unit.PX, Unit.REM, Unit.EM, Unit.PERCENTAGE]}
          />

          {/* Text & Background Color */}
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
              <Tabs.Trigger className="flex-1 rounded-full p-[3px] text-[13px]" value={"active"}>
                {"Active"}
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value={PseudoClass.DEFAULT}>
              {/* Text color */}
              <ColorControl
                label={"Text Color"}
                fieldName="button.color"
                mode={PseudoClass.DEFAULT}
                type={SettingsType.BLOCK}
              />

              {/* Background Color */}
              <ColorControl
                label="Background Color"
                fieldName="button.background.color"
                mode={PseudoClass.DEFAULT}
                type={SettingsType.BLOCK}
              />

              {/* Border */}
              <TabsBorderControl
                fieldName="button.border"
                mode={PseudoClass.DEFAULT}
                type={SettingsType.BLOCK}
              />

              {/* Box Shadow */}
              <BoxShadowControl
                fieldName="button.boxShadow"
                mode={PseudoClass.DEFAULT}
                type={SettingsType.BLOCK}
              />
            </Tabs.Content>
            <Tabs.Content value={PseudoClass.HOVER}>
              {/* Hover Text color */}
              <ColorControl
                label={"Text Color"}
                fieldName="button.color"
                mode={PseudoClass.HOVER}
                type={SettingsType.BLOCK}
              />

              {/* Hover Background */}
              <ColorControl
                label="Background Color"
                fieldName="button.background.color"
                mode={PseudoClass.HOVER}
                type={SettingsType.BLOCK}
              />

              {/* Hover Border */}
              <TabsBorderControl
                fieldName="button.border"
                mode={PseudoClass.HOVER}
                type={SettingsType.BLOCK}
              />

              {/* Box Shadow */}
              <BoxShadowControl
                fieldName="button.boxShadow"
                mode={PseudoClass.HOVER}
                type={SettingsType.BLOCK}
              />
            </Tabs.Content>
            <Tabs.Content value={"active"}>
              {/* Active Text color */}
              <ColorControl
                label={"Text Color"}
                fieldName="button.color.active"
                type={SettingsType.BLOCK}
              />

              {/* Active Background */}
              <ColorControl
                label="Background Color"
                fieldName="button.background.color.active"
                type={SettingsType.BLOCK}
              />

              {/* Active Border */}
              <TabsBorderControl
                fieldName="button.border"
                mode={"active"}
                type={SettingsType.BLOCK}
              />

              {/* Box Shadow */}
              <BoxShadowControl
                fieldName="button.boxShadow"
                mode={"active"}
                type={SettingsType.BLOCK}
              />
            </Tabs.Content>
          </Tabs>
        </Accordion.Content>
      </Accordion.Item>

      {/* Content */}
      <Accordion.Item value="Content">
        <Accordion.Trigger className="p-4">Content</Accordion.Trigger>

        <Accordion.Content className="px-4">
          {/* Margin */}
          <SpacingControl
            type={SettingsType.BLOCK}
            fieldName="content.margin"
            label="Margin"
            responsive
            units={[Unit.PX, Unit.REM, Unit.EM, Unit.PERCENTAGE]}
          />

          {/* Padding */}
          <SpacingControl
            type={SettingsType.BLOCK}
            fieldName="content.padding"
            label="Padding"
            responsive
            units={[Unit.PX, Unit.REM, Unit.EM, Unit.PERCENTAGE]}
          />

          {/* Border */}
          <TabsBorderControl
            fieldName="content.border"
            mode={PseudoClass.DEFAULT}
            type={SettingsType.BLOCK}
          />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

export default TabsStyleControl;
