"use client";

import { BorderControl } from "@/components/controls/border.control";
import { BoxShadowControl } from "@/components/controls/box-shadow.control";
import { ColorControl } from "@/components/controls/color.control";
import { SliderUnitControl } from "@/components/controls/slider-unit.control";
import { SpacingControl } from "@/components/controls/spacing.control";
import { ToggleGroupControl } from "@/components/controls/toggle-group.control";
import { TypographyControl } from "@/components/controls/typography.control";
import { Accordion } from "@/components/shared/accordion";
import { Label } from "@/components/shared/label";
import { Separator } from "@/components/shared/separator";
import { Tabs } from "@/components/shared/tabs";
import { SettingsType } from "@/types";
import { PseudoClass, Unit } from "@/types/style";
import { AiOutlineAlignCenter, AiOutlineAlignLeft, AiOutlineAlignRight } from "react-icons/ai";
import { TfiAlignJustify } from "react-icons/tfi";

const DropdownStyleControl = () => {
  return (
    <Accordion defaultValue="Button" type="single" collapsible>
      <Accordion.Item value="Button">
        <Accordion.Trigger className="p-4">Button</Accordion.Trigger>

        <Accordion.Content className="px-4">
          <SliderUnitControl
            label="Width"
            units={[Unit.PX, Unit.REM, Unit.EM, Unit.PERCENTAGE, Unit.VW]}
            fieldName="button.width"
            type={SettingsType.BLOCK}
            responsive
          />
          <SliderUnitControl
            label="Height"
            units={[Unit.PX, Unit.REM, Unit.EM, Unit.PERCENTAGE, Unit.VH]}
            fieldName="button.height"
            type={SettingsType.BLOCK}
            responsive
          />

          <SliderUnitControl
            label="Spacing"
            fieldName="button.spacing"
            type={SettingsType.BLOCK}
            responsive
          />

          {/* Alignment */}
          <ToggleGroupControl
            type={SettingsType.BLOCK}
            fieldName={"button.align"}
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
              {
                tooltipContent: "Justified",
                toggleTrigger: <TfiAlignJustify className="text-sm" />,
                value: "space-between",
              },
            ]}
          />

          <SpacingControl
            label="Padding"
            fieldName="button.padding"
            type={SettingsType.BLOCK}
            responsive
          />
          <SpacingControl
            label="Margin"
            fieldName="button.margin"
            type={SettingsType.BLOCK}
            responsive
          />

          <TypographyControl
            label="Typography"
            fieldName="button.typography"
            type={SettingsType.BLOCK}
          />

          <Tabs defaultValue={PseudoClass.DEFAULT} className="mt-4">
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
              <Tabs.Trigger
                className="flex-1 rounded-full p-[3px] text-[13px]"
                value={PseudoClass.FOCUS}
              >
                {"Focus"}
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value={PseudoClass.DEFAULT}>
              <ColorControl
                fieldName="button.color"
                type={SettingsType.BLOCK}
                mode={PseudoClass.DEFAULT}
              />
              <ColorControl
                label="Background Color"
                fieldName="button.background.color"
                type={SettingsType.BLOCK}
                mode={PseudoClass.DEFAULT}
              />
              <BorderControl
                fieldName="button.border"
                mode={PseudoClass.DEFAULT}
                type={SettingsType.BLOCK}
              />

              <Label className="mt-4 font-semibold">Icon</Label>

              <ColorControl
                label="Color"
                fieldName="button.icon.color"
                type={SettingsType.BLOCK}
                mode={PseudoClass.DEFAULT}
              />

              <SliderUnitControl
                label="Size"
                fieldName="button.icon.size"
                type={SettingsType.BLOCK}
                responsive
                mode={PseudoClass.DEFAULT}
              />
            </Tabs.Content>

            <Tabs.Content value={PseudoClass.HOVER}>
              <ColorControl
                fieldName="button.color"
                type={SettingsType.BLOCK}
                mode={PseudoClass.HOVER}
              />
              <ColorControl
                label="Background Color"
                fieldName="button.background.color"
                type={SettingsType.BLOCK}
                mode={PseudoClass.HOVER}
              />
              <BorderControl
                fieldName="button.border"
                mode={PseudoClass.HOVER}
                type={SettingsType.BLOCK}
              />

              <Label className="mt-4 font-semibold">Icon</Label>

              <ColorControl
                label="Color"
                fieldName="button.icon.color"
                type={SettingsType.BLOCK}
                mode={PseudoClass.HOVER}
              />

              <SliderUnitControl
                label="Size"
                fieldName="button.icon.size"
                type={SettingsType.BLOCK}
                responsive
                mode={PseudoClass.HOVER}
              />
            </Tabs.Content>

            <Tabs.Content value={PseudoClass.FOCUS}>
              <ColorControl
                fieldName="button.color"
                type={SettingsType.BLOCK}
                mode={PseudoClass.FOCUS}
              />
              <ColorControl
                label="Background Color"
                fieldName="button.background.color"
                type={SettingsType.BLOCK}
                mode={PseudoClass.FOCUS}
              />
              <BorderControl
                fieldName="button.border"
                mode={PseudoClass.FOCUS}
                type={SettingsType.BLOCK}
              />

              <Label className="mt-4 font-semibold">Icon</Label>

              <ColorControl
                label="Color"
                fieldName="button.icon.color"
                type={SettingsType.BLOCK}
                mode={PseudoClass.FOCUS}
              />

              <SliderUnitControl
                label="Size"
                fieldName="button.icon.size"
                type={SettingsType.BLOCK}
                responsive
                mode={PseudoClass.FOCUS}
              />
            </Tabs.Content>
          </Tabs>

          <Separator className="my-4" />

          <Label className="font-semibold">Image</Label>

          <SliderUnitControl
            label="Width"
            units={[Unit.PX, Unit.REM, Unit.EM, Unit.PERCENTAGE, Unit.VW]}
            fieldName="button.image.width"
            type={SettingsType.BLOCK}
            responsive
          />

          <SliderUnitControl
            label="Max Width"
            fieldName="button.image.maxWidth"
            type={SettingsType.BLOCK}
            responsive
          />

          <SliderUnitControl
            label="Height"
            units={[Unit.PX, Unit.REM, Unit.EM, Unit.PERCENTAGE, Unit.VH]}
            fieldName="button.image.height"
            type={SettingsType.BLOCK}
            responsive
          />
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="Content">
        <Accordion.Trigger className="p-4">Content</Accordion.Trigger>

        <Accordion.Content className="px-4">
          <SliderUnitControl
            label="Width"
            units={[Unit.PX, Unit.REM, Unit.EM, Unit.PERCENTAGE, Unit.VW]}
            fieldName="content.width"
            type={SettingsType.BLOCK}
            responsive
          />
          <SliderUnitControl
            label="Height"
            units={[Unit.PX, Unit.REM, Unit.EM, Unit.PERCENTAGE, Unit.VH]}
            fieldName="content.height"
            type={SettingsType.BLOCK}
            responsive
          />

          <SpacingControl
            label="Padding"
            fieldName="content.padding"
            type={SettingsType.BLOCK}
            responsive
          />
          <SpacingControl
            label="Margin"
            fieldName="content.margin"
            type={SettingsType.BLOCK}
            responsive
          />

          <Tabs defaultValue={PseudoClass.DEFAULT} className="mt-4">
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
                fieldName="content.border"
                mode={PseudoClass.DEFAULT}
                type={SettingsType.BLOCK}
              />

              {/* Box Shadow */}
              <BoxShadowControl
                fieldName="content.boxShadow"
                mode={PseudoClass.DEFAULT}
                type={SettingsType.BLOCK}
              />

              {/* Background */}
              <ColorControl
                label="Background Color"
                fieldName="content.background.color"
                type={SettingsType.BLOCK}
                mode={PseudoClass.DEFAULT}
              />
            </Tabs.Content>

            <Tabs.Content value={PseudoClass.HOVER}>
              {/* Border */}
              <BorderControl
                fieldName="content.border"
                mode={PseudoClass.HOVER}
                type={SettingsType.BLOCK}
              />

              {/* Hover Box Shadow */}
              <BoxShadowControl
                fieldName="content.boxShadow"
                mode={PseudoClass.HOVER}
                type={SettingsType.BLOCK}
              />

              {/* Background */}
              <ColorControl
                label="Background Color"
                fieldName="content.background.color"
                type={SettingsType.BLOCK}
                mode={PseudoClass.HOVER}
              />
            </Tabs.Content>
          </Tabs>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

export default DropdownStyleControl;
