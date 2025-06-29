"use client";

import { ColorControl } from "@/components/controls/color.control";
import { SliderUnitControl } from "@/components/controls/slider-unit.control";
import { SpacingControl } from "@/components/controls/spacing.control";
import { Accordion } from "@/components/shared/accordion";
import { Separator } from "@/components/shared/separator";
import { Tabs } from "@/components/shared/tabs";
import { useSettings } from "@/hooks/use-settings";
import { SettingsType } from "@/types";
import { PseudoClass, Unit } from "@/types/style";

const IconStyleControl = () => {
  const [view] = useSettings("view.desktop", SettingsType.BLOCK);

  const [rotationUnit] = useSettings<Unit.DEG | Unit.GRAD | Unit.RAD | Unit.TURN | undefined>(
    "rotate.{{BREAKPOINT}}.unit",
    SettingsType.BLOCK
  );

  const rotationUnitMap = {
    [Unit.DEG]: { min: 1, max: 360, step: 1 },
    [Unit.GRAD]: { min: 1, max: 400, step: 1 },
    [Unit.RAD]: { min: 0.017, max: 6.283, step: 0.001 },
    [Unit.TURN]: { min: 0.01, max: 1, step: 0.01 },
  };

  return (
    <Accordion defaultValue="General" type="single" collapsible>
      <Accordion.Item value="General">
        <Accordion.Trigger className="p-4">General</Accordion.Trigger>
        <Accordion.Content className="px-4">
          <Tabs defaultValue={PseudoClass.DEFAULT}>
            <Tabs.List className="mb-2 h-8 w-full rounded-full">
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
              {/* Primary Color */}
              <ColorControl
                label="Primary Color"
                fieldName="color"
                type={SettingsType.BLOCK}
                className="mt-0"
                mode={PseudoClass.DEFAULT}
                side="bottom"
              />

              {/* Secondary Color */}
              {view !== "default" && (
                <ColorControl
                  label="Secondary Color"
                  fieldName="secondaryColor"
                  type={SettingsType.BLOCK}
                  className="mt-3"
                  mode={PseudoClass.DEFAULT}
                />
              )}
            </Tabs.Content>
            <Tabs.Content value={PseudoClass.HOVER}>
              {/* Primary Color */}
              <ColorControl
                label="Primary Color"
                fieldName="color"
                type={SettingsType.BLOCK}
                className="mt-0"
                mode={PseudoClass.HOVER}
              />
              {/* Secondary Color */}
              {view !== "default" && (
                <ColorControl
                  label="Secondary Color"
                  fieldName="secondaryColor"
                  type={SettingsType.BLOCK}
                  className="mt-3"
                  mode={PseudoClass.HOVER}
                />
              )}
            </Tabs.Content>
          </Tabs>

          <Separator className="my-4" />

          {/* Size */}
          <SliderUnitControl
            responsive
            label="Size"
            fieldName="size"
            type={SettingsType.BLOCK}
            units={[Unit.PX, Unit.REM, Unit.EM]}
          />

          {/* Rotate */}
          <SliderUnitControl
            responsive
            label="Rotate"
            fieldName="rotate"
            type={SettingsType.BLOCK}
            units={[Unit.DEG, Unit.GRAD, Unit.RAD, Unit.TURN]}
            step={rotationUnitMap[rotationUnit ?? Unit.DEG].step}
            min={rotationUnitMap[rotationUnit ?? Unit.DEG].min}
            max={rotationUnitMap[rotationUnit ?? Unit.DEG].max}
          />

          {view !== "default" && (
            <>
              {/* Padding */}
              <SpacingControl
                type={SettingsType.BLOCK}
                fieldName="padding"
                label="Padding"
                responsive
              />

              {/* Border Radius */}
              <SpacingControl
                type={SettingsType.BLOCK}
                fieldName="border.radius"
                label="Border Radius"
                responsive
                units={[Unit.PX, Unit.PERCENTAGE]}
              />
            </>
          )}

          {/* Border Width */}
          {view === "framed" && (
            <SpacingControl
              type={SettingsType.BLOCK}
              fieldName="border.width"
              label="Border Width"
              responsive
              units={[Unit.PX]}
            />
          )}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

export default IconStyleControl;
