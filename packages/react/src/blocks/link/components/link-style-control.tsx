"use client";

import { ColorControl } from "@/components/controls/color.control";
import { SliderInputControl } from "@/components/controls/slider-input.control";
import { SpacingControl } from "@/components/controls/spacing.control";
import { TypographyControl } from "@/components/controls/typography.control";
import { Accordion } from "@/components/shared/accordion";
import { Separator } from "@/components/shared/separator";
import { Tabs } from "@/components/shared/tabs";
import { SettingsType } from "@/types";
import { PseudoClass } from "@/types/style";

const LinkStyleControl = () => {
  return (
    <Accordion defaultValue="General" type="single" collapsible>
      <Accordion.Item value="General">
        <Accordion.Trigger className="p-4">General</Accordion.Trigger>
        <Accordion.Content className="px-4">
          {/* Margin */}
          <SpacingControl
            type={SettingsType.BLOCK}
            fieldName="margin"
            label="Margin"
            responsive
            className="mt-0"
          />

          {/* Padding */}
          <SpacingControl
            type={SettingsType.BLOCK}
            fieldName="padding"
            label="Padding"
            responsive
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
              {/* Text color */}
              <ColorControl
                fieldName="color"
                mode={PseudoClass.DEFAULT}
                type={SettingsType.BLOCK}
                className="mt-0"
              />
            </Tabs.Content>
            <Tabs.Content value={PseudoClass.HOVER}>
              {/* Hover Text color */}
              <ColorControl
                fieldName="color"
                mode={PseudoClass.HOVER}
                type={SettingsType.BLOCK}
                className="mt-0"
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

          <Separator className="my-3" />

          <TypographyControl type={SettingsType.BLOCK} fieldName="typography" label="Typography" />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

export default LinkStyleControl;
