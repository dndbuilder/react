"use client";

import { Accordion } from "@/components/shared/accordion";
import { InfoMessage } from "@/components/shared/info-message";
import { Label } from "@/components/shared/label";
import { Separator } from "@/components/shared/separator";
import { Tabs } from "@/components/shared/tabs";
import { SettingsType } from "@/types";
import { PseudoClass, Unit } from "@/types/style";
import {
  MdAlignHorizontalLeft,
  MdAlignHorizontalRight,
  MdOutlineAlignHorizontalCenter,
} from "react-icons/md";
import { BackgroundControl } from "./background.control";
import { BorderControl } from "./border.control";
import { BoxShadowControl } from "./box-shadow.control";
import { CustomAttributeControl } from "./custom-attributes.control";
import { CustomCSSControl } from "./custom-css.control";
import { FlexOrderControl } from "./flex-order.control";
import { FlexSizeControl } from "./flex-size.control";
import { InputControl } from "./input.control";
import { PositionControl } from "./position-control";
import { SliderInputControl } from "./slider-input.control";
import { SpacingControl } from "./spacing.control";
import { SwitchControl } from "./switch.control";
import { ToggleGroupControl } from "./toggle-group.control";
import { DisplayControl } from "./display-control";

export const AdvancedSettingsControl = () => {
  return (
    <Accordion defaultValue="Layout" type="single" collapsible>
      {/* Layout */}
      <Accordion.Item value="Layout">
        <Accordion.Trigger className="p-4">Layout</Accordion.Trigger>
        <Accordion.Content className="px-4">
          {/* Margin */}
          <SpacingControl
            type={SettingsType.ADVANCED}
            fieldName="margin"
            label="Margin"
            responsive
            className="mt-0"
            units={[Unit.PX, Unit.REM, Unit.EM, Unit.PERCENTAGE]}
          />

          {/* Padding */}
          <SpacingControl
            type={SettingsType.ADVANCED}
            fieldName="padding"
            label="Padding"
            responsive
            units={[Unit.PX, Unit.REM, Unit.EM, Unit.PERCENTAGE]}
          />

          <Separator className="my-3" />

          {/* Align Self */}
          <ToggleGroupControl
            type={SettingsType.ADVANCED}
            fieldName="alignSelf"
            label="Align Self"
            responsive
            controls={[
              {
                tooltipContent: "Start",
                toggleTrigger: <MdAlignHorizontalLeft className="text-sm" />,
                value: "start",
              },
              {
                tooltipContent: "Center",
                toggleTrigger: <MdOutlineAlignHorizontalCenter className="rotate-90 text-sm" />,
                value: "center",
              },
              {
                tooltipContent: "End",
                toggleTrigger: <MdAlignHorizontalRight className="text-sm" />,
                value: "end",
              },
            ]}
          />
          <InfoMessage>This control will affect contained elements only.</InfoMessage>

          {/* Order */}
          <FlexOrderControl
            type={SettingsType.ADVANCED}
            fieldName="order"
            customFieldName="orderCustom"
          />

          {/* Size */}
          <FlexSizeControl
            type={SettingsType.ADVANCED}
            fieldName="size"
            growFieldName="grow"
            shrinkFieldName="shrink"
          />

          <Separator className="my-3" />

          {/* Display Control */}
          <DisplayControl type={SettingsType.ADVANCED} fieldName="display" />

          {/* Position */}
          <PositionControl fieldName="position" type={SettingsType.ADVANCED} />

          <Separator className="my-3" />

          {/* Z-Index */}
          <InputControl
            type={SettingsType.ADVANCED}
            fieldName="zIndex"
            label="Z-Index"
            responsive
            inputProps={{ type: "number", className: "w-14" }}
          />

          {/* CSS ID */}
          <InputControl type={SettingsType.ADVANCED} fieldName="cssId" label="CSS ID" />

          {/* CSS Classes */}
          <InputControl type={SettingsType.ADVANCED} fieldName="cssClasses" label="CSS Classes" />
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value="Background">
        <Accordion.Trigger className="p-4">Background</Accordion.Trigger>
        <Accordion.Content className="px-4">
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
                type={SettingsType.ADVANCED}
              />
            </Tabs.Content>
            <Tabs.Content value={PseudoClass.HOVER}>
              <BackgroundControl
                fieldName="background"
                mode={PseudoClass.HOVER}
                type={SettingsType.ADVANCED}
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
                type={SettingsType.ADVANCED}
              />

              {/* Box Shadow */}
              <BoxShadowControl
                fieldName="boxShadow"
                mode={PseudoClass.DEFAULT}
                type={SettingsType.ADVANCED}
              />
            </Tabs.Content>

            <Tabs.Content value={PseudoClass.HOVER}>
              <BorderControl
                fieldName="border"
                mode={PseudoClass.HOVER}
                type={SettingsType.ADVANCED}
              />

              {/* Hover Box Shadow */}
              <BoxShadowControl
                fieldName="boxShadow"
                mode={PseudoClass.HOVER}
                type={SettingsType.ADVANCED}
              />

              {/* Transition Duration */}
              <SliderInputControl
                label="Transition Duration"
                type={SettingsType.ADVANCED}
                fieldName="border.transitionDuration"
                min={0}
                max={10000}
              />
            </Tabs.Content>
          </Tabs>
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value="Responsive">
        <Accordion.Trigger className="p-4">Responsive</Accordion.Trigger>
        <Accordion.Content className="px-4">
          <Label className="text-xs font-semibold text-slate-800">Visibility</Label>
          <InfoMessage>
            Responsive visibility will take effect only on preview mode or live page, and not while
            editing.
          </InfoMessage>

          {/* Hide On Desktop */}
          <SwitchControl
            type={SettingsType.ADVANCED}
            fieldName="hideOnDesktop"
            label="Hide On Desktop"
          />

          {/* Hide On Tablet */}
          <SwitchControl
            type={SettingsType.ADVANCED}
            fieldName="hideOnTablet"
            label="Hide On Tablet"
          />

          {/* Hide On Mobile */}
          <SwitchControl
            type={SettingsType.ADVANCED}
            fieldName="hideOnMobile"
            label="Hide On Mobile"
          />
        </Accordion.Content>
      </Accordion.Item>

      {/* Attributes */}
      <Accordion.Item value="Attributes">
        <Accordion.Trigger className="p-4">Attributes</Accordion.Trigger>
        <Accordion.Content className="px-4">
          <CustomAttributeControl />
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value="CustomCSS">
        <Accordion.Trigger className="px-4">Custom CSS</Accordion.Trigger>
        <Accordion.Content className="px-4">
          <CustomCSSControl
            type={SettingsType.ADVANCED}
            fieldName="customCss"
            label="Add your own custom CSS"
          />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

export default AdvancedSettingsControl;
