"use client";

import { BackgroundControl } from "@/components/controls/background.control";
import { BorderControl } from "@/components/controls/border.control";
import { BoxShadowControl } from "@/components/controls/box-shadow.control";
import { SliderInputControl } from "@/components/controls/slider-input.control";
import { SpacingControl } from "@/components/controls/spacing.control";
import { Accordion } from "@/components/shared/accordion";
import { Tabs } from "@/components/shared/tabs";
import { SettingsType } from "@/types";
import { PseudoClass, Unit } from "@/types/style";

export default function ContainerStyleControl() {
  return (
    <Accordion defaultValue={"Layout"} type="single" collapsible className="mt-0 w-full">
      <Accordion.Item value="Layout">
        <Accordion.Trigger className="p-4">Layout</Accordion.Trigger>
        <Accordion.Content className="px-4">
          {/* Margin */}
          <SpacingControl
            type={SettingsType.BLOCK}
            fieldName="margin"
            label="Margin"
            responsive
            className="mt-0"
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
        </Accordion.Content>
      </Accordion.Item>

      {/* Background */}
      <Accordion.Item value={"Background"}>
        <Accordion.Trigger className="p-4">Background</Accordion.Trigger>
        <Accordion.Content className="mt-0 px-4">
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
              <BackgroundControl
                fieldName="background"
                mode={PseudoClass.DEFAULT}
                type={SettingsType.BLOCK}
              />
            </Tabs.Content>
            <Tabs.Content value={PseudoClass.HOVER}>
              <BackgroundControl
                fieldName="background"
                mode={PseudoClass.HOVER}
                type={SettingsType.BLOCK}
              />
            </Tabs.Content>
          </Tabs>
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value={"Border"}>
        <Accordion.Trigger className="p-4">Border</Accordion.Trigger>
        <Accordion.Content className="mt-0 px-4">
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
              <BorderControl
                fieldName="border"
                mode={PseudoClass.DEFAULT}
                type={SettingsType.BLOCK}
              />

              {/* Box Shadow */}
              <BoxShadowControl
                fieldName="boxShadow"
                mode={PseudoClass.DEFAULT}
                type={SettingsType.BLOCK}
              />
            </Tabs.Content>

            <Tabs.Content value={PseudoClass.HOVER}>
              <BorderControl
                fieldName="border"
                mode={PseudoClass.HOVER}
                type={SettingsType.BLOCK}
              />

              {/* Hover Box Shadow */}
              <BoxShadowControl
                fieldName="boxShadow"
                mode={PseudoClass.HOVER}
                type={SettingsType.BLOCK}
              />

              {/* Transition Duration */}
              <SliderInputControl
                label="Transition Duration"
                type={SettingsType.BLOCK}
                fieldName="border.transitionDuration"
                min={0}
                max={10000}
              />
            </Tabs.Content>
          </Tabs>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
}
